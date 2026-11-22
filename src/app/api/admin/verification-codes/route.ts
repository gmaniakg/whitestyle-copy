import crypto from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireOwnerAdmin } from '@/app/api/_lib/admin';

export const dynamic = 'force-dynamic';

const SECURE_HEADERS = {
  'Cache-Control': 'no-store',
  'X-Robots-Tag': 'noindex, nofollow',
};

export async function GET() {
  const ownerEmail = await requireOwnerAdmin();
  if (!ownerEmail) {
    return NextResponse.json(
      { ok: false, message: '소유자 관리자 권한이 필요합니다.' },
      { status: 403, headers: SECURE_HEADERS }
    );
  }

  try {
    const items = await prisma.hwataVerificationCode.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100,
    });
    return NextResponse.json({ ok: true, items }, { headers: SECURE_HEADERS });
  } catch (err) {
    console.error('[api/admin/verification-codes GET error]:', err);
    return NextResponse.json(
      { ok: false, message: '인증코드 목록 조회 중 오류가 발생했습니다.' },
      { status: 500, headers: SECURE_HEADERS }
    );
  }
}

export async function POST(req: NextRequest) {
  const ownerEmail = await requireOwnerAdmin();
  if (!ownerEmail) {
    return NextResponse.json(
      { ok: false, message: '소유자 관리자 권한이 필요합니다.' },
      { status: 403, headers: SECURE_HEADERS }
    );
  }

  try {
    const body = await req.json().catch(() => ({}));
    const patientName = typeof body.patientName === 'string' ? body.patientName.trim().slice(0, 50) : '';
    const chartNo = typeof body.chartNo === 'string' ? body.chartNo.trim().replace(/[^a-zA-Z0-9-]/g, '').slice(0, 24) : '';
    const treatmentType =
      typeof body.treatmentType === 'string' && body.treatmentType.trim()
        ? body.treatmentType.trim().slice(0, 80)
        : '비보험 진료 정회원';
    const maxUses = Math.min(50, Math.max(1, Number(body.maxUses || 1)));
    const expiresDays = Math.min(365, Math.max(1, Number(body.expiresDays || 30)));
    const customCode = typeof body.code === 'string' ? body.code.trim().toUpperCase().replace(/[^A-Z0-9-]/g, '').slice(0, 24) : '';

    const randomPart = crypto.randomBytes(3).toString('hex').toUpperCase();
    const code = customCode.length >= 6 ? customCode : `WS-VIP-${randomPart}`;

    const expiresAt = new Date(Date.now() + expiresDays * 24 * 60 * 60 * 1000);

    const created = await prisma.hwataVerificationCode.create({
      data: {
        code,
        patientName: patientName || null,
        chartNo: chartNo || null,
        treatmentType,
        issuedBy: ownerEmail,
        maxUses,
        expiresAt,
      },
    });

    const verifyUrl = `https://whitestyle.com/messenger?verify=${encodeURIComponent(created.code)}`;
    const guideText = `[화이트스타일치과의원 · 인증된 화타펫 정회원 코드 안내]\n${
      patientName ? `${patientName}님, ` : ''
    }${treatmentType} 비보험 진료 정회원 전용 코드가 발급되었습니다.\n\n• 인증 코드: ${created.code}\n• 바로 인증하기: ${verifyUrl}\n• 혜택: 로그인 상태에서 지인 전용 화타톡 방 개설 및 대용량 파일 전송 가능\n• 대표상담: 1577-7287 / 02-569-7528`;

    return NextResponse.json(
      { ok: true, item: created, verifyUrl, guideText },
      { status: 201, headers: SECURE_HEADERS }
    );
  } catch (err) {
    console.error('[api/admin/verification-codes POST error]:', err);
    return NextResponse.json(
      { ok: false, message: '인증코드 생성 중 오류가 발생했습니다. 코드 중복 여부를 확인해 주세요.' },
      { status: 500, headers: SECURE_HEADERS }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const ownerEmail = await requireOwnerAdmin();
  if (!ownerEmail) {
    return NextResponse.json(
      { ok: false, message: '소유자 관리자 권한이 필요합니다.' },
      { status: 403, headers: SECURE_HEADERS }
    );
  }

  try {
    const id = req.nextUrl.searchParams.get('id') || '';
    if (!id) {
      return NextResponse.json(
        { ok: false, message: '삭제할 코드 ID가 필요합니다.' },
        { status: 400, headers: SECURE_HEADERS }
      );
    }
    await prisma.hwataVerificationCode.delete({ where: { id } });
    return NextResponse.json({ ok: true, deletedId: id }, { headers: SECURE_HEADERS });
  } catch (err) {
    console.error('[api/admin/verification-codes DELETE error]:', err);
    return NextResponse.json(
      { ok: false, message: '인증코드 삭제 중 오류가 발생했습니다.' },
      { status: 500, headers: SECURE_HEADERS }
    );
  }
}
