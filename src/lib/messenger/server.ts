import { prisma } from '@/lib/prisma';

export const VALID_SPECIES = ['dog', 'cat', 'elephant', 'dino', 'parrot', 'python'] as const;
export const VALID_EARS = [
  'perk',
  'fold',
  'round',
  'pointy',
  'small',
  'fox',
  'lynx',
  'mismatch',
  'outtilt',
  'intilt',
  'darktip',
  'whitetip',
  'tnr',
] as const;
export const VALID_COSTUMES = [
  'none',
  'doctor',
  'crown',
  'angel',
  'beret',
  'coder',
  'hygiene',
] as const;
export const VALID_BGS = ['cream', 'mint', 'peach', 'sky', 'lavender', 'gold'] as const;

export const PET_STICKERS = [
  { code: 'wave', label: '반가워요!', img: '/ai-pet/assets3d/hwata_3d_wave.png' },
  { code: 'crown', label: 'VIP 최고!', img: '/ai-pet/assets3d/hwata_3d_costume_crown.png' },
  { code: 'doctor', label: '치과 체크!', img: '/ai-pet/assets3d/hwata_3d_costume_doctor.png' },
  { code: 'angel', label: '치아 수호천사', img: '/ai-pet/assets3d/hwata_3d_costume_angel.png' },
  { code: 'heart', label: '고마워요!', img: '/ai-pet/assets3d/hwata_3d_idle.png' },
  { code: 'coder', label: '열공 모드', img: '/ai-pet/assets3d/hwata_3d_costume_coder.png' },
] as const;

export const BLOCKED_FILE_EXTENSIONS = new Set([
  'exe',
  'bat',
  'cmd',
  'msi',
  'sh',
  'ps1',
  'vbs',
  'scr',
  'dll',
  'com',
  'pif',
  'jar',
  'hta',
]);

export interface AvatarConfig {
  species: string;
  ear: string;
  costume: string;
  bg: string;
}

export function sanitizeAvatar(raw: unknown): AvatarConfig {
  const obj = raw && typeof raw === 'object' ? (raw as Record<string, unknown>) : {};
  return {
    species: VALID_SPECIES.includes(obj.species as (typeof VALID_SPECIES)[number])
      ? String(obj.species)
      : 'dog',
    ear: VALID_EARS.includes(obj.ear as (typeof VALID_EARS)[number]) ? String(obj.ear) : 'perk',
    costume: VALID_COSTUMES.includes(obj.costume as (typeof VALID_COSTUMES)[number])
      ? String(obj.costume)
      : 'none',
    bg: VALID_BGS.includes(obj.bg as (typeof VALID_BGS)[number]) ? String(obj.bg) : 'cream',
  };
}

export function parseAvatarJson(raw?: string | null): AvatarConfig {
  if (!raw) return { species: 'dog', ear: 'perk', costume: 'none', bg: 'cream' };
  try {
    return sanitizeAvatar(JSON.parse(raw));
  } catch {
    return { species: 'dog', ear: 'perk', costume: 'none', bg: 'cream' };
  }
}

export function isBlockedFileName(fileName: string): boolean {
  const ext = String(fileName || '')
    .trim()
    .split('.')
    .pop()
    ?.toLowerCase();
  return Boolean(ext && BLOCKED_FILE_EXTENSIONS.has(ext));
}

export function isBlobConfigured(): boolean {
  return Boolean((process.env.BLOB_READ_WRITE_TOKEN || '').trim());
}

export interface HwataChatContextMessage {
  sender: string;
  text: string;
  isBot?: boolean;
}

