import crypto from 'crypto';
import { prisma } from '@/lib/prisma';
import { sendEmail, type SendEmailResult } from '@/lib/mailer';

export interface SeasonalCampaignInput {
  slug: string;
  seasonKey: 'YEAR_END' | 'NEW_YEAR' | 'SPRING' | 'SUMMER' | 'AUTUMN' | 'CUSTOM';
  title: string;
  subject: string;
  headline: string;
  bodyHtml: string;
  ctaLabel: string;
  ctaUrl: string;
  startMonth: number;
  endMonth: number;
  isActiveOverride?: boolean;
}

export const DEFAULT_SEASONAL_CAMPAIGNS: SeasonalCampaignInput[] = [
  {
    slug: 'year_end_scaling_2026',
    seasonKey: 'YEAR_END',
    title: '2026 연말 건강보험 스케일링 마감 안내',
    subject: '[화이트스타일치과] 회원가입 환영 & 2026 연말 건강보험 스케일링 마감 안내',
    headline: '2026년 연말, 놓치면 소멸되는 건강보험 스케일링 혜택을 지금 챙기세요',
    bodyHtml: `
      <p style="margin:0 0 14px 0;">만 19세 이상이라면 매년 1월 1일부터 12월 31일까지 <strong>연 1회 건강보험 적용 스케일링</strong>을 받으실 수 있습니다.</p>
      <p style="margin:0 0 14px 0;">올해 12월 31일이 지나면 사용하지 않은 연간 보험 스케일링 혜택은 다음 해로 이월되지 않고 소멸됩니다. 연말에는 예약이 빠르게 마감되므로 <strong>12월 중순 이전 여유 있는 예약</strong>을 권장합니다.</p>
      <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:16px;margin:16px 0;">
        <div style="font-weight:700;color:#0f294a;margin-bottom:8px;">연말 내원 시 함께 확인하세요</div>
        <ul style="margin:0;padding-left:18px;color:#334155;line-height:1.75;">
          <li><strong>치주과 전문의 협진:</strong> 보건복지부 인증 치주과 전문의 박선혜 원장 등 3인 원장단 책임 진료</li>
          <li><strong>3단계 통증 완화 마취:</strong> 가글 마취 → 도포 마취 → 디지털 정압 무통 마취</li>
          <li><strong>비보험 진료 회원 혜택:</strong> 치아교정·라미네이트·임플란트·미백 등 비보험 진료 인증 시 <strong>인증된 화타펫</strong>으로 홈페이지 지인 메신저(화타톡) 대용량 파일 전송 및 프라이빗 대화방 개설 가능</li>
        </ul>
      </div>
    `.trim(),
    ctaLabel: '네이버 빠른 예약 (1분 완료)',
    ctaUrl: 'https://booking.naver.com/booking/13/bizes/265482',
    startMonth: 11,
    endMonth: 12,
    isActiveOverride: false,
  },
  {
    slug: 'new_year_checkup',
    seasonKey: 'NEW_YEAR',
    title: '새해 건강보험 스케일링 리셋 & 정기검진 안내',
    subject: '[화이트스타일치과] 회원가입 환영 & 새해 건강보험 스케일링 리셋 안내',
    headline: '새해와 함께 다시 열린 연 1회 건강보험 스케일링으로 건강한 미소를 시작하세요',
    bodyHtml: `
      <p style="margin:0 0 14px 0;">새해 1월 1일부터 만 19세 이상 건강보험 적용 스케일링 연간 1회 혜택이 새롭게 시작되었습니다.</p>
      <p style="margin:0 0 14px 0;">대기 시간이 적은 연초에 구강검진과 잇몸 상태를 미리 점검하시고, 교정·심미보철·임플란트 상담도 3인 원장단 협진으로 꼼꼼히 받아보세요.</p>
    `.trim(),
    ctaLabel: '네이버 빠른 예약 (1분 완료)',
    ctaUrl: 'https://booking.naver.com/booking/13/bizes/265482',
    startMonth: 1,
    endMonth: 2,
    isActiveOverride: false,
  },
  {
    slug: 'spring_smile_whitening',
    seasonKey: 'SPRING',
    title: '봄 시즌 원데이 전문가 미백 & 최소삭제 심미보철 안내',
    subject: '[화이트스타일치과] 회원가입 환영 & 봄맞이 미백·최소삭제 심미보철 안내',
    headline: '자연치아를 지키는 0.1~0.3mm 최소삭제 심미보철과 원데이 미백 안내',
    bodyHtml: `
      <p style="margin:0 0 14px 0;">화사한 봄 시즌을 맞아 자연치아 보존을 최우선으로 삼는 화이트스타일치과의원의 최소삭제 세라믹 디자인과 식약처 허가 원데이 전문가 치아미백을 안내해 드립니다.</p>
      <p style="margin:0 0 14px 0;">비보험 심미보철 또는 전문가 미백 진료를 받으시면 <strong>인증된 화타펫</strong> 전용 지인 메신저(화타톡) 기능도 바로 해금됩니다.</p>
    `.trim(),
    ctaLabel: '심미치료 · 미백 상담 예약',
    ctaUrl: 'https://booking.naver.com/booking/13/bizes/265482',
    startMonth: 3,
    endMonth: 5,
    isActiveOverride: false,
  },
  {
    slug: 'summer_ortho_implant',
    seasonKey: 'SUMMER',
    title: '여름 시즌 치아교정 · 3D CT 정밀 임플란트 안내',
    subject: '[화이트스타일치과] 회원가입 환영 & 여름 집중 치아교정·임플란트 안내',
    headline: '방학·휴가 시즌에 맞춘 1:1 치아교정 및 3D CT 임플란트 맞춤 계획',
    bodyHtml: `
      <p style="margin:0 0 14px 0;">서울대졸·교정학 박사 김준헌 병원장의 1:1 책임 치아교정과 3인 원장단 협진 3D CT 정밀 임플란트로 일정에 맞춘 집중 진료 계획을 세워보세요.</p>
      <p style="margin:0 0 14px 0;">비보험 교정·임플란트 치료 시 발급되는 원내 인증코드로 <strong>인증된 화타펫</strong> 메신저 혜택을 함께 이용하실 수 있습니다.</p>
    `.trim(),
    ctaLabel: '정밀 진단 예약하기',
    ctaUrl: 'https://booking.naver.com/booking/13/bizes/265482',
    startMonth: 6,
    endMonth: 8,
    isActiveOverride: false,
  },
  {
    slug: 'autumn_perio_care',
    seasonKey: 'AUTUMN',
    title: '가을 치주과 전문의 잇몸 검진 & 사전 스케일링 안내',
    subject: '[화이트스타일치과] 회원가입 환영 & 가을 치주 검진 및 스케일링 안내',
    headline: '연말 예약 혼잡 전, 치주과 전문의와 함께하는 가을 잇몸·스케일링 케어',
    bodyHtml: `
      <p style="margin:0 0 14px 0;">연말이 다가오기 전 여유롭게 건강보험 연 1회 스케일링과 보건복지부 인증 치주과 전문의 박선혜 원장님의 잇몸 건강 점검을 받아보세요.</p>
    `.trim(),
    ctaLabel: '스케일링 · 잇몸검진 예약',
    ctaUrl: 'https://booking.naver.com/booking/13/bizes/265482',
    startMonth: 9,
    endMonth: 10,
    isActiveOverride: false,
  },
];

