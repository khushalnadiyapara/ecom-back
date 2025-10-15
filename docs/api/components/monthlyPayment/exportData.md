[<- routes](./../../route.md#monthly-payment)

# monthly-payment List of PG

### URL : /api/pg/`:pgId`/monthly-payment/export-data

### Method : `GET`

---

### Description

return the list of all type of monthly-payment

---

### Request

```json
"header": {
  "Authorization" : "String" // required (Token)
}
"query": {
    "month":"Number",
    "year":"Number"
}
```

---

### Response

### status : `200`

```json
{
  "data": [
    {
      "name": "String",
      "number": "String",
      "checkInDate": "String",
      "checkOutDate": "String",
      "rent": "Number",
      "lightBill": "Number",
      "deposit": "Number",
      "roomName": "String",
      "id": "Number",
      "cash": "Number",
      "bank": "Number",
      "particular": "String",
      "total": "Number"
    }
  ],
  "headers": [
    {
      "name": "String",
      "key": "String"
    }
  ]
}
```

---
