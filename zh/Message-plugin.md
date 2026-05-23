# 留言插件 — 离线留言系统

::: tip 插件功能
此功能由 **Empostor.Plugins.Message** 插件（`cn.hayashiume.message`）提供。它不是核心服务器的组成部分。
:::

## 概述

留言插件允许玩家使用好友代码互相留言。它的工作方式类似离线消息系统——给好友发送一条消息，对方下次加入游戏时就会收到。

## 命令

### `#msg <好友代码> <留言内容>`

向指定好友代码的玩家发送留言。

**别名：** `#message`、`#leave`

**示例：**

```
#msg Name#1234 明天再一起玩！
#msg Friend#5678 打得漂亮，那局真有意思
```

**限制：**

- 好友代码至少 4 个字符
- 不能给自己留言
- 留言最长 500 个字符
- 每个目标最多 10 条待收留言

## 投递机制

1. 玩家 A 发送 `#msg TargetFC 你好！`
2. 消息保存到 `config/messages.json`
3. 当玩家 B（好友代码为 `TargetFC`）在任何游戏中生成时，所有待收留言以私聊形式投递
4. 消息显示发送者名称和时间戳

**聊天中的投递格式：**

```
--- 你有 2 条待收留言 ---
[05-23 14:30] <SenderName> 你好！
[05-22 09:15] <OtherPlayer> 昨天打得不错！
```

## 存储

消息以 JSON 格式持久化到 `config/messages.json`：

```json
{
  "Name#1234": [
    {
      "id": "abc123...",
      "sender_name": "PlayerA",
      "sender_fc": "PlayerA#5678",
      "target_fc": "Name#1234",
      "content": "你好！",
      "timestamp": "2026-05-23T06:30:00Z"
    }
  ]
}
```

消息成功投递后即从存储中删除。

## 多语言支持

插件包含以下语言翻译：
- 英语（`en`）
- 简体中文（`zh_CN`）
- 繁体中文（`zh_TW`）

## 配置

| 设置 | 默认值 | 说明 |
|---|---|---|
| `MessageMaxLength` | 500 | 每条消息最大字符数 |
| `MaxMessagesPerTarget` | 10 | 每个收件人最多待收消息数 |

通过 `config/Message.json` 配置：

```json
{
  "max_messages_per_target": 10,
  "message_max_length": 500
}
```
