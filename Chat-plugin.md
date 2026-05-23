# Chat Manager Plugin

::: tip Plugin
This is a plugin feature provided by **Empostor.Plugin.Chat** (`cn.hayashiume.chat`). It is not part of the core server.
:::

## Overview

The Chat Manager plugin logs all in-game chat messages and enforces configurable message length limits.

## Features

### Chat Logging

All player chat messages are logged to the server console with the player's name, friend code, and game code.

### Message Length Limits

Prevents excessively long messages in chat. Separate limits for regular players and the game host.

**Configuration (`config/boot_chat.json`):**

```json
{
  "playerMaxMessageLength": 300,
  "hostMaxMessageLength": 1200,
  "tooLongMessage": "Your message is too long!"
}
```

| Setting | Default | Description |
|---|---|---|
| `playerMaxMessageLength` | 300 | Max characters per message for regular players |
| `hostMaxMessageLength` | 1200 | Max characters per message for the host |
| `tooLongMessage` | `"Your message is too long!"` | Message shown when limit is exceeded |

## Comparison with Built-in Chat Filter

| Feature | Chat Manager (Plugin) | Chat Filter (Built-in) |
|---|---|---|
| Message length limits | Yes | No |
| Chat logging | Yes | No |
| Blocked words | No | Yes |
| Spam / rate limiting | No | Yes |
| Block vs log-only mode | No | Yes |

The two systems complement each other and can be used together.
