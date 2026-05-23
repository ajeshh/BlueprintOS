#!/usr/bin/env node
// Conscience eval runner — zero-dep Node.
//
// Loads moment-1-caution.yml + moment-2-done.yml, constructs synthetic
// project state in a temp dir per example, invokes the conscience hook,
// parses its output, asserts against expected_detection.
//
// Spec: ./README.md, ../../loops/eval.md
//
// Usage:   node docs/architecture/conscience-evals/runner.js
//          (from anywhere — script resolves repo root from its own location)
//
// Exit: 0 if all non-skipped cases pass; 1 otherwise.

import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { execSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, '../../..');
const HOOK = join(REPO_ROOT, 'stages/L0-quickstart/template/.claude/hooks/conscience.sh');

// ---------------------------------------------------------------------------
// Minimal YAML parser — covers the subset used by our eval files:
//   - block sequence at top level (- key: ...)
//   - block mappings (key: value with indented children)
//   - inline mappings ({k: v, k2: v2})
//   - inline sequences ([a, b, c])
//   - scalars: string (bare or quoted), int, true/false, null
//   - comments (# ...) and blank lines
//
// NOT supported (intentionally): anchors, aliases, multi-line scalars,
// flow-style mixing, tags. Keep the eval files within the subset.
// ---------------------------------------------------------------------------

function parseScalar(s) {
  s = s.trim();
  if (s === '' || s === '~' || s === 'null') return null;
  if (s === 'true') return true;
  if (s === 'false') return false;
  if (/^-?\d+$/.test(s)) return parseInt(s, 10);
  if (/^-?\d+\.\d+$/.test(s)) return parseFloat(s);
  // quoted string
  if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
    return s.slice(1, -1);
  }
  // inline list
  if (s.startsWith('[') && s.endsWith(']')) {
    const inner = s.slice(1, -1).trim();
    if (!inner) return [];
    return splitTopLevel(inner, ',').map((p) => parseScalar(p));
  }
  // inline object
  if (s.startsWith('{') && s.endsWith('}')) {
    const inner = s.slice(1, -1).trim();
    if (!inner) return {};
    const obj = {};
    for (const pair of splitTopLevel(inner, ',')) {
      const colonIdx = findTopLevelChar(pair, ':');
      if (colonIdx < 0) continue;
      const k = pair.slice(0, colonIdx).trim();
      const v = pair.slice(colonIdx + 1).trim();
      obj[k] = parseScalar(v);
    }
    return obj;
  }
  return s; // bare string
}

// Split a string by `sep` but respect brackets, braces, and quotes.
function splitTopLevel(s, sep) {
  const parts = [];
  let depth = 0;
  let inQuote = null;
  let start = 0;
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (inQuote) {
      if (c === inQuote) inQuote = null;
      continue;
    }
    if (c === '"' || c === "'") { inQuote = c; continue; }
    if (c === '[' || c === '{') depth++;
    else if (c === ']' || c === '}') depth--;
    else if (c === sep && depth === 0) {
      parts.push(s.slice(start, i));
      start = i + 1;
    }
  }
  parts.push(s.slice(start));
  return parts.map((p) => p.trim()).filter((p) => p.length > 0);
}

function findTopLevelChar(s, ch) {
  let depth = 0;
  let inQuote = null;
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (inQuote) { if (c === inQuote) inQuote = null; continue; }
    if (c === '"' || c === "'") { inQuote = c; continue; }
    if (c === '[' || c === '{') depth++;
    else if (c === ']' || c === '}') depth--;
    else if (c === ch && depth === 0) return i;
  }
  return -1;
}

function indentOf(line) {
  let i = 0;
  while (i < line.length && line[i] === ' ') i++;
  return i;
}

// Tokenize: split into non-blank, non-comment lines with their indent levels.
function tokenize(text) {
  return text.split('\n')
    .map((line, i) => ({ raw: line, lineNum: i + 1 }))
    .filter((t) => t.raw.trim().length > 0 && !t.raw.trim().startsWith('#'))
    .map((t) => ({ ...t, indent: indentOf(t.raw), body: t.raw.trim() }));
}

