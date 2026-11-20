import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '강남역 치아교정 · 교정학 박사 김준헌 병원장 1:1 전담',
  description:
    '1994년 개원 33년 전통 강남역 화이트스타일치과의원 1:1 책임 치아교정. 서울대졸·단국대 외래교수·교정학 박사 김준헌 병원장이 진단부터 유지관리까지 주치의 변경 없이 직접 진료합니다. 대표상담 1577-7287 / 02-569-7528.',
  alternates: { canonical: 'https://whitestyle.com/treatments/orthodontics' },
  openGraph: {
    title: '강남역 치아교정 · 교정학 박사 김준헌 병원장 1:1 전담 | 화이트스타일치과의원',
    description:
      '3D CT·Quick-Ceph 당일 정밀 진단 및 인비절라인·설측·클리피씨·재교정 총액제 기준 투명 안내.',
    url: 'https://whitestyle.com/treatments/orthodontics',
    type: 'website',
    locale: 'ko_KR',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
