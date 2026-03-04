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
  - [4.1 PROD Directory](#41-prod-directory)
  - [4.2 DEV Directory](#42-dev-directory)
  - [4.3 Other Directory](#43-other-directory)
- [5. File Reference](#5-file-reference)
  - [5.1 GitHub Pages Files](#51-github-pages-files)
  - [5.2 Addon Distribution Files](#52-addon-distribution-files)
  - [5.3 Configuration Files](#53-configuration-files)
- [6. Publishing a New Release](#6-publishing-a-new-release)
  - [6.1 Preparing the Release](#61-preparing-the-release)
  - [6.2 Archiving the Previous Version](#62-archiving-the-previous-version)
  - [6.3 Deploying the New Version](#63-deploying-the-new-version)
- [7. Rollback Procedure](#7-rollback-procedure)
- [8. Maintaining the Landing Page](#8-maintaining-the-landing-page)
  - [8.1 Editing Content](#81-editing-content)
  - [8.2 Updating the Changelog](#82-updating-the-changelog)
  - [8.3 Modifying Styles](#83-modifying-styles)
- [9. Troubleshooting](#9-troubleshooting)

---

## 1. Prerequisites

Before proceeding, ensure the following requirements are met:

| Requirement              | Details                                                      |
|--------------------------|--------------------------------------------------------------|
| GitHub account           | Member of the [Images-by-Olofsson](https://github.com/Images-by-Olofsson) organisation |
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
   - **Visibility:** Public (required for GitHub Pages on free plans) or Private (requires GitHub Pro/Team)
   - **Initialise:** Do not add a README (the project already includes one)
4. Click **Create repository**.

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
   - **Folder:** `/PROD/docs`
4. Click **Save**.

GitHub will begin building the site. The initial deployment typically completes within one to two minutes.

### 3.2 Custom Domain Setup

1. On the same **Settings** > **Pages** screen, locate the **Custom domain** field.
2. Enter `sparkplus.se` and click **Save**.
3. Enable **Enforce HTTPS** once DNS propagation is complete (this option appears after verification).

The `CNAME` file in `PROD/docs/` already contains `sparkplus.se`. This file must remain in the repository to persist the custom domain setting across deployments.

### 3.3 DNS Configuration

Configure the following records at your domain registrar for `sparkplus.se`:

**Option A -- CNAME record (recommended for subdomains like `www`):**

| Type  | Name  | Value                              | TTL  |
|-------|-------|------------------------------------|------|
| CNAME | www   | images-by-olofsson.github.io       | 3600 |

**Option B -- A records (required for apex domain `sparkplus.se`):**

| Type | Name | Value           | TTL  |
|------|------|-----------------|------|
| A    | @    | 185.199.108.153 | 3600 |
| A    | @    | 185.199.109.153 | 3600 |
| A    | @    | 185.199.110.153 | 3600 |
| A    | @    | 185.199.111.153 | 3600 |

**Option C -- Combined (apex + www):**

Use both Option A and Option B to ensure `sparkplus.se` and `www.sparkplus.se` both resolve correctly.

DNS propagation may take up to 24 hours, though it typically completes within minutes.

### 3.4 Verifying the Deployment

1. After pushing to `main` and configuring DNS, navigate to `https://sparkplus.se`.
2. Confirm the landing page loads with the correct styling and content.
3. Click the **Download Latest** button and verify it initiates a download of `addon.zip`.
4. Confirm the version badge displays the value from `PROD/SparkPlus/version.txt`.

---

## 4. Directory Structure

### 4.1 PROD Directory

The `PROD/` directory is the production environment. It contains two subdirectories:

- **`docs/`** -- The GitHub Pages source. All files in this directory are served publicly at `sparkplus.se`.
- **`SparkPlus/`** -- The addon distribution directory. Contains the packaged extension and version metadata.

Changes to any file in `PROD/` trigger a GitHub Pages rebuild when pushed to `main`.

### 4.2 DEV Directory

The `DEV/` directory serves two purposes:

- **`old/`** -- Version archive. Every replaced production addon is stored here with a versioned filename (e.g. `addon-v2026.03.04.zip`). The `ROLLBACK_LOG.md` file tracks all version transitions.
- **`test/`** -- Pre-release staging. Test builds are placed here for validation before promotion to production.

### 4.3 Other Directory

The `Other/` directory is a private workspace. It is excluded from version control via `.gitignore` rules (except `.gitkeep` and `README.md`). Use it for experimental files, personal notes, or temporary data.

---

## 5. File Reference

### 5.1 GitHub Pages Files

| File                         | Location          | Purpose                                                        |
|------------------------------|-------------------|----------------------------------------------------------------|
| `index.html`                 | `PROD/docs/`      | Landing page with hero, features, installation steps, changelog |
| `style.css`                  | `PROD/docs/assets/`| Dark-theme responsive stylesheet using CSS custom properties    |
| `script.js`                  | `PROD/docs/assets/`| Fetches `version.txt` at runtime, populates version badges     |
| `CNAME`                      | `PROD/docs/`      | Custom domain declaration for GitHub Pages                     |
| `.nojekyll`                  | `PROD/docs/`      | Prevents GitHub from processing files with Jekyll              |

### 5.2 Addon Distribution Files

| File            | Location              | Purpose                                  |
|-----------------|-----------------------|------------------------------------------|
| `addon.zip`     | `PROD/SparkPlus/`     | Current production browser extension     |
| `version.txt`   | `PROD/SparkPlus/`     | Version identifier in `vYYYY.MM.DD` format |

### 5.3 Configuration Files

| File              | Location   | Purpose                                                    |
|-------------------|------------|------------------------------------------------------------|
| `.gitignore`      | Root       | Defines files and directories excluded from version control |
| `CNAME`           | `PROD/docs/`| Maps the GitHub Pages site to `sparkplus.se`               |
| `ROLLBACK_LOG.md` | `DEV/old/` | Tracks version history and rollback events                 |

---

## 6. Publishing a New Release

### 6.1 Preparing the Release

1. Ensure the new addon has been tested. Place the test build in `DEV/test/addon-test.zip` and validate functionality.
2. Determine the new version string using the format `vYYYY.MM.DD` (e.g. `v2026.04.15`).

### 6.2 Archiving the Previous Version

1. Copy the current production addon:
   ```bash
   cp PROD/SparkPlus/addon.zip DEV/old/addon-v2026.03.04.zip
   ```
2. Update `DEV/old/ROLLBACK_LOG.md` by adding a new row:
   ```
   | 2026-04-15 | v2026.03.04  | Replaced by v2026.04.15 | Archived |
   ```

### 6.3 Deploying the New Version

1. Replace the addon:
   ```bash
   cp DEV/test/addon-test.zip PROD/SparkPlus/addon.zip
   ```
2. Update the version file:
   ```bash
   echo "v2026.04.15" > PROD/SparkPlus/version.txt
   ```
3. Commit and push:
   ```bash
   git add .
   git commit -m "Release v2026.04.15"
   git push origin main
   ```
4. Verify the deployment at `https://sparkplus.se`. The version badge should update to reflect `v2026.04.15`.

---

## 7. Rollback Procedure

If a production release needs to be reverted:

1. Identify the target version in `DEV/old/ROLLBACK_LOG.md`.
2. Restore the archived addon:
   ```bash
   cp DEV/old/addon-v2026.03.04.zip PROD/SparkPlus/addon.zip
   ```
3. Update the version file:
   ```bash
   echo "v2026.03.04" > PROD/SparkPlus/version.txt
   ```
4. Document the rollback in `DEV/old/ROLLBACK_LOG.md`:
   ```
   | 2026-04-16 | v2026.03.04  | Rollback from v2026.04.15 - [reason] | Active |
   ```
5. Commit and push:
   ```bash
   git add .
   git commit -m "Rollback to v2026.03.04"
   git push origin main
   ```

---

## 8. Maintaining the Landing Page

### 8.1 Editing Content

All page content is in `PROD/docs/index.html`. The page is structured into the following sections:

| Section        | HTML Element ID / Class | Description                          |
|----------------|-------------------------|--------------------------------------|
| Navigation     | `.navbar`               | Top navigation bar with links        |
| Hero           | `.hero`                 | Title, subtitle, download button     |
| Features       | `#features`             | Feature cards in a responsive grid   |
| Installation   | `#installation`         | Step-by-step installation guide      |
| Changelog      | `#changelog`            | Latest version and release notes     |
| Footer         | `.footer`               | Copyright and links                  |

### 8.2 Updating the Changelog

The changelog section in `index.html` contains static release notes. When publishing a new version:

1. Update the `<ul>` inside `.changelog-details` with the new release notes.
2. The version number and date are populated dynamically from `version.txt` by `script.js`.

### 8.3 Modifying Styles

All styles are defined in `PROD/docs/assets/style.css` using CSS custom properties. To change the colour scheme, modify the variables in the `:root` selector:

```css
:root {
    --color-bg: #0f1117;
    --color-primary: #6366f1;
    --color-accent: #f59e0b;
    /* ... */
}
```

---

## 9. Troubleshooting

| Issue                                    | Solution                                                                                  |
|------------------------------------------|-------------------------------------------------------------------------------------------|
| Site shows 404 after deployment          | Verify GitHub Pages source is set to `main` branch, `/PROD/docs` folder.                 |
| Custom domain not working                | Confirm DNS records are correctly configured. Check `PROD/docs/CNAME` contains `sparkplus.se`. |
| HTTPS not available                      | DNS must propagate first. Wait up to 24 hours, then enable **Enforce HTTPS** in settings. |
| Version badge shows `--`                 | Ensure `PROD/SparkPlus/version.txt` exists and is accessible via the relative path.       |
| Download button returns 404              | Verify `PROD/SparkPlus/addon.zip` exists. The download link is `../SparkPlus/addon.zip`.  |
| Changes not reflected after push         | GitHub Pages may cache content. Wait a few minutes or clear browser cache.                |
| `.nojekyll` file missing                 | Recreate the empty file at `PROD/docs/.nojekyll` to prevent Jekyll processing.            |
