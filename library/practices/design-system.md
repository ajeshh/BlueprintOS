# Practice: Design system — style never locked into code

> Generalized from dhun's design system (DESIGN_TOKENS single source of truth, central badge/pill
> style utils, "no raw Tailwind colors" enforcement hook, Rangoli generative styles, prototype
> REGISTRY). De-dhuned for reuse. Lands in **V1 mode**; seeds the moment a project grows real UI.

## The principle (PRINCIPLES.md #3)

Style is reusable structure, so it must not get buried in implementation. Extract it into a
**single source of truth** the app *and* prototypes both consume. The test: could a prototype or a
sibling project reuse this design approach without copy-pasting component code? If not, it's locked.

## What the design layer establishes

1. **Design tokens — one source of truth.** Color, type, spacing, radius, elevation, motion as
   named tokens (`DESIGN_TOKENS.md` + a machine format the code imports). Code references token
   names, never raw values. Renaming/retheming happens in one place.
2. **Style guide.** How the tokens compose into patterns: components, states, density, voice. The
   "why," not just the "what."
3. **Central style utilities.** Shared helpers for recurring decorated elements (badges, pills,
   chips) live in one util with a colour budget — never ad-hoc per surface. (dhun: `badgeStyles.ts`,
   pill governance, 4-colour ceiling per surface.)
4. **Five-state requirement.** Every component specifies default / hover / active / disabled /
   empty (and loading where relevant). Missing states are the most common drift.
5. **Prototype reuse.** Prototypes import the *same* tokens + a component registry, so a mockup
   looks like the product and graduates to code cleanly. (dhun: prototype `REGISTRY.md`.)

## Enforcement — just-in-time

- **Quickstart / MVP:** no design enforcement. Hardcoded styles in a throwaway are fine; don't
  impose ceremony unearned. But the *moment* a UI is worth keeping, create the tokens file so style
  is decoupled from the very first commit that matters.
- **V1:** enforcement turns on. A `PostToolUse` hook flags hardcoded style values (e.g. raw colour
  classes) and points at the token instead. `/design-review` before code, `/ux-check` after.
  Agents `ui-designer` (token/visual authority) + `ux-designer` (flows, the 5 states) unlock here.
- **Scale:** design drift audits, token versioning, multi-surface theming.

## To author (when V1 mode is built)

- `template/docs/design/DESIGN_TOKENS.md` (+ a tokens file in the chosen stack's format)
- `template/docs/design/STYLE_GUIDE.md`, component-audit + state checklist
- `template/.claude/skills/design-review/`, `ux-check/`, hook for hardcoded-style detection
- `ui-designer` + `ux-designer` agents
- a prototype registry + the rule that prototypes consume the token system
