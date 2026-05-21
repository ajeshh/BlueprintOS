# BOSS Changelog

Each entry = a BOSS version. `/boss-sync` reads this to tell a project what's new since its pin.

## 0.4.0 — 2026-05-21

- **Quickstart becomes a tiny incubator:** capture → keep adding → canvas → unlock MVP.
- `/triage` rewritten as **living idea capture** — one evolving doc per idea (sharpening
  "current shape" + append-only capture log). Re-run anytime to keep adding.
- New `/canvas` skill: a **humane business pressure-test** — Ajesh Shah's Humane Product Canvas
  (Human Foundation / Product Expression / Stewardship) as the spine, with Lean + Lenny-style
  prompts folded into each cell, plus the incubation heartbeat (riskiest assumption + one
  experiment this week). Acts as the Quickstart→MVP graduation gate.
- North star recorded: BOSS is a just-in-time startup incubator — the right support shows up per mode.

## 0.3.0 — 2026-05-20

- Stages renamed to **modes** (the user's vocabulary): Quickstart → MVP → V1 → Scale
  (folder ids `L0-quickstart` / `L1-mvp` / `L2-v1` / `L3-scale`).
- `boss unlock` accepts mode names, levels, or full ids (`mvp`, `L1`, `L1-mvp`).
- `boss new` / `status` / `list` display the mode name; `.boss/manifest.json` records `mode`.
- _Migration note:_ projects created on ≤0.2.0 carry the old `L0-sketch` stage label in their
  stamp; cosmetic only — `unlock`/`status` still work. A future `/boss-sync` will reconcile labels.

## 0.2.0 — 2026-05-20

- `/boss` spin-up skill (L0): reads a PRD/idea → shapes via pm lens → captures IDEA-001 →
  recommends stack + stage → optionally creates a **private** GitHub repo with a license.
- Repo-creation defaults (in `.boss/config.json`): `github: ask`, `visibility: private`,
  `license: proprietary` (All Rights Reserved — keeps paid + OSS options open; relicense later).
- Auto-sets repo-local GitHub noreply email to avoid the GH007 email-privacy push block.

## 0.1.0 — 2026-05-20

- Walking skeleton: `boss new` / `unlock` / `status` / `list` / `version`.
- L0 · Quickstart stage authored (CLAUDE.md, pm + coder-generalist agents, /triage, ideas pool, IDS).
- Registry + `.boss/` project stamp + version-pinning.
- L1–L3 stages stubbed (manifests/templates not yet authored).
