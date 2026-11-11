// 보물 공방 코스튬 (2026-09-24) B: 몸 5 + 등 2 + 세트 2. 주운 보물을 재료로 만든다. accessories.js 뒤에 읽는다
// 2026-10-17 다시 그림: "너무 안 귀엽다" — 얼룩·티끌·구김 같은 지저분한 결을 빼고, 재료는 알아보게 두면서
// 동글동글한 모양 + 파스텔 사탕 색 + 하트·별·리본으로 다듬었다. 작은 소품은 outlined 로 찍어 외곽선이 고양이 선 색을 따른다
// 고양이는 거의 머리라 입(my) 아래로 몸이 세 줄뿐이다: 목걸이 펜던트는 바닥 줄까지 내려와 앞에 놓이고, 망토는 옷깃처럼 머리 옆으로 솟게 했다
(function (root) {
  const { GROUND, sway, hash, wear, hood, isFace, outlined, star } = root.PetSprite.costumeKit;

  // 파스텔 사탕 색
  const C = {
    W: '#fffaf3', H: '#ffffff', w: '#efe6d6',
    P: '#ff9bb8', p: '#e9779c', Q: '#ffd3df',
    R: '#ff6b6b', r: '#d9474f',
    Y: '#ffe08a', y: '#f2b84b', G: '#ffd23f', g: '#e09a1a', L: '#fff3b0',
    M: '#9fe3c8', m: '#5cbf98',
    B: '#a8d8ff', b: '#6aa8e8',
    V: '#d9c2ff', v: '#a982ec',
    T: '#e8b07a', t: '#b87a44', c: '#8a5530',
  };
  // 빵 봉지 끈을 리본처럼 묶은 매듭 (5×3)
  function tieBow(r, x, y, K, col = C.Y, dk = C.y) {
    outlined(r, ['X...X', 'XXdXX', 'X...X'], x - 2, y - 1, { X: col, d: dk }, K);
  }
  // 딱지 한 장 (5×5): 네 귀퉁이를 접어 대각선이 X 로 보인다. 위아래 u, 양옆 v
  function ddakji(r, x, y, u, v, K) {
    r.pattern(['KUUUK', 'VKUKV', 'VVKVV', 'VKUKV', 'KUUUK'], x, y, { K, U: u, V: v });
  }
  // 구슬 (4×4): 유리알에 민트 소용돌이, 흰 하이라이트
  function marble(r, x, y, K) {
    r.pattern(['.KK.', 'KHMK', 'KmMK', '.KK.'], x, y, { K, H: '#ffffff', M: '#bff0e0', m: '#5cbf98' });
  }
  // 머리 둘레보다 한 칸 크게 씌우는 후드 천 (sets6 와 같은 방식)
  function bigHood(r, a, c, col) {
    const bottom = a.curled ? GROUND - 1 : a.my + 2;
    for (let y = a.top; y <= bottom; y++) {
      r.px(a.left, y, col);
      r.px(a.right, y, col);
      r.px(a.left - 1, y, c.K);
      r.px(a.right + 1, y, c.K);
    }
    for (let x = a.left; x <= a.right; x++) { r.px(x, a.top, col); r.px(x, a.top - 1, c.K); }
    r.px(a.left, a.top - 1, c.K);
    r.px(a.right, a.top - 1, c.K);
  }
  // 망토 자리: 머리 옆에서 옷깃처럼 솟았다가 바깥으로 비스듬히 내려와 바닥에 끌린다.
  // 아랫자락은 물결(wave)을 따라 옆으로 흔들린다. 반환값 inside(x, y) 와 그 줄의 흔들림 shift(y)
  function capeArea(a, t, o) {
    const hw = a.hx - a.left;
    const shift = (y) => {
      const k = y - a.top;
      return k > 3 ? Math.round(Math.sin(t * o.speed - k * 0.6) * o.amp * Math.min(1, (k - 3) / 5)) : 0;
    };
    const topAt = (e) => (e <= 0 ? a.top + 2 : e <= o.collar ? a.top + 2 - e * o.rise : a.top + 2 - o.collar * o.rise + (e - o.collar) * o.fall);
    const inside = (x, y) => {
      if (y > GROUND) return false;
      const dx = x - a.hx;
      const s = shift(y);
      const e = Math.abs(dx - s) - hw;
      const ee = dx - s < 0 ? e : e + o.rightCut;
      return y >= topAt(ee) && (!o.bottom || y <= o.bottom(x, y));
    };
    return { inside, shift, box: [a.left - 20, a.top - 8, a.right + 20, GROUND] };
  }

  const ACC = {
    // ======================= 몸 =======================
    bubblearmor: {
      // 뽁뽁이 갑옷: 몸을 하늘색 뽁뽁이로 감싸고(알마다 하얀 윤기가 나란히), 어깨엔 통통한 뽁뽁이 견갑.
      // 가슴은 빵 봉지 끈을 리본처럼 묶었다. 가끔 어깨 옆에서 한 알이 '뽁' 터지며 하트가 퐁
      front(g, a, c, t) {
        const U = '#d4ecfb', u = '#a9d2ee', H = '#ffffff';
        wear(this, g, a, (dx, dy, x, y, leg) => {
          if (leg) return null;
          if ((x & 1) === 0 && ((y - a.my) & 1) === 0) return H;
          return (x & 1) === 1 && ((y - a.my) & 1) === 1 ? u : U;
        });
        if (a.curled) {
          tieBow(this, a.hx, GROUND - 2, c.K);
          return;
        }
        // 어깨 견갑: 양옆으로 동글한 뽁뽁이 알 (하이라이트 하나씩)
        const m = { U, u, H };
        outlined(this, ['.UU.', 'UHUU', 'UUUu', '.uu.'], a.left - 3, a.my, m, c.K);
        outlined(this, ['.UU.', 'UHUU', 'UUUu', '.uu.'], a.right, a.my, m, c.K);
        tieBow(this, a.hx, a.my + 3, c.K);
        // 뽁! 어깨 옆에서 작은 하트가 퐁 튀어 오른다
        const ph = (t % 2.4) / 2.4;
        if (ph < 0.3) {
          const side = Math.floor(t / 2.4) % 2 ? 1 : -1;
          const x = side < 0 ? a.left - 3 : a.right + 3;
          const yy = a.my - 1 - Math.round(ph * 8);
          this.pattern(['P.P', 'PPP', '.P.'], x - 1, yy, { P: C.P }, false);
        }
      },
    },

    dustscarf: {
      // 먼지 목도리: 소파 밑 먼지 뭉치를 보송보송 솜뭉치처럼 줄줄이 엮어 목에 둘렀다. 가운데 뭉치엔 까만 점 눈이 생겼다 (먼지 요정).
      // 한쪽 끝은 작은 뭉치 두 개가 달랑달랑. 가끔 먼지가 코를 간지럽혀 '에취' 작은 구름이 퐁
      front(g, a, c, t) {
        const D = '#ece8f2', d = '#cdc6d8', H = '#ffffff', E = '#3a3340';
        const ball = (cx, cy, rx, ry) => this.ellipse(cx, cy, rx, ry, (x, y) => (y + 0.5 > cy + ry * 0.4 ? d : x + 0.5 < cx - rx * 0.3 && y + 0.5 < cy ? H : D), c.K);
        const eyes = (cx, cy) => {
          const blink = t % 3.3 < 0.15;
          const x = Math.round(cx), y = Math.round(cy);
          if (blink) { this.px(x - 2, y, d); this.px(x + 1, y, d); } else { this.px(x - 2, y - 1, E); this.px(x + 1, y - 1, E); }
          this.px(x - 3, y, C.P);
          this.px(x + 2, y, C.P);
        };
        if (a.curled) {
          for (const dx of [-6, 6, 0]) ball(a.hx + dx, GROUND - 1.5, 2.6, 1.9);
          eyes(a.hx + 0.5, GROUND - 1.5);
          return;
        }
        const cy = a.my + 2.5;
        // 뒤쪽 뭉치부터 (가운데가 맨 앞)
        ball(a.hx - 5, cy - 0.5, 2.6, 2);
        ball(a.hx + 6, cy - 0.5, 2.6, 2);
        ball(a.hx + 0.5, cy, 3.2, 2.3);
        eyes(a.hx + 0.5, cy);
        // 오른쪽으로 늘어진 끝자락: 작은 뭉치 두 개가 대롱대롱
        const s = sway(t, 2, 1);
        ball(a.right + 3 + Math.round(s * 0.5), a.my + 4.5, 1.7, 1.5);
        // 에취: 3.8초마다 왼쪽으로 작은 구름이 퐁
        const p = (t % 3.8) / 3.8;
        if (p > 0.8) {
          const q = (p - 0.8) / 0.2;
          const x = a.left - 3 - Math.round(q * 3), y = a.my;
          this.ctx.globalAlpha = 1 - q;
          this.pattern(['.DD.', 'DHDD', '.DD.'], x - 2, y - 1, { D, H }, false);
          this.ctx.globalAlpha = 1;
        }
      },
    },

    buttonnecklace: {
      // 짝짝이 단추 목걸이: 금색 빵 봉지 끈에 여기저기서 주운 단추를 꿰었다. 가운데 분홍 하트 단추, 양옆 하늘색·버터색 동글 단추.
      // 색도 모양도 구멍 수도 다 다르다. 가끔 하트 단추가 반짝
      front(g, a, c, t) {
        const K = c.K;
        const btn = (rows, x, y, X, k) => outlined(this, rows, x, y, { X, k, H: C.H }, K);
        const draw = (y) => {
          btn(['HXX.', 'XkkX', '.XX.'], a.hx - 6, y + 1, C.B, C.b);
          btn(['.XXH', 'XkkX', '.XX.'], a.hx + 3, y + 1, C.Y, C.y);
          btn(['XX.XX', 'HkXkX', '.XXX.', '..X..'], a.hx - 2, y + 1, C.P, C.p);
        };
        if (a.curled) {
          draw(GROUND - 4);
          return;
        }
        // 끈: 금색 꼬임이 번갈아
        for (let dx = -6; dx <= 6; dx++) this.px(a.hx + dx, a.my + 1, (dx + 20) % 2 ? C.Y : C.y);
        draw(a.my + 1);
        // 끈 끝 매듭이 목 옆에 리본처럼
        this.px(a.left, a.my + 1, C.Y);
        this.px(a.right, a.my + 1, C.Y);
        if (t % 2.8 < 0.3) star(this, a.hx + 2, a.my + 1, C.H);
      },
    },

    esckeycap: {
      // Esc 키캡 목걸이: 분홍·하늘·버터 코팅 클립을 사탕 목걸이처럼 이은 줄에, 빠진 Esc 키 하나. 도망치고 싶은 날 목에 건다.
      // 키캡은 크림색 윗면에 보라 E 글자, 민트 옆면. 옆엔 작은 하트 참
      front(g, a, c, t) {
        const clips = [C.P, C.B, C.Y];
        const km = { W: C.W, E: '#7a52c8', s: C.v, M: C.M, m: C.m };
        const cap = ['WEEEWW', 'WEEWsW', 'WEEEWW', 'MMMMMm'];
        if (a.curled) {
          outlined(this, cap, a.right + 2, GROUND - 3, km, c.K);
          return;
        }
        const top = a.my + 2;
        const s = Math.round(Math.sin(t * 2) * 0.6);
        const kx = a.hx - 3 + s;
        // 클립 줄: 목 양옆에서 키캡 어깨로. 클립 한 개 = 같은 색 두 칸
        for (const side of [-1, 1]) {
          const pts = side < 0
            ? [[a.left + 1, a.my], [a.left + 2, a.my + 1], [a.left + 3, a.my + 1], [kx, top]]
            : [[a.right - 1, a.my], [a.right - 2, a.my + 1], [a.right - 3, a.my + 1], [kx + 5, top]];
          pts.forEach(([x, y], k) => this.px(x, y, clips[(k + (side > 0 ? 1 : 0)) % clips.length]));
        }
        outlined(this, cap, kx, top, km, c.K);
        // 하트 참
        this.pattern(['R.R', 'RRR', '.R.'], kx + 7, top + 1, { R: C.P });
        // 키캡 윗면에 스치는 빛
        if (t % 3 < 0.25) star(this, kx + 5, top, C.H);
      },
    },

    coinmedal: {
      // 10원짜리 금메달: 분홍·하늘 줄무늬 리본에 반짝반짝 닦은 구리 10원 동전을 달았다. '10' 이 또렷.
      // 본인은 금메달인 줄 안다 (가끔 뿌듯한 반짝)
      front(g, a, c, t) {
        const cm = { X: '#e08a52', d: '#fff1dc' };
        const coin = ['XdXdddX', 'XdXdXdX', 'XdXdddX'];
        if (a.curled) {
          outlined(this, coin, a.right + 2, GROUND - 3, cm, c.K);
          return;
        }
        // 리본: 왼쪽 분홍, 오른쪽 하늘이 목 옆에서 동전으로 모인다 (두 칸 폭, 줄무늬)
        const Rb = [[C.P, C.Q], [C.B, '#e2f2ff']];
        [-1, 1].forEach((s, i) => {
          const [L, D] = Rb[i];
          for (const [dx, dy, col] of [[6, -1, D], [5, -1, L], [5, 0, D], [4, 0, L], [4, 1, D], [3, 1, L]]) this.px(a.hx + s * dx, a.my + dy, col);
        });
        const sw = Math.round(Math.sin(t * 2.2) * 0.5);
        outlined(this, coin, a.hx - 3 + sw, a.my + 2, cm, c.K);
        // 뿌듯한 반짝
        if (t % 3.2 < 0.35) star(this, a.hx + 4 + sw, a.my + 1, C.L);
      },
    },

    // ======================= 등 =======================
    receiptcape: {
      // 영수증 망토: 길쭉한 영수증을 나란히 이어 붙인 크림색 망토. 줄마다 연보라 인쇄 줄, 끝줄은 분홍 '합계' 줄,
      // 머리 옆으로 빳빳이 선 옷깃, 목엔 분홍 하트 클립
      back(g, a, c, t) {
        const paint = (x, y, sh) => {
          const xx = x - sh;
          const u = (xx + 300) % 4;
          if (u === 3) return C.w; // 영수증 사이 이음매
          const k = y - a.top;
          if (y === GROUND - 2 && u !== 2) return C.P; // 합계 줄
          if (k > 2 && k % 3 === 0 && u !== 2) return '#cfc6ee'; // 인쇄 줄
          return C.W;
        };
        if (a.curled) {
          this.ellipse(a.cx - 1, a.cy - 1, 10, 6, (x, y) => paint(x, y + 30, 0), c.K);
          return;
        }
        const area = capeArea(a, t, { speed: 5, amp: 1.2, collar: 2, rise: 1.6, fall: 1.7, rightCut: 2 });
        this.shape(area.inside, area.box, (x, y) => paint(x, y, area.shift(y)), c.K);
      },
      front(g, a, c) {
        if (a.curled) return;
        // 목 앞 여밈: 분홍 하트 클립
        outlined(this, ['P.P', 'PPP', '.P.'], a.hx - 1, a.my + 1, { P: C.P }, c.K);
        this.px(a.hx - 1, a.my + 1, C.H);
      },
    },

    ddakjicape: {
      // 동네 딱지왕 망토: 라일락 망토에 금빛 별 무늬, 금색 단. 동네 애들한테 딴 딱지(분홍·하늘·버터)를 핀으로 꽂았고, 목엔 구슬 걸쇠
      back(g, a, c, t) {
        const V = '#b896ee', v = '#9a76de', Hl = '#dcc8ff', Au = C.G;
        const fill = (x, y, xx, edge) => {
          if (y === GROUND) return Au;
          if (edge) return Hl; // 옷깃·어깨 윗선에 비치는 빛
          if ((xx + 300) % 5 === 2 && (y + 300) % 4 === 1) return C.L; // 금빛 별 무늬
          return (xx + 300) % 5 === 0 ? v : V;
        };
        if (a.curled) {
          this.ellipse(a.cx - 1, a.cy - 1, 10, 6, (x, y) => fill(x, y >= a.cy + 3 ? GROUND : y, x, false), c.K);
          ddakji(this, a.cx - 13, a.cy - 2, C.P, C.b, c.K);
          return;
        }
        const area = capeArea(a, t, { speed: 4, amp: 1, collar: 2, rise: 1.2, fall: 1.5, rightCut: 2 });
        this.shape(area.inside, area.box, (x, y) => fill(x, y, x - area.shift(y), !area.inside(x, y - 1)), c.K);
        // 핀으로 꽂은 딱지: 망토 자락과 같이 흔들린다
        const tiles = [
          [a.left - 9, a.top + 5, C.P, C.b],
          [a.right + 3, a.top + 4, C.Y, '#ff8fb0'],
        ];
        tiles.forEach(([x, y, u, w]) => {
          const s = area.shift(y + 2);
          ddakji(this, x + (x < a.hx ? -s : s), y, u, w, c.K);
          this.px(x + 2 + (x < a.hx ? -s : s), y - 1, C.R); // 핀 머리
        });
      },
      front(g, a, c, t) {
        if (a.curled) return;
        // 목 끈 + 구슬 걸쇠
        this.pattern(['V......V', '.VV..VV.'], a.hx - 4, a.my + 1, { V: '#9a76de' });
        marble(this, a.hx - 2, a.my + 1, c.K);
        if (t % 2.6 < 0.25) star(this, a.hx + 2, a.my + 1, C.H);
      },
    },

    // ======================= 세트 =======================
    cicadasuit: {
      // 여름 한정 매미 허물 슈트: 꿀빛 허물 옷을 통째로 뒤집어썼다. 머리 위엔 동글동글 반짝이는 겹눈 두 개(개구리 모자처럼),
      // 등엔 비치는 민트빛 날개가 파르르. 몸통은 마디 줄무늬, 허리엔 분홍·노랑 젤리 지렁이 벨트와 도토리 버클
      back(g, a, c, t) {
        if (a.curled) return;
        const flap = t % 1.8 < 0.3 && Math.floor(t * 16) % 2 ? 1 : 0;
        const m = { W: 'rgba(214,250,236,0.9)', v: '#ffffff', e: 'rgba(160,226,204,0.95)' };
        const wing = ['WW..', 'WvW.', 'WWvW', 'eWWv', '.eWW'];
        const mir = wing.map((r) => r.split('').reverse().join(''));
        outlined(this, wing, a.left - 4 - flap, a.ey - 2 - flap, m, c.K);
        outlined(this, mir, a.right + 1 + flap, a.ey - 2 - flap, m, c.K);
      },
      front(g, a, c, t) {
        const A = '#f2c27a', S = '#d9a058', Hi = '#fbe2b0';
        hood(this, g, a, (dx, y, x, j) => {
          if (isFace(a, dx, y)) return null;
          if (Math.abs(dx) === 3 && y < a.ey - 1 && j > 1) return Hi;
          return A;
        });
        wear(this, g, a, (dx, dy, x, y, leg) => {
          if (leg) return A;
          if (!a.curled && dy === 0) return Math.abs(dx) % 3 === 1 ? C.Y : C.P; // 젤리 지렁이 벨트
          return (dy + 10) % 2 === 1 ? S : A;
        });
        // 얼굴 둘레 테 (허물 가장자리)
        for (let dx = -4; dx <= 4; dx++) this.px(a.hx + dx, a.ey - 2, S);
        // 겹눈: 머리 위 양쪽에 동글동글 (반짝이는 하이라이트 두 점)
        const eye = { E: '#7a4a26', e: '#4f2d14', H: '#ffffff', h: '#ffe9c8' };
        outlined(this, ['.EE.', 'EHhE', 'EhEE', '.ee.'], a.hx - 6, a.earTop - 2, eye, c.K);
        outlined(this, ['.EE.', 'EhHE', 'EEhE', '.ee.'], a.hx + 3, a.earTop - 2, eye, c.K);
        if (a.curled) return;
        // 도토리 버클
        outlined(this, ['ccc', '.T.'], a.hx - 1, a.my + 3, { c: C.c, T: C.T }, c.K);
        // 여름 햇빛에 허물이 반짝
        if (t % 3 < 0.25) star(this, a.right + 1, a.top + 1, C.H);
      },
    },

    gatekeeper: {
      // 비밀의 문지기: 끝이 뾰족한 밤하늘색 두건과 바닥까지 끌리는 망토(안감은 라일락). 망토엔 금빛 별이 반짝반짝,
      // 두건 끝엔 작은 금별. 가슴엔 짝짝이 구슬 단추와 딱지 배지, 허리 열쇠 꾸러미엔 짝짝이 열쇠들 사이로
      // '어느 문 열쇠인지 모를' 금빛 옛 열쇠가 은은하게 빛나며 짤랑인다. 둘레엔 금빛 먼지가 떠돈다
      back(g, a, c, t) {
        const D = '#3d3a78', d = '#2f2c62', L = '#c9a8ff';
        const twinkle = (x, y) => {
          const h = hash(Math.floor(x / 3) * 7 + Math.floor(y / 3) * 13);
          if (h < 0.85 || (x + 300) % 3 !== 1 || (y + 300) % 3 !== 1) return null;
          return Math.floor(t * 2 + h * 10) % 4 === 0 ? '#ffffff' : C.Y;
        };
        if (a.curled) {
          this.ellipse(a.cx - 1, a.cy - 1, 10.5, 6.5, (x, y) => (x < a.cx - 7 ? L : twinkle(x, y) || D), c.K);
          return;
        }
        const area = capeArea(a, t, { speed: 1.6, amp: 1, collar: 2, rise: 1.2, fall: 1.25, rightCut: 1 });
        this.shape(area.inside, area.box, (x, y) => {
          const xx = x - area.shift(y);
          const dx = x - a.hx;
          // 바깥 자락 끝은 뒤집혀 라일락 안감이 보인다
          if (!area.inside(x + (dx < 0 ? -1 : 1), y)) return L;
          return twinkle(xx, y) || ((xx + 300) % 4 === 1 ? d : D);
        }, c.K);
        // 두건 끝: 귀 사이로 뾰족하게 솟고, 끝에 작은 금별
        this.pattern(['..K..', '.KDK.', 'KDDDK'], a.hx - 2, a.top - 3, { K: c.K, D });
        this.pattern(['.Y.', 'YHY', '.Y.'], a.hx - 1, a.top - 6, { Y: C.G, H: Math.sin(t * 3) > 0 ? '#ffffff' : C.L });
      },
      front(g, a, c, t) {
        const D = '#3d3a78', d = '#2f2c62', Au = C.G;
        hood(this, g, a, (dx, y) => (isFace(a, dx, y) ? null : Math.abs(dx) >= 5 && y > a.ey ? d : D));
        bigHood(this, a, c, D);
        // 얼굴 둘레 금실
        for (let dx = -4; dx <= 4; dx++) this.px(a.hx + dx, a.ey - 2, (dx + 20) % 2 ? C.g : Au);
        wear(this, g, a, (dx, dy, x, y, leg) => {
          if (leg) return d;
          if (dy === 0 && !a.curled) return C.g; // 금빛 허리띠
          return Math.abs(dx) >= 5 ? d : D;
        });
        if (a.curled) {
          outlined(this, ['.YY....', 'YHYYYYY', '.YY..Y.'], a.right + 2, GROUND - 3, { Y: Au, H: C.L }, c.K);
          if (t % 2 < 0.3) star(this, a.right + 9, GROUND - 4, C.L);
          return;
        }
        // 짝짝이 구슬 단추 (색이 다 다르다) + 딱지 배지
        this.px(a.hx + 1, a.my + 1, C.M);
        this.px(a.hx + 1, a.my + 3, C.P);
        this.pattern(['PBP', 'BKB', 'PBP'], a.hx + 3, a.my + 1, { P: C.P, B: C.B, K: c.K });
        // 열쇠 꾸러미: 허리 왼쪽 고리에 매달려 망토 위에서 짤랑. 2.8초마다 크게 흔들린다
        const jingle = t % 2.8 < 0.7;
        const amp = jingle ? 1.2 : 0.4;
        const rs = (i) => Math.round(Math.sin(t * (jingle ? 14 : 3) + i * 2) * amp);
        const rx = a.left - 2, ry = a.my;
        this.pattern(['.g.', 'g.g', '.g.'], rx, ry, { g: '#dde3ec' });
        // 짝짝이 작은 열쇠 셋 (분홍, 민트, 하늘)
        [[0, C.P], [2, C.M], [1, C.B]].forEach(([ox, col], i) => this.pattern(['S', 'S', 'S'], rx + ox + rs(i), ry + 3, { S: col }));
        // 옛 열쇠: 제일 크고 금빛, 고리에서 바깥으로 누워 있다. 숨 쉬듯 은은하게 빛난다
        const glow = 0.5 + 0.5 * Math.sin(t * 2.5);
        const ok = { Y: Au, y: C.g, H: '#fff6c0' };
        const oy = ry + 1 + (jingle && Math.floor(t * 14) % 2 ? 1 : 0);
        const ox = rx - 8;
        for (const [dx, dy] of [[-2, 1], [3, -2], [7, 3], [9, -1]]) this.px(ox + dx, oy + dy, `rgba(255,220,120,${(0.25 + glow * 0.5).toFixed(2)})`, false);
        outlined(this, ['.YY.....', 'YHyYYYYY', 'YyHY.Y.Y', '.YY.....'], ox, oy - 1, ok, c.K);
        if (jingle && Math.floor(t * 10) % 2) star(this, ox - 1, oy - 2, C.L);
        // 주변에 떠도는 금빛 먼지 (비밀스러운 분위기)
        for (let i = 0; i < 3; i++) {
          const p = (t * 0.25 + i / 3) % 1;
          const x = a.left - 4 + Math.round(hash(i * 9 + Math.floor(t * 0.25 + i / 3)) * (a.right - a.left + 8));
          this.px(x, a.my + 2 - Math.round(p * 10), `rgba(255,214,90,${(0.8 * Math.sin(p * Math.PI)).toFixed(2)})`, false);
        }
      },
    },
  };

  Object.assign(root.PetSprite.ACCESSORIES, ACC);
})(window);
