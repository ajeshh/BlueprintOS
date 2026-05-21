---
id: IDEA-001
type: idea
owner: pm
status: ready
created: 2026-05-21
---

# Learning loop — `/boss-learn` (two-way router) + `/boss-sync`

## Current shape
- **What:** Close the bidirectional loop from PRINCIPLES #1. `boss learn` stages a proven pattern
  and routes it: **UP** into `library/` as a reusable superset practice (bump VERSION + CHANGELOG),
  or **DOWN** as guidance to harden it into the app's own core. `boss sync` brings an existing
  project's BOSS-managed files (skills/agents for installed modes) up to the current version, as a
  reviewable diff, then bumps the project's `.boss` pin.
- **Who it's for:** every connected project (esp. `margin`, stuck on v0.2.0) + BOSS itself.
- **Smallest version:** `boss sync` preview + `--apply` for skills/agents of installed modes;
  `boss learn <path> --as <category>` to copy a file UP + version bump. Skills wrap with judgment.

## Capture log
- 2026-05-21 — decided `/boss-learn` is a two-destination **router** (UP=BOSS practice, DOWN=app core), not one-way.

## Open questions
- Sync of user-editable files (CLAUDE.md, settings.json) — merge vs leave; v1 only syncs BOSS-managed skills/agents.

## Canvas
_Covered by BOSS's overall canvas ([CANVAS.md](CANVAS.md))._
