# dotnet-artisan

[![English](https://img.shields.io/badge/English-README-blue)](README.md) [![中文](https://img.shields.io/badge/中文-简体中文-red)](README.zh-CN.md)

面向 AI 编码代理的综合 .NET 开发技能库 — Claude Code、GitHub Copilot、VS Code、Cursor。

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Skills](https://img.shields.io/badge/技能-14-5b9cf5)](skills/)
[![Agents](https://img.shields.io/badge/代理-17-8b5cf6)](agents/)
[![References](https://img.shields.io/badge/参考文件-160+-4ade80)](skills/)

融合三大来源：原版 [dotnet-artisan](https://github.com/novotnyllc/dotnet-artisan) 深度框架 + 微软官方 [dotnet/skills](https://github.com/dotnet/skills) + [dotnet-claude-kit](https://github.com/codewithmukesh/dotnet-claude-kit) 好/坏代码模式。

## 安装

```bash
claude plugins install YataoFeng/dotnet-artisan
```

兼容 GitHub Copilot、VS Code、Cursor — 遵循 [agentskills.io](https://agentskills.io) 开放标准。

## 架构

```
用户提问 → using-dotnet → dotnet-advisor → 领域技能 + dotnet-csharp(常驻) → 元技能(按需)
```

### 14 个技能

| 技能 | 用途 | 何时加载 |
|------|---------|------|
| **using-dotnet** | .NET 意图检测、路由网关 | 自动加载 |
| **dotnet-advisor** | 技能路由、版本检测、跨域协调 | 自动加载 |
| **dotnet-csharp** | C# 模式、async/await、DI、LINQ | 始终作为基线 |
| **dotnet-api** | ASP.NET Core、EF Core、gRPC、安全 | 后端开发 |
| **dotnet-ui** | Blazor、MAUI、Uno、WPF、WinUI | 界面开发 |
| **dotnet-testing** | xUnit v3、Playwright、基准测试 | 测试编写 |
| **dotnet-devops** | CI/CD、GitHub Actions、容器、NuGet | DevOps |
| **dotnet-tooling** | MSBuild、AOT、CLI、性能分析 | 工具/搭建 |
| **dotnet-debugging** | WinDbg、崩溃转储、死锁分析 | 调试诊断 |
| **dotnet-ai** | MCP、Semantic Kernel、RAG、ML.NET | AI 功能 |
| **dotnet-upgrade** | .NET 版本迁移、AOT、nullable | 框架升级 |
| **dotnet-quality** | 7 步清理、代码评审、死代码移除 | 质量提升 |
| **dotnet-workflow** | 并行工作树、上下文管理 | 效率优化 |
| **dotnet-learning** | 纠错捕获、模式学习 | 知识积累 |

### 17 个代理

架构师 · ASP.NET Core 专家 · 异步性能专家 · 基准测试设计 · Blazor 专家 · 构建错误解决 · 云专家 · 代码评审 · 并发专家 · 文档生成器 · MAUI 专家 · 性能分析 · 重构清理 · 安全审查 · 测试专家 · Uno 专家

## 核心原则

1. **KISS 优先** — 简单 CRUD 不需要 DDD、CQRS。按问题规模选择模式。
2. **禁止仓储包装** — 直接使用 DbContext。EF Core 就是仓储和工作单元。
3. **禁止商业包** — 仅使用免费/开源。MediatR→Mediator(MIT)、AutoMapper→Mapperly。
4. **禁止 DateTime.Now** — 全项目使用 TimeProvider。可注入、可测试。
5. **框架优先** — TimeProvider、ILogger、IHttpClientFactory、System.Text.Json。

## 关键文件

| 文件 | 说明 |
|------|------|
| [AGENTS.md](AGENTS.md) | 入口：铁律、核心文件映射、反模式速查 |
| [CHEATSHEET.md](skills/CHEATSHEET.md) | 一页全规则速查表 |
| [DECISIONS.md](skills/DECISIONS.md) | 决策指南：「什么时候用什么」|
| [INDEX.md](skills/INDEX.md) | 80+ 参考文件按领域索引 |
| [package-choices.md](skills/dotnet-csharp/references/package-choices.md) | 商业→免费替代方案完整对照 |

## 网站

[https://yataofeng.github.io/dotnet-artisan/](https://yataofeng.github.io/dotnet-artisan/)

## 许可

MIT — 详见 [LICENSE](LICENSE)。

## 来源

- [novotnyllc/dotnet-artisan](https://github.com/novotnyllc/dotnet-artisan) — 深度参考框架（159+ 文件）
- [dotnet/skills](https://github.com/dotnet/skills) — 微软官方 .NET AI 技能
- [codewithmukesh/dotnet-claude-kit](https://github.com/codewithmukesh/dotnet-claude-kit) — 好/坏代码模式与工作流优化
