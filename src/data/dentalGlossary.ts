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
  {
    id: 'osseointegration',
    term: '골유착 (Osseointegration)',
    category: '임플란트·재수술',
    alternateNames: ['임플란트 뼈 유착', '뼈와 임플란트 결합', 'オッセオインテグレーション'],
    definition:
      '잇몸뼈 속에 식립된 티타늄 임플란트 픽스처 표면과 살아 있는 치조골 세포가 중간 결합조직 없이 직접 단단히 맞물려 굳는 생물학적 결합 과정입니다.',
    clinicalNote:
      '뼈의 밀도와 뼈이식 유무, 당뇨·흡연·골다공증 관리 여부에 따라 보통 하악 2~3개월, 상악 3~6개월의 안정적인 골유착 기간이 필요합니다.',
    relatedUrl: '/qa/immediate-vs-delayed-implant-timing',
  },
  {
    id: 'implant-fixture',
    term: '임플란트 픽스처 (인공치근 · Fixture)',
    category: '임플란트·재수술',
    alternateNames: ['임플란트 나사체', '인공 치아 뿌리', 'インプラントフィクスチャー'],
    definition:
      '자연치아의 뿌리 역할을 대신해 잇몸뼈(치조골) 내부에 직접 식립되는 나사 형태의 생체친화적 티타늄 본체입니다.',
    clinicalNote:
      '오스템·바이오템 등 식약처 승인 정품 픽스처를 사용해야 장기 부품 호환과 나사 교체 등 사후 보증 관리가 원활합니다.',
    relatedUrl: '/qa/implant-brand-osstem-biotem-selection',
  },
  {
    id: 'allogeneic-bone',
    term: '동종골 이식재 (Allogeneic Bone Graft)',
    category: '임플란트·재수술',
    alternateNames: ['인체 뼈이식재', '고난도 골이식재', '同種骨移植材'],
    definition:
      '인체 조직은행의 엄격한 멸균·가공 기준을 거친 골이식 재료로, 치조골이 넓고 깊게 소실된 결손부에서 자가골 채취 부담을 줄이면서도 우수한 골 형성 유도 능력을 발휘합니다.',
    clinicalNote:
      '임플란트 재수술이나 광범위한 치주골 결손 재건 시 결손 형태에 따라 자가골·이종골·차폐막과 조합해 적용합니다.',
    relatedUrl: '/qa/bone-graft-gbr-sinus-lift-guide',
  },
  {
    id: 'immediate-implant',
    term: '발치 즉시 임플란트 (Immediate Implant)',
    category: '임플란트·재수술',
    alternateNames: ['당일 발치 식립', '발치 당일 임플란트', '抜歯即時インプラント'],
    definition:
      '손상된 치아를 발치한 날 별도 재절개 없이 같은 자리의 발치와에 바로 임플란트 픽스처를 식립해 치료 기간과 잇몸 수축을 줄이는 술식입니다.',
    clinicalNote:
      '뿌리 끝 급성 염증이 크지 않고 픽스처를 잡아줄 잔존 치조골이 충분할 때만 안전하므로 3D CT 계측 후 적용 여부를 결정합니다.',
    relatedUrl: '/qa/immediate-vs-delayed-implant-timing',
  },
  {
    id: 'implant-prosthesis-screw',
    term: '나사 유지형 · SCRP 임플란트 보철',
    category: '임플란트·재수술',
    alternateNames: ['스크류 시멘트 복합형', '탈부착 가능 임플란트 크라운', 'スクリューリテイン'],
    definition:
      '임플란트 상부 크라운의 씹는 면에 작은 나사 구멍을 두어, 추후 나사 풀림이나 잇몸 세정·점검이 필요할 때 보철물을 깨지 않고 분리·재장착할 수 있게 설계한 방식입니다.',
    clinicalNote:
      '맞춤형 커스텀 어버트먼트와 결합하면 잇몸 아래 잔여 접착제로 인한 임플란트 주위염 예방과 장기 AS에 매우 유리합니다.',
    relatedUrl: '/qa/custom-abutment-vs-stock-abutment',
  },
  {
    id: 'bisphosphonate-mronj',
    term: '골다공증 약제 관련 턱뼈 괴사 주의 (MRONJ)',
    category: '임플란트·재수술',
    alternateNames: ['비스포스포네이트 주의', '골흡수억제제 휴약 확인'],
    definition:
      '비스포스포네이트나 데노수맙 같은 골다공증·골대사 치료 약제를 장기간 또는 고농도 주사로 투여받은 환자가 발치·임플란트 수술 시 턱뼈 치유가 지연될 수 있어 사전 약물 확인이 필요한 임상 기준입니다.',
    clinicalNote:
      '임플란트 상담 시 복용 중인 골다공증 약 이름과 주사 이력을 반드시 알려주셔야 내과 협진 및 안전 일정을 조율할 수 있습니다.',
    relatedUrl: '/qa/implant-osteoporosis-medication-check',
  },
  {
    id: 'implant-brand-warranty',
    term: '정품 픽스처 인증 · 보증 시스템',
    category: '임플란트·재수술',
    alternateNames: ['정품 인증서', '임플란트 사후 보증', '正規品保証'],
    definition:
      '식립된 임플란트 픽스처의 제조사·규격 번호를 기록하고, 정기 리콜 검진 이행 기준에 맞춰 재식립·보철 보증 범위를 서면 안내하는 시스템입니다.',
    clinicalNote:
      '보증 혜택은 시술 후 3·6·12개월 정기검진 및 잇몸 위생 관리 참여 여부에 연동되므로 리콜 내원이 핵심입니다.',
    relatedUrl: '/warranty',
  },
  {
    id: 'peg-lateral',
    term: '왜소치 (Peg Lateral · 선천성 작은 치아)',
    category: '라미네이트·심미보철',
    alternateNames: ['기형 작은 앞니', '앞니 크기 비대칭', '矮小歯'],
    definition:
      '주로 위턱 앞니 옆의 측절치가 정상 크기보다 좁고 뾰족하게 작게 맹출하여 양옆에 빈 틈이 생기는 선천적 형태 이상입니다.',
    clinicalNote:
      '치아 크기가 이미 작아 삭제할 공간 여유가 있으므로 치아를 깎지 않는 무삭제 제로쉘 세라믹이 가장 잘 적용되는 대표 사례입니다.',
    relatedUrl: '/qa/peg-lateral-small-front-teeth-zeroshell',
  },
  {
    id: 'gummy-smile-crown-lengthening',
    term: '거미스마일 · 치관연장술 (잇몸 성형)',
    category: '라미네이트·심미보철',
    alternateNames: ['잇몸 과다 노출', '잇몸 라인 성형', 'ガミースマイル歯肉整形'],
    definition:
      '웃을 때 잇몸이 과도하게 드러나거나 치아가 짧아 보일 때, 3D CT와 치주 탐침을 바탕으로 여분의 잇몸 및 생물학적 폭경을 고려한 치조골 라인을 다듬는 시술입니다.',
    clinicalNote:
      '단순 잇몸 절제만 하면 재발하는 경우가 있어 보건복지부 인증 치주과 전문의가 치조골 경계와 교정적 함입 필요 여부를 먼저 판별합니다.',
    relatedUrl: '/qa/gummy-smile-crown-lengthening-stability',
  },
  {
    id: 'lithium-disilicate-emax',
    term: '리튬 디실리케이트 고강도 세라믹',
    category: '라미네이트·심미보철',
    alternateNames: ['이맥스 세라믹', '고강도 유리세라믹', 'ニケイ酸リチウム'],
    definition:
      '자연치아와 유사한 빛 투과도와 반투명도를 가지면서도 일반 도재 대비 파절 저항 강도가 높은 심미보철용 강화 세라믹 소재입니다.',
    clinicalNote:
      '0.1~0.2mm 최소삭제 또는 무삭제 제로쉘 초박막 보철 제작 시 얇은 두께에서도 심미성과 내구성을 균형 있게 구현합니다.',
    relatedUrl: '/treatments/aesthetic/shade-lab',
  },
  {
    id: 'zirconia-crown',
    term: '지르코니아 크라운 (Zirconia Crown)',
    category: '라미네이트·심미보철',
    alternateNames: ['지르코니아 보철', '메탈프리 크라운', 'ジルコニアクラウン'],
    definition:
      '인공 다이아몬드로 불릴 만큼 굽힘 강도가 매우 뛰어나고 생체친화성이 우수한 세라믹 소재로, 어금니 임플란트 크라운 및 전체 씌우는 보철에 널리 사용됩니다.',
    clinicalNote:
      '내부에 금속이 들어가지 않아 잇몸 경계부 검은 비침이 적고, 씹는 힘이 강한 어금니 저작력에도 안정적입니다.',
    relatedUrl: '/price',
  },
  {
    id: 'office-whitening',
    term: '원데이 전문가 치아미백 (1DAY Whitening)',
    category: '라미네이트·심미보철',
    alternateNames: ['1DAY 미백', '원내 고농도 미백', '1DAYオフィスホワイトニング'],
    definition:
      '식약처 허가 정품 미백제와 잇몸 보호제를 치과 의료진이 정밀 도포한 뒤 특수 광선을 연속 조사하여 약 60분 1회 내원으로 치아 색조를 밝히는 시술입니다.',
    clinicalNote:
      '미백 전 파노라마 검진·스케일링과 치아 균열 확인을 함께 진행해 일시적 시림을 최소화하며, 단기 방한 일정에도 완료할 수 있습니다.',
    relatedUrl: '/qa/one-day-office-whitening-sensitivity',
  },
  {
    id: 'bruxism-nightguard',
    term: '이갈이 · 교합안정장치 (스플린트 / Nightguard)',
    category: '라미네이트·심미보철',
    alternateNames: ['이악물기 보호장치', '마우스 스플린트', 'ナイトガード'],
    definition:
      '수면 중 이갈이나 과도한 이악물기 습관으로부터 라미네이트·임플란트 보철 파절과 턱관절 부담을 막기 위해 3D 구강스캔으로 맞춤 제작하는 단단한 아크릴계 보호장치입니다.',
    clinicalNote:
      '부드러운 기성 실리콘 제품은 오히려 씹는 근육을 자극할 수 있어 교합을 균형 있게 잡아주는 맞춤 교합안정장치가 권장됩니다.',
    relatedUrl: '/qa/bruxism-laminate-nightguard-fracture',
  },
  {
    id: 'in-house-dental-lab',
    term: '원내 자체 기공소 (In-house Dental Lab)',
    category: '라미네이트·심미보철',
    alternateNames: ['원내 기공실', '치과 내 기공소', '院内技工室'],
    definition:
      '외주 택배 의뢰로 며칠씩 지체하지 않고 병원 내부에 상주하는 기공 설비와 인력이 원장단과 직접 얼굴·치아 색조를 대조하며 보철물을 정밀 수정·제작하는 시스템입니다.',
    clinicalNote:
      '지대치 색조 일치, 라미네이트 초박막 라인 다듬기, 맞춤형 커스텀 지대주 적합도를 당일 미세 조정할 수 있어 완성도와 속도가 모두 높습니다.',
    relatedUrl: '/treatments/aesthetic/shade-lab',
  },
  {
    id: 'root-resorption',
    term: '치근 흡수 (Root Resorption)',
    category: '치아교정·재교정',
    alternateNames: ['치아 뿌리 짧아짐', '교정 치근흡수', '歯根吸収'],
    definition:
      '치아교정 중 과도한 교정력이나 장기간 큰 토크 이동으로 인해 치아 뿌리 끝부분이 염증 세포 작용으로 둥글어지거나 짧아지는 현상입니다.',
    clinicalNote:
      '교정 시작 전 3D CT 계측과 치료 중 정기 방사선 추적 관찰, 주치의 1:1 약한 생리적 힘 조절로 진행을 조기에 예방합니다.',
    relatedUrl: '/qa/orthodontics-root-resorption-prevention',
  },
  {
    id: 'ipr-stripping',
    term: '치간 삭제 (IPR · Interproximal Reduction)',
    category: '치아교정·재교정',
    alternateNames: ['법랑질 미세 다듬기', '치아 사이 0.2mm 공간 확보'],
    definition:
      '치아를 뽑지 않는 비발치 교정이나 블랙트라이앵글 완화를 위해 인접 치아 사이의 단단한 법랑질 겉면을 0.1~0.25mm 이내의 극소량으로 정밀 다듬어 공간을 확보하는 술식입니다.',
    clinicalNote:
      '시리지 않은 법랑질 안전 범위 내에서만 시행하며 시행 후 매끈한 연마와 불소 보호를 병행합니다.',
    relatedUrl: '/qa/protruding-mouth-extraction-vs-non-extraction',
  },
  {
    id: 'miniscrew-tad',
    term: '교정용 미니스크류 (TAD · 고정원)',
    category: '치아교정·재교정',
    alternateNames: ['교정 스크류', '미니 임플란트 고정원', 'アンカースクリュー'],
    definition:
      '잇몸뼈에 1.4~1.8mm 크기의 작은 티타늄 나사를 임시로 고정해, 어금니가 끌려 나오지 않고 앞니만 정밀하게 당기거나 거미스마일 앞니를 위로 함입시키는 절대 고정원 장치입니다.',
    clinicalNote:
      '국소 도포·소량 마취로 수 분 내 간단히 식립하며 교정 완료 시 흔적 없이 쉽게 제거됩니다.',
    relatedUrl: '/qa/protruding-mouth-extraction-vs-non-extraction',
  },
  {
    id: 'retainer-fixed-removable',
    term: '고정식 · 가철식 교정 유지장치 (Retainer)',
    category: '치아교정·재교정',
    alternateNames: ['리테이너', '교정 후 유지장치', 'リテーナー'],
    definition:
      '치아교정 완료 후 치아가 원래 위치로 되돌아가려는 재발 성향을 막기 위해 앞니 뒷면에 붙이는 얇은 철사(고정식)와 수면 시 끼는 투명 장치(가철식)입니다.',
    clinicalNote:
      '이중 유지장치 병행과 함께 6개월~1년 주기 스케일링 내원 시 접착 상태를 점검해야 평생 고른 치열을 유지할 수 있습니다.',
    relatedUrl: '/qa/orthodontics-retainer-wear-duration',
  },
  {
    id: 'non-extraction-ortho',
    term: '비발치 교정 (Non-Extraction Orthodontics)',
    category: '치아교정·재교정',
    alternateNames: ['치아 안 뽑는 교정', '악궁 확장 교정', '非抜歯矯正'],
    definition:
      '소구치를 발치하지 않고 치열궁 형태 확장, 어금니 후방 이동(미니스크류), 극소량 치간 삭제(IPR)를 조합해 자연치아 개수를 온전히 보존하며 배열을 맞추는 교정입니다.',
    clinicalNote:
      '단, 치조골 밖으로 치아가 뻗칠 위험이 큰 골격성 돌출에서는 무리한 비발치가 오히려 돌출·잇몸 퇴축을 부르므로 3D CT 진단으로 구분합니다.',
    relatedUrl: '/qa/protruding-mouth-extraction-vs-non-extraction',
  },
  {
    id: 'tmj-occlusion',
    term: '턱관절 · 교합 균형 (TMJ & Occlusion)',
    category: '치아교정·재교정',
    alternateNames: ['악관절 장애', '교합 간섭 조정', '顎関節・咬合バランス'],
    definition:
      '위아래 치아가 맞물리는 교합과 귀 앞쪽 턱관절(측두하악관절)·저작근이 비대칭 부하 없이 조화롭게 움직이는 상태입니다.',
    clinicalNote:
      '교정이나 심미보철·임플란트 시 한쪽 치아가 먼저 세게 닿는 교합 간섭이 남으면 턱관절 통증과 보철 파절을 유발하므로 교합 정밀 진단이 필수입니다.',
    relatedUrl: '/treatments/orthodontics',
  },
  {
    id: 'inferior-alveolar-nerve',
    term: '하치조신경 (Inferior Alveolar Nerve)',
    category: '잇몸·마취·안전',
    alternateNames: ['아래턱 감각신경', '신경관 손상 주의', '下歯槽神経'],
    definition:
      '아래턱뼈 내부 신경관을 지나며 아랫입술과 턱끝, 아래 치아들의 감각을 담당하는 핵심 신경 줄기입니다.',
    clinicalNote:
      '매복 사랑니 발치나 아래 어금니 임플란트 식립 전 치과 전용 3D CT로 신경관까지 남은 거리를 0.1mm 단위로 계측해 손상을 예방합니다.',
    relatedUrl: '/qa/impacted-wisdom-tooth-nerve-3dct',
  },
  {
    id: 'coronectomy',
    term: '치관절제술 (Coronectomy)',
    category: '잇몸·마취·안전',
    alternateNames: ['사랑니 치관 제거술', '신경 보호 분할 발치'],
    definition:
      '매복 사랑니 뿌리가 하치조신경관과 완전히 맞닿아 통째로 뽑을 경우 신경 마비 위험이 매우 높을 때, 노출·충치 위험이 있는 치아 머리(치관) 부분만 절제하고 깨끗한 뿌리는 턱뼈 속에 안전하게 남기는 보존적 술식입니다.',
    clinicalNote:
      '신경 손상 위험을 크게 줄이는 대안 술식으로 3D CT 판독 후 뿌리에 염증이 없는 경우에만 선별 적용합니다.',
    relatedUrl: '/qa/impacted-wisdom-tooth-nerve-3dct',
  },
  {
    id: 'scaling-root-planing',
    term: '스케일링 · 치근활택술 (잇몸치료)',
    category: '잇몸·마취·안전',
    alternateNames: ['치석 제거', '잇몸 속 염증 치료', 'スケーリング'],
    definition:
      '스케일링은 잇몸 위 치석을 제거하는 기초 예방 진료이며, 치근활택술·치주소파술은 잇몸 아래 치아 뿌리 표면의 세균성 치석과 염증 육아조직을 전문적으로 매끈하게 다듬어 잇몸이 다시 붙도록 돕는 치주치료입니다.',
    clinicalNote:
      '만 19세 이상 연 1회 건강보험 스케일링 이후에도 잇몸 출혈이 계속되면 치주과 전문의의 건강보험 잇몸치료로 연계합니다.',
    relatedUrl: '/qa/dental-scaling-nhis-annual-guide',
  },
  {
    id: 'periodontal-pocket',
    term: '치주낭 (Periodontal Pocket)',
    category: '잇몸·마취·안전',
    alternateNames: ['잇몸 주머니', '잇몸 깊이 4mm 이상', '歯周ポケット'],
    definition:
      '염증으로 인해 치아와 잇몸 사이의 틈이 깊게 벌어져 세균과 치석이 고이기 쉬운 병적 주머니 공간입니다.',
    clinicalNote:
      '건강한 잇몸 깊이는 1~3mm 내외이며, 4mm 이상 깊어지면 칫솔이 닿지 않아 치주과 전문의의 잇몸치료와 3·6·12개월 리콜이 필요합니다.',
    relatedUrl: '/qa/dental-scaling-nhis-annual-guide',
  },
  {
    id: 'cracked-tooth',
    term: '치아 균열 증후군 (Cracked Tooth)',
    category: '잇몸·마취·안전',
    alternateNames: ['치아 미세 금', '어금니 찌릿한 통증', '歯の亀裂'],
    definition:
      '딱딱한 음식을 씹거나 이갈이가 누적되어 치아에 미세한 금이 가면서 특정 부위를 씹다가 뗄 때 찌릿하고 날카로운 통증이 반복되는 상태입니다.',
    clinicalNote:
      '초기에 3D CT·광투과 검진으로 균열 범위를 확인하고 크라운으로 감싸 보호해야 뿌리까지 완전히 쪼개져 발치하는 사태를 막을 수 있습니다.',
    relatedUrl: '/qa/natural-tooth-saving-re-endo',
  },
  {
    id: 'microscope-endo',
    term: '특수 현미경 정밀 재신경치료',
    category: '잇몸·마취·안전',
    alternateNames: ['미세현미경 근관치료', '자연치아 살리기 신경치료', 'マイクロスコープ歯内療法'],
    definition:
      '육안으로 보이지 않는 머리카락 굵기 이하의 누락된 부근관, 미세 균열, 기존 충전재 잔여물을 고배율 특수 현미경 확대 시야로 찾아 소독·밀폐하는 고난도 재근관치료입니다.',
    clinicalNote:
      '예전에 신경치료한 치아가 다시 아플 때 성급히 뽑기 전에 자연치아를 최대한 보존할 수 있는지 먼저 확인하는 핵심 장비입니다.',
    relatedUrl: '/qa/natural-tooth-saving-re-endo',
  },
];
