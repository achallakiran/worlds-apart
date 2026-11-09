/*BLUEWALL*/const WALLB = {strips:1,cols:56,rows:8,t:[
'iggfffdqsrpolnkkkolhjgkrslprkjdddeqmopaafpnpkloslipuvusr',
'jjrfeeestunjnllqnmigjjmppnrphiffgopnqrhbjstqpponfafnmquu',
'uptfeddkrsqmqqoqplleklrqqnqnghgginmlgjibjtqnonlngajkjjjh',
'npredddnionjotmppfeaiipstpslfgghnjniggebhusspnlljdlkoonl',
'qrrfeeenlslkpwlrifgcbdmuxwvpegghmlonhfdbgtrnnmlmibhkhnpm',
'ntqedddnmunkpsnrkeffcapstqqnggggjlpphefbeutqoomojdkhjoun',
'nwrffdeopyqnpurqqeedhjqtrrokfhggjjgniehadtsrtqmjgmjlhjym',
'kqzqeedfdjtrqqqmlffclljjuponpyrijjlpkrztlrttnnkajonmadzl'
]};/*ENDBLUEWALL*/
/*TIERS*/const TIERS_T = {strips:5,cols:40,rows:4,t:[
'nmmmmmnnppqsmkmomqpmllnpmgeotsoopkklsnmn',
'nnmmnopppqpqigkqrllqpmgfmqwsrhhjlhiklils',
'ooononnoqpekhnplmoimkjntuwuogdiquqnnphgn',
'ppooonopqohkoiotnoggrwwqpqjamvttrnmmqqno',
'nprqpppolonkoqpmfhgjqnlnqkhevtwwllnkiopl',
'gjrsrqlgcirsplmphkgkpilqlollxqlhfighflsq',
'denutohkmqqlqvnjhpjrvxrlfmjjjgdltwhniell',
'hhiktqonppriijfjrsvxvoiejmihpsowzvljppjj',
'fdbhkjloomkhhgrxuvrokhhgfgkqsppvtpmjrtsm',
'bdoqsrfemoohfeknighhchkrqrxvsnmmpmjhjrtk',
'hustqoouvvuhfihbfjqvzuqpjnoqqmjigbkkhgmf',
'krslkuqsotvflsyhqvusvtollmbmomlklikkkijc',
'qnpqtunosptusswjlnljhipkjiasrqrnmjmptsuj',
'trmmomogfemltpslkhifbglnpontlptomktnrtvo',
'gponllniaagnkkmqmmssqnwvrmmsruwpnjtorqmk',
'bqofaeujefosslnurtsnhmrqmklrsuvspmniqrlh',
'dtyimtzimuvvurlfjprkjqljohntqphslpngophi',
'bzzmowunklqkmjpgiljhkkmrngnwnkbpfrnhppim',
'fnuqgqxkkpolmnqnmmnknstroghjkhlpnnhjolmr',
'acjnjpwjlmkkolkmjkiqpqnmlhghjuvrkkhkmiir'
]};/*ENDTIERS*/
/*
 * Iraq — "Hanging Gardens of Babylon" (iraq-hanging-gardens). First scenery of Iraq, first of the Ancient Seven.
 * Stage package: world.js + stage.json + differences.json + music.mp3.
 *
 * A five-tier ziggurat of sandstone terraces rising from a river. The base wall is the blue glazed brick of the Ishtar Gate
 * with golden lion / bull reliefs, the upper tiers are arched sandstone; terraces are planted with palms, cypress, flowering
 * shrubs and hanging vines, and water tumbles from the temple on top down every tier into a grand pool and the Euphrates.
 * Wall faces are traced from two reference photos (tools/stages/extract_facade.py): BLUEWALL (glazed wall) and TIERS (arched
 * sandstone terraces). All water is animated: falling streaks, splash rings, foam, river ripples, glints, fountain spray, wakes.
 * The ten differences are spread around the ziggurat (every ~36 degrees); four are lights that look the same by day.
 */
