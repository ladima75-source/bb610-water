import { chromium } from 'playwright';
import fs from 'node:fs';

const base = process.env.R21_BASE_URL || 'http://127.0.0.1:4173/docs/website/staging/';
const out = 'docs/website/review/r21/screenshots';
fs.mkdirSync(out,{recursive:true});
const results=[];
const failures=[];
const pass=(name,detail='PASS')=>{results.push({name,status:'PASS',detail});console.log(`PASS: ${name}${detail==='PASS'?'':` — ${detail}`}`)};
const fail=(name,detail)=>{results.push({name,status:'FAIL',detail});failures.push(`${name}: ${detail}`);console.error(`FAIL: ${name} — ${detail}`)};
const assert=(cond,name,detail='')=>cond?pass(name,detail||'PASS'):fail(name,detail||'assertion failed');

const browser=await chromium.launch({headless:true});
async function open(viewport){
  const context=await browser.newContext({viewport,deviceScaleFactor:1});
  const page=await context.newPage();
  const consoleErrors=[]; const pageErrors=[]; const badResponses=[];
  page.on('console',m=>{if(m.type()==='error')consoleErrors.push(m.text())});
  page.on('pageerror',e=>pageErrors.push(String(e)));
  page.on('response',r=>{if(r.status()>=400)badResponses.push(`${r.status()} ${r.url()}`)});
  await page.goto(base,{waitUntil:'networkidle'});
  await page.waitForFunction(()=>document.querySelector('#config-code')?.textContent?.includes('BB610 WATER'));
  return {context,page,consoleErrors,pageErrors,badResponses};
}

const desktop=await open({width:1440,height:1000});
const p=desktop.page;
assert(desktop.consoleErrors.length===0,'desktop console errors',desktop.consoleErrors.join(' | ')||'none');
assert(desktop.pageErrors.length===0,'desktop JS errors',desktop.pageErrors.join(' | ')||'none');
assert(desktop.badResponses.length===0,'desktop broken HTTP resources',desktop.badResponses.join(' | ')||'none');
const brokenImages=await p.locator('img').evaluateAll(imgs=>imgs.filter(i=>!i.complete||i.naturalWidth===0).map(i=>i.getAttribute('src')));
assert(brokenImages.length===0,'desktop broken images',brokenImages.join(', ')||'none');
const anchors=await p.locator('a[href^="#"]').evaluateAll(as=>as.map(a=>a.getAttribute('href')).filter(Boolean));
const missingAnchors=await p.evaluate(hrefs=>hrefs.filter(h=>h!=='#'&&!document.querySelector(h)),anchors);
assert(missingAnchors.length===0,'navigation anchors',missingAnchors.join(', ')||'all targets present');
const catalog=await p.evaluate(()=>({rows:window.BB610_COMMERCIAL_CATALOG?.rows?.length,por:window.BB610_COMMERCIAL_CATALOG?.rows?.filter(r=>r.priceState==='PRICE_ON_REQUEST').length,models:window.R121_COMMERCIAL?.versions?.length,zones:window.R121_COMMERCIAL?.zones?.length}));
assert(catalog.rows===21&&catalog.models===7&&catalog.zones===3,'commercial 7 models × 3 zones',JSON.stringify(catalog));
assert(catalog.por===6,'commercial PRICE_ON_REQUEST rows',`count=${catalog.por}`);
const matrix=await p.evaluate(()=>({rows:document.querySelectorAll('#commercial-body tr').length,cols:document.querySelectorAll('#commercial-head th').length,por:document.querySelectorAll('.por-badge').length}));
assert(matrix.rows===7&&matrix.cols===4&&matrix.por===6,'rendered commercial matrix',JSON.stringify(matrix));
await p.locator('[data-ec="0"]').click();
assert((await p.locator('#config-code').textContent()).includes('F1-P'),'configurator F1-P selection',await p.locator('#config-code').textContent());
assert((await p.locator('#config-price').textContent()).includes('Ціна за запитом'),'F1-P price on request',await p.locator('#config-price').textContent());
assert((await p.locator('#discuss-config').textContent()).includes('Запросити ціну'),'F1-P CTA',await p.locator('#discuss-config').textContent());
await p.locator('[data-fert="2"]').click();
assert((await p.locator('#config-code').textContent()).includes('F2-P'),'configurator F2-P selection',await p.locator('#config-code').textContent());
assert((await p.locator('#config-price').textContent()).includes('Ціна за запитом'),'F2-P price on request',await p.locator('#config-price').textContent());
const puls=await p.locator('#puls').innerText();
assert(!/null|undefined|візуал готується/i.test(puls),'PULS graceful review state','no null/broken placeholder language');
const scriptText=await p.evaluate(async()=>{const urls=['app.js','asset-integration.js','data/commercial.js','data/content.js'];return(await Promise.all(urls.map(u=>fetch(u).then(r=>r.text())))).join('\n')});
assert(!/localhost|127\.0\.0\.1/i.test(scriptText),'public runtime has no localhost/dev endpoint','clean');
await p.screenshot({path:`${out}/r21_desktop_full_1440.png`,fullPage:true});
for(const [id,file] of [['#top','r21_desktop_hero_1440.png'],['#architecture','r21_desktop_modules_1440.png'],['#how-it-works','r21_desktop_how_it_works_1440.png'],['#versions','r21_desktop_versions_1440.png'],['#configurator','r21_desktop_configurator_1440.png'],['#puls','r21_desktop_software_1440.png'],['#contact','r21_desktop_final_cta_1440.png']]) await p.locator(id).screenshot({path:`${out}/${file}`});
await desktop.context.close();

