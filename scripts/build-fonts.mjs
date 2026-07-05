// build-fonts.mjs — SELF-HOST the body webfonts (spec §8 hard boundary: no third-party
// requests, no tracking). This closes the spike's reported friction #2: the spike loaded
// Source Serif 4 + Source Code Pro from the Google Fonts CDN; v1 must self-host them, with
// the same subset+woff2 tooling already proven for the piece face (scripts/build-font.mjs).
//
// Produces the exact §3 faces:
//   Source Serif 4 — 400, 400 italic, 600      (--serif)
//   Source Code Pro — 400, 600                  (--mono)
// Each variable source is instanced to its static weight and subset to a Latin range
// (the corpus is English; CJK is served by the system stack per §3 — no CJK webfont).
//
// The .woff2 outputs are committed so the build runs offline; this script is a no-op when
// they are all present. Requires uvx (fontTools + brotli) and network to google/fonts only
// when regenerating; if unavailable, the committed assets are used as-is.

import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const OUTDIR = join(ROOT, "src", "fonts");

const RAW = "https://github.com/google/fonts/raw/main";
// pin optical size to a body value; the visual delta across opsz is subtle and one static
// instance keeps the stack simple and offline.
const OPSZ = 16;

const FACES = [
  { out: "source-serif-4-400.woff2",        url: `${RAW}/ofl/sourceserif4/SourceSerif4%5Bopsz%2Cwght%5D.ttf`,        axes: { wght: 400, opsz: OPSZ } },
  { out: "source-serif-4-600.woff2",        url: `${RAW}/ofl/sourceserif4/SourceSerif4%5Bopsz%2Cwght%5D.ttf`,        axes: { wght: 600, opsz: OPSZ } },
  { out: "source-serif-4-400-italic.woff2", url: `${RAW}/ofl/sourceserif4/SourceSerif4-Italic%5Bopsz%2Cwght%5D.ttf`, axes: { wght: 400, opsz: OPSZ } },
  { out: "source-code-pro-400.woff2",       url: `${RAW}/ofl/sourcecodepro/SourceCodePro%5Bwght%5D.ttf`,             axes: { wght: 400 } },
  { out: "source-code-pro-600.woff2",       url: `${RAW}/ofl/sourcecodepro/SourceCodePro%5Bwght%5D.ttf`,             axes: { wght: 600 } },
];

// Latin + the punctuation the corpus and site chrome use (em/en dashes, curly quotes,
// ellipsis, arrows, bullet, prime marks, ×, →). No CJK — that is the system stack (§3).
const UNICODES = [
  "U+0000-00FF", "U+0131", "U+0152-0153", "U+02BB-02BC", "U+02C6", "U+02DA", "U+02DC",
  "U+2000-206F", "U+2074", "U+20AC", "U+2122", "U+2191-2193", "U+2212", "U+2215", "U+FEFF", "U+FFFD",
].join(",");

const missing = FACES.filter((f) => !existsSync(join(OUTDIR, f.out)));
if (missing.length === 0) {
  console.log("[fonts] all body-font subsets present — skipping regeneration.");
  process.exit(0);
}

for (const f of missing) {
  const work = mkdtempSync(join(tmpdir(), "hosite-font-"));
  try {
    const src = join(work, "src.ttf");
    let inFile = src;
    console.log(`[fonts] ${f.out}: fetching source…`);
    execFileSync("curl", ["-fsSL", "-o", src, f.url], { stdio: "inherit" });

    const axisArgs = Object.entries(f.axes).map(([k, v]) => `${k}=${v}`);
    if (axisArgs.length) {
      const inst = join(work, "inst.ttf");
      console.log(`[fonts] ${f.out}: instancing ${axisArgs.join(" ")}…`);
      execFileSync("uvx", ["--from", "fonttools", "fonttools", "varLib.instancer", src, ...axisArgs, "-o", inst], { stdio: "inherit" });
      inFile = inst;
    }

    console.log(`[fonts] ${f.out}: subsetting → woff2`);
    execFileSync("uvx", [
      "--from", "fonttools", "--with", "brotli", "pyftsubset", inFile,
      `--unicodes=${UNICODES}`,
      "--flavor=woff2",
      `--output-file=${join(OUTDIR, f.out)}`,
      "--layout-features=kern,liga,calt,frac,onum",
      "--no-hinting",
      "--desubroutinize",
    ], { stdio: "inherit" });
    console.log(`[fonts] ${f.out}: done.`);
  } catch (err) {
    console.warn(`[fonts] ${f.out}: generation failed — the build will use the committed asset if present, else the system stack.\n        ${err?.message ?? err}`);
  } finally {
    rmSync(work, { recursive: true, force: true });
  }
}
