---
dropped: 2026-06-02
source: "The Production Gap" — Hamza Farooq, "Claude Code token optimization - best practices" (2026-05-29), via Ajesh
url: https://substack.com/home/post/p-199436005
repo: https://github.com/hamzafarooq/token-optimizer (public — real benchmark data available at vet time if useful)
status: resolved — RVW-010 (ADOPT; cluster anchor → "BOSS context discipline" practice, verify version-bound specifics first)
note: images not retrievable via fetch (text-only); the benchmark numbers are in the text. Repo is public GitHub, not paywalled — can pull real data when vetting.
---

# Claim: structurally optimize Claude Code's context/token use (most actionable, well-tested)

Author tested ~20 viral GitHub repos, reports only a couple of techniques actually worked — decent
skeptical pedigree. **Two tracks, explicitly not comparable:** Claude Code *CLI* users pay with
**response quality** (context bloat dilutes attention); Claude *API* users pay with **money**.

## Core content (the load-bearing material — CLI track is BOSS-relevant)

- **~20,000-30,000 tokens load before you type anything** — system prompt + CLAUDE.md + memory + MCP
  tool names + skill descriptions all enter at session start (a "hi" consumed ~31k, GH #52979). The
  startup layer is the highest-leverage surface. `/context` and `/memory` show the live breakdown.
- **CLAUDE.md under ~500 tokens** (Anthropic guidance: <200 lines; some teams ~60). Strip anything
  Claude can infer from code/training (framework syntax, generic preambles, rosters, FAQs). Keep only
  what would *genuinely surprise an experienced dev new to the repo*: non-obvious build/test commands,
  against-default architecture decisions, project constraints. Benchmark: 3,847→312 tokens = **91.9%
  context reduction, no quality regression.**
  - HTML comments `<!-- -->` are stripped before injection (zero-token notes for humans).
  - `@path` imports split CLAUDE.md but **all imports still load at startup** (organizational, not a
    saving). `CLAUDE.local.md` (gitignored) = personal prefs. Edits don't apply until restart/`/compact`.
- **`.claude/rules/` with `paths:` frontmatter** — rules that load **only when Claude touches a
  matching file**; zero cost until triggered (vs unscoped rules = a second always-loaded CLAUDE.md).
  One case: 1,358→807 always-loaded lines (**41%**) by converting procedure rules → Skills and scoping
  domain rules to their dirs. **The genuinely NEW technique here.**
- **`.claudeignore` (advisory) vs `permissions.deny` (hard block).** `.claudeignore` signals
  irrelevance (Claude can still read if it decides to — GH #36163/#51105); `permissions.deny`
  (`Read(node_modules/**)`, `Read(dist/**)`, `Read(*.lock)`) actually blocks the Read tool. Use both.
- **MCP servers: 10,000-20,000 tokens silent overhead/session** each; `ENABLE_TOOL_SEARCH` defers
  schemas (recover 50-70k in heavy setups); connecting/disconnecting MCP mid-session wipes the prompt
  cache.
- **Hooks filter noise before Claude sees it** — a PostToolUse hook can compress a 10k-line build log
  to a 200-line error summary (RTK tool, 80-99% reduction).
- **API track (founders' apps, not BOSS):** model routing (77.1%), prompt caching (71.5%), multi-turn
  caching (63.2%), output budgeting (56.8%) — stack to 89.3%, but only with deliberate prompt
  structure (stable-before-dynamic, above threshold, cache breakpoints).

## Why this matters for BOSS (my read — NOT the verdict)

**Most actionable drop in the batch, and the anchor of a convergence cluster.** Several queued items
are facets of one BOSS practice: *"BOSS's own (and its scaffolded projects') context discipline."*
- **`permissions.deny` overlaps the [[deny-claude-reading-env-secrets]] drop** — same mechanism,
  broader application (secrets + bloat). Vet them together; one verdict may cover both.
- **CLAUDE.md-under-500-tokens reinforces [[RVW-002]]** (lean docs) and partially [[RVW-001]]
  (StokeJar's "don't hardcode what the model already knows"). **Reframes RVW-002 from a RESUME-only
  trim into: BOSS's CLAUDE.md may itself be over the budget** — worth a token audit.
- **Path-scoped `.claude/rules/`** is a real **ADAPT/ADOPT candidate** + a strong **UP candidate**:
  BOSS could scope its template's rules by **mode/cohort** (MVP rules load only in MVP; domain-expert
  rules only when relevant) — JIT context, exactly PRINCIPLE #2 in the context window. This is novel
  to BOSS.
- **Hook-based noise filtering** ≈ BOSS's existing hook architecture — a PostToolUse log-compressor is
  architecturally native (pairs with the conscience hook).
- **Self-audit angle:** BOSS is a *heavy* Claude Code citizen (14+ skills, many agents, hooks, long
  CLAUDE.md/RESUME). It may be a poster child for the bloat this post measures — eat the dogfood.

Tensions: evidence grade **high** (tested-20-repos skepticism, benchmarks, GH-issue citations, public
repo). Caveats: many specifics are **Claude-Code-version-bound** (token floors, `ENABLE_TOOL_SEARCH`,
flags) → recalibration-sensitive ([[IDEA-014]]); **verify current behavior** before encoding. Scope:
CLI-track = BOSS-internal + template; API-track = founders' apps (out of BOSS-core scope, maybe a
`/ai-cost` note). Watch over-fitting to one author's benchmark harness.
