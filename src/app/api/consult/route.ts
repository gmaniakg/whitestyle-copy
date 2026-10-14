import { NextRequest, NextResponse } from 'next/server';
import { createConsultation, getConsultations } from '@/lib/consultation-db';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, treatment, memo, agreedPrivacy, source } = body;

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

    if (agreedPrivacy !== true && agreedPrivacy !== 'true' && agreedPrivacy !== 1) {
      return NextResponse.json(
        { success: false, message: '개인정보 취급방침에 동의해 주셔야 상담 신청이 가능합니다.' },
        { status: 400 }
      );
    }

    // Client IP
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      req.headers.get('x-real-ip') ||
      '';

    // 2. Persist to DB
    const record = await createConsultation({
      name: name.trim(),
      phone: cleanPhone,
      treatment: treatment ? String(treatment).trim() : '일반/종합상담',
      memo: memo ? String(memo).trim() : '',
      agreedPrivacy: true,
      source: source || 'quick_bar',
      ip,
    });

    // 3. Optional Webhook Notification (Slack/Discord/Alimtalk)
    const webhookUrl = process.env.CONSULT_WEBHOOK_URL;
    if (webhookUrl) {
      fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: `🔔 [화이트스타일치과 빠른상담 접수]\n- 이름: ${record.name}\n- 연락처: ${record.phone}\n- 진료과목: ${record.treatment}\n- 접수일시: ${new Date(record.createdAt).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}`,
        }),
      }).catch(err => console.error('[Webhook error]', err));
    }

    return NextResponse.json(
      {
        success: true,
        message: '화이트스타일치과 빠른상담 신청이 정상적으로 접수되었습니다. 전문 상담 실장이 신속히 연락드리겠습니다.',
        data: {
          id: record.id,
          name: record.name,
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
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status') || 'ALL';
    const search = searchParams.get('search') || '';
    const limit = parseInt(searchParams.get('limit') || '50', 10);
    const offset = parseInt(searchParams.get('offset') || '0', 10);

    const { items, total } = await getConsultations({
      status,
      search,
      limit,
      offset,
    });

    return NextResponse.json({
      success: true,
      items,
      total,
      limit,
      offset,
    });
  } catch (err: any) {
    console.error('[API /api/consult GET error]:', err);
    return NextResponse.json(
      { success: false, message: '상담 내역 조회 중 오류가 발생하였습니다.' },
      { status: 500 }
    );
  }
}
