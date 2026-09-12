import { chromium } from 'playwright';
const browser=await chromium.launch({headless:true});
const cases=[['desktop',1440,900],['mobile',390,844]];
let failed=false;
const check=(ok,label,detail='')=>{console.log(`${ok?'PASS':'FAIL'}: ${label}${detail?` — ${detail}`:''}`);if(!ok)failed=true};
for(const [name,width,height] of cases){
 const page=await browser.newPage({viewport:{width,height}});const ce=[],pe=[],bad=[];
 page.on('console',m=>{if(m.type()==='error')ce.push(m.text())});page.on('pageerror',e=>pe.push(String(e)));page.on('response',r=>{if(r.status()>=400)bad.push(`${r.status()} ${r.url()}`)});
 await page.goto('http://127.0.0.1:4173/docs/website/staging/#architecture',{waitUntil:'networkidle'});await page.locator('#architecture').scrollIntoViewIfNeeded();await page.waitForTimeout(300);
 const d=await page.evaluate(()=>{const s=document.querySelector('#architecture');const mods=[...s.querySelectorAll('.architecture24-module')];const imgs=mods.map(m=>m.querySelector('img'));const cs=getComputedStyle(s.querySelector('.architecture24-modules'));return{title:s.querySelector('h2')?.textContent?.trim()||'',text:s.textContent||'',workdayTitle:document.querySelector('#workday h2')?.textContent?.trim()||'',heroTitle:document.querySelector('#hero-title')?.textContent?.replace(/\s+/g,' ').trim()||'',mods:mods.length,cols:cs.gridTemplateColumns,overflow:document.documentElement.scrollWidth-document.documentElement.clientWidth,imgs:imgs.map(i=>({src:i?.getAttribute('src')||'',w:i?.naturalWidth||0,h:i?.naturalHeight||0,complete:i?.complete||false}))}});
 check(d.workdayTitle==='ЩО ТАКЕ BB610 WATER',`${name} screen 2 preserved`,d.workdayTitle);
 check(d.heroTitle.includes('ВИ ВИРІШУЄТЕ')&&d.heroTitle.includes('ПІДЖИВЛЕННЯ'),`${name} HERO preserved`);
 check(d.title==='З ЧОГО СКЛАДАЄТЬСЯ BB610 WATER',`${name} heading`,d.title);
 check(d.mods===3,`${name} three modules`,String(d.mods));
 check(d.text.includes('Одна система — три фізичні модулі та програмне керування.'),`${name} subheading`);
 check(d.text.includes('CONTROL + HYDRAULIC + ZONE + PULS + MOBILE працюють як єдина система BB610 WATER.'),`${name} system summary`);
 check(d.text.includes('Поза системою:')&&d.text.includes('У складі BB610 WATER:'),`${name} system boundary`);
 check(d.text.includes('BB610 PULS')&&d.text.includes('BB610 PULS MOBILE'),`${name} software`);
 check(d.imgs.every(i=>i.complete&&i.w>0&&i.h>0),`${name} all module images decoded`,JSON.stringify(d.imgs));
 check(d.imgs.some(i=>i.src.includes('промышленный_контроллер_bb610_water.png'))&&d.imgs.some(i=>i.src.includes('промышленный_блок_гидравлического_фертигационного.png'))&&d.imgs.some(i=>i.src.includes('промышленный_коллектор_управления_поливом.png')),`${name} required filenames`);
 if(name==='desktop')check(d.cols.trim().split(' ').length===3,`${name} three-column grid`,d.cols);
 if(name==='mobile')check(d.cols.trim().split(' ').length===1,`${name} one-column grid`,d.cols);
 check(d.overflow<=1,`${name} no horizontal overflow`,String(d.overflow));
 check(ce.length===0,`${name} console`,ce.join(' | '));check(pe.length===0,`${name} JS`,pe.join(' | '));check(bad.length===0,`${name} resources`,bad.join(' | '));
 await page.screenshot({path:`task24-3-${name}.png`,fullPage:true});await page.close();
}
await browser.close();if(failed)process.exit(1);console.log('TASK 24.3 THIRD SCREEN REVIEW PASS');
