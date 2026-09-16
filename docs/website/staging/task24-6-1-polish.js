(()=>{
  const id='task24-6-1-polish';
  document.getElementById(id)?.remove();

  const s=document.createElement('style');
  s.id=id;
  s.textContent=`
#fertigation.task246{padding:14px 0 14px!important;overflow-x:hidden!important}
#fertigation.task246:after{display:none!important}
#fertigation.task246,#fertigation.task246 *{box-sizing:border-box}
#fertigation.task246>.container{width:min(1548px,calc(100% - 48px))!important;max-width:none!important}
#fertigation.task246 .t246-top{grid-template-columns:minmax(350px,26fr) minmax(0,39fr) minmax(0,33fr)!important;gap:16px!important;align-items:start!important}
#fertigation.task246 .t246-copy{padding-right:18px!important}
#fertigation.task246 .t246-copy .eyebrow{margin:0 0 13px!important}
#fertigation.task246 h2{font-size:clamp(42px,3.45vw,57px)!important;line-height:.98!important}
#fertigation.task246 .t246-lead{font-size:17px!important;line-height:1.46!important;max-width:390px!important;margin-top:20px!important}
#fertigation.task246 .t246-lead:after{margin-top:15px!important;height:2px!important}
#fertigation.task246 .t246-versionline{display:flex!important;align-items:center!important;flex-wrap:wrap!important;gap:7px 10px!important;margin-top:13px!important;color:#c9d6dd!important;font-size:13px!important;line-height:1.25!important}
#fertigation.task246 .t246-versionline b{color:#f7fbfd!important;font-size:14px!important;letter-spacing:.02em!important}
#fertigation.task246 .t246-versionline .sep{color:#2bd2ff!important;opacity:.75!important}
#fertigation.task246 .t246-shot{border-radius:11px!important;box-shadow:none!important;min-width:0!important;max-width:100%!important}
#fertigation.task246 .t246-shot img{display:block!important;width:100%!important;max-width:100%!important;height:auto!important;object-fit:contain!important;filter:none!important;image-rendering:auto!important}
#fertigation.task246 .t246-message{margin:10px 0 9px!important;padding:0 4px 0 calc(26% + 22px)!important;min-height:44px!important;display:flex!important;align-items:center!important;gap:14px!important;border:0!important;background:none!important}
#fertigation.task246 .t246-message:before{content:"";width:34px;height:2px;flex:0 0 34px;background:#2bd2ff;opacity:.85}
#fertigation.task246 .t246-message strong{display:block;color:#f5f8fa;font-size:20px;line-height:1.22;letter-spacing:-.01em}
#fertigation.task246 .t246-message strong b{color:#2bd2ff}
#fertigation.task246 .t246-message p{margin:3px 0 0;color:#b8c8d0;font-size:12.5px;line-height:1.35}
#fertigation.task246 .t246-lower{grid-template-columns:minmax(0,1fr) 300px!important;gap:14px!important;margin-top:0!important;align-items:stretch!important}
#fertigation.task246 .t246-flow{padding:16px 18px 15px!important}
#fertigation.task246 .t246-flow-title{margin-bottom:10px!important}
#fertigation.task246 .t246-flow-row{grid-template-columns:1fr 38px 1.18fr 38px .9fr 38px 1.08fr!important}
#fertigation.task246 .t246-step{grid-template-columns:56px minmax(0,1fr)!important;gap:12px!important;min-width:0!important}
#fertigation.task246 .t246-ico{width:54px!important;height:54px!important}
#fertigation.task246 .t246-ico svg{width:35px!important;height:35px!important}
#fertigation.task246 .t246-step strong{font-size:15px!important}
#fertigation.task246 .t246-step span{font-size:12.5px!important}
#fertigation.task246 .t246-benefit{padding:9px 12px!important}
#fertigation.task246 .t246-end{display:none!important}
@media(max-width:1320px){
  #fertigation.task246>.container{width:calc(100% - 38px)!important}
  #fertigation.task246 .t246-top{grid-template-columns:minmax(310px,26fr) minmax(0,39fr) minmax(0,33fr)!important}
  #fertigation.task246 h2{font-size:41px!important}
  #fertigation.task246 .t246-lead{font-size:15px!important}
  #fertigation.task246 .t246-message{padding-left:calc(26% + 18px)!important}
}
@media(max-width:980px){
  #fertigation.task246 .t246-top{grid-template-columns:1fr 1fr!important}
  #fertigation.task246 .t246-copy{grid-column:1/-1!important}
  #fertigation.task246 .t246-message{padding-left:0!important}
  #fertigation.task246 .t246-lower{grid-template-columns:1fr!important}
}
@media(max-width:600px){
  html,body{max-width:100%;overflow-x:hidden!important}
  #fertigation.task246{padding:22px 0 24px!important}
  #fertigation.task246>.container{width:calc(100% - 32px)!important;max-width:calc(100% - 32px)!important;margin-inline:auto!important;padding-inline:0!important}
  #fertigation.task246 .t246-top{grid-template-columns:minmax(0,1fr)!important;gap:14px!important}
  #fertigation.task246 .t246-copy{padding-right:0!important;min-width:0!important}
  #fertigation.task246 h2{font-size:34px!important;overflow-wrap:anywhere}
  #fertigation.task246 .t246-versionline{font-size:12.5px!important;margin-top:12px!important}
  #fertigation.task246 .t246-message{margin:14px 0 12px!important;padding:0!important;align-items:flex-start!important}
  #fertigation.task246 .t246-message:before{width:24px;flex-basis:24px;margin-top:9px}
  #fertigation.task246 .t246-message strong{font-size:18px}
  #fertigation.task246 .t246-lower{margin-top:0!important;min-width:0!important}
  #fertigation.task246 .t246-flow{padding:16px!important;min-width:0!important}
  #fertigation.task246 .t246-flow-row{grid-template-columns:minmax(0,1fr)!important}
  #fertigation.task246 .t246-benefits{min-width:0!important}
  #fertigation.task246 .t246-benefit{min-width:0!important}
}
`;
  document.head.appendChild(s);

  const section=document.querySelector('#fertigation.task246');
  if(!section)return;

  const eyebrow=section.querySelector('.t246-copy .eyebrow');
  if(eyebrow)eyebrow.textContent='ФЕРТИГАЦІЯ';

  const specs=section.querySelector('.t246-specs');
  if(specs){
    specs.className='t246-versionline';
    specs.innerHTML='<b>F1</b><span>1 канал фертигації</span><span class="sep">·</span><b>F2</b><span>2 канали фертигації</span>';
  }

  const end=section.querySelector('.t246-end');
  const lower=section.querySelector('.t246-lower');
  if(end&&lower){
    const strong=end.querySelector('strong');
    const p=end.querySelector('p');
    const message=document.createElement('div');
    message.className='t246-message';
    message.innerHTML=`<div>${strong?strong.outerHTML:'<strong><b>BB610 WATER</b> об’єднує полив і живлення в одну керовану систему.</strong>'}${p?p.outerHTML:'<p>Правильне живлення, у правильний час, у потрібній кількості.</p>'}</div>`;
    lower.before(message);
    end.remove();
  }

  const imgs=section.querySelectorAll('.t246-shot img');
  if(imgs[0]){imgs[0].src='task24-6-recipe.webp?v=20260916-001';imgs[0].removeAttribute('srcset');}
  if(imgs[1]){imgs[1].src='task24-6-task-hq.webp?v=20260916-001';imgs[1].removeAttribute('srcset');}
})();