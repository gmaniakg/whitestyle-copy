import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { FadeIn, FadeInStaggerContainer, FadeInStaggerItem } from '@/components/animations/FadeIn';
import { RevealText } from '@/components/animations/RevealText';
import { getPostsByType } from '@/lib/api';

export const metadata: Metadata = {
  title: '진료 과목 안내 · 임플란트·치아교정·최소삭제 심미보철',
  description:
    '강남역 화이트스타일치과의원 3인 원장단 분과 협진 진료 과목 안내. 3D CT 임플란트·뼈이식·무치악·재수술, 1:1 치아교정·재교정, 무삭제 제로쉘·최소삭제 심미보철, 치주·보존치료.',
  alternates: { canonical: 'https://whitestyle.com/treatments' },
  openGraph: {
    title: '진료 과목 안내 | 화이트스타일치과의원',
    description:
      '1994년 개원 33년 전통 강남역 화이트스타일치과의원 임플란트, 치아교정, 최소삭제 라미네이트, 일반·치주진료 안내.',
    url: 'https://whitestyle.com/treatments',
    type: 'website',
    locale: 'ko_KR',
  },
};

const SEMANTIC_TREATMENT_HREF: Record<string, string> = {
  '12121': '/treatments/implant',
  '12122': '/treatments/implant/bone-graft',
  '12123': '/treatments/implant/edentulous',
  '12125': '/treatments/implant/insurance',
  '12126': '/treatments/orthodontics',
  '12127': '/treatments/orthodontics/types',
  '12128': '/treatments/general',
  '12129': '/treatments/general/caries',
  '12130': '/treatments/general/endo',
  '12131': '/treatments/general/scaling',
  '12132': '/treatments/general/wisdom-tooth',
  '12133': '/treatments/aesthetic/zeroshell',
  '12134': '/treatments/aesthetic/easy-white',
  '16880': '/treatments/implant',
};

export default async function TreatmentsPage() {
  const posts = getPostsByType('static_page').filter(p => {
    // 병원소개 메뉴 제외
    const isAbout = p.url.includes('12117') || p.url.includes('12118') || p.url.includes('12119') || p.url.includes('12120') || p.url.includes('12140') || p.url.includes('17875');
    return !isAbout;
  });

  return (
    <div
      className="py-24 px-4 sm:px-8 lg:px-16 xl:px-24 2xl:px-32 w-full mx-auto min-h-[100dvh]"
      style={{ wordBreak: 'keep-all', overflowWrap: 'break-word', lineHeight: 1.95 }}
    >
      <FadeIn direction="down" className="flex flex-col items-center mb-20 text-center">
        <span className="rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.15em] font-bold bg-blue-50 text-blue-700 mb-6 border border-blue-100">
          1994년 개원 33년 전통 · 3인 원장단 협진
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-5">
          <RevealText text="강남역 화이트스타일치과 진료 과목" as="span" />
        </h1>
        <p className="text-slate-600 max-w-3xl text-base sm:text-lg leading-[1.95]">
          강남역 11·12번 출구 도보 1분 거리의 화이트스타일치과의원은 1994년 개원(33년 전통) 이래 서울대졸 · 단국대 외래교수 · 교정학 박사 김준헌 병원장, 이봉진 대표원장, 박선혜 원장(보건복지부 인증 치주과 전문의) 3인 원장단 협진과 3단계 통증 완화 마취 시스템을 바탕으로 치아교정·최소삭제 심미보철·임플란트를 책임 진료합니다.
        </p>
      </FadeIn>

      <FadeInStaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" staggerDelay={0.15}>
        {posts.map((post, idx) => {
          const idMatch = post.url.match(/mir_code=(\d+)/);
          const id = idMatch ? idMatch[1] : '';
          if (!id) return null;
          
          const targetHref = SEMANTIC_TREATMENT_HREF[id] || '/treatments';
          
          return (
            <FadeInStaggerItem key={idx} direction={idx % 3 === 0 ? "left" : idx % 3 === 1 ? "up" : "right"}>
              <Link href={targetHref} className="group relative block p-8 bg-white rounded-[2rem] hover:bg-blue-600 transition-all duration-500 shadow-md hover:shadow-2xl border border-slate-100 overflow-hidden transform hover:-translate-y-2">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-50 to-transparent rounded-full -mr-10 -mt-10 group-hover:from-white/20 transition-colors duration-500"></div>
                
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-8 group-hover:bg-white/20 group-hover:text-white transition-colors duration-500 shadow-sm">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-slate-800 mb-4 group-hover:text-white transition-colors duration-500">
                    {post.title.split(' 화이트스타일')[0]}
                  </h2>
                  
                  <div className="mt-8 flex items-center justify-between">
                    <span className="text-sm font-bold text-blue-600 group-hover:text-blue-100 transition-colors duration-500">
                      진료 기준·기간·과정 확인하기
                    </span>
                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-white/20 group-hover:text-white text-slate-400 transition-all duration-500 group-hover:translate-x-2">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </FadeInStaggerItem>
          );
        })}
      </FadeInStaggerContainer>
    </div>
  );
}
