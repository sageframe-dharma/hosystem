// chain.mjs — the canonical Kamae chain, GENERATED AT BUILD TIME from one source,
// emitted at all three scales by reduction (Basis §6). One node/edge model below drives
// full / header / glyph. Gold never appears here — the chain is structure, not state (§6).

import { INK, koma } from "./koma.mjs";

// ─── the one source ─────────────────────────────────────────────────────────
const NODES = [
  { title: "Seed", label: "opinions", tier: "thinking" },
  { title: "System Design", label: "decisions", tier: "thinking" },
  { title: "README", label: "scope", tier: "thinking" },
  { title: "Ho Overview", label: "sequence", tier: "thinking" },
  { title: "Per-Ho Documents", label: "session", tier: "doing" },
  // K6 — the State Memory. K5 commits a session; K6 records the build across sessions.
  // Its label is "record", not a commitment (K6 commits nothing). Both K5 and K6 are
  // action-time (doing tier). Ink is INTERIM sumi (matched to K5) pending the design
  // session on K6's ink and geometry — see design/claude-design/prompts/session-15-*.
  { title: "State Memory", label: "record", tier: "doing" },
];
// returns: source index → target index, label, drawn on a left lane
const RETURNS = [
  { from: 1, to: 0, label: "revises", lane: 40 },          // System Design → Seed
  { from: 4, to: 2, label: "addenda supersede", lane: 72 }, // Per-Ho → README
];

const MONO = "'Source Code Pro',ui-monospace,SFMono-Regular,Menlo,monospace";
const tierInk = (t) => (t === "doing" ? INK.sumi : INK.bero);
const tierInk40 = (t) => (t === "doing" ? INK.sumi40 : INK.bero40);
const tierInk70 = (t) => (t === "doing" ? INK.sumi70 : INK.bero70);

const num = (n) => Number(n.toFixed(3));

// filled triangle arrowhead pointing `dir` (down|right|left) with base w, length h
function triHead(x, y, dir, w, h, fill) {
  let pts;
  if (dir === "down") pts = [[x - w / 2, y - h], [x + w / 2, y - h], [x, y]];
  else if (dir === "right") pts = [[x - h, y - w / 2], [x - h, y + w / 2], [x, y]];
  else pts = [[x + h, y - w / 2], [x + h, y + w / 2], [x, y]]; // left
  return `<path d="M${pts.map((p) => `${num(p[0])} ${num(p[1])}`).join(" L")} Z" fill="${fill}" stroke-linejoin="miter"/>`;
}
// open chevron pointing `dir`, arm length a
function chevron(x, y, dir, a, stroke, sw) {
  let p1, p2;
  if (dir === "up") { p1 = [x - a, y + a]; p2 = [x + a, y + a]; }
  else if (dir === "right") { p1 = [x - a, y - a]; p2 = [x - a, y + a]; }
  else { p1 = [x - a, y - a]; p2 = [x + a, y - a]; } // down
  return `<path d="M${num(p1[0])} ${num(p1[1])} L${num(x)} ${num(y)} L${num(p2[0])} ${num(p2[1])}" fill="none" stroke="${stroke}" stroke-width="${sw}" stroke-linejoin="miter" stroke-linecap="butt"/>`;
}

