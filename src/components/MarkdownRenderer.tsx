'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import rehypeRaw from 'rehype-raw';
import Image from 'next/image';

interface MarkdownRendererProps {
  content: string;
}

const SafeImage = ({ src, alt, isIcon }: { src: string; alt?: string; isIcon: boolean }) => {
  const [error, setError] = React.useState(false);

  if (error) return null;

  if (isIcon) {
    return (
      <img
        src={src}
        alt={alt || "아이콘"}
        loading="lazy"
        className="inline-block object-contain align-middle"
        onError={() => setError(true)}
      />
    );
  }

  return (
    <span className="block relative w-full h-auto my-4 text-center">
      <img
        src={src}
        alt={alt || "이미지"}
        loading="lazy"
        className="max-w-[1400px] w-full h-auto object-contain mx-auto"
        onError={() => setError(true)}
      />
      {alt && alt !== "image" && <span className="block text-center text-sm text-gray-500 mt-2">{alt}</span>}
    </span>
  );
};

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  // 크롤러가 생성한 메타데이터(카테고리, 작성자, URL 등) 및 '## 본문' 제거
  let cleanContent = content;
  if (cleanContent.includes('## 본문')) {
    cleanContent = cleanContent.split('## 본문')[1].trim();
  } else if (cleanContent.includes('* **Category:**') && cleanContent.includes('---')) {
    const parts = cleanContent.split('---');
    cleanContent = parts.slice(1).join('---').trim();
  }

  // 텍스트가 완전히 비어있는 경우 Fallback 처리
  const isEmptyOrPlaceholder = !cleanContent || cleanContent.trim().length === 0;

  if (isEmptyOrPlaceholder) {
    return (
      <div className="text-center py-10 bg-blue-50/50 rounded-xl border border-blue-100/50">
        <p className="text-blue-800 font-bold mb-2">내용이 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="prose max-w-none text-left prose-p:text-[#333] prose-h2:text-[#333] prose-h3:text-[#333] prose-img:mx-auto prose-img:my-8 prose-p:my-4 prose-p:leading-relaxed prose-h2:font-bold prose-h3:font-bold break-words" style={{ fontFamily: 'Dotum, sans-serif' }}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkBreaks]}
        rehypePlugins={[rehypeRaw]}
        components={{
          // SEO 및 퍼포먼스 최적화를 위해 img 태그를 next/image로 대체
          img: ({ src, alt }) => {
            if (!src) return null;
            // 크롤러가 생성한 상대 경로(../assets/...)를 Next.js public 경로(/images/...)로 변환
            const fixedSrc = src.replace(/^.*\/assets\//, '/images/');
            const lowerSrc = fixedSrc.toLowerCase();
            
            
            // 글로벌 UI 요소 필터링을 제거하여 본문에 포함된 정상적인 이미지가 누락되지 않도록 수정
            
            // 파일명에 'icon'이 포함되어 있으면 작은 아이콘으로 처리
            const isIcon = lowerSrc.includes('icon');
            
            return <SafeImage src={fixedSrc} alt={alt} isIcon={isIcon} />;
          },
          // GEO 최적화용 Table (자연어 검색 대비 데이터 구조화)
          table: ({ children }) => (
            <div className="overflow-x-auto my-8">
              <table className="min-w-full divide-y divide-gray-200 border">
                {children}
              </table>
            </div>
          ),
          th: ({ children }) => (
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-b">
              {children}
            </td>
          ),
          // 깨진 구형 게시판 뷰어 링크(view_image.php 등)를 비활성화하여 이미지 클릭 시 404 오류 차단
          a: ({ href, children }) => {
            if (!href) return <span>{children}</span>;
            if (href.includes('view_image.php') || href.includes('board.php')) {
              return <>{children}</>;
            }
            return (
              <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="text-blue-600 hover:underline">
                {children}
              </a>
            );
          },
          // H2/H3 (질문형 헤딩) 강조 처리
          h2: ({ children }) => (
            <h2 className="!text-2xl md:!text-3xl !leading-snug !font-bold text-gray-900 mt-12 mb-6 pb-4 border-b-2 border-blue-100">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="!text-xl md:!text-2xl !leading-snug !font-bold text-gray-800 mt-8 mb-4">
              {children}
            </h3>
          )
        }}
      >
        {cleanContent}
      </ReactMarkdown>
    </div>
  );
}
