# dotnet-artisan

[![English](https://img.shields.io/badge/English-README-blue)](README.md)

**让你的 AI 编码代理真正擅长 .NET。**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Skills](https://img.shields.io/badge/技能-14-5b9cf5)](skills/)
[![Agents](https://img.shields.io/badge/代理-17-8b5cf6)](agents/)

---

## 为什么用这个？

如果你用 Claude Code（或 Copilot、Cursor）做 .NET 开发，你大概率遇到过这些问题：

| 问题 | 没装这个插件 | 装了这个插件 |
|---------|-------------------|------------------|
| 过时/商业包 | AI 推荐 Swashbuckle（停维护）、FluentValidation（不兼容 AOT）、MediatR（商业） | AI 用 `Microsoft.AspNetCore.OpenApi`、`AddValidation()`、直接 Handler——全是内置、免费、AOT 安全 |
| 反模式 | AI 给 DbContext 包一层无意义的 IRepository/IUnitOfWork | AI 直接注入 DbContext。EF Core 本身就是仓储。 |
| 知识冻结 | AI 不知道 .NET 10 新特性：`HybridCache`、文件级应用、`field` 关键字 | AI 自动识别 .NET 8 到 11，每个版本用什么特性都清楚 |
| 上来就写代码 | "帮我做个订单系统" → AI 直接脚手架，但建了一堆错的东西 | AI 先问 3-4 轮问题，捕获领域词汇表，选对架构，再动手 |
| 断开就失忆 | 断开 → 重连 → AI 完全不认识你写的东西 | AI 30 秒读懂项目，因为每个文件都是自文档化的 |
| 调试靠猜 | "应用崩溃了" → AI 给泛泛的建议 | AI 在 WinDbg 里打开 .dmp，`!analyze -v`，一路追踪到具体哪行代码 |

---

## 能干什么？（实际场景）

### 构建新项目

"帮我做一个顾客订单的 Web API"

→ AI 问：什么类型的订单？谁下单？走一遍流程？.NET 版本？什么数据库？
→ 脚手架生成：EF Core + Minimal API + 认证 + OpenAPI + Scalar 文档
→ 集成测试搭好：Testcontainers + 真实 PostgreSQL
→ 每个文件自文档化，以后任何 AI 打开都能读懂

"做一个 Blazor 管理后台" — 同样流程，但针对 UI：选渲染模式、搭组件、配认证。

"做一个 CLI 工具" — System.CommandLine 或 Spectre.Console，Native AOT 就绪。

"给我的应用加 AI" — Semantic Kernel、MCP 服务、RAG 流水线。

### 修复故障

"生产环境 OutOfMemoryException 崩溃"

→ AI 加载**调试专家**，在 WinDbg 里打开你的 .dmp 文件
→ `!analyze -v` → `!dumpheap -stat` → 发现 ImageCache 单例持有 850MB byte[]
→ 报告："你的图片缓存没有淘汰策略。修复：IMemoryCache + SizeLimit 做 LRU。"

"高并发下卡死" → 死锁检测（!dlk, !syncblk）

"构建失败" → MSBuild 诊断专家解决 NuGet 冲突、SDK 版本问题

"竞态条件" → 并发专家找到未同步的共享状态

### 代码审查

"审查这段代码" → 多维度分析：正确性、性能、安全、架构。返回分类问题 + 修复建议。

"这个安全吗？" → OWASP 审计。发现硬编码密钥、SQL 注入风险。只读，不修改代码。

"怎么架构这个项目？" → 架构专家根据复杂度推荐模式。

"清理代码" → 7 步流水线：格式化 → 未用 using → 修复警告 → 死代码 → TODO → sealed 审计 → CancellationToken。每步 `dotnet build && dotnet test` 验证。

### 交付

"配 CI/CD" → GitHub Actions 管道：缓存、测试、Docker 构建
"容器化" → 多阶段 Dockerfile、chiseled 镜像、非 root 用户
"部署到云" → .NET Aspire、AKS、健康检查
"加监控" → OpenTelemetry + Serilog 结构化日志

---

## 怎么安装

```bash
claude plugins install YataoFeng/dotnet-artisan
```

同样兼容 GitHub Copilot、VS Code、Cursor。遵循 [agentskills.io](https://agentskills.io) 标准。

装完即用。你说 .NET 相关的事，插件自动激活。零配置。

---

## 谁在干活？

### 决策者（最先运行）

你每次说 .NET 相关的事，两个网关自动介入：

| 角色 | 谁 | 干什么 |
|------|-----|--------------|
| 意图检测器 | `using-dotnet` | "这是 .NET 请求吗？" 是 → 交给决策者 |
| **决策者** | `dotnet-advisor` | 读取你的项目文件、检测 .NET 版本、分析意图、路由到正确专家。意图模糊时反问澄清。 |

### 领域专家（需要时加载）

每个专家深耕一个领域，背后有参考文件支撑（包含模式 + 反模式 + 好/坏代码对照）。

#### 构建者

| 专家 | 构建什么 | 知识储备 |
|------------|---------------|-----------|
| `dotnet-api` | Web API、EF Core、gRPC、SignalR、认证、缓存、YARP 反向代理 | 32 个参考文件 |
| `dotnet-ui` | Blazor、MAUI、Uno Platform、WPF、WinUI 3、WinForms | 20 个参考文件 |

**调用的工具**：项目脚手架、MSBuild、NuGet、SDK 管理（通过 `dotnet-tooling`）

#### 验证者

| 专家 | 检查什么 | 知识储备 |
|------------|---------------|-----------|
| `dotnet-testing` | 单元测试 (xUnit v3)、集成测试 (Testcontainers)、E2E (Playwright)、基准测试 | 13 个参考文件 |
| `dotnet-debugging` | 崩溃转储 (WinDbg)、死锁、内存泄漏、高 CPU | 17 个参考文件——使用 MCP WinDbg 工具 |
| `dotnet-quality` | 7 步清理：格式化 → 警告 → 死代码 → CancellationToken | 内置流水线 |

#### 运维者

| 专家 | 处理什么 | 知识储备 |
|------------|-----------------|-----------|
| `dotnet-devops` | CI/CD、Docker、NuGet 发布、OpenTelemetry | 18 个参考文件 |
| `dotnet-tooling` | MSBuild、Native AOT、CLI 工具、SDK 安装、性能分析 | 34 个参考文件 |
| `dotnet-upgrade` | .NET 版本迁移 (8→9→10→11)、AOT 兼容性 | 迁移指南 |

#### 增强者

| 专家 | 添加什么 | 知识储备 |
|------------|-------------|-----------|
| `dotnet-ai` | MCP 服务、Semantic Kernel、RAG、ML.NET | AI 集成模式 |
| `dotnet-workflow` | 并行工作树、上下文管理、Claude Code 优化 | 工作流模式 |
| `dotnet-learning` | 捕获你的纠正、泛化为规则、存入 MEMORY.md | 学习系统 |

**始终激活**：`dotnet-csharp` 在所有代码路径上都加载。它强制执行 C# 标准：async/await 正确性、DI 模式、LINQ 优化、并发安全。25 个参考文件。

### 专家顾问（按需深度分析）

当领域专家需要更深入的分析时，会叫专家顾问来帮忙。就像打电话请资深同事给第二意见。

**角色型顾问** — 像人类专家一样工作，做出判断，解释推理：

| 顾问 | 扮演角色 | 什么时候叫 |
|---------|---------|--------------|
| `dotnet-architect` | 软件架构师 | "这个项目怎么架构？" |
| `dotnet-code-review-agent` | 高级代码审查员 | "仔细审查这个 PR" |
| `dotnet-security-reviewer` | 安全审计员 | "这个代码安全吗？"（只读，不改代码） |
| `dotnet-testing-specialist` | 测试架构师 | "这里怎么测比较合适？" |
| `dotnet-docs-generator` | 技术文档工程师 | "给这个项目生成文档" |
| `dotnet-refactor-cleaner` | 清理专家 | "把这个代码库清理干净" |

**工具型顾问** — 在特定领域做深度技术分析：

| 顾问 | 分析什么 | 什么时候叫 |
|---------|----------|--------------|
| `dotnet-aspnetcore-specialist` | 中间件、DI、请求管道 | "我这中间件顺序对吗？" |
| `dotnet-async-performance-specialist` | Async/await、ValueTask、ThreadPool | "为什么异步代码这么慢？" |
| `dotnet-benchmark-designer` | BenchmarkDotNet、测量方法 | "我需要一个准确的基准测试" |
| `dotnet-blazor-specialist` | Blazor 渲染模式、组件 | "选哪个 Blazor 渲染模式？" |
| `dotnet-build-error-resolver` | MSBuild 错误、SDK 冲突 | 构建失败 |
| `dotnet-cloud-specialist` | .NET Aspire、AKS、云部署 | "部署到 Azure？" |
| `dotnet-csharp-concurrency-specialist` | 竞态条件、死锁 | "高并发下出问题了" |
| `dotnet-maui-specialist` | MAUI、Xamarin 迁移 | "做一个手机应用" |
| `dotnet-performance-analyst` | 火焰图、堆转储、GC | "找出性能瓶颈在哪" |
| `dotnet-uno-specialist` | Uno Platform、MVUX | "跨平台桌面应用？" |

---

## 写的代码好在哪里？

这个插件生成的每个项目遵循一条规则：**新 AI 会话必须在 30 秒内理解它。**

| 规则 | 好 | 坏 |
|------|------|-----|
| 解决方案在根目录 | `OrderManagement.slnx` 一眼看到 | 藏在 `/src/` 里 |
| 项目名 = 领域名 | `OrderManagement.Api` | `Core`、`Shared`、`Services` |
| 文件顶部一句话 | `// 处理履约：验证支付、预留库存、创建发货单` | `// 订单处理` |
| 显式依赖 | `构造函数(AppDbContext, IHybridCache, TimeProvider)` | `IServiceProvider.GetService<T>()` |
| 只写 WHY 注释 | `// IServiceScopeFactory：BackgroundService 活得比 Scoped DbContext 长` | `// 保存订单` |

[完整指南 →](SELF_DOCUMENTING.md)

---

## 怎么用最有效

1. **说清楚你想要什么。** "我需要一个订单系统"就会触发提问框架。给的上下文越多，提问轮数越少。

2. **让 AI 问完再动手。** 别急着写代码。3-4 轮领域发现能省掉几周的返工。

3. **保留崩溃转储。** 生产环境出问题时，一个 `.dmp` 文件能让调试专家在几分钟内找到根因。

4. **阅读指南。** [USAGE.md](USAGE.md) 展示完整工作流。[BEHAVIORS.md](BEHAVIORS.md) 列出所有行为。

---

## 许可

MIT
