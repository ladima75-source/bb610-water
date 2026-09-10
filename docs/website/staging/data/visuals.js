/* BB610 WATER staging explanatory visual data
 * Task 07.1 correction: irrigation block -> zone queue -> target volume -> actual execution.
 * EXPLANATORY UI/DIAGRAM ONLY — never product proof / live telemetry.
 */
window.BB610_VISUALS = {
  heroSchedule: [
    { time: "06:00", zone: "ПОЛИВНИЙ БЛОК 1", action: "черга зон · об’єм", state: "done" },
    { time: "15:00", zone: "ПОЛИВНИЙ БЛОК 2", action: "черга зон · об’єм", state: "active" }
  ],
  heroBlocks: [
    {
      start: "06:00",
      label: "ПОЛИВНИЙ БЛОК 1",
      state: "done",
      queue: [
        { order: 1, zone: "Теплиця — томати", target: "300 л", actual: "302 л", state: "done" },
        { order: 2, zone: "Лохина — молоді рослини", detail: "сорт Duke · приклад", target: "220 л", actual: "221 л", state: "done" },
        { order: 3, zone: "Розсадник", target: "180 л", actual: "179 л", state: "done" }
      ]
    },
    {
      start: "15:00",
      label: "ПОЛИВНИЙ БЛОК 2",
      state: "active",
      queue: [
        { order: 1, zone: "Полуниця — тунель 1", target: "260 л", actual: "261 л", state: "done" },
        { order: 2, zone: "Теплиця — томати", target: "300 л", actual: "184 / 300 л", state: "active" },
        { order: 3, zone: "Улюблена грядка", target: "120 л", actual: "очікує", state: "planned" }
      ]
    }
  ],
  zones: [
    {
      id: "greenhouse-tomato", name: "Теплиця — томати", summary: "Полив · заданий об’єм 300 л", schedule: [["06:00","300 л"],["15:00","300 л"]],
      detail: "назва зони, зрозуміла власнику", recipe: "Полив", target: "300 л",
      blocks: [
        { start: "06:00", block: "Блок 1", order: "1 у черзі", target: "300 л", actual: "302 л", state: "done" },
        { start: "15:00", block: "Блок 2", order: "2 у черзі", target: "300 л", actual: "184 / 300 л", state: "active" }
      ]
    },
    {
      id: "blueberry-young", name: "Лохина — молоді рослини", summary: "Полив · заданий об’єм 220 л", schedule: [["06:00","220 л"],["18:00","220 л"]],
      detail: "сорт Duke · необов’язкове уточнення", recipe: "Полив", target: "220 л",
      blocks: [
        { start: "06:00", block: "Блок 1", order: "2 у черзі", target: "220 л", actual: "221 л", state: "done" },
        { start: "18:00", block: "Блок 3", order: "1 у черзі", target: "220 л", actual: "очікує", state: "planned" }
      ]
    },
    {
      id: "nursery", name: "Розсадник", summary: "Полив · заданий об’єм 180 л", schedule: [["06:00","180 л"],["15:00","180 л"]],
      detail: "окрема група рослин", recipe: "Полив", target: "180 л",
      blocks: [
        { start: "06:00", block: "Блок 1", order: "3 у черзі", target: "180 л", actual: "179 л", state: "done" },
        { start: "15:00", block: "Блок 2", order: "4 у черзі", target: "180 л", actual: "очікує", state: "planned" }
      ]
    },
    {
      id: "strawberry-tunnel-1", name: "Полуниця — тунель 1", summary: "Полив + живлення · заданий об’єм 260 л", schedule: [["06:30","260 л"],["15:00","260 л"]],
      detail: "зона тунелю", recipe: "Полив + живлення", target: "260 л",
      blocks: [
        { start: "06:30", block: "Блок 1", order: "1 у черзі", target: "260 л", actual: "260 л", state: "done" },
        { start: "15:00", block: "Блок 2", order: "1 у черзі", target: "260 л", actual: "261 л", state: "done" }
      ]
    },
    {
      id: "favorite-bed", name: "Улюблена грядка", summary: "Полив · заданий об’єм 120 л", schedule: [["08:00","120 л"],["17:00","120 л"]],
      detail: "назва, звична власнику", recipe: "Полив", target: "120 л",
      blocks: [
        { start: "08:00", block: "Блок 1", order: "1 у черзі", target: "120 л", actual: "120 л", state: "done" },
        { start: "17:00", block: "Блок 2", order: "1 у черзі", target: "120 л", actual: "очікує", state: "planned" }
      ]
    }
  ],
  actualVolume: { target: 800, checkpoints: [200,400,600,800,802], actual: 802, unit: "л", result: "ВИКОНАНО" },
  fertigation: {
    stock: "МАТОЧНИЙ РОЗЧИН",
    ownerNote: "приготував / підключив власник",
    mixing: "ПЕРЕМІШУВАННЯ / РЕЦИРКУЛЯЦІЯ",
    dosing: "ДОЗУВАННЯ ЗА ПРОГРАМОЮ",
    cycle: [
      { label: "ЗМОЧУВАННЯ", share: 15 },
      { label: "ЖИВЛЕННЯ", share: 70 },
      { label: "ПРОМИВАННЯ", share: 15 }
    ],
    f2: ["МАТОЧНИК A", "МАТОЧНИК B"]
  },
  phEc: {
    flow: ["ВОДА", "ЖИВЛЕННЯ A/B", "КОРЕКЦІЯ pH", "ЗМІШУВАННЯ", "КОНТРОЛЬ"],
    ph: { label: "pH", target: "5.40", actual: "5.42", role: "КЕРУВАННЯ / КОРЕКЦІЯ + КОНТРОЛЬ" },
    ec: { label: "EC", actual: "1.36", role: "МОНІТОРИНГ + ПОВІДОМЛЕННЯ ПРО ВІДХИЛЕННЯ" }
  },
  states: {
    normal: { zone: "Теплиця — томати", target: "800 л", actual: "802 л", state: "Виконано ✓" },
    attention: { zone: "Лохина — молоді рослини", target: "600 л", actual: "Фактична витрата нижча очікуваної", state: "Потрібна увага" }
  },
  architecture: [
    { code: "CONTROL", meaning: "керує тим, що і коли виконати" },
    { code: "HYDRAULIC", meaning: "забезпечує та контролює режим потоку / живлення" },
    { code: "ZONE", meaning: "спрямовує воду в призначені зони" },
    { code: "РОСЛИНИ", meaning: "отримують заданий режим за зонами" }
  ],
  installation: ["Поставили", "Підключили воду", "Підключили баки", "Підключили зони", "Живлення", "Налаштування", "Робота"],
  guided: {
    feeding: [
      { value: "none", label: "Тільки полив", note: "без фертигації" },
      { value: "one", label: "Полив + підживлення", note: "1 канал фертигації" },
      { value: "two", label: "Полив + підживлення", note: "2 канали фертигації" }
    ],
    yesNo: [{ value: "no", label: "Ні" }, { value: "yes", label: "Так" }]
  },
  beforeWith: {
    before: ["пам’ятати про черговий запуск поливу","запускати / контролювати підживлення","стежити за перемішуванням маточного розчину","перевіряти, чи пройшов полив","підходити до системи, щоб зрозуміти її стан"],
    with: ["поливні блоки стартують за заданим розкладом","усередині блоку система виконує чергу зон","для зони задається потрібний об’єм","фертигація виконується як частина програми","фактичний об’єм вимірюється","контрольовані відхилення привертають увагу власника"]
  },
  proofStates: {
    puls: { label: "PROOF NEEDED", text: "Тут буде затверджений реальний BB610 PULS. Поточний staging не підміняє його mockup або repository-asset." },
    pulsMobile: { label: "PROOF NEEDED", text: "PULS MOBILE не подається як готовий реальний продукт до окремого підтвердження." },
    hardware: { label: "PROOF NEEDED", text: "Фото / затверджені engineering visuals CONTROL / HYDRAULIC / ZONE будуть вставлені після окремого asset review." },
    installation: { label: "CONTEXT / PROOF LATER", text: "Схема нижче пояснює підключення за frozen-архітектурою і не є фотографією реальної інсталяції." }
  }
};