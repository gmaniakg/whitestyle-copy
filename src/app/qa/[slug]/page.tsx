import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  DOCTOR_DIRECTORY,
  EVIDENCE_QA_LIST,
  getEvidenceQaBySlug,
} from '@/data/evidenceQa';
import { DENTAL_GLOSSARY_TERMS } from '@/data/dentalGlossary';

export function generateStaticParams() {
  return EVIDENCE_QA_LIST.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getEvidenceQaBySlug(slug);
  if (!item) {
    return {
      title: '질문을 찾을 수 없습니다',
      robots: { index: false },
    };
  }
  const url = `https://whitestyle.com/qa/${item.slug}`;
  return {
    title: item.question,
    description: item.shortAnswer,
    alternates: { canonical: url },
    openGraph: {
      title: `${item.question} | 화이트스타일치과의원`,
      description: item.shortAnswer,
      url,
      type: 'article',
      locale: 'ko_KR',
    },
  };
}

export default async function QaDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getEvidenceQaBySlug(slug);
  if (!item) {
    notFound();
  }

  const pageUrl = `https://whitestyle.com/qa/${item.slug}`;
  const reviewers = item.reviewedByIds.map((id) => DOCTOR_DIRECTORY[id]);
  const glossaryMatches = DENTAL_GLOSSARY_TERMS.filter((g) =>
    item.relatedGlossaryIds.includes(g.id)
  );
  const relatedQas = EVIDENCE_QA_LIST.filter(
    (other) => other.slug !== item.slug && other.category === item.category
  ).slice(0, 3);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'MedicalWebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: item.question,
        description: item.shortAnswer,
        inLanguage: 'ko-KR',
        lastReviewed: item.lastReviewed,
        medicalAudience: { '@type': 'MedicalAudience', audienceType: 'Patient' },
        isPartOf: { '@id': 'https://whitestyle.com/#website' },
        mainEntity: { '@id': 'https://whitestyle.com/#org' },
        about: glossaryMatches.map((g) => ({
          '@type': 'DefinedTerm',
          '@id': `https://whitestyle.com/glossary#${g.id}`,
          name: g.term,
        })),
        citation: item.citations.map((c) => ({
          '@type': 'ScholarlyArticle',
          name: c.title,
          url: c.url,
          ...(c.pmid ? { sameAs: c.url } : {}),
        })),
        reviewedBy: reviewers.map((r) => ({
          '@type': 'Physician',
          '@id': r.id,
          name: r.name,
          jobTitle: r.jobTitle,
        })),
      },
      {
        '@type': 'FAQPage',
        '@id': `${pageUrl}#faq`,
        mainEntity: [
          {
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: { '@type': 'Answer', text: item.shortAnswer },
          },
          ...item.faqFollowups.map((f) => ({
            '@type': 'Question',
            name: f.question,
            acceptedAnswer: { '@type': 'Answer', text: f.answer },
          })),
        ],
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: '홈', item: 'https://whitestyle.com/' },
          { '@type': 'ListItem', position: 2, name: '임상 Q&A', item: 'https://whitestyle.com/qa' },
          { '@type': 'ListItem', position: 3, name: item.question, item: pageUrl },
        ],
      },
    ],
  };

  return (
    <article
      className="max-w-4xl mx-auto px-5 py-20 text-slate-800 wb-ka wbka"
      style={{ wordBreak: 'keep-all', overflowWrap: 'break-word', lineHeight: 1.95 }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mb-8 flex flex-wrap items-center justify-between gap-3 text-sm">
        <Link href="/qa" className="font-bold text-slate-500 hover:text-sky-700">
          &larr; 임상 Q&amp;A 전체 목록
        </Link>
        <span className="px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-bold">
          {item.category} · 최종 검수일 {item.lastReviewed}
        </span>
      </div>

      <header className="mb-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-5 leading-tight wb-ka wbka">
          {item.question}
        </h1>
        <div className="bg-slate-900 text-white rounded-2xl p-6 md:p-7">
          <p className="text-xs font-bold uppercase tracking-wider text-sky-300 mb-2">핵심 결론</p>
          <p className="text-base leading-[1.95] text-slate-100 clinical-lead-sentence wb-ka wbka">
            {item.shortAnswer}
          </p>
        </div>
      </header>

      <section className="mb-10 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-extrabold text-slate-900 mb-4 wb-ka wbka">핵심 3줄 임상 요약</h2>
        <ul className="space-y-2.5 text-sm text-slate-700 list-disc pl-5 leading-[1.9]">
          {item.summaryPoints.map((pt) => (
            <li key={pt}>{pt}</li>
          ))}
        </ul>
      </section>

      <section className="mb-10 bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="bg-slate-900 text-white px-6 py-4">
          <h2 className="text-lg font-bold wb-ka wbka">진단 · 단계별 임상 판단 기준표</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-left text-slate-700">
                <th className="py-3.5 px-5 font-bold w-44">구분 · 단계</th>
                <th className="py-3.5 px-5 font-bold">적응증 · 임상 기준</th>
                <th className="py-3.5 px-5 font-bold">확인 포인트</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {item.criteriaTable.map((row) => (
                <tr key={row.label}>
                  <td className="py-4 px-5 font-bold text-slate-900 align-top">{row.label}</td>
                  <td className="py-4 px-5 text-slate-700 align-top">{row.detail}</td>
                  <td className="py-4 px-5 text-slate-600 align-top">{row.clinicalCheck}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10 bg-amber-50 border border-amber-200 border-l-4 border-l-amber-600 rounded-xl p-6">
        <h2 className="text-lg font-bold text-amber-950 mb-2 wb-ka wbka">
          안 해도 되는 경우 · 시술 전 꼭 짚어야 할 주의사항
        </h2>
        <p className="text-sm text-slate-800 leading-[1.95] wb-ka wbka">{item.whenNotNeededOrCaution}</p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-extrabold text-slate-900 mb-4 wb-ka wbka">후속 질문 (Q&amp;A)</h2>
        <div className="space-y-4">
          {item.faqFollowups.map((f) => (
            <article key={f.question} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 mb-2 wb-ka wbka">Q. {f.question}</h3>
              <p className="text-sm text-slate-700 leading-[1.9] clinical-faq-answer wb-ka wbka">{f.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mb-10 bg-slate-50 border border-slate-200 rounded-2xl p-6">
        <h2 className="text-lg font-extrabold text-slate-900 mb-3 wb-ka wbka">검수 의료진 및 학술·공식 근거 출처</h2>
        <div className="mb-4 text-sm text-slate-700">
          <p className="font-bold text-slate-900 mb-1">검수 의료진 (최종 검수일 {item.lastReviewed}):</p>
          <p>{reviewers.map((r) => `${r.name}(${r.jobTitle})`).join(' · ')}</p>
        </div>
        <ul className="space-y-2 text-xs text-slate-600 list-disc pl-5">
          {item.citations.map((c) => (
            <li key={c.url}>
              <a href={c.url} target="_blank" rel="noopener noreferrer" className="text-sky-700 font-semibold hover:underline">
                [{c.source}] {c.title} &#8599;
              </a>
            </li>
          ))}
        </ul>
      </section>

      {glossaryMatches.length > 0 && (
        <section className="mb-10">
          <h2 className="text-lg font-extrabold text-slate-900 mb-3 wb-ka wbka">관련 치과 용어 확인</h2>
          <div className="flex flex-wrap gap-2">
            {glossaryMatches.map((g) => (
              <Link
                key={g.id}
                href={`/glossary#${g.id}`}
                className="px-3.5 py-2 rounded-lg bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:border-sky-500 hover:text-sky-700"
              >
                {g.term} &rarr;
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="bg-slate-900 text-white rounded-2xl p-7 mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold mb-1.5 wb-ka wbka">정밀 진단 및 맞춤 상담 예약</h2>
          <p className="text-sm text-slate-300 wb-ka wbka">
            강남역 11·12번 출구 도보 1분 · 대표상담 1577-7287 / 02-569-7528 · 일본어 직통 +82-10-3046-5010
          </p>
        </div>
        <div className="flex flex-wrap gap-2.5 text-xs font-bold shrink-0">
          <Link href={item.relatedTreatmentUrl} className="px-4 py-2.5 rounded-lg bg-white text-slate-900">
            {item.relatedTreatmentLabel}
          </Link>
          <a
            href="https://booking.naver.com/booking/13/bizes/265482"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-lg bg-[#03c75a] text-white"
          >
            네이버 빠른 예약 (1분 완료)
          </a>
        </div>
      </section>

      {relatedQas.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-extrabold text-slate-900 mb-3 wb-ka wbka">같은 분야 관련 Q&amp;A</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {relatedQas.map((other) => (
              <Link
                key={other.slug}
                href={`/qa/${other.slug}`}
                className="block bg-white border border-slate-200 rounded-xl p-4 hover:border-sky-500"
              >
                <p className="text-sm font-bold text-slate-900 leading-snug">{other.question}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <p className="text-xs text-slate-500 leading-relaxed">
        ※ 모든 치과 시술 및 재치료의 적응증, 치료 기간, 비용, 부작용 가능성(일시적 시림·부종·출혈·감각 이상 등)은 개인의 구강 상태와 전신 질환 여부에 따라 다르므로 3D CT 정밀 진단 후 담당 의료진과 충분히 상의하시기 바랍니다.
      </p>
    </article>
  );
}
