import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { listProjects } from './registry.js';
import { bossVersion, STAGE_ORDER } from './paths.js';

// `boss insights` — the honest-trace lens (IDEA-021).
//
// Reads the trace your own work already leaves — your registered projects, on THIS machine —
// and reports where each venture's loop stands: idea → canvas → build → graduation. It measures
// *graduation and loop-closure*, never activity/engagement (that's the vanity metric BOSS refuses
// to expose). Nothing is sent anywhere; cross-user learning is opt-in only (shareUp). This is the
// humane half of "learn how it's used": read the trace, don't instrument the human.

const DAY = 86400000;

// Count IDEA-*.md docs and how many have been pressure-tested (carry a canvas), plus any FEAT-*.md
// (a feature in build = graduation past the canvas gate). Reads files; never writes.
function readProjectTrace(dir) {
  const ideasDir = join(dir, 'docs', 'ideas');
  let ideas = 0, canvassed = 0, features = 0, newest = 0;
  const seenCanvas = existsSync(join(dir, 'docs', 'ideas', 'CANVAS.md'));
  if (existsSync(ideasDir)) {
    for (const f of readdirSync(ideasDir)) {
      if (!f.endsWith('.md')) continue;
      const full = join(ideasDir, f);
      let mtime = 0;
      try { mtime = statSync(full).mtimeMs; } catch { /* skip */ }
      if (mtime > newest) newest = mtime;
      if (/^IDEA-\d+/.test(f)) {
        ideas++;
        try {
          if (/canvas/i.test(readFileSync(full, 'utf8'))) canvassed++;
        } catch { /* unreadable — don't guess */ }
      } else if (/^FEAT-\d+/.test(f)) {
        features++;
      }
    }
  }
  if (seenCanvas && canvassed === 0) canvassed = 1;
  return { ideas, canvassed, features, newest };
}

// One honest read on where a project's loop stands. Returns null if the project is gone from disk.
function assess(p, nowMs) {
  if (!p.path || !existsSync(p.path)) return { ...p, missing: true };
  const stampFile = join(p.path, '.boss', 'manifest.json');
  let stamp = null;
  if (existsSync(stampFile)) {
    try { stamp = JSON.parse(readFileSync(stampFile, 'utf8')); } catch { /* tolerate */ }
  }
  const t = readProjectTrace(p.path);
  const depth = (stamp?.installedLayers || []).length || 1;
  const lastTouch = t.newest || (stamp?.createdAt ? Date.parse(stamp.createdAt) : 0);
  const ageDays = lastTouch ? Math.floor((nowMs - lastTouch) / DAY) : null;

  // Loop-closure signal — NOT activity. Where did the venture get stuck, if anywhere?
  let signal = 'flowing', note = '';
  if (t.ideas === 0 && t.features === 0) {
    signal = 'empty'; note = 'nothing captured yet — point /boss or /import at your idea';
  } else if (t.canvassed === 0 && t.features === 0) {
    signal = 'untested';
    note = `captured, never pressure-tested${ageDays != null ? ` (${ageDays}d)` : ''} — try /canvas`;
  } else if (ageDays != null && ageDays >= 14) {
    signal = 'stale'; note = `no movement in ${ageDays}d`;
  } else {
    signal = 'flowing'; note = '';
  }
  return {
    ...p, missing: false,
    mode: stamp?.mode || p.mode || p.stage || '?',
    pin: stamp?.bossVersion || p.bossVersion || '?',
    depth, ideas: t.ideas, canvassed: t.canvassed, features: t.features, ageDays, signal, note,
  };
}

const MARK = { flowing: '✓', untested: '⚠', empty: '⚠', stale: '·', missing: '·' };

export function insights(cwd) {
  const nowMs = Date.now();
  const projects = listProjects();
  if (!projects.length) {
    console.log('\n  No projects registered yet. Run `boss new <name>` to start one.\n');
    return;
  }

  const rows = projects.map((p) => assess(p, nowMs)).filter((r) => !r.missing);
  const gone = projects.length - rows.length;
  const current = bossVersion();

  console.log(`\n  insights · your BOSS portfolio        (local · nothing sent)\n`);
  console.log(`  ${rows.length} project(s) on this machine${gone ? `  (+${gone} registered but not on disk)` : ''}`);

  // Graduation distribution across the mode ladder — the real "how far have ventures gotten".
  const byMode = {};
  for (const r of rows) byMode[r.mode] = (byMode[r.mode] || 0) + 1;
  const ladder = STAGE_ORDER.map((s) => s.replace(/^L\d+-/, '')).map((label) => {
    const k = Object.keys(byMode).find((m) => m.toLowerCase().startsWith(label.slice(0, 4).toLowerCase()));
    return `${label} ${k ? byMode[k] : 0}`;
  }).join(' · ');
  const behind = rows.filter((r) => r.pin !== current).length;
  console.log(`    graduation:  ${ladder}`);
  console.log(`    pins:        ${rows.length - behind} current · ${behind} behind${behind ? '  (run /boss-sync there)' : ''}`);

  console.log(`\n  where each loop stands — idea → canvas → build`);
  for (const r of rows) {
    const here = cwd && r.path === cwd ? ' (here)' : '';
    const stat = `${r.ideas} idea${r.ideas === 1 ? '' : 's'} · ${r.canvassed} canvassed${r.features ? ` · ${r.features} building` : ''}`;
    console.log(`    ${MARK[r.signal] || ' '} ${String(r.name + here).padEnd(20)} ${String(r.mode).padEnd(11)} ${stat}`);
    if (r.note) console.log(`      ${''.padEnd(22)}${r.note}`);
  }

  console.log(`\n  Measures graduation, not activity (idea→canvas→build→ship).`);
  console.log(`  Local-only. Cross-user learning is opt-in (shareUp); send something deliberately with /feedback.\n`);
}
