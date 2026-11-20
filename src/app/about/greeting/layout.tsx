import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '대표원장 인사말 · 33년 한 자리 책임 진료 철학',
  description:
    '1994년 개원 이래 33년간 강남역 한 자리에서 과잉진료 없는 정직한 치료와 자연치아 보존을 지켜온 화이트스타일치과의원 대표원장 인사말.',
  alternates: { canonical: 'https://whitestyle.com/about/greeting' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
