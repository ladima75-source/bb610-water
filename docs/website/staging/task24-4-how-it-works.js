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
#how-it-works{padding:30px 0 36px!important}
#how-it-works>.container{width:min(1280px,calc(100% - 48px))!important;margin-inline:auto!important}
#how-it-works .section-head{display:grid!important;grid-template-columns:minmax(0,58fr) minmax(340px,42fr)!important;gap:46px!important;align-items:end!important;margin-bottom:22px!important}
#how-it-works .section-head .eyebrow{margin:0 0 10px!important;color:#27cfff!important;font-size:13px!important;font-weight:800!important;letter-spacing:.14em!important}
#how-it-works .section-head h2{margin:0!important;max-width:760px;font-size:clamp(40px,3vw,56px)!important;line-height:1.02!important;letter-spacing:-.025em!important}
#how-it-works .section-head>p{margin:0!important;max-width:530px;color:var(--text-2)!important;font-size:18px!important;line-height:1.48!important;padding-bottom:4px!important}

#how-it-works .how-process-panel{position:relative;width:100%;box-sizing:border-box;border:1px solid rgba(39,181,235,.34);border-radius:24px;background:radial-gradient(circle at 14% 28%,rgba(32,170,232,.11),transparent 31%),radial-gradient(circle at 86% 72%,rgba(61,220,170,.055),transparent 25%),linear-gradient(180deg,rgba(7,28,43,.88),rgba(5,18,29,.76));box-shadow:inset 0 1px 0 rgba(255,255,255,.03),0 16px 44px rgba(0,0,0,.10);padding:24px 26px 18px;overflow:hidden}
#how-it-works .how-process-topline{display:flex;align-items:center;gap:16px;margin-bottom:18px}
#how-it-works .how-process-kicker{margin:0;color:#79d8ff;font-size:12px;font-weight:800;letter-spacing:.18em;text-transform:uppercase;white-space:nowrap}
#how-it-works .how-process-topline-line{height:1px;flex:1;background:linear-gradient(90deg,rgba(40,201,255,.42),rgba(40,201,255,.04))}

#how-it-works #how-steps.how-process-flow{position:relative;display:grid!important;grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:0!important;margin:0!important;padding:0!important}
#how-it-works #how-steps.how-process-flow::before{content:'';position:absolute;left:7%;right:7%;top:70px;height:2px;background:linear-gradient(90deg,rgba(38,201,255,.18),rgba(38,201,255,.96) 8%,rgba(38,201,255,.96) 92%,rgba(38,201,255,.18));box-shadow:0 0 12px rgba(38,201,255,.18);z-index:0}
#how-it-works #how-steps.how-process-flow article{position:relative;min-height:250px!important;padding:0 24px 8px!important;margin:0!important;background:linear-gradient(180deg,rgba(13,38,54,.10),rgba(13,38,54,0) 78%)!important;border:none!important;border-radius:0!important;overflow:visible!important;text-align:left!important;display:block!important;z-index:1}
#how-it-works #how-steps.how-process-flow article:not(:first-child)::before{content:'';position:absolute;left:0;top:104px;bottom:16px;width:1px;background:linear-gradient(180deg,rgba(54,181,231,.02),rgba(54,181,231,.18),rgba(54,181,231,.02))}
#how-it-works #how-steps.how-process-flow article:not(:last-child)::after{content:'';position:absolute;top:64px;right:-7px;width:14px;height:14px;border-top:2px solid #32d0ff;border-right:2px solid #32d0ff;transform:rotate(45deg);z-index:3;background:transparent}
#how-it-works .how-step-number{display:block;margin:0 0 10px;color:#39d3ff;font-size:14px;font-weight:800;letter-spacing:.08em;line-height:1}
#how-it-works .how-step-marker{position:relative;width:92px;height:92px;margin:0 0 20px;border-radius:999px;border:1px solid rgba(39,201,255,.45);background:radial-gradient(circle at 50% 38%,rgba(35,168,226,.22),rgba(7,25,38,.92));display:grid;place-items:center;box-shadow:0 0 30px rgba(39,201,255,.11);z-index:2}
#how-it-works .how-step-marker::after{content:'';position:absolute;left:50%;top:100%;width:1px;height:16px;background:linear-gradient(180deg,rgba(39,201,255,.65),rgba(39,201,255,.03))}
#how-it-works .how-step-icon svg{width:54px;height:54px;fill:none;stroke:#31d3ff;stroke-width:2.1;stroke-linecap:round;stroke-linejoin:round}
#how-it-works #how-steps.how-process-flow article:nth-child(4) .how-step-marker{border-color:rgba(64,221,168,.52);background:radial-gradient(circle at 50% 38%,rgba(64,221,168,.22),rgba(7,27,31,.92));box-shadow:0 0 30px rgba(64,221,168,.10)}
#how-it-works #how-steps.how-process-flow article:nth-child(4) .how-step-icon svg{stroke:#48e4ad}
#how-it-works .how-step-title{margin:0 0 10px!important;color:var(--text-1)!important;font-size:26px!important;line-height:1.05!important;font-weight:800!important;letter-spacing:0!important;max-width:280px}
#how-it-works .how-step-copy{margin:0!important;color:var(--text-2)!important;font-size:16px!important;line-height:1.42!important;max-width:265px}

