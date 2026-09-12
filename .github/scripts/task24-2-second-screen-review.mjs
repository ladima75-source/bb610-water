import { chromium } from 'playwright';
const browser=await chromium.launch({headless:true});
const cases=[['desktop',1440,900],['mobile',390,844]];
let failed=false;const check=(ok,label,detail='')=>{console.log(`${ok?'PASS':'FAIL'}: ${label}${detail?` — ${detail}`:''}`);if(!ok)failed=true};
for(const [name,width,height] of cases){
 const page=await browser.newPage({viewport:{width,height}});const ce=[],pe=[],bad=[];
 page.on('console',m=>{if(m.type()==='error')ce.push(m.text())});page.on('pageerror',e=>pe.push(String(e)));page.on('response',r=>{if(r.status()>=400)bad.push(`${r.status()} ${r.url()}`)});
 await page.goto('http://127.0.0.1:4173/docs/website/staging/#workday',{waitUntil:'networkidle'});await page.locator('#workday').scrollIntoViewIfNeeded();await page.waitForTimeout(250);
 const d=await page.evaluate(()=>{const s=document.querySelector('#workday');const shell=s?.querySelector('.product-desc-shell');const title=s?.querySelector('h2')?.textContent?.trim()||'';const txt=s?.textContent||'';const cards=s?.querySelectorAll('.product-desc-card').length||0;const columns=s?.querySelector('.product-desc-columns');const emphasis=s?.querySelector('.product-desc-emphasis');const rect=s?.getBoundingClientRect();const shellRect=shell?.getBoundingClientRect();const csCols=columns?getComputedStyle(columns):null;const csEmp=emphasis?getComputedStyle(emphasis):null;return{title,txt,cards,overflow:document.documentElement.scrollWidth-document.documentElement.clientWidth,height:rect?.height||0,shellWidth:shellRect?.width||0,columnsDisplay:csCols?.display||'',gridTemplate:csCols?.gridTemplateColumns||'',empBg:csEmp?.backgroundImage||'',empBorder:csEmp?.borderLeftWidth||''}});
 check(d.title==='ЩО ТАКЕ BB610 WATER',`${name} title`,d.title);
 check(d.cards===0,`${name} no cards`,String(d.cards));
 check(d.txt.includes('готова модульна система автоматизації')&&d.txt.includes('у ґрунті та у великих контейнерах із субстратом')&&d.txt.includes('малим і середнім господарствам'),`${name} approved product text preserved`);
 check(d.txt.includes('Полив може виконуватися за заданим об’ємом води або за часом.')&&d.txt.includes('фактичний об’єм, який був поданий у кожну зону.'),`${name} irrigation modes preserved`);
 check(d.txt.includes('BB610 PULS MOBILE')&&d.txt.includes('BB610 PULS'),`${name} PULS text preserved`);
 check(d.txt.includes('ПОЛИВ ЗА ФАКТИЧНИМ ОБ’ЄМОМ')&&d.txt.includes('Полив за часом також збережений — система все одно показує фактичний об’єм поданої води.'),`${name} key volume message preserved`);
 check(d.txt.includes('Один комплект — обладнання, автоматика та програмне керування поливом і фертигацією.'),`${name} closing line preserved`);
 check(d.columnsDisplay==='block',`${name} single-column editorial flow`,d.columnsDisplay);
 check(d.empBg==='none'&&parseFloat(d.empBorder||'0')===0,`${name} no accent plaque decoration`,`${d.empBg} / ${d.empBorder}`);
 if(name==='desktop'){check(d.shellWidth>=760&&d.shellWidth<=900,`${name} editorial text width`,String(Math.round(d.shellWidth)));check(d.height<1500,`${name} section compact`,String(Math.round(d.height)))}
 check(d.overflow<=1,`${name} no horizontal overflow`,String(d.overflow));
 check(ce.length===0,`${name} console`,ce.join(' | '));check(pe.length===0,`${name} JS`,pe.join(' | '));check(bad.length===0,`${name} resources`,bad.join(' | '));
 await page.close();
}
await browser.close();if(failed)process.exit(1);console.log('TASK 24.2.3 EDITORIAL SECOND SCREEN REVIEW PASS');
