# BB610 WATER — R15 ASSET AUDIT

- **Status:** REVIEW SUPPORT
- **Date:** 2026-09-11
- **Scope:** repository/project-controlled website assets only
- **Rule:** use only current/public-safe material; no fake PULS UI; no INTERNAL engineering drawings as marketing art.

## Decision summary

### USE

| Path | Depicts | Currency | PUBLIC suitability | Decision |
|---|---|---|---|---|
| `assets/extracted/02_ae24f7eff9c5.webp` | approved BB610 WATER master logo | CURRENT | PUBLIC | **USE** — header/footer identity; original proportions |
| `assets/extracted/08_a48110ba0ba8.webp` | CONTROL module presentation visual | CURRENT | PUBLIC / already used on public production page | **USE** |
| `assets/extracted/09_63f4616bc782.webp` | HYDRAULIC module presentation visual | CURRENT | PUBLIC / already used on public production page | **USE** |
| `assets/extracted/10_131ed62b8eb2.webp` | ZONE module presentation visual | CURRENT | PUBLIC / already used on public production page | **USE** |

These four assets are integrated in `review/r15/`.

## HOLD / REJECT ledger

| Path | Depicts / known role | Currency | PUBLIC suitability | Decision / reason |
|---|---|---|---|---|
| `assets/extracted/01_340b1d74d092.webp` | unidentified extracted asset; not used by current accepted page | UNCERTAIN | UNCERTAIN | **HOLD** — no verified commercial role/provenance |
| `assets/extracted/03_0cc2412535aa.webp` | older CONTROL/equipment thumbnail from legacy hero | OBSOLETE / superseded | PUBLIC legacy | **REJECT** — superseded by `08…`; avoid mixed generations |
| `assets/extracted/04_b6d217f2d6e2.webp` | older HYDRAULIC/water-preparation thumbnail | OBSOLETE / superseded | PUBLIC legacy | **REJECT** — superseded by `09…` |
| `assets/extracted/05_51a8cdbf945a.webp` | older ZONE/collector thumbnail | OBSOLETE / superseded | PUBLIC legacy | **REJECT** — superseded by `10…` |
| `assets/extracted/06_9215e3523a6d.webp` | legacy BB610 Mobile phone visual | OBSOLETE / product naming predates current PULS structure | PUBLIC legacy but not current proof | **REJECT** for current site proof |
| `assets/extracted/07_6a43a9670399.webp` | legacy public process diagram (`Як це працює`) | UNCERTAIN against current product truth | PUBLIC legacy | **HOLD** — requires content revalidation before reuse; not needed by accepted R14 structure |
| `assets/extracted/11_a6fe97c15577.webp` | `BB610 Systems` mark in old production page | OBSOLETE / conflicts with architecture freeze | NOT suitable for current public architecture | **REJECT** — `BB610 SYSTEM` is reserved / do not use publicly |
| `assets/extracted/12_09ab0debbc03.webp` | old mobile interface screenshot | UNCERTAIN/legacy; not confirmed current PULS MOBILE | PUBLIC legacy but unverified current | **HOLD/REJECT AS PROOF** — no approved current PULS MOBILE mark/UI proof |
| `assets/extracted/13_b432ba406d4c.webp` | old SCADA screenshot | UNCERTAIN/legacy; not confirmed v0.28 | PUBLIC legacy but not valid current proof | **HOLD/REJECT AS PROOF** — current v0.28 screenshots still required |
| `assets/extracted/14_c6d554bdfa52.webp` | BB610 Intelligence mark from old public page | UNCERTAIN for current homepage need | PUBLIC legacy | **HOLD** — not required by accepted homepage; no reason to add another brand mark in R15 |
| `assets/extracted/15_e896512345a4.webp` | BB610 Intelligence UI visual | UNCERTAIN/currentness not validated | PUBLIC legacy | **HOLD** — outside current homepage proof scope; validate separately before future use |

## PULS audit

Repository contains historical/legacy interface imagery, but the exact current proof set required by the accepted website story is still absent. R11 established the expected current screenshots and R15 found no verified replacements:

1. `puls-new-task-v028.png` — zone + recipe + `ОБ’ЄМ / VOLUME` + target litres;
2. `puls-schedule-v028.png` — irrigation block + queued tasks;
3. `puls-main-v028.png` — target / actual / progress + relevant process readings.

**Decision:** keep the three deliberate commercial frames in R15. Do not use `12…` or `13…` as substitutes.

## Exact missing asset requests

### Required to complete current proof
- current approved real BB610 PULS v0.28 screenshot/crop — New Task;
- current approved real BB610 PULS v0.28 screenshot/crop — Schedule;
- current approved real BB610 PULS v0.28 screenshot/crop — MAIN.

### Not blocking staging candidate
- approved agricultural/context photography for HERO or installation context is optional; current explanatory HERO is complete without it.

## Physical modules

CONTROL / HYDRAULIC / ZONE are no longer asset-blocked in R15 because the repository already contains public presentation visuals `08…/09…/10…`. They are integrated with `object-fit: contain`, stable aspect ratios and buyer-facing captions; no equipment is fabricated.
