# Empostor Plugin Multi-Language (i18n) System

## Overview

Empostor provides two multi-language mechanisms for plugins:

1. **Plugin Language Provider** — structured key-value translations via `IPluginLanguageProvider`
2. **Text File Messages** — simple per-language `.txt` files for custom messages (used by Welcome plugin)

---

## 1. Plugin Language Provider (`IPluginLanguageProvider`)

For plugins that need translated UI strings (commands, notifications, etc.).

### How to use

Implement `IPluginLanguageProvider` on your plugin class:

```csharp
[EmpostorPlugin("com.example.myplugin")]
public sealed class MyPlugin : PluginBase, IPluginLanguageProvider
{
    public IReadOnlyDictionary<string, IReadOnlyDictionary<string, string>> GetTranslations()
    {
        return new Dictionary<string, IReadOnlyDictionary<string, string>>
        {
            ["en"] = new Dictionary<string, string>
            {
                ["myplugin.hello"] = "Hello, {0}!",
                ["myplugin.goodbye"] = "Goodbye!",
            },
            ["zh_CN"] = new Dictionary<string, string>
            {
                ["myplugin.hello"] = "你好，{0}！",
                ["myplugin.goodbye"] = "再见！",
            },
        };
    }
}
```

### Supported language codes

| Code   | Language            |
|--------|---------------------|
| `en`   | English             |
| `zh_CN`| Simplified Chinese  |
| `zh_TW`| Traditional Chinese |
| `ko`   | Korean              |
| `ru`   | Russian             |
| `de`   | German              |
| `fr`   | French              |
| `ja`   | Japanese            |
| `pt`   | Portuguese          |
| `pt_BR`| Brazilian Portuguese|
| `es`   | Spanish             |
| `it`   | Italian             |
| `nl`   | Dutch               |
| `fil`  | Filipino            |
| `ga`   | Irish               |

### Using translations in commands

```csharp
public async ValueTask<bool> ExecuteAsync(CommandContext ctx)
{
    // ctx.Lang.Get(key, language) returns LanguageString
    string msg = ctx.Lang.Get("myplugin.hello", ctx.SenderLanguage)
        .Replace("{0}", ctx.Sender.Client.Name);

    await ctx.PlayerControl.SendChatToPlayerAsync(msg, ctx.PlayerControl);
}
```

### LanguageString API

```csharp
var str = ctx.Lang.Get("key", lang);

str.Replace("{Name}", value)           // replace single placeholder
str.ReplaceAll(("{0}", a), ("{1}", b))  // replace multiple
str.Format(args)                        // string.Format style
str.Get()                               // get raw string
```

---

## 2. Text File Messages (Welcome Plugin)

The Welcome plugin uses per-language `.txt` files under the `Message/` directory.

### File naming

`Message/{Language}HelloWord.txt`

Examples:
- `Message/EnglishHelloWord.txt`
- `Message/SChineseHelloWord.txt`

### Available placeholders (v1.1.0)

| Placeholder      | Description                | Example                    |
|------------------|----------------------------|----------------------------|
| `{Name}`         | Player display name        | `Alice`                    |
| `{Room}`         | Room code                  | `ABCDEF`                   |
| `{FriendCode}`   | Player friend code         | `matchduck#1337`               |
| `{LastConnect}`  | Last disconnect time (UTC) | `2026-05-24 15:30:00`      |

`{LastConnect}` shows "First time here!" for new players.

### Customizing

Edit the `.txt` files directly. The plugin reads them on each join.

Example `Message/EnglishHelloWord.txt`:
```
Welcome back, {Name}! Room: {Room}
Last seen: {LastConnect}
```

---

## 3. Adding translations to the core server

Core server translations live in `Languages/*.json` files. To add new keys, edit `LanguageService.cs` in `Empostor.Api/Languages/` and add the key to the `Default{Code}` constant strings.

---

## 4. Best practices

1. Always provide an English (`en`) fallback — it's used when a player's language is not found.
2. Keep translation keys namespaced: `pluginname.key_name`.
3. Use `{0}`, `{1}` for positional placeholders in core translations, or named placeholders for text file messages.
4. Register `IPluginLanguageProvider` on your plugin class — translations are auto-loaded at startup.
