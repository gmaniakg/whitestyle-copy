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

const CIT_DIABETES_IMPLANT_2022: QaCitation = {
  title: 'Systematic review on diabetes mellitus and dental implants: an update (2022)',
  source: 'PubMed PMID 35288788',
  url: 'https://pubmed.ncbi.nlm.nih.gov/35288788/',
  pmid: '35288788',
};

const CIT_OSTEOPOROSIS_IMPLANT_2023: QaCitation = {
  title: 'Do dental implants placed in patients with osteoporosis have higher risks of failure and marginal bone loss compared to healthy patients? A systematic review with meta-analysis (2023)',
  source: 'PubMed PMID 37043030',
  url: 'https://pubmed.ncbi.nlm.nih.gov/37043030/',
  pmid: '37043030',
};

const CIT_OSTEOPOROSIS_IMPLANT_2017: QaCitation = {
  title: 'Dental implants in patients with osteoporosis: a systematic review with meta-analysis (2017)',
  source: 'PubMed PMID 28651805',
  url: 'https://pubmed.ncbi.nlm.nih.gov/28651805/',
  pmid: '28651805',
};

const CIT_SINUS_LIFT_2023: QaCitation = {
  title: 'The Impact of Sinus Floor Elevation Techniques on Sinus Membrane Perforation: A Systematic Review and Network Meta-analysis (2023)',
  source: 'PubMed PMID 37351838',
  url: 'https://pubmed.ncbi.nlm.nih.gov/37351838/',
  pmid: '37351838',
};

const CIT_ALQUTAIBI_2025: QaCitation = {
  title: 'Clinical survival and complication rate of ceramic veneers bonded to different substrates: A systematic review and meta-analysis (J Prosthet Dent, 2025)',
  source: 'PubMed PMID 38604905',
  url: 'https://pubmed.ncbi.nlm.nih.gov/38604905/',
  pmid: '38604905',
};

const CIT_CROWN_LENGTH_2023: QaCitation = {
  title: 'Periodontal tissue changes after crown lengthening surgery: A systematic review and meta-analysis (Saudi Dent J, 2023)',
  source: 'PubMed PMID 37251724',
  url: 'https://pubmed.ncbi.nlm.nih.gov/37251724/',
  pmid: '37251724',
};

const CIT_CROWN_LENGTH_2016: QaCitation = {
  title: 'Pre-restorative crown lengthening surgery outcomes: a systematic review (J Clin Periodontol, 2016)',
  source: 'PubMed PMID 27535216',
  url: 'https://pubmed.ncbi.nlm.nih.gov/27535216/',
  pmid: '27535216',
};

const CIT_WHITENING_2024: QaCitation = {
  title: 'Evaluation of the Effectiveness of Different Types of Professional Tooth Whitening: A Systematic Review (Bioengineering, 2024)',
  source: 'PubMed PMID 39767997',
  url: 'https://pubmed.ncbi.nlm.nih.gov/39767997/',
  pmid: '39767997',
};

const CIT_DESENSITIZING_2024: QaCitation = {
  title: 'Effectiveness of desensitizing toothpastes in reducing tooth sensitivity after tooth bleaching: a systematic review (Clin Oral Investig, 2024)',
  source: 'PubMed PMID 39078468',
  url: 'https://pubmed.ncbi.nlm.nih.gov/39078468/',
  pmid: '39078468',
};

const CIT_BRUXISM_ALIGNER: QaCitation = {
  title: 'Clear aligner therapy and its association with sleep and awake bruxism: a systematic review (J Oral Rehabil)',
  source: 'PubMed PMID 41841364',
  url: 'https://pubmed.ncbi.nlm.nih.gov/41841364/',
  pmid: '41841364',
};

const CIT_ROOT_RESORPTION_2021: QaCitation = {
  title: 'Orthodontic treatment and root resorption: an overview of systematic reviews (2021)',
  source: 'PubMed PMID 33215186',
  url: 'https://pubmed.ncbi.nlm.nih.gov/33215186/',
  pmid: '33215186',
};

const CIT_ALIGNER_RESORPTION_2019: QaCitation = {
  title: 'Root resorption in orthodontic treatment with clear aligners: A systematic review and meta-analysis (2019)',
  source: 'PubMed PMID 31323701',
  url: 'https://pubmed.ncbi.nlm.nih.gov/31323701/',
  pmid: '31323701',
};

const CIT_FIXED_RESORPTION_2022: QaCitation = {
  title: 'Root resorption factors associated with orthodontic treatment with fixed appliances: A systematic review and meta-analysis (2022)',
  source: 'PubMed PMID 36206494',
  url: 'https://pubmed.ncbi.nlm.nih.gov/36206494/',
  pmid: '36206494',
};

const CIT_ALIGNERS_VS_FIXED: QaCitation = {
  title: 'Clear aligners versus fixed orthodontic appliances regarding periodontal health, pain, and quality of life: a systematic review and meta-analysis (BDJ Open)',
  source: 'PubMed PMID 42270616',
  url: 'https://pubmed.ncbi.nlm.nih.gov/42270616/',
  pmid: '42270616',
};

const CIT_RELAPSE_RESORPTION_1987: QaCitation = {
  title: 'Orthodontic relapse, apical root resorption, and crestal alveolar bone levels (1987)',
  source: 'PubMed PMID 3469910',
  url: 'https://pubmed.ncbi.nlm.nih.gov/3469910/',
  pmid: '3469910',
};

