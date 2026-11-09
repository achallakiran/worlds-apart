/*
 * Jordan — "Rose City of Petra" (jordan-petra-treasury)
 *
 * Stage package: world.js (this file) + stage.json (metadata) + differences.json (catalogue)
 * + music.mp3. tools/stages/build_stages.py injects every package into the release bundle.
 *
 * Rules kept identical to the other sceneries:
 *  - paired panels built from the same code, variant flag decides A/B;
 *  - exactly 10 differences (indexes 0-9), two of them night-only (8, 9);
 *  - same helper context (box, group, person, walker, makeDiff, ...);
 *  - same day/night hooks (animate, updateLighting) and hint phases.
 *
 * Coordinates: Y up, 1 unit = 1 voxel. Treasury faces +Z (towards the default camera).
 */
function createStage(E) {
  const { Mesh, BasicMaterial, PointLight, Color, Vector3, hash, pathStep, inWindow } = E;

  const Y0 = 0.2; // plaza floor height
  const NIGHT = [[0, 0.2], [0.78, 1]];

  // ---------- palette ----------
  const ROCK = [0xd99f7b, 0xcf9270, 0xe0ae88, 0xc58660, 0xbb7c5a, 0xe6bb98];
  const ROCK_DARK = [0xa8664a, 0xb5724f, 0x9d5f45];
  const SAND = [0xe7cba2, 0xdfc094, 0xead1ab, 0xd9b98c];
  const DUNE = [0xe9cf9f, 0xe1c28f, 0xd8b684];
  const FACE = 0xdc9f7a, FACE_LIGHT = 0xe9b892, FACE_SHADE = 0xb9795a, DARK = 0x2b1d1a;

  // ---------- terrain ----------
  const CX = -1, AX = 13.5, CZ = 6, AZ = 16;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const basin = (x, z) => (Math.abs(x - CX) / AX) ** 4 + (Math.abs(z - CZ) / AZ) ** 4;
  const inButte = (x, z) => x >= 9 && x <= 21.5 && z >= -14 && z <= -3;

  function height(x, z) {
    if (inButte(x, z)) return Y0 + 13 + Math.floor(hash(x, z) * 2) * 0.5;
    if (x >= 9 && x <= 22 && z > -3 && z <= 6) return Y0; // forecourt in front of the Royal Tombs
    const d = basin(x, z);
    if (d < 1) return Y0;
    const t = Math.pow(clamp((d - 1) * 6, 0, 1), 0.6);
    const back = (22 - 14 * clamp((Math.abs(x) - 8) / 5, 0, 1)) * clamp((CZ - z - 10) / 6 + 0.55, 0, 1);
    const left = 10 * clamp((CX - x - 8) / 6 + 0.3, 0, 1);
    const right = 4 * clamp((x - CX - 12) / 6, 0, 1) + hash(x, z) * 1.2;
    const front = 3 * clamp((z - CZ - 14) / 6, 0, 1);
    const target = Math.max(back, left, right, front);
    return Y0 + Math.floor((t * target + hash(x + 3, z - 7) * 0.9) * 2) / 2;
  }

  // ---------- builder ----------
  function build(ctx, variant) {
    const { box: g, group: o, makeDiff: B, person: man, walker, world, cube } = ctx;
    const U = world.userData;
    U.petraLights = [];
    U.petraActors = [];
    const pick = (arr, a, b) => arr[Math.floor(hash(a, b) * arr.length)];

    // emissive box: dull by day, glowing at night (same idea as the other stages)
    function lamp(x, y, z, sx, sy, sz, dayColor, nightColor, opts = {}) {
      const m = new Mesh(cube, new BasicMaterial({ color: dayColor }));
      m.position.set(x, y, z);
      m.scale.set(sx, sy, sz);
      m.userData.ownedMaterial = true;
      m.userData.motion = true;
      if (!opts.pickable) m.raycast = () => {};
      (opts.parent || world).add(m);
      U.petraLights.push({ m, day: dayColor, night: nightColor });
      return m;
    }

    // -- ground and cliffs, stratified like the real sandstone --
    for (let x = -29; x <= 29; x++) {
      for (let z = -25; z <= 25; z++) {
        if ((x / 30.5) ** 4 + (z / 26.5) ** 4 > 1.18 + hash(x, z) * 0.06) continue;
        const h = height(x, z);
        const bottom = -2.2 - hash(x, z) * 0.7;
        if (h < 1) {
          // sand floor, with a darker rock base underneath
          g(x, (bottom + h) / 2 - 0.1, z, 1.025, h - bottom - 0.2, 1.025, pick(ROCK_DARK, x, z));
          g(x, h - 0.08, z, 1.03, 0.2, 1.03, pick(SAND, x, z));
        } else {
          const onDune = x > 12.5 && h < 6;
          // layered strata for tall rock, 1.5 units per band
          g(x, (bottom + 0.5) / 2, z, 1.025, 0.5 - bottom, 1.025, pick(ROCK_DARK, x, z));
          for (let y = 0.5; y < h; y += 1.5) {
            const top = Math.min(h, y + 1.5);
            const band = onDune ? pick(DUNE, x, Math.floor(y)) : ROCK[(Math.floor(y / 1.5) + Math.floor(hash(x, z) * 2)) % ROCK.length];
            g(x, (y + top) / 2, z, 1.03, top - y + 0.02, 1.03, band);
          }
        }
        if (h < 1 && hash(x + 11, z + 5) > 0.97 && Math.hypot(x - 2, z - 6) > 6) {
          g(x + 0.2, h + 0.2, z, 0.5, 0.4, 0.5, 0xc7a577); // pebbles
        }
      }
    }

    // sand path from the Siq mouth to the Treasury steps
    const route = [[-8, 22], [-7, 16], [-3, 9], [-1, 2], [0, -6]];
    for (let i = 0; i < route.length - 1; i++) {
      const [x1, z1] = route[i], [x2, z2] = route[i + 1];
      const n = Math.ceil(Math.hypot(x2 - x1, z2 - z1) * 1.5);
      for (let k = 0; k <= n; k++) {
        const x = x1 + ((x2 - x1) * k) / n, z = z1 + ((z2 - z1) * k) / n;
        g(x, height(x, z) + 0.07, z, 2.6, 0.12, 2.6, 0xf0d9b0);
      }
    }

    // ---------------- Al-Khazneh (the Treasury) ----------------
    const TZ = -9; // facade column plane
    g(0, Y0 + 9.6, TZ - 0.7, 15.4, 19.2, 0.9, FACE); // carved backplate
    for (let s = 0; s < 4; s++) g(0, Y0 + 0.15 + s * 0.28, TZ + 1.7 - s * 0.45, 10 - s * 0.8, 0.3, 1.2, s % 2 ? FACE_SHADE : FACE_LIGHT);
    const colX = [-6.2, -3.8, -1.4, 1.4, 3.8, 6.2];
    for (const x of colX) {
      g(x, Y0 + 0.5, TZ, 1.25, 0.5, 1.25, FACE_SHADE);
      g(x, Y0 + 3.9, TZ, 0.95, 7.2, 0.95, FACE_LIGHT);
      g(x, Y0 + 7.6, TZ, 1.35, 0.55, 1.35, FACE_LIGHT);
      g(x, Y0 + 3.9, TZ + 0.4, 0.2, 7, 0.1, FACE_SHADE); // fluting
    }
    g(0, Y0 + 8.3, TZ, 15, 0.9, 1.4, FACE_SHADE); // entablature
    g(0, Y0 + 8.95, TZ + 0.1, 14.2, 0.35, 1.45, FACE_LIGHT);
    for (let i = 0; i < 5; i++) {
      // lower pediment
      g(0, Y0 + 9.4 + i * 0.5, TZ + 0.1, 9.2 - i * 1.8, 0.5, 1.2, i % 2 ? FACE_LIGHT : FACE);
    }
    for (const x of [-5, 5]) g(x, Y0 + 5, TZ - 0.1, 1.2, 2.2, 0.35, FACE_SHADE); // flanking niches
    for (const x of [-5, 5]) g(x, Y0 + 5, TZ, 0.55, 1.4, 0.2, FACE_LIGHT); // niche figures
    // upper storey: broken pediments flank the round pavilion
    for (let i = 0; i < 6; i++) {
      for (const s of [-1, 1]) {
        g(s * (7.2 - i * 0.55), Y0 + 10.4 + i * 0.42, TZ - 0.1, 0.9, 0.5, 1.1, i % 2 ? FACE_LIGHT : FACE_SHADE);
      }
    }
    g(0, Y0 + 9.75, TZ - 0.2, 8, 0.5, 1.3, FACE_SHADE); // upper base
    for (const x of [-2.6, -0.9, 0.9, 2.6]) {
      g(x, Y0 + 12, TZ - 0.2, 0.7, 3.8, 0.8, FACE_LIGHT);
      g(x, Y0 + 14, TZ - 0.2, 1.0, 0.4, 1.0, FACE_LIGHT);
    }
    for (const s of [-1, 1]) {
      g(s * 5, Y0 + 12, TZ - 0.2, 0.7, 3.4, 0.7, FACE_LIGHT);
      g(s * 5, Y0 + 13.9, TZ - 0.2, 1, 0.4, 1, FACE_LIGHT);
    }
    for (let i = 0; i < 5; i++) g(0, Y0 + 14.4 + i * 0.5, TZ - 0.5, 6.8 - i * 1.3, 0.5, 2.4 - i * 0.35, i % 2 ? FACE_LIGHT : FACE); // tholos roof
    g(0, Y0 + 15, TZ - 0.4, 2.2, 1.9, 0.3, DARK); // tholos doorway
    // hand-carved eagle & figures between the pillars
    g(0, Y0 + 12.1, TZ - 0.5, 1, 1.5, 0.3, FACE_SHADE);
    g(-3.6, Y0 + 5.4, TZ - 0.4, 0.8, 1.8, 0.3, FACE_SHADE);
    g(3.6, Y0 + 5.4, TZ - 0.4, 0.8, 1.8, 0.3, FACE_SHADE);

    // =============== difference 0: rooftop urn (present / absent) ===============
    B(0, 0, Y0 + 16.8, TZ - 0.5, 'Treasury rooftop urn', 1.5, (d) => {
      if (variant) return; // B: urn missing, hit area stays
      g(0, 0, 0, 0.7, 0.5, 0.7, 0xc98763, d);
      g(0, 0.55, 0, 1.1, 0.9, 1.1, 0xd9986f, d);
      g(0, 1.25, 0, 0.7, 0.45, 0.7, 0xe6b088, d);
      g(0, 1.7, 0, 0.3, 0.4, 0.3, 0xc98763, d);
      g(0, 0.85, 0.52, 0.5, 0.5, 0.1, 0x6e3f2b, d);
    }, variant);
    // =============== difference 1: doorway, open dark / sealed wooden door ===============
    B(1, 0, Y0, TZ + 0.1, 'Treasury doorway', 2.2, (d) => {
      g(0, 2.6, -0.3, 2.9, 5.2, 0.5, FACE_SHADE, d);
      if (variant) {
        g(0, 2.5, 0, 2.5, 4.8, 0.3, 0x8a5a3c, d);
        g(-0.65, 2.5, 0.2, 0.15, 4.6, 0.12, 0x5a3820, d);
        g(0.65, 2.5, 0.2, 0.15, 4.6, 0.12, 0x5a3820, d);
        for (let i = 0; i < 4; i++) g(0, 0.9 + i * 1.1, 0.22, 2.3, 0.1, 0.1, 0x3b2a1e, d);
        g(0, 5.1, 0.2, 3.1, 0.35, 0.3, FACE_LIGHT, d);
      } else {
        g(0, 2.4, 0.05, 2.5, 4.8, 0.3, DARK, d);
        g(0, 5.1, 0.2, 3.1, 0.35, 0.3, FACE_LIGHT, d);
        g(0, 0.2, 0.3, 2.2, 0.2, 0.4, 0x3a2a24, d);
      }
    }, variant);

    // ---------------- Royal Tombs (rock-cut tiers, right) ----------------
    const RZ = -3; // butte face
    g(15.25, Y0 + 6.5, RZ - 0.2, 12.5, 13, 0.7, FACE);
    for (let tier = 0; tier < 2; tier++) {
      const y = Y0 + 5 + tier * 3;
      for (let k = 0; k < 7; k++) {
        const x = 10.4 + k * 1.45;
        g(x, y + 0.6, RZ + 0.25, 0.5, 2.2, 0.35, FACE_SHADE);
        g(x + 0.72, y + 0.45, RZ + 0.3, 0.7, 1.4, 0.2, k % 2 ? DARK : FACE_SHADE);
        g(x + 0.72, y + 1.3, RZ + 0.3, 0.7, 0.3, 0.2, FACE_LIGHT);
      }
      g(15.25, y + 1.9, RZ + 0.35, 12.2, 0.4, 0.5, FACE_LIGHT);
    }
    g(15.25, Y0 + 11.4, RZ + 0.3, 12.6, 0.5, 0.7, FACE_SHADE);
    for (let k = 0; k < 8; k++) g(9.6 + k * 1.7, Y0 + 12, RZ + 0.3, 0.7, 0.8, 0.5, FACE_LIGHT); // crenellations
    for (let k = 0; k < 6; k++) g(10.9 + k * 2.3, Y0 + 0.3, RZ + 0.9, 1.3, 0.35, 0.6, FACE_SHADE);

    // =============== difference 2: tomb arcade, three or two doorways ===============
    B(2, 15.25, Y0, RZ + 0.5, 'Royal tomb arches: two or three', 3.2, (d) => {
      const n = variant ? 2 : 3;
      const step = variant ? 3.6 : 2.5;
      const x0 = -((n - 1) * step) / 2;
      for (let k = 0; k < n; k++) {
        const x = x0 + k * step;
        g(x, 1.6, 0, 1.5, 3.2, 0.3, DARK, d);
        g(x, 3.4, 0, 1.9, 0.35, 0.35, FACE_LIGHT, d);
        g(x - 1.05, 1.7, 0.05, 0.4, 3.4, 0.4, FACE_LIGHT, d);
        g(x + 1.05, 1.7, 0.05, 0.4, 3.4, 0.4, FACE_LIGHT, d);
      }
    }, variant);

    // ---------------- Ad-Deir (the Monastery) on the butte top ----------------
    const MZ = -8, MX = 15.5, MY = Y0 + 13.5;
    g(MX, MY + 4, MZ - 0.7, 10.5, 8, 0.8, FACE_LIGHT);
    for (const dx of [-3.6, -1.2, 1.2, 3.6]) {
      g(MX + dx, MY + 2.1, MZ, 0.8, 4.2, 0.8, FACE_LIGHT);
      g(MX + dx, MY + 4.4, MZ, 1.2, 0.5, 1.2, FACE_SHADE);
    }
    g(MX, MY + 4.9, MZ, 10, 0.7, 1.2, FACE_SHADE);
    g(MX, MY + 2.1, MZ - 0.45, 2, 3.6, 0.3, DARK);
    for (let i = 0; i < 4; i++) g(MX, MY + 5.5 + i * 0.5, MZ - 0.3, 5.2 - i * 1.2, 0.5, 1.8, i % 2 ? FACE_LIGHT : FACE);
    g(MX, MY + 7.7, MZ - 0.3, 0.6, 0.9, 0.6, FACE_SHADE);
    for (const s of [-1, 1]) for (let i = 0; i < 4; i++) g(MX + s * (4.4 - i * 0.45), MY + 5.5 + i * 0.35, MZ - 0.2, 0.8, 0.45, 1, FACE_SHADE);
    // trail of steps winding up the side of the butte
    for (let i = 0; i < 12; i++) g(8.4 + (i % 2) * 0.2, Y0 + 0.4 + i * 1.1, 0.2 - i * 1.0, 1.2, 0.4, 1.1, i % 2 ? 0xd7a885 : 0xc99572);

    // ---------------- Roman theatre carved into the left wall ----------------
    const TCx = -5.5, TCz = 8;
    for (let x = -15; x <= -2; x++) {
      for (let z = -3; z <= 19; z++) {
        const r = Math.hypot(x - TCx, z - TCz);
        if (x > TCx - 0.5 || r < 2.8 || r > 10.2) continue;
        const row = Math.floor((r - 2.8) / 0.95);
        const top = Y0 + 0.35 + row * 0.6;
        if (top < height(x, z) + 0.01) continue;
        g(x, (Y0 + top) / 2, z, 1.02, top - Y0, 1.02, row % 2 ? 0xdcb08a : 0xcb946f);
        if (row % 3 === 0) g(x, top - 0.02, z, 1.02, 0.1, 0.5, 0xe9c5a4);
      }
    }
    for (let k = 0; k < 8; k++) g(-14.4, Y0 + 7.4 + (k % 2) * 0.4, 1.6 + k * 2.1, 0.5, 1.5, 1, DARK); // cave doorways above the seats
    g(-14.2, Y0 + 9.4, 9.5, 0.6, 0.5, 18, FACE_LIGHT); // ledge
    // orchestra floor
    for (let a = 0; a < 24; a++) {
      const th = (a / 24) * Math.PI * 2;
      g(TCx + Math.cos(th) * 2.2, Y0 + 0.05, TCz + Math.sin(th) * 2.2, 0.9, 0.12, 0.9, 0xf0d9b0);
    }

    // =============== difference 3: theatre shade canopy present / absent ===============
    B(3, -12.8, Y0 + 3.4, 8.3, 'Theatre shade canopy', 3.2, (d) => {
      if (variant) return; // absent variant leaves only the hit area
      for (const px of [-1.3, 1.3]) for (const pz of [-2.4, 2.4]) g(px, 0, pz, 0.14, 2.6, 0.14, 0x6b4a33, d);
      for (let i = 0; i < 5; i++) g(0, 1.4, -2.4 + i * 1.2, 3.4, 0.14, 1.1, i % 2 ? 0xf3e9d6 : 0xc0392b, d);
    }, variant);

    // ---------------- stall (Minecraft-style market corner) ----------------
    function stall(x, z, cloth) {
      for (const px of [-1.3, 1.3]) for (const pz of [-0.9, 0.9]) g(x + px, Y0 + 1.2, z + pz, 0.14, 2.4, 0.14, 0x6b4a33);
      g(x, Y0 + 0.65, z + 0.7, 2.8, 0.9, 0.7, 0xb5835a);
      g(x - 0.7, Y0 + 1.3, z + 0.7, 0.6, 0.5, 0.45, 0x9c4a2f);
      g(x + 0.5, Y0 + 1.25, z + 0.7, 0.8, 0.35, 0.5, 0x3e7c8c);
      g(x + 0.1, Y0 + 0.4, z - 0.4, 1.6, 0.6, 0.7, 0xc2a07a);
      if (cloth) for (let i = 0; i < 6; i++) g(x, Y0 + 2.55 + i * 0.03, z - 0.9 + i * 0.35, 3.1, 0.1, 0.34, cloth[i % 2]);
    }
    stall(10.2, 12, null);

    // =============== difference 6: stall awning colour ===============
    B(6, 6.5, Y0, 9, 'Market stall awning colour', 2.2, (d) => {
      const [c1, c2] = variant ? [0x2f7fa6, 0xf6efe0] : [0xc0392b, 0xf6efe0];
      for (const px of [-1.3, 1.3]) for (const pz of [-0.9, 0.9]) g(px, 1.2, pz, 0.14, 2.4, 0.14, 0x6b4a33, d);
      g(0, 0.65, 0.7, 2.8, 0.9, 0.7, 0xb5835a, d);
      g(-0.6, 1.3, 0.7, 0.6, 0.5, 0.45, 0xd9a441, d);
      g(0.5, 1.25, 0.7, 0.8, 0.35, 0.5, 0x7a5c8a, d);
      for (let i = 0; i < 8; i++) g(0, 2.55 + i * 0.03, -0.95 + i * 0.28, 3.1, 0.12, 0.28, i % 2 ? c2 : c1, d);
      g(0, 2.35, 1.35, 3.1, 0.3, 0.1, c1, d);
    }, variant);

    // goat-hair tent, rocks, shrubs
    g(11.5, Y0 + 0.7, 3, 2.8, 1.4, 2.4, 0x5a4636); // Bedouin tent
    g(11.5, Y0 + 1.5, 3, 3.2, 0.22, 2.8, 0x3b2d24);
    g(11.5, Y0 + 0.6, 4.25, 1, 1.1, 0.15, 0x140e0c);
    g(11.5, Y0 + 1.1, 4.22, 2.9, 0.18, 0.1, 0xe8d6b0);
    for (const [x, z, s] of [[4, 14, 1], [-3, 4, 0.8], [9, 6, 1.1], [-2, 18, 0.9], [13, -1, 1], [6, -3, 0.8], [-9, -1, 1], [14, 16, 1.2], [18, 6, 1.4]]) {
      g(x, Y0 + 0.35 * s, z, 1.1 * s, 0.7 * s, 1.1 * s, 0x8c9a5b);
      g(x + 0.15, Y0 + 0.8 * s, z - 0.1, 0.7 * s, 0.6 * s, 0.7 * s, 0x6e7a45);
      g(x - 0.4, Y0 + 0.25, z + 0.4, 0.5, 0.5, 0.4, 0xb59a6a);
    }
    for (const [x, z, s] of [[-12, 20, 1.6], [-4, 22, 1.2], [4, 21, 1.4], [16, 20, 1.2], [22, 12, 1.6], [24, 3, 1.4]]) {
      g(x, Y0 + 0.9 * s, z, 1.8 * s, 1.8 * s, 1.6 * s, pick(ROCK, x, z));
      g(x + 0.5 * s, Y0 + 1.7 * s, z - 0.2, 1 * s, 0.7 * s, 1 * s, pick(ROCK, z, x));
    }

    // =============== difference 4: plaza animal, horse or camel ===============
    function horse(d) {
      g(0, 1.45, 0, 2.7, 1.15, 0.95, 0xf1e9d8, d);
      g(1.25, 2.2, 0, 0.6, 1.2, 0.6, 0xf1e9d8, d);
      g(1.7, 2.7, 0, 1.0, 0.65, 0.5, 0xf1e9d8, d);
      g(1.15, 2.7, 0, 0.18, 0.9, 0.12, 0xb89b6c, d);
      g(-1.45, 1.5, 0, 0.25, 1.0, 0.25, 0xcdb68c, d);
      for (const lx of [-1, 1]) for (const lz of [-0.32, 0.32]) g(lx, 0.5, lz, 0.28, 1, 0.28, 0xe2d6bd, d);
    }
    function camel(d) {
      g(0, 1.7, 0, 3.0, 1.1, 1.0, 0xb98a56, d);
      g(-0.3, 2.5, 0, 0.9, 0.9, 0.8, 0xa97b49, d);
      g(0.9, 2.45, 0, 0.8, 0.8, 0.8, 0xa97b49, d);
      g(1.7, 2.7, 0, 0.5, 1.7, 0.5, 0xb98a56, d);
      g(2.1, 3.5, 0, 1.0, 0.55, 0.45, 0xb98a56, d);
      g(0.2, 2.0, 0, 1.6, 0.35, 1.1, 0x9b2d30, d); // saddle blanket
      for (const lx of [-1.1, 1.1]) for (const lz of [-0.34, 0.34]) g(lx, 0.55, lz, 0.28, 1.1, 0.28, 0x9e7347, d);
    }
    B(4, 4.5, 0.3, 1.5, 'Plaza horse or camel', 2.4, (d) => (variant ? camel(d) : horse(d)), variant);

    // =============== difference 5: guide, open or folded parasol ===============
    B(5, -1, 0.4, 14, 'Guide open or folded parasol', 1.9, (d) => {
      const p = man(0, 0, 0xc2573f, d, 1.1);
      g(0.65, 1.85, 0, 0.1, 2.8, 0.1, 0x6b4a33, d);
      if (variant) {
        g(0.65, 2.65, 0, 0.45, 1.5, 0.45, 0xd4a017, d);
        g(0.65, 3.45, 0, 0.18, 0.25, 0.18, 0x8a6a10, d);
      } else {
        for (let i = 0; i < 6; i++) g(0.65, 2.65 + i * 0.12, 0, 3.4 - i * 0.5, 0.15, 3.4 - i * 0.5, i % 2 ? 0xf6efe0 : 0xd4a017, d);
      }
      U.petraActors.push({ g: d, person: p, from: { x: -2, z: 14 }, to: { x: 5, z: 14 }, seed: 3 });
    }, variant);

    // =============== difference 7: ravens on the sand, two or five ===============
    B(7, -3.5, 0.2, -4.5, 'Ravens on the sand: two or five', 3.2, (d) => {
      const spots = variant ? [[-1.6, 0.4], [1.2, -0.7]] : [[-1.8, 0.3], [-0.5, 1.0], [0.7, -0.5], [1.9, 0.6], [0.1, -1.7]];
      for (const [x, z] of spots) {
        g(x, 0.3, z, 0.5, 0.4, 0.8, 0x1d1c26, d);
        g(x, 0.62, z + 0.38, 0.3, 0.3, 0.3, 0x1d1c26, d);
        g(x, 0.6, z + 0.62, 0.14, 0.1, 0.22, 0xd0a040, d);
        g(x, 0.28, z - 0.52, 0.34, 0.12, 0.4, 0x2a2938, d);
      }
    }, variant);

    // =============== difference 8 (night): door lanterns amber or teal ===============
    B(8, 0, 2.4, TZ + 3.2, 'Treasury door lanterns colour', 2.4, (d) => {
      const night = variant ? 0x4fe0d4 : 0xffc45a;
      for (const x of [-2.2, 2.2]) {
        g(x, -1.0, 0, 0.16, 2.4, 0.16, 0x4a3220, d);
        g(x, 0.45, 0, 0.75, 0.14, 0.75, 0x3a281a, d);
        lamp(x, 0, 0, 0.55, 0.8, 0.55, 0x8a6a4a, night, { parent: d, pickable: true });
      }
    }, variant);

    // =============== difference 9 (night): candle bags along the path ===============
    B(9, -2.4, 0.2, 7.5, 'Candle lanterns along the path', 3.6, (d) => {
      const n = variant ? 3 : 7;
      for (let i = 0; i < n; i++) {
        const z = -3 + (i * 6) / (n - 1);
        const x = Math.sin(i * 1.7) * 0.5;
        g(x, 0.12, z, 0.62, 0.55, 0.62, 0xe6cda0, d);
        lamp(x, 0.55, z, 0.34, 0.34, 0.34, 0xd5b98e, 0xffd270, { parent: d, pickable: true });
      }
    }, variant);

    // night-only difference setup (same helper shape as the other stages)
    function setup(index, windows, hint, nightOnly) {
      const diff = U.diffs[index];
      diff.timeWindows = windows;
      diff.hintPhase = hint;
      diff.event = [0, 1];
      diff.nightOnly = nightOnly;
      diff.g.userData.motion = true;
    }
    setup(8, NIGHT, 0.86, true);
    setup(9, NIGHT, 0.86, true);

    // ---------- people and ambient life ----------
    walker(1, 5, 5, 13, 0x2f6f8f, 1);
    walker(-6, 14, 1, -2, 0xb8432f, 2);
    walker(8, -1, 2, 5, 0xd9a441, 3);
    walker(-1, 18, 5, 9, 0x5a7a3a, 4);
    for (const [x, z, c] of [[-8.5, 4, 0x8a4f9a], [-10.5, 10, 0x3f7a6a], [-7.2, 12, 0xc29a41]]) {
      const r = Math.hypot(x - TCx, z - TCz);
      const row = Math.floor((r - 2.8) / 0.95);
      const p = man(x, z, c);
      p.position.y = Y0 + 0.35 + row * 0.6;
    }

    // night lights: torch posts on the Treasury steps and tomb doorways
    for (const x of [-4.8, 4.8, -7.6, 7.6]) {
      g(x, Y0 + 1.1, TZ + 3.2, 0.18, 2.2, 0.18, 0x4a3220);
      lamp(x, Y0 + 2.45, TZ + 3.2, 0.5, 0.6, 0.5, 0x8a6a4a, 0xffb347);
    }
    for (let k = 0; k < 7; k++) lamp(10.5 + k * 1.45 + 0.72, Y0 + 5.45, RZ + 0.42, 0.55, 1.1, 0.1, 0x2b1d1a, 0xffc067);
    lamp(MX, MY + 2.1, MZ - 0.25, 1.6, 3.2, 0.1, 0x2b1d1a, 0xffc067);
    for (let k = 0; k < 8; k++) lamp(-14.1, Y0 + 7.4 + (k % 2) * 0.4, 1.6 + k * 2.1, 0.12, 1.2, 0.7, 0x2b1d1a, 0xffc067);

    U.localLights = [];
    for (const [x, y, z, color, power] of [[0, 6, -5, 0xffb26b, 34], [-8, 4, 10, 0xffc27a, 24], [14, 6, -1, 0xffc27a, 24], [6, 3, 8, 0xffd29a, 22]]) {
      const l = new PointLight(color, 0, 22, 1.5);
      l.position.set(x, y, z);
      l.userData.nightPower = power;
      world.add(l);
      U.localLights.push(l);
    }
    U.petraComposition = { treasury: [0, 20, -10], theatre: [-8, 5, 8], royalTombs: [15, 13, -3], monastery: [15.5, 20, -8] };
  }

  // ---------- animation (day windows, guide walk) ----------
  function animate(world, time, reduced = false) {
    const u = world.userData;
    const phase = (((time / 300) % 1) + 1) % 1;
    for (const d of u.diffs) {
      if (!d.timeWindows) continue;
      const on = inWindow(phase, d.timeWindows);
      d.available = on;
      d.g.visible = on;
    }
    for (const a of u.petraActors || []) {
      const s = pathStep(a.from, a.to, time, a.seed);
      const x = a.from.x + (a.to.x - a.from.x) * s.fraction;
      const z = a.from.z + (a.to.z - a.from.z) * s.fraction;
      a.g.position.set(x, height(x, z) + 0.4 + s.bob, z);
      a.g.rotation.y = Math.atan2(a.to.x - a.from.x, a.to.z - a.from.z) + (s.direction < 0 ? Math.PI : 0);
      const parts = a.person.userData.parts;
      const k = s.stride * (reduced ? 0.3 : 1);
      parts.leftLeg.rotation.x = k;
      parts.rightLeg.rotation.x = -k;
      parts.leftArm.rotation.x = -k * 0.5;
      parts.rightArm.rotation.x = k * 0.5;
      const diff = u.diffs.find((d) => d.g === a.g);
      if (diff) diff.point.copy(a.g.position).add(new Vector3(0, 1.3, 0));
    }
  }

  function updateLighting(world, { glow = 0 } = {}) {
    const u = world.userData;
    for (const l of u.petraLights || []) l.m.material.color.set(l.day).lerp(new Color(l.night), glow);
    for (const l of u.localLights || []) l.intensity = glow * (l.userData.nightPower || 24);
  }

  return { build, animate, height, water: () => false, updateLighting };
}
