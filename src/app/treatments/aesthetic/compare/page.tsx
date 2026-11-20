import type { Metadata } from 'next';
import Link from 'next/link';
import AestheticSiloNav from '@/components/AestheticSiloNav';

export const metadata: Metadata = {
  title: '무삭제 제로쉘 vs 최소삭제 vs 일반 라미네이트 vs 앞니 부분교정 4방식 비교',
  description:
    '강남역 화이트스타일치과의원의 치아 상태별 4방식 객관 비교. 무삭제 제로쉘, 0.1~0.2mm 최소삭제 이지화이트, 일반 삭제 라미네이트, 3~6개월 앞니 부분교정 중 내 치아를 지키는 최적 선택 기준을 안내합니다.',
  alternates: { canonical: 'https://whitestyle.com/treatments/aesthetic/compare' },
  openGraph: {
    title: '무삭제 제로쉘 vs 최소삭제 vs 부분교정 4방식 비교 | 화이트스타일치과의원',
    description:
      '치아 돌출, 왜소치, 앞니 벌어짐에 따라 무삭제·최소삭제·부분교정 중 무엇이 유리한지 3인 원장단 기준으로 비교합니다.',
    url: 'https://whitestyle.com/treatments/aesthetic/compare',
    type: 'website',
    locale: 'ko_KR',
  },
};

const COMPARE_ROWS = [
  {
    item: '추천 대상 · 적응증',
    zeroshell: '왜소치(선천성 작은 치아), 미세 틈새, 법랑질이 건강하고 돌출이 없는 치열',
    minimal: '경미한 각도·표면 굴곡 보완, 미백으로 해결 안 되는 선천적 착색, 기존 얇은 보철 교체',
    ortho: '치아 크기는 정상인데 사이 틈만 넓거나 덧니·돌출 각도 자체가 큰 경우',
    general: '큰 치아 파절·광범위 기존 충치·심한 형태 변형 (불가피한 경우에만 올세라믹 검토)',
  },
  {
    item: '자연치아 삭제 범위',
    zeroshell: '무삭제 원칙 (접착 전 미세 표면 세정·정돈 위주)',
    minimal: '법랑질 범위 내 0.1~0.2mm 극소 다듬기',
    ortho: '치아 삭제 없음 (필요 시 0.1~0.2mm 치간 다듬기 일부 검토)',
    general: '0.5mm 이상 다량 삭제 시 상아질 노출·시림·신경 부담 상승',
  },
  {
    item: '내원 횟수 · 소요 기간',
    zeroshell: '정밀 스캔 · 자체 기공 제작 · 부착 보통 2~3회 (1~2주 내외)',
    minimal: '3D 스캔 · 시적 확인 · 최종 접착 보통 2~3회 내원',
    ortho: '부분교정 기준 보통 3~6개월 (월 1회 조절)',
    general: '임시치아 기간 포함 다회 내원 가능',
  },
  {
    item: '시림 · 신경 손상 위험',
    zeroshell: '법랑질 100% 보존으로 시림·신경 손상 부담 최소',
    minimal: '법랑질 내부 접착 유지 시 술후 과민 최소화',
    ortho: '치아를 깎지 않으나 초기 치아이동 뻐근함 2~4일 발생 가능',
    general: '상아질 깊이 침범 시 술후 시림 및 근관치료 위험 증가',
  },
];

