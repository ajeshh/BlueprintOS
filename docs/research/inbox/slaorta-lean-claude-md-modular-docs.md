---
dropped: 2026-06-02
source: Reddit comment (slaorta), via Ajesh — same thread as RVW-001
resolved: RVW-002 — ADAPT (recency-window for RESUME.md State; UP candidate for library/practices/)
---

# Claim: keep CLAUDE.md lean + modular ("3 most recent updates, archive the rest")

slaorta's own working pattern, copied from one of their projects. A *documentation-hygiene*
convention (not an outcome claim like RVW-001).

**CLAUDE.md SHOULD contain:** quick-start commands + setup, file-structure overview, brief concept
overviews (5-15 lines max per section), references to detailed docs files, a key-endpoints summary,
an environment-variables table.

**CLAUDE.md should NOT contain:** detailed implementation explanations, full API docs with
request/response examples, JSON schema examples longer than 10 lines, step-by-step workflows with
more than 6 steps, technical implementation details.

**When adding features:** update CLAUDE.md with a brief overview; create/update detailed docs in
`docs/`.

**Recent-Updates rule:** CLAUDE.md shows only the **3 most recent updates**. When adding a new one,
move the oldest entry to `docs/archive/CHANGELOG.md` to maintain exactly 3.

## Why Ajesh flagged it (my read)

Relevant to BOSS's *own* growing session-bootstrap docs — `RESUME.md` in particular, which CLAUDE.md
says to read at the start of every session and which now runs 650+ lines with ~25 fat "State"
entries going back to v0.6.
