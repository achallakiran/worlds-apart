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
    // ====== The statue: ONE merged flat-colour mesh. Every part uses the same colour pipeline (so face, robe and arms
    // match exactly), faces are shaded per side (top light, bottom dark), and each vertex has a day and a night colour.
    // Statue space: arms along x, face toward +z, ~1 m units, 16 tall; turned 90 degrees so the arms span the default view.
    const BufGeo = Object.getPrototypeOf(cube.constructor);
    const Attr = cube.attributes.position.constructor;
    const SB = [];
    const P = (x, y, z, sx, sy, sz, c) => SB.push(z * SK, Y0 + y * SK, x * SK, sz * SK, sy * SK, sx * SK, c);
    const mixC = (c1, c2, t) => { const r = (c1 >> 16 & 255) + ((c2 >> 16 & 255) - (c1 >> 16 & 255)) * t, gg = (c1 >> 8 & 255) + ((c2 >> 8 & 255) - (c1 >> 8 & 255)) * t, bb = (c1 & 255) + ((c2 & 255) - (c1 & 255)) * t; return (r | 0) << 16 | (gg | 0) << 8 | (bb | 0); };
    const cl = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
    const CD = 0x78827a, CM = 0xaeb7a8, CL = 0xdce1d3, CH = 0xeef1e6;       // deep groove / stone / light / highlight
    const HD = 0x727a72, HM = 0x9ca496, HL = 0xbcc3b5;                       // hair
    const shade = (t) => mixC(CD, CL, cl(t, 0, 1));

    // ring of pleat/fold boxes around a rounded-rectangular cross-section
    function ring(yLo, yHi, a, b, lam, amp, backOnly, npFix) {
      const N = 720, pts = []; let L = 0, prev = null;
      for (let i = 0; i <= N; i++) {
        const t = i / N * Math.PI * 2, c = Math.cos(t), sn = Math.sin(t);
        const x = a * Math.sign(c) * Math.pow(Math.abs(c), 0.7), z = b * Math.sign(sn) * Math.pow(Math.abs(sn), 0.7);
        if (prev) L += Math.hypot(x - prev[0], z - prev[1]);
        pts.push([x, z, L]); prev = [x, z];
      }
      const np = npFix || Math.max(6, Math.round(L / lam)), h = yHi - yLo, yM = (yLo + yHi) / 2;
      P(0, yM, 0, 2 * (a - 0.03), h, 2 * b * 0.74, CD); P(0, yM, 0, 2 * a * 0.74, h, 2 * (b - 0.03), CD);
      let next = 0;
      for (const [x, z, l] of pts) {
        if (l < next) continue; next = l + 0.1;
        const r = 0.5 + 0.5 * Math.cos(l / L * np * Math.PI * 2);
        const rg = 1 - Math.pow(1 - r, 3), d = backOnly && z > 0 ? amp * 0.25 * rg : amp * rg;
        let nx = x / (a * a), nz = z / (b * b); const nl = Math.hypot(nx, nz) || 1; nx /= nl; nz /= nl;
        P(x + nx * d, yM, z + nz * d, 0.12, h, 0.12, shade(0.06 + 0.94 * rg));
      }
    }
    const skirtA = (y) => 2.15 - 0.6 * (y / 5.6), skirtB = (y) => 1.2 - 0.32 * (y / 5.6);
    const torsoA = (y) => 1.45 + 0.3 * smooth(8, 12.4, y), torsoB = (y) => 0.85 + 0.03 * smooth(8, 12.4, y);

    // ---- long skirt: ~35 deep rounded pleats all round, flaring to the hem ----
    for (let j = 0; j < 22; j++) {
      const y0 = j * 0.26, ym = y0 + 0.13;
      ring(y0, y0 + 0.26, skirtA(ym) + (j === 0 ? 0.08 : 0), skirtB(ym) + (j === 0 ? 0.06 : 0), 0.5, 0.2 + 0.06 * (1 - ym / 5.7), false, 30);
    }
    P(0, 0.08, 0, 4.75, 0.16, 2.8, CL);                                       // hem band
    for (const sd of [-1, 1]) P(sd * 0.7, 0.1, 1.35, 0.8, 0.2, 0.5, 0xc7cfc3);  // feet

    // ---- tunic: broad cloth folds, heavier on the back ----
    for (let j = 0; j < 17; j++) {
      const y0 = 5.6 + j * 0.4, ym = y0 + 0.2;
      ring(y0, y0 + 0.4, torsoA(ym), torsoB(ym), 0.75, 0.07, true, 14);
    }
    // front: smooth tunic with only the big forms — diagonal mantle, one long hanging fold, V neck, a few soft creases (each with an engraved groove)
    const MP0 = [-1.55, 12.4], MP1 = [1.45, 6.0], MV = [MP1[0] - MP0[0], MP1[1] - MP0[1]], ML = Math.hypot(MV[0], MV[1]);
    const MVx = MV[0] / ML, MVy = MV[1] / ML, MNx = -MVy, MNy = MVx;
    for (let yy = 5.8; yy < 12.9; yy += 0.06) {
      const a = torsoA(yy), zb = torsoB(yy) + 0.06;
      for (let xx = -a + 0.03; xx < a - 0.01; xx += 0.06) {
        const qx = -xx - MP0[0], qy = yy - MP0[1], al = qx * MVx + qy * MVy, di = qx * MNx + qy * MNy;
        let h = 0.02, t = 0.5;
        if (al > 0 && al < ML && Math.abs(di) < 0.6) {
          const e = 1 - (di / 0.6) ** 2, tp = Math.pow(Math.sin(Math.PI * al / ML), 0.4), gr = Math.exp(-((di / 0.05) ** 2));
          const fc = 0.5 + 0.5 * Math.sin(di * 36 + al * 1.5); h = 0.22 * Math.pow(e, 0.8) * tp - 0.08 * gr + 0.035 * fc * e; t = 0.3 + 0.6 * e - 0.35 * gr + 0.18 * (fc - 0.5) * e;
        } else if (al > 0.3 && al < ML - 0.6 && Math.abs(di - 1.0) < 0.32) {
          const e = 1 - ((di - 1.0) / 0.32) ** 2; h = 0.14 * e; t = 0.25 + 0.6 * e;
        }
        const hx = -xx - 0.08 * Math.sin(yy * 0.9), dx = Math.abs(hx - 1.45);
        if (dx < 0.5 && yy > 5.5 + 1.6 * dx && yy < 12.3) {
          const e = 1 - (dx / 0.5) ** 2, gr = Math.exp(-((dx / 0.05) ** 2)), fc2 = 0.5 + 0.5 * Math.sin(dx * 34 + yy * 0.8), hh2 = 0.26 * e - 0.08 * gr + 0.035 * fc2 * e;
          if (hh2 > h) { h = hh2; t = 0.25 + 0.65 * e - 0.3 * gr + 0.18 * (fc2 - 0.5) * e; }
        }
        for (const c of [9.0, 8.1, 7.2]) { const g = Math.exp(-(((yy - c + 0.18 * xx * xx) / 0.045) ** 2)); if (g > 0.05 && h < 0.1) { h -= 0.05 * g; t -= 0.35 * g; } }
        if (yy > 11.6 && yy < 13.0 && Math.abs(xx) < 0.12 + 0.5 * (yy - 11.6) / 1.4) { h = -0.05; t = 0.15; }
        const hh = Math.max(0.03, h + 0.05);
        P(xx, yy, zb - 0.04 + hh / 2, 0.065, 0.065, hh, shade(cl(t, 0, 1)));
      }
    }
    for (let xx = -1.65; xx < 1.65; xx += 0.1) {                                // overhanging scalloped hem of the tunic
      const sc = 0.5 + 0.5 * Math.cos(xx * 6.5), hh = 0.3 + 0.16 * sc;
      P(xx, 5.95 - hh / 2 + 0.1, torsoB(5.9) + 0.18, 0.1, hh, 0.3, shade(0.35 + 0.5 * sc));
      P(xx, 5.95 - hh + 0.1, torsoB(5.9) + 0.18, 0.1, 0.05, 0.32, CH);
    }
    for (let yy = 5.8; yy < 12.7; yy += 0.06) for (let xx = -1.7; xx < 1.7; xx += 0.06) {  // cloak folds down the back
      if (Math.abs(xx) > torsoA(yy) - 0.02) continue;
      const f = 0.5 + 0.5 * Math.sin(xx * 7 + 0.8 * Math.sin(yy * 0.7)), hh = 0.05 + 0.09 * f;
      P(xx, yy, -(torsoB(yy) + 0.06) - hh / 2 + 0.04, 0.065, 0.065, hh, shade(0.25 + 0.6 * f));
    }
    P(0, 12.95, 0, 3.8, 1.0, 1.5, CM);                                          // shoulders
    /*ARMDATA*/const ARM = {X0:2.5,DX:0.06,YT:13.3,DY:0.06,
 '1': {t:['ysqsspszzzxtvystzzyklzz.....zzzzzzzz...................zzzxttpeozz','rtvsqstvzzwuqnqswnhlvzzzzzzzzzzzzzzzvtuuuyyzzzxy..uvvwywwywsnkeomp','qqststwwwxvqnnnlhgltzzzzzzzzwzyyzzvsonqssvzzzursyvststtssusskdikjl','poqsuxzywvrnljfddkpvzzzzzwwwwzxwxqnqmmptvxzzssssvtqrqrprrqqpcdkkii','rstuuwwtppmmjccfnppzzzzuttuuyvvqdenqpqswzzxsrrrqrsqnnprrspqlbilkji','ruvusrqolkkfcgiiqpuzvuuutqtwuqlhhmoosvwzzvrstqpnoqmimrqoomlcchfef.','suusponljgdehiknoqyysusrsstrogcglmnpswyvqoqqnoqqlklloppoomgabca...','ssrpnmkhfcdefjlpluyttrqrspnkdehllmnsyysopkopnmomhmomoomoolcaa.....','rpmllkhcaedehkkmuvstrprqpnjedikknprxzsopmnlkmlhenpmnmonnqeaa......','pnjhhfdbbefgikmqtsrrppoolhffhilnnqwxsoppnklkhfgjpononnopgcba......','ligfdbbdfehjjlpsspqpmnljhgghjkmortuspponmkjgefinommonnpkbdcb......','hfecbbcfhghjmopqqoookigfgjkklnorvtqqolkllkgdfjlmnmmmnpmeddc.......','fdbaaceggiijnpomomllifdgjklnqnqutponljkjgdegikmmnonmpngcece.......','caaacegggijlmnnmkjkhfjhjlnoqrqrrpnmklmjeedgjlmmnnonnogbdcd........','aaacegiiijkmmlmlihiggllkmprqqrqonmkjkjfeiijlmnnnnnmolaacb.........','aacfghijklllkllighhjklmmnpqqnoomllligghiiklmmmmnnopleabb..........','bdegiiijlnnkjkhghhjkmnnoooopmlkkkjhfgijklklmmmmmmpoeadc...........','dfghijjklmkkjffijkllmnopomlnmkjihedfijklmkkllmmlnngbcdc...........','eghiijkkkkigefhjjlmnoooomkjjjigddfiiikmljkkklmmnnicbddc...........','ghiiijjkjhheeikklmnopomljihggdbdgijkmlkkllkkllmnidccbcd...........','hhiijjijkfeilkknooonmlkihhgeacffghklkkllklkkklnidbbddc............','hijjjjifdghjkllmmmmlkjihfdcceghijklkkllllllllljccbceb.............','hhijjhfefjklmmmmmmlkjigecbdeghijjllkkkllllnmmlfacedf..............','iiiheegikllmnnnmlkjhgfdbabehijkkklllllllmnmongbbcdf...............','jigefillklmnnnmlkigdcbbcdfhiijkjjklllllmmnlmjcaedag...............','ihgikljklllllkjhgecbaabdfghhhijihijjjjjkkkkgcccddd................','ijkkkkkkkmlkigecbaaabbcdfgggghhgffgggghhhhgdabddcg................','klllklllklkhecbbaaabccddeeffefeeddefeeeeeedcbcded.................','lllllkkjjigdbaaabccbbcdcccccbbcdefedccbbbdcaacd...................','llkkjhgffdcbaaabcbaadebbbbbbbbccdddddddcbddd......................','iihgfdcbaaaaaaabaaab..............dddedcc.........................','eedcbaaaaaaaaaaaa.................................................','baaaaaaaaaaaaaa...................................................','aaaaaaaaaabcc.....................................................','bbaaaaaaaa........................................................','aaaaaa............................................................','aaaa..............................................................','bc................................................................','a.................................................................'],
 r:['qieiidhsztrmpummwzsaazz.....vvwwvuuw...................zyyvqrlalzz','jlnkhjlouvsqkgkmsfaanzwrtvvvssssrqsrljkllssvywtv..prssvtuxvqjgamko','ijlmlnrssusmiiieaabmxztvwtsqnrpqyvmicchkkouzwolnurmpopqpqtrshafiik','ihknpuxwutojheaaadiqzzwusooopsqoqgcgcbflpszvmnmnspmnmnmoqpppaajjhh','noqrsvvrnnjkgaaajljwzzunllomtopjaaeihimrvztnmmnlnpmjjmpqsprlajmlji','osutrqpmjijcacfdnlrzrooonkospkdaaehhmqtwzrmoqmkjkojdirpnonlaaifef.','ruvsponliebcfgimlnyynqnmonpnjaaaeghlouxsmjmmjknohfijnopopogaaca...','stsqonlheabceikpjvzrqomoplifaabghhjpyxplmglmkjmjdjnkoomqrnbaa.....','tqnmmmicafddikklwwrspnponkeaaehgknqyzqmmjliikjeamqmnmqpqveaa......','spljjgdbbfgijlnrvtrqoommidabeeilkqxysnnomhkjfcdiqpnqoqsticba......','nkigfccehgjllnrvuqqplmjgecdehjloruwtpoomlkiebdioqnoqqruobedb......','jhgeddfjlkkmpssttpoojhecehjjknosyvrqnkklmkebeknooooortqfefd.......','igeccfikjnlnrtroqnmlhdafikmororxvqonkjkkgbdgiloopsqqusidgcf.......','fdcdgjllknopqqqomkkgeigjmoqsuttuqomklojdecglnopqqsrstjcedd........','cbehjmnnnnorqoqnjhiffmmlosuutusqpnlkllfdjjlnpqqqrrruqbbdb.........','deilmnoppqqpnpojhhijlnoopsttpqqomnnjggjkkmnpqqprrtvqgacc..........','giknoooprtsomnjhijkmoprrsrrspnnmmlighjlnonnppqqrrvugaee...........','jlnopppqqsonmggklmnopqtutppqqnlkifegkmnopnnopqqpttjdefd...........','lnppopqqpomifgjlmoqsttstrnmnmlieehkklnpomnnopqrssmedged...........','noppooppollgflonoqstutqpnmkjjfcfjmmnqpnnoooooqstmfeeddd...........','ooooponnoiglpoosttutrqpmlljhceijjkopooppnoooprtmgddgec............','opqqpomifjlnpqqrsssrponljhfeikmmnpqpppppppppqqoffdfgc.............','nooppmihinoqrrrrrsrqpoliffhjlnoopqrpppppqpsssrjcfhfh..............','poomihjnpqrstttssrpnlkigegkoopqqqssqqqqrrtsvvleeffh...............','qolijnrrprstuuusromjhgghiloqprrqqrrrrrrssvrtpedhgbh...............','omlnrrpqrrsssrqnmkigffhjmopppqqpnopppppqqqrlfffgfe................','oqqqqqqqrttspmkhgfffhhjkmnonnoomllmllmmmnmmgcegfch................','sttssstsstrokihhfdehiikkllmllllkjjklkjjjjihfeefge.................','uutttssrrpnjgfffhjiggijjiihhgghjklkihgfffhfdcdf...................','tttsrpnmmkigfeeghgefikgggfffffghiiiiiihgfhhg......................','rqpomkigfgffffefebcf..............hhiiigf.........................','mlkjhgedcccdddcbb.................................................','hgfffeeddbcddba...................................................','feeefeedeceed.....................................................','hhgeedccbb........................................................','fdedaa............................................................','ccba..............................................................','de................................................................','a.................................................................']},
 '-1': {t:['zzzzzzzzzzzzzzzyxwvxxzzzyyzzzzxwvwywttyzyzzzzz....zzzzyuvtoqqrvtsn','zzzzzzzzzzzyzzzxwwyxvxzxvzzzyzzxvutsrvxyywuvwvwzzzywvvutsrnmooljjj','yyyyyyyzzzzzzzzyxxwvwwwxxyzzzzyyxqpsuvvwwvvuwxvwyzxvttsrpqoonkkkki','wxxxyxyyyyyxyzzyxwwwwvvywwxyzzytqsuuustvwvuuvwwxzzxvttsrqqookhkiih','vwxyywxxywuuwzzzxvwxwvwxvwyzxupmputrsuutttuuuuuvvxyvuttsspppgejgff','vwxxxwwvvutvxzzzywwwvvxxwxzzunmrvuutrrsuvvuuuuvtuxwutttstqrndcfd..','vvwwwvvtrswxxwyzzyvuuvwwwywqkotuvvvutrtvwvuvtsttsttsrssstrrhbd....','vvwwwsrqqtxxxxxwxxutuvwwvumhpvvutttuvuwwutuvtssronrrrqrstunba.....','uvwvtqrrtvwyxwxywttttvvvshisttuuuuuvvutuvvtsttqoprssrqprsrib......','wvsqqqruwwwwyyxvsstuusqnhjqvuttuuvwwvuuuuuturnmosuutrppqqnfe......','wrnnqrtuwwwwvvutsrttqligmsvuuvuvvwvuuuttuusonopqrtvtsqqrmkhe......','plloquuvvwwvtssssssnhehmuxxvtvwvvutsrtsrrplkmprrrsutsrqqjgi.......','kknqrwwwwvvtuvtrrsnhdgnusyzvtuutssrrrssqlijpqopsttssrrolihg.......','noqssvwwwvuvvuuurnigjpsuwuvwurrrqqqqqqnkjlpqrsssttrrrpmikleg......','ssttrtuuvvvvvtqomjgipttuvusrqqqqpppnkhijloqqqpqqrrrssokilkhk......','vtttrttuuttssrokiiintutvtsrqpppoonkihgjmpqqqqqqqqqssrmhhlhhp......','usstrstuutrroljhgiosuttutsqonnnnlighkkmoqqpqssssrqqrojijnih.......','tstututsrrqpkggijnttsssrtrpmkkjihggjmnnooppqrrsrrqpqkgiikl........','ttuvtrssqonkihhlpsutrrsprpmkihgfghijkmllmopooooppppnighhik........','vuutqqqpnmkihgkrursutssqnmkihgghiklkikkkllmmmmnopqoihihjj.........','uusqorqnkiihiotttussrqpomkigffhjjkkkkkkkllllkmnoppiimljjh.........','ssrpopmjgghlquuuttsrpnmljhgfggikkklllkkllllmlmnnoniikkjh..........','srqonjgdeinquwuutqqoljhgfeefhjkkkkkkkkkkkllmlmllmkiihih...........','rqnkifdejqtutssromkigeccbbcegiihhhhhhiiiijjkkljkliijhh............','nkigeegmtwvvqoolhgecbaabaaacdeeeeeeeefffgggghihikhjjhh............','hfeghlquusqoljgfdbaaaabcbbcccccccddddddddeedegehkhkjh.............','feglotutpljhgebaaaaaaabdedddddccdcdddccdddeddddflhkj..............','hlnopqomjgedcaaaaaaaabdefeeddddddddcccccdddefcdc..................','mnnkihgecaaaaaaaaaaabcddddddddddccccbb.bbbaad.....................','jhfedaaaaaaaaaaabbbbcccccccbbbaaaaaa..............................','cbaaaaaaaaaaaaaabbaaaaa...........................................','aaaaaaaaaaa.......................................................','aaaaacc...........................................................','cb................................................................'],
 r:['rtqvsvzxwwqnpqpmkjimltzzoovwurlkjlnlhhnonorppp....sqqrpkmjfijksqpj','mmmmmonnqqnlnonkjkmlkmpnkqspnpqnkjigflnoolijkjkrtpnlkkkkkjfeiigeff','kllllmmmooonopomlmlklmlonpqrtrppnfdhklmmmlkjlmklppnljkkjhkhijgghhf','iklmmlmnnmnlmoonmlllmllonnoprspkfhkllikmnmkkmmmoqromkkkkjljlgchfgf','ikmnnlmnnkiilorqmkmomlnpmnqrpkfbfllijmlkjklllllmnpqonnnnolmnbagdcc','jlmnolllkjikmpsspnnommpppqttlcbiommliikmnnnmlnnlnrponoooqnqlaaaa..','klmnnmlifhmonnprsqnlmoooprqhaelnnoonliloqpnpmkmlkmnllmoorpqdaa....','lmnoojhfgkopooooqqnlmopqpncagoonmnnnoorromoqnllkhfklmmnprukaa.....','lmonkhhikmorqoqrommmnpqqlaalnnonnnopqpooqqomookhilmnnlmorqda......','onkihhjmopoprsrollmopnjfaajqpnoopqrrrppqqpppmgfinqrqnmmopkaa......','ojeehklnpqqppponllooleaafnrppqqqrsrqpqppqqojhijlnpsrpnopjgba......','gbcfiooopqrpnmmnnnohaaagquvspstrrrqonqpoolgehlnnnosqpppoebd.......','aafjkqqqqqqnprpmnoiaaairpwysqrrqpoooopqngcdmmjlprqqpppmidca.......','dgjlmqrssqpqrqrrnibadlqsussurnnonnooonkfehmopqpprspppojefgaa......','llnoloppqqrrsqnkhdaclrrsutqooooonoolidefiloonnnopqprrnhdheaa......','pnoomoppqqqpppkeccdkstsusrponoonnmjgedgkopppoooooprrqkddhaah......','omnomnprrpnokgfcbdlrutsutrpnmmnnlhegjkmpqqpqrssrqppqngeeiaa.......','nmprqrqpooomgbbdgltsrssrtspmkjjihffjnppppppqrrsrqpppidedfd........','oprsqoppomjgecdioswurstqsqnkiigegikllonmnpqpnoopppqmfcdcbc........','qqrqnoonljifdcisvstwuturpoljihijknpnjnmmmmnnmmnoqrogefdec.........','rrqnlpolhfedfouvvxvuutsronkihhknnoooonnnnnnnlnpprqhglifda.........','pppnmolgdcfkrxyxwwwvtrpomkjijknpqqqqpooooooomopoqohgihda..........','pponmidabhosyzzyxuuspmkjiiikmoqqqqppppooooopoponolhheea...........','ppmjhdbcksxzxxxwsqnljgffefgjmopnnnmmlmmmmnmnnollmihhdb............','ljgedcgoyzzzvstpljgfeddecdegikkjjjiiijjjjjjjklijlgigca............','fcdfiouzzzwtpmjhfedccdfgggghhhhgghhhhggggggeghehkfigb.............','ddhntzzzvqnkjhedcbccbdfhjiihhggggfgggffffffeeccelfie..............','hnruvwurnjhfecbabbbbcegijihgfffffeeeddddddddeaaa..................','osspnmkhecbbbaaacbaacefffeeddddccbbaaa.aaaaaa.....................','lkihgcbaaaaaaaabbbbbccbbbaaaaaaaaaaa..............................','cccbbaaaaaaaaaaaaaaaaaa...........................................','aaaaaaaaaaa.......................................................','aaaaabb...........................................................','aa................................................................']},
};/*ENDARMDATA*/
    for (const sd of [-1, 1]) {
      P(sd * 7.0, 12.88, 0, 1.2, 0.66, 0.76, 0xb4bcab);                         // forearm
      P(sd * 6.45, 12.88, 0, 0.12, 0.8, 0.9, CL);                               // cuff
      P(sd * 7.55, 12.82, 0, 0.7, 0.5, 0.8, 0xcfd6c6);                          // palm
      for (let f = 0; f < 4; f++) P(sd * 8.1, 12.84, -0.3 + f * 0.2, 0.55, 0.1, 0.15, 0xcfd6c6); // fingers
      P(sd * 7.7, 12.76, 0.48, 0.4, 0.1, 0.2, 0xcfd6c6);                        // thumb
      // arm: a tapered cylinder (wide at the shoulder, narrower at the wrist) wrapped in robe, built from 0.1 blocks snapped to a grid;
      // folds spiral along the arm, with a little sag underneath
      // sleeve traced from the reference photo: one block per cell, silhouette + fold relief + tone taken from the image
      P(sd * 2.2, 12.7, 0, 0.6, 1.25, 1.1, CM);                                      // filler where the sleeve joins the shoulder
      const ad = ARM[String(sd)], nc = ad.t[0].length;
      for (let i = 0; i < nc; i++) {
        let j0 = -1, j1 = -1;
        for (let j = 0; j < ad.t.length; j++) if (ad.t[j][i] !== '.') { if (j0 < 0) j0 = j; j1 = j; }
        if (j0 < 0) continue;
        for (let j = j0; j <= j1; j++) {
          const tc = ad.t[j][i]; if (tc === '.') continue;
          const v = ((j - j0) / Math.max(1, j1 - j0)) * 2 - 1, zb = 0.6 * Math.sqrt(Math.max(0.02, 1 - v * v));
          const rl = (ad.r[j].charCodeAt(i) - 110) / 12 * 0.32, zf = Math.max(0.06, zb + rl), zk = -Math.max(0.05, zb * 0.85);
          P(sd * (ARM.X0 + i * ARM.DX), ARM.YT - j * ARM.DY, (zf + zk) / 2, ARM.DX + 0.005, ARM.DY + 0.005, zf - zk, shade(0.04 + 0.95 * (tc.charCodeAt(0) - 97) / 25));
        }
      }
    }

    // ---- head: face at ~0.06 m cells as a relief map ----
    P(0, 13.8, 0, 0.95, 0.7, 0.95, 0xb9c1b1);                                   // neck
    P(0, 13.42, 0.4, 1.0, 0.1, 0.4, CD);                                         // shadow under the chin
    P(0, 15.15, 0, 1.25, 1.4, 1.15, 0xc2cabb);                                   // upper head (y 14.45–15.85)
    P(0, 14.2, 0.0, 0.95, 0.5, 1.0, 0xbcc4b5);                                   // jaw
    P(0, 13.8, -0.05, 0.6, 0.3, 0.8, 0xb7bfb0);                                  // chin
    P(0, 15.7, -0.12, 1.6, 0.7, 1.45, HM);                                       // crown of hair
    P(0, 14.7, -0.64, 1.6, 2.5, 0.5, HM);                                        // hair behind
    const zf0 = (y) => (y > 14.45 ? 0.575 : y > 13.95 ? 0.5 : 0.4);
    const PIT = 0.06;
    for (let yy = 13.72; yy < 15.8; yy += PIT) {
      const v = yy - 14.95;                                                       // eyes sit at v = +0.3
      const half = v >= -0.35 ? 0.6 : 0.6 - (-0.35 - v) * 0.44;
      for (let xx = -0.6; xx <= 0.601; xx += PIT) {
        const ax = Math.abs(xx);
        if (ax > half + 0.001) continue;
        let d = 0.04 + 0.1 * (1 - (xx / 0.64) ** 2), tone = 0.55, col = null;
        if (v > 0.45) d += 0.03;                                                  // forehead
        if (v > 0.52 && v < 0.88 && ax < 0.45 && Math.abs(((v - 0.52) % 0.15) - 0.07) < 0.025) { d -= 0.025; tone = 0.3; } // forehead lines
        if (v > 0.38 && v < 0.5 && ax > 0.08 && ax < 0.52) { d += 0.1 - 0.06 * (ax / 0.5); tone = 0.65 + 0.2 * Math.sin(xx * 60); } // brow with hair lines
        if (v > 0.18 && v < 0.38 && ax > 0.1 && ax < 0.5) {                      // eye socket
          d -= 0.07;
          if (v > 0.28 && ax > 0.14 && ax < 0.45) { col = 0x4a514b; }              // upper lid / lash line
          else if (v > 0.22 && ax > 0.17 && ax < 0.42) { d += 0.05; tone = 0.9; }  // eyeball
          else if (v < 0.22) { d += 0.03; tone = 0.4; }                            // lower lid
          if (ax < 0.16) { d -= 0.03; tone = 0.25; }                               // inner corner
        }
        if (ax < 0.07 && v > -0.2 && v < 0.42) d += 0.26;                         // nose bridge
        else if (ax < 0.13 && v > -0.14 && v < 0.35) d += 0.18 * (1 - (ax - 0.07) / 0.06 * 0.5); // nose sides
        if (v > -0.25 && v < -0.1 && ax < 0.17) {                                  // tip and wings
          d += ax < 0.09 ? 0.34 : 0.22; tone = ax < 0.09 ? 0.9 : 0.6;
          if (v < -0.17 && ax > 0.04 && ax < 0.1) { col = 0x555d56; d -= 0.1; }    // nostrils
        }
        if (ax > 0.2 && ax < 0.5 && v > -0.08 && v < 0.2) d += 0.06;              // cheekbones
        if (ax > 0.25 && ax < 0.48 && v > -0.4 && v < -0.12) { d -= 0.03; tone = 0.35; } // cheek hollows
        if (v > -0.34 && v < -0.26 && ax < 0.04) { d -= 0.02; tone = 0.3; }       // philtrum
        if (v > -0.47 && v < -0.27 && ax < 0.44 - 0.3 * Math.max(0, ax - 0.2)) { d += 0.1; tone = 0.5 + 0.35 * Math.sin(xx * 70 + v * 20); } // moustache with strands
        if (v > -0.53 && v <= -0.47 && ax < 0.2) { d += 0.07; tone = 0.8; }       // upper lip
        if (v > -0.57 && v <= -0.53 && ax < 0.2) { col = 0x535b54; d -= 0.04; }    // mouth line
        if (v > -0.65 && v <= -0.57 && ax < 0.16) { d += 0.09; tone = 0.85; }      // lower lip
        if (v > -0.7 && v <= -0.65 && ax < 0.14) { d -= 0.03; tone = 0.25; }        // under-lip shadow
        if (v <= -0.7) { const ang = Math.atan2(xx, -(v + 0.45)); const rr = 0.5 + 0.5 * Math.cos(ang * 22); d += 0.13 + 0.05 * rr; tone = 0.35 + 0.5 * rr; } // beard strands converging to the point
        if (ax > 0.5 && ax <= 0.6 && v > -0.3) { d -= 0.02; tone = 0.4; }          // temples / jaw edge
        d = cl(d, 0.02, 0.52);
        P(xx, yy, zf0(yy) + d / 2, PIT, PIT, d, col !== null ? col : shade(0.12 + 0.55 * cl(d / 0.4, 0, 1) + 0.3 * (tone - 0.5)));
      }
    }
    // hair: parted in the middle, individual strands, locks falling to the shoulders
    for (const sd of [-1, 1]) {
      for (let j = 0; j < 8; j++) {
        for (let sg = 0; sg < 6; sg++) {
          const yc = 15.85 - sg * 0.48 - 0.24, wob = 0.03 * Math.sin(j * 1.3 + sg * 0.9);
          P(sd * (0.68 + 0.08 * j + 0.022 * sg + wob), yc, 0.02 - 0.03 * j, 0.085, 0.5, 1.2 - 0.06 * j, mixC(HD, HL, j % 2 ? 0.3 : 0.75));
        }
      }
    }
    for (let k = -9; k <= 9; k++) for (let sg = 0; sg < 3; sg++) P(k * 0.075, 15.62 + sg * 0.14 * 0 + (sg - 1) * 0.0, 0.6 - sg * 0.02, 0.07, 0.2 + sg * 0.0, 0.07, mixC(HD, HL, 0.5 + 0.4 * Math.sin(k * 1.7))); // hair framing the forehead
    for (const xx of [-0.75, -0.55, -0.35, -0.18, 0.18, 0.35, 0.55, 0.75]) P(xx, 16.06, -0.12, 0.04, 0.03, 1.3, HD);       // strands over the crown
    P(0, 16.065, 0.06, 0.06, 0.03, 1.35, 0x5f675f);                              // centre parting
    for (let k = -4; k <= 4; k++) P(k * 0.17, 14.95, -0.92, 0.05, 2.4, 0.04, k % 2 ? HD : HM);  // strands down the back

    // ---- turn the boxes into one mesh ----
    const NB = SB.length / 7, pos = new Float32Array(NB * 72), dayC = new Float32Array(NB * 72), nightC = new Float32Array(NB * 72), idx = [];
    const FACES = [[0.92, [[1, -1, -1], [1, 1, -1], [1, 1, 1], [1, -1, 1]]], [0.7, [[-1, -1, 1], [-1, 1, 1], [-1, 1, -1], [-1, -1, -1]]],
      [1.0, [[-1, 1, -1], [-1, 1, 1], [1, 1, 1], [1, 1, -1]]], [0.5, [[-1, -1, 1], [-1, -1, -1], [1, -1, -1], [1, -1, 1]]],
      [0.84, [[-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]]], [0.68, [[1, -1, -1], [-1, -1, -1], [-1, 1, -1], [1, 1, -1]]]];
    const CREAM = new Color(0xfff1cf), tmp = new Color();
    for (let i = 0; i < NB; i++) {
      const [x, y, z, sx, sy, sz, c] = SB.slice(i * 7, i * 7 + 7);
      tmp.set(c); const lum = 0.3 * tmp.r + 0.59 * tmp.g + 0.11 * tmp.b, kN = 0.38 + 0.62 * cl((lum - 0.1) / 0.65, 0, 1);
      FACES.forEach(([f, verts], fi) => {
        verts.forEach(([vx, vy, vz], vi) => {
          const o = (i * 24 + fi * 4 + vi) * 3;
          pos[o] = x + vx * sx / 2; pos[o + 1] = y + vy * sy / 2; pos[o + 2] = z + vz * sz / 2;
          dayC[o] = tmp.r * f; dayC[o + 1] = tmp.g * f; dayC[o + 2] = tmp.b * f;
          const fn = kN * (0.55 + 0.45 * f);
          nightC[o] = CREAM.r * fn; nightC[o + 1] = CREAM.g * fn; nightC[o + 2] = CREAM.b * fn;
        });
        const b0 = i * 24 + fi * 4; idx.push(b0, b0 + 1, b0 + 2, b0, b0 + 2, b0 + 3);
      });
    }
    const geo = new BufGeo(), colAttr = new Attr(new Float32Array(dayC), 3);
    geo.setAttribute('position', new Attr(pos, 3)); geo.setAttribute('color', colAttr); geo.setIndex(idx);
    const statueMesh = new Mesh(geo, new BasicMaterial({ vertexColors: true, side: 2 }));
    statueMesh.userData.motion = true; statueMesh.userData.ownedMaterial = true; statueMesh.raycast = () => {}; statueMesh.frustumCulled = false;
    world.add(statueMesh);
    U.statue = { attr: colAttr, day: dayC, night: nightC, glow: 0 };

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
    const st = u.statue;
    if (st && Math.abs(glow - st.glow) > 0.004) {
      const arr = st.attr.array, d = st.day, n = st.night;
      for (let i = 0; i < arr.length; i++) arr[i] = d[i] + (n[i] - d[i]) * glow;
      st.attr.needsUpdate = true; st.glow = glow;
    }
  }

  return { build, animate, height, water: () => false, updateLighting };
}
