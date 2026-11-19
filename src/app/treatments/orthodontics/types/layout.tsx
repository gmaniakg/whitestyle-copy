import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '강남역 치아교정 재교정 · 옥니 예방 · 인비절라인 · 설측교정 | 화이트스타일치과의원',
  description:
    '1994년 개원 33년 전통. 서울대졸·단국대 외래교수·교정학 박사 김준헌 병원장 1:1 주치의 변경 없는 성인 재교정·옥니/재발 교정·인비절라인·설측교정 및 치주과 전문의 협진.',
  alternates: { canonical: 'https://whitestyle.com/treatments/orthodontics/types' },
  openGraph: {
    title: '강남역 치아교정 재교정 · 인비절라인 · 설측 1:1 전담 | 화이트스타일치과',
    description:
      'Quick-Ceph와 3D CT 치근·치조골 계측 기반 성인 재교정 및 진단비·월비·유지장치 포함 총액제 투명 안내.',
    url: 'https://whitestyle.com/treatments/orthodontics/types',
    type: 'website',
    locale: 'ko_KR',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
