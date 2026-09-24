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

// Theme toggle: flip the theme on screen and remember the choice in the
// docs' Material palette record, so both sites follow the same setting.
const root = document.documentElement;
const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
const PALETTE_KEY = "/.__palette";
const palettes = {
  light: { index: 0, scheme: "default", media: "(prefers-color-scheme: light)", color: "#fbf4e6" },
  dark: { index: 1, scheme: "slate", media: "(prefers-color-scheme: dark)", color: "#201c16" },
};
const toggles = document.querySelectorAll(".theme-toggle");
function currentTheme() {
  return root.dataset.theme || (darkQuery.matches ? "dark" : "light");
}
function showTheme(theme) {
  if (theme) root.dataset.theme = theme;
  for (const meta of document.querySelectorAll('meta[name="theme-color"]')) {
    meta.content = palettes[currentTheme()].color;
  }
  const label = currentTheme() === "dark" ? "Switch to light mode" : "Switch to dark mode";
  for (const button of toggles) {
    button.setAttribute("aria-label", label);
    button.title = label;
  }
}
function storedTheme(record) {
  try {
    const scheme = JSON.parse(record)?.color?.scheme;
    return Object.keys(palettes).find((theme) => palettes[theme].scheme === scheme);
  } catch {
    return undefined;
  }
}
showTheme();
darkQuery.addEventListener("change", () => showTheme());
// A choice made in the docs in another tab applies here too.
window.addEventListener("storage", (event) => {
  if (event.key === PALETTE_KEY) showTheme(storedTheme(event.newValue));
});
for (const button of toggles) {
  button.addEventListener("click", () => {
    const theme = currentTheme() === "dark" ? "light" : "dark";
    showTheme(theme);
    const { index, scheme, media } = palettes[theme];
    try {
      localStorage.setItem(
        PALETTE_KEY,
        JSON.stringify({ index, color: { media, scheme, primary: "custom", accent: "custom" } }),
      );
    } catch {}
  });
}
