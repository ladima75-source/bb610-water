(() => {
  const C = window.BB610_CONTENT;
  const D = window.BB610_COMMERCIAL;
  const V = window.BB610_VISUALS;
  const U = window.BB610_UX;
  if (!C || !D || !V || !U) return;

  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];
  const setText = (s, v) => { const el = $(s); if (el) el.textContent = v ?? ''; };
  const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  document.title = C.meta.title;
  const md = $('meta[name="description"]'); if (md) md.content = C.meta.description;

  $('#site-nav').innerHTML = C.navigation.map(i => `<a href="${esc(i.href)}">${esc(i.label)}</a>`).join('');
  $$('[data-hero-cta]').forEach(el => { el.textContent = C.cta.heroPrimary.label; el.href = C.cta.heroPrimary.href; });
  $$('[data-configure-cta]').forEach(el => { el.textContent = C.cta.configure.label; el.href = C.cta.configure.href; });

  // HERO + explanatory day schedule
  setText('[data-hero-eyebrow]', C.hero.eyebrow); setText('[data-hero-title]', C.hero.headline); setText('[data-hero-subtitle]', C.hero.subheadline); setText('[data-hero-note]', C.hero.note);
  $('[data-hero-principle]').innerHTML = C.hero.principle.map((x,i,a)=>`<strong>${esc(x)}</strong>${i<a.length-1?'<span aria-hidden="true">→</span>':''}`).join('');
  setText('[data-hero-schedule-label]', U.hero.scheduleLabel); setText('[data-hero-status]', U.hero.status); setText('[data-hero-schedule-note]', U.hero.note);
  $('[data-hero-schedule]').innerHTML = V.heroSchedule.map(r => `<div class="day-row is-${r.state}"><time>${esc(r.time)}</time><strong>${esc(r.zone)}</strong><span>${esc(r.action)}${r.state==='done'?' ✓':''}</span></div>`).join('');

  // R06 schedule copy
  setText('[data-routine-eyebrow]', C.routine.eyebrow); setText('[data-routine-title]', C.routine.title); setText('[data-routine-intro]', C.routine.intro); setText('[data-routine-conclusion]', C.routine.conclusion);
  $('[data-routine-items]').innerHTML = C.routine.items.map(([t,x])=>`<article><h3>${esc(t)}</h3><p>${esc(x)}</p></article>`).join('');

  // Named zones switcher
  setText('[data-zones-eyebrow]', C.zones.eyebrow); setText('[data-zones-title]', C.zones.title); setText('[data-zones-intro]', C.zones.intro); setText('[data-zones-conclusion]', C.zones.conclusion);
  setText('[data-zone-switch-label]', U.zones.label); setText('[data-zone-schedule-label]', U.zones.scheduleLabel); setText('[data-zone-note]', U.zones.note);
  let activeZone = V.zones[0].id;
  function renderZone() {
    $('[data-zone-tabs]').innerHTML = V.zones.map(z=>`<button type="button" role="tab" aria-selected="${z.id===activeZone}" class="zone-tab${z.id===activeZone?' selected':''}" data-zone-demo="${z.id}">${esc(z.name)}</button>`).join('');
    const z = V.zones.find(x=>x.id===activeZone);
    setText('[data-zone-active-name]', z.name); setText('[data-zone-active-summary]', z.summary);
    $('[data-zone-day]').innerHTML = z.schedule.map(([t,x])=>`<div><time>${esc(t)}</time><strong>${esc(x)}</strong></div>`).join('');
    $$('[data-zone-demo]').forEach(b=>b.addEventListener('click',()=>{ activeZone=b.dataset.zoneDemo; renderZone(); }));
  } renderZone();

  // Actual-volume proof
  setText('[data-actual-eyebrow]', C.actual.eyebrow); setText('[data-actual-title]', C.actual.title); setText('[data-actual-intro]', C.actual.intro); setText('[data-actual-line]', C.actual.line);
  setText('[data-actual-progress-label]', U.actual.progressLabel); setText('[data-measure-target]', `${V.actualVolume.target} ${V.actualVolume.unit}`); setText('[data-measure-result]', `${V.actualVolume.result} ✓`);
  $('[data-measure-points]').innerHTML = V.actualVolume.checkpoints.map((n,i)=>`<span class="measure-point${i===V.actualVolume.checkpoints.length-1?' final':''}" style="--p:${Math.min(n/V.actualVolume.actual*100,100)}%"><i></i><b>${n}</b></span>`).join('');
  setText('[data-timer-label]', U.actual.timerLabel); setText('[data-timer-value]', U.actual.timerValue); setText('[data-bb-label]', U.actual.bbLabel); setText('[data-bb-value]', U.actual.bbValue); setText('[data-actual-visual-note]', U.actual.note);

  // Fertigation explanatory process
  setText('[data-fertigation-eyebrow]', C.fertigation.eyebrow); setText('[data-fertigation-title]', C.fertigation.title); setText('[data-fertigation-intro]', C.fertigation.intro);
  setText('[data-fert-process-label]', U.fertigation.processLabel); setText('[data-f2-label]', U.fertigation.f2Label); setText('[data-f2-note]', U.fertigation.f2Note); setText('[data-cycle-note]', U.fertigation.exampleNote);
  $('[data-fert-process]').innerHTML = `<div class="process-node owner"><b>${esc(V.fertigation.stock)}</b><small>${esc(V.fertigation.ownerNote)}</small></div><span>→</span><div class="process-node"><b>${esc(V.fertigation.mixing)}</b><small>BB610 / HYDRAULIC</small></div><span>→</span><div class="process-node"><b>${esc(V.fertigation.dosing)}</b><small>за обраною конфігурацією</small></div>`;
  $('[data-cycle-bars]').innerHTML = V.fertigation.cycle.map(x=>`<div style="--share:${x.share}"><strong>${esc(x.label)}</strong><span>${x.share}%</span></div>`).join('');
  $('[data-f2-flow]').innerHTML = `${V.fertigation.f2.map(x=>`<span>${esc(x)}</span>`).join('<b>+</b>')}<b>→</b><span>BB610 F2</span><b>→</b><span>ПРОГРАМОВАНИЙ ЦИКЛ</span>`;

  // pH / EC distinction
  setText('[data-ph-ec-eyebrow]', C.phEc.eyebrow); setText('[data-ph-ec-title]', C.phEc.title); setText('[data-ph-ec-intro]', C.phEc.intro);
  $('[data-chem-flow]').innerHTML = V.phEc.flow.map((x,i,a)=>`<span>${esc(x)}</span>${i<a.length-1?'<b>→</b>':''}`).join('');
  setText('[data-ph-label]', V.phEc.ph.label); setText('[data-ph-value]', `${V.phEc.ph.actual} / задано ${V.phEc.ph.target}`); setText('[data-ph-role]', V.phEc.ph.role); setText('[data-ph-note]', U.phEc.phNote);
  setText('[data-ec-label]', V.phEc.ec.label); setText('[data-ec-value]', V.phEc.ec.actual); setText('[data-ec-role]', V.phEc.ec.role); setText('[data-ec-note]', U.phEc.ecNote);

  // Normal vs attention
  setText('[data-deviations-eyebrow]', C.deviations.eyebrow); setText('[data-deviations-title]', C.deviations.title); setText('[data-deviations-intro]', C.deviations.intro); setText('[data-state-label]', U.deviations.label); setText('[data-state-conclusion]', U.deviations.conclusion); setText('[data-state-note]', U.deviations.note);
  const stateCard = (kind,s,label)=>`<article class="state-card ${kind}"><span>${esc(label)}</span><h3>${esc(s.zone)}</h3><dl><div><dt>Задано</dt><dd>${esc(s.target)}</dd></div><div><dt>Факт / стан</dt><dd>${esc(s.actual)}</dd></div></dl><strong>${esc(s.state)}</strong></article>`;
  $('[data-state-compare]').innerHTML = stateCard('normal',V.states.normal,U.deviations.normal)+stateCard('attention',V.states.attention,U.deviations.attention);

  // Real proof gates: no arbitrary asset rendered
  setText('[data-puls-ux-eyebrow]', U.puls.eyebrow); setText('[data-puls-ux-title]', U.puls.title); setText('[data-puls-ux-text]', U.puls.text); setText('[data-puls-proof-label]', V.proofStates.puls.label); setText('[data-puls-proof-text]', V.proofStates.puls.text); setText('[data-puls-callout-note]', U.puls.calloutNote);
  $('[data-puls-future-callouts]').innerHTML = U.puls.futureCallouts.map(x=>`<span>${esc(x)}</span>`).join('');

  // Physical system explanatory geometry only
  setText('[data-system-eyebrow]', U.system.eyebrow); setText('[data-system-title]', U.system.title); setText('[data-system-intro]', U.system.intro); setText('[data-system-conclusion]', U.system.conclusion); setText('[data-hardware-proof-label]', V.proofStates.hardware.label); setText('[data-hardware-proof-text]', V.proofStates.hardware.text);
  $('[data-system-rail]').innerHTML = V.architecture.map((x,i,a)=>`<article><span>${esc(x.code)}</span><p>${esc(x.meaning)}</p></article>${i<a.length-1?'<b aria-hidden="true">→</b>':''}`).join('');

  // Installation explanatory diagram
  setText('[data-install-eyebrow]', U.installation.eyebrow); setText('[data-install-title]', U.installation.title); setText('[data-install-intro]', U.installation.intro); setText('[data-install-proof-label]', V.proofStates.installation.label); setText('[data-install-proof-text]', V.proofStates.installation.text);
  $('[data-install-steps]').innerHTML = V.installation.map((x,i,a)=>`<span>${esc(x)}</span>${i<a.length-1?'<b>→</b>':''}`).join('');
  $('[data-install-facts]').innerHTML = U.installation.facts.map(x=>`<li>${esc(x)}</li>`).join('');

  // Guided configuration -> exact frozen version + zone + commercial.js price
  setText('[data-guide-eyebrow]', U.configurator.eyebrow); setText('[data-guide-title]', U.configurator.title); setText('[data-config-intro]', C.configurator.intro); setText('[data-guide-feeding]', U.configurator.feeding); setText('[data-guide-ph]', U.configurator.ph); setText('[data-guide-ec]', U.configurator.ec); setText('[data-guide-zones]', U.configurator.zones); setText('[data-guide-hmi]', U.configurator.hmi); setText('[data-guide-technical]', U.configurator.technical); setText('[data-config-disclaimer]', C.configurator.disclaimer); setText('[data-discuss-cta]', U.configurator.discuss);
  let config = { feeding:'one', ph:true, ec:true, zone:'Z8(12)', hmi:false };
  const resolveVersion = () => {
    if (config.feeding==='none') return 'I';
    const family = config.feeding==='two' ? 'F2' : 'F1';
    if (config.ec) return `${family}-PE`;
    if (config.ph) return `${family}-P`;
    return family;
  };
  const syncFromVersion = id => {
    if (id==='I') Object.assign(config,{feeding:'none',ph:false,ec:false});
    else { config.feeding=id.startsWith('F2')?'two':'one'; config.ec=id.endsWith('-PE'); config.ph=id.endsWith('-P')||config.ec; }
  };
  const guideButtons = (items,current,attr)=>items.map(x=>`<button type="button" class="guide-choice${x.value===current?' selected':''}" data-${attr}="${esc(x.value)}"><strong>${esc(x.label)}</strong>${x.note?`<small>${esc(x.note)}</small>`:''}</button>`).join('');
  function renderConfig(){
    $('[data-feeding-options]').innerHTML = guideButtons(V.guided.feeding,config.feeding,'feeding');
    $('[data-ph-options]').innerHTML = guideButtons(V.guided.yesNo,config.ph?'yes':'no','ph');
    $('[data-ec-options]').innerHTML = guideButtons(V.guided.yesNo,config.ec?'yes':'no','ec');
    $('[data-guide-zone-options]').innerHTML = D.zones.map(z=>`<button type="button" class="guide-choice${z.id===config.zone?' selected':''}" data-gzone="${esc(z.id)}"><strong>${esc(z.label)}</strong><small>${esc(z.description)}</small></button>`).join('');
    $('#ph-field').classList.toggle('is-disabled',config.feeding==='none'); $('#ec-field').classList.toggle('is-disabled',config.feeding==='none');
    $('#hmi-toggle').checked=config.hmi;
    const versionId=resolveVersion(), version=D.versions.find(v=>v.id===versionId), zone=D.zones.find(z=>z.id===config.zone), combo=D.combinations[`${versionId}|${config.zone}`]||{};
    setText('[data-result-code]', `BB610 WATER ${versionId} / ${config.zone}`); setText('[data-result-description]', `${zone.baseZones} зон зараз, розширення до ${zone.maxZones}. ${version.description}.`);
    $('[data-result-capabilities]').innerHTML = version.features.map(x=>`<span>${esc(x)}</span>`).join('');
    const price=config.hmi?combo.withHmi:combo.noHmi; setText('[data-price-mode]', config.hmi?C.configurator.priceWithHmi:C.configurator.priceNoHmi); setText('[data-price-value]', price==null?C.configurator.priceUnknown:`${price} ${C.configurator.priceUnit}`); setText('[data-source-state]', combo.status==='repository-mapped'?'Поточні review-дані commercial.js':(combo.sourceNote||'Комерційне підтвердження потрібне'));
    setText('[data-selected-context]', `Поточний вибір: ${versionId} / ${config.zone}${config.hmi?' + HMI':''}`);
    $('[data-version-options]').innerHTML = D.versions.map(v=>`<button type="button" class="choice${v.id===versionId?' selected':''}" data-version="${v.id}"><span>${esc(v.label)}</span><small>${esc(v.description)}</small></button>`).join('');
    $$('[data-feeding]').forEach(b=>b.onclick=()=>{config.feeding=b.dataset.feeding;if(config.feeding==='none'){config.ph=false;config.ec=false;}renderConfig();});
    $$('[data-ph]').forEach(b=>b.onclick=()=>{if(config.feeding==='none')return;config.ph=b.dataset.ph==='yes';if(!config.ph)config.ec=false;renderConfig();});
    $$('[data-ec]').forEach(b=>b.onclick=()=>{if(config.feeding==='none')return;config.ec=b.dataset.ec==='yes';if(config.ec)config.ph=true;renderConfig();});
    $$('[data-gzone]').forEach(b=>b.onclick=()=>{config.zone=b.dataset.gzone;renderConfig();});
    $$('[data-version]').forEach(b=>b.onclick=()=>{syncFromVersion(b.dataset.version);renderConfig();});
  }
  $('#hmi-toggle').addEventListener('change',e=>{config.hmi=e.target.checked;renderConfig();}); renderConfig();

  // Before / with BB610
  setText('[data-before-eyebrow]', U.beforeWith.eyebrow); setText('[data-before-title]', U.beforeWith.title); setText('[data-owner-impact-intro]', C.ownerImpact.intro); setText('[data-before-label]', U.beforeWith.before); setText('[data-with-label]', U.beforeWith.with); setText('[data-before-conclusion]', U.beforeWith.conclusion);
  $('[data-before-list]').innerHTML = V.beforeWith.before.map(x=>`<li>${esc(x)}</li>`).join(''); $('[data-with-list]').innerHTML = V.beforeWith.with.map(x=>`<li>${esc(x)}</li>`).join('');

  // Consultative final CTA
  setText('[data-contact-ux-eyebrow]', U.contact.eyebrow); setText('[data-contact-ux-title]', U.contact.title); setText('[data-contact-ux-text]', U.contact.text);
  setText('[data-field-name]', C.contact.fields.name); setText('[data-field-contact]', C.contact.fields.contact); setText('[data-field-object]', C.contact.fields.object); setText('[data-field-zones]', C.contact.fields.zones); setText('[data-field-note]', C.contact.fields.note); setText('[data-submit-label]', C.contact.submit); setText('[data-contact-note]', C.contact.note); setText('[data-footer-line]', C.footer.line);
  $('#contact-form').addEventListener('submit',e=>{e.preventDefault();const fd=new FormData(e.currentTarget),version=resolveVersion();$('#request-text').textContent=['BB610 WATER — staging lead',`Конфігурація: ${version} / ${config.zone}${config.hmi?' + HMI':''}`,`Ім’я: ${fd.get('name')||''}`,`Контакт: ${fd.get('contact')||''}`,`Об’єкт / культура: ${fd.get('object')||''}`,`Орієнтовно зон: ${fd.get('zones')||''}`,`Коментар: ${fd.get('note')||''}`].join('\n');$('#request-output').hidden=false;});
  $('#copy-request').addEventListener('click',async()=>{const b=$('#copy-request');try{await navigator.clipboard.writeText($('#request-text').textContent);b.textContent='Скопійовано';setTimeout(()=>b.textContent='Копіювати',1400);}catch{b.textContent='Виділіть текст нижче';}});

  // Mobile navigation
  const toggle=$('.menu-toggle'); toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')==='true';toggle.setAttribute('aria-expanded',String(!open));$('#site-nav').classList.toggle('open',!open);}); $('#site-nav').addEventListener('click',e=>{if(e.target.matches('a')){toggle.setAttribute('aria-expanded','false');$('#site-nav').classList.remove('open');}});
})();