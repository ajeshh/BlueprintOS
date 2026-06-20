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

import { readFileSync, readdirSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
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
      feats.push({ id, title, status: fm.status, nextReview: fm.next_review });
    } else {
      ideas.push({ id, title, status: fm.status, nextReview: fm.next_review });
    }
  }

  // "Review due" is frontmatter-true, never guessed: an item carries an explicit
  // `next_review:` date (set when it was paused / by /revalidate) that has passed.
  // We deliberately do NOT infer staleness from age — a guessed signal would add
  // noise the founder learns to ignore. No date → not due. (IDEA-027.)
  const today = new Date().toISOString().slice(0, 10);
  const reviewDue = (nextReview, status) => {
    const s = (status || '').toLowerCase();
    if (s === 'shipped' || s === 'done' || s === 'killed') return false;
    const d = (nextReview || '').trim();
    return /^\d{4}-\d{2}-\d{2}$/.test(d) && d <= today; // YYYY-MM-DD lexical compare
  };

  const cards = [];
  for (const ft of feats) {
    cards.push({
      id: ft.id,
      title: ft.title,
      column: featColumn(ft.status),
      blocked: (ft.status || '').toLowerCase() === 'blocked',
      reviewDue: reviewDue(ft.nextReview, ft.status),
    });
  }
  for (const id of ideas) {
    // A promoted idea is represented by its FEAT card — don't double-count it.
    if (featSources.has(id.id)) continue;
    const hasRisk = files.includes(`${id.id}-canvas.md`)
      && riskiestNamed(readFileSync(join(ideasDir, `${id.id}-canvas.md`), 'utf8'));
    cards.push({
      id: id.id,
      title: id.title,
      column: ideaColumn(id.status, hasRisk),
      blocked: false,
      reviewDue: reviewDue(id.nextReview, id.status),
    });
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
        const flag = c.blocked ? '  · blocked' : c.reviewDue ? '  · ↻ review due' : '';
        lines.push(`    ${c.id.padEnd(10)} ${c.title}${flag}`);
      }
    }
    lines.push('');
  }

  // The trigger half of /revalidate: a paused item whose next_review date has
  // passed is surfaced here so the gate has something to fire on (IDEA-027).
  const due = cards.filter((c) => c.reviewDue).sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }));
  if (due.length) {
    lines.push(`  ↻ ${due.length} past review — run \`/revalidate ${due[0].id}\` (still relevant? still aligned? anything changed?)`);
    lines.push('');
  }

  lines.push('  The board is a read of the files. To change it, change the work:');
  lines.push('  `/triage` to capture · `/canvas` to pressure-test · `/spec` to build.');
  lines.push('');
  return lines.join('\n');
}

// --- Visual kanban (HTML) -------------------------------------------------
// Same projection as the terminal board, rendered as a self-contained HTML
// page (no server, no deps, no JS framework). "Updated when the board is" =
// re-run the command; the file is a pure projection of the files, exactly like
// the text board. Calm palette, not a startup-bro dashboard (voice-keeper).

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const COLUMN_HUE = {
  Captured: '#8a8f98',
  'Taking shape': '#b8862b',
  Building: '#2f6f4f',
  Shipped: '#3a5a9b',
};

export function renderBoardHtml(projectName, { cards, hasIdeasDir }, stampedAt) {
  const counts = Object.fromEntries(COLUMNS.map((c) => [c, 0]));
  for (const c of cards) counts[c.column] = (counts[c.column] || 0) + 1;
  const evidence = hasIdeasDir ? evidenceLine(counts, cards.length) : 'no docs/ideas/ here — is this a BOSS project?';
  const due = cards.filter((c) => c.reviewDue).sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }));

  const columnHtml = COLUMNS.map((col) => {
    const inCol = cards
      .filter((c) => c.column === col)
      .sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }));
    const cardsHtml = inCol.length
      ? inCol
          .map((c) => {
            const flag = c.blocked
              ? '<span class="flag blocked">blocked</span>'
              : c.reviewDue
                ? '<span class="flag review">↻ review due</span>'
                : '';
            return `<div class="card${c.blocked ? ' is-blocked' : c.reviewDue ? ' is-review' : ''}">
            <div class="id">${esc(c.id)}</div>
            <div class="title">${esc(c.title)}</div>${flag}
          </div>`;
          })
          .join('\n')
      : '<div class="empty">—</div>';
    return `<section class="col" style="--hue:${COLUMN_HUE[col]}">
        <h2>${esc(col)} <span class="n">${inCol.length}</span></h2>
        <div class="cards">${cardsHtml}</div>
      </section>`;
  }).join('\n');

  const dueBanner = due.length
    ? `<div class="due">↻ ${due.length} past review — run <code>/revalidate ${esc(due[0].id)}</code> (still relevant? still aligned? anything changed?)</div>`
    : '';

  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(projectName)} · board</title>
