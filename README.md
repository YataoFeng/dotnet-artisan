# dotnet-artisan

**让你的 AI 编码代理真正精通 .NET。** 即装即用，零配置。

[![English](https://img.shields.io/badge/English-README-blue)](README.en.md)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Skills](https://img.shields.io/badge/Skills-14-5b9cf5)](skills/)
[![Agents](https://img.shields.io/badge/Agents-17-8b5cf6)](agents/)

14 技能 · 17 代理 · 160+ 参考文件 · 30+ 行为

---

## 安装

```bash
claude plugins marketplace add fenzel999/dotnet-artisan
claude plugins install dotnet-artisan
```

兼容 GitHub Copilot、VS Code、Cursor。装完打开任意 .NET 项目即用，Harness 自动激活。

---

## 快速体验

装完插件，像平常一样说话：

```
你：帮我在这个项目里加一个订单管理模块

AI：写代码之前，我需要先了解几个问题——
    订单类型？顾客下单还是内部工单？流程？状态？

你：顾客下单。状态：待确认→已确认→已发货。

AI：.NET 10 + PostgreSQL。先捕获领域词汇，再搭建模块。
```

**你不需要记任何技能名。** 决策者会自动分析项目、问清需求、选对架构。试试这些话：

> "帮我看看这个项目的架构有没有问题"
> "审查这段代码的安全性"
> "我的应用在生产环境崩了，这是转储文件"
> "从 .NET 8 升级到 .NET 10"

---

## 技能

插件激活后，两个网关先运行：`using-dotnet` 检测意图，`dotnet-advisor`（决策者）分析项目、问清需求、分派任务。

```
网关    │ using-dotnet · dotnet-advisor               →  意图检测 + 决策路由
基线    │ dotnet-csharp                                →  C# 规范（始终加载）
构建    │ dotnet-api · dotnet-ui                       →  Web API / EF Core / Blazor / MAUI / WPF
验证    │ dotnet-testing · dotnet-debugging · dotnet-quality  →  测试 / WinDbg / 质量清理
运维    │ dotnet-devops · dotnet-tooling · dotnet-upgrade     →  CI/CD / 脚手架 / 版本迁移
增强    │ dotnet-ai · dotnet-workflow · dotnet-learning       →  MCP、RAG / 工作流 / 学习
```

---

## 代理

直接用需求触发，或让决策者自动路由。代理名均以 `dotnet-` 开头，下表中省略。

| 你说 | 代理 | 专长 |
|------|------|------|
| "这个项目怎么架构？" | architect | 架构、模式选型 |
| "审查这个 PR" | code-review-agent | 多维代码审查 |
| "这个代码安全吗？" | security-reviewer | OWASP、密钥、加密（只读） |
| "怎么测试这个？" | testing-specialist | 测试策略、金字塔设计 |
| "生成文档" | docs-generator | DocFX、Mermaid |
| "清理这段代码" | refactor-cleaner | 7 步清理流水线 |
| "中间件顺序对吗？" | aspnetcore-specialist | 中间件、DI、请求管道 |
| "异步代码为什么慢？" | async-performance-specialist | async/await、ValueTask |
| "设计基准测试" | benchmark-designer | BenchmarkDotNet |
| "选哪个渲染模式？" | blazor-specialist | Blazor 渲染模式 |
| 构建失败时 | build-error-resolver | MSBuild、NuGet、SDK |
| "部署到云？" | cloud-specialist | Aspire、AKS |
| "高并发下出问题" | concurrency-specialist | 竞态条件、死锁 |
| "做手机应用" | maui-specialist | MAUI 开发 |
| "找出性能瓶颈" | performance-analyst | 火焰图、堆转储、GC |
| "跨平台桌面？" | uno-specialist | Uno Platform |
| "创建 PR" / "发布" | pr-workflow | PR 生命周期 |

完整列表：[BEHAVIORS.md](BEHAVIORS.md)

---

## 核心规则

1. **DbContext 即仓储** — 禁止 Repository/UoW 包装。直接注入 DbContext。
2. **禁止 FluentValidation** — .NET 10+ 使用 `AddValidation()` + DataAnnotations，内建、源码生成、AOT 安全。
3. **仅用免费/开源包** — MediatR→Mediator、AutoMapper→Mapperly、Newtonsoft→System.Text.Json。详见 [package-choices.md](skills/dotnet-csharp/references/package-choices.md)。
4. **禁止 DateTime.Now** — 全部使用 `TimeProvider`，通过构造函数注入。
5. **先理解，再动手** — 在能自信回答 7 项检查清单前，不写一行代码。详见 [USAGE.md](USAGE.md)。
6. **自文档化代码** — 新 AI 会话必须在 30 秒内理解项目。零例外。
7. **使用现代替代** — IHttpClientFactory、System.Text.Json 源码生成、Microsoft.AspNetCore.OpenApi、Mediator(MIT)。绝不使用旧模式。

速查：[CHEATSHEET.md](skills/CHEATSHEET.md)

---

## 30 秒法则

每个生成的项目必须让新 AI 在 30 秒内读懂。详见 [SELF_DOCUMENTING.md](SELF_DOCUMENTING.md)。

---

## 了解更多

- [提问框架](USAGE.md) — 决策者的 4 轮发现流程
- [行为目录](BEHAVIORS.md) — 全部行为及路由逻辑
- [CLAUDE.md](CLAUDE.md) — 上下文恢复入口
- [Web 版](https://fenzel999.github.io/dotnet-artisan) — 交互式文档

---

MIT
