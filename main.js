// Copy buttons: each [data-copy] names the id of the element whose text it copies.
for (const button of document.querySelectorAll("[data-copy]")) {
  button.addEventListener("click", async () => {
    const source = document.getElementById(button.dataset.copy);
    if (!source || !navigator.clipboard) return;
    try {
      await navigator.clipboard.writeText(source.textContent.trim());
    } catch {
      return;
    }
    button.classList.add("copied");
    setTimeout(() => button.classList.remove("copied"), 1600);
  });
}

// Preset preview: the panel's data-active attribute drives the CSS.
for (const panel of document.querySelectorAll(".presets")) {
  const buttons = panel.querySelectorAll(".seg button");
  for (const button of buttons) {
    button.addEventListener("click", () => {
      panel.dataset.active = button.dataset.preset;
      for (const other of buttons) {
        other.setAttribute("aria-pressed", String(other === button));
      }
    });
  }
}

// Install switch: every .install block follows the same platform, starting
// from the visitor's own.
const installs = document.querySelectorAll(".install");
function showPlatform(os) {
  for (const install of installs) {
    install.dataset.active = os;
    for (const button of install.querySelectorAll(".os-tabs button")) {
      button.setAttribute("aria-pressed", String(button.dataset.os === os));
    }
  }
}
for (const button of document.querySelectorAll(".os-tabs button")) {
  button.addEventListener("click", () => showPlatform(button.dataset.os));
}
if (/Windows/.test(navigator.userAgent)) showPlatform("windows");
