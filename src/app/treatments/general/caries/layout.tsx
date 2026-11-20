import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '강남역 충치치료 · 진행 단계별 레진·인레이·지르코니아',
  description:
    '강남역 화이트스타일치과의원 단계별 맞춤 충치치료 안내. 법랑질·상아질·치수염 진행 정도에 따라 레진·글라스아이오노머(건강보험)·골드·지르코니아 중 최소 삭제 수복 재료를 선택합니다.',
  alternates: { canonical: 'https://whitestyle.com/treatments/general/caries' },
  openGraph: {
    title: '강남역 충치치료 · 진행 단계별 레진·인레이·지르코니아 | 화이트스타일치과의원',
    description:
      '정밀 검진 기반 충치 진행 4단계 구분 치료 및 자연치아 최소 보존 수복 기준 안내.',
    url: 'https://whitestyle.com/treatments/general/caries',
    type: 'website',
    locale: 'ko_KR',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
