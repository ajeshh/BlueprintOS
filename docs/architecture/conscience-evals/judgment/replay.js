#!/usr/bin/env node
// Conscience JUDGMENT eval — replay half (v0.32.0). ZERO-DEP. Runs every commit.
//
// This is the committed, deterministic, free-to-run surface. It does NOT call a
// model (that's regrade.js — paid, out-of-band). What it guarantees on every
// commit:
//   1. WELL-FORMEDNESS — every judgment case is a genuine open-gate state
//      (filled risk, devlog with ≥3 dated entries, no experiment line) with a
//      valid label. A malformed case = the judgment label is meaningless.
//   2. VOICE-HASH TRIPWIRE — the `drift` instruction the model executes is
//      fingerprinted. If it changed since a transcript was recorded, the
//      transcript is STALE and replay says so LOUDLY (golden transcripts that
//      can't detect their own staleness are an eval that lies).
//   3. COVERAGE — enforces the labeled-set floors (no silent caps).
//   4. GRADING STATUS — reports each case's transcript state: GRADED / STALE /
//      NEVER_GRADED. Until regrade.js runs, all are NEVER_GRADED — printed
//      loudly, never passed silently.
//
// Exit 1 on: malformed case, coverage failure, or a graded REGRESSION.
// Exit 0 (with loud warnings) on: NEVER_GRADED / STALE — expected before the
// paid re-grade exists; these are action items, not regressions.

import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { parseYaml } from '../lib/yaml-eval.js';
import { composeContext } from '../../../../stages/L0-quickstart/template/.claude/hooks/lib/loop-runtime.js';
import { DEVLOG_FIXTURES } from './fixtures-devlog.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Coverage floors. The on-aim (should-not-fire) class is the trust-critical one
// and is intentionally allowed to GROW past its floor — the target is printed.
const FLOORS = { 'should-fire-and-name-gap': 4, 'should-not-fire-on-aim': 5, ambiguous: 1 };
const ON_AIM_TARGET = 10;
const VALID_CATEGORIES = new Set(Object.keys(FLOORS));

function color(s, code) { return process.stdout.isTTY ? `\x1b[${code}m${s}\x1b[0m` : s; }
const green = (s) => color(s, '32');
const red = (s) => color(s, '31');
const yellow = (s) => color(s, '33');
const dim = (s) => color(s, '90');

// The exact instruction the model executes for a drift signal — fingerprint THIS.
function currentVoiceHash() {
  const frame = composeContext([{ moment: 'drift', loop_id: 'drift-loop', confidence: 'low', evidence: {} }], {});
  return createHash('sha256').update(frame || '').digest('hex');
}

