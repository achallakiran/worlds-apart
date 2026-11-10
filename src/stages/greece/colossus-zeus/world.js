const COL_T = {trim:6,cols:26,rows:48,pal:[0xe0d3aa,0xc1a773,0xa3875d,0x917447,0x806134,0x6c5938,0x5f4b28,0x58421e,0x593a16,0x4e3d1c,0x453a1d,0x52310e,0x423016,0x3a240d],g:[
'..........................',
'......cilm................',
'......ennnf...............',
'......ginjcjn.............',
'....kf....ggmj............',
'..jkf.....dfhh............',
'..hhf.....dlmh............',
'..dihg....bejk............',
'...iligm..aejf............',
'...cillknmhinn............',
'....ciiimnnlnnkkk.........',
'......febemjmhgjmj........',
'.......cabgjkhhnnj........',
'.......babggjjh..jk.......',
'........baeghhk.mmj.......',
'........bagjjhj..nj.......',
'........aaejhhj..nnk......',
'........aaehhgjk.kjj......',
'....dcf.aaehhelmnhjh......',
'.aaca...bbdhlnnnnjjj......',
'aaa....bbegijjmn.jjg......',
'.......aadgimjjn.hhj......',
'.......acgilmjkmdhhj......',
'......aadilijmjmkhhjc.....',
'......abeghinnijnhhjd..a..',
'......belnnn.nilnigkg.....',
'......clnnnn.nnlmfgjf.....',
'......dlnnmmfknlnmjjh.....',
'......ellgdf..jlnnfih.....',
'......ell.....gnnmfih.....',
'......dlm......mlnfih.....',
'......dlh......knnfhh.....',
'......eld.......nlffh.....',
'.....agl.........lmgh.....',
'.....bil.........lnkl.....',
'.....cll.........llmjf....',
'.....eli.........mllgh....',
'.....gif..........llgk....',
'.....ii...........jlk...a.',
'.....ih............ih...a.',
'.....i.............hg...a.',
'.....i........baabadgabcaa',
'....dh....fb.mmcccabfbgfdd',
'gkjhjjmgfddccffecgfdegfeed',
'efgjmheefcbbdbbcdeccggfehf',
'bcg...ggedbcdccddccccf..gf',
'bbf...kkgjgeeeedcfcbbf....',
'bbf........fdcdccdbbcf....'
]};
const ZEUS_T = {cols:32,rows:34,pal:[0xf0e5ad,0xecdfab,0xdfd8c0,0xeed883,0xe4ca85,0xf1c651,0xd1c8aa,0xeeb83d,0xe2a638,0xc9b37c,0xcc9f51,0xcc933c,0xc68331,0xba6927],g:[
'..............jjej..............',
'..............jgggk.............',
'.l............jg.gj.........g...',
'.n....n...gcggjjjkkggg.....gg...',
'.llkklm...c..jklmll...g....ccc..',
'..ljkk....c..kmjjjlk..g....bjc..',
'..kjk.....cccjjccelk.jg.....jg..',
'...fk....ccgcjjccdl.mccc...deg..',
'..kkk....ccgcgcccbel..ccc.caj...',
'..cgj....g..ccgg.gek...gggcak...',
'.g.gg...cc...ccc.cc.......gel...',
'..g.g...cc..cgccgcggc.nn...dl...',
'.....gccg...cggg.gggc.mnm..di...',
'......ggg...cgccccgcc.lml..dk...',
'.....c......cggcgcgcg.mll.cbl...',
'....cc..bbadagccgcgcbeddddbal...',
'....gb.bddfdffdaaabdffdaafhdl...',
'....cbfddffhfdffffdhhdadadiel...',
'....cefaadfhhhhhfhhh.aihhhheln..',
'....ceiffhhminnm.....flhfhmeinl.',
'...ebhmnmnnnnnnnn.n.dmhidhmeln..',
'...gdmimnnnnnnnn.n.ahnhldhldlmn.',
'...efmffknnnnnnn.ebfn.hldhidilmm',
'...ckliafek..nmkebfnn.hmahidilln',
'...cjihadhfdfffljfnn.hildhieil.n',
'...c.idddhhhhmnkhnnnhflmj.ijii.m',
'...c.mmkeeeilkfinnnhdfmn.nndiini',
'..ccclnnnn..ahmnnnhddinn...diinl',
'..bbbemlleadmnnnmhddhlkj...dilmm',
'.ecb..lifimnnnmih....gcg...dimlh',
'.gce..lhlmlih........ccg...dimii',
'.bce..k.ebbg.........gbg...di.hi',
'.cc...jeeeej.........jeee..di.im',
'ddde..ee...j........gj...ejajjfk'
]};
/*
 * Greece — "Colossus of Rhodes & Statue of Zeus" (greece-colossus-zeus). First scenery of Greece, fourth of the Ancient Seven.
 *
 * A harbour town on Rhodes: the bronze Colossus of Helios straddles the harbour mouth on two brick moles, torch raised, ships sailing
 * under his legs; on the left stands a Doric temple at Olympia with the seated chryselephantine Zeus (Nike on his hand, eagle sceptre)
 * visible between the columns. Both statues are traced cell by cell from reference pictures (tools/stages/extract_figure.py):
 * COL_T and ZEUS_T hold palette-coded colour grids that are extruded into rounded voxel bodies.
 * Animated: harbour and bay water (ripples, glints, foam), ships under the Colossus, gulls, townsfolk, incense smoke, torch flame.
 * Ten differences spread around the scene; four are lights that look the same by day.
 */
