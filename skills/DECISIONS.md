# .NET 决策指南

融合自 dotnet-claude-kit。当 AI 在多个方案间选择时，此表提供最终裁决。做架构/框架/模式决策时加载。

## 数据访问

| 场景 | 推荐 |
|------|------|
| 标准增删改查 | DbContext + `.Select()` 投影 |
| 批量更新（100+ 行）| `ExecuteUpdateAsync` / `ExecuteDeleteAsync` |
| 热路径查询 | 编译查询 (`EF.CompileAsyncQuery`) |
| 横切持久化关注点 | 拦截器 |
| 读密集型报表 | Dapper 或 `FromSqlInterpolated` |
| 模式迁移 | EF Core 迁移（执行前审核 SQL）|
| 复杂领域模型 | EF Core + 每实体 `IEntityTypeConfiguration` |

## 架构

| 场景 | 推荐 |
|------|------|
| 功能丰富的 API（50+ 端点）| 垂直切片架构 |
| 复杂业务规则、多聚合约束 | 领域驱动设计 |
| 需要独立更换持久化/界面 | 整洁架构 |
| 简单 CRUD（5-10 端点）| 单项目 + 控制器 + DbContext |
| 模块化单体 | 功能文件夹 + 共享契约 |
| 微服务 | 每服务内部用垂直切片 + 异步消息 |

## API 设计

| 场景 | 推荐 |
|------|------|
| 新 HTTP API (.NET 10) | Minimal API + `IEndpointGroup` 自动发现 |
| 已有 MVC 项目 | 保留控制器，渐进迁移 |
| OpenAPI 文档 | `TypedResults` + `.WithName()` + Scalar UI |
| 请求验证 | 端点过滤器（DataAnnotations 或 .NET 10 内置）|
| 认证/授权 | 基于策略: `.RequireAuthorization("PolicyName")` |
| 速率限制 | `AddRateLimiter` + `.RequireRateLimiting()` |
| 响应缓存 | `AddOutputCache` + `.CacheOutput()` |
| API 版本化 | URL 路径 (`/api/v1/`) 或 Header (`Api-Version: 2.0`) |

## 缓存

| 场景 | 推荐 |
|------|------|
| 通用数据缓存 | HybridCache (`GetOrCreateAsync`) |
| 完整 HTTP 响应 | 输出缓存 |
| 旁路缓存（遗留）| `IDistributedCache` 仅用于集成旧代码 |
| 缓存击穿保护 | HybridCache 内置（无需手动锁）|
| 用户特定数据 | Key 包含用户 ID |
| 配置/设置 | `IOptionsMonitor<T>` + TTL |

## 错误处理

| 场景 | 推荐 |
|------|------|
| 预期业务失败 | Result 模式 |
| 输入验证 | 验证过滤器 + ProblemDetails |
| 意外崩溃 | 全局 `IExceptionHandler` → ProblemDetails |
| API 错误格式 | RFC 9457 ProblemDetails — 始终使用 |
| 外部服务失败 | 捕获特定异常，返回 Result.Failure |
| Handler 内验证 | 返回 `Result.Failure`，不抛异常 |

## DI 与生命周期

| 场景 | 推荐 |
|------|------|
| 无状态服务 | Scoped（默认）或 Transient |
| 配置 / 缓存 | Singleton |
| DbContext | Scoped（通过 `AddDbContext` 注册）|
| 多实现 | Keyed 服务（策略模式）|
| 横切行为 | 装饰器模式 |
| Singleton 需要 Scoped 依赖 | `IServiceScopeFactory` |

## 可观测性

| 场景 | 推荐 |
|------|------|
| 应用日志 | Serilog + 结构化日志 |
| 分布式追踪 | OpenTelemetry + OTLP 导出器 |
| 自定义业务指标 | `IMeterFactory` + 计数器/直方图 |
| 请求追踪 | Correlation ID 中间件 |
| 容器健康 | `/health/live` 和 `/health/ready` 端点 |
| 日志存储 | Seq（开发）、Grafana Loki/Elastic（生产）|
| 日志级别 | Debug（开发）、Information（预发）、Warning（生产）|

## 测试

| 场景 | 推荐 |
|------|------|
| 单元测试业务逻辑 | xUnit + 直接实例化 |
| 集成测试 | `WebApplicationFactory` + Testcontainers |
| E2E 浏览器测试 | Playwright |
| 性能基准 | BenchmarkDotNet |
| 快照测试 | Verify |
| 内存数据库 | 禁止用于集成测试 — 用 Testcontainers |
| 测试数据设置 | Builder 模式或 Class Fixture |
| 变异测试 | Stryker.NET 用于关键路径（夜间）|

## 托管与部署

| 场景 | 推荐 |
|------|------|
| 本地开发（多服务）| .NET Aspire AppHost |
| 本地开发（单服务）| `dotnet run` |
| 容器构建 | 多阶段 Dockerfile（SDK → 运行时）|
| 容器运行时用户 | 非 root（UID 1001）|
| 生产部署 | Docker / K8s / Azure Container Apps |
| CI 构建 | `dotnet publish` 一次，同 Artifact 多环境部署 |
| NuGet 包 | `dotnet pack` + GitHub Packages 或 NuGet.org |

## AI / MCP

| 场景 | 推荐 |
|------|------|
| 向 AI 暴露 .NET 工具 | MCP 服务器 (ModelContextProtocol) |
| 多步 AI 工作流 | Semantic Kernel |
| 简单 LLM 调用 | `HttpClient` + OpenAI SDK |
| 进程内 ML 推理 | ML.NET |
| 向量搜索 | Qdrant / Azure AI Search / pgvector |
| RAG 流水线 | Semantic Kernel + 向量数据库 |

## .NET 版本特性

| .NET 版本 | 关键新特性 |
|-----------|----------|
| net8.0 | Keyed DI、`TimeProvider`、`IExceptionHandler`、`[AsParameters]` |
| net9.0 | `HybridCache`、指纹识别、EF 自动编译模型、`field` 预览 |
| net10.0 | C# 14、原生 DataAnnotations 验证、`field` 稳定、`params` Span |
| net11.0 | C# 15 预览、增强 Native AOT、ASP.NET Core 性能提升 |
