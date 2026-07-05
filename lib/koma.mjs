// koma.mjs — the pentagon shōgi-piece silhouette, verbatim from Basis §1.
//
// One geometry, two inkings, chosen by rendered height (§1):
//   keyline form (≥24 px): stroke 0.040H sumi, fill washi, face char mincho 0.420H
//                          centered at (0.370H, 0.610H), dominant-baseline central.
//   solid form   (<24 px): no character, no keyline; sumi fill (front) / gold fill (promoted).
//
// Reference silhouette vertices (unit height H = 1, base width 0.740H, y down):
//   apex 0.370,0     right shoulder 0.660,0.220   right base 0.740,1
//   left base 0,1    left shoulder 0.080,0.220     (closed path, miter joins)

export const INK = {
  washi: "#eef1ef",
  sumi: "#1f2123",
  bero: "#29618e",
  gold: "#a9832a",
  kachi: "#040c13", // sumi × bero
  // opacity-ladder resolved flats on washi (§2)
  sumi40: "#9b9e9d",
  sumi12: "#d5d8d7",
  sumi70: "#5d5f60",
  bero40: "#9fb7c8",
  bero70: "#648cab",
  gold40: "#d2c5a0", // superseded
};

// Face glyphs (§1): front 歩 sumi, promoted と gold.
export const FACE = { front: "歩", promoted: "と" };

// Silhouette as a path at a given height h, top-left origin (ox, oy).
// Scale from the 100-unit reference so proportions are exact.
export function komaPath(ox, oy, h) {
  const s = h / 100;
  const p = (x, y) => `${(ox + x * s).toFixed(3)} ${(oy + y * s).toFixed(3)}`;
  return `M${p(37, 0)} L${p(66, 22)} L${p(74, 100)} L${p(0, 100)} L${p(8, 22)} Z`;
}

// Rendered koma as an SVG <g> string.
// mode: "keyline" (≥24 px) | "solid" (<24 px)
// face: "front" | "promoted"
// solidInk: override fill for solid form (state ink, e.g. gold@0.40 for superseded)
export function koma(ox, oy, h, { mode = "auto", face = "front", solidInk, tint } = {}) {
  const resolved = mode === "auto" ? (h >= 24 ? "keyline" : "solid") : mode;
  const path = komaPath(ox, oy, h);
  const w = 0.74 * h;

  if (resolved === "solid") {
    const fill = solidInk ?? tint ?? (face === "promoted" ? INK.gold : INK.sumi);
    return `<path d="${path}" fill="${fill}" stroke="none"/>`;
  }

  // keyline — tint (e.g. gold@0.40 for a superseded, pre-flipped node) overrides
  // both the keyline stroke and the face character; otherwise §1's inks apply.
  const stroke = (0.04 * h).toFixed(3);
  const strokeInk = tint ?? INK.sumi;
  const charFill = tint ?? (face === "promoted" ? INK.gold : INK.sumi);
  const fontSize = (0.42 * h).toFixed(3);
  const cx = (ox + 0.37 * h).toFixed(3);
  const cy = (oy + 0.61 * h).toFixed(3);
  return (
    `<path d="${path}" fill="${INK.washi}" stroke="${strokeInk}" stroke-width="${stroke}" stroke-linejoin="miter"/>` +
    `<text x="${cx}" y="${cy}" fill="${charFill}" font-size="${fontSize}" ` +
    `text-anchor="middle" dominant-baseline="central" ` +
    `font-family="'HoPiece','Hiragino Mincho ProN','Yu Mincho','Noto Serif JP',serif">${FACE[face]}</text>`
  );
  void w;
}
