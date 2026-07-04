---
created: 2026-07-03
status: draft
type: design-spec
project: hosystem
builds-on:
  - "sageframe-no-kaji/ho-system: private/audit/fable-2026-07-01/deliverable-2-web-presence-vision.md"
  - "sageframe-no-kaji/ho-system: private/audit/fable-2026-07-01/deliverable-1-docification/framework-structure-design-work.md (2.11)"
  - "sageframe-no-kaji/ho-system: framework/glossary.md"
---

# hosystem — Design Spec

The public site of the Ho System. Not a brochure about the practice — a walk through
its real artifacts. The visitor learns the system the way the system works: in bounded
steps, leaving a record, moving forward only.

Stack: Eleventy on Cloudflare Pages, sageframe-dharma account. The site is built as a
Ho System project and publishes its own record (the colophon), starting with this
document.

This spec founds the design work. It holds the rules, the identity direction, and the
ten design questions. Decisions land as numbers in `design/basis-of-design.md` through
isolated design sessions (§7). The [vision document](https://github.com/sageframe-no-kaji/ho-system)
(private, `private/audit/fable-2026-07-01/deliverable-2-web-presence-vision.md`)
remains authoritative for audience, IA detail, and phasing rationale; this spec is the
design layer on top of it.

---

## 1. Rules above everything

**Constraint #0 — voice.** The site reads simple, clear, terse. Nuanced, never
verbose. Every page says the thing plainly and links the long version. Depth lives in
the framework corpus, one link down. This is the deliberate counter to the corpus's
own register — the site is the terse surface of a deep body of work.

**The governing test.** Every dynamic behavior must render something the framework
actually does. Real chains, real hos, real frontmatter, real git history, the site's
own build record. No mockups, no staged data, no animation for its own sake. The
question is never "does this look good?" It is "does this show what the practice
actually does?"

**No gating.** Forward-only is a rule about records, not readers. The visitor goes
anywhere in one click. The site never locks a door; it only remembers the path.

---

## 2. The organizing experience — the journey

pinkteaming.net enforces reading because pink teaming is a practice of reading. The
Ho System is a practice of bounded, verified, recorded building — so this site
*steps*. Three mechanisms carry the whole identity. Everything else is support.

### 2.1 The step — motion

All motion is discrete: bounded, committed moves. The footfall, never the drift.
Nothing eases continuously across the screen; things arrive, hold, and arrive again.
Bokashi (§3.3) is the one permitted softness — an edge may gradate; a position may
not wander.

*Principle: the ho. Bounded sessions, committed at the edge.*

### 2.2 The trail — record

The site records the visitor's path client-side (localStorage; no server, no
tracking) and renders it as a small arc tree: the nav's planned order beside the walk
actually taken, branching where the visitor diverged. It never blocks or redirects.
Append-only.

*Principle: forward-only, and the planned-vs-actual reading (ho-structure §3.7). The
visitor's own behavior is the real data.*

### 2.3 The promotion — state

The shōgi pawn (歩) promotes by flipping over to reveal と in gold. The site's glyph
grammar is the pentagon piece; state change is the flip. A closed ho, a landed
decision, a superseded section resolving — these flip to gold. Gold marks state only,
never emphasis.

*Principle: the framework's own name. Small steps compound into promotion.*

---

## 3. Identity

### 3.1 The mark

The 歩 hanko is the identity anchor. It is the system's real seal, not decoration.
It does not get restyled by any session.

### 3.2 The piece

The pentagon shōgi-piece silhouette is the glyph grammar: nodes in the chain diagram,
hos in arc trees, list markers, the favicon. Front face carries 歩 in sumi; promoted
face carries と in gold.

### 3.3 Palette — production logic, not imagery

The palette direction is Japanese woodblock — taken from how prints are *made*, with
a ban on what they *depict*. This is how "ukiyo-e" avoids becoming costume.

