(()=>{
  const STYLE_ID='task24-4-how-style';
  const icon=(kind)=>({
    task:`<svg viewBox="0 0 64 64" aria-hidden="true"><rect x="14" y="10" width="36" height="44" rx="6"/><path d="M22 22h20M22 32h14M22 42h18"/><path d="M24 10v-4h16v4"/></svg>`,
    run:`<svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="20"/><path d="M28 22l14 10-14 10z"/></svg>`,
    meter:`<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M12 44a20 20 0 1 1 40 0"/><path d="M32 32l10-8"/><circle cx="32" cy="32" r="3"/><path d="M18 44h28"/></svg>`,
    result:`<svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="22"/><path d="M21 32l7 7 15-16"/></svg>`,
    zone:`<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M32 54V30M32 36c-7 0-12-4-13-11 8-1 13 3 13 9M32 39c8 0 13-4 14-12-9-1-14 3-14 10"/></svg>`
  }[kind]);

  function injectStyles(){
    if(document.getElementById(STYLE_ID)) return;
    const s=document.createElement('style'); s.id=STYLE_ID;
    s.textContent=`
#how-it-works{padding:54px 0 58px!important}
#how-it-works .container{width:min(1280px,calc(100% - 56px))}
#how-it-works .section-head{margin-bottom:26px!important;grid-template-columns:minmax(0,1.15fr) minmax(300px,.85fr);gap:54px}
#how-it-works .section-head h2{max-width:760px}
#how-it-works .section-head>p{align-self:end;margin-bottom:3px}
#how-it-works .how-flow{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px}
#how-it-works .how-flow article{position:relative;min-height:214px!important;padding:18px 20px 20px!important;border:1px solid rgba(37,171,228,.28)!important;border-radius:14px!important;background:linear-gradient(180deg,rgba(8,29,43,.66),rgba(6,22,34,.5))!important;overflow:hidden}
#how-it-works .how-flow article>span{margin:0 0 8px!important;color:#25c9ff!important;font-size:12px!important;letter-spacing:.08em!important}
#how-it-works .how-step-icon{height:64px;display:flex;align-items:center;justify-content:center;margin:2px 0 8px}
#how-it-works .how-step-icon svg{width:58px;height:58px;fill:none;stroke:#27c9ff;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round}
#how-it-works .how-flow article:nth-child(4) .how-step-icon svg{stroke:#40dda8}
#how-it-works .how-flow article strong{font-size:18px!important;line-height:1.15!important}
#how-it-works .how-flow article p{margin:9px 0 0!important;font-size:13.5px!important;line-height:1.42!important;color:var(--text-2)!important}
#how-it-works .connection-slot{margin:22px 0 0!important;padding:20px!important;border:1px solid rgba(37,171,228,.26)!important;border-radius:14px!important;background:linear-gradient(180deg,rgba(7,25,38,.62),rgba(5,20,31,.48))!important}
#how-it-works .how-detail-title{display:flex;justify-content:space-between;gap:20px;align-items:flex-end;margin-bottom:14px}
#how-it-works .how-detail-title strong{font-size:16px;letter-spacing:.02em}
#how-it-works .how-detail-title span{color:var(--text-3);font-size:12px}
#how-it-works .how-detail-flow{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px}
#how-it-works .how-detail-card{min-width:0;border:1px solid rgba(63,169,219,.23);border-radius:12px;padding:14px 14px 13px;background:rgba(7,29,42,.42);display:grid;grid-template-columns:42px 1fr;gap:11px;align-items:start}
#how-it-works .how-detail-card svg{width:40px;height:40px;fill:none;stroke:#25c9ff;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
#how-it-works .how-detail-card.zones svg{stroke:#40dda8}
#how-it-works .how-detail-card b{display:block;margin:0 0 4px;font-size:13px;color:var(--text-1)}
#how-it-works .how-detail-card p{margin:0;color:var(--text-2);font-size:12px;line-height:1.38}
#how-it-works .how-detail-card small{display:block;margin-top:5px;color:#8eb9d4;font-size:10.5px;line-height:1.3}
#how-it-works .connection-slot figcaption{display:none!important}
@media(max-width:1024px){#how-it-works{padding:46px 0 50px!important}#how-it-works .section-head{grid-template-columns:1fr;gap:14px;margin-bottom:22px!important}#how-it-works .how-flow{grid-template-columns:repeat(2,minmax(0,1fr))}#how-it-works .how-detail-flow{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media(max-width:700px){#how-it-works .container{width:min(100% - 36px,620px)}#how-it-works .how-flow,#how-it-works .how-detail-flow{grid-template-columns:1fr}#how-it-works .how-flow article{min-height:190px!important}#how-it-works .how-detail-title{display:grid;gap:4px}}
`;
    document.head.appendChild(s);
  }

  function enhance(){
    const section=document.querySelector('#how-it-works');
    if(!section) return;
    injectStyles();
    const cards=[...section.querySelectorAll('#how-steps article')];
    const kinds=['task','run','meter','result'];
    cards.forEach((card,i)=>{
      if(card.querySelector('.how-step-icon')) return;
      const marker=card.querySelector('span');
      const holder=document.createElement('div'); holder.className='how-step-icon'; holder.innerHTML=icon(kinds[i]||'task');
      marker?.insertAdjacentElement('afterend',holder);
    });
    const slot=section.querySelector('#connection-scheme-slot');
    if(slot){
      slot.innerHTML=`<div class="how-detail-title"><strong>ЯК ЗАВДАННЯ ПЕРЕТВОРЮЄТЬСЯ НА РЕЗУЛЬТАТ</strong><span>Один цикл — від налаштування до перевіреного факту</span></div>
      <div class="how-detail-flow">
        <div class="how-detail-card">${icon('task')}<div><b>01 · ЗАВДАННЯ</b><p>Зона, режим, графік, потрібний об’єм і параметри.</p><small>Кожна зона має власні налаштування.</small></div></div>
        <div class="how-detail-card">${icon('run')}<div><b>02 · ВИКОНАННЯ</b><p>Система запускає потрібну послідовність поливу та фертигації.</p><small>Робота відбувається за заданим сценарієм.</small></div></div>
        <div class="how-detail-card">${icon('meter')}<div><b>03 · ФАКТИЧНИЙ КОНТРОЛЬ</b><p>Вимірюється фактичний об’єм і доступні контрольовані параметри.</p><small>Не лише команда, а перевірка виконання.</small></div></div>
        <div class="how-detail-card zones">${icon('zone')}<div><b>04 · РЕЗУЛЬТАТ ПО ЗОНАХ</b><p>Результат зберігається окремо для кожної зони поливу.</p><small>Зона 1 · Зона 2 · Зона 3 · Зона 4 · до 16 логічних зон.</small></div></div>
      </div>`;
    }
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',()=>requestAnimationFrame(enhance)); else requestAnimationFrame(enhance);
})();