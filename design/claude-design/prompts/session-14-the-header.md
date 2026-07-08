# Design session 14 — the header

You are running one isolated design session for **hosystem**, the public site of the
Ho System (歩). This session was born at the v1 walkthrough (2026-07-07): on long
framework pages the practitioner reached twice for persistent navigation. Session 12
explicitly parked "site-wide nav/header redesign"; the reach earns it a session now.

Answer ONE question. Do not design ahead of it.

## The question

Whether the site's header persists while reading — and if it does, exactly how it
appears, condenses, and leaves.

## Standing constraints (frozen — apply to everything)

- **§4 binds every motion.** Nothing eases continuously; nothing is scroll-linked.
  If the header appears or leaves, it does so as one committed step (160 ms,
  cubic-bezier(0.2, 0, 0, 1)) triggered by a discrete event (a scroll-direction
  commitment, a threshold crossed once) — never a tween tied to scroll position.
  A scroll-following header that slides with the reader's finger is drift and is
  disqualified by the grammar, not by taste.
- **§8 is frozen**: the trail is a footer strip, in-column, "no fixed elements."
  Any variant that carries a walk miniature in a persistent header is proposing a
  §8 propagation — legal only through the ledger. Such a variant must say so on
  the page, in one line, with the cost stated. A docked bottom rail duplicating
  the trail is ruled out entirely.
- Gold = state only. Flat fields. Voice terse. `prefers-reduced-motion`: the
  header simply is present or absent — no motion at all.
- Reading is sacred: body text never moves under the reader (§4 never-moves), so
  any docked header must reserve its space or overlay without reflow, and every
  heading needs `scroll-margin-top` so anchors and crumb landings clear it.

## Frozen inputs from earlier sessions

Read from `design/basis-of-design.md`: §1 the piece (nav-corner inking
thresholds), §2 palette, §3 type, §4 the step, §8 the trail (placement), §12
wayfinding (the crumb the header must coexist with). If any is missing, stop and
say so.

## Hard constraints

- One of the four variants must be the **static baseline** — no persistence at
  all, the current behavior — taken seriously with its honest argument (the site
  is quiet; chrome is spent viewport).
- Persistent variants: define the height budget (docked and condensed), what the
  header contains (the koma mark at which §1 inking, the six doors, anything
  else), and the exact appear/leave trigger and step.
- The crumb (§12) sits at the top of the content column — define how it and a
  docked header read together without redundancy.
- Output as numbers: heights, paddings, trigger thresholds, step timing (from
  §4, cited not invented), z-order, scroll-margin values.

## Axes to vary

- Persistence model: static (baseline) vs always-docked-condensed vs
  step-reveal on upward scroll commitment.
- Condensed contents: mark + doors only vs mark + doors + current-door state
  (door ink per §8's hierarchy) vs mark only with doors on touch.
- The walk miniature: absent vs riding in the header (§8 propagation cost stated).
- Boundary treatment: hairline rule vs washi-on-washi shadowless edge (no
  shadows — find the print-honest edge).

## Return format

One self-contained HTML page with variants A–D as **working demos** — each a long
scrolling page of real framework prose (labeled as sample) with the variant's
header behavior live; scroll instructions beside each; reduced-motion fallback
demonstrated. One-line caption per variant naming what it commits to. Then a
recommendation with reasons. End with **Frozen if accepted:** the exact values.
Anything belonging to a later question: one line each under **Parked**.

## Parked in advance (do not answer here)

The trail's own geometry (§8/§11, frozen). Mobile nav patterns beyond the header
itself (a drawer is a different question). Dark-mode printing. Anything the
static baseline wins against stays unbuilt.
