# BB610 WATER — COMMERCIAL COPY R1

- **Status:** WORKING COPY / REVIEW
- **Date:** 2026-09-10
- **Purpose:** text/commercial logic for the current BB610 WATER staging website
- **Visual decisions:** NOT INCLUDED
- **Images / PULS / engineering visuals / schemes:** DO NOT CHANGE in this task
- **Production:** DO NOT CHANGE

## 0. Core commercial principle

BB610 WATER must not be sold as a PLC, controller, cabinet, sensor set or “smart irrigation timer”.

The buyer is often the owner/manager of a small or medium farm. He decides how to grow, but irrigation and plant nutrition should not require his personal participation in every routine operation.

The central idea of the conversation is:

> **ВИ ВИРІШУЄТЕ, ЯК ВИРОЩУВАТИ. BB610 БЕРЕ НА СЕБЕ РУТИНУ ПОЛИВУ ТА ПІДЖИВЛЕННЯ.**

Supporting product principle:

> **Ви вирішуєте → BB610 виконує → BB610 контролює.**

BB610 does not replace the grower’s agronomic decision. The owner remains the decision-maker. The system executes the configured process, controls the actual result and reacts/reports within the implemented protection logic.

The page should make the visitor FEEL freedom, professional control and risk reduction from concrete capabilities. Do not turn “freedom / control / professional level” into loud slogan cards.

---

# 1. HERO — first working version

## H1

**ВИ ВИРІШУЄТЕ, ЯК ВИРОЩУВАТИ.  
BB610 БЕРЕ НА СЕБЕ РУТИНУ ПОЛИВУ ТА ПІДЖИВЛЕННЯ**

## Supporting text

Задайте потрібний режим для кожної зони. BB610 виконає полив і фертигацію за вашим графіком, проконтролює фактичне виконання та повідомить про відхилення.

## Principle line

**Ви вирішуєте → BB610 виконує → BB610 контролює**

## Primary CTA — working copy

**ПОДИВИТИСЯ, ЯК ЦЕ ПРАЦЮЄ**

### Copy note

This is WORKING COPY, not freeze. It must live in the centralized content layer and be trivial to edit later.

---

# 2. POLLING & FEEDING BY YOUR SCHEDULE

## Working heading

**ПОЛИВ І ПІДЖИВЛЕННЯ — ЗА ВАШИМ ГРАФІКОМ**

## Copy

Ви визначаєте, коли і як працює кожна зона: час запуску, тривалість або потрібний фактичний об’єм, кількість поливних блоків протягом дня та режим фертигації.

BB610 виконує задану програму автоматично. Вам не потрібно щоразу запускати полив, перемикати зони або особисто бути біля системи під час кожного поливу та підживлення.

Полив і живлення працюють як один керований процес, а не як набір окремих ручних операцій.

## Concrete example — explanatory, not agronomic prescription

- 06:00 — перший поливний блок
- 11:00 — другий поливний блок
- 15:00 — полив + фертигація
- 18:00 — завершальний поливний блок

**Чотири завдання за день — без чотирьох ручних запусків.**

---

# 3. EACH ZONE HAS ITS OWN MODE

## Working heading

**КОЖНІЙ ЗОНІ — СВІЙ РЕЖИМ**

## Copy

Різні культури, сорти, вік рослин або умови вирощування можуть потребувати різного поливу та живлення.

Для кожної зони BB610 дозволяє задати індивідуальний режим: власний графік, об’єм або тривалість поливу та доступні налаштування живлення.

**Ви налаштовуєте систему під свої рослини, а не рослини під можливості автоматики.**

## Named zones

Зони не повинні залишатися безликими `Z1`, `Z2`, `Z3`. Власник може називати їх так, як звик у своєму господарстві.

Examples for UI/copy demonstration:

- **Duke — молоді**
- **Chandler — плодоношення**
- **Томати чері**
- **Улюблена грядка**

Working supporting line:

**Назвіть зони так, як звикли називати їх у господарстві. Для кожної — свої налаштування.**

This feature should create a sense that BB610 adapts to the owner’s real farm rather than forcing the farm into abstract controller numbering.

---

# 4. ACTUAL RESULT, NOT ONLY A COMMAND

## Working heading

**ВІДКРИТИЙ КЛАПАН ЩЕ НЕ ОЗНАЧАЄ, ЩО РОСЛИНИ ОТРИМАЛИ ЗАПЛАНОВАНУ ВОДУ**

## Copy

Звичайний контролер може підтвердити, що зона працювала заданий час.

BB610 побудований на контролі фактичної витрати води. Якщо зоні задано певний об’єм, система бачить, скільки води фактично пройшло через систему, і дозволяє порівняти результат із завданням.

## Explanatory example

**Задано: 800 л  
Фактично: 802 л  
Цикл виконано**

This must always be visibly presented as an explanatory example, not live telemetry.

## Existing product phrase

**Полив за фактичним об’ємом, а не лише за тривалістю.**

This phrase remains valid and should be used as the technical explanation/proof, not as the only emotional value proposition of the entire product.

---

# 5. IF THE PROCESS DEVIATES

