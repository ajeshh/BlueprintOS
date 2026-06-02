---
id: BOSS-canvas
type: canvas
owner: pm
status: drafting
version: 0.3
updated: 2026-06-02
---

# Humane Product Canvas — BlueprintOS

> A snapshot, not a blueprint. BOSS running its own `/canvas` on itself. Revisit as insight grows.
> Framework: Humane Product Canvas by Ajesh Shah.
>
> **v0.2 (2026-05-23):** Updated after v0.5 → v0.19 shipped. Mentor + builder + persona teams seated;
> the conscience real (eval-tested, structured output, loop-primitive); right-sized shape converged;
> riskiest assumption split into cohort-specific questions.
>
> **v0.3 (2026-06-02):** Re-aim after v0.20 → v0.41 (22 releases). **The uncomfortable finding,
> stated plainly: the two riskiest assumptions from v0.2 were neither resolved nor abandoned —
> they were *built around*.** (a) The v0.2 experiment ("re-run all 8 personas after v0.20's
> cohort-aware conscience; did the cohort-bouncing close?") was **never executed** — the work moved
> on. (b) The deeper one ("does any non-Ajesh founder want this?") is **still 'not yet'**, 22 releases
> later. What those releases *did* deliver: the conscience matured from eval-tested → **model-verified
> judgment across 3 moments** (drift/caution/capture, GRADED 24/24), **frequency-instrumented**,
> **pausable** (v0.23), plus the **`/vet` skeptical inbox** (v0.40–41) and **positioning** (v0.24:
> *"the just-in-time conscience for AI-native founders. Pause it any time."*). **So: the conscience's
> *internal quality* risk has been retired — arguably over-served. The conscience's *external demand*
> risk is now 100% of the remaining risk and 0% addressed.** That collapse is the whole v0.3 re-aim.

## 1 · Human Foundation

| Cell | Answer |
|---|---|
| **People** | Founders building AI-native products in 2026 — AI made building suddenly possible and the founder skills haven't caught up. Sharpest fit (persona reactions + v0.24 positioning): *a founder who's used Claude Code or Cursor for 3+ months, has 2+ unfinished projects in their git, suspects they need a bit more structure but won't tolerate a heavyweight framework.* That's `vibe-virtuoso` / `eng-builder` / `indie-hacker` / `returning-founder`. **Less well-served:** `first-product` bounces off conscience-heavy tooling without tailoring; `non-tech-founder` needs domain features + a non-terminal surface; `domain-expert` (regulated) has unique safety needs. **v0.3 honesty: every word of this cell is still hypothesis — n=0 real founders.** It's derived from 8 proto-personas (which the persona files themselves label "cheap pre-filter, not validation") and from Ajesh. The sharp-fit cohort has never been observed using BOSS. |
| **Problem** | If AI lets you build *anything*, what should you build, and how do you know it's worth finishing? Most tools attack the *building* part (IDEs, models, scaffolds — Lovable/v0/Bolt own code-gen). The under-served part is the *founder* part — *which bet, when to validate, when to ship, when to drop.* Today's options are bad: enterprise scaffolds bury you in ceremony; blank repos give no guidance; founder-coaching is long-form reading divorced from the work in front of you. Hard-won practice stays trapped in one repo, one mind, one career. Emotional tension: *"I can build this — but I don't really know how to start a company, and I'm not sure who to ask."* BOSS is explicitly **complementary to code-gen, not competing** (v0.24): the thinking layer between the code-generator and the founder. |
| **Promises** | **The just-in-time conscience for AI-native founders — pause it any time** (v0.24 lead). Ceremony scales to evidence: never buried in process you haven't earned, never missing the support you now need. A team-in-a-box (mentors advise, builders make, personas react) arrives JIT and grows with you. **Override is real, not aspirational** — the pause primitive (v0.23) makes "deviation recorded, never blocked" a shipped capability, not a value statement. Momentum + confidence + honest discipline — without becoming the thing it warns against. |

## 2 · Product Expression

| Cell | Answer |
|---|---|
| **Story** | `boss new <project>`, open Claude Code, `/welcome` then `/boss`. A calm staged guide appears. Capture with `/triage`, pressure-test with `/canvas`, build with `/spec` + `/smoke` + `/log` + `/close`. The conscience speaks once when discipline drifts — **model-verified, cohort-aware, pausable, frequency-instrumented so it can't quietly over-fire**. Deeper checks on demand: `/drift-deep` (whole-project "am I fooling myself?"), `/extract` (route reusable patterns UP/DOWN), `/vet` (judge an outside best-practice before adopting). The mentor board is on call; `boss board` renders what's in flight. Modes unlock as earned (Quickstart → MVP → V1 → Scale). Runs locally, transparently inspectable, zero-dep CLI + plain-markdown state. **v0.3 caution: this cell keeps getting longer every release. That is itself a Risk-#1 reading — see Stewardship.** |
| **Modes of Engagement** | Zero-dep Node CLI (scaffold/registry/sync/learn/board — all reversible) + Claude Code skills (now ~14 in MVP: the verbs above + `/welcome` `/ai-first-init` `/ai-cost` `/ai-failure-states` `/cost-review` `/evals` `/pretotype` `/extract` `/drift-deep` …) + builder agents (pm, coder, tester, program-manager, designer, voice-keeper, prompt-coach, ui/ux/db) + mentor agents (venture, architect, gtm, business, fundraising, pitch, talent, humane) + 8 persona agents. Everything **declarative** (markdown, YAML frontmatter, predicate loops), **inspectable** (`boss status`, `--dry-run`, structured hook output, conscience activity ledger), **overridable** (pause + recorded deviation). Humane: time/attention/autonomy/dignity load-bearing. **v0.3: the surface has roughly doubled since v0.2. Growth is the moat-deepening BOSS chose over founder contact — name it, don't celebrate it.** |
| **Business Model** | **Default shape: calm-company / OSS / patronage** (converged across mentor-business + fundraising + talent, advisory pass 001). Any other shape requires a deliberate decision. *Hard constraint:* never monetize lock-in or ceremony. Candidate shapes if/when needed: hosted founder dossier; sponsored/patronage; education/cohort (tool free, program charges). **Unchanged in v0.3 — and unchangeable until there's WTP signal from a real cohort, which requires the demand validation this canvas now centers on.** No pricing decision is honest before then. |

## 3 · Stewardship

| Cell | Answer |
|---|---|
| **Metrics** | *Outcome-shaped* (Ries/Cagan), not output-shaped. **Activation:** first idea captured + first canvas with a real riskiest assumption. **Cohort serving:** persona pass shows no cohort bouncing. **Loop health:** loops close at evidence not ceremony; overrides recorded with substantive rationale. **Founder progress:** mode level-ups happen because earned. **Practice promotion:** patterns flow UP via `/boss-learn`. *Anti-metrics (vanity):* total commits, scaffolded projects, agent invocations, **release count**. **v0.3 honesty: all six metrics are defined; none are instrumented against reality** — they have only ever been measured on Ajesh + synthetic personas. A defined metric with no real-world reading is a plan, not evidence. |
| **Risks & Harms** | (1) **BOSS bloats into a heavy framework** — *no longer hypothetical; materializing.* 41 releases; the Story/Modes cells above visibly swell each pass; the surface has ~doubled since v0.2. The very ceremony BOSS exists to prevent, BOSS is accreting. *Mitigation:* weigh every release against Principle 2 — **and weigh the next release against founder contact, not against the backlog.** (2) **The conscience: moat AND most under-validated** — *now split in two.* Its *internal* quality is well-validated (evals + model-grading, GRADED 24/24). Its *external* value — does it change a real founder's decision for the better — is **zero-validated**; the "real-founder validation when override lifts" mitigation never triggered because the override never lifted. (3) **Premature ceremony** — fights Principle 2; mitigated by the override/pause pattern (now shipped). (4) **Bad startup/legal advice** — mentors caveat + point to real experts; mentor-humane has override authority. (5) **Cumulative pressure on real founders** — surfaced by mentor-humane; can't be validated without real founders. (6) **Proto-personas mis-used as validation** — *the live risk this re-aim caught:* 22 releases of design leaned on persona signal as if it were demand signal. Personas are a pre-filter; they cannot answer "does anyone want this." (7) **Excluding non-terminal cohorts** — CLI-first is constraint, not principle; hosted/web surface eventually. |
| **Principles** | [`PRINCIPLES.md`](../../PRINCIPLES.md) — the six. Humane before viable (Principle 6) overrides any of the above. |

## 🎯 Incubation heartbeat (v0.3 — re-articulated)

The v0.2 heartbeat carried two riskiest assumptions. v0.3 resolves their *status* (not their answer):

- **v0.2 #1 — "Can the cohort-aware conscience land per-cohort without becoming N separate products?"**
  *Architecturally answered, experientially untested.* BOSS did build one cohort-aware system (config-declared cohort + framing in the hook), not N products — so the *N-products* failure mode was avoided by construction. But "does it actually *land differently* for a real `first-product` vs a real `eng-builder`" was the experiment, and **the experiment was never run.** Retire this as a build question; it folds entirely into #2 — you cannot test cross-cohort landing without cross-cohort founders.
- **v0.2 #2 — "Does any non-Ajesh founder actually want this?"** *Unchanged. Still not yet.* This is now the **whole** riskiest assumption.

**The current riskiest assumption (v0.3):**
*Will one non-Ajesh founder — the sharp-fit cohort — keep using BOSS past the first session, and will the conscience visibly change at least one decision they'd otherwise have made worse?*
If yes, the moat is real and the deepening was justified. If no, BOSS is a beautifully engineered conscience that only its author wants — and the last 22 releases optimized the wrong axis.

**Why this is now the only bet that matters:** the internal-quality risk is retired (evals + model-grading did their job). Every remaining risk in the Stewardship cell either *is* the demand question or *can't be answered without* the demand question. There is no internal build that reduces the riskiest assumption further. **Building more is now, definitionally, building around the risk.**

**Experiment this 2–4 weeks (the real one this time):**
- Get BOSS in front of **1–3 real founders** in the sharp-fit cohort (3+ months on Claude Code/Cursor, 2+ unfinished projects, won't tolerate heavyweight ceremony). The v0.2 override's own re-open condition — *"a non-Ajesh user starts using BOSS in earnest"* — **is** this experiment.
- **Watch one real session, Mom-Test discipline** (observe behavior, don't pitch): do they `boss new` → `/welcome` → capture → canvas without bouncing? Does a drift/caution moment fire — and do they *act on it or tune it out*? Tuning-out is the failure signal that no eval can produce.
- Instrument **one** real metric from the Metrics cell against that session (Activation is the cheapest: did they reach first-canvas-with-a-real-riskiest-assumption?).
- Success = one founder returns for a second session unprompted **and** can point to a decision the conscience changed. That single data point outweighs any release on the backlog.

**What would change the plan:**
- *Can't find even one sharp-fit founder to try it:* the distribution/positioning problem precedes the product problem — `mentor-gtm` leads, not more features.
- *Founders use it but ignore the conscience:* the moat isn't the moat. Re-aim toward whatever they *did* use (maybe it's the scaffolding + mentors, not the conscience).
- *Founders bounce at the terminal:* the CLI-first constraint is the wall (Risk #7) — the non-terminal surface jumps the queue.
- *Personas said "happy" but a real founder bounces on something all 8 missed:* personas are over-fit to Ajesh's model (IDEA-009 territory) — they need real-evidence integration before they're trusted again.

## Status & next instance

This canvas re-opens when:
- The first real-founder session happens — **then re-write every cell against what was observed, not predicted.**
- A sharp-fit founder can't be found within the experiment window (distribution-before-product pivot).
- BOSS's own state diverges materially from these cells again.

> **Side-finding from this re-aim (capture candidate, not built):** BOSS's own `drift` moment did NOT
> fire on this 22-release-stale canvas, because drift detects a *missing* experiment plan, not a
> *stale/completed* one — BOSS's canvas had a v0.20 plan, it was just long-dead. The conscience has a
> blind spot for "experiment present but stale." Worth capturing as a drift-moment sharpening (or a
> `/drift-deep` check) — the re-aim surfaced a real product gap in the thing being re-aimed.
