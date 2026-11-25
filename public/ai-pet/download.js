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
    { key: 'small', label: '아기 귀' },
    { key: 'fox', label: '여우 귀' },
    { key: 'lynx', label: '스라소니' },
    { key: 'mismatch', label: '짝짝이' },
    { key: 'outtilt', label: '옆뻗 귀' },
    { key: 'intilt', label: '안기울 귀' },
    { key: 'darktip', label: '초코끝' },
    { key: 'whitetip', label: '하얀끝' },
    { key: 'tnr', label: '컷팅 귀' },
  ];

  const COSTUME_LIST = [
    { key: 'none', label: '내 귀 유지' },
    { key: 'doctor', label: '의사 가운' },
    { key: 'crown', label: 'VIP 왕관' },
    { key: 'angel', label: '수호천사' },
    { key: 'beret', label: '베레모' },
    { key: 'coder', label: '개발자' },
    { key: 'hygiene', label: '위생사' },
  ];

  const BG_LIST = [
    { key: 'cream', label: '크림', hex: '#faf3e3' },
    { key: 'mint', label: '민트', hex: '#dff3ee' },
    { key: 'peach', label: '피치', hex: '#fce5dc' },
    { key: 'sky', label: '스카이', hex: '#e1f0fa' },
    { key: 'lavender', label: '라벤더', hex: '#ece6fa' },
    { key: 'gold', label: '골드', hex: '#f9e498' },
  ];

  function getLabel(list, key) {
    const found = list.find((item) => item.key === key);
    return found ? found.label : key;
  }

  function sanitizeAvatar(raw) {
    const obj = raw && typeof raw === 'object' ? raw : {};
    return {
      species: SPECIES_LIST.some((s) => s.key === obj.species) ? obj.species : 'dog',
      ear: EAR_LIST.some((e) => e.key === obj.ear) ? obj.ear : 'perk',
      costume: COSTUME_LIST.some((c) => c.key === obj.costume) ? obj.costume : 'none',
      bg: BG_LIST.some((b) => b.key === obj.bg) ? obj.bg : 'cream',
    };
  }

  function buildAvatarInnerHtml(cfg) {
    const a = sanitizeAvatar(cfg);
    if (a.species === 'dog' && a.costume === 'none') {
      return (
        `<img src="${assetUrl('hwata_3d_idle.png')}" class="hw-av-layer" alt="">` +
        `<img src="${assetUrl('hwata_3d_ear_' + a.ear + '.png')}" class="hw-av-layer hw-av-ear" alt="">`
      );
    }
    if (a.species === 'dog' && a.costume !== 'none') {
      return `<img src="${assetUrl('hwata_3d_costume_' + a.costume + '.png')}" class="hw-av-layer" alt="">`;
    }
    return `<img src="${assetUrl('hwata_3d_species_' + a.species + '.png')}" class="hw-av-layer" alt="">`;
  }

  function createAvatarEl(cfg, sizeClass = '', isBot = false) {
    const a = sanitizeAvatar(cfg);
    const el = document.createElement('div');
    el.className = `hw-avatar ${sizeClass} hw-bg-${a.bg}${isBot ? ' bot' : ''}`.trim().replace(/\s+/g, ' ');
    el.setAttribute('aria-hidden', 'true');
    el.innerHTML = buildAvatarInnerHtml(a);
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
        uName: '여우귀 하야니',
        uText: '모니터 보다가 어금니 꽉 깨물었어 @화타 어떡해?',
        pText: '윗니와 아랫니 사이 2~3mm 틈을 두고 "은~" 발음으로 턱 힘을 빼주세요!',
      },
      {
        uName: '치즈냥 유저',
        uText: '비보험 진료 인증코드 등록했더니 화타톡 대용량 파일 전송까지 바로 열리네요!',
        pText: '인증된 화타펫 정회원이 되신 것을 환영합니다! 프라이빗 단톡방과 화타톡 메신저를 자유롭게 이용해 보세요.',
      },
      {
        uName: '코코아 아바타',
        uText: '정회원 인증 완료! @화타 교정 월치료 후 뻐근한 건 며칠 정도 가나요?',
        pText: '와이어 교체 후 3~4일차가 정점이며 5일차부터 서서히 편해집니다. 찬물 가글을 권장해요!',
      },
    ];
    let idx = 0;
    setInterval(() => {
      idx = (idx + 1) % demos.length;
      const d = demos[idx];
      box.innerHTML =
        `<div class="m u"><b>${escapeHtml(d.uName)}</b><span>${escapeHtml(d.uText)}</span></div>` +
        `<div class="m p"><b>🐾 닥터 화타</b><span>${escapeHtml(d.pText)}</span></div>`;
    }, 5500);
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
    let myAvatar = { species: 'dog', ear: 'perk', costume: 'none', bg: 'cream' };

    try {
      myChartNo = localStorage.getItem('hwata_chart_no') || '';
      isCracked = localStorage.getItem('hwata_cracked') === 'true';
      currentNickname =
        localStorage.getItem('hwata_user_nickname') || '화타_' + Math.floor(Math.random() * 900 + 100);
      const savedAvatar = localStorage.getItem('hwata_avatar_v1');
      if (savedAvatar) myAvatar = sanitizeAvatar(JSON.parse(savedAvatar));
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
    const speciesPickerGrid = document.getElementById('speciesPickerGrid');
    const earPickerGroup = document.getElementById('earPickerGroup');
    const earPickerGrid = document.getElementById('earPickerGrid');
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
      if (myAvatarPreview) {
        myAvatarPreview.className = `hw-avatar lg hw-bg-${myAvatar.bg}`;
        myAvatarPreview.innerHTML = buildAvatarInnerHtml(myAvatar);
      }
      if (myAvatarSummaryText) {
        const spLabel = getLabel(SPECIES_LIST, myAvatar.species);
        const bgLabel = getLabel(BG_LIST, myAvatar.bg);
        if (myAvatar.species === 'dog') {
          const detail =
            myAvatar.costume === 'none'
              ? getLabel(EAR_LIST, myAvatar.ear)
              : getLabel(COSTUME_LIST, myAvatar.costume);
          myAvatarSummaryText.textContent = `${spLabel} (${detail} / ${bgLabel})`;
        } else {
          myAvatarSummaryText.textContent = `${spLabel} (${bgLabel})`;
        }
      }
      if (earPickerGroup) earPickerGroup.hidden = myAvatar.species !== 'dog';
      if (costumePickerGroup) costumePickerGroup.hidden = myAvatar.species !== 'dog';
    }

    function renderAvatarStudioOptions() {
      if (speciesPickerGrid) {
        speciesPickerGrid.innerHTML = '';
        SPECIES_LIST.forEach((sp) => {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'studio-opt-btn' + (myAvatar.species === sp.key ? ' active' : '');
          btn.appendChild(createAvatarEl({ species: sp.key, ear: myAvatar.ear, costume: 'none', bg: myAvatar.bg }, 'sm'));
          const lbl = document.createElement('span');
          lbl.textContent = sp.label;
          btn.appendChild(lbl);
          btn.addEventListener('click', () => {
            myAvatar.species = sp.key;
            saveAvatar();
            renderMyAvatarPreview();
            renderAvatarStudioOptions();
          });
          speciesPickerGrid.appendChild(btn);
        });
      }

      if (earPickerGrid) {
        earPickerGrid.innerHTML = '';
        EAR_LIST.forEach((er) => {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className =
            'studio-opt-btn' + (myAvatar.costume === 'none' && myAvatar.ear === er.key ? ' active' : '');
          btn.appendChild(createAvatarEl({ species: 'dog', ear: er.key, costume: 'none', bg: myAvatar.bg }, 'sm'));
          const lbl = document.createElement('span');
          lbl.textContent = er.label;
          btn.appendChild(lbl);
          btn.addEventListener('click', () => {
            myAvatar.species = 'dog';
            myAvatar.costume = 'none';
            myAvatar.ear = er.key;
            saveAvatar();
            renderMyAvatarPreview();
            renderAvatarStudioOptions();
          });
          earPickerGrid.appendChild(btn);
        });
      }

      if (costumePickerGrid) {
        costumePickerGrid.innerHTML = '';
        COSTUME_LIST.forEach((cs) => {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'studio-opt-btn' + (myAvatar.costume === cs.key ? ' active' : '');
          btn.appendChild(createAvatarEl({ species: 'dog', ear: myAvatar.ear, costume: cs.key, bg: myAvatar.bg }, 'sm'));
          const lbl = document.createElement('span');
          lbl.textContent = cs.label;
          btn.appendChild(lbl);
          btn.addEventListener('click', () => {
            myAvatar.species = 'dog';
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
        toggleAvatarStudioBtn.textContent = isOpen ? '아바타 꾸미기 열기' : '아바타 꾸미기 닫기';
      });
    }

    renderMyAvatarPreview();
    renderAvatarStudioOptions();

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
          m.avatar || { species: 'dog', ear: 'perk', costume: isBot ? 'doctor' : 'none', bg: isBot ? 'gold' : 'cream' },
          '',
          isBot
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
        chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
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
        chatMessageInput.focus();
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
  initHeroMonitorLoop();
  initCommunityApp();
})();
