# Design session 11 — the narrow trail

You are running one isolated design session for **hosystem**, the public site of the
Ho System (歩). This session was born at the coherence check (2026-07-05): session 8
froze the trail's geometry at reading width and explicitly deferred the narrow
column; the coherence check rendered it at ~420 px and the practitioner rejected it
— too tight to the door squares, edge lines crossing the met dots, captions
colliding. Session 8 stays closed; this session answers the question it parked.

Answer ONE question. Do not design ahead of it.

## Standing constraints (frozen — apply to everything)

- Append-only; the trail never blocks, redirects, nags, or gamifies. No fixed
  elements; ignorable at zero cost.
- Gold never appears on the trail. Flat fields; bokashi the only gradient.
- Motion is discrete per §4; `prefers-reduced-motion` fully respected.
- Voice: simple, clear, terse.

## Frozen inputs from earlier sessions

Read the session 2 (palette), 3 (type), 4 (the step), and 8 (the trail) landings
from `design/basis-of-design.md`, including §8's narrow-column rejection note. If
any is missing, stop and say so. §8's ≥480 px geometry is frozen and not reopened
here — this session designs only what happens below it.

## The question

How the trail renders when the column is narrower than ~480 px.

## Hard constraints

- The resting form still carries the plan-vs-walk idea alone, in one look.
- The three named failures must be demonstrably fixed: clearance between the door
  row and the thread (too tight to the squares), edges must never cross the met
  dots, and the two captions must never collide.
- The door-ink hierarchy (§8: 0.40 / 0.70 / 1.00) is reused, not reinvented.
- Continuous with §8: at the breakpoint the trail must read as the same object,
  not a different design.
- Output as numbers: breakpoint(s), narrow geometry (node sizes, pitches,
  clearances, met-dot offset), label rule, caption rule.

## Axes to vary

- Label strategy: labels only for current + entered-this-walk doors (the coherence
  check's candidate) vs labels on expansion only vs abbreviated labels.
- Vertical clearance: band-top distance and thread pitch at narrow width.
- Met-dot placement: which side, what offset, so edges cannot cross them.
- Caption handling: one caption vs stacked vs step-count only.

## Return format

One self-contained HTML page with variants A–D as **working demos** — each variant
rendered at 420 px and 360 px, replaying the same simulated visit as session 8
(Practice → Walk → jumped to Skills → back to Walk → Framework, with met terms),
using frozen palette/type/step/trail values. One-line caption per variant naming
what it commits to. Then a recommendation with reasons. End with **Frozen if
accepted:** the exact values. Anything belonging to a later question: one line each
under **Parked**.

## Parked in advance (do not answer here)

The ≥480 px form (frozen, §8). The flip on trail nodes (§9 governs). Any "your
walk" deep page (v2).
