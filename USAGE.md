# How to Use dotnet-artisan

This guide teaches AI coding agents how to use these skills. Rule zero: **understand before you build**. If you don't understand the domain, every line of code you write is a guess.

## The Hardest Rule in This Repo

**Before you write a single line of code, you MUST be able to answer every item on this checklist with confidence. If any answer is "I don't know" or "I'm guessing" — STOP. Ask more questions. Do not pass Go.**

```
☐ I know WHAT is being built (one sentence)
☐ I know WHO will use it (users, roles, permissions)
☐ I know the DOMAIN terms and their meanings (domain glossary exists)
☐ I know the TECHNICAL constraints (.NET version, database, deployment)
☐ I know the ARCHITECTURE that fits (single project? VSA? DDD?)
☐ I know the QUALITY bar (tests? CI/CD? prototype or production?)
☐ I have NO unanswered questions that would change my approach
```

**The loop**: After every user answer, mentally re-check the checklist. Found a gap? Ask. Got an answer? Re-check. Still gaps? Ask again. Only when every box has a confident answer do you proceed.

**This is NOT annoying the user. This IS the work.** A 30-minute conversation that prevents 2 weeks of rework is a bargain.

## The Questioning Framework

Ask questions in layers. Each answer reveals what you don't know yet. Loop until the checklist is complete.

### Round 1: Goal & Scope

First message. Clarify WHAT is being built.

```
What are you building?
- Web API / Desktop / Mobile / CLI / Library?
- New project or modifying existing code?
- Production system, prototype, or learning exercise?

Example answer: "A Web API for managing customer orders. New project, production."
```

### Round 2: Domain Discovery

Second message. This is the most important round. Before naming anything, build a shared vocabulary.

```
Let me understand the domain:

Who are the users?
- External customers? Internal staff? Both? Admins?

Walk me through one core flow:
- "A customer places an order" — what happens step by step?

What things exist in this world? (entities/concepts)
- Order? Product? Customer? Payment? Shipment? Invoice? Inventory?

How do they relate?
- One customer → many orders? One order → many products?
- Does an Order contain Payment, or is Payment separate?

What do these words mean to YOU specifically?
- "Order" — purchase order? work order? service request?
- "Status" — what are the valid statuses and transitions?
```

Why this round matters: Two people use "User" to mean completely different things. Marketing means "email subscriber." Billing means "account with payment method." Legal means "GDPR data subject." If you build one `User` class for all three, you've already failed.

Capture this as a **domain glossary** before writing any code:

```markdown
## Domain Glossary (captured from conversation)
- Customer: person who places orders on the storefront (not B2B, not internal)
- Order: a confirmed purchase by a Customer, containing 1+ line items
- Order Status: Pending → Confirmed → Shipped → Delivered (one-way, no rollback)
- Product: a physical item in catalog with SKU, price, and inventory count
- Payment: authorized charge for an Order (always 1:1 with Order)
```

### Round 3: Technical Constraints

Third message. Pin down the technology.

```
Technical constraints:
- .NET version? (net10.0 LTS preferred, net8.0 if legacy, net11.0 if bleeding edge)
- Database? (PostgreSQL default, SQL Server if org requires it, CosmosDB if NoSQL)
- How will this be deployed? (Docker? Azure? On-premise Windows Server?)
- Existing codebase to integrate with? (auth system? logging? monitoring?)
- Any org-mandated patterns? (some teams require MediatR, some ban it)
```

### Round 4: Quality & Process

Fourth message. How do we know we're done?

```
Quality expectations:
- Tests: unit only? integration with real DB? E2E with browser?
- CI/CD: GitHub Actions pipeline needed? Just a Dockerfile?
- Timeline: ship in 2 days or 2 months? This changes architecture choices.
- Team: solo dev or 10-person team? Solo = simpler. Team = more structure.
```

### When to STOP asking

Re-check the 7-item checklist after every user answer:

```
☐ WHAT: I can describe it in one sentence
☐ WHO: I know the users and their roles
☐ DOMAIN: I have a glossary of terms with agreed meanings
☐ TECH: I know .NET version, database, deployment target
☐ ARCH: I know the right architecture for this complexity
☐ QUALITY: I know the test/CI/CD bar and timeline
☐ GAPS: I have zero unanswered questions that could change my approach
```

**The self-check**: Before every code-generating action, ask yourself: "Do I still have questions I haven't asked?" If the answer is yes, ask them first. If you realize mid-implementation that you're guessing about something — stop, go back, ask. Code written on a wrong assumption costs 10x more to fix than a question asked early.

## Domain-Driven Analysis

After questioning, analyze before coding. Four steps:

### Step 1: Identify Core vs Supporting vs Generic

| Layer | What | Example | Investment |
|-------|------|---------|------------|
| **Core Domain** | The business differentiator | Real-time fraud detection engine | Highest effort, best design |
| **Supporting** | Needed but not unique | Order fulfillment workflow | Moderate effort |
| **Generic** | Everyone needs it | Auth, logging, file storage | Use off-the-shelf |

### Step 2: Map Bounded Contexts

A "bounded context" is where a word has ONE consistent meaning. When the meaning changes, you've crossed into a new context.

