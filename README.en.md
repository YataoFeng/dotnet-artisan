# dotnet-artisan

[![中文](https://img.shields.io/badge/中文-简体中文-red)](README.md)

**Makes your AI coding agent actually good at .NET.** Install and go. Zero config.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Skills](https://img.shields.io/badge/Skills-14-5b9cf5)](skills/)
[![Agents](https://img.shields.io/badge/Agents-17-8b5cf6)](agents/)
[![References](https://img.shields.io/badge/References-168-4ade80)](skills/)

---

## 30-Second Start

Install the plugin, open your .NET project, and just talk:

```
You: Add an order management module to this project

AI: Before I write code — what kind of orders? Customer purchases or
    internal work orders? What's the flow? What are the statuses?
    (The decision-maker is analyzing before acting)

You: Customer orders. Status: Pending → Confirmed → Shipped.

AI: Understood. This is .NET 10 + PostgreSQL, right?
    Let me capture the domain glossary, then build this module.

(AI starts — picks architecture, scaffolds, writes code, adds tests)
```

**You just talk normally.** The decision-maker analyzes your project, asks the right questions, picks the right architecture, and writes correct code. No skill names to memorize. Nothing to learn.

Try any of these:

> "Review this project's architecture"
> "Is this code secure? Do a security audit"
> "My app crashed in production — here's the dump file"
> "I want to upgrade from .NET 8 to .NET 10"

---

## Why?

| Problem | Without this plugin | With this plugin |
|---------|-------------------|------------------|
| Dead/commercial packages | Swashbuckle (unmaintained), FluentValidation (no AOT), MediatR (commercial) | `Microsoft.AspNetCore.OpenApi`, `AddValidation()`, direct handlers — built-in, free, AOT-safe |
| Anti-patterns | Wraps DbContext in useless IRepository/IUnitOfWork | Injects DbContext directly. EF Core IS the repository. |
| Frozen knowledge | Doesn't know .NET 10: `HybridCache`, file-based apps, `field` keyword | Detects .NET 8–11 automatically, adapts guidance per version |
| Jumps to code | "Build me an order system" → scaffolds wrong assumptions | Completes 7-item checklist, captures domain glossary, picks architecture, then builds |
| Lost context | Disconnect → reconnect → AI has no idea what you built | 30-second rule: every file is self-documenting. AI re-understands instantly |
| Vague debugging | "My app crashed" → generic advice | Opens .dmp in WinDbg, `!analyze -v`, traces to exact line |

## What can it do?

### Build Something New

"Create a customer order Web API"
→ AI asks: order type? flow? .NET version? database?
→ Picks architecture (single/VSA/DDD/Clean) → scaffolds
→ EF Core + Minimal API + auth + OpenAPI + Scalar
→ Integration tests (Testcontainers + real PostgreSQL)
→ Every file self-documenting

Blazor dashboards, CLI tools, gRPC services, AI features (MCP/Semantic Kernel/RAG) — same flow.

### Fix Something Broken

"Production OutOfMemoryException" → debug specialist → WinDbg `!dumpheap -stat` → 850MB byte[] held by ImageCache singleton → reports root cause + fix

Deadlock detection (!dlk, !syncblk), build error diagnostics, race condition analysis — all covered.

### Review and Improve

"Review this PR" → multi-dimensional (correctness/perf/security/architecture) → categorized findings + fixes
"Is this secure?" → OWASP audit (read-only)
"Clean this up" → 7-step pipeline: format → warnings → dead code → CancellationToken
"How should I structure this?" → architect recommends patterns based on complexity

### Test

Unit (xUnit v3) · Integration (Testcontainers) · E2E (Playwright) · BDD (Reqnroll + lightweight xUnit) · Benchmarks (BenchmarkDotNet)

### Ship

Git workflow (branching + Conventional Commits) · CI/CD pipelines · Docker · Cloud (Aspire/AKS) · NuGet · Full PR lifecycle (create→review→merge→release)

### Level Up

.NET migration (8→9→10→11) · Native AOT · Pattern learning from corrections · Parallel workflow optimization

---

## Who Does What?

Two gateways auto-activate when the plugin is installed:

```
You say anything .NET-related
  → using-dotnet (intent: "Is this .NET?")
  → dotnet-advisor (THE DECISION-MAKER: reads your project files, detects version, analyzes intent, routes to skills, asks if unsure)
  → Domain skills + dotnet-csharp (baseline, always loaded) + optional specialist agents
```

### Skills (14)

#### Gateway — Always Run First

| Skill | Role |
|------|------|
| `using-dotnet` | Intent detector. "Is this .NET?" Pass to decision-maker. |
| `dotnet-advisor` | **The decision-maker.** Reads .csproj/global.json, detects .NET version, analyzes intent, routes to specialists. Asks clarifying questions when intent is ambiguous. |

#### Baseline — Always Loaded

| Skill | Role | Refs |
|------|------|------|
| `dotnet-csharp` | C# language standards: async/await, DI, LINQ, concurrency, type design. Active for every code path. | 25 |

#### Builders — Create Things

| Skill | Builds | Refs |
|------|--------|------|
| `dotnet-api` | Web APIs, EF Core, gRPC, SignalR, auth, caching, YARP | 32 |
| `dotnet-ui` | Blazor, MAUI, Uno Platform, WPF, WinUI 3, WinForms | 20 |

#### Verifiers — Check & Fix

| Skill | Checks | Refs |
|------|--------|------|
| `dotnet-testing` | xUnit v3, Testcontainers, Playwright E2E, BDD, BenchmarkDotNet | 14 |
| `dotnet-debugging` | WinDbg crash dumps, deadlocks, memory leaks, high CPU | 17 |
| `dotnet-quality` | 7-step cleanup: format → warnings → dead code → CancellationToken | — |

#### Operators — Ship & Maintain

| Skill | Operates | Refs |
|------|---------|------|
| `dotnet-devops` | CI/CD, Git workflow, Docker, NuGet, OpenTelemetry | 19 |
| `dotnet-tooling` | Project bootstrapper (architecture→structure→scaffold), MSBuild, Native AOT, CLI, SDK, domain analysis | 36 |
| `dotnet-upgrade` | .NET migration (8→9→10→11), AOT compatibility, nullable migration | — |

#### Augmenters — Extend & Improve

| Skill | Augments | Refs |
|------|---------|------|
| `dotnet-ai` | MCP servers, Semantic Kernel, RAG, ML.NET | — |
| `dotnet-workflow` | Parallel worktrees, context management, Claude Code optimization | — |
| `dotnet-learning` | Correction capture, pattern generalization, memory storage | — |

### Agents (17)

#### Role-Based — Act Like Human Specialists

| Agent | Acts As | Uses Skills | Invoke When |
|------|---------|------------|-------------|
| `dotnet-architect` | Software architect | dotnet-advisor, dotnet-csharp, **dotnet-tooling** | "How should I structure this?" |
| `dotnet-code-review-agent` | Code reviewer | **dotnet-csharp, dotnet-api, dotnet-ui**, dotnet-security-reviewer, dotnet-async-performance-specialist, dotnet-csharp-concurrency-specialist, dotnet-performance-analyst, dotnet-benchmark-designer, dotnet-blazor-specialist, dotnet-cloud-specialist, dotnet-testing-specialist | "Review this PR" |
| `dotnet-security-reviewer` | Security auditor | dotnet-advisor, **dotnet-api** | "Is this secure?" (read-only) |
| `dotnet-testing-specialist` | Test architect | **dotnet-testing, dotnet-ui**, dotnet-benchmark-designer, dotnet-blazor-specialist, dotnet-maui-specialist, dotnet-uno-specialist, dotnet-security-reviewer | "How should I test this?" |
| `dotnet-docs-generator` | Technical writer | **dotnet-tooling, dotnet-api, dotnet-csharp, dotnet-devops** | "Generate documentation" |
| `dotnet-refactor-cleaner` | Cleanup specialist | — (runs 7-step cleanup independently) | "Clean this up" |

#### Tool-Based — Deep Technical Analysis

| Agent | Analyzes | Uses Skills | Invoke When |
|------|----------|------------|-------------|
| `dotnet-aspnetcore-specialist` | Middleware, DI, pipelines | **dotnet-api, dotnet-csharp**, dotnet-async-performance-specialist, dotnet-blazor-specialist, dotnet-security-reviewer | "Is my middleware order correct?" |
| `dotnet-async-performance-specialist` | Async/await, ValueTask, ThreadPool | **dotnet-csharp, dotnet-tooling**, dotnet-performance-analyst, dotnet-benchmark-designer, dotnet-csharp-concurrency-specialist | "Why is my async code slow?" |
| `dotnet-benchmark-designer` | BenchmarkDotNet, measurement | **dotnet-testing, dotnet-tooling**, dotnet-performance-analyst | "Design a benchmark" |
| `dotnet-blazor-specialist` | Blazor render modes, components | **dotnet-ui, dotnet-api, dotnet-tooling, dotnet-testing** | "Which render mode?" |
| `dotnet-build-error-resolver` | MSBuild errors, SDK conflicts | — (direct Read/Grep/Bash) | Build fails |
| `dotnet-cloud-specialist` | Aspire, AKS, cloud | **dotnet-devops, dotnet-api**, dotnet-architect, dotnet-security-reviewer, dotnet-performance-analyst | "Deploy to cloud?" |
| `dotnet-csharp-concurrency-specialist` | Race conditions, deadlocks | **dotnet-csharp** | "Crashes under concurrency?" |
| `dotnet-maui-specialist` | MAUI, Xamarin migration | **dotnet-ui, dotnet-tooling** | "Build a mobile app" |
| `dotnet-performance-analyst` | Flame graphs, heap, GC | **dotnet-tooling, dotnet-testing, dotnet-devops**, dotnet-benchmark-designer | "Find the bottleneck" |
| `dotnet-uno-specialist` | Uno Platform, MVUX | **dotnet-ui, dotnet-csharp, dotnet-tooling, dotnet-testing** | "Cross-platform desktop?" |

#### Workflow — Manage Development Process

| Agent | Manages | Invoke When |
|------|---------|-------------|
| `dotnet-pr-workflow` | Full PR lifecycle: analyze diff → Conventional Commit title → PR body → CI check → automated review → squash-merge → version bump + changelog + tag | "Create PR", "merge", "release" |

---

## Self-Documenting Code (30-Second Rule)

Every generated project follows one rule: **a fresh AI must understand it in 30 seconds.**

| Rule | Do | Don't |
|------|-----|-------|
| Solution at root | `OrderManagement.slnx` visible | Hidden in `/src/` |
| Domain project names | `OrderManagement.Api` | `Core`, `Shared`, `Services` |
| One-line file headers | `// Handles fulfillment: validates payment, reserves inventory, creates shipment` | `// Order handler` |
| Explicit dependencies | `constructor(AppDbContext, IHybridCache, TimeProvider)` | `IServiceProvider.GetService<T>()` |
| WHY comments only | `// IServiceScopeFactory: BackgroundService outlives Scoped DbContext` | `// Saves the order` |
| No generic names | — | `Helper`, `Manager`, `Utils`, `Common` |

**[→ Full Guide](SELF_DOCUMENTING.md)**

---

## Install

```bash
claude plugins install fenzel999/dotnet-artisan
```

Compatible with GitHub Copilot, VS Code, Cursor. [agentskills.io](https://agentskills.io) standard.

Install and done. Open a .NET project → Harness auto-detects → skills load → decision-maker activates. **[→ How harness works](harness/README.md)**

---

## Core Principles

1. **Exhaust questions before acting** — Complete 7-item checklist before writing code. Any "I don't know" → ask more. [→ USAGE.md](USAGE.md)
2. **KISS first** — Simple CRUD does not need DDD. Match pattern to problem scale.
3. **No Repository wrappers** — DbContext IS the UoW; DbSet IS the repository. Inject directly.
4. **No DateTime.Now** — `TimeProvider` everywhere. Injectable, testable.
5. **No commercial packages** — Free/open-source only. MediatR→Mediator(MIT), AutoMapper→Mapperly.
6. **Self-documenting code** — 30-second rule. [→ SELF_DOCUMENTING.md](SELF_DOCUMENTING.md)

---

## Guides

| Guide | Covers |
|-------|--------|
| [USAGE.md](USAGE.md) | 7-item checklist + 4-round questioning + domain-driven analysis |
| [SELF_DOCUMENTING.md](SELF_DOCUMENTING.md) | 30-second rule, 8 MUST rules, 4 NEVER patterns |
| [BEHAVIORS.md](BEHAVIORS.md) | 30+ behavior catalog + decision-maker routing |
| [CLAUDE.md](CLAUDE.md) | Context reconnection — read first in a fresh AI session |
| [CHEATSHEET.md](skills/CHEATSHEET.md) | All rules in one page |
| [DECISIONS.md](skills/DECISIONS.md) | "When to use what" |

---

## License

MIT
