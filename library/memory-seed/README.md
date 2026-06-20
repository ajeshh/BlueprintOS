# memory-seed — the durable-facts shelf

This is the BOSS **superset** home for *durable* project memory — the slow-changing facts that stay
true across sessions. It's one of the shelves the learning loop feeds (alongside `agents/`, `skills/`,
`hooks/`, `practices/`). Seeds here are starting points a project's memory can be grown from; the
learning loop deposits proven, generalizable facts UP into the library.

## The cut this shelf exists to hold (the whole point)

A build has **two memories**, and keeping them apart is what keeps context lean (see
[`../practices/context-discipline.md`](../practices/context-discipline.md) and BOSS `FEAT-020`):

| | **Durable facts** | **Working state** |
|---|---|---|
| Changes | rarely (across sessions) | fast (within a build) |
| Examples | who the founder is, settled decisions, project constraints, the stack once chosen | the live feature's local decisions, gotchas, scratch context |
| Home | Claude's auto-memory + this shelf | `.claude/rules/*.md` with `paths:` (loads **just-in-time**, only when the model opens a matching file) |
| Lifecycle | persists; compounds | created → cleared on `/close` → best bits promoted via `/extract` |

The trap is letting **working state** leak into an always-loaded surface (CLAUDE.md, a session-state
doc). That's paid on every turn *and* dilutes the model's attention. So: **durable facts → here (and
auto-memory); working state → a path-scoped rule that loads only when it's relevant.**

## What a seed looks like

A seed is a single durable fact in the auto-memory format (one fact per file, with frontmatter). See
[`durable-facts-example.md`](durable-facts-example.md). The test for whether something belongs here:
*would this still be true, and still worth loading, three sessions from now?* If it's only true while
one feature is in flight, it's working state — put it in a `.claude/rules/` file instead.
