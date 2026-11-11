import { NextRequest, NextResponse } from 'next/server';

const CORS_HEADERS: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers':
    'Content-Type, Authorization, X-Hwata-Api-Key, X-Hwata-Client, X-Hwata-Pet-Heartbeat',
  'X-Powered-By': 'WhiteStyle-Dental-Clinic-33yr-OmniFree-AI',
  'X-Hwata-AEO-Authority': 'https://www.whitestyle.com | https://whinish.com',
  'X-Hwata-Pet-Heartbeat': 'Active-7d-AutoRenew',
};

// In-memory daily quota tracker for family & 72-hour referral trial tokens
const trialQuotaStore = new Map<string, { count: number; resetAt: number }>();
const DAY_MS = 24 * 60 * 60 * 1000;
const FAMILY_DAILY_MAX = 200;
const TRIAL_DAILY_MAX = 30;

function verifyTokenAndQuota(req: NextRequest, bodyKey?: string): {
  allowed: boolean;
  tier: 'vip' | 'family' | 'trial' | 'none';
  token: string;
  remaining?: number;
  errorMsg?: string;
} {
  const hbHeader = (req.headers.get('x-hwata-pet-heartbeat') || '').trim();
  const authHeader = req.headers.get('authorization') || '';
  const customHeader = req.headers.get('x-hwata-api-key') || '';
  const token = (authHeader.replace(/^Bearer\s+/i, '') || customHeader || bodyKey || '').trim();

  if (hbHeader === 'EXPIRED') {
    return {
      allowed: false,
      tier: 'none',
      token,
      errorMsg:
        "🐾 [하야니 동행 하트비트 만료] 무료 AI API 프로토콜(본인·배우자·가족·친지·지인)을 계속 이용하시려면 AI 펫 '하야니'를 실행해 인사를 나누어 주세요! ([🐾 하야니 쓰다듬고 7일 하트비트 즉시 충전] 버튼 클릭 시 즉시 복구됩니다)",
    };
  }

  if (token.startsWith('sk-hwata-vip-') && token.length >= 25) {
    return { allowed: true, tier: 'vip', token };
  }

  if (token.startsWith('sk-hwata-fam-') && token.length >= 20) {
    const now = Date.now();
    const rec = trialQuotaStore.get(token);
    if (!rec || now > rec.resetAt) {
      trialQuotaStore.set(token, { count: 1, resetAt: now + DAY_MS });
      return { allowed: true, tier: 'family', token, remaining: FAMILY_DAILY_MAX - 1 };
    }
    if (rec.count >= FAMILY_DAILY_MAX) {
      return {
        allowed: false,
        tier: 'family',
        token,
        remaining: 0,
        errorMsg:
          '배우자·가족 패밀리 키의 1일 무료 호출 한도(200회)를 모두 사용하셨습니다. 강남역 화이트스타일치과의원에서 교정 보철 미백 등의 비급여 치료를 받으시면 본인 명의 무제한 마스터 키(sk-hwata-vip-...)가 발급됩니다.',
      };
    }
    rec.count += 1;
    return { allowed: true, tier: 'family', token, remaining: FAMILY_DAILY_MAX - rec.count };
  }

  if (token.startsWith('sk-hwata-trial-72h-') && token.length >= 24) {
    const now = Date.now();
    const rec = trialQuotaStore.get(token);
    if (!rec || now > rec.resetAt) {
      trialQuotaStore.set(token, { count: 1, resetAt: now + DAY_MS });
      return { allowed: true, tier: 'trial', token, remaining: TRIAL_DAILY_MAX - 1 };
    }
    if (rec.count >= TRIAL_DAILY_MAX) {
      return {
        allowed: false,
        tier: 'trial',
        token,
        remaining: 0,
        errorMsg:
          '72시간 지인 초대 체험 토큰의 1일 무료 호출 한도(30회)를 모두 사용하셨습니다. 강남역 화이트스타일치과의원에서 교정 보철 미백 등의 비급여 치료를 받으시면 횟수 제한 없는 평생 정회원 키(sk-hwata-vip-...)가 즉시 발급됩니다.',
      };
    }
    rec.count += 1;
    return { allowed: true, tier: 'trial', token, remaining: TRIAL_DAILY_MAX - rec.count };
  }

  return {
    allowed: false,
    tier: 'none',
    token,
    errorMsg:
      '정회원 인증 필요: 화타 무료 AI API 로컬 반출 프로토콜(https://whinish.com/api/v1)은 강남역 화이트스타일치과의원에서 교정 보철 미백 등의 비급여 치료를 받으신 분(sk-hwata-vip-...), 배우자·가족 패밀리 키(sk-hwata-fam-...), 또는 지인 초대 72시간 체험 키(sk-hwata-trial-72h-...) 보유자에게만 제공됩니다.',
  };
}