// Recursive parse — given a list of tokens at a given indent level, parse a value.
function parseBlock(tokens, startIdx, indent) {
  if (startIdx >= tokens.length) return [null, startIdx];
  const first = tokens[startIdx];
  if (first.indent < indent) return [null, startIdx];

  // Sequence
  if (first.body.startsWith('- ')) {
    const arr = [];
    let i = startIdx;
    while (i < tokens.length && tokens[i].indent === indent && tokens[i].body.startsWith('- ')) {
      const itemBody = tokens[i].body.slice(2);
      // Two cases: "- key: val" (start of mapping) or "- scalar"
      const colonIdx = findTopLevelChar(itemBody, ':');
      if (colonIdx >= 0 && !itemBody.startsWith('{') && !itemBody.startsWith('[')) {
        // The "-" introduces a mapping. Fold the first key into the next-indent level.
        const syntheticTokens = [...tokens];
        const key = itemBody.slice(0, colonIdx).trim();
        const val = itemBody.slice(colonIdx + 1).trim();
        syntheticTokens[i] = { ...tokens[i], indent: indent + 2, body: `${key}: ${val}` };
        const [obj, nextIdx] = parseMapping(syntheticTokens, i, indent + 2);
        arr.push(obj);
        i = nextIdx;
      } else {
        // Scalar / inline value after "- "
        arr.push(parseScalar(itemBody));
        i++;
      }
    }
    return [arr, i];
  }

  // Mapping
  return parseMapping(tokens, startIdx, indent);
}

function parseMapping(tokens, startIdx, indent) {
  const obj = {};
  let i = startIdx;
  while (i < tokens.length && tokens[i].indent === indent && !tokens[i].body.startsWith('- ')) {
    const line = tokens[i].body;
    const colonIdx = findTopLevelChar(line, ':');
    if (colonIdx < 0) { i++; continue; }
    const key = line.slice(0, colonIdx).trim();
    const valStr = line.slice(colonIdx + 1).trim();
    if (valStr) {
      obj[key] = parseScalar(valStr);
      i++;
    } else {
      // Value is on subsequent indented lines
      const childIndent = i + 1 < tokens.length ? tokens[i + 1].indent : indent;
      if (childIndent > indent) {
        const [child, next] = parseBlock(tokens, i + 1, childIndent);
        obj[key] = child;
        i = next;
      } else {
        obj[key] = null;
        i++;
      }
    }
  }
  return [obj, i];
}

function parseYaml(text) {
  const tokens = tokenize(text);
  if (tokens.length === 0) return [];
  const baseIndent = tokens[0].indent;
  const [result] = parseBlock(tokens, 0, baseIndent);
  return result;
}

// ---------------------------------------------------------------------------
// Project-state builder — materialize synthetic docs/ideas/ tree in temp dir.
// ---------------------------------------------------------------------------

function buildIdeaFile(idea, dates) {
  const lines = [
    '---',
    `id: ${idea.file.replace(/\.md$/, '')}`,
    `type: idea`,
    `owner: pm`,
    `status: ${idea.status || 'seedling'}`,
    'created: 2026-05-01',
    '---',
    '',
    `# ${idea.file}`,
    '',
    '## Current shape',
    '- **What:** synthetic test idea',
    '',
    '## Capture log',
  ];
  const n = idea.capture_log_entries || 0;
  const dateList = dates && dates.length === n
    ? dates
    : Array.from({ length: n }, (_, i) => `2026-05-${String(Math.min(22, i + 1)).padStart(2, '0')}`);
  for (let i = 0; i < n; i++) {
    lines.push(`- ${dateList[i]} — synthetic capture entry ${i + 1}`);
  }
  lines.push('');
  return lines.join('\n');
}

function buildCanvasFile(ideaFile, canvas) {
  const baseName = ideaFile.replace(/\.md$/, '');
  const canvasFile = `${baseName}-canvas.md`;
  let raText = canvas.riskiest_assumption_text;
  // Honor the "missing line" case
  const hasLine = canvas.riskiest_assumption_line_present !== false;
  const body = [
    '---',
    `id: ${baseName}-canvas`,
    'type: canvas',
    'owner: pm',
    'status: drafting',
    'version: 0.1',
    'updated: 2026-05-22',
    '---',
    '',
    `# Humane Product Canvas — ${baseName}`,
    '',
    '## 🎯 Incubation heartbeat',
  ];
  if (hasLine) {
    if (raText === undefined || raText === '') {
      body.push(`- **Riskiest assumption:** `);
    } else {
      body.push(`- **Riskiest assumption:** ${raText}`);
    }
  }
  body.push('');
  return { file: canvasFile, body: body.join('\n') };
}

