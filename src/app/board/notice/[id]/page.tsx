import React from 'react';
import Link from 'next/link';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import { getPostByPartialTitle } from '@/lib/api';

export const dynamic = 'force-dynamic';

export default async function NoticeDetailPage({ params }: { params: { id: string } }) {
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
  const date = post.scraped_at ? post.scraped_at.split('T')[0] : '2026-06-11';

  return (
    <article className="py-24 px-4 sm:px-8 lg:px-16 xl:px-32 2xl:px-64 w-full mx-auto min-h-[100dvh]">
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
          <span className="text-xs font-bold text-blue-500 bg-blue-50 px-3 py-1 rounded-full">
            공지사항
          </span>
          <span className="text-sm text-slate-400 font-medium">
            {date}
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
          {post.title.replace(/_/g, ' ')}
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
