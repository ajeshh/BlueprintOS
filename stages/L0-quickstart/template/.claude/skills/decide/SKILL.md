---
name: decide
description: Record a load-bearing decision as a durable DEC-NNN record — Context / Decision / Why / Consequences, stamped with who decided and how reversible it is. The rationale future-you (and a cofounder who wasn't in the room) can read instead of guessing. Lighter than an RFC, denser than a commit message. Usage - /decide <the decision, or describe it>
---

# /decide — the decision record

Most decisions vanish. The diff shows *what* changed; the chat where you chose it scrolls away. Six
weeks later someone — future-you, or a cofounder — finds the choice and faces two bad options: blindly
accept it, or blindly change it. Neither knows *why*. A decision record fixes that: it captures the
**reasoning**, not just the outcome.

This is an ADR (architecture decision record), kept light. Use it for the calls that are **load-bearing
or hard to reverse** — which idea to pursue, which stack, which market, how equity/ownership splits, a
constraint you're committing to. Skip it for the small two-way-door choices you can undo in a minute
(those belong in `/log` as a one-line note).

## When to reach for it

- A choice you'll be asked to justify later, or that you'd regret silently reversing.
- A **one-way door** (Bezos): expensive or impossible to undo. These *always* deserve a record.
- A decision a **cofounder** needs to see and could later want to discuss — ownership, direction, who
  owns what. (In a team, the record is the thing both can point at instead of misremembering.)

If it's a reversible two-way door, don't ceremonialize it — a `/log` line is enough.

## How to run it

1. **Resolve the decider** (the one named accountable person — the "DRI"). Get their GitHub handle:

   ```bash
   gh api user --jq '.login' 2>/dev/null || git config user.name
   ```

   Use it as `@<login>`. If neither resolves, leave `@you` — never fabricate a name.

2. **Pick the next number.** Look in `docs/decisions/` for the highest `DEC-NNN`; add one. First one is
   `DEC-001`. Create the directory if it doesn't exist.

3. **Write `docs/decisions/DEC-NNN-<short-slug>.md`:**

   ```markdown
   ---
   id: DEC-NNN
   type: decision
   owner: "@<github-login of the decider>"
   status: decided
   created: {{today}}
   reversibility: reversible | costly | one-way
   # supersedes: DEC-MMM   # only if this replaces an earlier decision
   ---

   # DEC-NNN — <the decision, in one line>

   ## Context
   What's true that forced a choice? The constraints, the options on the table, what's at stake.

   ## Decision
   What we're doing. One or two plain sentences. If there were named contributors to the call beyond the
   decider (pairing, a cofounder who weighed in), name them here — credit the thinking.

   ## Why
   The reasoning. Why this over the alternatives. **This is the load-bearing section** — it's the thing
   that's impossible to reconstruct later. Name the alternative you rejected and what would change your mind.

   ## Consequences
   What this commits you to, what it rules out, what to watch. If `reversibility` is `costly`/`one-way`,
   say what the exit would cost.
   ```

4. **Fill from what the founder gave you.** If they only have the one-liner, write Context + Decision and
   leave **Why** as a single honest question prompt rather than inventing rationale. Blanks are honest;
   fabricated reasoning is worse than a gap.

5. **Set `reversibility` truthfully** — `reversible` (undo in minutes), `costly` (real switching cost), or
   `one-way` (effectively permanent). It changes how much the decision deserves to be revisited.

## Superseding, not editing

A decision record is a **historical fact** — it was true when made. Don't rewrite it when you change your
mind. Instead: write a **new** `DEC` with `supersedes: DEC-MMM`, and flip the old one's `status:` to
`superseded`. The chain *is* the story of how your thinking evolved — keep it readable, don't erase it.

## What this is not

- Not an approval gate. `/decide` records a decision; it never blocks one. (BOSS's conscience may *surface*
  a tension; it never picks the decision for you — and with cofounders, it never takes a side.)
- Not a cap table or a legal instrument. A `DEC` can record *that* you agreed equity splits 60/40 with a
  4-year vest — it does not compute the split, and it is not legal advice. For ownership/equity/vesting,
  the record is the conversation you had; **a real attorney is the authority.**
- Not for every choice. Over-record and the log rots. Reserve it for the load-bearing and the one-way.

## Why it's worth the two minutes

The decisions you don't write down are the ones that cause the worst fights and the slowest re-litigation
— solo (with your future self) and especially with a cofounder. A short, dated, attributed record is the
cheapest insurance there is against "wait, why did we do it this way?"
