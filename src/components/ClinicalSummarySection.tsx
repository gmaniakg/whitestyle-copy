import React from 'react';
import Link from 'next/link';
import ShareButtons from '@/app/components/ShareButtons';
import { EVIDENCE_QA_LIST, type EvidenceQaItem } from '@/data/evidenceQa';
import {
  getConditionProfile,
  naverSearchUrl,
  NAVER_BLOG_URL,
  NAVER_PLACE_REVIEW_URL,
  NAVER_PLACE_URL,
} from './treatmentConditionData';

const LAST_REVIEWED = '2026-11-26';

function resolveQaCategory(pageUrl: string): EvidenceQaItem['category'] {
  if (pageUrl.includes('/treatments/implant')) return '임플란트·재수술';
  if (pageUrl.includes('/treatments/aesthetic')) return '라미네이트·심미보철';
  if (pageUrl.includes('/treatments/orthodontics')) return '치아교정·재교정';
  return '잇몸·보존·수가';
}
const GOOGLE_MAPS_EN =
  'https://www.google.com/maps/search/?api=1&query=WhiteStyle+Dental+Clinic+17+Gangnam-daero+92-gil+Gangnam-gu+Seoul';
const GOOGLE_MAPS_JA =
  'https://www.google.com/maps/search/?api=1&hl=ja&query=%E3%83%9B%E3%83%AF%E3%82%A4%E3%83%88%E3%82%B9%E3%82%BF%E3%82%A4%E3%83%AB%E6%AD%AF%E7%A7%91+%E6%B1%9F%E5%8D%97';
