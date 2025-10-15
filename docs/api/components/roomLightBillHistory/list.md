[<- routes](./../../route.md#roomlightbillhistory)

# Room Light Bill History List

### URL : /api/pg/`:pdId`/room-light-bill-history

### Method : `GET`

---

### Description

will return the room light bill history of given room id.

---

### Request

```json
"header": {
  "Authorization" : "String" // required (Token)
}

"query": {
  "roomId": "UUID" // required
}
```

---

### Response

### status : `200`

```json
[
  {
    "id": "UUID",
    "roomId": "UUID",
    "image": "String",
    "month": "Integer",
    "rate": "Integer",
    "year": "Integer",
    "reading": "Number",
    "amount": "Integer"
  }
]
```
