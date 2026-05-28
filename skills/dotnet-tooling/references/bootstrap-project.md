# Bootstrap Project

> **Quick Ref**: Question before scaffolding | Architecture scales with complexity: simple CRUD = single project, 20+ endpoints = VSA, complex domain = DDD, multi-persistence = Clean Architecture | Start with .slnx + CPM + Directory.Build.props | One decision wrong at bootstrap = months of rework | Solo dev ≠ enterprise — don't over-architect |

New project bootstrapper. OWNs the complete flow from "I need a project" to `dotnet build` succeeding. Load this FIRST — before `scaffold-project.md` or `project-structure.md`.

**Prerequisites:** Run `references/version-detection.md` to determine available SDK version. Read `USAGE.md` for the questioning framework.

## Step 0: Question Before You Scaffold

Never create a solution until you know the answers:

```
1. What does this project DO? (one sentence)
2. How complex is the domain? (CRUD? workflow? finance/legal/medical?)
3. How many distinct features? (< 10? 10-50? 50+?)
4. Will you swap databases later? (PostgreSQL today, SQL Server tomorrow?)
5. Team size? (solo? 2-5? 5+?)
6. Production or prototype?
```

## Step 1: Choose Architecture

| Your Answers | Architecture | Why |
|-------------|-------------|-----|
| "CRUD, < 20 endpoints, solo, PostgreSQL, prototype" | **Single project** | KISS. One project, Controllers or Minimal API. No layers needed. |
| "CRUD, 20-80 endpoints, 3 devs, PostgreSQL" | **Vertical Slice Architecture** | Feature isolation. Each feature is self-contained. Scales with team. |
| "Complex domain rules, finance, 5 devs, PostgreSQL + Redis" | **Domain-Driven Design** | Business logic first. Aggregates, value objects, domain events. |
| "Need to swap PostgreSQL → SQL Server, 3 devs" | **Clean Architecture** | Infrastructure is swappable. Domain has zero external dependencies. |
| "5+ microservices, 10 devs" | **VSA inside each service** | Each service is small enough for VSA. Don't over-engineer inside a microservice. |

## Step 2: Map Architecture to Project Structure

### Single Project (simplest)

```
MyApp/
├── MyApp.slnx
├── Directory.Build.props
├── Directory.Packages.props
├── global.json
├── .editorconfig
├── .gitignore
└── src/
    └── MyApp.Api/
        ├── MyApp.Api.csproj
        ├── Program.cs
        ├── appsettings.json
        ├── Endpoints/           # One file per endpoint group
        │   ├── Orders.cs
        │   └── Products.cs
        ├── Data/
        │   ├── AppDbContext.cs
        │   └── Migrations/
        └── Models/              # DTOs, request/response types
            ├── OrderDto.cs
            └── ProductDto.cs
```

**When**: < 20 endpoints, logic is CRUD, team ≤ 2.

### Vertical Slice Architecture (medium)

```
MyApp/
├── MyApp.slnx
├── Directory.Build.props
├── Directory.Packages.props
├── global.json
├── .editorconfig
├── .gitignore
├── src/
│   └── MyApp.Api/
│       ├── MyApp.Api.csproj
│       ├── Program.cs
│       ├── appsettings.json
│       ├── Extensions/                 # DI registration per feature
│       │   ├── OrderExtensions.cs
│       │   └── ProductExtensions.cs
│       └── Features/
│           ├── Orders/
│           │   ├── CreateOrder.cs       # Endpoint + Handler + Request + Response
│           │   ├── GetOrder.cs
│           │   ├── ListOrders.cs
│           │   └── OrderMapper.cs
│           └── Products/
│               ├── CreateProduct.cs
│               ├── GetProduct.cs
│               └── SearchProducts.cs
└── tests/
    └── MyApp.Tests/
        ├── MyApp.Tests.csproj
        └── Features/
            ├── Orders/
            │   ├── CreateOrderTests.cs
            │   └── GetOrderTests.cs
            └── Products/
                └── SearchProductsTests.cs
```

