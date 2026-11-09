/*
 * China — "Great Wall of China" (china-great-wall-ridge). Second scenery of China.
 * Stage package: world.js + stage.json + differences.json.
 *
 * A wall walks along a mountain ridge from back-left to the right edge, with three watchtowers,
 * a beacon tower, a village and a stone gate in the valley below. Same rules as every scenery:
 * paired panels, 10 differences (8 and 9 at night), same helper context and day/night hooks.
 */
function createStage(E) {
  const { Mesh, BasicMaterial, PointLight, Color, Vector3, hash, pathStep, inWindow } = E;
  const NIGHT = [[0, 0.2], [0.78, 1]];
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  // ---------- the spine of the wall ----------
  const SPINE = [[-27, -15], [-15, -7], [-5, -11], [5, -5], [15, -9], [27, -3]];
  function nearSpine(x, z) {
    let best = 1e9;
    for (let i = 0; i < SPINE.length - 1; i++) {
      const [ax, az] = SPINE[i], [bx, bz] = SPINE[i + 1];
      const vx = bx - ax, vz = bz - az;
      const t = clamp(((x - ax) * vx + (z - az) * vz) / (vx * vx + vz * vz), 0, 1);
      best = Math.min(best, Math.hypot(x - (ax + vx * t), z - (az + vz * t)));
    }
    return best;
  }

  function height(x, z) {
    const d = nearSpine(x, z);
    const ridge = 9 * Math.exp(-((d / 4.4) ** 2));
    const behind = clamp((-z - 6) / 14, 0, 1);
    const peaks = 11 * Math.pow(behind, 1.3) * (0.65 + 0.35 * Math.sin(x * 0.21 + 1.3) + 0.1 * Math.cos(x * 0.5));
    const hill = 3.2 * Math.exp(-(((x + 24) / 6) ** 2 + ((z - 4) / 7) ** 2));
    let h = 0.2 + Math.max(ridge, peaks) + hill;
    if (h > 1.5) h += hash(x, z) * 0.5;
    return Math.floor(h * 2) / 2;
  }
  const wallTop = (x, z) => height(x, z) + 2.3;

  const GRASS = [0x86ad5d, 0x7da356, 0x8fb566, 0x77a051];
  const FOREST = [0x5f8f4a, 0x56873f, 0x4f7a43];
  const ROCKS = [0x8d8678, 0x7b756a, 0x9a9387, 0x847d70];
  const SOIL = [0x6f5d47, 0x66553f, 0x7a6850];
  const WALL = [0xcdbd96, 0xc4b48d, 0xd3c4a0];
  const MERLON = 0xb3a27a;
  const TOWER = 0xcbbb94, TRIM = 0xa89870, ROOF = [0x4a5a52, 0x3d4b45, 0x55655c];

  function build(ctx, variant) {
    const { box: g, group: o, makeDiff: B, person: man, walker, path, world, cube } = ctx;
    const U = world.userData;
    U.wallLights = [];
    U.flames = [];
    U.wallActors = [];
    const pick = (arr, a, b) => arr[Math.floor(hash(a, b) * arr.length)];

    function lamp(x, y, z, sx, sy, sz, dayColor, nightColor, opts = {}) {
      const m = new Mesh(cube, new BasicMaterial({ color: dayColor }));
      m.position.set(x, y, z);
      m.scale.set(sx, sy, sz);
      m.userData.ownedMaterial = true;
      m.userData.motion = true;
      if (!opts.pickable) m.raycast = () => {};
      (opts.parent || world).add(m);
      U.wallLights.push({ m, day: dayColor, night: nightColor });
      return m;
    }

    // -- mountains and valley --
    for (let x = -29; x <= 29; x++) {
      for (let z = -25; z <= 25; z++) {
        if ((x / 30.5) ** 4 + (z / 26.5) ** 4 > 1.18 + hash(x, z) * 0.06) continue;
        const h = height(x, z);
        const bottom = -2.2 - hash(x, z) * 0.7;
        g(x, (bottom + h) / 2 - 0.1, z, 1.025, h - bottom - 0.2, 1.025, pick(SOIL, x, z));
        let top;
        if (nearSpine(x, z) < 4.4 && h > 3) top = pick(GRASS, x, z);
        else if (h > 11) top = pick(ROCKS, x, z);
        else if (h > 4.5) top = hash(x + 3, z) > 0.72 ? pick(ROCKS, x, z) : pick(FOREST, x, z);
        else if (h > 1.2) top = pick(FOREST.concat(GRASS), x, z);
        else top = pick(GRASS, x, z);
        g(x, h - 0.08, z, 1.03, 0.2, 1.03, top);
        if (h > 6 && hash(x, z + 9) > 0.8) g(x, h + 0.15, z, 0.9, 0.35, 0.9, pick(ROCKS, z, x));
      }
    }

    // -- trees (static, cheap): pines with some autumn maples --
    for (let x = -28; x <= 28; x += 2) {
      for (let z = -24; z <= 22; z += 2) {
        const px = x + hash(x, z) * 1.6, pz = z + hash(z, x) * 1.6;
        const h = height(px, pz);
        if (h < 0.7 || h > 9 || nearSpine(px, pz) < 3.4 || hash(x + 5, z + 2) < 0.74) continue;
        if (px > -20 && px < 4 && pz > 3 && pz < 17) continue; // village
        const maple = hash(x, z + 3) > 0.78;
        g(px, h + 0.7, pz, 0.28, 1.4, 0.28, 0x6b4a33);
        if (maple) {
          const c = [0xc0392b, 0xe08a2e, 0xd9a82e][Math.floor(hash(z, x) * 3)];
          g(px, h + 1.8, pz, 1.5, 1.1, 1.5, c);
          g(px + 0.2, h + 2.5, pz, 1, 0.8, 1, c);
        } else {
          for (let k = 0; k < 3; k++) g(px, h + 1.2 + k * 0.75, pz, 1.7 - k * 0.5, 0.8, 1.7 - k * 0.5, k % 2 ? 0x3f6e3a : 0x4b7d44);
        }
      }
    }

    // -- the wall --
    const BREACH = [10, -7];
    for (let i = 0; i < SPINE.length - 1; i++) {
      const [ax, az] = SPINE[i], [bx, bz] = SPINE[i + 1];
      const len = Math.hypot(bx - ax, bz - az);
      const dx = (bx - ax) / len, dz = (bz - az) / len;
      const nx = -dz, nz = dx;
      const steps = Math.ceil(len / 0.8);
      for (let k = 0; k <= steps; k++) {
        const x = ax + dx * (k * len) / steps, z = az + dz * (k * len) / steps;
        const h = height(x, z);
        g(x, h + 0.85, z, 3.3, 2.9, 3.3, pick(WALL, x, z));
        g(x, h + 2.33, z, 2.5, 0.12, 2.5, 0xe6dabb);
        if (k % 3 === 0) g(x, h + 2.4, z, 2.5, 0.05, 0.35, 0xf3ead0); // stair tread lines
        if (k % 2 === 0 && Math.hypot(x - BREACH[0], z - BREACH[1]) > 2.1) {
          for (const s of [-1, 1]) {
            g(x + nx * s * 1.5, h + 2.55, z + nz * s * 1.5, 0.5, 0.35, 0.8, MERLON); // parapet
            g(x + nx * s * 1.5, h + 2.95, z + nz * s * 1.5, 0.5, 0.45, 0.8, MERLON); // merlon
          }
        } else if (Math.hypot(x - BREACH[0], z - BREACH[1]) > 2.1) {
          for (const s of [-1, 1]) g(x + nx * s * 1.5, h + 2.55, z + nz * s * 1.5, 0.5, 0.35, 0.8, MERLON);
        }
        if (k % 5 === 0) for (const s of [-1, 1]) g(x + nx * s * 1.68, h + 0.9, z + nz * s * 1.68, 0.1, 1.2, 0.8, 0x9a8a68);
      }
    }

    // -- watchtowers --
    function tower(x, z, hgt, hut) {
      const y = height(x, z);
      g(x, y + 0.5, z, 7, 1.0, 7, 0xa8986f); // battered plinth
      g(x, y + 1.0 + (hgt - 1) / 2, z, 6.2, hgt - 1, 6.2, TOWER);
      g(x, y + 0.9 + hgt * 0.5, z, 6.35, 0.18, 6.35, TRIM);
      for (const s of [-1, 1]) for (const k of [-1.6, 0, 1.6]) {
        const wy = y + hgt * 0.62;
        for (const [wx, wz, ax, az] of [[s * 3.12, k, 0.14, 1.0], [k, s * 3.12, 1.0, 0.14]]) {
          g(x + wx, wy, z + wz, ax, 1.5, az, 0x2b2a2a);
          g(x + wx, wy + 0.85, z + wz, ax, 0.4, az * 0.7, 0x2b2a2a); // arch top
          lamp(x + wx * 1.01, wy, z + wz * 1.01, ax * 0.5, 1.1, az * 0.5, 0x2b2a2a, 0xffc06a);
        }
      }
      g(x, y + hgt + 0.2, z, 6.8, 0.4, 6.8, TRIM);
      for (let k = -3; k <= 3; k++) for (const s of [-1, 1]) {
        g(x + k * 0.95, y + hgt + 0.75, z + s * 3.2, 0.6, 0.7, 0.6, MERLON);
        if (Math.abs(k) < 3) g(x + s * 3.2, y + hgt + 0.75, z + k * 0.95, 0.6, 0.7, 0.6, MERLON);
      }
      if (hut) {
        g(x, y + hgt + 1.5, z, 3.6, 2, 3.6, 0xcdb88a);
        g(x, y + hgt + 1.4, z + 1.82, 1, 1.4, 0.1, 0x2b2a2a);
        for (let k = 0; k < 4; k++) g(x, y + hgt + 2.8 + k * 0.4, z, 5.4 - k * 1.2, 0.4, 5.4 - k * 1.2, ROOF[k % 3]);
        g(x, y + hgt + 4.6, z, 0.4, 0.5, 0.4, 0xd6ae66);
      }
    }
    const TA = [-15, -7], TB = [5, -5], TC = [15, -9];
    const hA = height(TA[0], TA[1]), hB = height(TB[0], TB[1]);
    tower(TA[0], TA[1], 6, true);
    tower(TB[0], TB[1], 8, false);
    tower(TC[0], TC[1], 6, true);
    g(TB[0], hB + 8.9, TB[1], 3.6, 0.5, 3.6, 0x6e655a); // beacon pit rim
    for (const s of [-1, 1]) g(TB[0] + s * 1.9, hB + 8.9, TB[1], 0.5, 1.2, 3.6, MERLON);
    // flag pole on tower A (the flag itself is difference 1)
    g(TA[0], hA + 11.5, TA[1], 0.15, 3, 0.15, 0x6b4a33);

    // =============== difference 0: beacon smoke signal present / absent ===============
    B(0, TB[0], hB + 11, TB[1], 'Beacon smoke signal', 2.6, (d) => {
      if (variant) return;
      for (let k = 0; k < 7; k++) {
        const s = 1.4 + k * 0.28;
        g(Math.sin(k * 1.3) * 0.45, k * 0.9, Math.cos(k * 1.1) * 0.3, s, 0.95, s, k % 2 ? 0xe1ddd5 : 0xc9c5be, d);
      }
    }, variant);

    // =============== difference 1: tower flag colour ===============
    B(1, TA[0] + 0.9, hA + 11.7, TA[1], 'Watchtower flag colour', 1.8, (d) => {
      const c = variant ? 0xe0b030 : 0xc0392b;
      g(0, 0.6, 0, 1.7, 1.0, 0.1, c, d);
      g(0.25, 0.6, 0.06, 0.6, 0.5, 0.05, variant ? 0xc0392b : 0xe0b030, d);
      g(-0.1, -0.6, 0, 0.12, 1.2, 0.12, 0x6b4a33, d);
    }, variant);

    // =============== difference 2: patrol soldier, spear or shield ===============
    B(2, 0, wallTop(0, -8) + 0.1, -8, 'Patrol soldier spear or shield', 1.9, (d) => {
      man(0, 0, 0xb23a2e, d, 1.0);
      g(0, 1.5, 0, 0.5, 0.2, 0.5, 0x3a3a44, d);
      if (variant) {
        g(0.5, 1.0, 0.2, 0.9, 1.0, 0.18, 0x6b4a33, d);
        g(0.5, 1.0, 0.31, 0.6, 0.6, 0.06, 0xd6ae66, d);
      } else {
        g(0.5, 1.5, 0.1, 0.1, 3.0, 0.1, 0x6b4a33, d);
        g(0.5, 3.15, 0.1, 0.22, 0.4, 0.1, 0xc9c9d0, d);
      }
    }, variant);

    // =============== difference 3: wall breach, intact battlement or a gap with rubble ===============
    B(3, BREACH[0], wallTop(BREACH[0], BREACH[1]) + 0.2, BREACH[1], 'Wall breach', 2.4, (d) => {
      if (!variant) {
        for (const k of [-1.2, 0, 1.2]) for (const s of [-1, 1]) g(k * 0.93 + s * 0.37 * 1.4, 0.3, -k * 0.37 + s * 0.93 * 1.4, 0.8, 0.8, 0.8, MERLON, d);
      } else {
        for (const [x, y, z, sx] of [[-0.6, -0.05, 0.9, 0.8], [0.7, -0.1, -0.7, 0.9], [0, 0.0, 1.5, 0.6], [-1.0, -0.15, -1.1, 0.7]]) g(x, y, z, sx, 0.5, 0.7, 0x7a7266, d);
      }
    }, variant);

    // ---------------- valley: village, gate, road ----------------
    function house(x, z, w, dp, roof) {
      const y = height(x, z);
      g(x, y + 0.15, z, w + 0.3, 0.3, dp + 0.3, 0x8b857a);
      g(x, y + 1.15, z, w, 2.0, dp, 0xf3efe4);
      for (let k = 0; k < 4; k++) g(x, y + 2.35 + k * 0.35, z, w + 1.3 - k * 0.7, 0.36, dp + 1.1 - k * 0.5, roof);
      g(x, y + 1.1, z + dp / 2 + 0.03, 0.7, 1.5, 0.1, 0xa33b2a);
      for (const s of [-1, 1]) lamp(x + s * w * 0.3, y + 1.5, z + dp / 2 + 0.05, 0.55, 0.55, 0.08, 0x3a4a5a, 0xffcf7a);
    }
    house(-11, 10, 3.6, 3, 0x4a4f58);
    house(-7.5, 13.5, 3.2, 3, 0x4a4f58);
    house(-15.5, 13, 3.4, 3.2, 0x5a3d34);
    house(-3, 15.5, 3, 2.8, 0x4a4f58);
    // red lanterns under the eaves
    for (const [x, z] of [[-11, 11.6], [-7.5, 15.1], [-15.5, 14.7]]) lamp(x + 1.2, height(x, z) + 1.9, z, 0.3, 0.4, 0.3, 0x9a3b30, 0xff6a3d);

    path(-5, 12, -4, 6, 2.2);
    path(-4, 6, 1, 0.5, 2.2);
    path(1, 0.5, 5, -2.2, 2.2);

    // stone gate in the valley road (lions are difference 7)
    const GX = -4.2, GZ = 6.2;
    for (const s of [-1, 1]) {
      g(GX + s * 1.6, height(GX, GZ) + 1.6, GZ, 0.5, 3.2, 0.5, 0xb02a22);
      g(GX + s * 1.6, height(GX, GZ) + 0.2, GZ, 0.9, 0.4, 0.9, 0x8f8678);
    }
    g(GX, height(GX, GZ) + 3.4, GZ, 4.2, 0.45, 0.8, 0x3b6b5a);
    g(GX, height(GX, GZ) + 3.85, GZ, 3.2, 0.3, 0.7, 0x2f5d4d);
    g(GX, height(GX, GZ) + 4.2, GZ, 1.6, 0.3, 0.6, 0x2f5d4d);
    lamp(GX, height(GX, GZ) + 3, GZ + 0.45, 0.35, 0.5, 0.35, 0x9a3b30, 0xff6a3d);

    // =============== difference 7: gate lions, two or one ===============
    B(7, GX, 0.3, GZ + 1.5, 'Gate stone lions: two or one', 2.2, (d) => {
      const lion = (x) => {
        g(x, 0.3, 0, 0.9, 0.6, 0.9, 0x8f8678, d);
        g(x, 1.0, 0, 0.8, 0.8, 1.0, 0xb9b2a4, d);
        g(x, 1.65, 0.25, 0.65, 0.65, 0.6, 0xb9b2a4, d);
        g(x, 1.55, 0.58, 0.35, 0.3, 0.2, 0xa39c8e, d);
      };
      lion(-1.6);
      if (!variant) lion(1.6);
    }, variant);

    // =============== difference 4: hillside pavilion, single or double eave ===============
    B(4, -24, 0.3, 4, 'Hillside pavilion eaves', 2.6, (d) => {
      for (const x of [-1.2, 1.2]) for (const z of [-1.2, 1.2]) g(x, 1.2, z, 0.3, 2.4, 0.3, 0xb02a22, d);
      g(0, 0.1, 0, 3.4, 0.25, 3.4, 0xb9b2a4, d);
      for (let k = 0; k < 3; k++) g(0, 2.55 + k * 0.35, 0, 4.4 - k * 1.1, 0.36, 4.4 - k * 1.1, k % 2 ? 0x3b6b5a : 0x2f5d4d, d);
      if (variant) {
        for (let k = 0; k < 3; k++) g(0, 4.2 + k * 0.35, 0, 3.0 - k * 0.9, 0.36, 3.0 - k * 0.9, k % 2 ? 0x3b6b5a : 0x2f5d4d, d);
        g(0, 5.45, 0, 0.3, 0.5, 0.3, 0xd6ae66, d);
      } else {
        g(0, 3.8, 0, 0.3, 0.5, 0.3, 0xd6ae66, d);
      }
    }, variant);

    // =============== difference 5: maple tree colour ===============
    B(5, 8.5, 0.3, 8, 'Maple tree colour', 2.4, (d) => {
      const c = variant ? 0xe0a82e : 0xc0392b;
      g(0, 1.0, 0, 0.45, 2.0, 0.45, 0x6b4a33, d);
      g(0, 2.6, 0, 2.6, 1.5, 2.6, c, d);
      g(0.2, 3.7, 0, 1.8, 1.1, 1.8, c, d);
      g(-0.9, 2.2, 0.5, 1.3, 1.0, 1.3, c, d);
    }, variant);

    // =============== difference 6: pack mule, loaded or empty ===============
    B(6, -1.5, 0.3, 10.5, 'Pack mule baskets', 2.2, (d) => {
      g(0, 1.0, 0, 2.2, 0.9, 0.8, 0x8a7358, d);
      g(1.2, 1.55, 0, 0.5, 0.9, 0.5, 0x8a7358, d);
      g(1.55, 1.9, 0, 0.8, 0.5, 0.4, 0x8a7358, d);
      for (const lx of [-0.8, 0.8]) for (const lz of [-0.25, 0.25]) g(lx, 0.3, lz, 0.22, 0.6, 0.22, 0x6f5c45, d);
      g(0, 1.5, 0, 1.6, 0.18, 0.95, 0xb23a2e, d);
      if (!variant) {
        for (const z of [-0.6, 0.6]) {
          g(0, 1.55, z, 0.9, 0.8, 0.35, 0xc9a45a, d);
          g(0, 2.05, z, 0.7, 0.3, 0.3, 0xe6c98a, d);
        }
      }
    }, variant);

    // =============== difference 8 (night): wall torches, six or three ===============
    const t8 = [-10, -9];
    B(8, t8[0], wallTop(t8[0], t8[1]) + 0.05, t8[1], 'Wall torches: six or three', 3.6, (d) => {
      const dx = 0.93, dz = -0.37, nx = 0.37, nz = 0.93;
      const spots = variant ? [[-3, 1], [0, 1], [3, 1]] : [[-3, 1], [0, 1], [3, 1], [-3, -1], [0, -1], [3, -1]];
      for (const [k, s] of spots) {
        const x = dx * k * 1.4 + nx * s * 1.55, z = dz * k * 1.4 + nz * s * 1.55;
        g(x, 0.5, z, 0.14, 1.2, 0.14, 0x4a3220, d);
        U.flames.push(lamp(x, 1.25, z, 0.4, 0.5, 0.4, 0x8a6a4a, 0xffb347, { parent: d, pickable: true }));
      }
    }, variant);

    // =============== difference 9 (night): beacon fire colour ===============
    B(9, TB[0], hB + 9.6, TB[1], 'Beacon fire colour', 2.4, (d) => {
      const night = variant ? 0x59e0c9 : 0xff9a3c;
      U.flames.push(lamp(0, 0, 0, 1.5, 1.0, 1.5, 0x5a4636, night, { parent: d, pickable: true }));
      U.flames.push(lamp(0.1, 0.9, 0, 1.0, 0.9, 1.0, 0x6a5646, variant ? 0xb9fff0 : 0xffd27a, { parent: d, pickable: true }));
    }, variant);

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

    // people in the valley
    walker(-5, 12, -3, 7, 0xc0392b, 1);
    walker(2, 3, -7, 14, 0x2f6f8f, 2);
    walker(-12, 8, -6, 15, 0xd9a441, 3);

    // daily story on the wall: guards patrol between towers; at dusk they carry lanterns that glow
    for (const [from, to, seed, color] of [[[-14, -7.4], [-5.4, -10.8], 1, 0x2f5d8f], [[6, -5.4], [14, -8.6], 2, 0x8f3a2f]]) {
      const p = man(from[0], from[1], color);
      lamp(0.4, 1.05, 0.12, 0.22, 0.28, 0.22, 0x8a7a5a, 0xffc060, { parent: p });
      U.wallActors.push({ g: p, from: { x: from[0], z: from[1] }, to: { x: to[0], z: to[1] }, seed });
    }

    U.localLights = [];
    for (const [x, y, z, color, power] of [[5, hB + 11, -5, 0xffa75a, 30], [-10, 4, 12, 0xffc27a, 24], [-4, 3, 4, 0xffd29a, 18]]) {
      const l = new PointLight(color, 0, 22, 1.5);
      l.position.set(x, y, z);
      l.userData.nightPower = power;
      world.add(l);
      U.localLights.push(l);
    }
  }

  // Daily story (300 s per day): dawn shift change on the wall, guards patrol all day and carry lanterns
  // after dusk, flag and smoke move in the wind, torches and beacon fire flicker at night.
  function animate(world, time, reduced = false) {
    const u = world.userData;
    const phase = (((time / 300) % 1) + 1) % 1;
    for (const d of u.diffs) {
      if (!d.timeWindows) continue;
      const on = inWindow(phase, d.timeWindows);
      d.available = on;
      d.g.visible = on;
    }
    for (const a of u.wallActors || []) {
      const s = pathStep(a.from, a.to, time, a.seed);
      const x = a.from.x + (a.to.x - a.from.x) * s.fraction;
      const z = a.from.z + (a.to.z - a.from.z) * s.fraction;
      a.g.position.set(x, wallTop(x, z) + 0.1 + s.bob, z);
      a.g.rotation.y = Math.atan2(a.to.x - a.from.x, a.to.z - a.from.z) + (s.direction < 0 ? Math.PI : 0);
      const parts = a.g.userData.parts;
      const k = s.stride * (reduced ? 0.3 : 1);
      if (parts) {
        parts.leftLeg.rotation.x = k; parts.rightLeg.rotation.x = -k;
        parts.leftArm.rotation.x = -k * 0.5; parts.rightArm.rotation.x = k * 0.5;
      }
    }
    const flag = u.diffs[1] && u.diffs[1].g;
    if (flag) flag.rotation.y = Math.sin(time * 1.3) * (reduced ? 0.06 : 0.28);
    const smoke = u.diffs[0] && u.diffs[0].g;
    if (smoke) smoke.scale.set(1 + 0.05 * Math.sin(time * 1.7), 1 + 0.08 * Math.sin(time * 1.1), 1 + 0.05 * Math.cos(time * 1.9));
    (u.flames || []).forEach((m, i) => {
      m.scale.y = (m.userData.baseY ??= m.scale.y) * (1 + (reduced ? 0.03 : 0.14) * Math.sin(time * 9 + i * 1.7));
    });
  }

  function updateLighting(world, phase, { glow = 0 } = {}) {
    const u = world.userData;
    for (const l of u.wallLights || []) l.m.material.color.set(l.day).lerp(new Color(l.night), glow);
    for (const l of u.localLights || []) l.intensity = glow * (l.userData.nightPower || 24);
  }

  return { build, animate, height, water: () => false, updateLighting };
}
