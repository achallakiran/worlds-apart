#!/bin/sh
# Bridge build for the legacy-bundle period: legacy baseline + every stage package -> release/offline and root index.html.
# Replaced by the real pipeline in Phase 1/6 of the refactor plan; the stage packages are meant to carry over unchanged.
set -e
cd "$(dirname "$0")/../.."
python3 -I tools/stages/build_stages.py legacy/Worlds-Apart-Offline.html release/offline/Worlds-Apart-Offline.html src/stages
cp release/offline/Worlds-Apart-Offline.html index.html
(cd release/offline && sha256sum Worlds-Apart-Offline.html > SHA256SUMS)
