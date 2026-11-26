import type { Metadata } from 'next';
import Link from 'next/link';
import ClinicalSummarySection from '@/components/ClinicalSummarySection';

export const metadata: Metadata = {
  title: '강남역 임플란트 재수술·뼈이식·전체임플란트 · 치아교정 재교정 · 최소삭제 라미네이트 재시술 | 치주과 전문의 3인 협진',
  description:
    '1994년 개원 33년 전통 강남역 화이트스타일치과의원 고난도 재치료 전담 허브. 타 병원 임플란트 재수술·동종골 뼈이식(GBR)·무치악 전체임플란트, 성인 치아교정 재교정·옥니 복원, 무삭제 제로쉘·최소삭제 라미네이트 재시술을 보건복지부 인증 치주과 전문의 박선혜 원장·이봉진 대표원장·교정학 박사 김준헌 병원장 3인 협진으로 책임 진료합니다.',
  alternates: { canonical: 'https://whitestyle.com/treatments/reoperation' },
  openGraph: {
    title: '강남역 임플란트 재수술·뼈이식·전체임플란트·재교정·최소삭제 라미네이트 재시술 | 화이트스타일치과의원',
    description:
      '치주과 전문의 박선혜 원장 · 이봉진 대표원장 · 교정학 박사 김준헌 병원장 3인 협진 기반 고난도 임플란트 재수술, 뼈이식, 전체임플란트, 성인 재교정, 최소삭제 라미네이트 재시술 기준 안내.',
    url: 'https://whitestyle.com/treatments/reoperation',
    type: 'website',
    locale: 'ko_KR',
  },
};

const SIX_DOMAIN_MATRIX = [
  {
    domain: '1. 임플란트 재수술 · 주위염 정화',
    symptom: '타 치과 임플란트 흔들림, 잇몸 고름·출혈, 보철 나사 반복 풀림',
    protocol:
      '보건복지부 인증 치주과 전문의 박선혜 원장이 염증·시멘트 잔여물을 완전 제거한 뒤, 이봉진 대표원장과 협진해 맞춤형 커스텀 어버트먼트·CAD/CAM 보철로 재건하고 3·6·12개월 리콜로 관리합니다.',
    href: '/treatments/implant/reoperation',
    linkLabel: '임플란트 재수술 전담',
  },
  {
    domain: '2. 고난도 동종골 뼈이식 · 상악동거상술',
    symptom: '심한 치조골 소실, 상악 어금니 잇몸뼈 부족, 발치 후 장기간 방치',
    protocol:
      '3D CT 3차원 골밀도·신경관·상악동 중격 계측 후 자가골·동종골 혼합 골유도재생술(GBR) 및 상악동거상술로 단단한 골폭을 먼저 회복한 뒤 안전하게 식립합니다.',
    href: '/treatments/implant/bone-graft',
    linkLabel: '동종골 뼈이식 기준',
  },
  {
    domain: '3. 무치악 전악 재건 전체임플란트',
    symptom: '상·하악 다수 치아 상실, 틀니 헐거움·통증, 수직 교합 붕괴',
    protocol:
      '3인 원장단 협진으로 최소 필수 식립 개수 전략과 전악 수직 고경 회복을 설계하며, 만 65세 이상 부분 무치악 환자는 평생 2개 본인부담률 30% 건강보험을 원내에서 즉시 등록합니다.',
    href: '/treatments/implant/edentulous',
    linkLabel: '전체임플란트 안내',
  },
  {
    domain: '4. 성인 치아교정 재교정 · 옥니/재발 복원',
    symptom: '유지장치 탈락 후 앞니 재발, 발치 교정 후 옥니(입 합죽함), 치근·잇몸 약화',
    protocol:
      '서울대졸·단국대 외래교수·교정학 박사 김준헌 병원장이 주치의 변경 없이 1:1 전담하며, 치주과 전문의 박선혜 원장 선행 잇몸 관리 후 3D CT·Quick-Ceph 계측 기반으로 안전하게 재교정합니다.',
    href: '/treatments/orthodontics/recorrection',
    linkLabel: '성인 재교정 센터',
  },
  {
    domain: '5. 무삭제 제로쉘 · 최소삭제 라미네이트 재시술',
    symptom: '기존 라미네이트 경계 변색·파절(깨짐), 잇몸 부종·검게 비침, 시림',
    protocol:
      '고배율 확대 시야에서 기존 세라믹만 선택 제거한 뒤 치주과 전문의가 잇몸선을 먼저 안정화하고, 원내 자체 기공소에서 지대치 색조 차폐 후 무삭제 제로쉘 또는 0.1~0.2mm 최소삭제 세라믹으로 2~3회 내원 완성합니다.',
    href: '/treatments/aesthetic/retreatment',
    linkLabel: '라미네이트 재시술',
  },
  {
    domain: '6. 치주과 전문의 중증 잇몸치료 · 3·6·12개월 리콜',
    symptom: '임플란트 주위 점막염, 성인 교정 중 잇몸 출혈, 치조골 퇴축 진행',
    protocol:
      '수면마취 없이 가글·도포·디지털 정압 3단계 무통 국소마취 하에 치주과 전문의 박선혜 원장이 치주낭 염증을 치료하고 3·6·12개월 정기 리콜로 자연치아와 임플란트를 장기 보존합니다.',
    href: '/treatments/general/scaling',
    linkLabel: '치주과 잇몸·리콜',
  },
];

