# CLAUDE.md — BlueprintOS (BOSS)

> BOSS is **self-hosted**: it's its own first project (mode: MVP). It eats the dogfood it serves.
> Behavior rules first; reference below. What BOSS *is* lives in [`PRINCIPLES.md`](PRINCIPLES.md).

## Working rules (read first)

1. **Read [`docs/RESUME.md`](docs/RESUME.md) at the start of every session.** It carries state + next tasks + open decisions. Update it at session end.
2. **Apply BOSS's own principles to BOSS** ([`PRINCIPLES.md`](PRINCIPLES.md)). Especially #1: when work pauses, sort patterns UP (BOSS practice) or DOWN (here, that's BOSS's own code/features).
3. **Capture before building.** New ideas → `docs/ideas/IDEA-NNN`. Features being built → promote to a spec. Track in `docs/ideas/INDEX.md`.
4. **Zero-dependency CLI.** `src/` stays dependency-free (Node built-ins only). Machine state is JSON (`.boss/`, `registry/`).
5. **Every capability bump = VERSION bump + `registry/CHANGELOG.md` entry.** The CHANGELOG is what `boss sync` reads to tell projects what's new.
6. **Test the CLI before claiming done.** Scaffold a throwaway in `/tmp`, exercise the command, then clean it (and prune the `/tmp` entry from `registry/projects.json`).
7. **Small, reversible steps.** One concern per change. Don't break the working `boss` CLI.

## What BOSS is (one line)

A just-in-time startup incubator: it scaffolds a project at the right level of ceremony
(Quickstart → MVP → V1 → Scale) and mentors the founder from idea to fundable/hireable venture.

## Repo map

- `bin/boss`, `src/` — the zero-dep CLI (cli, scaffold, registry, paths; loop = learn/sync when built)
- `stages/L{0..3}-*/` — the modes. **Quickstart authored**; MVP being extracted from this repo's own practice.
- `library/` — the superset (agents, skills, hooks, practices, memory-seed) the learning loop feeds
- `registry/` — `projects.json` (every connected project) + `CHANGELOG.md` (per-version notes)
- `docs/` — BOSS's own dogfooded docs: `ideas/`, `IDS.md`, `RESUME.md`, the canvas
- `PRINCIPLES.md` — the six rules that define BOSS

## Reference

### Two classes of agents (see [`docs/MENTORS.md`](docs/MENTORS.md) when authored)
- **Builders** — make the product (pm, coder, tester, designer…).
- **Mentors** (`mentor-*`) — coach the founder (venture lead, business, architect, fundraising, talent, pitch).

### Conventions
- IDs: `IDEA-NNN` (ideas), `FEAT-NNN` (features in build). See `docs/IDS.md`.
- Frontmatter on every doc: `id`, `type`, `owner`, `status`.
- Git: small commits; commits use the GitHub noreply email (env-var, never global config) to avoid GH007.
