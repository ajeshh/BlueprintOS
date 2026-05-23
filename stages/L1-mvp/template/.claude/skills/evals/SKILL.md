---
name: evals
description: Build and run the eval set for an AI-mediated FEAT — "is it correct?" paired with /smoke's "is it alive?" Husain's discipline applied to LLM-mediated control-flow in {{PROJECT_NAME}} — look at your data, build the eval set FIRST, categorize failures by mode, vibes-based eval is only a starting point. Usage - /evals [FEAT-NNN | --new <feat>]
---

# /evals — the AI-correctness gate

`/smoke` answers *is the app alive?* `/evals` answers *is the AI part correct?* In MVP mode, every
FEAT that puts an LLM in the control flow needs an eval set — even a tiny one. The discipline is
**Husain's**: *almost all AI quality problems are visible in the data, and almost no one looks.*
This skill is "look."

The MVP rule: **20 examples beats 0.** Even an unsophisticated eval set caught vibes earlier than
no eval set ever could. Categorize failures so the next iteration can target a category, not just
"make it better."

## When to run it

- A FEAT-NNN involves an LLM call whose output drives behaviour (not just user-facing prose).
- *Before* you ship the FEAT — eval-set-FIRST, not retrofitted.
- After a real-user bug report — add the failing case to the eval set, then fix.
- Regression — after any model swap, prompt change, or upstream library bump, re-run the set.

## How to run it

1. **Pick the FEAT.** Read the FEAT spec's *Evals* section. If it doesn't exist (FEAT pre-dates the
   v0.21.0 spec template), add it: declare an `Eval set path: docs/evals/FEAT-NNN.yml`.
2. **Create or open** `docs/evals/FEAT-NNN.yml`. Format: a YAML list of cases, each with
   `id / category / scenario / inputs / expected / why`. Categorize `should-pass` and
   `should-fail` (the latter sub-categorized by failure mode per Husain's discipline —
   `over-applies / hallucinates / refuses-wrongly / format-violation / etc.`).
3. **Run them.** Either:
   - A runner script (Node, ~150 lines like BOSS's own `docs/architecture/conscience-evals/
     runner.js`) — preferred, machine-runnable, becomes a CI gate
   - Or manually walk each case, recording pass/fail and what failed
4. **Report.** One line per case: `✓ <id>  <scenario>` or `✗ <id>  → <reason>`. Summary table by
   failure category — the categorized failure count IS the design signal for next iteration.
5. **Add the failure** when something breaks live. Each real-world bug becomes a case in the set;
   the set grows from real friction.

## Eval set format (recommended)

```yaml
- id: feat-007-pass-001
  category: should-pass
  scenario: <one-line natural description>
  inputs:
    <synthetic state / prompt / context>
  expected:
    <pass/fail criteria — what "right" looks like>
  why: <why this case matters>

- id: feat-007-fail-001
  category: should-fail
  failure_mode: hallucinates  # | over-applies | refuses-wrongly | format-violation | …
  scenario: <one-line>
  inputs: …
  expected:
    fires: true  # the detector / guard / refusal catches this
  why: <what could go wrong if missed>
```

Same shape as BOSS's own conscience-evals — copy that runner.js as a starting point if Node fits
your stack.

## Structured outputs (Liu discipline) — strongly recommended

If the LLM call's output drives subsequent code (control flow, data routing, decisions), **schema
the output**. Pydantic-first / Zod-first / any-structured-output. Free-form prose is for human
eyeballs only. The eval set then asserts on the *schema*, not on prose interpretation. This single
practice eliminates ~80% of LLM-pipeline brittleness (Jason Liu).

## Rules

- **Eval-set first.** Write 20+ cases before the LLM call ships, not retrofitted after. If you
  don't know what 20 cases are, you don't yet know what the FEAT does.
- **Categorize failures.** Failure-mode categorization is more valuable than success count.
  Husain: *failure modes are more valuable than success modes — categorize systematically.*
- **Vibes are a starting point.** First 5 iterations on vibes is fine; the 6th wants rubrics.
- **Look at your data.** When a case fails, *open the actual model output side-by-side with the
  prompt*. The fault is almost always visible.
- **LLM-as-judge is fine but only with examples of the judge being wrong.** Without that,
  you've added a confidently-wrong layer on top of a confidently-wrong layer.
- **Domain expertise beats LLM eval** when stakes are real (medical, legal, financial). A
  doctor reviewing 30 outputs beats GPT reviewing 3,000 in the same domain.
- **Eval is not CI — yet.** Run on commit when the cost is small. Run on every commit when the
  cost is justified. Decide deliberately.