const BAIDU_MAPS_ZH =
  'https://api.map.baidu.com/marker?location=37.4988802,127.0286304&title=WhiteStyle%E7%99%BD%E5%B0%9A%E9%BD%BF%E7%A7%91&content=%E9%A6%96%E5%B0%94%E7%89%B9%E5%88%AB%E5%B8%82%E6%B1%9F%E5%8D%97%E5%8C%BA%E6%B1%9F%E5%8D%97%E5%A4%A7%E8%B7%AF92%E8%A1%9717&output=html&coord_type=wgs84';

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
  const profile = getConditionProfile(pageUrl);

  const medicalPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    '@id': `${pageUrl}#webpage`,
    name: title,
    url: pageUrl,
    description: leadSentence,
    inLanguage: 'ko-KR',
    lastReviewed: LAST_REVIEWED,
    medicalAudience: { '@type': 'MedicalAudience', audienceType: 'Patient' },
    isPartOf: { '@id': 'https://whitestyle.com/#website' },
    ...(profile
      ? {
          about: {
            '@type': 'MedicalProcedure',
            name: profile.procedureName,
            procedureType: `https://schema.org/${profile.procedureType}`,
            howPerformed: profile.conditions
              .filter((c) => c.label !== '일본어 상담')
              .map((c) => `${c.label}: ${c.answer}`)
              .join(' / '),
            followup: profile.conditions.find((c) => c.label.startsWith('보증'))?.answer,
          },
          keywords: profile.naverKeywords.join(', '),
        }
      : {}),
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', '.clinical-lead-sentence', '.clinical-faq-answer', '.clinical-condition-answer'],
    },
    mainEntity: {
      '@type': 'Dentist',
      '@id': 'https://whitestyle.com/#org',
      name: '화이트스타일치과의원',
      alternateName: ['WhiteStyle Dental Clinic', 'ホワイトスタイル歯科', 'WhiteStyle白尚齿科', '白尚齿科'],
      telephone: '1577-7287',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '서울특별시 강남구 강남대로92길 17 대승빌딩 B1·1·2층',
        addressLocality: '강남구',
        addressRegion: '서울특별시',
        postalCode: '06134',
        addressCountry: 'KR',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 37.4988802,
        longitude: 127.0286304,
      },
      hasMap: [
        'https://www.google.com/maps/search/?api=1&query=%ED%99%94%EC%9D%B4%ED%8A%B8%EC%8A%A4%ED%83%80%EC%9D%BC%EC%B9%98%EA%B3%BC%EC%9D%98%EC%9B%90+%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C+%EA%B0%95%EB%82%A8%EA%B5%AC+%EA%B0%95%EB%82%A8%EB%8C%80%EB%A1%9C92%EA%B8%B8+17',
        GOOGLE_MAPS_EN,
        GOOGLE_MAPS_JA,
        BAIDU_MAPS_ZH,
        NAVER_PLACE_URL,
      ],
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
      className="wb-ka wbka w-full max-w-6xl mx-auto px-4 sm:px-8 pt-10 pb-8"
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

      <div className="py-2 sm:py-4 mb-8">
        <div className="flex flex-wrap items-center gap-2.5 mb-5">
          <span className="inline-block px-3.5 py-1 rounded-full text-sm font-bold bg-ws-ink text-ws-gold">
            {categoryBadge}
          </span>
          <span className="inline-block px-3.5 py-1 rounded-full text-sm font-semibold bg-ws-panel text-ws-body">
            1994년 개원 33년 전통, 강남역 11·12번 출구 도보 1분
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-ws-ink mb-6 leading-snug">
          {title}
        </h1>

        <p className="clinical-lead-sentence max-w-[72ch] text-base sm:text-lg text-ws-ink font-semibold leading-[1.95] bg-ws-mist border border-ws-rule p-5 sm:p-6 rounded-2xl mb-8">
          {leadSentence}
        </p>

        <div className="mb-10">
          <h2 className="text-lg sm:text-xl font-extrabold text-ws-ink mb-4">
            핵심 진료 안내 3줄 요약
          </h2>
          <ol className="space-y-3 bg-ws-mist border border-ws-rule rounded-2xl p-5 sm:p-6">
            {summaryBullets.map((item, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 text-ws-body text-sm sm:text-base leading-[1.95]"
              >
                <span className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-ws-navy text-white text-xs font-bold flex items-center justify-center">
                  {idx + 1}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="mb-10">
          <h2 className="text-lg sm:text-xl font-extrabold text-ws-ink mb-4">
            {comparisonTitle}
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-ws-rule">
            <table className="w-full text-left border-collapse text-sm sm:text-base">
              <thead>
                <tr className="bg-ws-navy text-white">
                  <th scope="col" className="py-3.5 px-4 font-bold w-1/4">{comparisonHeaders[0]}</th>
                  <th scope="col" className="py-3.5 px-4 font-bold w-2/5 text-ws-gold">
                    {comparisonHeaders[1]}
                  </th>
                  <th scope="col" className="py-3.5 px-4 font-bold w-1/3">{comparisonHeaders[2]}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ws-rule bg-white">
                {comparisonRows.map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 1 ? 'bg-ws-mist' : ''}>
                    <th scope="row" className="py-4 px-4 font-bold text-ws-ink align-top">
                      {row.item}
                    </th>
                    <td className="py-4 px-4 font-semibold text-ws-ink align-top leading-[1.95]">
                      {row.whitestyle}
                    </td>
                    <td className="py-4 px-4 text-ws-muted align-top leading-[1.95]">
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
            <h2 className="text-lg sm:text-xl font-extrabold text-ws-ink mb-4">
              자주 묻는 임상 질문 (Q&amp;A)
            </h2>
            <div className="divide-y divide-ws-rule border-y border-ws-rule">
              {faqs.map((faq, idx) => (
                <div key={idx} className="py-5 sm:py-6">
                  <h3 className="text-base sm:text-lg font-extrabold text-ws-navy mb-2 leading-snug">
                    Q. {faq.question}
                  </h3>
                  <p className="clinical-faq-answer max-w-[72ch] text-sm sm:text-base text-ws-body leading-[1.95]">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {profile && (
          <div className="mb-10">
            <h2 className="text-lg sm:text-xl font-extrabold text-ws-ink mb-2">
              상담 전 많이 확인하시는 진료 조건
            </h2>
            <p className="text-sm sm:text-base text-ws-muted mb-4 leading-[1.95]">
              {profile.procedureName} 진료를 알아보실 때 가장 자주 되묻는 조건을 한눈에 정리했습니다.
            </p>
            <dl className="divide-y divide-ws-rule border-y border-ws-rule">
              {profile.conditions.map((c) => (
                <div key={c.label} className="grid grid-cols-1 sm:grid-cols-[9rem_1fr] gap-1 sm:gap-6 py-4">
                  <dt className="text-sm sm:text-base font-extrabold text-ws-navy">{c.label}</dt>
                  <dd className="clinical-condition-answer max-w-[72ch] text-sm sm:text-base text-ws-body leading-[1.95]">
                    {c.answer}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        {profile && (
          <div className="mb-10 rounded-2xl border border-naver-line bg-naver-soft p-5 sm:p-6">
            <h2 className="text-lg sm:text-xl font-extrabold text-ws-ink mb-2">
              네이버에서 실제 후기로 한 번 더 확인하세요
            </h2>
            <p className="text-sm sm:text-base text-ws-body mb-4 leading-[1.95]">
              아래 키워드로 검색하시면 33년간 강남역 한자리에서 진료받으신 분들의 방문자 후기와 블로그 진료 기록을 그대로 확인하실 수 있습니다.
            </p>
            <div className="flex flex-wrap gap-2 mb-5">
              {profile.naverKeywords.map((kw) => (
                <a
                  key={kw}
                  href={naverSearchUrl(kw)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block px-3.5 py-2 rounded-full bg-white border border-naver-line text-sm font-bold text-ws-ink hover:bg-naver hover:text-ws-ink active:bg-naver-press active:text-ws-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-naver transition-colors"
                >
                  #{kw}
                </a>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { href: NAVER_PLACE_REVIEW_URL, label: '네이버 플레이스 방문자 후기' },
                { href: NAVER_BLOG_URL, label: '공식 네이버 블로그 진료 기록' },
                { href: NAVER_PLACE_URL, label: '네이버 지도 길찾기 (강남역 도보 1분)' },
              ].map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="py-3 px-4 rounded-xl bg-white border border-ws-rule hover:border-naver active:bg-naver-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-naver text-ws-ink font-bold text-sm text-center transition-colors"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        )}

        <div className="mb-10 rounded-2xl border border-ws-rule bg-ws-mist p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <h2 className="text-lg sm:text-xl font-extrabold text-ws-ink">
              이 진료의 학술 근거 Q&amp;A · 필수 안내 허브
            </h2>
            <Link href="/qa" className="text-xs sm:text-sm font-extrabold text-ws-navy hover:underline">
              근거 Q&amp;A {EVIDENCE_QA_LIST.length}선 전체 보기 &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
            {EVIDENCE_QA_LIST.filter((q) => q.category === resolveQaCategory(pageUrl))
              .slice(0, 4)
              .map((q) => (
                <Link
                  key={q.slug}
                  href={`/qa/${q.slug}`}
                  className="block rounded-xl border border-ws-rule bg-white p-4 hover:border-ws-navy transition-colors"
                >
                  <p className="text-sm font-bold text-ws-ink leading-snug mb-1">{q.question}</p>
                  <p className="text-xs text-ws-muted">근거 문헌 {q.citations.length}건 · 기준표 확인 &rarr;</p>
                </Link>
              ))}
          </div>
          <div className="flex flex-wrap gap-2 text-xs font-bold">
            {[
              { href: '/price', label: '비급여 수가표' },
              { href: '/warranty', label: '정품 보증 · 자체 기공소' },
              { href: '/glossary', label: '치과 용어 사전' },
              { href: '/video', label: '영상 진료실' },
              { href: '/clinic-facts', label: '병원 공식 팩트' },
            ].map((hub) => (
              <Link
                key={hub.href}
                href={hub.href}
                className="px-3 py-1.5 rounded-lg bg-white border border-ws-rule text-ws-navy hover:border-ws-navy transition-colors"
              >
                {hub.label} &rarr;
              </Link>
            ))}
          </div>
        </div>

        <ShareButtons title={title} />

        <div className="border-t border-ws-rule pt-7">
          <p className="text-sm text-ws-muted mb-1 font-medium leading-[1.95]">
            김준헌 병원장(서울대졸, 단국대 외래교수, 교정학 박사), 이봉진 대표원장, 박선혜 원장(보건복지부 인증 치주과 전문의) 3인 원장단 협진
          </p>
          <p className="text-sm text-ws-muted mb-4 font-medium leading-[1.95]">
            서울특별시 강남구 강남대로92길 17 대승빌딩 B1·1·2층 (06134)
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <a
              href="https://booking.naver.com/booking/13/bizes/265482"
              target="_blank"
              rel="noreferrer"
              className="py-3.5 px-4 rounded-xl bg-naver hover:bg-naver-hover active:bg-naver-press focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-naver text-ws-ink font-extrabold text-sm text-center transition-colors"
            >
              네이버 빠른 예약 (1분 완료)
            </a>
            <Link
              href="/consult"
              className="py-3.5 px-4 rounded-xl bg-kakao hover:bg-kakao-hover active:bg-kakao-press focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ws-ink text-ws-ink font-extrabold text-sm text-center transition-colors"
            >
              카카오톡 1:1 비용·기간 상담
            </Link>
            <a
              href="https://line.me/ti/p/~whitestyle1"
              target="_blank"
              rel="noreferrer"
              className="py-3.5 px-4 rounded-xl bg-line-app hover:bg-line-app-hover active:bg-line-app-press focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-line-app text-ws-ink font-extrabold text-sm text-center transition-colors"
            >
              LINE 日本語直通相談 (ID: whitestyle1)
            </a>
            <a
              href="tel:1577-7287"
              className="py-3.5 px-4 rounded-xl bg-ws-navy hover:bg-ws-navy-hover active:bg-ws-navy-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ws-navy text-white font-extrabold text-sm text-center ws-nowrap transition-colors"
            >
              대표전화 1577-7287 / 02-569-7528
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
