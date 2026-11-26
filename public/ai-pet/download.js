(() => {
  'use strict';

  function escapeHtml(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function assetUrl(file) {
    if (typeof location !== 'undefined' && /^https?:/.test(location.protocol)) {
      if (location.pathname.includes('/ai-pet')) {
        return '/ai-pet/assets3d/' + file;
      }
    }
    return './assets3d/' + file;
  }

  const MODE_LIST = [
    { key: 'clean', label: '클린 미니멀', shortLabel: '클린' },
    { key: 'pixel', label: '8비트 도트', shortLabel: '8비트' },
    { key: 'sd', label: '케이게임 캐릭터', shortLabel: '캐주얼' },
  ];

  const COSTUME_LIST = [
    { key: 'none', label: '기본 하야니' },
    { key: 'doctor', label: '닥터 가운' },
    { key: 'crown', label: 'VIP 왕관' },
  ];

  const BG_LIST = [
    { key: 'cream', label: '크림', hex: '#faf3e3' },
    { key: 'mint', label: '민트', hex: '#dff3ee' },
    { key: 'peach', label: '피치', hex: '#fce5dc' },
    { key: 'sky', label: '스카이', hex: '#e1f0fa' },
    { key: 'lavender', label: '라벤더', hex: '#ece6fa' },
    { key: 'gold', label: '골드', hex: '#fef08a' },
  ];

  function getValidMode(val) {
    return val === 'pixel' || val === 'sd' ? val : 'clean';
  }

  function loadSavedMode() {
    try {
      return getValidMode(localStorage.getItem('hwata_style_mode'));
    } catch {
      return 'clean';
    }
  }

  let currentStyleMode = loadSavedMode();
  document.documentElement.dataset.hwataMode = currentStyleMode;

  function getLabel(list, key) {
    const found = list.find((item) => item.key === key);
    return found ? found.label : key;
  }

  function normalizeCostume(c) {
    if (c === 'doctor' || c === 'hygiene') return 'doctor';
    if (c === 'crown' || c === 'angel' || c === 'beret') return 'crown';
    return 'none';
  }

  function sanitizeAvatar(raw) {
    const obj = raw && typeof raw === 'object' ? raw : {};
    const detectedMode =
      obj.mode === 'clean' || obj.mode === 'pixel' || obj.mode === 'sd'
        ? obj.mode
        : obj.ear === 'clean' || obj.ear === 'pixel' || obj.ear === 'sd'
          ? obj.ear
          : currentStyleMode;
    return {
      species: 'dog',
      ear: detectedMode,
      mode: detectedMode,
      costume: normalizeCostume(obj.costume),
      bg: BG_LIST.some((b) => b.key === obj.bg) ? obj.bg : 'cream',
    };
  }

  function getModeImageFile(mode, costume, isWave) {
    const m = getValidMode(mode);
    const c = normalizeCostume(costume);
    if (c === 'doctor') return `hwata_mode_${m}_doctor.png`;
    if (c === 'crown') return `hwata_mode_${m}_crown.png`;
    if (isWave) return `hwata_mode_${m}_wave.png`;
    return `hwata_mode_${m}.png`;
  }

  function buildAvatarInnerHtml(cfg, forceMode) {
    const a = sanitizeAvatar(cfg);
    const m = forceMode ? getValidMode(forceMode) : a.mode;
    const file = getModeImageFile(m, a.costume, false);
    const eyelids =
      m !== 'pixel'
        ? '<span class="hw-av-eyelid is-left"></span><span class="hw-av-eyelid is-right"></span>'
        : '';
    return `<div class="hw-av-motion-wrap"><img src="${assetUrl(file)}" class="hw-av-layer" alt="">${eyelids}</div>`;
  }

  function getDelayFromSeed(seed) {
    if (!seed) return '0s';
    let h = 0;
    const s = String(seed);
    for (let i = 0; i < s.length; i += 1) h = (h * 31 + s.charCodeAt(i)) | 0;
    return `-${((Math.abs(h) % 40) * 0.1).toFixed(1)}s`;
  }

  function createAvatarEl(cfg, sizeClass = '', isBot = false, forceMode, seed) {
    const a = sanitizeAvatar(cfg);
    const el = document.createElement('div');
    el.className = `hw-avatar ${sizeClass} hw-bg-${a.bg}${isBot ? ' bot' : ''}`.trim().replace(/\s+/g, ' ');
    el.style.setProperty('--hw-delay', getDelayFromSeed(seed));
    el.setAttribute('aria-hidden', 'true');
    el.innerHTML = buildAvatarInnerHtml(a, forceMode);
    return el;
  }

  function parseQueryAndHashParams() {
    const merged = new URLSearchParams(window.location.search);
    const hash = window.location.hash || '';
    const qIdx = hash.indexOf('?');
    if (qIdx !== -1) {
      const hashParams = new URLSearchParams(hash.slice(qIdx + 1));
      hashParams.forEach((v, k) => {
        if (!merged.has(k)) merged.set(k, v);
      });
    }
    return merged;
  }

  function getOrCreateGuestId() {
    let id = '';
    try {
      id = localStorage.getItem('hwata_guest_id') || '';
      if (!id) {
        id = 'g_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 8);
        localStorage.setItem('hwata_guest_id', id);
      }
    } catch {
      id = 'g_' + Math.random().toString(36).slice(2, 10);
    }
    return id;
  }

  function getJoinedRooms() {
    try {
      const raw = localStorage.getItem('hwata_joined_rooms');
      const arr = raw ? JSON.parse(raw) : [];
      return Array.isArray(arr) ? arr.map(String) : [];
    } catch {
      return [];
    }
  }

  function addJoinedRoom(roomId) {
    if (!roomId) return;
    try {
      const cur = getJoinedRooms();
      if (!cur.includes(roomId)) {
        cur.unshift(roomId);
        localStorage.setItem('hwata_joined_rooms', JSON.stringify(cur.slice(0, 20)));
      }
    } catch {}
  }

  function initViewToggle() {
    const btn = document.querySelector('[data-view-toggle]');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const d = document.documentElement;
      const next = d.dataset.view === 'mobile' ? 'desktop' : 'mobile';
      d.dataset.view = next;
      try {
        localStorage.setItem('hwata-view', next);
      } catch {}
    });
  }

  function initHeroMonitorLoop() {
    const box = document.getElementById('hero-demo-msgs');
    if (!box) return;
    const demos = [
      {
        uName: '교정 6개월차 환자',
        uText: '@화타 월치료 다녀온 지 3일짼데 딱딱한 거 언제부터 먹을 수 있나요?',
        pText: '와이어 교체 후 3~4일차가 정점이며 5일차부터 서서히 편해집니다. 미지근한 연두부·계란찜을 드시고 찬물 가글이 도움이 됩니다!',
      },
      {
        uName: '강남직장인_은지',
        uText: '컴퓨터하다 보면 어금니 꽉 깨무는데 턱이 뻐근해요 @화타 어떡하죠?',
        pText: '평소 윗니와 아랫니 사이에 2~3mm 틈을 두고 "은~" 발음으로 턱 힘을 빼보세요. 통증 시 3D 진단을 권장합니다.',
      },
      {
        uName: '스마일러 (VIP 정회원)',
        uText: '비보험 진료 인증코드 등록했더니 화타톡 대용량 파일 전송까지 바로 열리네요!',
        pText: '인증된 화타펫 정회원이 되신 것을 환영합니다! 프라이빗 단톡방과 화타톡 메신저를 자유롭게 이용해 보세요.',
      },
    ];
    let idx = 0;
    setInterval(() => {
      idx = (idx + 1) % demos.length;
      const d = demos[idx];
      box.innerHTML =
        `<div class="sw-mini-msg"><b>${escapeHtml(d.uName)}</b><span>${escapeHtml(d.uText)}</span></div>` +
        `<div class="sw-mini-msg pet"><b>닥터 화타 (33년 협진 자문)</b><span>${escapeHtml(d.pText)}</span></div>`;
    }, 5500);
  }

  let heroFrameIndex = 0;
  let heroIsDragging = false;
  let heroIdleWave = false;
  function updateHeroStageVisual() {
    const badge = document.getElementById('heroModeBadge');
    const img = document.getElementById('heroDioramaImg');
    const angleLabel = document.getElementById('heroAngleLabel');
    const range = document.getElementById('heroTurntableRange');

    if (badge) {
      badge.textContent =
        currentStyleMode === 'pixel'
          ? '8비트 도트 모드'
          : currentStyleMode === 'sd'
            ? '케이게임 캐릭터 모드'
            : '클린 미니멀 모드';
    }
    document.querySelectorAll('[data-brand-avatar]').forEach((el) => {
      el.setAttribute('src', assetUrl(getModeImageFile(currentStyleMode, 'none', false)));
    });
    document.querySelectorAll('[data-style-mode]').forEach((btn) => {
      btn.classList.toggle('is-active', btn.getAttribute('data-style-mode') === currentStyleMode);
    });

    const f = Math.max(0, Math.min(11, Number(heroFrameIndex || 0)));
    if (range && Number(range.value) !== f) range.value = String(f);
    if (angleLabel) {
      const degLabels = ['정면', '+10°', '+22°', '+32°', '+20°', '+8°', '정면', '-10°', '-22°', '-32°', '-20°', '-8°'];
      angleLabel.textContent = degLabels[f] || '정면';
    }
    if (img) {
      img.classList.toggle('is-idle-alive', !heroIsDragging && f === 0);
      if (f === 0) {
        img.src = assetUrl(getModeImageFile(currentStyleMode, 'none', heroIdleWave));
        img.style.transform = '';
      } else if (currentStyleMode === 'pixel') {
        const poseFile = f % 2 === 1 ? 'hwata_mode_pixel_wave.png' : 'hwata_mode_pixel.png';
        img.src = assetUrl(poseFile);
        const tilt = ((f - 6) * 2).toFixed(1);
        img.style.transform = `rotate(${tilt}deg)`;
      } else {
        const pad = String(f).padStart(2, '0');
        img.src = assetUrl(`hwata_3d_turn_${pad}.png`);
        img.style.transform = currentStyleMode === 'sd' ? 'scale(1.06)' : '';
      }
    }
  }

  function initHeroDioramaStage() {
    const viewport = document.getElementById('heroDioramaViewport');
    const range = document.getElementById('heroTurntableRange');

    if (range) {
      range.addEventListener('input', () => {
        heroFrameIndex = Number(range.value || 0);
        updateHeroStageVisual();
      });
    }

    if (viewport) {
      let startX = 0;
      let startFrame = 0;

      viewport.addEventListener('pointerdown', (e) => {
        if (e.target && e.target.tagName === 'INPUT') return;
        heroIsDragging = true;
        startX = e.clientX;
        startFrame = heroFrameIndex;
        updateHeroStageVisual();
        try { viewport.setPointerCapture(e.pointerId); } catch {}
      });
      viewport.addEventListener('pointermove', (e) => {
        if (!heroIsDragging) return;
        const dx = e.clientX - startX;
        const step = Math.round(dx / 24);
        heroFrameIndex = ((startFrame + step) % 12 + 12) % 12;
        updateHeroStageVisual();
      });
      const stopDrag = () => {
        heroIsDragging = false;
        updateHeroStageVisual();
      };
      viewport.addEventListener('pointerup', stopDrag);
      viewport.addEventListener('pointercancel', stopDrag);
    }

    setInterval(() => {
      if (!heroIsDragging && heroFrameIndex === 0) {
        heroIdleWave = true;
        updateHeroStageVisual();
        setTimeout(() => {
          heroIdleWave = false;
          updateHeroStageVisual();
        }, 1500);
      }
    }, 6400);

    updateHeroStageVisual();
  }

  let globalModeChangeHook = null;

  function setGlobalStyleMode(nextMode) {
    currentStyleMode = getValidMode(nextMode);
    document.documentElement.dataset.hwataMode = currentStyleMode;
    try {
      localStorage.setItem('hwata_style_mode', currentStyleMode);
    } catch {}
    updateHeroStageVisual();
    if (typeof globalModeChangeHook === 'function') {
      globalModeChangeHook(currentStyleMode);
    }
  }

  function initGlobalModeButtons() {
    document.querySelectorAll('[data-style-mode]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const next = btn.getAttribute('data-style-mode');
        if (next) setGlobalStyleMode(next);
      });
    });
    window.addEventListener('storage', (ev) => {
      if (ev.key === 'hwata_style_mode' && ev.newValue) {
        setGlobalStyleMode(ev.newValue);
      }
    });
    updateHeroStageVisual();
  }

  function initCommunityApp() {
    let currentRoomId = 'room_jaw_stretch';
    let lastMsgSignature = '';
    let myChartNo = '';
    let isCracked = false;
    let isAuthenticated = false;
    let roomPollTimer = null;
    let refPollTimer = null;
    let currentNickname = '';
    let myAvatar = { species: 'dog', ear: currentStyleMode, mode: currentStyleMode, costume: 'none', bg: 'cream' };

    try {
      myChartNo = localStorage.getItem('hwata_chart_no') || '';
      isCracked = localStorage.getItem('hwata_cracked') === 'true';
      currentNickname =
        localStorage.getItem('hwata_user_nickname') || '화타_' + Math.floor(Math.random() * 900 + 100);
      const savedAvatar = localStorage.getItem('hwata_avatar_v1');
      if (savedAvatar) {
        myAvatar = sanitizeAvatar(JSON.parse(savedAvatar));
        myAvatar.mode = currentStyleMode;
        myAvatar.ear = currentStyleMode;
      }
    } catch {
      currentNickname = '화타_' + Math.floor(Math.random() * 900 + 100);
    }

    const guestId = getOrCreateGuestId();

    const loginGateEl = document.getElementById('hwataLoginGate');
    const authStatusBar = document.getElementById('hwataAuthStatusBar');
    const authMemberLabel = document.getElementById('hwataAuthMemberLabel');
    const memberWorkspace = document.getElementById('hwataMemberWorkspace');

    function stopPolling() {
      if (roomPollTimer) {
        clearInterval(roomPollTimer);
        roomPollTimer = null;
      }
      if (refPollTimer) {
        clearInterval(refPollTimer);
        refPollTimer = null;
      }
    }

    function showLoginGate() {
      isAuthenticated = false;
      stopPolling();
      if (loginGateEl) loginGateEl.hidden = false;
      if (authStatusBar) authStatusBar.hidden = true;
      if (memberWorkspace) memberWorkspace.hidden = true;
    }

    function getMyRefCode() {
      return myChartNo ? 'HWATA-' + myChartNo.toUpperCase() : 'HWATA-' + guestId.slice(-6).toUpperCase();
    }

    function saveAvatar() {
      try {
        localStorage.setItem('hwata_avatar_v1', JSON.stringify(myAvatar));
      } catch {}
    }

    // DOM 요소
    const chartCrackInput = document.getElementById('chartCrackInput');
    const chartCrackBtn = document.getElementById('chartCrackBtn');
    const crackStatusPill = document.getElementById('crackStatusPill');
    const crackResultBox = document.getElementById('crackResultBox');

    const myAvatarPreview = document.getElementById('myAvatarPreview');
    const myAvatarSummaryText = document.getElementById('myAvatarSummaryText');
    const chatterNicknameInput = document.getElementById('chatterNicknameInput');
    const toggleAvatarStudioBtn = document.getElementById('toggleAvatarStudioBtn');
    const avatarStudioPanel = document.getElementById('avatarStudioPanel');
    const modePickerGrid = document.getElementById('modePickerGrid');
    const costumePickerGroup = document.getElementById('costumePickerGroup');
    const costumePickerGrid = document.getElementById('costumePickerGrid');
    const bgPickerGrid = document.getElementById('bgPickerGrid');

    const roomListContainer = document.getElementById('roomListContainer');
    const activeRoomCountBadge = document.getElementById('activeRoomCountBadge');
    const currentRoomTitle = document.getElementById('currentRoomTitle');
    const currentRoomDesc = document.getElementById('currentRoomDesc');
    const chatMessagesContainer = document.getElementById('chatMessagesContainer');
    const chatMessageInput = document.getElementById('chatMessageInput');
    const sendChatBtn = document.getElementById('sendChatBtn');
    const shareRoomInviteBtn = document.getElementById('shareRoomInviteBtn');

    const openCreateRoomBtn = document.getElementById('openCreateRoomBtn');
    const createRoomInlineBox = document.getElementById('createRoomInlineBox');
    const newRoomNameInput = document.getElementById('newRoomNameInput');
    const newRoomPublicCheck = document.getElementById('newRoomPublicCheck');
    const confirmCreateRoomBtn = document.getElementById('confirmCreateRoomBtn');
    const cancelCreateRoomBtn = document.getElementById('cancelCreateRoomBtn');

    const copyMyReferralBtn = document.getElementById('copyMyReferralBtn');
    const referralProgressText = document.getElementById('referralProgressText');
    const referralStampsRow = document.getElementById('referralStampsRow');
    const voucherDisplayBox = document.getElementById('voucherDisplayBox');

    // 아바타 스튜디오 & 미리보기 렌더링
    function renderMyAvatarPreview() {
      myAvatar.mode = currentStyleMode;
      myAvatar.ear = currentStyleMode;
      if (myAvatarPreview) {
        myAvatarPreview.className = `hw-avatar lg hw-bg-${myAvatar.bg}`;
        myAvatarPreview.innerHTML = buildAvatarInnerHtml(myAvatar, currentStyleMode);
      }
      if (myAvatarSummaryText) {
        const modeLabel = getLabel(MODE_LIST, currentStyleMode);
        const roleLabel = getLabel(COSTUME_LIST, myAvatar.costume);
        const bgLabel = getLabel(BG_LIST, myAvatar.bg);
        myAvatarSummaryText.textContent = `${modeLabel} · ${roleLabel} (${bgLabel})`;
      }
      if (costumePickerGroup) costumePickerGroup.hidden = false;
    }

    function renderAvatarStudioOptions() {
      if (modePickerGrid) {
        modePickerGrid.innerHTML = '';
        MODE_LIST.forEach((md) => {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'studio-opt-btn' + (currentStyleMode === md.key ? ' active' : '');
          btn.appendChild(
            createAvatarEl({ mode: md.key, costume: myAvatar.costume, bg: myAvatar.bg }, 'sm', false, md.key)
          );
          const lbl = document.createElement('span');
          lbl.textContent = md.label;
          btn.appendChild(lbl);
          btn.addEventListener('click', () => {
            setGlobalStyleMode(md.key);
          });
          modePickerGrid.appendChild(btn);
        });
      }

      if (costumePickerGrid) {
        costumePickerGrid.innerHTML = '';
        COSTUME_LIST.forEach((cs) => {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'studio-opt-btn' + (myAvatar.costume === cs.key ? ' active' : '');
          btn.appendChild(
            createAvatarEl({ mode: currentStyleMode, costume: cs.key, bg: myAvatar.bg }, 'sm', false, currentStyleMode)
          );
          const lbl = document.createElement('span');
          lbl.textContent = cs.label;
          btn.appendChild(lbl);
          btn.addEventListener('click', () => {
            myAvatar.costume = cs.key;
            saveAvatar();
            renderMyAvatarPreview();
            renderAvatarStudioOptions();
          });
          costumePickerGrid.appendChild(btn);
        });
      }

      if (bgPickerGrid) {
        bgPickerGrid.innerHTML = '';
        BG_LIST.forEach((bg) => {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'studio-bg-swatch' + (myAvatar.bg === bg.key ? ' active' : '');
          btn.style.backgroundColor = bg.hex;
          btn.title = bg.label;
          btn.textContent = myAvatar.bg === bg.key ? '✓' : '';
          btn.addEventListener('click', () => {
            myAvatar.bg = bg.key;
            saveAvatar();
            renderMyAvatarPreview();
            renderAvatarStudioOptions();
          });
          bgPickerGrid.appendChild(btn);
        });
      }
    }

    if (chatterNicknameInput) {
      chatterNicknameInput.value = currentNickname;
      chatterNicknameInput.addEventListener('input', () => {
        const v = chatterNicknameInput.value.trim().slice(0, 20);
        if (v) {
          currentNickname = v;
          try {
            localStorage.setItem('hwata_user_nickname', v);
          } catch {}
        }
      });
    }

    if (toggleAvatarStudioBtn && avatarStudioPanel) {
      toggleAvatarStudioBtn.addEventListener('click', () => {
        const isOpen = !avatarStudioPanel.hidden;
        avatarStudioPanel.hidden = isOpen;
        toggleAvatarStudioBtn.setAttribute('aria-expanded', String(!isOpen));
        toggleAvatarStudioBtn.textContent = isOpen ? '모드 & 스타일 변경' : '닫기';
      });
    }

    renderMyAvatarPreview();
    renderAvatarStudioOptions();

    globalModeChangeHook = () => {
      myAvatar.mode = currentStyleMode;
      myAvatar.ear = currentStyleMode;
      saveAvatar();
      renderMyAvatarPreview();
      renderAvatarStudioOptions();
      lastMsgSignature = '';
      if (isAuthenticated) loadMessages(false);
    };

    // 리퍼럴 보상 5칸 스탬프 UI 업데이트
    function updateReferralUI(invitedCount, voucherCode) {
      const count = Math.max(0, Number(invitedCount || 0));
      if (referralProgressText) {
        referralProgressText.textContent =
          count >= 5 ? `(${count} / 5명 달성 완료!)` : `(${count} / 5명 달성 · ${5 - count}명 남음)`;
      }
      if (referralStampsRow) {
        const stamps = referralStampsRow.querySelectorAll('.ref-stamp');
        stamps.forEach((el, i) => {
          if (i < count) el.classList.add('filled');
          else el.classList.remove('filled');
        });
      }
      if (voucherDisplayBox) {
        if (voucherCode) {
          voucherDisplayBox.hidden = false;
          voucherDisplayBox.innerHTML = `<span class="voucher-box">🎉 VIP 스페셜 아바타 & 프라이빗 패스 발급 완료: ${escapeHtml(voucherCode)}</span>`;
        } else {
          voucherDisplayBox.hidden = true;
        }
      }
    }

    async function refreshMyReferralStatus() {
      if (!isAuthenticated) return;
      try {
        const res = await fetch(
          `/api/ai-pet/room?action=referral_status&refCode=${encodeURIComponent(getMyRefCode())}`,
          { credentials: 'same-origin' }
        );
        if (res.status === 401) {
          showLoginGate();
          return;
        }
        const data = await res.json();
        if (data.ok) {
          updateReferralUI(data.invitedCount, data.voucherCode);
        }
      } catch {}
    }

    // 차트번호 정회원 인증 UI 상태 반영
    function applyCrackedState(chartNo, data) {
      myChartNo = chartNo;
      isCracked = true;
      if (chartCrackInput) chartCrackInput.value = chartNo;
      if (crackStatusPill) crackStatusPill.textContent = '👑 정회원 인증 완료';
      if (crackResultBox) {
        crackResultBox.hidden = false;
        const refCode = data?.inviteReferralCode || getMyRefCode();
        const msg =
          data?.message ||
          `[${chartNo}] 화이트스타일치과 33년 VIP 정회원 인증 완료! 프라이빗 단톡방 개설이 해금되었습니다.`;
        crackResultBox.innerHTML =
          `🎉 <b>${escapeHtml(msg)}</b><br>` +
          `<small>내 초대 코드: <b>${escapeHtml(refCode)}</b> · 지인 5명 초대 시 VIP 아바타 패스 해금!</small>`;
      }
      if (data && typeof data.invitedCount === 'number') {
        updateReferralUI(data.invitedCount, data.voucherCode);
      }
    }

    if (isCracked && myChartNo) {
      applyCrackedState(myChartNo, null);
    }

    if (chartCrackBtn && chartCrackInput) {
      chartCrackBtn.addEventListener('click', async () => {
        const val = chartCrackInput.value.trim();
        if (!val || val.length < 3) {
          alert('화이트스타일치과 차트번호를 3자리 이상 입력해 주세요. (진료 영수증·알림톡 참조)');
          chartCrackInput.focus();
          return;
        }

        chartCrackBtn.disabled = true;
        chartCrackBtn.textContent = '인증 중...';

        try {
          const res = await fetch('/api/ai-pet/verify-member', {
            method: 'POST',
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chartNo: val, mode: 'crack' }),
          });
          if (res.status === 401) {
            showLoginGate();
            alert('whitestyle.com 로그인 후 이용할 수 있습니다.');
            return;
          }
          const data = await res.json();
          if (data.ok && data.cracked) {
            try {
              localStorage.setItem('hwata_chart_no', data.chartNo);
              localStorage.setItem('hwata_cracked', 'true');
            } catch {}
            applyCrackedState(data.chartNo, data);
          } else {
            alert(data.message || '차트번호 확인에 실패했습니다.');
          }
        } catch {
          alert('서버와 통신 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
        } finally {
          chartCrackBtn.disabled = false;
          chartCrackBtn.textContent = '정회원 인증 & 전체 해금';
        }
      });
    }

    // 단톡방 목록 로드
    async function loadRooms() {
      if (!isAuthenticated) return;
      try {
        const joined = getJoinedRooms();
        if (currentRoomId && !joined.includes(currentRoomId)) joined.push(currentRoomId);
        const qs = joined.length ? `&roomIds=${encodeURIComponent(joined.join(','))}` : '';
        const res = await fetch(`/api/ai-pet/room?action=list${qs}`, { credentials: 'same-origin' });
        if (res.status === 401) {
          showLoginGate();
          return;
        }
        const data = await res.json();
        if (data.ok && Array.isArray(data.rooms)) {
          renderRooms(data.rooms);
        }
      } catch {}
    }

    function renderRooms(rooms) {
      if (!roomListContainer) return;
      roomListContainer.innerHTML = '';
      if (activeRoomCountBadge) {
        activeRoomCountBadge.textContent = `${rooms.length}개 LIVE`;
      }

      rooms.forEach((r) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'room-item-btn' + (r.roomId === currentRoomId ? ' active' : '');
        const lockIcon = r.isPublic === false ? '🔒 ' : '';
        btn.innerHTML =
          `<div class="room-item-title"><span>${lockIcon}${escapeHtml(r.roomName)}</span>` +
          `<span style="font-size:11px;color:var(--muted);">${Number(r.messageCount || 0)}건</span></div>` +
          `<div class="room-item-meta">${escapeHtml(r.description || '')}</div>`;
        btn.addEventListener('click', () => {
          document.querySelectorAll('.room-item-btn').forEach((b) => b.classList.remove('active'));
          btn.classList.add('active');
          switchRoom(r);
        });
        roomListContainer.appendChild(btn);
      });
    }

    function switchRoom(room) {
      currentRoomId = room.roomId;
      lastMsgSignature = '';
      addJoinedRoom(room.roomId);
      if (currentRoomTitle) currentRoomTitle.textContent = room.roomName || '화타 실시간 단톡방';
      if (currentRoomDesc) currentRoomDesc.textContent = room.description || '';
      loadMessages(true);
    }

    // 메시지 로드 및 렌더링
    async function loadMessages(forceScroll = false) {
      if (!chatMessagesContainer || !isAuthenticated) return;
      try {
        const res = await fetch(
          `/api/ai-pet/room?action=messages&roomId=${encodeURIComponent(currentRoomId)}`,
          { credentials: 'same-origin' }
        );
        if (res.status === 401) {
          showLoginGate();
          return;
        }
        const data = await res.json();
        if (data.ok && Array.isArray(data.messages)) {
          if (data.room) {
            if (currentRoomTitle) currentRoomTitle.textContent = data.room.roomName;
            if (currentRoomDesc) currentRoomDesc.textContent = data.room.description || '';
          }
          const lastId = data.messages.length ? data.messages[data.messages.length - 1].id : 'empty';
          const sig = `${currentRoomId}:${data.messages.length}:${lastId}`;
          if (sig !== lastMsgSignature) {
            const wasNearBottom =
              chatMessagesContainer.scrollHeight - chatMessagesContainer.scrollTop - chatMessagesContainer.clientHeight < 90;
            lastMsgSignature = sig;
            renderMessages(data.messages, forceScroll || wasNearBottom);
          }
        }
      } catch {}
    }

    function renderMessages(messages, scrollToBottom) {
      if (!chatMessagesContainer) return;
      chatMessagesContainer.innerHTML = '';

      messages.forEach((m) => {
        const isBot = Boolean(m.isBot);
        const isMe = !isBot && m.sender === currentNickname;

        const row = document.createElement('div');
        row.className = `chat-row ${isBot ? 'bot' : isMe ? 'me' : 'other'}`;

        const avEl = createAvatarEl(
          m.avatar || { mode: currentStyleMode, costume: isBot ? 'doctor' : 'none', bg: isBot ? 'gold' : 'cream' },
          '',
          isBot,
          currentStyleMode,
          m.id || m.createdAt
        );
        row.appendChild(avEl);

        const col = document.createElement('div');
        col.className = 'chat-msg-col';

        const senderRow = document.createElement('div');
        senderRow.className = 'chat-sender-row';
        const nameSpan = document.createElement('span');
        nameSpan.textContent = m.sender || '익명 화타';
        senderRow.appendChild(nameSpan);

        if (m.isCracked && !isBot) {
          const vipTag = document.createElement('span');
          vipTag.className = 'vip-mini-tag';
          vipTag.textContent = '👑 VIP';
          senderRow.appendChild(vipTag);
        }

        const bubble = document.createElement('div');
        bubble.className = 'chat-bubble';
        bubble.innerHTML = escapeHtml(m.text).replace(/\n/g, '<br>');

        const timeSpan = document.createElement('span');
        timeSpan.className = 'chat-time';
        timeSpan.textContent = m.createdAt
          ? new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          : '';

        col.appendChild(senderRow);
        col.appendChild(bubble);
        col.appendChild(timeSpan);
        row.appendChild(col);
        chatMessagesContainer.appendChild(row);
      });

      if (scrollToBottom) {
        chatMessagesContainer.scrollTo({ top: chatMessagesContainer.scrollHeight, behavior: 'smooth' });
      }
    }

    async function sendMessage(overrideText) {
      if (!chatMessageInput || !isAuthenticated) {
        showLoginGate();
        return;
      }
      const text = (typeof overrideText === 'string' ? overrideText : chatMessageInput.value).trim();
      if (!text) return;

      if (typeof overrideText !== 'string') chatMessageInput.value = '';
      if (sendChatBtn) sendChatBtn.disabled = true;

      const isDoctorCall = text.includes('@화타') || text.includes('화타야') || text.includes('닥터화타');
      const hasDentalQuestion =
        /[?？]/.test(text) &&
        /치과|치아|턱|교정|이빨|라미네이트|임플란트|스케일링|마취|통증|시려|시린|미백|수능|수험생|수험표|충치|사랑니|잇몸|신경치료|치실|치간칫솔|보철/.test(
          text
        );

      if (chatMessagesContainer) {
        const tempRow = document.createElement('div');
        tempRow.className = 'chat-row me';
        tempRow.appendChild(createAvatarEl(myAvatar, '', false, currentStyleMode, 'me-temp'));
        const tempCol = document.createElement('div');
        tempCol.className = 'chat-msg-col';
        tempCol.innerHTML = `<div class="chat-sender-row"><span>${escapeHtml(currentNickname)}</span></div><div class="chat-bubble">${escapeHtml(text)}</div>`;
        tempRow.appendChild(tempCol);
        chatMessagesContainer.appendChild(tempRow);

        if (isDoctorCall || hasDentalQuestion) {
          const typingRow = document.createElement('div');
          typingRow.className = 'chat-row bot';
          typingRow.appendChild(
            createAvatarEl({ mode: currentStyleMode, costume: 'doctor', bg: 'gold' }, '', true, currentStyleMode, 'doc-temp')
          );
          const typingCol = document.createElement('div');
          typingCol.className = 'chat-msg-col';
          typingCol.innerHTML =
            '<div class="chat-sender-row"><span>닥터 화타</span></div>' +
            '<div class="chat-bubble">질문을 꼼꼼히 읽고 맞춤 임상 답변을 정리하고 있어요<span class="hw-typing-dots"><span></span><span></span><span></span></span></div>';
          typingRow.appendChild(typingCol);
          chatMessagesContainer.appendChild(typingRow);
        }
        chatMessagesContainer.scrollTo({ top: chatMessagesContainer.scrollHeight, behavior: 'smooth' });
      }

      try {
        const res = await fetch('/api/ai-pet/room', {
          method: 'POST',
          credentials: 'same-origin',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'send',
            roomId: currentRoomId,
            sender: currentNickname,
            text,
            chartNo: myChartNo || null,
            isCracked,
            avatar: myAvatar,
          }),
        });
        if (res.status === 401) {
          showLoginGate();
          return;
        }
        const data = await res.json();
        if (data.ok && Array.isArray(data.recentMessages)) {
          const lastId = data.recentMessages.length
            ? data.recentMessages[data.recentMessages.length - 1].id
            : 'empty';
          lastMsgSignature = `${currentRoomId}:${data.recentMessages.length}:${lastId}`;
          renderMessages(data.recentMessages, true);
        } else if (data.ok) {
          loadMessages(true);
        }
      } catch {
      } finally {
        if (sendChatBtn) sendChatBtn.disabled = false;
        chatMessageInput.focus({ preventScroll: true });
      }
    }

    if (sendChatBtn) sendChatBtn.addEventListener('click', () => sendMessage());
    if (chatMessageInput) {
      chatMessageInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          sendMessage();
        }
      });
    }

    document.querySelectorAll('[data-quick-msg]').forEach((chip) => {
      chip.addEventListener('click', () => {
        const q = chip.getAttribute('data-quick-msg') || '';
        if (q) sendMessage(q);
      });
    });

    function buildInviteUrl() {
      return `${window.location.origin}/ai-pet?room=${encodeURIComponent(currentRoomId)}&ref=${encodeURIComponent(getMyRefCode())}#community`;
    }

    function copyWithFallback(url, msg) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard
          .writeText(url)
          .then(() => alert(msg))
          .catch(() => prompt('아래 초대 링크를 복사해 주세요:', url));
      } else {
        prompt('아래 초대 링크를 복사해 주세요:', url);
      }
    }

    if (shareRoomInviteBtn) {
      shareRoomInviteBtn.addEventListener('click', () => {
        copyWithFallback(
          buildInviteUrl(),
          '🔗 단톡방 지인 초대 링크가 복사되었습니다!\n지인들에게 링크를 공유해 함께 대화해 보세요.'
        );
      });
    }

    if (copyMyReferralBtn) {
      copyMyReferralBtn.addEventListener('click', () => {
        copyWithFallback(
          buildInviteUrl(),
          `🎁 내 초대 링크(${getMyRefCode()})가 복사되었습니다!\n지인 5명 초대 시 VIP 스페셜 아바타 패스가 자동 해금됩니다.`
        );
      });
    }

    // 인라인 새 친구 단톡방 개설 UI
    if (openCreateRoomBtn && createRoomInlineBox) {
      openCreateRoomBtn.addEventListener('click', () => {
        createRoomInlineBox.hidden = !createRoomInlineBox.hidden;
        if (!createRoomInlineBox.hidden && newRoomNameInput) {
          newRoomNameInput.focus();
        }
      });
    }

    if (cancelCreateRoomBtn && createRoomInlineBox) {
      cancelCreateRoomBtn.addEventListener('click', () => {
        createRoomInlineBox.hidden = true;
      });
    }

    if (confirmCreateRoomBtn && newRoomNameInput) {
      confirmCreateRoomBtn.addEventListener('click', async () => {
        const name = newRoomNameInput.value.trim();
        if (!name) {
          alert('단톡방 이름을 입력해 주세요.');
          newRoomNameInput.focus();
          return;
        }
        confirmCreateRoomBtn.disabled = true;
        try {
          const res = await fetch('/api/ai-pet/room', {
            method: 'POST',
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              action: 'create',
              roomName: name,
              chartNo: myChartNo || null,
              hostNickname: currentNickname,
              isPublic: Boolean(newRoomPublicCheck && newRoomPublicCheck.checked),
              refCode: getMyRefCode(),
            }),
          });
          if (res.status === 401) {
            showLoginGate();
            alert('whitestyle.com 로그인 후 단톡방을 개설할 수 있습니다.');
            return;
          }
          const data = await res.json();
          if (data.ok && data.room) {
            newRoomNameInput.value = '';
            if (createRoomInlineBox) createRoomInlineBox.hidden = true;
            addJoinedRoom(data.room.roomId);
            switchRoom(data.room);
            loadRooms();
            copyWithFallback(
              data.inviteLink || buildInviteUrl(),
              `🎉 [${data.room.roomName}] 단톡방이 개설되고 초대 링크가 복사되었습니다!`
            );
          } else {
            alert(data.message || '단톡방 개설에 실패했습니다.');
          }
        } catch {
          alert('단톡방 개설 중 오류가 발생했습니다.');
        } finally {
          confirmCreateRoomBtn.disabled = false;
        }
      });
    }

    // URL 파라미터 (?room=... &ref=...) 처리
    const params = parseQueryAndHashParams();
    const roomParam = params.get('room');
    const refParam = params.get('ref');

    if (roomParam) {
      currentRoomId = roomParam;
      addJoinedRoom(roomParam);
    }

    async function checkAuthAndBoot() {
      try {
        const res = await fetch('/api/ai-pet/session', { credentials: 'same-origin' });
        const data = await res.json();
        if (!data || !data.authenticated || !data.user) {
          showLoginGate();
          return;
        }

        isAuthenticated = true;
        if (loginGateEl) loginGateEl.hidden = true;
        if (authStatusBar) authStatusBar.hidden = false;
        if (memberWorkspace) memberWorkspace.hidden = false;

        const memberDisplay = (data.user.name || (data.user.email || '').split('@')[0] || '회원').trim();
        if (authMemberLabel) {
          authMemberLabel.textContent = `${memberDisplay}님 (${data.user.email}) · 화타펫 실시간 통신 연결됨`;
        }
        if (!currentNickname || currentNickname.startsWith('화타_')) {
          currentNickname = memberDisplay.slice(0, 20);
          if (chatterNicknameInput) chatterNicknameInput.value = currentNickname;
          try {
            localStorage.setItem('hwata_user_nickname', currentNickname);
          } catch {}
        }

        if (refParam && refParam !== getMyRefCode()) {
          fetch('/api/ai-pet/room', {
            method: 'POST',
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'referral', refCode: refParam, guestId }),
          }).catch(() => {});
        }

        await loadRooms();
        await loadMessages(true);
        await refreshMyReferralStatus();
        stopPolling();
        roomPollTimer = setInterval(() => loadMessages(false), 3500);
        refPollTimer = setInterval(refreshMyReferralStatus, 20000);
      } catch {
        showLoginGate();
      }
    }

    checkAuthAndBoot();
  }

  initViewToggle();
  initGlobalModeButtons();
  initHeroDioramaStage();
  initHeroMonitorLoop();
  initCommunityApp();
})();
