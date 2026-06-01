// boss board — a live read of what's in flight, derived entirely from files
// that already exist. NOT a maintained document: the founder never edits the
// board, they change the work (IDEA/FEAT/canvas) and the board re-renders.
//
// Design decisions (IDEA-015), held deliberately:
// - Frontmatter is truth. We read each IDEA-*/FEAT-* file's `status`, never
//   docs/ideas/INDEX.md — INDEX is itself a hand-maintained table that can
//   drift from the files. A board that trusts a drifting source lies.
// - Pure projection. No `.boss/board.json`, no second source of truth, nothing
//   to keep in sync. Concurrent / out-of-order edits can't corrupt a render.
// - The riskiest assumption sits ABOVE the columns (humane-lens override):
//   "motion but no evidence" must be more visible here than in a normal kanban,
//   not less. Empty columns are shown, not hidden — the empty cell is the
//   diagnostic.

import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

// The flow, left to right. BOSS's own vocabulary, surfaced as plain words.
const COLUMNS = ['Captured', 'Taking shape', 'Building', 'Shipped'];

// Parse the first `--- ... ---` frontmatter block. Zero-dep, tolerant of the
// flat `key: value` frontmatter BOSS's templates use.
function frontmatter(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return {};
  const out = {};
  for (const line of m[1].split('\n')) {
    const i = line.indexOf(':');
    if (i === -1) continue;
    const k = line.slice(0, i).trim();
    if (k) out[k] = line.slice(i + 1).trim();
  }
  return out;
}

function firstHeading(text) {
  const m = text.match(/^#\s+(.+)$/m);
  return m ? m[1].trim() : '';
}

// A title we'd actually want on a card. Drops template placeholders
// ("<Title — one plain line>") and a leading "FEAT-NNN —" if the heading
// repeats the id. Falls back to the id.
function cardTitle(heading, id) {
  let t = (heading || '').trim();
  if (!t || t.startsWith('<')) return id;
  t = t.replace(/^(IDEA|FEAT|EXTR)-\d+\s*[—:-]\s*/i, '').trim();
  if (t.length > 52) t = t.slice(0, 51).trimEnd() + '…';
  return t || id;
}

// Is the canvas's riskiest assumption actually named, or still the placeholder?
// Mirrors the conscience hook's read: the line is
// `- **Riskiest assumption:** <text or _(placeholder)_>`.
function riskiestNamed(canvasText) {
  const m = canvasText.match(/Riskiest assumption:\*\*\s*(.*)/);
  if (!m) return false;
  const v = m[1].trim();
  if (!v) return false;
  if (v.startsWith('_')) return false; // italic placeholder _(…)_
  return true;
}

function ideaColumn(status, hasRisk) {
  const s = (status || '').toLowerCase();
  if (s === 'shipped') return 'Shipped';
  if (s === 'building') return 'Building'; // promoted but no FEAT file yet
  if (hasRisk) return 'Taking shape';
  return 'Captured';
}

function featColumn(status) {
  const s = (status || '').toLowerCase();
  if (s === 'shipped' || s === 'done') return 'Shipped';
  return 'Building'; // building / drafting / blocked — all in-flight
}

// Build the card list from the project's docs/ideas directory. Returns
// { cards: [{id, title, column, blocked}], hasIdeasDir }.
export function collectBoard(projectDir) {
  const ideasDir = join(projectDir, 'docs', 'ideas');
  if (!existsSync(ideasDir)) return { cards: [], hasIdeasDir: false };

  const files = readdirSync(ideasDir).filter((f) => f.endsWith('.md'));
  const feats = [];
  const ideas = [];
  const featSources = new Set(); // IDEA ids a FEAT was promoted from

  for (const f of files) {
    if (f === 'INDEX.md' || f === 'CANVAS.md') continue;
    if (f.includes('-canvas')) continue; // canvas files are state, not cards
    const text = readFileSync(join(ideasDir, f), 'utf8');
    const fm = frontmatter(text);
    const id = fm.id || f.replace(/\.md$/, '');
    const title = cardTitle(firstHeading(text), id);
    if (/^FEAT/i.test(id)) {
      if (fm.source) featSources.add(fm.source);
      feats.push({ id, title, status: fm.status });
    } else {
      ideas.push({ id, title, status: fm.status });
    }
  }

  const cards = [];
  for (const ft of feats) {
    cards.push({
      id: ft.id,
      title: ft.title,
      column: featColumn(ft.status),
      blocked: (ft.status || '').toLowerCase() === 'blocked',
    });
  }
  for (const id of ideas) {
    // A promoted idea is represented by its FEAT card — don't double-count it.
    if (featSources.has(id.id)) continue;
    const hasRisk = files.includes(`${id.id}-canvas.md`)
      && riskiestNamed(readFileSync(join(ideasDir, `${id.id}-canvas.md`), 'utf8'));
    cards.push({ id: id.id, title: id.title, column: ideaColumn(id.status, hasRisk), blocked: false });
  }

  // Stable, readable order: by id within each column (handled at render time).
  return { cards, hasIdeasDir: true };
}

// The line that sits above the columns. Plain and factual — never gamified
// (voice-keeper). When there's motion but nothing pressure-tested, it says so:
// that's the humane point of the surface.
function evidenceLine(counts, total) {
  if (total === 0) return 'Nothing captured yet — `/triage <thought>` starts the board.';
  if (counts.Captured > 0 && counts['Taking shape'] === 0 && counts.Building === 0) {
    const n = counts.Captured;
    return `${n} captured, nothing pressure-tested yet — what would you learn first? (\`/canvas\`)`;
  }
  return COLUMNS
    .map((c) => `${counts[c]} ${c.toLowerCase()}`)
    .join(' · ');
}

export function renderBoardText(projectName, { cards, hasIdeasDir }) {
  const lines = [];
  lines.push('');
  lines.push(`  ${projectName} · board`);

  const counts = Object.fromEntries(COLUMNS.map((c) => [c, 0]));
  for (const c of cards) counts[c.column] = (counts[c.column] || 0) + 1;

  lines.push(`  ▸ ${evidenceLine(counts, cards.length)}`);
  lines.push('');

  if (!hasIdeasDir) {
    lines.push('  (no docs/ideas/ here — is this a BOSS project?)');
    lines.push('');
    return lines.join('\n');
  }

  for (const col of COLUMNS) {
    const inCol = cards
      .filter((c) => c.column === col)
      .sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }));
    lines.push(`  ${col} (${inCol.length})`);
    if (!inCol.length) {
      lines.push('    —');
    } else {
      for (const c of inCol) {
        const flag = c.blocked ? '  · blocked' : '';
        lines.push(`    ${c.id.padEnd(10)} ${c.title}${flag}`);
      }
    }
    lines.push('');
  }

  lines.push('  The board is a read of the files. To change it, change the work:');
  lines.push('  `/triage` to capture · `/canvas` to pressure-test · `/spec` to build.');
  lines.push('');
  return lines.join('\n');
}

export function board(projectDir, projectName) {
  const data = collectBoard(projectDir);
  console.log(renderBoardText(projectName, data));
}
