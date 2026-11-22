import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import {
  buildHwataCorsHeaders,
  loginRequiredResponse,
  requireHwataMember,
} from '@/app/api/_lib/hwata-auth';
import { canAccessRoom } from '@/lib/messenger/server';

export const dynamic = 'force-dynamic';

const ALLOWED_EMOJIS = new Set(['👍', '❤️', '😂', '👏', '🦷', '🐾', '🎉']);

export async function OPTIONS(req: NextRequest) {
  return new NextResponse(null, { status: 204, headers: buildHwataCorsHeaders(req) });
}

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const member = await requireHwataMember(req);
  if (!member) return loginRequiredResponse(req);
  const corsHeaders = buildHwataCorsHeaders(req);

  try {
    const { id } = await context.params;
    const body = await req.json().catch(() => ({}));
    const emoji = String(body.emoji || '').trim();

    if (!ALLOWED_EMOJIS.has(emoji)) {
      return NextResponse.json(
        { ok: false, message: '지원하지 않는 리액션 이모지입니다.' },
        { status: 400, headers: corsHeaders }
      );
    }

    const msg = await prisma.hwataMessage.findUnique({
      where: { id },
      select: { id: true, roomId: true, isDeleted: true },
    });
    if (!msg || msg.isDeleted) {
      return NextResponse.json(
        { ok: false, message: '메시지를 찾을 수 없습니다.' },
        { status: 404, headers: corsHeaders }
      );
    }

    const access = await canAccessRoom(msg.roomId, member.id);
    if (!access) {
      return NextResponse.json(
        { ok: false, message: '접근 권한이 없습니다.' },
        { status: 403, headers: corsHeaders }
      );
    }

    const existing = await prisma.hwataReaction.findUnique({
      where: { messageId_userId_emoji: { messageId: id, userId: member.id, emoji } },
    });

    if (existing) {
      await prisma.hwataReaction.delete({ where: { id: existing.id } });
    } else {
      await prisma.hwataReaction.create({
        data: { messageId: id, userId: member.id, emoji },
      });
    }

    return NextResponse.json(
      { ok: true, toggled: existing ? 'removed' : 'added', emoji },
      { headers: corsHeaders }
    );
  } catch (err) {
    console.error('[messenger/v1/messages/[id]/react POST error]:', err);
    return NextResponse.json(
      { ok: false, message: '리액션 처리 중 오류가 발생했습니다.' },
      { status: 500, headers: corsHeaders }
    );
  }
}
