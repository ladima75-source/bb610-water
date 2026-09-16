import { chromium } from 'playwright';
import fs from 'node:fs/promises';

const url='https://water.bb610.com.ua/docs/website/staging/#fertigation';
await fs.mkdir('artifacts/task2461',{recursive:true});
const browser=await chromium.launch({headless:true});
const consoleErrors=[];

async function capture(width,height,name){
  const page=await browser.newPage({viewport:{width,height},deviceScaleFactor:1});
  page.on('console',m=>{if(m.type()==='error') consoleErrors.push(`${name}: ${m.text()}`)});
  page.on('pageerror',e=>consoleErrors.push(`${name}: pageerror ${e.message}`));
  await page.goto(url,{waitUntil:'networkidle',timeout:120000});
  await page.locator('#fertigation').scrollIntoViewIfNeeded();
  await page.waitForTimeout(1500);
  const metrics=await page.evaluate(()=>{
    const sec=document.querySelector('#fertigation');
    const imgs=[...document.querySelectorAll('#fertigation .t246-shot img')].map(i=>({src:i.currentSrc||i.src,complete:i.complete,naturalWidth:i.naturalWidth,naturalHeight:i.naturalHeight}));
    return {scrollWidth:document.documentElement.scrollWidth,clientWidth:document.documentElement.clientWidth,sectionHeight:sec?.getBoundingClientRect().height||0,imgs};
  });
  console.log(name,JSON.stringify(metrics));
  if(metrics.scrollWidth>metrics.clientWidth+2) throw new Error(`${name}: horizontal overflow ${metrics.scrollWidth}/${metrics.clientWidth}`);
  if(metrics.imgs.length!==2 || metrics.imgs.some(i=>!i.complete||i.naturalWidth<400||i.naturalHeight<400)) throw new Error(`${name}: PULSE images invalid ${JSON.stringify(metrics.imgs)}`);
  await page.locator('#fertigation').screenshot({path:`artifacts/task2461/${name}.png`});
  await page.close();
  return metrics;
}

const desktop=await capture(1440,900,'desktop-1440');
const mobile=await capture(390,844,'mobile-390');
await fs.writeFile('artifacts/task2461/metrics.json',JSON.stringify({desktop,mobile,consoleErrors},null,2));
if(consoleErrors.length) throw new Error(`console errors: ${consoleErrors.join(' | ')}`);
await browser.close();