function cleanBotText(raw: string): string {
  return String(raw || '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/__(.*?)__/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

export function buildRuleBasedDentalReply(text: string, sender = '회원'): string {
  const q = String(text || '')
    .replace(/@화타|닥터\s*화타|화타야/g, '')
    .trim();

  // 1. 치아교정 — 시기/나이/언제
  if (/교정|덧니|돌출|부정교합|주걱턱|무턱/.test(q) && /언제|나이|시기|초등|중학|고등|학생|성인|늦|몇\s*살|적기/.test(q)) {
    return '치아교정은 턱뼈 성장과 영구치 배열을 함께 잡을 수 있는 초등 고학년~중학생(만 10~13세 전후)에 시작하면 효율이 높지만, 성인도 잇몸뼈만 건강하다면 언제든 충분히 시작할 수 있어요. 주걱턱이나 골격 차이가 있는 경우엔 만 7~9세 무렵 미리 검진을 받아두면 훨씬 수월합니다. 본원에서는 교정학 박사 김준헌 병원장님이 현재 골격과 치열 상태를 1:1로 진단해 가장 알맞은 시작 시기를 잡아드려요.';
  }
  // 2. 치아교정 — 기간/얼마나
  if (/교정|투명교정|인비절라인|클리피/.test(q) && /기간|얼마나|몇\s*년|몇\s*개월|오래|빨리|단기/.test(q)) {
    return '교정 기간은 앞니 위주 부분교정의 경우 약 3~6개월, 전체 교합을 바로잡는 전체교정은 보통 1년 6개월~2년 내외로 진행돼요. 치아 이동 속도와 발치 여부에 따라 개인차가 있어서, 3D 정밀 진단으로 내게 맞는 예상 기간과 월 치료 주기를 미리 확인하시는 게 정확합니다.';
  }
  // 3. 치아교정 — 장치 종류(투명/인비절라인/클리피씨/세라믹)
  if (/투명교정|인비절라인|클리피씨|클리피|세라믹|설측|교정\s*종류|장치\s*추천/.test(q)) {
    return '장치는 심미성과 관리 편의에 따라 선택할 수 있어요. 탈착이 가능하고 티가 거의 나지 않는 인비절라인·투명교정, 마찰을 줄여 통증과 기간 부담을 낮춘 클리피씨 자가결찰 브라켓 등 각 장점이 분명합니다. 3D 구강 스캔과 교합 진단 후 생활 패턴에 가장 잘 맞는 장치를 함께 골라드리고 있어요.';
  }
  // 4. 치아교정 — 발치 vs 비발치
  if (/교정|돌출|덧니/.test(q) && /발치|비발치|이\s*뽑|뽑아야/.test(q)) {
    return '치아교정에서 발치 여부는 치아가 배열될 악궁 공간과 입술 돌출 정도를 정밀 계측해 결정하며, 가능한 자연치아를 보존하는 비발치 교정을 우선 검토해요. 공간이 많이 부족하거나 돌출이 뚜렷할 때만 최소 발치를 고려하니, 먼저 3D CT와 측면 X-ray 분석으로 확인해 보시는 것을 권해드립니다.';
  }
  // 5. 치아교정 — 유지장치/재발
  if (/유지장치|가철식|고정식|재발|리테이너/.test(q)) {
    return '치아교정이 끝난 직후에는 치아 주변 인대가 새 위치에 자리 잡으려 하기 때문에 유지장치 착용이 정말 중요해요. 처음에는 식사·양치 시간을 제외하고 꾸준히 착용하다가 서서히 야간 위주로 줄여나가며, 안쪽 철사가 떨어졌다면 재발 전에 본원(02-569-7528)으로 바로 연락해 붙여주셔야 해요.';
  }
  // 6. 치아교정 — 통증/와이어/음식/주의사항
  if (/교정|철사|와이어|브라켓/.test(q) && /아파|아프|통증|뻐근|찔|왁스|먹|음식|죽|탈락|떨어/.test(q)) {
    return '와이어 교체나 장치를 처음 붙인 뒤 3~4일 정도는 치아가 움직이며 치근막이 압박돼 뻐근할 수 있고, 보통 5일차부터 서서히 편해져요. 초기 며칠은 연두부·계란찜처럼 부드러운 음식을 드시고 미지근하거나 시원한 물로 헹궈주시면 진정에 도움이 됩니다. 철사가 볼을 찌를 땐 전용 왁스를 붙이시고 본원(02-569-7528)으로 연락해 주세요.';
  }
  // 7. 치아교정 일반
  if (/교정|덧니|돌출|부정교합/.test(q)) {
    return '치아교정은 치열을 고르게 펴는 것뿐 아니라 위아래 치아의 맞물림(교합)과 턱관절 균형을 함께 맞추는 치료예요. 화이트스타일치과는 1994년 개원 이래 서울대졸·교정학 박사 김준헌 병원장님이 정밀 진단부터 사후 유지관리까지 주치의 변경 없이 1:1로 직접 진료하고 있으니 편하게 상담받아 보세요.';
  }

  // 8. 라미네이트 / 심미보철 / 앞니
  if (/라미네이트|심미보철|올세라믹|지르코니아|앞니|벌어|깨짐|왜소치/.test(q)) {
    return '심미보철은 자연치아 법랑질을 얼마나 건강하게 남기느냐가 장기적인 수명의 핵심이에요. 본원은 치아 삭제량을 최소화한 0.1~0.3mm 최소삭제 및 무삭제 세라믹 라미네이트를 원칙으로, 정밀 교합 진단 후 치아 색과 형태를 자연스럽게 디자인해 드립니다. 필요시 내원해 치아 두께와 교합부터 가볍게 체크해 보세요.';
  }

  // 9. 치아미백
  if (/미백|하얗|누런|착색|커피|와인|변색/.test(q)) {
    return '전문가 치아미백은 시술 당일 치아 톤을 환하게 밝힐 수 있고, 평소 커피·차 관리에 따라 보통 1~2년 이상 밝기가 유지돼요. 시술 후 하루이틀은 일시적으로 시릴 수 있지만 자연스럽게 가라앉으며, 48시간 동안만 커피·카레·와인 같은 진한 착색 음식을 피해 주시면 효과가 훨씬 오래갑니다.';
  }

  // 10. 턱관절 / 이갈이 / 이악물기
  if (/턱|소리|딱|뻐근|이갈이|이악물|턱관절|악관절|보톡스|개구|스플린트/.test(q)) {
    return '턱에서 딱딱 소리가 나거나 아침에 턱이 뻐근하다면 무의식적 이악물기(TCH)나 턱관절 디스크 긴장이 원인인 경우가 많아요. 평소 입술은 가볍게 다물되 위아래 어금니 사이는 2~3mm 살짝 띄워두는 이완 자세가 중요하며, 따뜻한 온찜질과 부드러운 식사가 도움이 됩니다. 입을 벌릴 때 통증이 지속되면 3D 진단을 받아보시는 게 좋아요.';
  }

  // 11. 임플란트 — 통증/마취/뼈이식/기간
  if (/임플란트|뼈이식|상악동|픽스처|골유착/.test(q)) {
    return '임플란트는 3D CT로 잇몸뼈와 신경 위치를 먼저 정밀 분석한 뒤 진행하면 식립 과정의 부담을 크게 줄일 수 있어요. 본원은 가글·도포·컴퓨터 제어 저통 마취의 3단계 통증 완화 시스템을 운영하고, 치주과 전문의 박선혜 원장님을 비롯한 3인 원장단이 협진해 식립부터 최종 보철까지 꼼꼼히 챙겨드립니다. 시술 후 3주 정도는 금연·금주가 회복에 꼭 필요해요.';
  }

  // 12. 스케일링 / 건강보험 / 치석
  if (/스케일링|건보|보험|치석|치태|잇몸치료/.test(q)) {
    return '만 19세 이상이라면 매년 1월 1일부터 12월 31일 사이 연 1회 건강보험 적용으로 부담 없이 스케일링을 받으실 수 있어요. 치석이 오래 쌓이면 잇몸 염증과 시린 증상으로 이어지기 쉬우니, 보통 6개월~1년 주기로 정기 검진과 함께 체크하시는 걸 추천해 드립니다.';
  }

  // 13. 사랑니 / 발치
  if (/사랑니|매복|발치/.test(q)) {
    return '사랑니가 삐뚤게 나거나 잇몸 속에 반쯤 묻혀 있다면 인접한 어금니 충치와 잇몸 염증을 유발하기 쉬워 발치를 권하는 편이에요. 아래턱 신경관과의 거리가 중요하므로 3D CT로 뿌리 위치를 정확히 확인한 뒤 안전하게 발치 여부를 결정하시는 것이 좋습니다.';
  }

  // 14. 충치 / 신경치료 / 시린 이 / 통증
  if (/충치|신경치료|인레이|크라운|시려|시린|욱신|이빨\s*아|치통|잇몸|피|부었/.test(q)) {
    return '차가운 물에 시리거나 씹을 때 찌릿한 통증이 있다면 초기 충치나 미세 균열, 또는 잇몸 염증 신호일 수 있어요. 증상을 오래 두면 신경치료까지 필요해질 수 있으니, 통증이 커지기 전에 X-ray로 치아 내부와 잇몸 상태를 확인해 보시는 편이 자연치아를 지키는 가장 좋은 방법입니다.';
  }

  // 15. 수능 수험생 이벤트
  if (/수능|수험생|수험표/.test(q)) {
    return '수험생 여러분 정말 고생 많으셨어요! 2027학년도 수능 수험표를 지참하고 교정이나 최소삭제 라미네이트 등 비급여 진료를 진행하시면 식약처 허가 전문가 치아미백 1회를 함께 챙겨드리고 있어요. 자세한 조건은 홈페이지 이벤트 안내나 대표전화(1577-7287)로 편하게 확인하실 수 있습니다.';
  }

  // 16. 위치 / 시간 / 예약 / 주차 / 일본어 통역
  if (/위치|어디|주소|몇\s*시|진료시간|야간|토요일|예약|전화|일본어|통역|주차/.test(q)) {
    return '화이트스타일치과의원은 강남역 11번·12번 출구 도보 1분 거리 대승빌딩 B1·1·2층(강남대로92길 17)에 위치해 있어요. 대표전화(1577-7287 / 02-569-7528)나 네이버 빠른 예약으로 편하게 일정을 잡으실 수 있고, 일본어 전담 통역 스태프 3명이 상주해 일본어 직통(+82-10-3046-5010 / LINE: whitestyle1) 상담도 바로 가능합니다.';
  }

  // 17. 인사 / 감사
  if (/^(안녕|하이|헬로|고마|감사|반가|잘자|굿모닝|수고)/.test(q)) {
    return `반가워요${sender && sender !== '회원' ? ` ${sender}님` : ''}! 오늘 치아나 턱관절, 교정, 미백 관련해 궁금하신 점이 있다면 편하게 편하게 물어보세요. 핵심만 쏙쏙 알기 쉽게 정리해 드릴게요.`;
  }

  return `궁금하신 내용 잘 확인했어요${sender && sender !== '회원' ? ` ${sender}님` : ''}. 말씀 주신 증상이나 치아 고민(예: 교정 시기, 통증 위치, 라미네이트·임플란트 등)을 조금만 더 구체적으로 알려주시면, 원장단 임상 기준에 맞춰 알기 쉽게 바로 설명해 드릴게요. 급한 통증이나 내원 상담이 필요하실 땐 1577-7287로 언제든 문의해 주세요.`;
}

export async function generateDoctorHwataReply(
  text: string,
  sender = '회원',
  recentContext: HwataChatContextMessage[] = []
): Promise<string> {
  const apiKey = (
    process.env.GEMINI_API_KEY ||
    process.env.GOOGLE_API_KEY ||
    process.env.NEXT_PUBLIC_GEMINI_API_KEY ||
    ''
  ).trim();

  const cleanedQuestion = String(text || '')
    .replace(/@화타/g, '')
    .trim() || String(text || '').trim();

  if (apiKey) {
    const sys = [
      '너는 강남역 11·12번 출구 도보 1분 대승빌딩 B1·1·2층(강남대로92길 17, 대표전화 1577-7287 / 02-569-7528)에 있는 1994년 개원 33년 전통 화이트스타일치과의원의 치과 상담 AI 파트너 "닥터 화타"야.',
      '의료진: 서울대졸·단국대 외래교수·교정학 박사 김준헌 병원장, 이봉진 대표원장, 보건복지부 인증 치주과 전문의 박선혜 원장 3인 원장단 책임 협진.',
      '핵심 진료 철학: 1:1 책임 치아교정, 자연치아 보존 0.1~0.3mm 최소삭제/무삭제 심미보철, 3D CT 및 3단계 통증 완화 마취(가글·도포·저통 마취) 임플란트, 일본어 전담 통역 스태프 3명 상주(+82-10-3046-5010 / LINE: whitestyle1).',
      '2027 수능 수험생 이벤트: 수험표 지참 비급여 진료 시 전문가 치아미백 1회 무료(https://whitestyle.com/events/suneung, 급여 단독 제외).',
      '',
      '[말투와 답변 구성 원칙 — 반드시 지킬 것]',
      '1. 친근하고 신뢰감 있는 "주치의 파트너 톤(~해요, ~거예요, ~드립니다)"으로 답해.',
      '2. 첫 문장에서는 질문자가 물어본 핵심(시기, 기간, 원인, 가능 여부 등)을 바로 정확하게 대답해. 질문과 동떨어진 고정 안내문을 읊지 마.',
      '3. 이어서 1~2문장으로 치의학적인 근거와 실생활 관리 팁을 알기 쉽게 설명해.',
      '4. 꼭 필요한 경우에만 마지막에 가볍게 예약·전화 안내를 한 줄 덧붙이고, 매 답변마다 병원 주소·원장단 풀네임·전화번호를 기계적으로 복붙하지 마.',
      '5. **굵게**, #, 불릿 목록 같은 마크다운 기호를 절대 쓰지 말고, 실제 메신저에서 다정하게 대화하듯 2~4문장(130~260자 내외)의 자연스러운 평문으로만 답해.',
      '6. 내부 개발 용어나 시스템 명칭은 절대 언급하지 마.',
    ].join('\n');

    const contextLines = (recentContext || [])
      .slice(-5)
      .map((m) => `${m.isBot ? '닥터 화타' : m.sender}: ${String(m.text || '').slice(0, 180)}`)
      .join('\n');

    const userPrompt = contextLines
      ? `[방금 전 대화 맥락]\n${contextLines}\n\n[질문자: ${sender}] ${cleanedQuestion}`
      : `[질문자: ${sender}] ${cleanedQuestion}`;

    const candidateModels = [
      'gemini-3.5-flash-lite',
      'gemini-3.5-flash',
      'gemini-flash-lite-latest',
      'gemini-2.5-flash',
    ];

    for (const modelName of candidateModels) {
      try {
        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${encodeURIComponent(apiKey)}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            signal: AbortSignal.timeout(5500),
            body: JSON.stringify({
              systemInstruction: { parts: [{ text: sys }] },
              contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
              generationConfig: { temperature: 0.55, maxOutputTokens: 420 },
            }),
          }
        );
        if (res.ok) {
          const json = await res.json();
          const parts = json?.candidates?.[0]?.content?.parts || [];
          const rawCandidate = parts.map((p: { text?: string }) => p?.text || '').join('');
          const candidate = cleanBotText(rawCandidate);
          if (candidate) return candidate;
        }
      } catch {
        // try next model
      }
    }
  }
  return buildRuleBasedDentalReply(cleanedQuestion, sender);
}

