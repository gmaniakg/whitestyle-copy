import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import {
  buildHwataCorsHeaders,
  loginRequiredResponse,
  requireHwataMember,
} from '@/app/api/_lib/hwata-auth';

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
export const VALID_COSTUMES = ['none', 'doctor', 'crown', 'angel', 'beret', 'coder', 'hygiene'] as const;
export const VALID_BGS = ['cream', 'mint', 'peach', 'sky', 'lavender', 'gold'] as const;

export interface AvatarConfig {
  species: string;
  ear: string;
  costume: string;
  bg: string;
}

function sanitizeAvatar(raw: unknown): AvatarConfig {
  const obj = raw && typeof raw === 'object' ? (raw as Record<string, unknown>) : {};
  const species = VALID_SPECIES.includes(obj.species as (typeof VALID_SPECIES)[number])
    ? String(obj.species)
    : 'dog';
  const ear = VALID_EARS.includes(obj.ear as (typeof VALID_EARS)[number]) ? String(obj.ear) : 'perk';
  const costume = VALID_COSTUMES.includes(obj.costume as (typeof VALID_COSTUMES)[number])
    ? String(obj.costume)
    : 'none';
  const bg = VALID_BGS.includes(obj.bg as (typeof VALID_BGS)[number]) ? String(obj.bg) : 'cream';
  return { species, ear, costume, bg };
}

function formatMessage(m: {
  id: string;
  roomId: string;
  sender: string;
  text: string;
  isCracked: boolean;
  avatarSpecies: string;
  avatarEar: string;
  avatarCostume: string;
  avatarBg: string;
  isBot: boolean;
  createdAt: Date;
}) {
  return {
    id: m.id,
    roomId: m.roomId,
    sender: m.sender,
    text: m.text,
    isCracked: m.isCracked,
    isBot: m.isBot,
    avatar: {
      species: m.avatarSpecies,
      ear: m.avatarEar,
      costume: m.avatarCostume,
      bg: m.avatarBg,
    },
    createdAt: m.createdAt.toISOString(),
  };
}

const DEFAULT_ROOMS_SEED = [
  {
    roomId: 'room_jaw_stretch',
    roomName: '강남 직장인 턱관절 & 이갈이 탈출방 🐾',
    description: '모니터 볼 때 무의식적 이악물기(TCH) 교정 & 턱근육 이완 꿀팁 공유방',
    creator: '화타치과 33년 웰니스팀',
    inviteCode: 'HWATA-OPEN-JAW',
    isDefault: true,
    isPublic: true,
    memberCount: 142,
    topic: '턱관절 통증, 개구장애, 이갈이, 이악물기',
  },
  {
    roomId: 'room_ortho_talk',
    roomName: '치아교정 1~2년차 현실 고민방 🦷',
    description: '유지장치, 발치 vs 비발치, 투명교정 후기 및 닥터 화타 실시간 임상 Q&A',
    creator: '김준헌 병원장 자문단',
    inviteCode: 'HWATA-OPEN-ORTHO',
    isDefault: true,
    isPublic: true,
    memberCount: 98,
    topic: '치아교정, 클리피씨, 인비절라인, 유지장치',
  },
  {
    roomId: 'room_aesthetic_smile',
    roomName: '최소삭제 라미네이트 & 미백 솔직방 ✨',
    description: '자연치아 보존 세라믹 라미네이트 솔직 후기 & 치아미백 관리 노하우',
    creator: '이봉진 대표원장 자문단',
    inviteCode: 'HWATA-OPEN-SMILE',
    isDefault: true,
    isPublic: true,
    memberCount: 85,
    topic: '라미네이트, 치아미백, 심미보철, 앞니',
  },
];

const SEED_MESSAGES_BY_ROOM: Record<
  string,
  Array<{
    sender: string;
    text: string;
    isBot: boolean;
    isCracked?: boolean;
    avatar: AvatarConfig;
    offsetMs: number;
  }>
