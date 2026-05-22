---
id: RESUME
type: resume
owner: pm
status: active
updated: 2026-05-22 (v0.14.0)
---

# RESUME — BlueprintOS

**Read this first each session.** State + next tasks + open decisions for BOSS.

## What BOSS is
A just-in-time **startup incubator** (not just a scaffolder): `boss new` → open Claude → `/boss`.
Scaffolds at the right level of ceremony and grows the project through **modes**
(Quickstart → MVP → V1 → Scale), with two agent classes — **builders** (make the app) and
**mentors** (coach the founder). See [`PRINCIPLES.md`](../PRINCIPLES.md) and [`README.md`](../README.md).

## State (shipped, v0.14.0)
- **MVP mode is authored — `boss unlock mvp` works for real (v0.14.0, closes IDEA-002):** this repo's
  own MVP practice extracted UP into `stages/L1-mvp/{manifest.json,template/}`. Adds 4 skills (`/spec`
  for `IDEA→FEAT-NNN` promotion, `/smoke` build-health gate with stack-configured command saved to
  `.boss/smoke.json`, `/log` append-only devlog, `/close` session-end RESUME ritual), 2 builder agents
  (`tester` owns smoke+acceptance & surfaces-not-fixes; `program-manager` sequences FEATs — the *when*
  to `pm`'s *what*), and 2 mentor agents (`mentor-architect` for load-bearing tradeoffs + what to defer,
  `mentor-gtm` for first-100 / channels / humane-before-viable). Working rules fold into CLAUDE.md via
  the `claude-append.md` mechanism (first real consumer of the v0.8.0 plumbing) — never overwrites
  Quickstart. Tested end-to-end in `/tmp`: scaffold → unlock mvp → 4 skills + 4 agents added, MVP block
  appended under `boss:L1-mvp` marker, stamp merged correctly, re-unlock no-ops, `boss sync` recognizes
  all files as up-to-date. **The pipeline is now Quickstart → MVP for any project, via `boss unlock mvp`.**
