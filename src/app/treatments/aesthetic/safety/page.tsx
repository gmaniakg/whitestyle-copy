import type { Metadata } from 'next';
import Link from 'next/link';
import AestheticSiloNav from '@/components/AestheticSiloNav';

export const metadata: Metadata = {
  title: '라미네이트 신경손상 예방 · 법랑질 보존 5단계 안전 프로토콜',
  description:
    '라미네이트 후 시림·탈락·신경 손상을 막기 위한 화이트스타일치과의원의 5단계 심미보철 안전 프로토콜. 법랑질 내 접착(PMID 38604905), 주수 마찰열 냉각, 3단계 무통 국소마취 기준을 안내합니다.',
  alternates: { canonical: 'https://whitestyle.com/treatments/aesthetic/safety' },
  openGraph: {
    title: '라미네이트 신경손상 예방 · 법랑질 보존 5단계 안전 프로토콜 | 화이트스타일치과의원',
    description:
      '상아질 노출을 차단하는 법랑질 보존 원칙과 비수면 3단계 국소 무통 마취 안전 기준 안내.',
    url: 'https://whitestyle.com/treatments/aesthetic/safety',
    type: 'website',
    locale: 'ko_KR',
  },
};

const SAFETY_STEPS = [
  {
    step: '1단계 · 사전 돌출·법랑질 두께 계측',
    title: '삭제 전 3D 스캔 · 치아 배열 시뮬레이션',
    detail:
      '겉면을 깎기 전에 3D 구강스캔과 교합 검진으로 치아 표면 법랑질 두께 여유와 아랫니 맞물림을 측정합니다. 돌출량 때문에 법랑질을 넘어야 한다면 라미네이트를 보류하고 3~6개월 부분교정을 먼저 제안합니다.',
  },
  {
    step: '2단계 · 법랑질 100% 보존 가이드',
    title: '무삭제 또는 0.1~0.2mm 극소 다듬기 제한',
    detail:
      'Alqutaibi 등(2025, PMID 38604905)의 메타분석에 따르면 상아질이 노출된 케이스보다 법랑질 내부에 접착된 세라믹 비니어가 유의하게 높은 생존율과 낮은 탈락·변색률을 보입니다. 법랑질 경계를 지키는 것이 수명과 시림 예방의 제1원칙입니다.',
  },
  {
    step: '3단계 · 저발열 미세 연마 & 충분한 주수 냉각',
    title: '치수(신경) 열자극 차단 프로토콜',
    detail:
      '고속 핸드피스로 수분 냉각 없이 치아를 다듬으면 마찰열이 내부 신경으로 전달되어 술후 통증과 신경 괴사를 유발할 수 있습니다. 고배율 확대 시야와 충분한 주수 냉각 아래 최소 시간만 정밀 연마합니다.',
  },
  {
    step: '4단계 · 비수면 3단계 무통 국소마취 원칙',
    title: '전신 부담 없는 의식 유지 안전 시술',
    detail:
      '무삭제는 대부분 마취 없이도 가능하며, 최소 다듬기가 필요할 때도 호흡 억제 위험이 있는 수면마취 대신 가글·도포·컴퓨터 정압 국소마취 3단계 시스템을 적용해 환자 반응과 교합 확인을 실시간으로 유지합니다.',
  },
  {
    step: '5단계 · 격리 방습 접착 & 3·6·12개월 치주 리콜',
    title: '잇몸 출혈·타액 차단 & 교합 간섭 제거',
    detail:
      '박선혜 원장(치주과 전문의)·이봉진 대표원장 협진으로 접착 중 습기와 출혈을 철저히 차단하고, 부착 후 이갈이·측방 운동 시 한 치아에만 과부하가 실리지 않도록 교합을 미세 조율합니다.',
  },
];

