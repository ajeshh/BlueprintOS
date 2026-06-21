# BOSS Changelog

Each entry = a BOSS version. `/boss-sync` reads this to tell a project what's new since its pin.

## 0.65.0 — 2026-06-20

- **`relationship.md` — the venture brain's missing half: the conscience learns whether its nudges
  land (IDEA-022 / FEAT-022).** The architecture designed two model-owned files — `read.md` (the POV,
  shipped) **and** `relationship.md` (what the conscience *said* and what the founder *did* with it).
  Only the read existed; this builds the relationship log, which closes the loop the frequency ledger
  (IDEA-013) only *counts*: did the nudge **land**?
  - **`/close` writes it** — *only when the conscience actually fired this session* — a dated entry:
    what was flagged + what the founder did, tagged honestly (*landed* / *ignored* / *overrode, with the
    reason* / *pushed back and was right* — the last being the most valuable: it's how the conscience
    learns to fire better). The must-nots carry over: it logs the conscience's *own* hit rate, never
    scores the founder.
  - **The conscience reads it back to calibrate (the payoff).** When a moment fires, the hook hands the
    model a **bounded** slice of the recent log (last ~1-2 sessions) so it *adjusts instead of repeats*:
    if it's raised a point and the founder moved past it for a stated reason, it says it lighter or stays
    silent; if a past nudge landed, it builds on it. This is what makes the conscience feel like it
    *remembers the conversation*, not just the venture.
  - **CLI:** `boss brain --relationship` (view the log), `boss brain record --kind relationship`
    (stamp it; the index now carries `kind` to distinguish read vs relationship), `boss brain` surfaces
    a one-line pointer, and `boss brain forget --before <date>` prunes **both** files symmetrically
    (living memory across both).
  - **Cost + safety held:** read only when a moment is firing, bounded (~900 chars), **byte-identical
    when no log exists** → 105 gate + 24 GRADED judgment evals stay green (verified). Zero-dep; the
    model owns the prose, the CLI owns the index. **FEAT-022 (the venture brain) is now complete —
    read + relationship + index + living memory.**

## 0.64.0 — 2026-06-20

- **AI-native scaffolder — `--ai` + `/comprehend` (IDEA-022 Track 3; the last track, most guarded).**
  Scaffold from what BOSS *understands*, not just a fixed template copy — built exactly to the
  guardrail: **additive, behind a flag, the deterministic template stays the default.** `boss new --ai`
  / `boss adopt --ai` do the normal reversible scaffold, then set `aiNative` in `.boss/config.json` and
  point at a new model-driven **`/comprehend`** skill (L0). The CLI never calls a model (zero-dep, layer
  1) — the comprehension is the skill's job (same predicate/runner split as `/import`). `/comprehend`
  reads what BOSS can honestly understand (an adopted repo with the wide context · the captured idea +
  `docs/source/` · or nothing-yet → it says so and stops), then **non-destructively**: fills the
  `AGENTS.md` overview with a real read, **seeds the venture brain** with an honest first dated read
  (so the conscience has continuity from day one — connects Track 3 → Tracks 0/4) + stamps the index,
  and **recommends** (never auto-applies) the disciplines that fit (`/ai-first-init`, `/design-tokens-init`,
  `secrets-guard`+`/red-team`, `/persona`). **The guardrail is in the skill itself:** everything is a
  plain-text, diffable, revertable write in the working tree — *"if it can't be diffed, it doesn't
  ship"*; it never rewrites the deterministic scaffold. Verified: `--ai` sets the flag + surfaces
  `/comprehend` (and plain `boss new` is unchanged, `aiNative:false`); eval 105/0, GRADED 24.
  **IDEA-022 is now complete — all four tracks + the spine shipped.** (The fuller presence/identity
  design + the proactive presence-moment stay deliberately deferred: a new unprompted trigger is the
  over-fire risk the conscience guards against; the v0.63 voicing *is* the presence.)

## 0.63.0 — 2026-06-20

- **The conscience now voices *with* the venture brain (IDEA-022 Track 4 — "the brain, voiced").** The
  spine (Track 0) gave the brain a read; this makes the conscience **speak with it**. When a moment
  fires, the hook reads a **bounded** slice of `.boss/brain/read.md` (the standing summary + the single
  most recent dated read — continuity, not the whole history) and hands it to the model as a
  *Continuity* frame, so the nudge is **specific to what the conscience already understands** — the
  "how did it know that" that earns trust ("you've rebuilt onboarding three times and still haven't
  talked to a user") instead of a generic line. The instruction is explicit: voice *with* the read,
  don't read it back as fact, and **trust what you see now over the brain** (the founder can correct
  it). **Cost + safety held:** the brain is read **only when a moment is already firing** (past the
  silent early-exit — never every prompt), bounded to ~1400 chars, and **byte-identical output when no
  brain exists** — so the **105 gate evals + 24 GRADED judgment evals stay green** (verified; the
  judgment fixtures have no brain, so they're unaffected). The proactive "presence moment" (the
  conscience surfacing its read unprompted) is deliberately **not** built — a new always-on trigger is
  the over-fire risk the conscience itself guards against; the voicing *is* the presence. **IDEA-022:
  Tracks 0, 1, 2, 4 now shipped; Track 3 (AI-native scaffolder, flag-guarded) is the last.**

## 0.62.0 — 2026-06-20

- **`/red-team` — turn BOSS's defenses into evidence (IDEA-033 #3; the "defense → measured" Anthropic
  move).** `agent-security` is *prevention* (the deny-list floor, secrets-guard ceiling, Rule of Two);
  `/red-team` is *proof*. A new **L1 skill** that adversarially tests an AI-mediated FEAT (or BOSS's own
  conscience hook, `--self`) against the **OWASP 2025 LLM Top 10** — prompt injection (direct +
  indirect), sensitive-info disclosure, improper output handling, excessive agency, system-prompt
  leakage, vector weaknesses, misinformation, unbounded consumption, supply chain, data poisoning. Each
  category gets a **binary pass/fail + the attack that proved it**; **failures become `/evals` cases**
  (defense → test → regression-proof), pairing with `/evals` (correctness) and the agent-security
  practice (prevention). Cohort-aware (domain-expert gets the full battery + escalation route;
  first-product gets the high-value subset in plain language). Honest scope line every run: red-teaming
  lowers risk, it doesn't certify safety; the deterministic deny-list floor stays the load-bearing
  prevention. Registered in L1; `boss map` + cheatsheet updated; eval 105/0.

## 0.61.0 — 2026-06-20

