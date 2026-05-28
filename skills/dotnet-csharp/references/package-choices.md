# Package Choices — Free & Microsoft-Recommended

Prioritize free/open-source and Microsoft-recommended packages. Avoid commercial, unmaintained, or reflection-dependent alternatives.

## Replacement Guide

| Avoid | Use | Why |
|------|------|------|
| **MediatR** (commercial) | Direct Handler call or Mediator (MIT source-gen) | Free, AOT-compatible, zero runtime reflection |
| **FluentValidation** (.NET 10+ deprecated) | `AddValidation()` + DataAnnotations | Built-in, source-generated, AOT-compatible |
| **AutoMapper** (commercial) | Manual mapping or Mapperly (MIT source-gen) | Faster, compile-time, no runtime magic |
| **Newtonsoft.Json** (legacy) | `System.Text.Json` + source generator | Built-in, AOT-compatible, faster |
| **Swashbuckle** (unmaintained) | `Microsoft.AspNetCore.OpenApi` | Microsoft official, OpenAPI 3.1, Native AOT |
| **SwaggerUI** | Scalar API Reference | Modern, lightweight, MIT |
| **BinaryFormatter** (removed) | `System.Text.Json` or Protobuf | Safe, cross-platform |
| **log4net** (legacy) | `Microsoft.Extensions.Logging` + Serilog | Structured logging, built-in DI |
| **NLog** (migrating) | Serilog (Apache 2.0) | Better structured logging, wider ecosystem |
| **IdentityServer4** (EOL) | Duende (community edition free) or Keycloak (Apache 2.0) | Maintained, secure |
| **MongoDB.Driver** (SSPL) | PostgreSQL + EF Core or Marten (MIT) | Truly open source, no licensing concerns |

## Always-Preferred Tech Stack (All Free/Open Source)

| Layer | Recommendation |
|----|------|
| API Framework | ASP.NET Core Minimal APIs |
| ORM | EF Core |
| Validation | `AddValidation()` + DataAnnotations |
| Mapping | Manual or Mapperly source-gen |
| Serialization | `System.Text.Json` source-gen |
| Cache | `HybridCache` |
| Resilience | Polly v8 + `Microsoft.Extensions.Http.Resilience` |
| Messaging | Wolverine (MIT) or native Azure Service Bus SDK |
| Logging | Serilog (Apache 2.0) |
| Observability | OpenTelemetry |
| Testing | xUnit v3 + Testcontainers |
| Container Build | Multi-stage Dockerfile + Chiseled images |
| CI/CD | GitHub Actions |
| API Docs | `Microsoft.AspNetCore.OpenApi` + Scalar |
| Authentication | ASP.NET Core Identity + JWT Bearer |
| Health Checks | `Microsoft.Extensions.Diagnostics.HealthChecks` |

## AOT Compatibility Notes

Packages using runtime reflection do not support AOT. Prefer source-generated alternatives:

| Runtime Reflection | Source-Generated (AOT-Safe) |
|-----------|------------------|
| Newtonsoft.Json | System.Text.Json + `[JsonSerializable]` |
| AutoMapper | Mapperly |
| MediatR | Mediator (MIT) |
| FluentValidation | `AddValidation()` + `[ValidatableType]` |
| Dynamic DI scanning | Explicit `AddScoped<T>()` registration |
