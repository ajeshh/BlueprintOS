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

## How to run it

1. Pick the source: `[IDEA-NNN]` if given, else the idea the user names, else the most active idea
   currently in `building` status.
2. Allocate the next free `FEAT-NNN` (parallel numbering to IDEA — same N if it's a clean promotion,
   otherwise next free integer; check `docs/ideas/INDEX.md` for existing FEATs).
3. Create `docs/ideas/FEAT-NNN-<slug>.md` from the template below.
4. Update the source IDEA's `status` to `building` and add a one-line pointer at the top:
   `> Building as [FEAT-NNN](FEAT-NNN-<slug>.md).`
5. Add a FEAT row to `docs/ideas/INDEX.md` so it shows alongside ideas.
6. Hand off to `coder-generalist` (or the stack's coder, if specialized) with the FEAT as the brief.

## The FEAT template

```markdown
---
id: FEAT-NNN
type: feature
owner: pm
status: building
created: {{today}}
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
- The spec is a contract with future-you, not paperwork. Keep it short enough that you'll actually re-read it mid-build.
- Don't spec a maybe. If the riskiest assumption is still wide open, you're not ready — go run an experiment instead.
