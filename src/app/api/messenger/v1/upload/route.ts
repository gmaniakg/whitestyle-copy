import { NextRequest, NextResponse } from 'next/server';
import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { prisma } from '@/lib/prisma';
import {
  buildHwataCorsHeaders,
  loginRequiredResponse,
  requireHwataMember,
} from '@/app/api/_lib/hwata-auth';
import { canAccessRoom, isBlobConfigured, isBlockedFileName } from '@/lib/messenger/server';

export const dynamic = 'force-dynamic';

export async function OPTIONS(req: NextRequest) {
  return new NextResponse(null, { status: 204, headers: buildHwataCorsHeaders(req) });
}

export async function POST(req: NextRequest) {
  const corsHeaders = buildHwataCorsHeaders(req);

  if (!isBlobConfigured()) {
    return NextResponse.json(
      { error: '클라우드 대용량 스토리지가 연결되어 있지 않습니다. 소용량 폴백 또는 P2P 직통 전송을 이용해 주세요.' },
      { status: 503, headers: corsHeaders }
    );
  }

  let body: HandleUploadBody;
  try {
    body = (await req.json()) as HandleUploadBody;
  } catch {
    return NextResponse.json({ error: '잘못된 업로드 요청입니다.' }, { status: 400, headers: corsHeaders });
  }

  // 토큰 발급 요청은 반드시 로그인 회원 및 대화방 접근권한을 검증
  let currentMemberId = '';
  let maxUploadBytes = 100 * 1024 * 1024;
  if (body.type === 'blob.generate-client-token') {
    const member = await requireHwataMember(req);
    if (!member) return loginRequiredResponse(req);
    currentMemberId = member.id;
    maxUploadBytes = member.isVerifiedNonInsured || member.isOwnerAdmin
      ? 500 * 1024 * 1024
      : 100 * 1024 * 1024;
  }

  try {
    const jsonResponse = await handleUpload({
      body,
      request: req,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        if (!currentMemberId) {
          throw new Error('로그인이 필요합니다.');
        }

        let meta: { roomId?: string; fileName?: string; mimeType?: string; sizeBytes?: number } = {};
        try {
          meta = clientPayload ? JSON.parse(clientPayload) : {};
        } catch {
          meta = {};
        }

        const roomId = String(meta.roomId || '').trim();
        const fileName = String(meta.fileName || pathname.split('/').pop() || 'file');
        const sizeBytes = Number(meta.sizeBytes || 0);

        if (!roomId) {
          throw new Error('대화방 정보가 누락되었습니다.');
        }
        const access = await canAccessRoom(roomId, currentMemberId);
        if (!access) {
          throw new Error('이 대화방에 파일을 올릴 권한이 없습니다.');
        }
        if (isBlockedFileName(fileName) || isBlockedFileName(pathname)) {
          throw new Error('보안상 실행 파일(.exe, .bat, .sh 등)은 업로드할 수 없습니다.');
        }
        if (sizeBytes > maxUploadBytes) {
          throw new Error(`허용 용량(${Math.round(maxUploadBytes / (1024 * 1024))}MB)을 초과했습니다. P2P 직통 전송을 이용해 주세요.`);
        }

        return {
          maximumSizeInBytes: maxUploadBytes,
          addRandomSuffix: true,
          tokenPayload: JSON.stringify({
            roomId,
            uploaderId: currentMemberId,
            fileName,
            mimeType: String(meta.mimeType || 'application/octet-stream').slice(0, 120),
            sizeBytes,
          }),
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        try {
          const meta = tokenPayload ? JSON.parse(tokenPayload) : null;
          if (!meta?.roomId || !meta?.uploaderId) return;

          const existing = await prisma.hwataAttachment.findFirst({
            where: { blobUrl: blob.url },
            select: { id: true },
          });
          if (existing) return;

          await prisma.hwataAttachment.create({
            data: {
              roomId: String(meta.roomId),
              uploaderId: String(meta.uploaderId),
              fileName: String(meta.fileName || blob.pathname.split('/').pop() || 'file').slice(0, 200),
              mimeType: String(blob.contentType || meta.mimeType || 'application/octet-stream').slice(0, 120),
              sizeBytes: BigInt(Number(meta.sizeBytes || 0)),
              storageProvider: 'vercel_blob',
              blobUrl: blob.url,
              blobPathname: blob.pathname,
            },
          });
        } catch (err) {
          console.error('[messenger/v1/upload onUploadCompleted error]:', err);
        }
      },
    });

    return NextResponse.json(jsonResponse, { headers: corsHeaders });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '파일 업로드 토큰 발급에 실패했습니다.' },
      { status: 400, headers: corsHeaders }
    );
  }
}