function createStage(E) {
  const { Mesh, BasicMaterial, PointLight, Color, hash } = E;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const smooth = (a, b, v) => { const t = clamp((v - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };
  const C = [0, -6], G = 1.0, TH = 3.5, WY = 0.38;        // ziggurat centre, ground level, tier height, water level
  const HW = [13, 10.5, 8, 5.5, 3.2];                     // half width of each tier
  const topY = (k) => G + TH * (k + 1);
  const RZ0 = 11, RZ1 = 19;                               // river between z = 11 and z = 19
  const tierAt = (x, z) => { let k = -1; for (let i = 0; i < 5; i++) if (Math.abs(x - C[0]) <= HW[i] && Math.abs(z - C[1]) <= HW[i]) k = i; return k; };
  function height(x, z) {
    const k = tierAt(x, z);
    if (k >= 0) return topY(k);
    return z > RZ0 && z < RZ1 ? 0.5 : G;
  }
  const mix = (a, b, t) => { const r = (a >> 16 & 255) + ((b >> 16 & 255) - (a >> 16 & 255)) * t, g = (a >> 8 & 255) + ((b >> 8 & 255) - (a >> 8 & 255)) * t, bl = (a & 255) + ((b & 255) - (a & 255)) * t; return (r | 0) << 16 | (g | 0) << 8 | (bl | 0); };
  const LEAF = [0x2f7a3a, 0x3d8f45, 0x4aa04c, 0x58b055, 0x35863f];
  const VINE = [0x3f8f3a, 0x4fa244, 0x2f7a30, 0x6bb04a, 0x58b055];
  const GRASS = [0x6fae44, 0x7cba4c, 0x63a23c, 0x84c254];
  const SAND = [0xc99a6b, 0xd2a574, 0xbf8f60];
  const GOLD = 0xd8a43a;
  const FLOWER = [0xe85a9a, 0xb565d9, 0xf2c83a, 0xf5f0e6, 0xe8743a];
  const STX = [0, -8.5, 5.8, -3.8, 2.2], STZ = [0, 4, -5, 3, -1];             // stair positions on the +z / +x faces (relative to the centre)
  const FALL0 = { 0: [-8.2], 1: [6.2], 2: [-4.8] }, FALL1 = { 0: [4.5], 1: [-6], 2: [-3.5] };   // side waterfalls: x on +z faces, z (relative) on +x faces
  const D = {
    palms: [21, -6], lantern: [16, 6], boat: [6, 14], bull: [-7.5, 9.3], fountain: [-16.5, 8], gardeners: [-21, -6],
    tower: [-15, -17], flowers: [-8.5, -21.5], beacon: [6, -21.3], fall: [HW[1] + C[0], -12],
  };

  function build(ctx, variant) {
    const { box: g, group: o, makeDiff: B } = ctx;
    const U = world_(ctx);
    const pick = (arr, a, b) => arr[Math.floor(hash(a, b) * arr.length)];
    const motion = (grp) => { grp.userData.motion = true; return grp; };
    U.wallLights = []; U.beams = []; U.ripples = []; U.glints = []; U.streaks = []; U.rings = []; U.foam = []; U.drops = [];
    U.ships = []; U.people = []; U.doves = []; U.flames = [];

    function lamp(x, y, z, sx, sy, sz, dayColor, nightColor, opts = {}) {
      const m = new Mesh(ctx.cube, new BasicMaterial(opts.alpha !== undefined ? { color: dayColor, transparent: true, opacity: opts.alpha, depthWrite: false } : { color: dayColor }));
      m.position.set(x, y, z); m.scale.set(sx, sy, sz);
      m.userData.ownedMaterial = true; m.userData.motion = true;
      if (!opts.pickable) m.raycast = () => {};
      (opts.parent || ctx.world).add(m);
      U.wallLights.push({ m, day: dayColor, night: nightColor });
      return m;
    }

    // ---------- ground, river, quay ----------
    const bottom = -2.2;
    g(0, (bottom + G - 0.12) / 2, -6, 52, G - 0.12 - bottom, 34, 0x8a6a45);                 // land behind the river
    g(0, (bottom - 0.7) / 2, 15, 52, -0.7 - bottom, 8, 0x6b6a58);                            // river bed
    g(0, (bottom + G - 0.12) / 2, 21.25, 52, G - 0.12 - bottom, 4.5, 0x8a6a45);              // far bank
    for (let x = -25; x <= 25; x += 2) {
      for (let z = -22; z <= 10; z += 2) {
        if (Math.abs(x - C[0]) <= HW[0] + 0.3 && Math.abs(z - C[1]) <= HW[0] + 0.3) continue;
        const c = hash(x, z) > 0.86 ? pick(SAND, x, z) : pick(GRASS, x, z);
        g(x, G - 0.07, z, 2.02, 0.2, 2.02, c);
      }
      for (const z of [20, 22]) g(x, G - 0.07, z, 2.02, 0.2, 2.02, hash(x, z) > 0.8 ? pick(SAND, x, z) : pick(GRASS, x, z));
    }
    // river water: shallow turquoise edges, deep blue middle
    lamp(0, WY, 11.7, 52, 0.12, 1.4, 0x58c0e0, 0x16385f);
    lamp(0, WY, 15, 52, 0.12, 5.2, 0x2c7fcf, 0x0d2347);
    lamp(0, WY, 18.3, 52, 0.12, 1.4, 0x58c0e0, 0x16385f);
    // glazed quay walls: blue with a gold course and gold tiles
    g(0, (-0.7 + G) / 2, 10.95, 52, G + 0.7, 0.3, 0x2a52b0);
    g(0, G - 0.12, 10.95, 52, 0.14, 0.38, GOLD);
    for (let x = -24.5; x <= 24.5; x += 1.6) g(x, 0.62, 11.13, 0.46, 0.36, 0.06, GOLD);
    g(0, (-0.7 + G) / 2, 19.05, 52, G + 0.7, 0.3, 0xb99a6a);

    // ---------- ziggurat: slabs, tiled terrace tops, wall faces traced from the photos ----------
    const baseCol = [0x23418f, 0xc99a6b, 0xcfa070, 0xc4946a, 0xd2a574];
    for (let k = 0; k < 5; k++) g(C[0], G + TH * k + TH / 2, C[1], HW[k] * 2, TH, HW[k] * 2, baseCol[k]);
    for (let k = 0; k < 5; k++) {
      const inner = k < 4 ? HW[k + 1] : -1, s = 1.6;
      for (let x = -HW[k] + s / 2; x < HW[k]; x += s) for (let z = -HW[k] + s / 2; z < HW[k]; z += s) {
        if (Math.abs(x) < inner - 0.3 && Math.abs(z) < inner - 0.3) continue;
        g(C[0] + x, topY(k) - 0.08, C[1] + z, s + 0.02, 0.2, s + 0.02, hash(x * 3 + k, z) > 0.8 ? pick(SAND, x, z) : pick(GRASS, x + k, z));
      }
    }
    function faceCells(k, side) {
      const hw = HW[k], yb = G + TH * k, ph = k === 0 ? WALLB : TIERS_T, cols = ph.cols, rows = ph.rows;
      const cw = 2 * hw / cols, rh = (TH - 0.3) / rows, off = [0, 17, 29, 41][side];
      const strip = k === 0 ? 0 : (k - 1 + side) % 5;
      for (let c = 0; c < cols; c++) for (let r = 0; r < rows; r++) {
        const ch = ph.t[strip * rows + r][(c + off) % cols], t = (ch.charCodeAt(0) - 97) / 25;
        let col, dep;
        if (k === 0) { if (t > 0.86) { col = mix(0xb8862c, 0xf0c860, (t - 0.86) / 0.14); dep = 0.1 + 0.08 * t; } else { col = mix(0x1f45a6, 0x4f80e6, t / 0.86); dep = 0.03 + 0.07 * t; } }
        else if (t < 0.14) { col = 0x4a3020; dep = 0.03; }
        else { col = mix(0xb98558, 0xe7c394, t); dep = 0.04 + 0.1 * t; }
        const u = -hw + (c + 0.5) * cw, y = yb + 0.15 + rh * (rows - 1 - r + 0.5), s = cw * 1.03;
        if (side === 0) g(C[0] + u, y, C[1] + hw + dep / 2, s, rh * 1.03, dep, col);
        else if (side === 1) g(C[0] + hw + dep / 2, y, C[1] - u, dep, rh * 1.03, s, col);
        else if (side === 2) g(C[0] - u, y, C[1] - hw - dep / 2, s, rh * 1.03, dep, col);
        else g(C[0] - hw - dep / 2, y, C[1] + u, dep, rh * 1.03, s, col);
      }
    }
    for (let k = 0; k < 5; k++) {
      for (let side = 0; side < 4; side++) faceCells(k, side);
      const cc = k === 0 ? GOLD : 0xa0724a, hw = HW[k] + 0.14, yc = topY(k) - 0.08;
      g(C[0], yc, C[1] + hw, 2 * hw + 0.3, 0.22, 0.3, cc); g(C[0], yc, C[1] - hw, 2 * hw + 0.3, 0.22, 0.3, cc);
      g(C[0] + hw, yc, C[1], 0.3, 0.22, 2 * hw, cc); g(C[0] - hw, yc, C[1], 0.3, 0.22, 2 * hw, cc);
    }
    // lit windows on the +z and +x faces (all dark by day, warm at night)
    for (let k = 0; k < 5; k++) for (let i = 0; i < 9; i++) for (const side of [0, 1]) {
      const hw = HW[k], u = -hw + 1.2 + (i + hash(k, i + side * 9) * 0.5) * (2 * hw - 2.4) / 9, y = G + TH * k + TH * 0.52;
      if (Math.abs(u) < 1.7) continue;
      const warm = hash(i, k + side * 3) > 0.5 ? 0xffb85a : 0xffd98a;
      if (side === 0) lamp(C[0] + u, y, C[1] + hw + 0.2, 0.34, 0.62, 0.08, 0x3a2418, warm); else lamp(C[0] + hw + 0.2, y, C[1] + u, 0.08, 0.62, 0.34, 0x3a2418, warm);
    }

    // ---------- stairs: wedges that climb each tier face ----------
    for (let k = 1; k < 5; k++) {
      const x = STX[k], ty = topY(k - 1);
      for (let i = 0; i < 6; i++) { const len = 1.4 * (6 - i) / 6, h = (i + 1) * TH / 6; g(C[0] + x, ty + h / 2, C[1] + HW[k] + len / 2 + 0.1, 1.5, h, len, 0xd8c39a); }
      const zz = STZ[k];
      for (let i = 0; i < 6; i++) { const len = 1.4 * (6 - i) / 6, h = (i + 1) * TH / 6; g(C[0] + HW[k] + len / 2 + 0.1, ty + h / 2, C[1] + zz, len, h, 1.5, 0xd8c39a); }
    }

    // ---------- water helpers ----------
    // a waterfall sheet with moving streaks, foam and a pool with expanding rings at its foot (coordinates are local to `parent`)
    function fall(parent, axis, wall, c, yTop, yBot, w, py, seed, withPool = true) {
      const h = yTop - yBot, ym = (yTop + yBot) / 2, o1 = wall + 0.2;
      const P = (a, y, b) => axis === 'z' ? [a, y, o1 + b] : [o1 + b, y, a];
      const S = (sa, sy, sb) => axis === 'z' ? [sa, sy, sb] : [sb, sy, sa];
      lamp(...P(c, ym, 0), ...S(w, h, 0.22), 0x8fd4ff, 0x2f4c85, { alpha: 0.7, parent });
      const n = Math.max(4, Math.round(w * 3.2));
      for (let i = 0; i < n; i++) {
        const a = c - w / 2 + (i + 0.5) * w / n, m = lamp(...P(a, ym, 0.15), ...S(w / n * 0.55, 0.9, 0.12), 0xffffff, 0x9cb4d8, { alpha: 0.88, parent });
        U.streaks.push({ m, top: yTop, h, sp: 3.2 + hash(seed, i) * 1.6, ph: hash(i, seed + 3) * (h + 1), len: 0.9 });
      }
      if (!withPool) return;
      lamp(...P(c, py, 0.9), ...S(w + 1.8, 0.1, 1.5), 0x45a6e6, 0x15305a, { parent });
      for (let i = 0; i < 4; i++) {
        const m = lamp(...P(c + (i - 1.5) * w / 4, py + 0.25, 0.35), 0.5, 0.5, 0.5, 0xffffff, 0x8fa8d0, { alpha: 0.65, parent });
        U.foam.push({ m, ph: i * 1.7 + seed, base: [m.position.x, m.position.y, m.position.z] });
      }
      for (let r = 0; r < 2; r++) {
        const grp = motion(o(...P(c, py + 0.08, 0.9)));
        parent.add(grp);
        const mats = [];
        for (const [bx, bz, sx, sz] of [[0, -0.6, 1.3, 0.1], [0, 0.6, 1.3, 0.1], [-0.6, 0, 0.1, 1.3], [0.6, 0, 0.1, 1.3]]) {
          const m = lamp(bx, 0, bz, sx, 0.06, sz, 0xffffff, 0x9cb4d8, { alpha: 0.6, parent: grp }); mats.push(m);
        }
        U.rings.push({ g: grp, mats, ph: r * 0.5 + hash(seed, 7) * 0.3, grow: 1.5 + w * 0.5, axis });
      }
    }
    const stone = 0xd8c39a;
    function plant(parent, x, y, z, kind, s, extra) {
      if (kind === 'palm') {
        const h = 2.6 + hash(s, x) * 1.4;
        g(x, y + h / 2, z, 0.3, h, 0.3, 0x8a6a3a, parent);
        for (let r = 0.5; r < h; r += 0.7) g(x, y + r, z, 0.36, 0.1, 0.36, 0x6e5230, parent);
        g(x, y + h, z, 2.3, 0.12, 0.4, pick(LEAF, s, 1), parent); g(x, y + h + 0.02, z, 0.4, 0.12, 2.3, pick(LEAF, s, 2), parent);
        g(x + 0.7, y + h - 0.25, z + 0.7, 1.2, 0.1, 0.4, pick(LEAF, s, 3), parent); g(x - 0.7, y + h - 0.25, z - 0.7, 1.2, 0.1, 0.4, pick(LEAF, s, 4), parent);
        g(x + 0.7, y + h - 0.25, z - 0.7, 0.4, 0.1, 1.2, pick(LEAF, s, 5), parent); g(x - 0.7, y + h - 0.25, z + 0.7, 0.4, 0.1, 1.2, pick(LEAF, s, 6), parent);
        g(x, y + h + 0.3, z, 0.5, 0.4, 0.5, pick(LEAF, s, 7), parent);
        if (extra) { g(x + 0.28, y + h - 0.3, z, 0.34, 0.5, 0.34, extra, parent); g(x - 0.28, y + h - 0.3, z, 0.34, 0.5, 0.34, extra, parent); }
      } else if (kind === 'tree') {
        g(x, y + 0.7, z, 0.3, 1.4, 0.3, 0x6b4a33, parent); g(x, y + 1.9, z, 1.9, 1.3, 1.9, pick(LEAF, s, 8), parent); g(x + 0.1, y + 2.8, z, 1.2, 0.8, 1.2, pick(LEAF, s, 9), parent);
      } else if (kind === 'cypress') {
        g(x, y + 1.6, z, 0.7, 3.2, 0.7, 0x1f5a2f, parent); g(x, y + 3.4, z, 0.45, 0.8, 0.45, 0x1f5a2f, parent);
      } else {
        g(x, y + 0.4, z, 1.2, 0.8, 1.2, pick(LEAF, s, 10), parent);
        if (kind === 'flower') for (let i = 0; i < 4; i++) g(x + (hash(s, i) - 0.5) * 0.9, y + 0.85, z + (hash(i, s) - 0.5) * 0.9, 0.22, 0.2, 0.22, pick(FLOWER, s, i), parent);
      }
    }
    const person = (parent, x, y, z, c) => { const p = motion(o(x, y, z)); parent.add(p); g(0, 0.45, 0, 0.3, 0.9, 0.24, c, p); g(0, 1.08, 0, 0.26, 0.26, 0.26, 0xe8c9a0, p); g(0, 1.27, 0, 0.32, 0.12, 0.32, 0x3a2f27, p); return p; };
    const bull = (parent, x, y, z) => {
      g(x, y + 0.25, z, 1.3, 0.5, 2.2, 0xb99a6a, parent); g(x, y + 1.0, z, 0.7, 1.0, 1.6, 0xd9b98a, parent); g(x, y + 1.5, z + 0.9, 0.5, 0.6, 0.5, 0xd9b98a, parent);
      g(x, y + 1.95, z + 0.9, 0.5, 0.3, 0.5, GOLD, parent); g(x, y + 1.25, z + 1.2, 0.35, 0.4, 0.15, 0x3a2f27, parent);
      for (const s of [-1, 1]) g(x + s * 0.42, y + 1.6, z - 0.1, 0.12, 0.9, 1.2, GOLD, parent);
    };
    const boat = (parent, canopy, col) => {
      const b = motion(o(0, 0, 0)); parent.add(b);
      g(0, 0.2, 0, 3.4, 0.3, 1.0, 0x9a6b3d, b); g(1.8, 0.5, 0, 0.5, 0.6, 0.8, 0x9a6b3d, b); g(-1.8, 0.5, 0, 0.5, 0.6, 0.8, 0x9a6b3d, b); g(0, 0.4, 0, 3.0, 0.12, 0.84, 0xc9a06a, b);
      if (canopy) { for (const [px, pz] of [[-0.7, -0.35], [-0.7, 0.35], [0.7, -0.35], [0.7, 0.35]]) g(px, 0.9, pz, 0.08, 0.9, 0.08, 0x5a3f28, b); g(0, 1.4, 0, 1.9, 0.14, 1.2, 0xe8d8b0, b); g(0, 1.48, 0, 1.9, 0.06, 0.4, col, b); }
      person(b, -1.2, 0.35, 0, col);
      return b;
    };

    // ---------- the grand waterfall: temple -> every tier -> grand pool -> river ----------
    for (let k = 4; k >= 0; k--) {
      const wall = C[1] + HW[k], w = [1.4, 1.7, 2.0, 2.3, 2.6][k], yTop = topY(k), py = k === 0 ? G + 0.12 : topY(k - 1) + 0.12;
      fall(ctx.world, 'z', wall, C[0], yTop, yTop - TH + 0.1, w, py, 10 + k, k > 0);
    }
    // grand pool and its stone rim, overflow into the river
    lamp(0, G + 0.1, 9.0, 9.4, 0.12, 3.4, 0x45a6e6, 0x15305a);
    g(0, G + 0.05, 7.1, 10.2, 0.34, 0.3, stone); g(-4.9, G + 0.05, 9.0, 0.3, 0.34, 3.7, stone); g(4.9, G + 0.05, 9.0, 0.3, 0.34, 3.7, stone); g(-3.2, G + 0.05, 10.9, 3.9, 0.34, 0.3, stone); g(3.2, G + 0.05, 10.9, 3.9, 0.34, 0.3, stone);
    {
      const grp = motion(o(0, G + 0.2, 8.0)); ctx.world.add(grp); const mats = [];
      for (const [bx, bz, sx, sz] of [[0, -0.9, 2.6, 0.1], [0, 0.9, 2.6, 0.1], [-1.3, 0, 0.1, 1.9], [1.3, 0, 0.1, 1.9]]) mats.push(lamp(bx, 0, bz, sx, 0.06, sz, 0xffffff, 0x9cb4d8, { alpha: 0.6, parent: grp }));
      U.rings.push({ g: grp, mats, ph: 0.2, grow: 1.4, axis: 'z' });
    }
    fall(ctx.world, 'z', RZ0, 0, G + 0.02, WY + 0.05, 2.2, WY + 0.08, 40);
    // pools on tiers for the side falls
    for (const [k, axis, c] of [[0, 'z', -8.2], [1, 'z', 6.2], [2, 'z', -4.8], [0, 'x', C[1] + FALL1[0][0]], [2, 'x', C[1] + FALL1[2][0]]]) {
      const wall = (axis === 'z' ? C[1] : C[0]) + HW[k], py = (k === 0 ? G : topY(k - 1)) + 0.12;
      fall(ctx.world, axis, wall, c, topY(k), topY(k) - TH + 0.1, 1.5, py, 20 + k * 3 + (axis === 'x' ? 5 : 0));
      const pc = axis === 'z' ? [c, wall + 1.1] : [wall + 1.1, c];
      g(pc[0], py - 0.12, pc[1], axis === 'z' ? 3.3 : 1.7, 0.1, axis === 'z' ? 1.7 : 3.3, stone);
    }

    // river: drifting ripple crests, sun glints and two sailing boats
    for (let i = 0; i < 90; i++) {
      const lane = hash(i, 4), z = 12 + lane * 6.6, sp = 0.35 + lane * 0.55;
      const m = lamp(0, WY + 0.08, z, 0.8 + hash(i, 9) * 0.9, 0.04, 0.12, 0xdff3ff, 0x6f8fc0, { alpha: 0.5 });
      U.ripples.push({ m, x0: hash(i, 1) * 52 - 26, sp, fl: 0.8 + hash(i, 5) * 1.4, ph: hash(i, 6) * 6.3, a: 0.55 });
    }
    for (let i = 0; i < 36; i++) {
      const m = lamp(hash(i, 21) * 48 - 24, WY + 0.1, 11.8 + hash(i, 22) * 6.6, 0.22, 0.05, 0.22, 0xffffff, 0xffc878, { alpha: 0 });
      U.glints.push({ m, ph: hash(i, 23) * 6.3, f: 1.2 + hash(i, 24) * 1.5, a: 0.9 });
    }
    {
      const b1 = boat(ctx.world, true, 0xc0392b);
      U.ships.push({ g: b1, z: 14.2, A: 20, w: 0.052, ph: 0.4, wake: [] });
      const b2 = boat(ctx.world, false, 0x2e7bd6); b2.scale.set(0.8, 0.8, 0.8);
      U.ships.push({ g: b2, z: 16.9, A: 22, w: 0.041, ph: 2.9, wake: [] });
      for (const bt of U.ships) for (let k = 0; k < 5; k++) { const m = lamp(-2.2 - k * 0.7, 0.12, (k % 2 ? 1 : -1) * (0.3 + k * 0.12), 0.8, 0.04, 0.12, 0xffffff, 0x9cb4d8, { alpha: 0.5, parent: bt.g }); bt.wake.push(m); }
    }

    // ---------- plants on every terrace, hanging vines on every face ----------
    for (let k = 0; k < 4; k++) {
      const hw = HW[k], inner = HW[k + 1], mid = (hw + inner) / 2, ty = topY(k);
      for (let u = -hw + 0.8; u <= hw - 0.8; u += 1.9) for (const side of [0, 1, 2, 3]) {
        const a = u + (hash(u, side + k) - 0.5) * 0.7, n = hash(a * 3, k * 4 + side), kind = n < 0.3 ? 'palm' : n < 0.5 ? 'tree' : n < 0.58 ? 'cypress' : n < 0.82 ? 'bush' : 'flower';
        if (side === 0 && (Math.abs(a) < 3.1 || Math.abs(a - STX[k + 1]) < 1.4 || (FALL0[k + 1] || []).some((f) => Math.abs(a - f) < 1.9))) continue;
        if (side === 1 && (Math.abs(a - STZ[k + 1]) < 1.4 || (FALL1[k + 1] || []).some((f) => Math.abs(a - f) < 1.9) || (k === 0 && Math.abs(a - (D.fall[1] - C[1])) < 2.2))) continue;
        let x, z;
        if (side === 0) { x = C[0] + a; z = C[1] + mid - 0.2; } else if (side === 1) { x = C[0] + mid - 0.2; z = C[1] + a; }
        else if (side === 2) { x = C[0] + a; z = C[1] - mid; } else { x = C[0] - mid; z = C[1] + a; }
        plant(ctx.world, x, ty, z, kind, k * 50 + side * 9 + Math.floor(u * 3), null);
      }
    }
    // tier-4 roof garden around the temple
    for (const [x, z, kind] of [[-2.4, -2.6, 'cypress'], [2.4, -2.6, 'cypress'], [-2.5, -9.4, 'palm'], [2.5, -9.4, 'palm'], [-2.6, -6, 'bush'], [2.6, -6, 'bush']]) plant(ctx.world, x, topY(4), z, kind, 900 + x * 3, null);
    for (let k = 0; k < 5; k++) for (let side = 0; side < 4; side++) {
      const hw = HW[k], n = Math.floor(2 * hw / 0.95);
      for (let i = 0; i < n; i++) {
        if (hash(i * 7 + k, side + 20) < 0.42) continue;
        const u = -hw + (i + 0.5) * 2 * hw / n, len = 0.7 + hash(i, k * 4 + side) * 2.3, y = topY(k) - 0.2 - len / 2, c = pick(VINE, i + k, side);
        if (side === 0 && (Math.abs(u) < 1.9 || Math.abs(u - STX[k]) < 1 || (FALL0[k] || []).some((f) => Math.abs(u - f) < 1.2))) continue;
        if (side === 1 && (Math.abs(u + STZ[k]) < 1 || (FALL1[k] ? [-FALL1[k][0]] : []).some((f) => Math.abs(u - f) < 1.3) || (k === 1 && Math.abs(u - 6) < 1.4))) continue;
        const o2 = HW[k] + 0.32;
        if (side === 0) g(C[0] + u, y, C[1] + o2, 0.55, len, 0.22, c); else if (side === 1) g(C[0] + o2, y, C[1] - u, 0.22, len, 0.55, c);
        else if (side === 2) g(C[0] + u, y, C[1] - o2, 0.55, len, 0.22, c); else g(C[0] - o2, y, C[1] + u, 0.22, len, 0.55, c);
        if (len > 1.9 && (side < 2)) { const f = pick(FLOWER, i, k); if (side === 0) g(C[0] + u, y - len / 2 + 0.3, C[1] + o2 + 0.14, 0.25, 0.22, 0.12, f); else g(C[0] + o2 + 0.14, y - len / 2 + 0.3, C[1] - u, 0.12, 0.22, 0.25, f); }
      }
    }
    // ground garden: palms and trees on the flanks, cypress by the pool
    for (const [x, z, kind] of [[-17, -2, 'palm'], [-19, 3, 'tree'], [-14, 4, 'palm'], [-17, -11, 'tree'], [-21, -14, 'palm'], [-19, -20, 'tree'], [17, -3, 'palm'], [19, 3, 'tree'], [16, -11, 'tree'], [20, -14, 'palm'], [17, -17, 'palm'], [-1, -21, 'tree'], [12, -21, 'palm'], [-4, 9.6, 'cypress'], [4, 9.6, 'cypress'], [-11, 9.4, 'bush'], [11, 9.4, 'bush'], [23, -16, 'tree'], [-23, 6, 'palm'], [24, 8, 'palm'], [-22, -19, 'palm']]) plant(ctx.world, x, G, z, kind, 500 + x + z * 7, null);
    for (let x = -23; x <= 23; x += 3.1) if (Math.abs(x) > 5) plant(ctx.world, x, G, 21.2, hash(x, 5) > 0.5 ? 'palm' : 'tree', 700 + x, null);

    // ---------- temple of Marduk on the summit ----------
    {
      const y0 = topY(4), cz = C[1] - 0.6;
      g(C[0], y0 + 0.4, cz, 5.4, 0.8, 5.4, 0xa0724a); g(C[0], y0 + 0.95, cz, 4.8, 0.3, 4.8, GOLD);
      g(C[0], y0 + 2.6, cz, 4.2, 3.0, 4.2, 0x2a52b0); g(C[0], y0 + 4.3, cz, 4.6, 0.4, 4.6, GOLD);
      for (let x = -2.1; x <= 2.1; x += 0.84) { g(C[0] + x, y0 + 4.8, cz + 2.1, 0.5, 0.6, 0.5, GOLD); g(C[0] + x, y0 + 4.8, cz - 2.1, 0.5, 0.6, 0.5, GOLD); }
      for (const z of [-1.26, -0.42, 0.42, 1.26]) { g(C[0] - 2.1, y0 + 4.8, cz + z, 0.5, 0.6, 0.5, GOLD); g(C[0] + 2.1, y0 + 4.8, cz + z, 0.5, 0.6, 0.5, GOLD); }
      for (const x of [-1.5, -0.5, 0.5, 1.5]) g(C[0] + x, y0 + 2.3, cz + 2.2, 0.36, 2.4, 0.36, 0xf0d890);
      lamp(C[0], y0 + 2.1, cz + 2.14, 1.2, 1.9, 0.08, 0x1c1a24, 0xffc468);
      for (const x of [-1.6, 1.6]) lamp(C[0] + x, y0 + 3.3, cz + 2.14, 0.4, 0.8, 0.08, 0x1c1a24, 0xffd98a);
      for (const z of [-1, 1]) lamp(C[0] + 2.14, y0 + 3.0, cz + z, 0.08, 0.8, 0.4, 0x1c1a24, 0xffd98a);
      g(C[0], y0 + 0.55, C[1] + 2.2, 0.8, 0.5, 0.5, GOLD);                                  // lion-head spout
      lamp(C[0], y0 + 0.14, C[1] + 2.1, 1.4, 0.1, 2.3, 0x8fd4ff, 0x2f4c85, { alpha: 0.7 });
      U.beams.push({ m: lamp(C[0], y0 + 8.5, cz, 0.9, 9, 0.9, 0xfff0c0, 0xfff0c0, { alpha: 0 }), alpha: 0.26 });
    }
    // braziers and quay lanterns glow at night
    for (let k = 0; k < 5; k++) for (const [sx, sz] of [[1, 1], [-1, 1], [1, -1]]) {
      const x = C[0] + sx * (HW[k] - 0.4), z = C[1] + sz * (HW[k] - 0.4), y = topY(k);
      if (k === 4 && sx < 0 && sz > 0) continue;
      g(x, y + 0.35, z, 0.55, 0.7, 0.55, 0x6e5230); lamp(x, y + 0.85, z, 0.4, 0.3, 0.4, 0xc9803a, 0xff9a3a);
      U.beams.push({ m: lamp(x, y + 1.3, z, 1.1, 1.5, 1.1, 0xffb060, 0xffb060, { alpha: 0 }), alpha: 0.2 });
    }
    for (let x = -24; x <= 24; x += 3.2) {
      if (Math.abs(x) < 6 || Math.hypot(x - D.lantern[0], 10.4 - D.lantern[1]) < 3 || Math.hypot(x - D.fountain[0], 10.4 - D.fountain[1]) < 4) continue;
      g(x, G + 0.55, 10.4, 0.12, 1.1, 0.12, 0x3a2f27); lamp(x, G + 1.2, 10.4, 0.3, 0.32, 0.3, 0xe8dcb8, 0xffc468);
    }
    // statue of a second winged bull and the gate pillars beside the grand pool
    bull(ctx.world, 7.5, G, 9.3);
    for (const s of [-1, 1]) { g(s * 5.6, G + 1.2, 6.4, 0.9, 2.4, 0.9, 0x2a52b0); g(s * 5.6, G + 2.5, 6.4, 1.1, 0.2, 1.1, GOLD); lamp(s * 5.6, G + 2.8, 6.4, 0.4, 0.4, 0.4, 0xe8dcb8, 0xffb23a); }
    // right plaza fountain (not a difference)
    function fountain(parent, x, y, z, glowDay, glowNight, seed) {
      g(x, y + 0.2, z, 3.6, 0.4, 3.6, stone, parent); g(x, y + 0.45, z, 3.0, 0.1, 3.0, 0xb99a6a, parent);
      const w = lamp(x, y + 0.42, z, 2.8, 0.1, 2.8, glowDay, glowNight, { parent, pickable: parent !== ctx.world });
      g(x, y + 0.9, z, 0.4, 1.0, 0.4, stone, parent); g(x, y + 1.45, z, 0.9, 0.2, 0.9, stone, parent);
      for (let i = 0; i < 16; i++) {
        const m = lamp(x, y + 1.6, z, 0.1, 0.1, 0.1, 0xffffff, 0xbcd0f0, { alpha: 0.85, parent });
        U.drops.push({ m, cx: x, cy: y + 1.55, cz: z, ang: i / 16 * 6.283, vr: 0.5 + (i % 3) * 0.28, vy: 2.9 + (i % 4) * 0.35, ph: i / 16, T: 1.0 });
      }
      const grp = motion(o(x, y + 0.5, z)); parent.add(grp); const mats = [];
      for (const [bx, bz, sx, sz] of [[0, -1, 2, 0.08], [0, 1, 2, 0.08], [-1, 0, 0.08, 2], [1, 0, 0.08, 2]]) mats.push(lamp(bx * 0.5, 0, bz * 0.5, sx * 0.5, 0.05, sz * 0.5, 0xffffff, 0x9cb4d8, { alpha: 0.55, parent: grp }));
      U.rings.push({ g: grp, mats, ph: hash(seed, 3), grow: 1.1, axis: 'z' });
      return w;
    }
    fountain(ctx.world, 20, G, 8, 0x59b2ee, 0xffb040, 5);

    // ---------- people on terraces and quay, doves ----------
    const peopleCols = [0xc0392b, 0x2e7bd6, 0xe0b030, 0x2e9b4a, 0xb565d9, 0xf5f0e6];
    for (const [x1, z1, x2, z2, y, i] of [[-11.5, 6.6, 11.5, 6.6, topY(0), 0], [9, 3.95, -9, 3.95, topY(1), 1], [-6.5, 1.5, 6.5, 1.5, topY(2), 2], [-22, 10.1, -8, 10.1, G, 3], [8, 10.1, 22, 10.1, G, 4], [-4, -0.9, 4, -0.9, topY(3), 5]]) {
      const p = person(ctx.world, x1, y, z1, peopleCols[i]);
      U.people.push({ g: p, x1, z1, x2, z2, y, sp: 0.03 + 0.008 * i, ph: i * 1.3 });
    }
    for (let k = 0; k < 4; k++) {
      const d = motion(o(0, 0, 0)); ctx.world.add(d);
      g(0, 0, 0, 0.5, 0.2, 0.2, 0xf5f0e6, d); g(0.28, 0.06, 0, 0.18, 0.18, 0.16, 0xf5f0e6, d);
      const wings = [-1, 1].map((s) => { const p = motion(o(0, 0.08, s * 0.1)); d.add(p); g(0, 0.04, s * 0.32, 0.4, 0.05, 0.6, 0xe8e4da, p); return { p, s }; });
      U.doves.push({ g: d, wings, r: 14 + k * 2.4, w: (k % 2 ? -1 : 1) * (0.13 + 0.02 * k), y: 24 + k * 1.2, ph: k * 1.7 });
    }

    // ================= DIFFERENCES (every ~36 degrees around the ziggurat) =================
    // 0 (0 deg): date palms — fruit golden or red
    B(0, D.palms[0], G, D.palms[1], 'Date palm fruit: golden or red', 3.2, (d) => {
      for (const [x, z] of [[-0.9, -0.6], [1.1, 0.7]]) plant(d, x, 0, z, 'palm', 77 + x, variant ? 0xc0392b : 0xe0b030);
    }, variant);
    // 1 (36 deg): quay lanterns — warm white or cyan at night
    B(1, D.lantern[0], G, D.lantern[1], 'Quay lantern colour', 2.4, (d) => {
      for (const s of [-1, 1]) { g(s * 1.2, 0.8, 0, 0.14, 1.6, 0.14, 0x3a2f27, d); lamp(s * 1.2, 1.75, 0, 0.42, 0.44, 0.42, 0xe8dcb8, variant ? 0x4fd8ff : 0xffb23a, { parent: d, pickable: true }); }
    }, variant);
    // 2 (72 deg): moored reed boat — present or absent
    B(2, D.boat[0], WY, D.boat[1], 'Moored boat on the river', 2.6, (d) => {
      for (const s of [-1, 1]) g(s * 2.0, 0.5, 0.2, 0.16, 1.4, 0.16, 0x5a3f28, d);
      if (!variant) { const b = boat(d, true, 0x2e9b4a); b.position.set(0, 0.0, 0); }
    }, variant);
    // 3 (108 deg): winged bull on the bank — present or absent
    B(3, D.bull[0], G, D.bull[1], 'Winged bull statue by the pool', 2.4, (d) => {
      g(0, 0.2, 0, 1.6, 0.4, 2.6, 0x2a52b0, d);
      if (!variant) bull(d, 0, 0.2, 0);
      else g(0, 0.55, 0, 0.8, 0.3, 0.8, 0xd9b98a, d);
    }, variant);
    // 4 (144 deg): plaza fountain basin glow — amber or aqua at night
    B(4, D.fountain[0], G, D.fountain[1], 'Fountain basin glow', 3.2, (d) => {
      fountain(d, 0, 0, 0, 0x59b2ee, variant ? 0x35e0ff : 0xffb040, 6);
    }, variant);
    // 5 (180 deg): gardeners tending the beds — three or two
    B(5, D.gardeners[0], G, D.gardeners[1], 'Gardeners in the beds: three or two', 3.0, (d) => {
      for (let r = 0; r < 3; r++) for (let k = 0; k < 5; k++) g(-1.6 + k * 0.8, 0.25, -1.0 + r * 1.0, 0.55, 0.3 + hash(k, r) * 0.2, 0.55, pick(FLOWER, k, r), d);
      const cs = [0xc0392b, 0x2e7bd6, 0xe0b030];
      for (const [i, x, z] of [[0, -1.4, 0.5], [1, 0.2, -0.5], [2, 1.5, 0.5]].slice(0, variant ? 2 : 3)) person(d, x, 0.4, z, cs[i]);
    }, variant);
    // 6 (222 deg): guard tower window — amber or green at night
    B(6, D.tower[0], G, D.tower[1], 'Guard tower window colour', 3.2, (d) => {
      g(0, 1.8, 0, 2.0, 3.6, 2.0, 0xc99a6b, d); g(0, 3.75, 0, 2.4, 0.3, 2.4, GOLD, d);
      for (const x of [-0.8, 0, 0.8]) g(x, 4.1, 1.0, 0.45, 0.5, 0.3, 0xc99a6b, d);
      lamp(0, 2.3, 1.03, 0.6, 0.8, 0.08, 0x3a2418, variant ? 0x6bff8a : 0xffb23a, { parent: d, pickable: true });
    }, variant);
    // 7 (255 deg): flower bed — pink or yellow
    B(7, D.flowers[0], G, D.flowers[1], 'Flower bed: pink or yellow', 2.8, (d) => {
      g(0, 0.2, 0, 4.2, 0.3, 2.6, 0x8a6a45, d);
      for (let r = 0; r < 4; r++) for (let k = 0; k < 7; k++) g(-1.8 + k * 0.6, 0.55, -0.9 + r * 0.6, 0.38, 0.4, 0.38, variant ? 0xf2c83a : 0xe85a9a, d);
    }, variant);
    // 8 (295 deg): watch beacon — red or blue at night
    B(8, D.beacon[0], G, D.beacon[1], 'Watch beacon colour', 3.0, (d) => {
      g(0, 2.2, 0, 1.4, 4.4, 1.4, 0x2a52b0, d); g(0, 4.5, 0, 1.9, 0.3, 1.9, GOLD, d);
      U.flames.push(lamp(0, 5.0, 0, 0.7, 0.7, 0.7, 0xd9d6cc, variant ? 0x7fd0ff : 0xff4a2a, { parent: d, pickable: true }));
    }, variant);
    // 9 (330 deg): side waterfall on tier 1 — flowing or dry
    B(9, D.fall[0], topY(0), D.fall[1], 'Terrace waterfall: flowing or dry', 2.8, (d) => {
      if (!variant) { fall(d, 'x', 0, 0, TH, 0.1, 1.8, 0.12, 60); g(1.15, 0.0, 0, 2.3, 0.14, 3.3, stone, d); }
      else {
        g(0.25, 1.7, 0, 0.5, 3.4, 1.9, 0x8a6a45, d);
        g(1.15, 0.0, 0, 2.3, 0.14, 3.3, stone, d);
        for (let i = 0; i < 5; i++) g(0.6 + hash(i, 3) * 1.2, 0.18, (hash(i, 5) - 0.5) * 2.4, 0.3, 0.2, 0.3, 0x9a9588, d);
      }
      g(0.1, TH + 0.1, 0, 0.7, 0.5, 1.2, GOLD, d);                                          // lion spout
    }, variant);

    // night-only differences: they exist all day; they simply look identical until dusk
    for (const i of [1, 4, 6, 8]) { const diff = U.diffs[i]; diff.nightOnly = true; diff.hintPhase = 0.86; diff.g.userData.motion = true; }

    U.localLights = [];
    for (const [x, y, z, color, power] of [[0, 20, -2, 0xffd9a0, 90], [-9, 10, 6, 0xffc27a, 60], [9, 10, 6, 0xffc27a, 60], [0, 5, 10, 0xffc27a, 55], [-16, 4, 8, 0x9ad8ff, 40], [20, 4, 8, 0xffc27a, 40]]) {
      const l = new PointLight(color, 0, 26, 1.5);
      l.position.set(x, y, z); l.userData.nightPower = power; ctx.world.add(l); U.localLights.push(l);
    }
  }
  const world_ = (ctx) => ctx.world.userData;

  // Daily story (300 s = one day): water runs all the time — streaks race down every fall, rings spread in the pools, ripples drift
  // along the river, fountains throw spray; boats sail up and down, gardeners and visitors walk the terraces, doves circle the temple;
  // after dusk lanterns, windows and braziers glow, lamplight glints on the water.
  function animate(world, time, reduced = false) {
    const u = world.userData, t = reduced ? time * 0.4 : time;
    const phase = (((time / 300) % 1) + 1) % 1;
    const day = phase > 0.24 && phase < 0.8;
    const nightF = phase >= 0.5 ? smooth(0.74, 0.84, phase) : 1 - smooth(0.2, 0.27, phase);
    for (const r of u.ripples || []) {
      const x = (((r.x0 + t * r.sp + 26) % 52) + 52) % 52 - 26;
      r.m.position.x = x;
      r.m.material.opacity = r.a * (0.2 + 0.8 * Math.pow(0.5 + 0.5 * Math.sin(t * r.fl + r.ph), 2)) * (1 - 0.5 * nightF);
    }
    for (const q of u.glints || []) {
      const s = Math.max(0, Math.sin(t * q.f + q.ph));
      q.m.material.opacity = q.a * s * s * s * (day ? 1 : 0.35 + 0.65 * nightF);
    }
    for (const s of u.streaks || []) {
      const p = ((t * s.sp + s.ph) % (s.h - s.len + 0.2 + 0.4));
      s.m.position.y = s.top - s.len / 2 - Math.min(p, s.h - s.len);
      s.m.material.opacity = 0.88 * (p > s.h - s.len ? 0 : 1);
    }
    for (const f of u.foam || []) {
      const k = 0.5 + 0.5 * Math.sin(t * 3.1 + f.ph);
      f.m.scale.setScalar(0.4 + 0.35 * k); f.m.position.y = f.base[1] + 0.1 * k; f.m.material.opacity = 0.35 + 0.35 * k;
    }
    for (const r of u.rings || []) {
      const fr = ((t * 0.42 + r.ph) % 1 + 1) % 1, s = 0.5 + fr * r.grow;
      r.g.scale.set(s, 1, s);
      for (const m of r.mats) m.material.opacity = (1 - fr) * 0.62 * (1 - 0.3 * nightF);
    }
    for (const d of u.drops || []) {
      const f = ((t * 0.9 + d.ph) % 1 + 1) % 1, uu = f * d.T * 1.2;
      d.m.position.set(d.cx + Math.cos(d.ang) * d.vr * uu, d.cy + d.vy * uu - 4.9 * uu * uu * 0.62, d.cz + Math.sin(d.ang) * d.vr * uu);
      d.m.material.opacity = 0.85 * (1 - f * 0.4);
    }
    for (const b of u.ships || []) {
      const a = t * b.w + b.ph, x = Math.sin(a) * b.A, dirc = Math.cos(a);
      b.g.position.set(x, WY - 0.06 + Math.sin(t * 1.7 + b.ph) * 0.05, b.z);
      b.g.rotation.y = Math.PI * (1 - smooth(-0.12, 0.12, dirc)) * -1;
      b.g.rotation.z = Math.sin(t * 1.3 + b.ph) * 0.03;
      b.wake.forEach((m, k) => { m.material.opacity = 0.55 * (0.4 + 0.6 * Math.sin(t * 2.4 - k * 0.9 + b.ph) ** 2) * Math.min(1, Math.abs(dirc) * 3) * (1 - k * 0.14); });
    }
    for (const p of u.people || []) {
      const a = t * p.sp + p.ph, f = 0.5 + 0.5 * Math.sin(a), dir = Math.cos(a) >= 0 ? 1 : -1;
      const x = p.x1 + (p.x2 - p.x1) * f, z = p.z1 + (p.z2 - p.z1) * f;
      p.g.position.set(x, p.y + Math.abs(Math.sin(t * 4 + p.ph)) * 0.06, z);
      p.g.rotation.y = (p.x2 - p.x1) * dir >= 0 ? 0 : Math.PI;
    }
    for (const b of u.doves || []) {
      b.g.visible = day;
      const a = t * b.w + b.ph;
      b.g.position.set(C[0] + Math.cos(a) * b.r, b.y + Math.sin(t * 0.7 + b.ph) * 0.9, C[1] + Math.sin(a) * b.r);
      b.g.rotation.y = Math.atan2(-Math.sign(b.w) * Math.cos(a), -Math.sign(b.w) * Math.sin(a));
      for (const w of b.wings) w.p.rotation.x = w.s * Math.sin(t * 7 + b.ph) * 0.5;
    }
    for (const bm of u.beams || []) { bm.m.material.opacity = nightF * bm.alpha; bm.m.visible = nightF > 0.01; }
  }

  function updateLighting(world, phase, { glow = 0 } = {}) {
    const u = world.userData;
    for (const l of u.wallLights || []) l.m.material.color.set(l.day).lerp(new Color(l.night), glow);
    for (const l of u.localLights || []) l.intensity = glow * (l.userData.nightPower || 24);
  }

  return { build, animate, height, water: () => false, updateLighting };
}
