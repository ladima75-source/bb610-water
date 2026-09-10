# BB610 WATER — CURRENT WEBSITE TECHNICAL AUDIT R1

- **Revision:** R1
- **Status:** REVIEW
- **Date:** 2026-09-10
- **Source branch:** `main`
- **Source commit:** `31902b6f5ce5173eddedaad871c812fc704aa0d0`
- **Repository:** `ladima75-source/bb610-water`
- **Scope:** technical audit only; no redesign, no production changes, no website-code changes

## 1. Executive summary

The current BB610 Water website is a small static single-page site hosted directly from the repository structure. The implementation is intentionally simple: one `index.html`, one large CSS file, one small JavaScript file, a favicon, CNAME, and 15 local WebP assets.

The current site is usable as a source of product copy, configuration tables, SCADA/Mobile/Intelligence visuals, system diagrams and existing visual decisions, but it should not be treated as a clean foundation for the next website version without structural refactoring.

Main findings:

1. The repository has no application framework, build pipeline, package manifest, backend, CMS or data layer.
2. Product/configuration/pricing content is hard-coded directly into `index.html`.
3. The contact form is deliberately non-functional until a server endpoint is connected.
4. The CSS file is highly accumulated and patch-oriented, with multiple historical version blocks and repeated overrides using `!important`.
5. Desktop composition still contains a fixed 1536×1024 first-screen artboard concept, later partially normalized through override CSS.
6. Mobile behavior exists through CSS media queries, but the architecture is desktop-first in several critical blocks, especially the first screen and pricing table.
7. SEO implementation is minimal: basic `<title>`, language, viewport and favicon are present, but no description, canonical, social metadata, structured data, sitemap or robots file is present in the repository.
8. All visible content and images are local, which is positive for dependency control and migration safety.
9. Existing SCADA, Mobile, Intelligence, modules, process diagram and pricing assets must be preserved as source material during migration.
10. A future Water Admin should be implemented as a lightweight separate management layer for normalized configuration/price data rather than extending hard-coded HTML.

**Audit conclusion:** preserve the current production site as-is until a replacement is accepted. Use the repository as a content/asset source, but build the next architecture in a separate development branch and progressively migrate approved blocks.

---

## 2. Current repository structure

Current top-level structure:

```text
/
├── CNAME
├── README.md
├── favicon.ico
├── index.html
├── assets/
│   └── extracted/
│       ├── 01_340b1d74d092.webp
│       ├── 02_ae24f7eff9c5.webp
│       ├── 03_0cc2412535aa.webp
│       ├── 04_b6d217f2d6e2.webp
│       ├── 05_51a8cdbf945a.webp
│       ├── 06_9215e3523a6d.webp
│       ├── 07_6a43a9670399.webp
│       ├── 08_a48110ba0ba8.webp
│       ├── 09_63f4616bc782.webp
│       ├── 10_131ed62b8eb2.webp
│       ├── 11_a6fe97c15577.webp
│       ├── 12_09ab0debbc03.webp
│       ├── 13_b432ba406d4c.webp
│       ├── 14_c6d554bdfa52.webp
│       └── 15_e896512345a4.webp
├── css/
│   └── final-original.css
├── js/
│   └── final-original.js
└── docs/
    └── website/
        └── WORKFLOW.md
```

There are no detected source directories for a framework, server application, API, database, package manager or bundler.

### Approximate repository frontend payload from audited source

- `index.html`: ~25.9 KB
- `css/final-original.css`: ~127.9 KB
- `js/final-original.js`: ~1.9 KB
- 15 WebP assets: ~779 KB total
- favicon: ~37.9 KB

The absence of external frontend libraries keeps runtime dependency risk low, but the CSS-to-HTML ratio indicates significant accumulated styling debt.

---

## 3. `index.html` structure

The page is a single Ukrainian-language HTML document (`<html lang="uk">`) with anchor navigation.

Main visible sections:

1. Fixed header/navigation
2. Top process strip
3. Product/HERO section (`#product`)
4. “Як це працює” process/scheme section (`#how`)
5. Modules section (`#modules`)
6. Versions/configuration/pricing section (`#versions`)
7. Software / BB610 Systems / Mobile / SCADA / Intelligence section (`#software`)
8. Contacts and lead form (`#contacts`)
9. Footer-like contact bar integrated into the contacts section

