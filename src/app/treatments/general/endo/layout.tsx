import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '강남역 신경치료 · 재신경치료 · 3D CT 자연치아 살리기',
  description:
    '강남역 화이트스타일치과의원 신경치료·재신경치료 안내. 치과 전용 CT 3차원 영상과 특수 현미경 확대 진료로 미세 근관을 확인해 재신경치료를 우선 시행하고 자연치아 보존에 집중합니다.',
  alternates: { canonical: 'https://whitestyle.com/treatments/general/endo' },
  openGraph: {
    title: '강남역 신경치료 · 재신경치료 · 3D CT 자연치아 살리기 | 화이트스타일치과의원',
    description:
      '신경치료 후 지속 통증 치아의 재신경치료, 치근단 절제술·치아 재식술 검토 및 크라운 수복 사후관리 안내.',
    url: 'https://whitestyle.com/treatments/general/endo',
    type: 'website',
    locale: 'ko_KR',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
