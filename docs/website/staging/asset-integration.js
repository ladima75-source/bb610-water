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
  modes.src='task24-5-irrigation-modes.js?v=20260915-1418';
  modes.async=false;
  document.head.appendChild(modes);
})();