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

// ─── glossary citation links (glossary page only) ─────────────────────────────────
// Each glossary entry ends with a quiet parenthetical citation — `_(ho-structure 2.3 §5.4;
// operating-discipline.)_` → the last <em>(…)</em> in the rendered definition. Here we
// linkify each cited *document* token that resolves to something the site renders (on-site
// page) or, failing that, to its GitHub source (§5's pattern). A trailing `§N.N` attaches a
// fragment when it maps to a real heading id (check-links validates these). Citation text is
// never altered — only the document token gains the §5 link affordance (solid bero@.70). This
// runs on the glossary page's copy of the html only; the term index (plain cuts) is untouched.
function readManifest() {
  try {
    return JSON.parse(readFileSync(join(VENDOR, "manifest.json"), "utf8"));
  } catch {
    return { sources: {} };
  }
}

// which ho-system repo paths the site renders as framework pages (mirrors src/_data/corpus.js).
function isFrameworkPage(rel) {
  return (
    /framework\/(the-ho-system|ho-foundations-evidence)\.md$/.test(rel) ||
    /framework\/structure\//.test(rel) ||
    /practitioner\/operating-discipline\.md$/.test(rel)
  );
}

// section number (as written in a citation, "5.4") → the rendered heading id. The heading id
// is headingSlug(full heading text) — computed exactly as the page renderer computes it — so a
// fragment we emit here always resolves to a real id on the target page.
function sectionHeadingMap(content) {
  const map = {};
  const re = /^#{2,6}\s+(.+)$/gm;
  let m;
  while ((m = re.exec(content))) {
    const text = m[1].trim();
    const num = text.match(/^(\d+(?:\.\d+)*)\b/);
    if (num && map[num[1]] == null) map[num[1]] = headingSlug(text);
  }
  return map;
}

function linkifyCitationHtml(html, resolve) {
  const open = html.lastIndexOf("<em>("); // the trailing citation, always the last such em
  if (open === -1) return html;
  const emStart = open + 4; // just past "<em>"
  const close = html.indexOf("</em>", emStart);
  if (close === -1) return html;
  const inner = html.slice(emStart, close);
  // process each semicolon-separated reference; parens are excluded so they pass through
  const linked = inner.replace(/[^;()]+/g, (seg) => {
    const m = seg.match(/[a-z][a-z0-9]*(?:-[a-z0-9]+)+(?:\.md)?/); // a hyphenated doc token
    if (!m) return seg;
    const sm = seg.match(/§\s*(\d+(?:\.\d+)*)/);
    const href = resolve(m[0], sm ? sm[1] : null);
    if (!href) return seg;
    return (
      seg.slice(0, m.index) +
      `<a class="chain-link" href="${href}">${m[0]}</a>` +
      seg.slice(m.index + m[0].length)
    );
  });
  return html.slice(0, emStart) + linked + html.slice(close);
}

export function glossaryCitationLinker(githubBase) {
  const manifest = readManifest();
  const files = manifest.sources?.["ho-system"]?.files || [];
  const registry = {};     // basename.md → /framework/<slug>/ (rendered pages)
  const sourcePath = {};   // basename.md → repo-relative path (GitHub-source fallback)
  const headingIndex = {}; // basename.md → { section → heading id }
  for (const rel of files) {
    if (!rel.endsWith(".md")) continue;
    const base = basename(rel);
    sourcePath[base] = rel;
    if (isFrameworkPage(rel)) {
      registry[base] = `/framework/${base.replace(/\.md$/, "")}/`;
      try {
        const content = matter(readFileSync(join(VENDOR, "ho-system", rel), "utf8")).content;
        headingIndex[base] = sectionHeadingMap(content);
      } catch {
        headingIndex[base] = {};
      }
    }
  }
  const resolve = (tok, section) => {
    const base = tok.endsWith(".md") ? tok : `${tok}.md`;
    if (registry[base]) {
      const frag = section && headingIndex[base]?.[section];
      return frag ? `${registry[base]}#${frag}` : registry[base];
    }
    if (sourcePath[base] && githubBase) return `${githubBase}/${sourcePath[base]}`;
    return null; // no rendered page and no source file — leave as plain citation text
  };
  return (html) => linkifyCitationHtml(html, resolve);
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

// mark the first occurrence of each term-of-art alias, once each, in prose text.
// Never inside a tag (attributes) and never inside an anchor's text — a <button> nested in
// an <a> is invalid, and a link's own words are already a destination, not a definition.
// Matches whole terms at word boundaries only (the alias regexes are \b-anchored) and, when
// terms nest, wraps the longest at each position first (shu-ha-ri wins over ri), then advances
// past what it wrapped — so it never re-enters text it has already turned into button markup.
function markTerms(html, used) {
  const { aliases } = termIndex();
  const parts = html.split(/(<[^>]+>)/);
  let anchorDepth = 0;
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    if (part.startsWith("<")) {
      if (/^<a[\s>]/i.test(part)) anchorDepth++;
      else if (/^<\/a>/i.test(part)) anchorDepth = Math.max(0, anchorDepth - 1);
      continue;
    }
    if (anchorDepth > 0) continue; // never mark inside a link
    parts[i] = markTextSegment(part, aliases, used);
  }
  return parts.join("");
}

