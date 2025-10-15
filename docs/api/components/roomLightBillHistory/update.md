[<- routes](./../../route.md#roomlightbillhistory)

# Room Light Bill History Update

### URL : /api/pg/`:pdId`/room-light-bill-history/`:lightBillId`

### Method : `PUT`

---

### Description

Update the room light bill history of given id.

---

### Request

```json
"header": {
  "Authorization" : "String" // required (Token)
}

"body": {
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
