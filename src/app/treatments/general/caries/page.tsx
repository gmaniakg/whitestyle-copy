'use client';

import React from 'react';
import ClinicalSummarySection from '@/components/ClinicalSummarySection';

export default function Page() {
  return (
    <div className="w-full min-h-screen bg-ws-mist">
      <ClinicalSummarySection
        categoryBadge="충치치료 · 레진 · 인레이 · 지르코니아"
        title="강남역 화이트스타일치과 충치치료 · 진행 단계별 맞춤 재료"
        leadSentence="강남역 화이트스타일치과의원의 충치치료는 법랑질·상아질·치수염·치수 괴사 4단계 진행 정도를 정밀 검진으로 먼저 구분한 뒤, 레진·글라스아이오노머(건강보험)·골드·지르코니아 중 치아 위치와 씹는 힘에 맞는 재료로 충치 부위만 최소한으로 제거해 기능과 형태를 회복합니다."
        summaryBullets={[
          '충치가 법랑질·상아질에 머문 초기 단계에서는 치아색 레진이나 건강보험이 적용되는 글라스아이오노머로 작게 치료합니다.',
          '충치 범위가 넓거나 씹는 힘이 큰 어금니는 골드 또는 지르코니아로 강도와 심미성을 함께 확보합니다.',
          '신경까지 염증이 진행된 경우에는 충치치료와 함께 신경치료를 연계해 치아를 뽑지 않고 보존합니다.',
        ]}
        comparisonTitle="충치 진행 단계별 치료 기준"
        comparisonRows={[
          { item: '초기(법랑질·상아질)', whitestyle: '레진 또는 글라스아이오노머(건강보험)로 최소 범위 치료', general: '범위 확인 없이 일괄 재료 권유 사례' },
          { item: '넓은 충치 · 어금니', whitestyle: '골드 또는 지르코니아로 씹는 힘과 심미성 동시 고려', general: '재료별 장단점 설명 부족' },
          { item: '치수염 · 치수 괴사', whitestyle: '신경치료 연계 후 크라운으로 보존', general: '조기 발치 권유 사례' },
        ]}
        faqs={[
          {
            question: '찬물에 이가 시린데 충치인지, 바로 치료해야 하나요?',
            answer: '시린 증상은 초기 충치나 잇몸 퇴축 등 원인이 다양합니다. 정밀 검진으로 충치 깊이를 먼저 확인하고, 법랑질·상아질 단계라면 작은 레진 치료로 마무리되는 경우가 많아 일찍 확인하실수록 치료 범위가 작아집니다.',
          },
          {
            question: '충치치료 후 음식은 언제부터 먹어도 되나요?',
            answer: '치료 후 약 2시간이 지난 뒤 식사하시는 것이 좋으며, 당분간 딱딱하거나 질긴 음식과 치료 부위에 강한 자극을 주는 행동은 피해 주세요.',
          },
        ]}
        pageUrl="https://whitestyle.com/treatments/general/caries"
      />
      <div className="bg-white border-t border-slate-200">
        <iframe
          src="/legacy/12129.html"
          title="강남역 화이트스타일치과 충치치료 · 진행 단계별 맞춤 재료 상세 안내"
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
