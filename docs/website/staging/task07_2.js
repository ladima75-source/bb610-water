(() => {
  const V = window.BB610_VISUALS;
  const U = window.BB610_UX;
  if (!V || !U) return;
  const $ = s => document.querySelector(s);
  const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  // R07.2 HERO stays explanatory, not SCADA: start time + ordered zone + target volume + configured program.
  const hero = $('[data-hero-schedule]');
  if (hero) {
    hero.innerHTML = V.heroBlocks.map(block => `
      <section class="irrigation-block r072-block is-${esc(block.state)}" aria-label="${esc(block.start)} ${esc(block.label)}">
        <header class="block-head r072-block-head"><time>${esc(block.start)}</time><span>${esc(block.label)}</span></header>
        <ol class="zone-queue r072-zone-queue">
          ${block.queue.map(item => `
            <li class="queue-item r072-queue-item is-${esc(item.state)}">
              <span class="queue-order">${item.order}</span>
              <div class="queue-zone"><strong>${esc(item.zone)}</strong>${item.detail ? `<small>${esc(item.detail)}</small>` : ''}</div>
              <div class="queue-volume"><span>Задано</span><strong>${esc(item.target)}</strong></div>
              <div class="queue-program"><span>Програма</span><strong>${esc(item.program)}</strong></div>
            </li>`).join('')}
        </ol>
      </section>`).join('');
  }

  // Re-render R07.1 zone details so recipe/program changes from centralized R07.2 data are visible.
  let active = V.zones[0]?.id;
  function renderZone() {
    const tabs = $('[data-zone-tabs]');
    const list = $('[data-zone-day]');
    if (!tabs || !list) return;
    tabs.innerHTML = V.zones.map(z => `<button type="button" role="tab" aria-selected="${z.id===active}" class="zone-tab${z.id===active?' selected':''}" data-r072-zone="${esc(z.id)}">${esc(z.name)}</button>`).join('');
    const zone = V.zones.find(z => z.id === active) || V.zones[0];
    $('[data-zone-active-name]').textContent = zone.name;
    $('[data-zone-active-summary]').textContent = `${zone.recipe} · заданий об’єм ${zone.target}`;
    list.innerHTML = `<div class="zone-model-meta"><span>${esc(zone.detail)}</span><strong>ЗОНА → РЕЦЕПТ → ОБ’ЄМ → ВИКОНАННЯ</strong></div>` + zone.blocks.map(b => `
      <article class="zone-block-row is-${esc(b.state)}">
        <div><span>Старт блоку</span><time>${esc(b.start)}</time></div>
        <div><span>Поливний блок</span><strong>${esc(b.block)}</strong></div>
        <div><span>Черга</span><strong>${esc(b.order)}</strong></div>
        <div><span>Рецепт</span><strong>${esc(zone.recipe)}</strong></div>
        <div><span>Задано</span><strong>${esc(b.target)}</strong></div>
        <div><span>Фактично</span><strong>${esc(b.actual)}</strong></div>
      </article>`).join('');
    document.querySelectorAll('[data-r072-zone]').forEach(btn => btn.addEventListener('click', () => { active = btn.dataset.r072Zone; renderZone(); }));
  }
  renderZone();

  // Keep owner-value comparison immediately after HERO even if earlier layers change its source position.
  const heroSection = $('#hero');
  const beforeWith = $('#before-with');
  if (heroSection && beforeWith) heroSection.insertAdjacentElement('afterend', beforeWith);

  // Remaining hard-coded overall-system labels created by the R07 renderer.
  document.querySelectorAll('[data-f2-flow] span').forEach(el => {
    if (el.textContent.trim() === 'BB610 F2') el.textContent = 'BB610 WATER F2';
  });
  document.querySelectorAll('[data-fert-process] small').forEach(el => {
    if (el.textContent.trim() === 'BB610 / HYDRAULIC') el.textContent = 'BB610 WATER / HYDRAULIC';
  });

  const footerVersion = document.querySelector('.site-footer .footer-inner span:last-child');
  if (footerVersion) footerVersion.textContent = 'R07.2 · STAGING / REVIEW · ZONE PROGRAMS';
})();