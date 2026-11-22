import { NextRequest, NextResponse } from 'next/server';
import {
  buildHwataCorsHeaders,
  requireHwataMember,
  signHwataSessionToken,
} from '@/app/api/_lib/hwata-auth';

export const dynamic = 'force-dynamic';

export async function OPTIONS(req: NextRequest) {
  return new NextResponse(null, { status: 204, headers: buildHwataCorsHeaders(req) });
}

export async function GET(req: NextRequest) {
  const corsHeaders = buildHwataCorsHeaders(req);
  const member = await requireHwataMember(req);

  if (!member) {
    return NextResponse.json(
      {
        ok: true,
        authenticated: false,
        user: null,
        token: null,
        loginUrl: '/login?callbackUrl=%2Fmessenger',
        registerUrl: '/register?callbackUrl=%2Fmessenger',
      },
      { status: 200, headers: { ...corsHeaders, 'Cache-Control': 'no-store' } }
    );
  }

  const token = signHwataSessionToken({
    id: member.id,
    email: member.email,
    name: member.name,
  });

  let petAvatar = null;
  try {
    petAvatar = member.petAvatarJson ? JSON.parse(member.petAvatarJson) : null;
  } catch {
    petAvatar = null;
  }

  return NextResponse.json(
    {
      ok: true,
      authenticated: true,
      user: {
        id: member.id,
        name: member.name,
        email: member.email,
        agreedMarketing: member.agreedMarketing,
        isOwnerAdmin: member.isOwnerAdmin,
        isVerifiedNonInsured: member.isVerifiedNonInsured,
        verifiedTreatment: member.verifiedTreatment,
        chartNo: member.chartNo,
        handle: member.handle,
        statusMessage: member.statusMessage,
        petAvatar,
      },
      token,
    },
    { status: 200, headers: { ...corsHeaders, 'Cache-Control': 'no-store' } }
  );
}
