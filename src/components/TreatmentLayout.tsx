import React from 'react';
import { FadeIn, FadeInStaggerContainer, FadeInStaggerItem } from './animations/FadeIn';
import { RevealText } from './animations/RevealText';

// GEO 및 AEO 최적화를 위한 진료 안내 레이아웃 컴포넌트
interface FAQ {
  question: string;
  answer: string;
}

interface TreatmentLayoutProps {
  title: string;
  description: string; // 요약된 150단어 내외의 핵심 답변 (AI 인용 최적화)
  authorName: string;
  authorTitle: string;
  lastUpdated: string;
  faqs?: FAQ[];
  children: React.ReactNode;
}

export default function TreatmentLayout({
  title,
  description,
  authorName,
  authorTitle,
  lastUpdated,
  faqs = [],
  children,
}: TreatmentLayoutProps) {
  
  // 1. Article & Person Schema 생성 (AI 신뢰도/권위성 확보)
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "dateModified": lastUpdated,
    "author": {
      "@type": "Person",
      "name": authorName,
      "jobTitle": authorTitle,
    },
    "description": description
  };

  // 2. FAQPage Schema 생성 (AI 검색 엔진 직접 인용 유도)
  const faqSchema = faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  return (
    <article className="w-full px-4 sm:px-8 lg:px-16 xl:px-32 2xl:px-64 py-12 mx-auto">
      {/* JSON-LD Schema 주입 */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}

      {/* 프리미엄 히어로 섹션 */}
      <div className="relative w-full overflow-hidden rounded-[2.5rem] mb-12 shadow-2xl shadow-blue-500/10 bg-slate-900 border border-slate-800">
        {/* 다이내믹 그라데이션 배경 */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900/80 to-slate-900 z-0"></div>
        
        {/* 장식용 빛 반사 효과 (Glassmorphism & Glow) */}
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-400/20 via-transparent to-transparent z-0"></div>
        <div className="absolute -bottom-1/2 -left-1/4 w-full h-full bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent z-0 blur-3xl"></div>

        <FadeInStaggerContainer className="relative z-10 px-6 py-20 md:py-28 lg:px-16 flex flex-col items-center text-center" staggerDelay={0.2}>
          <FadeInStaggerItem direction="down">
            <span className="inline-block py-1.5 px-5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold tracking-[0.2em] uppercase mb-6 backdrop-blur-md shadow-lg">
              WhiteStyle Clinic
            </span>
          </FadeInStaggerItem>
          <FadeInStaggerItem direction="up" className="w-full">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-8 tracking-tight leading-tight drop-shadow-xl text-center flex justify-center">
              <RevealText text={title} as="span" />
            </h1>
          </FadeInStaggerItem>
          
          <FadeInStaggerItem direction="up">
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-sm text-blue-50 mt-2 bg-white/5 px-8 py-4 rounded-2xl backdrop-blur-md border border-white/10 shadow-inner">
              <div className="flex items-center font-medium">
                <span className="bg-blue-500 text-white px-2.5 py-1 rounded text-xs mr-3 font-bold shadow-md shadow-blue-500/30">Medical Review by</span>
                {authorName} {authorTitle && <span className="opacity-70 ml-1 font-normal">({authorTitle})</span>}
              </div>
              <div className="hidden sm:block opacity-30 text-blue-200">•</div>
              <div className="flex items-center font-medium opacity-90">
                <svg className="w-4 h-4 mr-2 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Last Updated: <time dateTime={lastUpdated} className="ml-1">{lastUpdated}</time>
              </div>
            </div>
          </FadeInStaggerItem>
        </FadeInStaggerContainer>
      </div>

      {/* GEO 최적화 답변 블록 (134~167 단어 권장) - AI가 그대로 긁어가기 좋은 형태 */}
      <FadeIn direction="up" delay={0.4}>
        <section className="bg-gray-50 p-6 rounded-lg mb-10 border-l-4 border-blue-500">
          <h2 className="text-xl font-semibold mb-3">빠른 핵심 답변 (TL;DR)</h2>
          <p className="text-gray-800 leading-relaxed">
            {description}
          </p>
        </section>
      </FadeIn>

      {/* 본문 영역: 짧은 문단과 리스트(Lists), 표(Tables)를 적극 활용할 것 */}
      <FadeIn direction="up" delay={0.6}>
        <div className="prose prose-lg max-w-none mb-16">
          {children}
        </div>
      </FadeIn>

      {/* FAQ 섹션: 자연어 질문(Q&A) 기반의 AEO 최적화 블록 */}
      {faqs.length > 0 && (
        <section className="mt-12 bg-white rounded-xl shadow-sm border p-8">
          <h2 className="text-2xl font-bold mb-6 border-b pb-4">자주 묻는 질문 (FAQ)</h2>
          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <div key={idx}>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Q. {faq.question}</h3>
                <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
