// crumb.js — §12 breadcrumb truncation. The line never wraps; on overflow the middle
// segments collapse right-to-left into ONE non-interactive "…" (sumi@.40), keeping the
// first and the current; if that still overflows, the first collapses too ("… / record");
// the current segment never collapses. The server renders the full path (the no-JS
// fallback, clipped by CSS overflow:hidden); here we measure the container and rebuild the
// visible sequence to fit. Reads the same segments from data-crumb — nothing new invented.
(function () {
  "use strict";
  const navs = document.querySelectorAll("nav.crumb[data-crumb]");
  navs.forEach((nav) => {
    let segs;
    try { segs = JSON.parse(nav.getAttribute("data-crumb")); } catch { return; }
    if (!Array.isArray(segs) || !segs.length) return;

    const first = segs[0];
    const current = segs[segs.length - 1];
    const middles = segs.slice(1, -1);

    const mkSeg = (s) => {
      let e;
      if (s.current) {
        e = document.createElement("span");
        e.className = "crumb-seg crumb-current";
        e.setAttribute("aria-current", "page");
      } else if (s.href) {
        e = document.createElement("a");
        e.className = "crumb-seg";
        e.setAttribute("href", s.href);
      } else {
        e = document.createElement("span");
        e.className = "crumb-seg";
      }
      e.textContent = s.id;
      return e;
    };
    const mkSep = () => { const s = document.createElement("span"); s.className = "crumb-sep"; s.textContent = " / "; return s; };
    const mkEll = () => { const s = document.createElement("span"); s.className = "crumb-ell"; s.setAttribute("aria-hidden", "true"); s.textContent = "…"; return s; };

    // draw a candidate: optionally hide the first; collapse the rightmost `hidden` middles
    // into one "…" placed between the shown middles (or the first) and the current.
    function draw(hideFirst, hidden) {
      const seq = [];
      if (!hideFirst) seq.push(mkSeg(first));
      for (let i = 0; i < middles.length - hidden; i++) seq.push(mkSeg(middles[i]));
      if (hidden > 0 || hideFirst) seq.push(mkEll());
      seq.push(mkSeg(current));
      nav.textContent = "";
      seq.forEach((node, i) => { if (i > 0) nav.appendChild(mkSep()); nav.appendChild(node); });
    }

    const overflows = () => nav.scrollWidth > nav.clientWidth + 1;

    function fit() {
      draw(false, 0);
      if (!overflows()) return;
      // collapse middles right-to-left, first + current kept
      for (let h = 1; h <= middles.length; h++) {
        draw(false, h);
        if (!overflows()) return;
      }
      // still overflowing: the first collapses too ("… / record"); current never collapses
      draw(true, middles.length);
    }

    fit();
    let raf = 0;
    window.addEventListener("resize", () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(fit);
    });
  });
})();
