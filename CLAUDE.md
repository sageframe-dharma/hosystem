# hosystem — project instructions

The public site of the Ho System (歩), served at `hosystem.sageframe.net`. Built as a
Ho System project; this repo's own record renders on the site as the colophon.

**Read in order before doing anything:** `README.md` → `design/design-spec.md` →
`design/basis-of-design.md`. The design spec is the authority for all design work.
The Basis of Design holds frozen decisions as explicit values; implementation reads
from it and only from it.

## State

Founding / design phase. No build code exists yet. The path:

1. Design sessions 1–9 (spec §6) run from the pre-written prompts in
   `design/claude-design/prompts/`, one per isolated conversation.
2. Winners land in `design/basis-of-design.md` as numbers.
3. Coherence check (one hand-built page, all frozen elements together) →
   design spike in Eleventy against real ingested artifacts.
4. `KICKSTART.md` builds v1. Its gate checklist must be fully true first.

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
