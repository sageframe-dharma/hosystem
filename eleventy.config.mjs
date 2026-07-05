import { chainSvg } from "./lib/chain.mjs";
import { koma } from "./lib/koma.mjs";

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
  eleventyConfig.addShortcode("chainSvg", (scale = "full") => chainSvg(scale));

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
