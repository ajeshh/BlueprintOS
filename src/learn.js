import {
  cpSync, readFileSync, writeFileSync, existsSync, mkdirSync, statSync,
} from 'node:fs';
import { join, basename, resolve } from 'node:path';
import { BOSS_ROOT } from './paths.js';
import { listProjects } from './registry.js';

// The library/ subfolders a pattern can be routed UP into.
export const LIBRARY_CATEGORIES = ['agents', 'skills', 'hooks', 'practices', 'memory-seed'];

// `boss learn` writes into the BOSS SOURCE repo (mutable git checkout), not the
// installed package. When `boss` runs from a global symlink, BOSS_ROOT is the
// read-only npm copy — so we locate the dev checkout instead, in order:
//   1. $BOSS_SRC (explicit override)
//   2. the self-hosted project in the registry (BOSS dogfoods itself)
//   3. BOSS_ROOT, if we're running straight from a source checkout (.git + library/)
function looksLikeSource(dir) {
  return !!dir && existsSync(join(dir, 'VERSION')) && existsSync(join(dir, 'library'));
}

export function bossSourceRoot() {
  if (process.env.BOSS_SRC && looksLikeSource(process.env.BOSS_SRC)) {
    return process.env.BOSS_SRC;
  }
  const self = listProjects().find((p) => p.selfHosted || /^(boss|bossbuild|blueprintos)$/i.test(p.name || ''));
  if (self && looksLikeSource(self.path)) return self.path;
  if (existsSync(join(BOSS_ROOT, '.git')) && looksLikeSource(BOSS_ROOT)) return BOSS_ROOT;
  return null;
}

function bump(version, kind) {
  const [x, y, z] = version.trim().split('.').map((n) => parseInt(n, 10));
  if (kind === 'major') return `${x + 1}.0.0`;
  if (kind === 'patch') return `${x}.${y}.${z + 1}`;
  return `${x}.${y + 1}.0`; // minor (default)
}

function prependChangelog(file, version, date, lines) {
  const body = readFileSync(file, 'utf8');
  const entry = `## ${version} — ${date}\n\n${lines.map((l) => `- ${l}`).join('\n')}\n\n`;
  const at = body.indexOf('\n## ');
  if (at < 0) return writeFileSync(file, body.trimEnd() + '\n\n' + entry);
  // Insert just before the first existing version heading.
  writeFileSync(file, body.slice(0, at + 1) + entry + body.slice(at + 1));
}

// Route a proven pattern UP into the BOSS library + record the version bump.
// Returns a result object; throws Error (with a usage-friendly message) on misuse.
export function learn({ srcPath, category, note, versionKind = 'minor', explicitVersion }) {
  if (!srcPath) throw new Error('usage: boss learn <path> --as <category> [--note "..."]');
  if (!LIBRARY_CATEGORIES.includes(category)) {
    throw new Error(`--as must be one of: ${LIBRARY_CATEGORIES.join(', ')}`);
  }
  const abs = resolve(process.cwd(), srcPath);
  if (!existsSync(abs)) throw new Error(`source not found: ${srcPath}`);

  const root = bossSourceRoot();
  if (!root) {
    throw new Error(
      'cannot locate the BOSS source repo. Set BOSS_SRC=/path/to/bossbuild, or run from the checkout.',
    );
  }

  // Place it in library/<category>/<basename> (file or directory).
  const destDir = join(root, 'library', category);
  mkdirSync(destDir, { recursive: true });
  const name = basename(abs);
  const dest = join(destDir, name);
  cpSync(abs, dest, { recursive: statSync(abs).isDirectory() });

  // Bump VERSION + keep package.json in sync.
  const versionFile = join(root, 'VERSION');
  const prev = readFileSync(versionFile, 'utf8').trim();
  const next = explicitVersion || bump(prev, versionKind);
  writeFileSync(versionFile, next + '\n');

  const pkgFile = join(root, 'package.json');
  if (existsSync(pkgFile)) {
    const pkg = JSON.parse(readFileSync(pkgFile, 'utf8'));
    pkg.version = next;
    writeFileSync(pkgFile, JSON.stringify(pkg, null, 2) + '\n');
  }

  // Record it in the CHANGELOG (what /boss-sync reads to tell projects what's new).
  const date = new Date().toISOString().slice(0, 10);
  const relDest = join('library', category, name);
  const lines = [`Learned \`${name}\` into \`${relDest}\`.${note ? ' ' + note : ''}`];
  const changelog = join(root, 'registry', 'CHANGELOG.md');
  if (existsSync(changelog)) prependChangelog(changelog, next, date, lines);

  return { root, dest: relDest, prev, next, category, name };
}
