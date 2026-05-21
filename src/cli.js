import { mkdirSync, existsSync, writeFileSync, readFileSync } from 'node:fs';
import { join, resolve, basename } from 'node:path';
import { execSync } from 'node:child_process';
import { bossVersion, STAGE_ORDER } from './paths.js';
import { applyStage, readStageManifest } from './scaffold.js';
import { registerProject, listProjects, findByPath } from './registry.js';

const STAMP = '.boss/manifest.json';

function stageVars(name, stageId) {
  return {
    PROJECT_NAME: name,
    DATE: new Date().toISOString().slice(0, 10),
    BOSS_VERSION: bossVersion(),
    STAGE: stageId,
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

  const stageId = 'L0-sketch';
  mkdirSync(targetDir, { recursive: true });
  applyStage(stageId, targetDir, stageVars(name, stageId));

  const manifest = readStageManifest(stageId);
  const stamp = {
    name,
    bossVersion: bossVersion(),
    stage: stageId,
    installedLayers: [stageId],
    agents: manifest.agents || [],
    skills: manifest.skills || [],
    createdAt: new Date().toISOString(),
  };
  writeStamp(targetDir, stamp);

  try {
    execSync('git init -q', { cwd: targetDir });
  } catch { /* git optional */ }

  registerProject({
    name,
    path: targetDir,
    stage: stageId,
    bossVersion: bossVersion(),
    createdAt: stamp.createdAt,
  });

  console.log(`\n  ✦ Created ${name} at stage ${stageId} (BOSS ${bossVersion()})`);
  console.log(`    agents: ${stamp.agents.join(', ') || '—'}`);
  console.log(`    skills: ${stamp.skills.join(', ') || '—'}`);
  console.log(`\n  Next:`);
  console.log(`    cd ${name}`);
  console.log(`    claude            # open in Claude Code`);
  console.log(`    > /boss           # drop your PRD; the team spins up`);
  console.log('');
}

function cmdUnlock(args) {
  const layer = args[0];
  const stamp = readStamp(process.cwd());
  if (!stamp) return fail('not a BOSS project (no .boss/manifest.json here).');
  if (!layer) return fail(`usage: boss unlock <layer>   (current: ${stamp.stage})`);

  const target = STAGE_ORDER.find((s) => s === layer || s.startsWith(layer));
  if (!target) return fail(`unknown layer '${layer}'. options: ${STAGE_ORDER.join(', ')}`);
  if (stamp.installedLayers.includes(target)) return fail(`${target} already installed.`);

  try {
    applyStage(target, process.cwd(), stageVars(stamp.name, target));
  } catch (e) {
    return fail(`${target} not authored yet — ${e.message}`);
  }

  const m = readStageManifest(target);
  stamp.stage = target;
  stamp.installedLayers.push(target);
  stamp.agents = [...new Set([...(stamp.agents || []), ...(m.agents || [])])];
  stamp.skills = [...new Set([...(stamp.skills || []), ...(m.skills || [])])];
  writeStamp(process.cwd(), stamp);
  registerProject({ name: stamp.name, path: process.cwd(), stage: target, bossVersion: bossVersion() });
  console.log(`\n  ✦ Unlocked ${target}. Stage is now ${stamp.stage}.\n`);
}

function cmdStatus() {
  const stamp = readStamp(process.cwd());
  if (!stamp) return fail('not a BOSS project (no .boss/manifest.json here).');
  const current = bossVersion();
  console.log(`\n  ${stamp.name}`);
  console.log(`    stage:        ${stamp.stage}`);
  console.log(`    layers:       ${stamp.installedLayers.join(' → ')}`);
  console.log(`    BOSS pinned:  ${stamp.bossVersion}`);
  console.log(`    BOSS current: ${current}`);
  if (stamp.bossVersion !== current) {
    console.log(`    ⟳ newer practices available — run /boss-sync to review the diff`);
  }
  console.log('');
}

function cmdList() {
  const projects = listProjects();
  if (!projects.length) {
    console.log('\n  No projects registered yet. Run `boss new <name>`.\n');
    return;
  }
  console.log(`\n  ${projects.length} connected project(s):\n`);
  for (const p of projects) {
    console.log(`    ${p.name.padEnd(20)} ${(p.stage || '?').padEnd(14)} BOSS@${p.bossVersion || '?'}`);
    console.log(`    ${''.padEnd(20)} ${p.path}`);
  }
  console.log('');
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
    case 'status': return cmdStatus();
    case 'list': return cmdList();
    case 'version': case '--version': case '-v':
      return console.log(bossVersion());
    default:
      console.log(`BlueprintOS (BOSS) ${bossVersion()}\n`);
      console.log('  boss new <name>      scaffold a new project at L0 + register it');
      console.log('  boss unlock <layer>  additively lay down the next stage');
      console.log('  boss status          this project: stage, pinned version, drift');
      console.log('  boss list            all connected projects');
      console.log('  boss version         BOSS version\n');
  }
}
