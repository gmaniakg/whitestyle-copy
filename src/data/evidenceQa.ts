export interface QaCitation {
  title: string;
  source: string;
  url: string;
  pmid?: string;
}

export interface QaCriteriaRow {
  label: string;
  detail: string;
  clinicalCheck: string;
}

export interface QaFollowup {
  question: string;
  answer: string;
}

export interface EvidenceQaItem {
  slug: string;
  category: '임플란트·재수술' | '라미네이트·심미보철' | '치아교정·재교정' | '잇몸·보존·수가';
  question: string;
  shortAnswer: string;
  summaryPoints: string[];
  criteriaTable: QaCriteriaRow[];
  whenNotNeededOrCaution: string;
  faqFollowups: QaFollowup[];
  citations: QaCitation[];
  reviewedByIds: ('kim' | 'lee' | 'park')[];
  lastReviewed: string;
  relatedTreatmentUrl: string;
  relatedTreatmentLabel: string;
  relatedGlossaryIds: string[];
}

export const DOCTOR_DIRECTORY = {
  kim: {
    id: 'https://whitestyle.com/#doctor-kim-junheon',
    name: '김준헌 병원장',
    jobTitle: '서울대졸 · 단국대 외래교수 · 치과교정학 박사',
  },
  lee: {
    id: 'https://whitestyle.com/#doctor-lee-bongjin',
    name: '이봉진 대표원장',
    jobTitle: '연세대 치과대학 졸업 · 3D CT 임플란트·교합 보철 전담',
  },
  park: {
    id: 'https://whitestyle.com/#doctor-park-seonhye',
    name: '박선혜 원장',
    jobTitle: '보건복지부 인증 치주과 전문의 · 대한치과보철학회 우수보철치과의사',
  },
} as const;

const CIT_BERGLUNDH_2018: QaCitation = {
  title: 'Peri-implant diseases and conditions: Consensus report of workgroup 4 of the 2017 World Workshop (J Clin Periodontol, 2018)',
  source: 'PubMed PMID 29926955',
  url: 'https://pubmed.ncbi.nlm.nih.gov/29926955/',
  pmid: '29926955',
};

const CIT_JUNG_2012: QaCitation = {
  title: 'Systematic review of the survival rate and the incidence of biological, technical, and aesthetic complications of single crowns on implants (Clin Oral Implants Res, 2012)',
  source: 'PubMed PMID 23062124',
  url: 'https://pubmed.ncbi.nlm.nih.gov/23062124/',
  pmid: '23062124',
};

const CIT_MORIMOTO_2016: QaCitation = {
  title: 'Main Clinical Outcomes of Feldspathic Porcelain and Glass-Ceramic Laminate Veneers: A Systematic Review and Meta-Analysis (Int J Prosthodont, 2016)',
  source: 'PubMed PMID 26757327',
  url: 'https://pubmed.ncbi.nlm.nih.gov/26757327/',
  pmid: '26757327',
};

const CIT_HAMMERLE_2002: QaCitation = {
  title: 'A systematic review of the survival of implants in bone sites augmented with barrier membranes (guided bone regeneration) (J Clin Periodontol, 2002)',
  source: 'PubMed PMID 12787222',
  url: 'https://pubmed.ncbi.nlm.nih.gov/12787222/',
  pmid: '12787222',
};

const CIT_NG_2008: QaCitation = {
  title: 'Outcome of secondary root canal treatment: a systematic review of the literature (Int Endod J, 2008)',
  source: 'PubMed PMID 19133093',
  url: 'https://pubmed.ncbi.nlm.nih.gov/19133093/',
  pmid: '19133093',
};

const CIT_TORABINEJAD_2009: QaCitation = {
  title: 'Outcomes of nonsurgical retreatment and endodontic surgery: a systematic review (J Endod, 2009)',
  source: 'PubMed PMID 19567310',
  url: 'https://pubmed.ncbi.nlm.nih.gov/19567310/',
  pmid: '19567310',
};

const CIT_HIRA: QaCitation = {
  title: '건강보험심사평가원 비급여 진료비용 공개 포털 및 급여 기준',
  source: '건강보험심사평가원 (HIRA)',
  url: 'https://www.hira.or.kr',
};

const CIT_NHIS: QaCitation = {
  title: '국민건강보험공단 만 65세 이상 치과임플란트 · 연 1회 스케일링 급여 안내',
  source: '국민건강보험공단 (NHIS)',
  url: 'https://www.nhis.or.kr',
};

const CIT_KAO: QaCitation = {
  title: '대한치과교정학회 치아교정 치료 및 유지관리 가이드라인',
  source: '대한치과교정학회 (KAO)',
  url: 'https://www.kao.or.kr',
};

const CIT_KPERIO: QaCitation = {
  title: '대한치주과학회 치주질환 · 임플란트 주위염 예방 가이드',
  source: '대한치주과학회 (KAP)',
  url: 'https://www.kperio.org',
};

