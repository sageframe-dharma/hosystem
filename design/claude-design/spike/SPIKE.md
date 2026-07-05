# hosystem — design spike

Spec step 5: the frozen Basis of Design validated in Eleventy against **real ingested
artifacts**. This spike is the reference target the v1 build ports from. It changes no
frozen value; where a frozen value met friction, the friction is **reported here**, not
resolved by editing the basis.

Everything renders from the Basis verbatim — palette, type, the piece, the step, the
document, the diagram, definition-on-touch, the trail, the flip — against one real
sharibako ho and the framework's real glossary.

---

## What renders

A single document page (`/`) rendering **sharibako `ho-04.6` — plain-prompt init**, a real
closed ho that supersedes `ho-04.4`, plus a glossary page (`/glossary/`).

- **§5 document** — frontmatter as a typed ledger (visible, authored order); 12 px solid
  koma state mark before the status value; three registers (discursive serif / procedural
  mono with left rule / emergent bero italic with left rule); `builds-on:` and `supersedes:`
  as live header links; a working **side-by-side supersession reveal** — activating the
  `supersedes` marker opens facing panes showing what fell (`ho-04.4`'s dashboard surface,
  its real intro) beside what replaced it (`ho-04.6`'s real Solution).
- **§1 the piece** — one geometry, two inkings by height. Keyline ≥24 px (歩 sumi / と gold),
  solid <24 px, favicon at 16 px. Reference path exact.
- **§6 the chain** — generated **at build time** from one node/edge source
  (`lib/chain.mjs`), emitted at all three scales (full ≥480 px, header ≥160 px, glyph
  <160 px) by reduction. Tier split bero/sumi, crossing arrow in kachi, honest return
  arrows, decomposition, gold never present.
- **§7 definition-on-touch** — floating card, one at a time, hover/focus transient,
  tap/Enter pin, Escape/outside/second-tap dismiss; card arrives as one 160 ms §4 step,
  dismissal instant; terms-you've-met recede by opacity. Real terms, real full cuts.
- **§4 the step** — the 160 ms `cubic-bezier(0.2,0,0,1)` 8 px-rise unit; page in-step;
  sequence stagger tokens.
- **§8 the trail** — footer strip built from **real** `localStorage`/`sessionStorage`
  (`ho.trail.doors` / `ho.trail.walk`), plan above / walk beneath, ≥480 px form only.
- **§9 the flip** — 240 ms, symmetric halves, face swap at 120 ms, the **news rule** with a
  `localStorage` witness log (first visit seeds silently), on the real firing list.
- **§2 palette / §3 type** exact, `prefers-reduced-motion` respected everywhere.

---

## Ingestion decision: fetch-step (not submodule)

Implemented in `scripts/ingest.mjs`. **The winner is a build-time fetch step that copies a
curated subset of files and pins each source's commit SHA into `vendor/manifest.json`.**

Reasoning:

- The site renders a **curated subset** of two large repos, not whole trees. A fetch step
  copies only the files the pages need (`framework/glossary.md`, the two ho documents);
  a submodule would vendor entire repositories.
- **Reproducibility** comes from recording each source's HEAD SHA in the manifest at ingest
  — the same guarantee a submodule's pinned SHA gives — **without** coupling the dharma
  site repo's history to upstream SHAs.
- A submodule needs `.gitmodules` at the **dharma repo root** (outside this spike dir), and
  forces every clone and CI runner to `git submodule update --init` with SSH access to the
  `sageframe-no-kaji` repos.
- The fetch step **prefers the local read-only clones** already on the practitioner's
  machine (fast, offline, never modified) and **falls back to an SSH shallow-clone** into a
  temp dir when a clone is absent — never into either vault.
- `vendor/` is **gitignored**: ingested content is pulled at build, never committed. The
  site renders the corpus; it does not fork it. This mirrors how production will work.

**Recommendation for v1:** keep this pattern; promote SHA pinning from "record current HEAD"
to an explicit pinned ref per source (a small committed lockfile the build reads), so
Cloudflare Pages builds are reproducible against a chosen upstream commit. A read-only
deploy key grants access.

---

## How to run

```sh
cd design/claude-design/spike
npm install                 # pinned deps (see package-lock.json)
npm run build               # ingest → font (skips if present) → eleventy → _site/
npx http-server _site -p 8080     # any static server; or:
# python3 -m http.server -d _site 8080
open http://localhost:8080/
```

- `npm run serve` runs Eleventy's dev server instead.
- `npm run ingest` re-pulls the corpus; `npm run font` regenerates the subset webfont.
- The build runs standalone (`npx @11ty/eleventy`) once `vendor/` is populated
  (`npm run ingest`, done automatically by `npm run build`'s `prebuild`).

**Seeing the flip.** On first visit the news rule seeds the witness log silently — every
firing mark renders already-promoted (gold と), nothing animates. That is correct §9
behavior. To watch the real flip fire, use the labelled **"replay promotion as news"** spike
button: it forgets the closed records so a reload replays them as news, and each mark flips
when it scrolls fully into view. "reset witness log" clears it entirely. These buttons, and
the trail's navigation buttons, are **spike aids, not site chrome** — they drive the real
mechanisms because a one-page spike has nothing else to navigate.

---

## Subset-font outcome (§3 piece-face webfont) — SUCCESS

`scripts/build-font.mjs` fetched Noto Serif JP (variable) from `google/fonts`, instanced it
to `wght=500`, and subset it to exactly **歩 と** via `uvx --from fonttools --with brotli
pyftsubset` → **`src/fonts/piece-subset.woff2`, 1208 bytes**. It is committed (so the build
needs no network/fonttools), self-hosted, and prepended to the CJK stack **for the piece's
faces only** via `@font-face { font-family: HoPiece; unicode-range: U+6B69, U+3068 }`. The
koma's face no longer shifts with each OS's mincho fallback. No fallback to the plain stack
was needed.

---

## Seam checks (the three the coherence check flagged) — ALL PASS

Driven live through the Chrome DevTools Protocol against the built page.

1. **§7 card over an open §5 supersession pane (z-order).** With the supersession pane open
   and a definition card forced to overlap it, `getComputedStyle`: card `z-index: 10` (the
   page's only elevated layer, §7) vs pane `z-index: auto`. `elementFromPoint` at the card's
   centre returns the card's own `<p class="plain">` — **the card paints on top.** PASS.

2. **歩/と optical centering with the subset font.** For the h28 keyline koma, the face
   glyph's bounding-box centre lands at **(0.37H, 0.61H)** — horizontal offset from the
   silhouette's path centre `dx = 0`; vertical `dy = +3.08 px`, which is exactly the intended
   optical drop (`(0.610 − 0.500)·28 = 3.08`): §1 seats the face at 0.610H, below the
   pentagon's geometric centre, because the apex-up/base-down silhouette carries its visual
   mass low. The subset font centres the faces on the §1 anchor as specified. PASS.

3. **Door names bound from ONE source.** The six door names are defined once in
   `src/_data/meta.js` (`doors`), injected as the `#doors` JSON island, and read only there
   by `trail.js`. No second definition exists anywhere. PASS.

---

## Frictions (reported — no frozen value changed)

1. **Plain cuts do not exist in the framework yet.** The glossary has **no `plain:` field**;
   writing the ~40 plain cuts is the framework task that *gates v1* (spec §4, §11) — so the
   site's real source of plain cuts is not yet available to ingest. The spike uses
   `lib/plain-cuts.mjs`: stand-ins **condensed from the real glossary definitions**, obeying
   §4's rule (one sentence, no term of art inside). The **full cut always links to the real
   ingested glossary entry** (`/glossary/#…`). When the framework lands `plain:`, ingestion
   reads it and `plain-cuts.mjs` is deleted. *This is the single highest-leverage content
   gap the spike surfaces.*

2. **Body webfonts loaded from a third party.** Source Serif 4 + Source Code Pro come from
   the Google Fonts CDN in the spike (a build shortcut). Spec §8 is a **hard boundary**: no
   third-party requests, no tracking. **v1 must self-host** these (subset + `@font-face`, the
   same tooling proven here for the piece face). The *required* deliverable — the piece-face
   subset — is already self-hosted.

3. **Em-dash rule vs. the corpus.** §3 mandates closed em dashes (`word—word`) for site
   prose. The **real ingested corpus** — and the basis/spec documents themselves — use
   **spaced** em dashes. The site renders the corpus verbatim; it cannot rewrite the author's
   punctuation. §3 therefore governs only **site-authored chrome**, which this spike complies
   with (its labels use colons/mid-dots, no spaced em dashes). Worth a one-line clarification
   in §3 that the rule scopes to site prose, not ingested content.

4. **§5's register map names ha-shape phases.** The map says "Execute blocks → procedural;
   Reflect → emergent." The chosen document is **ri** shape (Problem / Solution / Changes /
   Results). The spike maps **Changes → procedural** and **Results → emergent**, a clean
   correspondence — but §5 could name the ri sections explicitly so the mapping isn't left to
   the implementer. Documentation gap, not a value change.

5. **`builds-on:` link targets.** The spike points `builds-on` at real GitHub blob URLs
   (resolvable); v1 resolves them to rendered on-site document pages. The frozen part — the
   link **affordance** (solid 1 px underline, bero@0.70, distinct from the dotted marked
   term) — renders correctly.

6. **Trail on a one-page spike.** The storage and rendering are real; the multi-step *walk*
   is driven by labelled spike buttons (real `sessionStorage`/`localStorage` writes) because
   a single page has nothing else to navigate to. The mechanism is real; only the navigation
   is stood in for.

---

## Layout

```
spike/
  package.json / package-lock.json   pinned deps (@11ty/eleventy 3, gray-matter, markdown-it)
  eleventy.config.mjs                chainSvg + koma build-time shortcodes
  .gitignore                         node_modules, _site, vendor
  scripts/
    ingest.mjs                       fetch-step ingestion → vendor/ (+ manifest with SHAs)
    build-font.mjs                   piece-face subset reproducer (idempotent)
  lib/
    koma.mjs                         §1 silhouette + inkings (one source)
    chain.mjs                        §6 chain, three scales from one model
    corpus.mjs                       parse glossary + ho docs, register map, term marking
    plain-cuts.mjs                   spike-local plain cuts (deleted once framework lands `plain:`)
  src/
    _data/{doc,glossary,meta}.js     data layer
    _includes/base.njk               layout
    index.njk / glossary.njk         pages
    css/spike.css                    the frozen Basis as tokens + rules (every value cited)
    js/{defotouch,reveal,flip,trail}.js   vanilla behaviours
    fonts/piece-subset.woff2         committed subset (歩 と)
    favicon.svg                      §1 solid front face
  vendor/                            ingested corpus (gitignored; npm run ingest)
```

## Practitioner judgment — 2026-07-05

Accepted as the reference target ("good to go"). Two notes from the judgment:

- **Ingestion confirmed as understood**: text is pulled from the source repos at
  build time (vendor/ + SHA manifest), never stored in this repo or the templates.
- **Flagged, forward-only**: the diagram renderings (the §6 chain and/or the §8
  trail) are not fully legible to the practitioner — "i don't totally understand
  the graphs." Sessions 6 and 8 stay closed; a diagram-legibility ho opens when
  the practitioner can name what loses him. Until then the frozen values stand.

