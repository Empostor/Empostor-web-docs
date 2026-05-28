# 配置服务器

本部分涵盖安装、配置和运行 Empostor 服务器所需的一切内容。

---

## 入门指南

### 安装与设置

- **[运行服务器](Running-the-server.md)** — 通过普通安装或 Docker 安装 Empostor。涵盖端口转发、区域文件和首次启动。
- **[从源码构建](Building-from-source.md)** — 从源代码构建 Empostor，用于自定义修改或开发。
- **[HTTP 服务器（反向代理）](Http-server.md)** — 使用 Caddy、nginx 或其他反向代理设置 HTTPS 访问。

### 服务器配置

- **[服务器配置](Server-configuration.md)** — `config.json` 完整参考。涵盖所有部分：Server、HttpServer、AntiCheat、Compatibility、Debug、Admin、DiscordWebhook、PlayerStats、ChatFilter 和 Serilog 日志。还包括环境变量覆盖和 systemd 服务设置。

---

## 故障排除

- **[常见问题](FAQ.md)** — 常见问题的解答。
- **[故障排除](TROUBLESHOOTING.md)** — 常见问题及解决方法。
