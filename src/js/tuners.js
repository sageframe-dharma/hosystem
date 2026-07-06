// tuners.js — DEV-ONLY by-feel tuner panel (spec §7 / KICKSTART build order 6). Nothing
// visual is hard-coded that the Basis owns: every motion parameter reads from the one CSS
// tokens layer (:root in site.css, each value cited to the basis). This panel exposes the
// by-feel-adjustable ones so the practitioner can see them moving during a landing pass, then
// commit landed values back into the Basis. It is NOT site chrome: it renders only when the
// URL carries ?tuners, so ordinary visitors never see it and it ships inert. (Sister dev
// param: ?flip in flip.js replays the §9 flip live, with no witness-log side effects.)
(function () {
  "use strict";
  if (!/[?&]tuners\b/.test(location.search)) return; // dev-only gate

  // token → { label, min, max, step, unit }. Values read live from :root; the basis owns
  // the defaults (§4 the step, §9 the flip). Adjusting here does not change the Basis —
  // it lets a value be *seen moving* before it is landed.
  const TOKENS = [
    ["--step-dur", "step duration (§4)", 0, 400, 10, "ms"],
    ["--step-rise", "step rise (§4)", 0, 24, 1, "px"],
    ["--hold", "hold between steps (§4)", 0, 600, 20, "ms"],
    ["--interval", "sequence interval (§4)", 0, 800, 20, "ms"],
    ["--page-hold", "page-transition hold (§4)", 0, 300, 10, "ms"],
    ["--flip-dur", "flip duration (§9)", 0, 600, 20, "ms"],
  ];

  const root = document.documentElement;
  const cur = (name) => parseFloat(getComputedStyle(root).getPropertyValue(name)) || 0;

  const panel = document.createElement("div");
  panel.setAttribute("role", "region");
  panel.setAttribute("aria-label", "dev tuners");
  Object.assign(panel.style, {
    position: "fixed", right: "8px", bottom: "8px", zIndex: 9999,
    background: "#eef1ef", border: "1px dashed #9b9e9d", padding: "8px 10px",
    font: "11px/1.4 'Source Code Pro',ui-monospace,monospace", color: "#1f2123",
    maxWidth: "260px", boxShadow: "none",
  });
  panel.innerHTML = '<strong>tuners</strong> · dev-only, not site chrome<br>' +
    '<span style="color:#5d5f60">values from the Basis tokens; land back into the Basis</span>';

  for (const [name, label, min, max, step, unit] of TOKENS) {
    const row = document.createElement("label");
    Object.assign(row.style, { display: "block", marginTop: "6px" });
    const out = document.createElement("span");
    const set = (v) => { root.style.setProperty(name, v + unit); out.textContent = ` ${v}${unit}`; };
    const input = document.createElement("input");
    input.type = "range"; input.min = min; input.max = max; input.step = step;
    input.value = cur(name);
    Object.assign(input.style, { width: "100%" });
    input.addEventListener("input", () => set(input.value));
    row.append(label, out, input);
    panel.appendChild(row);
    set(cur(name));
  }

  const reset = document.createElement("button");
  reset.textContent = "reset to Basis";
  Object.assign(reset.style, { marginTop: "8px", font: "inherit", cursor: "pointer", background: "none", border: "1px solid #9fb7c8", padding: "2px 6px" });
  reset.addEventListener("click", () => { for (const [n] of TOKENS) root.style.removeProperty(n); location.reload(); });
  panel.appendChild(reset);

  document.body.appendChild(panel);
})();
