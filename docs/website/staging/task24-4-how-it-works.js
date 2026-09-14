(()=>{
  const STYLE_ID='task24-4-how-style';
  const icons={
    task:`<svg viewBox="0 0 64 64" aria-hidden="true"><rect x="15" y="9" width="34" height="46" rx="7"/><path d="M24 9V5h16v4M24 22h16M24 32h16M24 42h12"/></svg>`,
    run:`<svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="21"/><path d="M27 21l17 11-17 11z"/></svg>`,
    meter:`<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M13 44a19 19 0 1 1 38 0M32 32l12-9"/><circle cx="32" cy="32" r="3.5"/><path d="M20 44h24"/></svg>`,
    result:`<svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="22"/><path d="M21 32l8 8 15-17"/></svg>`
  };

  function css(){
    document.getElementById(STYLE_ID)?.remove();
    const s=document.createElement('style');
    s.id=STYLE_ID;
    s.textContent=`
#how-it-works{padding:32px 0 40px!important}
#how-it-works>.container{width:min(1280px,calc(100% - 48px))!important;margin-inline:auto!important}
#how-it-works .section-head{display:grid!important;grid-template-columns:minmax(0,62fr) minmax(330px,38fr)!important;gap:28px!important;align-items:end!important;margin-bottom:18px!important}
#how-it-works .section-head .eyebrow{margin:0 0 10px!important;color:#27cfff!important;font-size:13px!important;font-weight:800!important;letter-spacing:.14em!important}
#how-it-works .section-head h2{margin:0!important;max-width:none!important;font-size:clamp(42px,3.35vw,58px)!important;line-height:.98!important;letter-spacing:-.03em!important}
#how-it-works .section-head>p{margin:0!important;max-width:470px;color:var(--text-2)!important;font-size:18px!important;line-height:1.44!important}

#how-it-works .how-process-panel{position:relative;width:100%;box-sizing:border-box;border:1px solid rgba(39,181,235,.30);border-radius:22px;background:radial-gradient(circle at 18% 26%,rgba(32,170,232,.10),transparent 34%),radial-gradient(circle at 84% 70%,rgba(61,220,170,.05),transparent 28%),linear-gradient(180deg,rgba(7,27,42,.84),rgba(5,19,30,.72));box-shadow:inset 0 1px 0 rgba(255,255,255,.03),0 18px 42px rgba(0,0,0,.12);padding:20px 28px 16px;overflow:hidden}
#how-it-works .how-process-topline{display:flex;align-items:center;gap:16px;margin-bottom:12px}
#how-it-works .how-process-kicker{margin:0;color:#79d8ff;font-size:12px;font-weight:800;letter-spacing:.18em;text-transform:uppercase;white-space:nowrap}
#how-it-works .how-process-topline-line{height:1px;flex:1;background:linear-gradient(90deg,rgba(40,201,255,.38),rgba(40,201,255,.05))}

#how-it-works #how-steps.how-process-flow{position:relative;display:grid!important;grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:0!important;margin:0!important;padding:0!important}
#how-it-works #how-steps.how-process-flow::before{content:'';position:absolute;left:7.5%;right:7.5%;top:76px;height:2px;background:linear-gradient(90deg,rgba(38,201,255,.18),rgba(38,201,255,.96) 9%,rgba(38,201,255,.96) 91%,rgba(38,201,255,.18));box-shadow:0 0 10px rgba(38,201,255,.16);z-index:0}
#how-it-works #how-steps.how-process-flow article{position:relative;min-height:262px!important;padding:0 24px 2px!important;margin:0!important;background:none!important;border:none!important;border-radius:0!important;overflow:visible!important;text-align:left!important;display:block!important;z-index:1}
#how-it-works #how-steps.how-process-flow article:not(:last-child)::after{content:'';position:absolute;top:69px;right:-7px;width:15px;height:15px;border-top:2px solid #32d0ff;border-right:2px solid #32d0ff;transform:rotate(45deg);z-index:3;background:transparent}
#how-it-works #how-steps.how-process-flow article:not(:last-child)::before{content:'';position:absolute;right:0;top:124px;width:1px;height:112px;background:linear-gradient(180deg,rgba(39,201,255,.03),rgba(39,201,255,.18),rgba(39,201,255,.03))}
#how-it-works .how-step-number{display:block;margin:0 0 10px;color:#48d7ff;font-size:15px;font-weight:800;letter-spacing:.09em;line-height:1}
#how-it-works .how-step-marker{position:relative;width:104px;height:104px;margin:0 0 16px;border-radius:999px;border:1px solid rgba(39,201,255,.42);background:radial-gradient(circle at 50% 38%,rgba(35,168,226,.22),rgba(7,25,38,.90));display:grid;place-items:center;box-shadow:0 0 34px rgba(39,201,255,.10),inset 0 0 28px rgba(39,201,255,.025);z-index:2}
#how-it-works .how-step-marker::after{content:'';position:absolute;left:50%;top:100%;width:1px;height:16px;background:linear-gradient(180deg,rgba(39,201,255,.65),rgba(39,201,255,.04))}
#how-it-works .how-step-icon svg{width:60px;height:60px;fill:none;stroke:#34d5ff;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round;filter:drop-shadow(0 0 5px rgba(47,208,255,.12))}
#how-it-works #how-steps.how-process-flow article:nth-child(4) .how-step-marker{border-color:rgba(64,221,168,.44);background:radial-gradient(circle at 50% 38%,rgba(64,221,168,.20),rgba(7,27,31,.90))}
#how-it-works #how-steps.how-process-flow article:nth-child(4) .how-step-icon svg{stroke:#4be3ad}
#how-it-works .how-step-title{margin:0 0 8px!important;color:var(--text-1)!important;font-size:27px!important;line-height:1.02!important;font-weight:800!important;letter-spacing:-.01em!important;max-width:265px}
#how-it-works .how-step-copy{margin:0!important;color:var(--text-2)!important;font-size:16px!important;line-height:1.38!important;max-width:270px}

#how-it-works .connection-slot{margin:4px 0 0!important;padding:14px 0 0!important;border:0!important;border-top:1px solid rgba(53,170,225,.22)!important;background:none!important;min-height:0!important}
#how-it-works .how-process-summary{display:block}
#how-it-works .how-process-formula{margin:0;color:#f1fbff;font-size:16px;font-weight:750;line-height:1.4;letter-spacing:.01em;text-align:left;padding:0 4px}

@media(max-width:1180px){
  #how-it-works .section-head{grid-template-columns:minmax(0,60fr) minmax(310px,40fr)!important;gap:24px!important}
  #how-it-works .section-head h2{font-size:clamp(40px,4.1vw,52px)!important}
  #how-it-works #how-steps.how-process-flow article{padding-inline:18px!important;min-height:250px!important}
  #how-it-works .how-step-marker{width:94px;height:94px}
  #how-it-works .how-step-icon svg{width:54px;height:54px}
  #how-it-works .how-step-title{font-size:23px!important}
  #how-it-works .how-step-copy{font-size:14.5px!important}
}

@media(max-width:900px){
  #how-it-works .section-head{grid-template-columns:1fr!important;gap:10px!important;align-items:start!important}
  #how-it-works .section-head>p{max-width:760px}
}

@media(max-width:700px){
  #how-it-works{padding:26px 0 32px!important}
  #how-it-works>.container{width:min(100% - 28px,620px)!important}
  #how-it-works .section-head{gap:12px!important;margin-bottom:16px!important}
  #how-it-works .section-head h2{font-size:clamp(34px,10.5vw,44px)!important;line-height:1.02!important}
  #how-it-works .section-head>p{font-size:15px!important;line-height:1.45!important}
  #how-it-works .how-process-panel{padding:16px 16px 14px}
  #how-it-works .how-process-topline{margin-bottom:12px}
  #how-it-works #how-steps.how-process-flow{grid-template-columns:1fr!important;gap:0!important}
  #how-it-works #how-steps.how-process-flow::before{left:45px;right:auto;top:54px;bottom:26px;width:2px;height:auto;background:linear-gradient(180deg,rgba(39,201,255,.20),rgba(39,201,255,.88) 10%,rgba(39,201,255,.88) 90%,rgba(39,201,255,.20))}
  #how-it-works #how-steps.how-process-flow article{min-height:0!important;padding:0 0 26px 116px!important}
  #how-it-works #how-steps.how-process-flow article:not(:last-child)::before{display:none}
  #how-it-works #how-steps.how-process-flow article:not(:last-child)::after{top:auto;right:auto;left:39px;bottom:9px;width:11px;height:11px;border-top:0;border-right:2px solid #32d0ff;border-bottom:2px solid #32d0ff;transform:rotate(45deg)}
  #how-it-works .how-step-number{position:absolute;left:0;top:0;width:90px;text-align:center;margin:0;font-size:13px}
  #how-it-works .how-step-marker{position:absolute;left:0;top:22px;width:90px;height:90px;margin:0}
  #how-it-works .how-step-marker::after{display:none}
  #how-it-works .how-step-icon svg{width:50px;height:50px}
  #how-it-works .how-step-title{font-size:20px!important;margin:4px 0 7px!important;max-width:none}
  #how-it-works .how-step-copy{font-size:14px!important;line-height:1.42!important;max-width:none}
  #how-it-works .connection-slot{margin-top:0!important;padding-top:12px!important}
  #how-it-works .how-process-formula{text-align:left;font-size:13px;line-height:1.45;padding:0}
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
      const eyebrow=head.querySelector('.eyebrow');
      if(eyebrow)eyebrow.textContent='ЯК ЦЕ ПРАЦЮЄ';
      const title=head.querySelector('h2');
      if(title)title.textContent='ВІД ЗАВДАННЯ ДО ПЕРЕВІРЕНОГО РЕЗУЛЬТАТУ';
      const p=head.querySelector(':scope > p');
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