function escapeHtml(raw: string): string {
  return String(raw || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function getCurrentKstMonth(now = new Date()): number {
  const kstString = now.toLocaleString('en-US', { timeZone: 'Asia/Seoul', month: 'numeric' });
  const m = Number(kstString);
  return Number.isFinite(m) && m >= 1 && m <= 12 ? m : now.getUTCMonth() + 1;
}

let seededOnce = false;
export async function ensureSeasonalCampaignsSeeded() {
  if (seededOnce) return;
  for (const c of DEFAULT_SEASONAL_CAMPAIGNS) {
    await prisma.seasonalCampaign.upsert({
      where: { slug: c.slug },
      update: {},
      create: {
        slug: c.slug,
        seasonKey: c.seasonKey,
        title: c.title,
        subject: c.subject,
        headline: c.headline,
        bodyHtml: c.bodyHtml,
        ctaLabel: c.ctaLabel,
        ctaUrl: c.ctaUrl,
        startMonth: c.startMonth,
        endMonth: c.endMonth,
        isActiveOverride: Boolean(c.isActiveOverride),
      },
    });
  }
  seededOnce = true;
}

export async function getActiveSeasonalCampaign(now = new Date(), campaignSlug?: string) {
  await ensureSeasonalCampaignsSeeded();
  if (campaignSlug) {
    const exact = await prisma.seasonalCampaign.findUnique({ where: { slug: campaignSlug } });
    if (exact) return exact;
  }

  const all = await prisma.seasonalCampaign.findMany({
    orderBy: [{ isActiveOverride: 'desc' }, { startMonth: 'asc' }],
  });

  const override = all.find((c) => c.isActiveOverride);
  if (override) return override;

  const kstMonth = getCurrentKstMonth(now);
  const byMonth = all.find((c) =>
    c.startMonth <= c.endMonth
      ? kstMonth >= c.startMonth && kstMonth <= c.endMonth
      : kstMonth >= c.startMonth || kstMonth <= c.endMonth
  );
  return byMonth || all[0];
}

function getUnsubSecret(): string {
  return process.env.NEXTAUTH_SECRET || 'whitestyle-unsub-secret-2026';
}

export function signUnsubscribeToken(userId: string): string {
  const sig = crypto
    .createHmac('sha256', getUnsubSecret())
    .update(`unsub:${userId}`)
    .digest('base64url');
  return `${userId}.${sig}`;
}

export function verifyUnsubscribeToken(token: string): string | null {
  const parts = String(token || '').trim().split('.');
  if (parts.length !== 2) return null;
  const [userId, sig] = parts;
  if (!userId || !sig) return null;
  const expected = crypto
    .createHmac('sha256', getUnsubSecret())
    .update(`unsub:${userId}`)
    .digest('base64url');
  const a = Buffer.from(sig, 'utf8');
  const b = Buffer.from(expected, 'utf8');
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  return userId;
}

export interface EmailRecipientUser {
  id: string;
  email: string | null;
  name: string | null;
  agreedMarketing: boolean;
  isVerifiedNonInsured?: boolean;
  verifiedTreatment?: string | null;
}

export function buildWelcomeEmailHtml(
  user: EmailRecipientUser,
  campaign: {
    title: string;
    headline: string;
    bodyHtml: string;
    ctaLabel: string;
    ctaUrl: string;
  },
  unsubscribeUrl: string
): { subject: string; html: string; text: string } {
  const displayName = escapeHtml(user.name || (user.email ? user.email.split('@')[0] : '회원'));
  const allowPromo = Boolean(user.agreedMarketing);

  const subject = allowPromo
    ? `[화이트스타일치과] ${displayName}님 가입을 환영합니다 · ${campaign.title}`
    : `[화이트스타일치과] ${displayName}님 회원가입을 진심으로 환영합니다`;

  const seasonalSection = allowPromo
    ? `
      <div style="margin-top:22px;padding:20px;border-radius:14px;background:#eff6ff;border:1px solid #bfdbfe;">
        <div style="font-size:12px;font-weight:700;color:#1d4ed8;margin-bottom:6px;">시즌 안내 · ${escapeHtml(campaign.title)}</div>
        <h2 style="margin:0 0 12px 0;font-size:18px;line-height:1.45;color:#0f294a;">${escapeHtml(campaign.headline)}</h2>
        <div style="font-size:14px;line-height:1.75;color:#1e293b;">${campaign.bodyHtml}</div>
        <div style="margin-top:18px;">
          <a href="${escapeHtml(campaign.ctaUrl)}" style="display:inline-block;background:#03c75a;color:#ffffff;font-weight:700;font-size:14px;padding:12px 22px;border-radius:10px;text-decoration:none;margin-right:8px;">${escapeHtml(campaign.ctaLabel)}</a>
          <a href="https://whitestyle.com/messenger" style="display:inline-block;background:#0f294a;color:#ffffff;font-weight:700;font-size:14px;padding:12px 20px;border-radius:10px;text-decoration:none;">화타톡 메신저 바로가기</a>
        </div>
      </div>
    `
    : `
      <div style="margin-top:22px;padding:20px;border-radius:14px;background:#f8fafc;border:1px solid #e2e8f0;">
        <div style="font-size:12px;font-weight:700;color:#0f294a;margin-bottom:6px;">건강보험 구강관리 필수 안내</div>
        <h2 style="margin:0 0 10px 0;font-size:17px;line-height:1.45;color:#0f294a;">만 19세 이상 연 1회 건강보험 스케일링 안내</h2>
        <p style="margin:0 0 12px 0;font-size:14px;line-height:1.75;color:#334155;">국민건강보험 적용 스케일링은 매년 1월 1일부터 12월 31일까지 연 1회 이용 가능하며, 해가 지나면 이월되지 않고 소멸됩니다. 연말 진료 일정 확인에 참고하시기 바랍니다.</p>
        <a href="https://whitestyle.com/messenger" style="display:inline-block;background:#0f294a;color:#ffffff;font-weight:700;font-size:14px;padding:11px 20px;border-radius:10px;text-decoration:none;">화타톡 메신저 열기</a>
      </div>
    `;

  const html = `
<!DOCTYPE html>
<html lang="ko">
<head><meta charset="utf-8" /></head>
<body style="margin:0;padding:20px;background:#f1f5f9;font-family:'Pretendard','Malgun Gothic','Apple SD Gothic Neo',sans-serif;word-break:keep-all;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:620px;margin:0 auto;background:#ffffff;border-radius:18px;overflow:hidden;border:1px solid #e2e8f0;">
    <tr>
      <td style="background:#0f294a;padding:26px 28px;color:#ffffff;">
        <div style="font-size:12px;font-weight:700;color:#93c5fd;margin-bottom:6px;">1994년 개원 33년 전통 · 강남역 11·12번 출구 도보 1분</div>
        <h1 style="margin:0;font-size:22px;line-height:1.4;color:#ffffff;">화이트스타일치과의원 가입을 환영합니다</h1>
      </td>
    </tr>
    <tr>
      <td style="padding:26px 28px;color:#1e293b;font-size:15px;line-height:1.8;">
        <p style="margin:0 0 12px 0;">안녕하세요, <strong>${displayName}</strong>님!</p>
        <p style="margin:0 0 12px 0;">강남역 화이트스타일치과의원 회원이 되신 것을 진심으로 환영합니다. 본원은 서울대졸·교정학 박사 김준헌 병원장, 이봉진 대표원장, 보건복지부 인증 치주과 전문의 박선혜 원장 <strong>3인 원장단 책임 협진</strong>으로 진료합니다.</p>
        <div style="background:#fffbeb;border:1px solid #fde68a;border-radius:12px;padding:16px;margin:16px 0;font-size:14px;line-height:1.75;color:#451a03;">
          <strong>화타펫 · 화타톡 이용 안내</strong><br/>
          로그인 상태에서 홈페이지 하단 <strong>화타펫</strong> 또는 <a href="https://whitestyle.com/messenger" style="color:#b45309;font-weight:700;">화타톡 메신저</a>를 이용하실 수 있습니다. 원내 비보험 진료(교정·심미보철·임플란트·미백) 완료 후 발급되는 인증코드로 <strong>인증된 화타펫</strong>이 되시면, 지인 전용 대화방을 직접 개설하고 <strong>대용량 파일(최대 500MB 클라우드 &amp; 동시접속 지인 간 P2P 무제한 전송)</strong>을 자유롭게 주고받으실 수 있습니다.
        </div>
        ${seasonalSection}
      </td>
    </tr>
    <tr>
      <td style="background:#f8fafc;padding:18px 28px;border-top:1px solid #e2e8f0;font-size:12px;line-height:1.7;color:#64748b;">
        <div><strong>화이트스타일치과의원</strong> · 서울특별시 강남구 강남대로92길 17 (역삼동 819-10) 대승빌딩 B1·1·2층 (06134)</div>
        <div>대표상담: 1577-7287 / 02-569-7528 · 일본어 통역 직통: +82-10-3046-5010</div>
        ${
          allowPromo
            ? `<div style="margin-top:8px;">본 메일은 회원가입 시 안내·혜택 수신에 동의하신 분께 발송되었습니다. <a href="${escapeHtml(unsubscribeUrl)}" style="color:#475569;text-decoration:underline;">마케팅 메일 수신거부</a></div>`
            : `<div style="margin-top:8px;">본 메일은 회원가입 완료 확인을 위해 발송된 안내 메일입니다.</div>`
        }
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

  const text = `${user.name || '회원'}님, 1994년 개원 33년 전통 강남역 화이트스타일치과의원 가입을 환영합니다.\n${campaign.headline}\n예약: ${campaign.ctaUrl}\n화타톡: https://whitestyle.com/messenger\n대표상담: 1577-7287 / 02-569-7528`;

  return { subject, html, text };
}

export async function sendWelcomeSeasonalEmail(
  user: EmailRecipientUser,
  options?: { campaignSlug?: string; kind?: 'WELCOME_SEASONAL' | 'PROMO_BROADCAST' | 'TEST' }
): Promise<SendEmailResult> {
  if (!user.email) {
    return { ok: false, provider: 'none', status: 'FAILED', error: '이메일 주소가 없습니다.' };
  }

  const campaign = await getActiveSeasonalCampaign(new Date(), options?.campaignSlug);
  const unsubToken = signUnsubscribeToken(user.id);
  const baseUrl = (process.env.NEXTAUTH_URL || 'https://whitestyle.com').replace(/\/$/, '');
  const unsubscribeUrl = `${baseUrl}/api/email/unsubscribe?token=${encodeURIComponent(unsubToken)}`;

  const built = buildWelcomeEmailHtml(
    user,
    {
      title: campaign.title,
      headline: campaign.headline,
      bodyHtml: campaign.bodyHtml,
      ctaLabel: campaign.ctaLabel,
      ctaUrl: campaign.ctaUrl,
    },
    unsubscribeUrl
  );

  const kind = options?.kind || 'WELCOME_SEASONAL';
  const result = await sendEmail({
    to: user.email,
    subject: built.subject,
    html: built.html,
    text: built.text,
  });

  await prisma.emailLog.create({
    data: {
      userId: user.id,
      recipientEmail: user.email,
      campaignSlug: campaign.slug,
      kind,
      subject: built.subject,
      provider: result.provider,
      status: result.status,
      providerMessageId: result.providerMessageId || null,
      errorMessage: result.error || null,
    },
  });

  if (result.ok) {
    await prisma.user.update({
      where: { id: user.id },
      data:
        kind === 'WELCOME_SEASONAL'
          ? { welcomeEmailSentAt: new Date(), lastPromoEmailSentAt: new Date() }
          : { lastPromoEmailSentAt: new Date() },
    });
  }

  return result;
}

export async function sendVerifiedHwataPetEmail(user: EmailRecipientUser): Promise<SendEmailResult> {
  if (!user.email) {
    return { ok: false, provider: 'none', status: 'FAILED', error: '이메일 주소가 없습니다.' };
  }

  const displayName = escapeHtml(user.name || user.email.split('@')[0] || '회원');
  const treatment = escapeHtml(user.verifiedTreatment || '비보험 진료 정회원');
  const subject = `[화이트스타일치과] ${displayName}님의 '인증된 화타펫' 정회원 승인이 완료되었습니다`;
  const html = `
<!DOCTYPE html>
<html lang="ko">
<head><meta charset="utf-8" /></head>
<body style="margin:0;padding:20px;background:#f1f5f9;font-family:'Pretendard','Malgun Gothic',sans-serif;word-break:keep-all;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:18px;overflow:hidden;border:1px solid #e2e8f0;">
    <tr>
      <td style="background:#0f294a;padding:24px 28px;color:#ffffff;">
        <div style="font-size:12px;font-weight:700;color:#fde68a;margin-bottom:6px;">인증된 화타펫 · 비보험 진료 정회원 승인</div>
        <h1 style="margin:0;font-size:21px;color:#ffffff;">축하합니다! 인증된 화타펫 기능이 열렸습니다</h1>
      </td>
    </tr>
    <tr>
      <td style="padding:26px 28px;color:#1e293b;font-size:15px;line-height:1.8;">
        <p style="margin:0 0 12px 0;"><strong>${displayName}</strong>님, 화이트스타일치과의원 <strong>${treatment}</strong> 정회원 인증이 완료되었습니다.</p>
        <p style="margin:0 0 16px 0;">이제 홈페이지를 켜 놓은 상태에서 로그인된 지인들을 직접 초대해 <strong>프라이빗 화타톡 대화방</strong>을 개설하고, <strong>최대 500MB 클라우드 파일</strong> 및 <strong>동시접속 지인 간 P2P 무제한 대용량 파일 전송</strong>을 사용하실 수 있습니다.</p>
        <a href="https://whitestyle.com/messenger" style="display:inline-block;background:#0f294a;color:#ffffff;font-weight:700;font-size:15px;padding:13px 24px;border-radius:10px;text-decoration:none;">화타톡 메신저 바로 열기</a>
      </td>
    </tr>
    <tr>
      <td style="background:#f8fafc;padding:16px 28px;border-top:1px solid #e2e8f0;font-size:12px;color:#64748b;">
        화이트스타일치과의원 · 서울특별시 강남구 강남대로92길 17 대승빌딩 B1·1·2층 · 1577-7287 / 02-569-7528
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

  const result = await sendEmail({
    to: user.email,
    subject,
    html,
    text: `${user.name || '회원'}님의 인증된 화타펫(${user.verifiedTreatment || '비보험 진료'}) 승인이 완료되었습니다. https://whitestyle.com/messenger`,
  });

  await prisma.emailLog.create({
    data: {
      userId: user.id,
      recipientEmail: user.email,
      kind: 'VERIFIED_HWATAPET',
      subject,
      provider: result.provider,
      status: result.status,
      providerMessageId: result.providerMessageId || null,
      errorMessage: result.error || null,
    },
  });

  return result;
}
