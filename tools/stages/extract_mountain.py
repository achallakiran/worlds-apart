#!/usr/bin/env python3
"""Trace a diorama / landscape photo into an embedded colour grid for a voxel mountain.

usage: extract_mountain.py BLOCK_PHOTO.jpg world.js [x0 y0 x1 y1 step]

Produces, between /*MTNDATA*/ and /*ENDMTNDATA*/ in world.js:
  MTN = { X0, Y0, STEP, rows: [...] }   one char per STEP x STEP pixel cell
  char '.'      -> background (not part of the landform)
  'a'..'p'      -> rock, dark to light
  'q'..'z'      -> moss / forest green, dark to light
The game projects each voxel of the landform to the photo (same isometric view as the default camera) and reads its colour class + tone,
so the voxel mountain inherits the photo's strata, ridges, green flanks and cliff faces.
Photo itself is not committed; only the derived letters.
"""
import re, sys
import numpy as np
from PIL import Image
from scipy import ndimage as ndi

src, out = sys.argv[1], sys.argv[2]
x0, y0, x1, y1, step = (int(v) for v in sys.argv[3:8]) if len(sys.argv) >= 8 else (60, 10, 440, 240, 4)
im = np.array(Image.open(src).convert('RGB')).astype(float)
bg = np.median(np.concatenate([im[:12].reshape(-1, 3), im[:, :12].reshape(-1, 3), im[:, -12:].reshape(-1, 3)]), axis=0)
d = np.sqrt(((im - bg) ** 2).sum(2))
m = d > 55
m = ndi.binary_closing(m, iterations=2); m = ndi.binary_fill_holes(m); m = ndi.binary_opening(m, iterations=2)
lab, _ = ndi.label(m)
m = lab == lab[40, 285]                      # the component that holds the summit

R, G, B = im[..., 0], im[..., 1], im[..., 2]
lum = ndi.gaussian_filter(0.3 * R + 0.59 * G + 0.11 * B, 1.0)
green = ndi.gaussian_filter((G - R > 1.5).astype(float), 1.5) > 0.5
lo, hi = np.percentile(lum[m], [3, 97])
rows = []
for y in range(y0, y1, step):
    row = ''
    for x in range(x0, x1, step):
        cell = m[y:y + step, x:x + step]
        if cell.mean() < 0.5:
            row += '.'; continue
        t = float(np.clip((lum[y:y + step, x:x + step][cell].mean() - lo) / (hi - lo), 0, 0.999))
        gr = green[y:y + step, x:x + step][cell].mean() > 0.5
        row += chr((ord('q') if gr else ord('a')) + int(t * 10))
    rows.append(row)
data = "/*MTNDATA*/const MTN = {X0:%d,Y0:%d,STEP:%d,rows:[\n%s\n]};/*ENDMTNDATA*/" % (
    x0, y0, step, ",\n".join("'%s'" % r for r in rows))
s = open(out, encoding='utf-8').read()
if '/*MTNDATA*/' in s:
    s = re.sub(r"/\*MTNDATA\*/.*?/\*ENDMTNDATA\*/", lambda _: data, s, flags=re.S)
else:
    s = s.replace('/*MTNDATA-HERE*/', data)
open(out, 'w', encoding='utf-8').write(s)
print('grid %dx%d cells, rock/green split %.0f%%' % (len(rows[0]), len(rows), 100 * sum(c >= 'q' for r in rows for c in r) / max(1, sum(c != '.' for r in rows for c in r))))