> = {
  room_jaw_stretch: [
    {
      sender: '개발자김씨',
      text: '컴퓨터하다 보면 나도 모르게 어금니 꽉 물고 있어서 퇴근할 때 턱이 뻐근해요 ㅜㅜ 다들 어떻게 푸시나요?',
      isBot: false,
      avatar: { species: 'dog', ear: 'fox', costume: 'coder', bg: 'sky' },
      offsetMs: 3600000 * 5,
    },
    {
      sender: '🐾 닥터 화타 (화이트스타일 AI)',
      text: '멍멍! 그게 바로 전형적인 TCH(이악물기 습관)입니다 🐾 평소 윗니와 아랫니 사이에 2~3mm의 틈을 두고 "N(은~)" 발음을 유지해 보세요. 혀끝이 입천장 앞쪽에 닿으면서 턱관절 긴장이 풀립니다! 통증이 심할 땐 강남역 화이트스타일치과(1577-7287)에서 3D 진단을 권장합니다.',
      isBot: true,
      avatar: { species: 'dog', ear: 'round', costume: 'doctor', bg: 'gold' },
      offsetMs: 3600000 * 4,
    },
    {
      sender: '강남직장인_은지',
      text: '은~ 발음 해보니까 진짜 턱에 힘 빠지네요! 3D 화타펫 아바타 꾸미고 화타톡 메신저도 써보려고요 ㅎㅎ',
      isBot: false,
      isCracked: true,
      avatar: { species: 'cat', ear: 'perk', costume: 'none', bg: 'peach' },
      offsetMs: 3600000 * 2,
    },
  ],
  room_ortho_talk: [
    {
      sender: '교정6개월차',
      text: '월치료 다녀온 지 3일짼데 죽만 먹고 있어요 ㅠㅠ 딱딱한 거 언제부터 먹을 수 있나요? @화타',
      isBot: false,
      avatar: { species: 'dino', ear: 'perk', costume: 'none', bg: 'mint' },
      offsetMs: 3600000 * 8,
    },
    {
      sender: '🐾 닥터 화타 (화이트스타일 AI)',
      text: '서울대졸·교정학박사 김준헌 병원장님의 33년 임상 조언: 와이어 교체 후 3~4일이 치아이동 압력이 가장 높아 통증이 정점입니다! 5일차부터 서서히 완화되니, 미지근한 연두부나 계란찜을 드시고 찬물 가글을 해주시면 진통에 도움이 됩니다 🦷',
      isBot: true,
      avatar: { species: 'dog', ear: 'round', costume: 'doctor', bg: 'gold' },
      offsetMs: 3600000 * 7,
    },
  ],
  room_aesthetic_smile: [
    {
      sender: '스마일러',
      text: '앞니 벌어진 거 라미네이트 하고 싶은데 치아 많이 깎을까 봐 무서워요. 치아미백이랑 같이 해도 되나요? @화타',
      isBot: false,
      isCracked: true,
      avatar: { species: 'dog', ear: 'fold', costume: 'beret', bg: 'lavender' },
      offsetMs: 3600000 * 6,
    },
    {
      sender: '🐾 닥터 화타 (화이트스타일 AI)',
      text: '강남역 화이트스타일치과의원은 자연치아 보존을 최우선으로 삼아, 법랑질 한계 내에서 0.1~0.3mm 최소삭제 또는 무삭제 세라믹 라미네이트를 원칙으로 합니다. 미백 후 원하는 밝기에 맞춰 세라믹 색상을 디자인하면 더욱 자연스럽습니다 ✨',
      isBot: true,
      avatar: { species: 'dog', ear: 'round', costume: 'doctor', bg: 'gold' },
      offsetMs: 3600000 * 5,
    },
  ],
};

let seedPromise: Promise<void> | null = null;
async function ensureSeeded() {
  if (!seedPromise) {
    seedPromise = (async () => {
      try {
        for (const r of DEFAULT_ROOMS_SEED) {
          const existing = await prisma.hwataRoom.findUnique({ where: { roomId: r.roomId } });
          if (!existing) {
            await prisma.hwataRoom.create({ data: r });
          }
          const msgCount = await prisma.hwataMessage.count({ where: { roomId: r.roomId } });
          if (msgCount === 0 && SEED_MESSAGES_BY_ROOM[r.roomId]) {
            const now = Date.now();
            await prisma.hwataMessage.createMany({
              data: SEED_MESSAGES_BY_ROOM[r.roomId].map((m) => ({
                roomId: r.roomId,
                sender: m.sender,
                text: m.text,
                isBot: m.isBot,
                isCracked: Boolean(m.isCracked),
                avatarSpecies: m.avatar.species,
                avatarEar: m.avatar.ear,
                avatarCostume: m.avatar.costume,
                avatarBg: m.avatar.bg,
                createdAt: new Date(now - m.offsetMs),
              })),
            });
          }
        }
      } catch (err) {
        seedPromise = null;
        throw err;
      }
    })();
  }
  return seedPromise;
}

