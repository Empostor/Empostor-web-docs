# API Reference

Empostor exposes several HTTP APIs for monitoring, integration, and client matchmaking.

---

## Server Monitoring API

**[Server Monitoring](Server-monitoring.md)** provides two public endpoints for health checks and status dashboards:

### `GET /api/monitor/status`

Returns detailed server status including uptime, resource usage, and active games.

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

Simple health check for load balancers and monitoring tools (Prometheus, Uptime Kuma).

```json
{ "status": "healthy", "timestamp": "2026-05-23T12:00:00.0000000Z" }
```

Returns HTTP 200 when the server is healthy.

---

## Privacy Policy API

**[Privacy Policy API](Privacy-api.md)** lets server admins publish a custom privacy policy:

| Endpoint | Method | Auth | Description |
|---|---|---|---|
| `/privacy` | GET | None | Serves the privacy policy HTML page |
| `/admin/api/privacy` | POST | Admin token | Updates the privacy policy content |

The privacy policy HTML is stored in `Pages/privacy.html` and persists across restarts. A default template is created if the file doesn't exist, covering data collection, usage, sharing, retention, and contact information.

Authentication uses the `EMP_HTTP_TOKEN` or `EMP_ADMIN_TOKEN` environment variables, falling back to `"empostor"` if neither is set.

---

## Game Listing API

**[Game Listing API](Game-api.md)** handles Among Us client matchmaking, following the Innersloth protocol:

| Endpoint | Method | Description |
|---|---|---|
| `/api/games` | GET | Legacy game listing (pre-v16.0.0 clients), filterable by map, language, impostors |
| `/api/games` | POST | Legacy: get server address for a specific game |
| `/api/games` | PUT | Legacy: get server address for hosting a new game |
| `/api/games/{gameId}` | GET | Get details for a specific game by integer code |
| `/api/games/filtered` | GET | Modern lobby list (v16.0.0+), returns all public games with metadata |
| `/api/games/publicgames` | GET | JSON summary of all active games for admin dashboards and external tooling |

Game codes use two formats: 6-letter string (`ABCDEF`) and internal integer representation. The `GameCode` type transparently converts between them.

### Public Games Response

The `/api/games/publicgames` endpoint returns a clean JSON summary:

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

## Verification API

Empostor verifies player identities by fetching their FriendCode from external verification services. This happens automatically during player login — no player action required.

### How It Works

1. Player logs into their Among Us account (EOS authentication)
2. Empostor receives the player's EOS Token (JWT, signed by Epic Online Services)
3. Empostor calls the configured verification API with the EOS Token
4. The API returns the player's FriendCode (`PlayerName#1234`)
5. Empostor assigns the FriendCode and the player joins the game

### AuthApi Modes

Configure the verification mode in `config.json` under `AuthApi`:

| Mode | Description |
|---|---|
| `Innersloth` | Calls Innersloth's official API directly. Simple, no external service needed. |
| `Niko` | Uses Niko's au-verify service. Requires a NikoApiKey and a running verification server. |
| `Ume` | Uses UmeAuthService — a lightweight HTTP proxy. No player action required. |
| `Relay` | Custom relay server. Compatible with any verification backend. |
| `Both` | Tries Niko first (if custom ApiKey is set), then Ume, then falls back to Innersloth. |

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

[UmeAuthService](https://auverify.hayashiume.top) is a lightweight relay API that proxies the EOS Token to Innersloth and returns a paired **PUID + FriendCode** in one response. Unlike Niko's au-verify, players do not need to join a verification server.

Empostor includes a built-in ApiKey (`sk-empostor-globalapikey`) — just set `Mode` to `Ume` or `Both`.

For standalone API keys, contact HayashiUme:
- QQ: **2558527272**
- Discord: [@hayashiume](https://discord.com/users/1329656960211091579)

#### Verification Endpoint

`POST https://auverify.hayashiume.top/api/verify`

```json
// Request
{ "ApiKey": "sk-empostor-globalapikey", "EosToken": "eyJ..." }

// Success (200)
{ "VerifyStatus": "Verified", "ProductUserId": "0002a1b2...", "FriendCode": "Name#1234" }
```

### PUID Cross-Validation

All verification modes (`Niko`, `Ume`, `Relay`) include **PUID cross-validation**: the ProductUserId returned by the external API is compared against the PUID extracted from the player's own EOS JWT. If they don't match, the FriendCode is rejected. This prevents any possibility of cross-player FriendCode assignment.

---

## Admin API

The admin panel's internal API at `/api/admin/` handles all management operations (kick, ban, broadcast, marketplace, etc.). These endpoints require admin authentication via session cookie and are documented in the [Admin Panel](Admin-panel.md) page.
