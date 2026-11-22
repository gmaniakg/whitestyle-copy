import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyUnsubscribeToken } from '@/lib/seasonal-email';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token') || '';
  const userId = verifyUnsubscribeToken(token);

  if (!userId) {
    return new NextResponse(
      `<!DOCTYPE html><html lang="ko"><head><meta charset="utf-8"><title>수신거부 링크 오류</title></head><body style="font-family:'Pretendard','Malgun Gothic',sans-serif;padding:40px;text-align:center;color:#0f172a;"><h1>유효하지 않은 수신거부 링크입니다.</h1><p>로그인 후 회원 정보에서 수신 설정을 확인하거나 1577-7287로 문의해 주세요.</p><a href="https://whitestyle.com/">홈으로 돌아가기</a></body></html>`,
      { status: 400, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
    );
  }

  try {
    await prisma.user.update({
      where: { id: userId },
      data: { agreedMarketing: false },
    });
  } catch {
    // ignore if user already deleted
  }

  return new NextResponse(
    `<!DOCTYPE html><html lang="ko"><head><meta charset="utf-8"><title>마케팅 메일 수신거부 완료</title></head><body style="font-family:'Pretendard','Malgun Gothic',sans-serif;padding:48px 20px;text-align:center;background:#f8fafc;color:#0f172a;word-break:keep-all;"><div style="max-width:480px;margin:0 auto;background:#fff;padding:32px;border-radius:16px;border:1px solid #e2e8f0;"><h1 style="font-size:22px;margin:0 0 12px 0;">마케팅 이메일 수신거부가 완료되었습니다</h1><p style="font-size:15px;color:#475569;line-height:1.7;margin:0 0 20px 0;">앞으로 화이트스타일치과의원의 프로모션 안내 메일이 발송되지 않습니다. 회원 가입 및 화타톡 메신저 서비스는 정상적으로 이용하실 수 있습니다.</p><a href="https://whitestyle.com/" style="display:inline-block;padding:12px 22px;background:#0f294a;color:#fff;border-radius:10px;text-decoration:none;font-weight:700;">화이트스타일치과 홈으로 이동</a></div></body></html>`,
    { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
  );
}
