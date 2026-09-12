import { chromium } from 'playwright';

const base='http://127.0.0.1:4173/';
const checks=[]; const pass=(name,detail='PASS')=>{checks.push({name,ok:true,detail}); console.log(`PASS: ${name} — ${detail}`)};
const fail=(name,detail)=>{checks.push({name,ok:false,detail}); console.error(`FAIL: ${name} — ${detail}`)};
const browser=await chromium.launch({headless:true});
try{
 for (const [label,width,height] of [['desktop',1440,1000],['mobile',390,844]]){
  const page=await browser.newPage({viewport:{width,height}});
  const consoleErrors=[]; const pageErrors=[]; const bad=[];
  page.on('console',m=>{if(m.type()==='error') consoleErrors.push(m.text())});
  page.on('pageerror',e=>pageErrors.push(String(e)));
  page.on('response',r=>{if(r.status()>=400) bad.push(`${r.status()} ${r.url()}`)});
  await page.goto(base,{waitUntil:'networkidle'});
  const metrics=await page.evaluate(()=>({sw:document.documentElement.scrollWidth,cw:document.documentElement.clientWidth,logoH:document.querySelector('.brand-asset img')?.getBoundingClientRect().height||0,heroBtnH:[...document.querySelectorAll('.hero-actions .btn')].map(x=>x.getBoundingClientRect().height),brandText:document.querySelector('.hero-brand-treatment')?.textContent?.replace(/\s+/g,' ').trim()||'',blocks:document.querySelectorAll('#hero-blocks .irrig-block').length}));
  metrics.sw<=metrics.cw+1?pass(`${label} overflow`,`${metrics.sw}/${metrics.cw}`):fail(`${label} overflow`,`${metrics.sw}/${metrics.cw}`);
  if(label==='desktop'){
    metrics.logoH>=44?pass('desktop header logo size',String(metrics.logoH)):fail('desktop header logo size',String(metrics.logoH));
    metrics.heroBtnH.every(h=>h>=56)?pass('desktop hero CTA size',metrics.heroBtnH.join(',')):fail('desktop hero CTA size',metrics.heroBtnH.join(','));
    metrics.blocks>=3?pass('hero demo card mass',`${metrics.blocks} blocks`):fail('hero demo card mass',`${metrics.blocks} blocks`);
  } else {
    metrics.logoH>=36?pass('mobile header logo size',String(metrics.logoH)):fail('mobile header logo size',String(metrics.logoH));
  }
  metrics.brandText==='BB610 WATER'?pass(`${label} branded hero treatment`,metrics.brandText):fail(`${label} branded hero treatment`,metrics.brandText);
  consoleErrors.length?fail(`${label} console`,consoleErrors.join(' | ')):pass(`${label} console`,'none');
  pageErrors.length?fail(`${label} JS`,pageErrors.join(' | ')):pass(`${label} JS`,'none');
  bad.length?fail(`${label} assets`,bad.join(' | ')):pass(`${label} assets`,'none');
  await page.close();
 }
} finally { await browser.close(); }
if(checks.some(x=>!x.ok)) process.exit(1);
console.log('R23 HERO REVIEW PASS');
