(() => {
  const V = window.BB610_VISUALS;
  const U = window.BB610_UX;
  if (!V || !U) return;
  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];
  const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const setText = (s, v) => { const el = $(s); if (el) el.textContent = v ?? ''; };

  // R07.1: time starts an irrigation block; zones execute sequentially by target volume.
  setText('[data-hero-schedule-label]', U.hero.scheduleLabel);
  setText('[data-hero-status]', U.hero.status);
  setText('[data-hero-schedule-note]', U.hero.note);
  const hero = $('[data-hero-schedule]');
  if (hero) hero.innerHTML = V.heroBlocks.map(block => `
    <section class="irrigation-block is-${esc(block.state)}" aria-label="${esc(block.label)} старт ${esc(block.start)}">
      <header class="block-head"><span>${esc(block.label)}</span><time>${esc(block.start)}</time></header>
      <div class="block-logic"><span>СТАРТ БЛОКУ</span><b>→</b><span>ЧЕРГА ЗОН</span><b>→</b><span>ЗАДАНИЙ ОБ’ЄМ</span><b>→</b><span>ФАКТИЧНЕ ВИКОНАННЯ</span></div>
      <ol class="zone-queue">
        ${block.queue.map(item => `<li class="queue-item is-${esc(item.state)}"><span class="queue-order">${item.order}</span><div class="queue-zone"><strong>${esc(item.zone)}</strong>${item.detail?`<small>${esc(item.detail)}</small>`:''}</div><div class="queue-volume"><span>Задано</span><strong>${esc(item.target)}</strong></div><div class="queue-actual"><span>Фактично</span><strong>${esc(item.actual)}</strong></div></li>`).join('')}
      </ol>
    </section>`).join('');

  if (U.routineCorrection) {
    setText('[data-routine-intro]', U.routineCorrection.intro);
    setText('[data-routine-conclusion]', U.routineCorrection.conclusion);
  }

  // Replace the R07 zone explorer with block-aware zone examples.
  setText('[data-zone-switch-label]', U.zones.label);
  setText('[data-zone-schedule-label]', U.zones.scheduleLabel);
  setText('[data-zone-note]', U.zones.note);
  let active = V.zones[0]?.id;
  function renderZoneModel() {
    const tabs = $('[data-zone-tabs]');
    const list = $('[data-zone-day]');
    if (!tabs || !list) return;
    tabs.innerHTML = V.zones.map(z => `<button type="button" role="tab" aria-selected="${z.id===active}" class="zone-tab${z.id===active?' selected':''}" data-r071-zone="${esc(z.id)}">${esc(z.name)}</button>`).join('');
    const zone = V.zones.find(z => z.id === active) || V.zones[0];
    setText('[data-zone-active-name]', zone.name);
    setText('[data-zone-active-summary]', `${zone.recipe} · заданий об’єм ${zone.target}`);
    list.innerHTML = `<div class="zone-model-meta"><span>${esc(zone.detail)}</span><strong>ЗОНА → РЕЦЕПТ → ОБ’ЄМ → ВИКОНАННЯ</strong></div>` + zone.blocks.map(b => `
      <article class="zone-block-row is-${esc(b.state)}">
        <div><span>Старт блоку</span><time>${esc(b.start)}</time></div>
        <div><span>Поливний блок</span><strong>${esc(b.block)}</strong></div>
        <div><span>Черга</span><strong>${esc(b.order)}</strong></div>
        <div><span>Задано</span><strong>${esc(b.target)}</strong></div>
        <div><span>Фактично</span><strong>${esc(b.actual)}</strong></div>
      </article>`).join('');
    $$('[data-r071-zone]').forEach(btn => btn.addEventListener('click', () => { active = btn.dataset.r071Zone; renderZoneModel(); }));
  }
  renderZoneModel();

  const footerVersion = document.querySelector('.site-footer .footer-inner span:last-child');
  if (footerVersion) footerVersion.textContent = 'R07.1 · STAGING / REVIEW · IRRIGATION BLOCK MODEL';
})();