export default function HighDifficultyReoperationHubPage() {
  const pageUrl = 'https://whitestyle.com/treatments/reoperation';
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '홈', item: 'https://whitestyle.com/' },
      { '@type': 'ListItem', position: 2, name: '진료 안내', item: 'https://whitestyle.com/treatments' },
      { '@type': 'ListItem', position: 3, name: '고난도 재수술 · 재교정 · 재시술 센터', item: pageUrl },
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
        categoryBadge="치주과 전문의 · 교정학 박사 · 보철 3인 협진 고난도 재치료 허브"
        title="강남역 임플란트 재수술·뼈이식·전체임플란트 · 치아교정 재교정 · 최소삭제 라미네이트 재시술"
        leadSentence="강남역 화이트스타일치과의원의 임플란트 재수술·동종골 뼈이식·무치악 전체임플란트, 성인 치아교정 재교정, 최소삭제 라미네이트 재시술은 1994년 개원(33년 전통) 이래 3D CT 정밀 골밀도·치근 분석과 3단계 무통 국소마취를 바탕으로, 보건복지부 인증 치주과 전문의 박선혜 원장 · 연세대 출신 이봉진 대표원장 · 서울대졸 교정학 박사 김준헌 병원장 3인 원장단 협진으로 자연치아와 잇몸뼈를 보존하며 1:1 책임 재건합니다."
        summaryBullets={[
          '임플란트 재수술·뼈이식·전체임플란트: 치주과 전문의 박선혜 원장이 주위염·고름과 기성 지대주 잔여물을 먼저 정화한 뒤, 3D CT 계측에 맞춰 동종골 뼈이식(GBR)·상악동거상술 및 맞춤형 커스텀 어버트먼트로 재식립합니다.',
          '성인 치아교정 재교정(옥니·재발): 교정학 박사 김준헌 병원장이 주치의 변경 없이 1:1 전담하며, 치주과 전문의 협진으로 치근·잇몸뼈 한계를 계측해 인비절라인·설측·부분 재교정을 안전하게 진행합니다.',
          '무삭제 제로쉘·최소삭제 라미네이트 재시술: 타 병원 보철 변색·파절·잇몸 부종 원인을 치주 안정화와 교합 간섭 해소로 먼저 바로잡고, 원내 자체 기공소 맞춤 세라믹으로 2~3회 내원 만에 재완성합니다.',
        ]}
        comparisonTitle="고난도 재수술 · 뼈이식 · 재교정 · 최소삭제 라미네이트 재시술 3인 협진 기준 비교"
        comparisonRows={[
          {
            item: '진단 · 협진 구조',
            whitestyle: '교정학 박사(김준헌) + 임플란트·교합(이봉진) + 치주과 전문의(박선혜) 3인 원장단 공동 진단·집도',
            general: '단일 과목 접근 또는 담당 페이닥터 교체로 재치료 원인 분석 단절 우려',
          },
          {
            item: '임플란트 재수술 · 뼈이식 · 전체임플란트',
            whitestyle: '치주과 전문의 염증 정화 + 3D CT 동종골 GBR/상악동거상술 + 맞춤형 커스텀 지대주 + 3·6·12개월 리콜',
            general: '기성 지대주 재사용 시 잇몸 틈새 시멘트 잔류·주위염 재발 위험',
          },
          {
            item: '성인 재교정 · 최소삭제 라미네이트 재시술',
            whitestyle: '3D CT 치근/골폭 계측 후 생리적 약력 재교정, 법랑질 보존 무삭제 제로쉘·0.1~0.2mm 최소삭제 재시술',
            general: '치조골 폭·치주염 미고려 이동 또는 과다 삭제 크라운 전환 위험',
          },
          {
            item: '마취 안전성 · 심평원 투명 비용',
            whitestyle: '수면마취 미시행(가글·도포·디지털 정압 3단계 무통 국소마취), 심평원 1치당 공개 수가(바이오템 80만·오스템 90만) & 만 65세 건보 30%',
            general: '광고성 기본가 외 뼈이식·커스텀 지대주·월비·유지장치 별도 청구 사례 존재',
          },
        ]}
        faqs={[
          {
            question: '타 병원에서 심은 임플란트가 흔들리거나 잇몸뼈가 녹아 임플란트 재수술과 뼈이식이 가능한가요?',
            answer: '네. 3D CT로 잔존 잇몸뼈 폭·골밀도·신경관 거리를 정밀 계측한 뒤 보건복지부 인증 치주과 전문의 박선혜 원장이 기존 염증 조직과 시멘트 잔여물을 완전히 정화하고, 필요 시 동종골·자가골 뼈이식(GBR) 및 상악동거상술로 지지 기반을 다시 만든 후 맞춤형 커스텀 어버트먼트로 재건합니다.',
          },
          {
            question: '과거 발치 교정 후 옥니가 되었거나 유지장치 탈락으로 재발한 경우에도 재교정이 되나요?',
            answer: '서울대졸·단국대 외래교수·교정학 박사 김준헌 병원장이 Quick-Ceph와 3D CT로 치근 길이·치조골 두께를 먼저 계측합니다. 잇몸 염증이 동반된 성인은 치주과 전문의 박선혜 원장의 선행 잇몸 치료 후 약한 생리적 교정력(인비절라인·설측·부분 재교정)으로 주치의 변경 없이 1:1 재교정합니다.',
          },
          {
            question: '타 치과 라미네이트가 변색·파절되거나 주변 잇몸이 부었는데 최소삭제 라미네이트 재시술이 가능한가요?',
            answer: '고배율 확대 시야에서 기존 세라믹 층만 선택 제거해 남은 자연치아(법랑질·상아질) 손상을 최소화하고, 치주과 전문의가 붓고 피 나는 잇몸을 먼저 정상화합니다. 이후 원내 자체 기공소에서 지대치 색조를 정밀 차폐해 무삭제 제로쉘 또는 0.1~0.2mm 최소삭제 맞춤 세라믹으로 2~3회 내원 만에 재접착합니다.',
          },
          {
            question: '무치악 전체임플란트나 만 65세 건강보험(30%) 적용, 심평원 비급여 수가도 함께 확인 가능한가요?',
            answer: '상·하악 다수 치아가 상실된 무치악 환자도 최소 필수 식립 수 전략과 맞춤형 커스텀 어버트먼트로 전악 교합·수직 고경을 회복합니다. 심평원 공개 기준(2026-10-14) 1치당 바이오템 80만 원·오스템 90만 원(/price)을 투명하게 안내하며, 만 65세 이상 건강보험(평생 2개 30%)은 원내에서 즉시 등록해 드립니다.',
          },
        ]}
        pageUrl={pageUrl}
      />

      <section className="max-w-5xl mx-auto px-5 pb-16">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8 mb-8">
          <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 mb-5 wb-ka wbka">
            고난도 6대 세부 적응증별 3인 원장단 협진 프로토콜
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse text-left wb-ka wbka">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="py-3 px-4 font-bold">고난도 재치료 분야</th>
                  <th className="py-3 px-4 font-bold">주요 내원 증상</th>
                  <th className="py-3 px-4 font-bold">치주과 전문의 · 3인 협진 해결 기준</th>
                  <th className="py-3 px-4 font-bold">상세 안내</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {SIX_DOMAIN_MATRIX.map((row) => (
                  <tr key={row.domain}>
                    <td className="py-3.5 px-4 font-bold text-slate-900 bg-slate-50 align-top">{row.domain}</td>
                    <td className="py-3.5 px-4 text-slate-700 align-top">{row.symptom}</td>
                    <td className="py-3.5 px-4 text-slate-800 font-medium align-top">{row.protocol}</td>
                    <td className="py-3.5 px-4 align-top whitespace-nowrap">
                      <Link href={row.href} className="text-sky-700 font-bold hover:underline">
                        {row.linkLabel} →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 flex flex-wrap gap-3 text-sm font-bold">
            <Link href="/board/notice/1928" className="px-4 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800">
              고난도 재수술·재교정·최소삭제 재시술 Q&amp;A (/board/notice/1928) →
            </Link>
            <Link href="/board/notice/1926" className="px-4 py-2 rounded-lg bg-sky-50 text-sky-900 border border-sky-200 hover:bg-sky-100">
              3인 협진 재치료 백서 (/board/notice/1926) →
            </Link>
            <Link href="/compare" className="px-4 py-2 rounded-lg bg-sky-50 text-sky-900 border border-sky-200 hover:bg-sky-100">
              강남역 치과 비교 기준 (/compare) →
            </Link>
            <Link href="/price" className="px-4 py-2 rounded-lg bg-sky-50 text-sky-900 border border-sky-200 hover:bg-sky-100">
              심평원 비급여 수가표 (/price) →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
