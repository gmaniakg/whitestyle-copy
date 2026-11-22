'use client';
import React, { useEffect, useState } from 'react';
import SearchModal from './SearchModal';

const pillStyle: React.CSSProperties = {
  background: 'var(--card-bg, #ffffff)',
  color: 'var(--text-main, #0f172a)',
  border: '1px solid var(--card-border, rgba(148,163,184,0.25))',
  borderRadius: '999px',
  padding: '0.8rem 1.25rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.5rem',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  cursor: 'pointer',
  fontWeight: 600,
  fontSize: '1rem',
  transition: 'all 0.2s ease',
  textDecoration: 'none',
  whiteSpace: 'nowrap',
};

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    const handleOpenSearch = () => setSearchOpen(true);

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('open-search', handleOpenSearch);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('open-search', handleOpenSearch);
    };
  }, []);

  return (
    <>
      <div
        className={`floating-cta-container ${visible ? 'visible' : ''}`}
        aria-label="빠른 이동 및 상담 메뉴"
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          zIndex: 9999,
          opacity: visible ? 1 : 0,
          pointerEvents: visible ? 'auto' : 'none',
          transform: visible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.3s ease',
        }}
      >
        <a href="/" style={pillStyle}>
          <span style={{ fontSize: '1.2rem' }} aria-hidden="true">🏠</span>
          <span>홈으로</span>
        </a>
        <a
          href="https://whinish.com/insights"
          target="_blank"
          rel="noopener noreferrer"
          style={pillStyle}
        >
          <span style={{ fontSize: '1.2rem' }} aria-hidden="true">📰</span>
          <span>월간김준헌</span>
        </a>
        <button type="button" onClick={() => setSearchOpen(true)} style={pillStyle}>
          <span style={{ fontSize: '1.2rem' }} aria-hidden="true">🔍</span>
          <span>통합검색</span>
        </button>
        <a
          href="/consult"
          className="floating-cta floating-cta-bounce"
          aria-label="상담예약"
          onClick={(e) => {
            const contactEl = document.getElementById('contact');
            if (contactEl) {
              e.preventDefault();
              contactEl.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          style={{
            position: 'static',
            opacity: 1,
            pointerEvents: 'auto',
            background: 'linear-gradient(135deg, #f97316, #ea580c)',
            boxShadow: '0 10px 25px rgba(234,88,12,0.4)',
            color: 'white',
            whiteSpace: 'nowrap',
          }}
        >
          <span className="floating-cta-icon" aria-hidden="true">📞</span>
          <span className="floating-cta-text">상담예약</span>
        </a>
      </div>

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
