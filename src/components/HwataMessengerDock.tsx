'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { upload } from '@vercel/blob/client';

interface DockRoom {
  roomId: string;
  roomName: string;
  unreadCount: number;
}

interface DockMessage {
  id: string;
  userId: string | null;
  sender: string;
  text: string;
  isBot: boolean;
  isCracked: boolean;
  attachments?: Array<{ id: string; fileName: string; url: string }>;
  createdAt: string;
}

interface AiChatMsg {
  role: 'bot' | 'user';
  text: string;
}

type HwataStyleMode = 'clean' | 'pixel' | 'sd';

const STYLE_MODE_OPTIONS: Array<{ id: HwataStyleMode; label: string }> = [
  { id: 'clean', label: '✨ 클린' },
  { id: 'pixel', label: '👾 8비트' },
  { id: 'sd', label: '🎀 K-게임 SD' },
];

const DOCK_THEMES: Record<
  HwataStyleMode,
  {
    cardBg: string;
    cardBorder: string;
    cardRadius: string;
    cardShadow: string;
    hdrBg: string;
    hdrBorder: string;
    hdrText: string;
    subText: string;
    avaBg: string;
    avaBorder: string;
    modeBarBg: string;
    tabActiveText: string;
    tabActiveBorder: string;
    primaryBg: string;
    primaryText: string;
    chipBg: string;
    chipBorder: string;
    chipText: string;
    feedBg: string;
    fabBorder: string;
    fabBg: string;
    fabRadius: string;
    fabShadow: string;
  }
> = {
  clean: {
    cardBg: '#ffffff',
    cardBorder: '1px solid #e2e8f0',
    cardRadius: '20px',
    cardShadow: '0 18px 40px rgba(15, 23, 42, 0.12)',
    hdrBg: '#f8fafc',
    hdrBorder: '1px solid #e2e8f0',
    hdrText: '#0f172a',
    subText: '#64748b',
    avaBg: '#f0fdf9',
    avaBorder: '1px solid #99f6e4',
    modeBarBg: '#ffffff',
    tabActiveText: '#0d9488',
    tabActiveBorder: '#0d9488',
    primaryBg: '#0d9488',
    primaryText: '#ffffff',
    chipBg: '#f0fdf9',
    chipBorder: '#99f6e4',
    chipText: '#0f766e',
    feedBg: '#f8fafc',
    fabBorder: '2px solid #ffffff',
    fabBg: 'rgba(255,255,255,0.95)',
    fabRadius: '999px',
    fabShadow: '0 10px 24px rgba(15, 23, 42, 0.14)',
  },
  pixel: {
    cardBg: '#faf3e3',
    cardBorder: '2px solid #1e293b',
    cardRadius: '10px',
    cardShadow: '4px 4px 0 #1e293b',
    hdrBg: '#fde047',
    hdrBorder: '2px solid #1e293b',
    hdrText: '#1e293b',
    subText: '#334155',
    avaBg: '#ffffff',
    avaBorder: '2px solid #1e293b',
    modeBarBg: '#f4efe6',
    tabActiveText: '#1e293b',
    tabActiveBorder: '#1e293b',
    primaryBg: '#1e293b',
    primaryText: '#ffffff',
    chipBg: '#ffffff',
    chipBorder: '#1e293b',
    chipText: '#1e293b',
    feedBg: '#e8f0e5',
    fabBorder: '2px solid #1e293b',
    fabBg: '#faf3e3',
    fabRadius: '14px',
    fabShadow: '3px 3px 0 #1e293b',
  },
  sd: {
    cardBg: '#ffffff',
    cardBorder: '2px solid #bae6fd',
    cardRadius: '24px',
    cardShadow: '0 20px 44px rgba(2, 132, 199, 0.16)',
    hdrBg: '#e0f2fe',
    hdrBorder: '1.5px solid #bae6fd',
    hdrText: '#0c4a6e',
    subText: '#0369a1',
    avaBg: '#fff1f2',
    avaBorder: '2px solid #fda4af',
    modeBarBg: '#f0f9ff',
    tabActiveText: '#0284c7',
    tabActiveBorder: '#0284c7',
    primaryBg: '#0284c7',
    primaryText: '#ffffff',
    chipBg: '#fff1f2',
    chipBorder: '#fecdd3',
    chipText: '#be123c',
    feedBg: '#f8fafc',
    fabBorder: '2.5px solid #7dd3fc',
    fabBg: '#ffffff',
    fabRadius: '999px',
    fabShadow: '0 12px 28px rgba(2, 132, 199, 0.22)',
  },
};

