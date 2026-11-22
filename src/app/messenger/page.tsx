import type { Metadata } from 'next';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/_lib/auth-options';
import MessengerClient from './MessengerClient';
import './messenger.css';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: '화타톡 · 인증된 화타펫 지인 메신저',
  description:
    '1994년 개원 33년 전통 강남역 화이트스타일치과의원 회원 및 비보험 진료 인증된 화타펫 전용 실시간 지인 메신저 · 대용량 파일 전송.',
  robots: { index: false, follow: false },
};

export default async function MessengerPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const session = await getServerSession(authOptions);
  const sp = await searchParams;
  const queryParts = new URLSearchParams();
  for (const [k, v] of Object.entries(sp || {})) {
    if (typeof v === 'string' && v) queryParts.set(k, v);
  }
  const currentPath = queryParts.toString() ? `/messenger?${queryParts.toString()}` : '/messenger';

  if (!session?.user?.email) {
    return (
      <div className="ht-page">
        <div
          style={{
            maxWidth: '580px',
            margin: '48px auto',
            background: 'var(--ht-surface)',
            border: '1px solid var(--ht-border)',
            borderRadius: '22px',
            padding: '36px 28px',
            textAlign: 'center',
            boxShadow: 'var(--ht-shadow)',
          }}
        >
          <img
            src="/ai-pet/assets3d/hwata_3d_costume_crown.png"
            alt="화타펫"
            style={{ width: '96px', height: '96px', objectFit: 'contain', margin: '0 auto 14px' }}
          />
          <h1 style={{ fontSize: '26px', fontWeight: 800, margin: '0 0 10px' }}>
            화타톡 지인 메신저 로그인
          </h1>
          <p style={{ fontSize: '15px', color: 'var(--ht-body)', lineHeight: 1.75, margin: '0 0 22px' }}>
            홈페이지를 켜 놓은 상태에서 로그인된 지인들과 실시간으로 대화하고, 사진·동영상 및 최대 500MB 클라우드·P2P 무제한 대용량 파일을 주고받으려면 먼저 로그인해 주세요.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
            <Link
              href={`/login?callbackUrl=${encodeURIComponent(currentPath)}`}
              className="ht-btn ht-btn-primary"
              style={{ padding: '12px 24px', fontSize: '15px' }}
            >
              로그인하고 화타톡 시작
            </Link>
            <Link
              href={`/register?callbackUrl=${encodeURIComponent(currentPath)}`}
              className="ht-btn"
              style={{ padding: '12px 24px', fontSize: '15px' }}
            >
              신규 회원가입
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <MessengerClient />;
}
