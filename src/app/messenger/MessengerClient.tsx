'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { upload } from '@vercel/blob/client';
import {
  acceptWebRtcP2POffer,
  sendFileViaWebRtcP2P,
  type P2PIncomingOffer,
  type P2PProgressInfo,
} from '@/lib/messenger/p2p-transfer';

interface AvatarConfig {
  species: string;
  ear: string;
  costume: string;
  bg: string;
}

interface MeInfo {
  id: string;
  name: string;
  email: string;
  handle: string | null;
  statusMessage: string | null;
  isOwnerAdmin: boolean;
  isVerifiedNonInsured: boolean;
  verifiedTreatment: string | null;
  chartNo: string | null;
  canCreatePrivateRooms: boolean;
  petAvatar: AvatarConfig;
}

interface RoomSummary {
  roomId: string;
  roomName: string;
  description: string;
  creator: string;
  inviteCode: string;
  isPublic: boolean;
  roomType: string;
  memberCount: number;
  joined: boolean;
  unreadCount: number;
  lastMessage: {
    id: string;
    sender: string;
    text: string;
    messageType: string;
    createdAt: string;
  } | null;
}

interface AttachmentInfo {
  id: string;
  fileName: string;
  mimeType: string;
  sizeBytes: number;
  storageProvider: string;
  url: string;
  uploaderName?: string;
  createdAt: string;
}

interface MessageItem {
  id: string;
  roomId: string;
  userId: string | null;
  sender: string;
  text: string;
  isBot: boolean;
  isCracked: boolean;
  verifiedTreatment: string | null;
  messageType: string;
  stickerCode: string | null;
  replyTo: { id: string; sender: string; text: string } | null;
  unreadCount: number;
  avatar: AvatarConfig;
  attachments: AttachmentInfo[];
  reactions: Array<{ emoji: string; count: number; mine: boolean }>;
  createdAt: string;
}

interface OnlineMember {
  userId: string;
  name: string;
  handle: string | null;
  isVerifiedNonInsured: boolean;
  statusMessage: string | null;
  petAvatar: AvatarConfig;
  isMe: boolean;
}

interface FriendInfo {
  id: string;
  name: string;
  handle: string | null;
  isVerifiedNonInsured: boolean;
  statusMessage: string | null;
  petAvatar: AvatarConfig;
  isOnline: boolean;
}

interface StickerDef {
  code: string;
  label: string;
  img: string;
}

const SPECIES_LIST = [
  { key: 'dog', label: '하야니' },
  { key: 'cat', label: '치즈냥' },
  { key: 'elephant', label: '코코' },
  { key: 'dino', label: '디노' },
  { key: 'parrot', label: '코코아' },
  { key: 'python', label: '파이' },
];

const EAR_LIST = [
  { key: 'perk', label: '쫑긋 귀' },
  { key: 'fold', label: '접힌 귀' },
  { key: 'round', label: '둥근 귀' },
  { key: 'pointy', label: '뾰족 귀' },
  { key: 'fox', label: '여우 귀' },
  { key: 'lynx', label: '스라소니' },
  { key: 'mismatch', label: '짝짝이' },
];

const COSTUME_LIST = [
  { key: 'none', label: '기본' },
  { key: 'crown', label: 'VIP 왕관' },
  { key: 'doctor', label: '의사 가운' },
  { key: 'angel', label: '수호천사' },
  { key: 'beret', label: '베레모' },
  { key: 'coder', label: '개발자' },
  { key: 'hygiene', label: '위생사' },
];

const BG_LIST = [
  { key: 'cream', label: '크림' },
  { key: 'mint', label: '민트' },
  { key: 'peach', label: '피치' },
  { key: 'sky', label: '스카이' },
  { key: 'lavender', label: '라벤더' },
  { key: 'gold', label: '골드' },
];

const REACTION_EMOJIS = ['👍', '❤️', '😂', '👏', '🦷', '🐾', '🎉'];

function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) return '0 B';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}

function getSeededDelaySec(seed?: string): string {
  if (!seed) return '0s';
  let h = 0;
  for (let i = 0; i < seed.length; i += 1) {
    h = (h * 31 + seed.charCodeAt(i)) | 0;
  }
  const offset = (Math.abs(h) % 42) * 0.1;
  return `-${offset.toFixed(1)}s`;
}

function AvatarBadge({
  avatar,
  verified,
  large,
  seed,
  thinking,
}: {
  avatar: AvatarConfig;
  verified?: boolean;
  large?: boolean;
  seed?: string;
  thinking?: boolean;
}) {
  const isDogPlain = avatar.species === 'dog' && (!avatar.costume || avatar.costume === 'none');
  const isDogCostume = avatar.species === 'dog' && avatar.costume && avatar.costume !== 'none';
  const showEyelids = isDogCostume || avatar.species === 'cat';
  const delayStyle = { '--pet-delay': getSeededDelaySec(seed) } as React.CSSProperties;

  return (
    <div
      className={`ht-avatar-frame bg-${avatar.bg || 'cream'}${large ? ' is-lg' : ''}${
        verified ? ' is-verified' : ''
      }${thinking ? ' is-thinking' : ''}`}
      style={delayStyle}
      aria-hidden="true"
    >
      <div className="ht-avatar-motion-wrap">
        {isDogPlain && (
          <>
            <img
              src="/ai-pet/assets3d/hwata_3d_idle.png"
              alt=""
              className="ht-avatar-img ht-avatar-base-frame"
            />
            <img
              src="/ai-pet/assets3d/hwata_3d_blink.png"
              alt=""
              className="ht-avatar-img ht-avatar-blink-frame"
            />
            <img
              src={`/ai-pet/assets3d/hwata_3d_ear_${avatar.ear || 'perk'}.png`}
              alt=""
              className="ht-avatar-img ht-avatar-ear"
            />
          </>
        )}
        {isDogCostume && (
          <img
            src={`/ai-pet/assets3d/hwata_3d_costume_${avatar.costume}.png`}
            alt=""
            className="ht-avatar-img"
          />
        )}
        {!isDogPlain && !isDogCostume && (
          <img
            src={`/ai-pet/assets3d/hwata_3d_species_${avatar.species || 'dog'}.png`}
            alt=""
            className="ht-avatar-img"
          />
        )}
        {showEyelids && (
          <>
            <span className="ht-avatar-eyelid is-left" />
            <span className="ht-avatar-eyelid is-right" />
          </>
        )}
      </div>
    </div>
  );
}

type StageFrame = {
  body: string;
  ear: string;
  x: number;
  y: number;
  rot: number;
  flipX?: boolean;
  label: string;
};

