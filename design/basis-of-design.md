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
| 8 | the trail | landed 2026-07-04 | [§8](#8--the-trail) |
| 9 | the flip | landed 2026-07-04 | [§9](#9--the-flip) |
| 10 | the threaded split | v2 — not yet open | — |
| 11 | the narrow trail | landed 2026-07-05 | [§11](#11--the-narrow-trail) |
| 12 | wayfinding | landed 2026-07-06 | [§12](#12--wayfinding) |
| 13 | the term node | landed 2026-07-07 | [§13](#13--the-term-node) |
| 14 | the header | landed 2026-07-07 | [§14](#14--the-header) |

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

**Micro-typography (added at the coherence check, 2026-07-04):** em dashes are
Chicago style — the true em dash (—), set closed (word—word), never spaced,
never a hyphen standing in.

**Piece-face webfont (resolved at the coherence check, 2026-07-04):** a
two-glyph mincho subset (歩, と — Noto Serif JP, woff2, ~3 KB) is prepended to
the CJK stack for the piece's faces only, so the koma's face does not shift
with each OS's fallback. Asset produced at the spike.

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
_(amended at judgment from 140/300 — "a little slower populating"; verified at
the coherence check 2026-07-04)_. Five-node build =
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

**Timing (resolved at the coherence check, 2026-07-04):** the card arrives as
one §4 step — 160 ms, cubic-bezier(0.2, 0, 0, 1), 8 px rise. Dismissal is
instant (0 ms). Reduced motion: instant both ways.

## 8 — the trail

_Landed 2026-07-04. Winner: variant D (plan above, walk beneath). Session record:
`claude-design/sessions/session-08-variants.html`._

```
trail          the visitor's walk renders as a footer strip on every page: planned nav
               order above, actual walk threaded beneath
placement      in-column (42 rem measure), above the colophon rule · margin-top 4 rem ·
               top rule 1 px sumi@.12 · padding 12 px 0 8 px · no fixed elements
caption        "your walk" mono 11 px sumi@.70 left · "n steps" mono 11 px sumi@.40 right
door row       six nav doors, nav order, left→right · node 10 × 10 px, stroke 1, fill
               washi, square corners miter · centers evenly spaced, first/last inset
               8 px from column edges · plan line 1 px sumi@.12 through centers, behind
               nodes · labels mono 10 px centered 6 px below, opacity = node's
door ink       never entered sumi@.40 · entered a past walk sumi@.70 · entered this
               walk sumi 1.00 · fill always washi · no gold ever on the trail
thread         band top = labels + 14 px · step k = 6 × 6 px filled sumi 1.00 at its
               door's column, y = band top + (k−1)·pitch · pitch 12 px (n ≤ 5), else
               48/(n−1) px, floor 10 (propagated 2026-07-06, see ledger) · beyond
               6 steps: last 6 render, "⋯ +k" mono 10 sumi@.40 at band top-right ·
               resting strip height ≤ 128 px
edges          right-angle routing (propagated 2026-07-05, see ledger): node
               bottom-center, down to a lane at mid-pitch, across, down into the
               next node's top-center · equal-x steps straight vertical,
               bottom-center → top-center · no segment ever travels at a node's y
               · 1.25 px sumi, filled triangle head 5 × 4 miter, every segment ·
               all steps equal ink; revisits append new nodes, never return arrows
met terms      2.5 px dots sumi@.40, 4 px right of the step node, pitch 4 px, max 4
               then "+n" mono 9 sumi@.40 (met = pinned reveal dismissed, §7)
expansion      hover/focus/tap a step node → door label mono 10 sumi@.70, met names
               appended @.40, inside the strip, instant, zero reflow · tap pins ·
               Escape / outside-tap dismisses · one at a time
arrival        new step arrives after the 240 ms page transition as one §4 step
               (160 ms, cubic-bezier(.2,0,0,1), 8 px rise, seat) · nothing at rest
               moves · prefers-reduced-motion: instant swap
persistence    localStorage ho.trail.doors = set of door ids ever entered (across
               visits) · sessionStorage ho.trail.walk = ordered [{door, met[]}], this
               walk only, cap 64 steps with elided count kept · door ids and met-term
               ids only — no timestamps, no URLs, nothing leaves the browser
returning      fresh thread; previously entered doors greet at sumi@.70
empty state    renders from step 1 (six doors, one node) · never hidden, never nags
door names     Framework · Practice · Skills · Writing · Walk · Colophon are
               placeholders from the spec's content map — geometry and rules freeze
               here; names bind at build
```

**Narrow column (rejected at the coherence check, 2026-07-04):** the ~420 px
rendering is too tight — the thread sits too close to the door squares, edge
lines cross the met dots, captions collide. The narrow treatment gets its own ho
at the spike; the candidate direction stands (labels only for current +
entered-this-walk doors), with band-top clearance and met-dot offset as the
named problems.

## 9 — the flip

_Landed 2026-07-04. Winner: variant D (the news). Session record:
`claude-design/sessions/session-09-variants.html`._

```
the flip — geometry
  axis        horizontal (end-over-end, the koma's real promotion move; a side-spin
              is capture, not promotion) — rendered flat as a 2D vertical squash
  keyframes   front face scaleY 1→0 over offsets 0→0.5 · promoted face scaleY 0→1
              over offsets 0.5→1 · transform-origin 50% 50%
  flatness    no perspective, no bokashi edge, no shadow — two printings of one block
  faces       per §1: keyline ≥24 px swaps 歩 sumi → と gold on the same metrics;
              solid <24 px swaps sumi fill → gold fill

the flip — timing (amended at the coherence check 2026-07-04; see ledger)
  duration    240 ms total, one committed move — no wobble, bounce, or spin
  easing      symmetric halves: front collapses 0–120 ms cubic-bezier(0.4, 0, 1, 1);
              promoted face lands 120–240 ms cubic-bezier(0, 0, 0.2, 1)
  swap        zero-crossing (face swap) at 120 ms — the temporal midpoint;
              the turn is legible as a turn
  adjacent    state tints around the mark (node stroke, rules) cut at 120 ms — a cut,
              never a fade; labels print full sumi throughout
  queue       co-triggered flips fire in encounter order on the 380 ms beat; marks in
              view at page arrival start one interval after the page's in-step ends

trigger — the news rule
  fires when  a firing-list mark is fully in view (IntersectionObserver threshold 1.0)
              AND its record's state advanced to closed since the reader's last visit
  witness log localStorage `hosystem-witnessed` — {record-id: state}; first visit
              seeds the log silently (nothing flips); no storage available → renders
              already-promoted
  once-only   a witnessed promotion is written to the log when it fires and never
              re-fires
  reduced     prefers-reduced-motion: instant swap to the promoted face, silent,
              still writes the log

firing list (final)
  1  ho document status marker — §5's 12 px solid koma — when status → closed
  2  live arc-tree ho nodes — §6 live instances, h28 keyline koma — when closed
  3  colophon entries, at their marks, when their ho closes
  never fires superseded (recession, not promotion — renders pre-flipped at gold@0.40);
              the canonical chain diagram (§6: gold never appears there); the favicon
              (§1: front face, frozen); anything on hover, scroll, or emphasis
```

## 11 — the narrow trail

_Landed 2026-07-05. Winner: variant A amended at judgment (A′) — A's frame with
B's right-angle graphing. Session record:
`claude-design/sessions/session-11-variants.html`._

Below a 480 px column the trail stays §8's object with these numbers:

```
breakpoint     one: column < 480 px (≥ 480 px is §8, frozen)
labels         mono 9 · this-walk doors only · clamped to the column
band top       door bottom + 36 px (16 px label slot + 20 px air)
pitch          14 px (n ≤ 5) · else 56/(n−1), floor 11 (propagated 2026-07-06,
               see ledger) · beyond 6 steps: last 6 render per §8
edges          right-angle routing (amended at judgment — B's language on A's
               frame): node bottom-center, down to a lane at mid-pitch, across,
               down into the next node's top-center · head 4 × 4 · no segment
               ever travels at a node's y · equal-x steps: straight vertical,
               bottom-center → top-center
met dots       first dot 6 px off the node edge · row grammar per §8
caption        one left line "your walk · n steps" · no right caption below 480
expansion      in the clearance band (band top − 10 px, clamped 4 px)
resting strip  ≤ 160 px
everything else §8 verbatim
```

**Resolved (2026-07-05):** the right-angle edge language extends to the ≥480 px
trail — §8 propagated, see the ledger. The trail draws one way at every width.

## 12 — wayfinding

_Landed 2026-07-06. Winner: variant A (the path line). Session record:
`claude-design/sessions/session-12-variants.html`._

```
breadcrumb     one line of short ids · site chrome on every deep page (depth ≥ 2)
  content      door / collection / record — "walk / sharibako / ho-04.6",
               "framework / structure / ho-structure" · always ids, never titles
  placement    very top of the content column, above the h1 · margin 0 0 1rem
  type         mono 400 0.8125rem / 1.5
  ink          ancestors sumi@.70 · current segment sumi 1.00, plain text,
               aria-current="page" — where you stand prints full ink
  links        ancestors only · solid 1px underline bero@.70 #648cab,
               text-underline-offset 0.2em — §5's link affordance, nothing new
  separator    " / " (spaced slash) sumi@.40
  truncation   the line never wraps · on overflow, middle segments collapse
               right-to-left into one "…" sumi@.40, non-interactive, first +
               current kept · still overflowing: the first collapses too
               ("… / ho-structure") · the current segment never collapses
  landings     door landing pages and the home carry no crumb — they are tops
  a11y         <nav aria-label="breadcrumb"> · links in natural tab order
trail doors    navigate — door node + label are one link to the door's landing
  rest         §8/§11 ink and geometry verbatim · no resting underline —
               the record look holds; the strip never restyles into a nav bar
  touch        hover/focus-visible: the door label gains the solid 1px underline
               bero@.70 (the label only — node ink and geometry untouched) ·
               cursor pointer
  focus        focus-visible: 1px sumi outline, offset 2px, on the door hit area
  hit target   ≥ 24 × 24 px centered on node + label
  steps        step nodes never navigate — §8 expansion only · the thread stays
               the record; the plan row is the way forward
caption        unchanged — "your walk" mono 11 sumi@.70 left · "n steps" mono 11
               sumi@.40 right (§8) · merged single line below 480 px (§11)
hint           first visit only, one line under the caption row, left-aligned:
               "plan above · your steps beneath · doors open"
               mono 10 sumi@.40 · renders until the first door navigation or the
               second visit, whichever comes first, then never again · no dismiss
               chrome, no animation, never nags · localStorage ho.trail.hinted = 1 ·
               storage unavailable → renders once per page load, harmless
strip height   the hint adds 14 px to the resting strip on first visit only,
               inside §8's ≤ 128 px budget (§11's ≤ 160 px at narrow)
```

## 13 — the term node

_Landed 2026-07-07. Winner: variant D (the seated node), accepted with a
reservation — re-judge the built pages at the by-feel pass; fresh-eyes check
before v2. Session record: `claude-design/sessions/session-13-variants.html`._

```
PAGE  one node per term at  glossary / <id>  · §5 42rem measure · §12 crumb two segments
      (glossary = ancestor link bero@.70 · <id> = current, sumi 1.00, aria-current)
LEDGER §5 verbatim — frontmatter (id title type requires related entry_points summary)
      renders first, nothing hidden · relationships repeat below as the navigable layer
DIAL  progressive disclosure · depths 1→current stacked, deeper appends the next as ONE §4 step
      (160ms, cubic-bezier(.2,0,0,1), 8px rise) · shallower removes, instant
      rail: mono 600 .8125rem ticks, 1.6rem box (≥24px hit) · reached sumi@.70 ·
      current sumi 1.00 + 1px sumi@.40 box · line 1px sumi@.12, 1.25rem between ticks
      controls: "↓ deeper" / "↑ less" mono .8125rem bero, solid bero@.70 underline
      keys ↓/+ deeper, ↑/− less · absent depths (4–5): tick + control simply NOT rendered
TYPE  depth 1 (plain cut) serif 400 1.1875rem/1.55 sumi · depth 2 & 3 body serif 400 1.0625/1.65
      depth tag mono .75rem sumi@.40 "· definition" · h1 §3 (1.75/1.25 600)
RELS  typed lists, foot of node · top rule 1px sumi@.12, padding-top 1.25rem
      three groups: requires · related · referenced by (derived) · group gap 1rem
      label mono 600 .8125rem sumi@.70; "(derived)" 400 sumi@.40 · entries serif,
      each a solid 1px bero@.70 underline link (§5 grammar) · empty group omitted
BACKLINKS derived from citing entries, never authored · labelled "referenced by (derived)"
IN    "full entry →" (§7 card) lands at DEPTH 2 · lateral relationship links land at depth 2
OUT   §12 crumb always present + branch-return: inline "↩ <source>" on the crumb line
      (mono .8125rem bero) shown only when arrived-from-a-card · restores the source's
      exact scroll + line, marks that term MET (§7, no gold) · clears on return
TOUCH §7 verbatim · in-body terms dotted, define-on-touch, never navigate ·
      GOLD APPEARS NOWHERE on the term page
CITES defining-documents line, mono .8125rem, links into rendered corpus (solid bero@.70)
```

## 14 — the header

_Landed 2026-07-07. Winner: variant D amended at judgment (D′) — step-reveal +
walk miniature, crumb riding in the revealed header, tightened padding. Session
record: `claude-design/sessions/session-14-variants.html`._

```
persistence   step-reveal · absent while reading down · present on upward
              scroll-direction commitment · near top always shown
trigger       reveal: cumulative upward scroll ≥ 48 px within a gesture,
                      OR scrollY ≤ 80 px
              leave:  cumulative downward scroll ≥ 48 px AND scrollY > 80 px
              (a discrete event, never scroll-linked)
step (§4)     160 ms · cubic-bezier(0.2, 0, 0, 1)
              appear: translateY(-8px)→0, opacity 0→1 · leave: reverse ·
              never a full-height slide
height        condensed band 40 px (padding 0 20 px) — PROVISIONAL, tightened at
              judgment; exact paddings land at the by-feel pass via tuners ·
              deep pages add a crumb line ~24 px when revealed mid-page ·
              inner content clamped to the 42 rem measure, centered
mark          koma solid form, h20, front face 歩 sumi 1.00 (§1 sub-24 inking)
doors         six · mono 400 · 0.8125rem/1 · gap 18 px · names bind at build
door ink      current sumi 1.00 · entered-this-walk sumi@.70 · never sumi@.40 ·
              no gold ever
door touch    hover/focus-visible: solid 1px underline bero@.70 (§12);
              focus-visible 1px sumi outline offset 2px
walk          miniature rides right of the doors: current-door node 10×10 +
              step node 6×6 + "n steps" mono 10 · §8 inks · a POINTER only —
              the §8 footer strip remains the walk's authoritative rendering
              (ledger, 2026-07-07); never diverges, never gold
crumb         the in-flow crumb (§12, top of content column) is unchanged ·
              when the header reveals mid-page on a deep page it carries a
              condensed crumb line (same §12 grammar) · suppressed at
              scroll-top where the in-flow crumb is visible — no redundancy
boundary      hairline rule 1px sumi@.12 at base
z-order       header z-index 5 · §7 card stays z-index 10
no-reflow     header overlays fixed; body reserves no space
scroll-margin scroll-margin-top = revealed height + 12 px on h1/h2/h3 + crumb
reduced       prefers-reduced-motion: present-or-absent at the same triggers,
              0 ms (§4)
```

**Wordmark (parked question resolved 2026-07-07):** the header carries the
site's name — "hosystem", set quietly in the serif beside the koma, one home
link together, present at rest and in the revealed state alike. Practitioner:
"Name it. Something nice." The koma earns bareness later; today a first-time
visitor deserves one word of orientation.

## Propagation ledger

| date | section | change | reason |
|---|---|---|---|
| 2026-07-04 | §9 the flip | duration 160 → 240 ms; easing one whole-flip curve → symmetric halves (collapse cubic-bezier(0.4, 0, 1, 1) over 0–120 ms, land cubic-bezier(0, 0, 0.2, 1) over 120–240 ms); face swap 32 → 120 ms; adjacent tints cut at 120 ms | Practitioner at the coherence check: at 160 ms the turn was illegible — "I don't get to see the back." The flip is the site's one kinetic signature and must read as a physical turn. Amended values seen moving in the coherence page's amendment demo. |
| 2026-07-04 | §7 timing | card arrival instant (0 ms) → one §4 step (160 ms); dismissal stays instant | Deferred question resolved by the practitioner at the coherence check, overriding the builder's instant recommendation; both behaviors were shown side by side. |
| 2026-07-05 | §8 edges | angled point-to-point thread → right-angle routing (down · across · down, lane at mid-pitch; equal-x steps straight vertical); head 5 × 4 and all inks unchanged | Practitioner at the session 11 landing: "they read SO MUCH BETTER." Right angles read as steps taken in sequence where diagonals read as abstract graph edges; the routing also makes an edge on a met-dot row geometrically impossible at every width, closing session 11's parked 42 rem crossing risk. Seen moving in session 11's A′ demo; the trail now draws one way at every width. The spike (built 2026-07-04) predates this propagation — v1 implements from the basis, not the spike, on this value. |
| 2026-07-06 | §8 + §11 thread pitch | pitch floor 6 → 10 (§8) and 7 → 11 (§11); elision tightens from last-9 to last-6 rendered steps | Dense-walk collapse found at the v1 review: at the old floors the right-angle routing had zero vertical clearance against 6 px nodes and collapsed to a horizontal bar with the arrowhead on the node body — the routing (propagated 2026-07-05) was never seen moving at that density. Raised floors restore the verticals (pitch − node ≥ 4 px); the tighter rendered tail keeps the strip inside the frozen height budgets (≤128 / ≤160). Open, not taken: met dots clip when a step lands on the last door's column — candidate mirror-left rule awaits its own ruling. |
| 2026-07-07 | §8 "no fixed elements" | the revealed header (§14, variant D′) carries a walk miniature — a fixed-position pointer (current-door node + step node + count) | Practitioner judged session 14 as D over the walk-less C recommendation. The §8 footer strip remains the walk's authoritative rendering; the miniature is a pointer that never diverges from it and never carries gold. §8's own geometry, placement, and persistence are untouched. |
| 2026-07-07 | §14 masthead | the at-rest masthead and the revealed instrument merge into ONE element — the header rests in its slot at top, departs on downward reading, and the same element returns on the upward step; never two renderings of the nav | Practitioner at first sight of the built header: "they are the same, why not have the real header follow?" Two matching nav rows stacked at scroll-top read as a defect, not a system. All §14 triggers, step, and contents unchanged. |
| 2026-07-07 | §14 inner clamp | header inner content 42rem → clamp 52rem (tuner-provisional), centered; the reading column stays 42rem | Measured at implementation: the 42rem row is exactly full (14px slack) and the practitioner-ruled wordmark needs 85px — within the old clamp it was the name OR the walk miniature, and both are same-day practitioner rulings. A running head wider than the reading measure is print-honest; the text column is untouched. Narrow degradation: the wordmark hides first, the miniature's step-count text second; the doors never crush. |
