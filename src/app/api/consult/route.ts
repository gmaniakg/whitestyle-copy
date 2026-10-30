import { NextRequest, NextResponse } from 'next/server';
import { createConsultation, getConsultations } from '@/lib/consultation-db';
import {
  requireAdmin,
  getClientIp,
  maskName,
  maskPhone,
  PRIVACY_POLICY_VERSION,
} from '@/app/api/_lib/admin';

export const dynamic = 'force-dynamic';

const MAX_LIMIT = 100;

const isTrue = (v: unknown) => v === true || v === 'true' || v === 1;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, treatment, memo, agreedPrivacy, agreedSensitive, agreedMarketing, source } = body;

    // 1. Validation
    if (!name || typeof name !== 'string' || name.trim().length < 1) {
      return NextResponse.json(
        { success: false, message: '성함(이름)을 입력해 주세요.' },
        { status: 400 }
      );
    }

    if (!phone || typeof phone !== 'string' || phone.trim().length < 8) {
      return NextResponse.json(
        { success: false, message: '연락처(휴대폰 번호)를 정확히 입력해 주세요.' },
        { status: 400 }
      );
    }

    // Clean phone number: remove any non-digits/hyphens
    const cleanPhone = phone.trim().replace(/[^\d-]/g, '');
    if (cleanPhone.replace(/\D/g, '').length < 9) {
      return NextResponse.json(
        { success: false, message: '올바른 전화번호 형식이 아닙니다.' },
        { status: 400 }
      );
    }

    if (!isTrue(agreedPrivacy)) {
      return NextResponse.json(
        { success: false, message: '개인정보 수집·이용에 동의해 주셔야 상담 신청이 가능합니다.' },
        { status: 400 }
      );
    }

    if (!isTrue(agreedSensitive)) {
      return NextResponse.json(
        { success: false, message: '건강정보(민감정보) 처리에 별도로 동의해 주셔야 상담 신청이 가능합니다.' },
        { status: 400 }
      );
    }

    const ip = getClientIp(req);

    // 2. Persist to DB
    const record = await createConsultation({
      name: name.trim(),
      phone: cleanPhone,
      treatment: treatment ? String(treatment).trim().slice(0, 100) : '일반/종합상담',
      memo: memo ? String(memo).trim().slice(0, 2000) : '',
      agreedPrivacy: true,
      agreedSensitive: true,
      agreedMarketing: isTrue(agreedMarketing),
      privacyPolicyVersion: PRIVACY_POLICY_VERSION,
      source: source ? String(source).slice(0, 50) : 'quick_bar',
      ip,
    });

    // 3. Optional Webhook Notification (PII 최소화: 이름/연락처 마스킹, 상담내용 제외)
    const webhookUrl = process.env.CONSULT_WEBHOOK_URL;
    if (webhookUrl) {
      fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: `[화이트스타일치과 상담 접수]\n- 이름: ${maskName(record.name)}\n- 연락처: ${maskPhone(record.phone)}\n- 접수번호: ${record.id}\n- 접수일시: ${new Date(record.createdAt).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}\n(상세 내용은 관리자 페이지에서 확인)`,
        }),
      }).catch(() => console.error('[Webhook error]'));
    }

    return NextResponse.json(
      {
        success: true,
        message: '상담 신청이 접수되었습니다. 상담 담당자가 확인 후 연락드리겠습니다.',
        data: {
          id: record.id,
          createdAt: record.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (err: any) {
    console.error('[API /api/consult POST error]:', err);
    return NextResponse.json(
      { success: false, message: '서버 처리 중 오류가 발생하였습니다. 잠시 후 다시 시도해 주세요.' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  // 서버측 관리자 인증 (ADMIN_EMAILS 미설정 시 모두 거부)
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json(
      { success: false, message: '권한이 없습니다.' },
      { status: 403 }
    );
  }

  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status') || 'ALL';
    const search = searchParams.get('search') || '';
    const rawLimit = parseInt(searchParams.get('limit') || '50', 10);
    const rawOffset = parseInt(searchParams.get('offset') || '0', 10);
    const limit = Math.min(Math.max(Number.isFinite(rawLimit) ? rawLimit : 50, 1), MAX_LIMIT);
    const offset = Math.max(Number.isFinite(rawOffset) ? rawOffset : 0, 0);

    const { items, total } = await getConsultations({
      status,
      search,
      limit,
      offset,
    });

    return NextResponse.json(
      {
        success: true,
        items,
        total,
        limit,
        offset,
      },
      { headers: { 'Cache-Control': 'no-store' } }
    );
  } catch (err: any) {
    console.error('[API /api/consult GET error]:', err);
    return NextResponse.json(
      { success: false, message: '상담 내역 조회 중 오류가 발생하였습니다.' },
      { status: 500 }
    );
  }
}
