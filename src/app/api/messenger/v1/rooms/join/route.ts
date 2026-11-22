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

export async function POST(req: NextRequest) {
  const member = await requireHwataMember(req);
  if (!member) return loginRequiredResponse(req);
  const corsHeaders = buildHwataCorsHeaders(req);

  try {
    await ensureMessengerRoomsSeeded();
    const body = await req.json().catch(() => ({}));
    const inviteCode = String(body.inviteCode || '').trim().toUpperCase();
    const roomId = String(body.roomId || '').trim();

    if (!inviteCode && !roomId) {
      return NextResponse.json(
        { ok: false, message: '초대 코드 또는 대화방 ID를 입력해 주세요.' },
        { status: 400, headers: corsHeaders }
      );
    }

    const room = await prisma.hwataRoom.findFirst({
      where: inviteCode
        ? { inviteCode }
        : { roomId },
    });

    if (!room) {
      return NextResponse.json(
        { ok: false, message: '해당 초대 코드 또는 대화방을 찾을 수 없습니다.' },
        { status: 404, headers: corsHeaders }
      );
    }

    const existingMembership = await prisma.hwataRoomMember.findUnique({
      where: { roomId_userId: { roomId: room.roomId, userId: member.id } },
    });

    const displayName = (member.name || member.email.split('@')[0] || '회원').trim().slice(0, 20);
    if (!existingMembership) {
      await prisma.hwataRoomMember.create({
        data: {
          roomId: room.roomId,
          userId: member.id,
          role: 'MEMBER',
          nickname: displayName,
        },
      });
      await prisma.hwataRoom.update({
        where: { roomId: room.roomId },
        data: { memberCount: { increment: 1 } },
      });

      if (room.creatorUserId && room.creatorUserId !== member.id) {
        await prisma.hwataFriend.upsert({
          where: {
            requesterId_addresseeId: {
              requesterId: room.creatorUserId,
              addresseeId: member.id,
            },
          },
          update: { status: 'ACCEPTED' },
          create: {
            requesterId: room.creatorUserId,
            addresseeId: member.id,
            status: 'ACCEPTED',
          },
        }).catch(() => {});
      }
    }

    return NextResponse.json(
      {
        ok: true,
        alreadyJoined: Boolean(existingMembership),
        room: {
          roomId: room.roomId,
          roomName: room.roomName,
          description: room.description,
          inviteCode: room.inviteCode,
          isPublic: room.isPublic,
          roomType: room.roomType,
        },
      },
      { headers: corsHeaders }
    );
  } catch (err) {
    console.error('[messenger/v1/rooms/join POST error]:', err);
    return NextResponse.json(
      { ok: false, message: '대화방 입장 처리 중 오류가 발생했습니다.' },
      { status: 500, headers: corsHeaders }
    );
  }
}
