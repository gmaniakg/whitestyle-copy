import { NextResponse } from 'next/server';

// In-memory leads storage for serverless runtime
const inMemoryLeads: any[] = [];

export async function POST(req: Request) {
  try {
    const { phone, resultTitle, resultDesc } = await req.json();

    if (!phone || !resultTitle) {
      return NextResponse.json({ error: '전화번호와 진단 결과는 필수입니다.' }, { status: 400 });
    }

    // Save lead to memory/CRM
    const newLead = {
      id: Date.now().toString(),
      phone,
      inquiryType: '임플란트 진단 결과',
      resultTitle,
      resultDesc,
      consentDate: new Date().toISOString(),
      status: '신규접수',
    };

    inMemoryLeads.push(newLead);

    // Simulate network delay for Kakao Alimtalk
    await new Promise((resolve) => setTimeout(resolve, 800));

    return NextResponse.json({ 
      success: true, 
      message: '알림톡 발송 및 CRM 등록이 완료되었습니다.',
      leadId: newLead.id 
    });

  } catch (error) {
    console.error('Kakao send error:', error);
    return NextResponse.json({ error: '내부 서버 오류가 발생했습니다.' }, { status: 500 });
  }
}