function buildProjectDir(example) {
  const tempBase = join(tmpdir(), `boss-evals-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`);
  mkdirSync(tempBase, { recursive: true });

  const state = example.project_state || {};
  // Honor the "dir doesn't exist" case
  if (state.ideas_dir_exists === false) {
    return tempBase;
  }

  const ideasDir = join(tempBase, 'docs', 'ideas');
  mkdirSync(ideasDir, { recursive: true });

  if (Array.isArray(state.ideas)) {
    for (const idea of state.ideas) {
      writeFileSync(join(ideasDir, idea.file), buildIdeaFile(idea, idea.capture_log_dates));
      if (idea.canvas && typeof idea.canvas === 'object') {
        const c = buildCanvasFile(idea.file, idea.canvas);
        writeFileSync(join(ideasDir, c.file), c.body);
      }
    }
  }
  return tempBase;
}

// ---------------------------------------------------------------------------
// Hook invocation
// ---------------------------------------------------------------------------

function runHook(projectDir) {
  try {
    const env = { ...process.env, CLAUDE_PROJECT_DIR: projectDir };
    const out = execSync(`bash "${HOOK}"`, { env, encoding: 'utf8' });
    return out.trim() ? JSON.parse(out) : { fires: false };
  } catch (e) {
    return { error: e.message };
  }
}

// Normalize the hook's output to a comparable shape: { fires, moment, ... }
// Current hook returns:
//   { hookSpecificOutput: { hookEventName, additionalContext } }
// (or nothing → fires:false)
// After refactor it will return: { hookSpecificOutput: { ..., moment, confidence, evidence, suppress_if } }
function normalizeHookOutput(raw) {
  if (!raw || raw.error) return { fires: false, error: raw?.error };
  const out = raw.hookSpecificOutput;
  if (!out) return { fires: false };
  return {
    fires: true,
    moment: out.moment || (out.additionalContext?.includes('validation drift') ? 'caution' : 'unknown'),
    confidence: out.confidence,
    evidence: out.evidence,
    suppress_if: out.suppress_if || [],
  };
}

// ---------------------------------------------------------------------------
// Assertion
// ---------------------------------------------------------------------------

const SKIP_FEATURES = new Set([
  // Examples that test features not yet implemented in the hook
  'signal_text_violation',  // moment-2 signal-language eval — separate runner
  'user_in_unrelated_work', // suppress_if requires user-prompt awareness
  'recently_fired_in_session',
  'state_unchanged_since_last_fire',
  'acknowledged_in_devlog',
  'canvas_actively_being_edited',
  'single_session_brainstorm',
  'single_idea_deepening',
]);

function shouldSkip(example) {
  const exp = example.expected_detection || {};
  if (exp.signal_text_violation) return 'signal-text eval (separate runner)';
  if (Array.isArray(exp.suppress_if) && exp.suppress_if.length > 0) {
    const unimplemented = exp.suppress_if.filter((s) => SKIP_FEATURES.has(s));
    if (unimplemented.length) return `suppress_if not yet implemented: ${unimplemented.join(', ')}`;
  }
  // Moment-2 has no hook detector today; everything is skipped pending /canvas skill behavior testing.
  if (exp.moment === 'done') return 'moment-2 lives in /canvas skill prompt, not the hook';
  // Examples mentioning project_mode, claude_md_amendments, recent_fires need session/state — not testable yet.
  const ps = example.project_state || {};
  if (ps.claude_md_amendments) return 'project-config override not yet implemented';
  if (ps.recent_fires) return 'session-state tracking not yet implemented';
  if (ps.devlog) return 'devlog awareness not yet implemented';
  if (ps.last_fire_state_hash_matches_current !== undefined) return 'session-state tracking not yet implemented';
  return null;
}

