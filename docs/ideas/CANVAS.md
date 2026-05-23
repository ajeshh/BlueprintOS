---
id: BOSS-canvas
type: canvas
owner: pm
status: drafting
version: 0.2
updated: 2026-05-23
---

# Humane Product Canvas — BlueprintOS

> A snapshot, not a blueprint. BOSS running its own `/canvas` on itself. Revisit as insight grows.
> Framework: Humane Product Canvas by Ajesh Shah.
>
> **v0.2 (2026-05-23):** Updated after v0.5 → v0.19 shipped. The big shifts: (a) the mentor + builder
> + persona teams are seated (26 agents); (b) the conscience is real (eval-tested, structured
> output, loop-primitive-based); (c) right-sized shape converged across mentor-business +
> mentor-fundraising + mentor-talent; (d) the persona-reactions work surfaced that the original
> riskiest assumption has SPLIT into cohort-specific questions.

## 1 · Human Foundation

| Cell | Answer |
|---|---|
| **People** | Founders building AI-native products in 2026 — the cohort where AI made building suddenly possible and the founder skills haven't caught up. Sharpest fit (from persona reactions): *the founder who's already used Claude Code or Cursor for 3+ months, has 2+ unfinished projects in their git, and is starting to suspect they need a bit more structure but doesn't want a heavyweight framework.* That's `vibe-virtuoso`, `eng-builder`, `indie-hacker`, `returning-founder` shapes. **Less well-served today** (persona reactions caught this): `first-product` cohort bounces off any conscience-heavy tool without cohort-aware tailoring; `non-tech-founder` needs domain-aware features that aren't built yet; `domain-expert` cohort (regulated domains) has unique safety needs. *The cohort-aware conscience direction (v0.20) is the bet that addresses this.* |
| **Problem** | If AI lets you build *anything*, what should you build, and how do you know it's worth finishing? Most tools attack the building part (better IDEs, better models, better scaffolds). The harder, more under-served part is the *founder* part — *which bet to pick, when to validate, when to ship, when to drop*. Today's choices for that part are bad: enterprise scaffolds bury you in ceremony, blank repos give no guidance, founder-coaching content is mostly long-form reading divorced from what you're actually doing. Hard-won practices stay trapped in one repo, one mind, one career. Emotional tension: *"I can build this — but I don't really know how to start a company, and I'm not sure who to ask."* |
| **Promises** | A conscience-while-you-build that scales ceremony to evidence — never buried in process you haven't earned, never missing the support you now need. A knowledgeable team-in-a-box (mentors who advise, builders who implement, personas who react) shows up *just in time* and grows with you. Override is always available; deviation is recorded, never blocked. Momentum + confidence + honest discipline — without becoming the thing it warns against. |

## 2 · Product Expression

