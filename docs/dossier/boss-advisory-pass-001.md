---
id: DOSSIER-001
type: advisory-pass
owner: pm
status: active
created: 2026-05-22
mentors_consulted: [mentor-venture, mentor-architect, mentor-gtm, mentor-business, mentor-fundraising, mentor-pitch, mentor-talent, mentor-humane]
---

# Advisory pass 001 — BOSS reviewed by its own board

> First convening of the full mentor board on BOSS itself. Driven by Ajesh's call to *step back
> and check in with the experts we identified before we keep building.* Each section is one
> mentor's read on BOSS's current shape (as of v0.14.0), citing the practitioners they draw on
> from `docs/mentor-practitioners.md`. **Honest, not flattering.** Findings → concrete moves at the
> bottom.

## What was reviewed
- The current build state: zero-dep CLI, modes Quickstart + MVP authored, conscience moments #1+#2 live, hook lets #1 fire unprompted, `boss sync` carries hooks/settings.
- The canvas (`docs/ideas/CANVAS.md`) — riskiest assumption: *JIT staging + mentors reduce overwhelm, rather than becoming yet another system to learn.*
- The ideas backlog (IDEA-003 finish, IDEA-004 temple, IDEA-005 brownfield, IDEA-006 host portability, IDEA-007 brand spectrum).
- The voice + ethos memories (`boss-ethos`, `boss-voice`).

## mentor-venture — *the bet itself*

**Lens:** Fitzpatrick (Mom Test), Maurya (riskiest assumption), Savoia (pretotype), Torres (continuous discovery), Cagan (build trap), Doshi (insight → leverage).

