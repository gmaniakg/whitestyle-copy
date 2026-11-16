'use client';
import React, { useState, useEffect } from 'react';

const bounceStyles = `
  @keyframes floatBounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-6px); }
  }
  .share-icon-bounce {
    animation: floatBounce 2.5s ease-in-out infinite;
  }
`;

const ShareIcon = ({ name, color, svg, onClick, index = 0 }: { name: string, color: string, svg: React.ReactNode, onClick: () => void, index?: number }) => (
  <button 
    onClick={onClick}
    title={`${name} 공유`}
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '0.6rem',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: 0
    }}
  >
    <div className="share-icon-bounce" style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      width: '56px', height: '56px', borderRadius: '50%',
      background: color, color: '#fff',
      boxShadow: `0 4px 12px ${color}40`,
      animationDelay: `${index * 0.15}s`
    }}>
      {svg}
    </div>
    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>{name}</span>
  </button>
);

export default function ShareButtons({ title }: { title: string }) {
  const [url, setUrl] = useState('');

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    alert('링크가 복사되었습니다!');
  };

  const shareKakao = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: '화이트스타일치과 김준헌 원장 백서: ' + title,
          url: url,
        });
      } catch (error) {
        console.error('공유 실패:', error);
      }
    } else {
      navigator.clipboard.writeText(url);
      alert('카카오톡 공유를 위해 링크가 복사되었습니다!\n카카오톡 채팅창에 붙여넣기 하여 공유해보세요.');
    }
  };

  const shareNaver = () => {
    window.open(`https://share.naver.com/web/shareView?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`, '_blank', 'width=600,height=400');
  };

  const shareGoogle = () => {
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&su=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`, '_blank', 'width=600,height=600');
  };

  const shareFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank', 'width=600,height=400');
  };

  const shareX = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank', 'width=600,height=400');
  };

  return (
    <div style={{ marginTop: '4rem', padding: '3rem 0', borderTop: '1px solid var(--card-border)', borderBottom: '1px solid var(--card-border)', textAlign: 'center' }}>
      <style>{bounceStyles}</style>
      <p style={{ fontWeight: 800, fontSize: '1.25rem', marginBottom: '2rem', color: 'var(--text-main)' }}>이 문서 공유하기</p>
      
      <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        
        {/* Kakao */}
        <ShareIcon index={0} name="카카오/기기공유" color="#FEE500" onClick={shareKakao} svg={
          <svg width="28" height="28" viewBox="0 0 24 24" fill="#3C1E1E">
            <path d="M12 3c-5.52 0-10 3.58-10 8 0 2.87 1.83 5.4 4.59 6.85l-1.18 4.31c-.13.48.37.83.78.61l5.12-3.41c.54.08 1.1.13 1.69.13 5.52 0 10-3.58 10-8s-4.48-8-10-8z"/>
          </svg>
        } />

        {/* Naver */}
        <ShareIcon index={1} name="네이버" color="#03C75A" onClick={shareNaver} svg={
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff">
            <path d="M16.5 4H7.5C5.57 4 4 5.57 4 7.5v9C4 18.43 5.57 20 7.5 20h9c1.93 0 3.5-1.57 3.5-3.5v-9C20 5.57 18.43 4 16.5 4zm-1.5 12h-2v-4h-2v4H9V8h2v4h2V8h2v8z"/>
          </svg>
        } />

        {/* Google (Gmail) */}
        <ShareIcon index={2} name="구글" color="#EA4335" onClick={shareGoogle} svg={
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
          </svg>
        } />

        {/* Facebook */}
        <ShareIcon index={3} name="페이스북" color="#1877F2" onClick={shareFacebook} svg={
          <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        } />

        {/* X (Twitter) */}
        <ShareIcon index={4} name="트위터" color="#000000" onClick={shareX} svg={
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        } />

        {/* Link Copy */}
        <ShareIcon index={5} name="링크 복사" color="#64748b" onClick={handleCopyLink} svg={
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
          </svg>
        } />

      </div>
    </div>
  );
}
