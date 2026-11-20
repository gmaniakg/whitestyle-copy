export interface DentalGlossaryTerm {
  id: string;
  term: string;
  category: '임플란트·재수술' | '라미네이트·심미보철' | '치아교정·재교정' | '잇몸·마취·안전';
  alternateNames: string[];
  definition: string;
  clinicalNote: string;
  relatedUrl: string;
}

export const DENTAL_GLOSSARY_TERMS: DentalGlossaryTerm[] = [
  {
    id: 'peri-implantitis',
    term: '임플란트 주위염 (Peri-implantitis)',
    category: '임플란트·재수술',
    alternateNames: ['임플란트 주변 염증', '인플란트 주위염', 'インプラント周囲炎'],
    definition:
      '임플란트 주위 잇몸 점막의 염증과 함께 지지하고 있는 치조골(잇몸뼈)이 점진적으로 흡수되는 병적 상태입니다.',
    clinicalNote:
      '치주과 전문의 협진을 통해 출혈·고름·골 흡수 정도를 3D CT로 평가한 뒤, 초기 단계에서는 염증 정화와 교합 조정을, 심한 경우 재수술·뼈이식을 검토합니다.',
    relatedUrl: '/qa/implant-reoperation-peri-implantitis',
  },
  {
    id: 'implant-reoperation',
    term: '임플란트 재수술',
    category: '임플란트·재수술',
    alternateNames: ['재식립 임플란트', '실패 임플란트 재건', 'インプラント再手術'],
    definition:
      '기존 임플란트의 골유착 실패, 흔들림, 나사 파절, 심한 주위염으로 인해 기존 픽스처를 제거하고 치조골 회복 후 재식립하는 고난도 치료입니다.',
    clinicalNote:
      '단순 재식립보다 잔존 골폭 회복(GBR·상악동거상술)과 교합력 분산 설계가 핵심이므로 치주·보철·교합 협진이 중요합니다.',
    relatedUrl: '/treatments/implant/bone-graft',
  },
  {
    id: 'gbr-bone-graft',
    term: '골유도재생술 (GBR · 뼈이식 임플란트)',
    category: '임플란트·재수술',
    alternateNames: ['치조골 이식술', '동종골 이식', 'Guided Bone Regeneration', 'GBR骨造成'],
    definition:
      '임플란트를 안정적으로 고정할 잇몸뼈의 폭이나 높이가 부족할 때, 골이식재와 차폐막을 이용해 새로운 치조골 형성을 유도하는 술식입니다.',
    clinicalNote:
      '뼈의 밀도와 결손 형태에 따라 자가골·동종골 등을 선택하며, 보통 3~6개월의 안정화 기간이 필요합니다.',
    relatedUrl: '/qa/bone-graft-gbr-sinus-lift-guide',
  },
  {
    id: 'sinus-lift',
    term: '상악동거상술 (Sinus Lift)',
    category: '임플란트·재수술',
    alternateNames: ['상악동 골이식', 'Sinus Augmentation', 'サイナスリフト'],
    definition:
      '위턱 어금니 부위의 잇몸뼈 높이가 부족해 상악동(코 옆 빈 공간) 점막과 뼈 사이가 얇을 때, 점막을 안전하게 들어 올린 뒤 뼈를 채워 임플란트 식립 공간을 확보하는 수술입니다.',
    clinicalNote:
      '3D CT로 상악동 중격(격막) 유무와 점막 두께를 사전 확인해 천공 위험을 낮추고, 잔존 골량에 따라 측방 또는 치조정 접근을 선택합니다.',
    relatedUrl: '/qa/bone-graft-gbr-sinus-lift-guide',
  },
  {
    id: 'custom-abutment',
    term: '맞춤형 지대주 (커스텀 어버트먼트)',
    category: '임플란트·재수술',
    alternateNames: ['Custom Abutment', '개인 맞춤형 지대주', 'カスタムアバットメント'],
    definition:
      '잇몸뼈에 식립된 픽스처와 상부 크라운을 연결하는 기둥을 기성품이 아닌 환자 잇몸 형태와 교합에 맞춰 CAD/CAM으로 정밀 맞춤 제작한 연결 부속입니다.',
    clinicalNote:
      '음식물 끼임과 보철물 파절·나사 풀림을 줄이고, 잇몸 경계부 틈새로 인한 임플란트 주위염 예방에 유리합니다.',
    relatedUrl: '/treatments/implant/edentulous',
  },
  {
    id: 'edentulous-full-arch',
    term: '무치악 전체임플란트 (전악 재건)',
    category: '임플란트·재수술',
    alternateNames: ['전악 임플란트', '풀마우스 임플란트', '無歯顎全顎インプラント'],
    definition:
      '위턱이나 아래턱의 치아가 대부분 또는 전부 없는 상태에서 최소 필수 개수의 임플란트를 식립해 고정성 보철로 전체 치열과 저작 기능을 회복하는 치료입니다.',
    clinicalNote:
      '무조건 많은 개수를 심기보다 3D CT와 교합 분석을 통해 저작력 분산과 안모 수직 고경을 동시에 회복하는 설계가 우선입니다.',
    relatedUrl: '/qa/edentulous-full-arch-implant-guide',
  },
  {
    id: 'nhis-65-implant',
    term: '만 65세 이상 건강보험 임플란트',
    category: '임플란트·재수술',
    alternateNames: ['노인 임플란트 보험', '건보 임플란트 30%', '건강보험 2개'],
    definition:
      '만 65세 이상 건강보험 가입자가 치아가 일부 남아있는 부분 무치악 상태에서 평생 2개까지 본인부담률 30%(차상위 등 일부 경감 대상 별도)로 임플란트 혜택을 받을 수 있는 제도입니다.',
    clinicalNote:
      '완전 무치악은 보험 임플란트 대상에서 제외(보험 틀니 대상)되므로 3D CT 검진 전 원내 전산 조회로 적용 여부를 확인합니다.',
    relatedUrl: '/qa/age65-nhis-implant-30-percent',
  },
  {
    id: 'zeroshell-no-prep',
    term: '무삭제 라미네이트 (제로쉘 · No-Prep Veneer)',
    category: '라미네이트·심미보철',
    alternateNames: ['제로쉘', '무삭제 세라믹', 'No-prep laminate', '無削除ラミネート'],
    definition:
      '치아 표면(법랑질)을 깎아내지 않거나 접착 전처리만 거친 뒤 초박형 고강도 세라믹을 자연치아 위에 정밀 접착하는 보존적 심미보철 방식입니다.',
    clinicalNote:
      '치아 크기가 작은 왜소치나 앞니 사이 틈새에 적합하며, 이미 돌출되거나 겹친 치아에 무삭제를 강행하면 치아가 두꺼워 보일 수 있어 사전 교합 진단이 필수입니다.',
    relatedUrl: '/qa/no-prep-vs-minimal-prep-laminate',
  },
  {
    id: 'minimal-prep-laminate',
    term: '최소삭제 심미보철 (0.1~0.2mm · 이지화이트)',
    category: '라미네이트·심미보철',
    alternateNames: ['최소삭제 라미네이트', '이지화이트', 'Minimal-prep veneer', '最小削除ラミネート'],
    definition:
      '법랑질 두께 범위 내에서 0.1~0.2mm 수준으로만 표면을 미세 정돈하여 상아질 노출과 신경 자극을 피하면서도 자연스러운 투명도와 치아 라인을 구현하는 심미보철입니다.',
    clinicalNote:
      '충분한 주수 냉각과 법랑질 내부 접착을 지켜야 시림과 접착 탈락을 예방할 수 있습니다.',
    relatedUrl: '/qa/laminate-pulp-safety-minimal-prep',
  },
  {
    id: 'enamel-preservation',
    term: '법랑질 보존 (Enamel Preservation)',
    category: '라미네이트·심미보철',
    alternateNames: ['에나멜 보존', '치아 삭제 최소화', 'エナメル質保存'],
    definition:
      '치아 가장 바깥의 단단한 무기질 층인 법랑질(에나멜)이 깎여 상아질이 노출되지 않도록 삭제 깊이를 통제하는 원칙입니다.',
    clinicalNote:
      '세라믹 보철의 접착력은 상아질보다 법랑질에서 훨씬 안정적으로 유지되므로 수명과 신경 보호 모두에 직결됩니다.',
    relatedUrl: '/qa/laminate-pulp-safety-minimal-prep',
  },
  {
    id: 'laminate-retreatment',
    term: '라미네이트 재시술 (보철 재치료)',
    category: '라미네이트·심미보철',
    alternateNames: ['라미네이트 재교체', '올세라믹 재시술', 'ラミネート再治療'],
    definition:
      '과거 시술한 라미네이트의 경계부 변색, 끝부분 파절, 과도한 두께감, 잇몸선 검게 비침이나 부종을 해결하기 위해 기존 보철을 안전하게 분리하고 재제작하는 치료입니다.',
    clinicalNote:
      '단순 덮어씌우기가 아니라 잇몸 염증 안정화(치주과 협진)와 교합 간섭 원인 제거가 선행되어야 재발을 막습니다.',
    relatedUrl: '/qa/laminate-re-treatment-discoloration-fracture',
  },
  {
    id: 'stump-shade',
    term: '지대치 색조 (Stump Shade)',
    category: '라미네이트·심미보철',
    alternateNames: ['내부 치아 색상', '변색 차폐 색조'],
    definition:
      '초박형 세라믹 아래에 위치하는 환자 본인의 치아(지대치) 색상을 뜻하며, 최종 라미네이트의 밝기와 자연스러움을 결정하는 핵심 요소입니다.',
    clinicalNote:
      '신경치료 후 변색된 치아나 테트라사이클린 변색 치아는 원내 자체 기공소에서 투명도와 차폐층을 미세 조율해 제작합니다.',
    relatedUrl: '/warranty',
  },
  {
    id: 're-orthodontics',
    term: '성인 재교정 (Orthodontic Retreatment)',
    category: '치아교정·재교정',
    alternateNames: ['재교정', '교정 후 틀어짐 재치료', '後戻り再矯正'],
    definition:
      '이전 치아교정 완료 후 유지장치 미착용이나 노화·사랑니·교합 불균형 등으로 치열이 다시 틀어진 경우 원인을 분석해 재정렬하는 교정 치료입니다.',
    clinicalNote:
      '성인 재교정은 이전 교정 시 이미 치근 이동을 경험했으므로 3D CT로 치근 길이와 치조골 두께를 먼저 계측한 뒤 약한 힘으로 조심스럽게 이동해야 합니다.',
    relatedUrl: '/qa/adult-re-orthodontics-relapse-okni',
  },
  {
    id: 'okni-torque',
    term: '옥니 (앞니 설측 경사) 및 토크 컨트롤',
    category: '치아교정·재교정',
    alternateNames: ['발치 교정 옥니', '전치 토크 조절'],
    definition:
      '돌출입 발치 교정 과정에서 앞니가 지나치게 안쪽으로 쓰러져 윗입술이 꺼져 보이거나 웃을 때 치아가 어색하게 보이는 상태(옥니)와 이를 바로 세우는 치근 각도(토크) 조절입니다.',
    clinicalNote:
      '치근이 잇몸뼈 바깥쪽으로 뚫고 나오지 않도록 3D CT 골폭 확인과 교정학 박사의 정밀 와이어·투명교정 토크 설계가 필수입니다.',
    relatedUrl: '/qa/adult-re-orthodontics-relapse-okni',
  },
  {
    id: 'total-fee-ortho',
    term: '치아교정 총액제 (토탈피 · Total Fee)',
    category: '치아교정·재교정',
    alternateNames: ['토탈피', '월비 포함 교정비', 'トータルフィー制度'],
    definition:
      '정밀 진단비, 교정 장치비, 매월 조절 치료비, 치료 종료 후 유지장치비 포함 여부를 시술 전 미리 투명하게 고지하여 치료 도중 예기치 않은 추가 비용 부담을 줄이는 안내 기준입니다.',
    clinicalNote:
      '발치·스크류·충치치료 등 개인별 추가 항목은 총액 범위와 별도로 사전 서면 구분 안내를 받아야 분쟁을 예방할 수 있습니다.',
    relatedUrl: '/qa/orthodontics-total-fee-checklist',
  },
  {
    id: 'invisalign',
    term: '인비절라인 투명교정 (Invisalign)',
    category: '치아교정·재교정',
    alternateNames: ['투명교정장치', '클린체크', 'インビザライン'],
    definition:
      '3D 구강스캔 데이터를 바탕으로 환자 맞춤 투명 장치를 단계별로 제작해 탈착하며 치아를 이동시키는 디지털 교정 치료입니다.',
    clinicalNote:
      '하루 20~22시간 이상 착용 협조도가 결과에 직결되며, 재교정이나 부분교정 시에도 치근 이동 범위에 맞춰 정밀 설계합니다.',
    relatedUrl: '/qa/invisalign-vs-lingual-vs-clippy-c',
  },
  {
    id: 'lingual-ortho',
    term: '설측교정 (Lingual Orthodontics)',
    category: '치아교정·재교정',
    alternateNames: ['안쪽 교정', '콤비 교정', '裏側矯正'],
    definition:
      '교정 장치를 치아 바깥쪽이 아닌 혀 쪽(안쪽) 표면에 부착해 겉으로 티가 나지 않으면서도 고정식 장치의 정밀한 치아 이동력을 활용하는 교정법입니다.',
    clinicalNote:
      '직업 특성상 장치가 보이지 않아야 하거나 장치 탈착 관리가 부담스러운 성인 환자에게 적합합니다.',
    relatedUrl: '/qa/invisalign-vs-lingual-vs-clippy-c',
  },
  {
    id: 'quick-ceph-3dct',
    term: '3D CT · Quick-Ceph 정밀 교정·임플란트 진단',
    category: '치아교정·재교정',
    alternateNames: ['3차원 CT', '세팔로 계측', '골밀도 분석'],
    definition:
      '일반 2D 파노라마 엑스레이에서 보이지 않는 잇몸뼈 두께, 하치조 신경관 위치, 상악동 형태, 안모 골격 각도를 입체적으로 분석하는 진단 시스템입니다.',
    clinicalNote:
      '재수술과 재교정은 기존 치료로 변형된 골격·치근 상태가 변수이므로 3D CT 확인 없는 시술 계획은 위험할 수 있습니다.',
    relatedUrl: '/treatments/implant',
  },
  {
    id: 'three-step-local-anesthesia',
    term: '3단계 통증 완화 국소마취 시스템',
    category: '잇몸·마취·안전',
    alternateNames: ['무통 마취', '가글·도포·정압 마취', '3段階無痛麻酔'],
    definition:
      '1단계 마취액 가글 → 2단계 잇몸 표면 도포 마취 → 3단계 체온에 맞춘 마취액을 일정한 압력으로 천천히 주입하는 디지털 무통 마취기로 주사 통증을 완화하는 시스템입니다.',
    clinicalNote:
      '화이트스타일치과는 의식 소실·호흡 억제 위험이 있는 수면마취를 시행하지 않고, 의식을 유지한 채 안전하게 통증을 줄이는 3단계 국소마취를 원칙으로 합니다.',
    relatedUrl: '/qa/implant-pain-swelling-non-sedation',
  },
  {
    id: 'non-sedation-safety',
    term: '수면마취 미시행 안전 기준',
    category: '잇몸·마취·안전',
    alternateNames: ['비수면 안전 치과', '의식 유지 국소마취'],
    definition:
      '정맥 내 진정약물(수면마취) 투여 시 발생할 수 있는 호흡 억제·혈압 저하·기도 폐쇄 위험을 원천 차단하기 위해 수면진정을 배제하고 국소마취와 환자 의사소통을 유지하는 안전 기준입니다.',
    clinicalNote:
      '고령자나 고혈압·당뇨 등 기저질환이 있는 환자도 전신 부담을 최소화하며 안전하게 시술받을 수 있습니다.',
    relatedUrl: '/qa/implant-pain-swelling-non-sedation',
  },
  {
    id: 'periodontist-collab',
    term: '치주과 전문의 협진 시스템',
    category: '잇몸·마취·안전',
    alternateNames: ['보건복지부 인증 치주과 전문의', '잇몸 치료 협진', '歯周科専門医'],
    definition:
      '잇몸과 치조골(잇몸뼈)을 전문으로 수련·인증받은 치주과 전문의가 임플란트·교정·라미네이트 전후의 잇몸 건강과 골유착 기반을 함께 관리하는 진료 체계입니다.',
    clinicalNote:
      '치아가 아무리 예쁘고 튼튼해도 기반이 되는 잇몸뼈가 무너지면 재수술이 필요해지므로 3·6·12개월 치주 리콜이 장기 예후를 좌우합니다.',
    relatedUrl: '/qa/periodontist-implant-recall-3-6-12',
  },
  {
    id: 'recall-3-6-12',
    term: '3·6·12개월 정기 리콜 프로그램',
    category: '잇몸·마취·안전',
    alternateNames: ['사후 정기 검진', '임플란트 주위염 예방 관리'],
    definition:
      '임플란트·교정·심미보철 완료 후 3개월·6개월·12개월 주기로 잇몸 출혈, 치석, 교합 간섭, 보철 나사 풀림을 점검해 초기 문제를 예방하는 유지관리 프로토콜입니다.',
    clinicalNote:
      '초기 임플란트 주위 점막염은 간단한 세정과 관리만으로 회복이 가능하므로 증상이 없어도 정기 점검이 중요합니다.',
    relatedUrl: '/qa/periodontist-implant-recall-3-6-12',
  },
  {
    id: 're-endodontic',
    term: '재신경치료 · 자연치아 살리기',
    category: '잇몸·마취·안전',
    alternateNames: ['재근관치료', '미세현미경 신경치료', '歯内療法再治療'],
    definition:
      '과거 신경치료(근관치료)를 받은 치아 뿌리 끝에 염증이 재발하거나 통증이 남았을 때, 발치하고 임플란트를 심기 전에 기존 충전재를 제거하고 근관을 다시 소독해 자연치아를 보존하는 치료입니다.',
    clinicalNote:
      '치아 전용 3D CT로 수직 치근 파절 여부를 먼저 감별해야 불필요한 재치료를 피하고 살릴 수 있는 치아를 지켜낼 수 있습니다.',
    relatedUrl: '/qa/natural-tooth-saving-re-endo',
  },
  {
    id: 'hira-non-covered',
    term: '심평원(HIRA) 비급여 진료비용 기준',
    category: '잇몸·마취·안전',
    alternateNames: ['건강보험심사평가원 비급여', '비급여 수가 공개', '의료법 제45조'],
    definition:
      '건강보험이 적용되지 않는 치과 임플란트·크라운·제증명수수료 등의 비용을 의료법 제45조에 따라 의료기관이 투명하게 고지하고 심평원이 공개하는 제도입니다.',
    clinicalNote:
      '치과 선택 시 단순 최저가보다 픽스처·지대주·상부 크라운·뼈이식 포함 여부를 심평원 기준과 함께 대조해야 추가 청구 위험을 줄일 수 있습니다.',
    relatedUrl: '/qa/gangnam-dental-implant-price-comparison',
  },
];
