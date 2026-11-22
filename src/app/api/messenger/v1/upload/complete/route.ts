import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import {
  buildHwataCorsHeaders,
  loginRequiredResponse,
  requireHwataMember,
} from '@/app/api/_lib/hwata-auth';
import { canAccessRoom, formatAttachment, isBlockedFileName } from '@/lib/messenger/server';

export const dynamic = 'force-dynamic';

export async function OPTIONS(req: NextRequest) {
  return new NextResponse(null, { status: 204, headers: buildHwataCorsHeaders(req) });
}

export async function POST(req: NextRequest) {
  const member = await requireHwataMember(req);
  if (!member) return loginRequiredResponse(req);
  const corsHeaders = buildHwataCorsHeaders(req);

  try {
    const body = await req.json().catch(() => ({}));
    const roomId = String(body.roomId || '').trim();
    const blobUrl = String(body.blobUrl || '').trim();
    const blobPathname = String(body.blobPathname || '').trim();
    const fileName = String(body.fileName || 'file').trim().slice(0, 200);
    const mimeType = String(body.mimeType || 'application/octet-stream').trim().slice(0, 120);
    const sizeBytes = Math.max(0, Number(body.sizeBytes || 0));

    if (!roomId || !blobUrl.startsWith('https://')) {
      return NextResponse.json(
        { ok: false, message: '올바른 파일 업로드 정보가 아닙니다.' },
        { status: 400, headers: corsHeaders }
      );
    }

    if (isBlockedFileName(fileName)) {
      return NextResponse.json(
        { ok: false, message: '허용되지 않는 파일 형식입니다.' },
        { status: 400, headers: corsHeaders }
      );
    }

    const access = await canAccessRoom(roomId, member.id);
    if (!access) {
      return NextResponse.json(
        { ok: false, message: '대화방 접근 권한이 없습니다.' },
        { status: 403, headers: corsHeaders }
      );
    }

    const existing = await prisma.hwataAttachment.findFirst({
      where: { blobUrl, roomId },
    });
    if (existing) {
      return NextResponse.json(
        { ok: true, attachment: formatAttachment(existing) },
        { headers: corsHeaders }
      );
    }

    const created = await prisma.hwataAttachment.create({
      data: {
        roomId,
        uploaderId: member.id,
        fileName,
        mimeType,
        sizeBytes: BigInt(sizeBytes),
        storageProvider: 'vercel_blob',
        blobUrl,
        blobPathname: blobPathname || null,
      },
    });

    return NextResponse.json(
      { ok: true, attachment: formatAttachment(created) },
      { status: 201, headers: corsHeaders }
    );
  } catch (err) {
    console.error('[messenger/v1/upload/complete POST error]:', err);
    return NextResponse.json(
      { ok: false, message: '업로드 완료 등록 중 오류가 발생했습니다.' },
      { status: 500, headers: corsHeaders }
    );
  }
}
