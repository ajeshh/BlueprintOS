# Working with a cofounder in BOSS

> A companion to [`GUIDE.md`](GUIDE.md). That one walks the mode ladder; this one is about the other
> axis — **building with someone else.** Everything here is *dormant when you're solo*: if it's just you,
> none of it shows up and nothing changes. It lights up the moment a second person is on the venture.

## The one idea

AI made each of you faster — which, left alone, makes a two-person team *drift apart*: you each work in
your own AI session, ship in parallel, and quietly stop deciding things together. The research is blunt
that this erosion is **invisible** (teams that have drifted still *rate* their teamwork as fine). BOSS's
team layer exists to hold the seam: a shared place to decide, a shared place to learn, a coach for the
partnership, and a conscience that notices when you've gone quiet on each other.

It's built for a **small founding team** — two to a few co-equal founders, often with *different* skill
sets (an engineer who's a first-time CTO; a product or non-technical founder who's never built with an
engineer before). It is not org software; there's no hierarchy, no seats, no limit, no server.

## Add your cofounder

BOSS keys off your **GitHub identity** — no accounts to make.

```
boss team add @their-github-handle "Their Name"
boss team                      # who's on the venture
boss team remove @handle       # if someone leaves
```

`/welcome` also asks "solo, or with someone?" the first time you run it. You can change the answer
anytime. The moment a cofounder is on the roster, the team layer wakes up — and BOSS nudges you, once,
to have the **AI consent + norms conversation** before you divide the work (more on that below).

## The loop, with two of you

| You want to… | Use | What it gives the team |
|---|---|---|
| **Decide something together** | `/decide` → a `DEC-NNN` | A durable record of *what* you chose, *why*, who decided, how reversible — and a **falsifier** ("what would prove this wrong, by when?"). The thing you can both point at later instead of misremembering. |
| **Share what you're learning about AI** | `/practice` → a `PRAC-NNN` | One shared craft commons. A trick one of you finds (a cheaper model for a step, a prompt that stopped the drift) becomes one the other inherits — so you stay current *together*, not in two silos. |
| **See who's driving what** | `boss board` (and `--mine`) | The board shows the owner (`@handle`) on each card once you're a team. Provenance, not a scoreboard. |
| **Get coached on the partnership itself** | `mentor-cofounder` | The one mentor that coaches the *relationship*: dividing work across skill sets, the non-tech↔eng gap, decision rights, and the hard conversations (roles, pace, equity). It serves the partnership as a unit and **never takes a side.** |

## What the conscience watches (and what it won't)

Once you're a team and real work has happened, if you've **never recorded a single decision together**,
the conscience will say so once — *"you've been building a while and haven't decided anything jointly;
are you two actually deciding this together, or in parallel?"* — and point you at `/decide`.

It watches this through the **artifacts** (an empty decision log), never by asking "how's your teamwork?"
(self-report is proven blind to the drift). And it's deliberately conservative: a quiet decision log can
just mean you decide on a call, so if that's you, it stays silent — or mute it outright:
`boss conscience mute coordination`. It surfaces the seam; it **never says whose fault it is.**

## What's shared, what stays yours

This is the part worth understanding clearly:

- **Shared (commits with the repo → push backs it up, a cofounder who clones gets it):** your ideas, the
  canvas, your `DEC` decisions, your `PRAC` practices, the devlog, RESUME, and the venture brain's *read*
  on the project. So **pushing your repo backs up your thinking *and* keeps your cofounder in the loop.**
- **Private to you (never travels):** the conscience's *relationship* notes — what it said to **you** and
  what you did with it — plus your own session trace, and your secrets. One founder's private nudge
  history never reaches the other.

You own your build by construction — it's git, it's yours, and if the partnership ever ends, each of you
can fork and walk with the full shared record. Nothing is held hostage.

## The lightweight working agreement (optional, high-leverage)

Distributed pairs especially: a one-page agreement prevents most friction. Keep it to two primitives —
skip the RACI/DACI matrices:

- **Driver / Approver** — for each area, who *drives* it and who *breaks the tie*. (Equal **equity** is
  fine; equal **control** — a 50/50 deadlock with no tiebreaker — is the trap. Record the call in a `DEC`.)
- **Consent / "safe enough to try"** — for a *reversible* move, the bar isn't "prove it's right," it's "is
  this safe enough to try?" That gives a non-technical cofounder honest language to agree to a technical
  call without having to fully evaluate it.

Add your **response-time norms** while you're at it (so silence isn't misread as conflict), and **where
shared state lives** (it's the repo). `mentor-cofounder` can walk you through all of it.

## The hard lines

- **BOSS never arbitrates between cofounders.** Not `mentor-cofounder`, not the conscience. They surface a
  tension and name the tradeoff; *you two* decide. If you need a tiebreaker, that's a pre-agreed person or
  a lawyer — not BOSS.
- **Equity is a conversation, not a score.** BOSS will *prompt* the equity/vesting talk and help you record
  what you agreed (in a `DEC`) — but it never computes a split, holds a cap table, or gives legal advice.
  Making relative worth legible-and-permanent tends to *manufacture* the unfairness; vesting plus an honest
  forward conversation is the real answer. Point yourselves at a real attorney for the binding parts.

## See also
- [`GUIDE.md`](GUIDE.md) — the mode ladder (Quickstart → MVP → V1 → Scale).
- `boss map` — the live cheatsheet of what's available in *your* install right now (lists `boss team`).
- `mentor-cofounder` — the interactive version of this guide; ask it anything about working together.
```
