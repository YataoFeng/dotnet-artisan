# dotnet-artisan

[![中文](https://img.shields.io/badge/中文-简体中文-red)](README.zh-CN.md) [![English](https://img.shields.io/badge/English-README-blue)](README.md)

**.NET development skills for AI coding agents.**
Claude Code · GitHub Copilot · VS Code · Cursor

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Skills](https://img.shields.io/badge/Skills-14-5b9cf5)](skills/)
[![Agents](https://img.shields.io/badge/Agents-17-8b5cf6)](agents/)
[![References](https://img.shields.io/badge/References-160+-4ade80)](skills/)

---

## Why This Exists

AI coding agents have two critical flaws with .NET:

1. **They don't know .NET's latest patterns.** Training data is frozen. They recommend Swashbuckle (dead), MediatR (commercial), FluentValidation (AOT-incompatible), and Repository wrappers (anti-pattern). They don't know .NET 10's `AddValidation()`, `HybridCache`, or `Microsoft.AspNetCore.OpenApi`.

2. **They forget context between sessions.** Disconnect and reconnect, and the AI has no idea what you built or what decisions you made.

**This repo fixes both.** It teaches AIs to write correct .NET code AND ensures they re-understand any project in 30 seconds.

---

## Usage Flow

Here's what actually happens when you use this repo:

### Example 1: "I need an order management system"

```
YOU: "I need an order management system"

AI (decision-maker kicks in):
  "Before I write code — what kind of orders? Purchase orders?
   Work orders? Customer orders from a storefront?"

YOU: "Customer orders from our online store"

AI:
  "Got it. Who places orders — external customers? Internal staff?"
  "Walk me through one order: what happens step by step?"
  "What does 'order status' mean to you — Pending/Confirmed/Shipped?"

YOU: "Customers place orders. Status goes: Pending → Confirmed → Shipped → Delivered"

AI (domain glossary captured):
  "Understood. One more round:
   - .NET 10 or 8? PostgreSQL or SQL Server?
   - Is this production or prototype?
   - Do you need tests?"

YOU: ".NET 10, PostgreSQL, production, yes tests"

AI (decision-maker routes):
  → dotnet-api + dotnet-tooling + dotnet-csharp loaded
  → Scaffolds OrderManagement.Api with EF Core + Minimal APIs + auth
  → Sets up Testcontainers with PostgreSQL for integration tests
  → Every file follows 30-second rule (self-documenting)
```

**Behavior chain**: Intent detection → 3 rounds of questions → domain glossary → architecture choice → scaffold → test setup → self-documenting code.

### Example 2: "My app crashes in production"

```
YOU: "My app keeps crashing in production"

AI (decision-maker):
  "Do you have a .dmp file or crash dump? If not, can you reproduce it?"
  "What's the crash symptom — OutOfMemoryException? StackOverflow?
   Or just 'stops working'?"

YOU: "OutOfMemoryException, I have a dump file at C:\dumps\crash.dmp"

AI (decision-maker routes):
  → dotnet-debugging loaded
  → Opens crash.dmp with WinDbg
  → Runs !analyze -v → "CLR exception: OutOfMemoryException"
  → Runs !dumpheap -stat → "90% of heap is byte[] — 850MB"
  → Runs !gcroot on largest byte[] → "Held by ImageCache singleton, never pruned"
  → Reports: "Your ImageCache stores raw images in memory with no eviction.
     Fix: use IMemoryCache with SizeLimit and SetSize for LRU eviction."
```

**Behavior chain**: Intent detection → diagnostic → WinDbg commands → root cause found → fix recommendation.

### Example 3: "Review my code"

```
YOU: "Review this PR"

AI (decision-maker):
  → dotnet-code-review-agent invoked (separate sub-session)
  → Analyzes: correctness → performance → security → architecture
  → Reports: "3 issues found:
     1. [Critical] Scoped DbContext injected into Singleton cache
     2. [Performance] N+1 query in OrderList endpoint
     3. [Security] API key hardcoded in appsettings.json"
```

**Behavior chain**: Intent detection → code-review agent → multi-dimensional analysis → categorized findings.

---

## Skill Categories

### Gateway (Always Run First)

| Skill | Role |
|-------|------|
| `using-dotnet` | Intent detector — "Is this .NET?" |
| `dotnet-advisor` | **The decision-maker.** Analyzes your prompt + project files, detects .NET version, routes to right skills, asks clarifying questions when intent is unclear. |

### Baseline (Always Loaded)

| Skill | Role |
|-------|------|
| `dotnet-csharp` | C# language standards. Async/await, DI, LINQ, concurrency, type design. Active for every code path. |

### Builders (Create Things)

| Skill | Builds |
|-------|--------|
| `dotnet-api` | Web APIs, EF Core, gRPC, SignalR, auth, caching, YARP |
| `dotnet-ui` | Blazor, MAUI, Uno, WPF, WinUI, WinForms |

### Verifiers (Check & Fix)

| Skill | Verifies |
|-------|--------|
| `dotnet-testing` | xUnit v3, integration tests (Testcontainers), E2E (Playwright), benchmarks |
| `dotnet-debugging` | Crash dumps (WinDbg), deadlocks, memory leaks, high CPU |
| `dotnet-quality` | 7-step cleanup: format → unused usings → warnings → dead code → TODOs → sealed audit → CancellationToken |

### Operators (Ship & Maintain)

| Skill | Operates |
|-------|--------|
| `dotnet-devops` | CI/CD, Docker, NuGet publishing, OpenTelemetry |
| `dotnet-tooling` | MSBuild, Native AOT, CLI tools, SDK management, profiling |
| `dotnet-upgrade` | .NET version migration (8→9→10→11), AOT compatibility, nullable migration |

### Augmenters (Extend & Improve)

| Skill | Augments |
|-------|--------|
| `dotnet-ai` | MCP servers, Semantic Kernel, RAG, ML.NET |
| `dotnet-workflow` | Parallel worktrees, context management, verification loops |
| `dotnet-learning` | Correction capture, pattern generalization, memory storage |

---

## Specialist Agent Categories

### Role-Based Agents

Act like a human specialist. Understand context, make judgment calls, explain reasoning.

| Agent | Acts As | Invoke When |
|-------|---------|-------------|
| `dotnet-architect` | Software architect | "How should I structure this?" |
| `dotnet-code-review-agent` | Code reviewer | "Review this PR" |
| `dotnet-security-reviewer` | Security auditor | "Is this secure?" (read-only) |
| `dotnet-testing-specialist` | Test architect | "How should I test this?" |
| `dotnet-docs-generator` | Technical writer | "Generate documentation" |
| `dotnet-refactor-cleaner` | Cleanup specialist | "Clean this up" |

### Tool-Based Agents

Perform specific technical deep-dive analysis. Focus on one domain.

| Agent | Analyzes | Invoke When |
|-------|----------|-------------|
| `dotnet-aspnetcore-specialist` | Middleware, DI, pipelines | "Is my middleware order correct?" |
| `dotnet-async-performance-specialist` | Async/await perf, ValueTask | "Why is my async code slow?" |
| `dotnet-benchmark-designer` | BenchmarkDotNet, measurement | "Design a benchmark" |
| `dotnet-blazor-specialist` | Blazor render modes, components | "Which render mode?" |
| `dotnet-build-error-resolver` | MSBuild errors, SDK conflicts | Build fails |
| `dotnet-cloud-specialist` | Aspire, AKS, cloud deploy | "Deploy to cloud?" |
| `dotnet-csharp-concurrency-specialist` | Race conditions, deadlocks | "Crashes under load?" |
| `dotnet-maui-specialist` | MAUI, Xamarin migration | "Build MAUI app" |
| `dotnet-performance-analyst` | Flame graphs, heap, GC | "Find bottleneck" |
| `dotnet-uno-specialist` | Uno Platform, MVUX | "Cross-platform Uno?" |

---

## Self-Documenting Code

Every generated project follows the **30-second rule**: a fresh AI must understand it in 30 seconds.

| Rule | Do | Don't |
|------|-----|-------|
| Solution at root | `.slnx` visible immediately | Hidden in subdirectory |
| Domain project names | `OrderManagement.Api` | `Core`, `Shared` |
| One-line file headers | `// Handles fulfillment: validates payment, reserves inventory, creates shipment` | `// Order handler` |
| Explicit dependencies | Constructor parameters | Service Locator |
| WHY comments only | `// IServiceScopeFactory: BackgroundService outlives Scoped DbContext` | `// Saves the order` |
| No generic names | — | `Helper`, `Manager`, `Utils`, `Common` |

**[→ Full Guide](SELF_DOCUMENTING.md)**

## Core Principles

1. **KISS first** — Simple CRUD does not need DDD or CQRS.
2. **No Repository wrappers** — DbContext IS the UoW; DbSet IS the repository.
3. **No commercial packages** — Free/open-source only.
4. **No DateTime.Now** — `TimeProvider` everywhere.
5. **Self-documenting code** — 30-second rule. [Guide →](SELF_DOCUMENTING.md)
6. **Question before coding** — Domain glossary first. [Guide →](USAGE.md)

## Quick Start

```bash
claude plugins install YataoFeng/dotnet-artisan
```

## Guides

| Guide | Topic |
|-------|-------|
| [USAGE.md](USAGE.md) | 4-round questioning framework, domain-driven analysis |
| [SELF_DOCUMENTING.md](SELF_DOCUMENTING.md) | 30-second rule, 8 MUST rules, 4 NEVER patterns |
| [BEHAVIORS.md](BEHAVIORS.md) | 30+ behaviors catalog + routing logic |
| [CLAUDE.md](CLAUDE.md) | Context reconnection — read first in fresh session |
| [CHEATSHEET.md](skills/CHEATSHEET.md) | All rules in one page |
| [DECISIONS.md](skills/DECISIONS.md) | "When to use what" |

## License

MIT
