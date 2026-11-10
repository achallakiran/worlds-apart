/*PODIUM*/const PODIUM_T = {strips:1,cols:22,rows:14,t:[
'rdhklorstuuuutonkkrfet',
'zegghhhhjklnpssttutsqs',
'zgeghiiihiiihhhkknprst',
'znljjihihiiiiiihhhggjj',
'nllnoppljjihihighhihhg',
'efhhikmmoqpnljiighijih',
'effggghijjllmlnnmljiii',
'gffffffgghhjjjkllmmlnn',
'nnnkigdeefghiiijkmllmu',
'ccehklmijffgghhiikjikm',
'somhcbdfkkkjhhhghjihhj',
'oqrutroicabehikjjjihhj',
'konqspxzyxrkdbdgnkollj',
'hjknonnsuwzzzzxpifhknl'
]};/*ENDPODIUM*/
/*PED*/const PED_T = {strips:1,cols:36,rows:5,t:[
'hchpmsltpprqlpooptnrskuitlqjljhglquu',
'rnrtprnpnlpmojpnmmqqsrprrrqpoomljhfd',
'rrrororqssvusqponmkihgeedeffghikinkl',
'rqponmljiffgghiijkkkklmlplqmnonqosqr',
'ikkmmnlplqoqopprrsrsttvvvwvwxxxvuvuu'
]};/*ENDPED*/
/*FRIEZE*/const FRIEZE_T = {strips:1,cols:40,rows:2,t:[
'nopqrssssruvummmuuohhiqoijghptlliiijwqih',
'kpnedjngaagmefddlqkkjgnwlkkiozoljhggzukk'
]};/*ENDFRIEZE*/
/*
 * Turkey — "Mausoleum of Halicarnassus & Temple of Artemis" (turkey-mausoleum-artemis). First scenery of Turkey, third of the Ancient Seven.
 *
 * Two wonders share one Aegean harbour town: on the left the Mausoleum (banded podium, statue ledge, colonnade, stepped pyramid roof,
 * golden quadriga), on the right the Temple of Artemis of Ephesus (three steps, double ring of Ionic columns, carved frieze and
 * pediment, altar and the many-breasted goddess in the forecourt). A paved plaza with a fountain runs along a quay on the bay.
 * Podium bands, temple pediment and frieze are traced from reference images (tools/stages/extract_facade.py): PODIUM, PED, FRIEZE.
 * The bay is animated: ripples, glints, foam on the quay, sailing ships; the fountain throws spray and the plaza is full of people.
 * The ten differences are spread around the town (every ~36 degrees); four are lights that look the same by day.
 */
