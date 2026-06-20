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
     render the canvas. No Claude required for the scaffolding mechanics. *(Data point, v0.36.0:
     `boss board` ([[IDEA-015]]) landed here by design — a deterministic render over file frontmatter,
     zero host contract. Layer 1 keeps earning its keep: real founder value with no Claude dependency.)*
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

## MCP mapping (added 2026-06-02)
The question "how does BOSS work if someone uses MCP / a non-Claude-Code setup?" resolves cleanly
onto the three layers. **Key reframe: Claude Code is not "Claude" — it's a *host*.** BOSS is bound to
the host's *capabilities* (hooks, slash-commands, subagents, `settings.json`), not to the model brand
— you can run Claude via the raw API and get zero conscience. So "scale across setups" = "which host
capabilities does each setup expose?"

| Setup | Layer 1 (CLI + state) | Layer 2 (skills/agents/**hooks**) | Verdict |
|---|---|---|---|
| **Claude Code** (CLI / VS Code / JetBrains) | ✅ full | ✅ full — home | Full BOSS |
| **Claude Desktop / claude.ai** | ✅ (shell) | MCP yes; **no hooks, no subagents** | BOSS-the-tool, no conscience |
| **Claude API / Agent SDK** | ✅ | embed BOSS as MCP tools / shell out | Whatever they wire |
| **Cursor / Aider / Codex / other agent CLIs** | ✅ | MCP varies; **none have Claude Code's hooks** | BOSS-the-tool, maybe |
| **Cron / CI / headless** | ✅ | hooks fire only if Claude Code is the runner | Layer 1 only |

**Pattern: Layer 1 travels everywhere; Layer 2's hook (the unprompted firing) travels nowhere.**

**Where MCP fits** — MCP (an open standard, not Claude-specific: a "USB-C for AI tools" where one
server exposes capabilities to any MCP host) is the natural portability mechanism for the
*deterministic* parts of BOSS:
- CLI verbs (`boss board`, `boss status`, capture, `/spec` promotion) → MCP **tools**
- canvas / RESUME / devlog / `.boss` state → MCP **resources**
- template-shaped skills (`/canvas`, `/welcome`) → MCP **prompts**

**Where MCP can't reach — the sharp point:** MCP is request-response (the model *pulls* a tool when
it decides to). There is no MCP primitive for "inject guidance into every turn whether the model
asked or not." That is a host-level **hook** capability, not a protocol capability. So **the
conscience's unprompted firing does not port via MCP.** Off Claude Code, BOSS degrades to
*conscience-only-when-you-invoke-it* — which is exactly the "is that still BOSS, or just the CLI?"
question already open below.

**Strategic note (not just technical):** BOSS's differentiator — the unprompted conscience — is the
*least* portable part. "Scale across hosts" naively trades away the moat to gain reach. No non-Claude
founder is asking yet (Principle 2), so **don't port now.** The three moves, in order:
1. **Now (earned, cheap):** write the host contract as a real doc (enumerate each conscience
   primitive, mark required vs nice-to-have, grade the hosts above against it). Decision-legibility,
   not a port — this idea's "smallest version."
2. **When a non-Claude-Code founder earns it:** the first port is **BOSS-as-MCP-server** (deterministic
   verbs + canvas/RESUME as tools/resources/prompts). Graceful degradation made concrete; conscience
   stays Claude-Code-only.
3. **Watch for the trigger, don't pre-build:** another host shipping a real interrupt/hook primitive.
   *That* is the day the conscience becomes portable and the MCP-vs-hooks tradeoff dissolves.

> Note: the *inverse* axis — a founder building an app that itself has MCP aspects — is **not** this
> idea. That's [[IDEA-017]] (founder-facing domain best-practices). This idea is BOSS-as-guest;
> IDEA-017 is the founder's-app-as-domain. Keep them apart.

## Capture log
- 2026-05-21 — captured from a positioning conversation ("does it work with Codex? do I need
  Claude?"). Reframed from a yes/no into the three-layer model: CLI is already portable; the
  conscience needs a host with arc-memory + hooks; the model brand is not the dependency.
- 2026-06-02 — added the MCP mapping (above) after a conversation on MCP + non-Claude-Code setups.
  Confirmed the three-layer model holds; named the host-vs-model reframe, the three moves, and the
  split from [[IDEA-017]].
- 2026-06-05 — distribution-shape conversation ("plugin for VSCode/Cursor/vim? build our own
  VSCode/Claude Code? or a shell on top?"). Three-layer model resolved it cleanly; verdict recorded:
  - **Build our own editor / Claude Code fork — NO** (no near horizon). Buys the permanent maintenance
    tax of an *editor* to host a conscience that's a few files; competes with the real product;
    violates zero-dep + small-reversible + "don't monetize lock-in." You only build a host the day you
    need a hook primitive no one offers — and even then push it *into* Claude Code, not fork an IDE.
  - **"Shell on top of them" — REFRAME, don't.** Shell-on-top = middleware chasing N hosts' APIs
    forever. BOSS is already the better shape: a **substrate *underneath*** (files on disk — `.boss/`,
    `.claude/`, registry — any host reads). Under beats on-top: durable, zero-integration, already built.
  - **"Build out the plugin" — right instinct, wrong urgency.** Splits two conflated questions:
    *where do I type?* (editor surface — **already solved**: Claude Code runs in CLI/VS Code/JetBrains/web,
    so BOSS is already cross-surface at full strength) vs *what hosts the conscience?* (capability —
    Claude-Code-only; a non-CC plugin/MCP server ships **Layer 1 only**, the magic doesn't travel).
  - **Conclusion:** not three doors — already through the right one. Keep the architecture; the
    temptation is to spend reach-money before a single non-Claude founder has asked (Principle 2).
    Earned next move stays #2 (BOSS-as-MCP-server, Layer-1 verbs only); the trigger to watch stays #3
    (a host shipping a real interrupt/hook primitive).

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
