#!/usr/bin/env python3
"""Build vedantjumle.com: render content.yml into _site/.

    python3 build.py                     # writes _site/
    python3 -m http.server -d _site      # preview at http://localhost:8000

Exits non-zero with a readable list of problems if content.yml is invalid,
so a broken edit fails the GitHub Action instead of breaking the live site.
"""
import shutil
import sys
from pathlib import Path

import yaml
from jinja2 import Environment, FileSystemLoader

ROOT = Path(__file__).resolve().parent
OUT = ROOT / "_site"
CONTENT = ROOT / "content.yml"

# Copied into _site/ unchanged.
STATIC = ["seahorse", "photo.jpg", "og-image.png", "cv.pdf", "CNAME", "sitemap.xml"]

# ids used by page sections and the old terminal site's hash links.
RESERVED_IDS = {"about", "research", "blog", "projects", "contact",
                "h-about", "h-research", "h-blog", "h-projects", "theme-toggle"}


class Problems(list):
    def need(self, obj, keys, where):
        if not isinstance(obj, dict):
            self.append(f"{where}: expected a set of fields, got {type(obj).__name__}")
            return False
        for k in keys:
            v = obj.get(k)
            if v is None or (isinstance(v, str) and not v.strip()):
                self.append(f"{where}: missing '{k}'")
        return True

    def need_list(self, data, key):
        v = data.get(key)
        if not isinstance(v, list):
            self.append(f"'{key}' must be a list of items (each starting with '- ')")
            return []
        return v


def validate(data):
    p = Problems()
    if not isinstance(data, dict):
        return ["content.yml is empty or not a set of fields"]

    p.need(data, ["name", "tagline", "photo", "site", "contact", "copyright_year"], "content.yml")
    if isinstance(data.get("site"), dict):
        p.need(data["site"], ["title", "description", "share_description", "url"], "site")
    if isinstance(data.get("contact"), dict):
        p.need(data["contact"], ["email", "github", "linkedin"], "contact")

    ids = {}

    def claim(i, where):
        if not isinstance(i, str) or not i.strip():
            return
        if i in RESERVED_IDS:
            p.append(f"{where}: id '{i}' is reserved for a page section, pick another")
        elif i in ids:
            p.append(f"{where}: id '{i}' is already used by {ids[i]}")
        else:
            ids[i] = where

    for n, l in enumerate(p.need_list(data, "links")):
        if p.need(l, ["label", "url"], f"links[{n}]") and l.get("id"):
            claim(l["id"], f"links[{n}]")

    for n, para in enumerate(p.need_list(data, "about")):
        if not isinstance(para, str) or not para.strip():
            p.append(f"about[{n}]: each paragraph must be text")

    f = data.get("featured")
    if f is not None:
        if p.need(f, ["id", "kicker", "title", "url", "summary"], "featured"):
            claim(f.get("id"), "featured")
            if f.get("paper") is not None:
                p.need(f["paper"], ["label", "title"], "featured.paper")
            for n, b in enumerate(f.get("buttons") or []):
                p.need(b, ["label", "url"], f"featured.buttons[{n}]")
            for n, e in enumerate(f.get("explainers") or []):
                p.need(e, ["title", "url"], f"featured.explainers[{n}]")

    sections = {
        "research": ["id", "title", "url"],
        "writing": ["id", "title", "url", "source"],
        "projects": ["id", "title", "url", "desc"],
    }
    for section, keys in sections.items():
        for n, item in enumerate(p.need_list(data, section)):
            where = f"{section}[{n}]" + (f" ({item.get('title')})" if isinstance(item, dict) and item.get("title") else "")
            if not p.need(item, keys, where):
                continue
            claim(item.get("id"), where)
            if section == "projects":
                if not isinstance(item.get("tags", []), list):
                    p.append(f"{where}: 'tags' must be a list, like [PyTorch, RL]")
                for m, l in enumerate(item.get("links") or []):
                    p.need(l, ["label", "url"], f"{where}.links[{m}]")
    return p


def main():
    try:
        data = yaml.safe_load(CONTENT.read_text(encoding="utf-8"))
    except yaml.YAMLError as e:
        sys.exit(f"content.yml is not valid YAML:\n{e}")

    problems = validate(data)
    if problems:
        print("content.yml has problems:", file=sys.stderr)
        for msg in problems:
            print(f"  - {msg}", file=sys.stderr)
        sys.exit(1)

    env = Environment(loader=FileSystemLoader(ROOT / "templates"), autoescape=True, keep_trailing_newline=True)
    html = env.get_template("index.html.j2").render(**data)

    if OUT.exists():
        shutil.rmtree(OUT)
    OUT.mkdir()
    (OUT / "index.html").write_text(html, encoding="utf-8")
    for name in STATIC:
        src = ROOT / name
        if src.is_dir():
            shutil.copytree(src, OUT / name)
        elif src.exists():
            shutil.copy2(src, OUT / name)
        else:
            sys.exit(f"missing file to publish: {name}")

    counts = ", ".join(f"{len(data[k])} {k}" for k in ("research", "writing", "projects"))
    print(f"built _site/ ({counts})")


if __name__ == "__main__":
    main()
