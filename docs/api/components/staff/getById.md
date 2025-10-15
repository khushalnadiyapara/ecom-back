[<- routes](./../../route.md#staff)

# Get Staff by ID

### URL : /api/pg/`:pgId`/staff/`:staffId`

### Method : `GET`

---

### Description

return the staff details by ID.

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
  "id": "UUID",
  "name": "String",
  "phone": "String",
  "type": "String",
  "info": "String",
  "gender": "String",
  "documents": [
    {
      "name": "String",
      "imageUrl": "String",
      "id": "UUID"
    }
  ]
}
```

---
