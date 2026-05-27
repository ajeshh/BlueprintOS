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

import { readFileSync, writeFileSync, readdirSync, existsSync, statSync } from 'node:fs';
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

// Read the optional founder-cohort declaration from .boss/config.json (v0.20.0+).
// Returns null if no config or no cohort field — Claude composes the voice
// generically when cohort is null.
export function readCohort(projectDir) {
  const f = join(projectDir, '.boss', 'config.json');
  if (!existsSync(f)) return null;
  try {
    return JSON.parse(readFileSync(f, 'utf8')).cohort || null;
  } catch { return null; }
}

// Read the conscience pause state from .boss/config.json (v0.23.0+, IDEA-011).
// Returns { mode, since, expires, reason } or null. Mode is 'paused' or 'active'
// (or null when never set). When paused, the hook exits silent if not expired.
export function readPauseState(projectDir) {
  const f = join(projectDir, '.boss', 'config.json');
  if (!existsSync(f)) return null;
  try {
    return JSON.parse(readFileSync(f, 'utf8')).conscience || null;
  } catch { return null; }
}

// Clear the conscience pause state (set mode: 'active'). Called by the hook when
// it detects an expired pause — the auto-resume IS the kindness. The founder
// learns the pause ended because the conscience starts speaking again on the
// next prompt; we don't emit a special "your pause expired" signal (that would
// be performative noise; IDEA-011 explicitly chose silent auto-resume).
export function clearPauseState(projectDir) {
  const f = join(projectDir, '.boss', 'config.json');
  if (!existsSync(f)) return;
  try {
    const cfg = JSON.parse(readFileSync(f, 'utf8'));
    cfg.conscience = { mode: 'active' };
    writeFileSync(f, JSON.stringify(cfg, null, 2) + '\n');
  } catch { /* fail silent — hook must never block */ }
}

// Per-cohort framing directives (v0.20.0+). Added to additionalContext so the
// model composes the conscience voice appropriately for the founder's cohort.
// Personas in v0.19 surfaced that one-sized voice fails first-product and
// returning-founder differently — first-product needs teaching; returning-founder
// wants a harder question. The signal stays the same; the *voice* varies.
const COHORT_FRAMING = {
  'vibe-coder-newbie':
    'This founder is a vibe-coding newbie (no eng/startup background, ~6 months into AI tools, learns by doing). Avoid jargon. Show, don\'t lecture. Specifics over categories.',
  'eng-builder':
    'This founder is an experienced engineer turned first-time founder. Be terse and inspectable. They want transparency, not encouragement; respect their tooling fluency. The founder skills are new; the eng skills are not.',
  'non-tech-founder':
    'This founder has deep domain expertise but no coding background; AI is their bridge. Use plain language, not framework jargon. They respect mentor framing (they\'ve had real mentors); they have no patience for tech-bro phrasing.',
  'first-product':
    'This founder is an ABSOLUTE BEGINNER — first product ever; may not know what an MVP is. *Teach, don\'t grade.* Define terms inline. Invite, never assess. Their face when they read the nudge IS the design signal — if they\'d feel stupid, the nudge is wrong.',
  'vibe-virtuoso':
    'This founder ships a lot but doesn\'t sustain. Don\'t coach the discipline they\'ve already read books about and won\'t do. Ask SHARPER questions; lean into the architecture they respect (the override pattern, the structured signal). The voice they hear most is praise — give them friction instead.',
  'indie-hacker':
    'This founder is in the right-sized / calm-company lineage (Walling/Fried/Jarvis). Anti-VC by choice. Plain Fitzpatrick-style language lands; framework jargon does not. Use understatement; "this is fine" is high praise.',
  'returning-founder':
    'This founder has shipped before. *Skip the 101.* Ask the HARDER cohort-aware version: "is your conviction here at the level it needs to be for 12 months" not "what does this prove." Respect experience; don\'t teach the obvious.',
  'domain-expert':
    'This founder has 10+ years in a high-stakes domain (medical/legal/financial). Real stakes; real regulatory context. Caveat appropriately. Ask about who specifically could be harmed; lean into the humane lens. Avoid generic startup advice that won\'t fit the domain.',
};

// Compose `additionalContext` for hosts that consume the flat field. For one
// signal, a single nudge; for multiple, a brief enumeration. Voice stays with
// the model — this hands signal + ask + cohort frame, not canned voice.
export function composeContext(signals, opts = {}) {
  if (!signals.length) return null;
  const cohort = opts.cohort || null;
  const cohortLine = cohort && COHORT_FRAMING[cohort]
    ? `\n\nCohort framing — ${cohort}: ${COHORT_FRAMING[cohort]}`
    : '';
  if (signals.length === 1) {
    return signalAsContext(signals[0]) + cohortLine;
  }
  const parts = signals.map((s, i) => `(${i + 1}) ${signalAsContext(s)}`);
  return `[BOSS conscience — ${signals.length} signals]\n` + parts.join('\n') + cohortLine;
}

function signalAsContext(s) {
  const moment = s.moment || 'attention';
  const loopId = s.loop_id || 'loop';
  // Per-moment phrasing — gives the model a starting frame; it composes the voice.
  // Voice lineage (v0.20.0+): leaning Fitzpatrick (talk-to-someone, plain language)
  // consistently. Indie-hacker persona caught the prior Fitzpatrick/Maurya mix; this
  // chooses the cohort-portable version.
  if (moment === 'caution') {
    return `[BOSS conscience — ${loopId} stalled · ${s.confidence} confidence] The ${loopId} is open (its upstream artifact exists) but its exit artifact does not. If — and only if — it fits this moment, surface BOSS's nudge in your own voice: name the drift in one spare line, ask *what they'd want to learn* before going further (or *who they'd ask first* — Fitzpatrick-style), and hand the decision back. Say it at most once; if you've already raised it this session or the user is clearly mid-other-work, stay silent. It's a nudge, never a gate.`;
  }
  if (moment === 'restraint') {
    return `[BOSS conscience — ${loopId} premature · ${s.confidence} confidence] The founder is reaching for ${loopId} but an upstream artifact is missing. If it fits the moment, surface BOSS's restraint nudge in your own voice: name what's missing in one line, offer to back up, hand the decision back. Never block.`;
  }
  if (moment === 'cost') {
    return `[BOSS conscience — ${loopId} unbudgeted · ${s.confidence} confidence] The code calls an LLM but no AI cost budget has been declared (or the cost-logger isn't wired). If it fits the moment, surface BOSS's nudge in your own voice: name that the bill exists in one line (the cohort decides the framing — first-product wants a number, vibe-virtuoso wants the inspect affordance, domain-expert wants the privacy posture), point at \`/ai-cost\`, hand the decision back. Never block.`;
  }
  if (moment === 'failure-mode') {
    return `[BOSS conscience — ${loopId} undesigned · ${s.confidence} confidence] The code calls an LLM but no failure-states design exists (no \`docs/ai-failure-states.md\` or no fallback handlers wired). The five failure modes always exist (garbage / refusal / hallucination / timeout / cost-spike); they just aren't designed yet. If it fits the moment, surface BOSS's nudge in your own voice: name that the failures are unmet in one line (cohort decides framing — first-product wants patterns named, eng-builder wants the unhandled-path lint angle, domain-expert wants the human-in-the-loop framing for high-stakes domains), point at \`/ai-failure-states\`, hand the decision back. Never block.`;
  }
  return `[BOSS conscience — ${loopId} (${moment}) · ${s.confidence} confidence] signal warrants attention.`;
}
