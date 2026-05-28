# Skill Reference Index
Quick navigation for all reference files. Each file contains implementation patterns + anti-patterns.

**Jump to:** [API & Backend](#api--backend) · [C# Language](#c-language) · [Debugging](#debugging) · [DevOps](#devops) · [Testing](#testing) · [Tooling](#tooling) · [UI](#ui)

## API & Backend
| File | Topic |
|------|-------|
| [agent-gotchas.md](dotnet-api/references/agent-gotchas.md) | Common AI agent mistakes in .NET code |
| [api-docs.md](dotnet-api/references/api-docs.md) | API documentation generation for .NET |
| [api-security.md](dotnet-api/references/api-security.md) | API authentication and authorization |
| [api-surface-validation.md](dotnet-api/references/api-surface-validation.md) | Public API surface validation tools |
| [api-versioning.md](dotnet-api/references/api-versioning.md) | API versioning strategies for ASP.NET Core |
| [architecture-patterns-vsa.md](dotnet-api/references/architecture-patterns-vsa.md) | Vertical Slice Architecture for .NET |
| [architecture-patterns.md](dotnet-api/references/architecture-patterns.md) | Modern .NET architecture patterns |
| [aspire-patterns.md](dotnet-api/references/aspire-patterns.md) | .NET Aspire orchestration patterns |
| [background-services.md](dotnet-api/references/background-services.md) | Long-running background service patterns |
| [cryptography.md](dotnet-api/references/cryptography.md) | Modern .NET cryptography patterns |
| [data-access-strategy.md](dotnet-api/references/data-access-strategy.md) | Data access technology decision framework |
| [efcore-architecture.md](dotnet-api/references/efcore-architecture.md) | EF Core strategic architecture patterns |
| [efcore-patterns.md](dotnet-api/references/efcore-patterns.md) | EF Core tactical query patterns |
| [file-based-apps.md](dotnet-api/references/file-based-apps.md) | .NET 10 file-based single-file apps |
| [grpc.md](dotnet-api/references/grpc.md) | Full gRPC lifecycle for .NET |
| [http-client.md](dotnet-api/references/http-client.md) | HTTP client best practices with IHttpClientFactory |
| [hybrid-cache.md](dotnet-api/references/hybrid-cache.md) | HybridCache two-level caching API |
| [identity-setup.md](dotnet-api/references/identity-setup.md) | ASP.NET Core Identity configuration |
| [io-pipelines.md](dotnet-api/references/io-pipelines.md) | High-performance I/O with System.IO.Pipelines |
| [library-api-compat.md](dotnet-api/references/library-api-compat.md) | Binary and source compatibility rules |
| [messaging-patterns.md](dotnet-api/references/messaging-patterns.md) | Durable messaging patterns for .NET |
| [middleware-patterns.md](dotnet-api/references/middleware-patterns.md) | ASP.NET Core middleware pipeline patterns |
| [minimal-apis.md](dotnet-api/references/minimal-apis.md) | Minimal API design patterns |
| [office-documents.md](dotnet-api/references/office-documents.md) | Office document processing with Open XML |
| [openapi.md](dotnet-api/references/openapi.md) | OpenAPI/Swagger integration for ASP.NET Core |
| [output-caching.md](dotnet-api/references/output-caching.md) | Output caching and response caching |
| [realtime-communication.md](dotnet-api/references/realtime-communication.md) | Real-time communication protocol patterns |
| [resilience.md](dotnet-api/references/resilience.md) | Resilience patterns with Polly v8 |
| [secrets-management.md](dotnet-api/references/secrets-management.md) | Cloud-agnostic secrets management |
| [security-owasp.md](dotnet-api/references/security-owasp.md) | OWASP Top 10 security guidance |
| [semantic-kernel.md](dotnet-api/references/semantic-kernel.md) | Semantic Kernel AI orchestration |
| [service-communication.md](dotnet-api/references/service-communication.md) | Service communication protocol selection |
| [yarp.md](dotnet-api/references/yarp.md) | YARP reverse proxy patterns |

## C# Language
| File | Topic |
|------|-------|
| [anti-patterns.md](dotnet-csharp/references/anti-patterns.md) | Common C# anti-patterns and fixes |
| [api-design.md](dotnet-csharp/references/api-design.md) | Public API design principles |
| [async-patterns.md](dotnet-csharp/references/async-patterns.md) | Async/await patterns and guidelines |
| [channels.md](dotnet-csharp/references/channels.md) | System.Threading.Channels producer-consumer patterns |
| [code-smells.md](dotnet-csharp/references/code-smells.md) | Code smell detection and remediation |
| [coding-standards.md](dotnet-csharp/references/coding-standards.md) | .NET coding standards and conventions |
| [concurrency-patterns.md](dotnet-csharp/references/concurrency-patterns.md) | Thread synchronization primitives |
| [configuration.md](dotnet-csharp/references/configuration.md) | Configuration and Options patterns |
| [dependency-injection.md](dotnet-csharp/references/dependency-injection.md) | Advanced DI patterns |
| [domain-modeling.md](dotnet-csharp/references/domain-modeling.md) | DDD tactical patterns in C# |
| [dotnet-releases.md](dotnet-csharp/references/dotnet-releases.md) | .NET and C# version reference |
| [editorconfig.md](dotnet-csharp/references/editorconfig.md) | EditorConfig and analyzer configuration |
| [file-io.md](dotnet-csharp/references/file-io.md) | File I/O patterns for .NET |
| [globalization.md](dotnet-csharp/references/globalization.md) | Culture-aware C# coding patterns |
| [input-validation.md](dotnet-csharp/references/input-validation.md) | Input validation for .NET APIs |
| [linq-optimization.md](dotnet-csharp/references/linq-optimization.md) | LINQ performance optimization patterns |
| [modern-patterns.md](dotnet-csharp/references/modern-patterns.md) | Modern C# language feature guidance |
| [native-interop.md](dotnet-csharp/references/native-interop.md) | P/Invoke and native interop patterns |
| [nullable-reference-types.md](dotnet-csharp/references/nullable-reference-types.md) | Nullable reference type annotations |
| [package-choices.md](dotnet-csharp/references/package-choices.md) | Free and recommended package choices |
| [roslyn-analyzers.md](dotnet-csharp/references/roslyn-analyzers.md) | Custom Roslyn analyzer authoring |
| [serialization.md](dotnet-csharp/references/serialization.md) | AOT-friendly serialization patterns |
| [solid-principles.md](dotnet-csharp/references/solid-principles.md) | SOLID principles in C# |
| [source-generators.md](dotnet-csharp/references/source-generators.md) | Roslyn source generator patterns |
| [type-design-performance.md](dotnet-csharp/references/type-design-performance.md) | Type design for performance |
| [validation-patterns.md](dotnet-csharp/references/validation-patterns.md) | Built-in .NET validation patterns |
| [wasm-interop.md](dotnet-csharp/references/wasm-interop.md) | WebAssembly interop patterns |

## Debugging
| File | Topic |
|------|-------|
| [access-mcp.md](dotnet-debugging/references/access-mcp.md) | Access WinDbg MCP server setup |
| [capture-playbooks.md](dotnet-debugging/references/capture-playbooks.md) | Crash dump capture strategies |
| [common-patterns.md](dotnet-debugging/references/common-patterns.md) | Common debugging patterns and checks |
| [dump-workflow.md](dotnet-debugging/references/dump-workflow.md) | Crash dump analysis workflow |
| [linux-debugging.md](dotnet-debugging/references/linux-debugging.md) | Linux and macOS .NET debugging |
| [live-attach.md](dotnet-debugging/references/live-attach.md) | Live process attach workflows |
| [mcp-setup.md](dotnet-debugging/references/mcp-setup.md) | WinDbg MCP server installation |
| [report-template.md](dotnet-debugging/references/report-template.md) | Crash dump analysis report template |
| [sanity-check.md](dotnet-debugging/references/sanity-check.md) | Pre-analysis sanity checks |
| [scenario-command-packs.md](dotnet-debugging/references/scenario-command-packs.md) | Scenario-based command sequences |
| [symbols.md](dotnet-debugging/references/symbols.md) | Symbol configuration for debugging |
| [task-crash.md](dotnet-debugging/references/task-crash.md) | Crash/exception analysis task |
| [task-hang.md](dotnet-debugging/references/task-hang.md) | Hang/unresponsive analysis task |
| [task-high-cpu.md](dotnet-debugging/references/task-high-cpu.md) | High CPU analysis task |
| [task-kernel.md](dotnet-debugging/references/task-kernel.md) | Kernel dump triage task |
| [task-memory.md](dotnet-debugging/references/task-memory.md) | Memory pressure analysis task |
| [task-unknown.md](dotnet-debugging/references/task-unknown.md) | Unknown symptom analysis task |

## DevOps
| File | Topic |
|------|-------|
| [add-ci.md](dotnet-devops/references/add-ci.md) | Add starter CI/CD workflows |
| [ado-build-test.md](dotnet-devops/references/ado-build-test.md) | Azure DevOps build and test pipelines |
| [ado-patterns.md](dotnet-devops/references/ado-patterns.md) | Azure DevOps pipeline patterns |
| [ado-publish.md](dotnet-devops/references/ado-publish.md) | Azure DevOps publishing pipelines |
| [ado-unique.md](dotnet-devops/references/ado-unique.md) | Azure DevOps exclusive features |
| [container-deployment.md](dotnet-devops/references/container-deployment.md) | Container deployment to Kubernetes |
| [containers.md](dotnet-devops/references/containers.md) | Docker containerization best practices |
| [gha-build-test.md](dotnet-devops/references/gha-build-test.md) | GitHub Actions build and test workflows |
| [gha-deploy.md](dotnet-devops/references/gha-deploy.md) | GitHub Actions deployment patterns |
| [gha-patterns.md](dotnet-devops/references/gha-patterns.md) | GitHub Actions workflow patterns |
| [gha-publish.md](dotnet-devops/references/gha-publish.md) | GitHub Actions publishing workflows |
| [git-workflow.md](dotnet-devops/references/git-workflow.md) | Git workflow and branch strategy |
| [github-docs.md](dotnet-devops/references/github-docs.md) | GitHub documentation patterns |
| [github-releases.md](dotnet-devops/references/github-releases.md) | GitHub Releases management |
| [msix.md](dotnet-devops/references/msix.md) | MSIX packaging for desktop apps |
| [nuget-authoring.md](dotnet-devops/references/nuget-authoring.md) | NuGet package authoring |
| [observability.md](dotnet-devops/references/observability.md) | OpenTelemetry observability patterns |
| [release-management.md](dotnet-devops/references/release-management.md) | Release lifecycle management |
| [structured-logging.md](dotnet-devops/references/structured-logging.md) | Structured logging pipeline design |

## Testing
| File | Topic |
|------|-------|
| [add-testing.md](dotnet-testing/references/add-testing.md) | Add test infrastructure scaffolding |
| [aot-wasm.md](dotnet-testing/references/aot-wasm.md) | AOT and WASM testing patterns |
| [aspire-testing.md](dotnet-testing/references/aspire-testing.md) | .NET Aspire integration testing |
| [bdd.md](dotnet-testing/references/bdd.md) | Behavior-driven development with Reqnroll |
| [benchmarkdotnet.md](dotnet-testing/references/benchmarkdotnet.md) | BenchmarkDotNet performance testing |
| [ci-benchmarking.md](dotnet-testing/references/ci-benchmarking.md) | CI benchmark regression detection |
| [integration-testing.md](dotnet-testing/references/integration-testing.md) | Integration testing patterns |
| [playwright.md](dotnet-testing/references/playwright.md) | Playwright browser automation testing |
| [slopwatch.md](dotnet-testing/references/slopwatch.md) | LLM anti-cheat quality gate |
| [snapshot-testing.md](dotnet-testing/references/snapshot-testing.md) | Snapshot testing with Verify |
| [test-quality.md](dotnet-testing/references/test-quality.md) | Test quality analysis and metrics |
| [testing-strategy.md](dotnet-testing/references/testing-strategy.md) | Test type decision framework |
| [ui-testing-core.md](dotnet-testing/references/ui-testing-core.md) | Core UI testing patterns |
| [xunit.md](dotnet-testing/references/xunit.md) | xUnit v3 testing framework features |

## Tooling
| File | Topic |
|------|-------|
| [add-analyzers.md](dotnet-tooling/references/add-analyzers.md) | Add and configure code analyzers |
| [aot-architecture.md](dotnet-tooling/references/aot-architecture.md) | AOT-first application design patterns |
| [artifacts-output.md](dotnet-tooling/references/artifacts-output.md) | Centralized artifacts output layout |
| [bootstrap-project.md](dotnet-tooling/references/bootstrap-project.md) | New .NET project bootstrapping |
| [build-analysis.md](dotnet-tooling/references/build-analysis.md) | MSBuild build output analysis |
| [build-optimization.md](dotnet-tooling/references/build-optimization.md) | Build performance optimization |
| [cli-architecture.md](dotnet-tooling/references/cli-architecture.md) | Layered CLI application architecture |
| [cli-distribution.md](dotnet-tooling/references/cli-distribution.md) | CLI distribution and packaging |
| [cli-release-pipeline.md](dotnet-tooling/references/cli-release-pipeline.md) | CLI tool release CI/CD pipeline |
| [csharp-lsp.md](dotnet-tooling/references/csharp-lsp.md) | C# LSP server configuration |
| [csproj-reading.md](dotnet-tooling/references/csproj-reading.md) | SDK-style csproj file reading |
| [documentation-strategy.md](dotnet-tooling/references/documentation-strategy.md) | Documentation tooling selection |
| [domain-analysis.md](dotnet-tooling/references/domain-analysis.md) | Domain-driven design analysis workflow |
| [dotnet-sdk-install.md](dotnet-tooling/references/dotnet-sdk-install.md) | .NET SDK installation and workloads |
| [gc-memory.md](dotnet-tooling/references/gc-memory.md) | GC and memory management |
| [ilspy-decompile.md](dotnet-tooling/references/ilspy-decompile.md) | ILSpy assembly decompilation |
| [mermaid-diagrams.md](dotnet-tooling/references/mermaid-diagrams.md) | Mermaid diagram reference for .NET |
| [modernize.md](dotnet-tooling/references/modernize.md) | Codebase modernization analysis |
| [msbuild-authoring.md](dotnet-tooling/references/msbuild-authoring.md) | MSBuild project system authoring |
| [msbuild-tasks.md](dotnet-tooling/references/msbuild-tasks.md) | Custom MSBuild task authoring |
| [multi-targeting.md](dotnet-tooling/references/multi-targeting.md) | Multi-targeting strategies and polyfills |
| [native-aot.md](dotnet-tooling/references/native-aot.md) | Native AOT compilation pipeline |
| [performance-patterns.md](dotnet-tooling/references/performance-patterns.md) | Performance-oriented architecture patterns |
| [profiling.md](dotnet-tooling/references/profiling.md) | Diagnostic tool profiling guidance |
| [project-analysis.md](dotnet-tooling/references/project-analysis.md) | Project file analysis |
| [project-structure.md](dotnet-tooling/references/project-structure.md) | Solution and project structure |
| [scaffold-project.md](dotnet-tooling/references/scaffold-project.md) | New project scaffolding |
| [solution-navigation.md](dotnet-tooling/references/solution-navigation.md) | Solution navigation and management |
| [spectre-console.md](dotnet-tooling/references/spectre-console.md) | Spectre.Console rich terminal output |
| [system-commandline.md](dotnet-tooling/references/system-commandline.md) | System.CommandLine CLI API |
| [terminal-gui.md](dotnet-tooling/references/terminal-gui.md) | Terminal.Gui TUI applications |
| [tool-management.md](dotnet-tooling/references/tool-management.md) | .NET CLI tool management |
| [trimming.md](dotnet-tooling/references/trimming.md) | Trim-safe development patterns |
| [version-detection.md](dotnet-tooling/references/version-detection.md) | SDK and framework version detection |
| [version-upgrade.md](dotnet-tooling/references/version-upgrade.md) | .NET version upgrade planning |
| [vscode-debug.md](dotnet-tooling/references/vscode-debug.md) | VS Code debug configuration |

## UI
| File | Topic |
|------|-------|
| [accessibility.md](dotnet-ui/references/accessibility.md) | Cross-platform accessibility patterns |
| [blazor-auth.md](dotnet-ui/references/blazor-auth.md) | Blazor authentication and authorization |
| [blazor-components.md](dotnet-ui/references/blazor-components.md) | Blazor component architecture |
| [blazor-patterns.md](dotnet-ui/references/blazor-patterns.md) | Blazor hosting models and patterns |
| [blazor-testing.md](dotnet-ui/references/blazor-testing.md) | bUnit Blazor component testing |
| [localization.md](dotnet-ui/references/localization.md) | .NET internationalization and localization |
| [maui-aot.md](dotnet-ui/references/maui-aot.md) | MAUI Native AOT compilation |
| [maui-development.md](dotnet-ui/references/maui-development.md) | MAUI cross-platform development |
| [maui-testing.md](dotnet-ui/references/maui-testing.md) | MAUI testing with Appium |
| [platform-bindings.md](dotnet-ui/references/platform-bindings.md) | Native platform binding patterns |
| [ui-chooser.md](dotnet-ui/references/ui-chooser.md) | UI framework selection decision tree |
| [uno-mcp.md](dotnet-ui/references/uno-mcp.md) | Uno Platform MCP integration |
| [uno-platform.md](dotnet-ui/references/uno-platform.md) | Uno Platform core development |
| [uno-targets.md](dotnet-ui/references/uno-targets.md) | Uno Platform per-target deployment |
| [uno-testing.md](dotnet-ui/references/uno-testing.md) | Uno Platform cross-platform testing |
| [winforms-basics.md](dotnet-ui/references/winforms-basics.md) | Modern WinForms on .NET 8+ |
| [winui-controls-styling.md](dotnet-ui/references/winui-controls-styling.md) | WinUI controls and styling |
| [winui.md](dotnet-ui/references/winui.md) | WinUI 3 development patterns |
| [wpf-migration.md](dotnet-ui/references/wpf-migration.md) | WPF migration guidance |
| [wpf-modern.md](dotnet-ui/references/wpf-modern.md) | Modern WPF on .NET 8+ |
