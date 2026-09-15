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

  const modes=document.createElement('script');
  modes.src='task24-5-irrigation-modes.js?v=20260915-1657';
  modes.async=false;
  modes.onload=()=>{
    const imgs=document.querySelectorAll('#actual.task245 .task245-shot img');
    if(imgs[0]){
      imgs[0].src='task24-5-volume.webp?v=20260915-1657';
      imgs[0].removeAttribute('srcset');
    }
    if(imgs[1]){
      imgs[1].src='task24-5-time.webp?v=20260915-1657';
      imgs[1].removeAttribute('srcset');
    }
    const fert=document.createElement('script');
    fert.src='task24-6-fertigation.js?v=20260915-2461';
    fert.async=false;
    fert.onload=()=>{
      const polish=document.createElement('script');
      polish.src='task24-6-1-polish.js?v=20260915-2461';
      polish.async=false;
      document.head.appendChild(polish);
    };
    document.head.appendChild(fert);
  };
  document.head.appendChild(modes);
})();