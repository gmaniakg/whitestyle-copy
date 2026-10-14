'use client';

import React, { useState } from 'react';
import { FadeIn } from '@/components/animations/FadeIn';
import { motion, AnimatePresence } from 'framer-motion';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import Link from 'next/link';

// 유명인 랭킹 (이 리스트에 포함된 사람을 우선적으로 앞쪽에 배치)
const famousRanking = [
  "미스코리아 이하늬",
  "영화배우 유오성",
  "영화배우 권오중",
  "개그우먼 김숙",
  "개그맨 문세윤",
  "개그맨 양세형",
  "개그맨 김기욱",
  "왔다장보리 오창석",
  "프로게이머 홍진호",
  "클릭비 김상혁",
  "프로게이머 박정석",
  "영화배우 이칸희",
  "배우 현우성",
  "탤런트 이종수",
  "탤런트 정애연",
  "슈퍼모델 황현주",
  "개그맨 이종규",
  "개그맨 조두석",
  "클릭비 노민혁",
  "클릭비 우연석",
  "프로게이머 김구현",
  "프로게이머 박성훈"
];


interface StarPost {
  id: string;
  title: string;
  content: string;
  imgSrc: string | null;
  videoId: string | null;
}

export default function WithStarClient({ posts }: { posts: StarPost[] }) {
  const [showAll, setShowAll] = useState(false);
  const [selectedPost, setSelectedPost] = useState<StarPost | null>(null);

  // 유명도에 따른 정렬
  const sortedPosts = [...posts].sort((a, b) => {
    let rankA = famousRanking.findIndex(name => a.title.includes(name));
    let rankB = famousRanking.findIndex(name => b.title.includes(name));
    
    // 리스트에 없으면 최하위 순위 부여
    if (rankA === -1) rankA = 999;
    if (rankB === -1) rankB = 999;

    if (rankA !== rankB) {
      return rankA - rankB; // 높은 순위(작은 인덱스)가 먼저
    }
    
    // 순위가 같으면 최신 글(아이디 큰 것) 우선
    return parseInt(b.id, 10) - parseInt(a.id, 10);
  });

  const visiblePosts = showAll ? sortedPosts : sortedPosts.slice(0, Math.ceil(sortedPosts.length / 2));

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
        {visiblePosts.map((post, idx) => {
          const { id, title, imgSrc, videoId } = post;

          // Awake Agency Style Unique Shapes
          const shapes = [
            "rounded-[4rem]", // Squircle
            "rounded-t-[8rem] rounded-b-3xl", // Tall Arch
            "rounded-full", // Perfect Circle
            "rounded-tl-[5rem] rounded-br-[5rem] rounded-tr-2xl rounded-bl-2xl", // Leaf shape
          ];
          const bgColors = [
            "bg-slate-800",
            "bg-orange-300",
            "bg-yellow-300",
            "bg-blue-400"
          ];
          const shapeClass = shapes[idx % shapes.length];
          const bgColorClass = bgColors[idx % bgColors.length];

          return (
            <FadeIn key={id} direction="up" delay={0.1 * (idx % 4)} className="flex flex-col items-center">
              <div 
                onClick={() => setSelectedPost(post)}
                className="group block w-full relative cursor-pointer"
              >
                {/* Image Container */}
                <div className={`w-full aspect-[4/5] relative overflow-hidden mb-6 transition-all duration-500 group-hover:-translate-y-3 group-hover:shadow-2xl ${shapeClass} ${bgColorClass} p-1`}>
                  <div className={`w-full h-full overflow-hidden relative ${shapeClass}`}>
                    {imgSrc ? (
                      <img src={imgSrc} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] grayscale group-hover:grayscale-0 mix-blend-luminosity group-hover:mix-blend-normal" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white/50 bg-black/10">
                        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center z-10">
                      <div className="w-16 h-16 bg-white/95 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300">
                        <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                      </div>
                      <span className="text-white font-black mt-4 tracking-wider drop-shadow-md text-base">스토리 보기</span>
                    </div>
                  </div>
                </div>
                
                {/* Text Content */}
                <div className="text-center">
                  <h2 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1 mb-1 font-serif">
                    {title}
                  </h2>
                  <p className="text-slate-500 text-sm font-medium mb-4">
                    VIP Patient
                  </p>
                </div>
              </div>
            </FadeIn>
          );
        })}
      </div>

      {!showAll && sortedPosts.length > Math.ceil(sortedPosts.length / 2) && (
        <div className="mt-20 flex justify-center">
          <button 
            onClick={() => setShowAll(true)}
            className="group flex items-center gap-3 px-8 py-4 bg-white border-2 border-slate-200 text-slate-600 rounded-full font-bold hover:border-blue-600 hover:text-blue-600 transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1"
          >
            스타 더보기 (Show More)
            <svg className="w-5 h-5 group-hover:translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      )}
      
      {posts.length === 0 && (
        <div className="py-20 text-center text-slate-400">등록된 게시글이 없습니다.</div>
      )}

      {/* ── INTERACTIVE STAR STORY POPUP (그 자리에서 보여주기) ── */}
      <AnimatePresence>
        {selectedPost && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPost(null)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[100]"
            />

            {/* Modal Body Wrapper */}
            <div className="fixed inset-0 flex items-center justify-center p-4 sm:p-6 md:p-8 z-[110] pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 25 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 25 }}
                transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                className="bg-white rounded-[2rem] w-full max-w-4xl max-h-[85vh] overflow-y-auto shadow-2xl relative border border-slate-100 pointer-events-auto flex flex-col p-6 sm:p-10"
                onClick={e => e.stopPropagation()}
              >
                {/* Close Button */}
                <button 
                  onClick={() => setSelectedPost(null)}
                  className="absolute top-6 right-6 w-11 h-11 bg-slate-100 hover:bg-red-50 text-slate-500 hover:text-red-600 rounded-full flex items-center justify-center transition-colors z-10 focus:outline-none"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Header Information */}
                <div className="mb-8 pr-12 border-b border-slate-100 pb-5">
                  <span className="px-3.5 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-black tracking-widest uppercase mb-2 inline-block">
                    VIP Star Story
                  </span>
                  <h3 className="text-3xl font-black text-slate-900 leading-tight">{selectedPost.title}</h3>
                  <p className="text-slate-400 text-sm mt-1">화이트스타일치과를 선택해주신 스타 환자분의 리얼 후기 스토리입니다.</p>
                </div>

                {/* Main Content Area (Layout split: Video/Image + Story Text) */}
                <div className="space-y-8 flex-1">
                  
                  {/* YouTube video if available */}
                  {selectedPost.videoId ? (
                    <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-black">
                      <iframe
                        className="w-full h-full"
                        src={`https://www.youtube.com/embed/${selectedPost.videoId}?autoplay=1`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      ></iframe>
                    </div>
                  ) : selectedPost.imgSrc ? (
                    <div className="w-full max-h-[350px] overflow-hidden rounded-2xl border border-slate-100 flex items-center justify-center bg-slate-50">
                      <img 
                        src={selectedPost.imgSrc} 
                        alt={selectedPost.title} 
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ) : null}

                  {/* Written content (Markdown) */}
                  <div className="bg-slate-50/50 rounded-2xl p-6 sm:p-8 border border-slate-100">
                    <MarkdownRenderer content={selectedPost.content.replace(/!\[.*?\]\(.*?\)/g, '')} />
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <span className="text-sm font-bold text-slate-400">화이트스타일치과 의료법 제56조 준수 안심 후기</span>
                  <Link
                    href="/consult"
                    onClick={() => setSelectedPost(null)}
                    className="w-full sm:w-auto px-6 py-3.5 bg-slate-900 hover:bg-blue-600 text-white font-extrabold text-sm rounded-xl text-center transition-all"
                  >
                    나도 연예인처럼 아름답고 자연스러운 치아 상담받기 ➔
                  </Link>
                </div>

              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
