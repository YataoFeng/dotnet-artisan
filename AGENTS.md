# dotnet-artisan — AI Agent Skills for .NET

14 skills, 17 agents, 160+ reference files. Synthesized from dotnet-artisan, dotnet/skills, and dotnet-claude-kit.

## Quick Start

Load path: `using-dotnet` → `dotnet-advisor` → domain skills. `dotnet-csharp` is always loaded as baseline.

## Rules (Non-Negotiable)

1. **No Repository/UoW wrappers** — DbContext IS the UoW; DbSet<T> IS the repository. Inject DbContext directly.
2. **No FluentValidation** — .NET 10+ uses `AddValidation()` + DataAnnotations. Built-in, source-gen, AOT-safe.
3. **No commercial packages** — Free/open-source only. See [package-choices.md](skills/dotnet-csharp/references/package-choices.md).
4. **No DateTime.Now** — Use `TimeProvider` constructor-injected everywhere.
5. **English only in skills/agents/references** — Docs (README, Pages) support Chinese + English.
6. **SKILL.md under 500 lines** — Detailed content in `references/` subdirectory.
7. **Every reference file follows**: Core Principles → Patterns (GOOD code) → Anti-patterns (BAD/GOOD) → Decision Guide.
8. **Exhaust questions before acting** — Check the 7-item checklist in [USAGE.md](USAGE.md). If any answer is "I don't know", ask more. Never write code on assumptions.
9. **All generated code MUST follow [SELF_DOCUMENTING.md](SELF_DOCUMENTING.md)** — A fresh AI must understand any project in 30 seconds. Zero exceptions.
10. **Domain analysis for DDD** — When DDD is chosen, run full domain analysis: event storming, bounded contexts, ubiquitous language glossary, context mapping. See `dotnet-tooling/references/domain-analysis.md`.

## Key Files

| Load when | File |
|-----------|------|
| Any .NET code | [anti-patterns.md](skills/dotnet-csharp/references/anti-patterns.md) — 10 most common BAD/GOOD patterns |
| Choosing packages | [package-choices.md](skills/dotnet-csharp/references/package-choices.md) — commercial→free alternatives |
| Architecture decisions | [DECISIONS.md](skills/DECISIONS.md) — "when to use what" quick lookups |
| Find a reference | [INDEX.md](skills/INDEX.md) — all 166 reference files by domain |
| Code quality + project setup | [dotnet-tooling](skills/dotnet-tooling/SKILL.md) — build, AOT, CLI, cleanup |
| Workflow optimization + learning | [dotnet-workflow](skills/dotnet-workflow/SKILL.md) — worktrees, context, corrections |
| AI/ML features | [dotnet-ai](skills/dotnet-ai/SKILL.md) — MCP, RAG, Semantic Kernel |
| Version upgrade | [dotnet-devops](skills/dotnet-devops/SKILL.md) — CI/CD, containers, migration |

## Anti-Patterns Quick Reference

Reference files should include: **Core Principles → Patterns (GOOD code) → Anti-Patterns (BAD/GOOD, or inline "AVOID" examples) → Decision Guide**. The format is flexible — inline BAD/GOOD examples are acceptable instead of dedicated sections.

Top 10 always-loaded anti-patterns: DateTime.Now→TimeProvider | Scoped in Singleton→IServiceScopeFactory | async void→BackgroundService | .Result/.Wait()→await | Repository→DbContext | N+1→.Include() | new HttpClient()→IHttpClientFactory | lock(this)→private object | string+loop→StringBuilder | 1-impl-1-interface→concrete class

## Sources

- [fenzel999/dotnet-artisan](https://github.com/fenzel999/dotnet-artisan)
- [dotnet/skills](https://github.com/dotnet/skills)
- [codewithmukesh/dotnet-claude-kit](https://github.com/codewithmukesh/dotnet-claude-kit)
