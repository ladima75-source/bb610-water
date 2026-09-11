import {JSDOM, VirtualConsole} from 'jsdom';

const mode=process.argv[2];
const root='http://127.0.0.1:8000';
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const check=(c,m)=>{if(!c)throw new Error(m)};

async function load(url){
  const vc=new VirtualConsole();
  vc.on('jsdomError',e=>{if(!String(e.message||e).includes('Could not load stylesheet'))console.error('JSDOM',e.message||e)});
  const dom=await JSDOM.fromURL(url,{runScripts:'dangerously',resources:'usable',pretendToBeVisual:true,virtualConsole:vc,beforeParse(w){w.fetch=(...a)=>globalThis.fetch(...a);w.confirm=()=>true;w.alert=()=>{};}});
  await new Promise(resolve=>dom.window.addEventListener('load',()=>setTimeout(resolve,1400),{once:true}));
  return dom;
}

async function adminLogin(){
  const dom=await load(`${root}/docs/website/admin/review/v2/`),d=dom.window.document;
  d.querySelector('#login-email').value=process.env.R19_ADMIN_EMAIL;
  d.querySelector('#login-password').value=process.env.R19_ADMIN_PASSWORD;
  d.querySelector('#login').click();
  for(let i=0;i<40&&d.querySelector('#workspace').hidden;i++)await sleep(100);
  check(!d.querySelector('#workspace').hidden,'Admin v2 workspace did not open after real login');
  check(d.querySelector('#session-state').textContent.includes('AUTHENTICATED'),'Admin v2 did not show authenticated state');
  check(d.querySelector('#version-state').textContent.includes('published'),'Admin v2 did not load server version state');
  console.log('R19 UI admin-login PASS',d.querySelector('#version-state').textContent);
  dom.window.close();
}

async function stagingHidden(){
  const dom=await load(`${root}/docs/website/staging/`),d=dom.window.document;
  const onlyWater=d.querySelector('[data-fert="0"]');
  check(onlyWater,'staging feeding selector missing');
  onlyWater.click(); await sleep(150);
  const z4=d.querySelector('[data-czone="Z4(8)"]');
  check(z4,'staging Z4 choice missing');
  check(z4.disabled===true,'published hidden I/Z4 was not disabled in staging');
  check(!d.body.textContent.includes('0 тис. грн'),'staging fabricated zero price');
  console.log('R19 UI staging-hidden PASS');
  dom.window.close();
}

async function stagingBaseline(){
  const dom=await load(`${root}/docs/website/staging/`),d=dom.window.document;
  const fert1=d.querySelector('[data-fert="1"]');check(fert1,'fert1 missing');fert1.click();await sleep(80);
  const ecNo=d.querySelector('[data-ec="0"]');check(ecNo,'EC no option missing');ecNo.click();await sleep(100);
  check(d.querySelector('#config-code').textContent.includes('F1-P'),'staging did not resolve F1-P');
  check(d.querySelector('#config-price').textContent.includes('Ціна уточнюється'),'PRICE_ON_REQUEST did not render Ціна уточнюється');
  const water=d.querySelector('[data-fert="0"]');water.click();await sleep(80);
  const z4=d.querySelector('[data-czone="Z4(8)"]');check(z4&&!z4.disabled,'accepted I/Z4 was not restored after rollback');
  check(!d.body.textContent.includes('0 тис. грн'),'staging fabricated zero price');
  console.log('R19 UI staging-baseline PASS');
  dom.window.close();
}

async function stagingFallback(){
  const dom=await load(`${root}/docs/website/staging/`),d=dom.window.document;
  const fert1=d.querySelector('[data-fert="1"]');check(fert1,'fert1 missing fallback');fert1.click();await sleep(80);
  const ecNo=d.querySelector('[data-ec="0"]');check(ecNo,'EC no missing fallback');ecNo.click();await sleep(120);
  check(d.querySelector('#config-price').textContent.includes('Ціна уточнюється'),'static fallback lost PRICE_ON_REQUEST');
  check(!d.body.textContent.includes('0 тис. грн'),'fallback fabricated zero price');
  check(d.querySelector('[data-czone="Z4(8)"]'),'fallback configurator unusable');
  console.log('R19 UI staging-fallback PASS');
  dom.window.close();
}

if(mode==='admin-login')await adminLogin();
else if(mode==='staging-hidden')await stagingHidden();
else if(mode==='staging-baseline')await stagingBaseline();
else if(mode==='staging-fallback')await stagingFallback();
else throw new Error(`unknown mode ${mode}`);
