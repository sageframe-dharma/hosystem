// meta.js — plain-cut index (for definition-on-touch JS), ingest manifest, and the
// live arc-tree source (Basis §6 live instances / §9 flip firing list).
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { plainCutIndex } from "../../lib/corpus.mjs";

export default function () {
  let manifest = { sources: {} };
  try {
    manifest = JSON.parse(
      readFileSync(fileURLToPath(new URL("../../vendor/manifest.json", import.meta.url)), "utf8")
    );
  } catch {
    /* vendor not ingested yet */
  }

  // Live arc tree: real sharibako ho-04 arc nodes. State drives the flip (§9):
  // closed → promotes to gold と on the news rule; superseded → renders pre-flipped
  // at gold@0.40, never fires. record-id keys the witness log.
  const arc = [
    { id: "sharibako/ho-04.2", label: "04.2", state: "closed", title: "interactive init" },
    { id: "sharibako/ho-04.4", label: "04.4", state: "superseded", title: "ingest dashboard" },
    { id: "sharibako/ho-04.6", label: "04.6", state: "closed", title: "plain-prompt init" },
  ];

  // Door names bound from ONE source (Basis §8: "names bind at build"). Both the trail
  // and any nav read these; nothing else defines door names. (Coherence seam check 3.)
  const doors = [
    { id: "framework", name: "Framework" },
    { id: "practice", name: "Practice" },
    { id: "skills", name: "Skills" },
    { id: "writing", name: "Writing" },
    { id: "walk", name: "Walk" },
    { id: "colophon", name: "Colophon" },
  ];

  return { plainCuts: plainCutIndex(), manifest, arc, doors };
}
