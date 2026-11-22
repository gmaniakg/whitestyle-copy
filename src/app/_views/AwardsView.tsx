'use client';

import '../whitebook.css';
import { awardCategories } from '../data';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import React from 'react';
import { useLangRoute, type Lang } from '../components/useLangRoute';
export default function AwardsPage({ initialLang = 'ko' }: { initialLang?: Lang }) {
  const lang = initialLang;
  const handleSetLang = useLangRoute(lang, '/');

  return (
    <main className="min-h-screen wb-scope">
      <Navbar lang={lang} setLang={handleSetLang} />
      {/* Hero */}
      <section style={{ paddingTop: '8rem', paddingBottom: '4rem', textAlign: 'center' }} className="container">
        <div className="hero-badge">Awards & Certifications</div>
        <h1 className="hero-title" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', marginTop: '1rem' }}>
          수상경력 &amp; 인증
        </h1>
        <p className="hero-subtitle" style={{ margin: '0 auto' }}>
          김준헌 원장님의 33년 임상 경험과 헌신이 만들어낸<br />
          국내외 주요 표창과 공식 인증 내역
        </p>
        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <span style={{ padding: '0.4rem 1rem', borderRadius: '999px', background: 'rgba(217,119,6,0.1)', color: '#d97706', fontWeight: 600, fontSize: '0.875rem' }}>국가 표창</span>
          <span style={{ padding: '0.4rem 1rem', borderRadius: '999px', background: 'rgba(5,150,105,0.1)', color: '#059669', fontWeight: 600, fontSize: '0.875rem' }}>글로벌 협력</span>
          <span style={{ padding: '0.4rem 1rem', borderRadius: '999px', background: 'rgba(37,99,235,0.1)', color: '#2563eb', fontWeight: 600, fontSize: '0.875rem' }}>전문 자격</span>
        </div>
      </section>

      {/* Awards Sections */}
      {awardCategories.map((section, si) => (
        <section key={si} className="section" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
          <div className="container">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
              <div>
                <h2 style={{ fontSize: '1.75rem', fontWeight: 800 }}>{section.category}</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>{section.desc}</p>
              </div>
              <div style={{ flex: 1, height: '2px', background: `linear-gradient(to right, ${section.color}44, transparent)` }}></div>
            </div>

            <div className="grid grid-cols-3">
              {section.items.map((item, i) => (
                <a
                  key={i}
                  href={`/article/${item.file.split('.')[0]}`}
                  style={{ textDecoration: 'none' }}
                >
                  <div className="card animate-up" style={{ padding: 0, overflow: 'hidden', borderTop: `3px solid ${section.color}`, height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ height: '220px', overflow: 'hidden', background: '#f1f5f9' }}>
                      <img 
                        src={`/awards/${item.file}`} 
                        alt={item.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                        onMouseOver={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                        onMouseOut={e => (e.currentTarget.style.transform = 'scale(1)')} 
                      />
                    </div>
                    <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                      <h4 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.5rem', color: 'var(--text-main)' }}>{item.title}</h4>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', flexGrow: 1 }}>{item.desc}</p>
                      
                      <div style={{ 
                        marginTop: '1.25rem', padding: '0.5rem 1rem', background: `${section.color}18`, color: section.color,
                        borderRadius: '8px', fontSize: '0.875rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                        transition: 'all 0.2s ease', cursor: 'pointer'
                      }}>
                        <span>본문 내용 보기</span>
                        <span>→</span>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      ))}

      <Footer />
    </main>
  );
}