### Positive points

- Semantic elements such as `header`, `nav`, `main`, `section`, `article`, `table`, `form`, `label`, `ul` and headings are used in many places.
- Main page sections have IDs that support internal navigation.
- Image elements generally contain `alt`, intrinsic `width` and `height`.
- Most below-the-fold images use `loading="lazy"`.
- Assets are stored locally.

### Structural problems

- The entire website is coupled into one HTML file.
- Product content, prices, features, contact data and display configuration are not separated from presentation.
- The first screen still uses an internal fixed artboard (`1536×1024`) concept.
- Several presentational SVG animation elements are embedded directly in HTML.
- Historical visual decisions are encoded directly into markup and CSS class combinations, making controlled future changes difficult.
- There is an extra closing `</div>` around the end of the `#how` block that should be validated during future markup cleanup.
- Some language UI is decorative only (`UA / EN`) and is not backed by actual localization logic.

---

## 4. CSS audit

Current stylesheet: `css/final-original.css` (~128 KB).

The stylesheet contains both original rules and many later integration/fix blocks. Comments expose multiple generations, including examples such as:

- `v44 — normal browser zoom + fixed main navigation`
- `v47 UNIFIED TYPOGRAPHY`
- `v49 FIX: protect calibrated first screen from global typography`
- supplied/integrated MODULES and VERSIONS blocks

### Main technical debt

1. **Patch accumulation**
   - Multiple later blocks override earlier blocks instead of replacing them.
   - This increases cascade complexity and regression risk.

2. **Heavy `!important` usage**
   - Many later rules rely on `!important` to win against previous generations.
   - This makes component-level maintenance harder and encourages further override stacking.

3. **Repeated selectors and duplicated responsibility**
   - Header, modules, versions and typography receive several independent layers of styling.
   - Some selectors are unnecessarily repeated or malformed-looking, e.g. nested duplicate IDs such as `#modules #modules ...` and `#versions #versions ...`.

4. **Fixed-layout legacy**
   - Base `.stage` and `.artboard` rules define a 100vh stage and fixed `1536px × 1024px` artboard.
   - Later CSS changes positioning and scaling behavior rather than removing the old model.

5. **Global and local typography conflict**
   - A unified typography system was introduced globally and then explicitly rolled back for the artboard through a protection patch.

6. **Component boundaries are weak**
   - One file contains all page sections, layout generations, responsive fixes, animation styles and integration overrides.

### Recommendation for next architecture

Do not continue appending patches to `final-original.css`. For the new version, split styles by responsibility, for example:

```text
styles/
  tokens.css
  base.css
  layout.css
  components/
  sections/
  utilities.css
```

This is an architectural recommendation only; implementation must wait for acceptance of the corresponding later stage.

---

## 5. JavaScript audit

Current file: `js/final-original.js` (~1.9 KB).

Current JavaScript responsibilities:

- determine active top navigation item during scroll;
- smooth-scroll to sections with header offset;
- intercept contact form submit;
- explicitly prevent fake successful form submission while backend is absent.

### Positive points

- No framework or third-party runtime library.
- Small payload.
- Passive scroll listener is used.
- The code intentionally avoids pretending that an unconnected form was successfully submitted.

### Issues / limitations

- Scroll-based active navigation uses direct `scroll` handling and repeated layout-position reads; acceptable at current scale but can later be replaced with `IntersectionObserver`.
- Header offset is hard-coded (`104` / `86`) in JavaScript and coupled to CSS breakpoints.
- No modular code structure is required today, but additional features should not be continuously appended into the same file.
- No API integration, analytics abstraction, consent handling or localization logic exists.

---

## 6. Assets audit

There are 15 extracted WebP files under `assets/extracted/`.

They currently serve as the visual source for:

- BB610 Water branding/logo;
- CONTROL / HYDRAULIC / ZONE illustrations;
- Mobile visual;
- system/process scheme;
- module visuals;
- BB610 Systems branding;
- Mobile UI;
- SCADA UI;
- BB610 Intelligence branding/UI.

### Positive points

- Assets are local and not dependent on temporary third-party URLs.
- WebP is already used.
- Intrinsic image dimensions are generally specified in markup.

### Risks