function createStage(E) {
  const { Mesh, BasicMaterial, PointLight, Color, hash } = E;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const smooth = (a, b, v) => { const t = clamp((v - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };
  const G = 1.0, SEA = 0.4, COAST = 9;
  const CX = 9, BASIN = [5, 13];                          // Colossus centre x; harbour channel x range (z -12 .. 9)
  const Z = [-13.2, -1.5], TY = 1.4, CZ = -4;                     // Zeus temple centre, terrace top
  const inBasin = (x, z) => x > BASIN[0] && x < BASIN[1] && z > -14 && z <= COAST;
  const hillH = (x, z) => {
    const back = smooth(-15, -22.5, z), pk = Math.exp(-((x - 22) * (x - 22) + (z + 20) * (z + 20)) / 30) * 7.0;
    return back * (2.0 + 1.5 * Math.sin(x * 0.31) + 0.9 * Math.sin(x * 0.85 + 1)) + pk * smooth(-12, -20, z);
  };
  const top = (x, z) => G + Math.max(0, Math.floor(hillH(x, z) * 2) / 2);
  function height(x, z) {
    if (z > COAST || inBasin(x, z)) return 0.5;
    if (x >= Z[0] - 9.6 && x <= Z[0] + 9.6 && z >= Z[1] - 9 && z <= Z[1] + 9) return TY;
    return top(x, z);
  }
  const mix = (a, b, t) => { const r = (a >> 16 & 255) + ((b >> 16 & 255) - (a >> 16 & 255)) * t, g = (a >> 8 & 255) + ((b >> 8 & 255) - (a >> 8 & 255)) * t, bl = (a & 255) + ((b & 255) - (a & 255)) * t; return (r | 0) << 16 | (g | 0) << 8 | (bl | 0); };
  const GRASS = [0x86b251, 0x92bd58, 0x78a847, 0x9bc460], HILL = [0x9a9a62, 0xa6a46c, 0x8a9358, 0xb4a878], ROCKP = [0xb8a090, 0xa89080, 0xc8b0a0];
  const LEAF = [0x2f7a3a, 0x3d8f45, 0x4aa04c, 0x58b055], OLIVE = [0x7a9552, 0x8aa45e, 0x6a8848], MARBLE = 0xf0e8d8, MARBLE2 = 0xdcd2bc, GOLD = 0xdcaa3c, STONE = 0xdccfae;
  const FLOWER = [0xe85a9a, 0xb565d9, 0xf2c83a, 0xf5f0e6, 0xe8743a], PAVE = [0xe9d6b8, 0xddc8a4], BRICK = [0xc9a06c, 0xb98c58, 0xd6b07a];
  const D = {
    olive: [22, -4], lantern: [21, 8.5], ship: [-4, 16], awning: [-3.5, 6.5], gardenlamp: [-22.5, 8.2], goats: [-24.2, -14],
    beacon: [-21, -19], banner: [-2, -19], flame: [3, -17.5], cypress: [19, -15],
  };

  function build(ctx, variant) {
    const { box: g, group: o, makeDiff: B } = ctx;
    const U = ctx.world.userData;
    const pick = (arr, a, b) => arr[Math.floor(hash(a, b) * arr.length)];
    const motion = (grp) => { grp.userData.motion = true; return grp; };
    U.wallLights = []; U.ripples = []; U.glints = []; U.foam = []; U.ships = []; U.people = []; U.gulls = []; U.smoke = []; U.flames = []; U.zrip = [];

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
    function house(x, z, w, d, h, roof, y0 = G) {
      g(x, y0 + h / 2, z, w, h, d, 0xf3eee2); g(x, y0 + h + 0.15, z, w + 0.3, 0.3, d + 0.3, roof);
      for (let i = 0; i < Math.max(1, Math.floor(w / 1.3)); i++) { const wx = x - w / 2 + 0.7 + i * 1.3; g(wx, y0 + h * 0.6, z + d / 2 + 0.03, 0.4, 0.55, 0.05, 0x2e6fb8); }
      g(x, y0 + 0.5, z + d / 2 + 0.03, 0.5, 1.0, 0.05, 0x6b4a33);
    }
    function column(x, y0, z, h, w) { g(x, y0 + 0.1, z, w * 1.4, 0.2, w * 1.4, MARBLE2); g(x, y0 + 0.2 + (h - 0.5) / 2, z, w, h - 0.5, w, MARBLE); g(x, y0 + h - 0.15, z, w * 1.5, 0.3, w * 1.5, MARBLE2); }
    // extrude a traced colour grid into a rounded voxel body facing +z. g: rows of palette chars ('.' empty), row 0 = top
    function figure(T, cx, y0, cz, s, thick, parent, lift = 1) {
      const { cols } = T, rows = T.rows - (T.trim || 0); const pal = T.pal.map((c) => lift === 1 ? c : mix(Math.min(255, (c >> 16 & 255) * lift | 0) << 16 | Math.min(255, (c >> 8 & 255) * lift | 0) << 8 | Math.min(255, (c & 255) * lift | 0), 0xe8b050, 0.3));
      for (let j = 0; j < rows; j++) {
        const row = T.g[j]; let i = 0;
        while (i < cols) {
          if (row[i] === '.') { i++; continue; }
          let e = i; while (e < cols && row[e] !== '.') e++;
          for (let k = i; k < e; k++) {
            const t = ((k + 0.5 - i) / (e - i)) * 2 - 1, d = s * (0.7 + thick * Math.sqrt(Math.max(0, 1 - t * t * 0.9)));
            g(cx + (k + 0.5 - cols / 2) * s, y0 + (rows - 1 - j + 0.5) * s, cz, s * 1.03, s * 1.03, d, pal[row.charCodeAt(k) - 97], parent);
          }
          i = e;
        }
      }
    }

    // ---------- harbour, bay, land, hills ----------
    const bottom = -2.4;
    g(0, (bottom + SEA - 0.08) / 2, 8, 52, SEA - 0.08 - bottom, 32, 0x1a5a96);
    g((BASIN[0] + BASIN[1]) / 2, (bottom + SEA - 0.08) / 2, -2.5, BASIN[1] - BASIN[0], SEA - 0.08 - bottom, 23, 0x1a5a96);
    lamp(0, SEA, 8.5, 52, 0.12, 31, 0x2f8fd0, 0x0b2142);
    lamp(9, SEA, -2.5, 8, 0.12, 22.6, 0x2f8fd0, 0x0b2142);
    for (let x = -25; x <= 25; x++) for (let z = COAST; z <= COAST + 2; z++) g(x, SEA + 0.09, z + 0.5, 1.02, 0.04, 1.02, mix(0x56d0dc, 0x2f8fd0, (z - COAST) / 3));
    // land: left bank, right bank, back strip behind the harbour
    for (const [x0, x1, z0, z1] of [[-26, BASIN[0], -22, 9], [BASIN[1], 26, -22, 9], [BASIN[0], BASIN[1], -22, -14]]) {
      g((x0 + x1) / 2, (bottom + G) / 2 - 0.05, (z0 + z1) / 2, x1 - x0, G - bottom - 0.1, z1 - z0, 0x8a6a45);
    }
    g(-10.5, (-0.7 + G) / 2, COAST + 0.1, 31, G + 0.7, 0.3, 0xcfc4a8); g(19.5, (-0.7 + G) / 2, COAST + 0.1, 13, G + 0.7, 0.3, 0xcfc4a8);
    for (const x of [BASIN[0], BASIN[1]]) g(x, (-0.7 + G) / 2, -2.5, 0.3, G + 0.7, 23, 0xcfc4a8);                // quay walls of the channel
    g(9, (-0.7 + G) / 2, -14.1, 8, G + 0.7, 0.3, 0xcfc4a8);
    for (let x = -25; x <= 25; x += 2) for (let z = -12; z <= 8; z += 2) {
      if (inBasin(x - 1 + 1, z) || inBasin(x + 1, z) || inBasin(x - 1, z) || (x > BASIN[0] - 1 && x < BASIN[1] + 1)) continue;
      if (z >= 4.5 && z <= 8) continue; if (x >= Z[0] - 10.5 && x <= Z[0] + 10.5 && z >= Z[1] - 9.8 && z <= Z[1] + 9.8) continue;
      g(x, G - 0.07, z, 2.02, 0.2, 2.02, hash(x, z) > 0.2 ? pick(GRASS, x, z) : pick(HILL, x, z));
    }
    for (let x = -25; x <= 25; x++) for (let z = -22; z <= -13; z++) {
      const h = top(x, z), pk = Math.exp(-((x - 22) * (x - 22) + (z + 20) * (z + 20)) / 30) * 7 > 2.2 && h > 4;
      if (h <= G + 0.01 && z > -17) continue; if (Math.abs(x - Z[0]) < 10.6 && Math.abs(z - Z[1]) < 9.8) continue; if (inBasin(x, z)) continue;
      g(x, (bottom + h) / 2 - 0.05, z, 1.02, h - bottom - 0.1, 1.02, pk ? pick(ROCKP, x, z) : pick(HILL, x, z));
    }
    for (let x = -25; x <= 25; x++) for (let z = 5; z <= 8; z++) { if (x > BASIN[0] - 0.5 && x < BASIN[1] + 0.5) continue; g(x, G - 0.02, z, 1.02, 0.14, 1.02, ((x + z) & 1) ? PAVE[0] : PAVE[1]); }
    for (let x = -24; x <= 24; x += 3.2) { if (x > BASIN[0] - 1 && x < BASIN[1] + 1) continue; g(x, 0.75, COAST + 0.3, 0.3, 0.35, 0.3, 0x5a3f28); }

    // ---------- the Colossus of Rhodes: two brick moles, traced bronze body, torch ----------
    {
      const s = 0.7, cols = COL_T.cols, rows = COL_T.rows - COL_T.trim, base = G + 0.6;
      for (const px of [4.0, 14.0]) {
        g(px, (base + G - 0.2) / 2, CZ, 4.4, base - G + 0.8, 4.2, BRICK[0]);
        for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) for (const [dx, dz, sx, sz] of [[0, 2.15, 1.1, 0.06], [2.25, 0, 0.06, 1.0]]) { const k = (r + c) & 1; if (dz) g(px - 1.65 + c * 1.1, G + 0.05 + r * 0.38, CZ + dz, 1.08, 0.36, 0.08, BRICK[k]); else g(px + dx, G + 0.05 + r * 0.38, CZ - 1.5 + c * 1.0, 0.08, 0.36, 1.0, BRICK[k + 1]); }
        g(px, base + 0.22, CZ, 4.8, 0.3, 4.6, 0xb08a58); g(px, base + 0.5, CZ, 3.6, 0.25, 3.4, 0xd6b078);
      }
      g(9, base + 0.2, CZ, 12, 0.14, 1.0, 0x8a6a45);
      const y0 = base + 0.62;                                       // feet stand on the pedestals
      figure(COL_T, CX, y0, CZ, s, 1.3, ctx.world, 1.7);
      // flame in the raised bowl: above the topmost traced cell
      let fj = 0; while (COL_T.g[fj].replace(/\./g, '') === '') fj++;
      const fi = COL_T.g[fj].search(/[^.]/);
      const fx = CX + (fi + 0.5 - cols / 2) * s, fy = y0 + (rows - fj) * s + 0.5;
      U.flames.push(lamp(fx, fy, CZ, 0.7, 0.9, 0.7, 0xe0a030, 0xffa83a));
      U.flames.push(lamp(fx, fy + 0.7, CZ, 0.4, 0.8, 0.4, 0xf0c050, 0xffd070));
      for (let k = 0; k < 4; k++) U.smoke.push({ m: lamp(fx, fy, CZ, 0.5, 0.5, 0.5, 0x8a8a90, 0x4a4a58, { alpha: 0.3 }), ph: k / 4, ox: fx, oy: fy + 0.6, oz: CZ, rise: 5, drift: 1.2 });
      g(9, y0 + 0.02, CZ, 0.01, 0.01, 0.01, 0x000000);
    }

    // ---------- Temple of Olympian Zeus (Doric) with the seated statue ----------
    {
      const [cx, cz] = Z, hw = 8.6, hl = 7.4, ch = 11.5, y0 = TY + 1.05;
      g(cx, (TY - bottom) / 2 + bottom / 2, cz, 2 * hw + 2.6, TY - bottom - 0.1, 2 * hl + 2.6, 0xcfb894);
      for (let x = -hw - 1.2; x < hw + 1.3; x += 1.5) for (let z = -hl - 1.2; z < hl + 1.3; z += 1.5) g(cx + x, TY - 0.03, cz + z, 1.52, 0.12, 1.52, (((x + z) / 1.5 | 0) & 1) ? PAVE[0] : PAVE[1]);
      for (let i = 0; i < 3; i++) g(cx, TY + 0.175 + i * 0.35, cz, 2 * (hw + 1.2 - i * 0.4), 0.35, 2 * (hl + 1.2 - i * 0.4), i % 2 ? MARBLE2 : MARBLE);
      // cella: back and left walls only so the statue shows between the columns
      g(cx, y0 + ch / 2, cz - hl + 1.8, 2 * hw - 3.4, ch, 0.9, 0xe2d4b6); g(cx - hw + 1.9, y0 + ch / 2, cz, 0.9, ch, 2 * hl - 3.0, 0xe2d4b6);
      for (let i = 0; i < 5; i++) g(cx + (i - 2) * 2.4, y0 + 3.2, cz - hl + 2.3, 1.6, 5.0, 0.1, [0x2e4f8f, 0xc0503a][i & 1]);       // painted back-wall panels
      for (let x = -hw + 1; x < hw; x += 1.5) for (let z = -hl + 1; z < hl; z += 1.5) g(cx + x, y0 - 0.03, cz + z, 1.5, 0.06, 1.5, (((x + z) / 1.5 | 0) & 1) ? 0xd8c8a4 : 0xe8dcc0);
      // Doric colonnade
      for (let i = 0; i < 8; i++) { const x = -hw + 0.7 + i * ((2 * hw - 1.4) / 7); for (const z of [hl - 0.7, -hl + 0.7]) column(cx + x, y0, cz + z, ch, 0.9); }
      for (let i = 1; i < 7; i++) { const z = -hl + 0.7 + i * ((2 * hl - 1.4) / 7); for (const x of [-hw + 0.7, hw - 0.7]) column(cx + x, y0, cz + z, ch, 0.9); }
      const yE = y0 + ch;
      const ring = (y, hgt, ex, wd, col) => { g(cx, y, cz + hl + ex - wd / 2, 2 * hw + 2 * ex, hgt, wd, col); g(cx, y, cz - hl - ex + wd / 2, 2 * hw + 2 * ex, hgt, wd, col); g(cx + hw + ex - wd / 2, y, cz, wd, hgt, 2 * hl + 2 * ex, col); g(cx - hw - ex + wd / 2, y, cz, wd, hgt, 2 * hl + 2 * ex, col); };
      ring(yE + 0.4, 0.8, 0.1, 1.5, MARBLE);
      for (let side = 0; side < 4; side++) {
        const len = side % 2 === 0 ? 2 * hw : 2 * hl, n = Math.round(len / 1.1);
        for (let c = 0; c < n; c++) {
          const u = -len / 2 + (c + 0.5) * len / n, col = (c & 1) ? 0x2e4f8f : 0xe6d6b0, hh = 0.55;
          if (side === 0) g(cx + u, yE + 0.5, cz + hl + 0.14, len / n * 0.9, hh, 0.08, col); else if (side === 1) g(cx + hw + 0.14, yE + 0.5, cz - u, 0.08, hh, len / n * 0.9, col);
          else if (side === 2) g(cx - u, yE + 0.5, cz - hl - 0.14, len / n * 0.9, hh, 0.08, col); else g(cx - hw - 0.14, yE + 0.5, cz + u, 0.08, hh, len / n * 0.9, col);
        }
      }
      ring(yE + 1.0, 0.35, 0.4, 1.0, GOLD);
      const yR = yE + 1.15;                                         // gabled roof along z with sculpted pediments
      const rz0 = cz - hl - 0.4, rz1 = cz - 4.6, rzc = (rz0 + rz1) / 2, rl = rz1 - rz0;          // roof covers the rear half only: the front stays open to show Zeus
      for (let i = 0; i < 12; i++) { const w = hw + 0.4 - i * 0.7; if (w > 0) g(cx, yR + i * 0.32 + 0.16, rzc, 2 * w, 0.32, rl, i % 2 ? 0xcf9b72 : 0xd9a67e); }
      g(cx, yR + 12 * 0.32 + 0.1, rzc, 0.5, 0.2, rl, 0xb8704a);
      for (const z of [cz - 3.6, cz + hl - 0.2]) g(cx, yE + 1.35, z, 2 * hw + 0.4, 0.3, 0.4, 0x9a6a40);
      for (const sz of [-1]) {
        for (let r = 0; r < 12; r++) { const w = (hw + 0.2) * 2 * (1 - (r + 0.5) / 12.5); g(cx, yR + r * 0.32 + 0.16, cz + sz * (hl + 0.35), w, 0.34, 0.12, 0x3a5f9f); }
        for (let k = -3; k <= 3; k++) { const hgt = 1.5 - Math.abs(k) * 0.18; g(cx + k * 1.3, yR + hgt / 2 + 0.2, cz + sz * (hl + 0.45), 0.55, hgt, 0.14, k & 1 ? 0xf3e4c0 : 0xdcaa3c); g(cx + k * 1.3, yR + hgt + 0.45, cz + sz * (hl + 0.45), 0.36, 0.36, 0.14, 0xf3e4c0); }
        g(cx, yR + 12 * 0.32 + 0.5, cz + sz * hl, 0.6, 0.7, 0.6, GOLD);
      }
      // Zeus on his throne: traced grid, throne plinth and footstool
      const px = cx - 0.5, pz = cz - 1.8, s = 0.27, ph = 1.3;
      g(px, y0 + ph / 2, pz, 8.2, ph, 5.6, 0xd6b878); g(px, y0 + ph + 0.1, pz, 8.8, 0.2, 6.2, GOLD);
      for (let k = 0; k < 7; k++) g(px - 3.3 + k * 1.1, y0 + 0.7, pz + 2.85, 0.8, 0.8, 0.06, k & 1 ? 0x2e4f8f : 0xdcaa3c);
      g(px, y0 + ph + 0.2 + 4.4, pz - 0.9, 7.2, 8.8, 0.6, 0x7a5e32);                      // throne back
      figure(ZEUS_T, px, y0 + ph + 0.2, pz, s, 1.8, ctx.world);
      for (const sx of [-1, 1]) { g(px + sx * 5.0, y0 + 0.7, pz + 2.6, 0.9, 1.4, 0.9, MARBLE2); U.flames.push(lamp(px + sx * 5.0, y0 + 1.7, pz + 2.6, 0.8, 0.5, 0.8, 0xd0883a, 0xffa040)); }
      for (let k = 0; k < 3; k++) for (const sx of [-1, 1]) U.smoke.push({ m: lamp(px + sx * 5, y0 + 1.7, pz + 2.6, 0.5, 0.5, 0.5, 0x9a9aa0, 0x5a5a68, { alpha: 0.3 }), ph: k / 3 + (sx > 0 ? 0.17 : 0), ox: px + sx * 5, oy: y0 + 2.0, oz: pz + 2.6, rise: 7, drift: 0.8 });
      for (const [x, z] of [[-hw - 3.2, hl - 2], [-hw - 3.2, -hl + 2], [hw + 3.4, hl + 0.5]]) cypress(ctx.world, cx + x, G + 0.2, cz + z, 3.8);
      for (let i = 0; i < 6; i++) bush(ctx.world, cx + hw + 2.2 + (i % 2) * 1.3, G, cz - 9 + Math.floor(i / 2) * 3.4, 300 + i, true);
    }

    // ---------- Rhodes town on the east bank, harbour furniture ----------
    for (const [x, z, w, d, h, r] of [[16.5, -9, 3, 3.2, 2.2, 0xc86a3c], [20.5, -8.5, 3.4, 3, 2.8, 0x2e6fb8], [24, -9, 2.6, 3, 2.0, 0xc86a3c], [17, -4.2, 2.8, 2.8, 2.6, 0x2e6fb8], [21, -3.5, 3.4, 3, 2.2, 0xc86a3c], [24.3, -3.5, 2.2, 3, 2.9, 0xc86a3c], [18, 1.2, 3, 2.6, 2.0, 0x2e6fb8], [22, 2.6, 3.2, 3, 2.6, 0xc86a3c], [18.5, 5.6, 2.8, 2.4, 1.8, 0xc86a3c]]) house(x, z, w, d, h, r);
    g(19.6, G + 3.4, -4.4, 1.9, 0.8, 1.9, 0x2e6fb8); g(19.6, G + 4.0, -4.4, 1.2, 0.6, 1.2, 0xf3eee2);   // little dome
    for (const [x, z, w, d, h, r] of [[-25, 4.5, 1.8, 2.4, 1.6, 0xc86a3c], [-2.4, 3.6, 2.4, 2.4, 1.9, 0x2e6fb8]]) house(x, z, w, d, h, r);
    for (const [x, z] of [[-24, 1], [-23.5, -14], [25, -14], [8, -15.5], [14.5, -16.5], [-8, -18.5], [11, -18], [-14, -19]]) cypress(ctx.world, x, top(x, z), z, 3.2 + hash(x, z));
    for (const [x, z] of [[-1, 5.8], [-16, 6.2], [24, 6], [-9, 6.6]]) olive(ctx.world, x, G, z, 60 + x);
    for (let x = -22; x <= 24; x += 3.4) {
      if (x > BASIN[0] - 2 && x < BASIN[1] + 2) continue;
      if (Math.abs(x - D.lantern[0]) < 3 || Math.abs(x - D.awning[0]) < 2.5 || Math.abs(x - D.gardenlamp[0]) < 3) continue;
      g(x, G + 0.55, 8.7, 0.12, 1.1, 0.12, 0x3a2f27); lamp(x, G + 1.2, 8.7, 0.3, 0.32, 0.3, 0xe8dcb8, 0xffc468);
    }
    for (const x of [-16, 1.5]) { g(x, 0.5, COAST + 2.5, 1.6, 0.3, 5.5, 0x9a7a52); for (const dz of [0.4, 2.6, 4.8]) { g(x - 0.7, 0.2, COAST + dz, 0.16, 0.9, 0.16, 0x5a3f28); g(x + 0.7, 0.2, COAST + dz, 0.16, 0.9, 0.16, 0x5a3f28); } }

    // ---------- people, gulls, ships, water ----------
    const cols = [0xc0392b, 0x2e7bd6, 0xe0b030, 0x2e9b4a, 0xb565d9, 0xf5f0e6, 0xe8743a, 0x2ec4b6];
    for (const [x1, z1, x2, z2, y, i] of [[-24, 6.2, -6, 6.2, G, 0], [24, 7.4, 15, 7.4, G, 1], [-4, 7.8, -20, 7.8, G, 2], [-8, 4.4, -14, 4.4, G, 3], [20, 4.8, 24, 4.8, G, 4], [-20, 5.2, -10, 5.2, G, 5], [3.0, 6, 3.0, -9, G, 6], [15.2, -9, 15.2, 6, G, 7]]) {
      const p = person(ctx.world, x1, y, z1, cols[i]); U.people.push({ g: p, x1, z1, x2, z2, y, sp: 0.035 + 0.008 * i, ph: i * 1.3 });
    }
    for (let k = 0; k < 4; k++) {
      const d = motion(o(0, 0, 0)); ctx.world.add(d);
      g(0, 0, 0, 0.5, 0.2, 0.2, 0xf5f0e6, d); g(0.28, 0.06, 0, 0.18, 0.18, 0.16, 0xf5f0e6, d);
      const wings = [-1, 1].map((s) => { const p = motion(o(0, 0.08, s * 0.1)); d.add(p); g(0, 0.04, s * 0.32, 0.4, 0.05, 0.6, 0xe8e4da, p); return { p, s }; });
      U.gulls.push({ g: d, wings, r: 10 + k * 3, w: (k % 2 ? -1 : 1) * (0.15 + 0.03 * k), y: 22 + k * 1.8, ph: k * 1.7, cx: k % 2 ? Z[0] : CX, cz: k % 2 ? Z[1] : CZ });
    }
    // two ships sail through the harbour mouth, under the Colossus (they travel along z); two more ply the open bay
    for (const [x, ph, sail, stripe, sc] of [[8.0, 0.4, 0xf3ecd8, 0xc0392b, 0.85], [10.3, 3.1, 0xf3ecd8, 0x2e7bd6, 0.8]]) {
      const s = ship(ctx.world, sail, stripe); s.scale.set(sc, sc, sc); U.ships.push({ g: s, mode: 'z', x, A: 22, c: -2.5, w: 0.035, ph });
    }
    for (const [z, A, w, ph, sail, stripe, sc] of [[21.5, 20, 0.04, 0.5, 0xf3ecd8, 0xe0b030, 1], [18.8, 21, 0.031, 3.4, 0xf3ecd8, 0x2e9b4a, 0.85]]) {
      const s = ship(ctx.world, sail, stripe); s.scale.set(sc, sc, sc); U.ships.push({ g: s, mode: 'x', z, A, w, ph });
    }
    for (let i = 0; i < 100; i++) {
      const m = lamp(0, SEA + 0.13, 10.5 + hash(i, 2) * 13, 0.9 + hash(i, 9) * 1.1, 0.04, 0.14, 0xdff3ff, 0x6f8fc0, { alpha: 0.5 });
      U.ripples.push({ m, x0: hash(i, 1) * 52 - 26, sp: 0.25 + hash(i, 3) * 0.4, fl: 0.8 + hash(i, 5) * 1.4, ph: hash(i, 6) * 6.3, a: 0.55 });
    }
    for (let i = 0; i < 26; i++) {                                    // harbour ripples drift down the channel
      const m = lamp(5.8 + hash(i, 31) * 6.4, SEA + 0.13, 0, 0.9 + hash(i, 9) * 0.8, 0.04, 0.14, 0xdff3ff, 0x6f8fc0, { alpha: 0.5 });
      U.zrip.push({ m, sp: 0.3 + hash(i, 3) * 0.4, ph: hash(i, 6) * 6.3, fl: 0.9 + hash(i, 5) * 1.2, z0: hash(i, 7) * 22 });
    }
    for (let i = 0; i < 36; i++) U.glints.push({ m: lamp(hash(i, 21) * 48 - 24, SEA + 0.15, 10.5 + hash(i, 22) * 13, 0.22, 0.05, 0.22, 0xffffff, 0xffc878, { alpha: 0 }), ph: hash(i, 23) * 6.3, f: 1.2 + hash(i, 24) * 1.5, a: 0.9 });
    for (let i = 0; i < 14; i++) U.glints.push({ m: lamp(5.8 + hash(i, 41) * 6.4, SEA + 0.15, -13 + hash(i, 42) * 21, 0.22, 0.05, 0.22, 0xffffff, 0xffc878, { alpha: 0 }), ph: hash(i, 43) * 6.3, f: 1.2 + hash(i, 44) * 1.5, a: 0.9 });
    for (let i = 0; i < 52; i++) { const x = -25.5 + i; if (x > BASIN[0] - 0.5 && x < BASIN[1] + 0.5) continue; const m = lamp(x, SEA + 0.16, COAST + 0.6, 1.0, 0.06, 0.9, 0xffffff, 0x9cb4d8, { alpha: 0.6 }); U.foam.push({ m, x, ph: i * 0.45 }); }

    // ================= DIFFERENCES (every ~36 degrees around the scene) =================
    // 0: olive tree on the east bank — present or absent
    B(0, D.olive[0], G, D.olive[1], 'Olive tree beside the houses', 2.4, (d) => { if (!variant) { g(0, 0.7, 0, 0.35, 1.4, 0.35, 0x6b4a33, d); g(0, 1.9, 0, 2.0, 1.3, 2.0, 0x7f9a58, d); g(0.1, 2.8, 0, 1.3, 0.8, 1.3, 0x8aa45e, d); } }, variant);
    // 1: quay lanterns — warm white or cyan at night
    B(1, D.lantern[0], G, D.lantern[1], 'Quay lantern colour', 2.4, (d) => {
      for (const s of [-1, 1]) { g(s * 1.2, 0.8, 0, 0.14, 1.6, 0.14, 0x3a2f27, d); lamp(s * 1.2, 1.75, 0, 0.42, 0.44, 0.42, 0xe8dcb8, variant ? 0x4fd8ff : 0xffb23a, { parent: d, pickable: true }); }
    }, variant);
    // 2: ship at anchor in the bay
    B(2, D.ship[0], SEA, D.ship[1], 'Ship at anchor in the bay', 3.0, (d) => {
      g(2.2, 0.35, 0.9, 0.3, 0.7, 0.3, 0xc0392b, d);
      if (!variant) { const s = ship(d, 0xf3ecd8, 0x2e9b4a); s.rotation.y = 0.5; }
    }, variant);
    // 3: market awning — red or blue
    B(3, D.awning[0], G, D.awning[1], 'Market awning: red or blue', 2.8, (d) => {
      g(-1.1, 0.8, -0.8, 0.14, 1.6, 0.14, 0x6b4a33, d); g(1.1, 0.8, -0.8, 0.14, 1.6, 0.14, 0x6b4a33, d); g(-1.1, 0.8, 0.8, 0.14, 1.6, 0.14, 0x6b4a33, d); g(1.1, 0.8, 0.8, 0.14, 1.6, 0.14, 0x6b4a33, d);
      for (let k = 0; k < 5; k++) g(-1.1 + k * 0.55, 1.75, 0, 0.55, 0.12, 2.1, k & 1 ? 0xf5f0e6 : (variant ? 0x2e7bd6 : 0xc0392b), d);
      g(0, 0.5, 0, 1.6, 0.9, 0.9, 0xb98c58, d); for (let k = 0; k < 3; k++) g(-0.5 + k * 0.5, 1.05, 0.1, 0.3, 0.3, 0.3, [0xe8743a, 0xf2c83a, 0xc0392b][k], d);
    }, variant);
    // 4: garden lamps — amber or green at night
    B(4, D.gardenlamp[0], G, D.gardenlamp[1], 'Garden lamp colour', 2.4, (d) => {
      for (const k of [-1, 0, 1]) { g(k * 1.2, 0.7, 0, 0.12, 1.4, 0.12, 0x3a2f27, d); lamp(k * 1.2, 1.55, 0, 0.4, 0.4, 0.4, 0xe8dcb8, variant ? 0x6bff8a : 0xffb23a, { parent: d, pickable: true }); }
    }, variant);
    // 5: goats and shepherd — three or two goats
    B(5, D.goats[0], top(...D.goats), D.goats[1], 'Goats by the wall: three or two', 3.0, (d) => {
      g(0, 0.25, 0.8, 3.6, 0.5, 0.5, STONE, d); person(d, -1.5, 0.0, -0.4, 0x2e7bd6);
      for (const [x, z] of [[-0.3, 0.2], [0.7, -0.1], [1.6, 0.3]].slice(0, variant ? 2 : 3)) { g(x, 0.35, z, 0.7, 0.4, 0.35, 0xf5f0e6, d); g(x + 0.4, 0.55, z, 0.25, 0.3, 0.25, 0xf5f0e6, d); g(x + 0.45, 0.78, z, 0.08, 0.16, 0.08, 0x3a2f27, d); for (const dz of [-0.1, 0.1]) g(x - 0.2, 0.1, z + dz, 0.1, 0.2, 0.1, 0xd9d2c0, d); }
    }, variant);
    // 6: hillside beacon — red or blue at night
    B(6, D.beacon[0], top(...D.beacon), D.beacon[1], 'Hillside beacon colour', 2.6, (d) => {
      g(0, 0.5, 0, 0.9, 1.0, 0.9, 0x6e5230, d); g(0, 1.1, 0, 1.2, 0.2, 1.2, 0x3a2f27, d);
      U.flames.push(lamp(0, 1.5, 0, 0.7, 0.7, 0.7, 0xd9d6cc, variant ? 0x7fd0ff : 0xff4a2a, { parent: d, pickable: true }));
    }, variant);
    // 7: banner — red or blue
    B(7, D.banner[0], top(...D.banner), D.banner[1], 'Banner colour: red or blue', 2.4, (d) => {
      g(0, 1.8, 0, 0.14, 3.6, 0.14, 0x3a2f27, d); g(0.6, 3.1, 0, 1.2, 0.9, 0.06, variant ? 0x2e7bd6 : 0xc0392b, d); g(0.6, 3.1, 0.04, 0.5, 0.4, 0.04, GOLD, d); g(0, 0.2, 0, 1.0, 0.4, 1.0, STONE, d);
    }, variant);
    // 8: sacred flame bowl behind the harbour — amber or teal at night
    B(8, D.flame[0], top(...D.flame), D.flame[1], 'Sacred flame colour', 2.4, (d) => {
      g(0, 0.7, 0, 0.5, 1.4, 0.5, MARBLE2, d); g(0, 1.5, 0, 1.2, 0.3, 1.2, GOLD, d);
      U.flames.push(lamp(0, 2.0, 0, 0.8, 0.7, 0.8, 0xd9d6cc, variant ? 0x35e0c0 : 0xffa040, { parent: d, pickable: true }));
    }, variant);
    // 9: cypress grove — three trees or two
    B(9, D.cypress[0], top(...D.cypress), D.cypress[1], 'Cypress grove: three trees or two', 2.8, (d) => {
      for (const [x, z, h] of [[-1.2, 0.2, 3.8], [0, -0.6, 4.4], [1.3, 0.3, 3.5]].slice(0, variant ? 2 : 3)) cypress(d, x, 0, z, h);
    }, variant);

    for (const i of [1, 4, 6, 8]) { const diff = U.diffs[i]; diff.nightOnly = true; diff.hintPhase = 0.86; diff.g.userData.motion = true; }

    U.localLights = [];
    for (const [x, y, z, color, power] of [[Z[0], 8, Z[1] + 2, 0xffd9a0, 110], [CX, 24, CZ + 2, 0xffb060, 80], [16, 4, 4, 0xffc27a, 55], [-9, 4, 6.5, 0xffc27a, 55], [-23, 4, 7, 0xffc27a, 40]]) {
      const l = new PointLight(color, 0, 28, 1.5);
      l.position.set(x, y, z); l.userData.nightPower = power; ctx.world.add(l); U.localLights.push(l);
    }
  }

  // Daily story (300 s = one day): ships glide under the Colossus' legs, ripples drift down the channel, foam laps the quay, incense smoke
  // rises in the temple of Zeus, citizens walk the quay and gulls circle; at dusk the torch of Helios, the braziers and lamps glow.
  function animate(world, time, reduced = false) {
    const u = world.userData, t = reduced ? time * 0.4 : time;
    const phase = (((time / 300) % 1) + 1) % 1;
    const day = phase > 0.24 && phase < 0.8;
    const nightF = phase >= 0.5 ? smooth(0.74, 0.84, phase) : 1 - smooth(0.2, 0.27, phase);
    for (const r of u.ripples || []) {
      r.m.position.x = (((r.x0 + t * r.sp + 26) % 52) + 52) % 52 - 26;
      r.m.material.opacity = r.a * (0.2 + 0.8 * Math.pow(0.5 + 0.5 * Math.sin(t * r.fl + r.ph), 2)) * (1 - 0.5 * nightF);
    }
    for (const r of u.zrip || []) {
      r.m.position.z = -13 + (((r.z0 + t * r.sp) % 22) + 22) % 22;
      r.m.material.opacity = 0.5 * (0.2 + 0.8 * Math.pow(0.5 + 0.5 * Math.sin(t * r.fl + r.ph), 2)) * (1 - 0.5 * nightF);
    }
    for (const q of u.glints || []) { const s = Math.max(0, Math.sin(t * q.f + q.ph)); q.m.material.opacity = q.a * s * s * s * (day ? 1 : 0.35 + 0.65 * nightF); }
    for (const f of u.foam || []) {
      const k = 0.5 + 0.5 * Math.sin(t * 1.6 - f.ph);
      f.m.position.z = COAST + 0.5 + 0.35 * k; f.m.scale.set(1.0, 0.06, 0.5 + 0.7 * k); f.m.material.opacity = 0.15 + 0.5 * (1 - k);
    }
    for (const b of u.ships || []) {
      const a = t * b.w + b.ph, dirc = Math.cos(a), flip = -Math.PI * (1 - smooth(-0.12, 0.12, dirc));
      if (b.mode === 'z') { b.g.position.set(b.x + Math.sin(t * 0.5 + b.ph) * 0.2, SEA - 0.05 + Math.sin(t * 1.6 + b.ph) * 0.07, b.c + Math.sin(a) * b.A * 0.5); b.g.rotation.y = flip - Math.PI / 2; }
      else { b.g.position.set(Math.sin(a) * b.A, SEA - 0.05 + Math.sin(t * 1.6 + b.ph) * 0.07, b.z); b.g.rotation.y = flip; }
      b.g.rotation.z = Math.sin(t * 1.2 + b.ph) * 0.04; b.g.rotation.x = Math.sin(t * 0.9 + b.ph) * 0.03;
    }
    for (const p of u.people || []) {
      const a = t * p.sp + p.ph, f = 0.5 + 0.5 * Math.sin(a);
      p.g.position.set(p.x1 + (p.x2 - p.x1) * f, p.y + Math.abs(Math.sin(t * 4 + p.ph)) * 0.06, p.z1 + (p.z2 - p.z1) * f);
      p.g.rotation.y = Math.atan2((p.x2 - p.x1) * Math.cos(a), (p.z2 - p.z1) * Math.cos(a));
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
      s.m.position.set(s.ox + f * s.drift, s.oy + f * s.rise, s.oz + f * 0.8); s.m.scale.setScalar(0.4 + f * 1.3); s.m.material.opacity = (1 - f) * 0.35;
    }
    for (const f of u.flames || []) { const b = f.userData.sc || (f.userData.sc = [f.scale.x, f.scale.y, f.scale.z]); f.scale.set(b[0] * (1 + 0.08 * Math.sin(t * 9 + f.position.x)), b[1] * (1 + 0.18 * Math.sin(t * 7 + f.position.z)), b[2] * (1 + 0.08 * Math.sin(t * 8))); }
  }

  function updateLighting(world, phase, { glow = 0 } = {}) {
    const u = world.userData;
    for (const l of u.wallLights || []) l.m.material.color.set(l.day).lerp(new Color(l.night), glow);
    for (const l of u.localLights || []) l.intensity = glow * (l.userData.nightPower || 24);
  }

  return { build, animate, height, water: () => false, updateLighting };
}
