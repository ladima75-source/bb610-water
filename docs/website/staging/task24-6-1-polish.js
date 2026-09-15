(()=>{
  const id='task24-6-1-polish';
  document.getElementById(id)?.remove();
  const s=document.createElement('style');
  s.id=id;
  s.textContent=`
#fertigation.task246{padding:32px 0 30px!important}
#fertigation.task246:after{display:none!important}
#fertigation.task246>.container{width:min(1548px,calc(100% - 48px))!important;max-width:none!important}
#fertigation.task246 .t246-top{grid-template-columns:minmax(350px,26fr) minmax(0,39fr) minmax(0,33fr);gap:16px!important;align-items:start!important}
#fertigation.task246 .t246-copy{padding-right:18px!important}
#fertigation.task246 h2{font-size:clamp(42px,3.45vw,57px)!important;line-height:.98!important}
#fertigation.task246 .t246-lead{font-size:17px!important;line-height:1.48!important;max-width:390px!important;margin-top:22px!important}
#fertigation.task246 .t246-specs{margin-top:24px!important}
#fertigation.task246 .t246-shot{border-radius:11px!important;box-shadow:none!important}
#fertigation.task246 .t246-shot img{width:100%!important;height:auto!important;object-fit:contain!important;filter:none!important;image-rendering:auto!important}
#fertigation.task246 .t246-lower{grid-template-columns:minmax(0,1fr) 300px!important;gap:14px!important;margin-top:18px!important}
#fertigation.task246 .t246-flow{padding:18px 20px 17px!important}
#fertigation.task246 .t246-flow-title{margin-bottom:13px!important}
#fertigation.task246 .t246-flow-row{grid-template-columns:1fr 38px 1.18fr 38px .9fr 38px 1.08fr!important}
#fertigation.task246 .t246-step{grid-template-columns:56px minmax(0,1fr)!important;gap:12px!important}
#fertigation.task246 .t246-ico{width:54px!important;height:54px!important}
#fertigation.task246 .t246-ico svg{width:35px!important;height:35px!important}
#fertigation.task246 .t246-step strong{font-size:15px!important}
#fertigation.task246 .t246-step span{font-size:12.5px!important}
#fertigation.task246 .t246-benefit{padding:11px 13px!important}
#fertigation.task246 .t246-end{grid-template-columns:76px minmax(0,1fr) 245px!important;margin-top:16px!important;padding-top:17px!important}
#fertigation.task246 .t246-end strong{font-size:25px!important}
#fertigation.task246 .t246-end p{font-size:14px!important}
@media(max-width:1320px){
 #fertigation.task246>.container{width:calc(100% - 38px)!important}
 #fertigation.task246 .t246-top{grid-template-columns:minmax(310px,26fr) minmax(0,39fr) minmax(0,33fr)!important}
 #fertigation.task246 h2{font-size:41px!important}
 #fertigation.task246 .t246-lead{font-size:15px!important}
}
@media(max-width:980px){
 #fertigation.task246 .t246-top{grid-template-columns:1fr 1fr!important}
 #fertigation.task246 .t246-copy{grid-column:1/-1!important}
 #fertigation.task246 .t246-lower{grid-template-columns:1fr!important}
}
@media(max-width:600px){
 #fertigation.task246>.container{width:calc(100% - 28px)!important}
 #fertigation.task246 .t246-top{grid-template-columns:1fr!important;gap:14px!important}
 #fertigation.task246 h2{font-size:34px!important}
 #fertigation.task246 .t246-lower{margin-top:16px!important}
 #fertigation.task246 .t246-flow-row{grid-template-columns:1fr!important}
 #fertigation.task246 .t246-end{grid-template-columns:52px 1fr!important}
}
`;
  document.head.appendChild(s);
  const imgs=document.querySelectorAll('#fertigation.task246 .t246-shot img');
  if(imgs[0]){imgs[0].src='task24-6-recipe-hq.webp?v=2461';imgs[0].removeAttribute('srcset');}
  if(imgs[1]){imgs[1].src='task24-6-task-hq.webp?v=2461';imgs[1].removeAttribute('srcset');}
})();