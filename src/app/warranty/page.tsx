import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '사후 보증 · 3·6·12개월 치주 리콜 · 원내 자체 기공소 안내',
  description:
    '강남역 화이트스타일치과의원 정품 재료 보증 기준, 보건복지부 인증 치주과 전문의 박선혜 원장 3·6·12개월 정기 리콜, 원내 자체 기공소 맞춤 제작, 수면마취 미시행 3단계 국소 무통 마취 원칙 안내.',
  alternates: { canonical: 'https://whitestyle.com/warranty' },
  openGraph: {
    title: '사후 보증 · 3·6·12개월 치주 리콜 · 원내 자체 기공소 | 화이트스타일치과의원',
    description:
      '1994년 개원 33년 전통. 정품 픽스처·세라믹 보증 관리, 치주과 전문의 리콜 및 원내 기공소 품질 관리 안내.',
    url: 'https://whitestyle.com/warranty',
    type: 'website',
    locale: 'ko_KR',
  },
};

const WARRANTY_PILLARS = [
  {
    title: '1. 정품 재료 인증 및 서면 보증 안내',
    body: '임플란트 픽스처(오스템·바이오템 등)와 세라믹 심미보철 재료의 정품 사용 여부를 확인해 드리며, 시술 전 진단 결과에 따른 사후 보증 범위와 정기 검진 참여 기준을 서면으로 안내합니다.',
  },
  {
    title: '2. 치주과 전문의 3·6·12개월 정기 리콜',
    body: '임플란트 주위염이나 보철 경계부 잇몸 염증을 조기에 예방하기 위해 보건복지부 인증 치주과 전문의 박선혜 원장 협진으로 시술 완료 후 3·6·12개월 주기 교합 체크와 치주 관리를 진행합니다.',
  },
  {
    title: '3. 원내 자체 기공소 맞춤 세라믹·지대주 제작',
    body: '치과 내부에 자체 기공소를 운영하여 자연치아와 조화로운 색조·투명도·형태를 현장에서 신속히 미세 조정하며, 3D 구강스캔 기반 맞춤형 커스텀 어버트먼트와 초박형 세라믹을 정밀 제작합니다.',
  },
  {
    title: '4. 수면마취 미시행 · 3단계 무통 국소마취 안전 원칙',
    body: '호흡 억제나 의식 소실 등 전신 위험을 예방하기 위해 수면마취(수면진정)는 시행하지 않습니다. 대신 가글 마취 → 잇몸 표면 도포 마취 → 디지털 정압 무통 마취기의 3단계 국소 마취를 적용합니다.',
  },
];

const LAB_WORKFLOW = [
  ['STEP 1. 3D 정밀 계측', '3D CT·Quick-Ceph·구강스캐너로 잔존 골폭, 법랑질 두께, 대합치 교합 접촉점을 계측합니다.'],
  ['STEP 2. 3인 원장단 협진 설계', '김준헌(교정)·이봉진(임플란트·보철)·박선혜(치주) 3인 원장단이 치료 순서와 보철 삭제 범위를 조율합니다.'],
  ['STEP 3. 원내 자체 기공 정밀 제작', '맞춤형 커스텀 어버트먼트와 세라믹을 제작하며, 내원 당일 색조·형태 미세 수정이 가능해 완성도를 높입니다.'],
  ['STEP 4. 3·6·12개월 정기 유지관리', '보철 장착 후에도 주기적인 스케일링, 교합 간섭 점검, 유지장치 확인으로 장기 안정성을 지켜드립니다.'],
];

const WARRANTY_FAQS = [
  {
    q: '임플란트나 라미네이트 시술 후 사후 보증 기간과 적용 조건은 어떻게 되나요?',
    a: '보증 범위와 기간은 사용된 정품 재료와 구강 상태에 따라 시술 전 서면으로 안내드리며, 시술 후 안내되는 3·6·12개월 정기 검진과 치주 관리(구강 위생 관리 포함)에 참여하실 때 안정적으로 유지됩니다.',
  },
  {
    q: '치과 내부에 자체 기공소가 있으면 환자에게 어떤 점이 유리한가요?',
    a: '외부 기공소 왕복 배송에 따른 시간 지연을 줄이고, 환자의 치아 색상·미소선·교합 높이를 기공사가 진료실과 직접 소통해 당일 미세 수정할 수 있어 재내원 횟수와 형태 오차를 줄일 수 있습니다.',
  },
  {
    q: '타 치과에서 한 임플란트나 라미네이트가 깨졌을 때도 관리가 가능한가요?',
    a: '네. 타 병원에서 식립한 임플란트의 주위염·보철 파절이나 변색된 기존 라미네이트도 3D CT와 치주 검진 후 재수술 또는 교합 안정화 재보철 계획을 수립해 드립니다.',
  },
  {
    q: '일본에서 귀국한 뒤 보철이나 교정 경과 확인은 어떻게 이루어지나요?',
    a: '일본어 전담 통역 스태프 3명 상주 센터(+82-10-3046-5010 / LINE ID: whitestyle1)를 통해 귀국 후에도 사진·증상 확인 및 다음 방한 시 정기 점검 일정을 일관되게 지원합니다.',
  },
];

