import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { createConsultation, getConsultations, updateConsultationStatus } from '@/lib/consultation-db';
import { checkRateLimit } from '@/app/api/_lib/rate-limit';
import {
  requireAdmin,
  getClientIp,
  maskName,
  maskPhone,
  PRIVACY_POLICY_VERSION,
} from '@/app/api/_lib/admin';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const MAX_LIMIT = 200;
const NTFY_TOPIC = process.env.CONSULT_NTFY_TOPIC || 'ws_clinic_lead_06134_9217';

function encryptLeadPayload(payload: Record<string, unknown>): string {
  const secretSeed = process.env.CONSULT_ENCRYPT_SECRET || process.env.GEMINI_API_KEY || 'ws_clinic_06134';
  const key = crypto.createHash('sha256').update(secretSeed).digest();
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  const encrypted = Buffer.concat([cipher.update(JSON.stringify(payload), 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  return Buffer.concat([iv, tag, encrypted]).toString('base64');
}

const isTrue = (v: unknown) => v === true || v === 'true' || v === 1;

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    const rate = checkRateLimit(`consult:${ip || 'unknown'}`, 10, 10 * 60 * 1000);
    if (!rate.allowed) {
      return NextResponse.json(
        {
          success: false,
          message: '요청이 너무 많습니다. 잠시 후 다시 시도해 주세요.',
        },
        {
          status: 429,
          headers: { 'Retry-After': String(rate.retryAfterSec) },
        }
      );
    }

    const body = await req.json();
    const { name, phone, treatment, memo, agreedPrivacy, agreedSensitive, agreedMarketing, source } = body;
    const resolvedAgreedSensitive =
      source === 'quick_bar' && agreedSensitive === undefined
        ? Boolean(agreedPrivacy)
        : agreedSensitive;

    // 1. Validation
    if (!name || typeof name !== 'string' || name.trim().length < 1) {
      return NextResponse.json(
        { success: false, message: '성함(이름)을 입력해 주세요.' },
        { status: 400 }
      );
    }

    if (!phone || typeof phone !== 'string' || phone.trim().length < 8) {
      return NextResponse.json(
        { success: false, message: '연락처(휴대폰 번호)를 정확히 입력해 주세요.' },
        { status: 400 }
      );
    }

    // Clean phone number: remove any non-digits/hyphens
    const cleanPhone = phone.trim().replace(/[^\d-]/g, '');
    if (cleanPhone.replace(/\D/g, '').length < 9) {
      return NextResponse.json(
        { success: false, message: '올바른 전화번호 형식이 아닙니다.' },
        { status: 400 }
      );
    }

    if (!isTrue(agreedPrivacy)) {
      return NextResponse.json(
        { success: false, message: '개인정보 수집·이용에 동의해 주셔야 상담 신청이 가능합니다.' },
        { status: 400 }
      );
    }

    if (!isTrue(resolvedAgreedSensitive)) {
      return NextResponse.json(
        { success: false, message: '건강정보(민감정보) 처리에 별도로 동의해 주셔야 상담 신청이 가능합니다.' },
        { status: 400 }
      );
    }

    // 2. Persist to DB
    const record = await createConsultation({
      name: name.trim(),
      phone: cleanPhone,
      treatment: treatment ? String(treatment).trim().slice(0, 100) : '일반/종합상담',
      memo: memo ? String(memo).trim().slice(0, 2000) : '',
      agreedPrivacy: true,
      agreedSensitive: true,
      agreedMarketing: isTrue(agreedMarketing),
      privacyPolicyVersion: PRIVACY_POLICY_VERSION,
      source: source ? String(source).slice(0, 50) : 'quick_bar',
      ip,
    });

    // 3. Real-Time Push & Webhook Notification (awaits with short timeout so Serverless delivers reliably)
    const kstTime = new Date(record.createdAt).toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });
    const summaryText =
      `[화이트스타일치과 신규 상담 접수]\n` +
      `- 성함: ${maskName(record.name)}\n` +
      `- 연락처: ${maskPhone(record.phone)}\n` +
      `- 진료분야: ${record.treatment}\n` +
      `- 접수경로: ${record.source}\n` +
      `- 접수번호: ${record.id}\n` +
      `- 접수일시: ${kstTime}`;

    const notifyTasks: Promise<unknown>[] = [];

    const webhookUrl = process.env.CONSULT_WEBHOOK_URL;
    if (webhookUrl) {
      notifyTasks.push(
        fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: summaryText }),
          signal: AbortSignal.timeout(3500),
        }).catch(() => console.error('[Webhook error]'))
      );
    }

    const encryptedEnvelope = encryptLeadPayload({
      id: record.id,
      name: record.name,
      phone: record.phone,
      treatment: record.treatment,
      memo: record.memo,
      source: record.source,
      createdAt: record.createdAt,
      kstTime,
    });

    notifyTasks.push(
      fetch(`https://ntfy.sh/${NTFY_TOPIC}`, {
        method: 'POST',
        headers: {
          'X-Title': '=?UTF-8?B?' + Buffer.from('[화이트스타일치과 신규 상담 접수]', 'utf-8').toString('base64') + '?=',
          Priority: 'high',
          Tags: 'tooth,telephone_receiver',
          'Content-Type': 'text/plain; charset=utf-8',
        },
        body: summaryText,
        signal: AbortSignal.timeout(3500),
      }).catch((err) => console.error('[Ntfy push error]', err))
    );

    const encWebhookUrl = process.env.CONSULT_ENCRYPTED_WEBHOOK_URL;
    if (encWebhookUrl) {
      notifyTasks.push(
        fetch(encWebhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: record.id, encryptedEnvelope }),
          signal: AbortSignal.timeout(3500),
        }).catch(() => console.error('[Encrypted webhook error]'))
      );
    }

    await Promise.allSettled(notifyTasks);

    return NextResponse.json(
      {
        success: true,
        message: '상담 신청이 접수되었습니다. 상담 담당자가 확인 후 연락드리겠습니다.',
        data: {
          id: record.id,
          createdAt: record.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (err: any) {
    console.error('[API /api/consult POST error]:', err);
    return NextResponse.json(
      { success: false, message: '서버 처리 중 오류가 발생하였습니다. 잠시 후 다시 시도해 주세요.' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  // 서버측 관리자 인증 (ADMIN_EMAILS 미설정 시 모두 거부)
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json(
      { success: false, message: '권한이 없습니다.' },
      { status: 403 }
    );
  }

  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status') || 'ALL';
    const search = searchParams.get('search') || '';
    const rawLimit = parseInt(searchParams.get('limit') || '100', 10);
    const rawOffset = parseInt(searchParams.get('offset') || '0', 10);
    const limit = Math.min(Math.max(Number.isFinite(rawLimit) ? rawLimit : 100, 1), MAX_LIMIT);
    const offset = Math.max(Number.isFinite(rawOffset) ? rawOffset : 0, 0);

    const { items, total } = await getConsultations({
      status,
      search,
      limit,
      offset,
    });

    return NextResponse.json(
      {
        success: true,
        items,
        total,
        limit,
        offset,
      },
      {
        headers: {
          'Cache-Control': 'no-store',
          'X-Robots-Tag': 'noindex, nofollow',
        },
      }
    );
  } catch (err: any) {
    console.error('[API /api/consult GET error]:', err);
    return NextResponse.json(
      { success: false, message: '상담 내역 조회 중 오류가 발생하였습니다.' },
      { status: 500 }
    );
  }
}

const VALID_STATUSES = new Set(['PENDING', 'CONTACTED', 'RESERVED', 'CANCELLED']);

export async function PATCH(req: NextRequest) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json(
      { success: false, message: '권한이 없습니다.' },
      { status: 403 }
    );
  }

  try {
    const body = await req.json();
    const id = typeof body?.id === 'string' ? body.id.trim() : '';
    const status = typeof body?.status === 'string' ? body.status.trim().toUpperCase() : '';

    if (!id || !VALID_STATUSES.has(status)) {
      return NextResponse.json(
        { success: false, message: '유효하지 않은 상담 ID 또는 상태입니다.' },
        { status: 400 }
      );
    }

    const updated = await updateConsultationStatus(
      id,
      status as 'PENDING' | 'CONTACTED' | 'RESERVED' | 'CANCELLED'
    );

    if (!updated) {
      return NextResponse.json(
        { success: false, message: '해당 상담 내역을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, item: updated },
      {
        headers: {
          'Cache-Control': 'no-store',
          'X-Robots-Tag': 'noindex, nofollow',
        },
      }
    );
  } catch (err: any) {
    console.error('[API /api/consult PATCH error]:', err);
    return NextResponse.json(
      { success: false, message: '상담 상태 변경 중 오류가 발생하였습니다.' },
      { status: 500 }
    );
  }
}
