# Offline Docket Book API

PHP twin API served by PIS/Apache (not port `8000`).  
Uses a **snapshot cache** (`docket_book_offline_cache`). Sync while online; offline list/search read only from that cache.

## Base URL

```
http://localhost/pis/index.php/api/docketbook
```

Replace host/path if your WAMP alias differs.

**Header (POST with JSON):** `Content-Type: application/json`

---

## Endpoints

### 1. Sync snapshot

Pulls live docket books into the offline cache for an office.

| | |
|---|---|
| **Method** | `POST` |
| **URL** | `{host}/pis/index.php/api/docketbook/sync` |

**Body**

```json
{
  "field_office": "87",
  "field_office_name": "Optional Office Name",
  "types": ["PROBATIONER", "PAROLEE", "PARDONEE"]
}
```

| Field | Required | Notes |
|-------|----------|--------|
| `field_office` | Yes | Alias: `fieldOfficeId` |
| `field_office_name` | No | Alias: `fieldOfficeName` |
| `types` | No | Default: `PROBATIONER`, `PAROLEE`, `PARDONEE`. Alias: `type` |

**Example success**

```json
{
  "status": "SUCCESS",
  "message": "Synced 488 docket book(s) via db",
  "record_count": 488,
  "source": "db",
  "field_office": "87",
  "types": ["PROBATIONER"],
  "last_synced_at": "2026-07-31 06:54:29"
}
```

`source` is `db` (read from `docket_book`) or `http` (fallback to Java `:8000`).

---

### 2. Sync status

| | |
|---|---|
| **Method** | `GET` |
| **URL** | `{host}/pis/index.php/api/docketbook/sync/status?field_office=87` |

| Query | Required | Notes |
|-------|----------|--------|
| `field_office` | Yes | Alias: `fieldOfficeId` |

**Example success**

```json
{
  "status": "SUCCESS",
  "synced": true,
  "field_office": "87",
  "record_count": 488,
  "last_synced_at": "2026-07-31 06:54:29",
  "last_sync_status": "SUCCESS",
  "message": "Synced 488 docket book(s) via db",
  "client_types": "PROBATIONER"
}
```

---

### 3. Offline paginated list

Mirrors online `GET /docketbook?page&size&type&officeId` (Spring `Page` shape).

| | |
|---|---|
| **Method** | `GET` |
| **URL** | `{host}/pis/index.php/api/docketbook/offline?page=0&size=10&type=PIS_SUP&officeId=87` |

| Query | Required | Notes |
|-------|----------|--------|
| `page` | Yes | 0-based |
| `size` | Yes | Page size |
| `type` | Yes | Module type (`PIS_SUP`, `PIS_INV`, …) — not Probationer/Parolee |
| `officeId` | Yes | Field office id, or `ALL` |

**Example success (shape)**

```json
{
  "content": [],
  "totalElements": 0,
  "totalPages": 0,
  "size": 10,
  "number": 0,
  "first": true,
  "last": true,
  "numberOfElements": 0,
  "empty": true
}
```

---

### 4. Offline non-paged list

Mirrors online `GET /docketbook/list/{type}/{officeId}` (`StandardResponse` wrapper).

| | |
|---|---|
| **Method** | `GET` |
| **URL** | `{host}/pis/index.php/api/docketbook/offline/list/PIS_SUP/87` |

Path: `/offline/list/{type}/{officeId}`

**Example success**

```json
{
  "status": "SUCCESS",
  "message": null,
  "response": []
}
```

---

### 5. Offline search

Mirrors online `POST /docketbook/search/{clientType}?page&size`.

| | |
|---|---|
| **Method** | `POST` |
| **URL** | `{host}/pis/index.php/api/docketbook/offline/search/PROBATIONER?page=0&size=10` |

**Path** `clientType`: `PROBATIONER` | `PAROLEE` | `PARDONEE`

**Query:** `page`, `size`

**Body**

```json
{
  "name": "search text",
  "type": "PIS_SUP",
  "fieldOfficeId": "87",
  "canSeeOtherOffices": false
}
```

| Field | Required | Notes |
|-------|----------|--------|
| `name` | No | Keyword. Alias: `search` |
| `type` | Often yes | Module type (`PIS_SUP`, …) |
| `fieldOfficeId` | Yes* | Alias: `field_office`. Required unless `canSeeOtherOffices` is true |
| `canSeeOtherOffices` | No | Default false |

Response shape matches Spring `Page` (same as paginated list).

---

## Suggested Postman order

1. **POST** `/sync` with a real `field_office`
2. **GET** `/sync/status?field_office=...` — confirm `record_count`
3. **GET** `/offline?...` or `/offline/list/...` or **POST** `/offline/search/...`

---

## Notes

- There is **no** route for bare `/api/docketbook` — always include `/sync`, `/sync/status`, `/offline`, etc.
- Offline reads never hit port `8000`; they only use the last successful sync.
- Schema SQL (optional; tables also auto-create on first sync):  
  `sql-queries/docket_book_offline_cache.sql`
- Related code:  
  `application/controllers/Api_docketbook.php`  
  `application/models/Docket_book_model.php`  
  `application/config/routes.php`
