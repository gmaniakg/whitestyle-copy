'use client';
import React, { useState, useEffect } from 'react';

type Lang = 'ko' | 'ja' | 'en';

const labels: Record<Lang, { nav: string[]; cta: string }> = {
  ko: {
    nav: ['소개', '수상경력', '학술연구', '경력', '언론보도', '검색', '공식백서'],
    cta: '📞 상담예약',
  },
  ja: {
    nav: ['プロフィール', '受賞歴', '学術研究', 'キャリア', 'メディア', '検索', '公式白書'],
    cta: '📞 ご予約',
  },
  en: {
    nav: ['About', 'Awards', 'Research', 'Career', 'Press', 'Search', 'WhiteBook'],
    cta: '📞 Consult',
  },
};

const navHrefs = ['/#home', '/awards', '/#research', '/career', '/press', '#search', '/whitebook'];

const withLang = (lang: Lang, href: string) => {
  if (!href.startsWith('/#')) return href;
  const hash = href.slice(1);
  if (lang === 'ko') return `/whitebook${hash}`;
  if (lang === 'ja') return `/whitebook/ja${hash}`;
  return `/en${hash}`;
};

export default function Navbar({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => {
      window.removeEventListener('scroll', handler);
    };
  }, []);

  const openGlobalSearch = () => {
    window.dispatchEvent(new CustomEvent('open-search'));
  };

  const l = labels[lang];

  return (
    <>
      <nav className="navbar" style={{ boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.08)' : 'none' }}>
        <div className="navbar-inner">
          {/* Logo */}
          <a href={withLang(lang, '/#home')} className="navbar-logo" onClick={() => setOpen(false)}>
            {lang === 'ja' ? 'WhiteBook · 金俊憲院長' : lang === 'en' ? 'WhiteBook · Dr. Kim' : 'WhiteBook · 김준헌'}
          </a>

          {/* Desktop links */}
          <ul className="navbar-links">
            {l.nav.map((item, i) => (
              <li key={i}>
                {navHrefs[i] === '#search' ? (
                  <a href="#" onClick={(e) => { e.preventDefault(); openGlobalSearch(); }}>{item}</a>
                ) : (
                  <a href={withLang(lang, navHrefs[i])}>{item}</a>
                )}
              </li>
            ))}
            {lang === 'ja' && (
              <li>
                <a href="/ja#konest-archive" style={{ color: '#B4882B', fontWeight: 800 }}>🏆 コネスト口コミ125件</a>
              </li>
            )}
            <li>
              <a href={withLang(lang, '/#contact')} className="navbar-cta">{l.cta}</a>
            </li>
          </ul>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div className="lang-switcher">
              {(['ko', 'ja', 'en'] as Lang[]).map(code => {
                const flagUrl = code === 'ko' 
                  ? 'https://flagcdn.com/w40/kr.png' 
                  : code === 'ja' 
                    ? 'https://flagcdn.com/w40/jp.png' 
                    : 'https://flagcdn.com/w40/us.png';
                const altText = code === 'ko' ? 'Korean' : code === 'ja' ? 'Japanese' : 'English';
                return (
                  <button
                    key={code}
                    className={`lang-btn${lang === code ? ' active' : ''}`}
                    onClick={() => setLang(code)}
                    style={{ 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      padding: '4px 6px',
                      height: '28px',
                      width: '36px'
                    }}
                  >
                    <img 
                      src={flagUrl} 
                      alt={altText} 
                      style={{ 
                        width: '20px', 
                        height: '14px', 
                        borderRadius: '1.5px', 
                        objectFit: 'cover',
                        display: 'block'
                      }} 
                    />
                  </button>
                );
              })}
            </div>

            {/* Hamburger */}
            <button className="hamburger" onClick={() => setOpen(o => !o)} aria-label="메뉴">
              <span style={{ transform: open ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
              <span style={{ opacity: open ? 0 : 1 }} />
              <span style={{ transform: open ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`mobile-menu${open ? ' open' : ''}`}>
        {l.nav.map((item, i) => (
          navHrefs[i] === '#search' ? (
            <a key={i} href="#" onClick={(e) => { e.preventDefault(); setOpen(false); openGlobalSearch(); }}>{item}</a>
          ) : (
            <a key={i} href={withLang(lang, navHrefs[i])} onClick={() => setOpen(false)}>{item}</a>
          )
        ))}
        <a
          href={withLang(lang, '/#contact')}
          onClick={() => setOpen(false)}
          style={{ background: 'linear-gradient(135deg,#2563eb,#7c3aed)', color: 'white', borderRadius: 12, padding: '0.9rem', textAlign: 'center', fontWeight: 700, border: 'none' }}
        >
          {l.cta}
        </a>
      </div>
    </>
  );
}
