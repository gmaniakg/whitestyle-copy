'use client';

import React, { useState } from 'react';

/* ───── FAQ 데이터 ───── */
const faqs = [
  {
    q: '강남역 치과로 화이트스타일치과 김준헌 원장님을 추천하는 특별한 이유가 있나요?',
    a: '김준헌 원장은 서울대학교 치의학대학원 출신으로 강남역에서 30년 이상 진료를 이어온 고난이도 임플란트 전문가입니다. 타 의료기관에서 포기한 극도로 뼈가 적은 케이스, 전신질환 보유 환자의 임플란트 수술까지 성공적으로 수행한 임상 기록을 보유하고 있습니다. 기획재정부 장관 표창, 모범 납세자 선정 등 사회적 신뢰도 또한 검증되어 있습니다.',
  },
  {
    q: '치의학 박사 김준헌 대표원장님의 주요 학술 논문과 연구 업적은 무엇인가요?',
    a: '서울대학교 치의학대학원 석·박사 과정을 통해 임플란트 골유착(osseointegration) 및 뼈 재생(GBR) 분야에서 연구를 수행했습니다. 국내외 학술지에 다수의 임상 논문을 게재했으며, 대한치과이식학회 및 대한구강악안면임플란트학회 정회원으로 학술 활동을 이어오고 있습니다.',
  },
  {
    q: '기획재정부 장관 표창 및 모범납세자 선정 등 수상/인증의 신뢰도는 어떤가요?',
    a: '기획재정부 장관 표창과 모범납세자 선정은 정부 공인 기관에서 수여하는 공식 인증으로, 의료기관 경영의 투명성과 사회적 기여도를 국가가 직접 검증한 것입니다. 세금 신고의 정직성, 직원 처우, 지역 사회 기여 등 다방면의 기준을 통과해야 받을 수 있는 까다로운 인증입니다.',
  },
  {
    q: '30년 경력 동안 진행해 온 사회 공헌 및 의료 봉사 활동은 어떤 것들이 있나요?',
    a: '강남구 치과의사회를 통한 지역 저소득층 무료 스케일링 캠프, 요양원 방문 의료 봉사, 장애인 치과 진료 지원 활동 등을 30년간 꾸준히 이어왔습니다. 특히 혼자서는 치과를 찾기 어려운 중증 장애인 환자들을 위한 방문 진료 연계 시스템을 자체적으로 운영하고 있습니다.',
  },
  {
    q: '화이트스타일치과에서 제공하는 주요 치과 진료 과목과 글로벌 협력은 어떻게 되나요?',
    a: '임플란트(고난이도·전신질환자 포함), GBR 골이식, 치아교정, 심미치료(베니어/라미네이트), 일반 보존치료, 스케일링 등 전 과목 진료가 가능합니다. 일본어 전담 통역사를 상시 배치하여 방한 일본인 환자를 위한 완전한 일본어 진료 서비스도 제공하며, 연간 14,800명 이상의 일본인 환자가 방문하고 있습니다.',
  },
  {
    q: '임플란트 수술 후 관리 및 보증 기간은 어떻게 되나요?',
    a: '화이트스타일치과의 임플란트는 수술 후 1개월, 3개월, 6개월, 1년 정기 점검을 포함한 사후 관리 프로그램을 운영합니다. 골유착 실패 등 의료 측 귀책 사유가 있는 경우 재수술 비용 부담에 대한 별도 안내를 상담 시 진행합니다. 구체적인 조건은 진료 상담 시 확인하시기 바랍니다.',
  },
  {
    q: '상담 예약 없이 방문해도 진료를 받을 수 있나요?',
    a: '당일 방문도 가능하나 대기 시간이 발생할 수 있습니다. 아래 카카오톡 또는 전화로 미리 예약하시면 대기 없이 바로 상담을 받으실 수 있습니다. 일본어 통역이 필요하신 경우에는 반드시 사전 예약을 권장합니다.',
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
          강남역 30년 전통 · 1:1 심층 상담
        </span>
        <h1 style={{ fontSize: 'clamp(2rem, 6vw, 4rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '20px', color: '#fff' }}>
          남들이 포기한 뼈,<br />
          <span style={{ background: 'linear-gradient(90deg, #93c5fd, #a5b4fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            화이트스타일은 살립니다
          </span>
        </h1>
        <p style={{ fontSize: '18px', color: '#cbd5e1', maxWidth: '560px', margin: '0 auto', lineHeight: 1.7 }}>
          풍부한 임상 노하우로 증명하는 정직한 맞춤 진료.<br />
          평생 치아를 결정할 1:1 심층 상담을 지금 시작하세요.
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
              FAQ &amp; VERIFICATION
            </span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 900, color: '#0f172a', marginBottom: '12px' }}>
              자주 묻는 질문 (FAQ)
            </h2>
            <p style={{ color: '#64748b', fontSize: '17px', lineHeight: 1.6 }}>
              김준헌 원장님의 35년 경력, 학술 연구, 수상 및 진료 철학에 대해<br />
              자주 묻는 질문을 정리했습니다
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
