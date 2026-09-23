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
