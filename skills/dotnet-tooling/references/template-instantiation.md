# Template Instantiation

Creating .NET projects from templates.

## Basic Usage

```bash
dotnet new webapi --name MyApi --output ./src/MyApi --framework net10.0
```

## Multi-Project Setup

```bash
dotnet new webapi --name MyApi --output ./src/MyApi
dotnet new xunit --name MyApi.Tests --output ./tests/MyApi.Tests
dotnet add ./tests/MyApi.Tests reference ./src/MyApi
dotnet sln add ./src/MyApi ./tests/MyApi.Tests
```

## CPM Adaptation

If `Directory.Packages.props` exists, after creation:
1. Move version attributes from `.csproj` to `Directory.Packages.props`
2. Remove `Version` from `.csproj` `<PackageReference>` entries

## Template Package Management

```bash
# Install template package
dotnet new install Microsoft.DotNet.Web.ProjectTemplates.10.0

# Uninstall
dotnet new uninstall Microsoft.DotNet.Web.ProjectTemplates.10.0
```

## Post-Creation

- [ ] Project builds: `dotnet build`
- [ ] CPM adapted if applicable
- [ ] Project added to solution if needed
