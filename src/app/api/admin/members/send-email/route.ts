import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireOwnerAdmin } from '@/app/api/_lib/admin';
import { sendWelcomeSeasonalEmail } from '@/lib/seasonal-email';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const SECURE_HEADERS = {
  'Cache-Control': 'no-store',
  'X-Robots-Tag': 'noindex, nofollow',
};

export async function POST(req: NextRequest) {
  const ownerEmail = await requireOwnerAdmin();
  if (!ownerEmail) {
    return NextResponse.json(
      { ok: false, message: '소유자 관리자 권한이 필요합니다.' },
      { status: 403, headers: SECURE_HEADERS }
    );
  }

  try {
    const body = await req.json().catch(() => ({}));
    const mode = String(body.mode || 'single').trim();
    const campaignSlug = typeof body.campaignSlug === 'string' && body.campaignSlug.trim()
      ? body.campaignSlug.trim()
      : undefined;

    if (mode === 'test') {
      const targetEmail = (typeof body.testTo === 'string' && body.testTo.includes('@')
        ? body.testTo.trim().toLowerCase()
        : ownerEmail);

      const ownerUser = await prisma.user.findUnique({
        where: { email: ownerEmail },
        select: { id: true, name: true, email: true, agreedMarketing: true },
      });

      const res = await sendWelcomeSeasonalEmail(
        {
          id: ownerUser?.id || `test_${Date.now()}`,
          email: targetEmail,
          name: ownerUser?.name || '원장님(테스트)',
          agreedMarketing: true,
        },
        { campaignSlug, kind: 'TEST' }
      );

      return NextResponse.json(
        {
          ok: res.ok,
          mode,
          result: res,
          message: res.ok
            ? `테스트 이메일을 ${targetEmail}로 발송했습니다.`
            : res.error || '이메일 발송 설정을 확인해 주세요.',
        },
        { status: res.ok ? 200 : 200, headers: SECURE_HEADERS }
      );
    }

    if (mode === 'single') {
      const userId = String(body.userId || '').trim();
      if (!userId) {
        return NextResponse.json(
          { ok: false, message: '대상 회원 ID가 필요합니다.' },
          { status: 400, headers: SECURE_HEADERS }
        );
      }

      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          email: true,
          name: true,
          agreedMarketing: true,
          isVerifiedNonInsured: true,
          verifiedTreatment: true,
        },
      });

      if (!user || !user.email) {
        return NextResponse.json(
          { ok: false, message: '이메일이 등록된 회원이 아닙니다.' },
          { status: 404, headers: SECURE_HEADERS }
        );
      }

      const res = await sendWelcomeSeasonalEmail(user, {
        campaignSlug,
        kind: 'PROMO_BROADCAST',
      });

      return NextResponse.json(
        {
          ok: res.ok,
          mode,
          result: res,
          message: res.ok
            ? `${user.email}로 시즌 안내 메일을 발송했습니다.`
            : res.error || '이메일 발송에 실패했습니다.',
        },
        { headers: SECURE_HEADERS }
      );
    }

    if (mode === 'broadcast_marketing' || mode === 'resend_unmailed') {
      const targets = await prisma.user.findMany({
        where:
          mode === 'broadcast_marketing'
            ? { agreedMarketing: true, isBlocked: false, email: { not: null } }
            : { welcomeEmailSentAt: null, isBlocked: false, email: { not: null } },
        take: 100,
        select: {
          id: true,
          email: true,
          name: true,
          agreedMarketing: true,
          isVerifiedNonInsured: true,
          verifiedTreatment: true,
        },
      });

      let sent = 0;
      let failed = 0;
      let skippedNoConfig = 0;

      for (const user of targets) {
        if (!user.email) continue;
        const r = await sendWelcomeSeasonalEmail(user, {
          campaignSlug,
          kind: mode === 'resend_unmailed' ? 'WELCOME_SEASONAL' : 'PROMO_BROADCAST',
        });
        if (r.ok) sent += 1;
        else if (r.status === 'SKIPPED_NO_CONFIG') skippedNoConfig += 1;
        else failed += 1;
      }

      return NextResponse.json(
        {
          ok: true,
          mode,
          summary: {
            totalTarget: targets.length,
            sent,
            failed,
            skippedNoConfig,
          },
          message:
            skippedNoConfig > 0 && sent === 0
              ? '이메일 발송 키(RESEND_API_KEY 또는 SMTP_USER/SMTP_PASS)가 미설정 상태라 발송이 대기 처리되었습니다.'
              : `총 ${targets.length}명 중 ${sent}명 발송 완료 (실패 ${failed}건)`,
        },
        { headers: SECURE_HEADERS }
      );
    }

    return NextResponse.json(
      { ok: false, message: '지원하지 않는 발송 모드입니다.' },
      { status: 400, headers: SECURE_HEADERS }
    );
  } catch (err) {
    console.error('[api/admin/members/send-email POST error]:', err);
    return NextResponse.json(
      { ok: false, message: '이메일 발송 처리 중 오류가 발생했습니다.' },
      { status: 500, headers: SECURE_HEADERS }
    );
  }
}
