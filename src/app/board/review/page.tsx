import React from 'react';
import Link from 'next/link';
import { getPostsByType } from '@/lib/api';
import MedicalAuthGate from '@/components/MedicalAuthGate';

export default async function ReviewListPage() {
  const reviews = getPostsByType('board_review')
    .sort((a, b) => {
      const idA = parseInt(a.local_path.split('/').pop()?.split('_')[0] || '0', 10);
      const idB = parseInt(b.local_path.split('/').pop()?.split('_')[0] || '0', 10);
      return idB - idA;
    });

  return (
    <div className="py-24 px-4 sm:px-8 lg:px-16 xl:px-24 2xl:px-32 w-full mx-auto min-h-[100dvh]">
      <div className="flex flex-col items-center mb-16 text-center">
        <span className="rounded-full px-6 py-2.5 text-[18px] uppercase tracking-[0.2em] font-bold bg-blue-50 text-blue-600 mb-8 border border-blue-100 shadow-sm">
          Patient Stories
        </span>
        <h1 className="text-6xl md:text-[90px] font-black text-slate-900 tracking-tight mb-8 leading-tight">
          치료후기
        </h1>
        <p className="text-2xl md:text-[32px] text-slate-600 mt-4">화이트스타일치과와 함께한 소중한 경험들입니다.</p>
      </div>

      <MedicalAuthGate categoryName="자필 치료후기">
        <div className="p-1.5 rounded-[2rem] bg-black/5 ring-1 ring-black/5">
          <div className="rounded-[calc(2rem-0.375rem)] bg-white overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,1)]">
            <ul className="divide-y divide-slate-100">
              {reviews.map((post, idx) => {
                const idMatch = post.local_path.match(/\/(\d+)_/);
                const id = idMatch ? idMatch[1] : post.url.split('wr_id=')[1];
                return (
                  <li key={idx}>
                    <Link href={`/board/review/${id}`} className="group block px-10 py-10 hover:bg-blue-50/50 transition-colors duration-500">
                      <div className="flex items-center justify-between">
                        <div className="flex-1 pr-4">
                          <h2 className="text-3xl md:text-[34px] font-bold text-slate-800 group-hover:text-[#0056b3] transition-colors line-clamp-1">
                            {post.title.replace(/_/g, ' ')}
                          </h2>
                        </div>
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
            {reviews.length === 0 && (
              <div className="py-20 text-center text-slate-400">등록된 치료후기가 없습니다.</div>
            )}
          </div>
        </div>
      </MedicalAuthGate>
    </div>
  );
}
