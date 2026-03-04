# DEV - Development & Version Archive

This directory serves as the archive for previous releases and the workspace for test builds of SparkPlus.

---

## Structure

```
DEV/
+-- old/                     Archived previous versions
|   +-- addon-v<version>.zip Archived addon packages
|   +-- ROLLBACK_LOG.md      Version history & rollback log
+-- test/                    Current test builds
|   +-- addon-test.zip       Test build (when present)
+-- README.md                This file
```

---

## Table of Contents

- [Archived Versions](#archived-versions)
- [Test Builds](#test-builds)
- [Rollback Procedure](#rollback-procedure)
- [Naming Convention](#naming-convention)

---

## Archived Versions

The `old/` directory stores every previously published production addon. When a new version is deployed to `PROD/SparkPlus/addon.zip`, the outgoing version is moved here with a versioned filename.

Each archive entry is logged in `old/ROLLBACK_LOG.md`.

## Test Builds

The `test/` directory is used for pre-release validation. Place test builds here as `addon-test.zip` before promoting them to production.

## Rollback Procedure

To roll back to a previous version:

1. Identify the target version in `old/ROLLBACK_LOG.md`.
2. Copy the corresponding `addon-v<version>.zip` from `old/` to `PROD/SparkPlus/addon.zip`.
3. Update `PROD/SparkPlus/version.txt` with the rolled-back version string.
4. Add a new entry to `old/ROLLBACK_LOG.md` with the rollback reason.
5. Commit and push to `main`.

## Naming Convention

| File                        | Description                      |
|-----------------------------|----------------------------------|
| `addon-v2026.03.04.zip`    | Archived production release      |
| `addon-test.zip`           | Current test build               |
| `ROLLBACK_LOG.md`          | Version history with timestamps  |