**Adopted (process):**
- Limited ink set: three inks plus paper, total.
- Flat fields: one color, one block, one pass. No continuous shading.
- Bokashi: the wiped gradient, the only gradient, used sparingly and deliberately.
- Translucent overlap: where two inks overlap, they make a third color (multiply).

**Banned (imagery):** wave, cloud, and Fuji motifs; seigaiha and other pattern fills;
brush-stroke or faux-calligraphic type; decorative kanji. Japanese terms the framework
genuinely owns are set plainly. Nothing is borrowed for flavor.

**Candidate ink set** (session 2 judges the values; the roles are fixed):

| Ink | Role |
|---|---|
| washi (paper) | Ground. Unbleached paper white, cooler than the atmarcus.net cream. |
| sumi (ink) | Text and structure. The doing tier. |
| bero-ai (Prussian blue) | The thinking tier — Kamae documents, the discursive register. |
| gold (surimono metallic) | State only — closure, landing, promotion. Rare. |

The palette must be clearly distinct from the atmarcus.net brand (warm cream
`#f5f2ed` + burnt orange `#c45a2d`). That distinction is a hard constraint, not a
preference.

### 3.4 Type — three registers

Three registers get three treatments (vision §7): discursive prose in a text serif;
procedural content (agent tasks, frontmatter, commands) in mono; emergent records
(Reflect, sidequests, teaching notes) in the text face at a distinct secondary tone.
Faces, scale, and the marked-term treatment are session 3.

---

## 4. The glossary system

The glossary is load-bearing: it is what lets the prose stay terse. Terms of art
appear bare in the text; touching one defines it.

**Definition-on-touch.** Every term of art is a marked term. Hover or tap shows the
plain cut inline. The reader never leaves the page to learn a word; the prose never
stops to define one.

**Two cuts per term:**
- **Plain cut** — one sentence, no terms of art inside it. This is the hover text.
  Rule: if a plain cut needs another term of art, it isn't plain yet.
- **Full cut** — the existing `framework/glossary.md` entry, one link away.

Plain cuts live in the framework repo (a `plain:` field per entry). Source of truth
stays home; the site ingests at build time. Writing the ~40 plain cuts is a framework
task and **gates v1** — it is the single highest-leverage content task for the site.

Parked to session 7: terms the visitor has touched accumulate on the trail
("terms you've met").

---

## 5. Information architecture

Six doors, per the vision (§3, authoritative): **The Practice · The Walk · The
Framework · The Skills · Practicing · Engagements**, plus the **colophon**. The Kamae
chain is the narrative spine of The Framework and The Walk; it is never a gate.

The Walk renders sharibako (public repo, full current-convention chain). Kanyō is the
origin story, added in v2. The colophon renders this repo's own record, beginning with
this spec.

### 5.1 Where the material comes from

The site authors almost no content. It renders the practitioner's existing corpus —
the framework documents in which every part of the system was defined and named. The
site's job is to make that work walkable, not to restate it. Ingested at build time
from `sageframe-no-kaji/ho-system` and `sageframe-no-kaji/sharibako`:

| Site section | Source material |
|---|---|
| Front page | The problem and claim, already written in the framework README |
| The Practice | `framework/the-ho-system.md` · `framework/ho-foundations-evidence.md` · the operating discipline, in readable form · the Writing list (§5.2) |
| The Walk | sharibako — the full chain: Kamae documents, hos, agent tasks, Reflect records, addenda |
| The Framework | `framework/structure/*` — the named parts (the Kamae chain, ho shapes, the numbering system, forward-only, the two registers, dandori, the artifact-type registry) · `framework/templates/*`, downloadable |
| The Skills | `skills/*` — one page per skill, per the vision's anatomy |
| Practicing | `guides/*` |
| Engagements | The one section with substantially new prose · the external-contribution doctrine |
| Definition-on-touch | `framework/glossary.md` — every term the practitioner defined and named, one touch away under every page |
| Colophon | This repo's own record |

