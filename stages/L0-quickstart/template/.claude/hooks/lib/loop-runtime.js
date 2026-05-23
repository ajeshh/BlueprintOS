// BOSS loop runtime (IDEA-008 promoted to FEAT in v0.18.0).
//
// Reads docs/loops/*.md from the project, parses their YAML frontmatter, and
// evaluates entry/exit predicates against the live project state. Returns a
// list of *signals* — one per loop whose state warrants attention (drifting,
// stalled, just-graduated, etc.). The conscience hook composes these signals
// into structured output for Claude.
//
// Predicate vocabulary (closed set; extend deliberately):
//   - exists: { path }                — a file/dir exists at the project-relative path
//   - count_at_least: { path_glob, pattern, min, exclude_files_matching?, not_path_glob? }
//                                     — N+ regex matches across globbed files
//   - any_file_matches: { path_glob, pattern, related_idea_not_matching? }
//                                     — at least one globbed file matches the regex;
//                                       optional related-idea filter for canvas → idea
//                                       cross-file checks
//
// Loop spec frontmatter:
//   id: <slug>
//   type: loop
//   stage: <L0-quickstart | L1-mvp | ...>
//   runner_type: hook | skill | manual | external
//   entry: [<predicate>, ...]
//   exit: [<predicate>, ...]
//   drift_moment: caution | done | capture | restraint | <other>
//   attributed_to: [<practitioner>, ...]
//
// Drift derivation (auto, no per-loop encoding needed):
//   - All entry predicates satisfied AND any exit predicate not satisfied
//     → loop is OPEN; emit a signal with the loop's drift_moment.
//   - All entry + exit predicates satisfied → loop is CLOSED (no signal —
//     unless the closure JUST happened; future work: session-state to detect
//     just-closed transitions and emit "done" signals).
//   - Entry predicates not satisfied → loop is UNOPENABLE; no signal.

import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseFrontmatter } from './yaml.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

// ---------------------------------------------------------------------------
// Glob expansion (single-`*`, single-level — no `**`).
// Examples: `docs/ideas/IDEA-*.md`, `docs/loops/*.md`.
// ---------------------------------------------------------------------------

function expandGlob(pattern, projectDir) {
  const fullPattern = join(projectDir, pattern);
  const dir = dirname(fullPattern);
  const fileGlob = basename(fullPattern);
  if (!existsSync(dir)) return [];
  if (!fileGlob.includes('*')) {
    return existsSync(fullPattern) ? [fullPattern] : [];
  }
  const regex = new RegExp(`^${fileGlob.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*')}$`);
  return readdirSync(dir)
    .filter((name) => regex.test(name))
    .map((name) => join(dir, name));
}

function matchesGlob(filePath, pattern, projectDir) {
  return expandGlob(pattern, projectDir).includes(filePath);
}

// ---------------------------------------------------------------------------
// Predicate evaluators.
// ---------------------------------------------------------------------------

const PREDICATES = {
  exists({ path }, projectDir) {
    return existsSync(join(projectDir, path));
  },

  count_at_least({ path_glob, pattern, min, exclude_files_matching, not_path_glob }, projectDir) {
    let files = expandGlob(path_glob, projectDir);
    if (not_path_glob) {
      files = files.filter((f) => !matchesGlob(f, not_path_glob, projectDir));
    }
    if (exclude_files_matching) {
      const exclRe = new RegExp(exclude_files_matching, 'm');
      files = files.filter((f) => {
        try { return !exclRe.test(readFileSync(f, 'utf8')); } catch { return true; }
      });
    }
    const re = new RegExp(pattern, 'gm');
    let count = 0;
    for (const f of files) {
      try {
        const content = readFileSync(f, 'utf8');
        count += (content.match(re) || []).length;
      } catch { /* ignore unreadable */ }
    }
    return { ok: count >= min, evidence: { count, min, files: files.length } };
  },

  any_file_matches({ path_glob, pattern, related_idea_not_matching }, projectDir) {
    const files = expandGlob(path_glob, projectDir);
    const re = new RegExp(pattern, 'm');
    let matchedCount = 0;
    for (const f of files) {
      // Optional cross-file filter: a canvas's related idea (strip `-canvas.md`,
      // append `.md`) must NOT match a given pattern.
      if (related_idea_not_matching) {
        const idea = f.replace(/-canvas\.md$/, '.md');
        if (existsSync(idea)) {
          try {
            const idText = readFileSync(idea, 'utf8');
            if (new RegExp(related_idea_not_matching, 'm').test(idText)) continue;
          } catch { /* ignore */ }
        }
      }
      try {
        if (re.test(readFileSync(f, 'utf8'))) matchedCount++;
      } catch { /* ignore */ }
    }
    return { ok: matchedCount >= 1, evidence: { matched_files: matchedCount, total_files: files.length } };
  },
};

