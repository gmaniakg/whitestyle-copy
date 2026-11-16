'use client';

import React from 'react';
import ClinicalSummarySection from '@/components/ClinicalSummarySection';

export default function Page() {
  return (
    <div className="w-full min-h-screen bg-[#f8fafc]">
      <ClinicalSummarySection
        categoryBadge="교정과 박사 직접 진료 · 치아교정"
        title="강남역 화이트스타일치과 1:1 책임 치아교정"
        leadSentence="강남역 화이트스타일치과의원 치아교정은 1994년 개원(33년 전통) 이래 서울대졸, 단국대 외래교수, 교정학 박사 김준헌 병원장이 정밀 진단부터 장치 부착, 사후 유지관리까지 1:1로 직접 책임 진료합니다."
        summaryBullets={[
          '서울대졸 · 단국대 외래교수 · 교정학 박사 김준헌 병원장의 처음부터 끝까지 주치의 변경 없는 1:1 전담 교정 진료.',
          '3D CT 골격 정밀 분석과 교합 시뮬레이션을 통한 비발치/발치 정밀 판단 및 예상 기간·비용 투명 고지.',
          '투명교정(인비절라인)·클리피씨·세라믹·부분교정 등 증상별 맞춤 장치 설계와 교정 후 장기 유지관리 시스템 운영.',
        ]}
        comparisonTitle="치아교정 진료 방식 비교 안내"
        comparisonRows={[
          {
            item: '담당 의료진',
            whitestyle: '김준헌 병원장(교정학 박사) 상담·진단·장치조절·완료까지 1:1 일관 진료',
            general: '상담 실장 주도 또는 중간 담당 의사 교체 가능성 존재',
          },
          {
            item: '진단 및 계획',
            whitestyle: '3D CT·구강스캔 기반 안모·턱관절·치근 상태 정밀 분석 후 치료 기간 제시',
            general: '기본 X-ray 중심의 획일적 교정 계획 수립',
          },
          {
            item: '예상 치료 기간',
            whitestyle: '부분교정 약 3~6개월 / 전체교정 평균 1년 6개월~2년 내외 (개인별 상이)',
            general: '내원 지연 시 전체 기간 예측 불확실',
          },
          {
            item: '사후 유지관리',
            whitestyle: '고정성·가철성 유지장치 이중 관리 및 정기 교합 체크',
            general: '장치 제거 후 단기 확인 위주',
          },
        ]}
        faqs={[
          {
            question: '치아교정 치료 기간은 보통 얼마나 걸리나요?',
            answer: '부분교정은 약 3~6개월, 전체교정은 개인의 치아 배열과 골격 상태에 따라 평균 1년 6개월에서 2년 정도 소요됩니다. 정밀 진단 당일 예상 기간을 구체적으로 안내해 드립니다.',
          },
          {
            question: '중간에 담당 선생님이 바뀌지 않고 끝까지 진료받을 수 있나요?',
            answer: '네, 화이트스타일치과는 1994년 개원 이래 33년간 강남역 한 자리에서 진료해 왔으며, 김준헌 병원장(교정학 박사)이 첫 진단부터 완료 및 유지관리까지 직접 책임집니다.',
          },
        ]}
        pageUrl="https://whitestyle.com/treatments/orthodontics"
      />
      <div className="bg-white border-t border-slate-200">
        <iframe
          src="/legacy/12126.html"
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
