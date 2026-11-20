import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '의료진 소개 · 김준헌·이봉진·박선혜 3인 원장단 협진',
  description:
    '1994년 개원 33년 전통 강남역 화이트스타일치과의원 3인 원장단 안내. 서울대졸·교정학 박사 김준헌 병원장, 연세대 치대 출신 이봉진 대표원장, 보건복지부 인증 치주과 전문의 박선혜 원장 분과 협진.',
  alternates: { canonical: 'https://whitestyle.com/about/doctors' },
  openGraph: {
    title: '의료진 소개 · 김준헌·이봉진·박선혜 3인 원장단 협진 | 화이트스타일치과의원',
    description:
      '교정·임플란트·치주과 전문의 3인 원장단 상세 약력과 주치의 변경 없는 1:1 책임 협진 시스템 안내.',
    url: 'https://whitestyle.com/about/doctors',
    type: 'website',
    locale: 'ko_KR',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
