import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getOwnerAdminEmails, isOwnerAdminEmail, requireOwnerAdmin } from '@/app/api/_lib/admin';
import { getEmailProviderStatus } from '@/lib/mailer';
import { ensureSeasonalCampaignsSeeded, getActiveSeasonalCampaign } from '@/lib/seasonal-email';

export const dynamic = 'force-dynamic';

const SECURE_HEADERS = {
  'Cache-Control': 'no-store',
  'X-Robots-Tag': 'noindex, nofollow',
};

function isConfiguredEnv(val?: string): boolean {
  return Boolean(val && !val.startsWith('your_') && val !== 'placeholder');
}

export async function GET(req: NextRequest) {
  const ownerEmail = await requireOwnerAdmin();
  if (!ownerEmail) {
    return NextResponse.json(
      { ok: false, message: '소유자 관리자 권한이 필요합니다.' },
      { status: 403, headers: SECURE_HEADERS }
    );
  }

  try {
    await ensureSeasonalCampaignsSeeded();

    const { searchParams } = new URL(req.url);
    const q = (searchParams.get('q') || '').trim().toLowerCase();
    const filter = (searchParams.get('filter') || 'all').trim();
    const sort = (searchParams.get('sort') || 'newest').trim();

    const where: Record<string, unknown> = {};
    if (filter === 'verified') where.isVerifiedNonInsured = true;
    else if (filter === 'unverified') where.isVerifiedNonInsured = false;
    else if (filter === 'marketing') where.agreedMarketing = true;
    else if (filter === 'blocked') where.isBlocked = true;
    else if (filter === 'social') where.accounts = { some: {} };

    if (q) {
      where.OR = [
        { name: { contains: q, mode: 'insensitive' } },
        { email: { contains: q, mode: 'insensitive' } },
        { phone: { contains: q, mode: 'insensitive' } },
        { chartNo: { contains: q, mode: 'insensitive' } },
        { handle: { contains: q, mode: 'insensitive' } },
        { verifiedTreatment: { contains: q, mode: 'insensitive' } },
      ];
    }

    const orderBy =
      sort === 'lastLogin'
        ? [{ lastLoginAt: 'desc' as const }, { createdAt: 'desc' as const }]
        : [{ createdAt: 'desc' as const }];

    const [
      users,
      totalUsers,
      verifiedUsers,
      marketingUsers,
      blockedUsers,
      totalEmailsSent,
      activeCampaign,
      recentEmailLogs,
    ] = await Promise.all([
      prisma.user.findMany({
        where,
        orderBy,
        take: 250,
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          image: true,
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
          password: true,
          accounts: { select: { provider: true } },
          _count: {
            select: {
              emailLogs: true,
              sentMessages: true,
            },
          },
        },
      }),
      prisma.user.count(),
      prisma.user.count({ where: { isVerifiedNonInsured: true } }),
      prisma.user.count({ where: { agreedMarketing: true } }),
      prisma.user.count({ where: { isBlocked: true } }),
      prisma.emailLog.count({ where: { status: 'SENT' } }),
      getActiveSeasonalCampaign(),
      prisma.emailLog.findMany({
        orderBy: { createdAt: 'desc' },
        take: 30,
      }),
    ]);

    const items = users.map((u) => ({
      id: u.id,
      name: u.name,
      email: u.email,
      phone: u.phone,
      role: u.role,
      handle: u.handle,
      isOwner: isOwnerAdminEmail(u.email),
      hasPassword: Boolean(u.password),
      providers: u.accounts.map((a) => a.provider),
      agreedPrivacy: u.agreedPrivacy,
      agreedMarketing: u.agreedMarketing,
      consentAt: u.consentAt,
      createdAt: u.createdAt,
      lastLoginAt: u.lastLoginAt,
      lastSeenAt: u.lastSeenAt,
      isBlocked: u.isBlocked,
      adminMemo: u.adminMemo,
      isVerifiedNonInsured: u.isVerifiedNonInsured,
      verifiedTreatment: u.verifiedTreatment,
      chartNo: u.chartNo,
      verifiedAt: u.verifiedAt,
      verifiedBy: u.verifiedBy,
      welcomeEmailSentAt: u.welcomeEmailSentAt,
      lastPromoEmailSentAt: u.lastPromoEmailSentAt,
      emailCount: u._count.emailLogs,
      messageCount: u._count.sentMessages,
    }));

    return NextResponse.json(
      {
        ok: true,
        ownerEmail,
        items,
        kpis: {
          totalUsers,
          verifiedUsers,
          marketingUsers,
          blockedUsers,
          totalEmailsSent,
          activeCampaignSlug: activeCampaign.slug,
          activeCampaignTitle: activeCampaign.title,
        },
        systemStatus: {
          email: getEmailProviderStatus(),
          blobConfigured: Boolean((process.env.BLOB_READ_WRITE_TOKEN || '').trim()),
          oauth: {
            google: Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET),
            kakao: Boolean(
              isConfiguredEnv(process.env.KAKAO_CLIENT_ID) &&
                (isConfiguredEnv(process.env.KAKAO_CLIENT_SECRET) ||
                  process.env.KAKAO_ALLOW_NO_SECRET === 'true')
            ),
            naver: Boolean(
              isConfiguredEnv(process.env.NAVER_CLIENT_ID) &&
                isConfiguredEnv(process.env.NAVER_CLIENT_SECRET)
            ),
          },
          ownerEmails: getOwnerAdminEmails(),
        },
        recentEmailLogs,
      },
      { headers: SECURE_HEADERS }
    );
  } catch (err) {
    console.error('[api/admin/members GET error]:', err);
    return NextResponse.json(
      { ok: false, message: '회원 목록을 불러오는 중 오류가 발생했습니다.' },
      { status: 500, headers: SECURE_HEADERS }
    );
  }
}
