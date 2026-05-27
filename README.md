# dotnet-artisan

Comprehensive .NET development skills for AI coding agents (Claude Code, GitHub Copilot, VS Code, Cursor). Synthesized from [dotnet/skills](https://github.com/dotnet/skills), [dotnet-claude-kit](https://github.com/codewithmukesh/dotnet-claude-kit), and the original [dotnet-artisan](https://github.com/novotnyllc/dotnet-artisan).

## Skills (14)

| Skill | Purpose | Load When |
|-------|---------|-----------|
| **using-dotnet** | Process gateway, .NET intent detection | Auto-loaded on .NET prompts |
| **dotnet-advisor** | Router/index to domain skills | Auto-loaded after using-dotnet |
| **dotnet-csharp** | C# language patterns, async/await, DI, LINQ | Always loaded as baseline |
| **dotnet-api** | ASP.NET Core, EF Core, gRPC, SignalR, security | Backend/API development |
| **dotnet-ui** | Blazor, MAUI, Uno Platform, WPF, WinUI, WinForms | UI development |
| **dotnet-testing** | xUnit v3, Playwright, benchmarks, test quality | Test authoring and strategy |
| **dotnet-devops** | CI/CD, GitHub Actions, containers, NuGet, observability | DevOps/pipeline work |
| **dotnet-tooling** | MSBuild, Native AOT, CLI apps, SDK, profiling | Project setup and tooling |
| **dotnet-debugging** | WinDbg, crash dumps, hang analysis, memory diagnostics | Debugging/profiling |
| **dotnet-ai** | MCP servers, Semantic Kernel, RAG, ML.NET, LLM integration | AI/ML features |
| **dotnet-upgrade** | .NET version migration, AOT assessment, nullable migration | Framework upgrades |
| **dotnet-quality** | 7-step cleanup pipeline, code review, dead code removal | Code cleanup/quality |
| **dotnet-workflow** | Parallel worktrees, context discipline, Claude Code optimization | Productivity/workflow |
| **dotnet-learning** | Correction capture, instinct system, pattern learning | Session start, corrections |

## Specialist Agents (17)

| Agent | Specialization |
|-------|---------------|
| dotnet-architect | Architecture review, framework selection, design patterns |
| dotnet-aspnetcore-specialist | ASP.NET Core middleware, request pipeline, DI lifetimes |
| dotnet-async-performance-specialist | Async/await performance, ValueTask, ConfigureAwait |
| dotnet-benchmark-designer | Benchmark methodology, measurement validation |
| dotnet-blazor-specialist | Blazor components, render modes, hosting models |
| dotnet-build-error-resolver | MSBuild error diagnosis and systematic resolution |
| dotnet-cloud-specialist | Cloud deployment, Aspire, AKS, CI/CD |
| dotnet-code-review-agent | Code review for correctness, performance, security |
| dotnet-csharp-concurrency-specialist | Race conditions, deadlocks, thread safety |
| dotnet-docs-generator | Documentation generation, XML docs, Mermaid diagrams |
| dotnet-maui-specialist | .NET MAUI development, platform targets |
| dotnet-performance-analyst | Profiling, flame graphs, heap dumps |
| dotnet-refactor-cleaner | 7-step cleanup pipeline, dead code removal, code quality |
| dotnet-security-reviewer | OWASP compliance, secrets exposure, crypto review |
| dotnet-testing-specialist | Test architecture, test data management |
| dotnet-uno-specialist | Uno Platform, Extensions, MVUX, multi-target |

## Installation

### Claude Code

```bash
claude plugins install novotnyllc/dotnet-artisan
```

### GitHub Copilot / VS Code / Cursor

Copy skills to your agent's skills directory. See [agentskills.io](https://agentskills.io) for the open standard.

## Architecture

```
User Prompt
  → using-dotnet (detect .NET intent)
    → dotnet-advisor (route to domain skill)
      → dotnet-csharp (baseline, always loaded)
      → Domain skills (api/ui/testing/devops/tooling/debugging/ai/upgrade)
      → Meta skills (quality/workflow/learning, loaded on demand)
```

## Key Design Principles

- **KISS first**: Simple CRUD doesn't need DDD, MediatR, or CQRS. Scale patterns to problems.
- **No repository/UoW wrapping**: Use DbContext directly. EF Core IS the repository.
- **Version-aware**: Guidance adapts to net8.0/net9.0/net10.0/net11.0 automatically.
- **Framework defaults**: Use what .NET gives you — `TimeProvider`, `ILogger<T>`, `IHttpClientFactory`, `System.Text.Json`.

## License

MIT — see [LICENSE](LICENSE) file.

## Credits

Synthesized from:
- [novotnyllc/dotnet-artisan](https://github.com/novotnyllc/dotnet-artisan) — original deep reference framework
- [dotnet/skills](https://github.com/dotnet/skills) — Microsoft's official .NET AI skills
- [codewithmukesh/dotnet-claude-kit](https://github.com/codewithmukesh/dotnet-claude-kit) — workflow and meta-cognitive innovations
