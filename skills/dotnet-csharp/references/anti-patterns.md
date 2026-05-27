# C# Anti-Patterns — Good vs Bad Code

> **速查**: DateTime.Now→TimeProvider | Scoped in Singleton→IServiceScopeFactory | async void→BackgroundService | .Result→await | IRepository→DbContext | string concat→StringBuilder | lock(this)→private object | new HttpClient()→IHttpClientFactory | Tuple→record | 1 impl→no interface

## 1. DateTime.Now vs TimeProvider

```csharp
// BAD — not testable, timezone-dependent, ambient dependency
var order = new Order { CreatedAt = DateTime.Now };
```

```csharp
// GOOD — injectable, testable with TimeProvider.Fake()
public class OrderService(AppDbContext db, TimeProvider clock)
{
    public async Task Create(CreateOrderRequest req, CancellationToken ct)
    {
        var order = new Order
        {
            CreatedAt = clock.GetLocalNow().DateTime,
            ExpiresAt = clock.GetUtcNow().AddHours(24)
        };
        db.Orders.Add(order);
        await db.SaveChangesAsync(ct);
    }
}
```

## 2. DI Lifetime Mismatch

```csharp
// BAD — Scoped DbContext captured by Singleton cache
builder.Services.AddSingleton<ICache, MemoryCache>();
public class MemoryCache(AppDbContext db) : ICache { } // DbContext is Scoped!
```

```csharp
// GOOD — Use IServiceScopeFactory in singletons
builder.Services.AddSingleton<ICache, MemoryCache>();
public class MemoryCache(IServiceScopeFactory sf) : ICache
{
    public async Task<T?> Get<T>(string key, Func<AppDbContext, Task<T?>> factory)
    {
        using var scope = sf.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        return await factory(db);
    }
}
```

## 3. Async Void / Fire-and-Forget

```csharp
// BAD — exceptions swallowed, no tracking, can crash the process
public void SendEmail(string to, string body)
{
    _ = Task.Run(async () => await _emailService.SendAsync(to, body));
}
```

```csharp
// GOOD — BackgroundService with Channel<T> for queued work
public class EmailBackgroundService(Channel<EmailJob> queue, IEmailService svc)
    : BackgroundService
{
    protected override async Task ExecuteAsync(CancellationToken ct)
    {
        await foreach (var job in queue.Reader.ReadAllAsync(ct))
            await svc.SendAsync(job.To, job.Body, ct);
    }
}
```

## 4. Missing CancellationToken

```csharp
// BAD — request timeout = stuck thread, no graceful shutdown
public async Task<List<Product>> Search(string q)
    => await db.Products.Where(p => p.Name.Contains(q)).ToListAsync();
```

```csharp
// GOOD — propagate ct end-to-end; ASP.NET binds HttpContext.RequestAborted
public async Task<List<Product>> Search(string q, CancellationToken ct = default)
    => await db.Products.Where(p => p.Name.Contains(q)).ToListAsync(ct);
```

## 5. EF Core N+1 Queries

```csharp
// BAD — one query per order to fetch items
var orders = await db.Orders.Where(o => o.CustomerId == id).ToListAsync();
foreach (var o in orders)
    o.Items = await db.OrderItems.Where(i => i.OrderId == o.Id).ToListAsync();
```

```csharp
// GOOD — single query with Include + AsNoTracking for read-only
var orders = await db.Orders
    .Include(o => o.Items)
    .Where(o => o.CustomerId == id)
    .AsNoTracking()
    .ToListAsync();
```

## 6. Repository Wrapper over DbContext

```csharp
// BAD — useless abstraction hiding IQueryable and .Include()
public interface IRepository<T> { Task<T> GetById(int id); Task Add(T e); }
public class Repository<T>(AppDbContext db) : IRepository<T> { /* wraps DbSet */ }
```

```csharp
// GOOD — use DbContext directly; DbSet<T> IS the repository
public class OrderService(AppDbContext db)
{
    public async Task<Order?> Get(int id) => await db.Orders.FindAsync(id);
    public IQueryable<Order> Query() => db.Orders.AsNoTracking(); // let caller compose
}
```

## 7. String Concatenation in Loops

```csharp
// BAD — O(n^2) allocation, each + creates a new string
var result = "";
foreach (var item in items) { result += item.Name + ","; }
```

```csharp
// GOOD — use StringBuilder or string.Join
var result = string.Join(",", items.Select(i => i.Name));
// or for complex building:
var sb = new StringBuilder();
foreach (var item in items) { sb.Append(item.Name).Append(','); }
```

## 8. Locking on Public Objects / this

```csharp
// BAD — external code can lock on the same object → deadlock
public class Cache { public void Set(string k, object v) { lock (this) { ... } } }
```

```csharp
// GOOD — private dedicated lock object
public class Cache
{
    private readonly object _lock = new();
    public void Set(string k, object v) { lock (_lock) { ... } }
}
```

## 9. .Result / .Wait() on Async Code

```csharp
// BAD — deadlocks in sync context (ASP.NET, WPF, WinForms)
var data = GetDataAsync().Result;
GetDataAsync().Wait();
```

```csharp
// GOOD — async all the way up
var data = await GetDataAsync();
// If you absolutely must block (console app), use GetAwaiter().GetResult()
var data = GetDataAsync().GetAwaiter().GetResult(); // avoids AggregateException wrap
```

## 10. Over-Abstraction: One Implementation, One Interface

```csharp
// BAD — interface with 1 implementation = YAGNI violation
public interface IOrderService { Task<Order> Create(CreateOrderRequest req); }
public class OrderService : IOrderService { /* ... */ }
```

```csharp
// GOOD — just use the concrete class; add interface when you have 2+ impls
public class OrderService(AppDbContext db) { /* ... */ }
// For testing: mock DbContext with InMemory provider or use Testcontainers
```
