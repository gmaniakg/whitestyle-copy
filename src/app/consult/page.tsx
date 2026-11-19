'use client';

import React, { useState } from 'react';

/* ───── FAQ 데이터 ───── */
const faqs = [
  {
    q: '화이트스타일치과의원의 주요 진료 과목과 의료진 협진 체계는 어떻게 되나요?',
    a: '1994년 개원(33년 전통) 이래 서울대졸·단국대 외래교수·교정학 박사 김준헌 병원장(치아교정·재교정), 연세대 치대 출신 이봉진 대표원장(3D CT 정밀 임플란트·고난도 뼈이식·턱관절 교합), 보건복지부 인증 치주과 전문의 박선혜 원장(최소삭제·무삭제 심미보철·치주 치료) 3인 원장단이 각 분야를 1:1로 책임 협진합니다. 모든 치료 결과와 기간은 개인별 구강 상태에 따라 차이가 있으며, 출혈·부종·일시적 시림 등의 부작용이 발생할 수 있으므로 정밀 진단 후 결정하시기 바랍니다.',
  },
  {
    q: '일본어 상담 및 일본어 전담 통역 지원이 가능한가요?',
    a: '네, 원내에 일본어 전담 통역 스태프(코디네이터) 3명이 상시 상주(日本語通訳スタッフ3名常駐)하고 있습니다. 내원 전 상담부터 CT 촬영, 원장님 진료, 귀국 후 사후관리까지 일본어 통역 직통 전화(+82-10-3046-5010) 및 LINE(ID: whitestyle1)으로 1:1 안내받으실 수 있습니다.',
  },
  {
    q: '치과 치료 통증 관리와 시술 후 사후관리는 어떻게 진행되나요?',
    a: '가글 마취, 잇몸 표면 도포 마취, 체온 유지 디지털 정압 무통 마취기로 구성된 3단계 통증 완화 무통 마취 시스템을 적용하며, 치료 완료 후에도 3·6·12개월 주기 정기검진 리콜을 통해 치주 및 교합 상태를 체계적으로 관리합니다.',
  },
  {
    q: '상담 예약 없이 방문해도 진료를 받을 수 있나요?',
    a: '당일 방문도 가능하나 정밀 진단(3D CT·구강스캔) 대기 시간이 발생할 수 있습니다. 네이버 빠른 예약, 카카오톡 1:1 상담(ID: whitestyle2), 또는 대표전화(1577-7287 / 02-569-7528)로 미리 예약하시면 대기 없이 원활한 상담이 가능합니다.',
  },
];

