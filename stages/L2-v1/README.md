# L2 · V1 — NOT YET AUTHORED

The shippable-v1 mode — "ready for a real, polished release." This is where the **design layer**
turns on (PRINCIPLES.md #3: style never locked into code). Planned contents (generalized from dhun):

**Design system** — see [`library/practices/design-system.md`](../../library/practices/design-system.md)
- design tokens as single source of truth (the app *and* prototypes consume the same system)
- style guide + central style utils (badges/pills) with a colour budget
- 5-state requirement per component (default/hover/active/disabled/empty)
- `/design-review` (before code) + `/ux-check` (after)
- **enforcement turns on here:** a hook that flags hardcoded style values and points at the token
- prototype process + REGISTRY — prototypes reuse the app's design approach, graduate to code cleanly

**Product structure**
- `/board` (live working state from frontmatter)
- `AGENT_DOC_MAP` doc-placement contract
- `/contract-check` (type/interface sync)
- agents: `ui-designer` (token/visual authority), `ux-designer` (flows + states), `db-architect`, `docs-writer`, `prototype-builder`

To author: add `manifest.json` + `template/` here. Establish tokens *as soon as a project grows
real UI* (even in MVP) so style is decoupled from the first commit that matters; enforce strictly at V1.
