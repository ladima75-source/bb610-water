(() => {
  const C = window.BB610_CONTENT;
  const D = window.BB610_COMMERCIAL;
  const A = window.BB610_ASSETS;
  if (!C || !D || !A) return;

  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];
  const setText = (s, v) => { const el = $(s); if (el) el.textContent = v ?? ''; };
  const cards = (items) => items.map(([t, x]) => `<article><h3>${t}</h3><p>${x}</p></article>`).join('');

  document.title = C.meta.title;
  const md = document.querySelector('meta[name="description"]');
  if (md) md.setAttribute('content', C.meta.description);

  // Navigation + CTA
  $('#site-nav').innerHTML = C.navigation.map(i => `<a href="${i.href}">${i.label}</a>`).join('');
  $$('[data-hero-cta]').forEach(el => { el.textContent = C.cta.heroPrimary.label; el.href = C.cta.heroPrimary.href; });
  $$('[data-configure-cta]').forEach(el => { el.textContent = C.cta.configure.label; el.href = C.cta.configure.href; });
  $$('[data-contact-cta]').forEach(el => { el.textContent = C.cta.contact.label; el.href = C.cta.contact.href; });

  // Screen 1 — Hero
  setText('[data-hero-eyebrow]', C.hero.eyebrow);
  setText('[data-hero-title]', C.hero.headline);
  setText('[data-hero-subtitle]', C.hero.subheadline);
  setText('[data-hero-note]', C.hero.note);
  $('[data-hero-principle]').innerHTML = C.hero.principle.map((x, i, arr) => `<strong>${x}</strong>${i < arr.length - 1 ? '<span aria-hidden="true">→</span>' : ''}`).join('');

  // Screen 2 — Routine
  setText('[data-routine-eyebrow]', C.routine.eyebrow);
  setText('[data-routine-title]', C.routine.title);
  setText('[data-routine-intro]', C.routine.intro);
  $('[data-routine-items]').innerHTML = cards(C.routine.items);
  setText('[data-routine-conclusion]', C.routine.conclusion);

  // Screen 3 — Zones
  setText('[data-zones-eyebrow]', C.zones.eyebrow);
  setText('[data-zones-title]', C.zones.title);
  setText('[data-zones-intro]', C.zones.intro);
  setText('[data-zones-demo-label]', C.zones.demoLabel);
  $('[data-zone-examples]').innerHTML = C.zones.demoZones.map(z => `<article><h3>${z.name}</h3><p>${z.note}</p></article>`).join('');
  setText('[data-zones-conclusion]', C.zones.conclusion);
  setText('[data-zones-boundary]', C.zones.boundary);

  // Screen 4 — Actual result
  setText('[data-actual-eyebrow]', C.actual.eyebrow);
  setText('[data-actual-title]', C.actual.title);
  setText('[data-actual-intro]', C.actual.intro);
  $('[data-actual-compare]').innerHTML = cards(C.actual.compare);
  setText('[data-proof-label]', C.actual.proofLabel);
  setText('[data-proof-note]', C.actual.proofNote);
  $('[data-proof-values]').innerHTML = C.actual.proof.map(p => `<div class="proof-row${p.accent ? ' is-accent' : ''}"><span>${p.label}</span><strong>${p.value}</strong></div>`).join('');
  setText('[data-actual-line]', C.actual.line);
  setText('[data-actual-boundary]', C.actual.boundary);

  // Screen 5 — Deviations
  setText('[data-deviations-eyebrow]', C.deviations.eyebrow);
  setText('[data-deviations-title]', C.deviations.title);
  setText('[data-deviations-intro]', C.deviations.intro);
  $('[data-deviation-items]').innerHTML = cards(C.deviations.items);
  setText('[data-deviation-protection]', C.deviations.protection);

  // Screen 6 — Fertigation
  setText('[data-fertigation-eyebrow]', C.fertigation.eyebrow);
  setText('[data-fertigation-title]', C.fertigation.title);
  setText('[data-fertigation-intro]', C.fertigation.intro);
  setText('[data-cycle-label]', C.fertigation.cycleLabel);
  $('[data-fertigation-cycle]').innerHTML = C.fertigation.cycle.map((x, i, arr) => `<strong>${x}</strong>${i < arr.length - 1 ? '<span aria-hidden="true">→</span>' : ''}`).join('');
  setText('[data-cycle-example]', C.fertigation.cycleExample);
  setText('[data-fertigation-mixing]', C.fertigation.mixing);
  setText('[data-fertigation-conclusion]', C.fertigation.conclusion);

  // Screen 7 — PULS. Existing staging image is retained unchanged as a placeholder only.
  setText('[data-puls-eyebrow]', C.puls.eyebrow);
  setText('[data-puls-title]', C.puls.title);
  setText('[data-puls-text]', C.puls.text);
  const pulsImg = $('[data-puls-image]');
  pulsImg.src = A.puls.desktop.src;
  pulsImg.alt = A.puls.desktop.alt;
  setText('[data-puls-caption]', C.puls.caption);
  setText('[data-proof-needed]', C.puls.proofNeeded);

  // Supporting system/installation block. Existing visuals retained unchanged as placeholders.
  setText('[data-architecture-eyebrow]', C.architecture.eyebrow);
  setText('[data-architecture-title]', C.architecture.title);
  setText('[data-architecture-intro]', C.architecture.intro);
  setText('[data-boundary]', C.architecture.boundary);
  setText('[data-physical-label]', C.architecture.physicalLabel);
  setText('[data-digital-label]', C.architecture.digitalLabel);
  setText('[data-architecture-note]', C.architecture.note);
  $('[data-module-flow]').innerHTML = ['CONTROL','HYDRAULIC','ZONE'].map((key, i, arr) => {
    const asset = A.engineering[key];
    return `<article class="module-node"><span class="asset-tag">TEMP PLACEHOLDER</span><img src="${asset.src}" alt="${asset.alt}" loading="lazy"><div><strong>${key}</strong><p>${C.architecture.modules[key]}</p></div></article>${i < arr.length - 1 ? '<span class="module-arrow" aria-hidden="true">→</span>' : ''}`;
  }).join('');
  $('[data-digital-flow]').innerHTML = `
    <article class="digital-node primary"><strong>BB610 PULS</strong><p>${C.architecture.software.PULS}</p><span class="branch">└─ BB610 PULS MOBILE</span><small>${C.architecture.software.MOBILE}</small></article>
    <article class="digital-node"><strong>BB610 INTELLIGENCE</strong><p>${C.architecture.software.INTELLIGENCE}</p></article>`;

  // Screen 8 — Configuration / price
  setText('[data-config-eyebrow]', C.configurator.eyebrow);
  setText('[data-config-title]', C.configurator.title);
  setText('[data-config-intro]', C.configurator.intro);
  $('[data-customer-questions]').innerHTML = C.configurator.customerQuestions.map(q => `<li>${q}</li>`).join('');
  setText('[data-version-label]', C.configurator.versionLabel);
  setText('[data-zone-label]', C.configurator.zoneLabel);
  setText('[data-hmi-label]', C.configurator.hmiLabel);
  setText('[data-result-label]', C.configurator.resultLabel);
  setText('[data-config-disclaimer]', C.configurator.disclaimer);

  let state = { version: 'F1-PE', zone: 'Z8(12)', hmi: false };

  const renderChoices = () => {
    $('[data-version-options]').innerHTML = D.versions.map(v => `<button type="button" class="choice${state.version === v.id ? ' selected' : ''}" data-version="${v.id}" aria-pressed="${state.version === v.id}"><span>${v.label}</span><small>${v.description}</small></button>`).join('');
    $('[data-zone-options]').innerHTML = D.zones.map(z => `<button type="button" class="choice${state.zone === z.id ? ' selected' : ''}" data-zone="${z.id}" aria-pressed="${state.zone === z.id}"><span>${z.label}</span><small>${z.description}</small></button>`).join('');
    $('#hmi-toggle').checked = state.hmi;
    $$('[data-version]').forEach(b => b.addEventListener('click', () => { state.version = b.dataset.version; renderChoices(); renderResult(); }));
    $$('[data-zone]').forEach(b => b.addEventListener('click', () => { state.zone = b.dataset.zone; renderChoices(); renderResult(); }));
  };

  const renderResult = () => {
    const version = D.versions.find(v => v.id === state.version);
    const combo = D.combinations[`${state.version}|${state.zone}`] || { noHmi: null, withHmi: null, status: 'missing' };
    const price = state.hmi ? combo.withHmi : combo.noHmi;
    setText('[data-result-code]', `${state.version} / ${state.zone}`);
    setText('[data-result-description]', version.description);
    setText('[data-price-mode]', state.hmi ? C.configurator.priceWithHmi : C.configurator.priceNoHmi);
    setText('[data-price-value]', price == null ? C.configurator.priceUnknown : `${price} ${C.configurator.priceUnit}`);
    setText('[data-source-state]', combo.status === 'repository-mapped' ? 'Поточні review-дані commercial layer' : (combo.sourceNote || 'Комерційне підтвердження потрібне'));
    setText('[data-selected-context]', `Поточний вибір зі staging: ${state.version} / ${state.zone}${state.hmi ? ' + HMI' : ''}`);
  };

  $('#hmi-toggle').addEventListener('change', e => { state.hmi = e.target.checked; renderResult(); });
  renderChoices();
  renderResult();

  // Contact
  setText('[data-contact-eyebrow]', C.contact.eyebrow);
  setText('[data-contact-title]', C.contact.title);
  setText('[data-contact-text]', C.contact.text);
  setText('[data-field-name]', C.contact.fields.name);
  setText('[data-field-contact]', C.contact.fields.contact);
  setText('[data-field-object]', C.contact.fields.object);
  setText('[data-field-zones]', C.contact.fields.zones);
  setText('[data-field-note]', C.contact.fields.note);
  setText('[data-submit-label]', C.contact.submit);
  setText('[data-contact-note]', C.contact.note);
  setText('[data-footer-line]', C.footer.line);
  setText('[data-footer-note]', C.footer.note);

  $('#contact-form').addEventListener('submit', e => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const lines = [
      'BB610 WATER — staging lead',
      `Конфігурація: ${state.version} / ${state.zone}${state.hmi ? ' + HMI' : ''}`,
      `Ім’я: ${fd.get('name') || ''}`,
      `Контакт: ${fd.get('contact') || ''}`,
      `Об’єкт / культура: ${fd.get('object') || ''}`,
      `Орієнтовно зон: ${fd.get('zones') || ''}`,
      `Полив / підживлення зараз: ${fd.get('note') || ''}`
    ];
    $('#request-text').textContent = lines.join('\n');
    $('#request-output').hidden = false;
  });

  $('#copy-request').addEventListener('click', async () => {
    const btn = $('#copy-request');
    try {
      await navigator.clipboard.writeText($('#request-text').textContent);
      btn.textContent = 'Скопійовано';
      setTimeout(() => btn.textContent = 'Копіювати', 1400);
    } catch {
      btn.textContent = 'Виділіть текст нижче';
    }
  });

  // Mobile nav
  const toggle = $('.menu-toggle');
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    $('#site-nav').classList.toggle('open', !open);
  });
  $('#site-nav').addEventListener('click', e => {
    if (e.target.matches('a')) { toggle.setAttribute('aria-expanded', 'false'); $('#site-nav').classList.remove('open'); }
  });
})();