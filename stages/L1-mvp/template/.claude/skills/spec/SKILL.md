---
name: spec
description: Promote an idea into a buildable spec — IDEA-NNN becomes FEAT-NNN with a goal, acceptance criteria, and a smoke check. The point at which "we should build this" turns into "here's how we'll know it's done." Usage - /spec [IDEA-NNN]  (or describe the feature inline)
---

# /spec — promote an idea into a buildable feature

In Quickstart, ideas live in `docs/ideas/IDEA-NNN.md` as living capture docs. In MVP, when one is ready
to *actually be built*, `/spec` lifts it into a **FEAT** — same number space, but now with a goal you
can measure, criteria you can check, and a smoke that proves it landed. The IDEA stays; the FEAT is
the build contract.

## When to run

- The idea has been captured (Quickstart) and ideally pressure-tested in `/canvas` — at minimum the
  riskiest assumption is named.
- You're ready to write code against it. If you're still figuring out *whether* to build, go back to
  `/triage` or `/canvas`; don't spec a maybe.

## Moment #4 — restraint check (v0.21.0+)

Before any FEAT spec is created, check `docs/loops/spec-loop.md` (which declares spec-loop's entry
predicate: canvas-loop must be closed for the active idea). If canvas-loop is NOT closed for the idea
being specced — i.e., the idea has no canvas, or its canvas has only placeholder cells, or the
riskiest assumption is unfilled — **surface BOSS's restraint nudge in your own voice**, cohort-aware
(read `.boss/config.json` `cohort` field; lean Fitzpatrick-plain):

> Frame: this is the cheapest place to catch the question AI made easy to skip — **not "is it built
> right?" but "is it worth building?"** (the bottleneck moved from *how* to build to *what* to build —
> Ng/Appleton, 2026). So don't surface a checklist gap; surface the substantive one: **who is this
> for, and what's the bet that could sink it?** Name it in one line, offer to back up to /canvas, hand
> the decision back. Never block. The founder can override (record in `docs/devlog.md` with IDEA-008's
> grammar: `- **OVERRIDE:** proceeded `spec-loop` without `canvas-loop` exit — rationale: <substantive
> reason>`).
>
> Respect the sketch: a throwaway prototype needs none of this — `/prototype` exists precisely to get
> the gist out of your head, build-first, no gate. This fires only when you're committing to build it
> **for real** (a FEAT you'll carry forward). Build-first is legitimate; building-for-keeps without
> naming who it's for is the drift this catches.

Then proceed with the spec if the founder confirms — overriding the conscience is a legitimate move;
*recording the override* is the contract.

## How to run it

1. Pick the source: `[IDEA-NNN]` if given, else the idea the user names, else the most active idea
   currently in `building` status.
2. Allocate the next free `FEAT-NNN` (parallel numbering to IDEA — same N if it's a clean promotion,
   otherwise next free integer; check `docs/ideas/INDEX.md` for existing FEATs).
3. Create `docs/ideas/FEAT-NNN-<slug>.md` from the template below.
4. Update the source IDEA's `status` to `building` and add a one-line pointer at the top:
   `> Building as [FEAT-NNN](FEAT-NNN-<slug>.md).`
5. Add a FEAT row to `docs/ideas/INDEX.md` so it shows alongside ideas.
   - `building_since:` anchors the board's time-in-build aging (`boss board` flags a FEAT that's sat
     in Building past ~3 weeks — the zombie-feature smell). It's **frontmatter-true, never guessed**:
     set it to today when the FEAT enters `building`, and refresh it if a paused FEAT is re-opened
     (so the age reflects *this* build run, not the original).
   - When status moves to `shipped`, **drop `building_since:` and stamp `shipped_on: <today>`.** The
     board archives a shipped FEAT older than ~30 days into the "shipped earlier" fold (a true date
     window, not just the recent-count cap), so the Shipped column shows what landed *lately* instead
     of every ship forever. Frontmatter-true: no `shipped_on:` → it falls back to the count cap.
   - `priority: high` is **optional** — add it only when a FEAT genuinely jumps the queue. The board
     floats it to the top of its column with a `⬆` marker and leads `boss board --next` with it. One
     level by design (no P0/P1/P2 ladder — that turns the board into a planning surface you tend
     instead of ship). The honest caveat the seasoned hand would add: *re-prioritizing isn't progress;
     finishing is.* Most FEATs need no priority field at all.
