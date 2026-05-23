# Message Plugin — Leave a Message

::: tip Plugin
This is a plugin feature provided by **Empostor.Plugins.Message** (`cn.hayashiume.message`). It is not part of the core server.
:::

## Overview

The Message plugin allows players to leave messages for each other using their friend codes. It works like an offline messaging system — send a message to a friend, and they'll receive it the next time they join a game.

## Commands

### `#msg <friendcode> <message>`

Sends a message to a player identified by their friend code.

**Aliases:** `#message`, `#leave`

**Examples:**

```
#msg Name#1234 Hey, let's play again tomorrow!
#msg Friend#5678 GG, that was a fun game
```

**Constraints:**

- Friend code must be at least 4 characters
- Cannot send messages to yourself
- Message limited to 500 characters
- Maximum 10 pending messages per target

## How Delivery Works

1. Player A sends `#msg TargetFC Hello!`
2. The message is saved to `config/messages.json`
3. When player B (with `TargetFC`) spawns in any game, all pending messages are delivered as private chat
4. Messages are shown with sender name and timestamp

**Delivery format in chat:**

```
--- You have 2 pending message(s) ---
[05-23 14:30] <SenderName> Hello!
[05-22 09:15] <OtherPlayer> Good game yesterday!
```

## Storage

Messages are persisted to `config/messages.json` in JSON format:

```json
{
  "Name#1234": [
    {
      "id": "abc123...",
      "sender_name": "PlayerA",
      "sender_fc": "PlayerA#5678",
      "target_fc": "Name#1234",
      "content": "Hello!",
      "timestamp": "2026-05-23T06:30:00Z"
    }
  ]
}
```

Messages are removed from storage once delivered successfully.

## Translations

The plugin includes translations for:
- English (`en`)
- Simplified Chinese (`zh_CN`)
- Traditional Chinese (`zh_TW`)

## Configuration

| Setting | Default | Description |
|---|---|---|
| `MessageMaxLength` | 500 | Maximum characters per message |
| `MaxMessagesPerTarget` | 10 | Max pending messages per recipient |

Configure via `config/Message.json`:

```json
{
  "max_messages_per_target": 10,
  "message_max_length": 500
}
```
