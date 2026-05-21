import { fileURLToPath } from 'node:url';
import { dirname, resolve, join } from 'node:path';
import { readFileSync } from 'node:fs';

// BOSS install root — resolves correctly even when `boss` is globally linked,
// because import.meta.url points at the real file in src/.
export const BOSS_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

export const REGISTRY_FILE = join(BOSS_ROOT, 'registry', 'projects.json');
export const STAGES_DIR = join(BOSS_ROOT, 'stages');

export function bossVersion() {
  return readFileSync(join(BOSS_ROOT, 'VERSION'), 'utf8').trim();
}

// Stage order — index = maturity level. Used to validate `unlock` jumps.
export const STAGE_ORDER = ['L0-sketch', 'L1-foundation', 'L2-frame', 'L3-structure'];
