import { chromium } from 'playwright';
const browser=await chromium.launch({headless:true});
const cases=[['desktop',1440,900],['mobile',390,844]];
let failed=false;const check=(ok,label,detail='')=>{console.log(`${ok?'PASS':'FAIL'}: ${label}${detail?` — ${detail}`:''}`);if(!ok)failed=true};
for(const [name,width,height] of cases){
 const page=await browser.newPage({viewport:{width,height}});const ce=[],pe=[],bad=[];
 page.on('console',m=>{if(m.type()==='error')ce.push(m.text())});page.on('pageerror',e=>pe.push(String(e)));page.on('response',r=>{if(r.status()>=400)bad.push(`${r.status()} ${r.url()}`)});
 await page.goto('http://127.0.0.1:4173/docs/website/staging/#workday',{waitUntil:'networkidle'});await page.locator('#workday').scrollIntoViewIfNeeded();await page.waitForTimeout(250);
 const d=await page.evaluate(()=>{const s=document.querySelector('#workday');const shell=s?.querySelector('.product-desc-shell');const r=shell?.getBoundingClientRect();const sr=s?.getBoundingClientRect();return{overflow:document.documentElement.scrollWidth-document.documentElement.clientWidth,shellWidth:r?.width||0,left:r?.left||0,right:innerWidth-(r?.right||0),height:sr?.height||0,title:s?.querySelector('h2')?.textContent?.trim()||'',text:s?.textContent||''}});
 check(d.title==='ЩО ТАКЕ BB610 WATER',`${name} title`,d.title);
 check(d.text.includes('BB610 PULS MOBILE')&&d.text.includes('BB610 PULS'),`${name} product names preserved`);
 if(name==='desktop'){check(d.shellWidth>=1120&&d.shellWidth<=1210,'desktop wide editorial measure',String(Math.round(d.shellWidth)));check(Math.abs(d.left-d.right)<=3,'desktop visually centered',`${Math.round(d.left)} / ${Math.round(d.right)}`);check(d.height<=900,'desktop section fits viewport',String(Math.round(d.height)))}
 check(d.overflow<=1,`${name} no horizontal overflow`,String(d.overflow));check(ce.length===0,`${name} console`,ce.join(' | '));check(pe.length===0,`${name} JS`,pe.join(' | '));check(bad.length===0,`${name} resources`,bad.join(' | '));await page.close();
}
await browser.close();if(failed)process.exit(1);console.log('TASK 24.2.7 CENTERED WIDTH REVIEW PASS');
