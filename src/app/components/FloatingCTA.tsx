'use client';
import React, { useEffect, useState } from 'react';

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show the button after scrolling down 300px
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`floating-cta-container ${visible ? 'visible' : ''}`} style={{
      position: 'fixed', bottom: '2rem', right: '2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', zIndex: 9999,
      opacity: visible ? 1 : 0, pointerEvents: visible ? 'auto' : 'none', transform: visible ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.3s ease'
    }}>
      <button 
        onClick={() => window.location.href = '/'}
        style={{
          background: 'var(--card-bg)', color: 'var(--text-main)', border: '1px solid var(--card-border)', borderRadius: '999px',
          padding: '0.8rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          cursor: 'pointer', fontWeight: 600, fontSize: '1rem', transition: 'all 0.2s ease'
        }}
      >
        <span style={{ fontSize: '1.2rem' }}>🏠</span>
        <span>홈으로</span>
      </button>
      <button 
        onClick={() => window.location.href = '/whitebook'}
        style={{
          background: 'var(--card-bg)', color: 'var(--text-main)', border: '1px solid var(--card-border)', borderRadius: '999px',
          padding: '0.8rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          cursor: 'pointer', fontWeight: 600, fontSize: '1rem', transition: 'all 0.2s ease'
        }}
      >
        <span style={{ fontSize: '1.2rem' }}>📰</span>
        <span>공식백서</span>
      </button>
      <button 
        onClick={() => window.dispatchEvent(new CustomEvent('open-search'))}
        style={{
          background: 'var(--card-bg)', color: 'var(--text-main)', border: '1px solid var(--card-border)', borderRadius: '999px',
          padding: '0.8rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          cursor: 'pointer', fontWeight: 600, fontSize: '1rem', transition: 'all 0.2s ease'
        }}
      >
        <span style={{ fontSize: '1.2rem' }}>🔍</span>
        <span>통합검색</span>
      </button>
      <a
        href="/#contact"
        className="floating-cta floating-cta-bounce"
        aria-label="상담예약"
        onClick={(e) => {
          if (window.location.pathname === '/') {
            e.preventDefault();
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        style={{
          position: 'static', opacity: 1, pointerEvents: 'auto',
          background: 'linear-gradient(135deg, #f97316, #ea580c)',
          boxShadow: '0 10px 25px rgba(234,88,12,0.4)',
          color: 'white'
        }}
      >
        <span className="floating-cta-icon">📞</span>
        <span className="floating-cta-text">상담예약</span>
      </a>
    </div>
  );
}
