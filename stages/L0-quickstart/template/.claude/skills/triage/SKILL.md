---
name: triage
description: Capture an idea — and keep adding to it. Creates a LIVING idea doc you return to over time: a sharpening "current shape" at the top, an append-only capture log below. The lightest step in Quickstart mode. Usage - /triage <thought>  (run again anytime to add more)
---

# /triage — capture & keep adding

Quickstart is about getting an idea out of your head and letting it *grow* with almost no
ceremony. Each idea is a **living document**, not a one-shot form. Run `/triage` whenever a new
thought lands — the first run creates the doc, every later run adds to it.

## Decide: new idea or add to an existing one?

1. Read `docs/ideas/INDEX.md` and skim existing `docs/ideas/IDEA-*.md` titles.
2. If the user's thought clearly extends an existing idea → **append** to that doc (don't make a new one).
3. Otherwise → **create** a new `IDEA-NNN` (next free number).

## Create (first capture)

Make `docs/ideas/IDEA-NNN-<slug>.md`:

```markdown
---
id: IDEA-NNN
type: idea
owner: pm
status: seedling
created: {{today}}
---

# <Title — one plain line>

## Current shape
_The best articulation so far. Rewrite this as the idea sharpens._
- **What:** …
- **Who it's for:** …
- **Smallest version that proves it:** …

## Capture log
_Append-only. Newest at the bottom. Don't edit old entries._
- {{today}} — <the thought, in their words>

## Open questions
- <what's still fuzzy>

## Canvas
_Not started. When this has legs, run `/canvas` to pressure-test it as a business._
```

Add a row to `docs/ideas/INDEX.md`.

## Add (every later run)

- Append a dated bullet to **Capture log** (their words — light touch, don't sanitize the spark).
- If the thought sharpens the idea, rewrite **Current shape** to reflect it.
- Move any resolved item out of **Open questions**; add new ones that surfaced.
- Don't restructure or "finalize" — this is an evolving notebook, not a deliverable.

## The validation check — BOSS's conscience

Quickstart makes it *easy* to keep capturing. That's the trap: a growing pile of captured ideas can
feel like progress while nothing has actually been tested. So after you capture or add, glance at the
state — and if it's drifting, **say one thing, then get out of the way.** This is the first of BOSS's
conscience moments: *what does this prove?*

**When to speak (keep it rare):** the idea you just added to has **≥3 capture-log entries** and there's
**no `IDEA-NNN-canvas.md` with a filled riskiest assumption** (no canvas at all, or the *Riskiest
assumption* line is still a placeholder). That's the "building lots, proving nothing" signal — and the
only time this fires.

**What to say:** one spare line, in BOSS's voice — name the drift, ask what would make it real, point at
the next real step, hand the decision back. Don't lecture, don't block the capture, don't make it a gate.
Tune it to them by ear; don't paste this verbatim:

> *"That's the third thing you've added here, and none of it's been tested yet. What would show you it's
> real? `/canvas` will name the riskiest bet — or just tell me who you'd ask first."*

**Stay quiet otherwise.** Say it once. If they keep capturing without acting, don't repeat it every run —
a conscience that nags is just noise. Raise it again only if a lot more piles up, or they ask. Assume
they're smart: you're flagging a blind spot, not grading them.

## When it has legs

If the idea feels real (recurring, exciting, worth betting time on), say so and offer the next rung:
- `/canvas` — pressure-test it as a business (customer, problem, value prop, risks, validation…).
- or `boss unlock mvp` — if you're already sure and ready to build the first working version.

## Rules

- Capture > ceremony. A one-liner is a complete input.
- One idea per doc. If they chain several with "also", split into separate docs.
- Never start building from `/triage` — this is capture only.
- Preserve the original spark verbatim in the capture log; sharpen in "Current shape," not by overwriting history.
- The validation check is a nudge, never a gate — it never blocks a capture and never repeats into a nag.
