// ingest.mjs — build-time ingestion of the real corpus (spec §8, decided at the spike).
//
// DECISION: fetch-step, not git submodule. Reasoning in SPIKE.md. In short: the site
// renders a curated *subset* of two upstream repos; a fetch step that pins each source's
// commit into a manifest gives full reproducibility without coupling this repo's history
// to upstream SHAs or requiring every clone/CI to init submodules with SSH access.
//
// This spike prefers the local read-only clones already on disk and records their HEAD
// SHA. If a clone is absent it shallow-clones via SSH into a temp dir (never into either
// vault). Ingested files land in vendor/ (gitignored) — sources are pulled at build, not
// committed, exactly as the production site will work.

import { execFileSync } from "node:child_process";
import {
  cpSync, existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const VENDOR = join(ROOT, "vendor");

// Upstream sources. localPath is this machine's read-only clone (preferred, never
// modified); ssh is the fallback remote for a fresh environment.
const SOURCES = {
  "ho-system": {
    localPath: "/Users/atmarcus/Vaults/sageframe-no-kaji-dev/ho-system",
    ssh: "git@github.com:sageframe-no-kaji/ho-system.git",
    // curated subset: only what the rendered pages need
    files: ["framework/glossary.md"],
  },
  sharibako: {
    localPath: "/Users/atmarcus/Vaults/sageframe-no-kaji-dev/sharibako",
    ssh: "git@github.com:sageframe-no-kaji/sharibako.git",
    files: [
      "ho-process/hos/ho-04.6-plain-prompt-init.md",
      "ho-process/hos/ho-04.4-ingest-dashboard.md",
    ],
  },
};

function headSha(dir) {
  try {
    return execFileSync("git", ["-C", dir, "rev-parse", "HEAD"], {
      encoding: "utf8",
    }).trim();
  } catch {
    return "unknown";
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
    tmp = mkdtempSync(join(tmpdir(), `hospike-${name}-`));
    console.log(`[ingest] ${name}: no local clone — shallow-cloning ${src.ssh}`);
    execFileSync("git", ["clone", "--depth", "1", src.ssh, tmp], { stdio: "inherit" });
    base = tmp;
    via = "ssh-clone";
  }

  const sha = headSha(base);
  console.log(`[ingest] ${name}: ${via} @ ${sha.slice(0, 12)}`);

  for (const rel of src.files) {
    const from = join(base, rel);
    if (!existsSync(from)) throw new Error(`[ingest] missing ${name}/${rel}`);
    const to = join(VENDOR, name, rel);
    mkdirSync(dirname(to), { recursive: true });
    cpSync(from, to);
    console.log(`[ingest]   + ${name}/${rel}`);
  }

  manifest.sources[name] = { via, sha, files: src.files };
  if (tmp) rmSync(tmp, { recursive: true, force: true });
}

writeFileSync(join(VENDOR, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
console.log("[ingest] wrote vendor/manifest.json");
