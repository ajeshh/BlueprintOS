import { mkdirSync, existsSync, writeFileSync, readFileSync } from 'node:fs';
import { join, resolve, basename } from 'node:path';
import { execSync } from 'node:child_process';
import { bossVersion, STAGE_ORDER, resolveStageId } from './paths.js';
import { applyStage, readStageManifest } from './scaffold.js';
import { registerProject, listProjects, findByPath } from './registry.js';
import { planSync, applySync } from './sync.js';
import { learn, LIBRARY_CATEGORIES } from './learn.js';
import { statusConscience, consciencePause, conscienceResume, conscienceActivity } from './conscience.js';
import { board } from './board.js';
import { map } from './map.js';

const STAMP = '.boss/manifest.json';

function stageVars(name, stageId, mode) {
  return {
    PROJECT_NAME: name,
    DATE: new Date().toISOString().slice(0, 10),
    BOSS_VERSION: bossVersion(),
    STAGE: stageId,
    MODE: mode || stageId,
  };
}

function writeStamp(targetDir, stamp) {
  mkdirSync(join(targetDir, '.boss'), { recursive: true });
  writeFileSync(join(targetDir, STAMP), JSON.stringify(stamp, null, 2) + '\n');
}

function readStamp(dir) {
  const file = join(dir, STAMP);
  if (!existsSync(file)) return null;
  return JSON.parse(readFileSync(file, 'utf8'));
}

function cmdNew(args) {
  const name = args[0];
  if (!name) return fail('usage: boss new <project-name>');
  const targetDir = resolve(process.cwd(), name);
  if (existsSync(targetDir)) return fail(`'${name}' already exists here.`);

  const stageId = STAGE_ORDER[0]; // L0-quickstart
  const manifest = readStageManifest(stageId);
  mkdirSync(targetDir, { recursive: true });
  applyStage(stageId, targetDir, stageVars(name, stageId, manifest.name));

  const stamp = {
    name,
    bossVersion: bossVersion(),
    stage: stageId,
    mode: manifest.name,
    installedLayers: [stageId],
    agents: manifest.agents || [],
    skills: manifest.skills || [],
    hooks: manifest.hooks || [],
    loops: manifest.loops || [],
    createdAt: new Date().toISOString(),
  };
  writeStamp(targetDir, stamp);

  // User-tunable defaults the /boss spin-up skill reads. Separate from manifest.json
  // (the install record) so users can edit prefs without touching the layer ledger.
  writeFileSync(
    join(targetDir, '.boss', 'config.json'),
    JSON.stringify({
      github: 'ask',          // ask | always | never — create a remote when an idea lands
      visibility: 'private',  // private | public
      license: 'proprietary', // proprietary | MIT | Apache-2.0 | AGPL-3.0
      // Optional founder-cohort declaration (v0.20.0+). When set, the conscience
      // hook includes the cohort in its additionalContext so Claude composes the
      // voice appropriately for the cohort — first-product gets teaching;
      // returning-founder gets a harder question; vibe-virtuoso gets sharper
      // architecture. Options: vibe-coder-newbie | eng-builder | non-tech-founder
      // | first-product | vibe-virtuoso | indie-hacker | returning-founder |
      // domain-expert | null. /boss skill asks during spin-up; user can edit later.
      cohort: null,
    }, null, 2) + '\n',
  );

  try {
    execSync('git init -q', { cwd: targetDir });
  } catch { /* git optional */ }

  registerProject({
    name,
    path: targetDir,
    stage: stageId,
    mode: manifest.name,
    bossVersion: bossVersion(),
    createdAt: stamp.createdAt,
  });

  console.log(`\n  ✦ Created ${name} — ${manifest.name} mode (${stageId}, BOSS ${bossVersion()})`);
  console.log(`    agents: ${stamp.agents.join(', ') || '—'}`);
  console.log(`    skills: ${stamp.skills.join(', ') || '—'}`);
  console.log(`\n  Next:`);
  console.log(`    cd ${name}`);
  console.log(`    claude              # open in Claude Code`);
  console.log(`    > /welcome          # first time? gentle orientation, ~1 min`);
  console.log(`    > /boss <idea|PRD>  # already familiar? spin up directly`);
  console.log('');
}