function buildRuleBasedReply(text: string, sender = '익명'): string {
  const q = String(text || '').trim();

  if (/턱|소리|딱|뻐근|이갈이|턱관절|악관절|보톡스|개구/.test(q)) {
    return `멍멍! ${sender}님, 턱관절에서 소리가 나거나 뻐근할 땐 윗니·아랫니를 2~3mm 살짝 띄우는 '이완 자세'가 필수입니다 🐾 턱을 괴거나 단단한 음식을 피하시고, 온찜질을 10분간 해주세요. 증상이 지속되면 강남역 화이트스타일치과(1577-7287)에서 3D 정밀 진단을 권장합니다.`;
  }
  if (/교정|철사|와이어|통증|클리피씨|투명|인비절라인|유지장치|발치/.test(q)) {
    return `치아교정학 박사 김준헌 병원장님의 임상 팁 🦷 와이어 교체 초기 3~4일은 치근막 압박으로 뻐근한 것이 정상적인 치아이동 반응입니다. 찬물 가글이 일시적 완화에 좋으며, 장치가 찔리거나 탈락했을 땐 치과 전용 왁스를 붙이고 본원(02-569-7528)으로 연락해 주세요!`;
  }
  if (/수능|수험생|수험표/.test(q)) {
    return `수능 끝! 고생 많으셨어요 🎉 강남역 화이트스타일치과 2027 수능 수험생 이벤트 진행 중입니다! 수험표 지참 후 치아교정·최소삭제 라미네이트·지르코니아 등 비급여(비보험) 진료를 받으시면 식약처 허가 전문가 치아미백 1회를 무료로 제공해 드려요(자세히 보기: https://whitestyle.com/events/suneung / 1577-7287).`;
  }
  if (/미백|하얗|누런|착색|라미네이트|앞니|벌어|깨짐|커피|시림/.test(q)) {
    return `자연치아 보존 심미보철 · 미백 원칙 ✨ 치아미백은 시술 직후 일시적으로 시릴 수 있으나 1~2일 내 자연 완화되며, 48시간 동안 커피·카레·와인 등 착색 음식을 피하면 효과가 오래갑니다. 라미네이트는 0.1~0.3mm 최소삭제 또는 무삭제를 원칙으로 합니다! (2027 수능 수험표 지참 비급여 진료 시 치아미백 1회 무료 혜택도 진행 중입니다.)`;
  }
  if (/임플란트|잇몸|피|발치|뼈이식|마취|상악동/.test(q)) {
    return `보건복지부 인증 치주과 전문의 박선혜 원장님 협진 가이드 🐾 임플란트 후 잇몸 출혈이나 붓기는 3단계 통증 완화 마취와 냉찜질(48시간)로 안전하게 가라앉힐 수 있습니다. 술·담배는 골유착을 방해하므로 최소 3주간 금연·금주가 필수입니다!`;
  }
  if (/스케일링|건보|보험|치석|치태|잇몸치료/.test(q)) {
    return `연 1회 건강보험 스케일링 안내 🪥 만 19세 이상 대한민국 국민이라면 매년 1월 1일~12월 31일 사이 건강보험 적용 스케일링을 받으실 수 있습니다. 연말에 예약이 몰리기 전에 강남역 화이트스타일치과(1577-7287)에서 미리 체크하세요!`;
  }

  return `멍멍! ${sender}님, 화타펫 단톡방에 오신 것을 환영해요 🐾 강남역 11·12번 출구 도보 1분 화이트스타일치과의원(1994년 개원 33년 전통 · 김준헌·이봉진·박선혜 3인 원장단 협진)의 닥터 화타가 언제든 치아 고민을 상담해 드립니다!`;
}

