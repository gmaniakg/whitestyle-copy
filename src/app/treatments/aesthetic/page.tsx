'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function AestheticTreatmentPage() {
  return (
    <div className="py-24 px-4 sm:px-8 lg:px-16 xl:px-24 2xl:px-32 w-full mx-auto min-h-[100dvh]">
      <div className="flex flex-col items-center mb-24 text-center">
        <span className="rounded-full px-6 py-2.5 text-[18px] uppercase tracking-[0.2em] font-bold bg-blue-50 text-blue-600 mb-8 border border-blue-100 shadow-sm">
          Aesthetic Dentistry
        </span>
        <h1 className="text-6xl md:text-[80px] font-black text-slate-900 tracking-tight mb-6 leading-tight">
          심미치료 시스템
        </h1>
        <p className="text-2xl md:text-[28px] text-slate-600 max-w-3xl leading-relaxed mb-16">
          자연스럽고 눈부신 미소를 완성하는 화이트스타일치과의 맞춤형 프리미엄 심미성형 솔루션입니다.
        </p>
        
        <div className="relative w-full max-w-5xl h-[400px] md:h-[600px] rounded-[40px] overflow-hidden shadow-2xl border border-slate-100">
          <Image 
            src="/images/aesthetic-hero.jpg" 
            alt="건강하고 아름다운 미소"
            fill
            className="object-cover object-top"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <Link 
          href="/treatments/aesthetic/easy-white"
          className="group block p-10 bg-white rounded-3xl border border-slate-100 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
        >
          <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
            이지화이트 (Easy White)
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed mb-6">
            최소 삭제로 치아의 손상을 최소화하면서 가장 맑고 하얀 치아를 연출하는 맞춤형 라미네이트 시술입니다.
          </p>
          <span className="inline-flex items-center text-blue-600 font-bold group-hover:translate-x-2 transition-transform">
            자세히 보기 &rarr;
          </span>
        </Link>

        <Link 
          href="/treatments/aesthetic/zeroshell"
          className="group block p-10 bg-white rounded-3xl border border-slate-100 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
        >
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4 group-hover:text-indigo-600 transition-colors">
            제로쉘 (ZeroShell) 심미보철
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed mb-6">
            무삭제 치아 성형 솔루션으로 마취와 통증 없이 자연스러운 치아 형태와 색상을 완성합니다.
          </p>
          <span className="inline-flex items-center text-indigo-600 font-bold group-hover:translate-x-2 transition-transform">
            자세히 보기 &rarr;
          </span>
        </Link>
      </div>
    </div>
  );
}
