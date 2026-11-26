import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import {
  buildHwataCorsHeaders,
  loginRequiredResponse,
  requireHwataMember,
} from '@/app/api/_lib/hwata-auth';
import {
  canAccessRoom,
  formatAttachment,
  generateDoctorHwataReply,
  parseAvatarJson,
  PET_STICKERS,
  sanitizeAvatar,
  shouldDoctorAutoReply,
} from '@/lib/messenger/server';

export const dynamic = 'force-dynamic';

export async function OPTIONS(req: NextRequest) {
  return new NextResponse(null, { status: 204, headers: buildHwataCorsHeaders(req) });
}

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ roomId: string }> }
) {
  const member = await requireHwataMember(req);
  if (!member) return loginRequiredResponse(req);
  const corsHeaders = buildHwataCorsHeaders(req);

  try {
    const { roomId } = await context.params;
    const access = await canAccessRoom(roomId, member.id);
    if (!access) {
      return NextResponse.json(
        { ok: false, message: '대화방 접근 권한이 없거나 존재하지 않는 방입니다.' },
        { status: 403, headers: corsHeaders }
      );
    }

    const now = new Date();
    const displayName = (member.name || member.email.split('@')[0] || '회원').trim().slice(0, 20);

    // 읽음 및 접속 시각 갱신
    await Promise.all([
      prisma.user.update({ where: { id: member.id }, data: { lastSeenAt: now } }),
      prisma.hwataRoomMember.upsert({
        where: { roomId_userId: { roomId, userId: member.id } },
        update: { lastReadAt: now },
        create: {
          roomId,
          userId: member.id,
          role: 'MEMBER',
          nickname: displayName,
          lastReadAt: now,
        },
      }),
    ]);

    const { searchParams } = new URL(req.url);
    const q = (searchParams.get('q') || '').trim();
    const filesOnly = searchParams.get('filesOnly') === '1';
    const afterId = (searchParams.get('afterId') || '').trim();

    let afterDate: Date | null = null;
    if (afterId) {
      const refMsg = await prisma.hwataMessage.findUnique({
        where: { id: afterId },
        select: { createdAt: true },
      });
      if (refMsg) afterDate = refMsg.createdAt;
    }

    if (filesOnly) {
      const atts = await prisma.hwataAttachment.findMany({
        where: { roomId },
        orderBy: { createdAt: 'desc' },
        take: 100,
        include: { uploader: { select: { id: true, name: true, handle: true } } },
      });
      return NextResponse.json(
        {
          ok: true,
          roomId,
          files: atts.map((a) => ({
            ...formatAttachment(a),
            uploaderName: a.uploader?.name || a.uploader?.handle || '회원',
          })),
        },
        { headers: { ...corsHeaders, 'Cache-Control': 'no-store' } }
      );
    }

    const [messages, roomMembers, p2pOffers] = await Promise.all([
      prisma.hwataMessage.findMany({
        where: {
          roomId,
          isDeleted: false,
          ...(q ? { text: { contains: q, mode: 'insensitive' } } : {}),
          ...(afterDate ? { createdAt: { gt: afterDate } } : {}),
        },
        orderBy: { createdAt: 'asc' },
        take: 100,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              handle: true,
              isVerifiedNonInsured: true,
              verifiedTreatment: true,
            },
          },
          attachments: {
            orderBy: { createdAt: 'asc' },
          },
          reactions: {
            select: { emoji: true, userId: true },
          },
        },
      }),
      prisma.hwataRoomMember.findMany({
        where: { roomId },
        include: {
          user: {
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
      }),
      prisma.hwataSignal.findMany({
        where: {
          roomId,
          toUserId: member.id,
          signalType: 'offer',
          consumed: false,
          createdAt: { gt: new Date(Date.now() - 2 * 60 * 1000) },
        },
        orderBy: { createdAt: 'asc' },
        take: 10,
      }),
    ]);

    const onlineCutoff = Date.now() - 25 * 1000;
    const onlineMembers = roomMembers
      .filter((rm) => rm.user.lastSeenAt && rm.user.lastSeenAt.getTime() >= onlineCutoff)
      .map((rm) => ({
        userId: rm.user.id,
        name: rm.user.name || rm.nickname || rm.user.handle || '회원',
        handle: rm.user.handle,
        isVerifiedNonInsured: rm.user.isVerifiedNonInsured,
        statusMessage: rm.user.statusMessage,
        petAvatar: parseAvatarJson(rm.user.petAvatarJson),
        isMe: rm.user.id === member.id,
      }));

    const replyTargetIds = Array.from(
      new Set(messages.map((m) => m.replyToId).filter((v): v is string => Boolean(v)))
    );
    const replyMap = new Map<string, { id: string; sender: string; text: string }>();
    if (replyTargetIds.length > 0) {
      const replyRows = await prisma.hwataMessage.findMany({
        where: { id: { in: replyTargetIds } },
        select: { id: true, sender: true, text: true },
      });
      for (const rr of replyRows) replyMap.set(rr.id, rr);
    }

    const formatted = messages.map((m) => {
      const reactionAgg = new Map<string, { count: number; mine: boolean }>();
      for (const r of m.reactions) {
        const cur = reactionAgg.get(r.emoji) || { count: 0, mine: false };
        cur.count += 1;
        if (r.userId === member.id) cur.mine = true;
        reactionAgg.set(r.emoji, cur);
      }

      const unreadCount = roomMembers.filter(
        (rm) => rm.userId !== m.userId && rm.lastReadAt.getTime() < m.createdAt.getTime()
      ).length;

      return {
        id: m.id,
        roomId: m.roomId,
        userId: m.userId,
        sender: m.sender,
        text: m.text,
        isBot: m.isBot,
        isCracked: m.isCracked || Boolean(m.user?.isVerifiedNonInsured),
        verifiedTreatment: m.user?.verifiedTreatment || null,
        messageType: m.messageType,
        stickerCode: m.stickerCode,
        replyTo: m.replyToId ? replyMap.get(m.replyToId) || null : null,
        unreadCount,
        avatar: {
          species: m.avatarSpecies,
          ear: m.avatarEar,
          costume: m.avatarCostume,
          bg: m.avatarBg,
        },
        attachments: m.attachments.map(formatAttachment),
        reactions: Array.from(reactionAgg.entries()).map(([emoji, info]) => ({
          emoji,
          count: info.count,
          mine: info.mine,
        })),
        createdAt: m.createdAt.toISOString(),
      };
    });

    return NextResponse.json(
      {
        ok: true,
        room: {
          roomId: access.room.roomId,
          roomName: access.room.roomName,
          description: access.room.description,
          inviteCode: access.room.inviteCode,
          isPublic: access.room.isPublic,
          roomType: access.room.roomType,
          memberCount: Math.max(access.room.memberCount, roomMembers.length),
        },
        onlineMembers,
        messages: formatted,
        p2pOffers: p2pOffers.map((o) => ({
          id: o.id,
          roomId: o.roomId,
          fromUserId: o.fromUserId,
          toUserId: o.toUserId,
          transferId: o.transferId,
          signalType: o.signalType,
          payload: o.payload,
          createdAt: o.createdAt.toISOString(),
        })),
        serverTime: now.toISOString(),
      },
      { headers: { ...corsHeaders, 'Cache-Control': 'no-store' } }
    );
  } catch (err) {
    console.error('[messenger/v1/rooms/[roomId]/messages GET error]:', err);
    return NextResponse.json(
      { ok: false, message: '메시지를 불러오는 중 오류가 발생했습니다.' },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ roomId: string }> }
) {
  const member = await requireHwataMember(req);
  if (!member) return loginRequiredResponse(req);
  const corsHeaders = buildHwataCorsHeaders(req);

  try {
    const { roomId } = await context.params;
    const access = await canAccessRoom(roomId, member.id);
    if (!access) {
      return NextResponse.json(
        { ok: false, message: '대화방 접근 권한이 없거나 존재하지 않는 방입니다.' },
        { status: 403, headers: corsHeaders }
      );
    }

    const body = await req.json().catch(() => ({}));
    const rawText = String(body.text || '').trim().slice(0, 2000);
    const stickerCode = typeof body.stickerCode === 'string' ? body.stickerCode.trim().slice(0, 30) : null;
    const replyToId = typeof body.replyToId === 'string' && body.replyToId.trim() ? body.replyToId.trim() : null;
    const attachmentIds: string[] = Array.isArray(body.attachmentIds)
      ? body.attachmentIds.map(String).filter(Boolean).slice(0, 10)
      : [];

    let messageType = typeof body.messageType === 'string' ? body.messageType.trim().toUpperCase() : 'TEXT';
    if (!['TEXT', 'FILE', 'IMAGE', 'VIDEO', 'PET_STICKER', 'P2P_OFFER'].includes(messageType)) {
      messageType = 'TEXT';
    }

    let text = rawText;
    if (messageType === 'PET_STICKER' && stickerCode) {
      const found = PET_STICKERS.find((s) => s.code === stickerCode);
      if (!text) text = found ? found.label : '화타펫 스티커';
    }

    if (!text && attachmentIds.length === 0 && !stickerCode) {
      return NextResponse.json(
        { ok: false, message: '메시지 내용이나 첨부파일이 필요합니다.' },
        { status: 400, headers: corsHeaders }
      );
    }

    const displayName = (member.name || member.email.split('@')[0] || '회원').trim().slice(0, 20);
    const avatar = body.avatar ? sanitizeAvatar(body.avatar) : parseAvatarJson(member.petAvatarJson);
    const now = new Date();

    await prisma.hwataRoomMember.upsert({
      where: { roomId_userId: { roomId, userId: member.id } },
      update: { lastReadAt: now },
      create: { roomId, userId: member.id, role: 'MEMBER', nickname: displayName, lastReadAt: now },
    });

    const saved = await prisma.hwataMessage.create({
      data: {
        roomId,
        userId: member.id,
        sender: displayName,
        text: text || '파일을 보냈습니다.',
        chartNo: member.chartNo,
        isCracked: member.isVerifiedNonInsured,
        avatarSpecies: avatar.species,
        avatarEar: avatar.ear,
        avatarCostume: avatar.costume,
        avatarBg: avatar.bg,
        isBot: false,
        messageType,
        replyToId,
        stickerCode,
      },
    });

    if (attachmentIds.length > 0) {
      await prisma.hwataAttachment.updateMany({
        where: { id: { in: attachmentIds }, roomId, uploaderId: member.id },
        data: { messageId: saved.id },
      });
    }

    await prisma.hwataRoom.update({
      where: { roomId },
      data: { lastMessageAt: now },
    });

    let isReplyToBot = false;
    if (replyToId) {
      const targetMsg = await prisma.hwataMessage.findUnique({
        where: { id: replyToId },
        select: { isBot: true },
      });
      if (targetMsg?.isBot) isReplyToBot = true;
    }

    const roomMemberTotal = access.room.isPublic
      ? access.room.memberCount
      : await prisma.hwataRoomMember.count({ where: { roomId } });

    const triggerBot = shouldDoctorAutoReply(text, {
      isPublicRoom: access.room.isPublic,
      roomMemberCount: roomMemberTotal,
      replyTargetsBot: isReplyToBot,
    });

    let createdBotMsg: {
      id: string;
      roomId: string;
      userId: string | null;
      sender: string;
      text: string;
      isBot: boolean;
      isCracked: boolean;
      messageType: string;
      stickerCode: string | null;
      avatarSpecies: string;
      avatarEar: string;
      avatarCostume: string;
      avatarBg: string;
      createdAt: Date;
    } | null = null;

    if (triggerBot) {
      const priorMessages = await prisma.hwataMessage.findMany({
        where: { roomId, isDeleted: false, id: { not: saved.id } },
        orderBy: { createdAt: 'desc' },
        take: 5,
        select: { sender: true, text: true, isBot: true },
      });
      const recentContext = priorMessages.reverse();
      const botReply = await generateDoctorHwataReply(text, displayName, recentContext);
      createdBotMsg = await prisma.hwataMessage.create({
        data: {
          roomId,
          sender: '닥터 화타',
          text: botReply,
          isBot: true,
          messageType: 'TEXT',
          avatarSpecies: 'dog',
          avatarEar: 'round',
          avatarCostume: 'doctor',
          avatarBg: 'gold',
          createdAt: new Date(Date.now() + 50),
        },
      });
    }

    const fullMsg = await prisma.hwataMessage.findUnique({
      where: { id: saved.id },
      include: { attachments: true },
    });

    return NextResponse.json(
      {
        ok: true,
        message: fullMsg
          ? {
              id: fullMsg.id,
              roomId: fullMsg.roomId,
              userId: fullMsg.userId,
              sender: fullMsg.sender,
              text: fullMsg.text,
              isBot: false,
              isCracked: fullMsg.isCracked || member.isVerifiedNonInsured,
              verifiedTreatment: member.verifiedTreatment || null,
              messageType: fullMsg.messageType,
              stickerCode: fullMsg.stickerCode,
              replyTo: null,
              unreadCount: 0,
              avatar,
              attachments: fullMsg.attachments.map(formatAttachment),
              reactions: [],
              createdAt: fullMsg.createdAt.toISOString(),
            }
          : null,
        botReply: createdBotMsg
          ? {
              id: createdBotMsg.id,
              roomId: createdBotMsg.roomId,
              userId: createdBotMsg.userId,
              sender: createdBotMsg.sender,
              text: createdBotMsg.text,
              isBot: true,
              isCracked: false,
              verifiedTreatment: null,
              messageType: createdBotMsg.messageType,
              stickerCode: createdBotMsg.stickerCode,
              replyTo: null,
              unreadCount: 0,
              avatar: {
                species: createdBotMsg.avatarSpecies,
                ear: createdBotMsg.avatarEar,
                costume: createdBotMsg.avatarCostume,
                bg: createdBotMsg.avatarBg,
              },
              attachments: [],
              reactions: [],
              createdAt: createdBotMsg.createdAt.toISOString(),
            }
          : null,
      },
      { status: 201, headers: corsHeaders }
    );
  } catch (err) {
    console.error('[messenger/v1/rooms/[roomId]/messages POST error]:', err);
    return NextResponse.json(
      { ok: false, message: '메시지 전송 중 오류가 발생했습니다.' },
      { status: 500, headers: corsHeaders }
    );
  }
}
