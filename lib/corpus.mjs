// corpus.mjs — parse the real ingested artifacts into what the templates render.
//
// Definition-on-touch (§4/§7) now reads the framework's REAL plain cuts: each glossary
// entry ends with a `_Plain:_` line (the one-sentence hover cut). The spike's stand-in
// plain-cuts.mjs is retired — the source of truth is the corpus, ingested at build.

import { readFileSync } from "node:fs";
import { basename, join } from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import MarkdownIt from "markdown-it";

const VENDOR = fileURLToPath(new URL("../vendor/", import.meta.url));
const md = new MarkdownIt({ html: false, linkify: false, typographer: false });

// GitHub-style heading slug: lowercase, drop punctuation, spaces → hyphens. Drives the
// #fragment targets that the chain nodes (§12) and skill ground-links point into.
export function headingSlug(text) {
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/[`*_]/g, "")     // strip markdown emphasis markers
    .replace(/[^\w\s-]/g, "")  // drop remaining punctuation (keeps word chars, spaces, hyphens)
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Give every rendered heading a stable id so deep links (#fragment) resolve. Runs before
// markTerms, so the id is computed from the clean heading text, never a term button.
// Dedupe is per-render (env is fresh per md.render call); intra-doc collisions get -N.
md.renderer.rules.heading_open = function (tokens, idx, options, env, self) {
  const inline = tokens[idx + 1];
  const text = inline && inline.type === "inline" ? inline.content : "";
  let id = headingSlug(text);
  if (id) {
    env.slugs ??= {};
    if (env.slugs[id] != null) id = `${id}-${++env.slugs[id]}`;
    else env.slugs[id] = 0;
    tokens[idx].attrSet("id", id);
  }
  return self.renderToken(tokens, idx, options);
};

export function slug(term) {
  return String(term)
    .toLowerCase()
    .split("(")[0]
    .split("/")[0]
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// ─── glossary ─────────────────────────────────────────────────────────────────
// Each entry: **term** — full definition… then a trailing `_Plain: one sentence._`
export function parseGlossary() {
  const raw = readFileSync(join(VENDOR, "ho-system/framework/glossary.md"), "utf8");
  const body = matter(raw).content;
  const entries = [];
  // boundary = the next entry HEADER (bold followed by an em dash), not any line-starting
  // bold — some definitions begin with an inline **bold** word (e.g. forward-only).
  const re = /(^|\n)\*\*(.+?)\*\*\s+—\s+([\s\S]*?)(?=\n\*\*[^*\n]+?\*\*\s+—|\n---|\s*$)/g;
  let m;
  while ((m = re.exec(body))) {
    const term = m[2].trim();
    let def = m[3].trim();
    // split the trailing _Plain:_ line off the full cut
    let plain = "";
    const pm = def.match(/\n?_Plain:\s*([\s\S]+?)_\s*$/);
    if (pm) {
      plain = pm[1].trim();
      def = def.slice(0, pm.index).trim();
    }
    entries.push({ term, anchor: slug(term), html: md.renderInline(def), plain });
  }
  return entries;
}

// ─── term index (aliases → plain cut) driven by the real glossary ───────────────
// Conservative: mark the primary Latin form of each entry (and each " / " segment) plus a
// short Latin abbreviation in parens. No auto-inflection — marks are faithful, never mis-fired.
export function buildTermIndex() {
  const entries = parseGlossary();
  const plainCuts = {}; // slug → { plain, fullHref, fullLabel }
  const aliases = [];   // [{ re, key, len }]  longest-first, matched once each

  const addAlias = (form, key) => {
    const f = form.trim();
    if (!f || f.length < 2) return;
    if (/[^\x00-\x7f]/.test(f)) return; // Latin only — CJK marks are the piece, not prose
    const bound = f === "ho"
      ? "\\bho\\b(?!-)"
      : `\\b${f.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`;
    aliases.push({ re: new RegExp(bound), key, form: f, len: f.length });
  };

  for (const e of entries) {
    if (!e.plain) continue; // only terms with a real plain cut are touchable
    const key = e.anchor;
    plainCuts[key] = { plain: e.plain, fullHref: `/glossary/#${key}`, fullLabel: "full entry →" };
    // parenthetical abbreviation, if Latin & short (e.g. "agent task (AT)" → "AT")
    const paren = e.term.match(/\(([^)]+)\)/);
    if (paren && /^[A-Za-z][A-Za-z .-]{0,5}$/.test(paren[1].trim())) addAlias(paren[1].trim(), key);
    // primary form and each slash-segment, parenthetical stripped
    const bare = e.term.replace(/\([^)]*\)/g, "").trim();
    for (const seg of bare.split("/")) addAlias(seg, key);
  }
  aliases.sort((a, b) => b.len - a.len);
  return { plainCuts, aliases };
}

