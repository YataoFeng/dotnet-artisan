# dotnet-artisan — AI Agent Skills for .NET

14 skills, 17 agents, 160+ reference files. Synthesized from dotnet-artisan, dotnet/skills, and dotnet-claude-kit.

## Quick Start

Load path: `using-dotnet` → `dotnet-advisor` → domain skills. `dotnet-csharp` is always loaded as baseline.

## Rules (Non-Negotiable)

1. **No Repository/UoW wrappers** — DbContext IS the UoW; DbSet<T> IS the repository
2. **No FluentValidation** — Use `AddValidation()` + DataAnnotations on .NET 10+
3. **No commercial packages** — Prefer free/open-source (see package-choices.md)
4. **No DateTime.Now** — Use `TimeProvider` everywhere
5. **DbContext directly** — Inject `AppDbContext`, not `IRepository<T>`
6. **Free/open-source only** — MediatR→Mediator(MIT), AutoMapper→Mapperly, etc.

## Key Files

| Load when | File |
|-----------|------|
| Any .NET code | [anti-patterns.md](skills/dotnet-csharp/references/anti-patterns.md) — 10 most common BAD/GOOD patterns |
| Choosing packages | [package-choices.md](skills/dotnet-csharp/references/package-choices.md) — commercial→free alternatives |
| Architecture decisions | [DECISIONS.md](skills/DECISIONS.md) — "when to use what" quick lookups |
| Find a reference | [INDEX.md](skills/INDEX.md) — all 80+ reference files by domain |
| Cleanup/quality | [dotnet-quality](skills/dotnet-quality/SKILL.md) — 7-step pipeline |
| Workflow optimization | [dotnet-workflow](skills/dotnet-workflow/SKILL.md) — parallel worktrees, context discipline |
| Pattern learning | [dotnet-learning](skills/dotnet-learning/SKILL.md) — correction capture, instincts |
| AI/ML features | [dotnet-ai](skills/dotnet-ai/SKILL.md) — MCP, RAG, Semantic Kernel |
| Framework upgrade | [dotnet-upgrade](skills/dotnet-upgrade/SKILL.md) — migration paths |

## Anti-Patterns Quick Reference

Every reference file follows: **Core Principles → Patterns → Anti-Patterns (BAD/GOOD) → Decision Guide**.

Top 10 always-loaded anti-patterns: DateTime.Now→TimeProvider | Scoped in Singleton→IServiceScopeFactory | async void→BackgroundService | .Result/.Wait()→await | Repository→DbContext | N+1→.Include() | new HttpClient()→IHttpClientFactory | lock(this)→private object | string+loop→StringBuilder | 1-impl-1-interface→concrete class

## Sources

- [novotnyllc/dotnet-artisan](https://github.com/novotnyllc/dotnet-artisan) — deep reference framework
- [dotnet/skills](https://github.com/dotnet/skills) — Microsoft's official .NET AI skills
- [codewithmukesh/dotnet-claude-kit](https://github.com/codewithmukesh/dotnet-claude-kit) — BAD/GOOD patterns + workflow
