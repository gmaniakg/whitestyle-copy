'use client';

import React from 'react';
import ClinicalSummarySection from '@/components/ClinicalSummarySection';
import AestheticSiloNav from '@/components/AestheticSiloNav';

export default function Page() {
  return (
    <div className="w-full min-h-screen bg-[#f8fafc]">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 pt-6">
        <AestheticSiloNav activePath="/treatments/aesthetic/zeroshell" />
      </div>
      <ClinicalSummarySection
        categoryBadge="무삭제 · 최소삭제 심미보철 · 제로쉘"
        title="강남역 화이트스타일치과 제로쉘 (ZeroShell) 최소삭제 심미보철"
        leadSentence="강남역 화이트스타일치과의원의 최소삭제 심미보철은 자연치아 보존을 최우선 원칙으로 삼아, 정밀 교합 진단 후 치아 삭제량을 최소화한 맞춤형 세라믹 디자인과 체계적인 사후 보증 관리를 제공합니다."
        summaryBullets={[
          '치아 겉면(법랑질) 손상을 극소화하는 제로쉘 맞춤형 초박막 세라믹 디자인.',
          '김준헌 병원장 · 이봉진 대표원장 · 박선혜 원장 3인 원장단 협진으로 교합과 심미 균형을 동시에 진단.',
          '일본어 전담 통역 스태프 3명 상주, 해외 체류 환자를 위한 2~3회 집중 완성 일정 상담 지원.',
        ]}
        comparisonTitle="제로쉘(ZeroShell) 심미보철 비교 안내"
        comparisonRows={[
          {
            item: '치아 삭제량',
            whitestyle: '치아 상태에 따라 무삭제 또는 극소 최소삭제 우선 검토',
            general: '일반 라미네이트 기준 다량 삭제 가능성 존재',
          },
          {
            item: '시림 · 신경 부담',
            whitestyle: '법랑질 보존 원칙으로 술후 시림 부담 최소화',
            general: '상아질 노출 시 일시적 또는 지속적 시림 가능',
          },
          {
            item: '체류 및 내원 횟수',
            whitestyle: '정밀 스캔 · 디자인 · 최종 부착까지 보통 2~3회 내원',
            general: '다회 내원 및 임시치아 기간 장기화',
          },
        ]}
        faqs={[
          {
            question: '제로쉘 심미보철은 정말 치아를 전혀 깎지 않나요?',
            answer: '돌출 정도나 치아 배열이 무삭제에 적합한 경우 치아를 삭제하지 않고 진행하며, 튀어나온 각도 보정이 꼭 필요한 부위만 0.1~0.2mm 수준으로 최소 다듬어 자연치아 건강을 지킵니다.',
          },
          {
            question: '시술 기간은 얼마나 걸리나요?',
            answer: '정밀 진단 및 디지털 스캔 후 맞춤 세라믹 제작을 거쳐 최종 부착까지 통상 2~3회 내원(약 1~2주 내외)으로 완료됩니다.',
          },
          {
            question: '앞니 사이가 벌어졌거나 치아가 작은 왜소치인데 교정 대신 무삭제 제로쉘이 가능한가요?',
            answer: '치아가 선천적으로 작거나(왜소치) 미세한 틈이 있어 공간 여유가 있는 경우에는 치아를 깎지 않는 무삭제 제로쉘 방식으로 비율과 색상을 함께 개선할 수 있습니다. 다만 틈이 넓고 치아가 이미 큰 편이라면 3~6개월 부분교정과의 장단점을 3D 스캔 후 객관적으로 비교해 드립니다.',
          },
        ]}
        pageUrl="https://whitestyle.com/treatments/aesthetic/zeroshell"
      />
      <div className="bg-white border-t border-slate-200">
        <iframe
          src="/legacy/12133.html"
          className="w-full min-h-screen border-none"
          style={{ minHeight: '3000px' }}
          onLoad={(e) => {
            try {
              const iframe = e.target as HTMLIFrameElement;
              if (iframe.contentWindow) {
                iframe.style.height = iframe.contentWindow.document.body.scrollHeight + 'px';
              }
            } catch (err) {}
          }}
        />
      </div>
    </div>
  );
}
