'use client';
import React, { useState, useEffect } from 'react';
import { pressItems, awardCategories, career } from '../data';

export default function SearchModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Focus input could go here
    } else {
      document.body.style.overflow = 'auto';
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const results: { type: string, title: string, desc: string, link: string, color: string }[] = [];
  const q = query.toLowerCase().trim();
  
  if (q.length > 0) {
    // Search Press
    pressItems.forEach(cat => {
      cat.items.forEach(item => {
        if (item.title.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q)) {
          results.push({
            type: '언론보도',
            title: item.title,
            desc: item.desc,
            link: `/article/${item.file.replace('.pdf', '')}`,
            color: cat.color
          });
        }
      });
    });

    // Search Awards
    awardCategories.forEach(cat => {
      cat.items.forEach(item => {
        if (item.title.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q)) {
          results.push({
            type: '수상/인증',
            title: item.title,
            desc: item.desc,
            link: item.file ? `/article/${item.file.split('.')[0]}` : `/awards`,
            color: cat.color
          });
        }
      });
    });
    // Search Career
    career.forEach(cat => {
      cat.items.forEach(item => {
        if (item.title.toLowerCase().includes(q) || item.year.toLowerCase().includes(q)) {
          results.push({
            type: '약력',
            title: item.title,
            desc: `${item.year} - ${cat.era}`,
            link: (item as any).link ? ((item as any).link === '/press' ? '/press' : (item as any).link.replace('/awards/', '/article/').replace('/press/', '/article/').replace(/\.(jpeg|jpg|png|pdf)$/i, '')) : `/career`,
            color: cat.color
          });
        }
      });
    });
  }

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(15,23,42,0.95)', zIndex: 99999,
      display: 'flex', flexDirection: 'column',
      padding: '2rem 1rem'
    }}>
      <div className="container" style={{ position: 'relative', maxWidth: '800px', width: '100%' }}>
        <button 
          onClick={onClose}
          style={{ position: 'absolute', right: 0, top: '-2rem', background: 'none', border: 'none', color: 'white', fontSize: '2rem', cursor: 'pointer' }}
        >
          &times;
        </button>
        
        <input 
          type="text" 
          placeholder="검색어를 입력하세요 (예: 임플란트, 교정, 장관상...)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
          style={{
            width: '100%', padding: '1rem 1.5rem', fontSize: '1.2rem',
            borderRadius: '12px', border: 'none', outline: 'none',
            boxShadow: '0 4px 24px rgba(0,0,0,0.2)'
          }}
        />

        <div style={{ marginTop: '2rem', overflowY: 'auto', maxHeight: 'calc(100vh - 150px)', paddingRight: '1rem' }}>
          {query.trim().length > 0 && results.length === 0 && (
            <p style={{ color: '#94a3b8', textAlign: 'center', marginTop: '2rem' }}>'{query}'에 대한 검색 결과가 없습니다.</p>
          )}
          
          {results.map((r, i) => (
            <a key={i} href={r.link} target="_self" rel="noopener noreferrer" 
               style={{ display: 'block', background: 'rgba(255,255,255,0.1)', padding: '1.25rem', borderRadius: '12px', marginBottom: '1rem', textDecoration: 'none', color: 'white' }}>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 'bold', padding: '0.2rem 0.5rem', borderRadius: '4px', background: r.color }}>{r.type}</span>
              </div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>{r.title}</h3>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{r.desc}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
