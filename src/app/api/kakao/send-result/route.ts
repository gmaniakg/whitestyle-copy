import { NextResponse } from 'next/server';
import { getClientIp, maskPhone, PRIVACY_POLICY_VERSION } from '@/app/api/_lib/admin';

export const dynamic = 'force-dynamic';

// 주의: 현재는 서버리스 메모리에만 임시 보관하며, 실제 알림톡 발송은 연동되어 있지 않습니다.
// (알림톡 발송대행사 연동 시 [병원 확인 필요])
const inMemoryLeads: any[] = [];

const isTrue = (v: unknown) => v === true || v === 'true' || v === 1;

export async function POST(req: Request) {
  try {
    const { phone, resultTitle, resultDesc, agreedPrivacy, agreedSensitive, agreedMarketing } = await req.json();

    if (!phone || typeof phone !== 'string' || !resultTitle) {
      return NextResponse.json({ error: '전화번호와 진단 결과는 필수입니다.' }, { status: 400 });
    }

    const digits = phone.replace(/\D/g, '');
    if (digits.length < 9 || digits.length > 11) {
      return NextResponse.json({ error: '올바른 전화번호 형식이 아닙니다.' }, { status: 400 });
    }

    if (!isTrue(agreedPrivacy)) {
      return NextResponse.json({ error: '개인정보 수집·이용에 동의해 주셔야 접수할 수 있습니다.' }, { status: 400 });
    }
    if (!isTrue(agreedSensitive)) {
      return NextResponse.json({ error: '건강정보(민감정보) 처리에 별도로 동의해 주셔야 접수할 수 있습니다.' }, { status: 400 });
    }

    const now = new Date().toISOString();
    const newLead = {
      id: Date.now().toString(),
      phone: digits,
      inquiryType: '임플란트 사례 탐색 결과',
      resultTitle: String(resultTitle).slice(0, 200),
      resultDesc: resultDesc ? String(resultDesc).slice(0, 1000) : '',
      agreedPrivacy: true,
      agreedSensitive: true,
      agreedMarketing: isTrue(agreedMarketing),
      consentDate: now,
      privacyPolicyVersion: PRIVACY_POLICY_VERSION,
      ip: getClientIp(req),
      status: '신규접수',
    };

    inMemoryLeads.push(newLead);
    console.log('[kakao/send-result] lead received', newLead.id, maskPhone(newLead.phone));

    return NextResponse.json({
      success: true,
      message: '접수되었습니다. 상담 담당자가 확인 후 연락드리겠습니다.',
      leadId: newLead.id,
    });
  } catch (error) {
    console.error('Kakao send error:', error);
    return NextResponse.json({ error: '내부 서버 오류가 발생했습니다.' }, { status: 500 });
  }
}
