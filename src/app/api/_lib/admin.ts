import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/_lib/auth-options';

/** 환경변수 ADMIN_EMAILS(콤마 구분)에 등록된 이메일만 관리자. 미설정 시 모두 거부. */
export function getAdminEmails(): string[] {
  return (process.env.ADMIN_EMAILS || '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdminEmail(email?: string | null): boolean {
  if (!email) return false;
  const list = getAdminEmails();
  if (list.length === 0) return false;
  return list.includes(email.trim().toLowerCase());
}

/** 서버측 관리자 세션 확인. 관리자면 이메일, 아니면 null */
export async function requireAdmin(): Promise<string | null> {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  return isAdminEmail(email) ? email! : null;
}

/** 클라이언트 IP: Vercel 헤더 우선 */
export function getClientIp(req: Request): string {
  const h = req.headers;
  const vercel = h.get('x-vercel-forwarded-for');
  if (vercel) return vercel.split(',')[0].trim();
  const real = h.get('x-real-ip');
  if (real) return real.trim();
  return h.get('x-forwarded-for')?.split(',')[0].trim() || '';
}

export function maskName(name: string): string {
  if (!name) return '';
  if (name.length <= 1) return '*';
  return name[0] + '*'.repeat(name.length - 1);
}

export function maskPhone(phone: string): string {
  const d = (phone || '').replace(/\D/g, '');
  if (d.length < 7) return '***';
  return d.slice(0, 3) + '-****-' + d.slice(-4);
}

export const PRIVACY_POLICY_VERSION = '2026-10-15';
