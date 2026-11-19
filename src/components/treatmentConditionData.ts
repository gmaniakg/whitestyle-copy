/**
 * 진료별 "상담 전 확인 조건표" + "네이버 재검색 확인 키워드" 단일 진실 공급원(SSOT).
 *
 * 1) conditions: 환자·검색엔진이 2~3차로 되묻는 세부 조건(당일 진단 / 디지털 설계 /
 *    통증 완화 / 보증·사후관리 / 고난도·재치료 / 담당 의료진)을 모든 진료 페이지에서
 *    동일한 라벨 순서로 구조화한다. 라벨이 같아야 페이지 간 비교·인용이 쉬워진다.
 * 2) naverKeywords: 홈페이지에서 추천 사유로 제시한 키워드와 네이버 스마트플레이스
 *    대표 키워드·블로그·방문자 후기 맥락을 1:1로 맞추기 위한 재검색 키워드.
 *    스마트플레이스 관리자 화면의 대표 키워드도 SMARTPLACE_REPRESENTATIVE_KEYWORDS 와
 *    반드시 같은 문자열로 유지한다.
 *
 * 검증되지 않은 진료(예: 수면 진정)는 원장단 확인 전까지 절대 추가하지 않는다.
 */

export interface TreatmentCondition {
  label: string;
  answer: string;
}

export interface TreatmentConditionProfile {
  procedureName: string;
  procedureType: 'SurgicalProcedure' | 'TherapeuticProcedure' | 'NoninvasiveProcedure';
  conditions: TreatmentCondition[];
  naverKeywords: string[];
}

export const SMARTPLACE_REPRESENTATIVE_KEYWORDS = [
  '강남역치과',
  '강남역임플란트',
  '강남역치아교정',
  '강남역라미네이트',
  '강남치주과전문의',
] as const;

export const NAVER_PLACE_ID = '11566039';
export const NAVER_PLACE_REVIEW_URL = `https://m.place.naver.com/hospital/${NAVER_PLACE_ID}/review/visitor`;
export const NAVER_PLACE_URL = `https://map.naver.com/p/entry/place/${NAVER_PLACE_ID}`;
export const NAVER_BLOG_URL = 'https://blog.naver.com/whitestyle3';

export const naverSearchUrl = (keyword: string) =>
  `https://search.naver.com/search.naver?query=${encodeURIComponent(`강남역 화이트스타일치과 ${keyword}`)}`;

const JAPANESE_ROW: TreatmentCondition = {
  label: '일본어 상담',
  answer: '일본어 전담 통역 코디네이터 3명 상주 · 일본어 통역 직통 +82-10-3046-5010 · LINE ID whitestyle1',
};

const IMPLANT: TreatmentConditionProfile = {
  procedureName: '임플란트 · 뼈이식 · 임플란트 재수술',
  procedureType: 'SurgicalProcedure',
  conditions: [
    { label: '당일 진단', answer: '내원 당일 3D CT로 골밀도·신경관·상악동을 계측하고 식립 가능 여부와 예상 내원 횟수(보통 3~6회)를 안내합니다.' },
    { label: '디지털 설계', answer: '구강스캔 기반 맞춤형 커스텀 어버트먼트(지대주)와 CAD/CAM 정밀 보철로 잇몸 라인과 교합을 맞춥니다.' },
    { label: '통증 완화', answer: '가글 마취 → 잇몸 도포 마취 → 디지털 정압 무통 마취기의 3단계 통증 완화 시스템을 기본 적용합니다.' },
    { label: '보증 · 사후관리', answer: '정품 픽스처 사용·보증, 보증 범위는 진단 후 서면 안내하며 식립 후 3·6·12개월 치주과 전문의 정기 리콜을 진행합니다.' },
    { label: '고난도 · 재수술', answer: '타 치과 임플란트 실패·골 소실 시 염증 조직 제거와 동종골 이식(GBR)·상악동거상술 후 재수술을 진행합니다.' },
    { label: '담당 의료진', answer: '이봉진 대표원장 · 박선혜 원장(보건복지부 인증 치주과 전문의) · 김준헌 병원장 3인 원장단 협진' },
    JAPANESE_ROW,
  ],
  naverKeywords: ['임플란트 재수술', '뼈이식 임플란트', '3인 원장단 협진', '치주과 전문의', '임플란트 후기'],
};

const ORTHODONTICS: TreatmentConditionProfile = {
  procedureName: '치아교정 · 인비절라인 · 재교정',
  procedureType: 'TherapeuticProcedure',
  conditions: [
    { label: '당일 진단', answer: '3D CT · Quick-Ceph · 구강스캔으로 당일 안모·턱관절·치근을 분석하고 비발치·재교정 가능 여부를 안내합니다.' },
    { label: '디지털 설계', answer: '구강스캔 데이터로 투명교정(인비절라인) 이동 경로를 설계하고 진행 단계별로 확인합니다.' },
    { label: '통증 완화', answer: '장치 조절 강도를 단계적으로 설정해 초기 적응기 불편감을 줄이고 조절 주기를 개인별로 안내합니다.' },
    { label: '보증 · 사후관리', answer: '교정 완료 후 유지장치 점검과 정기 내원으로 재발을 관리합니다.' },
    { label: '고난도 · 재교정', answer: '유지장치 탈락 재발·발치 후 옥니·어금니 교합 붕괴 재교정 전 치근 길이와 치조골 두께를 정밀 계측합니다.' },
    { label: '담당 의료진', answer: '서울대졸 · 단국대 외래교수 · 교정학 박사 김준헌 병원장 1인 주치의 직접 진료' },
    JAPANESE_ROW,
  ],
  naverKeywords: ['치아교정 재교정', '인비절라인', '교정학 박사', '김준헌 원장', '교정 후기'],
};

