# dotnet-artisan

[![English](https://img.shields.io/badge/English-README-blue)](README.en.md)

**让你的 AI 编码代理真正擅长 .NET。** 装完即用，零配置。

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Skills](https://img.shields.io/badge/技能-14-5b9cf5)](skills/)
[![Agents](https://img.shields.io/badge/代理-17-8b5cf6)](agents/)

---

## 30 秒上手

装完插件，打开 .NET 项目，正常说话：

```
你：帮我在这个项目里加一个订单管理模块

AI：写代码之前，先了解几个问题——
    订单类型？顾客下单还是内部工单？流程？状态？
    （决策者在分析需求，问清楚才动手）

你：顾客下单。状态：待确认→已确认→已发货。

AI：明白了。.NET 10 + PostgreSQL。我先捕获领域词汇表，再搭建模块。
```

**你不需要记任何技能名。** 决策者会自动分析项目、问清需求、选对架构。试试这些话：

> "帮我看看这个项目的架构有没有问题"
> "审查这段代码的安全性"
> "我的应用在生产环境崩了，这是转储文件"
> "从 .NET 8 升级到 .NET 10"

---

## 怎么装

```bash
claude plugins marketplace add fenzel999/dotnet-artisan
claude plugins install dotnet-artisan
```

兼容 GitHub Copilot、VS Code、Cursor。装完打开 .NET 项目即用，Harness 自动激活。零配置。

---

## 能做什么

| 场景 | 你说 | AI 做什么 |
|------|------|----------|
| 构建 | "做一个订单管理的 Web API" | 提问澄清 → 选架构 → 搭脚手架 → EF Core + Minimal API + 认证 → 集成测试 |
| 调试 | "生产环境 OutOfMemoryException" | 加载调试专家 → WinDbg `!dumpheap -stat` → 找到 850MB 被 ImageCache 持有 → 报告根因 |
| 审查 | "审查这个 PR" | 多维度分析（正确性/性能/安全/架构）→ 分类报告 + 修复建议 |
| 测试 | "给这个模块写测试" | xUnit v3 · Testcontainers · Playwright E2E · BDD · BenchmarkDotNet |
| 交付 | "配 CI/CD"、"容器化"、"发布" | GitHub Actions · Docker · Aspire/AKS · NuGet · PR 管理 |
| 升级 | "升级到 .NET 10" | 逐版本迁移（8→9→10）· Native AOT · 破坏性变更评估 |

---

## 谁在干活

插件激活后，两个网关先运行：`using-dotnet` 检测意图，`dotnet-advisor`（决策者）分析项目、问清需求、分派任务。

### 技能

| 分类 | 技能 | 做什么 |
|------|------|--------|
| 网关 | `using-dotnet` `dotnet-advisor` | 意图检测 + 决策路由 |
| 基线 | `dotnet-csharp` | C# 标准：async/await、DI、LINQ（始终激活） |
| 构建 | `dotnet-api` `dotnet-ui` | Web API / EF Core / Blazor / MAUI / WPF |
| 验证 | `dotnet-testing` `dotnet-debugging` `dotnet-quality` | 测试 / WinDbg 诊断 / 7 步清理 |
| 运维 | `dotnet-devops` `dotnet-tooling` `dotnet-upgrade` | CI/CD / 项目启动器 / 版本迁移 |
| 增强 | `dotnet-ai` `dotnet-workflow` `dotnet-learning` | MCP·RAG / 并行工作 / 模式学习 |

### 代理

| 分类 | 代理 | 叫它的时候 |
|------|------|-----------|
| 角色 | `architect` | "这个项目怎么架构？" |
| 角色 | `code-review-agent` | "审查这个 PR" |
| 角色 | `security-reviewer` | "这个代码安全吗？" |
| 角色 | `testing-specialist` | "怎么测试这个？" |
| 角色 | `docs-generator` | "生成文档" |
| 角色 | `refactor-cleaner` | "清理这段代码" |
| 工具 | `aspnetcore-specialist` | "中间件顺序对吗？" |
| 工具 | `async-performance-specialist` | "异步代码为什么慢？" |
| 工具 | `benchmark-designer` | "设计基准测试" |
| 工具 | `blazor-specialist` | "选哪个渲染模式？" |
| 工具 | `build-error-resolver` | 构建失败 |
| 工具 | `cloud-specialist` | "部署到云？" |
| 工具 | `concurrency-specialist` | "高并发下出问题" |
| 工具 | `maui-specialist` | "做手机应用" |
| 工具 | `performance-analyst` | "找出性能瓶颈" |
| 工具 | `uno-specialist` | "跨平台桌面应用？" |
| 流程 | `pr-workflow` | "创建 PR"、"发布" |

> 代理名省略了 `dotnet-` 前缀。完整列表见 [BEHAVIORS.md](BEHAVIORS.md)。

---

## 30 秒法则

每个生成的项目必须让新 AI 在 30 秒内读懂：

| 做 | 不做 |
|-----|------|
| `OrderManagement.slnx` 在根目录 | 藏在 `/src/` 里 |
| 项目名 = 领域名：`OrderManagement.Api` | `Core`、`Shared`、`Services` |
| 文件顶部一句话说明用途 | `// 订单处理` |
| 构造函数显式声明依赖 | `IServiceProvider.GetService<T>()` |
| 注释解释 WHY | `// 保存订单` |

**[→ 完整指南](SELF_DOCUMENTING.md)** · **[→ 提问框架](USAGE.md)** · **[→ 行为目录](BEHAVIORS.md)**

---

MIT
