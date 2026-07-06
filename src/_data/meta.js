// meta.js — the JSON islands read by the vanilla JS: the plain-cut index (§7
// definition-on-touch) and the door set (§8 trail). Both come from single sources.
import { plainCutIndex } from "../../lib/corpus.mjs";
import siteData from "./site.js";

export default function () {
  const site = siteData();
  return {
    plainCuts: plainCutIndex(),
    // door ids + names + landing urls bound from ONE source (site.doors) — trail.js reads
    // only this. The url is what §12's navigating trail doors link to.
    doors: site.doors.map((d) => ({ id: d.id, name: d.name, url: d.url })),
  };
}
