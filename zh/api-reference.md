# 相关 API

Empostor 提供多个 HTTP API，用于监控、集成和客户端匹配。

---

## 服务器监控 API

**[服务器监控](Server-monitoring.md)** 提供两个用于健康检查和状态仪表盘的公共端点：

### `GET /api/monitor/status`

返回详细的服务器状态，包括运行时间、资源使用情况和活跃游戏。

```json
{
  "status": "running",
  "timestamp": "2026-05-23T12:00:00.0000000Z",
  "uptime_seconds": 86400,
  "uptime_display": "1d 0h 0m",
  "version": "1.0.0",
  "runtime": ".NET 8.0.0",
  "platform": "Linux 5.15.0",
  "processors": 4,
  "memory_mb": 256,
  "game_count": 3,
  "player_count": 22,
  "active_connections": 30,
  "games": [
    {
      "code": "ABCDEF",
      "state": "Started",
      "map": "Skeld",
      "player_count": 10,
      "host": "PlayerName"
    }
  ]
}
```

### `GET /api/monitor/health`

用于负载均衡器和监控工具（Prometheus、Uptime Kuma）的简单健康检查。

```json
{ "status": "healthy", "timestamp": "2026-05-23T12:00:00.0000000Z" }
```

服务器健康时返回 HTTP 200。

---

## 隐私政策 API

**[隐私政策 API](Privacy-api.md)** 允许服务器管理员发布自定义隐私政策：

| 端点 | 方法 | 认证 | 描述 |
|---|---|---|---|
| `/privacy` | GET | 无 | 提供隐私政策 HTML 页面 |
| `/admin/api/privacy` | POST | 管理员令牌 | 更新隐私政策内容 |

隐私政策 HTML 存储在 `Pages/privacy.html` 中，重启后仍然保留。如果文件不存在，会创建一个默认模板，涵盖数据收集、使用、共享、保留和联系信息。

认证使用 `EMP_HTTP_TOKEN` 或 `EMP_ADMIN_TOKEN` 环境变量，如果两者都未设置，则回退到 `"empostor"`。

---

## 游戏列表 API

**[游戏列表 API](Game-api.md)** 处理 Among Us 客户端匹配，遵循 Innersloth 协议：

| 端点 | 方法 | 描述 |
|---|---|---|
| `/api/games` | GET | 旧版游戏列表（v16.0.0 之前的客户端），可按地图、语言、内鬼数筛选 |
| `/api/games` | POST | 旧版：获取特定游戏的服务器地址 |
| `/api/games` | PUT | 旧版：获取托管新游戏的服务器地址 |
| `/api/games/{gameId}` | GET | 通过整数代码获取特定游戏详情 |
| `/api/games/filtered` | GET | 现代大厅列表（v16.0.0+），返回所有公开游戏及元数据 |
| `/api/games/publicgames` | GET | 所有活跃游戏的 JSON 摘要，用于管理仪表盘和外部工具 |

游戏代码使用两种格式：6 字母字符串（`ABCDEF`）和内部整数表示。`GameCode` 类型可在两者之间透明转换。

### 公开游戏响应

`/api/games/publicgames` 端点返回清晰的 JSON 摘要：

```json
{
  "totalGames": 3,
  "totalPlayers": 22,
  "games": [
    {
      "code": "ABCDEF",
      "codeInt": 1234567890,
      "state": "Started",
      "isPublic": true,
      "playerCount": 10,
      "maxPlayers": 15,
      "map": "Skeld",
      "impostors": 2,
      "host": "HostName",
      "hostFriendCode": "Name#1234",
      "players": [
        {
          "name": "PlayerOne",
          "friendCode": "Name#5678",
          "isHost": false,
          "platform": "Steam"
        }
      ]
    }
  ]
}
```

---

---

## 验证 API

Empostor 通过外部验证服务获取玩家的好友代码来验证玩家身份。此过程在玩家登录时自动完成——无需玩家执行任何操作。

### 工作原理

1. 玩家登录其 Among Us 账户（EOS 认证）
2. Empostor 收到玩家的 EOS Token（JWT，由 Epic Online Services 签名）
3. Empostor 使用 EOS Token 调用配置的验证 API
4. API 返回玩家的好友代码（`PlayerName#1234`）
5. Empostor 分配好友代码，玩家加入游戏

### AuthApi 模式

在 `config.json` 的 `AuthApi` 下配置验证模式：

| 模式 | 描述 |
|---|---|
| `Innersloth` | 直接调用 Innersloth 官方 API。简单，无需外部服务。 |
| `Niko` | 使用 Niko 的 au-verify 服务。需要 NikoApiKey 和运行的验证服务器。 |
| `Ume` | 使用 UmeAuthService——轻量级 HTTP 代理。无需玩家操作。 |
| `Relay` | 自定义中继服务器。兼容任何验证后端。 |
| `Both` | 优先 Niko（若设置了自定义 ApiKey），其次 Ume，最后回退到 Innersloth。 |

```json
{
  "AuthApi": {
    "Mode": "Both",
    "NikoApiKey": "niko-request-api-key",
    "NikoApiBaseUrl": "https://au-verify.niko233.top",
    "RelayApiBaseUrl": "http://localhost:5100",
    "RelayApiKey": "empostor-relay-api-key-change-me",
    "UmeApiBaseUrl": "https://auverify.hayashiume.top",
    "UmeApiKey": "sk-empostor-globalapikey"
  }
}
```

### UmeAuthService

[UmeAuthService](https://auverify.hayashiume.top) 是一个轻量级中继 API，将 EOS Token 代理到 Innersloth，并在一次响应中返回配对的 **PUID + 好友代码**。与 Niko 的 au-verify 不同，玩家无需加入验证服务器。

Empostor 内置了 ApiKey（`sk-empostor-globalapikey`）——只需将 `Mode` 设置为 `Ume` 或 `Both` 即可使用。

如需独立的 ApiKey，请联系 HayashiUme：
- QQ: **2558527272**
- Discord: [@hayashiume](https://discord.com/users/1329656960211091579)

#### 验证端点

`POST https://auverify.hayashiume.top/api/verify`

```json
// 请求
{ "ApiKey": "sk-empostor-globalapikey", "EosToken": "eyJ..." }

// 成功 (200)
{ "VerifyStatus": "Verified", "ProductUserId": "0002a1b2...", "FriendCode": "Name#1234" }
```

### PUID 交叉验证

所有验证模式（`Niko`、`Ume`、`Relay`）均包含 **PUID 交叉验证**：外部 API 返回的 ProductUserId 会与从玩家 EOS JWT 中提取的 PUID 进行比对。如果不匹配，则拒绝该好友代码。这杜绝了任何跨玩家好友代码分配的可能性。

---

## 管理 API

管理面板的内部 API 位于 `/api/admin/`，处理所有管理操作（踢出、封禁、广播、市场等）。这些端点需要通过会话 cookie 进行管理员认证，详情请参阅[管理面板](Admin-panel.md)页面。
