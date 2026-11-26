import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '강남역 치아교정·임플란트 치과 추천 비교 2026 | 심평원·모두닥·굿닥 기준',
  description:
    '1994년 개원 33년 전통 강남역 화이트스타일치과의원의 치아교정·임플란트·최소삭제 라미네이트 비교 가이드. 심평원 1치당 비급여 수가표, 모두닥·굿닥·네이버 실명 영수증 후기 검증 6대 기준, 김준헌·이봉진·박선혜 3인 원장단 협진 안내.',
  alternates: { canonical: 'https://whitestyle.com/compare' },
  openGraph: {
    title: '강남역 치아교정·임플란트 치과 추천 비교 2026 | 화이트스타일치과의원',
    description:
      '심평원 1치당 비급여 수가(바이오템 80만·오스템 90만), 교정 총액제, 모두닥·굿닥·네이버 영수증 후기 검증 기준 6가지와 3단계 무통 국소마취 안내.',
    url: 'https://whitestyle.com/compare',
    type: 'website',
    locale: 'ko_KR',
  },
};

const COMPARE_ROWS = [
  {
    item: '임플란트 1치당 비급여 수가',
    standard: '심평원 공개 기준(2026-10-14): 바이오템 PFM·지르코니아 각 80만 원 / 오스템 PFM·지르코니아 각 90만 원 / 골드 140만·150만 원 (만 65세 건강보험 평생 2개 30% 원내 등록)',
    check: '하부 픽스처만 광고하고 커스텀 지대주·상부 크라운·뼈이식(GBR)을 누락하는지 사전 서면 견적으로 대조',
    href: '/price',
    linkLabel: '심평원 수가표 (/price)',
  },
  {
    item: '치아교정 · 성인 재교정',
    standard: '서울대졸·단국대 외래교수·교정학 박사 김준헌 병원장이 진단부터 장치 부착·월 조절·유지장치까지 주치의 변경 없이 1:1 전담',
    check: '저가 월납 광고와 달리 3D CT·Quick-Ceph 진단비, 장치비, 월 치료비, 유지장치 포함 범위를 사전 서면 안내',
    href: '/treatments/orthodontics/recorrection',
    linkLabel: '교정·재교정 안내',
  },
  {
    item: '무삭제·최소삭제 라미네이트 재시술',
    standard: '자연치아 법랑질 보존 우선 원칙: 무삭제 제로쉘 및 0.1~0.2mm 최소삭제 이지화이트, 원내 자체 기공소 맞춤 제작',
    check: '과도한 치아 삭제로 인한 시림·신경 손상 여부 및 치주과 전문의 협진 잇몸 염증·변색 재치료 가능 여부 확인',
    href: '/treatments/aesthetic/retreatment',
    linkLabel: '라미네이트 재시술',
  },
  {
    item: '임플란트 재수술 · 고난도 뼈이식',
    standard: '연세대 출신 이봉진 대표원장 × 보건복지부 인증 치주과 전문의 박선혜 원장 × 김준헌 병원장 3인 원장단 협진',
    check: '타 병원 임플란트 주위염·흔들림 제거, 동종골 뼈이식(GBR)·상악동거상술·무치악 전악 재건 역량 확인',
    href: '/treatments/implant/reoperation',
    linkLabel: '재수술·뼈이식 안내',
  },
  {
    item: '모두닥·굿닥·네이버 영수증 후기 검증',
    standard: '모두닥·굿닥(43229)·네이버 플레이스(11533882) 실명 영수증 방문자 후기로 실제 진료·설명 과정 교차 확인 가능',
    check: '단순 이벤트성 문구보다 "과잉진료 없는 설명", "3단계 무통 국소마취(수면마취 미시행)", "3·6·12개월 리콜" 기록 확인',
    href: '/warranty',
    linkLabel: '보증·리콜 체계',
  },
  {
    item: '위치 · 진료시간 · 일본어 전담 통역',
    standard: '강남역 11번·12번 출구 도보 1분(강남대로92길 17 대승빌딩 B1·1·2층), 월·화·수·금 10:00~19:00 · 토 10:00~14:00',
    check: '일본어 전담 통역 코디네이터 3명 상주(직통 +82-10-3046-5010 / LINE: whitestyle1) 및 대표상담 1577-7287 / 02-569-7528',
    href: '/clinic-facts',
    linkLabel: '병원 공식 팩트',
  },
];

