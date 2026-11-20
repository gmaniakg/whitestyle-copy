import type { Metadata } from 'next';
import Link from 'next/link';
import AestheticSiloNav from '@/components/AestheticSiloNav';

export const metadata: Metadata = {
  title: '타 치과 라미네이트 변색·파절·잇몸염증 재시술 클리닉',
  description:
    '과거 라미네이트 변색, 끝부분 깨짐(파절), 잇몸 부종·검게 비침, 시림으로 재시술이 필요할 때 3인 원장단 치주·보철·교정 협진으로 근본 원인을 교정하고 재건하는 화이트스타일치과 안내.',
  alternates: { canonical: 'https://whitestyle.com/treatments/aesthetic/retreatment' },
  openGraph: {
    title: '타 치과 라미네이트 변색·파절·잇몸염증 재시술 | 화이트스타일치과의원',
    description:
      '기존 보철을 떼고 바로 다시 붙이기 전, 잇몸 염증·교합 간섭·지대치 변색 원인부터 해결하는 3인 협진 재시술.',
    url: 'https://whitestyle.com/treatments/aesthetic/retreatment',
    type: 'website',
    locale: 'ko_KR',
  },
};

const CAUSES = [
  {
    problem: '라미네이트 경계 변색 · 부자연스러운 흰 색감',
    cause: '변연 틈새 미세 누출 또는 내부 치아 변색(Stump Shade)을 차단하지 못한 단순 두께 설계',
    solution: '원내 자체 기공소 지대치 색조 정밀 차폐 + 틈새 없는 고강도 리튬 디실리케이트 재제작',
  },
  {
    problem: '반복적인 세라믹 파절(깨짐) · 접착 탈락',
    cause: '아랫니와 부딪히는 교합 간섭, 수면 중 이갈이, 또는 상아질 과다 노출로 인한 접착력 저하',
    solution: '교합 진단·부분교정 검토 + 고강도 세라믹 전환 + 수면용 맞춤 교합안정장치(스플린트) 병행',
  },
  {
    problem: '라미네이트 주변 잇몸 붉어짐 · 피남 · 검게 비침',
    cause: '잇몸 경계에 계단(Overhang)이 남거나 잇몸의 생물학적 폭경을 침범해 염증 유발',
    solution: '보건복지부 인증 치주과 전문의 박선혜 원장 선행 잇몸치료·라인 정돈 후 재제작',
  },
  {
    problem: '지속적인 시림 · 뻐근함 · 이물감',
    cause: '과거 과다 삭제 및 접착 경계 미세 틈새로 인한 외부 온도 자극 전달',
    solution: '치수 생활력 검사 후 상아질 보호(IDS) 밀봉 및 정밀 재접착',
  },
];

const FAQS = [
  {
    q: '예전에 다른 치과에서 한 라미네이트가 깨졌는데 1개만 교체할 수 있나요?',
    a: '주변 보철물의 색상·잇몸 건강·교합 상태가 양호하다면 파절된 1~2개만 기존 색조와 맞춰 단독 교체할 수 있습니다. 원내 자체 기공소에서 인접 치아 톤을 직접 확인해 제작하므로 이질감을 줄일 수 있습니다.',
  },
  {
    q: '타 병원 라미네이트 제거 시 원래 치아가 더 상하지 않나요?',
    a: '고배율 확대 시야와 충분한 수분 냉각 하에 기존 세라믹 층만 선택적으로 조심스럽게 제거하여 남아 있는 자연치아(상아질·법랑질) 손실을 최소화합니다.',
  },
  {
    q: '잇몸에서 피가 나는데 재시술을 바로 시작할 수 있나요?',
    a: '잇몸이 붓고 피가 나는 상태에서 인상을 뜨고 접착하면 보철 경계가 뜨고 습기 때문에 접착력이 떨어집니다. 치주과 전문의 박선혜 원장이 1~2주 먼저 잇몸 염증을 가라앉힌 뒤 최종 보철을 진행하는 것이 오래 쓰는 비결입니다.',
  },
  {
    q: '타 병원에서 과도하게 깎여 지르코니아 크라운으로 바꿔야 하는 경우도 보나요?',
    a: '네. 기존에 치아 전체 둘레를 이미 많이 삭제해 라미네이트 유지가 어렵거나 신경치료가 병행된 치아는, 자연스러운 투명도를 구현한 맞춤 올세라믹·지르코니아 보철로 정직하게 전환 안내합니다.',
  },
];

