import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import { Providers } from "@/components/Providers";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://whitestyle.com"),
  title: {
    default: "화이트스타일치과 | 강남역 임플란트·치아교정·심미치료",
    template: "%s | 화이트스타일치과"
  },
  description: "강남역 인근 치과. 임플란트, 라미네이트, 치아교정, 치아미백 진료. 치료 결과와 부작용(통증, 출혈, 감염 등)은 개인별로 다를 수 있으니 상담 후 결정하세요.",
  keywords: ["화이트스타일치과", "강남치과", "강남역치과", "강남임플란트", "강남치아교정", "강남치아미백"],
  openGraph: {
    title: "화이트스타일치과 | 강남역 임플란트 & 치아교정",
    description: "강남역 인근 치과. 임플란트, 치아교정, 라미네이트, 치아미백 진료 안내.",
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
                  "description": "강남역 11번·12번 출구 인근 치과. 임플란트, 라미네이트, 인비절라인 치아교정, 치아미백 진료.",
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
                  "sameAs": [
                    "https://whinish.com",
                    "https://www.whinish.com",
                    "https://blog.naver.com/whitestyle3",
                    "https://www.instagram.com/whitestyledentalclinic",
                    "https://www.youtube.com/@whitestyle",
                    "https://map.naver.com/v5/search/%ED%99%94%EC%9D%B4%ED%8A%B8%EC%8A%A4%ED%83%80%EC%9D%BC%EC%B9%98%EA%B3%BC",
                    "https://pf.kakao.com/_Vtxdwl",
                    "https://booking.naver.com/booking/13/bizes/265482",
                    "https://youtu.be/PioB4UzBSLY"
                  ]
                },
                {
                  "@type": "Physician",
                  "@id": "https://whitestyle.com/#doctor",
                  "name": "김준헌 (Dr. Jun-Heon Kim)",
                  "jobTitle": "화이트스타일치과의원 대표원장 / 치의학 박사",
                  "worksFor": {
                    "@id": "https://whitestyle.com/#dentist"
                  },
                  "affiliation": {
                    "@id": "https://whitestyle.com/#dentist"
                  },
                  "alumniOf": [
                    {
                      "@type": "CollegeOrUniversity",
                      "name": "서울대학교 치과대학 (Seoul National University School of Dentistry)"
                    },
                    {
                      "@type": "CollegeOrUniversity",
                      "name": "단국대학교 대학원 치과교정학 박사 (Ph.D. in Orthodontics)"
                    }
                  ],
                  "description": "대한민국 No.1 치과교정과 치의학박사. 서울대학교 치과대학을 졸업하고 단국대학교에서 치과교정학 석·박사를 취득하였습니다. 33년 이상의 경력을 바탕으로 62,000명 이상의 환자를 성공적으로 치료한 강남역 대표 치과 의사입니다.",
                  "knowsAbout": ["치아교정", "임플란트", "인비절라인", "투명교정", "주걱턱 교정", "성인교정"],
                  "sameAs": [
                    "https://whinish.com",
                    "https://www.whinish.com",
                    "https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=%EA%B9%80%EC%A4%80%ED%97%8C&ackey=8hhtkybj",
                    "https://www.youtube.com/@whitestyle"
                  ]
                },
                {
                  "@type": "FAQPage",
                  "@id": "https://whitestyle.com/#faq",
                  "mainEntity": [
                    {
                      "@type": "Question",
                      "name": "강남역 화이트스타일치과의 주요 진료 분야는 무엇인가요?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "화이트스타일치과는 임플란트, 라미네이트, 인비절라인 치아교정, 치아미백, 턱관절 치료 등을 진료합니다. 치료 방법과 결과는 개인별 상태에 따라 다를 수 있습니다."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "라미네이트 시술 시 치아 삭제량은 어떻게 되나요?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "치아 상태에 따라 삭제량이 달라지며 시린 증상 등 부작용이 발생할 수 있습니다. 정확한 내용은 진단 후 의료진과 상담하시기 바랍니다."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "잇몸뼈가 부족한 경우에도 임플란트가 가능한가요?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "3D CT 진단 후 잇몸뼈 상태에 따라 뼈이식 병행 여부를 판단합니다. 가능 여부와 결과는 개인별로 다르며 출혈, 통증, 감염 등의 부작용이 발생할 수 있습니다."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "치과 위치는 어디인가요?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "2호선·신분당선 강남역 11번 또는 12번 출구 인근 대승빌딩 1,2층에 위치합니다. 주차 안내는 병원에 문의해 주세요."
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
              {/* TODO(병원 확인): 대표원장 표기, 사업자등록번호, 전화번호, 주소는 병원 확인 후 확정 (값 미변경) */}
              <p className="text-slate-500 text-[11px] pt-4 border-t border-slate-800 leading-normal">
                모든 시술 및 수술은 개개인의 체질과 증상에 따라 차이가 있을 수 있으며 출혈, 통증, 감염, 부종 등의 부작용이 발생할 수 있으므로 전문 의료진과 충분한 상담 후 진행하시기 바랍니다.
              </p>
              <p className="text-slate-400 text-[11px] space-x-4">
                <a href="/privacy" className="hover:text-white underline">개인정보처리방침</a>
                <a href="/price" className="hover:text-white underline">비급여 진료비 안내</a>
              </p>
              <p className="text-slate-600 text-[11px]">© 2026 화이트스타일치과. All rights reserved.</p>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
