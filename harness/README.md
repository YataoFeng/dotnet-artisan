# Harness (Built-In)

The harness is **built into the plugin**. You don't need to copy anything.

When you install dotnet-artisan (`claude plugins install fenzel-ai/dotnet-artisan`), the harness auto-activates in every .NET project you open.

## What It Does (Automatic)

| Event | What Happens |
|-------|--------------|
| Open a .NET project | Detects `.cs`/`.csproj`/`.sln` files → auto-loads `using-dotnet` + `dotnet-advisor` → shows .NET version |
| Type a .NET prompt | Detects C#/ASP.NET/Blazor/etc. keywords → injects routing reminder |
| Write/Edit a `.cs` file | Checks for one-line purpose comment → reminds you if missing (30-second rule) |

## How It Works

The plugin's `hooks.json` registers three hooks:

```
SessionStart → session-start-context.js → Detects .NET project, injects routing
UserPromptSubmit → user-prompt-dotnet-reminder.js → Detects .NET keywords
PostToolUse → check-self-doc.js → Checks .cs file headers
```

All hooks are zero-block: if anything fails, they silently return empty context. They never prevent you from working.

## Advanced: Per-Project Settings

For project-specific overrides (custom permissions, env vars, additional hooks), create `.claude/settings.json` in your project:

```json
{
  "permissions": {
    "allow": ["Bash(dotnet:*)", "Bash(docker:*)"]
  },
  "env": {
    "DOTNET_ENVIRONMENT": "Development"
  }
}
```

The plugin harness works alongside any project-level settings you add.

## Reference

See `hooks.json` in the plugin root for the full harness configuration.
See `scripts/hooks/` for the hook scripts.
