'use client';

import React from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

interface MedicalAuthGateProps {
  children: React.ReactNode;
  title?: string;
  categoryName?: string;
}

export default function MedicalAuthGate({
  children,
  title = "치료후기",
  categoryName = "치료후기 및 고객 경험담"
}: MedicalAuthGateProps) {
  const { data: session, status } = useSession();

  // If loading session, display clean skeleton
  if (status === 'loading') {
    return (
      <div className="w-full py-20 flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4" />
        <p className="text-slate-500 font-bold">의료법 준수 여부 및 인증 확인 중...</p>
      </div>
    );
  }

  // If user is authenticated, display full content with medical disclaimer footer
  if (session) {
    return (
      <div className="w-full">
        {children}
        
        {/* 의료법 준수 및 부작용 주의 문구 */}
        <div className="mt-12 p-6 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-500 leading-relaxed">
          <p className="font-bold text-slate-700 mb-1 flex items-center gap-1.5">
            <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            의료법 제56조(의료광고의 금지 등) 준수 안내
          </p>
          <p>
            본 웹사이트의 {categoryName}은 대한민국 의료법 제56조 및 보건복지부 가이드라인에 따라 로그인한 본원 회원에 한해 제공됩니다. 
            모든 치료 후기는 환자 본인의 자발적 작성물이며, 개인의 체질과 증상에 따라 치료 결과 및 부작용(부종, 출혈, 통증 등)이 다를 수 있으므로 전문 의료진과의 충분한 상담이 필요합니다.
          </p>
        </div>
      </div>
    );
  }

  // Non-logged-in user gate: Render blur overlay and login prompt
  return (
    <div className="relative w-full overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 md:p-14 shadow-xl">
      {/* Blurred background preview */}
      <div className="filter blur-md select-none opacity-40 pointer-events-none aria-hidden">
        <div className="space-y-6">
          <div className="h-8 bg-slate-300 rounded-lg w-3/4 animate-pulse" />
          <div className="h-4 bg-slate-200 rounded w-full" />
          <div className="h-4 bg-slate-200 rounded w-5/6" />
          <div className="h-48 bg-slate-100 rounded-2xl border border-slate-200 flex items-center justify-center text-slate-300">
            [환자 치료 전후 사진 및 상세 후기 내용 보호 구역]
          </div>
        </div>
      </div>

      {/* Foreground Medical Law Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 md:p-12 bg-gradient-to-b from-white/90 via-white/95 to-white text-center backdrop-blur-sm z-20">
        <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-6 shadow-inner ring-1 ring-blue-100">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>

        <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-blue-100 text-blue-700 mb-3">
          의료법 제56조 준수 안내
        </span>

        <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-4 tracking-tight">
          로그인 후 열람이 가능합니다
        </h2>

        <p className="text-slate-600 max-w-lg text-sm md:text-base mb-8 leading-relaxed">
          대한민국 의료법 규정에 의거하여 환자의 실제 치료후기 및 비포/애프터 사례는 <strong className="text-slate-900 font-bold">본원 로그인 회원</strong>에게만 공개됩니다. 
          간편한 회원가입 후 전체 후기를 확인하실 수 있습니다.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
          <Link
            href="/login"
            className="flex-1 py-4 px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/25 transition-all text-center transform hover:-translate-y-0.5"
          >
            로그인하여 후기 보기
          </Link>
          <Link
            href="/register"
            className="flex-1 py-4 px-6 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl transition-all text-center"
          >
            빠른 회원가입
          </Link>
        </div>
      </div>
    </div>
  );
}
