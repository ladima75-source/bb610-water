(()=>{
  const STYLE_ID='task24-3-6-style';
  const icon=(kind)=>({
    software:`<svg viewBox="0 0 64 64" aria-hidden="true"><rect x="8" y="12" width="30" height="24" rx="3"/><path d="M15 44h16M23 36v8"/><rect x="43" y="18" width="13" height="25" rx="3"/><circle cx="49.5" cy="38" r="1"/></svg>`,
    control:`<svg viewBox="0 0 64 64" aria-hidden="true"><rect x="18" y="18" width="28" height="28" rx="4"/><rect x="25" y="25" width="14" height="14" rx="2"/><path d="M12 24h6M12 32h6M12 40h6M46 24h6M46 32h6M46 40h6M24 12v6M32 12v6M40 12v6M24 46v6M32 46v6M40 46v6"/></svg>`,
    hydraulic:`<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M32 10C26 20 19 27 19 36a13 13 0 0 0 26 0c0-9-7-16-13-26Z"/><path d="M25 38c1 5 4 8 9 9"/></svg>`,
    zone:`<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M32 12v12M18 48v-8c0-5 4-9 9-9h10c5 0 9 4 9 9v8M32 24v7M18 48h-7M53 48h-7"/><circle cx="32" cy="10" r="4"/><circle cx="9" cy="48" r="4"/><circle cx="55" cy="48" r="4"/></svg>`,
    water:`<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M32 10C26 20 19 27 19 36a13 13 0 0 0 26 0c0-9-7-16-13-26Z"/></svg>`,
    pump:`<svg viewBox="0 0 64 64" aria-hidden="true"><rect x="22" y="22" width="22" height="22" rx="4"/><path d="M10 33h12M44 33h10M31 22v-8M27 14h8"/></svg>`,
    filter:`<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M18 14h28l-10 16v16l-8 4V30L18 14Z"/><path d="M24 20h16"/></svg>`,
    plant:`<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M32 52V31M32 36c-6 0-11-4-12-10 7-1 12 2 12 8M32 39c7 0 12-4 13-11-8-1-13 3-13 9"/></svg>`
  }[kind]);

  function injectStyles(){
    if(document.getElementById(STYLE_ID)) return;
    const s=document.createElement('style'); s.id=STYLE_ID;
    s.textContent=`
#architecture{padding:18px 0 18px!important;background:linear-gradient(180deg,rgba(4,17,28,.98),rgba(3,14,24,.98))}
#architecture .a236{width:min(1360px,calc(100% - 36px));margin:0 auto;display:grid;gap:12px;color:var(--text-1)}
.a236-head{text-align:center;display:grid;gap:5px;justify-items:center}.a236-head h2{margin:0;font-size:clamp(30px,2.6vw,44px);line-height:1.04;letter-spacing:-.025em}.a236-head p{margin:0;color:var(--text-2);font-size:17px}.a236-brand{height:46px;display:flex;align-items:center;justify-content:center}.a236-brand img{display:block;height:42px;width:auto;max-width:320px;object-fit:contain}
.a236-grid{display:grid;grid-template-columns:minmax(340px,.84fr) minmax(680px,1.55fr);gap:18px;align-items:stretch}
.a236-left,.a236-right{border:1px solid rgba(40,174,230,.38);border-radius:16px;background:linear-gradient(180deg,rgba(8,28,43,.72),rgba(5,20,32,.55));padding:18px 20px}
.a236-kicker{margin:0 0 12px;color:#8db9db;font-size:12px;font-weight:700;letter-spacing:.12em}.a236-list{display:grid;gap:10px}.a236-row{font-size:14px;line-height:1.35;color:var(--text-2)}.a236-row strong{color:#18bfff;font-size:16px;margin-right:8px}.a236-row.zone strong{color:#38d6a0}
.a236-sep{height:1px;background:rgba(118,179,215,.26);margin:14px 0}.a236-softs{display:grid;gap:9px}.a236-soft{display:grid;grid-template-columns:38px 1fr;gap:10px;align-items:center}.a236-soft svg{width:30px;height:30px;fill:none;stroke:#1ec8ff;stroke-width:2.4}.a236-soft strong{font-size:15px}.a236-soft b{color:#20c9ff}.a236-soft.mobile b{color:#39d6a0}.a236-soft p{margin:2px 0 0;color:var(--text-2);font-size:13px;line-height:1.3}
.a236-note{display:grid;gap:7px}.a236-note p{margin:0;color:var(--text-2);font-size:12.8px;line-height:1.35}.a236-note strong{color:var(--text-1)}
.a236-right{display:grid;grid-template-rows:auto 1fr auto;gap:12px}.a236-flow{display:grid;grid-template-columns:1fr 26px 1fr 26px 1fr 26px 1fr 26px 1fr;align-items:stretch;gap:0;min-height:280px}.a236-node{min-width:0;height:100%;border:1px solid rgba(45,182,239,.5);border-radius:12px;padding:18px 12px;text-align:center;background:rgba(8,31,48,.55);display:grid;grid-template-rows:auto auto 1fr;justify-items:center;align-items:center;gap:10px}.a236-node.zone{border-color:rgba(47,210,154,.7)}.a236-node svg{width:54px;height:54px;fill:none;stroke:#20c8ff;stroke-width:2.4}.a236-node.zone svg{stroke:#39d6a0}.a236-node h3{margin:0;font-size:16px;color:#19c2ff}.a236-node.zone h3{color:#39d6a0}.a236-node p{margin:0;color:var(--text-2);font-size:12.5px;line-height:1.35}.a236-arrow{height:2px;background:#27bdf0;position:relative;align-self:center}.a236-arrow:after{content:"";position:absolute;right:-1px;top:-4px;border-left:8px solid #27bdf0;border-top:5px solid transparent;border-bottom:5px solid transparent}
.a236-zones{min-width:0;height:100%;border:1px solid rgba(45,182,239,.5);border-radius:12px;padding:18px 12px;text-align:center;background:rgba(8,31,48,.55);display:grid;grid-template-rows:auto 1fr auto;align-items:center;gap:12px}.a236-zones-title{font-weight:800;font-size:16px;color:var(--text-1)}.a236-zones-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;align-self:center}.a236-zone{display:grid;justify-items:center;gap:5px}.a236-zone svg{width:32px;height:32px;fill:none;stroke:#39d6a0;stroke-width:2}.a236-zone span{font-size:11px;color:var(--text-2)}.a236-eq{font-size:12px;color:#9fc3db}
.a236-outside{display:grid;grid-template-columns:auto 22px auto 22px auto 26px 1fr;align-items:center;gap:8px;border-top:1px dashed rgba(80,162,211,.35);padding-top:12px}.a236-outside .label{font-size:11px;letter-spacing:.08em;color:#86add0}.a236-out{display:grid;justify-items:center;gap:3px}.a236-out svg{width:28px;height:28px;fill:none;stroke:#77a9cf;stroke-width:2}.a236-out span{font-size:10.5px;color:#aac1d3}.a236-mini-arrow{height:1px;background:#659bc1}.a236-mini-arrow.in{background:#27bdf0;position:relative}.a236-mini-arrow.in:after{content:"";position:absolute;right:-1px;top:-3px;border-left:6px solid #27bdf0;border-top:4px solid transparent;border-bottom:4px solid transparent}
@media(max-width:900px){#architecture{padding:28px 0 26px!important}#architecture .a236{width:min(620px,calc(100% - 28px));gap:16px}.a236-head{text-align:left;justify-items:start}.a236-head h2{font-size:clamp(28px,9vw,38px)}.a236-head p{font-size:16px}.a236-brand{justify-content:flex-start}.a236-brand img{height:38px;max-width:270px}.a236-grid{grid-template-columns:1fr}.a236-left,.a236-right{padding:16px}.a236-flow{grid-template-columns:1fr;gap:9px;min-height:0}.a236-node,.a236-zones{height:auto;min-height:170px}.a236-arrow{width:2px;height:20px;justify-self:center}.a236-arrow:after{right:-4px;top:auto;bottom:-1px;border-left:5px solid transparent;border-right:5px solid transparent;border-top:8px solid #27bdf0;border-bottom:0}.a236-outside{grid-template-columns:1fr;gap:8px;text-align:center}.a236-mini-arrow{width:2px;height:14px;justify-self:center}.a236-mini-arrow.in{width:2px;height:16px}.a236-mini-arrow.in:after{right:-4px;top:auto;bottom:-1px;border-left:5px solid transparent;border-right:5px solid transparent;border-top:8px solid #27bdf0;border-bottom:0}.a236-zones-grid{gap:5px}}
`;
    document.head.appendChild(s);
  }

  function render(){
    const section=document.querySelector('#architecture'); if(!section) return; injectStyles();
    section.setAttribute('aria-labelledby','a236-title');
    section.innerHTML=`<div class="a236">
      <header class="a236-head"><h2 id="a236-title">З ЧОГО СКЛАДАЄТЬСЯ BB610 WATER</h2><p>CONTROL, HYDRAULIC, ZONE та програмне керування працюють як одна система.</p><div class="a236-brand"><img src="assets/bb610-water-horizontal-logo.webp" alt="BB610 WATER"></div></header>
      <div class="a236-grid">
        <aside class="a236-left">
          <h3 class="a236-kicker">КЛЮЧОВІ МОДУЛІ</h3>
          <div class="a236-list">
            <div class="a236-row"><strong>CONTROL</strong> — керування, автоматика та логіка системи.</div>
            <div class="a236-row"><strong>HYDRAULIC</strong> — полив, фертигація, дозування та контроль параметрів.</div>
            <div class="a236-row zone"><strong>ZONE</strong> — розподіл подачі води по окремих зонах.</div>
          </div>
          <div class="a236-sep"></div>
          <h3 class="a236-kicker">ПРОГРАМНЕ КЕРУВАННЯ</h3>
          <div class="a236-softs">
            <div class="a236-soft">${icon('software')}<div><strong>BB610 <b>PULSE</b></strong><p>Windows — налаштування, програмування та контроль у реальному часі.</p></div></div>
            <div class="a236-soft mobile">${icon('software')}<div><strong>BB610 <b>PULSE MOBILE</b></strong><p>Мобільне керування з будь-якого місця.</p></div></div>
          </div>
          <div class="a236-sep"></div>
          <h3 class="a236-kicker">ВАЖЛИВО ЗНАТИ</h3>
          <div class="a236-note"><p><strong>Поза системою:</strong> джерело води, насос подачі, первинна фільтрація.</p><p><strong>У складі BB610 WATER:</strong> керування, дозування, контроль, розподіл по зонах та програмне забезпечення.</p></div>
        </aside>
        <section class="a236-right" aria-label="Функціональна схема BB610 WATER">
          <h3 class="a236-kicker">ФУНКЦІОНАЛЬНА СХЕМА</h3>
          <div class="a236-flow">
            <div class="a236-node">${icon('software')}<h3>BB610 PULSE<br>BB610 PULSE MOBILE</h3><p>Програмне керування</p></div><div class="a236-arrow"></div>
            <div class="a236-node">${icon('control')}<h3>CONTROL</h3><p>Керування, автоматика та логіка</p></div><div class="a236-arrow"></div>
            <div class="a236-node">${icon('hydraulic')}<h3>HYDRAULIC</h3><p>Полив, фертигація, дозування та контроль параметрів</p></div><div class="a236-arrow"></div>
            <div class="a236-node zone">${icon('zone')}<h3>ZONE</h3><p>Розподіл подачі води по зонах</p></div><div class="a236-arrow"></div>
            <div class="a236-zones"><div class="a236-zones-title">4 ЗОНИ ПОЛИВУ</div><div class="a236-zones-grid">${[1,2,3,4].map(n=>`<div class="a236-zone">${icon('plant')}<span>Зона ${n}</span></div>`).join('')}</div><div class="a236-eq">1 вихід = 1 зона</div></div>
          </div>
          <div class="a236-outside"><div class="label">ПОЗА СИСТЕМОЮ</div><div></div><div class="a236-out">${icon('water')}<span>Джерело води</span></div><div class="a236-mini-arrow"></div><div class="a236-out">${icon('pump')}<span>Насос подачі</span></div><div class="a236-mini-arrow"></div><div style="display:grid;grid-template-columns:auto 24px 1fr;align-items:center;gap:8px"><div class="a236-out">${icon('filter')}<span>Первинна фільтрація</span></div><div class="a236-mini-arrow in"></div><div style="font-size:11px;color:#8db9db">Подача води в BB610 WATER</div></div></div>
        </section>
      </div>
    </div>`;
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',render); else render();
})();