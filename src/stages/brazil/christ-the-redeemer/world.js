/*
 * Brazil — "Christ the Redeemer" (brazil-christ-redeemer). First scenery of Brazil.
 * Stage package: world.js + stage.json + differences.json + music.mp3.
 *
 * The statue stands in the middle of the map on a granite peak with a paved terrace; jungle ridges ring it,
 * the bay and Sugarloaf lie behind, the city to the east. The ten differences are spread evenly around the
 * statue (every ~36 degrees, at different radii) so no side of the world is empty. Four of them are lights
 * that look identical by day and only differ in colour at night; they stay in the scene all day (nothing
 * pops in or out).
 */
function createStage(E) {
  const { Mesh, BasicMaterial, PointLight, Color, hash, pathStep } = E;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const smooth = (a, b, v) => { const t = clamp((v - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };
  const HS = 10;                          // terrace height
  const PLAT = 8.2;                       // terrace radius
  const SK = 1.2;                         // statue scale (statue-space units are ~1 m, 16 tall)
  const Y0 = HS + 5.3;                    // top of the pedestal
  const SUGAR = [12, -19];                // Sugarloaf summit
  const FALL = [11.3, -8.2];              // granite outcrop with the waterfall
  const P = (deg, r) => [r * Math.cos(deg * Math.PI / 180), r * Math.sin(deg * Math.PI / 180)];
  const seaEdge = (x) => -14 + 2 * Math.sin(x * 0.3 + 1);

  // ---------- terrain ----------
  function base(x, z) {
    const r = Math.hypot(x, z);
    let h = r < PLAT ? HS : 2.2 + 7.8 * Math.exp(-Math.pow((r - PLAT) / 6.0, 1.7));
    const ang = Math.atan2(z, x);
    const city = smooth(12, 15, x) * smooth(1, 4, z) * (1 - smooth(22, 25, z));
    const ridge = 5.2 * Math.exp(-(((r - 22) / 5.5) ** 2)) * (0.45 + 0.55 * Math.sin(ang * 3 + 0.8)) * (1 - city);
    h += Math.max(0, ridge);
    if (z < -9) h *= clamp((z + 17) / 8, 0, 1);
    h += 6.5 * Math.exp(-((((x - FALL[0]) / 2.4) ** 2 + ((z - FALL[1]) / 2.4) ** 2) ** 1.2));
    const d2 = ((x - SUGAR[0]) / 4.4) ** 2 + ((z - SUGAR[1]) / 5) ** 2;
    if (d2 < 1) h = Math.max(h, 9.5 * Math.pow(1 - d2, 0.55));
    h = h * (1 - city) + 2.0 * city;
    if (h > 1.5 && r > PLAT + 0.7 && city < 0.5) h += hash(x, z) * 0.4;
    return h;
  }
  // flat pads for the little buildings
  let PADS = null; // computed lazily: the bundle's hash helper is not initialised when the factory runs
  function pads() {
    return PADS || (PADS = [[3.4, 10.5, 2.6], [-14, 0, 2.8], [-6.9, 5.0, 2.3], [-12.1, -8.8, 2.3], [-4.6, 14.3, 3.2]].map(([x, z, r]) => [x, z, r, Math.floor(base(x, z) * 2) / 2]));
  }
  function height(x, z) {
    let h = base(x, z);
    for (const [px, pz, pr, lv] of pads()) {
      const d = Math.hypot(x - px, z - pz);
      if (d < pr) return lv;
      if (d < pr + 1.4) { const t = smooth(pr, pr + 1.4, d); h = lv * (1 - t) + h * t; }
    }
    return Math.floor(h * 2) / 2;
  }
  const isSea = (x, z) => height(x, z) < 1.0 && z < seaEdge(x) && Math.hypot(x - SUGAR[0], (z - SUGAR[1]) * 0.9) > 4.2;

  const FOREST = [0x2f6f3a, 0x3a7d44, 0x2a5f35, 0x438a4c, 0x357a40];
  const GRASS = [0x6fae4f, 0x7cb859, 0x65a049];
  const GRANITE = [0xa39c90, 0x958e82, 0xb0a99c, 0x8c867b];
  const SOIL = [0x7b6a52, 0x6e5f49, 0x85755b];
  const SEA = [0x2f8fd0, 0x3a9ad8, 0x2b84c4, 0x3593d4];
  const SAND = [0xe8d9a8, 0xdfcf9a];
  const STONE = 0xb8b2a4;

  // cog railway (east slope up to the terrace)
  const TRACK = [[21.2, 5.7], [15.8, 2.8], [11, 0.96], [8.2, 0.3]];
  const SEGS = TRACK.slice(1).map((p, i) => { const a = TRACK[i]; return { a, b: p, len: Math.hypot(p[0] - a[0], p[1] - a[1]) }; });
  const TRACK_LEN = SEGS.reduce((s, q) => s + q.len, 0);
  function trackAt(u) {
    let d = clamp(u, 0, 1) * TRACK_LEN;
    for (const s of SEGS) {
      if (d <= s.len) { const f = d / s.len; return { x: s.a[0] + (s.b[0] - s.a[0]) * f, z: s.a[1] + (s.b[1] - s.a[1]) * f, dx: (s.b[0] - s.a[0]) / s.len, dz: (s.b[1] - s.a[1]) / s.len }; }
      d -= s.len;
    }
    const s = SEGS[SEGS.length - 1];
    return { x: s.b[0], z: s.b[1], dx: (s.b[0] - s.a[0]) / s.len, dz: (s.b[1] - s.a[1]) / s.len };
  }
  function nearTrack(x, z) {
    let best = 1e9;
    for (const s of SEGS) {
      const vx = s.b[0] - s.a[0], vz = s.b[1] - s.a[1];
      const t = clamp(((x - s.a[0]) * vx + (z - s.a[1]) * vz) / (vx * vx + vz * vz), 0, 1);
      best = Math.min(best, Math.hypot(x - (s.a[0] + vx * t), z - (s.a[1] + vz * t)));
    }
    return best;
  }

  // differences, one every ~36 degrees around the statue
  const D = {
    macaw: [0, Y0 + 13.3 * SK, 7.0 * SK],
    city: [...P(36, 23)],
    stall: [3.4, 10.5],
    palms: [-4.6, 14.3],
    lamps: [-6.9, 5.0],
    kiosk: [-14, 0],
    tower: [-12.1, -8.8],
    boats: [...P(252, 20)],
    fall: FALL,
  };
  const KEEP = [[D.stall[0], D.stall[1], 3.4], [D.palms[0], D.palms[1], 3.6], [D.lamps[0], D.lamps[1], 2.8], [D.kiosk[0], D.kiosk[1], 3.4], [D.tower[0], D.tower[1], 3.0], [18.6, 13.5, 3], [-10, 17, 2.5]];

  function build(ctx, variant) {
    const { box: g, group: o, makeDiff: B, person: man, walker, path, world, cube } = ctx;
    const U = world.userData;
    U.wallLights = []; U.flames = []; U.beams = []; U.mist = []; U.fireworks = []; U.macaws = [];
    const pick = (arr, a, b) => arr[Math.floor(hash(a, b) * arr.length)];

    function lamp(x, y, z, sx, sy, sz, dayColor, nightColor, opts = {}) {
      const m = new Mesh(cube, new BasicMaterial(opts.alpha !== undefined ? { color: dayColor, transparent: true, opacity: opts.alpha, depthWrite: false } : { color: dayColor }));
      m.position.set(x, y, z); m.scale.set(sx, sy, sz);
      m.userData.ownedMaterial = true; m.userData.motion = true;
      if (!opts.pickable) m.raycast = () => {};
      (opts.parent || world).add(m);
      U.wallLights.push({ m, day: dayColor, night: nightColor });
      return m;
    }
    const motion = (grp) => { grp.userData.motion = true; return grp; };

    // ---------- terrain: granite peak, jungle, sea, Sugarloaf, city plain ----------
    for (let x = -29; x <= 29; x++) {
      for (let z = -25; z <= 25; z++) {
        if ((x / 30.5) ** 4 + (z / 26.5) ** 4 > 1.18 + hash(x, z) * 0.06) continue;
        const sea = isSea(x, z);
        const h = sea ? -0.35 : height(x, z);
        const bottom = -2.4 - hash(x, z) * 0.7;
        const r = Math.hypot(x, z);
        const nearFall = Math.hypot(x - FALL[0], z - FALL[1]);
        const sugar = ((x - SUGAR[0]) / 4.4) ** 2 + ((z - SUGAR[1]) / 5) ** 2;
        const cliff = (r < 10 && h > 5.5) || nearFall < 3.4 || (sugar < 1.2 && h > 2.5);
        g(x, (bottom + h) / 2 - 0.1, z, 1.025, h - bottom - 0.2, 1.025, sea ? pick(SEA, x, z) : cliff ? pick(GRANITE, z, x) : pick(SOIL, x, z));
        let top;
        if (sea) top = pick(SEA, x + 2, z);
        else if (r < PLAT) top = (x + z) % 2 === 0 ? 0xd8d2c4 : 0xcdc7b8;
        else if (cliff) top = hash(x + 4, z) > 0.8 ? pick(FOREST, x, z) : pick(GRANITE, x, z);
        else if (h < 1.0 && z < seaEdge(x) + 2.5) top = pick(SAND, x, z);
        else if (h < 2.4 && x > 12) top = pick(GRASS, x, z);
        else top = pick(FOREST, x, z);
        g(x, h - 0.08, z, 1.03, 0.2, 1.03, top);
        if (!sea && !cliff && h > 4 && hash(x, z + 9) > 0.97) g(x, h + 0.15, z, 0.9, 0.3, 0.9, pick(GRANITE, z, x));
      }
    }

    // ---------- jungle: canopy trees, palms, a few flowering ipes ----------
    for (let x = -28; x <= 28; x += 1.6) {
      for (let z = -22; z <= 24; z += 1.6) {
        const px = x + hash(x, z) * 1.2, pz = z + hash(z, x) * 1.2;
        const r = Math.hypot(px, pz), h = height(px, pz);
        if (r < PLAT + 3 || h < 0.8 || h > 9.4 || isSea(px, pz) || hash(x + 5, z + 2) < 0.8) continue;
        if (nearTrack(px, pz) < 1.9) continue;
        if (Math.abs(px) < 2.6 && pz > 5 && pz < 14) continue;
        if (px > 13 && pz > 2.5 && pz < 23.5) continue; // city plain
        if (Math.hypot(px - SUGAR[0], (pz - SUGAR[1]) * 0.9) < 5.2 && h > 2) continue;
        if (Math.hypot(px - FALL[0], pz - FALL[1]) < 3.2) continue;
        if (KEEP.some(([kx, kz, kr]) => Math.hypot(px - kx, pz - kz) < kr)) continue;
        const roll = hash(x, z + 3);
        if (roll > 0.88) { // palm
          g(px, h + 1.7, pz, 0.3, 3.4, 0.3, 0x7a5a3a);
          g(px, h + 3.5, pz, 2.4, 0.2, 0.5, 0x2f8a3c); g(px, h + 3.5, pz, 0.5, 0.2, 2.4, 0x2f8a3c);
          g(px, h + 3.75, pz, 0.7, 0.5, 0.7, 0x3da04a);
          for (const [a, b] of [[.8, .8], [-.8, .8], [.8, -.8], [-.8, -.8]]) g(px + a, h + 3.3, pz + b, 0.9, 0.18, 0.5, 0x3a9a46);
        } else {
          const c = roll > 0.82 ? (roll > 0.85 ? 0xe9c93b : 0xe86aa8) : null; // ipe blossoms
          g(px, h + 0.7, pz, 0.3, 1.4, 0.3, 0x6b4a33);
          const k = [0x2f6f3a, 0x3a7d44, 0x438a4c][Math.floor(hash(z, x) * 3)];
          g(px, h + 1.8, pz, 1.8, 1.2, 1.8, c || k);
          g(px + 0.15, h + 2.65, pz, 1.2, 0.9, 1.2, c || 0x2a5f35);
        }
      }
    }

    // ---------- terrace: parapet, lamp posts, stairs, tracks ----------
    for (let k = 0; k < 34; k++) {
      const a = k / 34 * Math.PI * 2;
      if (Math.abs(Math.atan2(Math.sin(a - Math.PI / 2), Math.cos(a - Math.PI / 2))) < 0.3) continue;
      const x = Math.cos(a) * (PLAT - 0.25), z = Math.sin(a) * (PLAT - 0.25);
      g(x, HS + 0.35, z, 1.1, 0.7, 1.1, STONE);
      if (k % 2 === 0) g(x, HS + 0.82, z, 0.7, 0.3, 0.7, 0xa8a294);
    }
    for (let k = 0; k < 8; k++) {
      const a = k / 8 * Math.PI * 2 + 0.2;
      if (Math.abs(Math.atan2(Math.sin(a - Math.PI / 2), Math.cos(a - Math.PI / 2))) < 0.35) continue;
      const x = Math.cos(a) * (PLAT - 0.25), z = Math.sin(a) * (PLAT - 0.25);
      g(x, HS + 1.4, z, 0.12, 1.4, 0.12, 0x2a2d33);
      lamp(x, HS + 2.2, z, 0.34, 0.34, 0.34, 0xe9e6dc, 0xffd27a);
    }
    for (let k = 0; k < 15; k++) {
      const z = PLAT + 0.2 + k * 0.62, y = height(0, z);
      g(0, y + 0.05, z, 2.4, 0.22, 0.62, k % 2 ? 0x4a4d54 : 0x42454c);
      for (const s of [-1, 1]) g(s * 1.3, y + 0.5, z, 0.16, 0.7, 0.62, STONE);
    }
    for (let i = 0; i < TRACK.length - 1; i++) path(TRACK[i][0], TRACK[i][1], TRACK[i + 1][0], TRACK[i + 1][1], 1.5);
    g(8.0, height(8.2, 0.3) + 0.5, 0.3, 0.3, 1.0, 1.4, 0xb02a22); // buffer stop

    // ---------- chapel, pedestal and the statue ----------
    g(0, HS + 0.7, 0, 8.6, 1.4, 8.6, 0xb8b2a4);                        // chapel block
    g(0, HS + 1.42, 0, 8.9, 0.16, 8.9, 0xa39d8f);
    g(4.32, HS + 0.65, 0, 0.1, 1.1, 1.2, 0x2a2d33); g(4.34, HS + 1.25, 0, 0.1, 0.35, 0.9, 0x2a2d33); // arched door
    g(0, HS + 3.3, 0, 7.4, 3.6, 7.4, 0x2c2f35);                        // dark granite pedestal
    g(0, HS + 5.15, 0, 7.8, 0.3, 7.8, 0x3a3e45);                       // cornice
    g(3.72, HS + 3.3, 0, 0.08, 1.2, 2.2, 0x474c55);                    // inscription slab
    // Statue: arms along local x, face toward +z; turned 90 degrees so the arms span the default view.
    // S = glowing base volume (cream floodlit at night); G = static carved relief on top of it (stays dark
    // at night, so folds read as carved grooves day and night). SK scales everything.
    const S = (x, y, z, sx, sy, sz, day, night) => lamp(z * SK, Y0 + y * SK, x * SK, sz * SK, sy * SK, sx * SK, day, night);
    const G = (x, y, z, sx, sy, sz, c) => g(z * SK, Y0 + y * SK, x * SK, sz * SK, sy * SK, sx * SK, c);
    const BASE = 0xaab2a4, STONE_N = 0xfff1cf, RIDGE = 0xd3dce3, LIGHT = 0xe6edf2, GROOVE = 0x778088, SHADOW = 0x626b72, DRAPE = 0xa5ad9f, HAIR = 0x9aa294, HAIR_N = 0xf0d699;

    // ---- long pleated skirt (deep vertical pleats all round) and tunic, in tiers that flare toward the hem ----
    const TIERS = [];
    for (let j = 0; j < 8; j++) { const lo = j * 0.7, mid = lo + 0.35; TIERS.push([lo, lo + 0.7, 2.15 - (2.15 - 1.55) * (mid / 5.6), 1.2 - 0.32 * (mid / 5.6)]); }
    TIERS.push([5.6, 8.0, 1.45, 0.85], [8.0, 10.4, 1.5, 0.85], [10.4, 12.4, 1.75, 0.88]);
    for (const [lo, hi, half, dh] of TIERS) {
      S(0, (lo + hi) / 2, 0, half * 2, hi - lo, dh * 2, BASE, STONE_N);
      if (hi <= 5.6) {                                                     // pleat ridges front and back
        const n = Math.round(half / 0.2);
        for (let k = -n; k <= n; k++) for (const zz of [dh + 0.03, -dh - 0.03]) G(k / n * half * 0.95, (lo + hi) / 2, zz, 0.21, hi - lo - 0.04, 0.07, k % 2 ? RIDGE : LIGHT);
        for (const sx of [half + 0.03, -half - 0.03]) for (let k = -3; k <= 3; k++) G(sx, (lo + hi) / 2, k * dh / 3.4, 0.07, hi - lo - 0.04, 0.2, k % 2 ? RIDGE : LIGHT); // side pleats
      } else {                                                             // tunic: long back folds
        for (let k = -3; k <= 3; k++) G(k * half / 3.4, (lo + hi) / 2, -dh - 0.03, 0.26, hi - lo - 0.04, 0.07, k % 2 ? RIDGE : GROOVE);
      }
    }
    G(0, 0.1, 0, 4.5, 0.22, 2.6, 0xb5bfc6);                                // hem band
    for (const s of [-1, 1]) G(s * 0.7, 0.12, 1.3, 0.8, 0.24, 0.5, 0xb0bac1); // feet

    // ---- mantle: diagonal drape across the chest, long hanging fold, V neckline ----
    for (let t = 0; t < 9; t++) {
      const cx = -1.55 + t * 0.4, cy = 12.1 - t * 0.62;
      G(cx, cy, 0.9, 0.62, 0.52, 0.12, LIGHT);
      G(cx + 0.18, cy - 0.34, 0.9, 0.62, 0.1, 0.06, SHADOW);
      G(cx - 0.05, cy - 0.7, 0.89, 0.5, 0.1, 0.05, GROOVE);                // second parallel fold
    }
    G(1.45, 8.6, 0.93, 0.85, 7.4, 0.1, LIGHT);                             // long hanging fold
    for (const dx of [-0.28, 0, 0.28]) G(1.45 + dx, 8.6, 0.99, 0.07, 7.2, 0.05, GROOVE);
    G(1.9, 8.6, 0.9, 0.1, 7.2, 0.08, SHADOW);
    for (const s of [-1, 1]) for (let t = 0; t < 4; t++) G(s * (0.5 - t * 0.1), 12.9 - t * 0.5, 0.92, 0.24, 0.5, 0.07, SHADOW); // V neckline
    G(0, 8.0, 0.9, 2.6, 0.1, 0.06, SHADOW);                                // waist fold
    for (const k of [-1.1, -0.45, 0.2, 0.85]) G(k, 9.4, 0.9, 0.08, 1.6, 0.05, GROOVE); // chest creases
    S(0, 12.0, -0.8, 3.4, 2.4, 0.5, DRAPE, STONE_N);                       // cloak behind the shoulders
    for (let k = -4; k <= 4; k++) G(k * 0.4, 12.0, -1.07, 0.1, 2.3, 0.05, k % 2 ? SHADOW : GROOVE);

    // ---- shoulders, arms, sleeves with fold lines, hands ----
    S(0, 12.95, 0, 3.8, 1.0, 1.5, BASE, STONE_N);
    for (const s of [-1, 1]) {
      S(s * 4.5, 12.95, 0, 5.4, 0.8, 1.0, 0xb3baaa, STONE_N);               // upper arm
      S(s * 6.85, 12.85, 0, 1.4, 0.7, 0.75, 0xb3baaa, STONE_N);            // forearm
      S(s * 7.55, 12.8, 0, 0.7, 0.5, 0.8, 0xc7cdbe, STONE_N);              // palm
      for (let f = 0; f < 4; f++) G(s * 8.05, 12.83, -0.3 + f * 0.2, 0.5, 0.1, 0.15, 0xc2cbd2);  // fingers
      G(s * 7.7, 12.76, 0.48, 0.4, 0.1, 0.2, 0xc2cbd2);                    // thumb
      for (let i = 0; i < 13; i++) {                                         // hanging sleeve as columns
        const u = i / 12, x = 1.85 + u * 5.2, w = 0.47;
        const hang = 0.5 + 3.5 * Math.pow(1 - u, 0.85) + (i % 2 ? -0.18 : 0.12);
        const dz = 0.38 + 0.4 * (1 - u);
        S(s * x, 12.5 - hang / 2, 0, w, hang, dz * 2, DRAPE, DRAPE === 0 ? 0 : 0xf0d9a6);
        for (const zz of [dz + 0.03, -dz - 0.03]) G(s * x, 12.5 - hang / 2, zz, 0.07, hang - 0.12, 0.05, i % 2 ? GROOVE : SHADOW); // fold line
        G(s * x, 12.5 - hang, 0, w + 0.04, 0.09, dz * 2 + 0.1, LIGHT);   // scalloped lower edge
      }
      G(s * 1.9, 11.9, 0.62, 0.1, 1.4, 0.05, SHADOW);
    }

    // ---- head: modelled at ~0.1 m cells as a relief map (brow, deep-set lids, long nose, moustache, lips, pointed beard) ----
    const mixC = (c1, c2, t) => { const r = (c1 >> 16 & 255) + ((c2 >> 16 & 255) - (c1 >> 16 & 255)) * t, gg = (c1 >> 8 & 255) + ((c2 >> 8 & 255) - (c1 >> 8 & 255)) * t, bb = (c1 & 255) + ((c2 & 255) - (c1 & 255)) * t; return (r | 0) << 16 | (gg | 0) << 8 | (bb | 0); };
    S(0, 13.8, 0, 0.95, 0.7, 0.95, 0xb5bcae, STONE_N);                      // neck
    G(0, 13.45, 0.42, 1.0, 0.1, 0.4, SHADOW);                               // shadow under the chin
    S(0, 15.15, 0, 1.25, 1.4, 1.15, 0xc3cabc, 0xfff6e0);                    // upper head (y 14.45–15.85)
    S(0, 14.2, 0.0, 0.95, 0.5, 1.0, 0xbec5b7, 0xfff1d6);                    // jaw
    S(0, 13.8, -0.05, 0.6, 0.3, 0.8, 0xb9c0b2, 0xf6e2b4);                   // chin
    S(0, 15.7, -0.12, 1.6, 0.7, 1.45, HAIR, HAIR_N);                        // crown of hair
    S(0, 14.7, -0.64, 1.6, 2.5, 0.5, HAIR, HAIR_N);                         // hair behind
    for (const s of [-1, 1]) S(s * 0.82, 14.45, -0.02, 0.42, 2.8, 1.25, HAIR, HAIR_N); // locks falling past the face to the shoulders
    const zf = (y) => (y > 14.45 ? 0.575 : y > 13.95 ? 0.5 : 0.4);          // face plane depth per row
    const cl = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
    for (let yy = 13.75; yy < 15.78; yy += 0.1) {
      const v = yy - 14.95;                                                  // eyes sit at v = +0.3
      const half = v >= -0.35 ? 0.6 : 0.6 - (-0.35 - v) * 0.44;             // face half-width; beard tapers to a point
      for (let xx = -0.6; xx <= 0.601; xx += 0.1) {
        const ax = Math.abs(xx);
        if (ax > half + 0.001) continue;
        let d = 0.04 + 0.1 * (1 - (xx / 0.64) ** 2), col = null;
        if (v > 0.45) d += 0.03;                                             // forehead
        if (v > 0.38 && v < 0.52 && ax > 0.08 && ax < 0.52) d += 0.1;        // brow ridge
        if (v > 0.2 && v < 0.38 && ax > 0.12 && ax < 0.48) { d -= 0.08; if (v > 0.27 && ax > 0.15 && ax < 0.44) col = 0x40463f; } // deep-set eye + heavy lid
        if (ax < 0.1 && v > -0.2 && v < 0.42) d += 0.24;                     // long nose bridge
        if (ax < 0.15 && v > -0.24 && v < -0.1) { d += 0.32; if (ax > 0.09 && v < -0.14) col = 0x59605a; } // nose tip and nostrils
        if (ax > 0.22 && ax < 0.5 && v > -0.28 && v < 0.12) d += 0.05;       // cheekbones
        if (v > -0.46 && v < -0.28 && ax < 0.42 - 0.3 * Math.max(0, ax - 0.2)) d += 0.1; // moustache
        if (v > -0.51 && v < -0.46 && ax < 0.17) { d -= 0.06; col = 0x565d56; } // mouth line
        if (v > -0.58 && v <= -0.51 && ax < 0.15) d += 0.05;                 // lower lip
        if (v <= -0.58) d += 0.12 + (Math.round(xx * 10) % 2 ? 0.02 : 0);    // beard with strand ridges
        d = cl(d, 0.02, 0.5);
        const t = cl(d / 0.42, 0, 1);
        G(xx, yy, zf(yy) + d / 2, 0.1, 0.1, d, col !== null ? col : mixC(0x97a2a8, 0xeaf1f5, t));
      }
    }
    for (const s of [-1, 1]) {                                               // hair strands down both sides, widening toward the shoulders
      for (let k = 0; k < 6; k++) {
        const wob = 0.02 * Math.sin(k * 1.7);
        G(s * (0.66 + 0.1 * k + wob), 14.45, 0.63, 0.03, 2.7, 0.03, k % 2 ? 0x858e96 : 0xaab4bb);
      }
      for (let k = 0; k < 4; k++) G(s * 1.045, 14.5, 0.1 - 0.28 * k, 0.03, 2.7, 0.2, k % 2 ? 0x858e96 : 0x9ba5ac);
    }
    G(0, 15.9, 0.6, 1.28, 0.12, 0.06, 0xa3adb4);                                // hairline across the forehead
    for (const xx of [-0.5, -0.3, -0.12, 0.12, 0.3, 0.5]) G(xx, 15.8, 0.61, 0.04, 0.16, 0.04, 0x858e96);
    for (const xx of [-0.75, -0.55, -0.35, -0.18, 0.18, 0.35, 0.55, 0.75]) G(xx, 16.06, -0.12, 0.04, 0.03, 1.3, 0x858e96); // strands over the crown
    G(0, 16.065, 0.06, 0.06, 0.03, 1.35, 0x687078);                         // centre parting
    for (let k = -4; k <= 4; k++) G(k * 0.17, 14.95, -0.92, 0.05, 2.4, 0.04, k % 2 ? 0x858e96 : 0x778088); // strands down the back

    // floodlights and beams at the foot of the pedestal
    for (const [sx, sz] of [[5.4, 5.4], [-5.4, 5.4], [5.4, -5.4], [-5.4, -5.4]]) {
      g(sx, HS + 0.2, sz, 0.7, 0.4, 0.7, 0x2a2d33);
      lamp(sx, HS + 0.55, sz, 0.45, 0.2, 0.45, 0xe9e6dc, 0xfff4c0);
      U.beams.push({ m: lamp(sx * 0.9, HS + 11, sz * 0.9, 0.8, 21, 0.8, 0xfff4c0, 0xfff4c0, { alpha: 0 }), alpha: 0.4 });
    }
    // slow sweeping searchlights
    const lights = motion(o(0, 0, 0)); U.search = lights;
    for (let k = 0; k < 3; k++) {
      const a = k / 3 * Math.PI * 2;
      const piv = motion(o(Math.cos(a) * 6.4, HS + 0.6, Math.sin(a) * 6.4)); piv.rotation.y = -a; lights.add(piv);
      const t = 0.5, L = 38, m = lamp(Math.sin(t) * L / 2, Math.cos(t) * L / 2, 0, 0.9, L, 0.9, 0xd8f3ff, [0xbfe9ff, 0xffd9a8, 0xe3c8ff][k], { alpha: 0, parent: piv });
      m.rotation.z = -t; U.beams.push({ m, alpha: 0.34 });
    }

    // ---------- the bay, Sugarloaf cable car, distant island ----------
    g(-14, 1.0, -21, 4.2, 2.2, 3.6, 0x3f7a45);
    for (let k = 0; k < 6; k++) g(-14 + (hash(k, 1) - 0.5) * 3, 2.2, -21 + (hash(k, 2) - 0.5) * 2.4, 1.4, 0.9, 1.4, pick(FOREST, k, 3));
    g(SUGAR[0], height(SUGAR[0], SUGAR[1]) + 0.1, SUGAR[1] + 3.2, 0.3, 0.3, 4.6, 0x6b6e75); // cable
    g(SUGAR[0] - 0.4, 6.4, SUGAR[1] - 1.6, 0.3, 3, 0.3, 0x6b6e75);

    // ---------- the city on the east plain ----------
    const PASTEL = [0xe8e0d0, 0xd9c8a8, 0xc9d6dc, 0xe6c9c0, 0xd8d8d0, 0xcfd9c6];
    for (let gx = 16; gx <= 26; gx += 4.5) {
      for (let gz = 6; gz <= 21; gz += 4.5) {
        if (Math.hypot(gx - 18.5, gz - 13.5) < 1.5) continue;
        const hgt = 3 + Math.floor(hash(gx, gz) * 6), w = 2.1 + hash(gz, gx) * 0.5, y = height(gx, gz);
        g(gx, y + hgt / 2, gz, w, hgt, w, pick(PASTEL, gx, gz));
        g(gx, y + hgt + 0.1, gz, w + 0.15, 0.2, w + 0.15, 0x8a8f96);
        if (hash(gx + 1, gz + 1) > 0.35) lamp(gx - 0.3, y + hgt * 0.62, gz - w / 2 - 0.03, 0.9, 0.5, 0.05, 0x9fb4c6, hash(gx, gz + 7) > 0.5 ? 0xffd27a : 0xfff0b0);
      }
    }
    for (let k = 0; k < 3; k++) g(14.4, height(14.4, 4 + k * 3.2) + 0.15, 4 + k * 3.2, 0.2, 0.3, 1.6, 0x4a4d54); // main street dashes

    // ---------- tourists, mist, helicopter, macaws, train ----------
    walker(-6.4, 6.2, 6.4, 6.2, 0xd9a441, 1);
    walker(6.4, -6.4, -6.4, -6.4, 0x2f6f8f, 2);
    walker(6.6, -5.0, 6.6, 5.0, 0xc0392b, 3);
    walker(-6.6, 5.0, -6.6, -5.0, 0x2e9b4a, 4);

    for (let i = 0; i < 5; i++) {
      const cloud = motion(o(0, 0, 0));
      for (let k = 0; k < 5; k++) lamp((k - 2) * 1.5, (hash(i, k) - 0.5) * 0.5, (hash(k, i) - 0.5) * 1.4, 2.0 + hash(i + k, 3) * 1.2, 0.7 + hash(k, 5) * 0.4, 1.4 + hash(k, 9) * 0.8, 0xffffff, 0x4a5878, { alpha: 0.42, parent: cloud });
      U.mist.push({ g: cloud, r: 13 + (i % 4) * 2.4, a0: i * 0.79, w: (i % 2 ? 1 : -1) * (0.012 + 0.004 * (i % 3)), y: 6 + (i % 5) * 1.5 });
    }

    const heli = motion(o(0, 0, 0)); U.heli = { g: heli };
    g(0, 0, 0, 1.7, 0.9, 0.95, 0xe6e6e6, heli); g(0.2, 0.05, 0, 1.0, 0.35, 0.97, 0x2358c9, heli);
    g(-1.4, 0.2, 0, 1.5, 0.22, 0.22, 0xe6e6e6, heli); g(-2.15, 0.55, 0, 0.18, 0.7, 0.14, 0xe6e6e6, heli);
    g(0.78, 0.15, 0, 0.3, 0.55, 0.8, 0x4a6a8a, heli); g(0, 0.65, 0, 0.18, 0.35, 0.18, 0x3a3f46, heli);
    for (const z of [-0.4, 0.4]) g(0, -0.55, z, 1.7, 0.08, 0.08, 0x3a3f46, heli);
    const rot = motion(o(0, 0.85, 0)); heli.add(rot); U.heli.rotor = rot;
    g(0, 0, 0, 4.4, 0.05, 0.2, 0x3a3f46, rot); g(0, 0, 0, 0.2, 0.05, 4.4, 0x3a3f46, rot);
    U.heli.nav = lamp(-2.2, 0.95, 0, 0.2, 0.2, 0.2, 0xe9e6dc, 0xff3030, { parent: heli });
    U.beams.push({ m: lamp(0.9, -2.2, 0, 0.9, 4.4, 0.9, 0xfff6d0, 0xfff6d0, { alpha: 0, parent: heli }), alpha: 0.16 });

    for (let k = 0; k < 2; k++) {
      const bird = motion(o(0, 0, 0));
      g(0, 0, 0, 0.9, 0.35, 0.4, k ? 0xe8c030 : 0xd8362b, bird); g(0.55, 0.12, 0, 0.35, 0.32, 0.32, k ? 0xe8c030 : 0xd8362b, bird);
      g(-0.8, -0.05, 0, 0.9, 0.1, 0.14, 0x2a8fd0, bird); g(0.8, 0.1, 0, 0.18, 0.14, 0.14, 0xf2d9a0, bird);
      const wings = [-1, 1].map((s) => { const p = motion(o(0, 0.1, s * 0.2)); bird.add(p); g(0, 0.05, s * 0.55, 0.45, 0.07, 1.1, 0x2358c9, p); g(0.2, 0.06, s * 0.55, 0.15, 0.08, 1.0, 0xe8c030, p); return { p, s }; });
      U.macaws.push({ g: bird, wings, r: 13 + k * 3, w: (k ? -1 : 1) * (0.3 + 0.05 * k), y: 29 + k * 2.8, ph: k * 2.1 });
    }

    const train = motion(o(0, 0, 0)); U.train = train;
    g(0, 0.75, 0, 2.7, 1.1, 1.0, 0xf4f1e8, train); g(0, 0.45, 0, 2.72, 0.25, 1.02, 0x2358c9, train);
    g(0, 1.35, 0, 2.8, 0.16, 1.12, 0x8a9099, train);
    for (const s of [-1, 1]) {
      for (let k = 0; k < 3; k++) lamp(-0.85 + k * 0.85, 0.92, s * 0.51, 0.45, 0.4, 0.04, 0x6a8fb0, 0xffd27a, { parent: train });
      for (const x of [-0.9, 0.9]) g(x, 0.12, s * 0.35, 0.3, 0.24, 0.2, 0x2a2d33, train);
    }

    // fireworks over the bay (night only)
    const FW = [[-5, 26, -22, 0xff5a8a], [9, 29, -23, 0xffd24a], [-17, 24, -18, 0x5ad8ff]];
    FW.forEach(([x, y, z, c], i) => {
      const grp = motion(o(x, y, z)); const sparks = [];
      for (let k = 0; k < 24; k++) {
        const m = new Mesh(cube, new BasicMaterial({ color: k % 3 === 0 ? 0xffffff : c, transparent: true, opacity: 0, depthWrite: false }));
        m.scale.setScalar(0.4); m.userData.ownedMaterial = true; m.userData.motion = true; m.raycast = () => {}; grp.add(m);
        const a = k / 24 * Math.PI * 2, e = (k % 3 - 1) * 0.55;
        sparks.push({ m, dx: Math.cos(a) * Math.cos(e), dy: Math.sin(e), dz: Math.sin(a) * Math.cos(e) });
      }
      U.fireworks.push({ g: grp, sparks, off: i * 2.3 });
    });

    // ================= DIFFERENCES (every ~36 degrees around the statue) =================
    // 0 (0 deg): macaw perched on the right hand — present or absent
    B(0, D.macaw[0], D.macaw[1], D.macaw[2], 'Macaw on the statue hand', 1.5, (d) => {
      if (variant) return;
      g(0, 0.4, 0, 0.5, 0.6, 0.4, 0xd8362b, d); g(0.05, 0.9, 0.05, 0.38, 0.38, 0.38, 0xd8362b, d);
      g(0.28, 0.86, 0.05, 0.2, 0.18, 0.14, 0xf2d9a0, d); g(-0.05, 0.4, 0.22, 0.3, 0.5, 0.08, 0x2358c9, d);
      g(-0.05, 0.3, 0.26, 0.2, 0.3, 0.05, 0xe8c030, d); g(-0.12, -0.1, -0.05, 0.14, 0.8, 0.14, 0x2a8fd0, d);
      g(0.18, 0.98, 0.25, 0.08, 0.08, 0.05, 0x111111, d);
    }, variant);

    // 1 (36 deg): city tower rooftop sign — same white by day, cyan or pink at night
    {
      const bx = 18.5, bz = 13.5, by = height(bx, bz), hgt = 9;
      g(bx, by + hgt / 2, bz, 3.2, hgt, 3.2, 0xd9d3c4); g(bx, by + hgt + 0.1, bz, 3.4, 0.2, 3.4, 0x8a8f96);
      for (let k = 0; k < 3; k++) lamp(bx - 0.9 + k * 0.9, by + 5, bz - 1.63, 0.5, 0.9, 0.05, 0x9fb4c6, 0xffd27a);
      B(1, bx, by + hgt + 0.2, bz, 'City tower sign colour', 2.2, (d) => {
        g(-0.9, 0.5, 0, 0.12, 1.0, 0.12, 0x3a3f46, d); g(0.9, 0.5, 0, 0.12, 1.0, 0.12, 0x3a3f46, d);
        lamp(0, 1.35, 0, 2.4, 0.8, 0.22, 0xe3dfd4, variant ? 0xff5ac8 : 0x3de0ff, { parent: d, pickable: true });
      }, variant);
    }

    // 2 (72 deg): souvenir stall umbrella — blue or yellow
    B(2, D.stall[0], 0.3, D.stall[1], 'Souvenir stall umbrella colour', 2.4, (d) => {
      g(0, 0.55, 0, 2.2, 1.1, 1.0, 0x8a6a46, d);
      for (const [x, c] of [[-0.7, 0xd33b3b], [0, 0x2e9b4a], [0.7, 0xe0b030]]) g(x, 1.3, 0.1, 0.45, 0.35, 0.4, c, d);
      g(0, 1.5, -0.4, 0.14, 3.0, 0.14, 0x6b4a33, d);
      const c = variant ? 0x1e6bd6 : 0xe9c22b;
      g(0, 3.05, -0.4, 3.4, 0.22, 3.4, c, d); g(0, 3.3, -0.4, 2.0, 0.22, 2.0, c, d); g(0, 3.55, -0.4, 0.5, 0.3, 0.5, 0xffffff, d);
    }, variant);

    // 3 (108 deg): palms on the slope — three or two
    B(3, D.palms[0], 0.3, D.palms[1], 'Palm trees: three or two', 3.2, (d) => {
      const spots = [[-1.4, 0.3, 3.4], [0.5, -0.6, 3.9], [1.9, 0.5, 3.1]];
      for (const [x, z, h] of spots.slice(0, variant ? 2 : 3)) {
        g(x, h / 2, z, 0.32, h, 0.32, 0x7a5a3a, d);
        g(x, h + 0.1, z, 2.6, 0.2, 0.5, 0x2f8a3c, d); g(x, h + 0.1, z, 0.5, 0.2, 2.6, 0x2f8a3c, d);
        g(x, h + 0.35, z, 0.7, 0.5, 0.7, 0x3da04a, d);
        for (const [a, b] of [[.9, .9], [-.9, .9], [.9, -.9], [-.9, -.9]]) g(x + a, h - 0.1, z + b, 0.9, 0.18, 0.5, 0x3a9a46, d);
      }
    }, variant);

    // 4 (144 deg): terrace lamp posts — look alike by day, cyan or amber at night
    B(4, D.lamps[0], 0.3, D.lamps[1], 'Terrace lamp colour', 2.4, (d) => {
      for (const k of [-1, 0, 1]) {
        const x = -0.59 * k * 1.2, z = -0.81 * k * 1.2;
        g(x, 0.9, z, 0.12, 1.8, 0.12, 0x2a2d33, d);
        lamp(x, 1.95, z, 0.46, 0.46, 0.46, 0xe9e6dc, variant ? 0x5fe8ff : 0xffb74a, { parent: d, pickable: true });
      }
    }, variant);

    // 5 (180 deg): west kiosk roof — pitched or flat
    B(5, D.kiosk[0], 0.3, D.kiosk[1], 'Kiosk roof: pitched or flat', 2.8, (d) => {
      g(0, 1.0, 0, 3.0, 2.0, 3.0, 0xf1ece0, d); g(0, 0.8, 1.52, 0.8, 1.5, 0.08, 0x7a4a2b, d);
      for (const s of [-1, 1]) g(s * 0.95, 1.25, 1.52, 0.55, 0.55, 0.08, 0x3a5a7a, d);
      if (variant) { g(0, 2.1, 0, 3.5, 0.25, 3.5, 0x9a4a35, d); g(0, 2.4, 0, 3.5, 0.35, 3.5, 0xf1ece0, d); }
      else for (let k = 0; k < 4; k++) g(0, 2.15 + k * 0.38, 0, 3.7 - k * 0.9, 0.38, 3.7 - k * 0.9, k % 2 ? 0xb5532f : 0xc0603a, d);
      if (!variant) g(0, 3.85, 0, 0.2, 0.5, 0.2, 0xd6ae66, d);
    }, variant);

    // 6 (216 deg): floodlight tower — warm white or mint at night
    B(6, D.tower[0], 0.3, D.tower[1], 'Floodlight beam colour', 3.2, (d) => {
      for (const sx of [-0.7, 0.7]) for (const sz of [-0.7, 0.7]) g(sx, 2.4, sz, 0.18, 4.8, 0.18, 0x3a3f46, d);
      for (const s of [-0.7, 0.7]) { g(0, 1.6, s, 1.4, 0.12, 0.12, 0x3a3f46, d); g(s, 3.0, 0, 0.12, 0.12, 1.4, 0x3a3f46, d); }
      g(0, 4.9, 0, 1.9, 0.2, 1.9, 0x3a3f46, d);
      const night = variant ? 0xb6ffd4 : 0xfff2c0;
      lamp(0, 5.4, 0, 0.9, 0.6, 0.9, 0xe9e6dc, night, { parent: d, pickable: true });
      U.beams.push({ m: lamp(0, 9.2, 0, 0.9, 7.2, 0.9, night, night, { parent: d, alpha: 0 }), alpha: 0.26 });
    }, variant);

    // 7 (252 deg): sailboats in the bay — four or two
    B(7, D.boats[0], -0.5, D.boats[1], 'Sailboats in the bay: four or two', 3.6, (d) => {
      const boats = [[-2.2, 0.3, 0xffffff], [2.0, -0.6, 0xe0452e], [0.2, 1.9, 0xffffff], [-0.8, -2.0, 0xe8c030]];
      for (const [x, z, c] of boats.slice(0, variant ? 2 : 4)) {
        g(x, 0.5, z, 1.7, 0.4, 0.7, 0xf3efe4, d); g(x, 0.62, z, 1.72, 0.1, 0.72, 0x2358c9, d);
        g(x, 1.9, z, 0.08, 2.4, 0.08, 0x6b4a33, d);
        g(x + 0.1, 1.5, z, 0.06, 0.8, 1.1, c, d); g(x + 0.1, 2.15, z, 0.06, 0.7, 0.75, c, d); g(x + 0.1, 2.7, z, 0.06, 0.55, 0.4, c, d);
      }
    }, variant);

    // 8 (~300 deg): Sugarloaf summit beacon — red or green at night
    B(8, SUGAR[0], height(SUGAR[0], SUGAR[1]) + 0.2, SUGAR[1], 'Summit beacon light colour', 1.8, (d) => {
      g(0, 1.1, 0, 0.16, 2.2, 0.16, 0x3a3f46, d); g(0, 1.8, 0, 1.0, 0.1, 0.1, 0x3a3f46, d);
      U.flames.push(lamp(0, 2.4, 0, 0.5, 0.5, 0.5, 0xd9d6cc, variant ? 0x5bff8a : 0xff4040, { parent: d, pickable: true }));
    }, variant);

    // 9 (324 deg): cliff waterfall — flowing or dry
    {
      const sx = FALL[0] - 1.0, sz = FALL[1], y0w = height(sx, sz) + 0.2;
      B(9, sx, y0w, sz, 'Cliff waterfall: flowing or dry', 2.8, (d) => {
        for (let k = 0; k < 8; k++) {
          const x = -k * 0.5, y = height(sx - k * 0.5, sz) - y0w + 0.25;
          if (variant) g(x, y, 0, 0.55, 0.3, 0.45, 0x65715f, d);
          else g(x, y, 0, 0.6, 0.45, 1.1, k % 2 ? 0x7fd0f2 : 0xe8f6ff, d);
        }
        if (!variant) { g(-4.1, 0.2, 0, 1.6, 0.3, 1.8, 0xe8f6ff, d); g(-4.5, 0.15, 0.3, 1.0, 0.25, 1.2, 0x9ad9f5, d); }
      }, variant);
    }

    // night-only differences: they exist all day; they simply look identical until dusk
    for (const i of [1, 4, 6, 8]) {
      const diff = U.diffs[i];
      diff.nightOnly = true; diff.hintPhase = 0.86; diff.g.userData.motion = true;
    }

    // local night lights
    U.localLights = [];
    for (const [x, y, z, color, power] of [[0, HS + 7, 3.5, 0xffe0b0, 55], [20, 8, 12, 0xffc27a, 26], [0, HS + 2, 0, 0xffd29a, 22]]) {
      const l = new PointLight(color, 0, 24, 1.5);
      l.position.set(x, y, z); l.userData.nightPower = power; world.add(l); U.localLights.push(l);
    }
  }

  // Daily story (300 s = one day): mist drifts around the peak, a cog train climbs and returns, a helicopter
  // circles, macaws wheel in the daylight, tourists walk the terrace; after dusk the statue is floodlit,
  // searchlights sweep, lights twinkle and fireworks burst over the bay.
  function animate(world, time, reduced = false) {
    const u = world.userData;
    const phase = (((time / 300) % 1) + 1) % 1;
    const night = phase < 0.2 || phase > 0.8;
    const day = phase > 0.24 && phase < 0.8;

    for (const m of u.mist || []) {
      const a = m.a0 + time * m.w;
      m.g.position.set(Math.cos(a) * m.r, m.y + Math.sin(time * 0.2 + m.a0) * 0.35, Math.sin(a) * m.r);
    }
    if (u.heli) {
      const a = time * 0.16, h = u.heli.g;
      h.position.set(Math.cos(a) * 27, 44 + Math.sin(time * 0.6) * 0.5, Math.sin(a) * 27);
      h.rotation.y = Math.atan2(-Math.cos(a), -Math.sin(a));
      u.heli.rotor.rotation.y = time * (reduced ? 4 : 22);
      u.heli.nav.scale.setScalar(0.2 * (0.6 + 0.8 * (Math.sin(time * 5) > 0 ? 1 : 0)));
    }
    for (const b of u.macaws || []) {
      b.g.visible = day;
      const a = time * b.w + b.ph;
      b.g.position.set(Math.cos(a) * b.r, b.y + Math.sin(time * 0.9 + b.ph) * 0.8, Math.sin(a) * b.r);
      b.g.rotation.y = Math.atan2(-Math.sign(b.w) * Math.cos(a), -Math.sign(b.w) * Math.sin(a));
      for (const w of b.wings) w.p.rotation.x = w.s * Math.sin(time * (reduced ? 3 : 9) + b.ph) * 0.7;
    }
    if (u.train) {
      const cyc = (time / 24) % 2, p = cyc < 1 ? cyc : 2 - cyc, e = smoothStep(0.08, 0.92, p), dir = cyc < 1 ? 1 : -1;
      const q = trackAt(e), y = height(q.x, q.z) + 0.45;
      const q2 = trackAt(Math.min(1, e + 0.02)), q1 = trackAt(Math.max(0, e - 0.02));
      const slope = Math.atan2(height(q2.x, q2.z) - height(q1.x, q1.z), Math.hypot(q2.x - q1.x, q2.z - q1.z) + 1e-6);
      u.train.position.set(q.x, y, q.z);
      u.train.rotation.set(0, Math.atan2(-q.dz * dir, q.dx * dir), dir * slope);
    }
    const nightF = phase >= 0.5 ? smoothStep(0.74, 0.84, phase) : 1 - smoothStep(0.2, 0.27, phase);
    for (const bm of u.beams || []) { bm.m.material.opacity = nightF * bm.alpha; bm.m.visible = nightF > 0.01; }
    if (u.search) u.search.rotation.y = time * 0.22;
    for (const f of u.fireworks || []) {
      const k = (((time + f.off) % 7) + 7) % 7 / 7, on = night && !reduced && k < 0.85;
      f.g.visible = on;
      if (!on) continue;
      const rad = 8 * (1 - (1 - k / 0.85) ** 2), op = Math.max(0, 1 - k / 0.85) ** 1.3;
      for (const s of f.sparks) {
        s.m.position.set(s.dx * rad, s.dy * rad - 1.8 * k * k * 4, s.dz * rad);
        s.m.material.opacity = op; s.m.scale.setScalar(0.3 + 0.6 * op);
      }
    }
    (u.flames || []).forEach((m, i) => { m.scale.setScalar((m.userData.baseS ??= m.scale.x) * (1 + (reduced ? 0.03 : 0.22) * Math.sin(time * 5 + i))); });
  }
  const smoothStep = (a, b, v) => { const t = clamp((v - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };

  function updateLighting(world, { glow = 0 } = {}) {
    const u = world.userData;
    for (const l of u.wallLights || []) l.m.material.color.set(l.day).lerp(new Color(l.night), glow);
    for (const l of u.localLights || []) l.intensity = glow * (l.userData.nightPower || 24);
  }

  return { build, animate, height, water: () => false, updateLighting };
}