- **The conscience — both registers live + can fire unprompted + reaches existing projects (v0.10.0–v0.13.0):** BOSS *behaves* like the build's conscience,
  not just skills you invoke. **This is the concrete output of the ethos work** (see the `boss-ethos` /
  `boss-voice` memories): catalyst/build-tool → conscience → 4 moments → seasoned-hand voice.
  - **Caution — "what does this prove?" (v0.10.0, in `/triage`):** when the active idea has ≥3 capture-log
    entries and no canvas with a filled riskiest assumption (capturing-lots / validating-nothing drift),
    `/triage` says one spare line, points at `/canvas`, hands the decision back — never blocks, never nags.
    Template `CLAUDE.md` names the conscience. **Validated live by Ajesh in `betabeta`.**
  - **Completion — "Done!" (v0.11.0, in `/canvas`):** at graduation (cells real + riskiest assumption has a
    validation plan), `/canvas` marks the threshold in two beats — *arrival* (name what became real) +
    *next doorway* (`boss unlock mvp`). A threshold, not a finish line; never forced. (Renamed from
    "Celebration of Done" → just **"Done!"** per Ajesh.) Tested in `/tmp`; registry pruned.
  - **Unprompted firing — solved (v0.12.0):** a `UserPromptSubmit` hook (`.claude/hooks/conscience.sh`,
    in the template) detects moment #1's drift and injects `additionalContext` — a *signal*, not canned
    copy — so Claude voices the nudge on its own, with judgment, even when you didn't run `/triage`. Settled
    the architecture for all moments: **hook = detection, model = tact + voice.** (Not `Stop` — that fires
    too late / has a block cap; `UserPromptSubmit` is the right event.) *Caveat:* the *feel* still needs
    live validation (in a fresh `boss new` project, or any existing one after `boss sync`).
  - **Reaches existing projects (v0.13.0):** `boss sync` now carries **hook scripts** (like skills/agents)
    and **merges hook registrations into `.claude/settings.json` additively** (matched by command,
    idempotent, preserves the user's permissions/hooks — `computeSettingsMerge` in `src/sync.js`). The
    stamp tracks `hooks`. So `betabeta` (and any pre-0.12 project) can now `boss sync --apply` / `/boss-sync`
    to receive the conscience. Tested in `/tmp`.
  - *Remaining moments:* **capture** (Principle 1/3 — reusable value at a breakpoint) and **restraint**
    (Principle 2 — premature ceremony), each needing detect-triggers (now buildable as hook + voice).
- **Mentor layer — structure (v0.9.0, IDEA-003 — building):** BOSS's second agent class.
  `docs/MENTORS.md` defines builders-vs-mentors, the roster + JIT-per-mode mapping, the founder
  dossier, and the hard line (no binding legal/financial advice; humane before viable). Cornerstone
  **`mentor-venture`** agent seeded into Quickstart (`library/agents/` + template + manifest) — coaches
  the founder, advisory only. *Remaining:* encode Ajesh's people-list UP via `/boss-learn`; author the
  rest of the roster as their modes get built; dossier templates.
- **Learning loop (v0.8.0, IDEA-001 — DONE):** the bidirectional loop from PRINCIPLES #1 is live.
  - `boss sync [--apply]` — pulls a project's installed-mode skills/agents to current (DOWN), previews
    new/changed/ok, reconciles stale labels (`L0-sketch`→`L0-quickstart`), bumps the `.boss` pin.
  - `boss learn <path> --as <cat>` — promotes a pattern UP into `library/<cat>/`, bumps
    VERSION+package.json+CHANGELOG. Finds the BOSS **source** repo via the registry self-hosted entry
    (or `$BOSS_SRC`) so it works from a global install.
  - `claude-append.md` in `boss unlock` — additive CLAUDE.md block under an idempotent marker (never overwrites).
  - Skills `/boss-sync` (narrate the diff, flag local edits) + `/boss-learn` (two-way UP/DOWN router).
  - **Proven:** `margin` synced 0.2.0 → 0.8.0 (now Quickstart; gained canvas/boss-sync/boss-learn).
  - New CLI modules: `src/sync.js`, `src/learn.js`. Tested in `/tmp`; registry pruned.
- **Package/dogfood separation (v0.7.0):** `package.json` `files` allowlist ships only the package;
  `docs/`, `.boss/`, root `CLAUDE.md` stay dev-only. Registry moved to `~/.boss/registry.json`
  (machine-local, out of the repo). `npm run pack:preview` verifies what ships.
- **CLI** (zero-dep Node): `boss new / unlock / status / list / version`. On PATH via `npm i -g .`.
- **Quickstart mode (L0) authored** — the incubator arc: capture → keep adding → canvas → unlock MVP.
  - Skills: `/boss` (spin-up), `/triage` (living idea capture), `/canvas` (Humane Product Canvas + lean/Lenny + heartbeat).
  - Agents: `pm`, `coder-generalist`. Repo-creation defaults in `.boss/config.json` (private/proprietary/ask).
- **Modes vocabulary** Quickstart/MVP/V1/Scale; `boss unlock` resolves mode name / level / id.
- **PRINCIPLES.md** (6 rules) + **design-system practice** (`library/practices/`).
- **BOSS now dogfoods itself** (v0.6.0): registered project, `.boss/` stamp (mode MVP, self-hosted),
  `docs/ideas/` (IDEA-001..003), own `CLAUDE.md` + `IDS.md` + this RESUME + its own `/canvas`.

## Next tasks (in order)
1. **IDEA-003 (finish) — Encode the people list.** Ajesh has a list of real people whose app-startup
   best-practices to encode. Get the list; decide person→mentor vs **archetype-seeded-by-named-practices**
   mapping (leaning archetype — see IDEA-003 open Qs); `/boss-learn` them UP into `library/practices/`
   (+ `memory-seed/`); have `mentor-venture` (+ now `mentor-architect`, `mentor-gtm`) cite them.
2. **Validate the conscience live.** v0.12.0 hook detection works but the *feel* (wise vs. naggy) still
   needs a real session — either a fresh `boss new` project or `boss sync --apply` on `betabeta`.
   Tune the signal language if it lands wrong.
3. **Conscience moments #3 (capture) and #4 (restraint) — detect-triggers.** Architecture settled
   (hook = detection, model = tact + voice); both moments need detectors. #3 = reusable value at a
   breakpoint (Principle 1/3); #4 = premature ceremony (Principle 2) — could plausibly fire from
   `/spec` when an idea is being specced without canvas validation.
4. **Self-eat the MVP mode.** BOSS is registered as MVP-mode and the L1-mvp template now exists —
   could plausibly `boss sync --apply` against this repo to import the new skills (`/spec`, `/log`,
   `/close`, `/smoke`) instead of hand-rolling them here. Or keep this repo hand-tuned and let MVP
   be defined by what it produces in other projects. Decide on evidence.
5. ~~IDEA-001 learning loop~~ — **DONE in v0.8.0**. ~~IDEA-003 mentor structure~~ — **DONE in v0.9.0**.
   ~~IDEA-002 MVP mode~~ — **DONE in v0.14.0**.

## Open decisions
- Sync of user-editable files: **settings.json `hooks` block now merges additively** (v0.13.0). Still open:
  CLAUDE.md and other settings.json keys (permissions etc.) = hand-merge for now.
- BOSS's own business model — open (canvas says don't monetize lock-in). Decide later, on evidence.
- Mentor agents' home: project `.claude/agents/` with `mentor-` prefix (leaning yes).
- Optional: scrub the old `registry/projects.json` (home path + `margin`) from git history. Removed
  going forward as of v0.7.0; only matters if the public history bothers you (needs force-push).

