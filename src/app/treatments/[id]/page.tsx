import React from 'react';
import TreatmentLayout from '@/components/TreatmentLayout';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import { getPostByPartialTitle } from '@/lib/api';

const TREATMENT_META_MAP: Record<
  string,
  { description: string; faqs: { question: string; answer: string }[] }
> = {
  '12121': {
    description:
      '강남역 화이트스타일치과의원 임플란트는 3D CT 정밀 진단과 3단계 통증 완화 마취 시스템을 바탕으로, 치의학박사 김준헌 병원장 · 이봉진 대표원장 · 박선혜 원장(치주과 전문의) 3인 원장단 협진을 통해 식립부터 최종 보철·정기 검진까지 안전하게 진행합니다.',
    faqs: [
      {
        question: '임플란트 시술 시 통증 완화는 어떻게 이루어지나요?',
        answer:
          '도포마취, 가글형 마취, 디지털 무통마취 3단계 시스템을 적용해 주사 시점의 불편함을 최소화합니다.',
      },
      {
        question: '임플란트 식립 후 내원 횟수와 관리 기간은 어느 정도인가요?',
        answer:
          '잇몸뼈 상태에 따라 보통 3~6회 내원하며, 최종 보철 완료 후 정기 검진으로 장기 유지관리를 돕습니다.',
      },
    ],
  },
  '12126': {
    description:
      '강남역 화이트스타일치과의원 치아교정은 1994년 개원(33년 전통) 이래 서울대졸, 단국대 외래교수, 교정학 박사 김준헌 병원장이 정밀 진단부터 장치 부착, 사후 유지관리까지 1:1로 직접 책임 진료합니다.',
    faqs: [
      {
        question: '교정 상담부터 완료까지 원장님이 직접 진료하시나요?',
        answer:
          '네, 교정학 박사 김준헌 병원장이 정밀 진단부터 장치 조절 및 유지관리까지 주치의 변경 없이 직접 진료합니다.',
      },
    ],
  },
  '12133': {
    description:
      '강남역 화이트스타일치과의원의 최소삭제 심미보철(제로쉘)은 자연치아 보존을 최우선 원칙으로 삼아, 정밀 교합 진단 후 치아 삭제량을 최소화한 맞춤형 세라믹 디자인과 체계적인 사후 보증 관리를 제공합니다.',
    faqs: [
      {
        question: '제로쉘 심미보철은 자연치아를 얼마나 보존하나요?',
        answer:
          '치아 배열과 두께에 따라 무삭제 또는 법랑질 내 0.1~0.2mm 최소삭제로 진행해 시림과 치아 손상을 최소화합니다.',
      },
    ],
  },
  '12134': {
    description:
      '강남역 화이트스타일치과의원의 최소삭제 심미보철(이지화이트)은 자연치아 보존을 최우선 원칙으로 삼아, 정밀 교합 진단 후 치아 삭제량을 최소화한 맞춤형 세라믹 디자인과 체계적인 사후 보증 관리를 제공합니다.',
    faqs: [
      {
        question: '이지화이트 시술 기간과 내원 횟수는 어떻게 되나요?',
        answer:
          '정밀 스캔 및 디자인 확인 후 맞춤형 세라믹 부착까지 보통 2~3회 내원(약 1~2주 내외)으로 완료됩니다.',
      },
    ],
  },
};

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
  const matchedMeta = TREATMENT_META_MAP[id];

  const treatmentData = {
    title: post.title.split(' ')[0] || '진료과목',
    description:
      matchedMeta?.description ||
      '강남역 11·12번 출구 도보 1분 화이트스타일치과의원은 1994년 개원(33년 전통) 이래 김준헌 병원장 · 이봉진 대표원장 · 박선혜 원장(치주과 전문의) 3인 원장단 협진과 3단계 통증 완화 마취 시스템을 바탕으로 안전하고 정확한 책임 진료를 제공합니다.',
    authorName: '김준헌 병원장 외 3인 원장단',
    authorTitle: '서울대졸 · 교정학 박사 · 33년 전통 협진',
    lastUpdated: new Date().toISOString().split('T')[0],
    faqs: matchedMeta?.faqs || [],
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
    </TreatmentLayout>
  );
}
