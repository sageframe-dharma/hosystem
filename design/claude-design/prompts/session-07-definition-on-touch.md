# Design session 7 — definition-on-touch

You are running one isolated design session for **hosystem**, the public site of the
Ho System (歩). The framework is vocabulary-heavy by design — the practitioner named
every part. The site's prose stays terse because the glossary carries the weight:
every term of art is a marked term, and touching it defines it inline. The reader
never leaves the page to learn a word; the prose never stops to define one. This is
the site's single most important reading mechanism.

Answer ONE question. Do not design ahead of it.

## Standing constraints (frozen — apply to everything)

- The definition shown is the **plain cut**: one sentence, no terms of art inside
  it. The full glossary entry is one link away from the definition.
- No navigation on touch — the reader stays exactly where they are.
- Keyboard accessible (focus + Enter/Escape) and touch accessible (tap toggles).
- Quiet in term-dense passages: three marked terms in one sentence must not turn
  the page into an interface.
- Voice: simple, clear, terse. Flat fields; gold = state only.

## Frozen inputs from earlier sessions

Paste the session 2 (palette) and session 3 (type — including the marked-term
resting style) landings from `design/basis-of-design.md`. If either has not landed,
stop and say so.

## The question

The touch interaction, exactly: what happens between resting marked term and read
definition, and back.

## Hard constraints

- Works on hover (desktop), tap (touch), and focus (keyboard) with one coherent
  model.
- Dismissal is obvious and cheap in all three modes.
- The plain cut and the "full entry →" link render per frozen type values.
- Output as numbers: reveal geometry, timing (per session 4's step grammar if
  landed; else instant), offsets, z-behavior, max-width.

## Axes to vary

- Hover card (floats near the term) vs inline expansion (the paragraph opens to
  admit the definition) vs margin note (definition appears in the margin rail).
- Reveal behavior in dense passages: one-at-a-time vs allow-multiple.

## Decide here — keep or kill

**Terms-you've-met:** touched terms accumulate on the visitor's trail (the site
records the walk client-side). If kept: how a met term looks afterward (subtle state
change, per the state map) and where the accumulated list surfaces. If killed: one
line of reasoning. Judge it against the quiet-in-dense-passages constraint.

## Return format

One self-contained HTML page with variants A–D as **working demos** — the same
term-dense paragraph (write plausible Ho System prose with 4–5 marked terms and real
plain-cut definitions for them), interactive in each variant. One-line caption per
variant naming what it commits to. Then a recommendation with reasons. End with
**Frozen if accepted:** the exact values, and the keep/kill verdict. Anything
belonging to a later question: one line each under **Parked**.

## Parked in advance (do not answer here)

The trail's own rendering (session 8).
