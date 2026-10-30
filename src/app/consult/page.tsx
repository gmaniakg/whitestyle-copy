'use client';

import React, { useState } from 'react';

/* ───── FAQ 데이터 ───── */
const faqs = [
  {
    q: '화이트스타일치과의 주요 진료 과목은 무엇인가요?',
    a: '임플란트, 치아교정, 심미치료(라미네이트), 일반 보존치료, 스케일링 등을 진료합니다. 치료 방법과 결과는 개인별 상태에 따라 다르며, 출혈·통증·감염 등의 부작용이 발생할 수 있으므로 상담 후 결정하시기 바랍니다.',
  },
  {
    q: '일본어 상담이 가능한가요?',
    a: '일본어 상담은 LINE을 통해 문의하실 수 있습니다. (TODO: 병원 확인 필요 - 일본어 통역 인력·외국인환자 유치 등록 여부)',
  },
  {
    q: '임플란트 수술 후 관리는 어떻게 되나요?',
    a: '수술 후 경과에 따라 정기 점검을 안내해 드립니다. 구체적인 조건과 일정은 진료 상담 시 확인하시기 바랍니다.',
  },
  {
    q: '상담 예약 없이 방문해도 진료를 받을 수 있나요?',
    a: '당일 방문도 가능하나 대기 시간이 발생할 수 있습니다. 카카오톡 또는 전화로 미리 예약하시면 상담이 원활합니다.',
  },
];

/* ───── 단순 아코디언 (Framer Motion 없음) ───── */
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ border: '1px solid #e2e8f0', borderRadius: '16px', overflow: 'hidden', marginBottom: '12px' }}>
      <button
        type="button"
        onClick={() => setOpen(prev => !prev)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          padding: '20px 24px',
          textAlign: 'left',
          background: '#ffffff',
          border: 'none',
          cursor: 'pointer',
          fontSize: '16px',
          fontWeight: 700,
          color: '#1e293b',
          lineHeight: '1.4',
        }}
      >
        <span>{q}</span>
        <span
          style={{
            flexShrink: 0,
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: '#2563eb',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px',
            fontWeight: 700,
            transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease',
          }}
        >
          +
        </span>
      </button>

      {open && (
        <div
          style={{
            padding: '16px 24px 24px',
            background: '#f8fafc',
            borderTop: '1px solid #e2e8f0',
            color: '#475569',
            fontSize: '15px',
            lineHeight: '1.75',
          }}
        >
          {a}
        </div>
      )}
    </div>
  );
}

