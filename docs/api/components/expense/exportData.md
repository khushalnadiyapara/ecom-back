[<- routes](./../../route.md#expense)

# expense List of PG

### URL : /api/pg/`:pgId`/expense/export-data

### Method : `GET`

---

### Description

return the list of all type of expense

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
[
    "bankexpense": [
        {
            "category": "String",
            "amount": "String"
        }
    ],
    "cashexpense": [
       {
            "category": "String",
            "amount": "String"
        }
    ],
        "incomeData": [
        {
            "totalRentCash": "String",
            "totalRentOnline": "String",
            "totalLightBillCash": "String",
            "totalLightBillOnline": "String"
        }
    ]
]
```

---
