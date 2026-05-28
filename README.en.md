# dotnet-artisan

**Makes your AI coding agent actually good at .NET.** Install and go. Zero config.

[![中文](https://img.shields.io/badge/中文-简体中文-red)](README.md)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Skills](https://img.shields.io/badge/Skills-14-5b9cf5)](skills/)
[![Agents](https://img.shields.io/badge/Agents-17-8b5cf6)](agents/)

14 skills · 17 agents · 160+ references · 30+ behaviors

---

## Install

```bash
claude plugins marketplace add fenzel999/dotnet-artisan
claude plugins install dotnet-artisan
```

Compatible with GitHub Copilot, VS Code, and Cursor. Open any .NET project and start working — the harness activates automatically.

---

## Quick Start

Install the plugin and just talk:

```
You: Add an order management module to this project

AI: Before I write code — what kind of orders? Customer purchases or
    internal work orders? What's the flow? What are the statuses?

You: Customer orders. Status: Pending → Confirmed → Shipped.

AI: .NET 10 + PostgreSQL. Let me capture the domain glossary first,
    then build the module.
```

**No skill names to memorize.** The decision-maker analyzes your project, asks the right questions, and picks the right architecture. Try these:

> "Add an order management module"
> "My app ran out of memory — here's the dump"
> "Audit this code for security vulnerabilities"
> "Write tests for the order service"
> "Upgrade from .NET 8 to .NET 10"
> "Set up CI/CD"
> "The order list is slow — check the database"

---

## Real-World Examples

Here are seven common scenarios showing how the plugin goes from a single sentence to a delivered result.

### 1. Building a New API

```
You: "Add an order management module to this project"

AI: The decision-maker detects a new feature request and analyzes the project.
    No EF Core configuration found — it asks about order types and status flow.
    Confirmed: customer orders + PostgreSQL. Routes to dotnet-api which scaffolds
    the project, configures DbContext, creates Minimal API endpoints, and adds
    OpenAPI docs. All generated code follows existing conventions.
```

### 2. Debugging a Production Crash (OutOfMemoryException)

```
You: "My app ran out of memory in production — here's the dump file"

AI: Routed to dotnet-debugging. Opens the dump, runs !analyze -v, and finds
    80% of memory held by a static ConcurrentDictionary. Deep-dive with !gcroot
    traces to event handlers that were never unregistered. Delivers a fix with
    pre-deployment verification steps.
```

### 3. Code Review & Security Audit

```
You: "Audit this code for security vulnerabilities"

AI: Routed to dotnet-security-reviewer (read-only agent). Scans every file:
    finds two SQL injection vectors, a hardcoded API key in appsettings.json,
    and missing Audience validation in JWT config. Produces a ranked security
    report with risk levels and remediation guidance. No code is modified.
```

### 4. Writing Tests for Existing Code

```
You: "Write tests for the order service"

AI: Routed to dotnet-testing. Analyzes code and decides: unit tests for business
    logic, integration tests for database operations. Generates an xUnit project
    with WebApplicationFactory for test hosting and Testcontainers for a real
    PostgreSQL instance. Covers happy path, edge cases, and error scenarios.
```

### 5. Upgrading from .NET 8 to .NET 10

```
You: "Upgrade this project from .NET 8 to .NET 10"

AI: Routed to dotnet-upgrade. Assesses the current project: checks TFM, NuGet
    compatibility, and deprecated APIs. Upgrades in two steps: 8→9 (handles
    BinaryFormatter deprecation), then 9→10 (migrates to AddValidation). Each
    step is verified with dotnet build + dotnet test. Incompatible packages are
    replaced with free alternatives.
```

### 6. Setting Up CI/CD

```
You: "Set up CI/CD for this project"

AI: Routed to dotnet-devops. Analyzes the project type (Web API) and platform
    (GitHub). Generates a GitHub Actions workflow: dotnet build → dotnet format
    --verify-no-changes → dotnet test (with Testcontainers) → Docker build & push.
    Configures NuGet caching and triggers deployment only on pushes to main.
```

### 7. Database Performance Investigation (EF Core N+1)

```
You: "The order list page is getting slow — check the database"

AI: Routed to dotnet-performance-analyst. Reviews the repository and spots a
    classic N+1 pattern: each order queries its line items in a loop. Adds
    .Include() to collapse into a single SQL query. Further analysis reveals
    two missing composite indexes — generates migration scripts and a before/after
    performance comparison.
```

---

## Skills

Two gateways activate first: `using-dotnet` detects .NET intent, `dotnet-advisor` (the decision-maker) analyzes your project, asks clarifying questions, and dispatches tasks.

```
Gateway  │ using-dotnet · dotnet-advisor               →  intent detection + routing
Baseline │ dotnet-csharp                                →  C# standards (always loaded)
Build    │ dotnet-api · dotnet-ui                       →  Web API / EF Core / Blazor / MAUI / WPF
Verify   │ dotnet-testing · dotnet-debugging · dotnet-quality  →  testing / WinDbg / cleanup
Operate  │ dotnet-devops · dotnet-tooling · dotnet-upgrade     →  CI/CD / scaffold / migration
Augment  │ dotnet-ai · dotnet-workflow · dotnet-learning       →  MCP, RAG / workflow / learning
```

---

## Agents

Call them by name or let the decision-maker route automatically. Full names begin with `dotnet-`; prefix omitted below.

| You say... | Agent | Focus |
|---|---|---|
| "How should I structure this?" | architect | Architecture, patterns, framework choice |
| "Review this PR" | code-review-agent | Correctness, performance, security |
| "Is this secure?" | security-reviewer | OWASP Top 10, secrets, crypto (read-only) |
| "How should I test this?" | testing-specialist | Strategy, pyramid design, test data |
| "Generate documentation" | docs-generator | DocFX, Mermaid, XML doc skeletons |
| "Clean this up" | refactor-cleaner | 7-step cleanup pipeline |
| "Is my middleware order correct?" | aspnetcore-specialist | Middleware, DI, request pipeline |
| "Why is my async code slow?" | async-performance-specialist | Async/await, ValueTask, ThreadPool |
| "Design a benchmark" | benchmark-designer | BenchmarkDotNet, measurement |
| "Which render mode?" | blazor-specialist | Blazor render modes, components |
| Build fails | build-error-resolver | MSBuild errors, NuGet conflicts |
| "Deploy to cloud?" | cloud-specialist | Aspire, AKS, App Service |
| "Crashes under load" | concurrency-specialist | Race conditions, deadlocks, locks |
| "Build a mobile app" | maui-specialist | MAUI, Xamarin migration |
| "Find the bottleneck" | performance-analyst | Flame graphs, heap dumps, GC analysis |
| "Cross-platform desktop?" | uno-specialist | Uno Platform, MVUX |
| "Create a PR" / "Release" | pr-workflow | PR lifecycle, merge, tagging |

Full catalog: [BEHAVIORS.md](BEHAVIORS.md)

---

## Key Rules

1. **DbContext is the repository** — No Repository/UoW wrappers. Inject DbContext directly.
2. **No FluentValidation** — On .NET 10+, use `AddValidation()` + DataAnnotations. Built-in, source-gen, AOT-safe.
3. **Free/open-source only** — MediatR to Mediator (MIT), AutoMapper to Mapperly, Newtonsoft to System.Text.Json. See [package-choices.md](skills/dotnet-csharp/references/package-choices.md).
4. **No DateTime.Now** — Use `TimeProvider`, constructor-injected everywhere.
5. **Understand before building** — Don't write a single line until you can confidently answer all 7 checklist items in [USAGE.md](USAGE.md).
6. **Self-documenting code** — A fresh AI must understand any generated project in 30 seconds. Zero exceptions.
7. **Use modern alternatives** — IHttpClientFactory, System.Text.Json source-gen, Microsoft.AspNetCore.OpenApi, Mediator (MIT). Never legacy patterns.

Quick reference: [CHEATSHEET.md](skills/CHEATSHEET.md)

---

## 30-Second Rule

Every generated project must be understandable by a fresh AI in 30 seconds. See [SELF_DOCUMENTING.md](SELF_DOCUMENTING.md).

---

## Further Reading

- [Questioning Framework](USAGE.md) — The decision-maker's 4-round discovery process
- [Behavior Catalog](BEHAVIORS.md) — All behaviors with routing logic
- [CLAUDE.md](CLAUDE.md) — Session recovery entry point
- [Web Edition](https://fenzel999.github.io/dotnet-artisan) — Interactive docs

---

MIT
