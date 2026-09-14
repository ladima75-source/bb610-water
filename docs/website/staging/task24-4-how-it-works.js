(()=>{
const ID='task24-4-how-style';
const icons={
task:`<svg viewBox="0 0 64 64" aria-hidden="true"><rect x="16" y="10" width="30" height="42" rx="6"/><path d="M24 9V6h14v3M24 22h14M24 31h14M24 40h10"/></svg>`,
run:`<svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="19"/><path d="M29 23l14 9-14 9z"/></svg>`,
meter:`<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M16 43a16 16 0 1 1 32 0M32 32l10-8"/><circle cx="32" cy="32" r="3"/><path d="M22 43h20"/></svg>`,
result:`<svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="20"/><path d="M23 32l6 6 12-14"/></svg>`};

function css(){
  document.getElementById(ID)?.remove();
  const s=document.createElement('style');
  s.id=ID;
  s.textContent=`
#how-it-works{padding:38px 0 42px!important}
#how-it-works>.container{width:min(1280px,calc(100% - 48px))!important;margin-inline:auto!important}
#how-it-works .section-head{display:grid!important;grid-template-columns:minmax(0,1.08fr) minmax(360px,.92fr);gap:34px 48px;align-items:end;margin-bottom:20px!important}
#how-it-works .section-head h2{margin:0!important;max-width:760px}
#how-it-works .section-head>p{margin:0!important;color:var(--text-2);font-size:17px;line-height:1.46;max-width:560px}
#how-it-works .how-process-panel{position:relative;width:100%;box-sizing:border-box;border:1px solid rgba(38,176,232,.28);border-radius:24px;background:radial-gradient(circle at 16% 32%,rgba(25,151,218,.09),transparent 34%),radial-gradient(circle at 86% 72%,rgba(65,220,170,.05),transparent 28%),linear-gradient(180deg,rgba(7,26,40,.80),rgba(5,19,30,.68));box-shadow:inset 0 1px 0 rgba(255,255,255,.03);padding:24px 26px 16px;overflow:hidden}
#how-it-works .how-process-topline{position:relative;z-index:2;display:flex;align-items:center;gap:16px;margin-bottom:18px}
#how-it-works .how-process-kicker{margin:0;color:#79d9ff;font-size:11px;font-weight:800;letter-spacing:.18em;text-transform:uppercase;white-space:nowrap}
#how-it-works .how-process-topline-line{height:1px;flex:1;background:linear-gradient(90deg,rgba(39,201,255,.34),rgba(39,201,255,.05))}
#how-it-works #how-steps.how-process-flow{position:relative;z-index:2;display:grid!important;grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:0!important;margin:0!important;padding:4px 0 0!important}
#how-it-works #how-steps.how-process-flow:before{content:'';position:absolute;left:7%;right:7%;top:31px;height:2px;background:linear-gradient(90deg,rgba(39,201,255,.15),rgba(39,201,255,.92) 14%,rgba(39,201,255,.88) 86%,rgba(39,201,255,.15));box-shadow:0 0 12px rgba(39,201,255,.14)}
#how-it-works #how-steps.how-process-flow article{position:relative;min-height:216px!important;padding:0 24px 0!important;margin:0!important;background:none!important;border:none!important;border-radius:0!important;overflow:visible!important;text-align:left;display:block!important}
#how-it-works #how-steps.how-process-flow article:not(:last-child):after{content:'';position:absolute;right:0;top:58px;bottom:8px;width:1px;background:linear-gradient(180deg,rgba(54,173,230,.05),rgba(54,173,230,.26),rgba(54,173,230,.05))}
#how-it-works .how-step-marker{position:relative;z-index:3;width:58px;height:58px;margin-bottom:18px;border-radius:18px;border:1px solid rgba(39,201,255,.30);background:linear-gradient(180deg,rgba(10,38,57,.94),rgba(7,25,38,.88));display:grid;place-items:center;box-shadow:0 0 20px rgba(39,201,255,.07)}
#how-it-works .how-step-number{position:absolute;left:-8px;top:-8px;min-width:32px;height:20px;padding:0 8px;border-radius:999px;border:1px solid rgba(39,201,255,.36);background:#071d2d;color:#35d0ff;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:800;letter-spacing:.06em}
#how-it-works .how-step-icon svg{width:32px;height:32px;fill:none;stroke:#2ed0ff;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round}
#how-it-works #how-steps.how-process-flow article:nth-child(4) .how-step-marker{border-color:rgba(64,221,168,.34);background:linear-gradient(180deg,rgba(10,38,38,.92),rgba(7,25,31,.86))}
#how-it-works #how-steps.how-process-flow article:nth-child(4) .how-step-icon svg{stroke:#43dfa9}
#how-it-works .how-step-title{margin:0 0 9px!important;color:var(--text-1);font-size:21px!important;line-height:1.08!important;font-weight:800!important;letter-spacing:.01em}
#how-it-works .how-step-copy{margin:0!important;color:var(--text-2)!important;font-size:14px!important;line-height:1.46!important;max-width:250px}
#how-it-works .how-step-arrow{position:absolute;right:-13px;top:20px;width:26px;height:22px;display:flex;align-items:center;justify-content:center;color:#2fd1ff;z-index:4}
#how-it-works .how-step-arrow svg{width:23px;height:18px;fill:none;stroke:currentColor;stroke-width:2.3;stroke-linecap:round;stroke-linejoin:round}
#how-it-works .connection-slot{position:relative;z-index:2;margin:14px 0 0!important;padding:14px 0 0!important;border:0!important;background:none!important;min-height:0!important;border-top:1px solid rgba(54,173,230,.18)!important}
#how-it-works .how-process-summary{display:flex;justify-content:center;align-items:center}
#how-it-works .how-process-formula{display:inline-flex;align-items:center;justify-content:center;min-height:42px;padding:9px 17px;border:1px solid rgba(39,201,255,.25);border-radius:999px;background:rgba(7,25,38,.68);color:#eef9ff;font-size:13px;font-weight:800;letter-spacing:.015em;text-align:center;white-space:nowrap}
@media(max-width:1100px){#how-it-works .section-head{grid-template-columns:1fr;gap:10px}#how-it-works .section-head>p{max-width:760px}#how-it-works #how-steps.how-process-flow article{padding-inline:18px!important}#how-it-works .how-step-title{font-size:19px!important}#how-it-works .how-step-copy{font-size:13px!important}}
@media(max-width:700px){#how-it-works{padding:30px 0 34px!important}#how-it-works>.container{width:min(100% - 28px,620px)!important}#how-it-works .how-process-panel{padding:18px 14px 14px}#how-it-works #how-steps.how-process-flow{grid-template-columns:1fr!important;gap:0!important}#how-it-works #how-steps.how-process-flow:before{left:28px;right:auto;top:34px;bottom:26px;width:2px;height:auto;background:linear-gradient(180deg,rgba(39,201,255,.18),rgba(39,201,255,.84) 12%,rgba(39,201,255,.84) 88%,rgba(39,201,255,.18))}#how-it-works #how-steps.how-process-flow article{min-height:0!important;padding:0 0 22px 78px!important}#how-it-works #how-steps.how-process-flow article:not(:last-child):after{display:none}#how-it-works .how-step-marker{position:absolute;left:0;top:0;width:56px;height:56px;margin:0;border-radius:16px}#how-it-works .how-step-arrow{display:none}#how-it-works .how-step-title{font-size:18px!important;margin-bottom:6px!important}#how-it-works .how-step-copy{font-size:13px!important;max-width:none}#how-it-works .connection-slot{margin-top:4px!important;padding-top:12px!important}#how-it-works .how-process-formula{width:100%;box-sizing:border-box;border-radius:16px;white-space:normal;line-height:1.35}}
`;
  document.head.appendChild(s)
}

function run(){
  const section=document.querySelector('#how-it-works');if(!section)return;css();
  const container=section.querySelector(':scope > .container')||section.querySelector('.container');
  const head=section.querySelector('.section-head');
  if(head){
    const title=head.querySelector('h2');if(title)title.textContent='ВІД ЗАВДАННЯ ДО ПЕРЕВІРЕНОГО РЕЗУЛЬТАТУ';
    const p=head.querySelector('p');if(p)p.textContent='BB610 WATER не просто відкриває клапан. Система виконує заданий сценарій, вимірює процес і порівнює результат із завданням.'
  }
  const steps=section.querySelector('#how-steps');
  const data=[['01','task','ЗАДАЄТЕ','Зона · режим · графік · цільовий об’єм'],['02','run','СИСТЕМА ВИКОНУЄ','Полив · фертигація · послідовність операцій'],['03','meter','СИСТЕМА ВИМІРЮЄ','Фактичний об’єм · доступні контрольовані параметри'],['04','result','ОТРИМУЄТЕ РЕЗУЛЬТАТ','Факт по кожній зоні · відхилення · аварійні повідомлення']];
  if(steps){
    steps.className='how-process-flow';
    steps.innerHTML=data.map((d,i)=>`<article><div class="how-step-marker"><span class="how-step-number">${d[0]}</span><div class="how-step-icon">${icons[d[1]]}</div></div><h3 class="how-step-title">${d[2]}</h3><p class="how-step-copy">${d[3]}</p>${i<3?'<div class="how-step-arrow" aria-hidden="true"><svg viewBox="0 0 24 18"><path d="M2 9h18M14 2l7 7-7 7"/></svg></div>':''}</article>`).join('')
  }
  const slot=section.querySelector('#connection-scheme-slot');
  if(slot)slot.innerHTML=`<div class="how-process-summary"><div class="how-process-formula">Завдання → виконання → фактичний контроль → результат по кожній зоні</div></div>`;
  let panel=section.querySelector('.how-process-panel');
  if(!panel&&steps&&slot){
    panel=document.createElement('div');panel.className='how-process-panel';
    const top=document.createElement('div');top.className='how-process-topline';top.innerHTML=`<p class="how-process-kicker">ЄДИНИЙ РОБОЧИЙ ЦИКЛ</p><div class="how-process-topline-line" aria-hidden="true"></div>`;
    panel.append(top,steps,slot);(container||section).appendChild(panel)
  }
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>requestAnimationFrame(run));else requestAnimationFrame(run)
})();