import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import KakaoProvider from 'next-auth/providers/kakao';
import NaverProvider from 'next-auth/providers/naver';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { PrismaAdapter } from '@next-auth/prisma-adapter';

const LOGIN_FAIL_MESSAGE = '이메일(또는 아이디)과 비밀번호가 올바르지 않습니다.';

const ADMIN_ID_ALIAS: Record<string, string> = {
  whitedent: 'whitedent@whitestyle.com',
  whitestyle3: 'whitestyle3@naver.com',
  whitestyle: 'whitestyle3@naver.com',
  admin: 'admin@whitestyle.com',
};

function isConfiguredEnv(val?: string): boolean {
  return Boolean(val && !val.startsWith('your_') && val !== 'placeholder');
}

function buildProviders(): AuthOptions['providers'] {
  const providers: AuthOptions['providers'] = [];

  if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    // 이메일 기준 계정 자동 연동(allowDangerousEmailAccountLinking)은 계정 탈취 위험으로 사용하지 않습니다.
    providers.push(
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      })
    );
  }

  if (isConfiguredEnv(process.env.KAKAO_CLIENT_ID) && isConfiguredEnv(process.env.KAKAO_CLIENT_SECRET)) {
    providers.push(
      KakaoProvider({
        clientId: process.env.KAKAO_CLIENT_ID!,
        clientSecret: process.env.KAKAO_CLIENT_SECRET!,
      })
    );
  }

  if (isConfiguredEnv(process.env.NAVER_CLIENT_ID) && isConfiguredEnv(process.env.NAVER_CLIENT_SECRET)) {
    providers.push(
      NaverProvider({
        clientId: process.env.NAVER_CLIENT_ID!,
        clientSecret: process.env.NAVER_CLIENT_SECRET!,
      })
    );
  }

  providers.push(
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: '이메일 또는 관리자 아이디', type: 'text' },
        password: { label: '비밀번호', type: 'password' },
      },
      async authorize(credentials) {
        const rawIdentifier = credentials?.email?.trim().toLowerCase() || '';
        const rawPassword = credentials?.password || '';
        if (!rawIdentifier || !rawPassword) {
          throw new Error(LOGIN_FAIL_MESSAGE);
        }

        const resolvedEmail = ADMIN_ID_ALIAS[rawIdentifier] || rawIdentifier;

        const user = await prisma.user.findUnique({
          where: { email: resolvedEmail },
        });

        if (!user || !user.password) {
          throw new Error(LOGIN_FAIL_MESSAGE);
        }

        const isValid = await bcrypt.compare(rawPassword, user.password);
        if (!isValid) {
          throw new Error(LOGIN_FAIL_MESSAGE);
        }

        return {
          id: user.id,
          name: user.name || '관리자',
          email: user.email,
        };
      },
    })
  );

  return providers;
}

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: buildProviders(),
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30일 세션 유지
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        (session.user as { id?: string }).id = String(token.id);
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
};
