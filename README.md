# dotnet-artisan

[![中文](https://img.shields.io/badge/中文-简体中文-red)](README.zh-CN.md)

**Makes your AI coding agent actually good at .NET.**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Skills](https://img.shields.io/badge/Skills-14-5b9cf5)](skills/)
[![Agents](https://img.shields.io/badge/Agents-17-8b5cf6)](agents/)

---

## Why use this?

If you use Claude Code (or Copilot, Cursor) for .NET development, you've probably seen these problems:

| Problem | Without this plugin | With this plugin |
|---------|-------------------|------------------|
| Dead packages | AI recommends Swashbuckle (unmaintained), FluentValidation (no AOT), MediatR (commercial) | AI uses `Microsoft.AspNetCore.OpenApi`, `AddValidation()`, direct handlers — all built-in, free, AOT-safe |
| Anti-patterns | AI wraps DbContext in useless IRepository/IUnitOfWork layers | AI injects DbContext directly. EF Core IS the repository. |
| Frozen knowledge | AI doesn't know .NET 10 features: `HybridCache`, file-based apps, `field` keyword | AI knows every .NET version from 8 to 11 and adapts automatically |
| Jumps to code | "Build me an order system" → AI immediately scaffolds a project with wrong assumptions | AI asks 3-4 rounds of questions first, captures a domain glossary, then builds |
| Lost context | Disconnect → reconnect → AI has no idea what you built or why | AI reads the code in 30 seconds because every file is self-documenting |
| Vague debugging | "My app crashes" → AI gives generic advice | AI opens .dmp in WinDbg, runs `!analyze -v`, traces root cause to exact line |

---

## What can it do? (Practical)

### When you're building something new

"Create a Web API for customer orders"

→ AI asks: What kind of orders? Who places them? What's the flow? .NET version? Database?
→ Scaffolds project with EF Core, Minimal APIs, auth, OpenAPI, Scalar docs
→ Sets up integration tests with real PostgreSQL via Testcontainers
→ Every file follows self-documenting rules so it's readable forever

"Build a Blazor dashboard" — same flow, but for UI: picks render mode, sets up components, auth state.

"Create a CLI tool" — System.CommandLine or Spectre.Console, Native AOT-ready.

"Add AI to my app" — Semantic Kernel, MCP servers, RAG pipelines.

### When something's broken

"Production is crashing with OutOfMemoryException"

→ AI loads the **debugging specialist**, opens your .dmp file in WinDbg
→ `!analyze -v` → `!dumpheap -stat` → finds 850MB of byte[] held by ImageCache
→ Reports: "Your image cache has no eviction. Fix: IMemoryCache with SizeLimit."

"My app freezes under load" → deadlock detection (!dlk, !syncblk)

"Build fails" → MSBuild diagnostic specialist resolves NuGet conflicts, SDK issues

"Race condition" → concurrency specialist finds unsynchronized shared state

### When you need a second opinion

"Review this code" → multi-dimensional analysis: correctness, performance, security, architecture. Returns categorized findings with fix suggestions.

"Is this secure?" → OWASP audit. Finds hardcoded secrets, SQL injection risks, missing auth. Read-only.

"How should I structure this?" → architecture specialist recommends patterns based on complexity.

"Clean this up" → 7-step pipeline: format → unused usings → fix warnings → dead code → TODOs → sealed audit → CancellationToken. Each step verified with `dotnet build && dotnet test`.

### When you're shipping

"Set up CI/CD" → GitHub Actions pipeline with caching, testing, Docker build
"Containerize" → multi-stage Dockerfile, chiseled images, non-root user
"Deploy to cloud" → .NET Aspire orchestration, AKS, health checks
"Add monitoring" → OpenTelemetry + Serilog structured logging

---

## How to install

```bash
claude plugins install YataoFeng/dotnet-artisan
```

Also works with GitHub Copilot, VS Code, Cursor. Follows the [agentskills.io](https://agentskills.io) standard.

### Harness (auto-pilot for your .NET projects)

Drop this into any .NET project to get auto-skill-loading, permission shortcuts, and quality reminders — no config needed:

```bash
cp -r harness/.claude/ your-project/.claude/
```

What it does:

| Event | What happens |
|-------|--------------|
| You open a .NET project | Auto-detects .cs/csproj/sln files, loads skills, reminds you to read rules |
| You type a .NET-related prompt | Decision-maker analyzes intent, checks your project version, routes to specialists |
| You create a new .cs file | Reminds you to add a one-line purpose comment (30-second rule) |
| dotnet/git/docker commands | Pre-authorized — no permission prompts |

**[→ Full harness docs](harness/README.md)**

---

## Who's in the team?

### The Decision-Maker (always runs first)

When you say anything .NET-related, two gateways fire:

| Role | Who | What it does |
|------|-----|--------------|
| Intent detector | `using-dotnet` | "Is this a .NET request?" If yes, pass to decision-maker |
| **Decision-maker** | `dotnet-advisor` | Reads your project files, detects .NET version, analyzes your intent, routes to the right specialists. Asks clarifying questions if your intent is ambiguous. |

### The Specialists (loaded when needed)

Each specialist has deep knowledge in one domain, backed by reference files with patterns and anti-patterns.

#### Building things

| Specialist | What it builds | Backed by |
|------------|---------------|-----------|
| `dotnet-api` | Web APIs, EF Core, gRPC, SignalR, auth, caching, YARP reverse proxy | 32 reference files |
| `dotnet-ui` | Blazor, MAUI, Uno Platform, WPF, WinUI 3, WinForms | 20 reference files |

**Tools they use**: project scaffolding, MSBuild, NuGet, SDK management (via `dotnet-tooling`)

#### Checking things

| Specialist | What it checks | Backed by |
|------------|---------------|-----------|
| `dotnet-testing` | Unit tests (xUnit v3), integration tests (Testcontainers), E2E (Playwright), benchmarks | 13 reference files |
| `dotnet-debugging` | Crash dumps (WinDbg), deadlocks, memory leaks, high CPU | 17 reference files — uses MCP WinDbg tools |
| `dotnet-quality` | 7-step cleanup: format → warnings → dead code → CancellationToken | Built-in pipeline |

#### Shipping things

| Specialist | What it handles | Backed by |
|------------|-----------------|-----------|
| `dotnet-devops` | CI/CD, Docker, NuGet publishing, OpenTelemetry | 18 reference files |
| `dotnet-tooling` | MSBuild, Native AOT, CLI tools, SDK install, profiling | 34 reference files |
| `dotnet-upgrade` | .NET version migration (8→9→10→11), AOT compatibility | Migration guides |

#### Extending things

| Specialist | What it adds | Backed by |
|------------|-------------|-----------|
| `dotnet-ai` | MCP servers, Semantic Kernel, RAG, ML.NET | AI integration patterns |
| `dotnet-workflow` | Parallel worktrees, context management, Claude Code optimization | Workflow patterns |
| `dotnet-learning` | Captures your corrections, generalizes into rules, stores in MEMORY.md | Learning system |

**Always active**: `dotnet-csharp` is loaded on every code path. It enforces C# standards: async/await correctness, DI patterns, LINQ optimization, concurrency safety. 25 reference files.

### The Expert Advisors (on-demand deep analysis)

When a specialist needs a deeper look, it calls in an expert advisor. These are like calling a senior colleague for a second opinion.

**Role-based advisors** — they act like human specialists, make judgment calls, explain their reasoning:

| Advisor | Acts as | Call when... |
|---------|---------|--------------|
| `dotnet-architect` | Software architect | "How should I structure this project?" |
| `dotnet-code-review-agent` | Senior code reviewer | "Review this PR thoroughly" |
| `dotnet-security-reviewer` | Security auditor | "Is this code secure?" (read-only, doesn't change code) |
| `dotnet-testing-specialist` | Test architect | "What's the right test strategy here?" |
| `dotnet-docs-generator` | Technical writer | "Generate docs for this project" |
| `dotnet-refactor-cleaner` | Cleanup specialist | "Clean up this codebase" |

**Tool-based advisors** — they do deep technical analysis in one specific area:

| Advisor | Analyzes | Call when... |
|---------|----------|--------------|
| `dotnet-aspnetcore-specialist` | Middleware, DI, request pipelines | "Is my middleware order correct?" |
| `dotnet-async-performance-specialist` | Async/await, ValueTask, ThreadPool | "Why is my async code slow?" |
| `dotnet-benchmark-designer` | BenchmarkDotNet, measurement | "I need an accurate benchmark" |
| `dotnet-blazor-specialist` | Blazor render modes, components | "Which Blazor render mode?" |
| `dotnet-build-error-resolver` | MSBuild errors, SDK conflicts | Build won't compile |
| `dotnet-cloud-specialist` | .NET Aspire, AKS, cloud | "Deploy this to Azure?" |
| `dotnet-csharp-concurrency-specialist` | Race conditions, deadlocks | "This breaks under concurrency" |
| `dotnet-maui-specialist` | MAUI, Xamarin migration | "Build a mobile app" |
| `dotnet-performance-analyst` | Flame graphs, heap dumps, GC | "Find the performance bottleneck" |
| `dotnet-uno-specialist` | Uno Platform, MVUX | "Cross-platform desktop app?" |

---

## What makes the code good?

Every project this plugin generates follows one rule: **a fresh AI session must understand it in 30 seconds.**

| Rule | Good | Bad |
|------|------|-----|
| Solution at root | `OrderManagement.slnx` at top level | Hidden in `/src/` |
| Project names = domain | `OrderManagement.Api` | `Core`, `Shared`, `Services` |
| File headers | `// Handles fulfillment: validates payment, reserves inventory, creates shipment` | `// Order handler` |
| Dependencies | `constructor(AppDbContext, IHybridCache, TimeProvider)` | `IServiceProvider.GetService<T>()` |
| Comments | `// IServiceScopeFactory: BackgroundService outlives Scoped DbContext` | `// Saves the order` |

[Full guide →](SELF_DOCUMENTING.md)

---

## How to get the most out of it

1. **Be specific about what you want.** "I need an order system" triggers the questioning framework. The more context you give, the fewer rounds of questions.

2. **Let the AI ask questions.** Don't rush to code. The 3-4 rounds of domain discovery prevent weeks of rework.

3. **Save crash dumps.** When something breaks in production, having a `.dmp` file means the debugging specialist can find the root cause in minutes.

4. **Read the guides.** [USAGE.md](USAGE.md) shows the full workflow. [BEHAVIORS.md](BEHAVIORS.md) lists every behavior.

---

## License

MIT
