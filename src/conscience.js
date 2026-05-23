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

import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { loadLoops, classifyLoop } from '../stages/L0-quickstart/template/.claude/hooks/lib/loop-runtime.js';

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
  const overrides = readOverrides(projectDir);

  console.log(`\n  conscience state`);
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
