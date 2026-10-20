# cookie-agent.github.io

Landing page for [cookie agent](https://github.com/cookie-agent/cookie-agent),
served at <https://cookie-agent.github.io/>. The documentation lives in the
separate `cookie-agent/doc` repository and is served under `/doc/`.

Plain HTML and CSS with no build step. The palette mirrors the TUI themes in
`crates/tui/src/theme.rs`; light or dark follows the visitor's system setting.

## Preview

```sh
python3 -m http.server 8765
```

## Deploy

Push to the `main` branch of `cookie-agent/cookie-agent.github.io`, then set
**Settings → Pages → Build and deployment** to *Deploy from a branch*,
`main`, `/ (root)`. `.nojekyll` keeps GitHub Pages from running Jekyll.

## Images

- `og.png`, the 1200×630 social card, is `og/card.html` rendered by Firefox:

  ```sh
  python3 -m http.server 8765 &
  firefox --headless --window-size=1200,630 --screenshot og.png http://127.0.0.1:8765/og/card.html
  ```

  then reduced to a 96-colour palette PNG (Pillow's `quantize`). Snap Firefox
  writes only under your home directory.
- `apple-touch-icon.png` is the logo at 180×180.
- `web-*.webp` are the web client, photographed by
  `scripts/web-screenshots.sh <dir>` in the cookie-agent repository (after
  `scripts/build-web.sh`), then saved as WebP at quality 82.

