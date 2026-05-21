---
name: canvas
description: Pressure-test an idea as a humane business — Ajesh Shah's Humane Product Canvas as the spine, with Lean/Lenny-style commercial prompts folded into each cell. Filled just-in-time (a few cells at a time), it's the Quickstart→MVP graduation gate. Usage - /canvas [IDEA-NNN]
---

# /canvas — pressure-test the idea (humanely)

The just-in-time mentor that shows up once an idea has legs. Built on **the Humane Product Canvas
(by Ajesh Shah)** — values-first — with sharp Lean/Lenny business prompts folded into each cell so
the idea is both *humane* and *viable*.

It is **a snapshot, not a final blueprint.** Answers evolve as insight grows. Don't rush to fill
boxes — sit with the hard questions, sketch, talk, revisit. A half-filled canvas with a sharp
riskiest-assumption beats a fully-filled canvas of guesses.

When the canvas is reasonably filled and the **riskiest assumption has a validation plan**, the idea
is ready to `boss unlock mvp`.

## How to run it

1. Pick the idea: `[IDEA-NNN]` if given, else the most active idea in `docs/ideas/`.
2. Open (or create) `docs/ideas/IDEA-NNN-canvas.md` from the template below.
3. **Don't interrogate.** Ask about 2-4 cells at a time, starting with the most uncertain. Pull
   answers from the idea's "Current shape" + capture log; only ask what's missing.
4. Leave `_(not yet)_` on anything unknown — blanks are honest signal, not failure. Re-run anytime.
5. After each pass, name the **single riskiest assumption** and propose **one experiment this week**
   to test it. Write both in. That's the heartbeat of incubation.
6. When most cells are filled + the top risk has a validation plan, say so and offer `boss unlock mvp`.

## The canvas template

```markdown
---
id: IDEA-NNN-canvas
type: canvas
owner: pm
status: drafting
version: 0.1
updated: {{today}}
---

# Humane Product Canvas — <Idea title>

> A snapshot, not a blueprint. Revisit as insight grows.

## 1 · Human Foundation
_Who you serve, the tension they carry, the value you promise._

| Cell | Humane prompt | Sharpen with |
|---|---|---|
| **People** | Who are you designing for & what matters to them? | Who *exactly* has the painful problem? Be specific — not "everyone." |
| **Problem** | What real human tension are you solving? | Is it urgent, frequent, expensive, or emotionally painful? What do they use *today* instead (current alternatives)? |
| **Promises** | What emotional / relational value will it deliver? | The sharp promise: "We help X do Y without Z." |

## 2 · Product Expression
_How it shows up in a life, how people engage, how it sustains itself._

| Cell | Humane prompt | Sharpen with |
|---|---|---|
| **Story** | How does your product show up in someone's life? | What changed that makes this newly possible or urgent (insight / why now)? What's the smallest compelling workflow that solves it (solution)? |
| **Modes of Engagement** | How do people interact with your product in a humane way? | Does it respect time, attention, autonomy, data? Why are you the right team/product to win (unique advantage)? |
| **Business Model** | How will you sustain this without compromising your promise? | Who pays, how much, why is it worth it? How do the first 100 find you (acquisition)? What makes usage compound (growth loop)? |

## 3 · Stewardship
_Impact, risks, and the values that guide decisions._

| Cell | Humane prompt | Sharpen with |
|---|---|---|
| **Metrics** | What does meaningful success look like — for people and planet? | What numbers show real pull? Activation, retention, conversion, willingness to pay. |
| **Risks & Harms** | What could unintentionally go wrong? Who might be harmed or excluded? | Rank the assumptions that could kill the idea. Be honest about harm at scale. |
| **Principles** | What values will guide your decisions? | The non-negotiables you'll hold even when it's costly. |

## 🎯 Incubation heartbeat
- **Riskiest assumption:** _(the one most likely to be fatal and least proven)_
- **Experiment this week:** _(the smallest test to prove/disprove it)_
- **What result would change the plan?** _(decide before you run it)_
```

## Rules

- Humane-first. The Risks & Harms cell is not optional polish — surface real harm honestly, even when inconvenient.
- Just-in-time, not all-at-once. Blanks are data; never fabricate answers to look complete.
- Snapshot, not blueprint — expect it to change; bump `version` when it meaningfully shifts.
- The canvas informs the decision to build; it never replaces actually talking to the people you serve.
- Credit the framework: Humane Product Canvas by Ajesh Shah.
