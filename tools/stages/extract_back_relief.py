#!/usr/bin/env python3
"""Trace a REAR photo of the Christ statue into per-cell tone + relief grids for the back of the body, both sleeves and the head,
aligned cell-for-cell with the front grids (BODY / ARM / HEAD) in world.js, and write them between /*BACKDATA*/ markers.
usage: extract_back_relief.py REAR.jpg world.js          (needs node to read the front grids' shapes)"""
import sys, json, subprocess, re
import numpy as np
from PIL import Image
from scipy import ndimage as ndi
photo, wjs = sys.argv[1:3]
src = open(wjs).read()
a, b = src.index('/*ARMDATA*/'), src.index('/*ENDARMDATA*/')
js = src[a:b] + "\nconst occ=(t)=>t.map(r=>r.replace(/[^.]/g,'1'));console.log(JSON.stringify({arm1:occ(ARM['1'].t),arm2:occ(ARM['-1'].t),body:occ(BODY.t),head:occ(HEAD.t),a:{X0:ARM.X0,DX:ARM.DX,YT:ARM.YT,DY:ARM.DY},b:{X0:BODY.X0,DX:BODY.DX,YT:BODY.YT,DY:BODY.DY},h:{X0:HEAD.X0,DX:HEAD.DX,YT:HEAD.YT,DY:HEAD.DY}}))"
open('/tmp/_occ.js', 'w').write(js)
occ = json.loads(subprocess.check_output(['node', '/tmp/_occ.js']))
im = np.asarray(Image.open(photo).convert('RGB')).astype(float)
L = im.mean(2); mx, mn = im.max(2), im.min(2); sat = (mx - mn) / (mx + 1e-6)
m = ndi.gaussian_filter(sat, 1) < 0.35; m[430:] = False
m = ndi.binary_fill_holes(ndi.binary_opening(m, iterations=1))
lab, n = ndi.label(m); m = lab == (1 + int(np.argmax(ndi.sum(m, lab, range(1, n + 1)))))
ys, xs = np.where(m); x0p, x1p, ytop, ybot = xs.min(), xs.max(), ys.min(), 430
CXB = (x0p + x1p) / 2; SCX = (x1p - x0p) / 16.8
# repaint everything outside the statue from the nearest statue pixel so cells that fall just outside the silhouette still get stone tones
_, (iy, ix) = ndi.distance_transform_edt(~ndi.binary_erosion(m, iterations=1), return_indices=True)
Lf = L[iy, ix]
Ls = ndi.gaussian_filter(Lf, 0.8)
def top_at(col):
    c = int(round(col)); yy = np.where(m[:, c])[0]; yy = yy[yy > 130]; return float(yy.min())
ptopR, ptopL = top_at(CXB + 4.3 * SCX), top_at(CXB - 4.3 * SCX)
ptop = (ptopR + ptopL) / 2; SCY = (ybot - ptop) / (13.3 - 0.12)
samp = lambda arr, py, px: ndi.map_coordinates(arr, [[py], [px]], order=1, mode='nearest')[0]
def grid(occrows, X0, DX, YT, DY, fn, sig):
    Ld = Ls - ndi.gaussian_filter(Lf, sig)
    T = np.full((len(occrows), len(occrows[0])), np.nan); Rr = np.zeros_like(T)
    for j, row in enumerate(occrows):
        for i, ch in enumerate(row):
            if ch == '.': continue
            py, px = fn(X0 + i * DX, YT - j * DY, j, i)
            T[j, i] = samp(Ls, py, px); Rr[j, i] = samp(Ld, py, px)
    return T, Rr
def enc(T, Rr, lo, hi, sd):
    t, r = [], []
    for j in range(T.shape[0]):
        t.append(''.join('.' if np.isnan(T[j, i]) else chr(97 + int(np.clip((T[j, i] - lo) / (hi - lo), 0, 0.999) * 26)) for i in range(T.shape[1])))
        r.append(''.join('.' if np.isnan(T[j, i]) else chr(97 + int(np.clip(13 + 12 * Rr[j, i] / (2 * sd), 0, 25))) for i in range(T.shape[1])))
    return t, r
