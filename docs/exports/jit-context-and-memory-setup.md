# JIT context & memory — a portable setup for a Claude Code project

> **What this is.** A self-contained way to make a Claude Code project keep its *always-loaded* context
> tiny and pull the right context **just-in-time**, plus a lightweight lifecycle so that context clears,
> promotes, and doesn't drift. No framework required — every mechanism here is **native Claude Code**.
>
> **How to use it in dhun.** Read Parts 1–3 once (the model + the mechanism + the lifecycle). Then paste
> **Part 4** into a fresh Claude Code session at the root of the dhun repo and let it audit and implement,
> adapted to dhun's actual structure. Part 5 has the starter files inline if you'd rather hand-place them.
>
> Distilled from a proven practice; written to stand alone. Verified against the official Claude Code
> docs (`code.claude.com/docs/en/memory.md`) on 2026-06-05.

---

## Part 1 — The model: two memories, kept apart

A codebase has **two kinds of memory**, and the single most important move is to stop letting them mix.

| | **Durable facts** | **Working state** |
|---|---|---|
| Changes | rarely (true across sessions) | fast (within a feature/week) |
| Examples | the stack and why, settled architecture decisions, hard constraints, who the user is | the feature you're mid-build on, local gotchas, "don't redo this," scratch context for one area |
| Where it belongs | `CLAUDE.md` (kept lean) + Claude's memory | a **path-scoped rule** that loads only when the model opens a file it applies to |
| Lifecycle | persists; compounds | created → cleared when the work lands → best bits promoted up |

**Why this matters (the cost you're paying without it).** Everything in `CLAUDE.md`, in rules without a
`paths:` field, in always-loaded memory, and in your MCP tool schemas enters the context window **at
session start — and is paid on every single turn.** Past a threshold it doesn't just cost tokens; it
**dilutes the model's attention** (more context ≠ better answers — the model starts over-weighting stale,
irrelevant instructions). So the goal isn't "write more context." It's: **keep the always-loaded surface
small, and let everything else arrive only when it's relevant.**

The trap, stated plainly: **working state leaking into an always-loaded file.** A "current feature" note
in `CLAUDE.md` is read on every turn forever, long after that feature shipped. That's the rot this fixes.

---

## Part 2 — The mechanism (native Claude Code)

### 2a. Path-scoped rules — the JIT surface
Put area-specific guidance in `.claude/rules/*.md` with a `paths:` frontmatter glob. Claude loads the file
**only when it reads a file matching the glob** — not at session start.

```markdown
---
paths:
  - "src/api/**/*.ts"
---

# API rules
- All endpoints validate input at the boundary.
- Use the standard error envelope.
```

- A rule **with** `paths:` → loaded on demand, when a matching file is touched. This is the win.
- A rule **without** `paths:` → loaded every session (a second always-loaded `CLAUDE.md`). Use only for
  genuinely global rules.
- Globs support `**`, brace expansion (`src/**/*.{ts,tsx}`), multiple entries. Subdirectories under
  `.claude/rules/` are fine. (`~/.claude/rules/` applies to every project on your machine.)
- **Note the key is `paths:`** — not Cursor's `globs:`. Different tool, different word.

### 2b. Keep the always-loaded docs lean
- **`CLAUDE.md`**: only what would *genuinely surprise an experienced dev new to the repo* — non-obvious
  build/test commands, against-the-grain architecture decisions, real constraints. Cut anything the model
  already knows from training, or could learn by reading the code for 20 minutes. Compliance drops past
  ~200 lines — treat that as a ceiling, not a target.
- **Any session-state doc** (a `RESUME.md`, a running worklog): keep a **recency window** of the last few
  entries; let the full history live wherever it's already recorded (changelog, git log). Don't let an
  append-forever log become the file you read at every session start.
- `<!-- HTML comments -->` in `CLAUDE.md` are stripped before injection (free notes for humans).
  `@path` imports are organizational only — the imported file still fully loads at startup (no saving).
- Run **`/context`** and **`/memory`** in dhun to see what's *actually* loading every turn. Start there.

### 2c. Enforce the boundaries you don't want crossed (optional but cheap)
Secrets/noise get a hard block via `permissions.deny` in `.claude/settings.json` (zero runtime cost):
```json
{ "permissions": { "deny": [
  "Read(./.env)", "Read(./.env.*)", "Read(./secrets/**)",
  "Bash(cat ./.env*)", "Read(./node_modules/**)", "Read(./dist/**)", "Read(*.lock)"
] } }
```
A `Read(...)` deny does **not** block `Bash(cat ...)` — add the Bash rules too. There is **no
`.claudeignore`** file in Claude Code (common myth); `permissions.deny` is the mechanism.

---

## Part 3 — The lifecycle, without any framework

Path-scoped rules go stale if nothing ever clears them. Here's the discipline, expressed as plain
conventions a mature project can adopt with zero tooling. (Each has an optional automation note.)

1. **Done → clear.** When a feature lands (merged / shipped), the working-context rule for it gets
   **compressed to a one-line outcome and the scratch removed.** The one-liner goes wherever durable
   history lives (CHANGELOG / a decisions log). Make this a step in your "feature done" ritual or PR
   checklist. *Automate (optional):* a `Stop` or post-merge hook that reminds you which `feature-*.md`
   rules belong to now-merged branches.

