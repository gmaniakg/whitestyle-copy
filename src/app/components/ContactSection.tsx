'use client';
export default function ContactSection({ lang }: { lang: 'ko'|'ja'|'en' }) {
  const t = {
    ko: {
      eyebrow: '지금 바로 연결하세요',
      title: '33년 경험의 전문가가 직접 답합니다',
      sub: '전화 한 통, 카카오 메시지 하나로 당신의 치아 고민이 해결됩니다',
      cards: [
        { icon:'📞', color:'#059669', bg:'rgba(5,150,105,0.1)', title:'전화 예약', desc:'상담원과 직접 통화 — 가장 빠른 일정 조율', btn:'1577-7287 / 02-569-7528 전화하기', href:'tel:1577-7287' },
        { icon:'💬', color:'#f59e0b', bg:'rgba(245,158,11,0.1)', title:'카카오 상담', desc:'카카오톡 1:1 채팅으로 편하게 문의하세요', btn:'카톡으로 상담하기', href:'https://pf.kakao.com/_Vtxdwl' },
        { icon:'📅', color:'#2563eb', bg:'rgba(37,99,235,0.1)', title:'네이버 예약', desc:'실시간 예약 현황 확인 후 즉시 예약 가능', btn:'네이버로 예약하기', href:'https://booking.naver.com/booking/13/bizes/265482' },
      ],
    },
    ja: {
      eyebrow: '今すぐご相談ください',
      title: '33年の経験を持つ専門家が直接お答えします',
      sub: '日本語スタッフが常駐。お電話・LINE・ナイバー予約で簡単にご予約いただけます',
      cards: [
        { icon:'📞', color:'#059669', bg:'rgba(5,150,105,0.1)', title:'お電話予約', desc:'スタッフと直接お話しいただけます', btn:'02-569-7528 電話する', href:'tel:02-569-7528' },
        { icon:'💬', color:'#f59e0b', bg:'rgba(245,158,11,0.1)', title:'カカオ相談', desc:'KakaoTalkで気軽にご相談ください', btn:'カカオで相談する', href:'https://pf.kakao.com/_Vtxdwl' },
        { icon:'📅', color:'#2563eb', bg:'rgba(37,99,235,0.1)', title:'ナイバー予約', desc:'リアルタイムで予約状況を確認できます', btn:'ナイバーで予約する', href:'https://booking.naver.com/booking/13/bizes/265482' },
      ],
    },
    en: {
      eyebrow: 'Get in Touch',
      title: '33 Years of Expertise — At Your Service',
      sub: 'Reach us by phone, KakaoTalk, or Naver booking. We respond promptly.',
      cards: [
        { icon:'📞', color:'#059669', bg:'rgba(5,150,105,0.1)', title:'Call Us', desc:'Speak directly with our staff for fastest scheduling', btn:'Call 02-569-7528', href:'tel:02-569-7528' },
        { icon:'💬', color:'#f59e0b', bg:'rgba(245,158,11,0.1)', title:'KakaoTalk', desc:'Chat 1:1 for quick questions and bookings', btn:'Chat on KakaoTalk', href:'https://pf.kakao.com/_Vtxdwl' },
        { icon:'📅', color:'#2563eb', bg:'rgba(37,99,235,0.1)', title:'Naver Book', desc:'Check real-time availability and book instantly', btn:'Book on Naver', href:'https://booking.naver.com/booking/13/bizes/265482' },
      ],
    },
  }[lang];

  return (
    <section className="contact-section" id="contact">
      <div className="container">
        <div className="section-eyebrow">{t.eyebrow}</div>
        <h2 className="section-title animate-up">{t.title}</h2>
        <p className="section-hook animate-up delay-1">{t.sub}</p>
        <div className="contact-grid">
          {t.cards.map((c,i) => (
            <div key={i} className="contact-card animate-up" style={{ animationDelay: `${i*0.15}s` }}>
              <div className="contact-icon" style={{ background: c.bg }}>
                <span>{c.icon}</span>
              </div>
              <div className="contact-title">{c.title}</div>
              <div className="contact-desc">{c.desc}</div>
              <a href={c.href} target="_blank" rel="noopener noreferrer"
                className="contact-btn"
                style={{ background: `linear-gradient(135deg, ${c.color}, ${c.color}cc)`, color:'white' }}>
                {c.btn}
              </a>
            </div>
          ))}
        </div>
        <div style={{ textAlign:'center', color:'var(--text-muted)', fontSize:'0.85rem', marginTop:'2rem', lineHeight: '1.8' }}>
          <span style={{ display: 'inline-block', marginRight: '0.5rem' }}>📍 서울특별시 강남구 강남대로92길 17 (역삼동 819-10) 대승빌딩 B1·1·2층 (강남역 11번·12번 출구 도보 1분) · 대표상담 1577-7287 / 02-569-7528</span>
          <span style={{ display: 'inline-block' }}>🕐 월·화·수·금 10:00–19:00 / 토 10:00–14:00 (점심시간 없음 / 초진 접수 13:30까지 / 목·일·공휴일 휴진)</span>
        </div>
      </div>
    </section>
  );
}
