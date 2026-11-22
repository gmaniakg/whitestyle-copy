import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import {
  buildHwataCorsHeaders,
  loginRequiredResponse,
  requireHwataMember,
} from '@/app/api/_lib/hwata-auth';
import { sendVerifiedHwataPetEmail } from '@/lib/seasonal-email';

export const dynamic = 'force-dynamic';

export async function OPTIONS(req: NextRequest) {
  return new NextResponse(null, { status: 204, headers: buildHwataCorsHeaders(req) });
}

export async function POST(req: NextRequest) {
  const member = await requireHwataMember(req);
  if (!member) return loginRequiredResponse(req);
  const corsHeaders = buildHwataCorsHeaders(req);

  try {
    const body = await req.json().catch(() => ({}));
    const rawCode = String(body.code || '').trim().toUpperCase();

    if (!rawCode || rawCode.length < 4) {
      return NextResponse.json(
        { ok: false, message: '화이트스타일치과 원내에서 발급받으신 인증코드를 입력해 주세요.' },
        { status: 400, headers: corsHeaders }
      );
    }

    const codeRecord = await prisma.hwataVerificationCode.findUnique({
      where: { code: rawCode },
    });

    if (!codeRecord) {
      return NextResponse.json(
        {
          ok: false,
          message: '유효하지 않은 인증코드입니다. 원내 접수 데스크 또는 1577-7287로 코드를 확인해 주세요.',
        },
        { status: 404, headers: corsHeaders }
      );
    }

    if (codeRecord.expiresAt && codeRecord.expiresAt.getTime() < Date.now()) {
      return NextResponse.json(
        { ok: false, message: '만료된 인증코드입니다. 병원에 새 코드를 요청해 주세요.' },
        { status: 400, headers: corsHeaders }
      );
    }

    if (codeRecord.usedCount >= codeRecord.maxUses) {
      return NextResponse.json(
        { ok: false, message: '이미 사용 한도가 완료된 인증코드입니다.' },
        { status: 400, headers: corsHeaders }
      );
    }

    const now = new Date();
    const [, updatedUser] = await prisma.$transaction([
      prisma.hwataVerificationCode.update({
        where: { id: codeRecord.id },
        data: {
          usedCount: { increment: 1 },
          usedByUserId: member.id,
        },
      }),
      prisma.user.update({
        where: { id: member.id },
        data: {
          isVerifiedNonInsured: true,
          verifiedTreatment: codeRecord.treatmentType,
          chartNo: codeRecord.chartNo || member.chartNo,
          verifiedAt: now,
          verifiedBy: codeRecord.issuedBy,
        },
        select: {
          id: true,
          email: true,
          name: true,
          agreedMarketing: true,
          isVerifiedNonInsured: true,
          verifiedTreatment: true,
          chartNo: true,
        },
      }),
    ]);

    if (updatedUser.email) {
      await sendVerifiedHwataPetEmail(updatedUser).catch(() => null);
    }

    return NextResponse.json(
      {
        ok: true,
        isVerifiedNonInsured: true,
        verifiedTreatment: updatedUser.verifiedTreatment,
        chartNo: updatedUser.chartNo,
        message: `인증된 화타펫(${updatedUser.verifiedTreatment}) 승인이 완료되었습니다! 이제 지인 전용 화타톡 대화방을 개설하고 최대 500MB 클라우드 & 무제한 P2P 파일 전송을 이용하실 수 있습니다.`,
      },
      { headers: corsHeaders }
    );
  } catch (err) {
    console.error('[messenger/v1/verify POST error]:', err);
    return NextResponse.json(
      { ok: false, message: '비보험 진료 인증 처리 중 오류가 발생했습니다.' },
      { status: 500, headers: corsHeaders }
    );
  }
}
