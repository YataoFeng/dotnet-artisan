# dotnet-artisan

面向 AI 编码代理的综合 .NET 开发技能库（Claude Code、GitHub Copilot、VS Code、Cursor）。融合自 [dotnet/skills](https://github.com/dotnet/skills)、[dotnet-claude-kit](https://github.com/codewithmukesh/dotnet-claude-kit) 和原始 [dotnet-artisan](https://github.com/novotnyllc/dotnet-artisan)。

## 技能（14 个）

| 技能 | 用途 | 加载时机 |
|------|------|----------|
| **using-dotnet** | 流程网关，.NET 意图检测 | .NET 提示词自动加载 |
| **dotnet-advisor** | 路由/索引到领域技能 | using-dotnet 后自动加载 |
| **dotnet-csharp** | C# 语言模式、async/await、DI、LINQ | 始终加载作为基线 |
| **dotnet-api** | ASP.NET Core、EF Core、gRPC、SignalR、安全 | 后端/API 开发 |
| **dotnet-ui** | Blazor、MAUI、Uno Platform、WPF、WinUI | 界面开发 |
| **dotnet-testing** | xUnit v3、Playwright、基准测试、测试质量 | 测试编写和策略 |
| **dotnet-devops** | CI/CD、GitHub Actions、容器、NuGet、可观测性 | DevOps/流水线 |
| **dotnet-tooling** | MSBuild、Native AOT、CLI 应用、SDK、性能分析 | 项目搭建和工具 |
| **dotnet-debugging** | WinDbg、崩溃转储、死锁分析、内存诊断 | 调试/分析 |
| **dotnet-ai** | MCP 服务器、Semantic Kernel、RAG、ML.NET | AI/ML 功能 |
| **dotnet-upgrade** | .NET 版本迁移、AOT 评估、nullable 迁移 | 框架升级 |
| **dotnet-quality** | 7 步清理流水线、代码评审、死代码移除 | 代码清理/质量 |
| **dotnet-workflow** | 并行工作树、上下文管理、Claude Code 优化 | 生产力/工作流 |
| **dotnet-learning** | 纠错捕获、直觉系统、模式学习 | 会话开始、纠错时 |

## 安装

```bash
claude plugins install YataoFeng/dotnet-artisan
```

## 核心设计原则

- **KISS 优先**: 简单 CRUD 不需要 DDD、MediatR 或 CQRS。按问题规模选择模式。
- **禁止仓储包装**: 直接使用 DbContext。EF Core 本身就是仓储和工作单元。
- **版本自适应**: 自动适配 net8.0 / net9.0 / net10.0 / net11.0。
- **框架优先**: 使用 .NET 内置功能 — `TimeProvider`、`ILogger<T>`、`IHttpClientFactory`、`System.Text.Json`。

## 许可

MIT — 见 [LICENSE](LICENSE) 文件。
