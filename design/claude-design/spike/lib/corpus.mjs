// corpus.mjs — parse the real ingested artifacts into what the templates render.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import MarkdownIt from "markdown-it";
import { PLAIN_CUTS } from "./plain-cuts.mjs";

const VENDOR = fileURLToPath(new URL("../vendor/", import.meta.url));
const md = new MarkdownIt({ html: false, linkify: false, typographer: false });

export function slug(term) {
  return term
    .toLowerCase()
    .split("(")[0]
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// ─── glossary ───────────────────────────────────────────────────────────────
export function parseGlossary() {
  const raw = readFileSync(join(VENDOR, "ho-system/framework/glossary.md"), "utf8");
  const body = matter(raw).content;
  // entries look like: **term** — definition… (until the next **term** at line start)
  const entries = [];
  const re = /(^|\n)\*\*(.+?)\*\*\s+—\s+([\s\S]*?)(?=\n\*\*|\n---|\n*$)/g;
  let m;
  while ((m = re.exec(body))) {
    const term = m[2].trim();
    const def = m[3].trim();
    entries.push({ term, anchor: slug(term), html: md.renderInline(def) });
  }
  return entries;
}

// slug → { plain, fullHref, fullLabel } for the terms we can define plainly
export function plainCutIndex() {
  const idx = {};
  for (const [key, v] of Object.entries(PLAIN_CUTS)) {
    const s = slug(key);
    idx[s] = { plain: v.plain, fullHref: `/glossary/#${s}`, fullLabel: "full entry →" };
  }
  return idx;
}

// ─── ho documents ─────────────────────────────────────────────────────────────
export function loadDoc(rel) {
  const raw = readFileSync(join(VENDOR, rel), "utf8");
  const { data, content } = matter(raw);
  return { data, content, rawFrontOrder: frontmatterOrder(raw) };
}

// preserve authored frontmatter key order (gray-matter's object mostly does, but be sure)
function frontmatterOrder(raw) {
  const fm = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!fm) return [];
  return fm[1]
    .split("\n")
    .filter((l) => /^\S/.test(l) && l.includes(":"))
    .map((l) => l.split(":")[0].trim());
}

// mark the first occurrence of each term-of-art alias, once each, in text (not in tags)
const ALIASES = []; // [{re, key}] longest-first
for (const [key, v] of Object.entries(PLAIN_CUTS)) {
  const forms = v.aliases.length ? v.aliases : [key];
  for (const f of forms) {
    const bound = f === "ho" ? "\\bho\\b(?!-)" : `\\b${f.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`;
    ALIASES.push({ re: new RegExp(bound), key: slug(key), form: f, len: f.length });
  }
}
ALIASES.sort((a, b) => b.len - a.len);

function markTerms(html, used) {
  // split into tag / text segments; only touch text
  const parts = html.split(/(<[^>]+>)/);
  for (let i = 0; i < parts.length; i++) {
    if (parts[i].startsWith("<")) continue;
    for (const a of ALIASES) {
      if (used.has(a.key)) continue;
      const m = a.re.exec(parts[i]);
      if (m) {
        used.add(a.key);
        const btn =
          `<button type="button" class="term" data-term="${a.key}" aria-expanded="false">${m[0]}</button>`;
        parts[i] = parts[i].slice(0, m.index) + btn + parts[i].slice(m.index + m[0].length);
      }
    }
  }
  return parts.join("");
}

// classify a section heading into a register (Basis §5 register map)
function registerFor(heading) {
  const h = heading.toLowerCase();
  if (/^changes|^execute|^phase 2/.test(h)) return "procedural";
  if (/^results|^reflect|^phase 3/.test(h)) return "emergent";
  return "discursive"; // headings + prose, incl. Problem / Solution / Think
}

// split body on H2 (## ) into register-classified, rendered, term-marked sections
export function renderBody(content) {
  const used = new Set();
  // drop the leading H1 (rendered separately as the page title area)
  const noH1 = content.trimStart().replace(/^#\s+.*(\n|$)/, "");
  const chunks = noH1.split(/\n(?=##\s)/);
  const sections = [];
  for (const chunk of chunks) {
    const t = chunk.trim();
    if (!t) continue;
    const hm = t.match(/^##\s+(.*)/);
    const heading = hm ? hm[1].trim() : "";
    const register = heading ? registerFor(heading) : "discursive";
    const html = markTerms(md.render(t), used);
    sections.push({ register, html });
  }
  return { sections, markedTerms: [...used] };
}

// first paragraph after the H1 (for the supersession "fell/replaced" panes)
function introPara(content) {
  const afterH1 = content.trimStart().replace(/^#\s+.*\n+/, "");
  const para = afterH1.split(/\n\s*\n/)[0];
  return md.render(para);
}
// a named ## section's body (first paragraph), for the replaced pane
function sectionIntro(content, name) {
  const re = new RegExp(`##\\s+${name}[^\\n]*\\n+([\\s\\S]*?)(?=\\n##\\s|$)`, "i");
  const m = content.match(re);
  if (!m) return "";
  const para = m[1].trim().split(/\n\s*\n/)[0];
  return md.render(para);
}

export function supersessionPanes() {
  const fell = loadDoc("sharibako/ho-process/hos/ho-04.4-ingest-dashboard.md");
  const replaced = loadDoc("sharibako/ho-process/hos/ho-04.6-plain-prompt-init.md");
  return {
    fell: {
      title: "ho-04.4 — The ingest dashboard",
      status: "superseded",
      html: introPara(fell.content),
    },
    replaced: {
      title: "ho-04.6 — Plain-prompt init",
      status: "current",
      html: sectionIntro(replaced.content, "Solution"),
    },
  };
}
