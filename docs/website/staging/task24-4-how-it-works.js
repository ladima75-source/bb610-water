(()=>{
  const STYLE_ID='task24-4-1-how-style';
  const icon=(kind)=>({
    task:`<svg viewBox="0 0 64 64" aria-hidden="true"><rect x="14" y="10" width="36" height="44" rx="6"/><path d="M22 22h20M22 32h14M22 42h18"/><path d="M24 10v-4h16v4"/></svg>`,
    run:`<svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="20"/><path d="M28 22l14 10-14 10z"/></svg>`,
    meter:`<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M12 44a20 20 0 1 1 40 0"/><path d="M32 32l10-8"/><circle cx="32" cy="32" r="3"/><path d="M18 44h28"/></svg>`,
    result:`<svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="22"/><path d="M21 32l7 7 15-16"/></svg>`
  }[kind]);

  function injectStyles(){
    if(document.getElementById(STYLE_ID)) return;
    const s=document.createElement('style');
    s.id=STYLE_ID;
    s.textContent=`
#how-it-works{padding:42px 0 44px!important}
#how-it-works .container{width:min(1280px,calc(100% - 56px))}
#how-it-works .section-head{margin-bottom:22px!important;grid-template-columns:minmax(0,1.05fr) minmax(360px,.95fr);gap:48px;align-items:end}
#how-it-works .section-head h2{max-width:760px;margin-bottom:0!important}
#how-it-works .section-head>p{margin:0!important;align-self:end;font-size:16px;line-height:1.45;color:var(--text-2)}
#how-it-works .how-flow{display:grid!important;grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:18px!important;position:relative}
#how-it-works .how-flow article{position:relative;min-height:250px!important;padding:18px 20px 20px!important;border:1px solid rgba(37,171,228,.30)!important;border-radius:14px!important;background:linear-gradient(180deg,rgba(8,29,43,.66),rgba(6,22,34,.5))!important;overflow:visible!important;display:grid;grid-template-rows:auto 72px auto 1fr;align-content:start}
#how-it-works .how-flow article:not(:last-child)::after{content:'→';position:absolute;right:-15px;top:50%;transform:translate(50%,-50%);z-index:3;color:#25c9ff;font-size:22px;font-weight:700;line-height:1;text-shadow:0 0 12px rgba(37,201,255,.35)}
#how-it-works .how-flow article>span{margin:0 0 6px!important;color:#25c9ff!important;font-size:12px!important;font-weight:700!important;letter-spacing:.08em!important}
#how-it-works .how-step-icon{height:72px;display:flex;align-items:center;justify-content:center;margin:0}
#how-it-works .how-step-icon svg{width:64px;height:64px;fill:none;stroke:#27c9ff;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round}
#how-it-works .how-flow article:nth-child(4) .how-step-icon svg{stroke:#40dda8}
#how-it-works .how-flow article strong{font-size:18px!important;line-height:1.16!important;margin:0!important}
#how-it-works .how-flow article p{margin:10px 0 0!important;font-size:13.5px!important;line-height:1.42!important;color:var(--text-2)!important}
#how-it-works .connection-slot{margin:18px 0 0!important;padding:0!important;border:0!important;background:none!important;min-height:0!important}
#how-it-works .how-summary{margin:0;padding:13px 16px;border-top:1px solid rgba(37,171,228,.28);border-bottom:1px solid rgba(37,171,228,.18);text-align:center;color:var(--text-1);font-size:15px;font-weight:700;letter-spacing:.01em}
#how-it-works .connection-slot figcaption{display:none!important}
@media(max-width:1024px){#how-it-works{padding:40px 0 42px!important}#how-it-works .section-head{grid-template-columns:1fr;gap:12px;margin-bottom:20px!important}#how-it-works .how-flow{grid-template-columns:repeat(2,minmax(0,1fr))!important}#how-it-works .how-flow article:not(:last-child)::after{display:none}}
@media(max-width:700px){#how-it-works .container{width:min(100% - 36px,620px)}#how-it-works .how-flow{grid-template-columns:1fr!important}#how-it-works .how-flow article{min-height:210px!important}.how-summary{font-size:14px!important;line-height:1.4}}
`;
    document.head.appendChild(s);
  }

  function enhance(){
    const section=document.querySelector('#how-it-works');
    if(!section) return;
    injectStyles();

    const title=section.querySelector('#how-title');
    const lead=section.querySelector('#how-lead');
    if(title) title.textContent='ВІД ЗАВДАННЯ ДО ПЕРЕВІРЕНОГО РЕЗУЛЬТАТУ';
    if(lead) lead.textContent='BB610 WATER не просто відкриває клапан. Система виконує заданий сценарій, вимірює фактичний результат і порівнює його із завданням.';

    const steps=[
      ['01','ЗАДАЄТЕ','Зона · режим · графік · цільовий об’єм','task'],
      ['02','СИСТЕМА ВИКОНУЄ','Полив · фертигація · послідовність операцій','run'],
      ['03','СИСТЕМА ВИМІРЮЄ','Фактичний об’єм · доступні контрольовані параметри','meter'],
      ['04','ОТРИМУЄТЕ РЕЗУЛЬТАТ','Факт по кожній зоні · відхилення · аварійні повідомлення','result']
    ];

    const flow=section.querySelector('#how-steps');
    if(flow){
      flow.innerHTML=steps.map(([n,t,p,k])=>`<article><span>${n}</span><div class="how-step-icon">${icon(k)}</div><strong>${t}</strong><p>${p}</p></article>`).join('');
    }

    const slot=section.querySelector('#connection-scheme-slot');
    if(slot){
      slot.innerHTML='<p class="how-summary">Завдання → виконання → фактичний контроль → результат по кожній зоні.</p>';
    }
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',()=>requestAnimationFrame(enhance));
  else requestAnimationFrame(enhance);
})();