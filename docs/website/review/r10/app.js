(() => {
  const D = window.R10_DATA;
  if (!D) return;
  const $ = s => document.querySelector(s);
  const set = (s,v) => { const el=$(s); if(el) el.textContent=v; };
  set('[data-hero-title]', D.hero.title);
  set('[data-hero-lead]', D.hero.lead);
  set('[data-hero-proofline]', D.hero.proofLine);
  set('[data-hero-cta]', D.hero.cta);
  set('[data-proof-target]', D.hero.proof.target);
  set('[data-proof-actual]', D.hero.proof.actual);
  set('[data-workday-title]', D.workday.title);
  $('[data-now]').innerHTML = D.workday.now.map(x=>`<li>${x}</li>`).join('');
  $('[data-with]').innerHTML = D.workday.withWater.map(x=>`<li>${x}</li>`).join('');
  set('[data-conclusion]', D.workday.conclusion);
  set('[data-zones-title]', D.zones.title);
  set('[data-zones-intro]', D.zones.intro);
  const cards = $('[data-zone-cards]');
  let active = D.zones.examples[0].id;
  function renderZones(){
    cards.innerHTML = D.zones.examples.map(z=>`<button class="zone-pill${z.id===active?' is-active':''}" data-zone="${z.id}" type="button"><strong>${z.name}</strong><span>${z.volume}</span><small>${z.recipe}${z.detail?` · ${z.detail}`:''}</small></button>`).join('');
    document.querySelectorAll('[data-zone]').forEach(btn=>btn.addEventListener('click',()=>{active=btn.dataset.zone;renderZones();}));
  }
  renderZones();
  $('[data-queue]').innerHTML = D.zones.block.map(i=>`<li><span>${i.order}</span><strong>${i.zone}</strong><b>${i.volume}</b></li>`).join('');
  set('[data-zone-note]', D.zones.note);
})();