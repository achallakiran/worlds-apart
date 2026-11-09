/*
 * Peru — "Machu Picchu" (peru-machu-picchu). First scenery of Peru.
 * Stage package: world.js + stage.json + differences.json + music.mp3.
 *
 * An Inca citadel on a saddle between Huayna Picchu (the spire behind) and a green ridge, with a central lawn,
 * rows of roofless stone houses, farming terraces stepping down the front, a trail to the Sun Gate and cloud forest
 * below. The mountains take their colour from a traced reference photo (see tools/stages/extract_mountain.py):
 * every voxel of the landform is projected into the photo and reads its rock / moss class and tone.
 * The ten differences are spread around the citadel (every ~36 degrees); four are lights that look the same by day.
 */
/*MTNDATA*/const MTN = {X0:60,Y0:10,STEP:4,rows:[
'...............................................................................................',
'...............................................................................................',
'.......................................................u.......................................',
'.....................................................trrrs.....................................',
'...................................................ubbabqqr....................................',
'..................................................urbbbbbars...................................',
'.................................................vbqqbbbbaar...................................',
'................................................sbaqqrrrrqabs..................................',
'...............................................ebaaqqqqrqqqrqs.................................',
'...............................................aaaqqqqabqqqqqru................................',
'..............................................baaqqqqbbaaqqqqrrt...............................',
'..............................................aaaqqqqaaaaqqqqqrrs..............................',
'.............................................caaaqqqraaabqqqqqqrrsu............................',
'............................................caaaaqqaaaabbaqaaaaaabc............................',
'............................................baaaaqaaaabaaaaaaaaaabbc...........................',
'...........................................taaaaaqaaaabaaaaaaaaaaabad..........................',
'...........................................baaaaaqaaabaaaaaaaaaaaabbc..........................',
'..........................................caaaaarrbaabbaaaaaaaaaaaabbd.........................',
'..........................................aaaaabrbaaaaaaabaaabaaaaabbce........................',
'.........................................caaaaabrbbaaababbaaaaaaaaabccc........................',
'.........................................baaaabbrbaabaaaabaaaaabaaabccc........................',
'....................f...................caaaaabrbrabbaaaabaaaabaaabbccb........................',
'..................eccd.................daaaaabrrbqqbbbaaaaaaaaaaaaaaabbe.......................',
'.................eccccde...............caababrrrqrrbbaaaaaabbaaaaaaaabbd.......................',
'................eccbcdcd.............ywbaqaabsrrqrrbbaaaabaabaaabaaaaabc.......................',
'...............fdccccccdf...........heedcqabcrqqrrrqabbaabaabaabaaaaabbc.......................',
'..............fddccccbcccw.....h...fededecabbqqqrbrrabbbaaaaabaaaaaaaaab.......................',
'..............ddddccccbcbrv...iefheddeedeecbbqqqqbrrbbbbabaaaaaaaaaaaaab.......................',
'.............fcdecdedcddrqsi.jfeeeddddddeeecaaaaabcbbbbbbbaaaaaaaaaaaaabu......................',
'.............eddddeedcdsrbbdgfeedededddddeddaaaaaccbcbcccbbaaabaaaaaaaaad......................',
'............hddtcdedddssscccffffdddddddddeeebrqqrccbccbcbbbbaaaaaqaaaababg.....................',
'............eddtcceeettttttttfhjfeedcddcceeeusrrsddrcccccbccaaaaaqaaaabaad.....................',
'............eedscddedtsssddtteefhdedddedddedvvtssddrbcccbbabaaaaaqaaaabaac.....................',
'............dcceffhhdttttddestueecddeeefffefutedefecbbdcbaaaaaaaqqaaaabbace....................',
'...........fdceijfjjhttttetuuuegihhfeefeehgfeefeefecbbcbbaaaaaaaqqaaaaabacb....................',
'..........jecdfghijjjgstuuuudcdfihgfgihiijjihhgedfeecbccbaaaaaaaqqaaaabbabbi...................',
'...........dcfgggghghheuvvcccggiiighihhijhfhihhhhhhhgfedcaaaaaaaqqaaaabbbbbd...................',
'..........fdffghhhiihhiddeefijjjjjjjiiiiiigfhjfghhhhhhhihddedbaqqqaaaabbbbbc...................',
'..........eeeffhghhgiiiihijiizjjiiiiiihihxyhghigfhhhghghiihgggebqqabaccbbbbbv..................',
'.........jedfeeiggjiiijjjjjiijjjjjjjjihfhxfhhghigfhhhghghhjhgggebaaaaccbbbcbc..................',
'........jheeeehifgjjigjjijzziijjjzzzzzjiijhigfiiidfgghgggfiihgggffcbaababbbbbhj................',
'........gdeeedhgghhgiihiigxxyzjjzzzzzzzzjigyyehiigggghhhiiijihhhhhgcaababbcbbci................',
'.......iddeefhgigfggjjihiixuwzzzzzzzzzzzihhfffhihhjhhijjjjigjijggihgcbbaabbbbbd................',
'.....ifcdddeefijihggjjjiiidcfjjzzzzzzzzzjfhhedegfgijhfgffghehhiffiihghgedddcbbb................',
'...ifcccdcbddehjjjijjjhiiitsyjjjzzzzyzzzzzjihefiixhjgeggghhhghiifhhghiifffgdbrrty..............',
'.hfccdcddeeddeeghfhiiiiijgvuwzzzzzzjiiiiiyjjhhhhhggjihhhiiiiiijiffiijifeghjecbrrs..............',
'ebabcdddeeddeefefdeiijjjjjhffizzzzzzjzzzzzzjijiiihhihdfghhgfhhhiihjjjhgegihfeccrqu.............',
'bbbbbbbccdeefeeedefghiigehjjhizzzzzzzzzzzjjjihhihhgggddhhhhghiffgfghggeggefhgedbqr.............',
'ccccbbccdeefffdedeffgjheefjjjjzzzzzzzzzzzzyyyhiiiihghhegghiifgfdeghifgggfffffghecqrsf..........',
'aabbccccceeedddeffffghfdehijjjjzzzzzzjjzzzzzzzyyyyyyiiddgfefhgeffefeffdegffhfhgddcbasvx........',
'acccccccdeedccegfffgffddeghjhhjjjjjjzijjjzzzjzzzzzzzzjiddgggijhgfedhefffgfghfigecdccstdc.......',
'bbbccdeddefddddfffggddeffggfedeedegiiihghhizjzzzzzzzzzjhdgjjxwvvfggihghiigfhghgfcbbbbccdg......',
'bbbcdddcccccdefeefggeccefgfffeedefgfgjihhigjjjzzzzzzzzyjhdfestssttihdegihgggfffeccaabdfi.......',
'abcccccdddddfefffeeeddedfgfffdeedefgijjiijhhggjjjjjzyyyzjgffefghhfhgddeijjihggfecbbdfhjji......',
'bbbbaabbccdfedffeeedddfggfeeedcdfdfeigghihhihfihjiiiiiiijjjjjigghfffdfffhigefedcbdfghjjji......',
'abbbaaabbcbdedeffeeeeeeggfecbddcefdgihfgihhhjjhgihhjzhhhhhhhhhgfigihfggfdcdcbbaceghijjjii......',
'aabaaaaabcccdddeeeedeffffffeddeccefhhhfgjigghhhgijijzzzzzzyyyyxffjihfeefccbaaadgijiiihhii......',
'abbaababcbbcddedccdedefedfghddeeddgghfchjjggijjjjjjijzzzzzzzzysxddgfddedbbaadfhiijiihhiii......'
]};/*ENDMTNDATA*/
function createStage(E) {
  const { Mesh, BasicMaterial, PointLight, Color, hash } = E;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const smooth = (a, b, v) => { const t = clamp((v - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };
  const PL = 6.5;                                         // citadel plateau height
  const PEAKS = [                                         // Huayna Picchu, the green ridge on the left, the back ridge
    { cx: 6, cz: -17, rx: 9.5, rz: 8.0, top: 38, ax: 280, ay: 20, sh: 6.4, sv: 5.0, sd: 4.0 },
    { cx: -22, cz: -8, rx: 7.5, rz: 7.5, top: 22, ax: 127, ay: 98, sh: 5.2, sv: 4.4, sd: 3.4 },
    { cx: -8, cz: -22, rx: 7, rz: 6, top: 15, ax: 127, ay: 98, sh: 4.4, sv: 4.0, sd: 3.0 },
  ];
  const P = (deg, r) => [r * Math.cos(deg * Math.PI / 180), r * Math.sin(deg * Math.PI / 180)];

  // ---------- terrain ----------
  function cone(x, z, p) {
    const dx = x - p.cx, dz = z - p.cz, a = Math.atan2(dz, dx);
    const d = Math.sqrt((dx / p.rx) ** 2 + (dz / p.rz) ** 2) * (1 + 0.07 * Math.sin(a * 3 + p.cx) + 0.05 * Math.sin(a * 7 + p.cz * 2));
    if (d > 1.3) return 0;
    const base = 3, span = p.top - base;
    if (d < 1) return base + span * (1 - 0.62 * (1 - Math.sqrt(1 - d)));    // a spire that widens fast, then near-vertical cliffs
    return base + span * 0.38 * (1 - smooth(1, 1.3, d));
  }
  function base(x, z) {
    const ground = 2.2 + 0.5 * Math.sin(x * 0.35) * Math.cos(z * 0.3);
    const e = ((x + 1) / 19) ** 2 + ((z - 4.5) / 12) ** 2;
    let h = ground + (PL - 2.2) * (1 - smooth(0.5, 1.4, e));
    for (const p of PEAKS) h = Math.max(h, cone(x, z, p));
    return h;
  }
  let PADS = null; // computed lazily: the bundle's hash helper is not initialised when the factory runs
  function pads() {
    return PADS || (PADS = [[17, 0, 2.4], [4.6, 14.3, 2.4], [-5.3, 16.2, 2.4], [-16, 11.8, 2.2], [-16, 0, 2.4], [-11, -8, 2.0], [-8, -16.5, 2.4], [14, -10, 1.8]].map(([x, z, r]) => [x, z, r, Math.floor(base(x, z) * 2) / 2]));
  }
  function height(x, z) {
    let h = base(x, z);
    for (const [px, pz, pr, lv] of pads()) {
      const d = Math.hypot(x - px, z - pz);
      if (d < pr) return lv;
      if (d < pr + 1.2) { const t = smooth(pr, pr + 1.2, d); h = lv * (1 - t) + h * t; }
    }
    return Math.floor(h * 2) / 2;
  }
  const dominant = (x, z) => { let best = null, bh = 4.5; for (const p of PEAKS) { const c = cone(x, z, p); if (c > bh) { bh = c; best = p; } } return best; };

  const FOREST = [0x2f6f3a, 0x3a7d44, 0x2a5f35, 0x438a4c, 0x357a40];
  const GRASS = [0x78b84a, 0x86c456, 0x6fae44];
  const TERR = [0x7fb64a, 0x8bc050, 0x74aa42];
  const RISER = [0x8c887c, 0x7f7b70, 0x97937f];
  const SOIL = [0x7b6a52, 0x6e5f49, 0x85755b];
  const WALL = [0x9a968a, 0x8f8b80, 0xa5a094, 0x858175];
  const THATCH = 0x9b7b4a;
  const pick3 = (arr, a, b) => arr[Math.floor(hash(a, b) * arr.length)];
  const mix = (a, b, t) => { const r = (a >> 16 & 255) + ((b >> 16 & 255) - (a >> 16 & 255)) * t, g = (a >> 8 & 255) + ((b >> 8 & 255) - (a >> 8 & 255)) * t, bl = (a & 255) + ((b & 255) - (a & 255)) * t; return (r | 0) << 16 | (g | 0) << 8 | (bl | 0); };
  // photo lookup for a voxel of a peak (the photo shows the default camera's view)
  function photoClass(x, y, z, p) {
    const dx = x - p.cx, dz = z - p.cz;
    const sx = p.ax + p.sh * (0.82 * dx - 0.57 * dz), sy = p.ay + p.sv * (p.top - y) + p.sd * (0.57 * dx + 0.82 * dz);
    if (sy > 175) return null;
    const row = MTN.rows[Math.floor((sy - MTN.Y0) / MTN.STEP)];
    const ch = row && row[Math.floor((sx - MTN.X0) / MTN.STEP)];
    return ch && ch !== '.' ? ch : null;
  }
  function peakColor(x, y, z, p, jit) {
    const ch = photoClass(x, y, z, p);
    if (!ch) return y > 20 ? 0x4f7a3c : pick3(FOREST, x, z);
    const code = ch.charCodeAt(0);
    const moss = code >= 113 || (y < 31 && hash(x * 3 + y, z) > 0.55);
    const t = (code >= 113 ? code - 113 : code - 97) / 9;
    const c = moss ? mix(0x2c5530, 0x86b85a, Math.min(1, t + 0.15)) : mix(0x4a4232, 0xa89d86, t);
    return mix(c, 0xffffff, jit * 0.05);
  }

  // differences, one every ~36 degrees around the citadel
  const D = {
    crops: [17, 0], torch: [17, 12], llama: [4.6, 14.3], hut: [-5.3, 16.2], lantern: [-16, 11.8],
    hikers: [-16, 0], tower: [-12, -9], alpaca: [-8, -16.5], summit: [6, -17], bridge: [14, -10],
  };

  function build(ctx, variant) {
    const { box: g, group: o, makeDiff: B, walker, path, world, cube } = ctx;
    const U = world.userData;
    U.wallLights = []; U.beams = []; U.mist = []; U.condors = []; U.llamas = []; U.flames = [];
    const pick = (arr, a, b) => arr[Math.floor(hash(a, b) * arr.length)];
    const motion = (grp) => { grp.userData.motion = true; return grp; };

    function lamp(x, y, z, sx, sy, sz, dayColor, nightColor, opts = {}) {
      const m = new Mesh(cube, new BasicMaterial(opts.alpha !== undefined ? { color: dayColor, transparent: true, opacity: opts.alpha, depthWrite: false } : { color: dayColor }));
      m.position.set(x, y, z); m.scale.set(sx, sy, sz);
      m.userData.ownedMaterial = true; m.userData.motion = true;
      if (!opts.pickable) m.raycast = () => {};
      (opts.parent || world).add(m);
      U.wallLights.push({ m, day: dayColor, night: nightColor });
      return m;
    }

    // ---------- terrain: mountains from the photo, stepped farming terraces, plateau, cloud-forest slopes ----------
    const cols = new Map(), key = (x, z) => x + ',' + z;
    for (let x = -29; x <= 29; x++) for (let z = -25; z <= 25; z++) {
      if ((x / 30.5) ** 4 + (z / 26.5) ** 4 > 1.18 + hash(x, z) * 0.06) continue;
      cols.set(key(x, z), height(x, z));
    }
    for (const [k, h] of cols) {
      const [x, z] = k.split(',').map(Number);
      const bottom = -2.4 - hash(x, z) * 0.7, pk = dominant(x, z);
      const onPlateau = h <= PL + 0.01 && h >= PL - 0.01 && ((x + 1) / 19) ** 2 + ((z - 4.5) / 12) ** 2 < 0.55;
      const lawn = onPlateau && x >= 0 && x <= 9 && z >= -1 && z <= 8;
      if (pk && h > 4.6) {
        // landform: coloured slices from the photo; hidden interior is a single block
        let low = h;
        for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const n = cols.get(key(x + dx, z + dz)); low = Math.min(low, n === undefined ? bottom : n); }
        const cut = Math.max(bottom, low - 0.02);
        if (cut > bottom) g(x, (bottom + cut) / 2, z, 1.025, cut - bottom, 1.025, 0x5a5348);
        for (let y0 = cut; y0 < h - 0.01; y0 += 1.5) {
          const y1 = Math.min(h, y0 + 1.5);
          g(x, (y0 + y1) / 2, z, 1.025, y1 - y0 + 0.01, 1.025, peakColor(x, (y0 + y1) / 2, z, pk, hash(x + y0, z)));
        }
        g(x, h - 0.06, z, 1.03, 0.14, 1.03, peakColor(x, h, z, pk, hash(x, z + 3)));
      } else {
        const terr = h > 2.6 && !onPlateau;
        g(x, (bottom + h) / 2 - 0.1, z, 1.025, h - bottom - 0.2, 1.025, terr ? pick(RISER, x, z) : pick(SOIL, x, z));
        let top = lawn ? pick([0x93d24f, 0x8ccb4a, 0x9bd957], x, z) : onPlateau ? pick([0x7fb64a, 0x86be4f, 0xa39e8a], x, z) : terr ? pick(TERR, x, z) : pick(FOREST, x, z);
        g(x, h - 0.08, z, 1.03, 0.2, 1.03, top);
      }
    }

    // ---------- cloud forest on the lower slopes ----------
    for (let x = -28; x <= 28; x += 1.7) for (let z = -22; z <= 24; z += 1.7) {
      const px = x + hash(x, z) * 1.2, pz = z + hash(z, x) * 1.2, h = height(px, pz);
      const e = ((px + 1) / 17) ** 2 + ((pz - 4) / 11) ** 2;
      if (h < 1.6 || h > 6.2 || e < 1.35 || hash(x + 5, z + 2) < 0.62 || dominant(px, pz)) continue;
      if (D && Object.values(D).some(([kx, kz]) => Math.hypot(px - kx, pz - kz) < 3)) continue;
      g(px, h + 0.6, pz, 0.28, 1.2, 0.28, 0x6b4a33);
      g(px, h + 1.6, pz, 1.7, 1.2, 1.7, pick(FOREST, px, pz));
      g(px + 0.1, h + 2.45, pz, 1.1, 0.8, 1.1, 0x2a5f35);
    }

    // ---------- citadel: lawn, sacred rock, roofless stone houses, temple arc ----------
    const house = (cx, cz, w, d, hgt, roof, tag) => {
      const y = height(cx, cz), c = pick(WALL, cx, cz), t = 0.34;
      g(cx, y + hgt / 2, cz - d / 2, w, hgt, t, c); g(cx, y + hgt / 2, cz + d / 2, w * 0.36, hgt, t, c); g(cx + w * 0.36, y + hgt / 2, cz + d / 2, w * 0.28, hgt * 0.45, t, c);
      g(cx + w * 0.32, y + hgt / 2, cz + d / 2, w * 0.36, hgt, t, c);
      g(cx - w / 2, y + hgt / 2, cz, t, hgt, d, c); g(cx + w / 2, y + hgt / 2, cz, t, hgt, d, c);
      if (roof) { g(cx, y + hgt + 0.25, cz, w + 0.5, 0.35, d + 0.5, THATCH); g(cx, y + hgt + 0.6, cz, w - 0.2, 0.35, d - 0.2, 0x8a6b3d); g(cx, y + hgt + 0.9, cz, w - 1.0, 0.3, d - 0.9, 0x7a5c32); }
      else { g(cx, y + hgt + 0.45, cz - d / 2, w - 0.8, 0.9, t, c); g(cx, y + hgt + 0.9, cz - d / 2, w - 1.8, 0.7, t, c); }
      if (!roof) lamp(cx, y + 0.12, cz, w - 0.9, 0.08, d - 0.9, 0x6f6c62, hash(cx + 1, cz) > 0.5 ? 0xffa83a : 0xffcf6a);   // hearth glow on the floor (seen from above)
      lamp(cx + w * 0.36, y + hgt * 0.4, cz + d / 2 + 0.2, w * 0.3, hgt * 0.7, 0.1, 0x2a2a28, 0xffc468);                        // lit doorway (front face)
      lamp(cx + w / 2 + 0.2, y + hgt * 0.62, cz, 0.1, 0.6, 0.55, 0x2a2a28, hash(cx, cz + 4) > 0.5 ? 0xffb85a : 0xffd98a);       // lit window (side face)
    };
    const ROWS = [];
    for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) ROWS.push([-14 + c * 3.4 + (r % 2) * 0.6, -1.5 + r * 3.4, 2.6, 2.3, 1.5 + hash(c, r) * 0.5, hash(c + 3, r) > 0.78]);
    for (let r = 0; r < 3; r++) for (let c = 0; c < 2; c++) ROWS.push([11.6 + c * 3.2, 0 + r * 3.6, 2.5, 2.2, 1.5 + hash(r, c) * 0.4, hash(r + 9, c) > 0.8]);
    for (let c = 0; c < 3; c++) ROWS.push([1.5 + c * 3.4, -2.8, 3.0, 2.4, 2.0, false]);
    for (const [cx, cz, w, d, hh, rf] of ROWS) house(cx, cz, w, d, hh, rf);
    // sacred rock and the temple arc
    g(10.6, PL + 0.5, 8.6, 1.8, 1.0, 1.2, 0x8d897d); g(10.6, PL + 1.1, 8.6, 1.1, 0.5, 0.8, 0x9c988b);
    for (let k = 0; k < 9; k++) { const a = -0.6 + k * 0.22; g(14.6 + 3.4 * Math.cos(a), PL + 0.8, -4.4 + 3.4 * Math.sin(a) * 0.8, 0.5, 1.6, 0.5, pick(WALL, k, 3)); }
    // trail: lawn to the Sun Gate and to the left terraces
    path(8, 8, 17, 12, 1.2); path(0, 9, -16, 11.8, 1.2); path(-3, 4, -16, 0, 1.0);
    // lantern posts along the trails, braziers at the lawn corners (all glow at night)
    for (const [x1, z1, x2, z2] of [[8, 8, 17, 12], [0, 9, -16, 11.8], [-3, 4, -16, 0]]) {
      const n = Math.floor(Math.hypot(x2 - x1, z2 - z1) / 2.6);
      for (let k = 1; k < n; k++) {
        const x = x1 + (x2 - x1) * k / n + 0.9, z = z1 + (z2 - z1) * k / n - 0.9;
        if (Object.values(D).some(([kx, kz]) => Math.hypot(x - kx, z - kz) < 2.8)) continue;
        const y = height(x, z); g(x, y + 0.5, z, 0.1, 1.0, 0.1, 0x3a2f27); lamp(x, y + 1.15, z, 0.26, 0.3, 0.26, 0xe8dcb8, 0xffd27a);
      }
    }
    for (const [x, z] of [[0, -1], [9, -1], [0, 8], [9, 8]]) {
      const y = height(x, z); g(x, y + 0.4, z, 0.7, 0.8, 0.7, 0x6b6a60); lamp(x, y + 0.95, z, 0.5, 0.35, 0.5, 0xc9803a, 0xff9a3a);
      U.beams.push({ m: lamp(x, y + 1.3, z, 1.5, 1.6, 1.5, 0xffb060, 0xffb060, { alpha: 0 }), alpha: 0.2 });
    }
    // summit glow: a soft column above Huayna Picchu
    U.beams.push({ m: lamp(PEAKS[0].cx, PEAKS[0].top + 9, PEAKS[0].cz, 0.8, 16, 0.8, 0xfff4c0, 0xfff4c0, { alpha: 0 }), alpha: 0.28 });
    // Sun Gate: two pillars and a lintel
    {
      const gy = height(17, 12.4);
      for (const s of [-1, 1]) g(17 + s * 1.3, gy + 1.2, 12.4, 0.7, 2.4, 0.7, 0x8f8b80);
      g(17, gy + 2.55, 12.4, 3.4, 0.5, 0.8, 0x9a968a);
    }
    // terrace steps: stone walls drawn on the front slope edge
    for (let k = 0; k < 18; k++) { const a = 0.15 + k * 0.17, x = -1 + 18.4 * Math.cos(a), z = 4 + 12 * Math.sin(a); if (z > 11) g(x, height(x, z) + 0.3, z, 1.1, 0.5, 0.4, 0x8d897d); }

    // ---------- mist in the valley, condors, llamas on the lawn, hikers ----------
    for (let i = 0; i < 6; i++) {
      const cloud = motion(o(0, 0, 0));
      for (let k = 0; k < 5; k++) lamp((k - 2) * 1.7, (hash(i, k) - 0.5) * 0.5, (hash(k, i) - 0.5) * 1.6, 2.2 + hash(i + k, 3) * 1.4, 0.7 + hash(k, 5) * 0.4, 1.6 + hash(k, 9) * 0.8, 0xffffff, 0x4a5878, { alpha: 0.38, parent: cloud });
      U.mist.push({ g: cloud, r: 14 + (i % 4) * 2.6, a0: i * 0.7, w: (i % 2 ? 1 : -1) * (0.011 + 0.004 * (i % 3)), y: 8 + (i % 5) * 2.2 });
    }
    for (let k = 0; k < 2; k++) {
      const bird = motion(o(0, 0, 0));
      g(0, 0, 0, 1.0, 0.3, 0.4, 0x2a2d33, bird); g(0.6, 0.1, 0, 0.35, 0.3, 0.3, 0xf2f0ea, bird); g(0.85, 0.08, 0, 0.18, 0.12, 0.14, 0xe0b840, bird);
      const wings = [-1, 1].map((s) => { const p = motion(o(0, 0.1, s * 0.2)); bird.add(p); g(0, 0.05, s * 0.8, 0.7, 0.07, 1.6, 0x2a2d33, p); g(0.1, 0.07, s * 1.5, 0.4, 0.07, 0.7, 0xf2f0ea, p); return { p, s }; });
      U.condors.push({ g: bird, wings, r: 15 + k * 4, w: (k ? -1 : 1) * (0.22 + 0.04 * k), y: 44 + k * 3, ph: k * 2.4 });
    }
    const llama = (parent, x, z, c, scale = 1) => {
      const l = motion(o(x, 0, z)); if (parent) parent.add(l);
      g(0, 0.55 * scale, 0, 0.9 * scale, 0.5 * scale, 0.4 * scale, c, l); g(0.55 * scale, 0.95 * scale, 0, 0.2 * scale, 0.7 * scale, 0.2 * scale, c, l);
      g(0.65 * scale, 1.35 * scale, 0, 0.35 * scale, 0.28 * scale, 0.25 * scale, c, l); g(0.7 * scale, 1.5 * scale, 0, 0.1 * scale, 0.2 * scale, 0.08 * scale, c, l);
      for (const [lx, lz] of [[-0.3, -0.12], [-0.3, 0.12], [0.3, -0.12], [0.3, 0.12]]) g(lx * scale, 0.15 * scale, lz * scale, 0.12 * scale, 0.35 * scale, 0.1 * scale, 0x6b5a45, l);
      return l;
    };
    for (let k = 0; k < 4; k++) {
      const l = llama(null, 0, 0, [0xf2ece0, 0xc9a77c, 0x7a5a3a, 0xf2ece0][k]);
      U.llamas.push({ g: l, x0: 1.5 + k * 1.9, z0: 1.5 + (k % 2) * 3, r: 1.2 + 0.2 * k, w: 0.12 + 0.02 * k, ph: k * 1.7 });
    }
    walker(-3, 9.6, 8, 9.6, 0xd9a441, 1); walker(2, -0.4, -2, 7.6, 0x2f6f8f, 2); walker(12, 4, 12, 9.5, 0xc0392b, 3); walker(-10, 11.4, -4, 11.4, 0x2e9b4a, 4);

    // ================= DIFFERENCES (every ~36 degrees around the citadel) =================
    // 0 (0 deg): terrace crops — green or golden
    B(0, D.crops[0], 0.3, D.crops[1], 'Terrace crops: green or golden', 2.6, (d) => {
      const c = variant ? 0xe3b93c : 0x4fa83d, c2 = variant ? 0xcf9f2a : 0x3f9033;
      for (let r = 0; r < 4; r++) for (let k = 0; k < 6; k++) g(-1.5 + k * 0.6, 0.35, -1.2 + r * 0.8, 0.4, 0.5 + hash(k, r) * 0.2, 0.4, (k + r) % 2 ? c : c2, d);
    }, variant);

    // 1 (36 deg): Sun Gate torches — same flame by day, orange or violet at night
    B(1, D.torch[0], height(17, 12.4) + 0.2, 12.4 + 0.0, 'Sun Gate torch colour', 2.4, (d) => {
      for (const s of [-1, 1]) { g(s * 1.9, 0.6, 0, 0.1, 1.2, 0.1, 0x3a2f27, d); lamp(s * 1.9, 1.35, 0, 0.34, 0.4, 0.34, 0xe8a43a, variant ? 0xb06bff : 0xff8a2a, { parent: d, pickable: true }); }
    }, variant);

    // 2 (72 deg): llama on the front terrace — present or absent
    B(2, D.llama[0], 0.3, D.llama[1], 'Llama on the front terrace', 2.2, (d) => {
      g(0, 0.3, 0, 2.8, 0.15, 2.0, 0x86c456, d);
      if (!variant) llama(d, 0, 0, 0xf2ece0, 1.15);
      else g(0.9, 0.2, 0.6, 0.4, 0.3, 0.4, 0x6b5a45, d);
    }, variant);

    // 3 (108 deg): hut roof — thatched or open
    B(3, D.hut[0], 0.3, D.hut[1], 'Hut roof: thatched or open', 2.6, (d) => {
      g(0, 0.9, -0.9, 2.6, 1.8, 0.3, 0x9a968a, d); g(-1.15, 0.9, 0, 0.3, 1.8, 1.8, 0x8f8b80, d); g(1.15, 0.9, 0, 0.3, 1.8, 1.8, 0xa5a094, d); g(0, 0.5, 0.9, 2.6, 1.0, 0.3, 0x858175, d);
      if (!variant) { g(0, 2.0, 0, 3.2, 0.35, 2.6, THATCH, d); g(0, 2.35, 0, 2.6, 0.35, 2.0, 0x8a6b3d, d); g(0, 2.7, 0, 1.4, 0.3, 1.2, 0x7a5c32, d); }
      else for (const s of [-1, 1]) g(s * 1.15, 2.0, 0, 0.3, 0.4, 0.4, 0x6b4a33, d);
    }, variant);

    // 4 (144 deg): trail lanterns — warm white or teal at night
    B(4, D.lantern[0], 0.3, D.lantern[1], 'Trail lantern colour', 2.4, (d) => {
      for (const k of [-1, 0, 1]) {
        g(k * 1.1, 0.7, -0.4 * k, 0.12, 1.4, 0.12, 0x3a2f27, d);
        lamp(k * 1.1, 1.55, -0.4 * k, 0.4, 0.4, 0.4, 0xe8dcb8, variant ? 0x5ff0d8 : 0xffd27a, { parent: d, pickable: true });
      }
    }, variant);

    // 5 (180 deg): hikers on the trail — three or two
    B(5, D.hikers[0], 0.3, D.hikers[1], 'Hikers on the trail: three or two', 3.0, (d) => {
      const cs = [0xd33b3b, 0x2358c9, 0xe0b030];
      for (const [i, x, z] of [[0, -1.2, 0.2], [1, 0.2, -0.5], [2, 1.5, 0.4]].slice(0, variant ? 2 : 3)) {
        g(x, 0.45, z, 0.28, 0.9, 0.22, cs[i], d); g(x, 1.08, z, 0.26, 0.26, 0.26, 0xe8c9a0, d); g(x - 0.04, 1.28, z, 0.32, 0.12, 0.32, 0x3a2f27, d); g(x, 0.6, z - 0.22, 0.3, 0.5, 0.18, 0x4a5a3a, d);
      }
    }, variant);

    // 6 (~222 deg): watchtower window — amber or green at night
    B(6, D.tower[0], 0.3, D.tower[1], 'Watchtower window colour', 3.0, (d) => {
      g(0, 1.4, 0, 1.8, 2.8, 1.8, 0x8f8b80, d); g(0, 2.95, 0, 2.1, 0.3, 2.1, 0x7f7b70, d); g(0, 3.3, 0, 1.2, 0.5, 1.2, THATCH, d);
      lamp(0, 1.8, 0.92, 0.6, 0.7, 0.1, 0x2a2a28, variant ? 0x6bff8a : 0xffb23a, { parent: d, pickable: true });
    }, variant);

    // 7 (~245 deg): alpacas on the back ridge — four or two
    B(7, D.alpaca[0], 0.3, D.alpaca[1], 'Alpaca herd: four or two', 3.4, (d) => {
      g(0, 0.3, 0, 4.4, 0.15, 3.0, 0x86c456, d);
      for (const [x, z, c] of [[-1.4, 0.2, 0xf2ece0], [0.2, -0.8, 0x7a5a3a], [1.3, 0.6, 0xc9a77c], [-0.3, 1.0, 0xf2ece0]].slice(0, variant ? 2 : 4)) llama(d, x, z, c, 0.8);
    }, variant);

    // 8 (292 deg): Huayna Picchu beacon — red or white at night
    B(8, D.summit[0], PEAKS[0].top + 0.1, D.summit[1], 'Summit beacon light colour', 1.8, (d) => {
      g(0, 0.9, 0, 0.16, 1.8, 0.16, 0x3a3f46, d);
      U.flames.push(lamp(0, 1.95, 0, 0.5, 0.5, 0.5, 0xd9d6cc, variant ? 0xf2f6ff : 0xff4040, { parent: d, pickable: true }));
    }, variant);

    // 9 (327 deg): rope bridge in the cloud forest — present or absent
    B(9, D.bridge[0], 0.3, D.bridge[1], 'Forest rope bridge: present or absent', 3.0, (d) => {
      if (variant) { for (const s of [-1, 1]) g(s * 2.2, 0.5, 0, 0.3, 1.0, 0.3, 0x6b4a33, d); return; }
      for (let k = 0; k < 8; k++) g(-1.8 + k * 0.5, 0.9 - 0.12 * Math.sin(k / 7 * Math.PI) * -1, 0, 0.4, 0.1, 1.0, 0x8a6b3d, d);
      for (const s of [-1, 1]) { g(s * 2.2, 0.8, 0, 0.3, 1.6, 0.3, 0x6b4a33, d); for (const z of [-0.5, 0.5]) g(0, 1.6, z, 4.4, 0.06, 0.06, 0x7a6a4a, d); }
    }, variant);

    // night-only differences: they exist all day; they simply look identical until dusk
    for (const i of [1, 4, 6, 8]) { const diff = U.diffs[i]; diff.nightOnly = true; diff.hintPhase = 0.86; diff.g.userData.motion = true; }

    U.localLights = [];
    for (const [x, y, z, color, power] of [[4, 10, 3, 0xffd9a0, 90], [-9, 9, 3, 0xffc27a, 70], [13, 9, 5, 0xffc27a, 60], [4, 8, 12, 0xffc27a, 55], [-12, 8, 11, 0xffd9a0, 45], [6, 30, -17, 0xfff0c0, 36]]) {
      const l = new PointLight(color, 0, 24, 1.5);
      l.position.set(x, y, z); l.userData.nightPower = power; world.add(l); U.localLights.push(l);
    }
  }

  // Daily story (300 s = one day): mist drifts through the valley, condors circle Huayna Picchu, llamas graze on the lawn,
  // tourists walk the terraces; after dusk the windows, torches and lanterns glow and the summit beacon shines.
  function animate(world, time, reduced = false) {
    const u = world.userData;
    const phase = (((time / 300) % 1) + 1) % 1;
    const day = phase > 0.24 && phase < 0.8;
    for (const m of u.mist || []) {
      const a = m.a0 + time * m.w;
      m.g.position.set(Math.cos(a) * m.r, m.y + Math.sin(time * 0.2 + m.a0) * 0.35, Math.sin(a) * m.r - 3);
    }
    for (const b of u.condors || []) {
      b.g.visible = day;
      const a = time * b.w + b.ph;
      b.g.position.set(PEAKS[0].cx + Math.cos(a) * b.r, b.y + Math.sin(time * 0.5 + b.ph) * 1.2, PEAKS[0].cz + Math.sin(a) * b.r);
      b.g.rotation.y = Math.atan2(-Math.sign(b.w) * Math.cos(a), -Math.sign(b.w) * Math.sin(a));
      for (const w of b.wings) w.p.rotation.x = w.s * Math.sin(time * (reduced ? 0.8 : 1.6) + b.ph) * 0.18;
    }
    for (const l of u.llamas || []) {
      const a = time * l.w + l.ph, x = l.x0 + Math.cos(a) * l.r, z = l.z0 + Math.sin(a) * l.r;
      l.g.position.set(x, height(x, z) + 0.0, z);
      l.g.rotation.y = Math.atan2(-Math.cos(a), -Math.sin(a)) + Math.PI / 2;
    }
    const nightF = phase >= 0.5 ? smooth(0.74, 0.84, phase) : 1 - smooth(0.2, 0.27, phase);
    for (const bm of u.beams || []) { bm.m.material.opacity = nightF * bm.alpha; bm.m.visible = nightF > 0.01; }
  }

  function updateLighting(world, { glow = 0 } = {}) {
    const u = world.userData;
    for (const l of u.wallLights || []) l.m.material.color.set(l.day).lerp(new Color(l.night), glow);
    for (const l of u.localLights || []) l.intensity = glow * (l.userData.nightPower || 24);
  }

  return { build, animate, height, water: () => false, updateLighting };
}
