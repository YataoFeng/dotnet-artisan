# How to Use dotnet-artisan

This guide teaches AI coding agents (and humans) how to use these skills effectively. The core principle: **understand before you build**.

## Quick Start

When a user asks for .NET help, the `using-dotnet` skill auto-detects the intent and routes to the right domain skills. But before writing code, the AI must bridge the gap between the user's words and what they actually need.

## The Questioning Framework

Never jump straight to code. Ask clarifying questions in this order:

### 1. Goal & Scope (always first)

```
What are you building?
- Web API / Desktop app / Mobile app / CLI tool / Library / Script?
- New project or modifying existing?
- Production, prototype, or learning exercise?
```

### 2. Domain Context (the most important step)

This is where most misunderstandings happen. Before naming a single class, understand the domain:

```
Let me understand the domain:

- Who are the users? (internal team, public customers, admins?)
- What's the core business process? (walk me through one flow)
- What entities/concepts exist? (Order? Customer? Sensor? Document?)
- How do they relate? (one-to-many? many-to-many? aggregate root?)
- What are the key terms? (does "Order" mean purchase order or work order?)
```

**Why this matters**: Two teams can use the same word to mean completely different things. "User" might mean "customer" to marketing but "account holder" to billing. Establishing a **ubiquitous language** (shared vocabulary) prevents months of rework.

### 3. Technical Constraints

```
What are the constraints?
- .NET version? (net8.0 LTS / net10.0 LTS / net11.0 preview?)
- Database? (PostgreSQL / SQL Server / CosmosDB / None?)
- Deployment? (Docker / Azure / AWS / On-premise?)
- Existing patterns to follow? (CQRS? Vertical slices? Clean architecture?)
```

### 4. Quality & Process

```
How should we work?
- Tests required? (unit / integration / E2E?)
- CI/CD needed?
- Code style preferences?
- Timeline pressure? (quick prototype vs. production system)
```

## Domain-Driven Analysis

After gathering context, analyze the domain before writing code:

### Step 1: Identify the Core Domain

| Question | Example |
|----------|---------|
| What's the business differentiator? | Not "authentication" (everyone has it) — it's "real-time inventory matching" |
| What's supporting? | Shipping notifications, billing |
| What's generic? | Logging, email, file storage |

Focus your best design on the **core domain**. Use off-the-shelf for generic.

### Step 2: Map the Bounded Contexts

Split the domain into contexts where terms have consistent meaning:

```
[Sales Context]          [Shipping Context]
  Order = purchase         Order = package
  Customer = buyer         Customer = recipient
  Product = what's sold    Product = what's in the box
```

Same word, different meaning in different contexts. This is normal. Don't force one `Order` class to serve both.

### Step 3: Define Aggregates

An aggregate is a cluster of objects treated as a unit. Each aggregate has one **root**:

```
Order (aggregate root)
  ├── OrderLine (part of Order aggregate)
  ├── ShippingAddress (value object)
  └── PaymentInfo (value object)

Product (separate aggregate — referenced by ID only)
```

**Rule**: Aggregates reference other aggregates by ID, never by navigation property. EF Core navigation properties should not cross aggregate boundaries.

### Step 4: Choose the Architecture

| Scenario | Architecture | Why |
|----------|-------------|-----|
| Simple CRUD (< 20 endpoints) | Single project, Controller-based | KISS |
| Medium complexity (20-80 endpoints) | Vertical Slice Architecture | Feature isolation |
| Complex domain logic | Domain-Driven Design | Business rules first |
| Multiple persistence needs | Clean Architecture | Swappable infrastructure |
| Microservice | VSA inside each service | Each service is focused |

## Skill Routing Decision Tree

After analysis, here's how skills map to needs:

```
Is this .NET?
├─ No → Not our domain
└─ Yes → using-dotnet detects it
    └─ dotnet-advisor routes:
        ├─ Writing code → dotnet-csharp (always loaded)
        ├─ Backend/API → dotnet-api
        ├─ UI/Frontend → dotnet-ui
        ├─ Writing tests → dotnet-testing
        ├─ CI/CD/Docker → dotnet-devops
        ├─ Project setup/build → dotnet-tooling
        ├─ Crash/deadlock/leak → dotnet-debugging
        ├─ AI/MCP/RAG → dotnet-ai
        ├─ Version migration → dotnet-upgrade
        ├─ Code cleanup → dotnet-quality
        ├─ Workflow efficiency → dotnet-workflow
        └─ Learning from mistakes → dotnet-learning
```

## Full Workflow Example

**User says**: "I need an order management system"

**Bad response** (jumps to code):
> "I'll create an OrderController with CRUD endpoints..."

**Good response** (clarifies first):

> Before I write any code, let me understand what you need:
>
> **Goal**: What kind of orders? Purchase orders? Work orders? Customer orders from a storefront?
>
> **Domain**:
> - Who places orders? (Customers? Internal staff? Both?)
> - What happens after an order is placed? (Payment → Fulfillment → Shipping? Or something else?)
> - What entities are involved beyond Order? (Products? Inventory? Invoices?)
> - What does "order status" mean to you? (Pending/Confirmed/Shipped/Delivered? Or different?)
>
> **Technical**:
> - .NET 10 or 8?
> - Database preference? (PostgreSQL is our default)
> - Is this a greenfield project or integrating with existing systems?
> - REST API? gRPC? Both?
>
> **Quality**:
> - Is this production or prototype?
> - Do you want tests from the start?

## Context Persistence

This repository is designed so any AI can re-establish context quickly:

### Entry Points (read these first)

| File | Read when | Contains |
|------|-----------|----------|
| `CLAUDE.md` | Every session start | Repo structure, rules, conventions |
| `AGENTS.md` | Every session start | Non-negotiable rules, anti-patterns, key files |
| `USAGE.md` | First time using skills | This file — how to approach requirements |
| `skills/CHEATSHEET.md` | Quick context refresh | One-page all-rules summary |
| `skills/DECISIONS.md` | Architecture decision needed | "When to use what" guides |
| `skills/INDEX.md` | Need a specific reference | All 80+ reference files by domain |

### Self-Documenting Code Principles

Every generated project should be understandable by a fresh AI session:

1. **Solution file at root** — `.slnx` or `.sln` shows project structure immediately
2. **Meaningful project names** — `OrderManagement.Api`, not `Project1`
3. **One sentence per file** — Each file's top explains its purpose in a short comment
4. **Domain terms in class names** — `OrderFulfillmentHandler`, not `ProcessHandler`
5. **Short WHY comments** — Only explain non-obvious decisions: `// Uses IServiceScopeFactory because BackgroundService outlives Scoped DbContext`
6. **No WHAT comments** — `// Saves the order` is noise. The code already says that.

### Project Discovery Pattern

When a fresh AI session opens a project, it should be able to understand it in 30 seconds:

```
1. Open .slnx → See all projects
2. Open Program.cs → See DI, middleware, endpoints
3. Open any .cs file → Class name + constructor parameters tell the story
4. Open appsettings.json → See configuration shape
```

If any of these fail to communicate, the project needs better naming or structure.