const DEFAULT_ROOMS = [
  {
    roomId: 'room_jaw_stretch',
    roomName: '강남 직장인 턱관절 & 이갈이 탈출방',
    description: '모니터 볼 때 무의식적 이악물기(TCH) 교정 및 턱근육 이완 팁 공유방',
    creator: '화이트스타일치과 웰니스팀',
    inviteCode: 'HWATA-OPEN-JAW',
    isDefault: true,
    isPublic: true,
    roomType: 'PUBLIC_LOUNGE',
    memberCount: 142,
    topic: '턱관절 통증, 개구장애, 이갈이, 이악물기',
  },
  {
    roomId: 'room_ortho_talk',
    roomName: '치아교정 1~2년차 현실 고민방',
    description: '유지장치, 발치·비발치, 투명교정 후기 및 실시간 Q&A',
    creator: '김준헌 병원장 자문단',
    inviteCode: 'HWATA-OPEN-ORTHO',
    isDefault: true,
    isPublic: true,
    roomType: 'PUBLIC_LOUNGE',
    memberCount: 98,
    topic: '치아교정, 클리피씨, 인비절라인, 유지장치',
  },
  {
    roomId: 'room_aesthetic_smile',
    roomName: '최소삭제 라미네이트 & 미백 솔직방',
    description: '자연치아 보존 세라믹 라미네이트 및 치아미백 관리 노하우',
    creator: '이봉진 대표원장 자문단',
    inviteCode: 'HWATA-OPEN-SMILE',
    isDefault: true,
    isPublic: true,
    roomType: 'PUBLIC_LOUNGE',
    memberCount: 85,
    topic: '라미네이트, 치아미백, 심미보철, 앞니',
  },
];

