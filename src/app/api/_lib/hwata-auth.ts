import crypto from 'crypto';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '@/app/api/_lib/auth-options';
import { prisma } from '@/lib/prisma';

const SESSION_SECRET =
  process.env.NEXTAUTH_SECRET ||
  process.env.HWATA_MEMBER_SECRET ||
  'whitestyle-hwata-session-2026';

const TOKEN_TTL_MS = 30 * 24 * 60 * 60 * 1000;

const STATIC_ALLOWED_ORIGINS = new Set([
  'https://whitestyle.com',
  'https://www.whitestyle.com',
  'https://whinish.com',
  'https://www.whinish.com',
  'https://whitestyle-xi.vercel.app',
  'https://whitestyle-copy.vercel.app',
  'http://localhost:3000',
  'http://localhost:3099',
]);

export function buildHwataCorsHeaders(req?: NextRequest | Request | null): Record<string, string> {
  const origin = (req?.headers.get('origin') || '').trim();
  const isAllowedOrigin =
    Boolean(origin) &&
    (STATIC_ALLOWED_ORIGINS.has(origin) || origin.startsWith('chrome-extension://'));

  const headers: Record<string, string> = {
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers':
      'Content-Type, Authorization, X-Hwata-Api-Key, X-Hwata-Client, X-Hwata-Chart-No, X-Hwata-Pet-Heartbeat',
    Vary: 'Origin',
  };

  if (isAllowedOrigin) {
    headers['Access-Control-Allow-Origin'] = origin;
    headers['Access-Control-Allow-Credentials'] = 'true';
  } else {
    headers['Access-Control-Allow-Origin'] = 'https://whitestyle.com';
  }

  return headers;
}

export interface HwataMemberUser {
  id: string;
  email: string;
  name: string | null;
  agreedMarketing: boolean;
}

export function signHwataSessionToken(user: {
  id: string;
  email: string;
  name?: string | null;
}): string {
  const payloadObj = {
    uid: user.id,
    email: user.email,
    name: user.name || null,
    exp: Date.now() + TOKEN_TTL_MS,
  };
  const payloadB64 = Buffer.from(JSON.stringify(payloadObj), 'utf8').toString('base64url');
  const sig = crypto
    .createHmac('sha256', SESSION_SECRET)
    .update(payloadB64)
    .digest('base64url');
  return `hwata-auth.${payloadB64}.${sig}`;
}

export function verifyHwataSessionToken(
  raw: string
): { uid: string; email: string; name: string | null } | null {
  try {
    const trimmed = String(raw || '').trim();
    const parts = trimmed.split('.');
    if (parts.length !== 3 || parts[0] !== 'hwata-auth') return null;
    const [, payloadB64, sigB64] = parts;
    if (!payloadB64 || !sigB64) return null;

    const expectedSig = crypto
      .createHmac('sha256', SESSION_SECRET)
      .update(payloadB64)
      .digest('base64url');

    const actualBuf = Buffer.from(sigB64, 'utf8');
    const expectedBuf = Buffer.from(expectedSig, 'utf8');
    if (actualBuf.length !== expectedBuf.length) return null;
    if (!crypto.timingSafeEqual(actualBuf, expectedBuf)) return null;

    const decoded = JSON.parse(Buffer.from(payloadB64, 'base64url').toString('utf8'));
    if (!decoded || typeof decoded.uid !== 'string' || typeof decoded.email !== 'string') {
      return null;
    }
    if (typeof decoded.exp !== 'number' || Date.now() > decoded.exp) {
      return null;
    }

    return {
      uid: decoded.uid,
      email: decoded.email,
      name: typeof decoded.name === 'string' ? decoded.name : null,
    };
  } catch {
    return null;
  }
}

/**
 * 웹(NextAuth 세션 쿠키) 또는 확장프로그램(Bearer hwata-auth Token) 인증을 확인해
 * DB 상에 실존하는 whitestyle.com 회원 정보를 반환합니다.
 */
export async function requireHwataMember(
  req: NextRequest
): Promise<HwataMemberUser | null> {
  try {
    const session = await getServerSession(authOptions);
    const sessionEmail = session?.user?.email?.trim().toLowerCase();
    if (sessionEmail) {
      const user = await prisma.user.findUnique({
        where: { email: sessionEmail },
        select: { id: true, email: true, name: true, agreedMarketing: true },
      });
      if (user?.email) {
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          agreedMarketing: user.agreedMarketing,
        };
      }
    }

    const authHeader = req.headers.get('authorization') || '';
    const bearerMatch = authHeader.match(/^Bearer\s+(.+)$/i);
    if (bearerMatch?.[1]) {
      const verified = verifyHwataSessionToken(bearerMatch[1]);
      if (verified) {
        const user = await prisma.user.findUnique({
          where: { id: verified.uid },
          select: { id: true, email: true, name: true, agreedMarketing: true },
        });
        if (user?.email) {
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            agreedMarketing: user.agreedMarketing,
          };
        }
      }
    }
  } catch (err) {
    console.warn('[hwata-auth] verification error:', err);
  }

  return null;
}

export function loginRequiredResponse(req: NextRequest) {
  return NextResponse.json(
    {
      ok: false,
      code: 'LOGIN_REQUIRED',
      message: 'whitestyle.com 로그인 후 화타펫 실시간 통신을 시작할 수 있습니다.',
      loginUrl: 'https://whitestyle.com/login?callbackUrl=%2Fai-pet%23community',
      registerUrl: 'https://whitestyle.com/register?callbackUrl=%2Fai-pet%23community',
    },
    { status: 401, headers: buildHwataCorsHeaders(req) }
  );
}
