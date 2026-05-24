---
name: close
description: Session-end ritual — update docs/RESUME.md (state + next tasks + open decisions) and append a /log entry. Run this before stepping away so the next session starts with full context. Usage - /close
---

# /close — leave the project ready for next session

A session that ends without `/close` costs the next session 20 minutes of *what was I doing*. `/close`
is the small ritual that prevents that: it writes the current state to `docs/RESUME.md`, captures
what landed in the devlog (via `/log`), and leaves the working tree in a state your future self can
walk back into cold.

It's the counterpart to *read `docs/RESUME.md` first thing*.

## How to run it

1. **Append a devlog entry** by running the `/log` flow (FEAT, landed, next, surprises). If `/log`
   already ran this session, skip — don't duplicate.

2. **Update `docs/RESUME.md`** (create if missing — template below). Rewrite, don't append:
   - **State (current):** the one paragraph someone re-entering the project needs. What's true *now*.
   - **Next tasks (in order):** the 1–3 concrete things to pick up. Concrete = "wire `/foo` to call
     bar()", not "improve the feature."
   - **Open decisions:** things waiting on a call (yours or someone else's). Each with a tentative
     direction so you don't re-litigate from scratch.
   - **Prompt for the next session:** keep it **evergreen** — a pointer + procedure, never a
     status report. *State* and *Next tasks* already carry the current-state surface; restating
     them here just doubles the drift surface. Save kickoff prompts somewhere stable (a shell
     alias, a snippets app, the `Prompt for the next session` block) so they don't bit-rot
     against the actual RESUME. If you find yourself writing *"we're at v0.X"* or *"X just
     shipped"* in this block, delete it — that's what *State* is for.

3. **Check the working tree.** If there are uncommitted changes the user wants to keep but isn't
   committing now, mention them in RESUME's *State* so next-you isn't surprised. Don't auto-commit.

4. **Report what you wrote.** One line: "RESUME updated · devlog entry added · N uncommitted change(s)
   noted." Then stop — don't summarize the session further; the artifacts are the summary.

## The RESUME template (used when none exists yet)

```markdown
---
id: RESUME
type: resume
owner: pm
status: active
updated: {{today}}
---

# RESUME — {{PROJECT_NAME}}

**Read this first each session.** State + next tasks + open decisions.

## What this project is
_One paragraph. The current articulation — sharpen as the project sharpens._

## State (current)
- _What's real right now: shipped FEATs, the smoke command, the stack._
- _Anything uncommitted worth knowing about._

## Next tasks (in order)
1. _Concrete. Single-session-shaped if possible._
2. …

## Open decisions
- _Question — tentative lean — what would close it._

## Prompt for the next session
> _**Keep this evergreen** — a pointer + procedure, never a status report._
>
> Continue {{PROJECT_NAME}}. Read `docs/RESUME.md` (this file — *State* + *Next tasks* +
> *Open decisions*), `CLAUDE.md`, then `VERSION` + `CHANGELOG`. Cross-check `git log -3`
> against what RESUME claims — if they disagree, RESUME is stale; re-establish ground truth
> first. Then pick up *Next tasks* top down.

## Working reminders
- _Commands, env vars, things easy to forget._
```

## Rules

- RESUME is rewritten, devlog is appended. The devlog is history; RESUME is the current pointer.
- Keep RESUME short — under a page. If it grows past that, you're putting reference material in the
  wrong file; move it to its own doc and link.
- Don't run `/close` if the session was a one-line conversation; reserve it for sessions that moved the project.
- If there's *real* unfinished work (a half-applied refactor), call it out in **State** in plain language.
  Surprises in the next session are the failure mode this skill exists to prevent.
