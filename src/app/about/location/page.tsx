'use client';

import React from 'react';
import { FadeIn } from '@/components/animations/FadeIn';

export default function LocationPage() {
  const mapSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.410292723708!2d127.028981!3d37.498877!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca157833076ef%3A0x6739b6b7cf91f1a5!2z7ISc7Jq47Iq56rKwIOurgOuCqOq1rCDqsJXrgqjrjIDroZ85MrequCAxNw!5e0!3m2!1sko!2skr!4v1700000000000!5m2!1sko!2skr";

  return (
    <div className="py-20 px-4 sm:px-8 lg:px-16 xl:px-24 2xl:px-32 w-full mx-auto min-h-[100dvh] bg-slate-50/50">
      {/* Header Section */}
      <FadeIn direction="down" className="flex flex-col items-center mb-16 text-center">
        <span className="rounded-full px-5 py-2 text-xs uppercase tracking-[0.25em] font-extrabold bg-blue-50 text-blue-600 mb-6 border border-blue-100 shadow-sm">
          WhiteStyle Location
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight mb-6">
          오시는 길 & 진료시간 안내
        </h1>
        <p className="text-lg sm:text-xl text-slate-600 font-medium max-w-2xl">
          강남역 11번·12번 출구 도보 2분. 편안하고 여유로운 진료 서비스를 약속드립니다.
        </p>
      </FadeIn>

      {/* Main Grid Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto">
        
        {/* Left Column: Interactive Map (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col space-y-6">
          <div className="bg-white p-4 sm:p-6 rounded-[2.5rem] shadow-xl border border-slate-100 flex flex-col h-full min-h-[480px] sm:min-h-[560px] relative overflow-hidden group">
            
            {/* Map Header Title */}
            <div className="flex items-center justify-between mb-4 px-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-md">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">화이트스타일치과의원</h2>
                  <p className="text-xs text-slate-500 font-medium">강남구 강남대로92길 17 대승빌딩 1층, 2층</p>
                </div>
              </div>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-50 text-emerald-600 border border-emerald-100">
                강남역 12번출구 2분
              </span>
            </div>

            {/* Map Container */}
            <div className="flex-1 w-full rounded-2xl overflow-hidden relative border border-slate-200 shadow-inner bg-slate-100">
              <iframe
                title="화이트스타일치과 위치 지도"
                src={mapSrc}
                className="w-full h-full min-h-[380px] sm:min-h-[440px] border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Navigation App CTAs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 pt-2">
              <a
                href="https://map.kakao.com/link/to/화이트스타일치과,37.498877,127.028981"
                target="_blank"
                rel="noopener noreferrer"
                className="py-3.5 px-4 bg-[#FEE500] hover:bg-[#fada00] text-black font-extrabold text-sm rounded-xl shadow-sm flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 3c-5.52 0-10 3.532-10 7.886 0 2.827 1.83 5.305 4.605 6.643l-1.196 4.385c-.104.381.334.66.657.426l5.068-3.393c.285.027.575.041.866.041 5.52 0 10-3.532 10-7.886C22 6.532 17.52 3 12 3z" />
                </svg>
                카카오맵 길찾기
              </a>

              <a
                href="https://map.naver.com/v5/search/%ED%99%94%EC%9D%B4%ED%8A%B8%EC%8A%A4%ED%83%80%EC%9D%BC%EC%B9%98%EA%B3%BC"
                target="_blank"
                rel="noopener noreferrer"
                className="py-3.5 px-4 bg-[#03C75A] hover:bg-[#02b350] text-white font-extrabold text-sm rounded-xl shadow-sm flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
              >
                <span className="font-black text-lg leading-none">N</span>
                네이버지도 길찾기
              </a>

              <a
                href="tel:025697528"
                className="py-3.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm rounded-xl shadow-sm flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                전화 문의 (02-569-7528)
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Clinic Hours & Directions (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col space-y-6">
          
          {/* 진료시간 안내 */}
          <div className="bg-white p-6 sm:p-8 rounded-[2.5rem] shadow-xl border border-slate-100">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-900">진료시간 안내</h3>
                <p className="text-xs text-slate-400 font-medium">체계적이고 여유로운 진료 예약 시스템</p>
              </div>
            </div>

            <ul className="space-y-4 text-slate-700 text-sm sm:text-base">
              <li className="flex justify-between items-center py-2 border-b border-slate-50">
                <span className="font-bold text-slate-900">월 / 화 / 수 / 목 / 금</span>
                <span className="font-extrabold text-blue-700">10:00 ~ 19:00</span>
              </li>
              <li className="flex justify-between items-center py-2 border-b border-slate-50">
                <span className="font-bold text-slate-900">토 요 일</span>
                <span className="font-extrabold text-blue-700">10:00 ~ 14:00 <span className="text-xs text-slate-400 font-normal">(점심시간 없음)</span></span>
              </li>
              <li className="flex justify-between items-center py-2 border-b border-slate-50">
                <span className="font-bold text-slate-900">점 심 시 간</span>
                <span className="font-bold text-slate-600">13:00 ~ 14:00</span>
              </li>
              <li className="flex justify-between items-center py-2 text-rose-600 font-bold">
                <span>일요일 / 공휴일</span>
                <span className="bg-rose-50 px-3 py-1 rounded-full text-xs border border-rose-100">휴 진</span>
              </li>
            </ul>
          </div>

          {/* 대중교통 & 주차안내 */}
          <div className="bg-white p-6 sm:p-8 rounded-[2.5rem] shadow-xl border border-slate-100 space-y-6">
            
            {/* 지하철 & 버스 */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                <h4 className="text-lg font-black text-slate-900">지하철 및 버스</h4>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed pl-4 border-l-2 border-blue-100">
                <span className="font-bold text-slate-900">2호선·신분당선 강남역 11번·12번 출구</span> 도보 2분거리.<br />
                국기원 사거리 방향 GS25 골목 안쪽에 위치해 있습니다.
              </p>
            </div>

            {/* 무료 주차장 */}
            <div className="pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  <h4 className="text-lg font-black text-slate-900">무료 주차장 이용안내</h4>
                </div>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100">
                  무료 주차 지원
                </span>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed pl-4 border-l-2 border-emerald-100">
                국기원 사거리 쪽에서 강남역 방향 진입 후 GS25 골목 우회전 ➔ 다시 좌회전 후 직진하시면 왼쪽에 <span className="font-bold text-slate-900 underline decoration-emerald-400 decoration-2">비전타워 주차장</span>이 위치해 있습니다.
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
