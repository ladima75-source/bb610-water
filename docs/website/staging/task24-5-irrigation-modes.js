(()=>{
  const STYLE_ID='task24-5-irrigation-modes-style';
  const VOL='task24-5-volume.webp?v=20260914-2453';
  const TIME='task24-5-time.webp?v=20260914-2453';

  function injectStyles(){
    document.getElementById(STYLE_ID)?.remove();
    const s=document.createElement('style');
    s.id=STYLE_ID;
    s.textContent=`
#actual.task245{padding:42px 0 48px!important;background:linear-gradient(180deg,#0a1820 0%,#091820 100%)}
#actual.task245>.container{width:min(1380px,calc(100% - 48px))!important;margin-inline:auto!important}
#actual.task245 .task245-head{display:grid;grid-template-columns:minmax(0,58fr) minmax(360px,42fr);gap:52px;align-items:end;margin-bottom:24px}
#actual.task245 .eyebrow{margin:0 0 10px;color:#28d1ff;font-size:13px;font-weight:800;letter-spacing:.18em}
#actual.task245 h2{margin:0;max-width:760px;font-size:clamp(44px,3.4vw,60px);line-height:.98;letter-spacing:-.035em}
#actual.task245 .task245-lead{margin:0;color:#c7d6df;font-size:18px;line-height:1.5;max-width:560px}
#actual.task245 .task245-modes{display:grid;grid-template-columns:minmax(0,1.45fr) minmax(0,1fr);gap:18px;align-items:stretch}
#actual.task245 .task245-mode{position:relative;border:1px solid rgba(66,174,220,.23);border-radius:20px;background:linear-gradient(180deg,rgba(8,33,48,.78),rgba(6,24,36,.60));padding:20px 20px 18px;overflow:hidden}
#actual.task245 .task245-mode.primary{border-color:rgba(39,202,255,.45);box-shadow:0 0 0 1px rgba(39,202,255,.05),0 18px 46px rgba(0,0,0,.16);background:radial-gradient(circle at 16% 10%,rgba(34,179,235,.11),transparent 30%),linear-gradient(180deg,rgba(8,35,53,.90),rgba(5,24,38,.72))}
#actual.task245 .task245-mode-label{margin:0 0 8px;color:#34d1ff;font-size:12px;font-weight:800;letter-spacing:.13em}
#actual.task245 .task245-mode h3{margin:0 0 10px;color:#fff;font-size:25px;line-height:1.12;letter-spacing:-.01em}
#actual.task245 .task245-mode p{margin:0;color:#c4d5df;font-size:15px;line-height:1.45}
#actual.task245 .task245-mode p+p{margin-top:8px}
#actual.task245 .task245-highlight{color:#eefbff!important;font-weight:700}
#actual.task245 .task245-shot{margin:16px 0 14px;border:1px solid rgba(66,183,230,.28);border-radius:12px;overflow:hidden;background:#061722;box-shadow:0 14px 30px rgba(0,0,0,.20)}
#actual.task245 .task245-shot img{display:block;width:100%;height:auto}
#actual.task245 .task245-formula{margin-top:12px;padding-top:12px;border-top:1px solid rgba(64,176,223,.20);color:#f1fbff;font-size:14px;font-weight:800;letter-spacing:.02em}
#actual.task245 .task245-compare{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-top:18px}
#actual.task245 .task245-compare-block{padding:16px 18px;border-top:1px solid rgba(48,187,238,.28);background:linear-gradient(180deg,rgba(7,28,40,.30),rgba(7,28,40,0))}
#actual.task245 .task245-compare-block strong{display:block;margin-bottom:8px;color:#fff;font-size:16px}
#actual.task245 .task245-compare-block.primary strong{color:#39d4ff}
#actual.task245 .task245-compare-block span{display:block;color:#b8cbd6;font-size:14px;line-height:1.55}
#actual.task245 .task245-conclusion{margin-top:18px;padding:16px 0 0;border-top:1px solid rgba(55,181,230,.25)}
#actual.task245 .task245-conclusion strong{display:block;color:#fff;font-size:22px;line-height:1.25}
#actual.task245 .task245-conclusion p{margin:7px 0 0;color:#9fc5d9;font-size:16px;line-height:1.45}
@media(max-width:1050px){#actual.task245 .task245-head{grid-template-columns:1fr;gap:12px;align-items:start}#actual.task245 .task245-lead{max-width:820px}#actual.task245 .task245-modes{grid-template-columns:1fr}#actual.task245 .task245-mode h3{font-size:23px}}
@media(max-width:700px){#actual.task245{padding:30px 0 34px!important}#actual.task245>.container{width:min(100% - 28px,620px)!important}#actual.task245 h2{font-size:clamp(34px,10vw,44px);line-height:1.02}#actual.task245 .task245-lead{font-size:15px}#actual.task245 .task245-mode{padding:16px 14px 14px;border-radius:16px}#actual.task245 .task245-mode h3{font-size:20px}#actual.task245 .task245-mode p{font-size:14px}#actual.task245 .task245-shot{margin:12px 0 12px;border-radius:10px}#actual.task245 .task245-compare{grid-template-columns:1fr;gap:8px;margin-top:14px}#actual.task245 .task245-compare-block{padding:12px 4px}#actual.task245 .task245-conclusion strong{font-size:19px}#actual.task245 .task245-conclusion p{font-size:14px}}
`;
    document.head.appendChild(s);
  }

  function render(){
    const section=document.querySelector('#actual');
    if(!section)return;
    injectStyles();
    section.classList.add('task245');
    section.innerHTML=`<div class="container">
      <div class="task245-head">
        <div>
          <p class="eyebrow">КЛЮЧОВА ВІДМІННІСТЬ</p>
          <h2>ПОЛИВ ЗА ФАКТИЧНИМ ОБ’ЄМОМ</h2>
        </div>
        <p class="task245-lead">У BB610 PULS можна задавати полив за об’ємом або за часом. В обох режимах система вимірює фактичну кількість поданої води, але логіка виконання завдання відрізняється.</p>
      </div>
      <div class="task245-modes">
        <article class="task245-mode primary">
          <p class="task245-mode-label">ОБ’ЄМ · ГОЛОВНИЙ ПРИНЦИП</p>
          <h3>РЕЖИМ «ОБ’ЄМ» — ГОЛОВНИЙ ПРИНЦИП BB610 WATER</h3>
          <p>Ви задаєте необхідну кількість води в літрах. BB610 WATER вимірює фактичний потік і продовжує полив доти, доки заданий об’єм не буде реально поданий у зону.</p>
          <p class="task245-highlight">Критерієм завершення є не тривалість відкритого клапана, а фактична кількість води.</p>
          <figure class="task245-shot"><img src="${VOL}" alt="Реальний інтерфейс BB610 PULS у режимі ОБ’ЄМ"></figure>
          <div class="task245-formula">ЗАДАНО, Л → ФАКТИЧНО, Л → ВИКОНАНО</div>
        </article>
        <article class="task245-mode">
          <p class="task245-mode-label">ЧАС · ПОВНОЦІННИЙ РОБОЧИЙ РЕЖИМ</p>
          <h3>РЕЖИМ «ЧАС» — ЗВИЧНИЙ ПОЛИВ З ДОДАТКОВИМ ФАКТИЧНИМ КОНТРОЛЕМ</h3>
          <p>Ви задаєте тривалість поливу. Система виконує завдання протягом заданого часу.</p>
          <p>При цьому BB610 WATER одночасно вимірює та зберігає фактичний об’єм води, який був поданий у зону.</p>
          <p class="task245-highlight">У режимі «ЧАС» фактичні літри є результатом вимірювання, але не критерієм завершення поливу.</p>
          <figure class="task245-shot"><img src="${TIME}" alt="Реальний інтерфейс BB610 PULS у режимі ЧАС"></figure>
          <div class="task245-formula">ЗАДАНО, ЧАС → ФАКТИЧНО ПОДАНО, Л → ЗБЕРЕЖЕНО ЯК РЕЗУЛЬТАТ</div>
        </article>
      </div>
      <div class="task245-compare" aria-label="Порівняння режимів ОБ’ЄМ і ЧАС">
        <div class="task245-compare-block primary"><strong>ОБ’ЄМ</strong><span>Задано: літри</span><span>Контроль: фактичний об’єм</span><span>Завершення: після подачі заданого об’єму</span></div>
        <div class="task245-compare-block"><strong>ЧАС</strong><span>Задано: тривалість</span><span>Контроль: фактичний об’єм також вимірюється</span><span>Завершення: після завершення заданого часу</span></div>
      </div>
      <div class="task245-conclusion">
        <strong>BB610 WATER дозволяє керувати поливом не лише за тривалістю, а за реально поданою кількістю води.</strong>
        <p>Час показує, скільки працювала система. Об’єм показує, скільки води рослини фактично отримали.</p>
      </div>
    </div>`;
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>requestAnimationFrame(render));else requestAnimationFrame(render);
})();