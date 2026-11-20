import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '비급여 진료비·심평원 기준 안내 · 투명 수가표',
  description:
    '의료법 제45조 및 건강보험심사평가원(심평원) 비급여 기준에 따른 강남역 화이트스타일치과의원 임플란트(1치당) 고지 수가, 만 65세 건강보험(30%), 치아교정 총액제·최소삭제 라미네이트 포함 항목 투명 안내.',
  alternates: { canonical: 'https://whitestyle.com/price' },
  openGraph: {
    title: '비급여 진료비·심평원 기준 안내 · 투명 수가표 | 화이트스타일치과의원',
    description:
      '1994년 개원 33년 전통. 심평원 비급여 고지 수가 및 치아교정 총액제·임플란트·심미보철 포함/별도 항목 투명 안내.',
    url: 'https://whitestyle.com/price',
    type: 'website',
    locale: 'ko_KR',
  },
};

const HIRA_DISCLOSED_FEES = [
  {
    item: '치과임플란트 (1치당) · PFM',
    spec: '오스템 · 바이오템 정품 픽스처 기반 PFM 보철',
    fee: '1,000,000원 ~ 1,200,000원',
    note: '3D CT 진단 후 뼈이식·상악동거상술 필요 시 별도 서면 안내',
  },
  {
    item: '치과임플란트 (1치당) · 지르코니아',
    spec: '오스템 · 바이오템 정품 픽스처 기반 지르코니아 보철',
    fee: '1,200,000원',
    note: '구강 상태·잇몸뼈 두께에 따른 맞춤형 지대주 적용 상담',
  },
  {
    item: '치과임플란트 (1치당) · 골드(Gold)',
    spec: '오스템 · 바이오템 정품 픽스처 기반 골드 보철',
    fee: '1,200,000원 ~ 1,450,000원',
    note: '어금니 교합력·금 함량 및 보철 설계에 따라 결정',
  },
  {
    item: '만 65세 이상 건강보험 임플란트',
    spec: '건강보험 적용 대상자 평생 2개 (상·하악 구분 없음)',
    fee: '본인부담률 30%',
    note: '공단 방문 없이 원내 전산 등록 · 치주과 전문의 협진',
  },
  {
    item: '제증명수수료 (진료기록사본 등)',
    spec: '진단서·상해진단서·확인서·진료기록사본',
    fee: '사본 1~5매 1,000원 / 6매 이상 매당 100원',
    note: '보건복지부 의료기관 제증명수수료 상한 기준 준수',
  },
];

const NON_COVERED_CRITERIA = [
  {
    category: '임플란트 (1치당 구성 기준)',
    included: '정품 픽스처 식립, 상부 보철물(PFM·지르코니아·골드), 3단계 무통 국소마취, 3·6·12개월 치주 리콜 안내',
    optionalExtra: '심한 골 소실 시 동종골/자가골 뼈이식(GBR), 상악동거상술, 맞춤형 커스텀 어버트먼트',
    doctor: '이봉진 대표원장 · 박선혜 원장(치주과 전문의) · 김준헌 병원장 협진',
    href: '/treatments/implant',
  },
  {
    category: '치아교정 (총액제 기준)',
    included: '3D CT·Quick-Ceph 정밀 진단비, 선택 교정 장치비(인비절라인·설측·클리피씨·세라믹), 매월 조절 치료비, 유지장치 포함 여부 사전 서면 안내',
    optionalExtra: '발치 교정 시 발치비, 스크류(미니임플란트), 추가 충치·잇몸 치료비 여부 사전 구분 안내',
    doctor: '김준헌 병원장 (서울대졸·단국대 외래교수·교정학 박사)',
    href: '/treatments/orthodontics',
  },
  {
    category: '최소삭제 심미보철 · 라미네이트',
    included: '법랑질 두께·교합 분석, 원내 자체 기공소 연계 무삭제(제로쉘) 또는 0.1~0.2mm 최소삭제 맞춤 세라믹 제작 및 교합 조정',
    optionalExtra: '치축 교정 목적 단기 부분교정, 잇몸 성형, 타 치과 기존 보철 제거 및 재치료 동반 시 별도 안내',
    doctor: '박선혜 원장(보건복지부 인증 치주과 전문의) × 3인 원장단 협진',
    href: '/treatments/aesthetic',
  },
  {
    category: '원데이 전문가 미백 · 스케일링',
    included: '파노라마 구강검진, 잇몸 보호제 도포 및 식약처 허가 정품 미백제 연속 광조사 원스톱 진행',
    optionalExtra: '연 1회 건강보험 스케일링 대상 여부에 따른 급여·비급여 구분 안내',
    doctor: '3인 원장단 책임 진료 · 3단계 통증 완화 시스템',
    href: '/treatments/aesthetic/easy-white',
  },
];

