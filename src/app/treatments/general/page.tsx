'use client';

import React from 'react';
import ClinicalSummarySection from '@/components/ClinicalSummarySection';

export default function Page() {
  return (
    <div className="w-full min-h-screen bg-ws-mist">
      <ClinicalSummarySection
        categoryBadge="보존치료 · 자연치아 살리기 · 3인 원장단 협진"
        title="강남역 화이트스타일치과 보존치료 · 자연치아 살리기"
        leadSentence="강남역 화이트스타일치과의원의 보존치료는 1994년 개원(33년 전통) 이래 치과 전용 CT 3차원 영상과 특수 현미경 정밀 진료를 바탕으로, 이봉진 대표원장 · 박선혜 원장(보건복지부 인증 치주과 전문의) · 김준헌 병원장 3인 원장단이 발치보다 자연치아 보존을 먼저 검토하는 충치·신경·재신경치료를 1:1로 진행합니다."
        summaryBullets={[
          '충치 깊이와 신경 염증 정도를 치과 전용 CT와 정밀 검진으로 먼저 확인한 뒤, 꼭 필요한 범위만 치료하는 1:1 맞춤 계획을 세웁니다.',
          '신경치료 후에도 통증이 남는 치아는 바로 발치하지 않고 재신경치료를 우선 시행해 자연치아를 최대한 오래 지킵니다.',
          '치료 후에는 정기 관리 프로그램과 불소 도포·실란트·칫솔질 교육 등 예방 프로그램으로 재발을 줄입니다.',
        ]}
        comparisonTitle="자연치아 보존 중심 일반진료 기준"
        comparisonRows={[
          { item: '진단 방식', whitestyle: '치과 전용 CT 3차원 영상 + 원인 불명 통증은 특수 현미경 확대 진료', general: '육안·2D 엑스레이 위주 확인' },
          { item: '통증 지속 치아', whitestyle: '재신경치료 우선 → 치근단 절제술·치아 재식술 검토 → 최종 단계에서만 발치', general: '통증 지속 시 조기 발치 권유 사례' },
          { item: '치료 후 관리', whitestyle: '정기 관리 프로그램 + 불소 도포·실란트 예방 프로그램', general: '치료 완료 후 별도 예방 프로그램 부재' },
        ]}
        faqs={[
          {
            question: '다른 치과에서 이를 빼야 한다고 들었는데 살릴 방법이 있을까요?',
            answer: '치아 뿌리와 주변 뼈 상태에 따라 다르지만, 신경치료 후 재발한 염증은 재신경치료로 먼저 회복을 시도하고 어려운 경우 치근단 절제술이나 치아 재식술을 검토합니다. 발치는 이 과정을 모두 확인한 뒤 마지막으로 고려합니다.',
          },
          {
            question: '과잉진료가 걱정되는데 꼭 필요한 치료만 받을 수 있나요?',
            answer: '네. 정밀 검진 결과를 화면으로 함께 보며 지금 치료가 필요한 치아와 경과를 지켜봐도 되는 치아를 구분해 설명드리고, 예방 프로그램으로 추가 충치 발생을 줄이는 데 집중합니다.',
          },
        ]}
        pageUrl="https://whitestyle.com/treatments/general"
      />
      <div className="bg-white border-t border-slate-200">
        <iframe
          src="/legacy/12128.html"
          title="강남역 화이트스타일치과 보존치료 · 자연치아 살리기 상세 안내"
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
