export interface VideoChapter {
  time: string;
  label: string;
  note: string;
}

export interface VideoQa {
  question: string;
  answer: string;
}

export interface ClinicalVideoArticle {
  slug: string;
  youtubeId: string;
  isShort?: boolean;
  title: string;
  originalYoutubeTitle: string;
  category: '치아교정·주치의 기준' | '임상 철학 · 방송 보도' | '3인 협진 · 병원 소개';
  uploadDate: string;
  durationIso: string;
  summary: string;
  keyTakeaways: [string, string, string];
  chapters: VideoChapter[];
  qas: [VideoQa, VideoQa, VideoQa];
  reviewedByIds: ('kim' | 'lee' | 'park')[];
  relatedQaSlugs: string[];
  relatedTreatmentUrl: string;
  relatedTreatmentLabel: string;
}

export interface ClinicVisitVideo {
  youtubeId: string;
  title: string;
  guestLabel: string;
}

export const CLINICAL_VIDEO_ARTICLES: ClinicalVideoArticle[] = [
  {
    slug: 'ortho-same-doctor-4-criteria',
    youtubeId: 'TNPXaWazP5c',
    isShort: true,
    title: '교정 중 원장님 안 바뀌는 강남역 치과 고르는 4가지 기준',
    originalYoutubeTitle: '교정 중 원장님 안 바뀌는 치과 고르는 기준 4가지 | 화이트스타일치과의원 #shorts',
    category: '치아교정·주치의 기준',
    uploadDate: '2026-05-01',
    durationIso: 'PT1M',
    summary:
      '치아교정은 1년~2년 반 이상 긴 호흡으로 진행되므로 치료 중간에 담당 의사가 바뀌면 초반 진단 목표와 치아 이동 계획이 흔들릴 수 있습니다. 1994년 개원 이래 33년간 한 자리에서 진료해 온 화이트스타일치과 김준헌 병원장의 주치의 연속성 확인 기준 4가지를 핵심 요약으로 정리했습니다.',
    keyTakeaways: [
      '상담 실장이 아닌 실제 교정을 집도할 담당 원장의 실명과 교정학 전문 학력·수련 이력을 초진 전 직접 확인하세요.',
      '단기 개폐업이나 지점 확장 위주 운영보다 10년·30년 이상 한 위치에서 지속 운영된 사업자 연속성을 대조하세요.',
      '초기 진단비·장치비·매월 조절 치료비·유지장치 포함 범위가 치료 전 서면으로 안내되는지 꼭 점검하세요.',
    ],
    chapters: [
      { time: '00:00', label: '교정 중 주치의 교체 문제', note: '평균 18~24개월 장기 치료에서 계획 연속성이 중요한 이유' },
      { time: '00:15', label: '기준 1~2 · 대표원장 직접 집도 & 업력', note: '서울대졸 · 교정학 박사 김준헌 병원장 33년 1:1 전담 원칙' },
      { time: '00:35', label: '기준 3~4 · 총액 서면 고지 & 유지관리', note: '장치·월비·유지장치 포함 범위와 완료 후 정기 리콜 체계' },
    ],
    qas: [
      {
        question: '치아교정 중간에 담당 의사가 바뀌면 어떤 불편이 생기나요?',
        answer: '처음 세운 발치·비발치 여부와 앞니 각도(토크) 목표, 미니스크류 고정원 계획에 대한 미세 해석이 의사마다 다를 수 있어 교정 기간이 길어지거나 마무리가 불안정해질 수 있습니다.',
      },
      {
        question: '화이트스타일치과의 교정은 정말 김준헌 병원장이 끝까지 직접 보시나요?',
        answer: '네. 1994년 개원 이래 33년간 한 자리에서 진료해 온 서울대졸·단국대 외래교수·치과교정학 박사 김준헌 병원장이 초진 진단부터 매월 조절, 유지장치 관리까지 주치의 변경 없이 1:1로 직접 책임집니다.',
      },
      {
        question: '성인 재교정이나 옥니가 생겼을 때도 교정학 박사와 치주과가 함께 보나요?',
        answer: '네. 성인 재교정은 치조골 두께와 잇몸 퇴축 여부가 중요하므로 김준헌 병원장과 보건복지부 인증 치주과 전문의 박선혜 원장이 3D CT를 함께 판독해 안전하게 계획합니다.',
      },
    ],
    reviewedByIds: ['kim', 'park'],
    relatedQaSlugs: [
      'adult-re-orthodontics-relapse-okni',
      'orthodontics-total-fee-checklist',
      'how-to-avoid-factory-dental-clinic-gangnam',
    ],
    relatedTreatmentUrl: '/treatments/orthodontics',
    relatedTreatmentLabel: '1:1 치아교정 시스템 보기',
  },
  {
    slug: 'mbc-newsdesk-whitestyle-feature-4k',
    youtubeId: 'PioB4UzBSLY',
    title: 'MBC 뉴스데스크 소개 화이트스타일치과 4K 아카이브 — 자연치아 보존 철학',
    originalYoutubeTitle: '[4K] MBC뉴스데스크에 소개된 화이트스타일치과 3840x2160',
    category: '임상 철학 · 방송 보도',
    uploadDate: '2024-06-01',
    durationIso: 'PT2M30S',
    summary:
      'MBC 뉴스데스크에 소개된 강남역 화이트스타일치과의원의 임상 철학과 환자 중심 진료 현장을 담은 4K 공식 영상 아카이브입니다. 1994년 개원 이후 33년간 이어 온 자연치아 보존 최우선 원칙과 정직한 상담 문화를 확인하실 수 있습니다.',
    keyTakeaways: [
      '불필요한 삭제나 과잉 발치를 피하고 자연치아 법랑질과 치주조직을 최대한 지키는 보존 중심 진료를 원칙으로 합니다.',
      '김준헌 병원장(교정학 박사)·이봉진 대표원장(임플란트·교합)·박선혜 원장(치주과 전문의) 3인 분과 협진 체계를 운영합니다.',
      '강남역 11·12번 출구 도보 1분(강남대로92길 17)에서 한국어·일본어 환자 모두 동일한 투명 기준으로 진료합니다.',
    ],
    chapters: [
      { time: '00:00', label: 'MBC 뉴스데스크 방송 소개', note: '치과 과잉 진료 논란 속 바른 진료 기준 조명' },
      { time: '00:50', label: '김준헌 병원장 임상 기준 인터뷰', note: '자연치아 보존과 무리하지 않는 정밀 진단 철학' },
      { time: '01:40', label: '장기 환자 신뢰 · 사후 관리 시스템', note: '33년 전통 기반 3·6·12개월 정기 리콜 안내' },
    ],
    qas: [
      {
        question: '안 해도 되는 치료는 권하지 않는다는 원칙은 실제로 어떻게 적용되나요?',
        answer: '예를 들어 재신경치료로 살릴 수 있는 치아는 발치·임플란트를 미루고 먼저 보존을 검토하며, 치아 크기·색이 건강한 앞니 틈새에는 치아를 깎는 라미네이트 대신 3~6개월 부분교정을 우선 제안합니다.',
      },
      {
        question: '언론보도와 수상 이력은 홈페이지 어디서 확인할 수 있나요?',
        answer: '상단 메뉴 또는 /press, /awards, /career, /clinic-facts 페이지에서 150여 편의 언론보도와 기획재정부 장관 표창·ISO 인증·NICE 기술평가 기록을 확인하실 수 있습니다.',
      },
      {
        question: '초진 예약 전 전화나 온라인으로 대략적인 진료 방향을 물어볼 수 있나요?',
        answer: '네. 대표전화 1577-7287 / 02-569-7528, 카카오톡 1:1 상담(whitestyle2), 일본어 통역 직통(+82-10-3046-5010 / LINE whitestyle1)으로 사전 상담이 가능합니다.',
      },
    ],
    reviewedByIds: ['kim', 'lee', 'park'],
    relatedQaSlugs: [
      'natural-tooth-saving-re-endo',
      'how-to-avoid-factory-dental-clinic-gangnam',
      'laminate-pulp-safety-minimal-prep',
    ],
    relatedTreatmentUrl: '/press',
    relatedTreatmentLabel: '언론보도 · 전문 칼럼 전체 보기',
  },
  {
    slug: 'mbc-news-uhd-clinical-trust-edit',
    youtubeId: 'ZVx0GOMp1a8',
    title: 'MBC 뉴스 화이트스타일치과 UHD 편집본 — 3인 원장단 협진과 환자 안전',
    originalYoutubeTitle: '[4K] [UHD] MBC 뉴스에 소개된 화이트스타일치과 편집편',
    category: '임상 철학 · 방송 보도',
    uploadDate: '2024-07-01',
    durationIso: 'PT2M',
    summary:
      'MBC 뉴스 보도 영상의 주요 임상 포인트를 4K UHD 화질로 압축 정리한 아카이브입니다. 교정·임플란트·치주 3인 원장단 협진 구조와 환자 전신 안전을 최우선으로 삼는 비수면 3단계 국소 무통마취 원칙을 함께 안내합니다.',
    keyTakeaways: [
      '치의학박사 김준헌 병원장·이봉진 대표원장·보건복지부 인증 치주과 전문의 박선혜 원장이 고난도 케이스를 협진합니다.',
      '전신 위험이 있는 수면마취를 배제하고 가글·도포·디지털 정압 3단계 국소 무통마취만 시행합니다.',
      '원내 자체 기공소 협업으로 맞춤형 커스텀 어버트먼트와 초박막 세라믹 정밀도를 직접 점검합니다.',
    ],
    chapters: [
      { time: '00:00', label: '강남역 33년 진료 현장', note: '1994년 개원 이래 유지해 온 정밀 진단 프로세스' },
      { time: '00:45', label: '3인 원장단 분과 협진', note: '임플란트 재수술·치주 재생·교정·심미보철 연계' },
      { time: '01:25', label: '안전 및 사후 보증 기준', note: '정품 재료 인증 및 3·6·12개월 치주 리콜 프로그램' },
    ],
    qas: [
      {
        question: '임플란트·교정·라미네이트를 모두 한 곳에서 협진받으면 무엇이 좋은가요?',
        answer: '임플란트 식립 공간이 부족해 옆 치아를 살짝 세워야 하거나, 라미네이트 전에 잇몸 라인과 배열을 미세 조정해야 할 때 다른 병원으로 옮기지 않고 한 차트 안에서 3인 원장단이 동시에 설계할 수 있습니다.',
      },
      {
        question: '통증이 걱정되어 수면마취를 찾는 분은 어떻게 도와주시나요?',
        answer: '본원은 호흡 억제나 의식 저하 위험을 막기 위해 수면마취는 일절 시행하지 않지만, 3단계 통증 완화 국소마취 시스템으로 주사 바늘 통증과 압력 자극을 크게 낮춰 드립니다.',
      },
      {
        question: '보철물 제작과 수정은 외부 기공소에 보내지 않나요?',
        answer: '원내 자체 기공소와 직접 소통하므로 세라믹 색조·형태 미세 수정과 커스텀 지대주 조율을 외주 왕복 지연 없이 신속히 진행합니다.',
      },
    ],
    reviewedByIds: ['kim', 'lee', 'park'],
    relatedQaSlugs: [
      'implant-pain-swelling-non-sedation',
      'implant-reoperation-peri-implantitis',
      'custom-abutment-vs-stock-abutment',
    ],
    relatedTreatmentUrl: '/warranty',
    relatedTreatmentLabel: '정품 보증 · 자체 기공소 안내',
  },
  {
    slug: 'mbc-newsdesk-broadcast-overview',
    youtubeId: 'OpqtCwYrqOc',
    title: 'MBC 뉴스데스크 방영 화이트스타일치과 소개 영상 — 한·일 환자 신뢰의 이유',
    originalYoutubeTitle: 'MBC뉴스데스크에 소개된 화이트스타일치과',
    category: '3인 협진 · 병원 소개',
    uploadDate: '2024-05-01',
    durationIso: 'PT2M',
    summary:
      'MBC 뉴스데스크 방영 당시의 화이트스타일치과 소개 영상입니다. 한국 환자뿐 아니라 일본인 예약 환자(코네스트 125건 이상 리뷰, 전담 통역 스태프 3명 상주)가 믿고 찾는 이유와 한결같은 진료 기준을 함께 정리했습니다.',
    keyTakeaways: [
      '한국어 진료와 일본어 전담 통역 3명(+82-10-3046-5010 / LINE whitestyle1)이 분리된 전담 체계로 운영됩니다.',
      '단기 방한 환자를 위한 1DAY 미백(60분), 2~3회 집중 라미네이트, 인비절라인 원격 경과 관리 일정을 지원합니다.',
      '건강보험심사평가원(HIRA) 비급여 기준 준수 및 제증명·진료비 안내를 내·외국인 동일하게 투명 공개합니다.',
    ],
    chapters: [
      { time: '00:00', label: '뉴스데스크 방영 클립 시작', note: '강남역 화이트스타일치과의원 소개' },
      { time: '00:40', label: '환자 맞춤 정밀 진단', note: '3D CT · Quick-Ceph 기반 치료 전 설명 문화' },
      { time: '01:20', label: '한국·일본 환자 사후 케어', note: '귀국 후 LINE 팔로업 및 국내 3·6·12개월 정기 리콜' },
    ],
    qas: [
      {
        question: '일본인 환자의 경우 상담과 진료 중 의사소통에 불편은 없나요?',
        answer: '이현호 실장을 포함한 일본어 전담 의료 통역 코디네이터 3명이 상시 상주하며 접수, 3D CT 설명, 원장 진료, 귀국 후 LINE 경과 안내까지 전담 지원합니다.',
      },
      {
        question: '해외 거주자나 지방 거주자도 내원 일정을 미리 맞출 수 있나요?',
        answer: '네. 방한 전 카카오톡(whitestyle2)이나 LINE(whitestyle1), 일본어 직통(+82-10-3046-5010)으로 희망 일정을 알려주시면 체류 기간에 맞는 안전한 1~3회 또는 단계별 일정을 사전에 조율해 드립니다.',
      },
      {
        question: '병원 위치와 토요일 진료 시간은 어떻게 되나요?',
        answer: '강남역 11번·12번 출구 도보 1분(강남대로92길 17 대승빌딩 B1·1·2층)이며, 월·화·수·금 10:00~19:00, 토요일 10:00~14:00(점심시간 없이 연속 진료, 목·일·공휴일 휴진) 운영합니다.',
      },
    ],
    reviewedByIds: ['kim', 'lee', 'park'],
    relatedQaSlugs: [
      'gangnam-ortho-implant-visit-schedule-short-stay',
      'gangnam-dental-implant-price-comparison',
      'periodontist-implant-recall-3-6-12',
    ],
    relatedTreatmentUrl: '/ja',
    relatedTreatmentLabel: '일본어 전용 안내 · 방한 일정 보기',
  },
];

