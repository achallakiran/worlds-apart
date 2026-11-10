#!/usr/bin/env python3
"""Trace a statue photo into a coloured voxel grid. Usage: extract_figure.py PHOTO x0 y0 x1 y1 COLS ROWS MODE NAME OUT.js [PREVIEW.png]
MODE: gold  = foreground where red exceeds blue (warm statue on cool sky)
      light = foreground where pixel is bright or warm (pale statue on blue-grey backdrop)
Writes `const NAME = {cols,rows,pal:[hex..],g:[rows of palette chars, '.'=empty]}` (row 0 = top)."""
import sys
from PIL import Image
import numpy as np
p, x0, y0, x1, y1, C, R, mode, name, out = sys.argv[1:11]
x0, y0, x1, y1, C, R = map(int, (x0, y0, x1, y1, C, R))
im = Image.open(p).convert('RGB').crop((x0, y0, x1, y1)); W, H = im.size
a = np.asarray(im).astype(float)
def fg(px):
    r, g, b = px
    if mode == 'gold': return r - b > 14
    return (r + g + b) / 3 > 165 or (r - b > 30 and r > 120)
cells = []; pix = []
for j in range(R):
    row = []
    for i in range(C):
        blk = a[int(j * H / R):max(int((j + 1) * H / R), int(j * H / R) + 1), int(i * W / C):max(int((i + 1) * W / C), int(i * W / C) + 1)].reshape(-1, 3)
        m = np.array([fg(q) for q in blk]); 
        if m.mean() > 0.5: c = blk[m].mean(0); row.append(tuple(int(v) for v in c)); pix.append(c)
        else: row.append(None)
    cells.append(row)
pal_im = Image.fromarray(np.array(pix, dtype=np.uint8).reshape(-1, 1, 3)).quantize(14, method=Image.MEDIANCUT)
pal = pal_im.getpalette()[:14 * 3]; pal = [tuple(pal[i:i + 3]) for i in range(0, len(pal), 3)]
chars = 'abcdefghijklmn'
rows = []; prev = Image.new('RGB', (C * 4, R * 4), (255, 255, 255))
for j in range(R):
    s = ''
    for i in range(C):
        c = cells[j][i]
        if c is None: s += '.'; continue
        k = min(range(len(pal)), key=lambda q: sum((pal[q][t] - c[t]) ** 2 for t in range(3)))
        s += chars[k]
        for yy in range(4):
            for xx in range(4): prev.putpixel((i * 4 + xx, j * 4 + yy), pal[k])
    rows.append(s)
open(out, 'w').write('const %s = {cols:%d,rows:%d,pal:[%s],g:[\n%s\n]};\n' % (name, C, R, ','.join('0x%02x%02x%02x' % q for q in pal), ',\n'.join("'%s'" % r for r in rows)))
if len(sys.argv) > 11: prev.resize((C * 6, R * 6), Image.NEAREST).save(sys.argv[11])
