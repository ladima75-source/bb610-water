/* BB610 WATER staging explanatory visual data
 * Task 07 source: BB610_WATER_VISUAL_UX_BRIEF_R1.md
 * EXPLANATORY UI/DIAGRAM ONLY — never product proof / live telemetry.
 */
window.BB610_VISUALS = {
  heroSchedule: [
    { time: "06:00", zone: "Duke — молоді", action: "Полив", state: "done" },
    { time: "11:00", zone: "Chandler", action: "Полив", state: "done" },
    { time: "15:00", zone: "Chandler", action: "Полив + живлення", state: "active" },
    { time: "18:00", zone: "Duke — молоді", action: "Полив", state: "planned" }
  ],
  zones: [
    { id: "duke", name: "Duke — молоді", summary: "4 поливні блоки / об’єм", schedule: [["06:00","200 л"],["11:00","200 л"],["15:00","200 л"],["18:00","200 л"]] },
    { id: "chandler", name: "Chandler — плодоношення", summary: "2 поливи + цикл живлення", schedule: [["06:30","300 л"],["12:00","300 л"],["16:00","змочування → живлення → промивання"]] },
    { id: "tomato", name: "Томати чері", summary: "власний графік / час", schedule: [["07:00","12 хв"],["13:00","10 хв"],["18:30","12 хв"]] },
    { id: "favorite", name: "Улюблена грядка", summary: "окрема група рослин", schedule: [["08:00","120 л"],["17:00","120 л"]] }
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
    normal: { zone: "Chandler", target: "800 л", actual: "802 л", state: "Виконано ✓" },
    attention: { zone: "Duke — молоді", target: "600 л", actual: "Фактична витрата нижча очікуваної", state: "Потрібна увага" }
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
    with: ["кожна зона має власний графік","полив запускається автоматично","фертигація виконується як частина програми","перемішування керується системою","фактичний об’єм вимірюється","контрольовані відхилення привертають увагу власника"]
  },
  proofStates: {
    puls: { label: "PROOF NEEDED", text: "Тут буде затверджений реальний BB610 PULS. Поточний staging не підміняє його mockup або repository-asset." },
    pulsMobile: { label: "PROOF NEEDED", text: "PULS MOBILE не подається як готовий реальний продукт до окремого підтвердження." },
    hardware: { label: "PROOF NEEDED", text: "Фото / затверджені engineering visuals CONTROL / HYDRAULIC / ZONE будуть вставлені після окремого asset review." },
    installation: { label: "CONTEXT / PROOF LATER", text: "Схема нижче пояснює підключення за frozen-архітектурою і не є фотографією реальної інсталяції." }
  }
};