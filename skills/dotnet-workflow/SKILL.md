---
name: dotnet-workflow
license: MIT
user-invocable: false
description: >
  Claude Code workflow optimization for .NET development. Covers parallel execution
  with git worktrees, context discipline (token budget management), plan mode strategy,
  autonomous loops, verification patterns, and permission setup. Load when setting up
  Claude Code for a .NET project, running parallel sessions, context is running low,
  or optimizing productivity. Also manages compounding knowledge: captures user
  corrections, generalizes them into rules, and tracks project-specific patterns
  via confidence-scored instincts. Merges workflow-mastery + context-discipline +
  autonomous-loops + verification-loop + self-correction-loop + instinct-system +
  learning-log.
---

# dotnet-workflow

## Core Principles

1. **Parallel over sequential** — Run 3-5 Claude sessions simultaneously with git worktrees. Build a feature in one, fix a bug in another, run tests in a third. Single biggest productivity unlock.

2. **Plan then execute** — Non-trivial tasks: plan mode first, iterate until plan is solid, then auto-accept. A good plan means Claude 1-shots the implementation.

3. **Verification closes the loop** — Give Claude a way to prove its work: `dotnet build`, `dotnet test`. Without verification, output quality degrades 2-3x.

4. **Automate the repetitive** — If done more than once a day: make it a hook, slash command, or subagent. Pre-allow safe permissions. Eliminate friction.

5. **Compound your knowledge** — Every correction becomes a rule in MEMORY.md (see Learning System section below). Over time, mistake rate drops as knowledge base grows.

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
- **Skipping design for "simple" tasks** — unexamined assumptions cause the most wasted work

## Learning System

Captures and compounds knowledge from user corrections.

### Correction Capture Flow

```
1. DETECT — User says "no, use X", "we don't do that", "always/never X here"
2. GENERALIZE — Extract the class-level rule, not the line-specific fix
3. CHECK — Scan MEMORY.md for overlapping rules; update if found
4. STORE — Write categorized rule with rationale
5. CONFIRM — Tell user what was captured: "Added to Memory: ..."
```

### Memory Categories

Code Style | Architecture | Naming | Data Access | API Design | Testing | Configuration | Performance

Format: `- Rule — rationale`

### Instinct System

Instincts start as low-confidence hypotheses and follow an observe-hypothesize-confirm cycle:

- **0.3** — First observation: note it, do not apply
- **0.5** — Second confirmation: mention when relevant, flag uncertainty
- **0.7** — Third+ confirmation: follow by default
- **0.9** — Graduate to MEMORY.md as permanent rule
- **Discard** — Never reaches 0.7 after 5+ observations

Store per-project in `.claude/instincts.md`. Instincts do not transfer between projects.

### Learning Anti-patterns

- **Overly specific rules** — Generalize the pattern, not the line
- **Never reviewing memory** — Audit every 5-10 sessions
- **Ignoring corrections** — Fixing without capturing guarantees the same mistake next session

## Out of Scope

- .NET coding standards or language features (see [dotnet-csharp](../dotnet-csharp/SKILL.md))
- Debugging or crash analysis (see [dotnet-debugging](../dotnet-debugging/SKILL.md))
- Specific API, UI, or testing implementation patterns (see respective domain skills)
