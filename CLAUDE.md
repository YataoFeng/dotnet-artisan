# CLAUDE.md — Context Reconnection Point

**Read this first.** This file is the fastest path to understanding this repo. If you're an AI reconnecting after a disconnected session, start here.

## What This Repo Is

A Claude Code plugin containing 11 skills + 13 agents + 160+ reference files for .NET development. It teaches AI coding agents how to write correct, idiomatic .NET code.

## Session Recovery Protocol (read in this order)

| Step | File | Time | What You Get |
|------|------|------|--------------|
| 1 | `CLAUDE.md` (this file) | 2 min | Repo overview, rules, structure |
| 2 | `AGENTS.md` | 1 min | Iron rules, anti-patterns, key file map |
| 3 | `USAGE.md` | 3 min | Questioning framework, domain-driven analysis, workflow |
| 4 | `SELF_DOCUMENTING.md` | 2 min | How to write code that any AI can read in 30 seconds |
| 5 | `BEHAVIORS.md` | 2 min | 30+ behavior catalog + decision-maker routing |
| 6 | `skills/CHEATSHEET.md` | 2 min | All rules in one page |

That's ~10 minutes to full context recovery. No session history needed.

## Architecture (one sentence)

User prompt → `using-dotnet` (detect intent) → `dotnet-advisor` (route) → domain skills + `dotnet-csharp` (baseline, always loaded) → meta-skills (on-demand).

## File Map

```
dotnet-artisan/
├── CLAUDE.md              ← You are here. Reconnection entry point.
├── AGENTS.md              ← Iron rules. Read second.
├── USAGE.md               ← How to use skills. Read third.
├── README.md              ← Chinese (default). README.en.md for English.
├── .claude-plugin/
│   ├── plugin.json        ← Skill + agent registry (single source of truth)
│   └── marketplace.json   ← Publication metadata
├── skills/
│   ├── CHEATSHEET.md      ← One-page all-rules
│   ├── DECISIONS.md       ← "When to use what"
│   ├── INDEX.md           ← 166 references by domain
│   ├── using-dotnet/      ← Gateway skill (auto-loaded)
│   ├── dotnet-advisor/    ← Router skill (auto-loaded)
│   ├── dotnet-csharp/     ← Baseline C# (always loaded, 27 refs)
│   ├── dotnet-api/        ← Backend (33 refs)
│   ├── dotnet-ui/         ← Blazor/MAUI/WPF/WinUI (20 refs)
│   ├── dotnet-testing/    ← xUnit/Playwright/Benchmark (14 refs)
│   ├── dotnet-devops/     ← CI/CD/Docker/NuGet (19 refs)
│   ├── dotnet-tooling/    ← MSBuild/AOT/CLI (37 refs)
│   ├── dotnet-debugging/  ← WinDbg/crash dumps (17 refs)
│   ├── dotnet-ai/         ← MCP/Semantic Kernel/RAG
│   ├── dotnet-workflow/   ← Parallel worktrees, context, corrections, learning
├── agents/                ← 13 specialist agent .md files
├── docs/                  ← GitHub Pages (index.html = Chinese, index.en.html = English)
├── scripts/hooks/         ← Node.js hook scripts
└── hooks.json             ← Hook configuration
```

## Non-Negotiable Rules (MUST)

1. **No Repository/UoW wrappers** — DbContext IS the UoW. DbSet<T> IS the repository. Inject DbContext directly.
2. **No FluentValidation** — .NET 10+ uses `AddValidation()` + DataAnnotations. Built-in, source-gen, AOT-safe.
3. **No commercial packages** — Free/open-source only. See `skills/dotnet-csharp/references/package-choices.md`.
4. **No DateTime.Now** — Use `TimeProvider` constructor-injected everywhere.
5. **Exhaust questions before acting** — Check the 7-item checklist in `USAGE.md`. If any answer is "I don't know", ask more. Never write code on assumptions.
6. **English only in skills/agents/references** — Docs (README, Pages) support Chinese + English.
7. **SKILL.md under 500 lines** — Detailed content in `references/` subdirectory.
8. **Reference file format**: Core Principles → Patterns (GOOD code) → Anti-patterns (BAD/GOOD or inline "AVOID" examples) → Decision Guide. Inline BAD/GOOD examples are acceptable instead of dedicated sections.
9. **All generated code MUST follow SELF_DOCUMENTING.md** — A fresh AI must understand any project in 30 seconds. Zero exceptions.

## Skill Format

```yaml
---
name: skill-name
description: When and when NOT to use this skill (third person, triggers)
license: MIT
user-invocable: false
---

# Overview
## Routing Table (topic → keywords → companion file)
```

## Agent Format

```yaml
---
name: agent-name
description: Trigger condition and expertise area
model: sonnet  # haiku, sonnet, or opus
---
```

## Quick Reference

- **Adding a skill**: Create `skills/<name>/SKILL.md` → add to `plugin.json` → update `INDEX.md`
- **Adding an agent**: Create `agents/<name>.md` → add to `plugin.json`
- **All generated code must be self-documenting**: one-sentence file purpose at top, WHY comments for non-obvious decisions, domain terms in class names
- **Project must be understandable by a fresh AI in 30 seconds**: solution file → Program.cs → any .cs file → config
