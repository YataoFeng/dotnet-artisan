---
name: dotnet-ai
description: >
  .NET AI/ML 集成模式。涵盖 MCP 服务器/客户端创建调试、LLM 集成（Semantic Kernel、
  OpenAI、Azure AI）、RAG 流水线、ML.NET 模型训练推理及 AI 技术选型。构建 .NET AI 功能、
  创建 MCP 服务器、集成 LLM 或评估 AI 框架时加载。融合自 dotnet/skills dotnet-ai 插件
  + dotnet-artisan Semantic Kernel 参考。
---

# dotnet-ai

## Core Principles

1. **MCP for tool exposure** — Use Model Context Protocol (MCP) to expose .NET capabilities to AI agents. MCP is the standard protocol — prefer it over custom REST APIs for agent-tool communication.

2. **Semantic Kernel for orchestration** — Use Microsoft.SemanticKernel for multi-step AI workflows (planning, function calling, memory). Use raw HttpClient + OpenAI SDK for simple single-call scenarios.

3. **RAG = Retrieval + Generation** — The retrieval side matters more than the generation side. Invest in chunking strategy, embedding quality, and hybrid search (vector + keyword) before tuning prompts.

4. **ML.NET for production ML** — When you need a model that runs in-process without external API calls (cost, latency, offline), ML.NET is the answer. Otherwise, call an external model API.

## Technology Selection

| Scenario | Recommendation |
|----------|---------------|
| Expose .NET tools to AI agents | MCP server (ModelContextProtocol) |
| Multi-step AI workflows | Semantic Kernel |
| Simple LLM call | HttpClient + OpenAI SDK |
| In-process ML inference | ML.NET |
| Vector search | Microsoft.SemanticKernel.Connectors.* or Qdrant |
| RAG pipeline | Semantic Kernel + vector DB |
| AI agent with tools | Microsoft.Agents.AI |

## MCP (Model Context Protocol)

### Creating an MCP Server

```csharp
// Minimal MCP server exposing a .NET tool
#:sdk Microsoft.NET.Sdk.Web
#:package ModelContextProtocol

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddMcpServer();

var app = builder.Build();

app.MapMcpTool("get_weather", async (string city) =>
{
    // Your .NET logic here
    return new { City = city, Temp = 22.5, Condition = "Sunny" };
});

app.Run();
```

### MCP Debugging

- Test with `mcp-inspector` CLI tool
- Use `McpServerOptions.Validate()` for startup validation
- Log all tool invocations at Debug level for troubleshooting

## RAG Pipeline Pattern

1. **Document ingestion** — Chunk documents, generate embeddings (Azure OpenAI / OpenAI)
2. **Storage** — Store chunks + vectors in Qdrant, Azure AI Search, or pgvector
3. **Retrieval** — Hybrid search: vector similarity + keyword (BM25)
4. **Generation** — Send retrieved context + user query to LLM

```csharp
// Semantic Kernel RAG example
var kernel = Kernel.CreateBuilder()
    .AddAzureOpenAIChatCompletion(deploymentName, endpoint, apiKey)
    .AddQdrantVectorStore(host)
    .Build();

// Query → search → generate
var response = await kernel.InvokePromptAsync(
    "Answer based on: {{$context}} \n Question: {{$question}}",
    new() { ["context"] = searchResults, ["question"] = userQuery });
```

## Anti-patterns

- **MCP for simple CRUD** — If you're not exposing tools to AI agents, use minimal APIs, not MCP
- **RAG without hybrid search** — Vector-only retrieval misses exact keyword matches
- **Embedding entire documents** — Chunk first; large embeddings lose semantic precision
- **Ignoring token costs** — Cache embeddings, use streaming responses, set max_tokens
