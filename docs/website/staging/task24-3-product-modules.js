(()=>{
  const injectStyles=()=>{
    if(document.getElementById('task24-3-3-style'))return;
    const s=document.createElement('style');
    s.id='task24-3-3-style';
    s.textContent=`
#architecture{padding:20px 0 18px!important}
#architecture .architecture2433-shell{width:min(1180px,calc(100% - 40px));margin:0 auto;display:grid;gap:12px}
.architecture2433-head{text-align:center;display:grid;gap:5px;margin:0 auto 2px}
.architecture2433-head h2{margin:0;font-size:clamp(30px,2.5vw,40px);line-height:1.04;letter-spacing:-.025em}
.architecture2433-subhead{margin:0;color:var(--text-2);font-size:18px;line-height:1.3}
.architecture2433-modules{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:26px;align-items:start}
.architecture2433-module{min-width:0;text-align:center;display:grid;grid-template-rows:168px auto auto;gap:7px;align-items:center;padding:0 6px;background:transparent;border:0;border-radius:0}
.architecture2433-media{height:168px;display:flex;align-items:center;justify-content:center;overflow:hidden;background:transparent;border:0;border-radius:0;padding:0}
.architecture2433-media img{display:block;width:auto;height:auto;object-fit:contain;padding:0!important;border:0!important;border-radius:0!important;background:transparent!important;box-shadow:none!important;image-rendering:auto;transform-origin:center center}
.architecture2433-module[data-module="CONTROL"] .architecture2433-media img{width:218px;max-width:92%;max-height:160px}
.architecture2433-module[data-module="HYDRAULIC"] .architecture2433-media img{width:186px;max-width:88%;height:auto;clip-path:inset(5% 5% 5% 5%);transform:scale(1.12)}
.architecture2433-module[data-module="ZONE"] .architecture2433-media img{width:190px;max-width:88%;height:auto;clip-path:inset(5% 5% 5% 5%);transform:scale(1.12)}
.architecture2433-module h3{margin:0;font-size:19px;line-height:1.08;letter-spacing:.045em}
.architecture2433-module p{margin:0 auto;max-width:330px;color:var(--text-2);font-size:14px;line-height:1.3}
.architecture2433-software{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:34px;align-items:end;padding:3px 36px 0}
.architecture2433-soft{min-width:0;text-align:center;display:grid;gap:4px;justify-items:center;background:transparent;border:0;padding:0}
.architecture2433-soft-logo{height:58px;width:100%;display:flex;align-items:center;justify-content:center;overflow:visible}
.architecture2433-soft-logo img{display:block;height:54px;width:auto;max-width:92%;object-fit:contain;background:transparent!important;border:0!important;box-shadow:none!important}
.architecture2433-soft p{margin:0;color:var(--text-2);font-size:13.5px;line-height:1.3}
.architecture2433-boundary{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px 28px;padding:10px 0 0;border-top:1px solid var(--line);background:transparent}
.architecture2433-boundary p{margin:0;color:var(--text-2);font-size:14px;line-height:1.38}
.architecture2433-boundary strong{color:var(--text-1)}
@media(max-width:900px){
  #architecture{padding:28px 0 26px!important}
  #architecture .architecture2433-shell{width:min(calc(100% - 28px),620px);gap:16px}
  .architecture2433-head{gap:8px}
  .architecture2433-head h2{font-size:clamp(28px,9vw,38px)}
  .architecture2433-subhead{font-size:16px}
  .architecture2433-modules,.architecture2433-software,.architecture2433-boundary{grid-template-columns:1fr}
  .architecture2433-modules{gap:18px}
  .architecture2433-module{grid-template-rows:172px auto auto;padding:0}
  .architecture2433-media{height:172px}
  .architecture2433-module[data-module="CONTROL"] .architecture2433-media img{width:220px;max-width:88%;max-height:162px}
  .architecture2433-module[data-module="HYDRAULIC"] .architecture2433-media img{width:188px;max-width:80%;transform:scale(1.1)}
  .architecture2433-module[data-module="ZONE"] .architecture2433-media img{width:192px;max-width:80%;transform:scale(1.1)}
  .architecture2433-software{gap:14px;padding:2px 0 0}
  .architecture2433-soft-logo{height:56px}
  .architecture2433-soft-logo img{height:50px;max-width:96%}
  .architecture2433-boundary{gap:8px;padding-top:10px}
  .architecture2433-boundary p{font-size:13.5px}
}
`;
    document.head.appendChild(s);
  };

  const render=()=>{
    const section=document.querySelector('#architecture');
    if(!section)return;
    injectStyles();
    section.setAttribute('aria-labelledby','architecture2433-title');
    section.innerHTML=`<div class="architecture2433-shell">
      <header class="architecture2433-head">
        <h2 id="architecture2433-title">З ЧОГО СКЛАДАЄТЬСЯ BB610 WATER</h2>
        <p class="architecture2433-subhead">Три фізичні модулі та програмне керування працюють як одна система.</p>
      </header>
      <div class="architecture2433-modules">
        <article class="architecture2433-module" data-module="CONTROL">
          <div class="architecture2433-media"><img src="assets/промышленный_контроллер_bb610_water.png" alt="CONTROL — модуль керування системою BB610 WATER" loading="eager" decoding="async"></div>
          <h3>CONTROL</h3>
          <p>Керування, автоматика та логіка системи.</p>
        </article>
        <article class="architecture2433-module" data-module="HYDRAULIC">
          <div class="architecture2433-media"><img src="assets/промышленный_блок_гидравлического_фертигационного.png" alt="HYDRAULIC — гідравлічний модуль BB610 WATER" loading="eager" decoding="async"></div>
          <h3>HYDRAULIC</h3>
          <p>Полив, фертигація, дозування та контроль параметрів.</p>
        </article>
        <article class="architecture2433-module" data-module="ZONE">
          <div class="architecture2433-media"><img src="assets/промышленный_коллектор_управления_поливом.png" alt="ZONE — модуль керування зонами BB610 WATER" loading="eager" decoding="async"></div>
          <h3>ZONE</h3>
          <p>Розподіл подачі води по окремих зонах.</p>
        </article>
      </div>
      <div class="architecture2433-software" aria-label="Програмне керування BB610 WATER">
        <article class="architecture2433-soft">
          <div class="architecture2433-soft-logo"><img src="assets/bb610-puls-horizontal.svg" alt="BB610 PULS" loading="eager" decoding="async"></div>
          <p>Windows — налаштування та контроль у реальному часі.</p>
        </article>
        <article class="architecture2433-soft">
          <div class="architecture2433-soft-logo"><img src="assets/bb610-puls-mobile-horizontal.svg" alt="BB610 PULS MOBILE" loading="eager" decoding="async"></div>
          <p>Mobile — керування з будь-якого місця.</p>
        </article>
      </div>
      <div class="architecture2433-boundary" aria-label="Межі системи BB610 WATER">
        <p><strong>Поза системою:</strong> джерело води, насос подачі, первинна фільтрація.</p>
        <p><strong>У складі BB610 WATER:</strong> керування, дозування, контроль, зони та програмне забезпечення.</p>
      </div>
    </div>`;
  };

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',render);
  else render();
})();
