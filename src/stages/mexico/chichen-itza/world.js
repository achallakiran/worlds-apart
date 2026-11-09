/*
 * Mexico — "Chichen Itza" (mexico-chichen-itza). First scenery of Mexico.
 * Stage package: world.js + stage.json + differences.json + music.mp3.
 *
 * El Castillo (the Temple of Kukulkan) rises in the middle of a dry-grass plaza: nine terraces, four stairways with
 * serpent-headed balustrades and a temple on top. Terrace faces are built from a traced photo of the real stone (ledges and
 * recessed panels, see tools/stages/extract_facade.py). Around it: the Temple of the Warriors with its colonnade, the Great
 * Ball Court, El Caracol observatory, the skull platform, a sacred cenote and the jungle. In the afternoon the serpent of
 * light slides down the balustrade. The ten differences are spread around the pyramid; four are lights that only differ at night.
 */
/*FACADE*/const FACADE = {strips:5,cols:28,rows:4,t:[
'jwqprlehcmlhhovxqgnmmnlndgaa',
'vononmiknjqnuzzzxrotxvpvtnaa',
'prrolssstnjirvwssuttvwxyzvea',
'ttsprnijkemlswsnjojpghrtnlpo',
'qqjbjjhknnjkroptsvnruutoqlrw',
'qllkmruqsnqtvxwuqurstvwvuxxs',
'mqvvutoljilooqokjnooqrtuswut',
'kkmjhkjfhlnnoiqpkokoljhjlldf',
'bgnjjqlnjinpmfmuolfjonnjkqjm',
'iknrqoppkruztstpmllotsrooqqs',
'qqssqolhhliuuogkopppqqptuvsv',
'okfpqgblilhqzxpnqrqmriejqplj',
'wlmsstriepmosvxwqorlqspvpmou',
'rwtqpoploxzzzxzsqsuvuvutrqsx',
'olljghientqtqpomnmoqpnopopnj',
'mrtjitojsmlpqulorvtrrsporkjk',
'vtuxunkktljlrzuuuuppqxyyxqou',
'sttusqsuwxvwvwqrsssuwyxstuvt',
'ljfjkekprropmihiijijksoebhjj',
'daabaapvwsrnmidcgjhhgiiaaahg'
]};/*ENDFACADE*/
function createStage(E) {
  const { Mesh, BasicMaterial, PointLight, Color, hash } = E;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const smooth = (a, b, v) => { const t = clamp((v - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };
  const CZ = -3;                          // pyramid centre (z)
  const G = 2.0;                          // plaza level
  const W0 = 10.5, INSET = 0.85, TH = 1.15, TIERS = 9;
  const TOP = G + TH * TIERS;             // top platform level
  const CEN = [18, 5], CEN_R = 3.7;       // sacred cenote
  const isCenote = (x, z) => Math.hypot(x - CEN[0], z - CEN[1]) < CEN_R + 1.4;

  function height(x, z) {
    const r = Math.hypot(x, z);
    const d = Math.hypot(x - CEN[0], z - CEN[1]);
    if (d < CEN_R) return 0.9;
    if (d < CEN_R + 1.4) return 2.5;
    return G + 0.9 * smooth(19, 27, r) * (0.5 + 0.5 * Math.sin(x * 0.4) * Math.cos(z * 0.35));
  }
  const D = {
    cenote: [CEN[0], CEN[1]], torch: [16, 14], stall: [5, 16], iguana: [-5, 16], columns: [-17, 15],
    ceiba: [-18, 0], caracol: [-13, -10], parrots: [-5, -19], skull: [3, -16], hoop: [13, -16.4],
  };

  function build(ctx, variant) {
    const { box: g, group: o, makeDiff: B, walker, path, world, cube } = ctx;
    const U = world.userData;
    U.wallLights = []; U.beams = []; U.parrots = []; U.serpent = []; U.flames = [];
    const pick = (arr, a, b) => arr[Math.floor(hash(a, b) * arr.length)];
    const motion = (grp) => { grp.userData.motion = true; return grp; };
    const mix = (a, b, t) => { const r = (a >> 16 & 255) + ((b >> 16 & 255) - (a >> 16 & 255)) * t, gg = (a >> 8 & 255) + ((b >> 8 & 255) - (a >> 8 & 255)) * t, bl = (a & 255) + ((b & 255) - (a & 255)) * t; return (r | 0) << 16 | (gg | 0) << 8 | (bl | 0); };

    function lamp(x, y, z, sx, sy, sz, dayColor, nightColor, opts = {}) {
      const m = new Mesh(cube, new BasicMaterial(opts.alpha !== undefined ? { color: dayColor, transparent: true, opacity: opts.alpha, depthWrite: false } : { color: dayColor }));
      m.position.set(x, y, z); m.scale.set(sx, sy, sz);
      m.userData.ownedMaterial = true; m.userData.motion = true;
      if (!opts.pickable) m.raycast = () => {};
      (opts.parent || world).add(m);
      U.wallLights.push({ m, day: dayColor, night: nightColor });
      return m;
    }

    // ---------- ground: dry golden grass, green patches, jungle bank, stone rim and water of the cenote ----------
    const DRY = [0xc8b95e, 0xbfae52, 0xd2c46a, 0xb9a74c], GREEN = [0x86b04a, 0x7aa545, 0x93ba52], FOREST = [0x2f6a35, 0x3a7d44, 0x275c30, 0x438a4c];
    const SOIL = [0x8a7656, 0x7e6a4c, 0x927f5e];
    for (let x = -29; x <= 29; x++) for (let z = -25; z <= 25; z++) {
      if ((x / 30.5) ** 4 + (z / 26.5) ** 4 > 1.18 + hash(x, z) * 0.06) continue;
      const h = height(x, z), bottom = -2.4 - hash(x, z) * 0.7, r = Math.hypot(x, z), d = Math.hypot(x - CEN[0], z - CEN[1]);
      const water = d < CEN_R, rim = !water && d < CEN_R + 1.4;
      g(x, (bottom + h) / 2 - 0.1, z, 1.025, h - bottom - 0.2, 1.025, rim || water ? 0x9a9382 : pick(SOIL, x, z));
      let top;
      if (water) top = pick([0x2fb4b8, 0x3cc0c4, 0x28a8ae], x, z);
      else if (rim) top = pick([0xb8b09c, 0xa8a08c], x, z);
      else if (r > 21) top = pick(FOREST, x, z);
      else top = hash(x + 3, z + 8) > 0.72 ? pick(GREEN, x, z) : pick(DRY, x, z);
      g(x, h - 0.08, z, 1.03, 0.2, 1.03, top);
    }

    // ---------- jungle ring ----------
    for (let x = -28; x <= 28; x += 1.6) for (let z = -24; z <= 24; z += 1.6) {
      const px = x + hash(x, z) * 1.1, pz = z + hash(z, x) * 1.1, r = Math.hypot(px, pz);
      if (r < 21.5 || isCenote(px, pz) || hash(x + 5, z + 2) < 0.25) continue;
      const h = height(px, pz), k = hash(z, x);
      if (k > 0.86) { g(px, h + 1.7, pz, 0.3, 3.4, 0.3, 0x7a5a3a); g(px, h + 3.5, pz, 2.4, 0.2, 0.5, 0x2f8a3c); g(px, h + 3.5, pz, 0.5, 0.2, 2.4, 0x2f8a3c); g(px, h + 3.75, pz, 0.7, 0.5, 0.7, 0x3da04a); }
      else { g(px, h + 0.7, pz, 0.3, 1.4, 0.3, 0x6b4a33); g(px, h + 1.9, pz, 1.9, 1.3, 1.9, pick(FOREST, px, pz)); g(px + 0.1, h + 2.8, pz, 1.2, 0.9, 1.2, 0x2a5f35); }
    }

    // ---------- EL CASTILLO ----------
    const STONE_LO = 0x74726a, STONE_HI = 0xcdcabd;
    const OUT = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    const tierTone = (k, side, c, r) => {
      const strip = (k + side) % FACADE.strips, ch = FACADE.t[strip * FACADE.rows + r][(c + side * 7) % FACADE.cols];
      return (ch.charCodeAt(0) - 97) / 25;
    };
    for (let k = 0; k < TIERS; k++) {
      const w = W0 - INSET * k, yb = G + TH * k, yc = yb + TH / 2;
      g(0, yc, CZ, 2 * w, TH, 2 * w, 0x8f8d82);
      g(0, yb + TH - 0.06, CZ, 2 * w + 0.12, 0.14, 2 * w + 0.12, 0xc6c3b6);          // lighter ledge
      for (let s = 0; s < 4; s++) {
        const [ox, oz] = OUT[s], cw = 2 * w / FACADE.cols;
        for (let c = 0; c < FACADE.cols; c++) {
          const lat = -w + (c + 0.5) * cw;
          if (Math.abs(lat) < 1.95) continue;                                          // the stairway
          for (let r = 0; r < FACADE.rows; r++) {
            const t = tierTone(k, s, c, r), dep = 0.05 + 0.1 * t, rh = (TH - 0.2) / FACADE.rows;
            const a = w + dep / 2 + 0.01, y = yb + 0.08 + rh * (FACADE.rows - 1 - r + 0.5);
            const px = ox ? ox * a : lat, pz = CZ + (oz ? oz * a : lat);
            g(px, y, pz, ox ? dep : cw + 0.02, rh + 0.01, oz ? dep : cw + 0.02, mix(STONE_LO, STONE_HI, 0.15 + 0.8 * t));
          }
        }
      }
    }
    // stairways with balustrades (side s: outward vector OUT[s]); ramp passes through the terrace corners
    const rampY = (a) => G + TH + (W0 - a) * (TH / INSET);
    for (let s = 0; s < 4; s++) {
      const [ox, oz] = OUT[s];
      const put = (a, lat, y0, y1, sa, sl, c) => g(ox ? ox * a : lat, (y0 + y1) / 2, CZ + (oz ? oz * a : lat), ox ? sa : sl, y1 - y0, oz ? sa : sl, c);
      for (let i = 0; i < 38; i++) {
        const a = 11.1 - i * 0.2, top = Math.min(TOP, rampY(a - 0.1));
        put(a, 0, G, top, 0.2, 3.5, i % 2 ? 0xb1aea0 : 0xa3a094);
      }
      for (const sg of [-1, 1]) for (let i = 0; i < 19; i++) {
        const a = 11.0 - i * 0.4, top = Math.min(TOP + 0.5, rampY(a - 0.2) + 0.55);
        put(a, sg * 2.3, G, top, 0.4, 0.95, 0xc6c3b5);
      }
      if (s < 2) for (const sg of [-1, 1]) {                                         // serpent heads at the foot
        put(11.6, sg * 2.3, G, G + 1.0, 1.1, 1.0, 0xb7af9a); put(11.9, sg * 2.3, G + 0.9, G + 1.5, 0.7, 0.8, 0xc9c2ad);
        for (const t of [-0.3, 0.3]) put(12.15, sg * 2.3 + t, G, G + 0.35, 0.25, 0.14, 0xf2eee0);
        put(11.95, sg * 2.3 + 0.38, G + 1.2, G + 1.4, 0.12, 0.1, 0x222222); put(11.95, sg * 2.3 - 0.38, G + 1.2, G + 1.4, 0.12, 0.1, 0x222222);
      }
    }
    // the serpent of light: zig-zag shadow triangles down the east balustrade of the +z stairway (afternoon only), head at the foot
    for (let i = 0; i < 12; i++) {
      const a = 10.5 - i * 0.55, y = rampY(a - 0.2) + 0.5, hh = 0.55 + 0.5 * (i % 2);
      const m = lamp(2.3 + 0.5, y - (i % 2 ? 0 : 0.2), CZ + a, 0.08, hh, 0.55, 0x1a1a1a, 0x1a1a1a, { alpha: 0 });
      U.serpent.push({ m, k: i });
    }
    U.serpent.push({ m: lamp(2.3 + 0.5, G + 0.7, CZ + 11.4, 0.1, 0.9, 1.0, 0x1a1a1a, 0x1a1a1a, { alpha: 0 }), k: 12 });
    // temple on top: walls, doorways (glow at night), frieze, cornice, crest
    {
      const y0 = TOP, ts = 5.4;
      g(0, y0 + 1.5, CZ, ts, 3.0, ts, 0xaeab9d);
      for (let s = 0; s < 4; s++) {
        const [ox, oz] = OUT[s], a = ts / 2 + 0.05;
        lamp(ox * a, y0 + 1.15, CZ + oz * a, ox ? 0.1 : (s === 0 ? 2.6 : 1.4), 2.2, oz ? 0.1 : (s === 0 ? 2.6 : 1.4), 0x1d1a16, 0xffc468);
        if (s === 0 || s === 1) for (const sg of [-1, 1]) g(ox ? ox * (a + 0.1) : sg * (s === 0 ? 0.95 : 0.0), y0 + 1.15, CZ + (oz ? oz * (a + 0.1) : sg * 0.95), 0.4, 2.3, 0.4, 0xd2cab4);
        for (let k = 0; k < 6; k++) { const lat = -2.2 + k * 0.88; g(ox ? ox * (a + 0.03) : lat, y0 + 2.7, CZ + (oz ? oz * (a + 0.03) : lat), ox ? 0.08 : 0.5, 0.45, oz ? 0.08 : 0.5, 0x8d8573); }
      }
      g(0, y0 + 3.15, CZ, ts + 0.7, 0.3, ts + 0.7, 0xcfc8b2);
      g(0, y0 + 3.75, CZ, ts - 0.4, 0.9, ts - 0.4, 0xb0a892);
      for (let s = 0; s < 4; s++) for (let k = 0; k < 7; k++) { const [ox, oz] = OUT[s], lat = -2.1 + k * 0.7, a = (ts - 0.4) / 2 + 0.04; g(ox ? ox * a : lat, y0 + 3.75, CZ + (oz ? oz * a : lat), ox ? 0.08 : 0.4, 0.5, oz ? 0.08 : 0.4, 0x7f7968); }
      g(0, y0 + 4.35, CZ, ts, 0.3, ts, 0xcfc8b2);
      g(0, y0 + 4.65, CZ, ts - 1.4, 0.3, ts - 1.4, 0xb8b09b);
    }

    // ---------- the Temple of the Warriors and the Thousand Columns ----------
    for (let k = 0; k < 3; k++) g(-17, G + 0.5 + k * 0.9, 1, 9 - k * 1.6, 0.9, 9 - k * 1.6, [0xa8a08c, 0xb4ac98, 0xbfb7a2][k]);
    g(-17, G + 3.9, 1, 3.4, 1.5, 3.4, 0xc4bca7); g(-17, G + 4.8, 1, 4.0, 0.3, 4.0, 0xd2cab4);
    lamp(-14.6, G + 3.8, 1, 0.1, 1.1, 1.4, 0x1d1a16, 0xffc468);
    for (let r = 0; r < 5; r++) for (let c = 0; c < 6; c++) {
      const x = -14.6 + c * 1.4, z = 7.5 + r * 1.4;
      g(x, G + 1.0, z, 0.5, 2.0, 0.5, pick([0xb8b09b, 0xaaa38e, 0xc4bca7], c, r)); g(x, G + 2.1, z, 0.7, 0.2, 0.7, 0xd2cab4);
    }
    g(-11, G + 0.4, 5.2, 8.6, 0.8, 0.5, 0xa8a08c);

    // ---------- Great Ball Court ----------
    for (const sz of [-1, 1]) {
      const z = -14 + sz * 3.6;
      g(13, G + 1.6, z, 15, 3.2, 1.6, 0xb4ac98); g(13, G + 3.3, z, 15.4, 0.25, 1.9, 0xcfc8b2);
      g(13, G + 0.6, z - sz * 1.1, 15, 1.2, 0.8, 0xa8a08c);
      for (let k = 0; k < 15; k += 2) g(6 + k, G + 1.6, z + sz * 0.82, 0.8, 0.9, 0.06, 0x8d8573);
    }
    g(13, G + 3.5, -14 - 3.6 - 1.2, 3.4, 2.2, 2.2, 0xb8b09b); g(13, G + 4.7, -14 - 3.6 - 1.2, 3.8, 0.3, 2.6, 0xcfc8b2);
    path(0, 6, 0, 19, 2.4);

    // ---------- El Caracol (round observatory) ----------
    for (let k = 0; k < 14; k++) { const a = k / 14 * Math.PI * 2; g(D.caracol[0] + Math.cos(a) * 2.2, G + 2.0, D.caracol[1] + Math.sin(a) * 2.2, 1.1, 4.0, 1.1, pick([0xb8b09b, 0xaaa38e], k, 2)); }
    for (let k = 0; k < 10; k++) { const a = k / 10 * Math.PI * 2; g(D.caracol[0] + Math.cos(a) * 1.4, G + 4.5, D.caracol[1] + Math.sin(a) * 1.4, 1.0, 1.1, 1.0, 0xc4bca7); }
    g(D.caracol[0], G + 5.3, D.caracol[1], 2.6, 0.6, 2.6, 0xcfc8b2);
    g(D.caracol[0], G + 0.5, D.caracol[1], 8.6, 1.0, 8.6, 0xa8a08c);

    // ---------- skull platform ----------
    g(D.skull[0], G + 0.5, D.skull[1], 6.5, 1.0, 3.4, 0xb4ac98);
    for (let r = 0; r < 3; r++) for (let c = 0; c < 9; c++) g(D.skull[0] - 2.8 + c * 0.7, G + 0.35 + r * 0.3, D.skull[1] + 1.72, 0.45, 0.22, 0.06, 0xf2eee0);

    // ---------- plaza life: tourists, parrots ----------
    walker(-12, 12.2, 12, 12.2, 0xd9a441, 1); walker(12.5, -3, 12.5, 10, 0x2f6f8f, 2); walker(-12.5, 3, -12.5, 14, 0xc0392b, 3); walker(-6, 14.5, 7, 14.5, 0x2e9b4a, 4);
    for (let k = 0; k < 3; k++) {
      const bird = motion(o(0, 0, 0)), c = [0x2fae3a, 0xd8362b, 0xe8c030][k];
      g(0, 0, 0, 0.9, 0.35, 0.4, c, bird); g(0.55, 0.12, 0, 0.35, 0.32, 0.32, c, bird); g(0.8, 0.08, 0, 0.16, 0.14, 0.14, 0xf2d9a0, bird); g(-0.8, -0.05, 0, 0.9, 0.1, 0.14, 0x2a8fd0, bird);
      const wings = [-1, 1].map((s) => { const p = motion(o(0, 0.1, s * 0.2)); bird.add(p); g(0, 0.05, s * 0.55, 0.45, 0.07, 1.1, c, p); g(0.2, 0.06, s * 0.55, 0.15, 0.08, 1.0, 0x2358c9, p); return { p, s }; });
      U.parrots.push({ g: bird, wings, r: 15 + k * 3, w: (k % 2 ? -1 : 1) * (0.26 + 0.04 * k), y: 25 + k * 2.4, ph: k * 2.1 });
    }

    // ================= DIFFERENCES (spread around the pyramid) =================
    // 0 (15 deg): cenote water — turquoise or emerald
    B(0, D.cenote[0], 0.3, D.cenote[1], 'Cenote water: turquoise or emerald', 3.6, (d) => {
      const c = variant ? [0x1f9a5a, 0x28ad66] : [0x3cc8d0, 0x2fb4b8];
      for (let x = -3; x <= 3; x++) for (let z = -3; z <= 3; z++) if (Math.hypot(x, z) < 3.5) g(x, 0.62, z, 1.0, 0.1, 1.0, c[(x + z) & 1], d);
    }, variant);

    // 1 (41 deg): plaza torches — orange or green at night
    B(1, D.torch[0], G, D.torch[1], 'Plaza torch colour', 2.6, (d) => {
      for (const k of [-1, 0, 1]) {
        g(k * 1.2, 0.7, -0.4 * k, 0.14, 1.4, 0.14, 0x3a2f27, d);
        lamp(k * 1.2, 1.55, -0.4 * k, 0.4, 0.44, 0.4, 0xd9a43a, variant ? 0x6bff8a : 0xff8a2a, { parent: d, pickable: true });
      }
    }, variant);

    // 2 (73 deg): market stall lantern — warm or pink at night
    B(2, D.stall[0], G, D.stall[1], 'Market stall lantern colour', 2.6, (d) => {
      g(0, 0.5, 0, 2.4, 1.0, 1.1, 0x8a6a46, d);
      for (const [x, c] of [[-0.8, 0xd33b3b], [0, 0x2e9b4a], [0.8, 0xe0b030]]) g(x, 1.2, 0.1, 0.5, 0.4, 0.45, c, d);
      for (const s of [-1, 1]) g(s * 1.2, 1.5, -0.45, 0.12, 3.0, 0.12, 0x6b4a33, d);
      for (let k = 0; k < 5; k++) g(-1.2 + k * 0.6, 3.05, -0.1, 0.6, 0.15, 1.5, k % 2 ? 0xd33b3b : 0xf2eee0, d);
      lamp(0, 2.6, 0.5, 0.36, 0.42, 0.36, 0xe8dcb8, variant ? 0xff5ac8 : 0xffd27a, { parent: d, pickable: true });
    }, variant);

    // 3 (107 deg): iguana on a rock — present or absent
    B(3, D.iguana[0], G, D.iguana[1], 'Iguana on the rock: present or absent', 2.0, (d) => {
      g(0, 0.35, 0, 1.6, 0.7, 1.2, 0x8d8573, d); g(0.1, 0.8, 0.1, 1.0, 0.25, 0.8, 0x9b937f, d);
      if (!variant) { g(0.1, 1.05, 0.1, 0.8, 0.2, 0.3, 0x5fa33a, d); g(0.55, 1.12, 0.1, 0.3, 0.22, 0.26, 0x6fb844, d); g(-0.5, 1.0, 0.1, 0.5, 0.1, 0.12, 0x4f8f30, d); g(0.7, 1.2, 0.1, 0.08, 0.08, 0.06, 0x111111, d); }
    }, variant);

    // 4 (139 deg): colonnade — eight or six columns
    B(4, D.columns[0], G, D.columns[1], "Warriors' columns: eight or six", 3.6, (d) => {
      g(0, 0.2, 0, 8.6, 0.4, 1.8, 0xa8a08c, d);
      for (let k = 0; k < (variant ? 6 : 8); k++) { const x = -3.5 + k * (variant ? 1.4 : 1.0); g(x, 1.3, 0, 0.5, 1.8, 0.5, 0xb8b09b, d); g(x, 2.3, 0, 0.7, 0.2, 0.7, 0xd2cab4, d); }
    }, variant);

    // 5 (180 deg): ceiba tree — leafy or bare
    B(5, D.ceiba[0], G, D.ceiba[1], 'Ceiba tree: leafy or bare', 3.6, (d) => {
      g(0, 1.6, 0, 0.7, 3.2, 0.7, 0x7a6a56, d); g(0.6, 3.4, 0, 1.6, 0.3, 0.3, 0x7a6a56, d); g(-0.6, 3.6, 0.3, 1.5, 0.3, 0.3, 0x7a6a56, d);
      if (!variant) for (const [x, y, z, s] of [[0, 4.4, 0, 3.4], [1.3, 3.9, 0.3, 2.2], [-1.3, 4.1, -0.2, 2.4], [0.2, 5.4, 0, 2.0]]) g(x, y, z, s, 1.1, s, [0x3a7d44, 0x438a4c][(x > 0) | 0], d);
      else for (const [x, y] of [[1.6, 4.1], [-1.6, 4.3], [0, 5.0]]) g(x, y, 0, 0.14, 1.2, 0.14, 0x6a5a46, d);
    }, variant);

    // 6 (217 deg): Caracol window — amber or violet at night
    B(6, D.caracol[0] + 1.6, G + 3.0, D.caracol[1] + 1.8, 'Caracol window light colour', 1.8, (d) => {
      lamp(0, 0.5, 0.0, 0.6, 0.8, 0.12, 0x1d1a16, variant ? 0xb06bff : 0xffb23a, { parent: d, pickable: true });
      g(0, 1.0, 0, 0.9, 0.12, 0.2, 0xcfc8b2, d);
    }, variant);

    // 7 (255 deg): parrots on a branch — three or two
    B(7, D.parrots[0], G, D.parrots[1], 'Parrots on the branch: three or two', 3.0, (d) => {
      g(0, 1.6, 0, 0.35, 3.2, 0.35, 0x6b4a33, d); g(0.8, 3.0, 0, 2.2, 0.2, 0.2, 0x6b4a33, d); g(0, 3.6, 0, 3.4, 1.1, 3.0, 0x2f6a35, d);
      const cs = [0xd8362b, 0x2fae3a, 0xe8c030];
      for (const [i, x] of [[0, 0.4], [1, 1.0], [2, 1.6]].slice(0, variant ? 2 : 3)) { g(x, 3.25, 0, 0.3, 0.4, 0.26, cs[i], d); g(x + 0.12, 3.5, 0, 0.2, 0.2, 0.2, cs[i], d); g(x - 0.12, 3.0, 0, 0.1, 0.4, 0.08, 0x2a8fd0, d); }
    }, variant);

    // 8 (281 deg): skull platform brazier — red or white at night
    B(8, D.skull[0] + 2.2, G + 1.0, D.skull[1] - 0.2, 'Skull platform brazier colour', 2.0, (d) => {
      g(0, 0.2, 0, 0.9, 0.4, 0.9, 0x6b6a60, d);
      U.flames.push(lamp(0, 0.65, 0, 0.6, 0.5, 0.6, 0xc9803a, variant ? 0xf2f6ff : 0xff4a2a, { parent: d, pickable: true }));
      const bc = variant ? 0xf2f6ff : 0xff4a2a; U.beams.push({ m: lamp(0, 3.2, 0, 0.5, 5, 0.5, bc, bc, { parent: d, alpha: 0 }), alpha: 0.25 });
    }, variant);

    // 9 (308 deg): ball court hoop — stone or gold
    B(9, D.hoop[0], G + 3.1, D.hoop[1], 'Ball court hoop: stone or gold', 2.0, (d) => {
      const c = variant ? 0xe0b030 : 0xb8b09b;
      g(0, 0.5, 0, 1.4, 0.3, 0.3, c, d); g(0, -0.5, 0, 1.4, 0.3, 0.3, c, d); g(-0.6, 0, 0, 0.3, 1.0, 0.3, c, d); g(0.6, 0, 0, 0.3, 1.0, 0.3, c, d);
      g(0, 0, -0.2, 0.9, 0.7, 0.1, 0x1d1a16, d);
    }, variant);

    // night-only differences exist all day; they look identical until dusk
    for (const i of [1, 2, 6, 8]) { const diff = U.diffs[i]; diff.nightOnly = true; diff.hintPhase = 0.86; diff.g.userData.motion = true; }

    U.localLights = [];
    for (const [x, y, z, color, power] of [[0, 10, 8, 0xffd9a0, 80], [-14, 6, 8, 0xffc27a, 40], [12, 6, -10, 0xffc27a, 36], [0, 18, CZ, 0xfff0c0, 40]]) {
      const l = new PointLight(color, 0, 26, 1.5);
      l.position.set(x, y, z); l.userData.nightPower = power; world.add(l); U.localLights.push(l);
    }
  }

  // Daily story (300 s = one day): parrots wheel over the plaza, tourists walk, and in the afternoon the serpent of light
  // creeps down the balustrade of El Castillo; after dusk the temple doors, torches and braziers glow.
  function animate(world, time, reduced = false) {
    const u = world.userData;
    const phase = (((time / 300) % 1) + 1) % 1;
    const day = phase > 0.24 && phase < 0.8;
    for (const b of u.parrots || []) {
      b.g.visible = day;
      const a = time * b.w + b.ph;
      b.g.position.set(Math.cos(a) * b.r, b.y + Math.sin(time * 0.9 + b.ph) * 0.8, CZ + Math.sin(a) * b.r);
      b.g.rotation.y = Math.atan2(-Math.sign(b.w) * Math.cos(a), -Math.sign(b.w) * Math.sin(a));
      for (const w of b.wings) w.p.rotation.x = w.s * Math.sin(time * (reduced ? 3 : 9) + b.ph) * 0.7;
    }
    const prog = smooth(0.46, 0.62, phase) * (1 - smooth(0.66, 0.72, phase));
    for (const s of u.serpent || []) { s.m.material.opacity = clamp(prog * 12 - (11 - s.k), 0, 1) * 0.85 * (1 - smooth(0.66, 0.72, phase)); s.m.visible = s.m.material.opacity > 0.01; }
    const nightF = phase >= 0.5 ? smooth(0.74, 0.84, phase) : 1 - smooth(0.2, 0.27, phase);
    for (const bm of u.beams || []) { bm.m.material.opacity = nightF * bm.alpha; bm.m.visible = nightF > 0.01; }
  }

  function updateLighting(world, { glow = 0 } = {}) {
    const u = world.userData;
    for (const l of u.wallLights || []) { if (l.m.material.transparent && l.day === 0x1a1a1a) continue; l.m.material.color.set(l.day).lerp(new Color(l.night), glow); }
    for (const l of u.localLights || []) l.intensity = glow * (l.userData.nightPower || 24);
  }

  return { build, animate, height, water: () => false, updateLighting };
}
