# 升级 Empostor

偶尔会对现有代码进行不兼容的更改。本文档列出这些变更以及服务器管理员需要做的调整。

## Empostor 1.9.0

之前推荐使用 Empostor.Http 插件进行 HTTP 匹配。由于 Among Us 现在依赖 HTTP 匹配，此插件已并入默认安装。因此需要做以下调整：

- 如果安装了 Empostor.Http，应移除此插件。如果修改过默认设置，需要将更改迁移到 [config.json 中的 HttpServer 部分](Server-configuration.md#HttpServer)。
- 如果有依赖 Empostor.Http API 的插件（如 Reactor.Empostor.Http），请检查这些插件的更新。
- 不再需要将 ASP.NET Core 文件夹添加到 PluginLoader 的 LibraryPaths 中。
