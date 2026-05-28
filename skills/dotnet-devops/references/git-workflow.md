# Git Workflow & Branch Strategy

> **Quick Ref**: Trunk-Based for solo/small-team | GitHub Flow for PR-driven teams | GitFlow only if you ship versioned releases to customers | Conventional Commits `feat:`/`fix:`/`BREAKING CHANGE:` | Squash-merge keeps main clean | Tag every release with SemVer | Never commit secrets — pre-commit hook catches them |

**Version assumptions:** .NET 8.0+ baseline. GitHub Actions for CI/CD. `Nerdbank.GitVersioning` for version calculation. Conventional Commits 1.0 spec.

## Core Principles

1. **Branch strategy scales with team size.** Solo dev or 2-person team: Trunk-Based. 3-10 devs with PRs: GitHub Flow. Shipping versioned products to external customers: GitFlow. Don't pick GitFlow because "that's what the enterprise does" — match the strategy to your reality.

2. **Conventional Commits drive automation.** `feat:` bumps minor, `fix:` bumps patch, `BREAKING CHANGE:` bumps major. Your changelog and version number are derived from commit messages — no manual version bumps.

3. **Squash-merge is the default.** Keeps `main` clean. Each PR becomes one meaningful commit. The branch history (52 "wip" commits) stays in the PR, not in `main`.

4. **Protect main.** Require PR reviews. Require status checks. Nobody pushes directly to `main` (not even you). This isn't bureaucracy — it's a safety net that catches 30% of issues before they reach production.

## Patterns (GOOD)

### Pattern 1: Trunk-Based Development (solo or pair)

```
main ──●────●────●────●────●──
       │    │    │    │    │
       └────┴────┴────┴────┘
            short-lived feature branches (< 1 day)
```

```bash
# Daily workflow
git checkout main && git pull
git checkout -b feat/add-discount-logic
# ... write code, commit frequently ...
git checkout main && git pull
git merge feat/add-discount-logic
git push
git branch -d feat/add-discount-logic
```

### Pattern 2: GitHub Flow (3-10 devs, PR review)

```
main ──●───────────●─────────────●────
       │           │             │
       └──●──●──●──┘             │
          feat/xxx   └──●──●─────┘
                        fix/yyy
```

```bash
# Feature branch workflow with PR
git checkout -b feat/add-discount
# ... write code, commit with conventional commits ...
git commit -m "feat: add percentage discount to orders

Apply discount codes at checkout with validation
for expiry, minimum order amount, and usage limits."
git push -u origin feat/add-discount
# → Create PR on GitHub → CI runs → reviewer approves → squash-merge
```

### Pattern 3: Conventional Commits

```bash
# BAD: useless commit messages
git commit -m "fix"
git commit -m "wip"
git commit -m "updated stuff"
git commit -m "."

# GOOD: Conventional Commits — machine-readable, drives versioning
git commit -m "feat: add discount code validation at checkout"
git commit -m "fix: prevent double-application of discount codes"
git commit -m "refactor: extract discount calculation to domain service"

# GOOD: BREAKING CHANGE in footer
git commit -m "feat: redesign discount API

BREAKING CHANGE: Discount.Apply() now returns Result<Order>
instead of modifying Order in-place. Callers must handle the Result."
```

### Pattern 4: Branch naming convention

```bash
# GOOD: consistent prefixes
feat/add-discount-logic       # new feature
fix/double-discount-bug       # bug fix
refactor/extract-calculator   # refactoring (no behavior change)
docs/api-documentation        # documentation only
chore/update-nuget-packages   # maintenance tasks
test/discount-integration     # adding missing tests

# BAD: meaningless names
feature-branch
my-branch
test123
fix
```

### Pattern 5: GitHub Actions CI triggered by PR events

```yaml
# .github/workflows/ci.yml
name: CI
on:
  pull_request:
    branches: [main]
jobs:
  build-and-test:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:16
        env:
          POSTGRES_PASSWORD: test
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-dotnet@v5
        with:
          dotnet-version: '10.0.x'
      - run: dotnet restore
      - run: dotnet build --no-restore
      - run: dotnet test --no-build
        env:
          ConnectionStrings__Default: >-
            Host=localhost;Database=test;Username=postgres;Password=test
```