function createStage(E) {
  const { Mesh, BasicMaterial, PointLight, Color, hash } = E;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const smooth = (a, b, v) => { const t = clamp((v - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };
  const G = 1.0, SEA = 0.4, COAST = 9;                    // land level, sea level, quay edge (sea is z > 9)
  const M = [-10, -6], MH = 10.5, MY = 1.5;               // mausoleum centre, precinct half width, precinct top
  const T = [10.5, -5], TY = 1.4;                         // temple centre, terrace top
  const hillH = (x, z) => {
    const back = smooth(-16, -23.5, z), pk = Math.exp(-((x - 20) * (x - 20) + (z + 20) * (z + 20)) / 36) * 7.5;
    return back * (2.0 + 1.6 * Math.sin(x * 0.33) + 0.9 * Math.sin(x * 0.9 + 1)) + pk * smooth(-12, -20, z);
  };
  const top = (x, z) => G + Math.max(0, Math.floor(hillH(x, z) * 2) / 2);
  function height(x, z) {
    if (z > COAST) return 0.5;
    if (Math.abs(x - M[0]) <= MH && Math.abs(z - M[1]) <= MH) return MY;
    if (x >= T[0] - 6.3 && x <= T[0] + 6.3 && z >= T[1] - 10 && z <= T[1] + 10) return TY;
    return top(x, z);
  }
  const mix = (a, b, t) => { const r = (a >> 16 & 255) + ((b >> 16 & 255) - (a >> 16 & 255)) * t, g = (a >> 8 & 255) + ((b >> 8 & 255) - (a >> 8 & 255)) * t, bl = (a & 255) + ((b & 255) - (a & 255)) * t; return (r | 0) << 16 | (g | 0) << 8 | (bl | 0); };
  const GRASS = [0x7fb04a, 0x8bbb52, 0x72a342, 0x93c05a], HILL = [0x8a9a5a, 0x9aa468, 0x7e8f50, 0xa8a070], ROCKP = [0xb89a98, 0xa88a8a, 0xc8aaa4];
  const LEAF = [0x2f7a3a, 0x3d8f45, 0x4aa04c, 0x58b055], OLIVE = [0x6f8f4a, 0x7f9a58, 0x5f7f40], MARBLE = 0xece3cf, MARBLE2 = 0xdcd0b6, GOLD = 0xd8a43a, STONE = 0xd8c39a;
  const FLOWER = [0xe85a9a, 0xb565d9, 0xf2c83a, 0xf5f0e6, 0xe8743a];
  const PAVE = [0xe6c9a8, 0xd9b896];
  const D = {
    pedestal: [22, -3], lantern: [16, 8.5], ship: [5, 16], fountain: [-5, 6.8], gardenlamp: [-17, 8], visitors: [-23, -6],
    beacon: [-18, -19], banner: [-4, -19], flame: [8, -19], cypress: [19, -14],
  };

  function build(ctx, variant) {
    const { box: g, group: o, makeDiff: B } = ctx;
    const U = ctx.world.userData;
    const pick = (arr, a, b) => arr[Math.floor(hash(a, b) * arr.length)];
    const motion = (grp) => { grp.userData.motion = true; return grp; };
    U.wallLights = []; U.beams = []; U.ripples = []; U.glints = []; U.foam = []; U.ships = []; U.people = []; U.gulls = []; U.drops = []; U.rings = []; U.flames = []; U.smoke = [];

    function lamp(x, y, z, sx, sy, sz, dayColor, nightColor, opts = {}) {
      const m = new Mesh(ctx.cube, new BasicMaterial(opts.alpha !== undefined ? { color: dayColor, transparent: true, opacity: opts.alpha, depthWrite: false } : { color: dayColor }));
      m.position.set(x, y, z); m.scale.set(sx, sy, sz);
      m.userData.ownedMaterial = true; m.userData.motion = true;
      if (!opts.pickable) m.raycast = () => {};
      (opts.parent || ctx.world).add(m);
      U.wallLights.push({ m, day: dayColor, night: nightColor });
      return m;
    }
    const person = (parent, x, y, z, c) => { const p = motion(o(x, y, z)); parent.add(p); g(0, 0.45, 0, 0.3, 0.9, 0.24, c, p); g(0, 1.08, 0, 0.26, 0.26, 0.26, 0xe8c9a0, p); g(0, 1.27, 0, 0.32, 0.12, 0.32, 0x3a2f27, p); return p; };
    function cypress(parent, x, y, z, h = 3.4) { g(x, y + h / 2, z, 0.8, h, 0.8, 0x1f5a2f, parent); g(x, y + h + 0.3, z, 0.5, 0.8, 0.5, 0x1f5a2f, parent); g(x, y + h * 0.3, z, 1.1, h * 0.4, 1.1, 0x246a35, parent); }
    function olive(parent, x, y, z, s) { g(x, y + 0.6, z, 0.3, 1.2, 0.3, 0x6b4a33, parent); g(x, y + 1.6, z, 1.7, 1.1, 1.7, pick(OLIVE, s, 3), parent); g(x + 0.1, y + 2.35, z, 1.1, 0.7, 1.1, pick(OLIVE, s, 4), parent); }
    function bush(parent, x, y, z, s, flowers) { g(x, y + 0.4, z, 1.2, 0.8, 1.2, pick(LEAF, s, 10), parent); if (flowers) for (let i = 0; i < 4; i++) g(x + (hash(s, i) - 0.5) * 0.9, y + 0.85, z + (hash(i, s) - 0.5) * 0.9, 0.22, 0.2, 0.22, pick(FLOWER, s, i), parent); }
    function ship(parent, sail, stripe) {
      const b = motion(o(0, 0, 0)); parent.add(b);
      g(0, 0.3, 0, 3.6, 0.5, 1.1, 0x7a4a28, b); g(1.9, 0.6, 0, 0.6, 0.6, 0.8, 0x7a4a28, b); g(-1.9, 0.8, 0, 0.5, 0.9, 0.8, 0x5a3a20, b); g(0, 0.58, 0, 3.2, 0.1, 0.9, 0xc9a06a, b);
      g(0, 2.3, 0, 0.12, 3.4, 0.12, 0x5a3f28, b); g(0.1, 2.55, 0, 0.1, 2.2, 2.2, sail, b); g(0.16, 2.6, 0, 0.05, 0.42, 2.2, stripe, b); g(0.1, 3.7, 0, 0.1, 0.1, 2.7, 0x5a3f28, b);
      person(b, -1.3, 0.62, 0, stripe);
      return b;
    }
    function statue(parent, x, y, z, c) { g(x, y + 0.45, z, 0.28, 0.9, 0.24, c || GOLD, parent); g(x, y + 1.05, z, 0.24, 0.24, 0.24, c || GOLD, parent); g(x + 0.2, y + 0.75, z, 0.1, 0.5, 0.1, c || GOLD, parent); }
    function column(x, y0, z, h, w) { g(x, y0 + 0.1, z, w * 1.5, 0.2, w * 1.5, MARBLE2); g(x, y0 + 0.2 + (h - 0.5) / 2, z, w, h - 0.5, w, MARBLE); g(x, y0 + h - 0.15, z, w * 1.5, 0.3, w * 1.5, MARBLE2); }

    // ---------- bay, quay, land, hills ----------
    const bottom = -2.4;
    g(0, (bottom + SEA - 0.08) / 2, 8, 52, SEA - 0.08 - bottom, 32, 0x1a4f8a);
    lamp(0, SEA, 8.5, 52, 0.12, 31, 0x2f86c9, 0x0b2142);
    for (let x = -25; x <= 25; x++) for (let z = COAST; z <= COAST + 2; z++) g(x, SEA + 0.09, z + 0.5, 1.02, 0.04, 1.02, mix(0x56c4d8, 0x2f86c9, (z - COAST) / 3));
    g(0, (bottom + G) / 2 - 0.05, -6.5, 52, G - bottom - 0.1, 31, 0x8a6a45);                 // land block z -22 .. 9
    g(0, (-0.7 + G) / 2, COAST + 0.1, 52, G + 0.7, 0.3, 0xcfc4a8); g(0, G - 0.1, COAST + 0.1, 52, 0.14, 0.4, STONE);
    for (let x = -24; x <= 24; x += 3.2) g(x, 0.75, COAST + 0.3, 0.3, 0.35, 0.3, 0x5a3f28);         // mooring posts
    for (let x = -25; x <= 25; x += 2) {
      for (let z = -12; z <= 8; z += 2) { if (z >= 4.5 && z <= 8) continue; if (hash(x, z) > 0.2) g(x, G - 0.07, z, 2.02, 0.2, 2.02, pick(GRASS, x, z)); else g(x, G - 0.07, z, 2.02, 0.2, 2.02, pick(HILL, x, z)); }
    }
    for (let x = -25; x <= 25; x++) for (let z = -22; z <= -13; z++) {                      // hills behind, a pink peak on the right
      const h = top(x, z), pk = Math.exp(-((x - 20) * (x - 20) + (z + 20) * (z + 20)) / 36) * 7.5 > 2.2 && h > 4;
      if (h <= G + 0.01 && z > -17) continue;
      g(x, (bottom + h) / 2 - 0.05, z, 1.02, h - bottom - 0.1, 1.02, pk ? pick(ROCKP, x, z) : pick(HILL, x, z));
    }
    // paved plaza along the quay with a processional way to each monument
    for (let x = -25; x <= 25; x++) for (let z = 5; z <= 8; z++) g(x, G - 0.02, z, 1.02, 0.14, 1.02, ((x + z) & 1) ? PAVE[0] : PAVE[1]);
    for (const [px, pz, sx, sz] of [[-10, 3.3, 3.2, 3.6], [11, 3.3, 3.2, 3.6]]) g(px, G + 0.0, pz, sx, 0.2, sz, PAVE[0]);

    // ---------- Mausoleum ----------
    {
      const [cx, cz] = M;
      g(cx, (MY + 0.1) / 2 + 0.05, cz, MH * 2, MY - 0.9, MH * 2, 0xcfb894);
      for (let x = -MH + 0.75; x < MH; x += 1.5) for (let z = -MH + 0.75; z < MH; z += 1.5) g(cx + x, MY - 0.03, cz + z, 1.52, 0.12, 1.52, (((x + z) / 1.5 | 0) & 1) ? PAVE[0] : PAVE[1]);
      g(cx, MY + 0.2, cz + MH + 0.05, MH * 2 + 0.3, 0.4, 0.25, STONE); g(cx, MY + 0.2, cz - MH - 0.05, MH * 2 + 0.3, 0.4, 0.25, STONE);
      g(cx + MH + 0.05, MY + 0.2, cz, 0.25, 0.4, MH * 2 + 0.3, STONE); g(cx - MH - 0.05, MY + 0.2, cz, 0.25, 0.4, MH * 2 + 0.3, STONE);
      g(cx, MY + 0.2, cz, 13.4, 0.4, 13.4, 0xaebdb8);                                      // blue-grey plinth
      const ph = 6.2, y0 = MY + 0.4, rows = PODIUM_T.rows, cols = PODIUM_T.cols, rh = 4.8 / rows, cw = 2 * ph / cols;
      g(cx, y0 + 2.4, cz, 2 * ph, 4.8, 2 * ph, 0xcdb88a);
      for (let side = 0; side < 4; side++) for (let c = 0; c < cols; c++) for (let r = 0; r < rows; r++) {
        const ch = PODIUM_T.t[r][(c + side * 5) % cols], t = (ch.charCodeAt(0) - 97) / 25, col = mix(0x8f6420, 0xe8e0cc, t), dep = 0.04 + 0.1 * t, u = -ph + (c + 0.5) * cw, y = y0 + rh * (rows - 1 - r + 0.5), s = cw * 1.03;
        if (side === 0) g(cx + u, y, cz + ph + dep / 2, s, rh * 1.03, dep, col); else if (side === 1) g(cx + ph + dep / 2, y, cz - u, dep, rh * 1.03, s, col);
        else if (side === 2) g(cx - u, y, cz - ph - dep / 2, s, rh * 1.03, dep, col); else g(cx - ph - dep / 2, y, cz + u, dep, rh * 1.03, s, col);
      }
      for (let i = 0; i < 12; i++) { const a = -ph + 0.6 + i * (2 * ph - 1.2) / 11; for (const s of [-1, 1]) { g(cx + a, MY + 0.9, cz + s * (ph + 0.55), 0.7, 0.8, 0.5, 0xe6dcc8); } }
      const yL = y0 + 4.8;
      g(cx, yL + 0.15, cz, 12.9, 0.3, 12.9, GOLD); g(cx, yL + 0.4, cz, 11.4, 0.2, 11.4, 0xe6dcc8);                                       // ledge and cornice
      for (let i = 0; i < 9; i++) { const a = -5 + i * 1.25; for (const [x, z] of [[a, 5.4], [a, -5.4], [5.4, a], [-5.4, a]]) statue(ctx.world, cx + x, yL + 0.5, cz + z, GOLD); }
      const bh = 1.7, yB = yL + 0.5;                                                       // ashlar block
      g(cx, yB + bh / 2, cz, 9.6, bh, 9.6, 0xcdb88a);
      for (let side = 0; side < 4; side++) for (let c = 0; c < 16; c++) for (let r = 0; r < 3; r++) {
        const t = (PODIUM_T.t[3 + r][(c + side * 3) % cols].charCodeAt(0) - 97) / 25, col = mix(0xb89a66, 0xe6d8b8, t), u = -4.8 + (c + 0.5) * 0.6, y = yB + 0.28 + r * 0.56;
        if (side === 0) g(cx + u, y, cz + 4.84, 0.6, 0.55, 0.08, col); else if (side === 1) g(cx + 4.84, y, cz - u, 0.08, 0.55, 0.6, col); else if (side === 2) g(cx - u, y, cz - 4.84, 0.6, 0.55, 0.08, col); else g(cx - 4.84, y, cz + u, 0.08, 0.55, 0.6, col);
      }
      g(cx, yB + bh + 0.15, cz, 10.2, 0.3, 10.2, MARBLE2);
      const yC = yB + bh + 0.3, ch = 3.4;                                                  // colonnade storey: 36 columns round a cella
      g(cx, yC + ch / 2, cz, 6.4, ch, 6.4, 0xd8c8a8);
      for (let i = 0; i < 10; i++) { const a = -4.1 + i * 0.82; for (const [x, z] of [[a, 4.1], [-a, -4.1], [4.1, -a], [-4.1, a]]) column(cx + x, yC, cz + z, ch, 0.3); }
      for (const s of [-1, 1]) lamp(cx + s * 1.4, yC + 1.6, cz + 3.25, 0.7, 1.8, 0.06, 0x2a2018, 0xffc468);
      const yE = yC + ch;
      g(cx, yE + 0.3, cz, 9.4, 0.6, 9.4, MARBLE2);
      for (let side = 0; side < 4; side++) for (let c = 0; c < 20; c++) {
        const t = (FRIEZE_T.t[c % 2][(c * 2 + side * 7) % FRIEZE_T.cols].charCodeAt(0) - 97) / 25, col = t < 0.35 ? 0x2e4f8f : t < 0.7 ? 0xe8d8b0 : 0xc0503a, u = -4.5 + (c + 0.5) * 0.45;
        if (side === 0) g(cx + u, yE + 0.3, cz + 4.72, 0.45, 0.45, 0.06, col); else if (side === 1) g(cx + 4.72, yE + 0.3, cz - u, 0.06, 0.45, 0.45, col); else if (side === 2) g(cx - u, yE + 0.3, cz - 4.72, 0.45, 0.45, 0.06, col); else g(cx - 4.72, yE + 0.3, cz + u, 0.06, 0.45, 0.45, col);
      }
      g(cx, yE + 0.75, cz, 10.0, 0.3, 10.0, GOLD);
      for (let i = 0; i < 12; i++) { const hw = 4.6 - i * 0.33; g(cx, yE + 0.9 + i * 0.34 + 0.17, cz, 2 * hw, 0.34, 2 * hw, i % 2 ? 0xd2c4a4 : 0xe6dcc4); }
      const yP = yE + 0.9 + 12 * 0.34;
      g(cx, yP + 0.3, cz, 1.8, 0.6, 1.8, MARBLE2);
      // golden quadriga (four horses and a chariot) catches the light
      lamp(cx, yP + 1.0, cz - 0.3, 1.4, 0.5, 0.8, GOLD, 0xffd47a);
      for (let i = 0; i < 4; i++) { const x = cx - 0.75 + i * 0.5; lamp(x, yP + 0.95, cz + 0.8, 0.34, 0.5, 0.8, GOLD, 0xffd47a); lamp(x, yP + 1.4, cz + 1.1, 0.26, 0.5, 0.34, GOLD, 0xffd47a); }
      lamp(cx, yP + 1.55, cz - 0.4, 0.3, 0.8, 0.3, GOLD, 0xffd47a);
      for (const [mx, mz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) { g(cx + mx * 5.2, yE + 0.95, cz + mz * 4.4, 0.5, 0.9, 0.5, GOLD); }
      // garden: cypress, statues on pedestals, flower beds, pools
      for (const [x, z] of [[-9, 3], [-9, -14], [8, -14], [8.5, 3]]) cypress(ctx.world, cx + x, MY, cz + z, 3.6 + hash(x, z));
      for (const [x, z] of [[-8.5, 7.5], [-8.5, -7.5], [8.8, 7.5], [8.8, -7.5]]) { }
      for (const [x, z] of [[-7.6, 1.0], [7.8, 1.0], [-7.6, -11], [7.8, -11], [0, 9.0], [0, -9.0]]) { g(cx + x, MY + 0.6, cz + z, 0.9, 1.2, 0.9, MARBLE2); statue(ctx.world, cx + x, MY + 1.2, cz + z, 0xf5f0e6); }
      for (const [x, z, n] of [[-6.5, -8, 5], [6.5, -8, 6], [-6.5, 6, 7], [6.5, 6, 8]]) for (let i = 0; i < 4; i++) bush(ctx.world, cx + x + (i % 2) * 1.2, MY, cz + z + (i >> 1) * 1.2, n * 9 + i, true);
      for (let i = 0; i < 4; i++) olive(ctx.world, cx - 8.8 + (i % 2) * 17.6, MY, cz - 9 + Math.floor(i / 2) * 9, 500 + i);
    }

    // ---------- Temple of Artemis ----------
    {
      const [cx, cz] = T, hw = 4.8, hl = 8.5;
      g(cx, (TY - bottom) / 2 + bottom / 2 - 0.05 + 0.05, cz, 12.6, TY - bottom - 0.1, 20, 0xcfb894);
      for (let x = -6.15; x < 6.3; x += 1.5) for (let z = -9.75; z < 10; z += 1.5) g(cx + x, TY - 0.03, cz + z, 1.52, 0.12, 1.52, (((x + z) / 1.5 | 0) & 1) ? PAVE[0] : PAVE[1]);
      for (let i = 0; i < 3; i++) g(cx, TY + 0.175 + i * 0.35, cz, 2 * (5.6 - i * 0.4), 0.35, 2 * (9.3 - i * 0.4), i % 2 ? MARBLE2 : MARBLE);
      const y0 = TY + 1.05, ch = 6.2;
      g(cx, y0 + ch / 2, cz, 5.0, ch, 13.6, 0xd8c8a8);                                      // cella
      lamp(cx, y0 + 1.5, cz + 6.85, 1.3, 2.6, 0.06, 0x2a2018, 0xffc468);                      // temple door
      for (let i = 0; i < 8; i++) { const x = -4.4 + i * (8.8 / 7); for (const z of [8.1, -8.1]) column(cx + x, y0, cz + z, ch, 0.5); }
      for (let i = 1; i < 16; i++) { const z = -8.1 + i * (16.2 / 16); for (const x of [-4.4, 4.4]) column(cx + x, y0, cz + z, ch, 0.5); }
      for (let i = 0; i < 6; i++) { const x = -3.2 + i * (6.4 / 5); for (const z of [6.9, -6.9]) column(cx + x, y0, cz + z, ch, 0.45); }
      for (let i = 1; i < 14; i++) { const z = -6.9 + i * (13.8 / 14); for (const x of [-3.2, 3.2]) column(cx + x, y0, cz + z, ch, 0.45); }
      const yE = y0 + ch;
      g(cx, yE + 0.35, cz, 2 * hw + 0.2, 0.7, 2 * hl + 0.2, MARBLE);
      for (let side = 0; side < 4; side++) {
        const n = side % 2 === 0 ? 24 : 42;
        for (let c = 0; c < n; c++) {
          const t = (FRIEZE_T.t[c % 2][(c + side * 9) % FRIEZE_T.cols].charCodeAt(0) - 97) / 25, col = t < 0.35 ? 0x2e4f8f : t < 0.7 ? 0xe8d8b0 : 0xc0503a;
          const len = side % 2 === 0 ? 2 * hw : 2 * hl, u = -len / 2 + (c + 0.5) * len / n;
          if (side === 0) g(cx + u, yE + 0.85, cz + hl + 0.14, len / n, 0.5, 0.08, col); else if (side === 1) g(cx + hw + 0.14, yE + 0.85, cz - u, 0.08, 0.5, len / n, col);
          else if (side === 2) g(cx - u, yE + 0.85, cz - hl - 0.14, len / n, 0.5, 0.08, col); else g(cx - hw - 0.14, yE + 0.85, cz + u, 0.08, 0.5, len / n, col);
        }
      }
      g(cx, yE + 1.25, cz, 2 * hw + 0.6, 0.3, 2 * hl + 0.6, GOLD);
      // gabled roof along z with traced pediment tympana at both ends
      const yR = yE + 1.4;
      for (let i = 0; i < 9; i++) { const w = hw + 0.3 - i * 0.56; if (w > 0) g(cx, yR + i * 0.31 + 0.155, cz, 2 * w, 0.31, 2 * hl + 0.5, i % 2 ? 0xcf9b72 : 0xd9a67e); }
      g(cx, yR + 9 * 0.31 + 0.1, cz, 0.5, 0.2, 2 * hl + 0.5, 0xb8704a);
      for (const sz of [1, -1]) {
        const cols = PED_T.cols, rows = PED_T.rows, th = 2.7, rhh = th / rows, base = 2 * hw + 0.2;
        g(cx, yR + th / 2, cz + sz * (hl + 0.12), 1, 0.01, 0.01, 0x000000);
        for (let r = 0; r < rows; r++) {
          const yy = yR + rhh * (r + 0.5), wmax = base * (1 - (r + 0.5) / rows) + 0.2;
          for (let c = 0; c < cols; c++) {
            const u = -base / 2 + (c + 0.5) * base / cols; if (Math.abs(u) > wmax / 2) continue;
            const t = (PED_T.t[rows - 1 - r][(c + (sz < 0 ? 7 : 0)) % cols].charCodeAt(0) - 97) / 25;
            g(cx + u, yy, cz + sz * (hl + 0.1), base / cols * 1.04, rhh * 1.04, 0.14, mix(0xb48a54, 0xf3e4bc, t));
          }
        }
        g(cx, yR + th + 0.4, cz + sz * hl, 0.5, 0.5, 0.5, GOLD); g(cx - hw - 0.1, yR + 0.2, cz + sz * hl, 0.6, 0.45, 0.6, GOLD); g(cx + hw + 0.1, yR + 0.2, cz + sz * hl, 0.6, 0.45, 0.6, GOLD);
      }
      for (let k = 0; k < 8; k++) { const x = cx - 3.6 + k * 1.03; lamp(x, y0 + 0.8, cz + hl + 0.5, 0.3, 0.3, 0.3, 0xe8dcb8, 0xffb23a); }
      // altar with fire, the goddess of Ephesus on a pedestal, temple attendants
      g(cx, TY + 0.2, cz + 12.4 - 6.7 + 0.0, 1, 0.01, 1, 0x000000);
      g(cx, G + 0.7, 7.0, 3.2, 1.2, 2.0, MARBLE2); g(cx, G + 1.4, 7.0, 3.6, 0.2, 2.4, GOLD);
      U.flames.push(lamp(cx, G + 1.9, 7.0, 0.9, 0.8, 0.9, 0xc9803a, 0xff9a3a));
      U.beams.push({ m: lamp(cx, G + 2.6, 7.0, 1.6, 2.0, 1.6, 0xffb060, 0xffb060, { alpha: 0 }), alpha: 0.25 });
      for (let k = 0; k < 5; k++) U.smoke.push({ m: lamp(cx, G + 2.5, 7.0, 0.5, 0.5, 0.5, 0x8a8a90, 0x4a4a58, { alpha: 0.35 }), ph: k / 5 });
      const sx = 3.2, sz2 = 6.5;                                                           // the many-breasted Artemis
      g(sx, G + 0.6, sz2, 2.0, 1.2, 2.0, MARBLE2); g(sx, G + 1.3, sz2, 2.3, 0.2, 2.3, GOLD);
      g(sx, G + 2.5, sz2, 1.5, 2.4, 1.0, 0xd8b878); g(sx, G + 3.9, sz2, 1.9, 0.9, 1.1, 0xe6c88c);
      for (let i = 0; i < 6; i++) g(sx + (i % 3 - 1) * 0.45, G + 3.7 + (i >> 1) * 0.28, sz2 + 0.58, 0.3, 0.28, 0.1, 0xf5e6b8);
      g(sx, G + 4.7, sz2, 0.8, 0.8, 0.8, 0xe6c88c); g(sx, G + 5.3, sz2, 1.0, 0.45, 0.9, GOLD);
      g(sx - 1.2, G + 3.9, sz2 + 0.3, 0.9, 0.2, 0.2, 0xd8b878); g(sx + 1.2, G + 3.9, sz2 + 0.3, 0.9, 0.2, 0.2, 0xd8b878);
      for (const [x, z] of [[1, -13], [20.5, 3], [-0.5, 2]]) cypress(ctx.world, x + (x < 5 ? 0 : 0), TY, z, 3.8);
      for (const [x, z] of [[19.2, 8.0], [14.5, 8.2], [-2.6, 8.2], [21.5, -9]]) { }
      for (let i = 0; i < 6; i++) bush(ctx.world, 16.8 + (i % 2) * 1.3, G, -10 + Math.floor(i / 2) * 3.6, 200 + i, true);
    }

    // ---------- fountain on the plaza, trees, quay details ----------
    function fountain(parent, x, y, z, seed, dry) {
      g(x, y + 0.2, z, 3.4, 0.4, 3.4, STONE, parent); g(x, y + 0.45, z, 2.8, 0.1, 2.8, 0xb99a6a, parent);
      if (!dry) lamp(x, y + 0.43, z, 2.6, 0.1, 2.6, 0x59b2ee, 0x15305a, { parent, pickable: parent !== ctx.world });
      else { g(x, y + 0.43, z, 2.6, 0.08, 2.6, 0xc8b48a, parent); for (let i = 0; i < 5; i++) g(x + (hash(i, 3) - 0.5) * 2, y + 0.5, z + (hash(i, 5) - 0.5) * 2, 0.3, 0.14, 0.3, 0x9a9588, parent); }
      g(x, y + 0.9, z, 0.4, 1.0, 0.4, STONE, parent); g(x, y + 1.45, z, 0.9, 0.2, 0.9, STONE, parent);
      if (dry) return;
      for (let i = 0; i < 16; i++) {
        const m = lamp(x, y + 1.6, z, 0.1, 0.1, 0.1, 0xffffff, 0xbcd0f0, { alpha: 0.85, parent });
        U.drops.push({ m, cx: x, cy: y + 1.55, cz: z, ang: i / 16 * 6.283, vr: 0.5 + (i % 3) * 0.28, vy: 2.9 + (i % 4) * 0.35, ph: i / 16, T: 1.0 });
      }
      const grp = motion(o(x, y + 0.5, z)); parent.add(grp); const mats = [];
      for (const [bx, bz, sx, sz] of [[0, -1, 2, 0.08], [0, 1, 2, 0.08], [-1, 0, 0.08, 2], [1, 0, 0.08, 2]]) mats.push(lamp(bx * 0.5, 0, bz * 0.5, sx * 0.5, 0.05, sz * 0.5, 0xffffff, 0x9cb4d8, { alpha: 0.55, parent: grp }));
      U.rings.push({ g: grp, mats, ph: hash(seed, 3), grow: 1.1 });
    }
    fountain(ctx.world, 22, G, 6.5, 5, false);
    for (const [x, z] of [[-24, 6.2], [-14, 5.4], [1.5, 5.6], [-0.5, -2.5], [24, 4]]) olive(ctx.world, x, G, z, 40 + x);
    for (const [x, z] of [[-24, -8], [-23, 1], [-22, -14], [25, -9], [24.5, -13], [14, -16.5], [2, -17.5], [-14, -17.5], [-8, -18], [11, -18], [-21, -17]]) cypress(ctx.world, x, top(x, z), z, 3.2 + hash(x, z));
    for (let x = -22; x <= 22; x += 3.2) {
      if (Math.abs(x - D.lantern[0]) < 3 || Math.abs(x - D.fountain[0]) < 2.5 || Math.abs(x - D.gardenlamp[0]) < 3 || Math.abs(x - 22) < 2.5) continue;
      g(x, G + 0.55, 8.7, 0.12, 1.1, 0.12, 0x3a2f27); lamp(x, G + 1.2, 8.7, 0.3, 0.32, 0.3, 0xe8dcb8, 0xffc468);
    }
    for (const x of [-12, 13]) { g(x, 0.5, COAST + 2.5, 1.6, 0.3, 5.5, 0x9a7a52); for (const dz of [0.4, 2.6, 4.8]) { g(x - 0.7, 0.2, COAST + dz, 0.16, 0.9, 0.16, 0x5a3f28); g(x + 0.7, 0.2, COAST + dz, 0.16, 0.9, 0.16, 0x5a3f28); } }  // two piers

    // ---------- people, gulls, ships, bay ----------
    const cols = [0xc0392b, 0x2e7bd6, 0xe0b030, 0x2e9b4a, 0xb565d9, 0xf5f0e6, 0xe8743a, 0x2ec4b6];
    for (const [x1, z1, x2, z2, y, i] of [[-22, 6.0, -2, 6.0, G, 0], [24, 7.2, 4, 7.2, G, 1], [-3, 7.6, -20, 7.6, G, 2], [2, 4.6, 18, 4.6, G, 3], [-12, 5.2, -7, 5.2, G, 4], [8, 8.2, 20, 8.2, G, 5], [-4, MY + 0.2, -16, MY + 0.2, MY, 6]]) {
      const p = person(ctx.world, x1, y, z1, cols[i]); U.people.push({ g: p, x1, z1, x2, z2, y, sp: 0.035 + 0.008 * i, ph: i * 1.3 });
    }
    for (let k = 0; k < 4; k++) {
      const d = motion(o(0, 0, 0)); ctx.world.add(d);
      g(0, 0, 0, 0.5, 0.2, 0.2, 0xf5f0e6, d); g(0.28, 0.06, 0, 0.18, 0.18, 0.16, 0xf5f0e6, d);
      const wings = [-1, 1].map((s) => { const p = motion(o(0, 0.08, s * 0.1)); d.add(p); g(0, 0.04, s * 0.32, 0.4, 0.05, 0.6, 0xe8e4da, p); return { p, s }; });
      U.gulls.push({ g: d, wings, r: 11 + k * 3, w: (k % 2 ? -1 : 1) * (0.15 + 0.03 * k), y: 17 + k * 1.6, ph: k * 1.7, cx: k % 2 ? M[0] : T[0], cz: k % 2 ? M[1] : T[1] });
    }
    for (const [z, A, w, ph, sail, stripe, sc] of [[21.5, 20, 0.04, 0.5, 0xf3ecd8, 0xc0392b, 1], [18.8, 21, 0.031, 3.4, 0xf3ecd8, 0x2e7bd6, 0.85]]) {
      const s = ship(ctx.world, sail, stripe); s.scale.set(sc, sc, sc); U.ships.push({ g: s, z, A, w, ph });
    }
    for (let i = 0; i < 100; i++) {
      const m = lamp(0, SEA + 0.13, 10.5 + hash(i, 2) * 13, 0.9 + hash(i, 9) * 1.1, 0.04, 0.14, 0xdff3ff, 0x6f8fc0, { alpha: 0.5 });
      U.ripples.push({ m, x0: hash(i, 1) * 52 - 26, sp: 0.25 + hash(i, 3) * 0.4, fl: 0.8 + hash(i, 5) * 1.4, ph: hash(i, 6) * 6.3, a: 0.55 });
    }
    for (let i = 0; i < 36; i++) U.glints.push({ m: lamp(hash(i, 21) * 48 - 24, SEA + 0.15, 10.5 + hash(i, 22) * 13, 0.22, 0.05, 0.22, 0xffffff, 0xffc878, { alpha: 0 }), ph: hash(i, 23) * 6.3, f: 1.2 + hash(i, 24) * 1.5, a: 0.9 });
    for (let i = 0; i < 52; i++) { const x = -25.5 + i; const m = lamp(x, SEA + 0.16, COAST + 0.6, 1.0, 0.06, 0.9, 0xffffff, 0x9cb4d8, { alpha: 0.6 }); U.foam.push({ m, x, ph: i * 0.45 }); }

    // ================= DIFFERENCES (every ~36 degrees around the town) =================
    // 0 (5 deg): statue on a pedestal beside the temple — present or absent
    B(0, D.pedestal[0], top(...D.pedestal), D.pedestal[1], 'Goddess statue on the pedestal', 2.4, (d) => {
      g(0, 0.6, 0, 1.4, 1.2, 1.4, MARBLE2, d); g(0, 1.3, 0, 1.7, 0.2, 1.7, GOLD, d);
      if (!variant) { g(0, 2.5, 0, 0.9, 2.2, 0.6, 0xd8b878, d); g(0, 3.8, 0, 0.5, 0.5, 0.5, 0xe6c88c, d); g(0, 4.2, 0, 0.7, 0.3, 0.6, GOLD, d); g(-0.8, 3.2, 0.1, 0.8, 0.14, 0.14, 0xd8b878, d); g(0.8, 3.2, 0.1, 0.8, 0.14, 0.14, 0xd8b878, d); }
    }, variant);
    // 1 (45 deg): quay lanterns — warm white or cyan at night
    B(1, D.lantern[0], G, D.lantern[1], 'Quay lantern colour', 2.4, (d) => {
      for (const s of [-1, 1]) { g(s * 1.2, 0.8, 0, 0.14, 1.6, 0.14, 0x3a2f27, d); lamp(s * 1.2, 1.75, 0, 0.42, 0.44, 0.42, 0xe8dcb8, variant ? 0x4fd8ff : 0xffb23a, { parent: d, pickable: true }); }
    }, variant);
    // 2 (80 deg): ship at anchor — present or absent
    B(2, D.ship[0], SEA, D.ship[1], 'Ship at anchor in the bay', 3.0, (d) => {
      g(2.2, 0.35, 0.9, 0.3, 0.7, 0.3, 0xc0392b, d);
      if (!variant) { const s = ship(d, 0xf3ecd8, 0x2e9b4a); s.rotation.y = 0.5; }
    }, variant);
    // 3 (118 deg): plaza fountain — flowing or dry
    B(3, D.fountain[0], G, D.fountain[1], 'Plaza fountain: flowing or dry', 2.8, (d) => { fountain(d, 0, 0, 0, 9, variant); }, variant);
    // 4 (140 deg): garden lamps — amber or green at night
    B(4, D.gardenlamp[0], G, D.gardenlamp[1], 'Garden lamp colour', 2.4, (d) => {
      for (const k of [-1, 0, 1]) { g(k * 1.2, 0.7, 0, 0.12, 1.4, 0.12, 0x3a2f27, d); lamp(k * 1.2, 1.55, 0, 0.4, 0.4, 0.4, 0xe8dcb8, variant ? 0x6bff8a : 0xffb23a, { parent: d, pickable: true }); }
    }, variant);
    // 5 (180 deg): visitors beside the precinct — three or two
    B(5, D.visitors[0], G, D.visitors[1], 'Visitors at the wall: three or two', 3.0, (d) => {
      g(0, 0.25, 0, 3.6, 0.5, 1.2, STONE, d);
      const cs = [0xc0392b, 0x2e7bd6, 0xe0b030];
      for (const [i, x, z] of [[0, -1.2, 0.2], [1, 0.1, -0.2], [2, 1.3, 0.3]].slice(0, variant ? 2 : 3)) person(d, x, 0.5, z, cs[i]);
    }, variant);
    // 6 (215 deg): hillside beacon — red or blue at night
    B(6, D.beacon[0], top(...D.beacon), D.beacon[1], 'Hillside beacon colour', 2.6, (d) => {
      g(0, 0.5, 0, 0.9, 1.0, 0.9, 0x6e5230, d); g(0, 1.1, 0, 1.2, 0.2, 1.2, 0x3a2f27, d);
      U.flames.push(lamp(0, 1.5, 0, 0.7, 0.7, 0.7, 0xd9d6cc, variant ? 0x7fd0ff : 0xff4a2a, { parent: d, pickable: true }));
    }, variant);
    // 7 (250 deg): banner on a pole — red or blue
    B(7, D.banner[0], top(...D.banner), D.banner[1], 'Banner colour: red or blue', 2.4, (d) => {
      g(0, 1.8, 0, 0.14, 3.6, 0.14, 0x3a2f27, d); g(0.6, 3.1, 0, 1.2, 0.9, 0.06, variant ? 0x2e7bd6 : 0xc0392b, d); g(0.6, 3.1, 0.04, 0.5, 0.4, 0.04, GOLD, d); g(0, 0.2, 0, 1.0, 0.4, 1.0, STONE, d);
    }, variant);
    // 8 (295 deg): sacred flame bowl — amber or teal at night
    B(8, D.flame[0], top(...D.flame), D.flame[1], 'Sacred flame colour', 2.4, (d) => {
      g(0, 0.7, 0, 0.5, 1.4, 0.5, MARBLE2, d); g(0, 1.5, 0, 1.2, 0.3, 1.2, GOLD, d);
      U.flames.push(lamp(0, 2.0, 0, 0.8, 0.7, 0.8, 0xd9d6cc, variant ? 0x35e0c0 : 0xffa040, { parent: d, pickable: true }));
    }, variant);
    // 9 (330 deg): cypress grove — three trees or two
    B(9, D.cypress[0], top(...D.cypress), D.cypress[1], 'Cypress grove: three trees or two', 2.8, (d) => {
      for (const [x, z, h] of [[-1.2, 0.2, 3.8], [0, -0.6, 4.4], [1.3, 0.3, 3.5]].slice(0, variant ? 2 : 3)) cypress(d, x, 0, z, h);
    }, variant);

    // night-only differences: they exist all day; they simply look identical until dusk
    for (const i of [1, 4, 6, 8]) { const diff = U.diffs[i]; diff.nightOnly = true; diff.hintPhase = 0.86; diff.g.userData.motion = true; }

    U.localLights = [];
    for (const [x, y, z, color, power] of [[-10, 14, -2, 0xffe0a0, 90], [10.5, 9, 2, 0xffd9a0, 90], [-10, 4, 6.5, 0xffc27a, 55], [10.5, 4, 7, 0xffc27a, 55], [22, 4, 6.5, 0x9ad8ff, 40], [-17, 4, 8, 0xffc27a, 40]]) {
      const l = new PointLight(color, 0, 26, 1.5);
      l.position.set(x, y, z); l.userData.nightPower = power; ctx.world.add(l); U.localLights.push(l);
    }
  }

  // Daily story (300 s = one day): ships sail the bay, ripples drift, foam laps the quay, fountains throw spray, citizens and pilgrims
  // walk the plaza and the Mausoleum garden, gulls circle both monuments, smoke rises from the altar of Artemis; at dusk braziers,
  // columns, doors and lamps glow and the golden quadriga shines.
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
      const k = 0.5 + 0.5 * Math.sin(t * 1.6 - f.ph);
      f.m.position.z = COAST + 0.5 + 0.35 * k; f.m.scale.set(1.0, 0.06, 0.5 + 0.7 * k); f.m.material.opacity = 0.15 + 0.5 * (1 - k);
    }
    for (const d of u.drops || []) {
      const f = ((t * 0.9 + d.ph) % 1 + 1) % 1, uu = f * d.T * 1.2;
      d.m.position.set(d.cx + Math.cos(d.ang) * d.vr * uu, d.cy + d.vy * uu - 4.9 * uu * uu * 0.62, d.cz + Math.sin(d.ang) * d.vr * uu);
      d.m.material.opacity = 0.85 * (1 - f * 0.4);
    }
    for (const r of u.rings || []) {
      const fr = ((t * 0.42 + r.ph) % 1 + 1) % 1, s = 0.5 + fr * r.grow;
      r.g.scale.set(s, 1, s);
      for (const m of r.mats) m.material.opacity = (1 - fr) * 0.62 * (1 - 0.3 * nightF);
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
      b.g.position.set(b.cx + Math.cos(a) * b.r, b.y + Math.sin(t * 0.7 + b.ph) * 0.9, b.cz + Math.sin(a) * b.r);
      b.g.rotation.y = Math.atan2(-Math.sign(b.w) * Math.cos(a), -Math.sign(b.w) * Math.sin(a));
      for (const w of b.wings) w.p.rotation.x = w.s * Math.sin(t * 7 + b.ph) * 0.5;
    }
    for (const s of u.smoke || []) {
      const f = ((t * 0.12 + s.ph) % 1 + 1) % 1;
      s.m.position.set(T[0] + f * 1.5, G + 2.4 + f * 6, 7.0 + f * 1.0); s.m.scale.setScalar(0.4 + f * 1.3); s.m.material.opacity = (1 - f) * 0.4;
    }
    for (const f of u.flames || []) { const b = f.userData.sc || (f.userData.sc = [f.scale.x, f.scale.y, f.scale.z]); f.scale.set(b[0] * (1 + 0.08 * Math.sin(t * 9 + f.position.x)), b[1] * (1 + 0.18 * Math.sin(t * 7 + f.position.z)), b[2] * (1 + 0.08 * Math.sin(t * 8))); }
    for (const bm of u.beams || []) { bm.m.material.opacity = nightF * bm.alpha; bm.m.visible = nightF > 0.01; }
  }

  function updateLighting(world, phase, { glow = 0 } = {}) {
    const u = world.userData;
    for (const l of u.wallLights || []) l.m.material.color.set(l.day).lerp(new Color(l.night), glow);
    for (const l of u.localLights || []) l.intensity = glow * (l.userData.nightPower || 24);
  }

  return { build, animate, height, water: () => false, updateLighting };
}
