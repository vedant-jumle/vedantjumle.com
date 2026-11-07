# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Project

Personal website for Vedant Jumle, AI researcher. Domain vedantjumle.com, hosted on GitHub Pages with **build type "GitHub Actions"** (not branch deploy). Every push to `main` runs `.github/workflows/pages.yml`, which runs `python build.py` and deploys `_site/`.

## Files

- [content.yml](content.yml) — **all homepage content** (site meta, name, tagline, links, about paragraphs, featured Seahorse card, research, writing, projects, contact). Content changes go here, not in HTML.
- [templates/index.html.j2](templates/index.html.j2) — Jinja2 template with all CSS and the small inline JS (theme toggle, legacy hash routing). Design changes go here.
- [build.py](build.py) — loads and validates `content.yml` (required fields, unique ids, reserved section ids), renders the template with autoescape, copies static files into `_site/`. Exits non-zero with readable messages on problems.
- [seahorse/](seahorse/) — Seahorse project page plus explainers (`binding/`, `subject-position/`, `automatic-selection/`). Standalone hand-written HTML, copied as-is.
- `photo.jpg`, `og-image.png`, `cv.pdf`, `CNAME`, `sitemap.xml` — copied as-is. Anything new that must be published has to be added to `STATIC` in `build.py`.
- There is **no `index.html` in the repo root**; it's generated into `_site/` (git-ignored).

## Design system

Home and Seahorse pages share one look: Source Serif 4 (headings), IBM Plex Sans (body), Fira Code (labels). Colour tokens on `:root` with dark mode via `prefers-color-scheme` and `[data-theme]`. The theme toggle uses the `localStorage` key `seahorse-theme` on every page.

## URL compatibility (keep working)

The old terminal site used links like `#about`, `#cv`, `#contact`, `#projects/<slug>`, `#research/<slug>`, `#blog/<slug>`.
- Every item in `content.yml` has an `id` equal to its old slug; a script in the template maps `#section/slug` to the element with that id.
- Never rename existing ids. New items need a unique id.
- Real paths (`/seahorse/...`, `/photo.jpg`, `/og-image.png`, `/cv.pdf`) must not move.

## Testing

```bash
python3 build.py && python3 -m http.server -d _site
```
Check light and dark themes, phone width (~390px, no horizontal scroll), and legacy links such as `/#projects/buzztrends`, `/#research/seahorse`, `/#cv`.
