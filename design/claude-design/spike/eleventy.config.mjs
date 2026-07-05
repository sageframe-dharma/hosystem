import { chainSvg } from "./lib/chain.mjs";
import { koma } from "./lib/koma.mjs";

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/css": "css" });
  eleventyConfig.addPassthroughCopy({ "src/js": "js" });
  eleventyConfig.addPassthroughCopy({ "src/fonts": "fonts" });
  eleventyConfig.addPassthroughCopy({ "src/favicon.svg": "favicon.svg" });

  // The canonical Kamae chain, generated at build time from one source (§6).
  eleventyConfig.addShortcode("chainSvg", (scale = "full") => chainSvg(scale));

  // A single koma as an inline SVG (used for the live arc tree / flip demo).
  // face: front|promoted · mode: keyline|solid · solidInk override for state ink.
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
