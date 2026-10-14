'use client';

import React, { useState } from 'react';
import { FadeIn, FadeInStaggerContainer, FadeInStaggerItem } from '@/components/animations/FadeIn';
import { motion, AnimatePresence } from 'framer-motion';

const allImages = [
  { file: 'KakaoTalk_20260512_163602653.jpg',    caption: '대기실 전경 — 말(馬) 연작 설치 전경' },
  { file: 'KakaoTalk_20260512_163602653_01.jpg', caption: '철망 회화 ①  — 빛과 그림자의 입체감' },
  { file: 'KakaoTalk_20260512_163602653_02.jpg', caption: '철망 회화 ②  — 약동하는 말의 기운' },
  { file: 'KakaoTalk_20260512_163602653_03.jpg', caption: '작품 세부 ①  — 알루미늄 메시 레이어링' },
  { file: 'KakaoTalk_20260512_163602653_04.jpg', caption: '작품 세부 ②  — 입체 음영 구현' },
  { file: 'KakaoTalk_20260512_163602653_05.jpg', caption: '작품 세부 ③  — 측면 조명 연출' },
  { file: 'KakaoTalk_20260512_163602653_06.jpg', caption: '작품 세부 ④  — 흑백 음영 깊이' },
  { file: 'KakaoTalk_20260512_163602653_07.jpg', caption: '설치 현장 ①  — 원장 김준헌과 작가의 협의' },
  { file: 'KakaoTalk_20260512_163602653_08.jpg', caption: '설치 현장 ②  — 기증 작품 인도 장면' },
  { file: 'KakaoTalk_20260512_163602653_09.jpg', caption: '클로즈업 ①  — 숨결이 느껴지는 말의 콧구멍' },
  { file: 'KakaoTalk_20260512_163602653_10.jpg', caption: '클로즈업 ②  — 갈기의 역동적 흐름' },
  { file: 'KakaoTalk_20260512_163602653_11.jpg', caption: '클로즈업 ③  — 철망 위에 응결된 수묵' },
  { file: 'KakaoTalk_20260512_163602653_12.jpg', caption: '전시 전경    — 진료실 복도를 채운 세 폭의 말' },
];