**When**: 20-80 endpoints, distinct features, team ≥ 3. One file per feature = no merge conflicts.

### Domain-Driven Design (complex)

```
MyApp/
├── MyApp.slnx
├── Directory.Build.props
├── Directory.Packages.props
├── global.json
├── src/
│   ├── MyApp.Domain/                  # ZERO external dependencies
│   │   ├── MyApp.Domain.csproj
│   │   ├── Orders/
│   │   │   ├── Order.cs               # Aggregate root
│   │   │   ├── OrderLine.cs           # Entity inside aggregate
│   │   │   ├── OrderId.cs             # Strongly-typed ID
│   │   │   ├── OrderStatus.cs         # Enumeration class (not enum)
│   │   │   ├── OrderCreatedEvent.cs   # Domain event
│   │   │   └── IOrderRepository.cs    # Interface (Domain owns it)
│   │   └── Products/
│   │       ├── Product.cs
│   │       └── ProductId.cs
│   ├── MyApp.Application/             # Use cases, NO EF Core references
│   │   ├── MyApp.Application.csproj  # References Domain only
│   │   └── Orders/
│   │       ├── CreateOrderHandler.cs
│   │       ├── GetOrderHandler.cs
│   │       └── OrderDto.cs
│   ├── MyApp.Infrastructure/          # EF Core, external APIs
│   │   ├── MyApp.Infrastructure.csproj # References Domain + Application
│   │   ├── AppDbContext.cs
│   │   ├── Migrations/
│   │   └── Orders/
│   │       └── OrderRepository.cs     # Implements IOrderRepository
│   └── MyApp.Api/                     # Minimal API endpoints
│       ├── MyApp.Api.csproj
│       ├── Program.cs
│       └── Endpoints/
│           └── Orders.cs
└── tests/
    ├── MyApp.Domain.Tests/
    ├── MyApp.Application.Tests/
    └── MyApp.Api.Tests/
```

**When**: complex domain rules (finance, legal, medical), team ≥ 5, domain logic is the differentiator.

### Clean Architecture (swappable infrastructure)

Same structure as DDD, but with one more layer:

```
src/
├── MyApp.Domain/          # Entities, value objects, domain events (no deps)
├── MyApp.UseCases/        # Application use cases (depends on Domain only)
├── MyApp.Infrastructure/  # EF Core, external services (depends on UseCases)
└── MyApp.Api/             # Minimal API (depends on Infrastructure)
```

**Key difference from DDD**: UseCases layer is explicit. DDD puts handlers in Application. Clean Architecture separates orchestration (UseCases) from implementation (Infrastructure) more strictly.

**When**: you KNOW you'll swap infrastructure (database, message bus, payment provider) within the project's lifetime.

## Step 3: Scaffold

After choosing the architecture, run `references/scaffold-project.md` for the actual scaffolding commands. Then load architecture-specific reference files:

| Architecture | Next File |
|-------------|-----------|
| Single project | `references/minimal-apis.md` (in dotnet-api) |
| Vertical Slice | `references/architecture-patterns-vsa.md` (in dotnet-api) |
| DDD | `references/domain-analysis.md` FIRST, then `references/domain-modeling.md` (in dotnet-csharp) + `references/architecture-patterns.md` (in dotnet-api) |
| Clean Architecture | `references/architecture-patterns.md` (in dotnet-api) |

## Step 4: Apply Conventions (always)

Regardless of architecture, every new project gets:

```bash
# Central Package Management
# Directory.Packages.props with <ManagePackageVersionsCentrally>true</ManagePackageVersionsCentrally>

# .editorconfig — baseline .NET defaults
root = true
[*.cs]
dotnet_diagnostic.CA2007.severity = warning  # ConfigureAwait
dotnet_diagnostic.CS4014.severity = error    # async without await

# global.json — pin SDK version
{ "sdk": { "version": "10.0.100", "rollForward": "latestFeature" } }

# .gitignore — dotnet new gitignore template
```

