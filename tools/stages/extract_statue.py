#!/usr/bin/env python3
"""Photo-traced statue grids (colour + depth + carving), the Christ-the-Redeemer method generalised to whole figures.
usage: extract_statue.py SUBJECT PHOTO OUT.js [PREVIEW.png]     SUBJECT = zeus | colossus
Per cell the tool samples the photo (colour from a palette, tone, relief = detrended luminance) inside a hand-checked mask, then derives a depth map:
inflation by distance-to-edge (round limbs, flat torso), posture offsets (knees and hands forward, throne behind) and relief carving from the shading.
Output const NAME = {cols,rows,pal,c:[colour rows],f:[front depth rows],k:[back depth rows]} where letters a..z / A..Z encode levels, '.' = empty."""
import sys, json
import numpy as np
from PIL import Image
from scipy import ndimage as ndi
subject, photo, out = sys.argv[1:4]
im = np.asarray(Image.open(photo).convert('RGB')).astype(float)
R, G, B = im[..., 0], im[..., 1], im[..., 2]
L = im.mean(2)
if subject == 'zeus':
    box = (90, 40, 400, 404); CELL = 2.0; HEIGHT = 9.6; DC = 8.0; ZC = 0.55; AMP = 0.30; name = 'ZEUS_G'
    gold = (R - B > 25); skin = (np.minimum(np.minimum(R, G), B) > 150) & (B - R < 8)
    m = gold | skin
    m[:35] = False; m[404:] = False; m[:, :90] = False; m[:, 400:] = False
    m = ndi.binary_fill_holes(ndi.binary_closing(m, iterations=1)); m = ndi.binary_opening(m, iterations=1)
    yy, xx = np.mgrid[0:m.shape[0], 0:m.shape[1]]
    m &= ~((yy < 78) & ((xx < 318) | (xx > 374)))                    # drop the cream arch behind the head
    lab, n = ndi.label(m); sz = ndi.sum(m, lab, range(1, n + 1)); m = np.isin(lab, [i + 1 for i, s in enumerate(sz) if s > 60])
    LIFT = 1.0
else:
    box = (50, 85, 300, 497); CELL = 1.6; HEIGHT = 30.0; DC = 11.0; ZC = 1.5; AMP = 0.45; name = 'COL_G'
    raw = ndi.gaussian_filter(R - B, 1.0) > 20
    raw[487:] = False; raw[445:] &= (L[445:] < 118)                      # ground, quay and city at the feet are paler than the bronze
    raw[445:] &= (R[445:] >= G[445:]); raw[468:, :78] = False; raw[320:346, 148:178] = False                                       # pixelated patch between the legs in the render
    m = ndi.binary_opening(raw, iterations=3)
    head = ndi.binary_opening(raw, iterations=1); head[:150] |= False; head[150:] = False; head[:84] = False
    m = m | head                                                        # keep the thin crown rays and bowl rim
    holes = ndi.binary_fill_holes(m) & ~m; hl, hn = ndi.label(holes); hs = ndi.sum(holes, hl, range(1, hn + 1))
    m = m | np.isin(hl, [i + 1 for i, v in enumerate(hs) if v < 120])      # fill small holes only (sky between the legs stays open)
    lab, n = ndi.label(m); sz = ndi.sum(m, lab, range(1, n + 1)); m = lab == (1 + int(np.argmax(sz)))
    LIFT = 1.0
x0, y0, x1, y1 = box
ys, xs = np.where(m[y0:y1, x0:x1]); ty, by = ys.min() + y0, ys.max() + y0; lx, rx = xs.min() + x0, xs.max() + x0
cols = int(np.ceil((rx - lx + 1) / CELL)); rows = int(np.ceil((by - ty + 1) / CELL)); S = HEIGHT / rows
Lb = ndi.gaussian_filter(L, 2.0); Ld = Lb - ndi.gaussian_filter(L, 9.0)
mf = m.astype(float)
M = np.zeros((rows, cols), bool); col = np.zeros((rows, cols, 3)); rel = np.zeros((rows, cols)); px = np.zeros((rows, cols)); py = np.zeros((rows, cols))
sm = [ndi.gaussian_filter(im[..., c], CELL * 0.45) for c in range(3)]
for j in range(rows):
    for i in range(cols):
        py[j, i] = ty + (j + 0.5) * CELL; px[j, i] = lx + (i + 0.5) * CELL
