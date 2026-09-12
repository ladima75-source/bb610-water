import { chromium } from 'playwright';
const base='http://127.0.0.1:4173/docs/website/staging/';
const browser=await chromium.launch({headless:true});
try{
 const page=await browser.newPage({viewport:{width:1440,height:900}});
 await page.goto(base,{waitUntil:'networkidle'});
 const data=await page.evaluate(()=>{
   const img=document.querySelector('.hero-inline-logo img');
   const c=document.createElement('canvas'); c.width=img.naturalWidth; c.height=img.naturalHeight;
   const ctx=c.getContext('2d',{willReadFrequently:true}); ctx.drawImage(img,0,0);
   const d=ctx.getImageData(0,0,c.width,c.height).data;
   let minY=1e9,maxY=-1,minX=1e9,maxX=-1,count=0;
   const x0=Math.max(0,Math.floor(c.width*0.03)), x1=Math.min(c.width,Math.ceil(c.width*0.29));
   for(let y=0;y<c.height;y++) for(let x=x0;x<x1;x++){
     const i=(y*c.width+x)*4, r=d[i],g=d[i+1],b=d[i+2],a=d[i+3];
     if(a>40 && b>120 && b>g*1.15 && b>r*1.2){minY=Math.min(minY,y);maxY=Math.max(maxY,y);minX=Math.min(minX,x);maxX=Math.max(maxX,x);count++;}
   }
   return {w:c.width,h:c.height,x0,x1,minX,maxX,minY,maxY,letterH:maxY>=minY?maxY-minY+1:0,count};
 });
 console.log('BB_LETTER_BBOX',JSON.stringify(data));
} finally {await browser.close();}
