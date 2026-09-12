import { chromium } from 'playwright';
const browser=await chromium.launch({headless:true});
const cases=[['desktop',1440,900],['mobile',390,844]];
let failed=false;const check=(ok,label,detail='')=>{console.log(`${ok?'PASS':'FAIL'}: ${label}${detail?` — ${detail}`:''}`);if(!ok)failed=true};
for(const [name,width,height] of cases){
 const page=await browser.newPage({viewport:{width,height}});const ce=[],pe=[],bad=[];
 page.on('console',m=>{if(m.type()==='error')ce.push(m.text())});page.on('pageerror',e=>pe.push(String(e)));page.on('response',r=>{if(r.status()>=400)bad.push(`${r.status()} ${r.url()}`)});
 await page.goto('http://127.0.0.1:4173/docs/website/staging/#workday',{waitUntil:'networkidle'});await page.locator('#workday').scrollIntoViewIfNeeded();await page.waitForTimeout(250);
 const d=await page.evaluate(()=>{const s=document.querySelector('#workday');const title=s?.querySelector('h2')?.textContent?.trim()||'';const cards=s?.querySelectorAll('.product-desc-card').length||0;const cols=[...s.querySelectorAll('.product-desc-column')];const intro=s?.querySelector('.product-desc-intro')?.textContent||'';const txt=s?.textContent||'';const vol=s?.querySelector('.product-desc-emphasis strong')?.textContent?.trim()||'';const volText=s?.querySelector('.product-desc-emphasis p')?.textContent?.trim()||'';const close=s?.querySelector('.product-desc-close')?.textContent?.trim()||'';const rect=s?.getBoundingClientRect();const styles=cols.map(x=>getComputedStyle(x));return{title,cards,colCount:cols.length,intro,txt,vol,volText,close,overflow:document.documentElement.scrollWidth-document.documentElement.clientWidth,height:rect?.height||0,display:cols[0]?.parentElement?getComputedStyle(cols[0].parentElement).gridTemplateColumns:''}});
 check(d.title==='ЩО ТАКЕ BB610 WATER',`${name} title`,d.title);
 check(d.cards===0,`${name} no feature cards`,String(d.cards));
 check(d.intro.includes('готова модульна система автоматизації')&&d.intro.includes('полив, фертигацію, контроль параметрів води'),`${name} intro preserved`);
 check(d.colCount===2,`${name} semantic columns`,String(d.colCount));
 check(d.txt.includes('у ґрунті та у великих контейнерах із субстратом')&&d.txt.includes('малим і середнім господарствам'),`${name} application content preserved`);
 check(d.txt.includes('BB610 PULS MOBILE')&&d.txt.includes('BB610 PULS'),`${name} PULS controls preserved`);
 check(d.vol==='ПОЛИВ ЗА ФАКТИЧНИМ ОБ’ЄМОМ',`${name} volume emphasis`,d.vol);
 check(d.volText==='Полив за часом також збережений — система все одно показує фактичний об’єм поданої води.',`${name} time mode explanation`,d.volText);
 check(d.close==='Один комплект — обладнання, автоматика та програмне керування поливом і фертигацією.',`${name} closing line`,d.close);
 if(name==='desktop'){check(d.display.split(' ').filter(Boolean).length>=2,`${name} balanced two-column layout`,d.display);check(d.height<=1350,`${name} section <= 1.5 viewport`,String(Math.round(d.height)));check(d.height>=720,`${name} section not overcompressed`,String(Math.round(d.height)))}
 check(d.overflow<=1,`${name} no horizontal overflow`,String(d.overflow));
 check(ce.length===0,`${name} console`,ce.join(' | '));check(pe.length===0,`${name} JS`,pe.join(' | '));check(bad.length===0,`${name} resources`,bad.join(' | '));
 await page.close();
}
await browser.close();if(failed)process.exit(1);console.log('TASK 24.2.2 SECOND SCREEN REVIEW PASS');
