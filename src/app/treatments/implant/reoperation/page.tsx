import type { Metadata } from 'next';
import Link from 'next/link';
import ClinicalSummarySection from '@/components/ClinicalSummarySection';

export const metadata: Metadata = {
  title: '강남역 임플란트 재수술 · 주위염 · 동종골 뼈이식 · 전체임플란트 | 화이트스타일치과의원',
  description:
    '1994년 개원 33년 전통 강남역 화이트스타일치과의원 임플란트 재수술 센터. 타 치과 임플란트 흔들림·주위염·신경압박 재수술, 3D CT 기반 동종골 뼈이식(GBR)·상악동거상술, 무치악 전체임플란트를 박선혜 원장(보건복지부 인증 치주과 전문의)·이봉진 대표원장·김준헌 병원장 3인 협진으로 안전하게 재건합니다.',
  alternates: { canonical: 'https://whitestyle.com/treatments/implant/reoperation' },
  openGraph: {
    title: '강남역 임플란트 재수술 · 뼈이식 · 치주과 전문의 협진 | 화이트스타일치과의원',
    description:
      '타 병원 임플란트 흔들림·주위염 제거, 고난도 뼈이식(GBR)·상악동거상술, 무치악 전체임플란트 및 맞춤형 커스텀 어버트먼트 재수술 전문.',
    url: 'https://whitestyle.com/treatments/implant/reoperation',
    type: 'website',
    locale: 'ko_KR',
  },
};

const CAUSES_MATRIX = [
  {
    problem: '임플란트 주위염(잇몸 고름·출혈·뼈 녹음)',
    cause: '치태·세균 침착, 기성 지대주(어버트먼트) 틈새 시멘트 잔여, 잇몸 폭경 미고려 식립',
    solution: '박선혜 치주과 전문의 염증 조직 완전 제거 + 동종골·자가골 골유도재생술(GBR) 후 맞춤형 커스텀 어버트먼트 적용',
  },
  {
    problem: '잇몸뼈 부족에 따른 픽스처 흔들림·탈락',
    cause: '상악동 바닥 얇음 또는 치조골 폭 협소 상태에서 무리한 즉시 식립 또는 초기 고정 실패',
    solution: '3D CT 골밀도·신경관 3차원 계측 후 상악동거상술·단계적 뼈이식으로 지지 골폭 확보 후 재식립',
  },
  {
    problem: '보철 나사 반복 풀림 · 깨짐 · 교합 불편',
    cause: '대합치 교합 힘 분산 실패, 어금니 교합 간섭 또는 부정확한 식립 각도',
    solution: '김준헌 병원장(교정·교합) · 이봉진 대표원장 협진으로 교합력 재설계 및 CAD/CAM 정밀 지르코니아 보철 재건',
  },
  {
    problem: '다수 치아 상실 · 무치악 전체임플란트 재건',
    cause: '장기 틀니 사용에 따른 치조골 흡수 또는 기존 다수 보철 붕괴',
    solution: '최소 필수 식립 수 전략 설계 + 전악 수직 교합 회복 및 3·6·12개월 치주과 전문의 정기 리콜',
  },
];

