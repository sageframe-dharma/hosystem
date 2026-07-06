# Design session 12 — wayfinding

You are running one isolated design session for **hosystem**, the public site of the
Ho System (歩). This session was born at the v1 review (2026-07-06): the
practitioner — who authored every document on the site — got lost in it. His words:
"I need some sort of breadcrumbs"; and, standing on the trail, "why can't I
continue it here." The site has six doors and forty-five pages of real depth, and
no way to see where you are or move on from where you stand.

Answer ONE question. Do not design ahead of it.

## The question

How a visitor knows where they are, and moves on from there.

Three faces of the same question, answered together:

1. **Breadcrumbs** — a deep document page (a rendered ho, a framework doc, a
   glossary entry) must say where it sits and let the reader climb out.
2. **The trail as a way forward** — do the trail's door nodes navigate? Today the
   trail is a pure record; the practitioner reached for it as a way to continue.
3. **The trail announcing itself** — "I don't totally understand the walk": a
   first-time visitor must get what the strip is in one look, per §8's own
   constraint, without the strip explaining itself at length.

## Standing constraints (frozen — apply to everything)

- Voice: simple, clear, terse. Breadcrumbs are site chrome — closed em dashes if
  any (§3).
- The trail stays append-only and never blocks, redirects, nags, or gamifies.
  Making doors navigable must not restyle it into a nav bar — it remains the
  record first.
- Gold = state only. Flat fields. No new inks.
- §8/§11 trail geometry is frozen and not reopened here — this session may add
  affordance and meaning to what is drawn, not redraw it.
- Motion, if any, is §4's step grammar.

## Frozen inputs from earlier sessions

Read from `design/basis-of-design.md`: §2 palette, §3 type, §5 documents (the
ledger header a breadcrumb must sit near), §8 the trail (+ §11 narrow, and the
right-angle propagation in the ledger). If any is missing, stop and say so.

## Hard constraints

- The breadcrumb must work at the site's real depth: `walk / sharibako / ho-04.6`
  and `framework / structure / ho-structure` are the test cases.
- Distinguishable from the marked-term and link affordances already frozen
  (solid underline = link, dotted = term).
- Keyboard accessible; no hover-only meaning.
- Output as numbers: placement, type values, separators, truncation rule at
  narrow widths, the door-link affordance if doors navigate, and any change to
  the trail caption wording.

## Axes to vary

- Breadcrumb form: full path line vs parent-only ("← the walk") vs the chain
  idiom miniaturized (§6's language at crumb scale).
- Placement: above the §5 ledger header vs at the very top of the page vs in the
  page footer beside the trail.
- Trail doors: navigate (with what affordance?) vs stay record-only (then where
  does "continue" live?).
- Trail caption: current "your walk · n steps" vs wording that teaches
  ("your walk so far · plan above, steps below") vs a one-time first-visit hint.

## Return format

One self-contained HTML page with variants A–D as **working demos** — each variant
renders the same mock deep page (the ho-04.6 ledger header under real breadcrumbs)
plus the trail strip with a simulated 3-step walk, interactive where the variant
claims interactivity, using frozen palette/type/step/trail values. One-line caption
per variant naming what it commits to. Then a recommendation with reasons. End with
**Frozen if accepted:** the exact values. Anything belonging to a later question:
one line each under **Parked**.

## Parked in advance (do not answer here)

The trail's geometry (§8/§11, frozen). Client-side search (v2). The "your walk"
deep page (v2). Site-wide nav/header redesign — this session adds wayfinding to
what exists; it does not invent a new chrome system.
