# Design session 6 — diagrams

You are running one isolated design session for **hosystem**, the public site of the
Ho System (歩). The framework thinks in box-and-arrow ASCII; the site's diagrams
should read as **that idiom refined** — not generic SaaS illustration. Visual
language: Japanese woodblock production logic, never imagery.

Answer ONE question. Do not design ahead of it.

## Standing constraints (frozen — apply to everything)

- One SVG source generates every scale: nav-corner glyph, section header, full
  annotated diagram.
- Two-tier color split: the thinking tier in bero-ai (Prussian blue), the doing tier
  in sumi. Gold only for state.
- Flat fields; bokashi the only gradient; no drop shadows, no 3D, no rounded-corner
  SaaS boxes.
- Loop-backs drawn honestly — the chain is not a waterfall; thin return arrows
  exist.
- Generated at build time; static SVG (animation belongs to session 4's grammar and
  is not designed here).

## Frozen inputs from earlier sessions

Paste the session 1 (piece), session 2 (palette), and session 3 (type) landings from
`design/basis-of-design.md`. If any has not landed, stop and say so.

## The question

The canonical Kamae-chain rendering — the site's one diagram language.

The content it must carry (fixed, from the framework):

- Five nodes descending: Seed → System Design → README → Ho Overview → Per-Ho
  Documents, each with its commitment-gradient label (opinions → decisions → scope →
  sequence → session).
- The two-tier split: Kamae 1–4 in the thinking register; Kamae 5 crossing into the
  doing register — and from the ho node, decomposition into agent tasks rendered as
  the same split repeating at session scale.
- Thin return arrows (system design revises seed; addenda supersede sections).

## Hard constraints

- Legible at all three scales from the same source.
- Decide: are nodes the pentagon piece (session 1's glyph), or is the piece reserved
  for hos only? Argue it.
- Output as numbers: node dimensions, stroke widths, arrow geometry, label type
  sizes, the color assignments.

## Axes to vary

- Orientation: vertical descent vs horizontal walk.
- Node treatment: pieces as nodes / rectangles with piece markers / bare typed
  labels.
- Arrow language: weight hierarchy for forward vs return arrows.
- Gradient labels: inline on nodes vs a parallel rail.

## Return format

One self-contained HTML page with variants A–D, each shown at glyph, header, and
full scale, using frozen palette/type/piece values. One-line caption per variant
naming what it commits to. Then a recommendation with reasons. End with **Frozen if
accepted:** the exact values. Anything belonging to a later question: one line each
under **Parked**.

## Parked in advance (do not answer here)

The arc tree / trail notation (session 8 inherits from this session's language but
is its own question). Assembly animation (session 4's grammar applies later).