let seededRooms = false;
export async function ensureMessengerRoomsSeeded() {
  if (seededRooms) return;
  for (const r of DEFAULT_ROOMS) {
    await prisma.hwataRoom.upsert({
      where: { roomId: r.roomId },
      update: {},
      create: r,
    });
  }
  seededRooms = true;
}

export async function canAccessRoom(roomId: string, userId: string) {
  await ensureMessengerRoomsSeeded();
  const room = await prisma.hwataRoom.findUnique({ where: { roomId } });
  if (!room) return null;
  const membership = await prisma.hwataRoomMember.findUnique({
    where: { roomId_userId: { roomId, userId } },
  });
  if (!room.isPublic && !membership) {
    return null;
  }
  return { room, membership };
}

export function formatAttachment(a: {
  id: string;
  fileName: string;
  mimeType: string;
  sizeBytes: bigint;
  storageProvider: string;
  blobUrl: string | null;
  width: number | null;
  height: number | null;
  createdAt: Date;
}) {
  return {
    id: a.id,
    fileName: a.fileName,
    mimeType: a.mimeType,
    sizeBytes: Number(a.sizeBytes),
    storageProvider: a.storageProvider,
    url: `/api/messenger/v1/files/${a.id}`,
    directUrl: a.blobUrl || null,
    width: a.width,
    height: a.height,
    createdAt: a.createdAt.toISOString(),
  };
}
