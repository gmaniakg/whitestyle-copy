'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// Detailed reviews database with long stories for interactive modal popup (AEO/GEO & UX)
const reviews = [
  { 
    id: 1, 
    author: "김*진", 
    title: "원데이 임플란트, 정말 하나도 안 아팠어요!", 
    date: "2026.05.20", 
    type: "임플란트", 
    isLarge: true,
    content: "임플란트 수술이 너무 무서워서 10년 가까이 미루고 방치하다가, 지인 추천으로 서울대 출신 김준헌 대표원장님이 직접 집도하시는 화이트스타일치과를 방문하게 되었습니다. 3D CT 컴퓨터 정밀 분석을 통해 잇몸뼈 상태를 정확히 보여주시며 친절하게 상담해 주셔서 신뢰가 갔습니다. 시술 당일 마취부터 식립, 임시 치아 완성까지 하루 만에 통증과 출혈 없이 너무나 깔끔하게 치료가 끝났습니다! 수술 도중에도 계속해서 상태를 체크해 주시며 안심시켜 주셔서 감동이었습니다."
  },
  { 
    id: 2, 
    author: "이*훈", 
    title: "친절한 설명과 꼼꼼한 진료 감사합니다.", 
    date: "2026.04.15", 
    type: "교정", 
    isLarge: false,
    content: "치아 배열이 삐뚤빼뚤해서 강남 근처 교정치과 여러 곳에서 견적을 받았는데, 화이트스타일치과가 가장 과잉진료 없이 양심적이었습니다. 특히 첫 진단비부터 월 치료비, 유지장치 비용까지 전부 포함된 정액제 분납 요금이라 치료 중간에 추가 금액을 낼 걱정이 없어 너무 투명하고 합리적이었습니다. 원장님께서 매달 내원할 때마다 치아 이동 경로와 단계별 진척도를 아주 친절하게 눈으로 확인시켜 주셔서 대만족하며 치료 중입니다."
  },
  { 
    id: 3, 
    author: "박*영", 
    title: "라미네이트 결과 대만족입니다.", 
    date: "2026.03.10", 
    type: "심미보철", 
    isLarge: false,
    content: "앞니가 살짝 깨지고 벌어져서 웃을 때 늘 손으로 가리는 콤플렉스가 있었습니다. 치아 삭제량이 많은 일반 라미네이트와 달리, 자연치아를 거의 깎아내지 않는 ‘위니쉬(WHINISH) 무삭제 라미네이트’ 시술을 원장님께 직접 받았습니다. 시술 시간도 하루 만에 완성되었고, 이물감이나 이 시림 증상이 단 1%도 없이 진짜 제 치아처럼 너무 자연스럽고 영롱하게 웃을 수 있게 되어 자신감을 되찾았습니다!"
  },
  { 
    id: 4, 
    author: "최*민", 
    title: "무서웠던 신경치료, 원장님 덕분에 잘 끝냈습니다.", 
    date: "2026.02.28", 
    type: "일반진료", 
    isLarge: true,
    content: "치과 공포증이 엄청나게 심해서 잇몸이 붓고 신경치료 수준에 이를 때까지 진통제만 먹으며 참아왔습니다. 처음 병원에 들어설 때부터 직원분들과 간호사분들이 너무 친절하게 안심시켜 주셨고, 마취 바늘이 들어갈 때 컴퓨터 제어 무통 마취 시스템 덕분에 주삿바늘 느낌조차 거의 느끼지 못했습니다. 섬세하고 아프지 않게 신경치료와 크라운 보철물(고급 지르코니아) 씌우는 작업까지 완벽히 마무리해 주신 대표원장님께 깊이 감사드립니다."
  },
];

