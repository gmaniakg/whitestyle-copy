import type { Metadata } from 'next';
import PressView from '../_views/PressView';
import { pageMetadata } from '../_lib/seo';

export const metadata: Metadata = pageMetadata('press', 'ko');

export default function PressPage() {
  return <PressView initialLang="ko" />;
}
