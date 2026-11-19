'use client';

import React from 'react';
import ClinicalSummarySection from '@/components/ClinicalSummarySection';

export default function Page() {
  return (
    <div className="w-full min-h-screen bg-ws-mist">
      <ClinicalSummarySection
        categoryBadge="신경치료 · 재신경치료 · 자연치아 보존"
        title="강남역 화이트스타일치과 신경치료 · 재신경치료 안내"
        leadSentence="강남역 화이트스타일치과의원의 신경치료와 재신경치료는 치과 전용 CT 3차원 영상과 특수 현미경 확대 진료로 근관 구조와 미세 균열을 확인한 뒤, 이봉진 대표원장 · 박선혜 원장(보건복지부 인증 치주과 전문의) · 김준헌 병원장 3인 원장단이 염증 신경 제거부터 근관 충전·크라운 수복까지 4단계로 자연치아를 보존합니다."
        summaryBullets={[
          '감염된 신경 조직을 제거하고 근관을 깨끗이 세척한 뒤 생체친화성 재료로 채워 치아를 뽑지 않고 살립니다.',
          '이미 신경치료를 받았는데 통증·염증이 남은 치아는 기존 충전재를 완전히 제거하고 다시 치료하는 재신경치료를 우선 시행합니다.',
          '재신경치료가 어려운 경우 치근단 절제술·치아 재식술을 검토하고, 발치는 모든 보존 방법을 확인한 뒤 마지막에 고려합니다.',
        ]}
        comparisonTitle="신경치료 · 재신경치료 진행 기준"
        comparisonRows={[
          { item: '근관 확인 방식', whitestyle: '치과 전용 CT 3차원 영상 + 특수 현미경 확대 진료', general: '2D 엑스레이 위주 확인' },
          { item: '신경치료 실패 시', whitestyle: '재신경치료 우선 → 치근단 절제술·치아 재식술 → 최종 단계 발치', general: '재치료 없이 발치·임플란트 권유 사례' },
          { item: '치료 후 수복', whitestyle: '크라운 수복 + 정기 관리 프로그램', general: '수복 후 정기 점검 안내 부족' },
        ]}
        faqs={[
          {
            question: '다른 치과에서 신경치료를 받았는데 계속 아파요. 재신경치료가 가능한가요?',
            answer: '가능한 경우가 많습니다. 기존 충전재와 남은 감염 조직을 완전히 제거한 뒤 근관을 다시 세척·충전하는 재신경치료를 먼저 시행하고, 뿌리 끝 염증이 남으면 치근단 절제술이나 치아 재식술을 검토해 자연치아를 최대한 지킵니다.',
          },
          {
            question: '신경치료 중 통증이 사라졌는데 치료를 그만해도 되나요?',
            answer: '통증이 사라져도 근관 내부 소독과 충전이 끝나지 않았다면 염증이 다시 악화될 수 있습니다. 마지막 충전과 크라운 수복 단계까지 마무리하셔야 치아를 오래 사용하실 수 있습니다.',
          },
          {
            question: '신경치료 마취는 얼마나 지나야 풀리나요?',
            answer: '보통 2~5시간 뒤 마취가 풀리며 개인에 따라 일시적인 통증이 있을 수 있습니다. 치료 기간에는 해당 치아로 단단한 음식을 씹지 않도록 해 주세요.',
          },
        ]}
        pageUrl="https://whitestyle.com/treatments/general/endo"
      />
      <div className="bg-white border-t border-slate-200">
        <iframe
          src="/legacy/12130.html"
          title="강남역 화이트스타일치과 신경치료 · 재신경치료 안내 상세 안내"
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
