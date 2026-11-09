#!/usr/bin/env python3
"""Phase 0 helper: list countries, stages and difference labels from the legacy bundle.
Heuristic regex over minified code. Output must be verified by hand in Phase 4/5.
Usage: python3 -I tools/phase0/extract_inventory.py legacy/Worlds-Apart-Offline.html"""
import re, sys, json
s = open(sys.argv[1], encoding="utf-8").read()
countries = re.findall(r'\{id:"([a-z]+)",name:"([^"]+)",music:(\d+),flag:"[^"]+",threshold:(\d+)\}', s)
stages = re.findall(r'\{id:"([a-z-]+)",countryId:"([a-z]+)",name:"([^"]+)",builder:(\d+)', s)
print(json.dumps({"countries": countries, "stages": stages}, indent=1))
