# BB610 Water — Website workflow

## Purpose
This folder is the handoff point between the Website Developer chat and the supervising BB610 Water chat.

The owner should not have to copy reports between chats.

## Required document flow
For every significant website stage, the developer must save the review document here before asking for approval.

Naming:
- `R01_CURRENT_WEBSITE_TECHNICAL_AUDIT.md`
- `R02_INFORMATION_ARCHITECTURE.md`
- `R03_WIREFRAME.md`
- `R04_VISUAL_SYSTEM.md`
- etc.

Each document must start with:
- document name;
- revision;
- status: `DRAFT`, `REVIEW`, `PASS`, or `FREEZE`;
- date;
- source branch/commit if code is involved.

## Status rule
`DRAFT -> REVIEW -> PASS -> FREEZE`

`REVIEW` means work on the next stage stops until the supervising chat/owner approves it.

`PASS` means the result is accepted for the current stage.

`FREEZE` means the accepted item must not be changed by later work without an explicit change decision.

## Production rule
The production site and `main` must not be changed as part of documentation/review stages unless explicitly approved.

## Source of truth
GitHub is the working source and history. Accepted releases must also be exportable as a complete local/Google Drive backup. Critical project sources must never exist only in a chat, browser session, developer machine, or server.

## Developer handoff rule
When a stage is ready for review, the developer must:
1. save the complete review document in `docs/website/`;
2. mark it `REVIEW`;
3. report the exact path and commit SHA;
4. stop before the next stage.

The supervising chat can then read the document directly from GitHub and issue review findings without the owner acting as a courier.
