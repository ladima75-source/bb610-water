import { chromium } from 'playwright';
const base='http://127.0.0.1:4173/docs/website/staging/';
const browser=await chromium.launch({headless:true});
let failed=false;
const ok=(n,d)=>console.log(`PASS: ${n} — ${d}`), bad=(n,d)=>{failed=true;console.error(`FAIL: ${n} — ${d}`)};
try{
 for(const [label,width,height] of [['desktop',1440,900],['laptop',1280,800],['mobile',390,844]]){
  const page=await browser.newPage({viewport:{width,height}}); const ce=[],pe=[],br=[];
  page.on('console',m=>m.type()==='error'&&ce.push(m.text())); page.on('pageerror',e=>pe.push(String(e))); page.on('response',r=>r.status()>=400&&br.push(`${r.status()} ${r.url()}`));
  await page.goto(base,{waitUntil:'networkidle'});
  const m=await page.evaluate(()=>{
   const q=s=>document.querySelector(s), qa=s=>[...document.querySelectorAll(s)];
   const mark=q('.hero-inline-logo'), img=q('.hero-inline-logo img'), copy=q('.hero-promise-copy'), queue=q('.queue-shell'), next=q('#workday'), hero=q('.hero');
   const mr=mark.getBoundingClientRect(), ir=img.getBoundingClientRect(), cr=copy.getBoundingClientRect(), qr=queue.getBoundingClientRect(), hr=hero.getBoundingClientRect();
   const cs=getComputedStyle(copy), c=document.createElement('canvas'), ctx=c.getContext('2d'); ctx.font=`${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
   const tm=ctx.measureText(copy.textContent.trim()), glyph=(tm.actualBoundingBoxAscent||0)+(tm.actualBoundingBoxDescent||0);
   const sourceLetterH=39, sourceH=121, renderedLetterH=ir.height*(sourceLetterH/sourceH);
   return {sw:document.documentElement.scrollWidth,cw:document.documentElement.clientWidth,heroBottom:hr.bottom,nextTop:next.getBoundingClientRect().top,
    eyebrow:getComputedStyle(q('#hero-eyebrow')).display, markW:mr.width,markH:mr.height,imgH:ir.height,renderedLetterH,glyph,copyTop:cr.top,markTop:mr.top,copyRight:cr.right,markRight:mr.right,queueLeft:qr.left,
    brandWhite:getComputedStyle(q('.hero-promise-brandline')).whiteSpace, blocks:qa('#hero-blocks .irrig-block').length};
  });
  m.sw<=m.cw+1?ok(`${label} overflow`,`${m.sw}/${m.cw}`):bad(`${label} overflow`,`${m.sw}/${m.cw}`);
  m.eyebrow==='none'?ok(`${label} hero eyebrow removed`,'none'):bad(`${label} hero eyebrow removed`,m.eyebrow);
  const ratio=m.renderedLetterH/m.glyph; ratio>=.95&&ratio<=1.05?ok(`${label} logo letters match text`,`${m.renderedLetterH.toFixed(1)} / ${m.glyph.toFixed(1)} = ${ratio.toFixed(3)}`):bad(`${label} logo letters match text`,`${m.renderedLetterH.toFixed(1)} / ${m.glyph.toFixed(1)} = ${ratio.toFixed(3)}`);
  if(label!=='mobile'){
   m.copyTop>m.markTop+5?ok(`${label} phrase wrapped after logo`,`${m.markTop.toFixed(1)} -> ${m.copyTop.toFixed(1)}`):bad(`${label} phrase wrapped after logo`,`${m.markTop.toFixed(1)} -> ${m.copyTop.toFixed(1)}`);
   Math.max(m.copyRight,m.markRight)<=m.queueLeft-8?ok(`${label} no queue overlap`,`${Math.max(m.copyRight,m.markRight).toFixed(1)} < ${m.queueLeft.toFixed(1)}`):bad(`${label} no queue overlap`,`${Math.max(m.copyRight,m.markRight).toFixed(1)} / ${m.queueLeft.toFixed(1)}`);
  }
  m.brandWhite==='normal'?ok(`${label} brand line can wrap`,'normal'):bad(`${label} brand line can wrap`,m.brandWhite);
  if(label==='desktop') (m.heroBottom>=895&&m.heroBottom<=905&&m.nextTop>=895)?ok('desktop first screen',`${m.heroBottom.toFixed(1)} / next ${m.nextTop.toFixed(1)}`):bad('desktop first screen',`${m.heroBottom.toFixed(1)} / ${m.nextTop.toFixed(1)}`);
  if(label==='laptop') (m.heroBottom>=795&&m.heroBottom<=805&&m.nextTop>=795)?ok('laptop first screen',`${m.heroBottom.toFixed(1)} / next ${m.nextTop.toFixed(1)}`):bad('laptop first screen',`${m.heroBottom.toFixed(1)} / ${m.nextTop.toFixed(1)}`);
  m.blocks===3?ok(`${label} 19:30 preserved`,'3 blocks'):bad(`${label} 19:30 preserved`,String(m.blocks));
  ce.length?bad(`${label} console`,ce.join(' | ')):ok(`${label} console`,'none'); pe.length?bad(`${label} JS`,pe.join(' | ')):ok(`${label} JS`,'none'); br.length?bad(`${label} resources`,br.join(' | ')):ok(`${label} resources`,'none');
  await page.close();
 }
} finally {await browser.close();}
if(failed) process.exit(1); console.log('TASK 23 THREE-POINT FIX PASS');
