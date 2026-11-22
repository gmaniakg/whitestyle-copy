import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import {
  buildHwataCorsHeaders,
  loginRequiredResponse,
  requireHwataMember,
} from '@/app/api/_lib/hwata-auth';
import { canAccessRoom, formatAttachment, isBlockedFileName } from '@/lib/messenger/server';

export const dynamic = 'force-dynamic';

const MAX_FALLBACK_BYTES = Math.floor(3.5 * 1024 * 1024);

export async function OPTIONS(req: NextRequest) {
  return new NextResponse(null, { status: 204, headers: buildHwataCorsHeaders(req) });
}

export async function POST(req: NextRequest) {
  const member = await requireHwataMember(req);
  if (!member) return loginRequiredResponse(req);
  const corsHeaders = buildHwataCorsHeaders(req);

  try {
    const formData = await req.formData();
    const roomId = String(formData.get('roomId') || '').trim();
    const file = formData.get('file');

    if (!roomId || !(file instanceof File)) {
      return NextResponse.json(
        { ok: false, message: '대화방 정보와 파일이 필요합니다.' },
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

    if (isBlockedFileName(file.name)) {
      return NextResponse.json(
        { ok: false, message: '보안상 실행 파일(.exe, .bat, .sh 등)은 전송할 수 없습니다.' },
        { status: 400, headers: corsHeaders }
      );
    }

    if (file.size > MAX_FALLBACK_BYTES) {
      return NextResponse.json(
        { ok: false, message: '소용량 폴백은 3.5MB 이하만 지원합니다. 대용량은 P2P 직통 전송을 이용해 주세요.' },
        { status: 413, headers: corsHeaders }
      );
    }

    const buf = Buffer.from(await file.arrayBuffer());
    const base64 = buf.toString('base64');

    const created = await prisma.hwataAttachment.create({
      data: {
        roomId,
        uploaderId: member.id,
        fileName: file.name.slice(0, 200),
        mimeType: (file.type || 'application/octet-stream').slice(0, 120),
        sizeBytes: BigInt(file.size),
        storageProvider: 'inline_db',
        inlineDataBase64: base64,
      },
    });

    return NextResponse.json(
      { ok: true, attachment: formatAttachment(created) },
      { status: 201, headers: corsHeaders }
    );
  } catch (err) {
    console.error('[messenger/v1/upload/fallback POST error]:', err);
    return NextResponse.json(
      { ok: false, message: '파일 저장 중 오류가 발생했습니다.' },
      { status: 500, headers: corsHeaders }
    );
  }
}
