import type { Metadata } from 'next';
import AwardsView from '../_views/AwardsView';
import { pageMetadata } from '../_lib/seo';

export const metadata: Metadata = pageMetadata('awards', 'ko');

export default function AwardsPage() {
  return <AwardsView initialLang="ko" />;
}
