// check-links.mjs — verify every internal link and asset reference in the built site
// resolves to a real file in _site/. Fails (exit 1) if any does not. External links
// (http/https/mailto) and pure #fragments are out of scope.
import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const SITE = fileURLToPath(new URL("../_site/", import.meta.url));

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

// map a site-absolute URL path to the file that should serve it
function resolveTarget(urlPath) {
  let p = urlPath.split("#")[0].split("?")[0];
  if (!p) return null;
  if (p.endsWith("/")) return join(SITE, p, "index.html");
  const asFile = join(SITE, p);
  if (existsSync(asFile) && statSync(asFile).isFile()) return asFile;
  // extensionless pretty URL without trailing slash
  return join(SITE, p, "index.html");
}

const htmlFiles = walk(SITE).filter((f) => f.endsWith(".html"));
const problems = [];
let checked = 0;

// collect anchor ids per html file for fragment checks
const idCache = new Map();
function idsFor(file) {
  if (idCache.has(file)) return idCache.get(file);
  const html = readFileSync(file, "utf8");
  const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]));
  idCache.set(file, ids);
  return ids;
}

for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8");
  const refs = [...html.matchAll(/(?:href|src)="([^"]+)"/g)].map((m) => m[1]);
  for (const ref of refs) {
    if (/^(https?:|mailto:|tel:|data:|\/\/)/.test(ref)) continue; // external
    if (ref.startsWith("#")) {
      // same-page fragment
      const id = ref.slice(1);
      if (id && !idsFor(file).has(id)) problems.push(`${rel(file)} → ${ref} (missing #id)`);
      continue;
    }
    if (!ref.startsWith("/")) continue; // relative assets — none expected; skip
    checked++;
    const target = resolveTarget(ref);
    if (!target || !existsSync(target)) {
      problems.push(`${rel(file)} → ${ref} (no file: ${target ? rel(target) : "?"})`);
      continue;
    }
    // fragment into another page
    const hash = ref.includes("#") ? ref.split("#")[1] : null;
    if (hash && target.endsWith(".html") && !idsFor(target).has(hash)) {
      problems.push(`${rel(file)} → ${ref} (missing #${hash} in target)`);
    }
  }
}

function rel(f) { return f.replace(SITE, ""); }

if (problems.length) {
  console.error(`[check-links] ${problems.length} broken link(s) across ${htmlFiles.length} pages:`);
  for (const p of problems) console.error("  ✗ " + p);
  process.exit(1);
}
console.log(`[check-links] OK — ${checked} internal links across ${htmlFiles.length} pages all resolve.`);
