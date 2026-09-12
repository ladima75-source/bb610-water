import { chromium } from 'playwright';
const browser=await chromium.launch({headless:true});
const cases=[['desktop',1440,900],['mobile',390,844]];
let failed=false;const check=(ok,label,detail='')=>{console.log(`${ok?'PASS':'FAIL'}: ${label}${detail?` — ${detail}`:''}`);if(!ok)failed=true};
for(const [name,width,height] of cases){
 const page=await browser.newPage({viewport:{width,height}});const ce=[],pe=[],bad=[];
 page.on('console',m=>{if(m.type()==='error')ce.push(m.text())});page.on('pageerror',e=>pe.push(String(e)));page.on('response',r=>{if(r.status()>=400)bad.push(`${r.status()} ${r.url()}`)});
 await page.goto('http://127.0.0.1:4173/docs/website/staging/#workday',{waitUntil:'networkidle'});await page.locator('#workday').scrollIntoViewIfNeeded();await page.waitForTimeout(250);
 const d=await page.evaluate(()=>{const s=document.querySelector('#workday');const shell=s?.querySelector('.product-desc-shell');const p=s?.querySelector('.product-desc-intro p');const shellRect=shell?.getBoundingClientRect();const pRect=p?.getBoundingClientRect();const pcs=p?getComputedStyle(p):null;const title=s?.querySelector('h2')?.textContent?.trim()||'';return{title,overflow:document.documentElement.scrollWidth-document.documentElement.clientWidth,height:s?.getBoundingClientRect().height||0,shellWidth:shellRect?.width||0,left:shellRect?.left||0,right:innerWidth-(shellRect?.right||0),pWidth:pRect?.width||0,textAlign:pcs?.textAlign||'',textAlignLast:pcs?.textAlignLast||''}});
 check(d.title==='ЩО ТАКЕ BB610 WATER',`${name} title`,d.title);
 if(name==='desktop'){
   check(d.shellWidth>=1100&&d.shellWidth<=1220,`${name} wide editorial shell`,String(Math.round(d.shellWidth)));
   check(Math.abs(d.left-d.right)<=2,`${name} centered shell`,`left ${d.left.toFixed(1)} / right ${d.right.toFixed(1)}`);
   check(Math.abs(d.pWidth-d.shellWidth)<=2,`${name} paragraph uses full shell width`,`${d.pWidth.toFixed(1)} / ${d.shellWidth.toFixed(1)}`);
   check(d.textAlign==='justify',`${name} justified text`,d.textAlign);
   check(d.textAlignLast==='left'||d.textAlignLast==='auto',`${name} last line remains natural`,d.textAlignLast);
   check(d.height<=900,`${name} section fits one viewport`,String(Math.round(d.height)));
 } else {
   check(d.textAlign==='left'||d.textAlign==='start',`${name} mobile remains ragged-right`,d.textAlign);
 }
 check(d.overflow<=1,`${name} no horizontal overflow`,String(d.overflow));
 check(ce.length===0,`${name} console`,ce.join(' | '));check(pe.length===0,`${name} JS`,pe.join(' | '));check(bad.length===0,`${name} resources`,bad.join(' | '));
 await page.close();
}
await browser.close();if(failed)process.exit(1);console.log('TASK 24.2.8 JUSTIFIED EDITORIAL REVIEW PASS');
