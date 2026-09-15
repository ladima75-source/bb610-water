import { chromium } from 'playwright';
import fs from 'node:fs/promises';

const url='https://water.bb610.com.ua/';
await fs.mkdir('artifacts/task25',{recursive:true});
const browser=await chromium.launch({headless:true});
const consoleErrors=[];

async function capture(width,height,name){
  const page=await browser.newPage({viewport:{width,height},deviceScaleFactor:1});
  page.on('console',m=>{if(m.type()==='error') consoleErrors.push(`${name}: ${m.text()}`)});
  page.on('pageerror',e=>consoleErrors.push(`${name}: pageerror ${e.message}`));
  await page.goto(url,{waitUntil:'networkidle',timeout:120000});
  await page.waitForTimeout(1200);
  const metrics=await page.evaluate(()=>({
    scrollWidth:document.documentElement.scrollWidth,
    clientWidth:document.documentElement.clientWidth,
    title:document.title,
    robots:document.querySelector('meta[name="robots"]')?.content||'',
    h1:document.querySelector('h1')?.textContent?.trim()||'',
    sections:[...document.querySelectorAll('main>section')].map(s=>s.id||s.className),
    scripts:[...document.scripts].map(s=>s.src).filter(Boolean),
    pulseImgs:[...document.querySelectorAll('#process img,#capabilities img,#pulse img')].map(i=>({src:i.currentSrc||i.src,complete:i.complete,naturalWidth:i.naturalWidth,naturalHeight:i.naturalHeight}))
  }));
  console.log(name,JSON.stringify(metrics));
  if(metrics.scrollWidth>metrics.clientWidth+2) throw new Error(`${name}: horizontal overflow ${metrics.scrollWidth}/${metrics.clientWidth}`);
  if(metrics.sections.length!==7) throw new Error(`${name}: expected 7 main sections, got ${metrics.sections.length}`);
  if(!metrics.h1) throw new Error(`${name}: empty H1`);
  if(!metrics.robots.includes('index')) throw new Error(`${name}: robots meta is not indexable: ${metrics.robots}`);
  if(metrics.title.toLowerCase().includes('staging')) throw new Error(`${name}: staging remains in title`);
  if(metrics.scripts.some(s=>/asset-integration|task24-/i.test(s))) throw new Error(`${name}: legacy runtime script still loaded ${JSON.stringify(metrics.scripts)}`);
  if(metrics.pulseImgs.length<3 || metrics.pulseImgs.some(i=>!i.complete||i.naturalWidth<300||i.naturalHeight<100)) throw new Error(`${name}: invalid PULSE assets ${JSON.stringify(metrics.pulseImgs)}`);
  await page.screenshot({path:`artifacts/task25/${name}.png`,fullPage:true});
  await page.close();
  return metrics;
}

const desktop=await capture(1440,900,'desktop-1440');
const mobile=await capture(390,844,'mobile-390');
await fs.writeFile('artifacts/task25/metrics.json',JSON.stringify({desktop,mobile,consoleErrors},null,2));
if(consoleErrors.length) throw new Error(`console errors: ${consoleErrors.join(' | ')}`);
await browser.close();
