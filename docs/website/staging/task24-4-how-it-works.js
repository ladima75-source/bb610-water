(()=>{
  const STYLE_ID='task24-4-how-style';
  const ico={
    task:`<svg viewBox="0 0 64 64" aria-hidden="true"><rect x="15" y="9" width="34" height="46" rx="7"/><path d="M24 9V5h16v4M24 22h16M24 32h16M24 42h12"/></svg>`,
    run:`<svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="21"/><path d="M27 21l17 11-17 11z"/></svg>`,
    meter:`<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M13 44a19 19 0 1 1 38 0M32 32l12-9"/><circle cx="32" cy="32" r="3.5"/><path d="M20 44h24"/></svg>`,
    result:`<svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="22"/><path d="M21 32l8 8 15-17"/></svg>`,
    leaf:`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20V10M12 13c-4 0-7-2.5-8-6 5-.5 8 1.8 8 5M12 15c5 0 8-2.5 9-7-5-.6-9 2-9 6"/></svg>`,
    drop:`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3c3 4 6 7 6 11a6 6 0 1 1-12 0c0-4 3-7 6-11z"/></svg>`,
    check:`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12l4 4 10-10"/></svg>`
  };

  function css(){
    document.getElementById(STYLE_ID)?.remove();
    const s=document.createElement('style');
    s.id=STYLE_ID;
    s.textContent=`
#how-it-works{padding:34px 0 42px!important;background:linear-gradient(180deg,#0a1820 0%,#0b1b24 100%)}
#how-it-works>.container{width:min(1380px,calc(100% - 48px))!important;margin-inline:auto!important}
#how-it-works .section-head{display:grid!important;grid-template-columns:minmax(0,58fr) minmax(360px,42fr)!important;gap:52px!important;align-items:end!important;margin-bottom:24px!important}
#how-it-works .section-head .eyebrow{margin:0 0 10px!important;color:#28d1ff!important;font-size:13px!important;font-weight:800!important;letter-spacing:.18em!important}
#how-it-works .section-head h2{margin:0!important;max-width:790px!important;font-size:clamp(46px,3.7vw,64px)!important;line-height:.95!important;letter-spacing:-.035em!important}
#how-it-works .section-head>p{margin:0 0 4px!important;max-width:560px!important;color:#c7d6df!important;font-size:20px!important;line-height:1.42!important}
#how-it-works .how-process-panel{position:relative;width:100%;box-sizing:border-box;border:1px solid rgba(41,195,248,.34);border-radius:24px;background:radial-gradient(circle at 20% 18%,rgba(24,144,211,.14),transparent 30%),radial-gradient(circle at 82% 72%,rgba(55,215,166,.07),transparent 28%),linear-gradient(180deg,rgba(4,28,45,.94),rgba(4,20,33,.92));box-shadow:inset 0 1px 0 rgba(255,255,255,.04),0 24px 60px rgba(0,0,0,.18);overflow:hidden}
#how-it-works .how-process-topline{display:flex;align-items:center;gap:16px;padding:20px 24px 0}
#how-it-works .how-process-kicker{margin:0;color:#82dfff;font-size:12px;font-weight:800;letter-spacing:.18em;text-transform:uppercase;white-space:nowrap}
#how-it-works .how-process-topline-line{height:1px;flex:1;background:linear-gradient(90deg,rgba(50,205,255,.46),rgba(50,205,255,.04))}
#how-it-works #how-steps.how-process-flow{display:grid!important;grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:0!important;margin:0!important;padding:12px 0 0!important}
#how-it-works #how-steps.how-process-flow article{position:relative;min-height:390px!important;padding:0 22px 20px!important;background:linear-gradient(180deg,rgba(5,30,48,.20),rgba(5,21,33,.05))!important;border:none!important;border-radius:0!important;overflow:visible!important;text-align:left!important;display:flex!important;flex-direction:column!important;z-index:1}
#how-it-works #how-steps.how-process-flow article:not(:last-child){border-right:1px solid rgba(69,166,214,.18)!important}
#how-it-works .how-step-number{display:flex;align-items:center;justify-content:center;width:64px;height:64px;border-radius:50%;border:1px solid rgba(49,204,255,.48);background:linear-gradient(180deg,rgba(13,53,78,.96),rgba(6,29,46,.92));box-shadow:0 0 26px rgba(42,195,250,.11);color:#42d7ff;font-size:22px!important;font-weight:800!important;letter-spacing:.04em!important;margin:0 0 10px!important;position:relative;z-index:3}
#how-it-works .how-step-visual{position:relative;height:150px;display:flex;align-items:center;justify-content:center;margin-bottom:16px}
#how-it-works .how-step-orb{width:94px;height:94px;border-radius:50%;border:1px solid rgba(44,198,251,.34);background:radial-gradient(circle at 50% 40%,rgba(28,157,221,.20),rgba(7,28,42,.86));display:grid;place-items:center;box-shadow:0 0 24px rgba(41,199,250,.08)}
#how-it-works .how-step-orb svg{width:56px;height:56px;fill:none;stroke:#38d6ff;stroke-width:2.1;stroke-linecap:round;stroke-linejoin:round}
#how-it-works article:nth-child(4) .how-step-orb{border-color:rgba(65,226,172,.42);background:radial-gradient(circle at 50% 40%,rgba(55,206,160,.20),rgba(7,31,33,.86))}
#how-it-works article:nth-child(4) .how-step-orb svg{stroke:#45e2ab}
#how-it-works .how-step-title{margin:0 0 10px!important;color:#fff!important;font-size:25px!important;line-height:1.03!important;font-weight:800!important;letter-spacing:-.01em!important;min-height:52px}
#how-it-works .how-step-copy{margin:0 0 16px!important;color:#c6d7e0!important;font-size:17px!important;line-height:1.38!important;max-width:285px}
#how-it-works .how-step-cta{margin-top:auto;display:flex;align-items:center;justify-content:space-between;gap:12px;border:1px solid rgba(40,195,248,.30);border-radius:999px;padding:11px 14px;color:#81ddff;font-size:14px;font-weight:700;background:rgba(4,24,38,.54)}
#how-it-works .how-step-cta:after{content:'›';font-size:24px;line-height:1;color:#35d2ff}
#how-it-works .how-connector{position:absolute;right:-12px;top:176px;width:24px;height:24px;z-index:5;color:#36d5ff}
#how-it-works .how-connector:before{content:'';position:absolute;left:2px;top:11px;width:18px;height:2px;background:#36d5ff}
#how-it-works .how-connector:after{content:'';position:absolute;right:1px;top:6px;width:10px;height:10px;border-top:2px solid #36d5ff;border-right:2px solid #36d5ff;transform:rotate(45deg)}
#how-it-works .visual-dashboard{width:170px;height:104px;border:1px solid rgba(45,198,248,.28);border-radius:8px;background:linear-gradient(180deg,#071826,#0b2638);box-shadow:0 16px 28px rgba(0,0,0,.28);padding:8px;transform:perspective(400px) rotateX(2deg)}
#how-it-works .visual-dashboard .bar{height:7px;border-radius:4px;background:linear-gradient(90deg,#18baf0 36%,rgba(24,186,240,.16) 36%);margin-bottom:7px}
#how-it-works .visual-dashboard .grid{display:grid;grid-template-columns:repeat(3,1fr);gap:5px;height:74px}
#how-it-works .visual-dashboard .grid i{display:block;border:1px solid rgba(61,180,230,.16);border-radius:5px;background:linear-gradient(180deg,rgba(20,67,93,.62),rgba(9,39,56,.68));position:relative}
#how-it-works .visual-dashboard .grid i:after{content:'';position:absolute;left:6px;right:6px;bottom:8px;height:3px;border-radius:2px;background:#25c9ff;opacity:.72}
#how-it-works .visual-control{position:relative;width:176px;height:118px;border-radius:12px;background:linear-gradient(145deg,#26333c,#0f171d 72%);box-shadow:inset 0 0 0 1px rgba(255,255,255,.05),0 18px 30px rgba(0,0,0,.32)}
#how-it-works .visual-control:before{content:'';position:absolute;left:16px;top:18px;width:50px;height:72px;border-radius:7px;background:linear-gradient(180deg,#092a3b,#0d1115);box-shadow:inset 0 0 0 1px rgba(53,190,240,.24)}
#how-it-works .visual-control:after{content:'BB610';position:absolute;right:18px;bottom:14px;color:#d8e8ef;font-size:14px;font-weight:800;letter-spacing:.05em}
#how-it-works .visual-control .slots{position:absolute;left:80px;top:18px;right:16px;bottom:28px;display:grid;grid-template-columns:repeat(3,1fr);gap:6px}
#how-it-works .visual-control .slots i{border-radius:4px;background:linear-gradient(180deg,#22323d,#111a20);box-shadow:inset 0 0 0 1px rgba(255,255,255,.05)}
#how-it-works .visual-metrics{width:190px;display:grid;gap:7px}
#how-it-works .metric-row{display:grid;grid-template-columns:34px 1fr;align-items:center;gap:9px;padding:8px 10px;border:1px solid rgba(53,183,234,.24);border-radius:8px;background:rgba(10,39,56,.70)}
#how-it-works .metric-row svg{width:28px;height:28px;fill:none;stroke:#33d1ff;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
#how-it-works .metric-row b{display:block;color:#eefaff;font-size:14px;line-height:1.15}
#how-it-works .metric-row span{color:#9bc4d8;font-size:11px;line-height:1.1}
#how-it-works .visual-zones{width:200px;display:grid;gap:7px}
#how-it-works .zone-status{display:grid;grid-template-columns:24px 1fr auto;align-items:center;gap:8px;padding:8px 10px;border:1px solid rgba(66,185,230,.24);border-radius:8px;background:rgba(9,36,52,.74)}
#how-it-works .zone-status svg{width:18px;height:18px;fill:none;stroke:#40dcaa;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
#how-it-works .zone-status b{color:#dceaf0;font-size:13px;font-weight:600}
#how-it-works .zone-status span{color:#f0fbff;font-size:13px;font-weight:700}
#how-it-works .zone-status.warn svg{stroke:#ffb34f}
#how-it-works .connection-slot{margin:0!important;padding:0 22px 18px!important;border:0!important;background:none!important;min-height:0!important}
#how-it-works .how-process-summary{border:1px solid rgba(42,190,241,.28);border-radius:999px;background:linear-gradient(180deg,rgba(7,34,51,.84),rgba(4,22,34,.78));padding:13px 20px;display:flex!important;align-items:center;justify-content:center}
#how-it-works .how-process-formula{margin:0!important;color:#f3fbff!important;font-size:15px!important;font-weight:750!important;line-height:1.4!important;letter-spacing:.01em!important;text-align:center!important}
@media(max-width:1180px){#how-it-works .section-head{grid-template-columns:minmax(0,58fr) minmax(330px,42fr)!important;gap:30px!important}#how-it-works .section-head h2{font-size:48px!important}#how-it-works #how-steps.how-process-flow article{padding-inline:16px!important;min-height:372px!important}#how-it-works .how-step-title{font-size:22px!important}#how-it-works .how-step-copy{font-size:15px!important}.visual-dashboard{transform:none!important}}
@media(max-width:900px){#how-it-works .section-head{grid-template-columns:1fr!important;gap:12px!important;align-items:start!important}#how-it-works .section-head>p{max-width:760px!important}#how-it-works #how-steps.how-process-flow{grid-template-columns:repeat(2,minmax(0,1fr))!important}#how-it-works #how-steps.how-process-flow article:nth-child(2){border-right:0!important}#how-it-works #how-steps.how-process-flow article{border-bottom:1px solid rgba(69,166,214,.12)!important}#how-it-works .how-connector{display:none}}
@media(max-width:700px){#how-it-works{padding:28px 0 34px!important}#how-it-works>.container{width:min(100% - 28px,620px)!important}#how-it-works .section-head h2{font-size:clamp(34px,10vw,42px)!important;line-height:1.02!important}#how-it-works .section-head>p{font-size:15px!important;line-height:1.45!important}#how-it-works #how-steps.how-process-flow{grid-template-columns:1fr!important}#how-it-works #how-steps.how-process-flow article{min-height:0!important;padding:20px 12px 22px!important;border-right:0!important}#how-it-works .how-step-number{width:52px;height:52px;font-size:18px!important}#how-it-works .how-step-visual{height:132px}.how-step-title{font-size:21px!important}.how-step-copy{font-size:14px!important;max-width:none!important}.how-step-cta{font-size:13px}.connection-slot{padding-inline:12px!important}.how-process-summary{border-radius:16px!important}.how-process-formula{font-size:13px!important}}
`;
    document.head.appendChild(s);
  }
  function visual(kind){
    if(kind==='task')return `<div class="visual-dashboard"><div class="bar"></div><div class="grid"><i></i><i></i><i></i><i></i><i></i><i></i></div></div><div class="how-step-orb" style="position:absolute;left:8px;bottom:12px;width:74px;height:74px">${ico.task}</div>`;
    if(kind==='run')return `<div class="visual-control"><div class="slots"><i></i><i></i><i></i><i></i><i></i><i></i></div></div><div class="how-step-orb" style="position:absolute;right:8px;bottom:12px;width:74px;height:74px">${ico.run}</div>`;
    if(kind==='meter')return `<div class="visual-metrics"><div class="metric-row">${ico.drop}<div><b>pH 5.8</b><span>контроль параметра</span></div></div><div class="metric-row">${ico.meter}<div><b>EC 1.2 mS/cm</b><span>доступний контроль</span></div></div><div class="metric-row">${ico.drop}<div><b>1 250 л</b><span>фактичний об’єм</span></div></div></div>`;
    return `<div class="visual-zones">${[1,2,3,4].map((n,i)=>`<div class="zone-status${i===2?' warn':''}">${ico.leaf}<b>Зона ${n}</b><span>${i===2?'95%':'100%'}</span></div>`).join('')}</div><div class="how-step-orb" style="position:absolute;left:8px;bottom:12px;width:74px;height:74px">${ico.result}</div>`;
  }
  function run(){
    const section=document.querySelector('#how-it-works');if(!section)return;css();
    const container=section.querySelector(':scope > .container')||section.querySelector('.container');
    const head=section.querySelector('.section-head');if(head){const eyebrow=head.querySelector('.eyebrow');if(eyebrow)eyebrow.textContent='ЯК ЦЕ ПРАЦЮЄ';const title=head.querySelector('h2');if(title)title.innerHTML='ВІД ЗАВДАННЯ ДО<br>ПЕРЕВІРЕНОГО РЕЗУЛЬТАТУ';const p=head.querySelector(':scope > p');if(p)p.textContent='BB610 WATER не просто відкриває клапан. Система виконує заданий сценарій, вимірює процес і порівнює результат із завданням.'}
    const data=[
      ['01','task','ЗАДАЄТЕ','Зона · режим · графік · цільовий об’єм','Налаштовуєте сценарій'],
      ['02','run','СИСТЕМА ВИКОНУЄ','Полив · фертигація · послідовність операцій','Автоматично виконує'],
      ['03','meter','СИСТЕМА ВИМІРЮЄ','Фактичний об’єм · доступні контрольовані параметри','Контроль у реальному часі'],
      ['04','result','ОТРИМУЄТЕ РЕЗУЛЬТАТ','Факт по кожній зоні · відхилення · аварійні повідомлення','Повний контроль результату']
    ];
    const steps=section.querySelector('#how-steps');if(steps){steps.className='how-process-flow';steps.innerHTML=data.map((d,i)=>`<article><span class="how-step-number">${d[0]}</span><div class="how-step-visual">${visual(d[1])}</div><h3 class="how-step-title">${d[2]}</h3><p class="how-step-copy">${d[3]}</p><div class="how-step-cta">${d[4]}</div>${i<3?'<span class="how-connector" aria-hidden="true"></span>':''}</article>`).join('')}
    const slot=section.querySelector('#connection-scheme-slot');if(slot)slot.innerHTML=`<div class="how-process-summary"><p class="how-process-formula">Завдання → виконання → фактичний контроль → результат по кожній зоні</p></div>`;
    let panel=section.querySelector('.how-process-panel');if(!panel&&steps&&slot){panel=document.createElement('div');panel.className='how-process-panel';const top=document.createElement('div');top.className='how-process-topline';top.innerHTML=`<p class="how-process-kicker">ЄДИНИЙ РОБОЧИЙ ЦИКЛ</p><div class="how-process-topline-line" aria-hidden="true"></div>`;panel.append(top,steps,slot);(container||section).appendChild(panel)}
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>requestAnimationFrame(run));else requestAnimationFrame(run);
})();