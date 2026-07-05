// trail.js — the visitor's walk (Basis §8). Plan above, walk threaded beneath.
// localStorage ho.trail.doors (ever-entered, across visits) · sessionStorage
// ho.trail.walk (this walk, ordered, cap 64). Nothing leaves the browser.
// ≥480 px form only — the narrow column is deferred to its own ho (§8).
(function () {
  "use strict";
  const NS = "http://www.w3.org/2000/svg";
  const DOORS = JSON.parse(document.getElementById("doors")?.textContent || "[]");
  const host = document.getElementById("trail");
  if (!host || !DOORS.length) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const INK = { s100: "#1f2123", s70: "#5d5f60", s40: "#9b9e9d", s12: "#d5d8d7" };
  const doorIndex = Object.fromEntries(DOORS.map((d, i) => [d.id, i]));

  const readDoors = () => new Set(JSON.parse(localStorage.getItem("ho.trail.doors") || "[]"));
  const readWalk = () => JSON.parse(sessionStorage.getItem("ho.trail.walk") || "[]");
  function enter(doorId) {
    if (!(doorId in doorIndex)) return;
    const doors = readDoors(); doors.add(doorId);
    localStorage.setItem("ho.trail.doors", JSON.stringify([...doors]));
    const walk = readWalk();
    walk.push({ door: doorId, met: [] });
    sessionStorage.setItem("ho.trail.walk", JSON.stringify(walk.slice(-64)));
  }
  // met terms attach to the current (last) step — links §7 to §8
  window.addEventListener("ho:met", (e) => {
    const walk = readWalk();
    if (!walk.length) return;
    const last = walk[walk.length - 1];
    if (!last.met.includes(e.detail)) last.met.push(e.detail);
    sessionStorage.setItem("ho.trail.walk", JSON.stringify(walk));
    render();
  });

  const el = (n, a = {}) => { const e = document.createElementNS(NS, n); for (const k in a) e.setAttribute(k, a[k]); return e; };

  function render() {
    const ever = readDoors();
    const walk = readWalk();
    const W = Math.max(320, host.clientWidth || 640);
    const n = walk.length;
    const pitch = n <= 5 ? 12 : Math.max(6, 48 / (n - 1));

    const doorY = 8, nodeSz = 10, labelY = doorY + nodeSz + 6 + 8;
    const bandTop = labelY + 14;
    const centerX = (i) => 8 + (i * (W - 16)) / (DOORS.length - 1);

    const shownStart = n > 9 ? n - 9 : 0;
    const shown = walk.slice(shownStart);
    const height = Math.min(160, bandTop + Math.max(0, shown.length - 1) * pitch + 6 + 18);

    host.innerHTML = "";
    const svg = el("svg", { viewBox: `0 0 ${W} ${height}`, width: W, height, role: "img", "aria-label": "your walk" });

    // caption
    svg.appendChild(text(8, 11, "your walk", 11, INK.s70, "start"));
    svg.appendChild(text(W - 8, 11, `${n} step${n === 1 ? "" : "s"}`, 11, INK.s40, "end"));

    // plan line through door centers (behind nodes)
    svg.appendChild(el("line", { x1: centerX(0), y1: doorY + nodeSz / 2, x2: centerX(DOORS.length - 1), y2: doorY + nodeSz / 2, stroke: INK.s12, "stroke-width": 1 }));

    // doors + labels
    DOORS.forEach((d, i) => {
      const entered = ever.has(d.id);
      const thisWalk = walk.some((w) => w.door === d.id);
      const ink = thisWalk ? INK.s100 : entered ? INK.s70 : INK.s40;
      const cx = centerX(i);
      svg.appendChild(el("rect", { x: cx - nodeSz / 2, y: doorY, width: nodeSz, height: nodeSz, fill: "#eef1ef", stroke: ink, "stroke-width": 1, "stroke-linejoin": "miter" }));
      svg.appendChild(text(cx, labelY, d.name, 10, ink, "middle"));
    });

    // thread: nodes + edges + met dots
    let prev = null;
    if (n > 9) svg.appendChild(text(W - 8, bandTop - 4, `⋯ +${n - 9}`, 10, INK.s40, "end"));
    shown.forEach((stepObj, k) => {
      const di = doorIndex[stepObj.door];
      if (di === undefined) return;
      const x = centerX(di);
      const y = bandTop + k * pitch;
      if (prev) {
        svg.appendChild(el("line", { x1: prev.x, y1: prev.y, x2: x, y2: y - 3, stroke: INK.s100, "stroke-width": 1.25 }));
        svg.appendChild(triHead(x, y - 3, prev, x, y));
      }
      const node = el("rect", { x: x - 3, y: y - 3, width: 6, height: 6, fill: INK.s100, class: "trail-step", tabindex: "0", role: "button", "aria-label": stepObj.door });
      node.dataset.door = stepObj.door;
      node.dataset.met = (stepObj.met || []).join(",");
      if (!reduce && k === shown.length - 1 && n) node.classList.add("step");
      svg.appendChild(node);
      // met dots — 2.5 px sumi@.40, 4 px right, pitch 4, max 4 then +n
      const met = stepObj.met || [];
      met.slice(0, 4).forEach((_, mi) => svg.appendChild(el("circle", { cx: x + 4 + mi * 4, cy: y, r: 1.25, fill: INK.s40 })));
      if (met.length > 4) svg.appendChild(text(x + 4 + 4 * 4, y + 3, `+${met.length - 4}`, 9, INK.s40, "start"));
      prev = { x, y };
    });

    host.appendChild(svg);
    wireExpansion(svg);
  }

  function text(x, y, s, size, fill, anchor) {
    const t = el("text", { x, y, "font-size": size, fill, "text-anchor": anchor, "font-family": "'Source Code Pro',ui-monospace,monospace" });
    t.textContent = s; return t;
  }
  function triHead(x, y, from, tx, ty) {
    // small filled triangle head 5×4 pointing along the segment (mostly downward)
    const p = el("path", { d: `M${x - 2.5} ${y} L${x + 2.5} ${y} L${tx} ${ty} Z`, fill: INK.s100, "stroke-linejoin": "miter" });
    void from; return p;
  }

  // §8 expansion: hover/focus/tap a step → door label + met names, instant, zero reflow
  let tip = null;
  function wireExpansion(svg) {
    svg.querySelectorAll(".trail-step").forEach((node) => {
      const show = () => {
        clearTip();
        const met = (node.dataset.met || "").split(",").filter(Boolean);
        tip = el("g", { class: "trail-tip" });
        const r = node.getBBox();
        const label = (DOORS.find((d) => d.id === node.dataset.door) || {}).name || node.dataset.door;
        const line = text(r.x + r.width + 8, r.y + 6, met.length ? `${label} · ${met.join(", ")}` : label, 10, INK.s70, "start");
        tip.appendChild(line);
        svg.appendChild(tip);
      };
      node.addEventListener("mouseenter", show);
      node.addEventListener("mouseleave", () => clearTip());
      node.addEventListener("focus", show);
      node.addEventListener("blur", () => clearTip());
      node.addEventListener("click", show);
    });
  }
  function clearTip() { if (tip) { tip.remove(); tip = null; } }

  // record the real visit to this page's door (the Walk section) once per load
  const here = host.dataset.door;
  if (here && (!readWalk().length || readWalk()[readWalk().length - 1].door !== here)) enter(here);
  render();

  // spike navigation aid (clearly not site chrome): drive the REAL trail mechanism
  window.__trailEnter = (id) => { enter(id); render(); };
  window.__trailReset = () => { sessionStorage.removeItem("ho.trail.walk"); render(); };
  window.addEventListener("resize", render);
})();
