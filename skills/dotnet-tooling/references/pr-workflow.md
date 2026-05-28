# PR Workflow

Detailed reference for the complete PR lifecycle: create → validate → review → merge → release.

## 1. Analyze Current State

```bash
git status --short
git branch --show-current
git log --oneline main..HEAD
git diff main..HEAD --stat
```

Check: uncommitted changes, branch behind main, merge conflicts, direct commits to main.

## 2. Conventional Commit Title

| Change Type | Prefix | Example |
|-------------|--------|---------|
| New feature | `feat:` | `feat: add discount code validation` |
| Bug fix | `fix:` | `fix: prevent double discount application` |
| Refactoring | `refactor:` | `refactor: extract pricing calculator` |
| Docs only | `docs:` | `docs: add API authentication guide` |
| Tests only | `test:` | `test: add integration tests for checkout` |
| Dependencies | `chore:` | `chore: update NuGet packages` |

If changes span multiple types, use the dominant one. Add `!` for breaking changes.

## 3. PR Body Template

```markdown
## What
<1-2 sentences describing the change>

## Why
<business reason or problem being solved>

## How
<key implementation decisions — why this approach>

## Testing
- [ ] `dotnet build` passes
- [ ] `dotnet test` passes
- [ ] Integration tests cover the happy path
- [ ] Edge cases tested (null, empty, boundary values)

## Breaking Changes
<list or "None">
```

## 4. Pre-PR Checks

```bash
# Must pass
dotnet format --verify-no-changes
dotnet build
dotnet test

# Should pass (warn if not)
dotnet test --collect:"XPlat Code Coverage"
```

```bash
git push -u origin HEAD
gh pr create --title "feat: ..." --body "$(cat pr-body.md)" --base main
```

## 5. CI Validation

```bash
gh pr checks
```

If checks fail: parse error log → categorize (build/test/formatting/NuGet) → suggest fix. Do NOT auto-fix.

## 6. Review Checklist

- [ ] DI lifetimes correct? (Scoped in Singleton = bug)
- [ ] Async chains have CancellationToken?
- [ ] No .Result / .Wait() / async void?
- [ ] No new HttpClient()?
- [ ] No DateTime.Now (use TimeProvider)?
- [ ] No hardcoded secrets or connection strings?
- [ ] EF Core queries use AsNoTracking() for reads?
- [ ] No N+1 queries (Include / ThenInclude)?
- [ ] New files have one-line purpose comment at top?
- [ ] No Helper / Manager / Utils / Common class names?

## 7. Merge

```bash
gh pr view --json state,mergeable,reviewDecision
gh pr merge --squash --delete-branch
```

Verify before merge: CI green, approved, no unresolved comments, branch not behind main.

## 8. Release

Determine version bump from commits since last tag:
- `BREAKING CHANGE:` or `feat!: ` → Major
- `feat:` → Minor
- `fix:` or nothing → Patch

```bash
VERSION="1.1.0"
git tag -a "v$VERSION" -m "Release v$VERSION"
git push origin "v$VERSION"
```
