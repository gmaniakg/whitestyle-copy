import type { Metadata } from 'next';
import Link from 'next/link';
import { EVIDENCE_QA_LIST, type EvidenceQaItem } from '@/data/evidenceQa';

export const metadata: Metadata = {
  title: `근거 기반 치과 임상 Q&A ${EVIDENCE_QA_LIST.length}선 · 재수술·뼈이식·재교정·라미네이트`,
  description:
    `임플란트 재수술·동종골 뼈이식·무치악 전체임플란트·만 65세 건보 30%·성인 재교정·무삭제 라미네이트 신경보호·심평원 가격 비교까지 국제 학술문헌과 3인 원장단 검수로 답하는 ${EVIDENCE_QA_LIST.length}대 핵심 Q&A.`,
  alternates: { canonical: 'https://whitestyle.com/qa' },
  openGraph: {
    title: `근거 기반 치과 임상 Q&A ${EVIDENCE_QA_LIST.length}선 | 화이트스타일치과의원`,
    description:
      '1994년 개원 33년 전통 강남역 화이트스타일치과의원 김준헌·이봉진·박선혜 3인 원장단이 검수한 치의학 문헌 기반 Q&A 허브.',
    url: 'https://whitestyle.com/qa',
    type: 'website',
    locale: 'ko_KR',
  },
};

const CATEGORIES: EvidenceQaItem['category'][] = [
  '임플란트·재수술',
  '라미네이트·심미보철',
  '치아교정·재교정',
  '잇몸·보존·수가',
];

export default function QaIndexPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': 'https://whitestyle.com/qa#collection',
        url: 'https://whitestyle.com/qa',
        name: `강남역 화이트스타일치과의원 근거 기반 임상 Q&A ${EVIDENCE_QA_LIST.length}선`,
        inLanguage: 'ko-KR',
        publisher: { '@id': 'https://whitestyle.com/#org' },
      },
      {
        '@type': 'ItemList',
        itemListElement: EVIDENCE_QA_LIST.map((item, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          url: `https://whitestyle.com/qa/${item.slug}`,
          name: item.question,
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: '홈', item: 'https://whitestyle.com/' },
          { '@type': 'ListItem', position: 2, name: '임상 Q&A', item: 'https://whitestyle.com/qa' },
        ],
      },
    ],
  };

  return (
    <div
      className="max-w-5xl mx-auto px-5 py-20 text-slate-800 wb-ka wbka"
      style={{ wordBreak: 'keep-all', overflowWrap: 'break-word', lineHeight: 1.95 }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="mb-10">
        <span className="inline-block px-3.5 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-bold mb-4">
          국제 치의학 학술문헌 · 심평원 기준 · 3인 원장단 직접 검수
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 leading-tight wb-ka wbka">
          환자 질문에 학술 근거로 답하는 임상 Q&amp;A {EVIDENCE_QA_LIST.length}선
        </h1>
        <p className="text-base text-slate-600 leading-[1.95] wb-ka wbka mb-6">
          임플란트 재수술과 뼈이식, 만성질환 임플란트, 무삭제·최소삭제 라미네이트 신경보호, 성인 재교정과 옥니·치근흡수 예방, 강남역 치과 비급여 가격 비교까지 환자분들이 가장 망설이는 {EVIDENCE_QA_LIST.length}가지 핵심 질문에 대한 결론·기준표·주의사항을 정리했습니다.
        </p>
        <nav aria-label="Q&A 분야별 바로가기" className="flex flex-wrap gap-2">
          {CATEGORIES.map((category) => {
            const count = EVIDENCE_QA_LIST.filter((q) => q.category === category).length;
            return (
              <a
                key={category}
                href={`#${encodeURIComponent(category)}`}
                className="px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:border-sky-500 hover:text-sky-700 transition-colors"
              >
                {category} ({count})
              </a>
            );
          })}
        </nav>
      </header>

      <div className="space-y-12">
        {CATEGORIES.map((category) => {
          const items = EVIDENCE_QA_LIST.filter((q) => q.category === category);
          return (
            <section key={category} id={encodeURIComponent(category)}>
              <h2 className="text-2xl font-extrabold text-slate-900 mb-5 border-l-4 border-sky-600 pl-3.5 wb-ka wbka">
                {category} ({items.length}문)
              </h2>
              <div className="space-y-4">
                {items.map((item) => (
                  <article key={item.slug} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:border-sky-400 transition-colors">
                    <h3 className="text-lg font-extrabold text-slate-900 mb-2 wb-ka wbka">
                      <Link href={`/qa/${item.slug}`} className="hover:text-sky-700">
                        {item.question}
                      </Link>
                    </h3>
                    <p className="text-sm text-slate-600 leading-[1.9] mb-4 wb-ka wbka">{item.shortAnswer}</p>
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs">
                      <span className="text-slate-500">
                        근거 문헌 {item.citations.length}건 · 최종 검수 {item.lastReviewed}
                      </span>
                      <Link href={`/qa/${item.slug}`} className="font-bold text-sky-700 hover:underline">
                        상세 기준표 · 논문 출처 보기 &rarr;
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <div className="mt-14 bg-slate-900 text-white rounded-2xl p-7 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold mb-1.5 wb-ka wbka">내 구강 상태에 맞는 맞춤 상담이 필요하신가요?</h2>
          <p className="text-sm text-slate-300 wb-ka wbka">대표전화 1577-7287 / 02-569-7528 · 강남역 11·12번 출구 도보 1분</p>
        </div>
        <div className="flex flex-wrap gap-2.5 text-xs font-bold">
          <Link href="/price" className="px-4 py-2.5 rounded-lg bg-white text-slate-900">비급여 수가표 ↗</Link>
          <a href="https://booking.naver.com/booking/13/bizes/265482" target="_blank" rel="noopener noreferrer" className="px-4 py-2.5 rounded-lg bg-[#03c75a] text-white">네이버 빠른 예약</a>
        </div>
      </div>
    </div>
  );
}
