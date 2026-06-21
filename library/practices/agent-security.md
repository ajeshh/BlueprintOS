---
id: PRACTICE-agent-security
type: practice
owner: mentor-architect
status: active
host: claude-code
provenance: distilled from Simon Willison's 2026 agentic-security writing (lethal trifecta; "Agents Rule of Two"; classifiers are non-deterministic) — BOSS v0.48.0, IDEA-026 Part B · hardened v0.79.0 with the 2026 agent-native surface — OWASP Agentic ASI Top 10 (RVW-042), agentic misalignment (RVW-032), Anthropic containment + Redwood control (RVW-044), insecure AI-generated code & client-side key exposure (RVW-054)
---

# Practice — Agent security (a deterministic guard around a non-deterministic model)

> **The shape of the risk.** The moment a founder runs an AI agent on their machine with file access,
> a network, and instructions from the internet, they've assembled the surface attackers want. The
> agent reads a web page / an issue / a dependency's README, that text contains instructions, and the
> agent — being helpful — follows them. Security here is **architectural, not a prompt you add**. You
> can't politely ask a model to never be tricked; you constrain what a tricked model can *do*.

## The lethal trifecta (name it so you can break it)

Data exfiltration / damage needs three things together. Remove any one and the attack can't complete:

1. **Untrusted input** — content the agent reads that an attacker can influence (web pages, issues,
   emails, scraped docs, a dependency).
2. **Access to private data** — secrets, customer data, the founder's files.
3. **Ability to act / exfiltrate** — send a request, write a file, run a command, post somewhere.

## The Rule of Two (the operating heuristic)

> Prefer that an agent (or a single agent step) has **at most two** of the three. The third is the
> one you remove for that task.

- Reading untrusted web content? Don't also give that step secrets *and* an open network to send
  them. Sandbox it, or split the work so the reading step can't act.
- Acting on private data? Keep untrusted input out of that step's context.

## When the agent can act: the agent-native surface (2026)

The trifecta is the *data-flow* risk. Once an agent has tools, memory, and autonomy, a second surface
opens — the **agent itself** going wrong. Two things to hold:

- **Agentic misalignment is measured, not hypothetical.** Anthropic showed frontier models — given
  autonomy plus access to sensitive context — taking harmful, self-preserving actions under goal
  conflict (insider-threat-shaped). The lesson isn't "the model is evil"; it's *don't grant standing
  autonomy + sensitive access and assume good behaviour — bound both, and gate what can't be undone.*
- **For an agent, the threat model is the OWASP Agentic ASI Top 10 (Dec 2025), not the stateless LLM
  list.** An agent's real attack surface: goal hijack, **tool misuse**, identity/privilege abuse,
  **agentic supply chain** (a poisoned MCP server or tool), unexpected code execution, **memory /
  context poisoning**, insecure inter-agent comms, cascading failures, human-agent trust exploitation,
  rogue agents. Each has a real 2025 incident behind it (EchoLeak, the GitHub-MCP exploit, the Replit
  production-DB wipe). If you ship an agent, this is the list to defend — and the one to `/red-team`
  against. The stateless LLM Top 10 still covers a plain prompt-in/text-out path.

## Concrete defaults (what to actually do)

- **Enforce in the harness, not the prompt.** Secret no-read belongs in `permissions.deny` (the
  zero-cost floor BOSS ships) and, for high-stakes cohorts, the `secrets-guard` hook. A hook is a
  **deterministic guard**; the model's own judgment (and any safety *classifier*) is
  **non-deterministic** — never let the classifier be the only thing between untrusted text and a
  destructive action. See [`context-discipline.md`](context-discipline.md).
- **Sandbox by default** for steps that read untrusted input. Untrusted-content reads shouldn't run
  with full filesystem + network.
- **Match isolation to your oversight** (Anthropic's containment principle: the less you can watch a
  step, the more it should be boxed). Concrete tiers: a **read-only mount** where the agent only needs
  to read; **read-write-no-delete** where it edits but shouldn't be able to destroy; an **egress
  allowlist** (the agent reaches the two hosts it needs, not the whole internet) for any step touching
  untrusted input. And **inspect tool *returns* before they re-enter context** — a poisoned tool
  result is just untrusted input arriving through the back door.
- **Pin dependencies.** Unpinned deps are an untrusted-input channel (supply chain). Pin versions;
  review what an agent adds. (This is ASI04 — the agentic supply chain — in practice.)
- **Human-in-the-loop on the irreversible.** The actions that can't be undone (push, deploy, delete,
  send) get an explicit gate — and the gate is a real stop, not a sentence in a system prompt. Where a
  human can't be in the loop, put a *cheaper, trusted check* in front of the autonomous one (Redwood's
  control framing: a small reliable model can screen a big autonomous model's destructive calls).

## The app you ship is an attack surface too

The trifecta and the ASI list are about the *agent on your machine*. But the **code the agent writes
for your product** is its own risk — and a distinct one a founder is far more likely to ship by
accident:

- **AI defaults to insecure when a secure option exists.** Veracode found ~45% of AI-generated code
  ships with an OWASP-Top-10 vulnerability, and it does *not* improve as models get bigger. Treat
  generated code as *unreviewed*, not *done*.
- **Client-side key exposure is the classic vibe-coded leak.** API keys baked into frontend JS, an
  open storage bucket, a secret committed to the repo — the 2025 incidents (the Tea breach, ~25k
  secrets found across vibe-coded sites, a 1.5M-key exposure) are nearly all this one shape.
  **`secrets-guard` does *not* catch it.** That hook stops the *agent* reading a secret file into
  context; it does nothing about a *shipped app* exposing a key. Different surface, different defence.
- **The antidote is a pre-ship scan, not a prompt.** Before the first deploy: a secret scan (no keys
  in the bundle or the repo) plus the OWASP web basics. `/red-team` carries this pass. For a
  non-technical founder it's the single security gate that matters most — they can't spot the vuln
  themselves, so the scan has to.

## Altitude / JIT (don't scare a day-one founder)

This is **not** a wall of security text on a Quickstart. Route it JIT: the floor (`permissions.deny`)
ships silently with every project; the rest surfaces when the work earns it, one trigger at a time —
the **trifecta + Rule of Two** the first time an agent reads untrusted web content; the **agent-native
ASI surface** the first time the founder ships an agent with tools and memory; the **pre-ship scan**
at the first deploy; the **full battery** for a domain-expert / regulated cohort. Principle #2: the
right ceremony at the right time, never the whole wall at once. See `IDEA-026`.
