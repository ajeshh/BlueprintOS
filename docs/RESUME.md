---
id: RESUME
type: resume
owner: pm
status: active
updated: 2026-05-23 (v0.22.0)
---

# RESUME — BlueprintOS

**Read this first each session.** State + next tasks + open decisions for BOSS.

## What BOSS is
A just-in-time **startup incubator** (not just a scaffolder): `boss new` → open Claude → `/boss`.
Scaffolds at the right level of ceremony and grows the project through **modes**
(Quickstart → MVP → V1 → Scale), with two agent classes — **builders** (make the app) and
**mentors** (coach the founder). See [`PRINCIPLES.md`](../PRINCIPLES.md) and [`README.md`](../README.md).

## State (shipped, v0.22.0)
- **V1 mode authored — `boss unlock v1` works (v0.22.0):** the third macro stage real.
  3 new builder agents (`ui-designer`, `ux-designer`, `db-architect`), 4 template mentor
  copies (business / fundraising / pitch / talent — promoted from BOSS-local), 3 new skills
  (`/board`, `/design-review`, `/ux-check`), 1 new loop (`design-drift-loop` — V1-stage
  counterpart to MVP's design-tokens-loop; uses an *inverted* exit predicate where the bad
  signal triggers drift). End-to-end tested: `boss new → unlock mvp → unlock v1` lands 14
  agents + 15 skills + 6 loops + 1 hook across 3 installed layers. 43/43 evals regression-
  clean. The macro scaffold (Quickstart → MVP → V1) is now real for any project.
- **MVP discipline upgrades + IDEA-010 Phase 2 (v0.21.0):** Three new MVP skills (`/evals` —
  Husain; `/pretotype` — Savoia; `/design-tokens-init` — IDEA-010 Phase 2 with cohort-aware
  delivery), three new MVP-stage loops (`spec-loop`, `pretotype-loop`, `design-tokens-loop` —
  the last emitting a new `coherence` moment for system-vs-code drift), and `/spec` upgraded
  to include validated-learning field (Ries) + evals field (Husain) + moment #4 restraint
  check (skill-side detection of canvas-loop closure; Fitzpatrick-plain cohort-aware nudge
  when entry-unmet). Moment #3 deferred to v0.22 (needs different detector design). End-to-end
  tested; 43/43 evals regression-clean.
- **The three design changes from v0.19's persona-reactions pass — landed (v0.20.0):**
  (a) `boss status --conscience` inspect affordance (asked-for by eng-builder / indie-hacker /
  vibe-virtuoso personas); (b) cohort-aware conscience — `.boss/config.json` declares cohort,
  hook ships cohort framing in `additionalContext` so Claude composes the voice per cohort;
  (c) voice lineage Fitzpatrick consistently (indie-hacker caught the prior Fitzpatrick/Maurya
  mix). `/boss` skill now asks one optional question to set cohort during spin-up. 43/43
  evals regression-clean; end-to-end tested in /tmp. **Moments #3 (capture — reusable value)
  and #4 (restraint — premature ceremony) explicitly deferred to v0.21** — they need their own
  design (moment #3's detection is harder than predicate evaluation; moment #4 needs a spec-loop
  + skill-aware detection).
- **Proto-personas layer + first reactions pass (v0.19.0):** 8 persona agents in
  `.claude/agents/` with `persona-` prefix (`vibe-coder-newbie`, `eng-builder`,
  `non-tech-founder`, `first-product`, `vibe-virtuoso`, `indie-hacker`, `returning-founder`,
  `domain-expert`). The founder-experience eval channel parallel to the conscience-evals.
  `persona-reactions-loop` authored. First pass run against the conscience moment-1 firing
  scenario captured at
  [`docs/dossier/persona-reactions/conscience-moment-1.md`](dossier/persona-reactions/conscience-moment-1.md)
  — surfaced 3 concrete design changes (cohort-aware conscience; inspect affordance; pick the
  voice lineage) and 2 real surprises (returning-founder wants a *harder* question;
  indie-hacker caught a voice-fights-itself issue the eval set missed). 11 agents now (8
  mentors + 3 builders) + 8 personas + 7 builder agents — 26 agents in BOSS's own
  `.claude/agents/` total.