function cmdUnlock(args) {
  const layer = args[0];
  const stamp = readStamp(process.cwd());
  if (!stamp) return fail('not a BOSS project (no .boss/manifest.json here).');
  if (!layer) return fail(`usage: boss unlock <mode>   (current: ${stamp.mode || stamp.stage})`);

  const target = resolveStageId(layer);
  if (!target) return fail(`unknown mode '${layer}'. options: ${STAGE_ORDER.join(', ')}`);
  if (stamp.installedLayers.includes(target)) return fail(`${target} already installed.`);

  let m, applied;
  try {
    m = readStageManifest(target);
    applied = applyStage(target, process.cwd(), stageVars(stamp.name, target, m.name));
  } catch (e) {
    return fail(`${target} not authored yet — ${e.message}`);
  }

  stamp.stage = target;
  stamp.mode = m.name;
  stamp.installedLayers.push(target);
  stamp.agents = [...new Set([...(stamp.agents || []), ...(m.agents || [])])];
  stamp.skills = [...new Set([...(stamp.skills || []), ...(m.skills || [])])];
  stamp.hooks = [...new Set([...(stamp.hooks || []), ...(m.hooks || [])])];
  stamp.loops = [...new Set([...(stamp.loops || []), ...(m.loops || [])])];
  writeStamp(process.cwd(), stamp);
  registerProject({ name: stamp.name, path: process.cwd(), stage: target, mode: m.name, bossVersion: bossVersion() });
  console.log(`\n  ✦ Unlocked ${m.name} mode (${target}).`);
  if (applied.appendedClaude) console.log(`    + appended ${m.name} working rules to CLAUDE.md`);
  console.log('');
}

function cmdStatus(args) {
  const stamp = readStamp(process.cwd());
  if (!stamp) return fail('not a BOSS project (no .boss/manifest.json here).');
  const f = parseArgs(args || []);
  // `boss status --conscience` — drill into the conscience-state surface
  // (asked-for by eng-builder / indie-hacker / vibe-virtuoso personas in
  // v0.19 reactions: "I want to see what fired and why").
  if (f.conscience) {
    console.log(`\n  ${stamp.name}`);
    return statusConscience(process.cwd());
  }
  const current = bossVersion();
  console.log(`\n  ${stamp.name}`);
  console.log(`    mode:         ${stamp.mode || stamp.stage}  (${stamp.stage})`);
  console.log(`    layers:       ${stamp.installedLayers.join(' → ')}`);
  console.log(`    BOSS pinned:  ${stamp.bossVersion}`);
  console.log(`    BOSS current: ${current}`);
  if (stamp.bossVersion !== current) {
    console.log(`    ⟳ newer practices available — run /boss-sync to review the diff`);
  }
  console.log('');
}

function cmdBoard() {
  const stamp = readStamp(process.cwd());
  if (!stamp) return fail('not a BOSS project (no .boss/manifest.json here).');
  board(process.cwd(), stamp.name);
}

function cmdMap() {
  const stamp = readStamp(process.cwd());
  if (!stamp) return fail('not a BOSS project (no .boss/manifest.json here).');
  map(process.cwd(), stamp);
}

function cmdList() {
  const projects = listProjects();
  if (!projects.length) {
    console.log('\n  No projects registered yet. Run `boss new <name>`.\n');
    return;
  }
  console.log(`\n  ${projects.length} connected project(s):\n`);
  for (const p of projects) {
    console.log(`    ${p.name.padEnd(20)} ${(p.mode || p.stage || '?').padEnd(12)} BOSS@${p.bossVersion || '?'}`);
    console.log(`    ${''.padEnd(20)} ${p.path}`);
  }
  console.log('');
}

// Minimal flag parser: returns { _: [positionals], flag: value|true }.
function parseArgs(args) {
  const out = { _: [] };
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a.startsWith('--')) {
      const key = a.slice(2);
      const next = args[i + 1];
      if (next !== undefined && !next.startsWith('--')) { out[key] = next; i++; }
      else out[key] = true;
    } else {
      out._.push(a);
    }
  }
  return out;
}

