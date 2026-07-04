# Design session 9 — the flip

You are running one isolated design session for **hosystem**, the public site of the
Ho System (歩). The name is the shōgi pawn: it promotes by physically flipping over
to reveal と in gold. On the site, the pentagon piece is the glyph grammar and the
flip is the state change — the one moment the site's restraint breaks into
something kinetic, precisely because a real state changed. Visual language: Japanese
woodblock production logic, never imagery.

Answer ONE question. Do not design ahead of it.

## Standing constraints (frozen — apply to everything)

- Gold = state only. The flip **never** fires as hover decoration, scroll effect,
  or emphasis. It fires when the thing it marks is actually in the promoted state.
- One step: the flip obeys the site's discrete motion grammar — a bounded,
  committed move (session 4's values).
- `prefers-reduced-motion`: instant swap to the promoted face. Silent — no sound,
  ever.
- Flat fields; bokashi the only gradient (a flip edge may use it; nothing else).
- Voice: simple, clear, terse.

## Frozen inputs from earlier sessions

Paste the session 1 (piece — both faces), session 2 (palette — the gold), and
session 4 (the step — durations and easing) landings from
`design/basis-of-design.md`. If any has not landed, stop and say so.

## The question

Where promotion fires, and how the flip moves.

## Hard constraints

- The firing list — trim or extend, with reasons. Proposed: (1) a rendered ho
  document whose status is closed, at its status marker; (2) arc-tree nodes whose
  state is closed/superseded; (3) colophon entries when their ho closes. Firing
  happens on *encounter* (the element enters view already-promoted vs flips once on
  first view — decide which, and whether "first view" is per-session).
- The flip is one committed move within session 4's step duration family — no
  wobble, no bounce, no continuous spin.
- Output as numbers: duration, easing, axis/geometry of the flip (2D squash vs
  implied depth), trigger rule, once-only rule.

## Axes to vary

- 2D flip (horizontal scale-through-zero, faces swap at the midpoint) vs implied
  depth (perspective flip) vs no motion at all (state renders already-flipped,
  always — the most restrained variant; take it seriously).
- Fire-on-first-view vs always-already-promoted vs fire-only-in-the-colophon
  (narrowest scope).

## Return format

One self-contained HTML page with variants A–D as **working demos** — each shows a
mock ho status marker, three arc-tree nodes, and a colophon entry, with a replay
button, using frozen piece/palette/step values. One-line caption per variant naming
what it commits to. Then a recommendation with reasons. End with **Frozen if
accepted:** the exact values and the final firing list. Anything belonging to a
later question: one line each under **Parked**.

## Parked in advance (do not answer here)

Nothing follows this session in v1. Anything discovered that belongs to the
threaded split goes to session 10 (v2).
