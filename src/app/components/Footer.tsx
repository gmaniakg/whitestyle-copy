'use client';
import React from 'react';

const SocialIcon = ({ href, children, color, index = 0 }: { href: string, children: React.ReactNode, color: string, index?: number }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer" 
    className="share-icon-bounce"
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      background: 'var(--card-bg)',
      color: 'var(--text-main)',
      textDecoration: 'none',
      border: '1px solid var(--card-border)',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
      cursor: 'pointer',
      animationDelay: `${index * 0.15}s`
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.transform = 'translateY(-3px)';
      e.currentTarget.style.color = color;
      e.currentTarget.style.borderColor = color;
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.color = 'var(--text-main)';
      e.currentTarget.style.borderColor = 'var(--card-border)';
    }}
  >
    {children}
  </a>
);

export default function Footer() {
  return (
    <footer style={{ 
      padding: '4rem 0', 
      textAlign: 'center', 
      borderTop: '1px solid var(--card-border)', 
      color: 'var(--text-muted)', 
      marginTop: 'auto',
      background: 'var(--bg-color)'
    }}>
      <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          {/* Kakao Channel */}
          <SocialIcon index={0} href="https://pf.kakao.com/_Vtxdwl" color="#FEE500">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3c-5.52 0-10 3.58-10 8 0 2.87 1.83 5.4 4.59 6.85l-1.18 4.31c-.13.48.37.83.78.61l5.12-3.41c.54.08 1.1.13 1.69.13 5.52 0 10-3.58 10-8s-4.48-8-10-8z"/>
            </svg>
          </SocialIcon>
          {/* Naver Blog */}
          <SocialIcon index={1} href="https://blog.naver.com/whitestyle3" color="#03C75A">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16.273 12.845L7.376 0H0v24h7.727V11.155L16.624 24H24V0h-7.727v12.845z"/>
            </svg>
          </SocialIcon>
          {/* Instagram */}
          <SocialIcon index={2} href="https://www.instagram.com/whitestyledentalclinic" color="#E1306C">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
            </svg>
          </SocialIcon>
          {/* YouTube */}
          <SocialIcon index={3} href="https://www.youtube.com/@whitestyle" color="#FF0000">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21.58 6.42a2.71 2.71 0 00-1.9-1.92C17.97 4 12 4 12 4s-5.97 0-7.68.5A2.71 2.71 0 002.42 6.42C2 8.12 2 12 2 12s0 3.88.42 5.58a2.71 2.71 0 001.9 1.92c1.71.5 7.68.5 7.68.5s5.97 0 7.68-.5a2.71 2.71 0 001.9-1.92c.42-1.7.42-5.58.42-5.58s0-3.88-.42-5.58zM9.5 15.5v-7l6.5 3.5-6.5 3.5z"/>
            </svg>
          </SocialIcon>
        </div>
        
        <div>
          <p style={{ margin: 0, fontWeight: 500, fontSize: '0.9rem' }}>© {new Date().getFullYear()} WhiteBook - Dr. Jun-Heon Kim</p>
          <a href="/" style={{ display: 'inline-block', marginTop: '0.5rem', color: 'var(--accent)', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 700 }}>
            ← 메인으로 돌아가기
          </a>
        </div>
      </div>
    </footer>
  );
}
