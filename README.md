# BlueprintOS (BOSS)

> A meta-system that captures everything learned building real apps and lets you cold-start
> new projects at the **right level of agentic ceremony** — then grow them stage by stage.

**BOSS is npm inverted.** npm is a registry of packages your projects pull *down*. BOSS is the
*upstream*: it scaffolds projects, keeps a registry of every project it has birthed, pushes
practice updates *down* to them, and pulls proven learnings *up* from them. It's a tiny tool
with its own git repo, and every project it touches keeps a `.boss/` stamp pointing home.

```
                    ┌─────────────────────────┐
                    │   BlueprintOS (BOSS)     │  ← its own git repo, the superset
                    │  practices · agents ·    │
                    │  skills · hooks · stages │
                    │  registry/projects.json  │  ← knows every child + its version
                    └───────────┬─────────────┘
              boss new │ boss sync ↓      ↑ boss learn (human-gated promotion)
        ┌─────────────┼──────────────────┼─────────────┐
        ▼             ▼                  ▼              ▼
   project-A      project-B          project-C       (dhun, retro-fitted later)
   .boss@1.2      .boss@1.4          .boss@1.4
   stage: L1      stage: L3          stage: L0
```

## Two halves

- **`boss` CLI** — *deterministic*: scaffold files, copy stage layers, manage the registry,
  compute sync diffs, version bookkeeping. Dumb and reliable. (This repo's `bin/` + `src/`.)
- **`/boss` skills** — *intelligent*: read your PRD, pick the right starting stage, configure
  stack-neutral coders from the idea, drive spin-up, judge learnings, review sync diffs.
  _(Skills land as the learning loop is wired — see Roadmap.)_

## Install

```bash
cd BlueprintOS
npm install -g .        # puts `boss` on your PATH
boss version
```

## Use

```bash
boss new my-app         # scaffold L0 + git init + register
cd my-app
claude                  # open in Claude Code
> /boss                 # (once wired) drop a PRD; the team spins up
...
boss status             # stage + pinned BOSS version + drift
boss unlock L1          # additively lay down the next layer
boss list               # every connected project
```

## The four stages (progressive unlock)

Each stage is a folder the CLI lays down additively. Construction metaphor; rename freely.

| Layer | Unlocks | When you've earned it |
|---|---|---|
| **L0 · Sketch** | CLAUDE.md skeleton, idea capture (`IDEA-NNN`), memory system, `/triage`, **pm + coder-generalist** | you have an idea or rough PRD |
| **L1 · Foundation** | `/spec` + `FEAT-NNN`, `/smoke` gate, devlog, `/close` + RESUME.md, session hooks, **tester, program-manager** | building the first working spine |
| **L2 · Frame** | design tokens + `/design-review`/`/ux-check`, prototypes, `/board`, doc-placement contract, **designer, db-architect, docs-writer** | 3+ features and design matters |
| **L3 · Structure** | PM org, lab governance, `/refactor-wave`, `/code-health`, `/product-council`, full IDS | managing a real product with sub-domains |

Only **L0 is authored today.** `boss unlock L1+` reports "not authored yet" gracefully.

## The learning loop — why neutral + version-pin pays off

BOSS ships **zero stack assumptions** (stack-neutral by design). The first time you build, say,
a Next.js app, spin-up configures its smoke gate / coders / hooks for that stack. Once proven,
`/boss-learn` captures that as an **emergent stack profile** — not guessed in advance, *earned*.
The next Next.js project starts from it.

So **"stack packs" are an output of the learning loop, not an input.** Stages teach *process*
maturity; the learning loop teaches *stack* maturity. Two orthogonal axes, both compounding.

Version-pinning means old projects don't silently inherit churn — they see *"BOSS is at 1.6,
you're on 1.2, here are 4 practices to adopt"* and choose via `/boss-sync`.

## Repo layout

```
BlueprintOS/
├── bin/boss              # CLI entry
├── src/                  # CLI: cli, scaffold, registry, paths
├── VERSION               # BOSS semver — what projects pin to
├── stages/               # progressive layers (L0 authored; L1–L3 stubbed)
│   └── L0-sketch/{manifest.json, template/}
├── library/              # the superset (de-dhuned, generalized)
│   ├── agents/ skills/ hooks/ practices/ memory-seed/
├── registry/
│   ├── projects.json     # every connected project: path, stage, pinned version
│   └── CHANGELOG.md       # per-version notes (drives sync messages)
└── .claude/              # BOSS dogfoods itself
```

## Roadmap (how BOSS itself gets built)

1. ✅ Repo + registry + CLI skeleton (`new` / `unlock` / `status` / `list`) + L0 stage.
2. ✅ `/boss` spin-up skill v1 (read PRD → shape → capture IDEA → stack/stage → optional private GitHub repo).
3. Mine dhun's memory → `library/practices/` + `library/memory-seed/`.
4. L1 stage + `/smoke` generalization.
5. `/boss-learn` + `/boss-sync` + versioning — close the loop.
6. L2, then L3 stages.
7. Retro-fit dhun itself as a registered project (proves sync on a real codebase).

## What comes from dhun (and what doesn't)

**In (generalized):** program-manager, pm + Principal-PM pattern, generalist/tester/designer/
db-architect/docs-writer/historian/code-health/release agents; `/smoke` `/spec` `/triage`
`/board` `/close` `/log` `/track` `/code-health` `/design-review` `/ux-check` `/refactor-wave`
`/reflect` `/product-council` `/saturday`; lab-governance tiers, wave decomposition,
doc-placement contract, IDS, RESUME.md, the auto-memory framework.

**Out (dhun-specific):** anything music/DJ — dj-expert, music-collector, the Audio Lab,
raag/Rangoli/Taal, `/new-style`, `/handbook-check`.

**Goldmine:** dhun's project-agnostic *feedback* memories (claude-md structure, incremental
writes, wave decomposition, RFC discipline, no-worktree-writers, tests-first, pressure-test,
RESUME convention…) *are* BOSS's starter practice library. Mining them is step 3.
