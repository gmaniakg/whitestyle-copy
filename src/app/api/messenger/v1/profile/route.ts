import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import {
  buildHwataCorsHeaders,
  loginRequiredResponse,
  requireHwataMember,
} from '@/app/api/_lib/hwata-auth';
import { sanitizeAvatar } from '@/lib/messenger/server';

export const dynamic = 'force-dynamic';

export async function OPTIONS(req: NextRequest) {
  return new NextResponse(null, { status: 204, headers: buildHwataCorsHeaders(req) });
}

export async function PATCH(req: NextRequest) {
  const member = await requireHwataMember(req);
  if (!member) return loginRequiredResponse(req);
  const corsHeaders = buildHwataCorsHeaders(req);

  try {
    const body = await req.json().catch(() => ({}));
    const updateData: Record<string, unknown> = {};

    if (typeof body.name === 'string' && body.name.trim()) {
      updateData.name = body.name.trim().slice(0, 30);
    }
    if (typeof body.statusMessage === 'string') {
      updateData.statusMessage = body.statusMessage.trim().slice(0, 120) || null;
    }
    if (typeof body.handle === 'string' && body.handle.trim()) {
      const cleanHandle = body.handle
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9_]/g, '')
        .slice(0, 24);
      if (cleanHandle.length < 3) {
        return NextResponse.json(
          { ok: false, message: '대화 ID(핸들)는 영문·숫자·밑줄 3자 이상이어야 합니다.' },
          { status: 400, headers: corsHeaders }
        );
      }
      const dup = await prisma.user.findFirst({
        where: { handle: cleanHandle, NOT: { id: member.id } },
        select: { id: true },
      });
      if (dup) {
        return NextResponse.json(
          { ok: false, message: '이미 사용 중인 대화 ID입니다.' },
          { status: 409, headers: corsHeaders }
        );
      }
      updateData.handle = cleanHandle;
    }
    if (body.petAvatar && typeof body.petAvatar === 'object') {
      updateData.petAvatarJson = JSON.stringify(sanitizeAvatar(body.petAvatar));
    }

    const updated = await prisma.user.update({
      where: { id: member.id },
      data: updateData,
      select: {
        id: true,
        name: true,
        handle: true,
        statusMessage: true,
        petAvatarJson: true,
      },
    });

    return NextResponse.json(
      {
        ok: true,
        profile: {
          id: updated.id,
          name: updated.name,
          handle: updated.handle,
          statusMessage: updated.statusMessage,
          petAvatar: updated.petAvatarJson ? JSON.parse(updated.petAvatarJson) : null,
        },
      },
      { headers: corsHeaders }
    );
  } catch (err) {
    console.error('[messenger/v1/profile PATCH error]:', err);
    return NextResponse.json(
      { ok: false, message: '프로필 저장 중 오류가 발생했습니다.' },
      { status: 500, headers: corsHeaders }
    );
  }
}
