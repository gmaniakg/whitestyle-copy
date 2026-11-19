import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '강남역 무삭제 제로쉘 · 최소삭제 라미네이트 재시술 | 화이트스타일치과의원',
  description:
    '자연치아 법랑질 보존 최우선 원칙. 무삭제 제로쉘(ZeroShell) 및 0.1~0.2mm 최소삭제 세라믹, 타 치과 라미네이트 변색·파절·잇몸염증 재시술을 치주과 전문의 박선혜 원장 포함 3인 협진으로 2~3회 완성.',
  alternates: { canonical: 'https://whitestyle.com/treatments/aesthetic/zeroshell' },
  openGraph: {
    title: '무삭제 제로쉘 · 최소삭제 라미네이트 재시술 | 강남역 화이트스타일치과',
    description:
      '3D 구강스캔 및 교합 분석으로 시림 없는 법랑질 보존 무삭제·최소삭제 맞춤 라미네이트 및 재시술 진행.',
    url: 'https://whitestyle.com/treatments/aesthetic/zeroshell',
    type: 'website',
    locale: 'ko_KR',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
