# Trace the sleeves of the reference photo into per-cell tone + relief grids, and write them into world.js (between ARMDATA markers).
# usage: python3 -I extract_arm_relief.py REFERENCE.jpg world.js
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
js += "};/*ENDARMDATA*/"
s = open(sys.argv[2]).read()
if '/*ARMDATA*/' in s:
    a = s.index('/*ARMDATA*/'); b = s.index('/*ENDARMDATA*/') + len('/*ENDARMDATA*/'); s = s[:a] + js + s[b:]
else:
    mk = "    for (const sd of [-1, 1]) {\n      P(sd * 7.0, 12.88"
    assert s.count(mk) == 1; s = s.replace(mk, "    " + js + "\n" + mk)
open(sys.argv[2], 'w').write(s)
print({k: (len(v[1]), len(v[1][0])) for k, v in out.items()}, {k: v[0] for k, v in out.items()})
