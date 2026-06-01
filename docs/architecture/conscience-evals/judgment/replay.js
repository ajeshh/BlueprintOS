#!/usr/bin/env node
// Conscience JUDGMENT eval — replay half (v0.32.0; multi-moment v0.33.0). ZERO-DEP.
// Runs every commit.
//
// The committed, deterministic, free-to-run surface for EVERY model-judgment
// moment (drift, caution, and successors). It does NOT call a model (that's
// regrade.js — paid, out-of-band). Per moment it guarantees:
//   1. WELL-FORMEDNESS — every case is a genuine open-gate state with a valid
//      label (a malformed case = a meaningless label).
//   2. VOICE-HASH TRIPWIRE — fingerprints the exact instruction the model
//      executes for that moment; a transcript recorded against a different hash
//      is STALE and replay says so LOUDLY (golden transcripts that can't detect
//      their own staleness are an eval that lies).
//   3. COVERAGE — enforces the labeled-set floors (no silent caps); the
//      silent/on-aim class is trust-critical and meant to GROW past its floor.
//   4. GRADING STATUS — GRADED / STALE / NEVER_GRADED / REGRESSION per case.
//
// Exit 1 on: malformed case, coverage failure, or a graded REGRESSION (any
// moment). Exit 0 (loud warnings) on: NEVER_GRADED / STALE — expected before the
// paid re-grade exists.

import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { parseYaml } from '../lib/yaml-eval.js';
import { composeContext } from '../../../../stages/L0-quickstart/template/.claude/hooks/lib/loop-runtime.js';
import { DEVLOG_FIXTURES } from './fixtures-devlog.js';
import { CAPTURELOG_FIXTURES } from './fixtures-capturelog.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

function color(s, code) { return process.stdout.isTTY ? `\x1b[${code}m${s}\x1b[0m` : s; }
const green = (s) => color(s, '32');
const red = (s) => color(s, '31');
const yellow = (s) => color(s, '33');
const dim = (s) => color(s, '90');

const countMatches = (text, re) => (String(text || '').match(re) || []).length;

// ---------------------------------------------------------------------------
// Per-moment well-formedness checkers. Each asserts the case is a genuine
// open-gate state for that moment's predicate, plus a coherent label.
// ---------------------------------------------------------------------------

// Shared label-shape check by category.
function checkLabel(c, errs) {
  const ej = c.expected_judgment || {};
  if (c.category.startsWith('should-fire')) {
    if (ej.fires !== true) errs.push('fire case must have expected_judgment.fires: true');
    if (ej.names_specific_gap !== true) errs.push('fire case must require names_specific_gap');
  } else if (c.category.startsWith('should-not-fire')) {
    if (ej.fires !== false) errs.push('should-not-fire case must have expected_judgment.fires: false');
  } else if (c.category === 'ambiguous') {
    if (!Array.isArray(ej.acceptable) || ej.acceptable.length < 2) errs.push('ambiguous case must list acceptable: [fires, silent]');
  }
}

