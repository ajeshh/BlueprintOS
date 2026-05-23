# BlueprintOS

> **For founders building with AI — the thinking layer that nudges when you're drifting and
> pauses on command. No growth-hacking pressure. Override-friendly.**
>
> *(The shorter version: BOSS is the just-in-time conscience for AI-native founders. Pause it
> any time.)*
>
> Cursor and Lovable generate the code. BOSS scaffolds the *thinking about what to build, when
> to ship, and when the discipline should get out of your way.* Brings a mentor board for the
> parts code can't teach, a conscience that catches drift early, modes that scale ceremony to
> evidence. Calm-company by default. Open. Inspectable. Local-only state.

## If this is you

You've been using Cursor or Claude Code for a few months. You've shipped one project this
year. There are two more in `~/projects/` you didn't finish, and a folder of ideas you didn't
start. Each new project, you re-invent the same scaffolding — and somewhere around screen 3
the design starts drifting (47 different blues, every component a snowflake), or you realize
you never actually pressure-tested whether the bet was real.

The honest question AI raised: *if I can build anything, what should I build, and how do I
know if it's worth finishing?*

BOSS is one answer.

## What BOSS is, plainly

A CLI plus a set of skills, agents, and loops that run inside Claude Code:

- **`boss new my-app`** — scaffolds a project at the lightest level (Quickstart). Five seconds
  to working. One idea-capture skill, an optional private GitHub repo, a `CLAUDE.md` that
  fits on a screen.
- **`boss unlock mvp`** — adds the spec discipline (`/spec` with validated-learning + evals
  fields), the smoke gate, the demand-test step (`/pretotype` — Savoia), and JIT design-tokens
  scaffolding when your project earns it.
- **`boss unlock v1`** — adds full design review (`/design-review` + `/ux-check` + token
  enforcement), cross-FEAT sequencing (`/board`), and the next-tier mentors (business,
  fundraising, pitch, talent).
- **A conscience that nudges.** When you've captured three ideas and tested none, it speaks
  once. When you're spec'ing a feature your canvas never validated, it surfaces restraint.
  Cohort-aware (set yours during spin-up; it adjusts the voice). Always overridable; never
  blocking. Silence it for a sprint: `boss conscience pause --for 8h`.
- **A mentor board.** Eight advisors (venture, architect, GTM, business, fundraising, pitch,
  talent, humane) coach the founder. Plus a builder team (designer, voice-keeper, prompt-
  coach) for the craft. Plus eight proto-personas (vibe-coder-newbie, eng-builder,
  indie-hacker, returning-founder, domain-expert, …) you can show features to before showing
  them to real founders.

Built on Node — zero dependencies. Markdown + YAML everywhere a human reads; predicate-based
loops everywhere a machine evaluates. Lives in Claude Code. Everything runs locally.

## A concrete moment

You've used `/triage` four times this week capturing ideas. You haven't run `/canvas` on any.
You submit a prompt — anything — and the conscience fires once:

> *"That's the fourth thing you've added here, and none of it's been tested. Who would you
> talk to first to find out if any of them are real? `/canvas` is one way to pressure-test
> it — but a 15-minute call with the right person beats it."*

Then it goes quiet. You decide.

That's the shape of every interaction. Discipline shows up when it can help, hands the
decision back, gets out of the way. Discipline never accumulates as ceremony you have to
work around.

## What you actually get

`boss new` (Quickstart mode):
- 3 agents — `pm`, `coder-generalist`, `mentor-venture`
- 5 skills — `/boss`, `/triage`, `/canvas`, `/boss-sync`, `/boss-learn`
- The conscience hook + 2 loops (`capture-loop`, `canvas-loop`)

`boss unlock mvp` (additive):
- 4 more agents — `tester`, `program-manager`, `mentor-architect`, `mentor-gtm`
- 7 more skills — `/spec`, `/smoke`, `/evals`, `/pretotype`, `/design-tokens-init`, `/log`, `/close`
- 3 more loops — `spec-loop`, `pretotype-loop`, `design-tokens-loop`

`boss unlock v1` (additive):
- 7 more agents — `ui-designer`, `ux-designer`, `db-architect` + 4 template mentors (business,
  fundraising, pitch, talent)
- 3 more skills — `/board`, `/design-review`, `/ux-check`
- 1 more loop — `design-drift-loop`

Each unlock is additive; nothing gets ripped out. Each unlock is your call, not the tool's.
A project that stays in Quickstart forever is a legitimate project.

## What BOSS isn't

- **Not a framework you have to learn.** First hour: `boss new`, `/boss`, `/triage`. That's
  the whole vocabulary you need.
