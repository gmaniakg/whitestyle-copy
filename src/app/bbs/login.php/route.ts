import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const target = new URL('/login', req.url);
  const { searchParams } = new URL(req.url);
  const urlParam = searchParams.get('url');
  if (urlParam) {
    target.searchParams.set('callbackUrl', urlParam);
  }
  return NextResponse.redirect(target, 307);
}
