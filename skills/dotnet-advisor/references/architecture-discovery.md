# Architecture Discovery

Decision guide for .NET project architecture. Load this during Step 1.5 Round 2 when the user's project is new or the architecture is unclear.

## Decision Tree

```
Is the domain simple CRUD with no complex business rules?
  → Use minimal API + simple project structure. No DDD needed.

Is the domain complex (multiple bounded contexts, evolving rules)?
  → Use DDD tactical patterns (aggregates, entities, value objects, domain events).

Will the system need to scale independently or be worked on by multiple teams?
  → Microservices or modular monolith (see below).
  → Otherwise: single deployment monolith is fine.

Does the project have a UI? Which platforms?
  → Web: Blazor (recommended for .NET shops)
  → Desktop: WPF (existing), MAUI (cross-platform), WinUI 3 (modern Windows)
  → Mobile: MAUI
  → All platforms: Uno Platform
```

## Monolith vs Modular Monolith vs Microservices

| Approach | When to Use | Key Trade-off |
|----------|------------|---------------|
| **Monolith** | Simple CRUD, small team (<5), quick prototype | Fastest to build, hardest to scale team |
| **Modular Monolith** | Complex domain, single team, may split later | Best of both worlds: domain isolation without distributed complexity |
| **Microservices** | Multiple teams, independent scaling needs, polyglot | Maximum flexibility, highest operational cost |

**Rule of thumb:** Start with modular monolith. Split to microservices only when you have evidence of a scaling or team bottleneck. Premature microservices destroy productivity.

## DDD: When and How

### Use DDD when...

- Multiple bounded contexts with distinct business rules
- Evolving domain that needs a shared language
- Business rules are complex enough that a domain expert would disagree with a CRUD implementation
- The team is willing to invest in learning DDD

### DON'T use DDD when...

- Simple CRUD with no business logic ("save this form data")
- Prototype or MVP with 3-month deadline
- Team has no DDD experience and no time to learn
- The "domain" is purely technical (e.g., a file converter)

### DDD Tactical Patterns

For teams new to DDD, start with tactical patterns only (skip strategic context mapping):

- **Aggregate** — Cluster of domain objects treated as a unit. One aggregate = one transaction boundary.
- **Entity** — Object with identity. Two entities with same ID are the same thing.
- **Value Object** — Immutable object defined by its attributes. Two VOs with same values are interchangeable.
- **Domain Event** — Something that happened that other parts of the system care about.
- **Repository** — Collection-like interface for aggregates (only use if you need domain logic; for simple CRUD, use DbContext directly per dotnet artisani rules).

### DDD Strategic Patterns (MUST)

When DDD is chosen, strategic design is REQUIRED — not optional. Tactical patterns without strategic boundaries lead to a Big Ball of Mud.

- **Bounded Context** — Explicit boundary where a domain model applies. Each context has its own ubiquitous language. MUST be identified and diagrammed.
- **Ubiquitous Language** — Shared vocabulary between developers and domain experts. MUST be documented per context.
- **Context Map** — Relationships between bounded contexts (partnership, shared kernel, anti-corruption layer, etc.). MUST be drawn.
- **Event Storming** — Workshop technique to discover domain events and bounded contexts. MUST be run before coding.

**Output:** A domain analysis MD file containing: domain glossary, context diagram (Mermaid), aggregate decision table, and event catalog. See [skill:dotnet-tooling] `references/domain-analysis.md` for the full workflow and templates.

## Communication Patterns

| Pattern | When to Use | Technology |
|---------|------------|------------|
| HTTP REST | Request-response, external APIs | ASP.NET Core Minimal APIs |
| gRPC | High-performance internal service-to-service | gRPC + protobuf |
| Message Queue | Async events, decoupling, durability | RabbitMQ, Azure Service Bus |
| SignalR | Real-time, WebSocket, server push | ASP.NET Core SignalR |
| Hybrid | Commands via HTTP, events via message queue | Both |

## Data Strategy

| Architecture | Data Strategy | Consistency |
|-------------|---------------|-------------|
| Monolith | Shared database | Strong consistency |
| Modular Monolith | Schema-per-domain, single database | Strong cross-domain via transactions |
| Microservices | Database per service | Eventual consistency via events |

## Key Anti-Patterns

- **Premature microservices** — Distributed monolith with all the complexity, none of the benefits
- **DDD for CRUD** — Over-engineering simple data entry forms
- **Shared database across services** — Creates hidden coupling
- **No anti-corruption layer** — Letting external models leak into your domain
- **God aggregate** — An aggregate that contains everything and becomes a performance bottleneck
