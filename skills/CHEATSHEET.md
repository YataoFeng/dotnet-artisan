# .NET Cheatsheet — AI Agent Quick Reference

Load this when writing ANY .NET code. One line per rule.

## Version-Aware Rules

> All rules are relative to the project's TFM. Detect version first.

- DbContext direct, no Repository wrapper (net6.0+). Legacy: respect existing patterns.
- TimeProvider, never DateTime.Now (net6.0+). Legacy: use DateTime.UtcNow.
- AddValidation() + DataAnnotations (net10.0+). Earlier: FluentValidation OK.
- Free/open-source only (all versions).
- Microsoft.AspNetCore.OpenApi (net9.0+). Earlier: Swashbuckle OK.
- System.Text.Json source-gen (net8.0+). Earlier: Newtonsoft OK.
- IHttpClientFactory (netcoreapp3.1+). Legacy: new HttpClient() acceptable.

## Architecture

- Simple CRUD: single project + DbContext
- 50+ endpoints: Vertical Slice per feature
- Complex domain: DDD with aggregates
- Multi-service: each service = VSA internally

## EF Core

- .Include().AsNoTracking() for reads
- .Select() project to DTO, never return entity
- ExecuteUpdateAsync/ExecuteDeleteAsync for bulk
- Testcontainers for integration tests, never InMemory
- Review migration SQL before apply

## DI

- Singleton never depends on Scoped
- IServiceScopeFactory when Singleton needs Scoped
- AddDbContext<T>() — scoped by default
- AddDbContextFactory<T>() for BackgroundService/Blazor

## Minimal API

- IEndpointGroup auto-discovery, not Program.cs
- TypedResults, never IResult
- Return DTO, never entity

## HTTP

- IHttpClientFactory with typed clients
- AddStandardResilienceHandler() once per client
- CancellationToken on every call

## Async

- async/await all the way, never .Result/.Wait()
- CancellationToken propagated end-to-end
- async void ONLY for UI event handlers

## Security

- Parameterized queries, never string concatenation
- Policy-based auth, not role strings
- Secrets in user-secrets/KeyVault, never appsettings.json
- Validate JWT: Issuer+Audience+Lifetime+SigningKey all ON

## Testing

- Test behavior, not implementation details
- Testcontainers, never InMemory for integration tests
- Assert specific outcomes, not "didn't throw"
- Fresh state per test, no static shared state

## Build

- dotnet build -m (parallel, default is sequential)
- dotnet format --verify-no-changes in CI
- Multi-stage Docker: SDK→build, runtime→deploy
- Non-root user in containers

## Packages

| Avoid | Use |
|-------|-----|
| MediatR | Mediator (MIT) |
| FluentValidation | AddValidation() |
| AutoMapper | Mapperly |
| Newtonsoft.Json | System.Text.Json |
| Swashbuckle | Microsoft.AspNetCore.OpenApi |
| BinaryFormatter | STJ/Protobuf |
| log4net/NLog | Serilog |