<style>
  :root { color-scheme: light dark; }
  * { box-sizing: border-box; }
  body { margin: 0; font: 15px/1.45 -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif;
         background: #fafafa; color: #1c1d21; padding: 28px 24px 48px; }
  @media (prefers-color-scheme: dark) { body { background: #111214; color: #e6e7ea; } }
  header { max-width: 1200px; margin: 0 auto 20px; }
  h1 { font-size: 18px; font-weight: 600; margin: 0 0 4px; }
  .evidence { color: #8a8f98; font-size: 13px; margin: 0; }
  .due { max-width: 1200px; margin: 0 auto 18px; padding: 9px 13px; border-radius: 8px;
         background: rgba(184,134,43,.12); color: #9a6a14; font-size: 13px; }
  @media (prefers-color-scheme: dark) { .due { color: #e0b35a; } }
  .due code { background: rgba(128,128,128,.18); padding: 1px 5px; border-radius: 4px; }
  .board { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
  @media (max-width: 760px) { .board { grid-template-columns: 1fr 1fr; } }
  .col h2 { font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: .04em;
            color: var(--hue); margin: 0 0 10px; padding-bottom: 7px; border-bottom: 2px solid var(--hue); }
  .col h2 .n { color: #b4b8c0; font-weight: 400; }
  .cards { display: flex; flex-direction: column; gap: 8px; }
  .card { background: #fff; border: 1px solid #e6e7ea; border-left: 3px solid var(--hue);
          border-radius: 7px; padding: 9px 11px; }
  @media (prefers-color-scheme: dark) { .card { background: #1b1c1f; border-color: #2a2c30; } }
  .card .id { font: 11px/1.2 ui-monospace, SFMono-Regular, Menlo, monospace; color: #9aa0a8; }
  .card .title { font-size: 13.5px; margin-top: 2px; }
  .card.is-review { border-left-color: #b8862b; }
  .card.is-blocked { border-left-color: #b3434a; }
  .flag { display: inline-block; margin-top: 6px; font-size: 11px; padding: 1px 7px; border-radius: 10px; }
  .flag.review { background: rgba(184,134,43,.15); color: #9a6a14; }
  .flag.blocked { background: rgba(179,67,74,.15); color: #b3434a; }
  .empty { color: #c2c6cc; font-size: 13px; padding: 4px 2px; }
  footer { max-width: 1200px; margin: 28px auto 0; color: #aab0b8; font-size: 12px; }
  footer code { background: rgba(128,128,128,.14); padding: 1px 5px; border-radius: 4px; }
</style></head>
<body>
  <header>
    <h1>${esc(projectName)} · board</h1>
    <p class="evidence">${esc(evidence)}</p>
  </header>
  ${dueBanner}
  <div class="board">
${columnHtml}
  </div>
  <footer>
    A read of the files — to change the board, change the work (<code>/triage</code> · <code>/canvas</code> · <code>/spec</code>).
    Re-run <code>boss board --html</code> to refresh.${stampedAt ? ` Generated ${esc(stampedAt)}.` : ''}
  </footer>
</body></html>
`;
}

export function board(projectDir, projectName) {
  const data = collectBoard(projectDir);
  console.log(renderBoardText(projectName, data));
}

// Write the visual kanban to .boss/board.html and return its path.
export function boardHtml(projectDir, projectName) {
  const data = collectBoard(projectDir);
  const stampedAt = new Date().toISOString().slice(0, 16).replace('T', ' ');
  const html = renderBoardHtml(projectName, data, stampedAt);
  const dir = join(projectDir, '.boss');
  const out = join(dir, 'board.html');
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(out, html);
  return out;
}
