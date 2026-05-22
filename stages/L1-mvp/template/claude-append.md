## MVP working rules (added on `boss unlock mvp`)

> {{MODE}} mode adds the smallest spine that lets you actually build: a spec, a smoke gate, a devlog, a
> session-end ritual. Same conscience — capture and validate still come first. Don't out-ceremony the work.

1. **Spec before code.** Any non-trivial change starts with `/spec` — promotes an idea to `FEAT-NNN` with a goal, acceptance criteria, and a smoke check. Throwaway one-liners don't need it.
2. **Smoke before commit.** `/smoke` runs the stack's "is the app even working" gate. Green before the commit, red is information — fix or document the regression.
3. **Devlog every session.** `/log` appends a dated entry to `docs/devlog.md` — what landed, what's next, what surprised you. Lighter than commits, denser than `CHANGELOG`. Future-you reads it before starting work.
4. **`/close` at session end.** Updates `docs/RESUME.md` (state + next tasks + open decisions) and writes a `/log` entry. Read RESUME first thing next session.
5. **Spec → build → smoke → log → close.** That's the loop. When you find yourself skipping a step often, ask whether it's the wrong step or the wrong moment — don't paper over it with more ceremony.
6. **The conscience still runs.** Quickstart's nudges (validation drift, "Done!" graduation) keep firing — MVP doesn't replace the front of the funnel, it sits behind it.

## What MVP adds (alongside Quickstart)

- **Skills:** `/spec` (promote idea → `FEAT-NNN` spec), `/smoke` (build-health gate; configured per stack), `/log` (devlog), `/close` (session-end RESUME update).
- **Builder agents:** `tester` (owns the smoke gate + acceptance checks for FEATs), `program-manager` (sequencing across FEATs — the *when*, distinct from `pm`'s *what*).
- **Mentor agents:** `mentor-architect` (stack, data shape, boundaries — advisory, never writes code), `mentor-gtm` (first 100 users, distribution channels — earned-when-needed, not pre-emptive).
- **Conventions:** `FEAT-NNN` for features in build (already listed in `docs/IDS.md`); `docs/devlog.md` is append-only; `docs/RESUME.md` is the living state pointer.
- **Graduation:** when the app earns design system rigor / a real db / prototypes / a board → `boss unlock v1`.
