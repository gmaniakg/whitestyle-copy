import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const boTable = searchParams.get('bo_table') || '';
  const wrId = searchParams.get('wr_id') || '';

  let destination = '/';

  switch (boTable.toLowerCase()) {
    case 'online':
    case 'doc_counsel':
      destination = '/consult';
      break;
    case 'notice':
      destination = wrId ? `/board/notice/${wrId}` : '/board/notice';
      break;
    case 'review':
    case 'case':
      destination = wrId ? `/board/review/${wrId}` : '/board/review';
      break;
    case 'report':
    case 'column':
    case 'youtube':
      destination = wrId ? `/board/report/${wrId}` : '/board/report';
      break;
    case 'withstar':
      destination = wrId ? `/board/withstar/${wrId}` : '/board/withstar';
      break;
    case 'open_price':
      destination = '/consult';
      break;
    default:
      destination = '/board/notice';
      break;
  }

  return NextResponse.redirect(new URL(destination, req.url), 301);
}
