---
name: dotnet-learning
description: >
  .NET 项目知识复利系统。检测用户纠错并将其概括为规则存入 MEMORY.md。通过置信度
  评分的直觉系统追踪项目特定模式，逐步升华为永久规则。用户纠正输出、说"记住这个"、
  "学习这个模式"或会话开始时加载。融合 self-correction-loop + instinct-system
  + learning-log。
---

# dotnet-learning

## Core Principles

1. **Every correction compounds** — A 30-second correction today prevents hours of mistakes across all future sessions. Capture immediately.

2. **Generalize before storing** — "Use `TimeProvider` not `DateTime.Now` in Orders" becomes "Always use `TimeProvider` instead of `DateTime.Now/UtcNow` — injectable and testable."

3. **Confidence-driven instincts** — First observation is a hypothesis (0.3), not a rule. Confirm across 3+ instances before promoting to permanent rule (0.9). Store per-project in `.claude/instincts.md`.

4. **Deduplicate aggressively** — Update existing rules rather than adding near-duplicates. Memory bloat defeats the purpose.

## Correction Capture Flow

```
1. DETECT — User says "no, use X", "we don't do that", "always/never X here"
2. GENERALIZE — Extract the class-level rule, not the line-specific fix
3. CHECK — Scan MEMORY.md for overlapping rules; update if found
4. STORE — Write categorized rule with rationale after dash
5. CONFIRM — Tell user what was captured: "Added to Memory > Data Access: ..."
```

### Memory Categories

Code Style | Architecture | Naming | Data Access | API Design | Testing | Configuration | Performance

Format: `- Rule — rationale`

## Instinct System

Instincts start as low-confidence hypotheses and follow an observe-hypothesize-confirm cycle:

- **0.3** — First observation: note it, do not apply
- **0.5** — Second confirmation: mention when relevant, flag uncertainty
- **0.7** — Third+ confirmation: follow by default
- **0.9** — Graduate to MEMORY.md as permanent rule
- **Discard** — Never reaches 0.7 after 5+ observations

Store per-project in `.claude/instincts.md`. Instincts do not transfer between projects — what holds in one codebase may be wrong in another.

## Anti-patterns

- **Overly specific rules** — "In CreateOrder line 47, use TimeProvider" → wrong. Generalize.
- **Never reviewing memory** — Audit every 5-10 sessions: remove contradictions, merge overlaps, verify accuracy.
- **Ignoring corrections** — Fixing without capturing guarantees the same mistake next session.
