import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import {
  buildHwataCorsHeaders,
  loginRequiredResponse,
  requireHwataMember,
} from '@/app/api/_lib/hwata-auth';

export const dynamic = 'force-dynamic';

export async function OPTIONS(req: NextRequest) {
  return new NextResponse(null, { status: 204, headers: buildHwataCorsHeaders(req) });
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const member = await requireHwataMember(req);
  if (!member) return loginRequiredResponse(req);
  const corsHeaders = buildHwataCorsHeaders(req);

  try {
    const { id } = await context.params;
    const msg = await prisma.hwataMessage.findUnique({
      where: { id },
      select: { id: true, userId: true },
    });
    if (!msg) {
      return NextResponse.json(
        { ok: false, message: '메시지를 찾을 수 없습니다.' },
        { status: 404, headers: corsHeaders }
      );
    }

    if (msg.userId !== member.id && !member.isOwnerAdmin) {
      return NextResponse.json(
        { ok: false, message: '본인의 메시지만 삭제할 수 있습니다.' },
        { status: 403, headers: corsHeaders }
      );
    }

    await prisma.hwataMessage.update({
      where: { id },
      data: { isDeleted: true, text: '삭제된 메시지입니다.' },
    });

    return NextResponse.json({ ok: true, deletedId: id }, { headers: corsHeaders });
  } catch (err) {
    console.error('[messenger/v1/messages/[id] DELETE error]:', err);
    return NextResponse.json(
      { ok: false, message: '메시지 삭제 중 오류가 발생했습니다.' },
      { status: 500, headers: corsHeaders }
    );
  }
}
