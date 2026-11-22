import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { requireOwnerAdmin } from '@/app/api/_lib/admin';
import MembersAdminClient from './MembersAdminClient';
import './members.css';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: '회원관리 · 시즌 이메일 · 화타펫 인증 센터',
  robots: { index: false, follow: false },
};

export default async function AdminMembersPage() {
  const ownerEmail = await requireOwnerAdmin();
  if (!ownerEmail) {
    redirect('/login?callbackUrl=%2Fadmin%2Fmembers&error=AccessDenied');
  }

  return <MembersAdminClient ownerEmail={ownerEmail} />;
}