function countDateHeaders(text) {
  return (text.match(/^## \d{4}-\d{2}-\d{2}/gm) || []).length;
}

// Validate one case is a genuine open-gate state with a coherent label.
function checkWellFormed(c) {
  const errs = [];
  if (!c.id) errs.push('missing id');
  if (!VALID_CATEGORIES.has(c.category)) errs.push(`invalid category: ${c.category}`);

  const idea = (c.project_state?.ideas || [])[0];
  const risk = idea?.canvas?.riskiest_assumption_text;
  if (!risk || String(risk).trim().length < 3) errs.push('no real riskiest_assumption_text (gate would not open)');
  if (idea?.canvas?.experiment_text) errs.push('case sets an experiment line — gate would be CLOSED, not a judgment case');

  const devlogSpec = (c.project_state?.docs_files || []).find((f) => f.path === 'docs/devlog.md');
  if (!devlogSpec) errs.push('no docs/devlog.md in project_state');
  else if (!devlogSpec.content_ref || !(devlogSpec.content_ref in DEVLOG_FIXTURES)) {
    errs.push(`devlog content_ref not found in DEVLOG_FIXTURES: ${devlogSpec.content_ref}`);
  } else if (countDateHeaders(DEVLOG_FIXTURES[devlogSpec.content_ref]) < 3) {
    errs.push(`devlog fixture ${devlogSpec.content_ref} has <3 dated entries (gate would not open)`);
  }

  const ej = c.expected_judgment || {};
  if (c.category === 'should-fire-and-name-gap') {
    if (ej.fires !== true) errs.push('fire case must have expected_judgment.fires: true');
    if (ej.names_specific_gap !== true) errs.push('fire case must require names_specific_gap');
  } else if (c.category === 'should-not-fire-on-aim') {
    if (ej.fires !== false) errs.push('on-aim case must have expected_judgment.fires: false');
  } else if (c.category === 'ambiguous') {
    if (!Array.isArray(ej.acceptable) || ej.acceptable.length < 2) errs.push('ambiguous case must list acceptable: [fires, silent]');
  }
  return errs;
}

// Compare a recorded transcript decision against the case's label.
// Returns 'ok' | 'regression'. Respects `acceptable` for ambiguous cases.
function gradeAgainstLabel(c, decisionFires) {
  const ej = c.expected_judgment || {};
  if (Array.isArray(ej.acceptable)) {
    const ok = (decisionFires && ej.acceptable.includes('fires')) || (!decisionFires && ej.acceptable.includes('silent'));
    return ok ? 'ok' : 'regression';
  }
  return decisionFires === ej.fires ? 'ok' : 'regression';
}

function transcriptFor(id) {
  const p = join(__dirname, 'transcripts', 'drift', `${id}.json`);
  if (!existsSync(p)) return null;
  try { return JSON.parse(readFileSync(p, 'utf8')); } catch { return null; }
}

function main() {
  const casesPath = join(__dirname, 'drift.judgment.yml');
  const cases = parseYaml(readFileSync(casesPath, 'utf8'));
  const voiceHash = currentVoiceHash();

  console.log(`\n  conscience JUDGMENT evals (drift) · ${cases.length} cases · replay (zero-dep)`);
  console.log(dim(`  drift voice-frame hash: ${voiceHash.slice(0, 16)}…\n`));

  const malformed = [];
  const counts = {};
  const status = { GRADED: [], NEVER_GRADED: [], STALE: [], REGRESSION: [] };

  for (const c of cases) {
    const errs = checkWellFormed(c);
    if (errs.length) { malformed.push({ id: c.id, errs }); continue; }
    counts[c.category] = (counts[c.category] || 0) + 1;

    const t = transcriptFor(c.id);
    if (!t) { status.NEVER_GRADED.push(c.id); continue; }
    if (t.recorded_against_voice_hash !== voiceHash) { status.STALE.push(c.id); continue; }
    const grade = gradeAgainstLabel(c, t.decision === 'fires' || t.decision === true);
    if (grade === 'regression') status.REGRESSION.push({ id: c.id, got: t.decision });
    else status.GRADED.push(c.id);
  }

  // 1. Well-formedness
  if (malformed.length) {
    console.log(red(`  ✗ ${malformed.length} malformed case(s):`));
    for (const m of malformed) console.log(`      ${red(m.id)}: ${m.errs.join('; ')}`);
  } else {
    console.log(green(`  ✓ all cases well-formed (genuine open-gate states)`));
  }

  // 2. Coverage
  console.log('\n  coverage:');
  let coverageFail = false;
  for (const [cat, floor] of Object.entries(FLOORS)) {
    const n = counts[cat] || 0;
    const ok = n >= floor;
    if (!ok) coverageFail = true;
    const tgt = cat === 'should-not-fire-on-aim' ? dim(` (floor ${floor}; target ${ON_AIM_TARGET} — grow this class)`) : dim(` (floor ${floor})`);
    console.log(`    ${ok ? green('✓') : red('✗')} ${cat}: ${n}${tgt}`);
  }

  // 3 + 4. Voice-hash tripwire + grading status
  console.log('\n  grading status:');
  if (status.GRADED.length) console.log(`    ${green('GRADED')}       ${status.GRADED.length}  ${dim(status.GRADED.join(', '))}`);
  if (status.STALE.length) console.log(`    ${yellow('STALE')}        ${status.STALE.length}  ${yellow('voice frame changed since recording — RE-GRADE needed:')} ${status.STALE.join(', ')}`);
  if (status.NEVER_GRADED.length) console.log(`    ${yellow('NEVER_GRADED')} ${status.NEVER_GRADED.length}  ${dim('run regrade.js (paid, out-of-band) to grade:')} ${status.NEVER_GRADED.join(', ')}`);
  if (status.REGRESSION.length) {
    console.log(`    ${red('REGRESSION')}   ${status.REGRESSION.length}`);
    for (const r of status.REGRESSION) console.log(`      ${red(r.id)}: live model decided ${r.got}, label disagrees`);
  }

  // Summary + exit
  const blocking = malformed.length > 0 || coverageFail || status.REGRESSION.length > 0;
  console.log('\n  ── summary ──');
  console.log(`    well-formed:   ${malformed.length ? red(`${cases.length - malformed.length}/${cases.length}`) : green(`${cases.length}/${cases.length}`)}`);
  console.log(`    coverage:      ${coverageFail ? red('BELOW FLOOR') : green('ok')}`);
  console.log(`    regressions:   ${status.REGRESSION.length ? red(status.REGRESSION.length) : green('0')}`);
  if (status.NEVER_GRADED.length || status.STALE.length) {
    console.log(yellow(`\n  NOTE: ${status.NEVER_GRADED.length} case(s) never graded, ${status.STALE.length} stale. The judgment is NOT yet`));
    console.log(yellow(`  model-verified — run regrade.js when an API key is available (see judgment/README.md).`));
    console.log(yellow(`  This is visible, not silent: a green replay ≠ a graded judgment.`));
  }
  console.log('');
  process.exit(blocking ? 1 : 0);
}

main();
