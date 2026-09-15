(()=>{
  const STYLE_ID='task24-6-fertigation-style';
  const DROP=`<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M32 7c9 13 17 22 17 34a17 17 0 1 1-34 0C15 29 23 20 32 7z"/></svg>`;
  const FLASK=`<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M25 8h14M28 8v17L15 48a6 6 0 0 0 5 8h24a6 6 0 0 0 5-8L36 25V8"/><path d="M21 43h22"/></svg>`;
  const CHECK=`<svg viewBox="0 0 64 64" aria-hidden="true"><path d="m17 33 10 10 21-23"/></svg>`;
  const GEAR=`<svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="9"/><path d="M32 8v7M32 49v7M8 32h7M49 32h7M15 15l5 5M44 44l5 5M49 15l-5 5M20 44l-5 5"/></svg>`;
  const BARS=`<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M14 52V34h9v18M28 52V20h9v32M42 52V12h9v40"/></svg>`;
  const LEAF=`<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M12 49c12-2 25-14 35-35 5 18-2 34-18 39-8 3-14 0-17-4z"/><path d="M15 50c10-12 19-20 30-28"/></svg>`;

  function styles(){
    document.getElementById(STYLE_ID)?.remove();
    const s=document.createElement('style');
    s.id=STYLE_ID;
    s.textContent=`
#fertigation.task246{position:relative;padding:34px 0 34px!important;background:radial-gradient(circle at 83% 12%,rgba(0,151,217,.16),transparent 29%),linear-gradient(180deg,#061827 0%,#04131f 76%,#04111b 100%);overflow:hidden}
#fertigation.task246:after{content:"";position:absolute;right:-2%;bottom:-3%;width:31%;height:44%;background:linear-gradient(90deg,rgba(4,17,27,.98),rgba(4,17,27,.28)),url('task24-6-agro.webp?v=2461') center/cover no-repeat;opacity:.34;pointer-events:none}
#fertigation.task246>.container{position:relative;z-index:1;width:min(1548px,calc(100% - 68px))!important;max-width:none!important;margin-inline:auto!important;padding:0!important}
#fertigation.task246 .t246-top{display:grid;grid-template-columns:minmax(340px,.72fr) minmax(0,1.18fr) minmax(0,1fr);gap:16px;align-items:start}
#fertigation.task246 .t246-copy{padding:4px 14px 0 0}
#fertigation.task246 .t246-copy .eyebrow{margin:0 0 18px;color:#28d2ff;font-size:13px;font-weight:800;letter-spacing:.15em}
#fertigation.task246 h2{margin:0;color:#f7f8fa;font-size:clamp(43px,3.5vw,58px);line-height:.97;letter-spacing:-.035em;font-weight:800}
#fertigation.task246 h2 .accent{color:#28d1ff;display:block}
#fertigation.task246 .t246-lead{margin:24px 0 0;color:#c7d2d9;font-size:18px;line-height:1.48;max-width:390px}
#fertigation.task246 .t246-lead:after{content:"";display:block;width:52px;height:3px;background:#28d2ff;margin-top:22px}
#fertigation.task246 .t246-specs{display:flex;gap:30px;margin-top:26px}
#fertigation.task246 .t246-spec{min-width:125px;padding-right:28px;border-right:1px solid rgba(45,209,255,.5)}
#fertigation.task246 .t246-spec:last-child{border-right:0;padding-right:0}
#fertigation.task246 .t246-spec b{display:block;color:#f7fbfd;font-size:29px;line-height:1}
#fertigation.task246 .t246-spec span{display:block;margin-top:7px;color:#d9e3e8;font-size:16px;line-height:1.3}
#fertigation.task246 .t246-shot{margin:0;border:1px solid rgba(43,202,255,.42);border-radius:12px;overflow:hidden;background:#03131f;box-shadow:0 18px 40px rgba(0,0,0,.18)}
#fertigation.task246 .t246-shot img{display:block;width:100%;height:auto;object-fit:contain;background:#03131f;image-rendering:auto;filter:none!important;opacity:1!important}
#fertigation.task246 .t246-shot.recipe img{aspect-ratio:607/488}
#fertigation.task246 .t246-shot.task img{aspect-ratio:506/488}
#fertigation.task246 .t246-lower{display:grid;grid-template-columns:minmax(0,1fr) 300px;gap:14px;margin-top:22px;align-items:stretch}
#fertigation.task246 .t246-flow{border:1px solid rgba(45,202,255,.38);border-radius:13px;background:rgba(4,22,35,.88);padding:20px 22px 18px}
#fertigation.task246 .t246-flow-title{color:#29d1ff;font-size:14px;font-weight:800;letter-spacing:.12em;margin-bottom:15px}
#fertigation.task246 .t246-flow-row{display:grid;grid-template-columns:1fr 42px 1.16fr 42px .9fr 42px 1.08fr;align-items:center}
#fertigation.task246 .t246-step{display:grid;grid-template-columns:60px minmax(0,1fr);gap:14px;align-items:center;min-width:0}
#fertigation.task246 .t246-ico{width:58px;height:58px;border-radius:50%;display:grid;place-items:center;border:1px solid rgba(45,210,255,.48);background:radial-gradient(circle,rgba(31,166,221,.20),rgba(3,20,31,.82))}
#fertigation.task246 .t246-ico svg,#fertigation.task246 .t246-benefit-ico svg,#fertigation.task246 .t246-end-ico svg{fill:none;stroke:#2dd2ff;stroke-width:2.5;stroke-linecap:round;stroke-linejoin:round}
#fertigation.task246 .t246-ico svg{width:38px;height:38px}
#fertigation.task246 .t246-step .num{color:#2bd2ff;font-size:13px;font-weight:800}
#fertigation.task246 .t246-step strong{display:block;color:#f2f7f9;font-size:15px;margin-top:2px}
#fertigation.task246 .t246-step span{display:block;color:#c4d2d9;font-size:13px;line-height:1.38;margin-top:5px}
#fertigation.task246 .t246-arrow{text-align:center;color:#29d2ff;font-size:32px;font-weight:300}
#fertigation.task246 .t246-benefits{display:grid;grid-template-rows:1fr 1fr;gap:10px}
#fertigation.task246 .t246-benefit{display:grid;grid-template-columns:52px 1fr;gap:12px;align-items:center;padding:13px 14px;border:1px solid rgba(45,202,255,.3);border-radius:12px;background:rgba(4,22,35,.88)}
#fertigation.task246 .t246-benefit-ico{width:48px;height:48px;border-radius:11px;border:1px solid rgba(45,210,255,.34);display:grid;place-items:center}
#fertigation.task246 .t246-benefit-ico svg{width:31px;height:31px}
#fertigation.task246 .t246-benefit b{display:block;color:#f2f8fb;font-size:15px}
#fertigation.task246 .t246-benefit span{display:block;color:#b9cad3;font-size:13px;line-height:1.35;margin-top:4px}
#fertigation.task246 .t246-end{display:grid;grid-template-columns:78px minmax(0,1fr) 270px;gap:18px;align-items:center;margin-top:20px;padding-top:20px;border-top:1px solid rgba(45,202,255,.18)}
#fertigation.task246 .t246-end-ico{width:68px;height:68px}
#fertigation.task246 .t246-end-ico svg{width:68px;height:68px}
#fertigation.task246 .t246-end strong{display:block;color:#f6f8fa;font-size:27px;line-height:1.18;letter-spacing:-.01em}
#fertigation.task246 .t246-end strong b{color:#2dd2ff}
#fertigation.task246 .t246-end p{margin:8px 0 0;color:#c3d0d7;font-size:15px}
#fertigation.task246 .t246-mark{text-align:right;color:#8097a4;font-size:11px;letter-spacing:.09em;text-transform:uppercase}
#fertigation.task246 .t246-mark b{display:block;color:#2bd2ff;font-size:20px;letter-spacing:0;margin-bottom:5px}
@media(max-width:1320px){#fertigation.task246>.container{width:calc(100% - 46px)!important}#fertigation.task246 .t246-top{grid-template-columns:minmax(305px,.72fr) minmax(0,1.15fr) minmax(0,.95fr);gap:14px}#fertigation.task246 h2{font-size:42px}#fertigation.task246 .t246-lead{font-size:15px}#fertigation.task246 .t246-flow-row{grid-template-columns:1fr 28px 1.15fr 28px .9fr 28px 1fr}#fertigation.task246 .t246-arrow{font-size:25px}#fertigation.task246 .t246-step{grid-template-columns:50px 1fr;gap:10px}#fertigation.task246 .t246-ico{width:48px;height:48px}#fertigation.task246 .t246-ico svg{width:31px;height:31px}}
@media(max-width:980px){#fertigation.task246 .t246-top{grid-template-columns:1fr 1fr}.t246-copy{grid-column:1/-1}#fertigation.task246 .t246-lead{max-width:760px}#fertigation.task246 .t246-lower{grid-template-columns:1fr}#fertigation.task246 .t246-benefits{grid-template-columns:1fr 1fr;grid-template-rows:auto}#fertigation.task246 .t246-end{grid-template-columns:60px 1fr}#fertigation.task246 .t246-mark{display:none}}
@media(max-width:600px){#fertigation.task246{padding:24px 0 28px!important}#fertigation.task246:after{display:none}#fertigation.task246>.container{width:calc(100% - 28px)!important}#fertigation.task246 .t246-top{grid-template-columns:1fr;gap:14px}#fertigation.task246 .t246-copy{padding:0}#fertigation.task246 .t246-copy .eyebrow{margin-bottom:12px}#fertigation.task246 h2{font-size:35px;line-height:1}#fertigation.task246 .t246-lead{font-size:14px;margin-top:17px}#fertigation.task246 .t246-specs{gap:18px;margin-top:18px}#fertigation.task246 .t246-spec b{font-size:22px}#fertigation.task246 .t246-spec span{font-size:13px}#fertigation.task246 .t246-shot{border-radius:10px}#fertigation.task246 .t246-lower{margin-top:16px}#fertigation.task246 .t246-flow{padding:16px}#fertigation.task246 .t246-flow-row{grid-template-columns:1fr;gap:11px}#fertigation.task246 .t246-arrow{transform:rotate(90deg);font-size:23px}#fertigation.task246 .t246-step{grid-template-columns:52px 1fr}#fertigation.task246 .t246-benefits{grid-template-columns:1fr}#fertigation.task246 .t246-end{grid-template-columns:52px 1fr;gap:10px;margin-top:17px;padding-top:16px}#fertigation.task246 .t246-end-ico,#fertigation.task246 .t246-end-ico svg{width:48px;height:48px}#fertigation.task246 .t246-end strong{font-size:19px}#fertigation.task246 .t246-end p{font-size:13px}}
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
        <figure class="t246-shot recipe"><img src="task24-6-recipe-hq.webp?v=2461" alt="BB610 PULSE — редактор рецепта фертигації" loading="eager" decoding="sync"></figure>
        <figure class="t246-shot task"><img src="task24-6-task-hq.webp?v=2461" alt="BB610 PULSE — нове завдання з вибором рецепта" loading="eager" decoding="sync"></figure>
      </div>
      <div class="t246-lower"><div class="t246-flow"><div class="t246-flow-title">ЯК ЦЕ ПРАЦЮЄ</div><div class="t246-flow-row">${step(DROP,'01','ПЕРЕДПОЛИВ','Вода · підготовка зони')}<div class="t246-arrow">→</div>${step(FLASK,'02','ЖИВЛЕННЯ','Вода + добрива A/B + контроль pH / EC')}<div class="t246-arrow">→</div>${step(DROP,'03','ПРОМИВКА','Чиста вода')}<div class="t246-arrow">→</div>${step(CHECK,'04','РЕЗУЛЬТАТ','Стабільне живлення та контроль параметрів')}</div></div>
        <div class="t246-benefits"><div class="t246-benefit"><div class="t246-benefit-ico">${GEAR}</div><div><b>ГНУЧКІ СЦЕНАРІЇ</b><span>Власні рецепти під культури та фази розвитку</span></div></div><div class="t246-benefit"><div class="t246-benefit-ico">${BARS}</div><div><b>КОНТРОЛЬ ПАРАМЕТРІВ</b><span>pH, EC та об’єми подачі</span></div></div></div>
      </div>
      <div class="t246-end"><div class="t246-end-ico">${LEAF}</div><div><strong><b>BB610 WATER</b> об’єднує полив і живлення в одну керовану систему.</strong><p>Правильне живлення, у правильний час, у потрібній кількості.</p></div><div class="t246-mark"><b>BB610 WATER</b>Надійний полив. Стабільний результат.</div></div>
    </div>`;
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',render,{once:true}); else render();
})();
