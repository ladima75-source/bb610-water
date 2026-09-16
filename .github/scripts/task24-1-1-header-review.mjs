import { chromium } from 'playwright';
const base='http://127.0.0.1:4173/docs/website/staging/';
const browser=await chromium.launch({headless:true});
let failed=false;
for(const [name,width,height] of [['desktop',1440,900],['mobile',390,844]]){
  const page=await browser.newPage({viewport:{width,height}}); const errors=[];
  page.on('console',m=>{if(m.type()==='error')errors.push('console:'+m.text())}); page.on('pageerror',e=>errors.push('js:'+e.message)); page.on('requestfailed',r=>errors.push('resource:'+r.url()));
  await page.goto(base,{waitUntil:'networkidle'});
  const data=await page.evaluate(()=>{const brand=document.querySelector('.brand-asset');const heroId=document.querySelector('.hero-product-id');const pseudo=getComputedStyle(brand,'::after').content;const root=document.documentElement;return{pseudo,heroVisible:heroId?getComputedStyle(heroId).display!=='none':false,overflow:root.scrollWidth-root.clientWidth,heroStart:(document.querySelector('#hero-title')?.innerText||'').trim().startsWith('ВИ ВИРІШУЄТЕ'),headerH:document.querySelector('.header')?.getBoundingClientRect().height||0};});
  const checks=[['descriptor',data.pseudo.includes('СИСТЕМА АВТОМАТИЧНОГО ПОЛИВУ ТА ФЕРТИГАЦІЇ'),data.pseudo],['hero id removed',!data.heroVisible,String(data.heroVisible)],['hero starts with headline',data.heroStart,String(data.heroStart)],['no overflow',data.overflow<=1,String(data.overflow)],['compact header',data.headerH<=125,String(data.headerH)],['console/js/resources',errors.length===0,errors.join(' | ')]];
  for(const [label,ok,val] of checks){console.log(`${ok?'PASS':'FAIL'}: ${name} ${label} — ${val}`);if(!ok)failed=true;} await page.close();
}
await browser.close(); if(failed)process.exit(1);
