# CLAUDE.md — {{PROJECT_NAME}}

> Scaffolded by BlueprintOS (BOSS) {{BOSS_VERSION}} at stage {{STAGE}} on {{DATE}}.
> Behavior rules live in the first ~40 lines. Reference material is below. Keep it that way —
> compliance drops past ~200 lines. Long tables move to companion docs.

## Working rules (read first)

1. **Capture before you build.** Every idea, bug, or ask becomes an `IDEA-NNN` via `/triage` before code. See `docs/ideas/INDEX.md`.
2. **Stack-neutral until decided.** This project has no assumed stack. The first real build decision picks one; record it in an idea/spec, not in your head.
3. **Source of truth is the docs, not the chat.** Decisions go in `docs/`. If code and a doc disagree, surface it before changing either.
4. **Small, reversible steps.** One concern at a time. Prefer editing existing files to adding new ones.
5. **Ask before risky/irreversible actions** (deletes, force-push, anything affecting shared state). Local reversible edits don't need a check.
6. **Don't over-build.** No speculative abstractions, no error handling for impossible states, no comments that restate the code.
7. **Grow the system deliberately.** When this project outgrows L0, run `boss unlock L1` — don't hand-roll ceremony BOSS already knows how to lay down.

## What exists at this stage (L0 · Sketch)

- **Agents:** `pm` (decides what's worth building), `coder-generalist` (builds it, in whatever stack gets chosen).
- **Skills:** `/triage` (turn a vague thought into a structured `IDEA-NNN`).
- **Docs:** `docs/ideas/` (the idea pool), `docs/IDS.md` (the ID system, minimal at L0).
- **Memory:** Claude's auto-memory is active — it records who you are, your preferences, and project context across sessions.

## How to grow

This project is at **{{STAGE}}**. Stages unlock additively:

| Layer | Adds | When |
|---|---|---|
| **L1 · Foundation** | `/spec` + `FEAT-NNN`, `/smoke` build gate, devlog, `/close` + RESUME.md, tester | you're building the first working spine |
| **L2 · Frame** | design system, prototypes, `/board`, doc-placement contract, db-architect | 3+ features and design matters |
| **L3 · Structure** | PM org, refactor automation, code-health, product council | managing a real product with sub-domains |

Run `boss status` to see your stage and whether newer BOSS practices are available. Run `boss unlock <layer>` to level up.

---

## Reference

### Project overview

<!-- Replace this with what {{PROJECT_NAME}} is. Drop your PRD or rough idea and run /boss
     (once L0 spin-up is wired) or just describe it and let pm + /triage shape the first ideas. -->

_TBD — describe the project here, or point at the PRD._

### Agent roster (L0)

| Agent | Use for |
|---|---|
| `pm` | What's worth building, scope, priority. Not a coder. |
| `coder-generalist` | Implementation in the chosen stack. Configured when the stack is decided. |

### Conventions

- **IDs:** `IDEA-NNN` for raw ideas (see `docs/IDS.md`). More ID types unlock with later stages.
- **Frontmatter:** every new doc carries `id`, `type`, `owner`, `status`.
- **Git:** small commits, present-tense messages, never force-push shared branches without asking.
