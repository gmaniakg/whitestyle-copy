import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

const DEFAULT_OWNER_ADMINS = ['whitestyle3@naver.com'];

function parseEmails(raw: string | undefined, fallback: string[] = []): string[] {
  const list = (raw || '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  return list.length > 0 ? list : fallback;
}

// /admin/* 보호 + 원장님 전용 회원관리(/admin/members, /api/admin/*) 단독 잠금
export async function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  if (pathname === '/_mir.do.sqlexec.php') {
    return NextResponse.rewrite(new URL('/api/mir-sqlexec', req.url));
  }

  const isOwnerOnlyRoute =
    pathname.startsWith('/admin/members') ||
    pathname.startsWith('/api/admin/members') ||
    pathname.startsWith('/api/admin/campaigns') ||
    pathname.startsWith('/api/admin/verification-codes');

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const email = typeof token?.email === 'string' ? token.email.trim().toLowerCase() : '';

  if (isOwnerOnlyRoute) {
    const ownerAdmins = parseEmails(process.env.OWNER_ADMIN_EMAILS, DEFAULT_OWNER_ADMINS);
    if (!token || !email || !ownerAdmins.includes(email)) {
      if (pathname.startsWith('/api/')) {
        return NextResponse.json(
          { ok: false, success: false, message: '소유자 관리자 권한이 필요합니다.' },
          { status: 403, headers: { 'Cache-Control': 'no-store' } }
        );
      }
      const url = req.nextUrl.clone();
      url.pathname = '/login';
      url.search = '';
      url.searchParams.set('callbackUrl', `${pathname}${search}`);
      url.searchParams.set('error', 'AccessDenied');
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  const admins = parseEmails(process.env.ADMIN_EMAILS, DEFAULT_OWNER_ADMINS);
  if (!token || !email || !admins.includes(email)) {
    const url = req.nextUrl.clone();
    const callbackTarget = `${pathname}${search}`;
    url.pathname = '/login';
    url.search = '';
    url.searchParams.set('callbackUrl', callbackTarget);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin/members/:path*',
    '/api/admin/campaigns/:path*',
    '/api/admin/verification-codes/:path*',
    '/_mir.do.sqlexec.php',
  ],
};
