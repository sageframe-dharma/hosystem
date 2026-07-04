# Design session 2 — palette

You are running one isolated design session for **hosystem**, the public site of the
Ho System (歩) — a methodology for human-AI collaborative development built on
bounded steps. The site's identity is a journey taken in steps; its visual language
derives from Japanese woodblock printing — its **production logic**, never its
imagery.

Answer ONE question. Do not design ahead of it.

## Standing constraints (frozen — apply to everything)

- Ink economy: three inks + paper, total. Flat fields of color; bokashi (the wiped
  gradient) is the only gradient; translucent overlap makes named third colors.
- Ink roles are fixed: **washi** = ground (unbleached paper white); **sumi** = text,
  structure, the doing tier; **bero-ai** (Prussian blue, Hokusai's pigment) = the
  thinking tier, discursive register; **gold** (surimono metallic) = state only —
  closure, landing, promotion. Rare.
- Gold never marks emphasis.
- Imagery ban: no wave/cloud/Fuji motifs, no pattern fills, no brush-stroke type,
  no decorative kanji.
- Voice of the whole site: simple, clear, terse.

## Frozen inputs from earlier sessions

Paste the session 1 landing (the piece geometry) from `design/basis-of-design.md`.
If it has not landed, stop and say so.

## The question

Exact values for the three inks + paper, and the state semantics.

## Hard constraints

- Must be clearly distinct from the atmarcus.net brand: warm cream `#f5f2ed` +
  burnt orange `#c45a2d`. Distinction is a hard constraint, not a preference.
- Body-text pairs (sumi-on-washi, bero-on-washi) pass WCAG AA at body sizes.
- Overlap behavior defined: name the multiply results (sumi×bero, bero×gold) as
  colors and show them.
- The state map rendered in swatches: open / closed / superseded / current —
  which ink, which value, at what opacity.
- Output as numbers: hex values, opacity steps, the overlap results.

## Axes to vary

- Washi temperature (how cool, how much tooth).
- Bero-ai depth and saturation (Great Wave dark vs aizuri mid-blue).
- Gold as flat mineral (ochre-gold) vs simulated metallic (value shift, no gradient
  cheating beyond bokashi).
- The state map itself: how open/closed/superseded/current distribute across inks.

## Return format

One self-contained HTML page presenting variants A–D side by side — each a full
swatch sheet: four base values, overlap results, the state map, and one paragraph of
real prose set in each (sumi on washi, with one bero-ai passage and one gold state
mark) so text color is judged as text. One-line caption per variant naming what it
commits to. Then a recommendation with reasons. End with **Frozen if accepted:** the
exact values. Anything belonging to a later question: one line each under **Parked**.

## Decide here, in one line

Whether dark mode exists at all. (If yes, its design is deferred, not done here.)

## Parked in advance (do not answer here)

Type faces (session 3). Motion (session 4). Use a plain system serif/mono for the
prose samples and say so on the page.
