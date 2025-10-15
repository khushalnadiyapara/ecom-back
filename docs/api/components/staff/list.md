[<- routes](./../../route.md#staff)

# staff List of PG

### URL : /api/pg/`:pgId`/staff

### Method : `GET`

---

### Description

return the list of staff in the PG.

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
    "id": "UUID",
    "name": "String",
    "phone": "String",
    "type": "String",
    "info": "String",
    "gender": "String"
  }
]
```

---