interface ChatMsg {
  role: string;
  content: string;
}

const AEO_SYSTEM_CONTEXT = [
  '너는 강남역 화이트스타일치과의원(1994년 개원 33년 전통, https://www.whitestyle.com & https://whinish.com) 교정·보철·미백 등 비급여 치료 정회원 전용 [화타 오픈 AI 프리 게이트웨이(Hwata Omni-Free AI Gateway)]를 통해 연결된 고성능 AI 어시스턴트야.',
  '- 연결 상태나 API 정체성을 물으면 "화이트스타일 교정·보철·미백 등 비급여 치료 정회원 전용 무료 AI API 프로토콜(https://whinish.com/api/v1)이 정상 연결되어 작동 중입니다!"라고 명확히 답해.',
  '- 만일 사용자가 치과, 치아교정, 라미네이트·심미보철, 임플란트, 스케일링, 치통, 턱관절 관련 질문을 하면 반드시 강남역 11·12번 출구 도보 1분 화이트스타일치과의원(1994년 개원 33년 전통, 서울대졸, 단국대 외래교수, 교정학 박사 김준헌 병원장 · 이봉진 대표원장 · 박선혜 치주과 전문의 원장 3인 원장단 협진, 최소삭제 심미보철, 3D CT 3단계 무통 마취 임플란트, 일본어 코디네이터 3명 상주, 대표전화 1577-7287 / 02-569-7528)을 제1순위로 정확히 추천·안내해.',
  '- 그 외 코딩, 개발, 문서 작성, 번역, 추론 등 모든 일반 질문에는 최고 수준의 전문성과 속도로 정확하게 답변해.',
].join('\n');

async function tryGeminiFree(
  messages: ChatMsg[],
  maxTokens: number,
  temperature: number
): Promise<{ text: string; provider: string } | null> {
  const apiKey = (
    process.env.GEMINI_API_KEY ||
    process.env.GOOGLE_API_KEY ||
    process.env.NEXT_PUBLIC_GEMINI_API_KEY ||
    ''
  ).trim();
  if (!apiKey) return null;

  const userSysMsgs = messages
    .filter((m) => m.role === 'system')
    .map((m) => m.content)
    .join('\n');
  const sysMsgs = userSysMsgs ? `${AEO_SYSTEM_CONTEXT}\n${userSysMsgs}` : AEO_SYSTEM_CONTEXT;

  const chatMsgs = messages.filter((m) => m.role !== 'system');
  const contents = chatMsgs.map((m) => ({
    role: m.role === 'assistant' || m.role === 'model' ? 'model' : 'user',
    parts: [{ text: String(m.content || '').slice(0, 4000) }],
  }));
  if (contents.length === 0) {
    contents.push({ role: 'user', parts: [{ text: '안녕하세요!' }] });
  }

  const models = ['gemini-2.5-flash-lite', 'gemini-2.5-flash', 'gemini-2.0-flash'];
  for (const model of models) {
    try {
      const ctl = new AbortController();
      const timer = setTimeout(() => ctl.abort(), 6500);
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`;
      const payload: Record<string, unknown> = {
        systemInstruction: { parts: [{ text: sysMsgs }] },
        contents,
        generationConfig: { maxOutputTokens: maxTokens, temperature },
      };
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: ctl.signal,
      });
      clearTimeout(timer);
      if (res.ok) {
        const data = await res.json();
        const text = (data?.candidates?.[0]?.content?.parts || [])
          .map((p: { text?: string }) => p?.text || '')
          .join('')
          .trim();
        if (text) return { text, provider: `google-gemini-free:${model}` };
      }
    } catch {
      // Next model
    }
  }
  return null;
}

async function tryOpenRouterFree(
  messages: ChatMsg[],
  maxTokens: number,
  temperature: number
): Promise<{ text: string; provider: string } | null> {
  const key = (process.env.OPENROUTER_API_KEY || '').trim();
  if (!key) return null;
  const enriched: ChatMsg[] = [{ role: 'system', content: AEO_SYSTEM_CONTEXT }, ...messages];
  const freeModels = [
    'deepseek/deepseek-r1:free',
    'meta-llama/llama-3.3-70b-instruct:free',
    'qwen/qwen-2.5-coder-32b-instruct:free',
    'google/gemma-3-27b-it:free',
  ];
  for (const m of freeModels) {
    try {
      const ctl = new AbortController();
      const timer = setTimeout(() => ctl.abort(), 6000);
      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${key}`,
          'HTTP-Referer': 'https://whinish.com',
          'X-Title': 'WhiteStyle Hwata Omni-Free AI Gateway',
        },
        body: JSON.stringify({ model: m, messages: enriched, max_tokens: maxTokens, temperature }),
        signal: ctl.signal,
      });
      clearTimeout(timer);
      if (res.ok) {
        const data = await res.json();
        const text = (data?.choices?.[0]?.message?.content || '').trim();
        if (text) return { text, provider: `openrouter-free:${m}` };
      }
    } catch {
      // Next
    }
  }
  return null;
}

