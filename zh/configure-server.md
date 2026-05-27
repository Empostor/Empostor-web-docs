# 配置服务器

本部分涵盖设置、配置和管理 Empostor 服务器所需的一切内容。

---

## 入门指南

### 安装与设置

- **[运行服务器](Running-the-server.md)** — 通过普通安装或 Docker 安装 Empostor。涵盖端口转发、区域文件和首次启动。
- **[从源码构建](Building-from-source.md)** — 从源代码构建 Empostor，用于自定义修改或开发。
- **[HTTP 服务器（反向代理）](Http-server.md)** — 使用 Caddy、nginx 或其他反向代理设置 HTTPS 访问。
- **[升级指南](Upgrading.md)** — 如何在 Empostor 版本之间安全升级。

### 服务器配置

- **[服务器配置](Server-configuration.md)** — `config.json` 完整参考。涵盖所有部分：Server、HttpServer、AntiCheat、Compatibility、Debug、Admin、DiscordWebhook、PlayerStats、ChatFilter 和 Serilog 日志。还包括环境变量覆盖和 systemd 服务设置。

---

## 功能特性

### 管理面板

**[管理面板](Admin-panel.md)** 是一个内置的 Web 界面，位于 `http://your-server:22023/admin`。提供以下功能：

| 功能 | 描述 |
|---|---|
| 仪表盘 | 实时服务器统计：游戏、玩家、封禁、运行时间 |
| 游戏管理 | 列出活跃游戏、查看玩家、结束游戏 |
| 客户端管理 | 查看已连接客户端及模组详情 |
| 广播 | 向所有活跃游戏发送消息 |
| 踢出/封禁 | 按 ID、IP 或好友代码移除或封禁玩家 |
| 隐私切换 | 切换游戏的公开/私密状态 |
| 插件市场 | 从市场 URL 浏览和安装插件 |
| 更新检查 | 将运行版本与最新 GitHub 发布版进行比较 |
| 举报 | 查看游戏内玩家举报 |
| 玩家日志 | 浏览每个玩家的活动日志 |
| 统计 | 跟踪每个玩家的游戏统计 |
| 聊天过滤 | 配置屏蔽词和刷屏保护 |

### 聊天过滤

**[聊天过滤](Admin-panel.md#聊天过滤)** 提供内置的游戏内聊天管理功能。配置屏蔽词、切换阻止/仅记录模式，以及设置刷屏速率限制——全部可在管理面板中完成。

### Discord 通知

**[Discord 通知](Discord-webhook.md)** 将游戏事件直接发送到 Discord 频道。包括游戏创建、玩家加入、举报、封禁和游戏结束的通知。

### 玩家统计

**[统计](Admin-panel.md#统计)** 跟踪每个玩家的游戏数据：胜场、败场、内鬼胜场、击杀、死亡、完成任务等。可在管理面板和 `/stat` 命令中查看。

### 插件市场

**[插件市场](Admin-panel.md#插件市场)** 允许管理员从管理面板浏览和安装社区插件。插件在 `plugins.json` 文件中定义——详情请参阅格式参考。

---

## 故障排除

- **[常见问题](FAQ.md)** — 常见问题的解答。
- **[故障排除](TROUBLESHOOTING.md)** — 常见问题及解决方法。
