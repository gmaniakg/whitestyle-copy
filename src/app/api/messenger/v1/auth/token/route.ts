import { NextRequest, NextResponse } from 'next/server';
import {
  buildHwataCorsHeaders,
  loginRequiredResponse,
  requireHwataMember,
  signHwataSessionToken,
} from '@/app/api/_lib/hwata-auth';

export const dynamic = 'force-dynamic';

export async function OPTIONS(req: NextRequest) {
  return new NextResponse(null, { status: 204, headers: buildHwataCorsHeaders(req) });
}

export async function POST(req: NextRequest) {
  const member = await requireHwataMember(req);
  if (!member) return loginRequiredResponse(req);
  const corsHeaders = buildHwataCorsHeaders(req);

  const token = signHwataSessionToken({
    id: member.id,
    email: member.email,
    name: member.name,
  });

  return NextResponse.json(
    {
      ok: true,
      token,
      tokenType: 'Bearer',
      expiresInDays: 30,
      user: {
        id: member.id,
        email: member.email,
        name: member.name,
        handle: member.handle,
        isVerifiedNonInsured: member.isVerifiedNonInsured,
        verifiedTreatment: member.verifiedTreatment,
      },
    },
    { headers: { ...corsHeaders, 'Cache-Control': 'no-store' } }
  );
}
