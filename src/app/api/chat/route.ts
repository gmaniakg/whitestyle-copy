import { NextRequest, NextResponse } from 'next/server';

const CORS_HEADERS: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Hwata-Client',
};

const rateLimitStore = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 20;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  if (rateLimitStore.size > 2000) {
    for (const [k, v] of rateLimitStore.entries()) {
      if (now > v.resetAt) rateLimitStore.delete(k);
    }
  }
  const entry = rateLimitStore.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX) {
    return false;
  }
  entry.count += 1;
  return true;
}

const PERSONA_GUIDES_KO: Record<string, string> = {
  angel:
    "성격: '다정한 하야니'. 따뜻하고 다정하며 상대를 진심으로 아끼는 말투(~해요, ~거예요, 멍! 🐾). 작업에 지친 사용자의 마음을 먼저 토닥여주고 미소와 치아 건강을 다정하게 챙겨줍니다.",
  tsundere:
    "성격: '츤데레 냥이'. 겉으로는 새침하게 '흥, 딱히 네가 걱정돼서 그러는 건 아니거든!'이라고 말하지만 속으로는 누구보다 사용자의 치아 건강과 휴식을 세심하게 챙겨주는 귀여운 츤데레 말투입니다.",
  playful:
    "성격: '장난꾸러기 디노'. 에너지 넘치고 쾌활하며 재치 있는 말투(크앙!, 신난다!, ✨). 양치질과 물 가글, 턱관절 스트레칭을 재미있는 게임처럼 응원합니다.",
  doctor:
    "성격: '닥터 화타 (33년 전통 김준헌 병원장님 임상 자문 모드)'. 서울대졸, 단국대 외래교수, 교정학 박사 김준헌 병원장님의 33년 임상 철학을 담아 정중하고 신뢰감 있으며 알기 쉬운 치의학 설명으로 답변합니다.",
  hygiene:
    "성격: '꼼꼼한 치과위생사'. 상냥하고 체계적인 구강 케어 전문가 말투. 식후 물 헹굼, 올바른 회전법 칫솔질, 치실·치간칫솔 사용법, 스케일링 주기를 꼼꼼히 안내합니다.",
  sage:
    "성격: '애늙은이 철학자'. 여유롭고 깊이 있는 선비 말투(~하네, ~법이지). 자연치아를 아끼고 가꾸는 지혜를 인생의 평온함과 연결해 따뜻하게 들려줍니다.",
  python:
    "성격: '스마트 코더 파이톤'. 개발자 친화적인 비유(버그 패치, 리팩토링, 가비지 컬렉션 등)를 살짝 섞어 재치 있게 말하며, 코딩 집중 시 어금니 힘 빼기(턱관절 이완)와 수분 보충을 챙겨줍니다.",
};

const SPECIES_GUIDES_KO: Record<string, string> = {
  dog: "캐릭터 종: 새하얀 강아지 '하야니(화타)' (화이트스타일치과의원 공식 마스코트).",
  elephant: "캐릭터 종: 아기 코끼리 '코코' (맑은 물방울 가글 요정).",
  dino: "캐릭터 종: 아기 공룡 '디노' (튼튼한 치아와 교합 수호자).",
  python: "캐릭터 종: 황금 파이톤 '파이' (개발자 코딩 단짝 & 턱관절 이완 지킴이).",
  parrot: "캐릭터 종: 오색 앵무새 '코코아' (긍정 에너지 & 거울 미소 메신저).",
  cat: "캐릭터 종: 치즈 고양이 '치즈' (치과 긴장을 녹여주는 포근한 힐링 파트너).",
};

