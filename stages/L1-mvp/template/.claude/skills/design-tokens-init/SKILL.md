---
name: design-tokens-init
description: Scaffold the minimal three-layer design token system at the first UI commit. Prevents the 47-blues / pattern-reinvention / billion-line-drift failure modes that happen by default when AI generates UI without discipline (IDEA-010). Cohort-aware delivery — vibe-coder-newbie gets SHOWING; eng-builder gets OFFERING; vibe-virtuoso gets OVERRIDE-FRIENDLY. JIT — runs when design-tokens-loop opens. Usage - /design-tokens-init
---

# /design-tokens-init — scaffold the design tokens system

The discipline that prevents the most-common AI-generated-UI failure modes. Without it, every new
screen Claude generates will derive its own colors, spacing, and component patterns — and the
codebase grows linearly with screens (the "billion-line drift" from IDEA-010). With it, the
tokens file is the single source of truth that survives AI generation because the AI is
*explicitly told to use it.*

This skill is **JIT**: ships in MVP mode, but only runs when `design-tokens-loop` opens (i.e.,
the project starts accumulating UI without a tokens file). For a backend-only project, this skill
never runs. For a UI-heavy project, it runs at the first UI commit.

## When to run it

- `design-tokens-loop` is open (UI exists, no tokens file).
- Founder ran the skill explicitly because they want the system before any UI.
- After a design audit revealed drift — re-init to consolidate.

## How to run it — cohort-aware delivery (v0.20+)

Read `.boss/config.json` for the `cohort` field. Adjust the delivery accordingly:

### `vibe-coder-newbie` / `first-product` — SHOW

Generate the tokens file + a worked example. Don't just create — refactor one existing component
to use the new tokens so the founder *sees* the pattern. Plain language:

> *"I'm setting up a tokens file. Colors, spacing, typography in one place. I'll also refactor
> your `<existing-button>` to use the tokens — so you can see what the pattern looks like.
> From now on, when you ask me for new UI, I'll reference these tokens. New colors only get
> added here; never inline. Sound good?"*

### `eng-builder` / `returning-founder` — OFFER + SKIP THE 101

> *"Setting up three-layer tokens: primitives → semantic → component. Standard architecture.
> Want me to scaffold the Style Dictionary config too, or are you using your own pipeline?"*

### `vibe-virtuoso` — OVERRIDE-FRIENDLY

> *"Tokens system, three layers. The override pattern's there if you want to skip — record
> rationale in the devlog. Most likely failure mode you'll hit if you skip: 47 blues by sprint
> 3. Your call."*

### `non-tech-founder` / `domain-expert` — PLAIN-LANGUAGE COACH

> *"Quick setup before the UI accumulates. The problem this prevents: as you build more
> screens, each one will use slightly different colors and spacing unless we put them in one
> file the AI reads every time. I'll do that now — takes a minute. Domain-specific note: if
> your colors carry meaning (e.g., medical severity, regulated states), name them by meaning
> in the tokens, not by hue."*

### `indie-hacker` — RIGHT-SIZED

> *"Minimal tokens setup. Stack-portable — won't lock you into a tooling choice. I'll skip the
> heavy Style Dictionary / Theo machinery; we can add it later if the system earns it."*

### Unspecified — neutral plain language

> *"Setting up a tokens file so style stays one source of truth. Reduces the chance the
> codebase grows 47 shades of blue. Takes about a minute."*

## The minimum three-layer token system (Nathan Curtis layer-cake)

Create `docs/design/DESIGN_TOKENS.md` (the human-readable spec) + the stack-specific token file
(JSON / CSS variables / TypeScript / etc. depending on stack):

### Layer 1 — Primitives (raw values)

Color scales, spacing scale, typography scale, radius scale, elevation, motion. Names are
descriptive of the *value*, not the use:

```yaml
color.gray.100: '#f7f7f7'
color.gray.500: '#888888'
color.blue.500: '#3B82F6'
spacing.s: 4
spacing.m: 8
spacing.l: 16
```

### Layer 2 — Semantic (meaning)

Names describe the *role*, not the value. AI uses these. **This is the AI-tolerant layer.**

```yaml
color.action.primary: { ref: color.blue.500 }
color.surface.background: { ref: color.gray.100 }
color.surface.foreground: { ref: color.gray.900 }
color.text.body: { ref: color.gray.700 }
color.text.muted: { ref: color.gray.500 }
spacing.element: { ref: spacing.s }
spacing.section: { ref: spacing.l }
```

### Layer 3 — Component (occasionally needed)

Component-specific tokens when a component has unique constraints. Most projects don't need
this layer until V1. If you're reaching for it at MVP, you're probably premature.

### The brand-anchor

Read `docs/ideas/CANVAS.md` Promises cell. The brand voice declared there should anchor the
*choice of primitives*. Don't default to Tailwind blues; pick primitives that match the
declared brand. If the canvas's Promises cell is `_(not yet)_`, flag it — design tokens without
a brand anchor will drift back to internet-defaults.

## After scaffolding

1. Update the project's CLAUDE.md (or claude-append.md) to declare the token discipline:

   ```markdown
   ## Design tokens (added by /design-tokens-init)

   This project uses three-layer design tokens. **All style values come from
   `docs/design/DESIGN_TOKENS.md` + the corresponding code file.**

   When generating new UI:
   1. Search `src/components/` for similar patterns first; reuse before creating.
   2. Reference tokens by semantic name (`color.action.primary`), never raw hex.
   3. Specify all 5 states (default / hover / active / disabled / empty) explicitly.
   4. Reject "make it pretty" prompts; anchor to the canvas Promises cell.
   ```

2. The `design-tokens-loop` exit predicate now passes — loop closes.

3. Going forward, `design-drift-loop` (V1) watches for drift (raw hex codes appearing, near-
   duplicate components, tokens file untouched while components grow).

## Rules

- **Three layers, not two.** Two-layer (primitives → component) is fragile under AI generation.
  Three layers (primitives → semantic → component) gives AI a meaningful name to grab.
- **Brand-anchor the primitives.** Don't default to internet-aesthetic. Canvas Promises cell IS
  the brief.
- **Tokens file LIVES in the prompt context.** When asking AI for UI work, *always* pass
  `DESIGN_TOKENS.md` as context. This single discipline prevents 80% of the drift.
- **JIT — only scaffold when needed.** Don't init tokens before there's UI to use them. The
  loop's entry predicate is the trigger; don't pre-empt it.
- **Override is recorded, not blocked.** A founder skipping this skill is legitimate; record
  in devlog with substantive rationale.
- **Cite the field.** Brad Frost (Atomic Design), Nathan Curtis (layer-cake), W3C Design Tokens
  Community Group. Not BOSS's inventions — applied with build-integration.
