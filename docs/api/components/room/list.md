[<- routes](./../../route.md#room)

# Room List

### URL : /api/pg/`:pgId`/room

### Method : `GET`

---

### Description

will return the list of rooms.

---

### Request

```json
"header": {
  "Authorization" : "String" // required (Token)
}
```

---

### Response

### status : `200`

```json
[
  {
    "id": "string",
    "name": "string",
    "capacity": "number",
    "rent": "number",
    "tags": ["string", "string"],
    "info": "string",
    "occupied": "number",
    "booked": "number"
  }
]
```

---
