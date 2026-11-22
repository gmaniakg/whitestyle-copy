import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import SuneungConsultForm from './SuneungConsultForm';
import './suneung.css';

export const metadata: Metadata = {
  title: '2027 수능 수험생 이벤트 · 수험표 지참 비급여 진료 시 치아미백 1회 무료',
  description:
    '2027학년도 수능 수험표를 지참하고 강남역 33년 전통 화이트스타일치과의원에서 치아교정·최소삭제 라미네이트·보철 등 비급여 진료를 진행하시면 식약처 허가 전문가 치아미백 1회를 무료 제공합니다.',
  alternates: { canonical: 'https://whitestyle.com/events/suneung' },
  openGraph: {
    title: '2027 수능 수험생 이벤트 · 비급여 진료 시 치아미백 1회 무료 | 화이트스타일치과의원',
    description:
      '수능 수험표 지참 후 비급여(비보험) 진료 시 전문가 치아미백 1회 무료 제공. 강남역 11번·12번 출구 도보 1분, 1994년 개원 33년 전통 3인 원장단 협진.',
    url: 'https://whitestyle.com/events/suneung',
    type: 'website',
    locale: 'ko_KR',
    images: [{ url: 'https://whitestyle.com/images/suneung-students-smile.jpg' }],
  },
};

const ELIGIBLE_ROWS = [
  {
    treatment: '1:1 책임 치아교정',
    details: '인비절라인 투명교정, 클리피씨, 세라믹 교정, 부분교정',
    doctor: '김준헌 병원장 (서울대졸·단국대 외래교수·교정학 박사)',
    benefit: '비급여 진료 진행 시 전문가 치아미백 1회 무료',
  },
  {
    treatment: '무삭제·최소삭제 라미네이트',
    details: '제로쉘 무삭제 라미네이트, 이지화이트, 앞니 심미보철',
    doctor: '김준헌 병원장 · 이봉진 대표원장 · 박선혜 원장 협진',
    benefit: '비급여 진료 진행 시 전문가 치아미백 1회 무료',
  },
  {
    treatment: '심미 세라믹·지르코니아 보철',
    details: '비급여 지르코니아 크라운, 세라믹 인레이·온레이',
    doctor: '이봉진 대표원장 · 박선혜 원장(우수보철치과의사) 협진',
    benefit: '비급여 진료 진행 시 전문가 치아미백 1회 무료',
  },
  {
    treatment: '3D CT 디지털 임플란트',
    details: '외상 상실 치아·선천 결손 치아 3D CT 임플란트',
    doctor: '3인 원장단 책임 협진 및 3단계 통증 완화 마취',
    benefit: '비급여 진료 진행 시 전문가 치아미백 1회 무료',
  },
];

const DOCTORS = [
  {
    name: '김준헌 병원장',
    role: '치의학박사 · 치과교정학 전공',
    desc: '서울대학교 치과대학 졸업, 단국대 외래교수, 교정학 박사. 진단부터 장치 부착·사후 유지관리까지 주치의 변경 없이 1:1 직접 진료합니다.',
    img: '/images/doctors/kim_jun_heon.png',
  },
  {
    name: '이봉진 대표원장',
    role: '연세대 치과대학 졸업 · 수련',
    desc: '정밀 교합 분석을 바탕으로 자연치아 보존 중심의 심미보철(제로쉘·이지화이트)과 3D CT 임플란트 보철을 전담합니다.',
    img: '/images/doctors/lee_bong_jin.png',
  },
  {
    name: '박선혜 원장',
    role: '보건복지부 인증 치주과 전문의',
    desc: '미백 전 잇몸 건강과 법랑질·지각과민 상태를 정밀 점검하고, 치주과 전문의 협진과 3·6·12개월 사후 관리를 담당합니다.',
    img: '/images/doctors/park_seon_hye.png',
  },
];

