import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const boTable = (searchParams.get('bo_table') || '').toLowerCase();
  const wrId = searchParams.get('wr_id') || '';

  let destination = '/';
  let statusCode: 301 | 307 = 301;

  switch (boTable) {
    case 'online':
    case 'feedback':
    case 'reserve':
    case 'doc_counsel':
      destination = '/consult';
      statusCode = 301;
      break;
    case 'notice':
      destination = wrId ? `/board/notice/${wrId}` : '/board/notice';
      break;
    // 후기·경험담·연예인 게시판은 의료법 제56조 검토에 따라 삭제됨 → 공지로 이동
    case 'review':
    case 'case':
    case 'report':
    case 'youtube':
    case 'withstar':
      destination = '/board/notice';
      break;
    case 'column':
      destination = wrId ? `/board/notice/${wrId}` : '/board/notice';
      break;
    case 'open_price':
      destination = '/price';
      break;
    default:
      destination = '/board/notice';
      break;
  }

  return NextResponse.redirect(new URL(destination, req.url), statusCode);
}
