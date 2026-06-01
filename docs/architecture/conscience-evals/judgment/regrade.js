#!/usr/bin/env node
// Conscience JUDGMENT eval — re-grade half (v0.32.0). PAID, OUT-OF-BAND.
//
// STATUS: DEFERRED BY DESIGN (the spec is here; the model calls are not built).
// Per the v0.32 architecture decision (mentor-architect): ship the labeled set
// + replay.js + the voice-hash tripwire FIRST; build this paid half the week the
// first STALE tripwire fires and labels actually need regenerating. Building an
// API harness that nothing yet triggers, for a one-user tool, is the over-build
// BOSS warns against. The case schema is identical either way, so deferring
// costs nothing — see judgment/README.md.
//
// This file is runnable: it env-checks and prints what it WILL do, so the cadence
// is discoverable, not folklore. It never runs on the every-commit path.
//
// ── THE ALGORITHM (build this when the tripwire first fires) ──────────────────
// For each judgment moment in replay.js's MOMENTS registry (drift, caution, …),
// for each case in its <moment>.judgment.yml:
//   1. Construct the BOUNDED READ the drift instruction names — the canvas
//      riskiest-assumption line + the ~5 most recent devlog entries (from the
//      DEVLOG_FIXTURES content_ref) + (none here; no open FEAT in fixtures).
//      This is exactly what the live hook hands the model, no more.
//   2. DECISION CALL — give the model the drift voice-frame (composeContext for a
//      drift signal — the same string replay.js hashes) as the conscience
//      instruction, plus the bounded read, plus a neutral "founder is continuing
//      to build" turn. Capture: did it surface a drift nudge? (fires true/false)
//      and, if so, the nudge text.
//   3. JUDGE CALL — a second model call grades the nudge against the case's
//      rubric (expected_judgment.must_reference / must_not), returning a small
//      structured verdict {names_specific_gap, references_risk, references_drift,
//      score: pass|fail}. (Liu: structured output, not graded prose.)
//   4. WRITE TRANSCRIPT — transcripts/drift/<id>.json:
//        { recorded_against_voice_hash, model, recorded_at,
//          decision: "fires"|"silent", named_gap, judge_score }
//      recorded_against_voice_hash = the CURRENT hash, so replay.js can detect
//      when a later voice-frame edit makes this transcript stale.
//   5. replay.js then grades the recorded decision against the human label every
//      commit (free), and trips STALE when the frame changes.
//
// Dependencies: NONE beyond Node built-ins — use global `fetch` to POST to the
// Anthropic API directly (no SDK). Keeps even the paid half zero-dep. The only
// requirement is ANTHROPIC_API_KEY in the environment. This file must never be
// imported by src/ and never enters the npm `files` allowlist (it lives under
// docs/, which doesn't ship).
//
// ── WHEN replay.js PRINTS STALE: come here, run `node regrade.js`, commit the
//    refreshed transcripts (or stamp STALE-ACCEPTED with a rationale if the
//    decision genuinely shouldn't change). That is the cadence trigger. ────────

const hasKey = !!process.env.ANTHROPIC_API_KEY;

console.log(`
  conscience JUDGMENT re-grade (drift) — PAID, OUT-OF-BAND

  This is the calibrator half. It is DEFERRED BY DESIGN: the labeled set,
  replay.js, and the voice-hash tripwire ship first; this gets built the week
  replay.js first prints STALE and the labels actually need regenerating.

  The full algorithm is documented at the top of this file and in
  judgment/README.md. It calls the model twice per case (decide → judge),
  writes transcripts/drift/<id>.json stamped with the current voice-hash, and is
  the thing replay.js grades against on every commit.

  ANTHROPIC_API_KEY: ${hasKey ? 'present' : 'NOT set'}
  ${hasKey
    ? 'Ready to implement the two model calls above when a STALE tripwire calls for it.'
    : 'Set ANTHROPIC_API_KEY to run the paid re-grade once it is implemented.'}

  Until then: replay.js holds the line (well-formedness + coverage + tripwire),
  and prints NEVER_GRADED loudly so a green replay is never mistaken for a
  graded judgment.
`);

process.exit(0);