/* ───── 단순 아코디언 ───── */
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="wb-ka wbka"
      style={{ border: '1px solid #e2e8f0', borderRadius: '16px', overflow: 'hidden', marginBottom: '12px', wordBreak: 'keep-all', overflowWrap: 'break-word' }}
    >
      <button
        type="button"
        onClick={() => setOpen(prev => !prev)}
        className="wb-ka wbka"
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
          lineHeight: '1.5',
          wordBreak: 'keep-all',
          overflowWrap: 'break-word',
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
          className="wb-ka wbka"
          style={{
            padding: '16px 24px 24px',
            background: '#f8fafc',
            borderTop: '1px solid #e2e8f0',
            color: '#475569',
            fontSize: '15px',
            lineHeight: '1.85',
            wordBreak: 'keep-all',
            overflowWrap: 'break-word',
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
    <div
      className="wb-ka wbka"
      style={{ width: '100%', minHeight: '100vh', background: '#fff', fontFamily: 'sans-serif', wordBreak: 'keep-all', overflowWrap: 'break-word' }}
    >

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
          letterSpacing: '0.08em',
          marginBottom: '28px',
        }}>
          강남역 11·12번 출구 도보 1분 · 1994년 개원 33년 전통 · 3인 원장단 책임 협진
        </span>
        <h1 className="wb-ka wbka" style={{ fontSize: 'clamp(2rem, 5.5vw, 3.75rem)', fontWeight: 900, lineHeight: 1.2, marginBottom: '20px', color: '#fff' }}>
          1:1 맞춤 치과 상담 · 빠른 예약 안내<br />
          <span style={{ color: '#93c5fd' }}>
            강남역 화이트스타일치과의원
          </span>
        </h1>
        <p className="wb-ka wbka" style={{ fontSize: '18px', color: '#cbd5e1', maxWidth: '640px', margin: '0 auto', lineHeight: 1.8 }}>
          김준헌 병원장 · 이봉진 대표원장 · 박선혜 원장(치주과 전문의) 3인 원장단 협진과<br />
          3단계 통증 완화 시스템, 일본어 전담 통역 스태프 3명 상주 체계를 안내합니다.
        </p>
      </section>

      {/* CONTACT BUTTONS */}
      <section style={{ padding: '60px 16px', background: '#f8fafc' }}>
        <div style={{ maxWidth: '920px', margin: '0 auto' }}>
          <h2 className="wb-ka wbka" style={{ fontSize: '2rem', fontWeight: 800, textAlign: 'center', marginBottom: '8px', color: '#0f172a' }}>
            지금 바로 상담 및 진료 예약하기
          </h2>
          <p className="wb-ka wbka" style={{ textAlign: 'center', color: '#64748b', marginBottom: '36px', fontSize: '17px' }}>
            원하시는 채널로 1:1 비용·기간 상담과 예약을 진행하실 수 있습니다
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '40px' }}>
            <a href="https://booking.naver.com/booking/13/bizes/265482" target="_blank" rel="noopener noreferrer"
              className="wb-ka wbka"
              style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '20px 22px', borderRadius: '16px', background: '#03C75A', color: '#fff', fontWeight: 800, fontSize: '15px', textDecoration: 'none', boxShadow: '0 8px 24px rgba(3,199,90,0.28)' }}>
              <span style={{ fontSize: '24px' }}>📅</span>
              <div>
                <div style={{ fontSize: '12px', opacity: 0.9 }}>네이버 빠른 예약 (1분 완료)</div>
                <div>온라인 즉시 예약하기</div>
              </div>
            </a>

            <a href="https://pf.kakao.com/_Vtxdwl" target="_blank" rel="noopener noreferrer"
              className="wb-ka wbka"
              style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '20px 22px', borderRadius: '16px', background: '#FEE500', color: '#3c1e1e', fontWeight: 800, fontSize: '15px', textDecoration: 'none', boxShadow: '0 8px 24px rgba(254,229,0,0.35)' }}>
              <span style={{ fontSize: '24px' }}>💬</span>
              <div>
                <div style={{ fontSize: '12px', opacity: 0.78 }}>카카오톡 1:1 비용·기간 상담</div>
                <div>ID: whitestyle2</div>
              </div>
            </a>

            <a href="tel:1577-7287"
              className="wb-ka wbka"
              style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '20px 22px', borderRadius: '16px', background: '#1e3a8a', color: '#fff', fontWeight: 800, fontSize: '15px', textDecoration: 'none', boxShadow: '0 8px 24px rgba(30,58,138,0.28)' }}>
              <span style={{ fontSize: '24px' }}>📞</span>
              <div>
                <div style={{ fontSize: '12px', opacity: 0.85 }}>대표전화 연결</div>
                <div>1577-7287 / 02-569-7528</div>
              </div>
            </a>

            <a href="https://line.me/ti/p/~whitestyle1" target="_blank" rel="noopener noreferrer"
              className="wb-ka wbka"
              style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '20px 22px', borderRadius: '16px', background: '#06C755', color: '#fff', fontWeight: 800, fontSize: '15px', textDecoration: 'none', boxShadow: '0 8px 24px rgba(6,199,85,0.28)' }}>
              <span style={{ fontSize: '24px' }}>🟢</span>
              <div>
                <div style={{ fontSize: '12px', opacity: 0.9 }}>LINE 日本語直通相談</div>
                <div>ID: whitestyle1</div>
              </div>
            </a>

            <a href="tel:+82-10-3046-5010"
              className="wb-ka wbka"
              style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '20px 22px', borderRadius: '16px', background: '#0f172a', color: '#fde68a', fontWeight: 800, fontSize: '15px', textDecoration: 'none', boxShadow: '0 8px 24px rgba(15,23,42,0.25)' }}>
              <span style={{ fontSize: '24px' }}>🇯🇵</span>
              <div>
                <div style={{ fontSize: '12px', color: '#e2e8f0' }}>日本語通訳スタッフ直通電話</div>
                <div>+82-10-3046-5010</div>
              </div>
            </a>
          </div>

          {/* Hours */}
          <div className="wb-ka wbka" style={{ background: '#fff', borderRadius: '20px', padding: '28px', boxShadow: '0 2px 16px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0' }}>
            <h3 style={{ fontWeight: 800, fontSize: '18px', marginBottom: '20px', color: '#0f172a' }}>🕐 진료 시간 및 오시는 길</h3>
            {[
              { day: '월 · 화 · 수 · 금', time: '10:00 – 19:00', note: '(점심시간 13:00–14:00)', bg: '#eff6ff' },
              { day: '토요일', time: '10:00 – 14:00', note: '(점심시간 없이 진료)', bg: '#eff6ff' },
              { day: '목 / 일 / 공휴일', time: '휴진', note: '', bg: '#f8fafc' },
            ].map(h => (
              <div key={h.day} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 18px', borderRadius: '12px', background: h.bg, marginBottom: '8px' }}>
                <span style={{ fontWeight: 700, color: '#1e293b' }}>{h.day}</span>
                <span style={{ fontWeight: 800, color: h.time === '휴진' ? '#94a3b8' : '#1d4ed8' }}>
                  {h.time} <span style={{ fontWeight: 400, fontSize: '13px', color: '#64748b' }}>{h.note}</span>
                </span>
              </div>
            ))}
            <div className="wb-ka wbka" style={{ marginTop: '16px', padding: '14px 18px', borderRadius: '12px', background: '#f8fafc', color: '#334155', fontSize: '14px', lineHeight: 1.7 }}>
              📍 (06134) 서울특별시 강남구 강남대로92길 17 (역삼동 819-10) 대승빌딩 B1·1·2층 · 강남역 11·12번 출구 도보 1분
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '80px 16px', background: '#ffffff' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '52px' }}>
            <span style={{
              display: 'inline-block', padding: '6px 20px', borderRadius: '999px',
              background: '#eff6ff', color: '#1d4ed8', fontSize: '12px', fontWeight: 800,
              letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '20px',
              border: '1px solid #dbeafe',
            }}>
              FAQ
            </span>
            <h2 className="wb-ka wbka" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 900, color: '#0f172a', marginBottom: '12px' }}>
              자주 묻는 질문 (FAQ)
            </h2>
            <p className="wb-ka wbka" style={{ color: '#64748b', fontSize: '17px', lineHeight: 1.7 }}>
              강남역 화이트스타일치과의원의 진료 시스템, 일본어 통역 지원, 예약 및 사후관리 안내를 확인하세요.
            </p>
          </div>

          {faqs.map((item, i) => (
            <FAQItem key={i} q={item.q} a={item.a} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '60px 16px', background: '#f8fafc', textAlign: 'center' }}>
        <p className="wb-ka wbka" style={{ color: '#64748b', marginBottom: '20px', fontSize: '17px' }}>오시는 길과 주차 안내를 미리 확인하세요</p>
        <a href="/about/location"
          className="wb-ka wbka"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '16px 32px', borderRadius: '14px', background: '#0f172a', color: '#fff', fontWeight: 800, fontSize: '17px', textDecoration: 'none' }}>
          📍 강남역 도보 1분 오시는 길 보기
        </a>
      </section>
    </div>
  );
}
