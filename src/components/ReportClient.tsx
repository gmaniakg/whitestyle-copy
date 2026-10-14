'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import MarkdownRenderer from './MarkdownRenderer';
import InstagramModal from './InstagramModal';

interface ReportPost {
  id: string;
  title: string;
  content: string;
  imgSrc: string | null;
  scraped_at: string;
}

export default function ReportClient({ reports }: { reports: ReportPost[] }) {
  const [selectedReport, setSelectedReport] = useState<ReportPost | null>(null);
  const [isInstaModalOpen, setIsInstaModalOpen] = useState(false);

  return (
    <div className="w-full">
      <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden">
        <ul className="divide-y divide-slate-100">
          {reports.map((report, idx) => (
            <li key={idx}>
              <div
                onClick={() => setSelectedReport(report)}
                className="group block px-6 sm:px-10 py-8 hover:bg-blue-50/50 cursor-pointer transition-colors duration-500"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 pr-4">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-md border border-blue-100">
                        고객감동
                      </span>
                      <span className="text-xs text-slate-400 font-medium tracking-wide">
                        {report.scraped_at}
                      </span>
                    </div>
                    <h2 className="text-xl sm:text-2xl md:text-[24px] font-bold text-slate-800 group-hover:text-[#0056b3] transition-colors line-clamp-1">
                      {report.title.replace(/_/g, ' ')}
                    </h2>
                  </div>
                  
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-slate-50 flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:bg-[#0056b3] group-hover:text-white group-hover:translate-x-2 shrink-0 shadow-sm">
                    <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        
        {reports.length === 0 && (
          <div className="py-20 text-center text-slate-400">
            등록된 게시글이 없습니다.
          </div>
        )}
      </div>

      {/* Glassmorphic interactive Modal */}
      <AnimatePresence>
        {selectedReport && (
          <>
            {/* Dark Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedReport(null)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center"
            />

            {/* Modal Body */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                className="w-full max-w-3xl max-h-[85vh] bg-white rounded-[2rem] shadow-2xl border border-slate-100 flex flex-col pointer-events-auto overflow-hidden"
              >
                {/* Modal Header */}
                <div className="p-6 sm:p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-md border border-blue-100">
                      고객감동 후기
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      {selectedReport.scraped_at}
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedReport(null)}
                    className="w-10 h-10 rounded-full bg-white hover:bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-all border border-slate-200/60 shadow-sm"
                    aria-label="닫기"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Modal Body Scroll */}
                <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
                  {/* Title */}
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                    {selectedReport.title.replace(/_/g, ' ')}
                  </h3>

                  {/* Main Markdown Content Area */}
                  <div className="bg-slate-50/50 rounded-2xl p-6 border border-slate-100">
                    <MarkdownRenderer content={selectedReport.content} />
                  </div>

                  {/* Premium Instagram Promotion Callout Card */}
                  <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 border border-indigo-100 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6 shadow-sm">
                    {/* Instagram Mock Badge */}
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center shadow-lg shrink-0 transform hover:scale-105 transition-transform duration-300">
                      <svg className="w-9 h-9 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                      </svg>
                    </div>

                    {/* Promo Info */}
                    <div className="flex-1 text-center md:text-left space-y-1.5">
                      <div className="flex items-center justify-center md:justify-start gap-2">
                        <h4 className="font-bold text-slate-800 text-lg">화이트스타일 공식 인스타그램</h4>
                        <span className="text-xs bg-indigo-100 text-indigo-700 font-bold px-2.5 py-0.5 rounded-full">
                          @whitestyledentalclinic
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        일본·해외 환자분들이 직접 전해주신 다양한 간식 선물 인증샷과 밝은 일상 이야기, 그리고 치료 비하인드 컷이 공식 채널에 상시 기록됩니다.
                      </p>
                    </div>

                    {/* Follow Action */}
                    <button
                      onClick={() => setIsInstaModalOpen(true)}
                      className="w-full md:w-auto px-6 py-3.5 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 hover:opacity-95 text-white font-extrabold text-sm rounded-xl text-center shadow-md transition-opacity shrink-0"
                    >
                      인스타 공식계정 구경하기 ➔
                    </button>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="p-6 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50/50">
                  <span className="text-xs font-bold text-slate-400">화이트스타일치과 의료법 제56조 준수 안심 후기</span>
                  <Link
                    href="/consult"
                    onClick={() => setSelectedReport(null)}
                    className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl text-center transition-all shadow-md shadow-blue-500/10"
                  >
                    일대일 맞춤 치료 상담받기 ➔
                  </Link>
                </div>

              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      <InstagramModal 
        isOpen={isInstaModalOpen} 
        onClose={() => setIsInstaModalOpen(false)} 
      />
    </div>
  );
}
