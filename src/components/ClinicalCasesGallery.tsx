'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FadeIn, FadeInStaggerContainer, FadeInStaggerItem } from './animations/FadeIn';
import { RevealText } from './animations/RevealText';
import clinicalCases from '@/data/clinical-cases.json';
import { AnimatePresence, motion } from 'framer-motion';
import MedicalAuthGate from './MedicalAuthGate';

export default function ClinicalCasesGallery() {
  const [selectedCase, setSelectedCase] = useState<typeof clinicalCases[0] | null>(null);

  return (
    <section className="py-20 w-full mt-10">
      <FadeIn direction="down" className="text-center mb-16">
        <span className="inline-block py-1.5 px-5 rounded-full bg-blue-50 text-blue-700 text-xs font-extrabold tracking-[0.25em] uppercase mb-5 border border-blue-100">
          WhiteStyle Clinical Excellence
        </span>
        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
          <RevealText text="프리미엄 임상 케이스 갤러리" as="span" />
        </h2>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
          수만 건의 성공적인 수술 데이터를 바탕으로 한 화이트스타일치과의 고난도 임플란트 및 GBR 뼈이식 실제 임상 사례입니다.
        </p>
      </FadeIn>

      <FadeInStaggerContainer className="flex flex-col gap-12" staggerDelay={0.1}>
        {clinicalCases.map((clinicalCase, idx) => (
          <FadeInStaggerItem key={idx} direction="up">
            <div 
              id={`case-${clinicalCase.slug}`}
              className="group relative bg-white rounded-[2rem] overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 border border-slate-100 flex flex-col md:flex-row scroll-mt-32"
            >
              {/* Left Side: Images Grid */}
              <div className="w-full md:w-[45%] p-6 bg-slate-50 border-r border-slate-100">
                <div 
                  className="grid grid-cols-2 gap-2 cursor-pointer h-full"
                  onClick={() => setSelectedCase(clinicalCase)}
                >
                  {clinicalCase.images.slice(0, 4).map((img, imgIdx) => (
                    <div key={imgIdx} className="aspect-square relative rounded-xl overflow-hidden shadow-sm">
                      <img 
                        src={`/images/clinical-cases/${clinicalCase.slug}/${img}`}
                        alt={clinicalCase.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      {imgIdx === 3 && clinicalCase.images.length > 4 && (
                        <div className="absolute inset-0 bg-slate-900/60 flex items-center justify-center text-white font-bold text-xl backdrop-blur-sm">
                          +{clinicalCase.images.length - 4}
                        </div>
                      )}
                    </div>
                  ))}
                  {clinicalCase.images.length === 0 && (
                    <div className="aspect-video w-full bg-slate-200 flex items-center justify-center text-slate-400 rounded-xl col-span-2">
                      No Image Available
                    </div>
                  )}
                </div>
              </div>

              {/* Right Side: Commentary */}
              <div className="w-full md:w-[55%] p-8 lg:p-10 flex flex-col justify-center">
                <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-6 pb-4 border-b border-slate-100">
                  {clinicalCase.title}
                </h3>
                
                <div className="space-y-6 flex-1">
                  <div>
                    <h4 className="text-sm font-bold text-pink-500 flex items-center gap-2 mb-2 uppercase tracking-widest">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                      증상 및 원인
                    </h4>
                    <p className="text-slate-600 leading-relaxed font-medium">
                      {(clinicalCase as any).commentary?.cause || "원인 정보가 준비중입니다."}
                    </p>
                  </div>
                  
                  <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 relative">
                    <div className="absolute -left-3 top-6 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-md">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <h4 className="text-sm font-bold text-blue-700 mb-2 uppercase tracking-widest pl-2">
                      대표 원장 해결책
                    </h4>
                    <p className="text-slate-700 leading-relaxed font-bold pl-2">
                      {(clinicalCase as any).commentary?.solution || "해결책 정보가 준비중입니다."}
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <span className="text-sm text-slate-400 font-medium hidden md:block">실제 수술 전/후 경과 사진</span>
                  <div className="flex gap-3 w-full sm:w-auto">
                    <Link 
                      href="/consult"
                      className="group relative flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-extrabold text-sm rounded-xl transition-all shadow-[0_0_15px_rgba(239,68,68,0.4)] hover:shadow-[0_0_25px_rgba(239,68,68,0.6)] transform hover:-translate-y-0.5 overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                      <span className="relative z-10 flex items-center gap-1.5">
                        <span className="animate-pulse w-2 h-2 rounded-full bg-yellow-300"></span>
                        나도 이렇게 될 수 있을까? 1:1 상담하기
                      </span>
                    </Link>
                    <button 
                      className="flex-1 sm:flex-none px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm"
                      onClick={() => setSelectedCase(clinicalCase)}
                    >
                      사진 원본 크게 보기
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </FadeInStaggerItem>
        ))}
      </FadeInStaggerContainer>

      {/* Modal for viewing images */}
      <AnimatePresence>
        {selectedCase && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-md"
            onClick={() => setSelectedCase(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-[2rem] p-6 max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedCase(null)}
                className="absolute top-6 right-6 w-12 h-12 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center text-slate-600 transition-colors z-10"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="mb-8 pr-16">
                <h3 className="text-3xl font-extrabold text-slate-900 mb-2">{selectedCase.title}</h3>
                <p className="text-slate-500">의료법 제56조에 의거하여 본원 회원에게만 공개되는 실제 임상 사진입니다.</p>
              </div>

              <MedicalAuthGate categoryName="임상 사례 상세 원본">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedCase.images.map((img, idx) => (
                    <div key={idx} className="rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 aspect-[4/3] relative">
                      <img 
                        src={`/images/clinical-cases/${selectedCase.slug}/${img}`}
                        alt={`${selectedCase.title} - ${idx + 1}`}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ))}
                </div>
              </MedicalAuthGate>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
