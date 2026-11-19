import type { Metadata } from "next";
import Script from "next/script";
import Navbar from "@/components/Navbar";
import { Providers } from "@/components/Providers";
import "./globals.css";

const clinicJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": [
        "Dentist",
        "MedicalClinic",
        "LocalBusiness",
        "MedicalOrganization"
      ],
      "@id": "https://whitestyle.com/#org",
      "name": "화이트스타일치과의원 (WhiteStyle Dental Clinic)",
      "alternateName": [
        "화이트스타일치과",
        "강남역 화이트스타일치과",
        "강남역 화이트스타일치과의원",
        "ソウル江南 ホワイトスタイル歯科",
        "ホワイトスタイル歯科",
        "WhiteStyle Dental Clinic Gangnam",
        "WhiteStyle白尚齿科",
        "白尚齿科",
        "WHINISH Dental Clinic"
      ],
      "foundingDate": "1994-08-09",
      "slogan": "1994년 개원 33년 전통 · 치의학박사 김준헌 병원장 · 이봉진 대표원장 · 박선혜 원장(보건복지부 인증 치주과 전문의) 3인 협진 · 일본어 전담 코디네이터 3명 상주",
      "image": "https://whitestyle.com/mbc_interview_new.jpg",
      "logo": "https://whitestyle.com/data/file/mir_member/3731727122_8ElZ59dz_20200226_NEWEBA19CEAB3A0_ED8C8CEBB984ECBD98.ico",
      "url": "https://whitestyle.com/",
      "telephone": [
        "+82-1577-7287",
        "+82-2-569-7528",
        "+82-10-3046-5010"
      ],
      "email": "white@whitestyle.com",
      "priceRange": "$$",
      "currenciesAccepted": "KRW",
      "paymentAccepted": [
        "현금",
        "신용카드",
        "계좌이체",
        "삼성페이"
      ],
      "description": "강남역 11번·12번 출구 도보 1분(143m), 1994년 개원 이래 33년 전통(누적 62,000명 이상 임상 증례)을 이어온 화이트스타일치과의원입니다. 서울대졸, 단국대 외래교수, 교정학 박사 김준헌 병원장, 연세대 치대 출신 이봉진 대표원장, 보건복지부 인증 치주과 전문의 박선혜 원장 3인 원장단이 고난도 뼈이식·당일 임플란트, 인비절라인·설측·재교정, 최소삭제 심미보철(제로쉘·휘니쉬), 치주과 전문 잇몸치료를 1:1 책임 협진합니다. 일본어 전담 코디네이터 3명 상주(創業33年・日本語通訳スタッフ3名常駐).",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "강남대로92길 17 (역삼동 819-10) 대승빌딩 B1·1·2층",
        "addressLocality": "강남구",
        "addressRegion": "서울특별시",
        "postalCode": "06134",
        "addressCountry": "KR"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 37.4988802,
        "longitude": 127.0286304
      },
      "hasMap": [
        "https://www.google.com/maps/search/?api=1&query=%ED%99%94%EC%9D%B4%ED%8A%B8%EC%8A%A4%ED%83%80%EC%9D%BC%EC%B9%98%EA%B3%BC%EC%9D%98%EC%9B%90+%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C+%EA%B0%95%EB%82%A8%EA%B5%AC+%EA%B0%95%EB%82%A8%EB%8C%80%EB%A1%9C92%EA%B8%B8+17",
        "https://www.google.com/maps?q=37.4988802,127.0286304",
        "https://www.google.com/maps/search/?api=1&query=WhiteStyle+Dental+Clinic+17+Gangnam-daero+92-gil+Gangnam-gu+Seoul",
        "https://www.google.com/maps/search/?api=1&hl=ja&query=%E3%83%9B%E3%83%AF%E3%82%A4%E3%83%88%E3%82%B9%E3%82%BF%E3%82%A4%E3%83%AB%E6%AD%AF%E7%A7%91+%E6%B1%9F%E5%8D%97",
        "https://api.map.baidu.com/marker?location=37.4988802,127.0286304&title=WhiteStyle%E7%99%BD%E5%B0%9A%E9%BD%BF%E7%A7%91&content=%E9%A6%96%E5%B0%94%E7%89%B9%E5%88%AB%E5%B8%82%E6%B1%9F%E5%8D%97%E5%8C%BA%E6%B1%9F%E5%8D%97%E5%A4%A7%E8%B7%AF92%E8%A1%9717&output=html&coord_type=wgs84",
        "https://map.naver.com/p/entry/place/11566039"
      ],
      "areaServed": [
        {
          "@type": "AdministrativeArea",
          "name": "서울특별시 강남구 역삼동·강남역"
        },
        {
          "@type": "Country",
          "name": "대한민국 (KR)"
        },
        {
          "@type": "Country",
          "name": "일본 (JP)"
        }
      ],
      "founder": {
        "@id": "https://whitestyle.com/#doctor-kim-junheon"
      },
      "employee": [
        {
          "@id": "https://whitestyle.com/#doctor-kim-junheon"
        },
        {
          "@id": "https://whitestyle.com/#doctor-lee-bongjin"
        },
        {
          "@id": "https://whitestyle.com/#doctor-park-seonhye"
        }
      ],
      "availableService": [
        {
          "@id": "https://whitestyle.com/#procedure-orthodontics"
        },
        {
          "@id": "https://whitestyle.com/#procedure-prosthodontics"
        },
        {
          "@id": "https://whitestyle.com/#procedure-implant"
        }
      ],
      "sameAs": [
        "https://www.whitestyle.com",
        "https://www.whitestyle.com/ja",
        "https://www.whitestyle.com/?mir_code=12187",
        "https://whinish.com",
        "https://www.whinish.com",
        "https://whitestyle.com/ai-pet/",
        "https://whitestyle.com/ai-pet/download.html",
        "https://whitestyle.com/ai-pet/ja/",
        "https://whitestyle.com/whitebook",
        "https://whitestyle-xi.vercel.app",
        "https://whitestyle-xi.vercel.app/about/japan-landing",
        "https://whitestyle-copy.vercel.app",
        "https://whitestyledental.wordpress.com",
        "https://whitestyledental.tistory.com",
        "https://www.modoodoc.com/hospital/3940/%ED%99%94%EC%9D%B4%ED%8A%B8%EC%8A%A4%ED%83%80%EC%9D%BC%EC%B9%98%EA%B3%BC%EC%9D%98%EC%9B%90-%EC%84%9C%EC%9A%B8-%EC%97%AD%EC%82%BC%EB%8F%99/",
        "https://www.goodoc.co.kr/hospitals/43229",
        "https://my-doctor.io/hospital/detail?hospital_id=55822",
        "https://blog.naver.com/whitestyle3",
        "https://blog.naver.com/whitestyle94",
        "https://www.instagram.com/whitestylejp",
        "https://www.instagram.com/whitestyledentalclinic",
        "https://www.instagram.com/whitestyle_dental",
        "https://www.threads.com/@whitestyle_dental",
        "https://www.youtube.com/@whitestyle",
        "https://www.tiktok.com/@whitestyle_dental",
        "https://x.com/chigwagang89847",
        "https://pf.kakao.com/_Vtxdwl",
        "https://new.smartplace.naver.com/bizes/place/34892",
        "https://booking.naver.com/booking/13/bizes/265482"
      ],
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Friday"
          ],
          "opens": "10:00",
          "closes": "19:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Saturday"
          ],
          "opens": "10:00",
          "closes": "14:00"
        }
      ],
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+82-1577-7287",
          "email": "white@whitestyle.com",
          "contactType": "customer service",
          "availableLanguage": [
            "Korean",
            "Japanese",
            "English"
          ]
        },
        {
          "@type": "ContactPoint",
          "telephone": "+82-2-569-7528",
          "email": "white@whitestyle.com",
          "contactType": "reservations",
          "availableLanguage": [
            "Korean",
            "Japanese",
            "English"
          ]
        },
        {
          "@type": "ContactPoint",
          "telephone": "+82-10-3046-5010",
          "email": "white@whitestyle.com",
          "contactType": "Japanese Interpreter Direct Hotline (일본어 통역 직통 / 日本語通訳スタッフ直通)",
          "availableLanguage": [
            "Japanese",
            "Korean"
          ]
        }
      ],
      "medicalSpecialty": [
        "Dentistry",
        "Orthodontics",
        "Prosthodontics",
        "Periodontics",
        "Oral and Maxillofacial Implantology"
      ],
      "knowsAbout": [
        "고난도 뼈이식 임플란트 (GBR·상악동거상술)",
        "투데이 당일 임플란트 및 무치악 전체 임플란트",
        "임플란트 재수술",
        "치아교정 (인비절라인 투명교정·설측교정·비발치교정·재교정)",
        "무삭제·최소삭제 라미네이트 (제로쉘·휘니쉬)",
        "치주과 전문의 중증 잇몸치료 및 잇몸성형",
        "원데이 전문가 치아미백 및 연 1회 건강보험 스케일링",
        "일본 방한 환자 전담 치과 진료 (日本語通訳スタッフ3名常駐)",
        "만 65세 이상 건강보험 임플란트 (평생 2개 본인부담률 30%) 및 심평원 비급여 정품 보증",
        "보건복지부 인증 치주과 전문의 박선혜 원장 임플란트 주위염·중증 치주치료 3·6·12개월 정기 리콜",
        "화타펫 (HwataPet · 하야니) 24시간 3D AI 덴탈 케어 프렌드"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://whitestyle.com/#website",
      "url": "https://whitestyle.com/",
      "name": "화이트스타일치과의원 (WhiteStyle Dental Clinic | ソウル江南 ホワイトスタイル歯科)",
      "alternateName": [
        "화이트스타일치과",
        "강남역 화이트스타일치과",
        "강남 화이트스타일치과의원",
        "WhiteStyle Dental Clinic",
        "ソウル江南 ホワイトスタイル歯科"
      ],
      "inLanguage": [
        "ko",
        "ja",
        "en"
      ],
      "speakable": {
        "@type": "SpeakableSpecification",
        "cssSelector": [
          "h1",
          "h2",
          ".clinical-lead-sentence",
          ".clinical-faq-answer"
        ]
      },
      "publisher": {
        "@id": "https://whitestyle.com/#org"
      }
    },
    {
      "@type": "Physician",
      "@id": "https://whitestyle.com/#doctor-kim-junheon",
      "name": "김준헌 (Dr. Jun-Heon Kim / キム・ジュンホン)",
      "jobTitle": "병원장 / 치의학박사",
      "description": "화이트스타일치과의원 병원장. 서울대학교 치과대학을 졸업(서울대졸)하고 단국대학교 외래교수 및 치과교정학 석·박사(교정학 박사)를 역임·취득하였습니다. 스웨덴 예테보리 대학교(Göteborg Univ.) 및 베스테로스 구강외과 방문의를 역임하였으며, 1994년 개원 이래 33년 임상 경력과 62,000명 이상의 임상 증례를 보유하고 있습니다.",
      "image": "https://whitestyle.com/mbc_interview_new.jpg",
      "url": "https://whitestyle.com/?mir_code=12118",
      "worksFor": {
        "@id": "https://whitestyle.com/#org"
      },
      "affiliation": {
        "@id": "https://whitestyle.com/#org"
      },
      "sameAs": [
        "https://whinish.com",
        "https://www.whinish.com",
        "https://www.youtube.com/@whitestyle"
      ],
      "alumniOf": [
        {
          "@type": "CollegeOrUniversity",
          "name": "서울대학교 치과대학 (Seoul National University School of Dentistry)"
        },
        {
          "@type": "CollegeOrUniversity",
          "name": "단국대학교 대학원 치과교정학 석사·박사 (Ph.D. in Orthodontics)"
        },
        {
          "@type": "CollegeOrUniversity",
          "name": "스웨덴 예테보리 대학교 (Göteborg University) 및 Västerås 병원 구강외과 방문의"
        }
      ],
      "memberOf": [
        {
          "@type": "Organization",
          "name": "대한치과교정학회 정회원 및 인정의"
        },
        {
          "@type": "Organization",
          "name": "대한치과보철학회 정회원"
        },
        {
          "@type": "Organization",
          "name": "유럽임플란트학회 (EAO) 정회원"
        },
        {
          "@type": "Organization",
          "name": "미국임플란트학회 (AAID/AO) 정회원"
        },
        {
          "@type": "Organization",
          "name": "서울대학교 치의학대학원 발전기금 종신이사"
        }
      ],
      "award": [
        "제49회 납세자의 날 기획재정부 장관 표창",
        "서울특별시장 모범납세자 선정",
        "보건복지부·국민건강보험공단 구강검진 최고 S등급",
        "대한치과교정학회 우수논문 표창",
        "주한 일본대사관 감사장 수상",
        "NICE평가정보 기술력 우수 기업 (임플란트 진료 부문) 및 D&B 임상기술 공인 최우수등급"
      ],
      "knowsAbout": [
        "치아교정",
        "인비절라인 투명교정",
        "설측교정 및 고난도 재교정",
        "고난도 뼈이식 임플란트",
        "무삭제 라미네이트 (제로쉘·휘니쉬)"
      ]
    },
    {
      "@type": "Physician",
      "@id": "https://whitestyle.com/#doctor-lee-bongjin",
      "name": "이봉진 (Dr. Bong-Jin Lee / イ・ボンジン)",
      "jobTitle": "대표원장",
      "description": "화이트스타일치과의원 대표원장. 연세대학교 치과대학을 졸업하고 연세대학교 치과대학병원에서 수련하였으며, 대한구강악안면임플란트학회·대한치과이식임플란트학회·대한치과보철학회·대한턱관절교합학회 정회원으로서 고난도 뼈이식 임플란트, 무치악 전악 재건, 정밀 심미보철 및 턱관절 교합 치료를 전담합니다.",
      "url": "https://whitestyle.com/?mir_code=12118",
      "worksFor": {
        "@id": "https://whitestyle.com/#org"
      },
      "affiliation": {
        "@id": "https://whitestyle.com/#org"
      },
      "alumniOf": [
        {
          "@type": "CollegeOrUniversity",
          "name": "연세대학교 치과대학 (Yonsei University College of Dentistry)"
        },
        {
          "@type": "MedicalOrganization",
          "name": "연세대학교 치과대학병원 수련"
        }
      ],
      "memberOf": [
        {
          "@type": "Organization",
          "name": "대한구강악안면임플란트학회 정회원"
        },
        {
          "@type": "Organization",
          "name": "대한치과이식임플란트학회 정회원"
        },
        {
          "@type": "Organization",
          "name": "대한치과보철학회 정회원"
        },
        {
          "@type": "Organization",
          "name": "대한턱관절교합학회 정회원"
        }
      ],
      "knowsAbout": [
        "고난도 뼈이식 임플란트",
        "당일 즉시부하 임플란트",
        "무치악 전체 임플란트 및 재수술",
        "정밀 심미보철 (제로쉘 라미네이트·올세라믹)",
        "턱관절 교합 치료"
      ]
    },
    {
      "@type": "Physician",
      "@id": "https://whitestyle.com/#doctor-park-seonhye",
      "name": "박선혜 (Dr. Seon-Hye Park / パク・ソンヘ)",
      "jobTitle": "원장 / 보건복지부 인증 치주과 전문의",
      "description": "화이트스타일치과의원 원장(치주과 전문의). 보건복지부 인증 치주과 전문의이자 치주과 박사과정을 수료하였으며, 대한치주과학회 전문의·정회원 및 대한치과보철학회 우수보철치과의사로서 중증 치주질환 치료, 치조골 재생술, 임플란트 주위염 예방·관리, 심미 잇몸성형 및 정밀 보철 진료를 담당합니다.",
      "url": "https://whitestyle.com/?mir_code=12118",
      "worksFor": {
        "@id": "https://whitestyle.com/#org"
      },
      "affiliation": {
        "@id": "https://whitestyle.com/#org"
      },
      "memberOf": [
        {
          "@type": "Organization",
          "name": "대한치주과학회 전문의 및 정회원"
        },
        {
          "@type": "Organization",
          "name": "대한치과보철학회 정회원 및 우수보철치과의사"
        },
        {
          "@type": "Organization",
          "name": "대한턱관절교합학회 정회원"
        }
      ],
      "award": [
        "보건복지부 인증 치주과 전문의",
        "대한치과보철학회 우수보철치과의사 선정"
      ],
      "knowsAbout": [
        "치주과 전문의 잇몸치료 및 치주수술",
        "치조골 유도 재생술 및 치근피개술",
        "임플란트 주위염 예방 및 유지관리",
        "잇몸성형 및 잇몸미백",
        "우수보철 정밀 크라운·브릿지 치료"
      ]
    },
    {
      "@type": "MedicalProcedure",
      "@id": "https://whitestyle.com/#procedure-orthodontics",
      "name": "1:1 책임 치아교정 (인비절라인 투명교정·설측교정·클리피씨·재교정)",
      "url": "https://whitestyle.com/?mir_code=12125",
      "description": "강남역 화이트스타일치과의원 치아교정은 1994년 개원(33년 전통) 이래 서울대졸, 단국대 외래교수, 교정학 박사 김준헌 병원장이 정밀 진단부터 장치 부착, 사후 유지관리까지 1:1로 직접 책임 진료합니다.",
      "provider": {
        "@id": "https://whitestyle.com/#org"
      }
    },
    {
      "@type": "MedicalProcedure",
      "@id": "https://whitestyle.com/#procedure-prosthodontics",
      "name": "최소삭제 심미보철 (제로쉘·휘니쉬 라미네이트·올세라믹·원데이 미백)",
      "url": "https://whitestyle.com/?mir_code=12131",
      "description": "강남역 화이트스타일치과의원의 최소삭제 심미보철은 자연치아 보존을 최우선 원칙으로 삼아, 정밀 교합 진단 후 치아 삭제량을 최소화한 맞춤형 세라믹 디자인과 체계적인 사후 보증 관리를 제공합니다.",
      "provider": {
        "@id": "https://whitestyle.com/#org"
      }
    },
    {
      "@type": "MedicalProcedure",
      "@id": "https://whitestyle.com/#procedure-implant",
      "name": "3D CT 정밀 임플란트 (고난도 뼈이식·투데이 당일·무치악·건강보험 임플란트)",
      "url": "https://whitestyle.com/?mir_code=12121",
      "description": "강남역 화이트스타일치과의원 임플란트는 3D CT 정밀 진단과 3단계 통증 완화 마취 시스템을 바탕으로, 치의학박사 김준헌 병원장 · 이봉진 대표원장 · 박선혜 원장(치주과 전문의) 3인 원장단 협진을 통해 식립부터 최종 보철·정기 검진까지 안전하게 진행합니다.",
      "provider": {
        "@id": "https://whitestyle.com/#org"
      }
    },
    {
      "@type": "FAQPage",
      "@id": "https://whitestyle.com/#faq",
      "inLanguage": "ko",
      "isPartOf": {
        "@id": "https://whitestyle.com/#website"
      },
      "about": {
        "@id": "https://whitestyle.com/#org"
      },
      "mainEntity": [
        {
          "@type": "Question",
          "name": "강남역 화이트스타일치과의원 의료진은 어떻게 구성되어 있나요?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "화이트스타일치과의원은 1994년 개원 33년 전통의 강남역 치과로, 서울대졸, 단국대 외래교수, 교정학 박사 김준헌 병원장, 연세대 치대 출신 이봉진 대표원장, 보건복지부 인증 치주과 전문의 박선혜 원장 3인 원장단이 교정·임플란트·심미보철·치주 각 분야를 1:1 책임 협진합니다."
          }
        },
        {
          "@type": "Question",
          "name": "고령자나 잇몸뼈가 부족한 경우에도 뼈이식 임플란트나 임플란트 재수술이 가능한가요?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "3D CT 정밀 진단과 자가골·동종골 고난도 뼈이식(GBR, 상악동 거상술), 그리고 치주과 전문의 협진을 통해 잇몸뼈가 심하게 소실된 케이스, 임플란트 실패 후 재수술, 무치악 전체 임플란트까지 안전하고 튼튼하게 식립합니다."
          }
        },
        {
          "@type": "Question",
          "name": "만 65세 건강보험 임플란트와 연 1회 건강보험 스케일링 혜택은 어떻게 되나요?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "만 65세 이상 건강보험 가입자는 평생 2개까지 본인부담률 30%로 건강보험 임플란트 시술이 가능하며, 만 19세 이상 성인은 매년 1회(1월 1일~12월 31일) 건강보험 스케일링 혜택을 받으실 수 있습니다."
          }
        },
        {
          "@type": "Question",
          "name": "일본어 상담이나 외국인 환자 전담 코디네이터가 상주하나요?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "네, 화이트스타일치과의원에는 일본어 전담 통역 코디네이터 3명이 상시 상주(日本語通訳スタッフ3名常駐)하고 있어, 사전 온라인 상담(LINE ID: whitestyle1 / 카카오톡: whitestyle2)부터 내원 진료, 사후관리까지 편안하게 안내받으실 수 있습니다."
          }
        },
        {
          "@type": "Question",
          "name": "강남역 화이트스타일치과의원의 치아교정은 누가 어떻게 진료하나요?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "강남역 화이트스타일치과의원 치아교정은 1994년 개원(33년 전통) 이래 서울대졸, 단국대 외래교수, 교정학 박사 김준헌 병원장이 정밀 진단부터 장치 부착, 사후 유지관리까지 1:1로 직접 책임 진료합니다."
          }
        },
        {
          "@type": "Question",
          "name": "최소삭제 심미보철(라미네이트)은 어떤 원칙으로 진행되나요?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "강남역 화이트스타일치과의원의 최소삭제 심미보철은 자연치아 보존을 최우선 원칙으로 삼아, 정밀 교합 진단 후 치아 삭제량을 최소화한 맞춤형 세라믹 디자인과 체계적인 사후 보증 관리를 제공합니다."
          }
        },
        {
          "@type": "Question",
          "name": "임플란트 시술 시 통증 관리와 협진 시스템은 어떻게 이루어지나요?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "강남역 화이트스타일치과의원 임플란트는 3D CT 정밀 진단과 3단계 통증 완화 마취 시스템을 바탕으로, 치의학박사 김준헌 병원장 · 이봉진 대표원장 · 박선혜 원장(치주과 전문의) 3인 원장단 협진을 통해 식립부터 최종 보철·정기 검진까지 안전하게 진행합니다."
          }
        },
        {
          "@type": "Question",
          "name": "화이트스타일치과 위치와 진료시간, 예약 방법은 어떻게 되나요?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "지하철 2호선·신분당선 강남역 11번·12번 출구 도보 1분 거리(서울특별시 강남구 강남대로92길 17 (역삼동 819-10) 대승빌딩 B1·1·2층)에 위치합니다. 월·화·수·금 10:00~19:00, 토요일 10:00~14:00 진료하며(목·일·공휴일 휴진), 네이버 예약(https://booking.naver.com/booking/13/bizes/265482) 또는 대표전화(1577-7287 / 02-569-7528)로 예약 가능합니다."
          }
        },
        {
          "@type": "Question",
          "name": "화이트스타일치과 3D 덴탈 프렌드 화타펫(하야니)은 무엇이며 어떻게 이용하나요?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "화타펫(하야니)은 1994년 개원 33년 전통 강남역 화이트스타일치과의원의 24시간 3D AI 덴탈 케어 프렌드입니다. 치아교정·최소삭제 심미보철·임플란트·스케일링 등 구강 건강 질문에 한·일 양국어로 24시간 실시간 답변하며, 양치 타이머·교합 체크·구강 케어 가이드를 제공합니다. 웹 브라우저에서 설치 없이 즉시 체험(https://whitestyle.com/ai-pet/)하거나 윈도우 데스크톱 앱 및 크롬 확장프로그램(https://whitestyle.com/ai-pet/download.html)으로 무료 분양받으실 수 있습니다."
          }
        }
      ]
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://whitestyle.com/#hwatapet",
      "name": "화타펫 (HwataPet · 하야니) — 화이트스타일치과의원 3D AI 덴탈 케어 프렌드",
      "operatingSystem": "Windows 10/11, Chrome/Edge Browser, Web (iOS/Android/Desktop)",
      "applicationCategory": "HealthApplication",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "KRW"
      },
      "url": "https://whitestyle.com/ai-pet/",
      "downloadUrl": "https://whitestyle.com/ai-pet/download.html",
      "publisher": {
        "@id": "https://whitestyle.com/#org"
      },
      "description": "1994년 개원 33년 전통 강남역 화이트스타일치과의원이 제공하는 3D 덴탈 케어 마스코트 및 24시간 실시간 한·일 치과 상담 도우미(6종 캐릭터·7종 페르소나·320종 코스튬·스마일 케어 루틴)."
    }
  ]
};

