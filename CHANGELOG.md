# Changelog

## 1.0.0 (2026-05-28)

Initial release. Synthesized from [dotnet-artisan](https://github.com/novotnyllc/dotnet-artisan), [dotnet/skills](https://github.com/dotnet/skills), and [dotnet-claude-kit](https://github.com/codewithmukesh/dotnet-claude-kit).

### Skills (14)

| Category | Skills |
|----------|--------|
| Gateway | `using-dotnet`, `dotnet-advisor` (the decision-maker) |
| Baseline | `dotnet-csharp` (always loaded) |
| Builders | `dotnet-api`, `dotnet-ui` |
| Verifiers | `dotnet-testing`, `dotnet-debugging`, `dotnet-quality` |
| Operators | `dotnet-devops`, `dotnet-tooling`, `dotnet-upgrade` |
| Augmenters | `dotnet-ai`, `dotnet-workflow`, `dotnet-learning` |

### Agents (16)

**Role-based (6)**: `dotnet-architect`, `dotnet-code-review-agent`, `dotnet-security-reviewer`, `dotnet-testing-specialist`, `dotnet-docs-generator`, `dotnet-refactor-cleaner`

**Tool-based (10)**: `dotnet-aspnetcore-specialist`, `dotnet-async-performance-specialist`, `dotnet-benchmark-designer`, `dotnet-blazor-specialist`, `dotnet-build-error-resolver`, `dotnet-cloud-specialist`, `dotnet-csharp-concurrency-specialist`, `dotnet-maui-specialist`, `dotnet-performance-analyst`, `dotnet-uno-specialist`

### Guides

`USAGE.md` (questioning framework, domain-driven analysis), `SELF_DOCUMENTING.md` (30-second rule), `BEHAVIORS.md` (30+ behavior catalog), `CLAUDE.md` (context reconnection), `harness/` (drop-in auto-pilot config)

### Key Rules

- No Repository/UoW wrappers — DbContext directly
- No FluentValidation — `AddValidation()` + DataAnnotations on .NET 10+
- No commercial packages — free/open-source only
- No DateTime.Now — `TimeProvider` everywhere
- Self-documenting code — 30-second rule for AI reconnection
- Question before coding — domain glossary first
- English-only skills/agents, bilingual docs
