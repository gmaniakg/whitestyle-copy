import React from 'react';
import Link from 'next/link';
import { FadeIn, FadeInStaggerContainer, FadeInStaggerItem } from '@/components/animations/FadeIn';
import { RevealText } from '@/components/animations/RevealText';
import { getPostsByType } from '@/lib/api';

export default async function AboutPage() {
  const posts = getPostsByType('static_page').filter(p => {
    // 12117(인사말), 12118(의료진소개), 12119(둘러보기), 12120(진료시간)
    return p.url.includes('12117') || p.url.includes('12118') || p.url.includes('12119') || p.url.includes('12120');
  });

  return (
    <div className="py-24 px-4 sm:px-8 lg:px-16 xl:px-24 2xl:px-32 w-full mx-auto min-h-[100dvh]">
      <FadeIn direction="down" className="flex flex-col items-center mb-32 text-center">
        <span className="rounded-full px-6 py-2.5 text-[18px] uppercase tracking-[0.2em] font-bold bg-blue-50 text-blue-600 mb-8 border border-blue-100 shadow-sm">
          About Us
        </span>
        <h1 className="text-6xl md:text-[90px] font-black text-slate-900 tracking-tight mb-8 leading-tight">
          <RevealText text="병원소개" as="span" />
        </h1>
        <p className="text-2xl md:text-[32px] text-slate-600 mt-4">화이트스타일치과의 철학과 의료진을 소개합니다.</p>
      </FadeIn>

      <FadeIn direction="up" delay={0.2} className="p-1.5 rounded-[2rem] bg-black/5 ring-1 ring-black/5">
        <div className="rounded-[calc(2rem-0.375rem)] bg-white overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,1)]">
          <FadeInStaggerContainer className="divide-y divide-slate-100" as="ul">
            {posts.map((post, idx) => {
              const idMatch = post.url.match(/mir_code=(\d+)/);
              const id = idMatch ? idMatch[1] : '12117';
              const hrefMap: Record<string, string> = {
                '12117': '/about/greeting',
                '12118': '/about/doctors',
                '12119': '/about/tour',
                '12120': '/about/location',
              };
              const targetHref = hrefMap[id] || `/treatments/${id}`;
              return (
                <FadeInStaggerItem key={idx} direction={idx % 2 === 0 ? "left" : "right"} as="li">
                  <Link href={targetHref} className="group block px-10 py-10 hover:bg-blue-50/50 transition-colors duration-500">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 pr-4">
                        <h2 className="text-3xl md:text-[34px] font-bold text-slate-800 group-hover:text-[#0056b3] transition-colors line-clamp-1">
                          {post.title.split(' 화이트스타일')[0]}
                        </h2>
                      </div>
                      <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:bg-[#0056b3] group-hover:text-white group-hover:translate-x-2 shrink-0 shadow-sm">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                </FadeInStaggerItem>
              );
            })}
          </FadeInStaggerContainer>
        </div>
      </FadeIn>
    </div>
  );
}
