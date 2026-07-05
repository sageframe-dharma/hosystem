# Kickstart — building hosystem v1

The bootstrap prompt for the v1 build. It assumes **nothing** except this repo: the
session that runs it has no memory of the conversations that founded the project.
Everything it needs is in the repo's documents; this file tells it what to read, in
what order, and what to do.

## Gate — do not build until every box is true

- [ ] `design/basis-of-design.md` shows sessions 1–9 **landed** (numbers, not
      placeholders).
- [ ] The coherence check exists: `design/claude-design/coherence-check.html` — one
      hand-built page assembling every frozen element together.
- [ ] The design spike exists in `design/claude-design/` — the frozen basis
      validated in Eleventy against real ingested artifacts. The spike is the
      reference target.
- [ ] `framework/glossary.md` in `sageframe-no-kaji/ho-system` carries `plain:` cuts
      (the one-sentence hover definitions). This gates v1 content.
- [x] Cloudflare DNS for `hosystem.sageframe.net` is ready, or explicitly deferred.
      **Explicitly deferred, 2026-07-05** — the name currently serves the
      practitioner's reverse-proxy stack; Cloudflare Pages wiring happens after
      the pages are done. Out of v1 build scope; build to `_site`, do not deploy.

If any box is unchecked, stop and surface it. Do not improvise past the gate.

---

## The prompt

You are building v1 of **hosystem** — the public site of the Ho System (歩), a
methodology for human-AI collaborative development. The site's organizing
commitments, in one breath: it is **made of the practice's real artifacts**, not
descriptions of them; it reads **simple, clear, terse**, linking into depth; the
visitor takes a **journey in steps**, and every dynamic behavior renders something
the framework actually does.

**Read first, in this order — do not skip:**

1. `CLAUDE.md` — project rules and state.
2. `README.md` — what this is.
3. `design/design-spec.md` — the founding design document. §1 rules, §2 mechanisms,
   §5 content sources, §9 the v1 scope you are building.
4. `design/basis-of-design.md` — every visual value you will use. **If a value you
   need is not there, stop and surface it. Never invent a design value.**
5. The spike in `design/claude-design/` — the visual reference target. You port the
   spike; you do not copy-paste it.

**What v1 ships** (spec §9, authoritative): front page (problem → claim → Walk CTA);
The Practice (+ the Writing list, spec §5.2); The Walk (sharibako's chain and hos
rendered as real documents, supersession links live, static arc tree); The Framework
(structural docs rendered + downloadable templates); Skills catalog (one page);
Engagements; colophon v0 (this repo's own record); definition-on-touch everywhere;
trail recorded with minimal rendering; promotion as state styling (instant swap is
acceptable in v1 if session 9 landed motion for v2).

**Build order:**

1. Eleventy scaffold. Ingestion of `sageframe-no-kaji/ho-system` and
   `sageframe-no-kaji/sharibako` per the mechanism the spike decided (submodule or
   fetch step). Markdown-with-frontmatter renders faithfully — frontmatter is
   content, displayed as the typed header the basis specifies.
2. The document pipeline: typed headers, `builds-on:`/`supersedes:` live links,
   register styling, status per the state map, glossary marked terms with plain-cut
   touch definitions.
3. The chain SVG generator: one source, three scales, per the basis.
4. Pages, in the nav's order. Content comes from the corpus per spec §5.1 — the
   Engagements page is the only substantially new prose, and its copy follows
   vision §11 (outcomes and discipline, one contact action, no funnel).
5. The step motion grammar, the trail, promotion state styling — per basis values,
   with `prefers-reduced-motion` honored everywhere.
6. Every visual parameter reads from one tokens layer traceable to the Basis of
   Design, and the by-feel-adjustable ones are exposed as tuners (a dev-only panel
   is fine). Nothing hard-coded that the basis owns.

**Verify before calling anything done:** the build is clean; internal links resolve
(automate the check); definition-on-touch works by mouse, keyboard, and tap;
reduced-motion produces a fully usable site; the pages pass a basic accessibility
pass (landmarks, contrast per the frozen palette, focus order); the rendered
sharibako documents are byte-faithful to their sources in content.

**Deploy:** Cloudflare Pages, `sageframe-dharma` account, domain
`hosystem.sageframe.net`. Deployment is outward-facing: build and preview first,
deploy on the practitioner's word.

**Discipline:** work in bounded steps; commit atomically with descriptive messages;
the practitioner runs a by-feel tuner landing pass with you before values lock. If
you hit an architectural question the documents do not answer, stop and surface it —
do not decide it silently. This project's record is public: the colophon will render
what you do.