const PRICE_FAQS = [
  {
    q: '강남역 화이트스타일치과의원 임플란트 1치당 비용은 심평원 비급여 자료와 동일한가요?',
    a: '네. 건강보험심사평가원(심평원) 비급여 진료비용 공개 기준에 맞춰 오스템·바이오템 정품 픽스처 기준 PFM 100만~120만원, 지르코니아 120만원, 골드 120만~145만원으로 고지하고 있습니다. 3D CT 진단 후 뼈이식(GBR·상악동거상술)이나 맞춤형 지대주 필요 여부는 시술 전 서면 견적으로 투명하게 설명해 드립니다.',
  },
  {
    q: '강남역 화이트스타일치과의원 치아교정 비용에는 월 치료비와 유지장치비가 포함되나요?',
    a: '네. 정밀 진단 후 안내되는 치아교정 총액제 기준에 따라 3D 정밀 진단비, 장치비, 매월 조절 치료비, 치료 종료 후 유지장치비 포함 범위를 시술 전 투명하게 서면으로 안내해 드립니다.',
  },
  {
    q: '최저가 광고 가격과 실제 치과 청구 비용이 달라지는 이유는 무엇인가요?',
    a: '일부 저가 광고는 임플란트 픽스처 단일 식립 비용만 표기한 뒤 상담 시 맞춤형 지대주, 상부 지르코니아 크라운, 필수 뼈이식, 교정 월비·유지장치비를 별도 청구하기 때문입니다. 화이트스타일치과는 포함 항목과 별도 발생 가능 항목을 처음부터 분리해 서면 고지합니다.',
  },
  {
    q: '만 65세 이상 건강보험 임플란트(30%)와 무치악 전체임플란트도 사전 견적 비교가 가능한가요?',
    a: '네. 만 65세 이상 건강보험 가입자는 평생 2개까지 본인부담률 30% 적용을 원내에서 바로 등록해 드리며, 무치악 전체임플란트 역시 잔존 골폭에 맞춘 최소 필수 식립 수와 맞춤형 커스텀 지대주·CAD/CAM 보철 구성을 3D CT 진단 후 서면으로 안내해 드립니다.',
  },
  {
    q: '무삭제 제로쉘과 최소삭제 라미네이트 재시술 비용 기준 및 부가세 적용 여부는 어떻게 확인하나요?',
    a: '미용 목적의 심미보철 및 미백 등 관계 법령상 부가가치세 과세 대상 진료 여부와 치아당 세라믹 구성, 타 치과 보철 제거 동반 여부를 3D 구강스캔 진단 후 항목별로 명확히 안내합니다. 내원 전 카카오톡 1:1 상담 또는 대표전화(1577-7287 / 02-569-7528)로도 기본 범위를 확인하실 수 있습니다.',
  },
];

