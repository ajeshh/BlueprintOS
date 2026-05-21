# BOSS Changelog

Each entry = a BOSS version. `/boss-sync` reads this to tell a project what's new since its pin.

## 0.10.0 — 2026-05-21

- **The conscience — first moment lands (`/triage` validation check).** BOSS starts behaving like the
  *build's conscience*, not just a set of skills you invoke. The first of four conscience moments —
  **"what does this prove?"** — is now baked into `/triage`:
  - **Fires when** the active idea has ≥3 capture-log entries and no canvas with a filled riskiest
    assumption (the "capturing lots, validating nothing" drift) — and *only* then.
  - **Says one spare line** in BOSS's voice (the seasoned hand): names the drift, asks what would make
    it real, points at `/canvas`, hands the decision back. Never blocks a capture, never nags.
  - Turns the validation thinking that already lived in `/canvas` + `mentor-venture` (invoke-only) into
    a *moment that fires* in the flow where drift actually happens.
  - Template `CLAUDE.md` names the conscience in the Quickstart arc.
  - Existing projects pick it up via `boss sync` / `/boss-sync`.

## 0.9.0 — 2026-05-21

- **Mentor layer — structure + cornerstone (IDEA-003).** BOSS's second agent class lands.
  - **`docs/MENTORS.md`** — the design: two classes (builders make the app, `mentor-*` coach the
    founder), the roster + JIT-per-mode mapping (venture → architect/GTM → fundraising/pitch/talent/
    business → humane), the founder **dossier** (canvas → proposal → architecture brief → pitch →
    hiring plan → data room), and the hard line (no binding legal/financial advice; humane before viable).
  - **`mentor-venture` agent** seeded into Quickstart (`library/agents/` + template + manifest). The
    cornerstone mentor: pressure-tests whether an idea is worth it, names the riskiest assumption,
    points at the next real step, owns the canvas conversation. Advisory only — never writes code/specs.
  - Existing projects pull `mentor-venture` + the new skills via `boss sync` / `/boss-sync`.
  - _Still open:_ encoding real practitioners' best-practices UP into `practices/` + `memory-seed/`
    (awaiting the list); authoring the rest of the roster as their modes get built.

## 0.8.0 — 2026-05-21

- **The learning loop (IDEA-001).** PRINCIPLES #1 made operational, in both directions:
  - **`boss sync [--apply]`** — brings a project's BOSS-managed skills/agents (across all its
    installed modes) up to the current version. Previews as `new` / `changed (N lines)` / up-to-date,
    reconciles stale mode labels (an old `L0-sketch` pin → `L0-quickstart`), and on `--apply` writes
    the files + bumps the project's `.boss` pin. Syncs BOSS-managed skills/agents only; user-editable
    files (`CLAUDE.md`, `settings.json`) are left for hand-merge.
  - **`boss learn <path> --as <category>`** — promotes a proven pattern UP into
    `library/<category>/` (`agents|skills|hooks|practices|memory-seed`), bumps `VERSION` +
    `package.json` in sync, and prepends a CHANGELOG stub. Finds the BOSS **source** repo via the
    registry's self-hosted entry (or `$BOSS_SRC`), so it works when `boss` runs from a global install.
  - **`/boss-sync` + `/boss-learn` skills** — the judgment layer. `/boss-learn` is a two-destination
    **router** (UP = BOSS superset practice; DOWN = harden into the app's own core), never one-way.
    `/boss-sync` narrates the diff from the CHANGELOG and flags local edits before overwriting.
- **`claude-append.md` support in `boss unlock`.** A mode template can carry a `claude-append.md`
  whose contents are *appended* to the project's CLAUDE.md under an idempotent marker — additive
  working rules, never an overwrite. (Needed by the MVP mode next.)

## 0.7.0 — 2026-05-21

- **Package / dogfood separation.** Clean boundary between the shippable package and BOSS's own
  incubation layer:
  - `package.json` `files` allowlist — only `bin/ src/ stages/ library/ VERSION PRINCIPLES.md
    registry/CHANGELOG.md` (+ README/LICENSE) ship. `docs/`, `.boss/`, root `CLAUDE.md`, and the
    local registry are never published. (`npm run pack:preview` to verify.)
  - **Registry moved out of the repo** to `~/.boss/registry.json` — machine-local state (your
    project list + absolute paths) no longer lives in (or leaks into) the package/repo.
  - `VERSION` and `package.json` version synced to 0.7.0.

## 0.6.0 — 2026-05-21

- **BOSS now dogfoods itself.** BlueprintOS is its own first registered project (`.boss/` stamp,
  mode MVP, self-hosted) — retrofitted ahead of the MVP-mode template, which will be *extracted UP*
  from this repo's working practice (Principle 1).
- Added BOSS's own dogfooded docs: root `CLAUDE.md`, `docs/IDS.md`, `docs/ideas/` (IDEA-001 learning
  loop, IDEA-002 MVP mode, IDEA-003 mentor layer), `docs/ideas/CANVAS.md` (BOSS's own Humane
  Product Canvas), and `docs/RESUME.md` (multi-session continuity).
- Recorded the **mentor layer** vision: two agent classes — builders (make the app) and mentors
  (coach the founder); mentors accumulate a founder dossier toward funding/hiring.

## 0.5.0 — 2026-05-21

- **PRINCIPLES.md** — BOSS's six operating principles. #1: always scaffolding, but pause to sort
  patterns UP (BOSS superset practice) or DOWN (app core); `/boss-learn` becomes a two-way router.
  #3: nothing valuable gets locked into code (style → tokens, prototypes reuse the same system).
- **Design-system practice** (`library/practices/design-system.md`) — generalized from dhun:
  tokens as single source of truth, central style utils, 5-state rule, prototype reuse, JIT
  enforcement (turns on at V1; seed tokens the moment real UI appears).
- V1 mode stub fleshed out with the design layer + enforcement timing.

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
