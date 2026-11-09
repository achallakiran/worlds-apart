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
  const K = 1.4;                          // statue scale
  const PLAT = 5.8;                       // terrace radius
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
    macaw: [0, HS + (3.6 + 5.4) * K, 6.3 * K],
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
        if (!sea && !cliff && h > 4 && hash(x, z + 9) > 0.93) g(x, h + 0.15, z, 0.9, 0.3, 0.9, pick(GRANITE, z, x));
      }
    }

    // ---------- jungle: canopy trees, palms, a few flowering ipes ----------
    for (let x = -28; x <= 28; x += 1.6) {
      for (let z = -22; z <= 24; z += 1.6) {
        const px = x + hash(x, z) * 1.2, pz = z + hash(z, x) * 1.2;
        const r = Math.hypot(px, pz), h = height(px, pz);
        if (r < PLAT + 1.2 || h < 0.8 || h > 9.4 || isSea(px, pz) || hash(x + 5, z + 2) < 0.6) continue;
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

    // ---------- the statue (floodlit lamps so it glows at night) ----------
    const y0 = HS + 3.6 * K;
    g(0, HS + 1.8 * K, 0, 3.8 * K, 3.6 * K, 3.8 * K, 0x2c2f35);
    g(0, HS + 3.45 * K, 0, 4.0 * K, 0.3 * K, 4.0 * K, 0x3a3e45);
    g(1.93 * K, HS + 1.5 * K, 0, 0.08, 1.0 * K, 1.4 * K, 0x474c55);
    // statue is modelled with arms along local x and face toward +z; it is turned 90 degrees so the arms span the default view
    const S = (x, y, z, sx, sy, sz, day, night) => lamp(z * K, y0 + y * K, x * K, sz * K, sy * K, sx * K, day, night);
    S(0, 1.6, 0, 2.2, 3.2, 1.5, 0xcdd3c8, 0xfff1cf);            // robe
    for (let k = -2; k <= 2; k++) for (const s of [-1, 1]) S(k * 0.42, 1.6, s * 0.77, 0.1, 3.0, 0.06, 0x98a094, 0xe4c88a); // pleats
    S(0, 4.5, 0, 2.6, 2.6, 1.4, 0xd5dacf, 0xfff4d8);             // torso
    S(0, 5.3, 0, 3.4, 0.9, 1.0, 0xc4cabf, 0xfff1cf);             // shoulders
    for (const s of [-1, 1]) {
      S(s * 4.1, 5.2, 0, 3.0, 0.8, 0.95, 0xc9cfc4, 0xfff1cf);     // arms
      S(s * 5.7, 5.05, 0, 1.2, 0.7, 0.9, 0xd2d6cc, 0xffeec7);
      S(s * 6.3, 5.15, 0, 0.7, 0.55, 0.75, 0xdde0d6, 0xfff4d8);   // hands
      for (let i = 0; i < 7; i++) S(s * (1.7 + i * 0.7), 4.5 - i * 0.08 - (2.0 - i * 0.26) / 2 + 0.4, 0, 0.72, 2.0 - i * 0.26, 0.6, 0xa7aea2, 0xf0d9a6); // sleeve drape
    }
    S(0, 6.1, 0, 0.8, 0.5, 0.8, 0xdcdfd5, 0xfff1cf);             // neck
    S(0, 6.9, 0, 1.15, 1.4, 1.15, 0xd9ddd2, 0xfff6e0);           // head
    S(0, 6.95, -0.35, 1.35, 1.55, 0.7, 0xb4bbaf, 0xf6e2b4);      // hood
    S(0, 6.95, 0.62, 0.22, 0.4, 0.2, 0xcdd1c6, 0xe9d3a0);        // nose
    S(0, 6.45, 0.55, 0.5, 0.35, 0.2, 0xd5d9cf, 0xf2dca6);        // beard

    // floodlights and beams at the foot of the pedestal
    for (const [sx, sz] of [[4.1, 4.1], [-4.1, 4.1], [4.1, -4.1], [-4.1, -4.1]]) {
      g(sx, HS + 0.2, sz, 0.7, 0.4, 0.7, 0x2a2d33);
      lamp(sx, HS + 0.55, sz, 0.45, 0.2, 0.45, 0xe9e6dc, 0xfff4c0);
      U.beams.push({ m: lamp(sx * 0.9, HS + 6.5, sz * 0.9, 0.6, 12, 0.6, 0xfff4c0, 0xfff4c0, { alpha: 0 }), alpha: 0.4 });
    }
    // slow sweeping searchlights
    const lights = motion(o(0, 0, 0)); U.search = lights;
    for (let k = 0; k < 3; k++) {
      const a = k / 3 * Math.PI * 2;
      const piv = motion(o(Math.cos(a) * 5.0, HS + 0.6, Math.sin(a) * 5.0)); piv.rotation.y = -a; lights.add(piv);
      const t = 0.5, L = 26, m = lamp(Math.sin(t) * L / 2, Math.cos(t) * L / 2, 0, 0.9, L, 0.9, 0xd8f3ff, [0xbfe9ff, 0xffd9a8, 0xe3c8ff][k], { alpha: 0, parent: piv });
      m.rotation.z = -t; U.beams.push({ m, alpha: 0.34 });
    }

    // ---------- the bay, Sugarloaf cable car, distant island ----------
    g(-14, 1.0, -21, 4.2, 2.2, 3.6, 0x3f7a45);
    for (let k = 0; k < 6; k++) g(-14 + (hash(k, 1) - 0.5) * 3, 2.2, -21 + (hash(k, 2) - 0.5) * 2.4, 1.4, 0.9, 1.4, pick(FOREST, k, 3));
    g(SUGAR[0], height(SUGAR[0], SUGAR[1]) + 0.1, SUGAR[1] + 3.2, 0.3, 0.3, 4.6, 0x6b6e75); // cable
    g(SUGAR[0] - 0.4, 6.4, SUGAR[1] - 1.6, 0.3, 3, 0.3, 0x6b6e75);

    // ---------- the city on the east plain ----------
    const PASTEL = [0xe8e0d0, 0xd9c8a8, 0xc9d6dc, 0xe6c9c0, 0xd8d8d0, 0xcfd9c6];
    for (let gx = 15.5; gx <= 27; gx += 3) {
      for (let gz = 4.5; gz <= 21.5; gz += 3) {
        if (Math.hypot(gx - 18.5, gz - 13.5) < 1.5) continue;
        const hgt = 3 + Math.floor(hash(gx, gz) * 6), w = 2.1 + hash(gz, gx) * 0.5, y = height(gx, gz);
        g(gx, y + hgt / 2, gz, w, hgt, w, pick(PASTEL, gx, gz));
        g(gx, y + hgt + 0.1, gz, w + 0.15, 0.2, w + 0.15, 0x8a8f96);
        if (hash(gx + 1, gz + 1) > 0.35) lamp(gx - 0.3, y + hgt * 0.62, gz - w / 2 - 0.03, 0.9, 0.5, 0.05, 0x9fb4c6, hash(gx, gz + 7) > 0.5 ? 0xffd27a : 0xfff0b0);
      }
    }
    for (let k = 0; k < 6; k++) g(14.4, height(14.4, 4 + k * 3.2) + 0.15, 4 + k * 3.2, 0.2, 0.3, 1.6, 0x4a4d54); // main street dashes

    // ---------- tourists, mist, helicopter, macaws, train ----------
    walker(-4.2, 4.0, 4.2, 4.0, 0xd9a441, 1);
    walker(4.2, -4.2, -4.2, -4.2, 0x2f6f8f, 2);
    walker(4.4, -3.2, 4.4, 3.2, 0xc0392b, 3);
    walker(-4.4, 3.2, -4.4, -3.2, 0x2e9b4a, 4);

    for (let i = 0; i < 8; i++) {
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
      U.macaws.push({ g: bird, wings, r: 11 + k * 3, w: (k ? -1 : 1) * (0.3 + 0.05 * k), y: 20 + k * 2.6, ph: k * 2.1 });
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
      h.position.set(Math.cos(a) * 17, 31 + Math.sin(time * 0.6) * 0.5, Math.sin(a) * 17);
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
