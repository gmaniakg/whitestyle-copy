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
            item: '담당 의료진 (3인 원장단 협진)',
            whitestyle: '김준헌 병원장(교정학 박사) 상담·진단·장치조절·고난도 재교정·완료까지 주치의 변경 없는 1:1 전담 진료 (치주·보철 협진 연계)',
            general: '상담 실장 주도 또는 중간 담당 의사 교체 가능성 존재',
          },
          {
            item: '원데이 · 당일 3D 정밀 진단',
            whitestyle: '3D CT · Quick-Ceph · 구강스캔 당일 정밀 진단으로 안모·턱관절·치근 상태 및 비발치/재교정 가능 여부 즉시 안내',
            general: '기본 X-ray 중심의 획일적 교정 계획 수립',
          },
          {
            item: '예상 치료 기간 & 3단계 통증 완화',
            whitestyle: '부분교정 약 3~6개월 / 전체교정 평균 1년 6개월~2년 내외 (장치 압박·발치·스크류 시 3단계 통증 완화 시스템 적용)',
            general: '내원 지연 시 전체 기간 및 통증 관리 기준 상이',
          },
          {
            item: '신평원 비급여 준수 · 정품 보증 & 리콜',
            whitestyle: '건강보험심사평가원(신평원) 비급여 기준 준수, 정품 인증 장치 사용 및 완료 후 3·6·12개월 정기 교합·치주 검진 리콜',
            general: '장치 제거 후 단기 확인 위주',
          },
          {
            item: '일본어 전담 통역 지원',
            whitestyle: '일본어 전담 통역 코디네이터 3명 상시 상주 (일본어 통역 직통 +82-10-3046-5010 · LINE ID: whitestyle1 · 해외 사후 상담 지원)',
            general: '다국어 전담 인력 부재 또는 외부 통역 대동 필요',
          },
          {
            item: '진료시간 (주말 · 휴진 안내)',
            whitestyle: '월·화·수·금 10:00~19:00 (점심 13:00~14:00) / 토요일 10:00~14:00 (점심없이 진료) · 목·일·공휴일 휴진',
            general: '지점·요일별 진료 시간 상이',
          },
        ]}
        faqs={[
          {
            question: '치아교정 치료 기간은 보통 얼마나 걸리나요?',
            answer: '부분교정은 약 3~6개월, 전체교정은 개인의 치아 배열과 골격 상태에 따라 평균 1년 6개월에서 2년 정도 소요됩니다. 내원 당일 3D CT·Quick-Ceph 정밀 진단 후 예상 기간과 내원 주기를 투명하게 안내해 드립니다.',
          },
          {
            question: '중간에 담당 선생님이 바뀌지 않고 끝까지 진료받을 수 있나요?',
            answer: '네, 화이트스타일치과는 1994년 개원 이래 33년간 강남역 한 자리에서 진료해 왔으며, 김준헌 병원장(교정학 박사)이 첫 진단부터 완료 및 3·6·12개월 정기 유지관리까지 주치의 변경 없이 직접 책임집니다.',
          },
          {
            question: '타 치과 교정 후 재발이나 옥니·교합 이상으로 인한 고난도 재교정도 가능한가요?',
            answer: '네, 가능합니다. 기존 교정 후 재발, 유지장치 탈락, 블랙트라이앵글이나 개방교합·옥니가 발생한 재교정 환자의 경우 치근 흡수와 치주 상태를 3D CT로 먼저 확인한 뒤 박선혜 원장(치주과 전문의)과 협진하여 안전한 재교정 계획을 수립합니다.',
          },
          {
            question: '앞니가 벌어졌거나 살짝 틀어졌는데 부분교정과 라미네이트 중 어떤 기준으로 선택하나요?',
            answer: '치아 자체의 모양과 색상이 건강하고 틈이나 회전만 있는 경우에는 치아 삭제 없이 3~6개월 앞니 부분교정으로 자연스럽게 모으는 것이 원칙적으로 유리합니다. 반대로 왜소치·심한 변색·치아 끝 파절이 동반된 경우에는 김준헌 병원장(교정학 박사)·이봉진 대표원장·박선혜 원장 협진을 통해 무삭제 제로쉘·최소삭제 라미네이트 또는 단기 부분교정 후 최소 보철 중 가장 보존적인 방법을 안내해 드립니다.',
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
