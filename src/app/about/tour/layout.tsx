import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '병원 둘러보기 · 박성태 화백 기증 대기실 갤러리 & 3D 진단실',
  description:
    '강남역 11·12번 출구 도보 1분 화이트스타일치과의원 내부 전경 및 20년 이상 편안히 사용한 임플란트 인연으로 박성태 화백이 기증한 대기실 갤러리 13점 안내.',
  alternates: { canonical: 'https://whitestyle.com/about/tour' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