const AESTHETIC: TreatmentConditionProfile = {
  procedureName: '최소삭제 심미보철 · 라미네이트 재치료',
  procedureType: 'NoninvasiveProcedure',
  conditions: [
    { label: '당일 진단', answer: '내원 당일 교합·잇몸 상태와 기존 보철 상태를 확인하고 무삭제 또는 최소삭제 적용 가능 여부를 안내합니다.' },
    { label: '디지털 설계', answer: '구강스캔과 CAD/CAM 정밀 설계로 0.1~0.2mm 최소삭제 맞춤 세라믹을 제작하며 최단 2~3회 내원으로 진행합니다.' },
    { label: '통증 완화', answer: '자연치아 법랑질을 최대한 보존해 시림을 줄이고, 필요 시 3단계 통증 완화 마취를 적용합니다.' },
    { label: '보증 · 사후관리', answer: '보철 완료 후 정기 점검과 사후 보증 관리를 진행하며 보증 범위는 진단 후 서면 안내합니다.' },
    { label: '고난도 · 재치료', answer: '타 치과 라미네이트의 변색·파절·잇몸 염증은 교합 간섭을 먼저 바로잡은 뒤 재치료합니다.' },
    { label: '담당 의료진', answer: '박선혜 원장(보철·치주) · 이봉진 대표원장 · 김준헌 병원장 3인 원장단 협진' },
    JAPANESE_ROW,
  ],
  naverKeywords: ['라미네이트 재치료', '제로쉘', '최소삭제 라미네이트', '이지화이트', '라미네이트 후기'],
};

const GENERAL: TreatmentConditionProfile = {
  procedureName: '충치치료 · 신경치료 · 재신경치료 · 사랑니 발치',
  procedureType: 'TherapeuticProcedure',
  conditions: [
    { label: '당일 진단', answer: '치과 전용 CT 3차원 영상과 정밀 검진으로 충치 깊이·신경 염증·사랑니 매복 방향을 당일 확인합니다.' },
    { label: '정밀 진료', answer: '원인을 알기 어려운 통증은 특수 현미경으로 근관과 균열을 확대해 보고 치료합니다.' },
    { label: '통증 완화', answer: '도포 마취를 먼저 적용한 뒤 국소 마취를 진행하며, 마취는 보통 2~5시간 뒤 풀린다는 점까지 미리 안내합니다.' },
    { label: '보증 · 사후관리', answer: '치료 후 정기 관리 프로그램과 불소 도포·실란트 등 예방 프로그램으로 재발을 줄입니다.' },
    { label: '고난도 · 재치료', answer: '신경치료 후에도 통증이 남으면 재신경치료를 우선 시행하고, 어려운 경우 치근단 절제술·치아 재식술을 검토합니다.' },
    { label: '담당 의료진', answer: '이봉진 대표원장 · 박선혜 원장(보건복지부 인증 치주과 전문의) · 김준헌 병원장 3인 원장단 협진' },
    JAPANESE_ROW,
  ],
  naverKeywords: ['재신경치료', '매복 사랑니 발치', '충치치료', '자연치아 살리기', '강남역 치과 후기'],
};

const PROFILE_BY_PATH: Record<string, TreatmentConditionProfile> = {
  '/treatments/implant': IMPLANT,
  '/treatments/implant/bone-graft': IMPLANT,
  '/treatments/implant/edentulous': IMPLANT,
  '/treatments/implant/insurance': IMPLANT,
  '/treatments/orthodontics': ORTHODONTICS,
  '/treatments/orthodontics/types': ORTHODONTICS,
  '/treatments/aesthetic': AESTHETIC,
  '/treatments/aesthetic/zeroshell': AESTHETIC,
  '/treatments/aesthetic/easy-white': AESTHETIC,
  '/treatments/general': GENERAL,
  '/treatments/general/caries': GENERAL,
  '/treatments/general/endo': GENERAL,
  '/treatments/general/wisdom-tooth': GENERAL,
  '/treatments/general/scaling': {
    ...GENERAL,
    procedureName: '치주과 전문의 잇몸치료 · 스케일링 · 1DAY 미백',
    naverKeywords: ['치주과 전문의', '잇몸치료', '스케일링', '1DAY 미백', '잇몸치료 후기'],
  },
};

export function getConditionProfile(pageUrl: string): TreatmentConditionProfile | null {
  try {
    const path = new URL(pageUrl).pathname.replace(/\/$/, '');
    return PROFILE_BY_PATH[path] ?? null;
  } catch {
    return null;
  }
}
