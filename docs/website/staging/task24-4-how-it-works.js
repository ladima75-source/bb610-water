(()=>{
  const STYLE_ID='task24-4-how-style';
  const ico={
    task:`<svg viewBox="0 0 64 64" aria-hidden="true"><rect x="15" y="9" width="34" height="46" rx="7"/><path d="M24 9V5h16v4M24 22h16M24 32h16M24 42h12"/></svg>`,
    run:`<svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="21"/><path d="M27 21l17 11-17 11z"/></svg>`,
    meter:`<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M13 44a19 19 0 1 1 38 0M32 32l12-9"/><circle cx="32" cy="32" r="3.5"/><path d="M20 44h24"/></svg>`,
    result:`<svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="22"/><path d="M21 32l8 8 15-17"/></svg>`,
    leaf:`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20V10M12 13c-4 0-7-2.5-8-6 5-.5 8 1.8 8 5M12 15c5 0 8-2.5 9-7-5-.6-9 2-9 6"/></svg>`,
    drop:`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3c3 4 6 7 6 11a6 6 0 1 1-12 0c0-4 3-7 6-11z"/></svg>`
  };

  function injectStyles(){
    document.getElementById(STYLE_ID)?.remove();
    const s=document.createElement('style');
    s.id=STYLE_ID;
    s.textContent=`
#how-it-works{padding:30px 0 36px!important;background:linear-gradient(180deg,#0a1820 0%,#0b1b24 100%)}
#how-it-works>.container{width:min(1380px,calc(100% - 48px))!important;margin-inline:auto!important}
#how-it-works .section-head{display:grid!important;grid-template-columns:minmax(0,58fr) minmax(360px,42fr)!important;gap:52px!important;align-items:start!important;margin-bottom:18px!important}
#how-it-works .section-head .eyebrow{margin:0 0 10px!important;color:#28d1ff!important;font-size:13px!important;font-weight:800!important;letter-spacing:.18em!important}
#how-it-works .section-head h2{margin:0!important;max-width:790px!important;font-size:clamp(46px,3.7vw,64px)!important;line-height:.95!important;letter-spacing:-.035em!important}
#how-it-works .section-head>p{margin:42px 0 0!important;max-width:560px!important;color:#c7d6df!important;font-size:20px!important;line-height:1.42!important}
#how-it-works .how-process-panel{position:relative;width:100%;box-sizing:border-box;border:1px solid rgba(41,195,248,.34);border-radius:24px;background:radial-gradient(circle at 20% 18%,rgba(24,144,211,.14),transparent 30%),radial-gradient(circle at 82% 72%,rgba(55,215,166,.07),transparent 28%),linear-gradient(180deg,rgba(4,28,45,.94),rgba(4,20,33,.92));box-shadow:inset 0 1px 0 rgba(255,255,255,.04),0 24px 60px rgba(0,0,0,.18);overflow:hidden}
#how-it-works .how-process-topline{display:flex;align-items:center;gap:16px;padding:18px 24px 2px}
#how-it-works .how-process-kicker{margin:0;color:#82dfff;font-size:12px;font-weight:800;letter-spacing:.18em;text-transform:uppercase;white-space:nowrap}
#how-it-works .how-process-topline-line{height:1px;flex:1;background:linear-gradient(90deg,rgba(50,205,255,.46),rgba(50,205,255,.04))}
#how-it-works #how-steps.how-process-flow{display:grid!important;grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:0!important;margin:0!important;padding:8px 0 0!important}
#how-it-works #how-steps.how-process-flow article{position:relative;min-height:328px!important;padding:0 22px 20px!important;background:linear-gradient(180deg,rgba(5,30,48,.18),rgba(5,21,33,.04))!important;border:none!important;border-radius:0!important;overflow:hidden!important;text-align:left!important;display:flex!important;flex-direction:column!important;z-index:1}
#how-it-works #how-steps.how-process-flow article:not(:last-child){border-right:1px solid rgba(69,166,214,.18)!important}
#how-it-works .how-step-headrow{display:flex;align-items:center;justify-content:space-between;gap:16px;height:82px;margin-bottom:0}
#how-it-works .how-step-number{display:flex;align-items:center;justify-content:center;width:58px;height:58px;border-radius:50%;border:1px solid rgba(49,204,255,.48);background:linear-gradient(180deg,rgba(13,53,78,.96),rgba(6,29,46,.92));box-shadow:0 0 26px rgba(42,195,250,.11);color:#42d7ff;font-size:20px!important;font-weight:800!important;letter-spacing:.04em!important;margin:0!important;position:relative;z-index:3;flex:none}
#how-it-works .how-step-orb{width:70px;height:70px;border-radius:50%;border:1px solid rgba(44,198,251,.40);background:radial-gradient(circle at 50% 40%,rgba(28,157,221,.24),rgba(7,28,42,.88));display:grid;place-items:center;box-shadow:0 0 26px rgba(41,199,250,.10);flex:none}
#how-it-works .how-step-orb svg{width:42px;height:42px;fill:none;stroke:#38d6ff;stroke-width:2.1;stroke-linecap:round;stroke-linejoin:round}
#how-it-works article:nth-child(4) .how-step-orb{border-color:rgba(65,226,172,.44);background:radial-gradient(circle at 50% 40%,rgba(55,206,160,.22),rgba(7,31,33,.88))}
#how-it-works article:nth-child(4) .how-step-orb svg{stroke:#45e2ab}
#how-it-works .how-step-visual{height:126px;display:flex;align-items:flex-start;justify-content:center;margin:0 0 10px;position:relative}
#how-it-works .how-step-title{margin:0 0 7px!important;color:#fff!important;font-size:24px!important;line-height:1.04!important;font-weight:800!important;letter-spacing:-.01em!important;min-height:0!important;position:relative;z-index:3}
#how-it-works .how-step-copy{margin:0!important;color:#c6d7e0!important;font-size:16px!important;line-height:1.34!important;max-width:285px;position:relative;z-index:3}
#how-it-works .how-connector{position:absolute;right:-12px;top:155px;width:24px;height:24px;z-index:5;color:#36d5ff}
#how-it-works .how-connector:before{content:'';position:absolute;left:2px;top:11px;width:18px;height:2px;background:#36d5ff}
#how-it-works .how-connector:after{content:'';position:absolute;right:1px;top:6px;width:10px;height:10px;border-top:2px solid #36d5ff;border-right:2px solid #36d5ff;transform:rotate(45deg)}
#how-it-works .visual-dashboard{width:170px;height:104px;border:1px solid rgba(45,198,248,.28);border-radius:8px;background:linear-gradient(180deg,#071826,#0b2638);box-shadow:0 14px 24px rgba(0,0,0,.24);padding:8px}
#how-it-works .visual-dashboard .bar{height:7px;border-radius:4px;background:linear-gradient(90deg,#18baf0 36%,rgba(24,186,240,.16) 36%);margin-bottom:7px}
#how-it-works .visual-dashboard .grid{display:grid;grid-template-columns:repeat(3,1fr);gap:5px;height:74px}
#how-it-works .visual-dashboard .grid i{display:block;border:1px solid rgba(61,180,230,.16);border-radius:5px;background:linear-gradient(180deg,rgba(20,67,93,.62),rgba(9,39,56,.68));position:relative}
#how-it-works .visual-dashboard .grid i:after{content:'';position:absolute;left:6px;right:6px;bottom:8px;height:3px;border-radius:2px;background:#25c9ff;opacity:.72}
#how-it-works .visual-control{position:relative;width:176px;height:118px;border-radius:12px;background:linear-gradient(145deg,#26333c,#0f171d 72%);box-shadow:inset 0 0 0 1px rgba(255,255,255,.05),0 16px 26px rgba(0,0,0,.28)}
#how-it-works .visual-control:before{content:'';position:absolute;left:16px;top:18px;width:50px;height:72px;border-radius:7px;background:linear-gradient(180deg,#092a3b,#0d1115);box-shadow:inset 0 0 0 1px rgba(53,190,240,.24)}
#how-it-works .visual-control .slots{position:absolute;left:80px;top:18px;right:16px;bottom:18px;display:grid;grid-template-columns:repeat(3,1fr);gap:6px}
#how-it-works .visual-control .slots i{border-radius:4px;background:linear-gradient(180deg,#22323d,#111a20);box-shadow:inset 0 0 0 1px rgba(255,255,255,.05)}
#how-it-works .visual-metrics{width:190px;display:grid;gap:4px;align-self:flex-start}
#how-it-works .metric-row{display:grid;grid-template-columns:26px 1fr;align-items:center;gap:7px;padding:4px 7px;border:1px solid rgba(53,183,234,.24);border-radius:8px;background:rgba(10,39,56,.70);min-height:24px;box-sizing:border-box}
#how-it-works .metric-row svg{width:20px;height:20px;fill:none;stroke:#33d1ff;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
#how-it-works .metric-row b{display:block;color:#eefaff;font-size:12px;line-height:1.05}
#how-it-works .metric-row span{color:#9bc4d8;font-size:8.5px;line-height:1.05}
#how-it-works .visual-zones{width:200px;display:grid;gap:5px;align-self:flex-start}
#how-it-works .zone-status{display:grid;grid-template-columns:20px 1fr auto;align-items:center;gap:7px;padding:5px 8px;border:1px solid rgba(66,185,230,.24);border-radius:8px;background:rgba(9,36,52,.74);min-height:22px}
#how-it-works .zone-status svg{width:15px;height:15px;fill:none;stroke:#40dcaa;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
#how-it-works .zone-status b{color:#dceaf0;font-size:12px;font-weight:600}
#how-it-works .zone-status span{color:#f0fbff;font-size:12px;font-weight:700}
#how-it-works .connection-slot{display:none!important}
@media(max-width:1180px){#how-it-works .section-head{grid-template-columns:minmax(0,58fr) minmax(330px,42fr)!important;gap:30px!important}#how-it-works .section-head h2{font-size:48px!important}#how-it-works #how-steps.how-process-flow article{padding-inline:16px!important}#how-it-works .how-step-title{font-size:22px!important}#how-it-works .how-step-copy{font-size:15px!important}#how-it-works .section-head>p{margin-top:36px!important}}
@media(max-width:900px){#how-it-works .section-head{grid-template-columns:1fr!important;gap:12px!important;align-items:start!important}#how-it-works .section-head>p{max-width:760px!important;margin-top:0!important}#how-it-works #how-steps.how-process-flow{grid-template-columns:repeat(2,minmax(0,1fr))!important}#how-it-works #how-steps.how-process-flow article:nth-child(2){border-right:0!important}#how-it-works #how-steps.how-process-flow article{border-bottom:1px solid rgba(69,166,214,.12)!important}#how-it-works .how-connector{display:none}}
@media(max-width:700px){#how-it-works{padding:28px 0 34px!important}#how-it-works>.container{width:min(100% - 28px,620px)!important}#how-it-works .section-head h2{font-size:clamp(34px,10vw,42px)!important;line-height:1.02!important}#how-it-works .section-head>p{font-size:15px!important;line-height:1.45!important}#how-it-works #how-steps.how-process-flow{grid-template-columns:1fr!important}#how-it-works #how-steps.how-process-flow article{min-height:0!important;padding:16px 12px 20px!important;border-right:0!important}#how-it-works .how-step-headrow{height:70px}#how-it-works .how-step-number{width:50px;height:50px;font-size:18px!important}#how-it-works .how-step-orb{width:60px;height:60px}#how-it-works .how-step-orb svg{width:36px;height:36px}#how-it-works .how-step-visual{height:118px!important}#how-it-works .how-step-title{font-size:21px!important}#how-it-works .how-step-copy{font-size:14px!important;max-width:none!important}}
`;
    document.head.appendChild(s);
  }

  function visual(kind){
    if(kind==='task') return `<div class="visual-dashboard"><div class="bar"></div><div class="grid"><i></i><i></i><i></i><i></i><i></i><i></i></div></div>`;
    if(kind==='run') return `<div class="visual-control"><div class="slots"><i></i><i></i><i></i><i></i><i></i><i></i></div></div>`;
    if(kind==='meter') return `<div class="visual-metrics"><div class="metric-row">${ico.drop}<div><b>pH 5.8</b><span>контроль параметра</span></div></div><div class="metric-row">${ico.meter}<div><b>EC 1.2 mS/cm</b><span>доступний контроль</span></div></div><div class="metric-row">${ico.drop}<div><b>1 250 л</b><span>фактичний об’єм</span></div></div></div>`;
    return `<div class="visual-zones">${[1,2,3,4].map((n,i)=>`<div class="zone-status">${ico.leaf}<b>Зона ${n}</b><span>${i===2?'95%':'100%'}</span></div>`).join('')}</div>`;
  }

  function rebuild(){
    const section=document.querySelector('#how-it-works');
    if(!section)return;
    injectStyles();
    const container=section.querySelector(':scope > .container')||section.querySelector('.container');
    const head=section.querySelector('.section-head');
    if(head){
      const eyebrow=head.querySelector('.eyebrow');
      if(eyebrow)eyebrow.textContent='ЯК ЦЕ ПРАЦЮЄ';
      const h=head.querySelector('h2');
      if(h)h.textContent='ВІД ЗАВДАННЯ ДО ПЕРЕВІРЕНОГО РЕЗУЛЬТАТУ';
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
      steps.innerHTML=data.map((d,i)=>`<article><div class="how-step-headrow"><span class="how-step-number">${d[0]}</span><div class="how-step-orb">${ico[d[1]]}</div></div><div class="how-step-visual">${visual(d[1])}</div><h3 class="how-step-title">${d[2]}</h3><p class="how-step-copy">${d[3]}</p>${i<3?'<div class="how-connector" aria-hidden="true"></div>':''}</article>`).join('');
    }
    const slot=section.querySelector('#connection-scheme-slot');
    if(slot)slot.innerHTML='';
    let panel=section.querySelector('.how-process-panel');
    if(!panel&&steps){
      panel=document.createElement('div');
      panel.className='how-process-panel';
      const top=document.createElement('div');
      top.className='how-process-topline';
      top.innerHTML=`<p class="how-process-kicker">ЄДИНИЙ РОБОЧИЙ ЦИКЛ</p><div class="how-process-topline-line"></div>`;
      panel.append(top,steps);
      (container||section).appendChild(panel);
    }
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>requestAnimationFrame(rebuild));
  else requestAnimationFrame(rebuild);
})();