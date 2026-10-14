import React from 'react';
import Link from 'next/link';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import MedicalAuthGate from '@/components/MedicalAuthGate';
import { getPostByPartialTitle } from '@/lib/api';

export default async function ReviewDetailPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  
  // 치료후기(board_review) 게시글 찾기
  const postData = getPostByPartialTitle(id, 'board_review');
  
  if (!postData) {
    return (
      <div className="py-32 text-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">게시글을 찾을 수 없습니다.</h2>
        <p className="text-slate-500 mb-8">요청하신 치료후기({id})가 존재하지 않습니다.</p>
        <Link href="/board/review" className="text-blue-600 font-bold hover:underline">
          목록으로 돌아가기
        </Link>
      </div>
    );
  }

  const { post, content } = postData;

  return (
    <article className="py-24 px-4 sm:px-8 lg:px-16 xl:px-32 2xl:px-64 w-full mx-auto min-h-[100dvh]">
      {/* 백버튼 */}
      <Link href="/board/review" className="inline-flex items-center text-sm font-bold text-slate-400 hover:text-blue-600 mb-10 transition-colors">
        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        목록으로
      </Link>

      {/* 게시글 헤더 */}
      <header className="mb-12 border-b border-slate-200 pb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs font-bold text-blue-500 bg-blue-50 px-3 py-1 rounded-full">
            치료후기
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
          {post.title.replace(/_/g, ' ')}
        </h1>
      </header>

      {/* 의료법 준수 로그인 보호 게이트 */}
      <MedicalAuthGate categoryName="환자 치료후기 상세 내용">
        <div className="bg-white/50 p-8 md:p-12 rounded-[2rem] border border-slate-100 shadow-[inset_0_1px_1px_rgba(255,255,255,1)] ring-1 ring-black/5">
          <MarkdownRenderer content={content} />
        </div>
      </MedicalAuthGate>

      {/* 하단 네비게이션 영역 */}
      <div className="mt-12 text-center">
        <Link 
          href="/board/review" 
          className="inline-flex items-center justify-center px-8 py-4 bg-slate-900 text-white rounded-full font-bold hover:bg-blue-600 transition-colors duration-300 shadow-xl shadow-slate-200 hover:shadow-blue-500/20 transform hover:-translate-y-1"
        >
          목록 보기
        </Link>
      </div>
    </article>
  );
}
