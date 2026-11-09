#!/usr/bin/env python3
"""Inject the Jordan/Petra stage into the legacy single-file bundle.

Bridge tool for the legacy-bundle period only: the refactor replaces it with the stage
package contract. It patches minified names, so every anchor is asserted before use.

Usage: python3 -I tools/stages/inject_petra.py LEGACY.html STAGE.js MUSIC.mp3 OUT.html
"""
import base64, re, sys

legacy, stage_js, music, out = sys.argv[1:5]
s = open(legacy, encoding="utf-8").read()
code = open(stage_js, encoding="utf-8").read()

def once(text, needle):
    assert text.count(needle) == 1, f"anchor not unique/found: {needle[:70]!r} ({text.count(needle)})"

# 1. engine bindings must still exist under the minified names
for pat, what in [
    (r",WA=class extends Pg\{constructor\(A=new lt,g=new \$A\)", "Mesh"),
    (r",\$A=class extends Tt\{constructor\(A\)\{super\(\),this\.isMeshBasicMaterial", "MeshBasicMaterial"),
    (r",wo=class extends YB\{constructor\(A,g,o=0,B=2\)\{super\(A,g\),this\.isPointLight", "PointLight"),
    (r"var wA=class\{constructor\(A,g,o\)\{return this\.isColor", "Color"),
    (r"function Xt\(t,A,g,o=0\)\{let B=Math\.hypot", "pathStep"),
    (r"var Jf=\(t,A\)=>!A\|\|A\.some", "inWindow"),
    (r"Jg=\(t,A\)=>\{let g=Math\.sin\(t\*127\.1\+A\*311\.7\)", "hash"),
]:
    assert re.search(pat, s), f"engine anchor missing: {what}"

# 2. stage object, created just before the stage registry
registry_old = "[EM,rM,UM,wM,qM,RM,FM,dM,LM,_M].map(t=>Object.freeze(t))"
once(s, "var XQ=Object.freeze(" + registry_old)
bindings = ("{Mesh:WA,BasicMaterial:$A,PointLight:wo,Color:wA,Vector3:j,"
            "hash:(a,b)=>Jg(a,b),pathStep:(a,b,c,d)=>Xt(a,b,c,d),inWindow:(a,b)=>Jf(a,b)}")
stage_decl = "var PETRA_STAGE=(function(){" + code + "\nreturn createPetraStage(" + bindings + ");})();"
s = s.replace("var XQ=Object.freeze(" + registry_old,
              stage_decl + "var XQ=Object.freeze([EM,rM,UM,wM,qM,RM,FM,dM,LM,_M,PETRA_STAGE].map(t=>Object.freeze(t))", 1)

# 3. country list
country_old = r'{id:"taiwan",name:"Taiwan",music:9,flag:"\u{1F1F9}\u{1F1FC}",threshold:0}]'
once(s, country_old)
s = s.replace(country_old, country_old[:-1] + r',{id:"jordan",name:"Jordan",music:10,flag:"\u{1F1EF}\u{1F1F4}",threshold:0}]', 1)

# 4. scenery selection entry with opening cameras
m = re.search(r'\{id:"taiwan-taipei-afterglow",countryId:"taiwan",name:"Taipei Afterglow",builder:10,opening:\{.*?\}\}\}\]', s)
assert m, "taiwan scenery entry not found"
entry = ('{id:"jordan-petra-treasury",countryId:"jordan",name:"Rose City of Petra",builder:11,opening:{'
         'landscape:{yaw:.5,phi:1.04,zoom:1.45,tx:-1,tz:-1,ty:7.5},portrait:{yaw:.46,phi:1.02,zoom:1.4,tx:-1,tz:-1,ty:7.5}}}')
s = s[:m.end() - 1] + "," + entry + "]" + s[m.end():]

# 5. music: append a track (index 10)
i = s.index("hs=[") + 4
pos = i
count = 0
while s[pos] != "]":
    q = s[pos]; assert q in "\"'`"
    pos = s.index(q, pos + 1) + 1
    count += 1
    if s[pos] == ",": pos += 1
assert count == 10, f"expected 10 tracks, found {count}"
b64 = base64.b64encode(open(music, "rb").read()).decode()
s = s[:pos] + ',"' + b64 + '"' + s[pos:]

open(out, "w", encoding="utf-8").write(s)
print("wrote", out, len(s), "bytes")
