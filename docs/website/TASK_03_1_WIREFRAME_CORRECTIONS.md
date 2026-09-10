# BB610 WATER — TASK 03.1 / WIREFRAME CORRECTIONS

- **Task:** 03.1
- **Status:** ASSIGNED
- **Date:** 2026-09-10
- **Input:** R03 REVIEW, `PRODUCT_CONFIGURATION_FREEZE_R1.md`, `PRODUCT_ARCHITECTURE_FREEZE_R1.md`
- **Goal:** correct R03 before visual-system work
- **Production/code:** DO NOT CHANGE

## 1. Preserve what already works

Do not restart R03. Preserve its accepted core commercial argument:

1. actual-result differentiation;
2. mechanism / flow-based verification;
3. real product-software proof;
4. owner/manager operational value;
5. system/configuration/value path;
6. primary CTA `Підібрати конфігурацію`.

HERO Variant A remains the preferred working direction unless a correction below requires a small structural adjustment.

## 2. Apply PRODUCT ARCHITECTURE FREEZE R1

The authoritative public hierarchy is now:

```text
BB610 WATER
├── physical system: CONTROL / HYDRAULIC / ZONE
├── BB610 PULS
│   └── BB610 PULS MOBILE
└── BB610 INTELLIGENCE
```

`BB610 SYSTEM` is RESERVED / DO NOT USE publicly until a future explicit decision.

### Naming corrections

- BB610 WATER = complete system/product.
- BB610 PULS = main control software / SCADA interface.
- BB610 PULS MOBILE = mobile control/monitoring interface.
- BB610 INTELLIGENCE = intelligent/analytical layer with qualified capability-driven claims.
- `SCADA` may remain as a technical descriptor, but do not use it as the primary branded product name where `BB610 PULS` is meant.

Update the wireframe/content architecture accordingly.

## 3. Configuration-selection correction

The frozen commercial versions are real public versions:

- I
- F1
- F1-P
- F1-PE
- F2
- F2-P
- F2-PE

with Z4(8), Z8(12), Z12(16).

You may visually group F1 and F2 families to help comprehension, but the UI/result must not imply that the public product is merely `F1 + optional P + optional PE` or `F2 + options` if this obscures the actual version name.

Every final selection/result must clearly resolve to an authoritative version + zone configuration, e.g.:

**F1-PE / Z8(12)**.

The data model remains two primary dimensions: product version × zone configuration, with combination-specific price/HMI data.

## 4. Reduce homepage length

R03 currently risks becoming another long technical landing page.

Revise the homepage to target approximately **7–8 meaningful sections/screens**, not 11 separate conceptual blocks, while preserving the commercial proof chain.

Specifically evaluate merging/condensing:

- FIT/relevance into owner-value or configuration entry;
- PRODUCT BOUNDARY into system architecture;
- ECOSYSTEM into the WATER/PULS/PULS MOBILE/INTELLIGENCE product architecture rather than a detached promotional section;
- final conversion into pricing/configuration where possible without losing a clear closing CTA.

Do not compress by simply deleting important evidence. Combine related questions into stronger sections.

For the revised homepage, explicitly list the final recommended section count/order and one-sentence job of each section.

## 5. PULS proof architecture

Revise all generic SCADA proof references using the new naming hierarchy.

Real **BB610 PULS** screens should prove the operating reality of BB610 WATER.

For each PULS screenshot/crop placement state:

- exact claim it proves;
- type of screen/crop required;
- whether an existing approved asset appears sufficient;
- otherwise mark `ASSET/PROOF NEEDED`.

Never invent a convenient fake PULS/SCADA state.

PULS MOBILE should be shown only where it proves useful mobile monitoring/control; do not imply desktop/mobile feature parity without validation.

INTELLIGENCE should be present only as a qualified layer, not as an AI spectacle and not as autonomous agronomy.

## 6. Lead-form correction

Reconsider the ambiguous R03 field `irrigation type`.

The first-contact flow should gather only information that helps us understand/route the lead and suggest a configuration without asking the customer to complete an engineering questionnaire.

Propose the best minimal field set and explain why each field is needed.

Consider whether the useful distinction is one or more of:

- type of operation/object/crop;
- approximate number of zones;
- irrigation method;
- fertigation need/channels;
- pH requirement;
- contact.

Do not force the visitor to know BB610 terminology before contacting us.

If a visitor arrives from a selected version/configuration, attach that selection automatically rather than asking again.

## 7. Product/System page correction

The page must now explain two coordinated layers without confusion:

### Physical BB610 WATER
CONTROL / HYDRAULIC / ZONE

### Control/intelligence of BB610 WATER
BB610 PULS / BB610 PULS MOBILE / BB610 INTELLIGENCE

Do not create the impression that the customer must buy several unrelated brands to obtain one working system.

The complete product is BB610 WATER.

## 8. Deliverable

Create:

`docs/website/R03_1_WIREFRAME_CONTENT_ARCHITECTURE.md`

Status: REVIEW.

This may be a corrected full R03 or a complete delta plus an explicit final revised homepage/page structure. It must be unambiguous enough that Task 04 can use it without having to reconcile R03 and R03.1 manually.

## 9. Do not do yet

- no production changes;
- no site code;
- no final graphic design;
- no final typography/color freeze;
- no Admin implementation;
- no invented product capabilities;
- no public BB610 SYSTEM;
- no Task 04 until R03.1 receives PASS.

## 10. Handoff

Save R03.1 in `docs/website/`, commit, mark REVIEW, report path + commit SHA, and stop.
