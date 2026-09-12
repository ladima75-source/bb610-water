import { chromium } from 'playwright';
const browser=await chromium.launch({headless:true});
const cases=[['desktop',1440,900],['mobile',390,844]];
let failed=false;const check=(ok,label,detail='')=>{console.log(`${ok?'PASS':'FAIL'}: ${label}${detail?` — ${detail}`:''}`);if(!ok)failed=true};
for(const [name,width,height] of cases){
 const page=await browser.newPage({viewport:{width,height}});const ce=[],pe=[],bad=[];
 page.on('console',m=>{if(m.type()==='error')ce.push(m.text())});page.on('pageerror',e=>pe.push(String(e)));page.on('response',r=>{if(r.status()>=400)bad.push(`${r.status()} ${r.url()}`)});
 await page.goto('http://127.0.0.1:4173/docs/website/staging/#workday',{waitUntil:'networkidle'});await page.locator('#workday').scrollIntoViewIfNeeded();await page.waitForTimeout(250);
 const d=await page.evaluate(()=>{const s=document.querySelector('#workday');const title=s?.querySelector('h2')?.textContent?.trim()||'';const cards=[...s.querySelectorAll('.product-desc-card')].map(x=>x.textContent.trim());const vol=s?.querySelector('.volume-panel strong')?.textContent?.trim()||'';const close=s?.querySelector('.product-desc-close')?.textContent?.trim()||'';const txt=s?.textContent||'';const rect=s?.getBoundingClientRect();return{title,cards,vol,close,txt,overflow:document.documentElement.scrollWidth-document.documentElement.clientWidth,height:rect?.height||0}});
 check(d.title==='ЩО ТАКЕ BB610 WATER',`${name} title`,d.title);
 check(d.cards.length===4,`${name} four meaning blocks`,String(d.cards.length));
 check(d.vol==='ПОЛИВ ЗА ФАКТИЧНИМ ОБ’ЄМОМ',`${name} volume emphasis`,d.vol);
 check(d.txt.includes('Полив за часом')&&d.txt.includes('фактичний об’єм'),`${name} time mode explanation`);
 check(d.txt.includes('BB610 PULS MOBILE')&&d.txt.includes('BB610 PULS'),`${name} PULS controls`);
 check(d.close==='Один комплект — обладнання, автоматика та програмне керування поливом і фертигацією.',`${name} closing line`,d.close);
 check(d.overflow<=1,`${name} no horizontal overflow`,String(d.overflow));
 check(d.height>400,`${name} readable section height`,String(Math.round(d.height)));
 check(ce.length===0,`${name} console`,ce.join(' | '));check(pe.length===0,`${name} JS`,pe.join(' | '));check(bad.length===0,`${name} resources`,bad.join(' | '));
 await page.close();
}
await browser.close();if(failed)process.exit(1);console.log('TASK 24.2 SECOND SCREEN REVIEW PASS');
