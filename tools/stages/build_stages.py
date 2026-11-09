#!/usr/bin/env python3
"""Bridge build: inject every stage package under src/stages into the legacy bundle.

Package layout (src/stages/<country>/<scenery>/):
  stage.json        metadata: id, name, builder alias, order, sky, camera openings, panda, lamps, atmosphere,
                    optional "country" block (only for a country the legacy bundle does not have), optional "music"
  world.js          defines createStage(engine) -> { build, animate, height, water, updateLighting }
  differences.json  catalogue of the 10 differences (validated against world.js)
  music.mp3         optional; used only when the package introduces a new country

The legacy bundle is minified, so every anchor is asserted. This tool is a bridge for the period before the
refactor; the same package files are meant to survive into the real build pipeline.

Usage: python3 -I tools/stages/build_stages.py LEGACY.html OUT.html [STAGES_DIR]
"""
import base64, glob, json, os, re, sys

legacy, out = sys.argv[1], sys.argv[2]
stages_dir = sys.argv[3] if len(sys.argv) > 3 else "src/stages"
s = open(legacy, encoding="utf-8").read()

def fail(msg):
    sys.exit("ERROR: " + msg)

def once(text, needle):
    if text.count(needle) != 1:
        fail(f"anchor not unique/found: {needle[:70]!r} ({text.count(needle)})")

# ---------- engine anchors (minified names) ----------
for pat, what in [
    (r",WA=class extends Pg\{constructor\(A=new lt,g=new \$A\)", "Mesh"),
    (r",\$A=class extends Tt\{constructor\(A\)\{super\(\),this\.isMeshBasicMaterial", "MeshBasicMaterial"),
    (r",wo=class extends YB\{constructor\(A,g,o=0,B=2\)\{super\(A,g\),this\.isPointLight", "PointLight"),
    (r"var wA=class\{constructor\(A,g,o\)\{return this\.isColor", "Color"),
    (r"function Xt\(t,A,g,o=0\)\{let B=Math\.hypot", "pathStep"),
    (r"var Jf=\(t,A\)=>!A\|\|A\.some", "inWindow"),
    (r"Jg=\(t,A\)=>\{let g=Math\.sin\(t\*127\.1\+A\*311\.7\)", "hash"),
]:
    if not re.search(pat, s):
        fail("engine anchor missing: " + what)

# ---------- load and validate packages ----------
packages = []
for sj in sorted(glob.glob(os.path.join(stages_dir, "*", "*", "stage.json"))):
    d = os.path.dirname(sj)
    cfg = json.load(open(sj, encoding="utf-8"))
    world = open(os.path.join(d, "world.js"), encoding="utf-8").read()
    diffs = json.load(open(os.path.join(d, "differences.json"), encoding="utf-8"))
    name = cfg.get("id", d)
    for key in ("id", "name", "builder", "profile", "order", "baseSky", "pandaPosition", "lamps", "opening", "countryId" if "country" not in cfg else "country"):
        if key not in cfg:
            fail(f"{name}: stage.json missing '{key}'")
    cfg.setdefault("countryId", cfg["country"]["id"] if "country" in cfg else None)
    if sorted(x["index"] for x in diffs) != list(range(10)):
        fail(f"{name}: differences.json must list indexes 0-9 exactly once")
    for x in diffs:
        if not re.search(r"\bB\(\s*%d\s*," % x["index"], world):
            fail(f"{name}: world.js has no makeDiff call for index {x['index']}")
        if x["title"] not in world:
            fail(f"{name}: title '{x['title']}' not found in world.js")
        if x.get("availability") == "night" and "setup(%d," % x["index"] not in world and "(%d," % x["index"] not in world:
            fail(f"{name}: night difference {x['index']} is not configured")
    if "createStage" not in world:
        fail(f"{name}: world.js must define createStage")
    packages.append((cfg, world, d))

ids = [c["id"] for c, _, _ in packages]
builders = [c["builder"] for c, _, _ in packages]
if len(set(ids)) != len(ids) or len(set(builders)) != len(builders):
    fail("stage ids and builder numbers must be unique")
if any(re.search(r'id:"%s"' % re.escape(i), s[:10340000]) for i in ids):
    fail("a package id already exists in the legacy bundle")
used = set(int(x) for x in re.findall(r"builder:(\d+),profile", s[:10340000]))
if used & set(builders):
    fail(f"builder numbers clash with legacy stages: {sorted(used & set(builders))}")
packages.sort(key=lambda p: p[0]["order"])

# ---------- generate stage objects ----------
engine = ("var STAGE_ENGINE={Mesh:WA,BasicMaterial:$A,PointLight:wo,Color:wA,Vector3:j,"
          "hash:(a,b)=>Jg(a,b),pathStep:(a,b,c,d)=>Xt(a,b,c,d),inWindow:(a,b)=>Jf(a,b)};")
