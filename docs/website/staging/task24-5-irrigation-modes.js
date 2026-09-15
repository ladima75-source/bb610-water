(()=>{
  const STYLE_ID='task24-5-irrigation-modes-style';
  const VOL='task24-5-volume.webp?v=20260915-0625';
  const TIME='task24-5-time.webp?v=20260915-0625';
  const drop=`<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M32 7c9 13 17 22 17 34a17 17 0 1 1-34 0C15 29 23 20 32 7z"/></svg>`;
  const clock=`<svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="22"/><path d="M32 18v16l11 7"/></svg>`;

  function injectStyles(){
    document.getElementById(STYLE_ID)?.remove();
    const s=document.createElement('style');
    s.id=STYLE_ID;
    s.textContent=`
#actual.task245{padding:34px 0 40px!important;background:radial-gradient(circle at 88% 8%,rgba(0,102,164,.16),transparent 27%),linear-gradient(180deg,#061725 0%,#04131f 72%,#04111b 100%);overflow:hidden}
#actual.task245>.container{width:min(1540px,calc(100% - 64px))!important;max-width:none!important;margin-inline:auto!important;padding:0!important}
#actual.task245 .task245-head{display:grid;grid-template-columns:minmax(590px,1.08fr) minmax(430px,.84fr) 220px;gap:34px;align-items:start;margin:0 0 22px}
#actual.task245 .task245-title .eyebrow{margin:0 0 10px;color:#25d0ff;font-size:14px;font-weight:800;letter-spacing:.16em}
#actual.task245 h2{margin:0;color:#f4f7f9;font-size:clamp(43px,3.15vw,55px);line-height:.98;letter-spacing:-.035em;font-weight:800}
#actual.task245 h2 span{display:block}
#actual.task245 h2 .accent{color:#25cfff}
#actual.task245 .task245-lead{margin:54px 0 0;color:#d6e2e8;font-size:18px;line-height:1.5;max-width:570px}
#actual.task245 .task245-lead:after{content:"";display:block;width:52px;height:2px;margin-top:18px;background:#25d0ff}
#actual.task245 .task245-meta{margin-top:54px;padding:3px 0 3px 18px;border-left:2px solid #23d1ff;color:#88a7b8;font-size:13px;line-height:1.6;letter-spacing:.09em;text-transform:uppercase}
#actual.task245 .task245-modes{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:16px;align-items:stretch}
#actual.task245 .task245-mode{display:flex;flex-direction:column;min-width:0;border:1px solid rgba(44,184,234,.42);border-radius:18px;background:linear-gradient(180deg,rgba(5,31,48,.94),rgba(4,19,31,.94));overflow:hidden}
#actual.task245 .task245-mode.primary{border-color:rgba(40,207,255,.64);box-shadow:0 0 0 1px rgba(39,205,255,.05),0 16px 38px rgba(0,0,0,.15)}
#actual.task245 .task245-mode-top{display:grid;grid-template-columns:260px minmax(0,1fr);min-height:150px;padding:17px 20px 14px;gap:20px;align-items:center}
#actual.task245 .task245-identity{display:flex;align-items:center;gap:18px;height:100%;padding-right:20px;border-right:1px solid rgba(64,181,226,.23)}
#actual.task245 .task245-icon{width:82px;height:82px;border-radius:50%;border:1px solid rgba(48,207,255,.45);display:grid;place-items:center;flex:none;background:radial-gradient(circle at 50% 45%,rgba(24,142,203,.18),rgba(4,22,36,.72))}
#actual.task245 .task245-icon svg{width:52px;height:52px;fill:none;stroke:#2dd2ff;stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round}
#actual.task245 .task245-mode-name small{display:block;color:#b9cbd5;font-size:13px;letter-spacing:.09em;margin-bottom:5px}
#actual.task245 .task245-mode-name strong{display:block;color:#28d1ff;font-size:34px;line-height:1;font-weight:800}
#actual.task245 .task245-mode-name span{display:block;margin-top:9px;color:#2bc9f6;font-size:10px;line-height:1.25;text-transform:uppercase}
#actual.task245 .task245-mode-copy{color:#d3dfe5;font-size:15px;line-height:1.45;min-width:0}
#actual.task245 .task245-mode-copy p{margin:0}
#actual.task245 .task245-mode-copy p+p{margin-top:6px}
#actual.task245 .task245-mode-copy strong{color:#2dd2ff;font-weight:800}
#actual.task245 .task245-shot{margin:0 12px 12px;border:1px solid rgba(57,188,238,.38);border-radius:10px;overflow:hidden;background:#061723;min-height:150px;display:flex;align-items:center}
#actual.task245 .task245-shot img{display:block;width:100%;height:auto;opacity:1!important;visibility:visible!important;filter:none!important}
#actual.task245 .task245-compare-title{margin:20px 0 8px;color:#2ad1ff;font-size:17px;font-weight:800;letter-spacing:.04em}
#actual.task245 .task245-compare{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:16px}
#actual.task245 .task245-compare-block{display:grid;grid-template-columns:180px repeat(3,minmax(0,1fr));align-items:center;min-height:92px;padding:11px 16px;border:1px solid rgba(55,181,229,.28);border-radius:14px;background:rgba(5,25,39,.78);overflow:hidden}
#actual.task245 .task245-compare-symbol{display:flex;align-items:center;gap:12px;color:#2dd2ff;font-size:23px;font-weight:800;white-space:nowrap}
#actual.task245 .task245-mini-icon{width:48px;height:48px;border-radius:50%;border:1px solid rgba(45,202,255,.32);display:grid;place-items:center;flex:none}
#actual.task245 .task245-mini-icon svg{width:30px;height:30px;fill:none;stroke:#2dd2ff;stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round}
#actual.task245 .task245-compare-cell{min-height:54px;padding:2px 14px;border-left:1px solid rgba(61,177,220,.22);display:flex;flex-direction:column;justify-content:center}
#actual.task245 .task245-compare-cell b{display:block;color:#2fd1ff;font-size:13px;margin-bottom:5px}
#actual.task245 .task245-compare-cell span{display:block;color:#d7e2e8;font-size:13px;line-height:1.35}
#actual.task245 .task245-conclusion{display:grid;grid-template-columns:72px minmax(0,1fr) 285px;gap:22px;align-items:center;margin-top:16px;padding:17px 8px 0;border-top:1px solid rgba(56,184,230,.25)}
#actual.task245 .task245-conclusion-icon{width:64px;height:64px}
#actual.task245 .task245-conclusion-icon svg{width:64px;height:64px;fill:none;stroke:#2dd2ff;stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round}
#actual.task245 .task245-conclusion-copy strong{display:block;color:#f2f8fb;font-size:25px;line-height:1.24;font-weight:800}
#actual.task245 .task245-conclusion-copy strong b{color:#2dd2ff}
#actual.task245 .task245-conclusion-copy p{margin:7px 0 0;color:#b7cad5;font-size:15px;line-height:1.4}
#actual.task245 .task245-brand{justify-self:end;text-align:right;min-width:250px}
#actual.task245 .task245-brand img{display:block;width:220px;height:auto;margin-left:auto;object-fit:contain}
#actual.task245 .task245-brand span{display:block;margin-top:8px;color:#829faf;font-size:11px;letter-spacing:.1em;text-transform:uppercase;white-space:nowrap}
@media(max-width:1320px){#actual.task245>.container{width:min(100% - 44px,1240px)!important}#actual.task245 .task245-head{grid-template-columns:minmax(500px,1.1fr) minmax(390px,.9fr);gap:28px}#actual.task245 .task245-meta{display:none}#actual.task245 .task245-mode-top{grid-template-columns:225px minmax(0,1fr);gap:16px;padding-inline:16px}#actual.task245 .task245-identity{gap:13px;padding-right:15px}#actual.task245 .task245-icon{width:70px;height:70px}#actual.task245 .task245-icon svg{width:44px;height:44px}#actual.task245 .task245-mode-name strong{font-size:29px}#actual.task245 .task245-mode-copy{font-size:14px}#actual.task245 .task245-compare-block{grid-template-columns:150px repeat(3,minmax(0,1fr));padding-inline:12px}#actual.task245 .task245-compare-cell{padding-inline:10px}}
@media(max-width:980px){#actual.task245 .task245-head{grid-template-columns:1fr;gap:12px}#actual.task245 .task245-lead{margin:0;max-width:780px}#actual.task245 .task245-modes,#actual.task245 .task245-compare{grid-template-columns:1fr}#actual.task245 .task245-mode-top{grid-template-columns:260px minmax(0,1fr)}#actual.task245 .task245-conclusion{grid-template-columns:64px minmax(0,1fr)}#actual.task245 .task245-brand{display:none}}
@media(max-width:700px){#actual.task245{padding:28px 0 34px!important}#actual.task245>.container{width:calc(100% - 28px)!important}#actual.task245 h2{font-size:clamp(34px,10vw,44px)}#actual.task245 h2 span{white-space:normal}#actual.task245 .task245-lead{font-size:15px}#actual.task245 .task245-mode-top{grid-template-columns:1fr;min-height:0;padding:14px;gap:12px}#actual.task245 .task245-identity{height:auto;border-right:0;border-bottom:1px solid rgba(64,181,226,.20);padding:0 0 12px}#actual.task245 .task245-mode-copy{font-size:14px}#actual.task245 .task245-shot{margin:0 8px 10px;min-height:0}#actual.task245 .task245-compare-block{grid-template-columns:1fr;gap:0;min-height:0;padding:12px}#actual.task245 .task245-compare-cell{min-height:0;border-left:0;border-top:1px solid rgba(61,177,220,.18);padding:9px 0}#actual.task245 .task245-compare-symbol{padding-bottom:9px}#actual.task245 .task245-conclusion{grid-template-columns:48px minmax(0,1fr);gap:13px;padding-top:14px}#actual.task245 .task245-conclusion-icon,#actual.task245 .task245-conclusion-icon svg{width:46px;height:46px}#actual.task245 .task245-conclusion-copy strong{font-size:20px}#actual.task245 .task245-conclusion-copy p{font-size:14px}}
`;
    document.head.appendChild(s);
  }

  function modeCard(type){
    const isVol=type==='vol';
    return `<article class="task245-mode ${isVol?'primary':''}">
      <div class="task245-mode-top">
        <div class="task245-identity">
          <div class="task245-icon">${isVol?drop:clock}</div>
          <div class="task245-mode-name"><small>РЕЖИМ</small><strong>${isVol?'ОБ’ЄМ':'ЧАС'}</strong><span>${isVol?'головний принцип BB610 WATER':'звичний полив з контролем'}</span></div>
        </div>
        <div class="task245-mode-copy">${isVol?
          `<p>Ви задаєте необхідну кількість води в літрах.</p><p>Система вимірює фактичний потік і продовжує полив доти, доки заданий об’єм не буде реально поданий у зону.</p><p><strong>Критерієм завершення є не тривалість, а фактична кількість води.</strong></p>`:
          `<p>Ви задаєте тривалість поливу. Система виконує завдання протягом заданого часу.</p><p>При цьому вимірює та зберігає фактичний об’єм води.</p><p><strong>Фактичні літри є результатом вимірювання, але не критерієм завершення поливу.</strong></p>`}
        </div>
      </div>
      <figure class="task245-shot"><img src="${isVol?VOL:TIME}" alt="Реальний інтерфейс BB610 PULS у режимі ${isVol?'ОБ’ЄМ':'ЧАС'}" loading="eager" decoding="sync"></figure>
    </article>`;
  }

  function compareBlock(type){
    const isVol=type==='vol';
    return `<div class="task245-compare-block">
      <div class="task245-compare-symbol"><span class="task245-mini-icon">${isVol?drop:clock}</span><span>${isVol?'ОБ’ЄМ':'ЧАС'}</span></div>
      <div class="task245-compare-cell"><b>Задано</b><span>${isVol?'літри':'тривалість'}</span></div>
      <div class="task245-compare-cell"><b>Контроль</b><span>фактичний об’єм</span></div>
      <div class="task245-compare-cell"><b>Завершення</b><span>${isVol?'після подачі заданого об’єму':'після завершення заданого часу'}</span></div>
    </div>`;
  }

  function render(){
    const section=document.querySelector('#actual');
    if(!section)return;
    injectStyles();
    section.classList.add('task245');
    section.innerHTML=`<div class="container">
      <div class="task245-head">
        <div class="task245-title">
          <p class="eyebrow">05 / КЛЮЧОВА ВІДМІННІСТЬ</p>
          <h2><span>ПОЛИВ ЗА ФАКТИЧНИМ</span><span class="accent">ОБ’ЄМОМ,</span><span>А НЕ ЛИШЕ ЗА ТРИВАЛІСТЮ</span></h2>
        </div>
        <p class="task245-lead">У BB610 PULS можна задавати полив за об’ємом або за часом. В обох режимах система вимірює фактичну кількість поданої води, але логіка виконання завдання відрізняється.</p>
        <div class="task245-meta">ТОЧНИЙ ОБЛІК.<br>ЕФЕКТИВНИЙ ПОЛИВ.<br>СТАБІЛЬНИЙ РЕЗУЛЬТАТ.</div>
      </div>
      <div class="task245-modes">${modeCard('vol')}${modeCard('time')}</div>
      <div class="task245-compare-title">ПОРІВНЯННЯ РЕЖИМІВ</div>
      <div class="task245-compare">${compareBlock('vol')}${compareBlock('time')}</div>
      <div class="task245-conclusion">
        <div class="task245-conclusion-icon">${drop}</div>
        <div class="task245-conclusion-copy"><strong><b>BB610 WATER</b> дозволяє керувати поливом<br>не лише за тривалістю, а за реально поданою кількістю води.</strong><p>Час показує, скільки працювала система. Об’єм показує, скільки води рослини фактично отримали.</p></div>
        <div class="task245-brand"><img src="assets/bb610-water-horizontal-logo.webp" alt="BB610 WATER"><span>НАДІЙНИЙ ПОЛИВ. СТАБІЛЬНИЙ РЕЗУЛЬТАТ.</span></div>
      </div>
    </div>`;
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>requestAnimationFrame(render));else requestAnimationFrame(render);
})();