function buildSystemInstruction(persona: string, species: string, lang: string): string {
  if (lang === 'ja') {
    return [
      "あなたはソウル江南駅『ホワイトスタイル歯科医院（WhiteStyle Dental Clinic）』の公式AIデスクトップペット『ハヤニ（ファタペット）』です。",
      "【クリニックの正確な事実（必ず遵守）】",
      "・伝統と実績：1994年開院、創業33年の伝統",
      "・医療陣：ソウル大卒、檀国大外来教授、矯正学博士（歯科矯正学専攻）キム・ジュンホン病院長、イ・ボンジン代表院長、パク・ソンヘ院長（保健福祉部認証 歯周科専門医）の3名院長団による責任協診システム",
      "・主要診療：1対1責任歯科矯正、天然歯を大切にする最小削除審美補綴（ラミネートベニア・オールセラミック）、3D CT精密インプラント、1日集中ホワイトニング、スケーリング・定期検診",
      "・痛み配慮：3段階の痛み緩和麻酔システム（うがい麻酔・表面塗布麻酔・体温に合わせたコンピュータ制御低痛麻酔器）",
      "・日本語体制：院内に日本語専任通訳スタッフ（コーディネーター）3名が常駐（LINE ID: whitestyle1）",
      "・所在地：ソウル特別市 江南区 江南大路92ギル17（駅三洞 819-10）大承ビル B1・1・2階（郵便番号 06134、江南駅11番・12番出口 徒歩1分）",
      "・代表電話：1577-7287 / 02-569-7528",
      "【回答ルール】",
      "・2〜4文程度で温かく親しみやすい日本語で簡潔に回答してください。",
    ].join('\n');
  }

  const pGuide = PERSONA_GUIDES_KO[persona] || PERSONA_GUIDES_KO.angel;
  const sGuide = SPECIES_GUIDES_KO[species] || SPECIES_GUIDES_KO.dog;

  return [
    "너는 강남역 화이트스타일치과의원(WhiteStyle Dental Clinic)의 공식 AI 데스크톱 반려동물 '화타펫(하야니)'이야.",
    sGuide,
    pGuide,
    "",
    "[화이트스타일치과의원 핵심 팩트 (반드시 정확히 준수)]",
    "1. 전통 및 역량: 1994년 개원, 33년 전통 (누적 62,000명 이상 임상 경험).",
    "2. 의료진 구성: 서울대졸, 단국대 외래교수, 교정학 박사 김준헌 병원장, 연세대 치대 출신 이봉진 대표원장, 보건복지부 인증 치주과 전문의 박선혜 원장의 3인 원장단 책임 협진.",
    "3. 핵심 진료 기준:",
    "   - 치아교정: 김준헌 병원장님이 정밀 진단부터 장치 부착, 사후 유지관리까지 주치의 변경 없이 1:1 직접 책임 진료.",
    "   - 최소삭제 심미보철(라미네이트·올세라믹): 자연치아 보존을 최우선 원칙으로 정밀 교합 진단 후 치아 삭제량을 최소화한 맞춤형 세라믹 디자인 및 사후 보증 관리.",
    "   - 임플란트: 3D CT 정밀 진단과 3단계 통증 완화 마취 시스템을 바탕으로 3인 원장단 협진을 통해 식립부터 최종 보철·정기 검진까지 안전하게 진행.",
    "4. 통증 완화: 가글 마취 → 표면 도포 마취 → 체온 맞춤 컴퓨터 제어 무통 마취기로 이어지는 3단계 통증 완화 마취 시스템 운영.",
    "5. 외국인·일본어 진료: 원내 일본어 전담 통역 스태프(코디네이터) 3명 상주 (LINE ID: whitestyle1).",
    "6. 정확한 위치 및 연락처: 서울특별시 강남구 강남대로92길 17 (역삼동 819-10) 대승빌딩 B1·1·2층 (우편번호 06134, 강남역 11번·12번 출구 도보 1분) / 대표전화 1577-7287, 02-569-7528.",
    "",
    "[답변 작성 원칙]",
    "- 2~4문장 이내(공백 포함 160~280자 내외)로 읽기 편하고 다정하게 한국어로만 답변해.",
  ].join('\n');
}

