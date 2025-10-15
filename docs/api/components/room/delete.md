[<- routes](./../../route.md#room)

# Room Delete

### URL : /api/pg/`:pgId`/room/`:roomId`

### Method : `DELETE`

---

### Description

will delete the room with the given id.

---

### Request

```json
"header": {
  "Authorization" : "String" // required (Token)
}
```

---

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
