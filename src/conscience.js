// Conscience-state inspect for the BOSS CLI (v0.20.0+).
//
// Human-readable surface for what the conscience hook does machine-readably.
// Loads docs/loops/*.md in the current project, classifies each loop, formats
// open/closed/unopenable + what would close the open ones + any recent
// overrides recorded in the devlog. Asked-for by eng-builder / indie-hacker /
// vibe-virtuoso personas (v0.19 reactions) — "I want to see what fired and why."
//
// The runtime is the same one the hook uses — imported from the Quickstart
// template's hook lib so there's one source of truth. The path is awkward but
// the alternative (duplicating ~250 lines) is worse.

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { loadLoops, classifyLoop, readPauseState } from '../stages/L0-quickstart/template/.claude/hooks/lib/loop-runtime.js';

// Parse a duration spec for `boss conscience pause --for <spec>`.
// Accepted: <N>m / <N>h / <N>d (minutes / hours / days). Returns ms or throws.
function parseDuration(spec) {
  const m = String(spec).match(/^(\d+)([mhd])$/);
  if (!m) throw new Error(`bad duration: '${spec}'. Use 30m, 8h, or 2d.`);
  const n = parseInt(m[1], 10);
  const mult = { m: 60e3, h: 3600e3, d: 86400e3 }[m[2]];
  return n * mult;
}

function readConfigOrFail(projectDir) {
  const f = join(projectDir, '.boss', 'config.json');
  if (!existsSync(f)) {
    throw new Error('not a BOSS project (no .boss/config.json here).');
  }
  return { path: f, cfg: JSON.parse(readFileSync(f, 'utf8')) };
}

function writeConfig(path, cfg) {
  writeFileSync(path, JSON.stringify(cfg, null, 2) + '\n');
}

// `boss conscience pause [--for <duration> | --until-resume] [--reason "..."]`
// Default duration: 8h. Records the pause in `.boss/config.json` per IDEA-011's
// fractal-override discipline (the IDEA-008 override grammar applied at the
// session level instead of per-loop).
export function consciencePause(flags) {
  const { path, cfg } = readConfigOrFail(process.cwd());
  const reason = typeof flags.reason === 'string' ? flags.reason : '';

  let expires = null;
  if (flags['until-resume']) {
    expires = null;
  } else {
    const spec = typeof flags.for === 'string' ? flags.for : '8h';
    const ms = parseDuration(spec);
    expires = new Date(Date.now() + ms).toISOString();
  }

  cfg.conscience = {
    mode: 'paused',
    since: new Date().toISOString(),
    expires,
    reason,
  };
  writeConfig(path, cfg);

  console.log(`\n  ✦ Conscience paused.`);
  if (expires) {
    console.log(`    auto-resumes: ${expires}`);
  } else {
    console.log(`    no expiry — \`boss conscience resume\` to end.`);
  }
  if (reason) console.log(`    reason: ${reason}`);
  console.log('');
}

// `boss conscience resume` — explicit un-pause. (Also happens automatically when
// the recorded expiry passes, via the hook's auto-clear.)
export function conscienceResume() {
  const { path, cfg } = readConfigOrFail(process.cwd());
  if (!cfg.conscience || cfg.conscience.mode !== 'paused') {
    console.log('\n  Conscience is already active.\n');
    return;
  }
  cfg.conscience = { mode: 'active' };
  writeConfig(path, cfg);
  console.log(`\n  ✦ Conscience resumed.\n`);
}

// Read the optional cohort declaration from .boss/config.json. Returns null if
// no config or no cohort field — Claude composes the conscience voice generically
// when cohort is null.
function readCohort(projectDir) {
  const f = join(projectDir, '.boss', 'config.json');
  if (!existsSync(f)) return null;
  try {
    const cfg = JSON.parse(readFileSync(f, 'utf8'));
    return cfg.cohort || null;
  } catch { return null; }
}