2. **Promote the keepers.** Before you clear a working-context rule, ask: *is anything in here durable —
   still true three features from now?* If yes, **lift that one line up** into `CLAUDE.md` (or add it to
   Claude's memory with a leading `#` in chat). Clearing and learning become the same gesture. Keep this
   **founder-confirmed** — don't auto-promote; you decide what graduates.

3. **De-drift.** Each working-context rule carries a quiet "last touched" sense (a date line, or just your
   memory of it). A rule untouched across several sessions is a smell: **evict it or refresh it.** The
   cheap version is a periodic glance ("which rules haven't fired in weeks?"). *Automate later, only if
   the manual glance proves too slow:* a small script that lists `.claude/rules/*.md` by mtime.

> **Restraint note (worth keeping).** Don't build the automation up front. The manual rituals above are
> *enough* until they visibly hurt — until a stale rule actually misinforms a session. Let that pain be
> the trigger to automate, not a guess. Start with Parts 2a–2b; add the lifecycle conventions; add tooling
> last.

---

## Part 4 — The executable prompt (paste into Claude Code at the root of dhun)

> Copy everything in this block into a fresh Claude Code session in the dhun repo.

```
You're going to make this repo's context just-in-time and lean, using native Claude Code features only.
Work as a reviewed diff — propose before you move anything, don't clobber my existing CLAUDE.md wholesale,
and never touch secrets. This is a mature codebase, so adapt to what's actually here.

STEP 1 — Audit what's loaded every turn.
- Run /context and /memory. Read the current CLAUDE.md and any always-loaded docs, plus any
  .claude/rules/ files that have NO paths: field (those load every session).
- Report back: roughly how much is paid on every turn, and a line-by-line verdict on CLAUDE.md —
  for each block: KEEP (genuinely always-true, surprising-to-a-newcomer), MOVE (area-specific — only
  matters when editing a particular part of the code), or CUT (stale, or something you'd know from
  training / from reading the code for 20 minutes).

STEP 2 — Find the natural path boundaries.
- From the real directory structure, identify the 3-6 areas that have their own conventions
  (e.g. an api layer, a web/ui layer, a db/migrations area, an infra area). These become path-scoped
  rules. Show me the proposed map (area -> glob) before creating anything.

STEP 3 — Implement, as a diff I approve.
- For each MOVE block, create .claude/rules/<area>.md with a paths: glob scoping it to that area, and
  move the guidance there. Keep the rule body lean.
- Leave CLAUDE.md with only the KEEP blocks. Add a short two-memory note near the top:
  durable facts -> CLAUDE.md + memory; working state -> path-scoped rules that load on touch.
- Create one .claude/rules/feature-context.md (paths: scoped to wherever active work lives) as the
  home for the CURRENT feature's working notes — explicitly ephemeral, pruned when the feature ships.
- If there's no permissions.deny block for secrets, add one (.env, secrets/, node_modules, build dirs).

STEP 4 — Wire the lifecycle as conventions (no new tooling yet).
- Write a short docs/CONTEXT.md (or a section in CONTRIBUTING) stating the rituals:
  (a) when a feature ships, compress its working-context rule to a one-line outcome in <our changelog/
  decisions log> and remove the scratch; (b) before clearing, promote any durable line up into CLAUDE.md;
  (c) periodically evict rules that haven't been relevant in weeks. Do NOT build hooks/scripts for this
  yet — flag them as "add later if the manual version hurts."

STEP 5 — Verify.
- Re-run /context and show me the before/after of what loads every turn. Confirm the moved guidance now
  lives in path-scoped rules, CLAUDE.md is lean, and nothing that was load-bearing got lost.

Show me STEP 1's audit and STEP 2's map first, and wait for my OK before STEP 3 changes any files.
```

---

## Part 5 — Starter rule files (if you'd rather hand-place them)

**`.claude/rules/<area>.md`** — one per area boundary (rename `<area>` and rescope the glob):
```markdown
---
paths:
  - "src/<area>/**"
---

# <Area> rules
<the conventions that only matter while editing files under src/<area>/ — moved out of CLAUDE.md>
```

**`.claude/rules/feature-context.md`** — the live feature's working notes (ephemeral; prune when it ships):
```markdown
---
paths:
  - "src/**"
---

<!-- Loads only when a matching file is opened. Keep the LIVE feature's working notes here — local
     decisions, gotchas, "don't redo this." When the feature ships: compress to a one-line outcome in
     the changelog, then clear this. Promote any durable line up into CLAUDE.md first. -->

# Working context — current feature
- **Active work:** (what's in flight)
- **Local decisions:** (choices binding this work, one-line why each)
- **Gotchas / don't-redo:** (traps already hit, so they're not re-walked)
```

**`CLAUDE.md` — the two-memory note** (add near the top, once):
```markdown
> **Memory, two kinds (kept apart so context stays lean):** *Durable facts* (stack, settled decisions,
> constraints) live here and in Claude's memory. *Working state* (notes that only matter while editing
> one area) lives in `.claude/rules/*.md` with a `paths:` glob — loaded only when a matching file is
> opened, not every session.
```
