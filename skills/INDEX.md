# 技能参考索引

全部参考文件快速导航。每个文件包含实现模式 + 反模式。

**快速跳转:** [核心](#核心常驻加载) · [C#](#c-语言) · [API](#api--后端) · [UI](#界面) · [测试](#测试) · [DevOps](#devops) · [工具](#工具)

## 核心（常驻加载）

| 文件 | 主题 |
|------|------|
| [coding-standards.md](dotnet-csharp/references/coding-standards.md) | 命名、文件布局、代码风格 |
| [async-patterns.md](dotnet-csharp/references/async-patterns.md) | Async/await、ConfigureAwait、取消 |
| [solid-principles.md](dotnet-csharp/references/solid-principles.md) | SOLID、DRY、反模式检测 |
| [code-smells.md](dotnet-csharp/references/code-smells.md) | 常见错误（async void、DI 误用、吞异常）|
| [anti-patterns.md](dotnet-csharp/references/anti-patterns.md) | 10 组好/坏代码对比 |
| [dotnet-releases.md](dotnet-csharp/references/dotnet-releases.md) | .NET/C# 版本特性与破坏性变更 |
| [DECISIONS.md](DECISIONS.md) | "什么时候用什么" — 决策指南交叉引用 |
| [CHEATSHEET.md](CHEATSHEET.md) | 一页全规则摘要 — 上下文刷新用 |
| [package-choices.md](dotnet-csharp/references/package-choices.md) | 商业 → 免费/开源替代方案 |

## C# 语言

| 文件 | 主题 |
|------|------|
| [modern-patterns.md](dotnet-csharp/references/modern-patterns.md) | Record、模式匹配、主构造函数、集合表达式 |
| [dependency-injection.md](dotnet-csharp/references/dependency-injection.md) | MS DI、Keyed 服务、生命周期、作用域验证 |
| [configuration.md](dotnet-csharp/references/configuration.md) | Options 模式、User Secrets、ValidateOnStart |
| [nullable-reference-types.md](dotnet-csharp/references/nullable-reference-types.md) | NRT 注解、迁移、常见错误 |
| [serialization.md](dotnet-csharp/references/serialization.md) | System.Text.Json、Protobuf、AOT 兼容 |
| [channels.md](dotnet-csharp/references/channels.md) | Channel\<T\>、有界/无界、背压 |
| [concurrency-patterns.md](dotnet-csharp/references/concurrency-patterns.md) | lock、SemaphoreSlim、并发集合 |
| [domain-modeling.md](dotnet-csharp/references/domain-modeling.md) | 聚合根、值对象、领域事件 |
| [linq-optimization.md](dotnet-csharp/references/linq-optimization.md) | IQueryable vs IEnumerable、分配 |
| [source-generators.md](dotnet-csharp/references/source-generators.md) | IIncrementalGenerator、GeneratedRegex |
| [api-design.md](dotnet-csharp/references/api-design.md) | 命名、参数排序、返回类型 |
| [type-design-performance.md](dotnet-csharp/references/type-design-performance.md) | struct vs class、sealed、Span/Memory |
| [globalization.md](dotnet-csharp/references/globalization.md) | CultureInfo、StringComparison、编码 |
| [native-interop.md](dotnet-csharp/references/native-interop.md) | P/Invoke、LibraryImport、编组 |
| [wasm-interop.md](dotnet-csharp/references/wasm-interop.md) | JSImport/JSExport、浏览器 WASM |
| [roslyn-analyzers.md](dotnet-csharp/references/roslyn-analyzers.md) | DiagnosticAnalyzer、CodeFixProvider |
| [editorconfig.md](dotnet-csharp/references/editorconfig.md) | IDE/CA 严重性、globalconfig |
| [file-io.md](dotnet-csharp/references/file-io.md) | FileStream、RandomAccess、路径 |
| [input-validation.md](dotnet-csharp/references/input-validation.md) | DataAnnotations、.NET 10 AddValidation |
| [validation-patterns.md](dotnet-csharp/references/validation-patterns.md) | IValidatableObject、IValidateOptions |

## API & 后端

| 文件 | 主题 |
|------|------|
| [minimal-apis.md](dotnet-api/references/minimal-apis.md) | 端点过滤器、路由组、TypedResults |
| [efcore-patterns.md](dotnet-api/references/efcore-patterns.md) | DbContext、迁移、拦截器、编译查询 |
| [efcore-architecture.md](dotnet-api/references/efcore-architecture.md) | DbContext 生命周期、多租户、分片 |
| [http-client.md](dotnet-api/references/http-client.md) | IHttpClientFactory、类型化客户端 |
| [resilience.md](dotnet-api/references/resilience.md) | Polly v8、断路器、重试、超时 |
| [messaging-patterns.md](dotnet-api/references/messaging-patterns.md) | 事务性发件箱、服务总线、Wolverine |
| [middleware-patterns.md](dotnet-api/references/middleware-patterns.md) | 自定义中间件、错误处理、ProblemDetails |
| [grpc.md](dotnet-api/references/grpc.md) | Proto 契约、流、拦截器 |
| [hybrid-cache.md](dotnet-api/references/hybrid-cache.md) | HybridCache、防缓存击穿、L1/L2 |
| [output-caching.md](dotnet-api/references/output-caching.md) | 输出缓存、缓存策略、失效 |
| [openapi.md](dotnet-api/references/openapi.md) | OpenAPI 生成、Scalar、文档转换器 |
| [api-versioning.md](dotnet-api/references/api-versioning.md) | URL/Header 版本化、Sunset 头 |
| [architecture-patterns.md](dotnet-api/references/architecture-patterns.md) | 整洁架构、模块化单体 |
| [architecture-patterns-vsa.md](dotnet-api/references/architecture-patterns-vsa.md) | 垂直切片架构、功能文件夹 |
| [identity-setup.md](dotnet-api/references/identity-setup.md) | ASP.NET Identity、JWT、基于策略授权 |
| [security-owasp.md](dotnet-api/references/security-owasp.md) | OWASP Top 10、SQL 注入、XSS、加密 |
| [api-security.md](dotnet-api/references/api-security.md) | CORS、CSP、速率限制、数据保护 |
| [aspire-patterns.md](dotnet-api/references/aspire-patterns.md) | .NET Aspire、服务默认值、编排 |
| [background-services.md](dotnet-api/references/background-services.md) | IHostedService、BackgroundService |
| [secrets-management.md](dotnet-api/references/secrets-management.md) | User Secrets、Key Vault、环境变量 |
| [semantic-kernel.md](dotnet-api/references/semantic-kernel.md) | AI 编排、插件、规划器 |
| [cryptography.md](dotnet-api/references/cryptography.md) | AES-GCM、HMAC、PBKDF2、SHA256 |
| [yarp.md](dotnet-api/references/yarp.md) | 反向代理、请求转换 |
| [file-based-apps.md](dotnet-api/references/file-based-apps.md) | 单文件 .NET 应用、脚本 |
| [office-documents.md](dotnet-api/references/office-documents.md) | Excel、Word、PowerPoint 生成 |

## 界面

| 文件 | 主题 |
|------|------|
| [blazor-patterns.md](dotnet-ui/references/blazor-patterns.md) | 渲染模式、JS 互操作、预渲染 |
| [blazor-components.md](dotnet-ui/references/blazor-components.md) | 组件设计、参数、级联值 |
| [blazor-auth.md](dotnet-ui/references/blazor-auth.md) | 认证状态、策略、重定向 |
| [maui-development.md](dotnet-ui/references/maui-development.md) | MAUI 页面、导航、MVVM |
| [uno-platform.md](dotnet-ui/references/uno-platform.md) | Uno Platform 模式、多目标 |
| [winui.md](dotnet-ui/references/winui.md) | WinUI 3、Windows 应用 SDK |
| [wpf-modern.md](dotnet-ui/references/wpf-modern.md) | .NET 8+ 上的 WPF、Fluent 主题 |
| [accessibility.md](dotnet-ui/references/accessibility.md) | ARIA、SemanticProperties、键盘导航 |
| [localization.md](dotnet-ui/references/localization.md) | .resx、RTL、文化支持 |
| [ui-chooser.md](dotnet-ui/references/ui-chooser.md) | 为场景选择合适的 .NET UI 框架 |

## 测试

| 文件 | 主题 |
|------|------|
| [testing-strategy.md](dotnet-testing/references/testing-strategy.md) | 测试金字塔、测什么、何时 Mock |
| [test-quality.md](dotnet-testing/references/test-quality.md) | 测试异味、CRAP 分数、覆盖率分析 |
| [xunit.md](dotnet-testing/references/xunit.md) | xUnit v3、Fact、Theory、IAsyncLifetime |
| [integration-testing.md](dotnet-testing/references/integration-testing.md) | WebApplicationFactory、Testcontainers |
| [playwright.md](dotnet-testing/references/playwright.md) | E2E 浏览器测试 |
| [benchmarkdotnet.md](dotnet-testing/references/benchmarkdotnet.md) | 微基准测试、内存诊断器 |
| [snapshot-testing.md](dotnet-testing/references/snapshot-testing.md) | Verify、快照擦洗 |

## DevOps

| 文件 | 主题 |
|------|------|
| [gha-patterns.md](dotnet-devops/references/gha-patterns.md) | GitHub Actions、dotnet 设置、缓存、部署 |
| [containers.md](dotnet-devops/references/containers.md) | Docker 多阶段、非 root、健康检查 |
| [observability.md](dotnet-devops/references/observability.md) | OpenTelemetry、指标、追踪 |
| [structured-logging.md](dotnet-devops/references/structured-logging.md) | Serilog、消息模板、PII 遮蔽 |

## 工具

| 文件 | 主题 |
|------|------|
| [project-structure.md](dotnet-tooling/references/project-structure.md) | .slnx、CPM、Directory.Build.props |
| [scaffold-project.md](dotnet-tooling/references/scaffold-project.md) | dotnet new、项目模板 |
| [build-analysis.md](dotnet-tooling/references/build-analysis.md) | 构建错误、警告、并行构建 |
| [version-upgrade.md](dotnet-tooling/references/version-upgrade.md) | net8→9→10→11 迁移、破坏性变更 |
| [version-detection.md](dotnet-tooling/references/version-detection.md) | TFM 检测、SDK 版本解析 |

## 结构

每个参考文件遵循: **核心原则 → 模式（代码示例）→ 反模式（好/坏代码）→ 决策指南 → 外部引用**

参见 [DECISIONS.md](DECISIONS.md) 获取整合的决策指南交叉引用。
