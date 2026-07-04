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
| 2 | palette | open | — |
| 3 | type | open | — |
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

## Propagation ledger

_(empty — no frozen value has been revised)_
