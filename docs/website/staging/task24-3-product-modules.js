(()=>{
  const injectStyles=()=>{
    if(document.getElementById('task24-3-1-style'))return;
    const s=document.createElement('style');
    s.id='task24-3-1-style';
    s.textContent=`
#architecture{padding:34px 0 28px!important}
#architecture .architecture2431-shell{width:min(1180px,calc(100% - 40px));margin:0 auto;display:grid;gap:14px}
.architecture2431-head{text-align:center;display:grid;gap:7px;margin:0 auto 2px}
.architecture2431-head h2{margin:0;font-size:clamp(30px,2.5vw,40px);line-height:1.05;letter-spacing:-.025em}
.architecture2431-subhead{margin:0;color:var(--text-2);font-size:18px;line-height:1.35}
.architecture2431-modules{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}
.architecture2431-module{min-width:0;padding:14px 16px 15px;border:1px solid var(--line);border-radius:14px;background:var(--bg-3);text-align:center;display:grid;grid-template-rows:172px auto auto;gap:8px;align-items:center}
.architecture2431-media{height:172px;display:flex;align-items:center;justify-content:center;overflow:hidden;background:transparent}
.architecture2431-media img{display:block;width:100%;height:100%;object-fit:contain;background:transparent!important;padding:0!important;border:0!important;border-radius:0!important}
.architecture2431-module[data-module="CONTROL"] .architecture2431-media img{transform:scale(1.02)}
.architecture2431-module[data-module="HYDRAULIC"] .architecture2431-media img{transform:scale(1.16)}
.architecture2431-module[data-module="ZONE"] .architecture2431-media img{transform:scale(1.18)}
.architecture2431-module h3{margin:0;font-size:19px;line-height:1.1;letter-spacing:.045em}
.architecture2431-module p{margin:0 auto;max-width:330px;color:var(--text-2);font-size:14px;line-height:1.35}
.architecture2431-software{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}
.architecture2431-soft{min-width:0;padding:10px 16px 12px;border:1px solid var(--line);border-radius:14px;background:var(--bg-3);text-align:center;display:grid;gap:4px;justify-items:center}
.architecture2431-soft-logo{height:72px;width:100%;display:flex;align-items:center;justify-content:center;overflow:hidden}
.architecture2431-soft-logo img{display:block;height:60px;width:auto;max-width:94%;object-fit:contain}
.architecture2431-soft p{margin:0;color:var(--text-2);font-size:13px;line-height:1.35}
.architecture2431-boundary{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px 24px;padding:11px 14px;border:1px solid var(--line);border-radius:12px;background:var(--bg-1)}
.architecture2431-boundary p{margin:0;color:var(--text-2);font-size:12.5px;line-height:1.4}
.architecture2431-boundary strong{color:var(--text-1)}
@media(max-width:900px){
  #architecture{padding:38px 0 32px!important}
  #architecture .architecture2431-shell{width:min(calc(100% - 28px),620px);gap:14px}
  .architecture2431-head{gap:8px}
  .architecture2431-head h2{font-size:clamp(28px,9vw,38px)}
  .architecture2431-subhead{font-size:16px}
  .architecture2431-modules,.architecture2431-software,.architecture2431-boundary{grid-template-columns:1fr}
  .architecture2431-module{grid-template-rows:210px auto auto;padding:14px 14px 16px}
  .architecture2431-media{height:210px}
  .architecture2431-module[data-module="CONTROL"] .architecture2431-media img{transform:scale(1.02)}
  .architecture2431-module[data-module="HYDRAULIC"] .architecture2431-media img{transform:scale(1.10)}
  .architecture2431-module[data-module="ZONE"] .architecture2431-media img{transform:scale(1.12)}
  .architecture2431-soft-logo{height:78px}
  .architecture2431-soft-logo img{height:auto;max-height:68px;max-width:100%}
  .architecture2431-boundary{gap:7px}
}
`;
    document.head.appendChild(s);
  };

  const render=()=>{
    const section=document.querySelector('#architecture');
    if(!section)return;
    injectStyles();
    section.setAttribute('aria-labelledby','architecture2431-title');
    section.innerHTML=`<div class="architecture2431-shell">
      <header class="architecture2431-head">
        <h2 id="architecture2431-title">З ЧОГО СКЛАДАЄТЬСЯ BB610 WATER</h2>
        <p class="architecture2431-subhead">Три фізичні модулі та програмне керування працюють як одна система.</p>
      </header>

      <div class="architecture2431-modules">
        <article class="architecture2431-module" data-module="CONTROL">
          <div class="architecture2431-media"><img src="assets/промышленный_контроллер_bb610_water.png" alt="CONTROL — модуль керування системою BB610 WATER" loading="eager" decoding="async"></div>
          <h3>CONTROL</h3>
          <p>Керування, автоматика та логіка системи.</p>
        </article>
        <article class="architecture2431-module" data-module="HYDRAULIC">
          <div class="architecture2431-media"><img src="assets/промышленный_блок_гидравлического_фертигационного.png" alt="HYDRAULIC — гідравлічний модуль BB610 WATER" loading="eager" decoding="async"></div>
          <h3>HYDRAULIC</h3>
          <p>Полив, фертигація, дозування та контроль параметрів.</p>
        </article>
        <article class="architecture2431-module" data-module="ZONE">
          <div class="architecture2431-media"><img src="assets/промышленный_коллектор_управления_поливом.png" alt="ZONE — модуль керування зонами BB610 WATER" loading="eager" decoding="async"></div>
          <h3>ZONE</h3>
          <p>Розподіл подачі води по окремих зонах.</p>
        </article>
      </div>

      <div class="architecture2431-software" aria-label="Програмне керування BB610 WATER">
        <article class="architecture2431-soft">
          <div class="architecture2431-soft-logo"><img src="assets/bb610-puls-horizontal.svg" alt="BB610 PULS" loading="eager" decoding="async"></div>
          <p>Windows — налаштування та контроль у реальному часі.</p>
        </article>
        <article class="architecture2431-soft">
          <div class="architecture2431-soft-logo"><img src="assets/bb610-puls-mobile-horizontal.svg" alt="BB610 PULS MOBILE" loading="eager" decoding="async"></div>
          <p>Mobile — керування з будь-якого місця.</p>
        </article>
      </div>

      <div class="architecture2431-boundary" aria-label="Межі системи BB610 WATER">
        <p><strong>Поза системою:</strong> джерело води, насос подачі, первинна фільтрація.</p>
        <p><strong>У складі BB610 WATER:</strong> керування, дозування, контроль, зони та програмне забезпечення.</p>
      </div>
    </div>`;
  };

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',render);
  else render();
})();
