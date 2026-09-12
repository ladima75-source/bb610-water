import { chromium } from 'playwright';

const browser = await chromium.launch({headless:true});
const cases = [
  ['desktop',1440,900],
  ['laptop',1280,800],
  ['mobile',390,844],
];
let failed = false;
const check = (ok,label,detail='') => { console.log(`${ok?'PASS':'FAIL'}: ${label}${detail?` — ${detail}`:''}`); if(!ok) failed=true; };
for (const [name,width,height] of cases){
  const page = await browser.newPage({viewport:{width,height}});
  const consoleErrors=[]; const pageErrors=[]; const bad=[];
  page.on('console',m=>{if(m.type()==='error')consoleErrors.push(m.text())});
  page.on('pageerror',e=>pageErrors.push(String(e)));
  page.on('response',r=>{if(r.status()>=400)bad.push(`${r.status()} ${r.url()}`)});
  await page.goto('http://127.0.0.1:4173/docs/website/staging/#architecture',{waitUntil:'networkidle'});
  await page.locator('#architecture').scrollIntoViewIfNeeded();
  await page.waitForTimeout(150);
  const data = await page.evaluate(()=>{
    const section=document.querySelector('#architecture');
    const eyebrow=section?.querySelector('.eyebrow')?.textContent?.trim()||'';
    const note=document.querySelector('#arch-zone-note')?.textContent?.trim()||'';
    const cards=[...document.querySelectorAll('#arch-items article')];
    const imgs=cards.map(c=>c.querySelector('.module-media img')?.getBoundingClientRect()).filter(Boolean).map(r=>({top:r.top,bottom:r.bottom,left:r.left,right:r.right,height:r.height,width:r.width}));
    const caps=cards.map(c=>c.querySelector('.module-media figcaption')?.getBoundingClientRect()).filter(Boolean).map(r=>({top:r.top,bottom:r.bottom,left:r.left,right:r.right,height:r.height,width:r.width}));
    const body=document.documentElement;
    return {eyebrow,note,count:cards.length,imgs,caps,overflow:body.scrollWidth-body.clientWidth};
  });
  check(data.eyebrow==='АРХІТЕКТУРА ПРОДУКТУ',`${name} eyebrow`,data.eyebrow);
  check(data.note.includes('до 16 логічних зон')&&!data.note.includes('36'),`${name} 16-zone note`,data.note);
  check(data.count===3,`${name} architecture cards`,String(data.count));
  if(width>1024){
    const tops=data.imgs.map(x=>x.top), bottoms=data.imgs.map(x=>x.bottom), capTops=data.caps.map(x=>x.top);
    const edgeDiffs=data.caps.map((c,i)=>({left:Math.abs(c.left-data.imgs[i].left),right:Math.abs(c.right-data.imgs[i].right)}));
    check(Math.max(...tops)-Math.min(...tops)<=2,`${name} media top alignment`,tops.map(x=>x.toFixed(1)).join('/'));
    check(Math.max(...bottoms)-Math.min(...bottoms)<=2,`${name} media bottom alignment`,bottoms.map(x=>x.toFixed(1)).join('/'));
    check(Math.max(...capTops)-Math.min(...capTops)<=2,`${name} caption line alignment`,capTops.map(x=>x.toFixed(1)).join('/'));
    check(edgeDiffs.every(x=>x.left<=1&&x.right<=1),`${name} caption/media edge alignment`,edgeDiffs.map(x=>`${x.left.toFixed(1)}/${x.right.toFixed(1)}`).join(' | '));
  }
  check(data.overflow<=1,`${name} no horizontal overflow`,String(data.overflow));
  check(consoleErrors.length===0,`${name} console`,consoleErrors.join(' | '));
  check(pageErrors.length===0,`${name} JS`,pageErrors.join(' | '));
  check(bad.length===0,`${name} resources`,bad.join(' | '));
  await page.close();
}
await browser.close();
if(failed) process.exit(1);
console.log('ARCHITECTURE SCREEN 3 REVIEW PASS');
