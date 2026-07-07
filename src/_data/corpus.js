// corpus.js — the rendered corpus, read as `corpus` on every page. Enumerates the ingested
// documents, assigns each an on-site URL, builds the link registry (so builds-on/supersedes
// resolve to rendered pages), and renders each document into ledger + register-classified
// sections. The site renders the practitioner's corpus; it does not author it (spec §5.1).
import { basename } from "node:path";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import { renderDoc, docTitle, supersessionPanes, renderIndex } from "../../lib/corpus.mjs";
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

  // ── §12 breadcrumb: door / collection / record — always short ids, never titles.
  // The record id: walk docs reduce to their leading ho-/kamae- number (ho-04.6);
  // framework docs already are short ids (ho-structure). The collection: walk docs use
  // the project (sharibako); framework docs use the first subfolder under framework/
  // (structure, templates…) or the leading non-framework area (practitioner). Ancestors
  // (door + collection) link to the nearest existing landing — the door page; the current
  // segment carries no link. Door landings and home carry no crumb (rendered as tops).
  const recordId = (section, s) => {
    if (section === "walk") {
      const m = s.match(/^(ho-[\d.]+|kamae-[\d.]+)/i);
      return m ? m[1] : s;
    }
    return s;
  };
  const crumbFor = (rel, section, source) => {
    const doorUrl = `/${section}/`;
    const rid = recordId(section, slugOf(rel));
    if (section === "walk") {
      return [
        { id: "walk", href: doorUrl },
        { id: source, href: doorUrl }, // the project — sharibako
        { id: rid, current: true },
      ];
    }
    // framework: dirs between source and file; drop a leading "framework" (== the door)
    const dirs = rel.replace(new RegExp(`^${source}/`), "").split("/").slice(0, -1);
    const rest = dirs[0] === "framework" ? dirs.slice(1) : dirs;
    const out = [{ id: "framework", href: doorUrl }];
    if (rest.length) out.push({ id: rest[0], href: doorUrl });
    out.push({ id: rid, current: true });
    return out;
  };

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
        crumb: crumbFor(rel, section, source),
      };
    });

  const walkDocs = renderSet(walkRels, "walk", "sharibako");
  const frameworkDocs = renderSet(frameworkRels, "framework", "ho-system");

  // ── on-site page map (repo-relative path → rendered url) for faithful link rewriting ─
  // Drives the documents index: an INDEX.md entry the site renders as a page points on-site;
  // everything else falls back to GitHub source (§5). glossary + the index self-link are the
  // two rendered pages that live outside frameworkRels.
  const INDEX_URL = "/framework/documents/";
  const onSitePath = {};
  for (const rel of frameworkRels) onSitePath[rel.replace(/^ho-system\//, "")] = url("framework", rel);
  onSitePath["framework/glossary.md"] = "/glossary/";
  onSitePath["INDEX.md"] = INDEX_URL;

  // ── chain node destinations (§12): each thinking node lands in kamae-project-framing's
  // own section for that layer (§2.1–2.4); the doing node lands on ho-structure (already
  // right). Fragments are the headingSlug of §2.N — verified by check-links against the
  // rendered ids. Five distinct destinations. ──────────────────────────────────────────
  const framingUrl = onSitePath["framework/structure/kamae-project-framing.md"];
  const structureUrl = onSitePath["framework/structure/ho-structure.md"];
  const chainLinks = [
    `${framingUrl}#21-the-project-seed`,   // Seed
    `${framingUrl}#22-system-design`,      // System Design
    `${framingUrl}#23-readme`,             // README
    `${framingUrl}#24-ho-overview`,        // Ho Overview
    structureUrl,                          // Per-Ho Documents → ho-structure
  ];

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

  // each skill's foundational rendered doc (§5 affordance); the kamae-N collaborators point
  // at the layer they operationalize (same targets as the chain nodes). A skill with no
  // clean foundational page (index-maintenance is repo mechanics, not a framework concept)
  // is left source-only — not forced.
  const skillGround = {
    "ho-kamae-1-seed-collaborator": { href: `${framingUrl}#21-the-project-seed`, label: "Kamae: Project Framing §2.1" },
    "ho-kamae-2-system-design-collaborator": { href: `${framingUrl}#22-system-design`, label: "Kamae: Project Framing §2.2" },
    "ho-kamae-3-readme-collaborator": { href: `${framingUrl}#23-readme`, label: "Kamae: Project Framing §2.3" },
    "ho-kamae-4-overview-collaborator": { href: `${framingUrl}#24-ho-overview`, label: "Kamae: Project Framing §2.4" },
    "ho-kamae-5-authoring-collaborator": { href: structureUrl, label: "Ho Structure" },
    "ho-setup-personal-environment-collaborator": { href: onSitePath["practitioner/operating-discipline.md"], label: "The Operating Discipline" },
    "ho-setup-project-environment-collaborator": { href: onSitePath["framework/structure/verification-practices.md"], label: "Verification Practices" },
  };

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
        ground: skillGround[dir] || null,
        github: `${site.github["ho-system"]}/skills/${dir}/SKILL.md`,
      };
    });

  // ── live arc tree (§6 live instance / §9 firing list): real sharibako ho-04 arc ─
  const arc = [
    { id: "sharibako/ho-04.2", label: "04.2", state: "closed", title: "interactive init", url: registry["ho-04.2-interactive-init.md"] || "/walk/" },
    { id: "sharibako/ho-04.4", label: "04.4", state: "superseded", title: "ingest dashboard", url: registry["ho-04.4-ingest-dashboard.md"] || "/walk/" },
    { id: "sharibako/ho-04.6", label: "04.6", state: "closed", title: "plain-prompt init", url: registry["ho-04.6-plain-prompt-init.md"] || "/walk/" },
  ];

  // ── the documents index page (§5 faithful render of INDEX.md; §12 crumb) ──────────
  const indexRel = "ho-system/INDEX.md";
  const documentsIndex = hoSystem.includes(indexRel)
    ? {
        url: INDEX_URL,
        ...renderIndex(indexRel, { onSitePath, githubBase: site.github["ho-system"] }),
        crumb: [{ id: "framework", href: "/framework/" }, { id: "documents", current: true }],
        sourceUrl: `${site.github["ho-system"]}/INDEX.md`,
      }
    : null;

  return {
    walkDocs, walkKamae, walkHos,
    frameworkDocs,
    templates,
    skills, skillOverview,
    chainLinks,
    documentsIndex,
    arc,
    registry,
    showcase: registry["ho-04.6-plain-prompt-init.md"],
    supersession: supersessionPanes(),
  };
}
