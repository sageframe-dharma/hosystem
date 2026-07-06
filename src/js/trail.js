// trail.js — the visitor's walk (Basis §8 + §11). Plan above, walk threaded beneath, with
// RIGHT-ANGLE routing at every width (§8 propagated 2026-07-05: the trail draws one way at
// every width; edges go down · across · down, lane at mid-pitch). §11 narrows the same
// object below a 480 px column. localStorage ho.trail.doors (ever-entered, across visits) ·
// sessionStorage ho.trail.walk (this walk, ordered, cap 64). Nothing leaves the browser.
(function () {
  "use strict";
  const NS = "http://www.w3.org/2000/svg";
  const DOORS = JSON.parse(document.getElementById("doors")?.textContent || "[]");
  const host = document.getElementById("trail");
  if (!host || !DOORS.length) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const INK = { s100: "#1f2123", s70: "#5d5f60", s40: "#9b9e9d", s12: "#d5d8d7" };
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

    // ── geometry (§8 wide / §11 narrow) ──
    // §8: the caption line and the door row are SEPARATE rows inside the strip's
    // padding — the caption sits in its own row above the doors and clears them at
    // every width. captionY is the caption baseline; the door row starts below it.
    const captionY = 9; // caption baseline (mono 11): cap-top ≈ 2, descender ≈ 12
    const doorTop = 16, doorSz = 10, doorBottom = doorTop + doorSz; // door row below the caption
    const half = 3; // step node is 6×6
    const pitch = narrow
      ? (n <= 5 ? 14 : Math.max(7, 56 / (n - 1)))
      : (n <= 5 ? 12 : Math.max(6, 48 / (n - 1)));
    const labelSize = narrow ? 9 : 10;
    const labelBaseline = doorBottom + 6 + 8;
    const bandTop = narrow ? doorBottom + 36 : labelBaseline + 14;
    const headW = narrow ? 4 : 5, headH = 4;
    const metFirst = narrow ? half + 6 : 4; // §11 first dot 6 px off node edge
    const restCap = narrow ? 160 : 128;
    const centerX = (i) => 8 + (i * (W - 16)) / (DOORS.length - 1);
    // clamp a middle-anchored label's center so its box stays inside the strip at every
    // width (§11 "clamped to the column", propagated to §8 — a label never renders
    // outside the strip). Source Code Pro is monospaced at a 0.6 em advance, so the box
    // half-width is exact; interior labels keep their centering, end labels pull inward.
    const clampLabelX = (cx, textLen, size) => {
      const halfW = (textLen * size * 0.6) / 2, pad = 2;
      if (cx - halfW < pad) return pad + halfW;
      if (cx + halfW > W - pad) return W - pad - halfW;
      return cx;
    };

    const shownStart = n > 9 ? n - 9 : 0;      // > 9 steps: last 9 render (§8)
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

    // plan line through door centers (behind nodes)
    svg.appendChild(el("line", { x1: centerX(0), y1: doorTop + doorSz / 2, x2: centerX(DOORS.length - 1), y2: doorTop + doorSz / 2, stroke: INK.s12, "stroke-width": 1 }));

    // doors + labels (never entered s40 · past walk s70 · this walk s100; fill washi)
    DOORS.forEach((d, i) => {
      const entered = ever.has(d.id);
      const thisWalk = walk.some((w) => w.door === d.id);
      const ink = thisWalk ? INK.s100 : entered ? INK.s70 : INK.s40;
      const cx = centerX(i);
      svg.appendChild(el("rect", { x: cx - doorSz / 2, y: doorTop, width: doorSz, height: doorSz, fill: "#eef1ef", stroke: ink, "stroke-width": 1, "stroke-linejoin": "miter" }));
      // §11: labels for this-walk doors only; §8: all doors, opacity = node's ink.
      // clamp the label inside the strip at every width so it never clips the edge.
      if (!narrow || thisWalk) {
        const lx = clampLabelX(cx, d.name.length, labelSize);
        svg.appendChild(text(lx, labelBaseline, d.name, labelSize, ink, "middle"));
      }
    });

    // thread: nodes + right-angle edges + met dots
    if (n > 9) svg.appendChild(text(W - 8, bandTop - 4, `⋯ +${n - 9}`, 10, INK.s40, "end"));
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

  // §8/§11 expansion: hover/focus/tap a step → door label + met names, instant, zero reflow
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
