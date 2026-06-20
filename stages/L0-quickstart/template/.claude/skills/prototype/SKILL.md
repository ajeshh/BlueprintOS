---
name: prototype
description: Get the idea out of your head and onto the screen — fast. Builds the smallest runnable, clickable version of an idea (the one core thing, fastest stack), then runs it so you can react to something tangible instead of arguing with a blank page. Build-first is a legitimate place to start a lean cycle; the conscience helps you fill the gaps AFTER you can see it, not before. Usage - /prototype [IDEA-NNN | rough idea text]
---

# /prototype — drop an idea, hit go, see something tangible

Sometimes the fastest way to think about an idea is to **see it**. Not a spec, not a canvas — a
small, real, clickable thing you can react to. `/prototype` builds that: the one core interaction of
your idea, in whatever stack gets to "click it" fastest, running in front of you in minutes.

This is **not vibe coding** (the conscience is still here) and it's **not gatekeeping** (you don't
have to canvas or validate first). Building first is a legitimate way to start a lean cycle — get the
idea out of your head, see the gist made tangible, then fill in the missing pieces once there's
something concrete to fill them *around*.

> **What this is:** a sketch to think with. **What it isn't:** your MVP. The difference matters and
> BOSS will name it once — but only after you've seen the thing, not before.

## When to run it

- You have an idea (a sentence, or an `IDEA-NNN` from `/triage`) and you want to *see* it, now.
- You're stuck arguing with yourself in the abstract — a tangible version would unstick you.
- You want to show someone the gist before you've written a word of spec.

## How to run it

**1. Get the idea.** If given an `IDEA-NNN`, read it (and its canvas if one exists). If given rough
text, use it. If neither, ask one line: *"What's the idea — one sentence is enough."* Don't
interrogate; you have enough to start with the gist.

**2. Find the ONE core thing.** Name the single interaction or artifact that *is* the idea — the
thing that, once someone can do/see it, the idea clicks. A meal-planner's core thing is "see a week
of meals generated from my constraints," not auth + settings + a profile page. Say what you picked,
in one line, so the founder can redirect: *"I'll make the part where you [X] — that's the heart of
it. Everything else can come after."*

**3. Pick the fastest runnable stack** (Principle #4 — stack-neutral, but here optimize for
*time-to-click*, not production-fitness):
- Simple UI / visual idea → a single self-contained HTML file (open it, done) or a minimal Vite +
  React app if it needs real interactivity.
- A tool / transform / data idea → the smallest script with a tiny UI or CLI.
- Pick the one that runs **fastest with fewest moving parts.** Note the choice + that it's a speed
  pick, not a commitment.
- If the project already chose a stack, respect it unless it'd slow the sketch down (say so if it
  would).

**4. Build the minimal slice.** Just the core thing, made real. Use mock/sample data freely — the
point is tangibility, not a backend. Apply the 5-token distinctiveness pass from `/design-tokens-init`
so it doesn't look like generic-AI-app default (warm a neutral, pick a radius, one owned accent) —
cheap, and it makes the sketch feel like *the idea*, not a template. Keep it in a clearly-a-sketch
place (`prototype/` if the repo has other code; root if it's empty).

**5. Run it.** Use `/run` (or just open the file). Get it on the screen. This is the moment — don't
bury it in narration.

**6. Then — and only then — the conscience rides along (gently).** Once it's running:
> *"There it is. Click around — does seeing it change what you thought the idea was? When you're
> ready to pressure-test whether it's worth building for real (who's it for, what's the riskiest
> assumption), `/canvas` is the next step. No rush — react first."*

That's the whole conscience touch here: *after* the tangible thing, pointed at filling the gaps, never
a gate before. Building first is the start of the loop, not a skip of it.

## Cohort-aware delivery

Read `cohort` from `.boss/config.json`:
- **`first-product` / `vibe-coder-newbie`** — lead with the magic moment; narrate in plain language
  ("I'm building the one core screen so you can see it — about a minute"); celebrate seeing it
  *running*, not the code.
- **`eng-builder` / `returning-founder`** — give stack control up front ("fastest path is a single
  Vite page — or name your stack"); skip the 101; leave the escape hatch obvious.
- **`vibe-virtuoso`** — they'll have opinions; offer the stack pick as a default to override, move fast.
- **`non-tech-founder`** — plain language, no jargon; the deliverable is "a thing you can click and
  show someone," not "a React app."
- **`domain-expert`** — one guardrail up front: *"this is a sketch to react to, not a
  clinical/regulated tool — don't put real [patient/client/financial] data in it."* Stakes are real;
  say so before, not after.

## Rules

- **Tangible beats complete.** A rough thing that runs beats a polished thing that doesn't. Ship the
  click, not the codebase.
- **Mock freely.** Sample data, hardcoded values, fake responses — all fine for a sketch. Don't build
  a backend to prove an idea.
- **Name it as a sketch — once.** "See-it, not sell-it." Say it one time (cohort-appropriate), then
  let them play. Don't moralize.
- **Conscience after, never before.** No "have you validated this?" gate in front of the build. The
  whole point is that building *is* a legitimate first move. The nudge toward `/canvas` comes once
  there's something to react to.
- **Don't quietly become the MVP.** When the sketch earns it, the real build path is
  `boss unlock mvp` → `/spec` → `/evals` — deliberate, gated, honest. Fast to *see*; deliberate to
  *build for real*. (The graduate ladder is what keeps a fast prototype from becoming a pseudo-app.)
