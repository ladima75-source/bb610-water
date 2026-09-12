import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const LIVE='https://water.bb610.com.ua/';
const checks=[]; const failures=[];
const pass=(n,d='PASS')=>{checks.push({n,status:'PASS',d});console.log(`PASS: ${n} — ${d}`)};
const fail=(n,d)=>{checks.push({n,status:'FAIL',d});failures.push(`${n}: ${d}`);console.error(`FAIL: ${n} — ${d}`)};
const assert=(c,n,d='')=>c?pass(n,d||'PASS'):fail(n,d||'assertion failed');
const browser=await chromium.launch({headless:true});
mkdirSync('artifacts/task23',{recursive:true});
async function open(width,height){
 const context=await browser.newContext({viewport:{width,height}}); const page=await context.newPage();
 const consoleErrors=[],pageErrors=[],bad=[];
 page.on('console',m=>{if(m.type()==='error')consoleErrors.push(m.text())});
 page.on('pageerror',e=>pageErrors.push(String(e)));
 page.on('response',r=>{if(r.status()>=400 && new URL(r.url()).hostname==='water.bb610.com.ua') bad.push(`${r.status()} ${r.url()}`)});
 await page.goto(`${LIVE}?task23=${Date.now()}`,{waitUntil:'networkidle',timeout:60000});
 await page.waitForSelector('#architecture',{timeout:30000});
 return {context,page,consoleErrors,pageErrors,bad};
}
const desktop=await open(1440,900); const p=desktop.page;
assert(await p.locator('#architecture').count()===1,'R21 architecture section is live');
assert(await p.locator('#how-it-works').count()===1,'R21 HOW IT WORKS section is live');
assert(await p.locator('#versions').count()===1,'R21 versions section is live');
assert(await p.locator('#configurator').count()===1,'R21 configurator is live');
assert(desktop.consoleErrors.length===0,'desktop console errors',desktop.consoleErrors.join(' | ')||'none');
assert(desktop.pageErrors.length===0,'desktop JS errors',desktop.pageErrors.join(' | ')||'none');
assert(desktop.bad.length===0,'desktop broken WATER resources',desktop.bad.join(' | ')||'none');
const imgs=await p.locator('img').evaluateAll(xs=>xs.filter(x=>!x.complete||x.naturalWidth===0).map(x=>x.src));
assert(imgs.length===0,'broken images',imgs.join(' | ')||'none');
const hero=await p.evaluate(()=>({
  queue:document.querySelector('.queue-label')?.textContent?.trim()||'',
  inlineLogo:document.querySelector('.hero-inline-logo img')?.naturalWidth||0,
  heroBottom:document.querySelector('.hero')?.getBoundingClientRect().bottom||9999,
  promise:[...document.querySelectorAll('.hero-title-promise .hero-promise-line')].map(x=>x.innerText.trim())
}));
assert(hero.queue==='ПРИКЛАД ПОЛИВНИХ ЗАВДАНЬ-БЛОКІВ','TASK 23 queue title live',hero.queue);
assert(hero.inlineLogo>0,'TASK 23 inline WATER logo live',String(hero.inlineLogo));
assert(hero.heroBottom<=835,'TASK 23 desktop hero compactness',`${hero.heroBottom.toFixed(1)}px`);
assert(hero.promise.length===3,'TASK 23 promise structure live',hero.promise.join(' / '));
const catalog=await p.evaluate(()=>({rows:window.BB610_COMMERCIAL_CATALOG?.rows?.length,por:window.BB610_COMMERCIAL_CATALOG?.rows?.filter(r=>r.priceState==='PRICE_ON_REQUEST').length,models:window.R121_COMMERCIAL?.versions?.length,zones:window.R121_COMMERCIAL?.zones?.length}));
assert(catalog.rows===21&&catalog.por===6&&catalog.models===7&&catalog.zones===3,'commercial fallback 21/15/6',JSON.stringify(catalog));
await p.locator('[data-ec="0"]').click();
assert((await p.locator('#config-code').textContent()).includes('F1-P'),'F1-P configurator live',await p.locator('#config-code').textContent());
assert((await p.locator('#config-price').textContent()).includes('Ціна за запитом'),'F1-P PRICE_ON_REQUEST live',await p.locator('#config-price').textContent());
const runtime=await p.evaluate(async()=>Promise.all(['/app.js','/data/commercial.js','/data/content.js'].map(x=>fetch(`${x}?task23=${Date.now()}`).then(r=>r.text()))).then(x=>x.join('\n')));
assert(!/localhost|127\.0\.0\.1/i.test(runtime),'no localhost/dev endpoints','clean');
const overflow=await p.evaluate(()=>[document.documentElement.scrollWidth,document.documentElement.clientWidth]);
assert(overflow[0]<=overflow[1]+1,'desktop overflow',overflow.join('/'));
await p.screenshot({path:'artifacts/task23/live-desktop-1440.png',fullPage:false});
await desktop.context.close();

const laptop=await open(1280,800); const l=laptop.page;
const lof=await l.evaluate(()=>[document.documentElement.scrollWidth,document.documentElement.clientWidth,document.querySelector('.hero')?.getBoundingClientRect().bottom||9999]);
assert(lof[0]<=lof[1]+1,'laptop overflow',`${lof[0]}/${lof[1]}`);
assert(lof[2]<=790,'laptop hero compactness',`${lof[2].toFixed(1)}px`);
assert(laptop.consoleErrors.length===0,'laptop console errors',laptop.consoleErrors.join(' | ')||'none');
assert(laptop.pageErrors.length===0,'laptop JS errors',laptop.pageErrors.join(' | ')||'none');
await l.screenshot({path:'artifacts/task23/live-laptop-1280.png',fullPage:false});
await laptop.context.close();

const mobile=await open(390,844); const m=mobile.page;
const mof=await m.evaluate(()=>[document.documentElement.scrollWidth,document.documentElement.clientWidth]);
assert(mof[0]<=mof[1]+1,'mobile 390 overflow',mof.join('/'));
await m.locator('#menu').click(); assert(await m.locator('#nav').isVisible(),'mobile menu opens');
assert(mobile.consoleErrors.length===0,'mobile console errors',mobile.consoleErrors.join(' | ')||'none');
assert(mobile.pageErrors.length===0,'mobile JS errors',mobile.pageErrors.join(' | ')||'none');
await m.screenshot({path:'artifacts/task23/live-mobile-390.png',fullPage:false});
await mobile.context.close();

const endpoints=[['Admin','https://admin.water.bb610.com.ua/'],['API health','https://api.water.bb610.com.ua/health'],['Market','https://market.bb610.com.ua/'],['Market API','https://api.market.bb610.com.ua/']];
for(const [name,url] of endpoints){try{const r=await fetch(url,{redirect:'manual'});assert(r.status>0&&r.status<500,`${name} reachable`,`HTTP ${r.status}`)}catch(e){fail(`${name} reachable`,String(e))}}
await browser.close();
if(failures.length){console.error('\n'+failures.join('\n'));process.exit(1)}
console.log('TASK 23 LIVE VALIDATION PASS');