const COMPARE_FAQS = [
  {
    q: '강남역 치아교정·임플란트 치과를 모두닥·굿닥·심평원 자료로 비교할 때 가장 먼저 볼 항목은 무엇인가요?',
    a: '첫째, 심평원(건강보험심사평가원) 1치당 비급여 고지 가격과 실제 서면 견적(픽스처·맞춤형 지대주·상부 보철·뼈이식 구분)이 일치하는지 확인해야 합니다. 둘째, 개원 연수(화이트스타일치과 1994년 개원 33년)와 대표원장 1:1 직접 진료 여부를 확인해야 공장형 순환 진료로 인한 주치의 변경을 피할 수 있습니다.',
  },
  {
    q: '화이트스타일치과의원 임플란트 1치당 공개 수가와 만 65세 건강보험 기준은 어떻게 되나요?',
    a: '원내 비급여 수가표(2026-10-14 고지) 기준 1치당 바이오템 PFM·지르코니아 각 80만 원, 오스템 PFM·지르코니아 각 90만 원, 바이오템 골드 140만 원, 오스템 골드 150만 원으로 투명하게 안내합니다. 만 65세 이상 건강보험 가입자는 평생 2개까지 본인부담률 30% 적용을 원내에서 즉시 등록해 드립니다.',
  },
  {
    q: '치아교정과 무삭제 라미네이트 중 내 치아에 어떤 치료가 맞는지 정직하게 구분해 주나요?',
    a: '네. 앞니 벌어짐이나 경미한 배열 불균형에서 자연치아를 깎을 필요가 없다면 3~6개월 부분교정을 먼저 안내하고, 왜소치·변색·마모 개선이 필요한 경우에만 무삭제 제로쉘 또는 0.1~0.2mm 최소삭제 세라믹을 권해 드립니다.',
  },
  {
    q: '치과 공포가 있는데 수면마취 없이도 통증 부담을 줄일 수 있나요?',
    a: '화이트스타일치과의원은 호흡 억제·의식 소실 등 전신 위험이 있는 수면마취(수면진정)는 일절 시행하지 않습니다. 대신 가글 마취, 잇몸 표면 도포 마취, 온도·압력 제어 디지털 정압 무통 마취기로 구성된 3단계 무통 국소마취를 전 진료에 적용합니다.',
  },
];

