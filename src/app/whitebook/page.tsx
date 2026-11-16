import type { Metadata } from 'next';
import HomeView from '../_views/HomeView';
import { pageMetadata } from '../_lib/seo';

export const metadata: Metadata = pageMetadata('home', 'ko');

export default function WhiteBookPage() {
  return <HomeView initialLang="ko" />;
}
