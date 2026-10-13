/* Match price and bullet rows without altering any words or hiding text. */
(()=>{
 const originals=new Map();let frame;
 function align(){
  originals.forEach((value,node)=>node.style.minHeight=value);originals.clear();
  document.querySelectorAll('.pricing-grid').forEach(group=>{
   const rows=[];
   [...group.children].filter(c=>c.getClientRects().length).forEach(card=>{
    let row=rows.find(r=>Math.abs(r.top-card.offsetTop)<5);
    if(!row)rows.push(row={top:card.offsetTop,cards:[]});row.cards.push(card);
   });
   rows.filter(r=>r.cards.length>1).forEach(({cards})=>{
    ['.price','ul>li:nth-child(1)','ul>li:nth-child(2)','ul>li:nth-child(3)'].forEach(selector=>{
     const nodes=cards.map(c=>c.querySelector(':scope>'+selector));
     if(nodes.some(n=>!n))return;
     const height=Math.ceil(Math.max(...nodes.map(n=>n.getBoundingClientRect().height)));
     nodes.forEach(n=>{originals.set(n,n.style.minHeight);n.style.minHeight=height+'px'});
    });
   });
  });
 }
 function schedule(){cancelAnimationFrame(frame);frame=requestAnimationFrame(align)}
 addEventListener('resize',schedule);addEventListener('load',schedule);document.fonts?.ready.then(schedule);
 schedule();
})();
