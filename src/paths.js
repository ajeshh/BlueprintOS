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
// Each stage is a "mode" in the user's vocabulary: Quickstart → MVP → V1 → Scale.
export const STAGE_ORDER = ['L0-quickstart', 'L1-mvp', 'L2-v1', 'L3-scale'];

// Resolve a user-typed layer to a canonical stage id.
// Accepts the full id ('L1-mvp'), the level ('L1'), or the mode name ('mvp').
export function resolveStageId(input) {
  if (!input) return undefined;
  const q = input.toLowerCase();
  return STAGE_ORDER.find((s) => {
    const sl = s.toLowerCase();
    return sl === q || sl.startsWith(q + '-') || sl.replace(/^l\d+-/, '') === q;
  });
}