- **The canvas is honest.** The riskiest assumption is named, the experiment specified ("dogfood BOSS on BOSS + run `margin` through Quickstart → `/canvas`"). That's already the right discipline. Most products at this stage don't have this.
- **Mom Test gap (Fitzpatrick).** Every recent shipped feature is a *Ajesh-imagining-what-founders-need* feature. None is a *founder-told-Ajesh-they-needed-this* feature. The conscience moments are beautiful in theory; we don't know if a *real* founder would feel them as care or as nagging. Doable test (this week): show a 60-second screen recording of the conscience speaking ("what does this prove?") to 5 founders who aren't Ajesh, ask "what did you just see" + "describe the last time you felt that drift yourself" + "what would have helped." Don't ask "would you use this."
- **Build trap risk (Cagan).** v0.10 → v0.14 is five capability releases without a single user-feedback loop. That's the classic build trap shape. Healthy at exploration speed; toxic if it continues past MVP.
- **Pretotype demand test (Savoia).** Before the next big capability (moments #3/#4, brownfield adoption, host portability), a 90-second pretotype-style demo and 5 founder conversations would change the priority order more than another capability.
- **Move:** Pause the "more features" axis and earn 5 real-founder conversations before v0.16.0.

## mentor-architect — *what we're betting the build on*

**Lens:** Karpathy (AI-native intuition), Willison (LLM sharp edges + security), Husain (evals), Liu (structured outputs), Mollick (AI as co-founder), Huyen (production AI).

- **Evals are missing (Husain — load-bearing).** The conscience hook (v0.12.0) is shipped without an eval set. We don't know — and can't measure — when it speaks correctly vs. naggily. Moments #3/#4 should NOT be built signal-first; they should be **eval-set-first.** Capture 20–30 real "should fire / should NOT fire" examples per moment, *then* build the detector to pass them. This is the next architecture investment, and it unlocks every future moment.
- **Hook return is free-form (Liu).** `additionalContext` is a string. It should be a structured object: `{moment, confidence, evidence}`. Claude composes the voice; the hook ships a schema. This makes evals possible and protects against drift in the signal language.
- **Host contract is undeclared (IDEA-006).** Right call to not port to non-Claude hosts yet. But name the contract — what capabilities does BOSS require from its host (UserPromptSubmit-like hooks, additionalContext-style injection, multi-step skill composition)? Even a 20-line `docs/architecture/host-contract.md` reduces future cost massively.
- **The conscience could fire in high-stakes moments (Willison).** Today's hook fires on `UserPromptSubmit`, including right before destructive ops (`git push --force`, deploys). Probably fine for now; worth knowing the failure mode exists.
- **AI-MVP architect lens missing from the stage template, now fixed.** The MVP template's `mentor-architect` was stack-neutral until this session; just retuned to lead with AI as the modality. Worth confirming the rewrite holds up the first time it's used in a real project.
- **Move:** Before building moments #3/#4, write `docs/architecture/conscience-evals.md` with 20+ examples per moment. Then refactor the hook to return structured output. Then build the new detectors.

## mentor-gtm — *who hears about BOSS*

**Lens:** Dunford (positioning against alternatives), Godin (smallest viable audience), Raskin (strategic narrative), Lochhead (category design).

- **Dunford exercise not done (load-bearing).** What does BOSS's target founder use today? Honest answer: nothing structured (a half-written PRD + Cursor + a folder of half-finished projects), or one of: YC docs, Lenny's templates, `npx create-*` scaffolds. BOSS positions against *the absence of discipline*, plus *the over-discipline of enterprise scaffolds*. That dual positioning is clarifying but never written up.
- **Smallest viable audience too broad (Godin).** "Solo founders, indie hackers, product-minded builders using Claude Code — including first-timers" (from the canvas People cell) is still too wide. Tighter cohort: *the founder who's already used Claude Code or Cursor for 3+ months, has 2+ unfinished side-projects, and is starting to suspect they need a bit more structure but doesn't want a framework.* That's a real cohort, not a market.
- **No pitch / no strangers-can-read-it README (Raskin).** README assumes you know what BOSS is. A stranger encountering it finds modes/skills/agents — interior architecture — before they find *the problem BOSS solves for them.* Strategic-narrative spine (sketched, not final): *Old world — founder + AI tools = pile of half-finished projects. New world — if AI lets you build anything, what *should* you build, and how do you know if it's worth finishing? The move — a conscience-while-you-build that scales ceremony to evidence. The promise — ship what's worth shipping; drop what isn't, cleanly.*
- **Category undefined (Lochhead).** "AI-native incubator-in-a-CLI" isn't a category anyone searches. Two paths: (a) claim the category — write the definition, name it ("JIT incubation" / "conscience-driven development") — and defend it; or (b) position into an existing one (developer tool? agent framework? founder OS?). The category-design choice is *upstream* of any launch motion.
- **Move:** Before any launch, write `docs/dossier/positioning-pass-001.md` running the Dunford exercise explicitly. Cut the README's audience to the tighter cohort. Decide category vs. position-into-category as a separate `/triage`.

## mentor-business — *how BOSS sustains itself*

**Lens:** Osterwalder (Business Model Canvas), Campbell + Ramanujam (pricing / WTP-first design), Walling + Fried & DHH + Jarvis (right-sized models).

- **The canvas honestly says *open*.** Business Model cell: "_(open — not yet decided)_". That's the right answer today. Don't manufacture a model on no evidence.
- **Right-sized shape is the likely fit (Walling, Fried, Jarvis).** BOSS's plausible shapes are calm-company / open-core / patronage, not VC-scale. The canvas already implies this (Principle 5: optionality; risks 1+3 about bloat and false advice). Worth naming explicitly: *BOSS is being designed as a calm-company tool by default, and will require an active decision to become anything else.*
- **Lock-in monetization explicitly ruled out (already on the canvas).** Good. Hold that line.
- **WTP-first thinking — premature, but seed the question (Ramanujam).** Not "what should BOSS charge"; rather, "what *piece* of BOSS, if any, would a founder feel real loss without?" Candidates: hosted mentor sessions with project memory, fine-tuned-on-your-history mentor agents, founder dossier consolidation. None of the core CLI or skills/agents — those should stay free.
- **Move:** None this session. Re-open in 6+ months, after a real-founder conversation set tells us if any of the candidates above register as value-felt vs. value-claimed.

## mentor-fundraising — *whether to raise*

**Lens:** Janz (honest *is this venture-shaped* lens), Skok (the math), Walling + Fried (the other path).

- **Default position: don't raise. Possibly ever.** BOSS has one user. The venture math doesn't pencil; the venture *shape* might never pencil. That's not a defect — it's the right answer for many tools.
- **The cost of raising would be specific: optimizing for growth-rate, which directly violates the conscience.** Hard veto if anyone tries to pitch you on this. The conscience is the moat; growth-hacking erodes it.
- **Janz lens: be honest about market sizing.** If BOSS's smallest viable audience is "the founder using Claude Code for 3+ months with 2+ unfinished projects" — that's a real cohort, but it's tens of thousands globally, not millions. Right-sized.
- **Move:** None. Re-open only if Ajesh has a *specific* reason to raise (not "everyone says I should"). The right answer for the next 12+ months is bootstrap.

## mentor-pitch — *how BOSS gets explained*

**Lens:** Raskin (strategic narrative spine), Miller (StoryBrand — listener is hero), Neumeier (simplicity), Godin (pitch to *them*, not the room).

- **There is no pitch yet.** No deck, no talk, no 60-second version. The README assumes pre-loaded context (modes, skills, agents). For a stranger, BOSS is illegible.
- **The interior story is rich; the exterior story is missing.** `boss-ethos` and `boss-voice` memories define the philosophy beautifully. None of it has been compressed into something a stranger leans into.
- **Raskin spine to test (drafted in mentor-gtm above):** Old world → new world → the move → the promise → the ask. The ask today isn't "give me money" — it's "try this and tell me what you felt."
- **The voice = the product (rare advantage).** Most pitches are in a different register than the product. Here, the *seasoned hand who's built many things and doesn't need the credit* voice is *both* the conscience inside the tool *and* the right voice for the pitch. Use it. Any slide that doesn't sound like that voice is the wrong slide.
- **Move:** Draft the 60-second version + the README's "for strangers" opening before any launch. Pressure-test by reading it to a stranger at a coffee shop (Fitzpatrick discipline — what did they understand, not what they said).

## mentor-talent — *team shape*

**Lens:** Claire Hughes Johnson (operating cadence), Walling + Fried & DHH + Jarvis (right-sized teams), Arlan Hamilton (contributing path).

- **Default: don't hire. Stay solo + AI for the foreseeable future.** That's appropriately sized to current evidence.
- **One bottleneck might warrant external help: real-founder interviews.** A research collaborator (not employee) for a focused week of Mom-Test-style interviews would 10× the venture-mentor's evidence base. Cheaper, more reversible, more honest than a hire.
- **Contributing path (Hamilton): possible long-term.** BOSS could plausibly become an open project people contribute to (practices/skills they invent, mentor lens improvements). But the on-ramp would have to be humane (welcoming onboarding, clear scope, attribution). Premature today.
- **Co-founder: no.** Especially not as a pattern-match move. The product is coherent under one mind right now; that's an asset, not a deficit.
- **Move:** None on hiring. *Do* consider hiring a researcher for one week of founder interviews after the next 2–3 mentor-venture conversations clarify what to ask.

## mentor-humane — *the conscience's conscience*

**Lens:** CHT (Tristan Harris / Aza Raskin), Cathy O'Neil, Jaron Lanier, Cal Newport, Ruha Benjamin, Safiya Noble.

- **The conscience is voiced as "nudge, never gate." Good. But cumulative pressure is not audited.** If the same founder gets *"what does this prove"* across 4 projects, does it feel like care or chronic shaming? **There's no session-history check, no per-user dial-back.** That's the next humane-lens engineering question — and it's a real one before BOSS reaches more than ~3 users.
- **Delegation of moral authority to Claude is real and unexamined.** The hook ships a signal; Claude composes voice and chooses to speak. *Claude's judgment is the moral authority in the moment.* What if it skews wrong (over-fires, shame-tone)? The right answer isn't a guard — it's *evals* (loops back to mentor-architect / Husain). Until we can measure the conscience's behaviour, we are trusting a black box with our distinctive feature.
- **BOSS.DK alter-ego (IDEA-007): containment discipline is *named* but not *demonstrated*.** The idea doc says "never punches down at the actual user." Good. Where exactly is the line? **Exemplar lines that show the line.** Right now it's a vibe. The line gets crossed first as a vibe; a vibe is not enough discipline.
- **Practitioner-list gap in mentor-architect.** The AI-native list is almost entirely SF tech (Karpathy, Willison, Mollick, Ng, etc.). Ruha Benjamin / Safiya Noble's lens applied *specifically* to AI architecture decisions (whose data, whose evals, whose failure modes get prioritized) is missing from architect, even though it's listed under humane. **Cross-link these into architect's lens.** AI architecture is not value-neutral.
- **Risks & Harms cell on the canvas is named (4 risks).** That's good discipline. But none have a *test* — "how would we know risk #1 (BOSS bloats into a heavy framework) is happening?" Each risk needs an early-warning signal.
- **Move:** Three specific items: (a) add cumulative-pressure check to the conscience hook spec — even if not yet built; (b) write 5–10 exemplar lines for BOSS.DK that *show* where the punching-down line is, vs. crosses it; (c) cross-link humane practitioners into mentor-architect's lens so AI architecture decisions get the ethics lens by default.

## Cross-cutting themes (where multiple mentors agreed)

1. **Pause "more features" to earn founder contact.** mentor-venture (Mom Test), mentor-gtm (Dunford), mentor-pitch (strangers-can-read-it), mentor-humane (cumulative pressure unknowable without real users) all converge on this. **The next axis isn't a feature — it's evidence.**
2. **Evals are the next architecture investment.** mentor-architect (Husain, Liu) explicitly, mentor-humane indirectly (without measurement, the conscience is unverifiable). Moments #3/#4 should be eval-set-first, not signal-first.
3. **Right-sized is the default shape.** mentor-business, mentor-fundraising, mentor-talent all converge: BOSS is probably a calm-company / open-source / patronage shape, not a venture shape. *That's the win condition, not a fallback.* Naming this explicitly preserves it against drift.
4. **The interior story is rich; the exterior story is missing.** mentor-gtm + mentor-pitch — strangers cannot read what BOSS is from the README. The voice that's the product is also the voice of the pitch.
5. **The conscience is the moat — and the most under-validated thing.** mentor-venture (untested with real founders), mentor-architect (no evals), mentor-humane (cumulative pressure / delegation of moral authority unexamined). The thing BOSS is most differentiated by is also the thing most exposed. Plug this gap first.

## Concrete next moves (ordered)

1. **Conscience-evals pass before moments #3/#4.** Write `docs/architecture/conscience-evals.md` with 20+ "should fire / should NOT fire" examples per moment. Refactor hook to return structured `{moment, confidence, evidence}`. *Then* build moment #3/#4 detectors against the evals.
2. **5 real-founder conversations.** Mom-Test-discipline interviews (not "would you use this" — "show me your last project, where did you stall, what would have helped"). Capture findings in `docs/dossier/founder-conversations-001.md`. Pause new capabilities until done.
3. **Positioning + strangers-can-read-it README.** Run the Dunford exercise explicitly (`docs/dossier/positioning-pass-001.md`). Rewrite the README's opening for a stranger using the Raskin spine drafted above.
4. **Humane upgrades to the conscience spec.** (a) Cumulative-pressure check (per-user, not per-session) — design even if not yet built. (b) Exemplar lines for BOSS.DK containment. (c) Cross-link humane practitioners into mentor-architect's lens.
5. **Name the right-sized shape on the canvas.** Update Business Model cell from "open" to *"calm-company / open-source default; any other shape requires a deliberate decision."* Reduces drift risk.
6. **Defer for later passes:** moments #3/#4 (after evals), brownfield adoption (IDEA-005), host portability (IDEA-006), pricing decisions, fundraising decisions, hiring. None are next.

## Open questions for Ajesh

- **Founder conversation channel.** Who are the 5? Friends/network, or cold-outreach? (Cold is more honest signal but harder to set up.)
- **Eval-set authoring.** Who writes the should-fire/should-NOT-fire examples? Likely Ajesh, but worth having a researcher (or another founder) cross-check.
- **Category claim vs. position-into.** Do we want to claim "JIT incubation" / "conscience-driven development" as a new category (high cost, high distinctiveness), or position BOSS into existing language (lower cost, easier reach)?
- **The "right-sized by default" stance — explicit or implicit?** Stating it out loud closes some doors. Worth a `/triage` on its own.

## Overrides

- **2026-05-22** — **OVERRIDE:** skipped `conversation-loop` (item #2 above, the 5 real-founder
  Mom Test calls). Rationale: at zero users + product still defining its shape, expensive real-
  founder calls are premature. Cheap synthetic signal from proto-personas (v0.19 work) is the
  right call now; conversation-loop re-opens when there's something crystallized enough to test
  with real humans. The override is the contract per IDEA-008's pattern; the recommendation is
  not deleted, just deferred. *Decided by Ajesh; recorded here because the recommendation lives
  here.*
  - **Re-open conditions:** the persona reactions surface a coherent product story (positioning
    + smallest-viable-audience clear) **OR** an alpha-user (someone other than Ajesh) starts
    using BOSS in earnest **OR** the eval-set discipline catches a class of bug only real-founder
    feedback could surface.

## Next pass

Re-convene the board after items 1, 3, 4, 5 above (item 2 overridden, see above). The persona
reactions (v0.19) will reorder everything below them.
