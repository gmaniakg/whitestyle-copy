import React from 'react';
import { getPostsByType, getPostContent } from '@/lib/api';
import MedicalAuthGate from '@/components/MedicalAuthGate';
import ReportClient from '@/components/ReportClient';

export default async function ReportListPage() {
  const rawReports = getPostsByType('board_report').sort((a, b) => {
    const idA = parseInt(a.local_path.split('/').pop()?.split('_')[0] || '0', 10);
    const idB = parseInt(b.local_path.split('/').pop()?.split('_')[0] || '0', 10);
    return idB - idA;
  });

  // Resolve content and assets on the server to pass pre-fetched data to client
  const reports = rawReports.map(report => {
    const idMatch = report.local_path.match(/\/(\d+)_/);
    const id = idMatch ? idMatch[1] : report.url.split('wr_id=')[1];
    const content = getPostContent(report.local_path) || '';
    
    const imgMatch = content.match(/!\[.*?\]\((.*?)\)/);
    const imgSrc = imgMatch ? imgMatch[1] : null;

    return {
      id,
      title: report.title,
      content,
      imgSrc,
      scraped_at: report.scraped_at ? report.scraped_at.split('T')[0] : '2026-06-11'
    };
  });

  return (
    <div className="py-24 px-4 sm:px-8 lg:px-16 xl:px-24 2xl:px-32 w-full mx-auto min-h-[100dvh]">
      {/* 헤더 섹션 */}
      <div className="flex flex-col items-center mb-16 text-center">
        <span className="rounded-full px-6 py-2.5 text-[18px] uppercase tracking-[0.2em] font-bold bg-blue-50 text-blue-600 mb-8 border border-blue-100 shadow-sm">
          WhiteStyle Stories
        </span>
        <h1 className="text-6xl md:text-[90px] font-black text-slate-900 tracking-tight mb-8 leading-tight">
          고객감동
        </h1>
        <p className="text-2xl md:text-[32px] text-slate-600 mt-4">환자분들이 직접 남겨주신 따뜻한 이야기입니다.</p>
      </div>

      {/* 의료법 제56조 회원 인증 게이트 적용 */}
      <MedicalAuthGate categoryName="고객감동 경험담">
        <ReportClient reports={reports} />
      </MedicalAuthGate>
    </div>
  );
}
