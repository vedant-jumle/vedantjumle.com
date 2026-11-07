# vedantjumle.com

Personal website of Vedant Jumle, hosted on GitHub Pages.

## Editing content

All homepage content lives in **`content.yml`**: bio, links, research, writing and projects. Edit it, commit and push to `main`. A GitHub Action (`.github/workflows/pages.yml`) builds the page and deploys it in about a minute.

If the YAML has a mistake (a missing title, a duplicate id, broken syntax), the build fails, GitHub emails you the error, and the live site stays on the last good version. Check the **Actions** tab for the message.

## Preview locally

```bash
pip install -r requirements.txt     # once
python3 build.py && python3 -m http.server -d _site
```

Then open http://localhost:8000.

## Files

- `content.yml` — all homepage content.
- `templates/index.html.j2` — page layout and styles. Edit this only to change the design.
- `build.py` — validates `content.yml`, renders the template, and assembles `_site/` (git-ignored).
- `seahorse/` — Seahorse project page and explainers (hand-written HTML, copied as-is).
- `photo.jpg`, `og-image.png`, `cv.pdf`, `CNAME`, `sitemap.xml` — copied as-is.