export default function ReviewBentoGrid() {
  const [selectedReview, setSelectedReview] = useState<null | typeof reviews[0]>(null);

  return (
    <section className="py-24 px-4 sm:px-8 lg:px-16 xl:px-24 2xl:px-32 w-full mx-auto bg-white">
      <div className="flex flex-col items-center mb-20 text-center">
        <span className="rounded-full px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] font-medium bg-blue-50 text-blue-600 mb-6 border border-blue-100">
          Real Patient Stories
        </span>
        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          결과가 증명하는 <span className="text-[#0056b3]">화이트스타일</span>
        </h2>
        <p className="text-slate-500 text-sm mt-3">아래 후기 카드를 클릭하시면 리얼 자필 치료 스토리를 자세히 보실 수 있습니다.</p>
      </div>

      {/* Bento Layout Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {reviews.map((review) => (
          <div 
            key={review.id} 
            onClick={() => setSelectedReview(review)}
            className={`group cursor-pointer ${review.isLarge ? 'md:col-span-8' : 'md:col-span-4'}`}
          >
            {/* Outer Bezel */}
            <div className="p-1.5 rounded-[2rem] bg-black/5 ring-1 ring-black/5 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[0.98] hover:ring-blue-300 shadow-sm">
              
              {/* Inner Core */}
              <div className="relative h-64 md:h-80 rounded-[calc(2rem-0.375rem)] bg-white overflow-hidden flex flex-col justify-between p-8">
                
                {/* Hover Gradient Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-blue-50/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-bold text-blue-500">{review.type}</span>
                    <span className="text-xs text-slate-400">{review.date}</span>
                  </div>
                  <h3 className={`font-bold text-slate-800 leading-snug group-hover:text-blue-900 transition-colors ${review.isLarge ? 'text-2xl md:text-3xl max-w-lg' : 'text-xl'}`}>
                    "{review.title}"
                  </h3>
                </div>

                {/* Footer and Arrow Icon */}
                <div className="relative z-10 flex items-center justify-between mt-auto pt-6 border-t border-slate-100">
                  <span className="text-sm font-semibold text-slate-600">{review.author} 님</span>
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:bg-[#0056b3] group-hover:text-white group-hover:rotate-45">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* ── INTERACTIVE DETAILED REVIEW MODAL (그 자리에서 보여주기) ── */}
      <AnimatePresence>
        {selectedReview && (
          <>
            {/* Backdrop Blur overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedReview(null)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100]"
            />

            {/* Modal Body */}
            <div className="fixed inset-0 flex items-center justify-center p-4 sm:p-6 z-[110] pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 30 }}
                transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-blue-50 overflow-hidden pointer-events-auto flex flex-col relative"
              >
                {/* Top header decoration */}
                <div className="h-2 w-full bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600" />
                
                {/* Close Button */}
                <button
                  onClick={() => setSelectedReview(null)}
                  className="absolute top-6 right-6 w-9 h-9 rounded-full bg-slate-100 hover:bg-red-50 text-slate-500 hover:text-red-600 flex items-center justify-center transition-colors focus:outline-none"
                  aria-label="닫기"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Content Area */}
                <div className="p-8 sm:p-10 space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 font-bold text-xs rounded-full">
                      {selectedReview.type}
                    </span>
                    <span className="text-sm text-slate-400 font-medium">
                      {selectedReview.date}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-snug">
                    "{selectedReview.title}"
                  </h3>

                  <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-100">
                    <p className="text-slate-700 text-base sm:text-lg leading-relaxed whitespace-pre-line font-medium">
                      {selectedReview.content}
                    </p>
                  </div>

                  {/* Footer & CTA */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-3">
                      <span className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">
                        {selectedReview.author[0]}
                      </span>
                      <span className="text-base font-bold text-slate-800">
                        {selectedReview.author} 환자분 리얼 후기
                      </span>
                    </div>

                    <Link
                      href="/consult"
                      onClick={() => setSelectedReview(null)}
                      className="w-full sm:w-auto px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm rounded-xl text-center shadow-lg shadow-blue-600/20 transition-all transform hover:-translate-y-0.5"
                    >
                      나도 맞춤 견적 받아보기 1:1 상담 ➔
                    </Link>
                  </div>
                </div>

              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

    </section>
  );
}
