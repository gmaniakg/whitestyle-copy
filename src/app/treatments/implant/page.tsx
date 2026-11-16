'use client';

import React from 'react';
import ClinicalSummarySection from '@/components/ClinicalSummarySection';

export default function Page() {
  return (
    <div className="w-full min-h-screen bg-[#f8fafc]">
      <ClinicalSummarySection
        categoryBadge="3인 원장단 협진 · 3단계 통증 완화"
        title="강남역 화이트스타일치과 3D 정밀 임플란트"
        leadSentence="강남역 화이트스타일치과의원 임플란트는 3D CT 정밀 진단과 3단계 통증 완화 마취 시스템을 바탕으로, 치의학박사 김준헌 병원장 · 이봉진 대표원장 · 박선혜 원장(치주과 전문의) 3인 원장단 협진을 통해 식립부터 최종 보철·정기 검진까지 안전하게 진행합니다."
        summaryBullets={[
          '교정·보철·치주과 전문의 3인 원장단 협진으로 잇몸뼈·교합·보철 수명을 입체적으로 설계하는 책임 임플란트.',
          '도포마취 · 가글마취 · 컴퓨터 무통마취 3단계 통증 완화 프로토콜로 치과 공포가 있는 분도 편안한 시술 환경.',
          '만 65세 이상 건강보험 적용 임플란트 및 고난도 뼈이식·상악동 거상술 정밀 시술과 사후 정기 검진 지원.',
        ]}
        comparisonTitle="임플란트 진료 프로토콜 비교 안내"
        comparisonRows={[
          {
            item: '집도 협진 체계',
            whitestyle: '김준헌 병원장 · 이봉진 대표원장 · 박선혜 원장(치주과 전문의) 3인 원장단 협진',
            general: '단일 술자 중심 진단 및 보철 완료',
          },
          {
            item: '통증 완화 시스템',
            whitestyle: '표면 도포마취 + 가글형 마취 + 디지털 무통 주사 3단계 마취 시스템 적용',
            general: '일반 국소 주사 마취 위주',
          },
          {
            item: '평균 내원 횟수',
            whitestyle: '잇몸뼈 상태에 따라 보통 3~6회 내원 (해외/지방 환자 단축 프로토콜 상담 가능)',
            general: '평균 5~8회 이상 내원',
          },
          {
            item: '진단 및 보증',
            whitestyle: '3D CT 정밀 골밀도 측정, 정품 픽스처 정밀 식립 및 체계적 정기 유지관리',
            general: '일반 파노라마 촬영 위주 진단 가능',
          },
        ]}
        faqs={[
          {
            question: '임플란트 수술 시 통증과 붓기는 어느 정도인가요?',
            answer: '화이트스타일치과는 3단계 통증 완화 마취 시스템을 기본 적용하여 마취와 식립 과정의 불편함을 크게 낮추었으며, 수술 후 붓기나 뻐근함은 대부분 2~3일 내에 점차 가라앉습니다.',
          },
          {
            question: '만 65세 이상 건강보험 임플란트 혜택도 받을 수 있나요?',
            answer: '네, 만 65세 이상 건강보험 가입자라면 평생 2개까지 본인부담금 30%로 임플란트 시술이 가능하며, 3D CT 진단 시 적용 여부를 바로 확인해 드립니다.',
          },
        ]}
        pageUrl="https://whitestyle.com/treatments/implant"
      />
      <div className="bg-white border-t border-slate-200">
        <iframe
          src="/legacy/12121.html"
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
