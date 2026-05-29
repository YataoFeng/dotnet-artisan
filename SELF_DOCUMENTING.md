# Self-Documenting Code

**Principle**: Code should be understandable by a fresh AI session in 30 seconds. No chat history needed. No tribal knowledge. The code IS the documentation.

## The 30-Second Rule

When I open a project, I must answer these within 30 seconds:

| Question | Answer found in | Time |
|----------|----------------|------|
| What does this project do? | Solution file + project names | 5s |
| How is it structured? | Solution file → project list | 5s |
| Where does the app start? | Program.cs | 5s |
| What are the key domain concepts? | Class names + namespace | 10s |
| How is it configured? | appsettings.json | 5s |

**If I cannot answer any of these questions — STOP. Ask the user for an explanation. Never guess.**

Existing code often has context I don't understand. If I can't understand a file within 30 seconds of reading:
1. Ask the user what this code does
2. Let them explain the domain
3. Then proceed with changes

**Never modify existing comments.** Any comment already in the code when you open the file — regardless of who wrote it — is part of the established codebase. Leave it alone. If a comment seems wrong or outdated, ask the user about it, don't change it yourself.

## Rules (MUST)

### 1. Solution file at repo root

```
/OrderManagement.slnx          ← Immediate: "this is a .NET solution"
/src/OrderManagement.Api/       ← "it's a Web API"
/src/OrderManagement.Domain/    ← "with domain logic separated"
/tests/OrderManagement.Tests/   ← "and tests"
```

No guessing. No `find . -name "*.csproj"`. The solution file tells the story.

### 2. Project names are domain names

| Bad | Good | Why |
|-----|------|-----|
| `Project1`, `Core`, `Services` | `OrderManagement.Api` | Says WHAT it is |
| `Data`, `Infrastructure` | `OrderManagement.Postgres` | Says WHAT technology |
| `Common`, `Shared`, `Utils` | Never create these | Dumping ground for things that should have a real home |

### 3. One sentence at the top of new files

```csharp
// Handles order fulfillment: validates payment, reserves inventory, creates shipment
public sealed class OrderFulfillmentHandler
{
```

Not:
```csharp
// Order fulfillment handler
public sealed class OrderFulfillmentHandler
{
```

The first says WHAT it does specifically (action + 3 steps). The second just restates the name.

### 4. Domain terms in class names

```csharp
// Clear intent from the name alone
OrderFulfillmentHandler      // "ah, this does fulfillment for orders"
CustomerLoyaltyCalculator    // "calculates loyalty points for a customer"
PendingOrdersQuery           // "queries orders in pending status"
```

Not:
```csharp
ProcessHandler               // processes what?
Calculator                   // calculates what?
Query                        // queries what?
```

### 5. Constructor parameters tell the dependency story

```csharp
// A new AI reads this and instantly knows: "this class uses DB, cache, and sends emails"
public sealed class OrderFulfillmentHandler(
    AppDbContext db,
    IHybridCache cache,
    IEmailSender email,
    TimeProvider clock
)
```

Every dependency is explicit. No service locator. No `IServiceProvider`. No hidden dependencies.

### 6. Short WHY comments — never WHAT

```csharp
// WHAT comment — useless noise
// Saves the order to the database
await db.Orders.AddAsync(order);

// WHY comment — explains a non-obvious decision
// IServiceScopeFactory because BackgroundService outlives Scoped DbContext
using var scope = scopeFactory.CreateScope();
var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
```

If the code clearly says WHAT it does, don't comment. Only comment WHY you chose this approach over alternatives.

### 7. One file, one purpose

```csharp
// OrderFulfillmentHandler.cs — ONLY handles fulfillment logic
// NOT: validation, NOT: notification, NOT: logging side effects
```

Each file should have a single reason to change. If a file handles "orders" generally, split it into `OrderCreation`, `OrderFulfillment`, `OrderCancellation`.

### 8. Configuration reveals architecture

```json
// appsettings.json — a new AI should understand the system from this alone
{
  "ConnectionStrings": {
    "Default": "Host=localhost;Database=ordermgmt;..."  // PostgreSQL
  },
  "Authentication": {
    "Authority": "https://auth.company.com",             // OIDC provider
    "Audience": "ordermgmt-api"
  },
  "MessageBus": {
    "ConnectionString": "amqp://localhost"               // RabbitMQ
  }
}
```

No vague keys. No `"Setting1": "value1"`. Every config key names a real system component.

## Anti-Patterns (NEVER)

### God classes

```csharp
// NEVER: 500+ lines, handles everything
public class OrderService { ... }

// ALWAYS: small, focused handlers
public sealed class CreateOrder { ... }
public sealed class FulfillOrder { ... }
public sealed class CancelOrder { ... }
```

### Service locator

```csharp
// NEVER: hidden dependencies
var db = serviceProvider.GetRequiredService<AppDbContext>();

// ALWAYS: explicit constructor injection
public sealed class CreateOrder(AppDbContext db) { ... }
```

### Generic names

```csharp
// NEVER
public class Manager { }      // Manager of what?
public class Helper { }       // What does it help with?
public class Utils { }        // Utils = "I couldn't find a good name"

// ALWAYS
public sealed class InventoryReservationManager { }
```

### Summary comments

```csharp
// NEVER: comment that just restates the method name
/// <summary>
/// Creates an order.
/// </summary>
public async Task CreateOrder(Order order)

// ALWAYS: either no summary (name is clear) or a specific note
/// Creates an order and publishes OrderCreated event to the message bus
/// for async downstream processing by Shipping and Billing contexts.
```

## Project Discovery Pattern

This is what a fresh AI should do, and what the code should enable:

```
1. Open .slnx
   → See: OrderManagement.Api, OrderManagement.Domain, OrderManagement.Postgres
   → Understand: "API + Domain + PostgreSQL. Clean separation."

2. Open Program.cs
   → See: AddDbContext<AppDbContext>, AddScoped<OrderFulfillmentHandler>, MapGroup("/orders")
   → Understand: "PostgreSQL via EF Core, handler pattern, minimal APIs with /orders prefix"

3. Open any handler .cs file
   → See: constructor(AppDbContext, IHybridCache, TimeProvider)
   → Understand: "Uses DB, caching, and time abstraction. Explicit dependencies."

4. Open appsettings.json
   → See: ConnectionStrings, Authentication:, MessageBus:
   → Understand: "PostgreSQL, OIDC auth, RabbitMQ messaging."

Total time: 30 seconds. Full context restored. Zero chat history needed.
```

## Generated Code Checklist

Before committing any generated code, verify:

- [ ] Solution file (.slnx or .sln) at repo root
- [ ] Project names use domain terms (not `Core`, `Shared`, `Utils`)
- [ ] New AI-created files have a one-sentence purpose comment at the top (skip existing files)
- [ ] Class names describe WHAT they do (not generic like `Handler`, `Service`)
- [ ] All dependencies are explicit in constructor parameters
- [ ] Zero XML `<summary>` tags that restate the name
- [ ] WHY comments only for non-obvious decisions
- [ ] appsettings.json keys reference real system components
- [ ] Zero `Helper`, `Manager`, `Utils`, `Common`, `Shared` classes
- [ ] A fresh AI can understand the project in 30 seconds

If any box is unchecked, the code is not ready.
