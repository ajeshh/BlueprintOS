---
name: stack-decision
description: Example seed — the stack this project settled on, and the one-line why. Durable.
metadata:
  type: project
---

<!-- EXAMPLE seed. A durable fact = still true and still worth loading three sessions from now.
     One fact per file. Delete this and write your project's real durable facts, or let the
     learning loop (/extract → /boss-learn) deposit them here over time. -->

The project settled on **<stack>** at **<IDEA-NNN / FEAT-NNN>** because **<the one-line reason>**.

**Why it's durable:** a settled architectural decision binds every later build choice — the model
should carry it across sessions, not re-derive it. **Why it's not working-state:** it doesn't change
as a single feature moves; if it did, it would belong in a `.claude/rules/` file, not here.
