(()=>{
  const STYLE_ID='task24-4-how-style';
  const icons={
    task:`<svg viewBox="0 0 64 64" aria-hidden="true"><rect x="16" y="10" width="30" height="42" rx="6"/><path d="M24 9V6h14v3M24 22h14M24 31h14M24 40h10"/></svg>`,
    run:`<svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="19"/><path d="M29 23l14 9-14 9z"/></svg>`,
    meter:`<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M16 43a16 16 0 1 1 32 0M32 32l10-8"/><circle cx="32" cy="32" r="3"/><path d="M22 43h20"/></svg>`,
    result:`<svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="20"/><path d="M23 32l6 6 12-14"/></svg>`
  };

  function css(){
    document.getElementById(STYLE_ID)?.remove();
    const s=document.createElement('style');
    s.id=STYLE_ID;
    s.textContent=`
#how-it-works{padding:36px 0 42px!important}
#how-it-works>.container{width:min(1280px,calc(100% - 48px))!important;margin-inline:auto!important}
#how-it-works .section-head{display:grid!important;grid-template-columns:minmax(0,58fr) minmax(340px,42fr)!important;gap:42px!important;align-items:end!important;margin-bottom:22px!important}
#how-it-works .section-head h2{margin:0!important;max-width:760px}
#how-it-works .section-head>p{margin:0!important;max-width:530px;color:var(--text-2)!important;font-size:17px!important;line-height:1.48!important}

#how-it-works .how-process-panel{position:relative;width:100%;box-sizing:border-box;border:1px solid rgba(39,181,235,.28);border-radius:22px;background:radial-gradient(circle at 18% 26%,rgba(32,170,232,.08),transparent 34%),radial-gradient(circle at 84% 70%,rgba(61,220,170,.04),transparent 28%),linear-gradient(180deg,rgba(7,27,42,.80),rgba(5,19,30,.68));box-shadow:inset 0 1px 0 rgba(255,255,255,.025);padding:22px 26px 16px;overflow:hidden}
#how-it-works .how-process-topline{display:flex;align-items:center;gap:16px;margin-bottom:16px}
#how-it-works .how-process-kicker{margin:0;color:#79d8ff;font-size:11px;font-weight:800;letter-spacing:.18em;text-transform:uppercase;white-space:nowrap}
#how-it-works .how-process-topline-line{height:1px;flex:1;background:linear-gradient(90deg,rgba(40,201,255,.34),rgba(40,201,255,.05))}

#how-it-works #how-steps.how-process-flow{position:relative;display:grid!important;grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:0!important;margin:0!important;padding:0!important}
#how-it-works #how-steps.how-process-flow::before{content:'';position:absolute;left:8%;right:8%;top:54px;height:2px;background:linear-gradient(90deg,rgba(38,201,255,.20),rgba(38,201,255,.95) 10%,rgba(38,201,255,.95) 90%,rgba(38,201,255,.20));box-shadow:0 0 10px rgba(38,201,255,.12);z-index:0}
#how-it-works #how-steps.how-process-flow article{position:relative;min-height:218px!important;padding:0 22px 4px!important;margin:0!important;background:none!important;border:none!important;border-radius:0!important;overflow:visible!important;text-align:left!important;display:block!important;z-index:1}
#how-it-works #how-steps.how-process-flow article:not(:last-child)::after{content:'';position:absolute;top:49px;right:-7px;width:13px;height:13px;border-top:2px solid #32d0ff;border-right:2px solid #32d0ff;transform:rotate(45deg);z-index:3;background:transparent}
#how-it-works .how-step-number{display:block;margin:0 0 8px;color:#38d0ff;font-size:13px;font-weight:800;letter-spacing:.08em;line-height:1}
#how-it-works .how-step-marker{position:relative;width:72px;height:72px;margin:0 0 18px;border-radius:999px;border:1px solid rgba(39,201,255,.34);background:radial-gradient(circle at 50% 38%,rgba(35,168,226,.16),rgba(7,25,38,.88));display:grid;place-items:center;box-shadow:0 0 24px rgba(39,201,255,.08);z-index:2}
#how-it-works .how-step-marker::after{content:'';position:absolute;left:50%;top:100%;width:1px;height:14px;background:linear-gradient(180deg,rgba(39,201,255,.55),rgba(39,201,255,.04))}
#how-it-works .how-step-icon svg{width:42px;height:42px;fill:none;stroke:#2fd0ff;stroke-width:2.15;stroke-linecap:round;stroke-linejoin:round}
#how-it-works #how-steps.how-process-flow article:nth-child(4) .how-step-marker{border-color:rgba(64,221,168,.38);background:radial-gradient(circle at 50% 38%,rgba(64,221,168,.16),rgba(7,27,31,.88))}
#how-it-works #how-steps.how-process-flow article:nth-child(4) .how-step-icon svg{stroke:#43dfa9}
#how-it-works .how-step-title{margin:0 0 8px!important;color:var(--text-1)!important;font-size:23px!important;line-height:1.08!important;font-weight:800!important;letter-spacing:.005em!important}
#how-it-works .how-step-copy{margin:0!important;color:var(--text-2)!important;font-size:15px!important;line-height:1.42!important;max-width:255px}

#how-it-works .connection-slot{margin:2px 0 0!important;padding:14px 0 0!important;border:0!important;border-top:1px solid rgba(53,170,225,.20)!important;background:none!important;min-height:0!important}
#how-it-works .how-process-summary{display:block}
#how-it-works .how-process-formula{margin:0;color:#eef9ff;font-size:14px;font-weight:700;line-height:1.4;letter-spacing:.01em;text-align:center}

@media(max-width:1100px){
  #how-it-works .section-head{grid-template-columns:1fr!important;gap:10px!important;align-items:start!important}
  #how-it-works .section-head>p{max-width:760px}
  #how-it-works #how-steps.how-process-flow article{padding-inline:16px!important}
  #how-it-works .how-step-title{font-size:20px!important}
  #how-it-works .how-step-copy{font-size:13.5px!important}
}

@media(max-width:700px){
  #how-it-works{padding:28px 0 34px!important}
  #how-it-works>.container{width:min(100% - 28px,620px)!important}
  #how-it-works .section-head{gap:12px!important;margin-bottom:18px!important}
  #how-it-works .section-head>p{font-size:15px!important;line-height:1.45!important}
  #how-it-works .how-process-panel{padding:18px 16px 14px}
  #how-it-works .how-process-topline{margin-bottom:12px}
  #how-it-works #how-steps.how-process-flow{grid-template-columns:1fr!important;gap:0!important}
  #how-it-works #how-steps.how-process-flow::before{left:36px;right:auto;top:38px;bottom:26px;width:2px;height:auto;background:linear-gradient(180deg,rgba(39,201,255,.20),rgba(39,201,255,.88) 10%,rgba(39,201,255,.88) 90%,rgba(39,201,255,.20))}
  #how-it-works #how-steps.how-process-flow article{min-height:0!important;padding:0 0 24px 88px!important}
  #how-it-works #how-steps.how-process-flow article:not(:last-child)::after{top:auto;right:auto;left:31px;bottom:9px;width:10px;height:10px;border-top:0;border-right:2px solid #32d0ff;border-bottom:2px solid #32d0ff;transform:rotate(45deg)}
  #how-it-works .how-step-number{position:absolute;left:0;top:0;width:72px;text-align:center;margin:0;font-size:12px}
  #how-it-works .how-step-marker{position:absolute;left:0;top:20px;width:72px;height:72px;margin:0}
  #how-it-works .how-step-marker::after{display:none}
  #how-it-works .how-step-title{font-size:19px!important;margin:2px 0 7px!important}
  #how-it-works .how-step-copy{font-size:14px!important;line-height:1.42!important;max-width:none}
  #how-it-works .connection-slot{margin-top:0!important;padding-top:12px!important}
  #how-it-works .how-process-formula{text-align:left;font-size:13px;line-height:1.45}
}
`;
    document.head.appendChild(s);
  }

  function run(){
    const section=document.querySelector('#how-it-works');
    if(!section)return;
    css();

    const container=section.querySelector(':scope > .container')||section.querySelector('.container');
    const head=section.querySelector('.section-head');
    if(head){
      const title=head.querySelector('h2');
      if(title)title.textContent='ВІД ЗАВДАННЯ ДО ПЕРЕВІРЕНОГО РЕЗУЛЬТАТУ';
      const p=head.querySelector('p');
      if(p)p.textContent='BB610 WATER не просто відкриває клапан. Система виконує заданий сценарій, вимірює процес і порівнює результат із завданням.';
    }

    const steps=section.querySelector('#how-steps');
    const data=[
      ['01','task','ЗАДАЄТЕ','Зона · режим · графік · цільовий об’єм'],
      ['02','run','СИСТЕМА ВИКОНУЄ','Полив · фертигація · послідовність операцій'],
      ['03','meter','СИСТЕМА ВИМІРЮЄ','Фактичний об’єм · доступні контрольовані параметри'],
      ['04','result','ОТРИМУЄТЕ РЕЗУЛЬТАТ','Факт по кожній зоні · відхилення · аварійні повідомлення']
    ];

    if(steps){
      steps.className='how-process-flow';
      steps.innerHTML=data.map(d=>`<article><span class="how-step-number">${d[0]}</span><div class="how-step-marker"><div class="how-step-icon">${icons[d[1]]}</div></div><h3 class="how-step-title">${d[2]}</h3><p class="how-step-copy">${d[3]}</p></article>`).join('');
    }

    const slot=section.querySelector('#connection-scheme-slot');
    if(slot)slot.innerHTML=`<div class="how-process-summary"><p class="how-process-formula">Завдання → виконання → фактичний контроль → результат по кожній зоні</p></div>`;

    let panel=section.querySelector('.how-process-panel');
    if(!panel&&steps&&slot){
      panel=document.createElement('div');
      panel.className='how-process-panel';
      const top=document.createElement('div');
      top.className='how-process-topline';
      top.innerHTML=`<p class="how-process-kicker">ЄДИНИЙ РОБОЧИЙ ЦИКЛ</p><div class="how-process-topline-line" aria-hidden="true"></div>`;
      panel.append(top,steps,slot);
      (container||section).appendChild(panel);
    }
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>requestAnimationFrame(run));
  else requestAnimationFrame(run);
})();