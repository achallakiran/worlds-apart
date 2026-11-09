# Phase 0 — Baseline, provenance and inventory

Date: 9 November 2026. Status: **in progress** (recovery and inventory done; captures and performance not yet taken).

## Provenance
- Repo head at start: `21357e9` (README only). No other branches.
- Baseline artifact: `legacy/Worlds-Apart-Offline.html`, supplied by the owner from the ChatGPT-hosted build. Not modified.
- Size 10,374,543 bytes. SHA-256 `1f72cc868d3dc2fc5f4370c9842983509e0f8f9cef94f588fb08d16b05463399` (also in `legacy/SHA256SUMS`).
- **Original editable source is not available.** Only this bundle exists, so Phase 1 is a reconstruction, not a recovery. Formatting the bundle alone does not satisfy source recovery.
- The ChatGPT site URL could not be fetched from this environment (network allowlist), so the live hosted build and the repo's Pages settings are **unverified**.

## Bundle anatomy
- One `<style>` (about 40 lines, successive overrides: base, "Expedition edition", "Living Days") and one `<script>` IIFE; 4,285 lines, with a single 9.8 MB line holding the bundled code.
- Three.js **r187** (licence header "2010-2026") bundled with the app code in the same IIFE, minified with single-letter names.
- No `fetch(`, no dynamic `import(`, no remote URLs except an XHTML namespace. Offline requirement is already met.
- App code (config, save logic, builders) sits in the last ~35 KB-region of the script plus the stage builders in the middle (roughly offsets 586k to 700k).

## Countries (9) and stages (9, one scenery each)
| Country | Stage ID | Name | Builder | Unlock threshold | Music |
|---|---|---|---|---|---|
| China | china-mountain-lake | Mountain Lake | 0 | 0 | 0 |
| Japan | japan-pagoda-garden | Fuji Blossom Lake | 1 | 150 | 1 |
| India | india-taj-mahal-gardens | Taj Mahal Gardens | 2 | 350 | 2 |
| Egypt | egypt-nile-and-stone | Nile & Stone | 3 | 600 | 3 |
| Italy | italy-piazza-of-wonders | Piazza of Wonders | 4 | 850 | 4 |
| France | france-paris-afterglow | Paris Afterglow | 7 | 1100 | 6 |
| Mongolia | mongolia-steppe-monument | Silver Rider of the Steppe | 9 | 0 | 8 |
| South Korea | korea-gyeongbokgung-palace | Gyeongbokgung Palace | 8 | 0 | 7 |
| Taiwan | taiwan-taipei-afterglow | Taipei Afterglow | 10 | 0 | 9 |

Notes: builder indexes 5 and 6 and music indexes 5 are unused (gaps, likely removed content). Each stage also has landscape/portrait opening camera values. A "globe" title scene has its own save entry and a 200-point reward.

## Save format (key `worlds-apart-v5`, schema `v:5`)
- Fields: `hints` (0 to 3), `hintAt` (timestamp; recharge interval 3 h = 10,800,000 ms), `points`, `scoreBaseline`, `unlocked`, `resume`, `selectedCountry`, `seenHelp`, `settings`, `sceneries[stageId | "globe"] = {found[], earned[], collected, rewarded, panda}`.
- Settings: quality, autoRotate, rotationSpeed, orbitVersion (2), sensitivity, reduced, musicVolume 0.65, ambienceVolume 0.25, effectsVolume 0.6, environment.
- Scoring: 10 per earned difference, +50 scenery reward (+200 globe), +100 golden panda (not globe).
- Legacy keys read/removed: `worlds-apart-v1`, `worlds-apart-v3`. v1 and v3 used 6 differences per scenery and indexed stages by position; v5 uses 10 and stage IDs. Index to ID mapping for v1 is positional (first four stages) and must be preserved in migration tests.
- `unlocked` is currently forced to all countries on load (`ia`), so thresholds are not enforced. Record as current behavior, decide separately whether this is intended.
- Saves are per-origin: nothing transfers from the ChatGPT host or the offline file to GitHub Pages.

## Differences (extracted labels; see `difference-labels.extracted.json`)
Extractor is a regex over minified code, so counts below are **not final**:
- China 6, India 6, Egypt 6, Japan 7 (indexes 6 and 7 missed), Italy 11 (two entries share index 9), France 10, Korea 10, Mongolia 10, Taiwan 10.
- Save schema allows 10 slots per scenery. China has `discoveryExtras` with 4 extra positions, which probably supplies slots 6 to 9. Needs confirmation.
- Mongolia (reported indistinguishable differences): ger entrance, saddle fringe, raised whip, eagle wings, banners, grazing horses, parasol, covered cart, illuminated arches, lantern pair. Several are small or binary and need human visual review in Phase 5.

## Behaviors still unverified
Live Pages state; per-stage gameplay; day/night visibility per difference; audio source (procedural vs embedded) and track list; hint recharge in practice; title globe interactions; real-device (iPhone Safari) touch and audio.

## Not yet done in Phase 0
Fixed-view screenshots; startup, frame time, draw calls and resource counts; defect log from playing each stage; release tag.
