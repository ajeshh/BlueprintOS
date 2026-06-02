---
id: RESUME
type: resume
owner: pm
status: active
updated: 2026-06-02 (v0.43.0)
---

# RESUME — BlueprintOS

**Read this first each session.** State + next tasks + open decisions for BOSS.

## What BOSS is
A just-in-time **startup incubator** (not just a scaffolder): `boss new` → open Claude → `/boss`.
Scaffolds at the right level of ceremony and grows the project through **modes**
(Quickstart → MVP → V1 → Scale), with two agent classes — **builders** (make the app) and
**mentors** (coach the founder). See [`PRINCIPLES.md`](../PRINCIPLES.md) and [`README.md`](../README.md).

## State (shipped, v0.43.0)
- **Wayfinding Pass 1 — `boss map` + a doc generator that can't rot (v0.43.0, IDEA-018).** A
  docs-health pass found the README **19 releases stale** and, worse, **no "how to use BOSS" guide at
  all**. The fix is shaped like BOSS: wayfinding, not a manual. Decisions locked with Ajesh — **mode
  ladder = the spine** (persona = entry filter; aspect = which mentor to ask, never a chapter); **split
  audience** (a *command* ships to founders, the *prose* stays in the BOSS repo); **durable core
  first**. Shipped: **`boss map`** (CLI, ships) — the *live* cheatsheet, a pure `boss board`-style
  render of state the project already holds (`.boss` stamp + installed `SKILL.md`): *you are here ·
  available now (grouped by the rung that unlocked each skill) · one unlock away (next rung's skills,
  real project name substituted) · standing controls.* The de-rot mechanism: **`src/modes.js`** is the
  single source both `boss map` and **`scripts/gen-docs.js`** (`npm run gen:docs`) read, so the live
  map and the generated **`docs/CHEATSHEET.md`** + **`docs/SKILLS.md`** can't disagree — the per-mode
  lists are now a build artifact, not a memory test (the actual fix for what bit the README). Also
  re-synced the README to v0.42.1 (counts/version/alpha-claim) in the prior commit. Zero-dep held
  (`map.js`+`modes.js` ship; `scripts/`+generated `docs/` dev-only — `npm pack` verified); eval suite
  clean; tested end-to-end in `/tmp`. **Pass 2 = the hand-authored `docs/GUIDE.md` walkthrough**
  (persona router + 1-paragraph mental model + per-rung walk), then README↔GUIDE↔`/welcome`
  cross-links — written *against* these generated surfaces. See [`IDEA-018`](ideas/IDEA-018-wayfinding-and-guide.md).
- **BOSS ate its own context-discipline dogfood + sharpened the practice (v0.42.1).** Applied the
  recency-window rule (RVW-002) to *this file* — State trimmed **727→346 lines**, history → CHANGELOG
  (all 43 versions are there; non-destructive). And sharpened `library/practices/context-discipline.md`
  with what the reconsideration taught: the **`permissions.deny` block is the universal zero-cost
  floor** (shipped v0.42.0); a **PreToolUse secrets-guard hook fires per-tool-call (real latency) →
  reserve it for high-stakes/regulated cohorts or opt-in, NOT a universal default** (R&H #1 / IDEA-013
  cost discipline). Deferred-with-a-reason, not just deferred.
