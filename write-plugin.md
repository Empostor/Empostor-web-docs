# Write Plugin

Empostor has a powerful plugin system. This section covers everything you need to develop, publish, and use plugins.

---

## Plugin Development

### Getting Started

**[Writing a Plugin](Writing-a-plugin.md)** is the complete step-by-step guide:

1. Install the .NET SDK
2. Create a C# class library project
3. Add the `Empostor.Api` NuGet package
4. Write your plugin class (extend `PluginBase`)
5. Add event listeners (`IEventListener` with `[EventListener]` attributes)
6. Register listeners in `EnableAsync()`
7. Build, copy to `plugins/`, and run

Topics covered: dependency injection, server configuration for plugin paths, using external libraries, and version compatibility.

### Internationalization (i18n)

**[Internationalization (i18n)](Writing-a-plugin.md#internationalization-i18n)** — translate your plugin into 15 languages using the `IPluginLanguageProvider` interface. Includes the `LanguageString` API for placeholder replacement and formatting. For text-file-based messages, see [HelloWorld.txt](configurable-files.md#messages-helloworld-txt).

### Hello Page

**[Hello Page](Hello-page.md)** documents how Empostor serves a customizable home page at `http://your-server:22023/`. On startup, the server creates a `Pages/index.html` file that you can edit freely — changes take effect without restarting.

---

## Built-in Plugins

Empostor ships with several plugins that demonstrate the plugin API:

| Plugin | Description | Docs |
|---|---|---|
| **Boot.Codes** | Replace random game codes with human-readable words like SUNSET, ROCKET. Uses custom word lists. | [Boot.Codes](Boot-code.md) |
| **Message** | Leave offline messages for players by friend code. Messages are delivered when the recipient joins. | [Message Plugin](Message-plugin.md) |
| **Player Channel** | Cross-game chat channels based on friend codes. Communicate with friends across different lobbies. | [Player Channel](Player-channel-plugin.md) |
| **Chat Manager** | Log all in-game chat and enforce configurable message length limits for players and hosts. | [Chat Manager](Chat-plugin.md) |

---

## Plugin Marketplace

The **[Plugin Marketplace](Admin-panel.md#plugin-marketplace)** allows server admins to browse and install plugins from the admin panel. Learn the `plugins.json` format to publish your own plugins:

- Plugin metadata (id, name, description, author)
- Version history with download URLs
- Minimum Empostor version requirements
- Multi-version support with version picker in the admin UI

