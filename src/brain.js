// boss brain — the venture brain's CLI surface (FEAT-022, the IDEA-022 spine).
//
// The brain is the conscience's persistent, first-person *read on the venture* —
// what makes continuity (and "feels like its own AI") real. Two homes, one
// owner each (mentor-architect's hard split, docs/architecture/venture-brain.md):
//
//   .boss/brain/read.md    model-owned. The POV, in plain English, sectioned by
//                          date. The conscience writes it at /close; the founder
//                          can read and correct it. Markdown is the TRUST
//                          mechanism — this is the one surface that records an
//                          opinion about the person, so it must be inspectable.
//   .boss/brain/index.json CLI-owned. A thin ledger over the prose so the CLI can
//                          stamp/diff/gate WITHOUT parsing the read. Nothing
//                          semantic lives here — just {id, ts, headline}.
//
// This module is layer-1 (IDEA-006): zero-dep, host-agnostic, deterministic. It
// never calls a model. The *writing* of the read is the model's job (the /close
// skill), and it calls `boss brain record` to keep the index honest rather than
// hand-writing JSON. v1 ships `boss brain` (read) + `record` (the write-stamp the
// skill needs); `--diff` / `--forget` are the next increment, per the v1 line in
// the architecture note.

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const dim = (s) => (process.stdout.isTTY ? `\x1b[90m${s}\x1b[0m` : s);

function brainDir(projectDir) {
  return join(projectDir, '.boss', 'brain');
}
function readPath(projectDir) {
  return join(brainDir(projectDir), 'read.md');
}
function indexPath(projectDir) {
  return join(brainDir(projectDir), 'index.json');
}

function freshIndex() {
  return { version: 1, created: new Date().toISOString(), last_write_ts: null, next_seq: 1, entries: [] };
}

function readIndex(projectDir) {
  const f = indexPath(projectDir);
  if (!existsSync(f)) return freshIndex();
  try {
    const idx = JSON.parse(readFileSync(f, 'utf8'));
    // Tolerate a hand-edited or older index — fill the shape, don't throw.
    return { ...freshIndex(), ...idx, entries: Array.isArray(idx.entries) ? idx.entries : [] };
  } catch {
    return freshIndex();
  }
}

function writeIndex(projectDir, idx) {
  mkdirSync(brainDir(projectDir), { recursive: true });
  writeFileSync(indexPath(projectDir), JSON.stringify(idx, null, 2) + '\n');
}

// `boss brain record --headline "..."` — append one index entry. Called by the
// /close skill AFTER it writes the dated prose block into read.md, so the index
// stays a truthful ledger of the read without the model hand-authoring JSON.
// Returns the entry. The prose is the model's; the index integrity is the CLI's.
export function recordBrainEntry(projectDir, { headline, id } = {}) {
  const h = (headline || '').trim();
  if (!h) throw new Error('usage: boss brain record --headline "<one-line summary of the read>"');
  const idx = readIndex(projectDir);
  const ts = new Date().toISOString();
  const entry = { id: id || `b${idx.next_seq}`, ts, headline: h };
  idx.entries.push(entry);
  idx.next_seq = (idx.next_seq || idx.entries.length) + 1;
  idx.last_write_ts = ts;
  writeIndex(projectDir, idx);
  return entry;
}

// Render the brain for `boss brain`. A pure read of read.md + a one-line ledger
// footer from the index. Empty-state is honest: the brain is thin until the
// conscience has lived a few sessions with you (the anti-fortune-cookie posture).
export function renderBrain(projectDir, stamp) {
  const lines = [];
  lines.push('');
  lines.push(`  ${stamp.name} · brain`);
  lines.push(`  ${dim('the conscience\'s read on this venture — its POV, not the facts (canvas/RESUME hold those)')}`);
  lines.push('');

  const rf = readPath(projectDir);
  if (!existsSync(rf)) {
    lines.push('  The brain is empty — the conscience hasn\'t formed a read yet.');
    lines.push('  It writes one at /close, once there\'s a session of work to look at.');
    lines.push(`  ${dim('Nothing to show after 0 sessions. This is the honest empty state, not a bug.')}`);
    lines.push('');
    return lines.join('\n');
  }

  const read = readFileSync(rf, 'utf8').replace(/\s+$/, '');
  for (const l of read.split('\n')) lines.push(`  ${l}`);
  lines.push('');

  const idx = readIndex(projectDir);
  const n = idx.entries.length;
  if (n) {
    const last = idx.last_write_ts ? idx.last_write_ts.slice(0, 10) : '—';
    lines.push(`  ${dim(`${n} entr${n === 1 ? 'y' : 'ies'} · last written ${last}`)}`);
  }
  lines.push(`  ${dim('This is yours to correct — edit .boss/brain/read.md if the read is wrong.')}`);
  lines.push('');
  return lines.join('\n');
}

// `boss brain [record --headline "..."]`
export function brain(projectDir, stamp, args = []) {
  const [sub, ...rest] = args;
  if (sub === 'record') {
    const flags = {};
    for (let i = 0; i < rest.length; i++) {
      if (rest[i].startsWith('--')) { flags[rest[i].slice(2)] = rest[i + 1]; i++; }
    }
    const entry = recordBrainEntry(projectDir, { headline: flags.headline, id: flags.id });
    console.log(`\n  ✦ Brain entry recorded — ${entry.id}`);
    console.log(`    ${entry.headline}`);
    console.log(`    ${dim('(the prose lives in .boss/brain/read.md; this stamps the index)')}\n`);
    return;
  }
  if (sub) {
    console.error(`  boss: unknown subcommand 'brain ${sub}'. options: (none) | record`);
    process.exitCode = 1;
    return;
  }
  console.log(renderBrain(projectDir, stamp));
}
