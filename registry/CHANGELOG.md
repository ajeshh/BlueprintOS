# BOSS Changelog

Each entry = a BOSS version. `/boss-sync` reads this to tell a project what's new since its pin.

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
