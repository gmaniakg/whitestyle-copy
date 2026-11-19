import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '강남역 임플란트 재수술 · 동종골 뼈이식 · 상악동거상술 | 화이트스타일치과의원',
  description:
    '1994년 개원 33년 전통 강남역 화이트스타일치과의원. 3D CT 골밀도·신경관 정밀 진단과 3단계 무통 마취 기반 임플란트 재수술·동종골 뼈이식(GBR)·상악동거상술. 이봉진 대표원장·박선혜 치주과 전문의·김준헌 병원장 3인 협진 및 3·6·12개월 리콜.',
  alternates: { canonical: 'https://whitestyle.com/treatments/implant/bone-graft' },
  openGraph: {
    title: '강남역 임플란트 재수술 · 뼈이식 · 치주과 전문의 협진 | 화이트스타일치과',
    description:
      '타 병원 임플란트 흔들림·주위염 재수술과 고난도 뼈이식·상악동거상술을 치주과 전문의 협진과 커스텀 어버트먼트로 안전하게 재건합니다.',
    url: 'https://whitestyle.com/treatments/implant/bone-graft',
    type: 'website',
    locale: 'ko_KR',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
