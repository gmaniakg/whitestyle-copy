import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  CLINICAL_VIDEO_ARTICLES,
  getClinicalVideoBySlug,
} from '@/data/videoArchive';
import { DOCTOR_DIRECTORY, getEvidenceQaBySlug } from '@/data/evidenceQa';

export function generateStaticParams() {
  return CLINICAL_VIDEO_ARTICLES.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getClinicalVideoBySlug(slug);
  if (!item) {
    return {
      title: '영상을 찾을 수 없습니다',
      robots: { index: false },
    };
  }
  const url = `https://whitestyle.com/video/${item.slug}`;
  return {
    title: item.title,
    description: item.summary,
    alternates: { canonical: url },
    openGraph: {
      title: `${item.title} | 화이트스타일치과의원`,
      description: item.summary,
      url,
      type: 'video.other',
      locale: 'ko_KR',
      images: [{ url: `https://i.ytimg.com/vi/${item.youtubeId}/hqdefault.jpg`, alt: item.title }],
    },
  };
}

export default async function VideoDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getClinicalVideoBySlug(slug);
  if (!item) {
    notFound();
  }

  const pageUrl = `https://whitestyle.com/video/${item.slug}`;
  const reviewers = item.reviewedByIds.map((id) => DOCTOR_DIRECTORY[id]);
  const relatedQas = item.relatedQaSlugs
    .map((s) => getEvidenceQaBySlug(s))
    .filter((q): q is NonNullable<typeof q> => Boolean(q));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'VideoObject',
        '@id': `${pageUrl}#video`,
        name: item.title,
        description: item.summary,
        thumbnailUrl: [`https://i.ytimg.com/vi/${item.youtubeId}/hqdefault.jpg`],
        uploadDate: `${item.uploadDate}T09:00:00+09:00`,
        duration: item.durationIso,
        embedUrl: `https://www.youtube-nocookie.com/embed/${item.youtubeId}`,
        contentUrl: `https://www.youtube.com/watch?v=${item.youtubeId}`,
        publisher: { '@id': 'https://whitestyle.com/#org' },
      },
      {
        '@type': 'FAQPage',
        '@id': `${pageUrl}#faq`,
        mainEntity: item.qas.map((q) => ({
          '@type': 'Question',
          name: q.question,
          acceptedAnswer: { '@type': 'Answer', text: q.answer },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: '홈', item: 'https://whitestyle.com/' },
          { '@type': 'ListItem', position: 2, name: '영상 진료실', item: 'https://whitestyle.com/video' },
          { '@type': 'ListItem', position: 3, name: item.title, item: pageUrl },
        ],
      },
    ],
  };

  return (
    <article
      className="max-w-4xl mx-auto px-5 py-16 text-slate-800 wb-ka wbka"
      style={{ wordBreak: 'keep-all', overflowWrap: 'break-word', lineHeight: 1.95 }}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="mb-8 flex flex-wrap items-center justify-between gap-3 text-sm">
        <Link href="/video" className="font-bold text-slate-500 hover:text-sky-700">
          &larr; 영상 진료실 전체 목록
        </Link>
        <span className="px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-bold">
          {item.category}
        </span>
      </div>

      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-5 leading-tight wb-ka wbka">
          {item.title}
        </h1>
        <div className="bg-slate-900 text-white rounded-2xl p-6 md:p-7">
          <p className="text-xs font-bold text-sky-300 mb-2">영상 핵심 요약</p>
          <p className="text-base text-slate-100 leading-[1.95] wb-ka wbka">{item.summary}</p>
        </div>
      </header>

      <section className="mb-10">
        <div className="aspect-video w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shadow-sm">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${item.youtubeId}`}
            title={item.title}
            className="w-full h-full border-0"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <p className="mt-2.5 text-xs text-slate-500">
          원본 영상: {item.originalYoutubeTitle} (
          <a
            href={`https://www.youtube.com/watch?v=${item.youtubeId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-700 font-semibold hover:underline"
          >
            유튜브에서 바로 보기 &#8599;
          </a>
          )
        </p>
      </section>

      <section className="mb-10 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-extrabold text-slate-900 mb-4 wb-ka wbka">핵심 체크 3가지</h2>
        <ul className="space-y-2.5 text-sm text-slate-700 list-disc pl-5 leading-[1.9]">
          {item.keyTakeaways.map((pt) => (
            <li key={pt}>{pt}</li>
          ))}
        </ul>
      </section>

      <section className="mb-10 bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="bg-slate-900 text-white px-6 py-4">
          <h2 className="text-lg font-bold wb-ka wbka">구간별 타임스탬프 해설</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-left text-slate-700">
                <th className="py-3.5 px-5 font-bold w-24">시간</th>
                <th className="py-3.5 px-5 font-bold w-56">구간 주제</th>
                <th className="py-3.5 px-5 font-bold">핵심 내용</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {item.chapters.map((ch) => (
                <tr key={ch.time}>
                  <td className="py-4 px-5 font-extrabold text-sky-800 align-top">{ch.time}</td>
                  <td className="py-4 px-5 font-bold text-slate-900 align-top">{ch.label}</td>
                  <td className="py-4 px-5 text-slate-700 align-top">{ch.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-extrabold text-slate-900 mb-4 wb-ka wbka">영상 관련 핵심 질문 Q1~Q3</h2>
        <div className="space-y-4">
          {item.qas.map((q) => (
            <article key={q.question} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 mb-2 wb-ka wbka">Q. {q.question}</h3>
              <p className="text-sm text-slate-700 leading-[1.9] wb-ka wbka">{q.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mb-10 bg-slate-50 border border-slate-200 rounded-2xl p-6">
        <p className="text-xs font-bold text-slate-700 mb-1">검수 의료진:</p>
        <p className="text-sm text-slate-700 mb-4">{reviewers.map((r) => `${r.name}(${r.jobTitle})`).join(' · ')}</p>
        {relatedQas.length > 0 && (
          <div>
            <p className="text-xs font-bold text-slate-700 mb-2">함께 읽으면 좋은 학술 근거 Q&amp;A:</p>
            <div className="flex flex-wrap gap-2">
              {relatedQas.map((qa) => (
                <Link
                  key={qa.slug}
                  href={`/qa/${qa.slug}`}
                  className="px-3.5 py-2 rounded-lg bg-white border border-slate-200 text-xs font-bold text-sky-800 hover:border-sky-500"
                >
                  {qa.question} &rarr;
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>

      <div className="bg-slate-900 text-white rounded-2xl p-7 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold mb-1.5 wb-ka wbka">3인 원장단 1:1 정밀 진단 예약</h2>
          <p className="text-sm text-slate-300 wb-ka wbka">강남역 11·12번 출구 도보 1분 · 1577-7287 / 02-569-7528</p>
        </div>
        <div className="flex flex-wrap gap-2.5 text-xs font-bold">
          <Link href={item.relatedTreatmentUrl} className="px-4 py-2.5 rounded-lg bg-white text-slate-900">
            {item.relatedTreatmentLabel} &rarr;
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
      </div>
    </article>
  );
}
