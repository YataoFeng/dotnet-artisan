# Template Authoring

Creating custom `dotnet new` templates from existing projects.

## Quick Start

```bash
# Create .template.config directory
mkdir .template.config
```

Create `.template.config/template.json`:
```json
{
  "$schema": "http://json.schemastore.org/template",
  "author": "MyOrg",
  "classifications": ["Library"],
  "identity": "MyOrg.Templates.MyLib",
  "name": "My Library Template",
  "shortName": "mylib",
  "sourceName": "MyLib",
  "tags": { "language": "C#", "type": "project" }
}
```

## Key Fields

- `identity` — reverse-DNS unique ID (e.g., `MyOrg.Templates.WebApi`)
- `shortName` — avoid CLI command names (`build`, `run`, `test`, `publish`)
- `sourceName` — the name placeholder that gets replaced by `--name`
- `classifications` — tags for discoverability

## Validation Checklist

- [ ] template.json has required fields: identity, name, shortName
- [ ] shortName doesn't conflict with CLI commands
- [ ] All parameters have descriptions and defaults
- [ ] Choice parameters have `defaultValue` in choices list
- [ ] Post-actions have required `actionId`

## Testing

```bash
dotnet new install ./template/root
dotnet new mylib --name TestProject --dry-run
dotnet new mylib --name TestProject --output ./test-output
dotnet build ./test-output/TestProject
```
