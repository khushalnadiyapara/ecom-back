[<- routes](./../../route.md#expense)

# expense List of PG

### URL : /api/pg/`:pgId`/expense

### Method : `GET`

---

### Description

return the list of expense in the PG.

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
    "id": "String",
    "amount": "Number",
    "date": "String",
    "category": "String",
    "description": "String",
    "paymentMethod": "String",
    "sender": "String",
    "receiver": "String"
  }
]
```

---
