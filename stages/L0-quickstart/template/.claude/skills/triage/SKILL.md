---
name: triage
description: Turn a vague bug, ask, or idea into a structured IDEA-NNN entry with frontmatter, scope, and a clear next step. The lightest capture step — use it before building anything. Usage - /triage <description>
---

# /triage

Capture intent before it evaporates. Takes a rough thought and produces a structured idea in `docs/ideas/`.

## Steps

1. Read `docs/ideas/INDEX.md` to find the next free `IDEA-NNN` number.
2. From the user's description, draft:
   - **Title** — one line, plain language.
   - **What** — the idea/bug/ask in 1-3 sentences.
   - **Why** — the motivation or the pain it removes.
   - **Scope** — what's in, what's explicitly out.
   - **Next step** — the smallest thing that moves it forward.
3. Append an entry to `docs/ideas/INDEX.md` and (if substantial) create `docs/ideas/IDEA-NNN-<slug>.md` with frontmatter (`id`, `type: idea`, `owner`, `status: seedling`).
4. If the idea is clearly ready to build, say so and suggest looping in `pm` to scope it — or, if the project is outgrowing Quickstart, suggest `boss unlock mvp` for the full spec + build gate.

## Rules

- Don't over-formalize a one-liner. Capture > ceremony.
- One idea per entry. If the user chained several with "also", split them.
- Never start building from `/triage` — this is capture only.
