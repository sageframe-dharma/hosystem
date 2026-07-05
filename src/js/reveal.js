// reveal.js — §5 supersession reveal. Activating a superseded marker opens the facing
// panes (fell | replaced). Open/close is discrete.
(function () {
  "use strict";
  const panel = document.getElementById("supersession");
  if (!panel) return;
  document.querySelectorAll(".supersedes-marker").forEach((btn) => {
    btn.addEventListener("click", () => {
      const open = panel.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      if (open) panel.scrollIntoView({ block: "nearest" });
    });
  });
})();
