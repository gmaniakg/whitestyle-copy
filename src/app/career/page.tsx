import type { Metadata } from 'next';
import CareerView from '../_views/CareerView';
import { pageMetadata } from '../_lib/seo';

export const metadata: Metadata = pageMetadata('career', 'ko');

export default function CareerPage() {
  return <CareerView initialLang="ko" />;
}
