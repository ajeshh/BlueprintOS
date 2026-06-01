---
id: RESUME
type: resume
owner: pm
status: active
updated: 2026-06-01 (v0.34.0)
---

# RESUME — BlueprintOS

**Read this first each session.** State + next tasks + open decisions for BOSS.

## What BOSS is
A just-in-time **startup incubator** (not just a scaffolder): `boss new` → open Claude → `/boss`.
Scaffolds at the right level of ceremony and grows the project through **modes**
(Quickstart → MVP → V1 → Scale), with two agent classes — **builders** (make the app) and
**mentors** (coach the founder). See [`PRINCIPLES.md`](../PRINCIPLES.md) and [`README.md`](../README.md).

## State (shipped, v0.34.0)
- **Conscience frequency ledger — BOSS eats its own /ai-cost dogfood, honestly (v0.34.0). Closes
  the 4.8 arc.** As judge-moments multiplied (drift, caution do model judgment in the live turn),
  the conscience began costing tokens while BOSS never measured its own. **The reframe is the
  decision (mentor-architect):** "cost" → **frequency, facts not estimates.** The hook never calls
  a model, so a token estimate would be lying-with-numbers (blind to the dominant induced-read
  cost) — PRINCIPLE #2 vetoes the cost version as ceremony. The real problem is **over-firing**
  (how a conscience actually becomes costly/annoying) — that's what's measured. Shipped:
  `.boss/conscience-log.jsonl` (gitignored; one line/fire: moments, judge-bool, injected_chars,
  cohort — NO token estimate; separate from the founder's cost-log); `logActivity` + `JUDGE_MOMENTS`
  in the hook lib (**first correctness-invisible fire-path side effect** — verified byte-identical
  with/without the write); `boss conscience activity` (alias `cost` w/ honest reframe header) with
  per-moment counts + judge-share + median chars + **over-fire smell** (≥4×/hr or ≥8×/24h
  clustering); status one-liner. **Measure-only; self-throttle deferred indefinitely** (would gag
  the conscience when drift is worst — humane-before-viable, one-way door); token estimation
  deferred to host-contract (IDEA-006). IDEA-013 captures it. Gate+judgment suites 105/0/41. **The
  4.8 arc (v0.31–v0.34) is complete; only the non-build positioning reframe remains.**
- **`caution` goes judge-backed — depth vs. avoidance (v0.33.0).** Moment #1 (the conscience's
  flagship) fires on ≥3 captures with no filled risk, but the predicate counts *total* captures —
  it can't tell **depth** (one idea sharpening, converging toward a canvas) from **avoidance**
  (capturing-lots/validating-nothing). That's `m1-snf-021`, which the gate runner has *skipped
  since v0.16* because no predicate can make the call. v0.33 makes caution judge-backed: the gate
  still opens, but the model reads the capture log and judges before voicing (**strictly more
  restraint** — caution can now only fire *less*). **First reuse of the v0.32 judgment machinery on
  an existing moment** — proves it's not drift-specific. `replay.js` is now **multi-moment** (a
  `MOMENTS` registry drives one engine). Shipped: `caution.judgment.yml` (7 cases: 3
  avoidance/fire, 3 depth/silent [m1-snf-021 made concrete], 1 ambiguous) + `fixtures-capturelog.js`
  (depth-vs-scatter prose). m1-snf-021 closed at the right layer — the gate keeps skipping it
  (correctly), now annotated "RESOLVED; covered by judgment surface." Gate suite **105/0/41**; both
  judgment moments covered; end-to-end tested via `boss new`. Judgment still not model-verified
  (loud NEVER_GRADED); first STALE builds `regrade.js`.
