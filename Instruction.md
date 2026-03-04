# SparkPlus - Instruction Manual

A comprehensive guide for setting up, managing, and maintaining the SparkPlus GitHub Pages repository and browser extension distribution.

---

## Table of Contents

- [1. Prerequisites](#1-prerequisites)
- [2. Repository Setup](#2-repository-setup)
  - [2.1 Creating the GitHub Repository](#21-creating-the-github-repository)
  - [2.2 Uploading the Project Files](#22-uploading-the-project-files)
- [3. GitHub Pages Configuration](#3-github-pages-configuration)
  - [3.1 Enabling GitHub Pages](#31-enabling-github-pages)
  - [3.2 Custom Domain Setup](#32-custom-domain-setup)
  - [3.3 DNS Configuration](#33-dns-configuration)
  - [3.4 Verifying the Deployment](#34-verifying-the-deployment)
- [4. Directory Structure](#4-directory-structure)
  - [4.1 Repository Root (GitHub Pages)](#41-repository-root-github-pages)
  - [4.2 PROD Directory](#42-prod-directory)
  - [4.3 DEV Directory](#43-dev-directory)
  - [4.4 Other Directory](#44-other-directory)
- [5. File Reference](#5-file-reference)
  - [5.1 GitHub Pages Files](#51-github-pages-files)
  - [5.2 Addon Distribution Files](#52-addon-distribution-files)
  - [5.3 Configuration Files](#53-configuration-files)
- [6. Publishing a New Release](#6-publishing-a-new-release)
  - [6.1 Automated Release (GitHub Actions)](#61-automated-release-github-actions)
  - [6.2 Manual Release Procedure](#62-manual-release-procedure)
- [7. Rollback Procedure](#7-rollback-procedure)
- [8. Maintaining the Landing Page](#8-maintaining-the-landing-page)
  - [8.1 Editing Content](#81-editing-content)
  - [8.2 Updating the Changelog](#82-updating-the-changelog)
  - [8.3 Modifying Styles](#83-modifying-styles)
  - [8.4 Logo and Icon Assets](#84-logo-and-icon-assets)
- [9. Troubleshooting](#9-troubleshooting)

---

## 1. Prerequisites

Before proceeding, ensure the following requirements are met:

| Requirement              | Details                                                      |
|--------------------------|--------------------------------------------------------------|
| GitHub account           | Member of the [Images-by-Olofsson](https://github.com/Images-by-Olofsson) organisation |
| GitHub plan              | GitHub Team (required for private repository with GitHub Pages) |
| Git                      | Installed locally ([git-scm.com](https://git-scm.com))      |
| Domain ownership         | Access to DNS settings for `sparkplus.se`                    |
| Browser                  | Chromium-based browser (Chrome, Edge, Brave) for testing     |

---

## 2. Repository Setup

### 2.1 Creating the GitHub Repository

1. Navigate to [https://github.com/orgs/Images-by-Olofsson/repositories](https://github.com/orgs/Images-by-Olofsson/repositories).
2. Click **New repository**.
3. Configure the repository:
   - **Repository name:** `SparkPlus`
   - **Visibility:** Private (requires GitHub Team plan for GitHub Pages)
   - **Initialise:** Do not add a README (the project already includes one)
4. Click **Create repository**.
5. Add the following repository secrets under **Settings** > **Secrets and variables** > **Actions**:
   - `IP1`, `IP2`, `IP3`, `IP4` -- GitHub Pages A record IP addresses.

### 2.2 Uploading the Project Files

From the local project directory (`SparkPlus/`), run the following commands:

```bash
git init
git remote add origin https://github.com/Images-by-Olofsson/SparkPlus.git
git add .
git commit -m "Initial commit - SparkPlus GitHub Pages setup"
git branch -M main
git push -u origin main
```

---

## 3. GitHub Pages Configuration

### 3.1 Enabling GitHub Pages

1. Open the repository on GitHub: `https://github.com/Images-by-Olofsson/SparkPlus`.
2. Navigate to **Settings** > **Pages** (left sidebar).
3. Under **Build and deployment**:
   - **Source:** Deploy from a branch
   - **Branch:** `main`
   - **Folder:** `/(root)`
4. Click **Save**.

GitHub will begin building the site. The initial deployment typically completes within one to two minutes.

### 3.2 Custom Domain Setup

1. On the same **Settings** > **Pages** screen, locate the **Custom domain** field.
2. Enter `sparkplus.se` and click **Save**.
3. Enable **Enforce HTTPS** once DNS propagation is complete (this option appears after verification).

The `CNAME` file in the repository root already contains `sparkplus.se`. This file must remain in the repository to persist the custom domain setting across deployments.

### 3.3 DNS Configuration

Configure the following records at your domain registrar for `sparkplus.se`. The A record IP addresses are stored as repository secrets (`IP1` through `IP4`). Refer to the [GitHub Pages documentation](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site) for the current list.

**Option A -- CNAME record (recommended for subdomains like `www`):**

| Type  | Name  | Value                              | TTL  |
|-------|-------|------------------------------------|------|
| CNAME | www   | images-by-olofsson.github.io       | 3600 |

**Option B -- A records (required for apex domain `sparkplus.se`):**

Configure four A records pointing `@` to the GitHub Pages IP addresses stored in `IP1` through `IP4` repository secrets.

**Option C -- Combined (apex + www):**

Use both Option A and Option B to ensure `sparkplus.se` and `www.sparkplus.se` both resolve correctly.

DNS propagation may take up to 24 hours, though it typically completes within minutes. Ensure that Cloudflare proxy is disabled (DNS only) for all A records pointing to GitHub Pages.

### 3.4 Verifying the Deployment

1. After pushing to `main` and configuring DNS, navigate to `https://sparkplus.se`.
2. Confirm the landing page loads with the correct styling and content.
3. Click the **Download Latest** button and verify it initiates a download of `PROD-READY-SETUP.zip`.
4. Confirm the version badge displays the value from `version.txt`.

---

## 4. Directory Structure

### 4.1 Repository Root (GitHub Pages)

The repository root serves as the GitHub Pages source. It contains the following files that are served publicly at `sparkplus.se`:

- **`index.html`** -- The landing page with hero section, features, installation steps, changelog, and footer.
- **`assets/`** -- Contains `style.css`, `script.js`, `logos/` (Bird mascot images), `icons/` (feature card icons), and `Images/` (screenshot assets).
- **`version.txt`** -- A copy of the canonical version file, read by `script.js` to display the current version.
- **`CNAME`** -- Custom domain declaration for GitHub Pages.
- **`.nojekyll`** -- Prevents GitHub from processing files with Jekyll.

### 4.2 PROD Directory

The `PROD/` directory contains the addon distribution files:

- **`SparkPlus/PROD-READY-SETUP.zip`** -- The current production browser extension package.
- **`SparkPlus/version.txt`** -- The canonical version identifier. This is the source of truth; the root `version.txt` is a copy.

### 4.3 DEV Directory

The `DEV/` directory serves two purposes:

- **`old/`** -- Version archive. Every replaced production package is stored here with a versioned filename (e.g. `PROD-READY-SETUP-v2.0.0.zip`). The `ROLLBACK_LOG.md` file tracks all version transitions.
- **`test/`** -- Pre-release staging. Test builds are placed here for validation before promotion to production.

### 4.4 Other Directory

The `Other/` directory is a private workspace. It is excluded from version control via `.gitignore` rules (except `.gitkeep` and `README.md`). Use it for experimental files, personal notes, or temporary data.

---

## 5. File Reference

### 5.1 GitHub Pages Files

| File                         | Location          | Purpose                                                        |
|------------------------------|-------------------|----------------------------------------------------------------|
| `index.html`                 | Root              | Landing page with hero, features, installation steps, changelog |
| `style.css`                  | `assets/`         | Dark-theme responsive stylesheet using CSS custom properties    |
| `script.js`                  | `assets/`         | Fetches `version.txt`, populates version badges, randomises logo |
| `CNAME`                      | Root              | Custom domain declaration for GitHub Pages                     |
| `.nojekyll`                  | Root              | Prevents GitHub from processing files with Jekyll              |
| `version.txt`                | Root              | Version identifier displayed on the landing page               |
| `Bird-*.png`                 | `assets/logos/`   | Bird mascot images shown randomly in the navigation bar        |
| `discussion.png` etc.        | `assets/icons/`   | Feature card icons                                             |

### 5.2 Addon Distribution Files

| File                    | Location              | Purpose                                  |
|-------------------------|-----------------------|------------------------------------------|
| `PROD-READY-SETUP.zip` | `PROD/SparkPlus/`     | Current production browser extension     |
| `version.txt`           | `PROD/SparkPlus/`     | Canonical version identifier             |

### 5.3 Configuration Files

| File              | Location   | Purpose                                                    |
|-------------------|------------|------------------------------------------------------------|
| `.gitignore`      | Root       | Defines files and directories excluded from version control |
| `CNAME`           | Root       | Maps the GitHub Pages site to `sparkplus.se`               |
| `ROLLBACK_LOG.md` | `DEV/old/` | Tracks version history and rollback events                 |
| `release.yml`     | `.github/workflows/` | Automated release pipeline                          |

---

## 6. Publishing a New Release

### 6.1 Automated Release (GitHub Actions)

The repository includes a GitHub Actions workflow (`.github/workflows/release.yml`) that automates the release process. When a new `PROD-READY-SETUP.zip` is pushed to `PROD/SparkPlus/`, the workflow automatically:

1. Reads the current version from `PROD/SparkPlus/version.txt`.
2. Archives the previous package to `DEV/old/PROD-READY-SETUP-<old-version>.zip`.
3. Adds a new entry to `DEV/old/ROLLBACK_LOG.md`.
4. Generates a new version identifier in `vYYYY.MM.DD` format.
5. Updates `PROD/SparkPlus/version.txt` with the new version.
6. Copies the updated `version.txt` to the repository root for the landing page.
7. Commits and pushes all changes.

To publish a new release using the automated pipeline:

1. Place the tested addon package as `PROD/SparkPlus/PROD-READY-SETUP.zip`.
2. Commit and push to `main`.
3. The GitHub Action will handle the rest.

### 6.2 Manual Release Procedure

If the automated pipeline is unavailable, follow these steps:

1. Copy the current production package:
   ```bash
   cp PROD/SparkPlus/PROD-READY-SETUP.zip DEV/old/PROD-READY-SETUP-v2.0.0.zip
   ```
2. Update `DEV/old/ROLLBACK_LOG.md` by adding a new row:
   ```
   | 2026-04-15 | v2.0.0  | Replaced by v2.1.0 | Archived |
   ```
3. Replace the addon with the new version.
4. Update the version files:
   ```bash
   echo "v2.1.0" > PROD/SparkPlus/version.txt
   cp PROD/SparkPlus/version.txt version.txt
   ```
5. Commit and push:
   ```bash
   git add .
   git commit -m "Release v2.1.0"
   git push origin main
   ```
6. Verify the deployment at `https://sparkplus.se`.

---

## 7. Rollback Procedure

If a production release needs to be reverted:

1. Identify the target version in `DEV/old/ROLLBACK_LOG.md`.
2. Restore the archived package:
   ```bash
   cp DEV/old/PROD-READY-SETUP-v2.0.0.zip PROD/SparkPlus/PROD-READY-SETUP.zip
   ```
3. Update the version files:
   ```bash
   echo "v2.0.0" > PROD/SparkPlus/version.txt
   cp PROD/SparkPlus/version.txt version.txt
   ```
4. Document the rollback in `DEV/old/ROLLBACK_LOG.md`:
   ```
   | 2026-04-16 | v2.0.0  | Rollback from v2.1.0 - [reason] | Active |
   ```
5. Commit and push:
   ```bash
   git add .
   git commit -m "Rollback to v2.0.0"
   git push origin main
   ```

---

## 8. Maintaining the Landing Page

### 8.1 Editing Content

All page content is in `index.html` at the repository root. The page is structured into the following sections:

| Section        | HTML Element ID / Class | Description                                    |
|----------------|-------------------------|------------------------------------------------|
| Navigation     | `.navbar`               | Top navigation bar with logo and links         |
| Hero           | `.hero`                 | Title, subtitle, download button, version badge |
| Features       | `#features`             | Feature cards with custom PNG icons            |
| Installation   | `#installation`         | Step-by-step installation guide                |
| Changelog      | `#changelog`            | Latest version and release notes               |
| Footer         | `.footer`               | Description, author credit, copyright          |

### 8.2 Updating the Changelog

The changelog section in `index.html` contains static release notes. When publishing a new version:

1. Update the `<ul>` inside `.changelog-details` with the new release notes.
2. The version number and date are populated dynamically from `version.txt` by `script.js`.

### 8.3 Modifying Styles

All styles are defined in `assets/style.css` using CSS custom properties. To change the colour scheme, modify the variables in the `:root` selector:

```css
:root {
    --color-bg: #0f1117;
    --color-primary: #6366f1;
    --color-accent: #f59e0b;
    /* ... */
}
```

### 8.4 Logo and Icon Assets

The navigation bar displays a randomly selected Bird mascot image on each page load. The images are stored in `assets/logos/` and selected by `script.js`.

Feature card icons are stored in `assets/icons/` and referenced directly in `index.html`:

| Feature                | Icon File         |
|------------------------|-------------------|
| Real-Time Notifications | `discussion.png` |
| Ticket Overview         | `camera.png`     |
| Quick Actions           | `tools.png`      |
| Configurable            | `chip.png`       |

---

## 9. Troubleshooting

| Issue                                    | Solution                                                                                  |
|------------------------------------------|-------------------------------------------------------------------------------------------|
| Site shows 404 after deployment          | Verify GitHub Pages source is set to `main` branch, `/(root)` folder.                    |
| Custom domain not working                | Confirm DNS records are correctly configured. Ensure Cloudflare proxy is disabled (DNS only). Check that `CNAME` in the repository root contains `sparkplus.se`. |
| HTTPS not available                      | DNS must propagate first. Wait up to 24 hours, then enable **Enforce HTTPS** in settings. |
| Version badge shows `--`                 | Ensure `version.txt` exists in the repository root and contains the current version string. |
| Download button returns 404              | Verify `PROD/SparkPlus/PROD-READY-SETUP.zip` exists. The download URL uses the GitHub raw link. |
| Changes not reflected after push         | GitHub Pages may cache content. Wait a few minutes or clear browser cache (Ctrl+Shift+R). |
| `.nojekyll` file missing                 | Recreate the empty file at the repository root to prevent Jekyll processing.              |
| CORS error on version.txt               | Ensure `version.txt` is served from the same domain (`/version.txt`), not from `raw.githubusercontent.com`. |
| Cloudflare Error 521                     | Disable Cloudflare proxy (orange cloud to grey) for all A records pointing to GitHub Pages. |
