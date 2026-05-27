# Skill Reference Index

Quick navigation for all reference files. Each file contains implementation patterns + anti-patterns.

**Jump to:** [Core](#core-always-loaded) · [C#](#c-language) · [API](#api--backend) · [UI](#ui) · [Testing](#testing) · [DevOps](#devops) · [Tooling](#tooling)

## Core (always loaded)

| File | Topics |
|------|--------|
| [coding-standards.md](dotnet-csharp/references/coding-standards.md) | Naming, file layout, style rules |
| [async-patterns.md](dotnet-csharp/references/async-patterns.md) | Async/await, ConfigureAwait, cancellation |
| [solid-principles.md](dotnet-csharp/references/solid-principles.md) | SOLID, DRY, anti-pattern detection |
| [code-smells.md](dotnet-csharp/references/code-smells.md) | Common mistakes (async void, DI misuse, swallowed exceptions) |
| [anti-patterns.md](dotnet-csharp/references/anti-patterns.md) | 10 BAD/GOOD code comparisons |
| [dotnet-releases.md](dotnet-csharp/references/dotnet-releases.md) | .NET/C# version features and breaking changes |
| [DECISIONS.md](DECISIONS.md) | When to use what — decision guide cross-reference |
| [CHEATSHEET.md](CHEATSHEET.md) | One-page all-rules summary — load as context refresher |
| [package-choices.md](dotnet-csharp/references/package-choices.md) | Commercial → free/open-source alternatives |

## C# Language

| File | Topics |
|------|--------|
| [modern-patterns.md](dotnet-csharp/references/modern-patterns.md) | Records, pattern matching, primary constructors, collection expressions |
| [dependency-injection.md](dotnet-csharp/references/dependency-injection.md) | MS DI, keyed services, lifetimes, scope validation |
| [configuration.md](dotnet-csharp/references/configuration.md) | Options pattern, user secrets, ValidateOnStart |
| [nullable-reference-types.md](dotnet-csharp/references/nullable-reference-types.md) | NRT annotations, migration, common mistakes |
| [serialization.md](dotnet-csharp/references/serialization.md) | System.Text.Json, Protobuf, AOT-compatible |
| [channels.md](dotnet-csharp/references/channels.md) | Channel<T>, bounded/unbounded, backpressure |
| [concurrency-patterns.md](dotnet-csharp/references/concurrency-patterns.md) | lock, SemaphoreSlim, concurrent collections |
| [domain-modeling.md](dotnet-csharp/references/domain-modeling.md) | Aggregates, value objects, domain events |
| [linq-optimization.md](dotnet-csharp/references/linq-optimization.md) | IQueryable vs IEnumerable, allocations |
| [source-generators.md](dotnet-csharp/references/source-generators.md) | IIncrementalGenerator, GeneratedRegex |
| [api-design.md](dotnet-csharp/references/api-design.md) | Naming, parameter ordering, return types |
| [type-design-performance.md](dotnet-csharp/references/type-design-performance.md) | struct vs class, sealed, Span/Memory |
| [globalization.md](dotnet-csharp/references/globalization.md) | CultureInfo, StringComparison, encoding |
| [native-interop.md](dotnet-csharp/references/native-interop.md) | P/Invoke, LibraryImport, marshalling |
| [wasm-interop.md](dotnet-csharp/references/wasm-interop.md) | JSImport/JSExport, browser WASM |
| [roslyn-analyzers.md](dotnet-csharp/references/roslyn-analyzers.md) | DiagnosticAnalyzer, CodeFixProvider |
| [editorconfig.md](dotnet-csharp/references/editorconfig.md) | IDE/CA severity, globalconfig |
| [file-io.md](dotnet-csharp/references/file-io.md) | FileStream, RandomAccess, paths |
| [input-validation.md](dotnet-csharp/references/input-validation.md) | DataAnnotations, .NET 10 AddValidation |
| [validation-patterns.md](dotnet-csharp/references/validation-patterns.md) | IValidatableObject, IValidateOptions |

## API & Backend

| File | Topics |
|------|--------|
| [minimal-apis.md](dotnet-api/references/minimal-apis.md) | Endpoint filters, route groups, TypedResults |
| [efcore-patterns.md](dotnet-api/references/efcore-patterns.md) | DbContext, migrations, interceptors, compiled queries |
| [efcore-architecture.md](dotnet-api/references/efcore-architecture.md) | DbContext lifecycle, multi-tenancy, sharding |
| [http-client.md](dotnet-api/references/http-client.md) | IHttpClientFactory, typed clients, DelegatingHandler |
| [resilience.md](dotnet-api/references/resilience.md) | Polly v8, circuit breaker, retry, timeout |
| [messaging-patterns.md](dotnet-api/references/messaging-patterns.md) | Transactional outbox, service bus, Wolverine |
| [middleware-patterns.md](dotnet-api/references/middleware-patterns.md) | Custom middleware, error handling, ProblemDetails |
| [grpc.md](dotnet-api/references/grpc.md) | Proto contracts, streaming, interceptors |
| [hybrid-cache.md](dotnet-api/references/hybrid-cache.md) | HybridCache, stampede protection, L1/L2 |
| [output-caching.md](dotnet-api/references/output-caching.md) | Output cache, cache profiles, invalidation |
| [openapi.md](dotnet-api/references/openapi.md) | OpenAPI generation, Scalar, document transformers |
| [api-versioning.md](dotnet-api/references/api-versioning.md) | URL/header versioning, sunset headers |
| [architecture-patterns.md](dotnet-api/references/architecture-patterns.md) | Clean Architecture, modular monolith |
| [architecture-patterns-vsa.md](dotnet-api/references/architecture-patterns-vsa.md) | Vertical Slice Architecture, feature folders |
| [identity-setup.md](dotnet-api/references/identity-setup.md) | ASP.NET Identity, JWT, policy-based auth |
| [security-owasp.md](dotnet-api/references/security-owasp.md) | OWASP Top 10, SQL injection, XSS, crypto |
| [api-security.md](dotnet-api/references/api-security.md) | CORS, CSP, rate limiting, data protection |
| [api-surface-validation.md](dotnet-api/references/api-surface-validation.md) | Parameter binding, model validation |
| [aspire-patterns.md](dotnet-api/references/aspire-patterns.md) | .NET Aspire, service defaults, orchestration |
| [background-services.md](dotnet-api/references/background-services.md) | IHostedService, BackgroundService, Channel<T> |
| [secrets-management.md](dotnet-api/references/secrets-management.md) | User secrets, Key Vault, environment variables |
| [service-communication.md](dotnet-api/references/service-communication.md) | gRPC vs REST vs messaging — when to use each |
| [semantic-kernel.md](dotnet-api/references/semantic-kernel.md) | AI orchestration, plugins, planners |
| [cryptography.md](dotnet-api/references/cryptography.md) | AES-GCM, HMAC, PBKDF2, SHA256 |
| [yarp.md](dotnet-api/references/yarp.md) | Reverse proxy, request transformation |
| [file-based-apps.md](dotnet-api/references/file-based-apps.md) | Single-file .NET apps, scripts |
| [office-documents.md](dotnet-api/references/office-documents.md) | Excel, Word, PowerPoint generation |
| [io-pipelines.md](dotnet-api/references/io-pipelines.md) | System.IO.Pipelines, high-perf I/O |

## UI

| File | Topics |
|------|--------|
| [blazor-patterns.md](dotnet-ui/references/blazor-patterns.md) | Render modes, JS interop, prerendering |
| [blazor-components.md](dotnet-ui/references/blazor-components.md) | Component design, parameters, cascading values |
| [blazor-auth.md](dotnet-ui/references/blazor-auth.md) | Auth state, policies, redirect |
| [blazor-testing.md](dotnet-ui/references/blazor-testing.md) | bUnit, component testing |
| [maui-development.md](dotnet-ui/references/maui-development.md) | MAUI pages, navigation, MVVM |
| [uno-platform.md](dotnet-ui/references/uno-platform.md) | Uno Platform patterns, multi-target |
| [winui.md](dotnet-ui/references/winui.md) | WinUI 3, Windows App SDK |
| [wpf-modern.md](dotnet-ui/references/wpf-modern.md) | WPF on .NET 8+, Fluent theme |
| [accessibility.md](dotnet-ui/references/accessibility.md) | ARIA, SemanticProperties, keyboard nav |
| [localization.md](dotnet-ui/references/localization.md) | .resx, RTL, culture support |
| [ui-chooser.md](dotnet-ui/references/ui-chooser.md) | Which .NET UI framework for your scenario |

## Testing

| File | Topics |
|------|--------|
| [testing-strategy.md](dotnet-testing/references/testing-strategy.md) | Test pyramid, what to test, when to mock |
| [test-quality.md](dotnet-testing/references/test-quality.md) | Test smells, CRAP score, coverage analysis |
| [xunit.md](dotnet-testing/references/xunit.md) | xUnit v3, Facts, Theories, IAsyncLifetime |
| [integration-testing.md](dotnet-testing/references/integration-testing.md) | WebApplicationFactory, Testcontainers |
| [playwright.md](dotnet-testing/references/playwright.md) | E2E browser testing |
| [benchmarkdotnet.md](dotnet-testing/references/benchmarkdotnet.md) | Microbenchmarks, memory diagnoser |
| [snapshot-testing.md](dotnet-testing/references/snapshot-testing.md) | Verify, scrubbing |

## DevOps

| File | Topics |
|------|--------|
| [gha-patterns.md](dotnet-devops/references/gha-patterns.md) | GitHub Actions, setup-dotnet, caching, deployment |
| [containers.md](dotnet-devops/references/containers.md) | Docker multi-stage, non-root, health checks |
| [observability.md](dotnet-devops/references/observability.md) | OpenTelemetry, metrics, tracing |
| [structured-logging.md](dotnet-devops/references/structured-logging.md) | Serilog, message templates, PII masking |

## Tooling

| File | Topics |
|------|--------|
| [project-structure.md](dotnet-tooling/references/project-structure.md) | .slnx, CPM, Directory.Build.props |
| [scaffold-project.md](dotnet-tooling/references/scaffold-project.md) | dotnet new, project templates |
| [build-analysis.md](dotnet-tooling/references/build-analysis.md) | Build errors, warnings, parallel build |
| [version-upgrade.md](dotnet-tooling/references/version-upgrade.md) | net8→9→10→11 migration, breaking changes |
| [version-detection.md](dotnet-tooling/references/version-detection.md) | TFM detection, SDK version resolution |

## Structure

Each reference file follows this layout:
1. **Core principles** (WHAT to do)
2. **Patterns with code examples** (HOW to do it)
3. **Anti-patterns** (WHAT NOT to do — BAD/GOOD code)
4. **Decision guide** (WHEN to choose what)
5. **References** (external docs)

See [DECISIONS.md](DECISIONS.md) for the consolidated decision guide cross-reference.
