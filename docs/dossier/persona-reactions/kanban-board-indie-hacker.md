---
id: persona-reaction-kanban-board-indie-hacker
type: persona-reaction
owner: persona-beginner-indie-hacker
status: synthetic
persona: indie-hacker / calm-company / anti-VC (right-sized, never-raising, craft-over-scale)
feature: internal kanban board (HTML view / Obsidian integration) — "help people remember what's in place visually"
date: 2026-06-01
verdict: NOT FINE YET — could be, if you cut the HTML site and reframe it as a file format
---

# Reaction: the internal kanban board

> Cheap pre-filter signal, not validation. One synthetic founder reacting honestly to one BOSS
> surface. Real indie-hacker calls remain the actual evidence.

## "Trello, but inside BOSS"

I've had this exact thing before. It was called Trello. Then it was a Notion board. Then GitHub
Projects. I abandoned all of them for the same reason: the board became the work. Sunday night
grooming columns instead of shipping.

So let me be straight about where this lands.

## The pitch is doing a thing I don't trust

"Help people remember what's in place visually." That's a soft, pleasant sentence that doesn't
commit to anything. It's the line you write *after* you've decided to build the feature and need a
reason. Compare it to your own PRINCIPLES doc — "Just-in-time support, never premature ceremony."
Those two sentences are at war. A kanban board IS ceremony. It's the most ceremony-shaped artifact
in software. Every PM tool I've fled was, at heart, a board with a billing model bolted on.

The question isn't "is a board nice." Boards are nice. The question is whether a tool whose whole
spine is *don't add ceremony before the project earns it* gets to ship the canonical ceremony object
and call it lightweight. That tension isn't named anywhere in the pitch. Name it or cut it.

## "Fire up an HTML site" — this is the part that worries me

This is the tell. Now BOSS serves a web UI. Now there's a frontend. Now someone keeps that HTML from
rotting, restyles it when columns change, handles two edits hitting the JSON at once. You just grew
a surface.

The CLI being dependency-free is the single most respectable thing about this project. `.boss/` is
JSON — I can `cat` it, `git diff` it, grep it. That's right-sized. The moment you say "fire up a
site" you're on the road to a dev server, then a build step, then "should we just host the
dashboard." I've walked that road. It ends at a login screen. Every time.

If the board is already JSON, I can already see it: `bat .boss/board.json`, or a 30-line script *I*
write. The visual layer is the one part you should not own.

## Obsidian integration — closer, but still not yours to build

More honest, because it admits you live in markdown like I do. But "integration" hides work. The
real answer: if the board is plain markdown with checkboxes (or the Kanban-plugin file shape),
Obsidian *already* renders it. You don't integrate with Obsidian — you write a file it already
understands and get out of the way. If that's what you mean, say *that*, and notice it's a
file-format choice, not a feature. If you mean a BOSS-maintained Obsidian plugin: no. That's a second
product with its own changelog and its own breakage.

## What I'd actually want

Not a board. A board answers "what is everyone working on" — a *team* question. I work alone, or with
one partner. I don't have a coordination problem; I have a "did I forget something" problem.

The calm-shaped version: BOSS already knows the state of the work. So the lightweight thing is one
command — `boss status` — printing what's in flight, what's blocked, what got picked out of order, in
plain text, in my terminal, no server. The "picked out of order / added randomly" case you mention is
real and good — that's exactly what kills linear todo lists. But the fix is *order-independence in the
data model*, not drag-and-drop. Let me append a task mid-stream and have nothing break. Data-design
win, not a frontend.

If I want it visual, hand me clean JSON/markdown and I'll point my own tool at it. Plausible-not-GA
energy: don't make me adopt your dashboard.

## Walk vs. lean

- **Walk:** if "fire up an HTML site" means BOSS ships and maintains a web frontend. Scope creep in
  the one tool meant to keep me from scope creep. The irony's too thick.
- **Walk:** if the board becomes a *required* surface — mode transitions nagging me to update cards.
  Notification-spam by another name.
- **Lean:** if it's a file format tools I *already* use can render, BOSS owns zero pixels, and there's
  a `boss status` text line for the 90% case. Then it's not a board feature — it's a "BOSS state is
  legible and order-independent" feature. Which is just good design.

## One-liner

A kanban board inside an anti-ceremony tool is a contradiction unless BOSS owns the *data* and none
of the *chrome*. Ship the legible JSON and the `boss status` line; let Obsidian and my own eyeballs
do the rest. The day BOSS runs a web server to draw me columns is the day it became the thing it
warns me about.

Not fine yet. Could be, if you cut the HTML site and reframe it as a file format.