#how-it-works .connection-slot{margin:0!important;padding:16px 0 0!important;border:0!important;border-top:1px solid rgba(53,170,225,.24)!important;background:none!important;min-height:0!important}
#how-it-works .how-process-summary{display:block}
#how-it-works .how-process-formula{margin:0;color:#f0f9ff;font-size:16px;font-weight:750;line-height:1.4;letter-spacing:.01em;text-align:center}

@media(max-width:1100px){
  #how-it-works .section-head{grid-template-columns:1fr!important;gap:10px!important;align-items:start!important}
  #how-it-works .section-head>p{max-width:760px}
  #how-it-works #how-steps.how-process-flow article{padding-inline:16px!important}
  #how-it-works .how-step-title{font-size:22px!important}
  #how-it-works .how-step-copy{font-size:14px!important}
}

@media(max-width:700px){
  #how-it-works{padding:28px 0 34px!important}
  #how-it-works>.container{width:min(100% - 28px,620px)!important}
  #how-it-works .section-head{gap:12px!important;margin-bottom:18px!important}
  #how-it-works .section-head h2{font-size:clamp(31px,9vw,40px)!important}
  #how-it-works .section-head>p{font-size:15px!important;line-height:1.45!important}
  #how-it-works .how-process-panel{padding:18px 16px 14px}
  #how-it-works .how-process-topline{margin-bottom:12px}
  #how-it-works #how-steps.how-process-flow{grid-template-columns:1fr!important;gap:0!important}
  #how-it-works #how-steps.how-process-flow::before{left:45px;right:auto;top:46px;bottom:30px;width:2px;height:auto;background:linear-gradient(180deg,rgba(39,201,255,.20),rgba(39,201,255,.9) 10%,rgba(39,201,255,.9) 90%,rgba(39,201,255,.20))}
  #how-it-works #how-steps.how-process-flow article{min-height:0!important;padding:0 0 28px 112px!important;background:none!important}
  #how-it-works #how-steps.how-process-flow article:not(:first-child)::before{display:none}
  #how-it-works #how-steps.how-process-flow article:not(:last-child)::after{top:auto;right:auto;left:40px;bottom:10px;width:10px;height:10px;border-top:0;border-right:2px solid #32d0ff;border-bottom:2px solid #32d0ff;transform:rotate(45deg)}
  #how-it-works .how-step-number{position:absolute;left:0;top:0;width:92px;text-align:center;margin:0;font-size:12px}
  #how-it-works .how-step-marker{position:absolute;left:0;top:22px;width:92px;height:92px;margin:0}
  #how-it-works .how-step-marker::after{display:none}
  #how-it-works .how-step-icon svg{width:50px;height:50px}
  #how-it-works .how-step-title{font-size:21px!important;margin:4px 0 8px!important}
  #how-it-works .how-step-copy{font-size:14px!important;line-height:1.42!important;max-width:none}
  #how-it-works .connection-slot{margin-top:0!important;padding-top:14px!important}
  #how-it-works .how-process-formula{text-align:left;font-size:14px;line-height:1.45}
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
      const explanation=head.querySelector(':scope > p');
      if(explanation)explanation.textContent='BB610 WATER не просто відкриває клапан. Система виконує заданий сценарій, вимірює процес і порівнює результат із завданням.';
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