## Working heading

**ВИ ЗАДАЄТЕ РЕЖИМ. BB610 СТЕЖИТЬ ЗА ЙОГО ВИКОНАННЯМ**

## Copy

BB610 не вирішує замість вас, скільки води або живлення потрібно рослинам. Це ваше рішення.

Система контролює виконання заданого процесу та доступні їй параметри: фактичну витрату, тиск, pH, EC, рівень робочих розчинів та стан системи відповідно до конкретної комплектації.

Якщо контрольований параметр виходить за задані межі, BB610 використовує передбачену для цієї події логіку: попередження, підтвердження продовження роботи або аварійну зупинку.

**Ви визначаєте, що потрібно рослинам. BB610 допомагає не пропустити проблему у виконанні.**

Do not claim that BB610 automatically diagnoses the physical cause of every deviation.

---

# 6. FERTIGATION — FEEDING BECOMES PART OF IRRIGATION

## Working heading

**ПІДЖИВЛЕННЯ СТАЄ ЧАСТИНОЮ ЗВИЧАЙНОГО ПОЛИВУ**

## Copy

Підживлення не повинно щоразу перетворюватися на окрему трудомістку операцію.

Ви готуєте маточний розчин і задаєте, коли та як використовувати його в поливному циклі. Подальше перемішування маточного розчину та дозування стають частиною автоматичного процесу BB610 відповідно до комплектації системи.

Поливний цикл можна побудувати послідовно:

**змочування → внесення живлення → промивання**

Поживний розчин можна вносити протягом заданої частини поливного циклу, а не виконувати підживлення як окрему коротку ручну операцію.

This gives the grower a tool for more controlled and gradual feeding according to his own cultivation technology.

## Explanatory example only

**15% змочування → 70% живлення → 15% промивання**

Mandatory note:

**Приклад структури циклу. Не є універсальною агрономічною рекомендацією.**

## Important accuracy boundary

Do NOT say that BB610 itself fully prepares the stock solution or automatically adds dry/liquid fertilizer into the tank unless that function is separately confirmed.

Correct meaning: the owner prepares/connects the stock solution; BB610 can automate the subsequent mixing/recirculation and dosing process according to system configuration.

---

# 7. pH AND EC

## Working heading

**ТОЧНІШЕ КЕРУВАННЯ ВОДОЮ ТА ЖИВЛЕННЯМ**

## Copy

У версіях з `P` BB610 дозволяє керувати корекцією pH та контролювати результат у межах реалізованої логіки системи.

У версіях `PE` додатково доступний моніторинг електропровідності EC та повідомлення про відхилення.

## Mandatory distinction

**pH — керування / корекція та контроль.**  
**EC — моніторинг і повідомлення про відхилення.**

Do not imply closed-loop automatic EC correction in the current product version.

---

# 8. WHAT THIS CHANGES FOR THE OWNER

This section must remain conversational and concrete. Avoid abstract slogan cards called FREEDOM / CONTROL / PROFESSIONALISM.

## Working copy

Один графік об’єднує регулярні операції поливу та підживлення. Кожна зона працює за своїми налаштуваннями. Система контролює фактичне виконання і повідомляє, коли процес потребує вашої уваги.

Вам не потрібно особисто бути оператором кожного поливного циклу.

При цьому головне рішення залишається за вами: **ви визначаєте технологію, BB610 дає інструмент для її точного та повторюваного виконання.**

This is the intended meaning of “accessible professional level”: professional water/nutrition management tools that can be used by a small or medium farm without positioning the product as cheap or consumer-grade.

---

# 9. PULS — TEXT LOGIC ONLY IN THIS TASK

## Working heading

**КЕРУВАННЯ І СТАН СИСТЕМИ — В ОДНОМУ МІСЦІ**

## Copy

BB610 PULS — основне програмне середовище керування BB610 WATER.

У ньому власник або керуючий працює з розкладом, зонами, поточним станом системи, фактичними параметрами, попередженнями та історією роботи відповідно до доступної конфігурації.

Іменовані зони допомагають бачити господарство звичними назвами — наприклад `Duke — молоді` або `Томати чері`, а не лише технічними номерами каналів.

### Important Task 06 boundary

Do not select, replace, redraw or fabricate PULS screenshots in this content task. Visual proof will be handled separately.

BB610 PULS MOBILE must not be presented as an already finished real product unless separately confirmed. It is currently a project/development direction.

---

# 10. SYSTEM — PHYSICAL LAYER

## Working heading

**ОДНА СИСТЕМА — ВІД КЕРУВАННЯ ДО РОЗПОДІЛУ ПО ЗОНАХ**

## Copy

BB610 WATER об’єднує фізичне обладнання та програмне керування в одну систему.

### CONTROL

Керування, автоматика та підключення датчиків і виконавчих пристроїв.

### HYDRAULIC

Гідравлічний процес, вимірювання, фертигація, pH/EC відповідно до версії та вбудовані насоси перемішування маточних розчинів для каналів фертигації.

### ZONE

Розподіл води по окремих зонах поливу.

## Installation principle

