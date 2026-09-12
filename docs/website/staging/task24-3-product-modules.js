(()=>{
  const render=()=>{
    const section=document.querySelector('#architecture');
    if(!section)return;
    section.setAttribute('aria-labelledby','architecture24-title');
    section.innerHTML=`<div class="architecture24-shell">
      <header class="architecture24-head">
        <h2 id="architecture24-title">З ЧОГО СКЛАДАЄТЬСЯ BB610 WATER</h2>
        <p class="architecture24-subhead">Одна система — три фізичні модулі та програмне керування.</p>
        <p class="architecture24-intro">BB610 WATER — це модульна система автоматичного поливу та фертигації. Основні функції розділені між трьома фізичними модулями: CONTROL, HYDRAULIC та ZONE.</p>
      </header>
      <div class="architecture24-modules">
        <article class="architecture24-module" data-module="CONTROL">
          <figure><img src="assets/промышленный_контроллер_bb610_water.png" alt="Візуалізація модуля CONTROL BB610 WATER" width="240" height="180" loading="eager" decoding="async"><figcaption>Візуалізація модуля · не технічна схема серійного виробу</figcaption></figure>
          <span class="architecture24-code">CONTROL</span>
          <h3>Модуль керування системою.</h3>
          <p>Відповідає за логіку роботи, запуск поливу, керування фертигацією, обробку сигналів датчиків і взаємодію з програмним забезпеченням.</p>
        </article>
        <article class="architecture24-module" data-module="HYDRAULIC">
          <figure><img src="assets/промышленный_блок_гидравлического_фертигационного.png" alt="Візуалізація модуля HYDRAULIC BB610 WATER" width="120" height="90" loading="eager" decoding="async"><figcaption>Візуалізація модуля · не технічна схема серійного виробу</figcaption></figure>
          <span class="architecture24-code">HYDRAULIC</span>
          <h3>Гідравлічний модуль поливу та фертигації.</h3>
          <p>Виконує подачу води, дозування добрив і, у відповідних комплектаціях, корекцію pH та контроль робочих параметрів.</p>
        </article>
        <article class="architecture24-module" data-module="ZONE">
          <figure><img src="assets/промышленный_коллектор_управления_поливом.png" alt="Візуалізація модуля ZONE BB610 WATER" width="120" height="90" loading="eager" decoding="async"><figcaption>Візуалізація модуля · не технічна схема серійного виробу</figcaption></figure>
          <span class="architecture24-code">ZONE</span>
          <h3>Модуль керування зонами поливу.</h3>
          <p>Розподіляє подачу води між окремими зонами. Один вихід — одна зона. Конфігурації: Z4 / Z8 / Z12.</p>
        </article>
      </div>
      <div class="architecture24-software" aria-label="Програмне керування BB610 WATER">
        <p><strong>BB610 PULS</strong> — програмне керування системою з Windows.</p>
        <p><strong>BB610 PULS MOBILE</strong> — мобільне керування з будь-якого місця.</p>
      </div>
      <p class="architecture24-summary">CONTROL + HYDRAULIC + ZONE + PULS + MOBILE працюють як єдина система BB610 WATER.</p>
      <div class="architecture24-boundary" aria-label="Граница системи BB610 WATER">
        <p><strong>Поза системою:</strong> джерело води, насос подачі та первинна фільтрація.</p>
        <p><strong>У складі BB610 WATER:</strong> керування, дозування, контроль, розподіл по зонах та програмне забезпечення.</p>
      </div>
    </div>`;
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',render);
  else render();
})();