export default function TourPage() {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const openLightbox = (idx: number) => setLightboxIdx(idx);
  const closeLightbox = () => setLightboxIdx(null);
  const prevImage = () => setLightboxIdx(i => (i! - 1 + allImages.length) % allImages.length);
  const nextImage = () => setLightboxIdx(i => (i! + 1) % allImages.length);

  return (
    <div className="w-full min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 text-white py-28 md:py-40 px-4">
        {/* Abstract mesh pattern overlay */}
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 29px, rgba(255,255,255,0.3) 30px),
                              repeating-linear-gradient(90deg, transparent, transparent 29px, rgba(255,255,255,0.3) 30px)`,
          }}
        />
        <div className="absolute -top-20 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center">
          <FadeIn direction="down">
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm text-white/90 text-sm font-bold tracking-widest uppercase mb-8">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              병원 투어 · Art in Clinic
            </span>
          </FadeIn>

          <FadeIn direction="up" delay={0.1}>
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-black leading-[0.95] tracking-tight mb-6">
              철망 위에<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-300">
                말이 달린다
              </span>
            </h1>
          </FadeIn>

          <FadeIn direction="up" delay={0.2}>
            <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              대한민국 설치미술의 거장 <strong className="text-white">박성태 화백</strong>의 철망 회화가<br className="hidden sm:block" />
              화이트스타일치과 대기실을 갤러리로 만든 이야기
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── STORY SECTION ── */}
      <section className="py-20 md:py-32 px-4">
        <div className="max-w-6xl mx-auto">

          {/* Artist bio card */}
          <FadeIn direction="up">
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
              {/* Left: text */}
              <div>
                <span className="inline-block py-1.5 px-5 rounded-full bg-blue-50 text-blue-700 text-xs font-extrabold tracking-[0.2em] uppercase mb-8 border border-blue-100">
                  Artist Park Sung-Tae  ·  박성태 화백
                </span>
                <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-8">
                  알루미늄 망사로<br />
                  <span className="text-blue-600">수묵을 그리다</span>
                </h2>
                <div className="space-y-5 text-slate-600 text-lg leading-relaxed">
                  <p>
                    박성태 화백은 전통 수묵화의 먹빛과 음영을 <strong className="text-slate-800">알루미늄 메시(mesh)</strong>라는
                    현대적 재료로 재현해 낸 독창적 기법의 창시자입니다. 층층이 겹쳐지는 철망 사이로
                    통과하는 빛이 마치 붓으로 그린 듯한 농담(濃淡)을 만들어냅니다.
                  </p>
                  <p>
                    화백의 대표작 <strong className="text-slate-800">〈천마도(天馬圖)〉</strong>와 <strong className="text-slate-800">〈행차도(行次圖)〉</strong>는
                    국내외 주요 미술관에 소장되어 있으며, 화이트스타일치과에 전시된 세 폭의 말(馬) 연작은
                    이 대표작들의 초기 원형이 된 작품으로, 미술사적으로도 매우 귀한 의미를 지닙니다.
                  </p>
                  <p>
                    화백은 "치유의 공간에 생명력이 약동하는 말을 두고 싶었다"며 본원의 진료 철학에 공감하여
                    직접 작품을 <strong className="text-slate-800">기증</strong>해 주셨습니다. 지금 이 순간에도 대기실에서
                    환자분들을 맞이하고 있습니다.
                  </p>
                </div>
              </div>

              {/* Right: featured image */}
              <div className="relative">
                <div className="rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
                  <img
                    src="/images/park-sung-tae/KakaoTalk_20260512_163602653.jpg"
                    alt="박성태 화백 철망 회화 전시 전경"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                {/* Decorative badge */}
                <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-5 border border-blue-50">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">🐎</span>
                    <div>
                      <div className="text-xs text-slate-400 font-bold uppercase tracking-widest">기증 작품</div>
                      <div className="text-base font-extrabold text-slate-900">말(馬) 연작 3폭</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Quote pullout */}
          <FadeIn direction="up" delay={0.2}>
            <figure className="relative max-w-3xl mx-auto mb-24">
              <div className="absolute -top-4 -left-2 text-8xl text-blue-100 font-black leading-none select-none">"</div>
              <blockquote className="relative bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-10 md:p-14 border border-blue-100 shadow-lg">
                <p className="text-2xl md:text-3xl font-bold text-slate-800 leading-relaxed italic">
                  치유의 공간에는 생명의 기운이 흘러야 합니다.<br />
                  달리는 말처럼, 아프던 몸이 다시 힘차게 달려가길 바라며 이 작품을 드립니다.
                </p>
                <footer className="mt-8 flex items-center gap-4">
                  <div className="w-12 h-1 bg-blue-400 rounded-full" />
                  <cite className="text-slate-500 font-bold not-italic">
                    박성태 화백  ·  기증 당시 헌정사
                  </cite>
                </footer>
              </blockquote>
            </figure>
          </FadeIn>

          {/* Horse & mesh technique explainer */}
          <FadeIn direction="up" delay={0.1}>
            <div className="grid md:grid-cols-3 gap-8 mb-24">
              {[
                {
                  icon: '🐎',
                  title: '말(馬)을 선택한 이유',
                  body: '말은 동서양 모두에서 생명력·회복·전진을 상징합니다. 특히 한국 전통 문화에서 백마(白馬)는 순결과 치유의 신성한 동물로 여겨져 왔습니다. 치과 진료실이라는 공간과 이보다 잘 어울리는 소재는 없습니다.',
                },
                {
                  icon: '🕸️',
                  title: '철망 회화(Wire Mesh Painting)',
                  body: '일반 회화의 물감 대신 여러 겹의 알루미늄 메시를 겹쳐 빛의 투과량을 조절해 음영을 만듭니다. 보는 각도와 조명에 따라 작품이 살아 움직이는 듯한 착시를 일으키는 것이 핵심 매력입니다.',
                },
                {
                  icon: '🏛️',
                  title: '작품의 희소 가치',
                  body: '본원에 전시된 세 폭은 대표작 〈천마도〉 시리즈의 초기 원형으로, 화백이 현재 작품 기증을 극히 제한하고 있어 사실상 재현 불가한 작품입니다. 치과를 방문하시는 것만으로 희귀 원작을 감상할 수 있습니다.',
                },
              ].map((item) => (
                <div key={item.title} className="bg-slate-50 rounded-3xl p-8 border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <span className="text-4xl mb-4 block">{item.icon}</span>
                  <h3 className="text-xl font-extrabold text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </FadeIn>

          {/* Director's message */}
          <FadeIn direction="up">
            <div className="bg-slate-900 text-white rounded-3xl p-10 md:p-14 mb-24 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative">
                <span className="inline-block py-1.5 px-5 rounded-full bg-white/10 text-white/80 text-xs font-bold tracking-widest uppercase mb-6">
                  대표원장 메시지
                </span>
                <p className="text-xl md:text-2xl text-slate-200 leading-relaxed mb-8 italic">
                  "화이트스타일치과의 문은 언제나 열려 있습니다. 박성태 화백님의 진품을
                  진료와 상관없이 언제든지 구경하러 오세요. 예술 작품이 주는 위안만큼
                  치유에 가까운 것도 없다고 생각합니다."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-black text-lg">김</div>
                  <div>
                    <div className="font-extrabold text-white text-lg">김준헌 대표원장</div>
                    <div className="text-slate-400 text-sm">화이트스타일치과 · 강남역 30년 전통</div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section className="py-16 md:py-24 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <FadeIn direction="up" className="text-center mb-16">
            <span className="inline-block py-1.5 px-5 rounded-full bg-blue-50 text-blue-700 text-xs font-extrabold tracking-[0.2em] uppercase mb-6 border border-blue-100">
              Photo Gallery
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
              작품 & 전시 사진
            </h2>
            <p className="text-slate-500 text-lg">사진을 클릭하면 크게 볼 수 있습니다</p>
          </FadeIn>

          <FadeInStaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" staggerDelay={0.05}>
            {allImages.map((img, i) => (
              <FadeInStaggerItem key={i} direction="up" className="group cursor-pointer" onClick={() => openLightbox(i)}>
                <div className="relative overflow-hidden rounded-2xl shadow-md aspect-square bg-slate-200">
                  <img
                    src={`/images/park-sung-tae/${img.file}`}
                    alt={img.caption}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <p className="text-white text-sm font-semibold leading-snug">{img.caption}</p>
                  </div>
                  {/* Expand icon */}
                  <div className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow">
                    <svg className="w-4 h-4 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                  </div>
                </div>
              </FadeInStaggerItem>
            ))}
          </FadeInStaggerContainer>
        </div>
      </section>

      {/* ── VISIT CTA ── */}
      <section className="py-20 md:py-28 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn direction="up">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
              직접 오셔서 감상하세요
            </h2>
            <p className="text-xl text-slate-500 leading-relaxed mb-10 max-w-2xl mx-auto">
              어떤 예약 없이도 방문하셔서 박성태 화백의 원작을 가까이에서 보실 수 있습니다.
              강남역 11·12번 출구에서 도보 2분입니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/about/location"
                className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-lg rounded-2xl shadow-xl shadow-blue-600/30 hover:-translate-y-0.5 transition-all"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                오시는 길 보기
              </a>
              <a
                href="/consult"
                className="inline-flex items-center gap-2 px-8 py-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-lg rounded-2xl hover:-translate-y-0.5 transition-all"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                상담 예약
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── LIGHTBOX ── */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Prev */}
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-4 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Image */}
            <motion.div
              key={lightboxIdx}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={`/images/park-sung-tae/${allImages[lightboxIdx].file}`}
                alt={allImages[lightboxIdx].caption}
                className="w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
              />
              <p className="text-center text-white/70 mt-4 text-sm font-medium">
                {allImages[lightboxIdx].caption}
                <span className="ml-4 text-white/40">({lightboxIdx + 1} / {allImages.length})</span>
              </p>
            </motion.div>

            {/* Next */}
            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-4 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
