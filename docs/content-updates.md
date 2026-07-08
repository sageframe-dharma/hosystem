# How site content updates

The site does not author content (spec §5.1). Everything rendered from the
practice's corpus is **pulled at build time** — never stored in this repo, never
edited here.

## Where content comes from

`npm run build` runs an ingest step (`scripts/ingest.mjs`) that copies what the
site needs from read-only clones of:

- `sageframe-no-kaji/ho-system` — glossary (with `_Plain:` cuts), framework
  structure docs, templates
- `sageframe-no-kaji/sharibako` — the full chain The Walk renders

into a gitignored `vendor/` directory, pinning each source's commit SHA in
`vendor/manifest.json`. The colophon prints the SHAs the current build rendered.
The piece-face and body webfonts are committed woff2 subsets — the build runs
offline.

## Updating content

Edit the source repo (ho-system or sharibako), then rebuild here:

```
npm run build
```

**Nothing watches the corpus repos.** The dev server (`npm run serve`) watches
this repo's `src/` only — a corpus change is invisible until the next
`npm run build`. A deployed site is a static snapshot of the pinned SHAs.

## Rebuild automation — wired 2026-07-08 (GitHub Actions)

`.github/workflows/deploy.yml` builds and deploys on every push to main and
every night at 09:00 UTC (plus manual `workflow_dispatch`). In CI the ingest
falls back to shallow https clones of the public corpus repos; the manifest
still pins the SHAs used. Secrets on the GitHub repo: `CLOUDFLARE_API_TOKEN`
(Pages-Edit scope, Sageframe account — rollable in the Cloudflare dashboard;
local copy lives in the gitignored `.env`, see `.env.example`) and
`CLOUDFLARE_ACCOUNT_ID`.

So, in practice:

- **Site change** — push; it ships itself to the `hosystem` Pages project.
- **Corpus change** — the nightly run carries it; or trigger the workflow by
  hand for same-day; or `npm run build && npx wrangler pages deploy _site
  --project-name hosystem` for right-now.
- The Pages project is direct-upload by design (no Pages git connection —
  Actions is the automation, because Pages integration can't watch the two
  corpus repos anyway).

The propagation rule applies to values, not content — corpus updates need no
commit here at all.