// wrap term aliases in one tag-free text segment. Single left-to-right cursor: at each step
// pick the earliest still-unused alias match (longest wins on a tie), emit its button, and
// advance past it — so nested terms and already-wrapped markup are never re-scanned.
function markTextSegment(text, aliases, used) {
  let out = "";
  let pos = 0;
  while (pos < text.length) {
    let best = null; // { index, match, key }
    const rest = text.slice(pos);
    for (const a of aliases) {
      if (used.has(a.key)) continue;
      a.re.lastIndex = 0;
      const m = a.re.exec(rest);
      if (!m) continue;
      const index = pos + m.index;
      if (!best || index < best.index || (index === best.index && m[0].length > best.match.length)) {
        best = { index, match: m[0], key: a.key };
      }
    }
    if (!best) { out += text.slice(pos); break; }
    used.add(best.key);
    const btn = `<button type="button" class="term" data-term="${best.key}" aria-expanded="false">${best.match}</button>`;
    out += text.slice(pos, best.index) + btn;
    pos = best.index + best.match.length;
  }
  return out;
}

// ─── wikilink resolution (Obsidian [[target|Label]] → a real link) ──────────────────
// The corpus is authored in Obsidian: [[target]], [[target|Label]], [[target#frag|Label]],
// commonly trailed by a now-redundant (repo/path.md) parenthetical. Resolve this BEFORE
// md.render (so the term pass never sees raw wikilink syntax): a target the site renders as a
// page links on-site (registry by basename, then onSitePath by path); everything else links to
// its GitHub source (§5's pattern, used across the site). The trailing (path.md) is consumed.
// Operates on markdown source; the escaped table pipe (\|) is handled.
// A wikilink can close inside emphasis markers (**[[…]]** (path.md)); capture any run of
// trailing * or _ so it is preserved when the redundant parenthetical after it is stripped.
const WIKILINK_RE =
  /\[\[([^\]|#\\]+?)(?:#([^\]|]+?))?(?:\s*\\?\|\s*([^\]]+?))?\]\]((?:\*{1,3}|_{1,3}))?(?:\s*\(\s*([^()]+?\.md)\s*\))?/g;

export function resolveWikilinks(mdText, ctx = {}) {
  const { registry = {}, onSitePath = {}, sourcePathIndex = {}, githubBase = null } = ctx;
  return String(mdText).replace(WIKILINK_RE, (_full, target, frag, label, emph, parenPath) => {
    const t = target.trim();
    const base = `${t}.md`;
    const text = (label || t).trim();
    const path = parenPath ? parenPath.trim() : null;
    const tail = emph || "";

    // on-site: a page the site renders (by basename first, then the authored path)
    let href = registry[base] || (path && onSitePath[path]) || null;
    if (!href) {
      // GitHub source fallback: prefer the manifest's full repo path for this basename, then
      // the authored parenthetical path, then the bare basename as a last resort.
      const repoPath = sourcePathIndex[base] || path || base;
      href = githubBase ? `${githubBase}/${repoPath}` : null;
    }
    if (!href) return `${text}${tail}`; // unresolvable — degrade to the label, never leak [[…]]

    const fragment = frag ? `#${headingSlug(frag.trim())}` : "";
    return `[${text}](${href}${fragment})${tail}`;
  });
}

// build-time guard: rendered corpus HTML must carry no leaked wikilink brackets. Code spans
// are excluded — the corpus legitimately quotes control-byte sequences like `^[[B` in prose.
function assertNoWikilinks(html, where) {
  const stripped = String(html)
    .replace(/<code[^>]*>[\s\S]*?<\/code>/gi, "")
    .replace(/<pre[\s\S]*?<\/pre>/gi, "");
  const hit = stripped.match(/\[\[|\]\]/);
  if (hit) {
    const near = stripped.slice(Math.max(0, hit.index - 40), hit.index + 40).replace(/\s+/g, " ");
    throw new Error(`[corpus] unresolved wikilink in ${where}: …${near}…`);
  }
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
export function renderBody(content, linkCtx = {}) {
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
    // resolve wikilinks first (§5), then mark terms — ordering matters so the term pass
    // never sees raw [[…]] syntax and never wraps a term inside a resolved link.
    const html = markTerms(md.render(resolveWikilinks(t, linkCtx)), used);
    assertNoWikilinks(html, linkCtx.source || heading || "body");
    sections.push({ register, html });
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
export function renderDoc(rel, { registry = {}, onSitePath = {}, sourcePathIndex = {}, githubBase = null, titleFallback = "" } = {}) {
  const { data, content, rawFrontOrder } = loadDoc(rel);
  const { sections } = renderBody(content, { registry, onSitePath, sourcePathIndex, githubBase, source: rel });
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
  assertNoWikilinks(html, rel);
  return {
    title: plainTitle(content, "Index of Documents"),
    titleHtml: md.renderInline(docTitle(content, "Index of Documents")),
    html,
    frontmatter: data,
  };
}
