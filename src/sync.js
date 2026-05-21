import {
  readFileSync, writeFileSync, existsSync, mkdirSync,
} from 'node:fs';
import { join, dirname } from 'node:path';
import {
  STAGES_DIR, bossVersion, resolveStageId,
} from './paths.js';
import { readStageManifest } from './scaffold.js';

// Resolve a possibly-stale layer id (e.g. an old "L0-sketch" pin) to the
// canonical current stage id by its level prefix. Returns undefined if it
// can't be mapped at all.
export function canonicalLayer(layerId) {
  return (
    resolveStageId(layerId) ||
    resolveStageId((String(layerId).match(/^l\d+/i) || [])[0]) ||
    undefined
  );
}

// The files BOSS manages for a stage: one .md per agent, one SKILL.md per skill.
// Each entry maps a source template file → its path inside the project.
function managedFiles(stageId, manifest) {
  const base = join(STAGES_DIR, stageId, 'template', '.claude');
  const out = [];
  for (const a of manifest.agents || []) {
    out.push({
      kind: 'agent',
      name: a,
      src: join(base, 'agents', `${a}.md`),
      rel: join('.claude', 'agents', `${a}.md`),
    });
  }
  for (const s of manifest.skills || []) {
    out.push({
      kind: 'skill',
      name: s,
      src: join(base, 'skills', s, 'SKILL.md'),
      rel: join('.claude', 'skills', s, 'SKILL.md'),
    });
  }
  return out;
}

function substitute(body, vars) {
  for (const [k, v] of Object.entries(vars)) body = body.replaceAll(`{{${k}}}`, v);
  return body;
}

// A cheap, dependency-free change signal: how many lines differ between two
// versions (positional compare + length delta). Enough to flag a file as worth
// reviewing; the /boss-sync skill does the real side-by-side read.
function lineDelta(oldText, newText) {
  const a = oldText.split('\n');
  const b = newText.split('\n');
  let diff = Math.abs(a.length - b.length);
  for (let i = 0; i < Math.min(a.length, b.length); i++) {
    if (a[i] !== b[i]) diff++;
  }
  return diff;
}

// Compute what a sync would do for a project, without writing anything.
// Returns { entries, layers, pin, current, drift }.
export function planSync(projectDir, stamp) {
  const current = bossVersion();
  const vars = {
    PROJECT_NAME: stamp.name,
    DATE: new Date().toISOString().slice(0, 10),
    BOSS_VERSION: current,
  };

  // Canonicalize + dedupe the installed layers, preserving order.
  const layers = [];
  for (const raw of stamp.installedLayers || [stamp.stage]) {
    const c = canonicalLayer(raw);
    if (c && !layers.includes(c)) layers.push(c);
  }

  const entries = [];
  for (const stageId of layers) {
    let manifest;
    try {
      manifest = readStageManifest(stageId);
    } catch {
      continue; // stage not authored in this BOSS version — skip
    }
    for (const f of managedFiles(stageId, manifest)) {
      if (!existsSync(f.src)) continue; // manifest lists it but template lacks it
      const next = substitute(readFileSync(f.src, 'utf8'), {
        ...vars, STAGE: stageId, MODE: manifest.name,
      });
      const dest = join(projectDir, f.rel);
      const exists = existsSync(dest);
      const cur = exists ? readFileSync(dest, 'utf8') : '';
      let status = 'ok';
      if (!exists) status = 'new';
      else if (cur !== next) status = 'changed';
      entries.push({ ...f, stageId, status, next, delta: exists ? lineDelta(cur, next) : 0 });
    }
  }

  return {
    entries,
    layers,
    pin: stamp.bossVersion,
    current,
    drift: stamp.bossVersion !== current,
  };
}

// Apply a plan: write new/changed files and return the canonicalized stamp
// fields the caller should persist (it owns writeStamp + registry).
export function applySync(projectDir, plan, stamp) {
  const written = [];
  for (const e of plan.entries) {
    if (e.status === 'ok') continue;
    const dest = join(projectDir, e.rel);
    mkdirSync(dirname(dest), { recursive: true });
    writeFileSync(dest, e.next);
    written.push(e);
  }

  // Reconcile the stamp to current canonical layers + the union of their
  // agents/skills, and bump the pin. Mode/stage track the most-mature layer.
  const agents = new Set();
  const skills = new Set();
  for (const stageId of plan.layers) {
    try {
      const m = readStageManifest(stageId);
      (m.agents || []).forEach((a) => agents.add(a));
      (m.skills || []).forEach((s) => skills.add(s));
    } catch { /* skip unauthored */ }
  }
  const top = plan.layers[plan.layers.length - 1];
  let topMode = stamp.mode;
  try { topMode = readStageManifest(top).name; } catch { /* keep */ }

  return {
    written,
    stamp: {
      ...stamp,
      stage: top,
      mode: topMode,
      installedLayers: plan.layers,
      agents: [...agents],
      skills: [...skills],
      bossVersion: plan.current,
    },
  };
}
