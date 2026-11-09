# Trace the sleeves of the reference photo into per-cell tone + relief grids, and write them into world.js (between ARMDATA markers).
# usage: python3 -I extract_arm_relief.py FULL_STATUE.jpg world.js [FACE_CLOSEUP.jpg [SIDE_OR_REAR_HEAD.jpg]]
import sys, numpy as np
from PIL import Image
from scipy import ndimage as ndi
im = np.asarray(Image.open(sys.argv[1]).convert('RGB')).astype(float)
R, G, B = im[..., 0], im[..., 1], im[..., 2]
L = (R + G + B) / 3
mask = ndi.binary_fill_holes(ndi.binary_opening(ndi.gaussian_filter(R - B, 1.0) > 10, iterations=1))
Ld = L - ndi.gaussian_filter(L, 5.0)
SC = 20.8; CX = 190.0                      # px per statue unit, photo centre column
X0, X1, DX = 2.5, 6.4, 0.06; DY = 0.06
out = {}
for sd, sgn in ((1, -1), (-1, 1)):         # sd +1 = viewer-left of the photo
    # vertical anchor: top edge of the sleeve at X=4.3
    col = int(round(CX + sgn * 4.3 * SC)); ys = np.where(mask[:, col])[0]; ys = ys[(ys > 60) & (ys < 140)]
    ptop = ys.min(); YT = 13.3
    nx = int(round((X1 - X0) / DX)) + 1; ny = int(round(3.6 / DY))
    tone = np.full((ny, nx), -1.0); rel = np.zeros((ny, nx))
    for j in range(ny):
        y = YT - j * DY; py = ptop + (YT - y) * SC
        for i in range(nx):
            X = X0 + i * DX; px = CX + sgn * X * SC
            if ndi.map_coordinates(mask.astype(float), [[py], [px]], order=1)[0] > 0.5:
                tone[j, i] = ndi.map_coordinates(L, [[py], [px]], order=1)[0]
                rel[j, i] = ndi.map_coordinates(Ld, [[py], [px]], order=1)[0]
    m = tone >= 0
    lo, hi = np.percentile(tone[m], 3), np.percentile(tone[m], 97); sdv = rel[m].std() + 1e-6
    trows, rrows = [], []
    for j in range(ny):
        t = ''.join('.' if not m[j, i] else chr(97 + int(np.clip((tone[j, i] - lo) / (hi - lo), 0, 0.999) * 26)) for i in range(nx))
        r = ''.join('.' if not m[j, i] else chr(97 + int(np.clip(13 + 12 * rel[j, i] / (2 * sdv), 0, 25))) for i in range(nx))
        trows.append(t); rrows.append(r)
    while trows and set(trows[-1]) == {'.'}: trows.pop(); rrows.pop()
    out[sd] = (ptop, trows, rrows)
js = "/*ARMDATA*/const ARM = {X0:%g,DX:%g,YT:%g,DY:%g,\n" % (X0, DX, YT, DY)
for sd in (1, -1):
    _, t, r = out[sd]
    js += " '%d': {t:[%s],\n r:[%s]},\n" % (sd, ','.join("'%s'" % x for x in t), ','.join("'%s'" % x for x in r))
js += "};\n"
# ---- body: shoulders down to the base, X from -2.5 to 2.5 (+X = viewer-left, as in the game), one grid
BX0, BX1 = -2.5, 2.5; nxb = int(round((BX1 - BX0) / DX)) + 1; YTB = 13.3; PTOP = 90.0
nyb = int(round((YTB - 0.12) / DY)) + 1
tone = np.full((nyb, nxb), -1.0); rel = np.zeros((nyb, nxb))
for j in range(nyb):
    y = YTB - j * DY; py = PTOP + (YTB - y) * SC
    for i in range(nxb):
        X = BX0 + i * DX; px = CX - X * SC
        if ndi.map_coordinates(mask.astype(float), [[py], [px]], order=1)[0] > 0.5:
            tone[j, i] = ndi.map_coordinates(L, [[py], [px]], order=1)[0]; rel[j, i] = ndi.map_coordinates(Ld, [[py], [px]], order=1)[0]
m = tone >= 0
lab, nlab = ndi.label(m); sizes = ndi.sum(m, lab, range(1, nlab + 1)); m = lab == (1 + int(np.argmax(sizes)))   # keep the main body only
lo, hi = np.percentile(tone[m], 3), np.percentile(tone[m], 97); sdv = rel[m].std() + 1e-6
tr, rr = [], []
for j in range(nyb):
    tr.append(''.join('.' if not m[j, i] else chr(97 + int(np.clip((tone[j, i] - lo) / (hi - lo), 0, 0.999) * 26)) for i in range(nxb)))
    rr.append(''.join('.' if not m[j, i] else chr(97 + int(np.clip(13 + 12 * rel[j, i] / (2 * sdv), 0, 25))) for i in range(nxb)))
