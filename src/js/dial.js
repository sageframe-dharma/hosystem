// dial.js — §13 progressive depth dial on a term node page. Depths 1→current are stacked;
// "deeper" appends the next as ONE §4 step (160 ms, 8 px rise), "less" removes instant.
// Keyboard (dial focused): ↓/+ deeper, ↑/− less. Absent depths carry no tick or control, so
// the dial simply ends clean. With no JS every depth block renders (nothing hidden).
(function () {
  "use strict";
  const root = document.querySelector(".term-node");
  if (!root) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const max = parseInt(root.dataset.maxDepth, 10) || 1;
  const blocks = [...root.querySelectorAll(".depth-block")];
  const ticks = [...root.querySelectorAll(".dial-tick")];
  const deeper = root.querySelector(".dial-deeper");
  const less = root.querySelector(".dial-less");
  const dial = root.querySelector(".dial");

  // §13 IN: the §7 card ("full entry →") and lateral relationship links land at DEPTH 2.
  let current = 1;
  const m = location.hash.match(/^#depth-(\d+)$/);
  if (m) current = Math.min(max, Math.max(1, parseInt(m[1], 10)));

  function apply(animateLevel) {
    blocks.forEach((b) => {
      const lvl = +b.dataset.depth;
      const show = lvl <= current;
      b.hidden = !show;
      b.classList.toggle("step", !reduce && show && lvl === animateLevel);
    });
    ticks.forEach((t) => {
      const lvl = +t.dataset.depth;
      t.classList.toggle("reached", lvl <= current);
      t.classList.toggle("current", lvl === current);
      t.setAttribute("aria-current", lvl === current ? "true" : "false");
    });
    if (deeper) deeper.disabled = current >= max;
    if (less) less.disabled = current <= 1;
  }

  function go(next) {
    next = Math.min(max, Math.max(1, next));
    if (next === current) return;
    const deepening = next > current;
    current = next;
    apply(deepening ? current : null); // animate only the newly-appended (deeper) block
  }

  if (deeper) deeper.addEventListener("click", () => go(current + 1));
  if (less) less.addEventListener("click", () => go(current - 1));
  if (dial) dial.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown" || e.key === "+") { e.preventDefault(); go(current + 1); }
    else if (e.key === "ArrowUp" || e.key === "-") { e.preventDefault(); go(current - 1); }
  });

  apply(null);
})();