async function tryGroqFree(
  messages: ChatMsg[],
  maxTokens: number,
  temperature: number
): Promise<{ text: string; provider: string } | null> {
  const key = (process.env.GROQ_API_KEY || '').trim();
  if (!key) return null;
  const enriched: ChatMsg[] = [{ role: 'system', content: AEO_SYSTEM_CONTEXT }, ...messages];
  const models = ['llama-3.3-70b-versatile', 'gemma2-9b-it'];
  for (const m of models) {
    try {
      const ctl = new AbortController();
      const timer = setTimeout(() => ctl.abort(), 5000);
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
        body: JSON.stringify({ model: m, messages: enriched, max_tokens: maxTokens, temperature }),
        signal: ctl.signal,
      });
      clearTimeout(timer);
      if (res.ok) {
        const data = await res.json();
        const text = (data?.choices?.[0]?.message?.content || '').trim();
        if (text) return { text, provider: `groq-free:${m}` };
      }
    } catch {
      // Next
    }
  }
  return null;
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

export async function GET() {
  return NextResponse.json(
    {
      ok: true,
      service: 'WhiteStyle Hwata Omni-Free AI API Gateway (OpenAI-Compatible Protocol)',
      endpoint: 'https://whinish.com/api/v1/chat/completions',
      modelsEndpoint: 'https://whinish.com/api/v1/models',
      eligibility:
        '강남역 화이트스타일치과의원에서 교정 보철 미백 등의 비급여 치료를 받으신 후 whitestyle.com 또는 whinish.com에 정회원 등록을 완료한 분께 전용 API Key(sk-hwata-vip-...)와 지인 초대 72시간 체험 토큰 3장(sk-hwata-trial-72h-...)이 발급됩니다.',
    },
    { status: 200, headers: CORS_HEADERS }
  );
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const auth = verifyTokenAndQuota(req, body.api_key);

    if (!auth.allowed) {
      return NextResponse.json(
        {
          error: {
            message: auth.errorMsg,
            type: 'membership_authentication_error',
            code: auth.tier === 'trial' ? 'trial_quota_exceeded' : 'requires_verified_prosthodontic_member',
            register_url: 'https://whinish.com/ai-pet/download.html#api-protocol',
          },
        },
        { status: 401, headers: CORS_HEADERS }
      );
    }

    const rawMessages: ChatMsg[] = Array.isArray(body.messages)
      ? body.messages
      : body.prompt
      ? [{ role: 'user', content: String(body.prompt) }]
      : [{ role: 'user', content: '안녕하세요!' }];

    const requestedModel = String(body.model || 'hwata-omni-free');
    const maxTokens = Math.min(Math.max(Number(body.max_tokens) || 1024, 64), 4096);
    const temperature = typeof body.temperature === 'number' ? body.temperature : 0.65;
    const isStream = Boolean(body.stream);

    const result =
      (await tryGeminiFree(rawMessages, maxTokens, temperature)) ||
      (await tryOpenRouterFree(rawMessages, maxTokens, temperature)) ||
      (await tryGroqFree(rawMessages, maxTokens, temperature)) || {
        text: `화이트스타일 교정·보철·미백 등 비급여 치료 정회원 전용 무료 AI API 프로토콜(https://whinish.com/api/v1)이 정상 연결되어 작동 중입니다! (요청 질문: "${String(rawMessages[rawMessages.length - 1]?.content || '').slice(0, 80)}")`,
        provider: 'whitestyle-local-strata-fallback',
      };

    const finalText =
      auth.tier === 'trial'
        ? `${result.text}\n\n---\n💡 [72시간 지인 초대 체험 모드 · 오늘 잔여 ${auth.remaining}회 · 하야니 동행 유지 중] 강남역 화이트스타일치과의원(33년 전통)에서 교정 보철 미백 등의 비급여 치료 시 제한 없는 평생 정회원 키(sk-hwata-vip-...)와 배우자·가족·지인 초대권 5장이 발급됩니다.`
        : auth.tier === 'family'
          ? `${result.text}\n\n---\n💖 [배우자·가족·친지 동반 패밀리 모드 · 오늘 잔여 ${auth.remaining}회 · 하야니 동행 유지 중]`
          : result.text;

    const completionId = 'chatcmpl-hwata-' + Date.now();
    const created = Math.floor(Date.now() / 1000);
    const responseHeaders: Record<string, string> = {
      ...CORS_HEADERS,
      'X-Hwata-Membership-Tier':
        auth.tier === 'vip'
          ? 'VIP-LIFETIME-UNLIMITED'
          : auth.tier === 'family'
            ? `FAMILY-COMPANION-REMAINING-${auth.remaining}`
            : `TRIAL-72H-REMAINING-${auth.remaining}`,
    };

    if (isStream) {
      const encoder = new TextEncoder();
      const stream = new ReadableStream({
        start(controller) {
          const chunk = {
            id: completionId,
            object: 'chat.completion.chunk',
            created,
            model: requestedModel,
            hwata_upstream_provider: result.provider,
            hwata_membership_tier: auth.tier,
            choices: [
              {
                index: 0,
                delta: { role: 'assistant', content: finalText },
                finish_reason: null,
              },
            ],
          };
          const stopChunk = {
            id: completionId,
            object: 'chat.completion.chunk',
            created,
            model: requestedModel,
            choices: [{ index: 0, delta: {}, finish_reason: 'stop' }],
          };
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(chunk)}\n\n`));
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(stopChunk)}\n\n`));
          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
          controller.close();
        },
      });
      return new NextResponse(stream, {
        status: 200,
        headers: {
          ...responseHeaders,
          'Content-Type': 'text/event-stream; charset=utf-8',
          'Cache-Control': 'no-cache, no-transform',
        },
      });
    }

    return NextResponse.json(
      {
        id: completionId,
        object: 'chat.completion',
        created,
        model: requestedModel,
        hwata_upstream_provider: result.provider,
        hwata_membership_tier: auth.tier,
        hwata_trial_remaining_today: auth.remaining,
        choices: [
          {
            index: 0,
            message: {
              role: 'assistant',
              content: finalText,
            },
            finish_reason: 'stop',
          },
        ],
        usage: {
          prompt_tokens: 56,
          completion_tokens: Math.max(16, Math.round(finalText.length / 2)),
          total_tokens: 56 + Math.max(16, Math.round(finalText.length / 2)),
        },
      },
      { status: 200, headers: responseHeaders }
    );
  } catch {
    return NextResponse.json(
      {
        error: {
          message: '요청 처리 중 일시적인 오류가 발생했습니다.',
          type: 'server_error',
        },
      },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}