### Pattern 6: Tag-based release with auto-generated notes

```yaml
# .github/workflows/release.yml
name: Release
on:
  push:
    tags: ['v*']
jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - run: dotnet build -c Release
      - run: dotnet test -c Release --no-build
      - uses: softprops/action-gh-release@v1
        with:
          generate_release_notes: true
```

## Anti-patterns (BAD vs GOOD)

### 1. Long-lived branches

```bash
# BAD: Branch lives for 2 weeks, 200 commits behind main.
# Merge conflict hell at the end.
git checkout -b feat/big-refactor
# ... 2 weeks of work, 47 commits ...
git merge main  # 38 conflicts

# GOOD: Merge main daily. Rebase or merge frequently.
git checkout feat/big-refactor
git merge main  # daily — 0-2 conflicts each time
# ... or break into smaller PRs ...
```

### 2. Direct commits to main

```bash
# BAD: Pushing directly to main. No review. No CI gate.
git checkout main
git commit -m "fix something"
git push

# GOOD: Everything goes through PR. Even "small fixes."
git checkout -b fix/typo-in-readme
git commit -m "docs: fix typo in README"
git push -u origin fix/typo-in-readme
# → PR → CI passes → squash-merge
```

### 3. Merge commits polluting main

```bash
# BAD: Merge commits create noise. Every PR leaves a merge bubble.
git merge feat/something --no-ff  # merge commit on main

# GOOD: Squash-merge. One clean commit per feature.
# GitHub PR: "Squash and merge" button
# CLI equivalent:
git merge feat/something --squash
git commit -m "feat: add discount code validation"
```

### 4. Secrets committed to repo

```bash
# BAD: API keys, connection strings, passwords in code
const string ApiKey = "sk-live-abc123";
var connStr = "Server=prod;Password=secret!";

# GOOD: Environment variables + User Secrets + .gitignore
# Set up pre-commit hook to scan for secrets:
# dotnet tool install --global GitGuardian.ggshield
# ggshield install --mode local
```

### 5. GitFlow for a solo developer

```
# BAD: Full GitFlow with develop, release, hotfix branches.
# Solo dev spending 20% of time on branch management.
main ────●────────●──
         │        │
develop ─●──●──●──●──●──
              │        │
release/1.0 ──●──●─────│
                       │
hotfix/1.0.1 ──────────●──

# GOOD: Trunk-Based. Branch for features, merge to main.
# You're shipping continuously, not cutting releases.
main ──●──●──●──●──●──
```

## Decision Guide

| Situation | Strategy | Commit Style | Merge Style |
|-----------|----------|-------------|-------------|
| Solo dev | Trunk-Based | Conventional Commits | Fast-forward or squash |
| 2-5 devs, continuous delivery | GitHub Flow | Conventional Commits | Squash-merge |
| 5-20 devs, scheduled releases | GitHub Flow + release branches | Conventional Commits | Squash-merge |
| Shipping versioned product to customers | GitFlow (simplified) | Conventional Commits | Merge commit for releases |
| Open source project | GitHub Flow | Conventional Commits | Squash-merge |
| Monorepo with multiple teams | Trunk-Based + feature flags | Conventional Commits | Squash-merge |

## Branch Protection Rules (GitHub)

```yaml
# Required settings for main branch:
# - Require a pull request before merging: ON
# - Require approvals: 1 (solo) or 2 (team)
# - Require status checks to pass: ON
# - Require conversation resolution: ON
# - Do not allow bypassing: ON (even for admins)
```

## Cross-References

- [release-management.md](release-management.md) — NBGV, SemVer, changelog generation
- [gha-patterns.md](gha-patterns.md) — GitHub Actions CI/CD pipeline patterns
- [gha-build-test.md](gha-build-test.md) — Build and test workflow setup
- [github-releases.md](github-releases.md) — GitHub Release creation and automation
