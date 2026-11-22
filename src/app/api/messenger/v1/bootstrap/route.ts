import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import {
  buildHwataCorsHeaders,
  loginRequiredResponse,
  requireHwataMember,
} from '@/app/api/_lib/hwata-auth';
import {
  ensureMessengerRoomsSeeded,
  isBlobConfigured,
  parseAvatarJson,
  PET_STICKERS,
} from '@/lib/messenger/server';

export const dynamic = 'force-dynamic';

export async function OPTIONS(req: NextRequest) {
  return new NextResponse(null, { status: 204, headers: buildHwataCorsHeaders(req) });
}

export async function GET(req: NextRequest) {
  const member = await requireHwataMember(req);
  if (!member) return loginRequiredResponse(req);
  const corsHeaders = buildHwataCorsHeaders(req);

  try {
    await ensureMessengerRoomsSeeded();
    const now = new Date();
    await prisma.user.update({
      where: { id: member.id },
      data: { lastSeenAt: now },
    });

    const memberships = await prisma.hwataRoomMember.findMany({
      where: { userId: member.id },
      select: { roomId: true, lastReadAt: true, pinned: true, muted: true, role: true },
    });
    const memberMap = new Map(memberships.map((m) => [m.roomId, m]));
    const joinedIds = memberships.map((m) => m.roomId);

    const rooms = await prisma.hwataRoom.findMany({
      where: {
        OR: [
          { isPublic: true },
          ...(joinedIds.length > 0 ? [{ roomId: { in: joinedIds } }] : []),
        ],
      },
      orderBy: [{ isDefault: 'desc' }, { lastMessageAt: 'desc' }, { createdAt: 'desc' }],
      include: {
        messages: {
          where: { isDeleted: false },
          orderBy: { createdAt: 'desc' },
          take: 1,
          select: { id: true, sender: true, text: true, messageType: true, createdAt: true },
        },
        _count: { select: { members: true } },
      },
    });

    const unreadCounts = await Promise.all(
      rooms.map(async (r) => {
        const mem = memberMap.get(r.roomId);
        if (!mem) return 0;
        return prisma.hwataMessage.count({
          where: {
            roomId: r.roomId,
            isDeleted: false,
            userId: { not: member.id },
            createdAt: { gt: mem.lastReadAt },
          },
        });
      })
    );

    const friendsRaw = await prisma.hwataFriend.findMany({
      where: {
        status: 'ACCEPTED',
        OR: [{ requesterId: member.id }, { addresseeId: member.id }],
      },
      include: {
        requester: {
          select: {
            id: true,
            name: true,
            handle: true,
            isVerifiedNonInsured: true,
            petAvatarJson: true,
            lastSeenAt: true,
            statusMessage: true,
          },
        },
        addressee: {
          select: {
            id: true,
            name: true,
            handle: true,
            isVerifiedNonInsured: true,
            petAvatarJson: true,
            lastSeenAt: true,
            statusMessage: true,
          },
        },
      },
      take: 60,
    });

    const onlineThreshold = Date.now() - 60 * 1000;
    const friendMap = new Map<
      string,
      {
        id: string;
        name: string;
        handle: string | null;
        isVerifiedNonInsured: boolean;
        statusMessage: string | null;
        petAvatar: ReturnType<typeof parseAvatarJson>;
        isOnline: boolean;
      }
    >();

    for (const f of friendsRaw) {
      const other = f.requesterId === member.id ? f.addressee : f.requester;
      if (!other || other.id === member.id || friendMap.has(other.id)) continue;
      friendMap.set(other.id, {
        id: other.id,
        name: other.name || other.handle || '지인',
        handle: other.handle,
        isVerifiedNonInsured: other.isVerifiedNonInsured,
        statusMessage: other.statusMessage,
        petAvatar: parseAvatarJson(other.petAvatarJson),
        isOnline: Boolean(other.lastSeenAt && other.lastSeenAt.getTime() >= onlineThreshold),
      });
    }

    const blobEnabled = isBlobConfigured();
    const canCreatePrivate = member.isVerifiedNonInsured || member.isOwnerAdmin;

    return NextResponse.json(
      {
        ok: true,
        me: {
          id: member.id,
          name: member.name || member.email.split('@')[0],
          email: member.email,
          handle: member.handle,
          statusMessage: member.statusMessage,
          isOwnerAdmin: member.isOwnerAdmin,
          isVerifiedNonInsured: member.isVerifiedNonInsured,
          verifiedTreatment: member.verifiedTreatment,
          chartNo: member.chartNo,
          canCreatePrivateRooms: canCreatePrivate,
          petAvatar: parseAvatarJson(member.petAvatarJson),
        },
        storage: {
          blobEnabled,
          maxCloudBytes: canCreatePrivate ? 500 * 1024 * 1024 : 100 * 1024 * 1024,
          fallbackMaxBytes: 3.5 * 1024 * 1024,
          p2pUnlimited: true,
        },
        stickers: PET_STICKERS,
        rooms: rooms.map((r, idx) => {
          const mem = memberMap.get(r.roomId);
          const last = r.messages[0] || null;
          return {
            roomId: r.roomId,
            roomName: r.roomName,
            description: r.description,
            creator: r.creator,
            inviteCode: r.inviteCode,
            isDefault: r.isDefault,
            isPublic: r.isPublic,
            roomType: r.roomType,
            memberCount: Math.max(r.memberCount, r._count.members),
            joined: Boolean(mem),
            pinned: mem?.pinned ?? false,
            muted: mem?.muted ?? false,
            unreadCount: unreadCounts[idx] || 0,
            lastMessage: last
              ? {
                  id: last.id,
                  sender: last.sender,
                  text: last.text,
                  messageType: last.messageType,
                  createdAt: last.createdAt.toISOString(),
                }
              : null,
          };
        }),
        friends: Array.from(friendMap.values()),
        serverTime: now.toISOString(),
      },
      { headers: { ...corsHeaders, 'Cache-Control': 'no-store' } }
    );
  } catch (err) {
    console.error('[messenger/v1/bootstrap GET error]:', err);
    return NextResponse.json(
      { ok: false, message: '메신저 정보를 불러오는 중 오류가 발생했습니다.' },
      { status: 500, headers: corsHeaders }
    );
  }
}
