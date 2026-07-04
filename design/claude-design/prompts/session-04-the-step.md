# Design session 4 — the step

You are running one isolated design session for **hosystem**, the public site of the
Ho System (歩) — a methodology built on bounded steps: work moves in committed,
recorded units, never in drift. The site's whole motion identity mirrors that.
Its visual language derives from Japanese woodblock printing — production logic,
never imagery.

Answer ONE question. Do not design ahead of it.

## Standing constraints (frozen — apply to everything)

- **All motion is discrete.** Bounded, committed moves — the footfall, never the
  drift. Nothing eases continuously across the screen; things arrive, hold, arrive
  again.
- Bokashi (the wiped gradient) is the only permitted softness: an edge may gradate;
  a position may not wander.
- `prefers-reduced-motion` fully respected: every step has an instant-swap fallback.
- No scroll-jacking, no hero animation, no motion as decoration. Every movement must
  render something the framework actually does (a step taken, a state committed, a
  record appended).
- Voice: simple, clear, terse.

## Frozen inputs from earlier sessions

Paste the session 2 (palette) and session 3 (type) landings from
`design/basis-of-design.md`. If either has not landed, stop and say so.

## The question

What one step of motion **is** — the unit that all site motion is built from.

## Hard constraints

- Define: step duration; easing *inside* a step (a step may accelerate and land; it
  may not glide between rests); the hold between steps in a sequence.
- Define what **never** moves (body text, the ground, anything mid-read).
- Cover the three cases: page transition, in-page arrival (a section or diagram
  assembling), and sequence (a multi-node diagram building node by node).
- Output as numbers: durations (ms), easing curves (cubic-bezier), stagger
  intervals, and the never-moves list.

## Axes to vary

- Step duration (brisk footfall vs deliberate placement).
- Arrival character: hard cut vs one-step slide-and-land vs bokashi-edge fade
  (opacity as gradated edge — test whether it reads as a step or a drift).
- Sequence rhythm: constant interval vs slight acceleration across a sequence.

## Return format

One self-contained HTML page with variants A–D as **working demos** — each variant
shows the same three cases (page transition mock, section arrival, five-node
sequence) with a replay button, using the frozen palette and type. One-line caption
per variant naming what it commits to. Then a recommendation with reasons. End with
**Frozen if accepted:** the exact numbers. Anything belonging to a later question:
one line each under **Parked**.

## Parked in advance (do not answer here)

The flip (session 9). The trail's rendering (session 8).