// cached — one glossary parse per build
let _termIndex = null;
export function termIndex() {
  return (_termIndex ??= buildTermIndex());
}
export function plainCutIndex() {
  return termIndex().plainCuts;
}

// ─── documents ──────────────────────────────────────────────────────────────────
export function loadDoc(rel) {
  const raw = readFileSync(join(VENDOR, rel), "utf8");
  const { data, content } = matter(raw);
  return { data, content, rawFrontOrder: frontmatterOrder(raw) };
}

// preserve authored frontmatter key order (top-level keys only)
function frontmatterOrder(raw) {
  const fm = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!fm) return [];
  return fm[1]
    .split("\n")
    .filter((l) => /^\S/.test(l) && l.includes(":"))
    .map((l) => l.split(":")[0].trim());
}

// mark the first occurrence of each term-of-art alias, once each, in text (never in tags)
function markTerms(html, used) {
  const { aliases } = termIndex();
  const parts = html.split(/(<[^>]+>)/);
  for (let i = 0; i < parts.length; i++) {
    if (parts[i].startsWith("<")) continue;
    for (const a of aliases) {
      if (used.has(a.key)) continue;
      const m = a.re.exec(parts[i]);
      if (m) {
        used.add(a.key);
        const btn = `<button type="button" class="term" data-term="${a.key}" aria-expanded="false">${m[0]}</button>`;
        parts[i] = parts[i].slice(0, m.index) + btn + parts[i].slice(m.index + m[0].length);
      }
    }
  }
  return parts.join("");
}

// classify a section heading into a register (Basis §5 register map).
// §5 names ha-shape phases; the spike (friction #4) maps ri sections cleanly:
// Changes/Execute → procedural, Results/Reflect → emergent, else discursive.
function registerFor(heading) {
  const h = heading.toLowerCase();
  if (/^(changes|execute|phase 2|implementation)/.test(h)) return "procedural";
  if (/^(results|reflect|phase 3|retrospective)/.test(h)) return "emergent";
  return "discursive";
}

