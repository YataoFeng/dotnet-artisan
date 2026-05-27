---
name: dotnet-upgrade
description: >
  .NET 版本迁移与项目升级。涵盖 net8→net9→net10→net11 迁移路径、AOT 兼容性评估、
  nullable 引用迁移、从 .NET Framework 的 Thread.Abort 迁移及渐进式升级策略。
  升级 .NET 版本、从 .NET Framework 迁移或规划破坏性变更时加载。
  融合自 dotnet/skills dotnet-upgrade 插件。
---

# dotnet-upgrade

## Core Principles

1. **One version at a time** — Don't skip versions. net8→net10 directly risks missing deprecated API warnings that the intermediate version surfaces. net8→net9→net10 catches each deprecation wave.

2. **Upgrade tooling before framework** — Update SDK, analyzers, and NuGet packages first. Old tooling cannot validate new framework code.

3. **Assess before upgrading** — Run `dotnet/skills` dotnet-upgrade assessment tools to identify breaking changes before touching code.

4. **Incremental over big-bang** — Upgrade one project at a time, starting with leaf dependencies. Don't change 50 `.csproj` files in one commit.

## Migration Paths

### net8.0 → net9.0

```xml
<!-- .csproj change -->
<TargetFramework>net9.0</TargetFramework>
```

Key changes:
- `System.Text.Json` 9.0: new `JsonSerializerOptions.AllowOutOfOrderMetadataProperties`
- EF Core 9.0: auto-compiled models, improved LINQ translation
- ASP.NET Core 9.0: fingerprinting, improved static file handling
- API: `HybridCache` graduated from preview to stable

### net9.0 → net10.0

```xml
<TargetFramework>net10.0</TargetFramework>
```

Key changes:
- C# 14: `field` keyword, implicit span conversions, `params` collections
- ASP.NET Core 10: native validation with DataAnnotations (no FluentValidation needed)
- EF Core 10: improved bulk operations, compiled model enhancements
- Native AOT: expanded support for ASP.NET Core minimal APIs

### net10.0 → net11.0

```xml
<TargetFramework>net11.0</TargetFramework>
```

Key changes:
- New language features (C# 15 preview)
- Enhanced Native AOT coverage
- ASP.NET Core performance improvements

## Pre-Upgrade Checklist

1. **Audit NuGet packages** — `dotnet list package --outdated --vulnerable`
2. **Check global.json** — Remove or update SDK version pin
3. **Run upgrade assessment** — Use .NET Upgrade Assistant: `upgrade-assistant analyze`
4. **Review breaking changes** — Check [official breaking changes doc](https://learn.microsoft.com/dotnet/core/compatibility/)
5. **Update CI/CD** — Ensure build agents use the new SDK version

## AOT Compatibility

Before migrating to Native AOT, check compatibility:
- No `Assembly.Load` or reflection emit
- No `dynamic` types expanded at runtime
- Source-generated JSON serialization (not reflection-based)
- Source-generated mediators (not runtime DI scanning)
- All NuGet packages must be AOT-compatible

Use `dotnet publish -p:PublishAot=true` to build and verify AOT compilation.

## Nullable Reference Migration

```xml
<!-- Enable incrementally -->
<Nullable>enable</Nullable>
<WarningsAsErrors>nullable</WarningsAsErrors>
```

Strategy: enable per-project, starting from leaf dependencies, fixing warnings before moving to the next project.

## Anti-patterns

- **Big-bang migration** — All projects at once = giant PR, hard to revert, impossible to bisect
- **Skipping versions** — net8→net10 bypasses net9 deprecation warnings
- **Upgrading without running tests** — Migration + no test suite = undetected breaking changes
- **Mixing migration with feature work** — Separate PRs; pure migration only
