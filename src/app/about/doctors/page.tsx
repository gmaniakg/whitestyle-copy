import React from 'react';
import { FadeIn, FadeInStaggerContainer, FadeInStaggerItem } from '@/components/animations/FadeIn';
import { RevealText } from '@/components/animations/RevealText';

const doctors = [
  {
    name: '이봉진',
    title: '대표원장',
    image: '/images/doctors/lee_bong_jin.png',
    shapeClass: 'rounded-t-[8rem] rounded-b-3xl',
    bgColorClass: 'bg-slate-200',
    cv: [
      '연세대학교 치과대학 졸업',
      '연세대학교 수련',
      '대한구강악안면임플란트학회 정회원',
      '대한치과이식임플란트학회 정회원',
      '대한치과보철학회 정회원',
      '대한턱관절교합학회 정회원'
    ]
  },
  {
    name: '김준헌',
    title: '병원장',
    image: '/images/doctors/kim_jun_heon.png',
    shapeClass: 'rounded-[4rem]',
    bgColorClass: 'bg-blue-100',
    cv: [
      '서울대학교 치과대학',
      '단국대 교정과 치의학박사',
      'Goteborg University',
      'Vasteras 구강외과방문의',
      '유럽임플란트학회 정회원',
      '미국임플란트학회 정회원',
      '대한치과보철학회 정회원',
      '대한치과교정학회 정회원',
      '대한치과교정학회 인정의',
      '前 교정과 외래교수',
      '現 화이트스타일치과 병원장'
    ]
  },
  {
    name: '박선혜',
    title: '원장 · 치주과 전문의',
    image: '/images/doctors/park_seon_hye.png',
    shapeClass: 'rounded-tl-[5rem] rounded-br-[5rem] rounded-tr-2xl rounded-bl-2xl',
    bgColorClass: 'bg-orange-100',
    cv: [
      '치주과 박사 수료',
      '대한치주과학회 전문의 및 정회원',
      '대한치과보철학회 정회원',
      '대한턱관절교합학회 정회원',
      '대한치과보철학회 우수보철치과의사',
      'Upen endo',
      'Ivoclar contemporary adhesion and aesthetic restoration',
      'SHINHUNG composite hands-on corse',
      'APEX endo'
    ]
  }
];

export default function DoctorsPage() {
  return (
    <div className="py-24 px-4 sm:px-8 lg:px-16 xl:px-24 2xl:px-32 w-full mx-auto min-h-screen">
      {/* Header Section */}
      <FadeIn direction="down" className="flex flex-col items-center mb-24 text-center">
        <span className="rounded-full px-5 py-1.5 text-xs uppercase tracking-[0.25em] font-extrabold bg-blue-50 text-blue-700 mb-6 border border-blue-100">
          WhiteStyle Medical Team
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
          <RevealText text="신뢰할 수 있는 의료진" as="span" />
        </h1>
        <p className="text-xl text-slate-500 font-medium">
          바르게 보는 의사, 오래 가는 좋은 치과
        </p>
      </FadeIn>

      {/* Doctors Grid - Awake Agency Style */}
      <FadeInStaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-20">
        {doctors.map((doctor, idx) => (
          <FadeInStaggerItem key={idx} direction={idx === 0 ? "left" : idx === 1 ? "up" : "right"} className="flex flex-col items-center">
            
            {/* Image Container with Awake Agency interactions */}
            <div className="group block w-full relative mb-10">
              <div className={`w-full aspect-[3/4] relative overflow-hidden transition-all duration-500 group-hover:-translate-y-4 group-hover:shadow-2xl ${doctor.shapeClass} ${doctor.bgColorClass} p-1`}>
                <div className={`w-full h-full overflow-hidden relative ${doctor.shapeClass} bg-white`}>
                  <img 
                    src={doctor.image} 
                    alt={doctor.name} 
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] grayscale group-hover:grayscale-0 mix-blend-luminosity group-hover:mix-blend-normal" 
                  />
                  {/* Subtle Gradient Overlay for depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay"></div>
                </div>
              </div>
            </div>

            {/* Doctor Info */}
            <div className="w-full text-center mb-8 relative z-10">
              {doctor.website ? (
                <a 
                  href={doctor.website} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group/link inline-block hover:-translate-y-1 transition-transform duration-300 relative"
                >
                  <div className="flex items-center justify-center gap-1.5 mb-2">
                    <h2 className="text-3xl font-extrabold text-slate-900 group-hover/link:text-blue-600 transition-colors">{doctor.name}</h2>
                    <svg className="w-5 h-5 text-slate-400 group-hover/link:text-blue-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-blue-600 group-hover/link:text-blue-700">{doctor.title}</h3>
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <span className="inline-block text-xs font-semibold text-blue-600 bg-blue-50/80 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm opacity-0 group-hover/link:opacity-100 transition-opacity duration-300 border border-blue-100">
                      개인 포트폴리오 보기
                    </span>
                  </div>
                </a>
              ) : (
                <>
                  <h2 className="text-3xl font-extrabold text-slate-900 mb-3">{doctor.name}</h2>
                  <h3 className="text-lg font-bold text-blue-600">{doctor.title}</h3>
                </>
              )}
            </div>

            {/* Curriculum Vitae (CV) - Shown below the image */}
            <div className="w-full bg-slate-50 rounded-3xl p-8 border border-slate-100 shadow-sm flex-1">
              <ul className="space-y-3">
                {doctor.cv.map((line, i) => (
                  <li key={i} className="flex items-start text-slate-600 text-[15px] leading-relaxed">
                    <span className="mr-3 text-blue-400 mt-1">•</span>
                    <span className="font-medium">{line}</span>
                  </li>
                ))}
              </ul>
            </div>

          </FadeInStaggerItem>
        ))}
      </FadeInStaggerContainer>
    </div>
  );
}
