# cookie-agent.github.io

Landing page for [Cookie Agent](https://github.com/cookie-agent/cookie-agent),
served at <https://cookie-agent.github.io/>. The documentation lives in the
separate `cookie-agent/doc` repository and is served under `/doc/`.

Plain HTML and CSS with no build step. The look is the web client's Quiet Ink
(`crates/web/style/main.css`): its colour tokens, and Inter and JetBrains Mono
from `crates/web/assets/fonts` in `fonts/`. Light or dark follows the
visitor's system setting or the theme button, which the docs share.

## Preview

```sh
python3 -m http.server 8765
```

## Deploy

Push to the `main` branch of `cookie-agent/cookie-agent.github.io`, then set
**Settings → Pages → Build and deployment** to *Deploy from a branch*,
`main`, `/ (root)`. `.nojekyll` keeps GitHub Pages from running Jekyll.

## Images

- `og.png`, the 1200×630 social card, is `og/card.html` photographed by
  headless Chrome at 1200×630, then reduced to a 96-colour palette PNG
  (Pillow's `quantize`).
- `apple-touch-icon.png` is the logo at 180×180.
- `shots/` holds the screenshots, saved as WebP at quality 88 (90 for the
  TUI). In the cookie-agent repository, after `scripts/build-web.sh`:
  - `scripts/web-screenshots.sh <dir>` photographs the web client
    (`web-*.png`, `web-phone-*.png`, here `web-*.webp` and `phone-*.webp`)
    and the same session in the TUI (`tui-*.png`);
  - `scripts/web-screenshots.sh --share <dir>` photographs a reply with a
    chart and an HTML report (`share-*.png`), here cropped to the
    conversation and the report, 1183×610 from (257, 290).
