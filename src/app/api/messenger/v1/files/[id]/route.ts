import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { loginRequiredResponse, requireHwataMember } from '@/app/api/_lib/hwata-auth';
import { canAccessRoom } from '@/lib/messenger/server';

export const dynamic = 'force-dynamic';

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const member = await requireHwataMember(req);
  if (!member) return loginRequiredResponse(req);

  try {
    const { id } = await context.params;
    const att = await prisma.hwataAttachment.findUnique({ where: { id } });
    if (!att) {
      return NextResponse.json({ ok: false, message: '파일을 찾을 수 없습니다.' }, { status: 404 });
    }

    const access = await canAccessRoom(att.roomId, member.id);
    if (!access) {
      return NextResponse.json({ ok: false, message: '파일 열람 권한이 없습니다.' }, { status: 403 });
    }

    if (att.blobUrl) {
      return NextResponse.redirect(att.blobUrl, 302);
    }

    if (att.inlineDataBase64) {
      const buf = Buffer.from(att.inlineDataBase64, 'base64');
      const forceDownload = req.nextUrl.searchParams.get('download') === '1';
      const safeName = encodeURIComponent(att.fileName);
      return new NextResponse(buf, {
        status: 200,
        headers: {
          'Content-Type': att.mimeType || 'application/octet-stream',
          'Content-Length': String(buf.length),
          'Content-Disposition': `${forceDownload ? 'attachment' : 'inline'}; filename*=UTF-8''${safeName}`,
          'Cache-Control': 'private, max-age=3600',
        },
      });
    }

    return NextResponse.json({ ok: false, message: '파일 데이터가 비어 있습니다.' }, { status: 404 });
  } catch (err) {
    console.error('[messenger/v1/files/[id] GET error]:', err);
    return NextResponse.json({ ok: false, message: '파일 조회 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
