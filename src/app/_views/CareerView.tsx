'use client';
import '../whitebook.css';
import { career } from '../data';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import React from 'react';
import { useLangRoute, type Lang } from '../components/useLangRoute';

export default function CareerPage({ initialLang = 'ko' }: { initialLang?: Lang }) {

  const stats = [
    { value: '33+', label: '의료업 경력 연수', icon: '⏱' },
    { value: '150+', label: '전문 칼럼 기고', icon: '✍️' },
    { value: '10+', label: '국제·국내 학술 이사직', icon: '🎓' },
    { value: '8+', label: '자원봉사 감사패', icon: '🤝' },
  ];

  const lang = initialLang;
  const handleSetLang = useLangRoute(lang, '/');

  return (
    <main className="min-h-screen wb-scope">
      <Navbar lang={lang} setLang={handleSetLang} />
      {/* Hero */}
      <section style={{ paddingTop: '8rem', paddingBottom: '5rem', textAlign: 'center' }} className="container">
        <div className="hero-badge">Curriculum Vitae</div>
        <h1 className="hero-title" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', marginTop: '1rem' }}>
          김준헌 원장님 경력 사항
        </h1>
        <p className="hero-subtitle" style={{ margin: '0 auto 3rem' }}>
          1990년 서울대학교 치의학대학 졸업 이후 33년간 쌓아온<br />
          학술·임상·사회공헌의 발자취
        </p>

        {/* Stats Bar */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem',
          maxWidth: '900px', margin: '0 auto',
        }}>
          {stats.map((s, i) => (
            <div key={i} className="card" style={{ textAlign: 'center', padding: '2rem 1rem' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{s.icon}</div>
              <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--accent)', lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem', fontWeight: 500 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Career Sections */}
      {career.map((section, si) => (
        <section key={si} className="section" style={{ paddingTop: '3rem', paddingBottom: '3rem', borderTop: `3px solid ${section.color}22` }}>
          <div className="container">
            {/* Section Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '3rem' }}>
              <div style={{
                width: '60px', height: '60px', borderRadius: '16px',
                background: `${section.color}18`, display: 'flex',
                alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', flexShrink: 0,
              }}>
                {section.icon}
              </div>
              <div>
                <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.25rem' }}>{section.era}</h2>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 600 }}>{section.period}</span>
              </div>
              <div style={{ flex: 1, height: '2px', background: `linear-gradient(to right, ${section.color}44, transparent)` }}></div>
            </div>

            {/* Timeline Items */}
            <div style={{ position: 'relative', paddingLeft: '2rem' }}>
              <div style={{
                position: 'absolute', left: 0, top: 0, bottom: 0,
                width: '2px', background: `linear-gradient(to bottom, ${section.color}, transparent)`,
              }}></div>

              {section.items.map((item, i) => (
                <div key={i} className="animate-up" style={{
                  position: 'relative', paddingLeft: '2.5rem', marginBottom: '2rem',
                }}>
                  {/* Dot */}
                  <div style={{
                    position: 'absolute', left: '-0.55rem', top: '0.35rem',
                    width: '12px', height: '12px', borderRadius: '50%',
                    background: section.color, boxShadow: `0 0 0 3px var(--bg-color), 0 0 0 5px ${section.color}44`,
                  }}></div>

                  <div className="card" style={{
                    padding: '1.5rem 2rem',
                    borderLeft: `3px solid ${section.color}`,
                    flexDirection: 'row', alignItems: 'center', gap: '1.5rem',
                  }}>
                    <span style={{
                      flexShrink: 0, padding: '0.4rem 1rem',
                      borderRadius: '8px', background: `${section.color}14`,
                      color: section.color, fontWeight: 800, fontSize: '0.85rem',
                      fontFamily: 'monospace', minWidth: '80px', textAlign: 'center',
                    }}>
                      {item.year}
                    </span>
                    <p style={{ fontWeight: 600, fontSize: '1rem', lineHeight: 1.6, color: 'var(--text-main)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {item.title}
                      {(item as any).link && (
                        <div style={{ marginTop: '0.8rem' }}>
                          <a href={(item as any).link === '/press' ? '/press' : (item as any).link.replace('/awards/', '/article/').replace('/press/', '/article/').replace(/\.(jpeg|jpg|png|pdf)$/i, '')} target="_self" rel="noopener noreferrer" style={{ 
                            display: 'inline-flex',
                            alignItems: 'center', background: 'var(--accent)', color: 'white', padding: '0.3rem 0.8rem', borderRadius: '8px', textDecoration: 'none', fontWeight: 700, gap: '0.3rem', boxShadow: '0 2px 8px rgba(37,99,235,0.3)', fontSize: '0.8rem'
                          }}>
                            본문 내용 보기 🔗
                          </a>
                        </div>
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      <Footer />
    </main>
  );
}
