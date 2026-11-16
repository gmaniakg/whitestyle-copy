'use client';

import React from 'react';
import ClinicalSummarySection from '@/components/ClinicalSummarySection';

export default function Page() {
  return (
    <div className="w-full min-h-screen bg-[#f8fafc]">
      <ClinicalSummarySection
        categoryBadge="맞춤 심미 라미네이트 · 이지화이트"
        title="강남역 화이트스타일치과 이지화이트 (EasyWhite) 심미보철"
        leadSentence="강남역 화이트스타일치과의원의 최소삭제 심미보철은 자연치아 보존을 최우선 원칙으로 삼아, 정밀 교합 진단 후 치아 삭제량을 최소화한 맞춤형 세라믹 디자인과 체계적인 사후 보증 관리를 제공합니다."
        summaryBullets={[
          '변색·치아 사이 틈·왜소치를 자연치아 보존 중심의 최소삭제 세라믹으로 균형 있게 개선.',
          '김준헌 병원장 · 이봉진 대표원장 · 박선혜 원장 3인 원장단 협진을 통한 교합 안정성 우선 설계.',
          '시술 전 3단계 통증 완화 마취 시스템 적용으로 편안한 시술 및 정기 사후 검진 제공.',
        ]}
        comparisonTitle="이지화이트(EasyWhite) 진료 안내 비교"
        comparisonRows={[
          {
            item: '진단 원칙',
            whitestyle: '정밀 교합 분석 후 최소삭제 세라믹 두께와 쉐이드(색상) 1:1 맞춤 설계',
            general: '획일적 밝기·형태 위주 제작',
          },
          {
            item: '마취 및 편의성',
            whitestyle: '도포 · 가글 · 디지털 무통 3단계 마취 시스템 및 일본어 전담 통역 지원',
            general: '일반 국소 마취 위주',
          },
          {
            item: '내원 횟수',
            whitestyle: '정밀 진단부터 최종 부착까지 평균 2~3회 내원 완료',
            general: '개인·기관별 내원 일정 상이',
          },
        ]}
        faqs={[
          {
            question: '이지화이트 시술 후 시간이 지나면 색이 변하나요?',
            answer: '표면 활택도가 높고 착색 저항성이 우수한 세라믹 소재를 사용하여 커피나 음식물에 의한 변색 걱정이 적으며, 정기 스케일링 및 검진을 통해 초기 광택을 오래 유지할 수 있습니다.',
          },
          {
            question: '시술 전 치아 배열이나 교합도 함께 확인해 주나요?',
            answer: '네, 교정학 박사 김준헌 병원장 · 이봉진 대표원장 · 박선혜 원장 3인 원장단 협진으로 단순 색상 개선뿐 아니라 아래·위 치아 교합 간섭 여부까지 정밀하게 점검한 뒤 진행합니다.',
          },
        ]}
        pageUrl="https://whitestyle.com/treatments/aesthetic/easy-white"
      />
      <div className="bg-white border-t border-slate-200">
        <iframe
          src="/legacy/12134.html"
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
