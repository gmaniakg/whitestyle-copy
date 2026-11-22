import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireOwnerAdmin } from '@/app/api/_lib/admin';
import {
  ensureSeasonalCampaignsSeeded,
  getActiveSeasonalCampaign,
  getCurrentKstMonth,
} from '@/lib/seasonal-email';

export const dynamic = 'force-dynamic';

const SECURE_HEADERS = {
  'Cache-Control': 'no-store',
  'X-Robots-Tag': 'noindex, nofollow',
};

export async function GET() {
  const ownerEmail = await requireOwnerAdmin();
  if (!ownerEmail) {
    return NextResponse.json(
      { ok: false, message: '소유자 관리자 권한이 필요합니다.' },
      { status: 403, headers: SECURE_HEADERS }
    );
  }

  try {
    await ensureSeasonalCampaignsSeeded();
    const [campaigns, activeCampaign] = await Promise.all([
      prisma.seasonalCampaign.findMany({ orderBy: [{ startMonth: 'asc' }, { createdAt: 'asc' }] }),
      getActiveSeasonalCampaign(),
    ]);

    return NextResponse.json(
      {
        ok: true,
        kstMonth: getCurrentKstMonth(),
        activeSlug: activeCampaign.slug,
        campaigns,
      },
      { headers: SECURE_HEADERS }
    );
  } catch (err) {
    console.error('[api/admin/campaigns GET error]:', err);
    return NextResponse.json(
      { ok: false, message: '시즌 캠페인 조회 중 오류가 발생했습니다.' },
      { status: 500, headers: SECURE_HEADERS }
    );
  }
}

async function upsertCampaign(req: NextRequest) {
  const ownerEmail = await requireOwnerAdmin();
  if (!ownerEmail) {
    return NextResponse.json(
      { ok: false, message: '소유자 관리자 권한이 필요합니다.' },
      { status: 403, headers: SECURE_HEADERS }
    );
  }

  try {
    await ensureSeasonalCampaignsSeeded();
    const body = await req.json().catch(() => ({}));
    const slug = String(body.slug || '').trim();
    if (!slug) {
      return NextResponse.json(
        { ok: false, message: '캠페인 식별자(slug)가 필요합니다.' },
        { status: 400, headers: SECURE_HEADERS }
      );
    }

    const isActiveOverride = Boolean(body.isActiveOverride);
    if (isActiveOverride) {
      await prisma.seasonalCampaign.updateMany({
        where: { slug: { not: slug } },
        data: { isActiveOverride: false },
      });
    }

    const startMonth = Math.min(12, Math.max(1, Number(body.startMonth || 1)));
    const endMonth = Math.min(12, Math.max(1, Number(body.endMonth || 12)));

    const saved = await prisma.seasonalCampaign.upsert({
      where: { slug },
      update: {
        title: String(body.title || '').trim().slice(0, 120),
        subject: String(body.subject || '').trim().slice(0, 160),
        headline: String(body.headline || '').trim().slice(0, 200),
        bodyHtml: String(body.bodyHtml || '').trim().slice(0, 10000),
        ctaLabel: String(body.ctaLabel || '네이버 빠른 예약').trim().slice(0, 60),
        ctaUrl: String(body.ctaUrl || 'https://booking.naver.com/booking/13/bizes/265482').trim().slice(0, 300),
        startMonth,
        endMonth,
        isActiveOverride,
      },
      create: {
        slug,
        seasonKey: String(body.seasonKey || 'CUSTOM').slice(0, 20),
        title: String(body.title || slug).trim().slice(0, 120),
        subject: String(body.subject || slug).trim().slice(0, 160),
        headline: String(body.headline || slug).trim().slice(0, 200),
        bodyHtml: String(body.bodyHtml || '').trim().slice(0, 10000),
        ctaLabel: String(body.ctaLabel || '네이버 빠른 예약').trim().slice(0, 60),
        ctaUrl: String(body.ctaUrl || 'https://booking.naver.com/booking/13/bizes/265482').trim().slice(0, 300),
        startMonth,
        endMonth,
        isActiveOverride,
      },
    });

    const active = await getActiveSeasonalCampaign();
    return NextResponse.json(
      { ok: true, campaign: saved, activeSlug: active.slug },
      { headers: SECURE_HEADERS }
    );
  } catch (err) {
    console.error('[api/admin/campaigns UPSERT error]:', err);
    return NextResponse.json(
      { ok: false, message: '시즌 캠페인 저장 중 오류가 발생했습니다.' },
      { status: 500, headers: SECURE_HEADERS }
    );
  }
}

export async function POST(req: NextRequest) {
  return upsertCampaign(req);
}

export async function PATCH(req: NextRequest) {
  return upsertCampaign(req);
}
