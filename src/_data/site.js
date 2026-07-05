// site.js — global site config, read on every page as `site`.
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

function manifest() {
  try {
    return JSON.parse(readFileSync(fileURLToPath(new URL("../../vendor/manifest.json", import.meta.url)), "utf8"));
  } catch {
    return { sources: {} };
  }
}

export default function () {
  return {
    title: "hosystem",
    tagline: "The public site of the Ho System — a walk through the practice's real artifacts.",
    domain: "hosystem.sageframe.net",
    github: {
      "ho-system": "https://github.com/sageframe-no-kaji/ho-system/blob/main",
      sharibako: "https://github.com/sageframe-no-kaji/sharibako/blob/main",
    },
    manifest: manifest(),

    // The six doors — the FROZEN set (Basis §8: names bind at build; the spike bound
    // exactly these). Order is the trail's door row, left→right. This is the persistent nav.
    // (Spec §5 also names Practicing/Engagements as doors; the basis froze this six — the
    // basis wins. Engagements ships as a page, reached from the front page's client path.)
    doors: [
      { id: "framework", name: "Framework", url: "/framework/" },
      { id: "practice", name: "Practice", url: "/practice/" },
      { id: "skills", name: "Skills", url: "/skills/" },
      { id: "writing", name: "Writing", url: "/writing/" },
      { id: "walk", name: "Walk", url: "/walk/" },
      { id: "colophon", name: "Colophon", url: "/colophon/" },
    ],
  };
}
