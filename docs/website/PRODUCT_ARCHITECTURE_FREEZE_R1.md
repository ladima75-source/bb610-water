# BB610 WATER — PRODUCT ARCHITECTURE FREEZE R1

- **Status:** FREEZE
- **Date:** 2026-09-10
- **Scope:** public product hierarchy and naming for BB610 Water website
- **Authority:** product owner decision, accepted by supervising BB610 Water chat

## 1. Master product

### BB610 WATER

**BB610 WATER is the complete product/system.**

It is the umbrella commercial name for the professional solution as a whole: physical equipment, automation/control, user interfaces and intelligent layer.

Do not rename the complete system to BB610 PULS or PULS WATER.

This preserves the BB610 ecosystem/category architecture in which WATER is the water/irrigation direction.

## 2. Physical/product layer inside BB610 WATER

The physical system architecture remains:

- **CONTROL**
- **HYDRAULIC**
- **ZONE**

These are modules/components of BB610 WATER, not competing master brands.

Commercial hardware/configuration versions remain governed by `PRODUCT_CONFIGURATION_FREEZE_R1.md`:

- I
- F1
- F1-P
- F1-PE
- F2
- F2-P
- F2-PE

combined with:

- Z4(8)
- Z8(12)
- Z12(16)

## 3. Software/control layer

### BB610 PULS

**BB610 PULS is the main control software / SCADA interface for BB610 WATER.**

Public role: the operator's main working environment for monitoring and controlling BB610 WATER.

Do not use generic `SCADA` as the primary public product name where the branded software name should be shown. `SCADA` may be used as a technical descriptor/explanation.

Recommended semantic relationship:

**BB610 WATER — the system**

**BB610 PULS — its main control software / SCADA**

## 4. Mobile layer

### BB610 PULS MOBILE

**BB610 PULS MOBILE is the mobile control/monitoring interface for BB610 WATER.**

It belongs to the PULS control family and should not be presented as an unrelated product.

Public relationship:

**BB610 PULS → BB610 PULS MOBILE**

Desktop/SCADA and mobile interfaces may have different UX scope; do not imply feature parity unless specifically validated.

## 5. Intelligence layer

### BB610 INTELLIGENCE

**BB610 INTELLIGENCE is the intelligent/analytical layer of BB610 WATER.**

Its role is analysis, diagnostics, detection of meaningful deviations and recommendations/advisory functions within validated product capabilities.

It does not replace the user as agronomic decision-maker and must not be presented as autonomous agronomy.

It also does not replace PLC/local safety logic for critical control/protection.

Intelligence availability/capability may depend on entitlement/subscription level; public claims must remain capability-driven and validated.

## 6. BB610 SYSTEM

### Public status: RESERVED / DO NOT USE

`BB610 SYSTEM` currently has no sufficiently distinct approved public role.

Do not place it in website navigation, product hierarchy, HERO, product cards or diagrams as a public brand/product until a separate owner decision assigns it a clear function.

The generic word `system` may of course be used descriptively, e.g. `система BB610 WATER`.

Do not create an artificial hierarchy such as:

`BB610 WATER → BB610 SYSTEM → BB610 PULS`

## 7. Approved public hierarchy

```text
BB610 WATER
│
├── Physical system
│   ├── CONTROL
│   ├── HYDRAULIC
│   └── ZONE
│
├── BB610 PULS
│   └── BB610 PULS MOBILE
│
└── BB610 INTELLIGENCE
```

Commercial configurations (I/F1/F1-P/F1-PE/F2/F2-P/F2-PE + ZONE configuration) describe how BB610 WATER is equipped; they are not siblings of PULS or INTELLIGENCE in the brand hierarchy.

## 8. Website implications

From R03.1 onward:

1. Use **BB610 WATER** as the master product/system name.
2. Replace generic/legacy public `SCADA` naming with **BB610 PULS** where referring to the branded control software; retain `SCADA` only as explanatory technical terminology where useful.
3. Use **BB610 PULS MOBILE** for the mobile interface.
4. Use **BB610 INTELLIGENCE** for the intelligent layer, with qualified claims only.
5. Do not publicly use **BB610 SYSTEM** until explicitly unfrozen with a defined role.
6. Product/system diagrams and site architecture must distinguish physical architecture from software/intelligence architecture without making them look like unrelated products.
7. Real PULS screens remain proof of the real product; do not redraw fake states for marketing convenience.

## 9. Naming principle

Do not dilute the master category name by renaming the overall product `PULS` or `PULS WATER`.

`WATER` answers **what complete professional system the customer is buying**.

`PULS` answers **where/how the customer operates and sees that system**.

`INTELLIGENCE` answers **what analytical/intelligent layer helps interpret the system's data**.

## 10. Change control

Status: **FREEZE**.

Any future change to the roles/names `BB610 WATER`, `BB610 PULS`, `BB610 PULS MOBILE`, `BB610 INTELLIGENCE` or the reserved status of `BB610 SYSTEM` requires an explicit product-owner decision and a superseding architecture-freeze document.
