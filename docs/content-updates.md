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

## Rebuild automation — decided at Cloudflare wiring (deferred, KICKSTART gate)

When the site is wired to Cloudflare Pages, choose the trigger:

1. **Site-repo push → auto build.** Free with Pages git integration. Covers
   design/site changes only.
2. **Corpus push → deploy hook.** One `curl` to a Pages deploy-hook URL from
   the corpus repos (or by hand) rebuilds the site on content changes.
3. **Scheduled rebuild.** A nightly hook if push-time hooks are unwanted.

Until wired: build locally, deploy deliberately. The propagation rule applies to
values, not content — corpus updates need no commit here at all.