const STAGE_PLAYBOOK: StageFrame[] = [
  // 왼쪽으로 아장아장 산책하며 두리번
  { body: '/ai-pet/assets3d/hwata_3d_stand4_a.png', ear: '/ai-pet/assets3d/hwata_3d_ear_stand4_round.png', x: -2, y: 0, rot: -2, label: '왼쪽으로 아장아장 살피는 중' },
  { body: '/ai-pet/assets3d/hwata_3d_stand4_b.png', ear: '/ai-pet/assets3d/hwata_3d_ear_stand4_round.png', x: -6, y: -3, rot: -4, label: '왼쪽으로 아장아장 살피는 중' },
  { body: '/ai-pet/assets3d/hwata_3d_stand4_a.png', ear: '/ai-pet/assets3d/hwata_3d_ear_stand4_round.png', x: -10, y: 0, rot: -3, label: '왼쪽을 두리번거리는 중' },
  { body: '/ai-pet/assets3d/hwata_3d_stand4_blink.png', ear: '/ai-pet/assets3d/hwata_3d_ear_stand4_round.png', x: -11, y: -1, rot: -6, label: '깜빡깜빡 두리번거리는 중' },
  { body: '/ai-pet/assets3d/hwata_3d_stand4_b.png', ear: '/ai-pet/assets3d/hwata_3d_ear_stand4_round.png', x: -7, y: -3, rot: 2, label: '중앙으로 돌아오는 중' },
  { body: '/ai-pet/assets3d/hwata_3d_stand4_a.png', ear: '/ai-pet/assets3d/hwata_3d_ear_stand4_round.png', x: -3, y: 0, rot: 0, label: '중앙으로 돌아오는 중' },
  // 정면 위아래 통통 출렁 & 갸우뚱
  { body: '/ai-pet/assets3d/hwata_3d_sit.png', ear: '/ai-pet/assets3d/hwata_3d_ear_round.png', x: 0, y: 2, rot: 0, label: '통통 뛰어오를 준비 중' },
  { body: '/ai-pet/assets3d/hwata_3d_idle.png', ear: '/ai-pet/assets3d/hwata_3d_ear_round.png', x: 0, y: -4, rot: -10, label: '위아래로 통통 출렁이는 중' },
  { body: '/ai-pet/assets3d/hwata_3d_sit.png', ear: '/ai-pet/assets3d/hwata_3d_ear_round.png', x: 0, y: 2, rot: 0, label: '위아래로 통통 출렁이는 중' },
  { body: '/ai-pet/assets3d/hwata_3d_idle.png', ear: '/ai-pet/assets3d/hwata_3d_ear_round.png', x: 0, y: -4, rot: 10, label: '고개 갸우뚱 두리번거리는 중' },
  { body: '/ai-pet/assets3d/hwata_3d_blink.png', ear: '/ai-pet/assets3d/hwata_3d_ear_round.png', x: 0, y: 0, rot: 0, label: '눈 깜빡이며 경청 중' },
  // 오른쪽으로 아장아장 산책하며 두리번 (좌우 반전)
  { body: '/ai-pet/assets3d/hwata_3d_stand4_a.png', ear: '/ai-pet/assets3d/hwata_3d_ear_stand4_round.png', x: 3, y: 0, rot: 2, flipX: true, label: '오른쪽으로 아장아장 살피는 중' },
  { body: '/ai-pet/assets3d/hwata_3d_stand4_b.png', ear: '/ai-pet/assets3d/hwata_3d_ear_stand4_round.png', x: 7, y: -3, rot: 4, flipX: true, label: '오른쪽으로 아장아장 살피는 중' },
  { body: '/ai-pet/assets3d/hwata_3d_stand4_a.png', ear: '/ai-pet/assets3d/hwata_3d_ear_stand4_round.png', x: 11, y: 0, rot: 3, flipX: true, label: '오른쪽을 두리번거리는 중' },
  { body: '/ai-pet/assets3d/hwata_3d_stand4_blink.png', ear: '/ai-pet/assets3d/hwata_3d_ear_stand4_round.png', x: 11, y: -1, rot: 6, flipX: true, label: '깜빡깜빡 두리번거리는 중' },
  { body: '/ai-pet/assets3d/hwata_3d_stand4_b.png', ear: '/ai-pet/assets3d/hwata_3d_ear_stand4_round.png', x: 6, y: -3, rot: -2, flipX: true, label: '중앙으로 돌아오는 중' },
  { body: '/ai-pet/assets3d/hwata_3d_stand4_a.png', ear: '/ai-pet/assets3d/hwata_3d_ear_stand4_round.png', x: 2, y: 0, rot: 0, flipX: true, label: '중앙으로 돌아오는 중' },
  // 정면 손 흔들며 인사
  { body: '/ai-pet/assets3d/hwata_3d_wave.png', ear: '/ai-pet/assets3d/hwata_3d_ear_round.png', x: 0, y: -4, rot: -6, label: '반갑게 손 흔드는 중' },
  { body: '/ai-pet/assets3d/hwata_3d_wave.png', ear: '/ai-pet/assets3d/hwata_3d_ear_round.png', x: 0, y: 1, rot: 6, label: '반갑게 손 흔드는 중' },
  { body: '/ai-pet/assets3d/hwata_3d_wave.png', ear: '/ai-pet/assets3d/hwata_3d_ear_round.png', x: 0, y: -3, rot: -4, label: '언제든 @화타 질문 대기 중' },
];

const STAGE_PRELOAD_ASSETS = [
  '/ai-pet/assets3d/hwata_3d_stand4_a.png',
  '/ai-pet/assets3d/hwata_3d_stand4_b.png',
  '/ai-pet/assets3d/hwata_3d_stand4_blink.png',
  '/ai-pet/assets3d/hwata_3d_ear_stand4_round.png',
  '/ai-pet/assets3d/hwata_3d_sit.png',
  '/ai-pet/assets3d/hwata_3d_idle.png',
  '/ai-pet/assets3d/hwata_3d_blink.png',
  '/ai-pet/assets3d/hwata_3d_wave.png',
  '/ai-pet/assets3d/hwata_3d_ear_round.png',
  '/ai-pet/assets3d/hwata_3d_motion_smile.png',
];

function LiveHwataPetStage({
  thinking,
  happy,
  onPet,
}: {
  thinking: boolean;
  happy: boolean;
  onPet: () => void;
}) {
  const [tickIdx, setTickIdx] = useState(0);

  useEffect(() => {
    for (const src of STAGE_PRELOAD_ASSETS) {
      const im = new window.Image();
      im.src = src;
    }
    const id = setInterval(() => {
      setTickIdx((n) => (n + 1) % STAGE_PLAYBOOK.length);
    }, 200);
    return () => clearInterval(id);
  }, []);

  const step = STAGE_PLAYBOOK[tickIdx];
  const effectiveStatus = thinking
    ? '맞춤 답변 작성하는 중...'
    : happy
      ? '반갑게 인사하는 중!'
      : '@화타 질문 상시 대기 중';

  const walkerTransform = thinking
    ? `translate3d(${tickIdx % 2 === 0 ? -5 : 5}px, ${tickIdx % 2 === 0 ? -4 : 1}px, 0) rotate(${tickIdx % 2 === 0 ? -9 : 9}deg)`
    : happy
      ? `translate3d(0px, ${tickIdx % 2 === 0 ? -5 : 1}px, 0) rotate(${tickIdx % 2 === 0 ? -8 : 8}deg)`
      : `translate3d(${step.x}px, ${step.y}px, 0) rotate(${step.rot}deg) scaleX(${step.flipX ? -1 : 1})`;

  return (
    <button
      type="button"
      onClick={onPet}
      className={`ht-live-pet-stage${thinking ? ' is-thinking' : ''}${happy ? ' is-happy' : ''}`}
      title="클릭하면 닥터 화타가 손을 흔들며 반가워해요!"
    >
      <div className="ht-live-pet-stage-box" aria-hidden="true">
        <div
          className="ht-live-pet-stage-walker"
          style={{ transform: walkerTransform }}
        >
          <div className="ht-live-pet-stage-actor">
            {thinking ? (
              <img
                src="/ai-pet/assets3d/hwata_3d_motion_smile.png"
                alt=""
                className="ht-avatar-img"
              />
            ) : happy ? (
              <>
                <img
                  src="/ai-pet/assets3d/hwata_3d_wave.png"
                  alt=""
                  className="ht-avatar-img"
                />
                <img
                  src="/ai-pet/assets3d/hwata_3d_ear_round.png"
                  alt=""
                  className="ht-avatar-img ht-avatar-ear"
                />
              </>
            ) : (
              <>
                <img src={step.body} alt="" className="ht-avatar-img" />
                <img src={step.ear} alt="" className="ht-avatar-img ht-avatar-ear" />
              </>
            )}
          </div>
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 0, overflow: 'hidden' }}>
        <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--ht-navy)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          닥터 화타 LIVE
        </div>
        <div style={{ fontSize: '11px', color: 'var(--ht-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {effectiveStatus}
        </div>
      </div>
    </button>
  );
}

