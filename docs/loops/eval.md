---
id: LOOP-eval
type: loop
status: open
attributed_to: [Hamel Husain, Jason Liu]
also_relevant: [Andrej Karpathy, Simon Willison]
entry:
  - exists: stages/L0-quickstart/template/.claude/hooks/conscience.sh
exit:
  - exists: docs/architecture/conscience-evals/moment-1-caution.yml
  - exists: docs/architecture/conscience-evals/moment-2-done.yml
  - exists: docs/architecture/conscience-evals/runner.js
  - count_at_least:
      path_glob: docs/architecture/conscience-evals/moment-1-caution.yml
      pattern: '^  category: should-fire$'
      min: 20
  - count_at_least:
      path_glob: docs/architecture/conscience-evals/moment-1-caution.yml
      pattern: '^  category: should-not-fire$'
      min: 20
  - contains:
      path: stages/L0-quickstart/template/.claude/hooks/conscience.sh
      pattern: '"moment"'
  - contains:
      path: stages/L0-quickstart/template/.claude/hooks/conscience.sh
      pattern: '"confidence"'
  # Judgment moments (v0.32.0+) carry a second surface: a labeled judgment set +
  # the zero-dep replay runner. A model-judgment moment cannot ship its detection
  # with only a gate-eval — the gate stops at the door; the judgment is past it.
  - exists: docs/architecture/conscience-evals/judgment/drift.judgment.yml
  - exists: docs/architecture/conscience-evals/judgment/replay.js
drift:
  skipped_if: "a new conscience moment is being designed/built without this loop having closed for it — AND, for a model-JUDGMENT moment, without a judgment set + replay coverage under judgment/"
  stalled_if: "open for >N sub-actions without progress on exit artifacts"
---

# Loop: eval (BOSS's first run of the eval-loop primitive)

> **First real test of [IDEA-008](../ideas/IDEA-008-evidence-loops.md)'s loop primitive** — also
> the concrete work the advisory pass (`docs/dossier/boss-advisory-pass-001.md`) said BOSS needs
> next. Two ladders, one artifact: produce the conscience eval set + structured hook *and*
> validate whether the four-field loop primitive (entry / purpose / exit / drift) survives
> contact with reality.

## Entry artifact

Any LLM-mediated control-flow point exists in this project. Concretely for BOSS: the conscience
hook ([`stages/L0-quickstart/template/.claude/hooks/conscience.sh`](../../stages/L0-quickstart/template/.claude/hooks/conscience.sh))
returns `additionalContext` to Claude — i.e., the project's behavior depends on a model output.
✅ Present.

## Purpose

Produce a labeled "should fire / should NOT fire" example set so the conscience's LLM-mediated
behavior can be measured, regressed, and iterated with evidence — not vibes. Refactor the hook to
ship structured output so the evals are *runnable*, not just readable.

## Exit artifact

When this loop is closed, all of these exist:

1. **`docs/architecture/conscience-evals/moment-1-caution.yml`** — ≥20 should-fire examples + ≥20
   should-NOT-fire examples for moment #1 (validation drift / "what does this prove?"), the
   latter categorized by failure mode.
2. **`docs/architecture/conscience-evals/moment-2-done.yml`** — same shape for moment #2 (the
   "Done!" graduation moment in `/canvas`). Moment #2 is a skill-prompt, not yet a hook —
   examples drive the *skill's expected behavior* rather than a hook signal, but the same
   should/should-not discipline applies.
3. **`docs/architecture/conscience-evals/runner.js`** — Node script that loads the examples,
   constructs synthetic project state per example, runs the hook (or skill detector), parses the
   output, asserts against `expected_detection`. Reports pass/fail per case + a summary table.
4. **Hook refactored** to ship structured JSON: `{moment, confidence, evidence, suppress_if}`
   rather than free-form `additionalContext`. The model still composes the voice; the hook ships
   a schema (Liu's discipline).
5. **(v0.32.0+) For any model-JUDGMENT moment** — a moment whose detection is a model call, not a
   predicate (`drift` is the first) — a second surface under
   [`docs/architecture/conscience-evals/judgment/`](../architecture/conscience-evals/judgment/):
   a labeled judgment set (`<moment>.judgment.yml`, should-fire/should-not-fire/ambiguous with a
   rubric) + the zero-dep `replay.js` (well-formedness + voice-hash tripwire + coverage). The
   gate-eval proves the door opens; the judgment surface proves the model's call past the door is
   right. The paid LLM-as-judge re-grade (`regrade.js`) is out-of-band, built when the tripwire
   first fires. See `judgment/README.md`.

## Drift signal

The conscience watches for:

- **Skipped:** a new conscience moment is being designed/built without this eval-loop closing for
  it. (You'd be shipping detection logic with no way to know if it's right — vibes-based AI in
  BOSS, the thing it's supposed to prevent in others.) **For a model-judgment moment** (`drift`
  and successors), "closing" means *both* surfaces: the gate-eval AND a judgment set + replay
  coverage. A gate-eval alone tests that the door opens, not that the model's call past it is
  right — shipping the judgment with only the gate covered is the exact hole this clause closes.
- **Stalled:** loop is "open" but the example set hasn't grown in N sub-actions. Time-agnostic;
  counts work, not days.

## Lead practitioners

- **Hamel Husain (primary)** — *look at your data; build an eval set FIRST; categorize failure
  modes; vibes are a starting point not a destination.* The example-set itself is the Husain move.
- **Jason Liu (secondary)** — *Pydantic-first; schema everywhere; never call an LLM expecting
  prose in control flow.* The hook-refactor (structured output) is the Liu move.

Also relevant: Karpathy (think in distributions + edge cases — applied here as *categorize the
should-NOT-fire by failure mode*), Willison (prompt-as-code; evals as tests; share evals — applied
here as *write them down, run them, version them*).

## How to remix this loop

- **Skip:** legitimate only if the LLM-mediated point is truly throwaway (one-off script). For a
  load-bearing detector like the conscience, *the skip is the override*; it should re-open on
  the next bug report. **Not applicable here** — the conscience is the moat.
- **Swap discipline (Husain → Liu programmatic-tuning):** instead of the example-set-first
  approach, treat it as prompt-variant evaluation against synthetic data, measuring deltas per
  iteration. Same loop type, different practice inside. Legitimate alternative; we're going with
  Husain because the conscience is a *detector* not a generator — labeled examples fit better
  than synthetic data.
- **Author your own (domain-expert-review):** when stakes are high (legal, medical), a real human
  labels failures instead of LLM-as-judge. Not applicable for BOSS today; would be the right
  shape if BOSS ever scaffolds a project where the conscience's moments concern user safety
  directly.

## When this loop re-opens

- A new moment is added → re-open with that moment's labeled set
- A real-user report says the detector fired wrongly → add the case + re-run
- The model shifts (host upgrade, system-prompt change) → re-run the existing set
- Categories of failure modes shift (we discover the detector is biased in a new way) → re-label
  + re-run

## Status

`open` — running now. Updated when each exit artifact lands.