| Cell | Answer |
|---|---|
| **Story** | `boss new <project>`, open Claude Code, `/boss`. A calm staged guide appears. Capture ideas with `/triage`, pressure-test them with `/canvas`, build them with `/spec` + `/smoke` + `/log` + `/close`. The conscience speaks once when discipline is drifting (not naggy; structured signal; cohort-aware in v0.20). The mentor board is on call: ask `mentor-venture` whether the bet is real, `mentor-architect` about the AI architecture, `mentor-gtm` about the first 100 users. As the project earns it, modes unlock (Quickstart → MVP → V1 → Scale) and the next agents arrive. The whole thing runs locally, transparently inspectable, with zero-dep CLI + plain markdown for state. |
| **Modes of Engagement** | Zero-dep Node CLI (scaffold/registry/sync/learn — all reversible) + Claude Code skills (the verbs: `/boss`, `/triage`, `/canvas`, `/spec`, `/smoke`, `/log`, `/close`, `/boss-sync`, `/boss-learn`) + builder agents (the roles that *make* things: pm, coder-generalist, tester, program-manager, designer, voice-keeper, prompt-coach) + mentor agents (the roles that *advise* the founder: venture, architect, gtm, business, fundraising, pitch, talent, humane) + persona agents (the cohorts that *react* to test the founder-experience: 8 today). Everything **declarative** (plain markdown, YAML frontmatter, predicate-based loops); everything **inspectable** (`boss status`, `boss sync --dry-run`, structured hook output); everything **overridable** (record deviation in devlog; conscience respects). Humane: time/attention/autonomy/dignity all load-bearing in the design. |
| **Business Model** | **Default shape: calm-company / OSS / patronage** (converged from mentor-business + mentor-fundraising + mentor-talent in advisory pass 001). Any other shape requires a deliberate decision. *Hard constraint on the record:* never monetize lock-in or ceremony. Candidate revenue shapes if/when needed: hosted founder dossier (your project's evolving mentor sessions, persistent), sponsored / patronage (companies underwrite because BOSS improves the ecosystem), education/cohort (BOSS-the-tool free, BOSS-the-program charges). Pricing decisions deferred until there's WTP signal from a real cohort. |

## 3 · Stewardship

| Cell | Answer |
|---|---|
| **Metrics** | *Outcome-shaped* (per Ries/Cagan), not output-shaped. **Activation:** first idea captured + first canvas filled with a real riskiest assumption. **Cohort serving:** persona-reactions pass shows no cohort bouncing off a feature. **Loop health:** loops closing at evidence (not ceremony), overrides recorded with substantive rationale. **Founder progress:** project-mode level-ups happen because earned, not pushed. **Practice promotion:** patterns flow UP into BOSS via `/boss-learn` (the meta-feedback loop). *Anti-metrics (vanity):* total commits, total scaffolded projects, agent invocations. Don't optimize for these. |
| **Risks & Harms** | (1) **BOSS bloats into a heavy framework** — most ironic, still the most-likely failure. The very ceremony BOSS exists to prevent in projects, BOSS could become. *Mitigation:* every release weighed against Principle 2. (2) **The conscience IS the moat AND the most under-validated thing** — surfaced by advisory pass. *Mitigation:* eval-set discipline (84 examples); persona-reactions discipline (v0.19); cohort-aware design (v0.20); real-founder validation when override lifts. (3) **Imposing ceremony prematurely** — fights Principle 2. *Mitigation:* override pattern (deviation conscious + recorded). (4) **False confidence / bad startup or legal advice** — mentors must caveat and point to real experts. *Mitigation:* hard line on every mentor agent file; mentor-humane has explicit override authority. (5) **Cumulative pressure on real founders not yet implemented** — surfaced by advisory pass mentor-humane. *Mitigation:* design in v0.20. (6) **Proto-personas mis-used as validation** — surfaced by v0.19. *Mitigation:* every persona file + reactions doc explicitly names "cheap pre-filter, not validation." (7) **Excluding cohorts who can't run terminal** (`non-tech-founder` per persona reactions). *Mitigation:* hosted/web surface eventually; today's CLI-first shape is constraint, not principle. |
| **Principles** | [`PRINCIPLES.md`](../../PRINCIPLES.md) — the six. Humane before viable (Principle 6) is the override against any of the above. |

## 🎯 Incubation heartbeat (v0.2 — re-articulated)

The original riskiest assumption was *"JIT staging + mentors actually reduce overwhelm, rather than becoming yet another system to learn."* It split into cohort-specific questions after v0.19's persona-reactions pass:

- For `eng-builder` / `indie-hacker` / `returning-founder` / `vibe-virtuoso`: the structure + override pattern lands well; the architecture is the lean-in. *Likely-supported by persona signal.*
- For `first-product` / `non-tech-founder` / `domain-expert`: the structure could feel like school / could exclude them / could not handle domain stakes. *At-risk per persona signal; cohort-aware design is the bet.*

**The current riskiest assumption (v0.2):** *Can the cohort-aware conscience (v0.20 work) actually land differently for different cohorts without becoming N separate products?* If yes, BOSS can serve the full cohort range with one tool. If no, BOSS becomes ambient ceremony optimized for one cohort and excluded by others.

**Deeper riskiest (still un-tested):** *Does any non-Ajesh founder actually want this?* The advisory-pass override on real-founder Mom Test calls is explicit. The override's re-open conditions name the threshold: *persona reactions surface a coherent product story* (v0.19 — partial: surfaced 3 design changes); *a non-Ajesh user starts using BOSS in earnest* (not yet); *the eval set catches something only real-founder feedback could surface* (not yet).

**Experiment this 2-4 weeks:**
- Run the persona-reactions loop on every v0.20–v0.21 feature *before* shipping. Treat cohort divergence in reactions as a design-must-fix, not a nice-to-have.
- After v0.20 (cohort-aware conscience), re-run all 8 personas against the new conscience experience. Compare reactions to the v0.19 baseline. Look for: did the cohort-bouncing categories close?

**What would change the plan:**
- *If the cohort-aware conscience doesn't materially change first-product / non-tech-founder reactions:* the conscience is the wrong instrument for cross-cohort serving — split into per-cohort onboarding flows instead.
- *If the persona-reactions show convergence (all 8 mostly happy) but a real-founder still bounces (when override lifts):* the personas are over-fitting to Ajesh's model; the personas need real-evidence integration (IDEA-009 territory).
- *If multiple cohorts ALL ask for the same thing the roadmap doesn't have:* re-order the roadmap. The personas are calibrated enough now to act as light demand-signal.

## Status & next instance

This canvas re-opens when:
- v0.20 ships and personas re-react. *Expected timing: within ~2 capability releases.*
- A real-founder Mom Test call happens (override lifts) and contradicts a persona reaction.
- The right-sized shape decision is challenged by a piece of evidence.
- BOSS's own state diverges materially from what these cells describe.
