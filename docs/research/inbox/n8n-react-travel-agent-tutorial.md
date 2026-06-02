---
dropped: 2026-06-02
source: "Gen AI Demystified / Agents in Action" Day 7 — Hamza Farooq & Jaya Rajwani, "Build a ReAct Travel Agent Using n8n" (2025-06-30), via Ajesh
url: https://substack.com/home/post/p-167176184
status: resolved — RVW-011 (REJECT; PRINCIPLE #4 stack-neutral; folded into RVW-008 as worked example)
note: images not retrievable (text-only fetch); they're n8n node screenshots — not load-bearing for a verdict.
---

# Claim: build a working ReAct travel agent in n8n (hands-on tutorial)

A step-by-step, node-by-node build: user input → LLM parse/extract structured fields + short-term
memory → Search MCP (flights/hotels/activities via SerpAPI) → Email MCP (SendGrid/Gmail) → Calendar
MCP (get/create/delete events) → emailed summary. Stack: n8n (no-code/low-code), OpenAI, MCP
servers/clients, SerpAPI. Framed as the Day-7 finale of a 7-part agents series; "deployable, modular,
extensible — doesn't require full-stack development."

## Why this is almost certainly out of scope (my read — NOT the verdict)

This is a **stack-specific build tutorial**, not a best practice or transferable principle:
- **PRINCIPLE #4 (stack-neutral; stacks are learned, not assumed)** is the near-certain killer — BOSS
  does not bake in an n8n + SerpAPI + specific-MCP recipe. If a stack profile like this ever enters
  BOSS, it's as an *output* of a real project's learning loop (UP via `/boss-learn`), not adopted from
  a tutorial.
- **Evidence/relevance:** it's a demo ("isn't a toy" notwithstanding), n=1 author build, no outcome
  data. Nothing to adopt at the BOSS layer.
- **Its real role:** a **worked example of [[three-categories-of-ai-agents]] (#6)** — a Category-1/2
  ReAct agent assembled by a PM in a no-code tool, which is exactly that framework's "most teams start
  here" point. Vet it *as supporting evidence for #6*, not on its own.

Likely verdict at sweep: **REJECT** (out of scope — stack-specific tutorial; folded into the
three-categories vet as an example). Kept short on purpose — skeptical hygiene includes not
over-capturing a low-signal drop.
