// glossary.js — the framework's real glossary, parsed into anchored entries (full cuts).
import { parseGlossary } from "../../lib/corpus.mjs";
export default function () {
  return parseGlossary();
}
