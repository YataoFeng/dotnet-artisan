# dotnet-artisan — .NET AI 编码代理技能库

14 个技能、17 个代理、160+ 参考文件。融合自 dotnet-artisan、dotnet/skills 和 dotnet-claude-kit。

## 快速开始

加载路径: `using-dotnet` → `dotnet-advisor` → 领域技能。`dotnet-csharp` 始终作为基线加载。

## 铁律（不可协商）

1. **禁止 Repository/UoW 包装** — DbContext 就是工作单元；DbSet<T> 就是仓储
2. **禁止 FluentValidation** — .NET 10+ 使用 `AddValidation()` + DataAnnotations
3. **禁止商业包** — 优先使用免费/开源替代（见 package-choices.md）
4. **禁止 DateTime.Now** — 全项目使用 `TimeProvider`
5. **直接注入 DbContext** — 注入 `AppDbContext`，不是 `IRepository<T>`
6. **仅免费/开源** — MediatR→Mediator(MIT)、AutoMapper→Mapperly 等

## 核心文件

| 加载时机 | 文件 |
|----------|------|
| 写任何 .NET 代码 | [anti-patterns.md](skills/dotnet-csharp/references/anti-patterns.md) — 最常犯的 10 组好/坏代码 |
| 选择 NuGet 包 | [package-choices.md](skills/dotnet-csharp/references/package-choices.md) — 商业→免费替代方案 |
| 架构决策 | [DECISIONS.md](skills/DECISIONS.md) — "什么时候用什么"速查 |
| 查找参考 | [INDEX.md](skills/INDEX.md) — 全部 80+ 参考文件按领域索引 |
| 清理/质量 | [dotnet-quality](skills/dotnet-quality/SKILL.md) — 7 步清理流水线 |
| 工作流优化 | [dotnet-workflow](skills/dotnet-workflow/SKILL.md) — 并行工作树、上下文管理 |
| 模式学习 | [dotnet-learning](skills/dotnet-learning/SKILL.md) — 纠错捕获、直觉系统 |
| AI/ML 功能 | [dotnet-ai](skills/dotnet-ai/SKILL.md) — MCP、RAG、Semantic Kernel |
| 框架升级 | [dotnet-upgrade](skills/dotnet-upgrade/SKILL.md) — 迁移路径 |

## 反模式速查

每个参考文件遵循: **核心原则 → 模式 → 反模式（好/坏代码）→ 决策指南**。

十大常驻反模式: DateTime.Now→TimeProvider | Scoped 注入 Singleton→IServiceScopeFactory | async void→BackgroundService | .Result/.Wait()→await | Repository→DbContext | N+1→.Include() | new HttpClient()→IHttpClientFactory | lock(this)→私有对象 | string+循环→StringBuilder | 一个实现一个接口→直接用类

## 自动化

本仓库通过 GitHub Actions 自动进化：

| 工作流 | 时间 | 功能 |
|--------|------|------|
| `auto-evolve.yml` | 每天 10:47 | AI 分析上游仓库（dotnet/skills、dotnet-claude-kit），自动应用新反模式，创建 PR |
| `self-heal.yml` | 每周日 11:23 | 检查断链、缺失反模式章节、坏 DateTime 用法、行尾空白 |

均使用 GitHub Models（GPT-4o-mini，免费层）进行 AI 分析。

## 来源

- [novotnyllc/dotnet-artisan](https://github.com/novotnyllc/dotnet-artisan) — 深度参考框架
- [dotnet/skills](https://github.com/dotnet/skills) — 微软官方 .NET AI 技能
- [codewithmukesh/dotnet-claude-kit](https://github.com/codewithmukesh/dotnet-claude-kit) — 好/坏代码模式 + 工作流
