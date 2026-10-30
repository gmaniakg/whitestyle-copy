import { NextResponse } from 'next/server';
import { PRIVACY_DATA } from '@/app/api/_lib/privacy-data';

export const dynamic = 'force-static';

export async function GET() {
  return NextResponse.json(
    {
      success: true,
      ...PRIVACY_DATA,
    },
    {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    }
  );
}
