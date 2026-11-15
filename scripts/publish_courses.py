#!/usr/bin/env python3
"""Copy the course sub-sites into this site's build, with analytics added.

Usage:
  publish_courses.py DIST_DIR COURSE_DIR [COURSE_DIR ...]

Each COURSE_DIR is a checkout of a course repository. The folder its own
GitHub Pages workflow publishes is copied to DIST_DIR/<repo-name>/, so it is
served at https://sorkhpar.dev/<repo-name>/. That folder is reused if the
sitemap step already built it, and built here otherwise.

The same analytics the main site uses are added before </head> in every
copied HTML page:
  - Microsoft Clarity, when the CLARITY_ID environment variable is set
    (the main site gets it the same way, in vite.config.ts);
  - Google Analytics, with the id from googleAnalytics.id in
    gitprofile.config.ts (the main site adds it at runtime in
    src/components/head-tag-editor).
The course repositories stay untouched, so the copies people download and run
locally carry no tracking.
"""
import os
import re
import shutil
import sys

from generate_sitemap import pages_site_dir, run_pages_build

REPO_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Same tag the main site gets from vite.config.ts.
CLARITY_SNIPPET = """<!-- Clarity tracking code for https://sorkhpar.dev/ -->
<script>    (function(c, l, a, r, i, t, y) {
  c[a] = c[a] || function() {
    (c[a].q = c[a].q || []).push(arguments);
  };
  t = l.createElement(r);
  t.async = 1;
  t.src = 'https://www.clarity.ms/tag/' + i + '?ref=bwt';
  y = l.getElementsByTagName(r)[0];
  y.parentNode.insertBefore(t, y);
})(window, document, 'clarity', 'script', '%s');</script>
"""

# Same tag the main site adds in src/components/head-tag-editor/index.tsx.
GA_SNIPPET = """<script async src="https://www.googletagmanager.com/gtag/js?id=%(id)s"></script>
<script>window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
gtag('js', new Date());
gtag('config', '%(id)s');
</script>
"""


def google_analytics_id():
    """googleAnalytics.id from gitprofile.config.ts, or "" when unset."""
    with open(os.path.join(REPO_ROOT, "gitprofile.config.ts"), encoding="utf-8") as fh:
        found = re.search(
            r"googleAnalytics:\s*{\s*id:\s*(['\"])(.*?)\1", fh.read()
        )
    if not found:
        sys.exit("gitprofile.config.ts: googleAnalytics.id not found")
    return found.group(2).strip()


def add_tags(site_dir, tags):
    """Insert each (marker, snippet) before </head> in every HTML page under
    site_dir, unless the page already contains the marker."""
    counts = {marker: 0 for marker, _ in tags}
    for d, _, files in os.walk(site_dir):
        for f in files:
            if not f.endswith(".html"):
                continue
            path = os.path.join(d, f)
            with open(path, encoding="utf-8") as fh:
                html = fh.read()
            if "</head>" not in html:
                continue
            new = "".join(s for m, s in tags if m not in html)
            if not new:
                continue
            for marker, _ in tags:
                if marker not in html:
                    counts[marker] += 1
            html = html.replace("</head>", new + "</head>", 1)
            with open(path, "w", encoding="utf-8", newline="") as fh:
                fh.write(html)
    return counts


def main():
    if len(sys.argv) < 3:
        sys.exit(__doc__)
    dist, course_dirs = sys.argv[1], sys.argv[2:]

    tags = []
    clarity_id = os.environ.get("CLARITY_ID", "").strip()
    if clarity_id:
        tags.append(("www.clarity.ms/tag/", CLARITY_SNIPPET % clarity_id))
    else:
        print("CLARITY_ID is not set: courses get no Clarity tag")
    ga_id = google_analytics_id()
    if ga_id:
        tags.append(("googletagmanager.com/gtag/js", GA_SNIPPET % {"id": ga_id}))
    else:
        print("googleAnalytics.id is empty: courses get no Google Analytics tag")

    for course_dir in course_dirs:
        name = os.path.basename(os.path.normpath(course_dir))
        print(name)
        site = pages_site_dir(course_dir)
        if not os.path.isdir(site):
            site = run_pages_build(course_dir)
        target = os.path.join(dist, name)
        if os.path.exists(target):
            sys.exit(f"{target} already exists in the build; refusing to overwrite it")
        shutil.copytree(site, target)
        for marker, count in add_tags(target, tags).items():
            print(f"  {marker}: added to {count} pages")


if __name__ == "__main__":
    main()
