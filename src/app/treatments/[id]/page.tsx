import React from 'react';
import TreatmentLayout from '@/components/TreatmentLayout';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import ClinicalCasesGallery from '@/components/ClinicalCasesGallery';
import { getPostByPartialTitle } from '@/lib/api';

export default async function TreatmentPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  
  // ID가 12121(임플란트) 등 메타데이터에 존재하는 번호물일 수 있으므로 이를 검색
  const postData = getPostByPartialTitle(id, 'static_page');
  
  if (!postData) {
    return (
      <div className="py-20 text-center text-slate-500">
        <h2>{id} 데이터를 찾을 수 없습니다.</h2>
      </div>
    );
  }

  const { post, content: mdContent } = postData;

  // SEO 및 GEO 최적화용 메타데이터 (가상의 구조체 대신 실제 데이터 주입)
  const treatmentData = {
    title: post.title.split(' ')[0] || "진료과목", // 원본 제목에서 핵심 키워드 추출
    description: "화이트스타일치과의 전문 진료 안내입니다.",
    authorName: "김준헌 대표원장",
    authorTitle: "치의학 박사 35년 임상 경력",
    lastUpdated: new Date().toISOString().split('T')[0],
    faqs: [] // 향후 AI 스킬(brunch-skills) 연동을 통해 FAQ 자동 생성 가능
  };

  return (
    <TreatmentLayout 
      title={treatmentData.title}
      description={treatmentData.description}
      authorName={treatmentData.authorName}
      authorTitle={treatmentData.authorTitle}
      lastUpdated={treatmentData.lastUpdated}
      faqs={treatmentData.faqs}
    >
      <div className="bg-white/50 p-8 rounded-3xl border border-slate-100 shadow-sm mb-12">
        <h2 className="text-2xl font-bold mb-6 text-slate-800">{post.title}</h2>
        {/* 실제 크롤링된 본문을 렌더링 (이미지 포함) */}
        <MarkdownRenderer content={mdContent} />
      </div>

      {/* 임플란트 관련 페이지에 임상 사례 갤러리 노출 */}
      {['12121', '12122', '12123', '12125'].includes(id) && (
        <ClinicalCasesGallery />
      )}
    </TreatmentLayout>
  );
}