const FAQ_ITEMS = [
  {
    q: '수험표는 원본이나 사진(촬영본) 모두 가능한가요?',
    a: '2027학년도 대학수학능력시험 수험표 실물 또는 수험번호와 성명이 확인되는 촬영본·출력물과 본인 신분증을 함께 지참하시면 확인이 가능합니다.',
  },
  {
    q: '치아교정을 선택하면 치아미백은 언제 받게 되나요?',
    a: '교정 장치(브라켓)를 치아 바깥쪽에 부착하는 경우 장치 제거 후 고르게 배열된 상태에서 치아미백 1회 무료 혜택을 진행하는 것이 색조 균일도에 유리하며, 투명교정이나 보철 진행 시에는 진료 순서에 맞춰 적절한 시점을 원장님이 함께 설계해 드립니다.',
  },
  {
    q: '스케일링이나 충치 건강보험 급여 진료만 받아도 무료 미백이 적용되나요?',
    a: '관계 법령(의료법 제27조 제3항)을 준수하기 위해 건강보험 급여 진료의 본인부담금 면제·할인은 적용되지 않으며, 비급여(비보험) 진료를 진행하시는 수험생에 한해 식약처 허가 전문가 치아미백 1회를 무료로 제공합니다.',
  },
  {
    q: '미백 시술 시 치아가 많이 시리지는 않나요?',
    a: '시술 전 파노라마 검진과 치주과 전문의 협진을 통해 충치·미세균열·잇몸 염증 여부를 먼저 확인한 뒤 잇몸 보호제를 꼼꼼히 도포하고 광조사를 진행하므로 자극 부담을 줄일 수 있습니다.',
  },
];

