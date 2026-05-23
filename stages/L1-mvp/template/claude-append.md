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

- **Skills:**
  - `/spec` — promote idea → `FEAT-NNN` spec (v0.21.0+: includes validated-learning field per
    Ries, evals field per Husain, moment #4 restraint check against canvas-loop)
  - `/smoke` — build-health gate; configured per stack
  - `/evals` — AI-correctness gate paired with smoke (Husain; v0.21.0+). For any FEAT with
    LLM in control flow, the eval set lives in `docs/evals/FEAT-NNN.yml`. 20 cases beats 0;
    categorize failures by mode.
  - `/pretotype` — demand-test the bet BEFORE building (Savoia; v0.21.0+). Fake-door / WoZ /
    Mechanical-Turk / Pinocchio / YouTube test / impresario. Set the threshold before running.
  - `/design-tokens-init` — scaffold the three-layer token system at the *first UI commit*
    inflection (IDEA-010 Phase 2; v0.21.0+). Cohort-aware delivery. Prevents the 47-blues /
    pattern-reinvention / billion-line-drift failure modes.
  - `/log` — devlog
  - `/close` — session-end RESUME update
- **Builder agents:** `tester` (owns the smoke gate + acceptance checks for FEATs);
  `program-manager` (sequencing — the *when*, distinct from `pm`'s *what*).
- **Mentor agents:** `mentor-architect` (AI-native stack/architecture, advisory);
  `mentor-gtm` (first 100, channels, positioning).
- **Loops** (on the v0.18 generic loop primitive, MVP-stage):
  - `spec-loop` — gates spec writing on canvas-loop closure (encodes moment #4 restraint;
    skill-side detection via `/spec`)
  - `pretotype-loop` — records that demand-testing happened before significant build
  - `design-tokens-loop` — JIT scaffolds the design token system when UI starts accumulating
    (conscience emits `coherence` moment when entry-met / exit-unmet)
- **Conventions:** `FEAT-NNN` for features in build (already listed in `docs/IDS.md`);
  `docs/devlog.md` is append-only (override grammar lives here per IDEA-008);
  `docs/RESUME.md` is the living state pointer; `docs/loops/` lives alongside `docs/ideas/`;
  `docs/design/DESIGN_TOKENS.md` arrives JIT when design-tokens-loop opens.
- **Graduation:** when the app earns design-system rigor / a real db / prototypes / a board
  → `boss unlock v1`.
