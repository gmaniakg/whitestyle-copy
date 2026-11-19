'use client';

import React from 'react';
import ClinicalSummarySection from '@/components/ClinicalSummarySection';

export default function Page() {
  return (
    <div className="w-full min-h-screen bg-[#f8fafc]">
      <ClinicalSummarySection
        categoryBadge="고난도 무치악 전악 재건 · 전체임플란트"
        title="강남역 화이트스타일치과 무치악 전체임플란트 · 전악 구강 재건"
        leadSentence="강남역 화이트스타일치과의원의 고난도 무치악 전악 재건(전체임플란트)은 1994년 개원(33년 전통) 이래 3D CT·구강스캔 정밀 교합 분석과 3인 원장단(임플란트·교정학 박사·치주과 전문의) 협진을 통해, 상·하악 전체 치아 상실 환자에게 맞춤형 커스텀 어버트먼트(지대주)와 CAD/CAM 정밀 보철로 저작력과 안모 수직 고경을 동시에 회복해 드립니다."
        summaryBullets={[
          '상·하악 치아 대부분이 상실된 무치악 환자도 최소한의 꼭 필요한 식립 개수 설계와 교합 힘 분산으로 경제성과 내구성을 균형 있게 맞춥니다.',
          '김준헌 병원장(안모·수직 교합 균형) · 이봉진 대표원장(전악 임플란트·골이식) · 박선혜 원장(치주 조직 재생) 3인 원장단이 전악 교합을 협진합니다.',
          '3단계 통증 완화 무통 마취 시스템과 3·6·12개월 정기 교합·위생 리콜로 고령 환자 및 전신질환 보유 환자도 체계적으로 관리합니다.',
        ]}
        comparisonTitle="무치악 전체임플란트 · 전악 재건 vs 일반 틀니 비교"
        comparisonRows={[
          {
            item: '저작력 및 고정력',
            whitestyle: '3D CT 기반 전악 임플란트 지지와 맞춤형 커스텀 지대주로 자연치아에 가까운 안정적 저작력',
            general: '탈착식 일반 틀니는 잇몸 눌림·움직임 및 저작력 저하 우려',
          },
          {
            item: '전악 교합 · 안모 균형',
            whitestyle: '교정학 박사 + 보철 + 치주 3인 협진으로 무너진 수직 고경과 발음·안모까지 정밀 회복',
            general: '단일 치아 기준 접근 시 전악 교합 불균형 발생 가능',
          },
          {
            item: '장기 위생 · 사후 보증',
            whitestyle: 'CAD/CAM 정밀 연결 보철 + 3·6·12개월 임플란트 주위염 예방 정기 리콜',
            general: '잇몸 흡수에 따른 잦은 틀니 재조정 필요',
          },
        ]}
        faqs={[
          {
            question: '위아래 치아가 거의 없는데 전체임플란트 시 몇 개를 심어야 하고 통증은 어떤가요?',
            answer: '남아 있는 치조골 폭과 골밀도를 3D CT로 먼저 계측하여 꼭 필요한 위치에만 전략적으로 식립 수를 최소화하며, 가글·도포·디지털 정압 3단계 무통 마취 시스템을 적용해 수술 부담을 낮춥니다.',
          },
          {
            question: '오래 틀니를 써서 잇몸이 꺼졌는데도 전체임플란트가 가능한가요?',
            answer: '네. 꺼진 치조골 부위는 뼈이식(GBR·상악동거상술)으로 지지 기반을 회복하고, 교정·보철·치주 3인 원장단이 함께 수직 교합 높이와 맞춤형 커스텀 어버트먼트를 설계하여 얼굴선과 씹는 기능을 함께 복원합니다.',
          },
          {
            question: '부모님 전체임플란트 상담을 받으려는데 고령이거나 당뇨·고혈압이 있어도 시술과 사후 관리가 가능한가요?',
            answer: '고혈압·당뇨 등 전신질환이 있더라도 사전 문진과 복용 약물 확인, 당일 3D CT 정밀 분석을 통해 조절 상태를 평가한 뒤 최소 침습 계획으로 안전하게 진행합니다. 또한 1994년 개원 이래 33년간 한자리에서 진료하며 완료 후 3·6·12개월 치주과 전문의 정기 리콜을 제공해 장기 유지관리까지 든든하게 맡기실 수 있습니다.',
          },
        ]}
        pageUrl="https://whitestyle.com/treatments/implant/edentulous"
      />
      <div className="bg-white border-t border-slate-200">
        <iframe
          src="/legacy/12123.html"
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
