# dotnet-artisan Harness

Drop-in Claude Code configuration for .NET projects. Auto-activates when you open any .NET project.

## Quick Start

```bash
# Copy to a single project
cp harness/settings.json your-dotnet-project/.claude/settings.json

# Or copy to all .NET projects (global)
cp harness/settings.json ~/.claude/settings.json
```

## What It Does

### Session Start

When Claude Code opens a directory containing `.cs`, `.csproj`, `.sln`, `.cshtml`, `.razor`, `.xaml` files:

→ Prints: `[dotnet-artisan] .NET project detected. Loading skills...`
→ The plugin's `using-dotnet` → `dotnet-advisor` chain activates
→ Baseline C# standards (`dotnet-csharp`) auto-load

### Prompt Detection

When you type a prompt containing `.NET` keywords (`C#`, `ASP.NET`, `Blazor`, `MAUI`, `EF Core`, etc.):

→ Prints: `[dotnet-artisan] .NET intent detected. Decision-maker will analyze version, route to specialists...`
→ This is a REMINDER that the decision-maker is active. It doesn't block your prompt — it confirms routing is happening.

### New File Quality

When you create or edit a `.cs` file:

→ Checks: does the file have a purpose comment at the top?
→ If not: reminds you about `SELF_DOCUMENTING.md` (30-second rule)

### Pre-Approved Permissions

| Command | Pre-approved because |
|---------|---------------------|
| `dotnet *` | Build, test, restore — standard .NET CLI |
| `git *` | Version control |
| `docker *` | Container operations |
| Read, Grep, Glob | Code search and analysis |
| WebSearch, WebFetch | Documentation lookup |

## Customization

Edit `settings.json` to:
- Add more allowed Bash patterns (e.g., `Bash(docker-compose:*)`)
- Remove hooks you don't want (delete the hook block)
- Add project-specific env vars in the `env` section

## How It Works

The harness is a standard Claude Code `settings.json` file. Claude Code reads `.claude/settings.json` from the project directory (and `~/.claude/settings.json` globally) on every session start. The hooks fire at specific lifecycle events:

```
SessionStart → Check for .NET project files → Load skills
UserPromptSubmit → Check prompt for .NET keywords → Confirm routing
PostToolUse(Write/Edit) → Check for .cs files → Remind about comments
```

No GitHub Actions. No external servers. Everything runs inside Claude Code.
