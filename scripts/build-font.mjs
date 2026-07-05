// build-font.mjs — produce the piece-face subset webfont decided in Basis §3.
//
// Subsets the two glyphs the koma's faces use — 歩 (front) and と (promoted) —
// from Noto Serif JP into a woff2, so the piece face does not shift with each OS's
// mincho fallback. The asset is committed at src/fonts/piece-subset.woff2; this
// script only regenerates it, and is a no-op when the asset already exists.
//
// Requires: uvx (fontTools + brotli fetched on demand) and network access to the
// google/fonts repo for the source variable font. If either is unavailable the
// committed asset is used as-is; if the asset is missing too, the CSS falls back
// to the plain CJK stack (documented in SPIKE.md as an open item).

import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const OUT = join(ROOT, "src", "fonts", "piece-subset.woff2");

// Pinned source: Noto Serif JP variable font at google/fonts main.
const SRC_URL =
  "https://github.com/google/fonts/raw/main/ofl/notoserifjp/NotoSerifJP%5Bwght%5D.ttf";
const WEIGHT = 500; // mincho weight pinned for a present but quiet face
const GLYPHS = "歩と";

if (existsSync(OUT)) {
  console.log("[font] piece-subset.woff2 already present — skipping regeneration.");
  process.exit(0);
}

const work = mkdtempSync(join(tmpdir(), "hospike-font-"));
try {
  const src = join(work, "src.ttf");
  const inst = join(work, "inst.ttf");
  console.log("[font] fetching Noto Serif JP variable font…");
  execFileSync("curl", ["-fsSL", "-o", src, SRC_URL], { stdio: "inherit" });
  console.log(`[font] instancing to wght=${WEIGHT}…`);
  execFileSync(
    "uvx",
    ["--from", "fonttools", "fonttools", "varLib.instancer", src, `wght=${WEIGHT}`, "-o", inst],
    { stdio: "inherit" }
  );
  console.log(`[font] subsetting to «${GLYPHS}» → ${OUT}`);
  execFileSync(
    "uvx",
    [
      "--from", "fonttools", "--with", "brotli", "pyftsubset", inst,
      `--text=${GLYPHS}`,
      "--flavor=woff2",
      `--output-file=${OUT}`,
      "--layout-features=",
      "--no-hinting",
      "--desubroutinize",
    ],
    { stdio: "inherit" }
  );
  console.log("[font] done.");
} catch (err) {
  console.warn(
    "[font] subset generation failed; CSS will fall back to the plain CJK stack.\n" +
      "        " + (err?.message ?? err)
  );
  // Non-fatal: the build proceeds without the subset (open item).
} finally {
  rmSync(work, { recursive: true, force: true });
}
