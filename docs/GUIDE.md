# How to use BOSS

The read-once walkthrough. It explains what you're doing at each stage and when to move on —
not every command (that's [`SKILLS.md`](SKILLS.md)) and not the whole map at once (that's
[`CHEATSHEET.md`](CHEATSHEET.md)).

Two of these live *inside* a project, always current to where you are:
- **`/welcome`** — run it once in a fresh project; a short, cohort-aware orientation that defines
  terms as it goes. The live version of this guide's opening.
- **`boss map`** — run it anytime; shows where you are, what you can run now, and what the next
  unlock adds.

This file is here for the moment *before* that — when you're deciding whether BOSS is for you, or
you want the shape of the whole thing in one read.

---

## The one idea

You can now build faster than you can tell whether you *should*. AI makes a polished prototype
cheap, which makes a new mistake cheap too: shipping a **pseudo app** — an impressive demo with no
proven pain, no real workflow fit, no one who'd pay — and mistaking it for a **real business**.

BOSS is the layer between those two. It helps you build fast *without fooling yourself*: catch the
drift early, scale the ceremony to the evidence, and get out of the way when you're in flow. That's
the whole product. Everything below is how it does it.

Three mechanics carry it:

- **Modes** scale how much structure you get to how far along you are: **Quickstart → MVP → V1 →
  Scale.** You unlock the next one when you've earned it. Nothing turns on before you need it; a
  project that stays in Quickstart forever is a real project.
- **The conscience** is the one piece of BOSS that speaks on its own. When the work drifts from the
  bet you named, it says one thing, hands the decision back, and goes quiet. It never blocks. You
  can pause it (`boss conscience pause --for 8h`) and every override is recorded, never punished.
- **A board of advisors** — *mentors* coach you on the founder-craft code can't teach (business,
  architecture, GTM, fundraising, pitch, talent, and a humane lens with veto power). *Builders*
  (PM, coder, tester, designers) make the thing.

---

## Start where you are

Pick the line that matches your situation. It changes where you start and how fast you climb —
nothing else. (In a project, `/welcome` asks you this and tunes itself; you can skip it.)

- **This is the first thing you've built.** New to building *and* to AI coding. → Run `/welcome`,
  then `/boss`. Stay in Quickstart a while — capture ideas, pressure-test one, let the conscience
  teach you the rhythm. Don't rush to `unlock`; the next mode will still be there.

- **You've shipped a couple of small things.** A few months on Cursor or Claude Code; the *building*
  feels possible, the *what's-worth-finishing* less so. → Start at `/boss`. Capture freely with
  `/triage`; the payoff is `/canvas` — that's where BOSS earns its keep for you. `unlock mvp` when
  you're actually building, not before.

- **You've shipped real products before.** Strong engineer, or a returning founder. → You don't need
  the tour — `/welcome` gives you the 30-second version. BOSS's value for you isn't the scaffolding;
  it's the conscience catching drift you'd rationalize, and the mentor board for the parts that
  aren't engineering. Move fast through the unlocks.

- **You're building somewhere being wrong has real costs.** Health, legal, money, safety. → Same
  path, but turn the harm lens on early: `/ai-failure-states` from the start, and lean on
  `mentor-humane` (it can override the other mentors). Go slower on any claim your product makes.

---

## The walk, rung by rung

Each mode is additive — unlocking the next never removes what you had. `boss unlock <mode>` is
always your call.

### Quickstart — *get the idea out of your head*
Capture an idea, shape it, pressure-test whether it's real. Almost no ceremony.
- **You'll actually use:** `/triage` (capture an idea and keep adding to it), `/canvas`
  (pressure-test it as a humane business — who's served, what's the bet, what could kill it).
- **Ask:** `mentor-venture` — is this worth building, what's the riskiest assumption.
- **Ready to climb when:** you're done capturing and ready to *build* one of these for real.
  → `boss unlock mvp`

### MVP — *build the first working version*
Spec discipline, a build-health gate, demand-testing, and AI-cost/eval/failure-state discipline if
your product leans on a model.
- **You'll actually use:** `/spec` (an idea becomes a buildable FEAT with acceptance criteria),
  `/smoke` (is it even running?), `/pretotype` (test demand *before* you build), `/log` + `/close`
  (keep a devlog and a clean session-end). If you're AI-native: `/ai-first-init`, `/ai-cost`,
  `/evals`, `/ai-failure-states`.
- **Ask:** `mentor-architect` (load-bearing tradeoffs, what to defer), `mentor-gtm` (first users,
  channels).
- **Ready to climb when:** you have real users and the app needs design rigor, a real database, and
  prototypes. → `boss unlock v1`

### V1 — *make it shippable*
The design layer turns on, plus the next tier of mentors.
- **You'll actually use:** `/design-review` (before you code), `/ux-check` (after), `/board`
  (sequence work across features).
- **Ask:** `mentor-business` (model, pricing), `mentor-fundraising`, `mentor-pitch`, `mentor-talent`
  — promoted in here because these questions get real at V1.
- **Ready to climb when:** the team grows and the org needs to be a thing. → `boss unlock scale`

### Scale — *grow it*
Not authored yet. The ladder is real through V1 today.

---

## When you're stuck, ask a mentor

The mentors are advisory — they coach, they don't decide, and none of them gives binding legal or
financial advice (they point you at the real expert and caveat hard).

| The question on your mind | Who to ask |
|---|---|
| Is this worth building? What's the riskiest assumption? | `mentor-venture` |
| What's the load-bearing technical call? What can I defer? | `mentor-architect` |
| How do I get the first users? What's the positioning? | `mentor-gtm` |
| What's the model? Should this be free? What would someone pay? | `mentor-business` |
| Should I raise? When? | `mentor-fundraising` |
| How do I explain this? Is the deck working? | `mentor-pitch` |
| Should I hire? Who first? | `mentor-talent` |
| Who could this harm? Is this dark-pattern-y? | `mentor-humane` *(can override the others)* |

---

## Two things worth remembering

- **The conscience is on your side, not on your back.** It speaks when the work drifts from the bet
  you named, then stops. If it's firing at the wrong time, pause it — that's a feature, not a
  failure. Overriding it is normal; it just gets recorded so future-you can see the deviation.
- **Less is a legitimate answer.** Staying in Quickstart, not raising, not hiring, keeping the team
  at one — BOSS defaults to right-sized and makes you *earn* the heavier path on evidence. It will
  never push you toward a shape because the shape is impressive.

---

## Reference

- **`boss map`** — the live version of this guide, current to your project.
- **[`CHEATSHEET.md`](CHEATSHEET.md)** — the whole ladder on one page.
- **[`SKILLS.md`](SKILLS.md)** — one line per skill, grouped by mode.
- **[`../PRINCIPLES.md`](../PRINCIPLES.md)** — the six rules that define BOSS.
- **[`../README.md`](../README.md)** — what BOSS is and why.
