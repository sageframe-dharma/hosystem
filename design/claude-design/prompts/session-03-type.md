# Design session 3 — type

You are running one isolated design session for **hosystem**, the public site of the
Ho System (歩) — a methodology for human-AI collaborative development built on
bounded steps. The site renders the practice's real documents; its visual language
derives from Japanese woodblock printing — its **production logic**, never its
imagery.

Answer ONE question. Do not design ahead of it.

## Standing constraints (frozen — apply to everything)

- Imagery ban includes type: no brush-stroke or faux-calligraphic faces, no
  decorative kanji. Real Japanese terms (歩, 構え, 段取り…) are set plainly in a
  proper CJK face.
- Voice of the whole site: simple, clear, terse. The type serves reading, not
  atmosphere.
- Flat fields; no text effects, no shadows.

## Frozen inputs from earlier sessions

Paste the session 1 (piece) and session 2 (palette) landings from
`design/basis-of-design.md`. If either has not landed, stop and say so.

## The question

The three register faces and the scale. The framework writes in three registers and
the site renders each distinctly:

1. **Discursive** — Kamae documents, prose, essays' register → a text serif.
2. **Procedural** — agent tasks, frontmatter, verification commands → mono.
3. **Emergent** — Reflect records, sidequests, teaching notes → the text face at a
   distinct secondary treatment (tone, not a third family).

## Hard constraints

- Latin primary; CJK terms set correctly (name the CJK fallback stack).
- Marked terms (glossary terms that define on touch) must be visible but quiet —
  legible as marked in term-dense passages without turning the page into confetti.
- Web-font budget: at most two families + CJK fallback; name weights actually used.
- Output as numbers: families, weights, the size/leading scale (rem), marked-term
  styling values.

## Axes to vary

- Serif candidates (a serious text serif — bookish vs sharp).
- Mono candidates (procedural, reads as typed record, pairs with the serif).
- The scale: size/leading for body, headers, frontmatter blocks, captions.
- Marked-term styling: 3–4 treatments (e.g., dotted underline, undertone, margin
  mark) shown in the same dense paragraph.

## Return format

One self-contained HTML page presenting variants A–D side by side — each variant
sets the same three real passages (one per register; write plausible Ho System
content: a Kamae paragraph, an agent-task block with frontmatter, a Reflect note)
plus one term-dense paragraph showing marked terms. Use the frozen palette values.
One-line caption per variant naming what it commits to. Then a recommendation with
reasons. End with **Frozen if accepted:** the exact families, weights, scale, and
marked-term values. Anything belonging to a later question: one line each under
**Parked**.

## Parked in advance (do not answer here)

The definition-on-touch interaction itself (session 7) — here only the resting look
of a marked term. Document layout (session 5).
