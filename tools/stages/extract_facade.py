#!/usr/bin/env python3
"""Trace a photo of a stepped / panelled facade into a tile grid of tone letters.

usage: extract_facade.py PHOTO.jpg world.js x0 y0 x1 y1 STRIPS COLS ROWS [MARKER]

The photo rectangle (x0,y0)-(x1,y1) is split into STRIPS horizontal bands (one per terrace / course); each band is resampled to
COLS x ROWS cells of tone 'a'..'z' (dark..light, normalised by the 3rd / 97th percentile of the patch). The letters are written
between /*<MARKER>*/ and /*END<MARKER>*/ (default FACADE) in world.js:  const FACADE = {strips, cols, rows, t:[...]};
The game builds each terrace face from these cells (one box per cell), so ledges and recessed panels come from the real stone.
"""
import re, sys
import numpy as np
from PIL import Image
from scipy import ndimage as ndi
src, out = sys.argv[1], sys.argv[2]
x0, y0, x1, y1, strips, cols, rows = (int(v) for v in sys.argv[3:10])
marker = sys.argv[10] if len(sys.argv) > 10 else 'FACADE'
im = np.array(Image.open(src).convert('L')).astype(float)
patch = ndi.gaussian_filter(im[y0:y1, x0:x1], 0.8)
detr = patch - ndi.gaussian_filter(patch, 25)          # remove light / shadow gradients, keep ledges and panels
lo, hi = np.percentile(detr, [3, 97])
H, W = patch.shape
t = []
for s in range(strips):
    ya, yb = s * H / strips, (s + 1) * H / strips
    for r in range(rows):
        ra, rb = int(ya + (yb - ya) * r / rows), max(int(ya + (yb - ya) * (r + 1) / rows), int(ya + (yb - ya) * r / rows) + 1)
        row = ''
        for c in range(cols):
            ca, cb = int(W * c / cols), max(int(W * (c + 1) / cols), int(W * c / cols) + 1)
            v = np.clip((detr[ra:rb, ca:cb].mean() - lo) / (hi - lo), 0, 0.999)
            row += chr(97 + int(v * 26))
        t.append(row)
data = "/*%s*/const FACADE = {strips:%d,cols:%d,rows:%d,t:[\n%s\n]};/*END%s*/" % (marker, strips, cols, rows, ",\n".join("'%s'" % r for r in t), marker)
s = open(out, encoding='utf-8').read()
pat = r"/\*%s\*/.*?/\*END%s\*/" % (marker, marker)
s = re.sub(pat, lambda _: data, s, flags=re.S) if re.search(pat, s, re.S) else s.replace('/*%s-HERE*/' % marker, data)
open(out, 'w', encoding='utf-8').write(s)
print('wrote %d rows x %d cols' % (len(t), cols))