export const EVIDENCE_QA_LIST: EvidenceQaItem[] = [
  {
    slug: 'implant-reoperation-peri-implantitis',
    category: '임플란트·재수술',
    question: '타 병원 임플란트가 흔들리거나 잇몸뼈가 녹았을 때 재수술은 어떻게 진행되나요?',
    shortAnswer:
      '임플란트 주위염이나 골 소실로 흔들리는 경우에도 3D CT로 잔존 골폭과 신경관 거리를 먼저 확인하면 재수술이 가능합니다. 강남역 화이트스타일치과는 치주과 전문의 박선혜 원장이 염증 조직 정화와 동종골 뼈이식을 먼저 안정화한 뒤 이봉진 대표원장·김준헌 병원장 3인 협진으로 재식립과 교합 분산을 진행합니다.',
    summaryPoints: [
      '단순 나사 풀림이나 초기 점막염(출혈 위주)은 픽스처를 뽑지 않고 소독·교합 조정만으로 회복을 시도합니다.',
      '진행성 골 흡수와 흔들림이 동반된 임플란트 주위염은 기존 픽스처 제거 후 3~6개월 골 재생 안정화를 거쳐 재식립합니다.',
      '재수술 성공률의 핵심은 맞춤형 커스텀 어버트먼트 설계와 3·6·12개월 치주과 전문의 정기 리콜입니다.',
    ],
    criteriaTable: [
      {
        label: '1단계 원인 감별',
        detail: '보철 나사 풀림 vs 교합 과부하 vs 임플란트 주위염(골 흡수)',
        clinicalCheck: '3D CT 골 결손 형태 계측 및 탐침 시 출혈·배농 확인',
      },
      {
        label: '2단계 염증 정화 · 골 재생',
        detail: '감염 육아조직 완전 제거 및 동종골·자가골 GBR / 상악동거상술',
        clinicalCheck: '치주과 전문의 박선혜 원장 협진, 골질에 따라 3~6개월 안정화',
      },
      {
        label: '3단계 재식립 · 교합 분산',
        detail: '초기 고정력 확보 후 맞춤형 지대주 및 CAD/CAM 지르코니아 보철',
        clinicalCheck: '이봉진 대표원장·김준헌 병원장 교합 간섭 제거 및 3·6·12개월 리콜',
      },
    ],
    whenNotNeededOrCaution:
      '잇몸 출혈만 있고 잇몸뼈 흡수나 픽스처 흔들림이 없는 초기 주위 점막염 단계라면, 무조건 임플란트를 발거하고 재수술하지 않아도 됩니다. 스케일링·레이저/기계적 세정과 구강 위생 관리만으로도 호전될 수 있으니 먼저 3D CT와 치주 탐침 검사로 보존 가능 여부부터 확인하세요.',
    faqFollowups: [
      {
        question: '임플란트 재수술 시 이전 임플란트를 당일 바로 다시 심을 수 있나요?',
        answer: '염증이 경미하고 잔존 치조골이 충분한 일부 경우에만 발거 당일 재식립이 가능하며, 골 소실이 큰 경우에는 염증 제거와 뼈이식 후 3~6개월 안정화를 거친 뒤 재식립하는 것이 장기 생존율 면에서 안전합니다.',
      },
      {
        question: '국제 학술지 기준에서 임플란트 10년 생존율과 주위염 관리 중요성은 어느 정도인가요?',
        answer: '체계적 문헌고찰(Jung et al., 2012) 기준 단일 임플란트 10년 생존율은 95.2%로 높지만, 생물학적·기계적 합병증(나사 풀림, 연조직 염증, 골 흡수) 예방을 위해 정기적인 치주 리콜과 교합 점검이 필수적입니다.',
      },
      {
        question: '수면마취 없이도 임플란트 재수술 통증을 견딜 수 있나요?',
        answer: '화이트스타일치과는 호흡 억제 위험을 막기 위해 수면마취를 시행하지 않고, 가글 마취 → 도포 마취 → 디지털 정압 무통 마취기의 3단계 국소 마취 시스템을 적용해 의식이 유지된 상태에서 편안히 시술받으실 수 있습니다.',
      },
    ],
    citations: [CIT_BERGLUNDH_2018, CIT_JUNG_2012, CIT_KPERIO],
    reviewedByIds: ['park', 'lee', 'kim'],
    lastReviewed: '2026-11-20',
    relatedTreatmentUrl: '/treatments/implant/bone-graft',
    relatedTreatmentLabel: '임플란트 재수술 · 뼈이식 안내 보기',
    relatedGlossaryIds: ['peri-implantitis', 'implant-reoperation', 'gbr-bone-graft'],
  },
  {
    slug: 'bone-graft-gbr-sinus-lift-guide',
    category: '임플란트·재수술',
    question: '잇몸뼈가 부족할 때 GBR 뼈이식과 상악동거상술은 언제 필요하고 기간은 얼마나 걸리나요?',
    shortAnswer:
      '치아가 빠진 지 오래되었거나 치주염으로 치조골 폭·높이가 줄어든 경우 임플란트 고정을 위해 골유도재생술(GBR)이나 상악동거상술이 필요합니다. 골 결손 범위에 따라 임플란트와 동시 식립이 가능하기도 하며, 광범위한 골 결손 시 3~6개월 골 형성 기간이 추가됩니다.',
    summaryPoints: [
      '잔존 치조골 높이가 4~5mm 미만인 위턱 어금니 부위는 상악동 점막을 들어 올리는 상악동거상술이 자주 검토됩니다.',
      '문헌고찰(Hämmerle et al., 2002)에 따르면 차폐막을 활용한 GBR 부위 임플란트도 적절한 적응증과 치유 기간 준수 시 비이식 부위와 유사한 생존율을 보입니다.',
      '박선혜 원장(치주과 전문의)과 이봉진 대표원장의 3D CT 협진으로 불필요한 과잉 뼈이식을 피합니다.',
    ],
    criteriaTable: [
      {
        label: '소량 열개·열창 결손',
        detail: '임플란트 나사선 일부 노출 수준 (잔존 골 충분)',
        clinicalCheck: '임플란트 식립과 동시에 GBR 진행 가능 (추가 내원 최소화)',
      },
      {
        label: '위턱 어금니 높이 부족',
        detail: '상악동 하방 잔존 골 4mm 전후 이하',
        clinicalCheck: '3D CT 상악동 중격·점막 확인 후 치조정 또는 측방 상악동거상술',
      },
      {
        label: '중증 골 소실 · 재수술',
        detail: '수직·수평 골 폭이 현저히 얇거나 염증 결손 동반',
        clinicalCheck: '단계적 뼈이식 후 4~6개월 골 성숙 확인 뒤 2차 식립',
      },
    ],
    whenNotNeededOrCaution:
      '잔존 잇몸뼈 두께와 높이가 임플란트 픽스처를 감싸기에 충분한 경우라면 일률적으로 뼈이식을 추가하지 않습니다. 3D CT 단면 영상을 함께 보며 뼈이식이 왜, 어느 부위에 필요한지 먼저 확인하세요.',
    faqFollowups: [
      {
        question: '뼈이식 임플란트를 하면 추가 비용이 무조건 많이 나오나요?',
        answer: '뼈이식 범위(단순 치조골 보강 vs 광범위 GBR·상악동거상술)에 따라 다르며, 화이트스타일치과는 3D CT 판독 후 픽스처·지대주·상부 크라운과 뼈이식 여부를 구분해 사전 서면 견적을 안내합니다.',
      },
      {
        question: '상악동거상술 후 주의사항(코 풀기 등)은 무엇인가요?',
        answer: '수술 후 약 2주간은 코를 세게 풀거나 빨대 사용, 심한 압력이 가해지는 운동·사우나를 피해야 상악동 점막과 이식재가 안정적으로 자리 잡습니다.',
      },
      {
        question: '고혈압·당뇨가 있는 고령자도 뼈이식 임플란트가 가능한가요?',
        answer: '조절되는 혈압·당뇨와 복용 약물(아스피린, 골다공증 약 등) 사전 확인을 거치면 3단계 무통 국소마취 하에 안전하게 진행할 수 있습니다.',
      },
    ],
    citations: [CIT_HAMMERLE_2002, CIT_JUNG_2012, CIT_KPERIO],
    reviewedByIds: ['park', 'lee'],
    lastReviewed: '2026-11-20',
    relatedTreatmentUrl: '/treatments/implant/bone-graft',
    relatedTreatmentLabel: '고난도 뼈이식 임플란트 자세히 보기',
    relatedGlossaryIds: ['gbr-bone-graft', 'sinus-lift', 'quick-ceph-3dct'],
  },
  {
    slug: 'edentulous-full-arch-implant-guide',
    category: '임플란트·재수술',
    question: '치아가 하나도 없는 무치악 전체임플란트는 몇 개를 심어야 하며 교합은 어떻게 맞추나요?',
    shortAnswer:
      '상·하악 무치악 전체임플란트는 치아가 있던 자리에 무조건 14개씩 모두 심는 것이 아니라, 3D CT 골량·교합력 분포를 계산해 한 악당 보통 6~8개 내외(상태에 따라 최소 필수 개수)를 전략적으로 식립하고 CAD/CAM 연결 보철로 회복합니다.',
    summaryPoints: [
      '과잉 식립 대신 골질이 단단한 위치에 역학적 간격을 맞춰 식립해 비용·수술 부담을 합리화합니다.',
      '전체임플란트는 수직 교합 고경(얼굴 아래턱 비율)이 무너져 있기 쉬워 교정학 박사 김준헌 병원장·이봉진 대표원장·치주과 전문의 박선혜 원장 3인 협진이 중요합니다.',
      '수면마취 없이도 3단계 통증 완화 국소마취로 고령 환자 전신 부담을 줄입니다.',
    ],
    criteriaTable: [
      {
        label: '고정성 전체임플란트',
        detail: '편측 6~8개 내외 픽스처 + 맞춤형 지대주 + 지르코니아 연결 보철',
        clinicalCheck: '자연치아와 유사한 저작력 및 이물감 최소화',
      },
      {
        label: '임플란트 틀니 (오버덴처)',
        detail: '2~4개 임플란트 고정장치 + 탈착식 틀니 결합',
        clinicalCheck: '골 소실이 극심하거나 수술 범위 축소가 필요한 고령자 대안',
      },
      {
        label: '만 65세 건보 병행 여부',
        detail: '잔존 치아가 1개 이상 있는 부분 무치악 시 평생 2개 건보 30% 적용',
        clinicalCheck: '완전 무치악은 보험 틀니 대상이므로 원내 전산 조회로 최적 조합 설계',
      },
    ],
    whenNotNeededOrCaution:
      '치아가 완전히 빠지지 않고 몇 개라도 건강하게 남아 있다면 성급히 모두 발치해 전체임플란트로 진행하기보다, 치주과 전문의 협진으로 살릴 수 있는 자연치아(특히 송곳니·작은어금니 지대치)를 먼저 보존하는 편이 고유 감각과 비용 면에서 유리합니다.',
    faqFollowups: [
      {
        question: '부모님 전체임플란트 기간과 내원 횟수는 어느 정도인가요?',
        answer: '발치 및 골이식 여부에 따라 평균 3~6개월가량 소요되며, 임시 보철을 활용해 일상생활과 대인관계 불편을 줄여 드립니다.',
      },
      {
        question: '전체임플란트 후에도 사후 관리가 계속 필요한가요?',
        answer: '다수의 연결 보철물은 치간 칫솔·워터픽 관리와 함께 3·6·12개월 정기 리콜에서 교합 나사와 잇몸 상태를 점검해야 10~20년 이상 오래 쓰실 수 있습니다.',
      },
      {
        question: '잇몸뼈가 거의 없는 고령 부모님도 고정성 전체임플란트가 가능한가요?',
        answer: '3D CT 정밀 분석 결과 상악동이나 하치조신경 근접으로 고정성 전악이 어려운 경우 2~4개 임플란트 지지 틀니(오버덴처)로 안전하게 저작력을 회복하는 방법도 비교 안내합니다.',
      },
    ],
    citations: [CIT_JUNG_2012, CIT_NHIS, CIT_KPERIO],
    reviewedByIds: ['lee', 'park', 'kim'],
    lastReviewed: '2026-11-20',
    relatedTreatmentUrl: '/treatments/implant/edentulous',
    relatedTreatmentLabel: '무치악 전체임플란트 안내 보기',
    relatedGlossaryIds: ['edentulous-full-arch', 'custom-abutment', 'nhis-65-implant'],
  },
  {
    slug: 'age65-nhis-implant-30-percent',
    category: '임플란트·재수술',
    question: '만 65세 이상 건강보험 임플란트 본인부담률 30% 혜택 조건과 비급여 비교 기준은 무엇인가요?',
    shortAnswer:
      '만 65세 이상 건강보험 가입자는 평생 2개까지(위·아래 앞니·어금니 구분 없음) 치아 1개당 본인부담률 30%로 임플란트 시술이 가능합니다. 단, 치아가 하나도 없는 완전 무치악이 아닌 부분 무치악 환자여야 적용되며, 화이트스타일치과는 공단 방문 없이 원내 전산 등록을 지원합니다.',
    summaryPoints: [
      '적용 개수: 평생 2개(과거 보험 임플란트 사용 이력이 없다면 2개 모두 혜택).',
      '보철 재료: 건강보험 적용 임플란트 보철은 PFM 크라운 기준이 적용됩니다.',
      '비급여 추가 임플란트는 심평원 고지 수가(PFM 100~120만 / 지르코니아 120만 / 골드 120~145만)와 동일 기준으로 투명하게 구분 안내합니다.',
    ],
    criteriaTable: [
      {
        label: '연령 · 대상 자격',
        detail: '만 65세 이상 건강보험 가입자(피부양자 포함), 부분 무치악 상태',
        clinicalCheck: '신분증 지참 시 원내 국민건강보험공단 전산 등록 즉시 확인',
      },
      {
        label: '본인부담률 · 개수',
        detail: '평생 2개 · 요양급여 비용의 30% (의료급여·차상위 경감 별도 기준)',
        clinicalCheck: '완전 무치악은 보험 임플란트 제외(보험 틀니 적용 검토)',
      },
      {
        label: '뼈이식 병행 여부',
        detail: '골이식재 비용 등 일부 비급여 항목 발생 가능',
        clinicalCheck: '3D CT 판독 후 보험 적용분과 비급여 뼈이식 여부 사전 서면 분리',
      },
    ],
    whenNotNeededOrCaution:
      '치아가 완전히 하나도 없는 완전 무치악 상태에서는 건강보험 임플란트(2개)가 적용되지 않으며, 기존 치아를 급하게 뽑아 수량을 늘리기보다 살릴 수 있는 치아를 보존해 부분 무치악 기준을 지키는 것이 바람직합니다.',
    faqFollowups: [
      {
        question: '건강보험 임플란트 진행 중 치과를 옮길 수 있나요?',
        answer: '원칙적으로 수술·보철 진행 단계 도중 병원 변경은 제한되므로, 처음부터 33년간 한 자리에서 진료하며 치주과 전문의 사후관리까지 이어지는 치과를 신중히 선택하셔야 합니다.',
      },
      {
        question: '2개 보험 임플란트 외에 나머지 치아는 비급여로 진행해야 하나요?',
        answer: '네. 평생 2개 초과분은 심평원 비급여 고지 기준에 따라 픽스처와 보철 재료(PFM·지르코니아·골드)를 선택해 진행하며 사전 견적을 명확히 안내합니다.',
      },
      {
        question: '건강보험 임플란트도 만 65세 이상이면 지르코니아로 받을 수 있나요?',
        answer: '현행 건강보험 임플란트 표준 보철은 PFM(금속 도재관) 기준이며, 지르코니아 등 비급여 재료 선택 시에는 비급여 안내 기준이 적용됩니다.',
      },
    ],
    citations: [CIT_NHIS, CIT_HIRA],
    reviewedByIds: ['lee', 'park'],
    lastReviewed: '2026-11-20',
    relatedTreatmentUrl: '/treatments/implant/insurance',
    relatedTreatmentLabel: '만 65세 건강보험 임플란트 안내 보기',
    relatedGlossaryIds: ['nhis-65-implant', 'hira-non-covered'],
  },
  {
    slug: 'implant-pain-swelling-non-sedation',
    category: '임플란트·재수술',
    question: '어금니 임플란트 수술 시 통증과 붓기는 며칠이나 가며 수면마취 없이도 안전한가요?',
    shortAnswer:
      '어금니 임플란트는 3단계 무통 국소마취 시스템(가글 → 표면 도포 → 디지털 정압 무통 마취기)을 적용해 시술 중 통증 부담을 크게 낮추며, 수술 후 붓기는 대부분 2~3일(48~72시간) 내 가라앉습니다. 화이트스타일치과는 호흡 억제 등 전신 위험 예방을 위해 수면마취는 시행하지 않습니다.',
    summaryPoints: [
      '수술 중: 3단계 국소 무통 마취로 주사 자입 통증과 압력 통증을 완화합니다.',
      '수술 후 48시간 냉찜질 → 3일차 이후 온찜질 관리로 붓기와 멍을 빠르게 진정시킵니다.',
      '수면진정제(프로포폴·미다졸람 등) 투여에 따른 기도·혈압 위험을 배제해 고령자·기저질환자도 안심할 수 있습니다.',
    ],
    criteriaTable: [
      {
        label: '1단계 마취 · 시술 중',
        detail: '가글형 마취 + 잇몸 표면 도포 마취 + 체온·정압 디지털 무통 마취',
        clinicalCheck: '의식을 완전히 유지하며 의사소통 가능한 상태 확인',
      },
      {
        label: '수술 당일 ~ 48시간',
        detail: '마취가 2~5시간 뒤 풀리며 경미한 욱신거림·부기 발생 가능',
        clinicalCheck: '처방약 정시 복용, 냉찜질, 당일 반대편 미지근한 유동식 섭취',
      },
      {
        label: '수술 후 3일 ~ 실밥 제거',
        detail: '대부분의 붓기 완화 및 일상 업무·식사 복귀',
        clinicalCheck: '발치/식립 후 7~10일경 소독 및 실밥 제거 확인',
      },
    ],
    whenNotNeededOrCaution:
      '수술 후 4~5일이 지났는데도 붓기와 열감·심한 박동성 통증이 오히려 악화되거나 감각 둔화가 지속된다면 정상 회복 경과가 아닐 수 있으므로 즉시 내원해 점검받아야 합니다.',
    faqFollowups: [
      {
        question: '치과 공포증이 심한데 수면마취 없이 어떻게 긴장을 줄이나요?',
        answer: '내원 시 사전에 통증 민감도를 알려주시면 가글·도포 마취 대기 시간을 충분히 갖고 디지털 무통 마취기 저속 모드로 진행하며, 원장님과 손을 들어 즉시 멈출 수 있는 신호를 맞춰 안심하고 진행합니다.',
      },
      {
        question: '임플란트 수술 후 양치질과 음주·흡연은 언제부터 가능한가요?',
        answer: '수술 부위를 제외한 다른 치아는 당일부터 부드럽게 양치하며 수술 부위는 처방된 가글액으로 관리합니다. 음주와 흡연은 혈관 수축과 감염 위험 때문에 최소 2~4주간 중단해야 합니다.',
      },
      {
        question: '어금니 임플란트 후 반대편으로 씹다가 식립 부위가 닿아도 되나요?',
        answer: '초기 골유착이 진행되는 첫 수 주 동안은 식립 부위로 단단한 음식을 직접 씹지 않는 것이 중요합니다.',
      },
    ],
    citations: [CIT_JUNG_2012, CIT_BERGLUNDH_2018],
    reviewedByIds: ['lee', 'park'],
    lastReviewed: '2026-11-20',
    relatedTreatmentUrl: '/treatments/implant',
    relatedTreatmentLabel: '3단계 무통 국소마취 임플란트 보기',
    relatedGlossaryIds: ['three-step-local-anesthesia', 'non-sedation-safety'],
  },
  {
    slug: 'laminate-pulp-safety-minimal-prep',
    category: '라미네이트·심미보철',
    question: '라미네이트 시 치아 시림이나 신경손상을 막기 위한 최소삭제 · 법랑질 보존 기준은 무엇인가요?',
    shortAnswer:
      '라미네이트 후 시림과 치수염(신경 손상)을 막으려면 치아 겉면 법랑질(에나멜) 내부에 접착 경계를 머물게 하는 최소삭제(무삭제 또는 0.1~0.2mm) 원칙과 삭제 시 충분한 주수 냉각·간헐 절삭으로 마찰열을 관리하는 것이 핵심입니다.',
    summaryPoints: [
      '법랑질 내부에 접착할수록 본딩 강도가 높고 상아세관 노출이 없어 시림 위험이 현저히 낮습니다.',
      '고속 핸드피스 삭제 시 충분한 물 분사 냉각과 가벼운 터치(간헐 절삭)를 지키지 않으면 마찰열이 치수 신경을 자극할 수 있습니다.',
      '메타분석(Morimoto et al., 2016) 기준 글래스 세라믹 라미네이트의 중앙 추적 9년 누적 생존율은 94% 수준으로 보고됩니다.',
    ],
    criteriaTable: [
      {
        label: '삭제 깊이 기준',
        detail: '무삭제(0mm) 또는 법랑질 내 0.1~0.2mm 최소 정돈',
        clinicalCheck: '상아질 노출 억제 → 시림·변색·탈락 위험 최소화',
      },
      {
        label: '마찰열 관리 기준',
        detail: '충분한 주수 냉각 + 미세 입자 버 + 간헐 절삭 프로토콜',
        clinicalCheck: '절삭열 상승에 의한 치수염(신경 자극) 원천 예방',
      },
      {
        label: '시술 후 경고 증상',
        detail: '1~2주 이내 일시적 민감성은 안정화되나 자발통·야간통은 재검 필요',
        clinicalCheck: '찬물 시림 지속·교합 시 찌릿함 발생 시 즉각 교합·치수 검사',
      },
    ],
    whenNotNeededOrCaution:
      '앞니 돌출이나 심한 덧니가 있는 상태에서 치아를 이동시키지 않고 라미네이트만으로 일자 배열을 맞추려 하면 결국 과도한 치아 삭제가 불가피해집니다. 이런 경우에는 라미네이트를 바로 진행하지 말고 3~6개월 단기간 부분교정을 먼저 시행해야 자연치아 신경을 지킬 수 있습니다.',
    faqFollowups: [
      {
        question: '라미네이트 시술 후 1~2주간 살짝 시린 증상은 정상인가요?',
        answer: '접착 과정과 일시적 건조로 수일~1주 정도 가벼운 시림이 느껴질 수 있으나 점차 가라앉습니다. 반면 가만히 있어도 욱신거리는 자발통이나 밤에 심해지는 야간통은 즉시 치과에서 확인해야 합니다.',
      },
      {
        question: '세라믹 라미네이트의 학술적 수명과 가장 흔한 합병증은 무엇인가요?',
        answer: 'Morimoto 등(2016)의 체계적 문헌고찰에서 세라믹 라미네이트 전체 누적 생존율은 9년 기준 89%(글래스 세라믹 94%)이며, 가장 흔한 합병증은 파절/칩핑(약 4%)과 탈락(약 2%)입니다. 이갈이·단단한 음식 습관 교정과 야간 보호장치(스플린트)로 수명을 늘릴 수 있습니다.',
      },
      {
        question: '라미네이트 색상이 10년 뒤에도 변색되지 않나요?',
        answer: '도재 세라믹 자체는 거의 변색되지 않으나, 치아와 보철 경계면 접착 레진이 미세하게 변색(약 2%)되거나 잇몸이 내려앉아 경계가 보일 수 있으므로 정기 스케일링·연마 관리가 중요합니다.',
      },
    ],
    citations: [CIT_MORIMOTO_2016, CIT_KPERIO],
    reviewedByIds: ['park', 'lee', 'kim'],
    lastReviewed: '2026-11-20',
    relatedTreatmentUrl: '/treatments/aesthetic/zeroshell',
    relatedTreatmentLabel: '무삭제 제로쉘 · 최소삭제 심미보철 보기',
    relatedGlossaryIds: ['enamel-preservation', 'minimal-prep-laminate', 'zeroshell-no-prep'],
  },
  {
    slug: 'no-prep-vs-minimal-prep-laminate',
    category: '라미네이트·심미보철',
    question: '무삭제 라미네이트(제로쉘)와 0.1~0.2mm 최소삭제 라미네이트 중 내 치아에는 어떤 방식이 맞나요?',
    shortAnswer:
      '치아 크기가 작은 왜소치나 미세한 앞니 틈새는 치아를 깎지 않는 무삭제 제로쉘이 유리하지만, 치아가 이미 앞으로 뻗어 있거나 겹친 경우에 무삭제를 고집하면 치아가 두껍고 뚱뚱해 보일 수 있어 0.1~0.2mm 최소 정돈 또는 단기간 부분교정 선행이 적합합니다.',
    summaryPoints: [
      '무조건 "무삭제"만 강조하기보다 치아 돌출도와 입술 라인, 교합 공간을 3D 구강스캔으로 먼저 분석해야 합니다.',
      '무삭제 제로쉘은 법랑질 손상이 전혀 없고, 최소삭제 이지화이트는 0.1~0.2mm 미세 보정으로 잇몸선 위생을 매끄럽게 맞춥니다.',
      '원내 자체 기공소 연계로 시적 시 두께감과 투명도를 즉시 확인·조정할 수 있습니다.',
    ],
    criteriaTable: [
      {
        label: '무삭제 제로쉘 적합 케이스',
        detail: '왜소치(작은 치아), 앞니 사이 틈, 안으로 살짝 들어간 치열',
        clinicalCheck: '삭제량 0mm, 마취 부담 없이 초박형 세라믹 정밀 접착',
      },
      {
        label: '0.1~0.2mm 최소삭제 적합 케이스',
        detail: '경미한 치아 회전, 표면 불규칙·마모, 기존 보철 경계 정리',
        clinicalCheck: '과도한 두께감(과풍융) 방지 및 잇몸 염증 없는 자연 경계 형성',
      },
      {
        label: '부분교정 선행 권고 케이스',
        detail: '심한 돌출 앞니(나비치아), 겹친 덧니, 반대교합 간섭',
        clinicalCheck: '김준헌 병원장 3~6개월 부분교정으로 치축 정리 후 무삭제/미세 보정',
      },
    ],
    whenNotNeededOrCaution:
      '단순히 치아 색상만 어두워 고민이신 경우라면 치아 표면을 덮는 라미네이트보다 먼저 전문가 1DAY 치아미백(치아 삭제 0%)으로 목표 밝기가 나오는지 확인하는 것이 자연치아 보존에 가장 좋습니다.',
    faqFollowups: [
      {
        question: '무삭제 라미네이트는 나중에 떼어낼 수도 있나요?',
        answer: '레진 시멘트로 법랑질에 화학적 결합을 이루므로 탈착이 쉽지는 않으나, 삭제가 거의 없어 자연치아 구조를 훼손하지 않고 안정적으로 유지하는 데 의미가 있습니다.',
      },
      {
        question: '라미네이트 완성까지 내원 횟수와 기간은 얼마나 걸리나요?',
        answer: '정밀 3D 스캔 및 디자인 설계 후 원내 자체 기공소 연계를 거쳐 보통 2~3회 내원(약 1~2주 내외)으로 완성되며, 일본 등 해외 방한 환자 일정 조율도 가능합니다.',
      },
      {
        question: '이지화이트와 제로쉘은 다른 치료인가요?',
        answer: '제로쉘은 삭제를 생략하는 초박형 세라믹 라인이며, 이지화이트는 자연치아 법랑질 보존을 전제로 0.1~0.2mm 최소 조정 및 치아 성형 전반을 아우르는 최소삭제 심미보철 프로그램입니다.',
      },
    ],
    citations: [CIT_MORIMOTO_2016],
    reviewedByIds: ['park', 'lee', 'kim'],
    lastReviewed: '2026-11-20',
    relatedTreatmentUrl: '/treatments/aesthetic/zeroshell',
    relatedTreatmentLabel: '제로쉘 vs 이지화이트 비교 보기',
    relatedGlossaryIds: ['zeroshell-no-prep', 'minimal-prep-laminate', 'stump-shade'],
  },
  {
    slug: 'laminate-re-treatment-discoloration-fracture',
    category: '라미네이트·심미보철',
    question: '옛날 라미네이트가 변색되거나 깨지고 잇몸이 검게 비치는데 재시술이 가능한가요?',
    shortAnswer:
      '네, 가능합니다. 기존 라미네이트의 변색·끝 파절·잇몸 부종이나 검게 비침은 보철 경계 틈새(미세 누출)나 교합 간섭·과풍융이 원인인 경우가 많으며, 잔존 법랑질 손상을 최소화해 기존 세라믹을 제거한 뒤 치주과 전문의가 잇몸선을 안정화하고 교합 간섭을 바로잡아 재시술합니다.',
    summaryPoints: [
      '기존 보철을 거칠게 갈아내기보다 치질 손상을 줄여 안전하게 분리하고 내부 충치·변색 여부를 확인합니다.',
      '잇몸이 붉게 붓고 피가 나는 상태에서 본을 뜨면 재시술 후에도 경계부가 또 들뜨므로 박선혜 치주과 전문의의 잇몸 안정화가 먼저입니다.',
      '아랫니와 부딪히는 교합 간섭을 정밀 조정해야 재파절을 예방합니다.',
    ],
    criteriaTable: [
      {
        label: '경계 변색 · 틈새 충치',
        detail: '오래된 접착제 노화·미세 누출 및 2차 우식',
        clinicalCheck: '기존 보철 정밀 제거 후 우식 정화 및 지대치 색조(Stump Shade) 차폐 재접착',
      },
      {
        label: '잇몸 부종 · 검게 비침',
        detail: '잇몸 아래로 과도하게 밀어 넣은 두꺼운 보철 경계',
        clinicalCheck: '치주과 전문의 염증 치료·잇몸선 안정화 후 생체적합 마진 재설계',
      },
      {
        label: '끝부분 파절 · 반복 탈락',
        detail: '전방 유도 교합 간섭, 이갈이, 과도한 상아질 노출',
        clinicalCheck: '교합 높이 재조정 및 고강도 세라믹·보호 장치 안내',
      },
    ],
    whenNotNeededOrCaution:
      '라미네이트 끝이 아주 미세하게 거칠어졌을 뿐 틈새 충치나 잇몸 염증이 없다면 전체를 뜯어내고 재시술하지 않고 교합 연마(폴리싱)만으로 매끄럽게 유지할 수도 있습니다.',
    faqFollowups: [
      {
        question: '과거 라미네이트 때 치아를 많이 깎아 이미 신경치료된 치아도 재시술할 수 있나요?',
        answer: '법랑질 잔존량이 적고 이미 신경치료까지 된 치아라면 내부 치아 변색 차폐와 파절 방지를 위해 라미네이트 대신 정밀 올세라믹(지르코니아) 크라운으로 안전하게 전환해 재건합니다.',
      },
      {
        question: '원하는 치아만 1~2개 부분 재시술도 가능한가요?',
        answer: '원내 자체 기공소에서 인접 기존 보철물의 색상·광택·투명도에 맞춰 개별 정밀 조색이 가능하므로 문제가 생긴 치아만 선택적으로 재시술할 수 있습니다.',
      },
      {
        question: '재시술 기간 동안 앞니 없이 지내야 하나요?',
        answer: '기존 보철 제거 당일 정밀 스캔과 함께 임시 치아를 제작해 드리므로 일상생활이나 대면 업무에 지장 없이 진행됩니다.',
      },
    ],
    citations: [CIT_MORIMOTO_2016, CIT_KPERIO],
    reviewedByIds: ['park', 'lee'],
    lastReviewed: '2026-11-20',
    relatedTreatmentUrl: '/treatments/aesthetic',
    relatedTreatmentLabel: '라미네이트 재시술 · 심미보철 보기',
    relatedGlossaryIds: ['laminate-retreatment', 'stump-shade', 'enamel-preservation'],
  },
  {
    slug: 'front-gap-ortho-vs-laminate',
    category: '치아교정·재교정',
    question: '앞니가 벌어졌을 때 치아교정(부분교정)과 무삭제 라미네이트 중 어떤 선택이 맞나요?',
    shortAnswer:
      '치아 크기가 정상이고 사이 틈만 벌어진 경우라면 자연치아를 전혀 건드리지 않는 3~6개월 부분교정이 우선 유리합니다. 반면 치아 자체가 선천적으로 작은 왜소치이거나 마모·변색 개선을 함께 원한다면 교정만으로는 치아가 더 좁아 보일 수 있어 2~3회 내원 무삭제 제로쉘 심미보철이 적합합니다.',
    summaryPoints: [
      '부분교정(약 3~6개월): 치아 형태·색상이 정상이고 틈만 모으면 되는 경우.',
      '무삭제 제로쉘(2~3회 내원): 왜소치·형태 비대칭·색조 개선을 동시에 원하는 경우.',
      '교정학 박사(김준헌 병원장) × 보철·치주 협진(이봉진·박선혜 원장)이 한 자리에서 두 선택지를 공정하게 비교 진단합니다.',
    ],
    criteriaTable: [
      {
        label: '단기 부분교정 우선 추천',
        detail: '정상 크기 치아 + 1~3mm 앞니 틈 + 색상 양호',
        clinicalCheck: '치아 삭제 0%, 교정 완료 후 설측 고정식 유지장치 필수 착용',
      },
      {
        label: '무삭제 제로쉘 우선 추천',
        detail: '왜소치(선천적 작은 치아) + 좌우 크기 비대칭 + 빠른 일정(2~3회)',
        clinicalCheck: '빈 공간을 보철 비율로 채워 자연스러운 앞니 폭 비율 회복',
      },
      {
        label: '협진 병행 (부분교정 → 최소보철)',
        detail: '큰 틈새 + 왜소치 + 잇몸 비대칭 동반',
        clinicalCheck: '짧은 교정으로 틈 분배 균일화 후 무삭제/0.1mm 최소 보철 마무리',
      },
    ],
    whenNotNeededOrCaution:
      '치아 크기가 이미 넓은 편인데 앞니 틈을 메우겠다고 라미네이트를 붙이면 앞니 두 개가 지나치게 넓고 부자연스럽게(토끼 이빨처럼) 보일 수 있습니다. 이런 경우엔 라미네이트보다 교정으로 치아를 모으는 것이 심미·보존 양면에서 낫습니다.',
    faqFollowups: [
      {
        question: '앞니 부분교정 후 다시 벌어지는 재발은 어떻게 막나요?',
        answer: '앞니 사이는 잇몸 섬유질 탄성 때문에 재발하기 쉬우므로 치아 안쪽에 가느다란 고정식 유지장치를 부착하고 투명 가철식 유지장치를 병행 안내합니다.',
      },
      {
        question: '레진으로 앞니 벌어진 틈을 간단히 메우는 것과는 무엇이 다른가요?',
        answer: '레진은 당일 완료되고 비용 부담이 적지만 시간이 지나면 경계 변색이나 탈락이 잦은 반면, 세라믹 보철과 교정은 장기 색상·형태 유지 안정성이 높습니다.',
      },
      {
        question: '교정과 보철 중 치과가 어느 쪽을 더 권하는지 객관적으로 비교받을 수 있나요?',
        answer: '화이트스타일치과는 교정 전문 병원장(김준헌)과 보철·치주 원장단(이봉진·박선혜)이 모두 상주하므로 어느 한 과목으로 편향되지 않고 두 치료의 장단점·기간·비용을 함께 안내합니다.',
      },
    ],
    citations: [CIT_MORIMOTO_2016, CIT_KAO],
    reviewedByIds: ['kim', 'park'],
    lastReviewed: '2026-11-20',
    relatedTreatmentUrl: '/board/notice/1906',
    relatedTreatmentLabel: '앞니 벌어짐 교정 vs 라미네이트 칼럼 보기',
    relatedGlossaryIds: ['zeroshell-no-prep', 're-orthodontics', 'invisalign'],
  },
  {
    slug: 'adult-re-orthodontics-relapse-okni',
    category: '치아교정·재교정',
    question: '예전 교정 후 앞니가 다시 틀어졌거나 옥니(안으로 꺼짐)가 생겼을 때 성인 재교정이 가능한가요?',
    shortAnswer:
      '가능합니다. 성인 재교정은 치아가 다시 움직일 때 치근(치아 뿌리) 흡수와 잇몸 퇴축이 나타나기 쉬우므로 3D CT로 치근 길이와 잇몸뼈 두께를 먼저 계측한 뒤, 1994년 개원 이래 33년간 주치의 변경 없이 진료하는 교정학 박사 김준헌 병원장이 약한 힘으로 정밀 토크 컨트롤 재교정을 진행합니다.',
    summaryPoints: [
      '재교정 주요 원인: 유지장치 미착용/탈락 방치, 과도한 발치 후 옥니 발생, 어금니 교합 붕괴.',
      '전악을 모두 다시 하지 않고 앞니 배열 중심 3~6개월 부분 재교정으로 해결되는 경우도 많습니다.',
      '치주과 전문의 박선혜 원장 협진으로 성인 잇몸 퇴축·치조골 부담을 함께 점검합니다.',
    ],
    criteriaTable: [
      {
        label: '유지장치 탈락 단순 재발',
        detail: '치근·골폭 양호, 앞니 경미한 겹침·틈새 재발',
        clinicalCheck: '인비절라인·부분교정 약 3~6개월 내외 재정렬 후 이중 유지장치',
      },
      {
        label: '발치 교정 후 옥니 · 입매 꺼짐',
        detail: '앞니가 설측으로 과도하게 기울어 웃을 때 치아가 안 보이는 상태',
        clinicalCheck: '3D CT 상악 전치부 골폭 확인 후 치근 각도(토크) 세우기 컨트롤',
      },
      {
        label: '치근 짧아짐 · 잇몸 퇴축 동반',
        detail: '과거 무리한 교정력 이력 또는 중장년 치주 약화',
        clinicalCheck: '치주과 전문의 염증 안정화 선행 및 초저력 단계별 이동',
      },
    ],
    whenNotNeededOrCaution:
      '치근이 과거 교정으로 이미 심하게 짧아졌거나 잇몸뼈가 극도로 얇은 상태라면 무리한 전체 재교정보다 현재 교합을 지키는 유지장치 교체·치주 관리 또는 극소 교합 조정이 더 안전할 수 있습니다.',
    faqFollowups: [
      {
        question: '재교정 기간 중 또 담당 의사가 바뀔까 봐 걱정됩니다.',
        answer: '김준헌 병원장(서울대졸·단국대 외래교수·치과교정학 박사)이 1994년 개원 이래 33년간 한 자리에서 진단부터 월 치료, 유지관리까지 페이닥터 교체 없이 1:1로 직접 진료합니다.',
      },
      {
        question: '인비절라인 투명교정으로도 옥니나 재교정이 가능한가요?',
        answer: '케이스의 골격적 한계와 토크량에 따라 결정됩니다. 경미·중등도 재발은 인비절라인이 편리하고 위생적이며, 강한 토크 제어가 필요한 경우 설측·클리피씨 등 고정식 장치와 비교해 최적 방법을 권합니다.',
      },
      {
        question: '이전 교정 유지장치가 떨어졌는데 재교정까지 필요한가요?',
        answer: '치아가 아직 크게 움직이지 않고 유지장치만 탈락한 상태라면 당일 재부착·수복만으로도 재발을 막을 수 있습니다.',
      },
    ],
    citations: [CIT_KAO, CIT_KPERIO],
    reviewedByIds: ['kim', 'park'],
    lastReviewed: '2026-11-20',
    relatedTreatmentUrl: '/treatments/orthodontics/types',
    relatedTreatmentLabel: '성인 재교정 · 교정장치 종류 보기',
    relatedGlossaryIds: ['re-orthodontics', 'okni-torque', 'invisalign'],
  },
  {
    slug: 'orthodontics-total-fee-checklist',
    category: '치아교정·재교정',
    question: '강남역 치아교정 총액제(토탈피) 비교 시 반드시 확인해야 할 포함 항목 체크리스트는 무엇인가요?',
    shortAnswer:
      '치아교정 광고 기본가만 보고 결정하면 3D 정밀 진단비, 매월 조절 월치료비, 치료 후 고정식·가철식 유지장치비가 별도로 청구되어 최종 비용이 100만원 이상 늘어날 수 있습니다. 화이트스타일치과는 진단비·장치비·월비·유지장치 포함 기준을 시술 전 서면으로 안내합니다.',
    summaryPoints: [
      '체크 1: 3D CT · Quick-Ceph 정밀 진단비 포함 여부.',
      '체크 2: 매월 내원 조절 치료비(월비) 및 장치 탈락 재부착 기준.',
      '체크 3: 교정 완료 후 고정식 + 가철식 이중 유지장치비 및 정기 검진 포함 여부.',
    ],
    criteriaTable: [
      {
        label: '총액제(포함) 확인 영역',
        detail: '장치비 + 정밀 진단비 + 매월 조절 치료비 + 유지장치(1차)',
        clinicalCheck: '월별 추가 청구 없이 계획된 총 비용 범위 내 진행',
      },
      {
        label: '사전 분리 고지 영역',
        detail: '발치 교정 시 발치비, 스크류(미니임플란트), 추가 충치·잇몸 치료비',
        clinicalCheck: '개인 구강 상태에 따라 필요 시 정밀 진단 직후 서면 구분 안내',
      },
      {
        label: '의료진 연속성 확인',
        detail: '교정 중간 주치의 교체 없는지 여부',
        clinicalCheck: '김준헌 병원장 1인 전담 체제로 치료 중단·인수인계 오차 차단',
      },
    ],
    whenNotNeededOrCaution:
      '저가 이벤트를 내세우면서 교정 의사 약력이나 유지장치·월비 포함 여부를 문서로 명확히 적어주지 않는 곳은 치료 중 담당 의사 교체나 추가 비용 분쟁 소지가 크므로 피하는 것이 좋습니다.',
    faqFollowups: [
      {
        question: '부분교정도 총액제 기준으로 비용 안내를 받을 수 있나요?',
        answer: '네. 앞니 부분교정 역시 예상 기간(3~6개월)과 장치·유지장치 포함 기준을 3D 스캔 및 진단 후 명확히 안내해 드립니다.',
      },
      {
        question: '일본 거주자가 방한·체류 중에 교정을 시작할 경우 비용과 원격 관리는 어떻게 되나요?',
        answer: '일본어 총액제 안내(/ja/orthodontics) 기준을 동일하게 적용하며, 일본어 전담 통역 스태프 3명 상주(+82-10-3046-5010 / LINE: whitestyle1)를 통해 내원 일정과 경과를 지속적으로 지원합니다.',
      },
      {
        question: '교정 상담 시 정밀 진단까지 받으면 얼마나 시간이 걸리나요?',
        answer: '초진 3D CT·Quick-Ceph·구강스캔 및 김준헌 병원장 1:1 상담까지 약 40~60분 내외로 당일 정밀 안내가 가능합니다.',
      },
    ],
    citations: [CIT_KAO, CIT_HIRA],
    reviewedByIds: ['kim'],
    lastReviewed: '2026-11-20',
    relatedTreatmentUrl: '/treatments/orthodontics',
    relatedTreatmentLabel: '1:1 책임 치아교정 시스템 보기',
    relatedGlossaryIds: ['total-fee-ortho', 'quick-ceph-3dct'],
  },
  {
    slug: 'invisalign-vs-lingual-vs-clippy-c',
    category: '치아교정·재교정',
    question: '인비절라인 투명교정 vs 설측교정 vs 클리피씨 교정 중 성인에게 가장 유리한 장치는 무엇인가요?',
    shortAnswer:
      '탈착이 가능하고 구강 위생 관리·통원 간격 유연성이 중요하다면 인비절라인이 유리하며, 겉으로 보이지 않으면서 환자 착용 협조도에 좌우되지 않는 강력한 이동력이 필요하면 설측교정이 적합하고, 전체 치열 이동 효율과 비용 균형을 중시하면 자가결찰 클리피씨가 적합합니다.',
    summaryPoints: [
      '인비절라인: 하루 20~22시간 착용 필수, 해외·지방 거주자 및 재교정·치주 관리 환자 선호.',
      '설측교정: 치아 안쪽 부착으로 심미성 최고, 발음 적응기 1~2주 필요.',
      '클리피씨(자가결찰): 마찰력이 낮아 치아 이동 속도와 진료 시간 단축에 유리.',
    ],
    criteriaTable: [
      {
        label: '인비절라인 (투명교정)',
        detail: '장치가 거의 안 보이며 식사·양치 시 탈착 가능, 내원 주기 유연',
        clinicalCheck: '하루 20시간 이상 성실 착용 가능한 성인·해외 환자에게 최적',
      },
      {
        label: '설측교정 (안쪽 교정)',
        detail: '외부 노출 0%, 24시간 지속 교정력 발휘 (착용 잊을 염려 없음)',
        clinicalCheck: '면접·방송·웨딩 등 대면 노출이 잦은 성인에게 적합',
      },
      {
        label: '클리피씨 · 세라믹',
        detail: '치아 색상과 유사한 자가결찰 브라켓, 다양한 부정교합 범용 대응',
        clinicalCheck: '복잡한 발치 교정 및 합리적 비용 효율 균형',
      },
    ],
    whenNotNeededOrCaution:
      '투명교정 장치를 하루 15시간 미만으로 띄엄띄엄 착용하면 계획한 치아 이동이 따라오지 않아 장치를 새로 제작하거나 기간이 길어집니다. 스스로 매일 20시간 착용할 자신이 없다면 고정식 설측·클리피씨가 결과 예측성 면에서 훨씬 낫습니다.',
    faqFollowups: [
      {
        question: '나이가 40~50대인데도 치아교정이나 인비절라인이 가능한가요?',
        answer: '나이가 아니라 잇몸뼈와 치주 상태가 기준입니다. 박선혜 원장(치주과 전문의)이 잇몸 건강을 함께 관리하면서 김준헌 병원장이 약한 힘으로 조절하므로 중장년 성인 교정도 활발히 진행됩니다.',
      },
      {
        question: '클리피씨와 인비절라인 치료 기간 차이는 큰가요?',
        answer: '단순 비발치 배열은 두 장치 모두 평균 6~14개월 내외로 유사하며, 발치 동반 심한 돌출입이나 큰 치근 토크 이동이 필요한 경우 고정식 장치가 유리할 수 있습니다.',
      },
      {
        question: '교정 중 충치나 잇몸 관리가 어려울까 걱정됩니다.',
        answer: '화이트스타일치과는 교정 치료 중에도 치주과·보존과 원장단 협진으로 스케일링과 잇몸·충치 관리를 원내에서 바로 연계해 드립니다.',
      },
    ],
    citations: [CIT_KAO],
    reviewedByIds: ['kim', 'park'],
    lastReviewed: '2026-11-20',
    relatedTreatmentUrl: '/treatments/orthodontics/types',
    relatedTreatmentLabel: '교정장치 4종 상세 비교 보기',
    relatedGlossaryIds: ['invisalign', 'lingual-ortho', 're-orthodontics'],
  },
  {
    slug: 'periodontist-implant-recall-3-6-12',
    category: '잇몸·보존·수가',
    question: '치주과 전문의 협진과 시술 후 3·6·12개월 정기 리콜이 왜 임플란트·라미네이트 수명을 좌우하나요?',
    shortAnswer:
      '임플란트는 신경이 없어 초기 염증이 생겨도 통증을 거의 느끼지 못하다가 잇몸뼈가 절반 이상 녹은 뒤에야 흔들림을 자각하는 경우가 많습니다. 보건복지부 인증 치주과 전문의 박선혜 원장이 3·6·12개월 주기로 치주낭 깊이와 교합을 점검해 초기 단계에서 염증을 차단합니다.',
    summaryPoints: [
      '2017 World Workshop 합의(Berglundh et al., 2018)에서 임플란트 주위 점막염은 조기 세정으로 가역적 회복이 가능하나, 골 흡수로 진행되면 외과적 처치나 재수술이 필요해집니다.',
      '자연치아 스케일링은 만 19세 이상 매년 1회 건강보험 적용(1월 1일~12월 31일)을 꼭 챙기셔야 합니다.',
      '라미네이트·크라운 완료 환자도 경계부 치태 축적과 잇몸 퇴축 예방을 위해 동일 리콜 관리가 중요합니다.',
    ],
    criteriaTable: [
      {
        label: '3개월 체크',
        detail: '보철물 장착 후 초기 교합 간섭, 치실·치간칫솔 사용 습관 점검',
        clinicalCheck: '음식물 끼임·잇몸 발적 조기 교정',
      },
      {
        label: '6개월 체크',
        detail: '치석·바이오필름 제거, 치주 탐침 출혈(BOP) 확인, 보철 나사 점검',
        clinicalCheck: '임플란트 주위 점막염 단계에서 조기 차단',
      },
      {
        label: '12개월 체크',
        detail: '연 1회 방사선 X-ray로 임플란트 주변 치조골 높이 변화 비교',
        clinicalCheck: '골 소실 유무 정량 추적 및 연간 건강보험 스케일링 연계',
      },
    ],
    whenNotNeededOrCaution:
      '양치 시 피가 살짝 나거나 입 냄새가 심해졌을 때 "피곤해서 그렇겠지" 하고 넘기면 임플란트 주위염이 깊어집니다. 통증이 없더라도 6개월~1년마다 방사선 사진으로 뼈 높이를 비교하는 것이 가장 확실한 예방법입니다.',
    faqFollowups: [
      {
        question: '치주과 전문의는 일반 치과의사와 어떤 점이 다른가요?',
        answer: '보건복지부가 인증한 치주과 전문의는 잇몸(치주) 질환, 치조골 재생술, 잇몸 이식·잇몸 성형, 임플란트 주위염 치료를 수련 기간 동안 집중 전공한 분과 전문의입니다.',
      },
      {
        question: '건강보험 스케일링 1년에 1번 기준은 언제 초기화되나요?',
        answer: '매년 1월 1일부터 12월 31일 기준 1회 적용되며, 그해 사용하지 않은 혜택은 다음 해로 이월되지 않으므로 연말 전에 꼭 이용하시는 것이 좋습니다.',
      },
      {
        question: '잇몸이 내려앉아 치아 뿌리가 시릴 때도 치료가 가능한가요?',
        answer: '치근 노출 정도에 따라 지각과민 처치, 레진 수복, 또는 치주과 전문의의 치근피개술 등 맞춤 치료로 시림과 심미적 고민을 함께 완화할 수 있습니다.',
      },
    ],
    citations: [CIT_BERGLUNDH_2018, CIT_KPERIO, CIT_NHIS],
    reviewedByIds: ['park', 'lee'],
    lastReviewed: '2026-11-20',
    relatedTreatmentUrl: '/treatments/general/scaling',
    relatedTreatmentLabel: '치주과 전문의 잇몸치료·스케일링 보기',
    relatedGlossaryIds: ['periodontist-collab', 'recall-3-6-12', 'peri-implantitis'],
  },
  {
    slug: 'gangnam-dental-implant-price-comparison',
    category: '잇몸·보존·수가',
    question: '모두닥 · 심평원 기준으로 강남역 치과 임플란트 가격을 비교할 때 바가지를 피하는 핵심 체크리스트는?',
    shortAnswer:
      '모두닥이나 심평원 비급여 자료로 강남역 치과를 비교할 때는 ① 픽스처 + 맞춤형 지대주 + 상부 지르코니아 크라운 포함 총액인지, ② 뼈이식·상악동거상술 조건이 분리 안내되는지, ③ 33년 등 한 자리 개원 업력과 사후 보증·치주과 전문의 리콜이 있는지 3가지를 반드시 함께 비교해야 합니다.',
    summaryPoints: [
      '화이트스타일치과 심평원 고지 임플란트(1치당): 오스템·바이오템 PFM 100~120만원, 지르코니아 120만원, 골드 120~145만원.',
      '29만~39만원 미끼 광고 가격에는 상부 보철·맞춤 지대주·필수 뼈이식이 빠진 경우가 많습니다.',
      '1994년 개원 33년 한 자리 운영으로 폐업·먹튀 걱정 없는 사후관리 연속성을 확인하세요.',
    ],
    criteriaTable: [
      {
        label: '1. 포함 항목 서면 확인',
        detail: '픽스처 + 맞춤형 커스텀 지대주 + 지르코니아 크라운 포함 여부',
        clinicalCheck: '화이트스타일치과 /price 기준표 & 서면 견적 확인',
      },
      {
        label: '2. 병원 지속성 · 실명 리뷰',
        detail: '장기간 한 위치에서 운영했는지, 실제 영수증 인증 후기가 있는지',
        clinicalCheck: '1994년 개원 33년 전통 · 모두닥(3940)·굿닥(43229)·네이버 영수증 후기',
      },
      {
        label: '3. 전문의 협진 · 보증 범위',
        detail: '수술 후 문제 발생 시 책임지는 치주·보철·교정 협진 시스템',
        clinicalCheck: '김준헌·이봉진·박선혜(치주과 전문의) 3인 협진 & 3·6·12개월 리콜',
      },
    ],
    whenNotNeededOrCaution:
      '선납금 전액 일시불 결제를 유도하며 파격 할인만 강조하거나, 담당 의료진 약력·사업자 정보·비급여 항목별 내역을 서면으로 제공하지 않는 곳은 장기 보증 신뢰성이 낮으므로 주의해야 합니다.',
    faqFollowups: [
      {
        question: '치과마다 같은 오스템 임플란트인데 왜 가격이 다른가요?',
        answer: '동일 픽스처 브랜드라도 등급(표면 처리 차이), 기성 지대주 vs 맞춤형 커스텀 지대주, 상부 크라운 소재, 치조골 이식 범위, 진단 장비와 사후 리콜 시스템 포함 여부에 따라 비용 구성이 달라집니다.',
      },
      {
        question: '화이트스타일치과 비급여 가격은 홈페이지에서 바로 볼 수 있나요?',
        answer: '네. 상단 메뉴의 비급여 수가표(/price) 페이지에서 심평원 공식 고지 임플란트 가격과 진료과목별 포함·별도 항목 구분 기준을 바로 확인하실 수 있습니다.',
      },
      {
        question: '모두닥이나 굿닥에 등록된 화이트스타일치과 정보도 동일한가요?',
        answer: '네. 모두닥(hospital/3940)과 굿닥(43229)에 공개된 심평원 비급여 수가 및 강남대로92길 17 위치·진료 기준은 원내 공식 안내와 동일합니다.',
      },
    ],
    citations: [CIT_HIRA, CIT_JUNG_2012],
    reviewedByIds: ['lee', 'park', 'kim'],
    lastReviewed: '2026-11-20',
    relatedTreatmentUrl: '/price',
    relatedTreatmentLabel: '비급여 진료비 투명 수가표 바로가기',
    relatedGlossaryIds: ['hira-non-covered', 'custom-abutment', 'implant-reoperation'],
  },
  {
    slug: 'natural-tooth-saving-re-endo',
    category: '잇몸·보존·수가',
    question: '예전에 신경치료한 치아가 다시 아플 때 바로 발치·임플란트를 해야 하나요, 재신경치료로 살릴 수 있나요?',
    shortAnswer:
      '수직 치근 파절이나 치조골이 완전히 파괴된 경우가 아니라면, 임플란트 전에 먼저 3D CT와 특수 현미경으로 누락된 근관·미세 균열을 찾아 재신경치료(자연치아 살리기)를 우선 검토하는 것이 원칙입니다. 체계적 문헌고찰(Ng et al., 2008 / Torabinejad et al., 2009)에서도 재신경치료와 치근단 수술은 높은 장기 생존율을 보입니다.',
    summaryPoints: [
      '과잉 발치를 피하기 위해 3D CT로 치아 뿌리 끝 염증 크기와 금(균열) 여부를 먼저 확인합니다.',
      '비외과적 재신경치료로 회복이 어려운 경우에도 치근단 절제술이나 치아 재식술로 자연치아 보존 가능성을 한 번 더 검토합니다.',
      '자연치아는 치주인대가 있어 씹는 감각과 충격 흡수 능력이 뛰어나므로 최대한 오래 쓰는 것이 최선입니다.',
    ],
    criteriaTable: [
      {
        label: '재신경치료 우선 시도',
        detail: '누락된 부근관 발견, 불완전한 근관 충전, 치근단 낭종 초기',
        clinicalCheck: '특수 현미경 확대 진료 하에 기존 충전재 제거 및 재소독',
      },
      {
        label: '치근단 절제술 · 재식술',
        detail: '치아 상부 보철물(기둥·포스트) 제거 위험이 크거나 뿌리 끝 염증 국한',
        clinicalCheck: '잇몸 측면을 통해 뿌리 끝 염증 병소만 미세 절제 후 역충전',
      },
      {
        label: '발치 후 임플란트 전환',
        detail: '수직 치근 파절(뿌리 세로 쪼개짐), 잔존 치질 극심한 부족',
        clinicalCheck: '주변 잇몸뼈 녹기 전 발치 후 치주과 협진 뼈이식·임플란트 전환',
      },
    ],
    whenNotNeededOrCaution:
      '치아 뿌리가 세로로 완전히 쪼개진 수직 치근 파절 상태에서는 재신경치료를 반복해도 염증이 계속 번져 주변 잇몸뼈까지 파괴됩니다. 이때는 무리하게 방치하지 말고 빠르게 발치하여 인접 치아와 뼈를 지키는 판단이 필요합니다.',
    faqFollowups: [
      {
        question: '재신경치료 성공률은 어느 정도인가요?',
        answer: 'Ng 등(2008)의 체계적 문헌고찰에 따르면 비외과적 재근관치료는 치근단 병소 유무에 따라 70~80%대 이상의 높은 임상 성공률을 보이며, 난치성 사례는 치근단 수술(Torabinejad et al., 2009)로 추가 보존을 도모합니다.',
      },
      {
        question: '재신경치료를 받으면 기존 크라운을 다시 씌워야 하나요?',
        answer: '크라운 상부에 작은 구멍을 내어 접근하는 경우도 있으나, 내부 2차 충치나 보철 적합도가 떨어진 경우에는 정확한 밀폐를 위해 크라운 교체가 권장됩니다.',
      },
      {
        question: '자연치아 살리기 상담은 어느 원장님께 받나요?',
        answer: '이봉진 대표원장·박선혜 원장(치주과 전문의)이 3D CT와 치주 검진을 함께 판독하여 재신경치료, 치주치료, 발치·임플란트 중 가장 유리한 순서를 안내해 드립니다.',
      },
    ],
    citations: [CIT_NG_2008, CIT_TORABINEJAD_2009],
    reviewedByIds: ['lee', 'park'],
    lastReviewed: '2026-11-20',
    relatedTreatmentUrl: '/treatments/general/endo',
    relatedTreatmentLabel: '신경치료 · 자연치아 보존 안내 보기',
    relatedGlossaryIds: ['re-endodontic', 'quick-ceph-3dct', 'periodontist-collab'],
  },
];

export function getEvidenceQaBySlug(slug: string): EvidenceQaItem | undefined {
  return EVIDENCE_QA_LIST.find((item) => item.slug === slug);
}
