// terms.js — the §13 term nodes: one page per glossary term at /glossary/<id>/, derived
// entirely from the real ingested glossary (see buildTermNodes). Paginated by glossary/node.njk.
import { buildTermNodes } from "../../lib/corpus.mjs";
import siteData from "./site.js";

export default function () {
  return buildTermNodes(siteData().github["ho-system"]);
}
