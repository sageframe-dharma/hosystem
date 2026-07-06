// trail.js — the visitor's walk (Basis §8 + §11 + §12). Plan above, walk threaded beneath,
// with RIGHT-ANGLE routing at every width (§8 propagated 2026-07-05: the trail draws one way
// at every width; edges go down · across · down, lane at mid-pitch). §11 narrows the same
// object below a 480 px column. §12 makes the plan-row doors NAVIGATE (node + label are one
// link to the door's landing), and shows a one-time first-visit hint under the caption.
// Pitch floors 10 (wide) / 11 (narrow) and last-6 elision are the 2026-07-06 propagation.
// localStorage ho.trail.doors (ever-entered, across visits) · sessionStorage ho.trail.walk
// (this walk, ordered, cap 64). Nothing leaves the browser.
(function () {
  "use strict";
  const NS = "http://www.w3.org/2000/svg";
  const DOORS = JSON.parse(document.getElementById("doors")?.textContent || "[]");
  const host = document.getElementById("trail");
  if (!host || !DOORS.length) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const INK = { s100: "#1f2123", s70: "#5d5f60", s40: "#9b9e9d", s12: "#d5d8d7", bero70: "#648cab" };
  const MONO = "'Source Code Pro',ui-monospace,monospace";
  const doorIndex = Object.fromEntries(DOORS.map((d, i) => [d.id, i]));

  const readDoors = () => new Set(JSON.parse(localStorage.getItem("ho.trail.doors") || "[]"));
  const readWalk = () => JSON.parse(sessionStorage.getItem("ho.trail.walk") || "[]");
  function enter(doorId) {
    if (!(doorId in doorIndex)) return;
    const doors = readDoors(); doors.add(doorId);
    try { localStorage.setItem("ho.trail.doors", JSON.stringify([...doors])); } catch { /* */ }
    const walk = readWalk();
    walk.push({ door: doorId, met: [] });
    try { sessionStorage.setItem("ho.trail.walk", JSON.stringify(walk.slice(-64))); } catch { /* */ }
  }

  // ── §12 first-visit hint state ──────────────────────────────────────────────
  // "renders until the first door navigation or the second visit, whichever comes first,
  // then never again." A visit = a browser session (the trail's own sessionStorage walk).
  // localStorage ho.trail.hinted = 1 retires it for good; ho.trail.visited marks that a
  // first visit has happened so a later fresh session counts as the second. Storage
  // unavailable → the hint renders once per page load (harmless), per §12.
  let showHint = false;
  try {
    if (localStorage.getItem("ho.trail.hinted") !== "1") {
      const newSession = !sessionStorage.getItem("ho.trail.visit");
      sessionStorage.setItem("ho.trail.visit", "1");
      if (newSession && localStorage.getItem("ho.trail.visited") === "1") {
        localStorage.setItem("ho.trail.hinted", "1"); // second visit — retire the hint
      } else {
        localStorage.setItem("ho.trail.visited", "1"); // first visit — greet
        showHint = true;
      }
    }
  } catch { showHint = true; }
  const retireHint = () => { try { localStorage.setItem("ho.trail.hinted", "1"); } catch { /* */ } };

  // met terms attach to the current (last) step — links §7 to §8
  window.addEventListener("ho:met", (e) => {
    const walk = readWalk();
    if (!walk.length) return;
    const last = walk[walk.length - 1];
    if (!last.met.includes(e.detail)) last.met.push(e.detail);
    try { sessionStorage.setItem("ho.trail.walk", JSON.stringify(walk)); } catch { /* */ }
    render();
  });

  const el = (n, a = {}) => { const e = document.createElementNS(NS, n); for (const k in a) e.setAttribute(k, a[k]); return e; };
  function text(x, y, s, size, fill, anchor) {
    const t = el("text", { x, y, "font-size": size, fill, "text-anchor": anchor, "font-family": MONO });
    t.textContent = s; return t;
  }
  function triDown(x, y, w, h) { // filled triangle head pointing down, tip at (x,y)
    return el("path", { d: `M${x - w / 2} ${y - h} L${x + w / 2} ${y - h} L${x} ${y} Z`, fill: INK.s100, "stroke-linejoin": "miter" });
  }

  // right-angle edge from node A(center xa,ya) down into node B(center xb,yb), yb>ya.
  // equal-x → straight vertical; else down to a lane at mid-pitch, across, down (§8/§11).
  function edge(svg, xa, ya, xb, yb, half, headW, headH) {
    const ay = ya + half;       // A bottom-center
    const by = yb - half;       // B top-center
    let d;
    if (xa === xb) d = `M${xa} ${ay} L${xb} ${by}`;
    else {
      const lane = (ya + yb) / 2; // mid-pitch — never at a node's y
      d = `M${xa} ${ay} L${xa} ${lane} L${xb} ${lane} L${xb} ${by}`;
    }
    svg.appendChild(el("path", { d, fill: "none", stroke: INK.s100, "stroke-width": 1.25, "stroke-linejoin": "miter" }));
    svg.appendChild(triDown(xb, by, headW, headH)); // head at the arrival, every segment
  }

  function render() {
    const ever = readDoors();
    const walk = readWalk();
    const W = Math.max(280, host.clientWidth || 640);
    const narrow = W < 480; // §11 breakpoint: column < 480 px
    const n = walk.length;

    // ── geometry (§8 wide / §11 narrow; §12 hint offset) ──
    // §8: the caption line and the door row are SEPARATE rows inside the strip's padding.
    // §12: on the first visit a hint line sits under the caption and pushes the door row
    // (and everything beneath) down by 14 px — inside the ≤128/≤160 budgets.
    const captionY = 9;              // caption baseline (mono 11)
    const hintY = captionY + 13;     // §12 hint baseline (mono 10), one line under the caption
    const off = showHint ? 14 : 0;   // the hint adds one 14 px line, first visit only
    const doorTop = 16 + off, doorSz = 10, doorBottom = doorTop + doorSz;
    const doorCy = doorTop + doorSz / 2;
    const half = 3; // step node is 6×6
    const pitch = narrow
      ? (n <= 5 ? 14 : Math.max(11, 56 / (n - 1)))   // §11 floor 11 (propagated 2026-07-06)
      : (n <= 5 ? 12 : Math.max(10, 48 / (n - 1)));  // §8  floor 10 (propagated 2026-07-06)
    const labelSize = narrow ? 9 : 10;
    const labelBaseline = doorBottom + 6 + 8;
    const bandTop = narrow ? doorBottom + 36 : labelBaseline + 14;
    const headW = narrow ? 4 : 5, headH = 4;
    const metFirst = narrow ? half + 6 : 4; // §11 first dot 6 px off node edge
    const restCap = narrow ? 160 : 128;
    const centerX = (i) => 8 + (i * (W - 16)) / (DOORS.length - 1);
    // clamp a middle-anchored label's center so its box stays inside the strip at every
    // width (§11 "clamped to the column", propagated to §8). Source Code Pro is monospaced
    // at a 0.6 em advance, so the box half-width is exact.
    const halfLabel = (textLen, size) => (textLen * size * 0.6) / 2;
    const clampLabelX = (cx, textLen, size) => {
      const halfW = halfLabel(textLen, size), pad = 2;
      if (cx - halfW < pad) return pad + halfW;
      if (cx + halfW > W - pad) return W - pad - halfW;
      return cx;
    };

    const shownStart = n > 6 ? n - 6 : 0;      // > 6 steps: last 6 render (§8, tightened 2026-07-06)
    const shown = walk.slice(shownStart);
    const height = Math.min(restCap, bandTop + Math.max(0, shown.length - 1) * pitch + half + 20);

    host.innerHTML = "";
    const svg = el("svg", { viewBox: `0 0 ${W} ${height}`, width: W, height, role: "img", "aria-label": "your walk" });

    // caption — its own row above the doors (captionY). wide: left "your walk" +
    // right "n steps"; narrow: one left line (§11)
    if (narrow) svg.appendChild(text(8, captionY, `your walk · ${n} step${n === 1 ? "" : "s"}`, 11, INK.s70, "start"));
    else {
      svg.appendChild(text(8, captionY, "your walk", 11, INK.s70, "start"));
      svg.appendChild(text(W - 8, captionY, `${n} step${n === 1 ? "" : "s"}`, 11, INK.s40, "end"));
    }

    // §12 hint — first visit only, one line under the caption, mono 10 sumi@.40
    if (showHint) svg.appendChild(text(8, hintY, "plan above · your steps beneath · doors open", 10, INK.s40, "start"));

    // plan line through door centers (behind nodes)
    svg.appendChild(el("line", { x1: centerX(0), y1: doorCy, x2: centerX(DOORS.length - 1), y2: doorCy, stroke: INK.s12, "stroke-width": 1 }));

    // doors + labels — §12: node + label are ONE link to the door's landing. Never entered
    // s40 · past walk s70 · this walk s100; fill washi. Resting look is §8 verbatim: no
    // resting underline. Hover/focus-visible puts the solid 1px bero@.70 underline on the
    // LABEL only; the node ink and geometry are untouched. Hit target ≥ 24 × 24.
    DOORS.forEach((d, i) => {
      const entered = ever.has(d.id);
      const thisWalk = walk.some((w) => w.door === d.id);
      const ink = thisWalk ? INK.s100 : entered ? INK.s70 : INK.s40;
      const cx = centerX(i);
      const showLabel = !narrow || thisWalk; // §11: labels for this-walk doors only
      const lx = showLabel ? clampLabelX(cx, d.name.length, labelSize) : cx;
      const lw = halfLabel(d.name.length, labelSize) * 2;

      const a = el("a", { role: "link", "aria-label": d.name, tabindex: "0" });
      // href in both namespaced and plain forms so it navigates as a real link
      a.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", d.url);
      a.setAttribute("href", d.url);

      // hit target ≥ 24 × 24, centered on node + label (transparent)
      const hitW = Math.max(24, lw + 6);
      const hitTop = Math.min(doorCy - 12, doorTop - 4);
      const hitBottom = showLabel ? labelBaseline + 3 : doorBottom + 4;
      a.appendChild(el("rect", { x: cx - hitW / 2, y: hitTop, width: hitW, height: Math.max(24, hitBottom - hitTop), fill: "transparent" }));

      // the door node (resting look, §8 verbatim)
      a.appendChild(el("rect", { x: cx - doorSz / 2, y: doorTop, width: doorSz, height: doorSz, fill: "#eef1ef", stroke: ink, "stroke-width": 1, "stroke-linejoin": "miter" }));

      // the label + its (hidden) hover/focus underline
      if (showLabel) {
        a.appendChild(text(lx, labelBaseline, d.name, labelSize, ink, "middle"));
        const uy = labelBaseline + 2.5;
        const underline = el("line", { x1: lx - lw / 2, y1: uy, x2: lx + lw / 2, y2: uy, stroke: INK.bero70, "stroke-width": 1, visibility: "hidden" });
        a.appendChild(underline);
        const on = () => underline.setAttribute("visibility", "visible");
        const offU = () => underline.setAttribute("visibility", "hidden");
        a.addEventListener("mouseenter", on); a.addEventListener("mouseleave", offU);
        a.addEventListener("focus", on); a.addEventListener("blur", offU);
      }
      // the first door navigation retires the hint (§12); native anchor nav follows
      a.addEventListener("click", retireHint);
      a.addEventListener("keydown", (e) => { if (e.key === "Enter") retireHint(); });
      svg.appendChild(a);
    });

    // thread: nodes + right-angle edges + met dots. > 6 steps: last 6 render, "⋯ +k" at
    // the band top-right carries the rest (§8, tightened to last-6 on 2026-07-06).
    if (n > 6) svg.appendChild(text(W - 8, bandTop - 4, `⋯ +${n - 6}`, 10, INK.s40, "end"));
    let prev = null;
    shown.forEach((stepObj, k) => {
      const di = doorIndex[stepObj.door];
      if (di === undefined) return;
      const x = centerX(di);
      const y = bandTop + k * pitch;
      if (prev) edge(svg, prev.x, prev.y, x, y, half, headW, headH);
      const node = el("rect", { x: x - half, y: y - half, width: 2 * half, height: 2 * half, fill: INK.s100, class: "trail-step", tabindex: "0", role: "button", "aria-label": stepObj.door });
      node.dataset.door = stepObj.door;
      node.dataset.met = (stepObj.met || []).join(",");
      if (!reduce && k === shown.length - 1 && n) node.classList.add("step"); // §4 arrival
      svg.appendChild(node);
      // met dots — 2.5 px sumi@.40, pitch 4, max 4 then +n (§8; §11 first dot 6 px off edge)
      const met = stepObj.met || [];
      met.slice(0, 4).forEach((_, mi) => svg.appendChild(el("circle", { cx: x + metFirst + mi * 4, cy: y, r: 1.25, fill: INK.s40 })));
      if (met.length > 4) svg.appendChild(text(x + metFirst + 4 * 4, y + 3, `+${met.length - 4}`, 9, INK.s40, "start"));
      prev = { x, y };
    });

    host.appendChild(svg);
    wireExpansion(svg, narrow, bandTop);
  }

  // §8/§11 expansion: hover/focus/tap a STEP node → door label + met names, instant, zero
  // reflow. Step nodes never navigate (§12) — this is the only affordance they carry.
  let tip = null;
  function wireExpansion(svg, narrow, bandTop) {
    svg.querySelectorAll(".trail-step").forEach((node) => {
      const show = () => {
        clearTip();
        const met = (node.dataset.met || "").split(",").filter(Boolean);
        const label = (DOORS.find((d) => d.id === node.dataset.door) || {}).name || node.dataset.door;
        const s = met.length ? `${label} · ${met.join(", ")}` : label;
        const r = node.getBBox();
        tip = el("g", { class: "trail-tip" });
        // §11 places the expansion in the clearance band (band top − 10, clamped 4);
        // §8 places it beside the node.
        const t = narrow
          ? text(4, Math.max(4, bandTop - 10), s, 10, INK.s70, "start")
          : text(r.x + r.width + 8, r.y + 6, s, 10, INK.s70, "start");
        tip.appendChild(t);
        svg.appendChild(tip);
      };
      node.addEventListener("mouseenter", show);
      node.addEventListener("mouseleave", clearTip);
      node.addEventListener("focus", show);
      node.addEventListener("blur", clearTip);
      node.addEventListener("click", show);
    });
  }
  function clearTip() { if (tip) { tip.remove(); tip = null; } }

  // record the real visit to this page's door once per load (empty state renders from step 1)
  const here = host.dataset.door;
  if (here && (!readWalk().length || readWalk()[readWalk().length - 1].door !== here)) enter(here);
  render();
  window.addEventListener("resize", render);
})();
