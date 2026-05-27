# Configure Server

This section covers everything you need to set up, configure, and manage your Empostor server.

---

## Getting Started

### Installation & Setup

- **[Running the Server](Running-the-server.md)** — Install Empostor via normal installation or Docker. Covers port forwarding, region files, and first launch.
- **[Building from Source](Building-from-source.md)** — Build Empostor from source code for custom modifications or development.
- **[HTTP Server (Reverse Proxy)](Http-server.md)** — Set up HTTPS access with Caddy, nginx, or other reverse proxies.
- **[Upgrading](Upgrading.md)** — How to upgrade between Empostor versions safely.

### Server Configuration

- **[Server Configuration](Server-configuration.md)** — Complete reference for `config.json`. Covers all sections: Server, HttpServer, AntiCheat, Compatibility, Debug, Admin, DiscordWebhook, PlayerStats, ChatFilter, and Serilog logging. Includes environment variable overrides and systemd service setup.

---

## Features

### Admin Panel

The **[Admin Panel](Admin-panel.md)** is a built-in web interface at `http://your-server:22023/admin`. It provides:

| Feature | Description |
|---|---|
| Dashboard | Live server stats: games, players, bans, uptime |
| Game Management | List active games, view players, end games |
| Client Management | View connected clients with mod details |
| Broadcast | Send messages to all active games |
| Kick / Ban | Remove or ban players by ID, IP, or friend code |
| Privacy Toggle | Switch games between public and private |
| Plugin Marketplace | Browse and install plugins from a marketplace URL |
| Update Check | Compare running version against latest GitHub release |
| Reports | View in-game player reports |
| Player Logs | Browse per-player activity logs |
| Statistics | Track per-player game statistics |
| Chat Filter | Configure blocked words and spam protection |

### Chat Filtering

**[Chat Filter](Admin-panel.md#chat-filter)** provides built-in moderation for in-game chat. Configure blocked words, toggle between blocking and logging, and set spam rate limits — all from the admin panel.

### Discord Webhook

**[Discord Webhook](Discord-webhook.md)** sends game events directly to a Discord channel. Notifications for game creation, player joins, reports, bans, and game endings.

### Player Statistics

**[Statistics](Admin-panel.md#statistics)** tracks per-player game data: wins, losses, impostor wins, kills, deaths, tasks completed, and more. Viewable in the admin panel and via `/stat` command.

### Plugin Marketplace

The **[Plugin Marketplace](Admin-panel.md#plugin-marketplace)** lets admins browse and install community plugins from the admin panel. Plugins are defined in a `plugins.json` file — see the format reference for details.

---

## Troubleshooting

- **[FAQ](FAQ.md)** — Answers to frequently asked questions.
- **[Troubleshooting](TROUBLESHOOTING.md)** — Common issues and how to resolve them.
