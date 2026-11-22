import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isOwnerAdminEmail, requireOwnerAdmin } from '@/app/api/_lib/admin';
import { sendVerifiedHwataPetEmail } from '@/lib/seasonal-email';

export const dynamic = 'force-dynamic';

const SECURE_HEADERS = {
  'Cache-Control': 'no-store',
  'X-Robots-Tag': 'noindex, nofollow',
};

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const ownerEmail = await requireOwnerAdmin();
  if (!ownerEmail) {
    return NextResponse.json(
      { ok: false, message: '소유자 관리자 권한이 필요합니다.' },
      { status: 403, headers: SECURE_HEADERS }
    );
  }

  try {
    const { id } = await context.params;
    const body = await req.json().catch(() => ({}));

    const existing = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        agreedMarketing: true,
        isVerifiedNonInsured: true,
        verifiedTreatment: true,
      },
    });

    if (!existing) {
      return NextResponse.json(
        { ok: false, message: '해당 회원을 찾을 수 없습니다.' },
        { status: 404, headers: SECURE_HEADERS }
      );
    }

    const updateData: Record<string, unknown> = {};

    if (typeof body.name === 'string') {
      updateData.name = body.name.trim().slice(0, 50) || existing.name;
    }
    if (typeof body.phone === 'string') {
      updateData.phone = body.phone.trim().replace(/[^\d-]/g, '').slice(0, 20) || null;
    }
    if (typeof body.adminMemo === 'string') {
      updateData.adminMemo = body.adminMemo.trim().slice(0, 1000) || null;
    }
    if (typeof body.chartNo === 'string') {
      updateData.chartNo = body.chartNo.trim().replace(/[^a-zA-Z0-9-]/g, '').slice(0, 24) || null;
    }
    if (typeof body.verifiedTreatment === 'string') {
      updateData.verifiedTreatment = body.verifiedTreatment.trim().slice(0, 80) || null;
    }
    if (typeof body.agreedMarketing === 'boolean') {
      updateData.agreedMarketing = body.agreedMarketing;
    }
    if (typeof body.isBlocked === 'boolean') {
      if (isOwnerAdminEmail(existing.email) && body.isBlocked) {
        return NextResponse.json(
          { ok: false, message: '소유자 계정은 차단할 수 없습니다.' },
          { status: 400, headers: SECURE_HEADERS }
        );
      }
      updateData.isBlocked = body.isBlocked;
    }

    let becameVerified = false;
    if (typeof body.isVerifiedNonInsured === 'boolean') {
      updateData.isVerifiedNonInsured = body.isVerifiedNonInsured;
      if (body.isVerifiedNonInsured) {
        if (!existing.isVerifiedNonInsured) {
          becameVerified = true;
          updateData.verifiedAt = new Date();
          updateData.verifiedBy = ownerEmail;
        }
        if (!updateData.verifiedTreatment && !existing.verifiedTreatment) {
          updateData.verifiedTreatment = '비보험 진료 정회원';
        }
      } else {
        updateData.verifiedAt = null;
        updateData.verifiedBy = null;
      }
    }

    const updated = await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        handle: true,
        agreedPrivacy: true,
        agreedMarketing: true,
        consentAt: true,
        createdAt: true,
        lastLoginAt: true,
        lastSeenAt: true,
        isBlocked: true,
        adminMemo: true,
        isVerifiedNonInsured: true,
        verifiedTreatment: true,
        chartNo: true,
        verifiedAt: true,
        verifiedBy: true,
        welcomeEmailSentAt: true,
        lastPromoEmailSentAt: true,
      },
    });

    let verificationEmailResult = null;
    if (becameVerified && body.sendVerificationEmail !== false && updated.email) {
      verificationEmailResult = await sendVerifiedHwataPetEmail({
        id: updated.id,
        email: updated.email,
        name: updated.name,
        agreedMarketing: updated.agreedMarketing,
        isVerifiedNonInsured: updated.isVerifiedNonInsured,
        verifiedTreatment: updated.verifiedTreatment,
      }).catch(() => null);
    }

    return NextResponse.json(
      {
        ok: true,
        item: updated,
        verificationEmailSent: verificationEmailResult?.ok ?? false,
      },
      { headers: SECURE_HEADERS }
    );
  } catch (err) {
    console.error('[api/admin/members/[id] PATCH error]:', err);
    return NextResponse.json(
      { ok: false, message: '회원 정보 수정 중 오류가 발생했습니다.' },
      { status: 500, headers: SECURE_HEADERS }
    );
  }
}

export async function DELETE(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const ownerEmail = await requireOwnerAdmin();
  if (!ownerEmail) {
    return NextResponse.json(
      { ok: false, message: '소유자 관리자 권한이 필요합니다.' },
      { status: 403, headers: SECURE_HEADERS }
    );
  }

  try {
    const { id } = await context.params;
    const target = await prisma.user.findUnique({
      where: { id },
      select: { id: true, email: true },
    });

    if (!target) {
      return NextResponse.json(
        { ok: false, message: '해당 회원을 찾을 수 없습니다.' },
        { status: 404, headers: SECURE_HEADERS }
      );
    }

    if (isOwnerAdminEmail(target.email)) {
      return NextResponse.json(
        { ok: false, message: '소유자 관리자 계정은 삭제할 수 없습니다.' },
        { status: 400, headers: SECURE_HEADERS }
      );
    }

    await prisma.user.delete({ where: { id } });

    return NextResponse.json(
      { ok: true, deletedId: id },
      { headers: SECURE_HEADERS }
    );
  } catch (err) {
    console.error('[api/admin/members/[id] DELETE error]:', err);
    return NextResponse.json(
      { ok: false, message: '회원 삭제 중 오류가 발생했습니다.' },
      { status: 500, headers: SECURE_HEADERS }
    );
  }
}
