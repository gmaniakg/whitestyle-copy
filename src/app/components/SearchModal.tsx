'use client';
import React, { useState, useEffect } from 'react';
import { pressItems, awardCategories, career } from '../data';
import { EVIDENCE_QA_LIST } from '@/data/evidenceQa';

const CORE_CLINIC_PAGES = [
  {
    type: '진료 안내',
    title: '3D CT 정밀 임플란트 (뼈이식·당일·재수술·건보)',
    desc: '김준헌 병원장 · 이봉진 대표원장 · 박선혜 원장(치주과 전문의) 3인 원장단 협진, 3단계 무통 마취 시스템',
    keywords: '임플란트 뼈이식 재수술 당일 무치악 전체 건강보험 마취 통증',
    link: '/treatments/implant',
    color: '#0f294a',
  },
  {
    type: '진료 안내',
    title: '1:1 책임 치아교정 (인비절라인·설측·재교정)',
    desc: '서울대졸·단국대 외래교수·교정학 박사 김준헌 병원장이 진단부터 유지관리까지 주치의 변경 없이 직접 진료',
    keywords: '치아교정 인비절라인 투명교정 설측교정 재교정 옥니 부분교정 돌출입',
    link: '/treatments/orthodontics',
    color: '#2563eb',
  },
  {
    type: '진료 안내',
    title: '무삭제·최소삭제 라미네이트 (제로쉘 · 휘니쉬)',
    desc: '자연치아 법랑질 보존을 최우선 원칙으로 0.1~0.2mm 최소삭제 및 무삭제 제로쉘 맞춤형 세라믹 디자인',
    keywords: '라미네이트 제로쉘 휘니쉬 무삭제 최소삭제 심미보철 앞니 변색 미백',
    link: '/treatments/aesthetic/zeroshell',
    color: '#0891b2',
  },
  {
    type: '진료비 안내',
    title: '심평원(HIRA) 기준 비급여 진료비 안내',
    desc: '임플란트, 치아교정 총액제, 라미네이트, 제증명수수료 등 투명한 공식 비급여 수가 디렉토리',
    keywords: '가격 비용 수가 비급여 가격표 임플란트비용 교정비용 라미네이트비용',
    link: '/price',
    color: '#059669',
  },
  {
    type: '임상칼럼',
    title: '원장단 직접 검수 임상칼럼 · 공지사항',
    desc: '임플란트, 교정, 라미네이트, 치주 관리 등 환자분들이 가장 자주 묻는 치의학 임상 칼럼 전체 아카이브',
    keywords: '칼럼 공지사항 블로그 후기 치과상식 임상칼럼',
    link: '/board/notice',
    color: '#7c3aed',
  },
  {
    type: '공식 팩트',
    title: '화이트스타일치과의원 병원 공식 팩트 (33년 전통)',
    desc: '1994년 개원, 강남역 11·12번 출구 도보 1분, 진료시간, 3인 원장단, 일본어 통역 스태프 3명 상주 안내',
    keywords: '위치 주소 오시는길 진료시간 전화번호 1577-7287 주차 일본어 통역',
    link: '/clinic-facts',
    color: '#334155',
  },
  {
    type: '영상 진료실',
    title: 'MBC 뉴스데스크 · 치의학 영상 진료실',
    desc: '김준헌 병원장 방송 인터뷰 및 진료 핵심 해설 영상 아카이브',
    keywords: '영상 유튜브 방송 MBC 인터뷰 동영상',
    link: '/video',
    color: '#dc2626',
  },
  {
    type: '용어 사전',
    title: '치과 핵심 용어 사전 50선',
    desc: '골유착, GBR, 상악동거상술, 법랑질, 치주낭 등 꼭 알아두면 좋은 치의학 용어 해설',
    keywords: '용어 사전 GBR 상악동 법랑질 지대주 크라운',
    link: '/glossary',
    color: '#475569',
  },
  {
    type: '상담예약',
    title: '온라인 1:1 비용·기간 상담 및 예약',
    desc: '네이버 빠른 예약, 카카오톡 상담, 대표전화 1577-7287 / 02-569-7528, 일본어 직통 +82-10-3046-5010',
    keywords: '상담 예약 문의 전화 카톡 라인',
    link: '/consult',
    color: '#ea580c',
  },
  {
    type: '日本語案内',
    title: 'ホワイトスタイル歯科 日本語公式案内 (日本語通訳3名常駐)',
    desc: 'ソウル江南駅徒歩1分・創業33年・日本語通訳スタッフ直通 +82-10-3046-5010 / LINE: whitestyle1',
    keywords: '일본어 日本語 韓国 歯科 ホワイトスタイル 江南',
    link: '/ja',
    color: '#b91c1c',
  },
];

