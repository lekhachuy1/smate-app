#!/usr/bin/env python3
"""Build SMate from src/ into two outputs.

  index.html        standalone page for GitHub Pages / opening locally
  dist/app.html     body-only page for publishing as a Claude Artifact

Run:  python build.py
"""
import io
import os
import re

ROOT = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(ROOT, "src")


def read(name):
    with io.open(os.path.join(SRC, name), encoding="utf-8") as fh:
        return fh.read()


def write(path, text):
    full = os.path.join(ROOT, path)
    os.makedirs(os.path.dirname(full) or ".", exist_ok=True)
    with io.open(full, "w", encoding="utf-8", newline="\n") as fh:
        fh.write(text)
    return len(text.encode("utf-8"))


markup = read("app.html").rstrip() + "\n"
script = read("app.js").rstrip() + "\n"

body = markup + "\n<script>\n" + script + "</script>\n"
n_art = write(os.path.join("dist", "app.html"), body)

title = re.search(r"<title>(.*?)</title>", markup, re.S)
title = title.group(1).strip() if title else "SMate"

head_tags = re.findall(r'^[ \t]*(<title>.*?</title>|<(?:meta|link)\b[^>]*>)[ \t]*$', markup, re.M | re.S)
rest = markup
for tag in head_tags:
    rest = rest.replace(tag, "", 1)
head_tags = [t.strip() for t in head_tags if "claude:viewport-fit-sides" not in t]
assert any(t.startswith("<title>") for t in head_tags), "title tag not lifted into <head>"

standalone = (
    "<!doctype html>\n"
    '<html lang="vi">\n'
    "<head>\n"
    '<meta charset="utf-8">\n'
    '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n'
    '<meta name="description" content="SMate - bản mẫu giao diện ứng dụng đặt sân thể thao và ghép kèo.">\n'
    '<meta name="theme-color" content="#1452e5">\n'
    '<link rel="icon" href="assets/logo.png">\n'
    + "\n".join(head_tags) + "\n"
    "<style>\n"
    ":root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px);color-scheme:light}\n"
    "html,body{margin:0}\n"
    "img{max-width:100%}\n"
    "[hidden]{display:none!important}\n"
    "</style>\n"
    "</head>\n"
    "<body>\n"
    + rest.lstrip()
    + "\n<script>\n" + script + "</script>\n"
    "</body>\n</html>\n"
)
n_std = write("index.html", standalone)

print("index.html      %6.1f KB" % (n_std / 1024.0))
print("dist/app.html   %6.1f KB" % (n_art / 1024.0))
print("title           %s" % title)
