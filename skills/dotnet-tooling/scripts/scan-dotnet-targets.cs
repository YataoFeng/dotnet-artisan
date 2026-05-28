// scan-dotnet-targets — Scans repository for .NET TFM and SDK version signals.
// Usage: dotnet run [--root <path>] [--json]

using System.Text.Json;
using System.Text.RegularExpressions;
using System.Collections.Immutable;

var root = args switch
{
    ["--root", var r] => new DirectoryInfo(r),
    ["--json", ..] => new DirectoryInfo("."),
    _ => new DirectoryInfo(".")
};

var jsonMode = args.Contains("--json");

if (!root.Exists)
{
    Console.Error.WriteLine($"ERROR: Not a directory: {root.FullName}");
    return 2;
}

var results = new ScanResults(root.FullName);

// Scan .csproj/.fsproj/.vbproj/Directory.Build.props/targets
var projectTfms = new Dictionary<string, List<string>>();
foreach (var file in root.EnumerateFiles("*.*", SearchOption.AllDirectories)
    .Where(f => f.Extension is ".csproj" or ".fsproj" or ".vbproj" ||
                f.Name is "Directory.Build.props" or "Directory.Build.targets"))
{
    var text = File.ReadAllText(file.FullName);
    AddMatches(text, @"<TargetFramework>\s*([^<]+?)\s*</TargetFramework>", file, projectTfms);
    AddMatches(text, @"<TargetFrameworks>\s*([^<]+?)\s*</TargetFrameworks>", file, projectTfms, split: ';');
    AddMatches(text, @"<TargetFrameworkVersion>\s*([^<]+?)\s*</TargetFrameworkVersion>", file, projectTfms);
}

results.ProjectTargetFrameworks = projectTfms;

// Scan .cs files for file-based TFM
var fileBasedTfms = new Dictionary<string, List<string>>();
var fileBasedRegex = new Regex(@"^\s*#:\s*property\s+TargetFramework\s*=\s*([^\s]+)", RegexOptions.Multiline | RegexOptions.IgnoreCase);
foreach (var file in root.EnumerateFiles("*.cs", SearchOption.AllDirectories))
{
    var text = File.ReadAllText(file.FullName);
    AddMatches(text, fileBasedRegex, file, fileBasedTfms);
}
results.FileBasedTargetFrameworks = fileBasedTfms;

// Read global.json
var globalJsonPath = Path.Combine(root.FullName, "global.json");
if (File.Exists(globalJsonPath))
{
    try
    {
        using var doc = JsonDocument.Parse(File.ReadAllText(globalJsonPath));
        if (doc.RootElement.TryGetProperty("sdk", out var sdk) && sdk.TryGetProperty("version", out var ver))
        {
            results.GlobalJsonSdkVersion = ver.GetString();
            results.GlobalJsonPath = globalJsonPath;
        }
    }
    catch { }
}

// Scan workflow files for dotnet-version
var workflowVersions = new Dictionary<string, List<string>>();
var workflowDir = new DirectoryInfo(Path.Combine(root.FullName, ".github", "workflows"));
if (workflowDir.Exists)
{
    var workflowRegex = new Regex(@"dotnet-version\s*:\s*['""]?([^'""\n#]+)", RegexOptions.IgnoreCase);
    foreach (var file in workflowDir.EnumerateFiles("*.yml").Concat(workflowDir.EnumerateFiles("*.yaml")))
    {
        var text = File.ReadAllText(file.FullName);
        AddMatches(text, workflowRegex, file, workflowVersions);
    }
}
results.WorkflowDotnetVersions = workflowVersions;

// Infer current target
results.InferredTarget = InferTarget(projectTfms, fileBasedTfms, results.GlobalJsonSdkVersion, workflowVersions);

// Output
var json = JsonSerializer.Serialize(results, new JsonSerializerOptions { WriteIndented = true });
if (jsonMode)
    Console.WriteLine(json);
else
    PrintReport(results);

return 0;

static void AddMatches(string text, string pattern, FileInfo file, Dictionary<string, List<string>> target, char? split = null)
    => AddMatches(text, new Regex(pattern, RegexOptions.IgnoreCase), file, target, split);

static void AddMatches(string text, Regex regex, FileInfo file, Dictionary<string, List<string>> target, char? split = null)
{
    foreach (Match match in regex.Matches(text))
    {
        var value = match.Groups[1].Value.Trim();
        if (string.IsNullOrEmpty(value)) continue;
        foreach (var item in split is char s ? value.Split(s).Select(x => x.Trim()).Where(x => x.Length > 0) : [value])
        {
            if (!target.ContainsKey(item)) target[item] = [];
            target[item].Add(file.FullName);
        }
    }
}

static string? InferTarget(Dictionary<string, List<string>> projectTfms, Dictionary<string, List<string>> fileTfms, string? sdkVersion, Dictionary<string, List<string>> workflowVersions)
{
    var explicitTfms = projectTfms.Keys.Concat(fileTfms.Keys)
        .Select(t => Regex.Match(t.ToLower(), @"^net(\d+)\.(\d+)"))
        .Where(m => m.Success)
        .Select(m => (Major: int.Parse(m.Groups[1].Value), Minor: int.Parse(m.Groups[2].Value), Tfm: m.Value))
        .OrderByDescending(x => x.Major).ThenByDescending(x => x.Minor)
        .ToList();

    if (explicitTfms.Count > 0)
        return explicitTfms[0].Tfm;

    if (sdkVersion is not null && Regex.Match(sdkVersion, @"^(\d+)").Groups[1] is Match sm && sm.Success)
        return $"net{sm.Value}.0";

    var wfVersions = workflowVersions.Keys
        .Select(v => Regex.Match(v, @"^(\d+)"))
        .Where(m => m.Success)
        .Select(m => (Major: int.Parse(m.Groups[1].Value)))
        .OrderByDescending(x => x.Major)
        .ToList();

    if (wfVersions.Count > 0)
        return $"net{wfVersions[0].Major}.0";

    return null;
}

static void PrintReport(ScanResults r)
{
    Console.WriteLine($"Repository: {r.RepoRoot}");
    PrintMap("Project target frameworks", r.ProjectTargetFrameworks);
    PrintMap("File-based target frameworks", r.FileBasedTargetFrameworks);
    Console.WriteLine($"global.json SDK: {r.GlobalJsonSdkVersion ?? "(none)"} {(r.GlobalJsonPath is not null ? $"({r.GlobalJsonPath})" : "")}");
    PrintMap("Workflow dotnet-version values", r.WorkflowDotnetVersions);
    Console.WriteLine($"Inferred current target: {r.InferredTarget ?? "(none)"}");
}

static void PrintMap(string title, Dictionary<string, List<string>> map)
{
    Console.WriteLine($"{title}:");
    if (map.Count == 0) { Console.WriteLine("  (none)"); return; }
    foreach (var kv in map.OrderBy(x => x.Key))
    {
        Console.WriteLine($"  - {kv.Key}");
        foreach (var path in kv.Value.Distinct().OrderBy(x => x))
            Console.WriteLine($"      {path}");
    }
}

record ScanResults(
    string RepoRoot,
    Dictionary<string, List<string>>? ProjectTargetFrameworks,
    Dictionary<string, List<string>>? FileBasedTargetFrameworks,
    string? GlobalJsonPath,
    string? GlobalJsonSdkVersion,
    Dictionary<string, List<string>>? WorkflowDotnetVersions,
    string? InferredTarget
)
{
    public ScanResults(string repoRoot) : this(
        repoRoot, null, null, null, null, null, null) { }
}
