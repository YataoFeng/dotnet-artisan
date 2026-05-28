---
name: dotnet-quality
license: MIT
user-invocable: false
description: >
  Systematic code quality pipeline for .NET projects. Runs a 7-step cleanup:
  formatting, unused usings, analyzer warnings, dead code removal, TODO resolution,
  sealed class audit, CancellationToken propagation. Includes code review workflow
  and the 80-20 review principle. Load when "clean up", "de-sloppify", "code review",
  "tidy up", "remove dead code", "fix warnings", "tech debt".
  Merges de-sloppify + code-review-workflow + 80-20-review + wrap-up-ritual.
---

# dotnet-quality

## Core Principles

1. **Systematic over random** — Follow the cleanup pipeline in order. Formatting first (touches every file), dead code last (earlier steps might reveal it). Random cleanup creates merge conflicts.

2. **Verify after each step** — Run `dotnet build && dotnet test` after every step. A cleanup that breaks something is worse than the mess it was fixing.

3. **Safe removals only** — Before removing "dead" code, verify it isn't used via reflection, DI conventions, or serialization. Grep for string-based references that Roslyn cannot track.

4. **One concern per commit** — Separate formatting fixes from logic changes. Each cleanup step gets its own commit for safe revert.

## 7-Step Cleanup Pipeline

```
Step 1: Formatting        — dotnet format (whitespace, indentation, braces)
Step 2: Unused Usings     — dotnet format analyzers (unnecessary using directives)
Step 3: Analyzer Warnings — dotnet build -warnaserror (fix all CS/IDE warnings)
Step 4: Dead Code         — Remove unreachable/unreferenced code (verify first!)
Step 5: TODO Resolution   — Convert TODOs to issues or implement them
Step 6: Sealed Class Audit — Seal classes not designed for inheritance
Step 7: CancellationToken  — Propagate CancellationToken through all async chains
```

Each step: build → test → commit → next step.

## Code Review Workflow

### 80-20 Review Principle

Focus 80% of review effort on the 20% of code most likely to contain issues:
- New code paths (not just modified lines)
- Error handling and edge cases
- DI registration and lifetime scoping
- EF Core queries (N+1, tracking, cartesian explosion)
- Async/await and CancellationToken propagation

### Review Checklist

- [ ] Does it compile? `dotnet build`
- [ ] Do tests pass? `dotnet test`
- [ ] Are DI lifetimes correct? (Scoped in Singleton = bug)
- [ ] Are async chains fully CancellationToken-aware?
- [ ] Is there any dead code or commented-out blocks?
- [ ] Are exceptions caught at the right boundary?
- [ ] Is logging at appropriate levels?

## Anti-patterns

- **Mixing cleanup with feature work** — Separate commits, separate PRs
- **Batch cleanup without testing** — 500 files changed, zero tests run = guaranteed regression
- **Aggressive dead code removal** — Verify via reflection, DI, serialization first
- **Formatting holy wars** — Use `.editorconfig`, not personal preference
