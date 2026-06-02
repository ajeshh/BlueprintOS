// Shared mode + skill metadata — the SINGLE source both `boss map` (live, in a
// founder's project) and scripts/gen-docs.js (static, in the BOSS repo) read,
// so the live map and the generated cheatsheet can never disagree about what a
// mode adds. This is the de-rot mechanism (IDEA-018): the per-mode lists are
// derived from the manifests + SKILL.md frontmatter, never hand-typed.

import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { STAGES_DIR, STAGE_ORDER } from './paths.js';
import { readStageManifest } from './scaffold.js';

// Display name for a rung even when it isn't authored yet (no manifest.json).
const STAGE_NAMES = {
  'L0-quickstart': 'Quickstart',
  'L1-mvp': 'MVP',
  'L2-v1': 'V1',
  'L3-scale': 'Scale',
};

// The mode word a user types into `boss unlock` (strips the L#- level prefix).
export function modeWord(stageId) {
  return stageId.replace(/^l\d+-/i, '');
}

// The ordered ladder. Unauthored stages (no manifest — e.g. Scale today) come
// back as { authored: false } so callers can show the rung without faking
// content for it.
export function loadModes() {
  return STAGE_ORDER.map((id) => {
    try {
      const m = readStageManifest(id);
      return {
        authored: true,
        id,
        name: m.name || STAGE_NAMES[id] || id,
        summary: m.summary || '',
        agents: m.agents || [],
        skills: m.skills || [],
        loops: m.loops || [],
        hooks: m.hooks || [],
        requires: m.requires || null,
        unlocksNext: m.unlocksNext || null,
        graduationHint: m.graduationHint || '',
      };
    } catch {
      return { authored: false, id, name: STAGE_NAMES[id] || id, agents: [], skills: [], loops: [] };
    }
  });
}

// The SKILL.md for a skill inside the PACKAGE (a given stage's template).
export function packageSkillMd(stageId, name) {
  return join(STAGES_DIR, stageId, 'template', '.claude', 'skills', name, 'SKILL.md');
}

function frontmatterDescription(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return '';
  for (const line of m[1].split('\n')) {
    const i = line.indexOf(':');
    if (i === -1) continue;
    if (line.slice(0, i).trim() === 'description') return line.slice(i + 1).trim();
  }
  return '';
}

// Split a SKILL.md description into a one-line gloss + a usage hint. Descriptions
// follow the house format "<gloss sentence>. … Usage - /name <args>". Returns
// { gloss, usage } — empty strings when the file is missing or has no description.
export function skillGloss(skillMdPath) {
  if (!existsSync(skillMdPath)) return { gloss: '', usage: '' };
  const desc = frontmatterDescription(readFileSync(skillMdPath, 'utf8'));
  if (!desc) return { gloss: '', usage: '' };
  const u = desc.search(/\bUsage\s*[-:]/i);
  const body = (u === -1 ? desc : desc.slice(0, u)).trim();
  const usage = u === -1 ? '' : desc.slice(u).replace(/^Usage\s*[-:]\s*/i, '').trim();
  // First sentence of the body is the gloss.
  const dot = body.indexOf('. ');
  let gloss = dot === -1 ? body : body.slice(0, dot + 1);
  gloss = gloss.replace(/\.$/, '').trim();
  return { gloss, usage };
}
