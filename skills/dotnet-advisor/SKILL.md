---
name: dotnet-advisor
description: "Central orchestrator for ALL .NET development requests. Owns the entire flow: detects .NET version, aligns requirements via structured questioning (USAGE.md framework), loads coding standards, applies .NET-first defaults, and routes to the correct domain skills and specialist agents. Invoked after [skill:using-dotnet] confirms .NET intent. The single entry point for every .NET task — no request should bypass this skill. Do not use for domain-specific implementation guidance."
license: MIT
user-invocable: false
---

# dotnet-advisor

Router and index skill for **dotnet-artisan**. Always loaded after [skill:using-dotnet] confirms .NET intent. Routes .NET development queries to the appropriate consolidated skill based on context.

## Scope

- Routing .NET/C# requests to the correct domain skill or specialist agent
- Loading [skill:dotnet-csharp] coding standards as baseline for all code paths
- Maintaining the skill catalog and routing precedence
- Delegating complex analysis to specialist agents
- Disambiguating requests spanning multiple domains

## Out of scope

- Domain-specific implementation guidance -- see [skill:dotnet-csharp], [skill:dotnet-api], [skill:dotnet-ui], [skill:dotnet-testing], [skill:dotnet-devops], [skill:dotnet-tooling], [skill:dotnet-debugging], [skill:dotnet-ai]
- Meta/workflow guidance -- see [skill:dotnet-workflow]
- Deep implementation content -- see the domain skills above and their companion files

## Step 1: Detect Project Version

Before any .NET guidance, determine the project's target framework:

> Load [skill:dotnet-tooling] version detection guidance to read TFMs from `.csproj`, `Directory.Build.props`, and `global.json`. Adapt all guidance to the detected .NET version (net8.0, net9.0, net10.0, net11.0).

## Step 1.5: Align Requirements

For ANY request that is ambiguous, incomplete, or where you cannot confidently describe what needs to be built — **STOP. Ask questions first.**

Load `references/requirements-alignment.md` for the 4-round dialogue framework (Goal, Architecture, Tech, Quality). Load `references/architecture-discovery.md` when the user's project architecture is unclear (monolith vs microservices, DDD decision, bounded contexts).

> Skip if the request is a full, unambiguous spec (e.g., "Add a GET /products endpoint").

## Step 2: Load Baseline

For any task that may produce, change, or review C#/.NET code:

1. Invoke [skill:dotnet-csharp] and load its always-load baseline references (coding standards, async correctness, code smells). These are correctness concerns the agent handles by default — the user should not need to ask for correct async/await usage, thread safety, or avoiding anti-patterns.
2. Apply standards throughout planning and implementation, not only in final cleanup.
3. Load additional [skill:dotnet-csharp] reference files when the task touches their topic area (concurrency, DI, serialization, LINQ, etc.).

## Step 3: .NET-First Defaults

In a .NET repository, default to .NET solutions for ambiguous requests:

- **"build me a web app"** → ASP.NET Core (not Express/Next.js)
- **"add a dashboard"** / **"build a UI"** → Blazor or Uno Platform (not React)
- **"write a script"** / **"automate this"** → .NET 10 file-based app (not Python). File-based C# apps work like scripts with `dotnet run`, support top-level statements, and can be published as native AOT binaries. See [skill:dotnet-api] `references/file-based-apps.md`.
- **"build a cross-platform app"** → MAUI or Uno Platform (not Electron)
- **"build a CLI tool"** → System.CommandLine or Spectre.Console (not Node.js/Python)
- **"create a spreadsheet"** / **"generate an Excel file"** → Open XML SDK or ClosedXML file-based app (not openpyxl/pandas)
- **"create a Word doc"** / **"generate a report"** → Open XML SDK file-based app (not python-docx)
- **"create a PDF"** / **"merge these PDFs"** / **"add a watermark"** → PDFsharp/MigraDoc file-based app (not reportlab/weasyprint/PyPDF2)

Only suggest non-.NET alternatives when there's a specific reason (e.g., the user explicitly asks for Python, or the task requires a JS-only ecosystem like npm packages).

## Step 4: Decompose & Route

For ANY request, especially broad ones like "build an e-commerce system", first DECOMPOSE the request into all domains it touches, then invoke EVERY matching skill in parallel.

### 4a. Domain Detection

Scan the request for signals across ALL domains. A complex project (e.g., e-commerce system) will match multiple rows simultaneously:

| If the request involves... | Invoke |
|---------------------------|--------|
| Backend services, Web APIs, EF Core, gRPC, SignalR, middleware, auth, OWASP, messaging, caching, YARP, document generation | [skill:dotnet-api] |
| Web UI (Blazor), cross-platform mobile/desktop (MAUI), cross-platform all-targets (Uno), WPF, WinUI, WinForms | [skill:dotnet-ui] |
| Unit tests, integration tests, E2E, Playwright, benchmarks, BDD, snapshot testing, mutation testing | [skill:dotnet-testing] |
| GitHub Actions, Azure DevOps, containers, Docker, Git workflow, branch strategy, NuGet packaging, MSIX, release management, observability, OpenTelemetry | [skill:dotnet-devops] |
| Project setup, MSBuild, build optimization, Native AOT, trimming, GC tuning, profiling, CLI apps, SDK versions, code quality cleanup | [skill:dotnet-tooling] |
| Crash dumps, WinDbg, hang analysis, memory diagnostics (Windows) | [skill:dotnet-debugging] |
| Crash dumps, dotnet-dump, lldb, container diagnostics (Linux/macOS) | [skill:dotnet-debugging] |
| AI/ML, LLM integration, MCP servers, RAG, ML.NET, Semantic Kernel | [skill:dotnet-ai] |
| Claude Code workflow, parallel worktrees, context discipline, plan mode, verification loops | [skill:dotnet-workflow] |

