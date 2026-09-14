(()=>{
  const injectStyles=()=>{
    if(document.getElementById('task24-3-4-style')) return;
    const s=document.createElement('style');
    s.id='task24-3-4-style';
    s.textContent=`
#architecture{padding:22px 0 18px!important}
#architecture .architecture2434-shell{width:min(1280px,calc(100% - 40px));margin:0 auto;display:grid;gap:14px}
.architecture2434-hero{display:grid;grid-template-columns:minmax(360px,0.92fr) minmax(520px,1.28fr);gap:28px;align-items:center;min-height:430px}
.architecture2434-copy{display:grid;gap:16px;align-self:center;max-width:510px}
.architecture2434-head{display:grid;gap:8px}
.architecture2434-head h2{margin:0;font-size:clamp(32px,2.8vw,48px);line-height:1.02;letter-spacing:-.03em}
.architecture2434-subhead{margin:0;color:var(--text-2);font-size:19px;line-height:1.32;max-width:500px}
.architecture2434-list{display:grid;gap:10px;margin:0;padding:0;list-style:none}
.architecture2434-list li{margin:0;color:var(--text-2);font-size:16px;line-height:1.38}
.architecture2434-list strong{color:var(--text-1);font-size:17px}
.architecture2434-visual{position:relative;min-height:420px;display:flex;align-items:center;justify-content:center}
.architecture2434-stage{position:relative;width:100%;max-width:700px;height:100%;min-height:420px}
.architecture2434-module{position:absolute;display:block;pointer-events:none;filter:drop-shadow(0 12px 28px rgba(0,0,0,.34))}
.architecture2434-module img{display:block;width:100%;height:auto;object-fit:contain;background:transparent!important;border:0!important;border-radius:0!important;box-shadow:none!important;padding:0!important}
.architecture2434-module--control{width:46%;left:2%;top:18%;z-index:3}
.architecture2434-module--hydraulic{width:39%;left:38%;top:12%;z-index:2}
.architecture2434-module--zone{width:39%;left:57%;top:31%;z-index:1}
.architecture2434-module--hydraulic img,.architecture2434-module--zone img{mix-blend-mode:multiply}
.architecture2434-software{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:26px;align-items:start;padding-top:2px}
.architecture2434-soft{display:grid;gap:6px;justify-items:start;min-width:0}
.architecture2434-soft--right{justify-items:end;text-align:right}
.architecture2434-soft-logo{height:56px;display:flex;align-items:flex-end;max-width:100%}
.architecture2434-soft-logo img{display:block;height:52px;width:auto;max-width:100%;object-fit:contain}
.architecture2434-soft p{margin:0;color:var(--text-2);font-size:13px;line-height:1.35}
.architecture2434-boundary{padding-top:2px}
.architecture2434-boundary p{margin:0;color:var(--text-2);font-size:13.5px;line-height:1.35}
.architecture2434-boundary strong{color:var(--text-1)}
@media (max-width:1100px){
  #architecture .architecture2434-shell{width:min(calc(100% - 32px),1080px)}
  .architecture2434-hero{grid-template-columns:minmax(320px,.94fr) minmax(440px,1.1fr);gap:24px;min-height:400px}
  .architecture2434-visual,.architecture2434-stage{min-height:390px}
  .architecture2434-module--control{width:45%;left:1%;top:19%}
  .architecture2434-module--hydraulic{width:38%;left:39%;top:13%}
  .architecture2434-module--zone{width:38%;left:59%;top:31%}
}
@media (max-width:900px){
  #architecture{padding:30px 0 26px!important}
  #architecture .architecture2434-shell{width:min(calc(100% - 28px),620px);gap:18px}
  .architecture2434-hero{grid-template-columns:1fr;gap:18px;min-height:auto}
  .architecture2434-copy{max-width:none;gap:14px}
  .architecture2434-head{gap:10px}
  .architecture2434-head h2{font-size:clamp(30px,9vw,40px)}
  .architecture2434-subhead{font-size:17px;max-width:none}
  .architecture2434-list li{font-size:15px}
  .architecture2434-list strong{font-size:16px}
  .architecture2434-visual{min-height:320px}
  .architecture2434-stage{min-height:320px;max-width:540px;margin:0 auto}
  .architecture2434-module--control{width:47%;left:0;top:17%}
  .architecture2434-module--hydraulic{width:39%;left:38%;top:12%}
  .architecture2434-module--zone{width:39%;left:58%;top:30%}
  .architecture2434-software{grid-template-columns:1fr;gap:14px;padding-top:0}
  .architecture2434-soft,.architecture2434-soft--right{justify-items:center;text-align:center}
  .architecture2434-soft-logo{justify-content:center;height:52px}
  .architecture2434-soft-logo img{height:46px}
  .architecture2434-boundary p{text-align:center;font-size:13.5px}
}
`;
    document.head.appendChild(s);
  };

  const render=()=>{
    const section=document.querySelector('#architecture');
    if(!section) return;
    injectStyles();
    section.setAttribute('aria-labelledby','architecture2434-title');
    section.innerHTML=`
      <div class="architecture2434-shell">
        <div class="architecture2434-hero">
          <div class="architecture2434-copy">
            <header class="architecture2434-head">
              <h2 id="architecture2434-title">З ЧОГО СКЛАДАЄТЬСЯ BB610 WATER</h2>
              <p class="architecture2434-subhead">Три фізичні модулі та програмне керування працюють як одна система.</p>
            </header>
            <ul class="architecture2434-list" aria-label="Основні модулі BB610 WATER">
              <li><strong>CONTROL</strong> — керування, автоматика та логіка.</li>
              <li><strong>HYDRAULIC</strong> — полив, фертигація, дозування та контроль параметрів.</li>
              <li><strong>ZONE</strong> — розподіл води по окремих зонах.</li>
            </ul>
          </div>
          <div class="architecture2434-visual" aria-label="Архітектура продукту BB610 WATER">
            <div class="architecture2434-stage">
              <figure class="architecture2434-module architecture2434-module--control">
                <img src="assets/промышленный_контроллер_bb610_water.png" alt="CONTROL — модуль керування системою BB610 WATER" loading="eager" decoding="async">
              </figure>
              <figure class="architecture2434-module architecture2434-module--hydraulic">
                <img src="assets/промышленный_блок_гидравлического_фертигационного.png" alt="HYDRAULIC — гідравлічний модуль BB610 WATER" loading="eager" decoding="async">
              </figure>
              <figure class="architecture2434-module architecture2434-module--zone">
                <img src="assets/промышленный_коллектор_управления_поливом.png" alt="ZONE — модуль керування зонами BB610 WATER" loading="eager" decoding="async">
              </figure>
            </div>
          </div>
        </div>
        <div class="architecture2434-software" aria-label="Програмне керування BB610 WATER">
          <article class="architecture2434-soft">
            <div class="architecture2434-soft-logo"><img src="assets/bb610-puls-horizontal.svg" alt="BB610 PULS" loading="eager" decoding="async"></div>
            <p>Windows · налаштування · програмування · контроль у реальному часі</p>
          </article>
          <article class="architecture2434-soft architecture2434-soft--right">
            <div class="architecture2434-soft-logo"><img src="assets/bb610-puls-mobile-horizontal.svg" alt="BB610 PULS MOBILE" loading="eager" decoding="async"></div>
            <p>Керування поливом і внесенням добрив з будь-якого місця</p>
          </article>
        </div>
        <div class="architecture2434-boundary" aria-label="Межі системи BB610 WATER">
          <p><strong>Поза системою:</strong> джерело води, насос подачі та первинна фільтрація.</p>
        </div>
      </div>`;
  };

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',render);
  else render();
})();
