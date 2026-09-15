(()=>{
  const STYLE_ID='task24-5-irrigation-modes-style';
  const VOL='task24-5-volume.webp?v=20260915-2454';
  const TIME='task24-5-time.webp?v=20260915-2454';
  const drop=`<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M32 7c9 13 17 22 17 34a17 17 0 1 1-34 0C15 29 23 20 32 7z"/></svg>`;
  const clock=`<svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="22"/><path d="M32 18v16l11 7"/></svg>`;

  function injectStyles(){
    document.getElementById(STYLE_ID)?.remove();
    const s=document.createElement('style');
    s.id=STYLE_ID;
    s.textContent=`
#actual.task245{padding:34px 0 42px!important;background:radial-gradient(circle at 86% 10%,rgba(14,91,145,.16),transparent 24%),linear-gradient(180deg,#061725 0%,#04121e 100%)}
#actual.task245>.container{width:min(1440px,calc(100% - 48px))!important;margin-inline:auto!important}
#actual.task245 .task245-head{display:grid;grid-template-columns:minmax(0,46fr) minmax(0,39fr) minmax(170px,15fr);gap:34px;align-items:start;margin-bottom:22px}
#actual.task245 .eyebrow{margin:0 0 11px;color:#26d0ff;font-size:14px;font-weight:800;letter-spacing:.15em}
#actual.task245 h2{margin:0;max-width:690px;font-size:clamp(42px,3.3vw,58px);line-height:.98;letter-spacing:-.035em;color:#f3f7f9}
#actual.task245 h2 .accent{color:#25cfff}
#actual.task245 .task245-lead{margin:29px 0 0;color:#d5e0e6;font-size:18px;line-height:1.48;max-width:600px}
#actual.task245 .task245-meta{margin-top:16px;padding-left:18px;border-left:2px solid #22d1ff;color:#87a6b8;font-size:13px;line-height:1.55;letter-spacing:.08em;text-transform:uppercase}
#actual.task245 .task245-modes{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:6px}
#actual.task245 .task245-mode{border:1px solid rgba(40,186,240,.40);border-radius:18px;background:linear-gradient(180deg,rgba(5,30,48,.88),rgba(4,19,31,.88));overflow:hidden;box-shadow:inset 0 1px 0 rgba(255,255,255,.025)}
#actual.task245 .task245-mode.primary{border-color:rgba(42,207,255,.60);box-shadow:0 0 0 1px rgba(40,202,255,.05),0 18px 40px rgba(0,0,0,.16)}
#actual.task245 .task245-mode-top{display:grid;grid-template-columns:112px 180px 1px 1fr;gap:18px;align-items:center;padding:18px 22px 14px}
#actual.task245 .task245-icon{width:92px;height:92px;border-radius:50%;border:1px solid rgba(48,207,255,.45);display:grid;place-items:center;background:radial-gradient(circle at 50% 45%,rgba(24,142,203,.18),rgba(4,22,36,.72))}
#actual.task245 .task245-icon svg{width:58px;height:58px;fill:none;stroke:#2dd2ff;stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round}
#actual.task245 .task245-mode-name small{display:block;color:#b6c8d2;font-size:14px;letter-spacing:.08em;margin-bottom:4px}
#actual.task245 .task245-mode-name strong{display:block;color:#27d0ff;font-size:35px;line-height:1;font-weight:800;letter-spacing:.01em}
#actual.task245 .task245-mode-name span{display:block;margin-top:10px;color:#2dc9f7;font-size:11px;letter-spacing:.03em;text-transform:uppercase}
#actual.task245 .task245-sep{height:86px;background:rgba(64,181,226,.24)}
#actual.task245 .task245-mode-copy{color:#d3dfe5;font-size:15px;line-height:1.45}
#actual.task245 .task245-mode-copy p{margin:0}
#actual.task245 .task245-mode-copy p+p{margin-top:5px}
#actual.task245 .task245-mode-copy strong{color:#29d0ff;font-weight:800}
#actual.task245 .task245-shot{margin:0 14px 14px;border:1px solid rgba(59,191,239,.35);border-radius:10px;overflow:hidden;background:#041521;box-shadow:0 12px 26px rgba(0,0,0,.20)}
#actual.task245 .task245-shot img{display:block;width:100%;height:auto}
#actual.task245 .task245-compare-title{margin:22px 0 8px;color:#28d1ff;font-size:17px;font-weight:800;letter-spacing:.04em}
#actual.task245 .task245-compare{display:grid;grid-template-columns:1fr 1fr;gap:14px}
#actual.task245 .task245-compare-block{display:grid;grid-template-columns:90px 1px repeat(3,1fr);align-items:center;gap:18px;min-height:94px;padding:12px 18px;border:1px solid rgba(56,181,229,.25);border-radius:14px;background:rgba(5,25,39,.72)}
#actual.task245 .task245-compare-symbol{display:flex;align-items:center;gap:10px;color:#2dd2ff;font-size:23px;font-weight:800}
#actual.task245 .task245-mini-icon{width:48px;height:48px;border-radius:50%;border:1px solid rgba(45,202,255,.30);display:grid;place-items:center;flex:none}
#actual.task245 .task245-mini-icon svg{width:31px;height:31px;fill:none;stroke:#2dd2ff;stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round}
#actual.task245 .task245-compare-sep{height:58px;background:rgba(61,177,220,.22)}
#actual.task245 .task245-compare-cell b{display:block;color:#2fd1ff;font-size:13px;margin-bottom:5px}
#actual.task245 .task245-compare-cell span{display:block;color:#d6e1e7;font-size:13px;line-height:1.35}
#actual.task245 .task245-conclusion{display:grid;grid-template-columns:70px 1fr auto;gap:22px;align-items:center;margin-top:18px;padding:18px 6px 0;border-top:1px solid rgba(56,184,230,.20)}
#actual.task245 .task245-conclusion-icon{width:64px;height:64px}
#actual.task245 .task245-conclusion-icon svg{width:64px;height:64px;fill:none;stroke:#2dd2ff;stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round}
#actual.task245 .task245-conclusion strong{display:block;color:#f2f8fb;font-size:26px;line-height:1.23}
#actual.task245 .task245-conclusion strong b{color:#2dd2ff}
#actual.task245 .task245-conclusion p{margin:7px 0 0;color:#b9ccd7;font-size:15px;line-height:1.42}
#actual.task245 .task245-brand{color:#82a2b4;font-size:12px;letter-spacing:.12em;text-transform:uppercase;white-space:nowrap}
@media(max-width:1120px){#actual.task245 .task245-head{grid-template-columns:1fr 1fr;gap:24px}#actual.task245 .task245-meta{display:none}#actual.task245 .task245-mode-top{grid-template-columns:90px 150px 1px 1fr;gap:14px;padding-inline:16px}#actual.task245 .task245-icon{width:76px;height:76px}#actual.task245 .task245-icon svg{width:48px;height:48px}#actual.task245 .task245-mode-name strong{font-size:30px}#actual.task245 .task245-mode-copy{font-size:14px}#actual.task245 .task245-compare-block{grid-template-columns:80px 1px repeat(3,1fr);gap:12px;padding-inline:12px}}
@media(max-width:900px){#actual.task245 .task245-head{grid-template-columns:1fr;gap:10px}#actual.task245 .task245-lead{margin:0;max-width:760px}#actual.task245 .task245-modes{grid-template-columns:1fr}#actual.task245 .task245-compare{grid-template-columns:1fr}#actual.task245 .task245-conclusion{grid-template-columns:58px 1fr}#actual.task245 .task245-brand{display:none}}
@media(max-width:700px){#actual.task245{padding:28px 0 34px!important}#actual.task245>.container{width:min(100% - 28px,620px)!important}#actual.task245 h2{font-size:clamp(34px,10vw,44px)}#actual.task245 .task245-lead{font-size:15px}#actual.task245 .task245-mode-top{grid-template-columns:72px 1fr;gap:14px;padding:14px}#actual.task245 .task245-icon{width:68px;height:68px}#actual.task245 .task245-icon svg{width:42px;height:42px}#actual.task245 .task245-sep{display:none}#actual.task245 .task245-mode-copy{grid-column:1/-1;font-size:14px;padding-top:4px}#actual.task245 .task245-shot{margin:0 8px 10px}#actual.task245 .task245-compare-block{grid-template-columns:1fr;gap:8px;min-height:0}#actual.task245 .task245-compare-sep{display:none}#actual.task245 .task245-compare-symbol{margin-bottom:4px}#actual.task245 .task245-conclusion{grid-template-columns:48px 1fr;gap:14px;padding-top:14px}#actual.task245 .task245-conclusion-icon,#actual.task245 .task245-conclusion-icon svg{width:46px;height:46px}#actual.task245 .task245-conclusion strong{font-size:20px}#actual.task245 .task245-conclusion p{font-size:14px}}
`;
    document.head.appendChild(s);
  }

  function modeCard(type){
    const isVol=type==='vol';
    return `<article class="task245-mode ${isVol?'primary':''}">
      <div class="task245-mode-top">
        <div class="task245-icon">${isVol?drop:clock}</div>
        <div class="task245-mode-name"><small>РЕЖИМ</small><strong>${isVol?'ОБ’ЄМ':'ЧАС'}</strong><span>${isVol?'головний принцип BB610 WATER':'звичний полив з контролем'}</span></div>
        <div class="task245-sep"></div>
        <div class="task245-mode-copy">${isVol?
          `<p>Ви задаєте необхідну кількість води в літрах.</p><p>Система вимірює фактичний потік і продовжує полив доти, доки заданий об’єм не буде реально поданий у зону.</p><p><strong>Критерієм завершення є не тривалість, а фактична кількість води.</strong></p>`:
          `<p>Ви задаєте тривалість поливу.</p><p>Система виконує завдання протягом заданого часу. При цьому вимірює та зберігає фактичний об’єм води.</p><p><strong>Фактичні літри є результатом вимірювання, але не критерієм завершення поливу.</strong></p>`}
        </div>
      </div>
      <figure class="task245-shot"><img src="${isVol?VOL:TIME}" alt="Реальний інтерфейс BB610 PULS у режимі ${isVol?'ОБ’ЄМ':'ЧАС'}"></figure>
    </article>`;
  }

  function compareBlock(type){
    const isVol=type==='vol';
    return `<div class="task245-compare-block">
      <div class="task245-compare-symbol"><span class="task245-mini-icon">${isVol?drop:clock}</span><span>${isVol?'ОБ’ЄМ':'ЧАС'}</span></div>
      <div class="task245-compare-sep"></div>
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
        <div>
          <p class="eyebrow">05 / КЛЮЧОВА ВІДМІННІСТЬ</p>
          <h2>ПОЛИВ ЗА ФАКТИЧНИМ <span class="accent">ОБ’ЄМОМ,</span><br>А НЕ ЛИШЕ ЗА ТРИВАЛІСТЮ</h2>
        </div>
        <p class="task245-lead">У BB610 PULS можна задавати полив за об’ємом або за часом.<br>В обох режимах система вимірює фактичну кількість поданої води,<br>але логіка виконання завдання відрізняється.</p>
        <div class="task245-meta">ТОЧНИЙ ОБЛІК.<br>ЕФЕКТИВНИЙ ПОЛИВ.<br>СТАБІЛЬНИЙ РЕЗУЛЬТАТ.</div>
      </div>
      <div class="task245-modes">${modeCard('vol')}${modeCard('time')}</div>
      <div class="task245-compare-title">ПОРІВНЯННЯ РЕЖИМІВ</div>
      <div class="task245-compare">${compareBlock('vol')}${compareBlock('time')}</div>
      <div class="task245-conclusion">
        <div class="task245-conclusion-icon">${drop}</div>
        <div><strong><b>BB610 WATER</b> дозволяє керувати поливом<br>не лише за тривалістю, а за реально поданою кількістю води.</strong><p>Час показує, скільки працювала система. Об’єм показує, скільки води рослини фактично отримали.</p></div>
        <div class="task245-brand">НАДІЙНИЙ ПОЛИВ. СТАБІЛЬНИЙ РЕЗУЛЬТАТ.</div>
      </div>
    </div>`;
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>requestAnimationFrame(render));else requestAnimationFrame(render);
})();