export default function SuneungEventPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'MedicalWebPage',
        '@id': 'https://whitestyle.com/events/suneung#webpage',
        url: 'https://whitestyle.com/events/suneung',
        name: '2027 수능 수험생 이벤트 · 수험표 지참 비급여 진료 시 치아미백 1회 무료',
        description:
          '2027학년도 수능 수험표를 지참하고 강남역 화이트스타일치과의원에서 비급여 진료를 받으시면 전문가 치아미백 1회를 무료 제공합니다.',
        inLanguage: 'ko-KR',
        about: { '@id': 'https://whitestyle.com/#org' },
      },
      {
        '@type': 'Offer',
        name: '2027 수능 수험생 비급여 진료 시 전문가 치아미백 1회 무료',
        price: '0',
        priceCurrency: 'KRW',
        eligibleCustomerType: '2027학년도 수능 수험표 지참 수험생 (비급여 진료 진행 시)',
        offeredBy: { '@id': 'https://whitestyle.com/#org' },
        url: 'https://whitestyle.com/events/suneung',
      },
      {
        '@type': 'FAQPage',
        mainEntity: FAQ_ITEMS.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.a,
          },
        })),
      },
    ],
  };

  return (
    <div className="se-page wb-ka wbka">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <section className="se-hero">
        <div className="se-wrap">
          <div className="se-hero-grid">
            <div>
              <span className="se-badge">2027 수능 수험생 특별 혜택</span>
              <h1 className="se-h1">
                수험표 지참 후 비급여 진료 시<br />전문가 치아미백 1회 무료
              </h1>
              <p className="se-lead">
                1994년 개원(33년 전통) 강남역 화이트스타일치과의원에서 치아교정·최소삭제 라미네이트·비급여 보철 진료를 시작하는 수험생에게 식약처 허가 전문가 치아미백 1회를 무료로 제공합니다.
              </p>

              <div className="se-cta-row">
                <a
                  href="https://booking.naver.com/booking/13/bizes/265482"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="se-btn se-btn-primary"
                >
                  네이버 수험생 예약 (1분 완료)
                </a>
                <a
                  href="https://pf.kakao.com/_Vtxdwl"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="se-btn se-btn-kakao"
                >
                  카카오톡 1:1 수험생 상담
                </a>
                <a href="#suneung-apply" className="se-btn se-btn-outline">
                  온라인 혜택 신청하기
                </a>
              </div>

              <p className="se-meta-note">
                강남역 11번·12번 출구 도보 1분 대승빌딩 B1·1·2층 / 대표상담 1577-7287, 02-569-7528
              </p>
            </div>

            <div className="se-hero-media">
              <div className="se-hero-frame">
                <img
                  src="/images/suneung-students-smile.jpg"
                  alt="화이트스타일치과의원 2027 수능 수험생 남녀 고교생 환한 미소 안내"
                />
                <div className="se-hero-caption">
                  김준헌 병원장, 이봉진 대표원장, 박선혜 원장(치주과 전문의) 3인 책임 협진
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Eligibility & Non-covered Treatment Table */}
      <section className="se-sec se-sec-soft">
        <div className="se-wrap">
          <h2 className="se-h2">수험표 지참 무료 치아미백 적용 진료 안내</h2>
          <p className="se-sec-sub">
            새 학기와 대학 입학을 준비하며 비급여(비보험) 진료를 계획 중인 수험생이라면 3인 원장단 정밀 진단과 함께 치아미백 1회 혜택을 받으실 수 있습니다.
          </p>

          <div className="se-table-wrap">
            <table className="se-table">
              <thead>
                <tr>
                  <th scope="col">비급여 진료 분야</th>
                  <th scope="col">상세 진료 항목</th>
                  <th scope="col">담당 원장단 협진</th>
                  <th scope="col">수험표 혜택</th>
                </tr>
              </thead>
              <tbody>
                {ELIGIBLE_ROWS.map((row) => (
                  <tr key={row.treatment}>
                    <td>
                      <strong>{row.treatment}</strong>
                    </td>
                    <td>{row.details}</td>
                    <td>{row.doctor}</td>
                    <td>
                      <strong>{row.benefit}</strong>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="se-legal-note">
            안내: 의료법 제27조 제3항 준수를 위해 건강보험 급여 진료(보험 스케일링·보험 충치 등) 단독 진행 시에는 본인부담금 면제·할인이 적용되지 않으며, 비급여 진료 진행 및 수험표 확인 시 전문가 치아미백 1회(잇몸 보호제 도포 및 식약처 허가 미백제 광조사 포함)가 무료 제공됩니다.
          </p>
        </div>
      </section>

      {/* 3 Steps Process */}
      <section className="se-sec">
        <div className="se-wrap">
          <h2 className="se-h2">수험생 미백 혜택 이용 3단계</h2>
          <p className="se-sec-sub">
            예약 시 수험표 혜택 신청 의사를 남겨주시면 내원 당일 대기 시간 없이 빠르게 확인해 드립니다.
          </p>

          <div className="se-step-grid">
            <article className="se-step-item">
              <span className="se-step-num">1단계</span>
              <h3>사전 예약 및 상담 선택</h3>
              <p>
                네이버 빠른 예약 메모란, 카카오톡, 또는 아래 신청 폼에 &ldquo;수능 수험생 혜택 신청&rdquo;을 남겨주세요. 부모님 동반 상담도 가능합니다.
              </p>
            </article>

            <article className="se-step-item">
              <span className="se-step-num">2단계</span>
              <h3>내원 접수 및 수험표 확인</h3>
              <p>
                강남역 11번·12번 출구 도보 1분 화이트스타일치과 접수 데스크에 2027 수능 수험표(원본 또는 사진)와 신분증을 제시해 주세요.
              </p>
            </article>

            <article className="se-step-item">
              <span className="se-step-num">3단계</span>
              <h3>정밀 진단 및 맞춤 미백</h3>
              <p>
                비급여 진료 상담·진행 확정 후 법랑질과 잇몸 상태를 점검하고, 교정 전후 또는 보철 색조 계획에 맞춰 전문가 미백 1회를 무료 시행합니다.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* 3 Directors Trust */}
      <section className="se-sec se-sec-soft">
        <div className="se-wrap">
          <h2 className="se-h2">33년 전통 3인 원장단 책임 협진</h2>
          <p className="se-sec-sub">
            화이트스타일치과의원은 1994년 개원 이래 분과별 전문 의료진이 주치의 변경 없이 처음부터 사후 관리까지 함께합니다.
          </p>

          <div className="se-doc-grid">
            {DOCTORS.map((doc) => (
              <article key={doc.name} className="se-doc-item">
                <img src={doc.img} alt={`${doc.name} 프로필 사진`} />
                <div className="se-doc-body">
                  <h3>{doc.name}</h3>
                  <div className="se-doc-role">{doc.role}</div>
                  <p>{doc.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Online Application Form */}
      <section className="se-sec" id="suneung-apply">
        <div className="se-wrap">
          <h2 className="se-h2">수험생 혜택 빠른 상담 신청</h2>
          <p className="se-sec-sub">
            연락처를 남겨주시면 진료 시간(월·화·수·금 10:00~19:00 / 토요일 10:00~14:00) 내 전담 실장이 순차 안내해 드립니다.
          </p>
          <SuneungConsultForm />
        </div>
      </section>

      {/* FAQ + Legal Disclaimer */}
      <section className="se-sec se-sec-soft">
        <div className="se-wrap">
          <h2 className="se-h2">수험생 이벤트 자주 묻는 질문</h2>
          <p className="se-sec-sub">
            더 자세한 진료비 기준은{' '}
            <Link href="/price" className="underline">
              비급여 수가표 안내
            </Link>
            에서 미리 확인하실 수 있습니다.
          </p>

          <div className="se-faq-list">
            {FAQ_ITEMS.map((item) => (
              <details key={item.q} className="se-faq-item">
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>

          <p className="se-legal-note">
            부작용 및 주의사항 안내: 모든 치과 진료 및 전문가 치아미백은 개개인의 치아 법랑질 두께와 구강 상태에 따라 일시적인 시림 증상, 잇몸 자극, 색조 개선 폭의 차이가 있을 수 있으므로 반드시 치과의사의 정밀 검진 후 진행 여부를 결정하시기 바랍니다.
          </p>
        </div>
      </section>
    </div>
  );
}