M = ndi.map_coordinates(mf, [py, px], order=1) > 0.5
for c in range(3): col[..., c] = ndi.map_coordinates(sm[c], [py, px], order=1)
rel = ndi.map_coordinates(Ld, [py, px], order=1)
# ---- depth map (units) ----
D = ndi.distance_transform_edt(M)
infl = ZC * np.sqrt(np.clip(1 - (1 - np.minimum(D, DC) / DC) ** 2, 0, 1))
off = np.zeros((rows, cols))
if subject == 'zeus':
    Yo = py; Xo = px                                                  # original poster pixel coordinates of every cell
    ramp = lambda a, b, y: np.clip((y - a) / (b - a), 0, 1)
    off = 0.10 * (Yo < 170) + 1.25 * ramp(300, 385, Yo)                # head slightly forward; thighs/knees/feet come forward
    off = off + 0.9 * ((Xo < 205) & (Yo > 115) & (Yo < 250) & (Xo > 95))      # Nike hand and forearm reach out
    off = off + 0.55 * ((Xo > 322) & (Xo < 372) & (Yo > 100) & (Yo < 250))   # hand on the sceptre
    staff = (Xo > 338) & (Xo < 356) & (Yo > 60); off = off + 0.0
    thr = ((Xo < 150) | (Xo > 385)) & (Yo > 230); off = off - 0.9 * thr       # throne legs stand behind the body
    off = ndi.gaussian_filter(off, 3.0)
    front = infl + off + 0.0
    front = np.where(staff & M, np.maximum(front, 0.55 + 1.2 * ramp(150, 330, Yo) + 0.35), front)
    back = -(0.25 + 0.5 * infl / ZC)
    back = np.minimum(back, front - 0.12) if False else back
else:
    Yo = py
    front = infl + 0.0
    back = -(0.15 + 0.75 * infl)
rr = np.clip(rel / (np.percentile(np.abs(rel[M]), 90) + 1e-6), -1, 1)
front = front + AMP * rr * np.clip(D / 3.0, 0, 1)                     # carve folds / muscle / face from the shading (not at the very edge)
front = np.maximum(front, back + 0.14)
# ---- encode ----
cells = col[M]
pal_im = Image.fromarray(np.clip(cells, 0, 255).astype(np.uint8).reshape(-1, 1, 3)).quantize(48, method=Image.MEDIANCUT)
pal = pal_im.getpalette()[:48 * 3]; pal = [tuple(pal[i:i + 3]) for i in range(0, len(pal), 3)]
pal_arr = np.array(pal, float)
chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
fmin, fmax = float(front[M].min()), float(front[M].max()); kmin, kmax = float(back[M].min()), float(back[M].max())
def lev(v, lo, hi): return chars[int(np.clip((v - lo) / (hi - lo + 1e-9), 0, 0.999) * 52)]
cr, fr, kr = [], [], []
for j in range(rows):
    a = b = c = ''
    for i in range(cols):
        if not M[j, i]: a += '.'; b += '.'; c += '.'; continue
        k = int(np.argmin(((pal_arr - col[j, i]) ** 2).sum(1))); a += chars[k]; b += lev(front[j, i], fmin, fmax); c += lev(back[j, i], kmin, kmax)
    cr.append(a); fr.append(b); kr.append(c)
js = "const %s = {cols:%d,rows:%d,s:%.5f,fr:[%.3f,%.3f],kr:[%.3f,%.3f],pal:[%s],\n c:[%s],\n f:[%s],\n k:[%s]};\n" % (
    name, cols, rows, S, fmin, fmax, kmin, kmax, ','.join('0x%02x%02x%02x' % tuple(int(v) for v in q) for q in pal),
    ',\n'.join("'%s'" % r for r in cr), ',\n'.join("'%s'" % r for r in fr), ',\n'.join("'%s'" % r for r in kr))
open(out, 'w').write(js)
print(subject, 'cells', int(M.sum()), 'grid', cols, 'x', rows, 'cell', round(S, 4), 'bytes', len(js))
if len(sys.argv) > 4:
    P = np.full((rows * 4, cols * 4, 3), 255, np.uint8)
    for j in range(rows):
        for i in range(cols):
            if M[j, i]: P[j * 4:j * 4 + 4, i * 4:i * 4 + 4] = np.clip(col[j, i], 0, 255)
    D2 = np.full((rows * 4, cols * 4, 3), 255, np.uint8)
    for j in range(rows):
        for i in range(cols):
            if M[j, i]: D2[j * 4:j * 4 + 4, i * 4:i * 4 + 4] = int(255 * (front[j, i] - fmin) / (fmax - fmin + 1e-9))
    Image.fromarray(np.concatenate([P, D2], 1)).save(sys.argv[4])