function assertEqual(actual, expected) {
  if (expected.fires === false) {
    return actual.fires === false
      ? { ok: true }
      : { ok: false, reason: `expected no fire, got fire (moment=${actual.moment})` };
  }
  if (expected.fires === true) {
    if (actual.fires !== true) return { ok: false, reason: 'expected fire, got no fire' };
    if (expected.moment && actual.moment && expected.moment !== actual.moment) {
      return { ok: false, reason: `expected moment=${expected.moment}, got moment=${actual.moment}` };
    }
    return { ok: true };
  }
  return { ok: true };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function loadMoment(name) {
  const path = join(__dirname, name);
  if (!existsSync(path)) return [];
  return parseYaml(readFileSync(path, 'utf8'));
}

function color(s, code) {
  if (!process.stdout.isTTY) return s;
  return `\x1b[${code}m${s}\x1b[0m`;
}
const green = (s) => color(s, '32');
const red = (s) => color(s, '31');
const yellow = (s) => color(s, '33');
const dim = (s) => color(s, '90');

function main() {
  const moment1 = loadMoment('moment-1-caution.yml');
  const moment2 = loadMoment('moment-2-done.yml');
  const all = [...moment1, ...moment2];

  console.log(`\n  conscience-evals · ${all.length} examples loaded`);
  console.log(`    moment-1 (caution): ${moment1.length}`);
  console.log(`    moment-2 (done):    ${moment2.length}\n`);

  const results = { passed: [], failed: [], skipped: [], errors: [] };
  const byFailureMode = {}; // for the summary

  for (const ex of all) {
    const skipReason = shouldSkip(ex);
    if (skipReason) {
      results.skipped.push({ id: ex.id, reason: skipReason });
      continue;
    }

    let tempDir;
    try {
      tempDir = buildProjectDir(ex);
      const raw = runHook(tempDir);
      const actual = normalizeHookOutput(raw);
      const expected = ex.expected_detection || {};
      const result = assertEqual(actual, expected);

      if (result.ok) {
        results.passed.push({ id: ex.id });
        console.log(`  ${green('✓')} ${ex.id}  ${dim(ex.scenario || '')}`);
      } else {
        results.failed.push({ id: ex.id, reason: result.reason, scenario: ex.scenario, failure_mode: ex.failure_mode });
        if (ex.failure_mode) {
          byFailureMode[ex.failure_mode] = (byFailureMode[ex.failure_mode] || 0) + 1;
        }
        console.log(`  ${red('✗')} ${ex.id}  ${ex.scenario || ''}`);
        console.log(`      ${red('→')} ${result.reason}`);
      }
    } catch (e) {
      results.errors.push({ id: ex.id, error: e.message });
      console.log(`  ${red('!')} ${ex.id}  runtime error: ${e.message}`);
    } finally {
      if (tempDir && existsSync(tempDir)) rmSync(tempDir, { recursive: true, force: true });
    }
  }

  // Summary
  console.log(`\n  ── summary ──`);
  console.log(`    ${green('passed:')}  ${results.passed.length}`);
  console.log(`    ${red('failed:')}  ${results.failed.length}`);
  console.log(`    ${yellow('skipped:')} ${results.skipped.length}  ${dim('(features not yet implemented)')}`);
  if (results.errors.length) console.log(`    ${red('errors:')}  ${results.errors.length}`);

  if (results.failed.length) {
    console.log(`\n  failed by category:`);
    const byCat = {};
    for (const f of results.failed) {
      const cat = f.failure_mode || (f.scenario?.startsWith('Three') ? 'should-fire' : 'uncategorized');
      byCat[cat] = (byCat[cat] || 0) + 1;
    }
    for (const [cat, n] of Object.entries(byCat).sort((a, b) => b[1] - a[1])) {
      console.log(`    ${red(String(n).padStart(3))}  ${cat}`);
    }
  }

  if (results.skipped.length) {
    console.log(`\n  skipped by reason (top 5):`);
    const byReason = {};
    for (const s of results.skipped) byReason[s.reason] = (byReason[s.reason] || 0) + 1;
    const top = Object.entries(byReason).sort((a, b) => b[1] - a[1]).slice(0, 5);
    for (const [r, n] of top) console.log(`    ${yellow(String(n).padStart(3))}  ${r}`);
  }

  console.log('');
  process.exit(results.failed.length + results.errors.length > 0 ? 1 : 0);
}

main();
