import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import { Providers } from "@/components/Providers";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://whitestyle.com"),
  title: {
    default: "화이트스타일치과 | 강남역 11·12번출구 프리미엄 임플란트·치아교정·심미치료",
    template: "%s | 화이트스타일치과"
  },
  description: "강남 30년 전통 서울대 출신 김준헌 대표원장 직진료. 디지털 임플란트, 무삭제 라미네이트, 치아교정, 원데이 치아미백, 의료법 준수 안심치과.",
  keywords: ["화이트스타일치과", "강남치과", "강남역치과", "강남임플란트", "강남치아교정", "무삭제라미네이트", "강남치아미백", "서울대치과원장"],
  openGraph: {
    title: "화이트스타일치과 | 강남 프리미엄 임플란트 & 치아교정",
    description: "30년 임상 노하우 서울대 출신 김준헌 대표원장의 아프지 않고 자연스러운 정직한 진료.",
    url: "https://whitestyle.com",
    siteName: "화이트스타일치과",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "화이트스타일치과 강남 본점"
      }
    ]
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="/fonts/pretendard/pretendardvariable-dynamic-subset.css" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Dentist",
                  "@id": "https://whitestyle.com/#dentist",
                  "name": "화이트스타일치과의원 (WhiteStyle Dental Clinic)",
                  "alternateName": ["강남 화이트스타일치과", "WhiteStyle Dental", "WHINISH Dental Clinic"],
                  "url": "https://whitestyle.com",
                  "logo": "https://whitestyle.com/images/병원-로고.png",
                  "image": "https://whitestyle.com/images/og-image.jpg",
                  "description": "강남역 11번·12번 출구 도보 2분(143m), 30년 전통 6만 환자가 선택한 서울대 치의학 박사 김준헌 대표원장 직진료. 고난도 뼈이식 임플란트, 무삭제 라미네이트(휘니쉬), 인비절라인 치아교정, 원데이 치아미백.",
                  "telephone": "02-569-7528",
                  "priceRange": "$$",
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "강남대로 92길 17 대승빌딩 1,2층",
                    "addressLocality": "강남구",
                    "addressRegion": "서울특별시",
                    "postalCode": "06129",
                    "addressCountry": "KR"
                  },
                  "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": 37.4994,
                    "longitude": 127.0276
                  },
                  "openingHoursSpecification": [
                    {
                      "@type": "OpeningHoursSpecification",
                      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                      "opens": "10:00",
                      "closes": "19:00"
                    },
                    {
                      "@type": "OpeningHoursSpecification",
                      "dayOfWeek": "Saturday",
                      "opens": "10:00",
                      "closes": "14:00"
                    }
                  ],
                  "contactPoint": [
                    {
                      "@type": "ContactPoint",
                      "telephone": "+82-2-569-7528",
                      "contactType": "customer service",
                      "availableLanguage": ["Korean", "Japanese", "English"]
                    }
                  ],
                  "medicalSpecialty": [
                    "http://en.wikipedia.org/wiki/Orthodontics",
                    "http://en.wikipedia.org/wiki/Cosmetic_dentistry",
                    "http://en.wikipedia.org/wiki/Dental_implant",
                    "http://en.wikipedia.org/wiki/Prosthodontics"
                  ],
                  "founder": {
                    "@id": "https://whitestyle.com/#doctor"
                  },
                  "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "4.9",
                    "reviewCount": "62000",
                    "bestRating": "5"
                  },
                  "sameAs": [
                    "https://www.whinish.com",
                    "https://map.naver.com/v5/search/%ED%99%94%EC%9D%B4%ED%8A%B8%EC%8A%A4%ED%83%80%EC%9D%BC%EC%B9%98%EA%B3%BC",
                    "https://pf.kakao.com/_Vtxdwl",
                    "https://booking.naver.com/booking/13/bizes/265482",
                    "https://youtu.be/PioB4UzBSLY"
                  ]
                },
                {
                  "@type": "Physician",
                  "@id": "https://whitestyle.com/#doctor",
                  "name": "김준헌",
                  "jobTitle": "화이트스타일치과의원 병원장 / 치의학 박사",
                  "worksFor": {
                    "@id": "https://whitestyle.com/#dentist"
                  },
                  "alumniOf": [
                    "서울대학교 치과대학",
                    "단국대학교 대학원 치의학박사 (치과교정학)"
                  ],
                  "description": "35년 임상경력, 60,000명 이상의 환자를 성공적으로 치료한 치과교정학 및 임플란트 권위자. MBC 뉴스데스크 메인 방송 출연 및 기획재정부 장관상 수상.",
                  "award": [
                    "기획재정부 장관상",
                    "국민건강보험공단 구강검진 최고 S등급",
                    "모범납세자상"
                  ],
                  "sameAs": "https://www.whinish.com"
                },
                {
                  "@type": "FAQPage",
                  "@id": "https://whitestyle.com/#faq",
                  "mainEntity": [
                    {
                      "@type": "Question",
                      "name": "강남역 화이트스타일치과의 주요 전문 진료 분야는 무엇인가요?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "화이트스타일치과는 35년 경력의 서울대 출신 김준헌 대표원장이 직접 진료하며, 고난도 뼈이식 임플란트, 무삭제 라미네이트(휘니쉬 WHINISH), 인비절라인 치아교정, 원데이 전문가 치아미백, 턱관절 치료를 중점 진료합니다."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "치아를 깎지 않는 무삭제 라미네이트(휘니쉬) 시술이 가능한가요?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "네, 자연치아를 거의 삭제하지 않거나 0.1~0.2mm 초극미세 수준으로 다듬어 치아 손상과 시림 부작용 없이 영구적이고 자연스러운 미소를 완성하는 특화 라미네이트 시술을 진행합니다."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "고령자나 잇몸뼈가 부족한 경우에도 임플란트가 가능한가요?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "3D CT 정밀 진단과 자가골/동종골 뼈이식 테크닉을 결합하여, 잇몸뼈가 심하게 소실된 고난도 케이스나 무치악 전악 임플란트도 안전하게 식립 가능합니다."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "치과 위치와 주차 지원은 어떻게 되나요?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "2호선·신분당선 강남역 11번 또는 12번 출구에서 도보 2분(143m) 거리 대승빌딩 1,2층에 위치하며, 내원 환자분들을 위한 무료 주차(비전타워 주차장)를 전액 지원합니다."
                      }
                    }
                  ]
                }
              ]
            })
          }}
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col relative" suppressHydrationWarning>
        <Providers>
          {/* Background decorative elements */}
          <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-[#e7f5ff] to-transparent -z-10" />

          {/* Glassmorphism Navigation */}
          <Navbar />

          {/* Main Content Area */}
          <main className="flex-grow w-full relative">
            {children}
          </main>

          {/* Footer with Medical Law Compliance Disclaimer */}
          <footer className="mt-auto border-t border-slate-200 bg-slate-900 text-slate-400 py-12 px-4 sm:px-8 text-center text-xs leading-relaxed">
            <div className="max-w-5xl mx-auto space-y-3">
              <p className="font-bold text-slate-300 text-sm">
                화이트스타일치과의원 | 대표원장: 김준헌 | 사업자등록번호: 214-10-85942 | TEL: 02-569-7528
              </p>
              <p className="text-slate-400">
                서울특별시 강남구 강남대로 92길 17 대승빌딩 1,2층 (강남역 11번·12번 출구 도보 2분)
              </p>
              <p className="text-slate-500 text-[11px] pt-4 border-t border-slate-800 leading-normal">
                [의료법 제56조 준수 안내] 본 웹사이트의 모든 치료후기 및 전후사진은 의료법 제56조를 준수하여 회원 로그인 후 공개됩니다.<br className="hidden sm:inline" /> 
                모든 시술 및 수술은 개개인의 체질과 증상에 따라 차이가 있을 수 있으며 출혈, 통증, 감염, 부종 등의 부작용이 발생할 수 있으므로 전문 의료진과 충분한 상담 후 진행하시기 바랍니다.
              </p>
              <p className="text-slate-600 text-[11px]">© 2026 화이트스타일치과. All rights reserved.</p>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
