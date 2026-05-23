# Discord Webhook 集成

Empostor 可以通过 [Webhook](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks) 向 Discord 频道发送游戏事件。每个事件以富文本嵌入消息的形式发送，包含相关详细信息。

此功能**默认禁用**。在 `config.json` 中启用并提供 Webhook URL 即可激活。

## 配置

将 `DiscordWebhook` 部分添加到 `config.json`：

```json
{
  "DiscordWebhook": {
    "Enabled": false,
    "WebhookUrl": "",
    "NotifyOnGameCreated": true,
    "NotifyOnBan": true,
    "NotifyOnReport": true,
    "NotifyOnPlayerJoin": false,
    "NotifyOnGameEnded": false
  }
}
```

| 键 | 默认值 | 描述 |
| :--- | :--- | :--- |
| **Enabled** | `false` | 是否启用 Discord Webhook 集成。 |
| **WebhookUrl** | `""` | 发送 POST 消息的 Discord Webhook URL。在 Discord 中通过频道设置 → 集成 → Webhook 创建。 |
| **NotifyOnGameCreated** | `true` | 创建新游戏大厅时发送通知。 |
| **NotifyOnBan** | `true` | 玩家被服务器封禁时发送通知。 |
| **NotifyOnReport** | `true` | 玩家举报其他玩家时发送通知。 |
| **NotifyOnPlayerJoin** | `false` | 玩家加入游戏大厅时发送通知。 |
| **NotifyOnGameEnded** | `false` | 游戏结束时发送通知。 |

## 事件

每条通知以带彩色侧边栏的 Discord 嵌入消息发送：

| 事件 | 嵌入颜色 | 字段 |
| :--- | :--- | :--- |
| 游戏创建 | 绿色 | 游戏代码、房主名称、房主好友代码 |
| 玩家被封禁 | 红色 | 玩家名称、好友代码、游戏代码 |
| 玩家被举报 | 黄色 | 举报者、被举报玩家、好友代码、游戏代码、原因 |
| 玩家加入 | 绿色 | 玩家名称、好友代码、游戏代码、玩家数量 |
| 游戏结束 | 紫色 | 游戏代码、结果、玩家数量 |

## 频率限制

为避免触及 Discord 的频率限制，同一游戏 2 秒内的重复事件会被抑制。

## 故障排除

- **Discord 中没有消息出现**：验证 `WebhookUrl` 是否正确以及 Webhook 在 Discord 频道中是否活跃。检查服务器日志中的 `[Discord]` 警告。
- **Webhook 返回 HTTP 错误**：Discord 可能进行了频率限制或 Webhook URL 可能无效。监听器会在失败时记录 HTTP 状态码。
- **事件触发但某些字段为空**：友好名称和好友代码从客户端数据读取——如果客户端尚未完全连接，某些字段可能为空（`—`）。