export const CELEBRITY_VISIT_VIDEOS: ClinicVisitVideo[] = [
  { youtubeId: 'JKqwv9r-C6U', title: '화이트스타일치과 내원 개그맨 김기욱님 4K', guestLabel: '김기욱님' },
  { youtubeId: 'LGRXCbqzSC0', title: '화이트스타일치과 내원 개그맨 문세윤·최승태님 4K', guestLabel: '문세윤·최승태님' },
  { youtubeId: '7Q4pyH4cI_0', title: '화이트스타일치과 내원 개그맨 양세형님 4K', guestLabel: '양세형님' },
  { youtubeId: 'S4fPM285FKI', title: '화이트스타일치과 내원 배우 현우성님 4K', guestLabel: '현우성님' },
  { youtubeId: 'fmso23Df2h8', title: '화이트스타일치과 내원 개그맨 이종규님 4K', guestLabel: '이종규님' },
  { youtubeId: '9P1V5zqVmEY', title: '화이트스타일치과 내원 엠제이레드 장민주님 4K', guestLabel: '장민주님' },
  { youtubeId: 'AsaT2k9DDQY', title: '화이트스타일치과 내원 배우 최다은님 4K', guestLabel: '최다은님' },
  { youtubeId: 'h4OX0UiqOXI', title: '화이트스타일치과 내원 개그맨 조두석님 4K', guestLabel: '조두석님' },
  { youtubeId: 'NKvNuGxcehA', title: '화이트스타일치과 내원 방송인 최동균(짜잔형)님 4K', guestLabel: '최동균님' },
  { youtubeId: 'KLUC_fhIq_M', title: '화이트스타일치과 내원 모델 임지혜님 4K', guestLabel: '임지혜님' },
  { youtubeId: '6yurqAjX-Tk', title: '화이트스타일치과 내원 미스 아시아태평양 슈퍼모델', guestLabel: '미스 아시아태평양' },
];

export function getClinicalVideoBySlug(slug: string): ClinicalVideoArticle | undefined {
  return CLINICAL_VIDEO_ARTICLES.find((item) => item.slug === slug);
}
