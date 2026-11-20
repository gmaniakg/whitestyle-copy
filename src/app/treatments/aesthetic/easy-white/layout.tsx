import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '강남역 이지화이트 최소삭제 라미네이트 · 원데이 미백',
  description:
    '강남역 화이트스타일치과의원 이지화이트(EasyWhite) 최소삭제 심미보철 및 원데이 전문가 미백 안내. 3인 원장단 교합·치주 협진으로 평균 2~3회 내원 맞춤 세라믹 완성.',
  alternates: { canonical: 'https://whitestyle.com/treatments/aesthetic/easy-white' },
  openGraph: {
    title: '강남역 이지화이트 최소삭제 라미네이트 · 원데이 미백 | 화이트스타일치과의원',
    description:
      '자연치아 법랑질 보존을 우선으로 하는 0.1~0.2mm 최소삭제 이지화이트 세라믹과 3단계 통증 완화 마취 안내.',
    url: 'https://whitestyle.com/treatments/aesthetic/easy-white',
    type: 'website',
    locale: 'ko_KR',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