const FAQS = [
  {
    q: '라미네이트를 하면 나중에 무조건 신경치료를 해야 하나요?',
    a: '그렇지 않습니다. 신경 손상은 치아를 과도하게 깊게 깎아 상아질을 넓게 노출시키거나, 냉각 없이 마찰열이 가해질 때 주로 발생합니다. 무삭제 또는 법랑질 내 0.1~0.2mm 최소 다듬기 원칙을 지키면 자연치아 신경이 온전히 살아 있는 상태로 유지됩니다.',
  },
  {
    q: '시술 후 찬물을 마실 때 시리면 부작용인가요?',
    a: '미세 다듬기와 접착 산부식 직후에는 수일 내 가라앉는 경미한 일시적 민감성이 나타날 수 있습니다. 다만 2주 이상 뜨거운 음식에도 욱신거리거나 씹을 때 아프다면 교합 간섭 점검이 필요합니다.',
  },
  {
    q: '잇몸이 붉게 붓거나 세라믹 주변에 충치가 생기는 것을 어떻게 막나요?',
    a: '치과와 기공소 사이의 틈(변연 적합도)을 줄이는 것이 첫째이며, 박선혜 원장(치주과 전문의)의 3·6·12개월 정기 리콜 시 세라믹 손상을 주지 않는 전용 세정 팁으로 잇몸 경계를 관리합니다.',
  },
  {
    q: '수면마취 없이 시술하면 아프거나 무섭지 않을까요?',
    a: '무삭제·최소삭제 범위에서는 통증이 매우 경미하며, 마취가 필요한 부위에도 3단계 통증 완화 국소마취로 따끔함을 낮춘 채 깨어 있는 상태에서 교합을 정확히 맞출 수 있어 전신적으로 훨씬 안전합니다.',
  },
];

export default function AestheticSafetyPage() {
  const pageUrl = 'https://whitestyle.com/treatments/aesthetic/safety';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'MedicalWebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: '라미네이트 신경손상 예방 · 법랑질 보존 5단계 안전 프로토콜',
        description:
          '화이트스타일치과의원의 치아 법랑질 보존, 마찰열 냉각, 3단계 국소 무통마취 및 치주과 협진 심미보철 안전 기준.',
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
          { '@type': 'ListItem', position: 3, name: '안전 프로토콜', item: pageUrl },
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

      <AestheticSiloNav activePath="/treatments/aesthetic/safety" />

      <header className="mb-10">
        <span className="inline-block px-3.5 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-bold mb-4">
          치주과 전문의 · 보철 · 교정 3인 원장단 안전 기준
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-5 leading-tight wb-ka wbka">
          시림과 신경손상을 예방하는<br />법랑질 보존 5단계 안전 프로토콜
        </h1>
        <div className="bg-slate-900 text-white rounded-2xl p-6 md:p-7">
          <p className="text-xs font-bold text-sky-300 mb-2">핵심 안전 기준</p>
          <p className="text-base text-slate-100 leading-[1.95] wb-ka wbka">
            세라믹 비니어의 장기 수명(PMID 26757327 · 38604905)과 자연치아 신경 건강은 치아를 얼마나 적게, 얼마나 차갑게, 얼마나 법랑질 안쪽에서 정교하게 다루느냐에 달려 있습니다. 화이트스타일치과는 수면마취 없이 의식을 유지한 채 5단계 안전 기준을 준수합니다.
          </p>
        </div>
      </header>

      <section className="mb-10 space-y-4">
        {SAFETY_STEPS.map((item) => (
          <article key={item.step} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <span className="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-extrabold mb-2">
              {item.step}
            </span>
            <h2 className="text-xl font-extrabold text-slate-900 mb-2 wb-ka wbka">{item.title}</h2>
            <p className="text-sm text-slate-700 leading-[1.9] wb-ka wbka">{item.detail}</p>
          </article>
        ))}
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-extrabold text-slate-900 mb-4 wb-ka wbka">안전 · 부작용 예방 FAQ</h2>
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
          <h2 className="text-xl font-extrabold mb-1.5 wb-ka wbka">기존 보철 시림 · 재시술이 고민되시나요?</h2>
          <p className="text-sm text-slate-300 wb-ka wbka">대표전화 1577-7287 / 02-569-7528 · 일본어 직통 +82-10-3046-5010</p>
        </div>
        <div className="flex flex-wrap gap-2.5 text-xs font-bold">
          <Link href="/treatments/aesthetic/retreatment" className="px-4 py-2.5 rounded-lg bg-white text-slate-900">
            라미네이트 재시술 기준 보기 &rarr;
          </Link>
          <Link href="/qa/laminate-pulp-safety-minimal-prep" className="px-4 py-2.5 rounded-lg bg-sky-600 text-white">
            신경보호 학술 Q&amp;A &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