- **Scouted skillsmp.com; routed two Anthropic skills through `/vet` → `/boss-learn` (dogfood).** Five
  marketplace skills reviewed against BOSS's own machinery; the on-principle move was to *vet, not
  hand-absorb*. Two earned an ADAPT, three did not. **What landed:**
  - **`library/practices/skill-authoring.md`** (new) — from Anthropic's `skill-creator` ([RVW-013](../docs/research/verdicts/RVW-013-skill-creator-authoring-discipline.md),
    ADAPT). Fills a real void: BOSS authors skills as its core motion but had *no* written authoring
    discipline. Captures the three transferable principles — explanatory-over-prescriptive (the
    IDEA-014 / Principle #2 stance applied to *how we write skills*), progressive disclosure, and
    descriptions that earn their triggers — plus a ship-time self-check. The heavy with/without
    **eval-harness is deliberately left out** (duplicates `/vet` + `conscience-evals/`); deferred to IDEA-033.
  - **`design-system.md` → "Aesthetic ambition — past the slop default"** — from Anthropic's
    `frontend-design` ([RVW-014](../docs/research/verdicts/RVW-014-frontend-design-aesthetic-ambition.md),
    ADAPT). The practice owned the *discipline* axis (tokens, the 47 blues, missing states) but was
    silent on the *taste* axis. Adds the anti-AI-slop stance, the five aesthetic dimensions, and a
    one-paragraph design-thinking pre-pass — **bounded by BOSS's restraint** (a11y + five states + perf
    are floors; minimalism is the safer default for a green founder, against the source's maximalist lean).
  - **Three rejected, recorded:** `ui-ux-pro-max` (checklist mined into IDEA-033; CLI+DB machinery
    rejected — zero-dep ethos), obra/superpowers `brainstorming` (its "every project, no exceptions"
    is the literal anti-thesis of BOSS's JIT bet; two micro-techniques harvested to IDEA-033),
    `code-reviewer` (already dominated by Claude Code's own `/code-review`).
  - IDEA-033 backlog extended (items 6–8: skill-eval harness, UI/UX pre-delivery checklist, `/spec`+`/consult`
    question-discipline audit) — each earn-it-gated, not green-lit.

## 0.60.0 — 2026-06-20

- **`docs/PATTERNS.md` — the patterns writeup (the packaging "cool" move, documented).** A public-facing,
  builder-audience doc that names the engineering patterns BOSS is built on, **framed in Anthropic's own
  2026 vocabulary with real numbers** — the highest-resonance, lowest-effort move from the Anthropic-appeal
  research (it's *packaging* what BOSS already has, not new engineering):
  - **The conscience separates the doer from the judge** (their #1 2026 motif) — a deterministic
    `UserPromptSubmit` hook (438 lines, **zero model calls of its own**) that gates, then hands the model
    a *bounded* read in a *fresh* context. Unprompted + isolated.
  - **Two eval surfaces, with numbers:** 105 deterministic gate cases / 0 failures + **24 GRADED**
    LLM-judge cases (separate pass, transcripts read).
  - **Progressive-disclosure skills:** 29 skills, **~1.7k tokens avg** (< Anthropic's 5k guidance),
    loading JIT (~100-token description until invoked).
  - Dormant-by-default hooks + frequency-not-tokens cost ledger; security lineage (deny floor →
    secrets-guard ceiling → Rule-of-Two) stated honestly; AGENTS.md portability; persona-as-both.
  - **The honest limits are not buried:** zero real founders (its own canvas's 100%-risk), the conscience
    is Claude-bound, a synthetic judge is still synthetic. (Anthropic rewards honest framing over theater.)
  Linked from the README ("building agent tooling yourself?"). Ships (tracked doc). No behavior change.

## 0.59.0 — 2026-06-20

- **Venture-brain living memory — the write/evict side (IDEA-022 Track 0; the research's #1 capability
  gap).** The brain spine (`boss brain` + `record`, model-owned `read.md` + CLI-owned `index.json`)
  had the *read* side; this adds the **write/evict** side the 2026 gaps research named as the biggest
  upgrade (Anthropic's memory tool + context editing: +39% / 84% fewer tokens) — and which `brain.js`
  itself named as next. **Living memory ≠ infinite memory:**
  - **`boss brain --diff`** — the read's *evolution* (date + headline per session, from the index):
    continuity made visible without dumping the whole prose.
  - **`boss brain forget --before <date>`** (or `--id <bN>`) — the **evict** side: drops dated reads
    older than the date from `read.md` + prunes matching index entries, **keeping the standing summary
    (preamble) + recent reads**. Founder-invoked, *never automatic* — it's an opinion about a person,
    so only the human prunes it (on-principle).
  - **Recency-window gate** (8 sessions) — `boss brain` nudges toward compression/eviction when the
    read gets long, so the always-loaded surface stays lean (the bloat the conscience itself warns
    against).
  - **`/close` pairs the model side:** when the read spans many sessions, fold the oldest reads'
    lasting conclusions into the standing summary at the top, drop the verbatim old blocks. The
    standing summary survives; dated blocks are working history that ages out.
  Additive to the parallel-session spine (no existing behavior changed); zero-dep, format-based block
  handling (CLI owns boundaries, model owns content); verified in `/tmp` (diff, evict-preserving-
  preamble, gate); eval 105/0. **IDEA-022: Tracks 1+2 + the Track-0 spine's living-memory increment now
  shipped; Track 4 (fuller voicing) + Track 3 (AI-native scaffolder) remain.**

## 0.58.0 — 2026-06-20

- **Scaffold `AGENTS.md` — host-neutral, fixes a self-contradiction (IDEA-032).** The clearest cheapest
  miss from the 2026 gaps research: BOSS scaffolded **Claude-only `CLAUDE.md`**, locking every venture
  to one host — against its own [IDEA-006](../docs/ideas/IDEA-006-conscience-host-portability.md)
  host-portability principle + Principle #5 (optionality). Fixed the way **Anthropic's own docs
  recommend** (verified via `code.claude.com/docs/en/memory`): `AGENTS.md` carries the host-neutral
  working rules + conventions (read directly by Codex/Cursor/Copilot/Devin/…); `CLAUDE.md` is a thin
  Claude-specific layer that **imports it via `@AGENTS.md`** (loads into context at launch — no
  duplication, no drift) and adds the skills/conscience/mode-ladder below. `boss new` emits both;
  **`boss adopt` handles every case non-destructively** — bare repo → both copied; existing CLAUDE.md
  → preserved + an adopt block that `@AGENTS.md`-imports the (now-present) rules; existing AGENTS.md →
  preserved + BOSS's working rules appended as a marked block. New reusable `appendMarkedBlock` helper.
  Verified all four cases in `/tmp`; eval 105/0; `npm pack` ships `AGENTS.md`. **A concrete
  down-payment on IDEA-006 + an Anthropic-appeal signal (portability is the property they evangelize).**

## 0.57.0 — 2026-06-20

- **`/consult` — convene the mentor board on a cross-cutting question (IDEA-022 Track 2).** Some
  decisions don't belong to one mentor (raise-vs-bootstrap touches fundraising + business + GTM +
  humane at once). A new **L1 skill** that orchestrates the individual `mentor-*` agents: route the
  question to **only the mentors with a stake** (read the installed board from `.boss/manifest.json` —
  it grows by mode), get each take **in its own lens** (grounded in the canvas/RESUME/FEAT, pushback
  included), then **synthesize with the disagreement kept visible** — *where seasoned advisors disagree
  is where the real decision lives; never average them into mush.* `mentor-humane` keeps its standing
  **override authority**; the synthesis ties back to the canvas's riskiest assumption and **hands the
  call back to the founder** (advisory, never a gate; record which lens you followed + why). Reads/
  writes the venture brain (`.boss/brain/`) when present (IDEA-022). Registered in L1; `boss map` +
  cheatsheet updated; eval 105/0. **IDEA-022 progress:** Track 1 (`boss adopt`, v0.56) + Track 2
  (`/consult`, v0.57) now shipped; Tracks 3-4 (AI-native scaffolder, venture-brain voicing) remain.

## 0.56.0 — 2026-06-20

- **`boss adopt` — bring BOSS into an already-started repo, non-destructively (IDEA-005; Track 1 of
  IDEA-022).** The largest realistic adoption path — most founders have a repo *before* they hear about
  BOSS — and the one people kept asking for. `boss adopt [--mode <m>]` in an existing dir: copies only
  what doesn't collide (a new `cpSafe`/`applyStageSafe` — **never `cpSync`'s clobber**), merges the
  conscience-hook registration into an existing `settings.json` *additively* (the founder's permissions
  + their own hooks preserved), appends a small marked block to an existing `CLAUDE.md` (or copies the
  template's if there is none), stamps `.boss/` as **not-self-hosted + adopted**, and registers it.
  **"Lite BOSS" is the design, not a fallback (Principle 2):** defaults to the lightest register
  (Quickstart); `--mode mvp` adopts the *full chain* (lays down Quickstart's foundation too, exactly as
  `boss new` + `boss unlock mvp` would) for a brownfield app that's already earned it. Idempotent
  (refuses re-adopt → points at `boss sync` / `boss unlock`). Once adopted it's a normal registered
  project on the usual sync loop — no special-casing. Verified end-to-end in `/tmp`: a real repo's
  `CLAUDE.md`, `settings.json` (custom permission + `Stop` hook), `README`, and `src/` all preserved;
  conscience loops + hook land so it can fire; `boss map` works; `--mode mvp` lays L0+L1. eval 105/0.
  Wired into `boss --help`. **This is also IDEA-022 Track 1** — the living conscience needs a venture
  to read, and adopt is how an existing one gets a venture brain.

## 0.55.0 — 2026-06-20

- **`/persona` — your app's target-user as a consultable agent voice (IDEA-031).** Occasioned by
  Ajesh: *"if I wanna build an app for moms to track chores, the first persona is moms… we can do a
  Q&A with the builder, online research, or a UX researcher drops their research in… the app uses it
  as an agent voice to guide product decisions"* — *"its also the QA, its both right?"* A new **L0
  skill**: **derive** the primary target-user persona from the idea → `docs/personas/<slug>.md`
  (who · context · jobs · pains · values · *what we don't know yet* · synthetic/real evidence ledger);
  **enrich** from four sources (builder Q&A · `deep-research` online · drop-in real research via
  `/import` · passive read of idea/canvas); **consult** in voice in **both directions** — *guidance*
  ("would she want X?") and *QA* (Husain-discipline structured reactions on a build, comparable across
  versions). **The discipline is the product:** every consult is framed as a *pre-filter, never
  validation* — balances interest with concerns, names its blind spots, and closes with the
  go-ask-a-real-one caveat (Fitzpatrick/Mom Test); synthetic shrinks as real grows, visibly. Reuses
  [IDEA-009](../docs/ideas/IDEA-009-proto-personas-as-evolving-instruments.md)'s evolving-instrument
  methodology pointed at the *founder's* users (vs. BOSS's internal cohort instruments). Registered in
  L0; `boss map` + cheatsheet updated; eval 105/0.
- **`/prototype` refined by its own persona-reactions pass (IDEA-009 instrument working).** Ran the 4
  BOSS-internal personas on the new features (`/prototype`, kanban, upstream conscience); the
  convergences drove real fixes: (1) the after-run nudge now leads with a **concrete plain-language
  action** and lets *"I don't know yet"* be a fine answer (beginners bounced on `/canvas` /
  "pressure-test" jargon); (2) the **5-token pass is skipped on throwaway sketches** by default
  (eng-builder caught it contradicting "tangible beats pretty"); (3) **`--stack=<x>`** is now a
  first-class option + the stack pick is narrated in plain words for beginners; (4) trimmed the
  defensive over-explanation (dropped the "not vibe coding" protest; sketch-vs-MVP named once; the
  "becomes the MVP" rule now names the *real* failure — bolting auth onto throwaway code). The
  build-integrated eval channel caught design issues before a real founder hit them — first evidence
  for IDEA-009's claim #1.

## 0.54.0 — 2026-06-20

- **Upstream conscience — `/spec` now asks "is it worth building?" not just "is it built right?"
  (IDEA-026 Part A, closes IDEA-026).** The biggest *conceptual* delta from the 2026 leader scan
  (Ng's "PM bottleneck," Appleton's "align before the agent runs"), shipped the small + safe way the
  host-subtraction audit found: **not a new always-on loop, a voice-sharpening of the existing
  `spec-loop` restraint** (which already fires, skill-invoked, when the founder reaches for `/spec`
  before the canvas closes). The restraint frame now surfaces the *substantive* gap — *who is this
  for, and what's the bet that could sink it?* — not a checklist. **Respects `/prototype`:** a
  throwaway sketch needs none of this (build-first is legitimate); the question fires only when
  committing to build *for real*. eval gate 105/0 (skill-voice change, no predicate change).
- **Positioning reframe — README opener now leads with the judgment gap (option C).** *"Everyone can
  build now. Almost no one can tell a real business from a convincing demo. BOSS is the conscience
  that keeps you honest while you move fast."* + the floor/ceiling subline (*vibe coding gets you a
  demo; the discipline on top gets you a business*). The 2026-vocabulary update to positioning
  (harness-is-the-moat / agentic-engineering-is-the-discipline), in BOSS's voice. Full draft +
  rationale in the gitignored `docs/dossier/positioning-reframe-2026.md`.

## 0.53.0 — 2026-06-20

- **`/judge-traces` — the deliberate reader for the trace substrate (IDEA-025 Phase 2).** v0.48 shipped
  `auto-log` (collects `.boss/trace.jsonl`); this is the skill that *reads* it — completing a
  shipped-but-inert capability (a substrate nothing reads has no purpose). A new **L1 skill** applying
  Hamel/Shankar's 2026 discipline to the founder's *own* sessions: read real traces → factual shape
  first (cheap, deterministic) → sort failures into a **binary** pass/fail taxonomy (`wrong-files`,
  `thrash`, `silent-scope-creep`, `no-trace-of-the-point`, or your own) → route *recurring* modes to
  `/boss-learn`. **One expert not a committee; don't grade its own homework (judge the trajectory);
  counts are the signal.** Graceful degrade: no trace → honest "nothing to judge yet, turn on
  `auto-log`," never a fabricated taxonomy. **Collection ≠ judgment** stays load-bearing: `auto-log`
  collects passively, `/judge-traces` judges deliberately — never fused into an always-on auto-grader.
  Registered in L1; `boss map` + cheatsheet updated; eval 105/0.
- **Host-subtraction audit drafted (IDEA-028) + an IDEA-026 Part A finding (workspace docs).** The
  `mentor-architect` pass concluded **retire nothing**: BOSS's conscience fires *unprompted/event-driven*,
  and native `/goal`/`/loop` are *user-invoked* — they can't replace a conscience that speaks when you
  wouldn't have asked, so the host did *not* absorb the loop runtime (the moat). Sit-on the host for
  future orchestration (dynamic Workflows) + the secrets ceiling (auto-mode hard-deny); keep the
  `permissions.deny` floor (more portable). **Bonus finding:** `spec-loop` already implements most of
  the "upstream conscience" (IDEA-026 Part A) — it fires restraint when the founder reaches for `/spec`
  without the canvas closed — so Part A is a *voice sharpening of spec-loop*, not a new `worth-building-loop`
  (which would redundantly overlap spec-loop + caution + drift). Left for Ajesh's eye on the exact
  voice (it touches conscience tone). No code retired; decision-input only.

## 0.52.0 — 2026-06-20

- **`/prototype` — drop an idea, hit go, see something tangible (IDEA-030).** Ajesh's framing settled
  the design: *"not just vibe coding, but not gatekeeping until so much thought… building first in a
  lean cycle is a place to start, not waiting until the other two are clear. People can fill in the
  missing pieces after they get the gist out of their head and see something tangible."* A new **L0
  skill** that builds the smallest runnable, clickable version of an idea — the ONE core interaction,
  in whatever stack gets to "click it" fastest, mock data freely, the 5-token distinctiveness pass so
  it doesn't look generic — then runs it. **The load-bearing call:** the conscience fires **AFTER** the
  thing runs ("there it is — does seeing it change the idea? when you're ready: `/canvas`"), **never a
  gate before** — building first *is* a legitimate first move in the loop, not a skip of it. Cohort-
  aware (first-product gets the magic moment; eng-builder gets stack control; domain-expert gets the
  "this is a sketch, not a regulated tool" guardrail up front). Honest framing held: it's a *sketch to
  think with, named once, not your MVP* — and the graduate ladder (`unlock mvp` → `/spec` → `/evals`)
  is what keeps a fast prototype from becoming a pseudo-app (PRINCIPLES). Registered in the L0
  manifest; `boss map` + cheatsheet updated; eval 105/0.

## 0.51.0 — 2026-06-20

- **Visual kanban (`boss board --html`) + a voice-tightening pass.** Two founder-experience asks.
  - **`boss board --html` — the board, as a visual kanban.** Ajesh: *"having a visual kanban state
    that can be updated when the board is is super helpful."* Promotes the HTML view IDEA-015 deferred
    behind an earn-it gate. Same **pure projection** as the terminal board (`collectBoard`) rendered to
    a self-contained `.boss/board.html` — zero deps, no server, no JS framework; four columns
    (Captured / Taking shape / Building / Shipped), cards with id + title, `↻ review due` + `blocked`
    flags, the evidence line + riskiest-assumption framing on top, light/dark, responsive. Opens in
    the default browser (best-effort; the printed path is the contract). "Updated when the board is" =
    re-run it — it's a read of the files, never a maintained doc (the IDEA-015 discipline holds). Wired
    into `boss --help` + `boss map`.
  - **Voice pass (voice-keeper full audit — verdict: "in remarkably good shape").** Applied the
    high-leverage fixes: dropped the `🎯` emoji that shipped into the founder's own canvas template;
    unified the cohort question wording so `/welcome` and `/boss` are *actually* identical (they
    claimed to be); settled the self-description on **"build tool"** (not "build companion" — the
    ethos is conscience/tool, not coach); collapsed the most-read `boss new` first-run lines to one
    bold path + demoted fallbacks (matching `/welcome`'s own discipline); collapsed the `boss insights`
    triple-stated telemetry footer; dropped an inside-baseball `/ai-cost` wink in `boss conscience
    cost`; de-"coach"-ed the README mentor line against the settled ethos; added `boss brain` +
    `boss insights` to the `boss map` standing-controls so the live cheatsheet agrees with `--help`.
    (Kept the maintainer-only `Learned … UP` vocabulary deliberately — UP/DOWN is load-bearing
    Principle-1 language and the reader there is always the maintainer.)
  - **Captured (not built): [IDEA-030 "drop an idea and hit go"](../docs/ideas/IDEA-030-drop-an-idea-hit-go.md)** —
    a fast path to a runnable prototype. Philosophically loaded (the pseudo-app trap is *why BOSS
    exists*), so captured with a concrete `/prototype` proposal + the resolution (see-it-not-sell-it,
    conscience-attached, the graduate ladder as the honesty mechanism) and four shape questions for
    Ajesh — a decision to take together before building.
  - Eval gate 105/0; judgment GRADED; HTML render + voice fixes verified end-to-end in `/tmp`.

## 0.50.0 — 2026-06-20

- **Close the trends-pass loose ends (IDEA-027 #4 + IDEA-026 Part B wiring).** Ajesh's audit prompt —
  *"did we miss anything else to implement? you did a lot of lookup."* Two genuine loose ends from the
  research, both now closed:
  - **`boss board` surfaces "review due" — the trigger half of `/revalidate`.** v0.48 shipped the
    revalidation *gate* but nothing *surfaced what to revalidate* — a half-feature. The board now reads
    each item's `next_review:` frontmatter and flags any whose date has passed (`· ↻ review due`) plus
    a footer line `↻ N past review — run /revalidate <id>`. **Frontmatter-true, never guessed:** no
    `next_review` date → not flagged (an age-inferred "stale" signal would be noise the founder learns
    to ignore). Completes the dhun-ported revalidation lifecycle; `boss board` stays a pure projection
    (no new state).
  - **Agent security wired JIT into `/ai-first-init` (Step 5.5).** v0.49 shipped `agent-security.md` as
    an UP practice, but founders don't read `library/` — so the lethal-trifecta / Rule-of-Two framing
    now surfaces *in the AI-native day-one sequence* (one sentence on a Quickstart; more ceremony as
    the app reads untrusted input / handles regulated data). Names the surface, points at the
    `permissions.deny` floor + `secrets-guard` ceiling + the deterministic-guard rule.
  - Eval gate 105/0; judgment GRADED + no blocking failures; board staleness verified end-to-end in
    `/tmp` (past-review flagged, future-review not). **Honest remaining map (deliberately staged, not
    missed):** IDEA-025 P2/P3 (`/judge-traces` + trace-fed learn loop — need accumulated traces),
    IDEA-026 Part A (upstream conscience — needs the IDEA-028 host-mount), IDEA-028 host-subtraction
    audit (a decision to take *with* Ajesh, not autonomously), AGENT_DOC_MAP (until two agents
    collide), the SDD-vocabulary + "agentic-engineering" positioning reframes (mentor-pitch territory),
    and publishing the library on the open Skills standard (IDEA-006 distribution).

## 0.49.0 — 2026-06-20

- **Embed the 2026 best-practices — design, evals, security feel current across the board (IDEA-029 +
  IDEA-026 + the trends pass).** Ajesh's follow-on to v0.48: *"on all research you surfaced (not just
  design), let's ID all critical to add to our current work, and just go and embed it… make BOSS feel
  very up to date with best practices."* Where v0.48 shipped the dhun *machinery*, this embeds the
  *thinking* into the surfaces founders actually touch. Provenance:
  [SESSION-2026-06-20-ui-design-scan](../docs/research/sessions/SESSION-2026-06-20-ui-design-scan.md).
  - **`/design-tokens-init` — the 5-token distinctiveness pass + DTCG/semantic naming (the design
    win).** Three layers already prevented *drift*; the new section prevents *sameness* — the
    "shadcn trap" (slate/Inter/8px/indigo = generic-AI-app look) broken by five deliberate overrides
    (warm neutral · intentional radius · type pairing · one owned accent · **one "signature token"**),
    cohort-aware. Plus: name semantic tokens by **purpose not hue**, emit **W3C DTCG** where the stack
    allows (portability, no lock-in), and **inline a semantic→primitive map into CLAUDE.md** so the
    agent inherits the brand on every turn. (freedesignmd · Vercel · Curtis · W3C DTCG.)
  - **`/evals` — the 2026 Hamel/Shankar sharpening.** Error analysis on **real traces** first (and a
    pointer to v0.48's `.boss/trace.jsonl` as that raw material); **binary pass/fail, not 1–5 scores**;
    **one expert, not a committee**; **don't let the model grade its own homework** (separate verifier
    + trajectory-not-just-endpoint); a **60/30/10** deterministic/judge/human cost hierarchy.
  - **New UP practice `library/practices/ai-ux-patterns.md`** — the interaction layer (where
    `design-system.md` owns the look): "why this" rationale grounded in the user's own inputs ·
    confidence-as-register · **Notify/Question/Review** interrupt registers · **edit-before-execute +
    risk-tiered gates** (four decision verbs; gate by loss type) · **trust-repair after a miss**
    (asymmetric recovery) · progressive disclosure · **discernment — knowing when not to speak — as a
    first-class fundamental** · pinned canonical refs (Shape of AI / HAX / IBM Carbon; community
    catalogs via `/vet`). Captured as [IDEA-029](../docs/ideas/IDEA-029-ai-native-interface-patterns.md),
    extends IDEA-010.
  - **`docs/mentor-practitioners.md`** AI-UX heuristics block updated with the 2026 additions +
    pointer to the new practice.
  - Library-layer + skill-content changes (no new template skill, no CLI change); eval gate 105/0,
    judgment GRADED + no blocking failures; `boss new` + `unlock mvp` verified the upgraded skills
    ship. **Staged from the design scan:** planning-as-collaboration / mid-run steering (Appleton —
    twin of IDEA-026 Part A), RESUME-as-agent-inbox, wrapper-vs-flatten-per-cohort.

## 0.48.0 — 2026-06-20

- **The 2026-trends + dhun-scan pass — first builds (IDEA-025/027/026).** Occasioned by Ajesh:
  *"with all the latest trends since we built BOSS… as well as potential new methods inside dhun, let's
  assess what BOSS can better improve upon."* Three research passes (external 2026 trends; a 2026-only
  scan of the named practitioners in `docs/mentor-practitioners.md`; a full catalog of the sibling
  **dhun** project's working-method machinery) → captured as
  [IDEA-025](../docs/ideas/IDEA-025-trace-native-conscience-and-evals.md)…028 with full provenance in
  [SESSION-2026-06-20](../docs/research/sessions/SESSION-2026-06-20-trends-and-dhun-scan.md). This
  release ships the concrete, proven, low-risk slice; the conceptual reframes (upstream conscience,
  host-subtraction) stay specced-and-staged. **Three new dormant/UP capabilities — no behavior change
  until opted in:**
  - **`auto-log` trace substrate — the keystone, shipped dormant (IDEA-025 Phase 1).** A zero-dep Node
    SubagentStop hook (`library/hooks/auto-log.js` + L1 template) that appends one honest line to
    `.boss/trace.jsonl` per writer-subagent — session, agent, files actually changed (reads
    `git status --porcelain`, so it catches *new* files too, not just tracked diffs), with last-line
    dedup and read-only-agent skip. **The within-session complement to v0.47's `boss insights`**
    (cross-project registry): both honest-trace, local-only, append-only, measure-don't-instrument
    (inherits the IDEA-021/013 contract). It's the raw material a future trace-native judge
    (`/judge-traces`) + sleep-time learn loop read — Hamel ("error analysis on real traces") + Chase
    ("traces, not code, are the source of truth"). **Dormant** (a SubagentStop hook costs per-subagent
    latency — registration is the opt-in, same as `secrets-guard`).
  - **`memory-cue` hook — feedback→memory nudge, shipped dormant (IDEA-027 #1).** Ported UP from the
    dhun dogfood, Node-ported for the zero-dep rule (`library/hooks/memory-cue.js` + L0 template). A
    UserPromptSubmit hook that regex-detects a feedback signal (directive / corrective / confirmation)
    and *nudges* the model to save it to memory — never auto-writes (wording needs reasoning), silent
    on no-match (zero token cost). Serves the `library/memory-seed/` ambition.
  - **`/revalidate` — the 3-line gate against zombie features (IDEA-027 #2).** A new L1 skill (+
    `library/practices/revalidation.md`) ported UP from dhun's REVALIDATION lifecycle: before paused
    work re-enters the build, answer *still relevant? still aligned? anything changed?* → revive /
    rescope / kill / re-pause. BOSS eats it first — `docs/RESUME.md` carries a long deferred list.
  - **Two new UP practices** distilled from the same scan: `library/practices/quality-ratchet.md`
    (dhun's `.ratchet` one-way-baseline pattern, stack-neutral) and `library/practices/agent-security.md`
    (Simon Willison's 2026 lethal-trifecta / "Agents Rule of Two" / "deterministic guard around a
    non-deterministic model" — IDEA-026 Part B, the next ring after `secrets-guard`).
  - Zero-dep held (Node built-ins only; `npm pack` verified — all new files ship). Hooks dormant
    (settings.json unchanged; only `conscience.js` registered). `boss map` shows `/revalidate`;
    eval gate clean (no blocking failures); judgment GRADED 7/7; tested end-to-end in `/tmp`
    (`boss new` + `boss unlock mvp`, both hooks present + dormant, skill present).

## 0.47.0 — 2026-06-19

- **Humane two-way learning channel — built the moment BOSS went public, the humane way (IDEA-024).**
  Going public (MIT, github.com/ajeshh/BlueprintOS) turned a private dogfood into a thing strangers
  run, which needs a way to learn + pivot. Ajesh asked for "feedback from end-users, and learn
  *passively* how users use it." The second half is the exact surveillance line BOSS exists not to
  cross ([IDEA-021](../docs/ideas/IDEA-021-passive-instrumentation-and-fleet-learning.md)). Applied
  BOSS's own conscience (mentor-humane fork; PRINCIPLE: humane before viable) and built the honest-trace
  version instead — **no silent telemetry.**
  - **`/feedback` (direct, user-initiated).** A founder-facing skill in L0: send a bug / confusion /
    wish back upstream. Shows the founder the exact title + body + the *one* line of context
    (`BOSS <ver> · <mode> · <OS>`) before anything leaves the machine; files a GitHub issue via
    `gh issue create`, or falls back to a prefilled issue link to paste. Public-repo warning stated.
    Never automatic, never a hook.
  - **`boss insights` (passive, the humane way).** Reads the trace your own work *already leaves* —
    your registered projects on *this machine* — and reports where each venture's loop stands
    (idea → canvas → build), flagging empty / untested / stale. **Measures graduation + loop-closure,
    never activity/engagement** (the vanity metric BOSS refuses to expose). Local-only; nothing is
    sent. Zero-dep (`src/insights.js`).
  - **Opt-in share-up contract.** New `shareUp: false` default in `.boss/config.json` — any future
    cross-user learning is gated on this flag being true *and* a per-send confirmation, by construction.
    Telemetry is never a default.
  - **Not built (deferred, named in IDEA-024):** silent cross-user telemetry (the line — not crossing
    it); a full `npm publish` / auto-update pipeline (premature at n≈1 — `boss status` already nudges
    on version drift; the real risk is demand, not distribution). Captured in
    [SESSION-2026-06-19-founder-test](../docs/research/sessions/SESSION-2026-06-19-founder-test.md).

## 0.46.0 — 2026-06-19

- **Bring-your-own-material import — the on-ramp from "I jotted it somewhere" (IDEA-023).**
  Occasioned by a live founder-test: a founder ran `boss new`, then stalled — the idea lived in a
  Word doc / Google Doc / Obsidian note / PDF / deck / URL, and there was **no way to bring it in**.
  A correctly-scaffolded but idea-less project read as *"empty… I'm stuck."* This closes that
  first-run dead-end.
  - **Load-bearing decision:** import lives in the **skill layer, not the zero-dep CLI** — the CLI
    (Node built-ins only, Principle 4) can't parse PDF/docx or fetch a URL, but the model already
    reads heterogeneous formats natively. Same predicate/runner split as the loop runtime (IDEA-008):
    deterministic core stays deterministic; the model does the parsing + shaping.
  - **What ships:** (1) `/boss` §1 now ingests **one-or-more sources** — local files *and* URLs, in
    any mix — snapshots a durable copy of each into `docs/source/` ("the project owns a copy"), and
    synthesizes across all of them before shaping the idea. (2) A new **`/import`** skill (registered
    in the L0 manifest) for adding material to an *already-captured* idea, or as an alternate spin-up
    door. (3) **Discoverability fix** — the part that actually stuck the founder: `boss new`'s "Next:"
    block now shows `code <name>` (editor handoff) + the file/url/import options; `/welcome` (both the
    full tour and the 30-second version) and the L0 `CLAUDE.md` template all advertise bring-your-own
    material.
  - **Deferred (named in [IDEA-023](../docs/ideas/IDEA-023-bring-your-own-material-import.md)):**
    material-first ordering (point at material → BOSS names the folder), binary/OCR formats
    (`.pptx` text, image-only PDFs), live-source re-pull vs. one-time snapshot, and a CLI
    `boss import` second door (only if the skill path proves it's wanted outside Claude).
  - Dogfood target: `~/Projects/fraands` (the project that surfaced the gap). Surfaced + captured in
    [SESSION-2026-06-19-founder-test](../docs/research/sessions/SESSION-2026-06-19-founder-test.md)
    (OBS-002/003/005).
- **`/welcome` closes on the action — long content no longer buries the next step (OBS-001).**
  Same founder-test: *"the welcome message is a bit too long… I forget what I'm supposed to do next."*
  The skill already had an "end on one next step" rule, but the beginner tour printed three full
  reference sections (conscience / modes / help) *after* the next step, walling it off. Fix: a new
  voice rule ("close on the action — long content must tie back to the next step"), and a structural
  **pivot** — after the shape + next step, the three reference sections are now **offered, not dumped**
  (tagged `reference — expand only if asked`); the founder leaves on `/boss` or `/triage`, not on a
  wall. (OBS-004 — host-switching across Claude app/VSCode/Cursor — logged, deferred to IDEA-006.)

## 0.45.0 — 2026-06-05

- **JIT working-context, Phase 1 — every `boss new` project is now JIT-by-construction (FEAT-020).**
  The deny-list (v0.42) made projects secrets-safe by default; this makes them *context-lean* by
  default. The principle was already vetted (`context-discipline` practice, RVW-005/010) but only
  *described* path-scoped rules — now the templates **ship** them. This is Phase 1 of a 4-phase
  lifecycle ([`docs/ideas/FEAT-020`](../docs/ideas/FEAT-020-jit-working-context-lifecycle.md)); Phases
  2-4 (`/close` GC, promote-on-evict via `/extract`, a freshness moment) are specced + deferred with
  triggers.
  - **What ships:** `.claude/rules/` examples with `paths:` frontmatter that load **only when Claude
    opens a matching file** (not at session start) — L0 `your-app-code.md` (the basic path-scoped
    pattern), L1 `feature-context.md` (the live feature's working notes, which Phase 2's `/close` will
    later compress to a one-liner). The two-memory cut that decides what goes where is documented in
    the new `library/memory-seed/` shelf (README + an example durable-facts seed). L0 `CLAUDE.md`'s
    Memory line now names both halves (durable → auto-memory; working-state → path-scoped rules).
  - **Verified before building:** confirmed against the official Claude Code docs (2026-06-05) that
    `.claude/rules/` with a `paths:` key is real and JIT-loaded — *not* a confusion with Cursor's
    `.cursor/rules` (`globs:`). The `context-discipline` practice's "re-verify host syntax on every
    build" rule, honored.
  - **The restraint line (carried from the IDEA):** Phases 2-4 risk being BOSS gold-plating its own
    substrate; the recency-window-by-hand is currently enough. First dogfood is BOSS's own repo — a
    Phase-1 slice going stale and misinforming a session is the cleanest Phase-2 re-open signal.
  - Zero-dep held; tested end-to-end in `/tmp` (`boss new` → rule present; `boss unlock mvp` → feature
    rule added). `mentor-architect` pass + 4 forks decided with Ajesh recorded in the FEAT.

## 0.44.0 — 2026-06-02

- **`secrets-guard` PreToolUse hook — the high-stakes ceiling, shipped opt-in (closes the RVW-005
  follow-on, the principled way).** The v0.42 deny-list is the universal zero-cost floor; this hook is
  the broader-coverage ceiling — and the v0.42.1 reconsideration said it must NOT be a universal
  default (a `PreToolUse` hook spawns a process on *every* tool call). So it ships **dormant**:
  `library/hooks/secrets-guard.js` (canonical) + `.claude/hooks/secrets-guard.js` in the L0 template,
  **not registered by default.** Registration is the on-switch (an unregistered hook costs nothing),
  recommended for the `domain-expert` / regulated cohort.
  - **Behavior:** Read/Edit/NotebookEdit of a secrets file (`.env`/`.env.*`/`secrets/**`) → **deny**
    (reading secret contents into context is the leak); Bash or MCP referencing a secrets path →
    **ask** (don't hard-block legit `.env` *creation* — surface it to the human); else allow.
    **Fail-open** (any parse/runtime surprise → allow; a guard that breaks the session is worse than
    one that occasionally misses, and the deny-list floor still hard-blocks the common vectors).
  - **Tested** (10 cases, piped PreToolUse events): denies Read/Edit of `.env`/`.env.local`/
    `secrets/`; allows `src/app.js`, `npm test`, and `.environment.ts` (no false positive); asks on
    `cat .env` + MCP-with-secrets; fail-open on malformed input. Zero-dep Node, output per the Claude
    Code PreToolUse contract (JSON `permissionDecision`, exit 0).
  - **Cohort auto-registration deferred** (a clean follow-on): wiring `domain-expert` cohort setup to
    register it automatically. Today it's documented opt-in (snippet in the file header + the
    `context-discipline` practice).

## 0.43.0 — 2026-06-02

- **Wayfinding, Pass 1 (IDEA-018) — `boss map` + a doc generator that can't rot.** Occasioned by a
  docs-health pass that found the README **19 releases stale** and, worse, that there was **no "how to
  use BOSS" guide at all**. The fix is shaped like BOSS itself: wayfinding, not a manual. Decisions
  locked with Ajesh — **mode ladder is the spine** (persona = entry filter, aspect = which mentor to
  ask, never chapters); **split audience** (a command ships to founders, the prose stays in the BOSS
  repo); **durable core first**.
  - **`boss map`** (CLI, ships to every project) — the *live* cheatsheet. A pure render of state the
    project already holds (the `.boss` stamp + installed `SKILL.md` files), in the `boss board`
    spirit: *You are here · available now (grouped by the rung that unlocked each skill) · one unlock
    away (the next rung's skills, read from the package, with the real project name substituted in) ·
    standing controls.* Nothing to maintain, nothing to drift.
  - **The de-rot mechanism** — `src/modes.js` is the single source both `boss map` and the generator
    read (manifests + `SKILL.md` frontmatter), so the live map and the static docs can never disagree.
    **`scripts/gen-docs.js`** (`npm run gen:docs`) emits **`docs/CHEATSHEET.md`** (the whole ladder,
    the wall-poster) and **`docs/SKILLS.md`** (one line per skill, grouped by mode) — both carry a
    GENERATED banner and are derived, never hand-typed. This is the actual fix for what bit the README:
    the per-mode lists become a build artifact, not a memory test.
  - Zero-dep held — `src/map.js` + `src/modes.js` ship; `scripts/` and the generated `docs/` stay
    dev-only (verified via `npm pack`). Eval suite regression-clean (no blocking failures, GRADED 7).
    End-to-end tested in `/tmp` (map at Quickstart → unlock mvp → map regroups + previews V1; placeholder
    substitution + width-capping confirmed). **Pass 2 (the hand-authored `docs/GUIDE.md` walkthrough)
    is the next session** — written against these generated surfaces, per the agreed sequence.

## 0.42.1 — 2026-06-02

- **BOSS eats its own context-discipline dogfood + sharpens the practice (the learning loop in real
  time).** Minutes after shipping `context-discipline` (v0.42.0), applied it to BOSS itself and
  refined it with what doing so taught.
  - **Dogfood (DOWN):** the recency-window rule (RVW-002) applied to BOSS's own `docs/RESUME.md` — the
    "State" section was a 25-entry append log read at every session start. Trimmed to the **5 most
    recent** entries; older versions point to `registry/CHANGELOG.md` (which carries all 43 versions —
    confirmed before cutting, so it's non-destructive). RESUME dropped **727 → 346 lines.** BOSS now
    practices the leanness it prescribes.
  - **Practice sharpening (the part that matters):** reconsidered the deferred PreToolUse secrets-guard
    hook and recorded *why* it's deferred, not just *that* it is. A `PreToolUse` hook fires a process
    on **every tool call** (real latency), where `permissions.deny` is a zero-cost native check. So the
    practice now states: the **deny-list is the universal floor** (always ship); a **secrets-guard hook
    is a high-stakes/opt-in ceiling** (regulated/PHI cohorts), **not** a universal default — adding
    always-on per-call machinery for marginal coverage is the framework-bloat BOSS warns founders
    against (R&H #1 / IDEA-013 cost discipline). This is `/vet`'s skepticism turned inward: even an
    ADOPT's "ceiling" gets cost-weighed before it ships to everyone.
  - No template/CLI behavior change beyond the doc + RESUME; the v0.42.0 deny-default still stands as
    the shipped safe-default.

## 0.42.0 — 2026-06-02

- **`/boss-learn` routes the sweep's first ADOPT — a "context discipline" practice, UP + a DOWN
  safe-default.** Acting on the v0.41 `/vet` sweep: the two ADOPTs (RVW-005 deny-secrets, RVW-010
  token-optimization) plus RVW-002 (lean session docs) collapsed into **one** pattern, routed two ways
  per PRINCIPLE #1.
  - **Verify-before-encode (the gate both verdicts set).** Before promoting, the version-bound Claude
    Code claims were checked against current behavior. One was **FALSE — `.claudeignore` does not
    exist** (the source post conflated it with `permissions.deny`); it was struck from the practice
    rather than shipped to every project. Confirmed: `permissions.deny` glob syntax (and that a
    `Read(...)` deny does **not** cover Bash — needs a separate `Bash(...)` rule), PreToolUse hard-block,
    `.claude/rules/` `paths:` frontmatter, CLAUDE.md load behavior. The `/vet` thesis applied to BOSS
    itself: popularity ≠ correctness, even when *BOSS* is the one adopting.
  - **UP** → `library/practices/context-discipline.md`: lean always-loaded docs (CLAUDE.md +
    RESUME recency-window), path-scoped `.claude/rules/`, `permissions.deny` for secrets *and* bloat,
    PreToolUse/PostToolUse hooks as the enforcement ceiling. Host-tagged `claude-code` with an explicit
    "re-verify syntax on host change" note (IDEA-014 recalibration). Provenance cites the RVWs — vetted,
    not adopted on stars.
  - **DOWN (product safe-default)** → the L0 Quickstart template now ships a `permissions.deny` block
    for `.env`/`.env.*`/`secrets/**` (Read + Bash) in `.claude/settings.json`, and `.gitignore` covers
    `.env.*` + `secrets/`. Every new `boss new` project is secrets-safe by default — the
    enforce-in-harness principle (RVW-012) made concrete, not left as advice.
  - **Deferred follow-ons (named, not crammed in — PRINCIPLE #2 / small steps):** a `library/hooks/`
    PreToolUse secrets-guard (catches Bash + MCP + future skills — code+test, its own step);
    mode/cohort-scoped `.claude/rules/` in the template; BOSS's own root CLAUDE.md/RESUME trim
    (RVW-002 — awaiting Ajesh's recency-window size). ADAPTs RVW-007/008 remain founder-facing/scope-gated.

## 0.41.0 — 2026-06-02

- **First `/vet --all` sweep — 10 verdicts (RVW-003…012), and the skill earned its keep.** Ajesh
  dropped a 10-item pile of AI/Claude-Code "best practices" (Reddit threads + Lenny's-newsletter posts)
  and swept them in one pass. The distribution is the proof the skill routes on merits, not reflex:
  **2 ADOPT · 2 ADAPT · 3 NOT-YET · 3 REJECT.** Only 2 clean adopts out of 10 — a skeptic, not a
  bookmark folder.
  - **The two ADOPTs collapse into ONE action — a "BOSS context discipline" practice** (the value of
    synthesizing a sweep instead of N independent verdicts). RVW-005 (hard-deny `.env`/secrets, don't
    trust prompting), RVW-010 (lean CLAUDE.md <500 tok, path-scoped `.claude/rules/`, `permissions.deny`
    for bloat, hook noise-filtering), and the earlier RVW-002 (RESUME recency-window) are facets of one
    practice; RVW-009 (context-engineering failure modes) is its research rationale and RVW-012 (Agent
    = Model + Harness, "safety lives in the harness not the model") its backing principle. Queued for
    `/boss-learn` (UP `library/practices/` + `library/hooks/` secrets-guard + DOWN BOSS's own doc trim
    + template defaults), **gated on verifying version-bound Claude Code specifics first** (IDEA-014
    recalibration territory).
  - **Two ADAPTs, both founder-facing + scope-gated:** RVW-007 (Couch-to-5K — adopt the
    smallest-next-step *philosophy* for `/welcome` + beginner-cohort nudges; **reject the daily-streak
    mechanic** as the gamification/pressure trap the canvas already refuses — a guardrail recorded so a
    future session isn't tempted); RVW-008 (categorize-agents / start-simplest — a modest
    `mentor-architect` framing, strip the enterprise + stack taxonomy per PRINCIPLE #4).
  - **Three NOT-YET:** RVW-003 (plumbing-awareness — strong founder-facing candidate, re-open when the
    founder-facing build lands), RVW-009 + RVW-012 (reference pieces — re-open at conscience
    context-injection review / IDEA-006 host-contract work respectively).
  - **Three REJECT, recorded with reasons:** RVW-004 (`/remote-control` — out of scope/low-evidence,
    but kept a humane stance on always-on agent work), RVW-006 (21-hacks listicle — wrong altitude),
    RVW-011 (n8n tutorial — PRINCIPLE #4, folded into RVW-008 as an example).
  - **A real skeptical catch:** 6 of the 10 drops were by the **same author** (one newsletter
    corpus). The sweep applied an **author-concentration discount** — cross-confirmation *within* one
    voice isn't independent evidence; the "respected practitioner" rubric rung counts once, and the
    real evidence is the *distinct* sources (the deny-secrets PSA, slaorta, StokeJar, and the
    DeepMind/Microsoft/Salesforce research cited *inside* the pieces).
  - Records: `docs/research/verdicts/RVW-003…012`; all 10 inbox items marked `resolved:`. Zero-dep held
    (`npm pack` ships 0 — all under `docs/`). No code/skill change → gate + judgment suites unaffected.
    **Nothing is built yet** — ADOPT/ADAPT hand-offs await Ajesh's go (the skill decides *whether*;
    `/boss-learn` decides *where*).

## 0.40.1 — 2026-06-02

- **`/vet` gains batch sweep — drop a pile, vet once.** From dogfooding `/vet` on real drops (RVW-001,
  RVW-002): the natural rhythm is *accumulate, then sweep*, not vet-on-arrival. `/vet --all` now vets
  every un-vetted inbox item — **each as its own full skeptical pass with its own `RVW-NNN` verdict**
  — then prints one summary table + the ADOPT/ADAPT hand-off list. No-arg `/vet` lists un-vetted items
  oldest-first and offers the sweep. Already-vetted items (a `resolved:` line or an existing verdict)
  are skipped. Clarified the old "one claim per run" rule → **"one claim per verdict"**: it always
  protected *depth-per-claim* (never collapse several claims into one shallow verdict), never forbade
  vetting many in sequence — the sweep is many full passes, not one pass over many.
- **First two verdicts on the record (dogfood):** `RVW-001` — the four-rule "Karpathy" CLAUDE.md →
  **REJECT** (BOSS already encodes all four as principles + the cohort-aware conscience; a static file
  would regress toward the frozen-rules brittleness the thread's own top critique names — which is
  IDEA-014's thesis). `RVW-002` — slaorta's lean/modular CLAUDE.md → **ADAPT** (apply the
  recency-window to `RESUME.md`'s State section, which duplicates `registry/CHANGELOG.md` and grows
  unbounded; generalizable shape is a `library/practices/` UP candidate). The REJECT/ADAPT split is
  the evidence `/vet` routes on merits, not reflex. RVW-001 also surfaced **external confirmation of
  IDEA-014** (a stranger reasoning to the recalibration thesis) — now cited in that idea.

## 0.40.0 — 2026-06-02

- **`/vet` — the skeptical inbox. The inverse of `/boss-learn`.** From Ajesh's seed: *"if i have new
  research or best practices, we should have a way where i can just drop it in, and then our mentors
  and such review and see what we should integrate. reddit is full of best practices, but that doesnt
  mean all are good ideas."* The last sentence is the whole design.
  - **Why it's the inverse, not a fork.** `/boss-learn` routes a pattern *you already proved* (built
    it, it worked, it repeated) UP into `library/` or DOWN into the app — its input has earned trust.
    `/vet` takes a claim *from a stranger* (a Reddit thread, an HN comment, a blog post, a paper, a
    "you must do X" tweet) that has earned **nothing**. Its job is the part `/boss-learn` never has to
    do: decide whether an unproven outside claim deserves to become practice **at all**. ADOPT *hands
    to* `/boss-learn` (whether → where); it never reimplements it.
  - **The filter is the product.** A drop folder with no judgment is a bookmark pile. The value is the
    skeptical read. The skill is **biased toward NO** — most internet best practices don't apply to
    BOSS, at its stage, for its thesis — and makes a claim *earn* an ADOPT.
  - **The NO-biased rubric (any one question can sink the claim):** (1) does it contradict a PRINCIPLE?
    (#6 / `mentor-humane` can veto outright); (2) evidence grade — n=1 vibe vs. pattern-with-data vs.
    respected practitioner (most claims die here); (3) duplicate or genuinely sharpen?; (4) who does it
    serve **and harm** (great for `eng-builder`, toxic for `first-product` → ADAPT-with-scoping at
    best); (5) cost/ceremony (does it make BOSS heavier — R&H #1).
  - **Four honest verdicts**, mirroring `/extract`'s UP/DOWN/NOT-YET: **ADOPT** (→ `/boss-learn`),
    **ADAPT** (modified, reasoned), **REJECT — with reason, recorded** (the quietly important one — so
    the same thread isn't re-litigated next month; the verdict log is BOSS's memory of what it
    *deliberately didn't* adopt), **NOT-YET** (with a re-open condition). Before vetting, `/vet` reads
    prior verdicts and won't re-litigate.
  - **Restraint by design (PRINCIPLE #2):** deliberate-invoke, like `/extract` and `/drift-deep` —
    **no `vet-loop`, no hook moment, no nudge to "review your inbox."** An automatic research-review
    obligation would be the ceremony BOSS exists to refuse. It also doesn't *find* research (that's
    `/deep-research`) — it judges what you bring it.
  - **Scope: internal-curation first.** `/vet` is a **BOSS-local meta-skill** (lives with `/boss-learn`
    + `/boss-sync` in `.claude/skills/`, **not** in the founder template) — it vets against
    `PRINCIPLES.md` + BOSS's own `library/` and routes ADOPT into the BOSS source. The founder-facing
    version (founder drops a thread → BOSS reads it against *their* canvas/stage/cohort) is the named
    **UP candidate** (IDEA-016), deferred until the internal version earns it.
  - Shipped: `.claude/skills/vet/SKILL.md`; drop zone `docs/research/inbox/` + verdict log
    `docs/research/verdicts/` (each with a README); new **`RVW-NNN`** ID type in `docs/IDS.md`;
    IDEA-016 captured + the two design forks decided (internal-first; single skeptical pass — the
    mentor+persona panel is the upgrade if the single pass proves too shallow). Zero-dep held (`npm
    pack` ships **0** of these — BOSS-local + `docs/`, neither in the `files` allowlist). Gate +
    judgment suites unchanged (no hook moment, no predicate change).

## 0.39.0 — 2026-06-02

- **`capture` goes judge-backed — the third model-judgment moment, and it ships GRADED from day one.**
  capture (moment #3, PRINCIPLE #1's own) fired structurally on `≥3 devlog entries + no extraction
  record` — but a count can't tell a real extraction candidate from three entries of normal in-progress
  work. That's the exact crude-predicate problem drift (v0.31) and caution (v0.33) already solved with a
  bounded-read model judgment. v0.39 gives capture the same upgrade.
  - **The judgment (strictly more restraint — capture can now only fire LESS):** the gate still opens,
    but before voicing, the model silently reads the ~5 most recent devlog entries and fires ONLY if
    there's a real candidate — a pattern built **twice** (reusable practice → UP into `library/`), a
    fix/guard hand-applied in **several places** (hardening → DOWN into core), or a manual **ritual
    repeated** enough to deserve a skill/loop. If the recent work is one-off distinct features, deep
    focus on a single still-in-progress thing, or early throwaway spikes — nothing has generalized;
    **stay silent.** The silent class is trust-critical: nudging `/extract` with nothing to extract
    earns a NOT-YET every time and trains the founder to tune the conscience out — the premature
    ceremony PRINCIPLE #2 warns against. Same shape as drift/caution: no model call in the hook, no new
    state, no predicate change — a bounded-read voicing instruction the model executes in the live turn.
  - **Shipped:** upgraded `capture` voice frame in the hook lib; `capture` added to `JUDGE_MOMENTS` (so
    the conscience-frequency ledger logs it as a judge-moment) and to `MOMENT_SIGNALS` (voice-hash
    source of truth); **`capture.judgment.yml`** (7 labeled cases — 3 should-fire-extractable
    [practice-twice / guard-in-3-places / repeated-ritual], 3 should-not-fire-nothing-yet
    [one-off / single-in-progress / spikes], 1 ambiguous [written-twice-maybe]);
    **`fixtures-devlog-extract.js`** (extractability-focused devlog corpus, distinct from drift's
    risk-focused one); `replay.js` + `regrade.js` extended with a `capture` row (the MOMENTS registry
    proves it generalizes — third moment, same engine).
  - **Graded the free way (per v0.38):** all 7 cases run through isolated reasoning-required Opus 4.8
    sub-agents; **all 7 agree with the human labels.** `replay.js` reads **GRADED 7/7** for capture
    (24/24 across drift+caution+capture). Transcripts stamped `generated_via:
    in-session-subagent-reasoned` + `harness_note`; a real `npm run regrade capture` overwrites them.
  - Zero-dep held: `npm pack` ships **0** judgment/transcript/extract-fixture files; no `src/` ref.
    Gate suite **105/0/41** (the predicate is unchanged — `moment-capture.yml` still covers detection).
    The judgment channel now covers **3 of the conscience's moments**; the remaining structural moments
    (cost / failure-mode / cost-stale) are binary facts and correctly stay non-judge (a model judge
    there would be the v0.34 cost trap).

## 0.38.0 — 2026-06-02

- **The conscience's judgment is now MODEL-VERIFIED — `drift` + `caution` read `GRADED 17/17`, not
  `NEVER_GRADED`. The hole `regrade.js` was built to close (v0.35) is closed — without an API key.**
  Since v0.32 the judgment surface (`replay.js`) shipped a labeled set + voice-hash tripwire + coverage
  floors but printed `NEVER_GRADED` loudly: the model had never actually been tested against the labels,
  so every judge-moment was structurally-checked vibes. Closing it normally needs a paid out-of-band
  `regrade.js` run (Node `fetch` → Anthropic API). We closed it the free way: `regrade.js` runs two
  model calls per case *because it executes with no model present* — but a live session **is** Opus 4.8,
  the same model it would call. Each of the 17 cases (10 drift + 7 caution) was run through an **isolated
  sub-agent** seeing only the exact voice frame + bounded read the hook injects, and the decisions
  written as transcripts in `regrade.js`'s own format.
  - **Result: all 17 decisions agree with the human labels.** The frame and the labels are
    well-calibrated; the model nails the trust-critical silent class (the on-aim cases where firing
    would be the false positive that erodes the conscience) — e.g. it reads a missing canvas
    "Experiment this week" line as a *bookkeeping* gap, not a *validation* gap, when the devlog shows
    the experiment is already running.
  - **A real methodology finding, recorded honestly:** a first, terse "output only SILENT or the nudge"
    harness mislabelled **3 of 17** — one spurious fire (on-aim drift) and two spurious silences
    (textbook feature-piling / competitor-watching caution cases). Requiring the model to do the
    "silently read… then judge" reasoning the voice frame *explicitly demands* flipped all three to
    agree with the label. The lesson: the frame's reasoning instruction is load-bearing, and how you
    elicit a judgment changes it — exactly the kind of thing the recalibration discipline exists to catch.
  - **`regrade.js` made importable** — `main()` now runs only on direct invocation; `decisionPrompts`,
    `MOMENTS`, `loadCases` are exported (so the prompt assembly is reusable/testable and can't drift
    from the paid path). `--dry-run` still green; importing the module no longer spends.
  - **Honest provenance, not a masquerade:** every transcript carries `generated_via:
    in-session-subagent-reasoned` + a `harness_note` stating it was NOT the clean `fetch` harness and
    that `ANTHROPIC_API_KEY=… npm run regrade` overwrites it as the canonical instrument. The interim
    grading is real (same model, same frame, same isolation) without overclaiming the provenance.
  - Zero-dep line held: `npm pack` ships **0** judgment/transcript files; no `src/` reference. Gate
    suite **105/0/41**; judgment **GRADED 17/17** (was NEVER_GRADED 17). The loud "not yet
    model-verified" banner is gone.

## 0.37.0 — 2026-06-01

- **`/drift-deep` — the deep, whole-project drift audit. The biggest unused 4.8 lever, now built.**
  The hook `drift` moment (v0.31) is a cheap always-on tripwire: it reads ~5 recent entries and
  asks "you named a risk, you're piling work, nothing tests it — is the recent work on-aim?" This
  is the **deliberate, founder-invoked counterpart** that a bounded read can't do: *read EVERYTHING
  I've built and tell me, across the whole body of work, whether I'm validating my riskiest bet or
  building around it.* The 1M-context "am I fooling myself across everything" check — the original
  finding from the very first 4.8 pass.
  - **Why a skill, not a hook moment:** a whole-project read can't fire per-prompt — that's the
    expensive-AI-app trap the v0.34 cost discipline guards against. So the cheap moment stays the
    everyday tripwire; this is the audit you *invoke* when you want the truth, not a glance. The
    restraint (no loop, no nudge to "run your audit") is the design — making it a recurring
    obligation would be the premature ceremony BOSS avoids.
  - **Broader than the gate** in two ways: it runs even when a validation plan exists (did you
    *execute* the experiment, or write the plan-line and drift from running it?), and it reads the
    **actual `src/` code** (what you built is the truest record of what you bet on), not just the
    devlog tail.
  - **`/drift-deep` (L1-mvp skill)** — reads the canvas (bet + plan + cells) + ALL devlog + every
    FEAT spec + `src/` structurally + the ideas; judges each body of work against the bet ("does
    this *test* the risk or build *around* it?"); reaches a verdict (on-aim / drifting / mixed) with
    confidence + named gaps + the smallest re-aim; writes `docs/drift-audits/DRIFT-YYYY-MM-DD.md`.
    Cohort-aware (vibe-virtuoso served most — ships a lot, validates little; domain-expert gets the
    who-could-be-harmed humane lens on an un-validated risk). Routes back to `/canvas` / `/pretotype`.
  - **Integration:** the cheap `drift` hook moment now points at `/drift-deep` for the full audit
    (one terse clause — the cheap nudge stays cheap). Follows the `/extract` precedent — a deliberate
    skill judgment, tested in use, not by the hook-judgment-eval surface (noted in the skill).
  - L1-mvp now ships 14 skills. Gate + judgment suites 105/0/41 (the drift voice-hash shifted from
    the pointer — the tripwire working as designed; no transcripts, so no STALE). The 4.8 leverage
    arc's last deferred item, landed.

## 0.36.0 — 2026-06-01

- **`boss board` — a live read of what's in flight (IDEA-015, Phase 1).** Occasioned by Ajesh's
  "internal kanban / fire a html site / Obsidian / almost a Trello board" idea. Convened six advisors
  (venture, architect, humane, designer + vibe-virtuoso & indie-hacker persona reactions); the result
  was **unanimous and collapses to one fork: build the *view*, refuse the *app*.** A board BOSS
  *renders* from state it already holds externalizes the arc for a tired brain; a board BOSS *becomes*
  (log in, drag cards, keep in sync) is the photo-negative of BOSS and Canvas R&H #1 wearing a UI.
  **The founder never touches the board — they change the work and it re-renders.**
  - **`boss board` (new CLI subcommand, [src/board.js](../src/board.js))** — derives four columns
    (Captured → Taking shape → Building → Shipped) from files that already exist. **Frontmatter is
    truth — reads each IDEA-*/FEAT-* file's `status`, never `docs/ideas/INDEX.md`** (a hand-maintained
    table that drifts; a board that trusts a drifting source lies). Pure projection: no
    `.boss/board.json`, no second source of truth, nothing to sync — so concurrent / out-of-order /
    agent edits can't corrupt a render (the answer to Ajesh's "picks something out of order" worry is
    *statelessness*, not merge logic). A promoted idea is represented by its FEAT card (no
    double-count); blocked FEATs flag `· blocked`.
  - **Humane constraint honored (mentor-humane override):** the riskiest-assumption status sits
    *above* the columns — when there's capture but nothing pressure-tested, the evidence line says so
    plainly and points at `/canvas`. Empty columns are shown, not hidden (the empty cell is the
    diagnostic). Plain factual copy — no completion-celebration, no gamification, no notifications.
  - **Deterministic projection, no model in the loop** → it's a CLI verb, not a skill (spending model
    tokens on `readFile` + string-template would be the anti-pattern the v0.34 frequency-ledger work
    fought). Ships with the binary → available in every project automatically; **no manifest change**.
    Lands in IDEA-006's already-portable Layer 1 (zero host contract).
  - **Earned its keep on first run:** reading BOSS's own repo, it surfaced real INDEX-vs-files drift
    (IDEA-003 / IDEA-014 are `building` in their frontmatter while INDEX still said `exploring`) — the
    exact failure mode that justified reading frontmatter over the table.
  - **Deferred by design (the discipline BOSS preaches, applied to itself):** `--html` (read-only,
    generate-on-demand, same data model) is gated behind *earn it first* — if `boss board` gets run
    unprompted each session, build the render; if not, the gate saved the work. Obsidian is mostly
    documentation (`docs/` is already a vault), not a build. Both captured in IDEA-015 with the
    write-back caveats. End-to-end tested in `/tmp` (empty / captured-only caution banner / canvas →
    Taking shape / FEAT supersession / blocked / shipped / placeholder-canvas negative test).

## 0.35.0 — 2026-06-01

- **The recalibration engine — `regrade.js` built + run-ready, and model-recalibration named as a
  standing discipline (IDEA-014 Phase 1).** Occasioned by Ajesh's direction: adapting to new/
  different models should be a *standing capability*, not the ad-hoc reaction the v0.31–v0.34 arc
  was. Picked as the move that *helps BOSS keep improving easily* — because both judge-moments
  (drift, caution) were `NEVER_GRADED`: the labeled sets existed but the model had never been tested
  against them. Every future judge-moment would ship as vibes until that closed. `regrade.js` is the
  keystone that makes all future conscience work *measurable*.
  - **`regrade.js` (zero-dep, env-gated, out-of-band)** — the calibrator promoted from spec-stub to
    real harness. Per case: a **decision call** (give the live model the exact voice frame the hook
    injects + the bounded read the instruction names + a neutral founder turn → fire or stay
    silent?) + a **judge call** (grade the nudge against the case rubric → structured verdict),
    writing `transcripts/<moment>/<id>.json` stamped with the current voice-hash. Uses Node built-in
    `fetch` (no SDK). **`--dry-run`** verifies the whole pipeline (prompt assembly across all 17
    cases + the judge parser) with no API and no spend — verified green; the live `fetch` is the
    only unexercised line (a standard POST). `npm run regrade`; `BOSS_REGRADE_MODEL` to point at a
    different model.
  - **`moments.js`** — shared voice-hash source of truth so `replay.js` and `regrade.js` *cannot*
    disagree on the fingerprint (a mismatch would mark every transcript STALE forever). `replay.js`
    refactored onto it (same hashes; suites regression-clean).
  - **`docs/architecture/MODEL-RECALIBRATION.md`** — the standing checklist (IDEA-014's earned
    slice). Two triggers: a new same-vendor model (*leverage more* — re-grade, revisit each
    boundary for "can this move UP now?", read the frequency ledger, check context headroom) and a
    new host running a different model (*degrade gracefully* — judge-moments fall back to predicate-
    only). `regrade.js` is its engine; re-running it on a new model **is** recalibration. Named as a
    PRINCIPLE-#1 **UP** candidate (founders face the same model-migration problem — `/claude-api`
    already migrates their apps).
  - **Deferred, loudly:** the per-host model-capability profile + a `/recalibrate` skill — until a
    second model/host exists (a `/recalibrate` with nothing to recalibrate *to* is the premature
    ceremony v0.34 dodged). Token accounting stays host-contract territory (IDEA-006).
  - Gate + judgment suites 105/0/41; `npm pack` ships 0 tooling files. The judgment is now
    *run-ready* to become model-verified — one `ANTHROPIC_API_KEY=… npm run regrade` away (no key in
    the build env, so the live grade is the founder's to trigger).

## 0.34.0 — 2026-06-01

- **Conscience frequency ledger — BOSS eats its own `/ai-cost` dogfood, honestly. The last build
  of the 4.8 arc.** As judge-moments multiplied (v0.31 drift, v0.33 caution now do model judgment
  in the live turn), the conscience began costing real tokens per prompt — while BOSS preaches
  cost discipline and never measured its own. The first 4.8 pass flagged the trap: *BOSS becomes
  the expensive-AI app it warns against.* (IDEA-013.)
  - **The reframe is the decision (mentor-architect):** the build started as "conscience *cost*
    instrumentation" and was reframed to **frequency — facts, not estimates.** The hook never
    calls a model, so a char→token estimate would manufacture a billable-looking number while
    blind to its dominant term (the induced bounded reads judge-moments trigger in the main turn).
    That's *lying with numbers* — the exact cost-theater BOSS warns against; PRINCIPLE #2 vetoes
    it as premature ceremony. The *real* problem under the cost framing is **over-firing** — the
    actual way a conscience becomes costly/annoying, and a number you'd act on. So: measure
    frequency honestly; defer the token question to where honest token data lives (host-side,
    IDEA-006).
  - **`.boss/conscience-log.jsonl`** (gitignored) — the hook appends one line per fire:
    `{ts, moments[{moment,confidence}], judge(bool), injected_chars, cohort}`. Facts only — **no
    token/dollar estimate.** A **separate BOSS-meta ledger**, never the founder's
    `.boss/cost-log.jsonl` (BOSS's overhead ≠ the founder's app cost).
  - **First correctness-invisible fire-path side effect.** The hook goes from pure-emit to
    has-a-side-effect; `logActivity` runs only past the silent early-exit, append-only, single
    write, in its own swallowing try/catch. **Verified byte-identical** hook output with and
    without the ledger writable — delete it and the conscience behaves the same.
  - **`boss conscience activity`** (alias `cost`, which prints the honest frequency-not-tokens
    reframe) — fires, judge-moment share, median injected chars, per-moment counts, and the
    **over-fire smell** (clustering: a moment firing ≥4×/hour or ≥8×/24h — flagged because no
    per-prompt denominator exists without logging non-fires, which would break the instant
    property). Plus a one-line activity summary in `boss status --conscience`.
  - **Measure-only; self-throttle deferred indefinitely.** A throttle would gag the conscience
    exactly when a drifting founder generates more prompts and needs it most — **humane before
    viable**, and a one-way door (every "why didn't it speak?" becomes unfalsifiable). This ledger
    is the *evidence* that would earn that conversation, not a step toward it. Token/dollar
    estimation also deferred — host-contract territory (the only honest token count comes from the
    host, not the hook). `JUDGE_MOMENTS` set added to the hook lib. Gate + judgment suites
    regression-clean (105/0/41; drift + caution covered).

## 0.33.0 — 2026-06-01

- **`caution` goes judge-backed — depth vs. avoidance, and the first reuse of the v0.32 judgment
  machinery on an *existing* moment.** Moment #1 (the conscience's flagship "what does this
  prove?") fires when ≥3 captures exist with no filled riskiest assumption. But the predicate
  counts *total* captures — it can't tell **depth** (one idea getting sharper, converging toward a
  canvas) from **avoidance** (capturing-lots / validating-nothing). That ambiguity is `m1-snf-021`,
  which the gate runner has *skipped since v0.16* because no predicate can make the call. v0.33
  makes caution judge-backed and resolves it.
  - **Voice-frame upgrade** (`signalAsContext`, `caution` branch): the gate still opens, but the
    model now silently reads the active idea's capture log and judges before voicing — *one idea
    sharpening (narrowing the user, finding the real pain, wrestling the same question) = stay
    silent; idea-hopping / feature-piling / market-notes-without-a-bet = fire and name the specific
    pattern.* This is **strictly more restraint** — caution can now only fire *less*, never more.
  - **First reuse of the judgment surface (v0.32) on an existing moment** — proves the machinery
    isn't drift-specific. `replay.js` is now **multi-moment**: a `MOMENTS` registry (drift +
    caution) drives one shared engine (per-moment voice-hash tripwire + well-formedness + coverage
    + grading status). Adding a judgment moment = one registry row + a `<moment>.judgment.yml`.
  - **`caution.judgment.yml`** — 7 labeled cases: 3 should-fire-avoidance (idea-hopping,
    feature-piling, market-notes), 3 should-not-fire-depth (the m1-snf-021 case made concrete —
    narrowing, wrestling, converging), 1 ambiguous (depth-with-a-detour, `acceptable:
    [fires, silent]`). Content-rich capture-log fixtures (`fixtures-capturelog.js`) — the prose
    matters because the judgment is semantic.
  - **m1-snf-021 closed at the right layer:** the gate runner keeps skipping it (correctly — no
    predicate can make the call), now annotated "RESOLVED in v0.33; covered by the judgment
    surface," not "unimplemented." The case the gate *couldn't* test is exactly what the judgment
    channel was built for — the clearest proof v0.32 earned its keep.
  - Gate suite regression-clean **105/0/41**; both judgment moments well-formed + covered; caution
    voice-hash updated (tripwire reads the live frame). End-to-end tested via `boss new`: caution
    fires on scattered captures and ships the new depth-vs-avoidance instruction. The judgment
    remains **not yet model-verified** (replay prints NEVER_GRADED loudly) — first STALE builds
    `regrade.js`.

## 0.32.0 — 2026-06-01

- **Judgment-quality eval channel — closing the hole `drift-loop` (v0.31) opened.** drift was the
  first moment whose *detection is a model judgment*, not a predicate. The existing eval runner
  tests only the **gate** (does the hook fire on the right structural state); it stops at the
  door. Whether the model correctly calls drift-vs-on-aim *past* the open gate was unevaluated —
  a named crack in the "no moment ships without evals" floor, in exactly the spot 4.8 made
  load-bearing (`eval.md`: shipping detection logic with no way to know if it's right = "vibes-
  based AI in BOSS"). v0.32 builds the complement.
  - **The method (mentor-architect pass):** two surfaces, two cadences, on purpose. The gate-eval
    (`runner.js`, every commit, $0) stays. The **judgment surface** (`conscience-evals/judgment/`)
    is **golden transcripts gated by a voice-hash tripwire** — *not* pure LLM-as-judge (breaks the
    free/deterministic/CI property) and *not* pure golden transcripts (rot silently when the voice
    frame changes). Golden transcripts are the committed dataset; the tripwire makes their
    staleness *loud*; LLM-as-judge regenerates them out-of-band.
  - **`judgment/replay.js` — zero-dep, every commit.** (1) well-formedness — every case is a
    genuine open-gate state (filled risk, devlog ≥3 entries, no experiment line) with a coherent
    label; (2) **voice-hash tripwire** — fingerprints the exact `drift` instruction the model runs
    (`composeContext` for a drift signal); a transcript recorded against a different hash is
    `STALE` and replay says so loudly (golden transcripts that can't detect their own staleness
    are an eval that lies); (3) coverage floors (no silent caps; the on-aim/should-not-fire class
    is trust-critical and meant to *grow* toward ≥10); (4) grading status `GRADED/STALE/
    NEVER_GRADED/REGRESSION`. Exit 1 on malformed/coverage/regression; exit 0 + loud warnings on
    never-graded/stale. **All four states proven** (GRADED/STALE/REGRESSION/NEVER_GRADED tested).
  - **`judgment/drift.judgment.yml` — the labeled ground truth (Husain: build the set first).**
    10 cases: 4 should-fire-and-name-gap (incl. the sharpest — building the integration the risk
    explicitly *defers*), 5 should-not-fire-on-aim (the trust-critical class, incl. the hard
    "on-aim but informal — no experiment line, but the work IS the test" case), 1 ambiguous
    (`acceptable: [fires, silent]` so the grader doesn't punish a defensible call). Content-rich
    paired devlog fixtures (`fixtures-devlog.js`) — the *prose* matters because the judgment is
    semantic. `must_reference`/`must_not` rubric per case for the future LLM-judge.
  - **`judgment/regrade.js` — paid, out-of-band, DEFERRED by design.** The calibrator (decision
    call → judge call → write transcript stamped with the current voice-hash). Per the architect's
    staged cut: ship the labeled set + replay + tripwire first; build the API half *the week the
    first STALE tripwire fires*. Runnable spec-stub documents the full algorithm + env-checks. When
    built: zero-dep (Node `fetch`, no SDK), env-gated on `ANTHROPIC_API_KEY`, never on the commit
    path, never imported by `src/`, never in the `files` allowlist (lives under `docs/`).
  - **The zero-dep line, pinned:** the rule is *shipped surface (`src/`, `files`) stays
    dependency-free* — not "dev tooling can't call a model." Confirmed: `npm pack --dry-run` ships
    **0** judgment files; no `src/`/`bin/` reference to the eval dirs.
  - **Dogfooded in `eval.md`:** a model-judgment moment cannot ship its detection with only a
    gate-eval — the drift signal + exit predicates now require a judgment set + replay coverage for
    `drift` and every successor. Shared YAML parser extracted to `conscience-evals/lib/yaml-eval.js`
    (gate runner + replay use one copy; gate suite regression-clean at 105/0/41). New npm scripts:
    `eval:gate`, `eval:judgment`, `eval`.
  - **Honest scope:** v0.32 ships the labeled set + the staleness machinery + coverage discipline.
    The judgment is **not yet model-verified** — replay prints `NEVER_GRADED` loudly so a green run
    is never mistaken for a graded judgment. The first `STALE` is the trigger to build `regrade.js`.

## 0.31.0 — 2026-06-01

- **`drift-loop` — the closest loop to why BOSS exists, and the first moment that fronts a
  *model judgment* the predicate can't make.** PRINCIPLES.md opens with *"build faster without
  fooling themselves… continuously checking the work against real pain, real buyers."* For 30
  releases the conscience caught *structural* gaps (no canvas, no budget, no failure-states)
  but never the gap it names first: **you named the bet that could sink this, then spent your
  sessions building something else.** v0.31 closes it — occasioned by a "what does Opus 4.8
  change about BOSS" pass whose load-bearing finding was *the hook=detection / model=voice
  boundary has moved*: a stronger model can do the semantic judgment regex can't, so the
  conscience's first real "are you fooling yourself" check becomes buildable.
  - **`drift-loop` (L1-mvp, hook-runner)** — fires the new `drift` moment when (a) a canvas has
    a real **Riskiest assumption** (same predicate `canvas-loop` / `spec-loop` use) AND (b)
    `docs/devlog.md` has ≥3 dated entries (work accumulating, same threshold as
    `extraction-loop`) AND (c) no real **Experiment this week** validation plan exists yet.
    Sits in the gap *between* `caution` (no risk named) and the `done` graduation (risk has a
    plan). Confidence scales on devlog overshoot: 3 → low, 4–5 → medium, 6+ → high.
  - **The architecture, pinned (mentor-architect pass):** this is **not a new detector** — it's
    a *predicate-gated, bounded-read voicing instruction on the existing `UserPromptSubmit` →
    `additionalContext` channel*. The cheap Node predicate is the gate (and the cost control);
    the model does the stated-vs-actual comparison *in the live turn*, reading a **bounded** set
    (riskiest-assumption line + ~5 recent devlog entries + the open FEAT — never the whole
    project). No model call in the hook, **no new host primitive** (IDEA-006 contract untouched),
    **no new state**, no new predicate vocabulary. Same shape as `extraction-loop`/`/extract`,
    but **hook-fired not skill-invoked** — because a founder who has drifted from their own
    stated bet is exactly the founder who won't think to *ask* whether they've drifted.
  - **New `drift` voice frame** in `signalAsContext` (loop-runtime.js): instructs silent bounded
    read → judge → name the *specific* gap ("you said X is the bet; the last sessions built Y, Z;
    neither tests X") → point at `/canvas` or `/pretotype`. **Stay silent when on-aim** (silence
    is the correct output). Not a "you've been productive!" reward, not a generic "you should
    validate" line — the value is the specific comparison. Cohort-aware (returning-founder gets
    the harder conviction cut; first-product gets "test your riskiest bet" taught plainly;
    domain-expert gets the who-could-be-harmed lens on the named risk).
  - **Eval coverage from the start** — `moment-drift.yml` (14 cases: 4 should-fire incl. the
    placeholder-experiment edge + the drift/capture co-fire; 10 should-not incl. plan-recorded,
    under-threshold, unnamed-risk, dropped-idea, pre-MVP, and the documented `any_file_matches`
    masking limitation). Runner extended: `buildCanvasFile` now writes the experiment line.
    Suite **105/0/41** (up from 91). *No moment ships without evals* — held. End-to-end tested
    in `/tmp`: fires low→high as devlog grows, goes silent when the validation plan is recorded.
  - L1-mvp now ships 12 skills + **8 loops**. Honest scope note: hook evals test the *gate*;
    judgment-quality (does the model correctly call drift vs. on-aim) is the model's layer,
    tested the way `/extract`'s judgment is — not this runner.

## 0.30.0 — 2026-05-27

- **Closing the two remaining audit gaps — cost-log read cadence + failure-state stub
  loophole.** Same shape as v0.27: no new product axis; the discipline tightens around
  surface already shipped. The two gaps the audit named after v0.26 — *"the weekly review
  cadence is unenforced"* and *"failure-state handlers can be stubs forever"* — were real
  holes. v0.30 closes both.
  - **`/cost-review` skill (L1-mvp)** — reads `.boss/cost-log.jsonl`, aggregates by FEAT +
    user + cohort, compares against `docs/ai-cost-budget.md`, flags surprises (cost
    outliers > 10× median; user outliers; FEAT skew; quiet upward drift), writes
    `docs/cost-reviews/REVIEW-YYYY-MM-DD.md` with headline / numbers / variance / surprises /
    actions / next-review fields. Cohort-aware framing (indie-hacker gets %-of-revenue;
    returning-founder gets unit economics; domain-expert gets privacy-first confirmation
    before showing any review data). Surfaces mentor handoffs (architect for cost-shape;
    business for unit-economics) when overages exceed 10% of monthly cap.
  - **`cost-review-loop` (L1-mvp, hook-runner)** — **second time-of-work entry pattern**
    (after extraction-loop). Entry: `docs/ai-cost-budget.md` exists (the deontic moment —
    declaring the budget commits you to reading it). Exit: ≥1 file in `docs/cost-reviews/
    REVIEW-*.md` with a `^- \*\*Total spend:\*\*` line. The first review closes the loop;
    recurring re-opening waits on time-aware predicate vocabulary (same dependency as
    extraction-loop). New **`cost-stale` moment** added to `signalAsContext` voice frame.
  - **`/ai-failure-states` template — Eval-tested column added.** Each failure-state row
    (garbage / refusal / hallucination / timeout / cost-spike) now carries an **Eval-tested**
    field naming which eval case actually exercises the handler, OR marked **STUB** with an
    override required per IDEA-008. *Closes the stub-forever loophole at the declaration
    layer.* Voice note: stubs are still legitimate; *stubs without an override-with-re-open-
    condition* are not.
  - **`/evals` skill — failure-mode coverage requirement.** For AI-mediated FEATs, the eval
    set must include at least one `should-fail` case per declared failure state, categorized
    by `failure_mode` matching the canonical names (`garbage`/`refusal`/`hallucination`/
    `timeout`/`cost-spike`/`other`). *Closes the stub-forever loophole at the test layer.*
    The two layers (declaration + test) compose: handler stubs in code → declaration in
    docs → eval cases that exercise the declarations → real coverage.
- **Eval coverage from the start (v0.27 rule held).** `moment-cost-stale.yml` ships with 9
  cases: should-fire (no review; empty directory; stub file without canonical line); should-
  fire-multi (cost + cost-stale together when logger isn't wired but budget is); should-not-
  fire (full closure with review on record; pre-budget projects; LLM calls without budget
  declared — confirms entry is gated on budget doc, not LLM calls; Quickstart-shape projects).
  3 existing "full discipline declared" cases (m-cost-101, m-fm-101, m-cap-202) updated to
  also satisfy cost-review-loop's exit predicate, since they assert all-loops-closed.
- **Suite count: 91 passed / 0 failed / 41 skipped (133 loaded)** — up from 83/0/41. Every
  hook-emitted moment now has eval coverage. The "no moment ships without evals" discipline
  is the new floor.
- **What v0.30 does NOT do:** auto-enforce the failure-mode eval coverage (the `/evals`
  skill names the requirement; nothing fails the build if the eval set lacks coverage; that
  would be a v0.31+ tightening if founders ship handlers-without-evals systematically);
  recurring cost-review-loop (needs time-aware predicate vocabulary); pull `.boss/cost-
  log.jsonl` into the skill review output automatically (the parsing logic lives in the
  skill's instructions; Claude does the reading per-call to keep zero-dep CLI).
- **The audit is closed.** The three load-bearing gaps from the post-v0.26 audit (eval
  coverage, /welcome onboarding, moment #3 capture) shipped in v0.27 / v0.28 / v0.29; the
  two discipline-hole gaps in already-shipped surface (cost-review cadence, failure-state
  stub loophole) shipped in v0.30. The right-to-defer items (brownfield, /consult, AI-first
  archetype template, IDEA-003 finish, etc.) remain on the v0.31+ backlog. Audit-driven
  hardening complete; the next move is feature work.

## 0.29.0 — 2026-05-27

- **Moment #3 lands — PRINCIPLE #1's own discipline, encoded (finally).** For 28 releases the
  conscience surfaced 6 moments (caution / done / restraint / coherence / cost / failure-mode)
  but never one for PRINCIPLE #1 itself — the *pause to extract patterns UP or DOWN* rule that
  defines what BOSS is. *"Capture"* was deferred 5 consecutive releases as "needs LLM-as-judge
  or heuristic design." v0.29 ships the heuristic-plus-judgment version: a hook-runner loop
  on a simple devlog heuristic + a skill that does the real judging.
  - **`extraction-loop` (L1-mvp, hook-runner)** — entry: `docs/devlog.md` has ≥3 dated
    entries (regex `^## \d{4}-\d{2}-\d{2}`); exit: ≥1 `docs/extractions/EXTR-*.md` file has
    a `- **Route:**` line. **First hook-runner loop whose entry is *time-of-work* (devlog
    count) rather than *file-state predicate*.** Sets the precedent for future judgment-
    required moments that can't be detected by file regex alone. Threshold of 3 mirrors
    PRINCIPLE #1's *"the third time the same work repeats"* signal.
  - **`/extract` skill (L1-mvp)** — the LLM-as-judge counterpart. Reads recent commits, the
    last 3-5 devlog entries, the current FEAT, `library/`, and `src/`. Identifies 1-3
    candidate patterns by three signals (Signal A: same work repeated; Signal B: named-and-
    stable shape; Signal C: load-bearing decision). Routes each candidate **UP** (into BOSS's
    `library/<cat>/` via `boss learn`) or **DOWN** (into the app's `src/` as a named refactor
    target) or honest **NOT-YET** (the third legitimate answer; recording the *not yet* IS
    the discipline). Writes `docs/extractions/EXTR-NNN-<slug>.md` with full routing record +
    "what didn't make the cut" section. Cohort-aware (returning-founder gets the seasoned
    `"what did you do twice?"` prompt; first-product gets gentler framing; domain-expert
    leans NOT-YET-with-caveats for regulated logic).
  - **New `capture` moment in the conscience** — added to `signalAsContext` in
    `lib/loop-runtime.js`. Voice frame names the inflection in plain language; explicitly
    rejects *"you've been productive!"* reward framing (PRINCIPLE #1 is the discipline, not
    the dopamine). Cohort decides the specific framing.
  - **`EXTR-NNN` ID type added** — `docs/IDS.md` template updates to name it under MVP-mode
    unlocks alongside `FEAT-NNN` / `FIX-NNN` / `BUG-NNN`.
  - **L1-mvp manifest** — now ships 11 skills + 6 loops. `claude-append.md` names `/extract`
    and `extraction-loop` alongside the others; calls out the *"two destinations, not one"*
    framing per PRINCIPLE #1.
- **Eval coverage from the start (closes the v0.27 hole going forward).** `moment-capture.yml`
  ships with 11 cases: should-fire (3, 5 entries; empty extractions/ dir doesn't close); should-
  not-fire (≤2 entries; closed by UP route; closed by NOT-YET route; empty project; empty
  devlog file); Quickstart-shape sanity (no devlog → no fire); multi-loop isolation (all four
  AI-first/extraction loops closed independently). The discipline applied: **no moment ships
  without its evals.**
- **Runner upgrades** — new fixtures: `devlog_3_entries`, `devlog_2_entries`, `devlog_5_entries`,
  `extraction_record_up`, `extraction_record_not_yet`. Loads `moment-capture.yml` in main().
  **Suite count: 83 passed / 0 failed / 41 skipped (124 loaded)** — up from 73/0/41.
- **What v0.29 does NOT do:** auto-recurring extraction-loop (closes after one extraction;
  re-opening requires founder action or future predicate vocabulary with time-aware checks
  like *"N devlog entries since last extraction"*); execute the actual extraction (the skill
  proposes UP/DOWN routes; `boss learn` handles UP execution; refactors are the founder's
  call); LLM-call-out detector (some "is this reusable?" judgments would benefit from an
  external model call, but Claude-running-the-skill IS the LLM-as-judge — keeping it in-
  context is simpler and cheaper).
- **The architectural precedent.** extraction-loop is the **first time-of-work entry**
  pattern. Future loops that need heuristics like "X has accumulated since Y" can reuse this
  shape (count files of one type; gate by absence of files of another type). Documented in
  the loop spec for future authors. Tightens the v0.18 runtime's vocabulary without changing
  the runner.

## 0.28.0 — 2026-05-27

- **`/welcome` — the gentle first-run orientation (closes the v0.19 cohort gap).** The v0.19
  personas pass surfaced that `first-product`, `vibe-coder-newbie`, and `non-tech-founder`
  cohorts bounce off BOSS because the first thing they see is *"drop your PRD."* Power-user
  framing, beginner cohort. v0.28 adds the gentler door: a Quickstart skill that orients in
  ~1 minute, defines terms inline, names the conscience as a *nudge never a block*, surfaces
  override + pause as discoverable affordances, and routes to `/boss` or `/triage` based on
  what the founder is ready for.
- **Cohort-aware depth** — the skill branches on `.boss/config.json` cohort:
  - `first-product` / `vibe-coder-newbie` / `non-tech-founder` / null → **full tour**: what
    BOSS is, what's in the folder, what to do next, how the conscience works, how modes level
    up, where to find help. Each section 2-3 sentences; terms defined inline; plain language.
  - `eng-builder` / `vibe-virtuoso` / `indie-hacker` / `returning-founder` → **30-second
    version**: one paragraph, pointer at `/boss`. *"You probably don't need the tour."* Then
    stops; doesn't elaborate.
  - `domain-expert` → **middle path**: full tour with high-stakes framing inline (privacy-
    first defaults, human-in-the-loop on hallucination, conscience errs toward speaking).
- **Discoverability fix for IDEA-011** — the skill explicitly surfaces `boss conscience pause`
  + the override grammar (*"deviation conscious, recorded, never blocked, never forgotten"*).
  Previously these were documented in CHANGELOG / docs/ideas; now they're surfaced in the
  cohort's first 5 minutes with BOSS. Partial close on IDEA-011 Phase 2's override-
  discoverability sub-gap.
- **Cohort question moved upstream** — `/welcome` asks the cohort question first (when unset),
  before any orientation; `/boss` step 6 stays as the backup path for founders who go
  directly to `/boss`. The cohort persists in `.boss/config.json` for the conscience hook.
- **`boss new` output updated** — the post-scaffold "Next:" block now names BOTH paths:
  `/welcome` for the first-time door, `/boss <idea|PRD>` for the power-user door. Same
  language as CLAUDE.md (template) top.
- **L0-quickstart manifest** — adds `welcome` to the skills list (now 6 skills). No new
  agents, no new loops, no new hooks. Quickstart still ships a tiny agentic footprint.
- **L0 CLAUDE.md (template)** — adds a top-line nudge: *"First time? Run `/welcome` — gentle
  orientation, takes a minute, defines terms inline. Already familiar with BOSS? Skip to
  `/boss <your idea or PRD path>` to spin up."* The first thing a fresh founder reads.
- **End-to-end tested in /tmp** — `boss new welcome-test` → 6 skills land including welcome;
  CLAUDE.md surfaces /welcome at top; 73/73 conscience evals still pass.
- **What v0.28 does NOT do:** auto-trigger `/welcome` on first Claude prompt (the CLAUDE.md
  surfacing is enough; auto-trigger via hook would conflict with cohort `eng-builder` /
  `returning-founder` who explicitly *don't* want it); ship an end-user onboarding flow (that
  was named in IDEA-012 as a separate v0.27+ candidate; this skill is founder-onboarding,
  not end-user-onboarding); add a `/welcome` for V1 / Scale modes (the lift is once, not per-
  mode — re-running in MVP+ is supported but the orientation doesn't change much).

## 0.27.0 — 2026-05-24

- **Conscience evals — closing the discipline-on-the-discipline-tool hole.** Four moments
  (restraint / coherence / cost / failure-mode) had shipped without eval coverage; the brake
  the discipline named (*"43/43 pass"*) was eroding silently. v0.27 closes the three
  hook-emitted ones; restraint is skill-side and stays out of the hook eval suite by design.
  - **`moment-cost.yml`** — 12 cases covering: Anthropic / OpenAI / Vercel AI SDK
    (generateText, streamText) entry detection; partial closure (budget doc alone, logger ref
    alone); full closure; multi-moment co-firing with failure-mode at the first-LLM-call
    inflection; should-not-fire on no-LLM and empty projects.
  - **`moment-failure-mode.yml`** — 8 cases isolating the failure-mode signal (close the cost
    loop to single out failure-mode); covers partial closure (doc alone, handlers alone),
    full closure, and the no-entry case.
  - **`moment-coherence.yml`** — 10 cases covering: className= / styled-components / inline
    style={} entry detection; confidence scaling (3 declarations = low; 12+ = high); partial
    closure (tokens doc alone, refs alone); full closure; under-threshold (2 declarations)
    and no-UI cases.
  - **Runner upgrades:**
    - Loads both L0-quickstart AND L1-mvp loops (L1 loops live in `stages/L1-mvp/template/
      docs/loops/`; previous runner only loaded L0, which is why three moments could ship
      without coverage).
    - **`src_files` / `docs_files` / `other_files` in `project_state`** — materializes
      arbitrary file paths via the new `FIXTURES` registry (`runner.js`). The minimal YAML
      parser doesn't support multi-line scalars, so file content lives in the runner as
      named fixtures: `anthropic_call`, `openai_call`, `vercel_ai_call`, `vercel_ai_stream`,
      `cost_budget_doc`, `cost_logger_ref`, `failure_states_doc`, `failure_handlers_ref`,
      `style_decls_low/high/two`, `style_styled_components`, `style_inline_objects`,
      `design_tokens_doc`, `token_refs`, `no_llm_code`, `empty`.
    - **Multi-moment assertions** — `expected_detection.moments: [cost, failure-mode]`
      asserts set inclusion across the actual signals list (not just the first signal).
      Useful for cases where multiple loops fire simultaneously by design.
    - **Single-moment fallback** — when `expected_detection.moment` is specified, the
      assertion also checks the moments list (not just the first signal), since signal
      ordering is filesystem-dependent.
  - **README updated** — current-cut section names all five tested moments; documents the
    multi-moment format and the FIXTURES registry pattern.
- **Suite count: 73 passed / 0 failed / 41 skipped (114 loaded)** — up from 43/43. The 41
  skipped are unchanged: 20 moment-2 cases that live in `/canvas` skill prompt (no hook
  detector), 6 signal-text evals (separate runner), 15 cases gated on suppress_if / devlog
  awareness / session-state tracking that aren't yet implemented.
- **What v0.27 does NOT do:** sharpen the first-cut wording in any YAML (Ajesh's sharpening
  pass remains pending — flagged in each file's frontmatter); ship a skill-eval runner for
  `spec-loop` / `pretotype-loop` (those are skill-side; need a different runner pattern);
  add a sixth moment for "capture" (PRINCIPLE #1 — gap #1 still on the table; needs an
  LLM-as-judge or heuristic detector design).
- **Why this isn't a feature release:** no skills, agents, loops, or hooks shipped. The
  discipline tightened around what's already shipped. Same shape as v0.24 (positioning
  pass): not the most exciting release, plausibly the highest-leverage one this stretch.

## 0.26.0 — 2026-05-24

- **AI-first product template — BOSS's home turf, made first-class.** The v0.24 positioning
  named BOSS as *"the thinking layer for AI-native founders."* v0.26 ships the concrete
  artifact that earns the name: a conductor skill that walks the founder through the AI-first
  discipline **from day one**, plus the missing piece (failure-states design) that completes
  the spine. Cursor + a folder is "AI-native." BOSS + `/ai-first-init` is *"AI-first with
  discipline from day one."*
  - **`/ai-first-init` skill (L1-mvp)** — the **conductor**. Walks the founder through five
    steps: (1) declare what's AI-mediated → `docs/ai-first.md`; (2) seed structured outputs
    (Liu) → `docs/schemas/`; (3) seed eval set early (Husain) → `/evals --new`; (4) declare
    cost budget upfront → `/ai-cost`; (5) design failure states → `/ai-failure-states`. The
    "from day one" framing: declare the discipline *before* the first AI-mediated FEAT ships,
    not after the first bill / hallucination / refusal.
  - **`/ai-failure-states` skill (L1-mvp)** — the **missing piece**. Walks the founder through
    five guaranteed failure modes (garbage / refusal / hallucination / timeout / cost-spike),
    each with a project-specific declared response + stub fallback handler in code (so the
    discipline is wired before the founder forgets). Writes `docs/ai-failure-states.md`.
    Cohort-aware: `first-product` gets named patterns; `eng-builder` gets the unhandled-path
    angle; **`domain-expert` defaults to human-in-the-loop on hallucination** (no retry-loop
    on medical/legal/financial output).
  - **`ai-failure-state-loop` (L1-mvp, hook-runner)** — entry: ≥1 LLM SDK call site
    (parity with `cost-budget-loop` — the two failure modes always coexist at the
    AI-mediated boundary). Exit: `docs/ai-failure-states.md` exists AND code references at
    least one fallback handler (`handleGarbageResponse` / `handleRefusal` /
    `handleHallucination` / `handleTimeout` / `handleCostSpike` or snake_case Python
    equivalents). New `failure-mode` moment added to `signalAsContext` voice frame.
  - **`/spec` upgrade** — for AI-mediated FEATs, the spec template now includes a **Failure
    states** section alongside the existing evals + validated-learning fields. Names which
    of the five failure states the FEAT must handle + which fallback handler it routes to.
    Acceptance criteria are asked to reference at least one failure-state path.
  - **`/boss` AI-native nudge (L0-quickstart)** — when the founder names the model as
    load-bearing during spin-up (the product doesn't work without it), `/boss` names it
    explicitly back and recommends *"after `boss unlock mvp`, run `/ai-first-init`."* The
    recommendation is the artifact; `/boss` never runs it for the founder.
- **`docs/ai-first.md` as the declaration contract.** Future FEATs read this doc; future
  `/spec` runs reference its cross-reference fields. If the doc says "deterministic" for a
  feature and a PR puts an LLM call in there, that's a real change worth a re-spec —
  promotes design-by-archeology into design-by-declaration.
- **L1-mvp manifest now ships 10 skills + 5 loops + 4 agents.** `claude-append.md` names
  `/ai-first-init`, `/ai-failure-states`, and `ai-failure-state-loop` alongside the others.
- **The lineage cited.** Husain (failure-mode categorization extended from evals → UX), Liu
  (structured outputs as the contract that makes failure-detection mechanical), Karpathy
  (the failure surface IS the design surface — designing the happy path is the easy 20%),
  Mollick (cost-as-design-input continuing from v0.25). No new mentors added; the discipline
  is the existing roster applied to the AI-mediated boundary.
- **Conscience regression-clean.** The new loop lives in L1-mvp; the eval runner only loads
  L0-quickstart loops; no eval fixtures fire `failure-mode`. End-to-end tested in `/tmp`:
  fresh project → `boss unlock mvp` → drop LLM SDK call in `src/` → hook fires BOTH `cost`
  AND `failure-mode` simultaneously (the two loops share entry but track different exits).

## 0.25.0 — 2026-05-24

- **AI cost discipline — the universal-cohort feature lands.** Per IDEA-012's persona overlay,
  AI cost was the only candidate every cohort cared about. Now it's first-class in MVP mode:
  the founder gets nudged to declare the bill at the first LLM SDK call, not after the first
  surprise invoice.
  - **`/ai-cost` skill (L1-mvp)** — walks the founder through declaring `docs/ai-cost-budget.md`
    (per-user/day + monthly cap + model rationale + review cadence + breach grammar), suggests
    a ~30-line cost-logger wrapper (TypeScript + Python examples) writing to
    `.boss/cost-log.jsonl`, and surfaces mentor handoffs (`mentor-architect` for cost-shape →
    architecture; `mentor-business` for cost-per-user → pricing). **Cohort-aware defaults:**
    `first-product` $5/user/day strict; `vibe-virtuoso` inspect-only; `eng-builder` BYO;
    `indie-hacker` cost-as-%-of-revenue framing; `domain-expert` $20/user/day + **privacy-
    first logging (no PII, no prompt body)** + regulatory caveats; etc. The founder edits to
    fit the bet; the cohort sets the starting frame.
  - **`cost-budget-loop` (L1-mvp, hook-runner)** — entry: `src/**` contains ≥1 LLM SDK call
    site (regex covers `anthropic` / `@anthropic-ai/sdk` / `openai` / `OpenAI(` / `Anthropic(` /
    `messages.create` / `chat.completions.create` / Vercel AI SDK `generateText` /
    `streamText`); exit: `docs/ai-cost-budget.md` exists AND code references the logger
    wrapper (≥1 occurrence). Threshold of 1 (not 3 like design-tokens-loop) because cost
    discipline is **deontic at the first call** — there's no "exploratory" version of token
    spend. The first call hits a real billing meter.
  - **New `cost` moment in the conscience** — added to `signalAsContext` in
    `lib/loop-runtime.js`. Voice frame: name the bill exists in one line (cohort decides the
    framing — first-product wants a number, vibe-virtuoso wants the inspect affordance,
    domain-expert wants the privacy posture), point at `/ai-cost`, hand the decision back.
    Never blocks. Override via devlog per IDEA-008.
  - **`.gitignore`** updated to exclude `.boss/cost-log.jsonl` (local ledger; ship to a real
    datastore when you have real users — the skill's review-cadence step says so).
  - **L1-mvp manifest** now ships 8 skills + 4 loops + same 4 agents. `claude-append.md`
    names the new skill and loop alongside the others.
- **Pairs (not auto-invoked) with two existing mentors.** The handoff lines in `/ai-cost`:
  *"`mentor-architect`, the cost shape says X — what architecture decisions does that imply?"*
  and *"`mentor-business`, our cost-per-active-user is X; what should the pricing carry?"*
  Cost discipline is the load-bearing connector between architecture (caching, batching,
  cheaper-fallback) and business (unit economics, willingness-to-pay).
- **The discipline reads as Husain-applied-to-spend.** *"Almost all AI cost problems are
  visible in the ledger, and almost no one keeps one."* Liu cited for structured-outputs-as-
  cost-lever; Mollick for cost-as-design-input. No new mentor or practitioner added — just the
  application of existing discipline to a different artifact.
- **What v0.25 does NOT do:** auto-instrument the user's code (judgment call: the founder
  knows their call sites better; the skill *suggests* the wrapper, doesn't write it). Auto-
  detect non-mainstream SDKs (LangChain wrappers, Replicate, Cohere, Bedrock). Ship a budget-
  enforcement layer (this is a *nudge*, never a gate — IDEA-011 discipline applies).
- **Conscience regression-clean.** Existing 43/43 conscience evals still pass — the new loop
  lives in L1-mvp, the eval runner only loads L0-quickstart loops, so the new moment has no
  way to fire against the existing eval fixtures. End-to-end tested in `/tmp`.

## 0.24.0 — 2026-05-23

- **Positioning pass — first non-feature release in BOSS's history.** The deliverable is *the
  thinking* (positioning + README edit), not code. Per IDEA-012's revised roadmap, v0.24 was
  explicitly the positioning pass, not a feature release. The Dunford exercise was first
  recommended in the v0.15 advisory pass and deferred through 8 capability releases; finally
  executed.
- **Output:** [`docs/dossier/positioning-pass-001.md`](docs/dossier/positioning-pass-001.md) —
  full Dunford exercise: target cohort (the founder using Cursor/Claude Code 3+ months with
  2+ unfinished projects), 8 competitive alternatives, 8 unique attributes that survive
  scrutiny, attributes mapped to value, 7 market-frame options, **8 candidate killer one-
  sentences stranger-tested**, 8 cohort-tailored variants per persona, the trend layer
  (*AI raised the speed limit; almost nothing raised the discipline limit*), 6 decisions to
  act on, downstream consequences.
- **Decisions on the record:**
  - **Lead sentence (elevator):** *"BOSS is the just-in-time conscience for AI-native
    founders. Pause it any time."* (13 words; killer for verbal intros.)
  - **README opening sentence:** *"For founders building with AI — the thinking layer that
    nudges when you're drifting and pauses on command. No growth-hacking pressure. Override-
    friendly."* (22 words; killer for the README + landing-page hero.)
  - **Category frame:** *"the thinking layer for AI-native founders"* — drops "incubator" as
    the primary descriptor because it reads YC-shaped to strangers. "Incubator" stays valid
    as a secondary descriptor.
  - **Cohort-tailored variants:** 8 versions (one per persona archetype). Pattern: cohort-
    naming first phrase + feature-that-lands-hardest second.
  - **What BOSS doesn't compete on, named explicitly:** code generation (Lovable / v0 / Bolt).
    BOSS is *complementary* to those — a founder could use Lovable to scaffold the app + BOSS
    to scaffold the thinking about it.
- **README updated** — the TL;DR replaced with the v0.24 positioning. Old: *"a just-in-time
  incubator for AI-native projects."* New: the candidate #8 framing above.
- **What this positioning is NOT** (recorded in the dossier):
  - Not validated (synthetic-tested only until real founder reads + articulates back)
  - Not permanent (evolves with the product)
  - Not the only frame BOSS could use (picked AI-native-founder audience; the anti-VC
    indie-hacker frame is a legitimate secondary positioning that could split into its own
    surface later)
- **Discipline applied to BOSS itself:** the Dunford exercise was on the record since v0.15.
  Eight releases of capability shipped before it landed. The positioning pass finally
  shipping is the discipline-on-the-discipline-tool move applied again — *not the most
  exciting release; probably the highest-leverage one in months*.

## 0.23.0 — 2026-05-23

- **Conscience pause primitive — the discipline-on-the-discipline-tool move (IDEA-011
  Phase 1).** Single-purpose release. Closes the canvas R&H #1 gap operationally: the founder
  can now silence the conscience for a bounded session without having to edit settings.json
  or rip out hooks. The four other items originally queued for v0.23 (Scale mode authoring,
  moment #3 detector, PostToolUse hook plumbing, IDEA-010 Phase 4 `/design-prompt`) are
  deferred to v0.24+ — see RESUME's restructured roadmap. **Discipline applied to BOSS
  itself: ship only the one most-load-bearing thing in a release that *could* have been
  bigger.**
  - **`boss conscience pause [--for 8h | --until-resume] [--reason "..."]`** — records a
    pause in `.boss/config.json`'s `conscience` block: `{ mode, since, expires, reason }`.
    Default duration: 8h (a build session). `--until-resume` for indefinite pauses.
  - **`boss conscience resume`** — explicit un-pause. Also happens automatically when the
    recorded expiry passes (the hook auto-clears the state).
  - **Hook reads pause state FIRST.** When `mode: paused` and `expires > now` → exit silent.
    When `mode: paused` and `expires <= now` → call `clearPauseState` and continue normally.
    The auto-resume IS the kindness; no special "your pause expired" signal (would be
    performative noise; IDEA-011 explicitly chose silent auto-resume).
  - **`boss status --conscience` surfaces pause state prominently** — at the TOP of the
    output, marked with `⏸ PAUSED`, showing since/expires/reason. When expired but not yet
    auto-cleared, shows `⏸ PAUSED (EXPIRED — will auto-resume on next prompt)`.
  - **Help text updated** to include the new commands.
  - **`readPauseState` + `clearPauseState`** added to `lib/loop-runtime.js` (template) —
    the canonical version. BOSS's CLI imports from there so there's one source of truth.
- **The architectural principle the pause demonstrates** (worth naming): **fractal-consistent
  override discipline.** The same IDEA-008 grammar applied at two scales — per-loop overrides
  in devlog (micro), and whole-conscience pause in config (macro). Same shape: deviation
  conscious, recorded, never blocked, never forgotten (auto-resume is the kindness). Same
  recipe, different scope. *Not novel as a pattern* (Focus modes are OS-level table stakes);
  *worth claiming if anything* as the fractal-consistent application — Phase 3 externalization
  may turn this into a publishable practice if BOSS gets used on > 1 project.
- **End-to-end tested in /tmp — 5 flows verified:**
  1. Baseline drifted state → hook fires (`caution low`)
  2. `boss conscience pause --for 8h --reason ...` → state recorded
  3. Hook fires after pause → silent ✓
  4. `boss status --conscience` → shows ⏸ PAUSED prominently with since/expires/reason
  5. `boss conscience resume` → hook fires again next prompt ✓
  Plus expired-auto-clear: hook reads expired pause → clears it → emits signal normally next
  prompt; config returns to `{ mode: 'active' }`.
- **43/43 evals regression-clean.**
- **Why a release for one feature?** Because it's the right discipline applied to BOSS itself.
  The other four queued v0.23 items are real and queued for v0.24+. The pause primitive's
  ratio of "leverage : code-size" is the highest of anything left in the roadmap (~50 lines
  of code + tests; closes the canvas R&H #1 gap directly). MVP discipline: minimum experiment
  that produces validated learning. Validated learning here: *did the pause primitive
  actually make BOSS feel nimble?* Founder using BOSS to do an all-night build will tell us.

## 0.22.0 — 2026-05-23

- **V1 mode authored — `boss unlock v1` works for real.** The third major mode arrives. Same
  playbook as MVP authoring (v0.14.0): manifest + template + claude-append + agents + skills +
  loops. V1 is the *real shippable release* mode — design layer turns on, the second-tier
  mentors arrive, data shape becomes a first-class decision, and a cross-FEAT sequencing
  surface appears.
  - **3 new builder agents:**
    - `ui-designer` — token + visual authority. Reads `DESIGN_TOKENS.md` as truth; refuses raw
      hex; three-layer architecture enforced (primitives → semantic → component). Cites Brad
      Frost (Atomic Design), Nathan Curtis (layer-cake), Jina Anne (W3C DTCG), Diana Mounter
      (Primer), Aarron Walter (emotional design). Holds the WCAG AA floor.
    - `ux-designer` — flow + state + interaction authority. **5-state requirement** non-
      optional (default / hover / active / disabled / empty + loading + error). Nielsen 10
      heuristics; Krug clarity; Norman affordances; Luke Wroblewski forms; Christopher
      Noessel for agentive patterns; Erika Hall for just-enough-research.
    - `db-architect` — schema + data-shape authority. Schema before code, even solo. Cites
      Codd, Date, Stonebraker, Kleppmann + AI-native data voices (Liu structured outputs,
      Husain data quality, Huyen production). Flags AI-data failure modes (unstructured-LLM-
      output in control flow; hallucinated-data pollution; eval-data-isn't-user-data).
  - **4 template mentor copies** (promoted from BOSS-local v0.15.0 to scaffolded-project
    templates — `{{PROJECT_NAME}}` / `{{MODE}}` placeholders): `mentor-business`,
    `mentor-fundraising`, `mentor-pitch`, `mentor-talent`. Same source practitioners as the
    BOSS-local versions; phrased to coach the founder of a generic scaffolded project. All
    advisory; never binding legal/financial/medical. Default position for mentor-fundraising
    + mentor-talent: *don't raise / don't hire yet, possibly never*.
  - **3 new skills:**
    - `/board` — cross-FEAT sequencing surface. Live read computed from FEAT frontmatter +
      smoke/evals state + override entries. Flags: `--next`, `--blocked`, `--by-cohort`,
      `--deferred`, `--evals`. Owned by `program-manager`.
    - `/design-review` — before-code design review. Runs `ui-designer` (token + visual) + 
      `ux-designer` (flows + 5 states) sequentially against the proposed UI. Reads tokens
      file, style guide, canvas Promises cell. Outputs concrete diffs. Cohort-aware delivery.
    - `/ux-check` — after-code UX review. Walks the *shipped* experience (not the spec),
      checks states are real, runs accessibility heuristics, applies AI-specific UX where
      relevant. Pairs with `/design-review`.
  - **1 new loop:** `design-drift-loop` (V1-stage, runner_type: hook). The V1-stage counterpart
    to MVP's `design-tokens-loop` — gates *whether tokens are still authoritative*, not just
    *whether they exist*. **Subtle pattern worth naming:** this loop's exit predicate is the
    *bad signal* (≥1 raw hex code in code, excluding the tokens file) — the loop is
    "drift-emitting" when the bad signal is present. The IDEA-008 primitive supports this
    without modification. Emits the `coherence` moment (introduced v0.21).
  - **L2-v1 manifest** declares 7 agents + 3 skills + 1 loop; `boss sync` carries them via the
    managed-file kinds (agent, skill, loop). `.boss` stamp tracks them. claude-append.md
    reads as a clean V1-working-rules catalog.
- **End-to-end tested in /tmp:** `boss new` → `boss unlock mvp` → `boss unlock v1` lands all
  three modes' files cleanly. Final stamp: 14 agents + 15 skills + 6 loops + 1 hook + 3
  installed layers. `boss status --conscience` shows all 6 loops in correct states on a fresh
  project. 43/43 evals still pass (regression-clean).
- **Deferred to v0.23:** moment #3 (capture — reusable value at breakpoint, needs LLM-as-judge
  or heuristic detector — not predicate-based); PostToolUse hook for hardcoded-style detection
  (new hook-type plumbing — its own concern); Scale mode authoring (mentor-humane template
  promotion, PM org, code-health, product council); `/design-prompt` skill or fold into
  `/design-review`.

## 0.21.0 — 2026-05-23

- **MVP discipline upgrades + IDEA-010 Phase 2 (design-tokens-loop) — all in one release.**
  Three new skills, three new loops, one upgraded skill, moment #4 (restraint) lands skill-side.
  Moment #3 (capture — reusable value at breakpoint) deferred to v0.22 — it needs a different
  detector design (predicate evaluation doesn't fit "noticing this artifact is more general
  than its loop").
  - **`/spec` upgraded** (the smallest cut, highest leverage per the v1 playbook):
    - Adds **validated-learning field** (Ries, *The Lean Startup*): "If this FEAT works
      perfectly, what do we learn?" If the answer is "users like it" or "the feature works,"
      don't build it. The MVP is the minimum experiment that produces validated learning, not
      the minimum product to polish.
    - Adds **evals field** (Husain): when a FEAT puts an LLM in control flow, the eval set
      lives at `docs/evals/FEAT-NNN.yml`. Schema'd output (Liu) strongly recommended.
    - **Moment #4 restraint check** (IDEA-008's collapsed-moments architecture): `/spec`
      reads canvas-loop state before creating a FEAT spec; if canvas-loop isn't closed for
      the active idea, the skill surfaces a Fitzpatrick-plain restraint nudge (cohort-aware
      via v0.20's framing). Override grammar lives in devlog. Never blocks; always records.
  - **`/evals` skill (new)** — Husain discipline as a first-class MVP skill paired with
    `/smoke`. Smoke answers "is it alive"; evals answers "is it correct." Eval set first
    (20 cases beats 0). Failure modes categorized by mode (Husain: failure modes are more
    valuable than success modes). Structured outputs recommended (Liu: Pydantic-first).
    Cites Husain + Liu + LLM-as-judge caveats.
  - **`/pretotype` skill (new)** — Savoia's discipline as a first-class MVP skill. The
    demand-test between `/canvas` and `/spec` — "make sure you're building the right It
    before building It right." Six patterns named (fake door / WoZ / Mechanical Turk /
    Pinocchio / YouTube test / impresario). The TRI metric (tangible / real-time /
    imminent). Threshold-before-running (Ries pivot discipline). YODA (your-own-data >
    anything).
  - **`/design-tokens-init` skill (new)** — IDEA-010 Phase 2. Scaffolds the three-layer
    token system at the first-UI-commit inflection. **Cohort-aware delivery** (v0.20's
    framing): vibe-coder-newbie gets SHOWING; eng-builder gets OFFERING; vibe-virtuoso gets
    OVERRIDE-FRIENDLY; first-product gets DEFINE-TERMS; indie-hacker gets RIGHT-SIZED;
    returning-founder gets SKIP-THE-101; non-tech-founder + domain-expert get PLAIN-
    LANGUAGE-COACH; unspecified gets neutral. The three-layer architecture (primitives →
    semantic → component) is Curtis's layer-cake; the AI-tolerance argument is that
    two-layer systems are fragile under AI generation (the field's consensus). Reads canvas
    Promises cell to brand-anchor the primitives (prevents the brand-default problem from
    IDEA-010).
  - **Three new MVP-stage loops** on the v0.18 generic loop primitive:
    - `spec-loop` (runner_type: skill) — encodes moment #4 restraint. Entry: canvas-loop
      closed for some active idea. Exit: `FEAT-NNN-<slug>.md` exists. `/spec` is the
      detector + runner.
    - `pretotype-loop` (runner_type: skill) — structural by default (no drift_moment to
      avoid over-firing). Records that demand-testing happened before significant build.
      `/pretotype` is the runner.
    - `design-tokens-loop` (runner_type: hook) — JIT, *only opens once UI starts
      accumulating* (≥3 style declarations across src/). Drift moment: **`coherence`**
      (new — system-vs-code drift; a flavor of caution specific to design-system mismatch).
      Stack-agnostic regex catches common React/Vue/Svelte/Solid patterns; founders can
      edit the spec for their stack.
- **L1-mvp manifest** declares the new 3 skills + 3 loops; `boss sync` carries them; `.boss`
  stamp tracks them. The `claude-append.md` reads as a clean catalog of what MVP offers.
- **End-to-end tested in /tmp:** scaffold → unlock mvp → all 7 skills + 5 loops land + stamp
  merges correctly + status --conscience shows the 5 loops in their right states (capture
  open-structural, canvas/spec/pretotype/design-tokens all unopenable on a fresh project, no
  spurious hook fires). 43/43 evals still pass (regression-clean).
- **Deferred to v0.22:** moment #3 (capture — reusable value at breakpoint), V1 mode authoring
  including the design-drift-loop (IDEA-010 Phase 3) + ui-designer + ux-designer agents +
  /design-review + /ux-check + PostToolUse hook for hardcoded-style detection.

## 0.20.0 — 2026-05-23

- **The three design changes from v0.19's persona-reactions pass — landed.** Closes the loop on
  the reactions: the personas flagged it, v0.20 shipped it. Moments #3 + #4 (the other v0.20
  candidates per the published roadmap) deferred to v0.21 — they need their own design pass
  (moment #3's "reusable value at breakpoint" detection is harder than predicate evaluation;
  moment #4's "premature ceremony" needs `/spec`-skill-aware detection plus a spec-loop). The
  three things shipping in v0.20 are the *persona-driven* design changes; the moment work is a
  separate concern.
  - **`boss status --conscience`** — the inspect affordance (asked-for by `eng-builder`,
    `indie-hacker`, `vibe-virtuoso` personas in the v0.19 reactions doc). Loads
    `docs/loops/*.md`, classifies each loop (open / closed / unopenable), shows what would
    close the open ones (concrete predicate evidence: count/threshold, file matches, what's
    missing), reads recent override entries from `docs/devlog.md` per IDEA-008's grammar,
    shows the project's declared cohort. New `src/conscience.js` module formats the output;
    the loop runtime is imported from the canonical Quickstart-template path so there's one
    source of truth.
  - **Cohort-aware conscience** — `.boss/config.json` carries an optional `cohort` field
    (one of: vibe-coder-newbie | eng-builder | non-tech-founder | first-product |
    vibe-virtuoso | indie-hacker | returning-founder | domain-expert | null). The
    `loop-runtime.js`'s `composeContext` now reads the cohort and appends a **cohort framing
    directive** to `additionalContext` — same signal, different voice. Each cohort gets a
    distinct framing sentence: first-product needs *teaching*; returning-founder wants a
    *harder cohort-aware question*; vibe-virtuoso gets *friction over praise*; indie-hacker
    gets *plain Fitzpatrick language, not jargon*. The `/boss` spin-up skill now asks
    one optional question to set the cohort; user can always edit `.boss/config.json` later.
  - **Voice lineage decision: Fitzpatrick consistently.** The indie-hacker persona caught
    that the prior conscience voice mixed Fitzpatrick ("who would you ask first") with
    Maurya ("riskiest assumption" / "riskiest bet") in one breath. v0.20 picks Fitzpatrick-
    plain ("what they'd want to learn"; "who they'd ask first") consistently. Updates the
    `/triage` skill's exemplar text + the `composeContext` framing in `loop-runtime.js`. The
    canvas itself still uses "riskiest assumption" (that's the canvas's frame, established);
    the *conscience nudge* now speaks Fitzpatrick.
- **Test coverage:** 43/43 evals still pass (regression-clean). End-to-end test in /tmp
  verified: fresh project → capture-loop open (no signal, structural); 3 captures + no canvas →
  canvas-loop drifts, hook fires with cohort framing in additionalContext; override in devlog →
  appears in `boss status --conscience` output.
- **What's NOT in v0.20** (now queued for v0.21): conscience moments #3 (capture — reusable
  value) and #4 (restraint — premature ceremony). Moment #3 needs a different detector design
  (predicate evaluation doesn't fit "noticing this artifact is generalizable"). Moment #4
  needs a spec-loop authored AND skill-aware detection in `/spec`. Both warrant their own
  release.

## 0.19.0 — 2026-05-23

- **Proto-personas layer + first reactions pass — the founder-experience eval channel.** 8
  synthetic-founder agents now seated in BOSS's `.claude/agents/` with `persona-` prefix
  (parallel to `mentor-`, parallel to the builder team). They REACT to BOSS features (not
  advise, not mentor) so BOSS gets cheap pre-filter signal on how it lands across cohorts
  *before* spending the expensive real-founder Mom Test call (which remains explicitly
  overridden per advisory-pass #1; the override's re-open condition includes "persona
  reactions surface a coherent product story" — this layer is how that signal arrives).
  - The 8 personas: `vibe-coder-newbie` (no eng/startup background, picked up Cursor 3-6
    months ago), `eng-builder` (10+ years eng, first-time founder, skeptical of magic),
    `non-tech-founder` (deep domain expertise, can't code, AI is the bridge),
    `first-product` (absolute beginner — to building, to vibe coding, to everything),
    `vibe-virtuoso` (50+ shipped projects, zero sustained products, expert at idea-to-demo,
    bad at company-building), `indie-hacker` (right-sized lens — Walling/Fried/Jarvis;
    anti-VC; suspicious of venture-shaped language), `returning-founder` (has shipped before;
    intolerant of 101 content; wants depth), `domain-expert` (medical/legal/financial;
    stakes are real; humane lens applies hard).
  - **`persona-reactions-loop`** authored in `docs/loops/` — captures the discipline (runner_
    type: manual; uses the v0.18 loop primitive). Entry: persona agents exist. Exit: a
    `docs/dossier/persona-reactions/<feature>.md` doc with structured reactions + synthesis +
    design changes + real-founder questions the reactions sharpen.
  - **First reactions pass complete** at
    [`docs/dossier/persona-reactions/conscience-moment-1.md`](docs/dossier/persona-reactions/conscience-moment-1.md).
    All 8 personas reacting to the conscience moment-1 firing scenario.
  - **Three concrete design changes the reactions argue for** (ordered, with priorities):
    1. **Cohort-aware conscience** — the model composing the conscience voice should know what
       cohort the founder is in (`.boss/config.json` declares it, set by `/boss` during
       scaffold). First-product needs *teaching*; returning-founder needs *a harder
       question*; vibe-virtuoso needs *sharper architecture*. Same signal; different voice.
    2. **Inspect affordance** — `boss status --conscience` or `boss conscience --explain` so
       humans can see what loops are open / what would close them / what overrides exist.
       Engineers + indie-hackers + vibe-virtuosos all asked for this. Plausibly v0.20
       alongside moments #3/#4.
    3. **Pick the lineage in the conscience voice** — current voice mixes Fitzpatrick
       (talk-to-someone) and Maurya (riskiest-assumption) in one breath. Indie-hacker caught
       this; the eval set didn't. Lean one direction consistently.
  - **Three real-founder interview questions** the reactions sharpen for the eventual call:
    (1) read-aloud comprehension test; (2) curious-vs-defensive-vs-confused for first-timer
    cohort; (3) cohort-aware variant test for returning-founder cohort.
  - **Two surprises from the reactions** that hadn't surfaced via any other discipline:
    returning-founder wants a HARDER question, not a softer one (suggesting cohort-aware
    direction); indie-hacker noticed the voice-fights-itself issue (Fitzpatrick vs Maurya
    lineage mix) that 84 eval examples missed. **Argument for routine persona-eval passes on
    every user-facing text.**
- **Roadmap status:** v0.17 (builder team) + v0.18 (loop primitive) + v0.19 (personas) all
  shipped this push. Next up: v0.20 (moments #3+#4 via the generic detector, leveraging the
  v0.19 reactions for cohort-aware language) + v0.21 (MVP discipline upgrades).

## 0.18.0 — 2026-05-22

- **IDEA-008 → FEAT-001: generic loop runtime in Node; bash hook retired.** The biggest
  architectural release since v0.8.0 (learning loop). The conscience hook used to be hand-coded
  bash with a single hard-wired detector for moment-1. It's now a generic Node runtime that
  reads `docs/loops/*.md` from the project, evaluates entry/exit predicates, and emits
  structured signals — *any* loop drifting fires *its* moment, no per-moment code. Moments
  #3 and #4 will be authored as loops (not detectors) in v0.20.
  - **`conscience.js`** (replaces `conscience.sh`) — zero-dep Node, ~50 lines. Loads loops,
    classifies state, composes signals, prints JSON. Fails silent — never blocks a prompt.
  - **`lib/loop-runtime.js`** — the engine. Loads loops from `docs/loops/*.md`, evaluates a
    closed predicate vocabulary (`exists`, `count_at_least`, `any_file_matches`) against the
    live filesystem, classifies each loop as `unopenable | open | closed`, returns structured
    signals only for hook-runner loops with a `drift_moment`. Loops without `drift_moment` are
    *structural* (express dependencies but don't drift — caught the over-fires-on-fresh-project
    bug live during the build; capture-loop is the canonical structural loop).
  - **`lib/yaml.js`** — zero-dep YAML parser lifted from the eval runner so the same code parses
    loop specs at hook time and eval examples at test time.
  - **Two named loops authored** in the Quickstart template (`docs/loops/`):
    - `capture-loop` — structural; expresses "at least one captured idea exists." Downstream
      loops (canvas-loop) check this via their own entry predicates.
    - `canvas-loop` — encodes moment-1's full logic *declaratively* via predicates. Entry: ≥3
      dated capture-log entries across active (non-dropped) idea files. Exit: at least one
      canvas tied to an active idea has a real (≥3-char alphanumeric) riskiest assumption.
      Drift = open + not closed = moment-1 caution. The hand-coded bash logic is now expressed
      in YAML.
  - **`manifest.json` gains a `loops` array.** `src/scaffold.js` + `src/sync.js` handle loops
    as a new managed-file kind (`kind: loop`, `rel: docs/loops/<name>.md`). Hook-library files
    (`lib/*.js`) auto-discovered from the template and synced alongside the hook script. The
    `.boss` stamp tracks `loops` (alongside agents/skills/hooks).
  - **`runner_type` field on loop specs** — resolves the moment-2 shape question from v0.16's
    meta-learnings. Today only `hook` is honored by the conscience runtime; `skill`, `manual`,
    `external` will be honored by future runners (skill-prompt eval, manual review, external
    detector — e.g. CI).
  - **Settings migration (bash → node).** Existing projects pinned at <= 0.13.0 have
    `bash …conscience.sh` in their settings.json. The merge logic now applies hook-command
    *migrations* before the additive merge: it drops stale bash entries before adding the new
    node entry. Tested with a synthetic pre-0.18 project: bash entry dropped, node entry added,
    user's permissions preserved, idempotent on re-sync.
  - **Eval set unchanged; 43/43 still pass against the generic runtime** (regression-coverage
    in place). The runner now invokes `node conscience.js`, materializes `docs/loops/` into
    the test project before each example (so the runtime has loops to load), and the existing
    examples test the *generic detector* end-to-end. One bug found during the build (POSIX
    regex char classes — `[[:space:]]` doesn't work in JS) fixed by switching loop specs to
    JS-native regex (`\s+`, `[a-zA-Z0-9]{3,}`). Eval-first discipline catching itself.
  - **BOSS dogfoods:** `docs/loops/capture-loop.md` + `docs/loops/canvas-loop.md` now live in
    BOSS itself (alongside the existing `docs/loops/eval.md`). BOSS-the-project runs the same
    runtime against its own state.
  - **Verdict on the primitive (from v0.16's meta-learnings): confirmed under contact with
    real Node implementation.** The four-field shape (entry / purpose / exit / drift) held up.
    Predicate vocabulary covered everything moment-1 needed declaratively. The structural-loop
    pattern (no `drift_moment`) handles dependencies-only cases cleanly. Net code change:
    `conscience.sh` (40 lines bash) replaced by `conscience.js` + `lib/` (~250 lines Node) —
    bigger surface, but moments #3+ will be loop specs (~30 lines YAML each), not new detectors.

## 0.17.0 — 2026-05-22

- **Builder team seated alongside the mentor board.** Three new builder agents in BOSS's own
  `.claude/agents/` — they make BOSS *feel right*, parallel to the mentor board which makes
  BOSS *be right*. Builders, not mentors: they propose concrete diffs, not advice. Cover the
  interaction-design layer that wasn't covered by either the mentor board or the existing builder
  agents (pm, coder-generalist, tester, program-manager).
  - **`designer`** — owns the UX of the entire BOSS interaction experience. Not "the visual
    designer" (BOSS is a CLI + Claude Code experience, not a webapp). Owns: when BOSS speaks vs
    stays quiet, what a skill *feels* like when run, the rhythm of mode unlocks, the surprise
    vs predictability of conscience moments, what the founder is being asked to *do* vs read at
    every step. Sources: Norman, Krug, Nielsen, Spool, Wroblewski, Walter + AI-specific UX
    heuristics (options-not-truth; visible confidence; deliberate failure states).
  - **`voice-keeper`** — guards what BOSS *sounds like*. Reviews skill text, agent system
    prompts, hook signal language, README, CHANGELOG, error messages. Catches performed warmth,
    scolding tone, voice-mode bleed, framework-jargon leaking into user-facing text, assumed
    knowledge, hedging. Proposes concrete edits side-by-side. Inward-facing language guardian.
    Sources: `boss-voice` memory (canonical spec), Strunk & White, Raskin + Neumeier (pitch =
    product voice), Godin (write to one person).
  - **`prompt-coach`** — helps the founder write better prompts (to BOSS, to Claude, to AI in
    general) and teaches the craft over time. Outward-facing counterpart to voice-keeper.
    Builds a per-founder pattern library in `docs/dossier/founder-prompt-patterns.md`. Catches
    vague / multi-prompt / missing-constraint / missing-output-format / leading-question /
    missing-context / wrong-role-assignment / stop-word-missing failure modes. Sources:
    Karpathy (think in distributions), Mollick (AI-as-different-roles), Willison (prompt-as-
    code), Liu (Pydantic-first), Husain (look at the output), Fitzpatrick (Mom Test discipline
    applied to interview prompts).
- **Advisory-pass #1 (real-founder Mom Test calls) explicitly overridden — first real use of
  IDEA-008's override grammar.** Ajesh's call: at zero users + product still defining its shape,
  expensive real-founder calls are premature; cheap synthetic signal from proto-personas (v0.19
  work) is the right move now. Override recorded in `docs/dossier/boss-advisory-pass-001.md`
  with explicit re-open conditions (persona reactions surface a coherent product story, OR a
  non-Ajesh user starts using BOSS in earnest, OR the eval set catches something only real-
  founder feedback could surface). The recommendation isn't deleted — it's deferred under the
  IDEA-008 contract: deviation made conscious, recorded, re-openable.
- **Roadmap published** (in RESUME): v0.17 builder team → v0.18 generic loop primitive (IDEA-008
  to FEAT) → v0.19 proto-personas as named loops → v0.20+ moments #3/#4 + MVP discipline
  upgrades + V1/Scale mode authoring + IDEA-003 finish + externalization + backlog. Ten releases
  sequenced for build-on-build; the discipline rails (evals, structured output, loops, personas)
  make each one buildable in a focused session.

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