// drift: filled risk + devlog ≥3 dated entries + NO experiment line.
function checkDriftCase(c) {
  const errs = [];
  const idea = (c.project_state?.ideas || [])[0];
  const risk = idea?.canvas?.riskiest_assumption_text;
  if (!risk || String(risk).trim().length < 3) errs.push('no real riskiest_assumption_text (gate would not open)');
  if (idea?.canvas?.experiment_text) errs.push('case sets an experiment line — gate would be CLOSED');
  const dev = (c.project_state?.docs_files || []).find((f) => f.path === 'docs/devlog.md');
  if (!dev) errs.push('no docs/devlog.md in project_state');
  else if (!(dev.content_ref in DEVLOG_FIXTURES)) errs.push(`devlog content_ref not in DEVLOG_FIXTURES: ${dev.content_ref}`);
  else if (countMatches(DEVLOG_FIXTURES[dev.content_ref], /^## \d{4}-\d{2}-\d{2}/gm) < 3) errs.push(`devlog ${dev.content_ref} has <3 dated entries`);
  checkLabel(c, errs);
  return errs;
}

// caution: ≥3 dated captures + NO filled riskiest assumption.
function checkCautionCase(c) {
  const errs = [];
  const idea = (c.project_state?.ideas || [])[0];
  if (!idea) errs.push('no idea in project_state');
  const risk = idea?.canvas?.riskiest_assumption_text;
  if (risk && String(risk).trim().length >= 3) errs.push('case fills a riskiest assumption — gate would be CLOSED (caution requires it absent)');
  const ref = idea?.capture_log_ref;
  if (!ref) errs.push('no capture_log_ref on the idea');
  else if (!(ref in CAPTURELOG_FIXTURES)) errs.push(`capture_log_ref not in CAPTURELOG_FIXTURES: ${ref}`);
  else if (countMatches(CAPTURELOG_FIXTURES[ref], /^- \d{4}-\d{2}-\d{2}/gm) < 3) errs.push(`capture log ${ref} has <3 dated entries (gate would not open)`);
  checkLabel(c, errs);
  return errs;
}

// ---------------------------------------------------------------------------
// The moment registry — add a row to cover a new judgment moment.
// ---------------------------------------------------------------------------

const MOMENTS = [
  {
    moment: 'drift',
    casesFile: 'drift.judgment.yml',
    signal: { moment: 'drift', loop_id: 'drift-loop', confidence: 'low', evidence: {} },
    floors: { 'should-fire-and-name-gap': 4, 'should-not-fire-on-aim': 5, ambiguous: 1 },
    grow: { category: 'should-not-fire-on-aim', target: 10 },
    check: checkDriftCase,
  },
  {
    moment: 'caution',
    casesFile: 'caution.judgment.yml',
    signal: { moment: 'caution', loop_id: 'canvas-loop', confidence: 'low', evidence: {} },
    floors: { 'should-fire-avoidance': 3, 'should-not-fire-depth': 3, ambiguous: 1 },
    grow: { category: 'should-not-fire-depth', target: 8 },
    check: checkCautionCase,
  },
];

function voiceHash(signal) {
  const frame = composeContext([signal], {});
  return createHash('sha256').update(frame || '').digest('hex');
}

function transcriptFor(moment, id) {
  const p = join(__dirname, 'transcripts', moment, `${id}.json`);
  if (!existsSync(p)) return null;
  try { return JSON.parse(readFileSync(p, 'utf8')); } catch { return null; }
}

function gradeAgainstLabel(c, decisionFires) {
  const ej = c.expected_judgment || {};
  if (Array.isArray(ej.acceptable)) {
    return ((decisionFires && ej.acceptable.includes('fires')) || (!decisionFires && ej.acceptable.includes('silent'))) ? 'ok' : 'regression';
  }
  return decisionFires === ej.fires ? 'ok' : 'regression';
}

// Run one moment's surface; return { blocking, neverGraded, stale }.
function runMoment(m) {
  const cases = parseYaml(readFileSync(join(__dirname, m.casesFile), 'utf8'));
  const hash = voiceHash(m.signal);

  console.log(`\n  ── moment: ${m.moment} ── ${cases.length} cases ${dim(`· voice-hash ${hash.slice(0, 12)}…`)}`);

  const malformed = [];
  const counts = {};
  const status = { GRADED: [], NEVER_GRADED: [], STALE: [], REGRESSION: [] };

  for (const c of cases) {
    const errs = m.check(c);
    if (!c.id) errs.push('missing id');
    if (errs.length) { malformed.push({ id: c.id || '(no id)', errs }); continue; }
    counts[c.category] = (counts[c.category] || 0) + 1;

    const t = transcriptFor(m.moment, c.id);
    if (!t) { status.NEVER_GRADED.push(c.id); continue; }
    if (t.recorded_against_voice_hash !== hash) { status.STALE.push(c.id); continue; }
    const fires = t.decision === 'fires' || t.decision === true;
    (gradeAgainstLabel(c, fires) === 'regression' ? status.REGRESSION : status.GRADED).push(c.id);
  }

  if (malformed.length) {
    console.log(red(`    ✗ ${malformed.length} malformed:`));
    for (const x of malformed) console.log(`        ${red(x.id)}: ${x.errs.join('; ')}`);
  } else {
    console.log(green(`    ✓ all ${cases.length} cases well-formed`));
  }

  let coverageFail = false;
  for (const [cat, floor] of Object.entries(m.floors)) {
    const n = counts[cat] || 0;
    if (n < floor) coverageFail = true;
    const grow = m.grow.category === cat ? dim(` (floor ${floor}; target ${m.grow.target} — grow this class)`) : dim(` (floor ${floor})`);
    console.log(`      ${n >= floor ? green('✓') : red('✗')} ${cat}: ${n}${grow}`);
  }

  if (status.GRADED.length) console.log(`      ${green('GRADED')} ${status.GRADED.length}`);
  if (status.STALE.length) console.log(`      ${yellow('STALE')} ${status.STALE.length}  ${yellow('voice frame changed since recording — RE-GRADE:')} ${status.STALE.join(', ')}`);
  if (status.NEVER_GRADED.length) console.log(`      ${yellow('NEVER_GRADED')} ${status.NEVER_GRADED.length}  ${dim('(run regrade.js)')}`);
  if (status.REGRESSION.length) {
    console.log(`      ${red('REGRESSION')} ${status.REGRESSION.length}: ${status.REGRESSION.join(', ')}`);
  }

  return {
    blocking: malformed.length > 0 || coverageFail || status.REGRESSION.length > 0,
    neverGraded: status.NEVER_GRADED.length,
    stale: status.STALE.length,
  };
}

function main() {
  console.log(`\n  conscience JUDGMENT evals · replay (zero-dep) · ${MOMENTS.length} moment(s)`);
  let blocking = false, neverGraded = 0, stale = 0;
  for (const m of MOMENTS) {
    const r = runMoment(m);
    blocking = blocking || r.blocking;
    neverGraded += r.neverGraded;
    stale += r.stale;
  }
  console.log('\n  ── summary ──');
  console.log(`    blocking failures: ${blocking ? red('YES') : green('none')}`);
  if (neverGraded || stale) {
    console.log(yellow(`\n  NOTE: ${neverGraded} never-graded, ${stale} stale across all moments. The judgment is`));
    console.log(yellow(`  NOT yet model-verified — run regrade.js when an API key is available (judgment/README.md).`));
    console.log(yellow(`  A green replay ≠ a graded judgment.`));
  }
  console.log('');
  process.exit(blocking ? 1 : 0);
}

main();
