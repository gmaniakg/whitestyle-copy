'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ClinicalSummarySection from '@/components/ClinicalSummarySection';

export default function AestheticTreatmentPage() {
  return (
    <div className="w-full min-h-[100dvh] bg-[#f8fafc]">
      <ClinicalSummarySection
        categoryBadge="자연치아 보존 · 최소삭제 심미보철"
        title="강남역 화이트스타일치과 최소삭제 심미보철 (이지화이트 · 제로쉘)"
        leadSentence="강남역 화이트스타일치과의원의 최소삭제 심미보철은 자연치아 보존을 최우선 원칙으로 삼아, 정밀 교합 진단 후 치아 삭제량을 최소화한 맞춤형 세라믹 디자인과 체계적인 사후 보증 관리를 제공합니다."
        summaryBullets={[
          '법랑질(에나멜)을 최대한 보존하는 최소삭제·무삭제 원칙으로 시림과 신경 손상 위험 최소화.',
          '0.1~0.2mm 초박형 맞춤형 세라믹 디자인으로 자연스러운 투명도와 웃는 입술 라인 조화 구현.',
          '내원 당일 정밀 3D 스캔 및 모형 시뮬레이션을 통해 완성 모습을 미리 확인한 뒤 제작 진행.',
        ]}
        comparisonTitle="최소삭제 심미보철 비교 안내"
        comparisonRows={[
          {
            item: '치아 삭제 기준 · 무삭제 원칙',
            whitestyle: '자연치아 법랑질 보존 최우선 (무삭제 제로쉘 또는 0.1~0.2mm 최소삭제 맞춤 판단 · 기존 라미네이트 재시술 포함)',
            general: '일괄 0.5mm 이상 다량 삭제 후 시술 진행 사례 존재',
          },
          {
            item: '원데이 3D 스캔 & 3단계 통증 완화',
            whitestyle: '내원 당일 3D 스캔·교합 시뮬레이션으로 완성 모습 사전 확인, 필요 시 도포·가글·디지털 무통 3단계 완화 적용',
            general: '기성 디자인 위주 및 반복 본뜨기 불편',
          },
          {
            item: '3인 원장단 교합·잇몸 협진',
            whitestyle: '김준헌 병원장(교정학 박사) · 이봉진 대표원장 · 박선혜 원장(치주과 전문의·우수보철치과의사) 3인 원장단 협진',
            general: '교합·잇몸라인 병행 진단 없이 단독 보철 제작',
          },
          {
            item: '신평원 비급여 준수 · 정품 보증 & 리콜',
            whitestyle: '건강보험심사평가원(신평원) 비급여 기준 준수, 정품 강화 세라믹 보증 및 시술 후 3·6·12개월 정기 교합·치주 검진',
            general: '보증 범위 및 사후 교합 체크 기준 상이',
          },
          {
            item: '일본어 전담 통역 & 단기 일정',
            whitestyle: '일본어 코디네이터 3명 상주 (日本語通訳スタッフ3名常駐) · 해외 방한 일정 맞춤 2~3회 집중 완성 가능',
            general: '단기 일정 조율 및 일본어 사후 상담 어려움',
          },
          {
            item: '진료시간 (주말 · 휴진 안내)',
            whitestyle: '월·화·수·금 10:00~19:00 (점심 13:00~14:00) / 토요일 10:00~14:00 · 목·일·공휴일 휴진',
            general: '지점·요일별 진료 시간 상이',
          },
        ]}
        faqs={[
          {
            question: '제로쉘(ZeroShell)과 이지화이트(EasyWhite)는 치아를 많이 깎아야 하나요?',
            answer: '아니요. 화이트스타일치과는 자연치아 보존을 최우선 원칙으로 하여, 무삭제 적용이 가능한 치아인지 먼저 3D 스캔과 교합 정밀 진단으로 판단하고 삭제가 필요한 경우에도 법랑질 범위 내 0.1~0.2mm 이내로 최소화합니다.',
          },
          {
            question: '시술 후 색이 변하거나 부서지지는 않나요?',
            answer: '변색에 강한 고강도 맞춤형 정품 세라믹 보철을 사용하며, 3·6·12개월 정기 교합 체크와 야간 이갈이 보호 등 사후 보증 관리를 함께 안내해 오래도록 안정적으로 유지하실 수 있습니다.',
          },
          {
            question: '기존 라미네이트 탈락·변색·잇몸 염증으로 인한 심미보철 재시술도 가능한가요?',
            answer: '네, 가능합니다. 기존 보철물의 미세 누출이나 과삭제, 교합 간섭으로 인한 잦은 파절이 있었던 경우 치주과 전문의 박선혜 원장이 잇몸 건강을 먼저 회복시킨 뒤 턱관절·교합 정밀 진단을 거쳐 재파절 위험을 낮춘 맞춤형 재시술을 진행합니다.',
          },
        ]}
        pageUrl="https://whitestyle.com/treatments/aesthetic"
      />

      <div className="py-14 px-4 sm:px-8 lg:px-16 xl:px-24 2xl:px-32 w-full mx-auto">
        <div className="flex flex-col items-center mb-16 text-center">
          <div className="relative w-full max-w-5xl h-[360px] md:h-[520px] rounded-[32px] overflow-hidden shadow-xl border border-slate-200">
            <Image
              src="/images/aesthetic-hero.jpg"
              alt="강남역 화이트스타일치과 건강한 자연 미소 심미보철"
              fill
              className="object-cover object-top"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <Link
            href="/treatments/aesthetic/easy-white"
            className="group block p-10 bg-white rounded-3xl border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            style={{ wordBreak: 'keep-all', lineHeight: 1.95 }}
          >
            <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
              이지화이트 (Easy White)
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-[1.95] mb-6">
              자연치아 삭제량을 최소화하여 치아 색상과 형태, 비율을 조화롭게 개선하는 맞춤형 라미네이트 프로그램입니다. (적응증 및 개인차는 정밀 진단 후 안내합니다.)
            </p>
            <span className="inline-flex items-center text-blue-600 font-bold group-hover:translate-x-2 transition-transform">
              이지화이트 최소삭제 설계·과정 확인하기 &rarr;
            </span>
          </Link>

          <Link
            href="/treatments/aesthetic/zeroshell"
            className="group block p-10 bg-white rounded-3xl border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            style={{ wordBreak: 'keep-all', lineHeight: 1.95 }}
          >
            <div className="w-16 h-16 rounded-2xl bg-slate-100 text-[#0f294a] flex items-center justify-center mb-6 group-hover:bg-[#0f294a] group-hover:text-white transition-colors">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4 group-hover:text-[#0f294a] transition-colors">
              제로쉘 (ZeroShell) 심미보철
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-[1.95] mb-6">
              자연치아를 깎지 않거나 극소량만 다듬어 얇은 세라믹 쉘을 밀착시키는 심미보철 프로그램입니다.
            </p>
            <span className="inline-flex items-center text-[#0f294a] font-bold group-hover:translate-x-2 transition-transform">
              제로쉘 무삭제·최소삭제 비교 확인하기 &rarr;
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
