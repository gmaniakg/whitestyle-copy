import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '강남역 자연치아 보존치료 · 재신경치료·충치·치주',
  description:
    '1994년 개원 33년 전통 강남역 화이트스타일치과의원 보존치료·일반진료. 치과 전용 CT와 특수 현미경 확대 진단으로 발치보다 자연치아 살리기를 우선하는 재신경치료·충치·사랑니·치주 치료를 진행합니다.',
  alternates: { canonical: 'https://whitestyle.com/treatments/general' },
  openGraph: {
    title: '강남역 자연치아 보존치료 · 재신경치료·충치·치주 | 화이트스타일치과의원',
    description:
      '이봉진 대표원장·박선혜 치주과 전문의·김준헌 병원장 3인 원장단 협진 기반 자연치아 보존 및 3단계 통증 완화 일반진료 안내.',
    url: 'https://whitestyle.com/treatments/general',
    type: 'website',
    locale: 'ko_KR',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
