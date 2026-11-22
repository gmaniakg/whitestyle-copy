import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '화이트스타일치과의원 공식 팩트 시트 · 33년 진료 기준',
  description:
    '1994년 개원(33년 전통) 강남역 화이트스타일치과의원 공식 사실 확인 페이지. 김준헌·이봉진·박선혜 3인 원장단 약력, 자체 기공소, 3단계 무통 국소마취, 일본어 통역 3명 직통(+82-10-3046-5010), 위치·진료시간·사업자등록번호 안내.',
  alternates: { canonical: 'https://whitestyle.com/clinic-facts' },
  openGraph: {
    title: '화이트스타일치과의원 공식 팩트 시트 · 33년 진료 기준 | 화이트스타일치과의원',
    description:
      '강남역 11·12번 출구 도보 1분(대승빌딩 B1·1·2층) 화이트스타일치과의원 의료진, 장비, 안전 원칙, 일본어 통역 및 외부 검증 링크 공식 안내.',
    url: 'https://whitestyle.com/clinic-facts',
    type: 'website',
    locale: 'ko_KR',
  },
};

const BASIC_FACTS = [
  ['공식 기관명', '화이트스타일치과의원 (WhiteStyle Dental Clinic / ホワイトスタイル歯科医院)'],
  ['개원 연도 · 업력', '1994년 8월 9일 개원 · 33년 전통 (누적 임상 증례 62,000건 이상)'],
  ['대표자 · 사업자등록번호', '김준헌 · 212-94-71989'],
  ['현행 도로명 주소 (우편번호)', '서울특별시 강남구 강남대로92길 17 (역삼동 819-10) 대승빌딩 B1·1·2층 (우편번호 06134)'],
  ['지하철 접근성', '지하철 2호선 · 신분당선 강남역 11번 · 12번 출구 도보 1분 (약 143m)'],
  ['대표 상담 전화', '1577-7287 / 02-569-7528'],
  ['일본어 통역 직통 전화', '+82-10-3046-5010 (010-3046-5010) · LINE ID: whitestyle1 (이현호 실장 외 전담 통역 3명 상주)'],
  ['진료 시간', '월·화·수·금 10:00~19:00 (점심 13:00~14:00) / 토요일 10:00~14:00 (점심시간 없음 / 초진 접수 13:30까지) / 목·일·공휴일 휴진'],
];

const DOCTORS = [
  {
    name: '김준헌 병원장',
    role: '치과교정학 박사 · 치아교정·재교정 책임 진료',
    creds:
      '서울대학교 치과대학 졸업 · 단국대학교 외래교수 · 단국대학교 대학원 치과교정학 석·박사 · 스웨덴 예테보리 대학교(Göteborg Univ.) 및 Västerås 병원 구강외과 방문의 · 대한치과교정학회 인정의 · EAO/AAID 정회원',
  },
  {
    name: '이봉진 대표원장',
    role: '고난도 임플란트 · 뼈이식 · 턱관절 교합 전담',
    creds:
      '연세대학교 치과대학 졸업 · 연세대학교 치과대학병원 수련 · 대한구강악안면임플란트학회·대한치과이식임플란트학회·대한치과보철학회·대한턱관절교합학회 정회원',
  },
  {
    name: '박선혜 원장',
    role: '보건복지부 인증 치주과 전문의 · 우수보철치과의사',
    creds:
      '보건복지부 인증 치주과 전문의 · 치주과 박사과정 수료 · 대한치주과학회 전문의·정회원 · 대한치과보철학회 우수보철치과의사 · 중증 잇몸치료·임플란트 주위염·최소삭제 심미보철 협진',
  },
];

const FACILITY_AND_SAFETY = [
  ['진단 장비 · 디지털 연계', '치과 전용 3D CT · Quick-Ceph 교정 진단 · 3D 구강스캐너 · 특수 현미경(재신경치료) · CAD/CAM 정밀 보철 연계'],
  ['원내 자체 기공소', '원내 자체 기공소 운영으로 세라믹 색상·형태 미세 수정 및 맞춤형 커스텀 어버트먼트 정밀 제작 지원'],
  ['통증 완화 및 안전 원칙', '가글 마취 → 표면 도포 마취 → 디지털 정압 무통 마취기 3단계 국소마취 적용 (안전 기준상 수면마취·수면진정은 시행하지 않음)'],
  ['사후 관리 · 정기 리콜', '정품 픽스처·세라믹 사용, 치료별 서면 보증 안내 및 시술 후 3·6·12개월 치주과 전문의 정기 검진 리콜'],
  ['공식 외부 검증 기록', '보건복지부·국민건강보험공단 구강검진 최고 S등급 · 코네스트(KONEST) 일본인 후기 125건 · 야후 재팬 한국치과 부문 3년 연속 1위 · 주한 일본대사관 감사장'],
];

