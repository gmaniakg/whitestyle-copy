import React from "react";
import Image from "next/image";
import Link from "next/link";
import ReviewBentoGrid from "@/components/ReviewBentoGrid";
import { FadeIn, FadeInStaggerContainer, FadeInStaggerItem } from "@/components/animations/FadeIn";
import { RevealText } from "@/components/animations/RevealText";
import ImplantCaseFinder from "@/components/ImplantCaseFinder";
import ClinicalCasesGallery from "@/components/ClinicalCasesGallery";

export default async function Home() {
  return (
    <div className="w-full space-y-32">
      {/* Premium Video Hero Section - Fullscreen Left-to-Right */}
      <section className="relative w-full min-h-[85vh] flex flex-col justify-center items-start overflow-hidden mb-16 shadow-2xl bg-black border-b border-slate-800 pt-36 pb-24 px-8 md:px-16 lg:px-32">
        {/* Background Video */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover opacity-90 scale-[1.02]"
        >
          <source src="/videos/hero_optimized.mp4" type="video/mp4" />
          <source src="/videos/hero_topaz.mp4" type="video/mp4" />
        </video>
        
        {/* Overlay Gradients for Readability and Aesthetic */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/20 to-transparent mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-blue-900/20 mix-blend-overlay"></div>
        
        {/* Content */}
        <FadeInStaggerContainer className="relative z-10 flex flex-col items-start text-left max-w-4xl" staggerDelay={0.2}>
          <FadeInStaggerItem direction="down">
            <span className="inline-block py-1.5 px-6 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold tracking-[0.3em] uppercase mb-8 backdrop-blur-md shadow-2xl">
              WhiteStyle Dental Clinic
            </span>
          </FadeInStaggerItem>
          
          <FadeInStaggerItem direction="up">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white tracking-tight leading-[1.1] mb-8 drop-shadow-2xl">
              당신의 미소를 <br />
              완성하는
              <div className="h-6 md:h-12"></div>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-white drop-shadow-lg leading-[1.2] inline-block">
                프리미엄 <br />
                WHINISH
              </span>
            </h1>
          </FadeInStaggerItem>
          
          <FadeInStaggerItem direction="up">
            <p className="text-lg md:text-xl text-blue-50/90 max-w-2xl mb-12 leading-relaxed drop-shadow-md font-medium">
              AI 기반의 정밀 진단과 수만 건의 임상 경험을 가진 화이트스타일치과. <br className="hidden md:block" />
              아프지 않고 편안한 진료로 당신의 숨겨진 아름다움을 찾아드립니다.
            </p>
          </FadeInStaggerItem>

          <FadeInStaggerItem direction="up" className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
            <Link href="/treatments/implant" className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-300 bg-blue-600 rounded-full hover:bg-blue-500 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-1 overflow-hidden">
              <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black"></span>
              <span className="relative flex items-center">
                임플란트 상담
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>
            <Link href="/treatments/orthodontics" className="group inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-300 bg-white/10 border border-white/20 backdrop-blur-md rounded-full hover:bg-white/20 hover:shadow-xl hover:-translate-y-1">
              치아교정 안내
            </Link>
          </FadeInStaggerItem>

          {/* Video Interview Links */}
          <FadeInStaggerItem direction="up" className="flex flex-col sm:flex-row gap-5 mt-5 w-full sm:w-auto">
            <a href="https://youtu.be/PioB4UzBSLY?si=y3Ih4LtxQ_4S5A" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-300 bg-white/10 border border-white/20 backdrop-blur-md rounded-full hover:bg-white/20 hover:shadow-xl hover:-translate-y-1 gap-2.5">
              <svg className="w-5 h-5 text-red-400 group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="currentColor"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
              MBC 뉴스데스크 방송보기
            </a>
            <a href="https://youtu.be/ZVx0GOMp1a8?si=0r3yTPvOexC1QGbp" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-300 bg-white/10 border border-white/20 backdrop-blur-md rounded-full hover:bg-white/20 hover:shadow-xl hover:-translate-y-1 gap-2.5">
              <svg className="w-5 h-5 text-red-400 group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="currentColor"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
              인터뷰 영상 1 보기
            </a>
          </FadeInStaggerItem>
        </FadeInStaggerContainer>
      </section>


      {/* Premium Clinical Subjects Section */}
      <section className="px-4 md:px-8 lg:px-16 xl:px-24 2xl:px-32 mx-auto w-full relative">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div className="max-w-2xl">
            <span className="inline-block py-1.5 px-5 rounded-full bg-blue-50 text-blue-700 text-xs font-extrabold tracking-[0.2em] uppercase mb-4 border border-blue-100">
              Clinical Expertise
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
              전문 임상 과목
            </h2>
          </div>
          <Link href="/treatments" className="mt-6 md:mt-0 group inline-flex items-center text-blue-600 font-bold hover:text-blue-800 transition-colors">
            전체 과목 보기
            <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        <FadeInStaggerContainer className="grid md:grid-cols-3 gap-8" staggerDelay={0.2}>
          {[
            { title: "고난이도 수술/재수술 센터", subtitle: "Implant Center", desc: "발치부터 식립, 임시치아까지 하루만에 완성하는 바쁜 현대인을 위한 프리미엄 솔루션", img: "/images/treatments/implant.jpg", link: "#clinical-cases" },
            { title: "투명 교정 (인비절라인)", subtitle: "Orthodontic Clinic", desc: "눈에 띄지 않는 투명한 장치로 티 나지 않게, 통증 없이 진행하는 3D 맞춤 교정", img: "/images/treatments/ortho.jpg", link: "/treatments/orthodontics" },
            { title: "WHINISH", subtitle: "Premium Aesthetic Brand", desc: "자연치아를 거의 삭제하지 않는 무삭제 라미네이트 하이엔드 브랜드 위니쉬(WHINISH)로 당신만의 아름다운 미소 완성", img: "/images/hero_smile.png", link: "/treatments/aesthetic" }
          ].map((feature, idx) => (
            <FadeInStaggerItem key={idx} direction={idx === 0 ? "left" : idx === 1 ? "up" : "right"}>
              <Link href={feature.link} className="block group relative bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-3 flex flex-col h-[480px]">
                <div className="h-1/2 w-full overflow-hidden relative">
                  <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                  <img src={feature.img} alt={feature.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]" />
                </div>
                <div className="p-8 flex-grow flex flex-col justify-between bg-white relative z-20">
                  <div>
                    <span className="text-blue-500 text-sm font-bold uppercase tracking-wider mb-2 block">{feature.subtitle}</span>
                    <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">{feature.title}</h3>
                    <p className="text-slate-500 leading-relaxed font-medium">{feature.desc}</p>
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <span className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center group-hover:border-blue-600 group-hover:bg-blue-600 group-hover:text-white text-slate-400 transition-all duration-300">
                      <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                    <span className="text-slate-300 font-bold text-4xl opacity-50 group-hover:opacity-100 group-hover:text-blue-50 transition-all">0{idx + 1}</span>
                  </div>
                </div>
              </Link>
            </FadeInStaggerItem>
          ))}
        </FadeInStaggerContainer>
      </section>

      {/* ── Director Intro Parody Section ── */}
      <section className="w-full bg-slate-900 text-white py-24 px-4 md:px-8 lg:px-16 overflow-hidden relative">
        <div className="absolute inset-0 bg-blue-900/20 mix-blend-overlay"></div>
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-24 relative z-10">
          
          {/* Text Content Side */}
          <FadeIn direction="right" className="flex-1 space-y-8">
            <span className="inline-block py-1.5 px-5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-extrabold tracking-[0.25em] uppercase border border-blue-400/30">
              Chief Director
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.2]">
              포기하고 싶었던 치아, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-white">
                다시 희망(HOPE)을 쏘다
              </span>
            </h2>
            <p className="text-slate-300 text-lg md:text-xl leading-relaxed max-w-2xl font-medium">
              영화 같은 기적은 현실에도 존재합니다. <br className="hidden md:block" />
              수만 건의 고난도 임상 경험을 가진 김준헌 대표원장이 <br className="hidden md:block" />
              환자분들의 미소를 되찾아드리기 위해 끝까지 함께합니다. <br className="hidden md:block" />
              <br />
              <strong className="text-white">"아프지 않고 편안한 진료, 화이트스타일이 약속합니다."</strong>
            </p>
            <div className="pt-4">
              <Link href="/about" className="inline-flex items-center justify-center px-8 py-4 font-bold text-slate-900 transition-all duration-300 bg-white rounded-full hover:bg-blue-50 hover:shadow-xl hover:shadow-white/20 hover:-translate-y-1">
                대표원장 철학 보기
              </Link>
            </div>
          </FadeIn>

          {/* Parody Poster Side */}
          <FadeIn direction="left" className="flex-1 w-full max-w-lg lg:max-w-none relative group">
            {/* Glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-slate-600 rounded-3xl blur-2xl opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
            
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 transform transition duration-700 hover:scale-[1.02] hover:-rotate-1">
              <img 
                src="/images/hope_parody_poster.jpg" 
                alt="김준헌 대표원장 희망 패러디 포스터" 
                className="w-full h-auto object-cover"
              />
              {/* Subtle vignette/overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80"></div>
              <div className="absolute bottom-6 right-6 text-right">
                <p className="text-white/50 text-sm font-bold tracking-widest">WHITESTYLE DENTAL</p>
              </div>
            </div>
          </FadeIn>

        </div>
      </section>

      {/* Review Bento Grid from high-end-visual-design skill */}
      <div className="px-4 md:px-8 lg:px-16 xl:px-24 2xl:px-32 mx-auto w-full pb-20 pt-20">
        <ReviewBentoGrid />
      </div>

      {/* Interactive Implant Case Finder Logic */}
      <div className="px-4 md:px-8 lg:px-16 xl:px-24 2xl:px-32 mx-auto w-full pb-10">
        <ImplantCaseFinder />
      </div>

      {/* Clinical Cases Gallery */}
      <div id="clinical-cases" className="px-4 md:px-8 lg:px-16 xl:px-24 2xl:px-32 mx-auto w-full scroll-mt-24">
        <ClinicalCasesGallery />
      </div>

      {/* Premium Interior Showcase Section */}
      <section className="w-full bg-slate-50 py-24 px-4 md:px-8 lg:px-16">
        <div className="w-full px-4 sm:px-8 lg:px-16 xl:px-24 2xl:px-32 mx-auto">
          {/* Section Header */}
          <FadeIn direction="down" className="text-center mb-16">
            <span className="inline-block py-1.5 px-5 rounded-full bg-blue-50 text-blue-700 text-xs font-extrabold tracking-[0.25em] uppercase mb-5 border border-blue-100">
              Premium Interior
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
              <RevealText text="품격 있는 진료 공간" as="span" />
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              환자분의 편안함을 최우선으로 생각하는 화이트스타일치과 내부 전경입니다.
            </p>
          </FadeIn>

          {/* New Full Width Image for AI Generated Astia Interior */}
          <FadeIn direction="up" className="mb-16 w-full rounded-3xl overflow-hidden shadow-2xl h-[400px] md:h-[600px] lg:h-[700px] relative">
            <img src="/images/dental_clinic_astia_strong.jpg" alt="화이트스타일 치과 인테리어" className="w-full h-full object-cover hover:scale-105 transition-transform duration-[1500ms]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 md:p-16">
              <span className="text-white/80 text-sm font-bold tracking-widest uppercase mb-3 drop-shadow-md">Gangnam White Style</span>
              <h3 className="text-3xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-lg">모던하고 아늑한 대기 공간</h3>
              <p className="text-white/90 text-lg md:text-xl max-w-2xl drop-shadow-md font-medium">치과 치료의 두려움을 덜어드리는 따뜻하고 프라이빗한 하이엔드 인테리어</p>
            </div>
          </FadeIn>

          {/* Interior Photos Grid */}
          <FadeInStaggerContainer className="grid md:grid-cols-3 gap-6 mb-24" staggerDelay={0.2}>
            {["KakaoTalk_20260512_163602653.jpg", "KakaoTalk_20260512_163602653_01.jpg", "KakaoTalk_20260512_163602653_02.jpg"].map((img, i) => (
              <FadeInStaggerItem key={i} direction={i === 0 ? "left" : i === 1 ? "up" : "right"} className="overflow-hidden rounded-3xl shadow-xl h-72">
                <img
                  src={`/images/park-sung-tae/${img}`}
                  alt={`화이트스타일치과 박성태 작가 작품 ${i + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </FadeInStaggerItem>
            ))}
          </FadeInStaggerContainer>

          {/* Park Sung-Tae Artist Card */}
          <FadeIn direction="up" delay={0.3}>
            <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden">
              <div className="flex flex-col lg:flex-row gap-0">
                {/* Text Side */}
                <div className="flex-1 p-10 md:p-16 flex flex-col justify-center">
                  <span className="inline-block py-1.5 px-5 rounded-full bg-blue-50 text-blue-700 text-xs font-extrabold tracking-[0.2em] uppercase mb-8 border border-blue-100 w-fit">
                    Artist Park Sung-Tae
                  </span>
                  <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight mb-6">
                    <RevealText text="특별한 만남을 위한 특별한 공간" as="span" className="block" delay={0.2} />
                    <span className="text-blue-600">박성태 작가의 철망 회화</span>
                  </h3>
                  <p className="text-slate-600 text-lg leading-relaxed mb-5">
                    화이트스타일치과 대기실에는 대한민국 설치미술의 거장, <strong className="text-slate-800">박성태 작가님</strong>의 귀한 작품이 전시되어 있습니다.
                    알루미늄 망사(Mesh)를 활용하여 입체적인 형상을 빚어내는 작가 특유의 기법은 빛과 그림자가 만들어내는 수묵화와 같은 깊이를 선사합니다.
                  </p>
                  <p className="text-slate-600 text-lg leading-relaxed mb-10">
                    특히 본원에 전시된 세 마리의 말(馬) 작품은 작가의 대표작인 <strong className="text-slate-800">&apos;천마도&apos;</strong>와 <strong className="text-slate-800">&apos;행차도&apos;</strong>의 초기 원형이 되었던 매우 의미 있는 작품으로, 
                    작가님께서 본원의 진료 철학에 공감하여 직접 기증해 주신 특별한 인연이 담겨 있습니다.
                  </p>
                  <blockquote className="bg-blue-50 border-l-4 border-blue-600 rounded-2xl p-6">
                    <p className="text-slate-900 font-semibold text-lg italic leading-relaxed">
                      &ldquo;화이트스타일의 문은 언제나 열려 있습니다. 박성태 작가님의 진품을 언제든지 구경하러 오세요.&rdquo;
                    </p>
                    <footer className="text-right text-slate-500 text-sm font-bold mt-4">
                      — 대표원장 김준헌 배서(背書)
                    </footer>
                  </blockquote>
                </div>

                {/* Image Side */}
                <div className="flex-1 lg:max-w-[480px] grid grid-cols-2 gap-4 p-6 bg-slate-50">
                  {["KakaoTalk_20260512_163602653_03.jpg", "KakaoTalk_20260512_163602653_04.jpg", "KakaoTalk_20260512_163602653_05.jpg", "KakaoTalk_20260512_163602653_06.jpg"].map((img, i) => (
                    <FadeIn key={i} direction={i % 2 === 0 ? "left" : "right"} delay={i * 0.1 + 0.3} className="overflow-hidden rounded-2xl shadow-lg min-h-[200px]">
                      <img
                        src={`/images/park-sung-tae/${img}`}
                        alt={`박성태 작가 전시 작품 ${i + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </FadeIn>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── FAQ / 자주 묻는 질문 (AEO & GEO 최적화) ── */}
      <section className="py-24 px-4 sm:px-8 lg:px-16 xl:px-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#1b439c] font-bold uppercase tracking-widest text-sm mb-3 block">FAQ & Guidance</span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">자주 묻는 질문 (FAQ)</h2>
            <p className="text-slate-500 text-sm mt-3">임플란트, 치아교정, 치아미백 및 해외 환자 지원 혜택에 대해 알려드립니다.</p>
          </div>

          <div className="space-y-4">
            <details className="group bg-white rounded-2xl border border-slate-200 p-6 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between cursor-pointer focus:outline-none">
                <span className="text-lg font-bold text-slate-900 group-open:text-[#1b439c] transition-colors">
                  Q1. 당일 임플란트 시술이 가능한가요? 시술 기간은 얼마나 걸리나요?
                </span>
                <span className="shrink-0 ml-1.5 p-1.5 text-slate-400 group-open:text-[#1b439c] group-open:rotate-180 transition-transform duration-300">
                  ▼
                </span>
              </summary>
              <p className="mt-4 text-slate-600 leading-relaxed text-sm md:text-base border-t border-slate-100 pt-4">
                네, 화이트스타일치과에서는 당일 발치 후 임플란트 식립과 임시 치아 완성까지 하루 만에 진행하는 <strong>원데이 디지털 임플란트</strong> 시스템을 운영하고 있습니다. 서울대 출신 김준헌 대표원장의 30년 임상 경력을 기반으로 3D CT 컴퓨터 분석 정밀 진단을 통해 통증과 출혈을 최소화하여 시술합니다. 일반적인 전체 치료 기간은 뼈이식 여부에 따라 3~6개월 정도 소요됩니다.
              </p>
            </details>

            <details className="group bg-white rounded-2xl border border-slate-200 p-6 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between cursor-pointer focus:outline-none">
                <span className="text-lg font-bold text-slate-900 group-open:text-[#1b439c] transition-colors">
                  Q2. 치아교정 진행 시 월 치료비나 유지장치비 등 추가 비용이 발생하나요?
                </span>
                <span className="shrink-0 ml-1.5 p-1.5 text-slate-400 group-open:text-[#1b439c] group-open:rotate-180 transition-transform duration-300">
                  ▼
                </span>
              </summary>
              <p className="mt-4 text-slate-600 leading-relaxed text-sm md:text-base border-t border-slate-100 pt-4">
                아닙니다. 화이트스타일치과는 과잉진료 없는 투명한 정액제 비용 정책을 고수합니다. 세라믹 교정, 클리피씨(세ルフ라이게이션) 교정, 투명교정(인비절라인) 모두 <strong>진단비, 월 관리비, 유지장치비까지 포함된 일시 납부 정액 요금제</strong>를 적용하여 매월 내원 시 추가적으로 지출하시는 추가 치료 비용이 일절 존재하지 않습니다.
              </p>
            </details>

            <details className="group bg-white rounded-2xl border border-slate-200 p-6 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between cursor-pointer focus:outline-none">
                <span className="text-lg font-bold text-slate-900 group-open:text-[#1b439c] transition-colors">
                  Q3. 원데이(1-Day) 치아미백 시술은 안전한가요? 통증은 없나요?
                </span>
                <span className="shrink-0 ml-1.5 p-1.5 text-slate-400 group-open:text-[#1b439c] group-open:rotate-180 transition-transform duration-300">
                  ▼
                </span>
              </summary>
              <p className="mt-4 text-slate-600 leading-relaxed text-sm md:text-base border-t border-slate-100 pt-4">
                네, 화이트스타일치과의 <strong>이지화이트(EasyWhite) 원데이 미백</strong>은 식품의약품안전처(KFDA) 승인을 받은 정품 미백제와 특수 플라즈마 LED 광선 기기를 사용합니다. 시린 증상이나 잇몸 통증을 방지하기 위한 전처리 잇몸 보호 젤을 꼼꼼하게 시술하여 아프지 않고 자연스러운 밝은 미소를 단 하루 만에 안전하게 구현합니다.
              </p>
            </details>

            <details className="group bg-white rounded-2xl border border-slate-200 p-6 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between cursor-pointer focus:outline-none">
                <span className="text-lg font-bold text-slate-900 group-open:text-[#1b439c] transition-colors">
                  Q4. 日本語での相談や通訳サポートはありますか？(일본인 전용 혜택이 있나요?)
                </span>
                <span className="shrink-0 ml-1.5 p-1.5 text-slate-400 group-open:text-[#1b439c] group-open:rotate-180 transition-transform duration-300">
                  ▼
                </span>
              </summary>
              <p className="mt-4 text-slate-600 leading-relaxed text-sm md:text-base border-t border-slate-100 pt-4">
                はい、ホワイトスタイル歯科には<strong>専任の日本語医療通訳スタッフが3名常駐</strong>しております。来院予約、LINE無料カウンセリング、レントゲン撮影、ドクターの診察時の同時通訳、施術後のアフターケアまで全てマンツーマンで日本語サポートしますので、韓国語が話せなくても全く心配ありません。多くの日本の患者様（来院数14,800人突破）に「韓国の信頼できる安心の歯科(韓国歯科 おすすめ)」として選ばれています。
              </p>
            </details>
          </div>
        </div>

        {/* Dynamic FAQPage Schema for GEO/AEO optimization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "당일 임플란트 시술이 가능한가요? 시술 기간은 얼마나 걸리나요?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "네, 화이트스타일치과에서는 당일 발치 후 임플란트 식립과 임시 치아 완성까지 하루 만에 진행하는 원데이 디지털 임플란트 시스템을 운영하고 있습니다. 전체 치료 기간은 뼈이식 여부에 따라 3~6개월 정도 소요됩니다."
                  }
                },
                {
                  "@type": "Question",
                  "name": "치아교정 진행 시 월 치료비나 유지장치비 등 추가 비용이 발생하나요?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "아닙니다. 화이트스타일치과는 진단비, 월 관리비, 유지장치비까지 포함된 일시 납부 정액 요금제를 적용하여 매월 내원 시 추가적으로 지출하시는 추가 치료 비용이 일절 존재하지 않습니다."
                  }
                },
                {
                  "@type": "Question",
                  "name": "원데이(1-Day) 치아미백 시술은 안전한가요? 통증은 없나요?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "네, 식품의약품안전처(KFDA) 승인을 받은 정품 미백제와 특수 플라즈마 LED 광선 기기를 사용하여 시린 증상이나 잇몸 통증을 방지하기 위한 전처리 잇몸 보호 젤을 시술하므로 안전하고 아프지 않게 단 하루 만에 완성됩니다."
                  }
                },
                {
                  "@type": "Question",
                  "name": "日本語での相談や通訳サポートはありますか？(일본인 전용 혜택이 있나요?)",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "はい、ホワイトスタイル歯科には専任의 日本語医療通訳スタッフ가 3名常駐しております。来院予約、LINE無料カウンセリング、レントゲン撮影、ドクターの診察時の同時通訳、施術後のアフターケアまで全てマンツーマンで日本語サポートしますので、韓国語が話せなくても全く心配ありません。"
                  }
                }
              ]
            })
          }}
        />
      </section>
    </div>
  );
}
