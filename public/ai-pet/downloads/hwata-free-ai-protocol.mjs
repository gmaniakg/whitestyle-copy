#!/usr/bin/env node
/**
 * ============================================================================
 * WhiteStyle Hwata Omni-Free AI Local Pull Protocol (v2.1)
 * ----------------------------------------------------------------------------
 * [정회원 전용 로컬 PC 무료 AI API 브릿지 프로토콜]
 * 강남역 화이트스타일치과의원(1994년 개원 33년 전통)에서 교정 보철 미백 등의 비급여 치료를 받으시고 whitestyle.com / whinish.com 정회원 인증을 마친 분께만
 * 발급되는 전용 키(sk-hwata-vip-...)로 내 컴퓨터에서 무료 AI API를 무제한급으로 끌어다 쓰는 표준 프로토콜입니다.
 *
 * 사용법:
 *   node hwata-free-ai-protocol.mjs --key sk-hwata-vip-YOUR_KEY
 *
 * 실행 후 내 컴퓨터 로컬 엔드포인트:
 *   - OpenAI 호환 Base URL : http://127.0.0.1:11435/v1
 *   - Chat Completions     : http://127.0.0.1:11435/v1/chat/completions
 *   - Models List          : http://127.0.0.1:11435/v1/models
 *   - 연동 가능 프로그램   : Cursor, VS Code (Continue / Cline), Claude Code, OpenWebUI, Python, Node.js
 * ============================================================================
 */

import http from 'node:http';

const args = process.argv.slice(2);
const keyIdx = args.indexOf('--key');
const API_KEY =
  (keyIdx !== -1 && args[keyIdx + 1]) ||
  process.env.HWATA_VIP_API_KEY ||
  '';
const PORT = Number(process.env.HWATA_PROTOCOL_PORT || 11435);
const GATEWAY_BASE = 'https://whinish.com/api/v1';

if (
  !API_KEY ||
  (!API_KEY.startsWith('sk-hwata-vip-') &&
    !API_KEY.startsWith('sk-hwata-fam-') &&
    !API_KEY.startsWith('sk-hwata-trial-72h-'))
) {
  console.error(
    '\n[!] 화이트스타일 정회원 키(sk-hwata-vip-...), 배우자·가족 패밀리 키(sk-hwata-fam-...), 또는 지인 초대 72시간 체험 키(sk-hwata-trial-72h-...)가 필요합니다.'
  );
  console.error('    강남역 화이트스타일치과의원에서 교정 보철 미백 등의 비급여 치료 후');
  console.error('    https://whinish.com/ai-pet/download.html#api-protocol 에서 정회원 인증을 완료해 주세요.');
  console.error('\n    실행 예시: node hwata-free-ai-protocol.mjs --key sk-hwata-vip-xxxxxxxxxxxx\n');
  process.exit(1);
}

// 하야니 동행 하트비트 자동 갱신 (AI 펫 하야니와 함께 지내면 본인·배우자·가족·지인 혜택 상시 자동 유지)
let activeHeartbeatLease = 'Active-LocalBridge-AutoRenew';
async function pingHayaniHeartbeat() {
  try {
    const r = await fetch('https://whinish.com/api/ai-pet/verify-member', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mode: 'heartbeat', apiKey: API_KEY, action: 'local_bridge_companion' }),
    });
    if (r.ok) {
      const d = await r.json();
      if (d.heartbeatLease) activeHeartbeatLease = d.heartbeatLease;
    }
  } catch {}
}
pingHayaniHeartbeat();
setInterval(pingHayaniHeartbeat, 6 * 3600 * 1000).unref();

const server = http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.url === '/v1/models' || req.url === '/models') {
    try {
      const upstream = await fetch(`${GATEWAY_BASE}/models`, {
        headers: { Authorization: `Bearer ${API_KEY}` },
      });
      const data = await upstream.text();
      res.writeHead(upstream.status, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(data);
    } catch (err) {
      res.writeHead(502, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: String(err) }));
    }
    return;
  }

  if ((req.url === '/v1/chat/completions' || req.url === '/chat/completions') && req.method === 'POST') {
    let body = '';
    for await (const chunk of req) body += chunk;
    try {
      const upstream = await fetch(`${GATEWAY_BASE}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_KEY}`,
          'X-Hwata-Api-Key': API_KEY,
          'X-Hwata-Pet-Heartbeat': activeHeartbeatLease,
        },
        body,
      });
      const contentType = upstream.headers.get('content-type') || 'application/json; charset=utf-8';
      const outText = await upstream.text();
      res.writeHead(upstream.status, { 'Content-Type': contentType });
      res.end(outText);
    } catch (err) {
      res.writeHead(502, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: String(err) }));
    }
    return;
  }

  res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(
    JSON.stringify({
      ok: true,
      protocol: 'WhiteStyle Hwata Omni-Free AI Local Bridge',
      localBaseUrl: `http://127.0.0.1:${PORT}/v1`,
      upstreamGateway: GATEWAY_BASE,
    })
  );
});

server.listen(PORT, '127.0.0.1', () => {
  console.log('====================================================================');
  console.log(' [화이트스타일 정회원 전용] 화타 무료 AI API 로컬 프로토콜 가동 완료!');
  console.log(` - Local OpenAI Base URL : http://127.0.0.1:${PORT}/v1`);
  console.log(` - Models Endpoint       : http://127.0.0.1:${PORT}/v1/models`);
  console.log(` - Chat Completions      : http://127.0.0.1:${PORT}/v1/chat/completions`);
  console.log('====================================================================');
});
