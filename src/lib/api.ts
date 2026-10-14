import fs from 'fs';
import path from 'path';

// 경로 설정
const EXTRACTED_DATA_DIR = path.join(process.cwd(), 'extracted_data');
const METADATA_FILE = path.join(EXTRACTED_DATA_DIR, 'metadata.json');

export interface LegacyPost {
  url: string;
  local_path: string;
  title: string;
  type: string;
  scraped_at: string;
  metadata: Record<string, unknown>;
}

// ─── 인메모리 캐시 (프로세스 생애 동안 metadata.json 을 1회만 읽음) ───
let _postsCache: LegacyPost[] | null = null;

// 전체 메타데이터 로드 (캐시 우선)
export function getAllPosts(): LegacyPost[] {
  if (_postsCache) return _postsCache;

  try {
    if (!fs.existsSync(METADATA_FILE)) return [];
    const raw = fs.readFileSync(METADATA_FILE, 'utf8');
    _postsCache = JSON.parse(raw) as LegacyPost[];
    return _postsCache;
  } catch (err) {
    console.error('[api] metadata.json 로드 실패:', err);
    return [];
  }
}

/** 캐시를 강제로 비워서 다음 요청 시 디스크에서 다시 읽도록 함 */
export function invalidateCache(): void {
  _postsCache = null;
}

// 특정 타입(게시판)의 글만 가져오기
export function getPostsByType(type: string): LegacyPost[] {
  return getAllPosts().filter(post => post.type === type);
}

// 파일 내용을 읽어오기 및 크롤러 메타데이터 제거
export function getPostContent(localPath: string): string | null {
  const fullPath = path.join(EXTRACTED_DATA_DIR, localPath);

  try {
    if (!fs.existsSync(fullPath)) return null;
    let content = fs.readFileSync(fullPath, 'utf8');

    // 크롤러 메타데이터 제거
    content = content.replace(/^#\s+.*(\r?\n)+/, '');
    content = content.replace(/\*\s+\*\*Original URL:\*\*.*(\r?\n)+/g, '');
    content = content.replace(/\*\s+\*\*Extracted Date:\*\*.*(\r?\n)+/g, '');
    content = content.replace(/\*\s+\*\*Category:\*\*.*(\r?\n)+/g, '');
    content = content.replace(/\*\s+\*\*Author:\*\*.*(\r?\n)+/g, '');
    content = content.replace(/\*\s+\*\*AEO\/GEO Optimized:\*\*.*(\r?\n)+/g, '');
    content = content.replace(/^---\s*(\r?\n)+/m, '');
    content = content.replace(/^##\s+본문\s*(\r?\n)+/m, '');
    content = content.replace(
      /-\s+현재 이 브라우저는 스크립트 실행을 할 수 없는 환경이어서, 사이트 이용에 제한이 있으니 다른 브라우저를 이용하시길 권장 드립니다\.?(\r?\n)*/g,
      ''
    );

    // 그누보드 상단/좌측 GNB 메뉴 자르기 ([온라인상담] 메뉴가 마지막 메뉴임)
    const onlineConsultIndex = content.indexOf('[온라인상담](http');
    if (onlineConsultIndex !== -1) {
      const nextLineIdx = content.indexOf('\n', onlineConsultIndex);
      if (nextLineIdx !== -1) content = content.substring(nextLineIdx);
    }

    // 그누보드 하단 푸터 영역 자르기 ([이용약관] 부터 푸터임)
    const termsIndex = content.indexOf('[이용약관](http');
    if (termsIndex !== -1) content = content.substring(0, termsIndex);

    return content.trim() || null;
  } catch (err) {
    console.error(`[api] 파일 읽기 실패 (${localPath}):`, err);
    return null;
  }
}

// 제목이나 URL, 파일명(ID)으로 검색하여 하나 찾기 (타입 필터 및 엄격한 ID 매칭 추가)
export function getPostByPartialTitle(
  keyword: string,
  type?: string
): { post: LegacyPost; content: string } | null {
  const allPosts = getAllPosts();

  const post = allPosts.find(p => {
    // 1. 타입 필터링
    if (type && p.type !== type) return false;

    // 2. 파일명 접두사 (ID) 매칭 (예: 217_배우_짜잔형_최동균님.md -> "217")
    const filename = p.local_path.split('/').pop() ?? '';
    const fileId = filename.split('_')[0];
    if (fileId === keyword) return true;

    // 3. URL 내 wr_id 또는 id 파라미터 매칭 (예: wr_id=217)
    const urlMatch = p.url.match(/[?&](wr_id|id)=(\d+)/);
    if (urlMatch?.[2] === keyword) return true;

    // 4. 제목이나 기타 경로 부분 매치 (폴백)
    return p.title.includes(keyword) || p.local_path.includes(keyword);
  });

  if (!post) return null;

  const content = getPostContent(post.local_path);
  return content ? { post, content } : null;
}
