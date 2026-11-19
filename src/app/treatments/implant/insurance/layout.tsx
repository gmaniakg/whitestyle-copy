import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '만 65세 건강보험 임플란트(30%) · 심평원 비급여 1치당 기준 | 강남역 화이트스타일치과의원',
  description:
    '만 65세 이상 건강보험 임플란트(평생 2개, 본인부담률 30%) 원내 등록 및 건강보험심사평가원(HIRA) 비급여 1치당 기준 준수. 강남역 11·12번 출구 도보 1분 33년 전통 화이트스타일치과의원.',
  alternates: { canonical: 'https://whitestyle.com/treatments/implant/insurance' },
  openGraph: {
    title: '만 65세 건보 임플란트 · 심평원 비급여 투명 안내 | 화이트스타일치과',
    description:
      '공단 방문 없이 원내 30% 건보 등록 지원 및 3D CT 진단 기반 정품 픽스처·커스텀 지대주 사후 보증 안내.',
    url: 'https://whitestyle.com/treatments/implant/insurance',
    type: 'website',
    locale: 'ko_KR',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
