# hosystem — project instructions

The public site of the Ho System (歩), served at `hosystem.sageframe.net`. Built as a
Ho System project; this repo's own record renders on the site as the colophon.

**Read in order before doing anything:** `README.md` → `design/design-spec.md` →
`design/basis-of-design.md`. The design spec is the authority for all design work.
The Basis of Design holds frozen decisions as explicit values; implementation reads
from it and only from it.

## State

**v1 is built** (KICKSTART executed 2026-07-06; Eleventy at repo root, 46 pages).
Sessions 1–9, 11 (narrow trail), and 12 (wayfinding) are landed; the basis of
design and its propagation ledger are the sole authority for every value.
Coherence check and spike live in `design/claude-design/` as records — where they
predate a ledger propagation, the basis wins.

- Build/serve: `npm run build` (re-ingests the corpus repos — see
  `docs/content-updates.md`) · `npm run serve` · `npm run check-links`.
- Dev affordances: `?tuners` (by-feel motion panel) · `?flip` (replay promotions).
- **Session 13 (the term node) is open** — prompt committed, not yet run:
  \*, Actually's node format as contract, rendered in hosystem's idiom.
- Pending before deploy: fresh-eyes audit (stranger personas walking the built
  site); Cloudflare Pages wiring + DNS (practitioner's scope, explicitly
  deferred at the KICKSTART gate).
- New design questions keep the same discipline: a numbered session prompt in
  `design/claude-design/prompts/`, one fresh session, winners land in the basis,
  changes to frozen values only through the propagation ledger.

## Running a design session

When the practitioner says "run design session N":

1. Read `design/claude-design/prompts/session-NN-*.md` and follow it exactly. It is
   self-contained; do not pull in other context beyond what it and this file say.
2. Where the prompt says to paste frozen inputs, read them from
   `design/basis-of-design.md`. If a required landing is missing, stop and say so.
3. Write the variants page to `design/claude-design/sessions/session-NN-variants.html`
   and tell the practitioner to open it in a browser.
4. The practitioner judges. On their pick: append a short session record
   (winner, reasons, parked items) to the variants file or alongside it, land the
   frozen values in `design/basis-of-design.md` (status → landed), commit both.
5. One session per conversation. When it lands, the session ends. The next question
   gets a fresh session.

## Rules (compressed — full versions in the spec)

- **Voice (constraint #0):** the site reads simple, clear, terse. Link into depth;
  never inline it.
- **Governing test:** every dynamic behavior renders something the framework
  actually does. No mockups, no staged data.
- **No gating:** records are forward-only; readers are free.
- **Propagation:** a frozen value in the Basis of Design changes only through a
  commit that names the reason. Record it in the propagation ledger. Never silently.
- **Tuners:** never hard-code a visual parameter before it has been seen moving.
- **No build code** before the Basis of Design shows sessions 1–9 landed.
- **Session isolation:** design prompts are given exactly as written. A session
  answers one question and never restyles an earlier winner.

## Stack (decided — do not reopen)

Eleventy · Cloudflare Pages (sageframe-dharma account) · vanilla JS · static only.
No frameworks, no server code, no tracking beyond Cloudflare defaults. Content is
ingested at build time from `sageframe-no-kaji/ho-system` and
`sageframe-no-kaji/sharibako` — the site renders the practitioner's corpus; it does
not author content (spec §5.1).

## Layout

```
design/
  design-spec.md          the founding design document
  basis-of-design.md      frozen values; the implementation spec (living)
  claude-design/
    prompts/              pre-written session prompts (permanent record)
    sessions/             session outputs: variant pages, records (permanent record)
KICKSTART.md              the v1 build prompt, gated on the basis freezing
```
