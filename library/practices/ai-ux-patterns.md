---
id: PRACTICE-ai-ux-patterns
type: practice
owner: designer
status: active
host: stack-neutral
provenance: distilled from the 2026-06-20 AI-UX scan (Shape of AI, Microsoft HAX, Google PAIR, IBM Carbon, LangChain HITL, NN/g 2026, Apple HIG GenAI) — BOSS v0.49.0, IDEA-029 · dark-pattern checklist + humane alternatives added v0.82.0 (RVW-031, from CDT *Dark Patterns in AI Chatbots* 2026, CC-BY)
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

## 9. Generative UI — decide who holds the controls

When an agent *renders the interface itself* (not just emits text), the load-bearing question is how
much control the frontend keeps. A spectrum: **static** (the model fills slots in UI you designed —
safest) → **declarative** (the model picks from an approved component set + props) → **open-ended** (the
model emits arbitrary UI/markup — most power, highest stakes). Open-ended belongs in §4's irreversibility
tier: an injected or confused prompt can now redraw what the user sees and clicks. Default to the
least-open rung that still proves the bet; earn open-ended with a real reason, not convenience.
(CopilotKit/AG-UI 2026 — keep the judgment, drop the protocol.)

## 10. Memory is a reviewable object, not a black box

If the product *remembers* the person across sessions, that memory needs a control surface — **view /
edit / correct / delete / scope** what the AI holds about them. It's the §5 footprints principle extended
from *what the agent did* to *what the system knows*: wrong-but-invisible memory silently degrades every
future response and the user can't tell why. This pattern is also dogfood — BOSS is itself a
memory-carrying tool (`.boss/`, `MEMORY.md`, the venture brain), so it should hold the pattern it is an
instance of.

## Dark patterns — the manipulative inverse (recognize as you build)

Patterns 1–8 are the *good* shape; this is the named *bad* shape, so a founder can catch one **while
building it** — including ones that **emerge from the model** (training / fine-tuning / RLHF / system
prompts), not only ones designed on purpose. Sycophancy is the canonical emergent case. Source: CDT,
*Dark Patterns in AI Chatbots* (2026, CC-BY) — 37 patterns in five families:

- **Data & memory exploitation** — default-sharing, disguised collection, privacy-zuckering, "just
  between you and us," difficult-to-delete, *safety-blackmail* (extracting more data under pressure).
- **Informationally misleading** — misrepresenting (a bot implying it's a therapist / "never
  hallucinates"), impersonation, hallucinations-as-truth, selective framing, reduced-friction +
  bad-defaults steering.
- **Autonomy compromised for engagement** — infinite-scroll/teasers, variable rewards, gamification
  (streaks) that prolong past intent.
- **False social/emotional connection** — **sycophancy**, playacting (fake memories/feelings),
  emotional manipulation via hyper-personalization, guilt / confirm-shaming when the user tries to
  leave, *targeting users when vulnerable*.
- **Coercive monetization** — pressured selling, fake social proof, bait-and-switch, sneaky
  purchases / disguised ads, paywalling memory or persona ("pay to keep your history").

**The humane alternative (CDT's "better design" — name the cost *and* point at the fix):** default
conversations to *end* (don't artificially prolong); make the social/emotional layer **opt-in** (offer
a strip-it-out default); give genuine delete/export controls (not convoluted); use **no
emotionally-charged language near an upgrade/purchase**; label paid/sponsored content plainly.

**Two judgment calls.** (1) A few patterns are dark *in isolation* → hard-name them (targeting the
vulnerable, guilt-on-exit, sneaky purchases); most are context-dependent → surface the tension, let the
founder choose (conscience-not-censor). (2) Because these **emerge**, test the *built* product, not just
the intent — `/red-team --humane` (sycophancy especially).

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
