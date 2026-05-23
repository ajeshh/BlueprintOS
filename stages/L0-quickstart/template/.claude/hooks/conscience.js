#!/usr/bin/env node
// BOSS conscience hook (v0.18.0+) — generic, loop-driven.
//
// Fires on UserPromptSubmit. Reads docs/loops/*.md from the project, classifies
// each loop's state against the predicate-based runtime, returns structured
// signals for any loop drifting. Claude composes the voice; the hook ships a
// schema (Liu's discipline).
//
// Output schema:
//   { hookSpecificOutput: {
//       hookEventName: "UserPromptSubmit",
//       signals: [{ loop_id, type, moment, confidence, evidence, suppress_if }, ...],
//       // For back-compat with v0.16 eval-runner: mirror first signal's fields.
//       moment, confidence, evidence, suppress_if,
//       additionalContext: "..." } }
//
// Always exits 0. Empty output = no signal = stay silent.

import { detectSignals, composeContext } from './lib/loop-runtime.js';

const projectDir = process.env.CLAUDE_PROJECT_DIR || process.cwd();

try {
  const signals = detectSignals(projectDir);
  if (signals.length === 0) {
    process.exit(0);
  }

  const additionalContext = composeContext(signals);
  const first = signals[0];

  const out = {
    hookSpecificOutput: {
      hookEventName: 'UserPromptSubmit',
      signals,
      moment: first.moment,
      confidence: first.confidence,
      evidence: first.evidence,
      suppress_if: first.suppress_if || [],
      additionalContext,
    },
  };
  process.stdout.write(JSON.stringify(out));
} catch (e) {
  // Fail silent — the conscience must never block the user's prompt.
  // Errors are written to stderr for the developer to see; hookOutput is empty
  // so the user's session continues normally.
  process.stderr.write(`[conscience hook error] ${e.message}\n`);
}

process.exit(0);
