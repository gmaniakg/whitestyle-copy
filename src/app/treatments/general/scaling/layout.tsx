import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '강남역 치주과 전문의 잇몸치료 · 스케일링 · 1DAY 미백 | 화이트스타일치과의원',
  description:
    '보건복지부 인증 치주과 전문의 박선혜 원장 전담 중증 잇몸치료·잇몸 출혈·임플란트 주위염 예방 3·6·12개월 리콜 및 60분 원데이(1DAY) 전문가 치아미백.',
  alternates: { canonical: 'https://whitestyle.com/treatments/general/scaling' },
  openGraph: {
    title: '치주과 전문의 잇몸치료 · 3·6·12개월 리콜 · 1DAY 미백 | 화이트스타일치과',
    description:
      '3단계 무통 마취 기반 치주염 치료와 자연치아 보존, 식약처 허가 정품 미백제 원데이 케어를 제공합니다.',
    url: 'https://whitestyle.com/treatments/general/scaling',
    type: 'website',
    locale: 'ko_KR',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
