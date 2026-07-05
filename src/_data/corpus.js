// corpus.js — the rendered corpus, read as `corpus` on every page. Enumerates the ingested
// documents, assigns each an on-site URL, builds the link registry (so builds-on/supersedes
// resolve to rendered pages), and renders each document into ledger + register-classified
// sections. The site renders the practitioner's corpus; it does not author it (spec §5.1).
import { basename } from "node:path";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import { renderDoc, docTitle, supersessionPanes } from "../../lib/corpus.mjs";
import siteData from "./site.js";

const VENDOR = fileURLToPath(new URL("../../vendor/", import.meta.url));

function manifestFiles(source) {
  try {
    const m = JSON.parse(readFileSync(new URL("../../vendor/manifest.json", import.meta.url), "utf8"));
    return (m.sources[source]?.files || []).map((f) => `${source}/${f}`);
  } catch {
    return [];
  }
}

const slugOf = (rel) => basename(rel).replace(/\.md$/, "");

// natural sort so ho-04.2 sorts after ho-04 and before ho-04.10
function natCompare(a, b) {
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });
}

export default function () {
  const site = siteData();

  // ── enumerate the documents we render as pages ────────────────────────────
  const sharibako = manifestFiles("sharibako");
  const hoSystem = manifestFiles("ho-system");

  const walkRels = sharibako
    .filter((r) => /\/kamae-|\/hos\//.test(r) && r.endsWith(".md"))
    .sort(natCompare);

  const frameworkRels = hoSystem
    .filter((r) =>
      /framework\/(the-ho-system|ho-foundations-evidence)\.md$/.test(r) ||
      /framework\/structure\//.test(r) ||
      /practitioner\/operating-discipline\.md$/.test(r))
    .sort(natCompare);

  const url = (section, rel) => `/${section}/${slugOf(rel)}/`;

  // ── registry: basename.md → on-site url (drives link resolution) ──────────
  const registry = {};
  for (const rel of walkRels) registry[basename(rel)] = url("walk", rel);
  for (const rel of frameworkRels) registry[basename(rel)] = url("framework", rel);

  // ── render each document ──────────────────────────────────────────────────
  const renderSet = (rels, section, source) =>
    rels.map((rel) => {
      const doc = renderDoc(rel, {
        registry,
        githubBase: site.github[source],
        titleFallback: slugOf(rel),
      });
      const repoRel = rel.replace(new RegExp(`^${source}/`), "");
      return {
        ...doc,
        slug: slugOf(rel),
        url: url(section, rel),
        section,
        sourceRepo: source,
        sourceUrl: `${site.github[source]}/${repoRel}`,
      };
    });

  const walkDocs = renderSet(walkRels, "walk", "sharibako");
  const frameworkDocs = renderSet(frameworkRels, "framework", "ho-system");

  // sort framework docs: foundation docs first, then structure by frontmatter id
  const rank = (d) => (/the-ho-system|ho-foundations|operating-discipline/.test(d.slug) ? 0 : 1);
  frameworkDocs.sort((a, b) => rank(a) - rank(b) || natCompare(String(a.frontmatter.id || ""), String(b.frontmatter.id || "")));

  // split walk display groups: the Kamae chain vs the hos
  const walkKamae = walkDocs.filter((d) => d.slug.startsWith("kamae-"));
  const walkHos = walkDocs.filter((d) => /ho-\d/.test(d.slug));

  // ── downloadable templates (spec §5.1 / §9) ───────────────────────────────
  const templates = hoSystem
    .filter((r) => /framework\/templates\/.+\.md$/.test(r))
    .sort(natCompare)
    .map((rel) => {
      const raw = readFileSync(new URL(`../../vendor/${rel}`, import.meta.url), "utf8");
      const { data, content } = matter(raw);
      return {
        file: basename(rel),
        title: data.title || docTitle(content, basename(rel)),
        href: `/downloads/templates/${basename(rel)}`,
        github: `${site.github["ho-system"]}/${rel.replace(/^ho-system\//, "")}`,
      };
    });

  // ── skills catalog (one page, per-skill anatomy §4; transcripts deferred to v2) ─
  const skillOverviewRel = "ho-system/skills/ho-skill-overview.md";
  const skillOverview = hoSystem.includes(skillOverviewRel)
    ? (() => {
        const raw = readFileSync(new URL(`../../vendor/${skillOverviewRel}`, import.meta.url), "utf8");
        return docTitle(matter(raw).content, "Ho System Skills");
      })()
    : "Ho System Skills";

  const skills = hoSystem
    .filter((r) => /skills\/[^/]+\/SKILL\.md$/.test(r))
    .sort(natCompare)
    .map((rel) => {
      const raw = readFileSync(new URL(`../../vendor/${rel}`, import.meta.url), "utf8");
      const { data } = matter(raw);
      const dir = rel.split("/").slice(-2, -1)[0];
      // condense the (long) description to its first sentence for the card lede
      const desc = String(data.description || "").replace(/\s+/g, " ").trim();
      const lede = (desc.match(/^.*?[.!?](?=\s|$)/) || [desc])[0];
      return {
        id: dir,
        name: data.name || dir,
        lede,
        description: desc,
        github: `${site.github["ho-system"]}/skills/${dir}/SKILL.md`,
      };
    });

  // ── live arc tree (§6 live instance / §9 firing list): real sharibako ho-04 arc ─
  const arc = [
    { id: "sharibako/ho-04.2", label: "04.2", state: "closed", title: "interactive init", url: registry["ho-04.2-interactive-init.md"] || "/walk/" },
    { id: "sharibako/ho-04.4", label: "04.4", state: "superseded", title: "ingest dashboard", url: registry["ho-04.4-ingest-dashboard.md"] || "/walk/" },
    { id: "sharibako/ho-04.6", label: "04.6", state: "closed", title: "plain-prompt init", url: registry["ho-04.6-plain-prompt-init.md"] || "/walk/" },
  ];

  return {
    walkDocs, walkKamae, walkHos,
    frameworkDocs,
    templates,
    skills, skillOverview,
    arc,
    registry,
    showcase: registry["ho-04.6-plain-prompt-init.md"],
    supersession: supersessionPanes(),
  };
}
