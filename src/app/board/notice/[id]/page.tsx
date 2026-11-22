import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import { getPostByPartialTitle } from '@/lib/api';
import '../../board-editorial.css';

export const dynamic = 'force-dynamic';

function stripToPlainText(raw: string): string {
  return raw
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/!\[[^\]]*\]\([^\)]*\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^\)]*\)/g, '$1')
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<\/(p|div|li|h[1-6]|tr)>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function buildDescription(plainText: string, maxLen = 155): string {
  if (plainText.length <= maxLen) return plainText;
  const slice = plainText.slice(0, maxLen);
  const lastSpace = slice.lastIndexOf(' ');
  return (lastSpace > 80 ? slice.slice(0, lastSpace) : slice).trim() + '…';
}

function resolveDate(metadata: Record<string, unknown> | undefined, scrapedAt: string | undefined): string {
  if (typeof metadata?.date === 'string' && metadata.date.trim()) {
    return metadata.date.trim();
  }
  if (scrapedAt && scrapedAt.includes('T')) {
    return scrapedAt.split('T')[0];
  }
  return '2026-06-11';
}

function extractFirstImageUrl(raw: string): string | undefined {
  const htmlMatch = raw.match(new RegExp('<' + 'img[^>]+src="([^"]+)"', 'i'));
  const mdMatch = raw.match(/!\[[^\]]*\]\(([^\s)]+)/);
  const src = htmlMatch?.[1] || mdMatch?.[1];
  if (!src) return undefined;
  if (src.startsWith('http://') || src.startsWith('https://')) return src;
  return `https://whitestyle.com${src.startsWith('/') ? src : `/${src}`}`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const postData = getPostByPartialTitle(id, 'board_notice');

  if (!postData) {
    return {
      title: '게시글을 찾을 수 없습니다 | 화이트스타일치과의원',
      robots: { index: false },
    };
  }

  const { post, content } = postData;
  const isColumn = post.url.includes('bo_table=column');
  const cleanTitle = post.title.replace(/_/g, ' ').trim();
  const plainText = stripToPlainText(content);
  const description = buildDescription(plainText, 155) || cleanTitle;
  const date = resolveDate(post.metadata, post.scraped_at);
  const url = `https://whitestyle.com/board/notice/${encodeURIComponent(id)}`;
  const imageUrl = extractFirstImageUrl(content);

  return {
    title: isColumn ? `${cleanTitle} | 임상칼럼` : cleanTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${cleanTitle} | 화이트스타일치과의원`,
      description,
      type: 'article',
      url,
      locale: 'ko_KR',
      publishedTime: date,
      ...(imageUrl ? { images: [{ url: imageUrl }] } : {}),
    },
  };
}

export default async function NoticeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const postData = getPostByPartialTitle(id, 'board_notice');

  if (!postData) {
    notFound();
  }

  const { post, content } = postData;
  const isColumn = post.url.includes('bo_table=column');
  const date = resolveDate(post.metadata, post.scraped_at);
  const cleanTitle = post.title.replace(/_/g, ' ').trim();
  const plainText = stripToPlainText(content);
  const description = buildDescription(plainText, 155) || cleanTitle;
  const canonicalUrl = `https://whitestyle.com/board/notice/${encodeURIComponent(id)}`;
  const imageUrl = extractFirstImageUrl(content);
  const isPress =
    /언론보도|뉴스|일보|경제|타임스|저널|소셜밸류|라포르시안|세정신문|크리스천투데이|비즈니스워치|bnt|TV|뉴스데스크/i.test(
      cleanTitle
    ) || plainText.includes('[언론보도 전문]');

  const categoryLabel = isColumn ? '임상칼럼' : isPress ? '언론보도' : '공지사항';
  const badgeClass = isColumn
    ? 'ws-cat-badge ws-cat-badge--column'
    : isPress
      ? 'ws-cat-badge ws-cat-badge--press'
      : 'ws-cat-badge';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': isPress ? 'NewsArticle' : 'Article',
    headline: cleanTitle,
    description,
    datePublished: date,
    dateModified: date,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
    author: {
      '@type': 'Person',
      name: '김준헌 병원장 (치의학박사)',
      jobTitle: '병원장 · 치과교정학 박사',
      worksFor: {
        '@type': 'Dentist',
        name: '화이트스타일치과의원',
        url: 'https://whitestyle.com',
      },
    },
    publisher: {
      '@type': 'Dentist',
      name: '화이트스타일치과의원',
      url: 'https://whitestyle.com',
      telephone: '1577-7287',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '강남대로92길 17 대승빌딩 B1·1·2층',
        addressLocality: '강남구',
        addressRegion: '서울특별시',
        postalCode: '06134',
        addressCountry: 'KR',
      },
    },
    ...(imageUrl ? { image: [imageUrl] } : {}),
    articleBody: plainText,
  };

  return (
    <article className="ws-board-shell wb-ka wbka">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Link href="/board/notice" className="ws-back-link">
        <svg className="ws-back-link-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        임상칼럼 및 공지사항 목록
      </Link>

      <header className="ws-article-header">
        <div className="ws-meta-row">
          <span className={badgeClass}>{categoryLabel}</span>
          <time dateTime={date} className="ws-meta-date">
            {date}
          </time>
          <span className="ws-meta-clinic">1994년 개원 33년 전통, 3인 원장단 책임 협진</span>
        </div>
        <h1 className="ws-article-title wb-ka wbka">
          {cleanTitle}
        </h1>
      </header>

      <MarkdownRenderer content={content} />

      <footer className="ws-cta-panel">
        <h2 className="ws-cta-head wb-ka wbka">정밀 진단 및 맞춤 진료 예약 안내</h2>
        <p className="ws-cta-meta">
          김준헌 병원장(서울대졸, 단국대 외래교수, 교정학 박사), 이봉진 대표원장, 박선혜 원장(보건복지부 인증 치주과 전문의) 3인 원장단 협진
        </p>
        <p className="ws-cta-meta">
          서울특별시 강남구 강남대로92길 17 (역삼동 819-10) 대승빌딩 B1, 1, 2층 (06134, 강남역 11번, 12번 출구 도보 1분)
        </p>
        <p className="ws-cta-meta">
          일본어 전담 통역 스태프 3명 상주, 일본어 통역 직통 +82-10-3046-5010
        </p>

        <div className="ws-cta-grid">
          <a
            href="https://booking.naver.com/booking/13/bizes/265482"
            target="_blank"
            rel="noopener noreferrer"
            className="ws-btn ws-btn-naver whitespace-nowrap"
          >
            네이버 빠른 예약 (1분 완료)
          </a>
          <Link href="/consult" className="ws-btn ws-btn-kakao whitespace-nowrap">
            카카오톡 1:1 비용 상담
          </Link>
          <a
            href="https://line.me/ti/p/~whitestyle1"
            target="_blank"
            rel="noopener noreferrer"
            className="ws-btn ws-btn-line whitespace-nowrap"
          >
            LINE 日本語直通相談 (ID: whitestyle1)
          </a>
          <a href="tel:1577-7287" className="ws-btn ws-btn-phone whitespace-nowrap">
            대표전화 1577-7287 / 02-569-7528
          </a>
        </div>

        <div className="ws-footer-nav">
          <Link href="/board/notice" className="ws-list-return-btn">
            전체 목록 보기
          </Link>
        </div>
      </footer>
    </article>
  );
}