/* ───── 메인 페이지 ───── */
export default function ConsultPage() {
  return (
    <div style={{ width: '100%', minHeight: '100vh', background: '#fff', fontFamily: 'sans-serif' }}>

      {/* HERO */}
      <section style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #0f172a 100%)',
        color: '#fff',
        paddingTop: '140px',
        paddingBottom: '80px',
        paddingLeft: '16px',
        paddingRight: '16px',
        textAlign: 'center',
      }}>
        <span style={{
          display: 'inline-block',
          padding: '8px 20px',
          borderRadius: '999px',
          background: 'rgba(255,255,255,0.1)',
          border: '1px solid rgba(255,255,255,0.2)',
          color: 'rgba(255,255,255,0.9)',
          fontSize: '13px',
          fontWeight: 700,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          marginBottom: '28px',
        }}>
          강남역 · 1:1 상담
        </span>
        <h1 style={{ fontSize: 'clamp(2rem, 6vw, 4rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '20px', color: '#fff' }}>
          치과 상담 안내<br />
          <span style={{ background: 'linear-gradient(90deg, #93c5fd, #a5b4fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            화이트스타일치과
          </span>
        </h1>
        <p style={{ fontSize: '18px', color: '#cbd5e1', maxWidth: '560px', margin: '0 auto', lineHeight: 1.7 }}>
          개인별 상태에 맞춘 진료 상담.<br />
          1:1 상담으로 진료 계획을 확인하세요.
        </p>
      </section>

      {/* CONTACT BUTTONS */}
      <section style={{ padding: '60px 16px', background: '#f8fafc' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, textAlign: 'center', marginBottom: '8px', color: '#0f172a' }}>
            지금 바로 상담 예약
          </h2>
          <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '36px', fontSize: '17px' }}>
            원하시는 방법으로 편하게 연락해 주세요
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '40px' }}>
            <a href="https://pf.kakao.com/_xkxkTdM" target="_blank" rel="noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '20px 24px', borderRadius: '16px', background: '#FEE500', color: '#3c1e1e', fontWeight: 800, fontSize: '16px', textDecoration: 'none', boxShadow: '0 8px 24px rgba(254,229,0,0.4)' }}>
              <span style={{ fontSize: '24px' }}>💬</span>
              <div>
                <div style={{ fontSize: '12px', opacity: 0.7 }}>카카오톡 상담</div>
                <div>@화이트스타일치과</div>
              </div>
            </a>

            <a href="tel:02-569-7528"
              style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '20px 24px', borderRadius: '16px', background: '#2563eb', color: '#fff', fontWeight: 800, fontSize: '16px', textDecoration: 'none', boxShadow: '0 8px 24px rgba(37,99,235,0.4)' }}>
              <span style={{ fontSize: '24px' }}>📞</span>
              <div>
                <div style={{ fontSize: '12px', opacity: 0.7 }}>전화 예약</div>
                <div>02-569-7528</div>
              </div>
            </a>

            <a href="https://line.me/ti/p/~whitestyle1" target="_blank" rel="noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '20px 24px', borderRadius: '16px', background: '#06C755', color: '#fff', fontWeight: 800, fontSize: '16px', textDecoration: 'none', boxShadow: '0 8px 24px rgba(6,199,85,0.4)' }}>
              <span style={{ fontSize: '24px' }}>🟢</span>
              <div>
                <div style={{ fontSize: '12px', opacity: 0.7 }}>LINE 상담 (일본어)</div>
                <div>@whitestyle1</div>
              </div>
            </a>
          </div>

          {/* Hours */}
          <div style={{ background: '#fff', borderRadius: '20px', padding: '28px', boxShadow: '0 2px 16px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0' }}>
            <h3 style={{ fontWeight: 800, fontSize: '18px', marginBottom: '20px', color: '#0f172a' }}>🕐 진료 시간</h3>
            {[
              { day: '월 – 금', time: '10:00 – 19:00', note: '(점심 13:00–14:00)', bg: '#eff6ff' },
              { day: '토요일', time: '10:00 – 14:00', note: '(점심 없음)', bg: '#eff6ff' },
              { day: '일 / 공휴일', time: '휴진', note: '', bg: '#f8fafc' },
            ].map(h => (
              <div key={h.day} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 18px', borderRadius: '12px', background: h.bg, marginBottom: '8px' }}>
                <span style={{ fontWeight: 700, color: '#1e293b' }}>{h.day}</span>
                <span style={{ fontWeight: 800, color: h.time === '휴진' ? '#94a3b8' : '#1d4ed8' }}>
                  {h.time} <span style={{ fontWeight: 400, fontSize: '13px', color: '#94a3b8' }}>{h.note}</span>
                </span>
              </div>
            ))}
            <div style={{ marginTop: '16px', padding: '14px 18px', borderRadius: '12px', background: '#f8fafc', color: '#64748b', fontSize: '14px' }}>
              📍 서울 강남구 강남대로92길 17 대승빌딩 1,2층 · 강남역 11·12번 출구 도보 2분
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '80px 16px', background: '#ffffff' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '52px' }}>
            <span style={{
              display: 'inline-block', padding: '6px 20px', borderRadius: '999px',
              background: '#eff6ff', color: '#1d4ed8', fontSize: '12px', fontWeight: 800,
              letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '20px',
              border: '1px solid #dbeafe',
            }}>
              FAQ
            </span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 900, color: '#0f172a', marginBottom: '12px' }}>
              자주 묻는 질문 (FAQ)
            </h2>
            <p style={{ color: '#64748b', fontSize: '17px', lineHeight: 1.6 }}>
              진료 및 예약에 대해<br />
              자주 묻는 질문을 정리했습니다. (TODO: 병원 확인 필요 - 주소·전화번호·카카오 채널 정보)
            </p>
          </div>

          {faqs.map((item, i) => (
            <FAQItem key={i} q={item.q} a={item.a} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '60px 16px', background: '#f8fafc', textAlign: 'center' }}>
        <p style={{ color: '#64748b', marginBottom: '20px', fontSize: '17px' }}>오시는 길을 미리 확인하세요</p>
        <a href="/about/location"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '16px 32px', borderRadius: '14px', background: '#0f172a', color: '#fff', fontWeight: 800, fontSize: '17px', textDecoration: 'none' }}>
          📍 오시는 길 보기
        </a>
      </section>
    </div>
  );
}