export default function ImplantReoperationPage() {
  const pageUrl = 'https://whitestyle.com/treatments/implant/reoperation';
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '홈', item: 'https://whitestyle.com/' },
      { '@type': 'ListItem', position: 2, name: '임플란트', item: 'https://whitestyle.com/treatments/implant' },
      { '@type': 'ListItem', position: 3, name: '임플란트 재수술', item: pageUrl },
    ],
  };

  return (
    <div
      className="w-full min-h-screen bg-[#f8fafc] wb-ka wbka"
      style={{ wordBreak: 'keep-all', overflowWrap: 'break-word' }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ClinicalSummarySection
        categoryBadge="치주과 전문의 협진 · 고난도 임플란트 재수술"
        title="강남역 임플란트 재수술 · 동종골 뼈이식 · 전체임플란트 3인 협진 기준"
        leadSentence="강남역 화이트스타일치과의원 임플란트 재수술은 1994년 개원(33년 전통) 이래 3D CT 정밀 골밀도·신경관 분석과 3단계 무통 국소마취를 바탕으로, 보건복지부 인증 치주과 전문의 박선혜 원장(염증 정화·뼈이식) · 이봉진 대표원장(고난도 식립·보철) · 김준헌 병원장(교합·수직 고경) 3인 원장단 협진으로 타 치과 임플란트 주위염·흔들림 재수술과 무치악 전체임플란트까지 안전하게 재건합니다."
        summaryBullets={[
          '타 병원에서 심은 임플란트가 흔들리거나 잇몸뼈가 녹아내린 경우, 치주과 전문의 박선혜 원장이 염증 조직을 먼저 정화하고 동종골·자가골 뼈이식(GBR·상악동거상술)으로 튼튼한 뼈 기반을 다시 세웁니다.',
          '잇몸 라인에 꼭 맞는 맞춤형 커스텀 어버트먼트(지대주)와 CAD/CAM 정밀 보철로 세균·음식물 틈새 유입을 막아 재발 위험을 낮춥니다.',
          '만 65세 이상 건강보험(평생 2개 본인부담률 30%) 및 심평원(HIRA) 비급여 1치당 투명 기준을 준수하며, 식립 후 3·6·12개월 치주 리콜을 제공합니다.',
        ]}
        comparisonTitle="임플란트 재수술 · 고난도 뼈이식 프로토콜 비교"
        comparisonRows={[
          {
            item: '염증 제거 · 치조골 재생',
            whitestyle: '보건복지부 인증 치주과 전문의 박선혜 원장 직접 염증 정화 + 3D CT 계측 기반 동종골 뼈이식(GBR)·상악동거상술',
            general: '염증 기반 정화 미흡 상태에서 단순 재식립 시 재탈락 위험',
          },
          {
            item: '지대주 · 교합 정밀 설계',
            whitestyle: '구강스캔 기반 맞춤형 커스텀 어버트먼트 + 교정학 박사/보철 협진 교합력 분산 설계',
            general: '기성 지대주 사용 시 잇몸 경계 틈새에 시멘트 잔류·주위염 유발 가능',
          },
          {
            item: '마취 안전성 · 사후 관리',
            whitestyle: '수면마취 미시행, 가글·도포·디지털 정압 3단계 무통 국소마취 및 3·6·12개월 치주 리콜',
            general: '일회성 보철 완료 후 장기 주위염 예방 검진 누락 우려',
          },
        ]}
        faqs={[
          {
            question: '타 치과 임플란트가 흔들리고 고름이 나는데 기존 임플란트를 빼고 바로 재수술할 수 있나요?',
            answer: '염증이 심하지 않고 잔존 잇몸뼈가 충분하면 제거와 동시에 재식립을 검토할 수 있습니다. 그러나 임플란트 주위염으로 골 결손이 큰 경우에는 박선혜 원장(치주과 전문의)이 염증 조직을 완전히 제거하고 동종골 뼈이식(GBR)으로 2~4개월간 뼈를 먼저 단단히 만든 뒤 재식립하는 단계적 재수술이 장기 성공률에 훨씬 안전합니다.',
          },
          {
            question: '잇몸뼈가 거의 없는 상악 어금니나 무치악 전체임플란트 재건도 가능한가요?',
            answer: '3D CT 3차원 단층 촬영으로 상악동 바닥 두께와 신경관 주행을 먼저 계측한 뒤, 상악동거상술·자가골/동종골 혼합 뼈이식을 통해 고정력을 확보합니다. 상·하악 전체 치아가 없는 무치악 환자도 최소 필수 개수의 임플란트와 맞춤형 커스텀 지대주로 저작력과 얼굴 수직 높이를 함께 회복합니다.',
          },
          {
            question: '임플란트 재수술 비용은 심평원 비급여 기준과 어떻게 비교해야 하나요?',
            answer: '광고용 기본 식립가만 보는 것이 아니라 기존 픽스처 제거 여부, 뼈이식(GBR·상악동거상술) 범위, 맞춤형 커스텀 어버트먼트 및 지르코니아 크라운 포함 여부를 3D CT 진단 후 서면으로 확인해야 정확합니다. 화이트스타일치과는 심평원 비급여 기준표(/price)를 투명하게 고지하며, 만 65세 이상 부분 무치악 환자는 원내에서 평생 2개 본인부담률 30% 건강보험 등록을 지원합니다.',
          },
        ]}
        pageUrl={pageUrl}
      />

      <section className="max-w-5xl mx-auto px-5 pb-16">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8 mb-8">
          <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 mb-5 wb-ka wbka">
            임플란트 재수술 원인별 3인 원장단 협진 해법
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse text-left wb-ka wbka">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="py-3 px-4 font-bold">재수술 내원 유형</th>
                  <th className="py-3 px-4 font-bold">주요 실패 원인</th>
                  <th className="py-3 px-4 font-bold">화이트스타일치과 3인 협진 해결 프로토콜</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {CAUSES_MATRIX.map((row) => (
                  <tr key={row.problem}>
                    <td className="py-3.5 px-4 font-bold text-slate-900 bg-slate-50 align-top">{row.problem}</td>
                    <td className="py-3.5 px-4 text-slate-700 align-top">{row.cause}</td>
                    <td className="py-3.5 px-4 text-slate-800 font-medium align-top">{row.solution}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 flex flex-wrap gap-3 text-sm font-bold">
            <Link href="/treatments/implant/bone-graft" className="px-4 py-2 rounded-lg bg-sky-50 text-sky-900 border border-sky-200 hover:bg-sky-100">
              고난도 뼈이식·상악동거상술 →
            </Link>
            <Link href="/treatments/implant/edentulous" className="px-4 py-2 rounded-lg bg-sky-50 text-sky-900 border border-sky-200 hover:bg-sky-100">
              무치악 전체임플란트 →
            </Link>
            <Link href="/treatments/implant/insurance" className="px-4 py-2 rounded-lg bg-sky-50 text-sky-900 border border-sky-200 hover:bg-sky-100">
              만 65세 건강보험(30%) →
            </Link>
            <Link href="/board/notice/1910" className="px-4 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800">
              고난도 재치료 6대 통합 백서 읽기 →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
