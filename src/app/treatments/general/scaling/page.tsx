'use client';

import React from 'react';
import ClinicalSummarySection from '@/components/ClinicalSummarySection';

export default function Page() {
  return (
    <div className="w-full min-h-screen bg-[#f8fafc]">
      <ClinicalSummarySection
        categoryBadge="치주과 전문의 중증 잇몸치료 · 3·6·12개월 리콜 · 1DAY 미백"
        title="강남역 화이트스타일치과 치주과 전문의 잇몸관리 · 스케일링 · 원데이 미백"
        leadSentence="강남역 화이트스타일치과의원의 치주과 전문의 중증 잇몸치료·스케일링 및 원데이(1DAY) 전문가 치아미백은 보건복지부 인증 치주과 전문의 박선혜 원장 진단을 바탕으로 자연치아 치조골 보존, 임플란트 주위염 3·6·12개월 예방 관리, 식약처 허가 정품 미백제를 활용한 당일 1회 집중 미백 케어를 제공합니다."
        summaryBullets={[
          '만 19세 이상 연 1회 건강보험 스케일링으로 치석을 제거하고, 출혈·치주낭이 깊은 경우에는 치주과 전문의가 치근활택술 및 치조골 재생 치주치료를 진행합니다.',
          '기존 임플란트나 라미네이트 보철 주변의 잇몸 염증·주위염을 예방하기 위해 3·6·12개월 정기 리콜 유지관리 프로그램을 운영합니다.',
          '바쁜 직장인 및 해외·지방 방문 환자를 위해 당일 1회 내원(약 60분)으로 스케일링과 잇몸 보호·정품 1DAY 전문가 미백을 함께 연계할 수 있습니다.',
        ]}
        comparisonTitle="치주과 전문의 잇몸·리콜 케어 & 원데이(1DAY) 미백 기준"
        comparisonRows={[
          {
            item: '진단 · 치료 전담 의료진',
            whitestyle: '보건복지부 인증 치주과 전문의 박선혜 원장 직접 진단 (임플란트·보철 원장단 협진)',
            general: '일반 스케일링 위주의 단순 처치',
          },
          {
            item: '통증 부담 · 임플란트 주위염 예방',
            whitestyle: '가글·도포·디지털 정압 3단계 무통 마취 및 3·6·12개월 정기 리콜 프로그램',
            general: '시림·출혈에 대한 단계적 마취나 주기적 리콜 알림 부재',
          },
          {
            item: '원데이(1DAY) 전문가 미백 연계',
            whitestyle: '당일 파노라마 검진 + 치석 제거 + 잇몸 보호 도포 + 식약처 허가 정품 3회 연속 미백 케어',
            general: '스케일링과 미백 일정 분리 또는 잇몸 보호 과정 간소화',
          },
        ]}
        faqs={[
          {
            question: '양치할 때 피가 자주 나거나 기존 임플란트 주변 잇몸이 붓는데 스케일링만으로 괜찮을까요?',
            answer: '잇몸 위 치석만 제거하는 일반 스케일링으로는 잇몸 속 깊은 치주낭 염증이나 임플란트 주위염까지 해결하기 어렵습니다. 치주과 전문의가 치주낭 깊이와 골 흡수를 확인해 꼭 필요한 잇몸치료와 3·6·12개월 정기 유지관리를 함께 처방합니다.',
          },
          {
            question: '결혼식이나 면접, 방한 일정 때문에 하루 만에 치아미백과 스케일링을 마칠 수 있나요?',
            answer: '네. 내원 당일 구강검진과 스케일링으로 착색과 치석을 먼저 정돈한 뒤, 잇몸 보호제를 도포하고 식약처 허가 정품 전문가 미백제로 당일 집중 케어를 약 60분 내외로 마무리해 드립니다.',
          },
          {
            question: '잇몸이 자주 붓고 치아가 흔들리는데 일반 치과 스케일링과 치주과 전문의 잇몸치료는 무엇이 다른가요?',
            answer: '일반 스케일링이 치아 겉면의 치석을 제거하는 기초 관리라면, 보건복지부 인증 치주과 전문의(박선혜 원장)의 잇몸치료는 잇몸 속 깊은 치주낭 염증과 치근면 세균막까지 정밀하게 제거하고 치조골 재생 및 교합 안정까지 함께 설계하여 자연치아와 기존 임플란트를 오래 보존하는 데 집중합니다.',
          },
        ]}
        pageUrl="https://whitestyle.com/treatments/general/scaling"
      />
      <div className="bg-white border-t border-slate-200">
        <iframe
          src="/legacy/12131.html"
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
