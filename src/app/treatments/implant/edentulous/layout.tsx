import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '강남역 무치악 전체임플란트 · 전악 구강 재건 · 커스텀 어버트먼트 | 화이트스타일치과의원',
  description:
    '1994년 개원 33년 전통 강남역 화이트스타일치과의원. 상·하악 전체 치아 상실 무치악 전악 재건(전체임플란트), CAD/CAM 정밀 보철, 3인 원장단 협진·3단계 무통 마취 및 3·6·12개월 치주 리콜.',
  alternates: { canonical: 'https://whitestyle.com/treatments/implant/edentulous' },
  openGraph: {
    title: '강남역 무치악 전체임플란트 · 전악 재건 | 화이트스타일치과',
    description:
      '교정학 박사·임플란트·치주과 전문의 3인 원장단 협진으로 저작력과 안모 수직 고경을 동시에 회복하는 무치악 전체임플란트.',
    url: 'https://whitestyle.com/treatments/implant/edentulous',
    type: 'website',
    locale: 'ko_KR',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
