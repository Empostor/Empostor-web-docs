# 聊天过滤

Empostor 可以通过屏蔽特定词汇和限制消息发送频率来过滤游戏内聊天消息。这有助于服务器管理员维护更健康的聊天环境。

此功能**默认禁用**。在 `config.json` 中启用或从管理面板激活过滤。

## 管理面板

管理面板的监控部分下有**聊天过滤**标签页，可在运行时管理所有设置，无需编辑 `config.json` 或重启服务器：

- **启用/禁用**过滤复选框
- **添加/移除屏蔽词** — 输入词汇并点击添加，或点击任意标签上的 × 移除
- **垃圾消息设置** — 调整消息阈值和时间窗口
- **拦截/记录切换** — 选择拦截消息还是仅记录警告

通过管理面板更改的设置立即生效但仅限运行时——服务器重启后丢失。如需永久设置，请编辑 `config.json`。

## 配置

将 `ChatFilter` 部分添加到 `config.json`：

```json
{
  "ChatFilter": {
    "Enabled": false,
    "BlockedWords": [],
    "BlockMessage": true,
    "SpamThreshold": 5,
    "SpamWindowSeconds": 10
  }
}
```

| 键 | 默认值 | 描述 |
| :--- | :--- | :--- |
| **Enabled** | `false` | 是否启用聊天过滤。 |
| **BlockedWords** | `[]` | 要屏蔽的词汇列表。匹配**不区分大小写**并使用子串匹配（例如屏蔽 `"bad"` 也会屏蔽 `"badword"`）。 |
| **BlockMessage** | `true` | 是否实际拦截过滤的消息。为 `true` 时，消息被取消且不会到达其他玩家。为 `false` 时，消息通过但会记录警告。 |
| **SpamThreshold** | `5` | 在垃圾消息检测窗口内允许的消息数量，超过后触发频率限制。 |
| **SpamWindowSeconds** | `10` | 检测垃圾消息的滑动时间窗口（秒）。 |

## 过滤原理

### 词汇过滤

当玩家发送聊天消息时，会与 `BlockedWords` 列表进行比对：

1. 将消息文本与每个屏蔽词进行比对（不区分大小写的子串匹配）。
2. 如果找到匹配且 `BlockMessage` 为 `true`，消息被拦截——其他玩家不会看到。
3. 如果 `BlockMessage` 为 `false`，消息通过但会记录警告。

### 垃圾消息过滤

每个玩家有独立的滑动窗口来检测快速发送消息：

1. 每个玩家的每条聊天消息时间戳都会被记录。
2. 如果玩家在最近 `SpamWindowSeconds` 秒内发送了 `SpamThreshold` 条或更多消息，该消息根据 `BlockMessage` 设置处理。
3. 超出窗口的旧时间戳会自动丢弃。

两个过滤器独立运行——消息可能被词汇过滤或垃圾消息过滤中的任意一个拦截。

## 示例

屏蔽不当词汇并防止玩家在 5 秒内发送超过 3 条消息：

```json
{
  "ChatFilter": {
    "Enabled": true,
    "BlockedWords": ["badword1", "badword2"],
    "BlockMessage": true,
    "SpamThreshold": 3,
    "SpamWindowSeconds": 5
  }
}
```

## 故障排除

- **消息未被拦截**：确保 `Enabled` 为 `true` 且 `BlockedWords` 包含条目。注意匹配是基于子串的——短词汇可能会意外匹配。
- **误拦截**：在 `BlockedWords` 列表中使用更具体、更长的词汇。子串匹配意味着 `"ass"` 会匹配 `"pass"` 和 `"classic"`。
- **正常玩家被垃圾消息拦截**：增加 `SpamThreshold` 或减少 `SpamWindowSeconds`。默认值（5 条消息 / 10 秒）对正常对话来说足够宽松。