// split body on H2 into register-classified, rendered, term-marked sections.
// drops the leading H1 (rendered separately as the page title area).
export function renderBody(content) {
  const used = new Set();
  const noH1 = content.trimStart().replace(/^#\s+.*(\n|$)/, "");
  const chunks = noH1.split(/\n(?=##\s)/);
  const sections = [];
  for (const chunk of chunks) {
    const t = chunk.trim();
    if (!t) continue;
    const hm = t.match(/^##\s+(.*)/);
    const heading = hm ? hm[1].trim() : "";
    const register = heading ? registerFor(heading) : "discursive";
    sections.push({ register, html: markTerms(md.render(t), used) });
  }
  return { sections, markedTerms: [...used] };
}

// render a whole doc body without dropping the H1 or splitting registers (glossary,
// downloadable-template previews, simple prose blocks). Terms still marked.
export function renderProse(content) {
  const used = new Set();
  return markTerms(md.render(content), used);
}

// ─── link resolution: builds-on / supersedes → on-site page when we render it ─────
// registry is provided by the caller (src/_data) as { basename → url }.
export function resolveLink(value, registry, githubBase) {
  // value can be a path, a bare filename, or prose like "ho-04.4 (…) — its surface"
  const fileMatch = String(value).match(/[\w./-]+\.md/);
  const key = fileMatch ? basename(fileMatch[0]) : null;
  if (key && registry[key]) return { href: registry[key], onSite: true };
  // a bare "ho-04.4" style reference
  const hoMatch = String(value).match(/ho-[\d.]+/);
  if (hoMatch && registry[`${hoMatch[0]}.md`]) return { href: registry[`${hoMatch[0]}.md`], onSite: true };
  if (key && githubBase) return { href: `${githubBase}/${key}`, onSite: false };
  return { href: null, onSite: false };
}

// first H1 in a document (raw markdown), for the page title
export function docTitle(content, fallback) {
  const m = content.match(/^#\s+(.+)$/m);
  return m ? m[1].trim() : fallback;
}
// plain-text form (inline markdown markers stripped) for <title> and nav
export function plainTitle(content, fallback) {
  return docTitle(content, fallback).replace(/[`*_]/g, "").trim();
}

// map a document status value to a §2 state-map state
export function statusState(value) {
  const v = String(value || "").toLowerCase();
  if (/superseded/.test(v)) return "superseded";
  if (/(complete|closed|done|landed|sealed)/.test(v)) return "closed";
  if (/(open|current|active|living|stable)/.test(v)) return "current";
  return "open";
}

// Fully render one ingested document into the structure the doc template consumes:
// { title, source, rows (ledger, links resolved), sections (register-classified) }.
// registry: { basename.md → on-site url } · githubBase: blob base for unresolved links.
export function renderDoc(rel, { registry = {}, githubBase = null, titleFallback = "" } = {}) {
  const { data, content, rawFrontOrder } = loadDoc(rel);
  const { sections } = renderBody(content);
  const norm = (v) =>
    v instanceof Date ? v.toISOString().slice(0, 10) : Array.isArray(v) ? v : String(v);

  const rows = rawFrontOrder.map((key) => {
    const value = norm(data[key]);
    const row = { key, value };
    if (key === "status") row.state = statusState(value);
    if ((key === "builds-on" || key === "supersedes") && Array.isArray(value)) {
      row.links = value.map((item) => ({ text: item, ...resolveLink(item, registry, githubBase) }));
    }
    return row;
  });

  return {
    source: rel,
    title: plainTitle(content, titleFallback),
    titleHtml: md.renderInline(docTitle(content, titleFallback)),
    frontmatter: data,
    rows,
    sections,
  };
}

// ─── supersession showcase (The Walk / spike parity): ho-04.6 supersedes ho-04.4 ─
function introPara(content) {
  const afterH1 = content.trimStart().replace(/^#\s+.*\n+/, "");
  const para = afterH1.split(/\n\s*\n/)[0];
  return md.render(para);
}
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
    fell: { title: "ho-04.4 — The ingest dashboard", status: "superseded", html: introPara(fell.content) },
    replaced: { title: "ho-04.6 — Plain-prompt init", status: "current", html: sectionIntro(replaced.content, "Solution") },
  };
}

// ─── the documents index (ho-system/INDEX.md, rendered faithfully) ────────────────
// The corpus's own master index, rendered at reader altitude: its structure and ordering
// are kept verbatim; only its repo-relative links are rewritten. A link whose target the
// site renders as a page points on-site; every other link falls back to its GitHub source
// (§5's pattern, already used across the site). No term-marking — this is a nav map, not
// prose. onSitePath: { repo-relative path → on-site url }.
export function renderIndex(rel, { onSitePath = {}, githubBase = null } = {}) {
  const { data, content } = loadDoc(rel);
  const body = content.trimStart().replace(/^#\s+.*(\n|$)/, ""); // drop H1 (page renders it)
  let html = md.render(body);
  html = html.replace(/href="([^"]+)"/g, (m, href) => {
    if (/^(https?:|mailto:|tel:|data:|#|\/\/|\/)/.test(href)) return m; // external / already-absolute
    const hashAt = href.indexOf("#");
    const path = (hashAt === -1 ? href : href.slice(0, hashAt)).replace(/^\.\//, "");
    const frag = hashAt === -1 ? "" : href.slice(hashAt);
    const target = onSitePath[path] || (githubBase ? `${githubBase}/${path}` : path);
    return `href="${target}${frag}"`;
  });
  return {
    title: plainTitle(content, "Index of Documents"),
    titleHtml: md.renderInline(docTitle(content, "Index of Documents")),
    html,
    frontmatter: data,
  };
}
