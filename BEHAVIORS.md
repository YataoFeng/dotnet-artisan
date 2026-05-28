# Behavior Catalog

Every behavior this repo can perform, organized by **what you want to achieve**, not by skill name. The decision-maker (`dotnet-advisor`) routes your intent to the right behavior automatically.

## The Decision-Maker

Before any behavior executes, two gateway skills bridge the gap between your words and the right action:

| Role | Skill | What It Does |
|------|-------|--------------|
| **Intent Detector** | `using-dotnet` | Detects .NET requests from keywords + repo signals. Always runs first. |
| **Decision-Maker** | `dotnet-advisor` | Routes your intent to the right skills + agents. Checks your .NET version. Loads coding standards. Disambiguates overlapping needs. |

The decision-maker doesn't just route — it **analyzes**: your prompt, your project files, your .NET version. Then it asks clarifying questions before delegating. You get the right skill, in the right order, for the right .NET version.

---

## Behavior Categories

### Build Something New

| Behavior | Skills Used | What Happens |
|----------|-------------|--------------|
| **Create a Web API** | `dotnet-api` + `dotnet-tooling` + `dotnet-csharp` | Scaffolds project, sets up EF Core, Minimal APIs, auth, OpenAPI |
| **Create a Blazor app** | `dotnet-ui` + `dotnet-tooling` + `dotnet-csharp` | Scaffolds Blazor project, chooses render mode, sets up components |
| **Create a MAUI app** | `dotnet-ui` + `dotnet-tooling` | Cross-platform mobile/desktop with .NET MAUI |
| **Create a CLI tool** | `dotnet-tooling` + `dotnet-csharp` | System.CommandLine or Spectre.Console CLI with AOT support |
| **Create a gRPC service** | `dotnet-api` + `dotnet-csharp` | Proto contracts, streaming, interceptors |
| **Create a desktop app** | `dotnet-ui` | WPF/WinUI 3/WinForms depending on requirements |
| **Add AI to your app** | `dotnet-ai` + `dotnet-api` | Semantic Kernel, MCP servers, RAG pipelines, ML.NET |

### Fix Something Broken

| Behavior | Skills Used | What Happens |
|----------|-------------|--------------|
| **App crashed — analyze dump** | `dotnet-debugging` | Opens .dmp with WinDbg, runs !analyze, finds crash root cause |
| **App is stuck/hanging** | `dotnet-debugging` | Deadlock detection (!dlk, !syncblk), thread analysis |
| **Memory leak** | `dotnet-debugging` | Heap analysis (!dumpheap, !gcroot), finds what's holding memory |
| **High CPU** | `dotnet-debugging` + `dotnet-performance-specialist` | !runaway, flame graphs, hot path identification |
| **Build errors** | `dotnet-code-lifecycle-agent` | Diagnoses MSBuild errors, NuGet conflicts, SDK issues |
| **Slow async code** | `dotnet-performance-specialist` | Finds .Result misuse, missing ConfigureAwait, thread pool starvation |
| **Race condition** | `dotnet-csharp-concurrency-specialist` | Finds unsynchronized shared state, lock gaps |
| **Database query too slow** | `dotnet-api` + `dotnet-performance-analyst` | N+1 detection, missing indexes, query plan analysis |

### Improve Code Quality

| Behavior | Skills Used | What Happens |
|----------|-------------|--------------|
| **Code review** | `dotnet-code-review-agent` | Multi-dimensional review: correctness, perf, security, architecture |
| **Security audit** | `dotnet-security-reviewer` | OWASP Top 10, secret leaks, crypto misuse — read-only, no code changes |
| **7-step cleanup** | `dotnet-code-lifecycle-agent` | Format → unused usings → fix warnings → dead code → TODOs → seal audit → CancellationToken |
| **Refactor safely** | `dotnet-code-lifecycle-agent` | Runs cleanup pipeline, verifies each step with build+test |
| **Architecture review** | `dotnet-architect` | Recommends patterns, catches over-engineering, suggests structure |
| **Domain analysis** | `dotnet-domain-analyst` + `dotnet-tooling` | Event storming, bounded contexts, ubiquitous language, context map, aggregate design |
| **Test quality check** | `dotnet-testing` + `dotnet-testing-specialist` | CRAP scores, coverage gaps, test smell detection |

### Test It

| Behavior | Skills Used | What Happens |
|----------|-------------|--------------|
| **Write unit tests** | `dotnet-testing` + `dotnet-csharp` | xUnit v3, Facts/Theories, mocking strategy |
| **Write integration tests** | `dotnet-testing` + `dotnet-api` | WebApplicationFactory, Testcontainers with real PostgreSQL |
| **Write E2E tests** | `dotnet-testing` | Playwright browser automation, CI caching |
| **Write BDD scenarios** | `dotnet-testing` | Reqnroll (MIT) for .feature files or lightweight xUnit Given/When/Then |
| **Write benchmarks** | `dotnet-performance-specialist` | BenchmarkDotNet with MemoryDiagnoser, avoids measurement bias |
| **Snapshot testing** | `dotnet-testing` | Verify with scrubbing for stable output tests |

### Manage Code