- File names such as `02_ae24f7eff9c5.webp` are opaque and not maintainable.
- The `extracted` directory name indicates imported/derived source history rather than a normalized production asset library.
- There is no documented asset manifest explaining what each file is, whether it is approved/frozen, or whether it can be replaced.
- Some large images use source dimensions far larger than their rendered dimensions.

### Required migration behavior

Do not delete or rename current assets during the initial redesign phases. First create an asset inventory and map old assets to semantic names in the future architecture. Real product photographs must later be able to replace engineering visualizations without structural page rewrites.

---

## 7. Responsive / mobile audit

Responsive behavior exists, but the implementation is mixed.

### Present mechanisms

- viewport meta tag;
- CSS media queries at several widths, including ~900, 980 and 640 px;
- responsive section widths using `min()` and `calc()`;
- pricing table horizontal overflow;
- some single-column fallbacks.

### Main risk

The first screen originated as a fixed desktop artboard and only later received browser-normalization overrides. This means the mobile model is not consistently mobile-first.

The versions table has `min-width: 1120px`, so small screens depend on horizontal scrolling. That is technically functional but not a strong mobile information design.

The header/nav also originates from absolute/fixed desktop positioning and receives breakpoint adjustments rather than being built as a naturally responsive component.

### Audit conclusion

A new implementation should be mobile-first at layout level, not merely desktop CSS plus corrective media queries.

---

## 8. Configurations and prices

The complete current configuration matrix is embedded directly in the HTML table.

Audited visible rows:

- I
- F1
- F1-PH
- F1-EC
- F1-PE
- F2
- F2-PH
- F2-EC
- F2-PE

Zone variants:

- Z4(8)
- Z8(12)
- Z12(16)

Both prices without HMI and with HMI are rendered directly as HTML text in table cells.

### Critical architectural issue

Pricing/configuration data is presentation-coupled. Any change requires editing source HTML and redeploying the site.

### Required future state

Configurations and prices should be normalized into a managed data source and rendered by the public frontend. The future data model must support at minimum:

- version code;
- version title/description;
- functional description;
- enabled/disabled state;
- sort order;
- zone configuration;
- price without HMI;
- price with HMI;
- ability to add a configuration without rewriting table markup.

No price values should be changed as part of this audit or migration architecture work without a separate approved product decision.

---

## 9. SCADA / Systems / Intelligence materials

The current site already contains valuable product proof material that must not be lost:

### BB610 Systems / Mobile

The page shows a dedicated BB610 Systems panel and Mobile UI visual with a list of capabilities.

### BB610 SCADA

The page includes a SCADA visual and capability list, including operational state, plan/fact, events, trends, archive and remote settings language.

### BB610 Intelligence

The page includes Intelligence branding/UI and descriptive capabilities such as deviation detection, diagnostics, recommendations, trends and reports.

### Migration requirement

These materials must be treated as source content, not decorative placeholders. They should be revalidated against the accepted SCADA/Intelligence product architecture before being carried into a new public site.

No new capability should be invented during frontend reconstruction.

---

## 10. Process/System materials

The current `#how` section contains an exported process/system image plus an SVG overlay animation.

The site also contains a public product-boundary message in the modules section:

`Ваш об’єкт: Джерело води → Насос → Фільтрація` → `BB610 Water: Керування → Підготовка води → Розподіл по зонах`.

This is important source material and should be preserved through migration even if its future presentation changes.

The SVG overlay is tightly coupled to the current exported background image coordinates, so replacing that base image may require rebuilding the animation geometry.

---

## 11. SEO audit

### Present

- `<html lang="uk">`
- UTF-8
- viewport meta
- page title: `BB610 WATER`
- descriptive image alt attributes on many images
- real HTML text rather than a canvas-only interface
- semantic headings and section content

### Missing / insufficient in repository

- meta description;
- canonical URL;
- Open Graph metadata;
- Twitter/X social metadata;
- structured data / JSON-LD;
- `robots.txt`;
- sitemap;
- explicit alternate-language/hreflang structure;
- page-specific metadata architecture, because only one page exists.

### Architectural conclusion

The current site is indexable but not prepared for scalable SEO architecture. Future development should support real indexable HTML pages for product, technology, industry solutions and expert content without turning the site into an SPA-only shell.

---

## 12. Forms

The contact form contains fields for:

- name;
- phone;
- email;
- company/farm;
- number of irrigation zones;
- irrigation type;
- comment.

The form currently has:

```html
action=""
method="post"
novalidate
```