# body (+X = the statue's right = the viewer's right when seen from behind)
bd = occ['body']; Tb, Rb = grid(bd, occ['b']['X0'], occ['b']['DX'], occ['b']['YT'], occ['b']['DY'], lambda X, y, j, i: (ptop + (13.3 - y) * SCY, CXB + X * SCX), 4.0)
# sleeves: statue's right arm = grid '1' = viewer-right in the rear photo
At = {}
for key, sd, pt in (('arm1', 1, ptopR), ('arm2', -1, ptopL)):
    At[key] = grid(occ[key], occ['a']['X0'], occ['a']['DX'], occ['a']['YT'], occ['a']['DY'], lambda X, y, j, i, sd=sd, pt=pt: (pt + (13.3 - y) * SCX, CXB + sd * X * SCX), 4.0)
# head: fit the rear dome onto every row of the front head silhouette (so the head width and height match the model exactly)
hd = occ['head']; hb_top = 125.0
hood = m[:, :].copy(); hood_bot = ptop - 14.0
def blob_extent(py):
    r = m[int(round(py)), int(CXB - 45):int(CXB + 45)]; k = np.where(r)[0]
    return (CXB - 45 + k.min(), CXB - 45 + k.max()) if len(k) else (CXB - 15, CXB + 15)
hb_top = float(np.where(m[:, int(CXB - 20):int(CXB + 20)].any(1))[0].min())
H = occ['h']; nrow = len(hd); Th = np.full((nrow, len(hd[0])), np.nan); Rh = np.zeros_like(Th); Ldh = Ls - ndi.gaussian_filter(Lf, 2.5)
for j, row in enumerate(hd):
    idx = [i for i, c in enumerate(row) if c != '.']
    if not idx: continue
    i0, i1 = idx[0], idx[-1]; cxm = (i0 + i1) / 2; hwm = max(1.0, (i1 - i0) / 2)
    y = H['YT'] - j * H['DY']; f = (16.1 - y) / (16.1 - 13.15)
    py = hb_top + f * (hood_bot - hb_top); lx, rx = blob_extent(py)
    for i in idx:
        u = (i - cxm) / hwm; px = (lx + rx) / 2 + u * (rx - lx) / 2
        Th[j, i] = samp(Ls, py, px); Rh[j, i] = samp(Ldh, py, px)
allT = np.concatenate([Tb[~np.isnan(Tb)], np.concatenate([a[0][~np.isnan(a[0])] for a in At.values()]), Th[~np.isnan(Th)]])
lo, hi = np.percentile(allT, 3), np.percentile(allT, 97)
sd = np.concatenate([Rb[~np.isnan(Tb)], Rh[~np.isnan(Th)]]).std() + 1e-6
tb, rb = enc(Tb, Rb, lo, hi, sd); th, rh = enc(Th, Rh, lo, hi, sd)
a1 = enc(*At['arm1'], lo, hi, sd); a2 = enc(*At['arm2'], lo, hi, sd)
q = lambda rows: ','.join("'%s'" % r for r in rows)
out = "/*BACKDATA*/const BACK = {\n body:{t:[%s],\n r:[%s]},\n head:{t:[%s],\n r:[%s]},\n '1':{t:[%s],\n r:[%s]},\n '-1':{t:[%s],\n r:[%s]}};\n/*ENDBACKDATA*/" % (q(tb), q(rb), q(th), q(rh), q(a1[0]), q(a1[1]), q(a2[0]), q(a2[1]))
if '/*BACKDATA*/' in src:
    i0 = src.index('/*BACKDATA*/'); i1 = src.index('/*ENDBACKDATA*/') + len('/*ENDBACKDATA*/'); src = src[:i0] + out + src[i1:]
else:
    k = src.index('/*ENDARMDATA*/') + len('/*ENDARMDATA*/'); src = src[:k] + '\n' + out + src[k:]
open(wjs, 'w').write(src)
print('rear scale px/unit', round(SCX, 2), 'ptop', ptop, 'SCY', round(SCY, 2), 'head top', hb_top, 'hood bottom', hood_bot)
