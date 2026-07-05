// glossary.js — the framework's real glossary, parsed into anchored entries (the full
// cuts) plus the plain cut per term. Powers the /glossary/ page; the plain cuts also feed
// definition-on-touch via meta.js.
import { parseGlossary } from "../../lib/corpus.mjs";
export default function () {
  return parseGlossary();
}