JavaScript intercepts submit, prevents network submission, temporarily disables the button and displays a message that sending will be activated after server connection.

### Conclusion

There is currently no functional lead-submission backend in the audited repository.

### Future requirements

When implemented later, the form needs:

- server endpoint;
- server-side validation;
- spam/abuse protection;
- explicit success/error state;
- logging/monitoring;
- privacy handling appropriate to collected personal data;
- safe delivery/integration target.

Do not simulate success before the backend exists.

---

## 13. External dependencies

No external CSS framework, JavaScript framework, CDN library or remote image dependency was detected in the audited source files.

The current runtime relies primarily on native browser HTML/CSS/JS and repository-hosted assets.

This is a strong base principle to preserve: add dependencies only where there is a clear architectural benefit.

---

## 14. Performance audit

### Positive factors

- no JS framework;
- very small JavaScript payload;
- local WebP images;
- intrinsic image dimensions are present;
- many lower-page images are lazy-loaded;
- no remote font dependency is currently required;
- no large third-party library bundle.

### Main risks

1. CSS is disproportionately large and contains many obsolete/overridden generations.
2. The large first-screen artboard and numerous absolute-positioned elements increase layout complexity.
3. Some assets have large intrinsic dimensions compared with rendered size.
4. No AVIF or responsive `srcset`/`sizes` image strategy exists.
5. Header backdrop blur may carry rendering cost on some devices.
6. Inline SVG animation is continuously running and should later respect `prefers-reduced-motion`.
7. No evidence of an automated Core Web Vitals/Lighthouse gate in the repository.

### Recommendation

Performance should be addressed after accepted information architecture and visual structure, not through isolated micro-optimization of the current CSS patch stack.

---

## 15. Accessibility audit

### Existing positives

- language is declared;
- form labels are present;
- image `alt` text exists for most content images;
- native links, buttons, inputs, select and textarea elements are used;
- intrinsic dimensions help reduce layout shift.

### Risks / missing items

- no visible skip link detected;
- no explicit focus-system audit;
- contrast should be verified systematically rather than visually assumed;
- animated elements do not show a reduced-motion fallback;
- decorative symbol-heavy UI may need accessible names or hiding where appropriate;
- language toggle is not an actual interactive localization control;
- form validation is disabled in markup and backend validation does not exist.

---

## 16. Technical debt and duplication

Highest-priority debt areas:

1. monolithic `index.html`;
2. monolithic patch-accumulated CSS;
3. data hard-coded into presentation;
4. fixed-artboard heritage on first screen;
5. duplicate/overridden CSS generations;
6. `!important` escalation;
7. opaque asset naming;
8. no real language architecture;
9. no backend for contact form;
10. no Water Admin;
11. no test/build/deploy quality gates represented in repository;
12. no content/data schema for prices/configurations;
13. no scalable page architecture for SEO/product expansion.

---

## 17. Potentially dangerous places

The following areas can create regressions if modified casually:

- first-screen artboard geometry;
- fixed header offsets shared between CSS and JavaScript;
- SVG animation coordinates tied to the process image;
- pricing table values embedded directly in HTML;
- repeated CSS override generations;
- current module/versions selectors with duplicated ID scopes;
- form behavior, because enabling native submission without a backend could create broken or misleading behavior;
- current SCADA/Intelligence claims, which must not be cosmetically expanded beyond approved functionality.

---

## 18. What should be preserved

Preserve as migration source material:

- all current repository assets;
- current public copy until replaced by approved copy;
- CONTROL / HYDRAULIC / ZONE architecture;
- product-boundary logic;
- configuration/version matrix;
- current pricing data as working source only;
- SCADA imagery/content;
- Mobile imagery/content;
- BB610 Systems material;
- BB610 Intelligence material;
- current process/system scheme;
- existing contact-form field set as source reference;
- existing visual tokens/brand colors as reference;
- local-asset/no-heavy-framework principle;
- current production site until replacement is approved.

---

## 19. What should be reworked

Rework in later accepted stages:

- information architecture;
- first-screen layout architecture;
- responsive/mobile implementation;
- CSS organization;
- semantic component structure;
- data model for versions/prices;
- image naming and responsive delivery;
- localization architecture;
- contact backend;
- SEO metadata/page architecture;
- accessibility system;
- performance budget and QA gates.

---

## 20. What must not be lost

