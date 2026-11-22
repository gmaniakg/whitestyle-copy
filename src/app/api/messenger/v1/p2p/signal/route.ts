import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import {
  buildHwataCorsHeaders,
  loginRequiredResponse,
  requireHwataMember,
} from '@/app/api/_lib/hwata-auth';
import { canAccessRoom } from '@/lib/messenger/server';

export const dynamic = 'force-dynamic';

export async function OPTIONS(req: NextRequest) {
  return new NextResponse(null, { status: 204, headers: buildHwataCorsHeaders(req) });
}

export async function GET(req: NextRequest) {
  const member = await requireHwataMember(req);
  if (!member) return loginRequiredResponse(req);
  const corsHeaders = buildHwataCorsHeaders(req);

  try {
    const { searchParams } = new URL(req.url);
    const roomId = (searchParams.get('roomId') || '').trim();
    const transferId = (searchParams.get('transferId') || '').trim();
    const types = (searchParams.get('types') || 'offer,answer,ice')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    if (!roomId) {
      return NextResponse.json({ ok: false, message: 'roomId가 필요합니다.' }, { status: 400, headers: corsHeaders });
    }

    const access = await canAccessRoom(roomId, member.id);
    if (!access) {
      return NextResponse.json({ ok: false, message: '권한이 없습니다.' }, { status: 403, headers: corsHeaders });
    }

    // 5분 이상 지난 오래된 시그널 정리
    await prisma.hwataSignal.deleteMany({
      where: { createdAt: { lt: new Date(Date.now() - 5 * 60 * 1000) } },
    });

    const signals = await prisma.hwataSignal.findMany({
      where: {
        roomId,
        toUserId: member.id,
        consumed: false,
        ...(transferId ? { transferId } : {}),
        ...(types.length > 0 ? { signalType: { in: types } } : {}),
      },
      orderBy: { createdAt: 'asc' },
      take: 30,
    });

    if (signals.length > 0) {
      await prisma.hwataSignal.updateMany({
        where: { id: { in: signals.map((s) => s.id) } },
        data: { consumed: true },
      });
    }

    return NextResponse.json(
      {
        ok: true,
        signals: signals.map((s) => ({
          id: s.id,
          roomId: s.roomId,
          fromUserId: s.fromUserId,
          toUserId: s.toUserId,
          transferId: s.transferId,
          signalType: s.signalType,
          payload: s.payload,
          createdAt: s.createdAt.toISOString(),
        })),
      },
      { headers: { ...corsHeaders, 'Cache-Control': 'no-store' } }
    );
  } catch (err) {
    console.error('[messenger/v1/p2p/signal GET error]:', err);
    return NextResponse.json({ ok: false, message: 'P2P 신호 조회 오류' }, { status: 500, headers: corsHeaders });
  }
}

export async function POST(req: NextRequest) {
  const member = await requireHwataMember(req);
  if (!member) return loginRequiredResponse(req);
  const corsHeaders = buildHwataCorsHeaders(req);

  try {
    const body = await req.json().catch(() => ({}));
    const roomId = String(body.roomId || '').trim();
    const toUserId = String(body.toUserId || '').trim();
    const transferId = String(body.transferId || '').trim();
    const signalType = String(body.signalType || '').trim();
    const payload = typeof body.payload === 'string' ? body.payload : JSON.stringify(body.payload || {});

    if (!roomId || !toUserId || !transferId || !['offer', 'answer', 'ice'].includes(signalType)) {
      return NextResponse.json({ ok: false, message: '잘못된 P2P 신호 파라미터입니다.' }, { status: 400, headers: corsHeaders });
    }

    const access = await canAccessRoom(roomId, member.id);
    if (!access) {
      return NextResponse.json({ ok: false, message: '권한이 없습니다.' }, { status: 403, headers: corsHeaders });
    }

    const created = await prisma.hwataSignal.create({
      data: {
        roomId,
        fromUserId: member.id,
        toUserId,
        transferId,
        signalType,
        payload: payload.slice(0, 64000),
      },
    });

    return NextResponse.json({ ok: true, id: created.id }, { status: 201, headers: corsHeaders });
  } catch (err) {
    console.error('[messenger/v1/p2p/signal POST error]:', err);
    return NextResponse.json({ ok: false, message: 'P2P 신호 전송 오류' }, { status: 500, headers: corsHeaders });
  }
}
