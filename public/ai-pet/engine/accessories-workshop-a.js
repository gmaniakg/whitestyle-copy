// 보물 공방 코스튬 (2026-09-24) A: 머리 6 + 얼굴 2. 주운 보물을 재료로 만든다. accessories.js 뒤에 읽는다
// 2026-10-17 다시 그림: "너무 안 귀엽다" — 꼬질꼬질한 잡동사니 느낌을 빼고, 어느 보물로 만들었는지는 그대로 보이게 하면서
// 둥글고 통통한 모양 + 파스텔 사탕 색 + 하트·반짝이로 다듬었다. 그림은 outlined 로 찍어서 외곽선이 고양이 선 색을 따른다
(function (root) {
  const { sway, star, outlined } = root.PetSprite.costumeKit;
  // 파스텔 사탕 색. 진한 색 한두 개(R·G)만 포인트로 쓴다
  const C = {
    W: '#fffaf3', H: '#ffffff', X: '#4a2c2a',
    P: '#ff9bb8', p: '#e9779c', Q: '#ffd3df',
    R: '#ff6b6b', r: '#d9474f',
    Y: '#ffe08a', y: '#f2b84b',
    G: '#ffd23f', g: '#e09a1a', L: '#fff3b0',
    M: '#9fe3c8', m: '#5cbf98',
    B: '#a8d8ff', b: '#6aa8e8',
    V: '#d9c2ff', v: '#a982ec',
    O: '#ffb36b', o: '#ea8a3e',
    T: '#e8b07a', t: '#b87a44', c: '#8a5530',
    S: '#dde3ec', s: '#a3adbd', D: '#6a7486',
  };
  // 정면에서 본 병뚜껑: 위아래 톱니 주름이 외곽선에 오돌토돌 보인다. 가운데 하트(큰 것) / 반짝 점(작은 것)
  const CAP_BIG = ['.X.X.X.', 'XXXXXXX', 'XXhXhXX', 'XXhhhXX', 'XXXhXXX', 'dXXXXXd', '.d.d.d.'];
  const CAP_SMALL = ['.X.X.', 'XXXXX', 'XhXXX', 'dXXXd', '.d.d.'];
  const cap = (r, rows, x, y, K, X, d, h) => outlined(r, rows, x, y, { X, d, h }, K);
  // 줄마다 dx 만큼 밀어 찍고(휜 깃털 같은 것) 둘레에 외곽선을 두른다. 외곽선이 밀린 모양을 그대로 따라간다
  function sheared(r, rows, x, y, map, dxs, K) {
    const m = new Map();
    let x0 = 1e9, x1 = -1e9;
    rows.forEach((row, j) => {
      for (let i = 0; i < row.length; i++) {
        if (row[i] === '.') continue;
        const xx = x + i + (dxs[j] || 0);
        m.set(xx + ',' + (y + j), map[row[i]]);
        x0 = Math.min(x0, xx); x1 = Math.max(x1, xx);
      }
    });
    r.shape((xx, yy) => m.has(xx + ',' + yy), [x0, y, x1, y + rows.length - 1], (xx, yy) => m.get(xx + ',' + yy), K);
  }

  const ACC = {
    // ======================= 머리 =======================
    capcrown: {
      // 병뚜껑 세 개를 크림색 띠에 꽂은 왕관. 가운데 큰 체리색 뚜껑엔 하얀 하트, 양옆은 하늘색·버터색 뚜껑.
      // 뚜껑 위아래 톱니 주름이 외곽선에 오돌토돌. 가끔 반짝
      front(g, a, c, t) {
        const K = c.K, y = a.earTop;
        cap(this, CAP_SMALL, a.hx - 8, y - 5, K, C.B, C.b, C.H);
        cap(this, CAP_SMALL, a.hx + 4, y - 5, K, C.Y, C.y, C.H);
        cap(this, CAP_BIG, a.hx - 3, y - 7, K, C.R, C.r, C.H);
        // 띠: 크림에 분홍 땡땡이, 아랫단은 분홍
        outlined(this, ['WPWWWPWWWPWWWPW', 'QQQQQQQQQQQQQQQ'], a.hx - 7, y + 1, { W: C.W, P: C.P, Q: C.Q }, K);
        const p = t % 2.6;
        if (p < 0.3) star(this, a.hx + 5, y - 7, C.L);
        else if (p > 1.3 && p < 1.5) star(this, a.hx - 7, y - 7, C.H);
      },
    },
    leafwreath: {
      // 노랑·주황·빨강 낙엽을 부채처럼 세워 엮은 화관. 가운데엔 통통한 솔방울을 보석처럼 박았다.
      // 바깥 잎이 살랑거리고 가끔 작은 잎 하나가 팔랑 떨어진다
      front(g, a, c, t) {
        const K = c.K, y = a.earTop;
        const s = sway(t, 2.2, 1);
        const leaf = (rows, x, yy, F, f) => outlined(this, rows, x, yy, { X: F, y: f }, K);
        const UP = ['.X.', 'XXX', 'XyX', 'XyX', '.y.'];
        // 바깥 잎 (비스듬히 바깥으로)
        leaf(['XX.', 'XXX', 'XyX', '.Xy'], a.hx - 8, y - 2 - (s > 0 ? 1 : 0), C.Y, C.y);
        leaf(['.XX', 'XXX', 'XyX', 'yX.'], a.hx + 6, y - 2 - (s < 0 ? 1 : 0), C.Y, C.y);
        // 안쪽 잎
        leaf(UP, a.hx - 5, y - 4, C.O, C.o);
        leaf(UP, a.hx + 3, y - 4, C.R, C.r);
        // 가운데 솔방울: 통통한 비늘 세 줄 + 꼭지
        outlined(this, ['.c.', 'TtT', 'tTt', 'TtT', '.t.'], a.hx - 1, y - 5, { c: C.c, T: C.T, t: C.t }, K);
        this.px(a.hx - 1, y - 4, '#f6d2a4');
        // 잎 아래를 잇는 잔가지 (머리 위 선을 따라 간다)
        for (let x = a.hx - 6; x <= a.hx + 6; x++) this.px(x, y + 1, (x + 40) % 3 ? C.t : C.c);
        // 팔랑 떨어지는 작은 잎
        const p = (t % 4.2) / 1.6;
        if (p < 1) {
          const lx = a.left - 3 + Math.round(Math.sin(p * 6) * 1.5), ly = y + 2 + Math.round(p * 8);
          this.pattern(['O.', 'oO'], lx, ly, { O: C.O, o: C.o }, false);
        }
      },
    },
    pigeonhat: {
      // 비둘기 회색 펠트로 만든 동그란 모자. 띠는 비둘기 목털처럼 민트·라일락 빛이 돌고, 해바라기씨 장식 두 알.
      // 공원에서 주운 깃털 두 개(회색에 진한 줄, 끝은 하얗다)를 V 자로 꽂아 살랑살랑. 챙이 귀를 덮는다
      front(g, a, c, t) {
        const K = c.K;
        const m = { F: '#b9bccb', f: '#9a9db0', h: '#dfe1ea', M: C.M, V: C.V, W: C.W, X: '#6e6878', d: '#7b7f92' };
        const s = sway(t, 2.4, 1);
        // 깃털 두 개: 모자 오른쪽 뒤에 꽂혀 끝이 오른쪽으로 휜다 (긴 것 뒤, 짧은 것 앞)
        sheared(this, ['W.', 'hW', 'hF', 'FF', 'dd', 'FF', 'Ff'], a.hx + 1, a.earTop - 10, m, [3 + s, 3 + s, 2 + s, 2, 1, 1, 0], K);
        sheared(this, ['W.', 'hW', 'hF', 'dd', 'Ff'], a.hx - 1, a.earTop - 8, m, [1 + s, 1 + s, 1, 0, 0], K);
        // 모자: 둥근 꼭대기 + 반짝이는 띠 + 넓은 챙
        outlined(this, [
          '...FFFFFFF...',
          '..FhhFFFFFF..',
          '..FhFFFFFFf..',
          '..MVMWXMVMV..',
          'FFFFFFFFFFFFF',
          '.fffffffffff.',
        ], a.left, a.earTop - 3, m, K);
      },
    },
    legohelm: {
      // 레고 브릭을 쌓아 만든 헬멧: 위엔 분홍 2×2 브릭(스터드 두 개), 아래는 민트·버터 브릭 두 개. 스터드마다 하얀 윤기
      front(g, a, c, t) {
        const K = c.K;
        outlined(this, [
          '.....QH.QH.....',
          '....PPPPPPP....',
          '....PHPPPPP....',
          '.MH.ppppppp.YH.',
          'MMMKKKKKKKKKYYY',
          'MHMMMMMKYYYYYYY',
          'mmmmmmmKyyyyyyy',
        ], a.hx - 7, a.earTop - 4, { K, P: C.P, p: C.p, Q: C.P, H: C.H, M: C.M, m: C.m, Y: C.Y, y: C.y }, K);
        if (t % 3.4 < 0.25) star(this, a.hx + 6, a.earTop - 5, C.H);
      },
    },
    legendcapcrown: {
      // 두세 달 걸려 완성한 진짜 전설의 병뚜껑 왕관. 보석 박힌 금빛 띠에 체리색 병뚜껑 세 개를 나란히 꽂고,
      // 그 위에 유난히 반짝이는 그 금색 병뚜껑(별 무늬)을 탑처럼 얹었다. 뒤로 빛살이 일렁이고, 윤이 스치고, 반짝이가 빙글 돈다
      front(g, a, c, t) {
        const K = c.K, y = a.earTop;
        // 빛살: 금뚜껑 뒤에서 숨 쉬듯 퍼진다
        const on = Math.sin(t * 3) > 0;
        const ray = on ? 'rgba(255,236,150,0.95)' : 'rgba(255,236,150,0.5)';
        for (const [dx, dy] of [[0, -14], [0, -15], [-4, -13], [4, -13], [-6, -11], [6, -11]]) this.px(a.hx + dx, y + dy, ray, false);
        if (on) for (const [dx, dy] of [[-5, -12], [5, -12], [0, -16]]) this.px(a.hx + dx, y + dy, ray, false);
        // 체리색 뚜껑 세 개 (가운데 것이 금뚜껑 받침)
        for (const dx of [-8, -2, 4]) cap(this, CAP_SMALL, a.hx + dx, y - 5, K, C.R, C.r, C.H);
        // 금뚜껑 (별 무늬)
        outlined(this, [
          '.X.X.X.X.',
          'XXXXXXXXX',
          'XhXXwXXXX',
          'XXXwwwXXd',
          'XXXXwXXXd',
          'dXXXXXXdd',
          '.d.d.d.d.',
        ], a.hx - 4, y - 12, { X: C.G, d: C.g, h: C.L, w: C.H }, K);
        // 윤: 금뚜껑을 왼쪽에서 오른쪽으로 스친다
        const sh = Math.floor((t % 2.4) * 6);
        if (sh >= 1 && sh <= 7) { this.px(a.hx - 4 + sh, y - 11, C.H); this.px(a.hx - 4 + sh, y - 10, C.L); }
        // 금빛 띠에 박은 보석 (분홍·민트·하늘)
        outlined(this, ['GGPGGGMGGGBGGGG', 'ggggggggggggggg'], a.hx - 7, y + 1, { G: C.G, g: C.g, P: C.P, M: C.M, B: C.B }, K);
        if (Math.floor(t * 2) % 3 === 0) this.px(a.hx - 5, y + 1, C.H);
        // 반짝이: 왕관 둘레를 돈다
        const k = Math.floor(t * 2.5) % 4;
        const pts = [[a.hx - 7, y - 10], [a.hx + 7, y - 10], [a.hx + 10, y - 3], [a.hx - 10, y - 3]];
        star(this, pts[k][0], pts[k][1], C.L);
        star(this, pts[(k + 2) % 4][0], pts[(k + 2) % 4][1], 'rgba(255,236,150,0.8)');
      },
    },
    usbantenna: {
      // 하늘색 USB 뚜껑을 머리에 세운 꼬마 로봇. 점 눈에 볼터치, 쇠 끝이 위.
      // 휘어 편 클립 두 가닥 끝에 이어폰 고무 팁(분홍·민트)을 꽂아 더듬이처럼 통통 흔든다.
      // 가운데 위로 와이파이 호가 하나씩 차오르고, 꽉 차면 반짝 (잘 잡힌다)
      front(g, a, c, t) {
        const K = c.K, y = a.earTop;
        const bob = Math.round(Math.sin(t * 3));
        // 클립 철사 더듬이: 뚜껑 어깨에서 바깥 위로
        for (const [dx, dy] of [[3, -5], [4, -6], [4, -7], [5, -8]]) {
          this.px(a.hx - dx, y + dy + (dy < -6 ? bob : 0), C.D);
          this.px(a.hx + dx, y + dy + (dy < -6 ? -bob : 0), C.D);
        }
        // 이어폰 고무 팁 (동글동글)
        outlined(this, ['.P.', 'PHP', 'pPp'], a.hx - 6, y - 11 + bob, { P: C.P, p: C.p, H: C.H }, K);
        outlined(this, ['.M.', 'MHM', 'mMm'], a.hx + 4, y - 11 - bob, { M: C.M, m: C.m, H: C.H }, K);
        // USB 뚜껑 (얼굴이 있다)
        outlined(this, [
          '.SSSSS.',
          '.SsSsS.',
          'BBBBBBB',
          'BHBBBBb',
          'BBXBXBb',
          'BPBBBPb',
          'bbbbbbb',
        ], a.hx - 3, y - 4, { S: C.S, D: C.D, B: C.B, b: C.b, H: C.H, X: C.X, P: C.P }, K);
        // 가끔 눈 깜빡 (점 눈 → 가로줄)
        if (t % 4 < 0.15) { this.px(a.hx - 1, y, C.b); this.px(a.hx + 1, y, C.b); }
        // 와이파이 호: 분홍 → 버터 → 민트 순으로 차오른다
        const n = Math.floor(t * 2.5) % 5;
        if (n >= 1) this.px(a.hx, y - 7, C.P, false);
        if (n >= 2) this.pattern(['X.X', '.X.'], a.hx - 1, y - 9, { X: C.Y }, false);
        if (n >= 3) this.pattern(['X...X', '.XXX.'], a.hx - 2, y - 11, { X: C.M }, false);
        if (n >= 4) {
          this.pattern(['XXXXX'], a.hx - 2, y - 13, { X: C.B }, false);
          this.px(a.hx - 3, y - 12, C.B, false);
          this.px(a.hx + 3, y - 12, C.B, false);
          star(this, a.hx + 6, y - 14, C.L);
        }
      },
    },

    // ======================= 얼굴 =======================
    strawglasses: {
      // 분홍·하양 줄무늬 구부러지는 빨대를 동그랗게 휘어 만든 안경. 코다리는 민트색 빨대 주름, 양옆 경첩은 클립.
      // 가끔 렌즈 위로 반짝
      front(g, a, c, t) {
        const ring = (x0, y0) => {
          // 4×4 테, 모서리는 둥글게 비우고 두 칸씩 분홍·하양 줄무늬
          const pts = [[1, 0], [2, 0], [3, 1], [3, 2], [2, 3], [1, 3], [0, 2], [0, 1]];
          pts.forEach(([i, j], k) => this.px(x0 + i, y0 + j, (k >> 1) % 2 ? C.W : C.P));
        };
        ring(a.eyeL - 1, a.ey - 1);
        ring(a.eyeR - 1, a.ey - 1);
        // 주름진 코다리 (민트 빨대)
        for (let x = a.eyeL + a.ew + 1; x < a.eyeR - 1; x++) this.px(x, a.ey - 1, x % 2 ? C.m : C.M);
        // 클립 경첩 + 다리
        this.px(a.eyeL - 2, a.ey, C.s);
        this.px(a.eyeR + a.ew + 1, a.ey, C.s);
        this.px(a.eyeL - 3, a.ey, C.P);
        this.px(a.eyeR + a.ew + 2, a.ey, C.P);
        // 렌즈에 스치는 반짝
        const p = t % 3.2;
        if (p < 0.5) star(this, p < 0.25 ? a.eyeL - 1 : a.eyeR + a.ew, a.ey - 2, C.H);
      },
    },
    acorncheeks: {
      // 도토리를 볼 가득 넣어서 양 볼이 동그랗게 빵빵. 볼엔 분홍 볼터치, 입에는 반들반들한 도토리 하나를 물었다.
      // 가끔 우물우물 (볼이 부풀고 도토리가 들썩)
      front(g, a, c, t) {
        const body = g.c.body, out = g.c.outline;
        const chew = Math.sin(t * 2) > 0.8;
        const puff = chew ? 0.3 : 0;
        const cy = a.my + 0.5;
        this.ellipse(a.left - 0.3, cy, 2.1 + puff, 1.9 + puff, body, out);
        this.ellipse(a.right + 1.3, cy, 2.1 + puff, 1.9 + puff, body, out);
        // 볼터치 (두 칸)
        this.pattern(['PP'], a.left - 2, Math.round(cy), { P: C.P });
        this.pattern(['PP'], a.right + 1, Math.round(cy), { P: C.P });
        // 입에 문 도토리: 갓 · 반들반들 열매
        outlined(this, ['.ccc.', 'ccccc', '.TwT.', '..T..'], a.fx - 2, a.my + (chew ? 0 : 1), { c: C.c, T: C.T, w: '#f6d2a4' }, c.K);
        if (t % 3.6 < 0.2) this.px(a.fx - 1, a.my + 2, C.H);
      },
    },
  };

  Object.assign(root.PetSprite.ACCESSORIES, ACC);
})(window);