## Prompt for the next session
> Continue BlueprintOS (in ~/Projects/blueprintos). Read docs/RESUME.md and PRINCIPLES.md first.
> We're at v0.14.0. The pipeline is now real on both ends: **Quickstart → MVP works** for any
> project (`boss unlock mvp` adds `/spec`+FEAT, `/smoke`, `/log`+devlog, `/close`+RESUME, plus
> `tester`/`program-manager` builders and `mentor-architect`/`mentor-gtm`), and the **conscience**
> nudges from inside the build (moments #1 caution and #2 Done!; hook lets #1 fire unprompted; sync
> carries hooks to existing projects). DONE: learning loop (v0.8), mentor-layer structure (v0.9),
> conscience moments #1+#2 (v0.10–v0.13), MVP mode authoring (v0.14 — closes IDEA-002).
>
> Next, in order:
> 1. IDEA-003 (finish) — Ajesh has a list of real people whose app-startup best-practices to encode.
>    Get the list; map archetype-seeded-by-named-practices (leaning archetype); `/boss-learn` them UP
>    into library/practices/ + memory-seed/; have mentor-venture (+ now mentor-architect, mentor-gtm)
>    cite them.
> 2. Validate the conscience live (fresh `boss new` or `boss sync --apply` on betabeta) — tune signal
>    language if it lands wrong. Then build detect-triggers for moments #3 (capture) and #4 (restraint;
>    plausibly fires from `/spec`).
> 3. Decide: do we eat our own MVP-mode dogfood here (`boss sync --apply` against BlueprintOS to
>    import the new /spec etc. skills) or leave this repo hand-tuned and let MVP be defined by what
>    it produces in other projects?
>
> Per capability: bump VERSION + package.json (keep in sync) + add a registry/CHANGELOG.md entry +
> update this RESUME. Test the CLI in /tmp, prune /tmp entries from ~/.boss/registry.json, commit
> with the GH noreply env-var (never global config), push.

## Working reminders
- Commit with GH noreply env-var (never global config): `NR=$(gh api user --jq '"\(.id)+\(.login)@users.noreply.github.com"')`.
- After CLI changes: `npm i -g ~/Projects/BlueprintOS`, test in `/tmp`, prune `/tmp` entries from `~/.boss/registry.json` (registry is machine-local now, not in the repo).
- Keep `VERSION` and `package.json` version in sync. `npm run pack:preview` to confirm only the package ships.
- Every capability: VERSION bump + `registry/CHANGELOG.md` entry + update this RESUME.
