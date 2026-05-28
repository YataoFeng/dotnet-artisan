# dotnet-artisan

[![English](https://img.shields.io/badge/English-README-blue)](README.md) [![中文](https://img.shields.io/badge/中文-简体中文-red)](README.zh-CN.md)

**面向 AI 编码代理的 .NET 开发技能库。**
Claude Code · GitHub Copilot · VS Code · Cursor

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Skills](https://img.shields.io/badge/技能-14-5b9cf5)](skills/)
[![Agents](https://img.shields.io/badge/代理-17-8b5cf6)](agents/)
[![References](https://img.shields.io/badge/参考文件-160+-4ade80)](skills/)

---

## 为什么需要这个仓库

AI 编码代理在 .NET 开发中有两个致命缺陷：

1. **不知道 .NET 最新模式。** 训练数据是冻结的。它们推荐 Swashbuckle（已停维护）、MediatR（商业）、FluentValidation（不兼容 AOT）、仓储包装（反模式）。它们不知道 .NET 10 的 `AddValidation()`、`HybridCache`、`Microsoft.AspNetCore.OpenApi`。

2. **会话断开就丢失上下文。** 断开重连后，AI 完全不知道你构建了什么、做了什么决策、项目遵循什么模式。

**这个仓库解决这两个问题。** 它教会 AI 写正确的 .NET 代码，同时确保 AI 能在 30 秒内重新理解任何项目。

---

## 使用流程

以下是实际使用这个仓库时的行为：

### 示例 1："我需要一个订单管理系统"

```
你: "我需要一个订单管理系统"

AI（决策者介入）:
  "写代码前先了解——什么样的订单？采购订单？工单？还是网店顾客订单？"

你: "网店的顾客订单"

AI:
  "明白了。谁下单——外部顾客？内部员工？"
  "走一遍流程：一个订单从创建到完成经过哪些步骤？"
  "'订单状态'对你们来说什么意思——待确认/已确认/已发货/已送达？"

你: "顾客下单。状态：待确认→已确认→已发货→已送达"

AI（领域词汇表已捕获）:
  "清楚了。再来一轮：
   - .NET 10 还是 8？PostgreSQL 还是 SQL Server？
   - 生产环境还是原型？
   - 需要测试吗？"

你: ".NET 10，PostgreSQL，生产环境，需要测试"

AI（决策者路由）:
  → 加载 dotnet-api + dotnet-tooling + dotnet-csharp
  → 脚手架生成 OrderManagement.Api：EF Core + Minimal API + 认证
  → 配置 Testcontainers + PostgreSQL 集成测试
  → 每个文件遵循 30 秒法则（自文档化）
```

**行为链**：意图检测 → 3 轮提问 → 领域词汇表 → 架构选择 → 脚手架 → 测试配置 → 自文档化代码。

### 示例 2："我的应用在生产环境崩溃"

```
你: "我的应用一直在生产环境崩溃"

AI（决策者）:
  "有 .dmp 转储文件吗？没有的话能复现吗？"
  "崩溃表现是什么——OutOfMemoryException？StackOverflow？还是直接挂掉？"

你: "OutOfMemoryException，我有转储文件 C:\dumps\crash.dmp"

AI（决策者路由）:
  → 加载 dotnet-debugging
  → WinDbg 打开 crash.dmp
  → !analyze -v → "CLR 异常: OutOfMemoryException"
  → !dumpheap -stat → "90% 堆是 byte[]——850MB"
  → !gcroot 追踪最大 byte[] → "被 ImageCache 单例持有，从不清理"
  → 报告: "你的 ImageCache 把原始图片存在内存里，没有淘汰策略。
     修复方案：用 IMemoryCache + SizeLimit + SetSize 做 LRU 淘汰。"
```

**行为链**：意图检测 → 诊断 → WinDbg 命令 → 根因定位 → 修复建议。

### 示例 3："审查我的代码"

```
你: "审查这个 PR"

AI（决策者）:
  → 启动 dotnet-code-review-agent（独立子会话）
  → 分析：正确性 → 性能 → 安全 → 架构
  → 报告: "发现 3 个问题:
     1. [严重] Scoped DbContext 注入到 Singleton 缓存
     2. [性能] OrderList 端点存在 N+1 查询
     3. [安全] appsettings.json 里硬编码了 API 密钥"
```

**行为链**：意图检测 → 代码审查代理 → 多维度分析 → 分类报告。

---

## 技能分类

### 网关（最先运行）

| 技能 | 角色 |
|-------|------|
| `using-dotnet` | 意图检测器——"这是 .NET 吗？" |
| `dotnet-advisor` | **决策者。** 分析你的提示词 + 项目文件，检测 .NET 版本，路由到正确技能，意图不明确时反问澄清。 |

### 基线（始终加载）

| 技能 | 角色 |
|-------|------|
| `dotnet-csharp` | C# 语言标准。Async/await、DI、LINQ、并发、类型设计。所有代码路径都激活。 |

### 构建者（创建东西）

| 技能 | 构建 |
|-------|--------|
| `dotnet-api` | Web API、EF Core、gRPC、SignalR、认证、缓存、YARP |
| `dotnet-ui` | Blazor、MAUI、Uno、WPF、WinUI、WinForms |

### 验证者（检查 & 修复）

| 技能 | 验证 |
|-------|--------|
| `dotnet-testing` | xUnit v3、集成测试（Testcontainers）、E2E（Playwright）、基准测试 |
| `dotnet-debugging` | 崩溃转储（WinDbg）、死锁、内存泄漏、高 CPU |
| `dotnet-quality` | 7 步清理：格式化 → 未用 using → 警告 → 死代码 → TODO → sealed 审计 → CancellationToken |

### 运维者（交付 & 维护）

| 技能 | 运维 |
|-------|--------|
| `dotnet-devops` | CI/CD、Docker、NuGet 发布、OpenTelemetry |
| `dotnet-tooling` | MSBuild、Native AOT、CLI 工具、SDK 管理、性能分析 |
| `dotnet-upgrade` | .NET 版本迁移（8→9→10→11）、AOT 兼容、nullable 迁移 |

### 增强者（扩展 & 提升）

| 技能 | 增强 |
|-------|--------|
| `dotnet-ai` | MCP 服务、Semantic Kernel、RAG、ML.NET |
| `dotnet-workflow` | 并行工作树、上下文管理、验证循环 |
| `dotnet-learning` | 纠错捕获、模式泛化、记忆存储 |

---

## 专家代理分类

### 角色型代理

像人类专家一样工作。理解上下文，做出判断，解释推理。

| 代理 | 扮演角色 | 何时调用 |
|-------|---------|-------------|
| `dotnet-architect` | 软件架构师 | "怎么架构这个项目？" |
| `dotnet-code-review-agent` | 代码审查员 | "审查这个 PR" |
| `dotnet-security-reviewer` | 安全审计员 | "这个安全吗？"（只读） |
| `dotnet-testing-specialist` | 测试架构师 | "怎么测试这个？" |
| `dotnet-docs-generator` | 技术文档工程师 | "生成文档" |
| `dotnet-refactor-cleaner` | 清理专家 | "清理这段代码" |

### 工具型代理

执行特定技术深度分析。聚焦单一领域。

| 代理 | 分析对象 | 何时调用 |
|-------|----------|-------------|
| `dotnet-aspnetcore-specialist` | 中间件、DI、管道 | "我的中间件顺序对吗？" |
| `dotnet-async-performance-specialist` | Async/await 性能、ValueTask | "为什么异步代码这么慢？" |
| `dotnet-benchmark-designer` | BenchmarkDotNet、测量方法 | "设计一个基准测试" |
| `dotnet-blazor-specialist` | Blazor 渲染模式、组件 | "选哪个渲染模式？" |
| `dotnet-build-error-resolver` | MSBuild 错误、SDK 冲突 | 构建失败 |
| `dotnet-cloud-specialist` | Aspire、AKS、云部署 | "部署到云？" |
| `dotnet-csharp-concurrency-specialist` | 竞态条件、死锁 | "高并发下崩溃？" |
| `dotnet-maui-specialist` | MAUI、Xamarin 迁移 | "构建 MAUI 应用" |
| `dotnet-performance-analyst` | 火焰图、堆、GC | "找出瓶颈" |
| `dotnet-uno-specialist` | Uno Platform、MVUX | "跨平台 Uno 应用？" |

---

## 自文档化代码

每个生成的项目遵循 **30 秒法则**：新 AI 必须在 30 秒内理解项目。

| 规则 | 做 | 不做 |
|------|-----|-------|
| 解决方案在根目录 | `.slnx` 立即可见 | 藏在子目录里 |
| 项目名用领域术语 | `OrderManagement.Api` | `Core`、`Shared` |
| 文件顶部一句话 | `// 处理履约：验证支付、预留库存、创建发货单` | `// 订单处理` |
| 显式依赖 | 构造函数参数暴露所有依赖 | Service Locator |
| 只写 WHY 注释 | `// IServiceScopeFactory：BackgroundService 比 Scoped DbContext 活得长` | `// 保存订单` |
| 无通用名称 | — | `Helper`、`Manager`、`Utils`、`Common` |

**[→ 完整指南](SELF_DOCUMENTING.md)**

## 核心原则

1. **KISS 优先** — 简单 CRUD 不需要 DDD 或 CQRS。
2. **禁止仓储包装** — DbContext 就是工作单元；DbSet 就是仓储。
3. **禁止商业包** — 仅免费/开源。
4. **禁止 DateTime.Now** — 全项目 `TimeProvider`。
5. **自文档化代码** — 30 秒法则。[指南 →](SELF_DOCUMENTING.md)
6. **先问再做** — 领域词汇表优先。[指南 →](USAGE.md)

## 快速开始

```bash
claude plugins install YataoFeng/dotnet-artisan
```

## 指南

| 指南 | 主题 |
|-------|-------|
| [USAGE.md](USAGE.md) | 4 轮提问框架，领域驱动分析 |
| [SELF_DOCUMENTING.md](SELF_DOCUMENTING.md) | 30 秒法则，8 条 MUST，4 条 NEVER |
| [BEHAVIORS.md](BEHAVIORS.md) | 30+ 行为目录 + 路由逻辑 |
| [CLAUDE.md](CLAUDE.md) | 上下文重连——新会话第一份要读的 |
| [CHEATSHEET.md](skills/CHEATSHEET.md) | 一页全规则速查 |
| [DECISIONS.md](skills/DECISIONS.md) | "什么时候用什么" |

## 许可

MIT