async function generateDoctorHwataReply(text: string, sender = '익명'): Promise<string> {
  const apiKey = (process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || '').trim();
  if (apiKey) {
    try {
      const sys = [
        '너는 강남역 11·12번 출구 도보 1분 대승빌딩 B1·1·2층(강남대로92길 17, 1577-7287 / 02-569-7528)에 위치한 1994년 개원 33년 전통 화이트스타일치과의원(서울대졸·단국대 외래교수·교정학 박사 김준헌 병원장, 이봉진 대표원장, 박선혜 치주과 전문의 원장 3인 협진, 3단계 통증 완화 마취)의 단톡방 상주 AI 닥터 화타야.',
        '2027 수능 수험생 이벤트: 수험표 지참 시 교정·라미네이트 등 비급여(비보험) 진료 진행 수험생에게 전문가 치아미백 1회를 무료 제공하며 상세 안내는 https://whitestyle.com/events/suneung 에 있어(건강보험 급여 단독 진료 제외).',
        '2~3문장 이내로 다정하고 전문적인 치의학 임상 답변을 해줘. 원내 정회원 인증 시 화타톡 메신저 프라이빗 방·대용량 파일 전송 기능과 2027 수능 수험표 지참 비급여 진료 시 치아미백 1회 무료 혜택을 정확히 안내해.',
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
    } catch (e) {
      console.warn('[room] Gemini fallback to rule-based reply:', e);
    }
  }
  return buildRuleBasedReply(text, sender);
}

export async function OPTIONS(req: NextRequest) {
  return new NextResponse(null, { status: 204, headers: buildHwataCorsHeaders(req) });
}

export async function GET(req: NextRequest) {
  const member = await requireHwataMember(req);
  if (!member) return loginRequiredResponse(req);
  const corsHeaders = buildHwataCorsHeaders(req);
  try {
    await ensureSeeded();
    const { searchParams } = new URL(req.url);
    const action = (searchParams.get('action') || 'list').toLowerCase();
    const roomId = (searchParams.get('roomId') || 'room_jaw_stretch').trim();

    if (action === 'referral_status') {
      const refCode = (searchParams.get('refCode') || '').trim().toUpperCase();
      if (!refCode) {
        return NextResponse.json({ ok: false, message: 'refCode가 필요합니다.' }, { status: 400, headers: corsHeaders });
      }
      const ref = await prisma.hwataReferral.findUnique({ where: { refCode } });
      const invitedCount = ref?.invitedCount ?? 0;
      return NextResponse.json(
        {
          ok: true,
          refCode,
          invitedCount,
          targetCount: 5,
          remaining: Math.max(0, 5 - invitedCount),
          rewardLabel: '지인 5명 초대 시 VIP 스페셜 아바타 패스 해금',
          voucherCode: ref?.voucherCode ?? null,
        },
        { headers: corsHeaders }
      );
    }

    if (action === 'messages') {
      const sinceRaw = searchParams.get('since');
      const sinceMs = sinceRaw ? Number(sinceRaw) : 0;
      const room = await prisma.hwataRoom.findUnique({ where: { roomId } });
      const msgs = await prisma.hwataMessage.findMany({
        where: {
          roomId,
          ...(sinceMs > 0 ? { createdAt: { gt: new Date(sinceMs) } } : {}),
        },
        orderBy: { createdAt: 'asc' },
        take: 80,
      });

      return NextResponse.json(
        {
          ok: true,
          roomId,
          room: room
            ? {
                roomId: room.roomId,
                roomName: room.roomName,
                description: room.description,
                inviteCode: room.inviteCode,
                isPublic: room.isPublic,
                isDefault: room.isDefault,
                memberCount: room.memberCount,
              }
            : null,
          messages: msgs.map(formatMessage),
          count: msgs.length,
          serverTime: new Date().toISOString(),
        },
        { headers: corsHeaders }
      );
    }

    // Default: action=list (공개방 + ?roomIds=id1,id2 프라이빗 친구방)
    const extraIds = (searchParams.get('roomIds') || '')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
      .slice(0, 20);

    const rooms = await prisma.hwataRoom.findMany({
      where: extraIds.length > 0 ? { OR: [{ isPublic: true }, { roomId: { in: extraIds } }] } : { isPublic: true },
      orderBy: [{ isDefault: 'desc' }, { createdAt: 'desc' }],
      include: {
        _count: { select: { messages: true } },
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
    });

    const summaries = rooms.map((r) => {
      const last = r.messages[0] || null;
      return {
        roomId: r.roomId,
        roomName: r.roomName,
        description: r.description,
        creator: r.creator,
        inviteCode: r.inviteCode,
        isDefault: r.isDefault,
        isPublic: r.isPublic,
        memberCount: r.memberCount,
        topic: r.topic,
        messageCount: r._count.messages,
        lastMessage: last
          ? { text: last.text, sender: last.sender, createdAt: last.createdAt.toISOString() }
          : null,
      };
    });

    return NextResponse.json(
      { ok: true, rooms: summaries, totalRooms: summaries.length, serverTime: new Date().toISOString() },
      { headers: corsHeaders }
    );
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ ok: false, error: msg }, { status: 500, headers: corsHeaders });
  }
}