for(const viewport of [{width:1024,height:900},{width:768,height:900},{width:390,height:844},{width:360,height:800}]){
  const t=await open(viewport); const page=t.page;
  const overflow=await page.evaluate(()=>({sw:document.documentElement.scrollWidth,cw:document.documentElement.clientWidth}));
  assert(overflow.sw<=overflow.cw+1,`no page overflow ${viewport.width}px`,`${overflow.sw}/${overflow.cw}`);
  assert(t.consoleErrors.length===0,`console errors ${viewport.width}px`,t.consoleErrors.join(' | ')||'none');
  assert(t.pageErrors.length===0,`JS errors ${viewport.width}px`,t.pageErrors.join(' | ')||'none');
  if(viewport.width<=768){await page.locator('#menu').click();assert(await page.locator('#nav').isVisible(),`mobile menu ${viewport.width}px`,'opens');await page.locator('#nav a').first().click();assert((await page.locator('#menu').getAttribute('aria-expanded'))==='false',`mobile menu closes ${viewport.width}px`,'closes after navigation')}
  if(viewport.width===390){await page.screenshot({path:`${out}/r21_mobile_full_390.png`,fullPage:true});for(const [id,file] of [['#top','r21_mobile_hero_390.png'],['#architecture','r21_mobile_modules_390.png'],['#how-it-works','r21_mobile_how_it_works_390.png'],['#versions','r21_mobile_versions_390.png'],['#configurator','r21_mobile_configurator_390.png'],['#puls','r21_mobile_software_390.png']]) await page.locator(id).screenshot({path:`${out}/${file}`})}
  await t.context.close();
}

const report=['# R21 rendered staging validation','',`Base URL: \`${base}\``,'',...results.map(r=>`- **${r.status}** — ${r.name}: ${r.detail}`),'',`Result: **${failures.length?'FAIL':'PASS'}**`,''];
fs.mkdirSync('docs/website/review/r21',{recursive:true});
fs.writeFileSync('docs/website/review/r21/VALIDATION.md',report.join('\n'));
fs.writeFileSync('docs/website/review/r21/validation.json',JSON.stringify({base,results,failures},null,2));
await browser.close();
if(failures.length){console.error(failures.join('\n'));process.exit(1)}