const FAQS = [
  {
    q: '치아가 약간 튀어나왔는데도 무조건 무삭제 라미네이트를 하면 어떻게 되나요?',
    a: '이미 앞으로 뻗은 치아에 삭제 없이 세라믹 두께(약 0.2mm 내외)를 덧붙이면 입매가 더 나와 보이고 치아가 두꺼워져 잇몸 주변에 치태가 낄 수 있습니다. 이때는 3~6개월 앞니 부분교정으로 먼저 각도를 넣거나 최소 다듬기 범위를 객관적으로 비교해야 자연스럽습니다.',
  },
  {
    q: '무삭제 제로쉘은 왜 3인 원장단 협진으로 진행하나요?',
    a: '앞니 심미보철은 겉모양만 다듬으면 어금니·아랫니와의 맞물림(교합)이나 잇몸 라인이 무너지기 쉽습니다. 교정학 박사 김준헌 병원장(교정 vs 보철 선별), 이봉진 대표원장(교합 안정), 치주과 전문의 박선혜 원장(잇몸 라인·법랑질 접착)이 협진해야 오래가는 결과를 얻습니다.',
  },
  {
    q: '원내 자체 기공소가 있으면 완성 기간과 색조가 달라지나요?',
    a: '네. 외주 택배 왕복 없이 원내 자체 기공소에서 지대치 색조(Stump Shade)와 인접 자연치아 반투명도를 직접 보며 수정하기 때문에 보통 2~3회 내원으로 톤과 질감을 정밀하게 맞출 수 있습니다.',
  },
  {
    q: '라미네이트 1개나 2개만 부분 시술도 가능한가요?',
    a: '전체 치아를 불필요하게 건드리지 않고, 왜소치·변색·파절된 1~2개 치아만 주변 자연치아 색상에 맞춰 단독으로 제작·부착하는 부분 시술을 원칙으로 우선 검토합니다.',
  },
];

