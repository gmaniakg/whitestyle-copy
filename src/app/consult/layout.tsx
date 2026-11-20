import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '온라인 상담 · 네이버 빠른 예약 · 일본어 통역 직통 안내',
  description:
    '강남역 화이트스타일치과의원 1:1 온라인 상담 및 예약 안내. 대표상담 1577-7287 / 02-569-7528, 카카오톡 1:1 상담, 네이버 빠른 예약, 일본어 통역 직통 +82-10-3046-5010.',
  alternates: { canonical: 'https://whitestyle.com/consult' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
