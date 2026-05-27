# .NET 速查表 — AI 代理一页全览

写任何 .NET 代码时加载此文件。每条规则一行。

## 铁律

- 直接用 DbContext，禁止 IRepository/IUnitOfWork 包装
- TimeProvider，禁止 DateTime.Now
- AddValidation() + DataAnnotations，禁止 FluentValidation
- 仅免费/开源：Mediator(MIT) 不 MediatR，Mapperly 不 AutoMapper
- Microsoft.AspNetCore.OpenApi，禁止 Swashbuckle
- System.Text.Json 源生成，禁止 Newtonsoft
- IHttpClientFactory，禁止 new HttpClient()

## 架构

- 简单 CRUD: 单项目 + DbContext
- 50+ 端点: 按功能垂直切片
- 复杂领域: DDD + 聚合根
- 多服务: 每个服务内部用 VSA

## EF Core

- 读用 .Include().AsNoTracking()
- 用 .Select() 投影到 DTO，禁止返回实体
- 批量操作用 ExecuteUpdateAsync/ExecuteDeleteAsync
- 集成测试用 Testcontainers，禁止 InMemory
- 迁移 SQL 必须先审核再执行

## 依赖注入

- Singleton 禁止依赖 Scoped
- Singleton 需 Scoped 用 IServiceScopeFactory
- AddDbContext<T>() — 默认 Scoped
- BackgroundService/Blazor 用 AddDbContextFactory<T>()

## Minimal API

- 用 IEndpointGroup 自动发现，不堆在 Program.cs
- TypedResults，禁止 IResult
- 返回 DTO，禁止返回实体

## HTTP

- IHttpClientFactory + 类型化客户端
- 每个客户端一行 AddStandardResilienceHandler()
- 每个调用传 CancellationToken

## 异步

- async/await 一路到底，禁止 .Result/.Wait()
- CancellationToken 端到端传播
- async void 仅限 UI 事件处理

## 安全

- 参数化查询，禁止字符串拼接
- 基于策略授权，不用角色字符串
- 密钥放 user-secrets/KeyVault，禁止放 appsettings.json
- JWT 验证全开: Issuer+Audience+Lifetime+SigningKey

## 测试

- 测行为不测实现细节
- 集成测试用 Testcontainers，禁止 InMemory
- 断言具体结果，不写 "没抛异常就算过"
- 每个测试独立状态，禁止 static 共享

## 构建

- dotnet build -m（并行，默认串行）
- CI 中 dotnet format --verify-no-changes
- 多阶段 Docker: SDK→编译，runtime→运行
- 容器内非 root 用户

## 包对照

| 禁止 | 使用 |
|------|------|
| MediatR | Mediator (MIT) |
| FluentValidation | AddValidation() |
| AutoMapper | Mapperly |
| Newtonsoft.Json | System.Text.Json |
| Swashbuckle | Microsoft.AspNetCore.OpenApi |
| BinaryFormatter | STJ/Protobuf |
| log4net/NLog | Serilog |
