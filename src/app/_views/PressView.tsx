'use client';

import '../whitebook.css';
import { pressItems } from '../data';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ShareButtons from '../components/ShareButtons';
import React from 'react';
import { useLangRoute, type Lang } from '../components/useLangRoute';
export default function PressPage({ initialLang = 'ko' }: { initialLang?: Lang }) {
  const lang = initialLang;
  const handleSetLang = useLangRoute(lang, '/');

  return (
    <main className="min-h-screen wb-scope">
      <Navbar lang={lang} setLang={handleSetLang} />
      {/* Hero */}
      <section style={{ paddingTop: '8rem', paddingBottom: '4rem', textAlign: 'center' }} className="container">
        <div className="hero-badge">Press & Media Archive</div>
        <h1 className="hero-title" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', marginTop: '1rem' }}>
          언론보도 &amp; 전문 칼럼
        </h1>
        <p className="hero-subtitle" style={{ margin: '0 auto' }}>
          김준헌 원장님이 국내외 주요 언론 및 전문 매체에 기고하고 보도된<br />
          치과 전문 칼럼과 언론 보도 자료 아카이브
        </p>
        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <span style={{ padding: '0.4rem 1rem', borderRadius: '999px', background: 'rgba(37,99,235,0.1)', color: '#2563eb', fontWeight: 600, fontSize: '0.875rem' }}>총 150+ 보도 자료</span>
          <span style={{ padding: '0.4rem 1rem', borderRadius: '999px', background: 'rgba(8,145,178,0.1)', color: '#0891b2', fontWeight: 600, fontSize: '0.875rem' }}>4개 카테고리</span>
          <span style={{ padding: '0.4rem 1rem', borderRadius: '999px', background: 'rgba(124,58,237,0.1)', color: '#7c3aed', fontWeight: 600, fontSize: '0.875rem' }}>국내외 주요 매체</span>
        </div>
      </section>

      {/* Press Sections */}
      {pressItems.map((section, si) => (
        <section key={si} className="section" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
          <div className="container">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
              <span style={{ fontSize: '2.5rem' }}>{section.emoji}</span>
              <div>
                <h2 style={{ fontSize: '1.75rem', fontWeight: 800 }}>{section.category}</h2>
              </div>
              <div style={{ flex: 1, height: '2px', background: `linear-gradient(to right, ${section.color}44, transparent)` }}></div>
            </div>

            <div className="grid grid-cols-3">
              {section.items.map((item, i) => (
                  <div key={i} className="card animate-up" style={{
                    height: '100%',
                    borderTop: `3px solid ${section.color}`,
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    flexDirection: 'column',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                      <span style={{
                        padding: '0.25rem 0.75rem',
                        borderRadius: '6px',
                        background: `${section.color}18`,
                        color: section.color,
                        fontSize: '0.75rem',
                        fontWeight: 700,
                      }}>{item.outlet}</span>
                      <span style={{ fontSize: '1.2rem', opacity: 0.4 }}>📄</span>
                    </div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 700, lineHeight: 1.5, marginBottom: '0.75rem', color: 'var(--text-main)' }}>
                      {item.title}
                    </h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6, flexGrow: 1 }}>
                      {item.desc}
                    </p>
                    
                    {/* 버튼 영역 */}
                    <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.5rem' }}>
                      {/* 원래 있던 원문 보기 (PDF 연결) */}
                      <a 
                        href={`/press/${item.file}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{ 
                          flex: 1, padding: '0.5rem 0', background: 'transparent', color: section.color,
                          border: `1px solid ${section.color}44`,
                          borderRadius: '8px', fontSize: '0.875rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem',
                          textDecoration: 'none'
                        }}
                      >
                        원문 보기
                      </a>
                      
                      {/* 추가된 본문 쉽게읽기 버튼 */}
                      <a 
                        href={`/article/${item.file.replace('.pdf', '')}`} 
                        style={{ 
                          flex: 1, padding: '0.5rem 0', background: `${section.color}18`, color: section.color,
                          borderRadius: '8px', fontSize: '0.875rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem',
                          textDecoration: 'none'
                        }}
                      >
                        본문 쉽게읽기 →
                      </a>
                    </div>
                  </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      <div className="container" style={{ maxWidth: '800px', margin: '0 auto', paddingBottom: '3rem' }}>
        <ShareButtons title="화이트스타일치과 김준헌 원장 - 언론 보도 및 의학 칼럼 아카이브" />
      </div>

      <Footer />
    </main>
  );
}
