import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '강남역 무삭제·최소삭제 라미네이트 · 제로쉘 심미보철',
  description:
    '1994년 개원 33년 전통 강남역 화이트스타일치과의원 자연치아 보존 중심 심미보철. 정밀 교합 진단 후 무삭제 제로쉘 또는 0.1~0.2mm 최소삭제 이지화이트 맞춤 세라믹과 3·6·12개월 보증 관리를 제공합니다.',
  alternates: { canonical: 'https://whitestyle.com/treatments/aesthetic' },
  openGraph: {
    title: '강남역 무삭제·최소삭제 라미네이트 · 제로쉘 심미보철 | 화이트스타일치과의원',
    description:
      '법랑질 보존 최우선 원칙으로 치아 시림·신경 손상 부담을 줄인 무삭제 제로쉘·0.1~0.2mm 최소삭제 세라믹 및 기존 보철 재시술 안내.',
    url: 'https://whitestyle.com/treatments/aesthetic',
    type: 'website',
    locale: 'ko_KR',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