// Evaluate a single predicate. Always returns { ok, evidence }.
function evalPredicate(pred, projectDir) {
  const type = Object.keys(pred).find((k) => PREDICATES[k]);
  if (!type) return { ok: false, evidence: { error: `unknown predicate: ${JSON.stringify(pred)}` } };
  try {
    const res = PREDICATES[type](pred[type] || pred, projectDir);
    // exists returns a bare boolean; normalize to { ok, evidence }.
    if (typeof res === 'boolean') return { ok: res, evidence: { type, path: pred[type]?.path || pred.path } };
    return res;
  } catch (e) {
    return { ok: false, evidence: { error: e.message } };
  }
}

// Evaluate a list of predicates. Returns { all_ok, results }.
function evalList(preds, projectDir) {
  const results = (preds || []).map((p) => evalPredicate(p, projectDir));
  return { all_ok: results.every((r) => r.ok), results };
}

// ---------------------------------------------------------------------------
// Loop loading + state classification.
// ---------------------------------------------------------------------------

export function loadLoops(projectDir) {
  const loopsDir = join(projectDir, 'docs', 'loops');
  if (!existsSync(loopsDir)) return [];
  return readdirSync(loopsDir)
    .filter((n) => n.endsWith('.md'))
    .map((n) => {
      const path = join(loopsDir, n);
      try {
        const text = readFileSync(path, 'utf8');
        const fm = parseFrontmatter(text);
        if (!fm || fm.type !== 'loop') return null;
        return { ...fm, _file: path };
      } catch { return null; }
    })
    .filter(Boolean);
}

export function classifyLoop(loop, projectDir) {
  const entry = evalList(loop.entry, projectDir);
  const exit = evalList(loop.exit, projectDir);
  let state;
  if (!entry.all_ok) state = 'unopenable';
  else if (entry.all_ok && exit.all_ok) state = 'closed';
  else state = 'open';
  return { state, entry, exit };
}

// ---------------------------------------------------------------------------
// Signal composition.
// ---------------------------------------------------------------------------

export function detectSignals(projectDir) {
  const loops = loadLoops(projectDir);
  const signals = [];
  for (const loop of loops) {
    // Only `hook`-runner loops emit signals automatically; skill/manual/external
    // are tested by their own runners.
    if (loop.runner_type && loop.runner_type !== 'hook') continue;

    // Loops without a `drift_moment` are structural — they express dependencies
    // downstream loops check, but don't themselves emit signals when open. (E.g.
    // capture-loop: its job is to be the upstream of canvas-loop; it doesn't
    // drift just because a fresh project has no captures yet — that's the
    // over-fires-on-fresh-project failure mode the moment-1 evals catch.)
    if (!loop.drift_moment) continue;

    const { state, entry, exit } = classifyLoop(loop, projectDir);
    if (state !== 'open') continue;

    const confidence = computeConfidence(loop, entry, exit);
    signals.push({
      loop_id: loop.id,
      type: 'stalled',
      moment: loop.drift_moment || 'caution',
      confidence,
      evidence: {
        entry: entry.results.map((r) => r.evidence),
        exit: exit.results.map((r) => r.evidence),
      },
      suppress_if: [],
    });
  }
  return signals;
}

// Confidence: scales with how much "drift overshoot" exists past the entry
// threshold. Captured here as a heuristic — refines via eval feedback.
function computeConfidence(loop, entry) {
  // Find a count-style entry predicate and read its count vs min.
  for (const r of entry.results || []) {
    if (r.evidence && typeof r.evidence.count === 'number' && typeof r.evidence.min === 'number') {
      const ratio = r.evidence.count / r.evidence.min;
      if (ratio >= 2) return 'high';
      if (ratio >= 1.33) return 'medium';
      return 'low';
    }
  }
  return 'medium';
}

// Compose `additionalContext` for hosts that consume the flat field. For one
// signal, a single nudge; for multiple, a brief enumeration. Voice stays with
// the model — this hands signal + ask, not canned voice.
export function composeContext(signals) {
  if (!signals.length) return null;
  if (signals.length === 1) {
    return signalAsContext(signals[0]);
  }
  const parts = signals.map((s, i) => `(${i + 1}) ${signalAsContext(s)}`);
  return `[BOSS conscience — ${signals.length} signals]\n` + parts.join('\n');
}

function signalAsContext(s) {
  const moment = s.moment || 'attention';
  const loopId = s.loop_id || 'loop';
  // Per-moment phrasing — gives the model a starting frame; it composes the voice.
  if (moment === 'caution') {
    return `[BOSS conscience — ${loopId} stalled · ${s.confidence} confidence] The ${loopId} is open (its upstream artifact exists) but its exit artifact does not. If — and only if — it fits this moment, surface BOSS's validation nudge in your own voice: name the drift in one spare line, ask what would make it real, point at the next loop's verb, hand the decision back. Say it at most once; if you've already raised it this session or the user is clearly mid-other-work, stay silent. It's a nudge, never a gate.`;
  }
  if (moment === 'restraint') {
    return `[BOSS conscience — ${loopId} premature · ${s.confidence} confidence] The founder is reaching for ${loopId} but an upstream artifact is missing. If it fits the moment, surface BOSS's restraint nudge in your own voice: name what's missing in one line, offer to back up, hand the decision back. Never block.`;
  }
  return `[BOSS conscience — ${loopId} (${moment}) · ${s.confidence} confidence] signal warrants attention.`;
}
