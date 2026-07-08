// glossary.js — the framework's real glossary, parsed into anchored entries (the full
// cuts) plus the plain cut per term. Powers the /glossary/ page; the plain cuts also feed
// definition-on-touch via meta.js.
//
// On the glossary page only, each entry's trailing citation is linkified: a cited document
// that the site renders links on-site, everything else links to its GitHub source (§5). The
// plain cuts (term index) are built from a separate parse and stay untouched.
import { parseGlossary, glossaryCitationLinker } from "../../lib/corpus.mjs";
import siteData from "./site.js";
export default function () {
  const link = glossaryCitationLinker(siteData().github["ho-system"]);
  return parseGlossary().map((e) => ({ ...e, html: link(e.html) }));
}
