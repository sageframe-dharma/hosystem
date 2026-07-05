// defotouch.js — definition-on-touch (Basis §7). Floating card, one at a time.
// hover/focus = transient · tap/Enter = pin · Escape/outside/second-tap = dismiss.
// Card arrives as one §4 step (160 ms rise); dismissal instant. Zero reflow.
(function () {
  "use strict";
  const CUTS = JSON.parse(document.getElementById("plain-cuts")?.textContent || "{}");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let card = null;
  let owner = null;   // the term button currently showing a card
  let pinned = false;

  function build(cut) {
    const el = document.createElement("div");
    el.className = "defcard";
    el.setAttribute("role", "tooltip");
    const p = document.createElement("p");
    p.className = "plain";
    p.textContent = cut.plain;
    el.appendChild(p);
    if (cut.fullHref) {
      const a = document.createElement("a");
      a.className = "full";
      a.href = cut.fullHref;
      a.textContent = cut.fullLabel || "full entry →";
      el.appendChild(a);
    }
    if (!reduce) el.classList.add("arriving");
    return el;
  }

  function place(el, term) {
    // §7 placement: 0.5rem below the term's line box, left-aligned to term start,
    // clamped 0.5rem from column edges; flip above when short of space. Zero reflow.
    const col = document.querySelector(".wrap");
    const colBox = col.getBoundingClientRect();
    el.style.setProperty("--col", colBox.width + "px");
    document.body.appendChild(el); // measure
    const t = term.getBoundingClientRect();
    const gap = 8; // ~0.5rem
    const pad = 8;
    const cardW = el.offsetWidth;
    let left = t.left + window.scrollX;
    const min = colBox.left + window.scrollX + pad;
    const max = colBox.right + window.scrollX - pad - cardW;
    left = Math.max(min, Math.min(left, max));
    let top = t.bottom + window.scrollY + gap;
    const below = window.innerHeight - t.bottom;
    if (below < el.offsetHeight + gap + 16) {
      top = t.top + window.scrollY - el.offsetHeight - gap; // flip above
    }
    el.style.left = left + "px";
    el.style.top = top + "px";
  }

  function open(term, doPin) {
    const key = term.dataset.term;
    const cut = CUTS[key];
    if (!cut) return;
    dismiss();
    card = build(cut);
    place(card, term);
    owner = term;
    pinned = !!doPin;
    term.setAttribute("aria-expanded", "true"); // §7 underline dotted → solid via CSS
  }

  function dismiss(markMet) {
    if (!card) return;
    if (markMet && owner) {
      owner.classList.add("met"); // §7 met = pinned reveal dismissed
      window.dispatchEvent(new CustomEvent("ho:met", { detail: owner.dataset.term }));
    }
    card.remove();
    if (owner) owner.setAttribute("aria-expanded", "false");
    card = null;
    owner = null;
    pinned = false;
  }

  document.querySelectorAll(".term").forEach((term) => {
    term.addEventListener("mouseenter", () => { if (!pinned) open(term, false); });
    term.addEventListener("mouseleave", () => { if (!pinned) dismiss(false); });
    term.addEventListener("focus", () => { if (!pinned) open(term, false); });
    term.addEventListener("blur", () => { if (!pinned) dismiss(false); });
    term.addEventListener("click", (e) => {
      e.preventDefault();
      if (owner === term && pinned) { dismiss(true); return; } // second-tap dismisses → met
      open(term, true);
    });
    term.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(term, true); }
    });
  });

  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && pinned) dismiss(true); });
  document.addEventListener("click", (e) => {
    if (pinned && card && !card.contains(e.target) && e.target !== owner) dismiss(true);
  });
})();
