---
id: RESUME
type: resume
owner: pm
status: active
updated: 2026-05-21
---

# RESUME — BlueprintOS

**Read this first each session.** State + next tasks + open decisions for BOSS.

## What BOSS is
A just-in-time **startup incubator** (not just a scaffolder): `boss new` → open Claude → `/boss`.
Scaffolds at the right level of ceremony and grows the project through **modes**
(Quickstart → MVP → V1 → Scale), with two agent classes — **builders** (make the app) and
**mentors** (coach the founder). See [`PRINCIPLES.md`](../PRINCIPLES.md) and [`README.md`](../README.md).

## State (shipped, v0.7.0)
- **Package/dogfood separation (v0.7.0):** `package.json` `files` allowlist ships only the package;
  `docs/`, `.boss/`, root `CLAUDE.md` stay dev-only. Registry moved to `~/.boss/registry.json`
  (machine-local, out of the repo). `npm run pack:preview` verifies what ships.
- **CLI** (zero-dep Node): `boss new / unlock / status / list / version`. On PATH via `npm i -g .`.
- **Quickstart mode (L0) authored** — the incubator arc: capture → keep adding → canvas → unlock MVP.
  - Skills: `/boss` (spin-up), `/triage` (living idea capture), `/canvas` (Humane Product Canvas + lean/Lenny + heartbeat).
  - Agents: `pm`, `coder-generalist`. Repo-creation defaults in `.boss/config.json` (private/proprietary/ask).
- **Modes vocabulary** Quickstart/MVP/V1/Scale; `boss unlock` resolves mode name / level / id.
- **PRINCIPLES.md** (6 rules) + **design-system practice** (`library/practices/`).
- **BOSS now dogfoods itself** (v0.6.0): registered project, `.boss/` stamp (mode MVP, self-hosted),
  `docs/ideas/` (IDEA-001..003), own `CLAUDE.md` + `IDS.md` + this RESUME + its own `/canvas`.

## Next tasks (in order)
1. **IDEA-001 — Learning loop.** `boss sync` (bring a project's installed-mode skills/agents to
   current, reviewable, bump `.boss` pin) + `boss learn <path> --as <cat>` (copy a pattern UP into
   `library/`, bump VERSION + CHANGELOG). Skills `/boss-sync` + `/boss-learn` (two-way UP/DOWN router).
   Add `claude-append.md` support to `boss unlock` first (needed by both this and MVP).
2. **IDEA-002 — Author MVP mode (L1-mvp).** Extract this repo's own practice UP: `stages/L1-mvp/`
   manifest + template (`/spec`+FEAT, `/smoke` placeholder, `/log`+devlog, `/close`+RESUME, `tester`
   + `program-manager`, `claude-append.md`). Then `boss unlock mvp` works for real.
3. **IDEA-003 — Mentor layer.** Author `docs/MENTORS.md` (two classes, roster, JIT-per-mode, dossier);
   seed `mentor-venture` into Quickstart; rest unlock per mode.
4. Then: `boss sync` `margin` (stuck on v0.2.0) to prove the loop on a real project.

## Open decisions
- Sync of user-editable files (CLAUDE.md/settings.json): v1 syncs only BOSS-managed skills/agents; merge strategy for the rest = later.
- BOSS's own business model — open (canvas says don't monetize lock-in). Decide later, on evidence.
- Mentor agents' home: project `.claude/agents/` with `mentor-` prefix (leaning yes).

## Prompt for the next session
> Continue BlueprintOS. Read docs/RESUME.md. We're dogfooding BOSS on itself (v0.6.0, MVP mode).
> Next: (1) add `claude-append.md` support to `boss unlock`, then build the learning loop —
> `boss sync` + `boss learn` CLI and the `/boss-sync` + `/boss-learn` skills (two-way UP/DOWN router,
> IDEA-001). (2) Author MVP mode by extracting this repo's own practices into stages/L1-mvp/ (IDEA-002).
> (3) Author docs/MENTORS.md + seed mentor-venture (IDEA-003). Bump VERSION + CHANGELOG per capability,
> test the CLI in /tmp and prune the test entry from registry, commit with the noreply env-var, push.

## Working reminders
- Commit with GH noreply env-var (never global config): `NR=$(gh api user --jq '"\(.id)+\(.login)@users.noreply.github.com"')`.
- After CLI changes: `npm i -g ~/Projects/BlueprintOS`, test in `/tmp`, prune `/tmp` entries from `~/.boss/registry.json` (registry is machine-local now, not in the repo).
- Keep `VERSION` and `package.json` version in sync. `npm run pack:preview` to confirm only the package ships.
- Every capability: VERSION bump + `registry/CHANGELOG.md` entry + update this RESUME.