System design target: максимально plug-and-play монтаж без необхідності виконувати ручну комутацію проводів усередині шаф під час звичайного встановлення.

Зовнішні електричні з’єднання між модулями та обладнанням передбачають швидкі захищені від вологи та помилкового підключення роз’єми.

Do not claim “maintenance-free”. Hydraulic, dosing and measurement equipment still requires appropriate service.

---

# 11. CONFIGURATION — HELP ME CHOOSE, DO NOT DUMP A MATRIX FIRST

The public conversation should guide the buyer through his needs before showing a dense 21-combination matrix.

## Step 1

**Потрібен тільки полив чи також підживлення?**

- `I` — irrigation
- `F1` — one fertigation channel
- `F2` — two fertigation channels

## Step 2

**Потрібне керування pH?**

- `P` adds pH management/control to the relevant fertigation version.

## Step 3

**Потрібен моніторинг EC?**

- `PE` = pH functionality + EC monitoring/deviation notification.

## Step 4

**Скільки зон потрібно зараз?**

- `Z4(8)` — 4 installed/base zones, expansion to 8
- `Z8(12)` — 8 installed/base zones, expansion to 12
- `Z12(16)` — 12 installed/base zones, expansion to 16

## Frozen public version family

- I
- F1
- F1-P
- F1-PE
- F2
- F2-P
- F2-PE

Every resolved selection must show exact version + zone, e.g.:

**F1-PE / Z8(12)**

Do not invent missing prices. Keep pricing in centralized commercial data and Admin-ready.

---

# 12. PRICE DIALOGUE

Price must not be hidden as though it were a secret, but the visitor should first understand what he is buying.

Working logic:

1. What routine irrigation/feeding work BB610 takes over.
2. How each zone can follow the owner’s own technology.
3. How actual execution is controlled.
4. How deviations are surfaced/protected against.
5. What level of fertigation/pH/EC the farm needs.
6. Then configuration and price.

Do not promise ROI, water savings percentages or yield growth percentages without verified BB610 evidence.

The price should be explained by capability progression rather than defended with marketing hype.

---

# 13. FINAL CONVERSION

## Working heading

**ПІДБЕРЕМО BB610 WATER ПІД ВАШЕ ГОСПОДАРСТВО**

## Copy

Розкажіть, скільки у вас зон, як організований полив і чи потрібні фертигація, керування pH та моніторинг EC.

Ми допоможемо визначити конфігурацію без зайвих функцій і з можливістю передбаченого розширення.

## CTA

**ПІДІБРАТИ КОНФІГУРАЦІЮ**

---

# 14. FUTURE PAGE STRUCTURE — NOT FOR IMPLEMENTATION IN TASK 06

This copy establishes the future information architecture. Do not build all pages in Task 06 unless separately assigned.

Planned logical pages:

- `/` — why BB610 WATER / commercial dialogue
- `/irrigation/` — schedules, zones, volume/time, actual execution
- `/fertigation/` — feeding workflow, stock solution mixing/recirculation, dosing, wet/feed/flush cycle
- `/ph-ec/` — pH management and EC monitoring
- `/puls/` — real PULS product and control experience
- `/system/` — CONTROL / HYDRAULIC / ZONE and installation architecture
- `/configurations/` — guided configuration + pricing
- future industry pages: blueberry, nursery, greenhouse, container growing

Do not make industry pages copies of the homepage. Each should begin from the real workflow of that type of farm.

---

# 15. TONE RULES

The commercial voice should resemble a competent technical partner speaking with a farm owner.

Use:

- concrete actions;
- clear consequences for the owner’s work;
- real product boundaries;
- calm confidence;
- understandable agricultural language.

Avoid:

- excessive slogans;
- “revolutionary” claims;
- AI hype;
- abstract FREEDOM/CONTROL/INNOVATION cards;
- unsupported yield or savings percentages;
- portraying the owner as incompetent;
- claiming BB610 makes agronomic decisions for the grower;
- describing PLCs, relays and sensors as the main reason to buy.

The visitor should reach the conclusions himself:

- “I will not have to personally run every irrigation/feeding operation.”
- “I can give different groups of plants different regimes.”
- “I will know more about whether the process actually happened as planned.”
- “The system will draw my attention when a controlled process deviates.”
- “I remain the person deciding how my plants are grown.”

---

# 16. TASK 06 IMPLEMENTATION BOUNDARY

For the current Task 06 iteration:

1. Transfer this commercial dialogue into the existing R05 staging architecture through the centralized content/data layer.
2. Reuse the current visual staging structure as much as practical.
3. Layout may be adjusted only as needed for the longer/new copy and semantic hierarchy.
4. Do NOT independently choose/change product photography, PULS screenshots, engineering visualizations, schemes, graphs or visual proof assets.
5. Do NOT redesign the site.
6. Do NOT change production.
7. Keep all key copy easy to edit in one centralized source.
8. Mark unresolved wording as WORKING COPY.
9. When complete, produce `R06_COMMERCIAL_DIALOGUE.md` with status REVIEW and stop.

The next visual-proof stage will be assigned separately after owner review of this copy in the live staging page.
