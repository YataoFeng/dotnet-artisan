# dotnet-artisan

**Makes your AI coding agent actually good at .NET.** Install and go. Zero config.

[![中文](README.md)](README.md)
[![MIT](LICENSE)](LICENSE)
11 skills · 13 agents · 169 references · 30+ behaviors

---

## Install

```bash
claude plugins marketplace add fenzel999/dotnet-artisan
claude plugins install dotnet-artisan
```

Compatible with GitHub Copilot, VS Code, and Cursor.

---

## How It Works

You describe what you need — the decision-maker handles everything:

```
Your request → intent detection → decision-maker →
    1. Detect .NET version
    2. Align requirements (ask questions, capture domain vocabulary)
    3. Load C# coding standards
    4. Design architecture (invoke architect: choose pattern + folder structure)
    5. Decompose into domains → parallel routing to matching skills
    6. Specialist agents on demand
    7. Workflow + learning (capture corrections, generalize rules)
```

**No skill names to memorize.** The decision-maker analyzes, aligns, loads standards, and routes automatically.

---

## What It Can Do

| Scenario | You say | What happens |
|----------|---------|-------------|
| Build an API | "Add order management" | 4 rounds of questions → domain-analyst event storming → domain doc → parallel routing to api + testing + devops |
| Debug a crash | "OOM in production, here's the dump" | Route to dotnet-debugging → WinDbg/dotnet-dump analysis → root cause |
| Security audit | "Audit this code" | Route to security-reviewer (read-only) → OWASP scan → report |
| Add tests | "Write tests for the order service" | Route to dotnet-testing → xUnit + WebApplicationFactory + Testcontainers |
| Upgrade | "Upgrade from .NET 8 to 10" | Route to dotnet-devops → 8→9→10 two-step migration, build+test each step |
| Set up CI/CD | "Set up CI/CD pipeline" | Route to dotnet-devops → GitHub Actions workflow |
| Query performance | "Order list is slow" | Route to dotnet-api → detect N+1 → .Include() fix |
| Learn a rule | "Remember: use TimeProvider" | Route to dotnet-workflow → generalize → store in MEMORY.md |

---

## Skills

| Category | Skills | Covers |
|----------|--------|--------|
| Gateway | using-dotnet, dotnet-advisor | Intent detection, decision routing |
| Baseline | dotnet-csharp | C# standards, async/await, DI, LINQ (always loaded) |
| Build | dotnet-api, dotnet-ui | API / EF Core / gRPC / SignalR / Blazor / MAUI / WPF / Uno |
| Verify | dotnet-testing, dotnet-debugging | Testing / debugging (WinDbg + dotnet-dump) |
| Operate | dotnet-devops, dotnet-tooling | CI/CD / version migration / Git workflow / solution structure / code quality |
| Augment | dotnet-ai, dotnet-workflow | MCP, RAG / workflow optimization + learning |

---

## Agents

| You say | Agent | Focus |
|---------|-------|-------|
| "How should I structure this?" | architect | Architecture, folder structure, build config |
| "Analyze the domain" | domain-analyst | Event storming, bounded contexts, domain docs |
| "Review this PR" | code-review-agent | Correctness, performance, security, architecture |
| "Is this secure?" | security-reviewer | OWASP, secrets, crypto (read-only) |
| "How should I test?" | testing-specialist | Strategy, pyramid design, test data |
| "Generate documentation" | docs-generator | DocFX, Mermaid |
| "Is my middleware order correct?" | aspnetcore-specialist | Middleware, DI, request pipeline |
| "Why is it slow?" or "Design a benchmark" | performance-specialist | Async, profiling, benchmarks |
| "Build a cross-platform UI" | ui-specialist | Blazor / MAUI / Uno |
| "Remember this" | workflow (skill) | Correction capture, generalization |
| Build fails or "Clean this up" | code-lifecycle-agent | Build errors + quality cleanup |
| "Deploy to cloud?" | cloud-specialist | Aspire, AKS |
| "Crashes under load" | concurrency-specialist | Race conditions, deadlocks |
| "Create a PR" or "Release" | pr-workflow | PR lifecycle |

Full catalog: [BEHAVIORS.md](BEHAVIORS.md)

---

## Key Rules

1. **DbContext is the repository** — No Repository/UoW wrappers. Inject directly.
2. **No FluentValidation** — .NET 10+ uses `AddValidation()` + DataAnnotations.
3. **Free/open-source only** — MediatR→Mediator, AutoMapper→Mapperly. See [package-choices.md](skills/dotnet-csharp/references/package-choices.md).
4. **No DateTime.Now** — Use `TimeProvider`, constructor-injected everywhere.
5. **Understand before building** — 7-item checklist before writing code. See [USAGE.md](USAGE.md).
6. **Self-documenting code** — Fresh AI must understand any project in 30 seconds.
7. **Use modern alternatives** — IHttpClientFactory, System.Text.Json source-gen, Microsoft.AspNetCore.OpenApi.

Quick reference: [CHEATSHEET.md](skills/CHEATSHEET.md)

---

## Strengths & Limitations

**Strengths:** Orchestration · Understand before building · Full coverage · 30-second rule · Zero commercial dependencies · Cross-platform debugging · Zero config

**Limitations:** Requires Claude Code · .NET only · WinDbg Windows-only · Some refs still standardizing

---

## Further Reading

- [Questioning Framework](USAGE.md) — The decision-maker's 4-round discovery process
- [Behavior Catalog](BEHAVIORS.md) — All behaviors with routing logic
- [CLAUDE.md](CLAUDE.md) — Session recovery entry point
- [Web Edition](https://fenzel999.github.io/dotnet-artisan) — Interactive docs

---

MIT