while tr and set(tr[-1]) == {'.'}: tr.pop(); rr.pop()
js += "const BODY = {X0:%g,DX:%g,YT:%g,DY:%g,\n t:[%s],\n r:[%s]};\n" % (BX0, DX, YTB, DY, ','.join("'%s'" % x for x in tr), ','.join("'%s'" % x for x in rr))
# ---- head (face + hair) from a front close-up: stone vs sky separated by colour saturation
if len(sys.argv) > 3:
    fim = np.asarray(Image.open(sys.argv[3]).convert('RGB')).astype(float)
    sat = (fim.max(2) - fim.min(2)) / (fim.max(2) + 1e-6)
    fm = ndi.binary_fill_holes(ndi.binary_closing(sat < 0.28, iterations=2))
    lab2, n2 = ndi.label(fm); fm = lab2 == (1 + int(np.argmax(ndi.sum(fm, lab2, range(1, n2 + 1)))))
    Lf = fim.mean(2); Ls = ndi.gaussian_filter(Lf, 2.0); Lr = Ls - ndi.gaussian_filter(Lf, 18.0)
    SCF, CXF, DXF = 140.0, 220.0, 0.04; YTF = 16.1; HX0 = -1.2
    ptop = float(np.where(fm.sum(1) > 15)[0].min())
    nxf = int(round(2.4 / DXF)) + 1; nyf = int(round((YTF - 13.15) / DXF)) + 1
    tone = np.full((nyf, nxf), -1.0); rel = np.zeros((nyf, nxf))
    for j in range(nyf):
        y = YTF - j * DXF; py = ptop + (YTF - y) * SCF
        for i in range(nxf):
            X = HX0 + i * DXF; px = CXF - X * SCF
            if ndi.map_coordinates(fm.astype(float), [[py], [px]], order=1)[0] > 0.5:
                tone[j, i] = ndi.map_coordinates(Ls, [[py], [px]], order=1)[0]; rel[j, i] = ndi.map_coordinates(Lr, [[py], [px]], order=1)[0]
    m = tone >= 0
    lo, hi = np.percentile(tone[m], 2), np.percentile(tone[m], 98); sdv = rel[m].std() + 1e-6
    tr, rr = [], []
    for j in range(nyf):
        tr.append(''.join('.' if not m[j, i] else chr(97 + int(np.clip((tone[j, i] - lo) / (hi - lo), 0, 0.999) * 26)) for i in range(nxf)))
        rr.append(''.join('.' if not m[j, i] else chr(97 + int(np.clip(13 + 12 * rel[j, i] / (2 * sdv), 0, 25))) for i in range(nxf)))
    zbs = ''
    if len(sys.argv) > 4:                    # side / rear-three-quarter view: per-row head depth from the silhouette -> how far the hood extends behind the face plane
        sim = np.asarray(Image.open(sys.argv[4]).convert('RGB')).astype(float)
        sR, sB = sim[..., 0], sim[..., 2]
        sm = ((sim[..., 2] < 165) | (sB - sR < 15)); sm[330:, :] = False; sm[:, 420:] = False
        sm = ndi.binary_fill_holes(ndi.binary_opening(ndi.gaussian_filter(sm.astype(float), 1.5) > 0.5, iterations=1))
        l3, n3 = ndi.label(sm); sm = l3 == (1 + int(np.argmax(ndi.sum(sm, l3, range(1, n3 + 1)))))
        P0, SCS = 36.0, 100.0; zb = []
        for j in range(nyf):
            y = YTF - j * DXF; pyy = int(np.clip(P0 + (YTF - y) * SCS, 40, 316)); xs = np.where(sm[pyy])[0]
            zb.append(max(0.5, 0.85 * (xs.max() - xs.min()) / SCS - 0.62))
        k = 3; zb = [float(np.mean(zb[max(0, i - k):i + k + 1])) for i in range(len(zb))]
        zbs = ',zb:[%s]' % ','.join('%.2f' % v for v in zb)
    js += "const HEAD = {X0:%g,DX:%g,YT:%g,DY:%g%s,\n t:[%s],\n r:[%s]};\n" % (HX0, DXF, YTF, DXF, zbs, ','.join("'%s'" % x for x in tr), ','.join("'%s'" % x for x in rr))
    print('head rows', nyf, 'cols', nxf, 'ptop', ptop)
js += "/*ENDARMDATA*/"
print('body rows', len(tr), 'cols', nxb)
s = open(sys.argv[2]).read()
if '/*ARMDATA*/' in s:
    a = s.index('/*ARMDATA*/'); b = s.index('/*ENDARMDATA*/') + len('/*ENDARMDATA*/'); s = s[:a] + js + s[b:]
else:
    mk = "    for (const sd of [-1, 1]) {\n      P(sd * 7.0, 12.88"
    assert s.count(mk) == 1; s = s.replace(mk, "    " + js + "\n" + mk)
open(sys.argv[2], 'w').write(s)
print({k: (len(v[1]), len(v[1][0])) for k, v in out.items()}, {k: v[0] for k, v in out.items()})
