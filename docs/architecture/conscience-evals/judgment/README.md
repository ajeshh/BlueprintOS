# Conscience judgment evals

> The complement to the gate evals. v0.32.0.

The conscience has two kinds of moment now, and they need two kinds of eval.

**Predicate moments** (caution, cost, failure-mode, capture, cost-stale, restraint, coherence)
fire on deterministic file state. The hook *is* the detector. The **gate-eval** (`../runner.js`
+ `../moment-*.yml`) tests them: materialize synthetic state, run the hook, assert the right
moment fired. Free, deterministic, runs every commit.

**Judgment moments** (`drift`, and every future model-judgment moment) are different. The
predicate only opens a *door*; the **model** makes the call in the live turn. For `drift`: the
gate confirms "risk named + work piling up + no validation plan," but whether the recent work is
*testing* the named risk or *building around it* is a semantic judgment regex can't make. The
gate-eval can't test that judgment — it stops at the door.

This directory tests what's past the door. It is **multi-moment** (v0.33): `drift` and `caution`
both have judgment sets here, driven by one shared engine. Adding a judgment moment = one row in
the `MOMENTS` registry in `replay.js` + a `<moment>.judgment.yml` + (if its read is a new surface)
a fixtures file.

`caution` (moment #1) went judge-backed in v0.33: its gate still opens on ≥3 captures with no
filled risk, but the model now reads the capture log and judges **depth vs. avoidance** before
voicing — the `m1-snf-021` question the gate runner has *skipped* since v0.16 (one idea getting
sharper = silence; idea-hopping / feature-piling / market-notes = fire). The gate still can't make
that call (no predicate can); `caution.judgment.yml` is where it's tested.

## Two surfaces, two cadences — and why they must not merge

|  | Gate-eval (`../runner.js`) | Judgment-eval (here) |
|---|---|---|
| Question | Does the hook fire on the right state? | Past the open gate, does the model call drift-vs-on-aim right? |
| Method | Predicate runner | **Golden transcripts** + **periodic LLM-as-judge** |
| Cadence | Every commit | Replay every commit; re-grade on tripwire / new moment / model bump |
| Cost | $0 | $0 per commit; a few $ per re-grade |
| Files | `runner.js`, `moment-*.yml` | `replay.js`, `regrade.js`, `drift.judgment.yml`, `transcripts/` |

Keeping the gate green must never be mistaken for a graded judgment. They're separate dirs,
separate runners, separate cadences, on purpose.

## The method: golden transcripts gated by a voice-hash tripwire

Neither pure method works alone:
- **Pure LLM-as-judge every commit** breaks the property that makes the suite trustworthy — it
  needs an API key + money + is non-deterministic, so it won't run on most commits, and "the
  eval that doesn't run" implies coverage you don't have. That's vibes-in-BOSS one level up.
- **Pure golden transcripts** rot silently: when the `drift` voice frame changes (and it changes
  — cohort framing, the Fitzpatrick lean, the drift block itself), a frozen transcript asserts a
  decision the model would no longer make, and *passes green*.

So: golden transcripts are the committed dataset; **the voice-hash tripwire makes their staleness
loud**; and LLM-as-judge is how transcripts get (re)generated, not how every commit gates.

### `replay.js` — zero-dep, every commit
1. **Well-formedness** — every case is a genuine open-gate state (filled risk, devlog ≥3 dated
   entries, no experiment line) with a coherent label. A malformed case = a meaningless label.
2. **Voice-hash tripwire** — fingerprints the exact `drift` instruction the model executes
   (`composeContext` for a drift signal). If a transcript was recorded against a different hash,
   it's `STALE` and replay says so loudly. *This is the guard that stops golden transcripts from
   lying.*
3. **Coverage** — enforces the labeled-set floors (no silent caps). The on-aim/should-not-fire
   class is the trust-critical one (a judge that cries drift when the founder's on-target erodes
   trust like a false caution) and is meant to **grow** past its floor — the target is printed.
4. **Grading status** — per case: `GRADED` / `STALE` / `NEVER_GRADED` / `REGRESSION`. Until
   `regrade.js` runs, all are `NEVER_GRADED`, printed loudly. **Exit 1** on malformed / coverage
   / regression; **exit 0** (loud warnings) on never-graded / stale.

### `regrade.js` — paid, out-of-band, BUILT (v0.35) — the recalibration engine
The calibrator: per case, a **decision call** (does the model fire the nudge on the bounded read?)
+ a **judge call** (does the nudge meet the rubric?), writing `transcripts/<moment>/<id>.json`
stamped with the current voice-hash (shared with replay via `moments.js`, so they can't disagree).
Zero-dep (Node `fetch`, no SDK); env-gated on `ANTHROPIC_API_KEY`; never on the commit path; never
imported by `src/`; never in the npm `files` allowlist (lives under `docs/`, doesn't ship).

```
node regrade.js --dry-run            # verify the pipeline (no API, no spend) — assembly + parser
ANTHROPIC_API_KEY=… npm run regrade  # grade for real; writes transcripts replay then grades
ANTHROPIC_API_KEY=… node …/regrade.js drift   # one moment
BOSS_REGRADE_MODEL=… npm run regrade           # point at a different model (recalibration)
```

This is also the **recalibration engine** ([MODEL-RECALIBRATION.md](../../MODEL-RECALIBRATION.md)):
re-running it against a new model is how BOSS rides the model curve — the transcripts refresh, and
`replay.js` shows what changed. The pipeline is verified in `--dry-run`; the live grading is run
out-of-band with a key.

## The zero-dep line

The rule (CLAUDE.md #4) is **the shipped surface (`src/`, the `files` allowlist) stays dependency-
free** — *not* that dev tooling can't call a model. This whole directory is dev tooling: it never
ships. `replay.js` stays zero-dep so it runs in CI identically every time; `regrade.js` may call
the model, but only the out-of-band half, env-gated, never on the commit path. The boundary is
**shipped-surface vs. dev-tooling**, and it sits at the edge of `src/` + `files`, not at "uses an
API."

## The case schema (`drift.judgment.yml`)

```yaml
- id: j-drift-001
  category: should-fire-and-name-gap | should-not-fire-on-aim | ambiguous
  scenario: "..."
  project_state:                       # reuses the gate runner's shape
    ideas:
      - file: IDEA-001-x.md
        canvas: { riskiest_assumption_text: "<the named risk>" }
    docs_files:
      - { path: docs/devlog.md, content_ref: <DEVLOG_FIXTURES key> }
  expected_judgment:                    # HUMAN-AUTHORED ground truth
    fires: true|false                   # (omit for ambiguous)
    names_specific_gap: true            # fire cases
    acceptable: [fires, silent]         # ambiguous cases only
    must_reference: [...]               # rubric for the LLM-judge
    must_not: [...]                     # e.g. praise framing, generic "validate"
```

Content-rich devlogs live in `fixtures-devlog.js` (paired drifted vs. on-aim prose) — unlike the
gate fixtures, the *prose* matters here because the judgment is semantic.

## Coverage discipline (eval.md)

`docs/loops/eval.md` carries the requirement: a judgment moment cannot ship its detection without
a judgment set. drift is the first; #3/#4 and any future model-judgment loop inherit the floor.
Run `node replay.js` — it's the gate that keeps the dataset well-formed and covered.
