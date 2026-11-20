import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '강남역 11·12번 출구 도보 1분 오시는 길 · 진료시간',
  description:
    '서울특별시 강남구 강남대로92길 17 (역삼동 819-10) 대승빌딩 B1·1·2층(우편번호 06134, 강남역 11·12번 출구 도보 1분). 월·화·수·금 10:00~19:00, 토 10:00~14:00 진료. 대표전화 1577-7287 / 02-569-7528, 일본어 직통 +82-10-3046-5010.',
  alternates: { canonical: 'https://whitestyle.com/about/location' },
  openGraph: {
    title: '강남역 11·12번 출구 도보 1분 오시는 길 · 진료시간 | 화이트스타일치과의원',
    description:
      '강남역 11번·12번 출구 도보 1분(143m) 대승빌딩 위치, 진료시간 및 한국어·일본어 직통 상담 연락처 안내.',
    url: 'https://whitestyle.com/about/location',
    type: 'website',
    locale: 'ko_KR',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
