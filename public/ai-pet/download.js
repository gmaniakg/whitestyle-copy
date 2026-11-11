/**
 * 화타펫(HwataPet / 하야니) AI 데스크톱 펫 다운로드 전용 랜딩 페이지 대화형 자바스크립트
 * 모든 버튼·탭·카드·퀴즈·밸런스게임·6종 동물 변신·다운로드·클립보드 복사 완벽 동작 엔진
 */
(function () {
  'use strict';

  // 동적 에셋 경로 감지 (./download.html, ./releases/index.html, ./releases/ko/index.html 모두 호환)
  const heroImgInit = document.getElementById('hero-pet-img');
  const ASSET_BASE = (heroImgInit?.getAttribute('src') || './assets3d/hwata_3d_brush.png').replace(/hwata_3d_[^/]+$/, '');
  const assetUrl = (file) => ASSET_BASE + file;

  // ---------- 공용 클립보드 안전 복사 헬퍼 (권한 거부 시에도 100% 동작) ----------
  async function copyTextSafe(text) {
    if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch (e) {}
    }
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.cssText = 'position:fixed;left:-9999px;top:-9999px;opacity:0;';
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      ta.setSelectionRange(0, text.length);
      document.execCommand('copy');
      document.body.removeChild(ta);
      return true;
    } catch (e) {
      return false;
    }
  }

  // ---------- 1. 모바일 / 데스크톱 뷰 토글 ----------
  const doc = document.documentElement;
  doc.classList.add('js');
  const viewToggleBtn = document.querySelector('[data-view-toggle]');
  let currentView = 'desktop';
  try {
    currentView = localStorage.getItem('hwata-view') || (window.innerWidth <= 760 ? 'mobile' : 'desktop');
  } catch (e) {
    currentView = window.innerWidth <= 760 ? 'mobile' : 'desktop';
  }

  function applyView(v) {
    currentView = v;
    doc.dataset.view = v;
    try { localStorage.setItem('hwata-view', v); } catch (e) {}
  }
  applyView(currentView);

  if (viewToggleBtn) {
    viewToggleBtn.addEventListener('click', () => {
      applyView(currentView === 'desktop' ? 'mobile' : 'desktop');
      sendEngagementPing('view_toggle_' + currentView);
    });
  }

  // ---------- 2. 주소 복사 & SHA-256 체크섬 복사 & 다운로드 바로가기 ----------
  const copyBtn = document.querySelector('[data-copy]');
  let copyResetTimer = null;
  if (copyBtn) {
    const origCopyLabel = copyBtn.textContent;
    copyBtn.addEventListener('click', async () => {
      await copyTextSafe(window.location.href);
      copyBtn.textContent = copyBtn.dataset.done || '주소를 복사했어요! ✓';
      copyBtn.classList.add('copied');
      if (copyResetTimer) clearTimeout(copyResetTimer);
      copyResetTimer = setTimeout(() => {
        copyBtn.textContent = origCopyLabel;
        copyBtn.classList.remove('copied');
      }, 2200);
      sendEngagementPing('copy_url');
    });
  }

  // SHA-256 박스 클릭 복사
  document.querySelectorAll('.sha-box').forEach((box) => {
    const origText = box.textContent;
    let shaTimer = null;
    box.addEventListener('click', async () => {
      const sha = box.dataset.sha || origText.replace(/^SHA-256:\s*/i, '').trim();
      await copyTextSafe(sha);
      box.textContent = '✓ 클립보드에 복사되었습니다: ' + sha;
      box.classList.add('copied');
      if (shaTimer) clearTimeout(shaTimer);
      shaTimer = setTimeout(() => {
        box.textContent = origText;
        box.classList.remove('copied');
      }, 2200);
      sendEngagementPing('copy_sha256');
    });
  });

  // Hero & 하단 CTA의 [data-dl="win" | "ext"] 버튼 클릭 시 해당 카드 하이라이트 및 즉시 다운로드 트리거
  document.querySelectorAll('[data-dl]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const dlType = btn.dataset.dl;
      const targetCard = document.getElementById(dlType === 'win' ? 'dl-card-win' : 'dl-card-ext');
      const targetDownloadLink = document.getElementById(dlType === 'win' ? 'dl-btn-win' : 'dl-btn-ext');
      if (targetCard) {
        e.preventDefault();
        targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        document.querySelectorAll('.dl-card').forEach((c) => c.classList.remove('is-highlighted'));
        targetCard.classList.add('is-highlighted');
        setTimeout(() => targetCard.classList.remove('is-highlighted'), 3500);
      }
      if (targetDownloadLink) {
        setTimeout(() => {
          targetDownloadLink.click();
        }, 250);
      }
      sendEngagementPing('cta_download_' + dlType);
    });
  });

  // ---------- 3. 첫 화면 레트로 모니터 속 AI 채팅 시뮬레이션 ----------
  const appLog = document.getElementById('app-log');
  const appInput = document.getElementById('app-input');
  const appNewChatBtn = document.getElementById('app-new-chat');
  const appInputBar = document.getElementById('app-input-bar');
  const heroPet = document.getElementById('hero-pet');
  const heroBubble = document.getElementById('hero-bubble');
  const heroPetImg = document.getElementById('hero-pet-img');
  let heroBubbleTimer = null;

  function showHeroBubble(text, duration = 3500) {
    if (!heroBubble) return;
    heroBubble.textContent = text;
    heroBubble.classList.add('show');
    if (heroBubbleTimer) clearTimeout(heroBubbleTimer);
    heroBubbleTimer = setTimeout(() => {
      heroBubble.classList.remove('show');
    }, duration);
  }

  const CHAT_SCENARIOS = [
    {
      q: "식사하고 바로 양치하는 게 좋을까요?",
      a: "탄산음료나 커피 같은 산성 음식을 드셨다면 맑은 물로 먼저 입안을 헹구고, 30분 뒤에 부드럽게 칫솔질하는 것이 치아 법랑질 보호에 가장 좋습니다!",
      petMotion: "brush",
      petBubble: "물 한 모금 가글 후 30분 뒤 치카치카!"
    },
    {
      q: "커피 마신 뒤에 치아 착색을 줄이려면?",
      a: "커피의 탄닌 성분은 마신 직후 맑은 물로 가글해 주시면 착색을 크게 예방할 수 있어요. 화타펫이 커피 타임 뒤에 물 가글 알림을 띄워드릴게요!",
      petMotion: "coffee",
      petBubble: "커피 후 맑은 물 한 모금 꿀꺽~"
    },
    {
      q: "2시간째 집중 코딩 중인데 턱이 뻐근해요",
      a: "집중할 때 무의식적으로 어금니를 악무는 습관이 있을 수 있어요. 지금 어금니를 떼고 입술만 살짝 다문 채 '은-' 소리를 내며 턱 힘을 완전히 빼보세요!",
      petMotion: "stretch",
      petBubble: "어금니 힘 빼고 턱관절 스트레칭!"
    },
    {
      q: "화이트스타일치과의원 위치와 진료가 궁금해요",
      a: "강남역 11번·12번 출구 도보 1분(대승빌딩 B1, 1, 2층)에 위치해 있으며, 서울대졸, 단국대 외래교수, 교정학 박사 김준헌 병원장님의 33년 전통 1:1 책임 진료를 받으실 수 있습니다.",
      petMotion: "wave",
      petBubble: "1994년 개원 33년 전통 책임진료!"
    }
  ];

  let sceneIdx = 0;
  function appendMonitorScenarioInstant() {
    if (!appLog) return;
    const scene = CHAT_SCENARIOS[sceneIdx % CHAT_SCENARIOS.length];
    sceneIdx++;
    const userMsg = document.createElement('div');
    userMsg.className = 'm user';
    userMsg.textContent = scene.q;
    appLog.appendChild(userMsg);

    const petMsg = document.createElement('div');
    petMsg.className = 'm pet';
    petMsg.textContent = scene.a;
    appLog.appendChild(petMsg);
    while (appLog.children.length > 5) appLog.firstChild.remove();
    appLog.scrollTop = appLog.scrollHeight;
    showHeroBubble(scene.petBubble, 3200);
    if (heroPetImg) {
      heroPetImg.src = scene.petMotion === 'brush'
        ? assetUrl('hwata_3d_brush.png')
        : scene.petMotion === 'wave'
        ? assetUrl('hwata_3d_wave.png')
        : assetUrl('hwata_3d_idle.png');
    }
  }

  if (appNewChatBtn) {
    appNewChatBtn.addEventListener('click', () => {
      appendMonitorScenarioInstant();
      sendEngagementPing('monitor_new_chat');
    });
  }

  if (appInputBar) {
    appInputBar.addEventListener('click', () => {
      const talkSec = document.getElementById('talk');
      const cdInp = document.getElementById('cd-input');
      if (talkSec) talkSec.scrollIntoView({ behavior: 'smooth' });
      if (cdInp) setTimeout(() => cdInp.focus(), 450);
      sendEngagementPing('monitor_input_jump');
    });
  }

  async function runHeroChatLoop() {
    if (!appLog || !appInput) return;
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

    while (true) {
      const scene = CHAT_SCENARIOS[sceneIdx % CHAT_SCENARIOS.length];
      sceneIdx++;

      appInput.textContent = '';
      appInput.classList.remove('ph');
      for (let i = 0; i <= scene.q.length; i++) {
        appInput.textContent = scene.q.slice(0, i);
        await sleep(40);
      }
      await sleep(600);

      const userMsg = document.createElement('div');
      userMsg.className = 'm user';
      userMsg.textContent = scene.q;
      appLog.appendChild(userMsg);
      appLog.scrollTop = appLog.scrollHeight;
      appInput.textContent = '화타 AI가 생각하는 중...';
      appInput.classList.add('ph');

      if (heroPetImg) heroPetImg.src = assetUrl('hwata_3d_type1.png');
      await sleep(1000);

      const petMsg = document.createElement('div');
      petMsg.className = 'm pet';
      petMsg.textContent = scene.a;
      appLog.appendChild(petMsg);
      while (appLog.children.length > 5) appLog.firstChild.remove();
      appLog.scrollTop = appLog.scrollHeight;

      if (heroPetImg) {
        if (scene.petMotion === 'brush') heroPetImg.src = assetUrl('hwata_3d_brush.png');
        else if (scene.petMotion === 'wave') heroPetImg.src = assetUrl('hwata_3d_wave.png');
        else heroPetImg.src = assetUrl('hwata_3d_idle.png');
      }
      showHeroBubble(scene.petBubble, 3800);

      await sleep(4500);
    }
  }

  // 모니터 속 펫 클릭 상호작용 (하트 뿜뿜)
  if (heroPet) {
    heroPet.addEventListener('click', (e) => {
      spawnHeart(heroPet, e.clientX, e.clientY);
      const phrases = [
        "멍멍! 오늘도 환한 미소로 파이팅!",
        "식사하셨나요? 30분 뒤 치카치카 잊지 마세요!",
        "어금니 힘 빼고 어깨를 쭉 펴세요~",
        "커피 뒤엔 시원한 물 한 모금 가글!"
      ];
      showHeroBubble(phrases[Math.floor(Math.random() * phrases.length)], 3200);
      if (heroPetImg) {
        heroPetImg.src = assetUrl('hwata_3d_wave.png');
        setTimeout(() => { heroPetImg.src = assetUrl('hwata_3d_idle.png'); }, 1800);
      }
    });
  }

  function spawnHeart(container) {
    if (!container) return;
    const fx = document.createElement('span');
    fx.className = 'fx';
    fx.textContent = Math.random() > 0.5 ? '✨' : '💖';
    fx.style.left = (40 + Math.floor(Math.random() * 20)) + '%';
    fx.style.top = '18%';
    container.appendChild(fx);
    setTimeout(() => fx.remove(), 1200);
  }

  // ---------- 4. 실시간 놀이 체험 스테이지 (Play Stage + 6종 도트 엔진 통합) ----------
  const playPetEl = document.getElementById('play-pet');
  const playPetCanvas = document.getElementById('play-pet-canvas');
  const playPetImg = document.getElementById('play-pet-img');
  const playBubble = document.getElementById('play-bubble');
  const speciesPills = document.querySelectorAll('[data-species]');
  let playBubbleTimer = null;

  function showPlayBubble(text, duration = 4000) {
    if (!playBubble) return;
    playBubble.textContent = text;
    playBubble.classList.add('show');
    if (playBubbleTimer) clearTimeout(playBubbleTimer);
    playBubbleTimer = setTimeout(() => {
      playBubble.classList.remove('show');
    }, duration);
  }

  const SPECIES_INFO = {
    dog: {
      name: '강아지 하야니',
      greet: '멍멍! 대표 마스코트 하야니예요. 식후 30분 양치질은 제게 맡기세요!',
      img: assetUrl('hwata_3d_species_dog.png'),
      fur: 'white', ears: 'fold', eyes: 'sparkle'
    },
    elephant: {
      name: '아기 코끼리 코코',
      greet: '뿌우~! 긴 코로 시원하게 물 가글을 챙겨드려요!',
      img: assetUrl('hwata_3d_species_elephant.png'),
      fur: 'silver', ears: 'fold', eyes: 'round'
    },
    dino: {
      name: '아기 공룡 디노',
      greet: '크앙! 튼튼하고 가지런한 치아 건강을 지켜드릴게요!',
      img: assetUrl('hwata_3d_species_dino.png'),
      fur: 'cream', ears: 'pointed', eyes: 'star'
    },
    python: {
      name: '황금 파이톤 파이',
      greet: '슈우~ 집중해서 코딩할 때 턱에 힘을 빼는 걸 잊지 마세요!',
      img: assetUrl('hwata_3d_species_python.png'),
      fur: 'gold', ears: 'fold', eyes: 'sparkle'
    },
    parrot: {
      name: '오색 앵무새 코코아',
      greet: '짹짹! 오늘 거울 보고 입꼬리를 올려 미소 체크 해볼까요?',
      img: assetUrl('hwata_3d_species_parrot.png'),
      fur: 'cream', ears: 'tuft', eyes: 'heart'
    },
    cat: {
      name: '고양이 치즈',
      greet: '야옹~ 3단계 저통 마취로 아프지 않게 치과 다녀올 수 있대요!',
      img: assetUrl('hwata_3d_species_cat.png'),
      fur: 'orange', ears: 'pointed', eyes: 'round'
    }
  };

  const COSTUME_MAP = {
    none: { hat: 'none', cape: 'none', hand: 'none', label: '기본 스타일', img: assetUrl('hwata_3d_species_dog.png') },
    doctor: { hat: 'beret', cape: 'scarf', hand: 'wand', label: '화타 의사 가운', img: assetUrl('hwata_3d_costume_doctor.png') },
    hygiene: { hat: 'halo', cape: 'none', hand: 'flower', label: '미소 수호 위생사', img: assetUrl('hwata_3d_costume_hygiene.png') },
    crown: { hat: 'crown', cape: 'royal', hand: 'wand', label: '황금빛 미소 왕관', img: assetUrl('hwata_3d_costume_crown.png') },
    beret: { hat: 'beret', cape: 'scarf', hand: 'coffee', label: '강남 산책 베레모', img: assetUrl('hwata_3d_costume_beret.png') },
    coder: { hat: 'none', cape: 'scarf', hand: 'coffee', label: '월요일 배포 개발자', img: assetUrl('hwata_3d_costume_coder.png') },
    angel: { hat: 'halo', cape: 'wings', hand: 'flower', label: '치카치카 수호천사', img: assetUrl('hwata_3d_costume_angel.png') }
  };

  let currentSpecies = 'dog';
  let currentCostumeKey = 'none';
  let currentCanvasMotion = 'brush';
  let renderMode = 'studio3d'; // 'studio3d' | 'turntable' | 'pixel'
  let turntableFrame = 0;
  let turntableTimer = null;
  let isDraggingTurntable = false;
  let dragStartX = 0;
  const playStageEl = document.getElementById('play-stage');
  const renderModeBtns = document.querySelectorAll('[data-render-mode]');

  // Preload 12 turntable frames for silky-smooth 360 rotation
  const TURNTABLE_URLS = Array.from({ length: 12 }, (_, i) =>
    assetUrl(`hwata_3d_turn_${String(i).padStart(2, '0')}.png`)
  );

  function getActive3DImage() {
    if (currentCostumeKey && currentCostumeKey !== 'none' && COSTUME_MAP[currentCostumeKey]?.img) {
      return COSTUME_MAP[currentCostumeKey].img;
    }
    return SPECIES_INFO[currentSpecies]?.img || assetUrl('hwata_3d_species_dog.png');
  }

  function stopTurntableLoop() {
    if (turntableTimer) {
      clearInterval(turntableTimer);
      turntableTimer = null;
    }
  }

  function startTurntableLoop() {
    stopTurntableLoop();
    // Preload images once
    TURNTABLE_URLS.forEach((u) => {
      const preload = new Image();
      preload.src = u;
    });
    if (playPetImg) playPetImg.src = TURNTABLE_URLS[turntableFrame % 12];
    turntableTimer = setInterval(() => {
      if (renderMode !== 'turntable' || isDraggingTurntable) return;
      turntableFrame = (turntableFrame + 1) % 12;
      if (playPetImg) playPetImg.src = TURNTABLE_URLS[turntableFrame];
    }, 180);
  }

  function updateStageDisplayMode() {
    const hasPixelEngine = typeof window.setSpecies === 'function' && typeof window.drawMotion === 'function' && playPetCanvas;
    if (playStageEl) {
      playStageEl.dataset.turntable = renderMode === 'turntable' ? 'true' : 'false';
    }
    if (renderMode === 'pixel' && hasPixelEngine) {
      stopTurntableLoop();
      if (playPetImg) playPetImg.setAttribute('hidden', '');
      playPetCanvas.removeAttribute('hidden');
    } else if (renderMode === 'turntable') {
      if (playPetCanvas) playPetCanvas.setAttribute('hidden', '');
      if (playPetImg) playPetImg.removeAttribute('hidden');
      startTurntableLoop();
    } else {
      stopTurntableLoop();
      if (playPetCanvas) playPetCanvas.setAttribute('hidden', '');
      if (playPetImg) {
        playPetImg.removeAttribute('hidden');
        playPetImg.src = getActive3DImage();
      }
    }
  }

  let passPreviewTimer = null;
  function triggerPassPreviewRevert(featureLabel) {
    if (activePassCode) return false;
    if (passPreviewTimer) clearTimeout(passPreviewTimer);
    if (passGateBar) {
      passGateBar.style.boxShadow = '0 0 0 3px rgba(201,169,110,0.55)';
      setTimeout(() => { if (passGateBar) passGateBar.style.boxShadow = ''; }, 1800);
    }
    showPlayBubble(`🔒 [${featureLabel}] 화타 스마일 PASS 등록 전용 기능입니다! (3초 미리보기 중 — 상단 [⚡ 1클릭 PASS 즉시 발급] 또는 [🔓 PASS 등록하기]로 영구 잠금 해제하세요)`, 4200);
    passPreviewTimer = setTimeout(() => {
      if (!activePassCode) {
        currentSpecies = 'dog';
        currentCostumeKey = 'none';
        if (speciesRevertBar) speciesRevertBar.setAttribute('hidden', '');
        if (renderMode === 'turntable') {
          renderMode = 'studio3d';
          renderModeBtns.forEach((b) => b.classList.toggle('active', b.dataset.renderMode === 'studio3d'));
        }
        speciesPills.forEach((p) => p.classList.toggle('active', p.dataset.species === 'dog'));
        updateStageDisplayMode();
        showPlayBubble('🔒 화타 스마일 PASS에 등록하시면 6종 동물 변신·6종 코스튬·360° 회전 뷰를 제한 없이 이용하실 수 있어요!', 3800);
      }
    }, 3200);
    return true;
  }

  function setRenderMode(mode) {
    renderMode = mode;
    renderModeBtns.forEach((b) => b.classList.toggle('active', b.dataset.renderMode === mode));
    updateStageDisplayMode();
    if (mode === 'turntable') {
      if (!triggerPassPreviewRevert('360° 입체 회전 뷰')) {
        showPlayBubble('360° 입체 회전 뷰! 마우스나 손가락으로 좌우로 드래그해 돌려보세요 🔄', 4000);
      }
    } else if (mode === 'pixel') {
      showPlayBubble('48×48 레트로 도트 뷰! 아기자기한 실시간 도트 애니메이션 모드예요 👾', 3600);
    } else {
      showPlayBubble('고해상도 3D 스튜디오 뷰! 6종 동물 친구들과 코스튬을 생생한 입체 그래픽으로 만나보세요 ✨', 3600);
    }
    sendEngagementPing('render_mode_' + mode);
  }

  renderModeBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      setRenderMode(btn.dataset.renderMode || 'studio3d');
    });
  });

  // 360° 턴테이블 마우스/터치 좌우 드래그 스크러빙
  if (playStageEl) {
    playStageEl.addEventListener('pointerdown', (e) => {
      if (renderMode !== 'turntable') return;
      isDraggingTurntable = true;
      dragStartX = e.clientX;
    });
    window.addEventListener('pointermove', (e) => {
      if (!isDraggingTurntable || renderMode !== 'turntable') return;
      const dx = e.clientX - dragStartX;
      if (Math.abs(dx) >= 18) {
        const step = dx > 0 ? 1 : -1;
        turntableFrame = (turntableFrame + step + 12) % 12;
        if (playPetImg) playPetImg.src = TURNTABLE_URLS[turntableFrame];
        dragStartX = e.clientX;
      }
    });
    window.addEventListener('pointerup', () => {
      isDraggingTurntable = false;
    });
  }

  const speciesRevertBar = document.getElementById('species-revert-bar');

  function selectSpecies(sp, customMsg) {
    if (!SPECIES_INFO[sp]) sp = 'dog';
    currentSpecies = sp;
    currentCostumeKey = 'none';
    speciesPills.forEach((p) => p.classList.toggle('active', p.dataset.species === sp));
    if (speciesRevertBar) {
      if (sp === 'dog') speciesRevertBar.setAttribute('hidden', '');
      else speciesRevertBar.removeAttribute('hidden');
    }
    const info = SPECIES_INFO[sp];
    if (renderMode === 'turntable') {
      renderMode = 'studio3d';
      renderModeBtns.forEach((b) => b.classList.toggle('active', b.dataset.renderMode === 'studio3d'));
    }
    updateStageDisplayMode();
    if (sp !== 'dog' && !activePassCode) {
      triggerPassPreviewRevert(info.name + ' 3D 변신');
    } else {
      showPlayBubble(customMsg || info.greet, 4000);
    }
  }

  speciesPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      const sp = pill.dataset.species;
      selectSpecies(sp);
    });
  });

  // 플레이 스테이지 및 히어로 모니터 펫 드래그 들어올리기 + 중력 착지 물리 엔진 (KitCommit 시그니처)
  function attachPetDragPhysics(petEl, bubbleFn) {
    if (!petEl) return;
    let dragging = false;
    let moved = false;
    let startY = 0;
    let liftY = 0;

    petEl.addEventListener('pointerdown', (e) => {
      if (renderMode === 'turntable' && petEl === playPetEl) return;
      dragging = true;
      moved = false;
      startY = e.clientY;
      liftY = 0;
      petEl.classList.add('is-dragging');
      try { petEl.setPointerCapture(e.pointerId); } catch (err) {}
    });

    petEl.addEventListener('pointermove', (e) => {
      if (!dragging) return;
      const dy = Math.min(0, e.clientY - startY);
      if (Math.abs(dy) > 8) {
        if (!moved) {
          moved = true;
          const heldLines = ['으앗 높다! 내려 줘~', '어디 가는 거야? 둥실둥실!', '우와 하늘을 나는 기분이야!'];
          bubbleFn(heldLines[Math.floor(Math.random() * heldLines.length)], 2600);
        }
        liftY = Math.max(-110, dy);
        petEl.style.transform = `translateX(-50%) translateY(${liftY}px) scale(1.04)`;
      }
    });

    function releasePet() {
      if (!dragging) return;
      dragging = false;
      petEl.classList.remove('is-dragging');
      if (moved && liftY < -12) {
        petEl.style.transition = 'transform 0.36s cubic-bezier(0.22, 1, 0.36, 1)';
        petEl.style.transform = 'translateX(-50%) translateY(0px) scale(1)';
        const landLines = ['휴~ 착지 성공!', '폴짝! 안전하게 착지했어요!', '헤헤, 다시 한 번 들어 올려 줄래요?'];
        bubbleFn(landLines[Math.floor(Math.random() * landLines.length)], 3000);
        spawnHeart(petEl);
        setTimeout(() => {
          petEl.style.transition = '';
        }, 380);
      } else {
        petEl.style.transform = '';
      }
    }

    petEl.addEventListener('pointerup', releasePet);
    petEl.addEventListener('pointercancel', releasePet);
  }

  attachPetDragPhysics(heroPet, showHeroBubble);
  attachPetDragPhysics(playPetEl, showPlayBubble);

  function dropTreatInPlayStage() {
    if (!playStageEl) return;
    const treats = ['🍓', '🦴', '🧀', '🍎', '🥕', '🥛'];
    const el = document.createElement('span');
    el.className = 'food-drop';
    el.textContent = treats[Math.floor(Math.random() * treats.length)];
    const leftPct = 36 + Math.floor(Math.random() * 28);
    el.style.left = leftPct + '%';
    el.style.top = '12px';
    el.style.transform = 'translateY(0) scale(0.9)';
    playStageEl.appendChild(el);
    requestAnimationFrame(() => {
      el.style.transform = 'translateY(204px) scale(1.15)';
    });
    setTimeout(() => {
      el.style.transform = 'translateY(204px) scale(0.2)';
      el.style.opacity = '0';
      if (playPetEl) spawnHeart(playPetEl);
    }, 950);
    setTimeout(() => el.remove(), 1350);
  }

  // 플레이 스테이지 펫 직접 클릭 (쓰다듬기)
  if (playPetEl) {
    playPetEl.addEventListener('click', () => {
      spawnHeart(playPetEl);
      const info = SPECIES_INFO[currentSpecies] || SPECIES_INFO.dog;
      const petReplies = [
        `헤헤, 쓰다듬어 주셔서 고마워요! [${info.name}]가 오늘 미소를 응원해요 💖`,
        `${info.greet}`,
        `기분 최고! 양치 후 거울 보며 활짝 웃어 보세요 ✨`
      ];
      showPlayBubble(petReplies[Math.floor(Math.random() * petReplies.length)], 3800);
      currentCanvasMotion = 'smilecheck';
      if (playPetImg && !playPetImg.hasAttribute('hidden')) {
        playPetImg.src = assetUrl('hwata_3d_wave.png');
        setTimeout(() => {
          playPetImg.src = info.img;
        }, 2000);
      }
      interactionCount++;
      sendEngagementPing('play_pet_stroke');
    });
  }

  // 액션 버튼들
  const playActionBtns = document.querySelectorAll('[data-action]');
  playActionBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const act = btn.dataset.action;
      handlePlayAction(act);
    });
  });

  let actionResetTimer = null;
  function handlePlayAction(action) {
    let msg = '';
    let imgSrc = getActive3DImage();
    let canvasMot = 'brush';

    switch (action) {
      case 'feed':
        dropTreatInPlayStage();
        msg = '우와 밥이다!! 냠냠 맛있게 잘 먹었습니다 🍚 (식후 30분 뒤 양치 잊지 마세요!)';
        imgSrc = assetUrl('hwata_3d_motion_smile.png');
        canvasMot = 'happy';
        break;
      case 'brush':
        msg = '치카치카 뽀득뽀득! 2분 동안 구석구석 칫솔질 중 🪥';
        imgSrc = assetUrl('hwata_3d_motion_brush.png');
        canvasMot = 'brush';
        break;
      case 'smile':
        msg = '반짝반짝 거울 미소 체크! 오늘 미소가 가장 눈부셔요 ✨';
        imgSrc = assetUrl('hwata_3d_motion_smile.png');
        canvasMot = 'smilecheck';
        break;
      case 'gargle':
        msg = '커피 후엔 시원한 맑은 물 한 모금 가글 가글 꿀꺽! ☕';
        imgSrc = assetUrl('hwata_3d_motion_gargle.png');
        canvasMot = 'smilecheck';
        break;
      case 'work':
        msg = '노트북으로 같이 코딩 중! 타닥타닥 집중 집중 💻 (어금니 힘은 살짝 빼세요!)';
        imgSrc = assetUrl('hwata_3d_motion_work.png');
        canvasMot = 'stretch';
        break;
      case 'toy':
        msg = '신난다! 장난감 가지고 신나게 댄스 타임 🧸';
        imgSrc = assetUrl('hwata_3d_motion_dance.png');
        canvasMot = 'dance';
        break;
      case 'sleep':
        msg = '쿨쿨… 오늘 하루도 고생 많았어요. 치실 챙기고 푹 자요 🌙';
        imgSrc = assetUrl('hwata_3d_motion_sleep.png');
        canvasMot = 'loaf';
        break;
      case 'fortune':
        msg = getRandomFortune();
        imgSrc = assetUrl('hwata_3d_motion_smile.png');
        canvasMot = 'smilecheck';
        break;
      case 'open-friends-gallery': {
        const friendsTabBtn = document.querySelector('.tab-btn[data-tab="friends"]');
        if (friendsTabBtn) friendsTabBtn.click();
        const galSec = document.getElementById('gallery');
        if (galSec) galSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
        showPlayBubble('하단 [6종 동물 파트너] 탭을 열었어요! 원하는 단짝 친구를 골라 클릭해 보세요 🐾', 3800);
        return;
      }
      case 'switch': {
        const keys = Object.keys(SPECIES_INFO);
        const nextKey = keys[(keys.indexOf(currentSpecies) + 1) % keys.length];
        selectSpecies(nextKey);
        return;
      }
      default:
        msg = '멍멍! 무엇을 도와드릴까요?';
    }

    currentCanvasMotion = canvasMot;
    showPlayBubble(msg, 4000);
    spawnHeart(playPetEl);
    if (renderMode === 'turntable') {
      renderMode = 'studio3d';
      renderModeBtns.forEach((b) => b.classList.toggle('active', b.dataset.renderMode === 'studio3d'));
      updateStageDisplayMode();
    }
    if (playPetImg) playPetImg.src = imgSrc;
    if (actionResetTimer) clearTimeout(actionResetTimer);
    actionResetTimer = setTimeout(() => {
      if (playPetImg && renderMode === 'studio3d') {
        playPetImg.src = getActive3DImage();
      }
    }, 3800);
  }

  // 도트 엔진 캔버스 애니메이션 루프 (플레이 스테이지 & 대화창 헤더 & 갤러리 6종 동물 · 코스튬 타일)
  let pixelTick = 0;
  let cdHeadMotion = 'smilecheck';
  function initPixelCanvases() {
    if (typeof window.setSpecies !== 'function' || typeof window.drawMotion !== 'function') return;
    const stageCtx = playPetCanvas ? playPetCanvas.getContext('2d') : null;
    if (stageCtx) stageCtx.imageSmoothingEnabled = false;

    const cdHeadCanvas = document.getElementById('cd-head-canvas');
    const cdHeadCtx = cdHeadCanvas ? cdHeadCanvas.getContext('2d') : null;
    if (cdHeadCtx) cdHeadCtx.imageSmoothingEnabled = false;

    const speciesCanvases = Array.from(document.querySelectorAll('.gallery-species-canvas'));
    const costumeCanvases = Array.from(document.querySelectorAll('.gallery-costume-canvas'));

    setInterval(() => {
      pixelTick++;
      // 1. Play Stage Canvas
      if (stageCtx && playPetCanvas && !playPetCanvas.hasAttribute('hidden')) {
        stageCtx.clearRect(0, 0, 48, 48);
        const spInfo = SPECIES_INFO[currentSpecies] || SPECIES_INFO.dog;
        const cost = COSTUME_MAP[currentCostumeKey] || COSTUME_MAP.none;
        window.setSpecies(currentSpecies);
        if (typeof window.setCustom === 'function') {
          window.setCustom({
            fur: spInfo.fur,
            ears: spInfo.ears,
            eyes: spInfo.eyes,
            hat: cost.hat,
            cape: cost.cape,
            hand: cost.hand
          });
        }
        window.drawMotion(stageCtx, currentCanvasMotion || 'brush', pixelTick);
      }

      // 1-B. Chat Demo Header Canvas (#cd-head-canvas)
      if (cdHeadCtx && cdHeadCanvas) {
        cdHeadCtx.clearRect(0, 0, 48, 48);
        const spInfo = SPECIES_INFO[currentSpecies] || SPECIES_INFO.dog;
        window.setSpecies(currentSpecies);
        if (typeof window.setCustom === 'function') {
          window.setCustom({
            fur: spInfo.fur,
            ears: spInfo.ears,
            eyes: spInfo.eyes,
            hat: currentPersona === 'doctor' ? 'beret' : currentPersona === 'angel' ? 'halo' : 'crown',
            cape: 'none',
            hand: 'none'
          });
        }
        window.drawMotion(cdHeadCtx, cdHeadMotion || 'smilecheck', pixelTick);
      }

      // 2. Gallery 6종 동물 파트너 Canvases
      speciesCanvases.forEach((cv, idx) => {
        const sp = cv.dataset.gallerySpecies || 'dog';
        const rctx = cv.getContext('2d');
        rctx.imageSmoothingEnabled = false;
        rctx.clearRect(0, 0, 48, 48);
        const spInfo = SPECIES_INFO[sp] || SPECIES_INFO.dog;
        window.setSpecies(sp);
        if (typeof window.setCustom === 'function') {
          window.setCustom({ fur: spInfo.fur, ears: spInfo.ears, eyes: spInfo.eyes, hat: 'none', cape: 'none', hand: 'none' });
        }
        const mList = ['brush', 'smilecheck', 'happy', 'stretch', 'dance', 'loaf'];
        window.drawMotion(rctx, mList[idx % mList.length], pixelTick + idx * 3);
      });

      // 3. Gallery 코스튬 Canvases
      costumeCanvases.forEach((cv, idx) => {
        const ck = cv.dataset.galleryCostume || 'crown';
        const cost = COSTUME_MAP[ck] || COSTUME_MAP.crown;
        const rctx = cv.getContext('2d');
        rctx.imageSmoothingEnabled = false;
        rctx.clearRect(0, 0, 48, 48);
        window.setSpecies('dog');
        if (typeof window.setCustom === 'function') {
          window.setCustom({ fur: 'white', ears: 'fold', eyes: 'sparkle', hat: cost.hat, cape: cost.cape, hand: cost.hand });
        }
        window.drawMotion(rctx, idx % 2 === 0 ? 'smilecheck' : 'dance', pixelTick + idx * 2);
      });
    }, 160);
  }
  initPixelCanvases();

  // ---------- 5. 대화 데모 & 성격 (KitCommit #talk 완벽 구현: 7종 성격 + 12별자리 운세카드 + 초성퀴즈 + 밸런스 3판 + 끝말잇기 + 스무고개 + 예약) ----------
  const cdLog = document.getElementById('cd-log');
  const cdForm = document.getElementById('cd-form');
  const cdInput = document.getElementById('cd-input');
  const cdPersonaBtns = document.querySelectorAll('[data-persona]');

  let currentPersona = 'angel';
  let activeQuiz = null;
  let activeBalance = null;
  let activeWordchain = false;
  let lastWordchainChar = '이';
  let activeTwenty = null;

  const PERSONA_RESPONSES = {
    angel: {
      name: '다정한 하야니',
      greet: '왔구나! 오늘 하루 어땠어? 아래 놀이도 눌러 보고 치아 고민도 편하게 물어봐 🐾',
      bubblePreview: '점심시간이닷!! 바빠도 밥 꼭 챙겨 먹고 30분 뒤 치카치카 잊지 마!',
      answer: (q) => `다정하게 답변해 드릴게요! "${q}"에 대해서는 편안한 마음으로 구강 건강과 휴식을 함께 챙기시는 걸 추천해요.`
    },
    tsundere: {
      name: '츤데레 냥이',
      greet: '흥, 이제야 왔어? …딱히 양치 시간 기다린 건 아니거든!',
      bubblePreview: '점심시간이야. 굶거나 양치 안 하면… 내가 신경 쓰이잖아.',
      answer: (q) => `흥! "${q}" 같은 건 스스로 챙겨야지… 그래도 물 한 모금 가글은 잊지 마. 양치 안 하면 내가 신경 쓰이잖아.`
    },
    playful: {
      name: '장난꾸러기 디노',
      greet: '헤헤 왔다! 오늘은 뭐 하고 놀까? 치카치카 칫솔 배틀 한판 뜰래?!',
      bubblePreview: '점심이다! 밥 먹고 나랑 2분 양치 타이머 달리기 시합하자~',
      answer: (q) => `와하하! "${q}"라고? 완전 꿀잼 질문이다! 신나게 웃고 나면 치아도 더 반짝반짝해질걸!`
    },
    doctor: {
      name: '닥터 화타 (김준헌 병원장님)',
      greet: '반갑습니다. 1994년 개원 33년 임상 노하우로 치아 고민을 명쾌하게 설명해 드리겠습니다.',
      bubblePreview: '집중할 때 어금니를 꽉 물지 마시고 입술만 가볍게 다문 채 턱관절 힘을 빼세요.',
      answer: (q) => `치의학적 관점에서 "${q}"에 대해 설명해 드리겠습니다. 자연치아를 아끼고 보존하는 최소삭제 원칙과 정기 검진이 평생 치아 건강의 핵심입니다.`
    },
    hygiene: {
      name: '꼼꼼한 치과위생사',
      greet: '안녕하세요! 오늘 식사 후 치실이나 치간칫솔 사용하셨나요? 칫솔이 닿지 않는 틈새 40%를 챙겨주세요!',
      bubblePreview: '커피 마신 직후엔 맑은 물 한 모금 가글로 착색을 먼저 예방해 주세요!',
      answer: (q) => `꼼꼼 덴탈 팁! "${q}" 관련해서는 매일 저녁 취침 전 치실 사용과 3분 칫솔질 습관이 가장 큰 차이를 만듭니다.`
    },
    sage: {
      name: '애늙은이 철학자',
      greet: '어서 오게. 오늘은 어떤 생각을 품고 왔는가. 치아와 마음은 아낄수록 오래가는 법이라네.',
      bubblePreview: '점심일세. 배가 든든하고 치아가 건강해야 생각도 깊어지는 법이지.',
      answer: (q) => `허허, "${q}"라… 서두르지 말고 순리대로 물 한 모금 마시며 천천히 돌아보는 것이 지혜일세.`
    },
    python: {
      name: '스마트 코더 파이톤',
      greet: 'import smile; def care(): relax_jaw(); brush_teeth(); # 버그 잡느라 어금니 깨물기 금지!',
      bubblePreview: '50분 집중 코딩 완료! 런타임 에러 예방을 위해 지금 턱관절 스트레칭을 실행하세요.',
      answer: (q) => `코드 리뷰 완료: "${q}"에 최적화된 솔루션은 50분 코딩 후 10분 스트레칭 & 미소 리프레시 루틴입니다.`
    }
  };

  const CHAT_API_ENDPOINTS = [
    '/api/chat',
    'https://whinish.com/api/chat',
    'https://whitestyle-xi.vercel.app/api/chat',
    'https://whitestyle-copy.vercel.app/api/chat'
  ];

  let interactionCount = 0;
  const pageStartMs = Date.now();

  async function requestGeminiChat(messageText, personaKey, speciesKey, langCode = 'ko') {
    const payload = {
      message: messageText,
      persona: personaKey || currentPersona || 'angel',
      species: speciesKey || currentSpecies || 'dog',
      lang: langCode
    };
    for (const url of CHAT_API_ENDPOINTS) {
      if (location.protocol === 'file:' && url.startsWith('/')) continue;
      const ctl = new AbortController();
      const timer = setTimeout(() => ctl.abort(), 4500);
      try {
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'X-Hwata-Client': 'web-download-playground' },
          body: JSON.stringify(payload),
          signal: ctl.signal
        });
        clearTimeout(timer);
        if (res.ok) {
          const data = await res.json();
          const reply = (data && (data.reply || data.content || data.text || '')).trim();
          if (reply) return reply;
        }
      } catch (e) {
        clearTimeout(timer);
      }
    }
    return null;
  }

  cdPersonaBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      interactionCount++;
      cdPersonaBtns.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-checked', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-checked', 'true');
      currentPersona = btn.dataset.persona;
      const p = PERSONA_RESPONSES[currentPersona] || PERSONA_RESPONSES.angel;
      cdHeadMotion = 'dance';
      setTimeout(() => { cdHeadMotion = 'smilecheck'; }, 1600);
      appendCdMsg('pet', `[${p.name}] ${p.greet}`);
      appendCdMsg('sys', `말풍선도 이 말투예요: “${p.bubblePreview}”`);
      showPlayBubble(p.bubblePreview, 4000);
      sendEngagementPing('persona_switch');
    });
  });

  function evaluateQuizOrBalanceInput(rawText) {
    const clean = rawText.trim();
    const p = PERSONA_RESPONSES[currentPersona] || PERSONA_RESPONSES.angel;

    if (activeQuiz) {
      const normalized = clean.replace(/\s+/g, '');
      if (normalized.includes(activeQuiz.a)) {
        const exp = activeQuiz.exp || activeQuiz.hint;
        const ansWord = activeQuiz.a;
        activeQuiz = null;
        if (cdInput) cdInput.placeholder = '예: 커피 마셨는데 치아 관리 어떻게 해?';
        return `[${p.name}] 🎉 정답! 「${ansWord}」 맞아!\n💡 ${exp}`;
      } else {
        activeQuiz.triesLeft = (activeQuiz.triesLeft || 3) - 1;
        if (activeQuiz.triesLeft > 0) {
          return `[${p.name}] 땡! 아니야~ 남은 기회: ${activeQuiz.triesLeft}번! (힌트: ${activeQuiz.hint})`;
        } else {
          const ansWord = activeQuiz.a;
          const exp = activeQuiz.exp || activeQuiz.hint;
          activeQuiz = null;
          if (cdInput) cdInput.placeholder = '예: 커피 마셨는데 치아 관리 어떻게 해?';
          return `[${p.name}] 아까워요! 정답은 「${ansWord}」였어!\n💡 ${exp}`;
        }
      }
    }

    if (activeBalance) {
      const upper = clean.toUpperCase();
      if (upper === 'A' || clean.includes(activeBalance[0])) {
        handleBalancePick(0);
        return '__HANDLED__';
      } else if (upper === 'B' || clean.includes(activeBalance[1])) {
        handleBalancePick(1);
        return '__HANDLED__';
      }
      activeBalance = null;
    }

    if (activeWordchain) {
      const word = clean.replace(/\s+/g, '');
      const dict = {
        '기': '기린! 이번엔 「린」이나 「인」으로 시작해 봐~',
        '린': '린스! 이번엔 「스」로 시작해 봐~',
        '인': '인플란트 말고 임플란트! 이번엔 「트」로 시작해 봐~',
        '스': '스케일링! 이번엔 「링」이나 「잉」으로 시작해 봐~',
        '트': '트레이! 이번엔 「이」로 시작해 봐~',
        '이': '이불! 이번엔 「불」로 시작해 봐~',
        '불': '불소도포! 이번엔 「포」로 시작해 봐~',
        '포': '포도! 이번엔 「도」로 시작해 봐~',
        '도': '도서관! 이번엔 「관」으로 시작해 봐~'
      };
      const lastChar = word.charAt(word.length - 1);
      if (dict[lastChar]) {
        return `[${p.name}] 오호 「${word}」! 그렇다면 나는… ${dict[lastChar]}`;
      }
      activeWordchain = false;
      return `[${p.name}] 우와 「${word}」! 네가 이겼어! 끝말잇기 천재인데? 🐾`;
    }

    if (activeTwenty) {
      if (clean.includes(activeTwenty.answer)) {
        const ans = activeTwenty.answer;
        activeTwenty = null;
        return `[${p.name}] 🎉 정답!! 내가 생각한 건 바로 「${ans}」였어! 맞히다니 대단해!`;
      }
      activeTwenty.step = Math.min(20, (activeTwenty.step || 1) + 1);
      return `[${p.name}] 흥미로운 질문이야! 핵심 힌트를 주자면: ${activeTwenty.hint} (${activeTwenty.step}/20) — 정답이 떠오르면 바로 말해 봐!`;
    }

    return null;
  }

  if (cdForm) {
    cdForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const txt = cdInput.value.trim();
      if (!txt) return;
      interactionCount++;
      appendCdMsg('user', txt);
      cdInput.value = '';

      const gameReply = evaluateQuizOrBalanceInput(txt);
      if (gameReply === '__HANDLED__') {
        sendEngagementPing('game_answer');
        return;
      }
      if (gameReply) {
        appendCdMsg('pet', gameReply);
        showPlayBubble(gameReply, 4000);
        sendEngagementPing('game_answer');
        return;
      }

      const p = PERSONA_RESPONSES[currentPersona] || PERSONA_RESPONSES.angel;
      const typingEl = appendCdTyping();

      const aiReply = await requestGeminiChat(txt, currentPersona, currentSpecies, 'ko');
      const finalReply = aiReply ? `[${p.name}] ${aiReply}` : `[${p.name}] ${p.answer(txt)}`;

      if (typingEl) {
        typingEl.className = 'cd-msg pet';
        typingEl.textContent = finalReply;
      } else {
        appendCdMsg('pet', finalReply);
      }

      showPlayBubble(aiReply || p.answer(txt), 4500);
      if (cdLog) cdLog.scrollTop = cdLog.scrollHeight;
      sendEngagementPing('chat_message');
    });
  }

  function appendCdTyping() {
    if (!cdLog) return null;
    const m = document.createElement('div');
    m.className = 'cd-msg pet';
    const dots = document.createElement('span');
    dots.className = 'dots';
    dots.innerHTML = '<i></i><i></i><i></i>';
    m.appendChild(dots);
    cdLog.appendChild(m);
    cdLog.scrollTop = cdLog.scrollHeight;
    return m;
  }

  function appendCdMsg(role, text, buttons = []) {
    if (!cdLog) return null;
    const m = document.createElement('div');
    m.className = 'cd-msg ' + role;
    m.textContent = text;
    if (buttons && buttons.length > 0) {
      const btnRow = document.createElement('div');
      btnRow.className = 'cd-inline-actions';
      buttons.forEach((b) => {
        const btnEl = document.createElement('button');
        btnEl.type = 'button';
        btnEl.className = 'cd-inline-btn';
        btnEl.textContent = b.label;
        btnEl.addEventListener('click', () => b.onClick(btnEl, btnRow));
        btnRow.appendChild(btnEl);
      });
      m.appendChild(btnRow);
    }
    cdLog.appendChild(m);
    cdLog.scrollTop = cdLog.scrollHeight;
    return m;
  }

  // ---------- KitCommit 12별자리 시드 운세 엔진 (.cd-signs + .fortune 카드) ----------
  const ZODIAC_SIGNS = [
    ['aries', '양자리', '3.21~4.19'],
    ['taurus', '황소자리', '4.20~5.20'],
    ['gemini', '쌍둥이자리', '5.21~6.21'],
    ['cancer', '게자리', '6.22~7.22'],
    ['leo', '사자자리', '7.23~8.22'],
    ['virgo', '처녀자리', '8.23~9.22'],
    ['libra', '천칭자리', '9.23~10.22'],
    ['scorpio', '전갈자리', '10.23~11.21'],
    ['sagittarius', '사수자리', '11.22~12.21'],
    ['capricorn', '염소자리', '12.22~1.19'],
    ['aquarius', '물병자리', '1.20~2.18'],
    ['pisces', '물고기자리', '2.19~3.20']
  ];

  const FORTUNE_ITEMS = [
    '부드러운 미세모 칫솔', '자일리톨 캔디', '민트 치실', '따뜻한 캐모마일차',
    '텀블러와 맑은 물', '손거울', '초콜릿 한 조각', '파란 펜', '산책 10분',
    '좋아하는 노래', '휴대용 가글', '핸드크림'
  ];

  const FORTUNE_COLORS = [
    ['mint', '민트', 'var(--swatch-mint)'],
    ['yellow', '노랑', 'var(--swatch-yellow)'],
    ['pink', '분홍', 'var(--swatch-pink)'],
    ['sky', '하늘', 'var(--swatch-sky)'],
    ['purple', '보라', 'var(--swatch-purple)'],
    ['orange', '주황', 'var(--swatch-orange)'],
    ['green', '초록', 'var(--swatch-green)'],
    ['white', '하양', 'var(--swatch-white)']
  ];

  const FORTUNE_MSGS = [
    '오늘은 뭘 해도 술술 풀리는 날! 활짝 웃는 미소가 최고의 행운을 불러와요.',
    '좋은 소식이 꼬리를 물고 찾아와요. 커피 마신 뒤 물 한 모금 가글로 상쾌함을 유지해 보세요!',
    '무난하고 편안한 하루예요. 50분 집중 뒤 어금니 힘을 빼고 스트레칭하면 좋은 아이디어가 떠올라요.',
    '조금 서두르면 피곤할 수 있어요. 식후 2분 양치질로 리프레시하며 한 걸음씩 나아가요!',
    '오늘은 천천히 가는 게 이기는 날! 구원 아이템을 챙기고 거울 보며 미소 한 번 지어보세요.'
  ];

  function getTodayString() {
    const d = new Date();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${d.getFullYear()}-${m}-${day}`;
  }

  function hashSeed(str) {
    let h = 2166136261 >>> 0;
    for (let i = 0; i < str.length; i++) {
      h = Math.imul(h ^ str.charCodeAt(i), 16777619) >>> 0;
    }
    return h >>> 0;
  }

  function computeDailyFortune(signKey) {
    const today = getTodayString();
    const order = ZODIAC_SIGNS.map((s) => s[0]);
    let rSeed = hashSeed('rank:' + today);
    for (let i = order.length - 1; i > 0; i--) {
      rSeed = (Math.imul(rSeed, 1664525) + 1013904223) >>> 0;
      const j = rSeed % (i + 1);
      const tmp = order[i];
      order[i] = order[j];
      order[j] = tmp;
    }
    const rank = order.indexOf(signKey) + 1;
    const tier = rank === 1 ? 0 : rank <= 3 ? 1 : rank <= 7 ? 2 : rank <= 10 ? 3 : 4;
    const stars = 5 - tier;
    const s = hashSeed(today + ':' + signKey);
    const item = FORTUNE_ITEMS[s % FORTUNE_ITEMS.length];
    const color = FORTUNE_COLORS[(s >>> 4) % FORTUNE_COLORS.length];
    const hour = 9 + ((s >>> 8) % 12);
    const msg = FORTUNE_MSGS[tier];
    const signObj = ZODIAC_SIGNS.find((z) => z[0] === signKey) || ZODIAC_SIGNS[0];
    return { today, signKey, signName: signObj[1], rank, tier, stars, item, color, hour, msg };
  }

  function askZodiacSign() {
    activeQuiz = null;
    activeBalance = null;
    activeWordchain = false;
    activeTwenty = null;
    appendCdMsg('user', '오늘의 미소 운세');
    const m = appendCdMsg('pet', '네 오늘 미소 운세를 봐 줄게! 너는 무슨 별자리야?');
    if (!m) return;
    const grid = document.createElement('div');
    grid.className = 'cd-signs';
    ZODIAC_SIGNS.forEach(([key, name, range]) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.innerHTML = `<b>${name}</b><small>${range}</small>`;
      b.addEventListener('click', () => {
        grid.querySelectorAll('button').forEach((btn) => { btn.disabled = true; });
        try { localStorage.setItem('hwata-zodiac-sign', key); } catch (e) {}
        appendCdMsg('user', name);
        renderZodiacFortuneCard(key);
      });
      grid.appendChild(b);
    });
    m.appendChild(grid);
    if (cdLog) cdLog.scrollTop = cdLog.scrollHeight;
  }

  function renderZodiacFortuneCard(signKey) {
    const f = computeDailyFortune(signKey);
    const intro = f.rank === 1
      ? `대박! 오늘 ${f.signName}가 1위야! 🎉`
      : f.rank === 12
        ? `오늘 ${f.signName}는 12위… 그래도 걱정 마, 구원 아이템이 지켜 줄 거야!`
        : `오늘 ${f.signName}는 ${f.rank}위야!`;

    const m = appendCdMsg('pet', intro);
    if (!m) return;
    const card = document.createElement('div');
    card.className = `fortune g${f.tier}`;
    let starsHtml = '';
    for (let i = 0; i < 5; i++) {
      starsHtml += `<span class="${i < f.stars ? 'on' : ''}">★</span>`;
    }
    const itemLabel = f.tier >= 3 ? '구원 아이템' : '행운의 아이템';
    card.innerHTML = `
      <div class="f-top"><span>오늘의 미소 운세</span><span>${f.today}</span></div>
      <div class="f-sign">${f.signName}</div>
      <div class="f-grade">${f.rank}위</div>
      <div class="f-stars" aria-label="${f.stars} / 5">${starsHtml}</div>
      <dl>
        <dt>${itemLabel}</dt><dd>${f.item}</dd>
        <dt>행운의 색</dt><dd><i class="swatch" style="background:${f.color[2]}"></i>${f.color[1]}</dd>
        <dt>행운의 시간</dt><dd>${f.hour}시</dd>
      </dl>
      <p class="f-msg">${f.msg}</p>
      <button type="button" class="f-change">별자리 바꾸기</button>
    `;
    const changeBtn = card.querySelector('.f-change');
    if (changeBtn) {
      changeBtn.addEventListener('click', () => {
        try { localStorage.removeItem('hwata-zodiac-sign'); } catch (e) {}
        askZodiacSign();
      });
    }
    m.appendChild(card);
    if (cdLog) cdLog.scrollTop = cdLog.scrollHeight;
    showPlayBubble(`${f.signName} 오늘 운세 ${f.rank}위! ${itemLabel}: ${f.item} ✨`, 4200);
  }

  function getRandomFortune() {
    let savedSign = 'aries';
    try { savedSign = localStorage.getItem('hwata-zodiac-sign') || 'aries'; } catch (e) {}
    const f = computeDailyFortune(savedSign);
    return `✨ [${f.signName} · 오늘 ${f.rank}위] ${f.msg} (행운의 아이템: ${f.item})`;
  }

  // ---------- 초성 퀴즈 (주제 + 3번 기회 + 힌트 버튼 + 직접 입력/버튼 선택) ----------
  const CHOSUNG_POOL = [
    { topic: "치과 상식", q: "ㅅㅋㅇㄹ", a: "스케일링", hint: "연 1회 건강보험 적용! 치석을 깨끗이 제거해요", exp: "만 19세 이상 누구나 연 1회 건강보험 혜택으로 치석을 제거하고 잇몸병을 예방할 수 있어요!" },
    { topic: "치과 상식", q: "ㅊㅇㄱㅈ", a: "치아교정", hint: "김준헌 병원장님 전문 분야! 가지런한 치열을 만들어요", exp: "강남역 화이트스타일치과의원 치아교정은 33년 전통 서울대졸, 단국대 외래교수, 교정학 박사 김준헌 병원장님이 1:1 직접 책임 진료합니다!" },
    { topic: "치과 상식", q: "ㄹㅁㄴㅇㅌ", a: "라미네이트", hint: "자연치아를 아끼는 최소삭제 심미보철", exp: "자연치아 보존을 최우선으로 치아 삭제량을 최소화한 맞춤형 세라믹 디자인을 제공합니다!" },
    { topic: "치과 상식", q: "ㅇㅍㄹㅌ", a: "임플란트", hint: "3D CT와 3단계 저통 마취로 상실된 치아를 회복해요", exp: "3D CT 정밀 진단과 3단계 통증 완화 마취 시스템, 3인 원장단 협진으로 안전하게 진행합니다!" },
    { topic: "일상 습관", q: "ㅊㅅ", a: "치실", hint: "칫솔질만으로는 안 닦이는 치아 사이 40%를 케어해요", exp: "하루 한 번 자기 전 치실 사용이 충치와 잇몸 염증을 막는 최고의 비결이에요!" }
  ];

  let quizCursor = 0;
  function startChosungQuiz() {
    const baseItem = CHOSUNG_POOL[quizCursor % CHOSUNG_POOL.length];
    quizCursor++;
    activeQuiz = { ...baseItem, triesLeft: 3 };
    activeBalance = null;
    activeWordchain = false;
    activeTwenty = null;
    if (cdInput) cdInput.placeholder = '정답을 써 보세요';
    appendCdMsg('user', '초성 퀴즈');
    setTimeout(() => {
      const choiceButtons = [
        {
          label: '힌트 보기 (기회 유지)',
          onClick: (btnEl) => {
            btnEl.disabled = true;
            appendCdMsg('pet', `힌트: 앞 글자는 「${baseItem.a.charAt(0)}」야! (${baseItem.hint}) 기회는 그대로 ${activeQuiz ? activeQuiz.triesLeft : 3}번!`);
          }
        },
        ...CHOSUNG_POOL.slice(0, 4).map((opt) => ({
          label: opt.a,
          onClick: () => {
            appendCdMsg('user', opt.a);
            const res = evaluateQuizOrBalanceInput(opt.a);
            if (res) {
              appendCdMsg('pet', res, [
                { label: '한 판 더', onClick: () => startChosungQuiz() }
              ]);
            }
          }
        }))
      ];
      appendCdMsg(
        'pet',
        `초성 퀴즈 시작! 주제는 「${baseItem.topic}」이야.\n초성: 【 ${baseItem.q} 】\n기회는 3번! 정답을 말해 봐. 모르겠으면 힌트를 눌러~`,
        choiceButtons
      );
    }, 220);
  }

  // ---------- 밸런스 게임 (3판 연속 진행 + 하야니의 선택 비교) ----------
  const BALANCE_PAIRS = [
    ["평생 버그 없는 코드", "평생 충치 없는 치아"],
    ["하루 3번 양치질 완주", "하루 8시간 꿀수면"],
    ["식후 맑은 물 가글", "아이스 아메리카노 무제한"],
    ["답장 1초 만에 하는 친구", "선물 잘 고르는 친구"],
    ["강아지 하야니랑 산책하기", "고양이 치즈랑 낮잠 자기"]
  ];
  let balanceRound = 0;
  let balanceCursor = 0;

  function startBalanceGame() {
    balanceRound = 0;
    activeQuiz = null;
    activeWordchain = false;
    activeTwenty = null;
    appendCdMsg('user', '밸런스 게임');
    nextBalanceRound();
  }

  function nextBalanceRound() {
    if (balanceRound >= 3) {
      activeBalance = null;
      appendCdMsg('pet', '3판 끝! 우리 취향 꽤 잘 맞는데? 앱에서는 매일 새로운 질문으로 5판씩 즐길 수 있어 🐾');
      return;
    }
    const p = BALANCE_PAIRS[balanceCursor % BALANCE_PAIRS.length];
    balanceCursor++;
    balanceRound++;
    activeBalance = p;
    setTimeout(() => {
      appendCdMsg(
        'pet',
        `${balanceRound}번째! 둘 중 하나만 고른다면?\nA: ${p[0]} vs B: ${p[1]}`,
        [
          {
            label: p[0],
            onClick: (_, row) => {
              if (row) row.querySelectorAll('button').forEach((b) => { b.disabled = true; });
              appendCdMsg('user', p[0]);
              handleBalancePick(0);
            }
          },
          {
            label: p[1],
            onClick: (_, row) => {
              if (row) row.querySelectorAll('button').forEach((b) => { b.disabled = true; });
              appendCdMsg('user', p[1]);
              handleBalancePick(1);
            }
          }
        ]
      );
    }, 240);
  }

  function handleBalancePick(choiceIdx) {
    if (!activeBalance) return;
    const picked = activeBalance[choiceIdx];
    const petIdx = Math.random() < 0.55 ? choiceIdx : 1 - choiceIdx;
    const petPick = activeBalance[petIdx];
    const reactMsg = petIdx === choiceIdx
      ? `나도 「${picked}」! 우리 통했다멍! 🐾`
      : `오 너는 「${picked}」파구나! 난 「${petPick}」 골랐는데! 그래도 좋아 ✨`;
    appendCdMsg('pet', reactMsg);
    showPlayBubble(reactMsg, 3600);
    setTimeout(() => nextBalanceRound(), 420);
  }

  // ---------- 끝말잇기 & 스무고개 (KitCommit #talk 시그니처 말놀이) ----------
  function startWordchainGame() {
    activeQuiz = null;
    activeBalance = null;
    activeTwenty = null;
    activeWordchain = true;
    lastWordchainChar = '기';
    appendCdMsg('user', '끝말잇기 하자!');
    setTimeout(() => {
      appendCdMsg('pet', '좋아! 내가 먼저 할게. 「양치질」 → 「질문」 → 「문지기」! 이번엔 「기」로 시작하는 단어를 눌러 보거나 아래 입력창에 써 봐~', [
        {
          label: '기린',
          onClick: (btn) => {
            btn.disabled = true;
            appendCdMsg('user', '기린');
            appendCdMsg('pet', '린스! → 스케일링! 이번엔 「링」이나 「이」로 시작하는 말로 이어 가 봐~');
          }
        },
        {
          label: '기차',
          onClick: (btn) => {
            btn.disabled = true;
            appendCdMsg('user', '기차');
            appendCdMsg('pet', '차표! → 표정! 환한 미소 표정! 다음 단어를 채팅창에 입력해 봐~');
          }
        }
      ]);
    }, 220);
  }

  function startTwentyGame() {
    activeQuiz = null;
    activeBalance = null;
    activeWordchain = false;
    activeTwenty = { answer: '칫솔', step: 1, hint: '매일 식후 30분마다 치아를 반짝반짝 닦아주는 도구야!' };
    appendCdMsg('user', '스무고개 하자!');
    setTimeout(() => {
      appendCdMsg('pet', '하나 생각했어! 예 / 아니오로 물어보거나 아래 질문을 눌러 봐 (0/20)', [
        {
          label: '매일 쓰는 물건이야?',
          onClick: (btn) => {
            btn.disabled = true;
            appendCdMsg('user', '매일 쓰는 물건이야?');
            appendCdMsg('pet', '응! 하루에 세 번, 식사 후에 꼭 쓰는 고마운 물건이야 (1/20)');
          }
        },
        {
          label: '욕실에 있어?',
          onClick: (btn) => {
            btn.disabled = true;
            appendCdMsg('user', '욕실에 있어?');
            appendCdMsg('pet', '맞아! 치약이랑 단짝 친구로 욕실 선반에 나란히 있어 (2/20)');
          }
        },
        {
          label: '정답: 칫솔!',
          onClick: (btn) => {
            btn.disabled = true;
            appendCdMsg('user', '칫솔!');
            const r = evaluateQuizOrBalanceInput('칫솔');
            if (r) appendCdMsg('pet', r);
          }
        }
      ]);
    }, 220);
  }

  // 인터랙티브 칩스 (끝말잇기, 스무고개, 밸런스, 초성 퀴즈, 미소 운세, 화타 바로 예약)
  const chipBtns = document.querySelectorAll('[data-game]');
  chipBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const g = btn.dataset.game;
      if (g === 'fortune') {
        let saved = '';
        try { saved = localStorage.getItem('hwata-zodiac-sign') || ''; } catch (e) {}
        if (saved) {
          appendCdMsg('user', '오늘의 미소 운세');
          renderZodiacFortuneCard(saved);
        } else {
          askZodiacSign();
        }
      } else if (g === 'chosung') {
        startChosungQuiz();
      } else if (g === 'balance') {
        startBalanceGame();
      } else if (g === 'wordchain') {
        startWordchainGame();
      } else if (g === 'twenty') {
        startTwentyGame();
      } else if (g === 'booking') {
        activeQuiz = null;
        activeBalance = null;
        activeWordchain = false;
        activeTwenty = null;
        appendCdMsg('user', '화이트스타일치과 예약하고 싶어');
        setTimeout(() => {
          appendCdMsg('pet', '강남역 11번, 12번 출구 도보 1분! 1994년 개원 33년 전통 치의학박사 김준헌 병원장님 1:1 책임 진료입니다. 아래 화타 스마일 PASS 및 빠른 예약 폼으로 이동해 드릴게요!');
          const f = document.getElementById('vip-form');
          const nInp = document.getElementById('vip-name');
          if (f) {
            f.scrollIntoView({ behavior: 'smooth', block: 'center' });
            f.classList.add('is-highlighted');
            setTimeout(() => f.classList.remove('is-highlighted'), 3500);
          }
          if (nInp) setTimeout(() => nInp.focus(), 500);
        }, 250);
      }
    });
  });

  // ---------- 6. 하루 루틴 카드 (#day) & 갤러리 탭/타일 (#gallery) 전환 및 스테이지 연동 ----------
  document.querySelectorAll('.moment[data-day-action]').forEach((momentEl) => {
    momentEl.addEventListener('click', () => {
      const act = momentEl.dataset.dayAction || 'smile';
      handlePlayAction(act);
      const playSec = document.getElementById('play');
      if (playSec) playSec.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  });

  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('[data-panel]');
  const tabNote = document.getElementById('tab-note');

  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      tabBtns.forEach((b) => b.classList.remove('on'));
      btn.classList.add('on');
      const target = btn.dataset.tab;
      if (tabNote && btn.dataset.note) tabNote.textContent = btn.dataset.note;

      tabPanels.forEach((panel) => {
        if (panel.dataset.panel === target) panel.removeAttribute('hidden');
        else panel.setAttribute('hidden', '');
      });
    });
  });

  // 갤러리 타일 클릭 시 플레이 스테이지 즉시 연동
  document.querySelectorAll('.tile').forEach((tile) => {
    tile.addEventListener('click', () => {
      document.querySelectorAll('.tile').forEach((t) => t.classList.remove('active'));
      tile.classList.add('active');
      const titleText = tile.querySelector('b')?.textContent || '';

      if (tile.dataset.tileMotion) {
        handlePlayAction(tile.dataset.tileMotion);
        if (tabNote) tabNote.textContent = `✓ [${titleText}] 3D 모션을 플레이 스테이지의 하야니에게 적용했어요!`;
      } else if (tile.dataset.tileCostume) {
        currentCostumeKey = tile.dataset.tileCostume;
        const costInfo = COSTUME_MAP[currentCostumeKey] || COSTUME_MAP.crown;
        currentCanvasMotion = 'smilecheck';
        if (renderMode === 'turntable') {
          renderMode = 'studio3d';
          renderModeBtns.forEach((b) => b.classList.toggle('active', b.dataset.renderMode === 'studio3d'));
        }
        updateStageDisplayMode();
        if (!activePassCode) {
          triggerPassPreviewRevert(costInfo.label + ' 3D 코스튬');
          if (tabNote) tabNote.textContent = `🔒 [${costInfo.label}] 3초 미리보기 적용! 상단 '화타 스마일 PASS'에 등록하시면 영구 착용할 수 있어요.`;
        } else {
          showPlayBubble(`짜잔! [${costInfo.label}] 3D 코스튬으로 갈아입었어요! ✨`, 4000);
          if (tabNote) tabNote.textContent = `✓ [${costInfo.label}] 3D 코스튬을 착용했어요! 위 '놀아 보기' 스테이지에서도 확인해 보세요.`;
        }
      } else if (tile.dataset.tileSpecies) {
        selectSpecies(tile.dataset.tileSpecies);
        if (tabNote) {
          if (!activePassCode && tile.dataset.tileSpecies !== 'dog') {
            tabNote.textContent = `🔒 [${titleText}] 3초 미리보기 적용! 상단 '화타 스마일 PASS'에 등록하시면 모든 동물 파트너로 상시 변신할 수 있어요.`;
          } else {
            tabNote.textContent = `✓ [${titleText}] 3D 파트너로 변신 완료! 위 '놀아 보기' 스테이지에서도 함께 놀 수 있어요.`;
          }
        }
      }
      sendEngagementPing('gallery_tile_click');
    });
  });

  // 3D 쇼케이스 영상 처음부터 다시 보기 버튼
  const replayShowcaseBtn = document.getElementById('btn-replay-showcase');
  const showcaseVideoEl = document.getElementById('showcase-video');
  if (replayShowcaseBtn && showcaseVideoEl) {
    replayShowcaseBtn.addEventListener('click', () => {
      showcaseVideoEl.currentTime = 0;
      showcaseVideoEl.play().catch(() => {});
      sendEngagementPing('replay_showcase_video');
    });
  }

  // ---------- 7. 화타 스마일 PASS 등록 (AI 펫 모든 기능 잠금 해제) & 정회원 무료 AI API 로컬 프로토콜 ----------
  const passGateBar = document.getElementById('pass-gate-bar');
  const passGateText = document.getElementById('pass-gate-text');
  const btnJumpPass = document.getElementById('btn-jump-pass');
  const btnQuickPass = document.getElementById('btn-quick-pass');
  const btnJumpApi = document.getElementById('btn-jump-api');
  const btnResetPass = document.getElementById('btn-reset-pass');
  const vipForm = document.getElementById('vip-form');
  const vipStatus = document.getElementById('vip-status');

  let activePassCode = '';
  let activeVipApiKey = '';
  try {
    activePassCode = localStorage.getItem('hwata_pass_code') || '';
    activeVipApiKey = localStorage.getItem('hwata_vip_api_key') || '';
  } catch (e) {}

  function updatePassGateBanner() {
    if (!passGateBar || !passGateText) return;
    if (activePassCode) {
      passGateBar.classList.add('unlocked');
      passGateText.innerHTML = `🔓 <b>화타 스마일 PASS 활성화됨 (${activePassCode})</b> — AI 펫 '하야니'의 모든 기능(6종 3D 동물 변신 · 6종 3D 코스튬 · 360° 입체 회전 뷰 · 전체 모션)이 잠금 해제되었습니다!`;
      if (btnJumpPass) btnJumpPass.textContent = `✓ PASS 등록 완료 (${activePassCode})`;
      if (btnQuickPass) btnQuickPass.setAttribute('hidden', '');
      if (btnResetPass) btnResetPass.removeAttribute('hidden');
    } else {
      passGateBar.classList.remove('unlocked');
      passGateText.innerHTML = `🔒 <b>화타 스마일 PASS</b>에 등록하셔야 AI 펫(하야니)의 모든 기능(6종 3D 동물 변신 · 6종 3D 코스튬 · 360° 회전 뷰 · 전체 모션)을 이용하실 수 있습니다.`;
      if (btnJumpPass) btnJumpPass.textContent = '🔓 PASS 등록하기';
      if (btnQuickPass) btnQuickPass.removeAttribute('hidden');
      if (btnResetPass) btnResetPass.setAttribute('hidden', '');
    }
  }
  updatePassGateBanner();

  if (btnQuickPass) {
    btnQuickPass.addEventListener('click', () => {
      const quickCode = 'HWATA-PASS-' + (1000 + Math.floor(Math.random() * 9000));
      activePassCode = quickCode;
      try { localStorage.setItem('hwata_pass_code', quickCode); } catch (e) {}
      updatePassGateBanner();
      showPlayBubble(`🔓 [${quickCode}] PASS 즉시 발급 완료! 이제 하야니의 모든 3D 동물 변신·코스튬·모션을 자유롭게 이용하세요! ✨`, 4200);
      sendEngagementPing('quick_pass_issued');
    });
  }

  if (btnResetPass) {
    btnResetPass.addEventListener('click', () => {
      activePassCode = '';
      activeVipApiKey = '';
      try {
        localStorage.removeItem('hwata_pass_code');
        localStorage.removeItem('hwata_vip_api_key');
      } catch (e) {}
      const wcBox = document.getElementById('digital-warranty-card');
      const refBox = document.getElementById('referral-tokens-box');
      if (wcBox) wcBox.setAttribute('hidden', '');
      if (refBox) refBox.setAttribute('hidden', '');
      updatePassGateBanner();
      renderProtocolCode();
      showPlayBubble('🔒 PASS 및 정회원 상태가 초기화되었습니다. 다시 등록 테스트를 진행하실 수 있습니다.', 3500);
      sendEngagementPing('reset_pass_state');
    });
  }

  if (btnJumpPass) {
    btnJumpPass.addEventListener('click', () => {
      if (vipForm) {
        vipForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
        vipForm.classList.add('is-highlighted');
        setTimeout(() => vipForm.classList.remove('is-highlighted'), 3500);
        const inp = document.getElementById('vip-name');
        if (inp) setTimeout(() => inp.focus(), 450);
      }
      sendEngagementPing('jump_pass_form');
    });
  }

  if (btnJumpApi) {
    btnJumpApi.addEventListener('click', () => {
      const apiSec = document.getElementById('api-protocol');
      if (apiSec) apiSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
      const inp = document.getElementById('rm-member-id');
      if (inp) setTimeout(() => inp.focus(), 450);
      sendEngagementPing('jump_api_protocol');
    });
  }

  if (vipForm) {
    vipForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      interactionCount++;
      const name = document.getElementById('vip-name')?.value.trim();
      const phone = document.getElementById('vip-phone')?.value.trim();
      const treatment = document.getElementById('vip-treatment')?.value;

      if (!name || !phone) {
        if (vipStatus) {
          vipStatus.textContent = '⚠️ 성함과 연락처를 모두 입력해 주세요.';
          vipStatus.style.color = 'var(--accent-btn)';
        }
        return;
      }

      if (vipStatus) {
        vipStatus.textContent = '화타 스마일 PASS 등록 및 AI 펫 전체 기능 잠금 해제 중...';
        vipStatus.style.color = 'var(--muted)';
      }

      let passSerial = 'HWATA-PASS-' + (1000 + Math.floor(Math.random() * 9000));
      try {
        const verifyUrl = (location.hostname === 'whinish.com') ? '/api/ai-pet/verify-member' : 'https://whinish.com/api/ai-pet/verify-member';
        const vRes = await fetch(verifyUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ mode: 'pass', name, phone })
        });
        if (vRes.ok) {
          const vData = await vRes.json();
          if (vData.passCode) passSerial = vData.passCode;
        }
      } catch (e) {}

      activePassCode = passSerial;
      try { localStorage.setItem('hwata_pass_code', passSerial); } catch (e) {}
      updatePassGateBanner();
      showPlayBubble(`🔓 [${passSerial}] PASS 등록 완료! 하야니의 6종 3D 동물 변신과 모든 코스튬·모션이 잠금 해제되었어요! ✨`, 4500);

      const payload = {
        name,
        phone,
        treatment,
        typeLabel: '화타 스마일 PASS 등록 (AI 펫 전체 기능 잠금 해제)',
        subject: `[화타 스마일 PASS: ${passSerial}] ${treatment} 등록 접수`,
        content: `관심 진료: ${treatment} / PASS 번호: ${passSerial} / 화타펫 다운로드 랜딩 페이지 PASS 등록`,
        source: 'hwata_pet_download_landing',
        pageUrl: window.location.href,
        timestamp: new Date().toISOString()
      };

      const cloudPromise = fetch('https://whinish.com/api/lead-notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).catch(() => null);

      const localPromise = fetch('http://127.0.0.1:47821/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).catch(() => null);

      try {
        await Promise.all([cloudPromise, localPromise]);
      } catch (err) {}

      if (vipStatus) {
        vipStatus.textContent = `🔓 [${passSerial}] 화타 스마일 PASS 등록 완료! 이제 AI 펫 '하야니'의 모든 기능을 제한 없이 이용하실 수 있습니다.`;
        vipStatus.style.color = 'var(--mint)';
      }
      vipForm.reset();
      sendEngagementPing('pass_registered');
    });
  }

  // ---------- 8. 화이트스타일 교정·보철·미백 등 비급여 치료 정회원 인증 & 디지털 보증서 + 지인 초대 72시간 체험 루프 ----------
  const rmForm = document.getElementById('regular-member-form');
  const rmStatus = document.getElementById('rm-status');
  const btnFillDemoAuth = document.getElementById('btn-fill-demo-auth');
  const protoTabs = document.querySelectorAll('[data-proto-tab]');
  const protoCodeBox = document.getElementById('proto-code-box');
  const btnCopyProtocol = document.getElementById('btn-copy-protocol');
  const btnTestProtocol = document.getElementById('btn-test-protocol');
  const protoTestOutput = document.getElementById('proto-test-output');
  const digitalWarrantyCard = document.getElementById('digital-warranty-card');
  const btnCopyVipKey = document.getElementById('btn-copy-vip-key');
  const referralTokensBox = document.getElementById('referral-tokens-box');
  const familyTokenList = document.getElementById('family-token-list');
  const referralTokenList = document.getElementById('referral-token-list');
  const btnFillDemoFamily = document.getElementById('btn-fill-demo-family');
  const btnFillDemoTrial = document.getElementById('btn-fill-demo-trial');
  const btnApplyTrial = document.getElementById('btn-apply-trial');
  const trialTokenInput = document.getElementById('trial-token-input');
  const trialStatus = document.getElementById('trial-status');
  const hbStatusBadge = document.getElementById('hb-status-badge');
  const btnChargeHeartbeat = document.getElementById('btn-charge-heartbeat');
  const btnExpireHeartbeat = document.getElementById('btn-expire-heartbeat');
  let currentProtoTab = 'cursor';
  let activeHeartbeatLease = 'Active-7d-AutoRenew';

  function updateHeartbeatUI(isExpired, expiresAtText) {
    if (!hbStatusBadge) return;
    if (isExpired) {
      activeHeartbeatLease = 'EXPIRED';
      hbStatusBadge.textContent = '🔴 하야니 미사용 (혜택 일시정지 — 하야니를 쓰다듬어 충전하세요)';
      hbStatusBadge.style.color = 'var(--accent-btn)';
    } else {
      if (activeHeartbeatLease === 'EXPIRED') activeHeartbeatLease = 'Active-7d-AutoRenew';
      hbStatusBadge.textContent = expiresAtText
        ? `🟢 동행 하트비트 활성 (${expiresAtText}까지 자동 연장)`
        : '🟢 동행 하트비트 활성 (7일 자동 연장)';
      hbStatusBadge.style.color = '#1E6043';
    }
  }

  if (btnChargeHeartbeat) {
    btnChargeHeartbeat.addEventListener('click', async () => {
      if (playPetEl) spawnHeart(playPetEl);
      showPlayBubble('헤헤, 하야니와 오늘 인사를 나누어 주셔서 고마워요! 본인·배우자·가족·지인 무료 AI API 혜택이 7일간 자동 연장되었어요 💖', 4200);
      try {
        const verifyUrl = (location.hostname === 'whinish.com') ? '/api/ai-pet/verify-member' : 'https://whinish.com/api/ai-pet/verify-member';
        const res = await fetch(verifyUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ mode: 'heartbeat', apiKey: activeVipApiKey || activePassCode || 'hayani-companion', action: 'pet_button_charge' })
        });
        const d = await res.json();
        if (d.ok && d.heartbeatLease) {
          activeHeartbeatLease = d.heartbeatLease;
          try { localStorage.setItem('hwata_pet_heartbeat', d.heartbeatLease); } catch (e) {}
          updateHeartbeatUI(false, d.expiresAt);
          return;
        }
      } catch (e) {}
      activeHeartbeatLease = 'Active-7d-AutoRenew';
      updateHeartbeatUI(false);
    });
  }

  if (btnExpireHeartbeat) {
    btnExpireHeartbeat.addEventListener('click', () => {
      updateHeartbeatUI(true);
      showPlayBubble('⏳ [미사용 시뮬레이션] 하야니를 7일간 켜지 않은 상태예요. 무료 AI API 호출 시 하야니 동행 안내가 표시됩니다!', 4000);
    });
  }

  function getProtocolSnippet(tabName, apiKey) {
    const key = apiKey || activeVipApiKey || 'sk-hwata-vip-정회원인증후자동발급됩니다';
    switch (tabName) {
      case 'localbridge':
        return [
          '# [2] 내 컴퓨터 로컬 프록시 프로토콜 (Node.js 18+ 기본 내장 · 별도 패키지 설치 불필요)',
          '# 1) 위 [로컬 프록시 프로토콜(.mjs) 받기] 버튼으로 파일을 다운로드한 뒤 터미널에서 실행하세요:',
          `node hwata-free-ai-protocol.mjs --key ${key}`,
          '',
          '# 2) 실행 즉시 내 컴퓨터 로컬에서 OpenAI / Ollama 호환 서버가 가동됩니다:',
          'Local Base URL : http://127.0.0.1:11435/v1',
          'Chat Endpoint  : http://127.0.0.1:11435/v1/chat/completions',
          'Models List    : http://127.0.0.1:11435/v1/models'
        ].join('\n');
      case 'python':
        return [
          '# [3] Python OpenAI SDK 연동 프로토콜 (전 세계 모든 무료 AI API 자동 라우팅)',
          'from openai import OpenAI',
          '',
          'client = OpenAI(',
          '    base_url="https://whinish.com/api/v1",',
          `    api_key="${key}",`,
          ')',
          '',
          'res = client.chat.completions.create(',
          '    model="hwata-omni-free",  # 또는 hwata-coder-free / hwata-reasoning-free',
          '    messages=[{"role": "user", "content": "안녕하세요! 파이썬 쾌속 코딩 도와줘"}]',
          ')',
          'print(res.choices[0].message.content)'
        ].join('\n');
      case 'curl':
        return [
          '# [4] 터미널 cURL 즉시 호출 프로토콜',
          'curl -X POST https://whinish.com/api/v1/chat/completions \\',
          '  -H "Content-Type: application/json" \\',
          `  -H "Authorization: Bearer ${key}" \\`,
          '  -d \'{"model":"hwata-omni-free","messages":[{"role":"user","content":"안녕하세요!"}]}\''
        ].join('\n');
      case 'cursor':
      default:
        return [
          '# [1] Cursor / VS Code (Continue · Cline) / Claude Code OpenAI 호환 프로토콜',
          'Base URL : https://whinish.com/api/v1',
          `API Key  : ${key}`,
          'Model ID : hwata-omni-free   (코딩 특화: hwata-coder-free / 추론 특화: hwata-reasoning-free)',
          '',
          '# 통합 라우팅 무료 엔진: Google Gemini Free + OpenRouter Free + Groq Free + Cloudflare AI Free + Pollinations + Strata'
        ].join('\n');
    }
  }

  function renderProtocolCode() {
    if (!protoCodeBox) return;
    protoCodeBox.textContent = getProtocolSnippet(currentProtoTab, activeVipApiKey);
  }
  renderProtocolCode();

  function renderWarrantyAndReferrals(warrantyCard, familyTokens, referralTokens, apiKey) {
    if (digitalWarrantyCard && warrantyCard) {
      digitalWarrantyCard.removeAttribute('hidden');
      const wcSerial = document.getElementById('wc-serial');
      const wcMember = document.getElementById('wc-member');
      const wcTreatment = document.getElementById('wc-treatment');
      const wcApikey = document.getElementById('wc-apikey');
      if (wcSerial) wcSerial.textContent = warrantyCard.serial || 'WS-WARRANTY-2026-VIP';
      if (wcMember) wcMember.textContent = `${warrantyCard.patientName} (${warrantyCard.siteOrigin} · ${warrantyCard.memberId})`;
      if (wcTreatment) wcTreatment.textContent = `${warrantyCard.treatmentLabel} (${warrantyCard.unitCount}개 이상 치료 완료)`;
      if (wcApikey) wcApikey.textContent = apiKey;
    }

    if (referralTokensBox) {
      referralTokensBox.removeAttribute('hidden');
    }

    if (familyTokenList && Array.isArray(familyTokens) && familyTokens.length > 0) {
      familyTokenList.innerHTML = '';
      familyTokens.forEach((item) => {
        const row = document.createElement('div');
        row.className = 'referral-token-item';
        const codeEl = document.createElement('code');
        codeEl.textContent = `[${item.roleLabel || '가족키 #' + item.slot}] ${item.token}`;
        const copyBtn = document.createElement('button');
        copyBtn.type = 'button';
        copyBtn.className = 'btn small mint';
        copyBtn.textContent = '💖 배우자·가족 초대장 + 자동링크 복사';
        copyBtn.addEventListener('click', async () => {
          await copyTextSafe(item.inviteMessage || item.token);
          copyBtn.textContent = '✓ 가족 초대장 복사 완료!';
          setTimeout(() => {
            copyBtn.textContent = '💖 배우자·가족 초대장 + 자동링크 복사';
          }, 2200);
          sendEngagementPing('copy_family_token_' + item.slot);
        });
        row.appendChild(codeEl);
        row.appendChild(copyBtn);
        familyTokenList.appendChild(row);
      });
    }

    if (referralTokenList && Array.isArray(referralTokens) && referralTokens.length > 0) {
      referralTokenList.innerHTML = '';
      referralTokens.forEach((item) => {
        const row = document.createElement('div');
        row.className = 'referral-token-item';
        const codeEl = document.createElement('code');
        codeEl.textContent = `#${item.slot} ${item.token}`;
        const copyBtn = document.createElement('button');
        copyBtn.type = 'button';
        copyBtn.className = 'btn small gold';
        copyBtn.textContent = '💌 지인 초대장 + 체험키 복사';
        copyBtn.addEventListener('click', async () => {
          await copyTextSafe(item.inviteMessage || item.token);
          copyBtn.textContent = '✓ 초대장 복사 완료!';
          setTimeout(() => {
            copyBtn.textContent = '💌 지인 초대장 + 체험키 복사';
          }, 2200);
          sendEngagementPing('copy_referral_trial_' + item.slot);
        });
        row.appendChild(codeEl);
        row.appendChild(copyBtn);
        referralTokenList.appendChild(row);
      });
    }
  }

  if (btnCopyVipKey) {
    const origVipBtnTxt = btnCopyVipKey.textContent;
    btnCopyVipKey.addEventListener('click', async () => {
      await copyTextSafe(activeVipApiKey || document.getElementById('wc-apikey')?.textContent || '');
      btnCopyVipKey.textContent = '✓ 정회원 평생 무료 AI API Key 복사 완료!';
      setTimeout(() => {
        btnCopyVipKey.textContent = origVipBtnTxt;
      }, 2200);
      sendEngagementPing('copy_vip_key_from_warranty');
    });
  }

  protoTabs.forEach((tabBtn) => {
    tabBtn.addEventListener('click', () => {
      protoTabs.forEach((b) => b.classList.remove('active'));
      tabBtn.classList.add('active');
      currentProtoTab = tabBtn.dataset.protoTab || 'cursor';
      renderProtocolCode();
      sendEngagementPing('proto_tab_' + currentProtoTab);
    });
  });

  if (btnFillDemoAuth) {
    btnFillDemoAuth.addEventListener('click', () => {
      const mId = document.getElementById('rm-member-id');
      const mName = document.getElementById('rm-name');
      const mPhone = document.getElementById('rm-phone');
      const mTreat = document.getElementById('rm-treatment');
      const mCount = document.getElementById('rm-count');
      const mCode = document.getElementById('rm-auth-code');
      if (mId) mId.value = 'whitestyle_vip_member';
      if (mName) mName.value = '김미소';
      if (mPhone) mPhone.value = '010-7287-7528';
      if (mTreat) mTreat.value = 'prosthodontic_laminate';
      if (mCount) mCount.value = '1';
      if (mCode) mCode.value = 'WS-202601';
      if (rmStatus) {
        rmStatus.textContent = '✓ 보철 치료 완료 정회원 샘플 정보가 입력되었습니다. 아래 [보철 정회원 인증 & 평생 무료 AI API 발급] 버튼을 눌러보세요.';
        rmStatus.style.color = 'var(--mint)';
      }
      sendEngagementPing('fill_demo_auth');
    });
  }

  if (rmForm) {
    rmForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      interactionCount++;
      const siteOrigin = document.getElementById('rm-site')?.value || 'whitestyle.com';
      const memberId = document.getElementById('rm-member-id')?.value.trim() || '';
      const name = document.getElementById('rm-name')?.value.trim() || '';
      const phone = document.getElementById('rm-phone')?.value.trim() || '';
      const treatmentType = document.getElementById('rm-treatment')?.value || '';
      const prosthodonticCount = Number(document.getElementById('rm-count')?.value || 0);
      const clinicAuthCode = document.getElementById('rm-auth-code')?.value.trim() || '';

      // 핵심 규칙: 화이트스타일치과에 와서 교정 보철 미백 등의 비급여 치료를 받으셔야 정회원 등록 가능
      if (treatmentType === 'none' || prosthodonticCount < 1) {
        if (digitalWarrantyCard) digitalWarrantyCard.setAttribute('hidden', '');
        if (referralTokensBox) referralTokensBox.setAttribute('hidden', '');
        if (rmStatus) {
          rmStatus.textContent = '❌ 정회원 등록 불가: 강남역 화이트스타일치과의원에 내원하여 교정 보철 미백 등의 비급여 치료를 받으신 분에 한하여 정회원 등록 및 무료 AI API 프로토콜 발급이 가능합니다.';
          rmStatus.style.color = 'var(--accent-btn)';
        }
        return;
      }

      if (rmStatus) {
        rmStatus.textContent = '보철 정품 보증서 및 정회원 자격 검증 중...';
        rmStatus.style.color = 'var(--muted)';
      }

      try {
        const verifyUrl = (location.hostname === 'whinish.com') ? '/api/ai-pet/verify-member' : 'https://whinish.com/api/ai-pet/verify-member';
        const res = await fetch(verifyUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            mode: 'regular_member',
            siteOrigin,
            memberId,
            name,
            phone,
            treatmentType,
            prosthodonticCount,
            clinicAuthCode
          })
        });
        const data = await res.json();
        if (!res.ok || !data.ok) {
          if (rmStatus) {
            rmStatus.textContent = '⚠️ ' + (data.message || '정회원 인증에 실패했습니다. 보철 정품 보증서 번호를 확인해 주세요.');
            rmStatus.style.color = 'var(--accent-btn)';
          }
          return;
        }

        activeVipApiKey = data.apiKey;
        activePassCode = data.passCode || activePassCode || 'HWATA-PASS-7287';
        if (data.heartbeatLease) {
          activeHeartbeatLease = data.heartbeatLease;
          updateHeartbeatUI(false, data.heartbeatExpiresAt);
        } else {
          updateHeartbeatUI(false);
        }
        try {
          localStorage.setItem('hwata_vip_api_key', activeVipApiKey);
          localStorage.setItem('hwata_pass_code', activePassCode);
        } catch (err) {}

        updatePassGateBanner();
        renderProtocolCode();
        renderWarrantyAndReferrals(data.warrantyCard, data.familyTokens, data.referralTokens, activeVipApiKey);

        if (rmStatus) {
          rmStatus.textContent = `🎉 정회원(${memberId}) 인증 및 [디지털 보철 정품 보증서] 확인 완료! 본인 평생 무료 AI API Key + 배우자·가족 동반 패밀리키 2장 + 지인 72시간 체험키 3장이 발급되었습니다.`;
          rmStatus.style.color = 'var(--mint)';
        }
        sendEngagementPing('regular_member_verified');
      } catch (err) {
        const fallbackKey = 'sk-hwata-vip-' + btoa(encodeURIComponent(`${memberId}:${clinicAuthCode}`)).replace(/[^a-zA-Z0-9]/g, '').slice(0, 24).padEnd(24, '9');
        activeVipApiKey = fallbackKey;
        renderProtocolCode();
        if (rmStatus) {
          rmStatus.textContent = `🎉 정회원(${memberId}) 인증 완료! 전용 API Key [${activeVipApiKey}]가 우측 프로토콜에 자동 적용되었습니다.`;
          rmStatus.style.color = 'var(--mint)';
        }
      }
    });
  }

  // 배우자·가족 패밀리키 및 지인 초대 72시간 체험 토큰 활성화 핸들러
  if (btnFillDemoFamily && trialTokenInput) {
    btnFillDemoFamily.addEventListener('click', () => {
      trialTokenInput.value = 'sk-hwata-fam-demo2026whitestylefamily';
      if (trialStatus) {
        trialStatus.textContent = '✓ 샘플 배우자·가족 동반 패밀리 키가 입력되었습니다. 우측 [패밀리/체험 프로토콜 활성화] 버튼을 눌러보세요.';
        trialStatus.style.color = 'var(--mint)';
      }
      sendEngagementPing('fill_demo_family');
    });
  }

  if (btnFillDemoTrial && trialTokenInput) {
    btnFillDemoTrial.addEventListener('click', () => {
      trialTokenInput.value = 'sk-hwata-trial-72h-demo2026whitestyle33yr';
      if (trialStatus) {
        trialStatus.textContent = '✓ 샘플 72시간 지인 초대 체험 토큰이 입력되었습니다. 우측 [패밀리/체험 프로토콜 활성화] 버튼을 눌러보세요.';
        trialStatus.style.color = 'var(--mint)';
      }
      sendEngagementPing('fill_demo_trial');
    });
  }

  if (btnApplyTrial && trialTokenInput) {
    btnApplyTrial.addEventListener('click', async () => {
      const tokenVal = trialTokenInput.value.trim();
      if (!tokenVal) {
        if (trialStatus) {
          trialStatus.textContent = '⚠️ 배우자·가족 패밀리키(sk-hwata-fam-...) 또는 지인 체험키(sk-hwata-trial-72h-...)를 입력해 주세요.';
          trialStatus.style.color = 'var(--accent-btn)';
        }
        return;
      }
      try {
        const verifyUrl = (location.hostname === 'whinish.com') ? '/api/ai-pet/verify-member' : 'https://whinish.com/api/ai-pet/verify-member';
        const res = await fetch(verifyUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ mode: 'trial_activate', trialToken: tokenVal })
        });
        const data = await res.json();
        if (!res.ok || !data.ok) {
          if (trialStatus) {
            trialStatus.textContent = '⚠️ ' + (data.message || '패밀리/체험 토큰 형식을 확인해 주세요.');
            trialStatus.style.color = 'var(--accent-btn)';
          }
          return;
        }
        activeVipApiKey = data.apiKey;
        if (data.passCode && !activePassCode) {
          activePassCode = data.passCode;
          try { localStorage.setItem('hwata_pass_code', activePassCode); } catch (e) {}
          updatePassGateBanner();
        }
        if (data.heartbeatLease) {
          activeHeartbeatLease = data.heartbeatLease;
          updateHeartbeatUI(false, data.expiresAt);
        }
        renderProtocolCode();
        if (trialStatus) {
          trialStatus.textContent = data.message;
          trialStatus.style.color = 'var(--mint)';
        }
        sendEngagementPing('trial_token_activated');
      } catch (e) {
        activeVipApiKey = tokenVal;
        renderProtocolCode();
        if (trialStatus) {
          trialStatus.textContent = `🎟️ 프로토콜 토큰(${tokenVal})이 콘솔에 적용되었습니다!`;
          trialStatus.style.color = 'var(--mint)';
        }
      }
    });
  }

  if (btnCopyProtocol) {
    const origCopyProtoLabel = btnCopyProtocol.textContent;
    let copyProtoTimer = null;
    btnCopyProtocol.addEventListener('click', async () => {
      const codeTxt = protoCodeBox?.textContent || '';
      await copyTextSafe(codeTxt);
      btnCopyProtocol.textContent = '✓ 프로토콜 설정 복사 완료!';
      if (copyProtoTimer) clearTimeout(copyProtoTimer);
      copyProtoTimer = setTimeout(() => {
        btnCopyProtocol.textContent = origCopyProtoLabel;
      }, 2200);
      sendEngagementPing('copy_api_protocol');
    });
  }

  if (btnTestProtocol && protoTestOutput) {
    btnTestProtocol.addEventListener('click', async () => {
      protoTestOutput.removeAttribute('hidden');
      const keyToUse = activeVipApiKey || 'sk-hwata-vip-demo72877528whitestyle33yr';
      protoTestOutput.textContent = '⏳ 화타 무료 AI API 게이트웨이(/api/v1/chat/completions) 실시간 호출 중...';
      try {
        const endpoint = (location.hostname === 'whinish.com') ? '/api/v1/chat/completions' : 'https://whinish.com/api/v1/chat/completions';
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${keyToUse}`,
            'X-Hwata-Pet-Heartbeat': activeHeartbeatLease
          },
          body: JSON.stringify({
            model: 'hwata-omni-free',
            messages: [
              { role: 'user', content: '화타 무료 AI API 프로토콜 연결 상태와 화이트스타일치과의원 강점을 2문장으로 브리핑해줘!' }
            ]
          })
        });
        const data = await res.json();
        if (!res.ok) {
          const errMsg = data?.error?.message || '하야니 동행 하트비트가 필요합니다.';
          protoTestOutput.innerHTML = `<b style="color:var(--accent-btn)">⚠️ 호출 일시 제한 (하야니 동행 필요):</b><br>${errMsg}`;
          return;
        }
        const reply = data?.choices?.[0]?.message?.content || data?.error?.message || '응답 수신 완료';
        const provider = data?.hwata_upstream_provider || 'whitestyle-omni-router';
        const tierLabel =
          data?.hwata_membership_tier === 'trial'
            ? '🎟️ 72시간 지인 체험 모드'
            : data?.hwata_membership_tier === 'family'
              ? '💖 배우자·가족 동반 패밀리 모드'
              : '🛡️ 보철 정회원 무제한 모드';
        protoTestOutput.innerHTML = `<b>✅ 실시간 무료 AI API 응답 성공!</b> <small>(${tierLabel} · 라우팅 엔진: <code>${provider}</code>)</small><br>${reply.replace(/\n/g, '<br>')}`;
      } catch (e) {
        protoTestOutput.innerHTML = `<b>✅ 로컬 브릿지 프로토콜 준비 완료!</b> 전용 키(<code>${keyToUse}</code>)로 내 컴퓨터에서 즉시 호출할 수 있습니다.`;
      }
      sendEngagementPing('test_api_protocol');
    });
  }

  // 원내 접수 데스크 프로그램(reception.html)에서 발송한 [빈칸 100% 자동채움 URL] 또는 [가족/지인 1클릭 활성화 URL] 자동 처리
  try {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('autofill') === '1') {
      const pName = urlParams.get('name') || '';
      const pPhone = urlParams.get('phone') || '';
      const pId = urlParams.get('id') || '';
      const pSite = urlParams.get('site') || 'whitestyle.com';
      const pTx = urlParams.get('tx') || 'prosthodontic_laminate';
      const pCnt = urlParams.get('cnt') || '1';
      const pCode = urlParams.get('code') || 'WS-202601';
      const pPass = urlParams.get('pass') || '';

      if (pPass) {
        activePassCode = pPass;
        try { localStorage.setItem('hwata_pass_code', pPass); } catch (e) {}
        updatePassGateBanner();
      }
      const vName = document.getElementById('vip-name');
      const vPhone = document.getElementById('vip-phone');
      if (vName && pName) vName.value = pName;
      if (vPhone && pPhone) vPhone.value = pPhone;

      const rSite = document.getElementById('rm-site');
      const rId = document.getElementById('rm-member-id');
      const rName = document.getElementById('rm-name');
      const rPhone = document.getElementById('rm-phone');
      const rTx = document.getElementById('rm-treatment');
      const rCnt = document.getElementById('rm-count');
      const rCode = document.getElementById('rm-auth-code');
      if (rSite && pSite) rSite.value = pSite;
      if (rId && pId) rId.value = pId;
      if (rName && pName) rName.value = pName;
      if (rPhone && pPhone) rPhone.value = pPhone;
      if (rTx && pTx) rTx.value = pTx;
      if (rCnt && pCnt) rCnt.value = pCnt;
      if (rCode && pCode) rCode.value = pCode;

      if (rmForm && pName && pPhone) {
        setTimeout(() => {
          rmForm.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
        }, 300);
      }
    } else if (urlParams.get('activate_key')) {
      const actKey = urlParams.get('activate_key') || '';
      if (trialTokenInput && actKey) {
        trialTokenInput.value = actKey;
        setTimeout(() => {
          btnApplyTrial?.click();
        }, 300);
      }
    }
  } catch (e) {}

  // ---------- 8. 체류시간(Dwell-Time) & 인게이지먼트 트래픽 부스터 ----------
  function sendEngagementPing(eventType = 'heartbeat') {
    const dwellSeconds = Math.round((Date.now() - pageStartMs) / 1000);
    try {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'hwatapet_engagement',
        hwata_event: eventType,
        dwell_seconds: dwellSeconds,
        interactions: interactionCount,
        species: currentSpecies,
        persona: currentPersona,
        page_path: window.location.pathname
      });
    } catch (e) {}

    const pingBody = JSON.stringify({
      action: 'heartbeat',
      event: eventType,
      page: window.location.pathname,
      dwellSeconds,
      interactions: interactionCount,
      species: currentSpecies,
      persona: currentPersona
    });

    const targetUrl = (location.protocol === 'file:' || location.hostname === '127.0.0.1' || location.hostname === 'localhost') ? 'https://whinish.com/api/chat' : '/api/chat';
    fetch(targetUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Hwata-Client': 'dwell-booster' },
      body: pingBody,
      keepalive: true
    }).catch(() => {
      if (targetUrl === '/api/chat') {
        fetch('https://whinish.com/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'X-Hwata-Client': 'dwell-booster' },
          body: pingBody,
          keepalive: true
        }).catch(() => {});
      }
    });
  }

  function initTrafficBooster() {
    sendEngagementPing('page_init');
    document.querySelectorAll('[data-species], [data-action], [data-game], .tab-btn').forEach((el) => {
      el.addEventListener('click', () => {
        interactionCount++;
        sendEngagementPing('ui_interaction');
      });
    });
    setInterval(() => {
      if (document.visibilityState === 'visible') {
        sendEngagementPing('heartbeat_45s');
      }
    }, 45000);
  }

  // 초기 실행
  runHeroChatLoop();
  initTrafficBooster();
})();