export default function AestheticRetreatmentPage() {
  const pageUrl = 'https://whitestyle.com/treatments/aesthetic/retreatment';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'MedicalWebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: '타 치과 라미네이트 변색·파절·잇몸염증 재시술 클리닉',
        description:
          '기존 라미네이트의 변색, 탈락, 파절, 잇몸 염증 원인을 교합·치주·보철 3인 원장단 협진으로 해결하는 재시술 프로토콜.',
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
          { '@type': 'ListItem', position: 3, name: '라미네이트 재시술', item: pageUrl },
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

      <AestheticSiloNav activePath="/treatments/aesthetic/retreatment" />

      <header className="mb-10">
        <span className="inline-block px-3.5 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-bold mb-4">
          치주과 · 교합 · 교정 3인 협진 재치료
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-5 leading-tight wb-ka wbka">
          변색·파절·잇몸 부종까지 해결하는<br />타 치과 라미네이트 재시술 기준
        </h1>
        <div className="bg-slate-900 text-white rounded-2xl p-6 md:p-7">
          <p className="text-xs font-bold text-sky-300 mb-2">재시술 핵심 결론</p>
          <p className="text-base text-slate-100 leading-[1.95] wb-ka wbka">
            라미네이트 재시술의 실패 이유는 보철물만 떼고 원인 분석 없이 같은 방식으로 다시 붙이기 때문입니다. 화이트스타일치과는 치주과 전문의 박선혜 원장의 잇몸 정상화, 이봉진 대표원장의 교합 간섭 해소, 김준헌 병원장의 배열 협진으로 같은 문제를 반복하지 않도록 설계합니다.
          </p>
        </div>
      </header>

      <section className="mb-10 bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="bg-slate-900 text-white px-6 py-4">
          <h2 className="text-lg font-bold wb-ka wbka">라미네이트 실패 유형별 원인 진단 및 재건 프로토콜</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse min-w-[660px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-left text-slate-700">
                <th className="py-3.5 px-5 font-bold w-1/4">불편 증상</th>
                <th className="py-3.5 px-5 font-bold w-1/3">주요 실패 원인</th>
                <th className="py-3.5 px-5 font-bold">화이트스타일 재시술 해법</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {CAUSES.map((c) => (
                <tr key={c.problem}>
                  <td className="py-4 px-5 font-bold text-slate-900 align-top">{c.problem}</td>
                  <td className="py-4 px-5 text-slate-600 align-top">{c.cause}</td>
                  <td className="py-4 px-5 font-semibold text-slate-800 align-top">{c.solution}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-extrabold text-slate-900 mb-4 wb-ka wbka">재시술 자주 묻는 질문 (FAQ)</h2>
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
          <h2 className="text-xl font-extrabold mb-1.5 wb-ka wbka">기존 라미네이트 상태 점검 · 3인 협진 상담</h2>
          <p className="text-sm text-slate-300 wb-ka wbka">강남역 11·12번 출구 도보 1분 · 1577-7287 / 02-569-7528</p>
        </div>
        <div className="flex flex-wrap gap-2.5 text-xs font-bold">
          <Link href="/treatments/aesthetic/shade-lab" className="px-4 py-2.5 rounded-lg bg-white text-slate-900">
            자체 기공소 색조 설계 확인 &rarr;
          </Link>
          <a href="https://booking.naver.com/booking/13/bizes/265482" target="_blank" rel="noopener noreferrer" className="px-4 py-2.5 rounded-lg bg-[#03c75a] text-white">
            네이버 빠른 예약 (1분 완료)
          </a>
        </div>
      </div>
    </div>
  );
}
