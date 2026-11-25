'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export type HwataLoungeMode = 'clean' | 'pixel' | 'sd';

export interface SerializedLoungeMessage {
  id: string;
  sender: string;
  text: string;
  isCracked: boolean;
  avatarCostume: string;
  avatarBg: string;
  isBot: boolean;
  createdAtIso: string;
}

export interface SerializedLoungeRoom {
  roomId: string;
  roomName: string;
  description: string;
  topic: string;
  memberCount: number;
  messages: SerializedLoungeMessage[];
}

const MODE_OPTIONS: Array<{ id: HwataLoungeMode; label: string }> = [
  { id: 'clean', label: '✨ 클린 미니멀 (기본)' },
  { id: 'pixel', label: '👾 8비트 도트' },
  { id: 'sd', label: '🎀 K-게임 SD' },
];

const BG_COLOR_MAP: Record<string, string> = {
  cream: '#faf3e3',
  mint: '#dff3ee',
  peach: '#fce5dc',
  sky: '#e1f0fa',
  lavender: '#ece6fa',
  gold: '#fef08a',
};

const THEME_CONFIG: Record<
  HwataLoungeMode,
  {
    pageBg: string;
    eyebrowText: string;
    primaryBtn: string;
    cardBox: string;
    botMsg: string;
    userMsg: string;
    botBadge: string;
    avaBorder: string;
    avaRadius: string;
    footerBox: string;
    footerTitle: string;
    footerDesc: string;
  }
> = {
  clean: {
    pageBg: '',
    eyebrowText: 'text-teal-700',
    primaryBtn: 'bg-teal-600 hover:bg-teal-700 text-white shadow-sm',
    cardBox: 'rounded-2xl border border-slate-200 bg-white p-6 shadow-sm',
    botMsg: 'bg-teal-50/70 border border-teal-200',
    userMsg: 'bg-slate-50 border border-slate-200',
    botBadge: 'bg-teal-700 text-white',
    avaBorder: '#0d9488',
    avaRadius: '999px',
    footerBox: 'rounded-2xl bg-teal-50 border border-teal-200 p-6',
    footerTitle: 'text-teal-950',
    footerDesc: 'text-teal-900',
  },
  pixel: {
    pageBg: 'bg-[#f4f6f0]',
    eyebrowText: 'text-teal-800',
    primaryBtn: 'bg-[#0d9488] hover:bg-[#0f766e] text-white border-2 border-slate-800 shadow-[3px_3px_0_#1e293b]',
    cardBox: 'rounded-xl border-2 border-slate-800 bg-[#faf3e3] p-6 shadow-[4px_4px_0_#1e293b]',
    botMsg: 'bg-[#fef9c3] border-2 border-slate-800 shadow-[2px_2px_0_#1e293b]',
    userMsg: 'bg-white border-2 border-slate-800',
    botBadge: 'bg-slate-900 text-[#fde047]',
    avaBorder: '#1e293b',
    avaRadius: '8px',
    footerBox: 'rounded-xl bg-[#dcfce7] border-2 border-slate-800 p-6 shadow-[4px_4px_0_#1e293b]',
    footerTitle: 'text-slate-950',
    footerDesc: 'text-slate-800',
  },
  sd: {
    pageBg: 'bg-[#f0f9ff]',
    eyebrowText: 'text-sky-700',
    primaryBtn: 'bg-sky-600 hover:bg-sky-700 text-white rounded-full shadow-md',
    cardBox: 'rounded-3xl border-2 border-sky-200 bg-white p-6 shadow-md',
    botMsg: 'bg-rose-50/80 border border-rose-200',
    userMsg: 'bg-sky-50/60 border border-sky-100',
    botBadge: 'bg-rose-600 text-white',
    avaBorder: '#0284c7',
    avaRadius: '999px',
    footerBox: 'rounded-3xl bg-white border-2 border-sky-200 p-6 shadow-md',
    footerTitle: 'text-sky-950',
    footerDesc: 'text-sky-800',
  },
};

function sanitizeMode(v: string | null | undefined): HwataLoungeMode {
  return v === 'pixel' || v === 'sd' ? v : 'clean';
}

function resolveAvatarFile(mode: HwataLoungeMode, costume: string, isBot: boolean): string {
  if (isBot || costume === 'doctor' || costume === 'hygiene') {
    return `/ai-pet/assets3d/hwata_mode_${mode}_doctor.png`;
  }
  if (costume === 'crown' || costume === 'angel' || costume === 'beret') {
    return `/ai-pet/assets3d/hwata_mode_${mode}_crown.png`;
  }
  return `/ai-pet/assets3d/hwata_mode_${mode}.png`;
}