- **Not a replacement for talking to real users.** The proto-personas pre-filter what to ask
  real founders; they don't replace the conversations. The advisory pass and the v1 playbook
  are explicit about this — see [`docs/dossier/`](docs/dossier/).
- **Not a YC.** Doesn't take equity. Doesn't push toward venture-scale. Defaults to *"you
  should probably not raise; you should probably not hire; you should probably stay right-
  sized"* until evidence says otherwise.
- **Not magic.** Each piece is inspectable. `boss status --conscience` shows what's open, what
  would close it, what overrides you've recorded. The source is plain Node.
- **Not opinionated about your stack.** Stack-neutral until your first build decision; then
  the coder specializes itself. Design tokens are stack-agnostic with per-stack patterns.

## Install + first 5 minutes

```bash
# alpha install — clone the repo, link the CLI globally
git clone <this-repo> BlueprintOS
cd BlueprintOS
npm install -g .

boss new my-app                 # 5 seconds
cd my-app
claude                          # open in Claude Code
> /boss                         # describe your idea; the team spins up
```

After that:

```bash
boss status                     # mode + pinned BOSS version + drift
boss status --conscience        # loops state + recent overrides + cohort
boss unlock mvp                 # earn the next layer when ready
boss conscience pause --for 8h  # silence everything for a bounded sprint
boss conscience resume          # bring it back
```

## The principle

Six rules in [`PRINCIPLES.md`](PRINCIPLES.md). The one that matters most: **humane before
viable.** A tool that exists to help founders build well must itself behave well. BOSS pauses
on command. Overrides every loop on request. Records every override so future-you sees the
deviation. Refuses to nag. Refuses to grade. *The seasoned hand who's built many things and
doesn't need the credit.*

The other five rules govern when to add ceremony (only as earned), when to capture practice
UP into BOSS's library (when reusable across projects), when to push practice DOWN into a
project (when validated), how to keep changes small (each release the minimum experiment that
produces validated learning), and how to keep style decoupled from code (design tokens as
authority).

## Where this is

v0.23.0. Quickstart + MVP + V1 modes authored. 23 capability releases. Self-hosted (BOSS
itself runs in MVP mode, using BOSS). All discipline patterns demonstrated by BOSS-on-BOSS
before they ship anywhere else.

**This is alpha.** The conscience eval set has 84 cases; the conscience has been pressure-
tested only against synthetic personas. Real-founder validation hasn't happened yet
(deliberate override — see [`docs/dossier/boss-advisory-pass-001.md`](docs/dossier/boss-advisory-pass-001.md)).
If you try BOSS and it falls down, *that's the most useful thing you can tell me.*

## License + shape

Open source. Calm-company by default. No monetization of lock-in. No telemetry. Local-only
state — your project's data stays in your repo + `~/.boss/registry.json` on your machine. If
a business model ever emerges, it'll be hosted advisory sessions or patronage; never the CLI
itself.

[The Humane Product Canvas](docs/ideas/CANVAS.md) makes BOSS's whole bet visible — the
People, Problem, Promises, Risks & Harms, Principles, and the live riskiest assumption. Read
it if you want to know what BOSS is betting on, and what could kill it.

## Acknowledgements

BOSS draws on a roster of practitioners — Don Norman, Brad Frost, Nathan Curtis, Jakob
Nielsen, Steve Krug, Ash Maurya, Eric Ries, Alberto Savoia, Rob Fitzpatrick, Bob Moesta,
Teresa Torres, Andrej Karpathy, Simon Willison, Ethan Mollick, Guillermo Rauch, Hamel Husain,
Jason Liu, Christopher Noessel, Indi Young, John Maeda, April Dunford, Andy Raskin, Jason
Fried & DHH, Rob Walling, Paul Jarvis, Erika Hall, Mike Monteiro, Tristan Harris, Cathy
O'Neil, Cal Newport, and many more — see [`docs/mentor-practitioners.md`](docs/mentor-practitioners.md).
Mentor agents cite specific practices by attribution; **no agent impersonates a person**.

The Humane Product Canvas framework is by Ajesh Shah; reused as the spine of BOSS's `/canvas`
skill.

---

*[For the interior architecture — how the CLI works, how the loop primitive composes, how
the conscience hook reads predicates, how the registry tracks projects, how sync works —
read [`PRINCIPLES.md`](PRINCIPLES.md), [`docs/RESUME.md`](docs/RESUME.md), and the
[`docs/ideas/`](docs/ideas/) backlog. Not necessary for first-use.]*
