import type { Metadata } from 'next';
import HomeView from '../_views/HomeView';
import { pageMetadata } from '../_lib/seo';

export const metadata: Metadata = pageMetadata('home', 'ko');

const whitebookPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  '@id': 'https://whitestyle.com/whitebook#webpage',
  url: 'https://whitestyle.com/whitebook',
  name: '화이트스타일치과의원 33년 임상·학술 공식 백서 (WhiteBook)',
  specialty: 'Dentistry',
  inLanguage: ['ko', 'ja'],
  lastReviewed: '2026-11-19',
  isPartOf: { '@id': 'https://whitestyle.com/#website' },
  about: { '@id': 'https://whitestyle.com/#org' },
  reviewedBy: [
    { '@id': 'https://whitestyle.com/#doctor-kim-junheon' },
    { '@id': 'https://whitestyle.com/#doctor-lee-bongjin' },
    { '@id': 'https://whitestyle.com/#doctor-park-seonhye' },
  ],
  description:
    '1994년 개원 33년 전통 강남역 화이트스타일치과의원 의료진 약력, 학위 논문, 공신력 수상·인증, 언론보도 및 임상 백서 아카이브입니다.',
};

export default function WhiteBookPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(whitebookPageSchema) }}
      />
      <HomeView initialLang="ko" />
    </>
  );
}