- **IDEA-008 promoted to FEAT-001 — generic loop runtime in Node; bash hook retired (v0.18.0):**
  the biggest architectural release since v0.8.0. The conscience hook is now a generic
  predicate evaluator that reads `docs/loops/*.md` from the project — *any* loop drifting fires
  *its* moment, no per-moment code. Moments #3 and #4 will be authored as loops (not new
  detectors) in v0.20. Two named loops shipped in the Quickstart template — `capture-loop`
  (structural — expresses dependencies for downstream loops) and `canvas-loop` (encodes
  moment-1's full logic declaratively via predicates). Settings migration handles
  bash→node transition for pre-0.18 projects. All 43 conscience-evals still pass against the
  generic runtime. The four-field primitive (entry / purpose / exit / drift) confirmed under
  contact with real Node code; predicate vocabulary covered everything moment-1 needed.
  BOSS dogfoods its own loops.
- **Builder team seated (v0.17.0):** three new builder agents in `.claude/agents/` —
  `designer` (UX of the entire interaction experience), `voice-keeper` (guards BOSS's voice
  consistency across every user-touching surface), `prompt-coach` (helps the founder learn to
  prompt — outward counterpart to voice-keeper). 11 agents now seated total (8 mentors + 3
  builders). The advisory-pass #1 (5 real-founder Mom Test calls) was explicitly overridden by
  Ajesh — first use of IDEA-008's override grammar — with re-open conditions captured. Roadmap
  published below: 10 releases sequenced v0.17 → v0.26.
- **Eval-loop closed — conscience has evals + structured output; IDEA-008 primitive validated
  (v0.16.0):** two ladders climbed at once. Produced the conscience eval set (84 labeled
  examples across 2 moments, categorized failure modes per Husain), zero-dep Node runner with
  a minimal YAML parser, hook refactored to structured `{moment, confidence, evidence,
  suppress_if}` output (Liu). **43/43 pass on every runnable case; 41 skipped as documented
  future-work** (moment-2 lives in /canvas skill; suppress_if + devlog awareness pending). The
  eval set itself caught + fixed **3 real bugs** (single-char placeholders, dropped-idea
  filtering on counts + canvas validation). IDEA-008's four-field primitive (entry/purpose/
  exit/drift) **held up** under contact with reality; the predicate vocabulary survived; the
  loop is ready to promote to FEAT. One shape-question surfaced (moment-2 isn't hook-detected
  — argues for a `runner_type` field). First loop authored at [`docs/loops/eval.md`](loops/eval.md).