export default function SearchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = 'auto';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = 'auto';
      setQuery('');
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const results: { type: string; title: string; desc: string; link: string; color: string }[] = [];
  const q = query.toLowerCase().trim();

  if (q.length > 0) {
    // Search Core Clinic Pages
    CORE_CLINIC_PAGES.forEach((page) => {
      if (
        page.title.toLowerCase().includes(q) ||
        page.desc.toLowerCase().includes(q) ||
        page.keywords.toLowerCase().includes(q)
      ) {
        results.push({
          type: page.type,
          title: page.title,
          desc: page.desc,
          link: page.link,
          color: page.color,
        });
      }
    });

    // Search Evidence Q&A
    EVIDENCE_QA_LIST.forEach((qa) => {
      if (
        qa.question.toLowerCase().includes(q) ||
        qa.shortAnswer.toLowerCase().includes(q) ||
        qa.category.toLowerCase().includes(q)
      ) {
        results.push({
          type: '임상 Q&A',
          title: qa.question,
          desc: qa.shortAnswer,
          link: `/qa/${qa.slug}`,
          color: '#0284c7',
        });
      }
    });

    // Search Press
    pressItems.forEach((cat) => {
      cat.items.forEach((item) => {
        if (item.title.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q)) {
          results.push({
            type: '언론보도',
            title: item.title,
            desc: item.desc,
            link: `/article/${item.file.replace('.pdf', '')}`,
            color: cat.color,
          });
        }
      });
    });

    // Search Awards
    awardCategories.forEach((cat) => {
      cat.items.forEach((item) => {
        if (item.title.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q)) {
          results.push({
            type: '수상/인증',
            title: item.title,
            desc: item.desc,
            link: item.file ? `/article/${item.file.split('.')[0]}` : `/awards`,
            color: cat.color,
          });
        }
      });
    });

    // Search Career
    career.forEach((cat) => {
      cat.items.forEach((item) => {
        if (item.title.toLowerCase().includes(q) || item.year.toLowerCase().includes(q)) {
          results.push({
            type: '약력',
            title: item.title,
            desc: `${item.year} - ${cat.era}`,
            link: (item as any).link
              ? (item as any).link === '/press'
                ? '/press'
                : (item as any).link
                    .replace('/awards/', '/article/')
                    .replace('/press/', '/article/')
                    .replace(/\.(jpeg|jpg|png|pdf)$/i, '')
              : `/career`,
            color: cat.color,
          });
        }
      });
    });
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="화이트스타일치과 통합검색"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(15,23,42,0.95)',
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        padding: '3rem 1rem 2rem',
      }}
    >
      <div className="container" style={{ position: 'relative', maxWidth: '800px', width: '100%', margin: '0 auto' }}>
        <button
          type="button"
          onClick={onClose}
          aria-label="검색 창 닫기"
          style={{
            position: 'absolute',
            right: 0,
            top: '-2.5rem',
            background: 'none',
            border: 'none',
            color: 'white',
            fontSize: '2rem',
            cursor: 'pointer',
            lineHeight: 1,
          }}
        >
          &times;
        </button>

        <input
          type="text"
          placeholder="검색어를 입력하세요 (예: 임플란트, 교정, 제로쉘, 수가표, Q&A...)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
          style={{
            width: '100%',
            padding: '1rem 1.5rem',
            fontSize: '1.1rem',
            borderRadius: '12px',
            border: 'none',
            outline: 'none',
            background: '#ffffff',
            color: '#0f172a',
            boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
          }}
        />

        {q.length === 0 && (
          <div style={{ marginTop: '1.25rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {['임플란트', '치아교정', '제로쉘', '수가표', '뼈이식', '재교정', '일본어'].map((chip) => (
              <button
                key={chip}
                type="button"
                onClick={() => setQuery(chip)}
                style={{
                  background: 'rgba(255,255,255,0.12)',
                  color: '#e2e8f0',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '999px',
                  padding: '0.4rem 0.9rem',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                #{chip}
              </button>
            ))}
          </div>
        )}

        <div style={{ marginTop: '1.5rem', overflowY: 'auto', maxHeight: 'calc(100vh - 180px)', paddingRight: '0.5rem' }}>
          {query.trim().length > 0 && results.length === 0 && (
            <p style={{ color: '#94a3b8', textAlign: 'center', marginTop: '2rem' }}>
              &apos;{query}&apos;에 대한 검색 결과가 없습니다.
            </p>
          )}

          {results.map((r, i) => (
            <a
              key={i}
              href={r.link}
              onClick={() => onClose()}
              style={{
                display: 'block',
                background: 'rgba(255,255,255,0.1)',
                padding: '1.25rem',
                borderRadius: '12px',
                marginBottom: '0.85rem',
                textDecoration: 'none',
                color: 'white',
              }}
            >
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    padding: '0.2rem 0.55rem',
                    borderRadius: '4px',
                    background: r.color,
                    color: '#ffffff',
                  }}
                >
                  {r.type}
                </span>
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.25rem' }}>{r.title}</h3>
              <p style={{ color: '#cbd5e1', fontSize: '0.88rem', lineHeight: 1.5 }}>{r.desc}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