export default function AestheticComparePage() {
  const pageUrl = 'https://whitestyle.com/treatments/aesthetic/compare';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'MedicalWebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: '무삭제 제로쉘 vs 최소삭제 vs 일반 라미네이트 vs 앞니 부분교정 4방식 비교',
        description:
          '강남역 화이트스타일치과의원의 자연치아 보존 중심 심미보철 4방식 비교 기준과 적응증 안내.',
        inLanguage: 'ko-KR',
        lastReviewed: '2026-11-20',
        isPartOf: { '@id': 'https://whitestyle.com/#website' },
        mainEntity: { '@id': 'https://whitestyle.com/#org' },
        citation: [
          {
            '@type': 'ScholarlyArticle',
            name: 'Clinical survival and complication rate of ceramic veneers bonded to different substrates (Alqutaibi et al., J Prosthet Dent 2025)',
            url: 'https://pubmed.ncbi.nlm.nih.gov/38604905/',
          },
          {
            '@type': 'ScholarlyArticle',
            name: 'Main Clinical Outcomes of Feldspathic Porcelain and Glass-Ceramic Laminate Veneers (Morimoto et al., 2016)',
            url: 'https://pubmed.ncbi.nlm.nih.gov/26757327/',
          },
        ],
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
          { '@type': 'ListItem', position: 3, name: '4방식 비교', item: pageUrl },
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

      <AestheticSiloNav activePath="/treatments/aesthetic/compare" />

      <header className="mb-10">
        <span className="inline-block px-3.5 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-bold mb-4">
          1994년 개원 33년 · 자연치아 법랑질 보존 기준
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-5 leading-tight wb-ka wbka">
          무삭제 제로쉘 vs 최소삭제 vs 앞니 부분교정<br />내 치아에 맞는 4방식 객관 비교
        </h1>
        <div className="bg-slate-900 text-white rounded-2xl p-6 md:p-7">
          <p className="text-xs font-bold text-sky-300 mb-2">핵심 기준 요약</p>
          <p className="text-base text-slate-100 leading-[1.95] wb-ka wbka">
            강남역 화이트스타일치과의원은 치아를 무조건 깎는 빠른 심미시술을 지양합니다. 왜소치·미세 틈새는 무삭제 제로쉘, 미세 각도 보정이 필요할 때는 법랑질 내 0.1~0.2mm 최소삭제(이지화이트), 치아 크기·색상은 건강하고 배열만 틀어졌다면 3~6개월 부분교정을 먼저 권해 드립니다.
          </p>
        </div>
      </header>

      <section className="mb-10 bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="bg-slate-900 text-white px-6 py-4">
          <h2 className="text-lg font-bold wb-ka wbka">심미 개선 4가지 방법 임상 비교표</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse min-w-[720px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-left text-slate-700">
                <th className="py-3.5 px-4 font-bold w-36">비교 항목</th>
                <th className="py-3.5 px-4 font-bold text-sky-900 bg-sky-50/70">무삭제 제로쉘</th>
                <th className="py-3.5 px-4 font-bold">0.1~0.2mm 최소삭제</th>
                <th className="py-3.5 px-4 font-bold">앞니 부분교정</th>
                <th className="py-3.5 px-4 font-bold text-slate-500">일반 과다 삭제</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {COMPARE_ROWS.map((row) => (
                <tr key={row.item}>
                  <td className="py-4 px-4 font-bold text-slate-900 align-top">{row.item}</td>
                  <td className="py-4 px-4 font-semibold text-slate-900 bg-sky-50/30 align-top">{row.zeroshell}</td>
                  <td className="py-4 px-4 text-slate-700 align-top">{row.minimal}</td>
                  <td className="py-4 px-4 text-slate-700 align-top">{row.ortho}</td>
                  <td className="py-4 px-4 text-slate-500 align-top">{row.general}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10 bg-amber-50 border border-amber-200 border-l-4 border-l-amber-600 rounded-xl p-6">
        <h2 className="text-lg font-bold text-amber-950 mb-2 wb-ka wbka">
          안 해도 되는 진료는 솔직히 말씀드립니다 — 부분교정 vs 라미네이트 판단
        </h2>
        <p className="text-sm text-slate-800 leading-[1.95] wb-ka wbka">
          치아 모양과 색상은 예쁜데 앞니 두 개 사이가 2mm 이상 크게 벌어졌거나 돌출입이 동반된 분에게는 무삭제·최소삭제 라미네이트를 권하지 않고 3~6개월 부분교정을 우선 안내합니다. 법랑질이 가장 단단한 자연치아 상태를 최대한 오래 지키는 것이 33년 진료의 원칙입니다.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-extrabold text-slate-900 mb-4 wb-ka wbka">자주 묻는 비교 질문 (FAQ)</h2>
        <div className="space-y-4">
          {FAQS.map((f) => (
            <article key={f.q} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 mb-2 wb-ka wbka">Q. {f.q}</h3>
              <p className="text-sm text-slate-700 leading-[1.9] wb-ka wbka">{f.a}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mb-10 bg-slate-50 border border-slate-200 rounded-2xl p-6">
        <h2 className="text-lg font-extrabold text-slate-900 mb-3 wb-ka wbka">근거 문헌 및 관련 상세 Q&amp;A</h2>
        <div className="flex flex-wrap gap-2.5 text-xs font-bold">
          <Link href="/qa/no-prep-vs-minimal-prep-laminate" className="px-3.5 py-2 rounded-lg bg-white border border-slate-200 text-sky-800 hover:border-sky-500">
            무삭제 vs 최소삭제 Q&amp;A &rarr;
          </Link>
          <Link href="/qa/front-gap-ortho-vs-laminate" className="px-3.5 py-2 rounded-lg bg-white border border-slate-200 text-sky-800 hover:border-sky-500">
            앞니 벌어짐 교정 vs 라미네이트 &rarr;
          </Link>
          <Link href="/qa/peg-lateral-small-front-teeth-zeroshell" className="px-3.5 py-2 rounded-lg bg-white border border-slate-200 text-sky-800 hover:border-sky-500">
            왜소치 레진 vs 제로쉘 &rarr;
          </Link>
          <a href="https://pubmed.ncbi.nlm.nih.gov/38604905/" target="_blank" rel="noopener noreferrer" className="px-3.5 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:underline">
            PubMed PMID 38604905 &#8599;
          </a>
          <a href="https://pubmed.ncbi.nlm.nih.gov/26757327/" target="_blank" rel="noopener noreferrer" className="px-3.5 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:underline">
            PubMed PMID 26757327 &#8599;
          </a>
        </div>
      </section>

      <div className="bg-slate-900 text-white rounded-2xl p-7 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold mb-1.5 wb-ka wbka">내 치아 법랑질 두께 · 교합 정밀 진단 예약</h2>
          <p className="text-sm text-slate-300 wb-ka wbka">강남역 11·12번 출구 도보 1분 · 대표상담 1577-7287 / 02-569-7528</p>
        </div>
        <div className="flex flex-wrap gap-2.5 text-xs font-bold">
          <Link href="/treatments/aesthetic/safety" className="px-4 py-2.5 rounded-lg bg-white text-slate-900">
            신경보호 안전 기준 확인 &rarr;
          </Link>
          <a href="https://booking.naver.com/booking/13/bizes/265482" target="_blank" rel="noopener noreferrer" className="px-4 py-2.5 rounded-lg bg-[#03c75a] text-white">
            네이버 빠른 예약 (1분 완료)
          </a>
        </div>
      </div>
    </div>
  );
}
