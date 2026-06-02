// boss map — the live cheatsheet (IDEA-018). Where you are on the ladder, what
// you can run right now (grouped by the rung that unlocked it), and what's one
// unlock away. Like `boss board`, it's a pure render of state the project
// already holds — the .boss stamp + the installed SKILL.md files — so there is
// nothing to maintain and nothing to drift.

import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { STAGE_ORDER } from './paths.js';
import { loadModes, packageSkillMd, skillGloss, modeWord } from './modes.js';

function projectSkillMd(projectDir, name) {
  return join(projectDir, '.claude', 'skills', name, 'SKILL.md');
}

// Gloss for an installed skill: prefer the project's OWN copy (truthful about
// local edits), fall back to the package stage that defines it.
function installedGloss(projectDir, name, definedIn) {
  const own = projectSkillMd(projectDir, name);
  if (existsSync(own)) return skillGloss(own);
  if (definedIn) return skillGloss(packageSkillMd(definedIn, name));
  return { gloss: '', usage: '' };
}

export function renderMap(projectDir, stamp) {
  const modes = loadModes();
  const byId = Object.fromEntries(modes.map((m) => [m.id, m]));
  // skill name -> the stage id that first introduces it (ladder order).
  const skillStage = {};
  for (const m of modes) for (const s of m.skills || []) if (!(s in skillStage)) skillStage[s] = m.id;

  const installed = stamp.installedLayers || [stamp.stage];
  const deepest = installed[installed.length - 1];

  // Scannable, single-line glosses. Substitute the project name into any
  // not-yet-installed (package) gloss so the "one unlock away" preview reads as
  // what the founder would actually get; cap width so a long sentence can't
  // dominate the terminal.
  const fit = (g) => {
    let t = (g || '').replace(/\{\{PROJECT_NAME\}\}/g, stamp.name).replace(/\{\{[^}]+\}\}/g, '');
    if (t.length > 64) t = t.slice(0, 63).trimEnd() + '…';
    return t;
  };

  const lines = [];
  lines.push('');
  lines.push(`  ${stamp.name} · map`);
  lines.push(`  ▸ You are here: ${stamp.mode || stamp.stage}  (${installed.join(' → ')})`);
  lines.push('');

  // Available now — grouped by the rung that unlocked each skill, ladder order.
  lines.push('  Available now');
  for (const layerId of STAGE_ORDER) {
    if (!installed.includes(layerId)) continue;
    const mode = byId[layerId];
    const skillsHere = (stamp.skills || []).filter((s) => skillStage[s] === layerId).sort();
    if (!skillsHere.length) continue;
    lines.push(`    ${mode.name}`);
    for (const s of skillsHere) {
      const { gloss } = installedGloss(projectDir, s, layerId);
      lines.push(`      /${s.padEnd(18)} ${fit(gloss)}`);
    }
  }
  lines.push('');

  // One unlock away — read the next rung's skills from the package (not yet
  // installed here), so the founder sees what they'd gain before committing.
  const idx = STAGE_ORDER.indexOf(deepest);
  const nextId = idx >= 0 ? STAGE_ORDER[idx + 1] : null;
  if (nextId) {
    const next = byId[nextId];
    if (next && next.authored) {
      lines.push(`  One unlock away: ${next.name}   →  boss unlock ${modeWord(nextId)}`);
      for (const s of next.skills || []) {
        const { gloss } = skillGloss(packageSkillMd(nextId, s));
        lines.push(`      /${s.padEnd(18)} ${fit(gloss)}`);
      }
      if (next.graduationHint) lines.push(`    ${next.graduationHint}`);
    } else if (next) {
      lines.push(`  One unlock away: ${next.name} — not authored yet.`);
    }
    lines.push('');
  }

  // Standing controls — always available, mode-independent (the git-cheatsheet core).
  lines.push('  Anytime');
  lines.push('    boss board                       what\'s in flight (captured → shipped)');
  lines.push('    boss status --conscience         loop states + cohort + recent overrides');
  lines.push('    boss conscience pause --for 8h   silence the conscience for a sprint');
  lines.push('    /boss-sync                       pull the latest BOSS practices into this project');
  lines.push('');
  lines.push('  The map is a read of your install. To change it, climb a rung: boss unlock <mode>.');
  lines.push('');
  return lines.join('\n');
}

export function map(projectDir, stamp) {
  console.log(renderMap(projectDir, stamp));
}
