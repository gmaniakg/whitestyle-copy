import React from 'react';
import Link from 'next/link';
import { getPostsByType } from '@/lib/api';

export default async function NoticeListPage() {
  // 메타데이터에서 'board_notice' 타입의 게시글 모두 불러오기
  const notices = getPostsByType('board_notice').sort((a, b) => {
    // 최신순 정렬 (ID 기준 내림차순, 예: 30713 > 28276)
    const idA = parseInt(a.local_path.split('/').pop()?.split('_')[0] || '0', 10);
    const idB = parseInt(b.local_path.split('/').pop()?.split('_')[0] || '0', 10);
    return idB - idA;
  });

  return (
    <div className="py-24 px-4 sm:px-8 lg:px-16 xl:px-24 2xl:px-32 w-full mx-auto min-h-[100dvh]">
      {/* 헤더 섹션 */}
      <div className="flex flex-col items-center mb-32 text-center">
        <span className="rounded-full px-6 py-2.5 text-[18px] uppercase tracking-[0.2em] font-bold bg-blue-50 text-blue-600 mb-8 border border-blue-100 shadow-sm">
          WhiteStyle News
        </span>
        <h1 className="text-6xl md:text-[90px] font-black text-slate-900 tracking-tight mb-8 leading-tight">
          공지사항
        </h1>
        <p className="text-2xl md:text-[32px] text-slate-600 mt-4">화이트스타일치과의 새로운 소식을 전해드립니다.</p>
      </div>

      {/* 리스트 섹션 - Glassmorphism Table / List */}
      <div className="p-1.5 rounded-[2rem] bg-black/5 ring-1 ring-black/5">
        <div className="rounded-[calc(2rem-0.375rem)] bg-white overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,1)]">
          <ul className="divide-y divide-slate-100">
            {notices.map((notice, idx) => {
              // 파일명에서 id 추출 (예: posts/notice/30713_제목.md -> 30713)
              const idMatch = notice.local_path.match(/\/(\d+)_/);
              const id = idMatch ? idMatch[1] : notice.url.split('wr_id=')[1];

              return (
                <li key={idx}>
                  <Link 
                    href={`/board/notice/${id}`} 
                    className="group block px-10 py-10 hover:bg-blue-50/50 transition-colors duration-500"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1 pr-4">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-sm font-bold text-blue-500 bg-blue-50 px-3 py-1 rounded-md">
                            공지
                          </span>
                          <span className="text-sm text-slate-400 font-medium tracking-wide">
                            {notice.scraped_at ? notice.scraped_at.split('T')[0] : '2026-06-11'}
                          </span>
                        </div>
                        <h2 className="text-3xl md:text-[34px] font-bold text-slate-800 group-hover:text-[#0056b3] transition-colors line-clamp-1">
                          {notice.title.replace(/_/g, ' ')}
                        </h2>
                      </div>
                      
                      {/* Magnetic Arrow Icon */}
                      <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:bg-[#0056b3] group-hover:text-white group-hover:translate-x-2 shrink-0 shadow-sm">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
          
          {notices.length === 0 && (
            <div className="py-20 text-center text-slate-400">
              등록된 공지사항이 없습니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
