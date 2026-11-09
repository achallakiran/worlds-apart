# Photo-tracing method for voxel models (how the Christ the Redeemer statue was made)

Procedural folds, tubes and hand-placed coarse voxels all looked wrong. Tracing the real photo worked. The statue's head, arms, torso and skirt
are all built this way, and the same method fits any landmark you have a clear photo of.

## Recipe
1. **Pick one clear, mostly frontal photo per part** (full statue for body and arms, a close-up for the face). Sky must differ in colour from the subject.
2. **Mask the subject.** Sky is blue, stone/statue is olive or grey: use `R-B > 10` (olive statue) or HSV saturation `< 0.28` (white/grey stone). Fill holes, open/close,
   keep the largest connected component (removes cloud specks).
3. **Calibrate scale.** Pixels per model unit = photo extent / known model extent (e.g. 350 px for the 16.8-unit arm span -> 20.8 px/unit). Anchor one vertical reference
   (top of the sleeve = y 13.3). Mind mirroring: in this game `+X` is the viewer's left, so photo-left maps to `+X`.
4. **Sample a grid of cells** (0.06 units for body, 0.04 for the face). For each cell inside the mask read:
   - **tone** = smoothed luminance, normalised by percentiles to 26 levels (`a`..`z`),
   - **relief** = luminance minus a large Gaussian blur (detrended shading = folds, eye sockets, grooves), 26 levels centred on `n`.
5. **Store as text rows** (`.` = empty) in `world.js` between `/*ARMDATA*/` markers. The generator rewrites that block (`tools/stages/extract_arm_relief.py`).
   Only derived data is committed, not the photo.
6. **Rebuild as one block per cell** at runtime: box x/y = cell, depth from a rounded section
   (superellipse across the row's width, or vertical rounding for sleeves) plus `relief * amplitude`; colour = palette ladder indexed by tone.
   Back of the part is the mirrored smooth depth (no relief needed).
7. **Join parts by blending depth** (torso depth fades to the sleeve depth across the shoulders) so seams do not show.
8. **Merge everything into one flat-colour vertex-coloured mesh** with per-face shade factors, so every part shares the same colour pipeline (no face/body tone mismatch)
   and the draw cost stays one mesh.

## Pitfalls we hit
- Mixed render paths (lit blocks next to flat-colour lamps) -> different tones; use one mesh and one colour pipeline.
- Coarser grain than neighbouring parts looks "pixelated" next to the face; keep a common grain (0.04-0.06).
- Procedural stripes (spirals, radial fans) read as "wings" or "scratches"; real cloth folds are irregular, which the photo gives for free.
- Check mirror direction early (mantle/hanging fold were mirrored once).
- Photos taken from below distort verticals a little; fine at this scale, anchor with one known height.
