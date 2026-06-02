---
dropped: 2026-06-02
source: Reddit (r/ post + comments), via Ajesh
resolved: RVW-001 — REJECT (kept: carries a NOT-YET founder-facing ADAPT candidate + IDEA-014 evidence)
---

# Claim: the four-rule CLAUDE.md ("Karpathy's CLAUDE.md", forrest chang's file)

## The post

"Karpathy's CLAUDE.md just crossed 220k GitHub stars." A developer (forrest chang) read a Karpathy
post, identified four failure modes Karpathy named, and converted them into a single ~70-line
CLAUDE.md, dropped on GitHub 27 Jan. 220k combined stars — one of the fastest-growing repos in
GitHub history.

**Problem it claims to solve:** Claude Code starts every session cold — no memory of your stack,
past decisions, what you ruled out, why you chose one approach. So it guesses and refactors things
that weren't broken. Karpathy: models make wrong assumptions on your behalf and barrel ahead without
checking — they don't manage their own confusion, ask for clarification, surface inconsistencies, or
push back when they should.

**The whole file = four rules (~70 lines):**
1. **Ask, don't assume.** If something's unclear, ask before writing a line. No silent guesses about
   intent, architecture, or requirements.
2. **Simplest solution first.** Implement the minimum thing that works. No abstractions you didn't
   request.
3. **Don't touch unrelated code.** If a file isn't part of the current task, leave it.
4. **Flag uncertainty explicitly.** If you're not confident, say so before proceeding — confidence
   without certainty causes more damage than admitting a gap.

**Why it spread (the poster's theory):** every dev who's used Claude Code for more than a week has
been burned by exactly these failure modes and was patching them manually, one frustrated session at
a time. "While everyone's debating which model to switch to next, the actual edge is in how precisely
you instruct the one already in front of you."

## The comments (the dissent — load-bearing for vetting)

- **HyperionCantos:** good when starting out / coming from normal coding. After the beginning stage
  these steps are too slow; you'll want harness-engineering concepts so you can fire a query off and
  not re-confirm the same questions over and over.
- **johannthegoatman:** current models don't have these issues for him. (1) would slow him way down —
  it'll ask questions it already knows the answer to because it's "supposed to"; (2) he wants the
  *best* solution, not the simplest — Claude is already lazy sometimes, he tells it the opposite;
  (3) if touching other code improves the goal, it should — hasn't been an issue since 4.5.
- **slaorta:** shares a different pattern — a *modular documentation strategy*: keep CLAUDE.md concise
  and scannable (quick start, file structure, brief 5-15 line concept overviews, references to
  detailed docs, endpoints, env vars table). NOT in CLAUDE.md: detailed implementation, full API docs,
  long schema examples, >6-step workflows. "Recent Updates" rule: CLAUDE.md shows only the 3 most
  recent updates; move the oldest to docs/archive/CHANGELOG.md.
- **StokeJar (the sharpest):** hardcoded personality overrides are brittle because Claude Code
  constantly changes (new models + harness updates). Opus 4.6 three months ago may not have asked
  enough; 4.8 on the latest may ask too many. Different projects need different engagement/complexity
  levels. He wants Claude *flexible and context-aware*, not locked into an approach by a few system
  prompts trying to override tens of thousands of hours of RLHF. His practice: spend time with each
  new model seeing how it approaches problems, subtly adapt his own approach — expects to do this less
  as models mature and become more consistent.
- (noise: "I put 'make no mistakes' in mine"; an Almanac self-updating-wiki plug.)

## Why Ajesh dropped it

Testing /vet on a real, popular, contested best-practice. The four rules look adjacent to things BOSS
already believes (ask-don't-assume ≈ the conscience; simplest-first ≈ PRINCIPLE #2; flag-uncertainty
≈ the honest-verdict discipline). Question: does BOSS adopt anything here, or has it already
internalized the good parts — and does StokeJar's brittleness critique actually indict any BOSS
practice?
