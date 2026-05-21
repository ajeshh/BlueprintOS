import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { REGISTRY_FILE } from './paths.js';

function load() {
  if (!existsSync(REGISTRY_FILE)) return { projects: [] };
  try {
    return JSON.parse(readFileSync(REGISTRY_FILE, 'utf8'));
  } catch {
    return { projects: [] };
  }
}

function save(data) {
  writeFileSync(REGISTRY_FILE, JSON.stringify(data, null, 2) + '\n');
}

export function listProjects() {
  return load().projects;
}

// Upsert by absolute path — a project is identified by where it lives on disk.
export function registerProject(entry) {
  const data = load();
  const idx = data.projects.findIndex((p) => p.path === entry.path);
  if (idx >= 0) data.projects[idx] = { ...data.projects[idx], ...entry };
  else data.projects.push(entry);
  save(data);
}

export function findByPath(absPath) {
  return load().projects.find((p) => p.path === absPath);
}
