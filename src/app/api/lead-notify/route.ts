import { NextRequest, NextResponse } from 'next/server';

const DEFAULT_RECIPIENTS = [
  'whitestyle3@naver.com',
  'gmmaniakgm@gmail.com',
  'tp2303@naver.com',
];

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

interface LeadPayload {
  source?: string;
  bo_table?: string;
  wr_id?: string | number;
  typeLabel?: string;
  name?: string;
  phone?: string;
  subject?: string;
  content?: string;
  pageUrl?: string;
  submittedAt?: string;
  recipients?: string[];
}

function buildLeadHtml(lead: LeadPayload): { subject: string; html: string } {
  const name = lead.name || '신규 신청자';
  const phone = lead.phone || '미기재';
  const typeLabel = lead.typeLabel || '홈페이지 빠른상담신청';
  const boTable = lead.bo_table || 'feedback';
  const wrId = lead.wr_id ? `&wr_id=${lead.wr_id}` : '';
  const adminUrl = `https://whitestyle.com/bbs/board.php?bo_table=${boTable}${wrId}`;
  const submittedAt =
    lead.submittedAt ||
    new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });

  const subject = `🔔 [화이트스타일치과 상담접수] ${name}님 (${phone}) — ${typeLabel}`;
  const html = `
    <div style="font-family:'Malgun Gothic','Apple SD Gothic Neo',sans-serif;max-width:620px;margin:0 auto;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;background:#ffffff;">
      <div style="background:#0f172a;color:#ffffff;padding:22px 26px;">
        <div style="font-size:13px;color:#38bdf8;font-weight:700;margin-bottom:6px;">WHITESTYLE DENTAL CLINIC · 실시간 상담 알림</div>
        <h2 style="margin:0;font-size:20px;line-height:1.45;">🔔 신규 상담신청이 접수되었습니다</h2>
      </div>
      <div style="padding:26px;color:#1e293b;line-height:1.8;">
        <table style="width:100%;border-collapse:collapse;font-size:15px;margin-bottom:22px;">
          <tr>
            <th style="text-align:left;padding:12px 14px;background:#f8fafc;border-bottom:1px solid #e2e8f0;width:130px;color:#475569;">접수 경로</th>
            <td style="padding:12px 14px;border-bottom:1px solid #e2e8f0;font-weight:700;color:#0f172a;">${typeLabel}</td>
          </tr>
          <tr>
            <th style="text-align:left;padding:12px 14px;background:#f8fafc;border-bottom:1px solid #e2e8f0;color:#475569;">신청자 성함</th>
            <td style="padding:12px 14px;border-bottom:1px solid #e2e8f0;font-weight:700;font-size:17px;color:#0284c7;">${name}</td>
          </tr>
          <tr>
            <th style="text-align:left;padding:12px 14px;background:#f8fafc;border-bottom:1px solid #e2e8f0;color:#475569;">연락처</th>
            <td style="padding:12px 14px;border-bottom:1px solid #e2e8f0;font-weight:700;font-size:17px;color:#e11d48;">
              <a href="tel:${phone.replace(/[^0-9]/g, '')}" style="color:#e11d48;text-decoration:none;">${phone}</a>
            </td>
          </tr>
          <tr>
            <th style="text-align:left;padding:12px 14px;background:#f8fafc;border-bottom:1px solid #e2e8f0;color:#475569;">제목 / 문의</th>
            <td style="padding:12px 14px;border-bottom:1px solid #e2e8f0;">${lead.subject || '상담문의'}</td>
          </tr>
          <tr>
            <th style="text-align:left;padding:12px 14px;background:#f8fafc;border-bottom:1px solid #e2e8f0;color:#475569;">내용</th>
            <td style="padding:12px 14px;border-bottom:1px solid #e2e8f0;">${lead.content || '상담문의접수'}</td>
          </tr>
          <tr>
            <th style="text-align:left;padding:12px 14px;background:#f8fafc;border-bottom:1px solid #e2e8f0;color:#475569;">접수 시각</th>
            <td style="padding:12px 14px;border-bottom:1px solid #e2e8f0;">${submittedAt}</td>
          </tr>
        </table>
        <div style="text-align:center;margin-top:24px;">
          <a href="${adminUrl}" style="display:inline-block;background:#0284c7;color:#ffffff;font-weight:700;padding:14px 28px;border-radius:8px;text-decoration:none;font-size:15px;">홈페이지 관리자 게시판 바로가기</a>
        </div>
      </div>
      <div style="background:#f8fafc;padding:14px 26px;font-size:12px;color:#64748b;border-top:1px solid #e2e8f0;">
        수신처: ${DEFAULT_RECIPIENTS.join(', ')}<br/>
        화이트스타일치과의원 · 서울특별시 강남구 강남대로92길 17 (역삼동 819-10) 대승빌딩 B1·1·2층 (1577-7287 / 02-569-7528)
      </div>
    </div>
  `;
  return { subject, html };
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as LeadPayload & { isTest?: boolean };
    if (body.isTest || body.phone === '010-0000-0000' || body.name === '테스트') {
      return NextResponse.json(
        {
          ok: true,
          simulated: true,
          lead: {
            name: body.name || '테스트',
            phone: body.phone || '010-0000-0000',
            bo_table: body.bo_table || 'feedback',
          },
        },
        { status: 200, headers: CORS_HEADERS }
      );
    }
    const recipients =
      Array.isArray(body.recipients) && body.recipients.length > 0
        ? body.recipients
        : DEFAULT_RECIPIENTS;
    const { subject, html } = buildLeadHtml(body);

    const iftttKey = process.env.IFTTT_WEBHOOK_KEY || '8EHchJRrNUkZeDlOl_A2w';
    const iftttParams = new URLSearchParams({
      value1: body.name || '신규신청자',
      value2: body.phone || '미기재',
      value3: `${body.typeLabel || '홈페이지 상담신청'} — ${body.subject || '상담문의'}`,
    });
    await fetch(
      `https://maker.ifttt.com/trigger/whitestyle_lead/with/key/${iftttKey}?${iftttParams.toString()}`,
      { method: 'GET' }
    ).catch(() => {});

    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: '화이트스타일치과 상담알림 <onboarding@resend.dev>',
          to: recipients,
          subject,
          html,
        }),
      });
    }

    return NextResponse.json(
      {
        ok: true,
        recipients,
        lead: {
          name: body.name,
          phone: body.phone,
          bo_table: body.bo_table || 'feedback',
        },
      },
      { status: 200, headers: CORS_HEADERS }
    );
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: String(err) },
      { status: 400, headers: CORS_HEADERS }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    {
      status: 'active',
      service: 'WhiteStyle Dental Clinic 24/7 Lead Notification Webhook & Monitor',
      recipients: DEFAULT_RECIPIENTS,
      monitoredBoards: [
        'https://whitestyle.com/bbs/board.php?bo_table=feedback',
        'https://whitestyle.com/bbs/board.php?bo_table=online',
      ],
    },
    { status: 200, headers: CORS_HEADERS }
  );
}
