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
| 4 | the step | open | — |
| 5 | documents | open | — |
| 6 | diagrams | open | — |
| 7 | definition-on-touch | open | — |
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

## Propagation ledger

_(empty — no frozen value has been revised)_