export const metadata: Metadata = {
  metadataBase: new URL("https://whitestyle.com"),
  title: {
    default: "화이트스타일치과의원 | 1994년 개원 33년 전통 강남역 치아교정·심미보철·임플란트",
    template: "%s | 화이트스타일치과의원"
  },
  description: "1994년 개원 33년 전통 강남역 화이트스타일치과의원. 치의학박사 김준헌 병원장·이봉진 대표원장·박선혜 원장(치주과 전문의) 3인 책임 협진, 3단계 통증 완화 시스템, 일본어 전담 코디네이터 3명 상주. 대표상담 1577-7287 / 02-569-7528",
  keywords: [
    "화이트스타일치과",
    "화이트스타일치과의원",
    "강남역치과",
    "강남치과",
    "김준헌",
    "이봉진",
    "박선혜",
    "강남치아교정",
    "강남임플란트",
    "강남라미네이트",
    "무삭제라미네이트",
    "치주과전문의",
    "뼈이식임플란트"
  ],
  alternates: {
    canonical: "https://whitestyle.com/",
    languages: {
      "ko-KR": "https://whitestyle.com/",
      "ja-JP": "https://whitestyle.com/?mir_code=12187",
      "en-US": "https://whitestyle.com/en"
    },
    types: {
      "application/rss+xml": "https://whitestyle.com/rss.xml"
    }
  },
  openGraph: {
    title: "화이트스타일치과의원 | 1994년 개원 33년 전통 강남역 치아교정·심미보철·임플란트",
    description: "치의학박사 김준헌 병원장 · 이봉진 대표원장 · 박선혜 원장(보건복지부 인증 치주과 전문의) 3인 책임 협진. 강남역 11·12번 출구 도보 1분 대승빌딩 B1·1·2층 (1577-7287 / 02-569-7528)",
    url: "https://whitestyle.com",
    siteName: "화이트스타일치과의원",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "https://whitestyle.com/mbc_interview_new.jpg",
        width: 1200,
        height: 630,
        alt: "화이트스타일치과의원 강남 본점"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "화이트스타일치과의원 | 1994년 개원 33년 전통 강남역 3인 원장단 협진",
    description: "서울대졸, 단국대 외래교수, 교정학 박사 김준헌 병원장 · 이봉진 대표원장 · 박선혜 원장(치주과 전문의) 3인 협진. 대표상담 1577-7287 / 02-569-7528",
    images: ["https://whitestyle.com/mbc_interview_new.jpg"]
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
        <meta name="google-site-verification" content="eq8OSgkrzZvyTn0z2Zl54ark_Mft3aaHcyQEICcfCbQ" />
        <meta name="google-site-verification" content="G0S3TOKurS74Yh9q3yyQuZ2ndvDcyJUk-lW44740npI" />
        <meta name="naver-site-verification" content="bc60fd58e9ad9f8e263b4db3d0d677345804f240" />
        <meta name="naver-site-verification" content="8366a25e553ae84c803854c45f2de0e67ec064ea" />
        <meta name="naver-site-verification" content="21eb68fa3eb1e75dcbe818fc7a24f4ff29b03bb7" />
        <link rel="llms-txt" href="https://whitestyle.com/llms.txt" title="WhiteStyle Dental Clinic Summary" />
        <link rel="llms-full-txt" href="https://whitestyle.com/llms-full.txt" title="WhiteStyle Dental Clinic Full Knowledge Bundle" />
        <link rel="stylesheet" href="/fonts/pretendard/pretendardvariable-dynamic-subset.css" />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-BYRZ7V9HEK"
          strategy="afterInteractive"
        />
        <Script id="ga4-config" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-BYRZ7V9HEK', {
              linker: { domains: ['whitestyle.com', 'www.whitestyle.com', 'whinish.com', 'www.whinish.com'] }
            });
            gtag('config', 'G-J75QHMVY8T', {
              linker: { domains: ['whitestyle.com', 'www.whitestyle.com', 'whinish.com', 'www.whinish.com'] }
            });
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(clinicJsonLd)
          }}
        />
      </head>
      <body
        className="antialiased min-h-screen flex flex-col relative wb-ka wbka"
        style={{ wordBreak: "keep-all", overflowWrap: "break-word" }}
        suppressHydrationWarning
      >
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
              <p className="font-bold text-slate-300 text-sm wb-ka wbka">
                화이트스타일치과의원 | 김준헌 병원장 · 이봉진 대표원장 · 박선혜 원장(치주과 전문의) 3인 원장단 협진 | 사업자등록번호: 212-94-71989 | 대표전화: 1577-7287 / 02-569-7528
              </p>
              <p className="text-slate-400 wb-ka wbka">
                (06134) 서울특별시 강남구 강남대로92길 17 (역삼동 819-10) 대승빌딩 B1·1·2층 (강남역 11번·12번 출구 도보 1분)
              </p>
              <p className="text-slate-300 text-xs pt-4 border-t border-slate-800 leading-normal">
                모든 시술 및 수술은 개개인의 체질과 증상에 따라 차이가 있을 수 있으며 출혈, 통증, 감염, 부종 등의 부작용이 발생할 수 있으므로 전문 의료진과 충분한 상담 후 진행하시기 바랍니다.
              </p>
              <p className="text-slate-400 text-[11px] space-x-4">
                <a href="/privacy" className="hover:text-white underline">개인정보처리방침</a>
                <a href="/price" className="hover:text-white underline">비급여 진료비 안내</a>
              </p>
              <p className="text-slate-400 text-xs">© 2026 화이트스타일치과의원. All rights reserved.</p>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
