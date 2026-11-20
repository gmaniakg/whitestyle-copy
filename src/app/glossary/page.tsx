import type { Metadata } from 'next';
import Link from 'next/link';
import { DENTAL_GLOSSARY_TERMS, type DentalGlossaryTerm } from '@/data/dentalGlossary';

export const metadata: Metadata = {
  title: `치과 핵심 용어 사전 ${DENTAL_GLOSSARY_TERMS.length}선 · 임플란트·교정·라미네이트·치주`,
  description:
    `임플란트 재수술, GBR 뼈이식, 상악동거상술, 무삭제 제로쉘, 옥니 재교정, 치주과 전문의 리콜 등 강남역 화이트스타일치과의원 3인 원장단이 정리한 환자 필수 치과 용어 사전 ${DENTAL_GLOSSARY_TERMS.length}선.`,
  alternates: { canonical: 'https://whitestyle.com/glossary' },
  openGraph: {
    title: `치과 핵심 용어 사전 ${DENTAL_GLOSSARY_TERMS.length}선 | 화이트스타일치과의원`,
    description:
      `임플란트·치아교정·최소삭제 심미보철·치주 안전 프로토콜 핵심 용어와 임상 확인 포인트 ${DENTAL_GLOSSARY_TERMS.length}선.`,
    url: 'https://whitestyle.com/glossary',
    type: 'website',
    locale: 'ko_KR',
  },
};

const CATEGORIES: DentalGlossaryTerm['category'][] = [
  '임플란트·재수술',
  '라미네이트·심미보철',
  '치아교정·재교정',
  '잇몸·마취·안전',
];

export default function GlossaryPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'DefinedTermSet',
        '@id': 'https://whitestyle.com/glossary#termset',
        name: '화이트스타일치과의원 치과 핵심 임상 용어 사전',
        url: 'https://whitestyle.com/glossary',
        inLanguage: 'ko-KR',
        publisher: { '@id': 'https://whitestyle.com/#org' },
        hasDefinedTerm: DENTAL_GLOSSARY_TERMS.map((item) => ({
          '@type': 'DefinedTerm',
          '@id': `https://whitestyle.com/glossary#${item.id}`,
          name: item.term,
          alternateName: item.alternateNames,
          description: `${item.definition} ${item.clinicalNote}`,
          inDefinedTermSet: 'https://whitestyle.com/glossary#termset',
          url: `https://whitestyle.com/glossary#${item.id}`,
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: '홈', item: 'https://whitestyle.com/' },
          { '@type': 'ListItem', position: 2, name: '치과 용어 사전', item: 'https://whitestyle.com/glossary' },
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
          1994년 개원 33년 3인 원장단 검수 · 치과 핵심 용어 {DENTAL_GLOSSARY_TERMS.length}선
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 leading-tight wb-ka wbka">
          상담 전 알면 쉬운 치과 핵심 용어 사전
        </h1>
        <p className="text-base text-slate-600 leading-[1.95] wb-ka wbka mb-6">
          임플란트 재수술과 뼈이식, 무삭제·최소삭제 라미네이트, 성인 재교정, 치주과 전문의 리콜 등 상담실에서 자주 등장하지만 이해하기 어려웠던 치과 의학 용어 {DENTAL_GLOSSARY_TERMS.length}가지를 환자분 눈높이에 맞춰 정리했습니다.
        </p>
        <nav aria-label="용어 분야별 바로가기" className="flex flex-wrap gap-2">
          {CATEGORIES.map((category) => {
            const count = DENTAL_GLOSSARY_TERMS.filter((t) => t.category === category).length;
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
          const items = DENTAL_GLOSSARY_TERMS.filter((t) => t.category === category);
          return (
            <section key={category} id={encodeURIComponent(category)}>
              <h2 className="text-2xl font-extrabold text-slate-900 mb-5 border-l-4 border-sky-600 pl-3.5 wb-ka wbka">
                {category} ({items.length}항목)
              </h2>
              <div className="grid md:grid-cols-2 gap-5">
                {items.map((item) => (
                  <article
                    key={item.id}
                    id={item.id}
                    className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <h3 className="text-lg font-extrabold text-slate-900 mb-2 wb-ka wbka">{item.term}</h3>
                      <p className="text-xs text-slate-500 mb-3 wb-ka wbka">
                        관련 표현: {item.alternateNames.join(' · ')}
                      </p>
                      <p className="text-sm text-slate-800 leading-[1.9] mb-3 wb-ka wbka">{item.definition}</p>
                      <p className="text-xs text-slate-600 bg-slate-50 border border-slate-100 rounded-xl p-3.5 leading-[1.85] wb-ka wbka">
                        <strong>임상 확인 포인트:</strong> {item.clinicalNote}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-100">
                      <Link href={item.relatedUrl} className="text-xs font-bold text-sky-700 hover:underline">
                        관련 진료 · 임상 기준표 확인 &rarr;
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
          <h2 className="text-xl font-extrabold mb-1.5 wb-ka wbka">증상과 용어에 맞는 구체적 해답이 필요하신가요?</h2>
          <p className="text-sm text-slate-300 wb-ka wbka">근거 기반 임상 Q&amp;A 15선 또는 비급여 투명 수가표를 함께 확인하세요.</p>
        </div>
        <div className="flex flex-wrap gap-2.5 text-xs font-bold">
          <Link href="/qa" className="px-4 py-2.5 rounded-lg bg-sky-600 text-white">임상 Q&amp;A 15선 &rarr;</Link>
          <Link href="/price" className="px-4 py-2.5 rounded-lg bg-white text-slate-900">비급여 수가표 &rarr;</Link>
        </div>
      </div>
    </div>
  );
}