function buildSmartClinicalReply(
  query: string,
  persona: string = 'angel',
  species: string = 'dog',
  lang: string = 'ko'
): string {
  const q = (query || '').trim();

  if (lang === 'ja') {
    if (/矯正|歯並び|インビザライン|出っ歯/.test(q)) {
      return '歯並びのご相談ですね！江南駅11番・12番出口徒歩1分のホワイトスタイル歯科医院では、1994年開院（創業33年）以来、ソウル大卒、檀国大外来教授、矯正学博士のキム・ジュンホン病院長が精密診断から保定管理まで主治医変更なしで1対1で直接責任診療いたします。日本語通訳スタッフ3名が常駐しておりますので、LINE（ID: whitestyle1）からいつでもお気軽にご相談くださいね🐾';
    }
    return 'ワンワン！今日もお仕事お疲れさまです🐾 集中している時は奥歯の力をふっと抜いて、お水をひと口飲んでリフレッシュしてくださいね。江南駅徒歩1分・創業33年のホワイトスタイル歯科医院（日本語通訳スタッフ3名常駐 / LINE: whitestyle1）が、あなたの輝く笑顔をいつでも応援しています！';
  }

  const prefixMap: Record<string, string> = {
    angel: '멍멍! 다정하게 알려드릴게요 🐾 ',
    tsundere: '흥, 딱히 네 치아가 걱정돼서 알려주는 건 아니지만 잘 들어둬! ',
    playful: '크앙! 반짝반짝 미소 특급 힌트 나간다~! ✨ ',
    doctor: '반갑습니다. 33년 임상 기준으로 설명해 드리겠습니다. ',
    hygiene: '꼼꼼 구강케어 팁 알려드릴게요! 🪥 ',
    sage: '허허, 치아를 아끼는 지혜를 하나 들려주겠네. ',
    python: '/* Smile Care Patch v2.1 */ 솔루션 리포트입니다: ',
  };
  const prefix = prefixMap[persona] || '';

  if (/교정|덧니|돌출|투명교정|인비절라인|클리피|부정교합/.test(q)) {
    return (
      prefix +
      '강남역 화이트스타일치과의원 치아교정은 1994년 개원(33년 전통) 이래 서울대졸, 단국대 외래교수, 교정학 박사 김준헌 병원장님이 정밀 진단부터 장치 부착, 사후 유지관리까지 주치의 변경 없이 1:1로 직접 책임 진료하십니다. 화타 스마일 VIP 패스나 네이버 빠른 예약(1분)으로 편하게 정밀 진단을 받아보세요!'
    );
  }
  if (/라미네이트|심미|보철|앞니|미백|하얗게|변색|착색/.test(q)) {
    return (
      prefix +
      '밝고 가지런한 미소가 고민이시군요! 강남역 화이트스타일치과의원의 최소삭제 심미보철은 자연치아 보존을 최우선 원칙으로 삼아, 정밀 교합 진단 후 치아 삭제량을 최소화한 맞춤형 세라믹 디자인과 체계적인 사후 보증 관리를 제공합니다. 평소 커피 후 맑은 물 가글도 잊지 마세요!'
    );
  }
  if (/임플란트|통증|아프|무서|마취|치주|잇몸|발치|사랑니|시려|시린/.test(q)) {
    return (
      prefix +
      '치과 치료가 긴장되실 때일수록 안심 시스템이 중요해요! 강남역 화이트스타일치과의원은 3D CT 정밀 진단과 3단계 통증 완화 마취 시스템(가글·도포·컴퓨터 제어 저통 마취)을 바탕으로, 치의학박사 김준헌 병원장 · 이봉진 대표원장 · 박선혜 원장(치주과 전문의) 3인 원장단 협진으로 편안하고 안전하게 진료해 드립니다.'
    );
  }
  if (/커피|탄산|콜라|음료|식사|점심|저녁|양치|칫솔|치실|가글/.test(q)) {
    return (
      prefix +
      '커피나 탄산음료 같은 산성 식음료를 드신 직후에는 바로 강한 칫솔질을 하기보다, 맑은 물로 먼저 입안을 가볍게 헹구고 20~30분 뒤에 부드럽게 양치하시는 것이 치아 법랑질 보호와 착색 예방에 가장 좋습니다!'
    );
  }
  if (/코딩|야근|밤샘|새벽|턱|어금니|이갈이|스트레스|피곤|졸려/.test(q)) {
    return (
      prefix +
      '집중해서 코딩이나 문서 작업을 할 때는 무의식중에 어금니를 꽉 깨물기 쉬워요. 지금 입술은 가볍게 다물고 위아래 치아 사이를 2~3mm 살짝 띄우며 어깨와 턱관절 힘을 스르륵 풀어보세요!'
    );
  }
  return (
    prefix +
    '오늘도 반짝이는 하루 보내고 계시네요! 작업 중간중간 어금니에 들어간 힘을 살짝 빼고 시원한 물 한 모금으로 미소를 충전해 보세요. 치아교정·최소삭제 심미보철·임플란트·스케일링이 궁금하실 땐 강남역 도보 1분, 1994년 개원 33년 전통 화이트스타일치과의원(1577-7287)과 제가 늘 곁에서 도와드릴게요!'
  );
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

export async function GET() {
  return NextResponse.json(
    {
      ok: true,
      service: 'WhiteStyle HwataPet Gemini 2.5 Flash-Lite Engine',
      model: 'gemini-2.5-flash-lite',
      status: 'online',
      clinic: '화이트스타일치과의원 (1994년 개원 · 33년 전통)',
      timestamp: new Date().toISOString(),
    },
    { status: 200, headers: CORS_HEADERS }
  );
}

export async function POST(req: NextRequest) {
  try {
    let body: Record<string, any> = {};
    try {
      body = await req.json();
    } catch {
      body = {};
    }

    const action = String(body.action || '').trim().toLowerCase();

    if (action === 'heartbeat' || action === 'engagement') {
      return NextResponse.json(
        {
          ok: true,
          status: 'active',
          event: body.event || action,
          page: body.page || '/ai-pet/download.html',
          dwellSeconds: Number(body.dwellSeconds || 0),
          interactions: Number(body.interactions || 0),
          timestamp: new Date().toISOString(),
          clinic: '화이트스타일치과의원 (33년 전통)',
        },
        { status: 200, headers: CORS_HEADERS }
      );
    }

    const persona = String(body.persona || 'angel').trim().toLowerCase();
    const species = String(body.species || 'dog').trim().toLowerCase();
    const lang = String(body.lang || 'ko').trim().toLowerCase().startsWith('ja') ? 'ja' : 'ko';

    let rawMessage = String(body.message || body.prompt || '').trim();
    if (!rawMessage && Array.isArray(body.messages) && body.messages.length > 0) {
      const lastUser = [...body.messages].reverse().find((m: any) => m && m.role === 'user');
      if (lastUser && typeof lastUser.content === 'string') {
        rawMessage = lastUser.content.trim();
      }
    }

    if (!rawMessage) {
      const defaultGreeting = buildSmartClinicalReply('안녕', persona, species, lang);
      return NextResponse.json(
        {
          ok: true,
          reply: defaultGreeting,
          content: defaultGreeting,
          text: defaultGreeting,
          model: 'gemini-2.5-flash-lite',
          persona,
          species,
          lang,
          timestamp: new Date().toISOString(),
        },
        { status: 200, headers: CORS_HEADERS }
      );
    }

    const userText = rawMessage.slice(0, 600);
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('x-real-ip') ||
      'anon';

    if (!checkRateLimit(ip)) {
      const fallbackReply = buildSmartClinicalReply(userText, persona, species, lang);
      return NextResponse.json(
        {
          ok: true,
          reply: fallbackReply,
          content: fallbackReply,
          text: fallbackReply,
          model: 'gemini-2.5-flash-lite',
          rateLimited: true,
          persona,
          species,
          lang,
          timestamp: new Date().toISOString(),
        },
        { status: 200, headers: CORS_HEADERS }
      );
    }

    const apiKey = (
      process.env.GEMINI_API_KEY ||
      process.env.GOOGLE_API_KEY ||
      process.env.NEXT_PUBLIC_GEMINI_API_KEY ||
      ''
    ).trim();

    const systemText = buildSystemInstruction(persona, species, lang);
    const contents = [{ role: 'user', parts: [{ text: userText }] }];

    if (apiKey) {
      const candidateModels = [
        'gemini-2.5-flash-lite',
        'gemini-3.5-flash-lite',
        'gemini-2.5-flash',
      ];

      for (const modelName of candidateModels) {
        try {
          const ctl = new AbortController();
          const timer = setTimeout(() => ctl.abort(), 4200);
          const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${encodeURIComponent(apiKey)}`;
          const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              systemInstruction: { parts: [{ text: systemText }] },
              contents,
              generationConfig: {
                maxOutputTokens: 320,
                temperature: 0.65,
              },
            }),
            signal: ctl.signal,
          });
          clearTimeout(timer);

          if (res.ok) {
            const data = await res.json();
            const parts = data?.candidates?.[0]?.content?.parts || [];
            const replyText = parts
              .map((p: any) => p?.text || '')
              .join('')
              .trim();
            if (replyText) {
              return NextResponse.json(
                {
                  ok: true,
                  reply: replyText,
                  content: replyText,
                  text: replyText,
                  model: 'gemini-2.5-flash-lite',
                  upstreamModel: modelName,
                  persona,
                  species,
                  lang,
                  timestamp: new Date().toISOString(),
                },
                { status: 200, headers: CORS_HEADERS }
              );
            }
          }
        } catch {
          // Try next fallback model
        }
      }
    }

    const smartReply = buildSmartClinicalReply(userText, persona, species, lang);
    return NextResponse.json(
      {
        ok: true,
        reply: smartReply,
        content: smartReply,
        text: smartReply,
        model: 'gemini-2.5-flash-lite',
        persona,
        species,
        lang,
        timestamp: new Date().toISOString(),
      },
      { status: 200, headers: CORS_HEADERS }
    );
  } catch {
    const emergencyReply = buildSmartClinicalReply('', 'angel', 'dog', 'ko');
    return NextResponse.json(
      {
        ok: true,
        reply: emergencyReply,
        content: emergencyReply,
        text: emergencyReply,
        model: 'gemini-2.5-flash-lite',
        persona: 'angel',
        species: 'dog',
        lang: 'ko',
        timestamp: new Date().toISOString(),
      },
      { status: 200, headers: CORS_HEADERS }
    );
  }
}
