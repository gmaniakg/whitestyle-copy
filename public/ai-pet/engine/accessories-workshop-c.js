// 보물 공방 코스튬 (2026-09-24) C: 손 4 + 효과 3. 주운 보물을 재료로 만든다. accessories.js 뒤에 읽는다
// 손(hand: true)은 오른앞발(heldPaw)로 쥐고, 잘 때(a.curled)는 옆 바닥에 내려놓는다.
// 효과 입자는 solid=false 로 찍고, 펫 창이 투명하니 넓은 면은 칠하지 않는다.
// 2026-10-17 다시 그림: "너무 안 귀엽다" — 재료는 알아보게 두면서 통통한 모양 + 파스텔 사탕 색 + 하트·별로 다듬었다.
// 손 소품은 outlined 로 찍어 외곽선이 고양이 선 색을 따른다
(function (root) {
  const { GROUND, sway, hash, heldPaw, star, outlined } = root.PetSprite.costumeKit;
  const A = (v) => Math.max(0, Math.min(1, v)).toFixed(2);

  // 파스텔 사탕 색
  const P = {
    W: '#fffaf3', w: '#efe6d6', H: '#ffffff', X: '#3a2c34',
    Pk: '#ff9bb8', pk: '#e9779c', Q: '#ffd3df',
    R: '#ff6b6b', r: '#d9474f',
    Y: '#ffe08a', y: '#f2b84b', G: '#ffd23f', g: '#e09a1a', L: '#fff3b0',
    M: '#9fe3c8', m: '#5cbf98',
    B: '#a8d8ff', b: '#6aa8e8',
    V: '#d9c2ff', v: '#a982ec',
    O: '#ffb36b', o: '#ea8a3e',
    T: '#e8b07a', t: '#b87a44', S: '#f6d7a2', s: '#e3b877',
  };
  const HEART = ['X.X', 'XXX', '.X.'];

  // 두 점 사이 도트 줄
  function lineTo(r, x0, y0, x1, y1, col, solid = true) {
    const n = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0), 1);
    for (let i = 0; i <= n; i++) r.px(Math.round(x0 + ((x1 - x0) * i) / n), Math.round(y0 + ((y1 - y0) * i) / n), col, solid);
  }
  // 여러 점을 잇는 도트 경로 (중복 없이)
  function pathPts(pts) {
    const out = [];
    const seen = new Set();
    for (let k = 0; k + 1 < pts.length; k++) {
      const [x0, y0] = pts[k], [x1, y1] = pts[k + 1];
      const n = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0), 1);
      for (let i = 0; i <= n; i++) {
        const x = Math.round(x0 + ((x1 - x0) * i) / n), y = Math.round(y0 + ((y1 - y0) * i) / n);
        const key = x + ',' + y;
        if (seen.has(key)) continue;
        seen.add(key);
        out.push([x, y]);
      }
    }
    return out;
  }

  // ---------- 크레용 낙서 모양 (가운데 0,0 기준 도트 경로) + 다 그리면 채우는 칸 ----------
  const DOODLES = (() => {
    const starV = [];
    for (let i = 0; i <= 10; i++) {
      const ang = -Math.PI / 2 + (i * Math.PI) / 5;
      const rr = i % 2 ? 1.7 : 4;
      starV.push([Math.round(Math.cos(ang) * rr), Math.round(Math.sin(ang) * rr)]);
    }
    const sun = [];
    for (let k = 0; k <= 12; k++) {
      const ang = (k / 12) * Math.PI * 2;
      sun.push([Math.round(Math.cos(ang) * 2), Math.round(Math.sin(ang) * 2)]);
    }
    const sunPts = pathPts(sun);
    for (let k = 0; k < 8; k++) {
      const ang = (k / 8) * Math.PI * 2;
      const [x0, y0, x1, y1] = [Math.cos(ang) * 3.3, Math.sin(ang) * 3.3, Math.cos(ang) * 4.4, Math.sin(ang) * 4.4].map(Math.round);
      for (const p of pathPts([[x0, y0], [x1, y1]])) sunPts.push(p);
    }
    const heart = pathPts([[0, 2], [-2, 0], [-2, -1], [-1, -2], [0, -1], [1, -2], [2, -1], [2, 0], [0, 2]]);
    // 무지개: 세 줄 반원
    const rainbow = [];
    for (const rr of [4, 3, 2]) for (let k = 0; k <= 8; k++) {
      const ang = Math.PI + (k / 8) * Math.PI;
      rainbow.push([Math.round(Math.cos(ang) * rr), Math.round(Math.sin(ang) * rr * 0.8)]);
    }
    return {
      star: { pts: pathPts(starV), fill: [[0, 0], [-1, 0], [1, 0], [0, -1], [0, -2], [0, 1], [-1, 1], [1, 1]] },
      // 뭉게구름: 위가 봉긋봉긋
      cloud: {
        pts: pathPts([[-3, 1], [-4, 0], [-3, -1], [-2, -2], [-1, -1], [0, -2], [1, -2], [2, -1], [3, -1], [4, 0], [3, 1], [-3, 1]]),
        fill: [[-3, 0], [-2, 0], [-1, 0], [0, 0], [1, 0], [2, 0], [3, 0], [-2, -1], [0, -1], [1, -1], [2, -1]].filter(([x, y]) => !(x === 2 && y === -1)),
      },
      sun: { pts: sunPts, fill: [[-1, -1], [0, -1], [1, -1], [-1, 0], [0, 0], [1, 0], [-1, 1], [0, 1], [1, 1]], face: [[-1, 0], [1, 0]] },
      heart: { pts: heart, fill: [[-1, -1], [1, -1], [-1, 0], [0, 0], [1, 0], [0, 1]] },
      rainbow: { pts: rainbow, band: true },
    };
  })();

  const ACC = {
    // ================= 손 =================

    // 1. 고무줄 새총: 둥지 짓다 만 나뭇가지 Y자(새순 하나) + 분홍 고무줄, 손잡이엔 민트 고무줄을 칭칭.
    //    가끔 고무줄을 쭉 당겼다가 작은 하트를 퉁
    rubberslingshot: {
      hand: true,
      front(g, a, c, t) {
        const m = { X: P.T, x: P.t, h: '#f6cf9c', M: P.M, m: P.m, N: '#a8e098' };
        if (a.curled) {
          // 옆으로 눕힌 Y자, 고무줄은 끝에 느슨하게
          outlined(this, ['......X', '....hX.', 'XMmMx..', '....xX.', '......X'], a.right + 2, GROUND - 4, m, c.K);
          for (let y = GROUND - 3; y <= GROUND - 1; y++) this.px(a.right + 8, y, y === GROUND - 2 ? P.pk : P.Pk);
          return;
        }
        const x = a.right + 3, y0 = a.cy - 11;
        // 가지: 두 갈래 + 줄기 (손잡이엔 민트 고무줄)
        outlined(this, ['h...X', 'X...x', '.X.x.', '..X..', '..M..', '..m..', '..M..', '..x..'], x - 2, y0, m, c.K);
        // 왼쪽 갈래의 새순
        this.pattern(['N.', '.N'], x - 5, y0 + 1, { N: m.N });
        // 당기기: 3.2초에 한 번 (0~0.9 당김, 0.9~ 퉁)
        const ph = t % 3.2;
        const L = [x - 2, y0], Rt = [x + 2, y0];
        if (ph < 0.9) {
          const k = Math.min(1, ph / 0.6);
          const px = Math.round(x - k * 1.5), py = Math.round(y0 + 1 + k * 4);
          lineTo(this, L[0], L[1], px, py, P.Pk);
          lineTo(this, Rt[0], Rt[1], px, py, P.Pk);
          // 걸어 둔 하트 알
          this.pattern(HEART, px - 1, py - 1, { X: P.R });
        } else {
          const wob = ph < 1.3 ? (Math.floor(t * 20) % 2 ? 1 : 0) : 0;
          for (let i = L[0] + 1; i < Rt[0]; i++) this.px(i, y0 + (i === x ? wob : 0), P.Pk);
          // 날아가는 하트
          if (ph < 1.9) {
            const q = (ph - 0.9) / 1;
            const bx = Math.round(x + 1 + q * 8), by = Math.round(y0 - 2 - q * 7 + q * q * 3);
            this.ctx.globalAlpha = 1 - q * 0.6;
            this.pattern(HEART, bx - 1, by - 1, { X: P.R }, false);
            this.ctx.globalAlpha = 1;
            if (q < 0.4) this.px(bx - 3, by + 2, P.Q, false);
          }
        }
        heldPaw(this, g, x, a.cy + 1);
      },
    },

    // 2. 이쑤시개 레이피어: 이쑤시개 칼날 끝엔 분홍 하트 깃발(칵테일 픽처럼), 클립을 구부린 하늘색 날밑,
    //    반창고를 둘둘 감은 손잡이. 가끔 휙 찌르면 칼끝에 별이 반짝
    toothpickrapier: {
      hand: true,
      front(g, a, c, t) {
        const m = { T: P.S, t: P.s, B: P.B, b: P.b, A: '#f6c9a8', a: '#ffe4cf', p: '#d9a08a', F: P.Pk, f: P.pk, H: P.H };
        if (a.curled) {
          const y = GROUND - 2;
          outlined(this, ['..B..........', 'AaABTTTTTTTTt', '..B......FF..'], a.right + 2, y - 1, m, c.K);
          return;
        }
        const ph = t % 2.6;
        const lunge = ph < 0.4;
        const x = a.right + 2 + (lunge ? 1 : 0);
        const base = a.cy - 3 - (lunge ? 2 : 0);
        // 칼날 (위로 곧게) + 하트 깃발
        outlined(this, ['t', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T'], x, base - 11, m, c.K);
        outlined(this, ['FF.', 'FHF', 'Ff.'], x + 1, base - 9 + (Math.floor(t * 3) % 2), m, c.K);
        // 날밑: 펴서 구부린 클립 (하늘색 코팅)
        outlined(this, ['BBBBB', 'b...b'], x - 2, base - 1, m, c.K);
        // 반창고 손잡이 (가운데 패드, 숨구멍 점)
        outlined(this, ['A', 'a', 'p', 'A'], x, base + 1, m, c.K);
        heldPaw(this, g, x, a.cy + 1);
        if (lunge) {
          star(this, x, base - 13, P.L);
          for (let i = 0; i < 3; i++) this.px(x - 2, base - 3 - i * 3, 'rgba(255,255,255,0.7)', false);
        } else if (ph > 2.2) {
          this.px(x, base - 11, P.H, false);
        }
      },
    },

    // 3. 짝짝이 양말 인형: 짝 잃은 크림색 양말(분홍 줄무늬, 민트 발끝)에 굴러다니던 눈알 두 개(짝짝이 크기)와 분홍 리본.
    //    앞발에 끼고 뻐끔뻐끔, 혀가 빼꼼
    socksock: {
      hand: true,
      front(g, a, c, t) {
        const m = { K: c.K, W: P.W, w: P.w, M: P.M, P: P.Pk, d: '#c85a7a', p: '#ff8fb0' };
        const googly = (x, y, big, off) => {
          if (big) {
            this.pattern(['.KKK.', 'KHHHK', 'KHHHK', 'KHHHK', '.KKK.'], x, y, { K: c.K, H: P.H });
            this.px(x + 2 + off[0], y + 2 + off[1], P.X);
          } else {
            this.pattern(['KKKK', 'KHHK', 'KHHK', 'KKKK'], x, y, { K: c.K, H: P.H });
            this.px(x + 1 + (off[0] > 0 ? 1 : 0), y + 1 + (off[1] > 0 ? 1 : 0), P.X);
          }
        };
        const wob = (k) => {
          const n = Math.floor(t * 3 + k * 7);
          return [Math.round((hash(n) - 0.5) * 2.2), Math.round((hash(n + 11) - 0.5) * 2.2)];
        };
        if (a.curled) {
          // 옆에 벌러덩 누워 같이 잔다 (눈은 감았다)
          const x0 = a.right + 1, y0 = GROUND - 4;
          this.pattern(['.KKKKKKKKKK.', 'KPWPWWWWWWMK', 'KPWPWWWWWWMK', '.KKKKKKKKKK.'], x0, y0, m);
          this.pattern(['KK.KK'], x0 + 5, y0 + 1, { K: c.K });
          outlined(this, ['P.P', '.P.'], x0 + 9, y0 - 2, { P: P.Pk }, c.K);
          return;
        }
        // 3초 중 1.6초 동안 떠든다
        const talking = t % 3 < 1.6;
        const open = talking && Math.floor(t * 5) % 2 === 0;
        const bob = talking ? 0 : sway(t, 2, 1) > 0 ? -1 : 0;
        const x0 = a.right - 1, yb = a.cy + 3;
        const upper = ['..KKKKK...', '.KMMMMMK..', 'KWWWWWWWK.', 'KWWWWWWWWK'];
        const lower = open
          ? ['KWWWWWKKKK', 'KWWWWKdddd', 'KWWWWKpppK', 'KWWWWWKKKK', '.KWWWWWWK.']
          : ['KWWWWWKKKK', 'KWWWWWWWWK', '.KWWWWWWK.'];
        const body = ['..KWWwWK..', '..KPPPPK..', '..KWWWWK..', '..KPPPPK..', '..KKKKKK..'];
        const rows = [...upper, ...lower, ...body];
        const y0 = yb - rows.length + 1 + bob;
        this.pattern(rows, x0, y0, m);
        // 뒤꿈치 구멍으로 앞발 털이 빼꼼
        this.px(x0 + 3, y0 + upper.length + lower.length, g.c.body);
        googly(x0 + 1, y0 + 1, true, wob(1));
        googly(x0 + 5, y0 + 2, false, wob(2));
        // 정수리 분홍 리본 + 볼터치
        outlined(this, ['PP.PP', 'PPpPP'], x0 + 2, y0 - 2, { P: P.Pk, p: P.pk }, c.K);
        this.px(x0 + 8, y0 + 4, P.Pk);
      },
    },

    // 4. 다음 주엔 된다 복권 부채: 꽝 복권(버터색에 알록달록 로또 공)과 영수증을 번갈아 접어 금빛 테를 두른 부채.
    //    사북은 분홍 하트 클립. 살랑살랑 부치면 윤이 스치고 반짝이가 맴돈다
    lotteryfan: {
      hand: true,
      front(g, a, c, t) {
        const N = 5;
        const balls = [P.R, P.b, P.m, P.v, P.o];
        const fan = (px, py, off, spread, R) => {
          const slipW = (spread * 2) / N;
          const shine = (t % 2.5) / 2.5 * (N + 2) - 1; // 윤이 지나가는 살 번호
          this.shape(
            (x, y) => {
              const dx = x + 0.5 - px, dy = y + 0.5 - py;
              const rr = Math.hypot(dx, dy);
              const ang = Math.atan2(dx, -dy) - off;
              return rr <= R && rr >= 2.2 && Math.abs(ang) <= spread && dy < 1;
            },
            [px - R - 1, py - R - 1, px + R + 1, py + 1],
            (x, y) => {
              const dx = x + 0.5 - px, dy = y + 0.5 - py;
              const rr = Math.hypot(dx, dy);
              const ang = Math.atan2(dx, -dy) - off + spread;
              const k = Math.min(N - 1, Math.floor(ang / slipW));
              const u = ang / slipW - k;
              if (rr > R - 1.1) return Math.abs(k - shine) < 0.6 ? P.H : P.G; // 금빛 테
              if (u < 0.16) return '#e6c98a'; // 접힌 선
              const ri = Math.round(rr);
              if (k % 2 === 0) {
                // 복권: 알록달록 로또 공
                if ((ri === 5 || ri === 7) && u > 0.35 && u < 0.85) return balls[(k + ri) % balls.length];
                return Math.abs(k - shine) < 0.6 ? P.L : P.Y;
              }
              // 영수증: 연보라 글줄
              if ((ri === 4 || ri === 6) && u > 0.3 && u < 0.9) return P.V;
              return P.W;
            },
            c.K,
          );
          // 사북: 분홍 하트 클립
          this.pattern(HEART, px - 1, py - 1, { X: P.Pk });
        };
        if (a.curled) {
          // 접은 부채를 바닥에 눕혀 둔다
          outlined(this, ['GYYYWYYYWG', 'PYRYWYbYWG'], a.right + 2, GROUND - 2, { G: P.G, Y: P.Y, W: P.W, R: P.R, b: P.b, P: P.Pk }, c.K);
          return;
        }
        const px = a.right + 2, py = a.cy - 1;
        const off = 0.25 + Math.sin(t * 3) * 0.28;
        fan(px, py, off, 0.95, 9.2);
        heldPaw(this, g, px - 1, a.cy + 1);
        // 부칠 때 바람에 하트가 퐁 (왼쪽으로 크게 넘어갈 때)
        const v = Math.cos(t * 3);
        if (v < -0.6) this.pattern(HEART, a.left - 5, a.earTop - 4 - Math.round((v + 0.6) * 5), { X: 'rgba(255,155,184,0.85)' }, false);
        // 반짝이가 부채 끝을 따라 맴돈다 ("다음 주엔 된다")
        const k = Math.floor(t * 3) % 3;
        const ang = off - 0.6 + k * 0.6;
        star(this, Math.round(px + Math.sin(ang) * 11), Math.round(py - Math.cos(ang) * 11), P.L);
      },
    },

    // ================= 효과 =================

    // 5. 사탕 껍질 반짝이: 파스텔 사탕(양쪽 비틀린 껍질)이 빙글 돌며 살랑살랑 내려오고, 사이사이 별이 반짝.
    //    바닥엔 과자 부스러기 몇 톨
    candysparkle: {
      front(g, a, c, t) {
        const cols = [[P.Pk, P.pk], [P.M, P.m], [P.Y, P.y], [P.V, P.v], [P.B, P.b], [P.O, P.o]];
        const lanes = [a.left - 7, a.left - 3, a.hx - 4, a.hx + 4, a.right + 3, a.right + 7];
        for (let i = 0; i < cols.length; i++) {
          const span = GROUND - a.earTop + 12;
          const sp = 2.6 + hash(i + 4) * 1.8;
          const yy = ((t * sp + hash(i) * span) % span) + a.earTop - 10;
          const x = Math.round(lanes[i] + Math.sin(t * 1.5 + i * 1.9) * 1.5);
          const y = Math.round(yy);
          // 얼굴 위는 지나가지 않는다
          if (x > a.left - 2 && x < a.right + 2 && y > a.top - 2) continue;
          const [col, dk] = cols[i];
          // 빙글: 하이라이트가 왼쪽 ↔ 오른쪽으로 옮겨 가고 껍질 끝이 위아래로 팔랑
          const turn = Math.floor(t * 2.5 + i * 1.3) % 2;
          this.ctx.globalAlpha = y > GROUND - 4 ? +A((GROUND - y) / 4) : 1;
          this.pattern(turn ? ['X.O..', 'XOHOX', '..O.X'] : ['..O.X', 'XOOHX', 'X.O..'], x - 2, y - 1, { X: col, O: dk, H: '#ffffff' }, false);
          this.ctx.globalAlpha = 1;
        }
        // 사이사이 반짝이는 별
        for (let i = 0; i < 3; i++) {
          const p = (t * 0.7 + i / 3) % 1;
          if (p > 0.35) continue;
          const n = Math.floor(t * 0.7 + i / 3);
          const sx = a.hx + Math.round((hash(n * 5 + i) - 0.5) * 30);
          const sy = a.earTop - 8 + Math.round(hash(n * 7 + i) * 10);
          if (sx > a.left - 2 && sx < a.right + 2 && sy > a.top - 2) continue;
          star(this, sx, sy, P.L);
        }
        // 바닥 부스러기
        for (const [x, big] of [[a.left - 4, 0], [a.right + 2, 1], [a.right + 6, 0], [a.left - 1, 1]]) {
          this.px(x, GROUND, P.T, false);
          if (big) this.px(x + 1, GROUND, P.t, false);
        }
      },
    },

    // 6. 크레용 낙서: 부러진 크레용으로 별·해님·구름·하트·무지개가 한 획씩 그려지고, 다 그리면 속을 칠했다가 사라진다.
    //    웃는 얼굴을 그린 분홍 포스트잇 한 장이 허공에 붙어 팔랑
    crayondoodle: {
      front(g, a, c, t) {
        const slots = [
          { k: 'sun', x: a.left - 4, y: a.earTop - 6, col: P.o, lite: P.Y },
          { k: 'star', x: a.right + 4, y: a.earTop - 7, col: P.b, lite: P.B },
          { k: 'cloud', x: a.left - 6, y: a.cy + 1, col: P.v, lite: '#f3ecff' },
          { k: 'heart', x: a.right + 7, y: a.cy - 2, col: P.r, lite: P.Pk },
          { k: 'rainbow', x: a.hx + 8, y: a.earTop - 13, col: P.R, lite: null },
        ];
        const RB = [P.R, P.Y, P.B];
        const PER = 6.5;
        slots.forEach((s, i) => {
          const tt = t + i * 1.3;
          const p = (tt % PER) / PER;
          const D = DOODLES[s.k];
          const pts = D.pts;
          let n = pts.length, al = 1;
          if (p < 0.35) n = Math.max(1, Math.floor((p / 0.35) * pts.length));
          else if (p > 0.85) al = (1 - p) / 0.15;
          this.ctx.globalAlpha = al;
          // 다 그리면 속을 연한 색으로 칠한다
          if (p >= 0.4 && D.fill) for (const [dx, dy] of D.fill) this.px(s.x + dx, s.y + dy, s.lite, false);
          if (p >= 0.4 && D.face) for (const [dx, dy] of D.face) this.px(s.x + dx, s.y + dy, s.col, false);
          for (let j = 0; j < n; j++) {
            const [dx, dy] = pts[j];
            this.px(s.x + dx, s.y + dy, D.band ? RB[Math.floor((j * 3) / pts.length)] : s.col, false);
          }
          this.ctx.globalAlpha = 1;
          // 그리는 중이면 끝에 크레용 토막 (색 심 + 흰 종이 띠)
          if (p < 0.35) {
            const [dx, dy] = pts[n - 1];
            this.px(s.x + dx + 1, s.y + dy - 1, s.col, false);
            this.px(s.x + dx + 2, s.y + dy - 2, '#fffaf3', false);
            this.px(s.x + dx + 3, s.y + dy - 3, s.col, false);
          }
        });
        // 포스트잇: 머리 위 허공에 붙어서 살짝 팔랑. 웃는 얼굴 낙서
        const flap = Math.floor(t * 1.5) % 4 === 0;
        const px = a.hx - 8, py = a.earTop - 15 + (Math.floor(t * 0.8) % 2);
        this.pattern(
          ['PPPPPP', 'PbPPbP', 'PPPPPP', 'PbPPbP', 'PPbbPP', flap ? 'PPPPp.' : 'PPPPPp'],
          px, py, { P: P.Q, p: P.Pk, b: P.pk }, false,
        );
      },
    },

    // 7. 찌릿찌릿 정전기: 털끝마다 노란 번개 모양 스파크가 톡톡 튀고, 가끔 귀 사이로 큰 번개가 친다.
    //    정전기에 끌려온 분홍 코팅 클립이 볼 옆에 붙어 달달 떨고, 발치엔 다 쓴 민트 건전지가 쿨쿨 잔다
    staticshock: {
      front(g, a, c, t) {
        const Yc = '#ffe65a', Wc = '#fffbe0';
        const BOLT = ['..Y', '.Y.', 'YWY', '.Y.', 'Y..'];
        const tips = [
          [a.left - 2, a.earTop - 1], [a.right + 2, a.earTop - 1],
          [a.left - 3, a.top + 4], [a.right + 3, a.top + 4],
          [a.hx, a.earTop - 4],
        ];
        const tick = Math.floor(t * 4);
        tips.forEach(([x, y], i) => {
          // 쭈뼛 선 잔털 (옅게)
          if (i < 2) this.px(x + (i ? -2 : 2), y + 1, 'rgba(255,245,200,0.6)', false);
          if (hash(tick * 3 + i * 17) > 0.55) this.pattern(BOLT, x - 1, y - 2, { Y: Yc, W: Wc }, false);
        });
        // 큰 번개: 2.7초마다 귀 끝과 귀 끝 사이가 번쩍
        const ph = t % 2.7;
        if (ph < 0.35) {
          const L = [a.left + 1, a.earTop - 2], Rt = [a.right - 1, a.earTop - 2];
          const n = Rt[0] - L[0];
          for (let i = 0; i <= n; i++) {
            const zig = Math.floor(i / 2) % 2 ? -1 : 0;
            this.px(L[0] + i, L[1] - 2 + zig - Math.round(Math.sin((i / n) * Math.PI) * 2), ph < 0.12 ? Wc : Yc, false);
          }
          star(this, L[0], L[1], Yc);
          star(this, Rt[0], Rt[1], Yc);
        }
        // 분홍 코팅 클립: 오른쪽 볼 옆에 붙어서 달달 떨고, 큰 번개 때 튕긴다
        const jump = ph < 0.35 ? -2 : 0;
        const jit = Math.floor(t * 12) % 2;
        const cx = a.right + 3 + (jit && ph < 1 ? 1 : 0), cy = a.ey - 3 + jump;
        this.pattern(['.pp.', 'pQQp', 'p.Qp', 'pQ.p', 'pQp.', '.p..'], cx, cy, { p: P.pk, Q: P.Q }, false);
        // 다 쓴 건전지: 발치에 누워 쿨쿨 (감은 눈 두 줄), 가끔 +극이 찌릿
        const bx = a.left - 8, by = GROUND - 2;
        outlined(this, ['MMMMMs', 'MXMXMs'], bx, by, { M: P.M, X: P.m, s: '#c8ccd4' }, c.K);
        if (hash(tick + 99) > 0.7) this.px(bx + 7, by - 1, Yc, false);
        else if (t % 2 < 1) this.px(bx + 1, by - 3, 'rgba(255,255,255,0.8)', false);
      },
    },
  };

  Object.assign(root.PetSprite.ACCESSORIES, ACC);
})(window);
