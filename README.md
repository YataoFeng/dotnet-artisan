# dotnet-artisan

[![中文](https://img.shields.io/badge/中文-简体中文-red)](README.zh-CN.md) [![English](https://img.shields.io/badge/English-README-blue)](README.md)

Comprehensive .NET development skills for AI coding agents — Claude Code, GitHub Copilot, VS Code, Cursor.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Skills](https://img.shields.io/badge/Skills-14-5b9cf5)](skills/)
[![Agents](https://img.shields.io/badge/Agents-17-8b5cf6)](agents/)
[![References](https://img.shields.io/badge/References-160+-4ade80)](skills/)

Synthesized from three sources: the original [dotnet-artisan](https://github.com/novotnyllc/dotnet-artisan) deep framework + Microsoft's official [dotnet/skills](https://github.com/dotnet/skills) + [dotnet-claude-kit](https://github.com/codewithmukesh/dotnet-claude-kit) good/bad code patterns.

## Installation

```bash
claude plugins install YataoFeng/dotnet-artisan
```

Compatible with GitHub Copilot, VS Code, Cursor — follows the [agentskills.io](https://agentskills.io) open standard.

## Architecture

```
User prompt → using-dotnet → dotnet-advisor → domain skills + dotnet-csharp(baseline) → meta-skills(on-demand)
```

### 14 Skills

| Skill | Purpose | When |
|------|---------|------|
| **using-dotnet** | .NET intent detection, routing gateway | Auto-loaded |
| **dotnet-advisor** | Skill routing, version detection, cross-domain coordination | Auto-loaded |
| **dotnet-csharp** | C# patterns, async/await, DI, LINQ | Always baseline |
| **dotnet-api** | ASP.NET Core, EF Core, gRPC, security | Backend dev |
| **dotnet-ui** | Blazor, MAUI, Uno, WPF, WinUI | UI dev |
| **dotnet-testing** | xUnit v3, Playwright, benchmarks | Writing tests |
| **dotnet-devops** | CI/CD, GitHub Actions, containers, NuGet | DevOps |
| **dotnet-tooling** | MSBuild, AOT, CLI, profiling | Tooling/scaffolding |
| **dotnet-debugging** | WinDbg, crash dumps, deadlock analysis | Debugging/diagnostics |
| **dotnet-ai** | MCP, Semantic Kernel, RAG, ML.NET | AI features |
| **dotnet-upgrade** | .NET version migration, AOT, nullable | Framework upgrades |
| **dotnet-quality** | 7-step cleanup, code review, dead code removal | Quality improvement |
| **dotnet-workflow** | Parallel worktrees, context management | Efficiency |
| **dotnet-learning** | Correction capture, pattern learning | Knowledge accumulation |

### 17 Agents

Architect · ASP.NET Core Specialist · Async Performance Specialist · Benchmark Designer · Blazor Specialist · Build Error Resolver · Cloud Specialist · Code Review · Concurrency Specialist · Docs Generator · MAUI Specialist · Performance Analyst · Refactor Cleaner · Security Reviewer · Testing Specialist · Uno Specialist

## Core Principles

1. **KISS first** — Simple CRUD does not need DDD or CQRS. Match pattern to problem scale.
2. **No Repository wrappers** — Use DbContext directly. EF Core IS the repository and unit of work.
3. **No commercial packages** — Free/open-source only. MediatR→Mediator(MIT), AutoMapper→Mapperly.
4. **No DateTime.Now** — Use `TimeProvider` everywhere. Injectable, testable.
5. **Framework first** — TimeProvider, ILogger, IHttpClientFactory, System.Text.Json.

## Key Files

| File | Purpose |
|------|---------|
| [AGENTS.md](AGENTS.md) | Entry point: iron rules, core file map, anti-pattern quick-reference |
| [CHEATSHEET.md](skills/CHEATSHEET.md) | One-page all-rules cheat sheet |
| [DECISIONS.md](skills/DECISIONS.md) | Decision guides: "when to use what" |
| [INDEX.md](skills/INDEX.md) | 80+ reference files indexed by domain |
| [package-choices.md](skills/dotnet-csharp/references/package-choices.md) | Commercial→free alternative mapping |

## Website

[https://yataofeng.github.io/dotnet-artisan/](https://yataofeng.github.io/dotnet-artisan/)

## License

MIT — see [LICENSE](LICENSE).

## Sources

- [novotnyllc/dotnet-artisan](https://github.com/novotnyllc/dotnet-artisan) — Deep reference framework (159+ files)
- [dotnet/skills](https://github.com/dotnet/skills) — Microsoft official .NET AI skills
- [codewithmukesh/dotnet-claude-kit](https://github.com/codewithmukesh/dotnet-claude-kit) — Good/bad code patterns and workflow optimization
