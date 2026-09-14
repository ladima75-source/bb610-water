(()=>{
  const STYLE_ID='task24-4-how-style';
  const icon=(kind)=>({
    task:`<svg viewBox="0 0 64 64" aria-hidden="true"><rect x="14" y="10" width="36" height="44" rx="6"/><path d="M22 22h20M22 32h14M22 42h18"/><path d="M24 10v-4h16v4"/></svg>`,
    run:`<svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="20"/><path d="M28 22l14 10-14 10z"/></svg>`,
    meter:`<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M12 44a20 20 0 1 1 40 0"/><path d="M32 32l10-8"/><circle cx="32" cy="32" r="3"/><path d="M18 44h28"/></svg>`,
    result:`<svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="22"/><path d="M21 32l7 7 15-16"/></svg>`
  }[kind]);

  function injectStyles(){
    const old=document.getElementById(STYLE_ID);
    if(old) old.remove();
    const s=document.createElement('style');
    s.id=STYLE_ID;
    s.textContent=`
#how-it-works{padding:44px 0 48px!important}
#how-it-works .container{width:min(1280px,calc(100% - 48px))}
#how-it-works .section-head{margin-bottom:22px!important;display:grid!important;grid-template-columns:minmax(0,1fr) minmax(350px,.88fr);gap:42px;align-items:end}
#how-it-works .section-head h2{max-width:760px;margin:0}
#how-it-works .section-head>p{margin:0;color:var(--text-2);font-size:18px;line-height:1.45;max-width:560px}
#how-it-works .how-process-shell{position:relative;border:1px solid rgba(37,171,228,.28);border-radius:22px;background:linear-gradient(180deg,rgba(8,29,43,.72),rgba(6,20,31,.56));box-shadow:inset 0 1px 0 rgba(255,255,255,.03);padding:26px 28px 18px;overflow:hidden}
#how-it-works .how-process-shell::before{content:'';position:absolute;inset:0;background:radial-gradient(circle at 22% 30%,rgba(34,178,255,.08),transparent 38%),radial-gradient(circle at 80% 70%,rgba(65,222,171,.05),transparent 28%);pointer-events:none}
#how-it-works .how-process-topline{display:flex;justify-content:space-between;gap:20px;align-items:flex-end;margin-bottom:18px;position:relative;z-index:1}
#how-it-works .how-process-kicker{margin:0;color:#76d3ff;font-size:12px;font-weight:700;letter-spacing:.18em;text-transform:uppercase}
#how-it-works .how-process-side{margin:0;color:#8bb6d1;font-size:12px;line-height:1.35;text-align:right;max-width:280px}
#how-it-works #how-steps.how-process-flow{position:relative;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:0;margin:0;z-index:1}
#how-it-works #how-steps.how-process-flow::before{content:'';position:absolute;left:4%;right:4%;top:78px;height:2px;background:linear-gradient(90deg,rgba(39,201,255,.18),rgba(39,201,255,.9) 14%,rgba(39,201,255,.85) 86%,rgba(39,201,255,.18));box-shadow:0 0 10px rgba(39,201,255,.18)}
#how-it-works #how-steps.how-process-flow article{position:relative;min-height:216px!important;padding:18px 22px 16px!important;background:none!important;border:none!important;border-radius:0!important;overflow:visible;text-align:left}
#how-it-works #how-steps.how-process-flow article:not(:last-child)::after{content:'';position:absolute;top:30px;right:0;width:1px;height:calc(100% - 52px);background:linear-gradient(180deg,rgba(56,168,227,.06),rgba(56,168,227,.28),rgba(56,168,227,.06))}
#how-it-works #how-steps.how-process-flow article>span{display:inline-flex;align-items:center;justify-content:center;min-width:42px;height:22px;padding:0 10px;margin:0 0 16px!important;border:1px solid rgba(37,201,255,.34);border-radius:999px;color:#25c9ff!important;font-size:11px!important;font-weight:700;letter-spacing:.08em!important;background:rgba(7,28,42,.72)}
#how-it-works .how-step-icon{width:74px;height:74px;display:flex;align-items:center;justify-content:center;margin:0 0 18px;border:1px solid rgba(37,201,255,.22);border-radius:18px;background:linear-gradient(180deg,rgba(10,34,51,.7),rgba(8,24,38,.46))}
#how-it-works .how-step-icon svg{width:42px;height:42px;fill:none;stroke:#27c9ff;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round}
#how-it-works #how-steps.how-process-flow article:nth-child(4) .how-step-icon{border-color:rgba(64,221,168,.28);background:linear-gradient(180deg,rgba(12,38,38,.72),rgba(8,26,31,.46))}
#how-it-works #how-steps.how-process-flow article:nth-child(4) .how-step-icon svg{stroke:#40dda8}
#how-it-works #how-steps.how-process-flow article strong{display:block;font-size:24px!important;line-height:1.08!important;margin:0 0 10px;color:var(--text-1)}
#how-it-works #how-steps.how-process-flow article p{margin:0!important;font-size:15px!important;line-height:1.48!important;color:var(--text-2)!important;max-width:250px}
#how-it-works #how-steps.how-process-flow article .how-step-link{position:absolute;top:68px;right:-10px;width:20px;height:20px;display:flex;align-items:center;justify-content:center;background:transparent;color:#29d2ff}
#how-it-works #how-steps.how-process-flow article .how-step-link svg{width:18px;height:18px;fill:none;stroke:currentColor;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round}
#how-it-works .connection-slot{position:relative;margin:0!important;padding:18px 0 0!important;border:none!important;background:none!important;z-index:1}
#how-it-works .how-process-summary{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:24px;align-items:center;padding-top:16px;border-top:1px solid rgba(53,167,224,.2)}
#how-it-works .how-process-summary strong{display:block;color:var(--text-1);font-size:15px;letter-spacing:.02em}
#how-it-works .how-process-summary p{margin:5px 0 0;color:var(--text-2);font-size:13px;line-height:1.45;max-width:720px}
#how-it-works .how-process-formula{display:inline-flex;align-items:center;justify-content:center;padding:12px 16px;border:1px solid rgba(37,201,255,.28);border-radius:999px;background:rgba(8,28,41,.68);color:#eef9ff;font-size:13px;font-weight:700;letter-spacing:.02em;white-space:nowrap}
@media(max-width:1180px){#how-it-works .section-head{grid-template-columns:1fr;gap:12px;align-items:start}#how-it-works .section-head>p{max-width:760px}#how-it-works #how-steps.how-process-flow article{padding:18px 16px 14px!important}#how-it-works #how-steps.how-process-flow article strong{font-size:21px!important}#how-it-works #how-steps.how-process-flow article p{font-size:14px!important}}
@media(max-width:980px){#how-it-works{padding:38px 0 42px!important}#how-it-works .container{width:min(100% - 36px,760px)}#how-it-works .how-process-shell{padding:20px 18px 16px}#how-it-works .how-process-topline{display:grid;gap:6px}#how-it-works .how-process-side{text-align:left;max-width:none}#how-it-works #how-steps.how-process-flow{grid-template-columns:1fr;gap:0}#how-it-works #how-steps.how-process-flow::before{left:37px;right:auto;top:0;bottom:0;width:2px;height:auto;background:linear-gradient(180deg,rgba(39,201,255,.16),rgba(39,201,255,.9) 14%,rgba(39,201,255,.82) 86%,rgba(39,201,255,.16))}#how-it-works #how-steps.how-process-flow article{min-height:unset!important;padding:10px 0 22px 72px!important}#how-it-works #how-steps.how-process-flow article:not(:last-child)::after{display:none}#how-it-works #how-steps.how-process-flow article>span{position:absolute;left:16px;top:14px;margin:0!important}#how-it-works .how-step-icon{position:absolute;left:16px;top:48px;width:44px;height:44px;border-radius:12px;margin:0}#how-it-works .how-step-icon svg{width:24px;height:24px}#how-it-works #how-steps.how-process-flow article strong{font-size:20px!important;margin-bottom:8px}#how-it-works #how-steps.how-process-flow article p{max-width:none}#how-it-works #how-steps.how-process-flow article .how-step-link{display:none}#how-it-works .how-process-summary{grid-template-columns:1fr;gap:12px}#how-it-works .how-process-formula{white-space:normal;justify-content:flex-start;padding:12px 14px;border-radius:16px}}
`;
    document.head.appendChild(s);
  }

  function rebuild(){
    const section=document.querySelector('#how-it-works');
    if(!section) return;
    injectStyles();

    const head=section.querySelector('.section-head');
    if(head){
      const title=head.querySelector('h2');
      const p=head.querySelector('p');
      if(title) title.textContent='ВІД ЗАВДАННЯ ДО ПЕРЕВІРЕНОГО РЕЗУЛЬТАТУ';
      if(p) p.textContent='BB610 WATER не просто відкриває клапан. Система виконує заданий сценарій, вимірює фактичний результат і порівнює його із завданням.';
    }

    const steps=section.querySelector('#how-steps');
    if(steps){
      steps.className='how-process-flow';
      const cards=[...steps.querySelectorAll('article')];
      const data=[
        {num:'01',kind:'task',title:'ЗАДАЄТЕ',text:'Зона · режим · графік · цільовий об’єм'},
        {num:'02',kind:'run',title:'СИСТЕМА ВИКОНУЄ',text:'Полив · фертигація · послідовність операцій'},
        {num:'03',kind:'meter',title:'СИСТЕМА ВИМІРЮЄ',text:'Фактичний об’єм · доступні контрольовані параметри'},
        {num:'04',kind:'result',title:'ОТРИМУЄТЕ РЕЗУЛЬТАТ',text:'Факт по кожній зоні · відхилення · аварійні повідомлення'}
      ];
      cards.forEach((card,i)=>{
        const d=data[i];
        if(!d) return;
        card.innerHTML=`<span>${d.num}</span><div class="how-step-icon">${icon(d.kind)}</div><strong>${d.title}</strong><p>${d.text}</p>${i<cards.length-1?'<div class="how-step-link" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg></div>':''}`;
      });
    }

    const slot=section.querySelector('#connection-scheme-slot');
    if(slot){
      slot.innerHTML=`<div class="how-process-summary"><div><strong>Підсумок процесу</strong><p>BB610 WATER проходить повний цикл від завдання до перевіреного фактичного результату, а не просто відкриває подачу води.</p></div><div class="how-process-formula">Завдання → виконання → фактичний контроль → результат по кожній зоні</div></div>`;
    }

    let shell=section.querySelector('.how-process-shell');
    if(!shell){
      shell=document.createElement('div');
      shell.className='how-process-shell';
      const top=document.createElement('div');
      top.className='how-process-topline';
      top.innerHTML=`<p class="how-process-kicker">ЄДИНИЙ РОБОЧИЙ ЦИКЛ</p><p class="how-process-side">Від налаштування сценарію до перевіреного факту та результату по кожній зоні.</p>`;
      const stepsEl=section.querySelector('#how-steps');
      const slotEl=section.querySelector('#connection-scheme-slot');
      if(stepsEl && slotEl){
        shell.appendChild(top);
        shell.appendChild(stepsEl);
        shell.appendChild(slotEl);
        section.appendChild(shell);
      }
    }
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',()=>requestAnimationFrame(rebuild)); else requestAnimationFrame(rebuild);
})();