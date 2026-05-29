# Template Validation

Validating `template.json` for correctness before publishing.

## Required Fields

| Field | Severity | Rule |
|-------|----------|------|
| `identity` | ERROR | Must be present, use reverse-DNS format |
| `name` | ERROR | Must be present |
| `shortName` | ERROR | Must not conflict with CLI commands (`build`, `run`, `test`, etc.) |
| `sourceName` | WARNING | Without it, `--name` won't customize project name |
| `classifications` | SUGGESTION | Improves search discoverability |

## Symbol Checks

- Choice parameters must have `defaultValue` in the choices list
- Bool parameters must have valid boolean `defaultValue`
- Valid datatypes: `string`, `bool`, `choice`, `int`, `float`, `hex`, `text`
- Parameter names should not be prefixes of each other (e.g., `Auth` and `AuthMode`)

## Post-Action Checks

- Every post-action needs `actionId`
- `description` and `manualInstructions` recommended for user-facing actions

## Reporting

Report findings organized by severity:
1. **Errors** (must fix)
2. **Warnings** (should fix)
3. **Suggestions** (nice to have)
