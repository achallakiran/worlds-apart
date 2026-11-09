import sys, json, time
from playwright.sync_api import sync_playwright
src, outdir = sys.argv[1], sys.argv[2]
INIT = """
window.__dc=0; window.__frames=0;
for (const C of [WebGL2RenderingContext, WebGLRenderingContext]) {
  for (const f of ['drawElements','drawArrays','drawElementsInstanced','drawArraysInstanced']) {
    const o=C.prototype[f]; if(!o) continue;
    C.prototype[f]=function(...a){window.__dc++; return o.apply(this,a)};
  }
}
"""
countries=["china","japan","india","egypt","italy","france","mongolia","korea","taiwan"]
res={}
with sync_playwright() as p:
    b=p.chromium.launch(executable_path="/usr/bin/google-chrome",headless=True,args=["--no-sandbox","--use-angle=swiftshader","--enable-unsafe-swiftshader","--ignore-gpu-blocklist"])
    pg=b.new_page(viewport={"width":844,"height":390})
    errs=[]
    pg.on("pageerror", lambda e: errs.append(str(e)[:200]))
    pg.add_init_script(INIT)
    t0=time.time(); pg.goto("file://"+src); pg.wait_for_selector("#start"); res["load_s"]=round(time.time()-t0,2)
    pg.wait_for_timeout(2500)
    for c in countries:
        pg.goto("file://"+src); pg.wait_for_selector("#start"); pg.wait_for_timeout(2000)
        pg.click("#openCollection"); pg.wait_for_timeout(600)
        pg.click(f'[data-country="{c}"]'); pg.wait_for_timeout(700)
        pg.click('#sceneryCards .scenery-card'); pg.wait_for_timeout(6000)
        info=pg.evaluate("""async()=>{
          const dots=document.querySelectorAll('#dots .discovery').length;
          window.__dc=0; let n=0; const t=performance.now();
          await new Promise(r=>{const f=()=>{n++; if(performance.now()-t<4000) requestAnimationFrame(f); else r()}; requestAnimationFrame(f)});
          const ms=performance.now()-t;
          return {dots, frames:n, fps:+(n/ms*1000).toFixed(2), drawCallsPerFrame:+(window.__dc/n).toFixed(0), country:document.querySelector('#country')?.textContent}
        }""")
        pg.screenshot(path=f"{outdir}/{c}.png")
        res[c]=info; print(c,info,flush=True)
    res["errors"]=errs
    json.dump(res,open(f"{outdir}/metrics.json","w"),indent=1)
    b.close()
