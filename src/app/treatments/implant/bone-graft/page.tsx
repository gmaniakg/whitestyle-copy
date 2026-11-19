'use client';

import React from 'react';
import ClinicalSummarySection from '@/components/ClinicalSummarySection';

export default function Page() {
  return (
    <div className="w-full min-h-screen bg-[#f8fafc]">
      <ClinicalSummarySection
        categoryBadge="고난도 임플란트 재수술 · 뼈이식 · 치주과 협진"
        title="강남역 화이트스타일치과 임플란트 재수술 · 동종골 뼈이식 · 상악동거상술"
        leadSentence="강남역 화이트스타일치과의원의 임플란트 재수술 및 고난도 뼈이식 임플란트는 3D CT 골밀도·신경관 정밀 진단과 3단계 통증 완화 무통 마취 시스템을 바탕으로, 이봉진 대표원장(고난도 골이식·보철) · 박선혜 원장(보건복지부 인증 치주과 전문의) · 김준헌 병원장(교정학 박사) 3인 원장단 협진을 통해 심한 치조골 소실·상악동거상술·임플란트 주위염 재수술부터 맞춤형 커스텀 어버트먼트 보철 및 3·6·12개월 정기 리콜까지 안전하게 진행합니다."
        summaryBullets={[
          '타 병원 식립 후 흔들리거나 임플란트 주위염이 발생한 케이스를 치주과 전문의(박선혜 원장)와 보철 전담(이봉진 대표원장)이 공동 진단하여 염증 정화 후 재식립합니다.',
          '잇몸뼈(치조골) 폭과 높이가 부족해도 3D CT 계측 기반의 자가골·동종골 골유도재생술(GBR) 및 상악동거상술로 안정적인 식립 기반을 먼저 구축합니다.',
          '구강스캔 기반 맞춤형 커스텀 어버트먼트(지대주)와 CAD/CAM 정밀 보철 연계, 그리고 완료 후 3·6·12개월 치주 리콜로 장기 수명을 관리합니다.',
        ]}
        comparisonTitle="임플란트 재수술 · 고난도 뼈이식 진료 기준 비교"
        comparisonRows={[
          {
            item: '골밀도 · 염증 사전 진단',
            whitestyle: '3D CT 3차원 단층·신경관 거리 및 잔존 골질 계측 후 3인 원장단 협진 설계',
            general: '단순 2D 엑스레이 위주의 제한적 계측',
          },
          {
            item: '지대주 · 상부 보철 맞춤 설계',
            whitestyle: '잇몸 라인에 맞춘 맞춤형 커스텀 어버트먼트 + CAD/CAM 정밀 보철로 음식물 끼임·주위염 예방',
            general: '기성 지대주 위주 적용 시 잇몸 틈새 염증 우려',
          },
          {
            item: '사후 관리 · 마취 부담 완화',
            whitestyle: '가글·도포·디지털 정압 3단계 무통 마취 및 3·6·12개월 치주과 전문의 정기 리콜',
            general: '일반 국소마취 및 보철 완료 후 정기 잇몸 관리 부재',
          },
        ]}
        faqs={[
          {
            question: '타 병원에서 잇몸뼈가 너무 없어 임플란트가 어렵다고 들었는데 재수술과 뼈이식이 가능한가요?',
            answer: '3D CT 정밀 분석을 통해 상악동 바닥 두께와 치조골 잔존 폭을 계측한 뒤, 보건복지부 인증 치주과 전문의 박선혜 원장과 이봉진 대표원장이 협진하여 단계적 동종골·자가골 이식(GBR·상악동거상술)으로 뼈 기반을 회복한 후 안전하게 식립 또는 재수술을 진행합니다.',
          },
          {
            question: '임플란트 재수술 후 다시 흔들리거나 잇몸 염증이 생기지 않으려면 무엇이 다른가요?',
            answer: '기존 염증 조직을 완전히 제거한 뒤 잇몸 모양에 꼭 맞는 맞춤형 커스텀 어버트먼트(지대주)와 교합력 분산 보철을 적용하고, 치료 완료 후 3·6·12개월 주기 스케일링 및 치주 점검 리콜을 지속하는 것이 재발 방지의 핵심입니다.',
          },
          {
            question: '임플란트 재수술이나 뼈이식 수술을 받을 때 통증이 심하지 않도록 어떻게 마취하나요?',
            answer: '본원은 잇몸을 닦아내는 가글 마취와 표면 도포 마취를 먼저 시행한 뒤, 체온에 맞춘 마취액을 일정한 압력으로 주입하는 디지털 무통 마취기를 적용하는 3단계 통증 완화 시스템을 통해 고난도 뼈이식·재수술 시에도 마취 주사와 시술 통증 부담을 크게 낮추고 있습니다.',
          },
        ]}
        pageUrl="https://whitestyle.com/treatments/implant/bone-graft"
      />
      <div className="bg-white border-t border-slate-200">
        <iframe
          src="/legacy/12122.html"
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
