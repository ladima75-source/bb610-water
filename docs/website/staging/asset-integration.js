(()=>{
  const x=new XMLHttpRequest();
  x.open('GET','asset-integration-base.js',false);
  x.send(null);
  if(x.status>=200&&x.status<300)(0,eval)(x.responseText);

  const task=document.createElement('script');
  task.src='task24-3-product-modules.js?v=20260914-2444';
  task.async=false;
  document.head.appendChild(task);

  const how=document.createElement('script');
  how.src='task24-4-how-it-works.js?v=20260914-2450';
  how.async=false;
  document.head.appendChild(how);

  const patchPuls=()=>{
    const imgs=document.querySelectorAll('#actual.task245 .task245-shot img');
    if(imgs[0]&&window.TASK245_VOL){
      imgs[0].src=window.TASK245_VOL;
      imgs[0].removeAttribute('srcset');
    }
    if(imgs[1]&&window.TASK245_TIME){
      imgs[1].src=window.TASK245_TIME;
      imgs[1].removeAttribute('srcset');
    }
  };

  const vol=document.createElement('script');
  vol.src='task24-5-volume-data.js?v=20260915-0955';
  vol.async=false;
  vol.onload=()=>{
    const time=document.createElement('script');
    time.src='task24-5-time-data.js?v=20260915-0955';
    time.async=false;
    time.onload=()=>{
      const modes=document.createElement('script');
      modes.src='task24-5-irrigation-modes.js?v=20260915-0955';
      modes.async=false;
      modes.onload=()=>{
        patchPuls();
        requestAnimationFrame(()=>requestAnimationFrame(patchPuls));
        setTimeout(patchPuls,80);
        setTimeout(patchPuls,300);
      };
      document.head.appendChild(modes);
    };
    document.head.appendChild(time);
  };
  document.head.appendChild(vol);
})();