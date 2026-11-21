import type { Metadata } from 'next';
import Link from 'next/link';
import ClinicalSummarySection from '@/components/ClinicalSummarySection';

export const metadata: Metadata = {
  title: '강남역 치아교정 재교정 · 옥니·재발 복원 · 주치의 1:1 전담 | 화이트스타일치과의원',
  description:
    '1994년 개원 33년 전통 강남역 화이트스타일치과의원 성인 재교정 안내. 서울대졸·단국대 외래교수·교정학 박사 김준헌 병원장이 유지장치 탈락 재발·발치 후 옥니·어금니 교합 붕괴를 3D CT·Quick-Ceph 계측과 치주과 전문의 협진으로 주치의 변경 없이 1:1 재교정합니다.',
  alternates: { canonical: 'https://whitestyle.com/treatments/orthodontics/recorrection' },
  openGraph: {
    title: '강남역 치아교정 재교정 · 옥니 복원 · 1:1 주치의 | 화이트스타일치과의원',
    description:
      '과거 교정 후 재발·옥니·블랙트라이앵글이 고민될 때 3D CT 치근·골폭 분석과 치주과 전문의 협진으로 안전하게 진행하는 성인 재교정.',
    url: 'https://whitestyle.com/treatments/orthodontics/recorrection',
    type: 'website',
    locale: 'ko_KR',
  },
};

const REORTHO_PATTERNS = [
  {
    type: '유지장치 탈락·미착용에 따른 앞니 재발',
    detail: '어금니 교합은 양호하나 앞니 배열만 삐뚤어지거나 미세하게 틈이 벌어진 경우',
    plan: '인비절라인 투명교정 또는 3~6개월 앞니 부분 재교정으로 치아 삭제 없이 자연 배열 회복',
  },
  {
    type: '과도한 발치 교정 후 옥니(안으로 꺾임)',
    detail: '앞니가 지나치게 안쪽으로 쓰러져 인중·입매가 합죽해 보이고 웃을 때 어색한 경우',
    plan: 'Quick-Ceph 안모 분석 + 3D CT 치조골 두께 확인 후 정밀 토크 컨트롤로 앞니 각도 복원',
  },
  {
    type: '치주염·잇몸 퇴축 동반 성인·중년 재교정',
    detail: '치아가 뻐드러지거나 흔들리며 잇몸 뼈 폭이 얇아진 상태에서 재교정이 필요한 경우',
    plan: '박선혜 원장(보건복지부 인증 치주과 전문의) 잇몸 염증 안정화 후 약한 힘 맞춤 재교정 협진',
  },
];

