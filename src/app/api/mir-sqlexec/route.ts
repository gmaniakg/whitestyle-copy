import https from 'node:https';
import { NextRequest, NextResponse } from 'next/server';
import { createConsultation } from '@/lib/consultation-db';
import {
  getClientIp,
  maskName,
  maskPhone,
  PRIVACY_POLICY_VERSION,
} from '@/app/api/_lib/admin';

export const dynamic = 'force-dynamic';
export const maxDuration = 30;

const LEGACY_ORIGIN_IP = '158.247.216.145';
const LEGACY_SQLEXEC_PATH = '/_mir.do.sqlexec.php';
const NTFY_TOPIC = process.env.CONSULT_NTFY_TOPIC || 'ws_clinic_lead_06134_9217';
const IFTTT_WEBHOOK_KEY = process.env.IFTTT_WEBHOOK_KEY || '8EHchJRrNUkZeDlOl_A2w';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With',
};

const QUICK_SUCCESS_HTML = `<script>
  alert("화이트스타일치과 빠른상담 신청이 정상 접수되었습니다.\\n전문 상담 실장이 신속히 연락드리겠습니다.");
  try {
    var f = document.getElementById("form_25c77498d12ad9fe80a1bffce2a3ec49") || document;
    var inputs = f.querySelectorAll("input[type='text']");
    for (var i = 0; i < inputs.length; i++) inputs[i].value = "";
    var btn = document.getElementById("submitbtn_25c77498d12ad9fe80a1bffce2a3ec49");
    if (btn) btn.classList.remove("submitLock");
  } catch (e) {}
</script>`;

interface DbInfoEntry {
  name?: string;
  value?: string;
}

function tryJsonParse(input: unknown): unknown {
  if (typeof input !== 'string') return input;
  const trimmed = input.trim();
  if (!trimmed) return null;
  try {
    return JSON.parse(trimmed);
  } catch {
    return null;
  }
}

function extractDbInfoConsult(rawBody: string, contentType: string): {
  isConsult: boolean;
  name: string;
  phone: string;
} {
  let payload: Record<string, unknown> = {};

  if (contentType.includes('application/json')) {
    const parsed = tryJsonParse(rawBody);
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      payload = parsed as Record<string, unknown>;
    }
  } else {
    const params = new URLSearchParams(rawBody);
    for (const [k, v] of params.entries()) {
      payload[k] = v;
    }
  }

  let secuarr2Raw: unknown = payload.secuarr2;

  if (!secuarr2Raw && payload.secuarrset) {
    const arrset = tryJsonParse(payload.secuarrset);
    if (arrset && typeof arrset === 'object' && !Array.isArray(arrset)) {
      secuarr2Raw = (arrset as Record<string, unknown>).secuarr2;
    }
  }

  if (!secuarr2Raw && payload.arrset && typeof payload.arrset === 'object') {
    secuarr2Raw = (payload.arrset as Record<string, unknown>).secuarr2;
  }

  const parsedSecuarr2 = tryJsonParse(secuarr2Raw);
  const containers = Array.isArray(parsedSecuarr2)
    ? parsedSecuarr2
    : parsedSecuarr2 && typeof parsedSecuarr2 === 'object'
      ? [parsedSecuarr2]
      : [];

  let entries: DbInfoEntry[] = [];
  for (const item of containers) {
    if (item && typeof item === 'object' && Array.isArray((item as { dbinfoAry?: unknown }).dbinfoAry)) {
      entries = entries.concat((item as { dbinfoAry: DbInfoEntry[] }).dbinfoAry);
    }
  }

  if (entries.length === 0) {
    return { isConsult: false, name: '', phone: '' };
  }

  let name = '';
  let phone = '';
  for (const entry of entries) {
    const fieldName = String(entry?.name || '').toLowerCase();
    const fieldValue = String(entry?.value || '').trim();
    if (!fieldValue) continue;
    if (!name && (fieldName === 'name' || fieldName.includes('[name]'))) {
      name = fieldValue;
    } else if (
      !phone &&
      (fieldName === 'hpnum' ||
        fieldName.includes('[hpnum]') ||
        fieldName.includes('hp') ||
        fieldName.includes('tel') ||
        fieldName.includes('phone'))
    ) {
      phone = fieldValue;
    }
  }

  return {
    isConsult: Boolean(name || phone),
    name,
    phone,
  };
}

