import { NextResponse } from 'next/server';

const CORS_HEADERS: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Hwata-Api-Key, X-Hwata-Client',
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

export async function GET() {
  const now = Math.floor(Date.now() / 1000);
  return NextResponse.json(
    {
      object: 'list',
      provider: 'WhiteStyle Dental Clinic — Hwata Omni-Free AI Gateway (Verified Prosthodontic/Implant Members Only)',
      data: [
        {
          id: 'hwata-omni-free',
          object: 'model',
          created: now,
          owned_by: 'whitestyle-omni-router',
          description: '전 세계 무료 AI API 통합 자동 라우터 (Gemini Free + OpenRouter Free + Groq Free + Cloudflare AI Free + Pollinations + Strata)',
        },
        {
          id: 'hwata-coder-free',
          object: 'model',
          created: now,
          owned_by: 'whitestyle-omni-router',
          description: '코딩·개발 특화 무료 AI 라우터 (Gemini 2.5 Flash + Qwen 2.5 Coder 32B Free + DeepSeek V3/R1 Free)',
        },
        {
          id: 'hwata-reasoning-free',
          object: 'model',
          created: now,
          owned_by: 'whitestyle-omni-router',
          description: '심층 추론 특화 무료 AI 라우터 (Gemini 2.5 Flash + DeepSeek R1 Free + Llama 3.3 70B Free)',
        },
        {
          id: 'hwata-gemini-free',
          object: 'model',
          created: now,
          owned_by: 'google-free-tier',
          description: 'Google Gemini 2.5 Flash-Lite / 2.5 Flash Free Tier Direct',
        },
        {
          id: 'hwata-llama70b-free',
          object: 'model',
          created: now,
          owned_by: 'meta-free-tier',
          description: 'Meta Llama 3.3 70B Instruct Free Tier Router',
        },
        {
          id: 'hwata-qwen3-free',
          object: 'model',
          created: now,
          owned_by: 'qwen-free-tier',
          description: 'Qwen3 / Qwen 2.5 72B Free Tier Router',
        },
      ],
    },
    { status: 200, headers: CORS_HEADERS }
  );
}
