---
created: 2026-07-03
status: living
type: basis-of-design
project: hosystem
---

# Basis of Design

Frozen design decisions as explicit values. Design sessions land here; implementation
reads from here. A frozen value changes only through a commit that names the reason —
never silently.

## Standing constraints (frozen at founding, 2026-07-03)

- **#0 voice** — simple, clear, terse, nuanced. Link into depth; never inline it.
- **Governing test** — every dynamic behavior renders something the framework
  actually does.
- **No gating** — records are forward-only; readers are free.
- **Ink economy** — three inks + paper, total. Flat fields; bokashi the only
  gradient; translucent overlap makes named third colors.
- **Gold = state only.** Never emphasis, never decoration.
- **Imagery ban** — no ukiyo-e motifs, pattern fills, brush-stroke type, or
  decorative kanji. The 歩 hanko and the framework's real terms are the only
  Japanese marks, set plainly.
- **Motion is discrete** — bounded, committed steps. `prefers-reduced-motion`
  fully respected.

## Session landings

| # | Question | Status | Landed values |
|---|---|---|---|
| 1 | the piece | landed 2026-07-04 | [§1](#1--the-piece) |
| 2 | palette | landed 2026-07-04 | [§2](#2--palette) |
| 3 | type | landed 2026-07-04 | [§3](#3--type) |
| 4 | the step | landed 2026-07-04 | [§4](#4--the-step) |
| 5 | documents | landed 2026-07-04 | [§5](#5--documents) |
| 6 | diagrams | landed 2026-07-04 | [§6](#6--diagrams) |
| 7 | definition-on-touch | landed 2026-07-04 | [§7](#7--definition-on-touch) |
| 8 | the trail | open | — |
| 9 | the flip | open | — |
| 10 | the threaded split | v2 — not yet open | — |

## 1 — the piece

_Landed 2026-07-04. Winner: variant A (true koma ratios, keyline) with the solid
silhouette as the sub-24px inking. Session record:
`claude-design/sessions/session-01-variants.html`._

One geometry, two inkings, chosen by rendered height.

**Silhouette.** Unit height H = 1.000, base width 0.740H. Vertices (x, y), y down:

| vertex | x | y |
|---|---|---|
| apex | 0.370 | 0.000 |
| right shoulder | 0.660 | 0.220 |
| right base | 0.740 | 1.000 |
| left base | 0.000 | 1.000 |
| left shoulder | 0.080 | 0.220 |

Closed path, miter joins.

**Keyline form (rendered height ≥ 24 px).** Stroke 0.040H sumi; fill washi (the
ground shows through). Face character: mincho (typeface is session 3's question),
font-size 0.420H, centered at (0.370H, 0.610H), dominant-baseline central. Front
face 歩 in sumi; promoted face と in gold. Same metrics both faces.

**Solid form (rendered height < 24 px).** No character, no keyline. Front = sumi
fill; promoted = gold fill. Gold fill here is state (a closed/promoted piece),
inside the gold rule.

**Favicon.** Solid form, front face, 16 px.

**Reference path** (100-unit height): `M37 0 L66 22 L74 100 L0 100 L8 22 Z`.

## 2 — palette

_Landed 2026-07-04. Winner: variant A (aizuri). Session record:
`claude-design/sessions/session-02-variants.html`._

Three inks + paper:

| ink | value | role | contrast on washi |
|---|---|---|---|
| washi | `#eef1ef` | ground | — |
| sumi | `#1f2123` | text, structure, the doing tier | 14.2:1 (AA) |
| bero-ai | `#29618e` | thinking tier, discursive register | 5.8:1 (AA) |
| gold | `#a9832a` | state only — closure, landing, promotion | 3.1:1 (mark only, never body text) |

**Opacity ladder (all inks):** 1.00 / 0.70 / 0.40 / 0.12 — full ink / secondary /
receded / field wash & bokashi endpoint.

**Overlaps (multiply, named flats):** kachi = sumi × bero = `#040c13`;
matsuba = bero × gold = `#1b3117`.

**State map:** open = sumi @ 0.40 (→ `#9b9e9d` on washi); current = sumi @ 1.00;
closed = gold @ 1.00; superseded = gold @ 0.40 (→ `#d2c5a0` on washi). Closure is
permanent; recession is opacity. State tints are marks; adjacent labels read at
full sumi.

**Dark mode:** exists — a second printing on dark ground, not an inversion;
designed in its own later session. Nothing frozen here presumes it.

## 3 — type

_Landed 2026-07-04. Winner: variant A (Source Serif 4 + Source Code Pro). Session
record: `claude-design/sessions/session-03-variants.html`._

**Families (two + CJK fallback, per budget):**

- serif — `'Source Serif 4'`, weights 400, 400 italic, 600
- mono — `'Source Code Pro'`, weights 400, 600
- CJK fallback — `'Hiragino Mincho ProN', 'Yu Mincho', 'Noto Serif JP', serif`,
  appended to both stacks; no CJK webfont is downloaded. The piece's face
  characters (歩 / と) render in this stack — resolving session 1's deferred
  mincho-face question.

**Registers:**

- discursive — serif 400, sumi (14.2:1)
- procedural — mono 400 at 0.875rem/1.6, sumi; frontmatter keys sumi @0.70
  `#5d5f60` (5.6:1), values sumi 1.00
- emergent — serif 400 italic, bero-ai (5.8:1), 2px left rule bero @0.40
  `#9fb7c8`, padding-left 1rem

**Scale (rem / unitless leading):**

| role | size / leading | weight |
|---|---|---|
| body | 1.0625 / 1.65 | 400 |
| h1 | 1.75 / 1.25 | 600 |
| h2 | 1.375 / 1.3 | 600 |
| h3 | 1.125 / 1.4 | 600 |
| mono blocks | 0.875 / 1.6 (inline code 0.875em) | 400 |
| caption | 0.8125 / 1.5, sumi @0.70 | 400 |

**Marked term (resting look only):** text sumi 1.00; `underline dotted 1px`,
decoration color bero @0.70 `#648cab` (3.1:1 as a mark);
`text-underline-offset: 0.2em`; no background, no weight change.
(The touch interaction is session 7's question.)

**Register-by-position ruled out (2026-07-04):** the practitioner asked whether a
document's first paragraph should print in bero. Decision: no — bero is earned by
register, never by position. Which blocks of a document belong to which register
is session 5's question.

## 4 — the step

_Landed 2026-07-04. Winner: variant B (brisk footfall), amended at judgment (B′):
sequence seats on the line, slower populate. Session record:
`claude-design/sessions/session-04-variants.html`._

**The step** — the unit all site motion is built from:

- duration **160 ms**; easing **cubic-bezier(0.2, 0, 0, 1)** — accelerate, land;
  no glide between rests
- travel: **8 px vertical rise** with opacity 0→1 on the same curve; travel beyond
  8 px is a cut plus an arrival, never a longer slide
- arriving glyphs seat on their line: travel ends with bottoms flush on the
  baseline rule _(amended at judgment)_

**Sequence:** hold between steps **220 ms** → interval **380 ms constant**
_(amended at judgment from 140/300 — "a little slower populating"; 380 is this
landing's cut of "a little"; verify at the coherence check)_. Five-node build =
1680 ms. The beat is constant — steps are equal commitments; acceleration implies
momentum, and momentum is drift.

**Page transition:** out = cut (0 ms) → **80 ms** hold on bare washi → in = one
step. 240 ms total.

**Section arrival:** the section arrives as one block, one step.

**Never moves:** body text mid-read; the washi ground; anything already at rest;
surrounding layout (arrivals reserve their space — no reflow shove); scroll
position; anything under the pointer.

**Reduced motion:** every step has an instant-swap fallback;
`prefers-reduced-motion` renders all of the above at 0 ms.

## 5 — documents

_Landed 2026-07-04. Winner: variant A (the ledger) — practitioner's pick over the
session's D recommendation. Session record:
`claude-design/sessions/session-05-variants.html`._

**Header (frontmatter as a typed ledger):** boxed grid — box 1px sumi@0.40; rows
`9rem + 1fr`; row padding 0.5rem 0.875rem; row rules 1px sumi@0.12; keys mono
sumi@0.70, values mono sumi 1.00, authored order; margin-bottom 2.5rem.
Frontmatter renders first, visible, nothing hidden.

**Measure:** 42rem body column.

**State marks:** 12 px solid-form koma (§1's sub-24 px inking) 0.5rem before
status values, inked per §2's state map; adjacent labels full sumi.

**Chain links:** header-level only — `builds-on:` / `supersedes:` values are live
links; prose mentions are not auto-linked (authored links still render). Link
affordance: solid 1px underline bero@0.70 — solid = link, dotted = marked term.

**Supersession reveal:** activating a superseded marker opens facing panes —
1fr / 1fr, column-gap 2rem, inside a bordered extension of the header box; stacks
below 40rem. Fell pane: 2px gold@0.40 rule, text sumi@0.70. Replaced pane: 2px
gold rule, text full sumi. Open/close is discrete.

**Register map:** frontmatter + Execute blocks → procedural; headings + prose →
discursive; Reflect + asides → emergent (§3 treatments). Procedural blocks carry
a 2px sumi@0.40 left rule mirroring the emergent rule.

**Rhythm:** paragraphs 1.25rem; h2 2.5rem above / 1rem below; blocks 1.5rem.

## 6 — diagrams

_Landed 2026-07-04. Winner: variant A. Session record:
`claude-design/sessions/session-06-variants.html`._

The koma appears only where work is steppable — the frame/step distinction taught
by shape alone.

```
orientation   vertical descent · one SVG source, three scales by reduction
node          192 × 48 · fill washi #eef1ef · stroke 1.5 · square corners, miter · pitch 92 (gap 44)
node ink      Kamae 1–4 stroke+text bero #29618e · Kamae 5 sumi #1f2123 · fill always washi
node text     title mono 600 13 px at (x+12, y+21) · commitment label mono 400 11 px tier@.70 at (x+12, y+37)
              content: Seed/opinions · System Design/decisions · README/scope ·
              Ho Overview/sequence · Per-Ho Documents/session
piece         appears only where work is steppable: ho node marker koma h28 keyline (§1),
              inset 12 px; agent tasks koma h20 solid sumi (§1 sub-24 inking)
forward       2.0 px solid tier ink · head filled triangle 8 × 7, miter
crossing      every thinking→doing arrow, at any scale, prints kachi #040c13 (chain 4→5 and
              session think→task alike)
return        1.0 px source-tier ink @.40 (#9fb7c8 / #9b9e9d) · orthogonal, left lanes −40 / −72 px
              from node edge · head open chevron 5 × 5 @ 1.0 · labels mono 10 tier@.70 rotated −90°
              content: System Design→Seed "revises" · Per-Ho→README "addenda supersede"
tier rule     1.0 px sumi@.12 #d5d8d7 full width · captions "thinking"/"doing" mono 11 tier@.70
              · node 5 straddles the rule (rule crosses at node-top +24; node fill interrupts it)
decomposition edge 1.25 px sumi, head 6 × 5, elbow from node-5 bottom · think node 64 × 26
              stroke 1.0 bero, label mono 10 · think→task arrow kachi 1.25 · mini return 0.75 sumi@.40
scales        full ≥ 480 px wide — everything above
              header ≥ 160 px wide — nodes 128 × 24 stroke 1.0, titles mono 600 10, arrows 1.5
              head 6 × 5, returns kept unlabeled, tier rule kept uncaptioned; koma h14 solid;
              gradient labels, decomposition, all annotations dropped
              glyph < 160 px — four bars 12 × 3 bero + solid koma h6 sumi, gap 2.5,
              left-aligned, no arrows (viewBox 14 × 28.5)
gold          never in the canonical chain — it is structure, not state; live instances
              (colophon) ink nodes per §2's state map, labels at full sumi
```

## 7 — definition-on-touch

_Landed 2026-07-04. Winner: variant A (floating card, one at a time). Session
record: `claude-design/sessions/session-07-variants.html`._

**Card:** width `min(24rem, column − 1rem)`; padding 0.625rem 0.875rem; washi
ground; border 1px sumi@0.40; radius 0; no shadow; z-index 10 — the page's only
elevated layer.

**Placement:** 0.5rem below the term's line box, left-aligned to term start,
clamped 0.5rem from column edges; flips above when short of space. Zero reflow —
the prose never moves.

**Content:** plain cut serif 400 0.9375rem/1.55 sumi; "full entry →" mono 400
0.8125rem bero.

**One model, three modes:** hover/focus = transient; tap/Enter = pin;
Escape / outside-tap / second-tap = dismiss. One card at a time. An open term's
underline goes dotted → solid, same bero@0.70.

**Terms-you've-met: kept**, quietest form. Met = a pinned reveal was dismissed
(deliberate touch, not hover-past). Met resting look: underline decoration recedes
bero@0.70 → sumi@0.40 — recession by opacity, the state map's own grammar. No
gold: met is reader state, not framework state.

**Timing:** reveal/dismiss instant (0 ms) as designed; whether the card's arrival
adopts §4's 160 ms step is resolved at the coherence check.

## Propagation ledger

_(empty — no frozen value has been revised)_