// Recent override entries in docs/devlog.md, per IDEA-008's grammar:
//   - **OVERRIDE:** <action> `<loop-id>` — rationale: <text>
function readOverrides(projectDir) {
  const f = join(projectDir, 'docs', 'devlog.md');
  if (!existsSync(f)) return [];
  try {
    const lines = readFileSync(f, 'utf8').split('\n');
    const re = /^- \*\*OVERRIDE:\*\*\s+(\w+)\s+`([^`]+)`\s+—\s+rationale:\s+(.+)$/;
    return lines.map((l) => l.match(re))
      .filter(Boolean)
      .map((m) => ({ action: m[1], loop: m[2], rationale: m[3].trim() }));
  } catch { return []; }
}

// Render a single closed-loop predicate result as a one-line "what's needed."
function exitSummary(result) {
  const e = result.evidence || {};
  if (typeof e.count === 'number' && typeof e.min === 'number') {
    return `count: ${e.count} / threshold: ${e.min}${e.count >= e.min ? ' (met)' : ` (need ${e.min - e.count} more)`}`;
  }
  if (typeof e.matched_files === 'number') {
    return `${e.matched_files} / ${e.total_files} file(s) match`;
  }
  if (e.type === 'exists') {
    return `expects: ${e.path}`;
  }
  return JSON.stringify(e);
}

export function statusConscience(projectDir = process.cwd()) {
  const loops = loadLoops(projectDir);
  if (loops.length === 0) {
    console.log('\n  No loops in this project — `docs/loops/` is empty or absent.');
    console.log('  Quickstart loops install via `boss new` or `boss sync --apply`.\n');
    return;
  }

  const cohort = readCohort(projectDir);
  const pause = readPauseState(projectDir);
  const overrides = readOverrides(projectDir);

  console.log(`\n  conscience state`);
  // Pause state surfaces FIRST and LOUDLY when active (IDEA-011 v0.23.0+) — a
  // founder who paused the conscience needs to remember they did, otherwise the
  // pause silently lingers and the override discipline gets less honest.
  if (pause && pause.mode === 'paused') {
    const expired = pause.expires && new Date(pause.expires) <= new Date();
    if (expired) {
      console.log(`    ⏸ PAUSED  (EXPIRED — will auto-resume on next prompt)`);
    } else {
      console.log(`    ⏸ PAUSED`);
      if (pause.since) console.log(`       since:        ${pause.since}`);
      if (pause.expires) {
        console.log(`       auto-resumes: ${pause.expires}`);
      } else {
        console.log(`       no expiry —  \`boss conscience resume\` to end`);
      }
      if (pause.reason) console.log(`       reason:       ${pause.reason}`);
    }
    console.log('');
  }
  console.log(`    cohort:  ${cohort ? cohort : '(unspecified — set via `/boss` or edit .boss/config.json)'}`);
  console.log('');

  // Sort: open first (they need attention), then closed, then unopenable.
  const classified = loops.map((l) => ({ loop: l, ...classifyLoop(l, projectDir) }));
  const order = { open: 0, closed: 1, unopenable: 2 };
  classified.sort((a, b) => order[a.state] - order[b.state]);

  for (const { loop, state, entry, exit } of classified) {
    const mark = state === 'closed' ? '✓' : state === 'open' ? '⚠' : '·';
    const padded = loop.id.padEnd(22);
    let line2;
    if (state === 'closed') {
      line2 = '    closed — exit artifact present.';
    } else if (state === 'open') {
      const unmetEntry = (entry.results || []).filter((r) => !r.ok);
      const unmetExit = (exit.results || []).filter((r) => !r.ok);
      const summaries = unmetExit.map(exitSummary).join('; ') || 'exit artifact missing';
      line2 = `    open  — would close when: ${summaries}`;
      if (unmetEntry.length === 0 && loop.drift_moment) {
        line2 += `\n              drift moment: ${loop.drift_moment}`;
      }
    } else {
      line2 = '    unopenable — entry artifact not yet present (upstream dependency).';
    }
    console.log(`    ${mark} ${padded}  ${state}`);
    console.log(line2);
  }

  console.log('');
  if (overrides.length === 0) {
    console.log('    No recorded overrides in docs/devlog.md.');
  } else {
    console.log(`    Recent overrides (${overrides.length}):`);
    for (const o of overrides.slice(-5)) {
      console.log(`      • ${o.action} \`${o.loop}\` — ${o.rationale}`);
    }
  }
  console.log('');
}