export async function POST(req: NextRequest) {
  const member = await requireHwataMember(req);
  if (!member) return loginRequiredResponse(req);
  const corsHeaders = buildHwataCorsHeaders(req);
  const memberFallbackName = (member.name || member.email.split('@')[0] || '회원').trim().slice(0, 20);
  try {
    await ensureSeeded();
    const body = await req.json().catch(() => ({}));
    const action = String(body.action || 'list').toLowerCase();

    // 1. 단톡방 개설 (create)
    if (action === 'create') {
      const roomName = String(body.roomName || '').trim().slice(0, 60);
      const creatorChartNo = String(body.chartNo || body.creatorChartNo || '').trim().slice(0, 20) || null;
      const rawHost = String(body.hostNickname || body.nickname || '').trim();
      const hostNickname =
        (rawHost && !rawHost.startsWith('화타_') && rawHost !== '방장' && rawHost !== '익명 화타'
          ? rawHost
          : memberFallbackName
        ).slice(0, 20);
      const isPublic = body.isPublic === true;
      const refCodeParam = String(body.refCode || '').trim().toUpperCase();

      if (!roomName) {
        return NextResponse.json({ ok: false, message: '단톡방 이름을 입력해 주세요.' }, { status: 400, headers: corsHeaders });
      }

      const roomId = `room_user_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`;
      const inviteCode = `HWATA-ROOM-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;

      const newRoom = await prisma.hwataRoom.create({
        data: {
          roomId,
          roomName,
          description: `${hostNickname}님의 화타펫 ${isPublic ? '공개' : '프라이빗'} 단톡방`,
          creator: hostNickname,
          creatorChartNo,
          inviteCode,
          isDefault: false,
          isPublic,
          memberCount: 1,
          topic: '친구 단톡방 · 실시간 치아 상담',
        },
      });

      await prisma.hwataMessage.create({
        data: {
          roomId,
          sender: '🐾 닥터 화타 (화이트스타일 AI)',
          text: `환영합니다! ${hostNickname}님의 단톡방이 개설되었습니다 🎉 [친구 초대 링크 복사]를 눌러 지인들을 불러보세요. 지인 5명 초대 시 스페셜 VIP 아바타 패스가 해금되며, 궁금할 땐 '@화타'를 부르면 바로 답변해 드려요!`,
          isBot: true,
          isCracked: false,
          avatarSpecies: 'dog',
          avatarEar: 'round',
          avatarCostume: 'doctor',
          avatarBg: 'gold',
        },
      });

      const refForLink =
        refCodeParam || (creatorChartNo ? `HWATA-${creatorChartNo.toUpperCase()}` : 'HWATA-FRIEND');

      return NextResponse.json(
        {
          ok: true,
          room: {
            roomId: newRoom.roomId,
            roomName: newRoom.roomName,
            description: newRoom.description,
            creator: newRoom.creator,
            inviteCode: newRoom.inviteCode,
            isDefault: newRoom.isDefault,
            isPublic: newRoom.isPublic,
            memberCount: newRoom.memberCount,
          },
          inviteLink: `https://whitestyle.com/ai-pet?room=${encodeURIComponent(roomId)}&ref=${encodeURIComponent(refForLink)}#community`,
          message: '새로운 단톡방이 성공적으로 생성되었습니다!',
        },
        { headers: corsHeaders }
      );
    }

    // 2. 메시지 전송 (send)
    if (action === 'send') {
      const roomId = String(body.roomId || 'room_jaw_stretch').trim();
      const rawSender = String(body.sender || body.nickname || '').trim();
      const sender =
        (rawSender && rawSender !== '익명' && rawSender !== '익명 화타'
          ? rawSender
          : memberFallbackName
        ).slice(0, 20);
      const text = String(body.text || body.message || '').trim().slice(0, 500);
      const chartNo = String(body.chartNo || '').trim().slice(0, 20) || null;
      const isCracked = Boolean(body.isCracked || chartNo);
      const avatar = sanitizeAvatar(body.avatar);

      if (!text) {
        return NextResponse.json({ ok: false, message: '메시지 내용을 입력해 주세요.' }, { status: 400, headers: corsHeaders });
      }

      // 방이 없으면 안전하게 생성하지 않고 존재 여부 확인 (초대링크 방 등)
      const room = await prisma.hwataRoom.findUnique({ where: { roomId } });
      if (!room) {
        return NextResponse.json({ ok: false, message: '존재하지 않는 단톡방입니다.' }, { status: 404, headers: corsHeaders });
      }

      const savedUser = await prisma.hwataMessage.create({
        data: {
          roomId,
          sender,
          text,
          chartNo,
          isCracked,
          avatarSpecies: avatar.species,
          avatarEar: avatar.ear,
          avatarCostume: avatar.costume,
          avatarBg: avatar.bg,
          isBot: false,
        },
      });

      let savedBot = null;
      const isDoctorCall = text.includes('@화타') || text.includes('화타야') || text.includes('닥터화타');
      const hasDentalQuestion =
        /[?？]/.test(text) && /치과|치아|턱|교정|이빨|라미네이트|임플란트|스케일링|마취|통증|시려|미백|수능|수험생|수험표/.test(text);

      if (isDoctorCall || hasDentalQuestion) {
        const botText = await generateDoctorHwataReply(text, sender);
        savedBot = await prisma.hwataMessage.create({
          data: {
            roomId,
            sender: '🐾 닥터 화타 (화이트스타일 AI)',
            text: botText,
            isBot: true,
            isCracked: false,
            avatarSpecies: 'dog',
            avatarEar: 'round',
            avatarCostume: 'doctor',
            avatarBg: 'gold',
            createdAt: new Date(Date.now() + 80),
          },
        });
      }

      const recent = await prisma.hwataMessage.findMany({
        where: { roomId },
        orderBy: { createdAt: 'desc' },
        take: 40,
      });

      return NextResponse.json(
        {
          ok: true,
          sentMessage: formatMessage(savedUser),
          botReply: savedBot ? formatMessage(savedBot) : null,
          recentMessages: recent.reverse().map(formatMessage),
        },
        { headers: corsHeaders }
      );
    }

    // 3. 리퍼럴 지인 초대 확인 (referral — 지인 5명 초대 시 VIP 스페셜 아바타 패스)
    if (action === 'referral') {
      const refCode = String(body.refCode || body.ref || '').trim().toUpperCase().slice(0, 32);
      const guestId = String(body.guestId || member.id).trim().slice(0, 64);

      if (!refCode) {
        return NextResponse.json({ ok: false, message: '추천인 코드가 필요합니다.' }, { status: 400, headers: corsHeaders });
      }

      let record = await prisma.hwataReferral.findUnique({ where: { refCode } });
      if (!record) {
        record = await prisma.hwataReferral.create({
          data: {
            refCode,
            chartNo: refCode.startsWith('HWATA-') ? refCode.slice(6) : null,
            invitedCount: 0,
            invitedGuests: '[]',
          },
        });
      }

      let guests: string[] = [];
      try {
        const parsed = JSON.parse(record.invitedGuests || '[]');
        if (Array.isArray(parsed)) guests = parsed.map(String);
      } catch {
        guests = [];
      }

      const effectiveGuestId = guestId || member.id;
      let counted = false;

      if (!guests.includes(effectiveGuestId)) {
        guests.push(effectiveGuestId);
        if (guests.length > 200) guests = guests.slice(-200);
        const newCount = record.invitedCount + 1;
        let voucherCode = record.voucherCode;
        if (newCount >= 5 && !voucherCode) {
          voucherCode = `WS-VIP-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
        }

        record = await prisma.hwataReferral.update({
          where: { refCode },
          data: {
            invitedCount: newCount,
            invitedGuests: JSON.stringify(guests),
            voucherCode,
          },
        });
        counted = true;
      }

      const remaining = Math.max(0, 5 - record.invitedCount);
      return NextResponse.json(
        {
          ok: true,
          refCode,
          counted,
          invitedCount: record.invitedCount,
          targetCount: 5,
          remaining,
          rewardLabel: '지인 5명 초대 시 VIP 스페셜 아바타 패스 해금',
          voucherCode: record.voucherCode,
          message:
            record.invitedCount >= 5
              ? `🎉 축하합니다! 지인 5명 초대 달성으로 [VIP 스페셜 아바타 패스](${record.voucherCode})가 발급되었습니다!`
              : `🎉 지인 합류 완료! 현재 ${record.invitedCount}/5명 (VIP 아바타 패스까지 ${remaining}명 남음)`,
        },
        { headers: corsHeaders }
      );
    }

    return NextResponse.json({ ok: false, message: `알 수 없는 액션: ${action}` }, { status: 400, headers: corsHeaders });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ ok: false, error: msg }, { status: 500, headers: corsHeaders });
  }
}
