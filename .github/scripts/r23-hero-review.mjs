import { chromium } from 'playwright';

const base='http://127.0.0.1:4173/docs/website/staging/';
const checks=[]; const pass=(name,detail='PASS')=>{checks.push({name,ok:true,detail}); console.log(`PASS: ${name} — ${detail}`)};
const fail=(name,detail)=>{checks.push({name,ok:false,detail}); console.error(`FAIL: ${name} — ${detail}`)};
const browser=await chromium.launch({headless:true});
try{
 for (const [label,width,height] of [['desktop',1440,900],['laptop',1280,800],['mobile',390,844]]){
  const page=await browser.newPage({viewport:{width,height}});
  const consoleErrors=[]; const pageErrors=[]; const bad=[];
  page.on('console',m=>{if(m.type()==='error') consoleErrors.push(m.text())});
  page.on('pageerror',e=>pageErrors.push(String(e)));
  page.on('response',r=>{if(r.status()>=400) bad.push(`${r.status()} ${r.url()}`)});
  await page.goto(base,{waitUntil:'networkidle'});
  const metrics=await page.evaluate(()=>{
    const q=s=>document.querySelector(s); const qa=s=>[...document.querySelectorAll(s)];
    const logo=q('.brand-asset img')?.getBoundingClientRect(); const header=q('.header')?.getBoundingClientRect();
    const hero=q('.hero')?.getBoundingClientRect(); const title=q('#hero-title')?.getBoundingClientRect(); const queue=q('.queue-shell')?.getBoundingClientRect();
    const mark=q('.hero-inline-logo'); const markRect=mark?.getBoundingClientRect(); const markImg=q('.hero-inline-logo img');
    const brandLine=q('.hero-promise-brand'); const brandLineRect=brandLine?.getBoundingClientRect(); const queueLabel=q('.queue-label')?.textContent?.trim()||'';
    return {
      sw:document.documentElement.scrollWidth,cw:document.documentElement.clientWidth,
      logoH:logo?.height||0,logoW:logo?.width||0,headerH:header?.height||0,
      heroTop:hero?.top||0,heroBottom:hero?.bottom||0,
      heroBtnH:qa('.hero-actions .btn').map(x=>x.getBoundingClientRect().height),headerCtaH:q('.header-cta')?.getBoundingClientRect().height||0,
      markW:markRect?.width||0,markH:markRect?.height||0,markSrc:markImg?.currentSrc||markImg?.src||'',markNaturalW:markImg?.naturalWidth||0,markImgCount:mark?.querySelectorAll('img').length||0,
      brandLineW:brandLineRect?.width||0, brandLineH:brandLineRect?.height||0,
      promiseLines:qa('.hero-title-promise .hero-promise-line').map(x=>x.innerText.trim()),
      queueAlign:title&&queue?Math.abs(queue.top-title.top):999,queueLabel,blocks:document.querySelectorAll('#hero-blocks .irrig-block').length,
      heroBg:getComputedStyle(q('.hero')).backgroundImage
    };
  });
  metrics.sw<=metrics.cw+1?pass(`${label} overflow`,`${metrics.sw}/${metrics.cw}`):fail(`${label} overflow`,`${metrics.sw}/${metrics.cw}`);
  if(label==='desktop'){
    metrics.logoW>=195?pass('desktop header logo prominence',`${metrics.logoW.toFixed(1)}×${metrics.logoH.toFixed(1)}`):fail('desktop header logo prominence',String(metrics.logoW));
    metrics.headerH<=120?pass('desktop compact header',`${metrics.headerH.toFixed(1)}px`):fail('desktop compact header',`${metrics.headerH.toFixed(1)}px`);
    metrics.heroTop<=120?pass('desktop no excessive top whitespace',`${metrics.heroTop.toFixed(1)}px`):fail('desktop no excessive top whitespace',`${metrics.heroTop.toFixed(1)}px`);
    metrics.heroBottom<=835?pass('desktop first-screen compactness',`${metrics.heroBottom.toFixed(1)}px @ 900 viewport`):fail('desktop first-screen compactness',`${metrics.heroBottom.toFixed(1)}px @ 900 viewport`);
    metrics.heroBtnH.length===2&&metrics.heroBtnH.every(h=>h>=58)?pass('desktop HERO CTA size',metrics.heroBtnH.join(',')):fail('desktop HERO CTA size',metrics.heroBtnH.join(','));
    metrics.headerCtaH>=52?pass('desktop header CTA size',String(metrics.headerCtaH)):fail('desktop header CTA size',String(metrics.headerCtaH));
    metrics.queueAlign<=30?pass('desktop left/right balance',`${metrics.queueAlign.toFixed(1)}px`):fail('desktop left/right balance',`${metrics.queueAlign.toFixed(1)}px`);
  }
  if(label==='laptop') metrics.heroBottom<=790?pass('laptop first-screen compactness',`${metrics.heroBottom.toFixed(1)}px @ 800 viewport`):fail('laptop first-screen compactness',`${metrics.heroBottom.toFixed(1)}px @ 800 viewport`);
  if(label==='mobile'){
    metrics.logoW>=110?pass('mobile header logo size',`${metrics.logoW.toFixed(1)}×${metrics.logoH.toFixed(1)}`):fail('mobile header logo size',`${metrics.logoW}×${metrics.logoH}`);
    metrics.heroBtnH.length===2&&metrics.heroBtnH.every(h=>h>=58)?pass('mobile HERO CTA size',metrics.heroBtnH.join(',')):fail('mobile HERO CTA size',metrics.heroBtnH.join(','));
  }
  metrics.markImgCount===1&&metrics.markNaturalW>0&&/bb610-water-horizontal-logo\.webp(?:$|\?)/.test(metrics.markSrc)?pass(`${label} inline approved WATER asset`,`${metrics.markW.toFixed(1)}×${metrics.markH.toFixed(1)}`):fail(`${label} inline approved WATER asset`,`${metrics.markSrc} natural=${metrics.markNaturalW}`);
  metrics.markH>0&&metrics.brandLineH>0&&metrics.markH<=metrics.brandLineH*0.9?pass(`${label} wordmark matches headline line`,`${metrics.markH.toFixed(1)}px / line ${metrics.brandLineH.toFixed(1)}px`):fail(`${label} wordmark matches headline line`,`${metrics.markH.toFixed(1)} / ${metrics.brandLineH.toFixed(1)}`);
  metrics.promiseLines.length===3&&metrics.promiseLines[0].includes('БЕРЕ НА СЕБЕ')&&metrics.promiseLines[1]==='РУТИНУ ПОЛИВУ'&&metrics.promiseLines[2]==='ТА ПІДЖИВЛЕННЯ'?pass(`${label} deliberate promise breaks`,metrics.promiseLines.join(' / ')):fail(`${label} deliberate promise breaks`,JSON.stringify(metrics.promiseLines));
  metrics.queueLabel==='ПРИКЛАД ПОЛИВНИХ ЗАВДАНЬ-БЛОКІВ'?pass(`${label} queue heading`,metrics.queueLabel):fail(`${label} queue heading`,metrics.queueLabel);
  metrics.blocks>=3?pass(`${label} HERO demo card`,`${metrics.blocks} blocks`):fail(`${label} HERO demo card`,`${metrics.blocks} blocks`);
  /radial-gradient/.test(metrics.heroBg)?pass(`${label} HERO atmosphere`,'CSS radial gradients active'):fail(`${label} HERO atmosphere`,metrics.heroBg);
  consoleErrors.length?fail(`${label} console`,consoleErrors.join(' | ')):pass(`${label} console`,'none');
  pageErrors.length?fail(`${label} JS`,pageErrors.join(' | ')):pass(`${label} JS`,'none');
  bad.length?fail(`${label} assets`,bad.join(' | ')):pass(`${label} assets`,'none');
  await page.close();
 }
} finally { await browser.close(); }
if(checks.some(x=>!x.ok)) process.exit(1);
console.log('TASK 23 HERO REFINEMENT R1 PASS');
