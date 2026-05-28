# dotnet-artisan

[![中文](https://img.shields.io/badge/中文-简体中文-red)](README.md)

**Makes your AI coding agent actually good at .NET.** Install and go. Zero config.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Skills](https://img.shields.io/badge/Skills-14-5b9cf5)](skills/)
[![Agents](https://img.shields.io/badge/Agents-17-8b5cf6)](agents/)

---

## 30-Second Start

Install the plugin, open a .NET project, and just talk:

```
You: Add an order management module to this project

AI: Before I write code — what kind of orders? Customer purchases or
    internal work orders? What's the flow? What are the statuses?
    (The decision-maker analyzes before acting)

You: Customer orders. Status: Pending → Confirmed → Shipped.

AI: Understood. .NET 10 + PostgreSQL. Let me capture the domain
    glossary first, then build this module.
```

**No skill names to memorize.** The decision-maker analyzes your project, asks the right questions, and picks the right architecture. Try these:

> "Review this project's architecture"
> "Is this code secure? Do a security audit"
> "My app crashed in production — here's the dump file"
> "Upgrade from .NET 8 to .NET 10"

---

## Install

```bash
claude plugins marketplace add fenzel999/dotnet-artisan
claude plugins install dotnet-artisan
```

Compatible with GitHub Copilot, VS Code, Cursor. Open a .NET project and go. Harness auto-activates.

---

## What It Does

| When you... | What happens |
|-------------|--------------|
| "Build an order management API" | Asks questions → picks architecture → scaffolds → EF Core + Minimal API + auth → integration tests |
| "Production OutOfMemoryException" | Debug specialist → WinDbg `!dumpheap -stat` → finds 850MB held by ImageCache → reports root cause |
| "Review this PR" | Multi-dimensional analysis (correctness/perf/security/architecture) → categorized findings + fixes |
| "Write tests for this" | xUnit v3 · Testcontainers · Playwright E2E · BDD · BenchmarkDotNet |
| "Set up CI/CD", "Dockerize", "Release" | GitHub Actions · Docker · Aspire/AKS · NuGet · PR management |
| "Upgrade to .NET 10" | Step-by-step migration (8→9→10) · Native AOT · breaking change assessment |

---

## Who Does What

Two gateways activate first: `using-dotnet` detects .NET intent, `dotnet-advisor` (the decision-maker) analyzes your project, asks clarifying questions, and dispatches tasks.

### Skills

| Category | Skills | Does |
|---------|--------|------|
| Gateway | `using-dotnet` `dotnet-advisor` | Intent detection + decision routing |
| Baseline | `dotnet-csharp` | C# standards: async/await, DI, LINQ (always loaded) |
| Build | `dotnet-api` `dotnet-ui` | Web API / EF Core / Blazor / MAUI / WPF |
| Verify | `dotnet-testing` `dotnet-debugging` `dotnet-quality` | Testing / WinDbg / 7-step cleanup |
| Operate | `dotnet-devops` `dotnet-tooling` `dotnet-upgrade` | CI/CD / Project bootstrapper / Migration |
| Augment | `dotnet-ai` `dotnet-workflow` `dotnet-learning` | MCP·RAG / Parallel work / Pattern learning |

### Agents

| Type | Agent | Call when |
|------|-------|-----------|
| Role | `architect` | "How should I structure this?" |
| Role | `code-review-agent` | "Review this PR" |
| Role | `security-reviewer` | "Is this secure?" |
| Role | `testing-specialist` | "How should I test this?" |
| Role | `docs-generator` | "Generate documentation" |
| Role | `refactor-cleaner` | "Clean this up" |
| Tool | `aspnetcore-specialist` | "Is my middleware order correct?" |
| Tool | `async-performance-specialist` | "Why is my async code slow?" |
| Tool | `benchmark-designer` | "Design a benchmark" |
| Tool | `blazor-specialist` | "Which render mode?" |
| Tool | `build-error-resolver` | Build fails |
| Tool | `cloud-specialist` | "Deploy to cloud?" |
| Tool | `concurrency-specialist` | "Crashes under concurrency?" |
| Tool | `maui-specialist` | "Build a mobile app" |
| Tool | `performance-analyst` | "Find the bottleneck" |
| Tool | `uno-specialist` | "Cross-platform desktop?" |
| Flow | `pr-workflow` | "Create PR", "Release" |

> Agent names omit the `dotnet-` prefix. Full list: [BEHAVIORS.md](BEHAVIORS.md).

---

## 30-Second Rule

Every generated project must be understandable by a fresh AI in 30 seconds:

| Do | Don't |
|-----|------|
| `OrderManagement.slnx` at root | Buried in `/src/` |
| Domain project names: `OrderManagement.Api` | `Core`, `Shared`, `Services` |
| One-line file purpose at top | `// Order handler` |
| Explicit constructor dependencies | `IServiceProvider.GetService<T>()` |
| Comments explain WHY | `// Saves the order` |

**[→ Full Guide](SELF_DOCUMENTING.md)** · **[→ Questioning Framework](USAGE.md)** · **[→ Behaviors](BEHAVIORS.md)**

---

MIT
