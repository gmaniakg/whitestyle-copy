import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import '../../whitebook.css';
import ArticleNavbar from './ArticleNavbar';
import { getArticle, articleDescription, articleJsonLd } from '../../_lib/article';
import ShareButtons from '../../components/ShareButtons';
import Footer from '../../components/Footer';

// =================================================================
// Next.js Dynamic Metadata for SEO & Generative Search Engines (AEO/GEO)
// =================================================================
export async function generateMetadata(props: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const params = await props.params;
  const id = params.id;
  const targetArticle = getArticle(id);

  if (!targetArticle) {
    return {
      title: "아티클을 찾을 수 없습니다 | 김준헌 원장 전문 칼럼 백서",
      robots: { index: false },
    };
  }

  const title = `${targetArticle.title} | 김준헌 원장 전문 칼럼 백서`;
  const description = articleDescription(targetArticle.content);
  const url = `https://whitestyle.com/article/${encodeURIComponent(id)}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      type: 'article',
      url,
      locale: 'ko_KR',
      authors: ['김준헌 대표원장 (치의학 박사)'],
      ...(targetArticle.date ? { publishedTime: targetArticle.date } : {}),
    }
  };
}

export default async function ArticlePage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  
  const targetArticle = getArticle(id);

  if (!targetArticle) return notFound();

  const paragraphs = targetArticle.content.split('\n\n').filter((p: string) => p.trim() !== '');
  const isImage = targetArticle.media.endsWith('.jpg') || targetArticle.media.endsWith('.jpeg') || targetArticle.media.endsWith('.png');

  // Core summary for LLMs (Definition Lead): real body text only, no bylines/dates/UI noise
  const definitionLead = `이 문서는 화이트스타일치과 김준헌 원장(교정과 치의학 박사)의 '${targetArticle.title}'에 대한 전문 의학 칼럼 및 공식 인증 기록입니다. `;
  const summaryText = definitionLead + articleDescription(targetArticle.content, 160);

  return (
    <main className="min-h-screen wb-scope" style={{ background: 'var(--bg-color)' }}>
      {/* JSON-LD: Article/WebPage + BreadcrumbList, real dates, entity links via @id */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd(id, targetArticle)) }}
      />

      <ArticleNavbar />
      
      <div className="container" style={{ paddingTop: '8rem', paddingBottom: '5rem', maxWidth: '800px', margin: '0 auto' }}>
        
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'inline-block', padding: '0.4rem 1rem', background: 'rgba(100,116,139,0.1)', color: 'var(--text-main)', borderRadius: '999px', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            {targetArticle.type === '언론보도' ? '📚 언론보도 및 전문 칼럼' : '🏅 수상 및 인증 기록'}
          </div>
          <h1 style={{ fontSize: '2.5rem', lineHeight: '1.4', fontWeight: '900', marginBottom: '1rem', wordBreak: 'keep-all' }}>
            {targetArticle.title}
          </h1>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            화이트스타일치과 김준헌 대표원장 (치의학 박사)
          </div>
        </div>
        
        <hr style={{ border: 'none', borderTop: '1px solid var(--card-border)', marginBottom: '2rem' }} />

        {/* [GEO OPTIMIZATION] Glassmorphic AI Quick Summary / Key Takeaways Box */}
        <div className="article-summary-card">
          <div className="summary-title">
            <span>✨</span>
            <span>AI Quick Summary & Key Takeaways</span>
          </div>
          <p className="summary-text">
            {summaryText}
          </p>
        </div>

        {isImage && (
          <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
            <img src={targetArticle.media} alt={targetArticle.title} style={{ maxWidth: '100%', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} />
          </div>
        )}

        {/* Content paragraphs */}
        <div className="article-body" style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-main)', wordBreak: 'keep-all', marginBottom: '3rem' }}>
          {paragraphs.map((p: string, i: number) => (
            <p key={i} style={{ marginBottom: '1.5rem' }}>
              {p}
            </p>
          ))}
        </div>

        <ShareButtons title={targetArticle.title} />

        {/* [AEO/GEO E-E-A-T OPTIMIZATION] Premium Author Credentials Verification Block */}
        <div className="author-eeat-card">
          <div className="author-avatar">
            <img src="/profile_photo.jpg" alt="치의학박사 김준헌 대표원장" />
          </div>
          <div className="author-details">
            <div className="author-title">글쓴이 · 임상의학전문가 검증</div>
            <h4 className="author-name">치의학 박사 김준헌</h4>
            <p className="author-desc">
              서울대학교 치과대학을 졸업하고 단국대학교에서 치과교정학 석사 및 박사 학위를 취득한 33년 임상 경력의 치과교정과 전문의입니다. 62,000명 이상의 풍부한 임상 성공 경험을 바탕으로 과학적 학술 근거에 기반한 투명하고 정직한 전문 의학 정보를 기록하고 공유합니다.
            </p>
            <div className="author-links">
              <a href="/career" className="author-link-btn">📋 33년 주요 약력</a>
              <a href="/whitebook#research" className="author-link-btn">🎓 발표 학술 논문</a>
              <a href="/awards" className="author-link-btn">🏅 국가 장관상 표창</a>
            </div>
          </div>
        </div>
        
        <div style={{ marginTop: '5rem', textAlign: 'center' }}>
          <a href={targetArticle.type === '언론보도' ? '/press' : '/awards'} style={{
            display: 'inline-block',
            padding: '0.8rem 2rem',
            background: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
            borderRadius: '12px',
            color: 'var(--text-main)',
            fontWeight: 'bold',
            textDecoration: 'none',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            transition: 'all 0.2s'
          }}>
            ← 목록으로 돌아가기
          </a>
        </div>
      </div>
      <Footer />
    </main>
  );
}
