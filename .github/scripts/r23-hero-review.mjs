import { chromium } from 'playwright';

const base='http://127.0.0.1:4173/docs/website/staging/';
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
  const metrics=await page.evaluate(()=>{
    const q=s=>document.querySelector(s); const qa=s=>[...document.querySelectorAll(s)];
    const logo=q('.brand-asset img')?.getBoundingClientRect();
    const header=q('.header')?.getBoundingClientRect();
    const title=q('#hero-title')?.getBoundingClientRect();
    const queue=q('.queue-shell')?.getBoundingClientRect();
    const groups=qa('#hero-title .hero-title-group').map(x=>x.getBoundingClientRect());
    const mark=q('.hero-official-wordmark')?.getBoundingClientRect();
    const markImg=q('.hero-official-wordmark img');
    return {
      sw:document.documentElement.scrollWidth,cw:document.documentElement.clientWidth,
      logoH:logo?.height||0,logoW:logo?.width||0,headerH:header?.height||0,
      heroBtnH:qa('.hero-actions .btn').map(x=>x.getBoundingClientRect().height),
      headerCtaH:q('.header-cta')?.getBoundingClientRect().height||0,
      wordmarkH:mark?.height||0,wordmarkSrc:markImg?.currentSrc||markImg?.src||'',headerLogoSrc:q('.brand-asset img')?.currentSrc||q('.brand-asset img')?.src||'',
      gap1:groups[0]&&mark?mark.top-groups[0].bottom:0,gap2:groups[1]&&mark?groups[1].top-mark.bottom:0,
      queueAlign:title&&queue?Math.abs(queue.top-title.top):999,
      blocks:document.querySelectorAll('#hero-blocks .irrig-block').length,
      heroBg:getComputedStyle(q('.hero')).backgroundImage
    };
  });
  metrics.sw<=metrics.cw+1?pass(`${label} overflow`,`${metrics.sw}/${metrics.cw}`):fail(`${label} overflow`,`${metrics.sw}/${metrics.cw}`);
  if(label==='desktop'){
    metrics.logoH>=110?pass('desktop official logo prominence',`${metrics.logoW.toFixed(1)}×${metrics.logoH.toFixed(1)} header ${metrics.headerH.toFixed(1)}`):fail('desktop official logo prominence',String(metrics.logoH));
    metrics.headerH>=130?pass('desktop header proportion',String(metrics.headerH)):fail('desktop header proportion',String(metrics.headerH));
    metrics.heroBtnH.length===2&&metrics.heroBtnH.every(h=>h>=68)?pass('desktop HERO CTA size',metrics.heroBtnH.join(',')):fail('desktop HERO CTA size',metrics.heroBtnH.join(','));
    metrics.headerCtaH>=56?pass('desktop header CTA size',String(metrics.headerCtaH)):fail('desktop header CTA size',String(metrics.headerCtaH));
    metrics.queueAlign<=16?pass('queue aligned to H1 top',`${metrics.queueAlign.toFixed(1)}px`):fail('queue aligned to H1 top',`${metrics.queueAlign.toFixed(1)}px`);
    metrics.gap1>=8&&metrics.gap1<=24&&metrics.gap2>=8&&metrics.gap2<=24?pass('HERO semantic vertical rhythm',`${metrics.gap1.toFixed(1)}/${metrics.gap2.toFixed(1)}px`):fail('HERO semantic vertical rhythm',`${metrics.gap1.toFixed(1)}/${metrics.gap2.toFixed(1)}px`);
  } else {
    metrics.logoW>=110&&metrics.logoH>=50?pass('mobile official logo size',`${metrics.logoW.toFixed(1)}×${metrics.logoH.toFixed(1)}`):fail('mobile official logo size',`${metrics.logoW}×${metrics.logoH}`);
    metrics.heroBtnH.length===2&&metrics.heroBtnH.every(h=>h>=60)?pass('mobile HERO CTA size',metrics.heroBtnH.join(',')):fail('mobile HERO CTA size',metrics.heroBtnH.join(','));
  }
  metrics.wordmarkH>0&&metrics.wordmarkSrc===metrics.headerLogoSrc?pass(`${label} HERO uses official WATER asset`,metrics.wordmarkSrc):fail(`${label} HERO uses official WATER asset`,`${metrics.wordmarkSrc} / ${metrics.headerLogoSrc}`);
  metrics.blocks>=3?pass(`${label} HERO demo card mass`,`${metrics.blocks} blocks`):fail(`${label} HERO demo card mass`,`${metrics.blocks} blocks`);
  /radial-gradient/.test(metrics.heroBg)?pass(`${label} HERO atmosphere`,'CSS radial gradients active'):fail(`${label} HERO atmosphere`,metrics.heroBg);
  consoleErrors.length?fail(`${label} console`,consoleErrors.join(' | ')):pass(`${label} console`,'none');
  pageErrors.length?fail(`${label} JS`,pageErrors.join(' | ')):pass(`${label} JS`,'none');
  bad.length?fail(`${label} assets`,bad.join(' | ')):pass(`${label} assets`,'none');
  await page.close();
 }
} finally { await browser.close(); }
if(checks.some(x=>!x.ok)) process.exit(1);
console.log('R23 HERO / HEADER CORRECTION PASS');
