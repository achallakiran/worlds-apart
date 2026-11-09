#!/bin/sh
# Bridge build for the legacy-bundle period: legacy baseline + Petra -> release/offline and root index.html.
# Replaced by the real pipeline in Phase 1/6 of docs/phase0 plan.
set -e
cd "$(dirname "$0")/../.."
python3 -I tools/stages/inject_petra.py legacy/Worlds-Apart-Offline.html src/stages/jordan/petra/stage.js src/stages/jordan/petra/music.mp3 release/offline/Worlds-Apart-Offline.html
cp release/offline/Worlds-Apart-Offline.html index.html
(cd release/offline && sha256sum Worlds-Apart-Offline.html > SHA256SUMS)