During migration, explicitly protect:

1. exact product meaning of factual-volume control;
2. distinction between pH correction and EC monitoring;
3. CONTROL / HYDRAULIC / ZONE product structure;
4. modular zone configurations;
5. price/configuration history and approved values;
6. SCADA as a real product development, not generic dashboard decoration;
7. system/process visual materials;
8. contact/lead requirements;
9. all current assets until semantic replacements are accepted;
10. ability to restore the current production version.

---

## 21. Proposed architecture for the new website

This is an audit recommendation, not implementation approval.

Given the current site scale and requirement for speed, indexable HTML and low JS overhead, a heavy client-side framework is not technically justified at this stage.

Recommended direction:

```text
/
├── pages / templates
├── partials / components
├── data/
│   ├── configurations
│   ├── prices
│   └── shared content
├── assets/
│   ├── brand
│   ├── product
│   ├── schemes
│   ├── scada
│   └── responsive derivatives
├── styles/
│   ├── tokens
│   ├── base
│   ├── layout
│   ├── components
│   └── sections
├── scripts/
├── admin/
└── docs/
```

The exact implementation technology should be chosen only after information architecture is accepted. The preferred default is static/server-rendered HTML with minimal JavaScript and a small data/API layer for genuinely dynamic content.

---

## 22. Proposed Water Admin architecture

First required admin module: **КОНФІГУРАЦІЇ ТА ЦІНИ**.

### Suggested normalized entities

#### `product_versions`

- id
- code
- title
- description
- enabled
- sort_order

#### `zone_configurations`

- id
- code
- base_zones
- max_zones
- enabled
- sort_order

#### `prices`

- version_id
- zone_configuration_id
- price_without_hmi
- price_with_hmi
- currency
- published
- updated_at

### Functional requirements

Admin must allow authorized owner to:

- edit version description;
- edit both price values;
- enable/disable versions;
- change display order;
- manage zone configurations;
- add a new configuration when required;
- publish data used by public website.

### Technical principle

Do not store editable table markup as HTML in a CMS field. Store structured data and render it into the public presentation.

The first admin version should remain intentionally small. A heavy general-purpose CMS is not required for the defined task.

---

## 23. Migration risks

### High

- accidental production regression if redesign work is performed directly on `main`;
- loss or accidental alteration of hard-coded pricing/configuration values;
- visual regressions caused by touching the current CSS cascade;
- losing historical assets before replacement visuals are approved;
- product-claim drift during copy/layout reconstruction.

### Medium

- mobile regressions from reusing fixed desktop artboard assumptions;
- mismatch between new frontend and future Admin data structure;
- SCADA/Intelligence screenshots becoming detached from approved product logic;
- contact form being visually enabled before backend reliability is ready.

### Low but important

- broken internal anchors;
- asset-path changes;
- metadata/canonical errors during page expansion;
- favicon/CNAME deployment mistakes.

---

## 24. Safe migration sequence

Follow the project stage order:

`AUDIT → INFORMATION ARCHITECTURE → WIREFRAME → VISUAL SYSTEM → HERO/first screens → rest of homepage → MOBILE → SEO/PERFORMANCE → ADMIN → QA → RELEASE`

For implementation stages:

1. create/use a separate working branch;
2. keep `main` production-safe;
3. migrate one accepted layer at a time;
4. do not delete old source assets prematurely;
5. validate prices/configuration data before each release;
6. maintain rollback capability;
7. after every significant stage, save a review document under `docs/website/` and stop at `REVIEW` until approval.

---

## 25. Audit limitations

This R1 is a source-repository technical audit based on the audited `main` state at commit `31902b6f5ce5173eddedaad871c812fc704aa0d0`.

It does not claim to be:

- a redesign proposal;
- a marketing review;
- an SEO strategy approval;
- a product-function approval;
- a live production infrastructure/security audit;
- a backend audit, because no backend is present in the audited repository;
- a Lighthouse/Core Web Vitals field-data report.

Those items require their own later stage or explicit task.

---

## 26. Stage result

**Document:** `BB610 WATER — CURRENT WEBSITE TECHNICAL AUDIT R1`

**Status:** `REVIEW`

The audit stage is complete. In accordance with `docs/website/WORKFLOW.md`, no next website stage is to be started until the supervising BB610 Water chat / owner reviews and accepts this result.