```
[Sales Context]              [Shipping Context]           [Billing Context]
  Order = purchase contract    Order = package to ship      Order = amount to charge
  Customer = buyer             Customer = recipient          Customer = payer
  Product = what's sold        Product = physical item       Product = chargeable line
```

Key rule: same word, different contexts = different classes. Don't merge them. Don't share tables between contexts. This is the #1 cause of unmaintainable monoliths.

### Step 3: Define Aggregates

An aggregate is a consistency boundary. One root entity controls access to everything inside.

```
Order (aggregate root, ID: OrderId)
  ├── OrderLine (value inside Order — no independent existence)
  ├── ShippingAddress (value object — immutable)
  └── OrderNote (entity inside Order — has its own ID but dies with Order)

Product (separate aggregate root, ID: ProductId)
  └── Order references Product by ProductId ONLY — NO navigation property
```

**Hard rule**: Aggregates reference other aggregates by ID, never by EF Core navigation property. `Order.Product` is forbidden. `Order.ProductId` is correct.

### Step 4: Choose Architecture

| Scenario | Pattern | Project Structure |
|----------|--------|-------------------|
| < 20 endpoints, logic is CRUD | Single project, controllers | `Api/` with Controllers + Services |
| 20-80 endpoints, distinct features | Vertical Slice Architecture | `Features/Orders/`, `Features/Products/` |
| Complex domain rules (finance, legal, medical) | Domain-Driven Design | `Domain/`, `Application/`, `Infrastructure/`, `Api/` |
| Multiple databases or external systems | Clean Architecture | Same as DDD but with UseCase layer |
| Microservices | VSA inside each service | Each service is small enough that VSA alone suffices |

## Full Example: From Vague to Clear

**User**: "我需要一个订餐系统"

**Round 1 — Scope**:
> 是什么类型的订餐？员工内部订餐？对外卖平台？食堂预订？

User: "公司内部，员工提前订第二天的午餐"

**Round 2 — Domain**:
> 明白了。继续了解：
> - 谁可以订？所有员工还是特定部门？
> - 菜单谁发布？每天有固定供应商还是多个选择？
> - 订完能改吗？截止时间是什么？
> - "订单"的生命周期：选餐 → 提交 → 厨房确认 → 制作 → 送达？
> - 需要统计什么？（谁订了、花了多少钱、哪个菜最受欢迎？）

User: "所有员工可以订。行政每天上午发布当天的菜单（只有一个供应商），员工在下午3点前订第二天的。3点后锁定不可改。"

**Round 3 — Technical**:
> - .NET 版本？（推荐 net10.0）
> - 数据库？（PostgreSQL 是我们的默认选择）
> - 部署方式？（Docker？内部服务器？）
> - 需要微信/企业微信通知吗？

User: "net10.0，PostgreSQL，Docker 部署，需要企业微信通知订餐成功"

**Domain Glossary (captured)**:
```
Menu: published daily by Admin, contains 1+ MenuItems
MenuItem: a dish option (name, price, image, category)
Order: an employee's selection for tomorrow's lunch (1 Order per person per day)
OrderItem: one selected dish in an Order
OrderStatus: Draft → Submitted → Locked (at 3pm cutoff)
Cutoff: 3:00 PM — after this, Orders are locked and sent to vendor
Employee: internal staff member (from existing AD/Azure AD, not a new user system)
```

**Now we can build.** Before questioning: zero clarity, high risk. After 3 rounds: shared vocabulary, clear boundaries, ready to code.

## Skill Routing Decision Tree

```
.NET request detected (using-dotnet auto-loads)
  │
  └─ dotnet-advisor routes:
      ├─ Always loaded: dotnet-csharp (C# patterns, async, DI, LINQ)
      ├─ Backend/API/database   → dotnet-api (32 refs)
      ├─ UI/Blazor/MAUI/WPF     → dotnet-ui (20 refs)
      ├─ Testing/xUnit/Playwright → dotnet-testing (13 refs)
      ├─ CI/CD/Docker/NuGet     → dotnet-devops (18 refs)
      ├─ Project setup/MSBuild  → dotnet-tooling (34 refs)
      ├─ Crash/deadlock/memory  → dotnet-debugging (17 refs)
      ├─ MCP/Semantic Kernel    → dotnet-ai
      ├─ Framework migration    → dotnet-devops
      ├─ Code quality cleanup   → dotnet-tooling
      ├─ Workflow optimization  → dotnet-workflow
      ├─ Workflow + learning    → dotnet-workflow
```

## Context Persistence

Any AI reconnecting in a fresh session recovers full context in ~10 minutes:

| Step | File | Time |
|------|------|------|
| 1 | `CLAUDE.md` | 2 min — repo overview, rules, conventions |
| 2 | `AGENTS.md` | 1 min — iron rules, anti-patterns, key files |
| 3 | `USAGE.md` (this file) | 3 min — questioning framework, domain analysis |
| 4 | `SELF_DOCUMENTING.md` | 2 min — how to write code that survives sessions |
| 5 | `BEHAVIORS.md` | 2 min — 30+ behavior catalog + decision-maker routing |
| 6 | `skills/CHEATSHEET.md` | 2 min — all rules in one page |

All generated code must follow SELF_DOCUMENTING.md so a fresh AI can understand the project in 30 seconds: solution file → Program.cs → any .cs file → config.
