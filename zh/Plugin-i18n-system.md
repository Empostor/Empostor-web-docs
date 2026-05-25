# Empostor 插件多语言 (i18n) 系统

## 概述

Empostor 为插件提供两种多语言机制：

1. **插件语言提供者** — 通过 `IPluginLanguageProvider` 接口提供结构化的键值翻译
2. **文本文件消息** — 简单的按语言分的 `.txt` 文件（Welcome 插件使用）

---

## 1. 插件语言提供者 (`IPluginLanguageProvider`)

适用于需要翻译界面字符串的插件（命令、通知等）。

### 如何使用

在你的插件类上实现 `IPluginLanguageProvider`：

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

### 支持的语言代码

| 代码   | 语言     |
|--------|----------|
| `en`   | 英语     |
| `zh_CN`| 简体中文 |
| `zh_TW`| 繁体中文 |
| `ko`   | 韩语     |
| `ru`   | 俄语     |
| `de`   | 德语     |
| `fr`   | 法语     |
| `ja`   | 日语     |
| `pt`   | 葡萄牙语 |
| `pt_BR`| 巴西葡萄牙语 |
| `es`   | 西班牙语 |
| `it`   | 意大利语 |
| `nl`   | 荷兰语   |
| `fil`  | 菲律宾语 |
| `ga`   | 爱尔兰语 |

### 在命令中使用翻译

```csharp
public async ValueTask<bool> ExecuteAsync(CommandContext ctx)
{
    // ctx.Lang.Get(key, language) 返回 LanguageString
    string msg = ctx.Lang.Get("myplugin.hello", ctx.SenderLanguage)
        .Replace("{0}", ctx.Sender.Client.Name);

    await ctx.PlayerControl.SendChatToPlayerAsync(msg, ctx.PlayerControl);
}
```

### LanguageString API

```csharp
var str = ctx.Lang.Get("key", lang);

str.Replace("{Name}", value)           // 替换单个占位符
str.ReplaceAll(("{0}", a), ("{1}", b))  // 替换多个占位符
str.Format(args)                        // string.Format 风格
str.Get()                               // 获取原始字符串
```

---

## 2. 文本文件消息（Welcome 插件）

Welcome 插件使用 `Message/` 目录下按语言分的 `.txt` 文件。

### 文件命名规则

`Message/{Language}HelloWord.txt`

示例：
- `Message/EnglishHelloWord.txt`
- `Message/SChineseHelloWord.txt`

### 可用占位符（v1.1.0）

| 占位符          | 描述               | 示例                       |
|-----------------|--------------------|----------------------------|
| `{Name}`        | 玩家显示名称       | `Alice`                    |
| `{Room}`        | 房间代码           | `ABCDEF`                   |
| `{FriendCode}`  | 玩家好友代码       | `Alice#1234`               |
| `{LastConnect}` | 上次断连时间 (UTC) | `2026-05-24 15:30:00`      |

`{LastConnect}` 对新玩家显示 "首次光临，欢迎！"。

### 自定义欢迎消息

直接编辑 `.txt` 文件。插件在每次玩家加入时读取。

示例 `Message/SChineseHelloWord.txt`：
```
欢迎回来，{Name}！房间：{Room}
上次在线：{LastConnect}
```

---

## 3. 向服务器核心添加翻译

核心服务器翻译位于 `Languages/*.json` 文件。要添加新键，编辑 `Empostor.Api/Languages/` 中的 `LanguageService.cs`，将键添加到 `Default{Code}` 常量字符串中。

---

## 4. 最佳实践

1. 始终提供英语 (`en`) 回退 — 当玩家的语言未找到时使用。
2. 使用命名空间化的翻译键：`插件名.键名`。
3. 在核心翻译中使用 `{0}`、`{1}` 占位符，或文本文件消息中使用命名占位符。
4. 在插件类上注册 `IPluginLanguageProvider` — 翻译将在启动时自动加载。
5. 若未提供中文 (`zh_CN`) 翻译，系统会自动回退到英语。
