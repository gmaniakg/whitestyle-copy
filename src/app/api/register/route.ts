import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: '이메일과 비밀번호는 필수 항목입니다.' },
        { status: 400 }
      );
    }

    // 이미 가입된 이메일인지 검사
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json(
        { message: '이미 가입된 이메일 주소입니다.' },
        { status: 400 }
      );
    }

    // 비밀번호 안전 암호화 (Bcrypt Salt 10)
    const hashedPassword = await bcrypt.hash(password, 10);

    // 신규 회원 DB 생성
    const user = await prisma.user.create({
      data: {
        name: name || '화이트스타일 회원',
        email,
        password: hashedPassword,
      }
    });

    return NextResponse.json(
      {
        message: '회원가입이 성공적으로 완료되었습니다.',
        user: { id: user.id, name: user.name, email: user.email }
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Registration Error:', error);
    return NextResponse.json(
      { message: '회원가입 처리 중 오류가 발생했습니다.', error: error.message },
      { status: 500 }
    );
  }
}
