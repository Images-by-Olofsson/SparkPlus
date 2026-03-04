# PROD - Production Directory

This directory contains the live GitHub Pages deployment and the current production release of SparkPlus.

---

## Structure

```
PROD/
+-- docs/                    GitHub Pages root
|   +-- index.html           Landing page (sparkplus.se)
|   +-- assets/
|   |   +-- style.css        Stylesheet
|   |   +-- script.js        Version loader & UI logic
|   +-- CNAME                Custom domain: sparkplus.se
|   +-- .nojekyll            Disables Jekyll processing
+-- SparkPlus/
|   +-- addon.zip            Current production addon package
|   +-- version.txt          Version identifier (e.g. v2026.03.04)
+-- README.md                This file
```

---

## Table of Contents

- [GitHub Pages](#github-pages)
- [Addon Package](#addon-package)
- [Version Management](#version-management)
- [Publishing a New Release](#publishing-a-new-release)

---

## GitHub Pages

The `docs/` folder is the source for GitHub Pages. It is configured to serve from the `main` branch at the path `/PROD/docs`.

| File           | Purpose                                              |
|----------------|------------------------------------------------------|
| `index.html`   | Landing page with download link and instructions     |
| `style.css`    | Dark-theme responsive stylesheet                     |
| `script.js`    | Fetches `version.txt` and populates the UI           |
| `CNAME`        | Maps the site to the custom domain `sparkplus.se`    |
| `.nojekyll`    | Prevents GitHub from running Jekyll on the source    |

## Addon Package

The file `SparkPlus/addon.zip` is the latest packaged browser extension. The download button on the landing page references this file via a relative path (`../SparkPlus/addon.zip`).

## Version Management

The file `SparkPlus/version.txt` contains the current version string. The landing page reads this file at runtime and displays the version in the hero section and changelog.

Format: `vYYYY.MM.DD` (e.g. `v2026.03.04`).

## Publishing a New Release

1. Move the current `SparkPlus/addon.zip` to `../DEV/old/addon-<version>.zip`.
2. Update `../DEV/old/ROLLBACK_LOG.md` with the version, date, and reason.
3. Place the new `addon.zip` in `SparkPlus/`.
4. Update `SparkPlus/version.txt` with the new version string.
5. Commit and push to `main`. GitHub Pages will deploy automatically.