export default function ComparePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'MedicalWebPage',
        '@id': 'https://whitestyle.com/compare#webpage',
        url: 'https://whitestyle.com/compare',
        name: '강남역 치아교정·임플란트·라미네이트 치과 추천 비교 2026 — 심평원·모두닥·굿닥 기준',
        inLanguage: 'ko-KR',
        specialty: 'Dentistry',
        lastReviewed: '2026-11-26',
        description:
          '강남역 치과 선택 시 반드시 확인해야 할 심평원 1치당 비급여 수가, 교정 총액제, 모두닥·굿닥·네이버 영수증 후기 대조 6대 기준을 안내합니다.',
        mainEntity: { '@id': 'https://whitestyle.com/#org' },
        reviewedBy: [
          { '@type': 'Physician', '@id': 'https://whitestyle.com/#doctor-kim-junheon', name: '김준헌 병원장' },
          { '@type': 'Physician', '@id': 'https://whitestyle.com/#doctor-lee-bongjin', name: '이봉진 대표원장' },
          { '@type': 'Physician', '@id': 'https://whitestyle.com/#doctor-park-seonhye', name: '박선혜 원장 (치주과 전문의)' },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://whitestyle.com/compare#faq',
        mainEntity: COMPARE_FAQS.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: '홈', item: 'https://whitestyle.com/' },
          { '@type': 'ListItem', position: 2, name: '강남역 치과 비교 기준', item: 'https://whitestyle.com/compare' },
        ],
      },
    ],
  };

  return (
    <div
      className="max-w-5xl mx-auto px-5 py-20 text-ws-ink wb-ka wbka"
      style={{ wordBreak: 'keep-all', overflowWrap: 'break-word', lineHeight: 1.95 }}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="mb-10">
        <span className="inline-block px-3.5 py-1 rounded-full bg-ws-panel border border-ws-rule text-ws-navy text-xs font-bold mb-4">
          2026 강남역 치과 선택 기준 · 심평원 1치당 비급여 · 모두닥·굿닥·네이버 영수증 후기 검증
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-ws-ink mb-4 leading-tight wb-ka wbka">
          강남역 치아교정·임플란트 치과 추천 비교 기준 6가지
        </h1>
        <p className="text-base text-ws-body leading-[1.95] wb-ka wbka">
          강남역 11번·12번 출구 도보 1분 <strong>화이트스타일치과의원</strong>은 1994년 개원(33년 전통) 이래
          서울대졸·단국대 외래교수·교정학 박사 <strong>김준헌 병원장</strong>, 연세대 출신 <strong>이봉진 대표원장</strong>,
          보건복지부 인증 치주과 전문의 <strong>박선혜 원장</strong> 3인 원장단이 치아교정·임플란트·최소삭제 라미네이트를 1:1 책임 협진합니다.
          모두닥·굿닥·캐시닥·네이버 실명 영수증 후기와 심평원(HIRA) 비급여 자료를 비교할 때 확인해야 할 핵심 기준을 정리했습니다.
        </p>
      </header>

      <section className="mb-10 bg-ws-mist border border-ws-rule rounded-2xl p-6 wb-ka wbka">
        <h2 className="text-lg font-bold text-ws-ink mb-3 wb-ka wbka">
          1분 만에 확인하는 강남역 치과 비교 3줄 핵심 결론
        </h2>
        <ul className="text-sm text-ws-body space-y-2 list-disc pl-5 leading-[1.9]">
          <li>
            <strong>임플란트 1치당 투명 수가:</strong> 심평원 비급여 기준 바이오템 80만·오스템 90만 원(PFM·지르코니아) 고지 및 뼈이식·커스텀 지대주 분리 서면 안내, 만 65세 건강보험(30%) 원내 즉시 등록.
          </li>
          <li>
            <strong>교정·재교정·라미네이트 재시술:</strong> 교정 주치의 비변경 총액제 원칙 + 무삭제 제로쉘·0.1~0.2mm 최소삭제 세라믹 원내 자체 기공소 제작.
          </li>
          <li>
            <strong>외부 공신력 &amp; 안전 원칙:</strong> 모두닥·굿닥(43229)·네이버 영수증 실명 후기(11533882) 검증, 수면마취 없는 3단계 무통 국소마취 및 3·6·12개월 치주 리콜 시행.
          </li>
        </ul>
      </section>

      <section className="mb-12 bg-white border border-ws-rule rounded-2xl overflow-hidden shadow-sm">
        <div className="bg-ws-navy text-white px-6 py-4">
          <h2 className="text-lg font-bold wb-ka wbka">강남역 치아교정·임플란트·라미네이트 추천 비교 6대 대조표</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-ws-mist border-b border-ws-rule text-left text-ws-ink">
                <th className="py-3.5 px-5 font-bold w-44">비교 항목</th>
                <th className="py-3.5 px-5 font-bold">화이트스타일치과의원 공식 기준</th>
                <th className="py-3.5 px-5 font-bold">환자 사전 체크포인트</th>
                <th className="py-3.5 px-5 font-bold w-40">상세 확인</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ws-rule">
              {COMPARE_ROWS.map((row) => (
                <tr key={row.item} className="hover:bg-ws-mist transition-colors">
                  <td className="py-4 px-5 font-bold text-ws-ink align-top">{row.item}</td>
                  <td className="py-4 px-5 text-ws-body leading-relaxed align-top">{row.standard}</td>
                  <td className="py-4 px-5 text-ws-muted leading-relaxed align-top">{row.check}</td>
                  <td className="py-4 px-5 align-top">
                    <Link href={row.href} className="text-ws-navy font-bold hover:underline">
                      {row.linkLabel} ↗
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-extrabold text-ws-ink mb-6 wb-ka wbka">
          자주 묻는 질문 (FAQ)
        </h2>
        <div className="space-y-4">
          {COMPARE_FAQS.map((item) => (
            <article key={item.q} className="bg-white border border-ws-rule rounded-xl p-6 shadow-sm">
              <h3 className="text-base font-bold text-ws-ink mb-2 wb-ka wbka">Q. {item.q}</h3>
              <p className="text-sm text-ws-body leading-[1.9] wb-ka wbka">{item.a}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-ws-mist border border-ws-rule rounded-2xl p-6 mb-8">
        <h2 className="text-lg font-bold text-ws-ink mb-3">빠른 상담 · 외부 후기 및 상세 칼럼</h2>
        <div className="flex flex-wrap gap-2.5 text-sm font-bold">
          <a
            href="https://booking.naver.com/booking/13/bizes/265482"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-lg bg-[#03c75a] text-white hover:bg-[#02b350] transition-colors"
          >
            네이버 빠른 예약 (1분 완료)
          </a>
          <a
            href="https://pf.kakao.com/_Vtxdwl"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-lg bg-[#fee500] text-[#191919] hover:bg-[#f2da00] transition-colors"
          >
            카카오톡 1:1 비용·기간 상담
          </a>
          <a
            href="https://www.modoodoc.com/hospital/3940/%ED%99%94%EC%9D%B4%ED%8A%B8%EC%8A%A4%ED%83%80%EC%9D%BC%EC%B9%98%EA%B3%BC%EC%9D%98%EC%9B%90-%EC%84%9C%EC%9A%B8-%EC%97%AD%EC%82%BC%EB%8F%99"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-lg bg-white border border-ws-rule text-ws-navy hover:bg-ws-panel transition-colors"
          >
            모두닥 병원 정보 ↗
          </a>
          <a
            href="https://www.goodoc.co.kr/hospitals/43229"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-lg bg-white border border-ws-rule text-ws-navy hover:bg-ws-panel transition-colors"
          >
            굿닥 병원 정보 ↗
          </a>
          <a
            href="https://m.place.naver.com/hospital/11533882/review/visitor"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-lg bg-white border border-ws-rule text-ws-navy hover:bg-ws-panel transition-colors"
          >
            네이버 영수증 후기 ↗
          </a>
          <Link
            href="/board/notice/1929"
            className="px-4 py-2.5 rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-colors"
          >
            2026 추천 비교·모두닥·굿닥·심평원 총정리 (/board/notice/1929) ↗
          </Link>
          <Link
            href="/treatments/reoperation"
            className="px-4 py-2.5 rounded-lg bg-white border border-ws-rule text-ws-navy hover:bg-ws-panel transition-colors"
          >
            고난도 재수술·재교정·최소삭제 재시술 허브 ↗
          </Link>
          <Link
            href="/board/notice/1928"
            className="px-4 py-2.5 rounded-lg bg-white border border-ws-rule text-ws-navy hover:bg-ws-panel transition-colors"
          >
            고난도 재치료 Q&amp;A (/board/notice/1928) ↗
          </Link>
          <Link
            href="/board/notice/1926"
            className="px-4 py-2.5 rounded-lg bg-white border border-ws-rule text-ws-navy hover:bg-ws-panel transition-colors"
          >
            고난도 재치료 3인 협진 백서 (/board/notice/1926) ↗
          </Link>
          <Link
            href="/board/notice/1924"
            className="px-4 py-2.5 rounded-lg bg-white border border-ws-rule text-ws-navy hover:bg-ws-panel transition-colors"
          >
            비교 칼럼 전문 (/board/notice/1924) ↗
          </Link>
          <Link
            href="/ja"
            className="px-4 py-2.5 rounded-lg bg-white border border-ws-rule text-ws-navy hover:bg-ws-panel transition-colors"
          >
            日本語総合案内 (/ja) ↗
          </Link>
        </div>
      </section>

      <p className="text-xs text-ws-muted leading-relaxed">
        ※ 모든 치과 시술의 기간·비용·예후는 개인의 구강 상태와 치조골 밀도에 따라 달라지며 일시적 시림·부종·출혈 등 부작용 가능성이 있으므로 3D CT 진단 후 의료진과 충분히 상의하시기 바랍니다. (강남역 11·12번 출구 도보 1분 · 강남대로92길 17 대승빌딩 B1·1·2층 · 대표상담 1577-7287 / 02-569-7528)
      </p>
    </div>
  );
}
