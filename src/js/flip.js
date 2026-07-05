// flip.js — promotion, the news rule (Basis §9). A firing-list mark flips to gold と only
// when it is fully in view (IntersectionObserver threshold 1.0) AND its record advanced to
// closed since the reader's last visit. Witness log in localStorage; first visit seeds
// silently. Reduced motion = instant swap. Superseded never fires (renders pre-flipped).
(function () {
  "use strict";
  const LOG = "hosystem-witnessed";
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function readLog() {
    try { return JSON.parse(localStorage.getItem(LOG) || "null"); }
    catch { return null; }
  }
  function writeLog(log) {
    try { localStorage.setItem(LOG, JSON.stringify(log)); } catch { /* no storage */ }
  }

  const marks = [...document.querySelectorAll("[data-record][data-state]")];
  if (!marks.length) return;

  const storable = (() => { try { localStorage.setItem("__t", "1"); localStorage.removeItem("__t"); return true; } catch { return false; } })();

  let log = readLog();
  const firstVisit = log === null;
  if (firstVisit) log = {};

  // superseded renders pre-flipped already (server-rendered gold@0.40); never observed.
  const closeable = marks.filter((m) => m.dataset.state === "closed");

  // No storage: render already-promoted, no motion (§9).
  if (!storable) { closeable.forEach(promoteInstant); return; }

  // First visit: seed all firing records silently and render pre-promoted — nothing flips,
  // and a later visit won't mistake an unseen-but-always-closed mark for news.
  if (firstVisit) {
    closeable.forEach((m) => { promoteInstant(m); log[m.dataset.record] = m.dataset.state; });
    writeLog(log);
    return;
  }

  // Return visit: flip a mark once, when fully in view, if it closed since we last logged.
  const io = new IntersectionObserver((entries) => {
    for (const en of entries) {
      if (en.intersectionRatio < 1) continue;
      const m = en.target;
      const id = m.dataset.record;
      const state = m.dataset.state;
      if (log[id] === state) { io.unobserve(m); continue; }
      flip(m); // news: advanced to closed since last visit
      log[id] = state;
      writeLog(log);
      io.unobserve(m);
    }
  }, { threshold: 1.0 });

  closeable.forEach((m) => {
    if (log[m.dataset.record] === m.dataset.state) promoteInstant(m);
    else io.observe(m);
  });

  function flip(m) {
    const el = m.querySelector(".flip");
    if (!el) return;
    if (reduce) { el.classList.add("promoted"); return; }
    el.classList.add("flipping");
    // adjacent state tints cut at 120 ms — the zero-crossing (§9), a cut, never a fade
    setTimeout(() => m.classList.add("promoted-adjacent"), 120);
    el.addEventListener("animationend", () => { el.classList.remove("flipping"); el.classList.add("promoted"); }, { once: true });
  }
  function promoteInstant(m) {
    const el = m.querySelector(".flip");
    if (el) el.classList.add("promoted");
    m.classList.add("promoted-adjacent");
  }
})();
