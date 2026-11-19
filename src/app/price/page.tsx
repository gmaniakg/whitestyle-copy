import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '비급여 진료비·심평원 기준 안내 | 강남역 화이트스타일치과의원',
  description:
    '의료법 제45조 및 건강보험심사평가원(심평원) 비급여 기준에 따른 강남역 화이트스타일치과의원 치아교정 총액제·1치당 임플란트·최소삭제 라미네이트·원데이 미백 포함 항목 투명 안내.',
  alternates: { canonical: 'https://whitestyle.com/price' },
  openGraph: {
    title: '비급여 진료비·심평원 기준 안내 | 강남역 화이트스타일치과의원',
    description:
      '1994년 개원 33년 전통. 치아교정 총액제(월비·유지장치 포함) 및 임플란트·심미보철 비급여 구성 기준과 모두닥(3940)·굿닥(43229) 공식 안내.',
    url: 'https://whitestyle.com/price',
    type: 'website',
    locale: 'ko_KR',
  },
};

const NON_COVERED_CRITERIA = [
  {
    category: '치아교정 (총액제 기준)',
    scope: '3D CT·Quick-Ceph 정밀 진단비, 교정 장치비, 매월 조절 치료비, 치료 완료 후 유지장치비 포함 여부 사전 서면 안내',
    doctor: '김준헌 병원장 (서울대졸·단국대 외래교수·교정학 박사)',
    href: '/treatments/orthodontics',
  },
  {
    category: '임플란트 (1치당 구성 기준)',
    scope: '정품 픽스처 식립, 맞춤형 지대주(커스텀 어버트먼트), 상부 보철물(지르코니아 등), 필요 시 치조골 이식술 구분 안내 (만 65세 건강보험 적용 병행)',
    doctor: '이봉진 대표원장 · 박선혜 원장(치주과 전문의) · 김준헌 병원장 협진',
    href: '/treatments/implant',
  },
  {
    category: '최소삭제 심미보철 · 라미네이트',
    scope: '법랑질 두께·교합 분석 기반 무삭제(제로쉘) 또는 0.1~0.2mm 최소삭제 맞춤 세라믹 및 타 치과 보철 재시술 범위 안내',
    doctor: '박선혜 원장(보건복지부 인증 치주과 전문의) × 3인 원장단 협진',
    href: '/treatments/aesthetic',
  },
  {
    category: '원데이 전문가 미백 · 스케일링',
    scope: '파노라마 구강검진, 초음파 스케일링, 잇몸 보호제 도포 및 KFDA 승인 미백제 연속 광조사 원스톱 구성 안내',
    doctor: '3인 원장단 책임 진료 · 3단계 통증 완화 시스템',
    href: '/treatments/aesthetic/easy-white',
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
        inLanguage: 'ko',
        specialty: 'Dentistry',
        description:
          '의료법 제45조 및 건강보험심사평가원(심평원) 비급여 진료비용 기준에 따라 치아교정 총액제, 1치당 임플란트, 최소삭제 라미네이트, 원데이 미백의 구성 항목과 상담 절차를 투명하게 안내합니다.',
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://whitestyle.com/price#faq',
        mainEntity: [
          {
            '@type': 'Question',
            name: '강남역 화이트스타일치과의원 치아교정 비용에는 월 치료비와 유지장치비가 포함되나요?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: '네. 정밀 진단 후 안내되는 치아교정 총액제 기준에 따라 3D 정밀 진단비, 장치비, 매월 조절 치료비, 치료 종료 후 유지장치비 포함 범위를 시술 전 투명하게 서면으로 안내해 드립니다.',
            },
          },
          {
            '@type': 'Question',
            name: '임플란트 1치당 비용은 심평원 비급여 자료와 어떻게 비교해야 하나요?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: '임플란트는 픽스처 식립 외에 맞춤형 지대주, 상부 크라운 종류, 잇몸뼈 이식(GBR·상악동 거상술) 필요 여부에 따라 최종 계획이 달라지므로 3D CT 진단 후 세부 항목별 견적을 확인하는 것이 정확합니다.',
            },
          },
        ],
      },
    ],
  };

  return (
    <main
      className="max-w-5xl mx-auto px-5 py-24 text-slate-800 wb-ka wbka"
      style={{ wordBreak: 'keep-all', overflowWrap: 'break-word' }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mb-10">
        <span className="inline-block px-3.5 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-bold mb-4">
          의료법 제45조 · 건강보험심사평가원(심평원) 비급여 기준 안내
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 leading-tight wb-ka wbka">
          강남역 화이트스타일치과의원<br />비급여 진료비용 구성 및 투명 안내
        </h1>
        <p className="text-base text-slate-600 leading-relaxed wb-ka wbka">
          1994년 개원(33년 전통) 이래 서울 강남역 11번·12번 출구 도보 1분 거리에 위치한 화이트스타일치과의원은
          「의료법」 제45조 및 건강보험심사평가원(심평원) 비급여 진료비용 고지 기준을 준수하며,
          김준헌 병원장 · 이봉진 대표원장 · 박선혜 원장(치주과 전문의) 3인 원장단의 3D CT 정밀 진단 후
          개별 구강 상태에 따른 정확한 항목과 비용을 사전 서면 안내합니다.
        </p>
      </div>

      <section className="mb-12 bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="bg-slate-900 text-white px-6 py-4">
          <h2 className="text-lg font-bold wb-ka wbka">진료과목별 비급여 항목 구성 및 포함 기준</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-left text-slate-700">
                <th className="py-3.5 px-5 font-bold w-48">진료 분야</th>
                <th className="py-3.5 px-5 font-bold">세부 포함 구성 및 비교 기준</th>
                <th className="py-3.5 px-5 font-bold w-64">담당 의료진</th>
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
                  <td className="py-4 px-5 text-slate-700 leading-relaxed align-top">{item.scope}</td>
                  <td className="py-4 px-5 text-slate-600 leading-relaxed align-top">{item.doctor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-6 mb-12">
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
          <h3 className="text-lg font-bold text-slate-900 mb-3">외부 공신력 · 실명 후기 확인</h3>
          <p className="text-sm text-slate-600 leading-relaxed mb-4">
            건강보험심사평가원 비급여 진료비 공개 포털 및 영수증 인증 의료 플랫폼에서 화이트스타일치과의원의 실제 진료 후기와 정보를 확인하실 수 있습니다.
          </p>
          <div className="flex flex-wrap gap-3 text-sm font-bold">
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
            <Link
              href="/board/notice/1904"
              className="px-3.5 py-2 rounded-lg bg-white border border-slate-300 text-sky-700 hover:bg-sky-50"
            >
              비급여·치과 비교 가이드 ↗
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
        <li>원내 비치된 비급여 진료비용 고지 책자 및 상담 데스크에서도 전체 세부 항목을 열람하실 수 있습니다.</li>
      </ul>
    </main>
  );
}
