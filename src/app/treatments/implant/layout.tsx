import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '강남역 임플란트 · 3인 원장단 협진 · 3단계 무통 마취',
  description:
    '1994년 개원 33년 전통 강남역 화이트스타일치과의원 3D 정밀 임플란트. 치의학박사 김준헌 병원장·이봉진 대표원장·박선혜 원장(치주과 전문의) 3인 협진, 3단계 통증 완화 무통 마취, 3·6·12개월 치주 리콜 및 일본어 전담 통역 3명 상주(+82-10-3046-5010).',
  alternates: { canonical: 'https://whitestyle.com/treatments/implant' },
  openGraph: {
    title: '강남역 임플란트 · 3인 원장단 협진 · 3단계 무통 마취 | 화이트스타일치과의원',
    description:
      '3D CT 정밀 진단과 3단계 통증 완화 마취, 3인 원장단 협진으로 뼈이식·재수술·전체임플란트부터 3·6·12개월 사후 리콜까지 안전하게 진행합니다.',
    url: 'https://whitestyle.com/treatments/implant',
    type: 'website',
    locale: 'ko_KR',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
