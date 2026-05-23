---
id: IDEA-008
type: idea
owner: pm
status: exploring
created: 2026-05-22
---

# Evidence-keyed loops + the remix model

> The next scaffolding primitive. Captured after Ajesh observed that **time is the wrong unit**
> (people belt out companies in weekends; "Week 1, Week 2" framing is dead) **and** that **each
> founder will remix methods — borrow from Ries here, Savoia there, invent their own there.**
> Those two observations resolve into one design.

## Current shape

### The diagnosis (why this is needed)

- **Time was the unit by accident** — pre-AI, it correlated with effort; effort correlated with
  output. AI broke the chain. Now wallclock has near-zero correlation with output. The unit is
  vestigial; the scaffolds built on it (sprints, weeks, quarterly planning) inherit the rot.
- **Effort isn't the right replacement either.** "How hard did you work" is the vanity metric of
  project planning (Ries's distinction, applied one level up). The only useful metric is
  *validated learning produced.* Output is the unit, not input.
- **The boomerang pattern Ajesh named is the real cost.** People skip discipline steps because
  they can move fast; then they double-back when something they skipped becomes load-bearing. The
  cost of that double-back compounds, *and is invisible to time-keyed scaffolding* — by wallclock,
  the founder "made progress." By learning, they didn't.
- **And each founder will remix.** Some will be Maurya-canvas-first; some will be Karpathy-tight-
  loop-first; some will invent something neither person taught. **BOSS prescribing one method is
  itself the Principle-2 trap.** What BOSS can prescribe is the *type system* for evidence —
  what counts as "I earned this" — not the curriculum.

These two facts (time-isn't-the-unit + founders-remix) point at the same primitive.

### The primitive — *loop*

A **loop** is the unit of scaffolded progress. It has exactly four fields:

| Field | Meaning |
|---|---|
| **Entry artifact** | The specific evidence that must exist *before* this loop opens. A sharp canvas cell. A deployed URL. A transcribed user call. An LLM call in the codebase. Concrete, namable, checkable. |
| **Purpose** | The *one learning* this loop is designed to produce. Not "build feature X" — *learn whether assumption Y is real.* |
| **Exit artifact** | The concrete output that proves the loop closed. A signup count from a fake door. 5 transcribed interviews + 3 synthesized patterns. An eval set with N labeled examples passing. A pivot/persevere verdict written in the canvas. |
| **Drift signal** | The condition the conscience watches for — *"this loop is being attempted without its entry artifact"* (skipped a step) **or** *"this loop has been open for too many sub-actions without progress on its exit artifact"* (loop is stalling). Both are forms of the same thing: the dependency graph being violated. |

Loops are:

- **Time-agnostic.** A loop can close in 20 minutes or 3 weeks. Both are fine; both are progress.
- **Partially-ordered, not sequential.** Loops form a *DAG* over their entry/exit artifacts —
  the dependency is *artifact*, not *order in time*. Many loops can be open simultaneously; some
  can be paused; one can be re-opened when new evidence forces it.
- **Re-entrant.** Closing a loop doesn't mean it's done forever — new evidence can re-open it.
  ("The pretotype said yes; the prototype said no — re-open the pretotype loop with a sharper
  test.")

### The remix model

BOSS ships a **library of named loops** — each attributed to its source practitioners, each with
the four fields filled in. The founder composes their own loop graph by:

1. **Picking which named loops to open** — they don't have to open all of them. Skipping is fine
   *as long as the next loop they open doesn't have a missed-artifact dependency.*
2. **Remixing a loop in place** — swap the practitioner whose discipline runs it. ("I want the
   eval loop, but I'm using Liu's structured-output rigor, not Husain's example-set rigor — I'll
   note that.") The loop's *type* (entry/exit) stays the same; the *practice* inside changes.
3. **Authoring their own loops.** A founder can define a new loop with the four fields and
   contribute it back (via `/boss-learn` UP into `library/practices/loops/`). Over time, the
   named-loop library grows from real practice.
4. **Overriding the conscience consciously.** When the conscience says "you're opening loop X
   without artifact Y" — the founder can override. The override is *captured* as part of the
   project's record. ("Skipped pretotype on 2026-05-29; rationale: prior similar product
   validated; check in if prototype hits resistance.") That capture *is* the remix evidence.

The principle: **BOSS makes deviation conscious, not impossible.** Override is always available;
it's always *recorded*. Over enough projects, the overrides themselves become signal — they tell
us which named loops are too rigid, which are universally skipped (suspicious), which the
specific founder always skips (their personal style).

### The conscience becomes generic

The big elegance: **moments #3 (capture) and #4 (restraint) stop being bespoke detectors.** They
collapse into one mechanism:

> *The conscience fires when an artifact dependency is violated in the live loop graph.*

- **"Captured a lot, validated nothing"** (moment #1) → you opened the canvas loop without its
  upstream artifact (a real captured idea past N notes); or you're attempting a build loop
  without canvas's exit artifact (the sharp riskiest assumption).
- **"Done!"** (moment #2) → an exit artifact just landed that closes a load-bearing loop. The
  conscience names what crossed.
- **"Reusable value at a breakpoint"** (moment #3) → during a loop, the founder produced an
  artifact that's broader than this loop's exit — a generalizable practice. The conscience
  notices and offers `/boss-learn` UP.
- **"Premature ceremony"** (moment #4) → the founder is opening a loop downstream of their
  current evidence. (Spec loop without canvas exit; eval loop without an LLM call existing.)

**One detector type, four (and counting) surface behaviours.** This is the bigger architecture
win than the cadence itself.

### How the tensions resolve

Ajesh named several tensions implicitly:

| Tension | How loops + remix resolve it |
|---|---|
| **Speed vs. discipline** (Group A vs. Group B in the v1 playbook) | Each loop is one practitioner's discipline; the founder opens loops at the speed they want. Speed is opening more loops in parallel + closing them tighter; discipline is closing them on real exit artifacts. Both are loop-graph properties. |
| **BOSS's opinions vs. founder's remix freedom** | BOSS *names* good (the loop library); the conscience *checks types* (artifact dependencies); the founder *chooses methods*. Method ≠ type. |
| **Named methods vs. invented methods** | The four-field primitive accepts both. Author your own loop; it composes with the rest. `/boss-learn` carries it UP if it's generalizable. |
| **One canonical loop set vs. many possible sets** | One *primitive* (the loop), many *instances* (named or invented). The graph for each project is the founder's. |
| **Discipline (do the upstream) vs. autonomy (skip if you must)** | The conscience surfaces the dependency; the founder decides. Every skip is recorded. Conscience makes the skip *conscious*; it never gates. |

### Worked example — the eval loop, fully designed

The eval loop is the next thing BOSS itself needs to build (per the advisory pass — the highest-
leverage gap is that the conscience has no evals). It's also a clean test case for the loop
primitive.

```
LOOP: eval-loop
  attributed-to: Hamel Husain (primary), Jason Liu (secondary — for structured outputs)
  also-relevant: Karpathy (think in distributions), Willison (evals as code, version them)

  ENTRY ARTIFACT:
    Any LLM-mediated control-flow point exists in the project.
    Concretely for BOSS: the conscience hook returns additionalContext to Claude
    (i.e., the project's behavior depends on a model output).
    Checkable by: `git grep` for hook returns, LLM API calls, prompt strings used in flow.

  PURPOSE:
    Produce a labeled "should fire / should NOT fire" example set so the LLM-mediated
    behavior can be measured, regressed, and iterated on with evidence, not vibes.

  EXIT ARTIFACT:
    docs/architecture/conscience-evals.md (or equivalent per project) containing:
      - ≥20 should-fire examples per moment, each with: project state, user input,
        expected detection signal, the *why*.
      - ≥20 should-NOT-fire examples per moment, *categorized by failure mode* —
        over-fires-on-fresh-project, fires-mid-other-work, repeats-itself, etc.
      - A runner that exercises the detector against this set and reports pass/fail
        per case (CI-runnable or local-runnable).
    + the hook refactored to ship structured `{moment, confidence, evidence, suppress_if}`
      instead of free-form `additionalContext` (Liu's discipline — schema, not prose).

  DRIFT SIGNAL (the conscience watches for):
    - **Skipped:** a new conscience moment (#3, #4) is being designed/built without
      this loop having closed for it. (You'd be shipping detection logic with no way
      to know if it's right — vibes-based AI in BOSS, the thing it's supposed to
      prevent in others.)
    - **Stalled:** loop is "open" but the example set hasn't grown in N sub-actions.
      Time-agnostic; counts work, not days.

  HOW TO REMIX:
    - Skip: legitimate if the LLM call is truly throwaway (one-off script). Override
      captured. For a load-bearing detector like the conscience: skipping it is the
      override, and it should be the kind of override that re-opens itself on the
      next bug report.
    - Swap discipline: instead of Husain's example-set-first, use Liu's
      programmatic-instruction-tuning-style (same prompt, eval-set, prompt-variants,
      measure deltas). Same loop type; different practice inside.
    - Author your own: e.g., a domain-expert-review loop where a real human (not the
      LLM) labels failures — useful when stakes are high (legal, medical, etc.).
      That's a different *named loop* with a similar exit shape.

  WHEN THIS LOOP RE-OPENS:
    - A new moment is added → re-open with that moment's labeled set
    - A real-user report says the detector fired wrongly → add the case + re-run
    - The model shifts (host upgrade, prompt change) → re-run the existing set
```

This is what one loop spec looks like. It's about a screenful of structured prose; it survives
remix; the conscience can check entry/exit/drift mechanically.

### What this changes for BOSS itself

1. **The v1 playbook is superseded as the prescribed cadence**, but its practitioner material is
   reusable — each section becomes a *practice* attached to one or more loops. Don't delete; mark
   `draft-pending-loops-spec` and treat as raw material.
2. **The eval loop spec above becomes the first real artifact** the loops primitive is tested on.
   If the primitive holds (entry/exit are unambiguous, drift is checkable, remix is possible
   without breaking the conscience), generalize. If not, refine before shipping more loops.
3. **The conscience refactor (structured output) is now inside a loop, not a free-floating
   capability.** It has an entry artifact (the LLM-mediated point), an exit artifact (the
   schemafied hook + the example set), and a drift signal. Means it's natively measurable.
4. **Moments #3 and #4 should not be built as bespoke detectors.** They should be built as
   *applications* of the generic artifact-dependency-violation detector. One mechanism, many
   surface behaviours — far more leverage.
5. **`/spec` (already shipped in MVP) gets a Loop-graph field** — every FEAT names which loop it
   advances, what entry artifact it requires, what exit artifact it produces. Pulls the loops
   primitive into the existing scaffold without a new skill.

### What this changes for projects BOSS scaffolds

- **Modes (Quickstart → MVP → V1 → Scale) stay** — they're the macro scaffold, evidence-keyed
  already. Loops are the micro scaffold *inside* a mode.
- **Each mode ships a default loop library** (e.g., Quickstart's loops: capture-loop, canvas-loop;
  MVP's loops: pretotype-loop, prototype-loop, eval-loop, conversation-loop, decision-loop). The
  founder remixes within the mode.
- **The mode's CLAUDE.md / working rules name the loop library + the conscience's role**
  ("BOSS catches missing artifacts; it doesn't pick your method"). The founder ships their own
  loop graph in `docs/loops/` (or similar) — a project-level artifact that captures their remix.
- **Skills like `/triage`, `/canvas`, `/spec`, `/smoke`, `/log`, `/close` become loop operations**
  — they're how the founder *runs* a loop, not separate ceremonies.

## Capture log

- 2026-05-22 — Ajesh: "most people have stopped using time in building out an app. We need to find
  another way to quantify or qualify effort. In a day/hour/weekend/weeks people are belting out
  full new companies." Plus: "each person may wanna remix and create their own method." These
  resolve into one primitive: artifact-keyed loops that compose freely. The conscience becomes
  method-agnostic; it checks type dependencies, not curriculum compliance.

## Open questions

- **What's the smallest set of named loops at MVP?** Sketched here: pretotype, prototype, eval,
  conversation, decision. Probably right; needs the first real run to confirm.
- **Where does a project store its loop graph?** Candidates: `docs/loops/` (per-loop files +
  index), or extend `.boss/manifest.json` to track open/closed loops, or both (machine state +
  human-readable docs). Leaning: `.boss/loops.json` for machine state, `docs/loops/<name>.md` for
  human-readable per-loop rationale.
- **How does the conscience implement artifact-dependency checking generically?** Today's
  conscience hook is hand-coded for moment #1. The generic version reads the loops, their
  declared entry/exit/drift, and the project state — that's a real implementation question worth
  scoping.
- **What's the override capture format?** When a founder skips a loop, where does the record
  live? Could be the devlog (`/log`), could be a dedicated `docs/overrides.md`. Leaning: devlog,
  with a structured tag.
- **Does this idea earn promotion to FEAT before the eval loop ships?** I.e., do we spec it as a
  buildable feature now, or do we run the eval loop as a *user* of the loop primitive (without
  formalizing the primitive in code yet) and decide after?
- **Does any of this conflict with existing IDEAs?** IDEA-004 (temple culture), IDEA-006 (host
  portability) — loops live underneath both; loops generalize the moment-detector across hosts.
  IDEA-005 (brownfield adoption) — loops let a brownfield project declare what artifacts it
  already has, skipping upstream loops legitimately.

## Canvas
_Covered by BOSS's overall canvas ([CANVAS.md](CANVAS.md))._