export default function LoungeClientView({ rooms }: { rooms: SerializedLoungeRoom[] }) {
  const [mode, setMode] = useState<HwataLoungeMode>('clean');

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem('hwata_style_mode');
      if (saved) setMode(sanitizeMode(saved));
    } catch {
      // ignore
    }
    const onStorage = (ev: StorageEvent) => {
      if (ev.key === 'hwata_style_mode') {
        setMode(sanitizeMode(ev.newValue));
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const handleSelectMode = (nextMode: HwataLoungeMode) => {
    setMode(nextMode);
    try {
      window.localStorage.setItem('hwata_style_mode', nextMode);
    } catch {
      // ignore
    }
  };

  const t = THEME_CONFIG[mode];

  return (
    <div
      className={`max-w-5xl mx-auto px-5 py-14 text-slate-900 wb-ka wbka transition-colors ${t.pageBg}`}
      style={{ wordBreak: 'keep-all', overflowWrap: 'break-word', lineHeight: 1.85 }}
    >
      <header className="mb-10 pb-8 border-b border-slate-200">
        <p className={`text-sm font-bold mb-2 ${t.eyebrowText}`}>
          1994년 개원 33년 전통 · 강남역 11번, 12번 출구 도보 1분 화이트스타일치과의원
        </p>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 mb-4">
          화타펫 실시간 구강 고민 Q&amp;A 라운지
        </h1>
        <p className="text-base text-slate-700 mb-6">
          화타펫 공개 단톡방에서 실제 사용자들이 나눈 턱관절, 치아교정, 최소삭제 라미네이트, 치아미백 고민과
          3인 원장단 자문 기반 닥터 화타의 실시간 답변을 한눈에 모아볼 수 있습니다.
        </p>

        <div className="mb-6 flex flex-wrap items-center gap-3">
          <span className="text-xs font-bold text-slate-600">디자인 모드 선택:</span>
          <div className="inline-flex flex-wrap gap-1.5 p-1.5 rounded-xl bg-slate-100 border border-slate-200">
            {MODE_OPTIONS.map((opt) => {
              const active = mode === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleSelectMode(opt.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                    active
                      ? 'bg-teal-600 text-white shadow-sm'
                      : 'bg-transparent text-slate-600 hover:text-slate-900 hover:bg-white'
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <a
            href="/ai-pet#community"
            className={`inline-flex items-center px-5 py-3 rounded-xl font-bold transition ${t.primaryBtn}`}
          >
            화타펫 단톡방 참여하기
          </a>
          <a
            href="https://booking.naver.com/booking/13/bizes/265482"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-5 py-3 rounded-xl font-bold text-white bg-emerald-700 hover:bg-emerald-800 transition"
          >
            네이버 빠른 예약 (1분 완료)
          </a>
          <a
            href="tel:1577-7287"
            className="inline-flex items-center px-5 py-3 rounded-xl font-bold text-slate-900 bg-white border border-slate-300 hover:bg-slate-100 transition"
          >
            대표전화 1577-7287 / 02-569-7528
          </a>
        </div>
      </header>

      <div className="space-y-8">
        {rooms.map((room) => (
          <section key={room.roomId} className={t.cardBox}>
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-5 border-b border-slate-200/80">
              <div>
                <h2 className="text-xl font-extrabold text-slate-950">{room.roomName}</h2>
                <p className="text-sm text-slate-600 mt-1">{room.description}</p>
              </div>
              <a
                href={`/ai-pet?room=${encodeURIComponent(room.roomId)}#community`}
                className={`px-4 py-2 rounded-xl text-sm font-bold transition ${t.primaryBtn}`}
              >
                이 단톡방에 참여하기
              </a>
            </div>

            <div className="space-y-4">
              {room.messages.map((m) => {
                const bg = BG_COLOR_MAP[m.avatarBg] || BG_COLOR_MAP.cream;
                const imgSrc = resolveAvatarFile(mode, m.avatarCostume, m.isBot);
                return (
                  <article
                    key={m.id}
                    className={`flex items-start gap-3.5 p-4 rounded-xl ${
                      m.isBot ? t.botMsg : t.userMsg
                    }`}
                  >
                    <div
                      className="relative shrink-0 overflow-hidden border-2"
                      style={{
                        width: 46,
                        height: 46,
                        backgroundColor: bg,
                        borderColor: m.isBot ? t.avaBorder : '#334155',
                        borderRadius: t.avaRadius,
                      }}
                      aria-hidden="true"
                    >
                      <img
                        src={imgSrc}
                        alt=""
                        className="w-full h-full object-contain"
                        style={mode === 'pixel' ? { imageRendering: 'pixelated' } : undefined}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-sm font-bold text-slate-900">{m.sender}</span>
                        {m.isCracked && !m.isBot && (
                          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-300 text-slate-950">
                            VIP 정회원
                          </span>
                        )}
                        {m.isBot && (
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${t.botBadge}`}>
                            닥터 화타
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-slate-800 whitespace-pre-line">{m.text}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      <footer className="mt-14 pt-8 border-t border-slate-200">
        <div className={`${t.footerBox} flex flex-wrap items-center justify-between gap-4`}>
          <div>
            <h2 className={`text-lg font-extrabold ${t.footerTitle}`}>
              인증된 화타펫 정회원 전용 화타톡 메신저 &amp; 프라이빗 단톡방
            </h2>
            <p className={`text-sm mt-1 ${t.footerDesc}`}>
              whitestyle.com 로그인 후 원내 정회원 인증으로 프라이빗 지인 단톡방 개설과 화타톡(/messenger) 대용량 파일 전송을 이용해 보세요.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="/ai-pet#community" className={`px-5 py-3 rounded-xl font-bold transition ${t.primaryBtn}`}>
              화타펫 단톡방 열기
            </a>
            <Link
              href="/messenger"
              className="px-5 py-3 rounded-xl font-bold text-slate-900 bg-white border border-slate-300 hover:bg-slate-100"
            >
              화타톡 메신저 열기
            </Link>
            <Link
              href="/qa"
              className="px-5 py-3 rounded-xl font-bold text-slate-900 bg-white border border-slate-300 hover:bg-slate-100"
            >
              임상 Q&amp;A 더보기
            </Link>
          </div>
        </div>
        <p className="text-xs text-slate-600 mt-6">
          서울특별시 강남구 강남대로92길 17 (역삼동 819-10) 대승빌딩 B1·1·2층 화이트스타일치과의원 (우편번호 06134) /
          김준헌 병원장 · 이봉진 대표원장 · 박선혜 원장(치주과 전문의) 3인 협진 /
          대표전화 1577-7287, 02-569-7528 / 일본어 통역 직통 +82-10-3046-5010
        </p>
      </footer>
    </div>
  );
}
