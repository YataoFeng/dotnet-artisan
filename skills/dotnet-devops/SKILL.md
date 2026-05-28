---
name: dotnet-devops
description: Configures .NET CI/CD pipelines (GitHub Actions with setup-dotnet, NuGet cache, reusable workflows; Azure DevOps with DotNetCoreCLI, templates, multi-stage), Git workflow (branch strategies, Conventional Commits, PR lifecycle), containerization (multi-stage Dockerfiles, Compose, rootless), packaging (NuGet authoring, source generators, MSIX signing), release management (NBGV, SemVer, changelogs, GitHub Releases), observability (OpenTelemetry, health checks, structured logging, PII), and .NET version migration (net8→net9→net10→net11, AOT assessment, nullable migration, upgrade strategies). Spans 19 + 5 topic areas. Do not use for application-layer API or UI implementation patterns.
license: MIT
user-invocable: false
---

# dotnet-devops

## Overview

CI/CD, packaging, Git workflow, release management, and operational tooling for .NET. This consolidated skill spans 19 topic areas. Load the appropriate companion file from `references/` based on the routing table below.

## Routing Table

| Topic | Keywords | Description | Companion File |
|-------|----------|-------------|----------------|
| GHA build/test | setup-dotnet, NuGet cache, reporting | GitHub Actions .NET build/test (setup-dotnet, NuGet cache, reporting) | references/gha-build-test.md |
| GHA deploy | Azure Web Apps, GitHub Pages, containers | GitHub Actions deployment (Azure Web Apps, GitHub Pages, containers) | references/gha-deploy.md |
| GHA publish | NuGet push, container images, signing, SBOM | GitHub Actions publishing (NuGet push, container images, signing, SBOM) | references/gha-publish.md |
| GHA patterns | reusable workflows, composite, matrix, cache | GitHub Actions composition (reusable workflows, composite, matrix, cache) | references/gha-patterns.md |
| ADO build/test | DotNetCoreCLI, Artifacts, test results | Azure DevOps .NET build/test (DotNetCoreCLI, Artifacts, test results) | references/ado-build-test.md |
| ADO publish | NuGet push, containers to ACR | Azure DevOps publishing (NuGet push, containers to ACR) | references/ado-publish.md |
| ADO patterns | templates, variable groups, multi-stage | Azure DevOps composition (templates, variable groups, multi-stage) | references/ado-patterns.md |
| ADO unique | environments, approvals, service connections | Azure DevOps exclusive features (environments, approvals, service connections) | references/ado-unique.md |
| Containers | multi-stage Dockerfiles, SDK publish, rootless | .NET containerization (multi-stage Dockerfiles, SDK publish, rootless) | references/containers.md |
| Container deployment | Compose, health probes, CI/CD pipelines | Container deployment (Compose, health probes, CI/CD pipelines) | references/container-deployment.md |
| NuGet authoring | SDK-style, source generators, multi-TFM | NuGet package authoring (SDK-style, source generators, multi-TFM) | references/nuget-authoring.md |
| MSIX | creation, signing, Store, sideload, auto-update | MSIX packaging (creation, signing, Store, sideload, auto-update) | references/msix.md |
| GitHub Releases | creation, assets, notes, pre-release | GitHub Releases (creation, assets, notes, pre-release) | references/github-releases.md |
| Git workflow | branch, PR, Conventional Commits, merge strategy | Branch strategies, Conventional Commits, PR lifecycle, merge/squash/rebase, tag-based release | references/git-workflow.md |
| Release management | NBGV, SemVer, changelogs, branching | Release lifecycle (NBGV, SemVer, changelogs, branching) | references/release-management.md |
| Observability | OpenTelemetry, health checks, custom metrics | Observability (OpenTelemetry, health checks, custom metrics) | references/observability.md |
| Structured logging | aggregation, sampling, PII, correlation | Log pipelines (aggregation, sampling, PII, correlation) | references/structured-logging.md |
| Add CI | CI/CD scaffold, GHA vs ADO detection | CI/CD scaffolding (GHA vs ADO detection, workflow templates) | references/add-ci.md |
| GitHub docs | README badges, CONTRIBUTING, templates | GitHub documentation (README badges, CONTRIBUTING, templates) | references/github-docs.md |

## Scope

- Git workflow and branch strategies (GitHub Flow, Trunk-Based, GitFlow)
- Conventional Commits, PR lifecycle, automated review
- GitHub Actions workflows (build, test, deploy, publish)
- Azure DevOps pipelines (build, test, publish, environments)
- Container builds and deployment (Docker, Compose)
- NuGet and MSIX packaging
- Release management (NBGV, SemVer, changelogs)
- Observability and structured logging (OpenTelemetry)
- GitHub repository documentation and CI scaffolding

## Out of scope

- API/backend code patterns -> [skill:dotnet-api]
- Build system authoring -> [skill:dotnet-tooling]
- Test authoring -> [skill:dotnet-testing]

## Version Upgrade

.NET version migration and project upgrade. Covers net8→net9→net10→net11 migration paths, AOT compatibility assessment, nullable reference migration, and thread-abort migration from .NET Framework.

### Principles

1. **One version at a time** — Don't skip versions. net8→net10 directly risks missing deprecated API warnings.
2. **Upgrade tooling before framework** — Update SDK, analyzers, and NuGet packages first.
3. **Assess before upgrading** — Run upgrade assessment tools to identify breaking changes before touching code.
4. **Incremental over big-bang** — Upgrade one project at a time, starting with leaf dependencies.

### Migration Paths

| From | To | Key Changes |
|------|-----|-------------|
| net8.0 | net9.0 | STJ 9.0, EF Core 9.0 auto-compiled models, HybridCache stable |
| net9.0 | net10.0 | C# 14 `field` keyword, AddValidation, EF Core 10 bulk ops |
| net10.0 | net11.0 | C# 15 preview, enhanced AOT, ASP.NET Core perf improvements |

### Pre-Upgrade Checklist

1. Audit NuGet packages — `dotnet list package --outdated --vulnerable`
2. Check global.json — Remove or update SDK version pin
3. Run upgrade assessment — Use .NET Upgrade Assistant
4. Review breaking changes — Check official breaking changes doc
5. Update CI/CD — Ensure build agents use the new SDK version

### AOT Compatibility

Before migrating to Native AOT: no `Assembly.Load` or reflection emit, no `dynamic` expanded at runtime, source-generated JSON serialization, AOT-compatible packages.

### Nullable Reference Migration

Enable incrementally: `<Nullable>enable</Nullable>` + `<WarningsAsErrors>nullable</WarningsAsErrors>`. Fix per-project from leaf dependencies.

### Anti-patterns

- **Big-bang migration** — All projects at once = giant PR, impossible to revert
- **Skipping versions** — Bypasses deprecation warnings
- **Upgrading without running tests** — Undetected breaking changes
- **Mixing migration with feature work** — Separate PRs
