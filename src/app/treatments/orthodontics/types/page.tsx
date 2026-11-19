'use client';

import React from 'react';
import ClinicalSummarySection from '@/components/ClinicalSummarySection';

export default function Page() {
  return (
    <div className="w-full min-h-screen bg-[#f8fafc]">
      <ClinicalSummarySection
        categoryBadge="고난도 성인 재교정 · 인비절라인 · 설측 · 클리피씨"
        title="강남역 화이트스타일치과 재교정 · 성인 잇몸안전 교정 · 장치별 1:1 전담"
        leadSentence="강남역 화이트스타일치과의원의 성인 치아교정 재교정 및 장치별 맞춤 교정(인비절라인·설측교정·클리피씨·부분교정)은 1994년 개원(33년 전통) 이래 서울대졸·단국대 외래교수·교정학 박사 김준헌 병원장이 중도 주치의 변경 없이 1:1로 직접 전담하며, 치주과 전문의 협진으로 옥니·재발·치근흡수 및 잇몸 퇴축 부담을 최소화합니다."
        summaryBullets={[
          '유지장치 탈락 재발·발치 후 옥니(각도 꺾임)·어금니 교합 붕괴 등 고난도 재교정 전, Quick-Ceph와 3D CT로 치근 길이 및 치조골 두께를 정밀 계측합니다.',
          '성인·중년 교정은 보건복지부 인증 치주과 전문의 박선혜 원장이 치주 염증을 먼저 안정화한 뒤 약한 힘의 인비절라인·자가결찰·설측 장치로 안전하게 이동합니다.',
          '정밀 진단비·월 진료비·유지장치 포함 투명 비용 기준과 교정 종료 후 고정식+가철식 이중 유지 및 3·6·12개월 정기 리콜을 제공합니다.',
        ]}
        comparisonTitle="재교정 및 장치별 치아교정 선택 기준 비교"
        comparisonRows={[
          {
            item: '주치의 연속성 (33년 한 자리)',
            whitestyle: '김준헌 병원장(교정학 박사) 초기 진단부터 월 진료·유지관리까지 주치의 변경 없는 1:1 책임 진료',
            general: '치료 기간 중 담당 페이닥터 교체로 진료 연속성 단절 우려',
          },
          {
            item: '성인 재교정 · 치주 안전 협진',
            whitestyle: '3D CT 치근/골량 분석 + 치주과 전문의 사전 잇몸 케어 후 미세 이동력 설계',
            general: '잇몸뼈 폭 계측 미흡 시 블랙트라이앵글·치주 퇴축 위험',
          },
          {
            item: '투명 · 설측 · 자가결찰 · 부분교정',
            whitestyle: '정품 인비절라인·클리피씨·설측·3~6개월 앞니 부분교정 중 직업·골격에 맞는 최적 장치 매칭',
            general: '단일 이벤트 장치 위주의 획일적 추천',
          },
        ]}
        faqs={[
          {
            question: '예전 교정 후 앞니가 다시 틀어졌거나 옥니처럼 들어갔는데 재교정이 가능할까요?',
            answer: '어금니 교합이 안정적이고 앞니 배열만 미세하게 틀어졌다면 3~6개월 부분 재교정 또는 인비절라인으로 회복 가능한 경우가 많으며, 옥니나 치축 불균형은 Quick-Ceph 계측 후 정밀 토크 컨트롤을 통해 자연스러운 미소 각도를 되찾아 드립니다.',
          },
          {
            question: '교정 도중에 월비나 유지장치 비용이 추가로 청구되지는 않나요?',
            answer: '초기 정밀 진단 단계에서 장치비·월 진료비·고정식/가철식 이중 유지장치 포함 기준을 투명하게 사전 고지하므로 치료 중 예상치 못한 추가 비용 부담 없이 안심하고 진료를 마치실 수 있습니다.',
          },
        ]}
        pageUrl="https://whitestyle.com/treatments/orthodontics/types"
      />
      <div className="bg-white border-t border-slate-200">
        <iframe
          src="/legacy/12127.html"
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
