import { chromium } from 'playwright';
const base='http://127.0.0.1:4173/docs/website/staging/';
const browser=await chromium.launch({headless:true});
try{
 const page=await browser.newPage({viewport:{width:1440,height:900}});
 await page.goto(base,{waitUntil:'networkidle'});
 const data=await page.evaluate(async()=>{
   const img=document.querySelector('.hero-inline-logo img');
   const c=document.createElement('canvas'); c.width=img.naturalWidth; c.height=img.naturalHeight;
   const ctx=c.getContext('2d',{willReadFrequently:true}); ctx.drawImage(img,0,0);
   const d=ctx.getImageData(0,0,c.width,c.height).data;
   let minY=1e9,maxY=-1,minX=1e9,maxX=-1,count=0;
   // Isolate the blue BB letter area on the left; exclude the green leaf and cyan WATER/drop.
   for(let y=0;y<c.height;y++) for(let x=120;x<520;x++){
     const i=(y*c.width+x)*4, r=d[i],g=d[i+1],b=d[i+2],a=d[i+3];
     if(a>40 && b>120 && b>g*1.18 && b>r*1.25){minY=Math.min(minY,y);maxY=Math.max(maxY,y);minX=Math.min(minX,x);maxX=Math.max(maxX,x);count++;}
   }
   return {w:c.width,h:c.height,minX,maxX,minY,maxY,letterH:maxY-minY+1,count};
 });
 console.log('BB_LETTER_BBOX',JSON.stringify(data));
} finally {await browser.close();}
