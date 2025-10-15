[<- routes](./../../route.md#room)

# Create Room

### URL : /api/pg/`:pgId`/room

### Method : `POST`

---

### Description

Create a new room.

---

### Request

```json
"header": {
  "Authorization" : "String" // required (Token)
}

"body": {
 "name": "string",   // required max 8
  "capacity": "number", // required [1-20]
  "rent": "number", // required
  "tags":["string"], // required
  "info":"string" , // max 1000
}
```

---

### Response

### status : `200`

```json
{
  "id": "string",
  "name": "string",
  "capacity": "number",
  "rent": "number",
  "tags": ["string"],
  "info": "string"
}
```

---