- **Judgment-quality eval channel — closing the hole drift-loop opened (v0.32.0).** drift (v0.31)
  was the first moment whose *detection is a model judgment*; the gate-eval only tests that the
  hook fires on the right structural state (it stops at the door). Whether the model correctly
  calls drift-vs-on-aim *past* the gate was unevaluated — a named crack in "no moment ships
  without evals." **Method (mentor-architect):** two surfaces, two cadences. Gate-eval
  (`runner.js`, every commit, $0) stays. New **judgment surface**
  (`docs/architecture/conscience-evals/judgment/`) = **golden transcripts gated by a voice-hash
  tripwire** (not pure LLM-judge — breaks free/deterministic/CI; not pure golden — rots silently).
  Shipped: **`replay.js`** (zero-dep, every commit — well-formedness + voice-hash tripwire +
  coverage floors + GRADED/STALE/NEVER_GRADED/REGRESSION status; all four states proven);
  **`drift.judgment.yml`** (10 labeled cases — 4 fire-and-name-gap, 5 on-aim/silent [the trust-
  critical class], 1 ambiguous; rubric per case; content-rich paired devlog fixtures because the
  judgment is semantic); **`regrade.js`** (paid LLM-as-judge calibrator — **DEFERRED by design**,
  runnable spec-stub; built the week the first STALE tripwire fires — architect's staged cut).
  Zero-dep line pinned: `npm pack` ships **0** judgment files; no `src/` ref. Dogfooded in
  `eval.md` (a model-judgment moment can't ship detection with only a gate-eval). Shared YAML
  parser extracted to `conscience-evals/lib/yaml-eval.js`; gate suite regression-clean **105/0/41**.
  npm scripts `eval:gate` / `eval:judgment` / `eval`. **Honest scope:** the labeled set + staleness
  machinery + coverage ship now; the judgment is **not yet model-verified** (replay prints
  NEVER_GRADED loudly). First STALE = the trigger to build `regrade.js`.
- **`drift-loop` — the closest loop to why BOSS exists (v0.31.0).** Occasioned by a "what does
  Opus 4.8 change about BOSS" pass; load-bearing finding was *the hook=detection / model=voice
  boundary has moved* — a stronger model can do the semantic judgment regex can't. For 30
  releases the conscience caught *structural* gaps but never the one PRINCIPLES.md names first:
  **you named the bet that could sink this, then built something else.** New **`drift` moment**
  (L1-mvp `drift-loop`, hook-runner): fires when a canvas has a real **Riskiest assumption** +
  ≥3 devlog entries + no real **Experiment this week** plan — the gap *between* `caution` (no
  risk named) and `done` (graduation). Confidence scales on devlog overshoot (3→low, 4–5→medium,
  6+→high). **Architecture pinned via mentor-architect:** *not a new detector* — a predicate-
  gated, **bounded-read** voicing instruction on the existing `UserPromptSubmit`→
  `additionalContext` channel. Cheap predicate = the gate (and the cost control); model does the
  stated-vs-actual comparison in the live turn over a bounded read (risk line + ~5 recent devlog
  + open FEAT). **No model call in the hook, no new host primitive (IDEA-006 untouched), no new
  state, no new predicate vocabulary.** Same shape as `/extract` but **hook-fired not skill-
  invoked** (the drifted founder won't think to *ask*). Stays silent when on-aim. Cohort-aware.
  `moment-drift.yml` (14 cases incl. placeholder-experiment edge, drift/capture co-fire, and the
  documented `any_file_matches` masking limitation); runner's `buildCanvasFile` now writes the
  experiment line. Suite **105/0/41** (up from 91). End-to-end tested in `/tmp`: fires low→high
  as devlog grows, silent when the plan is recorded. L1-mvp now ships 12 skills + **8 loops**.
  Honest scope: hook evals test the *gate*; judgment-quality is the model's layer (like
  `/extract`), not this runner.
- **Audit-driven hardening complete (v0.30.0).** Closes the two remaining discipline-hole
  gaps from the post-v0.26 audit. **`/cost-review` skill (L1-mvp)** + **`cost-review-loop`**
  (second time-of-work entry pattern; entry = budget doc exists, exit = ≥1 cost-review file
  with a `Total spend` line) + new **`cost-stale` moment** in conscience — closes the
  "weekly review cadence unenforced" gap; both halves of cost discipline (declare + read)
  now have loops. **`/ai-failure-states` Eval-tested column** + **`/evals` failure-mode
  coverage requirement** — closes the "failure-state handlers can be stubs forever"
  loophole at both declaration and test layers. L1-mvp now ships 12 skills + 7 loops. Suite
  count **91/0/41** (up from 83). All hook-emitted moments now have eval coverage —
  *no moment ships without evals* is the new floor. **The audit is closed; next is feature
  work** (brownfield / /consult / AI-first archetype template).
- **Moment #3 lands — PRINCIPLE #1's own discipline encoded (v0.29.0).** For 28 releases the
  conscience surfaced 6 moments but PRINCIPLE #1 itself had none. Deferred 5 consecutive
  releases. v0.29 ships the heuristic-plus-judgment version: **`extraction-loop`** (L1-mvp,
  hook-runner; entry = ≥3 dated devlog entries; exit = ≥1 EXTR-NNN file with a Route line —
  the first time-of-work entry pattern) + **`/extract` skill** (LLM-as-judge; reads recent
  work, names 1-3 candidates by three signals, routes each UP into `library/`, DOWN into
  `src/`, or honest NOT-YET; writes `docs/extractions/EXTR-NNN-*.md`). New **`capture` moment**
  in conscience signalAsContext (voice explicitly rejects productivity-reward framing —
  *"PRINCIPLE #1 is the discipline, not the dopamine"*). New `EXTR-NNN` ID type. L1-mvp now
  ships 11 skills + 6 loops. **Eval coverage from the start** — `moment-capture.yml` with 11
  cases (suite now 83/0/41 up from 73/0/41). Discipline applied: no moment ships without
  evals.
- **`/welcome` skill — gentle first-run orientation (v0.28.0)** — closes the v0.19 cohort gap
  (`first-product` / `vibe-coder-newbie` / `non-tech-founder` bounce off without onboarding).
  Cohort-aware branching: beginner cohorts get the full tour (what BOSS is, what's in the
  folder, what to do next, conscience explained, modes explained); experienced cohorts
  (`eng-builder` / `vibe-virtuoso` / `indie-hacker` / `returning-founder`) get the 30-second
  version + pointer at `/boss`; `domain-expert` gets middle path with high-stakes framing.
  Cohort question moved upstream (was in `/boss` step 6; now in `/welcome` step 2; `/boss`
  retains it as backup path). `boss new` output names BOTH paths. CLAUDE.md (template) has
  the top-line nudge. Discoverability fix for IDEA-011 (override grammar + `boss conscience
  pause` surfaced in the cohort's first 5 minutes). L0 manifest now ships 6 skills.
- **Conscience evals coverage closed (v0.27.0)** — four moments had shipped without eval
  coverage (restraint / coherence / cost / failure-mode); the brake the discipline named was
  eroding silently. v0.27 closes the three hook-emitted ones. Adds `moment-cost.yml` (12
  cases), `moment-failure-mode.yml` (8), `moment-coherence.yml` (10) — covers entry detection
  across providers/patterns, partial closure, full closure, multi-moment co-firing. Runner
  upgraded to load both L0+L1 loops, materialize arbitrary `src_files`/`docs_files` via a new
  `FIXTURES` registry, and assert multi-moment expectations. Suite count: **73 passed / 0
  failed / 41 skipped (114 loaded)** — up from 43/43. Restraint is skill-side; stays out of
  the hook eval suite by design. Capture moment (PRINCIPLE #1) still has no detector — next
  on deck.
- **AI-first product template (v0.26.0)** — BOSS's home turf, made first-class. The v0.24
  positioning named BOSS as *"the thinking layer for AI-native founders;"* v0.26 ships the
  concrete artifact that earns the name. **`/ai-first-init`** is the conductor — walks the
  founder through five steps from day one: (1) declare what's AI-mediated → `docs/ai-first.md`;
  (2) seed structured outputs (Liu) → `docs/schemas/`; (3) seed eval set early (Husain) →
  `/evals --new`; (4) declare cost budget upfront → `/ai-cost`; (5) design failure states →
  `/ai-failure-states`. **`/ai-failure-states`** is the missing piece — five guaranteed
  failure modes (garbage / refusal / hallucination / timeout / cost-spike), each with a
  declared response + stub fallback handler in code. Cohort-aware (domain-expert defaults
  to human-in-the-loop on hallucination, not retry). **`ai-failure-state-loop`** (hook-runner,
  entry = ≥1 LLM SDK call, exit = failure-states doc + handler reference). New `failure-mode`
  moment. **`/spec` upgraded** with a Failure-states section for AI-mediated FEATs. **`/boss`
  nudge (L0)** — names AI-native intent during spin-up + recommends `/ai-first-init`.
  L1-mvp manifest now ships 10 skills + 5 loops. End-to-end tested in `/tmp` (both `cost` and
  `failure-mode` fire simultaneously at first LLM call; close independently). 43/43 conscience
  evals regression-clean.
- **AI cost discipline — the universal-cohort feature (v0.25.0).** Per IDEA-012's persona
  overlay, AI cost was the only candidate every cohort cared about. Now first-class in MVP
  mode: the founder gets nudged to declare the bill at the first LLM SDK call, not after the
  first surprise invoice. **`/ai-cost` skill (L1-mvp)** — walks the founder through declaring
  `docs/ai-cost-budget.md` (per-user/day + monthly cap + model rationale + review cadence +
  breach grammar), suggests a ~30-line cost-logger wrapper (TS + Python examples) writing to
  `.boss/cost-log.jsonl`, surfaces mentor handoffs (`mentor-architect` for cost-shape →
  architecture; `mentor-business` for cost-per-user → pricing). **Cohort-aware defaults:**
  `first-product` $5/user/day strict; `vibe-virtuoso` inspect-only; `eng-builder` BYO;
  `indie-hacker` cost-as-%-of-revenue; `domain-expert` $20/user/day + **privacy-first logging
  (no PII, no prompt body)**. **`cost-budget-loop` (hook-runner)** — entry: ≥1 LLM SDK call
  site in `src/**` (anthropic / openai / Vercel AI SDK regex); exit: budget doc + logger
  reference at the call site. **New `cost` moment** added to the conscience's
  `signalAsContext` voice frame. `.gitignore` updated for `.boss/cost-log.jsonl`. End-to-end
  tested in `/tmp`: loop opens at first LLM call, closes when both artifacts exist, re-opens
  when budget doc removed. 43/43 conscience evals regression-clean.
- **Positioning pass landed (v0.24.0)** — first non-feature release in BOSS's history. The
  Dunford exercise (recommended v0.15 advisory pass; deferred 8 releases; finally shipped).
  Full positioning at [`docs/dossier/positioning-pass-001.md`](dossier/positioning-pass-001.md).
  Lead sentence on the record: *"BOSS is the just-in-time conscience for AI-native founders.
  Pause it any time."* (13 words; killer-test winner.) README opening updated with the
  longer-form positioning (*"For founders building with AI — the thinking layer that nudges
  when you're drifting and pauses on command. No growth-hacking pressure. Override-friendly."*).
  Category frame: *"the thinking layer for AI-native founders"* — drops "incubator" as primary
  descriptor (reads YC-shaped). 8 cohort-tailored variants on the record. BOSS explicitly does
  NOT compete on code generation (Lovable / v0 / Bolt own that turf); BOSS is complementary —
  the thinking layer between code-generating and the founder.
- **Conscience pause primitive (v0.23.0):** `boss conscience pause [--for 8h | --until-resume]
  [--reason "..."]` + `boss conscience resume`. State lives in `.boss/config.json`'s
  `conscience` block. Hook reads pause first; exits silent when paused-not-expired; auto-
  clears expired pauses (the auto-resume IS the kindness — no performative "your pause
  expired" signal). `boss status --conscience` surfaces pause state prominently at the TOP
  of the output. The discipline-on-the-discipline-tool move: ship only the one most-load-
  bearing thing in a release that could have been bigger. Closes canvas R&H #1
  ("BOSS bloats into a heavy framework") operationally. 43/43 evals regression-clean.
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
5. ~~Strategic planning pass~~ — **DONE in IDEA-012** (commit pending). Authored the full
   strategic feature audit: 30+ candidate features cataloged across 10 categories;
   persona-reactions overlay shows which cohorts care about which; **killer-use-case finding**
   — the most acute gap may not be any feature in the catalog but BOSS's missing one-sentence
   killer description that survives the stranger-read test. Ajesh adopted the catalog as the
   live working backlog (*"a lot is critical, can see the value of all of it, lets add it"*).

6. ~~v0.24 — Positioning pass (Dunford exercise).~~ **DONE in v0.24.0.** First non-feature
   release; the deliverable is the thinking + the README edit. The positioning that gates the
   next 3-5 feature decisions is on the record.

7. ~~v0.25 — AI cost tracking.~~ **DONE in v0.25.0.** `/ai-cost` skill + `cost-budget-loop` +
   new `cost` moment shipped. Cohort-aware defaults landed for all 8 cohorts; mentor handoff
   lines named (architect for cost-shape; business for unit economics). Loop verified end-to-
   end in `/tmp`; 43/43 conscience evals regression-clean.

8. ~~v0.26 — AI-first product template.~~ **DONE in v0.26.0.** `/ai-first-init` conductor +
   `/ai-failure-states` skill + `ai-failure-state-loop` + new `failure-mode` moment + `/spec`
   failure-states field + `/boss` AI-native nudge. The artifact that earns the v0.24
   positioning.

9. ~~v0.27 — Conscience evals coverage.~~ **DONE in v0.27.0.** Closes the discipline-on-the-
   discipline-tool hole: 3 new moment files (cost/failure-mode/coherence) + runner upgrades
   (L1 loops loaded, fixtures registry, multi-moment assertions). Suite now 73/0/41.

10. ~~v0.28 — `/welcome` (first-time BOSS-user onboarding).~~ **DONE in v0.28.0.** Cohort-
    aware orientation skill in L0; closes the v0.19 cohort gap. `boss new` output updated;
    CLAUDE.md template surfaces it at the top.

11. ~~v0.29 — Moment #3: capture (PRINCIPLE #1's own discipline).~~ **DONE in v0.29.0.**
    `extraction-loop` (first time-of-work entry pattern) + `/extract` skill (LLM-as-judge,
    UP/DOWN/NOT-YET routing) + new `capture` moment + EXTR-NNN ID type + 11 eval cases.
    Sets the precedent for future judgment-required moments.

12. ~~v0.30 — Audit-driven hardening (cost-review cadence + failure-state stub loophole).~~
    **DONE in v0.30.0.** `/cost-review` skill + `cost-review-loop` (second time-of-work
    entry pattern) + `cost-stale` moment + `/ai-failure-states` Eval-tested column +
    `/evals` failure-mode coverage requirement + 9 cost-stale eval cases. Audit closed.

13. ~~v0.31 — `drift-loop` (work-vs-named-risk; the closest loop to why BOSS exists).~~
    **DONE in v0.31.0.** New `drift` moment + `drift-loop` (L1-mvp, hook-runner) + `drift` voice
    frame + `moment-drift.yml` (14 cases) + runner `buildCanvasFile` experiment-line support.
    First moment fronting a model judgment the predicate can't make; architecture pinned via
    mentor-architect (predicate-gated bounded-read voicing instruction, no new host primitive /
    state / vocabulary). Suite 105/0/41.

14. ~~v0.32 — Judgment-quality eval channel (the hole drift-loop opened).~~ **DONE in v0.32.0.**
    Two-surface design (gate-eval stays; judgment surface added) = golden transcripts + voice-hash
    tripwire. `judgment/{replay.js, drift.judgment.yml, regrade.js, fixtures-devlog.js, README.md}`
    + `lib/yaml-eval.js` + `eval.md` dogfood requirement. `regrade.js` (paid LLM-judge) DEFERRED by
    design — **build it the week `replay.js` first prints STALE.** Judgment not yet model-verified
    (loud NEVER_GRADED). The 4.8 arc continues: next is **v0.33 — upgrade `caution` to judge-backed**
    (resolves the `m1-snf-021` single-idea-deepening question; only safe now that judgment evals
    exist), then **v0.34 — conscience cost instrumentation** (eat the `/ai-cost` dogfood as
    judge-moments multiply), then **(non-build) fold the 4.8 "tailwind" reframe into positioning**.

15. ~~v0.33 — upgrade `caution` to judge-backed (resolve m1-snf-021).~~ **DONE in v0.33.0.**
    Depth-vs-avoidance judgment in the caution voice frame (strictly more restraint); multi-moment
    `replay.js` (MOMENTS registry); `caution.judgment.yml` (7 cases) + `fixtures-capturelog.js`;
    m1-snf-021 resolved at the judgment layer. First reuse of the v0.32 machinery on an existing
    moment — proves it generalizes. **4.8 arc remaining:** **v0.34 — conscience cost
    instrumentation** (eat the `/ai-cost` dogfood — measure what a prompt-submit costs as
    judge-moments multiply), then **(non-build) fold the "tailwind" reframe into positioning**
    (mentor-pitch). After that the 4.8 pass is spent — return to the IDEA-012 catalog below.

16. ~~v0.34 — conscience cost instrumentation (eat the /ai-cost dogfood).~~ **DONE in v0.34.0,
    reframed.** mentor-architect turned "cost" → **frequency** (a hook that never calls a model
    can't honestly price tokens; over-firing is the real failure mode). `.boss/conscience-log.jsonl`
    + `boss conscience activity`/`cost` + over-fire smell + status one-liner; measure-only,
    self-throttle deferred (humane-before-viable). IDEA-013. **The 4.8 arc (v0.31 drift → v0.32
    judgment evals → v0.33 caution judge-backed → v0.34 frequency ledger) is COMPLETE.** Only
    non-build remainder: **fold the "every model jump is a tailwind" reframe into positioning**
    (mentor-pitch / `docs/dossier/positioning-pass-001.md`) — do when next touching positioning.

17. **v0.35+ — Pull from IDEA-012 catalog.** Likely candidates per the audit (rough priority):
   - **Brownfield adoption** — IDEA-005, `boss adopt` — high BOSS-distinctive value
   - **Mentor consults as structured flows** — `/consult` skill orchestrating multiple
     mentors per question
   - **First-time BOSS-user onboarding** (`/welcome` skill) — closes v0.19 first-product
     cohort gap
   - **Database migration discipline** — pairs with existing db-architect
   - **Moment #3 (capture)** — needs LLM-as-judge or heuristic design
   - **IDEA-003 finish** — practitioners encoded UP as named loops
   - **IDEA-011 Phase 2** — per-loop opt-out, perf instrumentation, override discoverability
   - **PostToolUse hook plumbing** — IDEA-010 Phase 3 enforcement upgrade
   - **GDPR/CCPA + domain-compliance scaffolds**
   - **End-user onboarding flows** (paired with ux-designer)
   - **IDEA-006 host portability** — name the contract; don't port
   - **Scale mode authoring** — explicitly DEPRIORITIZED (premature; no projects at scale)

   See [IDEA-012](ideas/IDEA-012-strategic-feature-audit.md) for the full catalog + tags
   (BOSS-distinctive vs. better-elsewhere vs. mixed).
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
    ~~Conscience pause primitive (IDEA-011 Phase 1)~~ — **DONE in v0.23.0**. ~~Positioning
    pass (Dunford exercise; IDEA-012 follow-through)~~ — **DONE in v0.24.0**. ~~AI cost
    discipline (universal-cohort feature)~~ — **DONE in v0.25.0**. ~~AI-first product
    template (the artifact that earns the v0.24 positioning)~~ — **DONE in v0.26.0**.
    ~~Conscience evals coverage for cost / failure-mode / coherence~~ — **DONE in v0.27.0**.
    ~~`/welcome` gentle first-run orientation (closes v0.19 cohort gap)~~ — **DONE in v0.28.0**.
    ~~Moment #3: capture — PRINCIPLE #1's own discipline encoded (extraction-loop +
    /extract + capture moment + EXTR-NNN ID type + 11 eval cases)~~ — **DONE in v0.29.0**.
    ~~Audit-driven hardening (cost-review cadence + failure-state stub loophole closed)~~ —
    **DONE in v0.30.0**.

## Open decisions
- Sync of user-editable files: **settings.json `hooks` block now merges additively** (v0.13.0). Still open:
  CLAUDE.md and other settings.json keys (permissions etc.) = hand-merge for now.
- BOSS's own business model — open (canvas says don't monetize lock-in). Decide later, on evidence.
- Mentor agents' home: project `.claude/agents/` with `mentor-` prefix (leaning yes).
- Optional: scrub the old `registry/projects.json` (home path + `margin`) from git history. Removed
  going forward as of v0.7.0; only matters if the public history bothers you (needs force-push).

## Prompt for the next session
> **Keep this evergreen.** This block is a pointer + procedure, never a status report. The
> status lives in *State* (above) and the *Next tasks* list — both already get updated each
> release. Restating them here just doubles the surface that can drift. If you find yourself
> writing "We're at v0.X" or "X just shipped" below, delete it and trust the rest of the file.

> Continue BlueprintOS (in `~/Projects/BlueprintOS`).
>
> **Read first, in order:** `docs/RESUME.md` (this file — current state + next tasks + open
> decisions), `CLAUDE.md`, `PRINCIPLES.md`. Then `VERSION` + `registry/CHANGELOG.md` for what
> just shipped. **Cross-check freshness:** `git log -3` against what RESUME claims — if
> they disagree, RESUME is stale and you re-read after re-establishing ground truth.
>
> Then pick up the *Next tasks* in order, top down. If something at the top looks already
> done, scan recent commits + CHANGELOG before assuming the list is current.
>
> **Per capability shipped:** bump `VERSION` + `package.json` (keep in sync) + add a
> `registry/CHANGELOG.md` entry + update *State* + *Next tasks* in this RESUME. Test the CLI
> in `/tmp`, prune `/tmp` entries from `~/.boss/registry.json`, commit with the GH noreply
> env-var (never global config), push when asked.
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
