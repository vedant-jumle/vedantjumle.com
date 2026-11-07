# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Project

Static personal website for Vedant Jumle, AI researcher. Domain vedantjumle.com (via `CNAME`), hosted on GitHub Pages from `main`. No build step, no framework, no dependencies besides Google Fonts and Plausible analytics.

## Files

- [index.html](index.html) — the home page. All content (bio, research, writing, projects) is written directly in the HTML; CSS and the small JS are inline. Edit this file to update content.
- [seahorse/](seahorse/) — Seahorse project page plus explainers in `binding/`, `subject-position/`, `automatic-selection/`. Each is a standalone HTML page.
- [photo.jpg](photo.jpg), [og-image.png](og-image.png), [cv.pdf](cv.pdf) — assets. The CV link on the home page currently points to Google Drive, not `cv.pdf`.
- [sitemap.xml](sitemap.xml) — list real page URLs only (no `#hash` URLs).

## Design system

The home page and Seahorse pages share one look:
- Fonts: Source Serif 4 (headings, lede), IBM Plex Sans (body), Fira Code (labels/meta).
- Colour tokens on `:root` (`--bg`, `--ink`, `--accent`, `--link`, …) with dark-mode overrides via `prefers-color-scheme` and `[data-theme]`.
- The theme toggle stores the choice in `localStorage` under `seahorse-theme` on every page, so the preference carries across the site.

## URL compatibility (keep working)

The old terminal site used hash links like `#about`, `#cv`, `#contact`, `#projects/<slug>`, `#research/<slug>`, `#blog/<slug>`. These must keep working:
- Every section and every list item has an `id` equal to its old slug (e.g. `id="buzztrends"`, `id="seahorse"`).
- A small script in `index.html` maps `#section/slug` (and trailing slashes) to the element with id `slug`, scrolls to it and briefly highlights it.
- When adding an item, give it a stable `id`; never rename existing ids.
- Real paths (`/seahorse/...`, `/photo.jpg`, `/og-image.png`, `/cv.pdf`) must not move.

## Adding content

- Research / project / writing item: copy an existing `<li class="entry" id="...">` block in the matching section of `index.html`.
- New Seahorse explainer: add a folder under `seahorse/`, link it from `seahorse/index.html` and the "Explainers" list on the home page, and add it to `sitemap.xml`.

## Testing

`python3 -m http.server` in the repo root, then check:
1. Light and dark themes, and the toggle.
2. Phone width (~390px): no horizontal scroll.
3. Legacy links: `/#projects/buzztrends`, `/#research/seahorse`, `/#about`, `/#cv`.
4. Links from the Seahorse pages back to `/`.

Push to `main` to deploy.
