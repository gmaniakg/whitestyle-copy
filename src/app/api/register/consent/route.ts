import { NextResponse } from 'next/server';

/**
 * 소셜 회원가입 직전 이용약관·개인정보(필수) 및 마케팅 수신(선택) 동의 상태를
 * 단기 HttpOnly 쿠키에 임시 저장하여 createUser 이벤트에서 DB에 기록합니다.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const agreedPrivacy = body?.agreedPrivacy === true;
    const agreedMarketing = body?.agreedMarketing === true;
    const rawPhone = typeof body?.phone === 'string' ? body.phone : '';
    const cleanPhone = rawPhone.trim().replace(/[^\d-]/g, '').slice(0, 20);

    if (!agreedPrivacy) {
      return NextResponse.json(
        {
          ok: false,
          message: '서비스 이용약관 및 개인정보 수집·이용에 동의해 주셔야 회원가입이 가능합니다.',
          error: '서비스 이용약관 및 개인정보 수집·이용에 동의해 주셔야 회원가입이 가능합니다.',
        },
        { status: 400 }
      );
    }

    const res = NextResponse.json({ ok: true }, { status: 200 });
    res.cookies.set(
      'ws_signup_consent',
      JSON.stringify({
        agreedPrivacy: true,
        agreedMarketing,
        phone: cleanPhone || null,
      }),
      {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        maxAge: 600,
        secure: process.env.NODE_ENV === 'production',
      }
    );
    return res;
  } catch {
    return NextResponse.json(
      { ok: false, message: '동의 정보 저장 중 오류가 발생했습니다.', error: '동의 정보 저장 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
