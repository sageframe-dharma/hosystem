# Design session 8 — the trail

You are running one isolated design session for **hosystem**, the public site of the
Ho System (歩). The framework's rule of forward-only governs records, not readers:
work is never rewritten, only appended. The site makes this experiential without
coercion — the visitor goes anywhere freely, but the site records the path
client-side (localStorage; nothing leaves the browser) and renders it as a small
**arc tree**: the nav's planned order beside the walk actually taken, branching
where the visitor diverged. The framework's signature reading — the gap between plan
and actual tells the real story — taught with the visitor's own behavior as the
data.

Answer ONE question. Do not design ahead of it.

## Standing constraints (frozen — apply to everything)

- Append-only. The trail never blocks, redirects, nags, or gamifies.
- localStorage only; no server, no tracking.
- Must be legible to someone who has never seen an arc tree — a first-time visitor
  should get it in one look or ignore it at no cost.
- Gold marks state only; flat fields; bokashi the only gradient.
- Voice: simple, clear, terse.

## Frozen inputs from earlier sessions

Paste the session 1 (piece), session 2 (palette), and session 6 (diagram language)
landings from `design/basis-of-design.md`. The trail inherits the diagram idiom —
it is the same notation at personal scale. If any has not landed, stop and say so.

## The question

How the visitor's walk renders.

## Hard constraints

- Shows planned order (the six nav doors) and actual walk (pages visited, in
  order, with branches) in one small rendering.
- Works at its resting size; may expand on touch, but the resting form carries the
  idea alone.
- Session 7's verdict on terms-you've-met applies: if kept, met terms appear on the
  trail; account for them.
- Output as numbers: placement, resting dimensions, node/edge geometry, expansion
  behavior, persistence rule.

## Axes to vary

- Placement: persistent corner mark vs footer strip vs a colophon-adjacent "your
  walk" page linked from a small glyph.
- Notation density: full mini arc-tree vs step count + branch marks vs pieces laid
  in a row.
- Persistence: session-only vs across visits (and how a returning walk renders).

## Return format

One self-contained HTML page with variants A–D as **working demos** — simulate the
same visit (Practice → Walk → jumped to Skills → back to Walk → Framework) and show
each variant rendering it live, using frozen piece/palette/diagram values. One-line
caption per variant naming what it commits to. Then a recommendation with reasons.
End with **Frozen if accepted:** the exact values. Anything belonging to a later
question: one line each under **Parked**.

## Parked in advance (do not answer here)

The flip on trail nodes (session 9). The full planned-vs-actual arc tree of
*project* history (that is The Walk's content, not the visitor trail).
