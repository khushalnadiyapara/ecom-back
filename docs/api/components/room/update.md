[<- routes](./../../route.md#room)

# Room Update

### URL : `/api/pg/`:pgId`/room/`:roomId`

### Method : `PUT`

---

### Description

will update the room of given id.

---

### Request

```json
"header": {
  "Authorization" : "String" // required (Token)
}

"query": {
  "processBill" : "boolean" // optional  if true then it will calculate guest light bill for that room
}

"body": {
  "name": "string", // {required}
  "capacity": "number", // {required}
  "rent": "number", // {required}
  "tags": ["string"], // {required}
  "info": "string" // {required}
}
```

### Response

### status : `204`

- Operation successful, but no content return.

### status : `404`

```json
{
  "code": "resource_not_found",
  "message": "Room not found"
}
```