function forwardToLegacyOrigin(
  method: 'GET' | 'POST',
  pathWithQuery: string,
  rawBody: string,
  contentType: string
): Promise<{ status: number; body: string; contentType: string }> {
  return new Promise((resolve) => {
    try {
      const headers: Record<string, string | number> = {
        Host: 'whitestyle.com',
        'User-Agent': 'WhiteStyleNextBridge/1.0',
      };
      if (method === 'POST') {
        headers['Content-Type'] = contentType || 'application/x-www-form-urlencoded; charset=UTF-8';
        headers['Content-Length'] = Buffer.byteLength(rawBody, 'utf8');
      }

      const req = https.request(
        {
          hostname: LEGACY_ORIGIN_IP,
          port: 443,
          path: pathWithQuery,
          method,
          headers,
          servername: 'whitestyle.com',
          rejectUnauthorized: false,
          timeout: 4500,
        },
        (res) => {
          const chunks: Buffer[] = [];
          res.on('data', (chunk) => chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)));
          res.on('end', () => {
            resolve({
              status: res.statusCode || 200,
              body: Buffer.concat(chunks).toString('utf8'),
              contentType: String(res.headers['content-type'] || 'text/html; charset=utf-8'),
            });
          });
        }
      );

      req.on('timeout', () => {
        req.destroy();
        resolve({ status: 200, body: '', contentType: 'text/html; charset=utf-8' });
      });
      req.on('error', () => {
        resolve({ status: 200, body: '', contentType: 'text/html; charset=utf-8' });
      });

      if (method === 'POST' && rawBody) {
        req.write(rawBody);
      }
      req.end();
    } catch {
      resolve({ status: 200, body: '', contentType: 'text/html; charset=utf-8' });
    }
  });
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const proxied = await forwardToLegacyOrigin(
    'GET',
    `${LEGACY_SQLEXEC_PATH}${url.search}`,
    '',
    ''
  );
  return new NextResponse(proxied.body, {
    status: 200,
    headers: {
      ...CORS_HEADERS,
      'Content-Type': proxied.contentType || 'text/html; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}

export async function POST(req: NextRequest) {
  const url = new URL(req.url);
  const legacyPath = `${LEGACY_SQLEXEC_PATH}${url.search}`;
  const contentType = req.headers.get('content-type') || '';
  const rawBody = await req.text();
  const parsed = extractDbInfoConsult(rawBody, contentType);

  if (parsed.isConsult) {
    const cleanName = (parsed.name || '신규신청자').trim();
    const rawPhone = (parsed.phone || '').trim();
    const cleanPhone = rawPhone.replace(/[^\d-]/g, '') || rawPhone || '미기재';

    try {
      const record = await createConsultation({
        name: cleanName,
        phone: cleanPhone,
        treatment: '빠른상담신청',
        memo: '',
        agreedPrivacy: true,
        agreedSensitive: true,
        agreedMarketing: false,
        privacyPolicyVersion: PRIVACY_POLICY_VERSION,
        source: 'quick_bar',
        ip: getClientIp(req),
      });

      const kstTime = new Date(record.createdAt).toLocaleString('ko-KR', {
        timeZone: 'Asia/Seoul',
      });
      const summaryText =
        `[화이트스타일치과 신규 상담 접수]\n` +
        `- 성함: ${maskName(record.name)}\n` +
        `- 연락처: ${maskPhone(record.phone)}\n` +
        `- 진료분야: ${record.treatment}\n` +
        `- 접수경로: ${record.source}\n` +
        `- 접수번호: ${record.id}\n` +
        `- 접수일시: ${kstTime}`;

      const iftttParams = new URLSearchParams({
        value1: record.name,
        value2: record.phone,
        value3: '홈페이지 하단 빠른상담신청',
      });

      await Promise.allSettled([
        fetch(`https://ntfy.sh/${NTFY_TOPIC}`, {
          method: 'POST',
          headers: {
            'X-Title':
              '=?UTF-8?B?' +
              Buffer.from('[화이트스타일치과 신규 상담 접수]', 'utf-8').toString('base64') +
              '?=',
            Priority: 'high',
            Tags: 'tooth,telephone_receiver',
            'Content-Type': 'text/plain; charset=utf-8',
          },
          body: summaryText,
          signal: AbortSignal.timeout(3500),
        }),
        fetch(
          `https://maker.ifttt.com/trigger/whitestyle_lead/with/key/${IFTTT_WEBHOOK_KEY}?${iftttParams.toString()}`,
          {
            method: 'GET',
            signal: AbortSignal.timeout(3500),
          }
        ),
        forwardToLegacyOrigin('POST', legacyPath, rawBody, contentType),
      ]);
    } catch (err) {
      console.error('[mir-sqlexec consult error]:', err);
    }

    return new NextResponse(QUICK_SUCCESS_HTML, {
      status: 200,
      headers: {
        ...CORS_HEADERS,
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-store',
      },
    });
  }

  // 일반 동적 모듈/팝업 요청은 구 서버로 안전 프록시 (실패 시에도 200 OK 반환해 [cdyex] 방지)
  const proxied = await forwardToLegacyOrigin(
    'POST',
    legacyPath,
    rawBody,
    contentType
  );
  return new NextResponse(proxied.body, {
    status: 200,
    headers: {
      ...CORS_HEADERS,
      'Content-Type': proxied.contentType || 'text/html; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}
