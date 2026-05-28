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

> "加个订单管理模块"
> "生产环境 OOM 了，这是 dump 文件"
> "审查这段代码的安全性"
> "给这个订单服务写测试"
> "从 .NET 8 升级到 .NET 10"
> "配置 CI/CD 流水线"
> "订单列表越来越慢了，查一下数据库"

---

## 真实场景

以下七个常见场景，展示决策者如何先对齐需求，再路由到具体技能执行。

### 1. 从零搭建 Web API

```
你：我需要一个订单管理系统

AI：什么样的订单？采购订单？工单？还是顾客订单？

你：顾客下单。状态：待确认 → 已确认 → 已发货。

AI：明白了。用什么技术栈？.NET 10 还是 8？数据库用 PostgreSQL 还是 SQLite？
    这是生产项目还是原型？需要包括测试吗？

你：.NET 10，PostgreSQL，生产环境，需要测试。

行为链：意图检测 → 3 轮提问 → 捕获领域词汇 → 选择架构 →
       脚手架 OrderManagement.Api → EF Core + Minimal API + 认证 →
       Testcontainers 集成测试 → 每文件 30 秒法则
```

### 2. 排查生产崩溃（内存溢出）

```
你：我的应用在生产环境一直崩溃——OutOfMemoryException

AI：有 .dmp 文件吗？有的话我加载 WinDbg 分析。

你：有，在 C:\dumps\crash.dmp

行为链：意图检测 → 加载 dotnet-debugging → WinDbg 打开转储 →
       !analyze -v → !dumpheap -stat 发现 850MB byte[] →
       !gcroot 追溯到 ImageCache 单例 → 报告根因 +
       修复方案：用 IMemoryCache + SizeLimit
```

### 3. 代码审查与安全审计

```
你：审查这段代码的安全性

AI：好的。我会做一次只读安全审计，不修改任何代码。
    主要检查：OWASP Top 10、密钥硬编码、SQL 注入、认证授权。

行为链：意图检测 → 路由到 dotnet-security-reviewer（只读）→
       逐文件扫描 → 发现 SQL 拼接 + 硬编码密钥 + JWT 缺 Audience →
       生成安全报告（风险等级 + 修复建议）
```

### 4. 为现有代码补测试

```
你：给这个订单服务写测试

AI：我先看看现有代码结构。核心逻辑适合单元测试，数据库交互需要集成测试。
    xUnit + WebApplicationFactory + Testcontainers，可以吗？

你：可以。

行为链：意图检测 → 分析代码架构 → 路由到 dotnet-testing →
       创建测试项目 → 单元测试覆盖业务规则 →
       Testcontainers 启动 PostgreSQL → 集成测试覆盖数据访问
```

### 5. 从 .NET 8 升级到 .NET 10

```
你：把这个项目从 .NET 8 升到 .NET 10

AI：我先做一次升级评估。检查 TFM、NuGet 兼容性、废弃 API。
    建议分两步：8→9 再 9→10，每步都跑构建和测试。可以吗？

你：按你说的来。

行为链：意图检测 → 评估当前项目 → 路由到 dotnet-upgrade →
       8→9：处理 BinaryFormatter 废弃 → build + test → commit →
       9→10：迁移到 AddValidation → build + test → commit →
       不兼容包替换为免费替代
```

### 6. 配置 CI/CD 流水线

```
你：给这个项目配 CI/CD

AI：我看一下项目类型和平台。Web API + GitHub，我生成一套 GitHub Actions
    工作流：构建 → 格式检查 → 测试（含 Testcontainers）→ Docker 构建。
    只在推送到 main 时触发部署，可以吗？

你：可以。

行为链：意图检测 → 分析项目 + 平台 → 路由到 dotnet-devops →
       生成 GHA 工作流 → build + format + test + docker →
       配置 NuGet 缓存 + 条件部署触发器
```

### 7. 数据库性能排查（EF Core N+1）

```
你：订单列表越来越慢了，查一下数据库

AI：让我检查一下查询代码。可能是经典的 N+1 问题——循环中每笔订单
    单独查明细。找到后我会加 .Include() 改单条 SQL，再分析索引情况。

行为链：意图检测 → 路由到 dotnet-performance-analyst →
       审查代码 → 发现 N+1 循环查询 → 添加 .Include() 合并为单条 SQL →
       发现缺少复合索引 → 生成迁移脚本 + 前后性能对比
```

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
