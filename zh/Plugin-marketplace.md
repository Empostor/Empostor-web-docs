# 插件市场格式

管理面板的插件市场在启动时读取 `marketplace/plugins.json`。

## JSON 结构

```jsonc
[
  {
    // 唯一插件标识符（推荐使用反向域名风格）
    "id": "cn.hayashiume.welcome",

    // 市场中显示的插件名称
    "name": "Welcome Messages",

    // 简短描述（显示为副标题）
    "description": "Sends a localised welcome message when players join a room.",

    // 作者署名
    "author": "BunchHanpiDev & HayashiUme",

    // 版本历史 — 最新版本应放在数组最后
    "versions": [
      {
        // 此插件版本的语义化版本号
        "version": "1.0.0",

        // 所需的最低 Empostor / Empostor 版本
        "empostor_version": "2.0.0",

        // .dll 文件的直接下载链接
        "download_url": "https://raw.githubusercontent.com/Empostor/Empostor/master/marketplace/Empostor.Plugins.Welcome.dll"
      }
    ]
  }
]
```

## 版本规则

- **`versions` 数组**：每个条目代表一个可下载的版本。旧版本放在前面，**最后一个条目**被视为最新版本并在管理面板界面中默认选中。
- **单版本插件**：只有一个条目的数组是有效的。版本下拉菜单隐藏，直接使用该唯一版本。
- **多版本插件**：当有两个或更多条目时，管理面板显示 `<select>` 下拉菜单，允许操作者选择要安装的版本。
- **`download_url`**：必须直接指向已编译的 `.dll` 插件文件。管理面板下载此 URL 并将文件保存到插件目录。

## 添加插件

1. 将 `.dll` 文件放在 `marketplace/` 中（或托管在可访问的 URL 上）。
2. 在 `plugins.json` 中添加包含上述字段的新条目。
3. 管理面板读取 `GET /api/admin/marketplace/plugins`，该接口返回完整的 `plugins.json` 内容——列表显示无需重启服务器，但安装插件后需要重启才能加载。
