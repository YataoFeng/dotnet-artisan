# 包选择 — 免费 & 微软推荐

优先使用免费/开源和微软推荐的包。避免商业、停止维护或依赖反射的替代品。

## 替代指南

| 避免 | 使用 | 原因 |
|------|------|------|
| **MediatR**（商业） | 直接 Handler 调用 或 Mediator (MIT 源生成) | 免费，AOT 兼容，零运行时反射 |
| **FluentValidation**（.NET 10+ 废弃） | `AddValidation()` + DataAnnotations | 内置，源生成，AOT 兼容 |
| **AutoMapper**（商业） | 手动映射 或 Mapperly (MIT 源生成) | 更快，编译时，无运行时魔法 |
| **Newtonsoft.Json**（遗留） | `System.Text.Json` + 源生成器 | 内置，AOT 兼容，更快 |
| **Swashbuckle**（停止维护） | `Microsoft.AspNetCore.OpenApi` | 微软官方，OpenAPI 3.1，Native AOT |
| **SwaggerUI** | Scalar API Reference | 现代，轻量，MIT |
| **BinaryFormatter**（已删除） | `System.Text.Json` 或 Protobuf | 安全，跨平台 |
| **log4net**（遗留） | `Microsoft.Extensions.Logging` + Serilog | 结构化日志，内置 DI |
| **NLog**（迁移中） | Serilog (Apache 2.0) | 更好的结构化日志，更广的生态 |
| **IdentityServer4**（EOL） | Duende（社区版免费）或 Keycloak (Apache 2.0) | 维护中，安全 |
| **MongoDB.Driver** (SSPL) | PostgreSQL + EF Core 或 Marten (MIT) | 真正开源，无协议顾虑 |

## 始终优先的技术栈（全免费/开源）

| 层 | 推荐 |
|----|------|
| API 框架 | ASP.NET Core Minimal APIs |
| ORM | EF Core |
| 验证 | `AddValidation()` + DataAnnotations |
| 映射 | 手动 或 Mapperly 源生成 |
| 序列化 | `System.Text.Json` 源生成 |
| 缓存 | `HybridCache` |
| 弹性 | Polly v8 + `Microsoft.Extensions.Http.Resilience` |
| 消息 | Wolverine (MIT) 或原生 Azure Service Bus SDK |
| 日志 | Serilog (Apache 2.0) |
| 可观测性 | OpenTelemetry |
| 测试 | xUnit v3 + Testcontainers |
| 容器构建 | 多阶段 Dockerfile + Chiseled 镜像 |
| CI/CD | GitHub Actions |
| API 文档 | `Microsoft.AspNetCore.OpenApi` + Scalar |
| 认证 | ASP.NET Core Identity + JWT Bearer |
| 健康检查 | `Microsoft.Extensions.Diagnostics.HealthChecks` |

## AOT 兼容性注意事项

使用运行时反射的包不支持 AOT。优先使用源生成替代品：

| 运行时反射 | 源生成（AOT 安全） |
|-----------|------------------|
| Newtonsoft.Json | System.Text.Json + `[JsonSerializable]` |
| AutoMapper | Mapperly |
| MediatR | Mediator (MIT) |
| FluentValidation | `AddValidation()` + `[ValidatableType]` |
| 动态 DI 扫描 | 显式 `AddScoped<T>()` 注册 |
