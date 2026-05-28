# Vertical Slice Architecture (VSA)

> **Quick Ref**: Feature folders, not layer folders | Handler is unit of work | Source-generated Mediator for decoupling | Minimal API direct handler for simple cases | VSA for 50+ endpoints or 3+ devs | Simple CRUD: controller + DbContext suffices | Avoid god-services

VSA organizes code by feature, not by technical layer. Each feature is a self-contained slice containing its endpoint, handler, request/response, and validation.

## Core Principles

1. **Organize by feature, not by layer** — No more jumping between Controllers/, Services/, Repositories/ folders.
2. **Minimize cross-feature coupling** — Features don't reference each other. Shared concerns go in `Common/`.
3. **One file per feature is fine** — Start with everything in one file, extract only when complexity demands it.
4. **The handler is the unit of work** — Each handler does one thing. No god-services.

## Feature Folder Structure

```
src/MyApp.Api/
  Features/
    Orders/
      CreateOrder.cs       # Request, Handler, Response, Endpoint
      GetOrder.cs
      ListOrders.cs
      Shared/              # Feature-internal shared code only
    Products/
      CreateProduct.cs
  Common/
    Behaviors/             # Cross-cutting pipeline behaviors
    Persistence/           # DbContext
    Extensions/            # DI registration
```

## Pattern: Source-Generated Mediator (Recommended)

```csharp
// Features/Orders/CreateOrder.cs
public static class CreateOrder
{
    public sealed record Command(string CustomerId, List<Item> Items) : IRequest<OrderResponse>;
    public sealed record Item(string ProductId, int Quantity);
    public sealed record OrderResponse(Guid Id, decimal Total);

    internal sealed class Handler(AppDbContext db, TimeProvider clock)
        : IRequestHandler<Command, OrderResponse>
    {
        public async ValueTask<OrderResponse> Handle(Command req, CancellationToken ct)
        {
            var order = Order.Create(req.CustomerId, req.Items, clock.GetUtcNow());
            db.Orders.Add(order);
            await db.SaveChangesAsync(ct);
            return new OrderResponse(order.Id, order.Total);
        }
    }
}
```

Registration: `builder.Services.AddMediator()` — source-generated, AOT-compatible, MIT licensed.

## Pattern: Direct Handler (Minimal API)

```csharp
// Features/Orders/OrderEndpoints.cs
public static class OrderEndpoints
{
    public static void Map(IEndpointRouteBuilder app)
    {
        app.MapPost("/api/orders", async (CreateOrderRequest req, AppDbContext db, CancellationToken ct) =>
        {
            var order = Order.Create(req.CustomerId, req.Items);
            db.Orders.Add(order);
            await db.SaveChangesAsync(ct);
            return TypedResults.Created($"/api/orders/{order.Id}", order);
        });
    }
}
```

## When to Use VSA

| Signal | Use VSA |
|--------|---------|
| Feature-rich application (50+ endpoints) | Yes |
| Simple CRUD (5-10 endpoints) | No — controller + DbContext suffices |
| Team of 3+ developers | Yes — reduces merge conflicts |
| Solo developer, small app | No — overhead not justified |

## VSA vs Clean Architecture vs DDD

- **VSA**: Feature folders, handler per operation. Best for API-heavy apps with distinct features.
- **Clean Architecture**: Domain/Core → Application → Infrastructure → Presentation layers. Best when domain logic is deep and persistence changes are likely.
- **DDD**: Aggregates, entities, value objects, domain events. Best for complex business rules and collaborative domains.

Scale pattern to problem. Simple CRUD doesn't need DDD. A 20-line handler doesn't need 5 files.