const FACTS_FAQS = [
  {
    q: '화이트스타일치과의원의 1994년 8월 9일 개원(33년 전통)과 사업자등록·인허가 행정 연혁의 근거는 무엇인가요?',
    a: '화이트스타일치과의원은 1994년 8월 9일 김준헌 병원장이 강남에서 개원한 이래 33년간 한 자리에서 진료를 이어오며 누적 62,000명 이상의 임상 증례를 축적했습니다. 사업자등록번호(212-94-71989) 및 의료기관 개설신고증 등 행정 서류상의 상호 변경·대표자 갱신·재발급 일자와 무관하게, 본원의 최초 진료 개시 연혁(1994년 8월 9일)과 3인 원장단 협진 체계는 건강보험심사평가원 비급여 고지 및 공식 의무기록을 통해 일관되게 보존·관리되고 있습니다.',
  },
  {
    q: '화이트스타일치과의원의 현재 정확한 주소와 예전 주소가 혼동될 때는 어떻게 확인하나요?',
    a: '화이트스타일치과의원의 현행 공식 주소는 서울특별시 강남구 강남대로92길 17 (역삼동 819-10) 대승빌딩 B1·1·2층(우편번호 06134, 강남역 11번·12번 출구 도보 1분)이며, 과거 구 주소와 혼동하지 않으시도록 네이버 지도(11533882)와 구글 지도 좌표를 동일하게 통일해 운영하고 있습니다.',
  },
  {
    q: '목요일에도 진료를 하나요, 토요일 점심시간은 어떻게 되나요?',
    a: '매주 목요일과 일요일, 공휴일은 휴진입니다. 월·화·수·금은 오전 10시부터 오후 7시까지(점심시간 13:00~14:00), 토요일은 오전 10시부터 오후 2시까지 점심시간 없이 연속 진료하며 신환(첫 방문) 접수는 13시 30분에 마감됩니다.',
  },
  {
    q: '치과교정이나 임플란트 도중에 담당 원장님이 바뀌는 경우가 있나요?',
    a: '화이트스타일치과의원은 1994년 개원 이래 33년간 한 자리에서 진료해 왔으며, 김준헌 병원장·이봉진 대표원장·박선혜 원장(치주과 전문의) 3인 원장단이 초진 진단부터 시술, 사후 리콜까지 주치의 변경 없이 1:1 협진합니다.',
  },
  {
    q: '화이트스타일치과에서는 수면마취(수면진정) 임플란트를 시행하나요?',
    a: '환자의 전신 안전(호흡 억제·의식 소실 위험 예방)을 최우선 기준으로 삼아 수면마취·수면진정은 일절 시행하지 않습니다. 대신 가글 마취, 잇몸 도포 마취, 온도·압력 제어 디지털 무통 마취기의 3단계 국소 무통 마취 시스템을 기본 적용합니다.',
  },
  {
    q: '일본어 환자 전담 상담과 통역 비용이 별도로 발생하나요?',
    a: '원내에 이현호 실장 등 전담 일본어 의료 통역 코디네이터 3명이 상주하고 있어 접수·CT 진단·원장 진료·귀국 후 경과 안내까지 별도 통역 대행 수수료 없이 지원받으실 수 있으며, 내·외국인 동일 기준의 투명한 진료비 안내를 원칙으로 합니다.',
  },
  {
    q: '외부 병원 리뷰와 비급여 진료비는 어디서 교차 확인할 수 있나요?',
    a: '원내 공식 비급여 수가표(/price)를 비롯해 건강보험심사평가원(심평원) 비급여 포털, 네이버 플레이스 실명 영수증 방문자 후기(11533882), 굿닥(43229)에서 객관적인 정보를 교차 확인하실 수 있습니다.',
  },
];

