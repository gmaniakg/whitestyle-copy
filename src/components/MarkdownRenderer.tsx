'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import rehypeRaw from 'rehype-raw';
import '../app/board/board-editorial.css';

interface MarkdownRendererProps {
  content: string;
}

function addClassToOpeningTag(tag: string, extraClass: string): string {
  if (/class="([^"]*)"/i.test(tag)) {
    return tag.replace(/class="([^"]*)"/i, (full, existing: string) => {
      const tokens = existing.split(/\s+/).filter(Boolean);
      if (tokens.includes(extraClass)) return full;
      return `class="${existing} ${extraClass}"`;
    });
  }
  if (/class='([^']*)'/i.test(tag)) {
    return tag.replace(/class='([^']*)'/i, (full, existing: string) => {
      const tokens = existing.split(/\s+/).filter(Boolean);
      if (tokens.includes(extraClass)) return full;
      return `class='${existing} ${extraClass}'`;
    });
  }
  return tag.replace(/^(<[a-z0-9-]+)/i, `$1 class="${extraClass}"`);
}

function normalizeLegacyBoardHtml(raw: string): string {
  let html = raw;

  html = html.replace(
    /<div\b[^>]*style="[^"]*(?:background:#FAF9F5|background-color:#ffffff;border:1px solid #cbd5e1|max-width:860px;margin:0 auto)[^"]*"[^>]*>/gi,
    (tag) => addClassToOpeningTag(tag, 'ws-legacy-root')
  );

  html = html.replace(
    /<div\b[^>]*style="padding:3[68]px;?"[^>]*>/gi,
    (tag) => addClassToOpeningTag(tag, 'ws-legacy-inner')
  );

  html = html.replace(
    /<div\b[^>]*style="[^"]*background(?:-color)?:\s*#(?:0f172a|091326|1e293b)[^"]*"[^>]*>/gi,
    (tag) => addClassToOpeningTag(tag, 'ws-lead-banner')
  );

  html = html.replace(
    /<span\b[^>]*style="[^"]*background(?:-color)?:\s*#(?:38bdf8|fde68a)[^"]*"[^>]*>/gi,
    (tag) => addClassToOpeningTag(tag, 'ws-lead-chip')
  );

  html = html.replace(
    /<div\b[^>]*style="[^"]*(?:border:2px solid #(?:0284c7|1e3a8a)|border-left:5px solid #0284c7|border-left:4px solid #0f172a)[^"]*"[^>]*>/gi,
    (tag) => addClassToOpeningTag(tag, 'ws-summary-box')
  );

  html = html.replace(
    /<div\b[^>]*style="[^"]*background(?:-color)?:\s*#ffffff;border:1px solid #cbd5e1;padding:28px 30px[^"]*"[^>]*>/gi,
    (tag) => addClassToOpeningTag(tag, 'ws-qa-box')
  );

  html = html.replace(
    /<div\b[^>]*\blang="ja"[^>]*>/gi,
    (tag) => {
      if (tag.includes('ws-legacy-root') || tag.includes('ws-lead-banner')) {
        return tag;
      }
      return addClassToOpeningTag(tag, 'ws-ja-section');
    }
  );

  html = html.replace(
    /<h[23]\b[^>]*style="[^"]*border-left:5px solid #(?:0284c7|1e3a8a)[^"]*"[^>]*>/gi,
    (tag) => addClassToOpeningTag(tag, 'ws-section-head')
  );

  html = html.replace(/<table\b[^>]*>[\s\S]*?<\/table>/gi, (tableBlock) => {
    if (!/<thead\b/i.test(tableBlock)) {
      return tableBlock;
    }
    return tableBlock.replace(/^<table\b[^>]*>/i, (openTag) =>
      addClassToOpeningTag(openTag, 'ws-data-table')
    );
  });

  return html;
}

const SafeImage = ({
  src,
  alt,
  isIcon,
  style,
  className,
}: {
  src: string;
  alt?: string;
  isIcon: boolean;
  style?: React.CSSProperties;
  className?: string;
}) => {
  const [error, setError] = React.useState(false);

  if (error) return null;

  if (isIcon || (style && style.width && style.height)) {
    return (
      <img
        src={src}
        alt={alt || '임상 아이콘'}
        style={style}
        className={className ? `${className} ws-article-icon` : 'ws-article-icon'}
        onError={() => setError(true)}
      />
    );
  }

  return (
    <span className="ws-article-img-wrap">
      <img
        src={src}
        alt={alt || '화이트스타일치과의원 안내 이미지'}
        style={style}
        className={className ? `${className} ws-article-img` : 'ws-article-img'}
        onError={() => setError(true)}
      />
      {alt && alt !== 'image' && <span className="ws-article-figcaption">{alt}</span>}
    </span>
  );
};

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  let cleanContent = content;
  if (cleanContent.includes('## 본문')) {
    cleanContent = cleanContent.split('## 본문')[1].trim();
  } else if (cleanContent.includes('* **Category:**') && cleanContent.includes('---')) {
    const parts = cleanContent.split('---');
    cleanContent = parts.slice(1).join('---').trim();
  }

  const isEmptyOrPlaceholder = !cleanContent || cleanContent.trim().length === 0;

  if (isEmptyOrPlaceholder) {
    return (
      <div className="ws-empty-state">
        <p>내용이 없습니다.</p>
      </div>
    );
  }

  const normalizedContent = normalizeLegacyBoardHtml(cleanContent);

  return (
    <div className="ws-article-body wb-ka wbka">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkBreaks]}
        rehypePlugins={[rehypeRaw]}
        components={{
          img: ({ src, alt, style, className }) => {
            if (!src || typeof src !== 'string') return null;
            const fixedSrc = src
              .replace(/^.*\/assets\//, '/images/')
              .replace(/^https?:\/\/(?:www\.)?whitestyle\.com(?::443)?\/data\//i, '/data/')
              .replace(/^https?:\/\/cdn\.myreal\.co\.kr\/data\//i, '/data/');
            const lowerSrc = fixedSrc.toLowerCase();
            const isIcon = lowerSrc.includes('icon');

            return (
              <SafeImage
                src={fixedSrc}
                alt={alt}
                isIcon={isIcon}
                style={style}
                className={className}
              />
            );
          },
          table: ({ className, style, children }) => {
            const isDataTable = Boolean(className?.includes('ws-data-table')) || !style;
            if (!isDataTable) {
              return (
                <table className={className} style={style}>
                  {children}
                </table>
              );
            }
            return (
              <div className="ws-table-scroll">
                <table
                  className={className ? `${className} ws-data-table` : 'ws-data-table'}
                  style={style}
                >
                  {children}
                </table>
              </div>
            );
          },
          a: ({ href, children, className, style }) => {
            if (!href) return <span className={className} style={style}>{children}</span>;
            if (href.includes('view_image.php') || href.includes('board.php')) {
              return <>{children}</>;
            }
            return (
              <a
                href={href}
                style={style}
                className={className ? `${className} ws-article-link` : 'ws-article-link'}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                {children}
              </a>
            );
          },
        }}
      >
        {normalizedContent}
      </ReactMarkdown>
    </div>
  );
}