// ─── FULL scale (≥480 px wide container) ────────────────────────────────────
// `links` maps node index → on-site url of the document that defines that layer.
// A linked node wraps its rect + text in an SVG <a>; §6 geometry/inks are untouched —
// the link is deployment, not restyle. The §12 door-link affordance (label underline on
// hover/focus, focus-visible outline) is carried in CSS on .chain-node / .chain-node-label.
function full(links = []) {
  const nodeX = 96, nodeW = 192, nodeH = 48, pitch = 92, top = 20;
  const cx = nodeX + nodeW / 2;
  const yTop = (i) => top + i * pitch;
  const yBot = (i) => yTop(i) + nodeH;
  const tierRuleY = yTop(4) + 24; // node 5 straddles the rule
  let s = "";

  // tier rule (drawn first; node-5 fill interrupts it since node paints later)
  s += `<line x1="0" y1="${tierRuleY}" x2="300" y2="${tierRuleY}" stroke="${INK.sumi12}" stroke-width="1"/>`;
  s += `<text x="8" y="${tierRuleY - 5}" fill="${INK.bero70}" font-family="${MONO}" font-size="11">thinking</text>`;
  s += `<text x="8" y="${tierRuleY + 13}" fill="${INK.sumi70}" font-family="${MONO}" font-size="11">doing</text>`;

  // forward arrows (behind nodes) — one per gap; six nodes → five arrows
  for (let i = 0; i < NODES.length - 1; i++) {
    const crossing = NODES[i].tier !== NODES[i + 1].tier;
    const ink = crossing ? INK.kachi : tierInk(NODES[i].tier);
    const y1 = yBot(i), y2 = yTop(i + 1);
    s += `<line x1="${cx}" y1="${y1}" x2="${cx}" y2="${y2 - 7}" stroke="${ink}" stroke-width="2"/>`;
    s += triHead(cx, y2, "down", 8, 7, ink);
  }

  // returns (orthogonal, left lanes)
  for (const r of RETURNS) {
    const ink = tierInk40(NODES[r.from].tier);
    const lx = nodeX - r.lane;
    const ys = yTop(r.from) + nodeH / 2; // exit source mid-left
    const yt = yTop(r.to) + nodeH / 2;   // enter target mid-left
    s += `<path d="M${nodeX} ${ys} L${lx} ${ys} L${lx} ${yt} L${nodeX - 5} ${yt}" fill="none" stroke="${ink}" stroke-width="1"/>`;
    s += chevron(nodeX, yt, "right", 5, ink, 1);
    const lmid = (ys + yt) / 2;
    s += `<text x="${lx - 4}" y="${lmid}" fill="${tierInk70(NODES[r.from].tier)}" font-family="${MONO}" font-size="10" text-anchor="middle" transform="rotate(-90 ${lx - 4} ${lmid})">${r.label}</text>`;
  }

  // nodes
  NODES.forEach((n, i) => {
    const y = yTop(i), ink = tierInk(n.tier);
    let node = "";
    node += `<rect x="${nodeX}" y="${y}" width="${nodeW}" height="${nodeH}" fill="${INK.washi}" stroke="${ink}" stroke-width="1.5" stroke-linejoin="miter"/>`;
    node += `<text class="chain-node-label" x="${nodeX + 12}" y="${y + 21}" fill="${ink}" font-family="${MONO}" font-size="13" font-weight="600">${n.title}</text>`;
    node += `<text x="${nodeX + 12}" y="${y + 37}" fill="${tierInk70(n.tier)}" font-family="${MONO}" font-size="11">${n.label}</text>`;
    // a linked node becomes a door to the document that defines this layer (§12 pattern)
    s += links[i]
      ? `<a class="chain-node" href="${links[i]}" aria-label="${n.title} — open the document that defines it">${node}</a>`
      : node;
    // koma marks the ho node (steppable): h28 keyline, inset 12 px on the right
    if (i === 4) {
      const kh = 28, kw = 0.74 * kh;
      s += koma(nodeX + nodeW - 12 - kw, y + (nodeH - kh) / 2, kh, { mode: "keyline", face: "front" });
    }
  });

  // decomposition (full only): elbow from the per-ho node (index 4) → Think node → agent task.
  // It belongs to K5 (per-ho documents decompose into agent tasks), NOT to K6. INTERIM: with
  // K6 added as a sixth vertical node directly below K5, the sub-diagram is dropped below K6
  // and its elbow leaves the per-ho node from the bottom-LEFT, routing down the left lane so
  // it clears the K6 node (which sits on the centre line). Final geometry is the design
  // session's call (see NODES / session-15 prompt).
  const perHoBottom = yBot(4);
  const laneX = nodeX - 40;               // reuse the returns' inner left lane
  const thX = 120, thY = 566, thW = 64, thH = 26;
  const thCx = thX + thW / 2;
  const elbowY = thY - 19;
  const perHoBotLeftX = nodeX + 24;       // exit near the per-ho node's bottom-left corner
  s += `<path d="M${perHoBotLeftX} ${perHoBottom} L${perHoBotLeftX} ${perHoBottom + 12} L${laneX} ${perHoBottom + 12} L${laneX} ${elbowY} L${thCx} ${elbowY} L${thCx} ${thY - 6}" fill="none" stroke="${INK.sumi}" stroke-width="1.25"/>`;
  s += triHead(thCx, thY, "down", 6, 5, INK.sumi);
  s += `<rect x="${thX}" y="${thY}" width="${thW}" height="${thH}" fill="${INK.washi}" stroke="${INK.bero}" stroke-width="1" stroke-linejoin="miter"/>`;
  s += `<text x="${thX + thW / 2}" y="${thY + thH / 2 + 3}" fill="${INK.bero}" font-family="${MONO}" font-size="10" text-anchor="middle">Think</text>`;
  // agent task koma h20 solid sumi, to the right of Think
  const kh = 20, kw = 0.74 * kh, taskX = thX + thW + 28, taskY = thY + (thH - kh) / 2;
  s += koma(taskX, taskY, kh, { mode: "solid", face: "front" });
  // think → task arrow: kachi 1.25
  s += `<line x1="${thX + thW}" y1="${thY + thH / 2}" x2="${taskX - 6}" y2="${thY + thH / 2}" stroke="${INK.kachi}" stroke-width="1.25"/>`;
  s += triHead(taskX - 1, thY + thH / 2, "right", 6, 5, INK.kachi);
  // mini return 0.75 sumi@.40, below
  s += `<path d="M${taskX} ${thY + thH / 2 + 8} L${taskX - 6} ${thY + thH / 2 + 8} L${thX + thW} ${thY + thH / 2 + 8}" fill="none" stroke="${INK.sumi40}" stroke-width="0.75"/>`;
  s += chevron(thX + thW, thY + thH / 2 + 8, "right", 3, INK.sumi40, 0.75);

  // viewBox grown from 512 → 620 to seat the sixth node (K6, 480–528) plus the relocated
  // decomposition below it (INTERIM height; the design session may reflow this).
  return svg(300, 620, s, "The Kamae chain — six links: four framing documents, a pre-action document per session, and the living State Memory");
}

