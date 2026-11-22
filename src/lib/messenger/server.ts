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

export function buildRuleBasedDentalReply(text: string, sender = '회원'): string {
  const q = String(text || '').trim();

  if (/턱|소리|딱|뻐근|이갈이|턱관절|악관절|보톡스|개구/.test(q)) {
    return `멍멍! ${sender}님, 턱관절에서 소리가 나거나 뻐근할 땐 윗니·아랫니를 2~3mm 살짝 띄우는 이완 자세가 중요합니다. 턱을 괴거나 단단한 음식을 피하시고, 증상이 지속되면 강남역 화이트스타일치과(1577-7287)에서 3D 진단을 권장합니다.`;
  }
  if (/교정|철사|와이어|통증|클리피씨|투명|인비절라인|유지장치|발치/.test(q)) {
    return `치아교정학 박사 김준헌 병원장님의 임상 안내입니다. 와이어 교체 초기 3~4일은 치근막 압박으로 뻐근할 수 있으며, 5일차부터 서서히 완화됩니다. 장치가 찔릴 땐 전용 왁스를 사용하시고 본원(02-569-7528)으로 연락해 주세요.`;
  }
  if (/스케일링|건보|보험|치석|치태|잇몸치료|연말/.test(q)) {
    return `연 1회 건강보험 스케일링 안내입니다. 만 19세 이상이라면 매년 1월 1일~12월 31일 사이 건강보험 적용 스케일링을 받으실 수 있습니다. 연말 예약 마감 전에 강남역 화이트스타일치과(1577-7287)에서 미리 일정 잡으세요.`;
  }
  if (/미백|하얗|누런|착색|라미네이트|앞니|벌어|깨짐|커피|시림/.test(q)) {
    return `자연치아 보존을 최우선으로 삼는 화이트스타일치과 안내입니다. 세라믹 라미네이트는 0.1~0.3mm 최소삭제 또는 무삭제를 원칙으로 하며, 치아미백 후 48시간 동안 착색 음식을 피하면 밝기 유지에 좋습니다.`;
  }
  if (/임플란트|잇몸|피|발치|뼈이식|마취|상악동/.test(q)) {
    return `보건복지부 인증 치주과 전문의 박선혜 원장님 협진 가이드입니다. 본원은 수면마취 없이 3단계 통증 완화 국소마취 시스템으로 안전하게 진료하며, 시술 후 3주간 금연·금주가 회복에 중요합니다.`;
  }

  return `안녕하세요 ${sender}님! 강남역 11·12번 출구 도보 1분 화이트스타일치과의원(1994년 개원 33년 전통, 3인 원장단 협진) 닥터 화타입니다. 치아·잇몸·비보험 진료 인증 궁금증을 언제든 물어보세요.`;
}

export async function generateDoctorHwataReply(text: string, sender = '회원'): Promise<string> {
  const apiKey = (process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || '').trim();
  if (apiKey) {
    try {
      const sys = [
        '너는 강남역 11·12번 출구 도보 1분(강남대로92길 17, 1577-7287 / 02-569-7528) 1994년 개원 33년 전통 화이트스타일치과의원(서울대졸·단국대 외래교수·교정학 박사 김준헌 병원장, 이봉진 대표원장, 박선혜 치주과 전문의 원장 3인 협진, 3단계 통증 완화 마취, 일본어 통역 스태프 3명 상주 +82-10-3046-5010)의 닥터 화타야.',
        '2~3문장 이내로 다정하고 정확한 치의학 정보를 안내해. 고객에게 내부 개발 용어나 시스템 명칭을 말하지 마.',
      ].join(' ');
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${encodeURIComponent(apiKey)}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          signal: AbortSignal.timeout(4000),
          body: JSON.stringify({
            systemInstruction: { parts: [{ text: sys }] },
            contents: [{ role: 'user', parts: [{ text: `[질문자: ${sender}] ${text}` }] }],
            generationConfig: { temperature: 0.5, maxOutputTokens: 240 },
          }),
        }
      );
      if (res.ok) {
        const json = await res.json();
        const candidate = json?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
        if (candidate) return candidate;
      }
    } catch {
      // fall through
    }
  }
  return buildRuleBasedDentalReply(text, sender);
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
