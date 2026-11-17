import React from 'react';
import Link from 'next/link';

export interface ClinicalComparisonRow {
  item: string;
  whitestyle: string;
  general: string;
}

export interface ClinicalFaqItem {
  question: string;
  answer: string;
}

export interface ClinicalSummarySectionProps {
  categoryBadge: string;
  title: string;
  leadSentence: string;
  summaryBullets: string[];
  comparisonTitle: string;
  comparisonHeaders?: [string, string, string];
  comparisonRows: ClinicalComparisonRow[];
  faqs: ClinicalFaqItem[];
  pageUrl: string;
}

export default function ClinicalSummarySection({
  categoryBadge,
  title,
  leadSentence,
  summaryBullets,
  comparisonTitle,
  comparisonHeaders = ['비교 항목', '화이트스타일치과의원', '일반 진료 방식 참고'],
  comparisonRows,
  faqs,
  pageUrl,
}: ClinicalSummarySectionProps) {
  const medicalPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name: title,
    url: pageUrl,
    description: leadSentence,
    mainEntity: {
      '@type': 'Dentist',
      name: '화이트스타일치과의원',
      telephone: '1577-7287',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '서울특별시 강남구 강남대로92길 17 대승빌딩 B1·1·2층',
        addressLocality: '강남구',
        addressRegion: '서울특별시',
        postalCode: '06134',
        addressCountry: 'KR',
      },
    },
    reviewedBy: [
      {
        '@type': 'Physician',
        '@id': 'https://whitestyle.com/#doctor-kim-junheon',
        name: '김준헌 병원장',
        jobTitle: '서울대졸 · 단국대 외래교수 · 교정학 박사',
      },
      {
        '@type': 'Physician',
        '@id': 'https://whitestyle.com/#doctor-lee-bongjin',
        name: '이봉진 대표원장',
        jobTitle: '연세대 치과대학 졸업 · 3D CT 임플란트·교합 전담',
      },
      {
        '@type': 'Physician',
        '@id': 'https://whitestyle.com/#doctor-park-seonhye',
        name: '박선혜 원장',
        jobTitle: '보건복지부 인증 치주과 전문의 · 우수보철치과의사',
      },
    ],
  };

  const faqSchema =
    faqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })),
        }
      : null;

  return (
    <section
      className="w-full max-w-6xl mx-auto px-4 sm:px-8 pt-10 pb-8"
      style={{ wordBreak: 'keep-all', overflowWrap: 'break-word', lineHeight: 1.95 }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalPageSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-6 sm:p-10 mb-8">
        <div className="flex flex-wrap items-center gap-2.5 mb-5">
          <span className="inline-block px-3.5 py-1 rounded-full text-xs font-extrabold tracking-wider bg-slate-900 text-amber-200">
            {categoryBadge}
          </span>
          <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700">
            1994년 개원 33년 전통 · 강남역 11·12번 출구 도보 1분
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 mb-6 tracking-tight leading-snug">
          {title}
        </h1>

        <p className="text-base sm:text-lg text-slate-800 font-semibold leading-[1.95] bg-slate-50 border-l-4 border-[#0f294a] p-5 sm:p-6 rounded-r-2xl mb-8">
          {leadSentence}
        </p>

        <div className="mb-10">
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 mb-4">
            핵심 진료 안내 3줄 요약
          </h2>
          <ul className="space-y-3 bg-[#f8fafc] border border-slate-200 rounded-2xl p-5 sm:p-6">
            {summaryBullets.map((item, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 text-slate-700 text-sm sm:text-base leading-[1.95]"
              >
                <span className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-[#0f294a] text-white text-xs font-bold flex items-center justify-center">
                  {idx + 1}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-10">
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 mb-4">
            {comparisonTitle}
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left border-collapse text-sm sm:text-base">
              <thead>
                <tr className="bg-[#0f294a] text-white">
                  <th className="py-3.5 px-4 font-bold w-1/4">{comparisonHeaders[0]}</th>
                  <th className="py-3.5 px-4 font-bold w-2/5 text-amber-200">
                    {comparisonHeaders[1]}
                  </th>
                  <th className="py-3.5 px-4 font-bold w-1/3">{comparisonHeaders[2]}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {comparisonRows.map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 1 ? 'bg-slate-50/70' : ''}>
                    <td className="py-4 px-4 font-bold text-slate-900 align-top">
                      {row.item}
                    </td>
                    <td className="py-4 px-4 font-semibold text-slate-800 align-top leading-[1.95]">
                      {row.whitestyle}
                    </td>
                    <td className="py-4 px-4 text-slate-600 align-top leading-[1.95]">
                      {row.general}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {faqs.length > 0 && (
          <div className="mb-10">
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 mb-4">
              자주 묻는 임상 질문 (Q&amp;A)
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"
                >
                  <h3 className="text-base sm:text-lg font-extrabold text-[#0f294a] mb-2 leading-snug">
                    Q. {faq.question}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-700 leading-[1.95]">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="border-t border-slate-200 pt-7">
          <p className="text-xs sm:text-sm text-slate-600 mb-4 font-medium leading-[1.95]">
            김준헌 병원장(서울대졸 · 단국대 외래교수 · 교정학 박사) · 이봉진 대표원장 · 박선혜 원장(보건복지부 인증 치주과 전문의) 3인 원장단 협진 ｜ 서울특별시 강남구 강남대로92길 17 대승빌딩 B1·1·2층 (06134)
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <a
              href="https://booking.naver.com/booking/13/bizes/265482"
              target="_blank"
              rel="noreferrer"
              className="py-3.5 px-4 rounded-xl bg-[#03C75A] hover:bg-[#02b351] text-white font-extrabold text-sm text-center shadow-sm transition-colors"
            >
              네이버 빠른 예약 (1분 완료)
            </a>
            <Link
              href="/consult"
              className="py-3.5 px-4 rounded-xl bg-[#FEE500] hover:bg-[#f5dc00] text-slate-900 font-extrabold text-sm text-center shadow-sm transition-colors"
            >
              카카오톡 1:1 비용·기간 상담
            </Link>
            <a
              href="https://line.me/ti/p/~whitestyle1"
              target="_blank"
              rel="noreferrer"
              className="py-3.5 px-4 rounded-xl bg-[#06C755] hover:bg-[#05b34c] text-white font-extrabold text-sm text-center shadow-sm transition-colors"
            >
              LINE 日本語直通相談 (ID: whitestyle1)
            </a>
            <a
              href="tel:1577-7287"
              className="py-3.5 px-4 rounded-xl bg-[#0f294a] hover:bg-[#163a66] text-white font-extrabold text-sm text-center shadow-sm transition-colors"
            >
              대표전화 1577-7287 / 02-569-7528
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
