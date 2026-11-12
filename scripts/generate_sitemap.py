#!/usr/bin/env python3
"""Build sitemap.xml for sorkhpar.dev and the course sub-sites.

Usage:
  generate_sitemap.py OUTPUT_FILE MAIN_REPO_DIR COURSE_DIR [COURSE_DIR ...]

Each COURSE_DIR is a checkout of a course repository. The script reads that
repository's own GitHub Pages workflow (.github/workflows/*.yml, the job that
uploads the Pages artifact), replays its build steps, and lists every HTML page
in the folder that workflow publishes. So the sitemap always matches what is
served at https://sorkhpar.dev/<repo-name>/, even if a course changes how it
builds.
"""
import os
import subprocess
import sys
from urllib.parse import quote
from xml.sax.saxutils import escape

import yaml

BASE = "https://sorkhpar.dev"


def last_commit_date(repo_dir):
    return subprocess.check_output(
        ["git", "-C", repo_dir, "log", "-1", "--format=%cs"], text=True
    ).strip()


def entry(loc, lastmod, priority):
    return (
        "  <url>\n"
        f"    <loc>{escape(loc)}</loc>\n"
        f"    <lastmod>{lastmod}</lastmod>\n"
        f"    <priority>{priority}</priority>\n"
        "  </url>"
    )


def find_pages_job(course_dir):
    """Return (workflow file, job) of the course's GitHub Pages workflow:
    the job that uploads the Pages artifact."""
    wf_dir = os.path.join(course_dir, ".github", "workflows")
    for name in sorted(os.listdir(wf_dir)):
        if not name.endswith((".yml", ".yaml")):
            continue
        with open(os.path.join(wf_dir, name), encoding="utf-8") as fh:
            workflow = yaml.safe_load(fh) or {}
        for job in (workflow.get("jobs") or {}).values():
            for step in job.get("steps") or []:
                if "upload-pages-artifact" in str(step.get("uses", "")):
                    return name, job
    sys.exit(f"No GitHub Pages workflow found in {wf_dir}")


def run_pages_build(course_dir):
    """Run the `run:` steps of the course's Pages job, in order, exactly as its
    GitHub Action does, and return the folder it uploads to Pages."""
    wf_name, job = find_pages_job(course_dir)
    env = dict(os.environ, GITHUB_WORKSPACE=os.path.abspath(course_dir))
    for step in job["steps"]:
        if "upload-pages-artifact" in str(step.get("uses", "")):
            site = (step.get("with") or {}).get("path", "_site")
            if "${{" in site:
                sys.exit(f"{wf_name}: cannot resolve Pages path {site!r}")
            print(f"  site folder from {wf_name}: {site}")
            return os.path.join(course_dir, site)
        command = step.get("run")
        if not command:
            continue  # `uses:` steps (checkout, configure-pages) need nothing here
        if "${{" in command:
            sys.exit(f"{wf_name}: step {step.get('name')!r} uses ${{{{ }}}} expressions; "
                     "cannot replay it outside GitHub Actions")
        print(f"  running step from {wf_name}: {step.get('name', command.splitlines()[0])}")
        workdir = os.path.join(course_dir, step.get("working-directory", ""))
        subprocess.run(["bash", "-e", "-c", command], cwd=workdir,
                       env=env, check=True, stdout=subprocess.DEVNULL)
    sys.exit(f"{wf_name}: Pages upload step not reached")


def course_pages(course_dir):
    build_dir = run_pages_build(course_dir)
    pages = sorted(
        os.path.relpath(os.path.join(d, f), build_dir)
        for d, _, files in os.walk(build_dir)
        for f in files
        if f.endswith(".html")
    )
    return [p.replace(os.sep, "/") for p in pages if p != "index.html"]


def main():
    if len(sys.argv) < 4:
        sys.exit(__doc__)
    output, main_repo, course_dirs = sys.argv[1], sys.argv[2], sys.argv[3:]

    lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        entry(f"{BASE}/", last_commit_date(main_repo), "1.0"),
    ]
    total = 1
    for course_dir in course_dirs:
        name = os.path.basename(os.path.normpath(course_dir))
        print(name)
        lastmod = last_commit_date(course_dir)
        pages = course_pages(course_dir)
        lines.append(f"  <!-- {name} -->")
        lines.append(entry(f"{BASE}/{name}/", lastmod, "0.9"))
        for page in pages:
            priority = "0.8" if page.endswith(".section.html") else "0.6"
            lines.append(entry(f"{BASE}/{name}/{quote(page)}", lastmod, priority))
        total += 1 + len(pages)
        print(f"  {1 + len(pages)} pages")
    lines.append("</urlset>")

    with open(output, "w", encoding="utf-8") as fh:
        fh.write("\n".join(lines) + "\n")
    print(f"Wrote {total} URLs to {output}")


if __name__ == "__main__":
    main()
