// header.js — §14 the header (variant D′, single-element per the 2026-07-07 amendment). ONE
// header: it rests in its natural (sticky) slot at the top, departs on downward commitment as
// one §4 step, and the SAME element returns docked on upward commitment. Step-reveal is a
// DISCRETE event, never scroll-linked: this handler only toggles the `.gone` class and shows/
// hides the crumb line. It never reads scrollY into a transform, so the header never moves
// per-pixel with the scroll (the §14 "never scroll-linked" rule).
//
// Also renders the walk miniature — a POINTER that reads the SAME storage as the §8 footer
// strip (sessionStorage ho.trail.walk / localStorage ho.trail.doors). It never diverges from
// the footer and never carries gold.
(function () {
  "use strict";
  const header = document.querySelector(".revealed-header");
  if (!header) return;

  const rhCrumb = header.querySelector(".rh-crumb");
  const mini = header.querySelector(".rh-mini");

  // ── trigger thresholds (§14, frozen) ──────────────────────────────────────
  const COMMIT = 48; // cumulative px within a gesture to flip direction state
  const NEAR = 80;   // scrollY ≤ 80 → always shown; > 80 required to leave / to show crumb

  // ── crumb: mirror the in-flow §12 crumb (deep pages only), condensed. Suppressed at
  //    scroll-top where the in-flow crumb is already visible — no redundancy. ──
  let crumbSegs = null;
  const inflow = document.querySelector("nav.crumb[data-crumb]");
  if (inflow && rhCrumb) {
    try { crumbSegs = JSON.parse(inflow.getAttribute("data-crumb")); } catch { crumbSegs = null; }
    if (Array.isArray(crumbSegs) && crumbSegs.length) buildCrumb(crumbSegs);
    else crumbSegs = null;
  }
  function buildCrumb(segs) {
    rhCrumb.textContent = "";
    segs.forEach((s, i) => {
      if (i > 0) {
        const sep = document.createElement("span");
        sep.className = "crumb-sep"; sep.textContent = " / ";
        rhCrumb.appendChild(sep);
      }
      let e;
      if (s.current) { e = document.createElement("span"); e.className = "crumb-seg crumb-current"; e.setAttribute("aria-current", "page"); }
      else if (s.href) { e = document.createElement("a"); e.className = "crumb-seg"; e.setAttribute("href", s.href); }
      else { e = document.createElement("span"); e.className = "crumb-seg"; }
      e.textContent = s.id;
      rhCrumb.appendChild(e);
    });
  }

  // ── the walk miniature — a compact pointer, §8 inks, no gold ───────────────
  function renderMini() {
    if (!mini) return;
    let walk = [];
    try { walk = JSON.parse(sessionStorage.getItem("ho.trail.walk") || "[]"); } catch { walk = []; }
    const n = walk.length;
    const NS = "http://www.w3.org/2000/svg";
    const S100 = "#1f2123", S40 = "#9b9e9d";
    const w = 30, h = 16;
    const svg = document.createElementNS(NS, "svg");
    svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
    svg.setAttribute("width", w); svg.setAttribute("height", h);
    svg.setAttribute("aria-hidden", "true");
    // current-door node 10×10 (stroke sumi 1.00 — where you stand), fill washi
    const door = document.createElementNS(NS, "rect");
    door.setAttribute("x", 1); door.setAttribute("y", 3); door.setAttribute("width", 10); door.setAttribute("height", 10);
    door.setAttribute("fill", "#eef1ef"); door.setAttribute("stroke", S100); door.setAttribute("stroke-width", 1); door.setAttribute("stroke-linejoin", "miter");
    svg.appendChild(door);
    // step node 6×6 filled sumi 1.00 — the latest step
    const step = document.createElementNS(NS, "rect");
    step.setAttribute("x", 18); step.setAttribute("y", 5); step.setAttribute("width", 6); step.setAttribute("height", 6); step.setAttribute("fill", S100);
    svg.appendChild(step);
    mini.textContent = "";
    mini.appendChild(svg);
    const count = document.createElement("span");
    count.className = "rh-steps";
    count.style.color = S40;
    count.textContent = `${n} step${n === 1 ? "" : "s"}`;
    mini.appendChild(count);
  }
  renderMini();
  window.addEventListener("ho:met", renderMini);

  // ── step-reveal state machine (discrete; class-only) ───────────────────────
  let lastY = window.scrollY;
  let accUp = 0, accDown = 0;
  let revealed = null;

  function setRevealed(next) {
    if (next === revealed) { updateCrumb(); return; }
    revealed = next;
    header.classList.toggle("gone", !next); // present (in slot / docked) ↔ departed (§4 step)
    updateCrumb();
  }
  function updateCrumb() {
    if (!rhCrumb) return;
    const show = revealed && !!crumbSegs && window.scrollY > NEAR;
    rhCrumb.hidden = !show;
    header.classList.toggle("has-crumb", show);
  }

  function onScroll() {
    const y = window.scrollY;
    const dy = y - lastY;
    lastY = y;
    if (dy < 0) { accUp += -dy; accDown = 0; }
    else if (dy > 0) { accDown += dy; accUp = 0; }

    if (accUp >= COMMIT || y <= NEAR) setRevealed(true);
    else if (accDown >= COMMIT && y > NEAR) setRevealed(false);
    else updateCrumb(); // keep the crumb honest as scrollY crosses NEAR without a state change
  }

  // initial state: at/near the top the header is present, crumb suppressed
  setRevealed(window.scrollY <= NEAR);
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", updateCrumb);
})();
