'use client';

import React from 'react';
import ClinicalSummarySection from '@/components/ClinicalSummarySection';

export default function Page() {
  return (
    <div className="w-full min-h-screen bg-[#f8fafc]">
      <ClinicalSummarySection
        categoryBadge="만 65세 건강보험 임플란트 · 심평원 비급여 기준"
        title="강남역 화이트스타일치과 만 65세 건강보험(30%) & 심평원 기준 정품 임플란트"
        leadSentence="강남역 화이트스타일치과의원의 만 65세 이상 건강보험 임플란트(평생 2개, 본인부담률 30%) 및 심평원 비급여 공개 임플란트는 건강보험심사평가원 비급여 진료비 고지 기준을 엄격히 준수하며, 정품 픽스처·맞춤형 지대주 보증과 치주과 전문의 협진 3·6·12개월 사후 관리를 투명하게 제공합니다."
        summaryBullets={[
          '만 65세 이상 건강보험 가입자는 위·아래 구분 없이 부분 무치악 상태라면 평생 2개까지 본인부담률 30%로 정품 임플란트 보험 적용이 가능합니다.',
          '비급여 진료 항목 역시 건강보험심사평가원(신평원) 고지 기준과 원내 비용표(/price)를 투명하게 준수하며, 추가 비용 없는 명확한 포함 범위를 안내합니다.',
          '정품 픽스처 보증과 3단계 무통 마취, 치주과 전문의(박선혜 원장) 3·6·12개월 정기검진 리콜로 비용과 진료 퀄리티를 모두 지킵니다.',
        ]}
        comparisonTitle="건강보험 임플란트(만 65세 이상) & 화이트스타일 정품 기준 비교"
        comparisonRows={[
          {
            item: '적용 대상 · 본인부담률',
            whitestyle: '만 65세 이상 건강보험 가입자(부분 무치악) 평생 2개 본인부담 30% 원내 전산 등록 지원',
            general: '완전 무치악(치아 1개도 없는 경우)은 보험 틀니 대상 여부 별도 확인 필요',
          },
          {
            item: '비급여 · 재료 투명성',
            whitestyle: '신평원(HIRA) 비급여 기준 준수 · 정품 픽스처 및 맞춤 지대주 기준 사전 상세 안내',
            general: '저가 광고 후 뼈이식·지대주·사후 보증 별도 추가 청구 사례 유의 필요',
          },
          {
            item: '치주 · 교합 협진 사후관리',
            whitestyle: '3인 원장단 협진 식립 및 완료 후 3·6·12개월 임플란트 주위염 예방 정기 리콜',
            general: '장착 후 정기 리콜 부재 시 보철 나사 풀림·염증 위험 증가',
          },
        ]}
        faqs={[
          {
            question: '만 65세 이상 건강보험 임플란트는 뼈이식이나 보철 재료(PFM/지르코니아)도 동일하게 적용되나요?',
            answer: '건강보험 임플란트는 평생 2개까지 PFM 보철 기준으로 본인부담률 30%가 적용되며, 치조골 소실로 뼈이식이 필요한 경우 비급여 항목 발생 여부를 3D CT 진단 직후 사전 상세히 안내해 드립니다.',
          },
          {
            question: '치아가 하나도 없는 무치악 상태에서도 건강보험 임플란트 혜택을 받을 수 있나요?',
            answer: '치아가 한 개도 남지 않은 완전 무치악의 경우에는 건강보험 틀니 제도와 전악 임플란트 재건 방식을 3D CT로 비교한 뒤 환자분 구강 상태에 가장 합리적인 계획을 투명하게 제시해 드립니다.',
          },
        ]}
        pageUrl="https://whitestyle.com/treatments/implant/insurance"
      />
      <div className="bg-white border-t border-slate-200">
        <iframe
          src="/legacy/12125.html"
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
