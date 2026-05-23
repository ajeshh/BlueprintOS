# BOSS Changelog

Each entry = a BOSS version. `/boss-sync` reads this to tell a project what's new since its pin.

## 0.16.0 — 2026-05-22

- **The eval-loop closed — conscience now has evals + structured output (proves IDEA-008's
  primitive on its first real run).** Two ladders climbed at once: produced the conscience eval
  set (the artifact the advisory pass / playbook said BOSS most needed) AND validated the loop
  primitive from IDEA-008 by running ONE loop end-to-end. Both succeeded.
  - **84 labeled eval examples** (43 moment-1 caution + 41 moment-2 Done!) in
    `docs/architecture/conscience-evals/{moment-1-caution,moment-2-done}.yml`. Should-fire +
    categorized should-NOT-fire entries (failure_mode taxonomy per Husain's discipline:
    `over-fires-on-fresh-project`, `fires-mid-other-work`, `repeats-itself`, `shame-toned`,
    `false-positive-canvas-exists`, `false-positive-not-drift`, `acknowledged-already`,
    `fires-too-early`, `performed-warmth`, `removes-agency`, `riskiest-assumption-stale`,
    `triggered-by-trivial-change`). Each example has structured `project_state` (the synthetic
    docs/ideas/ tree the runner builds in a temp dir) + `expected_detection`.
  - **Zero-dep Node runner** at `docs/architecture/conscience-evals/runner.js` — includes a
    minimal YAML parser for the subset our eval files use (so the data stays human-readable
    without breaking the zero-dep rule). Constructs synthetic state, invokes the actual hook,
    parses output, asserts. Reports per-example + a categorized summary table.
  - **Hook refactored to structured output** (Liu's discipline): now ships
    `{moment, confidence, evidence: {capture_count, canvases_with_filled_assumption,
    active_idea_count}, suppress_if}` in addition to the `additionalContext` string. Model still
    composes the voice; hook ships a schema.
  - **3 real bugs caught and fixed by the eval set itself** (Husain's "look at your data"
    discipline in action):
    1. Single-char placeholders like `?` slipped through the riskiest-assumption regex.
       Tightened to require ≥3 alphanumeric chars (rejects `?`, `??`, `_TBD_`, empty, etc.).
    2. Hook counted captures across *all* ideas — including `status: dropped`. Drift signal
       from already-walked-away ideas is meaningless. Hook now filters active vs. dropped.
    3. Filled canvases on dropped ideas were stopping the "validated" check. Same fix:
       active-status filtering on canvas checks too.
  - **Runner results: 43/43 pass on every runnable case. 41 skipped as categorized future-work**
    (moment-2 lives in `/canvas` skill prompt not a hook; suppress_if cases need session-state /
    devlog awareness; signal-text violations need a separate runner — all explicitly tracked).
  - **IDEA-008 primitive verdict — ready to promote to FEAT.** The four-field shape (entry,
    purpose, exit, drift) held up. The predicate vocabulary (`exists`, `contains`,
    `count_at_least`, `recorded_at`) survived contact with reality. Multi-part exit artifacts
    work. Skip-with-reason is the right runner pattern. ~half of examples test future features
    (suppress_if + devlog + skill-based detection), which is the right ratio — the eval set
    is forward-looking, not just current-implementation snapshot. One real shape-question
    surfaced (moment-2 isn't hook-detected — argues for a `runner_type` field on loop specs).
  - First loop authored: `docs/loops/eval.md` — the eval-loop spec using the four-field primitive
    with predicates in YAML frontmatter. The template for every future loop.

## 0.15.0 — 2026-05-22

- **BOSS now has its full mentor board seated, and the board has had its first session on BOSS
  itself.** Step back before the next build axis: identify and instantiate all the experts we'd
  want consulting on how to build an AI-native MVP right, then have them actually review BOSS.
  - **8 mentor agents live in this repo's `.claude/agents/`** (BOSS-local; the project-as-its-own-
    founder): `mentor-venture` (cornerstone), `mentor-architect`, `mentor-gtm` (the three that
    already existed in stage templates, now BOSS-tuned), plus 5 new: `mentor-business`,
    `mentor-fundraising`, `mentor-pitch`, `mentor-talent`, `mentor-humane`. Each cites the
    practitioners from `docs/mentor-practitioners.md` it draws on — no agent impersonates a
    person; mentors cite named practices (per the encoding decision in `docs/MENTORS.md`).
  - **`mentor-humane` carries explicit override authority** when a humane concern is on the table
    — the conscience's conscience. Seated from day one despite the Scale-level slot in the
    roster, because BOSS itself is the special case (it has to *be* humane in its construction,
    not just preach it).
  - **`mentor-architect` retuned for the AI-native MVP era** (both BOSS-local and the MVP template
    in `stages/L1-mvp/template/.claude/agents/`). Leads with AI as the modality; classical-stack
    choices are supporting cast. Names the load-bearing AI questions: surface, eval strategy,
    prompt vs. fine-tune vs. RAG, structured outputs, human-in-loop boundaries, cost/latency
    budgets, fallback. Cites Karpathy, Willison, Husain (evals — load-bearing), Liu (structured
    outputs — load-bearing), Mollick, Huyen.
  - **First advisory pass captured at `docs/dossier/boss-advisory-pass-001.md`.** Honest, not
    flattering. Each mentor's read on BOSS as-of v0.14.0, citing their practitioners. Five
    cross-cutting themes converged: (1) pause "more features" to earn founder contact; (2) evals
    are the next architecture investment (moments #3/#4 should be eval-set-first); (3)
    right-sized is the default shape (calm-company / OSS / patronage, not venture); (4) interior
    story rich, exterior story missing (strangers can't read the README); (5) the conscience is
    the moat *and* the most under-validated thing — plug this gap first.
  - **Next moves (re-ordered by the pass — supersedes the prior queue):** conscience-evals doc +
    structured hook output, *then* moments #3/#4; 5 real-founder Mom-Test interviews; Dunford
    positioning exercise + strangers-can-read-it README; humane upgrades to the conscience spec
    (cumulative-pressure check, BOSS.DK exemplar lines, cross-link humane practitioners into
    architect's lens); name the right-sized shape on the canvas.

## 0.14.0 — 2026-05-22

- **MVP mode (L1-mvp) is authored — `boss unlock mvp` works for real (closes IDEA-002).** Until now
  the L1 stage was a placeholder README; unlocking MVP errored out as "not authored yet." This release
  extracts this repo's own MVP practice UP into a real `stages/L1-mvp/{manifest.json,template/}`:
  - **Skills:** `/spec` (promote `IDEA-NNN` → `FEAT-NNN` with goal, acceptance criteria, smoke check,
    out-of-scope), `/smoke` (stack-configured build-health gate; saves the command to `.boss/smoke.json`
    on first use), `/log` (append-only `docs/devlog.md` — newest at the top, dated, FEAT-tagged),
    `/close` (session-end ritual that rewrites `docs/RESUME.md` and runs `/log`).
  - **Builder agents:** `tester` (owns `/smoke` + FEAT acceptance — surfaces, doesn't fix),
    `program-manager` (the *when* — sequences FEATs, names blocks, distinct from `pm`'s *what*).
  - **Mentor agents (advisory, never code):** `mentor-architect` (load-bearing decisions: data shape,
    boundaries, what to defer — the calibration against over-architecting an MVP) and `mentor-gtm`
    (first 100 users, channels, message — earned-when-needed, humane before viable).
  - **Additive CLAUDE.md** via `claude-append.md` — the mechanism shipped in v0.8.0 finally has its
    first real consumer. MVP's working rules (spec → smoke → log → close loop, conscience still runs)
    fold into the existing CLAUDE.md under the `boss:L1-mvp` marker; never overwrites Quickstart's rules.
  - **`boss sync` carries it for free** — the manifest's agents/skills are picked up by `managedFiles`
    in `src/sync.js`, so projects pinned at older versions get the MVP files via `/boss-sync` once they
    unlock the layer. (Hooks list is empty in this manifest — moments #3/#4 remain TBD.)
  - Tested in `/tmp`: scaffolded a Quickstart project, `boss unlock mvp` added 4 skills + 4 agents,
    appended the MVP working-rules block to CLAUDE.md, updated the stamp (`L0-quickstart → L1-mvp`,
    merged agents/skills), kept Quickstart files untouched, re-running unlock no-ops cleanly, `boss
    sync` recognizes everything as up-to-date.

## 0.13.0 — 2026-05-21

- **`boss sync` now carries hooks + settings (closes the conscience's reach gap).** Until now the
  conscience hook (v0.12.0) reached *new* projects only — `boss sync` carried skills/agents but not
  hooks or `settings.json`, so existing projects (e.g. `betabeta`) couldn't get it. Fixed:
  - **Hook scripts sync like any managed file** — `manifest.hooks` → `.claude/hooks/<name>.sh`, shown as
    `new`/`changed`/`ok` in the preview, written on `--apply`.
  - **Hook registrations merge into `.claude/settings.json` additively** — `boss sync` adds the
    `UserPromptSubmit` (etc.) entries BOSS ships, **matched by command so it's idempotent**, and
    **preserves the user's permissions and their own hooks.** It's the one user-editable file sync
    touches, and only the `hooks` block. (`computeSettingsMerge` in `src/sync.js`.)
  - The `.boss` stamp now tracks `hooks` (alongside agents/skills); `boss new`/`unlock` record them.
  - `/boss-sync` skill narrates the new behavior. Tested in `/tmp`: an "old" project (no hook,
    permissions-only settings, pinned 0.10.0) → sync adds the hook + merges settings (permissions
    preserved) + bumps the pin; idempotent on re-run.
  - **Existing projects can now `boss sync --apply` (or `/boss-sync`) to receive the conscience.**

## 0.12.0 — 2026-05-21

- **The conscience can now speak *unprompted* (spike → shipped).** Until now both moments only fired
  when you ran a skill (`/triage`, `/canvas`). A new **`UserPromptSubmit` hook** lets moment #1
  ("what does this prove?") surface on its own:
  - `.claude/hooks/conscience.sh` — detection only: if ≥3 dated capture-log entries exist across
    `docs/ideas/` and no canvas has a *filled* riskiest assumption (capturing-lots / validating-nothing),
    it returns `additionalContext` — a **signal**, not canned copy. Claude keeps the voice and the
    judgment: it decides whether the moment fits, says it once in BOSS's register, or stays silent.
  - Registered in the template `.claude/settings.json`; invoked via `bash …` so it needs no execute bit.
    `manifest.json` hooks: `["conscience"]`.
  - Confirms the architecture for the remaining moments: **hook = detection, model = tact + voice.**
  - _Caveats:_ reaches **new** projects only (`boss sync` doesn't carry `settings.json`/hooks yet); the
    *feel* (wise vs. naggy) still needs live validation, like moment #1 in `betabeta`.

## 0.11.0 — 2026-05-21

- **The conscience — second moment: "Done!" (`/canvas` graduation).** The *affirming* register,
  counterpart to moment #1's caution. When the canvas holds up (most cells real + riskiest assumption
  has a validation plan), `/canvas` no longer just offers `boss unlock mvp` — it marks the threshold in
  two beats:
  - **Arrival** — names what became real (started with a hunch → now a specific person, real tension,
    sharp promise, a testable riskiest bet). Said plainly, let to land. Acknowledgment, not praise.
  - **Next doorway** — points at `boss unlock mvp` (build tools + next mentors) without rushing; the
    canvas keeps.
  - A threshold, not a finish line; never forced — the celebration is for when it's genuinely earned.
  - Completes the conscience's *two registers* (caution + completion) in Quickstart.

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
