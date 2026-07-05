// doc.js — the primary rendered ho document: sharibako ho-04.6 (real ingested artifact).
// Frontmatter → typed ledger; body → register-classified sections; supersedes → live
// reveal of what fell (ho-04.4) beside what replaced it (ho-04.6).
import { loadDoc, renderBody, supersessionPanes } from "../../lib/corpus.mjs";

export default function () {
  const rel = "sharibako/ho-process/hos/ho-04.6-plain-prompt-init.md";
  const { data, content, rawFrontOrder } = loadDoc(rel);
  const { sections } = renderBody(content);

  // ordered frontmatter rows for the ledger (authored order preserved).
  // Coerce YAML dates to YYYY-MM-DD; keep arrays as arrays; else stringify.
  const norm = (v) =>
    v instanceof Date ? v.toISOString().slice(0, 10) : Array.isArray(v) ? v : String(v);
  const rows = rawFrontOrder.map((key) => ({ key, value: norm(data[key]) }));

  return {
    source: "sharibako/ho-process/hos/ho-04.6-plain-prompt-init.md",
    title: "ho-04.6 — Plain-prompt init",
    frontmatter: data,
    rows,
    sections,
    supersession: supersessionPanes(),
  };
}
