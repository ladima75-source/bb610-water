import { chromium } from 'playwright';
const browser=await chromium.launch({headless:true});
const cases=[['desktop',1440,900],['mobile',390,844]];
let failed=false;const check=(ok,label,detail='')=>{console.log(`${ok?'PASS':'FAIL'}: ${label}${detail?` — ${detail}`:''}`);if(!ok)failed=true};
for(const [name,width,height] of cases){
 const page=await browser.newPage({viewport:{width,height}});const ce=[],pe=[],bad=[];
 page.on('console',m=>{if(m.type()==='error')ce.push(m.text())});page.on('pageerror',e=>pe.push(String(e)));page.on('response',r=>{if(r.status()>=400)bad.push(`${r.status()} ${r.url()}`)});
 await page.goto('http://127.0.0.1:4173/docs/website/staging/#workday',{waitUntil:'networkidle'});await page.locator('#workday').scrollIntoViewIfNeeded();await page.waitForTimeout(250);
 const d=await page.evaluate(()=>{const s=document.querySelector('#workday');const title=s?.querySelector('h2')?.textContent?.trim()||'';const cards=s?.querySelectorAll('.product-desc-card').length||0;const prose=s?.querySelector('.product-desc-prose')?.textContent||'';const vol=s?.querySelector('.product-desc-emphasis strong')?.textContent?.trim()||'';const volText=s?.querySelector('.product-desc-emphasis p')?.textContent?.trim()||'';const close=s?.querySelector('.product-desc-close')?.textContent?.trim()||'';const txt=s?.textContent||'';const rect=s?.getBoundingClientRect();const proseRect=s?.querySelector('.product-desc-prose')?.getBoundingClientRect();return{title,cards,prose,vol,volText,close,txt,overflow:document.documentElement.scrollWidth-document.documentElement.clientWidth,height:rect?.height||0,proseWidth:proseRect?.width||0}});
 check(d.title==='ЩО ТАКЕ BB610 WATER',`${name} title`,d.title);
 check(d.cards===0,`${name} no feature cards`,String(d.cards));
 check(d.prose.includes('готова модульна система автоматизації')&&d.prose.includes('малим і середнім господарствам'),`${name} unified product description`);
 check(d.prose.includes('BB610 PULS MOBILE')&&d.prose.includes('BB610 PULS'),`${name} PULS controls`);
 check(d.vol==='ПОЛИВ ЗА ФАКТИЧНИМ ОБ’ЄМОМ',`${name} volume emphasis`,d.vol);
 check(d.volText==='Полив за часом також збережений — система все одно показує фактичний об’єм поданої води.',`${name} time mode explanation`,d.volText);
 check(d.close==='Один комплект — обладнання, автоматика та програмне керування поливом і фертигацією.',`${name} closing line`,d.close);
 check(name!=='desktop'||d.proseWidth<=800,`${name} readable line width`,String(Math.round(d.proseWidth)));
 check(d.overflow<=1,`${name} no horizontal overflow`,String(d.overflow));
 check(d.height>500,`${name} readable section height`,String(Math.round(d.height)));
 check(ce.length===0,`${name} console`,ce.join(' | '));check(pe.length===0,`${name} JS`,pe.join(' | '));check(bad.length===0,`${name} resources`,bad.join(' | '));
 await page.close();
}
await browser.close();if(failed)process.exit(1);console.log('TASK 24.2.1 SECOND SCREEN REVIEW PASS');
