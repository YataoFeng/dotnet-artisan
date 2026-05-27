# .NET Decision Guides

Consolidated from dotnet-claude-kit. When AI must choose between valid options, these tables
provide the tiebreaker. Load this when making architecture/framework/pattern decisions.

## Data Access

| Scenario | Recommendation |
|----------|---------------|
| Standard CRUD | DbContext with `.Select()` projections |
| Bulk updates (100+ rows) | `ExecuteUpdateAsync` / `ExecuteDeleteAsync` |
| Hot-path read query | Compiled query (`EF.CompileAsyncQuery`) |
| Cross-cutting persistence concern | Interceptor |
| Read-heavy reporting | Dapper or raw SQL via `FromSqlInterpolated` |
| Schema migration | EF Core migrations (review SQL before apply) |
| Complex domain model | EF Core + IEntityTypeConfiguration per entity |

## Architecture

| Scenario | Recommendation |
|----------|---------------|
| Feature-rich API (50+ endpoints) | Vertical Slice Architecture |
| Complex business rules, many invariants | Domain-Driven Design |
| Need to swap persistence/UI independently | Clean Architecture |
| Simple CRUD (5-10 endpoints) | Single project, controllers + DbContext |
| Modular monolith | Feature folders + shared contracts |
| Microservices | Per-service Vertical Slice + async messaging |

## API Design

| Scenario | Recommendation |
|----------|---------------|
| New HTTP API (.NET 10) | Minimal API with `IEndpointGroup` auto-discovery |
| Existing MVC project | Keep controllers, migrate incrementally |
| OpenAPI documentation | `TypedResults` + `.WithName()` + Scalar UI |
| Request validation | Endpoint filter (DataAnnotations or FluentValidation) |
| Authentication/authorization | Policy-based: `.RequireAuthorization("PolicyName")` |
| Rate limiting | `AddRateLimiter` + `.RequireRateLimiting()` |
| Response caching | `AddOutputCache` + `.CacheOutput()` |
| API versioning | URL path (`/api/v1/`) or header (`Api-Version: 2.0`) |

## Caching

| Scenario | Recommendation |
|----------|---------------|
| General data caching | HybridCache (`GetOrCreateAsync`) |
| Full HTTP response | Output caching |
| Cache-aside (legacy) | `IDistributedCache` only when integrating old code |
| Stampede protection | HybridCache built-in (no manual locks) |
| User-specific data | Key includes user ID |
| Configuration/settings | `IOptionsMonitor<T>` with TTL |

## Error Handling

| Scenario | Recommendation |
|----------|---------------|
| Expected business failure | Result pattern |
| Input validation | Validation filter with ProblemDetails |
| Unexpected crash | Global `IExceptionHandler` → ProblemDetails |
| API error format | RFC 9457 ProblemDetails — always |
| External service failure | Catch specific exception, return Result.Failure |
| Validation in handler | Return `Result.Failure`, don't throw |

## DI & Lifetimes

| Scenario | Recommendation |
|----------|---------------|
| Stateless service | Scoped (default) or Transient |
| Configuration / cache | Singleton |
| DbContext | Scoped (registered by `AddDbContext`) |
| Multiple implementations | Keyed services (strategy pattern) |
| Cross-cutting behavior | Decorator pattern |
| Singleton needing scoped dep | `IServiceScopeFactory` |

## Observability

| Scenario | Recommendation |
|----------|---------------|
| Application logging | Serilog with structured logging |
| Distributed tracing | OpenTelemetry with OTLP exporter |
| Custom business metrics | `IMeterFactory` + counters/histograms |
| Request tracing | Correlation ID middleware |
| Container health | `/health/live` and `/health/ready` endpoints |
| Log storage | Seq (dev), Grafana Loki/Elastic (prod) |
| Log levels | Debug (dev), Information (staging), Warning (prod) |

## Testing

| Scenario | Recommendation |
|----------|---------------|
| Unit test business logic | xUnit + direct instantiation |
| Integration test | `WebApplicationFactory` + Testcontainers |
| E2E browser test | Playwright |
| Performance benchmark | BenchmarkDotNet |
| Snapshot test | Verify |
| In-memory database | NEVER for integration tests — use Testcontainers |
| Test data setup | Builder pattern or class fixtures |
| Mutation testing | Stryker.NET on critical paths (nightly) |

## Hosting & Deployment

| Scenario | Recommendation |
|----------|---------------|
| Local dev (multi-service) | .NET Aspire AppHost |
| Local dev (single service) | `dotnet run` |
| Container build | Multi-stage Dockerfile (SDK → runtime) |
| Container runtime user | Non-root (UID 1001) |
| Production deploy | Docker / K8s / Azure Container Apps |
| CI build | `dotnet publish` once, deploy same artifact |
| NuGet package | `dotnet pack` + GitHub Packages or NuGet.org |

## AI / MCP

| Scenario | Recommendation |
|----------|---------------|
| Expose .NET tools to AI | MCP server (ModelContextProtocol) |
| Multi-step AI workflows | Semantic Kernel |
| Simple LLM call | `HttpClient` + OpenAI SDK |
| In-process ML inference | ML.NET |
| Vector search | Qdrant / Azure AI Search / pgvector |
| RAG pipeline | Semantic Kernel + vector DB |

## .NET Version Features

| .NET Version | Key New Feature |
|-------------|----------------|
| net8.0 | Keyed DI, `TimeProvider`, `IExceptionHandler`, `[AsParameters]` |
| net9.0 | `HybridCache`, fingerprinting, auto-compiled EF models, `field` keyword preview |
| net10.0 | C# 14, native DataAnnotations validation, `field` keyword stable, `params` Span |
| net11.0 | C# 15 preview, enhanced Native AOT, ASP.NET Core perf improvements |
