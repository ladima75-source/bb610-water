import { chromium } from 'playwright';
const base='http://127.0.0.1:4173/docs/website/staging/';
const browser=await chromium.launch({headless:true});
const failures=[];
const check=(ok,label,detail='')=>{console.log(`${ok?'PASS':'FAIL'}: ${label}${detail?' — '+detail:''}`);if(!ok)failures.push(`${label}: ${detail}`)};
try{
  for(const v of [{name:'desktop',w:1440,h:900,fit:true},{name:'laptop',w:1280,h:800,fit:true},{name:'mobile',w:390,h:844,fit:false}]){
    const context=await browser.newContext({viewport:{width:v.w,height:v.h}});
    const page=await context.newPage();
    const consoleErrors=[],pageErrors=[],bad=[];
    page.on('console',m=>{if(m.type()==='error')consoleErrors.push(m.text())});
    page.on('pageerror',e=>pageErrors.push(String(e)));
    page.on('response',r=>{if(r.status()>=400)bad.push(`${r.status()} ${r.url()}`)});
    await page.goto(base,{waitUntil:'networkidle'});
    const data=await page.evaluate(()=>{
      const s=document.querySelector('#workday');
      const eyebrow=s.querySelector('.eyebrow')?.textContent?.trim()||'';
      const before=[...document.querySelectorAll('#before-list li')];
      const after=[...document.querySelectorAll('#after-list li')];
      const beforeMarker=before[0]?getComputedStyle(before[0],'::before').content:'';
      const beforeColor=before[0]?getComputedStyle(before[0],'::before').color:'';
      const afterMarker=after[0]?getComputedStyle(after[0],'::before').content:'';
      const r=s.getBoundingClientRect();
      const header=document.querySelector('.header')?.getBoundingClientRect();
      return {eyebrow,beforeMarker,beforeColor,afterMarker,sectionH:r.height,headerH:header?.height||0,scrollW:document.documentElement.scrollWidth,clientW:document.documentElement.clientWidth,beforeCount:before.length,afterCount:after.length};
    });
    check(data.eyebrow==='ЦІННІСТЬ ДЛЯ КОРИСТУВАЧА',`${v.name} user-value eyebrow`,data.eyebrow);
    check(!/^01\s*\//.test(data.eyebrow),`${v.name} 01 removed`,data.eyebrow);
    check(data.beforeCount===5,`${v.name} before items`,String(data.beforeCount));
    check(data.afterCount===6,`${v.name} after items`,String(data.afterCount));
    check(/[!]/.test(data.beforeMarker),`${v.name} negative marker`,`${data.beforeMarker} ${data.beforeColor}`);
    check(data.afterMarker&&data.afterMarker!=='none'&&data.afterMarker!=='normal',`${v.name} positive marker preserved`,data.afterMarker);
    check(data.scrollW<=data.clientW+1,`${v.name} no horizontal overflow`,`${data.scrollW}/${data.clientW}`);
    if(v.fit) check(data.sectionH<=v.h-data.headerH+3,`${v.name} workday fits one viewport`,`${data.sectionH.toFixed(1)} <= ${(v.h-data.headerH).toFixed(1)}`);
    check(consoleErrors.length===0,`${v.name} console`,consoleErrors.join(' | ')||'none');
    check(pageErrors.length===0,`${v.name} JS`,pageErrors.join(' | ')||'none');
    check(bad.length===0,`${v.name} resources`,bad.join(' | ')||'none');
    await page.screenshot({path:`workday-${v.name}.png`,fullPage:false});
    await context.close();
  }
} finally {await browser.close()}
if(failures.length){console.error('\n'+failures.join('\n'));process.exit(1)}
console.log('WORKDAY SCREEN 2 REVIEW PASS');
