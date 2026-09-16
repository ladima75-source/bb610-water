import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const LIVE='https://water.bb610.com.ua/';
const browser=await chromium.launch({headless:true});
mkdirSync('artifacts/task23',{recursive:true});
let failed=false;
const pass=(n,d='PASS')=>console.log(`PASS: ${n} — ${d}`);
const fail=(n,d)=>{failed=true;console.error(`FAIL: ${n} — ${d}`)};
async function check(label,width,height){
 const context=await browser.newContext({viewport:{width,height}}); const page=await context.newPage();
 const consoleErrors=[],pageErrors=[],bad=[];
 page.on('console',m=>m.type()==='error'&&consoleErrors.push(m.text()));
 page.on('pageerror',e=>pageErrors.push(String(e)));
 page.on('response',r=>r.status()>=400&&new URL(r.url()).hostname==='water.bb610.com.ua'&&bad.push(`${r.status()} ${r.url()}`));
 await page.goto(`${LIVE}?task23fix=${Date.now()}`,{waitUntil:'networkidle',timeout:60000});
 const m=await page.evaluate(()=>{
   const q=s=>document.querySelector(s), mark=q('.hero-inline-logo'),img=q('.hero-inline-logo img'),copy=q('.hero-promise-copy'),queue=q('.queue-shell'),hero=q('.hero'),next=q('#workday');
   const mr=mark?.getBoundingClientRect(),ir=img?.getBoundingClientRect(),cr=copy?.getBoundingClientRect(),qr=queue?.getBoundingClientRect(),hr=hero?.getBoundingClientRect();
   let glyph=0;if(copy){const cs=getComputedStyle(copy),c=document.createElement('canvas'),ctx=c.getContext('2d');ctx.font=`${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;const tm=ctx.measureText(copy.textContent.trim());glyph=(tm.actualBoundingBoxAscent||0)+(tm.actualBoundingBoxDescent||0)}
   return {sw:document.documentElement.scrollWidth,cw:document.documentElement.clientWidth,eyebrow:getComputedStyle(q('#hero-eyebrow')).display,
   renderedLetterH:(ir?.height||0)*(39/121),glyph,markTop:mr?.top||0,copyTop:cr?.top||0,markRight:mr?.right||0,copyRight:cr?.right||0,queueLeft:qr?.left||0,
   heroBottom:hr?.bottom||0,nextTop:next?.getBoundingClientRect().top||0,queueLabel:q('.queue-label')?.textContent?.trim()||'',blocks:document.querySelectorAll('#hero-blocks .irrig-block').length};
 });
 m.sw<=m.cw+1?pass(`${label} overflow`,`${m.sw}/${m.cw}`):fail(`${label} overflow`,`${m.sw}/${m.cw}`);
 m.eyebrow==='none'?pass(`${label} eyebrow removed`,'none'):fail(`${label} eyebrow removed`,m.eyebrow);
 const ratio=m.glyph?m.renderedLetterH/m.glyph:0; ratio>=.95&&ratio<=1.05?pass(`${label} logo letters = text`,`${m.renderedLetterH.toFixed(1)}/${m.glyph.toFixed(1)}=${ratio.toFixed(3)}`):fail(`${label} logo letters = text`,String(ratio));
 if(label!=='mobile'){
   m.copyTop>m.markTop+5?pass(`${label} wrap after logo`,`${m.markTop.toFixed(1)} -> ${m.copyTop.toFixed(1)}`):fail(`${label} wrap after logo`,`${m.markTop}/${m.copyTop}`);
   Math.max(m.copyRight,m.markRight)<=m.queueLeft-8?pass(`${label} no card overlap`,`${Math.max(m.copyRight,m.markRight).toFixed(1)} < ${m.queueLeft.toFixed(1)}`):fail(`${label} no card overlap`,`${Math.max(m.copyRight,m.markRight)}/${m.queueLeft}`);
 }
 if(label==='desktop'&&!(m.heroBottom>=895&&m.nextTop>=895))fail('desktop first screen',`${m.heroBottom}/${m.nextTop}`);else if(label==='desktop')pass('desktop first screen',`${m.heroBottom.toFixed(1)}/${m.nextTop.toFixed(1)}`);
 if(label==='laptop'&&!(m.heroBottom>=795&&m.nextTop>=795))fail('laptop first screen',`${m.heroBottom}/${m.nextTop}`);else if(label==='laptop')pass('laptop first screen',`${m.heroBottom.toFixed(1)}/${m.nextTop.toFixed(1)}`);
 m.queueLabel==='ПРИКЛАД ПОЛИВНИХ ЗАВДАНЬ-БЛОКІВ'?pass(`${label} queue title`,m.queueLabel):fail(`${label} queue title`,m.queueLabel);
 m.blocks===3?pass(`${label} 19:30 preserved`,'3 blocks'):fail(`${label} 19:30 preserved`,String(m.blocks));
 consoleErrors.length?fail(`${label} console`,consoleErrors.join(' | ')):pass(`${label} console`,'none');
 pageErrors.length?fail(`${label} JS`,pageErrors.join(' | ')):pass(`${label} JS`,'none');
 bad.length?fail(`${label} resources`,bad.join(' | ')):pass(`${label} resources`,'none');
 await page.screenshot({path:`artifacts/task23/live-${label}-${width}.png`,fullPage:false}); await context.close();
}
try{await check('desktop',1440,900);await check('laptop',1280,800);await check('mobile',390,844)}finally{await browser.close()}
if(failed)process.exit(1);console.log('TASK 23 LIVE THREE-POINT FIX PASS');
