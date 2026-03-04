# SparkPlus

A browser extension that enhances the Spark ticketing system with real-time notifications, quick actions, and a streamlined interface.

**Domain:** [sparkplus.se](https://sparkplus.se)  
**Repository:** [Images-by-Olofsson](https://github.com/Images-by-Olofsson)

---

## Project Structure

```
SparkPlus/
|
+-- PROD/                        Production - published releases
|   +-- docs/                    GitHub Pages source (sparkplus.se)
|   |   +-- index.html           Landing page
|   |   +-- assets/
|   |   |   +-- style.css        Stylesheet
|   |   |   +-- script.js        Client-side logic
|   |   +-- CNAME                Custom domain configuration
|   |   +-- .nojekyll            Bypass Jekyll processing
|   +-- SparkPlus/
|   |   +-- addon.zip            Current production addon
|   |   +-- version.txt          Version identifier
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
+-- .gitignore                   Repository ignore rules
+-- README.md                    This file
+-- Instruction.md               Detailed usage guide
```

---

## Table of Contents

- [Overview](#overview)
- [GitHub Pages](#github-pages)
- [Releases](#releases)
- [Development](#development)
- [License](#license)

---

## Overview

SparkPlus is distributed as a Chromium-based browser extension. The repository is organised into three primary directories:

- **PROD** -- Contains the live GitHub Pages site and the latest packaged addon.
- **DEV** -- Contains archived versions for rollback purposes and test builds.
- **Other** -- A private workspace for experimental files and notes.

## GitHub Pages

The site is served from `PROD/docs/` and mapped to the custom domain `sparkplus.se`.

**GitHub Pages configuration:**

| Setting        | Value                     |
|----------------|---------------------------|
| Source branch   | `main`                   |
| Source folder   | `/PROD/docs`             |
| Custom domain   | `sparkplus.se`           |
| Enforce HTTPS   | Enabled                  |

DNS records required at your domain registrar:

| Type  | Name | Value                          |
|-------|------|--------------------------------|
| CNAME | @    | images-by-olofsson.github.io   |

Alternatively, for an apex domain, configure A records pointing to GitHub Pages IP addresses:

| Type | Name | Value           |
|------|------|-----------------|
| A    | @    | 185.199.108.153 |
| A    | @    | 185.199.109.153 |
| A    | @    | 185.199.110.153 |
| A    | @    | 185.199.111.153 |

## Releases

Each release is placed in `PROD/SparkPlus/addon.zip`. The version identifier is stored in `PROD/SparkPlus/version.txt`. When a new version is published, the previous `addon.zip` is moved to `DEV/old/` with a versioned filename and the rollback log is updated.

## Development

Test builds are placed in `DEV/test/`. Refer to `DEV/README.md` for the development workflow and rollback procedures.

## License

This project is proprietary. All rights reserved by Images-by-Olofsson.
