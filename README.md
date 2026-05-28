# dotnet-artisan

[![English](https://img.shields.io/badge/English-README-blue)](README.en.md)

**让你的 AI 编码代理真正擅长 .NET。** 装完即用，零配置。

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Skills](https://img.shields.io/badge/技能-14-5b9cf5)](skills/)
[![Agents](https://img.shields.io/badge/代理-17-8b5cf6)](agents/)
[![References](https://img.shields.io/badge/参考文件-168-4ade80)](skills/)

---

## 30 秒上手

装完插件后，打开你的 .NET 项目，直接说需求：

```
你：帮我在这个项目里加一个订单管理模块

AI：写代码之前，先了解几个问题——
    订单类型？顾客下单还是内部工单？流程是什么？状态有哪些？
    （这是决策者在问——分析需求后才动手）

你：顾客下单。状态：待确认→已确认→已发货。

AI：明白了。目前项目是 .NET 10 + PostgreSQL 对吧？
    我先捕获领域词汇表，然后搭建这个模块。

（AI 开始工作——选架构、搭结构、写代码、加测试）
```

**你只需要正常说话。** 决策者会自动分析你的项目、问清需求、选对架构、写出正确代码。不用记技能名，不用理解路由，什么都不用学。

试试第一句话：

> "帮我看看这个项目的架构有没有问题"
> "这个代码安全吗？帮我审查"
> "我的应用在生产环境崩了，这是转储文件"
> "我想从 .NET 8 升级到 .NET 10"

---

## 为什么需要？

AI 编码代理在 .NET 开发中有两个致命缺陷：

| 问题 | 没装这个插件 | 装了这个插件 |
|------|------------|------------|
| 推荐过时/商业包 | Swashbuckle（停维护）、FluentValidation（不兼容 AOT）、MediatR（商业） | `Microsoft.AspNetCore.OpenApi`、`AddValidation()`、直接 Handler——全内置、免费、AOT 安全 |
| 写反模式 | 给 DbContext 包一层 IRepository/IUnitOfWork | 直接注入 DbContext。EF Core 本身就是仓储 |
| 知识冻结 | 不知道 .NET 10 的 `HybridCache`、文件级应用、`field` 关键字 | 自动识别 .NET 8 到 11，每个版本用什么特性都清楚 |
| 上来就写代码 | "帮我做个订单系统" → 直接脚手架，建了一堆错的东西 | 先完成 7 项检查清单，捕捉领域词汇表，选对架构，再动手 |
| 断开就失忆 | 重连后 AI 完全不认识你的项目 | 30 秒读懂项目——每个文件都是自文档化的 |
| 调试靠猜 | "应用崩了" → 泛泛的建议 | 打开 .dmp 在 WinDbg 里 `!analyze -v`，一路追踪到具体哪行 |

## 能做什么？

### 构建新项目

"帮我做一个顾客订单的 Web API"
→ AI 提问澄清（订单类型？流程？.NET 版本？数据库？）
→ 选架构（单项目/VSA/DDD/Clean）→ 搭脚手架
→ EF Core + Minimal API + 认证 + OpenAPI + Scalar
→ 集成测试（Testcontainers + 真实 PostgreSQL）
→ 每个文件自文档化

Blazor 管理后台、CLI 工具、gRPC 服务、AI 功能（MCP/Semantic Kernel/RAG）——同样的流程。

### 修复故障

"生产环境 OutOfMemoryException" → 加载调试专家 → WinDbg `!dumpheap -stat` → 发现 850MB byte[] 被 ImageCache 单例持有 → 报告根因 + 修复方案

死锁检测（!dlk, !syncblk）、构建失败诊断、竞态条件分析——都覆盖。

### 审查和提升

"审查这个 PR" → 多维度分析（正确性/性能/安全/架构）→ 分类报告 + 修复建议
"这个安全吗？" → OWASP 审计（只读，不改代码）
"清理代码" → 7 步流水线：格式化 → 警告 → 死代码 → CancellationToken
"怎么架构？" → 架构专家根据复杂度推荐模式

### 测试

单元测试（xUnit v3）· 集成测试（Testcontainers）· E2E（Playwright）· BDD（Reqnroll + xUnit Given/When/Then）· 性能基准（BenchmarkDotNet）

### 交付

Git 工作流（分支策略 + Conventional Commits）· CI/CD 管道 · Docker 容器 · 云部署（Aspire/AKS）· NuGet 发布 · PR 完整生命周期（创建→审查→合并→发布）

### 升级

.NET 版本迁移（8→9→10→11）· Native AOT 转换 · 从纠错中学习 · 并行工作流优化

---

## 谁在干活？

安装插件后，两个网关自动激活：

```
你说 .NET 相关的事
  → using-dotnet（意图检测："是 .NET 吗？"）
  → dotnet-advisor（决策者：读你的项目文件，检测 .NET 版本，分析意图，路由到正确技能，不确定时反问）
  → 领域技能 + dotnet-csharp（基线，始终加载）+ 可选专家代理
```

### 技能（14 个）

#### 网关 — 最先运行

| 技能 | 做什么 |
|------|--------|
| `using-dotnet` | 意图检测。判断这是不是 .NET 请求。是 → 交给决策者 |
| `dotnet-advisor` | **决策者。** 读你的 .csproj/global.json，检测 .NET 版本，分析意图，路由到正确专家。模糊时反问澄清 |

#### 基线 — 始终加载

| 技能 | 做什么 |
|------|--------|
| `dotnet-csharp` | C# 语言标准：async/await、DI、LINQ、并发、类型设计。25 个参考文件。所有代码路径都激活 |

#### 构建者 — 创建东西

| 技能 | 构建什么 | 参考文件 |
|------|---------|---------|
| `dotnet-api` | Web API、EF Core、gRPC、SignalR、认证、缓存、YARP | 32 |
| `dotnet-ui` | Blazor、MAUI、Uno Platform、WPF、WinUI 3、WinForms | 20 |

#### 验证者 — 检查和修复

| 技能 | 检查什么 | 参考文件 |
|------|---------|---------|
| `dotnet-testing` | xUnit v3、Testcontainers、Playwright E2E、BDD、BenchmarkDotNet | 14 |
| `dotnet-debugging` | WinDbg 崩溃转储、死锁、内存泄漏、高 CPU | 17 |
| `dotnet-quality` | 7 步清理流水线：格式化 → 警告 → 死代码 → CancellationToken | — |

#### 运维者 — 交付和维护

| 技能 | 运维什么 | 参考文件 |
|------|---------|---------|
| `dotnet-devops` | CI/CD、Git 工作流、Docker、NuGet、OpenTelemetry | 19 |
| `dotnet-tooling` | 项目启动器（架构选择→结构映射→脚手架）、MSBuild、Native AOT、CLI、SDK、领域分析 | 36 |
| `dotnet-upgrade` | .NET 版本迁移（8→9→10→11）、AOT 兼容、nullable 迁移 | — |

#### 增强者 — 扩展和提升

| 技能 | 增强什么 | 参考文件 |
|------|---------|---------|
| `dotnet-ai` | MCP 服务、Semantic Kernel、RAG、ML.NET | — |
| `dotnet-workflow` | 并行工作树、上下文管理、Claude Code 优化 | — |
| `dotnet-learning` | 纠错捕获、模式泛化、记忆存储 | — |

### 代理（17 个）

#### 角色型代理 — 像人类专家一样判断

| 代理 | 扮演角色 | 调用技能 | 什么时候叫 |
|------|---------|---------|------------|
| `dotnet-architect` | 软件架构师 | dotnet-advisor, dotnet-csharp, **dotnet-tooling** | "这个项目怎么架构？" |
| `dotnet-code-review-agent` | 代码审查员 | **dotnet-csharp, dotnet-api, dotnet-ui**, dotnet-security-reviewer, dotnet-async-performance-specialist, dotnet-csharp-concurrency-specialist, dotnet-performance-analyst, dotnet-benchmark-designer, dotnet-blazor-specialist, dotnet-cloud-specialist, dotnet-testing-specialist | "审查这个 PR" |
| `dotnet-security-reviewer` | 安全审计员 | dotnet-advisor, **dotnet-api** | "这个代码安全吗？"（只读） |
| `dotnet-testing-specialist` | 测试架构师 | **dotnet-testing, dotnet-ui**, dotnet-benchmark-designer, dotnet-blazor-specialist, dotnet-maui-specialist, dotnet-uno-specialist, dotnet-security-reviewer | "怎么测试这个？" |
| `dotnet-docs-generator` | 技术文档工程师 | **dotnet-tooling, dotnet-api, dotnet-csharp, dotnet-devops** | "生成文档" |
| `dotnet-refactor-cleaner` | 清理专家 | —（独立运行 7 步清理流水线） | "清理这段代码" |

#### 工具型代理 — 特定领域深度分析

| 代理 | 分析对象 | 调用技能 | 什么时候叫 |
|------|---------|---------|------------|
| `dotnet-aspnetcore-specialist` | 中间件、DI、请求管道 | **dotnet-api, dotnet-csharp**, dotnet-async-performance-specialist, dotnet-blazor-specialist, dotnet-security-reviewer | "中间件顺序对吗？" |
| `dotnet-async-performance-specialist` | Async/await 性能、ValueTask、ThreadPool | **dotnet-csharp, dotnet-tooling**, dotnet-performance-analyst, dotnet-benchmark-designer, dotnet-csharp-concurrency-specialist | "为什么异步代码这么慢？" |
| `dotnet-benchmark-designer` | BenchmarkDotNet、测量方法 | **dotnet-testing, dotnet-tooling**, dotnet-performance-analyst | "设计一个基准测试" |
| `dotnet-blazor-specialist` | Blazor 渲染模式、组件 | **dotnet-ui, dotnet-api, dotnet-tooling, dotnet-testing** | "选哪个渲染模式？" |
| `dotnet-build-error-resolver` | MSBuild 错误、NuGet 冲突、SDK 版本 | —（直接 Read/Grep/Bash） | 构建失败 |
| `dotnet-cloud-specialist` | Aspire、AKS、云部署 | **dotnet-devops, dotnet-api**, dotnet-architect, dotnet-security-reviewer, dotnet-performance-analyst | "部署到云？" |
| `dotnet-csharp-concurrency-specialist` | 竞态条件、死锁、线程安全 | **dotnet-csharp** | "高并发下出问题" |
| `dotnet-maui-specialist` | MAUI、Xamarin 迁移 | **dotnet-ui, dotnet-tooling** | "做手机应用" |
| `dotnet-performance-analyst` | 火焰图、堆转储、GC | **dotnet-tooling, dotnet-testing, dotnet-devops**, dotnet-benchmark-designer | "找出性能瓶颈" |
| `dotnet-uno-specialist` | Uno Platform、MVUX | **dotnet-ui, dotnet-csharp, dotnet-tooling, dotnet-testing** | "跨平台桌面应用？" |

#### 工作流代理 — 管理开发流程

| 代理 | 管理什么 | 什么时候叫 |
|------|---------|------------|
| `dotnet-pr-workflow` | PR 完整生命周期：分析 diff → Conventional Commit 标题 → PR 正文 → CI 验证 → 自动审查 → squash-merge → 版本号 + changelog + tag | "创建 PR"、"合并"、"发布" |

---

## 自文档化代码（30 秒法则）

每个生成的项目遵循一条铁律：**新 AI 会话必须在 30 秒内理解它。**

| 规则 | 做 | 不做 |
|------|-----|------|
| 解决方案在根目录 | `OrderManagement.slnx` 一眼看到 | 藏在 `/src/` 里 |
| 项目名 = 领域名 | `OrderManagement.Api` | `Core`、`Shared`、`Services` |
| 文件顶部一句话 | `// 处理履约：验证支付、预留库存、创建发货单` | `// 订单处理` |
| 显式依赖 | `构造函数(AppDbContext, IHybridCache, TimeProvider)` | `IServiceProvider.GetService<T>()` |
| 只写 WHY 注释 | `// IServiceScopeFactory：BackgroundService 活得比 Scoped 长` | `// 保存订单` |
| 禁止通用名称 | — | `Helper`、`Manager`、`Utils`、`Common` |

**[→ 完整指南](SELF_DOCUMENTING.md)**

---

## 怎么装

```bash
claude plugins install fenzel/dotnet-artisan
```

兼容 GitHub Copilot、VS Code、Cursor。遵循 [agentskills.io](https://agentskills.io) 标准。

装完即用。打开 .NET 项目 → Harness 自动检测 → 技能加载 → 决策者激活。零配置。**[→ Harness 原理](harness/README.md)**

---

## 核心原则

1. **先问再做** — 写代码前必须完成 7 项检查清单。任何一项是"我不确定"→ 继续问。[USAGE.md →](USAGE.md)
2. **KISS 优先** — 简单 CRUD 不需要 DDD 或 CQRS。按问题规模选模式。
3. **禁止仓储包装** — DbContext 就是工作单元；DbSet 就是仓储。直接注入。
4. **禁止 DateTime.Now** — 全项目 `TimeProvider`。可注入、可测试。
5. **禁止商业包** — 仅免费/开源。MediatR→Mediator(MIT)、AutoMapper→Mapperly。
6. **自文档化代码** — 30 秒法则。[SELF_DOCUMENTING.md →](SELF_DOCUMENTING.md)

---

## 指南

| 指南 | 内容 |
|------|------|
| [USAGE.md](USAGE.md) | 7 项检查清单 + 4 轮提问框架 + 领域驱动分析 |
| [SELF_DOCUMENTING.md](SELF_DOCUMENTING.md) | 30 秒法则、8 条 MUST、4 条 NEVER |
| [BEHAVIORS.md](BEHAVIORS.md) | 30+ 行为目录 + 决策者路由逻辑 |
| [CLAUDE.md](CLAUDE.md) | 上下文重连——新 AI 会话读的第一份文件 |
| [CHEATSHEET.md](skills/CHEATSHEET.md) | 一页全规则速查 |
| [DECISIONS.md](skills/DECISIONS.md) | "什么时候用什么" 决策指南 |

---

## 许可

MIT
