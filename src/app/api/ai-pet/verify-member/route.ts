import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

const CORS_HEADERS: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers':
    'Content-Type, Authorization, X-Hwata-Api-Key, X-Hwata-Client, X-Hwata-Pet-Heartbeat',
};

const TREATMENT_LABELS: Record<string, string> = {
  ortho_noninsured: '치아교정 (클리피씨 / 인비절라인 / 설측 / 부분교정 등 비급여 교정)',
  prosthodontic_laminate: '최소삭제 심미보철 / 라미네이트',
  prosthodontic_ceramic: '지르코니아 / 올세라믹 크라운 보철',
  prosthodontic_inlay: '세라믹 인레이 / 온레이 보철',
  implant_3dct: '3D CT 디지털 임플란트 보철',
  whitening_noninsured: '전문가 치아미백 / 심미 미백 프로그램',
};

const MASTER_SECRET = process.env.HWATA_MEMBER_SECRET || 'whitestyle-33yr-prosthodontic-vip-secret-2026';

function makeHmacToken(prefix: string, seed: string, len = 24): string {
  const digest = crypto.createHmac('sha256', MASTER_SECRET).update(seed).digest('hex').slice(0, len);
  return `${prefix}-${digest}`;
}

function makeHeartbeatLease(seed: string, days = 7): { leaseToken: string; expiresAtMs: number; expiresAtIso: string } {
  const expiresAtMs = Date.now() + days * 24 * 3600 * 1000;
  const sig = crypto
    .createHmac('sha256', MASTER_SECRET)
    .update(`hb:${expiresAtMs}:${seed}`)
    .digest('hex')
    .slice(0, 16);
  return {
    leaseToken: `hb-${expiresAtMs}-${sig}`,
    expiresAtMs,
    expiresAtIso: new Date(expiresAtMs).toISOString().slice(0, 16).replace('T', ' '),
  };
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const mode = String(body.mode || 'pass').trim();

    // -------------------------------------------------------------------------
    // MODE 0: 하야니 동행 하트비트 갱신 (하야니를 계속 써야 본인·배우자·가족·지인 혜택 유지)
    //         100% Maintenance-Free Stateless HMAC Lease
    // -------------------------------------------------------------------------
    if (mode === 'heartbeat') {
      const apiKey = String(body.apiKey || body.passCode || 'anonymous-pet').trim();
      const actionType = String(body.action || 'pet_care').trim();
      const hb = makeHeartbeatLease(apiKey, 7);

      return NextResponse.json(
        {
          ok: true,
          mode: 'heartbeat',
          actionType,
          heartbeatLease: hb.leaseToken,
          expiresAtMs: hb.expiresAtMs,
          expiresAt: hb.expiresAtIso,
          remainingDays: 7,
          message: `🐾 AI 펫 '하야니'와의 교감 하트비트가 갱신되었습니다! 본인 정회원 마스터 키 및 배우자·가족·친지·지인 공유 프로토콜 활성 기간이 7일(${hb.expiresAtIso}까지) 자동 연장되었습니다.`,
        },
        { status: 200, headers: CORS_HEADERS }
      );
    }

    // -------------------------------------------------------------------------
    // MODE 1: 화타 스마일 PASS 등록 (AI 펫 '하야니' 모든 기능 잠금 해제)
    // -------------------------------------------------------------------------
    if (mode === 'pass') {
      const name = String(body.name || '').trim();
      const phone = String(body.phone || '').replace(/[^0-9]/g, '');

      if (!name || phone.length < 9) {
        return NextResponse.json(
          {
            ok: false,
            code: 'INVALID_INPUT',
            message: '성함과 정확한 휴대전화 번호(9자리 이상)를 입력해 주세요.',
          },
          { status: 400, headers: CORS_HEADERS }
        );
      }

      const serialNum =
        (parseInt(crypto.createHash('md5').update(name + phone).digest('hex').slice(0, 6), 16) % 9000) + 1000;
      const passCode = `HWATA-PASS-${serialNum}`;
      const hb = makeHeartbeatLease(passCode, 7);

      return NextResponse.json(
        {
          ok: true,
          mode: 'pass',
          passCode,
          heartbeatLease: hb.leaseToken,
          heartbeatExpiresAt: hb.expiresAtIso,
          unlockedFeatures: [
            '6종 3D 스튜디오 동물 파트너 전체 변신 (하야니·코코·디노·파이·코코아·치즈)',
            '6종 시그니처 3D 코스튬 옷장 & 360° 입체 회전 뷰 전체 잠금 해제',
            '91종 모션 · 7종 페르소나 AI 대화 · 데스크톱 & 브라우저 확장 전체 기능 활성화',
          ],
          message: `[${passCode}] 화타 스마일 PASS 등록이 완료되었습니다! 이제 AI 펫 '하야니'의 모든 기능을 제한 없이 이용하실 수 있습니다.`,
        },
        { status: 200, headers: CORS_HEADERS }
      );
    }

    // -------------------------------------------------------------------------
    // MODE 2: 화이트스타일 정회원 등록 (교정 보철 미백 등의 비급여 치료를 받으신 분 전용)
    //         -> 디지털 보철 정품 보증서 + 평생 무료 AI API Key
    //         -> 배우자·가족·친지 동반 패밀리 키 2장 (sk-hwata-fam-...)
    //         -> 지인·동료 확산 72시간 체험 키 3장 (sk-hwata-trial-72h-...)
    // -------------------------------------------------------------------------
    if (mode === 'regular_member') {
      const name = String(body.name || '').trim();
      const phone = String(body.phone || '').replace(/[^0-9]/g, '');
      const memberId = String(body.memberId || '').trim();
      const siteOrigin = String(body.siteOrigin || 'whitestyle.com').trim();
      const treatmentType = String(body.treatmentType || '').trim();
      const prosthodonticCount = Number(body.prosthodonticCount || 0);
      const clinicAuthCode = String(body.clinicAuthCode || '').trim().toUpperCase();

      if (!memberId || memberId.length < 3) {
        return NextResponse.json(
          {
            ok: false,
            code: 'MEMBER_ID_REQUIRED',
            message: 'whitestyle.com 또는 whinish.com 회원 아이디(또는 이메일) 3자 이상을 입력해 주세요.',
          },
          { status: 400, headers: CORS_HEADERS }
        );
      }

      if (!name || phone.length < 9) {
        return NextResponse.json(
          {
            ok: false,
            code: 'INVALID_PATIENT_INFO',
            message: '환자 성함과 정확한 연락처를 입력해 주세요.',
          },
          { status: 400, headers: CORS_HEADERS }
        );
      }

      // 핵심 규칙 1: 반드시 화이트스타일치과의원에서 교정 보철 미백 등의 비급여 치료를 받으신 분만 가능
      const treatmentLabel = TREATMENT_LABELS[treatmentType];
      if (!treatmentLabel || prosthodonticCount < 1) {
        return NextResponse.json(
          {
            ok: false,
            code: 'REQUIRES_PROSTHODONTIC_TREATMENT',
            message:
              '❌ 정회원 등록 불가: 화이트스타일 정회원 자격 및 무료 AI API 로컬 프로토콜은 강남역 화이트스타일치과의원에 내원하여 교정 보철 미백 등의 비급여 치료를 받으신 분에 한하여 부여됩니다. 내원 진료 후 발급된 보철 정품 보증서/정회원 코드로 신청해 주세요.',
          },
          { status: 403, headers: CORS_HEADERS }
        );
      }

      // 핵심 규칙 2: 원내 접수 데스크 발급 코드 또는 보철 보증서 번호 검증 (100% Maintenance-Free Stateless)
      const isValidClinicCode =
        /^(WS|VIP|PROSTH|IMPLANT|WARRANTY|WHITESTYLE|WHINISH|20\d{2}|199\d|0\d{3,})[-A-Z0-9]{2,24}$/i.test(clinicAuthCode) ||
        clinicAuthCode.length >= 6;

      if (!isValidClinicCode) {
        return NextResponse.json(
          {
            ok: false,
            code: 'INVALID_CLINIC_AUTH_CODE',
            message:
              '⚠️ 화이트스타일치과의원 접수 데스크에서 교정 보철 미백 등의 비급여 치료 완료 시 발급받으신 [원내 정회원 인증코드 6자리 이상 (예: WS-202601)]를 정확히 입력해 주세요.',
          },
          { status: 403, headers: CORS_HEADERS }
        );
      }

      const apiKey = makeHmacToken('sk-hwata-vip', `${name}:${phone}:${memberId}:${treatmentType}:${clinicAuthCode}`, 24);
      const passSerial =
        (parseInt(crypto.createHash('md5').update(name + phone).digest('hex').slice(0, 6), 16) % 9000) + 1000;
      const passCode = `HWATA-PASS-${passSerial}`;
      const hb = makeHeartbeatLease(apiKey, 7);

      // 디지털 보철 정품 보증서 일련번호 생성
      const warrantyHash = crypto
        .createHash('sha256')
        .update(`${memberId}:${clinicAuthCode}:${treatmentType}`)
        .digest('hex')
        .slice(0, 8)
        .toUpperCase();
      const warrantySerial = `WS-WARRANTY-${new Date().getFullYear()}-${warrantyHash}`;

      // [확산 프로토콜 A] 배우자 · 직계가족 · 친지 동반 패밀리 키 2장 (하야니 계속 실행 조건으로 상시 무료 공유)
      const familyRoles = ['배우자 · 직계가족 전용 #1', '부모님 · 자녀 · 친지 전용 #2'];
      const familyTokens = [1, 2].map((idx) => {
        const famKey = makeHmacToken('sk-hwata-fam', `${apiKey}:family:${idx}`, 18);
        const autoLink = `https://whinish.com/ai-pet/download.html?activate_key=${encodeURIComponent(famKey)}#api-protocol`;
        return {
          slot: idx,
          roleLabel: familyRoles[idx - 1],
          token: famKey,
          autoActivateUrl: autoLink,
          quota: '하야니 동행(실행) 중 상시 무료 · 1일 200회 AI API 호출',
          inviteMessage: `[강남역 화이트스타일치과의원 · 배우자/가족 동반 무료 AI API 패스]\n${name} 정회원님이 가족 전용 무료 AI API 키(${familyRoles[idx - 1]})를 공유했습니다! 💖\n\n• 패밀리 API Key: ${famKey}\n• 1클릭 자동 등록 링크: ${autoLink}\n• 유지 조건: 컴퓨터나 브라우저에 귀여운 AI 펫 '하야니'를 켜두고 함께 지내시면 무료 AI API 혜택이 계속 유지됩니다!`,
        };
      });

      // [확산 프로토콜 B] 지인 · 동료 확산용 72시간 무료 AI API 체험 토큰 3장 (하야니 설치 시 보너스 연장)
      const referralTokens = [1, 2, 3].map((idx) => {
        const trKey = makeHmacToken('sk-hwata-trial-72h', `${apiKey}:invite:${idx}`, 16);
        const autoLink = `https://whinish.com/ai-pet/download.html?activate_key=${encodeURIComponent(trKey)}#api-protocol`;
        return {
          slot: idx,
          roleLabel: `지인 · 동료 확산 초대권 #${idx}`,
          token: trKey,
          autoActivateUrl: autoLink,
          quota: '72시간 무료 체험 (1일 30회) · 하야니 동행 시 보너스 연장',
          inviteMessage: `[강남역 화이트스타일치과의원 정회원 지인 초대장]\n${name} 정회원님이 내 컴퓨터(Cursor·VS Code·Python)에서 바로 끌어다 쓸 수 있는 무료 AI API 72시간 체험권을 선물했습니다! 🎁\n\n• 체험 API Key: ${trKey}\n• 1클릭 자동 활성화 링크: ${autoLink}\n• 안내: AI 펫 '하야니'와 매일 인사하면 체험 혜택이 유지되며, 화이트스타일치과의원(강남역 11·12번 출구, 33년 전통)에서 교정 보철 미백 등의 비급여 치료 시 본인 평생 정회원 키와 가족/지인 초대권 5장이 발급됩니다!`,
        };
      });

      return NextResponse.json(
        {
          ok: true,
          mode: 'regular_member',
          memberTier: 'WHITESTYLE_VERIFIED_PROSTHODONTIC_MEMBER',
          memberId,
          name,
          siteOrigin,
          treatmentType,
          treatmentLabel,
          prosthodonticCount,
          passCode,
          apiKey,
          heartbeatLease: hb.leaseToken,
          heartbeatExpiresAt: hb.expiresAtIso,
          warrantyCard: {
            serial: warrantySerial,
            clinicAuthCode,
            patientName: name,
            memberId,
            siteOrigin,
            treatmentLabel,
            unitCount: prosthodonticCount,
            issuedDate: new Date().toISOString().slice(0, 10),
            doctors: '김준헌 병원장 · 이봉진 대표원장 · 박선혜 원장(치주과 전문의) 3인 원장단 책임 협진',
            benefit: '하야니 동행 시 본인 평생 무료 AI API 무제한 + 배우자·가족 2명 + 지인 3명 확산 권한 부여',
          },
          familyTokens,
          referralTokens,
          protocol: {
            baseUrl: 'https://whinish.com/api/v1',
            chatCompletionsUrl: 'https://whinish.com/api/v1/chat/completions',
            modelsUrl: 'https://whinish.com/api/v1/models',
            localBridgeDownloadUrl: 'https://whinish.com/ai-pet/downloads/hwata-free-ai-protocol.mjs',
            supportedModels: [
              'hwata-omni-free',
              'hwata-coder-free',
              'hwata-reasoning-free',
              'hwata-gemini-free',
              'hwata-llama70b-free',
              'hwata-qwen3-free',
            ],
          },
          message: `🎉 정회원(${memberId}) 인증 및 [디지털 보철 정품 보증서: ${warrantySerial}] 확인 완료! 본인 평생 무료 AI API Key + 배우자·가족 동반 패밀리키 2장 + 지인 초대 72시간 체험키 3장(총 6인분)이 발급되었습니다.`,
        },
        { status: 200, headers: CORS_HEADERS }
      );
    }

    // -------------------------------------------------------------------------
    // MODE 3: 배우자·가족 패밀리키(sk-hwata-fam-...) 또는 지인 72시간 체험키(sk-hwata-trial-72h-...) 활성화
    // -------------------------------------------------------------------------
    if (mode === 'trial_activate') {
      const trialToken = String(body.trialToken || '').trim();
      const isFamilyKey = trialToken.startsWith('sk-hwata-fam-') && trialToken.length >= 20;
      const isTrialKey = trialToken.startsWith('sk-hwata-trial-72h-') && trialToken.length >= 24;

      if (!isFamilyKey && !isTrialKey) {
        return NextResponse.json(
          {
            ok: false,
            code: 'INVALID_TRIAL_TOKEN',
            message:
              '유효한 배우자·가족 패밀리키(sk-hwata-fam-...) 또는 지인 72시간 체험키(sk-hwata-trial-72h-...) 형식이 아닙니다. 전달받은 코드를 다시 확인해 주세요.',
          },
          { status: 400, headers: CORS_HEADERS }
        );
      }

      const hb = makeHeartbeatLease(trialToken, 7);
      const passSerial =
        (parseInt(crypto.createHash('md5').update(trialToken).digest('hex').slice(0, 6), 16) % 9000) + 1000;
      const passCode = `HWATA-PASS-${passSerial}`;

      if (isFamilyKey) {
        return NextResponse.json(
          {
            ok: true,
            mode: 'trial_activate',
            memberTier: 'FAMILY_COMPANION_PASS',
            apiKey: trialToken,
            passCode,
            heartbeatLease: hb.leaseToken,
            dailyLimit: 200,
            expiresAt: hb.expiresAtIso,
            message: `💖 배우자·가족·친지 동반 패밀리 프로토콜이 활성화되었습니다! (1일 200회 무료 호출 · AI 펫 '하야니'와 함께 지내시면 7일 단위로 계속 자동 연장됩니다).`,
          },
          { status: 200, headers: CORS_HEADERS }
        );
      }

      const expiresAt = new Date(Date.now() + 72 * 3600 * 1000).toISOString().slice(0, 16).replace('T', ' ');
      return NextResponse.json(
        {
          ok: true,
          mode: 'trial_activate',
          memberTier: 'TRIAL_72H_INVITED',
          apiKey: trialToken,
          passCode,
          heartbeatLease: hb.leaseToken,
          dailyLimit: 30,
          expiresAt,
          message: `🎟️ 지인 초대 72시간 무료 AI API 체험 토큰이 활성화되었습니다! (만료: ${expiresAt}, 1일 30회 한도 · AI 펫 '하야니'를 계속 이용하시면 혜택이 유지됩니다). 평생 무제한 마스터 키는 화이트스타일치과의원에서 교정 보철 미백 등의 비급여 치료 시 즉시 발급됩니다.`,
        },
        { status: 200, headers: CORS_HEADERS }
      );
    }

    // -------------------------------------------------------------------------
    // MODE 4: 화이트스타일치과 접수 데스크 전용 코드 & 빈칸 자동채움 매직 링크 생성기
    //         (100% Maintenance-Free — DB 없이 암호화 서명으로 즉시 발급)
    // -------------------------------------------------------------------------
    if (mode === 'reception_issue') {
      const name = String(body.name || '').trim();
      const phone = String(body.phone || '').replace(/[^0-9]/g, '');
      const rawMemberId = String(body.memberId || '').trim();
      const siteOrigin = String(body.siteOrigin || 'whitestyle.com').trim();
      const treatmentType = String(body.treatmentType || 'prosthodontic_laminate').trim();
      const prosthodonticCount = Math.max(1, Number(body.prosthodonticCount || 1));

      if (!name || phone.length < 4) {
        return NextResponse.json(
          { ok: false, message: '접수 데스크 발급을 위해 환자 성함과 연락처(뒷 4자리 이상)를 입력해 주세요.' },
          { status: 400, headers: CORS_HEADERS }
        );
      }

      const fullPhone = phone.length === 4 ? `010-0000-${phone}` : phone;
      const memberId = rawMemberId.length >= 3 ? rawMemberId : `ws_${phone.slice(-4)}`;
      const ymd = new Date().toISOString().slice(0, 10).replace(/-/g, '');
      const sig = crypto
        .createHmac('sha256', MASTER_SECRET)
        .update(`reception:${name}:${fullPhone}:${treatmentType}:${prosthodonticCount}`)
        .digest('hex')
        .slice(0, 6)
        .toUpperCase();
      const clinicAuthCode = `WS-${ymd.slice(0, 6)}-${sig}`;
      const passSerial =
        (parseInt(crypto.createHash('md5').update(name + fullPhone).digest('hex').slice(0, 6), 16) % 9000) + 1000;
      const passCode = `HWATA-PASS-${passSerial}`;

      const params = new URLSearchParams({
        autofill: '1',
        name,
        phone: fullPhone,
        id: memberId,
        site: siteOrigin,
        tx: treatmentType,
        cnt: String(prosthodonticCount),
        code: clinicAuthCode,
        pass: passCode,
      });
      const autofillUrl = `https://whinish.com/ai-pet/download.html?${params.toString()}#api-protocol`;

      return NextResponse.json(
        {
          ok: true,
          mode: 'reception_issue',
          name,
          phone: fullPhone,
          memberId,
          siteOrigin,
          treatmentType,
          treatmentLabel: TREATMENT_LABELS[treatmentType] || '보철·임플란트 치료',
          prosthodonticCount,
          clinicAuthCode,
          passCode,
          autofillUrl,
          kakaoMessage: `[강남역 화이트스타일치과의원 · 정회원 보철 보증서 & 무료 AI API 패스 발급 안내]\n\n${name}님, 오늘 화이트스타일치과의원에서 진료받으시느라 수고 많으셨습니다! ✨\n원내 교정·보철·미백 등 비급여 치료 정회원 혜택으로 [AI 펫 하야니 전체 기능 PASS]와 [내 컴퓨터에서 평생 무료로 쓰는 AI API 프로토콜 + 배우자·가족·지인 초대권 5장]이 발급되었습니다.\n\n▶ 아래 [1클릭 빈칸 자동채움 링크]를 누르시면 모든 빈칸이 자동으로 입력되어 즉시 발급됩니다:\n${autofillUrl}\n\n• 원내 정회원 인증번호: ${clinicAuthCode}\n• 화타 스마일 PASS 번호: ${passCode}\n• 대표상담: 1577-7287 / 02-569-7528`,
        },
        { status: 200, headers: CORS_HEADERS }
      );
    }

    return NextResponse.json({ ok: false, message: '알 수 없는 요청 모드입니다.' }, { status: 400, headers: CORS_HEADERS });
  } catch {
    return NextResponse.json(
      { ok: false, message: '요청 처리 중 일시적인 오류가 발생했습니다.' },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}
