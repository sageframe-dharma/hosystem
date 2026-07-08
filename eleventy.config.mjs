import { chainSvg } from "./lib/chain.mjs";
import { koma } from "./lib/koma.mjs";
import { plainCutIndex, slug } from "./lib/corpus.mjs";

// Stage-tag words whose glossary entry is keyed under a fuller name. "orientation" (a shape
// value) is defined by the glossary's "orientation ho" entry — there is no standalone
// "orientation" entry — so touching it should rescue the reader with that definition.
const TERM_ALIAS = { orientation: "orientation-ho" };

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/css": "css" });
  eleventyConfig.addPassthroughCopy({ "src/js": "js" });
  eleventyConfig.addPassthroughCopy({ "src/fonts": "fonts" });
  eleventyConfig.addPassthroughCopy({ "src/favicon.svg": "favicon.svg" });

  // Downloadable framework templates are served as raw .md (spec §5.1 / §9).
  eleventyConfig.addPassthroughCopy({ "vendor/ho-system/framework/templates": "downloads/templates" });

  // The 歩 hanko — the identity anchor (§3.1), served un-restyled from the corpus.
  eleventyConfig.addPassthroughCopy({ "vendor/ho-system/ho-hanko.png": "ho-hanko.png" });

  // The canonical Kamae chain, generated at build time from one source (§6).
  // `links` (optional) makes each node a door to the framework document that defines
  // that layer — full scale only; §6 geometry/inks are untouched.
  eleventyConfig.addShortcode("chainSvg", (scale = "full", links = []) => chainSvg(scale, links));

  // Mark a term-of-art in site-authored chrome (Basis §7 definition-on-touch). Emits the same
  // `.term` button the corpus term pass emits, so defotouch.js wires it up identically — but
  // only when the glossary actually carries the term (has a plain cut). No entry → plain text,
  // never a dead button. `key` overrides the derived slug when the word's entry is keyed
  // differently (e.g. a stage tag → its "… ho" entry). Report unmarked words at the call site.
  eleventyConfig.addShortcode("term", (text, key) => {
    const label = String(text);
    const k = key || TERM_ALIAS[label.toLowerCase()] || slug(label);
    if (k && plainCutIndex()[k]) {
      return `<button type="button" class="term" data-term="${k}" aria-expanded="false">${label}</button>`;
    }
    return label;
  });

  // A single koma as an inline SVG (live arc trees, the flip, state marks).
  // face: front|promoted · mode: keyline|solid|auto · tint overrides state ink.
  eleventyConfig.addShortcode("koma", (h, opts = {}) => {
    const w = 0.74 * h;
    return (
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w.toFixed(2)} ${h}" ` +
      `width="${w.toFixed(2)}" height="${h}" class="koma" aria-hidden="true">` +
      koma(0, 0, h, opts) +
      `</svg>`
    );
  });

  return {
    dir: { input: "src", output: "_site", includes: "_includes", data: "_data" },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
}