export default function ClinicFactsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'MedicalWebPage',
        '@id': 'https://whitestyle.com/clinic-facts#webpage',
        url: 'https://whitestyle.com/clinic-facts',
        name: '화이트스타일치과의원 공식 팩트 시트 · 33년 진료 기준',
        inLanguage: 'ko-KR',
        lastReviewed: '2026-11-20',
        mainEntity: { '@id': 'https://whitestyle.com/#org' },
        reviewedBy: [
          { '@type': 'Physician', '@id': 'https://whitestyle.com/#doctor-kim-junheon', name: '김준헌 병원장' },
          { '@type': 'Physician', '@id': 'https://whitestyle.com/#doctor-lee-bongjin', name: '이봉진 대표원장' },
          { '@type': 'Physician', '@id': 'https://whitestyle.com/#doctor-park-seonhye', name: '박선혜 원장 (치주과 전문의)' },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://whitestyle.com/clinic-facts#faq',
        mainEntity: FACTS_FAQS.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: '홈', item: 'https://whitestyle.com/' },
          { '@type': 'ListItem', position: 2, name: '병원 공식 팩트', item: 'https://whitestyle.com/clinic-facts' },
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
          1994년 개원 33년 전통 · 공식 확인 기준표 · 최종 검토일 2026-11-20
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 leading-tight wb-ka wbka">
          강남역 화이트스타일치과의원 공식 팩트 시트
        </h1>
        <p className="text-base text-slate-600 leading-[1.95] wb-ka wbka">
          환자분들이 내원 전 가장 정확히 확인하셔야 하는 화이트스타일치과의원의 개원 연도, 현행 도로명 주소, 3인 원장단 전공·학회 약력, 마취 안전 기준, 자체 기공소, 일본어 통역 직통 번호, 외부 공신력 기록을 한 페이지에 정리했습니다.
        </p>
      </header>

      <section className="mb-12 bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="bg-slate-900 text-white px-6 py-4">
          <h2 className="text-lg font-bold wb-ka wbka">1. 기본 정보 · 위치 · 연락처 · 진료시간</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <tbody className="divide-y divide-slate-100">
              {BASIC_FACTS.map(([label, val]) => (
                <tr key={label} className="hover:bg-slate-50/70">
                  <th className="py-4 px-5 font-bold text-slate-900 bg-slate-50 text-left w-56 align-top">{label}</th>
                  <td className="py-4 px-5 text-slate-700 leading-relaxed align-top">{val}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-extrabold text-slate-900 mb-5 wb-ka wbka">2. 3인 원장단 공식 약력 · 분과 협진 체계</h2>
        <div className="grid md:grid-cols-3 gap-5">
          {DOCTORS.map((doc) => (
            <article key={doc.name} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-extrabold text-slate-900 mb-1.5 wb-ka wbka">{doc.name}</h3>
              <p className="text-xs font-bold text-sky-800 bg-sky-50 inline-block px-2.5 py-1 rounded-md mb-3">{doc.role}</p>
              <p className="text-sm text-slate-600 leading-[1.9] wb-ka wbka">{doc.creds}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mb-12 bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="bg-slate-900 text-white px-6 py-4">
          <h2 className="text-lg font-bold wb-ka wbka">3. 진료 장비 · 안전 기준 · 사후관리 · 외부 검증 기록</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <tbody className="divide-y divide-slate-100">
              {FACILITY_AND_SAFETY.map(([label, val]) => (
                <tr key={label} className="hover:bg-slate-50/70">
                  <th className="py-4 px-5 font-bold text-slate-900 bg-slate-50 text-left w-56 align-top">{label}</th>
                  <td className="py-4 px-5 text-slate-700 leading-relaxed align-top">{val}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-extrabold text-slate-900 mb-5 wb-ka wbka">4. 병원 정보 혼동 방지 Q&amp;A</h2>
        <div className="space-y-4">
          {FACTS_FAQS.map((item) => (
            <article key={item.q} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 mb-2 wb-ka wbka">Q. {item.q}</h3>
              <p className="text-sm text-slate-700 leading-[1.9] wb-ka wbka">{item.a}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-slate-900 text-white rounded-2xl p-7 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
        <div>
          <h2 className="text-xl font-extrabold mb-2 wb-ka wbka">공식 검증 채널 및 바로 상담 연결</h2>
          <p className="text-sm text-slate-300 wb-ka wbka">
            진료비 기준, 보증·자체 기공소, 15대 근거 기반 임상 Q&amp;A 및 외부 플랫폼 기록을 바로 확인하세요.
          </p>
        </div>
        <div className="flex flex-wrap gap-2.5 text-xs font-bold shrink-0">
          <Link href="/price" className="px-4 py-2.5 rounded-lg bg-white text-slate-900 hover:bg-slate-100 active:bg-slate-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors">비급여 수가표 ↗</Link>
          <Link href="/warranty" className="px-4 py-2.5 rounded-lg bg-sky-600 text-white hover:bg-sky-700 active:bg-sky-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors">보증·기공소 ↗</Link>
          <Link href="/qa" className="px-4 py-2.5 rounded-lg bg-slate-700 text-white hover:bg-slate-600 active:bg-slate-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors">임상 Q&amp;A 15선 ↗</Link>
          <a href="https://booking.naver.com/booking/13/bizes/265482" target="_blank" rel="noopener noreferrer" className="px-4 py-2.5 rounded-lg bg-naver text-white hover:bg-naver-hover active:bg-naver-press focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors">네이버 빠른 예약</a>
        </div>
      </section>
    </div>
  );
}