export default function OrthodonticsRecorrectionPage() {
  const pageUrl = 'https://whitestyle.com/treatments/orthodontics/recorrection';
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '홈', item: 'https://whitestyle.com/' },
      { '@type': 'ListItem', position: 2, name: '치아교정', item: 'https://whitestyle.com/treatments/orthodontics' },
      { '@type': 'ListItem', position: 3, name: '성인 재교정', item: pageUrl },
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
        categoryBadge="교정학 박사 1:1 전담 · 치주과 전문의 협진 재교정"
        title="강남역 치아교정 재교정 · 옥니·재발 복원 33년 주치의 책임 진료"
        leadSentence="강남역 화이트스타일치과의원의 성인 치아교정 재교정은 1994년 개원(33년 전통) 이래 서울대졸 · 단국대 외래교수 · 교정학 박사 김준헌 병원장이 초기 3D CT · Quick-Ceph 정밀 진단부터 장치 부착, 매월 조절, 고정식·가철식 이중 유지관리까지 주치의 변경 없이 1:1로 직접 진료하며, 박선혜 원장(보건복지부 인증 치주과 전문의)과의 협진으로 성인 잇몸뼈 안전까지 함께 지킵니다."
        summaryBullets={[
          '이미 한 번 교정을 경험한 치아는 치근(뿌리) 길이와 잇몸뼈 두께가 줄어 있을 수 있어, 재교정 전 반드시 3D CT로 치조골 한계를 먼저 정밀 계측합니다.',
          '유지장치 탈락 재발·돌출 재발·발치 후 옥니·어금니 교합 붕괴까지 원인에 맞춰 인비절라인·설측교정·클리피씨·3~6개월 부분 재교정 중 가장 안전한 방식을 선택합니다.',
          '정밀 진단비·장치비·월 진료비·유지장치 포함 총액 기준을 사전에 서면 안내해 치료 중 추가 비용 걱정을 줄였습니다.',
        ]}
        comparisonTitle="성인 치아교정 재교정 정밀 안전 기준 비교"
        comparisonRows={[
          {
            item: '주치의 연속성 (33년 한 자리)',
            whitestyle: '서울대졸·교정학 박사 김준헌 병원장이 진단부터 재교정 완료·유지까지 주치의 변경 없이 1:1 전담',
            general: '페이닥터 교체 시 기존 치료 계획 연속성 저하 우려',
          },
          {
            item: '치근 · 잇몸뼈 안전 협진',
            whitestyle: '3D CT 치근/골폭 분석 + 치주과 전문의 박선혜 원장 선행 잇몸 관리 후 약한 힘 교정력 설계',
            general: '2D 방사선 위주 진단 시 치조골 얇은 부위 치근 노출 위험',
          },
          {
            item: '비용 투명성 · 이중 유지관리',
            whitestyle: '진단비·월비·고정식+가철식 이중 유지장치 포함 기준 사전 서면 안내 및 3·6·12개월 리콜',
            general: '월비·유지장치 별도 청구로 총비용 변동 가능',
          },
        ]}
        faqs={[
          {
            question: '예전에 다른 치과에서 발치 교정을 했는데 입이 너무 들어가 보이거나(옥니) 앞니가 다시 틀어졌어도 재교정이 되나요?',
            answer: '네, 가능합니다. 다만 과거 교정으로 치근이 짧아졌거나 잇몸뼈가 얇아진 경우가 많아 3D CT와 Quick-Ceph로 이동 허용 범위를 먼저 확인해야 합니다. 앞니 배열만 틀어진 경우 3~6개월 부분 재교정이나 인비절라인으로 치아를 깎지 않고 바로잡을 수 있으며, 옥니는 앞니 치축 각도(토크)를 정밀 조절해 자연스러운 미소선을 회복합니다.',
          },
          {
            question: '치주염이나 잇몸 내려앉음이 있는데 성인 재교정을 받아도 치아가 흔들리지 않을까요?',
            answer: '잇몸 염증이 남아 있는 상태에서 교정력을 가하면 치조골 흡수가 빨라질 수 있습니다. 본원은 보건복지부 인증 치주과 전문의 박선혜 원장이 먼저 스케일링과 잇몸 치료로 치주 환경을 안정시킨 뒤, 교정학 박사 김준헌 병원장이 약한 생리적 힘으로 천천히 이동시키는 협진 프로토콜을 적용해 안전성을 높입니다.',
          },
        ]}
        pageUrl={pageUrl}
      />

      <section className="max-w-5xl mx-auto px-5 pb-16">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 mb-5 wb-ka wbka">
            유형별 성인 재교정 맞춤 전략
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse text-left wb-ka wbka">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="py-3 px-4 font-bold">재교정 유형</th>
                  <th className="py-3 px-4 font-bold">주요 증상</th>
                  <th className="py-3 px-4 font-bold">화이트스타일치과 해결 방향</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {REORTHO_PATTERNS.map((row) => (
                  <tr key={row.type}>
                    <td className="py-3.5 px-4 font-bold text-slate-900 bg-slate-50 align-top">{row.type}</td>
                    <td className="py-3.5 px-4 text-slate-700 align-top">{row.detail}</td>
                    <td className="py-3.5 px-4 text-slate-800 font-medium align-top">{row.plan}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 flex flex-wrap gap-3 text-sm font-bold">
            <Link href="/treatments/orthodontics/types" className="px-4 py-2 rounded-lg bg-sky-50 text-sky-900 border border-sky-200 hover:bg-sky-100">
              인비절라인·설측·장치별 안내 →
            </Link>
            <Link href="/treatments/aesthetic/retreatment" className="px-4 py-2 rounded-lg bg-sky-50 text-sky-900 border border-sky-200 hover:bg-sky-100">
              최소삭제 라미네이트 재시술 →
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
