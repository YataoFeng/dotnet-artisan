# Package Choices — Free & Microsoft-Recommended

Prefer free/open-source and Microsoft-recommended packages. Avoid commercial, unmaintained, or reflection-heavy alternatives.

## Replacement Guide

| Avoid | Use Instead | Why |
|-------|------------|-----|
| **MediatR** (commercial) | Direct handler calls or Mediator (MIT source-gen) | Free, AOT-compatible, no runtime reflection |
| **FluentValidation** (deprecated for .NET 10+) | `AddValidation()` + DataAnnotations | Built-in, source-generated, AOT-compatible |
| **AutoMapper** (commercial) | Manual mapping or Mapperly (MIT source-gen) | Faster, compile-time, no runtime magic |
| **Newtonsoft.Json** (legacy) | `System.Text.Json` + source generators | Built-in, AOT-compatible, faster |
| **Swashbuckle** (unmaintained) | `Microsoft.AspNetCore.OpenApi` | First-party, OpenAPI 3.1, Native AOT |
| **SwaggerUI** | Scalar API Reference | Modern, lightweight, MIT |
| **BinaryFormatter** (removed) | `System.Text.Json` or Protobuf | Security-safe, cross-platform |
| **log4net** (legacy) | `Microsoft.Extensions.Logging` + Serilog | Structured logging, built-in DI |
| **NLog** (legacy, if migrating) | Serilog (Apache 2.0) | Better structured logging, wider ecosystem |
| **IdentityServer4** (EOL) | Duende (community edition free) or Keycloak (Apache 2.0) | Maintained, secure |
| **MongoDB.Driver** (SSPL) | PostgreSQL + EF Core or Marten (MIT) | True open-source, no license concerns |

## Always-Prefer Stack (All Free/Open-Source)

| Layer | Recommendation |
|-------|---------------|
| API framework | ASP.NET Core minimal APIs |
| ORM | EF Core |
| Validation | `AddValidation()` + DataAnnotations |
| Mapping | Manual or Mapperly source-gen |
| Serialization | `System.Text.Json` source-gen |
| Caching | `HybridCache` |
| Resilience | Polly v8 + `Microsoft.Extensions.Http.Resilience` |
| Messaging | Wolverine (MIT) or raw Azure Service Bus SDK |
| Logging | Serilog (Apache 2.0) |
| Observability | OpenTelemetry |
| Testing | xUnit v3 + Testcontainers |
| Container build | Multi-stage Dockerfile + chiseled images |
| CI/CD | GitHub Actions |
| API docs | `Microsoft.AspNetCore.OpenApi` + Scalar |
| Auth | ASP.NET Core Identity + JWT Bearer |
| Health checks | `Microsoft.Extensions.Diagnostics.HealthChecks` |

## AOT Compatibility Note

Packages that use runtime reflection are NOT AOT-compatible. Prefer source-generated alternatives:

| Runtime Reflection | Source-Generated (AOT-safe) |
|-------------------|---------------------------|
| Newtonsoft.Json | System.Text.Json + `[JsonSerializable]` |
| AutoMapper | Mapperly |
| MediatR | Mediator (MIT) |
| FluentValidation | `AddValidation()` + `[ValidatableType]` |
| Dynamic DI scanning | Explicit `AddScoped<T>()` registration |
