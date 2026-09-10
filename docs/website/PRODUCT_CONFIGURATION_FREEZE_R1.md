# BB610 WATER — PRODUCT CONFIGURATION FREEZE R1

- **Status:** FREEZE
- **Date:** 2026-09-10
- **Scope:** public commercial version naming and zone configuration matrix for the new BB610 Water website
- **Authority:** product owner clarification, accepted by supervising BB610 Water chat

## 1. Current public commercial versions

The current commercial product line for the new website is:

1. **I**
2. **F1**
3. **F1-P**
4. **F1-PE**
5. **F2**
6. **F2-P**
7. **F2-PE**

Do not use the obsolete public naming `F1-PH`, `F2-PH`, `F1-EC`, `F2-EC` as separate commercial versions in the new site architecture.

## 2. Meaning of version suffixes

- **I** — irrigation only; no fertigation and no P / PE variant.
- **F1** — one fertigation channel.
- **F2** — two fertigation channels.
- **P** — version with pH management/control.
- **PE** — pH + EC.

Important functional boundary:

**EC in PE means EC monitoring and deviation notification. It must not be presented as automatic closed-loop EC correction.**

pH management/correction is shown only for the applicable P / PE versions.

## 3. Zone configurations

Every commercial version is combined with one of three zone configurations:

- **Z4(8)** — 4 zones installed/base, expandable to 8.
- **Z8(12)** — 8 zones installed/base, expandable to 12.
- **Z12(16)** — 12 zones installed/base, expandable to 16.

## 4. Commercial matrix

| Version | Z4(8) | Z8(12) | Z12(16) |
|---|---|---|---|
| I | ✓ | ✓ | ✓ |
| F1 | ✓ | ✓ | ✓ |
| F1-P | ✓ | ✓ | ✓ |
| F1-PE | ✓ | ✓ | ✓ |
| F2 | ✓ | ✓ | ✓ |
| F2-P | ✓ | ✓ | ✓ |
| F2-PE | ✓ | ✓ | ✓ |

Total: **7 versions × 3 zone configurations = 21 commercial configurations**.

## 5. Data/Admin rule

Do not model these as 21 unrelated products.

The data model must keep at least two dimensions:

- `product_version` — one of the seven versions;
- `zone_configuration` — one of the three zone configurations.

Pricing and other combination-specific commercial data attach to the relationship between those dimensions.

This allows the Water Admin to manage version data, zone data and prices without rebuilding public HTML.

## 6. Relationship to R02

This document resolves **Decision 1** in `R02_INFORMATION_ARCHITECTURE.md` and supersedes the legacy version names found in the current production website for all new website work.

Do not rewrite the historical R02 audit/IA merely to erase what was observed in the old site. R02 remains an accurate record of the source state. From Task 03 onward, this FREEZE is the authoritative commercial naming source.

## 7. Change control

Status is **FREEZE**.

Do not rename, remove or add commercial versions or zone configurations in subsequent website work without an explicit new product-owner decision and a superseding configuration-freeze document.
