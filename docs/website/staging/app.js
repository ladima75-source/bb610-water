(() => {
  const C = window.BB610_CONTENT;
  const D = window.BB610_COMMERCIAL;
  const A = window.BB610_ASSETS;
  if (!C || !D || !A) return;

  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];
  const setText = (s, v) => { const el = $(s); if (el) el.textContent = v; };

  document.title = C.meta.title;
  const md = document.querySelector('meta[name="description"]');
  if (md) md.setAttribute('content', C.meta.description);

  // Navigation + shared CTA
  $('#site-nav').innerHTML = C.navigation.map(i => `<a href="${i.href}">${i.label}</a>`).join('');
  $$('[data-primary-cta]').forEach(el => { el.textContent = C.cta.primary.label; el.href = C.cta.primary.href; });
  setText('[data-secondary-cta]', C.cta.secondary.label);
  setText('[data-contact-cta]', C.cta.contact.label);

  // Hero
  setText('[data-hero-eyebrow]', C.hero.eyebrow);
  setText('[data-hero-title]', C.hero.headline);
  setText('[data-hero-subtitle]', C.hero.subheadline);
  setText('[data-proof-label]', C.hero.proofLabel);
  setText('[data-proof-note]', C.hero.proofNote);
  $('[data-proof-values]').innerHTML = C.hero.proof.map(p => `<div class="proof-row${p.accent ? ' is-accent' : ''}"><span>${p.label}</span><strong>${p.value}</strong></div>`).join('');
  setText('[data-proof-formula]', C.hero.formula);

  // Mechanism
  setText('[data-mechanism-eyebrow]', C.mechanism.eyebrow);
  setText('[data-mechanism-title]', C.mechanism.title);
  setText('[data-mechanism-intro]', C.mechanism.intro);
  $('[data-mechanism-steps]').innerHTML = C.mechanism.steps.map((s, i) => `<article class="mechanism-step"><span class="step-n">${s.n}</span><h3>${s.title}</h3><p>${s.text}</p>${i < C.mechanism.steps.length - 1 ? '<span class="rail-arrow" aria-hidden="true">→</span>' : ''}</article>`).join('');

  // PULS evidence
  setText('[data-puls-eyebrow]', C.puls.eyebrow);
  setText('[data-puls-title]', C.puls.title);
  setText('[data-puls-text]', C.puls.text);
  $('[data-puls-callouts]').innerHTML = C.puls.callouts.map(i => `<li>${i}</li>`).join('');
  const pulsImg = $('[data-puls-image]');
  pulsImg.src = A.puls.desktop.src;
  pulsImg.alt = A.puls.desktop.alt;
  setText('[data-puls-caption]', C.puls.caption);
  setText('[data-proof-needed]', A.proofNeeded.targetVsActual);

  // Owner value
  setText('[data-owner-eyebrow]', C.ownerValue.eyebrow);
  setText('[data-owner-title]', C.ownerValue.title);
  setText('[data-owner-text]', C.ownerValue.text);
  $('[data-owner-items]').innerHTML = C.ownerValue.items.map(([t, x]) => `<article><h3>${t}</h3><p>${x}</p></article>`).join('');
  setText('[data-owner-fit]', C.ownerValue.fit);

  // Architecture
  setText('[data-architecture-eyebrow]', C.architecture.eyebrow);
  setText('[data-architecture-title]', C.architecture.title);
  setText('[data-architecture-intro]', C.architecture.intro);
  setText('[data-boundary]', C.architecture.boundary);
  setText('[data-physical-label]', C.architecture.physicalLabel);
  setText('[data-digital-label]', C.architecture.digitalLabel);
  $('[data-module-flow]').innerHTML = ['CONTROL','HYDRAULIC','ZONE'].map((key, i, arr) => {
    const asset = A.engineering[key];
    return `<article class="module-node"><span class="asset-tag">${asset.label}</span><img src="${asset.src}" alt="${asset.alt}" loading="lazy"><div><strong>${key}</strong><p>${C.architecture.modules[key]}</p></div></article>${i < arr.length - 1 ? '<span class="module-arrow" aria-hidden="true">→</span>' : ''}`;
  }).join('');
  $('[data-digital-flow]').innerHTML = `
    <article class="digital-node primary"><strong>BB610 PULS</strong><p>${C.architecture.software.PULS}</p><span class="branch">└─ BB610 PULS MOBILE</span><small>${C.architecture.software.MOBILE}</small></article>
    <article class="digital-node"><strong>BB610 INTELLIGENCE</strong><p>${C.architecture.software.INTELLIGENCE}</p></article>`;

  // Configurator
  setText('[data-config-eyebrow]', C.configurator.eyebrow);
  setText('[data-config-title]', C.configurator.title);
  setText('[data-config-intro]', C.configurator.intro);
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
    setText('[data-source-state]', combo.status === 'repository-mapped' ? 'Repository pricing source / review data' : (combo.sourceNote || 'Комерційне підтвердження потрібне'));
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
      `Коментар: ${fd.get('note') || ''}`
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