# dotnet-artisan

**让你的 AI 编码代理真正精通 .NET。** 即装即用，零配置。

[![English](README.en.md)](README.en.md)
[![MIT](LICENSE)](LICENSE)
11 技能 · 13 代理 · 169 参考文件 · 30+ 行为

---

## 安装

```bash
claude plugins marketplace add fenzel999/dotnet-artisan
claude plugins install dotnet-artisan
```

兼容 GitHub Copilot、VS Code、Cursor。装完即用。

---

## 它是怎么工作的

你提需求，决策者自动处理全过程：

```
你的需求 → 意图检测 → 决策者编排 →
    1. 检测 .NET 版本
    2. 需求对齐（提问澄清，捕获领域词汇）
    3. 加载 C# 编码规范
    4. 架构设计（调 architect 代理：选架构 + 文件夹结构）
    5. 拆解为多个领域 → 并行路由到对应技能
    6. 按需调用专家代理
    7. 工作流优化 + 学习（记住纠错、泛化规则）
```

**你不需要记任何技能名。** 决策者自动处理一切。

---

## 它能做什么

| 场景 | 你说 | 决策者做什么 |
|------|------|-------------|
| 搭建 API | "加个订单管理系统" | 4 轮提问 → 调 domain-analyst 做事件风暴 → 输出领域文档 → 并行路由到 api + testing + devops |
| 调试崩溃 | "生产环境 OOM，这是 dump" | 路由到 dotnet-debugging → WinDbg/dotnet-dump 分析 → 定位根因 |
| 安全审计 | "审查代码安全性" | 路由到 security-reviewer（只读）→ OWASP 扫描 → 生成安全报告 |
| 补测试 | "给订单服务写测试" | 路由到 dotnet-testing → xUnit + WebApplicationFactory + Testcontainers |
| 版本升级 | "从 .NET 8 升到 10" | 路由到 dotnet-devops → 8→9→10 两步迁移，每步 build+test |
| 配 CI/CD | "配 CI/CD 流水线" | 路由到 dotnet-devops → 生成 GitHub Actions 工作流 |
| 查性能 | "订单列表越来越慢" | 路由到 dotnet-api → 发现 N+1 → .Include() 修复 |
| 记约定 | "记住用 TimeProvider" | 路由到 dotnet-workflow → 泛化为规则 → 存入 MEMORY.md |

---

## 技能

| 分类 | 技能 | 覆盖范围 |
|------|------|---------|
| 网关 | using-dotnet, dotnet-advisor | 意图检测、决策路由 |
| 基线 | dotnet-csharp | C# 规范、async/await、DI、LINQ（始终加载） |
| 构建 | dotnet-api, dotnet-ui | API / EF Core / gRPC / SignalR / Blazor / MAUI / WPF / Uno |
| 验证 | dotnet-testing, dotnet-debugging | 测试 / 调试（WinDbg + dotnet-dump） |
| 运维 | dotnet-devops, dotnet-tooling | CI/CD / 版本迁移 / Git 工作流 / 解决方案结构 / 代码质量 |
| 增强 | dotnet-ai, dotnet-workflow | MCP、RAG / 工作流优化 + 学习 |

---

## 代理

| 你说 | 代理 | 做什么 |
|------|------|--------|
| "这个项目怎么架构？" | architect | 架构选型、文件夹结构、构建配置 |
| "分析领域" | domain-analyst | 事件风暴、限界上下文、领域文档 |
| "审查 PR" | code-review-agent | 正确性、性能、安全、架构 |
| "这个代码安全吗？" | security-reviewer | OWASP、密钥、加密（只读） |
| "怎么测试？" | testing-specialist | 测试策略、金字塔设计 |
| "生成文档" | docs-generator | DocFX、Mermaid |
| "中间件顺序对吗？" | aspnetcore-specialist | 中间件、DI、请求管道 |
| "为什么慢？" 或 "设计基准" | performance-specialist | 异步、性能分析、基准 |
| "做跨平台 UI" | ui-specialist | Blazor / MAUI / Uno |
| "记住这个" | workflow（技能） | 纠错捕获、模式泛化 |
| 构建失败 或 "清理代码" | code-lifecycle-agent | 构建错误 + 质量清理 |
| "部署到云？" | cloud-specialist | Aspire、AKS |
| "高并发出问题" | concurrency-specialist | 竞态条件、死锁 |
| "创建 PR" 或 "发布" | pr-workflow | PR 生命周期 |

完整列表：[BEHAVIORS.md](BEHAVIORS.md)

---

## 核心规则

1. **DbContext 即仓储** — 禁止 Repository/UoW 包装，直接注入
2. **禁止 FluentValidation** — .NET 10+ 用 `AddValidation()` + DataAnnotations
3. **仅用免费/开源包** — MediatR→Mediator, AutoMapper→Mapperly，详见 [package-choices.md](skills/dotnet-csharp/references/package-choices.md)
4. **禁止 DateTime.Now** — 全部用 `TimeProvider`，构造函数注入
5. **先理解再动手** — 7 项检查清单自信回答前不写代码，详见 [USAGE.md](USAGE.md)
6. **自文档化代码** — 新 AI 必须在 30 秒内理解项目
7. **使用现代替代** — IHttpClientFactory、System.Text.Json 源码生成、Microsoft.AspNetCore.OpenApi

速查：[CHEATSHEET.md](skills/CHEATSHEET.md)

---

## 优势与局限

**优势：** 决策者编排 · 先问再做 · 全覆盖 · 30 秒法则 · 零商业依赖 · 跨平台调试 · 零配置

**局限：** 需 Claude Code · 仅 .NET · WinDbg 限 Windows · 部分参考文件仍在标准化

---

## 了解更多

- [提问框架](USAGE.md) — 决策者的 4 轮发现流程
- [行为目录](BEHAVIORS.md) — 全部行为及路由逻辑
- [CLAUDE.md](CLAUDE.md) — 上下文恢复入口
- [Web 版](https://fenzel999.github.io/dotnet-artisan) — 交互式文档

---

MIT
