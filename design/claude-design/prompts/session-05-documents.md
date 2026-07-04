# Design session 5 — documents

You are running one isolated design session for **hosystem**, the public site of the
Ho System (歩). The site's central commitment: it does not describe the practice's
artifacts — it **is made of them**. Real markdown documents with real frontmatter,
rendered faithfully. Frontmatter is content, not plumbing. Visual language: Japanese
woodblock production logic, never imagery.

Answer ONE question. Do not design ahead of it.

## Standing constraints (frozen — apply to everything)

- Documents look like documents: nothing hidden, nothing sanitized.
- Flat fields; bokashi the only gradient; gold marks state only (a closed or
  superseded document's marker), never emphasis.
- Voice: simple, clear, terse — the *site's* chrome around a document is minimal;
  the document itself is shown as written.
- Motion is discrete (per session 4's grammar; this session designs layout, not
  motion).

## Frozen inputs from earlier sessions

Paste the session 2 (palette) and session 3 (type) landings from
`design/basis-of-design.md`. If either has not landed, stop and say so.

## The question

How a real framework document renders on the site.

## Hard constraints

- Frontmatter renders as a **typed header block** — visible, styled as the typed
  metadata it is (mono register), not collapsed or hidden.
- `builds-on:` and `supersedes:` render as live links.
- The supersession interaction: activating a superseded marker shows what fell and
  what replaced it, **side by side** (or a defensible alternative — argue it).
- The three registers are distinguishable within one document (prose, procedural
  blocks, Reflect/emergent notes) using session 3's treatments.
- Status is visible: open / closed / superseded / current, per session 2's state map.
- Output as numbers: header layout grid, spacing values, link affordance styles,
  the supersession layout.

## Axes to vary

- Header layout: table-like block vs stacked fields vs margin column.
- Link affordances for builds-on/supersedes chains (inline vs header-level vs both).
- Supersession reveal: side-by-side panes vs stacked before/after vs inline
  strike-and-replace.

## Return format

One self-contained HTML page with variants A–D, each rendering the **same realistic
ho document** (write one: frontmatter with builds-on/supersedes, a Think section, an
Execute index, a Reflect note — plausible Ho System content, labeled as sample).
One-line caption per variant naming what it commits to. Then a recommendation with
reasons. End with **Frozen if accepted:** the exact values. Anything belonging to a
later question: one line each under **Parked**.

## Parked in advance (do not answer here)

Marked-term touch behavior (session 7). Chain diagrams (session 6). The two-pane
ho↔agent-task split (session 10, v2) — do not occupy its space.