function cmdSync(args) {
  const { _: pos, apply } = parseArgs(args);
  void pos;
  const stamp = readStamp(process.cwd());
  if (!stamp) return fail('not a BOSS project (no .boss/manifest.json here).');

  const plan = planSync(process.cwd(), stamp);
  const changed = plan.entries.filter((e) => e.status !== 'ok');
  const settingsChanged = !!(plan.settings && plan.settings.changed);

  console.log(`\n  ${stamp.name} — sync`);
  console.log(`    pin:    ${plan.pin}${plan.drift ? `  →  current ${plan.current}` : '  (current)'}`);
  console.log(`    layers: ${plan.layers.join(' → ')}\n`);

  if (!changed.length && !settingsChanged) {
    console.log('    ✓ BOSS-managed skills/agents/hooks are up to date.');
    if (plan.drift && !apply) console.log('    (run `boss sync --apply` to bump the pin to current.)');
  } else {
    for (const e of changed) {
      const mark = e.status === 'new' ? '+ new    ' : `~ changed (${e.delta} lines)`;
      console.log(`    ${mark}  ${e.kind}/${e.name}  →  ${e.rel}`);
    }
    if (settingsChanged) {
      console.log(`    ~ merge    settings/hooks  →  ${plan.settings.rel}  (additive — keeps your permissions)`);
    }
  }

  if (!apply) {
    console.log('\n  Preview only. Run `boss sync --apply` to write these and bump the pin,');
    console.log('  or use `/boss-sync` in Claude for a reviewed, narrated update.\n');
    return;
  }

  const { written, stamp: next } = applySync(process.cwd(), plan, stamp);
  writeStamp(process.cwd(), next);
  registerProject({
    name: next.name, path: process.cwd(), stage: next.stage, mode: next.mode, bossVersion: next.bossVersion,
  });
  console.log(`\n  ✦ Synced ${written.length} file(s); pin now ${next.bossVersion}.`);
  if (written.length) console.log('    Review the changes with `git diff` before committing.\n');
  else console.log('');
}

function cmdLearn(args) {
  const f = parseArgs(args);
  const versionKind = f.major ? 'major' : f.patch ? 'patch' : 'minor';
  let res;
  try {
    res = learn({
      srcPath: f._[0],
      category: f.as,
      note: typeof f.note === 'string' ? f.note : undefined,
      versionKind,
      explicitVersion: typeof f.version === 'string' ? f.version : undefined,
    });
  } catch (e) {
    return fail(e.message);
  }
  console.log(`\n  ✦ Learned ${res.name} UP into ${res.dest}`);
  console.log(`    BOSS ${res.prev} → ${res.next}  (VERSION + package.json + CHANGELOG updated)`);
  console.log(`    in ${res.root}`);
  console.log('    Review, then commit. Connected projects pull it via `boss sync` / `/boss-sync`.\n');
}

function cmdConscience(args) {
  const [sub, ...rest] = args;
  const flags = parseArgs(rest);
  try {
    if (sub === 'pause') return consciencePause(flags);
    if (sub === 'resume') return conscienceResume();
    if (sub === 'activity') return conscienceActivity(process.cwd());
    if (sub === 'cost') return conscienceActivity(process.cwd(), { asCost: true });
    if (sub === 'status' || !sub) {
      const stamp = readStamp(process.cwd());
      if (!stamp) return fail('not a BOSS project (no .boss/manifest.json here).');
      console.log(`\n  ${stamp.name}`);
      return statusConscience(process.cwd());
    }
    return fail(`unknown subcommand 'conscience ${sub}'. options: pause | resume | status | activity | cost`);
  } catch (e) {
    return fail(e.message);
  }
}

function fail(msg) {
  console.error(`  boss: ${msg}`);
  process.exitCode = 1;
}

export function run(argv) {
  const [cmd, ...args] = argv;
  switch (cmd) {
    case 'new': return cmdNew(args);
    case 'unlock': return cmdUnlock(args);
    case 'status': return cmdStatus(args);
    case 'board': return cmdBoard();
    case 'map': return cmdMap();
    case 'list': return cmdList();
    case 'sync': return cmdSync(args);
    case 'learn': return cmdLearn(args);
    case 'conscience': return cmdConscience(args);
    case 'version': case '--version': case '-v':
      return console.log(bossVersion());
    default:
      console.log(`BlueprintOS (BOSS) ${bossVersion()}\n`);
      console.log('  boss new <name>          scaffold a new project in Quickstart mode + register it');
      console.log('  boss unlock <mode>       level up: quickstart → mvp → v1 → scale');
      console.log('  boss status              this project: mode, pinned version, drift');
      console.log('  boss status --conscience this project: loop states + cohort + recent overrides');
      console.log('  boss map                 live cheatsheet: where you are + what\'s one unlock away');
      console.log('  boss board               a live read of what\'s in flight (captured → shipped)');
      console.log('  boss list                all connected projects');
      console.log('  boss sync [--apply]      pull current BOSS skills/agents/hooks into this project (DOWN)');
      console.log(`  boss learn <p> --as <c>  promote a pattern UP into the library (${LIBRARY_CATEGORIES.join('|')})`);
      console.log('  boss conscience pause    silence the conscience for a bounded session [--for 8h|--until-resume]');
      console.log('  boss conscience resume   re-enable the conscience');
      console.log('  boss conscience activity how often the conscience fires (over-fire check; alias: cost)');
      console.log('  boss version             BOSS version\n');
      console.log('  modes: Quickstart (capture an idea) · MVP (build it) · V1 (ship it) · Scale (grow it)\n');
  }
}
