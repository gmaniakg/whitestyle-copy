import type { Metadata } from 'next';
import Link from 'next/link';
import AestheticSiloNav from '@/components/AestheticSiloNav';

export const metadata: Metadata = {
  title: '원내 자체 기공소 · 지대치 색조 맞춤 세라믹 · 2~3회 완성 안내',
  description:
    '외주 택배 지연 없이 화이트스타일치과 원내 자체 기공소가 의료진과 직접 얼굴·잇몸·지대치 색조를 대조해 초박막 제로쉘과 맞춤형 지대주를 완성하는 정밀 제작 워크플로우를 안내합니다.',
  alternates: { canonical: 'https://whitestyle.com/treatments/aesthetic/shade-lab' },
  openGraph: {
    title: '원내 자체 기공소 · 지대치 색조 맞춤 세라믹 | 화이트스타일치과의원',
    description:
      '치아 투명도, 표면 결, 지대치 색조까지 당일 미세 조율하는 원내 자체 기공소 시스템과 2~3회 집중 완성 일정.',
    url: 'https://whitestyle.com/treatments/aesthetic/shade-lab',
    type: 'website',
    locale: 'ko_KR',
  },
};

const WORKFLOW = [
  {
    step: 'STEP 01 · 3D 스캔 & 지대치 색조(Stump Shade) 채득',
    desc: '세라믹이 붙기 전 실제 자연치아의 명도와 내부 어두움(지대치 색조), 얼굴 피부톤·입술 라인을 고해상도 스캐너와 원내 색조 가이드로 동시 기록합니다.',
  },
  {
    step: 'STEP 02 · 원내 기공소 맞춤 디자인 & CAD/CAM 밀링',
    desc: '입꼬리 라인과 치아 끝단의 자연스러운 반투명(Incisal Translucency)·표면 미세 질감을 원내 기공소에서 직접 깎고 도재 축성합니다.',
  },
  {
    step: 'STEP 03 · 진료실 시적(Try-in) 및 당일 미세 색조·교합 조율',
    desc: '환자가 거울로 치아 형태와 밝기를 확인한 뒤 미세한 0.1mm 길이·질감·광택 수정 요청을 외주 택배 대기 없이 원내에서 당일 조율합니다.',
  },
  {
    step: 'STEP 04 · 최종 정밀 접착 & 3·6·12개월 사후 관리',
    desc: '법랑질 보존 접착 완료 후 이갈이·저작 간섭을 최종 점검하고 정품 세라믹 보증 및 3·6·12개월 치주 리콜을 연결합니다.',
  },
];

const FAQS = [
  {
    q: '지대치 색조(Stump Shade)를 맞추는 게 왜 그렇게 중요한가요?',
    a: '라미네이트는 0.1~0.2mm 수준으로 얇기 때문에 아래에 있는 원래 치아 색(지대치 색조)이 비쳐 나옵니다. 원래 치아가 어둡거나 신경치료로 변색된 상태에서 무조건 맑은 세라믹만 씌우면 회색빛이 도는 반면, 지대치 색을 먼저 측정해 마스킹·반투명도를 조절해야 자연치아처럼 화사합니다.',
  },
  {
    q: '지방이나 일본에서 방문해도 2~3회 내원으로 끝낼 수 있나요?',
    a: '네. 원내 자체 기공소 협업을 통해 1차 3D 스캔·디자인 상담 후 2~3회 내원(약 1~2주 내외 또는 체류 일정 맞춤 조율)으로 완성하며, 일본어 전담 통역 스태프 3명이(+82-10-3046-5010 / LINE whitestyle1) 사전 방한 일정을 도와드립니다.',
  },
  {
    q: '원내 자체 기공소가 있으면 임플란트 커스텀 지대주 제작에도 도움이 되나요?',
    a: '네. 임플란트 역시 환자 잇몸 높이에 딱 맞는 맞춤형 커스텀 어버트먼트와 상부 지르코니아·PFM 크라운 적합도를 진료실과 바로 조율해 음식물 끼임과 보철 파절 부담을 줄입니다.',
  },
];

