# Design session 1 — the piece

You are running one isolated design session for **hosystem**, the public site of the
Ho System (歩) — a methodology for human-AI collaborative development built on
bounded steps. The name is the shōgi pawn: the humblest piece, which promotes to
gold when it crosses the board. The site's identity is a journey taken in steps; its
visual language derives from Japanese woodblock printing — its **production logic**,
never its imagery.

Answer ONE question. Do not design ahead of it.

## Standing constraints (frozen — apply to everything)

- Ink economy: three inks + paper — washi (unbleached paper ground), sumi (ink
  black), bero-ai (Prussian blue), gold. Flat fields of color; bokashi (the wiped
  gradient) is the only gradient; translucent overlap makes named third colors.
- Gold marks **state** only (closure, promotion) — never emphasis.
- Imagery ban: no wave/cloud/Fuji motifs, no pattern fills (no seigaiha), no
  brush-stroke or faux-calligraphic type, no decorative kanji. The 歩 hanko seal and
  the framework's real terms are the only Japanese marks, set plainly.
- Motion is discrete: bounded, committed steps; nothing drifts. (Not this session's
  question, but no variant may depend on continuous motion.)
- Voice of the whole site: simple, clear, terse.

## Frozen inputs from earlier sessions

None — this is the first session.

## The question

The pentagon shōgi-piece glyph: exact geometry and both faces. This glyph is the
site's grammar — nodes in chain diagrams, hos in arc trees, list markers, the
favicon.

## Hard constraints

- Must read at favicon scale (16 px) and at full-diagram scale.
- Front face carries 歩 in sumi. Promoted face carries と in gold.
- The 歩 hanko (the seal) is a separate, untouched mark — the piece does not
  replace or imitate it.
- Exact geometry: output as numbers (vertex coordinates or ratios), not description.

## Axes to vary

- Proportion: true shōgi-piece ratios vs simplified/geometric pentagon.
- Outline vs solid fill (and the promoted face's treatment in each).
- Face-character weight and size relative to the silhouette.

## Return format

One self-contained HTML page presenting variants A–D side by side, each shown at
16 px, 32 px, and 160 px, each with a one-line caption naming what it commits to.
Then a recommendation with reasons. End with **Frozen if accepted:** the exact
numbers (vertex ratios, character size ratio, stroke widths). Anything belonging to
a later question: one line each under **Parked**.

## Parked in advance (do not answer here)

The flip animation (session 9). Palette values (session 2) — use placeholder
sumi #1a1a1a, gold #b8860b, washi #f7f4ec for display only, and say so on the page.
