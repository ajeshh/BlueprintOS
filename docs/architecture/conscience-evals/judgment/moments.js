// Shared judgment-moment definitions + voice-hash (v0.35.0).
//
// Both replay.js (every commit, zero-dep) and regrade.js (paid, out-of-band)
// import from here so they can NEVER disagree on (a) which representative signal
// fingerprints a moment's voice frame, or (b) how that fingerprint is computed.
// If regrade stamped a transcript with a hash replay computes differently, every
// transcript would read STALE forever — so this is the one source of truth.

import { createHash } from 'node:crypto';
import { composeContext } from '../../../../stages/L0-quickstart/template/.claude/hooks/lib/loop-runtime.js';

// The representative signal whose composed voice-frame is fingerprinted per
// moment. confidence is fixed to 'low' so the hash tracks the *instruction*
// text, not the (runtime-varying) confidence word.
export const MOMENT_SIGNALS = {
  drift: { moment: 'drift', loop_id: 'drift-loop', confidence: 'low', evidence: {} },
  caution: { moment: 'caution', loop_id: 'canvas-loop', confidence: 'low', evidence: {} },
};

// The exact instruction the model executes for this moment — what we fingerprint.
export function voiceFrame(moment) {
  return composeContext([MOMENT_SIGNALS[moment]], {});
}

export function voiceHash(moment) {
  return createHash('sha256').update(voiceFrame(moment) || '').digest('hex');
}
