/*TOWER*/const TOWER_T = {strips:1,cols:8,rows:24,t:[
'lahprtrk',
'zpqtottk',
'znruptwk',
'zoqpqtrk',
'ypqqotsl',
'xsqrptpl',
'woquptrl',
'wopqnsrl',
'vmpqqtpm',
'xoppossm',
'voqsnspm',
'vsqtqtum',
'vpopnstn',
'voprrspn',
'vooqssrn',
'tqprssuo',
'tooqrsro',
'ssornspo',
'stpsrsro',
'sportsoo',
'rrqsqspp',
'rporosqp',
'qsrsrssp',
'rponoppq'
]};/*ENDTOWER*/
/*WALLS*/const WALL_T = {strips:1,cols:30,rows:5,t:[
'hgflvvvonpppopppmicccciokjjien',
'ikkmffghjlnooqqsomhfdcillklnot',
'giknlhhhffhgdfehimoqtvwwtpjggh',
'mklkkkkjiijjglgmgjkfjifhggimll',
'mmlklkklkllllmmlkkkiklhkgekmmm'
]};/*ENDWALLS*/
/*
 * Egypt — "Lighthouse of Alexandria" (egypt-lighthouse-alexandria). Second scenery of Egypt, second of the Ancient Seven.
 *
 * The Pharos: a walled rocky island in the harbour of Alexandria with a tall tapering square tower (windowed shaft traced from the
 * reference poster), an octagonal middle storey, a round lantern storey topped by a bronze dome and a statue. A long arched causeway
 * (the Heptastadion) runs to the city on the right. The lantern burns all day (smoke plume) and at night a bright beam sweeps the sea.
 * The sea is fully animated: drifting ripples, sun / lamp glints, breaking foam around the island, sailing ships with bobbing hulls.
 * Tower faces and the courtyard wall are traced from reference images (tools/stages/extract_facade.py): TOWER and WALLS.
 * The ten differences are spread around the island (every ~36 degrees); four are lights that look the same by day.
 */
