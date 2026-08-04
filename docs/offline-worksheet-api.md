# Offline Worksheet API

PHP twin of the online Java `/worksheet` API.  
Served by **PIS/Apache** (not port `8000`). Reads/writes the local MySQL `worksheet` table only — **never calls port 8000**.

## Base URL

```
http://localhost/pis/index.php/api/worksheet/offline
```

**Header (POST):** `Content-Type: application/json`

Online → Offline mapping:

| Online (`:8000`) | Offline (PIS) |
|------------------|----------------|
| `POST /worksheet/create` | `POST .../offline/create` |
| `POST /worksheet/update/{id}` | `POST .../offline/update/{id}` |
| `GET /worksheet/{type}/{id}` | `GET .../offline/{type}/{id}` |
| `GET /worksheet/getPetitioner/{type}/{petitionerId}` | `GET .../offline/getPetitioner/{type}/{petitionerId}` |
| `POST /worksheet/updatePetitioner/{type}/{petitionerId}` | `POST .../offline/updatePetitioner/{type}/{petitionerId}` |

---

## 1. Create

| | |
|---|---|
| **Method** | `POST` |
| **URL** | `http://localhost/pis/index.php/api/worksheet/offline/create` |

**Body** (`WorksheetDto`)

```json
{
  "petitionerId": "CLIENT-001",
  "jsonData": "{\"identifyingData\":{}}",
  "type": "worksheet",
  "worksheetStatus": "INCOMPLETE",
  "createdBy": "user-uuid",
  "fieldOfficeId": "87"
}
```

| Field | Required | Notes |
|-------|----------|--------|
| `petitionerId` | Yes | Client id |
| `type` | Yes | e.g. `worksheet`, `psir`, section type |
| `jsonData` | No | String or JSON object (object is stringified) |
| `worksheetStatus` | No | e.g. `INCOMPLETE`, `complete` |
| `createdBy` | No | Auditor |
| `fieldOfficeId` | No | Field office |

**Success**

```json
{
  "status": "SUCCESS",
  "message": null,
  "response": {
    "id": 1,
    "petitionerId": "CLIENT-001",
    "jsonData": "{\"identifyingData\":{}}",
    "worksheetStatus": "INCOMPLETE",
    "type": "worksheet",
    "fieldOfficeId": "87",
    "fieldOfficeName": null,
    "createdBy": "user-uuid",
    "createdDate": "2026-08-04 22:00:00",
    "updatedBy": null,
    "updatedDate": null,
    "status": true
  }
}
```

---

## 2. Update by id

| | |
|---|---|
| **Method** | `POST` |
| **URL** | `http://localhost/pis/index.php/api/worksheet/offline/update/1` |

**Body** — same `WorksheetDto` fields as create; also accepts `updatedBy`.

**404** if id does not exist.

---

## 3. Fetch by type + id

| | |
|---|---|
| **Method** | `GET` |
| **URL** | `http://localhost/pis/index.php/api/worksheet/offline/worksheet/1` |

Path: `/offline/{type}/{id}`  
Only returns rows with `status = 1`. If missing, `response` is an empty DTO (same as online Java behavior).

---

## 4. Fetch by petitioner (bonus — matches most PIS JS calls)

| | |
|---|---|
| **Method** | `GET` |
| **URL** | `http://localhost/pis/index.php/api/worksheet/offline/getPetitioner/worksheet/CLIENT-001` |

Also works with `type=psir` and other section types.

---

## 5. Update by petitioner (bonus)

| | |
|---|---|
| **Method** | `POST` |
| **URL** | `http://localhost/pis/index.php/api/worksheet/offline/updatePetitioner/worksheet/CLIENT-001` |

**Body:** `WorksheetDto`  
**404** if no row for that type + petitioner.

---

## Suggested Postman order

1. **POST** `/create`
2. **GET** `/offline/{type}/{id}` using returned `id`
3. **POST** `/update/{id}`
4. Optional: **GET** `/getPetitioner/{type}/{petitionerId}`

---

## Security note

This API **does not** call `http://host:8000/...`.  
It only uses the PIS MySQL connection (`application/config/database.php`) and the `worksheet` table.

Optional SQL: `sql-queries/worksheet_offline.sql` (table also auto-creates on first request).

## Code

- `application/controllers/Api_worksheet.php`
- `application/models/Worksheet_model.php`
- `application/config/routes.php`
