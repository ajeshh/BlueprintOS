---
id: IDEA-006
type: idea
owner: pm
status: exploring
created: 2026-05-21
---

# Conscience host-portability — what BOSS needs from any agent host

## Current shape
- **What:** Make explicit which layers of BOSS are agent-agnostic and which are bound to Claude Code,
  and define the *minimum host contract* a different agent (e.g. Codex) would have to satisfy to host
  the conscience — so portability is a scoped decision, not an accident.
- **The three layers (the real model):**
  1. **CLI + state** ([src/](../../src/), `.boss/`, `~/.boss/registry.json`) — zero-dep Node + JSON,
     stack-neutral. **Already agent-agnostic.** Any tool can run `boss new/adopt`, read `.boss/`,
     render the canvas. No Claude required for the scaffolding mechanics.
  2. **Conscience surface** — the skills/agents/hooks and the CLAUDE.md voice. **Claude Code-bound
     today.** This is the layer that makes BOSS *behave* like a conscience rather than a CLI you call.
  3. **The arc** — memory, RESUME, canvas, `.boss` state. The story-holder substrate the
     [[boss-ethos]] memory names as the *precondition* for the moments.
- **The sharp point (from the ethos):** "that's why BOSS can be a conscience when ChatGPT can't" is
  about a host having **durable arc-memory + interrupt points (hooks)** — NOT about the model brand or
  an API key. So the dependency to name is a *host capability contract*, not "you must use Claude."
- **Who it's for:** founders already living in another agent (Codex, etc.) who want BOSS's judgment
  layer; and BOSS's own optionality (Principle 5) — don't foreclose hosts.
- **Smallest version:** a written **host contract** doc — the capabilities the conscience needs
  (persistent per-project memory, a way to inject guidance into the model's context, interrupt/hook
  points so moments can fire unprompted, the ability to register skills/commands). Then a feasibility
  note on which agents meet it. No port yet — just make the boundary legible.

## Capture log
- 2026-05-21 — captured from a positioning conversation ("does it work with Codex? do I need
  Claude?"). Reframed from a yes/no into the three-layer model: CLI is already portable; the
  conscience needs a host with arc-memory + hooks; the model brand is not the dependency.

## Open questions (carried forward)
- **What exactly is the host contract?** Enumerate the primitives the conscience uses in Claude Code
  (skills, sub-agents, Stop-hook for unprompted moments, persistent memory, context injection) and map
  each to "required vs. nice-to-have" for the conscience to still feel like a conscience.
- **Graceful degradation:** if a host lacks hooks (can't fire moments unprompted), does BOSS fall back
  to conscience-only-inside-commands? Is that still BOSS, or just the CLI?
- **Is this premature ceremony (moment #3)?** No real non-Claude project is asking for it yet. Keep as
  *exploring* / decision-legible only — don't build a port until a project earns it. This idea exists
  to mark the boundary, not to schedule the work.
- Does the unprompted-moment Stop-hook path (noted in [RESUME](../RESUME.md) as remaining conscience
  work) get designed host-agnostically from the start, or Claude-first then ported?

## Canvas
_Covered by BOSS's overall canvas ([CANVAS.md](CANVAS.md))._