6. Hand off to `coder-generalist` (or the stack's coder, if specialized) with the FEAT as the brief.

## The FEAT template

```markdown
---
id: FEAT-NNN
type: feature
owner: pm
status: building
created: {{today}}
building_since: {{today}}
source: IDEA-NNN
---

# <Feature name — one plain line, present tense>

## Goal
_One sentence. The user-visible change. Not the implementation._

## Acceptance criteria
_Checkable. A reader who's never seen the code should be able to verify these._
- [ ] …
- [ ] …
- [ ] …

## Smoke check
_How `/smoke` proves this didn't break things. One or two commands, or one manual path._
- …

## Validated learning (v0.21.0+ — Ries discipline)
_If this FEAT works perfectly, **what do we learn**? Not "the feature works" — what does it teach
us about the bet that we didn't already know? If the answer is "the feature works" or "users like
it," **don't build this**. The MVP is the minimum experiment that produces validated learning, not
the minimum product to polish (Eric Ries, **The Lean Startup**). Smallest cut, highest leverage._
- **Learning hypothesis:** …
- **What result would change the plan:** …

## Evals (v0.21.0+ — for AI-mediated FEATs only)
_If this FEAT involves an LLM call in control flow, name the eval set this FEAT ships against. See
`/evals` skill + the conscience-evals pattern. Failure modes categorized (Husain discipline)._
- Eval set path: `docs/evals/FEAT-NNN.yml` _(or omit this section if no LLM in control flow)_

## Failure states (v0.26.0+ — for AI-mediated FEATs only)
_If this FEAT puts an LLM in the user-visible path, name which of the five failure states it
must handle (per `docs/ai-failure-states.md`). At minimum: which fallback handler is called for
each applicable state. See `/ai-failure-states` skill._
- **Garbage output:** <declared response in this FEAT — e.g., schema-validate; on fail call `handleGarbageResponse()`>
- **Refusal:** <e.g., detect refusal pattern; route to /support; never loop>
- **Hallucination:** <e.g., verify citations against database; if low confidence, surface "double-check" UI>
- **Timeout:** <e.g., 8s hard cap; on timeout return last-known-good with `handleTimeout()` annotation>
- **Cost spike:** <e.g., 4k input cap / 1k output cap; on cap return labeled-truncated result>

_Omit this section if no LLM in user-visible path. Acceptance criteria above should reference
at least one failure-state path (e.g., "refusal routes to /support, not the spinner")._

## Out of scope
_What this FEAT explicitly does NOT do. Future FEATs may; this one doesn't._
- …

## Notes
_Open questions, links to the idea/canvas, anything the builder needs._
- Source idea: [IDEA-NNN](IDEA-NNN-<slug>.md)
- Canvas (if any): [IDEA-NNN-canvas.md](IDEA-NNN-canvas.md)
```

## Rules

- One FEAT per concern. A feature that needs three smoke checks is probably two features.
- Acceptance criteria are testable statements, not vibes. "Feels fast" → "Initial page render < 1s on a cold reload."
- Out-of-scope is load-bearing. Naming what's *not* in this FEAT prevents the scope creep that kills MVPs.
- Spec a delegation, not just a feature (Ethan Mollick, 2026). A FEAT is a brief you hand to a coder
  (human or agent), so it should answer two things the acceptance criteria don't: **what will *you*
  verify** before it's done (not "tests pass" — the one or two things you'll click/read to trust it),
  and **what's out of the agent's authority** (decisions it must surface to you, not make — a schema
  change, a new dependency, anything irreversible). Don't write "know what good looks like" platitudes;
  write the checkable line.
- The spec is a contract with future-you, not paperwork. Keep it short enough that you'll actually re-read it mid-build.
- Don't spec a maybe. If the riskiest assumption is still wide open, you're not ready — go run an experiment instead.