function createStage(E) {
  const { Mesh, BasicMaterial, PointLight, Color, hash } = E;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const smooth = (a, b, v) => { const t = clamp((v - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };
  const TC = [0, -3], SEA = 0.4, FLOOR = 2.0, CH = 7.5;      // tower centre, sea level, courtyard floor, courtyard half width
  const edgeR = (a) => 16.5 + 1.2 * Math.sin(3 * a) + 0.8 * Math.sin(5 * a + 1);
  const onIsland = (x, z) => { const dx = x - TC[0], dz = z - TC[1]; return Math.hypot(dx, dz) <= edgeR(Math.atan2(dz, dx)); };
  const inCourt = (x, z) => Math.abs(x - TC[0]) <= CH + 0.6 && Math.abs(z - TC[1]) <= CH + 0.6;
  function islandTop(x, z, jit) {
    if (inCourt(x, z)) return FLOOR;
    const dx = x - TC[0], dz = z - TC[1], r = Math.hypot(dx, dz), e = edgeR(Math.atan2(dz, dx));
    return Math.floor((1.1 + 1.0 * (1 - smooth(8, e, r)) + (jit || 0) * 0.5) * 2) / 2;
  }
  function height(x, z) {
    if (x > 15 && x < 22.2 && Math.abs(z - 0.5) < 1) return 2.4;      // causeway deck
    if (x >= 21.5 && z > -16 && z < 12) return 1.4;                     // harbour city
    if (!onIsland(x, z)) return 0.5;
    return islandTop(x, z, 0);
  }
  const mix = (a, b, t) => { const r = (a >> 16 & 255) + ((b >> 16 & 255) - (a >> 16 & 255)) * t, g = (a >> 8 & 255) + ((b >> 8 & 255) - (a >> 8 & 255)) * t, bl = (a & 255) + ((b & 255) - (a & 255)) * t; return (r | 0) << 16 | (g | 0) << 8 | (bl | 0); };
  const ROCK = [0xc58a4e, 0xb87a40, 0xd29a5c, 0xa96c38, 0xc08048];
  const ROCKD = [0x8f5a30, 0x7d4e2a, 0x9a6438];
  const SANDS = [0xd9b98a, 0xd2ad7c, 0xe0c394];
  const LEAF = [0x2f7a3a, 0x3d8f45, 0x4aa04c, 0x58b055];
  const GOLD = 0xd8a43a, STONE = 0xd8c39a, WOOD = 0x7a4a28;
  const D = {
    obelisk: [12.5, -3], harbour: [10, 5], ship: [6, 17], palm: [-4, 9], corner: [-7.5, 4.5],
    fishers: [-12.5, -3], rocklamp: [-9, -11], banner: [-3, -15], brazier: [5, -14], arches: [10.5, -9],
  };
  const hwAt = (y) => 3.1 - 0.9 * clamp((y - 2.8) / 10.4, 0, 1);

  function build(ctx, variant) {
    const { box: g, group: o, makeDiff: B } = ctx;
    const U = ctx.world.userData;
    const pick = (arr, a, b) => arr[Math.floor(hash(a, b) * arr.length)];
    const motion = (grp) => { grp.userData.motion = true; return grp; };
    U.wallLights = []; U.beams = []; U.ripples = []; U.glints = []; U.foam = []; U.ships = []; U.people = []; U.gulls = []; U.smoke = []; U.flames = []; U.sweep = null;

    function lamp(x, y, z, sx, sy, sz, dayColor, nightColor, opts = {}) {
      const m = new Mesh(ctx.cube, new BasicMaterial(opts.alpha !== undefined ? { color: dayColor, transparent: true, opacity: opts.alpha, depthWrite: false } : { color: dayColor }));
      m.position.set(x, y, z); m.scale.set(sx, sy, sz);
      m.userData.ownedMaterial = true; m.userData.motion = true;
      if (!opts.pickable) m.raycast = () => {};
      (opts.parent || ctx.world).add(m);
      U.wallLights.push({ m, day: dayColor, night: nightColor });
      return m;
    }
    const person = (parent, x, y, z, c) => { const p = motion(o(x, y, z)); parent.add(p); g(0, 0.45, 0, 0.3, 0.9, 0.24, c, p); g(0, 1.08, 0, 0.26, 0.26, 0.26, 0xe8c9a0, p); g(0, 1.27, 0, 0.32, 0.12, 0.32, 0xf0e8d0, p); return p; };
    function palm(parent, x, y, z, s) {
      const h = 2.6 + hash(s, x) * 1.4;
      g(x, y + h / 2, z, 0.3, h, 0.3, 0x8a6a3a, parent);
      for (let r = 0.5; r < h; r += 0.7) g(x, y + r, z, 0.36, 0.1, 0.36, 0x6e5230, parent);
      g(x, y + h, z, 2.3, 0.12, 0.4, pick(LEAF, s, 1), parent); g(x, y + h + 0.02, z, 0.4, 0.12, 2.3, pick(LEAF, s, 2), parent);
      g(x + 0.7, y + h - 0.25, z + 0.7, 1.2, 0.1, 0.4, pick(LEAF, s, 3), parent); g(x - 0.7, y + h - 0.25, z - 0.7, 1.2, 0.1, 0.4, pick(LEAF, s, 4), parent);
      g(x + 0.7, y + h - 0.25, z - 0.7, 0.4, 0.1, 1.2, pick(LEAF, s, 5), parent); g(x - 0.7, y + h - 0.25, z + 0.7, 0.4, 0.1, 1.2, pick(LEAF, s, 6), parent);
    }
    function ship(parent, sail, stripe) {
      const b = motion(o(0, 0, 0)); parent.add(b);
      g(0, 0.3, 0, 3.6, 0.5, 1.1, WOOD, b); g(1.9, 0.6, 0, 0.6, 0.6, 0.8, WOOD, b); g(-1.9, 0.8, 0, 0.5, 0.9, 0.8, 0x5a3a20, b); g(0, 0.58, 0, 3.2, 0.1, 0.9, 0xc9a06a, b);
      g(0, 2.3, 0, 0.12, 3.4, 0.12, 0x5a3f28, b); g(0.1, 2.55, 0, 0.1, 2.2, 2.2, sail, b); g(0.16, 2.6, 0, 0.05, 0.42, 2.2, stripe, b); g(0.1, 3.7, 0, 0.1, 0.1, 2.7, 0x5a3f28, b);
      person(b, -1.3, 0.62, 0, stripe);
      return b;
    }

    // ---------- sea ----------
    const bottom = -2.4;
    g(0, (bottom + SEA - 0.08) / 2, 0, 52, SEA - 0.08 - bottom, 48, 0x1a4f8a);
    lamp(0, SEA, 0, 52, 0.12, 48, 0x2f86c9, 0x0b2142);
    for (let x = -22; x <= 18; x++) for (let z = -22; z <= 17; z++) {         // shallow turquoise water around the island
      const dx = x - TC[0], dz = z - TC[1], r = Math.hypot(dx, dz), e = edgeR(Math.atan2(dz, dx));
      if (r > e && r < e + 2.6 && !(x > 14 && Math.abs(z - 0.5) < 2.5)) g(x, SEA + 0.09, z, 1.02, 0.04, 1.02, mix(0x56c4d8, 0x2f86c9, (r - e) / 2.6));
    }
    // ---------- island: rocky cliffs, sandy top ----------
    for (let x = -20; x <= 20; x++) for (let z = -22; z <= 16; z++) {
      if (!onIsland(x, z)) continue;
      const j = hash(x * 1.7, z * 2.3), h = islandTop(x, z, j), court = inCourt(x, z);
      const dx = x - TC[0], dz = z - TC[1], r = Math.hypot(dx, dz), e = edgeR(Math.atan2(dz, dx)), rim = r > e - 1.6;
      g(x, (bottom + h) / 2 - 0.05, z, 1.02, h - bottom - 0.1, 1.02, rim ? pick(ROCKD, x, z) : pick(ROCK, x, z));
      g(x, h - 0.08, z, 1.03, 0.2, 1.03, court ? pick(SANDS, x, z) : rim ? pick(ROCK, x + 3, z) : hash(x + 4, z + 9) > 0.8 ? 0x8aa05a : pick(SANDS, x, z));
    }

    // ---------- courtyard walls with traced arcades, corner towers, gate ----------
    for (const [sx, sz] of [[0, 1], [0, -1], [1, 0], [-1, 0]]) {
      const len = 2 * CH, hgt = 3.2, cx = TC[0] + sx * CH, cz = TC[1] + sz * CH;
      g(cx, FLOOR + hgt / 2, cz, sx ? 0.9 : len, hgt, sz ? 0.9 : len, 0xcfa56f);
      const cols = WALL_T.cols, rows = WALL_T.rows, cw = len / cols, rh = (hgt - 0.35) / rows;
      for (let c = 0; c < cols; c++) for (let r = 0; r < rows; r++) {
        const ch = WALL_T.t[r][(c + (sx ? 11 : 0)) % cols], t = (ch.charCodeAt(0) - 97) / 25;
        const dark = t < 0.18, col = dark ? 0x4a3020 : mix(0x9c6f40, 0xe6c08a, t), dep = dark ? 0.03 : 0.05 + 0.09 * t, u = -CH + (c + 0.5) * cw, y = FLOOR + 0.1 + rh * (rows - 1 - r + 0.5);
        if (sz > 0 && Math.abs(u) < 1.3 && y < FLOOR + 2.6) continue;
        if (sz) g(TC[0] + u, y, cz + sz * (0.45 + dep / 2), cw * 1.03, rh * 1.03, dep, col); else g(cx + sx * (0.45 + dep / 2), y, TC[1] + u, dep, rh * 1.03, cw * 1.03, col);
      }
      for (let u = -CH + 0.6; u <= CH - 0.6; u += 1.2) g(sz ? TC[0] + u : cx, FLOOR + hgt + 0.25, sz ? cz : TC[1] + u, 0.55, 0.5, 0.55, 0xd9b98a);
      g(cx, FLOOR + hgt + 0.02, cz, sx ? 1.1 : len, 0.14, sz ? 1.1 : len, GOLD);
    }
    lamp(TC[0], FLOOR + 1.3, TC[1] + CH + 0.5, 2.0, 2.5, 0.08, 0x1c1208, 0xffc468);                            // gate opening, lit at night
    g(TC[0], FLOOR + 2.7, TC[1] + CH + 0.55, 2.4, 0.3, 0.2, GOLD);
    for (const [sx, sz] of [[1, 1], [-1, 1], [1, -1], [-1, -1]]) {
      const x = TC[0] + sx * CH, z = TC[1] + sz * CH;
      g(x, FLOOR + 2.8, z, 2.6, 5.6, 2.6, 0xd2ad7c); g(x, FLOOR + 5.7, z, 3.0, 0.3, 3.0, GOLD);
      for (const [mx, mz] of [[-1.2, -1.2], [1.2, -1.2], [-1.2, 1.2], [1.2, 1.2], [0, -1.2], [0, 1.2], [-1.2, 0], [1.2, 0]]) g(x + mx, FLOOR + 6.1, z + mz, 0.5, 0.6, 0.5, 0xd9b98a);
      if (sz > 0) lamp(x, FLOOR + 3.4, z + 1.33, 0.4, 0.8, 0.08, 0x3a2418, 0xffc468);
      if (!(sx < 0 && sz > 0)) {
        g(x, FLOOR + 6.5, z, 0.7, 0.4, 0.7, 0x6e5230); lamp(x, FLOOR + 6.95, z, 0.5, 0.45, 0.5, 0xc9803a, 0xff9a3a);
        U.beams.push({ m: lamp(x, FLOOR + 7.5, z, 1.2, 1.6, 1.2, 0xffb060, 0xffb060, { alpha: 0 }), alpha: 0.22 });
      }
    }
    for (const s of [-1, 1]) {                                                             // obelisks beside the gate
      const x = TC[0] + s * 3.6, z = TC[1] + CH + 1.9, y = FLOOR;
      g(x, y + 0.3, z, 1.2, 0.6, 1.2, STONE); g(x, y + 1.6, z, 0.8, 2.0, 0.8, 0xd2ad7c); g(x, y + 3.1, z, 0.6, 1.2, 0.6, 0xd9b98a); g(x, y + 3.85, z, 0.4, 0.4, 0.4, GOLD);
    }

    // ---------- the Pharos tower ----------
    g(TC[0], FLOOR + 0.4, TC[1], 7.4, 0.8, 7.4, 0xc4946a); g(TC[0], FLOOR + 0.85, TC[1], 7.0, 0.14, 7.0, GOLD);
    for (let i = 0; i < 5; i++) { const y0 = 2.8 + i * 2.08, hw = hwAt(y0 + 1.04); g(TC[0], y0 + 1.04, TC[1], 2 * hw, 2.1, 2 * hw, 0xd2a972); }
    {
      const rows = TOWER_T.rows, cols = TOWER_T.cols, rh = 10.4 / rows;
      for (let r = 0; r < rows; r++) {
        const y = 2.8 + rh * (rows - 1 - r + 0.5), hw = hwAt(y), cw = 2 * hw / cols;
        for (let c = 0; c < cols; c++) for (let side = 0; side < 4; side++) {
          const ch = TOWER_T.t[r][(c + side * 3) % cols], t = (ch.charCodeAt(0) - 97) / 25, dark = t < 0.22, dep = dark ? 0.04 : 0.06 + 0.08 * t;
          const col = dark ? 0x3a2a22 : mix(0xb8803c, 0xf0b868, t), u = -hw + (c + 0.5) * cw, s = cw * 1.04;
          if (dark && side < 2 && (c + r) % 2 === 0) {
            const wl = lamp(0, y, 0, 0.3, rh * 0.8, 0.3, 0x3a2418, hash(c, r) > 0.5 ? 0xffb85a : 0xffd98a);
            if (side === 0) wl.position.set(TC[0] + u, y, TC[1] + hw + 0.13); else wl.position.set(TC[0] + hw + 0.13, y, TC[1] - u);
            if (side === 0) wl.scale.set(0.3, rh * 0.8, 0.08); else wl.scale.set(0.08, rh * 0.8, 0.3);
            continue;
          }
          if (side === 0) g(TC[0] + u, y, TC[1] + hw + dep / 2, s, rh * 1.04, dep, col); else if (side === 1) g(TC[0] + hw + dep / 2, y, TC[1] - u, dep, rh * 1.04, s, col);
          else if (side === 2) g(TC[0] - u, y, TC[1] - hw - dep / 2, s, rh * 1.04, dep, col); else g(TC[0] - hw - dep / 2, y, TC[1] + u, dep, rh * 1.04, s, col);
        }
      }
    }
    g(TC[0], 13.35, TC[1], 5.4, 0.3, 5.4, 0x2d4a63); g(TC[0], 13.62, TC[1], 4.9, 0.24, 4.9, GOLD);
    for (const [mx, mz] of [[-2.2, -2.2], [2.2, -2.2], [-2.2, 2.2], [2.2, 2.2], [0, -2.4], [0, 2.4], [-2.4, 0], [2.4, 0]]) g(TC[0] + mx, 14.0, TC[1] + mz, 0.55, 0.6, 0.55, 0x2d4a63);
    { // octagonal middle storey: two squares turned 45 degrees
      g(TC[0], 16.1, TC[1], 3.3, 4.8, 3.3, 0xdcb985);
      const r45 = motion(o(TC[0], 16.1, TC[1])); ctx.world.add(r45); r45.rotation.y = Math.PI / 4; g(0, 0, 0, 3.3, 4.8, 3.3, 0xd6b17b, r45);
      for (const [wx, wz, sx, sz] of [[0, 1.7, 0.4, 0.08], [0, -1.7, 0.4, 0.08], [1.7, 0, 0.08, 0.4], [-1.7, 0, 0.08, 0.4]]) for (const y of [14.9, 16.4, 17.6]) lamp(TC[0] + wx, y, TC[1] + wz, sx, 0.7, sz, 0x3a2418, 0xffc468);
      g(TC[0], 18.65, TC[1], 4.0, 0.25, 4.0, GOLD);
    }
    { // round lantern storey, gallery, lantern, dome, statue
      g(TC[0], 20.2, TC[1], 2.1, 3.0, 2.1, 0xe3c28f);
      const r2 = motion(o(TC[0], 20.2, TC[1])); ctx.world.add(r2); r2.rotation.y = Math.PI / 4; g(0, 0, 0, 2.1, 3.0, 2.1, 0xdfbb86, r2);
      g(TC[0], 21.85, TC[1], 3.0, 0.22, 3.0, GOLD);
      for (const [mx, mz] of [[-1.3, -1.3], [1.3, -1.3], [-1.3, 1.3], [1.3, 1.3]]) g(TC[0] + mx, 22.2, TC[1] + mz, 0.14, 0.7, 0.14, 0x6e5230);
      for (const [mx, mz] of [[-0.55, -0.55], [0.55, -0.55], [-0.55, 0.55], [0.55, 0.55]]) g(TC[0] + mx, 22.9, TC[1] + mz, 0.14, 1.3, 0.14, 0x6e5230);
      U.flames.push(lamp(TC[0], 22.95, TC[1], 0.9, 1.1, 0.9, 0xffe9a8, 0xfff2c0));
      g(TC[0], 23.75, TC[1], 1.7, 0.26, 1.7, 0xb87333); g(TC[0], 24.0, TC[1], 1.2, 0.26, 1.2, 0xb87333); g(TC[0], 24.25, TC[1], 0.7, 0.26, 0.7, 0xb87333);
      g(TC[0], 24.9, TC[1], 0.28, 1.0, 0.28, GOLD); g(TC[0] - 0.3, 25.0, TC[1], 0.4, 0.1, 0.1, GOLD); g(TC[0], 25.55, TC[1], 0.26, 0.26, 0.26, GOLD);
      // beam sweeping the sea at night
      const sweep = motion(o(TC[0], 22.95, TC[1])); ctx.world.add(sweep);
      const mats = [lamp(14.5, 0, 0, 29, 0.8, 1.4, 0xfff4c0, 0xfff4c0, { alpha: 0, parent: sweep }), lamp(-14.5, 0, 0, 29, 0.8, 1.4, 0xfff4c0, 0xfff4c0, { alpha: 0, parent: sweep })];
      U.sweep = { g: sweep, mats };
      U.beams.push({ m: lamp(TC[0], 23.0, TC[1], 3.0, 3.0, 3.0, 0xfff0b0, 0xfff0b0, { alpha: 0 }), alpha: 0.3 });
      for (let k = 0; k < 6; k++) U.smoke.push({ m: lamp(TC[0], 26, TC[1], 1, 1, 1, 0x8a8a90, 0x4a4a58, { alpha: 0.4 }), ph: k / 6 });
    }

    // ---------- causeway (Heptastadion) and the harbour city ----------
    g(18.9, 2.15, 0.5, 8.2, 0.35, 1.9, 0xd9b98a);
    for (const z of [-0.35, 1.35]) g(18.9, 2.55, 0.5 + (z - 0.5), 8.2, 0.4, 0.2, 0xe6c996);
    for (let x = 15.4; x < 22.3; x += 1.5) { g(x, 0.8, 0.5, 0.5, 2.4, 1.7, 0xc4946a); g(x + 0.75, 1.85, 0.5, 1.0, 0.3, 1.7, 0xc4946a); }
    for (let x = 15.8; x < 22; x += 2.2) { g(x, 2.85, -0.3, 0.1, 0.9, 0.1, 0x3a2f27); lamp(x, 3.4, -0.3, 0.26, 0.3, 0.26, 0xe8dcb8, 0xffc468); }
    g(24, (bottom + 1.4) / 2, -2, 5, 1.4 - bottom, 28, 0x9a6438);
    g(24, 1.32, -2, 5.1, 0.2, 28.1, 0xd9b98a);
    for (let i = 0; i < 12; i++) {
      const bx = 22.8 + (i % 2) * 2.2, bz = -14 + Math.floor(i / 2) * 4.4, hgt = 2 + hash(i, 4) * 2.2;
      if (Math.abs(bz - 0.5) < 2.5) continue;
      g(bx, 1.4 + hgt / 2, bz, 1.8, hgt, 2.2, pick(SANDS, i, 2)); g(bx, 1.4 + hgt + 0.1, bz, 2.0, 0.2, 2.4, 0xb8864e);
      if (hash(i, 8) > 0.6) { g(bx, 1.4 + hgt + 0.5, bz, 1.1, 0.6, 1.1, 0xe6c996); g(bx, 1.4 + hgt + 0.95, bz, 0.6, 0.4, 0.6, 0xe6c996); }
      lamp(bx - 0.92, 1.4 + hgt * 0.55, bz, 0.08, 0.6, 0.5, 0x3a2418, 0xffc468);
    }
    for (const [x, z] of [[22.4, -9], [22.4, 5], [25, -6], [25, 8]]) palm(ctx.world, x, 1.4, z, 300 + x * z);
    // ---------- rim palms, huts, fishing nets, people, gulls ----------
    for (const [x, z] of [[-7, 11.5], [-10.5, 8.5], [11, 8], [13.5, 4], [-14, -9], [2, -16.5], [-14.5, 2.5], [9, -13.5]]) { if (onIsland(x, z)) palm(ctx.world, x, islandTop(x, z, 0), z, 100 + x + z * 7); }
    for (const [x, z, w] of [[8.5, 8.4, 2.2], [11.5, 7.2, 1.8], [-11, 7.5, 2.0]]) {
      const y = islandTop(x, z, 0); g(x, y + 0.9, z, w, 1.6, w, pick(SANDS, x, z)); g(x, y + 1.8, z, w + 0.3, 0.2, w + 0.3, 0xb8864e);
      lamp(x + w / 2 + 0.03, y + 0.9, z, 0.08, 0.6, 0.5, 0x3a2418, 0xffc468);
    }
    const peopleCols = [0xc0392b, 0x2e7bd6, 0xe0b030, 0x2e9b4a];
    for (const [x1, z1, x2, z2, y, i] of [[-6, 2.2, 6, 2.2, FLOOR, 0], [-6, -8, 6, -8, FLOOR, 1], [15.6, 0.5, 22, 0.5, 2.35, 2]]) {
      const p = person(ctx.world, x1, y, z1, peopleCols[i]); U.people.push({ g: p, x1, z1, x2, z2, y, sp: 0.04 + 0.01 * i, ph: i * 1.3 });
    }
    for (let k = 0; k < 5; k++) {
      const d = motion(o(0, 0, 0)); ctx.world.add(d);
      g(0, 0, 0, 0.5, 0.2, 0.2, 0xf5f0e6, d); g(0.28, 0.06, 0, 0.18, 0.18, 0.16, 0xf5f0e6, d);
      const wings = [-1, 1].map((s) => { const p = motion(o(0, 0.08, s * 0.1)); d.add(p); g(0, 0.04, s * 0.32, 0.4, 0.05, 0.6, 0xe8e4da, p); return { p, s }; });
      U.gulls.push({ g: d, wings, r: 9 + k * 2.6, w: (k % 2 ? -1 : 1) * (0.2 + 0.03 * k), y: 12 + k * 2.2, ph: k * 1.3 });
    }

    // ---------- sailing ships ----------
    for (const [z, A, w, ph, sail, stripe, sc] of [[21.8, 20, 0.04, 0.5, 0xf3ecd8, 0xc0392b, 1], [19.3, 21, 0.031, 3.4, 0xf3ecd8, 0x2e7bd6, 0.85], [-21.8, 20, 0.036, 1.9, 0xe8dcc0, 0xe0b030, 0.9]]) {
      const s = ship(ctx.world, sail, stripe); s.scale.set(sc, sc, sc);
      U.ships.push({ g: s, z, A, w, ph, wake: [] });
    }
    // ---------- sea ripples, glints, breaking foam ----------
    for (let i = 0; i < 120; i++) {
      const x0 = hash(i, 1) * 52 - 26, z = hash(i, 2) * 44 - 22, sp = 0.25 + hash(i, 3) * 0.4;
      if (onIsland(x0, z)) continue;
      const m = lamp(0, SEA + 0.13, z, 0.9 + hash(i, 9) * 1.1, 0.04, 0.14, 0xdff3ff, 0x6f8fc0, { alpha: 0.5 });
      U.ripples.push({ m, x0, z, sp, fl: 0.8 + hash(i, 5) * 1.4, ph: hash(i, 6) * 6.3, a: 0.55 });
    }
    for (let i = 0; i < 40; i++) {
      const x = hash(i, 21) * 48 - 24, z = hash(i, 22) * 40 - 21;
      if (onIsland(x, z) || x > 14) continue;
      U.glints.push({ m: lamp(x, SEA + 0.15, z, 0.22, 0.05, 0.22, 0xffffff, 0xffc878, { alpha: 0 }), ph: hash(i, 23) * 6.3, f: 1.2 + hash(i, 24) * 1.5, a: 0.9 });
    }
    for (let i = 0; i < 90; i++) {
      const a = i / 90 * Math.PI * 2, r = edgeR(a) + 0.5, x = TC[0] + Math.cos(a) * r, z = TC[1] + Math.sin(a) * r;
      if (x > 14 && Math.abs(z - 0.5) < 2.6) continue;
      const m = lamp(x, SEA + 0.16, z, 1.1, 0.06, 1.1, 0xffffff, 0x9cb4d8, { alpha: 0.6 });
      U.foam.push({ m, a, ph: i * 0.55 });
    }

    // ================= DIFFERENCES (every ~36 degrees around the island) =================
    // 0 (0 deg): obelisk cap — gold or turquoise
    B(0, D.obelisk[0], islandTop(...D.obelisk, 0), D.obelisk[1], 'Obelisk cap colour: gold or turquoise', 2.6, (d) => {
      g(0, 0.3, 0, 1.4, 0.6, 1.4, STONE, d); g(0, 1.8, 0, 0.9, 2.4, 0.9, 0xd2ad7c, d); g(0, 3.3, 0, 0.7, 0.8, 0.7, 0xd9b98a, d); g(0, 3.9, 0, 0.5, 0.5, 0.5, variant ? 0x2ec4b6 : GOLD, d);
    }, variant);
    // 1 (39 deg): harbour lanterns — amber or cyan at night
    B(1, D.harbour[0], islandTop(...D.harbour, 0), D.harbour[1], 'Harbour lantern colour', 2.4, (d) => {
      g(0, 0.2, 0, 3.0, 0.4, 1.2, STONE, d);
      for (const s of [-1, 1]) { g(s * 1.2, 1.0, 0, 0.14, 1.6, 0.14, 0x3a2f27, d); lamp(s * 1.2, 1.95, 0, 0.42, 0.44, 0.42, 0xe8dcb8, variant ? 0x4fd8ff : 0xffb23a, { parent: d, pickable: true }); }
    }, variant);
    // 2 (74 deg): anchored ship — present or absent
    B(2, D.ship[0], SEA, D.ship[1], 'Anchored ship in the harbour', 3.0, (d) => {
      g(2.2, 0.35, 0.9, 0.3, 0.7, 0.3, 0xc0392b, d);
      if (!variant) { const s = ship(d, 0xf3ecd8, 0x2e9b4a); s.rotation.y = 0.5; }
    }, variant);
    // 3 (108 deg): beach palm — present or absent
    B(3, D.palm[0], islandTop(...D.palm, 0), D.palm[1], 'Beach palm: present or absent', 2.4, (d) => {
      if (!variant) palm(d, 0, 0, 0, 77); else { g(0, 0.25, 0, 0.9, 0.5, 0.9, 0x58b055, d); g(0.3, 0.2, 0.2, 0.5, 0.4, 0.5, 0x3d8f45, d); }
    }, variant);
    // 4 (135 deg): corner tower fire — orange or green at night
    B(4, D.corner[0], FLOOR + 6.6, D.corner[1], 'Corner tower fire colour', 2.2, (d) => {
      U.flames.push(lamp(0, 0.45, 0, 0.7, 0.7, 0.7, 0xc9803a, variant ? 0x4dff8a : 0xff7a2a, { parent: d, pickable: true }));
    }, variant);
    // 5 (180 deg): fishermen on the rocks — three or two
    B(5, D.fishers[0], islandTop(...D.fishers, 0), D.fishers[1], 'Fishermen on the rocks: three or two', 3.0, (d) => {
      const cs = [0xc0392b, 0x2e7bd6, 0xe0b030];
      for (const [i, x, z] of [[0, -1.2, 0.3], [1, 0.2, -0.6], [2, 1.5, 0.4]].slice(0, variant ? 2 : 3)) { person(d, x, 0.2, z, cs[i]); g(x - 0.5, 1.3, z, 0.9, 0.05, 0.05, 0x3a2f27, d); }
    }, variant);
    // 6 (222 deg): rock lanterns — amber or green at night
    B(6, D.rocklamp[0], islandTop(...D.rocklamp, 0), D.rocklamp[1], 'Rock lantern colour', 2.4, (d) => {
      for (const k of [-1, 0, 1]) { g(k * 1.1, 0.7, -0.4 * k, 0.12, 1.4, 0.12, 0x3a2f27, d); lamp(k * 1.1, 1.55, -0.4 * k, 0.4, 0.4, 0.4, 0xe8dcb8, variant ? 0x6bff8a : 0xffb23a, { parent: d, pickable: true }); }
    }, variant);
    // 7 (256 deg): banner on the pole — red or blue
    B(7, D.banner[0], islandTop(...D.banner, 0), D.banner[1], 'Banner colour: red or blue', 2.4, (d) => {
      g(0, 1.8, 0, 0.14, 3.6, 0.14, 0x3a2f27, d); g(0.6, 3.1, 0, 1.2, 0.9, 0.06, variant ? 0x2e7bd6 : 0xc0392b, d); g(0.6, 3.1, 0.04, 0.5, 0.4, 0.04, GOLD, d); g(0, 0.2, 0, 1.0, 0.4, 1.0, STONE, d);
    }, variant);
    // 8 (294 deg): seaside brazier — red or blue at night
    B(8, D.brazier[0], islandTop(...D.brazier, 0), D.brazier[1], 'Seaside brazier colour', 2.6, (d) => {
      g(0, 0.5, 0, 0.9, 1.0, 0.9, 0x6e5230, d); g(0, 1.1, 0, 1.2, 0.2, 1.2, 0x3a2f27, d);
      U.flames.push(lamp(0, 1.5, 0, 0.7, 0.7, 0.7, 0xd9d6cc, variant ? 0x7fd0ff : 0xff4a2a, { parent: d, pickable: true }));
    }, variant);
    // 9 (330 deg): sea-gate arcade — three arches or two
    B(9, D.arches[0], islandTop(...D.arches, 0), D.arches[1], 'Pier arcade: three arches or two', 2.8, (d) => {
      const n = variant ? 2 : 3, w = 1.6;
      for (let i = 0; i <= n; i++) g(-n * w / 2 + i * w, 0.9, 0, 0.45, 1.8, 0.9, 0xc4946a, d);
      for (let i = 0; i < n; i++) g(-n * w / 2 + (i + 0.5) * w, 1.95, 0, w, 0.3, 0.9, 0xd9b98a, d);
      g(0, 2.25, 0, n * w + 0.6, 0.2, 1.1, GOLD, d);
    }, variant);

    // night-only differences: they exist all day; they simply look identical until dusk
    for (const i of [1, 4, 6, 8]) { const diff = U.diffs[i]; diff.nightOnly = true; diff.hintPhase = 0.86; diff.g.userData.motion = true; }

    U.localLights = [];
    for (const [x, y, z, color, power] of [[0, 27, -3, 0xffe0a0, 110], [-6, 6, 4, 0xffc27a, 55], [6, 6, 4, 0xffc27a, 55], [0, 6, -9, 0xffc27a, 45], [19, 5, 0.5, 0xffc27a, 50], [24, 6, -4, 0xffc27a, 40]]) {
      const l = new PointLight(color, 0, 26, 1.5);
      l.position.set(x, y, z); l.userData.nightPower = power; ctx.world.add(l); U.localLights.push(l);
    }
  }

  // Daily story (300 s = one day): ships tack up and down the harbour, ripples drift and foam breaks on the rocks, gulls circle the
  // tower, guards patrol, smoke rises from the lantern; after dusk the lantern beam sweeps the sea and every window and brazier glows.
  function animate(world, time, reduced = false) {
    const u = world.userData, t = reduced ? time * 0.4 : time;
    const phase = (((time / 300) % 1) + 1) % 1;
    const day = phase > 0.24 && phase < 0.8;
    const nightF = phase >= 0.5 ? smooth(0.74, 0.84, phase) : 1 - smooth(0.2, 0.27, phase);
    for (const r of u.ripples || []) {
      r.m.position.x = (((r.x0 + t * r.sp + 26) % 52) + 52) % 52 - 26;
      r.m.material.opacity = r.a * (0.2 + 0.8 * Math.pow(0.5 + 0.5 * Math.sin(t * r.fl + r.ph), 2)) * (1 - 0.5 * nightF);
    }
    for (const q of u.glints || []) { const s = Math.max(0, Math.sin(t * q.f + q.ph)); q.m.material.opacity = q.a * s * s * s * (day ? 1 : 0.35 + 0.65 * nightF); }
    for (const f of u.foam || []) {
      const k = 0.5 + 0.5 * Math.sin(t * 1.5 - f.ph), r = edgeR(f.a) + 0.35 + 0.45 * k;
      f.m.position.x = TC[0] + Math.cos(f.a) * r; f.m.position.z = TC[1] + Math.sin(f.a) * r;
      f.m.scale.set(0.8 + 0.5 * k, 0.06, 0.8 + 0.5 * k); f.m.material.opacity = 0.2 + 0.55 * (1 - k);
    }
    for (const b of u.ships || []) {
      const a = t * b.w + b.ph, dirc = Math.cos(a);
      b.g.position.set(Math.sin(a) * b.A, SEA - 0.05 + Math.sin(t * 1.6 + b.ph) * 0.07, b.z);
      b.g.rotation.y = -Math.PI * (1 - smooth(-0.12, 0.12, dirc));
      b.g.rotation.z = Math.sin(t * 1.2 + b.ph) * 0.04; b.g.rotation.x = Math.sin(t * 0.9 + b.ph) * 0.03;
    }
    for (const p of u.people || []) {
      const a = t * p.sp + p.ph, f = 0.5 + 0.5 * Math.sin(a);
      p.g.position.set(p.x1 + (p.x2 - p.x1) * f, p.y + Math.abs(Math.sin(t * 4 + p.ph)) * 0.06, p.z1 + (p.z2 - p.z1) * f);
      p.g.rotation.y = (Math.cos(a) * (p.x2 - p.x1) >= 0) ? 0 : Math.PI;
    }
    for (const b of u.gulls || []) {
      b.g.visible = day;
      const a = t * b.w + b.ph;
      b.g.position.set(TC[0] + Math.cos(a) * b.r, b.y + Math.sin(t * 0.7 + b.ph) * 0.9, TC[1] + Math.sin(a) * b.r);
      b.g.rotation.y = Math.atan2(-Math.sign(b.w) * Math.cos(a), -Math.sign(b.w) * Math.sin(a));
      for (const w of b.wings) w.p.rotation.x = w.s * Math.sin(t * 7 + b.ph) * 0.5;
    }
    for (const s of u.smoke || []) {
      const f = ((t * 0.08 + s.ph) % 1 + 1) % 1;
      s.m.position.set(TC[0] + f * 5, 25.6 + f * 8, TC[1] + f * 1.2); s.m.scale.setScalar(0.6 + f * 1.8);
      s.m.material.opacity = (1 - f) * 0.5 * (day ? 1 : 0.35);
    }
    for (const f of u.flames || []) { const b = f.userData.sc || (f.userData.sc = [f.scale.x, f.scale.y, f.scale.z]); f.scale.set(b[0] * (1 + 0.08 * Math.sin(t * 9 + f.position.x)), b[1] * (1 + 0.18 * Math.sin(t * 7 + f.position.z)), b[2] * (1 + 0.08 * Math.sin(t * 8))); }
    if (u.sweep) {
      u.sweep.g.rotation.y = t * 0.5;
      for (const m of u.sweep.mats) { m.material.opacity = nightF * 0.34; m.visible = nightF > 0.01; }
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
