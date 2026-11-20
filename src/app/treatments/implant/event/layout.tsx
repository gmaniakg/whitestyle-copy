import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '임플란트 · 교정 · 심미보철 진료 안내',
  description:
    '1994년 개원 33년 전통 강남역 화이트스타일치과의원 3인 원장단 협진 정밀 임플란트 및 교합·치주 관리 안내.',
  alternates: { canonical: 'https://whitestyle.com/treatments/implant/event' },
  openGraph: {
    title: '임플란트 · 교정 · 심미보철 진료 안내 | 화이트스타일치과의원',
    description:
      '3D CT 정밀 진단과 3단계 통증 완화 국소마취, 치주과 전문의 협진을 바탕으로 한 화이트스타일치과의원 임플란트 안내.',
    url: 'https://whitestyle.com/treatments/implant/event',
    type: 'website',
    locale: 'ko_KR',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
