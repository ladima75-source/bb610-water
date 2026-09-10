(() => {
  const D = window.BB610_R09;
  if (!D) return;
  const $ = s => document.querySelector(s);
  const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const set = (s,v) => { const el=$(s); if(el) el.textContent=v; };

  set('[data-hero-eyebrow]', D.hero.eyebrow);
  set('[data-hero-title]', D.hero.title);
  set('[data-hero-lead]', D.hero.lead);
  $('[data-principle]').innerHTML = D.hero.principle.map((x,i)=>`<strong>${esc(x)}</strong>${i<D.hero.principle.length-1?'<i>→</i>':''}`).join('');
  $('[data-process]').innerHTML = D.hero.process.map(x=>`<span>${esc(x)}</span>`).join('');
  $('[data-blocks]').innerHTML = D.hero.blocks.map(block=>`<section class="block"><header class="block-head"><time>${esc(block.time)}</time><strong>${esc(block.label)}</strong></header>${block.rows.map(r=>`<div class="qrow"><span class="n">${r.n}</span><div class="zone"><small>Зона</small><strong>${esc(r.zone)}</strong>${r.detail?`<em>${esc(r.detail)}</em>`:''}</div><div class="recipe"><small>Рецепт</small><strong>${esc(r.recipe)}</strong></div><div class="litres"><small>Задано</small><strong>${esc(r.litres)}</strong></div></div>`).join('')}</section>`).join('');
  set('[data-demo-note]',D.hero.note);
  $('[data-fact]').innerHTML = `<span>${esc(D.hero.fact.zone)} · explanatory execution cue</span><strong>Задано ${esc(D.hero.fact.target)} → Фактично ${esc(D.hero.fact.actual)} ✓</strong>`;

  set('[data-workday-title]',D.workday.title);
  set('[data-before-label]',D.workday.beforeLabel);
  set('[data-after-label]',D.workday.afterLabel);
  $('[data-before]').innerHTML=D.workday.before.map(x=>`<li>${esc(x)}</li>`).join('');
  $('[data-after]').innerHTML=D.workday.after.map(x=>`<li>${esc(x)}</li>`).join('');
  const conclusion=D.workday.conclusion;
  $('[data-conclusion]').innerHTML=esc(conclusion).replace('ВІДХИЛЕННЯ.','<span>ВІДХИЛЕННЯ.</span>');
})();
