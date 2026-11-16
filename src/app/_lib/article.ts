import contentData from '../contentData.json';

export const SITE = 'https://whitestyle.com';
export const CLINIC_ID = `${SITE}/#clinic`;
export const DOCTOR_ID = `${SITE}/#doctor`;

export type Article = {
  id: string;
  title: string;
  type: string;
  content: string;
  media: string;
  date?: string;
};

export function getArticle(id: string): Article | undefined {
  const data = contentData as Record<string, Article>;
  if (data[id]) return data[id];
  try {
    return data[decodeURIComponent(id)];
  } catch {
    return undefined;
  }
}

// Lines produced by PDF/web extraction that are not article text.
const NOISE = /^(기사입력|최종수정|입력|수정|승인|등록|▲|By\s|©|인쇄하기|창닫기|Print|HOME|\[[^\]]*기자\]\s*$)/;

/** Meta description: first ~150 chars of real body text (skips bylines, dates, UI noise). */
export function articleDescription(content: string, max = 150): string {
  const body = content
    .split('\n\n')
    .map((p) => p.replace(/\n/g, ' ').trim())
    .filter((p) => p && !NOISE.test(p))
    .join(' ')
    .replace(/\s+/g, ' ');
  return body.length > max ? `${body.slice(0, max).trim()}…` : body;
}

export function articleJsonLd(id: string, a: Article) {
  const url = `${SITE}/article/${encodeURIComponent(id)}`;
  const isPress = a.type === '언론보도';
  const isResearch = a.type === '연구 논문';
  const isImage = /\.(jpe?g|png)$/i.test(a.media || '');
  const image = isImage ? `${SITE}${a.media}` : `${SITE}/mbc_interview_new.jpg`;
  const sectionName = isPress ? '언론보도 & 전문 칼럼' : isResearch ? '연구 논문' : '수상경력 & 인증';
  const sectionPath = isPress ? '/press' : '/awards';
  const description = articleDescription(a.content, 180);
  const isColumn = /\[김준헌 칼럼\]|김준헌 칼럼/.test(a.content.slice(0, 600));

  const common = {
    '@id': `${url}#article`,
    name: a.title,
    url,
    description,
    image,
    inLanguage: 'ko',
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    isPartOf: { '@type': 'WebSite', '@id': `${SITE}/#website`, url: SITE, name: '화이트스타일치과 백서' },
    about: { '@id': DOCTOR_ID },
    mentions: { '@id': CLINIC_ID },
    publisher: { '@id': CLINIC_ID },
  };

  const node = isPress || isResearch
    ? {
        '@type': 'Article',
        ...common,
        headline: a.title.slice(0, 110),
        ...(a.date ? { datePublished: a.date, dateModified: a.date } : {}),
        ...(isColumn ? { author: { '@id': DOCTOR_ID } } : {}),
      }
    : {
        // Certificates/awards are records on a page, not articles.
        '@type': 'WebPage',
        ...common,
        primaryImageOfPage: { '@type': 'ImageObject', url: image },
      };

  const breadcrumb = {
    '@type': 'BreadcrumbList',
    '@id': `${url}#breadcrumb`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '홈', item: `${SITE}/` },
      { '@type': 'ListItem', position: 2, name: sectionName, item: `${SITE}${sectionPath}` },
      { '@type': 'ListItem', position: 3, name: a.title, item: url },
    ],
  };

  return { '@context': 'https://schema.org', '@graph': [node, breadcrumb] };
}