const CIT_CORONECTOMY_REVIEW: QaCitation = {
  title: 'Coronectomy versus complete extraction of impacted mandibular third molars with risk of inferior alveolar nerve injury: a systematic review',
  source: 'PubMed PMID 25890111',
  url: 'https://pubmed.ncbi.nlm.nih.gov/25890111/',
  pmid: '25890111',
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
  {
    slug: 'implant-diabetes-hypertension-safety',
    category: '임플란트·재수술',
    question: '당뇨병·고혈압·항혈전제를 복용 중인데 임플란트 수술을 안전하게 받을 수 있나요?',
    shortAnswer:
      '혈당(당화혈색소)과 혈압이 내과적으로 안정 범위 내에서 조절되고 있다면 비당뇨 환자와 유사한 수준의 임플란트 생존율을 기대할 수 있습니다(PMID 35288788). 다만 치유 지연과 감염 위험을 낮추기 위해 수술 전 복용 약물 확인과 치주과 전문의의 잇몸·골질 평가, 3단계 무통 국소마취 프로토콜을 거치는 것이 안전합니다.',
    summaryPoints: [
      '당뇨병 환자의 임플란트는 혈당이 안정적으로 조절되는 상태에서 치주 관리를 병행하면 안전하게 식립할 수 있습니다.',
      '고혈압 및 항혈전제(아스피린·와파린 등) 복용 환자는 임의로 약을 중단하지 말고 내과 주치의 소견에 따라 지혈 계획을 세웁니다.',
      '화이트스타일치과는 전신 부담이 큰 수면마취를 시행하지 않고 3단계 국소 무통마취로 안전하게 시술합니다.',
    ],
    criteriaTable: [
      {
        label: '조절되는 당뇨 · 고혈압',
        detail: '최근 당화혈색소·혈압 수치가 안정 범위인 경우',
        clinicalCheck: '오전 시간대 수술 권장, 치주과 전문의 잇몸 염증 사전 정화',
      },
      {
        label: '미조절 고혈당 · 감염 동반',
        detail: '급성 치주염 또는 공복 혈당 급등 상태',
        clinicalCheck: '즉시 식립 보류, 내과 혈당 조절 및 치주 안정화 후 수술 재개',
      },
      {
        label: '항혈전제 복용 환자',
        detail: '심혈관 질환 예방 약제 장기 복용',
        clinicalCheck: '처방 내과 협진 소견 확인 및 최소 침습 절개·이중 지혈 처치',
      },
    ],
    whenNotNeededOrCaution:
      '당화혈색소가 장기간 8~9% 이상으로 조절되지 않거나 최근 급성 심근경색·뇌졸중 병력이 있는 경우에는 무리하게 즉시 수술하지 않고 반드시 담당 내과 주치의 협진을 거쳐 수술 시기를 조율해야 합니다.',
    faqFollowups: [
      {
        question: '고혈압 약이나 아스피린을 먹으면 수술 전 무조건 끊어야 하나요?',
        answer: '환자 임의로 복용을 중단하면 전신 혈관 사고 위험이 커집니다. 반드시 처방받은 내과 주치의와의 협진 소견에 따라 유지 또는 단기 조절 여부를 결정합니다.',
      },
      {
        question: '당뇨가 있으면 임플란트 수술 후 붓기나 실밥 제거가 더 늦어지나요?',
        answer: '개인차가 있으나 잇몸 치유가 일반인보다 며칠 더 소요될 수 있어 항생제·구강 소독 관리와 치주과 전문의의 경과 확인을 꼼꼼히 진행합니다.',
      },
    ],
    citations: [CIT_DIABETES_IMPLANT_2022, CIT_BERGLUNDH_2018],
    reviewedByIds: ['park', 'lee'],
    lastReviewed: '2026-11-20',
    relatedTreatmentUrl: '/treatments/implant/insurance',
    relatedTreatmentLabel: '만성질환 · 65세 건강보험 임플란트 안내',
    relatedGlossaryIds: ['non-sedation-safety', 'periodontist-collab', 'osseointegration'],
  },
  {
    slug: 'implant-osteoporosis-medication-check',
    category: '임플란트·재수술',
    question: '골다공증 약(비스포스포네이트)이나 주사를 맞고 있어도 임플란트가 가능한가요?',
    shortAnswer:
      '골다공증 자체는 적절한 골질 평가 하에 임플란트 생존율에 큰 차이를 보이지 않는다는 메타분석 결과가 보고되어 있습니다(PMID 28651805, 37043030). 그러나 비스포스포네이트·데노수맙 등 골흡수억제제의 투여 경로(경구 vs 정맥주사)와 누적 복용 기간에 따라 턱뼈 괴사(MRONJ) 위험이 다르므로 수술 전 약물 이력을 반드시 확인해야 합니다.',
    summaryPoints: [
      '골다공증 질환 자체보다 턱뼈 재생에 영향을 주는 골흡수억제제 종류와 투여 기간 확인이 핵심입니다.',
      '정맥주사제나 장기 복용자의 경우 내과 협진을 통한 휴약기 검토 또는 발치·골수술 최소 침습 설계가 필요합니다.',
      '3D CT로 치조골 피질골 두께와 골밀도를 정밀 평가한 뒤 식립 토크와 보철 시기를 여유 있게 잡습니다.',
    ],
    criteriaTable: [
      {
        label: '경구용 약제 단기 복용',
        detail: '복용 기간이 짧고 치조골 혈류가 양호한 경우',
        clinicalCheck: '3D CT 정밀 계측 후 최소 침습 식립 및 예방적 항생제·위생 관리',
      },
      {
        label: '장기 복용 또는 주사제 투여',
        detail: '4년 이상 경구 복용 또는 고농도 주사제 치료 이력',
        clinicalCheck: '처방 내과·정형외과 휴약 가능 여부 협진 및 점막 일차 봉합 원칙',
      },
      {
        label: '식립 후 골유착 기간',
        detail: '해면골 밀도가 낮아 초기 고정력이 약한 부위',
        clinicalCheck: '즉시 부하 배제, 충분한 골유착 안정화 후 맞춤형 지대주 연결',
      },
    ],
    whenNotNeededOrCaution:
      '골다공증 약물 복용 사실을 알리지 않고 발치나 임플란트 뼈이식을 진행하면 잇몸뼈가 아물지 않고 노출되는 턱뼈 괴사(MRONJ) 위험이 높아질 수 있으므로 복용 약 이름·처방전·주사 일정을 초진 시 꼭 알려주셔야 합니다.',
    faqFollowups: [
      {
        question: '골다공증 환자용 건강보험 임플란트도 본인부담금 30% 적용되나요?',
        answer: '만 65세 이상 부분 무치악 환자라면 골다공증 여부와 관계없이 평생 2개 본인부담률 30% 건강보험 기준이 동일하게 적용됩니다.',
      },
      {
        question: '뼈가 약하면 임플란트 수술 시 뼈이식을 꼭 해야 하나요?',
        answer: '3D CT 상 잔존 골폭과 높이가 충분하면 뼈이식 없이 초기 고정을 확보하는 경우도 있으며, 부족한 부위에만 선택적으로 GBR을 병행합니다.',
      },
    ],
    citations: [CIT_OSTEOPOROSIS_IMPLANT_2023, CIT_OSTEOPOROSIS_IMPLANT_2017],
    reviewedByIds: ['lee', 'park'],
    lastReviewed: '2026-11-20',
    relatedTreatmentUrl: '/treatments/implant/bone-graft',
    relatedTreatmentLabel: '정밀 뼈이식·전신질환 협진 임플란트 보기',
    relatedGlossaryIds: ['bisphosphonate-mronj', 'osseointegration', 'quick-ceph-3dct'],
  },
  {
    slug: 'sinus-lift-perforation-safety-3dct',
    category: '임플란트·재수술',
    question: '위 어금니 상악동거상술 시 상악동 막 천공이나 축농증 부작용은 어떻게 예방하나요?',
    shortAnswer:
      '위턱 어금니 부위 뼈 높이가 얇을 때 시행하는 상악동거상술은 3D CT로 상악동 내부 격막(중격), 점막 비후·만성 염증 여부, 혈관 주행을 사전에 입체 파악하고 잔존 골 높이에 맞춰 치조정 접근과 측방 접근을 구분해 선택할 때 상악동 막 천공 위험을 크게 줄일 수 있습니다(PMID 37351838).',
    summaryPoints: [
      '수술 전 3D CT 판독으로 상악동 내 뼈 격막 유무와 점막 두께를 미리 확인해 천공 위험을 낮춥니다.',
      '잔존 골 높이에 따라 비교적 덜 침습적인 치조정 접근(Crestal)과 시야 확보가 좋은 측방 접근(Lateral)을 구분 적용합니다.',
      '이미 만성 부비동염이나 이전 이식재 염증이 있는 경우 치주과·이비인후과 평가 후 염증 정화를 우선합니다.',
    ],
    criteriaTable: [
      {
        label: '잔존 골 4~7mm 내외',
        detail: '소량 거상으로 임플란트 길이 확보가 가능한 상태',
        clinicalCheck: '3D CT 계측 후 치조정 접근법(Crestal Approach)으로 최소 침습 거상',
      },
      {
        label: '잔존 골 3mm 이하 고난도',
        detail: '위턱 잇몸뼈가 극도로 얇거나 상악동 격막이 복잡한 경우',
        clinicalCheck: '측방 접근법(Lateral Window)으로 직접 점막을 박리·보호하며 골이식',
      },
      {
        label: '재수술 · 기존 이식 감염',
        detail: '타 치과 거상술 후 이식재 유출·상악동염 발생 사례',
        clinicalCheck: '감염 이식재 제거 및 점막 치유 대기 후 3인 협진 단계적 재건',
      },
    ],
    whenNotNeededOrCaution:
      '남아 있는 위턱 잇몸뼈 높이가 이미 8~10mm 이상으로 넉넉한 경우에는 불필요하게 상악동 점막을 들어 올리지 않아도 표준 길이의 임플란트를 안전하게 식립할 수 있습니다.',
    faqFollowups: [
      {
        question: '상악동거상술 후 코를 풀거나 비행기를 타면 안 되는 기간이 있나요?',
        answer: '상악동 내부 압력 상승이 점막과 골이식재를 흔들 수 있으므로 수술 후 약 2주간은 코를 세게 풀지 말고 빨대 사용과 격한 기압 변화를 피하셔야 합니다.',
      },
      {
        question: '상악동거상술과 임플란트 식립을 하루에 같이 진행하기도 하나요?',
        answer: '3D CT 상 잔존 골에서 임플란트 초기 고정력이 확보되면 거상술과 식립을 동시 진행해 총 내원 기간을 줄이고, 뼈가 극도로 얇은 경우 뼈이식 회복 후 2차 식립을 선택합니다.',
      },
    ],
    citations: [CIT_SINUS_LIFT_2023, CIT_HAMMERLE_2002],
    reviewedByIds: ['lee', 'park'],
    lastReviewed: '2026-11-20',
    relatedTreatmentUrl: '/treatments/implant/bone-graft',
    relatedTreatmentLabel: '상악동거상술 · 뼈이식 상세 안내',
    relatedGlossaryIds: ['sinus-lift', 'gbr-bone-graft', 'implant-reoperation'],
  },
  {
    slug: 'implant-brand-osstem-biotem-selection',
    category: '임플란트·재수술',
    question: '오스템·바이오템 같은 임플란트 픽스처 브랜드 차이가 장기 수명에 얼마나 영향을 미치나요?',
    shortAnswer:
      '식약처 승인을 받은 정품 픽스처(오스템·바이오템 등) 간의 미세한 표면 처리 차이보다 임플란트의 10년 이상 장기 생존율(PMID 23062124)을 실제 좌우하는 핵심 변수는 3D CT 기반 식립 각도·깊이, 잇몸 형태에 맞춘 커스텀 지대주 설계, 그리고 치주과 전문의의 3·6·12개월 정기 리콜 관리입니다.',
    summaryPoints: [
      '화이트스타일치과는 심평원(HIRA) 비급여 기준표에 명시된 오스템·바이오템 정품 픽스처와 정품 부속만을 사용합니다.',
      '동일 브랜드라도 기성 지대주인지, 맞춤형 커스텀 지대주인지와 상부 크라운 소재에 따라 내구성과 잇몸 밀착도가 달라집니다.',
      '장기적으로는 브랜드 이름보다 3·6·12개월 주위염 예방 검진이 임플란트 수명을 결정합니다.',
    ],
    criteriaTable: [
      {
        label: '오스템 · 바이오템 정품 픽스처',
        detail: '국산 임상 데이터가 풍부하고 향후 부품 호환성이 높은 정품 시스템',
        clinicalCheck: '시술 후 정품 인증 번호 확인 및 동일 시스템 규격 관리',
      },
      {
        label: '커스텀 어버트먼트 결합',
        detail: '픽스처 위 잇몸 관통 기둥을 환자 잇몸에 맞게 CAD/CAM 맞춤 설계',
        clinicalCheck: '음식물 끼임 감소 및 상부 보철 파절·나사 풀림 부담 완화',
      },
      {
        label: '상부 크라운 · 사후 리콜',
        detail: 'PFM·지르코니아·골드 중 교합력에 맞는 보철 선택',
        clinicalCheck: '심평원 고지 가격 사전 확인 및 치주과 전문의 정기 검진 연계',
      },
    ],
    whenNotNeededOrCaution:
      '해외·국내 일부 소형 비규격 브랜드의 저가 특가 상품은 수년 후 나사 풀림이나 크라운 교체 시 호환 드라이버와 정품 어버트먼트를 구하기 어려워 재수술로 이어질 수 있으므로 사후 부품 호환성을 반드시 확인해야 합니다.',
    faqFollowups: [
      {
        question: '오스템과 바이오템 임플란트 심평원 비급여 고지 가격은 얼마인가요?',
        answer: '본원 심평원 고지 기준 치과임플란트(1치당) 오스템·바이오템 PFM은 1,000,000~1,200,000원, 지르코니아는 1,200,000원, 골드는 1,200,000~1,450,000원이며 뼈이식 필요 여부는 3D CT 진단 후 투명 안내합니다.',
      },
      {
        question: '보철 수명 동안 나사가 풀리면 AS가 가능한가요?',
        answer: '정품 규격 픽스처를 식립한 경우 호환 드라이버와 보증 기준에 따라 재조임 및 교합 점검을 원내에서 신속히 지원해 드립니다.',
      },
    ],
    citations: [CIT_JUNG_2012, CIT_HIRA],
    reviewedByIds: ['lee', 'park'],
    lastReviewed: '2026-11-20',
    relatedTreatmentUrl: '/price',
    relatedTreatmentLabel: '심평원 고지 비급여 수가표 확인',
    relatedGlossaryIds: ['implant-fixture', 'implant-brand-warranty', 'hira-non-covered'],
  },
  {
    slug: 'custom-abutment-vs-stock-abutment',
    category: '임플란트·재수술',
    question: '임플란트 맞춤형 지대주(커스텀 어버트먼트)는 기성 지대주와 무엇이 다른가요?',
    shortAnswer:
      '기성 지대주(Stock Abutment)는 획일화된 원통 규격으로 제작돼 잇몸 높이와 인접 치아 간격이 제각각인 실제 구강에서 틈새가 남기 쉽습니다. 반면 3D 스캔과 원내 자체 기공소 협업을 통해 제작한 맞춤형 커스텀 지대주는 잇몸 라인과 교합력을 정밀하게 받쳐 주어 음식물 끼임, 접착제 잔류 염증(PMID 29926955), 크라운 파절 위험을 줄이는 데 유리합니다.',
    summaryPoints: [
      '잇몸 두께와 경계 높이에 맞춰 지대주 마진을 설정해 보철 접착제 잔류로 인한 임플란트 주위염 위험을 낮춥니다.',
      '상부 크라운의 도재·지르코니아 두께를 균일하게 지지해 씹는 힘이 강한 어금니에서 보철 파절을 예방합니다.',
      '나사 유지형(SCRP) 설계와 결합 시 추후 보철물 탈부착·세정이 수월해 장기 유지관리에 유리합니다.',
    ],
    criteriaTable: [
      {
        label: '기성 지대주 (Stock)',
        detail: '규격화된 기성품 기둥 사용',
        clinicalCheck: '잇몸이 너무 깊거나 인접 치아 간격이 넓으면 음식물 끼임 증가 가능',
      },
      {
        label: '맞춤형 커스텀 지대주',
        detail: '환자 잇몸 형태·각도에 맞춰 CAD/CAM 맞춤 밀링 제작',
        clinicalCheck: '잇몸 경계부 밀착과 저작력 분산 우수, 원내 자체 기공소 미세 조정',
      },
      {
        label: '전치부 심미 지르코니아',
        detail: '앞니 잇몸이 얇아 금속 어버트먼트가 비칠 우려가 있는 부위',
        clinicalCheck: '치아 색조와 유사한 지대주 선택으로 잇몸 검게 비침 예방',
      },
    ],
    whenNotNeededOrCaution:
      '맞춤형 지대주 역시 최종 보철 장착 시 잇몸 아래 시멘트 접착제가 미세하게 남으면 주위염의 원인이 될 수 있으므로 나사 홀 접근(SCRP)과 잔여 시멘트 완전 제거 확인이 반드시 동반되어야 합니다.',
    faqFollowups: [
      {
        question: '기존에 기성 지대주로 한 임플란트도 음식물이 자꾸 끼면 커스텀으로 바꿀 수 있나요?',
        answer: '픽스처가 뼈에 튼튼히 유착되어 있고 내부 나사 규격이 호환된다면 기존 픽스처를 뽑지 않고 상부 지대주와 크라운만 맞춤형으로 교체 제작할 수 있는 경우가 많습니다.',
      },
      {
        question: '나사 유지형과 시멘트 유지형 보철 중 어느 쪽이 좋은가요?',
        answer: '유지관리 시 보철물을 손상 없이 분리해 치주 세정·나사 재조임을 할 수 있는 나사 홀 병행형(SCRP)을 임상 상황에 따라 우선 검토합니다.',
      },
    ],
    citations: [CIT_BERGLUNDH_2018, CIT_JUNG_2012],
    reviewedByIds: ['lee', 'park'],
    lastReviewed: '2026-11-20',
    relatedTreatmentUrl: '/warranty',
    relatedTreatmentLabel: '원내 자체 기공소 · 정품 보증 안내',
    relatedGlossaryIds: ['custom-abutment', 'implant-prosthesis-screw', 'in-house-dental-lab'],
  },
  {
    slug: 'immediate-vs-delayed-implant-timing',
    category: '임플란트·재수술',
    question: '치아를 뽑은 날 바로 임플란트를 심는 즉시 식립과 기다렸다 심는 지연 식립 중 무엇이 안전한가요?',
    shortAnswer:
      '치아 뿌리 끝 급성 염증이 심하지 않고 발치 주변 치조골 벽과 초기 고정력이 충분히 확보된 경우에는 발치 당일 즉시 임플란트 식립으로 수술 횟수와 잇몸 수축을 줄일 수 있습니다. 반대로 뿌리 끝 고름·골 파괴가 큰 상태에서는 염증 제거와 잇몸뼈 회복 후 지연 식립을 선택하는 것이 장기 생존율 면에서 훨씬 안전합니다(PMID 23062124, 12787222).',
    summaryPoints: [
      '즉시 식립 여부는 환자 희망이 아니라 3D CT 상 잔존 치조골 두께와 염증 범위로 객관적 판단합니다.',
      '앞니처럼 잇몸 형태 보존이 중요한 부위는 골 조건 충족 시 즉시 식립+임시치아 검토가 가능합니다.',
      '급성 염증을 억지로 덮고 즉시 식립하면 초기 골유착 실패로 재수술이 필요해질 수 있습니다.',
    ],
    criteriaTable: [
      {
        label: '발치 즉시 식립 (Immediate)',
        detail: '뿌리 끝 큰 염증이 없고, 발치 후에도 픽스처를 잡아줄 잔존 골이 충분한 경우',
        clinicalCheck: '잇몸 재절개 최소화 및 치료 기간 2~3개월 단축 가능',
      },
      {
        label: '조기 · 지연 식립 (Delayed)',
        detail: '치근단 낭종·잇몸뼈 파괴가 심하거나 치조골 벽이 한쪽 이상 무너진 경우',
        clinicalCheck: '발치 및 염증 완전 제거(소파술) → 필요 시 골이식 안정화 후 안전한 식립',
      },
      {
        label: '상부 보철 연결 (Loading)',
        detail: '초기 고정 토크 수치와 골질에 따른 최종 치아 제작 시기',
        clinicalCheck: '무리한 조기 저작을 피하고 3D CT·타진 검사로 골유착 완료 확인',
      },
    ],
    whenNotNeededOrCaution:
      '홍보 문구만 보고 모든 치아를 무조건 당일 즉시 임플란트·당일 보철로 끝내려 하면 골유착이 불안정해져 몇 달 내 임플란트가 빠지거나 주변 뼈가 더 크게 녹는 부작용이 발생할 수 있습니다.',
    faqFollowups: [
      {
        question: '일본 등 해외에서 방한하는 경우에도 기간을 무리하지 않고 단축할 수 있나요?',
        answer: '네. 1차 방문 시 3D CT 진단과 발치·식립(또는 뼈이식)을 진행하고, 골유착 안정화 기간 뒤 2차 방문 때 최종 보철을 완성하는 2~4회 단계별 방한 일정을 안전 범위 내에서 설계해 드립니다.',
      },
      {
        question: '치아를 뽑기 전에 신경치료로 살릴 수 있는지 먼저 봐주시나요?',
        answer: '네. 수직 치근 파절이 아니라면 재신경치료 및 치주치료로 자연치아를 보존할 수 있는지 먼저 판독한 뒤 발치를 결정합니다.',
      },
    ],
    citations: [CIT_JUNG_2012, CIT_HAMMERLE_2002],
    reviewedByIds: ['lee', 'park'],
    lastReviewed: '2026-11-20',
    relatedTreatmentUrl: '/treatments/implant',
    relatedTreatmentLabel: '3D CT 정밀 임플란트 안내 보기',
    relatedGlossaryIds: ['immediate-implant', 'osseointegration', 'gbr-bone-graft'],
  },
  {
    slug: 'laminate-enamel-vs-dentin-bond-lifespan',
    category: '라미네이트·심미보철',
    question: '라미네이트 시 치아 삭제 깊이가 조금만 커져도 왜 탈락과 시림이 급격히 늘어나나요?',
    shortAnswer:
      '치아 가장 바깥층인 법랑질(에나멜)은 무기질 비율이 높아 세라믹 레진 시멘트와 매우 견고한 미세기계적 결합을 이루지만, 그 안쪽 상아질이 노출되면 수분·세관 구조 때문에 접착력과 내구성이 떨어지고 치수(신경) 자극에 따른 시림이 커집니다. 실제로 2025년 메타분석(Alqutaibi et al., PMID 38604905)에서도 법랑질 내 접착된 세라믹 비니어가 상아질 노출 사례보다 유의하게 높은 생존율과 낮은 합병증을 보였습니다.',
    summaryPoints: [
      '법랑질 두께는 부위별로 0.3~1.0mm 내외이므로 무삭제 또는 0.1~0.2mm 최소 다듬기로 상아질 노출을 차단해야 합니다.',
      '상아질이 노출되면 접착 탈락(debonding)과 변연 변색, 이차 충치 및 신경치료 가능성이 함께 높아집니다.',
      '돌출량이 커서 법랑질 내 삭제만으로 배열이 어렵다면 라미네이트 전에 3~6개월 부분교정을 먼저 권해드립니다.',
    ],
    criteriaTable: [
      {
        label: '100% 법랑질 내 접착',
        detail: '무삭제 제로쉘 또는 0.1~0.2mm 최소 다듬기',
        clinicalCheck: '최대 접착 강도 유지, 마취 없이 또는 최소 마취로 시림 예방',
      },
      {
        label: '법랑질 · 상아질 혼합 노출',
        detail: '부분적인 각도 수정·기존 오래된 보철 제거 케이스',
        clinicalCheck: '즉각 상아질 밀봉(IDS) 및 교합 간섭 제거로 과부하 차단',
      },
      {
        label: '광범위 상아질 삭제',
        detail: '돌출 치아를 교정 없이 과도하게 깎아 억지로 넣는 시술',
        clinicalCheck: '본원 지양 프로토콜 — 선 부분교정 후 최소삭제 전환 권장',
      },
    ],
    whenNotNeededOrCaution:
      '타 치과에서 이미 치아를 크게 삭제해 시림이나 신경 손상 직전 상태인 경우에는 무조건 더 얇고 투명한 라미네이트를 씌우기보다 지대치(내부 치아) 색조를 가릴 수 있는 강도·투명도와 교합안정을 함께 설계해야 합니다.',
    faqFollowups: [
      {
        question: '무삭제 라미네이트도 접착력이 떨어지지 않나요?',
        answer: '오히려 온전한 법랑질 표면 위에 적절한 산부식과 실란·레진 시멘트 접착 프로토콜을 적용할 때 가장 안정적인 장기 결합력을 얻을 수 있습니다.',
      },
      {
        question: '법랑질 보존 여부는 시술 전에 확인할 수 있나요?',
        answer: '3D 구강스캔 모형에서 현재 치아 돌출량과 예상 세라믹 두께(0.2mm 내외)를 시뮬레이션해 치아를 깎을지 여부와 부위별 삭제량을 사전에 설명해 드립니다.',
      },
    ],
    citations: [CIT_ALQUTAIBI_2025, CIT_MORIMOTO_2016],
    reviewedByIds: ['park', 'lee'],
    lastReviewed: '2026-11-20',
    relatedTreatmentUrl: '/treatments/aesthetic/safety',
    relatedTreatmentLabel: '법랑질 보존 · 신경보호 프로토콜 보기',
    relatedGlossaryIds: ['enamel-preservation', 'zeroshell-no-prep', 'minimal-prep-laminate'],
  },
  {
    slug: 'peg-lateral-small-front-teeth-zeroshell',
    category: '라미네이트·심미보철',
    question: '선천적으로 앞니가 작은 왜소치(작은 치아)인데, 레진과 무삭제 제로쉘 라미네이트 중 무엇이 맞나요?',
    shortAnswer:
      '옆니(측절치)가 선천적으로 작고 양옆에 틈이 있는 왜소치는 치아를 깎지 않는 무삭제 제로쉘 세라믹의 가장 이상적인 적응증입니다. 당일 비용 부담이 적고 미세한 모서리 보완만 필요하다면 레진 수복도 가능하지만, 5~10년 이상의 변색 저항성과 잇몸 라인 자연스러움 면에서는 맞춤 세라믹이 유리합니다(PMID 26757327).',
    summaryPoints: [
      '왜소치는 치아 자체가 작아 삭제할 공간이 이미 충분하므로 자연치아 손상 0에 가깝게 무삭제 세라믹을 부착할 수 있습니다.',
      '앞니 좌우 대칭 비율(황금비)이 어긋난 경우 인접 중절치와의 폭·길이 비율을 디지털 스캔으로 먼저 설계합니다.',
      '유지관리 편의를 원하지만 1~2개 치아만 소폭 보완하고 싶을 때는 레진과 세라믹의 수명·착색 차이를 비교 안내합니다.',
    ],
    criteriaTable: [
      {
        label: '복합 레진 수복',
        detail: '1회 내원 당일 완성 가능, 치아 삭제 없음',
        clinicalCheck: '시간 경과에 따른 커피·음식물 변색 및 모서리 마모로 정기 연마·교체 필요',
      },
      {
        label: '무삭제 제로쉘 세라믹',
        detail: '왜소치의 작은 외형을 깎지 않고 감싸는 초박막 세라믹',
        clinicalCheck: '변색 거의 없음, 법랑질 보존(PMID 26757327), 보통 2~3회 내원 완성',
      },
      {
        label: '부분교정 + 무삭제 병행',
        detail: '왜소치 위치가 비대칭으로 쏠려 공간 배분이 고르지 않은 경우',
        clinicalCheck: '3~4개월 간단 배열 후 좌우 대칭 폭 확보 → 1~2개만 무삭제 완성',
      },
    ],
    whenNotNeededOrCaution:
      '치아가 작기는 하지만 위아래 교합이 너무 꽉 물려(과개교합) 아래 앞니가 위 앞니 안쪽에 강하게 부딪히는 경우에는 보철을 붙일 수직 공간이나 전치부 유도 각도를 먼저 확인해야 파절을 막을 수 있습니다.',
    faqFollowups: [
      {
        question: '왜소치 2개만 무삭제 제로쉘을 해도 주변 원래 치아와 색이 어우러지나요?',
        answer: '네. 원내 자체 기공소에서 주변 자연치아의 반투명도·질감·명도를 직접 대조해 색조를 맞추기 때문에 1~2개 단독 시술도 이질감이 적습니다.',
      },
      {
        question: '나이가 어려도 왜소치 라미네이트를 할 수 있나요?',
        answer: '잇몸 위치와 악골 성장이 완료되는 만 18세 이후에 권장되며, 성장기라면 먼저 레진 임시 보완 또는 교정적 공간 유지 후 성인기에 세라믹을 진행합니다.',
      },
    ],
    citations: [CIT_MORIMOTO_2016, CIT_ALQUTAIBI_2025],
    reviewedByIds: ['park', 'kim'],
    lastReviewed: '2026-11-20',
    relatedTreatmentUrl: '/treatments/aesthetic/compare',
    relatedTreatmentLabel: '제로쉘 · 최소삭제 · 부분교정 4방식 비교',
    relatedGlossaryIds: ['peg-lateral', 'zeroshell-no-prep', 'in-house-dental-lab'],
  },
  {
    slug: 'gummy-smile-crown-lengthening-stability',
    category: '라미네이트·심미보철',
    question: '웃을 때 잇몸이 많이 보이는 거미스마일 잇몸 성형(치관연장술) 후 다시 잇몸이 내려오지는 않나요?',
    shortAnswer:
      '단순히 잇몸 살만 레이저로 살짝 절제하면 잇몸의 생물학적 폭경(원래 치조골과의 적정 거리) 때문에 몇 달 내 다시 잇몸이 내려와 재발하는 경우가 많습니다(PMID 37251724, 27535216). 재발을 막으려면 3D CT로 치조골 경계를 먼저 계측하고, 치주과 전문의가 필요한 범위의 치조골 성형과 생물학적 폭경을 함께 조절해야 안정적인 라인이 유지됩니다.',
    summaryPoints: [
      '잇몸만 자르는 단순 치은절제술과 치조골 경계를 조절하는 치관연장술의 적응증을 3D CT·탐침 검진으로 구분합니다.',
      '거미스마일 원인이 턱뼈 수직 과성장이거나 앞니 뻐드러짐인 경우에는 잇몸 성형보다 치아교정이 근본 해결책입니다.',
      '보철(라미네이트·크라운)을 함께 진행할 경우 잇몸 조직 안정화(보통 4~8주)를 기다린 뒤 최종 인상을 채득합니다.',
    ],
    criteriaTable: [
      {
        label: '단순 잇몸 과증식',
        detail: '치조골 위치는 정상이나 치아를 덮은 잇몸 살만 두꺼운 경우',
        clinicalCheck: '치은절제술로 간단 개선, 생물학적 폭경 3mm 이상 확인',
      },
      {
        label: '치조골 상방 위치 · 짧은 치아',
        detail: '잇몸뼈까지 치아 머리 쪽으로 높게 내려와 있는 수동적 맹출 지연',
        clinicalCheck: '치주과 전문의 박선혜 원장 미세 치조골 성형 동반 치관연장술 (재발 억제)',
      },
      {
        label: '골격성 · 치성 거미스마일',
        detail: '위턱 앞니가 아래로 길게 정출되었거나 윗입술 근육이 크게 올라가는 경우',
        clinicalCheck: '김준헌 병원장 교정용 미니스크류 앞니 함입 교정 우선 검토',
      },
    ],
    whenNotNeededOrCaution:
      '치주조직이 얇아 치아 뿌리 노출이나 치간 블랙트라이앵글(잇몸 사이 빈 공간) 위험이 큰 경우에는 잇몸 성형만으로 억지로 치아를 길게 보이게 해서는 안 됩니다.',
    faqFollowups: [
      {
        question: '잇몸 성형과 라미네이트를 같은 주에 바로 끝내면 안 되나요?',
        answer: '잇몸 성형 직후에는 부기와 조직 재형성이 진행되므로 최소한 1차 치유 확인 후, 특히 뼈 성형이 동반된 경우 4~8주 이상의 조직 안정화 이후 보철을 마쳐야 추후 잇몸 틈새 노출을 막을 수 있습니다.',
      },
      {
        question: '시술 후 회복 기간과 양치 관리는 어떻게 되나요?',
        answer: '당일 일상생활이 가능하며 약 1주일간 수술 부위 자극을 피하고 가글 관리와 연성 칫솔질 안내를 따라주시면 됩니다.',
      },
    ],
    citations: [CIT_CROWN_LENGTH_2023, CIT_CROWN_LENGTH_2016],
    reviewedByIds: ['park', 'kim'],
    lastReviewed: '2026-11-20',
    relatedTreatmentUrl: '/treatments/aesthetic/retreatment',
    relatedTreatmentLabel: '잇몸 라인 · 라미네이트 재시술 기준 보기',
    relatedGlossaryIds: ['gummy-smile-crown-lengthening', 'periodontist-collab', 'miniscrew-tad'],
  },
  {
    slug: 'one-day-office-whitening-sensitivity',
    category: '라미네이트·심미보철',
    question: '원데이 전문가 치아미백은 정말 하루 60분 만에 끝나고 시림 증상은 며칠이나 가나요?',
    shortAnswer:
      '식약처(KFDA) 정식 허가 고농도 과산화수소 약제와 광선 활성화 시스템을 사용하는 원데이 전문가 미백은 당일 약 60분(검진·스케일링·잇몸 보호제 도포·연속 조사) 내 밝기 개선이 가능합니다(PMID 39767997). 일시적인 지각과민(시림)은 대부분 24~48시간 이내 자연 소실되며, 시술 전 미세 균열·충치·잇몸 퇴축을 먼저 차단하는 것이 핵심입니다(PMID 39078468).',
    summaryPoints: [
      '잇몸 보호제(Gingival Barrier)를 정밀하게 도포해 고농도 미백제가 잇몸에 닿는 화상·자극을 예방합니다.',
      '기존 치아에 미세 금(균열)이나 치경부 마모(패임)가 있다면 해당 부위를 먼저 보호 처리한 뒤 미백을 진행합니다.',
      '라미네이트·레진·크라운 같은 기존 보철물은 미백제로 하얘지지 않으므로 보철 교체 전 미백 순서를 잡아야 합니다.',
    ],
    criteriaTable: [
      {
        label: '1DAY 원내 전문가 미백',
        detail: '단시간(약 60분) 내 빠른 톤업이 필요한 결혼·면접·단기 방한 고객',
        clinicalCheck: '당일 파노라마 검진·치석 제거·잇몸 보호제·3회 연속 광조사 원스톱',
      },
      {
        label: '민감 치아 단계 조절 케어',
        detail: '원래 찬물에 시리거나 치아 끝 법랑질이 얇은 환자',
        clinicalCheck: '탈감작제(질산칼륨·하이드록시아파타이트 등) 전후 도포 및 조사 시간 조절',
      },
      {
        label: '라미네이트 병행 시 순서',
        detail: '밝은 치아 톤으로 전체 스마일을 맞추고 싶은 경우',
        clinicalCheck: '자연치아 미백 → 1~2주 색조 안정화 → 최종 세라믹 색조 결정',
      },
    ],
    whenNotNeededOrCaution:
      '선천적 테트라사이클린 변색(진한 회색·줄무늬)이나 신경 괴사로 한 개 치아만 검게 변한 경우에는 일반 전문가 미백만으로 한계가 있어 실활치 내부 미백이나 제로쉘 심미보철을 함께 상담해야 합니다.',
    faqFollowups: [
      {
        question: '미백 직후 커피나 카레는 며칠간 피해야 하나요?',
        answer: '미백 직후 48시간 동안은 법랑질 표면 탈수 상태가 남아 착색에 민감하므로 커피·홍차·레드와인·카레·김치 등 진한 색소 음식을 피하고 물로 자주 헹구는 것이 좋습니다.',
      },
      {
        question: '일본인 방한 환자도 출국 전 하루 안에 받을 수 있나요?',
        answer: '네. 일본어 전용 안내(/ja/whitening)를 통해 예약 시 약 60분 일정으로 스케일링과 원데이 미백을 하루에 완료할 수 있습니다.',
      },
    ],
    citations: [CIT_WHITENING_2024, CIT_DESENSITIZING_2024],
    reviewedByIds: ['park', 'lee'],
    lastReviewed: '2026-11-20',
    relatedTreatmentUrl: '/treatments/aesthetic/easy-white',
    relatedTreatmentLabel: '이지화이트 · 원데이 미백 안내 보기',
    relatedGlossaryIds: ['office-whitening', 'enamel-preservation', 'stump-shade'],
  },
  {
    slug: 'bruxism-laminate-nightguard-fracture',
    category: '라미네이트·심미보철',
    question: '밤에 이갈이나 이악물기 습관이 있어도 라미네이트나 세라믹 보철을 할 수 있나요?',
    shortAnswer:
      '수면 중 이갈이·이악물기(Bruxism)가 있는 분도 정밀 교합 조정과 턱관절에 맞춘 딱딱한 교합안정장치(나이트가드/스플린트) 착용, 그리고 고강도 세라믹 설계를 병행하면 라미네이트·임플란트 보철 파절을 상당 부분 예방할 수 있습니다. 다만 상·하악 앞니 끝이 맞닿는 절단교합이나 심한 파절력이 교정되지 않은 상태에서는 보철 전 교합 개입(또는 부분교정)이 우선입니다.',
    summaryPoints: [
      '세라믹 끝단이 부딪히는 측방·전방 교합 간섭을 정밀 교합지·디지털 스캔으로 제거하는 것이 첫 번째 조건입니다.',
      '이갈이가 강한 경우 심미성만 강조한 얇은 장석 도재 대신 고강도 리튬 디실리케이트 또는 맞춤 지르코니아 구조를 검토합니다.',
      '완료 후 맞춤형 나이트가드를 수면 중 착용하면 세라믹·임플란트 나사·자연치아 마모를 동시에 보호합니다.',
    ],
    criteriaTable: [
      {
        label: '경미~중등도 이악물기',
        detail: '어금니 교합 높이가 안정적이고 전치부 닿는 각도가 정상인 경우',
        clinicalCheck: '고강도 세라믹(리튬 디실리케이트) + 수면용 맞춤 보호장치 병행',
      },
      {
        label: '심한 이갈이 · 치아 마모',
        detail: '앞니 끝이 이미 짧게 닳아 있고 턱관절 통증 동반',
        clinicalCheck: '보철 전 이봉진 대표원장 교합·턱관절 스플린트 안정화 및 수직 고경 평가',
      },
      {
        label: '반대교합 · 절단교합 동반',
        detail: '아래 앞니가 위 앞니 끝을 직접 치는 교합',
        clinicalCheck: '보철 단독 시술 시 파절률 급증 → 김준헌 병원장 부분·전체 교정 우선 권장',
      },
    ],
    whenNotNeededOrCaution:
      '이갈이 때문에 치아 길이가 짧아진 상태에서 단순히 치아 끝만 길게 붙이면 수개월 내 가장 먼저 깨집니다. 교합을 튼튼히 받쳐주지 못할 때는 반드시 원내 교정·보철 협진으로 물리는 힘의 방향부터 조절해야 합니다.',
    faqFollowups: [
      {
        question: '기성품 실리콘 마우스피스를 사서 끼고 자면 안 되나요?',
        answer: '말랑말랑한 저가 기성품은 오히려 수면 중 씹는 반사를 자극해 이악물기 힘을 키우고 교합을 틀어지게 할 수 있으므로 구강 스캔으로 제작한 단단한 맞춤 안정장치가 권장됩니다.',
      },
      {
        question: '투명교정 장치(인비절라인)가 이갈이 보호 역할도 하나요?',
        answer: '투명교정 장치는 교정 기간 동안 치아 맞물림 완충 작용을 일부 도와주지만(PMID 41841364), 교정 완료 후 심한 이갈이 환자는 별도의 두꺼운 교합안정장치로 전환해야 내구성이 유지됩니다.',
      },
    ],
    citations: [CIT_MORIMOTO_2016, CIT_BRUXISM_ALIGNER],
    reviewedByIds: ['lee', 'park', 'kim'],
    lastReviewed: '2026-11-20',
    relatedTreatmentUrl: '/treatments/aesthetic/retreatment',
    relatedTreatmentLabel: '교합 기반 라미네이트 파절 재시술 보기',
    relatedGlossaryIds: ['bruxism-nightguard', 'lithium-disilicate-emax', 'tmj-occlusion'],
  },
  {
    slug: 'orthodontics-root-resorption-prevention',
    category: '치아교정·재교정',
    question: '치아교정 중에 치아 뿌리가 짧아지는(치근 흡수) 부작용은 왜 생기며 어떻게 예방하나요?',
    shortAnswer:
      '치아교정 중 치근 흡수(OIIRR)는 과도한 교정력, 장기간의 치료 지속, 특히 위 앞니를 무리하게 뒤·위로 당기는 큰 토크·함입 이동과 연관이 높다는 체계적 문헌고찰 결과가 보고되어 있습니다(PMID 33215186, 36206494). 예방을 위해서는 교정 시작 전 3D CT와 Quick-Ceph로 기존 치근 길이와 치조골 두께를 정밀 계측하고, 생리적인 약한 힘으로 주치의가 직접 속도와 각도를 조절하는 것이 핵심입니다.',
    summaryPoints: [
      '재교정이거나 과거 앞니 외상 이력이 있는 환자는 교정 전 3D CT 상 치근 길이를 반드시 먼저 확인해야 합니다.',
      '발치 공간을 한꺼번에 빠른 속도로 닫으려 무리한 힘을 주면 치조골 벽과 부딪혀 치근 흡수가 가속됩니다.',
      '김준헌 병원장이 중간 검진 파노라마·CT로 치근 변화를 추적하며 이동 방향과 힘의 크기를 직접 조절합니다.',
    ],
    criteriaTable: [
      {
        label: '치료 전 3D CT 위험 선별',
        detail: '원래 치근이 짧거나(단치근) 얇은 피질골을 가진 환자',
        clinicalCheck: '이동 범위 최소화, 비발치 또는 간헐적 약한 생리적 교정력 적용',
      },
      {
        label: '치료 중 정기 방사선 모니터링',
        detail: '발치 후 공간 폐쇄 및 앞니 견인 단계',
        clinicalCheck: '6~9개월 주기 치근 끝 상태 확인 및 2~3개월 휴지기(Force pause) 탄력 운용',
      },
      {
        label: '투명교정 · 간헐적 힘 분배',
        detail: '치주 지원이 약하거나 치근 보호가 우선인 재교정 사례',
        clinicalCheck: '단위 단계 이동량을 0.2mm 수준으로 쪼개는 인비절라인 검토(PMID 31323701)',
      },
    ],
    whenNotNeededOrCaution:
      '초진 방사선 검사상 이미 앞니 뿌리가 정상 길이의 절반 이하로 극심하게 짧은 경우에는, 미용 목적의 대규모 치아 이동 교정보다 레진·미소 다듬기 등 치아를 움직이지 않는 대안을 우선 검토하는 것이 치아 수명을 지키는 길입니다.',
    faqFollowups: [
      {
        question: '치근 흡수가 조금 진행되면 치아가 바로 빠지나요?',
        answer: '경미한 치근 끝 둥글어짐(1~2mm)은 교정 환자 다수에서 관찰되나 교합과 잇몸뼈가 건강하면 장기 유지에 큰 문제가 없습니다. 핵심은 조기에 발견해 과도한 힘을 중단하는 것입니다.',
      },
      {
        question: '중간에 담당 의사가 바뀌는 치과에서 치근 흡수 위험이 더 높아질 수 있나요?',
        answer: '장기 교정 중 주치의가 교체되면 이전 힘 적용 방향과 치근 변화 이력의 연속성이 끊기기 쉽습니다. 본원은 교정학 박사 김준헌 병원장이 처음부터 끝까지 1:1 전담합니다.',
      },
    ],
    citations: [CIT_ROOT_RESORPTION_2021, CIT_FIXED_RESORPTION_2022, CIT_ALIGNER_RESORPTION_2019],
    reviewedByIds: ['kim', 'park'],
    lastReviewed: '2026-11-20',
    relatedTreatmentUrl: '/treatments/orthodontics',
    relatedTreatmentLabel: '1:1 교정학 박사 정밀 교정시스템 보기',
    relatedGlossaryIds: ['root-resorption', 'quick-ceph-3dct', 're-orthodontics'],
  },
  {
    slug: 'clear-aligner-vs-fixed-periodontal-pain',
    category: '치아교정·재교정',
    question: '인비절라인 투명교정과 클리피씨·세라믹 고정식 교정은 잇몸 건강과 통증에서 어떤 차이가 있나요?',
    shortAnswer:
      '체계적 문헌고찰(PMID 42270616)에 따르면 투명교정(인비절라인)은 장치를 빼고 양치할 수 있어 치태 축적과 잇몸 염증 지표 관리에 유리하고 초기 구강 궤양·연조직 자극이 적은 편입니다. 다만 발치 후 큰 치아 뿌리 이동(평행 이동)이 필요한 돌출입은 고정식 장치나 미니스크류 병행이 정밀도 면에서 유리할 수 있어 증례에 따라 객관적으로 비교해야 합니다.',
    summaryPoints: [
      '잇몸이 약하거나 치주 질환 이력이 있는 성인은 양치와 치간칫솔 사용이 자유로운 인비절라인이 잇몸 보존에 유리할 수 있습니다.',
      '고정식 자가결찰 브라켓(클리피씨 등)은 24시간 지속 힘이 걸리므로 환자 착용 협조도 의존도가 적고 발치·회전 조절에 강합니다.',
      '어떤 장치를 쓰든 한국어·일본어 원격 사진·LINE 체크와 정기 내원으로 치주과 전문의의 잇몸 점검을 함께 연결합니다.',
    ],
    criteriaTable: [
      {
        label: '잇몸 위생 · 통증 편의성',
        detail: '치주염 병력 성인, 대인관계·방송·해외 체류 직장인',
        clinicalCheck: '인비절라인 투명교정 (착탈 양치로 치주 지수 유리 · PMID 42270616)',
      },
      {
        label: '큰 발치 이동 · 난해한 뿌리 각도',
        detail: '심한 돌출입, 매복치 견인, 큰 폭의 구치 이동',
        clinicalCheck: '클리피씨/세라믹 고정식 또는 설측 + 부분 투명교정 하이브리드 검토',
      },
      {
        label: '착용 협조도 변수',
        detail: '하루 20~22시간 장착 시간 준수가 어려운 경우',
        clinicalCheck: '착용 시간 부족 시 인비절라인 효과 저하 → 고정식 장치 선택이 안전',
      },
    ],
    whenNotNeededOrCaution:
      '하루 20시간 이상 장치를 끼우기 어려운 생활 패턴인데 단순히 안 보인다는 이유만으로 투명교정을 선택하면 치아가 계획대로 움직이지 않고 어금니 교합이 뜨는 부작용이 생길 수 있습니다.',
    faqFollowups: [
      {
        question: '일본 등 해외에서 살면서도 화이트스타일치과에서 인비절라인 교정을 할 수 있나요?',
        answer: '네. 초기 3D 스캔 및 맞춤 장치 세팅 후 일본에 계신 동안에도 전담 통역 3명과 LINE으로 착용 경과를 확인하며 장기 내원 간격(예: 2~3개월 이상 간격 조정 상담)을 맞춰 드립니다.',
      },
      {
        question: '장치별 비용은 월비·유지장치 포함 총액으로 비교할 수 있나요?',
        answer: '네. 초진 진단 후 장치비·매월 내원비·유지장치·정밀진단비 포함 범위를 서면 견적으로 비교 안내해 드립니다.',
      },
    ],
    citations: [CIT_ALIGNERS_VS_FIXED, CIT_ALIGNER_RESORPTION_2019, CIT_KAO],
    reviewedByIds: ['kim', 'park'],
    lastReviewed: '2026-11-20',
    relatedTreatmentUrl: '/treatments/orthodontics/types',
    relatedTreatmentLabel: '인비절라인 · 설측 · 클리피씨 비교 보기',
    relatedGlossaryIds: ['invisalign', 'lingual-ortho', 'total-fee-ortho'],
  },
  {
    slug: 'protruding-mouth-extraction-vs-non-extraction',
    category: '치아교정·재교정',
    question: '돌출입 치아교정을 할 때 소구치를 꼭 뽑아야(발치) 하나요, 비발치로도 입이 들어가나요?',
    shortAnswer:
      '돌출입 교정의 발치 vs 비발치 선택은 유행이나 선호가 아니라 Quick-Ceph 측면 두부규격방사선과 3D CT 상 ① 앞니 각도, ② 입술·턱끝 안모 돌출량, ③ 턱뼈의 치조골 두께, ④ 잇몸 건강 상태로 결정합니다. 경증~중등도 돌출이면서 치아 폭이 넓고 치열궁 확장 여유가 있으면 비발치+치간 삭제(IPR)나 미니스크류 후방 이동으로 자연스럽게 넣고, 치조골 밖으로 뻗친 심한 골격성·치성 돌출은 발치를 해야 옥니나 잇몸 퇴축 없이 입매가 들어갑니다.',
    summaryPoints: [
      '무조건 비발치만 고집하면 치아가 앞쪽 뼈 경계를 넘어 잇몸뼈가 녹거나 치열이 더 뻗칠 위험이 있습니다.',
      '반대로 공간 부족이 심하지 않은데 과도하게 발치해 앞니를 당기면 입이 너무 들어가 보이는 옥니·팔자주름 심화가 나타납니다.',
      '교정학 박사 김준헌 병원장이 입술 두께·비순각·기도 공간까지 반영한 3D 시뮬레이션으로 두 경로를 투명하게 비교합니다.',
    ],
    criteriaTable: [
      {
        label: '비발치 · 치열 후방이동 / IPR',
        detail: '경증 돌출(2~3mm 내외), 입술이 얇거나 턱끝이 작아 함몰 우려가 있는 안모',
        clinicalCheck: '어금니 후방 치조골 공간 3D CT 확인 → 미니스크류·치간 삭제 병행',
      },
      {
        label: '소구치 발치 정밀 견인',
        detail: '치성 돌출이 크고(4mm 이상) 치열 총생(덧니)과 입 다물기 긴장이 동반된 경우',
        clinicalCheck: '앞니 토크(각도) 상실·옥니를 막기 위한 뿌리 이동 조절 & 중간 안모 점검',
      },
      {
        label: '골격성 양악 돌출 심화',
        detail: '치아 각도는 정상인데 위턱 뼈 자체가 크게 앞쪽으로 나온 상태',
        clinicalCheck: '치아교정만으로 가능한 최대 개선 범위를 한계까지 정직히 사전 설명',
      },
    ],
    whenNotNeededOrCaution:
      '이미 예전에 발치 교정을 한 뒤 앞니가 안으로 말려 들어가고 입 주변이 합죽해 보이는 상태에서 재교정을 할 때는 추가 발치 없이 악궁 확장과 치근 토크 회복을 중심으로 접근해야 합니다.',
    faqFollowups: [
      {
        question: '치간 삭제(IPR)는 치아에 해롭지 않나요?',
        answer: '법랑질 두께(약 1.0~1.5mm)의 극소 일부인 편측 0.1~0.25mm 수준으로 제한해 정밀 연마·불소 도포를 시행하므로 상아질 노출이나 충치 위험이 거의 없습니다.',
      },
      {
        question: '교정 중간에 입 들어간 정도를 보고 조절을 멈출 수 있나요?',
        answer: '네. 특히 발치 교정 시에는 공간이 70~80% 닫힌 시점에서 매월 입술 돌출량을 함께 거울·사진으로 확인하며 마무리 방향을 조율합니다.',
      },
    ],
    citations: [CIT_KAO, CIT_ROOT_RESORPTION_2021],
    reviewedByIds: ['kim'],
    lastReviewed: '2026-11-20',
    relatedTreatmentUrl: '/treatments/orthodontics',
    relatedTreatmentLabel: '돌출입 비발치·발치 교정 기준 보기',
    relatedGlossaryIds: ['non-extraction-ortho', 'ipr-stripping', 'okni-torque'],
  },
  {
    slug: 'orthodontics-retainer-wear-duration',
    category: '치아교정·재교정',
    question: '치아교정이 끝난 후 유지장치(리테이너)는 몇 년 동안 끼어야 재발을 막을 수 있나요?',
    shortAnswer:
      '치아는 교정 장치를 뗀 직후 수개월~1년간 주변 치주인대와 잇몸 섬유가 새로운 위치에 재형성되며 가장 활발히 원래 자리로 돌아가려 하고, 이후에도 평생 노화·씹는 힘·혀 밀기 습관으로 미세하게 이동합니다(PMID 3469910). 따라서 치아 안쪽 고정식 유지장치와 투명 가철식 유지장치를 이중으로 병행하며 초기 6~12개월 집중 착용 후 야간 수면 시 장기 유지를 권하는 것이 대한치과교정학회 표준 권고입니다.',
    summaryPoints: [
      '교정 직후 6~12개월은 치주 섬유가 자리를 잡는 골든타임이므로 가철식 유지장치 착용 시간을 철저히 지켜야 합니다.',
      '앞니 뒤쪽 고정식 철사 유지장치가 한 개 치아라도 떨어졌을 때 1~2주 내 내원해 재부착해야 한 개씩 틀어짐을 막습니다.',
      '화이트스타일치과는 교정 완료 후에도 3·6·12개월 이상 정기 점검으로 유지장치 탈락·잇몸 상태를 함께 살핍니다.',
    ],
    criteriaTable: [
      {
        label: '교정 완료 후 0~6개월',
        detail: '잇몸뼈·치주인대 재형성이 가장 활발해 재발 위험 최고조 시기',
        clinicalCheck: '고정식 유지장치 상시 유지 + 투명 가철식 하루 권장 시간 집중 착용',
      },
      {
        label: '6개월 ~ 2년 안정기',
        detail: '교합 접촉이 자리 잡으며 치아 동요도가 줄어드는 시기',
        clinicalCheck: '가철식 장치 야간 수면 중 착용 전환 및 정기 내원 점검',
      },
      {
        label: '2년 이후 평생 관리',
        detail: '자연 노화에 따른 미세한 치열 전방 쏠림 예방',
        clinicalCheck: '주 2~3회 수면 착용 + 스케일링 내원 시 고정식 접착 상태·치석 함께 확인',
      },
    ],
    whenNotNeededOrCaution:
      '고정식 유지장치 주변은 치석이 잘 쌓이는 부위이므로 양치질과 정기 스케일링을 소홀히 하면 앞니 안쪽 잇몸뼈가 오히려 내려앉을 수 있습니다. 장치를 오래 유지하려면 연 1~2회 치주 관리가 필수입니다.',
    faqFollowups: [
      {
        question: '유지장치를 몇 달 안 껴서 앞니가 약간 틀어졌는데 전체 교정을 다시 해야 하나요?',
        answer: '미세한 재발 초기에는 새 유지장치 조절이나 3~6개월 부분 투명 재교정만으로 원래 배열을 빠르게 회복할 수 있으니 틀어짐을 느낀 즉시 내원하시는 것이 비용·기간을 줄이는 방법입니다.',
      },
      {
        question: '유지장치 교체 비용이나 점검도 총액제에 포함되나요?',
        answer: '초기 1세트 유지장치 포함 기준과 파손·분실 시 재제작 비용, 정기 점검 기준을 치료 시작 전 서면으로 안내해 드립니다.',
      },
    ],
    citations: [CIT_KAO, CIT_RELAPSE_RESORPTION_1987],
    reviewedByIds: ['kim', 'park'],
    lastReviewed: '2026-11-20',
    relatedTreatmentUrl: '/qa/adult-re-orthodontics-relapse-okni',
    relatedTreatmentLabel: '성인 재교정 · 재발 예방 Q&A 보기',
    relatedGlossaryIds: ['retainer-fixed-removable', 're-orthodontics', 'recall-3-6-12'],
  },
  {
    slug: 'adult-orthodontics-gum-disease-collab',
    category: '치아교정·재교정',
    question: '잇몸이 약하고 치아가 흔들리는 40·50대 성인도 치아교정이 가능한가요?',
    shortAnswer:
      '잇몸병(치주염)이 활동성으로 진행 중일 때 교정력을 가하면 치조골 흡수가 급격히 빨라질 수 있으나, 보건복지부 인증 치주과 전문의가 먼저 잇몸 염증을 완전히 가라앉히고 치주 건강을 회복시킨 뒤(선행 치주치료), 치아교정 박사가 약하고 정밀한 힘으로 치아를 배열하면 40~60대 성인에서도 오히려 양치 관리가 쉬워지고 교합 외상이 줄어 자연치아 수명을 늘릴 수 있습니다(PMID 42270616).',
    summaryPoints: [
      '중장년 성인 교정은 미용보다 쓰러진 어금니를 세워 임플란트 공간을 확보하거나, 뻐드러져 흔들리는 앞니 교합을 안정시키는 목적이 큽니다.',
      '치주과 전문의 박선혜 원장이 교정 전·중·후 잇몸 주머니 깊이와 치석을 관리하여 블랙트라이앵글·잇몸 퇴축을 최소화합니다.',
      '필요 시 양치와 치주 위생 관리가 유리한 투명교정(인비절라인)을 우선 비교합니다.',
    ],
    criteriaTable: [
      {
        label: '1단계: 치주 안정화 선행',
        detail: '잇몸 출혈·부종·깊은 치주낭이 있는 상태',
        clinicalCheck: '박선혜 원장 잇몸치료·치근활택술 선행 → 염증 소실 확인 후 장치 부착',
      },
      {
        label: '2단계: 교합 외상 · 임플란트 연계',
        detail: '오래된 빈자리로 옆 어금니가 기울어 임플란트 식립이 어려운 상태',
        clinicalCheck: '김준헌 병원장 부분교정 직립 → 이봉진 대표원장 최소 침습 임플란트 완성',
      },
      {
        label: '3단계: 교정 중 치주 리콜',
        detail: '치조골이 얇아진 앞니 치간 삼각형·퇴축 예방 관리',
        clinicalCheck: '2~3개월 주기 전문의 스케일링·위생 체크 병행',
      },
    ],
    whenNotNeededOrCaution:
      '치아를 잡아주는 치조골의 2/3 이상이 이미 흡수되어 저작 시 심하게 흔들리는 치아에 교정 장치를 달면 발치 위험이 커지므로, 살릴 치아와 임플란트로 전환할 치아를 3인 협진으로 먼저 선별합니다.',
    faqFollowups: [
      {
        question: '어금니 임플란트를 하기 전에 치아교정으로 기울어진 치아를 세우면 무엇이 좋나요?',
        answer: '기울어진 옆 치아를 똑바로 세워주면 정상 크기의 임플란트 크라운을 심을 수 있고 음식물 끼임과 대합치 맹출(윗니 내려옴)을 바로잡을 수 있습니다.',
      },
      {
        question: '이미 다른 곳에 임플란트가 있는데 교정을 할 수 있나요?',
        answer: '임플란트는 뼈에 고정되어 움직이지 않지만, 나머지 자연치아의 이동 축이나 고정원으로 활용해 주변 치아를 교정할 수 있습니다.',
      },
    ],
    citations: [CIT_KAO, CIT_KPERIO, CIT_ALIGNERS_VS_FIXED],
    reviewedByIds: ['kim', 'park', 'lee'],
    lastReviewed: '2026-11-20',
    relatedTreatmentUrl: '/treatments/orthodontics',
    relatedTreatmentLabel: '중장년·치주협진 교정 안내 보기',
    relatedGlossaryIds: ['periodontist-collab', 're-orthodontics', 'periodontal-pocket'],
  },
  {
    slug: 'impacted-wisdom-tooth-nerve-3dct',
    category: '잇몸·보존·수가',
    question: '아래 매복 사랑니 발치 시 신경 손상(감각 마비) 위험을 어떻게 확인하고 예방하나요?',
    shortAnswer:
      '아래 턱뼈 속 하치조신경관과 사랑니 뿌리가 겹쳐 보이는 경우 일반 파노라마 엑스레이만으로는 앞뒤 실제 거리를 알 수 없습니다. 치과 전용 3D CT로 뿌리와 신경관의 입체 접촉 여부를 먼저 판독해 필요 시 3단계 무통 국소마취 하에 치아를 미세 분할 발치하고, 신경과 뿌리가 완전히 유착된 고위험 사례는 치관절제술(머리의 일부만 안전 제거, PMID 25890111)까지 검토해 영구적 신경 손상 위험을 최소화합니다.',
    summaryPoints: [
      '발치 전 3D CT 촬영(건강보험 급여 적용 적응증 확인)으로 신경관 주행 방향과 뿌리 굽음을 입체 파악합니다.',
      '큰 뼈 삭제 없이 치아 머리만 여러 조각으로 정밀 분할해 뽑으면 붓기와 신경 압박을 줄일 수 있습니다.',
      '전신 부담이 큰 수면마취 대신 의식을 유지한 채 반응 확인이 가능한 3단계 무통 국소마취를 원칙으로 합니다.',
    ],
    criteriaTable: [
      {
        label: '정상 맹출 · 신경 거리 확보',
        detail: '3D CT 상 신경관과 2mm 이상 떨어져 있는 사랑니',
        clinicalCheck: '당일 3단계 무통 국소마취 후 정밀 분할 발치 진행',
      },
      {
        label: '신경관 근접 · 갈고리 뿌리',
        detail: '뿌리가 하치조신경관에 맞닿아 있거나 감싸고 있는 고난도 매복',
        clinicalCheck: '3D CT 정밀 설명 후 미세 분할 또는 치관절제술(PMID 25890111) 대안 검토',
      },
      {
        label: '급성 사랑니 주위염 동반',
        detail: '잇몸이 붓고 입이 잘 안 벌어지거나 고름이 나오는 상태',
        clinicalCheck: '즉시 발치보다 소독·항생제 투약으로 급성 염증 진정 후 안전 발치',
      },
    ],
    whenNotNeededOrCaution:
      '증상이 전혀 없고 턱뼈 깊은 곳에 완전히 묻혀 주변 치아에 영향이나 낭종을 만들지 않으면서 신경관과 겹친 고령자의 매복 사랑니는 무리한 예방 발치보다 정기 방사선 추적 관찰이 더 안전할 수 있습니다.',
    faqFollowups: [
      {
        question: '매복 사랑니 발치 후 3D CT 비용도 건강보험 적용이 되나요?',
        answer: '매복 사랑니 뿌리가 하치조신경관과 겹쳐 판독이 필요한 경우 건강보험 급여 기준에 해당하며 원내 접수 시 적용 여부를 정확히 안내해 드립니다.',
      },
      {
        question: '토요일에도 사랑니 상담이나 발치가 가능한가요?',
        answer: '토요일은 10:00~14:00까지 진료하며, 당일 발치 가능 여부는 급성 염증 유무와 3D CT 신경 위치 확인 후 안내해 드립니다.',
      },
    ],
    citations: [CIT_CORONECTOMY_REVIEW, CIT_NHIS],
    reviewedByIds: ['lee', 'park'],
    lastReviewed: '2026-11-20',
    relatedTreatmentUrl: '/treatments/general/wisdom-tooth',
    relatedTreatmentLabel: '매복 사랑니 3D CT 안전 발치 보기',
    relatedGlossaryIds: ['inferior-alveolar-nerve', 'coronectomy', 'three-step-local-anesthesia'],
  },
  {
    slug: 'dental-scaling-nhis-annual-guide',
    category: '잇몸·보존·수가',
    question: '건강보험 스케일링 연 1회 적용 기준과 잇몸 출혈이 있을 때의 치주치료는 어떻게 다른가요?',
    shortAnswer:
      '만 19세 이상 건강보험 가입자는 매년 1월 1일~12월 31일 기준 연 1회 건강보험 적용 스케일링(치석 제거)을 받으실 수 있으며, 12월 31일이 지나면 해당 연도 혜택은 이월되지 않고 소멸합니다(NHIS 기준). 이미 잇몸이 깊게 패여 피가 나고 치석이 잇몸 속 뿌리까지 내려간 경우에는 단순 스케일링 후 보건복지부 인증 치주과 전문의의 잇몸치료(치근활택술·치주소파술)로 이어져 건강보험 급여 혜택을 적용받을 수 있습니다.',
    summaryPoints: [
      '잇몸 위쪽 눈에 보이는 치석을 제거하는 것이 스케일링이며, 잇몸 속 4mm 이상 치주낭 내 세균막·치석을 제거하는 것이 잇몸치료입니다.',
      '임플란트 주위염과 심혈관·당뇨 환자의 구강 염증 억제를 위해 최소 6~12개월 주기 스케일링이 권장됩니다.',
      '시술 시 시림이 걱정된다면 도포·가글 마취와 수온·초음파 출력 미세 조절로 편안하게 진행합니다.',
    ],
    criteriaTable: [
      {
        label: '연 1회 예방 스케일링',
        detail: '만 19세 이상 전 국민 (매년 1월 1일~12월 31일 1회 급여)',
        clinicalCheck: '잇몸 위 치석 제거 및 임플란트·유지장치 주변 정기 점검',
      },
      {
        label: '치주치료 (잇몸치료)',
        detail: '양치 시 잇몸 출혈·구취·잇몸 내려앉음(치주낭 깊이 4mm 이상)',
        clinicalCheck: '박선혜 원장(치주과 전문의) 진단 후 1/3~1/6악 단위 분할 치근활택술(건보 적용)',
      },
      {
        label: '3·6·12개월 리콜 관리',
        detail: '임플란트·교정·심미보철 완료 후 장기 유지 환자',
        clinicalCheck: '보철물 손상 없는 전용 팁 관리 및 잇몸 출혈 지수 추적',
      },
    ],
    whenNotNeededOrCaution:
      '출혈이 있다고 양치질을 피하면 치태가 치석으로 굳어 치주염이 더 심해집니다. 스케일링 직후 일시적으로 치아 사이가 시리거나 틈이 넓어진 느낌이 드는 것은 부었던 잇몸이 가라앉고 치석이 떨어지며 드러난 정상 회복 과정입니다.',
    faqFollowups: [
      {
        question: '올해 스케일링을 12월에 받으면 내년 1월에 바로 또 받을 수 있나요?',
        answer: '매년 1월 1일 기준으로 횟수가 초기화되므로 올해 12월에 받으셨더라도 내년 1월부터 새로운 연 1회 건강보험 스케일링을 이용하실 수 있습니다.',
      },
      {
        question: '라미네이트나 임플란트 한 치아도 일반 스케일링을 받으면 기스가 나지 않나요?',
        answer: '세라믹 보철이나 티타늄 임플란트 지대주 부위는 일반 금속 팁 대신 손상을 주지 않는 전용 케어 프로토콜로 세밀하게 관리합니다.',
      },
    ],
    citations: [CIT_NHIS, CIT_KPERIO],
    reviewedByIds: ['park'],
    lastReviewed: '2026-11-20',
    relatedTreatmentUrl: '/treatments/general/scaling',
    relatedTreatmentLabel: '치주과 전문의 스케일링·잇몸치료 보기',
    relatedGlossaryIds: ['scaling-root-planing', 'periodontal-pocket', 'recall-3-6-12'],
  },
  {
    slug: 'gangnam-ortho-implant-visit-schedule-short-stay',
    category: '잇몸·보존·수가',
    question: '지방이나 일본·해외에 거주 중인데, 임플란트나 라미네이트·교정을 짧은 일정으로 받을 수 있나요?',
    shortAnswer:
      '네. 강남역 화이트스타일치과의원은 강남역 11·12번 출구 도보 1분 거리의 교통 접근성과 원내 3D CT·구강스캐너·자체 기공소 협업, 그리고 전담 일본어 통역 스태프 3명 상주 시스템을 바탕으로 체류 일정이 짧은 지방·해외 환자를 위한 단계별 집중 내원 프로토콜을 운영합니다. 다만 골이식이 크게 필요한 임플란트나 발치 교정은 생물학적 치유 기간을 건너뛸 수 없으므로 안전 범위 내 최소 방문 횟수를 사전에 솔직히 설계해 드립니다.',
    summaryPoints: [
      '원데이 전문가 미백은 당일 약 60분 1회 방문으로 검진·스케일링·미백까지 완료됩니다.',
      '무삭제 제로쉘 · 최소삭제 라미네이트는 정밀 스캔 후 보통 2~3회 방문(체류 일정 조율 상담)으로 완성합니다.',
      '인비절라인 투명교정은 초기 장치 수령 후 해외 체류 중에도 LINE·카톡 사진 모니터링과 함께 방한 주기에 맞춰 내원 간격을 조율할 수 있습니다.',
    ],
    criteriaTable: [
      {
        label: '1DAY 원데이 미백',
        detail: '단기 체류 중 가장 빠른 밝기 개선',
        clinicalCheck: '당일 1회 내원(약 60분) 완료',
      },
      {
        label: '무삭제 · 최소삭제 라미네이트',
        detail: '원내 자체 기공소 실시간 색조·형태 조율',
        clinicalCheck: '보통 2~3회 내원 (단기 방한 전 LINE·카톡 사전 일정 상담 권장)',
      },
      {
        label: '3D CT 임플란트 (뼈이식 여부)',
        detail: '1차 식립 후 골유착 대기 → 2차 보철 제작',
        clinicalCheck: '단순 식립 2~3방문(녹는 실 활용) / 대규모 골이식 시 3~6개월 치유 필수',
      },
    ],
    whenNotNeededOrCaution:
      '뼈이식이 많이 필요한 임플란트나 심한 치주염 환자를 출국 일정 때문에 무리하게 며칠 만에 최종 보철까지 씌우면 골유착 실패로 귀국 후 큰 불편이 생기므로, 안전상 불가피한 회복 기간은 절대로 생략하지 않습니다.',
    faqFollowups: [
      {
        question: '일본어 통역 직통 전화나 사전 LINE 상담에서 예상 체류 일수를 알 수 있나요?',
        answer: '네. 내원 전 파노라마 사진이나 희망 일정을 LINE(whitestyle1) 또는 일본어 통역 직통(+82-10-3046-5010)으로 보내주시면 3명 전담 코디네이터가 원장단 확인 후 1차 예상 일정을 안내해 드립니다.',
      },
      {
        question: '토요일 진료 시간도 단기 방한 환자가 이용할 수 있나요?',
        answer: '토요일 오전 10시부터 오후 2시까지 점심시간 없이 연속 진료하므로 금·토 연계 방한 일정 조율이 가능합니다(목·일·공휴일 휴진).',
      },
    ],
    citations: [CIT_HIRA, CIT_KAO],
    reviewedByIds: ['kim', 'lee', 'park'],
    lastReviewed: '2026-11-20',
    relatedTreatmentUrl: '/ja',
    relatedTreatmentLabel: '단기 방한 · 일본어 전용 안내 보기',
    relatedGlossaryIds: ['in-house-dental-lab', 'zeroshell-no-prep', 'invisalign'],
  },
  {
    slug: 'how-to-avoid-factory-dental-clinic-gangnam',
    category: '잇몸·보존·수가',
    question: '강남역에서 공장형 치과나 주치의가 자주 바뀌는 치과를 피하려면 어떤 기준을 꼭 확인해야 하나요?',
    shortAnswer:
      '과잉 진료와 치료 중간 주치의 교체 위험을 피하려면 ① 상담 실장이 아닌 실제 집도·교정 원장이 직접 초진 계획을 설명하는지, ② 교정·임플란트·치주과 전문의 등 3개 분과 의료진의 실명과 약력이 공개되어 있는지, ③ 1994년 개원(33년 전통)처럼 한 장소에서 장기간 진료한 연속성과 영수증 인증 후기가 있는지, ④ 과도한 선납금 일시불 할인 대신 심평원(HIRA) 기준과 보증 범위가 서면 공개되는지 5가지를 대조해야 합니다.',
    summaryPoints: [
      '치료 시작 전 담당 원장의 성함·전공(교정학 박사, 치주과 전문의 등)과 끝까지 책임 진료 여부를 확인하세요.',
      '가격이 지나치게 낮게 광고된 경우 맞춤형 커스텀 지대주·뼈이식·월 치료비·유지장치가 별도 추가되는지 서면 견적으로 대조하세요.',
      '안 해도 되는 진료(예: 자연치아 보존 가능 시 발치 보류, 돌출 심한 경우 무리한 라미네이트 보류)를 솔직히 말해주는 치과를 선택하세요.',
    ],
    criteriaTable: [
      {
        label: '1. 대표원장 직접 진료 · 비변경',
        detail: '초진 진단부터 마무리·리콜까지 동일 의료진 책임 여부',
        clinicalCheck: '김준헌(교정)·이봉진(임플란트)·박선혜(치주) 3인 원장단 1:1 협진',
      },
      {
        label: '2. 한 위치 장기 업력 · 실명 검증',
        detail: '단기 개폐업·상호 변경 없는 장기 운영 및 사업자 공개',
        clinicalCheck: '1994년 개원 33년 전통 · 사업자 212-94-71989 · 모두닥·네이버 영수증 후기',
      },
      {
        label: '3. 서면 견적 · 비수면 안전 원칙',
        detail: '심평원(HIRA) 비급여 기준 공개 및 안전한 마취 프로토콜',
        clinicalCheck: '/price 투명 공개 · 수면마취 미시행(3단계 무통 국소마취)',
      },
    ],
    whenNotNeededOrCaution:
      '"오늘 바로 전액 결제 시 절반 할인"이나 "원장님 지정 불가·협진 배정" 조건을 내세우는 곳은 치료 도중 담당 의사가 교체되거나 재진 예약·AS가 지연될 위험이 높으므로 신중히 비교해야 합니다.',
    faqFollowups: [
      {
        question: '화이트스타일치과는 1994년 개원 이후 정말 같은 원장님이 계속 진료하시나요?',
        answer: '네. 1994년 개원한 김준헌 병원장이 현재까지 직접 진료하며, 이봉진 대표원장·박선혜 원장(보건복지부 인증 치주과 전문의) 3인 원장단 협진 체계를 변함없이 유지하고 있습니다.',
      },
      {
        question: '병원 공식 정보와 사업자·주소·의료진 약력은 한 페이지에서 볼 수 있나요?',
        answer: '네. 본원 홈페이지의 병원 공식 팩트 시트(/clinic-facts)와 비급여 수가표(/price), 보증·자체 기공소 안내(/warranty) 페이지에서 모든 기준을 투명하게 확인하실 수 있습니다.',
      },
    ],
    citations: [CIT_HIRA, CIT_KAO, CIT_KPERIO],
    reviewedByIds: ['kim', 'lee', 'park'],
    lastReviewed: '2026-11-20',
    relatedTreatmentUrl: '/clinic-facts',
    relatedTreatmentLabel: '화이트스타일치과 33년 공식 팩트 시트 보기',
    relatedGlossaryIds: ['hira-non-covered', 'periodontist-collab', 'non-sedation-safety'],
  },
];

export function getEvidenceQaBySlug(slug: string): EvidenceQaItem | undefined {
  return EVIDENCE_QA_LIST.find((item) => item.slug === slug);
}
