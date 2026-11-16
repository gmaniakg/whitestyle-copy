'use client';

export type Lang = 'ko' | 'ja' | 'en';

/** Localized URL: WhiteBook ko lives at /whitebook, ja at /whitebook/ja, en at /en. */
export function localizedPath(lang: Lang, path: string): string {
  if (path === '/' || path === '/whitebook') {
    return lang === 'ko' ? '/whitebook' : lang === 'ja' ? '/whitebook/ja' : '/en';
  }
  return lang === 'ko' ? path : `/${lang}${path}`;
}

/**
 * Language switching is real navigation (/ja, /en) so that every language has
 * its own server-rendered, crawlable, canonical URL.
 */
export function useLangRoute(current: Lang, path: string) {
  return (next: Lang) => {
    if (next === current) return;
    window.location.assign(localizedPath(next, path) + window.location.hash);
  };
}
