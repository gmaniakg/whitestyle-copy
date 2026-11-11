// 도트 고양이를 코드로 그린다. 48×48 도트 캔버스에 그리고 CSS 로 확대한다.
// 펫 창과 하우스 창(미리보기)이 같이 쓴다.
//
// 컨셉 보드(Pixel Cat)를 따른다:
//  - 정면을 보는 3/4. 머리와 몸이 외곽선 하나로 이어진 둥근 네모 한 덩어리
//  - 정수리에 귀 두 개, 그 사이 이마에 세로 줄무늬, 오른쪽에 통통한 꼬리
//  - 얼굴은 점 눈 두 개 + 작은 ω 코 + 볼터치뿐 (주둥이 판·수염 없음)
//  - 몸은 단색. 그러데이션 없이 굵은 외곽선 한 겹으로만 형태를 잡는다
//
// 그리는 순서: 오프스크린 캔버스에 고양이를 그리고 → 몸 전체 변형(p.xf: 회전·뒤집기·늘이기)을 걸어
// 진짜 캔버스에 합성한 뒤 → 그 위에 효과(fx: 글자·눈물·색종이…)를 뿌린다.
// 모션은 renderer/motions.js, 악세사리는 renderer/accessories.js 가 여기에 꽂는다.
(function (global) {
  const G = 48;
  const GROUND = 44;
  // 한 상황에 여러 모션을 골랐을 때, 한 모션을 최소 몇 초나 반복하고 다음 것으로 넘어갈지 (초)
  const MOOD_HOLD = 5 * 60;

  // ---------- 털색 ----------
  // 종은 하나뿐이다. 컨셉 보드 원본에서 그대로 뽑은 치즈 고양이 색.
  const CAT = {
    body: "#f4a859", shade: "#e08f4c", light: "#f7bd7f", belly: "#f6b878",
    stripe: "#e88034", outline: "#31200f", ear: "#f4a859", nose: "#31200f",
    cheek: "#f7ab8c", eye: "#31200f", lash: "#31200f",
  };

  // ---------- 털색 17종 + 별 전용 3종 (레벨 · 별로 해금: main/growth.js 의 FURS) ----------
  // pal = 팔레트, mask(i, j) = 몸 도트(15×13) 칸마다 색 바꾸기 (null 원래대로 · 'B' 바탕 · 'W' 흰 털 · 'K' 짙은 얼룩 · 'A' 주황 얼룩),
  // tail(j) = 꼬리 줄 (0 = 꼬리 끝), rainbow = 줄마다 무지갯빛, sparkle = 털이 가끔 반짝, stars = 별이 박힌 털
  const furPal = (o) => ({ ear: o.body, nose: o.outline, cheek: '#f7ab8c', eye: o.outline, lash: o.outline, white: '#fffaf3', K: '#2f2a2a', A: '#f0a050', ...o });
  const inR = (i, a, b) => i >= a && i <= b;
  const FURS = {
    cheese: { pal: CAT },
    cream: { pal: furPal({ body: '#f6d9a8', shade: '#e9c48a', light: '#fbe8c6', belly: '#f9e2b8', stripe: '#e3b068', outline: '#3a2a18' }) },
    ginger: { pal: furPal({ body: '#ec7a34', shade: '#cc6122', light: '#f59c5e', belly: '#f2945a', stripe: '#b84e14', outline: '#2e1608' }) },
    gray: { pal: furPal({ body: '#aaa6a1', shade: '#8e8a85', light: '#c6c2bd', belly: '#bfbbb6', stripe: '#6e6a66', outline: '#262422', cheek: '#e8a9a0' }) },
    silver: { pal: furPal({ body: '#d6d9de', shade: '#bbbfc6', light: '#eef0f3', belly: '#e6e8ec', stripe: '#8a9099', outline: '#2c3038', cheek: '#f0b0b0' }) },
    blue: { pal: furPal({ body: '#8190a6', shade: '#6b7a90', light: '#9eacbf', belly: '#93a1b4', stripe: '#607086', outline: '#1e2430', eye: '#1f6b45', lash: '#1e2430', cheek: '#d7a0b0' }) },
    black: { pal: furPal({ body: '#2f2a2a', shade: '#231f1f', light: '#463e3e', belly: '#3a3434', stripe: '#1f1b1b', outline: '#120e0e', eye: '#e8c547', lash: '#120e0e', cheek: '#b86f78' }) },
    white: { pal: furPal({ body: '#f7f3ea', shade: '#e2dccf', light: '#ffffff', belly: '#ffffff', stripe: '#e6dfd1', outline: '#4a3f36', nose: '#e8878a', cheek: '#f6b3b0' }) },
    choco: { pal: furPal({ body: '#7d5034', shade: '#653f27', light: '#976648', belly: '#8c5c40', stripe: '#553320', outline: '#22120a', eye: '#1a0e06', cheek: '#d98a7a' }) },
    lilac: { pal: furPal({ body: '#cbbac6', shade: '#b4a3b0', light: '#dfd2db', belly: '#d8cad4', stripe: '#a08e9f', outline: '#3a2e38', cheek: '#f0a8bc' }) },
    peach: { pal: furPal({ body: '#ffb9a8', shade: '#f39d8c', light: '#ffd1c5', belly: '#ffc9bc', stripe: '#ee8674', outline: '#4a2420', cheek: '#ff8f9a' }) },
    mint: { pal: furPal({ body: '#a3e4ca', shade: '#83cdb0', light: '#c5f1de', belly: '#b8ecd6', stripe: '#67b596', outline: '#1f3a30', cheek: '#f6a8b8' }) },
    gold: { pal: furPal({ body: '#f6c744', shade: '#dba623', light: '#ffe27c', belly: '#fcd965', stripe: '#c98f12', outline: '#4a3208' }), sparkle: '#fffbe0' },
    galaxy: { pal: furPal({ body: '#2b2b5c', shade: '#20204a', light: '#3e3e7c', belly: '#35356c', stripe: '#6a45a0', outline: '#0c0c22', eye: '#ffd65a', lash: '#0c0c22', cheek: '#c07ad8' }), stars: true },
    rainbow: { pal: furPal({ body: '#ffd43b', shade: '#fab005', light: '#fff3bf', belly: '#fff3bf', stripe: '#f59f00', outline: '#3a2a4a' }), rainbow: true },
    // ---- 별 전용 털색 (8차, Lv80 뒤 별로 산다. main/growth.js 의 FURS 에 stars 가 붙은 것) ----
    // 오로라: 청록·초록·보랏빛이 몸을 따라 천천히 흘러간다
    aurora: { pal: furPal({ body: '#5fd4b0', shade: '#3fae92', light: '#a8f0da', belly: '#bdf5e3', stripe: '#7a6ad8', outline: '#122a2a', eye: '#0e1a2a', cheek: '#f0a0d0' }), aurora: true },
    // 네온: 까만 털에 외곽선과 줄무늬가 네온사인처럼 색을 바꾸며 빛난다
    neon: { pal: furPal({ body: '#1d1a2a', shade: '#15121f', light: '#2c2840', belly: '#26223a', stripe: '#ff3fd0', outline: '#38f0ff', eye: '#38f0ff', lash: '#1d1a2a', nose: '#ff3fd0', cheek: '#ff3fd0' }), neon: true },
    // 홀로그램 (투영 홀로그램): 은빛 털에 굵은 무지개 결이 비스듬히 흐르고, 한 줄 건너 주사선 · 내려가는 밝은 주사 띠가 깔린다.
    // 몸 양옆엔 자홍 · 청록 잔상이 어긋나 비치고(색 번짐) 가끔 지직 흔들린다. 색은 holoColor, 잔상은 drawMap
    holo: { pal: furPal({ body: '#d6dbe7', shade: '#b6bdce', light: '#f0f3f9', belly: '#eaeef6', stripe: '#a6b0c6', outline: '#1d2a50', eye: '#1a2448', cheek: '#ff9ad8' }), holo: true },
    // 흰 양말: 치즈 고양이에 네 발만 하얗게
    socks: { pal: CAT, mask: (i, j) => (j === 11 ? 'W' : null) },
    // 삼색: 흰 바탕에 주황·검정 얼룩
    calico: {
      pal: furPal({ body: '#f7f3ea', shade: '#e2dccf', light: '#ffffff', belly: '#ffffff', stripe: '#e6dfd1', outline: '#4a3f36', nose: '#e8878a', cheek: '#f6b3b0' }),
      mask: (i, j) => {
        if ((j <= 2 && i <= 5) || (inR(j, 3, 5) && inR(i, 2, 5)) || (inR(j, 8, 10) && i >= 10)) return 'A';
        if ((j <= 2 && i >= 9) || (inR(j, 3, 4) && inR(i, 9, 12)) || (inR(j, 8, 10) && i <= 3)) return 'K';
        return 'B';
      },
      tail: (j) => (j < 2 ? 'K' : j < 4 ? 'A' : 'B'),
    },
  };
  const RAINBOW = ['#ff6b6b', '#ff6b6b', '#ff6b6b', '#ffa94d', '#ffd43b', '#ffd43b', '#8ce99a', '#8ce99a', '#74c0fc', '#74c0fc', '#b197fc', '#b197fc', '#e599f7'];
  // 홀로그램 털 색: 은빛 4칸 + 무지개 결 5칸이 비스듬히 번갈아 흐르고, 한 줄 건너 주사선이 깔리며 밝은 주사 띠가 위에서 아래로 훑는다.
  // 외곽선(O)은 남빛으로 은은히 색이 돈다. x · y 는 캔버스 칸, sec 는 초. 눈 · 볼(E · C)처럼 표에 없는 글자는 null (원래 색)
  const HOLO_L = { B: 74, P: 74, S: 62, L: 86, M: 84 };
  function holoColor(ch, x, y, sec) {
    const hsl = (h, sat, l) => `hsl(${Math.round(((h % 360) + 360) % 360)},${sat}%,${Math.round(l)}%)`;
    if (ch === 'O') return hsl(215 + 40 * Math.sin(sec * 2 + y * 0.6), 60, 22);
    if (HOLO_L[ch] == null) return null;
    let l = HOLO_L[ch];
    if ((y + Math.floor(sec * 3)) % 2) l -= 5; // 주사선
    const scan = ((sec * 7) % 26) - 4;
    if (Math.abs(y - (32 + scan)) < 0.6 || Math.abs(y - (6 + scan)) < 0.6) return hsl(185, 100, 90); // 주사 띠
    const d = (((x - y * 0.7 + sec * 4) % 9) + 9) % 9;
    if (d >= 5) return hsl(220, 22, l + 4);
    return hsl((d / 5) * 300 - 10, 88, l);
  }

  // 털색과 상관없는 색 (소품·입자)
  const P = {
    white: '#ffffff', shadow: 'rgba(30,15,8,0.22)',
    laptop: '#8a93a3', laptopDark: '#4d5563', laptopOutline: '#2c313a',
    heart: '#ff6f91', spark: '#ffd35c', z: '#7d8bff',
    bowl: '#f4f1ea', bowlShade: '#c9c1b3', bowlBand: '#d97757', rice: '#ffffff',
    tongue: '#f07a7a',
    bang: '#ffcf3a', thought: '#ffffff',
  };

  // 악세사리·모션 소품이 같이 쓰는 색. 글자 하나 = 색 하나 (K 는 고양이 외곽선을 따른다)
  const PAL = {
    W: '#fffaf3', w: '#efe4d0', G: '#cfc8bd', g: '#8f95a0', D: '#454b57', k: '#1f1c1b',
    R: '#e8534a', r: '#a8322c', P: '#ff9bb8', p: '#d9668b', Q: '#ffd3df',
    O: '#f59a3c', o: '#c56d1e', M: '#ff8c1a', m: '#d96608',
    Y: '#ffd65a', y: '#d9a21f', N: '#78c46a', n: '#4b8f43',
    B: '#6fb0ea', b: '#3d6fb0', U: '#c6e4f7', u: '#8fc2e3',
    V: '#b784f5', v: '#8456c6', T: '#c48b56', t: '#8a5a32', S: '#f3d9b1', s: '#d9b27a',
    E: '#7d8bff', e: '#5160c9', H: '#ffffff', C: '#d97757', c: '#a34f34',
    L: 'rgba(195,232,255,0.5)', X: '#2f3a33', Z: '#9fe3c8',
  };
  const TEAR = '#7cc4f2';
  const TONGUE = '#f07a8a';
  const BLUSH = '#ff8fa3';

  // ---------- 고양이 도트 ----------
  // 글자: O 외곽선 / B 털 / S 진한 줄무늬 / L 밝은 털뭉치 / C 볼터치
  // ax  = 화면 가운데에 올 열,  cy/rx/ry = 소품·입자가 쓰는 몸 기준,
  // hx/hy = 얼굴 중심,  hr = 머리 반지름(꾸미기용),  br = 숨 쉴 때 늘었다 줄었다 하는 행
  // tail = 몸 뒤에 먼저 찍는 꼬리 조각
  const STAGE = {
    // 1. 강아지 (기본 대표 펫: 말티즈·비숑 '화타' — 블렌더 3D 스튜디오 볼륨 라이팅 + 복슬복슬 접힌 귀 + 입체 주둥이 + 분홍 혀)
    dog: {
      species: 'dog',
      speciesColors: {
        body: '#faf7f0', shade: '#e4d9c8', light: '#ffffff', belly: '#ffffff', stripe: '#dccfbe',
        outline: '#35261d', ear: '#f4bac2', nose: '#24150e', cheek: '#f79aa6', eye: '#1e110a', lash: '#24160e',
        white: '#ffffff', K: '#35261d', A: '#f4a261',
      },
      eye: { w: 2, h: 2, spread: 3, dy: -1 },
      nose: { w: 3, h: 3 },
      paw: 2.3,
      map: {
        ax: 8, cy: 7, rx: 7, ry: 6.5, hx: 7, hy: 5, hr: 6, br: 8, earRows: 3,
        acc: { top: 2, ears: [3.5, 10.5], hw: 6, neck: 9 },
        tail: { x: 11, y: 5, rows: ['.OOO.', 'OLLBO', 'OBBSO', '.OSO.'] },
        rows: [
          "..OOOO...OOOO..",
          ".OLLBBOOOOBBBO.",
          "OBPBLBBBBBLPBBO",
          "OBPBLBBBBBLPBBO",
          ".OSBBBBBBBBBSO.",
          ".OBBBBBBBBBBBO.",
          ".OBBBBLLLBBBBO.",
          "..OSBBBBBBBSO..",
          ".OBBBBMMMMBBBO.",
          "OBBBBBMMMMBBBBO",
          "OBBBBBMMMMBBBBS",
          ".OSBBBBBBBBBSO.",
          "..OOOOOOOOOOO..",
        ],
      },
      curl: {
        ax: 7.5, cy: 4, rx: 8, ry: 4.5, hx: 6.5, hy: 3, hr: 5, earRows: 2, br: 4,
        acc: { top: 1, ears: [3.5, 10.5], hw: 6, neck: 6 },
        rows: [
          ".OLLBO...OBBBO.",
          "OBPBLOOOOOLPBBO",
          ".OSBBBBBBBBBSO.",
          "OBBBBBBBBBBBBBO",
          "OBBBBBBBBBBBBBO",
          "OBBBBBBBBBBBBBS",
          ".OSBBBBBBBBBSO.",
          "..OOOOOOOOOOO..",
        ],
      },
    },
    // 2. 코끼리 (아기 코끼리 '코코' — 양옆으로 활짝 펼쳐진 큰 귀 + 움직이는 픽셀 코 + 상아)
    elephant: {
      species: 'elephant',
      speciesColors: {
        body: '#9eb4c8', shade: '#7d95ab', light: '#c3d4e3', belly: '#dce7f0', stripe: '#7d95ab',
        outline: '#253342', ear: '#f2b6c1', nose: '#253342', cheek: '#f497a9', eye: '#1d2833', lash: '#1d2833',
        white: '#ffffff', K: '#253342', A: '#9eb4c8',
      },
      eye: { w: 2, h: 2, spread: 3, dy: -1 },
      nose: { w: 3, h: 2 },
      paw: 2.4,
      map: {
        ax: 8, cy: 7, rx: 7, ry: 6.5, hx: 7, hy: 5, hr: 6, br: 8, earRows: 2,
        acc: { top: 2, ears: [3.5, 10.5], hw: 6, neck: 9 },
        tail: { x: 12, y: 8, rows: ['.OO.', '.OBO', '..OO'] },
        rows: [
          ".OOOO.....OOOO.",
          "OBPPBOOOOOBPPBO",
          "OBPPBBBBBBBPPBO",
          "OBPPBBBBBBBPPBO",
          "OBPPBBBBBBBPPBO",
          ".OOOOOBBBBBOOOO",
          "..OBBBBBBBBBO..",
          "..OBBBBBBBBBO..",
          ".OBBBBMMMBBBBO.",
          "OBBBBBMMMMBBBBO",
          "OBBBBBMMMMBBBBO",
          ".OBBBBBBBBBBBO.",
          "..OOOOOOOOOOO..",
        ],
      },
      curl: {
        ax: 7.5, cy: 4, rx: 8, ry: 4.5, hx: 6.5, hy: 3, hr: 5, earRows: 1, br: 4,
        acc: { top: 1, ears: [3.5, 10.5], hw: 6, neck: 6 },
        rows: [
          ".OBPBOOOOOBPBO.",
          "OBPPBBBBBBBPPBO",
          ".OBBBBBBBBBBBO.",
          "OBBBBBBBBBBBBBO",
          "OBBBBBBBBBBBBBO",
          "OBBBBBBBBBBBBBO",
          ".OBBBBBBBBBBBO.",
          "..OOOOOOOOOOO..",
        ],
      },
    },
    // 3. 공룡 (아기 공룡 '디노' — 정수리·등 뾰족 갈기 + 통통한 공룡 꼬리 + 귀여운 송곳니)
    dino: {
      species: 'dino',
      speciesColors: {
        body: '#68c999', shade: '#4aa377', light: '#9be3be', belly: '#e9f7ca', stripe: '#f59e0b',
        outline: '#1e382b', ear: '#f59e0b', nose: '#1e382b', cheek: '#fb8574', eye: '#182c22', lash: '#182c22',
        white: '#ffffff', K: '#1e382b', A: '#f59e0b',
      },
      eye: { w: 2, h: 2, spread: 3, dy: -1 },
      nose: { w: 3, h: 2 },
      paw: 2.3,
      map: {
        ax: 8, cy: 7, rx: 7, ry: 6.5, hx: 7, hy: 5, hr: 6, br: 8, earRows: 2,
        acc: { top: 2, ears: [3.5, 10.5], hw: 6, neck: 9 },
        tail: { x: 11, y: 6, rows: ['..OSO.', '.OBBSO', 'OBBBBO', 'OBBBO.'] },
        rows: [
          "...OO..O..OO...",
          "..OSSOOSOOSSO..",
          "..OBBBBBBBBBO..",
          ".OBBBBBBBBBBBO.",
          ".OBBBBBBBBBBBO.",
          ".OBBBBBBBBBBBO.",
          ".OBBBBBBBBBBBO.",
          "..OBBBBBBBBBO..",
          ".OBBBBMMMBBBBO.",
          "OBBBBBMMMMBBBBO",
          "OBBBBBMMMMBBBBO",
          ".OBBBBBBBBBBBO.",
          "..OOOOOOOOOOO..",
        ],
      },
      curl: {
        ax: 7.5, cy: 4, rx: 8, ry: 4.5, hx: 6.5, hy: 3, hr: 5, earRows: 1, br: 4,
        acc: { top: 1, ears: [3.5, 10.5], hw: 6, neck: 6 },
        rows: [
          "..OSSOOSOOSSO..",
          "..OBBBBBBBBBO..",
          ".OBBBBBBBBBBBO.",
          "OBBBBBBBBBBBBBO",
          "OBBBBBBBBBBBBBO",
          "OBBBBBBBBBBBBBO",
          ".OBBBBBBBBBBBO.",
          "..OOOOOOOOOOO..",
        ],
      },
    },
    // 4. 파이톤 (황금빛 아기 비단뱀 '파이' — 매끈한 머리 + 똬리 튼 몸통 + 날름거리는 두 갈래 분홍 혀)
    python: {
      species: 'python',
      speciesColors: {
        body: '#f2c94c', shade: '#d4a72c', light: '#f9e28c', belly: '#fff7d6', stripe: '#6fcf97',
        outline: '#382c11', ear: '#6fcf97', nose: '#382c11', cheek: '#f2994a', eye: '#261d0a', lash: '#261d0a',
        white: '#ffffff', K: '#382c11', A: '#6fcf97',
      },
      eye: { w: 2, h: 2, spread: 3, dy: -1 },
      nose: { w: 3, h: 2 },
      paw: 2.0,
      map: {
        ax: 8, cy: 7, rx: 7, ry: 6.5, hx: 7, hy: 5, hr: 6, br: 8, earRows: 1,
        acc: { top: 2, ears: [3.5, 10.5], hw: 6, neck: 9 },
        tail: { x: 11, y: 7, rows: ['...OO.', '..OBO.', '.OBBO.', 'OBBBO.'] },
        rows: [
          "....OOOOOOO....",
          "..OOBBBBBBBOO..",
          ".OBBBLBBBBLBBO.",
          ".OBBBBBBBBBBBO.",
          ".OBBBBBBBBBBBO.",
          ".OBBBBBBBBBBBO.",
          "..OBBBBBBBBBO..",
          "..OBBBMMMBBBO..",
          ".OBBMMMMMMMBBO.",
          "OBBSSBMMMBSSBBO",
          "OBBBBBMMMMBBBBO",
          ".OBBBBBBBBBBBO.",
          "..OOOOOOOOOOO..",
        ],
      },
      curl: {
        ax: 7.5, cy: 4, rx: 8, ry: 4.5, hx: 6.5, hy: 3, hr: 5, earRows: 1, br: 4,
        acc: { top: 1, ears: [3.5, 10.5], hw: 6, neck: 6 },
        rows: [
          "...OOOOOOOOO...",
          "..OBBBBBBBBBO..",
          ".OBBBBBBBBBBBO.",
          "OBBSSBMMMBSSBBO",
          "OBBBBBBBBBBBBBO",
          "OBBBBBBBBBBBBBO",
          ".OBBBBBBBBBBBO.",
          "..OOOOOOOOOOO..",
        ],
      },
    },
    // 5. 앵무새 (노란 벼슬 코카틸·마코 앵무새 '코코아' — 정수리 깃털 벼슬 + 알록달록 날개 + 둥근 주황 부리)
    parrot: {
      species: 'parrot',
      speciesColors: {
        body: '#56ccf2', shade: '#2d9cdb', light: '#9be2fa', belly: '#fff3c4', stripe: '#f2c94c',
        outline: '#1b2e3c', ear: '#f2c94c', nose: '#f2994a', cheek: '#ff6b6b', eye: '#14222e', lash: '#14222e',
        white: '#ffffff', K: '#1b2e3c', A: '#ff6b6b',
      },
      eye: { w: 2, h: 2, spread: 3, dy: -1 },
      nose: { w: 3, h: 3 },
      paw: 2.1,
      map: {
        ax: 8, cy: 7, rx: 7, ry: 6.5, hx: 7, hy: 5, hr: 6, br: 8, earRows: 2,
        acc: { top: 2, ears: [3.5, 10.5], hw: 6, neck: 9 },
        tail: { x: 11, y: 7, rows: ['..OSO.', '.OSSSO', 'OSSSSO', '.OSSO.'] },
        rows: [
          ".....OOSOO.....",
          "....OSSSSSO....",
          "..OOBBBBBBBOO..",
          ".OBBBBBBBBBBBO.",
          ".OBBBBBBBBBBBO.",
          ".OBBBBBBBBBBBO.",
          ".OBBBBBBBBBBBO.",
          "..OBBBBBBBBBO..",
          ".OSSOOMMMOOSSO.",
          "OSSSSBMMMBSSSSO",
          "OSSSSBMMMBSSSSO",
          ".OBBBBBBBBBBBO.",
          "..OOOOOOOOOOO..",
        ],
      },
      curl: {
        ax: 7.5, cy: 4, rx: 8, ry: 4.5, hx: 6.5, hy: 3, hr: 5, earRows: 1, br: 4,
        acc: { top: 1, ears: [3.5, 10.5], hw: 6, neck: 6 },
        rows: [
          "....OSSSSSO....",
          "..OOBBBBBBBOO..",
          ".OBBBBBBBBBBBO.",
          "OSSSSBBBBSSSSO.",
          "OBBBBBBBBBBBBBO",
          "OBBBBBBBBBBBBBO",
          ".OBBBBBBBBBBBO.",
          "..OOOOOOOOOOO..",
        ],
      },
    },
    // 6. 고양이 (클래식 치즈 고양이)
    cat: {
      eye: { w: 2, h: 2, spread: 2, dy: 0 },
      nose: { w: 3, h: 3 },
      paw: 2,
      map: {
        ax: 8, cy: 7, rx: 7, ry: 6.5, hx: 7, hy: 5, hr: 6, br: 8, earRows: 2,
        acc: { top: 2, ears: [3.5, 10.5], hw: 6, neck: 9 },
        rows: [
          "..OBBO...OBBO..",
          "..OBBO...OBBO..",
          "..OBBOOOOOBBO..",
          ".OBBBSBSBSBBBO.",
          ".OBBBBBSBBBBBO.",
          ".OBBBBBBBBBBBO.",
          ".OBBBBBBBBBBBO.",
          ".OBBBBBBBBBBBO.",
          ".OSBBBBBBBBBSO.",
          ".OBBBBBBBBBBBO.",
          ".OBBBBBBBBBBBO.",
          ".OBBOOBBOOBBOO.",
          "..OO..OO..OO...",
        ],
        // 가늘고 곧은 꼬리. 굵은 꼬리를 접고 이걸로 확정했다 (2026-09-21).
        // 왼쪽 줄이 몸통 외곽선 자리(13열)에 겹쳐서 몸에 붙은 것처럼 보인다
        tail: {
          x: 13, y: 4,
          rows: [
            ".OO.",
            "OBBO",
            "OBBO",
            "OBBO",
            "OBBO",
            ".OO.",
          ],
        },
      },
      curl: {
        // br: 숨 쉬는 줄. 잘 때 이 줄이 한 줄 늘었다 줄었다 해서 등이 부풀었다 가라앉는다 (바닥은 그대로)
        ax: 7.5, cy: 4, rx: 8, ry: 4.5, hx: 6.5, hy: 3, hr: 5, earRows: 1, br: 4,
        acc: { top: 1, ears: [3.5, 10.5], hw: 6, neck: 6 },
        rows: [
          "..OBBO...OBBO..",
          "..OBBOOOOOBBO..",
          ".OBBBBBBBBBBBO.",
          "OBBBBBBBBBBBBBO",
          "OBBBBBBBBBBBBBO",
          "OBBBBBBBBBBBBBO",
          ".OBBBBBBBBBBBO.",
          "..OOOOOOOOOOO..",
        ],
      },
    },
  };

  // ---------- 귀 모양 (2026-10-10) ----------
  // 처음 시작할 때(그리고 옷장에서) 고르는 귀 13가지. 몸 테두리와 코스튬 기준점은 그대로 두고 맨 위 세 줄(귀 칸)만 바꾼다.
  // 머리를 감싸는 코스튬(hood)은 도트 지도를 따라 칠해서 귀 모양을 저절로 따라간다.
  //  rows  = 맨 위 세 줄 (15칸). sym() 은 왼쪽 8칸만 적으면 오른쪽을 거울로 채운다
  //  above = 테두리 위로 더 올라가는 줄 (위에서부터, 왼쪽 8칸). 이 귀는 작은 모자 밖으로 조금 삐진다
  //  paint = [열, 줄, 색] 덧칠 (W 흰 털)
  // 이름은 i18n 'ear.<key>'. 고른 값은 settings.ears (main/growth.js 의 EAR_SHAPES 와 키가 같아야 한다)
  const sym = (l) => l + l.slice(0, 7).split('').reverse().join('');
  const syms = (a) => a.map(sym);
  const EARS = {
    perk: {},
    round: { rows: syms(['........', '...OO...', '..OBBOOO']) },
    pointy: { rows: syms(['...O....', '..OBO...', '..OBBOOO']) },
    small: { rows: syms(['........', '...O....', '..OBOOOO']) },
    fold: { rows: syms(['........', '..OOO...', '..OBBOOO']) },
    outtilt: { rows: syms(['..O.....', '..OBO...', '..OBBOOO']) },
    intilt: { rows: syms(['....O...', '...OBO..', '..OBBOOO']) },
    darktip: { rows: syms(['..OSSO..', '..OBBO..', '..OBBOOO']) },
    whitetip: { paint: [[3, 0, 'W'], [4, 0, 'W'], [10, 0, 'W'], [11, 0, 'W']] },
    // 길고양이 중성화 표시처럼 오른쪽 귀 끝이 비스듬히 잘렸다
    tnr: { rows: ['..OBBO...OO....', '..OBBO...OBO...', '..OBBOOOOOBBO..'] },
    // 오른쪽 귀만 접혔다
    mismatch: { rows: ['..OBBO.........', '..OBBO....OOO..', '..OBBOOOOOBBO..'] },
    lynx: { above: ['..O.....', '...O....'] },
    fox: { rows: syms(['..OBBO..', '..OCBO..', '..OCBOOO']), above: ['....O...', '...OBO..'] },
  };
  // 강아지(하야니/화타) 전용 맞춤 귀 모양 13종 (2026-11-11 완성)
  const DOG_EARS = {
    perk: {
      rows: [
        "...OO.....OO...",
        "..OLLBO.OBBBO..",
        "..OBPBO.OBPBO..",
        ".OBBBBBBBBBBBO.",
      ],
      curlRows: [
        "...OO.....OO...",
        "..OLLBO.OBBBO..",
      ],
    },
    round: {
      rows: [
        ".OOOO.....OOOO.",
        "OLLLBBO.OBBBBBO",
        "OBPBLBBBBBLPBBO",
        "OBBBBOBBBBBOBBO",
      ],
      curlRows: [
        ".OOOO.....OOOO.",
        "OLLLBBO.OBBBBBO",
      ],
    },
    pointy: {
      rows: [
        "...O.......O...",
        "..OLBO...OBBO..",
        ".OBPBBO.OBPBBO.",
        ".OBBBBBBBBBBBO.",
      ],
      curlRows: [
        "...O.......O...",
        "..OLBO...OBBO..",
      ],
    },
    small: {
      rows: [
        "...............",
        "...OO.....OO...",
        "..OLLBO.OBBBO..",
        ".OBBBBBBBBBBBO.",
      ],
      curlRows: [
        "...............",
        "...OO.....OO...",
      ],
    },
    fold: {
      rows: [
        "..OOOO...OOOO..",
        ".OLLBBOOOOBBBO.",
        "OBPBLBBBBBLPBBO",
        "OBPBLBBBBBLPBBO",
      ],
      curlRows: [
        ".OLLBO...OBBBO.",
        "OBPBLOOOOOLPBBO",
      ],
    },
    outtilt: {
      rows: [
        "..OO.......OO..",
        ".OLLBO...OBBBO.",
        "OLLPBBO.OBBPPBO",
        ".OBBBBBBBBBBBO.",
      ],
      curlRows: [
        "..OO.......OO..",
        ".OLLBO...OBBBO.",
      ],
    },
    intilt: {
      rows: [
        "....OO...OO....",
        "...OLLBO.OBBBO.",
        "..OBPBO.OBPBO..",
        ".OBBBBBBBBBBBO.",
      ],
      curlRows: [
        "....OO...OO....",
        "...OLLBO.OBBBO.",
      ],
    },
    darktip: {
      rows: [
        "..OSSO...OSSO..",
        ".OSLBBOOOOBSSO.",
        "OBPBLBBBBBLPBBO",
        "OBPBLBBBBBLPBBO",
      ],
      curlRows: [
        "..OSSO...OSSO..",
        ".OSLBBOOOOBSSO.",
      ],
    },
    whitetip: {
      rows: [
        "..OWWO...OWWO..",
        ".OWLBBOOOOBWBO.",
        "OBPBLBBBBBLPBBO",
        "OBPBLBBBBBLPBBO",
      ],
      curlRows: [
        "..OWWO...OWWO..",
        ".OWLBBOOOOBWBO.",
      ],
    },
    tnr: {
      rows: [
        "..OOOO.........",
        ".OLLBBOOOOOBBO.",
        "OBPBLBBBBBLPBBO",
        "OBPBLBBBBBLPBBO",
      ],
      curlRows: [
        "..OOOO.........",
        ".OLLBBOOOOOBBO.",
      ],
    },
    mismatch: {
      rows: [
        "...OO....OOOO..",
        "..OLLBO.OBBBBO.",
        ".OBPBBO.BBLPBBO",
        ".OBBBBB.BBLPBBO",
      ],
      curlRows: [
        "...OO....OOOO..",
        "..OLLBO.OBBBBO.",
      ],
    },
    lynx: {
      rows: [
        ".O.OOO...OOO.O.",
        "O.LLBBOOOOBBB.O",
        "OBPBLBBBBBLPBBO",
        "OBPBLBBBBBLPBBO",
      ],
      curlRows: [
        ".O.OOO...OOO.O.",
        "O.LLBBOOOOBBB.O",
      ],
    },
    fox: {
      rows: [
        "..OOO.....OOO..",
        ".OLLLBO.OBBBBBO",
        "OBPPBBO.OBPPBBO",
        ".OBBBBBBBBBBBO.",
      ],
      curlRows: [
        "..OOO.....OOO..",
        ".OLLLBO.OBBBBBO",
      ],
    },
  };

  // 단계 + 귀를 합친 정의. 단계 · 귀마다 한 번만 만든다 (기본 귀는 단계 그대로)
  const earStages = {};
  function earStage(stage, ear) {
    const s = STAGE[stage] || STAGE.dog;
    const isDog = stage === 'dog';
    const isCat = stage === 'cat';
    if (!isDog && !isCat) return s;
    const earMap = isDog ? DOG_EARS : EARS;
    const fallbackKey = isDog ? 'fold' : 'perk';
    const E = earMap[ear] || earMap[fallbackKey] || {};
    if (!s) return s;
    const key = stage + '|' + (ear || fallbackKey);
    if (!earStages[key]) {
      const R = E.rows;
      const cR = E.curlRows || R;
      const rowCount = isDog ? 4 : 3;
      earStages[key] = {
        ...s,
        ear: E,
        map: {
          ...s.map,
          rows: R ? s.map.rows.map((r, j) => (j < rowCount && R[j] ? R[j] : r)) : s.map.rows,
          _meta: undefined,
        },
        curl: {
          ...s.curl,
          rows: cR ? s.curl.rows.map((r, j) => (j < 2 && cR[j] ? cR[j] : r)) : s.curl.rows,
          _meta: undefined,
        },
      };
    }
    return earStages[key];
  }

  // 코드로 짠 기본 동작의 길이(초). 모션(motions.js)은 각자 len 을 갖는다
  const ACTION_LEN = { happy: 0.9, levelup: 2.2, evolve: 1.5, wave: 1.8, eat: 7, stretch: 4, yawn: 2.5, achieve: 2.4, groom: 4.5, pounce: 0.8, perk: 1.1, nibble: 1.3, bored: 3.6 };

  const PATTERNS = {
    heart: ['.X.X.', 'XXXXX', '.XXX.', '..X..'],
    sparkle: ['.X.', 'XWX', '.X.'],
    z: ['XXXX', '..X.', '.X..', 'XXXX'],
    zs: ['XXX', '.X.', 'XXX'],
    note: ['.XX', '.X.', 'XX.'],
  };

  // 한 줄에서 '.' 이 아닌 칸이 이어지는 구간들. 맨 윗줄이면 귀 둘, 맨 아랫줄이면 발 여럿이다
  function runsOf(row) {
    const runs = [];
    let i = 0;
    while (i < row.length) {
      if (row[i] === '.') { i++; continue; }
      let j = i;
      while (j < row.length && row[j] !== '.') j++;
      runs.push([i, j - 1]);
      i = j;
    }
    return runs;
  }

  // 지도마다 한 번만 재고 결과를 붙여 둔다.
  // 귀 폭은 귀의 '맨 아랫줄'(가장 넓은 줄)에서 잰다 — 뾰족한 귀는 맨 윗줄이 한 칸뿐이라
  // 거기서 재면 귀가 한 칸으로 잘려 버린다
  function metaOf(m) {
    if (!m._meta) {
      const er = Math.max(1, m.earRows || 1);
      let earRuns = runsOf(m.rows[er - 1]);
      if (earRuns.length < 2 && er > 1) {
        for (let j = 0; j < er; j++) {
          const r = runsOf(m.rows[j]);
          if (r.length >= 2) { earRuns = r; break; }
        }
      }
      if (earRuns.length < 2) earRuns = [[0, 6], [8, 14]];
      m._meta = { ears: earRuns, legs: runsOf(m.rows[m.rows.length - 1]) };
    }
    return m._meta;
  }

  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const rand = (a, b) => a + Math.random() * (b - a);
  const seg = (k, a, b) => clamp((k - a) / (b - a), 0, 1); // a~b 구간에서 0→1
  const bump = (k, a, b) => Math.sin(Math.PI * seg(k, a, b)); // a~b 구간에서 0→1→0
  const ease = (x) => x * x * (3 - 2 * x);

  // 모션·악세사리 모음. motions.js / accessories.js 가 나중에 채운다
  const motions = () => (global.PetSprite && global.PetSprite.MOTIONS) || {};
  const accessories = () => (global.PetSprite && global.PetSprite.ACCESSORIES) || {};
  // 장난감 놀이 전용 자세(toys.js). 모션과 같은 모양이지만 상점·설정에는 안 나온다
  const toyPoses = () => (global.PetSprite && global.PetSprite.TOY_POSES) || {};
  const carries = () => (global.PetSprite && global.PetSprite.CARRY) || {};
  const anim = (key) => motions()[key] || toyPoses()[key];

  // 모션·악세사리가 쓰는 기준점 (머리 한가운데 열, 정수리 줄, 눈, 코, 목…)
  function anchorsOf(g) {
    const acc = g.m.acc;
    const col = (i) => Math.round(g.x0 + i);
    const row = (j) => Math.round(g.y0 + j + g.lift(j));
    const E = g.s.eye;
    const fx = Math.round(g.hx + g.p.lookX);
    const ey = Math.round(g.hy + E.dy);
    const sp = Math.round(E.spread);
    const hx = col(g.m.hx);
    return {
      hx, fx, ey, sp,
      eyeL: fx - sp - E.w + 1, eyeR: fx + sp, ew: E.w, eh: E.h,
      my: ey + E.h,
      top: row(acc.top), earTop: row(0),
      hw: Math.round(acc.hw), left: hx - Math.round(acc.hw), right: hx + Math.round(acc.hw),
      neck: Math.min(GROUND - 1, row(acc.neck)),
      cx: Math.round(g.cx), cy: Math.round(g.cy), ground: GROUND,
      curled: g.m === g.s.curl, t: g.t,
    };
  }

  // ---------- 효과(fx) ----------
  // 합성이 끝난 진짜 캔버스에 찍는다. 몸이 돌거나 뒤집혀도 글자·눈물은 똑바로 나온다.

  // 3×5 미니 글꼴 (효과 글자용)
  const FONT = {
    A: ['.X.', 'X.X', 'XXX', 'X.X', 'X.X'], B: ['XX.', 'X.X', 'XX.', 'X.X', 'XX.'], C: ['.XX', 'X..', 'X..', 'X..', '.XX'],
    D: ['XX.', 'X.X', 'X.X', 'X.X', 'XX.'], E: ['XXX', 'X..', 'XX.', 'X..', 'XXX'], F: ['XXX', 'X..', 'XX.', 'X..', 'X..'],
    G: ['.XX', 'X..', 'X.X', 'X.X', '.XX'], H: ['X.X', 'X.X', 'XXX', 'X.X', 'X.X'], I: ['XXX', '.X.', '.X.', '.X.', 'XXX'],
    J: ['..X', '..X', '..X', 'X.X', '.X.'], K: ['X.X', 'X.X', 'XX.', 'X.X', 'X.X'], L: ['X..', 'X..', 'X..', 'X..', 'XXX'],
    M: ['X.X', 'XXX', 'X.X', 'X.X', 'X.X'], N: ['XX.', 'X.X', 'X.X', 'X.X', 'X.X'], O: ['.X.', 'X.X', 'X.X', 'X.X', '.X.'],
    P: ['XX.', 'X.X', 'XX.', 'X..', 'X..'], Q: ['.X.', 'X.X', 'X.X', 'XXX', '.XX'], R: ['XX.', 'X.X', 'XX.', 'X.X', 'X.X'],
    S: ['.XX', 'X..', '.X.', '..X', 'XX.'], T: ['XXX', '.X.', '.X.', '.X.', '.X.'], U: ['X.X', 'X.X', 'X.X', 'X.X', 'XXX'],
    V: ['X.X', 'X.X', 'X.X', 'X.X', '.X.'], W: ['X.X', 'X.X', 'X.X', 'XXX', 'X.X'], X: ['X.X', 'X.X', '.X.', 'X.X', 'X.X'],
    Y: ['X.X', 'X.X', '.X.', '.X.', '.X.'], Z: ['XXX', '..X', '.X.', 'X..', 'XXX'],
    0: ['XXX', 'X.X', 'X.X', 'X.X', 'XXX'], 1: ['.X.', 'XX.', '.X.', '.X.', 'XXX'], 2: ['XX.', '..X', '.X.', 'X..', 'XXX'],
    3: ['XX.', '..X', '.X.', '..X', 'XX.'], 4: ['X.X', 'X.X', 'XXX', '..X', '..X'], 5: ['XXX', 'X..', 'XX.', '..X', 'XX.'],
    6: ['.XX', 'X..', 'XXX', 'X.X', 'XXX'], 7: ['XXX', '..X', '.X.', '.X.', '.X.'], 8: ['XXX', 'X.X', 'XXX', 'X.X', 'XXX'],
    9: ['XXX', 'X.X', 'XXX', '..X', 'XX.'],
    '!': ['X', 'X', 'X', '.', 'X'], '?': ['XX.', '..X', '.X.', '...', '.X.'], '.': ['.', '.', '.', '.', 'X'],
    ';': ['.', 'X', '.', 'X', 'X'], ':': ['.', 'X', '.', 'X', '.'], '@': ['.XX.', 'X.XX', 'X.XX', 'X...', '.XX.'],
    '#': ['.X.X', 'XXXX', '.X.X', 'XXXX', '.X.X'], '&': ['.X..', 'X.X.', '.X..', 'X.XX', '.XX.'], '♥': ['...', 'X.X', 'XXX', '.X.', '...'],
    '+': ['...', '.X.', 'XXX', '.X.', '...'], '-': ['...', '...', 'XXX', '...', '...'], '%': ['X.X', '..X', '.X.', 'X..', 'X.X'],
    '$': ['.X.', 'XXX', 'XX.', '.XX', 'XXX'], '~': ['....', '.X.X', 'X.X.', '....', '....'],
    ' ': ['..', '..', '..', '..', '..'],
  };

  function textWidth(s) {
    let w = 0;
    for (const ch of s) w += (FONT[ch] || FONT[' '])[0].length + 1;
    return w - 1;
  }

  const dot = (ctx, x, y, c) => {
    ctx.fillStyle = c;
    ctx.fillRect(Math.round(x), Math.round(y), 1, 1);
  };
  const stamp = (ctx, rows, x, y, map) => {
    rows.forEach((r, j) => {
      for (let i = 0; i < r.length; i++) {
        const c = map[r[i]];
        if (c) dot(ctx, x + i, y + j, c);
      }
    });
  };
  function drawText(ctx, s, x, y, fill, outline = '#2b1a10') {
    const glyphs = [];
    let cx = Math.round(x);
    for (const ch of s) {
      const gl = FONT[ch] || FONT[' '];
      glyphs.push([gl, cx]);
      cx += gl[0].length + 1;
    }
    for (const [gl, gx] of glyphs)
      gl.forEach((r, j) => {
        for (let i = 0; i < r.length; i++)
          if (r[i] === 'X') for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) dot(ctx, gx + i + dx, y + j + dy, outline);
      });
    for (const [gl, gx] of glyphs)
      gl.forEach((r, j) => {
        for (let i = 0; i < r.length; i++) if (r[i] === 'X') dot(ctx, gx + i, y + j, fill);
      });
  }

  const FX = {
    text(r, ctx, f) { drawText(ctx, f.s, f.x, f.y, f.c || '#fff'); },
    drop(r, ctx, f) { dot(ctx, f.x, f.y, f.c || TEAR); dot(ctx, f.x, f.y + 1, f.c || TEAR); },
    spray(r, ctx, f) { dot(ctx, f.x, f.y, f.c || '#bfe6ff'); },
    confetti(r, ctx, f) {
      const flip = Math.floor(f.life * 12) % 2;
      dot(ctx, f.x, f.y, f.c);
      dot(ctx, f.x + (flip ? 1 : 0), f.y + (flip ? 0 : 1), f.c);
    },
    dust(r, ctx, f) {
      const k = 1 - f.life / f.max;
      const rows = k < 0.4 ? ['.g.', 'ggg', '.g.'] : ['.g.g.', 'g...g', '.g.g.'];
      stamp(ctx, rows, f.x - (rows[0].length >> 1), f.y - 1, { g: f.c || '#d6cfc4' });
    },
    note(r, ctx, f) { stamp(ctx, ['.XX', '.X.', 'XX.'], f.x, f.y, { X: f.c || '#2b1a10' }); },
    heart(r, ctx, f) {
      const big = f.big && f.life / f.max > 0.3;
      stamp(ctx, big ? ['.X.X.', 'XXXXX', 'XXXXX', '.XXX.', '..X..'] : ['X.X', 'XXX', '.X.'], f.x, f.y, { X: f.c || '#ff6f91' });
    },
    spark(r, ctx, f) { stamp(ctx, ['.Y.', 'YWY', '.Y.'], f.x - 1, f.y - 1, { Y: f.c || '#ffd35c', W: '#fff' }); },
    star(r, ctx, f) { stamp(ctx, ['.Y.', 'YYY', '.Y.'], f.x - 1, f.y - 1, { Y: f.c || '#ffd35c' }); },
    puff(r, ctx, f) {
      const k = 1 - f.life / f.max;
      const rows = k < 0.5 ? ['.XX.', 'XXXX', '.XX.'] : ['.XXX.', 'XXXXX', 'XXXXX', '.XXX.'];
      stamp(ctx, rows, f.x - (rows[0].length >> 1), f.y - (rows.length >> 1), { X: f.c || '#e9e4dc' });
    },
    soul(r, ctx, f) {
      const wig = Math.floor(f.life * 6) % 2;
      stamp(ctx, ['.KKK.', 'KWWWK', 'KkWkK', 'KWWWK', wig ? 'KW.WK' : 'K.W.K'], f.x - 2, f.y - 2, {
        K: '#9ab7cf', W: 'rgba(245,250,255,0.95)', k: '#2b1a10',
      });
    },
    fly(r, ctx, f) {
      dot(ctx, f.x, f.y, '#2b1a10');
      if (Math.floor(f.life * 30) % 2) { dot(ctx, f.x - 1, f.y - 1, '#c9d6e3'); dot(ctx, f.x + 1, f.y - 1, '#c9d6e3'); }
    },
    bird(r, ctx, f) {
      const up = Math.floor(f.life * 8) % 2;
      stamp(ctx, up ? ['K...K', '.KBK.', '..K..'] : ['.....', 'KKBKK', '..K..'], f.x - 2, f.y - 1, { K: '#3a2a20', B: '#6fb0ea' });
    },
    line(r, ctx, f) { for (let i = 0; i < (f.len || 4); i++) dot(ctx, f.x + i, f.y, f.c || '#8a7f74'); },
    vline(r, ctx, f) { for (let i = 0; i < (f.len || 4); i++) dot(ctx, f.x, f.y + i, f.c || '#8f80d8'); },
    ember(r, ctx, f) { dot(ctx, f.x, f.y, Math.floor(f.life * 10) % 2 ? '#ffd35c' : '#ff8a3c'); },
    bubble(r, ctx, f) {
      const rr = f.r || 1.5;
      for (let a = 0; a < 12; a++) dot(ctx, f.x + Math.cos((a / 12) * Math.PI * 2) * rr, f.y + Math.sin((a / 12) * Math.PI * 2) * rr, '#96cdf0');
      dot(ctx, f.x - rr * 0.4, f.y - rr * 0.4, '#fff');
    },
    char(r, ctx, f) { drawText(ctx, f.s, f.x, f.y, f.c || '#9fe3c8', '#1f2a24'); },
    // 번쩍임: 반투명 대신 흰 점 디더링. 남은 시간에 따라 촘촘 → 성기게 (8비트 다듬기, 10-18)
    flash(r, ctx, f) {
      const k = f.life / f.max;
      const step = k > 0.66 ? 1 : k > 0.33 ? 2 : 3;
      ctx.fillStyle = '#ffffff';
      for (let y = 0; y < G; y += step) for (let x = (y / step) % 2 ? 1 : 0; x < G; x += 2) ctx.fillRect(x, y, 1, 1);
    },
    stink(r, ctx, f) {
      const k = 1 - f.life / f.max;
      const rows = k < 0.4 ? ['.XX.', 'XXXX', '.XX.'] : ['..XX..', '.XXXX.', 'XXXXXX', '.XXXX.'];
      stamp(ctx, rows, f.x - (rows[0].length >> 1), f.y - (rows.length >> 1), { X: '#aabe78' });
    },
    shock(r, ctx, f) {
      for (const [dx, dy] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) for (let i = 1; i <= 2; i++) dot(ctx, f.x + dx * (f.r + i), f.y + dy * (f.r + i), '#2b1a10');
    },
    // 고양이(와 이미 찍힌 것)에만 색을 덧칠한다. mode 를 destination-out 으로 주면 반투명하게 지운다
    tint(r, ctx, f) {
      ctx.save();
      ctx.globalCompositeOperation = f.mode || 'source-atop';
      ctx.globalAlpha = f.a;
      ctx.fillStyle = f.c;
      ctx.fillRect(0, 0, G, G);
      ctx.restore();
    },
    // 분신: 방금 그린 고양이를 옆에 반투명하게 한 번 더
    clone(r, ctx, f) {
      ctx.save();
      ctx.globalAlpha = f.a;
      ctx.drawImage(r.off, Math.round(f.dx), Math.round(f.dy || 0));
      ctx.restore();
    },
    bill(r, ctx, f) {
      const flip = Math.floor(f.life * 8) % 2;
      stamp(ctx, flip ? ['GGGG', 'GgGG', 'GGGG'] : ['GG', 'Gg', 'GG', 'GG'], f.x, f.y, { G: '#78c46a', g: '#2f6b2a' });
    },
    coin(r, ctx, f) {
      const flip = Math.floor(f.life * 10) % 3;
      stamp(ctx, flip === 1 ? ['Y', 'y', 'Y'] : ['.Y.', 'YyY', '.Y.'], f.x - 1, f.y - 1, { Y: '#ffd65a', y: '#d9a21f' });
    },
    shuriken(r, ctx, f) {
      const a = Math.floor(f.life * 20) % 2;
      stamp(ctx, a ? ['.K.', 'KgK', '.K.'] : ['K.K', '.g.', 'K.K'], f.x - 1, f.y - 1, { K: '#454b57', g: '#cfc8bd' });
    },
    // 연기 고리. 날아가면서 점점 커진다
    ring(r, ctx, f) {
      const rr = f.r + (1 - f.life / f.max) * (f.grow || 3);
      for (let i = 0; i < 16; i++) dot(ctx, f.x + Math.cos((i / 16) * Math.PI * 2) * rr, f.y + Math.sin((i / 16) * Math.PI * 2) * rr * 0.6, f.c || '#e1e1e1');
    },
    light(r, ctx, f) {
      ctx.fillStyle = f.c;
      ctx.fillRect(Math.round(f.x) - 1, Math.round(f.y) - 1, 3, 3);
    },
    rain(r, ctx, f) { dot(ctx, f.x, f.y, '#7cc4f2'); dot(ctx, f.x, f.y + 1, '#7cc4f2'); },
    // 두 점을 잇는 선 (거미줄)
    seg(r, ctx, f) {
      const n = Math.max(1, Math.abs(f.x2 - f.x), Math.abs(f.y2 - f.y));
      for (let i = 0; i <= n; i++) dot(ctx, f.x + ((f.x2 - f.x) * i) / n, f.y + ((f.y2 - f.y) * i) / n, f.c || '#f4f4f4');
    },
    // 연기로 만든 해골
    skull(r, ctx, f) {
      stamp(ctx, ['.XXXXX.', 'XXXXXXX', 'X..X..X', 'XXXXXXX', '.XX.XX.', '.XXXXX.', '.X.X.X.'], f.x - 3, f.y - 3, { X: f.c || '#e8e8e8' });
    },
    // 아무 도트나 날린다 (던진 게임패드·튀어나온 생선…)
    sprite(r, ctx, f) { stamp(ctx, f.rows, f.x, f.y, f.map); },
    bolt(r, ctx, f) {
      let x = f.x;
      for (let y = 0; y < f.y; y++) {
        if (y % 4 === 0) x += y % 8 === 0 ? 2 : -2;
        dot(ctx, x, y, '#fff6a0');
        dot(ctx, x + 1, y, '#ffd35c');
      }
    },
    // 번개 맞았을 때 보이는 뼈
    skel(r, ctx, f) {
      stamp(ctx, ['.WWWWW.', 'W.W.W.W', 'WWWWWWW', '.W.W.W.', '...W...', 'WWWWWWW', '...W...', 'WWWWWWW', '...W...', 'WW.W.WW'], f.x - 3, f.y, { W: '#ffffff' });
    },
    ufo(r, ctx, f) {
      stamp(ctx, ['....KKK....', '...KUUUK...', '..KUUUUUK..', 'KKKKKKKKKKK', 'KgYgYgYgYgK', '.KKKKKKKKK.'], f.x - 5, f.y, { K: '#2b1a10', U: '#bfe6ff', g: '#8f95a0', Y: Math.floor(f.life * 8) % 2 ? '#ffd35c' : '#ff9bb8' });
    },
    beam(r, ctx, f) {
      for (let y = f.y; y < GROUND + 1; y++) {
        const w = Math.round(2 + (y - f.y) * 0.3);
        // 반투명 대신 가운데는 밝은 띠, 가장자리는 체크무늬 디더링 + 진한 테두리 (8비트 다듬기, 10-18)
        for (let x = f.x - w; x <= f.x + w; x++) {
          const edge = Math.abs(x - f.x);
          if (edge === w) dot(ctx, x, y, '#4f9e62');
          else if (edge <= 1) dot(ctx, x, y, '#e6ffe6');
          else if ((x + y) % 2 === 0) dot(ctx, x, y, '#a8ecb0');
        }
      }
    },
  };


  // ---------- 블렌더(Blender MCP) 3D 멀티 포즈 + 리모션/하이퍼프레임(Remotion/Hyperframe) 60fps 스프링 엔진 ----------
  // 8비트 도트 스프라이트(Kit Commit 방식)와 완전히 차별화된 순수 3D 스튜디오 렌더링 캐릭터 & 물리 보간 애니메이션
  const HD_SCALE = 5; // 48 * 5 = 240x240 고해상도 스무스 캔버스
  const HWATA_3D_POSES = {};
  const HWATA_3D_EARS = {};
  const HWATA_3D_EARS_STAND4 = {};
  let hwata3DReady = false;
  (function loadHwata3DAssets() {
    if (typeof Image === 'undefined') return;
    // 진짜 강아지 자세: 앉기(sit) · 네 발로 서기(stand4) · 걷기 두 걸음(stand4_a/b) · 물건 물기(_hold)
    const names = ['idle', 'blink', 'type1', 'type2', 'wave', 'brush',
      'sit', 'sit_blink', 'sit_hold', 'stand4', 'stand4_blink', 'stand4_a', 'stand4_b', 'stand4_hold_a', 'stand4_hold_b'];
    let loaded = 0;
    const p = (typeof location !== 'undefined' && location.pathname) ? location.pathname : '';
    const base = /\/releases\/ko\//.test(p) ? '../../assets3d/' : (/\/(releases|ja)\//.test(p) ? '../assets3d/' : 'assets3d/');
    for (const k of names) {
      const img = new Image();
      img.onload = () => {
        loaded++;
        if (loaded >= names.length) hwata3DReady = true;
      };
      img.src = base + 'hwata_3d_' + k + '.png';
      HWATA_3D_POSES[k] = img;
    }
    // 13가지 3D 귀 모양 오버레이 에셋 (정면 앉기/서기용 + 네 발 서기 stand4용)
    for (const ek of EAR_KEYS) {
      const fImg = new Image();
      fImg.src = base + 'hwata_3d_ear_' + ek + '.png';
      HWATA_3D_EARS[ek] = fImg;

      const sImg = new Image();
      sImg.src = base + 'hwata_3d_ear_stand4_' + ek + '.png';
      HWATA_3D_EARS_STAND4[ek] = sImg;
    }
  })();
  // 블렌더 카메라로 투영해 얻은 자세별 입·엉덩이 위치 (이미지 0~1 좌표). stand4 그림은 기본으로 왼쪽을 본다
  const HWATA_DOG_ANCHORS = {
    upright: { mouth: [0.5, 0.44], hip: [0.28, 0.62], faceLeft: false },
    sit: { mouth: [0.5, 0.4312], hip: [0.2524, 0.7671], faceLeft: false },
    stand4: { mouth: [0.2655, 0.5372], hip: [0.8352, 0.6351], faceLeft: true },
  };

  class PetRenderer {
    constructor(canvas) {
      this.canvas = canvas;
      canvas.width = G;
      canvas.height = G;
      this.realCtx = canvas.getContext('2d', { willReadFrequently: true });
      this.ctx = this.realCtx;
      // 고양이는 여기에 먼저 그리고, 몸 변형을 걸어 진짜 캔버스에 옮긴다
      const off = document.createElement('canvas');
      off.width = off.height = G;
      this.off = off;
      this.offCtx = off.getContext('2d', { willReadFrequently: true });
      this.stage = 'dog';
      this.species = 'dog';
      this.ears = 'perk'; // 귀 모양 (setEars)
      this.mood = 'idle';
      this.accessory = 'none';
      this.look = 0;
      this.action = null; // 지금 하는 한 번짜리 동작 (기본 동작이든 모션이든)
      this.actionAt = 0;
      this.actionLen = 0;
      this.pendingWear = null; // 모션 도중에 갈아입을 코스튬 { acc, at, action } — wearDuring 참고
      this.particles = [];
      this.fx = [];
      this.ms = {}; // 지금 모션이 쓰는 메모장 (한 바퀴 돌 때마다 비운다)
      this.moodMotions = {}; // 기분 → 그 기분 동안 차례로 돌릴 모션 목록 (설정에서 고른 것)
      this.moodTurn = {}; // 기분마다 지금 몇 번째 모션인지 { i, at }
      this.toyPose = null; // 장난감 놀이 중 반복하는 자세 (기분 모션보다 먼저)
      this.toyOff = 0; // 상자·봉투처럼 고양이가 직접 그리는 장난감이 고양이한테서 떨어진 거리(도트, 화면 기준)
      this.dogPose = 'sit'; // 🐕 기본은 앉은 자세 (laya 판단: 사람처럼 선 자세보다 진짜 강아지 자세가 더 귀엽다)
      this.carryEmoji = null; // '00 물어와' 로 물고 오는 물건 (이모지)
      this.present = null; // 물어 온 물건을 입에 물고 자랑하는 중 { emoji, until }
      this.carry = null; // 입에 물고 다니는 것 (쥐돌이 · 'treasure' 면 carryKey 의 보물)
      this.carryKey = null;
      this.held = null; // 사람 손에 들려 있나 (setHeld)
      this.heldAt = 0;
      this.loopKey = null;
      this.loopAt = 0;
      this.cycle = 0;
      this.savedFacing = 1;
      this.last = performance.now() / 1000;
      this.spawnClock = 0;
      this.top = GROUND - 20;
      this.facing = 1; // 1 = 오른쪽, -1 = 왼쪽. 걸어가는 쪽을 본다
      this.move = 0; // 지금 걷는 속도(px/s). 0 이면 서 있다
      this.walkPhase = 0; // 걸음 박자 0~1
      // 심심할 때 알아서 하는 잔동작 (두리번, 귀 씰룩, 꼬리 탁)
      this.idle = { next: 2, look: null, ear: null, flick: 0 };
      this._p = null;
      this._an = null;
      this._mo = null;
      this._shadow = null;
      this._dt = 0.05;
    }

    setStage(s) { if (STAGE[s]) { this.stage = s; this.species = s; } }
    setSpecies(s) { if (STAGE[s]) { this.stage = s; this.species = s; } }
    // 귀 모양 (EARS 의 키). 없는 키면 기본 귀
    setEars(k) { this.ears = (EARS[k] || (typeof DOG_EARS !== 'undefined' && DOG_EARS[k])) ? k : (this.stage === 'dog' ? 'fold' : 'perk'); }
    // 지금 단계에 귀 모양까지 입힌 정의
    stageDef() { return earStage(this.stage, this.ears); }
    setMood(m) { this.mood = m; }
    // 입힐 코스튬. 'a,b,c' 처럼 쉼표로 여러 벌, 또는 배열. 앞에 있는 것부터(뒤쪽부터) 그린다
    setAccessory(a) {
      const list = (Array.isArray(a) ? a : String(a || 'none').split(',')).map((x) => x.trim()).filter((x) => x && x !== 'none');
      this.accessories = list;
      this.accessory = list[0] || 'none';
    }
    // 코스튬을 지금 말고 모션 도중에 갈아입는다. 연기 펑·커튼처럼 고양이를 가렸다 '짠' 하고 보여 주는
    // 모션은 motions.js 에 reveal(0~1, 모션 길이 중 가려진 순간)이 적혀 있다. 그런 모션이 아니면 바로 갈아입는다
    wearDuring(action, acc) {
      const M = anim(action);
      const at = M && M.reveal ? M.reveal * M.len : 0;
      if (!at) return this.setAccessory(acc);
      this.pendingWear = { acc, at, action };
    }

    // 입은 코스튬 그림들 (그리는 순서)
    accList() {
      const all = accessories();
      return (this.accessories || []).map((k) => all[k]).filter(Boolean);
    }
    // { thinking: 'codefrenzy', sleeping: 'snot', … } 기분마다 반복할 모션. 없는 기분은 기본 자세
    setMoodMotions(map) { this.moodMotions = map || {}; }
    // 지금 기분의 모션. 여러 개면 한 모션을 5분 분량(한 바퀴 단위로 딱 떨어지게) 반복하고 다음 것으로 넘어간다.
    // 한 바퀴마다 바꾸면 눈이 어지러워서 최소 5분은 같은 걸 계속 돌린다
    moodPick(t) {
      const mm = this.moodMotions[this.mood];
      if (!Array.isArray(mm)) return mm || null;
      if (!mm.length) return null;
      const st = this.moodTurn[this.mood] || (this.moodTurn[this.mood] = { i: 0, at: t });
      let k = mm[st.i % mm.length];
      const dur = anim(k) ? anim(k).len : 8;
      // 5분을 채우는 데 필요한 바퀴 수만큼 (중간에 끊기지 않게 바퀴 단위로 올림)
      const hold = Math.ceil(MOOD_HOLD / dur) * dur;
      if (mm.length > 1 && t - st.at > hold) { st.i++; st.at = t; k = mm[st.i % mm.length]; }
      return anim(k) ? k : null;
    }
    // -1(왼쪽) ~ 1(오른쪽). 장난감을 눈으로 따라갈 때 쓴다
    setLook(x) { this.look = Math.max(-1, Math.min(1, x || 0)); }
    // 몸이 향하는 쪽. 왼쪽이면 그림을 통째로 뒤집는다
    setFacing(dir) { this.facing = dir < 0 ? -1 : 1; }
    // 걷는 속도(px/s, 부호 = 방향). 0 이 아니면 걸음 애니메이션이 돈다
    setMove(v) {
      this.move = v || 0;
      if (v) this.setFacing(v);
    }

    // 🐕 진짜 강아지 기본 자세: 'sit'(앉아) | 'stand4'(네 발로 서) — 명령으로 바꾼다
    setDogPose(p) { this.dogPose = p === 'stand4' ? 'stand4' : 'sit'; }
    // 물어 온 물건을 입에 물고 보여 준다 (emoji, ms 동안)
    setPresent(emoji, ms = 6000) {
      this.present = emoji ? { emoji, until: performance.now() / 1000 + ms / 1000 } : null;
    }
    // 포즈는 그대로 두고 하트만 뿅뿅 (명령을 알아들었다는 표시)
    cheer(n = 3) {
      const { cx, cy, rx, ry } = this.geom();
      for (let i = 0; i < n; i++) this.spawn('heart', cx + rand(-rx, rx), cy - ry, rand(-4, 4), rand(-14, -8), 1.2);
    }

    // 털색 (FURS 의 키). 손님 고양이의 fur 가 있으면 그게 먼저다
    setFur(key) { this.furKey = FURS[key] && key !== 'cheese' ? key : null; }

    get colors() {
      if (this.fur) return this.fur;
      const s = this.stageDef();
      if (s && s.species && s.species !== 'cat' && s.species !== 'dog' && (!this.furKey || this.furKey === 'white')) {
        return s.speciesColors || CAT;
      }
      if (this.furKey && FURS[this.furKey]) return FURS[this.furKey].pal;
      if (s && s.speciesColors) return s.speciesColors;
      return (s && s.colors) || CAT;
    }

    static isMotion(key) {
      return !!anim(key);
    }

    // 지금 하는 게 모션이면 그 정의
    get motion() {
      return this.action ? anim(this.action) || null : null;
    }

    // 장난감 놀이 중에 계속 반복할 자세 (상자 속에 숨기, 봉투 속에서 부스럭…). null 이면 끈다
    setToyPose(key) {
      if (key === this.toyPose) return;
      this.toyPose = key || null;
      this.loopKey = null;
    }

    // 끌어서 들어 올렸을 때. { rot, legs, px, py } — rot 는 몸이 흔들리는 각도, legs 는 뒷발이 늦게 따라오는 만큼(칸)
    // px·py 는 잡은 자리(도트 좌표). 그 점을 중심으로 대롱대롱 흔들린다. null 이면 내려놓은 것
    setHeld(h) {
      if (h && !this.held) this.heldAt = performance.now() / 1000;
      this.held = h || null;
    }

    // 동작 하나를 튼다. 모션(motions.js)이면 times 바퀴 돈다
    play(action, opts = {}) {
      const M = anim(action);
      const len = M ? M.len * Math.max(1, opts.times || 1) : ACTION_LEN[action];
      if (!len) return;
      if (this.motion) this.facing = this.savedFacing;
      this.undoMotion();
      this.action = action;
      this.actionAt = performance.now() / 1000;
      this.actionLen = len;
      this.loopKey = null;
      if (M) {
        this.savedFacing = this.facing;
        this.ms = {};
        this.fx = [];
        this.cycle = 0;
        if (M.start) M.start(this);
        return;
      }
      const { cx, cy, rx, ry } = this.geom();
      if (action === 'happy') for (let i = 0; i < 3; i++) this.spawn('heart', cx + rand(-rx, rx), cy - ry, rand(-4, 4), rand(-14, -8), 1.2);
      if (action === 'levelup' || action === 'achieve') for (let i = 0; i < 10; i++) this.spawn('sparkle', cx + rand(-rx - 4, rx + 4), cy + rand(-ry, ry), rand(-8, 8), rand(-16, -4), 1.6);
    }

    // 모션이 잠깐 바꿔 둔 것(둔갑한 털색·꺼진 십자가 불…)을 되돌린다. 모션이 끝나거나 끊기거나 다른 동작으로 넘어갈 때.
    // 모션의 start(r) 가 r._undo 에 되돌리는 함수를 걸어 둔다
    undoMotion() {
      const u = this._undo;
      this._undo = null;
      if (u) u();
    }

    // 하던 동작을 그만둔다 (간식이 떨어지면 하던 모션을 멈추고 주우러 간다)
    cancel() {
      if (!this.action) return;
      if (this.motion) this.facing = this.savedFacing;
      this.undoMotion();
      this.action = null;
      this.fx = [];
      this.loopKey = null;
    }

    geom() {
      const m = this.stageDef().map;
      const x0 = Math.round(G / 2 - m.ax);
      const y0 = GROUND - (m.rows.length - 1);
      return { cx: x0 + m.ax, cy: y0 + m.cy, rx: m.rx, ry: m.ry };
    }

    spawn(type, x, y, vx, vy, life) {
      if (this.particles.length > 60) return;
      this.particles.push({ type, x, y, vx, vy, life, max: life });
    }

    // 모션이 효과를 뿌린다 (화면 좌표. 방향이 뒤집히면 scr 로 뒤집어서 넣는다)
    emit(o) {
      if (this.fx.length > 140) return;
      // perFrame 은 이번 프레임에만 한 번 찍히는 효과 (분신·색 입히기처럼 매 프레임 새로 뿌리는 것)
      const life = o.perFrame ? this._dt + 0.0005 : o.life || 1;
      this.fx.push(Object.assign({ vx: 0, vy: 0, ay: 0 }, o, { life, max: life }));
    }

    scr(x) {
      return this.facing < 0 ? G - 1 - x : x;
    }

    // 기본 깜빡임과 같은 박자
    blinkAt(t) {
      const bt = t % 4.3;
      return bt < 0.12 || (Math.floor(t / 4.3) % 3 === 1 && bt > 0.24 && bt < 0.36);
    }

    headTop() { return this.top; }

    hit(px, py) {
      if (px < 0 || py < 0 || px >= G || py >= G) return false;
      const mul = this.canvas.width / G;
      const x = Math.min(this.canvas.width - 1, Math.floor(px * mul));
      const y = Math.min(this.canvas.height - 1, Math.floor(py * mul));
      return this.realCtx.getImageData(x, y, 1, 1).data[3] > 100;
    }

    // ---------- 자세 ----------

    pose(t) {
      const p = {
        dy: 0, sx: 1, sy: 1, shear: 0, eyes: 'open', mouth: 'smile', lookX: 0, lookY: 0,
        armL: 'rest', armR: 'rest', prop: null, overlay: null, flash: 0, curl: false,
        tail: 'idle', ear: 0, earDy: [0, 0], step: null,
        // 모션이 켜는 것들: 몸 변형, 볼터치, 식은땀, 눈썹, 그림자 끄기, 바닥 아래 가리기, 꼬리 숨기기
        xf: null, blush: false, sweat: false, brow: null, noShadow: false, clipGround: false, noTail: false,
        // 뒷발을 길게 늘어뜨린다(들렸을 때·발차기). 값은 발끝이 옆으로 밀린 칸 수. hide 는 몸을 안 그린다(봉투 속)
        dangle: null, hide: false, scruff: 0,
      };
      // 눈 깜빡임. 세 번에 한 번은 두 번 연달아 깜빡인다
      const bt = t % 4.3;
      const twice = Math.floor(t / 4.3) % 3 === 1;
      const blink = bt < 0.12 || (twice && bt > 0.24 && bt < 0.36) || (t + 1.7) % 11 < 0.1;
      const breathe = Math.sin(t * 2.2);

      switch (this.mood) {
        case 'thinking':
          p.dy = -3; // 노트북 뒤에 앉은 높이 (타자 박자는 어깨로 — pose 끝부분)
          p.armL = p.armR = 'type';
          p.prop = 'laptop';
          p.overlay = 'dots';
          p.mouth = 'flat';
          p.tail = 'flick';
          if (blink) p.eyes = 'blink';
          break;
        case 'waiting': {
          const ph = (t % 0.9) / 0.9;
          p.dy = -Math.sin(ph * Math.PI) * 4;
          if (ph < 0.12) { p.sy = 0.9; p.sx = 1.08; }
          p.overlay = 'bang';
          p.armR = 'wave';
          p.mouth = 'open';
          p.tail = 'up';
          p.ear = 1;
          break;
        }
        case 'hungry':
          // 빈 밥그릇 앞에 앉아 올려다본다. 꼬리는 축 늘어진다
          p.prop = 'emptyBowl';
          p.lookX = -1;
          p.tail = 'slow';
          p.ear = -1;
          p.mouth = Math.sin(t * 1.6) > 0.7 ? 'open' : 'smile';
          if (blink) p.eyes = 'blink';
          break;
        case 'sleepy': {
          p.eyes = 'half';
          p.mouth = 'flat';
          p.tail = 'slow';
          p.ear = -1;
          p.sy = 0.96;
          const yawn = t % 9 < 1.5;
          if (yawn) { p.mouth = 'o'; p.eyes = 'closed'; }
          break;
        }
        case 'sleeping':
          p.curl = true;
          // 숨 쉴 때 등만 부풀었다 가라앉는다 (바닥에서 뜨지 않는다 — 그림자와 늘 붙어 있게). 들숨이 조금 짧고 날숨이 길다
          p.sy = Math.sin(t * 1.2) > 0.35 ? 1.02 : 1;
          p.eyes = 'closed';
          p.mouth = 'flat';
          p.ear = -1;
          break;
        case 'active':
          // 구경하는 중: 통통 뛰지 않고 제자리에서 들썩(몸을 살짝 늘였다 줄였다)하며 꼬리를 흔든다
          p.sy = 1 + Math.abs(Math.sin(t * 2.5)) * 0.04 + breathe * 0.015;
          p.tail = 'wag';
          if (blink) p.eyes = 'blink';
          break;
        default: // idle
          p.sy = 1 + breathe * 0.03;
          if (blink) p.eyes = 'blink';
      }

      if (this.look) p.lookX += this.look;
      else if (this.gaze && !this.action && !this.motion && !this.move && !this.loopKey && (this.mood === 'idle' || this.mood === 'active')) {
        // 마우스 커서 쪽을 본다 (gaze 는 화면 기준이라 캔버스가 뒤집혀 있으면 가로를 뒤집는다)
        p.lookX = this.gaze.x * this.facing;
        p.lookY = this.gaze.y;
      } else if (this.idle.look) p.lookX += this.idle.look.x;
      if (p.tail === 'idle' && t < this.idle.flick) p.tail = 'flick';

      // 걷는 중 — 발을 번갈아 딛고 몸이 한 칸씩 오르내린다. 꼬리는 균형을 잡느라 올라간다
      if (this.move && !p.curl) {
        p.step = this.walkPhase;
        // 걸음마다 몸이 살짝 눌렸다 펴진다 (발은 바닥에서 안 뜬다)
        if (Math.sin(this.walkPhase * Math.PI * 4) > 0) p.sy *= 0.96;
        p.tail = 'wag';
        p.ear = 1;
        p.mouth = 'flat';
      }

      // 가려진 사이에 갈아입기 — 그 순간이 됐거나, 모션이 중간에 끊겼으면 바로 갈아입힌다
      if (this.pendingWear && (this.action !== this.pendingWear.action || t - this.actionAt >= this.pendingWear.at)) {
        const w = this.pendingWear;
        this.pendingWear = null;
        this.setAccessory(w.acc);
      }

      // 한 번짜리 동작이 끝났나
      if (this.action && t - this.actionAt > this.actionLen) {
        if (this.motion) this.facing = this.savedFacing;
        this.undoMotion();
        this.action = null;
        this.loopKey = null;
      }

      this._mo = null;
      const M = this.motion;
      if (this.held) {
        this.heldPose(p, t);
      } else if (M) {
        // 모션 — 여러 바퀴면 바퀴마다 메모장을 비우고 처음부터
        let at = t - this.actionAt;
        const c = Math.floor(at / M.len);
        if (c !== this.cycle) {
          this.cycle = c;
          this.ms = {};
          if (M.start) M.start(this);
        }
        at -= c * M.len;
        this.runMotion(M, p, at, t);
      } else if (this.action) {
        const at = t - this.actionAt;
        const k = at / this.actionLen;
        p.overlay = null;
        p.prop = null;
        p.curl = false;
        p.step = null;
        p.tail = 'wag';
        this.basicAction(p, k, at);
      } else {
        // 장난감 자세가 있으면 그걸, 아니면 기분마다 설정에서 고른 모션을 계속 돌린다 (걷거나 뭔가를 쳐다볼 때는 쉰다)
        const key = this.toyPose || (!this.move && !this.look ? this.moodPick(t) : null);
        const L = key ? anim(key) : null;
        if (L) {
          if (this.loopKey !== key || t - this.loopAt > L.len) {
            if (this.loopKey !== key) this.fx = [];
            this.loopKey = key;
            this.loopAt = t;
            this.ms = {};
            if (L.start) L.start(this);
          }
          this.runMotion(L, p, t - this.loopAt, t);
        } else this.loopKey = null;
      }

      // 귀 — 기분이 높이를 정하고, 가만히 있을 때는 가끔 한쪽만 씰룩인다
      p.earDy = p.ear > 0 ? [-1, -1] : p.ear < 0 ? [1, 1] : [0, 0];
      if (!p.ear && this.idle.ear && !this._mo) p.earDy[this.idle.ear.side] = this.idle.ear.up ? -1 : 1;
      // 노트북 타자: 앞발은 화면 뒤에 가려져 안 보이니, 어깨(몸)가 번갈아 들썩이는 걸로 친다는 걸 보여 준다.
      // 모션이 몸 변형(xf)을 이미 쓰고 있으면 건드리지 않는다
      if ((p.armL === 'type' || p.armL === 'typefast') && !p.xf && !this.held) {
        const f = p.armL === 'typefast' ? 16 : 9;
        const beat = Math.floor(t * f) % 2 ? 1 : -1;
        p.xf = { rot: beat * (p.armL === 'typefast' ? 0.035 : 0.022), py: GROUND };
        // 노트북 화면 불빛이 얼굴에 비친다 (아래를 내려다보는 눈)
        if (p.lookY === 0) p.lookY = 1;
      }
      this._p = p;
      return p;
    }

    // 목덜미를 잡혀 들린 고양이. 머리는 손에 붙들린 채 가만히 있고, 목 아래 몸통만
    // 진자처럼 흔들린다. 뒷발과 꼬리는 몸보다 한 박자 더 늦게 대롱대롱.
    // 처음엔 눈이 동그래졌다가 곧 얌전히 체념한다 (목덜미 잡힌 고양이는 얌전해진다)
    heldPose(p, t) {
      const h = this.held;
      const since = t - this.heldAt;
      Object.assign(p, {
        curl: false, step: null, prop: null, overlay: null, armL: 'rest', armR: 'rest', noTail: true,
        lookX: 0, lookY: 0, dy: -2, sy: 1, sx: 1, ear: since < 0.6 ? 1 : -1, tail: 'slow', xf: null,
      });
      // 눈은 평소 크기 그대로 (놀라서 커지지 않는다)
      p.eyes = this.blinkAt(t) ? 'blink' : 'open';
      p.mouth = since < 0.6 ? 'o' : 'smile';
      if (since >= 0.6) p.blush = true;
      // 몸통 맨 아래가 옆으로 밀리는 칸 수 (화면에서 오른쪽이 +). 캔버스가 뒤집혀 있으면 부호도 뒤집는다.
      // 통통한 고양이라 몸이 한 덩어리로 묵직하게 움직인다: 휘는 건 두어 칸까지만
      p.scruff = clamp(Math.round(-Math.sin(h.rot) * 4), -2, 2) * this.facing;
      p.dangle = clamp(Math.round(h.legs * this.facing), -1, 1);
      // 오래 들고 있으면 버둥버둥: 뒷발을 번갈아 차고, 귀를 눕히고, 입을 벌린다
      if (h.struggle) {
        p.dangle = Math.floor(t * 12) % 2 ? 1 : -1;
        p.scruff = Math.floor(t * 6) % 2 ? 1 : -1;
        p.ear = -1;
        p.mouth = 'o';
        p.eyes = 'squint';
        p.blush = false;
      }
      p.noShadow = true;
    }

    // 모션 한 프레임. 자세를 깨끗이 비운 다음 모션이 원하는 대로 채운다
    runMotion(M, p, at, t) {
      Object.assign(p, {
        overlay: null, prop: null, curl: false, step: null, eyes: this.blinkAt(t) ? 'blink' : 'open', mouth: 'smile',
        armL: 'rest', armR: 'rest', tail: 'idle', ear: 0, dy: 0, sy: 1, sx: 1, lookX: 0, lookY: 0,
      });
      const k = clamp(at / M.len, 0, 1);
      M.pose(p, k, at, this, t);
      this._mo = { M, k, at };
    }

    basicAction(p, k, at) {
      const len = this.actionLen;
      switch (this.action) {
        case 'happy': {
          p.dy = -Math.sin(k * Math.PI) * 6;
          if (k > 0.85) { p.sy = 0.88; p.sx = 1.1; }
          p.eyes = 'happy'; p.mouth = 'open'; p.armL = p.armR = 'up'; p.ear = 1; p.tail = 'up';
          break;
        }
        case 'levelup':
        case 'achieve': {
          const j = (k * 2) % 1;
          p.dy = -Math.sin(j * Math.PI) * 7;
          if (j > 0.88) { p.sy = 0.86; p.sx = 1.12; }
          p.eyes = 'happy'; p.mouth = 'open'; p.armL = p.armR = 'up'; p.ear = 1; p.tail = 'up';
          break;
        }
        case 'evolve': {
          const freq = 4 + k * 26;
          p.flash = k < 0.92 ? (Math.sin(at * freq) > 0 ? 1 : 0) : 1 - (k - 0.92) / 0.08;
          p.eyes = 'closed'; p.mouth = 'flat'; p.dy = -k * 3; p.tail = 'up';
          if (k > 0.9 && !this.burst) {
            this.burst = true;
            const { cx, cy } = this.geom();
            for (let i = 0; i < 18; i++) {
              const a = (i / 18) * Math.PI * 2;
              this.spawn('sparkle', cx, cy, Math.cos(a) * 26, Math.sin(a) * 26, 1.4);
            }
          }
          break;
        }
        case 'wave':
          p.armR = 'wave'; p.eyes = 'happy'; p.mouth = 'open'; p.ear = 1; p.tail = 'up';
          break;
        case 'eat':
          p.prop = 'bowl'; p.lookX = -1; p.lookY = 1;
          p.mouth = Math.floor(at * 5) % 2 ? 'chew' : 'open';
          p.eyes = Math.floor(at * 0.8) % 2 ? 'happy' : 'open';
          break;
        case 'stretch': {
          const sn = Math.sin(k * Math.PI);
          p.sy = 1 - sn * 0.12; p.sx = 1 + sn * 0.12;
          p.eyes = 'closed'; p.mouth = 'o'; p.tail = 'up';
          break;
        }
        case 'yawn':
          p.eyes = 'closed'; p.mouth = 'o'; p.ear = -1;
          break;
        case 'nibble':
          // 바닥에 떨어진 먹이를 주워 먹는다. 밥그릇 없이 고개만 숙인다
          p.dy = 1;
          p.lookY = 1;
          p.eyes = 'half';
          p.mouth = Math.floor(at * 7) % 2 ? 'chew' : 'open';
          p.ear = 1;
          p.tail = 'wag';
          break;
        case 'pounce': {
          // 몸을 한 번 낮췄다가 앞으로 튀어 오른다
          if (k < 0.38) {
            p.sy = 0.86; p.sx = 1.12; p.dy = 1; p.tail = 'up';
          } else {
            const j = (k - 0.38) / 0.62;
            p.dy = -Math.sin(j * Math.PI) * 9;
            p.armL = p.armR = 'up';
          }
          p.eyes = 'open'; p.mouth = 'open'; p.ear = 1;
          break;
        }
        case 'bored':
          // 놀다가 질렸다. 멍하니 서 있다가 크게 하품하고, 식빵 자세로 앉아 버린다
          p.tail = 'slow';
          p.ear = -1;
          if (k < 0.3) { p.eyes = 'half'; p.mouth = 'flat'; }
          else if (k < 0.55) { p.eyes = 'closed'; p.mouth = 'o'; p.sy = 1.04; }
          else { p.curl = true; p.eyes = 'half'; p.mouth = 'flat'; }
          break;
        case 'perk':
          // 무슨 소리가 났나? 귀를 세우고 고개를 돌려 본다
          p.ear = 1;
          p.lookX = at < len / 2 ? -1 : 1;
          p.mouth = 'flat';
          p.tail = 'flick';
          break;
        case 'groom':
          // 앞발로 얼굴을 쓱쓱
          p.armR = 'groom';
          p.eyes = Math.floor(at * 2) % 2 ? 'happy' : 'blink';
          p.mouth = 'flat';
          p.tail = 'slow';
          break;
      }
      if (this.action !== 'evolve') this.burst = false;
    }

    // 걸음 박자와 잔동작을 한 프레임만큼 굴린다
    tick(dt, t) {
      const id = this.idle;
      if (this.move) {
        const cadence = clamp(1.1 + Math.abs(this.move) / 70, 1.1, 3.2);
        this.walkPhase = (this.walkPhase + dt * cadence) % 1;
      } else this.walkPhase = 0;

      // 자거나 뭔가 하는 중이면 잔동작은 쉰다
      if (this.action || this.move || this.look || this.mood === 'sleeping' || this.loopKey) {
        id.look = null;
        id.ear = null;
        return;
      }
      id.next -= dt;
      if (id.next <= 0) {
        id.next = rand(2.4, 6.4);
        const r = Math.random();
        if (r < 0.35) id.look = { x: Math.random() < 0.5 ? -1 : 1, until: t + rand(0.9, 2) };
        else if (r < 0.75) id.ear = { side: Math.random() < 0.5 ? 0 : 1, up: Math.random() < 0.6, until: t + rand(0.2, 0.45) };
        else id.flick = t + 0.7;
      }
      if (id.look && t > id.look.until) id.look = null;
      if (id.ear && t > id.ear.until) id.ear = null;
    }

    // ---------- 그리기 ----------

    // 블렌더 3D 렌더링 에셋 + 리모션(Remotion)/하이퍼프레임 스타일 60fps 스프링 물리 보간 렌더러
    renderBlender3DHwata(p, t, dt) {
      const W = G * HD_SCALE; // 240x240 HD
      if (this.canvas.width !== W) {
        this.canvas.width = W;
        this.canvas.height = W;
      }
      const ctx = this.realCtx;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, W, W);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      this.top = 18;
      // 1) 지금 모션/기분에 맞는 블렌더 3D 포즈 선택
      let poseKey = 'idle';
      const isTyping = p.prop === 'laptop' || this.mood === 'thinking' || p.armL === 'type' || p.armL === 'typefast';
      const isBrushing = this.action === 'brush' || this.action === 'eat' || this.action === 'nibble' || this.action === 'groom' || this.loopKey === 'brush';
      const isWaving = this.action === 'wave' || this.action === 'happy' || this.action === 'levelup' || this.action === 'achieve' || p.armR === 'wave' || p.armL === 'up';
      const isBlink = p.eyes === 'blink' || p.eyes === 'closed' || p.eyes === 'half' || this.mood === 'sleeping' || this.mood === 'sleepy' || p.curl;

      // 🐕 물고 있는 물건: 물어 오는 중(carryEmoji) 또는 자랑하는 중(present)
      if (this.present && t > this.present.until) this.present = null;
      const heldEmoji = this.carryEmoji || (this.present && this.present.emoji) || null;
      const walking4 = !!(this.move && !p.curl);
      let dogKind = 'upright';
      if (isTyping) {
        const spd = p.armL === 'typefast' ? 12 : 7.5;
        poseKey = Math.floor(t * spd) % 2 === 0 ? 'type1' : 'type2';
      } else if (isBrushing) {
        poseKey = 'brush';
      } else if (isWaving && !heldEmoji) {
        poseKey = 'wave';
      } else if (walking4) {
        // 네 발로 총총 걷기: 두 걸음 그림을 번갈아
        dogKind = 'stand4';
        const stepB = Math.floor(t * 7) % 2 === 1;
        poseKey = heldEmoji ? (stepB ? 'stand4_hold_b' : 'stand4_hold_a') : (stepB ? 'stand4_b' : 'stand4_a');
      } else if (this.dogPose === 'stand4') {
        dogKind = 'stand4';
        poseKey = heldEmoji ? 'stand4_hold_a' : isBlink ? 'stand4_blink' : 'stand4';
      } else {
        dogKind = 'sit';
        poseKey = heldEmoji ? 'sit_hold' : isBlink ? 'sit_blink' : 'sit';
      }
      const anchor = HWATA_DOG_ANCHORS[dogKind];
      // stand4 그림은 왼쪽을 보고 있으니 오른쪽으로 갈 때 뒤집는다. 정면 그림은 예전처럼
      const flipX = anchor.faceLeft ? this.facing > 0 : this.facing < 0;
      const img = (HWATA_3D_POSES[poseKey] && HWATA_3D_POSES[poseKey].complete && HWATA_3D_POSES[poseKey].naturalWidth) ? HWATA_3D_POSES[poseKey] : HWATA_3D_POSES.idle;
      if (!img || !img.complete) return;

      // 2) 리모션/하이퍼프레임 스타일 연속 스프링 호흡 · 점프 · 틸트 물리량 계산
      const breathe = Math.sin(t * 2.8);
      let sx = 1 - breathe * 0.016;
      let sy = 1 + breathe * 0.028;
      let dy = (p.dy || 0) * HD_SCALE * 0.7;
      let dx = 0;
      let rot = 0;

      if (this.move && !p.curl) {
        // 걸을 때 부드러운 스프링 통통 스텝
        // 네 발 걷기는 몸이 덜 튀고 앞뒤로 살짝 끄덕인다
        const hop = Math.abs(Math.sin(t * 14));
        dy -= hop * 3.5;
        sy = 1 + hop * 0.025 - (1 - hop) * 0.015;
        sx = 1 - hop * 0.015 + (1 - hop) * 0.01;
        rot = Math.sin(t * 14) * 0.02;
      } else if (isTyping) {
        // 노트북 타자 칠 때 리듬감 있는 좌우 숄더 바운스
        rot = Math.sin(t * 15) * 0.032;
        sy = 1 + Math.abs(Math.sin(t * 7.5)) * 0.025;
      } else if (isBrushing) {
        // 치카치카 양치질 모션: 경쾌한 좌우 스크럽 + 탄력 바운스
        dx = Math.sin(t * 14) * 3.5;
        rot = Math.cos(t * 14) * 0.045;
        sy = 1 + Math.sin(t * 7) * 0.035;
      } else if (isWaving) {
        // 반갑게 인사/레벨업: 탄성 점프
        const jump = Math.abs(Math.sin(t * 6.5));
        dy -= jump * 14;
        sy = 1 + jump * 0.07;
        sx = 1 - jump * 0.04;
        rot = Math.sin(t * 6.5) * 0.06;
      } else if (this.mood === 'sleeping' || p.curl) {
        // 잘 때 새근새근 낮은 호흡
        sy = 0.92 + Math.sin(t * 1.6) * 0.025;
        sx = 1.05 - Math.sin(t * 1.6) * 0.015;
        dy += 4;
      }

      if (this.held) {
        rot += clamp(-Math.sin(this.held.rot || 0) * 0.18, -0.25, 0.25);
        dy -= 8;
      } else if (p.lookX) {
        rot += p.lookX * 0.035;
      }

      // 3) 3D 스튜디오 소프트 바닥 그림자 (점프 높이에 따라 크기·농도 반응)
      const groundY = (GROUND + 1.2) * HD_SCALE;
      const cx = (G / 2) * HD_SCALE + dx;
      if (!p.noShadow && !this.floorShadow) {
        const liftRatio = clamp(1 + dy / 70, 0.55, 1.05);
        const shRx = 46 * liftRatio;
        const shRy = 11 * liftRatio;
        ctx.save();
        ctx.translate(cx, groundY);
        ctx.scale(1, shRy / shRx);
        const grad = ctx.createRadialGradient(0, 0, 4, 0, 0, shRx);
        grad.addColorStop(0, 'rgba(28, 16, 10, 0.34)');
        grad.addColorStop(0.65, 'rgba(28, 16, 10, 0.14)');
        grad.addColorStop(1, 'rgba(28, 16, 10, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(0, 0, shRx, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // 4) 3D 캐릭터 본체 렌더링 (발끝 피벗 기준으로 스프링 스케일·회전 적용)
      const drawSize = 132; // 240 캔버스 안의 3D 캐릭터 크기 (머리 위 말풍선·파티클 여유 공간 확보)
      const pivotY = groundY + dy + 4;
      ctx.save();
      ctx.translate(cx, pivotY);
      if (flipX) ctx.scale(-1, 1);
      ctx.rotate(rot);
      ctx.scale(sx, sy);
      // 4-1) 🐶 화타의 리얼타임 절차적 살랑살랑 꼬리 (상황·기분에 따른 강약·속도·방향 자동 조절)
      let tailFreq = 4.2;        // 기본 흔들림 속도 (Hz)
      let tailAmp = 0.28;         // 기본 흔들림 폭 (진폭, rad)
      let tailBaseAngle = -0.52;  // 기본 중심 각도 (엉덩이 뒤쪽 위로 살짝 세움)
      let tailHarmonic = 0;

      if (isWaving || this.action === 'levelup' || this.action === 'happy') {
        tailFreq = 15.0;
        tailAmp = 0.62;
        tailBaseAngle = -0.78;
        tailHarmonic = Math.sin(t * 30.0) * 0.14;
      } else if (isBrushing) {
        tailFreq = 8.5;
        tailAmp = 0.38;
        tailBaseAngle = -0.38;
      } else if (isTyping || this.mood === 'thinking') {
        tailFreq = 2.4;
        tailAmp = 0.18;
        tailBaseAngle = -0.45;
      } else if (this.mood === 'sleeping' || p.curl) {
        tailFreq = 1.3;
        tailAmp = 0.08;
        tailBaseAngle = 0.22;
      } else if (this.move && !p.curl) {
        tailFreq = 10.5;
        tailAmp = 0.42;
        tailBaseAngle = -0.50;
      }

      const tailAngle = tailBaseAngle + Math.sin(t * tailFreq) * tailAmp + tailHarmonic;
      // 꼬리 뿌리: 자세마다 엉덩이 위치가 다르다 (정면 앉기는 왼쪽 엉덩이 뒤, 네 발 서기는 몸 뒤끝)
      const hipX = dogKind === 'upright' ? -drawSize * 0.22 : (-0.5 + anchor.hip[0]) * drawSize;
      const hipY = dogKind === 'upright' ? -drawSize * 0.38 : -drawSize + 8 + anchor.hip[1] * drawSize;
      const tailLen = drawSize * (dogKind === 'stand4' ? 0.24 : 0.28);

      ctx.save();
      ctx.translate(hipX, hipY);
      // 네 발 서기: 꼬리를 몸 뒤쪽(그림 오른쪽) 위로 치켜든다
      if (dogKind === 'stand4') ctx.rotate(Math.PI);
      ctx.rotate(tailAngle);

      if (tailFreq > 10) {
        ctx.save();
        ctx.rotate(-tailAmp * 0.35);
        ctx.beginPath();
        ctx.ellipse(-tailLen * 0.5, 0, tailLen * 0.5, 7, 0, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
        ctx.fill();
        ctx.restore();

        ctx.save();
        ctx.rotate(tailAmp * 0.35);
        ctx.beginPath();
        ctx.ellipse(-tailLen * 0.5, 0, tailLen * 0.5, 7, 0, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
        ctx.fill();
        ctx.restore();
      }

      ctx.beginPath();
      ctx.moveTo(0, -6);
      ctx.bezierCurveTo(-tailLen * 0.35, -10, -tailLen * 0.7, -14, -tailLen, -3);
      ctx.arc(-tailLen, 0, 7.5, -Math.PI / 2, Math.PI / 2, false);
      ctx.bezierCurveTo(-tailLen * 0.7, 10, -tailLen * 0.35, 8, 0, 6);
      ctx.closePath();

      const tailGrad = ctx.createLinearGradient(0, 0, -tailLen, 0);
      tailGrad.addColorStop(0, '#f2ede4');
      tailGrad.addColorStop(0.5, '#ffffff');
      tailGrad.addColorStop(1, '#fffaf2');
      ctx.fillStyle = tailGrad;
      ctx.shadowColor = 'rgba(40, 20, 10, 0.16)';
      ctx.shadowBlur = 6;
      ctx.shadowOffsetX = -2;
      ctx.shadowOffsetY = 3;
      ctx.fill();

      ctx.strokeStyle = 'rgba(215, 205, 190, 0.85)';
      ctx.lineWidth = 1.6;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(-tailLen + 1, -1, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();

      ctx.restore();

      ctx.drawImage(img, -drawSize / 2, -drawSize + 8, drawSize, drawSize);
      // 4-1b) 13가지 3D 귀 모양 오버레이 + 귀 씰룩(p.ear / idle.ear) 스프링 물리 반응
      const earKey = (this.ears && EARS[this.ears]) ? this.ears : 'perk';
      const earMap = dogKind === 'stand4' ? HWATA_3D_EARS_STAND4 : HWATA_3D_EARS;
      const earImg = (earMap[earKey] && earMap[earKey].complete && earMap[earKey].naturalWidth)
        ? earMap[earKey]
        : (earMap.perk && earMap.perk.complete && earMap.perk.naturalWidth ? earMap.perk : null);
      if (earImg) {
        let earDy = 0;
        let earRot = 0;
        if (p.ear) {
          earDy = -p.ear * 1.6;
          earRot = p.ear * 0.025;
        } else if (this.idle && this.idle.ear) {
          earDy = this.idle.ear.up ? -1.4 : 1.0;
          earRot = (this.idle.ear.side ? 1 : -1) * 0.022;
        }
        if (earDy || earRot) {
          ctx.save();
          ctx.translate(0, earDy);
          ctx.rotate(earRot);
          ctx.drawImage(earImg, -drawSize / 2, -drawSize + 8, drawSize, drawSize);
          ctx.restore();
        } else {
          ctx.drawImage(earImg, -drawSize / 2, -drawSize + 8, drawSize, drawSize);
        }
      }
      ctx.restore();

      // 4-2) 🦴 입에 문 물건 (이모지는 뒤집지 않고 똑바로 그린다)
      if (heldEmoji) {
        const mx = (-0.5 + anchor.mouth[0]) * drawSize * (flipX ? -1 : 1) * sx;
        const my = (-drawSize + 8 + anchor.mouth[1] * drawSize) * sy;
        const sz = Math.round(drawSize * (this.present ? 0.3 : 0.26));
        ctx.save();
        ctx.translate(cx + mx, pivotY + my + sz * 0.18);
        ctx.rotate((flipX ? 1 : -1) * 0.18 + Math.sin(t * 5) * 0.06);
        ctx.font = `${sz}px "Segoe UI Emoji", "Apple Color Emoji", "Noto Color Emoji", sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.shadowColor = 'rgba(40, 20, 10, 0.25)';
        ctx.shadowBlur = 4;
        ctx.shadowOffsetY = 2;
        ctx.fillText(heldEmoji, 0, 0);
        ctx.restore();
      }

      // 5) 3D 벡터 플로팅 이펙트 (양치 거품 · 하트 · 반짝이 · Zzz)
      if (isBrushing && Math.random() < 0.28) {
        this.spawn('sparkle', G / 2 + rand(-5, 5), GROUND - 12 + rand(-3, 2), rand(-6, 6), rand(-14, -6), 1.1);
      }
      this.ambient({ cx: G / 2, cy: GROUND - 10, rx: 7, ry: 7, p }, dt);
      this.drawSmooth3DParticles(ctx, dt, t, cx, pivotY - drawSize + 18, p);
    }

    // 8비트 사각형 대신 부드러운 3D 벡터 하트 · 별빛 스파클 · Zzz · 말풍선 오버레이 렌더링
    drawSmooth3DParticles(ctx, dt, t, headX, headTopY, p) {
      // 생각 중(...) 또는 느낌표(!) 오버레이
      if (p.overlay === 'dots') {
        ctx.save();
        ctx.fillStyle = 'rgba(255, 253, 249, 0.94)';
        ctx.strokeStyle = '#3a2118';
        ctx.lineWidth = 2.2;
        ctx.beginPath();
        ctx.roundRect(headX + 18, Math.max(8, headTopY - 18), 44, 22, 11);
        ctx.fill();
        ctx.stroke();
        const n = (Math.floor(t * 3) % 3) + 1;
        ctx.fillStyle = '#d97757';
        for (let i = 0; i < n; i++) {
          ctx.beginPath();
          ctx.arc(headX + 29 + i * 11, Math.max(8, headTopY - 18) + 11, 3.2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      } else if (p.overlay === 'bang') {
        ctx.save();
        const by = Math.max(12, headTopY - 14 + Math.sin(t * 10) * 4);
        ctx.font = '900 22px Pretendard, sans-serif';
        ctx.fillStyle = '#ffcf3a';
        ctx.strokeStyle = '#3a2118';
        ctx.lineWidth = 4;
        ctx.strokeText('!', headX + 28, by);
        ctx.fillText('!', headX + 28, by);
        ctx.restore();
      }

      this.particles = this.particles.filter((pt) => (pt.life -= dt) > 0);
      for (const pt of this.particles) {
        pt.x += pt.vx * dt;
        pt.y += pt.vy * dt;
        const alpha = clamp((pt.life / pt.max) * 1.8, 0, 1);
        const px = pt.x * HD_SCALE;
        const py = pt.y * HD_SCALE;
        ctx.save();
        ctx.globalAlpha = alpha;
        if (pt.type === 'heart') {
          ctx.translate(px, py);
          ctx.scale(0.9, 0.9);
          ctx.fillStyle = '#ff5c8a';
          ctx.beginPath();
          ctx.moveTo(0, 4);
          ctx.bezierCurveTo(-8, -4, -12, 4, 0, 12);
          ctx.bezierCurveTo(12, 4, 8, -4, 0, 4);
          ctx.fill();
        } else if (pt.type === 'sparkle') {
          ctx.translate(px, py);
          ctx.rotate(t * 3);
          ctx.fillStyle = '#ffd43b';
          ctx.beginPath();
          for (let i = 0; i < 4; i++) {
            const a = (i * Math.PI) / 2;
            ctx.lineTo(Math.cos(a) * 7, Math.sin(a) * 7);
            ctx.lineTo(Math.cos(a + Math.PI / 4) * 2.5, Math.sin(a + Math.PI / 4) * 2.5);
          }
          ctx.closePath();
          ctx.fill();
        } else if (pt.type === 'z' || pt.type === 'zs') {
          ctx.font = '800 14px Pretendard, sans-serif';
          ctx.fillStyle = '#7d8bff';
          ctx.fillText('Z', px, py);
        } else {
          ctx.fillStyle = '#bae6fd';
          ctx.beginPath();
          ctx.arc(px, py, 4.5, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }
    }

    frame() {
      const t = performance.now() / 1000;
      this._tj = 0; // 꼬리를 몇 줄째 그리는지 (털 무늬용)
      const dt = Math.min(0.2, t - this.last);
      this.last = t;
      this._dt = dt;
      if (this.stage === 'dog' && hwata3DReady) {
        this.tick(dt, t);
        const p = this.pose(t);
        this.renderBlender3DHwata(p, t, dt);
        return;
      }
      if (this.canvas.width !== G) {
        this.canvas.width = G;
        this.canvas.height = G;
      }
      const real = this.realCtx;
      const off = this.offCtx;

      // 1) 고양이를 오프스크린에
      this.ctx = off;
      off.setTransform(1, 0, 0, 1, 0, 0);
      off.clearRect(0, 0, G, G);
      this.top = G;
      this.tick(dt, t);
      const p = this.pose(t);
      off.save();
      if (this.facing < 0) off.setTransform(-1, 0, 0, 1, G, 0);
      const g = this.layout(this.stageDef(), p, t, p.curl);
      this._shadow = [g.cx, g.body.rx * 1.15, -p.dy];
      if (p.curl) this.drawCurled(g);
      else this.drawCat(g);
      if (!g.flash) this.apply3DShading(g);
      this.ambient({ cx: g.cx, cy: g.cy, rx: g.body.rx, ry: g.body.ry, p }, dt);
      this.drawOverlay({ cx: g.cx, cy: g.cy - 1, rx: g.body.rx, ry: g.body.ry, p, t });
      this.drawParticles(dt);
      off.restore();

      // 2) 진짜 캔버스에 그림자 → 몸 변형을 건 고양이
      this.ctx = real;
      real.setTransform(1, 0, 0, 1, 0, 0);
      real.clearRect(0, 0, G, G);
      const xf = p.xf;
      // 창 안에서 떠 있으면(뛰어오름·들림) 그림자는 펫 창이 바닥에 따로 그린다 (floorShadow). 여기서 그리면 같이 떠오른다
      if (!p.noShadow && !this.floorShadow) {
        const [cx, rx, h] = this._shadow;
        const x = (this.facing < 0 ? G - 1 - cx : cx) + (xf && xf.ox ? xf.ox : 0);
        this.drawShadow(x, rx * (xf && xf.sx ? Math.abs(xf.sx) : 1), h + (xf && xf.oy < 0 ? -xf.oy : 0));
      }
      real.save();
      real.imageSmoothingEnabled = false;
      if (p.clipGround || p.clipY != null) {
        real.beginPath();
        real.rect(0, 0, G, (p.clipY != null ? p.clipY : GROUND) + 1);
        real.clip();
      }
      if (xf) {
        const px = xf.px != null ? xf.px : 24;
        const py = xf.py != null ? xf.py : GROUND;
        real.translate(Math.round(px + (xf.ox || 0)), Math.round(py + (xf.oy || 0)));
        if (xf.rot) real.rotate(xf.rot);
        real.scale((xf.sx || 1) * (xf.flipX ? -1 : 1), (xf.sy || 1) * (xf.flipY ? -1 : 1));
        real.translate(-px, -py);
      }
      real.drawImage(this.off, 0, 0);
      real.restore();

      // 3) 효과
      const mo = this._mo;
      if (mo && mo.M.step && this._an) mo.M.step(this, mo.k, mo.at, dt, this._an, p);
      this.fx = this.fx.filter((f) => (f.life -= dt) > 0);
      for (const f of this.fx) {
        f.vy += f.ay * dt;
        f.x += f.vx * dt;
        f.y += f.vy * dt;
        real.globalAlpha = f.fade === false ? 1 : clamp((f.life / f.max) * 2.2, 0, 1);
        FX[f.type](this, real, f);
      }
      real.globalAlpha = 1;
    }

    // 블렌더(Blender MCP) 3-Point 스튜디오 라이팅 기반 실시간 3D 복셀-플러시(Voxel-Plush) 볼륨 셰이더
    // - 좌상단 키라이트(Key Light) 베벨 하이라이트 + 구면 법선(Spherical Normal) 볼륨 그라데이션
    // - 우하단 입체 음영(Form Shadow) + 목·턱·노트북 경계 앰비언트 오클루전(AO) + 우측 림라이트(Rim Light)
    apply3DShading(g) {
      const F = this.fur ? this.fur : this.furKey ? FURS[this.furKey] : null;
      if (F && (F.holo || F.neon)) return;
      const off = this.offCtx;
      const img = off.getImageData(0, 0, G, G);
      const d = img.data;
      const cx = g.hx != null ? g.hx : g.cx;
      const cy = g.hy != null ? g.hy + 1.5 : g.cy;
      const rx = Math.max(6, (g.body && g.body.rx ? g.body.rx : 7) + 1.5);
      const ry = Math.max(6, (g.body && g.body.ry ? g.body.ry : 6.5) + 2.5);
      const neckY = g.y0 + (g.m && g.m.acc && g.m.acc.neck ? g.m.acc.neck : 8);

      // 알파 맵 및 외곽선 판별 캐시
      const alpha = new Uint8Array(G * G);
      const isOut = new Uint8Array(G * G);
      for (let i = 0; i < G * G; i++) {
        const a = d[i * 4 + 3];
        alpha[i] = a;
        if (a > 128) {
          const r = d[i * 4], gr = d[i * 4 + 1], b = d[i * 4 + 2];
          // 외곽선·눈동자·코처럼 어두운 픽셀 판별
          if (r < 72 && gr < 62 && b < 62) isOut[i] = 1;
        }
      }

      const hasSolid = (x, y) => x >= 0 && x < G && y >= 0 && y < G && alpha[y * G + x] > 128;
      const isBoundary = (x, y) => !hasSolid(x, y) || isOut[y * G + x] === 1;

      for (let y = 0; y < G; y++) {
        for (let x = 0; x < G; x++) {
          const idx = y * G + x;
          if (alpha[idx] <= 128) continue;
          const p4 = idx * 4;
          let r = d[p4], gr = d[p4 + 1], b = d[p4 + 2];

          // 1) 외곽선/눈/코 픽셀: 좌상단 외곽선은 부드러운 3D 브라운 베벨로, 우하단 외곽선은 깊은 3D 튜브 음영으로 조율
          if (isOut[idx]) {
            const nx = (x - cx) / rx;
            const ny = (y - cy) / ry;
            if (!hasSolid(x - 1, y) || !hasSolid(x, y - 1)) {
              // 빛을 받는 좌상단 외곽선 튜브 하이라이트
              const boost = Math.round(clamp((-nx * 0.55 - ny * 0.65) * 26, -6, 24));
              d[p4] = clamp(r + boost + 4, 0, 255);
              d[p4 + 1] = clamp(gr + boost, 0, 255);
              d[p4 + 2] = clamp(b + Math.round(boost * 0.8), 0, 255);
            } else if (!hasSolid(x + 1, y) || !hasSolid(x, y + 1)) {
              // 그림자 지는 우하단 외곽선 딥 섀도우
              d[p4] = clamp(r - 10, 0, 255);
              d[p4 + 1] = clamp(gr - 10, 0, 255);
              d[p4 + 2] = clamp(b - 8, 0, 255);
            }
            continue;
          }

          // 2) 내부 표면 픽셀: 3D 구면 법선(Spherical Normal) + 엣지 베벨(Edge Bevel) + 앰비언트 오클루전(AO) 계산
          const nx = clamp((x - cx) / rx, -1.25, 1.25);
          const ny = clamp((y - cy) / ry, -1.25, 1.25);
          const nz = Math.sqrt(Math.max(0.12, 1 - Math.min(0.88, nx * nx * 0.55 + ny * ny * 0.55)));

          // Blender KeyLight (-0.52, -0.62, 0.58) 내적
          const ndotl = (-nx * 0.52 - ny * 0.62 + nz * 0.58);

          // 외곽 경계와의 인접도에 따른 3D 엣지 베벨 (Bevel Normal)
          const topEdge = isBoundary(x, y - 1);
          const leftEdge = isBoundary(x - 1, y);
          const botEdge = isBoundary(x, y + 1);
          const rightEdge = isBoundary(x + 1, y);

          let bevel = 0;
          if (topEdge) bevel += 11;
          if (leftEdge) bevel += 9;
          if (botEdge) bevel -= 15;
          if (rightEdge) bevel -= 12;
          // 2칸 안쪽 서브-베벨 그라데이션 (부드러운 곡면 연결)
          if (!topEdge && isBoundary(x, y - 2)) bevel += 5;
          if (!leftEdge && isBoundary(x - 2, y)) bevel += 4;
          if (!botEdge && isBoundary(x, y + 2)) bevel -= 7;
          if (!rightEdge && isBoundary(x + 2, y)) bevel -= 6;

          // 목선(턱 밑) 앰비언트 오클루전(AO)으로 머리와 몸통의 3D 단차 분리
          let ao = 0;
          if (Math.abs(y - neckY) <= 1 && Math.abs(x - cx) <= 4) {
            ao = y === neckY ? -14 : -7;
          }

          // 우측 상단 스튜디오 림라이트 (Rim Light)
          let rim = 0;
          if (rightEdge && ny < 0.25) rim = 9;

          // 최종 3D 조도 변화량 (따뜻한 하이라이트 & 깊이감 있는 웜 섀도우)
          const sphereDelta = (ndotl - 0.36) * 34;
          const delta = clamp(sphereDelta + bevel + ao + rim, -42, 28);

          if (delta >= 0) {
            // 양지(Key Light): 따뜻하고 뽀얀 아이보리 스펙큘러 광택
            d[p4] = clamp(Math.round(r + delta * 1.05), 0, 255);
            d[p4 + 1] = clamp(Math.round(gr + delta * 0.98), 0, 255);
            d[p4 + 2] = clamp(Math.round(b + delta * 0.88), 0, 255);
          } else {
            // 음지(Form Shadow & AO): 채도가 살아있는 포근한 크림 베이지 입체 음영
            d[p4] = clamp(Math.round(r + delta * 0.88), 0, 255);
            d[p4 + 1] = clamp(Math.round(gr + delta * 0.98), 0, 255);
            d[p4 + 2] = clamp(Math.round(b + delta * 1.15), 0, 255);
          }
        }
      }
      off.putImageData(img, 0, 0);
    }

    // 도트 맵 하나를 화면 어디에 찍을지 계산한다.
    // 숨을 쉬면 br 행이 한 줄 늘거나 줄어서 몸통만 부풀었다 꺼진다 (발은 바닥에 그대로)
    layout(s, p, t, curled) {
      const m = curled ? s.curl : s.map;
      const grow = curled && m.br == null ? 0 : p.sy > 1.012 ? 1 : p.sy < 0.988 ? -1 : 0;
      const x0 = Math.round(G / 2 - m.ax);
      const y0 = Math.round(GROUND - (m.rows.length - 1 + grow) + p.dy);
      const lift = (row) => (m.br != null && row > m.br ? grow : 0); // br 위쪽만 통째로 올라간다
      return {
        s, p, t, m, x0, y0, grow, lift,
        cx: x0 + m.ax, cy: y0 + m.cy + lift(m.cy),
        body: { rx: m.rx, ry: m.ry },
        head: { rx: m.hr, ry: m.hr },
        hx: x0 + m.hx, hy: y0 + m.hy + lift(m.hy) + p.lookY,
        c: this.colors, flash: p.flash > 0.5,
      };
    }

    // 도트로 찍은 몸을 그대로 찍어낸다. 글자 → 털색
    // rows 는 [from, to) 만, cols 는 [a, b] 칸만 찍을 수 있다 (귀·발이 따로 움직일 때 쓴다)
    drawMap(g, rows, dx = 0, dy = 0, squash = true, rowRange = null, cols = null) {
      const { c, flash } = g;
      const map = { O: c.outline, B: c.body, S: c.stripe || c.shade, L: c.light, M: c.belly, P: c.ear, C: c.cheek, E: c.eye };
      // 털색 무늬 (흰 양말·삼색·무지개·반짝이). 손님 고양이(fur)는 자기 mask·tail 이 있을 때만 (GUEST_FURS)
      const F = this.fur ? (this.fur.mask || this.fur.tail ? this.fur : null) : this.furKey ? FURS[this.furKey] : null;
      const isBody = F && rows === g.m.rows;
      const isTail = F && !isBody && rows.length === 1 && g.m.tail && g.m.tail.rows.includes(rows[0]);
      const tj = isTail ? this._tj++ : -1;
      const main = isBody && g.m === this.stageDef().map;
      const now = F && (F.sparkle || F.stars || F.aurora || F.neon || F.holo) ? performance.now() : 0;
      const pick = (ch, i, j, x, y) => {
        // 홀로그램: 캔버스 자리 · 시간으로 칸마다 색을 고른다 (몸 · 꼬리 · 귀 모두)
        if (F && F.holo) {
          const hc = holoColor(ch, x, y, now / 1000);
          if (hc) return hc;
        }
        // 네온: 외곽선 · 줄무늬가 시간에 따라 색을 바꾼다 (몸 · 꼬리 · 귀 모두)
        if (F && F.neon && (ch === 'O' || ch === 'S')) return `hsl(${Math.round((now / 18 + (ch === 'S' ? 120 : 0) + j * 6) % 360)},100%,${ch === 'O' ? 62 : 58}%)`;
        if (!F || ch === 'O' || ch === 'E' || ch === 'C') return map[ch] || c.body;
        if (F.rainbow && (isBody || isTail)) return RAINBOW[isBody ? j % RAINBOW.length : (tj + 3) % RAINBOW.length];
        if (F.aurora && (isBody || isTail)) {
          const w = Math.sin(now / 1400 + j * 0.45 + i * 0.12);
          const lt = { B: 58, S: 50, L: 72, M: 76 }[ch] || 58;
          return `hsl(${Math.round(170 + w * 70)},70%,${lt}%)`;
        }
        const m = main && F.mask ? F.mask(i, j) : isTail && F.tail ? F.tail(tj) : null;
        if (m) return m === 'W' ? c.white : m === 'K' ? c.K : m === 'A' ? c.A : c.body;
        if (isBody && F.stars && (i * 11 + j * 7) % 13 === 0) return (Math.floor(now / 400) + i) % 3 ? c.light : '#ffffff';
        if (isBody && F.sparkle && (i * 5 + j * 9 + Math.floor(now / 300)) % 29 === 0) return F.sparkle;
        return map[ch] || c.body;
      };
      const br = squash ? g.m.br : null;
      // 숨을 쉴 때 br 줄이 한 줄 늘거나 준다
      const times = (j) => (br != null && j === br ? (g.grow > 0 ? 2 : g.grow < 0 ? 0 : 1) : 1);
      const from = rowRange ? rowRange[0] : 0;
      const to = rowRange ? rowRange[1] : rows.length;
      let y0 = g.y0 + dy;
      for (let j = 0; j < from; j++) y0 += times(j); // 건너뛴 줄만큼 아래로 내려놓는다
      // 홀로그램 몸: 먼저 왼쪽에 자홍, 오른쪽에 청록 잔상을 반투명하게 깔고(색 번짐) 그 위에 몸을 찍는다. 3.1초마다 잠깐 지직 어긋난다
      const passes = [[0, null]];
      if (F && F.holo && isBody && !flash) {
        const gl = now % 3100 < 140 ? (Math.floor(now / 25) % 2 ? 2 : -1) : 0;
        passes.unshift([-1 - Math.max(0, gl), 'rgba(255,60,210,0.5)'], [1 + Math.max(0, -gl) + (gl > 0 ? 1 : 0), 'rgba(40,235,255,0.5)']);
      }
      for (const [gx, gc] of passes) {
        let y = y0;
        for (let j = from; j < to; j++) {
          const row = rows[j];
          const a = cols ? cols[0] : 0;
          const b = cols ? Math.min(cols[1], row.length - 1) : row.length - 1;
          for (let k = 0; k < times(j); k++) {
            for (let i = a; i <= b; i++) {
              const ch = row[i];
              if (!ch || ch === '.') continue;
              const x = g.x0 + dx + i;
              if (gc) this.px(x + gx, y, gc, false);
              else this.px(x, y, flash ? P.white : pick(ch, i, j, x, y));
            }
            y++;
          }
        }
      }
    }

    px(x, y, c, solid = true) {
      x = Math.round(x); y = Math.round(y);
      if (x < 0 || y < 0 || x >= G || y >= G) return;
      this.ctx.fillStyle = c;
      this.ctx.fillRect(x, y, 1, 1);
      if (solid && y < this.top) this.top = y;
    }

    rect(x, y, w, h, c) {
      for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) this.px(x + i, y + j, c);
    }

    pattern(rows, x, y, map, solid = true) {
      rows.forEach((row, j) => {
        for (let i = 0; i < row.length; i++) {
          const ch = row[i];
          if (ch !== '.' && map[ch]) this.px(x + i, y + j, map[ch], solid);
        }
      });
    }

    shape(inside, box, fill, outline) {
      const [x0, y0, x1, y1] = box.map(Math.round);
      for (let y = y0 - 1; y <= y1 + 1; y++)
        for (let x = x0 - 1; x <= x1 + 1; x++) {
          if (inside(x, y)) {
            const c = fill(x, y);
            if (c) this.px(x, y, c);
          } else if (outline && (inside(x - 1, y) || inside(x + 1, y) || inside(x, y - 1) || inside(x, y + 1))) {
            this.px(x, y, outline);
          }
        }
    }

    ellipse(cx, cy, rx, ry, fill, outline) {
      this.shape(
        (x, y) => {
          const nx = (x + 0.5 - cx) / rx, ny = (y + 0.5 - cy) / ry;
          return nx * nx + ny * ny <= 1;
        },
        [cx - rx - 2, cy - ry - 2, cx + rx + 2, cy + ry + 2],
        typeof fill === 'function' ? fill : () => fill,
        outline,
      );
    }

    drawShadow(cx, rx, height) {
      const w = Math.max(3, rx * (0.95 - Math.min(height, 8) * 0.05));
      for (let x = Math.round(cx - w); x <= Math.round(cx + w); x++) {
        this.px(x, GROUND + 1, P.shadow, false);
        if (Math.abs(x - cx) < w - 2) this.px(x, GROUND + 2, P.shadow, false);
      }
    }

    // 악세사리·모션 소품이 쓰는 색 (외곽선은 고양이 선 색을 따른다)
    colorsFor(g) {
      if (!this._col || this._col.K !== g.c.outline) this._col = Object.assign({}, PAL, { K: g.c.outline });
      return this._col;
    }

    // ---------- 고양이 ----------

    drawCat(g) {
      const { p, m } = g;
      const an = (this._an = anchorsOf(g));
      const AL = this.accList();
      const mo = this._mo;
      const col = this.colorsFor(g);
      if (p.hide) {
        // 봉투 속에 쏙 들어가 안 보인다. 소품(봉투)만 그린다
        if (mo && mo.M.back) mo.M.back.call(this, g, an, mo.k, mo.at, col);
        if (mo && mo.M.front) mo.M.front.call(this, g, an, mo.k, mo.at, col);
        return;
      }
      if (!g.flash) for (const A of AL) if (A.back) A.back.call(this, g, an, col, g.t);
      if (mo && mo.M.back) mo.M.back.call(this, g, an, mo.k, mo.at, col);
      if (m.tail && !p.noTail) this.drawTail(g);
      if (p.dangle != null && this.held) this.drawHangTail(g);
      this.drawTorso(g);
      if (!g.flash) this.drawFace(g);
      // 코스튬은 몸·얼굴 바로 위에 입힌다. 노트북·밥그릇·모션 소품·앞발은 그 뒤에 그려서 옷에 가려지지 않는다
      if (!g.flash) this.drawAccessory(g);
      // 손님 고양이의 표시 (졸린 눈·불티·볼 빗금 같은 GUEST_FURS 의 mark)
      if (!g.flash && this.fur && this.fur.mark) this.fur.mark.call(this, g, an, g.t);
      // 타자 치는 앞발은 노트북보다 먼저 그린다: 화면 윗변 뒤로 발끝만 빼꼼 보이게
      if (p.prop === 'laptop') {
        this.drawTypingPaws(g);
        this.drawLaptop(g);
      }
      if (mo && mo.M.mid) mo.M.mid.call(this, g, an, mo.k, mo.at, col);
      this.drawFrontPaws(g);
      const C = this.carry && carries()[this.carry];
      if (C) C.call(this, g, an, col, g.t);
      if (p.prop === 'bowl') this.drawBowl(g, false);
      if (p.prop === 'emptyBowl') this.drawBowl(g, true);
      if (p.sweat) this.drawSweat(an, g.t);
      if (mo && mo.M.front) mo.M.front.call(this, g, an, mo.k, mo.at, col);
    }

    // 잘 때: 식빵 굽듯 동그랗게 만 도트 맵으로 갈아탄다
    drawCurled(g) {
      const an = (this._an = anchorsOf(g));
      const mo = this._mo;
      const col = this.colorsFor(g);
      if (!g.flash) for (const A of this.accList()) if (A.back) A.back.call(this, g, an, col, g.t);
      if (mo && mo.M.back) mo.M.back.call(this, g, an, mo.k, mo.at, col);
      this.drawTorso(g);
      if (!g.flash) this.drawFace(g);
      if (!g.flash) this.drawAccessory(g);
      if (mo && mo.M.mid) mo.M.mid.call(this, g, an, mo.k, mo.at, col);
      if (mo && mo.M.front) mo.M.front.call(this, g, an, mo.k, mo.at, col);
    }

    // 몸통·귀·발을 나눠 찍는다.
    //  - 귀는 기분 따라 쫑긋 서거나 눕고, 가만히 있을 때는 한쪽만 씰룩인다
    //  - 걸을 때는 발이 번갈아 한 칸씩 들린다
    drawTorso(g) {
      const { m, p } = g;
      const meta = metaOf(m);
      const er = m.earRows || 0;
      const legRow = m.rows.length - 1;
      const walking = p.step != null && meta.legs.length > 1;

      if (p.dangle != null && meta.legs.length > 1) {
        if (p.scruff) {
          // 목덜미 아래부터 한 줄씩 옆으로 밀어 찍는다. 아래로 갈수록 많이 (머리는 그대로)
          for (let j = er; j < legRow; j++) this.drawMap(g, m.rows, this.scruffDx(p, j, legRow), 0, true, [j, j + 1]);
        } else this.drawMap(g, m.rows, 0, 0, true, [er, legRow]);
        this.drawDangleLegs(g, meta.legs, legRow);
        if (er) this.drawEars(g);
        return;
      }

      this.drawMap(g, m.rows, 0, 0, true, [er, walking ? legRow : m.rows.length]);

      if (walking) {
        meta.legs.forEach((run, i) => {
          // 앞뒤 발이 엇갈리게 — 한쪽이 들리면 반대쪽은 땅을 딛는다
          const up = Math.sin(p.step * Math.PI * 2 + i * Math.PI) > 0.3 ? -1 : 0;
          this.drawMap(g, m.rows, 0, up, true, [legRow, legRow + 1], run);
        });
      }

      if (er) this.drawEars(g);
    }

    drawEars(g) {
      const { m, p } = g;
      const er = m.earRows || 0;
      metaOf(m).ears.forEach((run, side) => {
        const dy = (p.earDy && p.earDy[side]) || 0;
        this.drawMap(g, m.rows, 0, dy, true, [0, er], run);
        // 쫑긋 세우면 귀뿌리가 한 칸 뜨니까 밑줄을 제자리에 한 번 더 채운다
        if (dy < 0) this.drawMap(g, m.rows, 0, 0, true, [er - 1, er], run);
      });
      if (g.s.ear && !g.flash) this.drawEarExtra(g);
    }

    // 귀 모양의 덧칠(흰 귀 끝)과 테두리 위로 올라가는 귀(스라소니 털 · 여우 귀). 귀가 씰룩이면 같이 움직인다
    drawEarExtra(g) {
      const { c, p } = g;
      const E = g.s.ear;
      const curled = g.m === g.s.curl;
      const col = { O: c.outline, B: c.body, C: c.cheek, S: c.stripe || c.shade, W: c.white || '#fffaf3' };
      const dyOf = (x) => ((p.earDy && p.earDy[x < 7 ? 0 : 1]) || 0) - (curled ? 1 : 0);
      for (const [x, y, k] of E.paint || []) if (!(curled && y === 0)) this.px(g.x0 + x, g.y0 + y + dyOf(x), col[k]);
      if (curled || !E.above) return;
      E.above.forEach((l, i) => {
        const row = sym(l);
        const y = i - E.above.length;
        for (let x = 0; x < row.length; x++) if (row[x] !== '.') this.px(g.x0 + x, g.y0 + y + dyOf(x), col[row[x]] || c.outline);
      });
    }

    // 들려서 축 늘어진 뒷발. 평소보다 조금만 길다 (바깥 두 발 2칸, 가운데 1칸).
    // 발끝으로 갈수록 p.dangle 칸만큼 옆으로 밀려서 몸보다 한 박자 늦게 흔들리는 것처럼 보인다
    // 목덜미를 잡혔을 때 j 번째 줄이 옆으로 밀리는 칸 수. 목(7번째 줄) 위는 0, 발끝으로 갈수록 p.scruff 까지
    scruffDx(p, j, legRow) {
      const NECK = 7;
      if (!p.scruff || j < NECK) return 0;
      return Math.round((p.scruff * (j - NECK + 1)) / (legRow - NECK + 1));
    }

    drawDangleLegs(g, legs, legRow) {
      const { p, c, m, flash } = g;
      const O = flash ? P.white : c.outline;
      const B = flash ? P.white : c.body;
      const y0 = g.y0 + legRow + (m.br != null && m.br < legRow ? g.grow : 0);
      const base = p.scruff || 0; // 몸통이 밀린 만큼 발도 같이 간다
      legs.forEach(([a, b], i) => {
        const L = i === 0 || i === legs.length - 1 ? 2 : 1;
        for (let j = 0; j <= L; j++) {
          const dx = base + Math.round((p.dangle * j) / L);
          const y = y0 + j;
          if (j === L) {
            for (let x = a; x <= b; x++) this.px(g.x0 + x + dx, y, O);
            continue;
          }
          this.px(g.x0 + a - 1 + dx, y, O);
          this.px(g.x0 + b + 1 + dx, y, O);
          for (let x = a; x <= b; x++) this.px(g.x0 + x + dx, y, B);
        }
      });
    }

    // 들렸을 때 꼬리. 엉덩이 옆에서 아래로 축 늘어져 뒷발보다 더 늦게 흔들린다
    drawHangTail(g) {
      const { p, c, flash } = g;
      const O = flash ? P.white : c.outline;
      const B = flash ? P.white : c.body;
      const x = g.x0 + 12 + this.scruffDx(p, 9, g.m.rows.length - 1);
      const y0 = g.y0 + 9;
      const L = 7;
      for (let j = 0; j <= L; j++) {
        const dx = Math.round(((p.dangle + (p.scruff || 0) * 0.5) * 1.5 * j * j) / (L * L));
        const y = y0 + j;
        if (j === L) { this.px(x + dx, y, O); this.px(x + 1 + dx, y, O); continue; }
        this.px(x - 1 + dx, y, O);
        this.px(x + 2 + dx, y, O);
        this.px(x + dx, y, j > L - 3 ? c.stripe || B : B);
        this.px(x + 1 + dx, y, j > L - 3 ? c.stripe || B : B);
      }
    }

    // 꼬리는 몸보다 먼저(뒤에) 찍는다.
    // 뿌리는 몸에 붙어 있고 끝으로 갈수록 옆으로 크게 휜다. 줄마다 한 칸씩만 어긋나서 끊기지 않는다.
    // (세로로 밀면 줄끼리 같은 자리에 겹쳐서 꼬리가 뭉개진다. 그래서 휘는 건 가로로만 한다)
    drawTail(g) {
      const { p, t, m } = g;
      const T = m.tail;
      const SPEED = { up: 0, wag: 6.5, flick: 9, slow: 0.8, idle: 1.6 };
      const AMP = { up: 0, wag: 2, flick: 2, slow: 1, idle: 1 };
      const speed = SPEED[p.tail] != null ? SPEED[p.tail] : SPEED.idle;
      const amp = AMP[p.tail] != null ? AMP[p.tail] : AMP.idle;
      const ph = t * speed;
      const swing = p.tail === 'flick' ? (Math.sin(ph) > 0.82 ? -amp : 0) : Math.sin(ph) * amp;
      const rise = p.tail === 'up' ? -1 : p.tail === 'slow' ? 1 : 0; // 꼬리 전체 높이
      const last = Math.max(1, T.rows.length - 1);
      T.rows.forEach((row, j) => {
        const k = 1 - j / last; // 윗줄(꼬리 끝)일수록 1 에 가깝다
        const dx = Math.round(swing * k);
        this.drawMap(g, [row], T.x + dx, T.y + j + rise + g.lift(T.y), false);
      });
    }

    // 얼굴: 점 눈 두 개, 작은 ω 코, 눈 바깥 아래에 볼터치.
    // 모션용 눈(wide x dot star heart wink squint side teary sparkle none)과 입(blep big wavy frown lick grin kiss none),
    // 눈썹(angry sad), 볼터치(blush)가 더 있다
    drawFace(g) {
      const { s, p, c } = g;
      const E = s.eye;
      const fx = Math.round(g.hx + p.lookX);
      const ey = Math.round(g.hy + E.dy);
      const sp = Math.round(E.spread);
      const L = c.lash;
      for (const side of [-1, 1]) {
        const x = side < 0 ? fx - sp - E.w + 1 : fx + sp;
        const wx = side < 0 ? x - 1 : x; // 커지는 눈은 바깥쪽으로 한 칸 넓힌다
        const outer = side < 0 ? x - 1 : x + E.w;
        const inner = side < 0 ? x + E.w : x - 1;
        let kind = p.eyes;
        if (kind === 'wink') kind = side < 0 ? 'open' : 'happy';
        switch (kind) {
          case 'blink':
          case 'half':
            if (E.h === 1) this.rect(side < 0 ? x - 1 : x, ey, E.w + 1, 1, L);
            else this.rect(x, ey + E.h - 1, E.w, 1, L);
            break;
          case 'closed':
            this.px(x, ey + E.h - 2, L);
            this.rect(x, ey + E.h - 1, E.w, 1, L);
            this.px(outer, ey + E.h - 2, L);
            break;
          case 'happy': // ^^
            this.px(outer, ey + E.h - 1, L);
            this.rect(x, ey + E.h - 2, E.w, 1, L);
            break;
          case 'wide':
            this.rect(wx, ey - 1, E.w + 1, E.h + 1, c.eye);
            this.px(side < 0 ? wx + E.w : wx, ey - 1, '#fff');
            break;
          case 'x':
            this.pattern(['X.X', '.X.', 'X.X'], wx, ey - 1, { X: L });
            break;
          case 'dot':
            this.px(side < 0 ? x + E.w - 1 : x, ey + E.h - 1, c.eye);
            break;
          case 'star':
            this.pattern(['.Y.', 'YWY', '.Y.'], wx, ey - 1, { Y: '#ffc93c', W: '#fff' });
            this.px(wx + 1, ey - 2, L);
            break;
          case 'heart':
            this.pattern(['R.R', 'RRR', '.R.'], wx, ey - 1, { R: '#ff4f7a' });
            break;
          case 'squint':
            if (side < 0) this.pattern(['X.', '.X', 'X.'], x, ey - 1, { X: L });
            else this.pattern(['.X', 'X.', '.X'], x, ey - 1, { X: L });
            break;
          case 'side': {
            const dir = p.sideDir || 1;
            this.rect(side < 0 ? x - 1 : x, ey, E.w + 1, 1, L);
            this.px(dir > 0 ? x + E.w - 1 : x, ey + 1, c.eye);
            break;
          }
          case 'teary':
            this.rect(x, ey, E.w, E.h, c.eye);
            this.px(side < 0 ? x : x + E.w - 1, ey, '#fff');
            this.px(outer, ey + E.h, TEAR, false);
            break;
          case 'sparkle':
            this.rect(x, ey, E.w, E.h, c.eye);
            this.px(side < 0 ? x : x + E.w - 1, ey, '#fff');
            this.px(side < 0 ? x + E.w - 1 : x, ey + E.h - 1, '#fff');
            break;
          case 'none':
            break;
          default:
            this.rect(x, ey, E.w, E.h, c.eye);
            if (c.eye !== c.outline) {
              this.px(x, ey, P.white);
              if (E.w >= 2 && E.h >= 2) this.px(x + E.w - 1, ey + E.h - 1, '#6b442e');
            }
        }
        if (p.brow === 'angry') {
          this.px(outer, ey - 3, L);
          this.px(side < 0 ? x : x + 1, ey - 3, L);
          this.px(side < 0 ? x + 1 : x, ey - 2, L);
          this.px(inner, ey - 2, L);
        } else if (p.brow === 'sad') {
          this.px(outer, ey - 2, L);
          this.px(side < 0 ? x : x + 1, ey - 2, L);
          this.px(side < 0 ? x + 1 : x, ey - 3, L);
          this.px(inner, ey - 3, L);
        }
        // 볼터치 — 눈 바깥쪽 한 칸 아래
        if (c.cheek && p.eyes !== 'none') this.px(side < 0 ? x - 2 : x + E.w + 1, ey + E.h, c.cheek, false);
        if (p.blush) {
          this.px(side < 0 ? x - 2 : x + E.w + 1, ey + E.h, BLUSH, false);
          this.px(side < 0 ? x - 3 : x + E.w + 2, ey + E.h, BLUSH, false);
          this.px(side < 0 ? x - 2 : x + E.w + 1, ey + E.h + 1, BLUSH, false);
        }
      }

      // 코와 입 (ω)
      const N = s.nose;
      const my = ey + E.h;
      const nx = fx - Math.floor(N.w / 2);
      const nc = c.nose;
      const smile = () => {
        // .O.  /  OOO  /  O.O
        let y = my;
        if (N.h > 2) this.px(fx, y++, nc);
        this.rect(nx, y, N.w, 1, nc);
        this.px(nx, y + 1, nc);
        this.px(nx + N.w - 1, y + 1, nc);
      };
      const spType = s.species || 'cat';
      if (spType === 'elephant') {
        // 코끼리: 상아 두 개 + 살랑살랑 움직이는 코끼리 코
        const swing = Math.round(Math.sin(g.t * 2.5));
        this.px(fx - 2, my + 1, '#ffffff');
        this.px(fx + 2, my + 1, '#ffffff');
        for (let ty = 0; ty < 4; ty++) {
          const tx = fx + (ty >= 2 ? swing : 0);
          this.px(tx - 1, my + ty, c.outline);
          this.px(tx, my + ty, c.body);
          this.px(tx + 1, my + ty, c.outline);
        }
        return;
      }
      if (spType === 'parrot') {
        // 앵무새: 둥글고 귀여운 황금 주황 부리
        const openB = p.mouth === 'open' || p.mouth === 'o' || p.mouth === 'big';
        this.pattern(openB ? ['.OOO.', 'OYYYO', 'OAAAO', '.OOO.'] : ['.OOO.', 'OYYYO', '.OYO.'], fx - 2, my, { O: c.outline, Y: '#f59e0b', A: TONGUE });
        return;
      }
      switch (p.mouth) {
        case 'open':
          this.rect(nx, my, N.w, 2, nc);
          break;
        case 'o':
          this.rect(nx, my, N.w, 2, nc);
          this.px(fx, my + 1, P.tongue);
          break;
        case 'chew':
          this.rect(nx, my, N.w, 1, nc);
          break;
        case 'flat':
          this.rect(nx + 1, my, N.w - 2, 1, nc);
          break;
        case 'blep':
          smile();
          this.px(fx, my + (N.h > 2 ? 2 : 1), TONGUE);
          break;
        case 'lick':
          smile();
          this.px(fx, my + (N.h > 2 ? 2 : 1), TONGUE);
          this.px(fx, my + (N.h > 2 ? 3 : 2), TONGUE);
          break;
        case 'big':
          this.px(fx, my, nc);
          this.rect(fx - 1, my + 1, 3, 3, nc);
          this.px(fx, my + 2, '#7a2230');
          this.px(fx, my + 3, TONGUE);
          break;
        case 'wavy':
          this.px(fx, my, nc);
          [[-2, 2], [-1, 1], [0, 2], [1, 1], [2, 2]].forEach(([dx, dy]) => this.px(fx + dx, my + dy, nc));
          break;
        case 'frown':
          this.px(fx, my, nc);
          this.px(fx, my + 1, nc);
          this.px(fx - 1, my + 2, nc);
          this.px(fx + 1, my + 2, nc);
          break;
        case 'grin':
          this.px(fx, my, nc);
          this.px(fx - 2, my + 1, nc);
          this.rect(fx - 1, my + 2, 3, 1, nc);
          this.px(fx + 2, my + 1, nc);
          break;
        case 'kiss':
          this.px(fx, my, nc);
          this.px(fx + 1, my + 1, nc);
          this.px(fx, my + 2, nc);
          this.px(fx + 1, my + 2, TONGUE);
          break;
        case 'none':
          this.px(fx, my, nc);
          break;
        default:
          if (spType === 'dog') {
            // 블렌더 3D 입체 주둥이 볼륨 쿠션 (윗면 하이라이트 + 아랫면 음영)
            this.px(fx - 1, my - 1, '#ffffff');
            this.px(fx + 1, my - 1, '#ffffff');
            this.px(fx - 2, my, '#ffffff');
            this.px(fx + 2, my, '#ebe1d1');
            this.px(fx - 1, my + 2, '#e5d9c6');
            this.px(fx + 1, my + 2, '#dfd1bc');
          }
          smile();
          if (spType === 'dog') {
            // 강아지: 광택 나는 3D 까만 콩코 + 해맑은 입체 분홍 혀
            this.px(fx, my - 1, c.outline);
            this.px(fx - 1, my, '#6e5648');
            const pant = Math.floor(g.t * 4.5) % 2;
            this.px(fx, my + 2, '#ff94a2');
            if (pant) this.px(fx, my + 3, TONGUE);
          } else if (spType === 'dino') {
            // 공룡: 귀여운 하얀 아기 송곳니
            this.px(fx - 1, my + 2, '#ffffff');
          } else if (spType === 'python') {
            // 파이톤: 날름거리는 두 갈래 분홍 혀
            if (Math.sin(g.t * 3.8) > 0.25) {
              this.px(fx, my + 2, TONGUE);
              this.px(fx - 1, my + 3, TONGUE);
              this.px(fx + 1, my + 3, TONGUE);
            }
          }
      }
    }

    // 앞발. rest 면 몸에 붙어 있고(도트 맵의 다리), 아니면 자세에 맞게 든다
    drawFrontPaws(g) {
      const { s, p, t, m, c, flash } = g;
      const skin = (v) => (flash ? P.white : v);
      const r = s.paw;
      const an = this._an || anchorsOf(g);
      for (const [i, side] of [-1, 1].entries()) {
        const mode = side < 0 ? p.armL : p.armR;
        if (!mode || mode === 'rest') continue;
        let x = g.hx + side * m.hr * 0.5;
        let y = g.cy;
        switch (mode) {
          case 'type':
          case 'typefast':
            // 앞에서 보면 키보드는 노트북 화면 뒤에 있다. 앞발은 화면에 가려서 안 보인다 (어깨만 들썩인다 — pose 끝부분)
            continue;
          case 'up':
            x = g.hx + side * (m.hr - r * 0.4);
            y = g.hy + 1;
            break;
          case 'wave':
            if (side < 0) continue;
            x = g.hx + m.hr + r * 0.5;
            y = g.hy + 1 + Math.round(Math.sin(t * 16));
            break;
          case 'groom':
            // 얼굴 옆을 위아래로 문지른다
            if (side < 0) continue;
            x = g.hx + m.hr * 0.55;
            y = g.hy + 1 + Math.round(Math.sin(t * 9) * 1.6);
            break;
          case 'hold':
            x = g.hx + side * (r + 0.8);
            y = an.my + 3;
            break;
          case 'cross':
            x = g.hx + side * 1.3;
            y = an.my + 3;
            break;
          case 'front':
            x = g.hx + side * 3.5;
            y = GROUND - 1;
            break;
          case 'claw': {
            const k = (p.claw || [0, 0])[i];
            x = g.hx + side * 2.5;
            // 눈높이까지 쭉 뻗었다가 바닥까지 긁어내린다
            y = Math.round(an.ey - 1 + k * (GROUND - 2 - (an.ey - 1)));
            break;
          }
          case 'knead':
            x = g.hx + side * 3;
            y = GROUND - 1 - ((Math.floor(t * 5) + i) % 2 ? 2 : 0);
            break;
          case 'clap': {
            const k = p.clapK != null ? p.clapK : (Math.sin(t * 14) + 1) / 2;
            x = g.hx + side * (1.8 + k * 3.2);
            y = an.my + 1;
            break;
          }
          case 'lick':
            if (side < 0) continue;
            x = an.fx + 1.5;
            y = an.my + 2;
            break;
          case 'kiss':
            if (side < 0) continue;
            x = an.fx + 0.5;
            y = an.my + 1;
            break;
          case 'out':
            if (side < 0) continue;
            x = g.hx + m.hr + 2.5;
            y = an.ey - 1;
            break;
          case 'cover':
            x = (side < 0 ? an.eyeL : an.eyeR) + an.ew / 2 - 0.5;
            y = an.ey + 1;
            break;
          case 'lift':
            x = g.hx + side * 4.5;
            y = an.top - 1 - (p.liftUp || 0) * 4;
            break;
          case 'point':
            if (side < 0) continue;
            x = g.hx + m.hr + 1.5;
            y = an.top - 1;
            break;
          case 'cheer':
            x = g.hx + side * (m.hr + 0.5);
            y = an.top - 2 + ((Math.floor(t * 6) + i) % 2 ? -1 : 0);
            break;
          case 'float':
            x = g.hx + side * 2.2;
            y = GROUND - 2.5;
            break;
        }
        // 홀로그램 털은 앞발도 몸과 같은 결로 칠한다
        const holo = !flash && !this.fur && this.furKey && FURS[this.furKey].holo;
        const sec = holo ? performance.now() / 1000 : 0;
        if (holo) this.ellipse(x, y, r, r * 0.8, (px, py) => holoColor('B', px, py, sec), holoColor('O', 0, Math.round(y), sec));
        else this.ellipse(x, y, r, r * 0.8, skin(c.body), skin(c.outline));
      }
    }

    // 노트북 뒤에서 투닥투닥: 앞발이 번갈아 올라올 때만 화면 윗변 위로 발끝이 한두 줄 보인다.
    // 박자마다 어느 발이 올라올지 섞어서, 가끔은 둘 다 내려가 있다 (앞발 몸통은 뒤에 그릴 노트북이 가린다)
    drawTypingPaws(g) {
      const { s, p, t, m, c, flash } = g;
      const mode = p.armL;
      if (mode !== 'type' && mode !== 'typefast') return;
      const lidTop = GROUND - 1 - Math.max(4, Math.round(m.ry * 0.5));
      const fast = mode === 'typefast';
      const f = fast ? 16 : 9; // 1초에 몇 번 두드리나 (빠를수록 타닥타닥)
      const beat = Math.floor(t * f);
      const ph = t * f - beat; // 이번 박자 안에서 0→1
      // 박자마다 정해진 무늬: 두 발이 번갈아 가며, 가끔 같은 발로 연타한다
      const pick = (b) => (b * 7 + (b >> 2) * 3) % 5;
      const isUp = (b, i) => {
        const k = pick(b);
        return k === 1 + i || (fast && k === 3) || (k === 4 && i === (b & 1)) || (k === 0 && i === ((b >> 1) & 1));
      };
      const O = flash ? P.white : c.outline;
      const B = flash ? P.white : c.body;
      for (const [i, side] of [-1, 1].entries()) {
        // 두 눈 바깥쪽(볼 자리)에 둬서 눈을 가리지 않는다
        const x = Math.round(g.hx) + (side < 0 ? -6 : 3);
        if (isUp(beat, i)) {
          // 올라온 발: 박자 앞쪽 절반은 한 칸 더 콩 튀어 올랐다가 뒤쪽 절반에 내려앉는다 (화면 윗변 뒤로 발끝만 빼꼼)
          const hop = ph < 0.5 ? 1 : 0;
          this.pattern(['.OO.', 'OLLO', 'OBBO'].slice(0, 2 + hop), x, lidTop - 3 - hop, { O, L: flash ? P.white : c.light, B });
        } else if (isUp(beat - 1, i) && ph < 0.45 && !flash) {
          // 방금 자판을 톡 누른 발: 발 자리 양옆으로 작은 '타닥' 불티가 튄다
          this.px(x - 1, lidTop - 2, '#ffffff', false);
          this.px(x + 4, lidTop - 2, '#ffffff', false);
          this.px(x - 2, lidTop - 3, '#dfe6ea', false);
          this.px(x + 5, lidTop - 3, '#dfe6ea', false);
        }
      }
    }

    drawSweat(an, t) {
      const y = an.top + 1 + (Math.floor(t * 2) % 3);
      this.pattern(['.U.', 'UUU', 'UHU', '.U.'], an.right + 1, y, { U: '#8fd0f5', H: '#fff' }, false);
    }

    // 노트북. 정면이니까 고양이 앞에 가로로 놓이고, 우리는 화면 뒤통수를 본다.
    // 아래쪽 몸을 가려서 "책상에 앉아 일하는" 느낌이 난다
    drawLaptop(g) {
      const { t, m, c } = g;
      const w = Math.max(11, Math.round(m.rx * 1.9));
      const x0 = Math.round(g.cx - w / 2);
      const base = GROUND - 1; // 받침(키보드) 줄
      const lidH = Math.max(4, Math.round(m.ry * 0.5));
      const y0 = base - lidH;

      // 장난감 '고양이 전용 노트북'(p.laptopSkin = 'cat')은 꺼내 둔 모습·잘 때 모습과 같게: 짙은 회색 뚜껑에 민트 고양이 얼굴,
      // 받침은 회색 체크 자판. 평소 일할 때 노트북은 그대로 은색
      const cat = g.p.laptopSkin === 'cat';
      // 화면 뒷판 (3D 메탈릭 베벨 하이라이트 + 입체 셰이딩)
      this.rect(x0 - 1, y0 - 1, w + 2, lidH + 1, P.laptopOutline);
      this.rect(x0, y0, w, lidH - 1, cat ? '#565d69' : P.laptop);
      this.rect(x0, y0, w, 1, cat ? '#788292' : '#d8e2ef');
      this.rect(x0, y0 + 1, 1, Math.max(1, lidH - 2), cat ? '#697282' : '#b8c4d4');
      this.rect(x0 + w - 1, y0 + 1, 1, Math.max(1, lidH - 2), cat ? '#454c59' : '#646f80');
      this.rect(x0, y0 + lidH - 2, w, 1, cat ? '#3f4550' : P.laptopDark);
      if (cat) {
        // 뒷판 가운데 고양이 얼굴 로고 (귀 둘 + 얼굴). 가끔 반짝
        const lx = Math.round(g.cx) - 1;
        const ly = y0 + Math.max(0, Math.round(lidH / 2) - 2);
        const col = Math.floor(t * 1.5) % 4 === 0 ? '#ffffff' : '#9fe3c8';
        this.px(lx - 1, ly, col);
        this.px(lx + 1, ly, col);
        this.rect(lx - 1, ly + 1, 3, 1, col);
      } else {
        const lx = Math.round(g.cx);
        const ly = y0 + Math.round(lidH / 2) - 1;
        this.px(lx - 1, ly, '#bae6fd');
        this.px(lx + 1, ly, '#93c5fd');
        this.px(lx, ly, Math.floor(t * 2) % 2 ? '#ffffff' : '#e0f2fe');
      }

      // 받침
      if (cat) {
        for (let x = x0 - 2; x < x0 + w + 2; x++) this.px(x, base, (x & 1) ? '#9aa0aa' : '#d3cabb');
      } else this.rect(x0 - 2, base, w + 4, 1, P.laptopDark);
      this.rect(x0 - 2, base + 1, w + 4, 1, P.laptopOutline);
    }

    // 밥그릇. 고양이 왼쪽 바닥에 놓는다. 비면 안이 비어 보인다
    drawBowl(g, empty) {
      const x0 = Math.round(g.cx - g.m.rx - 10);
      const y0 = GROUND - 4;
      const map = { O: g.c.outline, C: P.bowlBand, W: P.rice, S: P.bowlShade };
      const rows = empty
        ? ['.O.....O.', 'OSSSSSSSO', 'OCCCCCCCO', '.OCCCCCO.', '..OOOOO..']
        : ['.O.WWW.O.', 'OWWWWWWWO', 'OCCCCCCCO', '.OCCCCCO.', '..OOOOO..'];
      this.pattern(rows, x0, y0, map);
      if (!empty && Math.random() < 0.2) this.spawn('steam', x0 + 4 + rand(-1, 1), y0 - 3, rand(-1, 1), -6, 1.1);
    }

    // ---------- 꾸미기 ----------
    // 그림은 accessories.js 에 있다. front 는 몸 위에, back 은 몸보다 먼저 그린다.
    // ears 가 켜진 모자는 다 그린 뒤 귀를 한 번 더 찍어서 귀가 구멍으로 쏙 나온 것처럼 보이게 한다
    drawAccessory(g) {
      const AL = this.accList();
      if (!AL.length) return;
      const an = this._an || anchorsOf(g);
      const col = this.colorsFor(g);
      // 손에 드는 코스튬(hand: true)은 앞발을 쓰는 동안(타자·밥 먹기·물건 물기·손 흔들기·들려 있을 때…) 잠깐 안 그린다.
      // 세트처럼 일부만 손에 드는 코스튬은 this.pawsBusy 를 보고 그 부분만 뺀다
      const p = g.p;
      const busy = (p.armL && p.armL !== 'rest') || (p.armR && p.armR !== 'rest') || !!p.prop || !!this.carry || !!this.held;
      this.pawsBusy = busy;
      // 뒤쪽 칸(효과·등·목…)부터 앞쪽 칸(머리·손) 순서로 겹쳐 그린다. 귀가 뚫린 모자면 그 위에 귀를 다시 찍는다
      for (const A of AL) {
        if (A.hand && busy) continue;
        if (A.front) A.front.call(this, g, an, col, g.t);
        if (A.ears && g.m.earRows) this.drawEars(g);
      }
      for (const A of AL) if (A.over) A.over.call(this, g, an, col, g.t);
    }

    // ---------- 머리 위 표시 ----------

    drawOverlay({ cx, cy, rx, ry, p, t }) {
      const c = this.colors;
      const top = Math.min(this.top, Math.round(cy - ry));
      if (p.overlay === 'dots') {
        const x0 = Math.round(cx + rx * 0.3);
        const y0 = Math.max(1, top - 8);
        this.shape((x, y) => x >= x0 && x < x0 + 11 && y >= y0 && y < y0 + 5 && !((x === x0 || x === x0 + 10) && (y === y0 || y === y0 + 4)),
          [x0, y0, x0 + 10, y0 + 4], () => P.thought, c.outline);
        const n = Math.floor(t * 3) % 4;
        for (let i = 0; i < 3; i++) if (i < n) this.px(x0 + 2 + i * 3, y0 + 2, c.outline);
        this.px(x0 - 1, y0 + 6, c.outline);
      }
      if (p.overlay === 'bang') {
        const x0 = Math.round(cx + rx * 0.55);
        const y0 = Math.max(1, top - 8 + Math.round(Math.sin(t * 8)));
        this.pattern(['OXO', 'OXO', 'OXO', '.O.', 'OXO', '.O.'], x0 - 1, y0, { X: P.bang, O: c.outline });
      }
    }

    ambient({ cx, cy, rx, ry, p }, dt) {
      this.spawnClock += dt;
      if (this.mood === 'sleeping' && !this.action && !this.loopKey && this.spawnClock > 1.6) {
        this.spawnClock = 0;
        this.spawn(Math.random() < 0.5 ? 'z' : 'zs', cx - rx * 0.5, cy - ry - 2, rand(-5, -2), -5, 2.4);
      }
      if (this.action === 'evolve' && Math.random() < 0.5) {
        this.spawn('sparkle', cx + rand(-rx - 5, rx + 5), cy + rand(-ry - 4, ry), 0, rand(-10, -4), 0.8);
      }
      if (p.mouth === 'open' && this.action === 'wave' && this.spawnClock > 0.9) {
        this.spawnClock = 0;
        this.spawn('note', cx - rx - 3, cy - ry, -4, -8, 1.2);
      }
    }

    drawParticles(dt) {
      const c = this.colors;
      const map = {
        heart: { X: P.heart },
        sparkle: { X: P.spark, W: P.white },
        z: { X: P.z },
        zs: { X: P.z },
        note: { X: c.outline },
      };
      this.particles = this.particles.filter((q) => (q.life -= dt) > 0);
      for (const q of this.particles) {
        q.x += q.vx * dt;
        q.y += q.vy * dt;
        if (q.type === 'sparkle') { q.vx *= 0.94; q.vy *= 0.94; }
        if (q.type === 'z' || q.type === 'zs') q.vx = Math.sin(q.life * 3) * 3;
        this.ctx.globalAlpha = clamp((q.life / q.max) * 1.5, 0, 1);
        if (q.type === 'steam') this.px(q.x, q.y, '#f4f7f8', false);
        else this.pattern(PATTERNS[q.type], Math.round(q.x), Math.round(q.y), map[q.type], false);
        this.ctx.globalAlpha = 1;
      }
    }

    busy() {
      return !!this.action || this.particles.length > 0 || this.fx.length > 0;
    }
  }

  // 동네 친구 고양이 털색 (main/friends.js 의 fur 번호): 먼지(회색 줄무늬) · 연탄이(까망) · 두부(하양) · (호떡은 떠났다) · 최번개(노랑) · 돈돈까스(샴)
  //  팔레트에 더해 mask(i, j)·tail(j) (털색 17종과 같은 규칙: 'W' white · 'K' · 'A' · 'B' 바탕)와
  //  mark(g, a, t) (몸·얼굴·코스튬 위에 찍는 작은 표시, this = PetRenderer, a = 악세사리 기준점)를 가질 수 있다 (2026-09-24 디자인 2차)
  const gPer = (t, every, len) => t % every < len;
  const gAt = (list) => { const s = new Set(list.map(([i, j]) => i + ',' + j)); return (i, j) => s.has(i + ',' + j); };
  // 졸린 눈: 눈 윗줄을 털색으로 덮어 반쯤 감긴 눈
  function guestLids(g, a) {
    for (const x of [a.eyeL, a.eyeR]) for (let i = 0; i < a.ew; i++) this.px(x + i, a.ey, g.c.body);
  }
  const dustStripe = gAt([[2, 8], [3, 9], [12, 8], [11, 9], [2, 4], [12, 4]]);
  const dustFluff = gAt([[6, 9], [7, 9], [8, 9], [5, 10], [6, 10], [7, 10], [8, 10], [9, 10]]);
  const coalEmber = gAt([[4, 1], [10, 1], [4, 2], [10, 2]]);
  const GUEST_FURS = [
    // 먼지: 먼지뭉치. 부스스한 회색 줄무늬, 정수리에 먼지뭉치를 얹고 볼 털이 삐죽, 늘 반쯤 감긴 졸린 눈 (하루 18시간 잔다)
    {
      body: '#b9b6b1', shade: '#9a968f', light: '#d2cfca', belly: '#cfccc6', stripe: '#77736c', outline: '#2a2724', ear: '#b9b6b1', nose: '#2a2724', cheek: '#e8a9a0', eye: '#2a2724', lash: '#2a2724',
      white: '#e6e3de', K: '#6b675f', A: '#f0a050',
      mask: (i, j) => (dustStripe(i, j) ? 'K' : dustFluff(i, j) ? 'W' : null),
      tail: (j) => (j % 2 ? 'K' : null),
      mark(g, a, t) {
        guestLids.call(this, g, a);
        const f = '#e6e3de', o = g.c.outline;
        // 정수리 먼지뭉치 (가끔 살랑)
        this.pattern(['.F.F.', 'FfFfF', '.fFf.'], a.hx - 2 + (gPer(t, 3, 0.4) ? 1 : 0), a.top - 2, { F: f, f: '#c4c0ba' });
        // 볼 옆 삐죽 털
        for (const [x, d] of [[a.left, -1], [a.right, 1]]) {
          this.px(x + d, a.ey + 2, o);
          this.px(x + d * 2, a.ey + 3, o);
          this.px(x + d, a.ey + 3, f);
        }
      },
    },
    // 연탄이: 달아오른 연탄. 까만 털에 귀 안쪽·꼬리 끝·볼이 불씨 주황, 머리 위로 불티가 톡톡 (까만데 뜨거운 남자)
    {
      body: '#302a2a', shade: '#221e1e', light: '#453d3d', belly: '#3a3434', stripe: '#1f1b1b', outline: '#120e0e', ear: '#302a2a', nose: '#120e0e', cheek: '#e8603a', eye: '#ffc23a', lash: '#120e0e',
      white: '#fffaf3', K: '#b8401a', A: '#ff7a2a',
      mask: (i, j) => (coalEmber(i, j) ? 'A' : null),
      tail: (j) => (j === 0 ? 'A' : j === 1 ? 'K' : null),
      mark(g, a, t) {
        // 불티 세 알이 차례로 떠오르며 사라진다
        for (let k = 0; k < 3; k++) {
          const p = (t * 0.9 + k / 3) % 1;
          if (p > 0.75) continue;
          this.px(a.hx + [-5, 6, 1][k] + (Math.floor(p * 6) % 2), a.top - 1 - Math.floor(p * 9), p < 0.4 ? '#ffd65a' : '#ff7a2a', false);
        }
      },
    },
    // 두부: 수줍은 두부. 무늬 없이 새하얗고 분홍 귓속, 늘 발그레한 볼 빗금, 정수리에 한 올, 가끔 식은땀 (낯가림)
    {
      body: '#f7f3ea', shade: '#e2dccf', light: '#ffffff', belly: '#ffffff', stripe: '#e2dccf', outline: '#4a3f36', ear: '#f7c6c6', nose: '#4a3f36', cheek: '#f79aa6', eye: '#4a3f36', lash: '#4a3f36',
      white: '#fffaf3', K: '#2f2a2a', A: '#f7b8c0',
      mask: (i, j) => ((i === 4 || i === 10) && (j === 1 || j === 2) ? 'A' : j === 3 || j === 4 ? 'B' : null),
      mark(g, a, t) {
        const p = '#f58a9c';
        for (const x of [a.eyeL - 1, a.eyeR + a.ew - 1]) {
          this.px(x, a.my + 1, p);
          this.px(x + 1, a.my, p);
        }
        this.pattern(['.O', 'O.', '.O'], a.hx, a.top - 3, { O: g.c.outline });
        if (gPer(t, 4, 0.8)) {
          this.px(a.right + 2, a.top + 1, '#7cc4f2', false);
          this.px(a.right + 2, a.top + 2, '#7cc4f2', false);
        }
      },
    },
    { body: '#f6efe3', shade: '#e3d6c2', light: '#ffffff', belly: '#ffffff', stripe: '#e0893b', outline: '#3a2718', ear: '#3b3434', nose: '#3a2718', cheek: '#f4b3b0', eye: '#3a2718', lash: '#3a2718' },
    // 최번개 (2026-09-25): 노란 정전기 고양이. 샛노란 털에 귀 끝만 까맣고, 볼에 빨간 동그라미.
    // 꼬리 뿌리는 갈색, 이마에 갈색 줄 둘. 가끔 볼에서 파직 불꽃이 튀고 머리 위로 작은 번개가 번쩍
    {
      body: '#ffd84a', shade: '#f0bf2a', light: '#ffe98a', belly: '#ffe27a', stripe: '#b8862a', outline: '#3a2a08', ear: '#ffd84a', nose: '#3a2a08', cheek: '#e8403a', eye: '#2a1a08', lash: '#2a1a08',
      white: '#fffaf3', K: '#2a2018', A: '#9a6a2a',
      mask: (i, j) => (j <= 1 && (i === 3 || i === 4 || i === 10 || i === 11) ? 'K' : j === 3 && (i === 6 || i === 8) ? 'A' : null),
      tail: (j) => (j <= 1 ? 'A' : null),
      mark(g, a, t) {
        const R = '#e8403a';
        // 볼 빨간 동그라미 (2×2)
        for (const x of [a.eyeL - 2, a.eyeR + a.ew]) this.pattern(['RR', 'RR'], x, a.my, { R });
        // 볼에서 파직: 짧게 번쩍이는 불꽃 두 알
        if (gPer(t, 2.6, 0.35)) {
          const f = Math.floor(t * 12) % 2;
          this.px(a.eyeL - 3 - f, a.my - 1 + f, '#fff6a0', false);
          this.px(a.eyeR + a.ew + 2 + f, a.my - 1 + f, '#fff6a0', false);
        }
        // 머리 위 작은 번개 (가끔)
        if (gPer(t, 5, 0.6)) this.pattern(['..Y', '.Y.', 'YYY', '.Y.', 'Y..'], a.hx + 4, a.top - 6, { Y: '#ffe24a' }, false);
      },
    },
    // 돈돈까스 (2026-09-25): 츄르 공장 공장장. 크림색 샴 고양이 (귀·얼굴 가운데·발·꼬리가 초콜릿색, 파란 눈).
    // 목에 굵은 금목걸이, 펜던트 다이아가 가끔 반짝 (코스튬을 입으면 목걸이는 뺀다)
    {
      body: '#f3e6d0', shade: '#e2d0b4', light: '#fbf4e8', belly: '#fbf4e8', stripe: '#e2d0b4', outline: '#2a1a10', ear: '#5a3a26', nose: '#2a1a10', cheek: '#e8b0a8', eye: '#3f8fe0', lash: '#2a1a10',
      white: '#fffaf3', K: '#6a4630', A: '#d9a522',
      mask: (i, j) => (j <= 2 ? 'K' : (j === 6 || j === 7) && i >= 5 && i <= 9 ? 'K' : j === 5 && i >= 6 && i <= 8 ? 'K' : j >= 11 ? 'K' : null),
      tail: (j) => (j === 0 ? null : 'K'),
      mark(g, a, t) {
        if (this.accessories && this.accessories.length) return;
        const G = '#f2c14e', g2 = '#c98f12';
        for (let x = a.hx - 4; x <= a.hx + 4; x++) this.px(x, a.neck, (x + Math.floor(t * 3)) % 3 ? G : g2);
        this.pattern(['.D.', 'DdD', '.D.'], a.hx - 1, a.neck + 1, { D: '#bfe9ff', d: '#ffffff' });
        if (gPer(t, 3.5, 0.3)) this.pattern(['.W.', 'W.W', '.W.'], a.hx + 1, a.neck - 1, { W: '#ffffff' }, false);
      },
    },
  ];

  global.PetSprite = Object.assign(global.PetSprite || {}, {
    PetRenderer,
    GUEST_FURS,
    FURS, // 털색 17종 (옷장의 털색 고르기가 쓴다)
    GRID: G,
    GROUND,
    STAGE, // 도트 지도 자체. 디자인 시안 뷰어가 여기에 후보를 꽂아 본다
    STAGES: Object.keys(STAGE),
    EAR_KEYS: Object.keys(EARS), // 귀 모양 13가지 (옷장 · 첫 실행의 귀 고르기)
    CAT,
    PAL,
    FX, // 효과 종류. 시안 페이지가 새 효과를 여기에 더해 본다
    ACTION_LEN,
    util: { clamp, rand, seg, bump, ease, textWidth, drawText, stamp, dot, anchorsOf, TEAR, TONGUE, BLUSH, GROUND, G },
  });
  global.PetSprite.MOTIONS = global.PetSprite.MOTIONS || {};
  global.PetSprite.ACCESSORIES = global.PetSprite.ACCESSORIES || {};
})(window);
