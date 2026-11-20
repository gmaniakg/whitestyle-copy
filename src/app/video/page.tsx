import type { Metadata } from 'next';
import Link from 'next/link';
import {
  CELEBRITY_VISIT_VIDEOS,
  CLINICAL_VIDEO_ARTICLES,
} from '@/data/videoArchive';

export const metadata: Metadata = {
  title: '영상 진료실 · 언론방송 아카이브 · 원장단 진료 기준 해설',
  description:
    'MBC 뉴스데스크 방영 클립, 교정 중 주치의 비변경 기준 4가지, 3인 원장단 협진 철학 및 4K 내원 기록을 Q&A·타임스탬프 해설과 함께 제공하는 화이트스타일치과의원 공식 영상 진료실.',
  alternates: { canonical: 'https://whitestyle.com/video' },
  openGraph: {
    title: '영상 진료실 · 언론방송 아카이브 | 화이트스타일치과의원',
    description:
      '강남역 33년 전통 화이트스타일치과의원 김준헌·이봉진·박선혜 3인 원장단의 임상 철학과 MBC 방송 아카이브.',
    url: 'https://whitestyle.com/video',
    type: 'website',
    locale: 'ko_KR',
  },
};

export default function VideoIndexPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': 'https://whitestyle.com/video#collection',
        url: 'https://whitestyle.com/video',
        name: '강남역 화이트스타일치과의원 공식 영상 진료실 · 방송 아카이브',
        inLanguage: 'ko-KR',
        publisher: { '@id': 'https://whitestyle.com/#org' },
      },
      {
        '@type': 'ItemList',
        itemListElement: CLINICAL_VIDEO_ARTICLES.map((item, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          url: `https://whitestyle.com/video/${item.slug}`,
          name: item.title,
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: '홈', item: 'https://whitestyle.com/' },
          { '@type': 'ListItem', position: 2, name: '영상 진료실', item: 'https://whitestyle.com/video' },
        ],
      },
    ],
  };

  return (
    <div
      className="max-w-5xl mx-auto px-5 py-16 text-slate-800 wb-ka wbka"
      style={{ wordBreak: 'keep-all', overflowWrap: 'break-word', lineHeight: 1.95 }}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="mb-12">
        <span className="inline-block px-3.5 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-bold mb-4">
          공식 유튜브 @whitestyle · 방송 보도 및 임상 기준 해설
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 leading-tight wb-ka wbka">
          영상 진료실 · 언론방송 아카이브
        </h1>
        <p className="text-base text-slate-600 leading-[1.95] wb-ka wbka">
          교정 중 주치의 비변경 기준 4가지, MBC 뉴스데스크 방영 클립, 3인 원장단 협진 철학과 내원 기념 영상을 구간 타임스탬프 요약 및 핵심 Q&amp;A와 함께 확인하실 수 있습니다.
        </p>
      </header>

      <section className="mb-14">
        <h2 className="text-2xl font-extrabold text-slate-900 mb-5 border-l-4 border-sky-600 pl-3.5 wb-ka wbka">
          주요 진료 기준 · 방송 보도 해설 아티클 ({CLINICAL_VIDEO_ARTICLES.length}편)
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {CLINICAL_VIDEO_ARTICLES.map((item) => (
            <article
              key={item.slug}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between hover:border-sky-400 transition-colors"
            >
              <div>
                <Link href={`/video/${item.slug}`} className="block relative aspect-video bg-slate-900 overflow-hidden">
                  <img
                    src={`https://i.ytimg.com/vi/${item.youtubeId}/hqdefault.jpg`}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-900/85 text-white text-xs font-bold">
                    {item.category}
                  </span>
                </Link>
                <div className="p-6">
                  <h3 className="text-lg font-extrabold text-slate-900 mb-2 leading-snug wb-ka wbka">
                    <Link href={`/video/${item.slug}`} className="hover:text-sky-700">
                      {item.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-slate-600 leading-[1.85] mb-4 wb-ka wbka">{item.summary}</p>
                </div>
              </div>
              <div className="px-6 pb-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500">타임스탬프 {item.chapters.length}구간 · Q&amp;A {item.qas.length}선</span>
                <Link href={`/video/${item.slug}`} className="font-bold text-sky-700 hover:underline">
                  영상 해설 · Q&amp;A 읽기 &rarr;
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mb-14">
        <h2 className="text-2xl font-extrabold text-slate-900 mb-3 border-l-4 border-slate-700 pl-3.5 wb-ka wbka">
          스타 · 셀럽 내원 4K 기록 아카이브 ({CELEBRITY_VISIT_VIDEOS.length}편)
        </h2>
        <p className="text-sm text-slate-600 mb-6 wb-ka wbka">
          방송인·배우·스포츠 및 문화예술인이 직접 내원해 인사 영상을 남긴 공식 유튜브 채널(@whitestyle) 기록입니다.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CELEBRITY_VISIT_VIDEOS.map((v) => (
            <a
              key={v.youtubeId}
              href={`https://www.youtube.com/watch?v=${v.youtubeId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:border-sky-500 transition-colors"
            >
              <div className="aspect-video bg-slate-900 overflow-hidden">
                <img
                  src={`https://i.ytimg.com/vi/${v.youtubeId}/hqdefault.jpg`}
                  alt={v.title}
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <p className="text-xs font-bold text-sky-700 mb-1">{v.guestLabel}</p>
                <p className="text-sm font-bold text-slate-900 leading-snug wb-ka wbka">{v.title} &#8599;</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      <div className="bg-slate-900 text-white rounded-2xl p-7 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold mb-1.5 wb-ka wbka">학술 근거 Q&amp;A와 비급여 수가표 함께 확인하기</h2>
          <p className="text-sm text-slate-300 wb-ka wbka">대표전화 1577-7287 / 02-569-7528 · 강남역 11·12번 출구 도보 1분</p>
        </div>
        <div className="flex flex-wrap gap-2.5 text-xs font-bold">
          <Link href="/qa" className="px-4 py-2.5 rounded-lg bg-white text-slate-900">
            임상 Q&amp;A 35선 보기 &rarr;
          </Link>
          <a href="https://www.youtube.com/@whitestyle" target="_blank" rel="noopener noreferrer" className="px-4 py-2.5 rounded-lg bg-red-600 text-white">
            공식 유튜브 @whitestyle &#8599;
          </a>
        </div>
      </div>
    </div>
  );
}