function sanitizeStyleMode(val: string | null | undefined): HwataStyleMode {
  return val === 'pixel' || val === 'sd' ? val : 'clean';
}

export default function HwataMessengerDock() {
  const pathname = usePathname() || '/';
  const { data: session, status } = useSession();

  const shouldHide =
    pathname.startsWith('/messenger') ||
    pathname.startsWith('/admin');

  const [open, setOpen] = useState(false);
  const [styleMode, setStyleMode] = useState<HwataStyleMode>('clean');
  const [tab, setTab] = useState<'talk' | 'ai'>('talk');
  const [rooms, setRooms] = useState<DockRoom[]>([]);
  const [roomId, setRoomId] = useState('room_jaw_stretch');
  const [messages, setMessages] = useState<DockMessage[]>([]);
  const [blobEnabled, setBlobEnabled] = useState(false);
  const [maxCloudBytes, setMaxCloudBytes] = useState(100 * 1024 * 1024);
  const [talkInput, setTalkInput] = useState('');
  const [talkBusy, setTalkBusy] = useState(false);

  const [aiMessages, setAiMessages] = useState<AiChatMsg[]>([
    {
      role: 'bot',
      text: '안녕하세요. 치아교정·심미보철·임플란트·연말 스케일링 궁금증을 한 줄로 바로 물어보세요.',
    },
  ]);
  const [aiInput, setAiInput] = useState('');
  const [aiBusy, setAiBusy] = useState(false);

  const fileRef = useRef<HTMLInputElement | null>(null);
  const logRef = useRef<HTMLDivElement | null>(null);
  const aiLogRef = useRef<HTMLDivElement | null>(null);
  const [fabWave, setFabWave] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setFabWave(true);
      setTimeout(() => setFabWave(false), 1500);
    }, 6800);
    return () => clearInterval(t);
  }, []);

  const sessionUser = session?.user as
    | { id?: string; name?: string | null; isVerifiedNonInsured?: boolean }
    | undefined;
  const isAuthed = status === 'authenticated' && Boolean(sessionUser);
  const isVerified = Boolean(sessionUser?.isVerifiedNonInsured);

  const totalUnread = rooms.reduce((acc, r) => acc + (r.unreadCount || 0), 0);

  const loadBootstrap = useCallback(async () => {
    if (!isAuthed || shouldHide) return;
    try {
      const res = await fetch('/api/messenger/v1/bootstrap', { cache: 'no-store' });
      const data = await res.json().catch(() => null);
      if (data?.ok) {
        setRooms(data.rooms || []);
        if (data.storage) {
          setBlobEnabled(Boolean(data.storage.blobEnabled));
          setMaxCloudBytes(Number(data.storage.maxCloudBytes || 100 * 1024 * 1024));
        }
        if (
          Array.isArray(data.rooms) &&
          data.rooms.length > 0 &&
          !data.rooms.some((r: DockRoom) => r.roomId === roomId)
        ) {
          setRoomId(data.rooms[0].roomId);
        }
      }
    } catch {
      // ignore
    }
  }, [isAuthed, shouldHide, roomId]);

  const loadRoomMessages = useCallback(async () => {
    if (!isAuthed || !open || tab !== 'talk' || !roomId || shouldHide) return;
    try {
      const res = await fetch(
        `/api/messenger/v1/rooms/${encodeURIComponent(roomId)}/messages`,
        { cache: 'no-store' }
      );
      const data = await res.json().catch(() => null);
      if (data?.ok) {
        setMessages((data.messages || []).slice(-30));
        setTimeout(() => {
          if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
        }, 50);
      }
    } catch {
      // ignore
    }
  }, [isAuthed, open, tab, roomId, shouldHide]);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem('hwata_style_mode');
      if (saved) setStyleMode(sanitizeStyleMode(saved));
    } catch {
      // ignore
    }
    const onStorage = (ev: StorageEvent) => {
      if (ev.key === 'hwata_style_mode') {
        setStyleMode(sanitizeStyleMode(ev.newValue));
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const handleChangeMode = (nextMode: HwataStyleMode) => {
    setStyleMode(nextMode);
    try {
      window.localStorage.setItem('hwata_style_mode', nextMode);
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    loadBootstrap();
    if (!isAuthed || shouldHide) return;
    const t = setInterval(loadBootstrap, 15000);
    return () => clearInterval(t);
  }, [loadBootstrap, isAuthed, shouldHide]);

  useEffect(() => {
    loadRoomMessages();
    if (!open || tab !== 'talk' || !isAuthed || shouldHide) return;
    const t = setInterval(loadRoomMessages, 3500);
    return () => clearInterval(t);
  }, [loadRoomMessages, open, tab, isAuthed, shouldHide]);

  if (shouldHide) return null;

  const sendTalk = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const text = talkInput.trim();
    if (!text || talkBusy || !isAuthed) return;
    setTalkBusy(true);
    setTalkInput('');
    try {
      await fetch(`/api/messenger/v1/rooms/${encodeURIComponent(roomId)}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, messageType: 'TEXT' }),
      });
      await loadRoomMessages();
    } finally {
      setTalkBusy(false);
    }
  };

  const handleDockFile = async (file: File) => {
    if (!isAuthed || !roomId) return;
    if (file.size > maxCloudBytes) {
      alert('허용 용량을 초과했습니다. 전체화면 화타톡(/messenger)에서 P2P 무제한 전송을 이용해 주세요.');
      return;
    }
    setTalkBusy(true);
    try {
      let attachmentId = '';
      if (blobEnabled) {
        const safePath = `hwatatalk/${roomId}/${Date.now()}_${file.name.replace(/[^\w.\-가-힣]/g, '_')}`;
        const blob = await upload(safePath, file, {
          access: 'public',
          handleUploadUrl: '/api/messenger/v1/upload',
          multipart: file.size > 8 * 1024 * 1024,
          clientPayload: JSON.stringify({
            roomId,
            fileName: file.name,
            mimeType: file.type || 'application/octet-stream',
            sizeBytes: file.size,
          }),
        });
        const comp = await fetch('/api/messenger/v1/upload/complete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            roomId,
            blobUrl: blob.url,
            blobPathname: blob.pathname,
            fileName: file.name,
            mimeType: file.type || 'application/octet-stream',
            sizeBytes: file.size,
          }),
        });
        const compData = await comp.json();
        attachmentId = compData?.attachment?.id || '';
      } else if (file.size <= 3.5 * 1024 * 1024) {
        const fd = new FormData();
        fd.append('roomId', roomId);
        fd.append('file', file);
        const fb = await fetch('/api/messenger/v1/upload/fallback', { method: 'POST', body: fd });
        const fbData = await fb.json();
        attachmentId = fbData?.attachment?.id || '';
      } else {
        alert('3.5MB 초과 파일은 전체화면 화타톡(/messenger) P2P 직통 전송을 이용해 주세요.');
        return;
      }

      if (attachmentId) {
        await fetch(`/api/messenger/v1/rooms/${encodeURIComponent(roomId)}/messages`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: file.name,
            messageType: file.type.startsWith('image/') ? 'IMAGE' : 'FILE',
            attachmentIds: [attachmentId],
          }),
        });
        await loadRoomMessages();
      }
    } finally {
      setTalkBusy(false);
    }
  };

  const askAi = async (qRaw: string) => {
    const q = qRaw.trim();
    if (!q || aiBusy) return;
    setAiBusy(true);
    setAiInput('');
    setAiMessages((prev) => [...prev, { role: 'user', text: q }, { role: 'bot', text: '질문을 확인하고 답변을 정리하고 있어요…' }]);
    setTimeout(() => {
      if (aiLogRef.current) aiLogRef.current.scrollTo({ top: aiLogRef.current.scrollHeight, behavior: 'smooth' });
    }, 30);
    try {
      const historyCtx = aiMessages.slice(-4).map((m) => ({
        role: m.role === 'bot' ? 'assistant' : 'user',
        content: m.text,
      }));
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: q,
          messages: [...historyCtx, { role: 'user', content: q }],
          persona: 'angel',
          species: 'dog',
          lang: 'ko',
        }),
      });
      const data = await res.json().catch(() => null);
      const reply = (data && (data.reply || data.content || data.text)) || '대표전화 1577-7287 / 02-569-7528로 문의해 주세요.';
      setAiMessages((prev) => [...prev.slice(0, -1), { role: 'bot', text: String(reply) }]);
      setTimeout(() => {
        if (aiLogRef.current) aiLogRef.current.scrollTo({ top: aiLogRef.current.scrollHeight, behavior: 'smooth' });
      }, 40);
    } catch {
      setAiMessages((prev) => [
        ...prev.slice(0, -1),
        { role: 'bot', text: '연결이 잠시 고르지 않습니다. 대표전화 1577-7287로 문의해 주세요.' },
      ]);
    } finally {
      setAiBusy(false);
    }
  };

  const theme = DOCK_THEMES[styleMode];
  const petImgSrc = open || fabWave || aiBusy
    ? `/ai-pet/assets3d/hwata_mode_${styleMode}_wave.png`
    : isVerified
      ? `/ai-pet/assets3d/hwata_mode_${styleMode}_crown.png`
      : `/ai-pet/assets3d/hwata_mode_${styleMode}.png`;
  const hdrAvaSrc = isVerified
    ? `/ai-pet/assets3d/hwata_mode_${styleMode}_crown.png`
    : `/ai-pet/assets3d/hwata_mode_${styleMode}.png`;
  const imgPixelStyle: React.CSSProperties =
    styleMode === 'pixel' ? { imageRendering: 'pixelated' } : {};
  const showDockEyelids = styleMode !== 'pixel' && !isVerified;

  return (
    <div
      style={{
        position: 'fixed',
        left: '18px',
        bottom: '22px',
        zIndex: 9990,
        fontFamily: '"Pretendard Variable", "Pretendard", "Malgun Gothic", sans-serif',
        wordBreak: 'keep-all',
      }}
    >
      <style>{`
        @keyframes hwDockBobLook {
          0%, 100% { transform: translate3d(0, 1.5px, 0) rotate(0deg) scale(1.06, 0.93); }
          15% { transform: translate3d(0, -5.5px, 0) rotate(0deg) scale(0.95, 1.06); }
          30%, 40% { transform: translate3d(-4.5px, -1px, 0) rotate(-11deg) scale(1.02, 0.98); }
          52% { transform: translate3d(0, 1.5px, 0) rotate(0deg) scale(1.06, 0.93); }
          67% { transform: translate3d(0, -5.5px, 0) rotate(0deg) scale(0.95, 1.06); }
          82%, 90% { transform: translate3d(4.5px, -1px, 0) rotate(11deg) scale(1.02, 0.98); }
        }
        @keyframes hwDockEyelid {
          0%, 84%, 91%, 94%, 99%, 100% { opacity: 0; transform: scaleY(0); }
          86%, 89%, 96%, 97.5% { opacity: 1; transform: scaleY(1); }
        }
        @keyframes hwDockHoverHop {
          0%, 100% { transform: translateY(1px) scale(1.05, 0.94); }
          45% { transform: translateY(-7px) scale(0.96, 1.06); }
          75% { transform: translateY(-2px) scale(1.03, 0.98); }
        }
        .hw-dock-pet-actor {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transform-origin: center 82%;
          transition: none !important;
          animation: hwDockBobLook 2.5s ease-in-out infinite !important;
          will-change: transform;
        }
        .hw-dock-fab-btn:hover .hw-dock-pet-actor {
          animation: hwDockHoverHop 0.7s ease-in-out infinite !important;
        }
        .hw-dock-eyelid {
          position: absolute;
          top: 33.8%;
          width: 8.6%;
          height: 10%;
          background: #e2e3e4;
          border-bottom: 2px solid #452e23;
          border-radius: 50% 50% 42% 42%;
          transform-origin: top center;
          opacity: 0;
          pointer-events: none;
          transition: none !important;
          animation: hwDockEyelid 3.6s ease-in-out infinite !important;
        }
        .hw-dock-eyelid.is-left { left: 34.8%; }
        .hw-dock-eyelid.is-right { left: 56.8%; }
      `}</style>
      {open && (
        <section
          aria-label="화타펫 지인 톡 및 치과 상담"
          style={{
            width: '350px',
            maxWidth: 'calc(100vw - 28px)',
            height: '520px',
            maxHeight: 'calc(100vh - 120px)',
            marginBottom: '10px',
            background: theme.cardBg,
            border: theme.cardBorder,
            borderRadius: theme.cardRadius,
            boxShadow: theme.cardShadow,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              background: theme.hdrBg,
              color: theme.hdrText,
              borderBottom: theme.hdrBorder,
              padding: '11px 14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '8px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '9px', minWidth: 0 }}>
              <div
                className="hw-dock-pet-actor"
                style={{
                  width: '30px',
                  height: '30px',
                  background: theme.avaBg,
                  border: theme.avaBorder,
                  borderRadius: styleMode === 'pixel' ? '6px' : '999px',
                  overflow: 'hidden',
                  flexShrink: 0,
                }}
              >
                <img
                  src={hdrAvaSrc}
                  alt=""
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    ...imgPixelStyle,
                  }}
                />
                {showDockEyelids && (
                  <>
                    <span className="hw-dock-eyelid is-left" />
                    <span className="hw-dock-eyelid is-right" />
                  </>
                )}
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: '13px', fontWeight: 800, color: theme.hdrText }}>
                  화타톡 {isVerified ? '· 인증 화타펫' : ''}
                </div>
                <div style={{ fontSize: '11px', color: theme.subText }}>
                  1994년 개원 33년 전통 화이트스타일치과
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
              <Link
                href="/messenger"
                style={{
                  padding: '4px 9px',
                  borderRadius: styleMode === 'pixel' ? '6px' : '8px',
                  background: theme.primaryBg,
                  color: theme.primaryText,
                  fontSize: '11px',
                  fontWeight: 800,
                  textDecoration: 'none',
                }}
              >
                전체화면
              </Link>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="창 닫기"
                style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: styleMode === 'pixel' ? '6px' : '8px',
                  border: '1px solid rgba(15,23,42,0.16)',
                  background: '#ffffff',
                  color: '#334155',
                  cursor: 'pointer',
                  fontWeight: 700,
                }}
              >
                ×
              </button>
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
              gap: '4px',
              padding: '7px 10px',
              background: theme.modeBarBg,
              borderBottom: '1px solid #e2e8f0',
            }}
          >
            {STYLE_MODE_OPTIONS.map((opt) => {
              const active = styleMode === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleChangeMode(opt.id)}
                  style={{
                    padding: '5px 4px',
                    borderRadius: styleMode === 'pixel' ? '5px' : styleMode === 'sd' ? '999px' : '8px',
                    border: active ? `1px solid ${theme.primaryBg}` : '1px solid #cbd5e1',
                    background: active ? theme.primaryBg : '#ffffff',
                    color: active ? theme.primaryText : '#475569',
                    fontSize: '11px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>

          <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0', background: theme.modeBarBg }}>
            <button
              type="button"
              onClick={() => setTab('talk')}
              style={{
                flex: 1,
                padding: '9px 8px',
                fontSize: '12px',
                fontWeight: 800,
                border: 'none',
                cursor: 'pointer',
                background: tab === 'talk' ? '#ffffff' : 'transparent',
                color: tab === 'talk' ? theme.tabActiveText : '#64748b',
                borderBottom: tab === 'talk' ? `2px solid ${theme.tabActiveBorder}` : '2px solid transparent',
              }}
            >
              지인 톡 {totalUnread > 0 ? `(${totalUnread})` : ''}
            </button>
            <button
              type="button"
              onClick={() => setTab('ai')}
              style={{
                flex: 1,
                padding: '9px 8px',
                fontSize: '12px',
                fontWeight: 800,
                border: 'none',
                cursor: 'pointer',
                background: tab === 'ai' ? '#ffffff' : 'transparent',
                color: tab === 'ai' ? theme.tabActiveText : '#64748b',
                borderBottom: tab === 'ai' ? `2px solid ${theme.tabActiveBorder}` : '2px solid transparent',
              }}
            >
              닥터 화타 AI
            </button>
          </div>

          {tab === 'talk' ? (
            !isAuthed ? (
              <div style={{ padding: '24px 18px', textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '12px', background: theme.feedBg }}>
                <div style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a' }}>
                  로그인 후 홈페이지를 켜 놓고 지인들과 대화하세요
                </div>
                <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.65, margin: 0 }}>
                  비보험 진료를 받으신 분은 인증된 화타펫으로 지인 초대·대화방 개설·최대 500MB 클라우드 및 P2P 무제한 파일 전송을 이용하실 수 있습니다.
                </p>
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                  <Link
                    href={`/login?callbackUrl=${encodeURIComponent(pathname)}`}
                    style={{
                      padding: '10px 16px',
                      borderRadius: '10px',
                      background: theme.primaryBg,
                      color: theme.primaryText,
                      fontSize: '13px',
                      fontWeight: 700,
                      textDecoration: 'none',
                    }}
                  >
                    로그인
                  </Link>
                  <Link
                    href={`/register?callbackUrl=${encodeURIComponent(pathname)}`}
                    style={{
                      padding: '10px 16px',
                      borderRadius: '10px',
                      background: '#ffffff',
                      border: '1px solid #cbd5e1',
                      color: '#0f172a',
                      fontSize: '13px',
                      fontWeight: 700,
                      textDecoration: 'none',
                    }}
                  >
                    회원가입
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <div style={{ padding: '8px 10px', borderBottom: '1px solid #e2e8f0', display: 'flex', gap: '6px', background: '#ffffff' }}>
                  <select
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value)}
                    style={{
                      flex: 1,
                      padding: '6px 8px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '12px',
                      fontWeight: 700,
                    }}
                  >
                    {rooms.map((r) => (
                      <option key={r.roomId} value={r.roomId}>
                        {r.roomName} {r.unreadCount > 0 ? `(${r.unreadCount})` : ''}
                      </option>
                    ))}
                  </select>
                </div>

                <div
                  ref={logRef}
                  style={{
                    flex: 1,
                    overflowY: 'auto',
                    overscrollBehavior: 'contain',
                    padding: '10px',
                    background: theme.feedBg,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                  }}
                >
                  {messages.map((m) => {
                    const isMe = !m.isBot && m.userId === sessionUser?.id;
                    return (
                      <div
                        key={m.id}
                        style={{
                          alignSelf: isMe ? 'flex-end' : 'flex-start',
                          maxWidth: '86%',
                          background: isMe ? theme.primaryBg : m.isBot ? '#fffbeb' : '#ffffff',
                          color: isMe ? theme.primaryText : '#0f172a',
                          border: isMe ? 'none' : '1px solid #e2e8f0',
                          borderRadius: styleMode === 'pixel' ? '6px' : '14px',
                          padding: '8px 10px',
                          fontSize: '12.5px',
                          lineHeight: 1.5,
                        }}
                      >
                        {!isMe && (
                          <div style={{ fontSize: '11px', fontWeight: 800, marginBottom: '2px', color: m.isBot ? '#b45309' : theme.tabActiveText }}>
                            {m.sender}
                          </div>
                        )}
                        <div>{m.text}</div>
                        {m.attachments?.map((a) => (
                          <a
                            key={a.id}
                            href={`${a.url}?download=1`}
                            style={{
                              display: 'block',
                              marginTop: '4px',
                              fontSize: '11px',
                              textDecoration: 'underline',
                              color: isMe ? '#fde68a' : theme.tabActiveText,
                            }}
                          >
                            {a.fileName} 다운로드
                          </a>
                        ))}
                      </div>
                    );
                  })}
                </div>

                <input
                  ref={fileRef}
                  type="file"
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) handleDockFile(f);
                    e.target.value = '';
                  }}
                />
                <form
                  onSubmit={sendTalk}
                  style={{
                    padding: '8px 10px',
                    borderTop: '1px solid #e2e8f0',
                    background: '#ffffff',
                    display: 'flex',
                    gap: '6px',
                    alignItems: 'center',
                  }}
                >
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    disabled={talkBusy}
                    title="파일 첨부"
                    style={{
                      padding: '7px 9px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      background: '#f8fafc',
                      fontSize: '12px',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    파일
                  </button>
                  <input
                    value={talkInput}
                    onChange={(e) => setTalkInput(e.target.value)}
                    placeholder="지인에게 메시지..."
                    style={{
                      flex: 1,
                      padding: '7px 10px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      fontSize: '12.5px',
                    }}
                  />
                  <button
                    type="submit"
                    disabled={talkBusy}
                    style={{
                      padding: '7px 12px',
                      borderRadius: '8px',
                      border: 'none',
                      background: theme.primaryBg,
                      color: theme.primaryText,
                      fontSize: '12px',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    전송
                  </button>
                </form>
              </>
            )
          ) : (
            <>
              <div
                ref={aiLogRef}
                style={{
                  flex: 1,
                  overflowY: 'auto',
                  overscrollBehavior: 'contain',
                  padding: '10px',
                  background: theme.feedBg,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                {aiMessages.map((m, idx) => (
                  <div
                    key={idx}
                    style={{
                      alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                      maxWidth: '88%',
                      background: m.role === 'user' ? theme.primaryBg : '#ffffff',
                      color: m.role === 'user' ? theme.primaryText : '#0f172a',
                      border: m.role === 'user' ? 'none' : '1px solid #e2e8f0',
                      borderRadius: styleMode === 'pixel' ? '6px' : '14px',
                      padding: '8px 10px',
                      fontSize: '12.5px',
                      lineHeight: 1.55,
                    }}
                  >
                    {m.text}
                  </div>
                ))}
              </div>
              <div style={{ padding: '6px 10px', display: 'flex', flexWrap: 'wrap', gap: '4px', borderTop: '1px solid #e2e8f0', background: '#ffffff' }}>
                {['연말 스케일링?', '교정 기간/비용?', '무통 마취?'].map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => askAi(chip)}
                    style={{
                      padding: '4px 9px',
                      borderRadius: styleMode === 'pixel' ? '5px' : '999px',
                      border: `1px solid ${theme.chipBorder}`,
                      background: theme.chipBg,
                      color: theme.chipText,
                      fontSize: '11px',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    {chip}
                  </button>
                ))}
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  askAi(aiInput);
                }}
                style={{ padding: '8px 10px', borderTop: '1px solid #e2e8f0', background: '#ffffff', display: 'flex', gap: '6px' }}
              >
                <input
                  value={aiInput}
                  onChange={(e) => setAiInput(e.target.value)}
                  placeholder="치아 고민을 물어보세요..."
                  style={{
                    flex: 1,
                    padding: '7px 10px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '12.5px',
                  }}
                />
                <button
                  type="submit"
                  disabled={aiBusy}
                  style={{
                    padding: '7px 12px',
                    borderRadius: '8px',
                    border: 'none',
                    background: theme.primaryBg,
                    color: theme.primaryText,
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  질문
                </button>
              </form>
            </>
          )}
        </section>
      )}

      <button
        type="button"
        className="hw-dock-fab-btn"
        onClick={() => setOpen((v) => !v)}
        aria-label="화타펫 지인 톡 열기"
        style={{
          position: 'relative',
          width: '68px',
          height: '68px',
          padding: 0,
          borderRadius: theme.fabRadius,
          border: isVerified ? '2px solid #f59e0b' : theme.fabBorder,
          background: theme.fabBg,
          boxShadow: theme.fabShadow,
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div className="hw-dock-pet-actor" style={{ width: '58px', height: '58px' }}>
          <img
            src={petImgSrc}
            alt="화타펫"
            style={{ width: '58px', height: '58px', objectFit: 'contain', ...imgPixelStyle }}
          />
          {showDockEyelids && (
            <>
              <span className="hw-dock-eyelid is-left" />
              <span className="hw-dock-eyelid is-right" />
            </>
          )}
        </div>
        {totalUnread > 0 && (
          <span
            style={{
              position: 'absolute',
              top: '-4px',
              right: '-4px',
              minWidth: '20px',
              height: '20px',
              padding: '0 5px',
              borderRadius: '999px',
              background: '#dc2626',
              color: '#ffffff',
              fontSize: '11px',
              fontWeight: 800,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {totalUnread}
          </span>
        )}
      </button>
    </div>
  );
}
