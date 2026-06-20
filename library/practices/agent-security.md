---
id: PRACTICE-agent-security
type: practice
owner: mentor-architect
status: active
host: claude-code
provenance: distilled from Simon Willison's 2026 agentic-security writing (lethal trifecta; "Agents Rule of Two"; classifiers are non-deterministic) — BOSS v0.48.0, IDEA-026 Part B
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

## Concrete defaults (what to actually do)

- **Enforce in the harness, not the prompt.** Secret no-read belongs in `permissions.deny` (the
  zero-cost floor BOSS ships) and, for high-stakes cohorts, the `secrets-guard` hook. A hook is a
  **deterministic guard**; the model's own judgment (and any safety *classifier*) is
  **non-deterministic** — never let the classifier be the only thing between untrusted text and a
  destructive action. See [`context-discipline.md`](context-discipline.md).
- **Sandbox by default** for steps that read untrusted input. Untrusted-content reads shouldn't run
  with full filesystem + network.
- **Pin dependencies.** Unpinned deps are an untrusted-input channel (supply chain). Pin versions;
  review what an agent adds.
- **Human-in-the-loop on the irreversible.** The actions that can't be undone (push, deploy, delete,
  send) get an explicit gate — and the gate is a real stop, not a sentence in a system prompt.

## Altitude / JIT (don't scare a day-one founder)

This is **not** a wall of security text on a Quickstart. Route it JIT: the floor (`permissions.deny`)
ships silently with every project; this practice surfaces when the work earns it — a domain-expert /
regulated cohort, the first time an agent reads untrusted web content, or the first deploy. Principle
#2: the right ceremony at the right time. See `IDEA-026`.
