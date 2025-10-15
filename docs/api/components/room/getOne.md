[<- routes](./../../route.md#room)

# Room details

### URL : /api/pg/`:pgId`/room/`:roomId`

### Method : `GET`

---

### Description

return the details of the room of the given id.

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
{
  "id": "string",
  "name": "string",
  "capacity": "number",
  "rent": "number",
  "tags": ["string", "string"],
  "info": "string",
  "occupied": "number",
  "guests": [
    {
      "id": "string",
      "firstName": "string",
      "lastName": "string",
      "email": "string",
      "phone": "string",
      "sharing": "number",
      "rent": "number",
      "gender": "string",
      "checkInDate": "string",
      "deposit": "number"
    }
  ]
}
```

---