| Behavior | Skills Used | What Happens |
|----------|-------------|--------------|
| **Create a PR** | `dotnet-pr-workflow` | Analyzes diff, generates conventional commit title, creates PR with body |
| **Merge a PR** | `dotnet-pr-workflow` | Verifies CI + approval, squash-merges, deletes branch |
| **Release a version** | `dotnet-devops` + `dotnet-pr-workflow` | Determines version bump, generates changelog, tags and pushes |
| **Set up branch strategy** | `dotnet-devops` | Recommends Trunk-Based/GitHub Flow/GitFlow based on team size |

### Ship It

| Behavior | Skills Used | What Happens |
|----------|-------------|--------------|
| **Set up CI/CD** | `dotnet-devops` | GitHub Actions, build/test/deploy pipeline, NuGet caching |
| **Containerize** | `dotnet-devops` | Multi-stage Dockerfile, chiseled images, non-root user |
| **Deploy to cloud** | `dotnet-cloud-specialist` + `dotnet-devops` | .NET Aspire, AKS, App Service, infrastructure-as-code |
| **Add observability** | `dotnet-devops` | OpenTelemetry, metrics, tracing, structured logging with Serilog |
| **Generate docs** | `dotnet-docs-generator` | DocFX, Mermaid diagrams, XML doc skeletons, README scaffolding |
| **Publish NuGet** | `dotnet-devops` + `dotnet-tooling` | Package authoring, source generators, versioning, push to NuGet.org |

### Level Up

| Behavior | Skills Used | What Happens |
|----------|-------------|--------------|
| **Upgrade .NET version** | `dotnet-devops` | net8→net9→net10→net11 step by step, breaking change assessment |
| **Migrate to Native AOT** | `dotnet-tooling` + `dotnet-devops` | Reflection audit, source-gen replacement, publish validation |
| **Learn from corrections** | `dotnet-workflow` | Captures your corrections, generalizes into rules, stores in MEMORY.md |
| **Optimize workflow** | `dotnet-workflow` | Parallel worktrees, token budget management, plan-mode strategy |

---

## Agent Directory (When Deep Analysis Is Needed)

The decision-maker invokes specialist agents for one-shot deep analysis. Each agent is an independent sub-session:

| Agent | Specialization | Example Trigger |
|-------|---------------|-----------------|
| `dotnet-architect` | Architecture, framework choice | "How should I structure this?" |
| `dotnet-domain-analyst` | Domain analysis, event storming, bounded contexts | "Analyze the domain", "Run DDD analysis" |
| `dotnet-aspnetcore-specialist` | Middleware, DI, request pipeline | "Is my middleware order correct?" |
| `dotnet-performance-specialist` | Async, profiling, benchmarks | "Why is it slow?", "Design a benchmark" |
| `dotnet-ui-specialist` | Blazor, MAUI, Uno Platform | "Build a Blazor/MAUI/Uno app" |
| `dotnet-code-lifecycle-agent` | Build errors + cleanup pipeline | "Build fails", "Clean this up" |
| `dotnet-cloud-specialist` | Aspire, AKS, cloud deployment | "Deploy to Azure?" |
| `dotnet-code-review-agent` | Correctness, perf, security review | "Review this PR" |
| `dotnet-csharp-concurrency-specialist` | Race conditions, deadlocks, locks | "This crashes under load" |
| `dotnet-docs-generator` | DocFX, Mermaid, XML docs | "Generate documentation" |
| `dotnet-security-reviewer` | OWASP, secrets, crypto | "Is this secure?" |
| `dotnet-testing-specialist` | Test architecture, test data | "How should I test this?" |
| `dotnet-pr-workflow` | PR lifecycle, merge, release tagging | "Create PR", "merge this", "release" |

## Routing Logic

How the decision-maker chooses:

```
Your prompt
    │
    ▼
┌──────────────────┐
│ using-dotnet     │  Is this .NET? No → stop. Yes → continue.
└──────┬───────────┘
       ▼
┌──────────────────┐
│ dotnet-advisor   │  THE DECISION-MAKER
│                  │
│ 1. Detect .NET   │  Reads .csproj / global.json
│    version       │
│ 2. Load baseline │  Always loads dotnet-csharp
│ 3. Analyze intent│  Matches keywords to behaviors
│ 4. Route         │  Invokes right skills in right order
│ 5. Ask if unsure │  "Did you mean X or Y?"
└──────────────────┘
       │
       ▼
  Domain skills + specialist agents (if needed)
```

**Example routing decisions:**

| You say | Decision-maker thinks | Routes to |
|---------|----------------------|-----------|
| "Create a todo API" | "New project, API, EF Core → dotnet-api + dotnet-tooling" | api + tooling + csharp |
| "My app crashes" | "Debugging needed. Has .dmp? No → ask for dump. Yes → !analyze" | debugging |
| "Review my code" | "Code review request. C# files found → dotnet-code-review-agent" | code-review-agent |
| "Upgrade to .NET 10" | "Migration. Current: net8.0 → upgrade path: 8→9→10" | devops + tooling |
| "Make this faster" | "Performance. Has benchmarks? No → suggest writing. Yes → analyze" | performance-specialist |
| "Deploy this" | "DevOps. Has Dockerfile? No → suggest creating. Yes → CI/CD setup" | devops + cloud-specialist |