decls, names = [], []
for i, (cfg, world, d) in enumerate(packages):
    f, st = cfg["lamps"]["from"], cfg["lamps"]["step"]
    lamp = f"i=>[{f[0]}+i*{st[0]},{f[1]}+i*{st[1]},{f[2]}+i*{st[2]}]"
    extra = (
        "{id:%s,countryId:%s,builder:%d,profile:%d,baseSky:%d,pandaPosition:%s,discoveryExtras:false,extraPositions:[],"
        "lampPosition:%s,starCount:%d,roundMoon:%s,atmosphere:%s}"
        % (json.dumps(cfg["id"]), json.dumps(cfg["countryId"]), cfg["builder"], cfg["profile"], int(cfg["baseSky"], 16),
           json.dumps(cfg["pandaPosition"]), lamp, cfg.get("starCount", 60), "true" if cfg.get("roundMoon", True) else "false",
           json.dumps(cfg.get("atmosphere", {"waterSpots": [], "cloudCount": 8, "cloudAltitude": 26, "birdAltitude": 28})))
    )
    if cfg.get("fog"):
        extra = extra[:-1] + ",fog:%s}" % cfg["fog"]
    n = f"STAGE_{i}"
    names.append(n)
    decls.append(f"var {n}=(function(){{{world}\nreturn Object.assign(createStage(STAGE_ENGINE),{extra});}})();")

registry_old = "[EM,rM,UM,wM,qM,RM,FM,dM,LM,_M].map(t=>Object.freeze(t))"
once(s, "var XQ=Object.freeze(" + registry_old)
s = s.replace("var XQ=Object.freeze(" + registry_old,
              engine + "".join(decls) + "var XQ=Object.freeze([EM,rM,UM,wM,qM,RM,FM,dM,LM,_M," + ",".join(names) + "].map(t=>Object.freeze(t))", 1)

# ---------- music (new countries only) ----------
i0 = s.index("hs=[") + 4
pos, count = i0, 0
while s[pos] != "]":
    q = s[pos]
    if q not in "\"'`":
        fail("unexpected music array format")
    pos = s.index(q, pos + 1) + 1
    count += 1
    if s[pos] == ",":
        pos += 1
if count != 10:
    fail(f"expected 10 legacy music tracks, found {count}")
track_index = {}
tracks = ""
for cfg, _, d in packages:
    if "country" in cfg and cfg.get("music"):
        mp3 = os.path.join(d, cfg["music"])
        tracks += ',"' + base64.b64encode(open(mp3, "rb").read()).decode() + '"'
        track_index[cfg["country"]["id"]] = count
        count += 1
s = s[:pos] + tracks + s[pos:]

# ---------- countries ----------
country_tail = r'{id:"taiwan",name:"Taiwan",music:9,flag:"\u{1F1F9}\u{1F1FC}",threshold:0}]'
once(s, country_tail)
added = ""
for cfg, _, d in packages:
    c = cfg.get("country")
    if not c:
        continue
    if re.search(r'\{id:"%s",name:' % re.escape(c["id"]), s[:10350000]) or ('{id:"%s",name:' % c["id"]) in added:
        continue
    music = track_index.get(c["id"])
    if music is None:
        fail(f"new country {c['id']} needs a music file")
    added += ',{id:%s,name:%s,music:%d,flag:"%s",threshold:%d}' % (json.dumps(c["id"]), json.dumps(c["name"]), music, c["flag"], c.get("threshold", 0))
s = s.replace(country_tail, country_tail[:-1] + added + "]", 1)

# ---------- scenery selection entries ----------
m = re.search(r'\{id:"taiwan-taipei-afterglow",countryId:"taiwan",name:"Taipei Afterglow",builder:10,opening:\{.*?\}\}\}\]', s)
if not m:
    fail("taiwan scenery entry not found")
entries = ""
for cfg, _, _ in packages:
    o = cfg["opening"]
    def cam(c):
        return "{yaw:%s,phi:%s,zoom:%s,tx:%s,tz:%s,ty:%s}" % tuple(c[k] for k in ("yaw", "phi", "zoom", "tx", "tz", "ty"))
    entries += ',{id:%s,countryId:%s,name:%s,builder:%d,opening:{landscape:%s,portrait:%s}}' % (
        json.dumps(cfg["id"]), json.dumps(cfg["countryId"]), json.dumps(cfg["name"]), cfg["builder"], cam(o["landscape"]), cam(o["portrait"]))
s = s[:m.end() - 1] + entries + "]" + s[m.end():]

# ---------- per-stage scenery-card thumbnails (the legacy card renderer cannot draw the tall merged stage meshes, so a stage may ship a pre-rendered 640x440 image) ----------
import base64
thumbs = {}
for cfg, _, d in packages:
    t = cfg.get("thumbnail")
    if t and t.get("image"):
        raw = open(os.path.join(d, t["image"]), "rb").read()
        thumbs[cfg["builder"]] = "data:image/jpeg;base64," + base64.b64encode(raw).decode()
if thumbs:
    anchor = "function Bh(t){"
    if s.count(anchor) != 1:
        fail("scenery thumbnail function anchor missing")
    table = "{" + ",".join("%d:%s" % (k, json.dumps(v)) for k, v in thumbs.items()) + "}"
    s = s.replace(anchor, "var __STAGE_THUMBS=%s;function Bh(t){if(__STAGE_THUMBS[t])return __STAGE_THUMBS[t];" % table)

open(out, "w", encoding="utf-8").write(s)
print(f"built {out}: {len(packages)} stage package(s): {', '.join(ids)}; {len(s)} bytes")
