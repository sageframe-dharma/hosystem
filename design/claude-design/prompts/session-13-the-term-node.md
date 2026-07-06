# Design session 13 — the term node

You are running one isolated design session for **hosystem**, the public site of the
Ho System (歩). This session was born at the v1 review (2026-07-06): the glossary's
second level — the full entry behind every plain cut — is one flat page, and the
practitioner wants it navigable. The decided shape (architecture, not reopened
here): hosystem adopts the node model of **\*, Actually** — the practitioner's
system for navigable relational knowledge — as a **format contract**, and renders it
entirely in hosystem's own idiom. The format: YAML frontmatter (`id`, `title`,
`type`, `requires`, `related`, `entry_points`, `summary`) over a body in authored
depth layers marked `<!-- depth:n -->` (1 name → 2 definition → 3 usage →
4 relationships → 5 theory). Reference exemplar:
`/Users/atmarcus/Vaults/sageframe-no-kaji-dev/ssh-actually/nodes/blob.md` (read-only;
its README explains the system). No \*, Actually code, templates, or aesthetics —
the format is the contract, the rendering is hosystem's.

Answer ONE question. Do not design ahead of it.

## The question

How a term's node page renders: the depth dial, the relationships, and the way in
and out.

## Standing constraints (frozen — apply to everything)

- Rendered in hosystem's frozen system only: §2 inks, §3 type and registers,
  §4 step motion, §5 link grammar, §7 touch, §12 crumbs. No HTMX, no new inks,
  no terminal aesthetic.
- Gold = state only. Terms carry no state; met-terms recede in sumi (§7). No gold
  on term pages.
- §7 holds inside entries: terms of art within a node's body are marked terms —
  touch defines recursively; touch never navigates.
- Voice: simple, clear, terse. The node page is corpus, not chrome — the entry
  text renders as written.
- Today only depths 1–3 exist per term (derived: summary = the plain cut,
  depth 2–3 = the full entry). Depths 4–5 are unauthored. Absent depths must be
  invisible-graceful — never a broken or apologetic dial.

## Frozen inputs from earlier sessions

Read from `design/basis-of-design.md`: §2 palette, §3 type, §5 documents (link
affordance), §7 definition-on-touch (the card, terms-you've-met), §12 wayfinding
(crumb grammar). If any is missing, stop and say so.

## Hard constraints

- One page per term at `glossary / <id>` — crumb per §12 (two segments; the
  glossary door is the top).
- The §7 card's "full entry →" lands on the node page; define at which depth it
  opens and how the reader returns to exactly where they were reading.
- Relationships render from the frontmatter: `requires` (the terms this one
  stands on), `related`, and **backlinks** (terms whose entries reference this
  one — derivable, not authored). The defining-document citations link into the
  rendered corpus.
- The depth dial is keyboard accessible and discrete (§4): moving depth is a
  committed step, never a scroll-fade.
- Output as numbers: page grid, dial geometry and states, relationship-block
  layout, backlink treatment, type values for each depth, the return mechanism.

## Axes to vary

- Depth dial form: progressive disclosure (deeper appends below, dial as
  you-are-here) vs single-pane (content swaps at depth) vs all-depths-visible
  with a depth rail in the margin.
- Relationship rendering: typed lists (requires / related / referenced-by) vs a
  margin rail vs a mini-graph in §6's diagram idiom at term scale.
- The way in: "full entry →" lands at depth 2 vs at the depth the reader last
  used vs always at the top with the summary.
- The way out: §12 crumb only vs a branch-return affordance (back to the exact
  paragraph and scroll position that spawned the card) vs both.

## Return format

One self-contained HTML page with variants A–D as **working demos** — each variant
renders the same three real terms as full node pages (choose relationship-rich
ones: e.g. `forward-only`, `ho`, `tuner`), with live depth dial, touchable marked
terms inside the body, relationship links, and a simulated "arrived from the card
in ho-structure" return path. Derive the demo nodes from the real glossary
(read-only at `/Users/atmarcus/Vaults/sageframe-no-kaji-dev/ho-system/framework/glossary.md`).
One-line caption per variant naming what it commits to. Then a recommendation with
reasons. End with **Frozen if accepted:** the exact values. Anything belonging to
a later question: one line each under **Parked**.

## Parked in advance (do not answer here)

Authoring depths 4–5 (a ho-system-repo writing project; the format holds their
place). The node files' move from glossary.md into `nodes/` files in the ho-system
repo (an ingestion/authoring decision, not visual). The AI portal / question entry
(needs a server; the site is static — v-later). The glossary index page's own
redesign. Whether framework documents beyond terms become nodes.
