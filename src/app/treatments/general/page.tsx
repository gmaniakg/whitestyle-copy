'use client';

import React from 'react';
import Image from 'next/image';

export default function Page() {
  return (
    <div className="w-full min-h-screen bg-white pb-24">
      {/* Hero Section */}
      <div className="pt-24 px-4 sm:px-8 lg:px-16 xl:px-24 w-full mx-auto flex flex-col items-center text-center">
        <span className="rounded-full px-6 py-2.5 text-[18px] uppercase tracking-[0.2em] font-bold bg-green-50 text-green-600 mb-8 border border-green-100 shadow-sm">
          General Dentistry
        </span>
        <h1 className="text-6xl md:text-[80px] font-black text-slate-900 tracking-tight mb-6 leading-tight">
          일반/예방 진료
        </h1>
        <p className="text-2xl md:text-[28px] text-slate-600 max-w-3xl leading-relaxed mb-16">
          상쾌한 아침의 시작, 건강한 치아부터.<br/>
          아프지 않은 편안한 진료로 당신의 하루를 가볍게 해드립니다.
        </p>

        <div className="relative w-full max-w-5xl h-[400px] md:h-[600px] rounded-[40px] overflow-hidden shadow-2xl border border-slate-100 mb-16">
          <Image 
            src="/images/general-hero.png" 
            alt="편안하고 상쾌한 아침 스트레칭"
            fill
            className="object-cover object-top"
          />
        </div>
      </div>

      {/* Legacy Content (Iframe) */}
      <iframe 
        src="/legacy/12128.html" 
        className="w-full min-h-screen border-none"
        style={{ minHeight: '3000px' }}
        onLoad={(e) => {
          try {
            const iframe = e.target as HTMLIFrameElement;
            if (iframe.contentWindow) {
              iframe.style.height = iframe.contentWindow.document.body.scrollHeight + 'px';
            }
          } catch(err) {}
        }}
      />
    </div>
  );
}
