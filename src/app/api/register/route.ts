import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { getClientIp, PRIVACY_POLICY_VERSION } from '@/app/api/_lib/admin';
import { checkRateLimit } from '@/app/api/_lib/rate-limit';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function errorJson(msg: string, status: number, headers?: Record<string, string>) {
  return NextResponse.json({ message: msg, error: msg }, { status, headers });
}

export async function POST(req: Request) {
  try {
    const ip = getClientIp(req);
    const rate = checkRateLimit(`register:${ip || 'unknown'}`, 5, 10 * 60 * 1000);
    if (!rate.allowed) {
      return errorJson(
        '회원가입 요청이 너무 많습니다. 잠시 후 다시 시도해 주세요.',
        429,
        { 'Retry-After': String(rate.retryAfterSec) }
      );
    }

    const { name, email, password, phone, agreedPrivacy, agreedMarketing } = await req.json();

    if (agreedPrivacy !== true) {
      return errorJson('서비스 이용약관 및 개인정보 수집·이용에 동의해 주셔야 회원가입이 가능합니다.', 400);
    }

    if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
      return errorJson('이메일과 비밀번호는 필수 항목입니다.', 400);
    }

    if (!EMAIL_RE.test(email) || email.length > 254) {
      return errorJson('올바른 이메일 형식이 아닙니다.', 400);
    }

    if (password.length < 8) {
      return errorJson('비밀번호는 8자 이상이어야 합니다.', 400);
    }

    const cleanPhone = typeof phone === 'string' ? phone.trim().replace(/[^\d-]/g, '').slice(0, 20) : '';

    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail }
    });

    if (existingUser) {
      return errorJson('이미 가입된 이메일 주소입니다.', 400);
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name: typeof name === 'string' && name.trim() ? name.trim().slice(0, 50) : normalizedEmail.split('@')[0].slice(0, 50),
        email: normalizedEmail,
        password: hashedPassword,
        phone: cleanPhone || null,
        agreedPrivacy: true,
        agreedMarketing: Boolean(agreedMarketing),
        consentAt: new Date(),
        privacyPolicyVersion: PRIVACY_POLICY_VERSION,
      }
    });

    return NextResponse.json(
      {
        message: '회원가입이 완료되었습니다.',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          agreedPrivacy: user.agreedPrivacy,
          agreedMarketing: user.agreedMarketing,
        }
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Registration Error:', error);
    return errorJson('회원가입 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.', 500);
  }
}