- **Full mentor board seated + first advisory pass on BOSS itself (v0.15.0):** stepped back before
  the next build axis. All 8 mentors live in this repo's `.claude/agents/` (BOSS-local): `mentor-
  venture` (cornerstone), `mentor-architect` (retuned for AI-native era — both BOSS-local and the
  MVP template), `mentor-gtm`, and 5 new — `mentor-business`, `mentor-fundraising`, `mentor-pitch`,
  `mentor-talent`, `mentor-humane` (with explicit override authority on humane concerns). Each cites
  the practitioners from `docs/mentor-practitioners.md` it draws on; no agent impersonates a person.
  First convening captured at [`docs/dossier/boss-advisory-pass-001.md`](dossier/boss-advisory-pass-001.md)
  — honest, not flattering. **The queue has been re-ordered by the pass** (see Next tasks): pause
  features to earn founder contact, eval the conscience before building moments #3/#4, run the
  Dunford positioning exercise. Cross-cutting theme: the conscience is the moat AND the most
  under-validated thing — plug that gap first. Companion **AI-MVP playbook** at
  [`docs/dossier/ai-mvp-playbook-001.md`](dossier/ai-mvp-playbook-001.md) compiles 9 named
  practitioners (Group A = Mollick/Karpathy/Willison/Rauch — speed+AI; Group B = Ries/Maurya/
  Savoia/Husain/Liu — discipline+measurement) into a 4-week MVP cadence + decision rules for
  choosing which voice leads when. Also names 3 concrete `/spec` & `/smoke`/`/evals` & `/pretotype`
  upgrades to MVP mode (queued behind the advisory pass moves).
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

## Next tasks (in order — the published roadmap)

> Ajesh asked for the whole roadmap. Here it is — 10 releases sequenced for build-on-build.
> v0.17 (builder team) just shipped; v0.18 is queued and self-contained. Each release is
> buildable in a focused session given the discipline rails (evals, structured output, loops).
> The conversation-loop (real-founder Mom Test calls) is explicitly overridden through v0.19;
> re-open conditions in `docs/dossier/boss-advisory-pass-001.md`.

1. ~~v0.18 — Generic loop primitive (IDEA-008 → FEAT-001).~~ **DONE in v0.18.0.** Node runtime
   reads `docs/loops/*.md`, evaluates predicates, returns structured signals. Bash hook retired.
   Two named loops in Quickstart template (capture-loop = structural; canvas-loop = moment-1
   declarative). Settings migration handles bash→node for pre-0.18 projects. 43/43 evals pass
   against generic runtime. BOSS dogfoods. **Still open from v0.16 meta-learnings:** Ajesh's
   read on m1-snf-021 (single-idea-deepening — drift or depth?) — applies to canvas-loop's
   threshold tuning when convenient.
2. ~~v0.19 — Proto-personas (the founder-experience eval channel).~~ **DONE in v0.19.0.**
   8 personas authored, persona-reactions-loop spec'd, first reactions pass complete against
   the conscience moment-1 firing scenario. Surfaced 3 concrete design changes (cohort-aware
   conscience, inspect affordance, pick voice lineage) and 2 surprises (returning-founder
   wants HARDER question; indie-hacker caught a voice-fights-itself issue eval set missed).
3. ~~v0.21 — Moment #4 + MVP discipline upgrades + design-tokens-loop.~~ **DONE in v0.21.0.**
   Moment #4 (restraint) landed skill-side via spec-loop; 3 new skills + 3 new loops shipped;
   /spec carries validated-learning + evals fields. **Moment #3 (capture — reusable value at
   breakpoint) re-deferred to v0.22** — it genuinely needs a different detector design (not
   predicate-based; possibly LLM-as-judge looking at artifacts for generalizability signals).
4. ~~v0.22 — V1 mode authored + IDEA-010 Phase 3.~~ **DONE in v0.22.0.** V1 mode shipped with
   the 3 new builder agents + 4 template mentor copies + 3 new skills + design-drift-loop.
   **Deferred to v0.23:** moment #3 (capture — reusable value at breakpoint, needs LLM-as-judge
   or heuristic detector — not predicate-based); PostToolUse hook for hardcoded-style detection
   (new hook-type plumbing).
5. **v0.23 — Scale mode authored + moment #3 + PostToolUse hook plumbing + IDEA-010 Phase 4.**
   `mentor-humane` promoted from BOSS-local to template (the board). PM org, code-health,
   product council. **Plus the deferred items from v0.22:** moment #3 detector (LLM-as-judge or
   heuristic — not predicate-based), PostToolUse hook for hardcoded-style detection (new hook
   surface), `/design-prompt` skill or fold into `/design-review`. Substantial release.
7. **v0.24 — IDEA-003 finish.** Reshape per IDEA-008: practitioners encoded UP as *named
   variants of loops* with attribution, not free-floating practice docs. `library/loops/`
   populates from `docs/mentor-practitioners.md`. Mentors cite specific loop IDs.
8. **v0.25 — Externalization.** README rewrite (Raskin spine drafted in advisory pass).
   Dunford positioning exercise. Right-sized shape named on canvas (mentor-business converged).
   Brand spectrum + BOSS.DK exemplar lines (IDEA-007 open Q).
9. **v0.26+ — Backlog promoted as earned.** IDEA-005 brownfield (`boss adopt`), IDEA-006 host
   portability (host contract — now smaller surface thanks to IDEA-008's predicate/runner
   separation), IDEA-004 temple culture (values infrastructure).
10. ~~IDEA-001 learning loop~~ — **DONE in v0.8.0**. ~~IDEA-003 mentor *structure*~~ — **DONE
    in v0.9.0**. ~~IDEA-002 MVP mode~~ — **DONE in v0.14.0**. ~~Full mentor board seated~~ —
    **DONE in v0.15.0**. ~~Eval-loop closed + primitive validated~~ — **DONE in v0.16.0**.
    ~~Builder team seated~~ — **DONE in v0.17.0**. ~~IDEA-008 → FEAT-001 (generic loop runtime)~~
    — **DONE in v0.18.0**. ~~Proto-personas + first reactions pass~~ — **DONE in v0.19.0**.
    ~~v0.19 persona-reactions design changes (inspect / cohort-aware / voice lineage)~~ —
    **DONE in v0.20.0**. ~~MVP discipline upgrades + moment #4 + IDEA-010 Phase 2~~ —
    **DONE in v0.21.0**. ~~V1 mode authored + IDEA-010 Phase 3~~ — **DONE in v0.22.0**.

## Open decisions
- Sync of user-editable files: **settings.json `hooks` block now merges additively** (v0.13.0). Still open:
  CLAUDE.md and other settings.json keys (permissions etc.) = hand-merge for now.
- BOSS's own business model — open (canvas says don't monetize lock-in). Decide later, on evidence.
- Mentor agents' home: project `.claude/agents/` with `mentor-` prefix (leaning yes).
- Optional: scrub the old `registry/projects.json` (home path + `margin`) from git history. Removed
  going forward as of v0.7.0; only matters if the public history bothers you (needs force-push).

## Prompt for the next session
> Continue BlueprintOS (in ~/Projects/blueprintos). Read docs/RESUME.md first; cross-references
> as needed.
>
> We're at v0.17.0. **Roadmap published in the "Next tasks" section above — 10 releases
> sequenced for build-on-build.** Builder team just seated (designer + voice-keeper + prompt-
> coach in BOSS's own .claude/agents/). Next up is v0.18: promote IDEA-008 to FEAT (generic
> Node loop runtime, 3 named loops, retire bash hook, `runner_type` field). Then v0.19 personas
> on top of that.
>
> Ajesh is in "build-it-out" mode — execute fast, ship multiple capability releases per session
> where scope allows, lean on the discipline rails (evals + structured output + IDEA-008 loops
> + builder team + personas-soon) to stay disciplined while moving.
>
> Real-founder conversations remain explicitly overridden through v0.19 — see
> `docs/dossier/boss-advisory-pass-001.md` for re-open conditions.
>
> Deferred until 1–3 land: IDEA-003 finish (practitioners as named practices UP), moments #3/#4,
> IDEA-005 brownfield, IDEA-006 host portability.
>
> Per capability: bump VERSION + package.json (keep in sync) + add a registry/CHANGELOG.md entry +
> update this RESUME. Test the CLI in /tmp, prune /tmp entries from ~/.boss/registry.json, commit
> with the GH noreply env-var (never global config), push.

## Working reminders
- Commit with GH noreply env-var (never global config): `NR=$(gh api user --jq '"\(.id)+\(.login)@users.noreply.github.com"')`.
- After CLI changes: `npm i -g ~/Projects/BlueprintOS`, test in `/tmp`, prune `/tmp` entries from `~/.boss/registry.json` (registry is machine-local now, not in the repo).
- Keep `VERSION` and `package.json` version in sync. `npm run pack:preview` to confirm only the package ships.
- Every capability: VERSION bump + `registry/CHANGELOG.md` entry + update this RESUME.
