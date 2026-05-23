# Boot.Codes — 自定义游戏代码

::: tip 插件功能
此功能由 **Empostor.Plugin.Code** 插件（`cn.hayashiume.code`）提供。需要安装并启用该插件才能使用。
:::

## 概述

Boot.Codes 用可读的单词替换默认的随机游戏代码。玩家加入的不再是 `ABCDEF` 这样的代码，而是像 `SUNSET`（日落）或 `ROCKET`（火箭）这样的房间。

## 工作原理

插件从服务器工作目录下的 `Boot.Codes/` 文件夹中读取单词列表。该文件夹中的每个 `.txt` 文件都被视为一个单词列表。当创建新游戏时，插件会随机选择一个未使用的单词作为房间代码。

## 文件夹结构

```
Empostor/
├── Boot.Codes/
│   ├── words.txt       (单词)
│   ├── animals.txt     (动物)
│   └── colors.txt      (颜色)
├── config/
├── plugins/
└── ...
```

## 单词列表格式

每个 `.txt` 文件中的每行是一个候选代码。以 `--` 开头的行被视为注释，空行会被跳过。

```
-- 常用单词
SUNSET
ROCKET
DRAGON
TEMPLE
JUNGLE

-- 动物
TIGGER
EAGGLE
PANDA
WHALE
```

## 规则

- 代码必须是 **4 或 6 个字符** 长
- 只允许大写字母 `A`–`Z`（与标准 Among Us 代码使用的字符相同）
- 无效行会被静默跳过
- 代码在启动时会被**随机打乱**
- 游戏结束后，代码会**归还**到池中以供重复使用

## 降级回退

如果 `Boot.Codes/` 文件夹不存在、为空或用完了所有代码，服务器会自动回退到默认的随机 6 字母代码生成器。

## 配置

此插件无需配置文件。只需创建 `Boot.Codes/` 文件夹并放入你的单词列表，然后重启服务器即可。

## FixedCode 插件

还有一个配套插件 **Empostor.Plugins.FixedCode**（`cn.hayashiume.fixedcode`），允许通过配置设置一个固定的游戏代码。适用于始终使用相同代码的私服。

```json
// config/FixedCode.json
{
  "code": "MYCODE"
}
```
