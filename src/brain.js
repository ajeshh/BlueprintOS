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

// The recency window: how many dated reads we keep verbatim before suggesting
// the founder evict or /close compress. Living memory ≠ infinite memory — an
// unbounded read.md is the bloat the conscience itself warns against.
const BRAIN_WINDOW = 8;

// Split read.md into dated blocks (`## YYYY-MM-DD ...`). Anything before the
// first dated header is preamble (a standing summary) and is never auto-evicted.
// Format-based only — the CLI owns block boundaries; the model owns the content.
function parseDatedBlocks(read) {
  const lines = read.split('\n');
  const blocks = [];
  let preamble = [];
  let cur = null;
  const dateRe = /^##\s+(\d{4}-\d{2}-\d{2})\b/;
  for (const l of lines) {
    const m = l.match(dateRe);
    if (m) {
      if (cur) blocks.push(cur);
      cur = { date: m[1], lines: [l] };
    } else if (cur) {
      cur.lines.push(l);
    } else {
      preamble.push(l);
    }
  }
  if (cur) blocks.push(cur);
  return { preamble: preamble.join('\n').replace(/\s+$/, ''), blocks };
}

// `boss brain --diff` — the evolution of the read over time (date + headline per
// session, from the index). Continuity made visible: how the conscience's read
// changed session to session, without dumping the whole prose.
export function renderBrainDiff(projectDir, stamp) {
  const lines = [`\n  ${stamp.name} · brain · how the read evolved`, ''];
  const idx = readIndex(projectDir);
  if (!idx.entries.length) {
    // Fall back to dated-block headers if the index is empty but prose exists.
    const rf = readPath(projectDir);
    const blocks = existsSync(rf) ? parseDatedBlocks(readFileSync(rf, 'utf8')).blocks : [];
    if (!blocks.length) {
      lines.push('  Nothing recorded yet — the conscience writes its first read at /close.', '');
      return lines.join('\n');
    }
    for (const b of blocks) lines.push(`  ${b.date}`);
    lines.push('');
    return lines.join('\n');
  }
  for (const e of idx.entries) {
    lines.push(`  ${dim(e.ts.slice(0, 10))}  ${e.headline}`);
  }
  lines.push('');
  lines.push(`  ${dim('the full prose is `boss brain`; evict old reads with `boss brain forget --before <date>`')}`);
  lines.push('');
  return lines.join('\n');
}

// `boss brain forget --before <YYYY-MM-DD>` (or `forget <id>`) — the EVICT side of
// living memory. Founder-invoked, never automatic (it records an opinion about a
// person — only the human prunes it). Drops dated blocks older than the date from
// read.md AND the matching index entries, keeping the preamble + recent reads.
export function forgetBrain(projectDir, { before, id } = {}) {
  const rf = readPath(projectDir);
  const idx = readIndex(projectDir);
  let evictedBlocks = 0;
  let evictedEntries = 0;

  if (id) {
    const keep = idx.entries.filter((e) => e.id !== id);
    evictedEntries = idx.entries.length - keep.length;
    idx.entries = keep;
    writeIndex(projectDir, idx);
    return { evictedBlocks, evictedEntries, mode: `entry ${id}` };
  }

  if (!before || !/^\d{4}-\d{2}-\d{2}$/.test(before)) {
    throw new Error('usage: boss brain forget --before <YYYY-MM-DD>   (or: forget --id <bN>)');
  }

  if (existsSync(rf)) {
    const { preamble, blocks } = parseDatedBlocks(readFileSync(rf, 'utf8'));
    const kept = blocks.filter((b) => b.date >= before); // lexical YYYY-MM-DD compare
    evictedBlocks = blocks.length - kept.length;
    const body = [preamble, ...kept.map((b) => b.lines.join('\n').replace(/\s+$/, ''))]
      .filter(Boolean).join('\n\n') + '\n';
    writeFileSync(rf, body);
  }
  const keptEntries = idx.entries.filter((e) => e.ts.slice(0, 10) >= before);
  evictedEntries = idx.entries.length - keptEntries.length;
  idx.entries = keptEntries;
  writeIndex(projectDir, idx);
  return { evictedBlocks, evictedEntries, mode: `before ${before}` };
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
  // Recency-window gate — living memory, not infinite memory. When the read spans
  // many sessions, nudge toward compression (model, at /close) or eviction (founder).
  const blockCount = parseDatedBlocks(read).blocks.length;
  if (blockCount > BRAIN_WINDOW) {
    lines.push(`  ${dim(`the read spans ${blockCount} sessions — \`boss brain forget --before <date>\` to evict old ones, or let /close compress`)}`);
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
  if (sub === 'forget') {
    const flags = {};
    for (let i = 0; i < rest.length; i++) {
      if (rest[i].startsWith('--')) { flags[rest[i].slice(2)] = rest[i + 1]; i++; }
    }
    const r = forgetBrain(projectDir, { before: flags.before, id: flags.id });
    console.log(`\n  ✦ Brain pruned (${r.mode}) — ${r.evictedBlocks} read(s) + ${r.evictedEntries} index entr${r.evictedEntries === 1 ? 'y' : 'ies'} evicted`);
    console.log(`    ${dim('the preamble + recent reads are kept; this is yours to do, never automatic')}\n`);
    return;
  }
  if (sub === '--diff' || args.includes('--diff')) {
    console.log(renderBrainDiff(projectDir, stamp));
    return;
  }
  if (sub) {
    console.error(`  boss: unknown subcommand 'brain ${sub}'. options: (none) | --diff | record | forget`);
    process.exitCode = 1;
    return;
  }
  console.log(renderBrain(projectDir, stamp));
}
