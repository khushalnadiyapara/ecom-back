[<- routes](./../../route.md#roomlightbillhistory)

# Room Light Bill History Create

### URL : /api/pg/`:pdId`/room-light-bill-history

### Method : `POST`

---

### Description

will create a new room light bill history.

---

### Request

```json
"header": {
  "Authorization" : "String" // required (Token)
}

"query": {
  "roomId": "UUID" // required
}

"body": {
  "month": "Integer", // required (0-11)
  "year": "Integer", // required
  "reading": "Number", // required
  "amount": "Integer", // required
  "rate":"Integer", // required
  "file": "File"
}
```

---

### Response

### status : `200`

```json
{
  "id": "UUID",
  "roomId": "UUID",
  "image": "String",
  "month": "Integer",
  "year": "Integer",
  "rate": "Integer",
  "reading": "Number",
  "amount": "Integer"
}
```

---