function playGentleChime() {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(784, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1046, ctx.currentTime + 0.12);
    gain.gain.setValueAtTime(0.05, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.24);
  } catch {
    // ignore autoplay restriction
  }
}

export default function MessengerClient() {
  const [me, setMe] = useState<MeInfo | null>(null);
  const [storageInfo, setStorageInfo] = useState({
    blobEnabled: false,
    maxCloudBytes: 100 * 1024 * 1024,
    fallbackMaxBytes: Math.floor(3.5 * 1024 * 1024),
    p2pUnlimited: true,
  });
  const [stickers, setStickers] = useState<StickerDef[]>([]);
  const [rooms, setRooms] = useState<RoomSummary[]>([]);
  const [friends, setFriends] = useState<FriendInfo[]>([]);
  const [currentRoomId, setCurrentRoomId] = useState('room_jaw_stretch');
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [onlineMembers, setOnlineMembers] = useState<OnlineMember[]>([]);
  const [p2pOffers, setP2POffers] = useState<P2PIncomingOffer[]>([]);
  const [p2pProgress, setP2PProgress] = useState<P2PProgressInfo | null>(null);

  const [mobileShowChat, setMobileShowChat] = useState(false);
  const [showFilesDrawer, setShowFilesDrawer] = useState(false);
  const [roomFiles, setRoomFiles] = useState<AttachmentInfo[]>([]);
  const [fileFilter, setFileFilter] = useState<'all' | 'media' | 'docs'>('all');

  const [roomQuery, setRoomQuery] = useState('');
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [msgSearchQuery, setMsgSearchQuery] = useState('');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [notice, setNotice] = useState('');

  // Modals & forms
  const [verifyCodeInput, setVerifyCodeInput] = useState('');
  const [showVerifyBox, setShowVerifyBox] = useState(false);
  const [showCreateRoomModal, setShowCreateRoomModal] = useState(false);
  const [newRoomName, setNewRoomName] = useState('');
  const [newRoomPublic, setNewRoomPublic] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [joinInviteInput, setJoinInviteInput] = useState('');
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [editProfileName, setEditProfileName] = useState('');
  const [editProfileHandle, setEditProfileHandle] = useState('');
  const [editProfileStatus, setEditProfileStatus] = useState('');
  const [editAvatar, setEditAvatar] = useState<AvatarConfig>({
    species: 'dog',
    ear: 'perk',
    costume: 'none',
    bg: 'cream',
  });

  // Composer
  const [composerText, setComposerText] = useState('');
  const [replyTo, setReplyTo] = useState<{ id: string; sender: string; text: string } | null>(null);
  const [showStickerPicker, setShowStickerPicker] = useState(false);
  const [uploadPercent, setUploadPercent] = useState<number | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [p2pTargetUserId, setP2PTargetUserId] = useState('');
  const [showP2PPicker, setShowP2PPicker] = useState(false);
  const [isDoctorTyping, setIsDoctorTyping] = useState(false);
  const [isPetHappy, setIsPetHappy] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const p2pInputRef = useRef<HTMLInputElement | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const composerTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const happyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastTopMsgIdRef = useRef<string>('');
  const handledUrlParamsRef = useRef(false);

  const scrollChatToBottom = useCallback((behavior: ScrollBehavior = 'smooth') => {
    const el = messagesContainerRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior });
  }, []);

  const triggerPetHappy = useCallback(() => {
    setIsPetHappy(true);
    if (happyTimerRef.current) clearTimeout(happyTimerRef.current);
    happyTimerRef.current = setTimeout(() => setIsPetHappy(false), 2600);
  }, []);

  const currentRoom = useMemo(
    () => rooms.find((r) => r.roomId === currentRoomId) || rooms[0] || null,
    [rooms, currentRoomId]
  );

  const loadBootstrap = useCallback(async () => {
    const res = await fetch('/api/messenger/v1/bootstrap', { cache: 'no-store' });
    if (res.status === 401) {
      window.location.href = '/login?callbackUrl=%2Fmessenger';
      return null;
    }
    const data = await res.json();
    if (data.ok) {
      setMe(data.me);
      setStorageInfo(data.storage);
      setStickers(data.stickers || []);
      setRooms(data.rooms || []);
      setFriends(data.friends || []);
      if (data.me) {
        setEditProfileName(data.me.name || '');
        setEditProfileHandle(data.me.handle || '');
        setEditProfileStatus(data.me.statusMessage || '');
        setEditAvatar(data.me.petAvatar || { species: 'dog', ear: 'perk', costume: 'none', bg: 'cream' });
      }
    }
    return data;
  }, []);

  const loadMessages = useCallback(
    async (scroll = false) => {
      if (!currentRoomId) return;
      const qParam = msgSearchQuery.trim() ? `&q=${encodeURIComponent(msgSearchQuery.trim())}` : '';
      const res = await fetch(
        `/api/messenger/v1/rooms/${encodeURIComponent(currentRoomId)}/messages?${qParam.slice(1)}`,
        { cache: 'no-store' }
      );
      if (res.status === 401) return;
      const data = await res.json().catch(() => null);
      if (data?.ok) {
        const list: MessageItem[] = data.messages || [];
        const newestId = list.length ? list[list.length - 1].id : '';
        const box = messagesContainerRef.current;
        const wasNearBottom = box
          ? box.scrollHeight - box.scrollTop - box.clientHeight < 110
          : true;

        if (lastTopMsgIdRef.current && newestId && newestId !== lastTopMsgIdRef.current) {
          const newest = list[list.length - 1];
          if (soundEnabled && newest.userId !== me?.id) {
            playGentleChime();
          }
          if (scroll || wasNearBottom) {
            setTimeout(() => scrollChatToBottom('smooth'), 40);
          }
        } else if (scroll) {
          setTimeout(() => scrollChatToBottom('auto'), 40);
        }
        lastTopMsgIdRef.current = newestId;
        setMessages(list);
        setOnlineMembers(data.onlineMembers || []);
        setP2POffers(data.p2pOffers || []);
      }
    },
    [currentRoomId, msgSearchQuery, soundEnabled, me?.id, scrollChatToBottom]
  );

  const loadRoomFiles = useCallback(async () => {
    if (!currentRoomId) return;
    const res = await fetch(
      `/api/messenger/v1/rooms/${encodeURIComponent(currentRoomId)}/messages?filesOnly=1`,
      { cache: 'no-store' }
    );
    const data = await res.json().catch(() => null);
    if (data?.ok) {
      setRoomFiles(data.files || []);
    }
  }, [currentRoomId]);

  useEffect(() => {
    (async () => {
      const boot = await loadBootstrap();
      if (!boot?.ok || handledUrlParamsRef.current) return;
      handledUrlParamsRef.current = true;

      const sp = new URLSearchParams(window.location.search);
      const verifyParam = sp.get('verify');
      const inviteParam = sp.get('invite');
      const roomParam = sp.get('room');

      if (verifyParam) {
        const vRes = await fetch('/api/messenger/v1/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code: verifyParam }),
        });
        const vData = await vRes.json().catch(() => null);
        if (vData?.message) setNotice(vData.message);
        await loadBootstrap();
      }

      if (inviteParam || roomParam) {
        const jRes = await fetch('/api/messenger/v1/rooms/join', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            inviteCode: inviteParam || undefined,
            roomId: roomParam || undefined,
          }),
        });
        const jData = await jRes.json().catch(() => null);
        if (jData?.ok && jData.room) {
          setCurrentRoomId(jData.room.roomId);
          setMobileShowChat(true);
          await loadBootstrap();
        }
      }
    })();
  }, [loadBootstrap]);

  useEffect(() => {
    loadMessages(true);
  }, [currentRoomId, msgSearchQuery]);

  useEffect(() => {
    if (showFilesDrawer) loadRoomFiles();
  }, [showFilesDrawer, currentRoomId, loadRoomFiles]);

  useEffect(() => {
    const t = setInterval(() => {
      loadMessages(false);
    }, 3200);
    const b = setInterval(() => {
      loadBootstrap();
    }, 15000);
    return () => {
      clearInterval(t);
      clearInterval(b);
    };
  }, [loadMessages, loadBootstrap]);

  const sendMessage = async (opts?: {
    text?: string;
    messageType?: string;
    stickerCode?: string;
    attachmentIds?: string[];
  }) => {
    const text = (opts?.text ?? composerText).trim();
    const attachmentIds = opts?.attachmentIds || [];
    if (!text && attachmentIds.length === 0 && !opts?.stickerCode) return;

    if (!opts?.text) setComposerText('');
    const currentReply = replyTo;
    setReplyTo(null);

    const isDoctorCall = /(@화타|화타야|닥터\s*화타|화타펫|화타톡)/.test(text);
    const isSoloOrPublic = Boolean(currentRoom?.isPublic) || (currentRoom?.memberCount !== undefined && currentRoom.memberCount <= 1);
    const hasDentalQuestion =
      isSoloOrPublic &&
      (/[?？]/.test(text) || /(얼마|어떻게|언제|가능|할\s*수\s*있|추천|알려|궁금|뭐야|효과|기간|비용|가격|수가)/.test(text)) &&
      /치과|치아|턱|교정|앞니|이빨|어금니|라미네이트|임플란트|스케일링|마취|통증|시려|시린|미백|수능|수험생|수험표|충치|사랑니|잇몸|신경치료|치실|치간칫솔|보철|화타펫|화타톡|레진|인레이|크라운/.test(
        text
      );
    const replyTargetsBot = Boolean(
      currentReply &&
        messages.some((msg) => msg.id === currentReply.id && msg.isBot)
    );
    const expectsDoctorReply = isDoctorCall || hasDentalQuestion || replyTargetsBot;

    const tempId = `temp-${Date.now()}`;
    if (me && attachmentIds.length === 0) {
      const optimisticMsg: MessageItem = {
        id: tempId,
        roomId: currentRoomId,
        userId: me.id,
        sender: me.name || me.email.split('@')[0] || '회원',
        text,
        isBot: false,
        isCracked: me.isVerifiedNonInsured,
        verifiedTreatment: me.verifiedTreatment,
        messageType: opts?.messageType || 'TEXT',
        stickerCode: opts?.stickerCode || null,
        replyTo: currentReply,
        unreadCount: 0,
        avatar: me.petAvatar,
        attachments: [],
        reactions: [],
        createdAt: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, optimisticMsg]);
      setTimeout(() => scrollChatToBottom('smooth'), 20);
    }

    if (expectsDoctorReply) {
      setIsDoctorTyping(true);
      setTimeout(() => scrollChatToBottom('smooth'), 50);
    }

    try {
      const res = await fetch(
        `/api/messenger/v1/rooms/${encodeURIComponent(currentRoomId)}/messages`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text,
            messageType: opts?.messageType || 'TEXT',
            stickerCode: opts?.stickerCode,
            replyToId: currentReply?.id || null,
            attachmentIds,
          }),
        }
      );
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setMessages((prev) => prev.filter((m) => m.id !== tempId));
        setNotice(data?.message || '메시지 전송에 실패했습니다.');
        return;
      }

      if (data?.botReply) {
        triggerPetHappy();
      }
      await loadMessages(true);
      if (showFilesDrawer && attachmentIds.length > 0) loadRoomFiles();
    } finally {
      setIsDoctorTyping(false);
      composerTextareaRef.current?.focus({ preventScroll: true });
    }
  };

  const handleFileUpload = async (files: FileList | File[]) => {
    const list = Array.from(files);
    if (list.length === 0) return;

    const uploadedIds: string[] = [];
    for (const file of list) {
      if (file.size > storageInfo.maxCloudBytes) {
        setNotice(
          `${file.name} (${formatBytes(file.size)})은 클라우드 한도(${formatBytes(
            storageInfo.maxCloudBytes
          )})를 초과합니다. 온라인 지인에게 [P2P 무제한 전송]을 이용해 주세요.`
        );
        continue;
      }

      try {
        setUploadPercent(1);
        if (storageInfo.blobEnabled) {
          const safePath = `hwatatalk/${currentRoomId}/${Date.now()}_${file.name.replace(/[^\w.\-가-힣]/g, '_')}`;
          const blob = await upload(safePath, file, {
            access: 'public',
            handleUploadUrl: '/api/messenger/v1/upload',
            multipart: file.size > 8 * 1024 * 1024,
            clientPayload: JSON.stringify({
              roomId: currentRoomId,
              fileName: file.name,
              mimeType: file.type || 'application/octet-stream',
              sizeBytes: file.size,
            }),
            onUploadProgress: (p) => setUploadPercent(Math.round(p.percentage)),
          });

          const compRes = await fetch('/api/messenger/v1/upload/complete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              roomId: currentRoomId,
              blobUrl: blob.url,
              blobPathname: blob.pathname,
              fileName: file.name,
              mimeType: file.type || 'application/octet-stream',
              sizeBytes: file.size,
            }),
          });
          const compData = await compRes.json();
          if (compData?.ok && compData.attachment?.id) {
            uploadedIds.push(compData.attachment.id);
          }
        } else {
          if (file.size > storageInfo.fallbackMaxBytes) {
            setNotice(
              `${file.name} (${formatBytes(file.size)})은 기본 첨부 한도(3.5MB)를 초과합니다. 동시 접속 지인에게는 [P2P 무제한] 버튼으로 용량 제한 없이 바로 보낼 수 있습니다.`
            );
            continue;
          }
          const fd = new FormData();
          fd.append('roomId', currentRoomId);
          fd.append('file', file);
          const fbRes = await fetch('/api/messenger/v1/upload/fallback', {
            method: 'POST',
            body: fd,
          });
          const fbData = await fbRes.json();
          if (fbData?.ok && fbData.attachment?.id) {
            uploadedIds.push(fbData.attachment.id);
          } else {
            setNotice(fbData?.message || '파일 업로드 실패');
          }
        }
      } catch (err) {
        setNotice(err instanceof Error ? err.message : '파일 전송 중 오류가 발생했습니다.');
      } finally {
        setUploadPercent(null);
      }
    }

    if (uploadedIds.length > 0) {
      const firstFile = list[0];
      const mType = firstFile.type.startsWith('image/')
        ? 'IMAGE'
        : firstFile.type.startsWith('video/')
          ? 'VIDEO'
          : 'FILE';
      await sendMessage({
        text: composerText.trim() || `${list.map((f) => f.name).join(', ')}`,
        messageType: mType,
        attachmentIds: uploadedIds,
      });
    }
  };

  const handleP2PSendFile = async (file: File) => {
    if (!p2pTargetUserId) {
      setNotice('P2P 직통 전송할 온라인 지인을 먼저 선택해 주세요.');
      return;
    }
    setShowP2PPicker(false);
    try {
      setNotice(`${file.name} (${formatBytes(file.size)}) P2P 직통 연결 요청 중... (상대방이 수락하면 전송 시작)`);
      const res = await sendFileViaWebRtcP2P({
        roomId: currentRoomId,
        toUserId: p2pTargetUserId,
        file,
        onProgress: (info) => setP2PProgress(info),
      });
      setP2PProgress(null);
      setNotice(`${file.name} (${formatBytes(res.bytesSent)}) P2P 무제한 직통 전송 완료!`);
      await sendMessage({
        text: `P2P 직통 파일 전송 완료: ${file.name} (${formatBytes(file.size)})`,
        messageType: 'FILE',
      });
    } catch (err) {
      setP2PProgress(null);
      setNotice(err instanceof Error ? err.message : 'P2P 파일 전송에 실패했습니다.');
    }
  };

  const handleAcceptP2P = async (offer: P2PIncomingOffer) => {
    try {
      const done = await acceptWebRtcP2POffer({
        offerSignal: offer,
        onProgress: (info) => setP2PProgress(info),
      });
      setP2PProgress(null);
      setP2POffers((prev) => prev.filter((o) => o.id !== offer.id));
      setNotice(`${done.fileName} (${formatBytes(done.size)}) P2P 직통 다운로드 완료!`);
    } catch (err) {
      setP2PProgress(null);
      setNotice(err instanceof Error ? err.message : 'P2P 파일 수신 중 오류가 발생했습니다.');
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!verifyCodeInput.trim()) return;
    const res = await fetch('/api/messenger/v1/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: verifyCodeInput.trim() }),
    });
    const data = await res.json();
    setNotice(data.message || '처리가 완료되었습니다.');
    if (data.ok) {
      setVerifyCodeInput('');
      setShowVerifyBox(false);
      await loadBootstrap();
    }
  };

  const handleCreateRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoomName.trim()) return;
    const res = await fetch('/api/messenger/v1/rooms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        roomType: 'GROUP',
        roomName: newRoomName.trim(),
        isPublic: newRoomPublic,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      setNotice(data.message || '대화방 개설에 실패했습니다.');
      return;
    }
    setNewRoomName('');
    setShowCreateRoomModal(false);
    setCurrentRoomId(data.room.roomId);
    setMobileShowChat(true);
    await loadBootstrap();
    if (data.inviteLink) {
      navigator.clipboard?.writeText(data.inviteLink).catch(() => {});
      setNotice(`대화방이 열렸습니다! 초대 링크가 클립보드에 복사되었습니다.`);
    }
  };

  const handleJoinRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!joinInviteInput.trim()) return;
    const res = await fetch('/api/messenger/v1/rooms/join', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ inviteCode: joinInviteInput.trim() }),
    });
    const data = await res.json();
    if (!res.ok) {
      setNotice(data.message || '초대 코드가 올바르지 않습니다.');
      return;
    }
    setJoinInviteInput('');
    setShowJoinModal(false);
    setCurrentRoomId(data.room.roomId);
    setMobileShowChat(true);
    await loadBootstrap();
    setNotice(`${data.room.roomName} 방에 입장했습니다.`);
  };

  const handleStartDm = async (friend: FriendInfo) => {
    const res = await fetch('/api/messenger/v1/rooms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ roomType: 'DM', targetUserId: friend.id }),
    });
    const data = await res.json();
    if (!res.ok) {
      setNotice(data.message || '1:1 대화 시작에 실패했습니다.');
      return;
    }
    setCurrentRoomId(data.room.roomId);
    setMobileShowChat(true);
    await loadBootstrap();
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/messenger/v1/profile', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: editProfileName,
        handle: editProfileHandle,
        statusMessage: editProfileStatus,
        petAvatar: editAvatar,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      setNotice(data.message || '프로필 저장 실패');
      return;
    }
    setShowAvatarModal(false);
    setNotice('내 화타펫 프로필을 저장했습니다.');
    await loadBootstrap();
    await loadMessages(false);
  };

  const handleReact = async (messageId: string, emoji: string) => {
    await fetch(`/api/messenger/v1/messages/${encodeURIComponent(messageId)}/react`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ emoji }),
    });
    await loadMessages(false);
  };

  const handleDeleteMsg = async (messageId: string) => {
    await fetch(`/api/messenger/v1/messages/${encodeURIComponent(messageId)}`, {
      method: 'DELETE',
    });
    await loadMessages(false);
  };

  const filteredRooms = useMemo(() => {
    const q = roomQuery.trim().toLowerCase();
    if (!q) return rooms;
    return rooms.filter(
      (r) =>
        r.roomName.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q)
    );
  }, [rooms, roomQuery]);

  const filteredFiles = useMemo(() => {
    if (fileFilter === 'media') {
      return roomFiles.filter(
        (f) => f.mimeType.startsWith('image/') || f.mimeType.startsWith('video/')
      );
    }
    if (fileFilter === 'docs') {
      return roomFiles.filter(
        (f) => !f.mimeType.startsWith('image/') && !f.mimeType.startsWith('video/')
      );
    }
    return roomFiles;
  }, [roomFiles, fileFilter]);

  const otherOnlineMembers = useMemo(
    () => onlineMembers.filter((m) => !m.isMe),
    [onlineMembers]
  );

  return (
    <div className="ht-page">
      {notice && (
        <div
          role="status"
          style={{
            marginBottom: '12px',
            padding: '10px 16px',
            borderRadius: '12px',
            background: 'var(--ht-blue-soft)',
            border: '1px solid var(--ht-blue-border)',
            color: 'var(--ht-navy)',
            fontSize: '13px',
            fontWeight: 700,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <span>{notice}</span>
          <button type="button" onClick={() => setNotice('')} className="ht-btn" style={{ padding: '3px 8px' }}>
            닫기
          </button>
        </div>
      )}

      <div className={`ht-shell${showFilesDrawer ? ' has-drawer' : ''}`}>
        {/* 좌측 사이드바 */}
        <aside className={`ht-sidebar${mobileShowChat ? ' is-hidden-mobile' : ''}`} aria-label="화타톡 대화방 및 친구 목록">
          {me && (
            <div className="ht-me-box">
              <div className="ht-me-row">
                <AvatarBadge avatar={me.petAvatar} verified={me.isVerifiedNonInsured} large seed={me.id} />
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                    <strong style={{ fontSize: '15px' }}>{me.name}</strong>
                    {me.isVerifiedNonInsured ? (
                      <span className="ht-badge-verified">인증 화타펫</span>
                    ) : (
                      <span className="ht-badge-general">일반 회원</span>
                    )}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--ht-muted)', marginTop: '2px' }}>
                    {me.statusMessage || (me.handle ? `@${me.handle}` : me.email)}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAvatarModal(true)}
                  className="ht-btn"
                  style={{ padding: '6px 9px' }}
                >
                  꾸미기
                </button>
              </div>

              {!me.isVerifiedNonInsured && (
                <div
                  style={{
                    marginTop: '10px',
                    padding: '9px 11px',
                    borderRadius: '10px',
                    background: 'var(--ht-surface-warm)',
                    border: '1px solid var(--ht-gold-border)',
                    fontSize: '12px',
                  }}
                >
                  <div style={{ fontWeight: 700, color: 'var(--ht-gold)' }}>
                    비보험 진료 인증 시 지인방 개설 및 500MB 파일 해금
                  </div>
                  {showVerifyBox ? (
                    <form onSubmit={handleVerifyCode} style={{ display: 'flex', gap: '6px', marginTop: '6px' }}>
                      <input
                        className="ht-input"
                        value={verifyCodeInput}
                        onChange={(e) => setVerifyCodeInput(e.target.value)}
                        placeholder="원내 인증코드 (예: WS-VIP-...)"
                      />
                      <button type="submit" className="ht-btn ht-btn-gold">
                        인증
                      </button>
                    </form>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setShowVerifyBox(true)}
                      className="ht-btn ht-btn-gold"
                      style={{ marginTop: '6px', width: '100%' }}
                    >
                      원내 비보험 인증코드 입력하기
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          <div className="ht-sidebar-actions">
            <input
              type="text"
              className="ht-input"
              value={roomQuery}
              onChange={(e) => setRoomQuery(e.target.value)}
              placeholder="대화방 검색..."
            />
            <div style={{ display: 'flex', gap: '6px' }}>
              <button
                type="button"
                onClick={() => {
                  if (!me?.canCreatePrivateRooms) {
                    setShowVerifyBox(true);
                    setNotice(
                      '새 지인 방 개설은 비보험 진료 후 인증된 화타펫 정회원에게 제공됩니다. 인증코드를 입력하거나 지인 초대 코드로 입장해 보세요.'
                    );
                    return;
                  }
                  setShowCreateRoomModal(true);
                }}
                className="ht-btn ht-btn-primary"
                style={{ flex: 1 }}
              >
                + 지인 방 만들기
              </button>
              <button
                type="button"
                onClick={() => setShowJoinModal(true)}
                className="ht-btn"
                style={{ flex: 1 }}
              >
                초대코드 입장
              </button>
            </div>
          </div>

          <div className="ht-room-list">
            {filteredRooms.map((r) => (
              <button
                key={r.roomId}
                type="button"
                onClick={() => {
                  setCurrentRoomId(r.roomId);
                  setMobileShowChat(true);
                }}
                className={`ht-room-item${currentRoomId === r.roomId ? ' is-active' : ''}`}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px' }}>
                  <span style={{ fontWeight: 800, fontSize: '14px', color: 'var(--ht-ink)' }}>
                    {r.roomName}
                  </span>
                  {r.unreadCount > 0 && <span className="ht-unread-pill">{r.unreadCount}</span>}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--ht-muted)', display: 'flex', justifyContent: 'space-between', gap: '6px' }}>
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {r.lastMessage ? `${r.lastMessage.sender}: ${r.lastMessage.text}` : r.description}
                  </span>
                  <span style={{ flexShrink: 0 }}>
                    {r.roomType === 'DM' ? '1:1' : r.isPublic ? '공개' : '지인'} {r.memberCount}
                  </span>
                </div>
              </button>
            ))}

            {friends.length > 0 && (
              <div style={{ marginTop: '10px', paddingTop: '10px', borderTop: '1px solid var(--ht-border)' }}>
                <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--ht-muted)', padding: '0 6px 6px' }}>
                  연결된 지인 ({friends.length})
                </div>
                {friends.map((f) => (
                  <div
                    key={f.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '8px',
                      padding: '6px',
                      borderRadius: '10px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
                      <AvatarBadge avatar={f.petAvatar} verified={f.isVerifiedNonInsured} seed={f.id} />
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: '13px', fontWeight: 700 }}>{f.name}</div>
                        <div style={{ fontSize: '11px', color: f.isOnline ? 'var(--ht-green)' : 'var(--ht-muted)' }}>
                          {f.isOnline ? '접속 중' : '오프라인'}
                        </div>
                      </div>
                    </div>
                    {me?.canCreatePrivateRooms && (
                      <button
                        type="button"
                        onClick={() => handleStartDm(f)}
                        className="ht-btn"
                        style={{ padding: '4px 8px', fontSize: '11px' }}
                      >
                        1:1
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </aside>

        {/* 중앙 채팅창 */}
        <section
          className={`ht-chat-pane${!mobileShowChat ? ' is-hidden-mobile' : ''}${isDragOver ? ' is-drag-over' : ''}`}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragOver(false);
            if (e.dataTransfer.files?.length) {
              handleFileUpload(e.dataTransfer.files);
            }
          }}
        >
          <header className="ht-chat-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
              <button
                type="button"
                onClick={() => setMobileShowChat(false)}
                className="ht-btn lg:hidden"
              >
                목록
              </button>
              <div style={{ minWidth: 0 }}>
                <h1 style={{ fontSize: '17px', fontWeight: 800, margin: 0 }}>
                  {currentRoom?.roomName || '화타톡'}
                </h1>
                <div style={{ fontSize: '12px', color: 'var(--ht-muted)', marginTop: '2px' }}>
                  온라인 {onlineMembers.length}명 / 초대코드 {currentRoom?.inviteCode}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
              <LiveHwataPetStage
                thinking={isDoctorTyping}
                happy={isPetHappy}
                onPet={triggerPetHappy}
              />
              <button
                type="button"
                onClick={() => {
                  const link = `${window.location.origin}/messenger?room=${encodeURIComponent(
                    currentRoomId
                  )}&invite=${encodeURIComponent(currentRoom?.inviteCode || '')}`;
                  navigator.clipboard?.writeText(link).catch(() => {});
                  setNotice('대화방 초대 링크를 복사했습니다. 지인에게 보내보세요!');
                }}
                className="ht-btn ht-btn-primary"
              >
                초대 링크 복사
              </button>
              <button
                type="button"
                onClick={() => setShowSearchBar((v) => !v)}
                className="ht-btn"
              >
                대화 검색
              </button>
              <button
                type="button"
                onClick={() => setShowFilesDrawer((v) => !v)}
                className="ht-btn"
              >
                공유 파일함
              </button>
              <button
                type="button"
                onClick={() => setSoundEnabled((v) => !v)}
                className="ht-btn"
              >
                {soundEnabled ? '알림음 켜짐' : '무음'}
              </button>
            </div>
          </header>

          {showSearchBar && (
            <div style={{ padding: '8px 16px', background: 'var(--ht-surface)', borderBottom: '1px solid var(--ht-border)', display: 'flex', gap: '8px' }}>
              <input
                className="ht-input"
                value={msgSearchQuery}
                onChange={(e) => setMsgSearchQuery(e.target.value)}
                placeholder="대화 내용 검색..."
              />
              <button type="button" onClick={() => setMsgSearchQuery('')} className="ht-btn">
                초기화
              </button>
            </div>
          )}

          {p2pOffers.length > 0 && (
            <div style={{ padding: '10px 16px', background: 'var(--ht-gold-bg)', borderBottom: '1px solid var(--ht-gold-border)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {p2pOffers.map((offer) => {
                let meta = { fileName: '파일', fileSize: 0 };
                try {
                  meta = JSON.parse(offer.payload);
                } catch {
                  // ignore
                }
                return (
                  <div key={offer.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', fontSize: '13px' }}>
                    <span>
                      P2P 무제한 직통 파일 수신 요청: <strong>{meta.fileName}</strong> ({formatBytes(meta.fileSize)})
                    </span>
                    <button
                      type="button"
                      onClick={() => handleAcceptP2P(offer)}
                      className="ht-btn ht-btn-gold"
                    >
                      수락 및 저장
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {p2pProgress && (
            <div style={{ padding: '8px 16px', background: 'var(--ht-green-bg)', fontSize: '12px', fontWeight: 700, color: 'var(--ht-green)' }}>
              P2P {p2pProgress.direction === 'send' ? '전송' : '수신'} 중: {p2pProgress.fileName} ({p2pProgress.percentage}% / {formatBytes(p2pProgress.loaded)})
            </div>
          )}

          <div ref={messagesContainerRef} className="ht-messages" aria-live="polite">
            {messages.map((m) => {
              const isMe = !m.isBot && m.userId === me?.id;
              const stickerDef = m.stickerCode ? stickers.find((s) => s.code === m.stickerCode) : null;
              return (
                <div
                  key={m.id}
                  className={`ht-msg-row${isMe ? ' is-me' : ''}${m.isBot ? ' is-bot' : ''}`}
                >
                  <AvatarBadge avatar={m.avatar} verified={m.isCracked && !m.isBot} seed={m.id} />
                  <div className="ht-msg-col">
                    <div className="ht-msg-meta">
                      <strong style={{ color: 'var(--ht-ink)' }}>{m.sender}</strong>
                      {m.isCracked && !m.isBot && (
                        <span className="ht-badge-verified">인증 화타펫</span>
                      )}
                      {m.isBot && <span className="ht-badge-verified">닥터 화타</span>}
                    </div>

                    <div className="ht-bubble">
                      {m.replyTo && (
                        <div className="ht-reply-quote">
                          <strong>{m.replyTo.sender}</strong>: {m.replyTo.text.slice(0, 60)}
                        </div>
                      )}

                      {stickerDef && (
                        <img
                          src={stickerDef.img}
                          alt={stickerDef.label}
                          className="ht-sticker-img"
                        />
                      )}

                      {m.text && <div>{m.text}</div>}

                      {m.attachments.map((att) => {
                        const isImg = att.mimeType.startsWith('image/');
                        const isVid = att.mimeType.startsWith('video/');
                        return (
                          <div key={att.id} style={{ marginTop: '8px' }}>
                            {isImg && (
                              <a href={att.url} target="_blank" rel="noopener noreferrer">
                                <img
                                  src={att.url}
                                  alt={att.fileName}
                                  style={{ maxWidth: '280px', maxHeight: '240px', borderRadius: '10px', display: 'block' }}
                                />
                              </a>
                            )}
                            {isVid && (
                              <video
                                controls
                                src={att.url}
                                style={{ maxWidth: '300px', maxHeight: '220px', borderRadius: '10px', display: 'block' }}
                              />
                            )}
                            <div className="ht-file-card">
                              <div style={{ minWidth: 0 }}>
                                <div style={{ fontSize: '13px', fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                  {att.fileName}
                                </div>
                                <div style={{ fontSize: '11px', color: 'var(--ht-muted)' }}>
                                  {formatBytes(att.sizeBytes)}
                                </div>
                              </div>
                              <a
                                href={`${att.url}?download=1`}
                                className="ht-btn ht-btn-primary"
                                style={{ padding: '5px 10px', fontSize: '11px', flexShrink: 0 }}
                              >
                                저장
                              </a>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="ht-msg-meta">
                      {m.unreadCount > 0 && (
                        <span style={{ color: 'var(--ht-gold)', fontWeight: 800 }}>
                          안읽음 {m.unreadCount}
                        </span>
                      )}
                      <span>
                        {new Date(m.createdAt).toLocaleTimeString('ko-KR', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                      <button
                        type="button"
                        onClick={() => setReplyTo({ id: m.id, sender: m.sender, text: m.text })}
                        className="ht-btn"
                        style={{ padding: '2px 6px', fontSize: '11px' }}
                      >
                        답장
                      </button>
                      {isMe && (
                        <button
                          type="button"
                          onClick={() => handleDeleteMsg(m.id)}
                          className="ht-btn"
                          style={{ padding: '2px 6px', fontSize: '11px' }}
                        >
                          삭제
                        </button>
                      )}
                    </div>

                    <div className="ht-reactions-row">
                      {m.reactions.map((r) => (
                        <button
                          key={r.emoji}
                          type="button"
                          onClick={() => handleReact(m.id, r.emoji)}
                          className={`ht-react-pill${r.mine ? ' is-mine' : ''}`}
                        >
                          {r.emoji} {r.count}
                        </button>
                      ))}
                      {REACTION_EMOJIS.slice(0, 3).map((em) => (
                        <button
                          key={em}
                          type="button"
                          onClick={() => handleReact(m.id, em)}
                          className="ht-react-pill"
                          title={`${em} 반응 남기기`}
                        >
                          {em}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
            {isDoctorTyping && (
              <div className="ht-msg-row is-bot">
                <AvatarBadge
                  avatar={{ species: 'dog', ear: 'round', costume: 'doctor', bg: 'gold' }}
                  seed="doctor-typing"
                  thinking
                />
                <div className="ht-msg-col">
                  <div className="ht-msg-meta">
                    <strong style={{ color: 'var(--ht-ink)' }}>닥터 화타</strong>
                    <span className="ht-badge-verified">닥터 화타</span>
                  </div>
                  <div className="ht-bubble">
                    <span>질문을 꼼꼼히 읽고 맞춤 임상 답변을 정리하고 있어요</span>
                    <span className="ht-typing-dots" aria-hidden="true">
                      <span />
                      <span />
                      <span />
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="ht-composer">
            {replyTo && (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', padding: '6px 10px', borderRadius: '8px', background: 'var(--ht-surface-soft)' }}>
                <span>
                  <strong>{replyTo.sender}</strong>님에게 답장: {replyTo.text.slice(0, 50)}
                </span>
                <button type="button" onClick={() => setReplyTo(null)} className="ht-btn" style={{ padding: '2px 8px' }}>
                  취소
                </button>
              </div>
            )}

            {uploadPercent !== null && (
              <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--ht-blue)' }}>
                파일 업로드 중... {uploadPercent}%
              </div>
            )}

            {showStickerPicker && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', padding: '8px', borderRadius: '12px', background: 'var(--ht-surface-soft)', border: '1px solid var(--ht-border)' }}>
                {stickers.map((st) => (
                  <button
                    key={st.code}
                    type="button"
                    onClick={() => {
                      setShowStickerPicker(false);
                      sendMessage({
                        text: st.label,
                        messageType: 'PET_STICKER',
                        stickerCode: st.code,
                      });
                    }}
                    className="ht-btn"
                    style={{ flexDirection: 'column', padding: '6px 10px' }}
                  >
                    <img src={st.img} alt={st.label} style={{ width: '44px', height: '44px', objectFit: 'contain' }} />
                    <span>{st.label}</span>
                  </button>
                ))}
              </div>
            )}

            {showP2PPicker && (
              <div style={{ padding: '10px', borderRadius: '12px', background: 'var(--ht-surface-warm)', border: '1px solid var(--ht-gold-border)', display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center', fontSize: '12px' }}>
                <strong>P2P 무제한 직통 대상 선택:</strong>
                {otherOnlineMembers.length === 0 ? (
                  <span>현재 이 방에 동시 접속한 지인이 없습니다.</span>
                ) : (
                  <>
                    <select
                      className="ht-input"
                      style={{ width: 'auto', minWidth: '160px' }}
                      value={p2pTargetUserId}
                      onChange={(e) => setP2PTargetUserId(e.target.value)}
                    >
                      <option value="">지인 선택...</option>
                      {otherOnlineMembers.map((om) => (
                        <option key={om.userId} value={om.userId}>
                          {om.name}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() => p2pInputRef.current?.click()}
                      className="ht-btn ht-btn-gold"
                    >
                      무제한 파일 선택 및 전송
                    </button>
                  </>
                )}
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              multiple
              style={{ display: 'none' }}
              onChange={(e) => {
                if (e.target.files) handleFileUpload(e.target.files);
                e.target.value = '';
              }}
            />
            <input
              ref={p2pInputRef}
              type="file"
              style={{ display: 'none' }}
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleP2PSendFile(f);
                e.target.value = '';
              }}
            />

            <div className="ht-composer-tools">
              <button type="button" onClick={() => fileInputRef.current?.click()} className="ht-btn">
                파일 전송 ({storageInfo.blobEnabled ? `최대 ${formatBytes(storageInfo.maxCloudBytes)}` : '3.5MB'})
              </button>
              <button
                type="button"
                onClick={() => setShowP2PPicker((v) => !v)}
                className="ht-btn ht-btn-gold"
              >
                P2P 무제한 직통
              </button>
              <button
                type="button"
                onClick={() => setShowStickerPicker((v) => !v)}
                className="ht-btn"
              >
                화타펫 스티커
              </button>
              <button
                type="button"
                onClick={() => {
                  setComposerText((t) => (t.startsWith('@화타') ? t : `@화타 ${t}`));
                  composerTextareaRef.current?.focus({ preventScroll: true });
                }}
                className="ht-btn"
              >
                @화타 질문
              </button>
            </div>

            <div className="ht-composer-row">
              <textarea
                ref={composerTextareaRef}
                rows={2}
                className="ht-textarea"
                value={composerText}
                onChange={(e) => setComposerText(e.target.value)}
                onPaste={(e) => {
                  const files = e.clipboardData?.files;
                  if (files && files.length > 0) {
                    e.preventDefault();
                    handleFileUpload(files);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                placeholder="지인과 대화하거나 파일을 끌어다 놓으세요 (Shift+Enter 줄바꿈)"
              />
              <button
                type="button"
                onClick={() => sendMessage()}
                className="ht-btn ht-btn-primary"
                style={{ padding: '12px 20px', fontSize: '14px', flexShrink: 0 }}
              >
                전송
              </button>
            </div>
          </div>
        </section>

        {/* 우측 공유 파일함 서랍 */}
        {showFilesDrawer && (
          <aside className="ht-drawer" aria-label="공유 파일함">
            <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--ht-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong style={{ fontSize: '15px' }}>공유 파일함 ({filteredFiles.length})</strong>
              <button type="button" onClick={() => setShowFilesDrawer(false)} className="ht-btn">
                닫기
              </button>
            </div>
            <div style={{ padding: '10px 14px', display: 'flex', gap: '6px', borderBottom: '1px solid var(--ht-border)' }}>
              {(['all', 'media', 'docs'] as const).map((k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => setFileFilter(k)}
                  className={`ht-btn${fileFilter === k ? ' ht-btn-primary' : ''}`}
                  style={{ flex: 1 }}
                >
                  {k === 'all' ? '전체' : k === 'media' ? '사진/영상' : '문서/기타'}
                </button>
              ))}
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {filteredFiles.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '32px 8px', color: 'var(--ht-muted)', fontSize: '13px' }}>
                  아직 공유된 파일이 없습니다.
                </div>
              ) : (
                filteredFiles.map((f) => (
                  <div key={f.id} className="ht-file-card" style={{ marginTop: 0 }}>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: '13px', fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {f.fileName}
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--ht-muted)' }}>
                        {formatBytes(f.sizeBytes)} {f.uploaderName ? `/ ${f.uploaderName}` : ''}
                      </div>
                    </div>
                    <a
                      href={`${f.url}?download=1`}
                      className="ht-btn ht-btn-primary"
                      style={{ padding: '5px 9px', fontSize: '11px' }}
                    >
                      받기
                    </a>
                  </div>
                ))
              )}
            </div>
          </aside>
        )}
      </div>

      {/* 새 지인 방 만들기 모달 */}
      {showCreateRoomModal && (
        <div className="ht-modal-backdrop" role="dialog" aria-modal="true" aria-label="새 지인 대화방 만들기">
          <div className="ht-modal">
            <h2 style={{ margin: '0 0 10px', fontSize: '19px', fontWeight: 800 }}>새 지인 대화방 만들기</h2>
            <p style={{ margin: '0 0 14px', fontSize: '13px', color: 'var(--ht-muted)' }}>
              인증된 화타펫 정회원 전용 대화방을 만들고 초대 링크로 로그인된 지인을 불러보세요.
            </p>
            <form onSubmit={handleCreateRoom} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input
                className="ht-input"
                value={newRoomName}
                onChange={(e) => setNewRoomName(e.target.value)}
                placeholder="대화방 이름 (예: 우리 가족 치아관리방)"
                required
              />
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
                <input
                  type="checkbox"
                  checked={newRoomPublic}
                  onChange={(e) => setNewRoomPublic(e.target.checked)}
                />
                <span>공개 Q&A 라운지 목록에도 함께 표시 (비체크 시 초대된 지인 전용)</span>
              </label>
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                <button type="button" onClick={() => setShowCreateRoomModal(false)} className="ht-btn">
                  취소
                </button>
                <button type="submit" className="ht-btn ht-btn-primary">
                  방 개설 및 링크 복사
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 초대 코드 입장 모달 */}
      {showJoinModal && (
        <div className="ht-modal-backdrop" role="dialog" aria-modal="true" aria-label="초대 코드로 입장">
          <div className="ht-modal">
            <h2 style={{ margin: '0 0 10px', fontSize: '19px', fontWeight: 800 }}>초대 코드로 지인 방 입장</h2>
            <form onSubmit={handleJoinRoom} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input
                className="ht-input"
                value={joinInviteInput}
                onChange={(e) => setJoinInviteInput(e.target.value)}
                placeholder="초대 코드 입력 (예: HT-ABC123)"
                required
              />
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                <button type="button" onClick={() => setShowJoinModal(false)} className="ht-btn">
                  취소
                </button>
                <button type="submit" className="ht-btn ht-btn-primary">
                  입장하기
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 내 화타펫 아바타 & 프로필 설정 모달 */}
      {showAvatarModal && (
        <div className="ht-modal-backdrop" role="dialog" aria-modal="true" aria-label="화타펫 프로필 설정">
          <div className="ht-modal">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h2 style={{ margin: 0, fontSize: '19px', fontWeight: 800 }}>내 화타펫 및 프로필 꾸미기</h2>
              <AvatarBadge avatar={editAvatar} verified={me?.isVerifiedNonInsured} large />
            </div>
            <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, display: 'block', marginBottom: '4px' }}>대화명</label>
                <input
                  className="ht-input"
                  value={editProfileName}
                  onChange={(e) => setEditProfileName(e.target.value)}
                />
              </div>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, display: 'block', marginBottom: '4px' }}>대화 ID (핸들)</label>
                <input
                  className="ht-input"
                  value={editProfileHandle}
                  onChange={(e) => setEditProfileHandle(e.target.value)}
                  placeholder="영문/숫자/밑줄 3자 이상"
                />
              </div>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, display: 'block', marginBottom: '4px' }}>상태 메시지</label>
                <input
                  className="ht-input"
                  value={editProfileStatus}
                  onChange={(e) => setEditProfileStatus(e.target.value)}
                  placeholder="오늘의 한 마디..."
                />
              </div>

              <div>
                <div style={{ fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>펫 캐릭터</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {SPECIES_LIST.map((sp) => (
                    <button
                      key={sp.key}
                      type="button"
                      onClick={() => setEditAvatar({ ...editAvatar, species: sp.key })}
                      className={`ht-btn${editAvatar.species === sp.key ? ' ht-btn-primary' : ''}`}
                    >
                      {sp.label}
                    </button>
                  ))}
                </div>
              </div>

              {editAvatar.species === 'dog' && (
                <>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>귀 모양</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {EAR_LIST.map((e) => (
                        <button
                          key={e.key}
                          type="button"
                          onClick={() => setEditAvatar({ ...editAvatar, ear: e.key })}
                          className={`ht-btn${editAvatar.ear === e.key ? ' ht-btn-primary' : ''}`}
                        >
                          {e.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>코스튬</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {COSTUME_LIST.map((c) => (
                        <button
                          key={c.key}
                          type="button"
                          onClick={() => setEditAvatar({ ...editAvatar, costume: c.key })}
                          className={`ht-btn${editAvatar.costume === c.key ? ' ht-btn-primary' : ''}`}
                        >
                          {c.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              <div>
                <div style={{ fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>배경 색상</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {BG_LIST.map((b) => (
                    <button
                      key={b.key}
                      type="button"
                      onClick={() => setEditAvatar({ ...editAvatar, bg: b.key })}
                      className={`ht-btn${editAvatar.bg === b.key ? ' ht-btn-primary' : ''}`}
                    >
                      {b.label}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '6px' }}>
                <button type="button" onClick={() => setShowAvatarModal(false)} className="ht-btn">
                  닫기
                </button>
                <button type="submit" className="ht-btn ht-btn-primary">
                  프로필 저장
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
