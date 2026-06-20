---
id: PRACTICE-ai-ux-patterns
type: practice
owner: designer
status: active
host: stack-neutral
provenance: distilled from the 2026-06-20 AI-UX scan (Shape of AI, Microsoft HAX, Google PAIR, IBM Carbon, LangChain HITL, NN/g 2026, Apple HIG GenAI) — BOSS v0.49.0, IDEA-029
---

# Practice — AI-native interface patterns (2026)

> **Where this sits.** [`design-system.md`](design-system.md) + the tokens discipline own how AI-built
> UI *looks*; this owns how an AI feature *behaves toward the person* — when it speaks, how it shows
> confidence, how it asks permission, how it recovers from being wrong. The 2024–25 rules (options-
> not-truth, undo/edit/regenerate, visible confidence, failure states) still hold; 2026 adds the
> patterns below for *plural, background, risk-tiered* agent work.

## 1. "Why this" — rationale grounded in the user's own inputs

When the AI makes a consequential choice, say *why*, in one line, **traceable to something the user
said or did**: *"Steering you to Quickstart because you said it's day one"* — not *"Quickstart is
best."* This is the cheapest trust surface and it doubles as teaching. Bound it (Google PAIR
*Partial Explanations*): explain when stakes are high or the result is surprising, not on every step.

## 2. Confidence is a register, not a number

Match how you express confidence to how reliable you actually are (HAX G2). Soft uncertainty → a
hedge phrase. Real precision → a number. Low confidence → *show more options* (the option count itself
is the signal — Google PAIR N-best). Don't paint one flat "confidence" everywhere.

## 3. Three interrupt registers: Notify / Question / Review

- **Notify** — FYI, no action needed (a fact surfaced; keep moving).
- **Question** — ask **one** sharp clarifying question instead of guessing.
- **Review** — propose a change and wait for a decision.

Name which one you're in. Most tools collapse everything into Review (approval fatigue) or Notify
(noise). (LangChain ambient agents.)

## 4. Risk-tier the gate; offer four decision verbs

Don't gate uniformly — gate by **loss type** (money / security-data / lost-work / irreversibility).
Low-stakes steps (a draft, a search, writing a new file) flow through; high-stakes get a stop. And
when you do stop, offer the full vocabulary, not just yes/no:

- **approve** · **edit-before-execute** · **reject-with-feedback** · **respond**

For a tool that writes files and configs, **edit-before-execute is the highest-value verb** — a
first-time founder wants to tweak, not just veto. (LangChain HITL; Shape of AI *Verification*.)

## 5. Progressive disclosure of the work

Show the verdict / result first; let the person expand to the reasoning, the plan, the tool calls
("Stream of Thought / Footprints" — Shape of AI). Default collapsed. A reviewable trail of *what the
agent changed* is part of this — don't act on someone's repo with no footprints.

## 6. Trust repair after a miss

When the AI gets it wrong, run a deliberate repair: **own it specifically** ("I got X wrong — here's
what I'll do differently"), and recover **asymmetrically** — trust breaks fast and rebuilds slow, so
reduce autonomy / ask *more* for a while after a miss. A user who's been burned wants more
confirmation, not less, regardless of project stage. (NN/g 2026; trust-calibration.)

## 7. Discernment — knowing when NOT to speak

The 2026 macro shift (NN/g) is automation → **discernment**: the best AI recedes into the background;
human direction, curation, and verification stay essential. *Staying quiet at the right moment is a
feature*, not the absence of one. This is the interaction-level statement of BOSS's whole conscience-
JIT ethos — name it so it's designed, not accidental.

## 8. Degraded-state honesty

When running degraded — model uncertain, on a fallback path, low confidence — *say so*, so the person
recalibrates. Treat "I don't know" as a first-class, well-worded output, not a failure to hide.

## Canonical references (pin the designer here; don't reinvent)

- **Shape of AI** (shapeof.ai) — the working pattern vocabulary; the "Governors" category maps ~1:1
  onto BOSS's conscience moments. Primary.
- **Microsoft HAX** — 18 evidence-based guidelines (G1/G2/G11/G15/G17 = when to speak vs. stay quiet).
- **IBM Carbon for AI** — disclosure primitives ("AI label" + explainability popover).
- **Google PAIR** — calibrated trust / explainability (frozen ~2023 but still the best on this).
- **Apple HIG Generative AI**, **OpenAI Apps SDK UX**, **Anthropic "building effective agents"** —
  vendor-current; show-the-plan / checkpoint-before-irreversible / refine-and-feedback.
- Community catalogs (e.g. agentic-design.ai) — route through `/vet` before adopting, not `/boss-learn`.

## Altitude / anti-rot

These are **runtime heuristics the conscience + designer apply**, not a static checklist to freeze
into one skill (the RVW-001 anti-pattern). Refresh them on the model/host curve (`IDEA-014`). On a
Quickstart, most of this is silent default; it surfaces as the project earns interaction complexity
(Principle #2). See `IDEA-029` (interaction layer) + `IDEA-010` (style/tokens layer).