## Anti-patterns (BAD vs GOOD)

### 1. Over-architecting a simple CRUD app

```csharp
// BAD: Todo app with DDD layers. 7 projects for 3 endpoints.
// Domain/Application/Infrastructure/Api + abstractions + contracts.
// 40 files before the first working endpoint.

// GOOD: Single project. 3 files = working app.
// Program.cs + AppDbContext.cs + Todos.cs (endpoints)
var app = WebApplication.CreateBuilder(args).Build();
app.MapGroup("/todos").MapTodos();
app.Run();
```

### 2. Under-architecting a complex domain

```csharp
// BAD: Insurance claim processing in a single project.
// 2000-line Program.cs. Business rules scattered across controllers.
// Changing a claim rule could break anything.

// GOOD: DDD. Claim is an aggregate root with enforced invariants.
// Claim.Submit() validates all rules internally.
// Changing a business rule = changing one method in Domain.
public sealed class Claim
{
    public Result Submit()
    {
        if (Amount <= 0) return Result.Fail("Amount must be positive");
        if (Policy is null) return Result.Fail("Policy required");
        if (SubmittedAt < IncidentDate) return Result.Fail("Cannot submit before incident");
        Status = ClaimStatus.Submitted;
        RaiseEvent(new ClaimSubmittedEvent(Id));
        return Result.Ok();
    }
}
```

### 3. "We'll refactor later" layered architecture

```csharp
// BAD: Start with Clean Architecture "just in case we need it later."
// Every feature requires touching 4 projects. 4x the ceremony.
// You never do need it. But you're stuck with it.

// GOOD: Start with single project or VSA.
// If complexity grows, EXTRACT. Moving from VSA to DDD is a refactor
// of moving files into new projects — not a rewrite.
// The 80% case: you never need to.
```

### 4. Wrong architecture for team size

```
BAD: Solo dev using Clean Architecture.
     Every change = 4 projects. Every PR = 4x review surface.
     You're the only reviewer. This is ceremony, not safety.

GOOD: Solo dev = single project or VSA.
      Architecture complexity should match TEAM size, not ego.
```

### 5. Project naming that reveals nothing

```csharp
// BAD: Generic project names. What's in "Core"? Everything.
MyApp.Core/
MyApp.Services/
MyApp.Common/
MyApp.Shared/

// GOOD: Names reveal the architecture.
// Single project: MyApp.Api/
// VSA: MyApp.Api/ (features in subdirectories)
// DDD: MyApp.Domain/  MyApp.Application/  MyApp.Infrastructure/  MyApp.Api/
```

## Decision Guide

| Situation | Architecture | Projects | Example |
|-----------|-------------|----------|---------|
| CRUD, solo, prototype | Single project | 1 | Todo app, blog, internal tool |
| CRUD, 2-3 devs, 20-80 endpoints | VSA | 1 (+ test project) | E-commerce API, SaaS backend |
| Complex domain, team, production | DDD | 4 (Domain/App/Infra/Api) | Insurance, banking, healthcare |
| Known infrastructure swap coming | Clean Architecture | 5 (+ UseCases) | Multi-tenant SaaS switching DBs |
| Microservices | VSA per service | 1 per service | Large distributed system |

## Cross-References

- `references/scaffold-project.md` — Actual scaffolding commands (run AFTER this file)
- `references/project-structure.md` — Detailed Directory.Build.props, CPM, Analyzer setup
- `references/version-detection.md` — Determine SDK version before scaffolding
- `../dotnet-api/references/architecture-patterns.md` — Clean Architecture and DDD patterns
- `../dotnet-api/references/architecture-patterns-vsa.md` — Vertical Slice Architecture patterns
- `../dotnet-csharp/references/domain-modeling.md` — Aggregates, value objects, domain events
- `../USAGE.md` — Questioning framework (Step 0)
