(()=>{
  const STYLE_ID='task24-6-fertigation-style';
  const DROP=`<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M32 7c9 13 17 22 17 34a17 17 0 1 1-34 0C15 29 23 20 32 7z"/></svg>`;
  const FLASK=`<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M25 8h14M28 8v17L15 48a6 6 0 0 0 5 8h24a6 6 0 0 0 5-8L36 25V8"/><path d="M21 43h22"/></svg>`;
  const CHECK=`<svg viewBox="0 0 64 64" aria-hidden="true"><path d="m17 33 10 10 21-23"/></svg>`;
  const GEAR=`<svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="9"/><path d="M32 8v7M32 49v7M8 32h7M49 32h7M15 15l5 5M44 44l5 5M49 15l-5 5M20 44l-5 5"/></svg>`;
  const BARS=`<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M14 52V34h9v18M28 52V20h9v32M42 52V12h9v40"/></svg>`;
  function styles(){
    document.getElementById(STYLE_ID)?.remove();
    const s=document.createElement('style');
    s.id=STYLE_ID;
    s.textContent=`
#fertigation.task246{padding:28px 0 30px!important;background:radial-gradient(circle at 85% 12%,rgba(0,130,190,.15),transparent 26%),linear-gradient(180deg,#061725,#04131f 72%,#04111b);overflow:hidden}
#fertigation.task246>.container{width:min(1540px,calc(100% - 58px))!important;max-width:none!important;margin-inline:auto!important;padding:0!important}
#fertigation.task246 .t246-top{display:grid;grid-template-columns:380px minmax(0,1.12fr) minmax(0,.94fr);gap:18px;align-items:start}
#fertigation.task246 .t246-copy .eyebrow{margin:0 0 10px;color:#28d2ff;font-size:13px;font-weight:800;letter-spacing:.15em}
#fertigation.task246 h2{margin:0;color:#f5f7f9;font-size:clamp(38px,3.2vw,54px);line-height:.98;letter-spacing:-.035em;font-weight:800}
#fertigation.task246 h2 .accent{color:#28d1ff;display:block}
#fertigation.task246 .t246-lead{margin:20px 0 0;color:#c4d1d8;font-size:17px;line-height:1.48;max-width:360px}
#fertigation.task246 .t246-lead:after{content:"";display:block;width:52px;height:2px;background:#25d0ff;margin-top:18px}
#fertigation.task246 .t246-specs{display:flex;gap:28px;margin-top:22px}
#fertigation.task246 .t246-spec{min-width:125px;padding-right:24px;border-right:1px solid rgba(45,209,255,.42)}
#fertigation.task246 .t246-spec:last-child{border-right:0;padding-right:0}
#fertigation.task246 .t246-spec b{display:block;color:#f7fbfd;font-size:25px;line-height:1}
#fertigation.task246 .t246-spec span{display:block;margin-top:5px;color:#d7e2e8;font-size:14px;line-height:1.28}
#fertigation.task246 .t246-shot{margin:0;border:1px solid rgba(43,202,255,.46);border-radius:14px;overflow:hidden;background:#04131f;box-shadow:0 18px 34px rgba(0,0,0,.16)}
#fertigation.task246 .t246-shot img{display:block;width:100%;height:auto;object-fit:contain;background:#03131f}
#fertigation.task246 .t246-shot.recipe img{aspect-ratio:607/488}
#fertigation.task246 .t246-shot.task img{aspect-ratio:506/488}
#fertigation.task246 .t246-lower{display:grid;grid-template-columns:minmax(0,1fr) 285px;gap:16px;margin-top:16px}
#fertigation.task246 .t246-flow{border:1px solid rgba(45,202,255,.42);border-radius:14px;background:rgba(4,22,35,.9);padding:14px 18px 15px}
#fertigation.task246 .t246-flow-title{color:#29d1ff;font-size:13px;font-weight:800;letter-spacing:.12em;margin-bottom:10px}
#fertigation.task246 .t246-flow-row{display:grid;grid-template-columns:1fr 34px 1.18fr 34px .9fr 34px 1.05fr;align-items:center}
#fertigation.task246 .t246-step{display:grid;grid-template-columns:48px minmax(0,1fr);gap:10px;align-items:center;min-width:0}
#fertigation.task246 .t246-ico{width:46px;height:46px;border-radius:50%;display:grid;place-items:center;border:1px solid rgba(45,210,255,.5);background:radial-gradient(circle,rgba(31,166,221,.18),rgba(3,20,31,.8))}
#fertigation.task246 .t246-ico svg,#fertigation.task246 .t246-benefit-ico svg,#fertigation.task246 .t246-end-ico svg{fill:none;stroke:#2dd2ff;stroke-width:2.5;stroke-linecap:round;stroke-linejoin:round}
#fertigation.task246 .t246-ico svg{width:30px;height:30px}
#fertigation.task246 .t246-step .num{color:#2bd2ff;font-size:12px;font-weight:800}
#fertigation.task246 .t246-step strong{display:block;color:#f2f7f9;font-size:14px;margin-top:2px}
#fertigation.task246 .t246-step span{display:block;color:#b9cad3;font-size:12px;line-height:1.35;margin-top:4px}
#fertigation.task246 .t246-arrow{text-align:center;color:#29d2ff;font-size:28px;font-weight:300}
#fertigation.task246 .t246-benefits{display:grid;grid-template-rows:1fr 1fr;gap:10px}
#fertigation.task246 .t246-benefit{display:grid;grid-template-columns:48px 1fr;gap:12px;align-items:center;padding:11px 13px;border:1px solid rgba(45,202,255,.32);border-radius:13px;background:rgba(4,22,35,.88)}
#fertigation.task246 .t246-benefit-ico{width:44px;height:44px;border-radius:11px;border:1px solid rgba(45,210,255,.36);display:grid;place-items:center}
#fertigation.task246 .t246-benefit-ico svg{width:28px;height:28px}
#fertigation.task246 .t246-benefit b{display:block;color:#f2f8fb;font-size:14px}
#fertigation.task246 .t246-benefit span{display:block;color:#afc3ce;font-size:12px;line-height:1.35;margin-top:4px}
#fertigation.task246 .t246-end{display:grid;grid-template-columns:56px minmax(0,1fr) 220px;gap:16px;align-items:center;margin-top:14px;padding-top:13px;border-top:1px solid rgba(45,202,255,.24)}
#fertigation.task246 .t246-end-ico{width:50px;height:50px}
#fertigation.task246 .t246-end-ico svg{width:50px;height:50px}
#fertigation.task246 .t246-end strong{display:block;color:#f4f8fa;font-size:22px;line-height:1.2}
#fertigation.task246 .t246-end strong b{color:#2dd2ff}
#fertigation.task246 .t246-end p{margin:5px 0 0;color:#b7c9d3;font-size:13px}
#fertigation.task246 .t246-mark{text-align:right;color:#7e9aa9;font-size:10px;letter-spacing:.09em;text-transform:uppercase}
#fertigation.task246 .t246-mark b{display:block;color:#2bd2ff;font-size:17px;letter-spacing:0;margin-bottom:4px}
@media(max-width:1240px){#fertigation.task246>.container{width:calc(100% - 40px)!important}#fertigation.task246 .t246-top{grid-template-columns:320px minmax(0,1.05fr) minmax(0,.9fr)}#fertigation.task246 .t246-lead{font-size:15px}#fertigation.task246 .t246-flow-row{grid-template-columns:1fr 24px 1.18fr 24px .9fr 24px 1fr}#fertigation.task246 .t246-arrow{font-size:23px}}
@media(max-width:900px){#fertigation.task246 .t246-top{grid-template-columns:1fr 1fr}.t246-copy{grid-column:1/-1}#fertigation.task246 .t246-lead{max-width:760px}#fertigation.task246 .t246-specs{margin-bottom:4px}#fertigation.task246 .t246-lower{grid-template-columns:1fr}#fertigation.task246 .t246-benefits{grid-template-columns:1fr 1fr;grid-template-rows:auto}#fertigation.task246 .t246-end{grid-template-columns:50px 1fr}#fertigation.task246 .t246-mark{display:none}}
@media(max-width:600px){#fertigation.task246{padding:24px 0 28px!important}#fertigation.task246>.container{width:calc(100% - 28px)!important}#fertigation.task246 .t246-top{grid-template-columns:1fr;gap:12px}#fertigation.task246 h2{font-size:34px}#fertigation.task246 .t246-lead{font-size:14px;margin-top:15px}#fertigation.task246 .t246-specs{gap:18px;margin-top:18px}#fertigation.task246 .t246-spec b{font-size:22px}#fertigation.task246 .t246-flow-row{grid-template-columns:1fr;gap:10px}#fertigation.task246 .t246-arrow{transform:rotate(90deg)}#fertigation.task246 .t246-step{grid-template-columns:44px 1fr}#fertigation.task246 .t246-benefits{grid-template-columns:1fr}#fertigation.task246 .t246-end{grid-template-columns:44px 1fr;gap:10px}#fertigation.task246 .t246-end strong{font-size:18px}}
`;
    document.head.appendChild(s);
  }
  function step(icon,n,title,text){return `<div class="t246-step"><div class="t246-ico">${icon}</div><div><span class="num">${n}</span><strong>${title}</strong><span>${text}</span></div></div>`}
  function render(){
    const section=document.querySelector('#fertigation'); if(!section)return;
    styles(); section.classList.add('task246');
    section.innerHTML=`<div class="container">
      <div class="t246-top">
        <div class="t246-copy"><p class="eyebrow">06 / ФЕРТИГАЦІЯ</p><h2>ПІДЖИВЛЕННЯ<br>СТАЄ ЧАСТИНОЮ<span class="accent">ПОЛИВНОЇ<br>ПРОГРАМИ</span></h2><p class="t246-lead">Маточний розчин готується та підключається відповідно до технології господарства. Далі BB610 WATER може автоматично виконувати передбачене перемішування, рециркуляцію та дозування протягом поливного циклу.</p><div class="t246-specs"><div class="t246-spec"><b>F1</b><span>1 канал<br>фертигації</span></div><div class="t246-spec"><b>F2</b><span>2 канали<br>фертигації</span></div></div></div>
        <figure class="t246-shot recipe"><img src="task24-6-recipe.jpg?v=20260915-1911" alt="BB610 PULSE — редактор рецепта фертигації" loading="eager" decoding="sync"></figure>
        <figure class="t246-shot task"><img src="task24-6-task.jpg?v=20260915-1911" alt="BB610 PULSE — нове завдання з вибором рецепта" loading="eager" decoding="sync"></figure>
      </div>
      <div class="t246-lower"><div class="t246-flow"><div class="t246-flow-title">ЯК ЦЕ ПРАЦЮЄ</div><div class="t246-flow-row">${step(DROP,'01','ПЕРЕДПОЛИВ','Вода · підготовка зони')}<div class="t246-arrow">→</div>${step(FLASK,'02','ЖИВЛЕННЯ','Вода + добрива A/B + контроль pH / EC')}<div class="t246-arrow">→</div>${step(DROP,'03','ПРОМИВКА','Чиста вода')}<div class="t246-arrow">→</div>${step(CHECK,'04','РЕЗУЛЬТАТ','Стабільне живлення та контроль параметрів')}</div></div>
        <div class="t246-benefits"><div class="t246-benefit"><div class="t246-benefit-ico">${GEAR}</div><div><b>ГНУЧКІ СЦЕНАРІЇ</b><span>Власні рецепти під культури та фази розвитку</span></div></div><div class="t246-benefit"><div class="t246-benefit-ico">${BARS}</div><div><b>КОНТРОЛЬ ПАРАМЕТРІВ</b><span>pH, EC та об’єми подачі</span></div></div></div>
      </div>
      <div class="t246-end"><div class="t246-end-ico">${FLASK}</div><div><strong><b>BB610 WATER</b> об’єднує полив і живлення в одну керовану систему.</strong><p>Правильне живлення, у правильний час, у потрібній кількості.</p></div><div class="t246-mark"><b>BB610 WATER</b>Надійний полив. Стабільний результат.</div></div>
    </div>`;
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',render,{once:true}); else render();
})();