// ─── HEADER scale (≥160 px wide) ────────────────────────────────────────────
function header() {
  const nodeX = 8, nodeW = 128, nodeH = 24, pitch = 46, top = 6;
  const cx = nodeX + nodeW / 2;
  const yTop = (i) => top + i * pitch;
  const yBot = (i) => yTop(i) + nodeH;
  const tierRuleY = yTop(4) + 12;
  let s = "";
  s += `<line x1="0" y1="${tierRuleY}" x2="${nodeX + nodeW + 4}" y2="${tierRuleY}" stroke="${INK.sumi12}" stroke-width="1"/>`;
  for (let i = 0; i < NODES.length - 1; i++) {
    const crossing = NODES[i].tier !== NODES[i + 1].tier;
    const ink = crossing ? INK.kachi : tierInk(NODES[i].tier);
    s += `<line x1="${cx}" y1="${yBot(i)}" x2="${cx}" y2="${yTop(i + 1) - 5}" stroke="${ink}" stroke-width="1.5"/>`;
    s += triHead(cx, yTop(i + 1), "down", 6, 5, ink);
  }
  NODES.forEach((n, i) => {
    const y = yTop(i), ink = tierInk(n.tier);
    s += `<rect x="${nodeX}" y="${y}" width="${nodeW}" height="${nodeH}" fill="${INK.washi}" stroke="${ink}" stroke-width="1" stroke-linejoin="miter"/>`;
    s += `<text x="${nodeX + 8}" y="${y + 16}" fill="${ink}" font-family="${MONO}" font-size="10" font-weight="600">${n.title}</text>`;
    if (i === 4) {
      const kh = 14, kw = 0.74 * kh;
      s += koma(nodeX + nodeW - 8 - kw, y + (nodeH - kh) / 2, kh, { mode: "solid", face: "front" });
    }
  });
  return svg(nodeX + nodeW + 8, yBot(NODES.length - 1) + 6, s, "The Kamae chain (compact)");
}

// ─── GLYPH scale (<160 px) ──────────────────────────────────────────────────
function glyph() {
  // four bars 12×3 bero + solid koma h6 sumi, gap 2.5, left-aligned (viewBox 14×28.5)
  let s = "";
  const barW = 12, barH = 3, gap = 2.5, step = barH + gap;
  for (let i = 0; i < 4; i++) s += `<rect x="0" y="${i * step}" width="${barW}" height="${barH}" fill="${INK.bero}"/>`;
  const ky = 4 * step + 0; // 22
  s += koma(0, ky, 6, { mode: "solid", face: "front" });
  return svg(14, 28.5, s, "Kamae chain glyph");
}

function svg(w, h, body, title) {
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" ` +
    `width="${w}" height="${h}" role="img" aria-label="${title}" ` +
    `class="chain-svg" style="max-width:100%;height:auto">` +
    `<title>${title}</title>${body}</svg>`
  );
}

export function chainSvg(scale = "full", links = []) {
  if (scale === "glyph") return glyph();
  if (scale === "header") return header();
  return full(links);
}
