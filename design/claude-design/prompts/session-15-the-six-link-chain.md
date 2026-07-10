# Design session 15 — the six-link chain: K6's ink and geometry

You are running one isolated design session for **hosystem**, the public site of the
Ho System (歩). This session was born of an upstream doctrine change (ho-system ho-10,
2026-07-09): the Kamae chain became **six links**. K1–K4 are *preparation* (the framing
ladder: opinions → decisions → scope → sequence); K5–K6 are *action-time*. K5 is the
per-ho document a working session carries out; **K6 is the State Memory** — the living
record that carries the build across sessions. K6 commits nothing; it *records*.

The site's chain diagram (§6, frozen) was drawn for five links. A propagation already
shipped the sixth node in **interim ink** — sumi, matched to K5 — with an interim
comment in `lib/chain.mjs`, so the site does not contradict the framework it renders.
This session decides the **final ink and geometry** for K6 and lands them via a
propagation-ledger commit. Until it runs, the interim holds.

Answer ONE question. Do not design ahead of it.

## The question

How the State Memory (K6) is drawn in the canonical chain diagram — its **ink** and its
**geometry** — at all three scales, from the one SVG source.

Two things are genuinely open and this session resolves both:

1. **Ink.** K1–K4 are stroke+text bero; K5 is sumi (§6, frozen). K6 has no assigned
   ink. It is *different in kind* from K1–K5: those are written-then-still; K6 is living
   and hot, rewritten every pause. The visual language may want to mark that difference —
   or may not (a quiet chain is a virtue; §0 voice).
2. **Geometry.** K6 sits in the doing tier with K5. But the doctrine is explicit: K6
   **does not extend the commitment ladder — it serves it.** Whether it reads as a sixth
   rung on the same vertical spine, or sits *off* the ladder (a satellite the per-ho node
   feeds and reads back), is a real composition decision. The current interim simply
   extended the spine, which forced the agent-task decomposition sub-diagram to be
   relocated below K6 to avoid collision — an interim compromise, not a decision.

## Standing constraints (frozen — apply to everything)

- One SVG source generates every scale: glyph (<160 px), header (≥160 px), full
  (≥480 px). Whatever is decided must reduce cleanly to all three.
- Two-tier split (§6): thinking tier bero-ai, doing tier sumi. **Gold = state only —
  gold never appears in the canonical chain** (§6: "it is structure, not state"). A
  "living/hot" mark for K6 must therefore be found *without* gold and *without* a new
  ink (ink economy: three inks + paper, total). Bokashi is the only gradient; it is the
  one permitted softness and may be the lever here.
- Flat fields; no drop shadows, no 3D, no rounded corners.
- Forward arrows filled triangles; returns thin. The thinking→doing crossing prints
  kachi (§6). K6 is doing-tier like K5, so K5→K6 does **not** cross tiers — it is a
  same-tier forward step, not a kachi edge. Confirm and honor that.
- Generated at build time; static SVG. Any "living/hot" treatment must read as living
  in a *still* image (a breathing animation is out of scope — §4's grammar is discrete
  and is not designed here).
- §0 voice: the chain earns every mark. A distinction the reader cannot use is noise.

## Frozen inputs from earlier sessions

Read from `design/basis-of-design.md`: §1 (the piece — the koma marks steppable work
only), §2 (palette — the three inks, the state map, kachi/matsuba overlaps), §3 (type),
**§6 the chain in full** (node geometry 192×48, pitch 92, node inks, the koma on the
per-ho node, the decomposition sub-diagram off node-5, the three scales, "gold never in
the canonical chain"). If any is missing, stop and say so.

## The content it must carry (fixed, from the framework)

- Six nodes: Seed → System Design → README → Ho Overview → Per-Ho Documents → State
  Memory, with labels opinions → decisions → scope → sequence → **session** → **record**.
- The two-tier split unchanged: K1–4 thinking, K5–K6 doing.
- The koma marks steppable work — it belongs on the **per-ho node (K5)**, not K6 (K6 is
  not a bounded step; it is the record). Confirm the koma stays on K5.
- The agent-task decomposition still hangs off K5 (per-ho documents decompose into agent
  tasks) — its placement must be re-solved for whatever geometry K6 takes.

## Hard constraints

- Legible at glyph, header, and full scale from the one source.
- Decide K6's ink explicitly, within the three-ink economy and no gold.
- Decide K6's geometry: on-spine sixth rung vs off-ladder satellite (and if satellite,
  the edge language between K5 and K6 — does it read as feed-and-recall, distinct from a
  forward commitment arrow?).
- Re-solve the decomposition sub-diagram's placement so it does not collide with K6 and
  still reads as belonging to K5.
- State whether the **glyph** scale changes. It currently abstracts as four bero bars +
  one sumi koma (the two tiers, not a literal node count). Six links may or may not touch
  it; argue it either way.
- Output as numbers: K6 node ink/treatment, its position and any edge geometry, the
  revised decomposition coordinates, the viewBox at each scale, and the aria-label text.

## Axes to vary

- **K6 ink:** sumi solid like K5 (action-time pairing, quiet) · sumi with a bokashi edge
  or a broken/hairline stroke (living/hot, still-image) · sumi keyline distinct from K5's
  weight (marks "record" vs "commit" without a new ink).
- **K6 geometry:** sixth rung on the spine · off-ladder satellite fed by the per-ho node ·
  a spanning bracket beside the doing tier (it holds *all* of action-time, not one step).
- **Edge to K6:** a forward triangle like the rest · a distinct feed-and-recall pair
  (write down / read back) matching the "living memory" role.
- **Decomposition placement:** below K6 on the spine · beside K5 in the opposite lane
  from K6 · unchanged and K6 moved instead.

## Return format

One self-contained HTML page with variants A–D, each shown at glyph, header, and full
scale, using frozen palette/type/piece values and the real six-node content. One-line
caption per variant naming what it commits to. Then a recommendation with reasons. End
with **Frozen if accepted:** the exact values (inks, coordinates, viewBoxes, aria-label),
so the propagation-ledger commit can carry them into §6 verbatim. Anything belonging to a
later question: one line each under **Parked**.

## Parked in advance (do not answer here)

Animation of the chain assembly or any "breathing" motion (§4's grammar, a later
question). The arc tree / trail notation (§8, its own frozen language). The v2 threaded
split (§10). Whether K6 gets its own dedicated page beyond the 2.14 corpus page the
corpus glob already renders (out of scope — corpus, not design).
