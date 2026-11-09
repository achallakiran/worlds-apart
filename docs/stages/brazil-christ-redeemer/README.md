# Brazil — Christ the Redeemer (`brazil-christ-redeemer`)

New country (Brazil, original bossa-nova score: `tools/stages/make_brazil_music.py`).
Built from the user's reference photos (statue, Corcovado peak, Sugarloaf bay, pixel-art sunset, Minecraft build).

## Layout
Statue at the centre of the map on a granite peak and paved terrace; jungle ridges around; bay + Sugarloaf at the back;
city on the east plain; cog railway climbing the east slope. Differences are spread evenly around the statue.

| # | Angle | Difference | Kind | When |
|---|-------|------------|------|------|
| 0 | 0°   | Macaw on the statue's hand | presence | any |
| 1 | 36°  | City tower sign colour (same white by day; cyan / pink at night) | colour | night |
| 2 | 72°  | Souvenir stall umbrella colour | colour | any |
| 3 | 108° | Palm trees: three or two | count | any |
| 4 | 144° | Terrace lamp colour (identical by day; cyan / amber at night) | colour | night |
| 5 | 180° | Kiosk roof: pitched or flat | shape | any |
| 6 | 216° | Floodlight beam colour (warm white / mint at night) | colour | night |
| 7 | 252° | Sailboats in the bay: four or two | count | any |
| 8 | ~300° | Sugarloaf summit beacon (red / green at night) | colour | night |
| 9 | 324° | Cliff waterfall: flowing or dry | presence | any |

Night-only differences never pop in or out: they exist all day and simply look identical until dusk
(`nightOnly` + `hintPhase`, no `event` window).

## Story / effects
Mist banks orbit the peak; cog train climbs and returns; tour helicopter circles (blinking nav light, searchlight at night);
macaws wheel by day; tourists walk the terrace; at dusk the statue, terrace lamps, city windows and train light up;
at night four floodlight columns, three sweeping searchlights and fireworks over the bay.

## Notes
- `E.hash` is not initialised when the stage factory runs: never call it at factory time (pads are computed lazily).
- Verified: loads, 10 dots, hint → tap finds 3/10, no console errors; draw load comparable to other stages.
- Not verified: iPhone Safari touch/audio, real FPS, tapping every night-only difference by hand.
