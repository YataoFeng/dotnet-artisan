---
name: dotnet-workflow
description: >
  Claude Code 工作流优化（.NET 开发）。涵盖 git worktree 并行执行、上下文纪律
  （Token 预算管理）、Plan Mode 策略、自主循环、验证模式和权限设置。配置 .NET 项目
  的 Claude Code、运行并行会话、上下文不足或优化效率时加载。融合 workflow-mastery
  + context-discipline + autonomous-loops + verification-loop。
---

# dotnet-workflow

## Core Principles

1. **Parallel over sequential** — Run 3-5 Claude sessions simultaneously with git worktrees. Build a feature in one, fix a bug in another, run tests in a third. Single biggest productivity unlock.

2. **Plan then execute** — Non-trivial tasks: plan mode first, iterate until plan is solid, then auto-accept. A good plan means Claude 1-shots the implementation.

3. **Verification closes the loop** — Give Claude a way to prove its work: `dotnet build`, `dotnet test`. Without verification, output quality degrades 2-3x.

4. **Automate the repetitive** — If done more than once a day: make it a hook, slash command, or subagent. Pre-allow safe permissions. Eliminate friction.

5. **Compound your knowledge** — Every correction becomes a rule in MEMORY.md (see dotnet-learning skill). Over time, mistake rate drops as knowledge base grows.

## Context Discipline (Token Budget)

Treat the 200k token window as a budget, not a dumping ground:

- **MCP tools first, file reads second** — A Roslyn MCP query costs 30-150 tokens. Reading a file costs 500-2000+. For navigation, use MCP before opening files.
- **Lazy load everything** — Don't read files "just in case." Load at the moment of need.
- **Subagents are isolation chambers** — Each subagent gets its own context window. Offload exploration/research/analysis to subagents.
- **Summarize and discard** — After exploring a subsystem, summarize in a few lines. The summary stays; raw file contents don't.
- **Avoid context bloat** — Don't load all skills upfront. Don't explore directories you aren't modifying.

## Git Worktree Pattern

```bash
# Create parallel work environments
git worktree add ../feature-x feature/x
git worktree add ../bugfix-y bugfix/y
git worktree add ../refactor-z refactor/z

# Each gets its own Claude session
# Clean up when done
git worktree remove ../feature-x
```

## Verification Loop

After every code change, run the verification chain:
1. `dotnet build` — catches syntax and compilation errors
2. `dotnet test` — catches logic and regression errors
3. Manual inspection — spot-check the diff for obvious issues
4. If any step fails, fix before proceeding — never batch fixes

## Anti-patterns

- **Reading files preemptively** — "I might need this later" burns context for no reason
- **Skipping verification** — "This change is simple" is how bugs ship
- **Overloading one session** — One session = one concern; use worktrees for parallelism