export default function AestheticShadeLabPage() {
  const pageUrl = 'https://whitestyle.com/treatments/aesthetic/shade-lab';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'MedicalWebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: '원내 자체 기공소 · 지대치 색조 맞춤 세라믹 · 2~3회 완성 안내',
        description:
          '원내 자체 기공소와 3D 디지털 스캔을 연동해 지대치 색조·반투명도를 맞추는 심미보철 제작 안내.',
        inLanguage: 'ko-KR',
        lastReviewed: '2026-11-20',
        isPartOf: { '@id': 'https://whitestyle.com/#website' },
        mainEntity: { '@id': 'https://whitestyle.com/#org' },
      },
      {
        '@type': 'FAQPage',
        mainEntity: FAQS.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: '홈', item: 'https://whitestyle.com/' },
          { '@type': 'ListItem', position: 2, name: '심미치료', item: 'https://whitestyle.com/treatments/aesthetic' },
          { '@type': 'ListItem', position: 3, name: '자체 기공소·색조', item: pageUrl },
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

      <AestheticSiloNav activePath="/treatments/aesthetic/shade-lab" />

      <header className="mb-10">
        <span className="inline-block px-3.5 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-bold mb-4">
          원내 자체 기공소 직접 제작 · 외주 왕복 지연 최소화
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-5 leading-tight wb-ka wbka">
          원내 자체 기공소 &amp; 지대치 색조(Stump Shade)<br />맞춤형 초박막 세라믹 제작 시스템
        </h1>
        <div className="bg-slate-900 text-white rounded-2xl p-6 md:p-7">
          <p className="text-xs font-bold text-sky-300 mb-2">핵심 차별점</p>
          <p className="text-base text-slate-100 leading-[1.95] wb-ka wbka">
            하얗고 네모난 인공적인 치아가 아니라 내 얼굴톤과 인접 치아 반투명도에 어우러지는 자연스러운 스마일은 의료진과 기공사가 한 공간에서 직접 소통할 때 완성됩니다. 화이트스타일치과는 원내 자체 기공소 협업으로 미세 형태·색조 수정과 보통 2~3회 집중 완성을 지원합니다.
          </p>
        </div>
      </header>

      <section className="mb-10 grid md:grid-cols-2 gap-5">
        {WORKFLOW.map((w) => (
          <article key={w.step} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-extrabold text-slate-900 mb-2 wb-ka wbka">{w.step}</h2>
            <p className="text-sm text-slate-700 leading-[1.9] wb-ka wbka">{w.desc}</p>
          </article>
        ))}
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-extrabold text-slate-900 mb-4 wb-ka wbka">기공·일정 관련 자주 묻는 질문</h2>
        <div className="space-y-4">
          {FAQS.map((f) => (
            <article key={f.q} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 mb-2 wb-ka wbka">Q. {f.q}</h3>
              <p className="text-sm text-slate-700 leading-[1.9] wb-ka wbka">{f.a}</p>
            </article>
          ))}
        </div>
      </section>

      <div className="bg-slate-900 text-white rounded-2xl p-7 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold mb-1.5 wb-ka wbka">맞춤 색조·단기 체류 심미보철 상담 예약</h2>
          <p className="text-sm text-slate-300 wb-ka wbka">대표전화 1577-7287 / 02-569-7528 · 일본어 직통 +82-10-3046-5010 (LINE whitestyle1)</p>
        </div>
        <div className="flex flex-wrap gap-2.5 text-xs font-bold">
          <Link href="/warranty" className="px-4 py-2.5 rounded-lg bg-white text-slate-900">
            정품 보증 · 리콜 안내 &rarr;
          </Link>
          <a href="https://booking.naver.com/booking/13/bizes/265482" target="_blank" rel="noopener noreferrer" className="px-4 py-2.5 rounded-lg bg-[#03c75a] text-white">
            네이버 빠른 예약 (1분 완료)
          </a>
        </div>
      </div>
    </div>
  );
}