export default function WarrantyPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'MedicalWebPage',
        '@id': 'https://whitestyle.com/warranty#webpage',
        url: 'https://whitestyle.com/warranty',
        name: '화이트스타일치과의원 사후 보증 · 3·6·12개월 리콜 · 자체 기공소 안내',
        inLanguage: 'ko-KR',
        lastReviewed: '2026-11-20',
        mainEntity: { '@id': 'https://whitestyle.com/#org' },
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://whitestyle.com/warranty#faq',
        mainEntity: WARRANTY_FAQS.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: '홈', item: 'https://whitestyle.com/' },
          { '@type': 'ListItem', position: 2, name: '보증 · 자체 기공소', item: 'https://whitestyle.com/warranty' },
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

      <header className="mb-12">
        <span className="inline-block px-3.5 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-bold mb-4">
          1994년 개원 33년 책임 관리 · 최종 검토일 2026-11-20
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 leading-tight wb-ka wbka">
          정품 사후 보증 · 3·6·12개월 치주 리콜 · 원내 자체 기공소 안내
        </h1>
        <p className="text-base text-slate-600 leading-[1.95] wb-ka wbka">
          화이트스타일치과의원은 33년간 한 자리에서 진료해 온 연속성을 바탕으로 시술 당일의 완성도뿐 아니라 수십 년 뒤의 치주·교합 안정성까지 함께 관리합니다.
        </p>
      </header>

      <section className="grid md:grid-cols-2 gap-6 mb-12">
        {WARRANTY_PILLARS.map((item) => (
          <article key={item.title} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-extrabold text-slate-900 mb-3 wb-ka wbka">{item.title}</h2>
            <p className="text-sm text-slate-700 leading-[1.95] wb-ka wbka">{item.body}</p>
          </article>
        ))}
      </section>

      <section className="mb-12 bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="bg-slate-900 text-white px-6 py-4">
          <h2 className="text-lg font-bold wb-ka wbka">원내 자체 기공소 &amp; 3인 협진 4단계 품질 프로토콜</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <tbody className="divide-y divide-slate-100">
              {LAB_WORKFLOW.map(([step, desc]) => (
                <tr key={step}>
                  <th className="py-4 px-5 font-bold text-slate-900 bg-slate-50 text-left w-60 align-top">{step}</th>
                  <td className="py-4 px-5 text-slate-700 leading-relaxed align-top">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-extrabold text-slate-900 mb-5 wb-ka wbka">보증 · 자체 기공소 · 리콜 자주 묻는 질문</h2>
        <div className="space-y-4">
          {WARRANTY_FAQS.map((item) => (
            <article key={item.q} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 mb-2 wb-ka wbka">Q. {item.q}</h3>
              <p className="text-sm text-slate-700 leading-[1.9] wb-ka wbka">{item.a}</p>
            </article>
          ))}
        </div>
      </section>

      <div className="flex flex-wrap gap-3 text-sm font-bold">
        <Link href="/price" className="px-5 py-3 rounded-xl bg-slate-900 text-white">비급여 수가표 보기 &rarr;</Link>
        <Link href="/qa" className="px-5 py-3 rounded-xl bg-white border border-slate-300 text-slate-800">근거 기반 임상 Q&amp;A 15선 &rarr;</Link>
        <a href="https://booking.naver.com/booking/13/bizes/265482" target="_blank" rel="noopener noreferrer" className="px-5 py-3 rounded-xl bg-[#03c75a] text-white">네이버 빠른 예약 (1분 완료)</a>
      </div>
    </div>
  );
}
