import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import { getPostByPartialTitle } from '@/lib/api';

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
  const htmlMatch = raw.match(/<img[^>]+src="([^"]+)"/i);
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
  const cleanTitle = post.title.replace(/_/g, ' ').trim();
  const plainText = stripToPlainText(content);
  const description = buildDescription(plainText, 155) || cleanTitle;
  const date = resolveDate(post.metadata, post.scraped_at);
  const url = `https://whitestyle.com/board/notice/${encodeURIComponent(id)}`;
  const imageUrl = extractFirstImageUrl(content);

  return {
    title: `${cleanTitle} | 화이트스타일치과의원 공지·언론보도`,
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

  // URL이나 파일명에 id(예: 30713)가 포함된 게시글 찾기
  const postData = getPostByPartialTitle(id, 'board_notice');

  if (!postData) {
    return (
      <div className="py-32 text-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">게시글을 찾을 수 없습니다.</h2>
        <p className="text-slate-500 mb-8">요청하신 공지사항({id})이 삭제되었거나 존재하지 않습니다.</p>
        <Link href="/board/notice" className="text-blue-600 font-bold hover:underline">
          목록으로 돌아가기
        </Link>
      </div>
    );
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
    <article className="py-24 px-4 sm:px-8 lg:px-12 max-w-5xl w-full mx-auto min-h-[100dvh]" style={{ wordBreak: 'keep-all', overflowWrap: 'break-word' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* 백버튼 */}
      <Link href="/board/notice" className="inline-flex items-center text-sm font-bold text-slate-400 hover:text-blue-600 mb-10 transition-colors">
        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        목록으로
      </Link>

      {/* 게시글 헤더 */}
      <header className="mb-12 border-b border-slate-200 pb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className={`text-xs font-bold px-3 py-1 rounded-full ${isColumn ? 'text-emerald-600 bg-emerald-50' : 'text-blue-500 bg-blue-50'}`}>
            {isColumn ? '임상칼럼' : '공지사항'}
          </span>
          <span className="text-sm text-slate-400 font-medium">
            {date}
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight wb-ka wbka">
          {cleanTitle}
        </h1>
      </header>

      {/* 게시글 본문 (크롤링된 마크다운 데이터) */}
      <div className="bg-white/50 p-8 md:p-12 rounded-[2rem] border border-slate-100 shadow-[inset_0_1px_1px_rgba(255,255,255,1)] ring-1 ring-black/5">
        <MarkdownRenderer content={content} />
      </div>

      {/* 하단 네비게이션 영역 */}
      <div className="mt-12 text-center">
        <Link 
          href="/board/notice" 
          className="inline-flex items-center justify-center px-8 py-4 bg-slate-900 text-white rounded-full font-bold hover:bg-blue-600 transition-colors duration-300 shadow-xl shadow-slate-200 hover:shadow-blue-500/20 transform hover:-translate-y-1"
        >
          목록 보기
        </Link>
      </div>
    </article>
  );
}
