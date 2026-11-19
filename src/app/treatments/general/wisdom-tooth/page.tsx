'use client';

import React from 'react';
import ClinicalSummarySection from '@/components/ClinicalSummarySection';

export default function Page() {
  return (
    <div className="w-full min-h-screen bg-ws-mist">
      <ClinicalSummarySection
        categoryBadge="사랑니 발치 · 매복 사랑니 · CT 정밀 진단"
        title="강남역 화이트스타일치과 매복 사랑니 발치 · CT 정밀 진단"
        leadSentence="강남역 화이트스타일치과의원의 사랑니 발치는 치과 전용 CT 3차원 영상으로 매복 방향과 신경관 거리를 먼저 확인한 뒤, 충분한 사전 설명 → 마취 후 절개 → 염증 조직 제거·지혈 → 봉합·소독 4단계로 진행하며, 부분 매복으로 앞 치아 손상·물혹 위험이 있는 경우 발치를 권해 드립니다."
        summaryBullets={[
          '부분 매복 사랑니를 미루면 앞 어금니(제2대구치) 뿌리 흡수와 충치, 턱뼈 안 물혹이 생길 수 있어 CT로 위험도를 먼저 확인합니다.',
          '매복 사랑니는 개인의 위치에 따라 잇몸 절개·치아 분할이 필요할 수 있어 진행 과정을 발치 전에 충분히 설명드립니다.',
          '발치 후 통증·붓기·출혈 대처법과 주의사항을 안내하고, 출혈이나 통증이 계속되면 바로 내원하실 수 있도록 돕습니다.',
        ]}
        comparisonTitle="사랑니 발치 진단 · 진행 기준"
        comparisonRows={[
          { item: '발치 전 진단', whitestyle: '치과 전용 CT 3차원 영상으로 매복 방향·신경관 거리 확인', general: '2D 파노라마만으로 판단' },
          { item: '진행 과정', whitestyle: '사전 설명 → 마취·절개 → 염증 제거·지혈 → 봉합·소독 4단계', general: '과정 설명 없이 당일 발치 진행 사례' },
          { item: '발치 후 관리', whitestyle: '얼음 찜질·출혈 대처 안내, 이상 시 즉시 내원', general: '주의사항 안내 간소화' },
        ]}
        faqs={[
          {
            question: '사랑니는 아프지 않아도 꼭 뽑아야 하나요?',
            answer: '모든 사랑니를 뽑을 필요는 없습니다. 다만 부분 매복된 사랑니는 감염·충치·앞 치아 손상과 턱뼈 안 물혹을 일으킬 수 있어, CT로 위험 신호가 보이면 증상이 없더라도 발치를 권해 드립니다.',
          },
          {
            question: '누워 있는 매복 사랑니도 발치할 수 있나요?',
            answer: '네. 매복 사랑니는 잇몸 절개, 치아 분할, 뼈 일부 삭제가 필요할 수 있어 CT로 신경관과의 거리를 먼저 확인한 뒤 개인의 위치에 맞게 진행합니다.',
          },
          {
            question: '사랑니 발치 후 얼굴이 붓고 피가 나면 어떻게 하나요?',
            answer: '입에 고인 피나 침은 뱉지 말고 삼키시고, 붓기와 열감에는 얼음 찜질이 도움이 됩니다. 출혈이 계속되거나 통증이 심하면 바로 내원해 주세요.',
          },
        ]}
        pageUrl="https://whitestyle.com/treatments/general/wisdom-tooth"
      />
      <div className="bg-white border-t border-slate-200">
        <iframe
          src="/legacy/12132.html"
          title="강남역 화이트스타일치과 매복 사랑니 발치 · CT 정밀 진단 상세 안내"
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
