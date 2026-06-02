---
id: PRACTICE-context-discipline
type: practice
owner: pm
status: active
host: claude-code
provenance: vetted via /vet RVW-005 + RVW-010 (synthesizes RVW-002, RVW-009, RVW-012) — BOSS v0.42.0
---

# Practice — Context discipline

> **What every always-loaded token costs.** On Claude Code, your `CLAUDE.md`, memory, rules, MCP tool
> schemas, and skill descriptions enter the context window at session start — paid on *every* turn.
> Bloat doesn't just cost money on the API; it **dilutes the model's attention** (context distraction:
> bigger context ≠ better answers). Context discipline keeps the always-loaded surface small,
> scopes the rest to load only when relevant, and **enforces** secret/no-read boundaries in the
> harness rather than trusting a prompt.

> **Host-bound.** This practice targets the **Claude Code** host (syntax verified against current
> behavior 2026-06-02). The *principles* (lean always-loaded context; scope-by-relevance; enforce-in-harness)
> are host-neutral; the *mechanisms* (`permissions.deny`, `.claude/rules/`, hooks) are Claude-Code
> specifics. On a different host/model, recalibrate — see the model-recalibration discipline. **Re-verify
> the syntax below when the host changes**; flags and frontmatter formats drift.

## Why (the failure modes it prevents)

- **Context distraction** — past a threshold the model over-weights repeated/irrelevant context and
  neglects its training; creativity and accuracy drop. Lean context is a *quality* lever, not just a
  cost one.
- **Secret leakage** — the model will sometimes read (or even edit) a `.env`/secrets file even when
  told not to. A prompt is not a boundary. Beginners commit keys the model hardcoded.
- **Stale always-on rules** — domain rules that load every session whether or not they're relevant
  are pure overhead (and risk contradicting each other — context clash).

## The four moves

### 1. Keep the always-loaded docs lean
- **`CLAUDE.md`**: only what would *genuinely surprise an experienced dev new to the repo* —
  non-obvious build/test commands, against-default architecture decisions, project constraints. Cut
  anything the model already knows from training (framework syntax, generic preambles) or could learn
  by reading the code for 20 minutes. Rule of thumb: keep it tight (compliance drops past ~200 lines).
- **Session-state docs** (e.g. a `RESUME.md`): keep a **recency window** of the most recent few
  entries; let the full history live in the changelog it already maintains. Don't let an
  append-forever log become the file you read at every session start.
- `<!-- HTML comments -->` are stripped before injection (zero-token notes for humans).
- `@path` imports are organizational only — all imported files still load at startup (no token saving).
- `CLAUDE.local.md` (gitignored) holds personal/local notes. Edits to `CLAUDE.md` apply on
  restart/`/compact`, not mid-session. Run `/context` and `/memory` to see what actually loaded.

### 2. Scope rules to where they apply (`.claude/rules/`)
Put domain-specific instructions in `.claude/rules/*.md` with `paths:` frontmatter so they load
**only when the model touches a matching file** — JIT context instead of always-on:
```markdown
---
paths:
  - "{{SRC_GLOB}}"          # e.g. "src/api/**/*.ts"
---
# {{Area}} rules
{{the rules that only matter for files under that path}}
```
Rules **without** `paths:` load at launch (a second always-loaded `CLAUDE.md`) — use that only for
genuinely global rules. This is just-in-time support (Principle 2) applied to the context window.

### 3. Enforce no-read boundaries in the harness, not the prompt
Secrets and noise get a **hard block** via `permissions.deny` in `.claude/settings.json` — verified
Claude Code glob syntax (`./` = relative to cwd; `**` = any depth):
```json
{
  "permissions": {
    "deny": [
      "Read(./.env)", "Read(./.env.*)", "Read(./secrets/**)",
      "Bash(cat ./.env*)", "Bash(cat ./secrets/*)",
      "Read(./node_modules/**)", "Read(./dist/**)", "Read(./build/**)", "Read(*.lock)"
    ]
  }
}
```
- **A `Read(...)` deny does NOT block Bash** (`cat .env` still works) — add the `Bash(...)` rules too.
- **There is no `.claudeignore` file** in Claude Code (a common myth). `permissions.deny` is the
  mechanism; `.gitignore` is separate and only stops commits, not reads.
- For coverage that also catches MCP tools and skills added later, a **PreToolUse hook** can reject
  any tool call touching a secret path (exit code `2`, or JSON `permissionDecision: "deny"`). **But
  weigh the cost:** a `PreToolUse` hook fires on *every tool call* (a process spawn per call — real
  latency), where the deny-list is a zero-cost native check. So: the **deny-list is the universal
  floor** (always ship it); a **secrets-guard hook is a high-stakes ceiling** — reserve it for
  regulated/PHI work or make it opt-in, don't impose per-call overhead on every project by default.
  A real secret manager is beyond both. (Cost discipline: don't add always-on machinery for marginal
  coverage — the framework BOSS warns founders against becoming.)
  - **BOSS ships this hook dormant** as `.claude/hooks/secrets-guard.js` (canonical in
    `library/hooks/secrets-guard.js`): Read/Edit of a secrets file → **deny**, Bash/MCP referencing
    one → **ask**, else allow; fail-open. It is **not registered by default** (an unregistered hook
    costs nothing — registration is the on-switch). Turn it on by adding the `PreToolUse` block in the
    file header. **Recommended for the `domain-expert` / regulated cohort.**

### 4. Filter noisy tool output before it enters context
A **PostToolUse hook** can compress a 10k-line build/test log to a short error summary before it
reaches the model — the model reasons over the summary, not the firehose.

## The test
*Would this token survive an experienced dev asking "does the model actually need this, here, every
turn?"* If not, cut it, scope it, or block it. Lean context is faster, cheaper, **and sharper**.

## Sources / how this was vetted
Vetted via `/vet` (the skeptical inbox), not adopted on popularity — see `docs/research/verdicts/`
RVW-005 (deny secrets), RVW-010 (token optimization), with RVW-002 (lean session docs), RVW-009
(context-engineering failure modes), RVW-012 (enforce-in-harness). The `.claudeignore` claim was
**rejected at verification** — it does not exist. Re-verify all Claude Code syntax on host change.
