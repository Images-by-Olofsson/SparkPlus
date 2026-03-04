# SparkPlus

A Chromium-based browser extension that integrates directly with the Spark ticketing API, delivering real-time ticket monitoring, status change notifications, SLA tracking, and time reporting from the browser toolbar.

**Domain:** [sparkplus.se](https://sparkplus.se)  
**Repository:** [Images-by-Olofsson/SparkPlus](https://github.com/Images-by-Olofsson/SparkPlus)  
**Author:** Linus Olofsson, Specialist @ Cloud and Modern Workplace -- Iver

---

## Project Structure

```
SparkPlus/
|
+-- index.html                   Landing page (GitHub Pages root)
+-- version.txt                  Version identifier (served to site)
+-- CNAME                        Custom domain configuration
+-- .nojekyll                    Bypass Jekyll processing
+-- assets/
|   +-- style.css                Stylesheet
|   +-- script.js                Client-side logic
|   +-- logos/                   Bird mascot images (navbar)
|   +-- icons/                   Feature card icons
|   +-- Images/                  Screenshot assets
|
+-- PROD/                        Production - published releases
|   +-- SparkPlus/
|   |   +-- PROD-READY-SETUP.zip Current production addon package
|   |   +-- version.txt          Canonical version identifier
|   +-- README.md                PROD documentation
|
+-- DEV/                         Development & version archive
|   +-- old/                     Archived previous versions
|   |   +-- ROLLBACK_LOG.md      Version rollback history
|   +-- test/                    Current test builds
|   +-- README.md                DEV documentation
|
+-- Other/                       Private experiments & notes
|   +-- .gitkeep
|
+-- .github/
|   +-- workflows/
|       +-- release.yml          Automated release pipeline
|
+-- .gitignore                   Repository ignore rules
+-- README.md                    This file
+-- Instruction.md               Detailed usage guide
```

---

## Table of Contents

- [Overview](#overview)
- [GitHub Pages](#github-pages)
- [Automated Release Pipeline](#automated-release-pipeline)
- [Releases](#releases)
- [Development](#development)
- [License](#license)

---

## Overview

SparkPlus is distributed as a Chromium-based browser extension. The repository is organised into three primary directories:

- **Root** -- Contains the GitHub Pages site files (`index.html`, `assets/`, `CNAME`, `.nojekyll`, `version.txt`).
- **PROD** -- Contains the latest packaged addon (`PROD-READY-SETUP.zip`) and the canonical version file.
- **DEV** -- Contains archived versions for rollback purposes and test builds.
- **Other** -- A private workspace for experimental files and notes.

## GitHub Pages

The site is served from the repository root (`/`) and mapped to the custom domain `sparkplus.se`.

**GitHub Pages configuration:**

| Setting         | Value                     |
|-----------------|---------------------------|
| Source branch   | `main`                    |
| Source folder   | `/(root)`                 |
| Custom domain   | `sparkplus.se`            |
| Enforce HTTPS   | Enabled                   |

DNS records are configured via the domain registrar. The required A record IP addresses are stored as repository secrets (`IP1` through `IP4`) and are not published in this document. Refer to the GitHub Pages documentation for the current list of GitHub Pages IP addresses.

## Automated Release Pipeline

A GitHub Actions workflow (`.github/workflows/release.yml`) automates the release process. When a new `PROD-READY-SETUP.zip` is pushed to `PROD/SparkPlus/`, the workflow:

1. Reads the current version from `PROD/SparkPlus/version.txt`.
2. Archives the previous package to `DEV/old/` with a versioned filename.
3. Updates `ROLLBACK_LOG.md` with the version transition.
4. Generates a new version identifier and updates `PROD/SparkPlus/version.txt`.
5. Copies the updated `version.txt` to the repository root for the GitHub Pages site.
6. Commits and pushes all changes.

## Releases

Each release is placed in `PROD/SparkPlus/PROD-READY-SETUP.zip`. The version identifier is stored in `PROD/SparkPlus/version.txt` and mirrored to `version.txt` in the repository root for the landing page. When a new version is published, the previous package is moved to `DEV/old/` with a versioned filename and the rollback log is updated.

## Development

Test builds are placed in `DEV/test/`. Refer to `DEV/README.md` for the development workflow and rollback procedures.

## License

This project is proprietary. All rights reserved by Images-by-Olofsson.
