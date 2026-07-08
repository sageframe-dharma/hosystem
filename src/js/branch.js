// branch.js — §13 branch-return. Two legs, both keyed on sessionStorage "ho.branch", which
// defotouch.js sets ONLY when the reader follows a §7 card's "full entry →":
//
//   chip leg   (on the node page)  — if the branch targets THIS node, print an inline
//              "↩ <source>" on the crumb line. Clicking it returns to the source.
//   restore leg (on the source page) — after the chip is clicked we land back here: restore
//              the exact scroll, mark the term met (§7 grammar, no gold), and clear.
//
// Lateral navigation between nodes never sets ho.branch, and the chip only shows when the
// branch's target matches the current node — so a stale branch never greets an unrelated page.
// Runs after trail.js so the ho:met event reaches the trail's listener.
(function () {
  "use strict";

  // ── restore leg: runs on every page; fires only where we actually returned to ──
  try {
    const r = JSON.parse(sessionStorage.getItem("ho.branch.restore") || "null");
    if (r && r.from === location.pathname + location.search) {
      sessionStorage.removeItem("ho.branch.restore");
      const sel = window.CSS && CSS.escape ? CSS.escape(r.term) : r.term;
      const term = document.querySelector('.term[data-term="' + sel + '"]');
      if (term) {
        term.classList.add("met");
        window.dispatchEvent(new CustomEvent("ho:met", { detail: r.term }));
      }
      window.scrollTo(0, r.scrollY || 0);
    }
  } catch { /* no storage — nothing to restore */ }

  // ── chip leg: runs on a term node page ──
  const root = document.querySelector(".term-node");
  const slot = document.querySelector(".branch-slot");
  if (!root || !slot) return;

  let branch;
  try { branch = JSON.parse(sessionStorage.getItem("ho.branch") || "null"); } catch { return; }
  if (!branch || branch.target !== root.dataset.node) return;

  const chip = document.createElement("a");
  chip.className = "branch-return";
  chip.href = branch.from;
  chip.textContent = "↩ " + branch.label;
  chip.addEventListener("click", (e) => {
    e.preventDefault();
    try {
      sessionStorage.setItem("ho.branch.restore", JSON.stringify({
        from: branch.from, scrollY: branch.scrollY, term: branch.term,
      }));
      sessionStorage.removeItem("ho.branch"); // clears on return
    } catch { /* */ }
    location.href = branch.from;
  });
  slot.hidden = false;
  slot.appendChild(chip);
})();
