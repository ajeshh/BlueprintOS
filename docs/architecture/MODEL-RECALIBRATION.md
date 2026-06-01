---
id: MODEL-RECALIBRATION
type: practice
owner: pm
status: active
created: 2026-06-01
informed_by: [IDEA-014, IDEA-006, positioning-pass-001 §9a]
---

# Model recalibration — the standing checklist

> BOSS rides the model curve; it doesn't race it ([positioning §9a]). That's only true if
> recalibrating is a **discipline**, not a one-off scramble. This is the lightweight version
> (IDEA-014's earned slice). The full machinery — a per-host model-capability profile + a
> `/recalibrate` skill — is deferred until a second model/host actually exists (PRINCIPLE #2).

Every BOSS capability that delegates to a model encodes an implicit assumption about what the model
can do. When the model changes, those assumptions are stale. Two events fire this checklist.

## Trigger A — a new model from the same vendor ships (leverage more)

A stronger Opus/Sonnet means *what was too expensive or unreliable to ask the model may now be
cheap and reliable.* Walk the checklist:

1. **Re-grade the judgment evals on the new model.**
   `ANTHROPIC_API_KEY=… BOSS_REGRADE_MODEL=<new-model> npm run regrade`
   Then `npm run eval:judgment`. The voice-hash tripwire + transcript diff show whether any
   `drift` / `caution` call *changed* under the new model. Label mismatches mean: the model drifted,
   or the label was wrong — investigate, don't auto-accept.
2. **Revisit each model-delegating boundary, asking "can this move UP now?"** A predicate-only
   moment (`restraint`, `coherence`, `cost`, `failure-mode`, `capture`, `cost-stale`) that was too
   ambiguous for a predicate might now warrant a judgment layer (the v0.33 `caution` pattern).
   Candidate? → new judgment set + `replay` coverage *before* shipping (eval.md's rule).
3. **Read the frequency ledger** (`boss conscience activity`). Are judge-moments cheap/rare enough
   to add more, or over-firing? The induced-read cost only matters at frequency.
4. **Check for unused context headroom.** Bigger context windows unlock deeper reads (e.g. a
   periodic *whole-project* drift pass vs. drift's bounded ~5-entry read). Earned only if the ledger
   says the frequency can carry it.

## Trigger B — BOSS expands to a host running a different model (degrade gracefully)

A cheaper/weaker or non-Claude host (IDEA-006 territory) means *judge-moments may need to fall back
to predicate-only.* When that host arrives:

1. **Declare the host's model tier** (the deferred capability-profile — build it then, not now).
2. **For each judge-moment, define the fallback:** capable host → full judgment; weak host →
   predicate gate only (it still fires the cheap nudge, just without the bounded-read judgment).
3. **Re-grade against that host's model** (Trigger A step 1, pointed at the host model) so the
   degraded behavior is *measured*, not assumed.

## The engine

`docs/architecture/conscience-evals/judgment/regrade.js` is the recalibration engine: it runs the
live model against the labeled sets and writes transcripts stamped with the current voice-hash;
`replay.js` grades them every commit and trips STALE when the frame or model changes. Re-running
regrade on a new model **is** recalibration. See `judgment/README.md`.

## Teach it, don't just practice it (the UP candidate)

Founders' AI-native apps face the identical problem — model migration is a recurring founder task
(`/claude-api` already does Claude-version migration). This checklist is a strong PRINCIPLE-#1 **UP**
candidate: a superset practice every AI-native project inherits (recalibrate *your* evals / prompts /
cost / failure-states when *you* switch models). Promote when a second model/host has earned the
generalization.

## Deferred (loudly)

- **The model-capability profile + `/recalibrate` skill** — until a second model/host exists. A
  `/recalibrate` with nothing to recalibrate *to* is the premature ceremony v0.34 dodged.
- **Token/dollar accounting of recalibration** — host-contract territory ([[IDEA-006]]); the honest
  token count comes from the host, not BOSS.
