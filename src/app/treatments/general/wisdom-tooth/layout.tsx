import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '강남역 매복 사랑니 발치 · 3D CT 신경관 정밀 진단',
  description:
    '강남역 화이트스타일치과의원 매복 사랑니 발치 안내. 치과 전용 CT로 매복 방향과 하치조 신경관 거리를 먼저 확인한 뒤 3단계 통증 완화 마취로 안전하게 발치합니다.',
  alternates: { canonical: 'https://whitestyle.com/treatments/general/wisdom-tooth' },
  openGraph: {
    title: '강남역 매복 사랑니 발치 · 3D CT 신경관 정밀 진단 | 화이트스타일치과의원',
    description:
      '누운 사랑니·부분 매복 사랑니 3D CT 정밀 분석과 발치 4단계 안전 프로토콜 및 발치 후 관리 안내.',
    url: 'https://whitestyle.com/treatments/general/wisdom-tooth',
    type: 'website',
    locale: 'ko_KR',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
