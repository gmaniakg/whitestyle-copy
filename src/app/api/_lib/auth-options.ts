import { cookies } from 'next/headers';
import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import KakaoProvider from 'next-auth/providers/kakao';
import NaverProvider from 'next-auth/providers/naver';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { generateDefaultHandle, isOwnerAdminEmail } from '@/app/api/_lib/owner-config';
import { sendWelcomeSeasonalEmail } from '@/lib/seasonal-email';

const LOGIN_FAIL_MESSAGE = '이메일(또는 아이디)과 비밀번호가 올바르지 않습니다.';
const BLOCKED_MESSAGE = '이용이 제한된 계정입니다. 병원으로 문의해 주세요.';
const PRIVACY_POLICY_VERSION = '2026-10-15';

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

  if (
    isConfiguredEnv(process.env.KAKAO_CLIENT_ID) &&
    (isConfiguredEnv(process.env.KAKAO_CLIENT_SECRET) || process.env.KAKAO_ALLOW_NO_SECRET === 'true')
  ) {
    providers.push(
      KakaoProvider({
        clientId: process.env.KAKAO_CLIENT_ID!,
        clientSecret: process.env.KAKAO_CLIENT_SECRET || '',
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

        if (user.isBlocked) {
          throw new Error(BLOCKED_MESSAGE);
        }

        const isValid = await bcrypt.compare(rawPassword, user.password);
        if (!isValid) {
          throw new Error(LOGIN_FAIL_MESSAGE);
        }

        return {
          id: user.id,
          name: user.name || '회원',
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
    async signIn({ user }) {
      try {
        const email = typeof user?.email === 'string' ? user.email.trim().toLowerCase() : '';
        if (email) {
          const dbUser = await prisma.user.findUnique({
            where: { email },
            select: { isBlocked: true },
          });
          if (dbUser?.isBlocked) {
            return false;
          }
        }
      } catch (err) {
        console.warn('[auth-options] signIn check skipped:', err);
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        if (user.email) token.email = user.email.trim().toLowerCase();
      }
      const userId = typeof token.id === 'string' ? token.id : undefined;
      const email = typeof token.email === 'string' ? token.email.trim().toLowerCase() : undefined;

      if (userId || email) {
        try {
          const dbUser = await prisma.user.findUnique({
            where: userId ? { id: userId } : { email: email! },
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
              handle: true,
              isBlocked: true,
              isVerifiedNonInsured: true,
              verifiedTreatment: true,
              chartNo: true,
              petAvatarJson: true,
            },
          });
          if (dbUser) {
            token.id = dbUser.id;
            token.name = dbUser.name;
            token.email = dbUser.email;
            token.role = dbUser.role;
            token.handle = dbUser.handle;
            token.isBlocked = dbUser.isBlocked;
            token.isVerifiedNonInsured = dbUser.isVerifiedNonInsured;
            token.verifiedTreatment = dbUser.verifiedTreatment;
            token.chartNo = dbUser.chartNo;
            token.petAvatarJson = dbUser.petAvatarJson;
          }
        } catch (err) {
          console.warn('[auth-options] jwt db sync skipped:', err);
        }
      }

      token.isOwnerAdmin = isOwnerAdminEmail(typeof token.email === 'string' ? token.email : null);
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        const u = session.user as Record<string, unknown>;
        if (token.id) u.id = String(token.id);
        u.isOwnerAdmin = Boolean(token.isOwnerAdmin);
        u.isVerifiedNonInsured = Boolean(token.isVerifiedNonInsured);
        u.verifiedTreatment = (token.verifiedTreatment as string) || null;
        u.chartNo = (token.chartNo as string) || null;
        u.handle = (token.handle as string) || null;
        u.role = (token.role as string) || 'MEMBER';
        try {
          u.petAvatar = token.petAvatarJson ? JSON.parse(String(token.petAvatarJson)) : null;
        } catch {
          u.petAvatar = null;
        }
      }
      return session;
    },
  },
  events: {
    async signIn({ user }) {
      if (!user?.id) return;
      try {
        const existing = await prisma.user.findUnique({
          where: { id: user.id },
          select: { id: true, handle: true, email: true },
        });
        if (!existing) return;
        const now = new Date();
        await prisma.user.update({
          where: { id: user.id },
          data: {
            lastLoginAt: now,
            lastSeenAt: now,
            ...(!existing.handle ? { handle: generateDefaultHandle(existing.email || user.id) } : {}),
          },
        });
      } catch (err) {
        console.warn('[auth-options] signIn event update skipped:', err);
      }
    },
    async createUser({ user }) {
      try {
        const cookieStore = await cookies();
        const rawConsent = cookieStore.get('ws_signup_consent')?.value;
        let agreedPrivacy = false;
        let agreedMarketing = false;
        let cleanPhone: string | null = null;

        if (rawConsent) {
          try {
            const parsed = JSON.parse(rawConsent);
            if (parsed && parsed.agreedPrivacy === true) {
              agreedPrivacy = true;
              agreedMarketing = Boolean(parsed.agreedMarketing);
              cleanPhone =
                typeof parsed.phone === 'string'
                  ? parsed.phone.trim().replace(/[^\d-]/g, '').slice(0, 20) || null
                  : null;
            }
          } catch {
            // ignore invalid cookie
          }
        }

        const updatedUser = await prisma.user.update({
          where: { id: user.id },
          data: {
            handle: generateDefaultHandle(user.email || user.id),
            lastLoginAt: new Date(),
            lastSeenAt: new Date(),
            ...(agreedPrivacy
              ? {
                  agreedPrivacy: true,
                  agreedMarketing,
                  phone: cleanPhone || undefined,
                  consentAt: new Date(),
                  privacyPolicyVersion: PRIVACY_POLICY_VERSION,
                }
              : {}),
          },
          select: {
            id: true,
            email: true,
            name: true,
            agreedMarketing: true,
            isVerifiedNonInsured: true,
            verifiedTreatment: true,
          },
        });

        if (updatedUser.email) {
          await sendWelcomeSeasonalEmail(updatedUser, { kind: 'WELCOME_SEASONAL' }).catch((e) =>
            console.warn('[auth-options] welcome email failed:', e)
          );
        }
      } catch (err) {
        console.warn('[auth-options] createUser sync skipped:', err);
      }
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
};
