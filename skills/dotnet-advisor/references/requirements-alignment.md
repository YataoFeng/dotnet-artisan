# Requirements Alignment

Multi-round dialogue framework for clarifying ambiguous requests. Load this when the user's request is incomplete, vague, or spans multiple domains.

> Skip if the request is a full, unambiguous spec (e.g., "Add a GET /products endpoint").

## Principles

1. **Ask one round at a time** — Don't dump all questions at once. Start with the highest-uncertainty item.
2. **Confirm understanding** — After each answer, restate to verify. "So customer orders with status: pending → confirmed → shipped. Correct?"
3. **Push back when needed** — If the user's request contradicts best practices, explain why before building.
4. **Capture domain vocabulary** — Every term the user uses is important. Record definitions.

## Round 1: Goal & Domain

What exactly needs to be built? What business domain does it serve? Who uses it?

**Key questions:**
- What problem are we solving?
- Who are the users? What are their roles?
- What is the core business domain?
- Is this new development or extending existing?

**Example:**
```
User: "I need an order management system."
AI: "What kind of orders? Purchase orders, work orders, or customer orders? Who will use this?"
User: "Customer orders. Our sales team will process them."
```

## Round 2: Architecture & Decomposition

Load `references/architecture-discovery.md` for detailed guidance.

**Key questions:**
- Is this a monolith, modular monolith, or microservices?
- Are we using DDD? (Only if the domain has real complexity)
- What are the bounded contexts / service boundaries?
- What communication patterns between services? (HTTP/gRPC/messaging)
- What data strategy? (database per service vs shared)
- What UI platforms? (Web, desktop, mobile, all)

**Example:**
```
AI: "We might want to split order and payment later. I recommend a modular
     monolith to start — separate projects per domain, single deployment.
     DDD fits here: Order, Payment, and Inventory as bounded contexts."
```

## Round 3: Technical Constraints

- .NET version? (net8.0, net9.0, net10.0, net11.0)
- Database? (PostgreSQL, SQL Server, Cosmos DB, SQLite)
- Hosting? (cloud, on-prem, hybrid)
- Authentication? (Identity, OAuth, JWT, Windows Auth)
- CI/CD requirements? (GitHub Actions, Azure DevOps)
- Production or prototype? Timeline?

**Example:**
```
AI: ".NET 10 + PostgreSQL. Need CI/CD and tests?"
User: "Yes."
```

## Round 4: Quality & Process

- Testing expectations? (unit, integration, E2E, benchmark)
- Performance targets? (latency, throughput, concurrent users)
- Security requirements? (OWASP, compliance, audit)
- Observability? (logging, metrics, tracing)

## Output

After all rounds, produce:
1. **Domain vocabulary** — Key terms and their definitions
2. **Architecture sketch** — Service boundaries, communication patterns, data strategy
3. **Technical stack** — .NET version, database, hosting, auth
4. **Quality criteria** — Testing, performance, security expectations

Feed these to all domain skills invoked in Step 4.
