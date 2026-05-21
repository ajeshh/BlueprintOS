---
id: RESUME
type: resume
owner: pm
status: active
updated: 2026-05-21 (v0.8.0)
---

# RESUME — BlueprintOS

**Read this first each session.** State + next tasks + open decisions for BOSS.

## What BOSS is
A just-in-time **startup incubator** (not just a scaffolder): `boss new` → open Claude → `/boss`.
Scaffolds at the right level of ceremony and grows the project through **modes**
(Quickstart → MVP → V1 → Scale), with two agent classes — **builders** (make the app) and
**mentors** (coach the founder). See [`PRINCIPLES.md`](../PRINCIPLES.md) and [`README.md`](../README.md).

## State (shipped, v0.8.0)
- **Learning loop (v0.8.0, IDEA-001 — DONE):** the bidirectional loop from PRINCIPLES #1 is live.
  - `boss sync [--apply]` — pulls a project's installed-mode skills/agents to current (DOWN), previews
    new/changed/ok, reconciles stale labels (`L0-sketch`→`L0-quickstart`), bumps the `.boss` pin.
  - `boss learn <path> --as <cat>` — promotes a pattern UP into `library/<cat>/`, bumps
    VERSION+package.json+CHANGELOG. Finds the BOSS **source** repo via the registry self-hosted entry
    (or `$BOSS_SRC`) so it works from a global install.
  - `claude-append.md` in `boss unlock` — additive CLAUDE.md block under an idempotent marker (never overwrites).
  - Skills `/boss-sync` (narrate the diff, flag local edits) + `/boss-learn` (two-way UP/DOWN router).
  - **Proven:** `margin` synced 0.2.0 → 0.8.0 (now Quickstart; gained canvas/boss-sync/boss-learn).
  - New CLI modules: `src/sync.js`, `src/learn.js`. Tested in `/tmp`; registry pruned.
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
1. **IDEA-002 — Author MVP mode (L1-mvp).** Extract this repo's own practice UP: `stages/L1-mvp/`
   manifest + template (`/spec`+FEAT, `/smoke` placeholder, `/log`+devlog, `/close`+RESUME, `tester`
   + `program-manager`). Use the now-built **`claude-append.md`** mechanism for MVP's working rules
   (put `claude-append.md` in the template, NOT a full CLAUDE.md — `boss unlock` appends it). Then
   `boss unlock mvp` works for real, and `boss sync` carries MVP files to MVP-mode projects.
2. **IDEA-003 — Mentor layer.** Author `docs/MENTORS.md` (two classes, roster, JIT-per-mode, dossier);
   seed `mentor-venture` into Quickstart; rest unlock per mode. **Ajesh has a list of real people whose
   app-startup best-practices to encode** — get the list, decide person→mentor vs archetype mapping
   (see IDEA-003 open questions), then `/boss-learn` them UP into `practices/` + `memory-seed/`.
3. ~~IDEA-001 learning loop~~ — **DONE in v0.8.0** (see State). margin proven.

## Open decisions
- Sync of user-editable files (CLAUDE.md/settings.json): v1 syncs only BOSS-managed skills/agents; merge strategy for the rest = later.
- BOSS's own business model — open (canvas says don't monetize lock-in). Decide later, on evidence.
- Mentor agents' home: project `.claude/agents/` with `mentor-` prefix (leaning yes).
- Optional: scrub the old `registry/projects.json` (home path + `margin`) from git history. Removed
  going forward as of v0.7.0; only matters if the public history bothers you (needs force-push).

## Prompt for the next session
> Continue BlueprintOS (in ~/Projects/blueprintos). Read docs/RESUME.md and PRINCIPLES.md first.
> We're at v0.8.0. The learning loop (IDEA-001) is DONE: `boss sync`/`boss learn`, `claude-append.md`
> in `boss unlock`, and `/boss-sync`+`/boss-learn` skills — proven by syncing margin 0.2.0→0.8.0.
> Registry is machine-local at ~/.boss/registry.json; npm `files` allowlist keeps docs/ + .boss/ +
> root CLAUDE.md out of the shipped package.
>
> Next, in order:
> 1. IDEA-002 — Author MVP mode by extracting this repo's own practices into stages/L1-mvp/
>    (/spec+FEAT, /smoke placeholder, /log+devlog, /close+RESUME, tester + program-manager). Put MVP's
>    working rules in a `claude-append.md` in the template (the mechanism is built) — NOT a full
>    CLAUDE.md — so `boss unlock mvp` appends rules without overwriting.
> 2. IDEA-003 — Author docs/MENTORS.md (builders vs mentors, roster, JIT-per-mode, founder dossier);
>    seed mentor-venture into Quickstart. Ajesh has a list of real people whose app-startup
>    best-practices to encode — get the list, then `/boss-learn` them UP into practices/ + memory-seed/.
>
> Per capability: bump VERSION + package.json (keep in sync) + add a registry/CHANGELOG.md entry +
> update this RESUME. Test the CLI in /tmp, prune /tmp entries from ~/.boss/registry.json, commit
> with the GH noreply env-var (never global config), push.

## Working reminders
- Commit with GH noreply env-var (never global config): `NR=$(gh api user --jq '"\(.id)+\(.login)@users.noreply.github.com"')`.
- After CLI changes: `npm i -g ~/Projects/BlueprintOS`, test in `/tmp`, prune `/tmp` entries from `~/.boss/registry.json` (registry is machine-local now, not in the repo).
- Keep `VERSION` and `package.json` version in sync. `npm run pack:preview` to confirm only the package ships.
- Every capability: VERSION bump + `registry/CHANGELOG.md` entry + update this RESUME.