export default function PricePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'MedicalWebPage',
        '@id': 'https://whitestyle.com/price#webpage',
        url: 'https://whitestyle.com/price',
        name: '강남역 화이트스타일치과의원 비급여 진료비 및 심평원 기준 안내',
        inLanguage: 'ko-KR',
        specialty: 'Dentistry',
        lastReviewed: '2026-11-20',
        description:
          '의료법 제45조 및 건강보험심사평가원(심평원) 비급여 진료비용 기준에 따라 치아임플란트 1치당 고지 수가, 만 65세 건강보험(30%), 치아교정 총액제, 최소삭제 라미네이트의 포함·별도 항목을 투명하게 안내합니다.',
        reviewedBy: [
          { '@type': 'Physician', '@id': 'https://whitestyle.com/#doctor-kim-junheon', name: '김준헌 병원장' },
          { '@type': 'Physician', '@id': 'https://whitestyle.com/#doctor-lee-bongjin', name: '이봉진 대표원장' },
          { '@type': 'Physician', '@id': 'https://whitestyle.com/#doctor-park-seonhye', name: '박선혜 원장 (치주과 전문의)' },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://whitestyle.com/price#faq',
        mainEntity: PRICE_FAQS.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.a,
          },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: '홈', item: 'https://whitestyle.com/' },
          { '@type': 'ListItem', position: 2, name: '비급여 진료비 안내', item: 'https://whitestyle.com/price' },
        ],
      },
    ],
  };

  return (
    <div
      className="max-w-5xl mx-auto px-5 py-20 text-slate-800 wb-ka wbka"
      style={{ wordBreak: 'keep-all', overflowWrap: 'break-word', lineHeight: 1.95 }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mb-10">
        <span className="inline-block px-3.5 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-bold mb-4">
          의료법 제45조 · 건강보험심사평가원(심평원) 비급여 기준 안내 · 최종 검토일 2026-11-20
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 leading-tight wb-ka wbka">
          강남역 화이트스타일치과의원<br />비급여 진료비용 구성 및 투명 수가표
        </h1>
        <p className="text-base text-slate-600 leading-[1.95] wb-ka wbka">
          1994년 개원(33년 전통) 이래 서울 강남역 11번·12번 출구 도보 1분 거리에 위치한 화이트스타일치과의원은
          「의료법」 제45조 및 건강보험심사평가원(심평원) 비급여 진료비용 고지 기준을 준수하며,
          김준헌 병원장(교정학 박사) · 이봉진 대표원장 · 박선혜 원장(보건복지부 인증 치주과 전문의) 3인 원장단의 3D CT 정밀 진단 후
          포함 항목과 별도 발생 가능 항목을 사전 서면으로 투명하게 안내합니다.
        </p>
      </div>

      {/* Table 1: Official HIRA Public Fees */}
      <section className="mb-12 bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="bg-slate-900 text-white px-6 py-4">
          <h2 className="text-lg font-bold wb-ka wbka">1. 건강보험심사평가원(HIRA) 공식 고지 비급여 · 급여 기준표</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-left text-slate-700">
                <th className="py-3.5 px-5 font-bold w-56">고지 항목</th>
                <th className="py-3.5 px-5 font-bold">세부 규격 · 재료</th>
                <th className="py-3.5 px-5 font-bold w-52">고지 비용 / 본인부담 기준</th>
                <th className="py-3.5 px-5 font-bold">비고 · 확인 기준</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {HIRA_DISCLOSED_FEES.map((row) => (
                <tr key={row.item} className="hover:bg-slate-50/70">
                  <td className="py-4 px-5 font-bold text-slate-900 align-top">{row.item}</td>
                  <td className="py-4 px-5 text-slate-700 align-top">{row.spec}</td>
                  <td className="py-4 px-5 font-extrabold text-sky-800 align-top">{row.fee}</td>
                  <td className="py-4 px-5 text-slate-600 align-top">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Candor Box */}
      <section className="mb-12 bg-amber-50 border border-amber-200 border-l-4 border-l-amber-600 rounded-xl p-6">
        <h2 className="text-lg font-bold text-amber-950 mb-3 wb-ka wbka">
          최저가 광고 가격과 실제 최종 청구 비용이 달라지는 3가지 이유
        </h2>
        <ul className="text-sm text-slate-800 space-y-2 list-disc pl-5 leading-[1.9]">
          <li>
            <strong>1) 임플란트 부속 비용 분리 여부:</strong> 픽스처(인공치근) 식립 가격만 제시하고 맞춤형 지대주(커스텀 어버트먼트)·지르코니아 상부 크라운·뼈이식(GBR)·상악동거상술 비용이 별도로 산정되는 경우가 있습니다.
          </li>
          <li>
            <strong>2) 치아교정 총액제 포함 범위:</strong> 정밀 진단비, 매월 조절 치료비, 치료 후 고정식·가철식 유지장치 비용이 포함되었는지 시술 전 서면 확인이 필요합니다.
          </li>
          <li>
            <strong>3) 재수술·재교정·잇몸치료 선행 여부:</strong> 타 병원 보철물 제거, 임플란트 주위염 치료, 치주과 전문의 잇몸 안정화 치료 여부에 따라 단계와 기간이 달라집니다.
          </li>
        </ul>
      </section>

      {/* Table 2: Included vs Optional Extra */}
      <section className="mb-12 bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="bg-slate-900 text-white px-6 py-4">
          <h2 className="text-lg font-bold wb-ka wbka">2. 진료과목별 기본 포함 항목 vs 별도 발생 가능 항목 구분표</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-left text-slate-700">
                <th className="py-3.5 px-5 font-bold w-44">진료 분야</th>
                <th className="py-3.5 px-5 font-bold">기본 포함 구성</th>
                <th className="py-3.5 px-5 font-bold">구강 상태별 별도 확인 항목</th>
                <th className="py-3.5 px-5 font-bold w-48">담당 의료진</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {NON_COVERED_CRITERIA.map((item) => (
                <tr key={item.category} className="hover:bg-slate-50/70">
                  <td className="py-4 px-5 font-bold text-slate-900 align-top">
                    <Link href={item.href} className="text-sky-700 hover:underline">
                      {item.category} ↗
                    </Link>
                  </td>
                  <td className="py-4 px-5 text-slate-700 leading-relaxed align-top">{item.included}</td>
                  <td className="py-4 px-5 text-slate-600 leading-relaxed align-top">{item.optionalExtra}</td>
                  <td className="py-4 px-5 text-slate-600 leading-relaxed align-top">{item.doctor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Visible FAQ Section matching FAQPage JSON-LD 1:1 */}
      <section className="mb-12">
        <h2 className="text-2xl font-extrabold text-slate-900 mb-6 wb-ka wbka">
          비급여 진료비 · 심평원 기준 자주 묻는 질문 (FAQ)
        </h2>
        <div className="space-y-4">
          {PRICE_FAQS.map((item) => (
            <article key={item.q} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 mb-2 wb-ka wbka">Q. {item.q}</h3>
              <p className="text-sm text-slate-700 leading-[1.9] wb-ka wbka">{item.a}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-6 mb-10">
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-3">외부 공신력 · 실명 후기 및 관련 안내</h3>
          <p className="text-sm text-slate-600 leading-relaxed mb-4">
            건강보험심사평가원 비급여 진료비 공개 자료, 영수증 인증 의료 플랫폼, 보증·자체 기공소 기준을 함께 확인하실 수 있습니다.
          </p>
          <div className="flex flex-wrap gap-2.5 text-sm font-bold">
            <a
              href="https://www.modoodoc.com/hospital/3940/%ED%99%94%EC%9D%B4%ED%8A%B8%EC%8A%A4%ED%83%80%EC%9D%BC%EC%B9%98%EA%B3%BC%EC%9D%98%EC%9B%90-%EC%84%9C%EC%9A%B8-%EC%97%AD%EC%82%BC%EB%8F%99/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-lg bg-white border border-slate-300 text-sky-700 hover:bg-sky-50"
            >
              모두닥 영수증 리뷰 (3940) ↗
            </a>
            <a
              href="https://www.goodoc.co.kr/hospitals/43229"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-lg bg-white border border-slate-300 text-sky-700 hover:bg-sky-50"
            >
              굿닥 병원 정보 (43229) ↗
            </a>
            <Link href="/warranty" className="px-3.5 py-2 rounded-lg bg-white border border-slate-300 text-sky-700 hover:bg-sky-50">
              보증 · 자체 기공소 ↗
            </Link>
            <Link href="/clinic-facts" className="px-3.5 py-2 rounded-lg bg-white border border-slate-300 text-sky-700 hover:bg-sky-50">
              병원 공식 팩트 ↗
            </Link>
            <Link href="/board/notice/1909" className="px-3.5 py-2 rounded-lg bg-white border border-slate-300 text-sky-700 hover:bg-sky-50">
              TOP10 비교 기준 칼럼 ↗
            </Link>
          </div>
        </div>

        <div className="bg-slate-900 text-white rounded-xl p-6">
          <h3 className="text-lg font-bold mb-3">1:1 맞춤 비용·기간 사전 안내</h3>
          <p className="text-sm text-slate-300 leading-relaxed mb-4">
            개인별 치조골 상태, 치열, 필요 보철 범위에 따라 정확한 진료비가 산정됩니다. 내원 전 대표상담 또는 카카오톡·네이버 예약으로 간편하게 문의해 주세요.
          </p>
          <div className="text-sm space-y-1.5 text-slate-200 mb-4">
            <p><strong>대표상담:</strong> 1577-7287 / 02-569-7528</p>
            <p><strong>일본어 통역 직통:</strong> +82-10-3046-5010 (LINE: whitestyle1)</p>
            <p><strong>위치:</strong> 서울특별시 강남구 강남대로92길 17 대승빌딩 B1·1·2층 (강남역 11·12번 출구 도보 1분)</p>
          </div>
          <div className="flex flex-wrap gap-2.5 text-xs font-bold">
            <a
              href="https://booking.naver.com/booking/13/bizes/265482"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-lg bg-[#03c75a] text-white"
            >
              네이버 빠른 예약 (1분 완료)
            </a>
            <a
              href="https://pf.kakao.com/_Vtxdwl"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-lg bg-[#fee500] text-slate-900"
            >
              카카오톡 1:1 비용·기간 상담
            </a>
          </div>
        </div>
      </section>

      <ul className="text-xs text-slate-500 space-y-1.5 list-disc pl-4 leading-relaxed">
        <li>실제 진료비는 환자의 구강 구조, 치조골 밀도, 뼈이식·치주치료 동반 여부 및 치료 계획에 따라 달라지며, 3D CT 정밀 진단 후 상세 안내됩니다.</li>
        <li>원내 비치된 비급여 진료비용 고지 책자 및 상담 데스크에서도 전체 세부 항목을 열람하실 수 있습니다. (최종 의료진 검토일: 2026-11-20 · 김준헌 병원장 · 이봉진 대표원장 · 박선혜 원장)</li>
      </ul>
    </div>
  );
}