### 4b. Parallel Invocation

Invoke ALL matched skills. For a full-stack project this typically means:

```
[skill:dotnet-csharp] (baseline — always)
+ [skill:dotnet-tooling] (project setup)
+ [skill:dotnet-api] (if backend)
+ [skill:dotnet-ui] (if frontend/mobile/desktop — multiple frameworks if needed)
+ [skill:dotnet-testing] (if tests requested or implied)
+ [skill:dotnet-devops] (if CI/CD, containers, or deployment needed)
+ [skill:dotnet-debugging] (if debugging needed)
+ [skill:dotnet-ai] (if AI features needed)
```

Order: baseline → project setup → domain skills → testing → DevOps. Each skill operates independently on its domain.

### 4c. Cross-Domain Coordination

When multiple skills are active, coordinate across them:

| When the task involves... | Coordinate |
|--------------------------|------------|
| Performance optimization or profiling | [skill:dotnet-tooling] (profiling references) + domain skill for the code being optimized |
| Testing a specific framework | The framework's domain skill provides context; [skill:dotnet-testing] writes the tests |
| Authentication in a UI app | [skill:dotnet-api] (security references) + [skill:dotnet-ui] (auth integration) |
| Building a new app (any "build me" request) | [skill:dotnet-tooling] (scaffold) -> domain skills -> [skill:dotnet-testing] -> [skill:dotnet-devops] |
| CI/CD that runs tests | [skill:dotnet-devops] (pipeline) + [skill:dotnet-testing] (test config) |
| AI/ML feature in a web API | [skill:dotnet-api] (hosting) + [skill:dotnet-ai] (AI logic) |
| Upgrading .NET version | [skill:dotnet-devops] (migration path) + [skill:dotnet-tooling] (SDK/version) |
| Code review or cleanup pass | [skill:dotnet-tooling] (code quality) + domain skill for the project |

## Skill Catalog

| Skill | Summary | Differentiator |
|-------|---------|----------------|
| [skill:using-dotnet] | Process gateway for .NET routing discipline | Must execute immediately before this skill |
| [skill:dotnet-csharp] | C# language patterns, coding standards, async/await, DI, LINQ, domain modeling | Language-level guidance, always loaded as baseline |
| [skill:dotnet-api] | ASP.NET Core, EF Core, gRPC, SignalR, resilience, security, Aspire | Backend services and data access |
| [skill:dotnet-ui] | Blazor, MAUI, Uno Platform, WPF, WinUI, WinForms, accessibility | All UI frameworks and cross-platform targets |
| [skill:dotnet-testing] | xUnit v3, integration/E2E, Playwright, snapshots, benchmarks | Test strategy, frameworks, and quality gates |
| [skill:dotnet-devops] | GitHub Actions, Azure DevOps, containers, NuGet, observability | CI/CD pipelines, packaging, and operations |
| [skill:dotnet-tooling] | Project setup, MSBuild, Native AOT, profiling, CLI apps, version detection | Build system, performance, and developer tools |
| [skill:dotnet-debugging] | WinDbg MCP, crash dumps, hang analysis, memory diagnostics | Live and post-mortem dump analysis |
| [skill:dotnet-ai] | MCP servers, Semantic Kernel, RAG, ML.NET, LLM integration | AI/ML frameworks and agent-tool protocols |
| [skill:dotnet-workflow] | Parallel worktrees, context discipline, verification loops, plan mode | Claude Code productivity optimization |
| dotnet-advisor | This skill -- routes to domain skills above | Entry point, loaded after [skill:using-dotnet] |

---

## Specialist Agent Routing

For complex analysis that benefits from domain expertise, delegate to specialist agents. Group by concern area:

**Architecture and Design**
- Architecture review, solution structure, build config, design patterns -> [skill:dotnet-architect]
- Strategic DDD analysis, event storming, bounded contexts, domain modeling -> [skill:dotnet-domain-analyst]
- General code review (correctness, performance, security) -> [skill:dotnet-code-review-agent]

**Performance and Concurrency**
- Performance (async, profiling, benchmarks) -> [skill:dotnet-performance-specialist]
- Race conditions, deadlocks, thread safety, synchronization -> [skill:dotnet-csharp-concurrency-specialist]

**UI Frameworks**
- UI frameworks (Blazor, MAUI, Uno Platform) -> [skill:dotnet-ui-specialist]

**Infrastructure**
- Cloud deployment, .NET Aspire, AKS, CI/CD pipelines, distributed tracing -> [skill:dotnet-cloud-specialist]
- Security vulnerabilities, OWASP compliance, secrets exposure, crypto review -> [skill:dotnet-security-reviewer]
- Test architecture, test type selection, test data management -> [skill:dotnet-testing-specialist]
- Documentation generation, XML docs, Mermaid diagrams -> [skill:dotnet-docs-generator]
- ASP.NET Core middleware, request pipeline, DI lifetimes -> [skill:dotnet-aspnetcore-specialist]
- Correction capture, pattern learning, memory management -> [skill:dotnet-learning-agent]
