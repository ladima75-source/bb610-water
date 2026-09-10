/* BB610 WATER staging R07.2 centralized override layer.
 * WORKING COPY / EXPLANATORY DEMO ONLY — NOT PRODUCT PROOF.
 * Keeps R07.1 base intact while applying owner-approved correction package.
 */
(() => {
  const C = window.BB610_CONTENT;
  const V = window.BB610_VISUALS;
  const U = window.BB610_UX;
  if (!C || !V || !U) return;

  // Overall-system naming: user-facing copy uses BB610 WATER.
  const systemName = value => typeof value === 'string'
    ? value.replace(/\bBB610\b(?!\s+(?:WATER|PULS|INTELLIGENCE))/g, 'BB610 WATER')
    : value;
  const normalize = value => {
    if (Array.isArray(value)) return value.map(normalize);
    if (value && typeof value === 'object') {
      Object.keys(value).forEach(key => { value[key] = normalize(value[key]); });
      return value;
    }
    return systemName(value);
  };
  normalize(C);
  normalize(U);

  // R07.2 HERO: block start -> ordered zones -> target volume -> different configured program.
  // Litres are explanatory examples, not recommended irrigation norms for these crops.
  V.heroSchedule = [
    { time: '06:00', zone: 'РАНКОВИЙ БЛОК', action: 'черга зон · заданий об’єм', state: 'done' },
    { time: '15:00', zone: 'ДЕННИЙ БЛОК', action: 'черга зон · заданий об’єм', state: 'active' }
  ];
  V.heroBlocks = [
    {
      start: '06:00', label: 'РАНКОВИЙ БЛОК', state: 'done',
      queue: [
        { order: 1, zone: 'Теплиця — томати', target: '300 л', program: 'ВОДА + ЖИВЛЕННЯ', state: 'done' },
        { order: 2, zone: 'Лохина — молоді рослини', target: '220 л', program: 'ВОДА + ЖИВЛЕННЯ + pH', detail: 'сорт може бути додатковим уточненням', state: 'done' },
        { order: 3, zone: 'Розсадник', target: '180 л', program: 'ВОДА', state: 'done' }
      ]
    },
    {
      start: '15:00', label: 'ДЕННИЙ БЛОК', state: 'active',
      queue: [
        { order: 1, zone: 'Полуниця — тунель 1', target: '260 л', program: 'ВОДА + ЖИВЛЕННЯ', state: 'done' },
        { order: 2, zone: 'Клумба Коханої', target: '120 л', program: 'ВОДА', detail: 'вільна зрозуміла власнику назва зони', state: 'planned' }
      ]
    }
  ];

  V.zones = [
    {
      id: 'greenhouse-tomato', name: 'Теплиця — томати', summary: 'ВОДА + ЖИВЛЕННЯ · заданий об’єм 300 л', schedule: [['06:00','300 л'],['15:00','300 л']],
      detail: 'назва зони, зрозуміла власнику', recipe: 'ВОДА + ЖИВЛЕННЯ', target: '300 л',
      blocks: [
        { start: '06:00', block: 'Ранковий блок', order: '1 у черзі', target: '300 л', actual: '302 л', state: 'done' },
        { start: '15:00', block: 'Денний блок', order: 'за програмою зони', target: '300 л', actual: 'приклад окремого виконання', state: 'planned' }
      ]
    },
    {
      id: 'blueberry-young', name: 'Лохина — молоді рослини', summary: 'ВОДА + ЖИВЛЕННЯ + pH · заданий об’єм 220 л', schedule: [['06:00','220 л']],
      detail: 'сорт може бути вторинним необов’язковим уточненням', recipe: 'ВОДА + ЖИВЛЕННЯ + pH', target: '220 л',
      blocks: [
        { start: '06:00', block: 'Ранковий блок', order: '2 у черзі', target: '220 л', actual: '221 л', state: 'done' }
      ]
    },
    {
      id: 'nursery', name: 'Розсадник', summary: 'ВОДА · заданий об’єм 180 л', schedule: [['06:00','180 л']],
      detail: 'окрема група рослин', recipe: 'ВОДА', target: '180 л',
      blocks: [
        { start: '06:00', block: 'Ранковий блок', order: '3 у черзі', target: '180 л', actual: '179 л', state: 'done' }
      ]
    },
    {
      id: 'strawberry-tunnel-1', name: 'Полуниця — тунель 1', summary: 'ВОДА + ЖИВЛЕННЯ · заданий об’єм 260 л', schedule: [['15:00','260 л']],
      detail: 'окрема зона тунелю', recipe: 'ВОДА + ЖИВЛЕННЯ', target: '260 л',
      blocks: [
        { start: '15:00', block: 'Денний блок', order: '1 у черзі', target: '260 л', actual: '261 л', state: 'done' }
      ]
    },
    {
      id: 'wife-flowerbed', name: 'Клумба Коханої', summary: 'ВОДА · заданий об’єм 120 л', schedule: [['15:00','120 л']],
      detail: 'вільна назва зони так, як її називає власник', recipe: 'ВОДА', target: '120 л',
      blocks: [
        { start: '15:00', block: 'Денний блок', order: '2 у черзі', target: '120 л', actual: 'очікує', state: 'planned' }
      ]
    }
  ];

  U.hero.scheduleLabel = 'ПОЯСНЮВАЛЬНИЙ ПРИКЛАД ПОЛИВНИХ БЛОКІВ';
  U.hero.status = 'Час задає старт блоку. Далі BB610 WATER послідовно виконує чергу зон.';
  U.hero.note = 'Explanatory demo, не BB610 PULS: об’єми наведені лише для пояснення логіки й не є рекомендованими нормами поливу цих культур.';
  U.routineCorrection.intro = 'Ви задаєте час старту поливного блоку. Після старту BB610 WATER послідовно виконує чергу завдань по зонах. Кожна зона має власний рецепт і заданий об’ємом режим; фактичне виконання контролюється за даними витратоміра.';
  U.routineCorrection.conclusion = 'Один старт поливного блоку запускає послідовність різних зон за їхніми власними рецептами. BB610 WATER проходить чергу і контролює фактичний об’єм виконання кожного завдання.';
  U.zones.note = 'Час — старт поливного блоку. Усередині блоку зона виконується у своїй черзі за власним рецептом і заданим об’ємом. Назви та літри — explanatory demo, не агрономічні рекомендації; керування залишається зональним.';

  U.beforeWith.eyebrow = '01 / ЩО ЗМІНЮЄТЬСЯ У ВАШОМУ РОБОЧОМУ ДНІ';
  U.beforeWith.with = 'З BB610 WATER';
  U.contact.text = 'Скільки у вас зон, які культури вирощуєте, чи використовуєте фертигацію, чи потрібні корекція pH та моніторинг EC. Ми підберемо BB610 WATER під технологію господарства — без непотрібних функцій і з передбаченою можливістю розширення.';
})();