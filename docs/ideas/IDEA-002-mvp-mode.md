---
id: IDEA-002
type: idea
owner: pm
status: ready
created: 2026-05-21
---

# Author MVP mode (L1-mvp)

## Current shape
- **What:** The "ready to build the first working version" layer. Authored by **extracting the
  practices already working in this very repo UP** into `stages/L1-mvp/{manifest.json,template/}`.
- **Contents:** `/spec` + `FEAT-NNN`, `/smoke` build gate (stack-configured), devlog + `/log`,
  `/close` + `RESUME.md` convention, `tester` + `program-manager` agents. Additive `claude-append.md`.
- **Who it's for:** any project graduating from Quickstart; BOSS itself (currently MVP, hand-retrofitted).
- **Smallest version:** manifest + template with the skills/agents above; `boss unlock mvp` works;
  additive CLAUDE.md append (no overwrite of user files).

## Capture log
- 2026-05-21 — `applyStage` overwrites files; MVP must add NEW files only + append to CLAUDE.md via a `claude-append.md` mechanism (build into `boss unlock`).

## Open questions
- `/smoke` is stack-specific — template ships a placeholder smoke skill the spin-up fills per stack.

## Canvas
_Covered by BOSS's overall canvas ([CANVAS.md](CANVAS.md))._