- **`/boss-learn` routed the sweep's first ADOPT — "context discipline" practice, UP + a DOWN
  safe-default (v0.42.0).** The two ADOPTs (RVW-005 deny-secrets, RVW-010 token-opt) + RVW-002 (lean
  docs) collapsed into ONE pattern. **Verified the version-bound Claude Code claims before encoding** —
  caught that `.claudeignore` is **FALSE** (doesn't exist; struck it) and confirmed `permissions.deny`
  glob syntax (+ that a `Read()` deny doesn't cover Bash), `.claude/rules/` `paths:`, PreToolUse
  hard-block, CLAUDE.md loading. **UP:** `library/practices/context-discipline.md` (host-tagged
  claude-code, "re-verify on host change" per IDEA-014, provenance cites the RVWs). **DOWN:** L0
  template now ships a `permissions.deny` block (`.env`/`.env.*`/`secrets/**`, Read+Bash) +
  broadened `.gitignore` — **every `boss new` project is secrets-safe by default** (verified
  end-to-end in /tmp). **Deferred follow-ons (named):** `library/hooks/` PreToolUse secrets-guard
  (Bash+MCP coverage — now reconsidered as cohort-gated/opt-in, see v0.42.1); mode/cohort-scoped
  `.claude/rules/` in template; ~~RESUME trim (RVW-002)~~ **done v0.42.1 (window=5)**; ADAPTs
  RVW-007 (couch-to-5k philosophy minus streak) + RVW-008 (categorize-agents mentor-architect frame)
  founder-facing/scope-gated.
- **First `/vet --all` sweep — 10 verdicts, RVW-003…012 (v0.41.0).** Ajesh dropped a 10-item pile
  (Reddit + Lenny's-newsletter AI/Claude-Code "best practices") and swept it. Distribution proves the
  skill routes on merits: **2 ADOPT / 2 ADAPT / 3 NOT-YET / 3 REJECT.** **The two ADOPTs collapse into
  ONE queued action** — a *"BOSS context discipline"* practice (RVW-005 deny secrets + RVW-010 lean
  docs/path-scoped rules/deny bloat/hook-filter + RVW-002 RESUME recency-window; RVW-009 is its
  rationale, RVW-012 its enforce-in-harness backing). ADAPTs (RVW-007 couch-to-5k *philosophy* minus
  the streak-mechanic; RVW-008 categorize-agents as a mentor-architect frame) are founder-facing +
  scope-gated. Caught a real bias: **6/10 drops were one author** → applied an author-concentration
  discount. **Nothing built yet** — ADOPT/ADAPT hand-offs await Ajesh (the skill decides *whether*,
  `/boss-learn` decides *where*). **Open follow-ups (Ajesh's call):**
  1. ~~`/boss-learn` the context-discipline practice~~ — **DONE in v0.42.0** (see entry above).
  2. **RVW-002 RESUME trim** still pending a window-size choice (3? 5?).
  3. Optional: cite RVW-012 in IDEA-006; log RVW-003 (plumbing-awareness) + RVW-007/008 framings as
     founder-facing candidates (IDEA-012 catalog).
- **`/vet` batch sweep + first two verdicts (v0.40.1).** Dogfooding `/vet` showed the rhythm is
  *accumulate-then-sweep*: `/vet --all` now vets every un-vetted inbox item (each a full pass + own
  `RVW-NNN`) → summary table + hand-off list; "one claim per run" reworded to "one claim per verdict"
  (protects depth, not sequence). First verdicts: **RVW-001** four-rule CLAUDE.md → REJECT (BOSS
  already encodes it as principles + cohort-aware conscience; static rules regress toward the
  brittleness the thread's own critique names = IDEA-014's thesis); **RVW-002** lean/modular CLAUDE.md
  → ADAPT (recency-window for RESUME.md State, which duplicates CHANGELOG; UP candidate for
  `library/practices/`). RVW-001 surfaced external confirmation of IDEA-014 (now cited there). **Two
  open follow-ups for Ajesh:** (a) act on RVW-002 — trim RESUME State to a recency window pointing at
  CHANGELOG (confirm window size); (b) optionally `/boss-learn` the RVW-002 generalizable practice UP.
- **`/vet` — the skeptical inbox; the inverse of `/boss-learn` (v0.40.0, IDEA-016 Phase 1).** From
  Ajesh: *"if i have new research or best practices, we should have a way where i can just drop it in,
  and then our mentors review and see what we should integrate. reddit is full of best practices, but
  that doesnt mean all are good ideas."* The last sentence is the design. **`/boss-learn` routes a
  pattern you already proved (earned trust); `/vet` judges a claim from a stranger that has earned
  nothing** — its job is the part `/boss-learn` never does: decide whether an unproven outside claim
  deserves to become practice **at all**. ADOPT *hands to* `/boss-learn` (whether → where). **The
  filter is the product** (a drop folder w/o judgment is a bookmark pile) — the skill is **biased
  toward NO** and makes a claim earn an ADOPT. NO-biased rubric: (1) contradicts a PRINCIPLE? (#6 /
  `mentor-humane` vetoes); (2) evidence grade (n=1 vibe / data / respected practitioner — most die
  here); (3) duplicate or sharpen?; (4) who serves **& harms** (toxic-for-`first-product` → ADAPT-
  with-scoping); (5) cost/ceremony (R&H #1). Four verdicts (mirrors `/extract`): **ADOPT** (→
  `/boss-learn`), **ADAPT** (modified, reasoned), **REJECT — recorded with why** (the quietly
  important one — verdict log = memory of what BOSS *deliberately didn't* adopt; no re-litigation),
  **NOT-YET** (+ re-open condition). **Restraint (PRINCIPLE #2):** deliberate-invoke like `/extract` /
  `/drift-deep` — **no loop, no hook moment, no nudge**; doesn't *find* research (that's
  `/deep-research`), judges what you bring it. **Scope: internal-curation first** — BOSS-local
  meta-skill (`.claude/skills/vet/`, with `/boss-learn` + `/boss-sync`, **not** the founder template);
  founder-facing version + mentor+persona panel are deferred UP candidates. Shipped:
  `.claude/skills/vet/SKILL.md`; `docs/research/inbox/` + `docs/research/verdicts/` (each w/ README);
  new **`RVW-NNN`** ID type; IDEA-016 captured w/ both design forks decided. Zero-dep held (`npm pack`
  ships **0** — BOSS-local + `docs/` neither in `files` allowlist). Gate+judgment suites unchanged (no
  hook moment, no predicate change). **Riskiest assumption, tested in use now:** does `/vet` beat a
  careful 30-second read? If first real drops produce verdicts Ajesh would've reached anyway, it stays
  a folder + a habit; if it catches a principle-contradiction or harm-to-a-cohort a skim misses, it
  earns the founder-facing build.
- **Older State (≤ v0.40.0) → [`registry/CHANGELOG.md`](../registry/CHANGELOG.md)** carries the full
  per-version detail (all 44 versions, 0.1.0→now). Kept to a ~5-entry recency window per the
  **context-discipline** practice (RVW-002): the always-loaded session doc keeps recent state; history
  lives in the changelog it already maintains. BOSS eating its own dogfood.

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

17. ~~v0.35 — recalibration engine (regrade.js) + model-recalibration discipline (IDEA-014 P1).~~
    **DONE in v0.35.0.** The "keep improving easily" keystone — closes the NEVER_GRADED hole so all
    future conscience work is measurable. **Next obvious follow-on (cheap, high-value):** run
    `ANTHROPIC_API_KEY=… npm run regrade` to make drift + caution actually model-verified, commit the
    transcripts. Then the deferred 4.8 leverage is safe: **deep-context drift pass** (1M-context
    whole-project check) and **more judge-moments** (restraint/coherence/cost) — both now gradeable.

18. ~~v0.36 — `boss board` (IDEA-015 Phase 1).~~ **DONE in v0.36.0** (parallel session). Live
    terminal read of what's in flight; build the *view*, refuse the *app*.

19. ~~v0.37 — `/drift-deep` (deep-context drift pass).~~ **DONE in v0.37.0.** The 1M-context
    whole-project "am I fooling myself across everything" audit — deliberate skill (not a hook
    moment; cost discipline). The 4.8 leverage arc's last deferred item.

20. ~~Make drift + caution actually model-verified (the cheap, high-value follow-on).~~ **DONE in
    v0.38.0 — without a key.** `regrade.js`'s pipeline reproduced in-session via isolated Opus 4.8
    sub-agents (reasoning-required); 17 transcripts written; `replay.js` reads **GRADED 17/17**. All
    17 agree with the labels. `regrade.js` made importable. Honest provenance stamped (a real
    `npm run regrade` with a key overwrites them as the canonical instrument). **The canonical paid
    run is the only thing still deferred** — and now purely a provenance upgrade, not a correctness
    gap (it would re-confirm what the in-session grading already showed).

21. ~~more judge-moments, now that the channel is GRADED.~~ **capture DONE in v0.39.0** — third
    judge-moment, GRADED 7/7 from day one (reused the v0.33 machinery; third row on the same engine).
    **Remaining judge-moment candidates: `restraint` and `coherence`** (genuinely semantic — premature-
    vs-justified, design-vs-code drift). **Explicitly NOT `cost` / `failure-mode` / `cost-stale`** —
    those are binary facts (artifact exists or it doesn't); a model judge there would be the v0.34 cost
    trap. So the judge-moment well may be nearly dry: restraint is the one with real upside; coherence is
    V1-only (narrow cohort). After those, the conscience's judgment surface is as deep as it should go.

22. ~~v0.40 — `/vet` (IDEA-016 Phase 1, the skeptical inbox; inverse of `/boss-learn`).~~ **DONE in
    v0.40.0.** Occasioned by Ajesh's "drop in research/best-practices → mentors review what to
    integrate; reddit is full of best practices but not all good." BOSS-local meta-skill + drop zone +
    verdict log + `RVW-NNN` ID; NO-biased 5-question rubric; ADOPT/ADAPT/REJECT-recorded/NOT-YET;
    deliberate-invoke (no loop/hook). Internal-curation first; founder-facing version + mentor+persona
    panel deferred as UP candidates. **Deferred follow-ons, earn-it-gated:** (a) the founder-facing
    template version — build when the internal `/vet` proves it beats a careful read; (b) the full
    mentor+persona panel — build if the single skeptical pass proves too shallow on real drops.

23. **Then — Pull from IDEA-012 catalog.** Likely candidates per the audit (rough priority):
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