The naming work is carried twice: structurally (The Framework renders the documents
that define each part) and ambiently (the glossary system puts the practitioner's
definitions under every term of art, everywhere on the site). Nothing is paraphrased
away; where the site compresses per constraint #0, the full document is the link.

### 5.2 The practitioner's writing

The essays stay on Substack; the site links out (vision §13). A curated Writing list
lives on The Practice page. Confirmed members:

- [I Built a Computer Vision System for Harvard's Falcon Cameras](https://sageframe.substack.com/p/ho-process-methodology) — the origin essay
- [Walking Without Google Maps](https://sageframe.substack.com/p/walking-without-google-maps) — problem definition before solution; the design-thinking ground
- [Three Hours](https://sageframe.substack.com/p/three-hours) — shu-ha-ri arrived; the encoded-environment observation
- *The Spec Is Not the Hard Part* — joins on publication

The list is practitioner-curated and extensible; candidates from the wider essay
corpus are added by the practitioner, not inferred.

---

## 6. The design questions

Ten questions in constraint order — earlier winners bind later sessions. One question
per isolated session: no code context, pre-written prompt, labeled variants A–D with
one-line captions, a recommendation, and a `parked` line for anything that belongs to
a later question. Winners freeze into the Basis of Design as numbers.

### Alphabet

**Session 1 — the piece.**
Q: The pentagon glyph — exact geometry and both faces.
Constraints: must read at favicon scale and full-diagram scale; front face 歩 (sumi),
promoted face と (gold); the hanko is untouched and separate.
Axes: proportion (true shōgi ratios vs simplified), outline vs solid, face-character
weight and size.
Parked: the flip animation (session 9).

**Session 2 — palette.**
Q: Exact values for the three inks + paper, and the state semantics.
Constraints: roles per §3.3; distinct from atmarcus.net; body-text pairs pass WCAG AA;
overlap behavior defined (multiply results named as colors).
Axes: washi temperature; bero-ai depth and saturation; gold as flat mineral vs
simulated metallic; the state map (open / closed / superseded / current) in swatches.
Parked: dark mode (decide *whether it exists* here, in one line; design it never or
later).

**Session 3 — type.**
Q: The three register faces and the scale.
Constraints: registers per §3.4; marked terms visible but quiet in dense prose; Latin
primary; real Japanese terms set in a proper CJK face, plainly.
Axes: serif candidates; mono candidates; size/leading scale; marked-term styling.
Parked: definition-on-touch interaction (session 7).

### Grammar

**Session 4 — the step.**
Q: What one step of motion is.
Constraints: discrete grammar per §2.1; bokashi the only softness;
`prefers-reduced-motion` fully respected; define what never moves.
Axes: step duration; easing inside a step (a step may accelerate; it may not glide
between rests); page transitions vs in-page steps; list/diagram assembly order.

**Session 5 — documents.**
Q: How a real framework document renders.
Constraints: frontmatter as a typed header block, visible, not hidden; `builds-on:` and
`supersedes:` as live links; the supersession interaction shows what fell and what
replaced it, side by side; registers styled per session 3.
Axes: header layout; link affordances; side-by-side vs overlay for supersession.

**Session 6 — diagrams.**
Q: The canonical chain rendering.
Constraints: one SVG source generates glyph, section-header, and full annotated
scales; two-tier color split (bero-ai thinking / sumi doing); loop-backs drawn
honestly; the idiom is the framework's box-and-arrow, refined — not SaaS illustration;
generated at build time.
Axes: orientation; node treatment (pieces as nodes, or pieces reserved for hos);
arrow language; commitment-gradient labels.

### Signature

**Session 7 — definition-on-touch.**
Q: The touch interaction, exactly.
Constraints: plain cut appears inline; no navigation; keyboard and touch accessible;
quiet in term-dense passages.
Axes: hover card vs inline expansion; marked-term visual (from session 3's options);
**decide keep-or-kill: terms-you've-met on the trail.**

**Session 8 — the trail.**
Q: How the visitor's walk renders.
Constraints: localStorage only; append-only; never gates or nags; shows planned order
vs actual walk; legible to someone who has never seen an arc tree.
Axes: placement (persistent corner glyph vs footer vs colophon page); notation;
scale; whether it persists across visits.

**Session 9 — the flip.**
Q: Where promotion fires, and how.
Constraints: gold = state only; never fires as hover decoration; one step (discrete,
per session 4); reduced-motion fallback is an instant swap; silent.
Axes: duration; 2D flip vs implied depth; the firing list (ho closure in rendered
documents, arc-tree node state, colophon entries) — trim or extend.

**Session 10 — the threaded split.** *(v2 — listed to protect its space.)*
Two-pane ho ↔ agent-task rendering with span-level cross-lighting, per vision
commitment 3. Hand-authored anchors on sharibako ho-01. No earlier session may
restyle into this space; its design happens when v2 begins.

---

## 7. Process

The design modality (framework 2.11), adapted to this project:

1. Questions isolated — §6, done.
2. One question per session, in isolation, pre-written prompts.
3. Winners freeze into `design/basis-of-design.md` as numbers. Propagation only with
   a commit that names the reason — never silently.
4. Coherence check: one hand-built page assembling everything frozen, before any
   build code.
5. Spike: the frozen basis validated in Eleventy against *real ingested artifacts*
   (a sharibako ho, the glossary, the chain SVG). The spike is the reference target.
6. Implement with every visual parameter exposed as a tuner. Nothing hard-coded
   before it has been seen moving.
7. By-feel landing against the real corpus at real scale; landed values committed as
   defaults.
8. New visual modes ship as A/B toggles and earn their place.

Artifacts: `design/claude-design/` (session prompts, session pages, coherence check,
spike — permanent record); `design/basis-of-design.md` (living; the implementation
spec). This site is the modality's third instance, which is the framework's stated
trigger for maturing the modality further.

---

## 8. Technical ground

- Eleventy; Cloudflare Pages; this repo (sageframe-dharma). Domain:
  `hosystem.sageframe.net`.
- Static + vanilla JS. No frameworks, no server code, no tracking beyond Cloudflare
  defaults. Hard boundary.
- Build-time ingestion: the framework repo and sharibako pulled as submodules or a
  fetch step (decide at the spike). Markdown-with-frontmatter rendered faithfully —
  frontmatter is content, not plumbing.
- Diagrams: SVG generated at build from one source.
- Trail: localStorage only. Nothing leaves the browser.

---

## 9. Phasing

**v1 — the front door plus one real proof.** Requires: sessions 1–9 frozen, coherence
check, spike, glossary plain cuts. Ships: front page (problem → claim → Walk CTA);
The Practice; The Walk (sharibako chain and hos rendered, supersession links live,
static arc tree); The Framework (structural docs + templates); Skills catalog (one
page); Engagements; colophon v0; definition-on-touch; trail recorded with minimal
rendering; promotion as state styling (the flip may be instant-swap in v1).

**v2 — the signatures at full depth.** Animated arc tree; the flip as motion; the
threaded split (session 10); per-skill transcript renderings; Kanyō origin study;
client-side search; terms-you've-met (if session 7 keeps it).

**v3 — whatever v1–v2 expose.** The modality re-runs on real needs, not a wishlist.

---

## 10. Out of scope

Server-side anything; essays on-site (Substack, linked out); newsletter, community,
forum; analytics beyond Cloudflare defaults; versioned docs. (Vision §13, affirmed.)

---

## 11. Open items

- Glossary plain cuts — written in the framework repo. Gates v1.
- DNS: `hosystem.sageframe.net` in Cloudflare.
- Ingestion mechanics (submodule vs fetch) — decided at the spike.
- The unnamed two-tier concept (framework concepts-without-names #7): its name lands
  on the front page the day it exists.
- GitHub remote (sageframe-dharma) — create and push on the practitioner's word.
