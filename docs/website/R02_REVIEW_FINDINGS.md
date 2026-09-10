# BB610 WATER — R02 REVIEW FINDINGS

- **Document reviewed:** `R02_INFORMATION_ARCHITECTURE.md`
- **Review date:** 2026-09-10
- **Decision:** PASS WITH OWNER DECISIONS REQUIRED BEFORE WIREFRAME FREEZE

## Overall assessment

R02 is accepted at the information-architecture level. The commercial sequence is strong and consistent with the product principle: actual execution is measured and verified rather than inferred from valve-open time. The proposed separation of homepage, product, configurations, technology and later solution/knowledge pages is suitable for a scalable commercial + SEO site.

The early Water Admin boundary is also accepted: configuration and pricing data must be data-driven from Release 1, with public desktop/mobile views consuming the same source.

## Accepted / frozen direction for next stage

1. Homepage narrative starts from actual-result control, not hardware.
2. First screens follow: differentiation → mechanism → real proof → owner/manager value.
3. CONTROL / HYDRAULIC / ZONE remains the product architecture.
4. Price appears after value/proof/context, not in HERO.
5. SCADA is used as real product proof, not decorative dashboard art.
6. EC remains monitoring/deviation notification; do not imply closed-loop EC regulation.
7. pH correction is shown only for applicable configurations.
8. Public configuration/pricing data is Admin-managed/data-driven from Release 1.
9. Mobile pricing must not be a forced horizontally scrolling desktop table.
10. Primary conversion direction is `Підібрати конфігурацію`.
11. No fake EN toggle.
12. No heavy CMS/framework without a demonstrated need.

## Corrections / clarifications carried into Task 03

### A. Version naming must be resolved before final configuration UI

R02 correctly flags current public names as requiring product validation. Do not visually freeze a configuration selector/table around obsolete names before owner confirmation.

### B. Release 1 scope should be controlled

The IA lists several standalone technology pages as must-have. During wireframing, do not allow these pages to delay a commercially complete homepage/product/configuration flow. Reuse a common page system and prioritize the conversion path.

### C. Admin architecture is early, Admin implementation is later

Wireframes/components for pricing must already assume structured data, but Task 03 must not implement backend/Admin.

### D. HERO numeric proof is explanatory, not telemetry theatre

A plan-vs-actual example such as 800/802 may be used to explain the principle, but should not become a fake live dashboard or imply that the displayed numbers are a real current installation unless explicitly sourced as such.

### E. Industry pages require differentiated evidence

Do not create thin berry/greenhouse pages just for keywords. Berry may be first later because domain knowledge is strongest, but only when the page has real differentiated content.

## Owner decisions still required

1. Confirm public Release 1 version names: current source contains `I, F1, F1-PH, F1-EC, F1-PE, F2, F2-PH, F2-EC, F2-PE`, while newer product architecture may differ.
2. Localization default accepted unless owner changes it: Release 1 Ukrainian only; EN later when complete.
3. Intelligence default accepted unless owner changes it: qualified ecosystem mention in Release 1, standalone page later.
4. Industry page default accepted unless owner changes it: no industry page is required to block Release 1; berry is first candidate when evidence/content is ready.

## Status

R02: **PASS**.

Do not change R02 content merely to restate these findings. Carry them forward into the next assigned task.
