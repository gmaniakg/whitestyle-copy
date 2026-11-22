import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getPostsByType } from '@/lib/api';
import '../board-editorial.css';

export const metadata: Metadata = {
  title: '임상 칼럼 · 공지사항 · 강남역 치과 가이드',
  description:
    '1994년 개원 33년 전통 강남역 화이트스타일치과의원 김준헌·이봉진·박선혜 3인 원장단의 임플란트 재수술, 뼈이식, 성인 재교정, 최소삭제 라미네이트 임상 칼럼과 병원 공식 소식.',
  alternates: { canonical: 'https://whitestyle.com/board/notice' },
  openGraph: {
    title: '임상 칼럼 · 공지사항 | 화이트스타일치과의원',
    description:
      '강남역 화이트스타일치과의원 3인 원장단 임상 칼럼, 심평원 비급여 비교 기준 및 고난도 재치료 가이드 모음.',
    url: 'https://whitestyle.com/board/notice',
    type: 'website',
    locale: 'ko_KR',
  },
};

export default async function NoticeListPage() {
  const notices = getPostsByType('board_notice').sort((a, b) => {
    const dateA = typeof a.metadata?.date === 'string' ? a.metadata.date : '';
    const dateB = typeof b.metadata?.date === 'string' ? b.metadata.date : '';
    if (dateA !== dateB) return dateB.localeCompare(dateA);

    const idA = parseInt(a.local_path.split('/').pop()?.split('_')[0] || '0', 10);
    const idB = parseInt(b.local_path.split('/').pop()?.split('_')[0] || '0', 10);
    return idB - idA;
  });

  return (
    <div className="ws-notice-list-shell wb-ka wbka">
      <header className="ws-notice-list-header">
        <h1 className="ws-notice-list-title wb-ka wbka">
          임상칼럼 및 병원소식
        </h1>
        <p className="ws-notice-list-desc">
          1994년 개원 33년 전통 강남역 화이트스타일치과의원 3인 원장단의 임상 칼럼과 언론보도, 병원 공식 안내입니다.
        </p>
      </header>

      <div className="ws-notice-list">
        {notices.length > 0 ? (
          <ul>
            {notices.map((notice, idx) => {
              const idMatch = notice.local_path.match(/\/(\d+)_/);
              const id = idMatch ? idMatch[1] : notice.url.split('wr_id=')[1];
              const cleanTitle = notice.title.replace(/_/g, ' ').trim();
              const isColumn = notice.url.includes('bo_table=column');
              const isPress = /언론보도|뉴스|일보|경제|타임스|저널|소셜밸류|라포르시안|세정신문|크리스천투데이|비즈니스워치|bnt|TV|뉴스데스크|미디어파인|대학저널|농업정보신문|메가경제|HBN뉴스/i.test(
                cleanTitle
              );
              const dateText =
                typeof notice.metadata?.date === 'string'
                  ? notice.metadata.date
                  : notice.scraped_at
                    ? notice.scraped_at.split('T')[0]
                    : '2026-06-11';
              const categoryLabel = isColumn ? '임상칼럼' : isPress ? '언론보도' : '공지사항';
              const badgeClass = isColumn
                ? 'ws-cat-badge ws-cat-badge--column'
                : isPress
                  ? 'ws-cat-badge ws-cat-badge--press'
                  : 'ws-cat-badge';

              return (
                <li key={idx} className="ws-notice-item">
                  <Link href={`/board/notice/${id}`} className="ws-notice-link">
                    <div className="ws-notice-link-main">
                      <div className="ws-notice-item-meta">
                        <span className={badgeClass}>{categoryLabel}</span>
                        <time dateTime={dateText} className="ws-meta-date">
                          {dateText}
                        </time>
                      </div>
                      <h2 className="ws-notice-item-title wb-ka wbka">
                        {cleanTitle}
                      </h2>
                    </div>

                    <div className="ws-notice-arrow" aria-hidden="true">
                      <svg className="ws-notice-arrow-svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="ws-empty-state">
            등록된 게시글이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}
