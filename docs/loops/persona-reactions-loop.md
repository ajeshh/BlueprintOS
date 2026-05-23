---
id: persona-reactions-loop
type: loop
stage: meta
runner_type: manual
attributed_to: [Ajesh Shah, Ethan Mollick, Rob Fitzpatrick]
also_relevant: [Alberto Savoia, Hamel Husain]
entry:
  - exists: { path: .claude/agents/persona-vibe-coder-newbie.md }
exit:
  - exists: { path: docs/dossier/persona-reactions }
---

# Loop: persona-reactions (founder-experience eval channel)

The cheap pre-filter for the founder-experience layer of BOSS. Parallel to the conscience-evals
(`docs/loops/eval.md`) which tests whether BOSS's detection is right — this loop tests whether
BOSS's *experience* is right, before spending the expensive ask on a real-founder Mom Test
call.

This is the layer that resolves the override on advisory-pass #1 (5 real-founder calls,
deferred through v0.19): personas pre-filter, real founders validate later. The override's
re-open condition includes "persona reactions surface a coherent product story" — this loop
is how that signal arrives.

## Entry artifact

The 8 persona agents exist in `.claude/agents/persona-*.md` (vibe-coder-newbie, eng-builder,
non-tech-founder, first-product, vibe-virtuoso, indie-hacker, returning-founder, domain-expert).

## Purpose

Surface what different cohorts FEEL about a BOSS feature — leaning in, walking away, bouncing,
confused — before that signal can only come from real founders. The reactions are
*synthetic* — they're a model of how each cohort would react, not ground truth. They pre-filter
what to ask real founders, and they catch design failures that would have wasted a real
conversation.

The `runner_type: manual` declares that this loop's "detector" is the human user (Ajesh)
invoking each persona agent against a feature and capturing the reactions. The conscience hook
doesn't auto-run it.

## Exit artifact

A `docs/dossier/persona-reactions/<feature>.md` document containing:
- The feature reviewed (what the personas were shown — the SKILL.md file, the hook output,
  the agent definition, the README section, etc.)
- Each persona's structured reaction (first feeling / what they'd do / where they bounced /
  what they'd want different / real-founder test their reaction informs)
- A synthesis: where multiple personas converged, where they diverged, what surprised
- The 1–3 specific design changes the reactions argue for
- The 1–3 real-founder interview questions the reactions sharpen

## How to run this loop

1. Pick a BOSS feature to review. Could be a skill, a hook firing scenario, an agent
   definition, a CLAUDE.md section, a mode-unlock flow, the README.
2. For each of the 8 personas, in turn: invoke the persona agent, hand it the feature, ask
   for its reaction. Capture the reaction in the persona's section of the reactions doc.
3. After all 8 reactions land, write the synthesis. Look for:
   - **Convergences:** all 8 (or 6+) reacted the same way to one thing — that's strong signal
   - **Divergences:** one cohort reacts very differently — that's the cohort the feature is
     least serving (or most uniquely serving)
   - **Surprises:** what you didn't predict — that's where the personas earned their keep
4. Distill 1–3 specific design changes the reactions argue for. Concrete, not aspirational.
5. Distill 1–3 real-founder interview questions the reactions would sharpen. The cheap signal
   pre-filters the expensive call.
6. The loop closes when the reactions doc exists for the feature. Open a new instance when
   the next feature lands.

## Lead practitioners

- **Ethan Mollick** — *AI as different roles* applied here as: invite AI to play the user, not
  just the analyst. Synthetic cohorts as legitimate pre-filter signal.
- **Rob Fitzpatrick** — Mom Test discipline. The reactions doc captures *what they'd do*, not
  *what they'd say*. Even synthetic personas can be Mom-Tested.
- **Alberto Savoia** — pretotype. The persona reactions are the pretotype of the founder-
  experience research. Cheap; tests demand-signal-for-the-feature before expensive validation.
- **Hamel Husain** — evals discipline. Persona reactions are evals for the founder-experience
  layer; categorize failures, look at the data.

## How to remix

- **Skip:** legitimate only when running real-founder Mom Test calls IS happening on the same
  feature (i.e., the cheap pre-filter isn't worth running because you're already doing the
  expensive validation). Record as override.
- **Swap discipline:** Mollick's AI-as-role lens vs. classical persona research (interviews
  with the targeted cohort *generating* the persona). The latter is real research; the former
  is what BOSS does today because real research is the deferred-via-override step.
- **Author your own:** if a new cohort surfaces (e.g., a returning-after-burnout founder,
  a non-technical-PM-going-solo, a former academic), author a new `persona-*` agent and
  invoke it alongside the standard 8. The 8 covers most cohorts BOSS will meet but isn't
  exhaustive.

## When this loop re-opens

- A new BOSS feature ships → run personas against it
- An existing feature is re-designed → re-run personas; compare with prior reactions
- A new persona is authored → run it against existing feature reactions retrospectively
- A real-founder call (when the override is lifted) contradicts a persona reaction →
  re-author the persona to reflect the real signal

## The line

Synthetic reactions are not validation. They are pre-filter signal — *cheap, fast, infinite,
opinionated, sometimes wrong.* Their job is to make the expensive ask better-aimed, not to
replace it. Treat them with the appropriate skepticism: take their convergences seriously,
their divergences as questions, their surprises as data.
