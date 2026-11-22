import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import {
  buildHwataCorsHeaders,
  loginRequiredResponse,
  requireHwataMember,
} from '@/app/api/_lib/hwata-auth';
import { ensureMessengerRoomsSeeded } from '@/lib/messenger/server';

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
    const memberships = await prisma.hwataRoomMember.findMany({
      where: { userId: member.id },
      select: { roomId: true, lastReadAt: true, pinned: true, muted: true },
    });
    const joinedIds = memberships.map((m) => m.roomId);
    const memberMap = new Map(memberships.map((m) => [m.roomId, m]));

    const rooms = await prisma.hwataRoom.findMany({
      where: {
        OR: [{ isPublic: true }, ...(joinedIds.length > 0 ? [{ roomId: { in: joinedIds } }] : [])],
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

    return NextResponse.json(
      {
        ok: true,
        rooms: rooms.map((r) => {
          const mem = memberMap.get(r.roomId);
          const last = r.messages[0] || null;
          return {
            roomId: r.roomId,
            roomName: r.roomName,
            description: r.description,
            creator: r.creator,
            inviteCode: r.inviteCode,
            isPublic: r.isPublic,
            isDefault: r.isDefault,
            roomType: r.roomType,
            memberCount: Math.max(r.memberCount, r._count.members),
            joined: Boolean(mem),
            pinned: mem?.pinned ?? false,
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
      },
      { headers: { ...corsHeaders, 'Cache-Control': 'no-store' } }
    );
  } catch (err) {
    console.error('[messenger/v1/rooms GET error]:', err);
    return NextResponse.json(
      { ok: false, message: '대화방 목록 조회 중 오류가 발생했습니다.' },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function POST(req: NextRequest) {
  const member = await requireHwataMember(req);
  if (!member) return loginRequiredResponse(req);
  const corsHeaders = buildHwataCorsHeaders(req);

  if (!member.isVerifiedNonInsured && !member.isOwnerAdmin) {
    return NextResponse.json(
      {
        ok: false,
        code: 'VERIFICATION_REQUIRED',
        message:
          '새 지인 전용 대화방 개설은 화이트스타일치과의원 비보험 진료(교정·심미보철·임플란트·미백) 후 인증된 화타펫 정회원에게 제공됩니다. 인증된 지인이 보낸 초대 링크나 초대 코드로는 바로 입장하실 수 있습니다.',
      },
      { status: 403, headers: corsHeaders }
    );
  }

  try {
    const body = await req.json().catch(() => ({}));
    const roomType = body.roomType === 'DM' ? 'DM' : 'GROUP';
    const hostDisplay = (member.name || member.email.split('@')[0] || '정회원').trim().slice(0, 20);

    if (roomType === 'DM') {
      const targetUserId = typeof body.targetUserId === 'string' ? body.targetUserId.trim() : '';
      const targetHandle = typeof body.targetHandle === 'string' ? body.targetHandle.trim().toLowerCase() : '';
      const targetUser = await prisma.user.findFirst({
        where: targetUserId
          ? { id: targetUserId, isBlocked: false }
          : { OR: [{ handle: targetHandle }, { email: targetHandle }], isBlocked: false },
        select: { id: true, name: true, handle: true, email: true },
      });

      if (!targetUser || targetUser.id === member.id) {
        return NextResponse.json(
          { ok: false, message: '1:1 대화를 시작할 지인 계정을 찾을 수 없습니다.' },
          { status: 404, headers: corsHeaders }
        );
      }

      // 기존 1:1 DM 방 확인
      const existingDm = await prisma.hwataRoom.findFirst({
        where: {
          roomType: 'DM',
          AND: [
            { members: { some: { userId: member.id } } },
            { members: { some: { userId: targetUser.id } } },
          ],
        },
      });

      if (existingDm) {
        return NextResponse.json(
          {
            ok: true,
            room: existingDm,
            inviteLink: `https://whitestyle.com/messenger?room=${encodeURIComponent(existingDm.roomId)}`,
          },
          { headers: corsHeaders }
        );
      }

      const targetDisplay = (targetUser.name || targetUser.handle || '지인').slice(0, 20);
      const roomId = `dm_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`;
      const inviteCode = `HT-DM-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

      const created = await prisma.hwataRoom.create({
        data: {
          roomId,
          roomName: `${hostDisplay} · ${targetDisplay}`,
          description: '인증된 화타펫 1:1 프라이빗 대화방',
          creator: hostDisplay,
          creatorUserId: member.id,
          creatorChartNo: member.chartNo,
          inviteCode,
          isDefault: false,
          isPublic: false,
          roomType: 'DM',
          memberCount: 2,
          topic: '1:1 프라이빗 대화 · 파일 전송',
        },
      });

      await prisma.hwataRoomMember.createMany({
        data: [
          { roomId, userId: member.id, role: 'OWNER', nickname: hostDisplay },
          { roomId, userId: targetUser.id, role: 'MEMBER', nickname: targetDisplay },
        ],
      });

      return NextResponse.json(
        {
          ok: true,
          room: created,
          inviteLink: `https://whitestyle.com/messenger?room=${encodeURIComponent(roomId)}`,
        },
        { status: 201, headers: corsHeaders }
      );
    }

    const roomName = String(body.roomName || '').trim().slice(0, 60);
    if (!roomName) {
      return NextResponse.json(
        { ok: false, message: '대화방 이름을 입력해 주세요.' },
        { status: 400, headers: corsHeaders }
      );
    }

    const isPublic = body.isPublic === true;
    const description =
      typeof body.description === 'string' && body.description.trim()
        ? body.description.trim().slice(0, 140)
        : `${hostDisplay}님의 인증된 화타펫 지인 대화방`;
    const roomId = `room_ht_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`;
    const inviteCode = `HT-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

    const newRoom = await prisma.hwataRoom.create({
      data: {
        roomId,
        roomName,
        description,
        creator: hostDisplay,
        creatorUserId: member.id,
        creatorChartNo: member.chartNo,
        inviteCode,
        isDefault: false,
        isPublic,
        roomType: isPublic ? 'PUBLIC_LOUNGE' : 'GROUP',
        memberCount: 1,
        topic: '인증된 화타펫 지인 대화 · 대용량 파일 전송',
      },
    });

    await prisma.hwataRoomMember.create({
      data: {
        roomId,
        userId: member.id,
        role: 'OWNER',
        nickname: hostDisplay,
      },
    });

    await prisma.hwataMessage.create({
      data: {
        roomId,
        sender: '닥터 화타',
        text: `${hostDisplay}님의 인증된 화타펫 전용 화타톡 방이 열렸습니다. 초대 링크나 초대 코드(${inviteCode})를 지인에게 공유하시면 바로 들어와 대용량 파일과 3D 화타펫 스티커를 함께 주고받을 수 있습니다.`,
        isBot: true,
        messageType: 'SYSTEM',
        avatarSpecies: 'dog',
        avatarEar: 'round',
        avatarCostume: 'crown',
        avatarBg: 'gold',
      },
    });

    return NextResponse.json(
      {
        ok: true,
        room: newRoom,
        inviteLink: `https://whitestyle.com/messenger?room=${encodeURIComponent(roomId)}&invite=${encodeURIComponent(inviteCode)}`,
      },
      { status: 201, headers: corsHeaders }
    );
  } catch (err) {
    console.error('[messenger/v1/rooms POST error]:', err);
    return NextResponse.json(
      { ok: false, message: '대화방 생성 중 오류가 발생했습니다.' },
      { status: 500, headers: corsHeaders }
    );
  }
}
