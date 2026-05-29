# Template Discovery

Finding and inspecting .NET project templates.

## Common Templates

| Intent | Template | Key Params |
|--------|----------|-----------|
| Web API | `webapi` | `--auth`, `--aot`, `--use-controllers` |
| Web app | `webapp` | `--auth` |
| Blazor | `blazor` | `--interactivity`, `--auth` |
| Console | `console` | `--aot` |
| Class lib | `classlib` | — |
| Worker | `worker` | `--aot` |
| gRPC | `grpc` | `--aot` |
| MAUI | `maui` | — |
| Test | `xunit` / `mstest` / `nunit` | — |

## Commands

```bash
# Search NuGet for templates
dotnet new search blazor

# List installed templates
dotnet new list --language C# --type project

# Show template parameters
dotnet new webapi --help

# Preview without creating files
dotnet new webapi --name MyApi --dry-run
```
