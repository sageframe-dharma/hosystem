// ingest.mjs — build-time ingestion of the real corpus (spec §8; the fetch-step
// pattern decided at the spike, SPIKE.md "Ingestion decision").
//
// DECISION (ported from the spike): a build-time fetch step, NOT a git submodule. The
// site renders a curated *subset* of two upstream repos; a fetch step copies only the
// files the pages need and pins each source's HEAD SHA into vendor/manifest.json —
// full reproducibility without coupling this repo's history to upstream SHAs or forcing
// every clone/CI to init submodules with SSH access.
//
// The step PREFERS the local read-only clones already on disk (fast, offline, never
// modified). If a clone is absent it shallow-clones via SSH into a temp dir — never into
// either vault. Ingested files land in vendor/ (gitignored): the site renders the corpus,
// it does not fork it. This mirrors how the Cloudflare Pages build will work.

import { execFileSync } from "node:child_process";
import {
  cpSync, existsSync, mkdirSync, mkdtempSync, readdirSync, rmSync, statSync, writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const VENDOR = join(ROOT, "vendor");

// Upstream sources. localPath is this machine's read-only clone (preferred, never
// modified); ssh is the fallback remote for a fresh CI environment.
const SOURCES = {
  "ho-system": {
    localPath: "/Users/atmarcus/Vaults/sageframe-no-kaji-dev/ho-system",
    ssh: "git@github.com:sageframe-no-kaji/ho-system.git",
    // curated subset: only what the rendered pages need
    files: [
      "README.md",
      "ho-hanko.png",
      "framework/glossary.md",
      "framework/the-ho-system.md",
      "framework/ho-foundations-evidence.md",
      "practitioner/operating-discipline.md",
      "skills/ho-skill-overview.md",
    ],
    trees: [
      { dir: "framework/structure", match: /\.md$/ },
      { dir: "framework/templates", match: /\.md$/ },
      { dir: "skills", match: /\/SKILL\.md$/ },
    ],
  },
  sharibako: {
    localPath: "/Users/atmarcus/Vaults/sageframe-no-kaji-dev/sharibako",
    ssh: "git@github.com:sageframe-no-kaji/sharibako.git",
    files: [
      "README.md",
      "ho-process/kamae-1-sharibako-seed.md",
      "ho-process/kamae-2-sharibako-system-design.md",
      "ho-process/kamae-2.1-sharibako-injection-decision.md",
      "ho-process/kamae-2.2-sharibako-ownership-decision.md",
      "ho-process/kamae-4-sharibako-ho-overview.md",
    ],
    trees: [{ dir: "ho-process/hos", match: /\.md$/ }],
  },
};

function headSha(dir) {
  try {
    return execFileSync("git", ["-C", dir, "rev-parse", "HEAD"], { encoding: "utf8" }).trim();
  } catch {
    return "unknown";
  }
}

// recursively collect files under base/dir whose relative path matches `match`
function walk(base, dir, match, out) {
  const abs = join(base, dir);
  if (!existsSync(abs)) return;
  for (const name of readdirSync(abs)) {
    const rel = join(dir, name);
    const full = join(base, rel);
    if (statSync(full).isDirectory()) walk(base, rel, match, out);
    else if (match.test("/" + rel.replace(/\\/g, "/"))) out.push(rel);
  }
}

rmSync(VENDOR, { recursive: true, force: true });
mkdirSync(VENDOR, { recursive: true });

const manifest = { generated: new Date().toISOString(), method: "fetch-step", sources: {} };

for (const [name, src] of Object.entries(SOURCES)) {
  let base = src.localPath;
  let via = "local-clone";
  let tmp = null;

  if (!existsSync(base)) {
    tmp = mkdtempSync(join(tmpdir(), `hosite-${name}-`));
    console.log(`[ingest] ${name}: no local clone — shallow-cloning ${src.ssh}`);
    execFileSync("git", ["clone", "--depth", "1", src.ssh, tmp], { stdio: "inherit" });
    base = tmp;
    via = "ssh-clone";
  }

  const sha = headSha(base);
  console.log(`[ingest] ${name}: ${via} @ ${sha.slice(0, 12)}`);

  const rels = [...(src.files || [])];
  for (const t of src.trees || []) walk(base, t.dir, t.match, rels);

  for (const rel of rels) {
    const from = join(base, rel);
    if (!existsSync(from)) throw new Error(`[ingest] missing ${name}/${rel}`);
    const to = join(VENDOR, name, rel);
    mkdirSync(dirname(to), { recursive: true });
    cpSync(from, to);
  }
  console.log(`[ingest]   + ${rels.length} files`);

  manifest.sources[name] = { via, sha, files: rels.map((r) => r.replace(/\\/g, "/")) };
  if (tmp) rmSync(tmp, { recursive: true, force: true });
}

writeFileSync(join(VENDOR, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
console.log(`[ingest] wrote vendor/manifest.json`);
void relative;
